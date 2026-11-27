import * as THREE from 'three';
import { VOLUME_PRELUDE, type VolumeEffect } from '../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../shared/render/targets';

/*
 * Participating media for the two quiet sanctuaries, rendered by the shared
 * HDR pipeline's half-resolution volume pass (original implementation).
 *
 * Warm heart: a slow, breathing amber haze. 16 jittered steps sample a drifting
 * noise density lit by the warm core (inverse-square, so the air brightens
 * toward it) plus a closed-form point-light integral for the core's soft
 * aureole, which never bands.
 *
 * Snowy night: cool moonlit haze over distance for aerial perspective, a faint
 * curtain of distant falling snow, closed-form halos around up to four warm
 * lamps, and up to two chimney-smoke plumes. 16 haze steps + 2 × 10 smoke
 * steps = 36 per pixel, all at half resolution.
 */

const vec = (c: THREE.Color, scale = 1) => new THREE.Vector3(c.r, c.g, c.b).multiplyScalar(scale);
const material = (fragmentShader: string, uniforms: Record<string, THREE.IUniform>) => new THREE.ShaderMaterial({
  vertexShader: FULLSCREEN_VERTEX, fragmentShader, uniforms, depthTest: false, depthWrite: false, toneMapped: false,
});

const GLOW = /* glsl */ `
/** In-scattered radiance of an isotropic point light along a ray segment [0, tMax]. */
float pointGlow(vec3 ro, vec3 rd, vec3 light, float tMax, float core) {
  vec3 toLight = light - ro;
  float along = dot(toLight, rd);
  float h = sqrt(max(dot(toLight, toLight) - along * along, 0.0) + core);
  return (atan((tMax - along) / h) + atan(along / h)) / h;
}
`;

