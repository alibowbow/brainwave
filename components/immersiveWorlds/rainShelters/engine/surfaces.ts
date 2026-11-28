import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { GLSL_NOISE } from '../../shared/render/glsl';

/*
 * World-space procedural surfaces for the rain shelters, as patches on
 * MeshStandardMaterial so lighting, shadows, probes and the wet-surface patch
 * all still apply. No textures: patterns are evaluated per fragment from world
 * position, and relief is a surface-gradient bump from screen derivatives.
 *  - timber: annual rings and fibres follow each piece's grain axis (a vertex
 *    attribute), so merged beams, planks and rafter ends all read correctly,
 *  - bark: vertical fissured plates, lichen and a mossy foot,
 *  - ground: soil with leaf litter, grit and moss.
 */

const vec3 = (c: THREE.ColorRepresentation) => {
  const color = new THREE.Color(c);
  return `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
};
const f = (n: number) => n.toFixed(5);

const BUMP = /* glsl */ `
/** Analytic heights are not band-limited like a mipmapped bump map, so relief
 * fades out once its features shrink to a few pixels (else it shimmers). */
float shelterDetail(float featureSize) {
  float footprint = length(fwidth(vSurfWorld));
  return 1.0 - smoothstep(featureSize * 0.15, featureSize * 0.5, footprint);
}
vec3 shelterBump(vec3 n, float h, float scale) {
  vec3 pos = -vViewPosition;
  vec3 dpdx = dFdx(pos), dpdy = dFdy(pos);
  vec2 dh = vec2(dFdx(h), dFdy(h)) * scale;
  vec3 r1 = cross(dpdy, n), r2 = cross(n, dpdx);
  float det = dot(dpdx, r1);
  vec3 grad = sign(det) * (dh.x * r1 + dh.y * r2);
  return normalize(abs(det) * n - grad);
}
`;

export interface Patch {
  key: string;
  vertexCommon?: string;
  vertexWorld?: string;
  fragmentCommon: string;
  color: string;
  roughness?: string;
  normal?: string;
}

/** Generic world-space surface patch (colour, roughness and relief snippets). */
export function patch<T extends THREE.MeshStandardMaterial>(material: T, p: Patch): T {
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vSurfWorld;\nvarying vec3 vSurfNormal;\n${p.vertexCommon ?? ''}`)
      .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
{
  vec4 surfWorld = vec4(transformed, 1.0);
  vec3 surfNormal = objectNormal;
  #ifdef USE_INSTANCING
  surfWorld = instanceMatrix * surfWorld;
  surfNormal = mat3(instanceMatrix) * surfNormal;
  #endif
  vSurfWorld = (modelMatrix * surfWorld).xyz;
  vSurfNormal = normalize(mat3(modelMatrix) * surfNormal);
  ${p.vertexWorld ?? ''}
}`);
    // Declarations go just before main(), after any noise an earlier patch added.
    const needsNoise = !shader.fragmentShader.includes('bwPcg3(');
    const needsBump = !shader.fragmentShader.includes('shelterBump(');
    shader.fragmentShader = shader.fragmentShader
      .replace(/void\s+main\s*\(\s*\)\s*\{/, () => `varying vec3 vSurfWorld;\nvarying vec3 vSurfNormal;\n${needsNoise ? GLSL_NOISE : ''}\n${needsBump ? BUMP : ''}\n${p.fragmentCommon}\nvoid main() {`)
      .replace('#include <color_fragment>', `#include <color_fragment>\n${p.color}`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>\n${p.roughness ?? ''}`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>\n${p.normal ?? ''}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|shelter-surface-v1|${p.key}`;
  return material;
}

export interface TimberOptions {
  key: string;
  early: THREE.ColorRepresentation;
  late: THREE.ColorRepresentation;
  /** Rings per metre across the grain. */
  rings?: number;
  /** Silver-grey sun/rain weathering (0..1). */
  weathering?: number;
  bump?: number;
  roughness?: [number, number];
}

