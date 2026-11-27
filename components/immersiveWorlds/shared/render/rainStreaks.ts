import * as THREE from 'three';
import { GLSL_NOISE } from './glsl';

/*
 * GPU rain for the immersive worlds. Everything animates in the vertex shader
 * from a shared clock, so a layer is one instanced draw with no CPU updates.
 *  - createRainLayer: falling drops drawn as motion-blurred streaks. Width is
 *    clamped to a pixel and its coverage scaled down, so distant rain thins
 *    out instead of aliasing. `gravity` turns a layer into drips that fall
 *    from rest off an edge (eaves, a tent fly) and accelerate.
 *  - createRainSplashes: short-lived crowns and rings at impact points.
 *  - createRunoff: continuous streams that pour off an edge and break up
 *    into drops as they fall.
 * Shaders write linear HDR radiance (the sky the water reflects) and include
 * the tone-mapping chunks, so they also work on the direct render path.
 * Original implementation.
 */

/** Unit quad: x across (-1..1), y along (0..1). */
const QUAD = () => {
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([-1, 0, 0, 1, 0, 0, -1, 1, 0, 1, 1, 0], 3));
  geometry.setIndex([0, 2, 1, 2, 3, 1]);
  return geometry;
};

const random = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) >>> 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const TONE = /* glsl */ `
#include <tonemapping_fragment>
#include <colorspace_fragment>`;

export interface RainLayerOptions {
  count: number;
  /** World-space spawn box; drops fall from max.y down to min.y. */
  min: THREE.Vector3;
  max: THREE.Vector3;
  time: { value: number };
  /** Fall speed in m/s (terminal velocity of rain is ~6-9 m/s). */
  speed?: number;
  /** Drips: start from rest at the top and accelerate under gravity. */
  gravity?: boolean;
  /** Mean pause between drips, in multiples of the fall time. */
  dripPause?: number;
  /** Horizontal drift per metre fallen (x, z). */
  wind?: THREE.Vector2;
  /** Exposure time of the motion blur in seconds. */
  shutter?: number;
  /** Drop width in metres. */
  width?: number;
  /** Linear HDR radiance of a lit drop. */
  radiance?: THREE.Color;
  /** Background coverage of a streak (0..1). */
  opacity?: number;
  /** Spawn height drops this much parabolically toward the box's x edges. */
  sag?: number;
  nearFade?: number;
  farFade?: number;
  /** Multiplies radiance; compensates later attenuation by a volume pass. */
  boost?: number;
  seed?: number;
}

export interface RainLayer {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  setViewHeight(pixels: number): void;
  /** Changes the radiance boost (e.g. 1 when no volume pass will dim the rain). */
  setBoost(boost: number): void;
  dispose(): void;
}

