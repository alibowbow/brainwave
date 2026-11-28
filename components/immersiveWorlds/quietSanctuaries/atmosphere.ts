import * as THREE from 'three';
import { VOLUME_PRELUDE, type VolumeEffect } from '../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../shared/render/targets';

/*
 * Participating media for the two quiet sanctuaries, rendered by the shared
 * HDR pipeline's half-resolution volume pass (original implementation).
 *
 * Warm heart: a slow, breathing amber haze. 16 jittered steps sample a drifting
 * noise density lit by the warm core (inverse-square, so the air brightens
 * toward it, shaped into soft shafts where light escapes between the bud's
 * petals and into cones behind the openings of the iris folds) plus a
 * closed-form point-light integral for the core's soft aureole, which never bands.
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
uniform mat3 uShaftBasis;
uniform vec3 uShafts;
uniform vec4 uRings[5];
uniform vec3 uRingRadii[5];
uniform vec2 uRingLobes[5];
${GLOW}
/**
 * Light from the core reaching p through the iris folds: each band it must cross on the way
 * (the straight line core -> p meets the fold's plane outside its scalloped rim) lets through
 * only a little, so the haze holds soft cones of light behind the openings.
 */
float ringPass(vec3 p) {
  float pass = 1.0;
  for (int k = 0; k < 5; k++) {
    vec4 r = uRings[k];
    if (r.w <= 0.0) continue;
    float s = (r.x - uCorePos.z) / (p.z - uCorePos.z);
    if (s <= 0.0 || s >= 1.0) continue;
    vec2 d = (uCorePos.xy + (p.xy - uCorePos.xy) * s) - r.yz;
    vec3 radii = uRingRadii[k];
    vec2 e = d / vec2(radii.x, d.y > 0.0 ? radii.y : radii.z);
    float theta = atan(e.y, e.x);
    vec2 lobes = uRingLobes[k];
    float rim = r.w + 0.07 * sin(theta * lobes.x + lobes.y) + 0.04 * sin(theta * (lobes.x * 2.0 + 1.0) + lobes.y * 1.7);
    float band = smoothstep(rim - 0.06, rim + 0.1, length(e)) * smoothstep(-0.5, -0.25, e.y);
    pass *= 1.0 - 0.72 * band;
  }
  return pass;
}
/** Light escaping the bud: open toward its mouth, in soft fans between petals elsewhere. */
float budShafts(vec3 p) {
  vec3 local = (p - uCorePos) * uShaftBasis;
  float r = length(local);
  vec3 dir = local / max(r, 1e-3);
  float azimuth = atan(dir.y, dir.x);
  float gaps = 0.5 + 0.5 * cos(azimuth * uShafts.x - uShafts.y * uShafts.x);
  // Irregular rays: some gaps wider and brighter than others, drifting very slowly.
  float n = texture(uNoise, vec3(azimuth * 0.35 + 0.5, uTime * 0.004, 0.31)).r;
  float fan = pow(gaps, 3.0) * (0.45 + 1.1 * smoothstep(0.35, 0.7, n));
  float mouth = smoothstep(0.25, 0.85, dir.z);
  return mix(0.3 + uShafts.z * fan * smoothstep(-0.6, 0.3, dir.z) * 2.2, 1.0, mouth);
}
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
    // A broad falloff: the whole cocoon's air glows, brightest around the core.
    float shaft = (uShafts.x > 0.0 ? budShafts(p) : 1.0) * ringPass(p);
    vec3 light = uAmbient + uCoreColor * (0.6 + 0.4 * uBreath) * shaft / (dot(toCore, toCore) * 0.3 + 1.5);
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
  /** Soft shafts from the core: bud frame (z = its mouth), petal-gap count, gap phase, strength. */
  shafts?: { basis: THREE.Matrix3; count: number; phase: number; strength: number };
  /** Up to five iris folds the core's light must pass: plane z, cross-section centre and radii (x, up, down), rim fraction, scallops. */
  rings?: Array<{ z: number; centre: THREE.Vector2; radii: THREE.Vector3; inner: number; lobes: number; seed: number }>;
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
    uShaftBasis: { value: settings.shafts?.basis.clone() ?? new THREE.Matrix3() },
    uShafts: { value: new THREE.Vector3(settings.shafts?.count ?? 0, settings.shafts?.phase ?? 0, settings.shafts?.strength ?? 0) },
    uRings: { value: Array.from({ length: 5 }, (_, i) => { const r = settings.rings?.[i]; return r ? new THREE.Vector4(r.z, r.centre.x, r.centre.y, r.inner) : new THREE.Vector4(); }) },
    uRingRadii: { value: Array.from({ length: 5 }, (_, i) => settings.rings?.[i]?.radii.clone() ?? new THREE.Vector3(1, 1, 1)) },
    uRingLobes: { value: Array.from({ length: 5 }, (_, i) => new THREE.Vector2(settings.rings?.[i]?.lobes ?? 0, settings.rings?.[i]?.seed ?? 0)) },
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
      float radius = shape.x * (1.0 + 2.4 * u + 0.8 * sqrt(u));
      float radial = length(p.xz - axis) / radius;
      if (radial > 1.7) continue;
      // Wisps stretched along the rise: a continuous column at the chimney that frays as it climbs.
      vec3 q = vec3((p.x - axis.x) * 2.4, y * 0.75 - uTime * 0.16, (p.z - axis.y) * 2.4) * 0.5 + shape.w;
      float n = dot(texture(uNoise, q), vec4(0.5, 0.3, 0.2, 0.0)) * 0.7 + texture(uNoise, q * 2.3 + 0.37).g * 0.3;
      float density = shape.z * exp(-radial * radial * 2.2) * smoothstep(0.0, 0.025, u) * (1.0 - smoothstep(0.1, 0.8, u))
        * smoothstep(0.38, 0.72, n + 0.16 * (1.0 - u) * (1.0 - u));
      if (density < 1e-5) continue;
      vec3 light = uMoon * (0.5 + 0.5 * min(moonPhase, 2.5)) * 1.6 + uAmbient * 4.0 + uSmokeLight * exp(-y * 0.45);
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

