import * as THREE from 'three';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { fbm3, noise3, seeded } from '../../shared/render/noise';

/*
 * Land and beach detail for the pebble strand, all generated in code:
 *  - cliffGeometry: a headland built as a wall around a noisy outline, with
 *    real horizontal strata (hard beds stand proud, soft partings recess),
 *    vertical joints, a talus apron at the foot and a domed turf cap;
 *  - cliffMaterial: per-bed rock colour that matches the geometry's layers,
 *    the black and orange lichen zones above the sea, runoff streaks and grass
 *    on every upward-facing ledge and on the top;
 *  - shell and wrack (seaweed) geometry for the strand.
 */

const layerHash = (layer: number, seed: number) => { const s = Math.sin(layer * 12.9898 + seed * 78.233) * 43758.5453; return s - Math.floor(s); };
const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

export interface CliffOptions {
  cx: number; cz: number;
  /** Half extents of the outline along x and z. */
  a: number; b: number;
  height: number;
  seed: number;
  /** 0..1: how much lower the eastern (+x) end is, stepping down toward the point. */
  taperEast?: number;
  /** Width of the boulder apron at the foot, metres. */
  talus?: number;
  base?: number;
  segments?: number;
  rows?: number;
  capRows?: number;
}

/** Strata layer thickness in metres and the bed sequence seed; shared by geometry and shading. */
export const CLIFF_LAYER = 1.35;
const CLIFF_STRATA_SEED = 3.1;

