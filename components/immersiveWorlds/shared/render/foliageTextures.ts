import * as THREE from 'three';
import { seeded } from './noise';

/*
 * Procedural foliage atlases drawn in code (Canvas 2D), uploaded as mipmapped
 * DataTextures. Transparent texels take the average leaf colour so mipmaps and
 * bilinear filtering never pull dark fringes into alpha-tested edges. Rows are
 * flipped on upload: the bottom of each drawing is v = 0 (the stem end).
 * Browser only (needs a 2D canvas). Original drawings, no external images.
 */

export interface LeafPalette {
  /** Typical mid-leaf colour (sRGB hex). */
  base: string;
  /** Sunlit, younger leaf colour. */
  light: string;
  /** Older, shaded leaf colour. */
  dark: string;
  /** Twig / rachis colour. */
  stem: string;
}

type Ctx = CanvasRenderingContext2D;

function canvas(width: number, height: number) {
  const element = document.createElement('canvas');
  element.width = width; element.height = height;
  const ctx = element.getContext('2d', { willReadFrequently: true })!;
  return { element, ctx };
}

/** Uploads a drawing as an sRGB, mipmapped texture with dilated colour under transparent texels. */
export function canvasToFoliageTexture(element: HTMLCanvasElement, anisotropy = 4): THREE.DataTexture {
  const { width, height } = element;
  const source = element.getContext('2d')!.getImageData(0, 0, width, height).data;
  const data = new Uint8Array(width * height * 4);
  let r = 0, g = 0, b = 0, n = 0;
  for (let i = 0; i < source.length; i += 4) {
    if (source[i + 3] > 200) { r += source[i]; g += source[i + 1]; b += source[i + 2]; n++; }
  }
  const avg = n ? [r / n, g / n, b / n] : [90, 110, 60];
  for (let y = 0; y < height; y++) {
    const from = (height - 1 - y) * width * 4, to = y * width * 4;
    for (let x = 0; x < width * 4; x += 4) {
      const a = source[from + x + 3];
      // Blend partially covered texels toward the average so their colour stays leaf-like.
      const k = a / 255;
      data[to + x] = source[from + x] * k + avg[0] * (1 - k);
      data[to + x + 1] = source[from + x + 1] * k + avg[1] * (1 - k);
      data[to + x + 2] = source[from + x + 2] * k + avg[2] * (1 - k);
      data[to + x + 3] = a;
    }
  }
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
  return texture;
}

const hex = (c: THREE.Color) => `#${c.getHexString()}`;
function jitter(color: string, random: () => number, hue: number, light: number) {
  const c = new THREE.Color(color);
  const hsl = { h: 0, s: 0, l: 0 };
  c.getHSL(hsl);
  c.setHSL(hsl.h + (random() - 0.5) * hue, THREE.MathUtils.clamp(hsl.s * (0.85 + random() * 0.3), 0, 1), THREE.MathUtils.clamp(hsl.l * (1 + (random() - 0.5) * light), 0, 1));
  return hex(c);
}

/** One leaf from its base at (0,0) toward -y. `round` 0..1 widens the shoulder. */
function leafPath(ctx: Ctx, length: number, width: number, round: number) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(width * (0.55 + round * 0.5), -length * 0.08, width * (0.95 + round * 0.2), -length * (0.55 - round * 0.15), 0, -length);
  ctx.bezierCurveTo(-width * (0.95 + round * 0.2), -length * (0.55 - round * 0.15), -width * (0.55 + round * 0.5), -length * 0.08, 0, 0);
  ctx.closePath();
}

