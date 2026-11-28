import * as THREE from 'three';
import { VOLUME_PRELUDE, type VolumeEffect } from '../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../shared/render/targets';

/*
 * Night participating media for the shared HDR pipeline's half-resolution
 * volume pass (original). One full-screen march, depth-correct against the scene:
 *  - height haze over distance: cool moonlight with forward scattering and a
 *    dim sky ambient, so ridge layers separate into aerial perspective,
 *  - a noisy mist layer pooled at valley height beyond the camp,
 *  - the warm glow of the fire (or a lantern) in the air, integrated
 *    analytically for a point light so it never bands,
 *  - a thin smoke plume rising from the fire, lit from below.
 * Haze uses 20 exponentially spaced steps and the plume 14: 34 in total.
 */

export interface NightAtmosphere {
  noise: THREE.Data3DTexture;
  moonDirection: THREE.Vector3;
  /** Moonlight radiance scattered by haze (linear). */
  moon: THREE.Color;
  /** Isotropic sky light scattered by haze (linear). */
  ambient: THREE.Color;
  /** Haze density at `fogBase` (per metre), its scale height and the march cap. */
  fogDensity: number;
  fogHeight: number;
  fogBase: number;
  maxDistance: number;
  mist?: { y: number; thickness: number; density: number; start: number; tint?: THREE.Color; drift?: THREE.Vector2; contrast?: number };
  /** Forward-scattering anisotropy of the haze toward the moon (Henyey-Greenstein g, default 0.6). */
  phase?: number;
  /** A second, higher mist band seen only far away: fog lying between distant ridges. */
  upperMist?: { y: number; thickness: number; density: number; start: number };
  /** Warm point glow in the air: world position, radiance and density. */
  glow?: { position: THREE.Vector3; color: THREE.Color; density: number };
  smoke?: { base: THREE.Vector3; radius: number; height: number; density: number; wind: THREE.Vector2; fireLight: THREE.Color };
}

const FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
precision highp sampler3D;
uniform sampler3D uNoise;
uniform vec3 uMoonDir;
uniform vec3 uMoon;
uniform vec3 uAmbient;
uniform vec4 uFog;
uniform vec4 uMist;
uniform vec3 uMistTint;
uniform vec3 uGlowPos;
uniform vec3 uGlowColor;
uniform float uGlowDensity;
uniform vec3 uSmokeBase;
uniform vec4 uSmoke;
uniform vec2 uWind;
uniform vec3 uSmokeLight;
uniform float uFlicker;
uniform float uPhaseG;
uniform vec3 uMistDrift;
uniform vec4 uMist2;
float mistNoise(vec3 p) { return dot(texture(uNoise, p), vec4(0.55, 0.3, 0.15, 0.0)); }
vec2 cylinder(vec2 ro, vec2 rd, vec2 c, float r) {
  vec2 oc = ro - c;
  float a = dot(rd, rd), b = dot(oc, rd), k = dot(oc, oc) - r * r;
  float h = b * b - a * k;
  if (h < 0.0 || a < 1e-6) return vec2(1.0, 0.0);
  h = sqrt(h);
  return vec2((-b - h) / a, (-b + h) / a);
}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, uFog.w);
  float jitter = bwIgn(gl_FragCoord.xy);
  float moonPhase = bwPhase(dot(rd, uMoonDir), uPhaseG) * 12.5663706;
  vec3 hazeLight = uMoon * moonPhase + uAmbient;
  vec3 mistLight = uMistTint * (uMoon * (0.4 + 0.6 * moonPhase) + uAmbient);

  // Haze and valley mist: exponential steps put detail near the viewer.
  const int HAZE = 20;
  const float K = 4.2;
  float norm = maxT / (exp(K) - 1.0);
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  for (int i = 0; i < HAZE; i++) {
    float a = (exp(K * float(i) / float(HAZE)) - 1.0) * norm;
    float b = (exp(K * float(i + 1) / float(HAZE)) - 1.0) * norm;
    float dt = b - a;
    vec3 p = ro + rd * (a + dt * jitter);
    float haze = uFog.x * exp(-clamp((p.y - uFog.z) / uFog.y, -3.0, 30.0));
    float mist = 0.0;
    if (uMist.z > 0.0) {
      float layer = exp(-pow((p.y - uMist.x) / uMist.y, 2.0));
      float reach = smoothstep(uMist.w, uMist.w * 1.7, length(p.xz - ro.xz));
      if (layer * reach > 0.002) {
        float n = mistNoise(vec3(p.x * 0.011 + uTime * uMistDrift.x, p.y * 0.045, p.z * 0.011 - uTime * uMistDrift.y));
        mist = uMist.z * layer * reach * (0.15 + 1.4 * smoothstep(0.55 - 0.17 * uMistDrift.z, 0.55 + 0.17 * uMistDrift.z, n));
      }
    }
    if (uMist2.z > 0.0) {
      float layer2 = exp(-pow((p.y - uMist2.x) / uMist2.y, 2.0));
      float reach2 = smoothstep(uMist2.w, uMist2.w * 1.4, length(p.xz - ro.xz));
      if (layer2 * reach2 > 0.002) {
        float n2 = mistNoise(vec3(p.x * 0.006 + uTime * uMistDrift.x * 0.6, p.y * 0.03 + 3.0, p.z * 0.006 - uTime * uMistDrift.y * 0.6));
        mist += uMist2.z * layer2 * reach2 * (0.2 + 1.3 * smoothstep(0.42, 0.68, n2));
      }
    }
    float sigma = haze + mist;
    if (sigma < 1e-6) continue;
    float stepT = exp(-sigma * dt);
    vec3 light = (haze * hazeLight + mist * mistLight) / sigma;
    scatter += transmittance * light * (1.0 - stepT);
    transmittance *= stepT;
  }

  // Firelight scattered by the air around it: closed-form point-light integral.
  if (uGlowDensity > 0.0) {
    vec3 toLight = uGlowPos - ro;
    float along = dot(toLight, rd);
    float h = sqrt(max(dot(toLight, toLight) - along * along, 0.0) + 0.09);
    float integral = (atan((min(surface, 200.0) - along) / h) + atan(along / h)) / h;
    scatter += uGlowColor * uGlowDensity * uFlicker * integral;
  }

  // Smoke plume lit by the fire below and the sky above.
  if (uSmoke.z > 0.0) {
    float height = uSmoke.y;
    vec2 drift = uWind * pow(height, 1.3);
    vec2 centre = uSmokeBase.xz + drift * 0.5;
    float bound = uSmoke.x * 3.2 + length(drift) * 0.55;
    vec2 span = cylinder(ro.xz, rd.xz, centre, bound);
    float ry = abs(rd.y) < 1e-4 ? 1e-4 : rd.y;
    float yLow = (uSmokeBase.y - ro.y) / ry, yHigh = (uSmokeBase.y + height - ro.y) / ry;
    float t0 = max(max(span.x, min(yLow, yHigh)), 0.0);
    float t1 = min(min(span.y, max(yLow, yHigh)), surface);
    if (t1 > t0) {
      const int SMOKE = 14;
      float dt = (t1 - t0) / float(SMOKE);
      vec3 smoke = vec3(0.0);
      float smokeT = 1.0;
      for (int i = 0; i < SMOKE; i++) {
        vec3 p = ro + rd * (t0 + (float(i) + jitter) * dt);
        float y = p.y - uSmokeBase.y;
        float s = y / height;
        if (s < 0.0 || s > 1.0) continue;
        vec2 axis = uSmokeBase.xz + uWind * pow(max(y, 0.0), 1.3);
        float radius = uSmoke.x * (1.0 + 2.2 * s);
        float radial = length(p.xz - axis) / radius;
        if (radial > 1.6) continue;
        vec3 q = vec3(p.x - axis.x, y * 0.7 - uTime * 0.32, p.z - axis.y) * 0.55;
        float n = dot(texture(uNoise, q), vec4(0.5, 0.3, 0.2, 0.0));
        float density = uSmoke.z * exp(-radial * radial * 2.2) * smoothstep(0.0, 0.1, s) * (1.0 - smoothstep(0.45, 1.0, s))
          * smoothstep(0.45, 0.78, n + 0.08 * (1.0 - s)) * 1.5 * (1.0 - 0.5 * s);
        if (density < 1e-5) continue;
        vec3 fromFire = p - uGlowPos;
        vec3 light = uSmokeLight * uFlicker / (dot(fromFire, fromFire) + 0.35) + uMoon * (0.3 + 0.7 * moonPhase) * 0.6 + uAmbient;
        float stepT = exp(-density * dt);
        smoke += smokeT * light * 0.6 * (1.0 - stepT);
        smokeT *= stepT;
      }
      scatter = smoke + smokeT * scatter;
      transmittance *= smokeT;
    }
  }
  gl_FragColor = vec4(scatter, transmittance);
}
`;

const vec = (c: THREE.Color, scale = 1) => new THREE.Vector3(c.r, c.g, c.b).multiplyScalar(scale);

/** Uniform objects are returned so the world can animate flicker and wind. */
export function createNightVolume(settings: NightAtmosphere): VolumeEffect & { uniforms: Record<string, THREE.IUniform> } {
  const uniforms: Record<string, THREE.IUniform> = {
    uNoise: { value: settings.noise },
    uMoonDir: { value: settings.moonDirection.clone().normalize() },
    uMoon: { value: vec(settings.moon) },
    uAmbient: { value: vec(settings.ambient) },
    uFog: { value: new THREE.Vector4(settings.fogDensity, settings.fogHeight, settings.fogBase, settings.maxDistance) },
    uMist: { value: settings.mist ? new THREE.Vector4(settings.mist.y, settings.mist.thickness, settings.mist.density, settings.mist.start) : new THREE.Vector4() },
    uMistTint: { value: vec(settings.mist?.tint ?? new THREE.Color(1, 1, 1)) },
    uGlowPos: { value: settings.glow?.position.clone() ?? new THREE.Vector3() },
    uGlowColor: { value: vec(settings.glow?.color ?? new THREE.Color(0, 0, 0)) },
    uGlowDensity: { value: settings.glow?.density ?? 0 },
    uSmokeBase: { value: settings.smoke?.base.clone() ?? new THREE.Vector3() },
    uSmoke: { value: settings.smoke ? new THREE.Vector4(settings.smoke.radius, settings.smoke.height, settings.smoke.density, 0) : new THREE.Vector4() },
    uWind: { value: settings.smoke?.wind.clone() ?? new THREE.Vector2() },
    uSmokeLight: { value: vec(settings.smoke?.fireLight ?? new THREE.Color(0, 0, 0)) },
    uFlicker: { value: 1 },
    uPhaseG: { value: settings.phase ?? 0.6 },
    // Noise-space drift per second (x, z) and the mist's contrast (1 = default banks).
    uMist2: { value: settings.upperMist ? new THREE.Vector4(settings.upperMist.y, settings.upperMist.thickness, settings.upperMist.density, settings.upperMist.start) : new THREE.Vector4() },
    uMistDrift: { value: new THREE.Vector3(settings.mist?.drift?.x ?? 0.0016, settings.mist?.drift?.y ?? 0.0009, 1 / (settings.mist?.contrast ?? 1)) },
  };
  const material = new THREE.ShaderMaterial({
    vertexShader: FULLSCREEN_VERTEX, fragmentShader: FRAGMENT, uniforms, depthTest: false, depthWrite: false, toneMapped: false,
  });
  return { material, uniforms };
}
