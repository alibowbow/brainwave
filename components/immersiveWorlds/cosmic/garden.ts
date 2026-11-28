import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { createBotanyMaterials, createPlant, type PlantKind } from './botany';
import { createRockMaterial } from '../shared/render/rockSurface';
import { boulderGeometry } from '../shared/render/rockGeometry';
import { fbm3, noise3, ridged3 } from '../shared/render/noise';
import { COSMIC_SUN_COLOR, COSMIC_SUN_DIRECTION, COSMIC_SUN_IRRADIANCE } from './sky';
import { createIslandSet, type IslandSpec } from './islands';
import { createVegetationMaterials, createGlowLights, addGlowLighting, addGrass, addVine, VegetationBuffer } from './vegetation';
import { createGlowFlora, type GlowPlanting } from './glowFlora';

/** Every texture and mesh here is generated locally; no downloaded artwork. */
export function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
}

export const WATER_Y = -.265;
const POND = { x: 0, z: -.85, rx: 2.83, rz: 3.18 };
/** Layer for small, distant details the pond reflection can skip. */
export const COSMIC_DETAIL_LAYER = 1;
const VIEWPOINT = new THREE.Vector3(0, 1.65, 5.8);

const smoothstep = (a: number, b: number, x: number) => { const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

interface Basin { x: number; z: number; rx: number; rz: number; depth: number }
interface IslandShape { geometry: THREE.BufferGeometry; rim(angle: number): THREE.Vector3; heightAt(x: number, z: number): number; inside(x: number, z: number): number; outlineAt(angle: number): number }

/**
 * A floating island: a gently domed, mossy cap with an irregular outline and
 * an eroded underside that tapers to a crag. Stepped strata ledges, vertical
 * erosion grooves and 3D noise displacement break the lathe symmetry. Normals
 * are welded around the full circle, so there is no seam.
 */
function islandGeometry(seed: number, radius: number, depth: number, options: { segments?: number; capRings?: number; sideRings?: number; squash?: number; basin?: Basin; top?: number; dome?: number } = {}): IslandShape {
  const segments = options.segments ?? 96;
  const capRings = options.capRings ?? 12;
  const sideRings = options.sideRings ?? 30;
  const squash = options.squash ?? .84;
  const top = options.top ?? 0;
  const positions: number[] = [];
  const indices: number[] = [];
  const outline = new Float32Array(segments);
  for (let i = 0; i < segments; i++) {
    const a = i / segments * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
    outline[i] = radius * (1 + .17 * fbm3(c * 1.1 + seed * .37, s * 1.1, seed * .11, 3) + .045 * noise3(c * 3.9, s * 3.9, seed + 2.3));
  }
  const outlineAt = (angle: number) => {
    const u = ((angle / (Math.PI * 2)) % 1 + 1) % 1 * segments;
    const i = Math.floor(u) % segments, f = u - Math.floor(u);
    return THREE.MathUtils.lerp(outline[i], outline[(i + 1) % segments], f);
  };
  const capY = (x: number, z: number, s: number) => {
    let y = top + (options.dome ?? radius * .035) * (1 - s * s) + fbm3(x * .32 + seed, 1.7, z * .32, 3) * .10 * Math.min(1, radius / 3) + noise3(x * 1.6, 3.1, z * 1.6) * .02;
    const b = options.basin;
    if (b) y -= b.depth * (1 - smoothstep(.82, 1.12, Math.hypot((x - b.x) / b.rx, (z - b.z) / b.rz)));
    return y - smoothstep(.86, 1, s) * radius * .02;
  };
  const push = (x: number, y: number, z: number) => { positions.push(x, y, z); return positions.length / 3 - 1; };
  const rows: number[] = [];
  const center = push(0, capY(0, 0, 0), 0);
  for (let k = 1; k <= capRings; k++) {
    const s = k / capRings;
    rows.push(positions.length / 3);
    for (let i = 0; i < segments; i++) {
      const a = i / segments * Math.PI * 2;
      const x = Math.cos(a) * outline[i] * s, z = Math.sin(a) * outline[i] * s * squash;
      push(x, capY(x, z, s), z);
    }
  }
  for (let j = 1; j < sideRings; j++) {
    const t = j / sideRings;
    rows.push(positions.length / 3);
    for (let i = 0; i < segments; i++) {
      const a = i / segments * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
      const lip = t < .08 ? 1 + .035 * Math.sin(t / .08 * Math.PI) : 1;
      // Stepped sediment ledges: each band overhangs the one beneath it.
      const band = (t * 7 + .3 * noise3(c * 2, t * 3, s * 2 + seed)) % 1;
      const strata = 1 - .05 * smoothstep(.15, 1, band);
      // Per-angle profiles: some faces drop as cliffs, others overhang and
      // plunge late, so each underside is a lumpy, asymmetric crag.
      const lobe = fbm3(c * .9 + seed * .21, s * .9, seed * .5, 3);
      const fall = Math.pow(t, THREE.MathUtils.clamp(1 + 1.6 * lobe, .45, 2.2));
      const taper = Math.pow(1 - fall, .62 + .5 * lobe);
      const groove = 1 - .24 * Math.pow(ridged3(c * 2.6 + seed, t * 1.6, s * 2.6, 3), 1.5) * smoothstep(.04, .3, t);
      const r = outline[i] * taper * lip * strata * groove;
      const y = top - radius * .02 - t * depth * (1 + .22 * lobe + .1 * noise3(c * 1.3, seed, s * 1.3));
      let x = c * r, z = s * r * squash;
      const amplitude = .2 * radius / 3 * (.4 + t);
      x += fbm3(x * .45 + seed, y * .45, z * .45, 3) * amplitude;
      z += fbm3(x * .45, y * .45 + 7.1, z * .45 + seed, 3) * amplitude;
      push(x, y + noise3(x * .8, y * .8, z * .8 + seed) * .12 * radius / 3, z);
    }
  }
  const tip = push(fbm3(seed, 0, 0, 2) * radius * .15, top - depth * 1.1, fbm3(0, seed, 0, 2) * radius * .15);
  const next = (i: number) => (i + 1) % segments;
  for (let i = 0; i < segments; i++) indices.push(center, rows[0] + next(i), rows[0] + i);
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
  geometry.computeBoundingSphere();
  return {
    geometry,
    rim(angle) {
      const r = outlineAt(angle);
      const x = Math.cos(angle) * r, z = Math.sin(angle) * r * squash;
      return new THREE.Vector3(x, capY(x, z, 1), z);
    },
    heightAt(x, z) {
      const angle = Math.atan2(z / squash, x);
      return capY(x, z, Math.min(1, Math.hypot(x, z / squash) / outlineAt(angle)));
    },
    /** Radial fraction of the outline at (x, z): below 1 is on the cap. */
    inside(x, z) {
      return Math.hypot(x, z / squash) / outlineAt(Math.atan2(z / squash, x));
    },
    outlineAt,
  };
}

const WATER_FRAGMENT = () => /* glsl */ `
uniform sampler2D tDiffuse;
uniform float uTime;
uniform vec3 uPulse;
uniform float uAge;
uniform vec3 uSun;
uniform vec3 uSunRadiance;
varying vec4 vReflection;
varying vec3 vWorld;
vec2 waveSlope(vec2 p, float t) {
  // A few slow, irregular directional ripples (analytic slopes).
  vec2 s = vec2(0.0);
  vec2 d1 = normalize(vec2(.83, .55)), d2 = normalize(vec2(-.42, .91)), d3 = normalize(vec2(.15, -.99)), d4 = normalize(vec2(-.95, -.3));
  s += d1 * cos(dot(d1, p) * 5.1 - t * .45) * .010;
  s += d2 * cos(dot(d2, p) * 8.3 - t * .62 + 1.3) * .007;
  s += d3 * cos(dot(d3, p) * 13.7 - t * .80 + 2.1) * .004;
  s += d4 * cos(dot(d4, p) * 21.0 - t * 1.1 + .4) * .0025;
  return s;
}
vec2 dripHash(float n) { return fract(sin(vec2(n * 12.9898, n * 78.233)) * 43758.5453); }
void main() {
  vec2 p = vWorld.xz;
  vec2 slope = waveSlope(p, uTime);
  // Now and then a drop from the overhanging plants rings the still surface:
  // three slow sources, each at a new spot every nine to fourteen seconds.
  for (int k = 0; k < 3; k++) {
    float period = 9.0 + float(k) * 2.4;
    float shifted = uTime + float(k) * 3.7;
    float cycle = floor(shifted / period);
    float age = shifted - cycle * period;
    vec2 centre = vec2(${POND.x.toFixed(2)}, ${POND.z.toFixed(2)}) + (dripHash(cycle * 3.0 + float(k) * 17.0) - .5) * vec2(${(POND.rx * 1.5).toFixed(2)}, ${(POND.rz * 1.5).toFixed(2)});
    vec2 dv = p - centre;
    float d = length(dv);
    float front = d - age * .23;
    float envelope = exp(-age * .32) * smoothstep(0.0, .3, age) * exp(-d * .5);
    slope += dv / max(d, 1e-3) * cos(front * 34.0) * exp(-front * front * 30.0) * envelope * .020;
  }
  float dist = length(p - uPulse.xz);
  float envelope = sin(clamp(uAge / 8.0, 0.0, 1.0) * 3.14159);
  float ring = exp(-pow(dist - uAge * .34, 2.0) * 4.0) * envelope;
  slope += normalize(p - uPulse.xz + vec2(.001)) * cos(dist * 12.0 - uAge * 2.4) * ring * .05;
  vec3 n = normalize(vec3(-slope.x, 1.0, -slope.y));
  vec3 v = normalize(cameraPosition - vWorld);
  float cosV = max(dot(n, v), 0.0);
  float fresnel = .02 + .98 * pow(1.0 - cosV, 5.0);
  // A still, dark pond reads as a mirror: lift the reflectance a little.
  float reflectance = clamp(fresnel * 1.25 + .14, 0.0, 1.0);
  vec2 uv = vReflection.xy / vReflection.w + n.xz * .06;
  vec3 reflected = texture2D(tDiffuse, clamp(uv, vec2(.002), vec2(.998))).rgb;
  // Starlight glints from ripple facets (GGX, roughness .06).
  vec3 h = normalize(uSun + v);
  float nh = max(dot(n, h), 0.0);
  float a2 = .0036;
  float dTerm = a2 / (3.14159 * pow(nh * nh * (a2 - 1.0) + 1.0, 2.0));
  vec3 glint = uSunRadiance * dTerm * fresnel * max(dot(n, uSun), 0.0) * .25;
  // Light scattered back out of the water column, and what it lets through.
  vec3 body = vec3(.002, .010, .011);
  float through = (1.0 - reflectance) * exp(-.9 / max(cosV, .15));
  vec3 color = reflected * reflectance + body * (1.0 - reflectance) + glint;
  color += vec3(.10, .28, .24) * max(ring, 0.0) * .25;
  gl_FragColor = vec4(color, 1.0 - through);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export interface CosmicGardenOptions {
  noise: THREE.Data3DTexture;
}

/** A seated terrace: stone continues behind the camera; the basin is below eye level. */
export function createGarden(options: CosmicGardenOptions) {
  const group = new THREE.Group(); group.name = 'cosmic-living-terrace';
  const glow = createGlowLights();
  const terraceRock = addGlowLighting(createRockMaterial('#7f7a6f', {
    key: 'cosmic-terrace', scale: 1.15, strata: .35, bump: 1.1, cavity: .55, stainAmount: .25, drips: .08,
    // The ground sits only a hand above the pond, so its wet line is set lower
    // to keep moss on the terrace while the basin slope stays wet and dark.
    waterY: WATER_Y - .26, wetBand: .2, wetRoughness: .14, algae: '#2c4733', algaeAmount: .45,
    moss: { color: '#34492a', amount: 1 },
  }), glow, 'vRockWorld', 'cosmic-terrace', 'rockMoss * .5');
  const rimRock = addGlowLighting(createRockMaterial('#8a8377', {
    key: 'cosmic-rim', scale: 2.6, strata: .3, bump: 1.8, cavity: .75, stain: '#6e5238', stainAmount: .3, drips: .15,
    waterY: WATER_Y, wetBand: .2, wetRoughness: .1, algae: '#2f4a33', algaeAmount: .55,
    moss: { color: '#3d5a2d', amount: .85 },
  }), glow, 'vRockWorld', 'cosmic-rim', 'rockMoss');
  const materials: THREE.Material[] = [terraceRock, rimRock];
  const geometries: THREE.BufferGeometry[] = [];
  const botany = createBotanyMaterials();
  botany.uniforms.uBotanyKeyDir.value.copy(COSMIC_SUN_DIRECTION);
  const plants: ReturnType<typeof createPlant>[] = [];
  const interactables: THREE.Object3D[] = [];
  const timeUniform = { value: 0 };
  const random = seededRandom(81102);
  const sunRadiance = COSMIC_SUN_COLOR.clone().multiplyScalar(COSMIC_SUN_IRRADIANCE / Math.PI);
  const vegetation = createVegetationMaterials({ sun: COSMIC_SUN_DIRECTION, sunRadiance, glow });

  // Boulder shapes at three levels of detail, normalised to a unit box.
  const big = [11, 12, 13].map(seed => boulderGeometry(seed, 4));
  const medium = [21, 22, 23, 24].map(seed => boulderGeometry(seed, 3));
  const small = [31, 32, 33].map(seed => boulderGeometry(seed, 2));
  geometries.push(...big, ...medium, ...small);
  const rock = (parent: THREE.Object3D, position: number[], scale: number[], material: THREE.Material, seed: number) => {
    const size = Math.max(scale[0], scale[2]);
    const shapes = size > .9 ? big : size > .28 ? medium : small;
    const m = new THREE.Mesh(shapes[seed % shapes.length], material);
    m.position.set(position[0], position[1], position[2]); m.scale.set(scale[0], scale[1], scale[2]);
    m.rotation.set((seed % 5) * .05, seed * .71, (seed % 3) * .04);
    m.castShadow = true; m.receiveShadow = true; m.userData.cosmicStone = true; parent.add(m); return m;
  };
  let ground: ((x: number, z: number) => number) | null = null;
  const plant = (kind: PlantKind, x: number, z: number, scale: number, seed: number) => {
    // Plants follow the actual ground height and cast (baked) shadows across it.
    const y = (ground ? ground(x, z) : 0) - .03;
    const p = createPlant(kind, seed, botany); p.group.position.set(x, y, z); p.group.scale.setScalar(scale); p.group.rotation.y = seed * .79;
    group.add(p.group);
    p.group.userData.nearPosition = { x, z }; p.group.traverse(o => { o.castShadow = true; });
    // Plants on the near side of the pond never appear in its reflection.
    if (z > POND.z + .6) p.group.traverse(o => o.layers.set(COSMIC_DETAIL_LAYER));
    plants.push(p); interactables.push(...p.interactables); return p;
  };

  // The seat terrace itself: one eroded island with a recessed pond basin.
  const terraceShape = islandGeometry(7, 7.4, 7.5, {
    segments: 160, capRings: 34, sideRings: 26, squash: 1, top: -.12, dome: 0,
    basin: { x: POND.x, z: POND.z - .8, rx: 2.62, rz: 2.98, depth: .5 },
  });
  geometries.push(terraceShape.geometry);
  const terrace = new THREE.Mesh(terraceShape.geometry, terraceRock);
  terrace.name = 'cosmic-terrace-mass';
  terrace.position.set(0, 0, .8); terrace.castShadow = true; terrace.receiveShadow = true;
  group.add(terrace);
  ground = (x, z) => terraceShape.heightAt(x, z - .8);
  // Planting samples the ground tens of thousands of times: a baked height
  // grid (bilinear) keeps start-up cheap; placement only needs centimetres.
  const GRID = 160, GX0 = -7.6, GZ0 = -7.0, GSTEP = 15.2 / (GRID - 1);
  const heights = new Float32Array(GRID * GRID);
  for (let j = 0; j < GRID; j++) for (let i = 0; i < GRID; i++) heights[j * GRID + i] = terraceShape.heightAt(GX0 + i * GSTEP, GZ0 + j * GSTEP - .8);
  const groundAt = (x: number, z: number) => {
    const u = THREE.MathUtils.clamp((x - GX0) / GSTEP, 0, GRID - 1.001), v = THREE.MathUtils.clamp((z - GZ0) / GSTEP, 0, GRID - 1.001);
    const i = Math.floor(u), j = Math.floor(v), fu = u - i, fv = v - j, k = j * GRID + i;
    return (heights[k] * (1 - fu) + heights[k + 1] * fu) * (1 - fv) + (heights[k + GRID] * (1 - fu) + heights[k + GRID + 1] * fu) * fv;
  };
  ground = groundAt;

  // Worn rim stones around the basin, partly in the water: clustered, with
  // gaps where turf and plants reach the water, a few broad flat slabs among
  // rounded cobbles, some sunk deep and some standing proud.
  for (let i = 0; i < 34; i++) {
    const a = i / 34 * Math.PI * 2 + (random() - .5) * .2;
    if (Math.sin(a * 3 + 1.3) > .82 && random() < .7) continue;
    const e = 1.0 + (random() - .35) * .1;
    const roll = random();
    const size = roll < .14 ? 1.9 : roll < .4 ? .55 : roll < .6 ? .8 : 1.1;
    const flat = roll < .14 ? .55 : 1;
    rock(group, [POND.x + Math.cos(a) * 2.66 * e, -.32 + random() * .09, POND.z + Math.sin(a) * 3.0 * e],
      [(.24 + random() * .22) * size, (.09 + random() * .08) * Math.sqrt(size) * flat, (.2 + random() * .2) * size], rimRock, i);
  }
  // Submerged pebbles on the basin floor beneath the reflective surface.
  for (let i = 0; i < 36; i++) {
    const a = random() * Math.PI * 2, r = Math.sqrt(random()) * 2.2;
    rock(group, [POND.x + Math.cos(a) * r, -.56 + random() * .05, POND.z + Math.sin(a) * r * 1.1],
      [.07 + random() * .12, .03 + random() * .03, .06 + random() * .12], rimRock, i + 3);
  }
  // Close, asymmetric foreground: ferns and broad fronds frame the seat; the
  // glowing flora gathers at the water's edge.
  const near: [PlantKind, number, number, number][] = [
    ['broadleaf', -3.5, 2.5, 1.65], ['fern', -2.55, 3.9, 1.2], ['fern', -4.0, .1, 1.8],
    ['broadleaf', 3.55, 1.0, 1.6], ['fern', 2.6, 3.5, 1.35], ['grass', 4.5, 2.8, 1.7],
    ['blossom', -2.9, -2.5, 1.05], ['fern', 3.6, -2.4, 1.3], ['fern', -4.8, -2.7, 1.5],
    ['broadleaf', 4.5, -3.8, 1.35], ['grass', -3.3, -4, 1.1], ['grass', 2.9, -4.4, 1.0],
  ];
  near.forEach(([kind, x, z, s], i) => plant(kind, x, z, s, 120 + i));
  plant('fern', -3.55, 1.3, 1.1, 192);
  plant('fern', 4, -.6, 1.5, 194);
  plant('grass', -4, 3.25, 1.0, 195);
  plant('blossom', 1.9, 2.5, .8, 196);
  rock(group, [-3.6, groundAt(-3.6, 3.4) + .12, 3.4], [1.05, .42, .85], rimRock, 2);
  rock(group, [3.75, groundAt(3.75, 4.15) + .05, 4.15], [.85, .32, .95], rimRock, 4);
  for (let i = 0; i < 18; i++) {
    const a = random() * Math.PI * 2;
    const x = Math.cos(a) * (3.7 + random() * 1.4), z = POND.z + Math.sin(a) * (4.1 + random());
    rock(group, [x, groundAt(x, z) + .01, z], [.22 + random() * .3, .07 + random() * .07, .2 + random() * .32], terraceRock, i + 7);
  }

  // A living carpet on the terrace: short, dense grass that follows the ground,
  // thinning to moss and bare stone in patches and leaving the rim stones clear.
  const inPond = (x: number, z: number, margin: number) => ((x - POND.x) / (POND.rx + margin)) ** 2 + ((z - POND.z) / (POND.rz + margin)) ** 2 < 1;
  const terraceGrass = (u: number, v: number) => {
    const x = (u - .5) * 14.6, z = -6.9 + v * 12.6;
    if (terraceShape.inside(x, z - .8) > .965 || inPond(x, z, .32)) return null;
    const y = groundAt(x, z);
    const e = .05;
    const normal = new THREE.Vector3(groundAt(x - e, z) - groundAt(x + e, z), 2 * e, groundAt(x, z - e) - groundAt(x, z + e)).normalize();
    const patch = fbm3(x * .42 + 3.1, 0.7, z * .42, 3);
    // Thinner on the damp basin slope, fuller toward the plantings.
    const nearWater = inPond(x, z, .9) ? .55 : 1;
    return { position: new THREE.Vector3(x, y - .02, z), normal, density: THREE.MathUtils.clamp((.95 - patch * 1.2) * nearWater, .12, 1), dry: THREE.MathUtils.clamp(patch + .15, 0, 1) };
  };
  const farGrass = new VegetationBuffer(), nearGrass = new VegetationBuffer();
  const grassPalette = {
    root: new THREE.Color(.020, .034, .016), mid: new THREE.Color(.070, .125, .042),
    tip: new THREE.Color(.17, .24, .08), dry: new THREE.Color(.25, .22, .10),
  };
  // Beyond the pond (and so in its reflection) and in front of it (not reflected).
  addGrass(farGrass, { seed: 71, count: 11000, sample: (u, v) => { const hit = terraceGrass(u, v * .42); return hit && hit.position.z < POND.z - .4 ? hit : null; }, height: [.06, .22], width: [.02, .036], sway: .025, palette: grassPalette });
  addGrass(nearGrass, { seed: 72, count: 15000, sample: (u, v) => { const hit = terraceGrass(u, .3 + v * .7); return hit && hit.position.z >= POND.z - .4 ? hit : null; }, height: [.06, .24], width: [.02, .036], sway: .025, palette: grassPalette });
  // The terrace's own far edge: a ragged fringe and vines spill into the void.
  for (let i = 0; i < 26; i++) {
    const angle = -Math.PI * (.12 + .76 * i / 26) + (random() - .5) * .05;
    const r = terraceShape.outlineAt(angle) * .99;
    const x = Math.cos(angle) * r, z = Math.sin(angle) * r + .8;
    const outward = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    addVine(farGrass, { seed: 900 + i, start: new THREE.Vector3(x, groundAt(x, z) - .08, z), outward, length: 1.2 + random() * 3.2, leafSize: .07, sway: .05,
      leafColor: new THREE.Color(.035, .07, .03), stemColor: new THREE.Color(.045, .055, .03), wallDistance: t => -.08 * Math.min(1, t * 4) + .1 * t });
  }
  addGrass(farGrass, {
    seed: 73, count: 1400, height: [.16, .36], width: [.016, .028], sway: .04, palette: grassPalette,
    sample: (u, v) => {
      const angle = -Math.PI * (.08 + .84 * u), rr = .955 + .04 * v;
      const r = terraceShape.outlineAt(angle) * rr;
      const x = Math.cos(angle) * r, z = Math.sin(angle) * r + .8;
      return { position: new THREE.Vector3(x, groundAt(x, z) - .02, z), normal: new THREE.Vector3(Math.cos(angle) * .7, .7, Math.sin(angle) * .7).normalize() };
    },
    lean: p => new THREE.Vector3(p.x, -1.2, p.z - .8).normalize(),
  });
  for (const [buffer, layer, name] of [[farGrass, 0, 'cosmic-terrace-grass-far'], [nearGrass, COSMIC_DETAIL_LAYER, 'cosmic-terrace-grass-near']] as const) {
    const geometry = buffer.geometry(); geometries.push(geometry);
    const mesh = new THREE.Mesh(geometry, vegetation.foliage);
    mesh.name = name; mesh.receiveShadow = true; mesh.layers.set(layer);
    group.add(mesh);
  }

  // Bioluminescent flora along the water's edge and among the foreground plants.
  const plantings: GlowPlanting[] = [
    { kind: 'lantern', x: -2.15, z: -3.85, scale: 1.0, seed: 11, hue: 0 },
    { kind: 'lantern', x: 2.35, z: -3.95, scale: 1.1, seed: 12, hue: 1 },
    { kind: 'lantern', x: -3.15, z: .75, scale: 1.15, seed: 13, hue: 0 },
    { kind: 'lantern', x: 3.05, z: 1.85, scale: 1.0, seed: 14, hue: 2 },
    { kind: 'lantern', x: .95, z: 3.35, scale: .8, seed: 15, hue: 0 },
    { kind: 'caps', x: -2.75, z: -.75, scale: 1.2, seed: 21, hue: 0 },
    { kind: 'caps', x: 2.8, z: -1.9, scale: 1.1, seed: 22, hue: 1 },
    { kind: 'caps', x: .35, z: -4.45, scale: 1.0, seed: 23, hue: 0 },
    { kind: 'caps', x: -1.95, z: 1.85, scale: .9, seed: 24, hue: 3 },
    { kind: 'tendrils', x: -1.05, z: -4.35, scale: 1.0, seed: 31, hue: 1 },
    { kind: 'tendrils', x: 1.55, z: -4.25, scale: 1.1, seed: 32, hue: 0 },
    { kind: 'tendrils', x: -3.65, z: -1.65, scale: 1.2, seed: 33, hue: 3 },
    { kind: 'tendrils', x: 3.45, z: -.25, scale: 1.1, seed: 34, hue: 0 },
    { kind: 'tendrils', x: -.55, z: 2.95, scale: .9, seed: 35, hue: 1 },
  ];
  plantings.forEach(p => { p.y = groundAt(p.x, p.z) - .02; });
  const flora = createGlowFlora({
    plantings, material: vegetation.glow, glow, time: timeUniform,
    // Flora beyond the pond appears in its reflection; nearer flora cannot.
    // The far corner lanterns stay out of it: on a phone their reflection
    // shows while the plant itself is hidden behind the foreground leaves.
    reflectionLayer: p => p.z < POND.z - 1.2 && Math.abs(p.x) < 2 ? 0 : COSMIC_DETAIL_LAYER,
  });
  group.add(flora.group);
  interactables.push(...flora.interactables);

  // Hanging gardens occupy distinct depths, never a rotating tabletop diorama.
  const sunLight = new THREE.Vector3(COSMIC_SUN_COLOR.r, COSMIC_SUN_COLOR.g, COSMIC_SUN_COLOR.b).multiplyScalar(COSMIC_SUN_IRRADIANCE / Math.PI * .55);
  const specs: IslandSpec[] = [
    { x: -10, y: 2.6, z: -20, scale: 1.45, seed: 31, rotation: .5, fall: 1.05, tree: true },
    { x: 9.8, y: .75, z: -16, scale: 1.15, seed: 45, rotation: 0, fall: 2.2, tree: true },
    { x: -1.6, y: .55, z: -36, scale: 1.0, seed: 61, rotation: 0, detail: .6 },
    { x: 18, y: 4.4, z: -43, scale: 1.9, seed: 76, rotation: 0, fall: 2.5, tree: true, detail: .7 },
    { x: -18, y: -1.4, z: -44, scale: 1.45, seed: 94, rotation: 0, detail: .55 },
    { x: 5, y: 7.4, z: -57, scale: .8, seed: 112, rotation: 0, detail: .4 },
  ];
  const islandSet = createIslandSet(specs, {
    noise: options.noise, vegetation, time: timeUniform, sunLight, viewpoint: VIEWPOINT, detailLayer: COSMIC_DETAIL_LAYER,
  });
  islandSet.islands.forEach(island => group.add(island.group));
  islandSet.islands[3].group.rotation.z = -.08;

  const waterGeometry = new THREE.CircleGeometry(1, 96); geometries.push(waterGeometry);
  const water = new Reflector(waterGeometry, {
    textureWidth: 1024, textureHeight: 1024, clipBias: .003, multisample: 0,
    shader: {
      name: 'CosmicGardenWater',
      uniforms: {
        tDiffuse: { value: null }, textureMatrix: { value: new THREE.Matrix4() }, color: { value: new THREE.Color() },
        uTime: { value: 0 }, uPulse: { value: new THREE.Vector3() }, uAge: { value: 20 },
        uSun: { value: COSMIC_SUN_DIRECTION.clone() },
        uSunRadiance: { value: new THREE.Vector3(COSMIC_SUN_COLOR.r, COSMIC_SUN_COLOR.g, COSMIC_SUN_COLOR.b).multiplyScalar(COSMIC_SUN_IRRADIANCE) },
      },
      vertexShader: `uniform mat4 textureMatrix;varying vec4 vReflection;varying vec3 vWorld;
      void main(){vWorld=(modelMatrix*vec4(position,1.)).xyz;vReflection=textureMatrix*vec4(position,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: WATER_FRAGMENT(),
    },
  });
  water.name = 'cosmic-reflecting-pool'; water.rotation.x = -Math.PI / 2; water.position.set(POND.x, WATER_Y, POND.z); water.scale.set(POND.rx, POND.rz, 1);
  const waterMaterial = water.material as THREE.ShaderMaterial;
  waterMaterial.transparent = true; waterMaterial.premultipliedAlpha = true; water.renderOrder = 2;
  group.add(water); interactables.push(water);
  const waterUniforms = waterMaterial.uniforms;
  // three's Reflector clones the viewing camera, layers included. Keep its
  // reflection camera on layer 0 so the detail layer (island plants, falls,
  // near foliage and flora) really stays out of the pond pass.
  const reflectorBeforeRender = water.onBeforeRender;
  water.onBeforeRender = function (renderer, scene, camera, geometry, material, renderGroup) {
    water.getReflectionCamera(camera).layers.set(0);
    reflectorBeforeRender.call(this, renderer, scene, camera, geometry, material, renderGroup);
  };

  // Static stones share a draw per material.
  const buckets = new Map<THREE.Material, THREE.Mesh[]>();
  for (const child of [...group.children]) if (child instanceof THREE.Mesh && child.userData.cosmicStone) {
    const material = child.material as THREE.Material;
    const bucket = buckets.get(material) ?? []; bucket.push(child); buckets.set(material, bucket);
  }
  for (const [material, meshes] of buckets) {
    const pieces = meshes.map(mesh => { mesh.updateMatrix(); return mesh.geometry.clone().applyMatrix4(mesh.matrix); });
    const merged = mergeGeometries(pieces); pieces.forEach(g => g.dispose());
    if (merged) { geometries.push(merged); const batch = new THREE.Mesh(merged, material); batch.castShadow = true; batch.receiveShadow = true; group.add(batch); meshes.forEach(mesh => group.remove(mesh)); }
  }
  const falls = islandSet.islands.filter(island => island.mist);
  const scratch = new THREE.Vector3();
  let disposed = false;
  return {
    group, interactables, water,
    update(time: number, pulse?: { position: THREE.Vector3; age: number } | null) {
      if (disposed) return;
      timeUniform.value = time;
      vegetation.time.value = time;
      plants.forEach(p => p.update(time, pulse));
      islandSet.update(time);
      flora.update(time);
      waterUniforms.uTime.value = time; waterUniforms.uAge.value = pulse?.age ?? 20;
      if (pulse) waterUniforms.uPulse.value.copy(pulse.position);
    },
    /** Island ellipsoids (and the terrace) for the volume pass's shadow test. */
    writeOccluders(out: THREE.Vector4[]) {
      out.forEach(v => v.set(0, 0, 0, 0));
      out[0]?.set(0, -2.6, .8, 6.8);
      islandSet.islands.forEach(({ group: island, spec }, index) => {
        const target = out[index + 1];
        if (!target) return;
        target.set(island.position.x, island.position.y - 1.15 * spec.scale, island.position.z, 2.85 * spec.scale);
      });
    },
    writeMist(out: THREE.Vector4[]) {
      out.forEach(v => v.set(0, 0, 0, 0));
      falls.forEach(({ group: island, mist, spec }, index) => {
        if (!out[index] || !mist) return;
        island.updateMatrixWorld();
        scratch.copy(mist).applyMatrix4(island.matrixWorld);
        out[index].set(scratch.x, scratch.y, scratch.z, 1.1 * spec.scale);
      });
    },
    /** The volume pass draws mist itself; the spray particles read on both paths. */
    setPostActive(_active: boolean) { /* nothing to toggle */ },
    setAspect(aspect: number) {
      const narrow = aspect < .8;
      for (const p of plants) { const base = p.group.userData.nearPosition; if (base) p.group.position.x = base.x * (narrow ? .5 : 1); }
      for (const island of islandSet.islands) island.group.position.x = island.spec.x * (narrow ? .58 : 1);
    },
    dispose() {
      if (disposed) return; disposed = true;
      plants.forEach(p => p.dispose()); botany.dispose();
      islandSet.dispose(); flora.dispose(); vegetation.dispose();
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
      water.dispose(); group.clear();
    },
  };
}
