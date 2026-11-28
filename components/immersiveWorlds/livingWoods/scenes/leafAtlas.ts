import * as THREE from 'three';
import { canvasToFoliageTexture, type LeafPalette } from '../../shared/render/foliageTextures';
import { seeded } from '../../shared/render/noise';

/*
 * Dense leaf-spray atlases for the Living Woods trees and shrubs. Each column
 * is a different spray: several twigs fan up from the card's base (v = 0) and
 * carry many small overlapping leaves, so a card reads as a mass of foliage
 * rather than one twig with a few big leaves. Columns differ in fan, leaf
 * count and colour mix so neighbouring cards never repeat. Original drawing,
 * no external images.
 */

export interface SprayAtlasOptions {
  seed: number;
  palette: LeafPalette;
  /** Variants side by side (match treeGeometry's `atlasColumns`). */
  columns?: number;
  /** Pixel size of one square cell. */
  cell?: number;
  /** Leaf length as a fraction of the cell height. */
  leaf?: number;
  /** Width / length of a leaf. */
  aspect?: number;
  /** Leaves per twig. */
  leaves?: number;
  /** Twigs per spray. */
  twigs?: number;
  /** 0 pointed .. 1 rounded leaf shoulders. */
  round?: number;
  /** Serrated (toothed) margins. */
  toothed?: boolean;
}

type Ctx = CanvasRenderingContext2D;

function jitter(color: string, random: () => number, hue: number, light: number) {
  const c = new THREE.Color(color);
  const hsl = { h: 0, s: 0, l: 0 };
  c.getHSL(hsl);
  c.setHSL(hsl.h + (random() - 0.5) * hue, THREE.MathUtils.clamp(hsl.s * (0.85 + random() * 0.3), 0, 1), THREE.MathUtils.clamp(hsl.l * (1 + (random() - 0.5) * light), 0, 1));
  return `#${c.getHexString()}`;
}

function leafOutline(ctx: Ctx, length: number, width: number, round: number, toothed: boolean) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  if (!toothed) {
    ctx.bezierCurveTo(width * (0.55 + round * 0.5), -length * 0.1, width * (0.95 + round * 0.2), -length * (0.55 - round * 0.15), 0, -length);
    ctx.bezierCurveTo(-width * (0.95 + round * 0.2), -length * (0.55 - round * 0.15), -width * (0.55 + round * 0.5), -length * 0.1, 0, 0);
  } else {
    // Small forward-pointing teeth up one margin to the tip and back down the other.
    const teeth = 7;
    const margin = (t: number) => width * Math.sin(Math.PI * Math.pow(t, 0.8)) * (0.9 + round * 0.25);
    for (let i = 1; i <= teeth; i++) {
      const t = i / (teeth + 1);
      ctx.lineTo(margin(t) * 0.9, -length * t + length * 0.01);
      ctx.lineTo(margin(t) * 1.06, -length * t - length * 0.03);
    }
    ctx.lineTo(0, -length);
    for (let i = teeth; i >= 1; i--) {
      const t = i / (teeth + 1);
      ctx.lineTo(-margin(t) * 1.06, -length * t - length * 0.03);
      ctx.lineTo(-margin(t) * 0.9, -length * t + length * 0.01);
    }
  }
  ctx.closePath();
}

function drawSprayLeaf(ctx: Ctx, random: () => number, x: number, y: number, angle: number, length: number, width: number, body: string, edge: string, vein: string, round: number, toothed: boolean) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  // Fold: the half facing the light is a touch brighter than the other.
  const across = ctx.createLinearGradient(-width, 0, width, 0);
  across.addColorStop(0, edge);
  across.addColorStop(0.35, body);
  across.addColorStop(0.5, body);
  across.addColorStop(0.62, body);
  across.addColorStop(1, edge);
  leafOutline(ctx, length, width, round, toothed);
  ctx.fillStyle = across;
  ctx.fill();
  ctx.save();
  ctx.clip();
  const along = ctx.createLinearGradient(0, 0, 0, -length);
  along.addColorStop(0, 'rgba(15,25,8,0.3)');
  along.addColorStop(0.5, 'rgba(255,255,215,0.07)');
  along.addColorStop(1, 'rgba(20,25,8,0.12)');
  ctx.fillStyle = along;
  ctx.fillRect(-width * 1.4, -length, width * 2.8, length);
  ctx.fillStyle = 'rgba(255,255,220,0.10)';
  ctx.beginPath(); ctx.ellipse(width * 0.25, -length * 0.45, width * 0.3, length * 0.3, 0.2, 0, Math.PI * 2); ctx.fill();
  if (random() < 0.18) {
    ctx.fillStyle = 'rgba(110,85,30,0.35)';
    ctx.beginPath(); ctx.arc((random() - 0.5) * width * 0.8, -length * (0.3 + random() * 0.5), 0.8 + random() * width * 0.12, 0, Math.PI * 2); ctx.fill();
  }
  ctx.strokeStyle = vein;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = Math.max(0.6, width * 0.07);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -length * 0.93); ctx.stroke();
  ctx.globalAlpha = 0.22;
  ctx.lineWidth = Math.max(0.5, width * 0.035);
  for (let i = 1; i <= 4; i++) {
    const t = i / 5.2;
    for (const side of [-1, 1]) {
      ctx.beginPath(); ctx.moveTo(0, -length * t);
      ctx.quadraticCurveTo(side * width * 0.4, -length * (t + 0.03), side * width * 0.8, -length * (t + 0.1)); ctx.stroke();
    }
  }
  ctx.restore();
  ctx.restore();
}

