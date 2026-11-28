import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { GLSL_NOISE } from '../../shared/render/glsl';

/*
 * Small shared toolkit for the Korean places worlds. Everything is authored
 * here in code: no fetched models or images. Surfaces are evaluated in world
 * space so merged static geometry never shows UV seams or repeats.
 */

/** Shared noise with an include guard, so chained material patches can each ask for it. */
export const KP_NOISE = `
#ifndef KP_NOISE
#define KP_NOISE
${GLSL_NOISE}
#endif
`;

const vec3 = (c: THREE.ColorRepresentation) => {
  const color = new THREE.Color(c);
  return `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
};
const f = (n: number) => n.toFixed(5);

/** Bake every plain mesh under `root` into one mesh per material (and shadow
 * flags) parented to `target`. Multi-material groups are split; mirrored
 * transforms keep their winding. Meshes with `userData.keep` stay live. */
export function bakeStatic(root: THREE.Object3D, target: THREE.Object3D = root) {
  root.updateMatrixWorld(true);
  target.updateMatrixWorld(true);
  const inverse = new THREE.Matrix4().copy(target.matrixWorld).invert();
  const buckets = new Map<string, { material: THREE.Material; cast: boolean; receive: boolean; parts: THREE.BufferGeometry[] }>();
  const removed: THREE.Mesh[] = [];
  root.traverse(object => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh || (mesh as THREE.InstancedMesh).isInstancedMesh || mesh.userData.keep || (mesh as unknown as THREE.Points).isPoints) return;
    if (!mesh.visible) return;
    const matrix = new THREE.Matrix4().multiplyMatrices(inverse, mesh.matrixWorld);
    const source = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
    source.applyMatrix4(matrix);
    if (matrix.determinant() < 0) flipWinding(source);
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const groups = Array.isArray(mesh.material) && mesh.geometry.groups.length
      ? mesh.geometry.groups.map(g => ({ start: g.start, count: g.count, material: materials[g.materialIndex ?? 0] }))
      : [{ start: 0, count: source.attributes.position.count, material: materials[0] }];
    for (const group of groups) {
      if (!group.material) continue;
      const part = Array.isArray(mesh.material) ? subset(source, group.start, group.count) : source;
      normalizeAttributes(part, !!(group.material as THREE.MeshStandardMaterial).vertexColors);
      const key = `${group.material.uuid}|${mesh.castShadow}|${mesh.receiveShadow}`;
      const bucket = buckets.get(key) ?? { material: group.material, cast: mesh.castShadow, receive: mesh.receiveShadow, parts: [] };
      bucket.parts.push(part); buckets.set(key, bucket);
    }
    if (Array.isArray(mesh.material)) source.dispose();
    removed.push(mesh);
  });
  const old = new Set<THREE.BufferGeometry>();
  removed.forEach(mesh => { mesh.parent?.remove(mesh); old.add(mesh.geometry); });
  old.forEach(g => g.dispose());
  const result: THREE.Mesh[] = [];
  buckets.forEach(bucket => {
    const merged = mergeGeometries(bucket.parts, false);
    bucket.parts.forEach(g => g.dispose());
    if (!merged) return;
    const mesh = new THREE.Mesh(merged, bucket.material);
    mesh.castShadow = bucket.cast; mesh.receiveShadow = bucket.receive;
    target.add(mesh); result.push(mesh);
  });
  return result;
}

function subset(geometry: THREE.BufferGeometry, start: number, count: number) {
  const out = new THREE.BufferGeometry();
  for (const [name, attribute] of Object.entries(geometry.attributes)) {
    const a = attribute as THREE.BufferAttribute;
    out.setAttribute(name, new THREE.BufferAttribute((a.array as Float32Array).slice(start * a.itemSize, (start + count) * a.itemSize), a.itemSize, a.normalized));
  }
  return out;
}

function flipWinding(geometry: THREE.BufferGeometry) {
  for (const attribute of Object.values(geometry.attributes)) {
    const a = attribute as THREE.BufferAttribute, n = a.itemSize, array = a.array as Float32Array;
    for (let i = 0; i < a.count; i += 3) for (let k = 0; k < n; k++) {
      const t = array[(i + 1) * n + k]; array[(i + 1) * n + k] = array[(i + 2) * n + k]; array[(i + 2) * n + k] = t;
    }
  }
}

function normalizeAttributes(geometry: THREE.BufferGeometry, colors: boolean) {
  for (const name of Object.keys(geometry.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(name)) geometry.deleteAttribute(name);
  const count = geometry.attributes.position.count;
  if (!geometry.attributes.normal) geometry.computeVertexNormals();
  if (!geometry.attributes.uv) geometry.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(count * 2), 2));
  if (colors && !geometry.attributes.color) geometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(count * 3).fill(1), 3));
  if (!colors && geometry.attributes.color) geometry.deleteAttribute('color');
  if (geometry.attributes.color && geometry.attributes.color.itemSize === 4) {
    const c = geometry.attributes.color, rgb = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { rgb[i * 3] = c.getX(i); rgb[i * 3 + 1] = c.getY(i); rgb[i * 3 + 2] = c.getZ(i); }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(rgb, 3));
  }
}

/** Adds world-position/normal varyings and the shared noise to a standard material. */
function worldVaryings(shader: THREE.WebGLProgramParametersWithUniforms, prefix: string) {
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', `#include <common>\nvarying vec3 v${prefix}World;\nvarying vec3 v${prefix}Normal;`)
    .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
{
  vec4 kpWorld = vec4(transformed, 1.0);
  vec3 kpNormal = objectNormal;
  #ifdef USE_INSTANCING
    kpWorld = instanceMatrix * kpWorld;
    kpNormal = mat3(instanceMatrix) * kpNormal;
  #endif
  v${prefix}World = (modelMatrix * kpWorld).xyz;
  v${prefix}Normal = normalize(mat3(modelMatrix) * kpNormal);
}`);
}

const SURFACE_GRADIENT = (height: string, scale: string, bump: string) => `
{
  const float e = 0.004;
  float h0 = ${height}(${scale});
  vec3 grad = vec3(${height}(${scale} + vec3(e, 0.0, 0.0)) - h0, ${height}(${scale} + vec3(0.0, e, 0.0)) - h0, ${height}(${scale} + vec3(0.0, 0.0, e)) - h0) / e;
  grad *= ${bump};
  vec3 viewGrad = (viewMatrix * vec4(grad, 0.0)).xyz;
  normal = normalize(normal - (viewGrad - dot(viewGrad, normal) * normal));
}`;

export interface WoodOptions {
  /** World axis the grain runs along. */
  axis: 'x' | 'y' | 'z';
  /** Boards laid side by side: their width across `across` gives each its own log. */
  plank?: { across: 'x' | 'y' | 'z'; width: number; offset?: number };
  light?: THREE.ColorRepresentation;
  dark?: THREE.ColorRepresentation;
  rings?: number;
  bump?: number;
  /** Paint over the timber, chipped and worn to reveal grain. */
  paint?: { color: THREE.ColorRepresentation; wear: number; roughness?: number };
  /** Lighter, smoother wear on upward faces (walked boards, sat edges). */
  polish?: number;
  roughness?: [number, number];
  key: string;
}

/** World-space timber: growth rings cut by each board, fine fibre streaks,
 * sparse knots, optional chipped paint. Drives albedo, roughness and bump. */
export function applyWood(material: THREE.MeshStandardMaterial, o: WoodOptions) {
  const across = o.axis === 'y' ? ['x', 'z'] : o.axis === 'x' ? ['y', 'z'] : ['x', 'y'];
  const plank = o.plank;
  material.onBeforeCompile = shader => {
    worldVaryings(shader, 'Wood');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vWoodWorld;
varying vec3 vWoodNormal;
${KP_NOISE}
vec4 woodFrame(vec3 p) {
  float along = p.${o.axis};
  vec2 crs = vec2(p.${across[0]}, p.${across[1]});
  float id = ${plank ? `floor((p.${plank.across} + ${f(plank.offset ?? 0)}) / ${f(plank.width)})` : '0.0'};
  return vec4(along, crs, id);
}
float woodHeight(vec3 p) {
  vec4 w = woodFrame(p);
  vec3 h = bwHash3(vec3(w.w, 11.0, 5.0));
  vec2 pith = w.yz + (h.xy - 0.5) * 2.6 + vec2(w.x * 0.012, 0.45 + h.z * 0.6 + w.x * (0.03 + h.z * 0.03));
  float r = length(pith) + bwNoise(vec3(w.x * 0.45, w.yz * 1.7) + h * 9.0) * 0.05;
  float ring = fract(r * ${f(o.rings ?? 14)});
  float fibre = bwNoise(vec3(w.x * 1.1, w.yz * 70.0) + h * 3.0);
  return -smoothstep(0.75, 0.98, ring) * 0.35 + fibre * 0.25;
}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec4 wf = woodFrame(vWoodWorld);
vec3 wh = bwHash3(vec3(wf.w, 11.0, 5.0));
vec2 wPith = wf.yz + (wh.xy - 0.5) * 2.6 + vec2(wf.x * 0.012, 0.45 + wh.z * 0.6 + wf.x * (0.03 + wh.z * 0.03));
float wR = length(wPith) + bwNoise(vec3(wf.x * 0.45, wf.yz * 1.7) + wh * 9.0) * 0.05;
float wRing = fract(wR * ${f(o.rings ?? 14)});
float wLate = smoothstep(0.55, 0.95, wRing) * (1.0 - smoothstep(0.95, 1.0, wRing));
float wFibre = bwNoise(vec3(wf.x * 1.1, wf.yz * 70.0) + wh * 3.0);
float wMacro = bwFbm3(vec3(wf.x * 0.25, wf.yz * 0.8) + wh * 17.0);
vec2 wKnotP = vec2(wf.x * 1.6, wf.y * 5.0 + wf.z * 5.0) + wh.xy * 40.0;
float wKnot = smoothstep(0.72, 0.9, bwNoise(vec3(wKnotP, wh.z * 7.0))) ;
vec3 wLight = ${vec3(o.light ?? '#a98c6a')}, wDark = ${vec3(o.dark ?? '#5b4330')};
vec3 woodColor = mix(wLight, wDark, wLate * 0.3 + wKnot * 0.7 + (wFibre * 0.5 + 0.5) * 0.18);
woodColor *= 0.86 + 0.2 * wMacro + 0.05 * wFibre + (wh.x - 0.5) * 0.22;
float woodUp = smoothstep(0.55, 0.95, vWoodNormal.y);
woodColor = mix(woodColor, woodColor * 1.12 + 0.015, woodUp * ${f(o.polish ?? 0)} * (0.5 + 0.5 * bwNoise(vWoodWorld * 0.7)));
float woodPaint = 0.0;
${o.paint ? `
float wChip = bwFbm3(vWoodWorld * 3.2 + 31.0) + 0.35 * bwNoise(vWoodWorld * 21.0);
float wChipT = 0.55 - ${f(o.paint.wear)} * 0.8;
woodPaint = 1.0 - smoothstep(wChipT, wChipT + 0.06, wChip);
vec3 paintColor = ${vec3(o.paint.color)} * (0.9 + 0.12 * wMacro + 0.04 * wFibre);
woodColor = mix(woodColor * 0.8, paintColor, woodPaint);` : ''}
diffuseColor.rgb *= woodColor;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(${f(o.roughness?.[0] ?? 0.78)}, ${f(o.roughness?.[1] ?? 0.9)}, wLate * 0.6 + 0.4 * (wFibre * 0.5 + 0.5));
roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.82, woodUp * ${f(o.polish ?? 0)});
${o.paint ? `roughnessFactor = mix(roughnessFactor, ${f(o.paint.roughness ?? 0.7)}, woodPaint);` : ''}`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
${SURFACE_GRADIENT('woodHeight', 'vWoodWorld', `${f((o.bump ?? 1) * 0.004)}${o.paint ? ' * (1.0 - 0.6 * woodPaint)' : ''}`)}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|kp-wood-v1|${o.key}`;
  return material;
}

export interface FoliageOptions {
  /** Light passing through leaves from behind (multiplies diffuse colour). */
  translucency: THREE.ColorRepresentation;
  /** Soft wrap of front lighting, 0..1. */
  wrap?: number;
  key: string;
  /** Optional additional vertex code after begin_vertex (e.g. wind). */
  vertex?: string;
  uniforms?: Record<string, THREE.IUniform>;
}

/** Thin-leaf lighting: back-lit leaves transmit light (shadowed by the light's
 * own shadow map) and front lighting wraps softly. */
export function applyFoliage(material: THREE.MeshStandardMaterial, o: FoliageOptions) {
  material.envMapIntensity = Math.min(material.envMapIntensity, .45);
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    Object.assign(shader.uniforms, o.uniforms ?? {});
    if (o.vertex) shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>\n${o.vertex}`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <lights_physical_pars_fragment>', `#include <lights_physical_pars_fragment>
void RE_Direct_Leaf(const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
  float ndl = dot(geometryNormal, directLight.direction);
  float wrapLight = max((ndl + ${f(o.wrap ?? 0.35)}) / (1.0 + ${f(o.wrap ?? 0.35)}), 0.0) - max(ndl, 0.0);
  reflectedLight.directDiffuse += wrapLight * directLight.color * BRDF_Lambert(material.diffuseColor) * 0.6;
  float back = max(-ndl, 0.0);
  float forward = pow(max(dot(-geometryViewDir, directLight.direction), 0.0), 3.0);
  reflectedLight.directDiffuse += directLight.color * material.diffuseColor * ${vec3(o.translucency)} * (back * 0.35 + forward * back * 0.9);
  // Thin cards seen edge-on would otherwise flash grazing Fresnel specular as bright hairlines.
  ReflectedLight leafLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  RE_Direct_Physical(directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, leafLight);
  float edgeOn = 1.0 - abs(dot(geometryNormal, geometryViewDir));
  reflectedLight.directDiffuse += leafLight.directDiffuse;
  reflectedLight.directSpecular += leafLight.directSpecular * 0.35 * (1.0 - smoothstep(0.5, 0.9, edgeOn));
}
#undef RE_Direct
#define RE_Direct RE_Direct_Leaf`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|kp-leaf-v1|${o.key}`;
  return material;
}

