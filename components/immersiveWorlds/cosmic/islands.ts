import * as THREE from 'three';
import { fbm3, noise3, ridged3, seeded } from '../shared/render/noise';
import { buildTree } from '../shared/render/treeGeometry';
import { boulderGeometry } from '../shared/render/rockGeometry';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { applyBarkSurface } from '../shared/render/barkSurface';
import {
  VegetationBuffer, addGrass, addLeafCluster, addStrand, addVine,
  type VegetationMaterials,
} from './vegetation';
import { growGlowPlanting, type GlowKind } from './glowFlora';

/*
 * Floating landmasses for the cosmic garden (original implementation).
 *
 * Each island is one welded mass with three readable bands, top to bottom:
 *  - a domed turf cap with a rounded, slightly overhanging soil shoulder,
 *  - a cliff of sediment strata: every layer has its own hardness, so hard
 *    beds stand out as ledges over recessed soft beds; vertical runnels and
 *    a stain palette (ochre, buff, grey, rust, thin dark seams) per layer,
 *  - an eroded underside that splits into several hanging crags.
 * Vertex colours carry the strata, moss on ledges and the damp, darker
 * underside; a small object-space shader adds grain, laminations and a
 * derivative bump that moves with the island (no texture swimming as it bobs).
 * The cap carries a grass carpet that follows the terrain, with a fringe that
 * spills over the shoulder, shrubs, sometimes a small tree, hanging roots
 * under the soil and vines down the cliffs. Waterfalls leave the lip on a
 * ballistic arc, fray into strands and dissolve into spray and mist.
 * Islands bob on their own two incommensurate rhythms and rock very slightly.
 */

export interface IslandSpec {
  x: number; y: number; z: number;
  scale: number;
  seed: number;
  rotation: number;
  /** Angle (local) of the lip a waterfall leaves from. */
  fall?: number;
  tree?: boolean;
  /** Plant density multiplier (distant islands get fewer blades). */
  detail?: number;
}

export interface FloatingIsland {
  group: THREE.Group;
  spec: IslandSpec;
  /** Local position under the island where its fall dissolves into mist. */
  mist: THREE.Vector3 | null;
}

