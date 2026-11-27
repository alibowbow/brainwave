import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { GLSL_NOISE } from '../shared/render/glsl';
import { fbm3, noise3 } from '../shared/render/noise';
import { applyRockSurface, type RockSurfaceOptions } from '../shared/render/rockSurface';
import { createEmbers, createFlame, fireFlicker, type FlameOccluder } from '../shared/render/fireFlame';
import { boulderGeometry, GLSL_NIGHT_BUMP } from './landscape';

/** Original deterministic geometry/material helpers. No external assets or source ports. */
export function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const tau = Math.PI * 2;
const glslColor = (c: THREE.ColorRepresentation) => {
  const color = new THREE.Color(c);
  return `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
};
const f = (n: number) => n.toFixed(5);

export function mesh(
  geometry: THREE.BufferGeometry,
  surface: THREE.Material | THREE.Material[],
  pos: [number, number, number] = [0, 0, 0],
  rotation: [number, number, number] = [0, 0, 0],
): THREE.Mesh {
  const object = new THREE.Mesh(geometry, surface);
  object.position.set(...pos);
  object.rotation.set(...rotation);
  object.castShadow = object.receiveShadow = true;
  return object;
}

/** A tapered rod between two points with a few rings so it can bend light smoothly. */
export function beam(a: THREE.Vector3, b: THREE.Vector3, radius: number, surface: THREE.Material, sides = 12): THREE.Mesh {
  const d = b.clone().sub(a);
  const object = mesh(new THREE.CylinderGeometry(radius * 0.9, radius, d.length(), sides, 2), surface);
  object.position.copy(a).add(b).multiplyScalar(0.5);
  object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  return object;
}

/** World-space rock material from the shared stone shader, optionally sooted around a hearth. */
export function stoneMaterial(color: THREE.ColorRepresentation, options: RockSurfaceOptions, hearth?: { centre: THREE.Vector3; radius: number }) {
  const material = new THREE.MeshStandardMaterial({ color, roughness: options.dryRoughness ?? 0.86, metalness: 0 });
  if (hearth) {
    material.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
{
  // Soot on faces turned toward the fire, fading over the outer faces.
  vec3 fromFire = vRockWorld - vec3(${f(hearth.centre.x)}, ${f(hearth.centre.y)}, ${f(hearth.centre.z)});
  float inward = dot(normalize(vRockNormal), -normalize(vec3(fromFire.x, 0.0, fromFire.z)));
  float near = 1.0 - smoothstep(${f(hearth.radius * 0.7)}, ${f(hearth.radius * 1.25)}, length(fromFire.xz));
  float soot = clamp(smoothstep(-0.35, 0.6, inward) * near + near * 0.55 * smoothstep(0.1, 0.9, normalize(vRockNormal).y), 0.0, 1.0);
  soot *= 0.75 + 0.25 * bwNoise(vRockWorld * 9.0);
  diffuseColor.rgb *= mix(1.0, 0.1, soot);
}`);
    };
  }
  return applyRockSurface(material, options);
}

/**
 * Object-space wood: growth rings across the long axis, fibre streaks along it,
 * pores and wear; `axis` is the local long axis of the geometry.
 */
export function woodMaterial(color: THREE.ColorRepresentation, key: string, options: { axis?: 'x' | 'y' | 'z'; ring?: number; roughness?: number; weathered?: number } = {}) {
  const axis = options.axis ?? 'y';
  const swizzle = axis === 'y' ? 'xzy' : axis === 'x' ? 'yzx' : 'xyz';
  const material = new THREE.MeshStandardMaterial({ color, roughness: options.roughness ?? 0.78, metalness: 0 });
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWoodObject;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>\nvWoodObject = position.${swizzle};`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vWoodObject;
${GLSL_NOISE}
${GLSL_NIGHT_BUMP}
`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 wp = vWoodObject;
float wWarp = bwFbm3(vec3(wp.xy * 3.0, wp.z * 0.35) + 2.0);
float wRingCoord = length(wp.xy + vec2(0.31, -0.17)) * ${f(options.ring ?? 38)} + wWarp * 4.0 + bwNoise(wp * vec3(2.0, 2.0, 0.3)) * 1.5;
float wRing = smoothstep(0.15, 0.9, abs(fract(wRingCoord) * 2.0 - 1.0));
float wFibre = bwNoise(vec3(wp.xy * 140.0, wp.z * 2.4)) * clamp(1.5 - length(fwidth(wp)) * 140.0, 0.0, 1.0);
float wBlotch = bwFbm3(wp * vec3(6.0, 6.0, 0.8) + 7.0);
vec3 wColor = diffuseColor.rgb * (0.8 + 0.12 * wRing + 0.07 * wFibre + 0.24 * wBlotch);
float wGrey = smoothstep(0.1, 0.6, bwNoise(wp * vec3(9.0, 9.0, 1.4) + 3.0)) * ${f(options.weathered ?? 0.3)};
wColor = mix(wColor, vec3(dot(wColor, vec3(0.33))) * 1.15, wGrey);
diffuseColor.rgb = wColor;
`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = clamp(roughnessFactor + 0.1 * wFibre - 0.08 * wRing + wGrey * 0.1, 0.2, 1.0);
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = nightBump(-vViewPosition, normal, wRing * 0.0012 + wFibre * 0.0006 - wGrey * 0.0004, 1.0);
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|night-wood-v1|${key}|${axis}`;
  return material;
}

