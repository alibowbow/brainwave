import * as THREE from 'three';
import { noise3 } from './noise';

/*
 * Code-only fire for the immersive worlds (original implementation):
 *  - a tileable 3D noise volume generated on the CPU, so flame and smoke cost
 *    one texture fetch per octave group instead of ALU noise,
 *  - a ray-marched emissive flame volume inside a proxy box, with analytic
 *    capsule occluders so logs hide the flame behind them at full resolution,
 *  - GPU-animated embers that rise, drift, cool and fade (no CPU updates),
 *  - a heat-shimmer chunk that bends rays crossing the hot column above the
 *    fire, for vertex shaders of the sky, stars and distant geometry,
 *  - a smooth multi-octave flicker for the fire's key light.
 * Radiance is HDR: the core is far above 1 so bloom and the tone curve shape it.
 */

/** Tileable gradient noise volume; RGBA hold 4/8/16-cell octaves and an offset 4-cell layer. */
export function createNoiseVolume(size = 48, seed = 1): THREE.Data3DTexture {
  const periods = [4, 8, 16, 4];
  const data = new Uint8Array(size * size * size * 4);
  periods.forEach((period, channel) => {
    // Gradients on a periodic lattice make the volume wrap seamlessly.
    const grads = new Float32Array(period * period * period * 3);
    const random = mulberry(seed * 7919 + channel * 104729 + 17);
    for (let i = 0; i < period * period * period; i++) {
      // Uniform random unit gradients (rejection-free: normalised Gaussian-ish triples).
      const x = random() * 2 - 1, y = random() * 2 - 1, z = random() * 2 - 1;
      const length = Math.hypot(x, y, z) || 1;
      grads[i * 3] = x / length; grads[i * 3 + 1] = y / length; grads[i * 3 + 2] = z / length;
    }
    const scale = period / size;
    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const dot = (ix: number, iy: number, iz: number, fx: number, fy: number, fz: number) => {
      const g = (((ix % period) * period + (iy % period)) * period + (iz % period)) * 3;
      return grads[g] * fx + grads[g + 1] * fy + grads[g + 2] * fz;
    };
    for (let z = 0; z < size; z++) for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const px = x * scale, py = y * scale, pz = z * scale;
      const ix = Math.floor(px), iy = Math.floor(py), iz = Math.floor(pz);
      const fx = px - ix, fy = py - iy, fz = pz - iz;
      const u = fade(fx), v = fade(fy), w = fade(fz);
      const a = dot(ix, iy, iz, fx, fy, fz), b = dot(ix + 1, iy, iz, fx - 1, fy, fz);
      const c = dot(ix, iy + 1, iz, fx, fy - 1, fz), d = dot(ix + 1, iy + 1, iz, fx - 1, fy - 1, fz);
      const e = dot(ix, iy, iz + 1, fx, fy, fz - 1), f = dot(ix + 1, iy, iz + 1, fx - 1, fy, fz - 1);
      const g = dot(ix, iy + 1, iz + 1, fx, fy - 1, fz - 1), h = dot(ix + 1, iy + 1, iz + 1, fx - 1, fy - 1, fz - 1);
      const x1 = a + (b - a) * u, x2 = c + (d - c) * u, x3 = e + (f - e) * u, x4 = g + (h - g) * u;
      const y1 = x1 + (x2 - x1) * v, y2 = x3 + (x4 - x3) * v;
      const n = (y1 + (y2 - y1) * w) * 1.25;
      data[((z * size + y) * size + x) * 4 + channel] = Math.max(0, Math.min(255, Math.round(127.5 + n * 127.5)));
    }
  });
  const texture = new THREE.Data3DTexture(data, size, size, size);
  texture.format = THREE.RGBAFormat;
  texture.type = THREE.UnsignedByteType;
  texture.wrapS = texture.wrapT = texture.wrapR = THREE.RepeatWrapping;
  texture.magFilter = texture.minFilter = THREE.LinearFilter;
  texture.unpackAlignment = 1;
  texture.needsUpdate = true;
  return texture;
}

/** GLSL fBm over the noise volume; `p` is in tile units (1 tile = 4 coarse cells). */
export const GLSL_FIRE_NOISE = /* glsl */ `
float fireFbm(sampler3D volume, vec3 p) { return dot(texture(volume, p), vec4(0.5, 0.27, 0.15, 0.08)) * 1.0; }
float fireFbm2(sampler3D volume, vec3 p) { vec4 n = texture(volume, p); return n.r * 0.6 + n.g * 0.4; }
`;