/** A square-celled atlas of dense leaf sprays, `columns` variants side by side. */
export function leafSprayAtlas(o: SprayAtlasOptions): THREE.DataTexture {
  const columns = o.columns ?? 4;
  const size = o.cell ?? 384;
  const element = document.createElement('canvas');
  element.width = size * columns; element.height = size;
  const ctx = element.getContext('2d', { willReadFrequently: true })!;
  const random = seeded(o.seed);
  const leafLength = o.leaf ?? 0.17;
  const aspect = o.aspect ?? 0.42;
  const round = o.round ?? 0.3;
  const toothed = o.toothed ?? false;
  for (let column = 0; column < columns; column++) {
    const ox = column * size;
    const twigs = (o.twigs ?? 4) + (column % 2);
    type Leaf = { x: number; y: number; a: number; l: number; w: number; tone: number; depth: number };
    const leaves: Leaf[] = [];
    const twigPaths: Array<Array<[number, number]>> = [];
    for (let t = 0; t < twigs; t++) {
      const fan = ((t + 0.5) / twigs - 0.5) * (1.25 + 0.25 * (column % 3)) + (random() - 0.5) * 0.22;
      const length = size * (0.62 + random() * 0.3) * (1 - Math.abs(fan) * 0.25);
      const bend = (random() - 0.5) * 0.6;
      const path: Array<[number, number]> = [];
      let x = ox + size * (0.5 + (random() - 0.5) * 0.06), y = size * 0.99, a = fan;
      const steps = 10;
      for (let s = 0; s <= steps; s++) {
        path.push([x, y]);
        x += Math.sin(a) * length / steps; y -= Math.cos(a) * length / steps;
        a += bend / steps;
      }
      twigPaths.push(path);
      const count = Math.round((o.leaves ?? 11) * (0.85 + random() * 0.3));
      for (let i = 0; i < count; i++) {
        const u = 0.22 + (i / count) * 0.78;
        const k = Math.min(steps - 1, Math.floor(u * steps));
        const [px, py] = path[k];
        const [qx, qy] = path[k + 1];
        const dir = Math.atan2(qx - px, -(qy - py));
        const side = i % 2 ? 1 : -1;
        const tip = u > 0.93;
        const l = size * leafLength * (0.75 + random() * 0.45) * (tip ? 0.85 : 1 - (1 - u) * 0.25);
        leaves.push({
          x: px + (qx - px) * random(), y: py + (qy - py) * random(),
          a: tip ? dir + (random() - 0.5) * 0.3 : dir + side * (0.55 + random() * 0.6),
          l, w: l * aspect * (0.85 + random() * 0.3),
          tone: random(), depth: random() * 0.6 + u * 0.4,
        });
      }
    }
    // Twigs first, then leaves from the inner (older, darker) to the outer (younger, lighter).
    ctx.lineCap = 'round';
    for (const path of twigPaths) {
      for (let s = 1; s < path.length; s++) {
        ctx.strokeStyle = o.palette.stem;
        ctx.lineWidth = size * 0.012 * (1 - s / path.length * 0.7);
        ctx.beginPath(); ctx.moveTo(...path[s - 1]); ctx.lineTo(...path[s]); ctx.stroke();
      }
    }
    leaves.sort((a, b) => a.depth - b.depth);
    for (const leaf of leaves) {
      const pick = leaf.tone * 0.6 + leaf.depth * 0.4;
      const bodyBase = pick > 0.68 ? o.palette.light : pick < 0.3 ? o.palette.dark : o.palette.base;
      const body = jitter(bodyBase, random, 0.04, 0.28);
      const edge = jitter(o.palette.dark, random, 0.02, 0.2);
      const vein = jitter(o.palette.light, random, 0.02, 0.1);
      ctx.strokeStyle = o.palette.stem; ctx.lineWidth = size * 0.005;
      ctx.beginPath(); ctx.moveTo(leaf.x, leaf.y); ctx.lineTo(leaf.x + Math.sin(leaf.a) * leaf.l * 0.1, leaf.y - Math.cos(leaf.a) * leaf.l * 0.1); ctx.stroke();
      drawSprayLeaf(ctx, random, leaf.x + Math.sin(leaf.a) * leaf.l * 0.08, leaf.y - Math.cos(leaf.a) * leaf.l * 0.08, leaf.a, leaf.l, leaf.w, body, edge, vein, round, toothed);
    }
  }
  return canvasToFoliageTexture(element, 8);
}

/** Multiplies a tree's leaf (or bark) colour attribute by a tint, so trees of one species still differ. */
export function tintGeometry(geometry: THREE.BufferGeometry | null, tint: THREE.Color, variation = 0, random?: () => number) {
  const color = geometry?.getAttribute('color') as THREE.BufferAttribute | undefined;
  if (!color) return;
  // Cards come in blocks of 9 vertices; vary each card a little around the tint.
  for (let i = 0; i < color.count; i += 9) {
    const k = variation && random ? 1 + (random() - 0.5) * variation : 1;
    const warm = variation && random ? (random() - 0.5) * variation * 0.5 : 0;
    for (let j = i; j < Math.min(color.count, i + 9); j++) {
      color.setXYZ(j, color.getX(j) * tint.r * k * (1 + warm), color.getY(j) * tint.g * k, color.getZ(j) * tint.b * k * (1 - warm));
    }
  }
  color.needsUpdate = true;
}