function drawLeaf(ctx: Ctx, random: () => number, x: number, y: number, angle: number, length: number, width: number, colors: { body: string; edge: string; vein: string }, round = 0.3, veins = 7) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  leafPath(ctx, length, width, round);
  const across = ctx.createLinearGradient(-width, 0, width, 0);
  across.addColorStop(0, colors.edge);
  across.addColorStop(0.42, colors.body);
  across.addColorStop(0.5, colors.body);
  across.addColorStop(0.58, colors.body);
  across.addColorStop(1, colors.edge);
  ctx.fillStyle = across;
  ctx.fill();
  ctx.save();
  ctx.clip();
  // Broad lengthwise shading: darker base, lighter shoulder, a dull tip.
  const along = ctx.createLinearGradient(0, 0, 0, -length);
  along.addColorStop(0, 'rgba(20,30,10,0.28)');
  along.addColorStop(0.45, 'rgba(255,255,220,0.06)');
  along.addColorStop(1, 'rgba(30,30,10,0.16)');
  ctx.fillStyle = along;
  ctx.fillRect(-width * 1.5, -length, width * 3, length);
  // Mottling and the odd blemish keep neighbouring leaves from matching.
  const spots = Math.round(18 * Math.max(1, width / 40));
  const spot = Math.min(width * 0.35, 14);
  for (let i = 0; i < spots; i++) {
    ctx.fillStyle = random() > 0.5 ? 'rgba(255,255,200,0.05)' : 'rgba(10,20,5,0.07)';
    ctx.beginPath();
    ctx.ellipse((random() - 0.5) * width * 1.4, -random() * length, 1.5 + random() * spot, 1.5 + random() * spot * 1.6, random() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  if (random() < 0.25) {
    ctx.fillStyle = 'rgba(90,70,20,0.35)';
    ctx.beginPath(); ctx.ellipse((random() - 0.5) * width, -length * (0.3 + random() * 0.5), 1.5 + random() * 3, 1.5 + random() * 3, 0, 0, Math.PI * 2); ctx.fill();
  }
  // Secondary veins curve forward from the midrib to the margin.
  ctx.strokeStyle = colors.vein;
  ctx.lineWidth = Math.max(0.6, width * 0.025);
  ctx.globalAlpha = 0.45;
  for (let i = 1; i <= veins; i++) {
    const t = i / (veins + 1.3);
    const vy = -length * t;
    const reach = width * Math.sin(Math.PI * Math.min(1, t * 1.05)) * 0.95;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(0, vy);
      ctx.quadraticCurveTo(side * reach * 0.45, vy - length * 0.03, side * reach, vy - length * 0.11);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = Math.max(0.8, width * 0.05);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -length * 0.96); ctx.stroke();
  ctx.restore();
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = colors.edge;
  ctx.lineWidth = 1;
  leafPath(ctx, length, width, round);
  ctx.stroke();
  ctx.restore();
}

function stroke(ctx: Ctx, points: Array<[number, number]>, width: number, color: string) {
  ctx.strokeStyle = color; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (let i = 1; i < points.length; i++) {
    ctx.lineWidth = width * (1 - (i / points.length) * 0.6);
    ctx.beginPath(); ctx.moveTo(...points[i - 1]); ctx.lineTo(...points[i]); ctx.stroke();
  }
}

/**
 * A leafy twig filling the square: alternate ovate leaves on a curved stem.
 * Two variants side by side (u 0..0.5 and 0.5..1) give cards some variety.
 */
export function broadleafClusterTexture(options: { seed: number; palette: LeafPalette; size?: number; round?: number; leafScale?: number; density?: number }) {
  const size = options.size ?? 512;
  const { element, ctx } = canvas(size * 2, size);
  const random = seeded(options.seed);
  const round = options.round ?? 0.3;
  for (let variant = 0; variant < 2; variant++) {
    const ox = variant * size;
    const pts: Array<[number, number]> = [];
    const bend = (random() - 0.5) * size * 0.18;
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      pts.push([ox + size * 0.5 + Math.sin(t * Math.PI) * bend + (random() - 0.5) * size * 0.01, size * (0.98 - t * 0.86)]);
    }
    const leaves = Math.round((10 + random() * 4) * (options.density ?? 1));
    const placed: Array<() => void> = [];
    for (let i = 0; i < leaves; i++) {
      const t = 0.12 + (i / leaves) * 0.86;
      const k = Math.min(11, Math.floor(t * 12));
      const [px, py] = pts[k];
      const side = i % 2 ? 1 : -1;
      const tipward = 1 - t * 0.35;
      const length = size * (0.24 + random() * 0.1) * tipward * (options.leafScale ?? 1);
      const width = length * (0.3 + round * 0.12) * (0.85 + random() * 0.3);
      const angle = side * (0.55 + random() * 0.55) * (1 - t * 0.4);
      const colors = {
        body: jitter(random() < 0.3 ? options.palette.light : random() < 0.5 ? options.palette.dark : options.palette.base, random, 0.035, 0.25),
        edge: jitter(options.palette.dark, random, 0.02, 0.2),
        vein: jitter(options.palette.light, random, 0.02, 0.1),
      };
      placed.push(() => {
        stroke(ctx, [[px, py], [px + Math.sin(angle) * length * 0.12, py - Math.cos(angle) * length * 0.12]], size * 0.008, options.palette.stem);
        drawLeaf(ctx, random, px + Math.sin(angle) * length * 0.1, py - Math.cos(angle) * length * 0.1, angle, length, width, colors, round);
      });
    }
    stroke(ctx, pts, size * 0.018, options.palette.stem);
    // Lower leaves first so younger tip leaves overlap them, as on a real shoot.
    placed.forEach(draw => draw());
    const [tx, ty] = pts[12];
    drawLeaf(ctx, random, tx, ty + size * 0.02, (random() - 0.5) * 0.3, size * 0.2, size * 0.065, {
      body: jitter(options.palette.light, random, 0.03, 0.2), edge: options.palette.dark, vein: options.palette.light,
    }, round);
  }
  return canvasToFoliageTexture(element);
}

