import * as THREE from 'three';
import { seeded } from '../shared/render/noise';

/*
 * A small software painter for the terrace garden's foliage atlases: tapered
 * strokes, lanceolate leaves and discs with signed-distance anti-aliasing,
 * composited in sRGB like a 2D canvas. Pure JS, so the same atlases are drawn
 * in the browser and in Node tests (no DOM canvas). The y axis points up: row
 * 0 is v = 0, the stem or ground end of every drawing. Transparent texels take
 * the average opaque colour so mipmaps never pull dark fringes into
 * alpha-tested edges. Original drawings, no external images.
 */

type RGB = [number, number, number];

const hex = (value: string): RGB => {
  const c = new THREE.Color(value);
  c.convertLinearToSRGB();
  return [c.r, c.g, c.b];
};
const mixRgb = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const scaleRgb = (a: RGB, k: number): RGB => [a[0] * k, a[1] * k, a[2] * k];

export class Painter {
  readonly data: Float32Array;
  constructor(readonly width: number, readonly height: number) {
    this.data = new Float32Array(width * height * 4);
  }

  private blend(x: number, y: number, rgb: RGB, alpha: number) {
    if (alpha <= 0) return;
    const i = (y * this.width + x) * 4, d = this.data, k = 1 - alpha;
    d[i] = rgb[0] * alpha + d[i] * k;
    d[i + 1] = rgb[1] * alpha + d[i + 1] * k;
    d[i + 2] = rgb[2] * alpha + d[i + 2] * k;
    d[i + 3] = alpha + d[i + 3] * k;
  }