/** Blackbody-like ramp: deep red, orange, yellow and a white-hot core (linear, HDR). */
export const GLSL_FIRE_RAMP = /* glsl */ `
vec3 fireRamp(float heat) {
  heat = clamp(heat, 0.0, 1.2);
  vec3 c = vec3(0.55, 0.05, 0.004) * smoothstep(0.02, 0.22, heat);
  c += vec3(0.75, 0.22, 0.02) * smoothstep(0.15, 0.45, heat);
  c += vec3(0.35, 0.42, 0.10) * smoothstep(0.38, 0.72, heat);
  c += vec3(0.45, 0.42, 0.34) * smoothstep(0.66, 1.05, heat);
  // Radiance rises steeply with temperature, as in Planck's law.
  return c * (0.35 + 6.0 * heat * heat * heat);
}
`;

export interface FlameOccluder { a: THREE.Vector3; b: THREE.Vector3; radius: number }

export interface FlameOptions {
  noise: THREE.Data3DTexture;
  /** Flame height and base radius in the parent's local units. */
  height: number;
  radius: number;
  /** Radiance multiplier; 1 gives a white-hot core around 15–25. */
  intensity?: number;
  /** Logs and stones (parent-local) that hide flame behind them. Up to 8. */
  occluders?: FlameOccluder[];
  seed?: number;
  /** Ray-march steps; 26 is plenty for a fire filling a fifth of the screen. */
  steps?: number;
}

const MAX_OCCLUDERS = 8;