const WARM_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
precision highp sampler3D;
uniform sampler3D uNoise;
uniform vec3 uCorePos;
uniform vec3 uCoreColor;
uniform float uCoreGlow;
uniform vec3 uAmbient;
uniform vec4 uHaze;
uniform float uBreath;
uniform vec3 uTouchPos;
uniform float uTouchAge;
${GLOW}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, uHaze.w);
  float jitter = bwIgn(gl_FragCoord.xy);
  const int STEPS = 16;
  float dt = maxT / float(STEPS);
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  for (int i = 0; i < STEPS; i++) {
    vec3 p = ro + rd * (float(i) + jitter) * dt;
    vec3 q = vec3(p.x * 0.07 + uTime * 0.004, p.y * 0.1 - uTime * 0.006, p.z * 0.07);
    float n = dot(texture(uNoise, q), vec4(0.5, 0.3, 0.2, 0.0));
    float wisps = smoothstep(0.38, 0.74, n);
    float sigma = uHaze.x * (0.35 + 1.5 * wisps) * (1.0 + uHaze.y * exp(-max(p.y, 0.0) / 1.2));
    vec3 toCore = uCorePos - p;
    vec3 light = uAmbient + uCoreColor * (0.6 + 0.4 * uBreath) / (dot(toCore, toCore) + 1.5);
    float stepT = exp(-sigma * dt);
    scatter += transmittance * light * (1.0 - stepT);
    transmittance *= stepT;
  }
  // The core's aureole and a slow ring of light that follows a touch.
  scatter += uCoreColor * uCoreGlow * (0.75 + 0.25 * uBreath) * pointGlow(ro, rd, uCorePos, min(surface, 60.0), 0.35);
  if (uTouchAge >= 0.0 && uTouchAge < 9.0) {
    float fade = smoothstep(0.0, 0.8, uTouchAge) * exp(-uTouchAge * 0.45);
    scatter += uCoreColor * 0.0035 * fade * pointGlow(ro, rd, uTouchPos, min(surface, 60.0), 0.08 + uTouchAge * 0.12);
  }
  gl_FragColor = vec4(scatter * uHaze.z, transmittance);
}
`;

export interface WarmHazeSettings {
  noise: THREE.Data3DTexture;
  core: THREE.Vector3;
  /** Linear radiance of the core light at 1 m. */
  coreColor: THREE.Color;
  /** Strength of the closed-form aureole. */
  coreGlow: number;
  ambient: THREE.Color;
  /** Base extinction per metre, extra density near the floor, in-scatter gain, march cap. */
  density: number;
  floorDensity: number;
  gain: number;
  maxDistance: number;
}

export function createWarmHaze(settings: WarmHazeSettings): VolumeEffect & { uniforms: Record<string, THREE.IUniform> } {
  const uniforms: Record<string, THREE.IUniform> = {
    uNoise: { value: settings.noise },
    uCorePos: { value: settings.core.clone() },
    uCoreColor: { value: vec(settings.coreColor) },
    uCoreGlow: { value: settings.coreGlow },
    uAmbient: { value: vec(settings.ambient) },
    uHaze: { value: new THREE.Vector4(settings.density, settings.floorDensity, settings.gain, settings.maxDistance) },
    uBreath: { value: 0 },
    uTouchPos: { value: new THREE.Vector3() },
    uTouchAge: { value: -1 },
  };
  return { material: material(WARM_FRAGMENT, uniforms), uniforms };
}

const SNOW_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
precision highp sampler3D;
uniform sampler3D uNoise;
uniform vec3 uMoonDir;
uniform vec3 uMoon;
uniform vec3 uAmbient;
uniform vec4 uFog;
uniform vec2 uCurtain;
uniform vec3 uLampPos[4];
uniform vec3 uLampColor[4];
uniform vec3 uSmokeBase[2];
uniform vec4 uSmoke[2];
uniform vec2 uWind;
uniform vec3 uSmokeLight;
${GLOW}
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
  float moonPhase = bwPhase(dot(rd, uMoonDir), 0.55) * 12.5663706;
  vec3 hazeLight = uMoon * moonPhase + uAmbient;

  // Height haze with a curtain of distant snowfall; exponential steps favour the near field.
  const int HAZE = 16;
  const float K = 3.6;
  float norm = maxT / (exp(K) - 1.0);
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  for (int i = 0; i < HAZE; i++) {
    float a = (exp(K * float(i) / float(HAZE)) - 1.0) * norm;
    float b = (exp(K * float(i + 1) / float(HAZE)) - 1.0) * norm;
    float dt = b - a;
    float t = a + dt * jitter;
    vec3 p = ro + rd * t;
    float haze = uFog.x * exp(-clamp((p.y - uFog.z) / uFog.y, -2.0, 30.0));
    float curtain = 0.0;
    if (uCurtain.x > 0.0) {
      float n = dot(texture(uNoise, vec3(p.x * 0.05, p.y * 0.018 + uTime * 0.03, p.z * 0.05)), vec4(0.45, 0.35, 0.2, 0.0));
      curtain = uCurtain.x * smoothstep(uCurtain.y, uCurtain.y * 2.0, t) * (0.4 + 1.2 * smoothstep(0.45, 0.7, n));
    }
    float sigma = haze + curtain;
    float stepT = exp(-sigma * dt);
    scatter += transmittance * hazeLight * (1.0 - stepT);
    transmittance *= stepT;
  }

  // Lamp and window halos: snowy air scatters strongly around each source.
  for (int i = 0; i < 4; i++) {
    scatter += uLampColor[i] * pointGlow(ro, rd, uLampPos[i], min(surface, 120.0), 0.02) * transmittance;
  }

  // Chimney smoke, drifting slowly downwind, lit by moon, sky and the warm village below.
  for (int s = 0; s < 2; s++) {
    vec4 shape = uSmoke[s];
    if (shape.z <= 0.0) continue;
    vec3 base = uSmokeBase[s];
    float height = shape.y;
    vec2 drift = uWind * (height + height * height * 0.12);
    vec2 centre = base.xz + drift * 0.5;
    float bound = shape.x * 4.6 + length(drift) * 0.6;
    vec2 span = cylinder(ro.xz, rd.xz, centre, bound);
    float ry = abs(rd.y) < 1e-4 ? 1e-4 : rd.y;
    float yLow = (base.y - ro.y) / ry, yHigh = (base.y + height - ro.y) / ry;
    float t0 = max(max(span.x, min(yLow, yHigh)), 0.0);
    float t1 = min(min(span.y, max(yLow, yHigh)), surface);
    if (t1 <= t0) continue;
    const int SMOKE = 10;
    float dt = (t1 - t0) / float(SMOKE);
    vec3 smoke = vec3(0.0);
    float smokeT = 1.0;
    for (int i = 0; i < SMOKE; i++) {
      vec3 p = ro + rd * (t0 + (float(i) + jitter) * dt);
      float y = p.y - base.y;
      float u = y / height;
      if (u < 0.0 || u > 1.0) continue;
      // Bent over by the breeze soon after leaving the chimney, widening as it cools.
      vec2 axis = base.xz + uWind * (y + y * y * 0.12);
      float radius = shape.x * (1.0 + 3.6 * sqrt(u));
      float radial = length(p.xz - axis) / radius;
      if (radial > 1.7) continue;
      vec3 q = vec3(p.x - axis.x, y * 0.6 - uTime * 0.11, p.z - axis.y) * 0.5 + shape.w;
      float n = dot(texture(uNoise, q), vec4(0.5, 0.3, 0.2, 0.0));
      float density = shape.z * exp(-radial * radial * 2.0) * smoothstep(0.0, 0.08, u) * (1.0 - smoothstep(0.4, 1.0, u))
        * smoothstep(0.3, 0.68, n + 0.1 * (1.0 - u));
      if (density < 1e-5) continue;
      vec3 light = uMoon * (0.4 + 0.6 * moonPhase) * 1.7 + uAmbient * 3.0 + uSmokeLight * exp(-y * 0.45);
      float stepT = exp(-density * dt);
      smoke += smokeT * light * (1.0 - stepT);
      smokeT *= stepT;
    }
    scatter = smoke + smokeT * scatter;
    transmittance *= smokeT;
  }
  gl_FragColor = vec4(scatter, transmittance);
}
`;