export function cliffGeometry(o: CliffOptions) {
  const segments = o.segments ?? 200, rows = o.rows ?? 64, capRows = o.capRows ?? 10, base = o.base ?? -2.5;
  const positions: number[] = [];
  const indices: number[] = [];
  const tops: number[] = [], radii: number[] = [];
  for (let i = 0; i < segments; i++) {
    const th = i / segments * Math.PI * 2, c = Math.cos(th), s = Math.sin(th);
    const n = 2.4;
    const r0 = 1 / Math.pow(Math.pow(Math.abs(c) / o.a, n) + Math.pow(Math.abs(s) / o.b, n), 1 / n);
    const bays = fbm3(c * 1.5 + o.seed, s * 1.5, o.seed * .7, 3) * .22 + fbm3(c * 4.2 + o.seed, s * 4.2, 1.3, 2) * .07;
    radii.push(r0 * (1 + bays));
    tops.push(o.height * (.86 + .22 * fbm3(c * 1.2, s * 1.2 + o.seed, 2.2, 3)) * (1 - (o.taperEast ?? 0) * smooth(.15, 1, c)));
  }
  const stride = rows + 1 + capRows;
  for (let i = 0; i < segments; i++) {
    const th = i / segments * Math.PI * 2, c = Math.cos(th), s = Math.sin(th);
    const top = tops[i], R = radii[i];
    let rim = R;
    for (let j = 0; j <= rows; j++) {
      const y = base + (top - base) * j / rows;
      // Strata dip gently; each bed's hardness sets whether it stands proud.
      const ys = y + (o.cx + c * R) * .03;
      const lc = ys / CLIFF_LAYER + .3 * Math.sin(ys * .23 + CLIFF_STRATA_SEED) + .28 * Math.sin(ys * .61 + 1.7);
      const layer = Math.floor(lc), u = lc - layer;
      let off = (layerHash(layer, CLIFF_STRATA_SEED) - .5) * 1.1;
      off -= .7 * smooth(.72, 1, u) - .25 * smooth(0, .2, u) * (1 - smooth(.2, .4, u));
      // Vertical joints and gullies cut the beds into blocks.
      off -= .9 * Math.pow(1 - Math.abs(noise3(c * 8.5 + o.seed, y * .04, s * 8.5)), 9);
      off += .45 * fbm3(c * 6 + o.seed, y * .22, s * 6, 3);
      off *= Math.min(1, Math.min(o.a, o.b) / 6);
      // Talus apron at the foot, rounded shoulder under the turf at the top.
      const talus = y < 1.6 ? Math.pow((1.6 - y) / (1.6 - base), 1.3) * (o.talus ?? 5.5) * (.65 + .35 * noise3(c * 5, 1.1, s * 5 + o.seed)) : 0;
      const shoulder = smooth(top - 1.6, top, y);
      const r = Math.max(.5, R + off * (1 - shoulder * .6) + talus - 1.1 * shoulder * shoulder - (y - base) * .04);
      positions.push(o.cx + c * r, y, o.cz + s * r);
      rim = r;
    }
    for (let k = 1; k <= capRows; k++) {
      const f = 1 - k / (capRows + 1);
      const r = rim * f;
      const dome = o.height * .12 * (1 - f * f);
      const hummock = .5 * fbm3((o.cx + c * r) * .12, o.seed, (o.cz + s * r) * .12, 3);
      positions.push(o.cx + c * r, top + dome + hummock * (1 - f * .5), o.cz + s * r);
    }
  }
  const centre = positions.length / 3;
  const meanTop = tops.reduce((a, b) => a + b, 0) / segments;
  positions.push(o.cx, meanTop + o.height * .12, o.cz);
  for (let i = 0; i < segments; i++) {
    const a0 = i * stride, a1 = ((i + 1) % segments) * stride;
    for (let j = 0; j < stride - 1; j++) indices.push(a0 + j, a0 + j + 1, a1 + j, a1 + j, a0 + j + 1, a1 + j + 1);
    indices.push(a0 + stride - 1, centre, a1 + stride - 1);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

/** Strata (matching cliffGeometry's beds), lichen zones, runoff and turf. */
export function cliffMaterial(key: string, time: { value: number }) {
  const seed = CLIFF_STRATA_SEED;
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .9, metalness: 0, envMapIntensity: .7 });
  material.onBeforeCompile = shader => {
    shader.uniforms.uCliffTime = time;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vCliffWorld;\nvarying vec3 vCliffNormal;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvCliffWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvCliffNormal = normalize(mat3(modelMatrix) * objectNormal);');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float uCliffTime;
varying vec3 vCliffWorld;
varying vec3 vCliffNormal;
${GLSL_NOISE}
float cliffRelief(vec3 p) { return bwFbm3(p * vec3(0.5, 1.6, 0.5)) * 0.35 + bwNoise(p * 2.3) * 0.08; }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 cp = vCliffWorld;
vec3 cn = normalize(vCliffNormal);
float ys = cp.y + cp.x * 0.03;
float lc = ys / ${CLIFF_LAYER.toFixed(3)} + 0.3 * sin(ys * 0.23 + ${seed.toFixed(3)}) + 0.28 * sin(ys * 0.61 + 1.7);
float layerId = floor(lc), layerU = fract(lc);
float lh = fract(sin(layerId * 12.9898 + ${(seed * 78.233).toFixed(3)}) * 43758.5453);
vec3 rock = lh < 0.3 ? vec3(0.05, 0.05, 0.055) : lh < 0.55 ? vec3(0.092, 0.088, 0.084) : lh < 0.8 ? vec3(0.125, 0.102, 0.08) : vec3(0.105, 0.078, 0.06);
rock = mix(rock, vec3(0.085, 0.08, 0.075), 0.3);
rock *= 0.7 + 0.55 * (bwFbm3(cp * vec3(0.3, 0.9, 0.3)) * 0.5 + 0.5);
// Partings between beds are darker and damper.
rock *= 1.0 - 0.45 * smoothstep(0.78, 1.0, layerU);
// Runoff streaks below ledges.
rock *= 1.0 - 0.35 * smoothstep(0.25, 0.75, bwNoise(vec3(cp.x * 1.1, cp.y * 0.07, cp.z * 1.1)));
// Littoral lichen zones: black just above the sea, orange above that.
float above = cp.y;
float blackZone = 1.0 - smoothstep(0.7, 1.8, above + 0.4 * bwNoise(cp * 0.8));
float orange = smoothstep(1.2, 2.2, above) * (1.0 - smoothstep(3.5, 6.0, above)) * smoothstep(0.0, 0.5, bwNoise(cp * 0.7 + 3.0));
rock = mix(rock, vec3(0.42, 0.19, 0.03), orange * 0.55);
rock = mix(rock, vec3(0.018, 0.02, 0.018), blackZone * 0.85);
// Turf on every upward-facing ledge and over the top.
float grass = smoothstep(0.5, 0.78, cn.y + 0.12 * bwNoise(cp * 0.9)) * smoothstep(1.5, 3.0, above);
vec3 turf = mix(vec3(0.06, 0.085, 0.022), vec3(0.2, 0.17, 0.065), smoothstep(-0.3, 0.5, bwFbm3(cp * 0.15 + 2.0)));
turf *= 0.75 + 0.4 * bwNoise(cp * 3.1);
diffuseColor.rgb = mix(rock, turf, grass);
float cliffWet = blackZone * (1.0 - smoothstep(0.0, 1.0, above));
// Swell washing the foot of the cliff.
float wash = (1.0 - smoothstep(0.05, 0.55 + 0.25 * sin(uCliffTime * 0.6 + cp.x * 0.3), above)) * smoothstep(-0.35, 0.0, above);
wash *= smoothstep(0.1, 0.6, bwNoise(vec3(cp.xz * 1.3, uCliffTime * 0.25)) * 0.5 + 0.5);
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.6, 0.62, 0.64), wash * 0.8);`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(mix(mix(0.88, 0.35, cliffWet), 0.95, grass), 0.6, wash);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  const float e = 0.08;
  float h0 = cliffRelief(cp);
  vec3 grad = vec3(cliffRelief(cp + vec3(e, 0.0, 0.0)) - h0, cliffRelief(cp + vec3(0.0, e, 0.0)) - h0, cliffRelief(cp + vec3(0.0, 0.0, e)) - h0) / e;
  grad *= 1.0 - grass * 0.6;
  vec3 viewGrad = (viewMatrix * vec4(grad, 0.0)).xyz;
  normal = normalize(normal - (viewGrad - dot(viewGrad, normal) * normal));
}`);
  };
  material.customProgramCacheKey = () => `pebble-cliff-v1|${key}`;
  return material;
}

