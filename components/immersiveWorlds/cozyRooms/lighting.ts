import * as THREE from 'three';
import { GLSL_NOISE } from '../shared/render/glsl';
import { VOLUME_PRELUDE, type VolumeEffect } from '../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../shared/render/targets';

/*
 * Light transport helpers for the cozy rooms:
 *  - a radiance probe captured from the finished room itself, so reflections
 *    and the soft indirect term come from the room's real light (one bounce of
 *    fire, lamp or window light) instead of a flat ambient,
 *  - a half-resolution participating medium: dust in a window beam (moon or
 *    daylight, limited to the open part of the glazing) and a faint haze lit
 *    by a fire or lamp through its opening.
 */

/** Captures the room's own radiance into a PMREM and uses it as the environment. */
export function captureRoomProbe(renderer: THREE.WebGLRenderer, scene: THREE.Scene, position: THREE.Vector3, intensity: number, options: { size?: number; sigma?: number; far?: number; hide?: THREE.Object3D[] } = {}) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const hidden = (options.hide ?? []).filter(object => object.visible);
  hidden.forEach(object => { object.visible = false; });
  const target = pmrem.fromScene(scene, options.sigma ?? 0.035, 0.05, options.far ?? 60, { size: options.size ?? 128, position });
  hidden.forEach(object => { object.visible = true; });
  pmrem.dispose();
  scene.environment = target.texture;
  scene.environmentIntensity = intensity;
  return target;
}

export interface BeamSource {
  /** Centre of the open glazing. */
  centre: THREE.Vector3;
  /** Half-extent vectors of the opening in its plane. */
  right: THREE.Vector3;
  up: THREE.Vector3;
  /** Direction the light travels (into the room). */
  direction: THREE.Vector3;
  /** In-scattered radiance scale (HDR). */
  color: THREE.Color;
  /** Open span along `right` in [-1, 1]; outside it, `transmit` passes (curtains). */
  gap?: { min: number; max: number; transmit: number };
}

export interface GlowSource {
  position: THREE.Vector3;
  color: THREE.Color;
  /** Optional opening (e.g. a firebox mouth) the glow must pass through. */
  opening?: { centre: THREE.Vector3; right: THREE.Vector3; up: THREE.Vector3 };
}

export interface RoomVolumeOptions {
  beam?: BeamSource | null;
  glow?: GlowSource | null;
  /** Base haze extinction per metre. */
  haze: number;
  /** Dust contrast inside the beam (0..1). */
  dust?: number;
  /** Phase anisotropy (0 isotropic, 0.6 strongly forward). */
  anisotropy?: number;
  /** Faint ambient in-scatter so the haze is not black outside the lights. */
  ambient?: THREE.Color;
  maxDistance?: number;
  /** Path length used for sky pixels; defaults to maxDistance. */
  skyDistance?: number;
}