export interface SnowNightSettings {
  noise: THREE.Data3DTexture;
  moonDirection: THREE.Vector3;
  moon: THREE.Color;
  ambient: THREE.Color;
  fogDensity: number;
  fogHeight: number;
  fogBase: number;
  maxDistance: number;
  /** Extinction of the distant snowfall curtain and the distance where it starts. */
  curtain?: { density: number; start: number };
  /** Up to four halos: position and linear scattered radiance. */
  lamps: Array<{ position: THREE.Vector3; color: THREE.Color }>;
  /** Up to two smoke plumes. */
  smoke: Array<{ base: THREE.Vector3; radius: number; height: number; density: number }>;
  wind: THREE.Vector2;
  smokeLight: THREE.Color;
}

export function createSnowNightVolume(settings: SnowNightSettings): VolumeEffect & { uniforms: Record<string, THREE.IUniform> } {
  const uniforms: Record<string, THREE.IUniform> = {
    uNoise: { value: settings.noise },
    uMoonDir: { value: settings.moonDirection.clone().normalize() },
    uMoon: { value: vec(settings.moon) },
    uAmbient: { value: vec(settings.ambient) },
    uFog: { value: new THREE.Vector4(settings.fogDensity, settings.fogHeight, settings.fogBase, settings.maxDistance) },
    uCurtain: { value: new THREE.Vector2(settings.curtain?.density ?? 0, settings.curtain?.start ?? 20) },
    uLampPos: { value: Array.from({ length: 4 }, (_, i) => settings.lamps[i]?.position.clone() ?? new THREE.Vector3(0, -1e3, 0)) },
    uLampColor: { value: Array.from({ length: 4 }, (_, i) => settings.lamps[i] ? vec(settings.lamps[i].color) : new THREE.Vector3()) },
    uSmokeBase: { value: Array.from({ length: 2 }, (_, i) => settings.smoke[i]?.base.clone() ?? new THREE.Vector3()) },
    uSmoke: { value: Array.from({ length: 2 }, (_, i) => settings.smoke[i] ? new THREE.Vector4(settings.smoke[i].radius, settings.smoke[i].height, settings.smoke[i].density, i * 3.7) : new THREE.Vector4()) },
    uWind: { value: settings.wind.clone() },
    uSmokeLight: { value: vec(settings.smokeLight) },
  };
  return { material: material(SNOW_FRAGMENT, uniforms), uniforms };
}
