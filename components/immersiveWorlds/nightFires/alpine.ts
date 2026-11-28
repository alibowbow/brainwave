import * as THREE from 'three';
import { fbm3, noise3, ridged3 } from '../shared/render/noise';
import { GLSL_NOISE } from '../shared/render/glsl';
import { GLSL_NIGHT_BUMP } from './landscape';

/*
 * Alpine ranges for the deep night (original). Rounded massifs read as
 * programmer art; real ranges are carved:
 *  - a jagged main crest from ridged multifractal noise on top of the massifs,
 *  - spurs and gullies running down the fall line (anisotropic ridged noise),
 *    so the faces break into ribs that the moon lights on one flank only,
 *  - cliff bands where the relief is terraced, with scree fans below,
 *  - a per-vertex curvature attribute (`aCurv`, concave > 0) that the shading
 *    uses to keep snow in the couloirs below the snow line and to darken gullies.
 * The material layers banded bedrock, scree, forest below the tree line and
 * moonlit snow, with detail faded by pixel footprint so distance never shimmers.
 */

export interface AlpineRangeOptions {
  z: number;
  width: number;
  depth: number;
  base: number;
  peaks: Array<[number, number, number]>;
  seed: number;
  segments: [number, number];
  /** Shifts the crest backward (0.5 = centred). */
  crest?: number;
}

const smooth = THREE.MathUtils.smoothstep;

/** Fall-line ribs: ridged noise stretched along z (down the faces of an east-west range). */
function spurs(x: number, z: number, seed: number) {
  let sum = 0, amp = 0.5, f = 1;
  for (let k = 0; k < 4; k++) {
    const n = 1 - Math.abs(noise3(x * f + seed * 3 + k * 7.1, z * f * 0.3, seed + k * 1.3));
    sum += amp * n * n;
    amp *= 0.5; f *= 2.1;
  }
  return sum;
}

export function alpineRidgeGeometry(o: AlpineRangeOptions) {
  const [nx, nz] = o.segments;
  const tallest = Math.max(1, ...o.peaks.map((p) => p[1]));
  const crestAt = o.crest ?? 0.5;
  const s = o.seed * 0.173;
  const heights = new Float32Array((nx + 1) * (nz + 1));
  const positions: number[] = [], indices: number[] = [];
  for (let j = 0; j <= nz; j++) {
    const q = j / nz;
    for (let i = 0; i <= nx; i++) {
      const x = (i / nx - 0.5) * o.width;
      const z = o.z + (q - 0.5) * o.depth;
      const wx = x + fbm3(x * 0.011 + s, z * 0.02, s, 3) * 24;
      const u = q < crestAt ? q / crestAt : 1 - (q - crestAt) / (1 - crestAt);
      const profile = Math.pow(Math.max(0, Math.sin(u * Math.PI / 2)), q < crestAt ? 1.25 : 0.8);
      let massif = 0;
      for (const [px, ph, spread] of o.peaks) massif += ph * Math.exp(-(((wx - px) / spread) ** 2));
      const crest = ridged3(wx * 0.014 + s, z * 0.02, s * 2.1, 5);
      const ribs = spurs(wx * 0.05, z * 0.05, s);
      const detail = fbm3(wx * 0.09, z * 0.09, s + 9, 3);
      const face = Math.sin(u * Math.PI * 0.95 + 0.05);
      let h = massif * (0.62 + 0.72 * crest) + (ribs - 0.38) * tallest * 0.28 * face + detail * tallest * 0.04;
      // Cliff bands: terrace the relief where the rock is hard.
      const hard = smooth(noise3(wx * 0.018, z * 0.03, s + 4), 0.05, 0.45);
      const band = h / 5.5;
      const stepped = (Math.floor(band) + smooth(band - Math.floor(band), 0.3, 0.7)) * 5.5;
      h = THREE.MathUtils.lerp(h, stepped, 0.45 * hard);
      const y = o.base + Math.max(-2, h) * profile;
      heights[j * (nx + 1) + i] = y;
      positions.push(x, y, z + Math.sin(x * 0.02 + s) * 2.5 * profile);
      if (i < nx && j < nz) {
        const a = j * (nx + 1) + i;
        indices.push(a, a + nx + 1, a + 1, a + 1, a + nx + 1, a + nx + 2);
      }
    }
  }
  // Curvature (Laplacian of the height field), blurred once: gullies and couloirs > 0.
  const dx = o.width / nx, dz = o.depth / nz;
  const at = (i: number, j: number) => heights[THREE.MathUtils.clamp(j, 0, nz) * (nx + 1) + THREE.MathUtils.clamp(i, 0, nx)];
  const raw = new Float32Array(heights.length);
  for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) {
    const c = at(i, j);
    raw[j * (nx + 1) + i] = (at(i - 1, j) + at(i + 1, j) - 2 * c) / (dx * dx) + (at(i, j - 1) + at(i, j + 1) - 2 * c) / (dz * dz);
  }
  const curvature = new Float32Array(heights.length);
  for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) {
    let sum = 0;
    for (let b = -1; b <= 1; b++) for (let a = -1; a <= 1; a++) sum += raw[THREE.MathUtils.clamp(j + b, 0, nz) * (nx + 1) + THREE.MathUtils.clamp(i + a, 0, nx)];
    curvature[j * (nx + 1) + i] = THREE.MathUtils.clamp(sum / 9 * 4, -1, 1);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aCurv', new THREE.Float32BufferAttribute(curvature, 1));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export interface AlpineMaterialOptions {
  key: string;
  rock: THREE.ColorRepresentation;
  rockDark: THREE.ColorRepresentation;
  scree: THREE.ColorRepresentation;
  forest: THREE.ColorRepresentation;
  snow?: THREE.ColorRepresentation;
  treeLine: number;
  snowLine: number;
  bump?: number;
  /** Gain on direct (moon) light and extra sky light on snow, for far, backlit ranges. */
  moonGain?: number;
  skyGain?: number;
}