/** Object-space bark: deep furrows running along the local long axis, lichen flecks. */
export function barkMaterial(color: THREE.ColorRepresentation, key: string, options: { axis?: 'x' | 'y' | 'z'; furrows?: number; lichen?: number } = {}) {
  const axis = options.axis ?? 'y';
  const swizzle = axis === 'y' ? 'xzy' : axis === 'x' ? 'yzx' : 'xyz';
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.93, metalness: 0 });
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vBarkObject;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>\nvBarkObject = position.${swizzle};`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vBarkObject;
${GLSL_NOISE}
${GLSL_NIGHT_BUMP}
`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float bAngle = atan(vBarkObject.y, vBarkObject.x);
vec3 bp = vec3(cos(bAngle) * ${f(options.furrows ?? 5)}, sin(bAngle) * ${f(options.furrows ?? 5)}, vBarkObject.z * 2.2);
float bAA = clamp(1.5 - length(fwidth(vBarkObject)) * 30.0, 0.0, 1.0);
float bFurrow = bwRidged(bp * vec3(1.0, 1.0, 0.35));
float bPlates = bwNoise(bp * 2.6 + 3.0) * bAA;
float bLichen = smoothstep(0.35, 0.7, bwNoise(vBarkObject * 7.0 + 5.0)) * ${f(options.lichen ?? 0.2)};
vec3 bColor = diffuseColor.rgb * (0.45 + 0.75 * bFurrow + 0.18 * bPlates);
bColor = mix(bColor, vec3(0.42, 0.45, 0.37), bLichen);
diffuseColor.rgb = bColor;
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = nightBump(-vViewPosition, normal, bFurrow * 0.012 + bPlates * 0.003, 1.0);
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|night-bark-v1|${key}|${axis}`;
  return material;
}

/**
 * Woven canvas from UVs: fine warp/weft relief, slub variation and dirt; an
 * optional light inside (world position uniform) glows through thin fabric.
 */
export function fabricMaterial(color: THREE.ColorRepresentation, key: string, options: { weave?: number; side?: THREE.Side; glow?: { position: { value: THREE.Vector3 }; color: THREE.ColorRepresentation; strength: { value: number } } } = {}) {
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0, side: options.side ?? THREE.FrontSide });
  material.onBeforeCompile = (shader) => {
    if (options.glow) {
      shader.uniforms.uFabricGlowPos = options.glow.position;
      shader.uniforms.uFabricGlowStrength = options.glow.strength;
    }
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vFabricUv;\nvarying vec3 vFabricWorld;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvFabricUv = uv;\nvFabricWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec2 vFabricUv;
varying vec3 vFabricWorld;
${options.glow ? 'uniform vec3 uFabricGlowPos;\nuniform float uFabricGlowStrength;' : ''}
${GLSL_NOISE}
${GLSL_NIGHT_BUMP}
`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec2 fw = vFabricUv * ${f(options.weave ?? 220)};
float fAA = clamp(1.4 - length(fwidth(fw)) * 0.9, 0.0, 1.0);
float fWeave = (sin(fw.x * 6.2832) * sin(fw.y * 6.2832 + 1.57)) * fAA;
float fSlub = bwNoise(vec3(vFabricUv * vec2(9.0, 160.0), 1.0)) * 0.5 + bwNoise(vec3(vFabricUv * vec2(170.0, 8.0), 4.0)) * 0.5;
float fDirt = smoothstep(0.1, 0.8, bwFbm3(vFabricWorld * 1.4 + 3.0)) * 0.35 + smoothstep(0.4, 0.0, vFabricWorld.y) * 0.25;
diffuseColor.rgb *= (0.9 + 0.06 * fWeave + 0.1 * fSlub) * (1.0 - fDirt * 0.45);
`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = clamp(roughnessFactor - 0.08 * fSlub, 0.5, 1.0);
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = nightBump(-vViewPosition, normal, fWeave * 0.00025 + fSlub * 0.0004, 1.0);
`)
      .replace('#include <emissivemap_fragment>', options.glow ? `#include <emissivemap_fragment>
{
  // Light from inside diffuses through the canvas.
  vec3 toLight = vFabricWorld - uFabricGlowPos;
  float through = uFabricGlowStrength / (dot(toLight, toLight) + 0.35);
  totalEmissiveRadiance += ${glslColor(options.glow.color)} * diffuseColor.rgb * through * (0.85 + 0.15 * fWeave);
}` : '#include <emissivemap_fragment>');
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|night-fabric-v1|${key}`;
  return material;
}

/* ------------------------------------------------------------------------- */
/* Hearth: charred logs, coals, ash and the flame                             */
/* ------------------------------------------------------------------------- */

/** Alligator-charred wood with glowing cracks; per-vertex heat from `aLog.z`. */
function charMaterial(time: { value: number }, boost: { value: number }) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.62, metalness: 0 });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uCharTime = time;
    shader.uniforms.uCharBoost = boost;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec4 aLog;\nvarying vec4 vLog;\nvarying vec3 vCharObject;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLog = aLog;\nvCharObject = position;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float uCharTime;
uniform float uCharBoost;
varying vec4 vLog;
varying vec3 vCharObject;
${GLSL_NOISE}
${GLSL_NIGHT_BUMP}
vec2 charHash2(vec2 p) { p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return fract(sin(p) * 43758.5453); }
// Distance to the nearest Voronoi edge (two-pass), periodic around the log.
vec3 charVoronoi(vec2 x, float period) {
  vec2 n = floor(x), fr = fract(x);
  vec2 mg = vec2(0.0), mr = vec2(0.0);
  float md = 8.0, id = 0.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 g = vec2(float(i), float(j));
    vec2 cell = n + g; cell.x = mod(cell.x, period);
    vec2 r = g + charHash2(cell) - fr;
    float d = dot(r, r);
    if (d < md) { md = d; mr = r; mg = g; id = charHash2(cell + 17.0).x; }
  }
  float edge = 8.0;
  for (int j = -2; j <= 2; j++) for (int i = -2; i <= 2; i++) {
    vec2 g = mg + vec2(float(i), float(j));
    vec2 cell = n + g; cell.x = mod(cell.x, period);
    vec2 r = g + charHash2(cell) - fr;
    if (dot(mr - r, mr - r) > 1e-5) edge = min(edge, dot(0.5 * (mr + r), normalize(r - mr)));
  }
  return vec3(edge, id, sqrt(md));
}
`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec2 cWarp = vec2(bwNoise(vec3(vLog.xy * 0.35, 1.7)), bwNoise(vec3(vLog.xy * 0.35, 5.3))) * 0.45;
vec3 cv = charVoronoi(vLog.xy + cWarp, vLog.w);
float cWidth = max(0.035, length(fwidth(vLog.xy)) * 0.7);
float cCrack = (1.0 - smoothstep(cWidth * 0.3, cWidth * 1.4, cv.x)) * smoothstep(0.15, 0.55, bwNoise(vec3(vLog.xy * 0.5, 9.1)) + 0.45);
float cHeat = clamp(vLog.z, 0.0, 1.0);
float cBreath = 0.55 + 0.45 * smoothstep(-0.5, 0.6, bwNoise(vec3(vLog.xy * 0.22 + cv.y * 3.0, uCharTime * 0.21 + cv.y * 5.0)));
float cAsh = smoothstep(0.1, 0.65, bwNoise(vCharObject * 14.0 + 2.0) + 0.35 * (1.0 - cHeat) - 0.25 * cHeat) * 0.85;
vec3 cChar = vec3(0.034, 0.03, 0.027) * (0.7 + 0.6 * cv.y);
// Cooler outer ends keep some unburnt, split bark.
float cBark = smoothstep(0.03, 0.0, cHeat) * smoothstep(-0.2, 0.4, bwNoise(vCharObject * 6.0 + 1.0));
vec3 cColor = mix(cChar, vec3(0.26, 0.25, 0.235) * (0.7 + 0.5 * cv.y), cAsh * (1.0 - cCrack) * (1.0 - cBark));
cColor = mix(cColor, vec3(0.2, 0.13, 0.08) * (0.6 + 0.6 * bwNoise(vCharObject * vec3(30.0, 4.0, 30.0))), cBark * 0.85);
cColor = mix(cColor, vec3(0.012, 0.009, 0.008), cCrack * 0.8);
diffuseColor.rgb = cColor;
`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(0.5 + 0.2 * cv.y, 0.96, cAsh);
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = nightBump(-vViewPosition, normal, smoothstep(0.0, 0.2, cv.x) * 0.0025 + cAsh * 0.001, 1.0);
`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  float hot = pow(cHeat, 1.35) * (1.0 + 0.35 * uCharBoost);
  vec3 glow = mix(vec3(0.9, 0.12, 0.01), vec3(1.0, 0.42, 0.08), cHeat);
  totalEmissiveRadiance += glow * (cCrack * 4.0 * smoothstep(0.08, 0.35, cHeat) + (1.0 - cCrack) * smoothstep(0.6, 0.9, cHeat) * 0.35 * (1.0 - cAsh)) * hot * cBreath;
}
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|night-char-v1`;
  return material;
}

/** Coals and ash: veins of glowing heat, cooler ash coats on top; heat from `aHeat`. */
function emberBedMaterial(time: { value: number }, boost: { value: number }, kind: 'coal' | 'ash') {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: kind === 'ash' ? 0.98 : 0.7, metalness: 0 });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uEmberTime = time;
    shader.uniforms.uEmberBoost = boost;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aHeat;\nvarying float vHeat;\nvarying vec3 vEmberObject;\nvarying vec3 vEmberNormal;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvHeat = aHeat;\nvEmberObject = position;\nvEmberNormal = normal;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float uEmberTime;
uniform float uEmberBoost;
varying float vHeat;
varying vec3 vEmberObject;
varying vec3 vEmberNormal;
${GLSL_NOISE}
${GLSL_NIGHT_BUMP}
`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 ep = vEmberObject * ${kind === 'ash' ? '7.0' : '15.0'};
float eWidth = max(0.04, length(fwidth(ep)) * 0.5);
float eVein = 1.0 - smoothstep(eWidth, eWidth * 3.5, abs(bwNoise(ep)));
float eSpots = smoothstep(${kind === 'ash' ? '0.42, 0.7' : '0.2, 0.55'}, bwNoise(ep * 0.5 + 4.0));
float eHeat = clamp(vHeat, 0.0, 1.0);
float eAsh = smoothstep(${kind === 'ash' ? '-0.4, 0.4' : '0.1, 0.7'}, bwNoise(ep * 0.7 + 9.0) + normalize(vEmberNormal).y * 0.45 - eHeat * 0.5);
float eBreath = 0.5 + 0.5 * smoothstep(-0.6, 0.6, bwNoise(vec3(vEmberObject.xz * 3.0, uEmberTime * 0.17)));
vec3 eColor = mix(vec3(0.022, 0.019, 0.017), vec3(0.3, 0.29, 0.275) * (0.75 + 0.3 * eSpots), eAsh);
diffuseColor.rgb = eColor;
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = nightBump(-vViewPosition, normal, eVein * -0.003 + eAsh * 0.002, 1.0);
`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  float glowMask = (eVein * 0.8 + eSpots * ${kind === 'ash' ? '0.25' : '0.6'}) * (1.0 - eAsh * 0.85);
  float hot = pow(eHeat, 1.2) * eBreath * (1.0 + 0.3 * uEmberBoost);
  vec3 glow = mix(vec3(0.85, 0.1, 0.01), vec3(1.0, 0.45, 0.1), eHeat * eSpots);
  totalEmissiveRadiance += glow * glowMask * hot * ${kind === 'ash' ? '3.0' : '6.5'};
}
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|night-ember-v1|${kind}`;
  return material;
}

