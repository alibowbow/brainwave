import * as THREE from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { fbm3, noise3, ridged3, seeded } from '../../shared/render/noise';

/*
 * Procedural stone shapes for the water-edge worlds. Every shape starts from a
 * welded icosphere (no UV poles, no seams), is cut or deformed in object space
 * and normalised to a unit box, so a mesh's scale gives its exact half-extents.
 */

function weldedSphere(detail: number) {
  const base = new THREE.IcosahedronGeometry(1, detail);
  base.deleteAttribute('normal'); base.deleteAttribute('uv');
  const geometry = mergeVertices(base); base.dispose();
  return geometry;
}

/** Umbrella (Laplacian) smoothing: water rounds the edges left by fracture planes. */
function relax(geometry: THREE.BufferGeometry, iterations: number, amount: number) {
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const index = geometry.index!;
  const count = position.count;
  const sum = new Float32Array(count * 3), degree = new Float32Array(count);
  const array = position.array as Float32Array;
  for (let iteration = 0; iteration < iterations; iteration++) {
    sum.fill(0); degree.fill(0);
    for (let i = 0; i < index.count; i += 3) {
      const a = index.getX(i), b = index.getX(i + 1), c = index.getX(i + 2);
      for (const [p, q] of [[a, b], [b, c], [c, a]]) {
        sum[p * 3] += array[q * 3]; sum[p * 3 + 1] += array[q * 3 + 1]; sum[p * 3 + 2] += array[q * 3 + 2]; degree[p]++;
        sum[q * 3] += array[p * 3]; sum[q * 3 + 1] += array[p * 3 + 1]; sum[q * 3 + 2] += array[p * 3 + 2]; degree[q]++;
      }
    }
    for (let i = 0; i < count; i++) {
      if (!degree[i]) continue;
      for (let k = 0; k < 3; k++) array[i * 3 + k] += (sum[i * 3 + k] / degree[i] - array[i * 3 + k]) * amount;
    }
  }
  position.needsUpdate = true;
}

function normaliseToUnitBox(geometry: THREE.BufferGeometry) {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const centre = box.getCenter(new THREE.Vector3()), size = box.getSize(new THREE.Vector3());
  geometry.translate(-centre.x, -centre.y, -centre.z);
  geometry.scale(2 / size.x, 2 / size.y, 2 / size.z);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

export interface BoulderOptions {
  /** Number of fracture planes (blockiness). */
  facets?: number;
  /** 0 keeps sharp fracture edges, 1 is fully water-rounded. */
  rounding?: number;
  /** Relative strength of eroded relief. */
  relief?: number;
  /** Fraction of the height flattened into a bedding base (0..1). */
  base?: number;
}

/** Granite/basalt boulder: fracture facets, eroded relief and water-rounded edges. */
export function boulderGeometry(seed: number, detail: number, options: BoulderOptions = {}) {
  const { facets = 7, rounding = .5, relief = 1, base = .3 } = options;
  const random = seeded(seed * 7919 + 13);
  const geometry = weldedSphere(detail);
  const planes = Array.from({ length: facets }, () => {
    const n = new THREE.Vector3(random() * 2 - 1, (random() * 2 - 1) * .8, random() * 2 - 1).normalize();
    return { n, c: .66 + random() * .28 };
  });
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const p = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    p.fromBufferAttribute(position, i).normalize();
    let r = 1;
    for (const { n, c } of planes) { const d = p.dot(n); if (d > 1e-3) r = Math.min(r, c / d); }
    r = THREE.MathUtils.lerp(r, .86, .15);
    r *= 1 + relief * (fbm3(p.x * 1.6 + seed, p.y * 1.6, p.z * 1.6, 4) * .09 + (ridged3(p.x * 2.8, p.y * 2.8 + seed, p.z * 2.8, 3) - .35) * .035);
    p.multiplyScalar(r);
    const floor = -1 + base * 1.2;
    if (p.y < floor) p.y = THREE.MathUtils.lerp(p.y, floor, .8);
    position.setXYZ(i, p.x, p.y, p.z);
  }
  if (rounding > 0) relax(geometry, Math.round(2 + rounding * 6), .45);
  // Fine pitting after rounding keeps the silhouette from looking melted.
  for (let i = 0; i < position.count; i++) {
    p.fromBufferAttribute(position, i);
    const n = noise3(p.x * 5.1 + seed, p.y * 5.1, p.z * 5.1) * .012 * relief;
    p.multiplyScalar(1 + n);
    position.setXYZ(i, p.x, p.y, p.z);
  }
  return normaliseToUnitBox(geometry);
}