/** Timber whose grain follows the `aGrain` attribute (world axis) and `aPiece` seed. */
export function applyTimber<T extends THREE.MeshStandardMaterial>(material: T, options: TimberOptions): T {
  const o = { rings: 34, weathering: 0.2, bump: 1, roughness: [0.5, 0.78] as [number, number], ...options };
  return patch(material, {
    key: `timber-${o.key}`,
    vertexCommon: 'attribute vec3 aGrain;\nattribute vec3 aCentre;\nattribute float aPiece;\nvarying vec3 vGrain;\nvarying vec3 vCentre;\nvarying float vPiece;',
    vertexWorld: 'vGrain = normalize(mat3(modelMatrix) * (dot(aGrain, aGrain) > 0.0 ? aGrain : vec3(1.0, 0.0, 0.0)));\nvCentre = (modelMatrix * vec4(aCentre, 1.0)).xyz;\nvPiece = aPiece;',
    fragmentCommon: `varying vec3 vGrain;\nvarying vec3 vCentre;\nvarying float vPiece;\nfloat timberHeight;\nfloat timberLate;\nfloat aPieceOffset(float piece) { return piece < 0.0 ? 0.004 : 0.07 + 0.22 * fract(piece * 7.13); }`,
    color: `{
  vec3 ax = normalize(vGrain);
  vec3 ref = abs(ax.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 bu = normalize(cross(ax, ref)), bv = cross(ax, bu);
  vec3 local = vSurfWorld - vCentre;
  float along = dot(local, ax) + abs(vPiece) * 37.0;
  vec2 across = vec2(dot(local, bu), dot(local, bv));
  // Each piece was sawn at its own distance from the pith: boards show long
  // arched cathedrals, logs and end grain show near-concentric rings.
  // Negative ids mark roundwood: logs and rafters are sawn through their pith.
  float offset = aPieceOffset(vPiece);
  float pieceId = abs(vPiece);
  vec2 pith = vec2(sin(pieceId * 91.7), cos(pieceId * 53.3)) * offset;
  // Boards are never sawn exactly parallel to the log: rings cut the face at a
  // slant and close into arches (cathedrals) along the board.
  pith += vec2(0.6, 1.0) * dot(local, ax) * (vPiece < 0.0 ? 0.0 : 0.012 + 0.035 * fract(pieceId * 5.31));
  float warp = bwFbm3(vec3(along * 0.45, across * 1.6) + pieceId * 11.0) * 0.03 + bwNoise(vec3(along * 2.6, across * 7.0)) * 0.004;
  float radius = length(across - pith) + warp;
  // Ring spacing varies with growth years.
  float rings = ${f(o.rings)} * (0.75 + 0.5 * fract(pieceId * 3.7));
  float ring = fract(radius * rings + 0.35 * bwNoise(vec3(radius * 6.0, pieceId * 17.0, 1.0)));
  timberLate = smoothstep(0.62, 0.9, ring) * (1.0 - smoothstep(0.93, 1.0, ring));
  // Detail finer than a couple of pixels fades to its mean instead of aliasing.
  float footprint = length(fwidth(vSurfWorld));
  float fineDetail = 1.0 - smoothstep(0.0012, 0.0035, footprint);
  float midDetail = 1.0 - smoothstep(0.006, 0.02, footprint);
  float fibre = mix(0.5, bwNoise(vec3(along * 4.0, across * 140.0)) * 0.5 + 0.5, fineDetail);
  float streak = mix(0.5, bwNoise(vec3(along * 0.8, across * 22.0) + pieceId * 3.0) * 0.5 + 0.5, midDetail);
  timberLate *= mix(0.4, 1.0, midDetail);
  vec3 wood = mix(${vec3(o.early)}, ${vec3(o.late)}, timberLate * 0.85 + streak * 0.25);
  wood *= 0.82 + 0.26 * fibre + 0.18 * (bwFbm3(vSurfWorld * 0.9 + pieceId) );
  // Weathered timber greys and opens along the grain.
  float grey = ${f(o.weathering)} * (0.6 + 0.4 * streak);
  wood = mix(wood, vec3(dot(wood, vec3(0.3, 0.55, 0.15))) * vec3(0.95, 0.97, 1.0), grey);
  float check = pow(1.0 - abs(bwNoise(vec3(along * 0.6, across * 34.0) + 5.0)), 30.0) * smoothstep(0.1, 0.5, bwNoise(vec3(along * 0.3, across * 3.0))) * midDetail;
  wood *= 1.0 - 0.55 * check;
  diffuseColor.rgb *= wood;
  timberHeight = timberLate * 0.5 + fibre * 0.35 + streak * 0.2 - check * 1.2;
}`,
    roughness: `roughnessFactor = mix(${f(o.roughness[0])}, ${f(o.roughness[1])}, 1.0 - timberLate * 0.6) * roughnessFactor;`,
    normal: `normal = shelterBump(normal, timberHeight, ${f(0.0035 * o.bump)} * shelterDetail(0.02));`,
  });
}

