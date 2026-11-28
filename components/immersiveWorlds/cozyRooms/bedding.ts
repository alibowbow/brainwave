import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { clothSheet } from './geometry';
import { noise3 } from '../shared/render/noise';

/*
 * Bedding for the bedroom, as code-only cloth: a made bed whose duvet rolls
 * over the mattress edge and falls in folds that deepen toward the hem, with
 * the drooping corner cones of real bedding and a turned-down band at the
 * head; pillows sewn from two puffed panels meeting at a seam, with creases
 * radiating from their corners and a dent where a head has been; a chunky
 * throw lying across the foot and spilling over one side.
 * Original procedural work.
 */

export interface BedBox {
  /** Mattress top surface extents: x from head to foot, z across. */
  x0: number; x1: number; z0: number; z1: number;
  top: number;
}

/**
 * A point of a cloth laid over the bed box, from flat coordinates (s along x,
 * t along z, both in metres in the plane before draping). Inside the box it
 * follows `lift(s, t)` above the mattress; outside it rolls over the edge and
 * falls, folding with a period that grows toward the hem.
 */
export function drapePoint(box: BedBox, s: number, t: number, lift: (s: number, t: number) => number, target: THREE.Vector3, options: { roll?: number; foldDepth?: number; floor?: number; seed?: number; footOnly?: boolean } = {}) {
  const roll = options.roll ?? 0.07, foldDepth = options.foldDepth ?? 0.03, floor = options.floor ?? 0.04, seed = options.seed ?? 0;
  const cs = THREE.MathUtils.clamp(s, box.x0, box.x1), ct = THREE.MathUtils.clamp(t, box.z0, box.z1);
  const ds = options.footOnly ? Math.max(0, s - box.x1) : (s > box.x1 ? s - box.x1 : s < box.x0 ? box.x0 - s : 0);
  const dt = t > box.z1 ? t - box.z1 : t < box.z0 ? box.z0 - t : 0;
  const d = Math.hypot(ds, dt);
  const height = box.top + lift(cs, ct);
  if (d < 1e-6) { target.set(s, height, t); return target; }
  const dirS = (s > box.x1 ? 1 : s < box.x0 ? -1 : 0) * ds / d, dirT = (t > box.z1 ? 1 : t < box.z0 ? -1 : 0) * dt / d;
  // Roll over a quarter circle, then hang.
  let out: number, drop: number;
  const arc = roll * Math.PI / 2;
  if (d < arc) { const a = d / roll; out = roll * Math.sin(a); drop = roll * (1 - Math.cos(a)); }
  else { out = roll; drop = roll + (d - arc); }
  // Folds: position along the edge picks the phase; amplitude grows with the fall.
  const along = Math.abs(dirT) > Math.abs(dirS) ? s : t;
  const hang = THREE.MathUtils.smoothstep(d, arc, arc + 0.25);
  const corner = Math.min(Math.abs(dirS), Math.abs(dirT)) * 2;
  const fold = (Math.sin(along * 15 + seed + noise3(along * 2, d * 2, seed) * 2.2) * 0.65 + Math.sin(along * 33 + seed * 2) * 0.2) * foldDepth * hang * (1 + d * 1.5) + corner * Math.sin(d * 18 + seed) * 0.018 * hang;
  const wave = noise3(along * 3 + seed, d * 3, 1.7) * 0.012 * hang;
  target.set(cs + dirS * (out + fold + wave), Math.max(floor, height - drop + corner * 0.0), ct + dirT * (out + fold + wave));
  // Bedding pulled into a corner hangs lower on the diagonal.
  target.y = Math.max(floor, target.y - corner * hang * 0.05);
  return target;
}

/** The duvet's top relief: broad loft, soft ridges and a few slack creases. */
export function duvetLift(s: number, t: number, box: BedBox) {
  const u = (s - box.x0) / (box.x1 - box.x0), v = (t - box.z0) / (box.z1 - box.z0);
  const loft = 0.07 + 0.02 * Math.sin(u * Math.PI) * Math.sin(v * Math.PI);
  const lumps = noise3(s * 1.6, 0.3, t * 1.6) * 0.016 + noise3(s * 4.2, 1.1, t * 4.2) * 0.006;
  // Long creases running diagonally where the duvet was smoothed by hand.
  const crease = Math.pow(Math.abs(Math.sin(s * 3.1 + t * 1.7 + noise3(s, t, 4) * 1.5)), 6) * -0.01 + Math.pow(Math.abs(Math.sin(s * 1.3 - t * 4.4 + 0.6)), 10) * -0.007;
  return loft + lumps + crease;
}