const ROOM_VOLUME = /* glsl */ `
${VOLUME_PRELUDE}
${GLSL_NOISE}
uniform float uHaze;
uniform float uDust;
uniform float uG;
uniform vec3 uAmbient;
uniform float uMaxDistance;
uniform float uSkyDistance;
uniform float uBeamOn;
uniform vec3 uBeamCentre;
uniform vec3 uBeamRight;
uniform vec3 uBeamUp;
uniform vec3 uBeamDir;
uniform vec3 uBeamColor;
uniform vec3 uGap;
uniform float uGlowOn;
uniform vec3 uGlowPos;
uniform vec3 uGlowColor;
uniform float uOpeningOn;
uniform vec3 uOpenCentre;
uniform vec3 uOpenRight;
uniform vec3 uOpenUp;
float beamMask(vec3 p) {
  vec3 n = normalize(cross(uBeamRight, uBeamUp));
  float denom = dot(-uBeamDir, n);
  if (abs(denom) < 1e-4) return 0.0;
  float s = dot(uBeamCentre - p, n) / denom;
  if (s < 0.0) return 0.0;
  vec3 q = p - uBeamDir * s - uBeamCentre;
  float a = dot(q, uBeamRight) / dot(uBeamRight, uBeamRight);
  float b = dot(q, uBeamUp) / dot(uBeamUp, uBeamUp);
  float inside = (1.0 - smoothstep(0.9, 1.0, abs(a))) * (1.0 - smoothstep(0.9, 1.0, abs(b)));
  float open = mix(uGap.z, 1.0, smoothstep(uGap.x - 0.04, uGap.x + 0.04, a) * (1.0 - smoothstep(uGap.y - 0.04, uGap.y + 0.04, a)));
  return inside * open;
}
float openingMask(vec3 p) {
  if (uOpeningOn < 0.5) return 1.0;
  vec3 n = normalize(cross(uOpenRight, uOpenUp));
  // Samples on the source's side of the opening see it directly.
  if (sign(dot(p - uOpenCentre, n)) == sign(dot(uGlowPos - uOpenCentre, n))) return 1.0;
  vec3 d = p - uGlowPos;
  float denom = dot(d, n);
  float s = dot(uOpenCentre - uGlowPos, n) / (abs(denom) < 1e-5 ? 1e-5 : denom);
  if (s < 0.0 || s > 1.0) return 0.0;
  vec3 q = uGlowPos + d * s - uOpenCentre;
  float a = dot(q, uOpenRight) / dot(uOpenRight, uOpenRight);
  float b = dot(q, uOpenUp) / dot(uOpenUp, uOpenUp);
  return (1.0 - smoothstep(0.8, 1.0, abs(a))) * (1.0 - smoothstep(0.75, 1.0, abs(b)));
}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  // The sky (no depth) gets its own, shorter path so outdoor haze does not wash it out.
  float maxT = surface >= 1e4 ? uSkyDistance : min(surface, uMaxDistance);
  const int STEPS = 32;
  float dt = maxT / float(STEPS);
  float jitter = fract(bwIgn(gl_FragCoord.xy) + uFrame * 0.618034);
  // Scattering toward the eye: light travel direction against the reversed view ray.
  float beamPhase = bwPhase(dot(uBeamDir, -rd), uG) * 12.5663706;
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  for (int i = 0; i < STEPS; i++) {
    vec3 p = ro + rd * ((float(i) + jitter) * dt);
    float drift = bwValue(p * 1.7 + vec3(uTime * 0.021, -uTime * 0.013, uTime * 0.017));
    float motes = smoothstep(0.62, 0.95, bwValue(p * 9.0 + vec3(0.0, -uTime * 0.03, uTime * 0.02)));
    float density = uHaze * (0.55 + 0.45 * drift);
    vec3 radiance = uAmbient;
    if (uBeamOn > 0.5) {
      float beam = beamMask(p);
      radiance += uBeamColor * beamPhase * beam * (1.0 + uDust * (motes * 3.0 + drift - 0.5));
    }
    if (uGlowOn > 0.5) {
      vec3 toLight = uGlowPos - p;
      float d2 = dot(toLight, toLight);
      float phase = bwPhase(dot(normalize(-toLight), -rd), uG) * 12.5663706;
      radiance += uGlowColor * phase * openingMask(p) / (d2 + 0.3) * (1.0 + uDust * 0.6 * (motes * 2.0 + drift - 0.5));
    }
    float stepT = exp(-density * dt);
    scatter += transmittance * radiance * (1.0 - stepT);
    transmittance *= stepT;
  }
  gl_FragColor = vec4(scatter, transmittance);
}
`;

export function createRoomVolume(options: RoomVolumeOptions) {
  const beam = options.beam, glow = options.glow;
  const uniforms: Record<string, THREE.IUniform> = {
    uHaze: { value: options.haze }, uDust: { value: options.dust ?? 0.6 }, uG: { value: options.anisotropy ?? 0.35 },
    uAmbient: { value: (options.ambient ?? new THREE.Color(0, 0, 0)).clone() }, uMaxDistance: { value: options.maxDistance ?? 14 }, uSkyDistance: { value: options.skyDistance ?? options.maxDistance ?? 14 },
    uBeamOn: { value: beam ? 1 : 0 },
    uBeamCentre: { value: beam?.centre.clone() ?? new THREE.Vector3() }, uBeamRight: { value: beam?.right.clone() ?? new THREE.Vector3(1, 0, 0) },
    uBeamUp: { value: beam?.up.clone() ?? new THREE.Vector3(0, 1, 0) }, uBeamDir: { value: beam?.direction.clone().normalize() ?? new THREE.Vector3(0, 0, 1) },
    uBeamColor: { value: beam?.color.clone() ?? new THREE.Color() },
    uGap: { value: new THREE.Vector3(beam?.gap?.min ?? -1, beam?.gap?.max ?? 1, beam?.gap?.transmit ?? 1) },
    uGlowOn: { value: glow ? 1 : 0 }, uGlowPos: { value: glow?.position.clone() ?? new THREE.Vector3() }, uGlowColor: { value: glow?.color.clone() ?? new THREE.Color() },
    uOpeningOn: { value: glow?.opening ? 1 : 0 },
    uOpenCentre: { value: glow?.opening?.centre.clone() ?? new THREE.Vector3() }, uOpenRight: { value: glow?.opening?.right.clone() ?? new THREE.Vector3(1, 0, 0) },
    uOpenUp: { value: glow?.opening?.up.clone() ?? new THREE.Vector3(0, 1, 0) },
  };
  const material = new THREE.ShaderMaterial({ vertexShader: FULLSCREEN_VERTEX, fragmentShader: ROOM_VOLUME, depthTest: false, depthWrite: false, toneMapped: false, uniforms });
  return { material, uniforms } as VolumeEffect & { uniforms: typeof uniforms };
}