  /** A stroke through `points` whose half-width and colour vary along it (t in 0..1). */
  stroke(points: Array<[number, number]>, halfWidth: (t: number) => number, color: (t: number, across: number) => RGB, opacity = 1) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity, maxW = 0;
    const lengths = [0];
    for (let i = 0; i < points.length; i++) {
      const [px, py] = points[i];
      x0 = Math.min(x0, px); y0 = Math.min(y0, py); x1 = Math.max(x1, px); y1 = Math.max(y1, py);
      if (i) lengths.push(lengths[i - 1] + Math.hypot(px - points[i - 1][0], py - points[i - 1][1]));
    }
    const total = lengths[lengths.length - 1] || 1;
    for (let i = 0; i <= 8; i++) maxW = Math.max(maxW, halfWidth(i / 8));
    const pad = maxW + 1.5;
    const xa = Math.max(0, Math.floor(x0 - pad)), xb = Math.min(this.width - 1, Math.ceil(x1 + pad));
    const ya = Math.max(0, Math.floor(y0 - pad)), yb = Math.min(this.height - 1, Math.ceil(y1 + pad));
    if (xb < xa || yb < ya) return;
    // Nearest segment per pixel, visiting only each segment's own bounding box.
    const bw = xb - xa + 1, bh = yb - ya + 1;
    const best = new Float32Array(bw * bh).fill(Infinity), bestT = new Float32Array(bw * bh), bestAcross = new Float32Array(bw * bh);
    for (let s = 0; s < points.length - 1; s++) {
      const [ax, ay] = points[s], [bx, by] = points[s + 1];
      const dx = bx - ax, dy = by - ay, len2 = dx * dx + dy * dy || 1;
      const w0 = halfWidth(lengths[s] / total), w1 = halfWidth(lengths[s + 1] / total);
      const r = Math.max(w0, w1) + 1.5;
      const sxa = Math.max(xa, Math.floor(Math.min(ax, bx) - r)), sxb = Math.min(xb, Math.ceil(Math.max(ax, bx) + r));
      const sya = Math.max(ya, Math.floor(Math.min(ay, by) - r)), syb = Math.min(yb, Math.ceil(Math.max(ay, by) + r));
      for (let y = sya; y <= syb; y++) {
        for (let x = sxa; x <= sxb; x++) {
          const px = x + 0.5, py = y + 0.5;
          const h = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
          const ex = px - ax - dx * h, ey = py - ay - dy * h;
          const dist = Math.sqrt(ex * ex + ey * ey);
          const w = w0 + (w1 - w0) * h;
          const d = dist - w;
          const k = (y - ya) * bw + (x - xa);
          if (d < best[k]) {
            best[k] = d;
            bestT[k] = (lengths[s] + h * (lengths[s + 1] - lengths[s])) / total;
            bestAcross[k] = w > 0 ? Math.sign(ex * dy - ey * dx) * Math.min(1, dist / w) : 0;
          }
        }
      }
    }
    for (let y = ya; y <= yb; y++) {
      for (let x = xa; x <= xb; x++) {
        const k = (y - ya) * bw + (x - xa);
        const coverage = Math.max(0, Math.min(1, 0.5 - best[k]));
        if (coverage > 0) this.blend(x, y, color(bestT[k], bestAcross[k]), coverage * opacity);
      }
    }
  }

  /**
   * A leaf from its base (x, y) in direction `angle` (radians from +y), with a
   * lanceolate outline. `color(u, v)` gets u along (0 base .. 1 tip) and v across (-1..1).
   */
  leaf(x: number, y: number, angle: number, length: number, width: number, color: (u: number, v: number) => RGB, shape = 0.8, opacity = 1) {
    const ca = Math.cos(angle), sa = Math.sin(angle);
    // Leaf axis is (sin a, cos a): angle 0 points up.
    const ax = sa, ay = ca;
    const tipX = x + ax * length, tipY = y + ay * length;
    const pad = width + 2;
    const xa = Math.max(0, Math.floor(Math.min(x, tipX) - pad)), xb = Math.min(this.width - 1, Math.ceil(Math.max(x, tipX) + pad));
    const ya = Math.max(0, Math.floor(Math.min(y, tipY) - pad)), yb = Math.min(this.height - 1, Math.ceil(Math.max(y, tipY) + pad));
    for (let py = ya; py <= yb; py++) {
      for (let px = xa; px <= xb; px++) {
        const rx = px + 0.5 - x, ry = py + 0.5 - y;
        const along = rx * ax + ry * ay, across = rx * ay - ry * ax;
        const u = along / length;
        if (u < -0.02 || u > 1.02) continue;
        const uc = Math.max(0, Math.min(1, u));
        // Widest a little below the middle, pointed at both ends.
        const half = width * Math.pow(Math.sin(Math.PI * Math.pow(uc, 0.85)), shape);
        const d = Math.abs(across) - half;
        let coverage = Math.max(0, Math.min(1, 0.5 - d));
        coverage *= Math.max(0, Math.min(1, (u + 0.02) * length)) * Math.max(0, Math.min(1, (1.02 - u) * length));
        if (coverage > 0) this.blend(px, py, color(uc, half > 0 ? Math.max(-1, Math.min(1, across / half)) : 0), coverage * opacity);
      }
    }
  }

  /** A filled ellipse. */
  disc(x: number, y: number, rx: number, ry: number, angle: number, color: (r: number) => RGB, opacity = 1) {
    const ca = Math.cos(angle), sa = Math.sin(angle);
    const pad = Math.max(rx, ry) + 1.5;
    const xa = Math.max(0, Math.floor(x - pad)), xb = Math.min(this.width - 1, Math.ceil(x + pad));
    const ya = Math.max(0, Math.floor(y - pad)), yb = Math.min(this.height - 1, Math.ceil(y + pad));
    const m = Math.min(rx, ry);
    for (let py = ya; py <= yb; py++) {
      for (let px = xa; px <= xb; px++) {
        const dx = px + 0.5 - x, dy = py + 0.5 - y;
        const u = (dx * ca + dy * sa) / rx, v = (-dx * sa + dy * ca) / ry;
        const r = Math.hypot(u, v);
        const coverage = Math.max(0, Math.min(1, (1 - r) * m + 0.5));
        if (coverage > 0) this.blend(px, py, color(Math.min(1, r)), coverage * opacity);
      }
    }
  }

  /** Uploads as an sRGB, mipmapped texture with dilated colour under transparent texels. */
  toTexture(anisotropy = 4) {
    const { width, height, data } = this;
    let r = 0, g = 0, b = 0, n = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0.8) { r += data[i] / data[i + 3]; g += data[i + 1] / data[i + 3]; b += data[i + 2] / data[i + 3]; n++; }
    }
    const avg = n ? [r / n, g / n, b / n] : [0.35, 0.4, 0.25];
    const out = new Uint8Array(width * height * 4);
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3];
      for (let c = 0; c < 3; c++) {
        const straight = a > 1e-4 ? data[i + c] / a : avg[c];
        out[i + c] = Math.round(Math.max(0, Math.min(1, straight * a + avg[c] * (1 - a))) * 255);
      }
      out[i + 3] = Math.round(Math.max(0, Math.min(1, a)) * 255);
    }
    const texture = new THREE.DataTexture(out, width, height, THREE.RGBAFormat);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = anisotropy;
    texture.needsUpdate = true;
    return texture;
  }
}