const FLAME_VERTEX = /* glsl */ `
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const flameFragment = (steps: number) => /* glsl */ `
precision highp sampler3D;
uniform sampler3D uNoise;
uniform float uTime;
uniform float uHeight;
uniform float uRadius;
uniform float uIntensity;
uniform float uBoost;
uniform float uSeed;
uniform vec3 uOrigin;
uniform float uScale;
uniform vec3 uBoxMin;
uniform vec3 uBoxMax;
uniform vec4 uCapA[${MAX_OCCLUDERS}];
uniform vec4 uCapB[${MAX_OCCLUDERS}];
uniform int uCapCount;
varying vec3 vWorld;
${GLSL_FIRE_NOISE}
${GLSL_FIRE_RAMP}
float flameIgn(vec2 pixel) { return fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715)))); }
float capsuleHit(vec3 ro, vec3 rd, vec3 pa, vec3 pb, float ra) {
  vec3 ba = pb - pa, oa = ro - pa;
  float baba = dot(ba, ba), bard = dot(ba, rd), baoa = dot(ba, oa), rdoa = dot(rd, oa), oaoa = dot(oa, oa);
  float a = baba - bard * bard, b = baba * rdoa - baoa * bard, c = baba * oaoa - baoa * baoa - ra * ra * baba;
  float h = b * b - a * c;
  if (h >= 0.0) {
    float t = (-b - sqrt(h)) / a;
    float y = baoa + t * bard;
    if (y > 0.0 && y < baba) return t;
    vec3 oc = y <= 0.0 ? oa : ro - pb;
    b = dot(rd, oc); c = dot(oc, oc) - ra * ra; h = b * b - c;
    if (h > 0.0) return -b - sqrt(h);
  }
  return 1e5;
}
// Density and temperature of the flame mass at a local point.
float flameAt(vec3 p, out float heat) {
  float h = p.y / uHeight;
  heat = 0.0;
  if (h < 0.0 || h > 1.0) return 0.0;
  float t = uTime * (1.0 + uBoost * 0.15);
  // The whole flame leans and sways with slow eddies; more at the tips.
  vec3 sw = texture(uNoise, vec3(0.11 + uSeed, p.y * 0.22 - t * 0.07, 0.37)).rgb - 0.5;
  vec2 lean = (sw.xy + 0.5 * sw.yz) * h * h * uRadius * 1.6;
  vec3 q = vec3(p.x - lean.x, p.y, p.z - lean.y);
  // Turbulence rises with the hot gas.
  vec3 u = vec3(q.x, q.y * 0.62 - t * 0.62, q.z) / uRadius * 0.34 + uSeed;
  float n = fireFbm(uNoise, u);
  float n2 = fireFbm2(uNoise, u * 2.15 + vec3(0.31, -t * 0.35, 0.17));
  float r = length(q.xz) / uRadius;
  // Broad base narrowing into tongues; noise frays the edge more with height.
  float width = pow(1.0 - h, 0.78) * (0.92 + 0.25 * uBoost);
  float edge = width - r + (n - 0.5) * (0.55 + 1.5 * h) + (n2 - 0.5) * 0.45;
  float density = smoothstep(-0.02, 0.32, edge);
  // Tongues detach and burn out toward the top.
  density *= smoothstep(h * 0.95 - 0.12, h * 0.95 + 0.22, n * 1.08 + n2 * 0.34 + 0.06 * uBoost);
  density *= smoothstep(0.0, 0.08, h);
  heat = density * pow(1.0 - h, 1.15) * (0.55 + 0.75 * n2) * (1.0 - 0.35 * clamp(r, 0.0, 1.0));
  return density;
}
void main() {
  vec3 ro = (cameraPosition - uOrigin) / uScale;
  vec3 rd = normalize(vWorld - cameraPosition);
  vec3 inv = 1.0 / rd;
  vec3 t0 = (uBoxMin - ro) * inv, t1 = (uBoxMax - ro) * inv;
  vec3 tmin = min(t0, t1), tmax = max(t0, t1);
  float enter = max(max(max(tmin.x, tmin.y), tmin.z), 0.0);
  float exit = min(min(tmax.x, tmax.y), tmax.z);
  for (int i = 0; i < ${MAX_OCCLUDERS}; i++) {
    if (i >= uCapCount) break;
    float hit = capsuleHit(ro, rd, uCapA[i].xyz, uCapB[i].xyz, uCapA[i].w);
    if (hit > 0.0) exit = min(exit, hit);
  }
  if (rd.y < 0.0) exit = min(exit, (0.02 - ro.y) / rd.y);
  if (exit <= enter) discard;
  const int STEPS = ${steps};
  float dt = (exit - enter) / float(STEPS);
  float jitter = flameIgn(gl_FragCoord.xy);
  vec3 radiance = vec3(0.0);
  for (int i = 0; i < STEPS; i++) {
    vec3 p = ro + rd * (enter + (float(i) + jitter) * dt);
    float heat;
    float density = flameAt(p, heat);
    if (density > 0.001) radiance += fireRamp(heat * (1.0 + 0.25 * uBoost)) * density * dt;
  }
  radiance *= uIntensity * 9.0 / uRadius;
  if (max(radiance.r, max(radiance.g, radiance.b)) < 1e-3) discard;
  gl_FragColor = vec4(radiance, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/** A ray-marched flame in a proxy box. Add `mesh` to the fire's group (base at its origin). */
export function createFlame(options: FlameOptions) {
  const { height, radius } = options;
  const margin = radius * 1.75;
  const boxMin = new THREE.Vector3(-margin, 0, -margin), boxMax = new THREE.Vector3(margin, height * 1.04, margin);
  const geometry = new THREE.BoxGeometry(boxMax.x - boxMin.x, boxMax.y - boxMin.y, boxMax.z - boxMin.z);
  geometry.translate(0, (boxMax.y + boxMin.y) / 2, 0);
  const capA = Array.from({ length: MAX_OCCLUDERS }, () => new THREE.Vector4());
  const capB = Array.from({ length: MAX_OCCLUDERS }, () => new THREE.Vector4());
  const occluders = (options.occluders ?? []).slice(0, MAX_OCCLUDERS);
  occluders.forEach((o, i) => { capA[i].set(o.a.x, o.a.y, o.a.z, o.radius); capB[i].set(o.b.x, o.b.y, o.b.z, 0); });
  const uniforms = {
    uNoise: { value: options.noise }, uTime: { value: 0 }, uHeight: { value: height }, uRadius: { value: radius },
    uIntensity: { value: options.intensity ?? 1 }, uBoost: { value: 0 }, uSeed: { value: ((options.seed ?? 0) * 0.137) % 1 },
    uOrigin: { value: new THREE.Vector3() }, uScale: { value: 1 }, uBoxMin: { value: boxMin }, uBoxMax: { value: boxMax },
    uCapA: { value: capA }, uCapB: { value: capB }, uCapCount: { value: occluders.length },
  };
  const material = new THREE.ShaderMaterial({
    uniforms, vertexShader: FLAME_VERTEX, fragmentShader: flameFragment(options.steps ?? 26),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.FrontSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'Ray-marched flame volume';
  mesh.renderOrder = 4;
  mesh.castShadow = mesh.receiveShadow = false;
  const scratch = new THREE.Vector3();
  mesh.onBeforeRender = () => {
    uniforms.uOrigin.value.setFromMatrixPosition(mesh.matrixWorld);
    uniforms.uScale.value = scratch.setFromMatrixScale(mesh.matrixWorld).x;
  };
  return { mesh, uniforms, material };
}

export interface EmberOptions {
  count: number;
  /** Spawn disc radius and height (parent-local). */
  radius: number;
  spawnY: number;
  /** Typical rise height before they cool out. */
  rise: number;
  seed?: number;
  /** Fraction of particles alive at rest (0..1). */
  rate?: number;
  size?: number;
}

const EMBER_VERTEX = /* glsl */ `
uniform float uTime;
uniform float uRate;
uniform float uStokeTime;
uniform float uStokeAmp;
uniform float uRadius;
uniform float uSpawnY;
uniform float uRise;
uniform float uSize;
uniform float uPixelRatio;
attribute vec4 seed;
varying vec3 vColor;
varying float vAlpha;
float emberHash(float n) { return fract(sin(n * 12.9898 + 78.233) * 43758.5453); }
void main() {
  float life = 2.2 + seed.x * 3.4;
  float clock = uTime + seed.y * 97.0;
  float age = mod(clock, life);
  float cycle = floor(clock / life);
  float h1 = emberHash(cycle * 1.31 + seed.z * 71.0), h2 = emberHash(cycle * 2.17 + seed.w * 53.0), h3 = emberHash(cycle * 0.73 + seed.x * 29.0);
  // Interaction raises the spawn rate gently for a few seconds, never a burst.
  float spawnTime = uTime - age;
  float since = spawnTime - uStokeTime;
  float boost = since > 0.0 ? uStokeAmp * smoothstep(0.0, 0.8, since) * exp(-max(since - 0.8, 0.0) / 2.6) : 0.0;
  float alive = step(h3, uRate + boost);
  float a = h1 * 6.2831853, r = sqrt(h2) * uRadius;
  vec3 p = vec3(cos(a) * r, uSpawnY + h2 * uRise * 0.15, sin(a) * r);
  // Buoyant rise that slows as the ember cools, with lazy eddies.
  float tau = 0.9 + seed.z * 0.8;
  float climb = uRise * (0.55 + 0.65 * h3) * (1.0 - exp(-age / tau)) + age * 0.06;
  p.y += climb;
  float swirl = age * (0.9 + seed.w * 1.2) + seed.x * 6.28;
  p.x += sin(swirl) * 0.05 * age + (h1 - 0.5) * 0.18 * age + 0.03 * age * age;
  p.z += cos(swirl * 0.8) * 0.05 * age + (h2 - 0.5) * 0.16 * age;
  float cool = exp(-age * (0.75 + seed.y * 0.6));
  float flicker = 0.8 + 0.2 * sin(uTime * (5.0 + seed.w * 6.0) + seed.z * 40.0);
  vec3 hot = mix(vec3(1.0, 0.18, 0.02), vec3(1.0, 0.55, 0.16), cool);
  hot = mix(hot, vec3(1.0, 0.85, 0.6), cool * cool * 0.6);
  vColor = hot * (0.5 + 7.5 * cool * cool) * flicker;
  vAlpha = alive * smoothstep(0.0, 0.12, age) * (1.0 - smoothstep(life * 0.7, life, age));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(uSize * (0.6 + 0.6 * cool) / -mv.z, 1.0, 5.0) * uPixelRatio;
  if (vAlpha <= 0.0) gl_PointSize = 0.0;
}
`;

const EMBER_FRAGMENT = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float core = exp(-d * d * 3.5);
  gl_FragColor = vec4(vColor * core * vAlpha, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/** GPU embers; call `stoke(time)` for a slow, bounded increase in their number. */
export function createEmbers(options: EmberOptions) {
  const random = mulberry(options.seed ?? 7);
  const seeds = new Float32Array(options.count * 4);
  for (let i = 0; i < seeds.length; i++) seeds[i] = random();
  const geometry = new THREE.BufferGeometry();
  // Positions are computed in the shader; the attribute only sizes the draw.
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(options.count * 3), 3));
  geometry.setAttribute('seed', new THREE.BufferAttribute(seeds, 4));
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, options.spawnY + options.rise * 0.6, 0), options.rise * 1.6 + options.radius);
  const uniforms = {
    uTime: { value: 0 }, uRate: { value: options.rate ?? 0.3 }, uStokeTime: { value: -1e3 }, uStokeAmp: { value: 0 },
    uRadius: { value: options.radius }, uSpawnY: { value: options.spawnY }, uRise: { value: options.rise },
    uSize: { value: options.size ?? 10 }, uPixelRatio: { value: 1 },
  };
  const points = new THREE.Points(geometry, new THREE.ShaderMaterial({
    uniforms, vertexShader: EMBER_VERTEX, fragmentShader: EMBER_FRAGMENT,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  points.name = 'Rising embers';
  points.renderOrder = 5;
  points.onBeforeRender = (renderer) => { uniforms.uPixelRatio.value = Math.min(2, renderer.getPixelRatio()); };
  return {
    points, uniforms,
    stoke(time: number, amount = 0.35) {
      uniforms.uStokeAmp.value = Math.min(0.55, amount + 0.4 * uniforms.uStokeAmp.value * Math.exp(-Math.max(0, time - uniforms.uStokeTime.value) / 2.6));
      uniforms.uStokeTime.value = time;
    },
  };
}

/** Smooth, unsynchronised flicker around 1 (±~18%), for the fire's key light. */
export function fireFlicker(time: number, seed = 0): number {
  return 1 + noise3(time * 1.7, seed * 3.1, 0.5) * 0.11 + noise3(time * 4.3, seed + 7.7, 2.5) * 0.055 + noise3(time * 9.1, 1.3, seed + 4.4) * 0.025;
}

/** Heat shimmer: rays crossing the hot column above a fire are bent slightly. */
export interface HeatShimmer {
  uniforms: {
    uHeatColumn: { value: THREE.Vector4 };
    uHeatParams: { value: THREE.Vector2 };
    uHeatTime: { value: number };
  };
}

export function createHeatShimmer(base: THREE.Vector3, radius: number, height: number, strength = 0.0025): HeatShimmer {
  return { uniforms: { uHeatColumn: { value: new THREE.Vector4(base.x, base.y, base.z, radius) }, uHeatParams: { value: new THREE.Vector2(height, strength) }, uHeatTime: { value: 0 } } };
}

/** Declarations plus `vec2 fireHeatOffset(vec3 world)`: angular offset (radians, view x/y). */
export const GLSL_HEAT_SHIMMER = /* glsl */ `
uniform vec4 uHeatColumn;
uniform vec2 uHeatParams;
uniform float uHeatTime;
vec2 fireHeatOffset(vec3 world) {
  vec3 ro = cameraPosition;
  vec3 toTarget = world - ro;
  float targetDistance = length(toTarget);
  vec3 rd = toTarget / max(targetDistance, 1e-4);
  vec2 o = ro.xz - uHeatColumn.xz;
  float dd = max(dot(rd.xz, rd.xz), 1e-5);
  float t = -dot(o, rd.xz) / dd;
  if (t <= 0.0 || t > targetDistance - uHeatColumn.w) return vec2(0.0);
  vec3 p = ro + rd * t;
  float r = length(p.xz - uHeatColumn.xz) / uHeatColumn.w;
  float h = (p.y - uHeatColumn.y) / uHeatParams.x;
  float mask = (1.0 - smoothstep(0.35, 1.0, r)) * smoothstep(-0.05, 0.12, h) * (1.0 - smoothstep(0.45, 1.0, h));
  if (mask <= 0.0) return vec2(0.0);
  float s = uHeatTime;
  vec3 q = p * vec3(7.0, 5.0, 7.0) - vec3(0.0, s * 3.1, 0.0);
  float a = sin(q.x + sin(q.y * 1.3 + s * 0.7) * 1.7) * cos(q.z * 0.9 + q.y * 0.6);
  float b = sin(q.y * 1.1 + cos(q.x * 1.4 - s * 0.9) * 1.5 + q.z * 0.5);
  return vec2(a, b) * mask * uHeatParams.y;
}
`;

/** Adds the shimmer to a built-in material's vertex output (clip-space offset). */
export function applyHeatShimmer(material: THREE.Material, shimmer: HeatShimmer, key: string) {
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    Object.assign(shader.uniforms, shimmer.uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${GLSL_HEAT_SHIMMER}`)
      .replace('#include <project_vertex>', `#include <project_vertex>
{
  vec4 heatPosition = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    heatPosition = instanceMatrix * heatPosition;
  #endif
  vec2 heat = fireHeatOffset((modelMatrix * heatPosition).xyz);
  gl_Position.xy += heat * vec2(projectionMatrix[0][0], projectionMatrix[1][1]) * gl_Position.w;
}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|bw-heat|${key}`;
  return material;
}

function mulberry(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

