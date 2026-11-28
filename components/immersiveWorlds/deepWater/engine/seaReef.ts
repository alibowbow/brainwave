import * as THREE from 'three';
import { fbm3, ridged3, seeded } from '../../shared/render/noise';
import { GLSL_SURFACE_BUMP } from '../../shared/render/translucentSurface';
import { GLSL_NOISE } from '../../shared/render/glsl';

/*
 * Original reef wall for the deep-sea world. The rock is laid down in beds:
 * each bed bulges out and is undercut beneath, so the face steps back in
 * shelves whose tops catch the light. Solution pockets are carved by a
 * cellular field, vertical joints split the beds, and fine erosion roughens
 * everything. The same function places the life growing on it.
 */

const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const hash2 = (x: number, y: number) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };

/** Distance to the nearest of a jittered set of pocket centres in (y, z), and that pocket's radius. */
function pockets(y: number, z: number) {
  const cy = Math.floor(y / 1.1), cz = Math.floor(z / 1.1);
  let best = 9, radius = 0;
  for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
    const gy = cy + j, gz = cz + i;
    if (hash2(gy, gz + 9) > .62) continue; // not every cell holds a pocket
    const py = (gy + .2 + .6 * hash2(gy, gz)) * 1.1, pz = (gz + .2 + .6 * hash2(gz, gy + 3)) * 1.1;
    const d = Math.hypot((y - py) * 1.35, z - pz);
    const r = .22 + .42 * hash2(gy + 5, gz + 7);
    if (d / r < best) { best = d / r; radius = r; }
  }
  return { d: best, radius };
}

/** Bed frame at a point: beds wander in height and thickness along the wall. */
function bedFrame(y: number, z: number) {
  return {
    warp: fbm3(z * .085, 11.3, y * .05, 3) * 1.3 + Math.sin(z * .21) * .25,
    thick: 1.45 + .4 * fbm3(z * .05, 4.2, y * .03, 2),
  };
}
/** Bed coordinate u at a point: integer at every bed boundary. */
function bedU(y: number, z: number) { const { warp, thick } = bedFrame(y, z); return (y + warp) / thick; }
/** Height of bed coordinate u at z (inverse of bedU). */
export function bedY(u: number, z: number) {
  let y = u * 1.45;
  for (let i = 0; i < 5; i++) { const { warp, thick } = bedFrame(y, z); y = u * thick - warp; }
  return y;
}
/** Each bed rises fast above its undercut, then its face slopes back to the shelf at its top. */
const bedProfile = (f: number, lean: number) => smooth(0, .17, f) * (1 - lean * smooth(.17, .97, f));

/**
 * Vertical joints split every bed into blocks 1.4-3.6 m long. Each block juts
 * its own distance (some beds hardly at all), so the face reads as stacked,
 * fractured slabs rather than a smooth roll; joints open into narrow cracks.
 */
function block(layer: number, z: number) {
  const shift = hash2(layer, 7.7) * 9;
  const length = 1.4 + 2.2 * hash2(layer, 1.3);
  const s = (z + shift) / length, b = Math.floor(s), local = (s - b) * length;
  const flush = hash2(layer, 3.3) < .28 ? .2 : 1;
  const jutOf = (index: number) => flush * (.25 + .85 * hash2(layer * 1.7 + 4, index)) * (.8 + .4 * hash2(layer, 2.5));
  const toNext = length - local, fromLast = local;
  // Blend over 12 cm at each joint so the step is a clean, steep face.
  const edge = Math.min(toNext, fromLast);
  const neighbour = toNext < fromLast ? jutOf(b + 1) : jutOf(b - 1);
  const jut = THREE.MathUtils.lerp(jutOf(b), (jutOf(b) + neighbour) / 2, 1 - smooth(0, .12, edge));
  const crack = (1 - smooth(.0, .09, edge)) * (.18 + .25 * hash2(layer, b));
  return { jut, crack, lean: .3 + .45 * hash2(layer, b + 11) };
}