/** Generic world-space albedo/roughness/bump modulation for painted or plastered
 * surfaces: soft mottling, grime toward the ground, fine grain. */
export function applyWeathering(material: THREE.MeshStandardMaterial, o: { key: string; scale?: number; mottle?: number; grime?: number; grimeY?: number; grimeHeight?: number; bump?: number; streaks?: number }) {
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    worldVaryings(shader, 'Wx');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vWxWorld;
varying vec3 vWxNormal;
${KP_NOISE}
float wxHeight(vec3 p) { return bwNoise(p * 9.0) * 0.5 + bwNoise(p * 31.0) * 0.25; }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 p = vWxWorld * ${f(o.scale ?? 1)};
  float m = bwFbm3(p * 0.9 + 4.0);
  float streak = bwFbm3(vec3(p.x * 3.0, p.y * 0.25, p.z * 3.0) + 9.0);
  float grime = 1.0 - smoothstep(0.0, ${f(o.grimeHeight ?? 0.6)}, vWxWorld.y - ${f(o.grimeY ?? -100)});
  diffuseColor.rgb *= (1.0 + ${f(o.mottle ?? 0.18)} * m) * (1.0 - ${f(o.streaks ?? 0)} * smoothstep(0.1, 0.5, streak));
  diffuseColor.rgb *= 1.0 - ${f(o.grime ?? 0)} * grime;
}`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
${SURFACE_GRADIENT('wxHeight', `(vWxWorld * ${f(o.scale ?? 1)})`, f((o.bump ?? 1) * 0.0025))}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|kp-wx-v1|${o.key}`;
  return material;
}

