import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { GLSL_NOISE } from '../shared/render/glsl';
import { fbm3, noise3, ridged3, seeded } from '../shared/render/noise';

/*
 * Original code-only landscape pieces for the night worlds:
 *  - world-space ground and mountain-terrain shading for MeshStandardMaterial
 *    (no UVs, no tiling, derivative-faded detail so distance never shimmers),
 *  - eroded ridge height fields, faceted boulders from fracture planes,
 *  - conifers built from a lofted, furrowed trunk and alpha-to-coverage needle
 *    cards whose shading normals follow the crown, as console-era foliage does.
 */

const tau = Math.PI * 2;
const glslColor = (c: THREE.ColorRepresentation) => {
  const color = new THREE.Color(c);
  return `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
};
const f = (n: number) => n.toFixed(5);

/** Shared surface-gradient bump (Mikkelsen): perturbs `normal` from a scalar height. */
const GLSL_BUMP = /* glsl */ `
vec3 nightBump(vec3 surfacePosition, vec3 surfaceNormal, float height, float strength) {
  vec3 sigmaX = dFdx(surfacePosition), sigmaY = dFdy(surfacePosition);
  vec3 r1 = cross(sigmaY, surfaceNormal), r2 = cross(surfaceNormal, sigmaX);
  float det = dot(sigmaX, r1);
  vec3 grad = sign(det) * (dFdx(height) * r1 + dFdy(height) * r2) * strength;
  return normalize(abs(det) * surfaceNormal - grad);
}
`;
export const GLSL_NIGHT_BUMP = GLSL_BUMP;

function worldVaryings(shader: THREE.WebGLProgramParametersWithUniforms, name: string) {
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', `#include <common>\nvarying vec3 ${name}World;\nvarying vec3 ${name}Normal;`)
    .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
{
  vec4 nightWorld = vec4(transformed, 1.0);
  vec3 nightNormal = objectNormal;
  #ifdef USE_INSTANCING
    nightWorld = instanceMatrix * nightWorld;
    nightNormal = mat3(instanceMatrix) * nightNormal;
  #endif
  ${name}World = (modelMatrix * nightWorld).xyz;
  ${name}Normal = normalize(mat3(modelMatrix) * nightNormal);
}`);
}

export interface GroundOptions {
  key: string;
  soil: THREE.ColorRepresentation;
  litter?: THREE.ColorRepresentation;
  litterAmount?: number;
  grass?: THREE.ColorRepresentation;
  grassAmount?: number;
  /** Shifts the grass/soil balance (-1..1). */
  grassBias?: number;
  pebble?: THREE.ColorRepresentation;
  pebbleAmount?: number;
  /** Feature scale multiplier (1 = metre-scale patches). */
  scale?: number;
  bump?: number;
  roughness?: number;
  /** Scorched ash ring around a hearth. */
  hearth?: { centre: THREE.Vector3; radius: number };
  /** Darkens wet ground near a waterline at this height, over `wetBand` metres. */
  wetBelow?: number;
  wetBand?: number;
  /** Fallen conifer needles strewn over the ground (fades to their average tint with distance). */
  needles?: { color: THREE.ColorRepresentation; amount: number; scale?: number };
}

/** Needle litter: in each cell a short, thin, randomly oriented stroke (3x3 cell search). */
const GLSL_NEEDLES = /* glsl */ `
float groundNeedleLayer(vec2 p, float seed) {
  vec2 cell = floor(p), f = fract(p);
  float m = 0.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 g = vec2(float(i), float(j));
    vec3 h = bwHash3(vec3(cell + g, seed));
    vec2 o = g + h.xy - f;
    float a = h.z * 6.2831853;
    vec2 dir = vec2(cos(a), sin(a));
    float along = abs(dot(o, dir)), across = abs(dot(o, vec2(-dir.y, dir.x)));
    float s = (1.0 - smoothstep(0.5, 0.64, along)) * (1.0 - smoothstep(0.03, 0.075, across + along * 0.04));
    m = max(m, s * (0.55 + 0.45 * h.x));
  }
  return m;
}
`;

/** World-space forest floor: soil, needle litter, grass patches, gravel and hearth ash. */
export function createGroundMaterial(options: GroundOptions, params: THREE.MeshStandardMaterialParameters = {}) {
  const o = { litter: '#6b5a43', litterAmount: 0.6, grass: '#4b5233', grassAmount: 0.5, grassBias: 0, pebble: '#8a8680', pebbleAmount: 0.6, scale: 1, bump: 1, roughness: 0.94, ...options };
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: o.roughness, metalness: 0, ...params });
  material.onBeforeCompile = (shader) => {
    worldVaryings(shader, 'vGround');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vGroundWorld;
varying vec3 vGroundNormal;
${GLSL_NOISE}
${GLSL_BUMP}
float groundAA(float frequency) { return clamp(1.6 - length(fwidth(vGroundWorld)) * frequency * 2.2, 0.0, 1.0); }
float groundPebble(vec3 p) { return smoothstep(0.5, 0.66, bwNoise(p * 6.3 + 11.0)) * groundAA(6.3); }
${o.needles ? GLSL_NEEDLES : ''}
`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 gp = vGroundWorld * ${f(o.scale)};
float gMacro = bwFbm3(gp * 0.09 + 3.0);
float gMid = bwNoise(gp * 0.62 + 1.0);
float gFine = bwNoise(gp * 3.7 + 7.0) * groundAA(3.7);
float gGrain = bwNoise(gp * 11.0 + 5.0) * groundAA(11.0);
float gLitter = smoothstep(-0.2, 0.45, bwNoise(gp * 1.9 + 13.0) + 0.35 * gGrain) * ${f(o.litterAmount)};
float gGrass = smoothstep(0.0, 0.42, gMacro + 0.3 * gMid + ${f(o.grassBias)}) * ${f(o.grassAmount)};
float gPebble = groundPebble(gp) * ${f(o.pebbleAmount)} * (1.0 - gGrass);
vec3 gColor = ${glslColor(o.soil)} * (0.7 + 0.42 * gMid + 0.2 * gFine + 0.12 * gGrain);
gColor = mix(gColor, ${glslColor(o.litter)} * (0.66 + 0.45 * gFine + 0.25 * gGrain + 0.2 * gMid), gLitter * (1.0 - gGrass * 0.75));
gColor = mix(gColor, ${glslColor(o.grass)} * (0.62 + 0.5 * gMid + 0.3 * gFine), gGrass);
gColor = mix(gColor, ${glslColor(o.pebble)} * (0.75 + 0.45 * gFine), gPebble);
float gAsh = 0.0;
${o.hearth ? `{
  float d = length(vGroundWorld.xz - vec2(${f(o.hearth.centre.x)}, ${f(o.hearth.centre.z)}));
  float edge = ${f(o.hearth.radius)} * (1.0 + 0.25 * gMid + 0.12 * gFine);
  gAsh = 1.0 - smoothstep(edge * 0.55, edge * 1.25, d);
  vec3 ash = mix(vec3(0.035, 0.032, 0.03), vec3(0.2, 0.19, 0.18), smoothstep(0.2, 0.75, gMid * 0.6 + gFine * 0.6 + 0.3));
  gColor = mix(gColor, ash, gAsh * 0.9);
}` : ''}
${o.needles ? `float gNeedle = 0.0;
{
  float needleScale = ${f(o.needles.scale ?? 24)};
  // Needles are thin: fade them before a pixel spans one, never leaving speckle.
  float needleAA = groundAA(needleScale * 2.0);
  float n1 = groundNeedleLayer(vGroundWorld.xz * needleScale, 3.0);
  float n2 = groundNeedleLayer(vGroundWorld.xz * needleScale * 1.37 + 17.0, 7.0);
  float patchy = 0.45 + 0.55 * smoothstep(-0.3, 0.5, gMid + gLitter);
  gNeedle = max(n1, n2 * 0.85) * needleAA * ${f(o.needles.amount)} * patchy * (1.0 - gAsh);
  vec3 needleColor = ${glslColor(o.needles.color)} * (0.7 + 0.5 * gFine + 0.35 * n2);
  gColor = mix(gColor, needleColor, gNeedle);
  // Beyond resolution the strewn needles leave their average tint.
  gColor = mix(gColor, ${glslColor(o.needles.color)} * 0.8, (1.0 - needleAA) * 0.3 * ${f(o.needles.amount)} * patchy * (1.0 - gAsh));
}` : ''}
${o.wetBelow !== undefined ? `float gWet = 1.0 - smoothstep(${f(o.wetBelow)}, ${f(o.wetBelow + (o.wetBand ?? 0.12))}, vGroundWorld.y + ${f((o.wetBand ?? 0.12) * 0.25)} * gMid);
gColor *= mix(1.0, 0.6, gWet);` : 'float gWet = 0.0;'}
diffuseColor.rgb *= gColor;
`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = clamp(roughnessFactor * (0.92 + 0.12 * gMid) - gPebble * 0.12 - gWet * 0.4, 0.3, 1.0);
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  float h = gMid * 0.05 + gFine * 0.012 + gGrain * 0.003 + gPebble * 0.02 + gLitter * 0.004 - gAsh * 0.01${o.needles ? ' + gNeedle * 0.0025' : ''};
  normal = nightBump(-vViewPosition, normal, h, ${f(o.bump)});
}
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|night-ground-v1|${options.key}`;
  return material;
}