function wallAt(y: number, z: number, u: number) {
  const layer = Math.floor(u), f = u - layer;
  const buttress = Math.exp(-(((z + 5.5) / 4.5) ** 2)) * 1.42;
  const broad = Math.sin(z * .28 - y * .045) * .4 + fbm3(y * .16, z * .16, 3.1, 4) * .9;
  const { jut, crack, lean } = block(layer, z);
  const p = pockets(y, z);
  const pocket = p.d < 1 ? (1 - p.d * p.d) ** 1.5 * p.radius * 1.1 : 0;
  // Spalled, sharp-crested relief at three scales.
  const crag = (ridged3(y * .7, z * .7, 8.3, 3) - .3) * .5 + (ridged3(y * 2.1, z * 2.1, 2.9, 2) - .3) * .14 + fbm3(y * 4.6, z * 4.6, 5.2, 2) * .03;
  const x = -4.95 + buttress + broad + bedProfile(f, lean) * jut * 1.4 - crack - pocket + crag;
  // Ambient occlusion from the carved relief: undercuts, joints and pockets are dark.
  const under = (1 - smooth(0, .2, f)) * Math.min(1, jut * 1.4);
  const cavity = THREE.MathUtils.clamp(1 - under * .9 - (p.d < 1 ? 1 - p.d : 0) * .75 - crack * 2.5, .1, 1);
  return { x, cavity, f, layer };
}

/** The reef face: x as a function of height and distance along the wall. */
export function reefWallX(y: number, z: number) { return wallAt(y, z, bedU(y, z)).x; }

export function reefNormal(y: number, z: number, out = new THREE.Vector3()) {
  const e = .05;
  const dy = (reefWallX(y + e, z) - reefWallX(y - e, z)) / (2 * e);
  const dz = (reefWallX(y, z + e) - reefWallX(y, z - e)) / (2 * e);
  return out.set(1, -dy, -dz).normalize();
}

// Rows per bed, packed at both ends so each shelf lip is one clean step.
const BED_ROWS = [0, .05, .13, .23, .34, .48, .63, .78, .9, .985];

