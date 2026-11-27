import * as THREE from 'three';
import { withSharedGlsl } from '../shared/render/translucentSurface';

/*
 * World-space building materials for the snowy village (original, code-only).
 *  - Wood: grain runs along each board's own long axis (a per-vertex `grain`
 *    attribute written before the static geometry is merged), with growth
 *    rings, sparse knots, weathered silver-grey tops and darker, damp feet.
 *  - Plaster: lime render with broad tonal patches, damp staining rising from
 *    the plinth, hairline cracks kept sparse, and a stucco bump.
 * Both chain with other onBeforeCompile hooks (snow cover is added on top).
 */

const glsl = (c: THREE.ColorRepresentation) => {
  const color = new THREE.Color(c);
  return `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
};
const f = (n: number) => n.toFixed(4);

/** The village ground height in GLSL, matching `groundHeight` on the CPU. */
export const GLSL_VILLAGE_GROUND = /* glsl */ `
float villageLane(float z) { return sin((-z + 2.0) * 0.115) * 1.6 + sin(z * 0.037) * 0.4; }
float villageGround(vec3 p) {
  float d = abs(p.x - villageLane(p.z));
  float banks = smoothstep(1.6, 4.5, d);
  return -0.17 + banks * (0.31 + sin(p.z * 0.6 + p.x) * 0.07) + sin(p.x * 0.83 + p.z * 0.39) * 0.024 + cos(p.z * 0.73) * 0.025;
}
`;

function worldVaryings(shader: THREE.WebGLProgramParametersWithUniforms, extraAttribute = '') {
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', `#include <common>\n${extraAttribute}\nvarying vec3 vVillageWorld;\nvarying vec3 vVillageNormal;${extraAttribute ? '\nvarying vec3 vVillageGrain;' : ''}`)
    .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
vVillageWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
vVillageNormal = normalize(mat3(modelMatrix) * objectNormal);
${extraAttribute ? 'vVillageGrain = normalize(mat3(modelMatrix) * grain + 1e-5);' : ''}`);
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <common>', `#include <common>\nvarying vec3 vVillageWorld;\nvarying vec3 vVillageNormal;${extraAttribute ? '\nvarying vec3 vVillageGrain;' : ''}\n${withSharedGlsl(shader.fragmentShader)}`);
}

export interface WoodOptions {
  key: string;
  /** 0..1: silvering and lightening of exposed, weathered wood. */
  weathered?: number;
  /** Strength of the grain bump. */
  bump?: number;
  roughness?: number;
}