export function createRainLayer(options: RainLayerOptions): RainLayer {
  const o = {
    speed: 7.5, gravity: false, dripPause: 2.5, wind: new THREE.Vector2(0, 0), shutter: 0.035, width: 0.0016,
    radiance: new THREE.Color(1.6, 1.75, 1.8), opacity: 0.55, sag: 0, nearFade: 0.4, farFade: 120, boost: 1, seed: 1, ...options,
  };
  const geometry = QUAD();
  const rnd = random(o.seed * 7919 + 17);
  const seeds = new Float32Array(o.count * 4);
  for (let i = 0; i < seeds.length; i++) seeds[i] = rnd();
  geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 4));
  geometry.instanceCount = o.count;
  const size = o.max.clone().sub(o.min);
  const material = new THREE.ShaderMaterial({
    defines: o.gravity ? { RAIN_GRAVITY: '' } : {},
    uniforms: {
      uTime: o.time, uMin: { value: o.min.clone() }, uSize: { value: size },
      uSpeed: { value: o.speed }, uPause: { value: o.dripPause }, uWind: { value: o.wind.clone() }, uShutter: { value: o.shutter },
      uWidth: { value: o.width }, uViewHeight: { value: 800 }, uSag: { value: o.sag },
      uNearFade: { value: o.nearFade }, uFarFade: { value: o.farFade },
      uRadiance: { value: o.radiance.clone().multiplyScalar(o.boost) }, uOpacity: { value: o.opacity },
    },
    vertexShader: /* glsl */ `
attribute vec4 aSeed;
uniform float uTime, uSpeed, uPause, uShutter, uWidth, uViewHeight, uSag, uNearFade, uFarFade;
uniform vec3 uMin, uSize;
uniform vec2 uWind;
varying vec2 vCorner;
varying float vFade;
void main() {
  float fall, velocity, visible = 1.0;
#ifdef RAIN_GRAVITY
  float drop = sqrt(2.0 * uSize.y / 9.81);
  float period = drop * (1.0 + uPause * (0.4 + 1.2 * aSeed.w));
  float t = mod(uTime + aSeed.y * 97.0, period);
  visible = step(t, drop);
  t = min(t, drop);
  fall = 4.905 * t * t;
  velocity = 9.81 * t;
#else
  velocity = uSpeed * (0.82 + 0.36 * aSeed.w);
  fall = mod(aSeed.y * uSize.y + uTime * velocity, uSize.y);
#endif
  float edge = aSeed.x * 2.0 - 1.0;
  float top = uMin.y + uSize.y - uSag * edge * edge;
  vec3 head = vec3(uMin.x + aSeed.x * uSize.x, top - fall, uMin.z + aSeed.z * uSize.z) + vec3(uWind.x, 0.0, uWind.y) * fall;
  vec3 up = normalize(vec3(-uWind.x, 1.0, -uWind.y));
  vec3 tail = head + up * min(velocity * uShutter, fall + 0.002);
  vec3 hv = (viewMatrix * vec4(head, 1.0)).xyz;
  vec3 tv = (viewMatrix * vec4(tail, 1.0)).xyz;
  vec3 p = mix(hv, tv, position.y);
  vec3 axis = tv - hv;
  vec3 side = cross(axis, p);
  side = dot(side, side) > 1e-12 ? normalize(side) : vec3(1.0, 0.0, 0.0);
  float pixel = -p.z * 2.0 / (projectionMatrix[1][1] * uViewHeight);
  float width = max(uWidth, pixel * 1.4);
  float depth = -p.z;
  vFade = visible * (uWidth / width) * smoothstep(uNearFade, uNearFade * 1.8, depth) * (1.0 - smoothstep(uFarFade * 0.55, uFarFade, depth));
  p += side * position.x * width * 0.5;
  vCorner = position.xy;
  gl_Position = projectionMatrix * vec4(p, 1.0);
}`,
    fragmentShader: /* glsl */ `
uniform vec3 uRadiance;
uniform float uOpacity;
varying vec2 vCorner;
varying float vFade;
void main() {
  float across = exp(-vCorner.x * vCorner.x * 2.6);
  // The drop itself is at the head; the blurred trail behind it fades out.
  float along = smoothstep(0.0, 0.06, vCorner.y) * pow(1.0 - vCorner.y, 0.6);
  float a = across * along * vFade * uOpacity;
  if (a < 0.002) discard;
  gl_FragColor = vec4(uRadiance * a, a * 0.3);
  ${TONE}
}`,
    transparent: true, depthWrite: false, depthTest: true, side: THREE.DoubleSide,
    blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 5;
  return {
    mesh, material,
    setViewHeight(pixels) { material.uniforms.uViewHeight.value = Math.max(1, pixels); },
    setBoost(boost) { material.uniforms.uRadiance.value.copy(o.radiance).multiplyScalar(boost); },
    dispose() { geometry.dispose(); material.dispose(); },
  };
}

export interface SplashOptions {
  /** Impact spots, xyz triples (world). */
  points: ArrayLike<number>;
  time: { value: number };
  /** Crown radius in metres. */
  size?: number;
  /** Mean impacts per second at one spot. */
  rate?: number;
  /** Lifetime of one splash, seconds. */
  life?: number;
  /** Random offset of each impact around its spot, metres. */
  jitter?: number;
  radiance?: THREE.Color;
  opacity?: number;
  seed?: number;
}

export function createRainSplashes(options: SplashOptions) {
  const o = { size: 0.045, rate: 1.4, life: 0.2, jitter: 0.12, radiance: new THREE.Color(1.5, 1.6, 1.65), opacity: 0.8, seed: 3, ...options };
  const count = Math.floor(o.points.length / 3);
  const geometry = QUAD();
  const rnd = random(o.seed * 104729 + 3);
  const seeds = new Float32Array(count * 4);
  for (let i = 0; i < seeds.length; i++) seeds[i] = rnd();
  geometry.setAttribute('aSpot', new THREE.InstancedBufferAttribute(Float32Array.from(o.points), 3));
  geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 4));
  geometry.instanceCount = count;
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: o.time, uSize: { value: o.size }, uRate: { value: o.rate }, uLife: { value: o.life }, uJitter: { value: o.jitter },
      uRadiance: { value: o.radiance.clone() }, uOpacity: { value: o.opacity },
    },
    vertexShader: /* glsl */ `
${GLSL_NOISE}
attribute vec3 aSpot;
attribute vec4 aSeed;
uniform float uTime, uSize, uRate, uLife, uJitter;
varying vec2 vUv;
varying float vAge;
varying vec3 vRand;
void main() {
  float rate = uRate * (0.6 + 0.8 * aSeed.y);
  float cycle = uTime * rate + aSeed.x * 31.0;
  float index = floor(cycle);
  vAge = fract(cycle) / (uLife * rate);
  vec3 h = bwHash3(vec3(index, aSeed.z * 977.0, aSeed.w * 613.0));
  vRand = h;
  // Each impact lands somewhere new; a few cycles stay dry.
  vec3 spot = aSpot + vec3(h.x - 0.5, 0.0, h.y - 0.5) * 2.0 * uJitter;
  float live = step(vAge, 1.0) * step(0.18, h.z);
  vec3 toCamera = cameraPosition - spot;
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), toCamera));
  float size = uSize * (0.7 + 0.6 * h.z) * live;
  vec3 p = spot + right * position.x * size + vec3(0.0, 1.0, 0.0) * position.y * size * 1.3;
  vUv = position.xy;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,
    fragmentShader: /* glsl */ `