/** Split, charred log with recessed ends; `aLog` = (around, along, heat, period). */
function charredLogGeometry(length: number, radius: number, variation: number) {
  const segments = 44, axial = 18, rings = 5;
  const positions: number[] = [], logData: number[] = [], indices: number[] = [];
  const cellsAround = Math.max(10, Math.round(radius * tau * 30));
  const along = 17;
  const radiusAt = (angle: number, t: number) => {
    const fracture = 1 + Math.sin(angle * 3 + variation * 2.3) * 0.05 + Math.cos(angle * 7 - variation) * 0.03;
    const bark = noise3(Math.cos(angle) * 2.2 + variation, t * length * 3.5, Math.sin(angle) * 2.2) * 0.05;
    const burn = 1 - 0.18 * Math.exp(-(((t - 0.5) / 0.28) ** 2));
    return radius * THREE.MathUtils.lerp(1, 0.9, t) * (fracture + bark) * burn;
  };
  const add = (x: number, y: number, z: number, u: number, v: number) => {
    positions.push(x, y, z); logData.push(u, v, 0, cellsAround); return positions.length / 3 - 1;
  };
  for (let row = 0; row <= axial; row++) for (let col = 0; col <= segments; col++) {
    const t = row / axial, angle = col / segments * tau;
    const r = radiusAt(angle, t);
    add(Math.cos(angle) * r, (t - 0.5) * length, Math.sin(angle) * r, col / segments * cellsAround, t * length * along);
  }
  for (let row = 0; row < axial; row++) for (let col = 0; col < segments; col++) {
    const a = row * (segments + 1) + col, b = a + 1, c = a + segments + 1, d = c + 1;
    indices.push(a, c, b, b, c, d);
  }
  for (let end = 0; end < 2; end++) {
    const sign = end ? 1 : -1;
    const centre = add(0, sign * (length * 0.5 - 0.014), 0, 0, 0);
    const start = positions.length / 3;
    for (let ring = 1; ring <= rings; ring++) for (let col = 0; col <= segments; col++) {
      const q = ring / rings, angle = col / segments * tau;
      const r = radiusAt(angle, end) * q;
      const scoop = 0.014 * (1 - q * q);
      add(Math.cos(angle) * r, sign * (length * 0.5 - scoop), Math.sin(angle) * r, col / segments * cellsAround * 0.5, 40 + q * 5 + end * 20);
    }
    for (let col = 0; col < segments; col++) {
      const current = start + col, next = current + 1;
      if (end) indices.push(centre, next, current); else indices.push(centre, current, next);
    }
    for (let ring = 0; ring < rings - 1; ring++) for (let col = 0; col < segments; col++) {
      const a = start + ring * (segments + 1) + col, b = a + 1, c = a + segments + 1, d = c + 1;
      if (end) indices.push(a, b, c, b, d, c); else indices.push(a, c, b, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aLog', new THREE.Float32BufferAttribute(logData, 4));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export interface Hearth {
  group: THREE.Group;
  target: THREE.Object3D;
  light: THREE.PointLight;
  bounce: THREE.PointLight;
  /** World-space centre of the flame for glows and smoke. */
  glow: THREE.Vector3;
  update: (time: number, dt: number) => void;
  stoke: () => number;
}

export interface HearthOptions {
  noise: THREE.Data3DTexture;
  /** Key light intensity (candela) and range. */
  lightIntensity?: number;
  bounceIntensity?: number;
  ringStone?: THREE.ColorRepresentation;
  shadowMapSize?: number;
}

export function fire(position: [number, number, number], scale: number, options: HearthOptions): Hearth {
  const group = new THREE.Group();
  group.position.set(...position);
  group.scale.setScalar(scale);
  group.updateMatrixWorld(true);
  const time = { value: 0 }, boost = { value: 0 };
  const random = seeded(73217);
  const centre = new THREE.Vector3(...position);

  // Ring stones: faceted, sooted on the inner faces, merged into one draw.
  const ringRadius = 0.78;
  const stones: THREE.BufferGeometry[] = [];
  const stoneCount = 13;
  for (let i = 0; i < stoneCount; i++) {
    const angle = i / stoneCount * tau + (random() - 0.5) * 0.15;
    const r = ringRadius + (random() - 0.5) * 0.06;
    const big = random();
    const half: [number, number, number] = [0.12 + big * 0.12, 0.06 + random() * 0.09, 0.1 + random() * 0.08];
    const g = boulderGeometry(400 + i * 7, 10, 12, 0.14);
    g.applyMatrix4(new THREE.Matrix4().compose(
      new THREE.Vector3(Math.cos(angle) * r, half[1] * 0.72, Math.sin(angle) * r),
      new THREE.Quaternion().setFromEuler(new THREE.Euler((random() - 0.5) * 0.25, -angle + Math.PI / 2 + (random() - 0.5) * 0.4, (random() - 0.5) * 0.2)),
      new THREE.Vector3(...half),
    ));
    stones.push(g);
  }
  const ringMaterial = stoneMaterial(options.ringStone ?? '#5f5a54', {
    key: `hearth-ring-${position.join(',')}`, scale: 4.5, bump: 1.8, stain: '#4a3426', stainAmount: 0.3, cavity: 0.75, strata: 0.2, drips: 0, dryRoughness: 0.84,
  }, { centre, radius: ringRadius * scale });
  const ring = mesh(mergeGeometries(stones), ringMaterial);
  stones.forEach((g) => g.dispose());
  ring.name = 'Hearth ring stones';
  group.add(ring);

  // Ash bed: a low mound, displaced, heat falling off from the centre.
  const bedRings = 18, bedSides = 56;
  const bedPositions: number[] = [], bedHeat: number[] = [], bedIndex: number[] = [];
  for (let j = 0; j <= bedRings; j++) for (let i = 0; i <= bedSides; i++) {
    const q = j / bedRings, a = i / bedSides * tau;
    const r = q * 0.74;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const y = 0.012 + 0.05 * Math.exp(-q * q * 4) + fbm3(x * 6, 0.3, z * 6, 3) * 0.012 * (1 - q * 0.5) - 0.02 * Math.pow(q, 6);
    bedPositions.push(x, y, z);
    bedHeat.push(THREE.MathUtils.clamp(1.05 - q * 1.35 + fbm3(x * 4, 1.7, z * 4, 2) * 0.3, 0, 1));
    if (j < bedRings && i < bedSides) { const n = j * (bedSides + 1) + i; bedIndex.push(n, n + bedSides + 1, n + 1, n + 1, n + bedSides + 1, n + bedSides + 2); }
  }
  const bedGeometry = new THREE.BufferGeometry();
  bedGeometry.setAttribute('position', new THREE.Float32BufferAttribute(bedPositions, 3));
  bedGeometry.setAttribute('aHeat', new THREE.Float32BufferAttribute(bedHeat, 1));
  bedGeometry.setIndex(bedIndex);
  bedGeometry.computeVertexNormals();
  const bed = mesh(bedGeometry, emberBedMaterial(time, boost, 'ash'));
  bed.castShadow = false;
  bed.name = 'Ash bed';
  group.add(bed);

  // Glowing coals heaped under the logs.
  const coals: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 44; i++) {
    const a = random() * tau, r = Math.pow(random(), 0.8) * 0.46;
    const s = 0.025 + random() * 0.045;
    const g = boulderGeometry(900 + i, 2, 6);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, 0.03 + 0.05 * Math.exp(-r * r * 9) + s * 0.4, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(random() * 3, random() * 3, random() * 3)), new THREE.Vector3(s * 1.3, s * 0.7, s)));
    const heat = THREE.MathUtils.clamp(1.1 - r * 1.6 + (random() - 0.5) * 0.35, 0.05, 1);
    g.setAttribute('aHeat', new THREE.Float32BufferAttribute(new Array(g.attributes.position.count).fill(heat), 1));
    coals.push(g);
  }
  const coalMesh = mesh(mergeGeometries(coals), emberBedMaterial(time, boost, 'coal'));
  coals.forEach((g) => g.dispose());
  coalMesh.castShadow = false;
  coalMesh.name = 'Glowing coals';
  group.add(coalMesh);

  // Logs: two lying across the coals, three leaning inward.
  const logs = new THREE.Group();
  logs.name = 'Charred logs';
  const charMat = charMaterial(time, boost);
  const occluders: FlameOccluder[] = [];
  const layout: Array<{ mid: [number, number, number]; dir: [number, number, number]; length: number; radius: number }> = [
    { mid: [-0.04, 0.1, 0.12], dir: [Math.cos(0.3), 0.03, Math.sin(0.3)], length: 1.04, radius: 0.1 },
    { mid: [0.05, 0.12, -0.14], dir: [Math.cos(2.2), -0.05, Math.sin(2.2)], length: 0.98, radius: 0.092 },
    { mid: [0.24, 0.2, 0.08], dir: [-0.84, 0.36, -0.4], length: 0.84, radius: 0.08 },
    { mid: [-0.26, 0.19, -0.06], dir: [0.86, 0.34, 0.12], length: 0.78, radius: 0.074 },
    { mid: [0.02, 0.16, -0.36], dir: [0.15, 0.3, 0.94], length: 0.62, radius: 0.068 },
  ];
  layout.forEach((entry, i) => {
    const geometry = charredLogGeometry(entry.length, entry.radius, i * 1.7 + 0.4);
    const direction = new THREE.Vector3(...entry.dir).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    const midPoint = new THREE.Vector3(...entry.mid);
    // Heat: hottest near the centre, low down and on faces toward the coals.
    const matrix = new THREE.Matrix4().compose(midPoint, quaternion, new THREE.Vector3(1, 1, 1));
    const p = new THREE.Vector3(), n = new THREE.Vector3();
    const pos = geometry.attributes.position as THREE.BufferAttribute, nor = geometry.attributes.normal as THREE.BufferAttribute;
    const data = geometry.attributes.aLog as THREE.BufferAttribute;
    for (let v = 0; v < pos.count; v++) {
      p.fromBufferAttribute(pos, v).applyMatrix4(matrix);
      n.fromBufferAttribute(nor, v).applyQuaternion(quaternion);
      const radial = Math.hypot(p.x, p.z);
      const toward = -(n.x * p.x + n.z * p.z) / Math.max(radial, 1e-3);
      // Embers live where wood meets the coal bed: low, central, facing inward or down.
      const centreHeat = THREE.MathUtils.smoothstep(0.5 - radial, 0, 0.38);
      const low = 1 - THREE.MathUtils.smoothstep(p.y, 0.1, 0.3);
      const facing = 0.35 * Math.max(0, -n.y) + 0.45 * Math.max(0, toward) + 0.2;
      const heat = centreHeat * (0.35 + 0.65 * low) * facing * (0.75 + 0.5 * noise3(p.x * 9, p.y * 9, p.z * 9));
      data.setZ(v, THREE.MathUtils.clamp(heat * 1.3, 0, 0.9));
    }
    const log = mesh(geometry, charMat);
    log.position.copy(midPoint);
    log.quaternion.copy(quaternion);
    logs.add(log);
    const half = direction.clone().multiplyScalar(entry.length * 0.5);
    occluders.push({ a: midPoint.clone().sub(half), b: midPoint.clone().add(half), radius: entry.radius * 0.92 });
  });
  group.add(logs);

  const flame = createFlame({ noise: options.noise, height: 1.3, radius: 0.32, occluders, seed: Math.round(position[0] * 10 + 3), intensity: 1 });
  flame.mesh.position.y = 0.04;
  group.add(flame.mesh);
  // Shift occluders into the flame's frame.
  for (const v of [...flame.uniforms.uCapA.value, ...flame.uniforms.uCapB.value]) v.y -= 0.04;
  const embers = createEmbers({ count: 110, radius: 0.28, spawnY: 0.3, rise: 1.7, seed: 991, rate: 0.32, size: 9 });
  group.add(embers.points);

  // Key light: warm, flickering, soft shadows (shadow maps re-render only on layout changes).
  const lightIntensity = options.lightIntensity ?? 9;
  const light = new THREE.PointLight('#ff9a52', lightIntensity, 0, 2);
  light.position.set(0, 0.62, 0);
  light.castShadow = true;
  light.shadow.mapSize.set(options.shadowMapSize ?? 512, options.shadowMapSize ?? 512);
  light.shadow.radius = 7;
  light.shadow.bias = -0.004;
  light.shadow.normalBias = 0.03;
  light.shadow.camera.near = 0.08;
  light.shadow.camera.far = 30;
  group.add(light);
  // Radiance of the glowing bed falling onto stones, logs and the nearest ground.
  const bounceIntensity = options.bounceIntensity ?? 1.6;
  const bounce = new THREE.PointLight('#ff6a2a', bounceIntensity, 4.5, 2);
  bounce.position.set(0, 0.16, 0);
  group.add(bounce);

  let stokeBoost = 0;
  let clock = 0;
  const glow = new THREE.Vector3(0, 0.45, 0).multiplyScalar(scale).add(centre);
  return {
    group, target: logs, light, bounce, glow,
    update(t, dt) {
      clock = t;
      const step = THREE.MathUtils.clamp(dt, 0, 0.08);
      stokeBoost = Math.max(0, stokeBoost - step * 0.22);
      const swell = THREE.MathUtils.smoothstep(stokeBoost, 0, 1);
      time.value = t;
      boost.value = swell;
      flame.uniforms.uTime.value = t;
      flame.uniforms.uBoost.value = swell;
      embers.uniforms.uTime.value = t;
      const flicker = fireFlicker(t, position[0]);
      light.intensity = lightIntensity * flicker * (1 + swell * 0.18);
      bounce.intensity = bounceIntensity * (0.92 + 0.08 * fireFlicker(t * 0.4, 9.1)) * (1 + swell * 0.12);
    },
    stoke() {
      stokeBoost = Math.min(1, stokeBoost + 0.55);
      embers.stoke(clock, 0.3);
      return 0.5;
    },
  };
}