export interface BarkOptions {
  key: string;
  plate: THREE.ColorRepresentation;
  crevice: THREE.ColorRepresentation;
  lichen?: THREE.ColorRepresentation;
  lichenAmount?: number;
  moss?: THREE.ColorRepresentation;
  mossHeight?: number;
  /** Fissure frequency (per metre around the trunk). */
  scale?: number;
}

export function applyBark<T extends THREE.MeshStandardMaterial>(material: T, options: BarkOptions): T {
  const o = { lichen: '#8c9a84', lichenAmount: 0.35, moss: '#3f5a26', mossHeight: 0.9, scale: 9, ...options };
  return patch(material, {
    key: `bark-${o.key}`,
    fragmentCommon: 'float barkHeight;',
    color: `{
  vec3 p = vSurfWorld;
  // Crests of the ridged field become thin, deep fissures between long plates.
  float fissure = bwRidged(vec3(p.x * ${f(o.scale)}, p.y * ${f(o.scale * 0.14)}, p.z * ${f(o.scale)}));
  float plates = 1.0 - smoothstep(0.52, 0.7, fissure) * 0.9;
  plates *= 0.85 + 0.15 * (bwNoise(vec3(p.x * 20.0, p.y * 3.0, p.z * 20.0)) * 0.5 + 0.5);
  vec3 bark = mix(${vec3(o.crevice)}, ${vec3(o.plate)}, plates) * (0.78 + 0.4 * (bwFbm3(p * 1.3) * 0.5 + 0.5));
  float lichen = smoothstep(0.18, 0.42, bwFbm3(p * vec3(2.6, 1.2, 2.6) + 4.0)) * plates * ${f(o.lichenAmount)};
  bark = mix(bark, ${vec3(o.lichen)} * (0.8 + 0.3 * bwNoise(p * 14.0)), lichen);
  float moss = (1.0 - smoothstep(0.0, ${f(o.mossHeight)}, p.y + 0.25 * bwNoise(p * 2.0))) * smoothstep(-0.2, 0.4, bwNoise(p * 3.1 + 2.0));
  bark = mix(bark, ${vec3(o.moss)} * (0.7 + 0.5 * bwNoise(p * 11.0)), moss * 0.85);
  diffuseColor.rgb *= bark;
  barkHeight = plates + 0.25 * bwNoise(p * 31.0) + moss * 0.3;
}`,
    roughness: 'roughnessFactor *= mix(0.75, 1.05, barkHeight);',
    normal: 'normal = shelterBump(normal, barkHeight, 0.02 * shelterDetail(0.06));',
  });
}

export interface GroundOptions {
  key: string;
  soil: THREE.ColorRepresentation;
  /** Leaf litter colours (two tones) and coverage. */
  litter?: [THREE.ColorRepresentation, THREE.ColorRepresentation];
  litterAmount?: number;
  /** Grass/moss tint and coverage. */
  moss?: THREE.ColorRepresentation;
  mossAmount?: number;
  grit?: number;
}