const glslColor = (c: THREE.ColorRepresentation) => {
  const color = new THREE.Color(c);
  return `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
};
const f = (n: number) => n.toFixed(4);

/** Banded bedrock, scree, forest, and snow that holds on the upper faces and in the couloirs. */
export function createAlpineMaterial(o: AlpineMaterialOptions) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.92, metalness: 0 });
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aCurv;\nvarying vec3 vAlpWorld;\nvarying vec3 vAlpNormal;\nvarying float vAlpCurv;')
      .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
vAlpWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
vAlpNormal = normalize(mat3(modelMatrix) * objectNormal);
vAlpCurv = aCurv;`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vAlpWorld;
varying vec3 vAlpNormal;
varying float vAlpCurv;
${GLSL_NOISE}
${GLSL_NIGHT_BUMP}
float alpAA(float frequency) { return clamp(1.6 - length(fwidth(vAlpWorld)) * frequency * 2.0, 0.0, 1.0); }
`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 ap = vAlpWorld;
float aSlope = 1.0 - clamp(normalize(vAlpNormal).y, 0.0, 1.0);
float aCurve = vAlpCurv;
float aBroad = bwFbm3(ap * 0.025 + 5.0);
float aMid = bwNoise(ap * 0.13 + 2.0) * alpAA(0.13);
float aFine = bwNoise(ap * vec3(0.55, 1.3, 0.55) + 9.0) * alpAA(0.6);
// Dipping strata in the bedrock.
float aStrata = (sin((ap.y + ap.x * 0.17 + aBroad * 7.0) * 1.6) * 0.5 + 0.5) * alpAA(1.0);
vec3 aRock = mix(${glslColor(o.rockDark)}, ${glslColor(o.rock)}, clamp(0.3 + 0.55 * aBroad + 0.3 * aMid + 0.22 * aStrata, 0.0, 1.0));
aRock *= 1.0 - 0.4 * smoothstep(0.0, 0.7, aCurve);
// Scree fans on the moderate slopes under the cliff bands.
float aScree = smoothstep(0.24, 0.38, aSlope) * (1.0 - smoothstep(0.5, 0.62, aSlope)) * smoothstep(-0.15, 0.35, aMid + 0.3 * aFine) * (1.0 - smoothstep(0.1, 0.5, aCurve));
aRock = mix(aRock, ${glslColor(o.scree)} * (0.8 + 0.4 * aFine), aScree * 0.75);
float aForest = (1.0 - smoothstep(${f(o.treeLine - 4)}, ${f(o.treeLine + 4)}, ap.y + aBroad * 8.0)) * (1.0 - smoothstep(0.42, 0.62, aSlope + aBroad * 0.2));
vec3 aColor = mix(aRock, ${glslColor(o.forest)} * (0.6 + 0.5 * smoothstep(-0.3, 0.6, aFine)), aForest);
// Snow lies on the upper faces where the slope lets it, and reaches far below the line in the couloirs.
float aLine = ap.y + aBroad * 9.0 + aMid * 3.0;
float aUpper = smoothstep(${f(o.snowLine - 3)}, ${f(o.snowLine + 3)}, aLine) * (1.0 - smoothstep(0.52, 0.74, aSlope - aCurve * 0.4));
float aCouloir = smoothstep(0.12, 0.5, aCurve) * smoothstep(${f(o.snowLine - 22)}, ${f(o.snowLine - 4)}, aLine) * (1.0 - smoothstep(0.8, 0.94, aSlope));
float aSnow = smoothstep(0.3, 0.62, clamp(aUpper + aCouloir, 0.0, 1.0) + (aFine - 0.1) * 0.35) * (1.0 - aForest * 0.85);
aColor = mix(aColor, ${glslColor(o.snow ?? '#dfe6ef')} * (0.86 + 0.14 * aMid), aSnow);
diffuseColor.rgb *= aColor;
`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor, 0.55, aSnow);
`)
      // Moonlit snow is the brightest thing in a night range: the far terrain takes the
      // moon at a photographic gain, and snow gathers more of the sky's light.
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
reflectedLight.directDiffuse *= ${f(o.moonGain ?? 1)};
reflectedLight.indirectDiffuse *= 1.0 + ${f(o.skyGain ?? 0)} * aSnow;
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  float h = aMid * 1.3 + (aFine * 0.6 + aStrata * 0.5) * (1.0 - aSnow * 0.8) + aBroad * 1.6;
  normal = nightBump(-vViewPosition, normal, h, ${f(o.bump ?? 1)} * 0.4);
}
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|night-alpine-v1|${o.key}`;
  return material;
}