uniform vec3 uRadiance;
uniform float uOpacity;
varying vec2 vUv;
varying float vAge;
varying vec3 vRand;
void main() {
  float age = clamp(vAge, 0.0, 1.0);
  float glow = 0.0;
  // Secondary droplets thrown up and out on short ballistic arcs.
  for (int k = 0; k < 6; k++) {
    float fk = float(k);
    float side = fract(sin(fk * 12.9898 + vRand.x * 78.233) * 43758.5453) * 2.0 - 1.0;
    float lift = 0.45 + 0.55 * fract(sin(fk * 4.1414 + vRand.y * 31.7) * 9631.17);
    vec2 c = vec2(side * age * 0.95, 4.0 * lift * age * (1.0 - age) * 0.62 + 0.02);
    vec2 d = (vUv - c) / vec2(0.075, 0.1);
    glow += exp(-dot(d, d));
  }
  // The crown sheet and the ring it leaves on the water film.
  float radius = 0.18 + age * 0.75;
  vec2 e = vec2(vUv.x / radius, (vUv.y - 0.02) / (radius * 0.22));
  float ring = exp(-pow((length(e) - 1.0) * 6.0, 2.0)) * step(vUv.y, 0.25);
  float crown = exp(-pow((abs(vUv.x) - radius * 0.8) / 0.06, 2.0)) * smoothstep(0.32 * (1.0 - age) + 0.02, 0.0, vUv.y) * (1.0 - age);
  float a = (glow * (1.0 - age * 0.6) + ring * 0.7 + crown * 0.8) * (1.0 - age) * uOpacity;
  if (a < 0.003) discard;
  gl_FragColor = vec4(uRadiance * a, a * 0.25);
  ${TONE}
}`,
    transparent: true, depthWrite: false, depthTest: true, side: THREE.DoubleSide,
    blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 6;
  return { mesh, material, dispose() { geometry.dispose(); material.dispose(); } };
}

export interface RunoffStream {
  top: THREE.Vector3;
  bottom: THREE.Vector3;
  /** Width of the coherent column at the top, metres. */
  width: number;
  /** 0..1: how much water; thin streams break into drops sooner. */
  flow?: number;
}

/** Water pouring off an edge: a coherent column that breaks into drops as it accelerates. */
export function createRunoff(streams: RunoffStream[], options: { time: { value: number }; radiance?: THREE.Color; opacity?: number }) {
  const positions: number[] = [], uvs: number[] = [], params: number[] = [], indices: number[] = [];
  const rnd = random(4447);
  streams.forEach((stream, index) => {
    const base = index * 4;
    const length = stream.top.distanceTo(stream.bottom);
    const seed = rnd();
    for (const [u, v] of [[-1, 0], [1, 0], [-1, 1], [1, 1]]) {
      const p = stream.top.clone().lerp(stream.bottom, v);
      positions.push(p.x, p.y, p.z);
      uvs.push(u, v);
      params.push(length, stream.width, stream.flow ?? 0.7, seed);
    }
    indices.push(base, base + 2, base + 1, base + 2, base + 3, base + 1);
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('aStream', new THREE.Float32BufferAttribute(params, 4));
  geometry.setIndex(indices);
  const material = new THREE.ShaderMaterial({
    uniforms: { uTime: options.time, uRadiance: { value: (options.radiance ?? new THREE.Color(1.8, 1.9, 1.95)).clone() }, uOpacity: { value: options.opacity ?? 0.85 } },
    vertexShader: /* glsl */ `