export function applyGround<T extends THREE.MeshStandardMaterial>(material: T, options: GroundOptions): T {
  const o = { litter: ['#5a3a1f', '#7d5a2e'] as [THREE.ColorRepresentation, THREE.ColorRepresentation], litterAmount: 0.5, moss: '#3e5326', mossAmount: 0.35, grit: 0.5, ...options };
  return patch(material, {
    key: `ground-${o.key}`,
    fragmentCommon: `float groundHeight;
float groundLeaf(vec2 p, float layer, out float tone) {
  vec2 cell = floor(p);
  vec3 h = bwHash3(vec3(cell, layer));
  vec2 c = cell + 0.2 + 0.6 * h.xy;
  float a = h.z * 6.2831;
  vec2 d = p - c;
  d = mat2(cos(a), -sin(a), sin(a), cos(a)) * d;
  d.y *= 2.1;
  float shape = length(d) + 0.12 * abs(d.x) * 4.0 * step(0.0, d.y);
  tone = fract(h.x * 17.0 + h.y * 3.0);
  return (1.0 - smoothstep(0.26, 0.31, shape)) * step(0.3, fract(h.z * 31.0));
}`,
    color: `{
  vec3 p = vSurfWorld;
  float macro = bwFbm3(vec3(p.xz * 0.18, 1.0)) * 0.5 + 0.5;
  vec3 ground = ${vec3(o.soil)} * (0.7 + 0.55 * macro) * (0.88 + 0.24 * (bwNoise(vec3(p.xz * 3.3, 2.0)) * 0.5 + 0.5));
  // Fine detail fades to its average before it can alias into speckle.
  float footprint = length(fwidth(p.xz));
  float grit = smoothstep(0.55, 0.8, bwNoise(vec3(p.xz * 22.0, 5.0)) * 0.5 + 0.5) * ${f(o.grit)} * (1.0 - smoothstep(0.004, 0.012, footprint));
  ground *= 1.0 + grit * 0.25;
  float leaves = 0.0, tone = 0.0, t;
  float litterMask = smoothstep(0.35, 0.7, bwFbm3(vec3(p.xz * 0.35, 7.0)) * 0.5 + 0.5 + ${f(o.litterAmount - 0.5)});
  for (int i = 0; i < 3; i++) {
    float l = groundLeaf(p.xz * (9.0 + float(i) * 4.0) + float(i) * 9.1, float(i), t);
    if (l > leaves) tone = t;
    leaves = max(leaves, l);
  }
  float leafDetail = 1.0 - smoothstep(0.006, 0.02, footprint);
  leaves = mix(0.35, leaves, leafDetail) * litterMask;
  tone = mix(0.5, tone, leafDetail);
  ground = mix(ground, mix(${vec3(o.litter[0])}, ${vec3(o.litter[1])}, tone) * (0.75 + 0.4 * macro), leaves);
  float moss = smoothstep(0.45, 0.75, bwFbm3(vec3(p.xz * 0.6, 3.0)) * 0.5 + 0.5 + ${f(o.mossAmount - 0.5)}) * (1.0 - leaves);
  ground = mix(ground, ${vec3(o.moss)} * (0.7 + 0.5 * (bwNoise(vec3(p.xz * 17.0, 9.0)) * 0.5 + 0.5)), moss);
  diffuseColor.rgb *= ground;
  groundHeight = leaves * 0.6 + grit * 0.5 + moss * 0.4 + macro * 0.5;
}`,
    roughness: 'roughnessFactor *= 0.85 + 0.25 * groundHeight;',
    normal: 'normal = shelterBump(normal, groundHeight, 0.012 * shelterDetail(0.05));',
  });
}

export interface FoliageOptions {
  key: string;
  /** Light seen through leaves against the bright overcast (linear radiance). */
  translucency: THREE.ColorRepresentation;
  strength?: number;
}

/** Thin leaves glow when seen against the sky; wet leaves keep a glossy film. */
export function applyFoliage<T extends THREE.MeshStandardMaterial>(material: T, options: FoliageOptions): T {
  const strength = options.strength ?? 1;
  return patch(material, {
    key: `foliage-${options.key}`,
    fragmentCommon: '',
    color: `{
  float vary = bwNoise(vSurfWorld * 2.3) * 0.5 + 0.5;
  diffuseColor.rgb *= 0.8 + 0.4 * vary;
  vec3 eyeRay = normalize(vSurfWorld - cameraPosition);
  // Back-lit by the overcast: strongest when looking up through the canopy.
  totalEmissiveRadiance += diffuseColor.rgb * ${vec3(options.translucency)} * ${f(strength)} * smoothstep(-0.25, 0.7, eyeRay.y) * (0.6 + 0.4 * vary);
}`,
  });
}