/* ------------------------------------------------------------------------- */
/* Lantern                                                                    */
/* ------------------------------------------------------------------------- */

export function lantern(position: [number, number, number], scale = 1): {
  group: THREE.Group; target: THREE.Object3D; update: (time: number, dt: number) => void; toggle: () => number;
} {
  const group = new THREE.Group();
  group.position.set(...position);
  group.scale.setScalar(scale);
  const brass = new THREE.MeshStandardMaterial({ color: '#b08d57', roughness: 0.38, metalness: 1 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: '#3a3b38', roughness: 0.55, metalness: 0.85 });
  const baseProfile = [new THREE.Vector2(0.13, 0), new THREE.Vector2(0.16, 0.02), new THREE.Vector2(0.158, 0.056),
    new THREE.Vector2(0.11, 0.085), new THREE.Vector2(0.08, 0.104)];
  group.add(mesh(new THREE.LatheGeometry(baseProfile, 40), brass));
  const capProfile = [new THREE.Vector2(0.15, 0.44), new THREE.Vector2(0.16, 0.461),
    new THREE.Vector2(0.12, 0.48), new THREE.Vector2(0.085, 0.505), new THREE.Vector2(0.069, 0.54), new THREE.Vector2(0.055, 0.555)];
  group.add(mesh(new THREE.LatheGeometry(capProfile, 40), brass));
  group.add(mesh(new THREE.CylinderGeometry(0.062, 0.072, 0.043, 24), darkMetal, [0, 0.535, 0]));
  const glass = new THREE.MeshPhysicalMaterial({
    color: '#fff2da', roughness: 0.06, metalness: 0, transparent: true, opacity: 0.16,
    clearcoat: 1, clearcoatRoughness: 0.05, side: THREE.DoubleSide, depthWrite: false,
  });
  const glassProfile = [new THREE.Vector2(0.096, 0.094), new THREE.Vector2(0.123, 0.15),
    new THREE.Vector2(0.126, 0.30), new THREE.Vector2(0.104, 0.40), new THREE.Vector2(0.099, 0.447)];
  const chimney = mesh(new THREE.LatheGeometry(glassProfile, 48), glass);
  chimney.castShadow = false;
  chimney.renderOrder = 2;
  group.add(chimney);
  for (let i = 0; i < 4; i++) {
    const angle = i / 4 * tau + 0.3;
    const x = Math.cos(angle) * 0.143, z = Math.sin(angle) * 0.143;
    const wire = beam(new THREE.Vector3(x, 0.061, z), new THREE.Vector3(x * 0.89, 0.46, z * 0.89), 0.008, brass, 8);
    wire.castShadow = false;
    group.add(wire);
  }
  for (const y of [0.10, 0.424]) {
    group.add(mesh(new THREE.TorusGeometry(0.116, 0.006, 8, 48), brass, [0, y, 0], [Math.PI / 2, 0, 0]));
  }
  const handlePoints: THREE.Vector3[] = [];
  for (let i = 0; i <= 24; i++) {
    const angle = i / 24 * Math.PI;
    handlePoints.push(new THREE.Vector3(Math.cos(angle) * 0.155, 0.475 + Math.sin(angle) * 0.20, 0));
  }
  group.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(handlePoints), 40, 0.008, 8, false), darkMetal));
  // The mantle and a small flame are HDR so the pipeline blooms them.
  const mantle = new THREE.MeshStandardMaterial({ color: '#ffe2b0', emissive: '#ffb25a', emissiveIntensity: 2.1, roughness: 0.67 });
  const core = mesh(new THREE.CapsuleGeometry(0.03, 0.08, 6, 14), mantle, [0, 0.25, 0]);
  core.castShadow = false;
  group.add(core);
  group.add(mesh(new THREE.CylinderGeometry(0.048, 0.061, 0.025, 20), brass, [0, 0.16, 0]));
  const light = new THREE.PointLight('#ffc27a', 2.3, 7 * scale, 1.65);
  light.position.set(0, 0.27, 0);
  group.add(light);
  let level = 0.7, targetLevel = 0.7, index = 1;
  let changed = false;
  const levels = [0.38, 0.7, 1];
  return {
    group, target: group,
    update(time, dt) {
      // A user interaction must remain visible in reduced-motion/static rendering.
      if (changed && dt <= 0) level = targetLevel;
      changed = false;
      level += (targetLevel - level) * (1 - Math.exp(-Math.max(0, Math.min(dt, 0.08)) * 2.4));
      light.intensity = 3.3 * level * scale * (1 + Math.sin(time * 0.91) * 0.012);
      mantle.emissiveIntensity = 9 * level;
    },
    toggle() { index = (index + 1) % levels.length; targetLevel = levels[index]; changed = true; return targetLevel; },
  };
}
