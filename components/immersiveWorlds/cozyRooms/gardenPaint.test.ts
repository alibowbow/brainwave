import { describe, expect, it } from 'vitest';
import type * as THREE from 'three';
import { Painter, cypressSprayAtlas, meadowAtlas, MEADOW_VARIANTS, oliveSprayAtlas } from './gardenPaint';

// The terrace garden's foliage atlases are painted in plain JS, so their
// layout contracts can be checked without a GPU or a DOM canvas.
type Pixels = { data: Uint8Array; width: number; height: number };
const pixels = (texture: THREE.DataTexture) => texture.image as unknown as Pixels;
const alphaAt = (p: Pixels, x: number, y: number) => p.data[(y * p.width + x) * 4 + 3];

function coverage(p: Pixels, x0: number, x1: number) {
  let opaque = 0;
  for (let y = 0; y < p.height; y++) for (let x = x0; x < x1; x++) if (alphaAt(p, x, y) > 127) opaque++;
  return opaque / ((x1 - x0) * p.height);
}

describe('terrace foliage atlases', () => {
  const atlases: Array<[string, () => THREE.DataTexture, number]> = [
    ['olive sprays', () => oliveSprayAtlas(11), 4],
    ['cypress sprays', () => cypressSprayAtlas(5), 2],
    ['meadow tufts', () => meadowAtlas(7), MEADOW_VARIANTS.length],
  ];

  it.each(atlases)('%s stay inside their cells, so no card shows a cut-off neighbour', (_name, make, columns) => {
    const texture = make();
    const p = pixels(texture);
    const cell = p.width / columns;
    for (let c = 0; c < columns; c++) {
      // Every cell carries a real drawing, neither a speck nor a filled square.
      const fill = coverage(p, c * cell, (c + 1) * cell);
      expect(fill).toBeGreaterThan(0.04);
      expect(fill).toBeLessThan(0.6);
      for (let y = 0; y < p.height; y++) {
        expect(alphaAt(p, c * cell, y)).toBe(0);
        expect(alphaAt(p, (c + 1) * cell - 1, y)).toBe(0);
      }
    }
    // Nothing touches the far edge (v = 1): a leaf cut there reads as a straight line.
    for (let x = 0; x < p.width; x++) expect(alphaAt(p, x, p.height - 1)).toBe(0);
    expect(texture.colorSpace).toBe('srgb');
    expect(texture.generateMipmaps).toBe(true);
    texture.dispose();
  });

  it('is deterministic per seed', () => {
    const a = pixels(oliveSprayAtlas(3)), b = pixels(oliveSprayAtlas(3)), c = pixels(oliveSprayAtlas(4));
    expect(Buffer.from(a.data).equals(Buffer.from(b.data))).toBe(true);
    expect(Buffer.from(a.data).equals(Buffer.from(c.data))).toBe(false);
  });

  it('dilates colour under transparent texels so mipmaps keep no dark fringe', () => {
    const painter = new Painter(32, 32);
    painter.disc(16, 16, 6, 6, 0, () => [0.4, 0.6, 0.2]);
    const p = pixels(painter.toTexture());
    const corner = p.data.slice(0, 4);
    expect(corner[3]).toBe(0);
    // The empty corner holds the leaf's average colour, not black.
    expect(corner[1]).toBeGreaterThan(100);
    expect(corner[1]).toBeGreaterThan(corner[2]);
  });

  it('clips drawing to the active cell', () => {
    const painter = new Painter(64, 16);
    painter.setClip(0, 0, 32, 16);
    painter.stroke([[4, 8], [60, 8]], () => 3, () => [1, 1, 1]);
    const p = pixels(painter.toTexture());
    expect(alphaAt(p, 20, 8)).toBe(255);
    expect(alphaAt(p, 40, 8)).toBe(0);
  });
});