/* ---------------------------------------------------------------- geometry */

/** Adds the per-piece grain attributes timber shading needs. */
export function timberAttributes(geometry: THREE.BufferGeometry, axis: THREE.Vector3, piece: number, centre = new THREE.Vector3()) {
  const count = geometry.attributes.position.count;
  const grain = new Float32Array(count * 3), centres = new Float32Array(count * 3), seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    grain.set([axis.x, axis.y, axis.z], i * 3);
    centres.set([centre.x, centre.y, centre.z], i * 3);
    seeds[i] = piece;
  }
  geometry.setAttribute('aGrain', new THREE.BufferAttribute(grain, 3));
  geometry.setAttribute('aCentre', new THREE.BufferAttribute(centres, 3));
  geometry.setAttribute('aPiece', new THREE.BufferAttribute(seeds, 1));
  return geometry;
}

/** Collects timber pieces into one merged, world-space mesh (grain attribute rotated too). */
export class TimberSet {
  private pieces: THREE.BufferGeometry[] = [];
  private count = 0;
  constructor(private seed = 1) {}

  /** A beam or plank with softened edges; the grain runs along its longest side unless given. */
  box(w: number, h: number, d: number, position: THREE.Vector3Like, rotation: THREE.Euler = new THREE.Euler(), options: { radius?: number; grain?: 'x' | 'y' | 'z' } = {}) {
    const radius = Math.min(options.radius ?? 0.012, Math.min(w, h, d) * 0.45);
    const geometry = new RoundedBoxGeometry(w, h, d, 2, radius);
    const axisName = options.grain ?? (w >= h && w >= d ? 'x' : h >= d ? 'y' : 'z');
    const axis = new THREE.Vector3(axisName === 'x' ? 1 : 0, axisName === 'y' ? 1 : 0, axisName === 'z' ? 1 : 0);
    return this.add(geometry, axis, new THREE.Matrix4().compose(new THREE.Vector3().copy(position as THREE.Vector3), new THREE.Quaternion().setFromEuler(rotation), new THREE.Vector3(1, 1, 1)));
  }

  /** A round log/rafter between two points, slightly irregular. */
  log(a: THREE.Vector3, b: THREE.Vector3, radius: number, endRadius = radius, sides = 14) {
    const length = a.distanceTo(b);
    const geometry = new THREE.CylinderGeometry(endRadius, radius, length, sides, Math.max(2, Math.round(length * 3)), false);
    const p = geometry.attributes.position as THREE.BufferAttribute;
    const piece = this.seed * 13.7 + this.count * 1.618;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const r = Math.hypot(x, z);
      if (r < 1e-5) continue;
      const k = 1 + 0.06 * Math.sin(y * 3.1 + piece) + 0.035 * Math.sin(Math.atan2(z, x) * 3 + piece * 2);
      p.setXYZ(i, x * k, y, z * k);
    }
    geometry.computeVertexNormals();
    const direction = b.clone().sub(a).normalize();
    const matrix = new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction), new THREE.Vector3(1, 1, 1));
    return this.add(geometry, new THREE.Vector3(0, 1, 0), matrix, true);
  }

  add(geometry: THREE.BufferGeometry, localAxis: THREE.Vector3, matrix: THREE.Matrix4, roundwood = false) {
    const id = 0.001 + (this.seed * 0.137 + this.count++ * 0.6180339) % 1;
    const piece = roundwood ? -id : id;
    geometry.deleteAttribute('uv');
    if (geometry.index) geometry = geometry.toNonIndexed();
    geometry.applyMatrix4(matrix);
    const axis = localAxis.clone().transformDirection(matrix);
    timberAttributes(geometry, axis, piece, new THREE.Vector3().setFromMatrixPosition(matrix));
    this.pieces.push(geometry);
    return geometry;
  }

  build(material: THREE.Material, name: string) {
    const merged = mergeGeometries(this.pieces, false);
    this.pieces.forEach(piece => piece.dispose());
    this.pieces = [];
    const mesh = new THREE.Mesh(merged ?? new THREE.BufferGeometry(), material);
    mesh.name = name;
    mesh.castShadow = mesh.receiveShadow = true;
    return mesh;
  }
}
