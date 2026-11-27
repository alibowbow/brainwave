import * as THREE from 'three';
import { stoneBlock } from './geometry';

/*
 * Random rubble masonry: the face is split recursively into stones of varied
 * size and aspect (so joints never line up into brick courses), each stone a
 * chiselled block with an irregular outline, tinted per stone and darkened by
 * an optional soot field. Stones beside an opening run deep to form its reveal.
 */

export interface RubbleOptions {
  x0: number; x1: number; y0: number; y1: number;
  /** z of the stone faces; stones extend toward -z. */
  front: number;
  /** Depth of ordinary stones and of reveal stones beside the opening. */
  depth: number;
  revealDepth?: number;
  random: () => number;
  /** Half-width of the opening (centred at x = 0) for a band starting at height y; 0 when none. */
  openingHalfWidth?: (y: number) => number;
  /** True inside the opening (and any surround the caller builds itself). */
  inOpening?: (x: number, y: number) => boolean;
  /** Height below which stones next to the opening become reveal stones. */
  revealTop?: number;
  /** Stone size limits in metres. */
  maxWidth?: number;
  maxHeight?: number;
  palette?: string[];
  soot?: (x: number, y: number, z: number) => number;
  roughness?: number;
}

export function stonePalette(random: () => number, palette: string[]) {
  const c = new THREE.Color(palette[Math.floor(random() * palette.length)]);
  return c.multiplyScalar(0.82 + random() * 0.3);
}

/** Writes per-vertex colour: stone tint darkened by soot. */
export function tintStone(geometry: THREE.BufferGeometry, base: THREE.Color, soot: (x: number, y: number, z: number) => number = () => 0) {
  const p = geometry.attributes.position, colors = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) {
    const s = 1 - soot(p.getX(i), p.getY(i), p.getZ(i));
    colors[i * 3] = base.r * s; colors[i * 3 + 1] = base.g * s; colors[i * 3 + 2] = base.b * s;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

export const LIMESTONE_PALETTE = ['#a39885', '#8f877b', '#b3a185', '#857f73', '#a48f74', '#b8ab94', '#8d7f70', '#9a8b7f', '#a7957a'];
export const GRANITE_PALETTE = ['#8d8b86', '#77746f', '#9a948a', '#6f6c68', '#8a8178', '#a19c94', '#7d7a74'];

/** Builds the stones of a rubble face; returns one geometry per stone (tinted, positioned). */
export function rubbleFace(o: RubbleOptions) {
  const random = o.random;
  const maxW = o.maxWidth ?? 0.58, maxH = o.maxHeight ?? 0.4;
  const leaves: Array<[number, number, number, number]> = [];
  const split = (x0: number, y0: number, x1: number, y1: number, depth: number) => {
    const w = x1 - x0, h = y1 - y0;
    const small = w < maxW && h < maxH && (w * h < maxW * maxH * 0.5 || random() < 0.35);
    if ((small && depth > 2) || (w < maxW * 0.45 && h < maxH * 0.55)) { leaves.push([x0, y0, x1, y1]); return; }
    const vertical = w / 1.45 > h ? random() < 0.85 : random() < 0.12;
    const t = 0.32 + random() * 0.36;
    if (vertical && w > maxW * 0.5) { const xm = x0 + w * t; split(x0, y0, xm, y1, depth + 1); split(xm, y0, x1, y1, depth + 1); }
    else if (h > maxH * 0.65) { const ym = y0 + h * t; split(x0, y0, x1, ym, depth + 1); split(x0, ym, x1, y1, depth + 1); }
    else leaves.push([x0, y0, x1, y1]);
  };
  const bands = Math.max(1, Math.round((o.y1 - o.y0) / (maxH * 1.6)));
  for (let band = 0; band < bands; band++) split(o.x0, o.y0 + band * (o.y1 - o.y0) / bands, o.x1, o.y0 + (band + 1) * (o.y1 - o.y0) / bands, 0);
  const palette = o.palette ?? LIMESTONE_PALETTE;
  const stones: THREE.BufferGeometry[] = [];
  const matrix = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  for (const [lx0, ly0, lx1, ly1] of leaves) {
    let x0 = lx0, x1 = lx1;
    const y0 = ly0, h = ly1 - ly0;
    let deep = false;
    if (o.inOpening && o.openingHalfWidth) {
      const clear = o.openingHalfWidth(y0) + 0.012;
      const hit = [x0, (x0 + x1) / 2, x1].some(sx => [y0 + 0.01, y0 + h * 0.5, y0 + h - 0.01].some(sy => o.inOpening!(sx, sy))) || (x0 < -clear + 1e-3 && x1 > clear - 1e-3 && clear > 0.05);
      if (hit) {
        if ((x0 + x1) / 2 < 0) x1 = Math.min(x1, -clear); else x0 = Math.max(x0, clear);
        deep = y0 < (o.revealTop ?? 0) - 0.05;
      }
    }
    const joint = 0.012 + random() * 0.012;
    const w = x1 - x0 - joint;
    if (w < 0.1 || h < 0.1) continue;
    const sh = h - joint - random() * 0.025;
    const sy = y0 + joint / 2 + sh / 2 + (h - joint - sh) * random();
    const depth = deep ? (o.revealDepth ?? o.depth) : o.depth + random() * 0.06;
    const proud = random() * 0.03;
    const g = stoneBlock(w, sh, depth, Math.floor(random() * 1e5), o.roughness ?? 1, 0.04, deep ? 0.08 : 0.45);
    matrix.compose(new THREE.Vector3((x0 + x1) / 2, sy, o.front + proud - depth / 2), q.setFromEuler(e.set((random() - 0.5) * 0.02, (random() - 0.5) * 0.03, (random() - 0.5) * 0.05)), new THREE.Vector3(1, 1, 1));
    g.applyMatrix4(matrix);
    stones.push(tintStone(g, stonePalette(random, palette), o.soot));
  }
  return stones;
}