/** Sea- or stream-worn pebble: smooth, slightly flattened, gently asymmetric. */
export function pebbleGeometry(seed: number, detail: number, flatness = .3) {
  const random = seeded(seed * 104729 + 3);
  const geometry = weldedSphere(detail);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const p = new THREE.Vector3();
  const tilt = (random() - .5) * .25, bulge = (random() - .5) * .3, phase = random() * 10;
  for (let i = 0; i < position.count; i++) {
    p.fromBufferAttribute(position, i).normalize();
    // Superellipsoid profile: flatter faces, rounded rims.
    const e = 1 + flatness;
    const sx = Math.sign(p.x) * Math.pow(Math.abs(p.x), 1 / e), sz = Math.sign(p.z) * Math.pow(Math.abs(p.z), 1 / e);
    const sy = Math.sign(p.y) * Math.pow(Math.abs(p.y), 1 / (1 + flatness * .4));
    let r = 1 + noise3(p.x * .9 + phase, p.y * .9, p.z * .9) * .07 + noise3(p.x * 2.1 + phase, p.y * 2.1, p.z * 2.1) * .018;
    r *= 1 + bulge * p.x * .5;
    position.setXYZ(i, sx * r, sy * r + tilt * p.x * .3 - (p.y < 0 ? p.y * p.y * .08 : 0), sz * r);
  }
  relax(geometry, 2, .3);
  return normaliseToUnitBox(geometry);
}

export type BeachStoneShape = 'egg' | 'disc' | 'blade' | 'round' | 'angular';

/**
 * Beach shingle: water-worn pebbles in the classic Zingg shape families
 * (disc, blade, egg/rod, sphere) plus a few half-rounded broken stones. The
 * buried underside is trimmed, since the stones are always set into the bed.
 */
export function beachStoneGeometry(seed: number, detail: number, shape: BeachStoneShape, trimBelow = -.45) {
  const geometry = shape === 'angular'
    ? boulderGeometry(seed, detail, { facets: 6, rounding: .85, relief: .35, base: .15 })
    : pebbleGeometry(seed, detail, shape === 'disc' ? .62 : shape === 'blade' ? .48 : shape === 'round' ? .08 : .25);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  if (shape === 'blade' || shape === 'egg') {
    // A tapered end: real shingle is rarely symmetric end to end.
    const taper = shape === 'blade' ? .22 : .14;
    for (let i = 0; i < position.count; i++) {
      const end = position.getX(i) * .5 + .5;
      position.setY(i, position.getY(i) * (1 - taper * end));
      position.setZ(i, position.getZ(i) * (1 - taper * .6 * end));
    }
  }
  return trimBuried(geometry, trimBelow);
}

/** Drops the triangles wholly below `below` (unit-box y): the part set into the bed. */
export function trimBuried(geometry: THREE.BufferGeometry, below: number) {
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const index = geometry.index!;
  const kept: number[] = [];
  for (let i = 0; i < index.count; i += 3) {
    const a = index.getX(i), b = index.getX(i + 1), c = index.getX(i + 2);
    if (Math.max(position.getY(a), position.getY(b), position.getY(c)) >= below) kept.push(a, b, c);
  }
  geometry.setIndex(kept);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox(); geometry.computeBoundingSphere();
  return geometry;
}

/**
 * Stream granite: fracture planes kept crisp, a broad exfoliated crown and an
 * old joint weathered into a V-groove across the stone, so the boulder reads
 * as rock with structure rather than a rounded blob.
 */
export function streamBoulderGeometry(seed: number, detail: number) {
  const geometry = boulderGeometry(seed, detail, { facets: 8, rounding: .3, relief: 1.3, base: .32 });
  const random = seeded(seed * 31 + 7);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const joint = new THREE.Vector3(random() * 2 - 1, (random() - .5) * .5, random() * 2 - 1).normalize();
  const offset = (random() - .5) * .6, width = .09 + random() * .06, depth = .08 + random() * .05;
  const p = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    p.fromBufferAttribute(position, i);
    const groove = Math.max(0, 1 - Math.abs(p.dot(joint) - offset) / width);
    if (groove > 0 && p.y > -.65) p.multiplyScalar(1 - depth * groove * groove * (1 + .5 * noise3(p.x * 4 + seed, p.y * 4, p.z * 4)));
    if (p.y > .5) p.y = .5 + (p.y - .5) * .6;
    position.setXYZ(i, p.x, p.y, p.z);
  }
  return normaliseToUnitBox(geometry);
}