/** A small bivalve (ribbed cockle) or a limpet cone, unit size, apex up. */
export function shellGeometry(seed: number, kind: 'cockle' | 'limpet') {
  const random = seeded(seed);
  const radial = 9, around = kind === 'cockle' ? 40 : 28;
  const positions: number[] = [], colors: number[] = [], indices: number[] = [];
  const hue = random();
  const band = new THREE.Color(), baseColor = new THREE.Color();
  baseColor.setHSL(.08 + hue * .04, .35 + random() * .2, .62 + random() * .12).convertSRGBToLinear();
  band.setHSL(.04 + hue * .05, .45, .32).convertSRGBToLinear();
  for (let i = 0; i <= radial; i++) {
    const u = i / radial;
    for (let j = 0; j < around; j++) {
      const v = j / around * Math.PI * 2;
      const rib = kind === 'cockle' ? 1 + .05 * Math.cos(v * 17) * u : 1 + .03 * Math.cos(v * 9 + u * 3) * u;
      const y = kind === 'cockle' ? .55 * Math.pow(1 - u * u, .65) + .02 * Math.cos(v * 17) * u : .62 * Math.pow(1 - u, 1.15);
      const ox = kind === 'cockle' ? -.12 * (1 - u) : .1 * (1 - u);
      positions.push(Math.cos(v) * u * rib + ox, y, Math.sin(v) * u * (kind === 'cockle' ? .9 : .78) * rib);
      const growth = .5 + .5 * Math.sin(u * 26 + random() * .3);
      const color = baseColor.clone().lerp(band, smooth(.55, .95, growth) * .55 * u);
      colors.push(color.r, color.g, color.b);
      if (i < radial) {
        const a = i * around + j, b = i * around + (j + 1) % around;
        indices.push(a, a + around, b, b, a + around, b + around);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** Shell material: glazed nacre-like interior on the back faces, chalky outside. */
export function shellMaterial() {
  const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .55, side: THREE.DoubleSide });
  material.onBeforeCompile = shader => {
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <color_fragment>', `#include <color_fragment>
if (!gl_FrontFacing) diffuseColor.rgb = vec3(0.44, 0.41, 0.4) + vec3(0.05, 0.0, 0.04) * diffuseColor.r;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = gl_FrontFacing ? 0.6 : 0.2;`);
  };
  material.customProgramCacheKey = () => 'pebble-shell-v1';
  return material;
}

export interface Strand { points: THREE.Vector3[]; width: number; }

/** Flat seaweed ribbons laid over the stones (wrack); `aSway` drives the swash drag. */
export function wrackGeometry(strands: Strand[]) {
  const positions: number[] = [], sway: number[] = [], along: number[] = [], indices: number[] = [];
  const side = new THREE.Vector3(), dir = new THREE.Vector3();
  for (const strand of strands) {
    const start = positions.length / 3;
    const n = strand.points.length;
    strand.points.forEach((point, i) => {
      dir.subVectors(strand.points[Math.min(n - 1, i + 1)], strand.points[Math.max(0, i - 1)]).normalize();
      side.set(-dir.z, 0, dir.x).normalize();
      const t = i / (n - 1);
      const w = strand.width * (.45 + .55 * Math.sin(Math.min(1, t * 1.15) * Math.PI * .5 + .6)) * (1 - t * .35);
      for (const k of [-1, 1]) {
        positions.push(point.x + side.x * w * k, point.y + .002 * (1 - Math.abs(k)) + .0025, point.z + side.z * w * k);
        sway.push(t); along.push(k);
      }
      if (i < n - 1) { const a = start + i * 2; indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
    });
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aSway', new THREE.Float32BufferAttribute(sway, 1));
  geometry.setAttribute('aSide', new THREE.Float32BufferAttribute(along, 1));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