/** Boards whose grain follows their own long axis. Geometry must carry a `grain` vec3 attribute. */
export function createWoodMaterial(color: THREE.ColorRepresentation, options: WoodOptions) {
  const o = { weathered: .4, bump: 1, roughness: .82, ...options };
  const material = new THREE.MeshStandardMaterial({ color, roughness: o.roughness, metalness: 0 });
  material.userData.grain = true;
  material.onBeforeCompile = (shader) => {
    worldVaryings(shader, 'attribute vec3 grain;');
    shader.fragmentShader = shader.fragmentShader
      .replace('void main() {', `${GLSL_VILLAGE_GROUND}
float woodGrain(vec3 p, vec3 axis, out float knot) {
  vec3 helper = abs(axis.y) < .9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 u = normalize(cross(axis, helper)), w = cross(axis, u);
  float along = dot(p, axis), cu = dot(p, u), cw = dot(p, w);
  float warp = bwNoise(vec3(along * .35, cu * 2.0, cw * 2.0)) * 1.6;
  float rings = sin((cu * 31.0 + cw * 9.0) + warp * 6.0 + along * .4);
  float streak = bwNoise(vec3(along * 1.1, cu * 42.0, cw * 42.0));
  vec3 knotCell = floor(vec3(along * 1.4, cu * 3.0, cw * 3.0));
  vec3 kr = bwHash3(knotCell);
  float kd = length(vec2((fract(along * 1.4) - kr.y) * 1.8, (fract(cu * 3.0 + cw * 3.0) - kr.z) * 2.5));
  knot = step(.86, kr.x) * (1.0 - smoothstep(.05, .35, kd));
  return rings * .35 + streak * .65;
}
void main() {`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float woodKnot;
float woodG = woodGrain(vVillageWorld, normalize(vVillageGrain), woodKnot);
float woodFine = clamp(1.4 - length(fwidth(vVillageWorld)) * 30.0, 0.0, 1.0);
vec3 woodColor = diffuseColor.rgb * (.78 + .26 * woodG * mix(.5, 1.0, woodFine) + .12 * bwNoise(vVillageWorld * .9));
woodColor *= 1.0 - woodKnot * .45;
float woodTop = smoothstep(.3, .9, normalize(vVillageNormal).y);
float woodWeather = clamp(${f(o.weathered)} * (.55 + .45 * woodTop + .3 * bwNoise(vVillageWorld * 1.7)), 0.0, 1.0);
woodColor = mix(woodColor, vec3(dot(woodColor, vec3(.33))) * vec3(1.02, 1.0, .97) * 1.15, woodWeather * .55);
float woodDamp = 1.0 - smoothstep(.0, .45, vVillageWorld.y - villageGround(vVillageWorld));
woodColor *= 1.0 - .3 * woodDamp;
diffuseColor.rgb = woodColor;
`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = clamp(roughnessFactor * (.92 + .12 * woodG) - woodDamp * .12, .35, 1.0);
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = bwSurfaceBump(-vViewPosition, normal, (woodG * .0016 - woodKnot * .002) * woodFine, ${f(o.bump)});
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|village-wood-v1|${o.key}`;
  return material;
}

export interface PlasterOptions {
  key: string;
  /** Damp/grime colour rising from the plinth. */
  grime?: THREE.ColorRepresentation;
  bump?: number;
}

/** Lime render: tonal patches, rising damp, sparse hairline cracks, stucco relief. */
export function createPlasterMaterial(color: THREE.ColorRepresentation, options: PlasterOptions) {
  const o = { grime: '#5d5648', bump: 1, ...options };
  const material = new THREE.MeshStandardMaterial({ color, roughness: .94, metalness: 0 });
  material.onBeforeCompile = (shader) => {
    worldVaryings(shader);
    shader.fragmentShader = shader.fragmentShader
      .replace('void main() {', `${GLSL_VILLAGE_GROUND}\nvoid main() {`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 pp = vVillageWorld;
float pFine = clamp(1.4 - length(fwidth(pp)) * 18.0, 0.0, 1.0);
float pPatch = bwFbm3(pp * .55 + 4.0);
float pStucco = bwNoise(pp * 14.0) * pFine;
float pCrack = pow(1.0 - abs(bwNoise(pp * vec3(1.3, 2.1, 1.3) + 9.0)), 30.0) * smoothstep(.1, .5, bwNoise(pp * .4 + 2.0)) * pFine;
float pHeight = pp.y - villageGround(pp);
float pDamp = (1.0 - smoothstep(.15, .7 + .35 * bwNoise(pp * 1.3), pHeight));
vec3 pColor = diffuseColor.rgb * (.86 + .2 * pPatch + .05 * pStucco);
pColor = mix(pColor, ${glsl(o.grime)}, pDamp * .55);
pColor *= 1.0 - pCrack * .35;
diffuseColor.rgb = pColor;
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = bwSurfaceBump(-vViewPosition, normal, pStucco * .0012 + pPatch * .004 - pCrack * .0008, ${f(o.bump)});
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|village-plaster-v1|${o.key}`;
  return material;
}

/** Warm room glimpsed through a window: soft lamp pool, curtain folds, ceiling falloff. HDR via colour > 1. */
export function interiorTexture(seed: number) {
  const width = 64, height = 96;
  const data = new Uint8Array(width * height * 4);
  let s = seed >>> 0;
  const rand = () => { s = (1664525 * s + 1013904223) >>> 0; return s / 4294967296; };
  const lampX = .35 + rand() * .3, lampY = .3 + rand() * .2;
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const u = x / (width - 1), v = y / (height - 1);
    const pool = Math.exp(-((u - lampX) ** 2 / .09 + (v - lampY) ** 2 / .06));
    const ceiling = .55 + .45 * (1 - v);
    const curtain = Math.min(1, Math.min(u, 1 - u) / .14);
    const folds = .82 + .18 * Math.sin(u * 64 + Math.sin(v * 7) * .8);
    const shade = (curtain < 1 ? folds * (.55 + .45 * curtain) : 1);
    const value = Math.min(1, (.32 + .75 * pool) * ceiling * shade);
    const i = (y * width + x) * 4;
    data[i] = Math.round(255 * Math.min(1, value * 1.0));
    data[i + 1] = Math.round(255 * Math.min(1, value * .78));
    data[i + 2] = Math.round(255 * Math.min(1, value * .5));
    data[i + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.LinearFilter; texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true; texture.needsUpdate = true;
  return texture;
}