/** One large leaf filling a tall canvas (close, hand-reachable leaves on cut-out cards). */
export function singleLeafTexture(options: { seed: number; palette: LeafPalette; width?: number; height?: number; round?: number; fill?: number }) {
  const w = options.width ?? 256, h = options.height ?? 512;
  const { element, ctx } = canvas(w, h);
  const random = seeded(options.seed);
  stroke(ctx, [[w * 0.5, h], [w * 0.5, h * 0.93]], w * 0.035, options.palette.stem);
  drawLeaf(ctx, random, w * 0.5, h * 0.94, 0, h * 0.92, w * (options.fill ?? 0.46), { body: options.palette.base, edge: options.palette.dark, vein: options.palette.light }, options.round ?? 0.3, 11);
  return canvasToFoliageTexture(element, 8);
}

/** A fern frond: stipe at the bottom, alternate pinnae of lobed pinnules tapering to the tip. */
export function fernFrondTexture(options: { seed: number; palette: LeafPalette; width?: number; height?: number }) {
  const w = options.width ?? 256, h = options.height ?? 1024;
  const { element, ctx } = canvas(w, h);
  const random = seeded(options.seed);
  const cx = w * 0.5;
  const rachis: Array<[number, number]> = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    rachis.push([cx + Math.sin(t * 2.3) * w * 0.03 * t, h * (0.995 - t * 0.98)]);
  }
  const pinnae = 26;
  for (let i = 0; i < pinnae; i++) {
    const t = 0.1 + (i / pinnae) * 0.88;
    const k = Math.min(23, Math.floor(t * 24));
    const [px, py] = rachis[k];
    for (const side of [-1, 1]) {
      const profile = Math.sin(Math.PI * Math.min(1, (t - 0.06) / 0.98)) ** 0.8 * (1 - t * 0.25);
      const length = w * 0.47 * profile * (0.92 + random() * 0.12);
      if (length < 4) continue;
      const angle = side * (Math.PI / 2 - 0.42 - t * 0.25);
      const color = jitter(random() < 0.4 ? options.palette.light : options.palette.base, random, 0.03, 0.2);
      const edge = jitter(options.palette.dark, random, 0.02, 0.15);
      ctx.save();
      ctx.translate(px, py - side * 2 + (side > 0 ? h * 0.006 : 0));
      ctx.rotate(angle);
      // Pinnules: overlapping lobes along the pinna, shrinking toward its tip.
      const lobes = Math.max(3, Math.round(length / (w * 0.035)));
      for (let j = 0; j < lobes; j++) {
        const s = j / lobes;
        const lw = w * 0.034 * (1 - s * 0.7) * (0.6 + profile * 0.5);
        const ly = -length * (0.06 + s * 0.92);
        for (const lobeSide of [-1, 1]) {
          ctx.save();
          ctx.translate(lobeSide * lw * 0.15, ly);
          ctx.rotate(lobeSide * 0.9);
          const g = ctx.createLinearGradient(0, 0, 0, -lw * 2.1);
          g.addColorStop(0, edge); g.addColorStop(0.5, color); g.addColorStop(1, edge);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.ellipse(0, -lw * 0.9, lw * 0.62, lw * 1.15, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      ctx.strokeStyle = jitter(options.palette.stem, random, 0.02, 0.1);
      ctx.lineWidth = Math.max(1, w * 0.008);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -length * 0.97); ctx.stroke();
      ctx.restore();
    }
  }
  stroke(ctx, rachis, w * 0.022, options.palette.stem);
  return canvasToFoliageTexture(element);
}

/** A drooping spray of narrow bamboo leaves fanned from a short twig. Two variants side by side. */
export function bambooSprayTexture(options: { seed: number; palette: LeafPalette; size?: number }) {
  const size = options.size ?? 512;
  const { element, ctx } = canvas(size * 2, size);
  const random = seeded(options.seed);
  for (let variant = 0; variant < 2; variant++) {
    const ox = variant * size;
    const base: [number, number] = [ox + size * 0.5, size * 0.97];
    const twig: Array<[number, number]> = [base];
    for (let i = 1; i <= 6; i++) twig.push([base[0] + (random() - 0.5) * size * 0.04 + i * size * 0.012 * (variant ? -1 : 1), base[1] - i * size * 0.07]);
    stroke(ctx, twig, size * 0.012, options.palette.stem);
    const leaves = 6 + Math.floor(random() * 3);
    for (let i = 0; i < leaves; i++) {
      const [px, py] = twig[Math.min(6, 2 + Math.floor((i / leaves) * 5))];
      const spread = (i / (leaves - 1) - 0.5) * 2.4 + (random() - 0.5) * 0.25;
      const length = size * (0.5 + random() * 0.2) * (1 - Math.abs(spread) * 0.12);
      const width = length * (0.085 + random() * 0.025);
      drawLeaf(ctx, random, px, py, spread, length, width, {
        body: jitter(random() < 0.35 ? options.palette.light : random() < 0.5 ? options.palette.dark : options.palette.base, random, 0.03, 0.22),
        edge: jitter(options.palette.dark, random, 0.02, 0.15),
        vein: jitter(options.palette.light, random, 0.02, 0.1),
      }, -0.25, 9);
    }
  }
  return canvasToFoliageTexture(element);
}

/** Four fallen leaves in a 2x2 atlas: brown, ochre, dark and a pale skeleton-thin leaf. */
export function litterTexture(options: { seed: number; colors: [string, string, string, string]; size?: number; narrow?: boolean }) {
  const size = options.size ?? 512;
  const { element, ctx } = canvas(size, size);
  const random = seeded(options.seed);
  const half = size / 2;
  options.colors.forEach((color, i) => {
    const x = (i % 2) * half + half / 2, y = Math.floor(i / 2) * half + half * 0.9;
    const length = half * (0.72 + random() * 0.12);
    const width = length * (options.narrow ? 0.11 + random() * 0.03 : 0.26 + random() * 0.14);
    const dark = new THREE.Color(color).multiplyScalar(0.55);
    drawLeaf(ctx, random, x, y, (random() - 0.5) * 0.2, length, width, { body: color, edge: hex(dark), vein: hex(new THREE.Color(color).lerp(new THREE.Color('#e8d8a8'), 0.4)) }, options.narrow ? -0.2 : i === 2 ? 0.6 : 0.25, 6);
    // Small bitten holes and decay spots.
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    for (let k = 0; k < 2 + Math.floor(random() * 3); k++) {
      ctx.beginPath(); ctx.arc(x + (random() - 0.5) * width * 0.9, y - random() * length * 0.85, 1 + random() * size * 0.008, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  });
  return canvasToFoliageTexture(element);
}