export interface TerrainOptions {
  key: string;
  rock: THREE.ColorRepresentation;
  forest: THREE.ColorRepresentation;
  snow?: THREE.ColorRepresentation;
  /** Heights (world y) where forest thins out and snow begins. */
  treeLine: number;
  snowLine?: number;
  /** Strength of crown bumps and rock relief. */
  bump?: number;
}

/** Distant mountain shading: forest carpets on gentle slopes, rock on crests, snow above a line. */
export function createTerrainMaterial(options: TerrainOptions) {
  const o = { snow: '#c9d2dc', snowLine: 1e4, bump: 1, ...options };
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.95, metalness: 0 });
  material.onBeforeCompile = (shader) => {
    worldVaryings(shader, 'vTerrain');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vTerrainWorld;
varying vec3 vTerrainNormal;
${GLSL_NOISE}
${GLSL_BUMP}
float terrainAA(float frequency) { return clamp(1.6 - length(fwidth(vTerrainWorld)) * frequency * 2.0, 0.0, 1.0); }
`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 tp = vTerrainWorld;
float tSlope = 1.0 - clamp(normalize(vTerrainNormal).y, 0.0, 1.0);
float tBroad = bwFbm3(tp * 0.03 + 5.0);
float tMid = bwNoise(tp * 0.16 + 2.0) * terrainAA(0.16);
float tCrowns = bwNoise(tp * vec3(0.55, 0.3, 0.55) + 9.0) * terrainAA(0.55);
float tForest = (1.0 - smoothstep(${f(o.treeLine)} - 5.0, ${f(o.treeLine)} + 5.0, tp.y + tBroad * 9.0)) * (1.0 - smoothstep(0.42, 0.72, tSlope + tBroad * 0.25));
float tSnow = smoothstep(${f(o.snowLine)} - 2.5, ${f(o.snowLine)} + 2.5, tp.y + tBroad * 7.0 + tMid * 2.0) * (1.0 - smoothstep(0.38, 0.66, tSlope - tMid * 0.15));
vec3 tRock = ${glslColor(o.rock)} * (0.66 + 0.45 * tBroad + 0.25 * tMid);
vec3 tColor = mix(tRock, ${glslColor(o.forest)} * (0.55 + 0.5 * smoothstep(-0.4, 0.6, tCrowns) + 0.2 * tMid), tForest);
tColor = mix(tColor, ${glslColor(o.snow)} * (0.85 + 0.2 * tMid), tSnow);
diffuseColor.rgb *= tColor;
`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor, 0.62, tSnow);
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  float h = tMid * 1.2 + smoothstep(-0.2, 0.7, tCrowns) * tForest * 1.6 * (1.0 - tSnow) + tBroad * 2.0;
  normal = nightBump(-vViewPosition, normal, h, ${f(o.bump)} * 0.35);
}
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|night-terrain-v1|${options.key}`;
  return material;
}

export interface RidgeOptions {
  /** Centre line z, overall width (x) and depth (z) of the range. */
  z: number;
  width: number;
  depth: number;
  base: number;
  peaks: Array<[number, number, number]>;
  seed: number;
  segments?: [number, number];
  /** Amplitude of the eroded relief relative to the tallest peak. */
  relief?: number;
  /** Shifts the crest backward (0.5 = centred). */
  crest?: number;
  /** Fraction of the width over which both ends sink to the base (islands). */
  taper?: number;
  /** Horizontal offset of the whole range. */
  x?: number;
}

/** An eroded ridge: Gaussian massifs, domain-warped ridged noise, gullies down the slopes. */
export function ridgeGeometry(o: RidgeOptions) {
  const [nx, nz] = o.segments ?? [220, 46];
  const tallest = Math.max(1, ...o.peaks.map((p) => p[1]));
  const relief = o.relief ?? 0.5;
  const crestAt = o.crest ?? 0.5;
  const s = o.seed * 0.173;
  const positions: number[] = [], indices: number[] = [];
  for (let j = 0; j <= nz; j++) {
    const q = j / nz;
    for (let i = 0; i <= nx; i++) {
      const x = (i / nx - 0.5) * o.width;
      const z = o.z + (q - 0.5) * o.depth;
      const warp = fbm3(x * 0.012 + s, z * 0.02, s, 3) * 22;
      const wx = x + warp;
      // Asymmetric profile: a long front slope toward the viewer, a steeper back.
      const u = q < crestAt ? q / crestAt : 1 - (q - crestAt) / (1 - crestAt);
      const profile = Math.pow(Math.max(0, Math.sin(u * Math.PI / 2)), q < crestAt ? 1.35 : 0.8);
      let massif = 0;
      for (const [px, ph, spread] of o.peaks) massif += ph * Math.exp(-(((wx - px) / spread) ** 2));
      const ridges = ridged3(wx * 0.016 + s, z * 0.022, s * 2.1, 5);
      const gullies = ridged3(wx * 0.075 + 3.3, z * 0.018 + s, s, 3);
      const detail = fbm3(wx * 0.06, z * 0.06, s + 9, 3);
      let h = massif * 0.78 + (ridges - 0.32) * tallest * relief + detail * tallest * 0.07;
      h += (gullies - 0.4) * tallest * 0.12 * Math.sin(u * Math.PI);
      const edge = o.taper ? THREE.MathUtils.smoothstep(0.5 - Math.abs(i / nx - 0.5), 0, o.taper) : 1;
      const y = o.base + Math.max(-2, h) * profile * edge;
      positions.push(x + (o.x ?? 0), y, z + Math.sin(x * 0.02 + s) * 2.5 * profile);
      if (i < nx && j < nz) {
        const a = j * (nx + 1) + i;
        indices.push(a, a + nx + 1, a + 1, a + 1, a + nx + 1, a + nx + 2);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** Faceted, eroded boulder normalised to a unit box (scale gives exact half-extents). */
export function boulderGeometry(seed: number, detail = 12, facets = 10, erosion = 0.08, boxy = false) {
  const random = seeded(seed * 7919 + 13);
  const base = new THREE.IcosahedronGeometry(1, detail);
  base.deleteAttribute('normal'); base.deleteAttribute('uv');
  const geometry = mergeVertices(base); base.dispose();
  const planes = Array.from({ length: facets }, () => ({
    n: new THREE.Vector3(random() * 2 - 1, (random() * 2 - 1) * 0.8, random() * 2 - 1).normalize(),
    c: 0.6 + random() * 0.32,
  }));
  // Split masonry: six roughly axis-aligned faces with chipped corners.
  if (boxy) for (const axis of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) {
    planes.push({ n: new THREE.Vector3(axis[0] + (random() - 0.5) * 0.12, axis[1] + (random() - 0.5) * 0.12, axis[2] + (random() - 0.5) * 0.12).normalize(), c: 0.6 + random() * 0.06 });
  }
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const p = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    p.fromBufferAttribute(position, i).normalize();
    let r = 1;
    for (const { n, c } of planes) { const d = p.dot(n); if (d > 1e-3) r = Math.min(r, c / d); }
    r = THREE.MathUtils.lerp(r, 0.8, 0.05);
    r *= 1 + fbm3(p.x * 1.8 + seed, p.y * 1.8, p.z * 1.8, 4) * erosion + (ridged3(p.x * 3.3, p.y * 3.3 + seed, p.z * 3.3, 3) - 0.35) * erosion * 0.6 + fbm3(p.x * 6 + seed, p.y * 6, p.z * 6, 2) * erosion * 0.25;
    p.multiplyScalar(r);
    if (p.y < -0.35) p.y = THREE.MathUtils.lerp(p.y, -0.35, 0.8);
    position.setXYZ(i, p.x, p.y, p.z);
  }
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const centre = box.getCenter(new THREE.Vector3()), size = box.getSize(new THREE.Vector3());
  geometry.translate(-centre.x, -centre.y, -centre.z);
  geometry.scale(2 / size.x, 2 / size.y, 2 / size.z);
  geometry.computeVertexNormals();
  return geometry;
}

/** Places a boulder geometry as a world-space geometry (for merging). */
export function placedBoulder(seed: number, position: [number, number, number], halfExtents: [number, number, number], yaw: number, detail = 10) {
  const geometry = boulderGeometry(seed, detail);
  geometry.applyMatrix4(new THREE.Matrix4().compose(
    new THREE.Vector3(...position),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(0.05 * Math.sin(seed), yaw, 0.05 * Math.cos(seed))),
    new THREE.Vector3(...halfExtents),
  ));
  return geometry;
}

/** Procedural spray of needles on a twig, with alpha, for foliage cards. */
export function needleSprayTexture(seed: number, tint: THREE.ColorRepresentation = '#3e5a3c') {
  const width = 256, height = 128;
  const data = new Uint8Array(width * height * 4);
  const random = seeded(seed);
  const base = new THREE.Color(tint);
  const plot = (x: number, y: number, alpha: number, shade: number, tip: number) => {
    const ix = Math.round(x), iy = Math.round(y);
    if (ix < 0 || iy < 0 || ix >= width || iy >= height) return;
    const i = (iy * width + ix) * 4;
    if (data[i + 3] / 255 >= alpha) return;
    const c = base.clone().multiplyScalar(shade).lerp(new THREE.Color('#8a9a64'), tip * 0.25);
    data[i] = Math.min(255, c.r * 255); data[i + 1] = Math.min(255, c.g * 255); data[i + 2] = Math.min(255, c.b * 255);
    data[i + 3] = Math.round(alpha * 255);
  };
  const line = (x0: number, y0: number, x1: number, y1: number, w: number, shade: number, tipShade = 0) => {
    const length = Math.hypot(x1 - x0, y1 - y0);
    const steps = Math.ceil(length * 2);
    for (let k = 0; k <= steps; k++) {
      const t = k / steps, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
      const radius = w * (1 - t * 0.6);
      for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) {
        const d = Math.hypot(dx, dy);
        const alpha = THREE.MathUtils.clamp(radius + 0.5 - d, 0, 1);
        if (alpha > 0) plot(x + dx, y + dy, alpha, shade, t * tipShade);
      }
    }
  };
  const twigs = [{ x0: 4, y0: 64, x1: 250, y1: 60 + (random() - 0.5) * 10, w: 1.6 }];
  for (let k = 0; k < 5; k++) {
    const t = 0.18 + k * 0.15 + random() * 0.05;
    const side = k % 2 ? 1 : -1;
    twigs.push({ x0: 4 + t * 246, y0: 64 - t * 3, x1: 4 + t * 246 + 50 + random() * 30, y1: 64 + side * (26 + random() * 16), w: 1.1 });
  }
  for (const twig of twigs) {
    line(twig.x0, twig.y0, twig.x1, twig.y1, twig.w, 0.42);
    const length = Math.hypot(twig.x1 - twig.x0, twig.y1 - twig.y0);
    const count = Math.round(length / 2.1);
    for (let n = 0; n < count; n++) {
      const t = (n + random()) / count;
      const x = twig.x0 + (twig.x1 - twig.x0) * t, y = twig.y0 + (twig.y1 - twig.y0) * t;
      const along = Math.atan2(twig.y1 - twig.y0, twig.x1 - twig.x0);
      for (const side of [-1, 1]) {
        const angle = along + side * (0.65 + random() * 0.45);
        const needle = (11 + random() * 9) * (1 - t * 0.45) * (twig.w > 1.5 ? 1.15 : 0.9);
        const shade = 0.75 + random() * 0.55;
        line(x, y, x + Math.cos(angle) * needle, y + Math.sin(angle) * needle, 0.75, shade, 1);
      }
    }
  }
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

/** Procedural spray of small oval leaves along a twig (birch, willow), with alpha. */
export function leafSprayTexture(seed: number, tint: THREE.ColorRepresentation = '#5d7146') {
  const width = 256, height = 128;
  const data = new Uint8Array(width * height * 4);
  const random = seeded(seed);
  const base = new THREE.Color(tint);
  const leaf = (cx: number, cy: number, angle: number, length: number, breadth: number, shade: number) => {
    const ca = Math.cos(angle), sa = Math.sin(angle);
    const reach = Math.ceil(length + 2);
    for (let dy = -reach; dy <= reach; dy++) for (let dx = -reach; dx <= reach; dx++) {
      const u = (dx * ca + dy * sa) / length, v = (-dx * sa + dy * ca) / breadth;
      const shape = u * u + v * v * (1 + 0.6 * u);
      const alpha = THREE.MathUtils.clamp((1 - shape) * length * 0.6, 0, 1);
      const x = Math.round(cx + dx), y = Math.round(cy + dy);
      if (alpha <= 0 || x < 0 || y < 0 || x >= width || y >= height) continue;
      const i = (y * width + x) * 4;
      if (data[i + 3] / 255 >= alpha) continue;
      const vein = Math.abs(v) < 0.12 ? 0.82 : 1;
      const c = base.clone().multiplyScalar(shade * vein * (0.85 + 0.3 * (1 - Math.abs(u))));
      data[i] = Math.min(255, c.r * 255); data[i + 1] = Math.min(255, c.g * 255); data[i + 2] = Math.min(255, c.b * 255);
      data[i + 3] = Math.round(alpha * 255);
    }
  };
  const stemY = (x: number) => 64 + Math.sin(x * 0.02 + seed) * 6;
  for (let x = 2; x < 250; x++) for (let w = -1; w <= 1; w++) {
    const i = ((Math.round(stemY(x)) + w) * width + x) * 4;
    data[i] = 70; data[i + 1] = 55; data[i + 2] = 40; data[i + 3] = 255;
  }
  for (let n = 0; n < 26; n++) {
    const x = 14 + n * 9 + random() * 4;
    const side = n % 2 ? 1 : -1;
    const length = 13 + random() * 7;
    const angle = side * (0.7 + random() * 0.5) + (random() - 0.5) * 0.3;
    leaf(x + Math.cos(angle) * length * 0.9, stemY(x) + Math.sin(angle) * length * 0.9, angle, length, length * 0.55, 0.7 + random() * 0.5);
  }
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

/** Foliage material: alpha-to-coverage cards whose crown normals stay the same on both faces. */
export function createFoliageMaterial(spray: THREE.Texture, key: string) {
  const material = new THREE.MeshStandardMaterial({
    map: spray, vertexColors: true, alphaTest: 0.42, alphaToCoverage: true, side: THREE.DoubleSide, roughness: 0.82, metalness: 0,
  });
  material.onBeforeCompile = (shader) => {
    // Cards share one volumetric crown normal; flipping it on back faces would checker the crown.
    shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_begin>', `