const TAU = Math.PI * 2;
const smooth = (a: number, b: number, x: number) => { const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const hash = (n: number) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

// Sediment palette (linear albedo): ochre, buff, cool grey, rust, umber.
const STRATA = [
  new THREE.Color(.30, .21, .13), new THREE.Color(.38, .32, .24), new THREE.Color(.25, .24, .23),
  new THREE.Color(.33, .19, .11), new THREE.Color(.35, .29, .21), new THREE.Color(.20, .17, .14),
];
const SOIL = new THREE.Color(.075, .052, .034);
const TURF = new THREE.Color(.040, .062, .026);
const MOSS = new THREE.Color(.075, .115, .040);
const DAMP = new THREE.Color(.10, .11, .09);

interface IslandMass {
  geometry: THREE.BufferGeometry;
  /** Cap height at a local (x, z), or null outside the outline. */
  heightAt(x: number, z: number): number | null;
  /** Outline radius at an angle. */
  outlineAt(angle: number): number;
  /** Point and outward normal on the side wall at angle and depth fraction t (0 lip .. 1 tip). */
  wall(angle: number, t: number): { point: THREE.Vector3; normal: THREE.Vector3 };
  /** Rock outcrops breaking through the turf (centre and footprint radius). */
  outcrops: { x: number; z: number; r: number }[];
}

/** The welded rock mass of one island in local units (radius ~R, depth ~D). */
function buildMass(seed: number, R: number, D: number, detail = 1): IslandMass {
  // Distant islands need fewer rings; their silhouettes are a few hundred pixels.
  const segments = detail < .7 ? 96 : 120, capRings = 13, sideRings = detail < .7 ? 36 : 46;
  const outline = new Float32Array(segments);
  for (let i = 0; i < segments; i++) {
    const a = i / segments * TAU, c = Math.cos(a), s = Math.sin(a);
    outline[i] = R * (1 + .19 * fbm3(c * 1.1 + seed * .37, s * 1.1, seed * .11, 3) + .05 * noise3(c * 4.1, s * 4.1, seed + 2.3));
  }
  const outlineAt = (angle: number) => {
    const u = ((angle / TAU) % 1 + 1) % 1 * segments;
    const i = Math.floor(u) % segments, f = u - Math.floor(u);
    return THREE.MathUtils.lerp(outline[i], outline[(i + 1) % segments], f);
  };
  const dome = R * .07;
  // A rolling cap: a broad rise to one side, hummocks and a shallow hollow.
  const hillAngle = seed * 2.39, hx = Math.cos(hillAngle) * R * .35, hz = Math.sin(hillAngle) * R * .35;
  // The lip itself rises and dips around the island, so the edge never reads as a plate.
  const rimLift = (a: number) => R * .10 * fbm3(Math.cos(a) * 1.3 + seed * .7, Math.sin(a) * 1.3, 4.4, 3);
  const capY = (x: number, z: number, s: number) =>
    rimLift(Math.atan2(z, x)) * smooth(.45, 1, s)
    + dome * (1 - s * s) + fbm3(x * .32 + seed, 1.7, z * .32, 3) * .30 + noise3(x * 1.7, 3.1, z * 1.7) * .03
    + R * .11 * Math.exp(-((x - hx) ** 2 + (z - hz) ** 2) / (R * R * .22))
    // A rounded soil shoulder instead of a knife edge.
    - Math.pow(smooth(.84, 1, s), 2) * R * .055;
  // Side profile: soil shoulder, stepped strata cliff, crag-split underside.
  const SOIL_T = .05, CLIFF_T = .44;
  const side = (a: number, t: number) => {
    const c = Math.cos(a), s = Math.sin(a);
    const lobe = fbm3(c * .9 + seed * .21, s * .9, seed * .5, 3);
    let r = outlineAt(a);
    let y = rimLift(a) * (1 - smooth(0, .35, t)) - R * .055 - t * D * (1 + .2 * lobe + .08 * noise3(c * 1.3, seed, s * 1.3));
    if (t < SOIL_T) {
      // Overhanging turf and soil, bulging a little over the rock below.
      r *= 1 + .035 * Math.sin(t / SOIL_T * Math.PI) - .02 * t / SOIL_T;
    } else if (t < CLIFF_T) {
      const k = (t - SOIL_T) / (CLIFF_T - SOIL_T);
      const layer = k * 7.5 + .45 * noise3(c * 1.4, s * 1.4, seed * .7) + .25 * lobe;
      const bed = Math.floor(layer), u = layer - bed;
      const hardness = .55 + .9 * hash(bed + seed * 13.1);
      // Hard beds hold a ledge, soft beds beneath them erode back.
      const recess = .10 * hardness * smooth(.12, .78, u) - .025 * hardness;
      // Buttresses and bays: the wall bulges and recedes with angle and depth.
      const buttress = .13 * noise3(c * 2.2 + seed, k * 1.6, s * 2.2) + .07 * noise3(c * 5.1, k * 3.0 + seed, s * 5.1);
      r *= (1 - .02 - .24 * k * (.7 + .6 * (lobe + .5))) * (1 - recess) * (1 + buttress * smooth(0, .25, k));
    } else {
      const k = (t - CLIFF_T) / (1 - CLIFF_T);
      const buttressEnd = .13 * noise3(c * 2.2 + seed, 1.6, s * 2.2) + .07 * noise3(c * 5.1, 3.0 + seed, s * 5.1);
      const top = (1 - .02 - .24 * (.7 + .6 * (lobe + .5))) * (1 + .025) * (1 + buttressEnd);
      // Star-shaped cross-section: three to five crags hang below the mass.
      const crag = ridged3(c * 1.15 + seed * .31, s * 1.15, seed * .9, 2);
      const lobes = .5 + .5 * Math.cos(a * (3 + (seed % 3)) + seed + 1.3 * noise3(c, s, seed));
      const spread = THREE.MathUtils.clamp(.25 + crag * .55 + lobes * .45, 0, 1.2);
      const taper = Math.pow(Math.max(0, 1 - k), .62 + .55 * (1 - spread));
      r *= top * taper * (1 - .3 * k * (1 - spread));
      y -= Math.pow(k, 1.8) * D * .42 * (spread - .45);
    }
    // Vertical runnels cut by water draining off the cap.
    const groove = 1 - .17 * Math.pow(ridged3(c * 3.1 + seed, t * 1.4, s * 3.1, 3), 1.6) * smooth(.03, .25, t);
    r *= groove;
    let x = c * r, z = s * r;
    const amplitude = .16 * R / 3 * (.35 + t);
    x += fbm3(x * .45 + seed, y * .45, z * .45, 3) * amplitude;
    z += fbm3(x * .45, y * .45 + 7.1, z * .45 + seed, 3) * amplitude;
    y += noise3(x * .8, y * .8, z * .8 + seed) * .1 * R / 3 * Math.min(1, t * 6);
    return new THREE.Vector3(x, y, z);
  };

  const positions: number[] = [], tValues: number[] = [], indices: number[] = [];
  const push = (p: THREE.Vector3, t: number) => { positions.push(p.x, p.y, p.z); tValues.push(t); return positions.length / 3 - 1; };
  const rows: number[] = [];
  const centre = push(new THREE.Vector3(0, capY(0, 0, 0), 0), -1);
  for (let k = 1; k <= capRings; k++) {
    const s = Math.pow(k / capRings, .85);
    rows.push(positions.length / 3);
    for (let i = 0; i < segments; i++) {
      const a = i / segments * TAU;
      const x = Math.cos(a) * outline[i] * s, z = Math.sin(a) * outline[i] * s;
      push(new THREE.Vector3(x, capY(x, z, s), z), -1 + s);
    }
  }
  for (let j = 1; j < sideRings; j++) {
    // Denser rows near the lip, where strata ledges need resolution.
    const t = Math.pow(j / sideRings, 1.25);
    rows.push(positions.length / 3);
    for (let i = 0; i < segments; i++) push(side(i / segments * TAU, t), t);
  }
  const tip = push(new THREE.Vector3(fbm3(seed, 0, 0, 2) * R * .12, -R * .055 - D * 1.05, fbm3(0, seed, 0, 2) * R * .12), 1);
  const next = (i: number) => (i + 1) % segments;
  for (let i = 0; i < segments; i++) indices.push(centre, rows[0] + next(i), rows[0] + i);
  for (let row = 0; row < rows.length - 1; row++) {
    for (let i = 0; i < segments; i++) {
      const a = rows[row] + i, b = rows[row] + next(i), c = rows[row + 1] + i, d = rows[row + 1] + next(i);
      indices.push(a, b, c, b, d, c);
    }
  }
  const last = rows[rows.length - 1];
  for (let i = 0; i < segments; i++) indices.push(last + i, last + next(i), tip);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  // Vertex colours and the moss mask.
  const count = positions.length / 3;
  const colors = new Float32Array(count * 3), moss = new Float32Array(count), strata = new Float32Array(count);
  const normals = geometry.getAttribute('normal');
  const color = new THREE.Color();
  for (let v = 0; v < count; v++) {
    const x = positions[v * 3], y = positions[v * 3 + 1], z = positions[v * 3 + 2];
    const t = tValues[v], ny = normals.getY(v);
    const n = noise3(x * .9, y * .9, z * .9 + seed);
    let mossAmount = 0;
    if (t < 0) {
      color.copy(TURF).multiplyScalar(.85 + .3 * n);
      mossAmount = 1;
    } else if (t < SOIL_T + .015) {
      color.copy(SOIL).lerp(TURF, smooth(.008, 0, t) * .6).multiplyScalar(.85 + .35 * n);
      mossAmount = smooth(.012, 0, t) * .7;
    } else {
      // The strata palette itself is applied per pixel (crisp beds); the
      // vertex colour carries tint and occlusion only.
      color.setRGB(1, 1, 1).multiplyScalar(.85 + .25 * n);
      strata[v] = 1;
      // Moss on ledges and upward-facing steps; the cliff top stays greener.
      mossAmount = THREE.MathUtils.clamp(smooth(.35, .75, ny + .25 * n) * (1 - smooth(.35, .7, t)) + smooth(.16, .07, t) * .55, 0, 1);
      // The underside is damp, darker and greener; the deepest crags are dim.
      const under = smooth(CLIFF_T - .05, .9, t);
      color.lerp(DAMP, under * .55);
      color.multiplyScalar(1 - .45 * under * smooth(-.2, -.9, ny));
    }
    colors[v * 3] = color.r; colors[v * 3 + 1] = color.g; colors[v * 3 + 2] = color.b;
    moss[v] = mossAmount;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aMoss', new THREE.BufferAttribute(moss, 1));
  geometry.setAttribute('aStrata', new THREE.BufferAttribute(strata, 1));

  // Two or three rock outcrops break through the turf, in the same strata.
  const outcrops: { x: number; z: number; r: number }[] = [];
  const parts: THREE.BufferGeometry[] = [geometry];
  const pick = seeded(seed * 53 + 1);
  const outcropCount = 2 + Math.floor(pick() * 2);
  const matrix = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  for (let k = 0; k < outcropCount; k++) {
    const a = pick() * TAU, rr = .3 + pick() * .5;
    const x = Math.cos(a) * rr * outlineAt(a), z = Math.sin(a) * rr * outlineAt(a);
    const size = new THREE.Vector3(.32 + pick() * .35, .16 + pick() * .2, .3 + pick() * .3).multiplyScalar(R / 3);
    const boulder = boulderGeometry(seed * 10 + k, 2);
    e.set((pick() - .5) * .5, pick() * TAU, (pick() - .5) * .5);
    matrix.compose(new THREE.Vector3(x, capY(x, z, rr) - size.y * .1, z), q.setFromEuler(e), size);
    boulder.applyMatrix4(matrix);
    const n = boulder.getAttribute('normal');
    const vc = new Float32Array(n.count * 3).fill(.6), vm = new Float32Array(n.count), vs = new Float32Array(n.count).fill(1);
    for (let i = 0; i < n.count; i++) vm[i] = smooth(.2, .7, n.getY(i));
    boulder.setAttribute('color', new THREE.BufferAttribute(vc, 3));
    boulder.setAttribute('aMoss', new THREE.BufferAttribute(vm, 1));
    boulder.setAttribute('aStrata', new THREE.BufferAttribute(vs, 1));
    parts.push(boulder);
    outcrops.push({ x, z, r: Math.max(size.x, size.z) * .8 });
  }
  const merged = mergeGeometries(parts);
  parts.forEach(part => part.dispose());
  merged.computeBoundingSphere();

  return {
    geometry: merged,
    outcrops,
    outlineAt,
    heightAt(x, z) {
      const angle = Math.atan2(z, x);
      const s = Math.hypot(x, z) / outlineAt(angle);
      return s > 1 ? null : capY(x, z, s);
    },
    wall(angle, t) {
      const p = side(angle, t);
      const e = .01;
      const pa = side(angle + e, t), pt = side(angle, Math.min(1, t + e));
      const normal = new THREE.Vector3().crossVectors(pa.sub(p), pt.sub(p)).normalize();
      if (normal.x * p.x + normal.z * p.z < 0) normal.negate();
      return { point: p, normal };
    },
  };
}

/** Object-space rock shading for the island masses: grain, laminations, moss, derivative bump. */
function islandRockMaterial(noise: THREE.Data3DTexture) {
  const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .9, metalness: 0 });
  material.name = 'Cosmic island rock';
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uIslandNoise = { value: noise };
    shader.uniforms.uStrata = { value: STRATA };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
attribute float aMoss;
attribute float aStrata;
varying vec3 vIslandLocal;
varying float vIslandMoss;
varying float vIslandUp;
varying float vIslandStrata;
varying float vIslandSeed;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
vIslandLocal = position;
vIslandMoss = aMoss;
vIslandUp = normal.y;
vIslandStrata = aStrata;
vIslandSeed = fract(modelMatrix[3].z * .1371) * 50.0;`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
precision highp sampler3D;
uniform sampler3D uIslandNoise;
varying vec3 vIslandLocal;
varying float vIslandMoss;
varying float vIslandUp;
varying float vIslandStrata;
varying float vIslandSeed;
uniform vec3 uStrata[6];
float islandHeight = 0.0;
float islandMossMask = 0.0;
float islandHash(float n) { return fract(sin(n * 12.9898 + 4.1414) * 43758.5453); }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 p = vIslandLocal;
  vec4 broad = texture(uIslandNoise, p * .085 + .31);
  vec4 mid = texture(uIslandNoise, p * .29 + .67);
  vec4 fine = texture(uIslandNoise, p * .93 + .13);
  // Sediment beds: about nine per cliff, gently tilted and warped, each with
  // its own mineral colour and a thin dark seam at its base.
  float layer = -p.y * 2.15 + (broad.r - .5) * .55 + (mid.g - .5) * .16 + p.x * .06 - p.z * .03 + vIslandSeed;
  float bed = floor(layer), bedU = layer - bed;
  int pick = int(islandHash(bed + vIslandSeed) * 5.999);
  vec3 bedColor = uStrata[0];
  for (int k = 1; k < 6; k++) if (k == pick) bedColor = uStrata[k];
  bedColor *= .82 + .32 * islandHash(bed * 1.73 + 9.0 + vIslandSeed);
  bedColor *= mix(.62, 1.0, smoothstep(0.0, .03, bedU) * smoothstep(1.0, .965, bedU));
  bedColor *= .92 + .12 * bedU;
  diffuseColor.rgb *= mix(vec3(1.0), bedColor, vIslandStrata);
  // Thin laminations within each bed, bent by the broad noise.
  float lam = sin(layer * 6.2831 * 4.0 + mid.b * 3.0);
  float side = 1.0 - smoothstep(.55, .85, abs(vIslandUp));
  diffuseColor.rgb *= .80 + .30 * broad.g + .16 * mid.b + .10 * fine.r;
  diffuseColor.rgb *= 1.0 - .08 * side * smoothstep(.4, 1.0, lam) * vIslandStrata;
  // Pale mineral streaks run down the cliff from seeps.
  float seep = smoothstep(.70, .86, texture(uIslandNoise, vec3(p.x * .21, p.y * .018, p.z * .21) + .45).a);
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.46, .44, .40), seep * side * .35);
  islandMossMask = smoothstep(.42, .62, vIslandMoss + (mid.r - .5) * .55 + (fine.g - .5) * .2);
  vec3 mossColor = vec3(.055, .095, .030) * (.75 + .5 * mid.a + .3 * fine.b);
  diffuseColor.rgb = mix(diffuseColor.rgb, mossColor, islandMossMask * (vIslandMoss > .99 ? 0.0 : 1.0));
  islandHeight = mid.r * .55 + fine.g * .35 + fine.a * .12 + side * (smoothstep(.6, 1.0, lam) * .04 + (1.0 - smoothstep(0.0, .06, bedU)) * .12) * vIslandStrata - islandMossMask * .1;
}`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(.86, .97, islandMossMask);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  // Derivative bump (screen-space gradients of an object-space height).
  vec3 dpdx = dFdx(-vViewPosition), dpdy = dFdy(-vViewPosition);
  float dhdx = dFdx(islandHeight), dhdy = dFdy(islandHeight);
  vec3 r1 = cross(dpdy, normal), r2 = cross(normal, dpdx);
  float det = dot(dpdx, r1);
  vec3 grad = sign(det) * (dhdx * r1 + dhdy * r2);
  normal = normalize(abs(det) * normal - grad * .06);
}`);
  };
  material.customProgramCacheKey = () => 'cosmic-island-rock-v2';
  return material;
}

/** A waterfall ribbon on a ballistic arc, facing the viewer, plus its spray. */
function waterfallGeometry(start: THREE.Vector3, outward: THREE.Vector3, across: THREE.Vector3, width: number, length: number) {
  const rows = 40, columns = 4;
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  const p = new THREE.Vector3();
  for (let k = 0; k <= rows; k++) {
    const v = k / rows;
    // Water leaves the lip with a little forward speed and falls under gravity.
    const drop = v * length;
    const out = .10 + .55 * Math.sqrt(drop / length) * Math.min(1, length / 4);
    const w = width * (1 + .25 * Math.sqrt(v) + 1.9 * v * v);
    for (let c = 0; c <= columns; c++) {
      const u = c / columns;
      p.copy(start).addScaledVector(outward, out).addScaledVector(across, (u - .5) * w);
      p.y -= drop;
      positions.push(p.x, p.y, p.z); uvs.push(u, v);
    }
    if (k < rows) for (let c = 0; c < columns; c++) {
      const a = k * (columns + 1) + c, b = a + columns + 1;
      indices.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

const WATERFALL_VERTEX = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorld;
void main() {
  vUv = uv;
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const WATERFALL_FRAGMENT = /* glsl */ `
precision highp sampler3D;
uniform sampler3D uNoise;
uniform float uTime;
uniform float uSeed;
uniform vec3 uLight;
uniform vec3 uSky;
varying vec2 vUv;
varying vec3 vWorld;
void main() {
  float across = abs(vUv.x - .5) * 2.0;
  float v = vUv.y;
  // Slow fall: threads drift down at a calm pace and stretch as they
  // accelerate. Noise is long along the fall and narrow across it.
  float flow = v * (1.0 + .6 * v);
  float t = uTime * .045;
  float body = dot(texture(uNoise, vec3(vUv.x * .15 + uSeed, flow * .05 - t * .8, uSeed * .37)), vec4(.5, .3, .2, 0.0));
  float threadA = texture(uNoise, vec3(vUv.x * .32 + uSeed, flow * .07 - t, .5)).g;
  float threadB = texture(uNoise, vec3(vUv.x * .61 + uSeed * 2.0, flow * .12 - t * 1.6, .17)).r;
  float strands = smoothstep(.42, .72, threadA * .6 + threadB * .4);
  float fine = texture(uNoise, vec3(vUv.x * 1.1 + uSeed, flow * .25 - t * 2.2, .21)).r;
  // The sheet frays from the edges inward as it falls, then breaks into spray.
  float edge = 1.0 - smoothstep(.30 + .35 * (1.0 - v) - .25 * v, 1.0, across + (body - .5) * .5 * v);
  float breakup = smoothstep(.25 + .55 * v, .9, body * .6 + strands * .4 + fine * .2);
  float start = smoothstep(0.0, .035, v);
  float end = 1.0 - smoothstep(.45, .98, v + (fine - .5) * .25);
  float alpha = edge * start * end * mix(.30 + .45 * strands + .15 * fine, breakup * (.5 + .5 * strands), smoothstep(.15, .7, v)) * .7;
  // White water at the lip, aerated threads lit by the star and the sky.
  float foam = smoothstep(.08, 0.0, v) * .8 + strands * .7 + fine * .25;
  vec3 color = uLight * (.30 + .9 * foam) + uSky * (.6 + .4 * body);
  gl_FragColor = vec4(color * alpha, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const SPRAY_VERTEX = /* glsl */ `
attribute vec4 aSpray; // phase, speed, spread, size
uniform float uTime;
uniform float uLength;
uniform float uPixelRatio;
varying float vAlpha;
void main() {
  float life = fract(uTime * aSpray.y * .045 + aSpray.x);
  vec3 p = position;
  // Droplets and spray drift down slowly and billow outward as they fall.
  p.y -= life * uLength * .45;
  p.xz *= 1.0 + life * aSpray.z * 2.2;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  vAlpha = smoothstep(0.0, .15, life) * (1.0 - smoothstep(.5, 1.0, life));
  gl_PointSize = clamp(aSpray.w * uPixelRatio * (1.0 + life * 2.5) * 18.0 / -mv.z, 1.0, 22.0 * uPixelRatio);
}
`;

const SPRAY_FRAGMENT = /* glsl */ `
uniform vec3 uLight;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - .5) * 2.0;
  float a = exp(-d * d * 3.0) * (1.0 - smoothstep(.8, 1.0, d)) * vAlpha * .26;
  gl_FragColor = vec4(uLight * a, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export interface IslandSetOptions {
  noise: THREE.Data3DTexture;
  vegetation: VegetationMaterials;
  time: { value: number };
  /** Key light radiance for the water (already divided by pi). */
  sunLight: THREE.Vector3;
  /** Viewer position in the parent's space (waterfalls face it). */
  viewpoint: THREE.Vector3;
  /** Layer for details the pond reflection can skip. */
  detailLayer: number;
}

export function createIslandSet(specs: IslandSpec[], options: IslandSetOptions) {
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const rock = islandRockMaterial(options.noise); materials.push(rock);
  const bark = applyBarkSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .9 }), {
    key: 'cosmic-island-bark', scale: 2.2, stretch: 4, depth: .02, plate: '#5d5246', fissure: '#1d1814',
    moss: { color: '#3e5528', amount: .45, up: .6 },
  });
  materials.push(bark);
  const islands: FloatingIsland[] = [];
  const sprays: { material: THREE.ShaderMaterial }[] = [];
  const skyTint = new THREE.Vector3(.010, .014, .022);

  for (const spec of specs) {
    const group = new THREE.Group();
    group.name = 'cosmic-floating-island';
    group.position.set(spec.x, spec.y, spec.z);
    group.scale.setScalar(spec.scale);
    group.rotation.y = spec.rotation;
    const R = 3.0, D = 4.3;
    const random = seeded(spec.seed * 977 + 13);
    const detail = spec.detail ?? 1;
    const mass = buildMass(spec.seed, R, D, detail);
    geometries.push(mass.geometry);
    const rockMesh = new THREE.Mesh(mass.geometry, rock);
    rockMesh.name = 'cosmic-island-mass'; rockMesh.castShadow = true; rockMesh.receiveShadow = true;
    group.add(rockMesh);

    const foliage = new VegetationBuffer();
    const wood = new VegetationBuffer();
    // Grass carpet over the cap, thinning in a few bare, mossy patches.
    const cap = (u: number, v: number) => {
      const angle = u * TAU, rr = Math.sqrt(v) * .985;
      const x = Math.cos(angle) * rr * mass.outlineAt(angle), z = Math.sin(angle) * rr * mass.outlineAt(angle);
      const y = mass.heightAt(x, z);
      if (y === null || mass.outcrops.some(o => (x - o.x) ** 2 + (z - o.z) ** 2 < o.r * o.r)) return null;
      // The cap is a gentle dome: its normal leans outward toward the shoulder.
      const lean = .05 + .5 * Math.pow(rr, 6);
      const normal = new THREE.Vector3(Math.cos(angle) * lean, 1, Math.sin(angle) * lean).normalize();
      const patch = fbm3(x * .5 + spec.seed, 1.1, z * .5, 3);
      return { position: new THREE.Vector3(x, y - .015, z), normal, density: THREE.MathUtils.clamp(.9 - patch * 1.3, .15, 1), dry: THREE.MathUtils.clamp(patch * 1.5 + .1, 0, 1) };
    };
    addGrass(foliage, { seed: spec.seed * 31 + 1, count: Math.round(2600 * detail), sample: cap, height: [.10, .30], width: [.025, .045], sway: .035 });
    // The fringe: long blades on the shoulder lean out and droop over the edge.
    addGrass(foliage, {
      seed: spec.seed * 31 + 2, count: Math.round(900 * detail), height: [.28, .7], width: [.03, .055], sway: .06,
      sample: (u, v) => {
        const angle = u * TAU, rr = .95 + .05 * v;
        const r = mass.outlineAt(angle) * rr;
        const x = Math.cos(angle) * r, z = Math.sin(angle) * r;
        const y = mass.heightAt(x, z);
        if (y === null) return null;
        const outward = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
        return { position: new THREE.Vector3(x, y - .02, z), normal: outward.multiplyScalar(.75).add(new THREE.Vector3(0, .55, 0)).normalize() };
      },
      lean: p => new THREE.Vector3(p.x, -1.6 * Math.hypot(p.x, p.z) * .35, p.z).normalize(),
    });
    // Shrubs and ferny clumps scattered over the cap.
    const shrubCount = Math.round((5 + random() * 4) * Math.min(1.2, detail + .2));
    for (let i = 0; i < shrubCount; i++) {
      const angle = random() * TAU, rr = .25 + random() * .62;
      const x = Math.cos(angle) * rr * mass.outlineAt(angle), z = Math.sin(angle) * rr * mass.outlineAt(angle);
      const y = mass.heightAt(x, z) ?? 0;
      const size = .28 + random() * .42;
      addLeafCluster(foliage, {
        seed: spec.seed * 7 + i, centre: new THREE.Vector3(x, y + size * .55, z), radius: new THREE.Vector3(size * 1.15, size * .7, size), leaves: Math.round(90 + size * 180),
        size: [.07, .13], base: new THREE.Color(.028, .055, .022), light: new THREE.Color(.10, .16, .05), sway: .02, flat: .6,
        accent: { color: new THREE.Color(.13, .11, .05), amount: .12 },
      });
    }
    if (spec.tree) {
      // A small wind-shaped tree anchors the island's scale.
      const angle = random() * TAU, rr = .15 + random() * .25;
      const x = Math.cos(angle) * rr * R, z = Math.sin(angle) * rr * R;
      const tree = buildTree({
        seed: spec.seed * 5 + 3, base: new THREE.Vector3(x, (mass.heightAt(x, z) ?? 0) - .08, z), height: 2.9, radius: .12, form: 'broadleaf',
        lean: [.35, -.2], gnarl: 1.1, flare: .7, buttresses: 3, crownStart: .3, limbs: 5, levels: 1, children: 3, spread: .55, curl: .2,
        radial: 6, ringsPerMetre: 2, displace: 0, barkScale: 2.2, barkStretch: 4, leaves: null, flex: .5,
      });
      geometries.push(tree.bark);
      const trunk = new THREE.Mesh(tree.bark, bark); trunk.castShadow = true; trunk.receiveShadow = true; trunk.name = 'cosmic-island-tree';
      group.add(trunk);
      // A full, layered crown: a few large masses fill the envelope, then a
      // clump on every twig tip breaks up its outline.
      const crown = tree.crown;
      for (let k = 0; k < 6; k++) {
        const a = k / 6 * TAU + random() * .6;
        const centre = crown.centre.clone().add(new THREE.Vector3(Math.cos(a) * crown.radius.x * .45, (random() - .35) * crown.radius.y * .6, Math.sin(a) * crown.radius.z * .45));
        const s = Math.max(crown.radius.x, crown.radius.z) * (.55 + random() * .2);
        addLeafCluster(foliage, {
          seed: spec.seed * 211 + k, centre, radius: new THREE.Vector3(s, s * .72, s), leaves: 230, quad: true,
          size: [.16, .26], base: new THREE.Color(.026, .052, .024), light: new THREE.Color(.11, .18, .06), sway: .04, crown: .85, flat: .35,
          accent: { color: new THREE.Color(.17, .20, .10), amount: .18 },
        });
      }
      tree.tips.forEach((tip, i) => {
        const s = .30 + random() * .2;
        addLeafCluster(foliage, {
          seed: spec.seed * 101 + i, centre: tip.clone().add(new THREE.Vector3(0, s * .2, 0)), radius: new THREE.Vector3(s * 1.2, s * .8, s * 1.2), leaves: 70, quad: true,
          size: [.12, .2], base: new THREE.Color(.030, .060, .028), light: new THREE.Color(.13, .20, .07), sway: .05, crown: .8,
          accent: { color: new THREE.Color(.16, .20, .12), amount: .2 },
        });
      });
    }
    // Hanging roots: from the soil band, some hug the cliff, others dangle free.
    const rootCount = Math.round(40 * Math.min(1, detail + .3));
    let clumpAngle = random() * TAU;
    for (let i = 0; i < rootCount; i++) {
      // Roots come in clumps where a plant above reaches the edge.
      if (i % 3 === 0) clumpAngle = random() * TAU;
      const angle = clumpAngle + (random() - .5) * .12;
      const startT = .02 + random() * .04;
      const anchor = mass.wall(angle, startT);
      const hug = random() < .6;
      const length = hug ? .7 + random() * 1.4 : .3 + random() * .8;
      const points: THREE.Vector3[] = [];
      const steps = 6;
      for (let k = 0; k <= steps; k++) {
        const f = k / steps;
        let p: THREE.Vector3;
        if (hug) {
          const w = mass.wall(angle + noise3(i, f * 2, spec.seed) * .05, Math.min(.42, startT + f * length / D));
          p = w.point.addScaledVector(w.normal, .04 + .03 * Math.sin(f * 7 + i));
        } else {
          // Out from under the turf, then down under their own weight, tips curling.
          p = anchor.point.clone().addScaledVector(anchor.normal, .04 + .22 * Math.sin(f * 1.6) - .06 * f * f);
          p.y -= f * f * length * .8 + f * length * .2;
          p.x += noise3(i * 1.7, f * 2.6, spec.seed) * .16 * f;
          p.z += noise3(f * 2.6, i * 1.3, spec.seed) * .16 * f;
        }
        points.push(p);
      }
      addStrand(wood, {
        points, radius: [.018 + random() * .02, .003], sides: 4, segments: 9, sway: hug ? .004 : .03, phase: random() * TAU,
        color: (t, out) => out.setRGB(.085, .062, .042).lerp(new THREE.Color(.05, .07, .035), t * .6).multiplyScalar(.8 + .4 * hash(i + t)),
      });
    }
    // Fine root hairs under the crags.
    for (let i = 0; i < Math.round(10 * detail); i++) {
      const angle = random() * TAU, t = .5 + random() * .35;
      const anchor = mass.wall(angle, t);
      const length = .4 + random() * .9;
      const points = [0, .33, .66, 1].map(f => anchor.point.clone().addScaledVector(anchor.normal, .02 + .08 * f).add(new THREE.Vector3(noise3(i, f, 3) * .1 * f, -f * length, noise3(f, i, 5) * .1 * f)));
      addStrand(wood, { points, radius: [.016, .003], sides: 3, segments: 6, sway: .03, phase: random() * TAU, color: (t2, out) => out.setRGB(.07, .055, .04).multiplyScalar(.9 + .3 * t2) });
    }
    // Vines spill from the lip down the strata.
    const vineCount = Math.round(26 * detail);
    for (let i = 0; i < vineCount; i++) {
      const angle = random() * TAU;
      const r = mass.outlineAt(angle);
      const start = new THREE.Vector3(Math.cos(angle) * r * .99, (mass.heightAt(Math.cos(angle) * r * .97, Math.sin(angle) * r * .97) ?? 0) - .05, Math.sin(angle) * r * .99);
      const outward = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      const length = .8 + random() * 2.6;
      addVine(foliage, {
        seed: spec.seed * 13 + i, start, outward, length, leafSize: .085, sway: .07,
        leafColor: new THREE.Color(.040, .075, .030).lerp(new THREE.Color(.09, .10, .04), random() * .5),
        stemColor: new THREE.Color(.05, .06, .035),
        // Follow the cliff face down (it recedes under the soil shoulder).
        wallDistance: t => -.1 * Math.min(1, t * 3) + .12 * t,
      });
    }
    // A few bioluminescent clumps on the nearer islands tie them to the garden.
    if (detail >= .7) {
      const glowBuffer = new VegetationBuffer(); glowBuffer.glow = [];
      const kinds: GlowKind[] = ['tendrils', 'caps', 'tendrils'];
      kinds.forEach((kind, k) => {
        const angle = random() * TAU, rr = .3 + random() * .55;
        const x = Math.cos(angle) * rr * mass.outlineAt(angle), z = Math.sin(angle) * rr * mass.outlineAt(angle);
        growGlowPlanting(glowBuffer, { kind, x, z, y: (mass.heightAt(x, z) ?? 0) - .02, scale: kind === 'lantern' ? 1.3 : 1.6, seed: spec.seed * 17 + k, hue: [0, 1, 3][Math.floor(random() * 3)] });
      });
      const glowGeometry = glowBuffer.geometry(); geometries.push(glowGeometry);
      const glowMesh = new THREE.Mesh(glowGeometry, options.vegetation.glow);
      glowMesh.name = 'cosmic-island-glow'; glowMesh.layers.set(options.detailLayer);
      group.add(glowMesh);
    }
    const foliageGeometry = foliage.geometry(), woodGeometry = wood.geometry();
    geometries.push(foliageGeometry, woodGeometry);
    const foliageMesh = new THREE.Mesh(foliageGeometry, options.vegetation.foliage);
    foliageMesh.name = 'cosmic-island-vegetation'; foliageMesh.receiveShadow = true;
    foliageMesh.layers.set(options.detailLayer);
    const woodMesh = new THREE.Mesh(woodGeometry, options.vegetation.wood);
    woodMesh.name = 'cosmic-island-roots'; woodMesh.receiveShadow = true;
    woodMesh.layers.set(options.detailLayer);
    group.add(foliageMesh, woodMesh);

    let mist: THREE.Vector3 | null = null;
    if (spec.fall !== undefined) {
      group.updateMatrixWorld(true);
      const angle = spec.fall;
      const r = mass.outlineAt(angle) * .985;
      const start = new THREE.Vector3(Math.cos(angle) * r, (mass.heightAt(Math.cos(angle) * r * .97, Math.sin(angle) * r * .97) ?? 0) - .03, Math.sin(angle) * r);
      const outward = new THREE.Vector3(start.x, 0, start.z).normalize();
      const toViewer = group.worldToLocal(options.viewpoint.clone()).sub(start).setY(0).normalize();
      const across = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), toViewer).normalize();
      const length = 5.2;
      const geometry = waterfallGeometry(start, outward, across, .30, length);
      geometries.push(geometry);
      const seed = spec.seed * .137;
      const material = new THREE.ShaderMaterial({
        uniforms: { uNoise: { value: options.noise }, uTime: options.time, uSeed: { value: seed }, uLight: { value: options.sunLight }, uSky: { value: skyTint } },
        vertexShader: WATERFALL_VERTEX, fragmentShader: WATERFALL_FRAGMENT,
        transparent: true, premultipliedAlpha: true, depthWrite: false, side: THREE.DoubleSide,
      });
      materials.push(material);
      const ribbon = new THREE.Mesh(geometry, material); ribbon.name = 'cosmic-island-waterfall'; ribbon.renderOrder = 3;
      ribbon.layers.set(options.detailLayer); group.add(ribbon);
      // Spray: droplets and mist puffs where the sheet breaks up.
      const sprayCount = 90;
      const sprayPositions: number[] = [], sprayData: number[] = [];
      const centre = start.clone().addScaledVector(outward, .62).add(new THREE.Vector3(0, -length * .5, 0));
      for (let i = 0; i < sprayCount; i++) {
        const a = random() * TAU, rr = Math.sqrt(random()) * .35;
        sprayPositions.push(centre.x + Math.cos(a) * rr, centre.y - random() * length * .25, centre.z + Math.sin(a) * rr);
        sprayData.push(random(), .6 + random() * .8, .3 + random() * .7, 1.5 + random() * 3.5);
      }
      const sprayGeometry = new THREE.BufferGeometry();
      sprayGeometry.setAttribute('position', new THREE.Float32BufferAttribute(sprayPositions, 3));
      sprayGeometry.setAttribute('aSpray', new THREE.Float32BufferAttribute(sprayData, 4));
      sprayGeometry.boundingSphere = new THREE.Sphere(centre.clone().add(new THREE.Vector3(0, -length * .3, 0)), length);
      geometries.push(sprayGeometry);
      const sprayMaterial = new THREE.ShaderMaterial({
        uniforms: { uTime: options.time, uLength: { value: length }, uPixelRatio: { value: 1 }, uLight: { value: options.sunLight.clone().multiplyScalar(.9).add(skyTint.clone().multiplyScalar(6)) } },
        vertexShader: SPRAY_VERTEX, fragmentShader: SPRAY_FRAGMENT,
        transparent: true, premultipliedAlpha: true, depthWrite: false,
      });
      materials.push(sprayMaterial);
      const spray = new THREE.Points(sprayGeometry, sprayMaterial);
      spray.name = 'cosmic-waterfall-spray'; spray.renderOrder = 4; spray.layers.set(options.detailLayer);
      spray.onBeforeRender = renderer => { sprayMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio(); };
      group.add(spray);
      sprays.push({ material: sprayMaterial });
      mist = start.clone().addScaledVector(outward, .7).add(new THREE.Vector3(0, -length * .82, 0));
    }
    islands.push({ group, spec, mist });
  }

  // Each island bobs on two incommensurate rhythms of its own and rocks a hair.
  const motion = specs.map((spec, i) => {
    const r = seeded(spec.seed * 31 + 7);
    return {
      w1: .042 + r() * .03, w2: .097 + r() * .05, p1: r() * TAU, p2: r() * TAU,
      a1: .07 + r() * .05, a2: .025 + r() * .02, tilt: .006 + r() * .006, wt: .031 + r() * .02 + i * .003, pt: r() * TAU,
    };
  });
  let disposed = false;
  return {
    islands,
    update(time: number) {
      islands.forEach(({ group, spec }, i) => {
        const m = motion[i];
        group.position.y = spec.y + Math.sin(time * m.w1 + m.p1) * m.a1 + Math.sin(time * m.w2 + m.p2) * m.a2;
        group.rotation.x = Math.sin(time * m.wt + m.pt) * m.tilt;
        group.rotation.z = Math.cos(time * m.wt * 1.37 + m.pt * .7) * m.tilt * .8;
        group.rotation.y = spec.rotation + Math.sin(time * m.wt * .5 + m.p2) * m.tilt * .6;
      });
    },
    dispose() {
      if (disposed) return; disposed = true;
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
    },
  };
}