/** Rows follow the bed boundaries; columns are dense near the observer. */
export function reefWallGeometry() {
  const cols = 220, first = -11, last = 15;
  const positions: number[] = [], cavity: number[] = [], indices: number[] = [];
  let rows = 0;
  for (let k = first; k <= last; k++) for (const fr of (k === last ? [0] : BED_ROWS)) {
    const u = k + fr;
    for (let iz = 0; iz <= cols; iz++) {
      const z = 7 - 66 * Math.pow(iz / cols, 1.55);
      const y = bedY(u, z);
      const at = wallAt(y, z, u);
      positions.push(at.x, y, z);
      cavity.push(at.cavity);
    }
    rows++;
  }
  for (let iy = 0; iy < rows - 1; iy++) for (let iz = 0; iz < cols; iz++) {
    const a = iy * (cols + 1) + iz, b = a + cols + 1;
    indices.push(a, a + 1, b, b, a + 1, b + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('reefCavity', new THREE.Float32BufferAttribute(cavity, 1));
  g.setIndex(indices); g.computeVertexNormals();
  return g;
}

export type WallSite = { position: THREE.Vector3; normal: THREE.Vector3; y: number; z: number; f: number };

/** Points on the face at chosen depths within a bed (f: 0 undercut .. 1 shelf lip). */
export function faceSites(count: number, seed: number, yRange: [number, number], zRange: [number, number], fRange: [number, number]) {
  const random = seeded(seed);
  const out: WallSite[] = [];
  for (let attempt = 0; attempt < count * 30 && out.length < count; attempt++) {
    const z = zRange[0] + random() * (zRange[1] - zRange[0]);
    const k = Math.floor(bedU(yRange[0], z) + random() * (bedU(yRange[1], z) - bedU(yRange[0], z)));
    const u = k + fRange[0] + random() * (fRange[1] - fRange[0]);
    const y = bedY(u, z);
    if (y < yRange[0] || y > yRange[1]) continue;
    const at = wallAt(y, z, u);
    if (at.cavity < .35 && fRange[0] > .3) continue;
    out.push({ position: new THREE.Vector3(at.x, y, z), normal: reefNormal(y, z), y, z, f: u - k });
  }
  return out;
}

/** Points on the flat tops of the shelves, between the lip and the foot of the bed above. */
export function ledgeSites(count: number, seed: number, yRange: [number, number], zRange: [number, number]) {
  const random = seeded(seed);
  const out: WallSite[] = [];
  for (let attempt = 0; attempt < count * 30 && out.length < count; attempt++) {
    const z = zRange[0] + random() * (zRange[1] - zRange[0]);
    const k = Math.floor(bedU(yRange[0], z) + random() * (bedU(yRange[1], z) - bedU(yRange[0], z)));
    const y = bedY(k + 1, z);
    if (y < yRange[0] || y > yRange[1]) continue;
    const lip = wallAt(y, z, k + .985).x, foot = wallAt(y, z, k + 1).x;
    if (lip - foot < .22) continue; // too narrow to hold anything
    const x = THREE.MathUtils.lerp(foot + .08, lip - .06, .2 + random() * .65);
    out.push({ position: new THREE.Vector3(x, y, z), normal: new THREE.Vector3(0, 1, 0), y, z, f: 1 });
  }
  return out;
}

/**
 * Living reef rock: pitted limestone under pink coralline crust, turf algae
 * on the ledges, encrusting sponge sheets with pores, and sediment in the
 * hollows. Everything is world-space; `cavity` reads the baked relief term.
 */
export function createReefRockMaterial(options: { key: string; cavity?: boolean; life?: number; tint?: THREE.ColorRepresentation }) {
  const material = new THREE.MeshStandardMaterial({ color: options.tint ?? '#ffffff', roughness: .9, metalness: 0 });
  const life = options.life ?? 1;
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vReefWorld;\nvarying vec3 vReefNormal;\nvarying float vReefCavity;\n${options.cavity ? 'attribute float reefCavity;' : ''}`)
      .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
{
  vec4 rw = vec4(transformed, 1.0);
  vec3 rn = objectNormal;
  #ifdef USE_INSTANCING
  rw = instanceMatrix * rw; rn = mat3(instanceMatrix) * rn;
  #endif
  vReefWorld = (modelMatrix * rw).xyz;
  vReefNormal = normalize(mat3(modelMatrix) * rn);
  vReefCavity = ${options.cavity ? 'reefCavity' : '1.0'};
}`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
${shader.fragmentShader.includes('bwPcg3') ? '' : GLSL_NOISE}
${GLSL_SURFACE_BUMP}
varying vec3 vReefWorld;
varying vec3 vReefNormal;
varying float vReefCavity;
// Nearest-feature distance in a jittered 3D lattice (2x2x2 search; points stay near cell centres).
float reefCell(vec3 p, out float id) {
  vec3 i = floor(p - 0.5), q = p - i;
  float best = 9.0; id = 0.0;
  for (int z = 0; z <= 1; z++) for (int y = 0; y <= 1; y++) for (int x = 0; x <= 1; x++) {
    vec3 o = vec3(float(x), float(y), float(z));
    vec3 h = bwHash3(i + o);
    vec3 r = o + 0.3 + 0.4 * h - q;
    float d = dot(r, r);
    if (d < best) { best = d; id = h.z; }
  }
  return sqrt(best);
}
float reefTurf, reefSponge, reefCoralline, reefPit, reefHeight;
`)
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 p = vReefWorld;
  vec3 n = normalize(vReefNormal);
  float macro = bwFbm3(p * 0.16 + 3.0);
  float mid = bwNoise(p * 1.3 + 7.0);
  float grain = bwNoise(p * 9.0);
  // Bedded limestone: pale and dark beds, iron-stained here and there.
  float bed = sin(p.y * 4.6 + bwNoise(p * vec3(0.3, 0.9, 0.3)) * 2.2);
  vec3 stone = mix(vec3(0.30, 0.29, 0.26), vec3(0.52, 0.49, 0.42), 0.5 + 0.5 * macro);
  stone *= 0.9 + 0.1 * bed;
  stone = mix(stone, vec3(0.46, 0.36, 0.26), smoothstep(0.25, 0.7, bwNoise(p * 0.33 + 41.0)) * 0.5);
  // Bored, pitted surface: small round solution pits and worm holes.
  float pitId;
  float pitD = reefCell(p * 4.2, pitId);
  reefPit = (1.0 - smoothstep(0.10, 0.20 + 0.08 * pitId, pitD)) * smoothstep(-0.2, 0.4, bwNoise(p * 0.8 + 2.0));
  // The finest cellular detail is skipped where distance and water hide it anyway.
  float reefNear = 1.0 - smoothstep(12.0, 18.0, length(p - cameraPosition));
  float hole = 0.0, pore = 0.0;
  if (reefNear > 0.0) {
    float holeId, poreId;
    float holeD = reefCell(p * 11.0 + 5.0, holeId);
    hole = (1.0 - smoothstep(0.06, 0.12, holeD)) * step(0.55, holeId) * reefNear;
    float poreD = reefCell(p * 6.5 + 9.0, poreId);
    pore = (1.0 - smoothstep(0.07, 0.13, poreD)) * reefNear;
  }
  // Life: turf on what faces up, coralline crust and sponge sheets elsewhere.
  float upward = n.y + 0.35 * bwNoise(p * 1.9 + 4.0);
  reefTurf = smoothstep(0.25, 0.75, upward) * ${(.85 * life).toFixed(3)};
  reefCoralline = smoothstep(0.0, 0.35, bwFbm3(p * 0.62 + 11.0) + 0.15 * n.x) * (1.0 - reefTurf * 0.7) * ${(.9 * life).toFixed(3)};
  float spongeField = bwFbm3(p * 0.45 + 23.0);
  reefSponge = smoothstep(0.22, 0.36, spongeField) * (1.0 - reefTurf * 0.5) * ${(1.0 * life).toFixed(3)};
  float hue = bwNoise(p * 0.19 + 31.0);
  vec3 spongeColor = mix(vec3(0.92, 0.24, 0.04), vec3(0.88, 0.62, 0.06), smoothstep(-0.25, 0.1, hue));
  spongeColor = mix(spongeColor, vec3(0.48, 0.07, 0.36), smoothstep(0.15, 0.45, hue));
  vec3 c = stone * (0.85 + 0.15 * mid) * (0.9 + 0.2 * grain);
  vec3 crust = mix(vec3(0.72, 0.22, 0.44), vec3(0.86, 0.46, 0.6), smoothstep(0.2, 0.8, bwNoise(p * 3.0 + 8.0)));
  c = mix(c, crust * (0.85 + 0.25 * grain), reefCoralline);
  vec3 turf = mix(vec3(0.20, 0.22, 0.09), vec3(0.34, 0.30, 0.12), 0.5 + 0.5 * bwNoise(p * 4.0 + 1.0));
  c = mix(c, turf * (0.65 + 0.6 * abs(bwNoise(p * 23.0))), reefTurf);
  c = mix(c, spongeColor * (0.8 + 0.25 * mid) * (1.0 - pore * 0.75), reefSponge);
  // Sediment settles in hollows of the ledges.
  float silt = smoothstep(0.55, 0.95, n.y) * (1.0 - vReefCavity) ;
  c = mix(c, vec3(0.45, 0.42, 0.34), clamp(silt * 1.5, 0.0, 0.6));
  c *= 1.0 - 0.7 * reefPit - 0.6 * hole * (1.0 - reefSponge);
  c *= mix(0.25, 1.0, vReefCavity);
  diffuseColor.rgb *= c;
  reefHeight = -reefPit * 0.6 - hole * 0.4 + reefTurf * abs(bwNoise(p * 31.0)) * 0.25
    + reefSponge * (0.2 - pore * 0.6) + bwFbm3(p * 5.5) * 0.25 + grain * 0.05;
}
`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = clamp(mix(0.88, 0.72, reefCoralline) + reefTurf * 0.08, 0.5, 1.0);
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = bwSurfaceBump(-vViewPosition, normal, reefHeight, 0.05);
`)
      .replace('#include <aomap_fragment>', `#include <aomap_fragment>
reflectedLight.indirectDiffuse *= mix(0.3, 1.0, vReefCavity);
`);
  };
  material.customProgramCacheKey = () => `reef-rock-v1|${options.key}`;
  return material;
}