/** Duvet over the mattress: from `head` (the turned-down edge) to the foot, falling on three sides. */
export function duvetGeometry(box: BedBox, head: number, drop: number, seed = 3) {
  const target = new THREE.Vector3();
  const sLen = box.x1 + drop - head, tLen = box.z1 - box.z0 + drop * 2;
  return clothSheet(150, 130, (u, v, out) => {
    const s = head + u * sLen, t = box.z0 - drop + v * tLen;
    drapePoint(box, s, t, (a, b) => duvetLift(a, b, box) * THREE.MathUtils.smoothstep(a, head, head + 0.12) + 0.025, target, { roll: 0.075, foldDepth: 0.026, seed, footOnly: true });
    out.copy(target);
  }, 0.03, [sLen, tLen]);
}

/** The turned-down band: the duvet folded back on itself at the head, a soft roll on its leading edge. */
export function turnDownGeometry(box: BedBox, head: number, width: number, drop: number, seed = 5) {
  const target = new THREE.Vector3();
  const tLen = box.z1 - box.z0 + drop * 2;
  return clothSheet(40, 120, (u, v, out) => {
    const s = head + u * width, t = box.z0 - drop + v * tLen;
    const edge = Math.sin(Math.min(1, u / 0.25) * Math.PI / 2);
    drapePoint(box, s, t, (a, b) => duvetLift(a, b, box) * 0.6 + 0.055 + 0.035 * edge - 0.03 * (1 - edge) + noise3(a * 5, 2, b * 5) * 0.006, target, { roll: 0.09, foldDepth: 0.02, seed, footOnly: true });
    out.copy(target);
  }, 0.028, [width, tLen]);
}

/** A sheet tucked over the mattress, showing at the head between pillows and duvet. */
export function sheetGeometry(box: BedBox, head: number, foot: number, drop: number) {
  const target = new THREE.Vector3();
  const tLen = box.z1 - box.z0 + drop * 2;
  return clothSheet(30, 60, (u, v, out) => {
    const s = head + u * (foot - head), t = box.z0 - drop + v * tLen;
    drapePoint(box, s, t, (a, b) => 0.008 + noise3(a * 3, 0.5, b * 3) * 0.004, target, { roll: 0.05, foldDepth: 0.004, seed: 9, footOnly: true });
    out.copy(target);
  }, 0.004, [foot - head, tLen]);
}

/**
 * A sewn pillow lying in its local xz plane (x = width, z = depth), thickness
 * along y: two panels puffed by a rounded profile meeting at the seam, with
 * creases radiating from each corner and an optional head dent on top.
 */