const jitterRgb = (c: RGB, random: () => number, amount: number): RGB => {
  const k = 1 + (random() - 0.5) * amount;
  const warm = (random() - 0.5) * amount * 0.35;
  return [c[0] * k * (1 + warm), c[1] * k, c[2] * k * (1 - warm)];
};

/** A gently curving polyline from (x, y) along `angle`, bending by `bend` radians in total. */
function curve(x: number, y: number, angle: number, length: number, bend: number, segments = 6): Array<[number, number]> {
  const pts: Array<[number, number]> = [[x, y]];
  let a = angle, px = x, py = y;
  for (let i = 1; i <= segments; i++) {
    a += bend / segments;
    px += Math.sin(a) * length / segments; py += Math.cos(a) * length / segments;
    pts.push([px, py]);
  }
  return pts;
}
const pointOn = (pts: Array<[number, number]>, t: number): [number, number] => {
  const f = t * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(f)), k = f - i;
  return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
};
const angleOn = (pts: Array<[number, number]>, t: number) => {
  const f = t * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(f));
  return Math.atan2(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
};

// ---- Olive ------------------------------------------------------------------------------------------

const OLIVE = {
  top: hex('#3f4a2e'), topLight: hex('#5f6b3f'), topDark: hex('#2c3520'),
  under: hex('#9aa38c'), underLight: hex('#b9bfac'), underDark: hex('#7c8570'),
  stem: hex('#5b5a46'),
};

/**
 * Olive sprays: slender twigs with opposite pairs of narrow leaves, dark grey-green
 * above and silvery below, a quarter to a third turned to show the underside.
 * `columns` square variants side by side.
 */