const CLOUD_VERTEX = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 clip = projectionMatrix * viewMatrix * vec4(cameraPosition + position * 400.0, 1.0);
  // Just in front of the sky and stars on the far plane, behind every surface.
  clip.z = clip.w * 0.9999985;
  gl_Position = clip;
}
`;

const CLOUD_FRAGMENT = /* glsl */ `
precision highp sampler3D;
uniform sampler3D uNoise;
uniform float uTime;
uniform float uCover;
uniform vec3 uMoonDir;
uniform vec3 uCloudBase;
uniform vec3 uMoonLight;
uniform vec3 uTownGlow;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  float h = d.y;
  if (h <= 0.0) discard;
  // A flat cloud layer seen in perspective, drifting very slowly with the wind.
  vec2 uv = d.xz / (h + 0.08) * 0.2 + vec2(uTime * 0.0032, uTime * 0.0011);
  float n = texture(uNoise, vec3(uv * 0.45, 0.21)).r * 0.55
    + texture(uNoise, vec3(uv * 1.25 + 3.1, 0.47)).g * 0.3
    + texture(uNoise, vec3(uv * 3.2 + 7.0, 0.73 + uTime * 0.0008)).b * 0.15;
  float cover = smoothstep(1.0 - uCover - 0.12, 1.0 - uCover + 0.16, n);
  float thick = smoothstep(1.0 - uCover + 0.04, 1.0 - uCover + 0.3, n);
  float mu = max(dot(d, uMoonDir), 0.0);
  // Thin, broken edges catch the moon (strongly near it); thick cores stay dark blue-grey;
  // low cloud over the village takes a faint warm glow from its lights.
  float edge = cover * (1.0 - thick);
  vec3 c = uCloudBase * (0.75 + 0.35 * h) * (1.0 - 0.35 * thick)
    + uMoonLight * (edge * (0.3 + 3.2 * pow(mu, 14.0)) + 0.5 * pow(mu, 60.0) * cover)
    + uTownGlow * (1.0 - smoothstep(0.03, 0.3, h)) * cover;
  gl_FragColor = vec4(c, cover * smoothstep(0.0, 0.12, h) * 0.94);
}
`;

export interface CloudDeckSettings {
  noise: THREE.Data3DTexture;
  moonDirection: THREE.Vector3;
  /** Linear radiance of the cloud body, of moonlight scattered at thin edges, and of the village glow below. */
  base: THREE.Color;
  moonLight: THREE.Color;
  townGlow: THREE.Color;
  /** Fraction of the sky covered (0..1). */
  cover: number;
}

/**
 * Snowy night: a broken deck of snow cloud on a dome just in front of the sky and stars.
 * Three noise fetches per sky pixel; no depth writes, so screen-space passes still read sky.
 */
export function createCloudDeck(settings: CloudDeckSettings) {
  const uniforms = {
    uNoise: { value: settings.noise },
    uTime: { value: 0 },
    uCover: { value: settings.cover },
    uMoonDir: { value: settings.moonDirection.clone().normalize() },
    uCloudBase: { value: vec(settings.base) },
    uMoonLight: { value: vec(settings.moonLight) },
    uTownGlow: { value: vec(settings.townGlow) },
  };
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 16, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.ShaderMaterial({
    uniforms, vertexShader: CLOUD_VERTEX, fragmentShader: CLOUD_FRAGMENT, side: THREE.BackSide,
    transparent: true, depthWrite: false, toneMapped: false,
  }));
  mesh.frustumCulled = false;
  // After the sky (-10) and stars (-9), before everything else that is transparent.
  mesh.renderOrder = -8;
  mesh.name = 'Snow cloud deck';
  return { mesh, uniforms, update(time: number) { uniforms.uTime.value = time; } };
}