/** A canvas texture authored in code. */
export function canvasTexture(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void, srgb = true) {
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  draw(canvas.getContext('2d')!);
  const texture = new THREE.CanvasTexture(canvas);
  if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** Lathe from a (radius, height) list with smooth normals. */
export function lathe(profile: Array<[number, number]>, segments = 32) {
  return new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), segments);
}

/** Tube along a smooth curve with a radius that varies along it. */
export function taperedTube(points: THREE.Vector3[], radii: (t: number) => number, segments = 24, sides = 10, warp?: (p: THREE.Vector3, t: number, angle: number) => number) {
  const curve = new THREE.CatmullRomCurve3(points);
  const frames = curve.computeFrenetFrames(segments, false);
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  const p = new THREE.Vector3(), v = new THREE.Vector3();
  for (let i = 0; i <= segments; i++) {
    const t = i / segments; curve.getPointAt(t, p);
    const n = frames.normals[i], b = frames.binormals[i];
    for (let j = 0; j <= sides; j++) {
      const a = j / sides * Math.PI * 2;
      const r = radii(t) * (warp ? warp(p, t, a) : 1);
      v.copy(p).addScaledVector(n, Math.cos(a) * r).addScaledVector(b, Math.sin(a) * r);
      positions.push(v.x, v.y, v.z); uvs.push(j / sides, t * curve.getLength());
      if (i < segments && j < sides) { const k = i * (sides + 1) + j; indices.push(k, k + sides + 1, k + 1, k + 1, k + sides + 1, k + sides + 2); }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}

/** Radial falloff sprite, white with alpha. */
export function glowTexture(size = 64, power = 2.2) {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const d = Math.hypot((x + .5 - size / 2) / (size / 2), (y + .5 - size / 2) / (size / 2));
    const i = (y * size + x) * 4; data[i] = data[i + 1] = data[i + 2] = 255;
    data[i + 3] = Math.round(Math.pow(Math.max(0, 1 - d), power) * 255);
  }
  const texture = new THREE.DataTexture(data, size, size); texture.needsUpdate = true;
  texture.magFilter = THREE.LinearFilter; texture.minFilter = THREE.LinearFilter;
  return texture;
}
