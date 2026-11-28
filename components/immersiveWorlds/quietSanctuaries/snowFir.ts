import * as THREE from 'three';
import { noise3, seeded } from '../shared/render/noise';
import { withSharedGlsl } from '../shared/render/translucentSurface';

/*
 * Snow-laden firs for the winter village (original, code-only).
 * Each tree is a stack of drooping branch tiers around a tapering trunk. A tier is a
 * star of branches (lobes) with real needle-mass thickness: an upper skin that rises
 * from the trunk and droops toward the tips, carrying a soft modelled load of snow
 * that is thickest near the trunk and on each branch's spine, and a darker lower skin.
 * The shader adds needle streaks along the branches, a ragged needle edge at the tips
 * (cut-out, so silhouettes never read as cones) and blends snow by the baked `snow`
 * weight, the world normal and a lumpy noise edge. Instancing-aware.
 */

export interface SnowFirOptions {
  seed: number;
  height: number;
  /** Radius of the lowest tier. */
  radius: number;
  tiers: number;
  /** Angular segments per tier and radial rings per skin (detail). */
  sectors: number;
  rings: number;
  /** 0..1 snow load. */
  snow?: number;
}

/** One tree at the origin, base at y = 0. Attributes: position, normal, uv (around, out), snow, needle. */
export function snowFirGeometry(o: SnowFirOptions) {
  const random = seeded(o.seed * 977 + 13);
  const positions: number[] = [], uvs: number[] = [], snow: number[] = [], needle: number[] = [], indices: number[] = [];
  const load = o.snow ?? 1;
  const lean = (random() - .5) * .04 * o.height;
  const axisX = (y: number) => lean * (y / o.height) ** 2;
  const vertex = (x: number, y: number, z: number, u: number, v: number, s: number, n: number) => {
    positions.push(x + axisX(y), y, z); uvs.push(u, v); snow.push(s); needle.push(n);
    return positions.length / 3 - 1;
  };
  // Trunk: a few tapering sides, mostly hidden by the tiers.
  {
    const sides = 6, base = positions.length / 3;
    const r0 = o.height * .025;
    for (let k = 0; k <= 1; k++) for (let i = 0; i <= sides; i++) {
      const a = i / sides * Math.PI * 2, r = r0 * (1 - k * .85), y = k * o.height * .92;
      vertex(Math.cos(a) * r, y, Math.sin(a) * r, i / sides, k, 0, 0);
    }
    for (let i = 0; i < sides; i++) { const a = base + i, b = a + sides + 1; indices.push(a, b, a + 1, a + 1, b, b + 1); }
  }
  for (let t = 0; t < o.tiers; t++) {
    const q = t / (o.tiers - 1);
    const y0 = o.height * (.1 + .84 * q ** .92);
    const R = o.radius * Math.pow(1 - q, .9) * (.88 + random() * .24) + .12;
    const lobes = 6 + Math.floor(random() * 3), offset = random() * Math.PI * 2;
    const rise = .2 * R, droop = (.42 + random() * .12) * R, mass = .16 * R + .03;
    const snowDepth = .09 * R * load * (.75 + random() * .5);
    const NA = o.sectors, NR = o.rings;
    const lobe = (a: number) => Math.pow(.5 + .5 * Math.cos(a * lobes + offset), 1.4);
    const radiusAt = (a: number) => R * (.55 + .45 * lobe(a)) * (1 + .1 * noise3(Math.cos(a) * 2 + t, Math.sin(a) * 2, o.seed));
    // Upper skin (with its snow load), then lower skin; rows over s, columns around.
    const grid = (upper: boolean) => {
      const start = positions.length / 3;
      for (let j = 0; j <= NR; j++) for (let i = 0; i <= NA; i++) {
        const s = j / NR, a = i / NA * Math.PI * 2;
        const ra = radiusAt(a), f = lobe(a);
        const r = .05 + (ra - .05) * s;
        let y = y0 + rise * (1 - s) - droop * s * s * (.55 + .45 * f) + noise3(a * 3 + t, s * 2, o.seed) * .04 * R;
        let weight = 0;
        if (upper) {
          // Snow heaped along each branch spine, thickest near the trunk, thin at the drooping tips.
          const heap = snowDepth * (1 - Math.pow(s, 1.6)) * (.35 + .65 * f);
          y += heap;
          weight = load * (1 - .55 * s * s) * (.45 + .55 * f);
        } else {
          y -= mass * (1 - s) + .02;
        }
        vertex(Math.cos(a) * r, y, Math.sin(a) * r, i / NA, s, weight, upper ? 1 : 2);
      }
      for (let j = 0; j < NR; j++) for (let i = 0; i < NA; i++) {
        const a = start + j * (NA + 1) + i, b = a + NA + 1;
        // Upper skin faces up (snow reads the normal), lower skin faces down.
        if (upper) indices.push(a, a + 1, b, a + 1, b + 1, b); else indices.push(a, b, a + 1, a + 1, b, b + 1);
      }
      return start;
    };
    const top = grid(true), bottom = grid(false);
    // Close the tips between the skins.
    for (let i = 0; i < NA; i++) {
      const a = top + NR * (NA + 1) + i, b = bottom + NR * (NA + 1) + i;
      indices.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('snow', new THREE.Float32BufferAttribute(snow, 1));
  geometry.setAttribute('needle', new THREE.Float32BufferAttribute(needle, 1));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** Needles, bark and snow in one material (vertex attributes choose which). */
export function createSnowFirMaterial(key: string) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .86, metalness: 0, side: THREE.DoubleSide });
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
attribute float snow;
attribute float needle;
varying float vFirSnow;
varying float vFirNeedle;
varying vec2 vFirUv;
varying vec3 vFirWorld;
varying vec3 vFirNormal;`)
      .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
{
  vec4 firLocal = vec4(transformed, 1.0);
  vec3 firN = objectNormal;
  #ifdef USE_INSTANCING
    firLocal = instanceMatrix * firLocal;
    firN = mat3(instanceMatrix) * firN;
  #endif
  vFirWorld = (modelMatrix * firLocal).xyz;
  vFirNormal = normalize(mat3(modelMatrix) * firN);
  vFirSnow = snow;
  vFirNeedle = needle;
  vFirUv = uv;
}`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying float vFirSnow;
varying float vFirNeedle;
varying vec2 vFirUv;
varying vec3 vFirWorld;
varying vec3 vFirNormal;
${withSharedGlsl(shader.fragmentShader)}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float firSnow = 0.0;
float firStreak = 0.0;
{
  vec3 wp = vFirWorld;
  float fine = clamp(1.4 - length(fwidth(wp)) * 14.0, 0.0, 1.0);
  // Needles: streaks along the branches (around = u, outward = v), broken into tufts.
  firStreak = bwNoise(vec3(vFirUv.x * 90.0, vFirUv.y * 9.0, wp.y * 2.0)) * .5 + .5;
  float tuft = bwNoise(wp * 5.0) * .5 + .5;
  // A ragged needle edge at the tips instead of a clean star outline.
  if (vFirNeedle > .5 && vFirUv.y > .78 && bwNoise(vec3(vFirUv.x * 140.0, vFirUv.y * 30.0, wp.y)) * .5 + .5 < (vFirUv.y - .78) * 3.2 * mix(.6, 1.0, fine)) discard;
  vec3 needles = mix(vec3(.028, .05, .04), vec3(.06, .095, .068), firStreak * tuft) * (vFirNeedle > 1.5 ? .55 : 1.0);
  vec3 bark = vec3(.07, .05, .04);
  vec3 base = vFirNeedle > .5 ? needles : bark;
  // Snow: the baked load, kept on upward faces, with a lumpy, crumbly edge.
  float up = normalize(vFirNormal).y;
  float edge = bwNoise(wp * 3.1) * .25 + bwNoise(wp * 9.0) * .12 * fine;
  firSnow = smoothstep(.25, .55, vFirSnow + edge) * smoothstep(-.05, .35, up + edge);
  diffuseColor.rgb = mix(base, vec3(.86, .9, .96) * (.92 + .08 * bwNoise(wp * 13.0)), firSnow);
}
`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(.9, .72, firSnow);
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = bwSurfaceBump(-vViewPosition, normal, (firStreak * .006) * (1.0 - firSnow) + bwNoise(vFirWorld * 6.0) * .004 * firSnow, 1.0);
`)
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
// Snow in shade scatters blue; the needle mass under it stays dark.
reflectedLight.indirectDiffuse *= mix(vec3(.75, .85, .8), vec3(.8, .88, 1.05), firSnow);
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|snow-fir-v1|${key}`;
  return material;
}