attribute vec4 aStream;
uniform float uTime;
varying vec2 vUv;
varying vec4 vStream;
void main() {
  vUv = uv; vStream = aStream;
  // Billboard about the vertical: the column always shows its width.
  vec3 toCamera = cameraPosition - position;
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), toCamera));
  // Accelerating water thins out; keep a pixel-ish minimum width.
  float width = aStream.y * mix(1.0, 0.55, uv.y) + 0.0025;
  vec3 p = position + right * uv.x * width * 0.5;
  // Gusts swing the lower, freely falling part of the stream a little.
  float sway = uv.y * uv.y * aStream.x * 0.012;
  p += right * sin(uTime * 0.9 + aStream.w * 37.0) * sway + vec3(0.0, 0.0, cos(uTime * 0.7 + aStream.w * 11.0) * sway * 0.6);
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,
    fragmentShader: /* glsl */ `
${GLSL_NOISE}
uniform float uTime;
uniform vec3 uRadiance;
uniform float uOpacity;
varying vec2 vUv;
varying vec4 vStream;
void main() {
  float s = vUv.y * vStream.x;                 // metres fallen
  float flight = sqrt(2.0 * s / 9.81);         // seconds since the water left the edge
  float x = vUv.x;
  // Coherent sheet near the edge, beading into separate drops further down.
  float column = exp(-x * x * 2.2);
  float pulse = bwNoise(vec3(x * 1.3, flight * 9.0 - uTime * 9.0, vStream.w * 50.0)) * 0.5 + 0.5;
  float beads = bwNoise(vec3(x * 2.0 + vStream.w * 9.0, flight * 24.0 - uTime * 24.0, 3.0)) * 0.5 + 0.5;
  float breakup = smoothstep(0.08, 1.1, s * (1.25 - vStream.z));
  float body = mix(smoothstep(0.25, 0.55, pulse), smoothstep(0.62, 0.8, beads), breakup);
  float core = 0.65 + 0.7 * exp(-x * x * 9.0);  // bright refracted core, darker rims
  float a = column * body * uOpacity * (1.0 - smoothstep(0.92, 1.0, vUv.y)) * smoothstep(0.0, 0.02, vUv.y);
  if (a < 0.003) discard;
  gl_FragColor = vec4(uRadiance * core * a, a * 0.4);
  ${TONE}
}`,
    transparent: true, depthWrite: false, depthTest: true, side: THREE.DoubleSide,
    blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 5;
  return { mesh, material, dispose() { geometry.dispose(); material.dispose(); } };
}