float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
vec3 normal = normalize( vNormal );
vec3 nonPerturbedNormal = normal;
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|night-foliage-v1|${key}`;
  return material;
}

export interface ConiferOptions {
  height: number;
  seed: number;
  /** Crown radius at its widest, relative to height. */
  spread?: number;
  /** Fraction of the trunk without live branches. */
  clearTrunk?: number;
  lean?: number;
}

/** A spruce-like conifer in local space: furrowed trunk plus needle cards. */
export function coniferGeometry(o: ConiferOptions) {
  const random = seeded(o.seed * 31 + 5);
  const H = o.height;
  const spread = (o.spread ?? 0.21) * H;
  const clear = o.clearTrunk ?? 0.2;
  const lean = new THREE.Vector2((random() - 0.5) * (o.lean ?? 0.05) * H, (random() - 0.5) * (o.lean ?? 0.05) * H);
  const axis = (t: number) => new THREE.Vector3(lean.x * t * t + Math.sin(t * 5 + o.seed) * 0.01 * H * t, t * H, lean.y * t * t);

  // Trunk: lofted rings with root flare and bark furrows.
  const rings = 26, sides = 14;
  const trunkPositions: number[] = [], trunkIndices: number[] = [];
  const r0 = H * 0.022;
  for (let j = 0; j <= rings; j++) {
    const t = j / rings;
    const centre = axis(t * 0.97);
    const flare = 1 + 0.9 * Math.exp(-t * 26);
    for (let i = 0; i <= sides; i++) {
      const a = i / sides * tau;
      const furrow = ridged3(Math.cos(a) * 1.6 + o.seed, t * H * 0.9, Math.sin(a) * 1.6, 3);
      const roots = Math.exp(-t * 30) * Math.max(0, Math.sin(a * 5 + o.seed)) * 0.6;
      const r = r0 * Math.pow(1 - t * 0.97, 0.9) * flare * (0.93 + 0.12 * furrow + roots);
      trunkPositions.push(centre.x + Math.cos(a) * r, centre.y - (t === 0 ? 0.15 : 0), centre.z + Math.sin(a) * r);
      if (j < rings && i < sides) {
        const n = j * (sides + 1) + i;
        trunkIndices.push(n, n + sides + 1, n + 1, n + 1, n + sides + 1, n + sides + 2);
      }
    }
  }
  const trunk = new THREE.BufferGeometry();
  trunk.setAttribute('position', new THREE.Float32BufferAttribute(trunkPositions, 3));
  trunk.setIndex(trunkIndices);
  trunk.computeVertexNormals();
  const parts: THREE.BufferGeometry[] = [trunk];
  // Dead lower branch stubs.
  for (let k = 0; k < 9; k++) {
    const t = 0.08 + random() * (clear - 0.06);
    const a = random() * tau;
    const start = axis(t);
    const length = H * (0.05 + random() * 0.08);
    const end = start.clone().add(new THREE.Vector3(Math.cos(a) * length, -length * 0.25, Math.sin(a) * length));
    const stub = new THREE.CylinderGeometry(H * 0.0012, H * 0.004, length, 5);
    stub.translate(0, length / 2, 0);
    stub.applyMatrix4(new THREE.Matrix4().compose(start, new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().sub(start).normalize()), new THREE.Vector3(1, 1, 1)));
    parts.push(stub.toNonIndexed());
    stub.dispose();
  }
  const wood = mergeGeometries(parts.map((g) => (g.index ? g.toNonIndexed() : g)).map((g) => { g.deleteAttribute('uv'); return g; }));
  parts.forEach((g) => g.dispose());

  // Needle cards along drooping branches in whorls.
  const positions: number[] = [], normals: number[] = [], uvs: number[] = [], colors: number[] = [], indices: number[] = [];
  const card = (centre: THREE.Vector3, along: THREE.Vector3, across: THREE.Vector3, length: number, width: number, crownCentre: THREE.Vector3, shade: number) => {
    const start = positions.length / 3;
    const corners = [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]];
    for (const [u, v] of corners) {
      const p = centre.clone().addScaledVector(along, u * length).addScaledVector(across, v * width);
      positions.push(p.x, p.y, p.z);
      // Shading normal: outward from the crown axis, biased upward, so cards light as a volume.
      const n = p.clone().sub(crownCentre).setY(0).normalize().multiplyScalar(0.8).add(new THREE.Vector3(0, 0.55 + (p.y - crownCentre.y) / H * 0.6, 0)).normalize();
      normals.push(n.x, n.y, n.z);
      uvs.push(u + 0.5, v + 0.5);
      colors.push(shade, shade * (0.96 + random() * 0.08), shade * (0.9 + random() * 0.12));
    }
    indices.push(start, start + 1, start + 2, start, start + 2, start + 3);
  };
  const whorls = Math.round(16 + H * 0.4);
  for (let w = 0; w < whorls; w++) {
    const t = clear + (1 - clear) * Math.pow(w / whorls, 0.92) + random() * 0.012;
    const tierCentre = axis(t);
    const count = 5 + Math.floor(random() * 3);
    const radius = spread * Math.pow(Math.max(0, 1 - t), 0.92) / Math.pow(1 - clear, 0.92) * (0.85 + random() * 0.25);
    for (let b = 0; b < count; b++) {
      const angle = b / count * tau + w * 2.399 + (random() - 0.5) * 0.5;
      const dir = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      const length = Math.max(H * 0.04, radius * (0.75 + random() * 0.4));
      const droop = 0.1 + 0.25 * (1 - t) + random() * 0.1;
      const segments = Math.max(2, Math.round(length / (H * 0.045)));
      for (let k = 0; k < segments; k++) {
        const s = (k + 0.5) / segments;
        const centre = tierCentre.clone().addScaledVector(dir, length * (0.15 + 0.85 * s));
        centre.y += length * (0.12 * s - droop * s * s);
        const along = dir.clone().setY(0.1 - droop * 1.6 * s).normalize();
        const side = new THREE.Vector3(-dir.z, 0, dir.x);
        const roll = (random() - 0.5) * 0.9;
        const across = side.clone().multiplyScalar(Math.cos(roll)).add(new THREE.Vector3(0, Math.sin(roll), 0)).normalize();
        const size = H * (0.075 + 0.04 * (1 - t)) * (0.85 + random() * 0.3);
        const shade = (0.62 + random() * 0.5) * (0.78 + 0.35 * t);
        card(centre, along, across, size, size * 0.55, tierCentre, shade);
        // A second, crossed card gives depth from any angle.
        const across2 = side.clone().multiplyScalar(Math.cos(roll + 1.2)).add(new THREE.Vector3(0, Math.sin(roll + 1.2), 0)).normalize();
        card(centre.clone().add(new THREE.Vector3(0, size * 0.05, 0)), along, across2, size * 0.92, size * 0.45, tierCentre, shade * 0.9);
      }
    }
  }
  // Leader: a few upright cards at the top.
  const top = axis(0.985);
  for (let k = 0; k < 4; k++) {
    const a = k / 4 * Math.PI;
    card(top.clone().add(new THREE.Vector3(0, -H * 0.03, 0)), new THREE.Vector3(0, 1, 0), new THREE.Vector3(Math.cos(a), 0, Math.sin(a)), H * 0.07, H * 0.035, axis(0.9), 0.9);
  }
  const foliage = new THREE.BufferGeometry();
  foliage.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  foliage.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  foliage.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  foliage.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  foliage.setIndex(indices);
  return { wood, foliage };
}

/** A small spruce silhouette for distant forests (instanced): drooping, jagged branch tiers. */
export function distantSpruceGeometry(seed = 5) {
  const random = seeded(seed);
  const positions: number[] = [], indices: number[] = [];
  const tiers = 9, points = 9;
  for (let t = 0; t < tiers; t++) {
    const q = t / tiers;
    const top = 0.16 + q * 0.84;
    const radius = 0.36 * Math.pow(1 - q, 0.9) + 0.025;
    const centre = positions.length / 3;
    positions.push(0, top + 0.03, 0);
    for (let k = 0; k <= points * 2; k++) {
      const a = (k % (points * 2)) / (points * 2) * tau + t * 0.7;
      const tip = k % 2 === 0;
      const r = radius * (tip ? 0.85 + random() * 0.3 : 0.42 + random() * 0.18);
      positions.push(Math.cos(a) * r, top - radius * (tip ? 0.62 + random() * 0.12 : 0.35), Math.sin(a) * r);
      if (k > 0) indices.push(centre, centre + k + 1, centre + k);
    }
  }
  const crown = new THREE.BufferGeometry();
  crown.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  crown.setIndex(indices);
  const trunk = new THREE.CylinderGeometry(0.015, 0.03, 0.3, 5, 1, true);
  trunk.translate(0, 0.12, 0);
  trunk.deleteAttribute('uv'); trunk.deleteAttribute('normal');
  const merged = mergeGeometries([crown.toNonIndexed(), trunk.toNonIndexed()]);
  crown.dispose(); trunk.dispose();
  merged.computeVertexNormals();
  return merged;
}