export function pillowGeometry(width: number, depth: number, thickness: number, seed: number, options: { dent?: number; creases?: number; segments?: number } = {}) {
  const segments = options.segments ?? 44, creases = options.creases ?? 1;
  const panel = (sign: number) => {
    const g = new THREE.PlaneGeometry(width, depth, segments, Math.round(segments * depth / width));
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i);
      const u = (x / width) * 2, v = (z / depth) * 2;
      // Puffed body: full in the middle, pinched to the seam with slightly pointed corners.
      const fill = Math.pow(Math.max(0, 1 - Math.pow(Math.abs(u), 2.6)), 0.55) * Math.pow(Math.max(0, 1 - Math.pow(Math.abs(v), 2.6)), 0.55);
      let h = thickness / 2 * fill;
      // Corner creases: radial ridges fading toward the middle.
      let crease = 0;
      for (const cx of [-1, 1]) for (const cz of [-1, 1]) {
        const qx = x - cx * width / 2, qz = z - cz * depth / 2;
        const r = Math.hypot(qx, qz), a = Math.atan2(qz, qx);
        crease += Math.exp(-r / (0.11 * width)) * (1 - Math.exp(-r / 0.025)) * Math.sin(a * 7 + seed * 3.1 + cx * 1.7 + cz * 2.3 + noise3(r * 8, a, seed) * 1.6);
      }
      // A few long slack folds across the face.
      const slack = Math.pow(Math.abs(Math.sin(x * 9 / width + z * 4 / depth + seed)), 8) * -0.5 + noise3(x * 6, z * 6, seed + sign) * 0.35;
      h += (crease * 0.006 + slack * 0.004) * creases * fill * (0.5 + 0.5 * fill);
      if (sign > 0 && options.dent) h -= options.dent * Math.exp(-(u * u * 2.2 + (v + 0.1) * (v + 0.1) * 3.0)) * fill;
      p.setY(i, sign * Math.max(0.0006, h));
      // The seam bulges slightly outward where the panels meet.
      const seam = (1 - fill) * 0.008;
      p.setX(i, x + Math.sign(x) * seam * Math.abs(u)); p.setZ(i, z + Math.sign(z) * seam * Math.abs(v));
    }
    if (sign < 0) { const idx = g.index!; for (let k = 0; k < idx.count; k += 3) { const t = idx.getX(k + 1); idx.setX(k + 1, idx.getX(k + 2)); idx.setX(k + 2, t); } }
    g.computeVertexNormals();
    const uv = g.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * width, uv.getY(i) * depth);
    return g;
  };
  const merged = mergeGeometries([panel(1), panel(-1)], false)!;
  return merged;
}

/** A channel-tufted upholstered headboard panel facing +x in its local frame (z = width, y = height). */
export function headboardGeometry(width: number, height: number, thickness: number, channels: number) {
  const g = new THREE.BoxGeometry(thickness, height, width, 8, Math.round(height * 50), Math.round(width * 70));
  const p = g.attributes.position;
  const hw = width / 2, hh = height / 2, ht = thickness / 2;
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i);
    const y = p.getY(i), z = p.getZ(i);
    // Rounded edges: pull the front face back near the border.
    const ez = Math.max(0, Math.abs(z) - (hw - 0.04)) / 0.04, ey = Math.max(0, Math.abs(y) - (hh - 0.04)) / 0.04;
    const edge = Math.min(1, Math.hypot(ez, ey));
    if (x > 0) {
      const channel = Math.pow(Math.abs(Math.sin(((z + hw) / width) * channels * Math.PI)), 0.45);
      const pull = 1 - Math.pow(edge, 2);
      x = ht * (0.55 + 0.45 * Math.sqrt(Math.max(0, 1 - edge * edge))) + channel * 0.022 * pull + noise3(y * 4, z * 4, 2) * 0.003 * pull;
      // Stitch lines between channels sink a little more.
    }
    p.setXYZ(i, x, y, z);
  }
  g.computeVertexNormals();
  const uv = g.attributes.uv as THREE.BufferAttribute, nrm = g.attributes.normal;
  for (let i = 0; i < uv.count; i++) {
    // Front/back faces: uv from z (across) and y (up) in metres; others keep a thin strip.
    uv.setXY(i, p.getZ(i) + hw, p.getY(i) + hh + (Math.abs(nrm.getX(i)) < 0.5 ? 0.0 : 0));
  }
  return g;
}

/** A knit throw folded lengthwise across the foot of the bed, spilling over the near side. */
export function throwGeometry(box: BedBox, s0: number, s1: number, drop: number, under: (s: number, t: number) => number, seed = 11) {
  const target = new THREE.Vector3();
  const tLen = box.z1 - box.z0 + drop + 0.12;
  return clothSheet(50, 110, (u, v, out) => {
    const s = s0 + u * (s1 - s0), t = box.z0 - 0.12 + v * tLen;
    const edge = Math.min(u, 1 - u);
    drapePoint(box, s, t, (a, b) => under(a, b) + 0.035 + 0.012 * Math.sin(Math.min(1, edge / 0.08) * Math.PI / 2) + noise3(a * 4, 3, b * 4) * 0.008, target, { roll: 0.1, foldDepth: 0.045, seed, footOnly: true, floor: 0.02 });
    out.copy(target);
  }, 0.022, [s1 - s0, tLen]);
}
