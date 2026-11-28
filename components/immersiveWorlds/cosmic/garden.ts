import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { createBotanyMaterials, createPlant, type PlantKind } from './botany';
import { createRockMaterial } from '../shared/render/rockSurface';
import { boulderGeometry } from '../shared/render/rockGeometry';
import { fbm3, noise3, ridged3 } from '../shared/render/noise';
import { COSMIC_SUN_COLOR, COSMIC_SUN_DIRECTION, COSMIC_SUN_IRRADIANCE } from './sky';

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
interface IslandShape { geometry: THREE.BufferGeometry; rim(angle: number): THREE.Vector3; heightAt(x: number, z: number): number }

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
  };
}

/** A thin ribbon of water leaving an island's lip, widening into spray. */
function waterfallGeometry(start: THREE.Vector3, outward: THREE.Vector3, across: THREE.Vector3, width: number, length: number) {
  const rows = 28;
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  const p = new THREE.Vector3();
  for (let k = 0; k <= rows; k++) {
    const v = k / rows;
    const out = .05 + .55 * Math.sqrt(v) * (length / 5);
    const w = width * (1 + 2.2 * v * v);
    for (const side of [0, 1]) {
      p.copy(start).addScaledVector(outward, out).addScaledVector(across, (side - .5) * w);
      p.y -= v * length;
      positions.push(p.x, p.y, p.z); uvs.push(side, v);
    }
    if (k < rows) { const a = k * 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
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
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const WATERFALL_FRAGMENT = /* glsl */ `
precision highp sampler3D;
uniform sampler3D uNoise;
uniform float uTime;
uniform float uSeed;
uniform vec3 uLight;
varying vec2 vUv;
void main() {
  float across = abs(vUv.x - .5) * 2.0;
  vec3 q = vec3(vUv.x * 1.6 + uSeed, vUv.y * .45 - uTime * .07, uSeed * .37);
  float body = dot(texture(uNoise, q), vec4(.5, .3, .2, 0.0));
  float strands = smoothstep(.40, .66, texture(uNoise, vec3(vUv.x * 3.7 + uSeed, vUv.y * .8 - uTime * .14, .5)).g);
  float core = 1.0 - smoothstep(.25 + .45 * vUv.y, 1.0, across);
  float fade = (1.0 - smoothstep(.30, .97, vUv.y)) * smoothstep(0.0, .05, vUv.y);
  float alpha = core * fade * (.22 + .78 * mix(body, strands, .55)) * .8;
  vec3 color = uLight * (.55 + .9 * strands) + vec3(.012, .020, .026);
  gl_FragColor = vec4(color * alpha, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

function mistTexture() {
  const size = 64;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const dx = (x + .5) / size * 2 - 1, dy = (y + .5) / size * 2 - 1;
    const r = Math.min(1, Math.hypot(dx, dy));
    const n = .75 + .25 * noise3(dx * 3.1, dy * 3.1, 4.2);
    const a = Math.pow(1 - r, 2.2) * n;
    const i = (y * size + x) * 4;
    data[i] = data[i + 1] = data[i + 2] = 255; data[i + 3] = Math.round(THREE.MathUtils.clamp(a, 0, 1) * 255);
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.magFilter = texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

const WATER_FRAGMENT = /* glsl */ `
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
void main() {
  vec2 p = vWorld.xz;
  vec2 slope = waveSlope(p, uTime);
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
  const terraceRock = createRockMaterial('#8a857a', {
    key: 'cosmic-terrace', scale: 1.15, strata: .35, bump: 1.1, cavity: .55, stainAmount: .25, drips: .08,
    // The ground sits only a hand above the pond, so its wet line is set lower
    // to keep moss on the terrace while the basin slope stays wet and dark.
    waterY: WATER_Y - .26, wetBand: .2, wetRoughness: .14, algae: '#2c4733', algaeAmount: .45,
    moss: { color: '#41592f', amount: .95 },
  });
  const rimRock = createRockMaterial('#8a8377', {
    key: 'cosmic-rim', scale: 2.6, strata: .3, bump: 1.8, cavity: .75, stain: '#6e5238', stainAmount: .3, drips: .15,
    waterY: WATER_Y, wetBand: .2, wetRoughness: .1, algae: '#2f4a33', algaeAmount: .55,
    moss: { color: '#465f33', amount: .6 },
  });
  const islandRock = createRockMaterial('#9d9282', {
    key: 'cosmic-island', scale: .85, strata: .85, bump: 1.25, cavity: .62, stain: '#7b5536', stainAmount: .32, drips: .12,
    moss: { color: '#3f5a30', amount: .9 },
  });
  const materials: THREE.Material[] = [terraceRock, rimRock, islandRock];
  const geometries: THREE.BufferGeometry[] = [];
  const textures: THREE.Texture[] = [];
  const botany = createBotanyMaterials();
  const plants: ReturnType<typeof createPlant>[] = [];
  const interactables: THREE.Object3D[] = [];
  const islands: { object: THREE.Group; x: number; y: number; phase: number; scale: number }[] = [];
  const falls: { island: THREE.Group; bottom: THREE.Vector3; radius: number; sprite: THREE.Sprite }[] = [];
  const floaters: { mesh: THREE.Mesh; y: number; phase: number }[] = [];
  const timeUniform = { value: 0 };
  const random = seededRandom(81102);

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
  const plant = (parent: THREE.Object3D, kind: PlantKind, x: number, y: number, z: number, scale: number, seed: number) => {
    // On the terrace, plants follow the actual ground height.
    if (parent === group && ground) y = ground(x, z) - .03;
    const p = createPlant(kind, seed, botany); p.group.position.set(x, y, z); p.group.scale.setScalar(scale); p.group.rotation.y = seed * .79;
    parent.add(p.group);
    // Terrace plants cast (baked) shadows across the ground; island plants are
    // small details the pond reflection and shadow map can skip.
    if (parent === group) { p.group.userData.nearPosition = { x, z }; p.group.traverse(o => { o.castShadow = true; }); }
    else p.group.traverse(o => o.layers.set(COSMIC_DETAIL_LAYER));
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

  // Worn rim stones around the basin, partly in the water.
  for (let i = 0; i < 30; i++) {
    const a = i / 30 * Math.PI * 2 + (random() - .5) * .08;
    const e = 1.0 + (random() - .3) * .07;
    const size = random() < .25 ? 1.5 : random() < .5 ? .6 : 1;
    rock(group, [POND.x + Math.cos(a) * 2.66 * e, -.27 + random() * .05, POND.z + Math.sin(a) * 3.0 * e],
      [(.26 + random() * .22) * size, (.09 + random() * .07) * Math.sqrt(size), (.22 + random() * .2) * size], rimRock, i);
  }
  // Submerged pebbles on the basin floor beneath the reflective surface.
  for (let i = 0; i < 36; i++) {
    const a = random() * Math.PI * 2, r = Math.sqrt(random()) * 2.2;
    rock(group, [POND.x + Math.cos(a) * r, -.56 + random() * .05, POND.z + Math.sin(a) * r * 1.1],
      [.07 + random() * .12, .03 + random() * .03, .06 + random() * .12], rimRock, i + 3);
  }
  // Close tactile, asymmetric foreground: broad fronds and pale worn seating stones.
  const near: [PlantKind, number, number, number, number][] = [
    ['broadleaf', -3.5, -.16, 2.5, 1.65], ['fern', -2.55, -.14, 3.9, 1.2], ['fern', -4.0, -.18, .1, 1.8],
    ['broadleaf', 3.55, -.14, 1.0, 1.75], ['fern', 2.6, -.15, 3.5, 1.35], ['grass', 4.5, -.1, 2.8, 1.7],
    ['blossom', -2.9, -.1, -2.5, 1.15], ['blossom', 3.3, -.12, -2, 1.25], ['fern', -4.8, -.16, -2.7, 1.5],
    ['broadleaf', 4.5, -.16, -3.8, 1.35], ['grass', -3.3, -.14, -4, 1.1], ['grass', 2.7, -.12, -4.2, 1.0],
  ];
  near.forEach(([kind, x, y, z, s], i) => plant(group, kind, x, y, z, s, 120 + i));
  plant(group, 'fern', -3.55, -.13, 1.3, 1.1, 192);
  plant(group, 'broadleaf', 3.3, -.14, 3.45, 1.5, 193);
  plant(group, 'fern', 4, -.1, -.6, 1.5, 194);
  plant(group, 'grass', -4, -.1, 3.25, 1.0, 195);
  plant(group, 'blossom', 1.9, -.12, 2.3, .9, 196);
  plant(group, 'grass', -1.6, -.12, 2.9, .9, 197);
  rock(group, [-3.6, ground(-3.6, 3.4) + .12, 3.4], [1.05, .42, .85], rimRock, 2);
  rock(group, [3.75, ground(3.75, 4.15) + .05, 4.15], [.85, .32, .95], rimRock, 4);
  for (let i = 0; i < 18; i++) {
    const a = random() * Math.PI * 2;
    const x = Math.cos(a) * (3.7 + random() * 1.4), z = POND.z + Math.sin(a) * (4.1 + random());
    rock(group, [x, ground(x, z) + .01, z], [.22 + random() * .3, .07 + random() * .07, .2 + random() * .32], terraceRock, i + 7);
  }
  // Three small stones float above the pond, each on its own slow drift.
  for (let i = 0; i < 3; i++) {
    const m = new THREE.Mesh(medium[i], rimRock);
    const position = [[-1.35, .55, -2.6], [1.65, .95, -3.2], [.35, 1.3, -4.4]][i];
    m.position.set(position[0], position[1], position[2]);
    m.scale.set(.16 + i * .03, .11 + i * .02, .14 + i * .03);
    m.rotation.set(i * .6, i * 1.3, i * .2);
    m.receiveShadow = true;
    m.name = 'cosmic-floating-stone';
    group.add(m); floaters.push({ mesh: m, y: position[1], phase: i * 2.1 + .4 });
  }

  // Hanging gardens occupy distinct depths, never a rotating tabletop diorama.
  const waterfallMaterials: THREE.ShaderMaterial[] = [];
  const mistMap = mistTexture(); textures.push(mistMap);
  const mistMaterial = new THREE.SpriteMaterial({ map: mistMap, color: new THREE.Color(.42, .48, .52), transparent: true, depthWrite: false, opacity: .55 });
  materials.push(mistMaterial);
  const sunLight = new THREE.Vector3(COSMIC_SUN_COLOR.r, COSMIC_SUN_COLOR.g, COSMIC_SUN_COLOR.b).multiplyScalar(COSMIC_SUN_IRRADIANCE / Math.PI * .55);
  const makeIsland = (x: number, y: number, z: number, s: number, seed: number, rotation: number, fallAngle?: number) => {
    const g = new THREE.Group(); g.position.set(x, y, z); g.scale.setScalar(s); g.rotation.y = rotation; group.add(g);
    const shape = islandGeometry(seed, 3.0, 4.3, { segments: 96, capRings: 12, sideRings: 30 });
    geometries.push(shape.geometry);
    const mass = new THREE.Mesh(shape.geometry, islandRock); mass.castShadow = true; mass.receiveShadow = true; mass.name = 'cosmic-floating-island'; g.add(mass);
    // Hanging crags break the single-cone silhouette of the underside.
    for (let j = 0; j < 3; j++) {
      const a = seed * .9 + j * 2.1;
      const r = 1.0 + (j % 2) * .7;
      rock(g, [Math.cos(a) * r, -1.5 - j * .45, Math.sin(a) * r * .8], [.75 + (j % 2) * .3, 1.35 + j * .3, .7], islandRock, seed + 11 + j);
    }
    for (let j = 0; j < 6; j++) {
      const a = j / 6 * Math.PI * 2 + seed;
      const rimPoint = shape.rim(a).multiplyScalar(.9);
      rock(g, [rimPoint.x, rimPoint.y + .05, rimPoint.z], [.5 + (j % 3) * .15, .26, .42], islandRock, seed + j);
    }
    plant(g, 'broadleaf', -.9, .12, -.4, 2.0, seed + 2);
    plant(g, 'fern', -1.35, .08, .3, 1.25, seed + 15);
    plant(g, 'broadleaf', .45, .12, .45, 1.15, seed + 18);
    plant(g, 'grass', 1.85, .06, -.5, 1.6, seed + 17);
    plant(g, 'fern', 1.2, .12, .1, 1.45, seed + 5);
    plant(g, 'grass', -1.8, .04, .3, 1.1, seed + 4);
    plant(g, 'blossom', .7, .13, -.8, 1.6, seed + 8);
    // Ferns spill over the rim and hang down the cliff faces.
    for (let k = 0; k < 2; k++) {
      const a = seed * 1.7 + k * 2.6 + .4;
      const rimPoint = shape.rim(a);
      const hanging = plant(g, 'fern', rimPoint.x * .97, rimPoint.y - .12, rimPoint.z * .97, .75 + (k % 2) * .2, seed + 60 + k);
      hanging.group.rotation.set(0, 0, 0);
      const outward = new THREE.Vector3(rimPoint.x, 0, rimPoint.z).normalize();
      const axis = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), outward).normalize();
      hanging.group.quaternion.setFromAxisAngle(axis, 1.9 + (k % 3) * .15);
    }
    if (fallAngle !== undefined) {
      g.updateMatrixWorld(true);
      const start = shape.rim(fallAngle);
      const outward = new THREE.Vector3(start.x, 0, start.z).normalize();
      const toViewer = g.worldToLocal(VIEWPOINT.clone()).sub(start).setY(0).normalize();
      const across = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), toViewer).normalize();
      const length = 4.0;
      const geometry = waterfallGeometry(start.clone().addScaledVector(outward, .06), outward, across, .26, length);
      geometries.push(geometry);
      const material = new THREE.ShaderMaterial({
        uniforms: { uNoise: { value: options.noise }, uTime: timeUniform, uSeed: { value: seed * .137 }, uLight: { value: sunLight } },
        vertexShader: WATERFALL_VERTEX, fragmentShader: WATERFALL_FRAGMENT,
        transparent: true, premultipliedAlpha: true, depthWrite: false, side: THREE.DoubleSide,
      });
      waterfallMaterials.push(material); materials.push(material);
      const ribbon = new THREE.Mesh(geometry, material); ribbon.name = 'cosmic-island-waterfall'; ribbon.renderOrder = 3;
      ribbon.layers.set(COSMIC_DETAIL_LAYER); g.add(ribbon);
      const bottom = start.clone().addScaledVector(outward, .55).add(new THREE.Vector3(0, -length * .92, 0));
      const sprite = new THREE.Sprite(mistMaterial); sprite.position.copy(bottom); sprite.scale.setScalar(2.4); sprite.renderOrder = 4;
      sprite.layers.set(COSMIC_DETAIL_LAYER); g.add(sprite);
      falls.push({ island: g, bottom, radius: 1.0 * s, sprite });
    }
    islands.push({ object: g, x, y, phase: seed, scale: s }); return g;
  };
  makeIsland(-10, 2.6, -20, 1.45, 31, .5, 1.05);
  makeIsland(9.8, .75, -16, 1.15, 45, 0, 2.2);
  makeIsland(-1.6, .55, -36, 1.0, 61, 0);
  makeIsland(18, 4.4, -43, 1.9, 76, 0, 2.5).rotation.z = -.08;
  makeIsland(-18, -1.4, -44, 1.45, 94, 0);
  makeIsland(5, 7.4, -57, .8, 112, 0);
  // Small stepped stones across the void connect the garden without becoming UI.
  for (let i = 0; i < 7; i++) rock(group, [-4.9 - i * .65, -.3 + i * .2, -6 - i * 1.35], [.62 - i * .04, .22, .48], rimRock, 3 + i);

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
      fragmentShader: WATER_FRAGMENT,
    },
  });
  water.name = 'cosmic-reflecting-pool'; water.rotation.x = -Math.PI / 2; water.position.set(POND.x, WATER_Y, POND.z); water.scale.set(POND.rx, POND.rz, 1);
  const waterMaterial = water.material as THREE.ShaderMaterial;
  waterMaterial.transparent = true; waterMaterial.premultipliedAlpha = true; water.renderOrder = 2;
  group.add(water); interactables.push(water);
  const waterUniforms = waterMaterial.uniforms;

  // Static stones share a draw per material/parent; floating islands keep local transforms.
  const parents = [group, ...islands.map(i => i.object)];
  for (const parent of parents) {
    const buckets = new Map<THREE.Material, THREE.Mesh[]>();
    for (const child of [...parent.children]) if (child instanceof THREE.Mesh && child.userData.cosmicStone) {
      const material = child.material as THREE.Material;
      const bucket = buckets.get(material) ?? []; bucket.push(child); buckets.set(material, bucket);
    }
    for (const [material, meshes] of buckets) {
      const pieces = meshes.map(mesh => { mesh.updateMatrix(); return mesh.geometry.clone().applyMatrix4(mesh.matrix); });
      const merged = mergeGeometries(pieces); pieces.forEach(g => g.dispose());
      if (merged) { geometries.push(merged); const batch = new THREE.Mesh(merged, material); batch.castShadow = true; batch.receiveShadow = true; parent.add(batch); meshes.forEach(mesh => parent.remove(mesh)); }
    }
  }
  const scratch = new THREE.Vector3();
  let disposed = false;
  return {
    group, interactables, water,
    update(time: number, pulse?: { position: THREE.Vector3; age: number } | null) {
      if (disposed) return;
      timeUniform.value = time;
      plants.forEach(p => p.update(time, pulse));
      islands.forEach(({ object, y, phase }) => { object.position.y = y + Math.sin(time * .065 + phase) * .055; });
      floaters.forEach(({ mesh, y, phase }) => {
        mesh.position.y = y + Math.sin(time * .19 + phase) * .045;
        mesh.rotation.y = phase + time * .021;
      });
      waterUniforms.uTime.value = time; waterUniforms.uAge.value = pulse?.age ?? 20;
      if (pulse) waterUniforms.uPulse.value.copy(pulse.position);
    },
    /** Island ellipsoids (and the terrace) for the volume pass's shadow test. */
    writeOccluders(out: THREE.Vector4[]) {
      out.forEach(v => v.set(0, 0, 0, 0));
      out[0]?.set(0, -2.6, .8, 6.8);
      islands.forEach(({ object, scale }, index) => {
        const target = out[index + 1];
        if (!target) return;
        target.set(object.position.x, object.position.y - 1.15 * scale, object.position.z, 2.85 * scale);
      });
    },
    writeMist(out: THREE.Vector4[]) {
      out.forEach(v => v.set(0, 0, 0, 0));
      falls.forEach(({ island, bottom, radius }, index) => {
        if (!out[index]) return;
        island.updateMatrixWorld();
        scratch.copy(bottom).applyMatrix4(island.matrixWorld);
        out[index].set(scratch.x, scratch.y, scratch.z, radius);
      });
    },
    /** The volume pass draws mist itself; the direct path keeps soft sprites. */
    setPostActive(active: boolean) { falls.forEach(({ sprite }) => { sprite.visible = !active; }); },
    setAspect(aspect: number) {
      const narrow = aspect < .8;
      for (const p of plants) { const base = p.group.userData.nearPosition; if (base) p.group.position.x = base.x * (narrow ? .40 : 1); }
      for (const island of islands) island.object.position.x = island.x * (narrow ? .58 : 1);
    },
    dispose() {
      if (disposed) return; disposed = true;
      plants.forEach(p => p.dispose()); botany.dispose();
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose());
      water.dispose(); group.clear();
    },
  };
}