export function oliveSprayAtlas(seed: number, columns = 4, cell = 256) {
  const p = new Painter(cell * columns, cell);
  const random = seeded(seed);
  for (let column = 0; column < columns; column++) {
    const ox = column * cell;
    const leafColor = (under: boolean, tone: number) => (u: number, v: number): RGB => {
      const base = under ? mixRgb(OLIVE.underDark, OLIVE.underLight, tone) : mixRgb(OLIVE.topDark, OLIVE.topLight, tone);
      // Paler midrib, darker rolled margin, a dull base and a lighter shoulder.
      const rib = Math.max(0, 1 - Math.abs(v) * 7) * (under ? 0.14 : 0.22) * (1 - u);
      const margin = Math.pow(Math.abs(v), 3) * 0.22;
      const along = 0.88 + 0.16 * Math.sin(Math.PI * Math.min(1, u * 1.2));
      return scaleRgb(mixRgb(base, under ? OLIVE.underLight : OLIVE.topLight, rib), along * (1 - margin));
    };
    const shoot = (x: number, y: number, angle: number, length: number, pairs: number, leafLength: number, stemWidth: number) => {
      const pts = curve(x, y, angle, length, (random() - 0.5) * 0.9, 7);
      p.stroke(pts, t => stemWidth * (1 - t * 0.6), () => jitterRgb(OLIVE.stem, random, 0.2));
      const leaves: Array<() => void> = [];
      for (let k = 0; k < pairs; k++) {
        const t = 0.16 + (k / Math.max(1, pairs - 1)) * 0.78;
        const [nx, ny] = pointOn(pts, t);
        const along = angleOn(pts, t);
        for (const side of [-1, 1]) {
          if (random() < 0.08) continue;
          const spread = (0.45 + random() * 0.55) * (1 - t * 0.35);
          const len = leafLength * (0.78 + random() * 0.32) * (1 - t * 0.22);
          // Leaves seen at an angle look narrower; a few nearly edge-on.
          const width = len * (0.085 + random() * 0.05) * (random() < 0.2 ? 0.45 : 1);
          const under = random() < 0.32;
          const tone = random();
          leaves.push(() => p.leaf(nx, ny, along + side * spread, len, width, leafColor(under, tone), 0.75));
        }
      }
      // A terminal pair of young leaves at the tip.
      const [tx, ty] = pts[pts.length - 1];
      const tipAngle = angleOn(pts, 1);
      leaves.push(() => p.leaf(tx, ty, tipAngle - 0.18, leafLength * 0.55, leafLength * 0.05, leafColor(false, 0.85), 0.75));
      leaves.push(() => p.leaf(tx, ty, tipAngle + 0.2, leafLength * 0.5, leafLength * 0.05, leafColor(true, 0.7), 0.75));
      return { pts, leaves };
    };
    // Main twig rising from the bottom centre, two or three side shoots.
    const main = shoot(ox + cell * (0.46 + random() * 0.08), cell * 0.02, (random() - 0.5) * 0.35, cell * 0.9, 7, cell * 0.3, cell * 0.012);
    const all = [...main.leaves];
    const sides = 2 + Math.floor(random() * 2);
    for (let s = 0; s < sides; s++) {
      const t = 0.22 + s * 0.24 + random() * 0.08;
      const [sx, sy] = pointOn(main.pts, t);
      const side = s % 2 ? 1 : -1;
      const sub = shoot(sx, sy, angleOn(main.pts, t) + side * (0.55 + random() * 0.4), cell * (0.38 + random() * 0.14), 4, cell * 0.24, cell * 0.007);
      all.push(...sub.leaves);
    }
    // Leaves are painted after every stem so twigs never cross over a leaf.
    for (let i = all.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
    all.forEach(draw => draw());
  }
  return p.toTexture(8);
}

// ---- Cypress ----------------------------------------------------------------------------------------

const CYPRESS = { dark: hex('#17220f'), base: hex('#26361a'), light: hex('#4c6127'), tip: hex('#6b7a34'), stem: hex('#3c3324') };

/** Dense scale-leaf sprays of Italian cypress: fans of knobbly branchlets, dark with lighter tips. */
export function cypressSprayAtlas(seed: number, columns = 2, cell = 256) {
  const p = new Painter(cell * columns, cell);
  const random = seeded(seed);
  for (let column = 0; column < columns; column++) {
    const ox = column * cell;
    const axis = curve(ox + cell * 0.5, cell * 0.02, (random() - 0.5) * 0.2, cell * 0.94, (random() - 0.5) * 0.3, 8);
    p.stroke(axis, t => cell * 0.014 * (1 - t * 0.7), () => CYPRESS.stem);
    const branchlets = 15;
    for (let b = 0; b < branchlets; b++) {
      const t = 0.08 + (b / branchlets) * 0.88;
      const [bx, by] = pointOn(axis, t);
      const side = b % 2 ? 1 : -1;
      const reach = cell * (0.36 - t * 0.2) * (0.8 + random() * 0.4);
      const pts = curve(bx, by, angleOn(axis, t) + side * (0.42 + random() * 0.35), reach, -side * 0.35, 5);
      // Knobbly scale foliage: overlapping small lobes along each branchlet and its forks.
      const lobes = (line: Array<[number, number]>, size: number) => {
        for (let k = 0; k <= 9; k++) {
          const s = k / 9;
          const [lx, ly] = pointOn(line, s);
          const r = size * (1 - s * 0.55) * (0.8 + random() * 0.4);
          const tone = Math.min(1, s * 0.9 + random() * 0.35);
          const c = tone > 0.75 ? mixRgb(CYPRESS.light, CYPRESS.tip, random()) : mixRgb(CYPRESS.dark, CYPRESS.base, tone * 1.3);
          p.disc(lx + (random() - 0.5) * r, ly + (random() - 0.5) * r, r, r * (0.7 + random() * 0.4), random() * 3, rr => scaleRgb(c, 1.08 - rr * 0.3));
        }
      };
      lobes(pts, cell * 0.04);
      for (let f = 0; f < 3; f++) {
        const s = 0.25 + f * 0.25;
        const [fx, fy] = pointOn(pts, s);
        const fork = curve(fx, fy, angleOn(pts, s) + (random() - 0.5) * 1.6, reach * 0.45, (random() - 0.5) * 0.6, 3);
        lobes(fork, cell * 0.03);
      }
    }
  }
  return p.toTexture(4);
}

// ---- Meadow -----------------------------------------------------------------------------------------

export const MEADOW_VARIANTS = ['green', 'dry', 'mixed', 'poppy', 'daisy', 'lavender'] as const;
export type MeadowVariant = typeof MEADOW_VARIANTS[number];

const GRASS = {
  green: [hex('#4d6a2a'), hex('#5f7c33'), hex('#3c5622'), hex('#748a3e')],
  dry: [hex('#b49a5c'), hex('#c8b07a'), hex('#9a8048'), hex('#d6c18c')],
  tipDry: hex('#e0cf9c'),
  lavenderLeaf: [hex('#6f7a62'), hex('#83907a'), hex('#5c6852')],
};

/**
 * Meadow tufts in tall cells (`MEADOW_VARIANTS` order): green grass, dry golden grass
 * with oat and barley heads, a mixed tuft, poppies, chamomile and crown daisies, and
 * lavender. Each cell is 1 wide by 2 tall; ground at v = 0.
 */
export function meadowAtlas(seed: number, cellWidth = 192, cellHeight = 384) {
  const columns = MEADOW_VARIANTS.length;
  const p = new Painter(cellWidth * columns, cellHeight);
  const random = seeded(seed);
  const pick = <T>(list: T[]) => list[Math.floor(random() * list.length)];
  MEADOW_VARIANTS.forEach((variant, column) => {
    const ox = column * cellWidth, cx = ox + cellWidth * 0.5, W = cellWidth, H = cellHeight;
    const blade = (dry: number, heightScale: number, lean = 1) => {
      const x = cx + (random() - 0.5) * W * 0.32;
      const height = H * (0.3 + random() * 0.62) * heightScale;
      const angle = (x - cx) / W * 1.1 * lean + (random() - 0.5) * 0.5;
      const pts = curve(x, 0, angle, height, (random() - 0.5) * 0.9 + Math.sign(angle) * 0.5, 6);
      const isDry = random() < dry;
      const base = isDry ? pick(GRASS.dry) : pick(GRASS.green);
      const tip = isDry ? GRASS.tipDry : mixRgb(base, GRASS.dry[1], 0.55);
      const w = W * (0.008 + random() * 0.012);
      p.stroke(pts, t => w * (1 - Math.pow(t, 1.4)) + 0.25, (t, across) => scaleRgb(mixRgb(base, tip, Math.pow(t, 1.6)), (0.62 + 0.38 * Math.min(1, t * 2.5)) * (1 - 0.15 * across)));
      return pts;
    };
    const seedStalk = (kind: 'oat' | 'barley', heightScale: number) => {
      const x = cx + (random() - 0.5) * W * 0.4;
      const height = H * (0.62 + random() * 0.34) * heightScale;
      const pts = curve(x, 0, (x - cx) / W * 0.9 + (random() - 0.5) * 0.25, height, (random() - 0.5) * 0.6, 6);
      const straw = pick(GRASS.dry);
      p.stroke(pts, t => W * 0.006 * (1 - t * 0.5) + 0.2, () => straw);
      const [tx, ty] = pts[pts.length - 1];
      const a = angleOn(pts, 1);
      if (kind === 'barley') {
        // A bristled spike: overlapping small grains with long awns.
        for (let k = 0; k < 9; k++) {
          const s = k / 9;
          const gx = tx - Math.sin(a) * H * 0.07 * (1 - s), gy = ty - Math.cos(a) * H * 0.07 * (1 - s);
          for (const side of [-1, 1]) {
            p.leaf(gx, gy, a + side * 0.35, H * 0.022, W * 0.012, () => mixRgb(GRASS.dry[1], GRASS.tipDry, random()), 0.8);
            p.stroke([[gx, gy], [gx + Math.sin(a + side * 0.3) * H * 0.07, gy + Math.cos(a + side * 0.3) * H * 0.07]], () => 0.35, () => GRASS.tipDry, 0.7);
          }
        }
      } else {
        // Wild oat: drooping spikelets hanging from fine branches.
        for (let k = 0; k < 7; k++) {
          const s = 0.55 + k * 0.065;
          const [sx, sy] = pointOn(pts, Math.min(1, s));
          const side = k % 2 ? 1 : -1;
          const hang = a + side * (1.9 + random() * 0.6);
          const ex = sx + Math.sin(a + side * 0.9) * W * 0.05, ey = sy + Math.cos(a + side * 0.9) * W * 0.05;
          p.stroke([[sx, sy], [ex, ey]], () => 0.35, () => straw);
          p.leaf(ex, ey, hang, H * 0.04, W * 0.014, (u) => scaleRgb(mixRgb(GRASS.dry[1], GRASS.tipDry, u), 0.95), 0.9);
        }
      }
    };
    const flowerStem = (height: number) => {
      const x = cx + (random() - 0.5) * W * 0.5;
      const pts = curve(x, 0, (x - cx) / W * 0.7 + (random() - 0.5) * 0.3, height, (random() - 0.5) * 0.5, 6);
      p.stroke(pts, t => W * 0.006 * (1 - t * 0.4) + 0.25, () => GRASS.green[0]);
      return pts[pts.length - 1];
    };
    if (variant === 'green') {
      for (let i = 0; i < 64; i++) blade(0.1, 0.95);
    } else if (variant === 'dry') {
      for (let i = 0; i < 46; i++) blade(0.82, 0.85);
      for (let i = 0; i < 9; i++) seedStalk(random() < 0.5 ? 'oat' : 'barley', 1);
    } else if (variant === 'mixed') {
      for (let i = 0; i < 30; i++) blade(0.25, 0.7);
      for (let i = 0; i < 14; i++) blade(0.85, 1);
      for (let i = 0; i < 5; i++) seedStalk(random() < 0.6 ? 'oat' : 'barley', 0.95);
      // A few broad plantain leaves low in the clump.
      for (let i = 0; i < 4; i++) p.leaf(cx + (random() - 0.5) * W * 0.25, 0, (random() - 0.5) * 1.6, H * (0.16 + random() * 0.08), W * 0.06, (u, v) => scaleRgb(GRASS.green[1], 0.8 + 0.25 * u - 0.15 * Math.abs(v)), 0.7);
    } else if (variant === 'poppy') {
      for (let i = 0; i < 26; i++) blade(0.2, 0.55);
      for (let i = 0; i < 5; i++) {
        const [fx, fy] = flowerStem(H * (0.45 + random() * 0.42));
        if (random() < 0.25) { p.disc(fx, fy, W * 0.03, W * 0.045, random(), () => GRASS.green[2]); continue; }
        const r = W * (0.085 + random() * 0.04), tilt = (random() - 0.5) * 0.6;
        // Four crumpled petals as a shallow cup, a dark centre.
        p.disc(fx - r * 0.35, fy + r * 0.2, r * 0.75, r * 0.62, tilt, rr => scaleRgb(hex('#a81f12'), 1.1 - rr * 0.3));
        p.disc(fx + r * 0.35, fy + r * 0.2, r * 0.75, r * 0.62, -tilt, rr => scaleRgb(hex('#b5241a'), 1.1 - rr * 0.3));
        p.disc(fx, fy + r * 0.45, r * 0.7, r * 0.55, tilt * 0.5, rr => scaleRgb(hex('#d1351f'), 1.15 - rr * 0.35));
        p.disc(fx, fy + r * 0.32, r * 0.2, r * 0.14, 0, () => hex('#1c1410'));
      }
    } else if (variant === 'daisy') {
      for (let i = 0; i < 28; i++) blade(0.15, 0.5);
      for (let i = 0; i < 8; i++) {
        const [fx, fy] = flowerStem(H * (0.35 + random() * 0.4));
        const yellow = random() < 0.4;
        const r = W * (0.05 + random() * 0.025);
        const petal = yellow ? hex('#e9b923') : hex('#f2efe6');
        // Seen from the side: a flattened ring of petals around a domed centre.
        p.disc(fx, fy, r, r * 0.42, (random() - 0.5) * 0.3, rr => scaleRgb(petal, 1.05 - rr * 0.2));
        p.disc(fx, fy + r * 0.18, r * 0.34, r * 0.24, 0, () => (yellow ? hex('#c9861a') : hex('#e2b52c')));
      }
    } else {
      // Lavender: a grey-green cushion of needle leaves and many purple spikes.
      for (let i = 0; i < 50; i++) {
        const x = cx + (random() - 0.5) * W * 0.5;
        const pts = curve(x, 0, (x - cx) / W * 1.6 + (random() - 0.5) * 0.4, H * (0.16 + random() * 0.18), (random() - 0.5) * 0.6, 4);
        const c = pick(GRASS.lavenderLeaf);
        p.stroke(pts, t => W * 0.009 * (1 - t * 0.8) + 0.3, t => scaleRgb(c, 0.7 + 0.4 * t));
      }
      for (let i = 0; i < 22; i++) {
        const x = cx + (random() - 0.5) * W * 0.36;
        const height = H * (0.48 + random() * 0.38);
        const pts = curve(x, 0, (x - cx) / W * 1.5 + (random() - 0.5) * 0.25, height, (random() - 0.5) * 0.3, 5);
        p.stroke(pts, () => W * 0.004 + 0.25, () => GRASS.lavenderLeaf[0]);
        const a = angleOn(pts, 1);
        const [tx, ty] = pts[pts.length - 1];
        for (let k = 0; k < 8; k++) {
          const s = k / 8;
          const sx = tx - Math.sin(a) * H * 0.12 * s, sy = ty - Math.cos(a) * H * 0.12 * s;
          const c = mixRgb(hex('#5d4a8c'), hex('#8f7cc0'), random() * 0.7 + (1 - s) * 0.3);
          p.disc(sx + (random() - 0.5) * W * 0.012, sy, W * (0.016 - s * 0.004), W * 0.022, 0, rr => scaleRgb(c, 1.05 - rr * 0.3));
        }
      }
    }
  });
  return p.toTexture(4);
}
