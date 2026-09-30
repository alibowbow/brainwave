import { describe, expect, it } from 'vitest';
import { Raster } from './raster';

describe('raster', () => {
  it('bleeds the drawing into the empty pixels round it, leaving them transparent', () => {
    const image = new Raster(12, 6);
    image.ellipse(6, 3, 2, 2, 0, 40, 160, 60);
    const at = (x: number, y: number) => Array.from(image.data.subarray((y * 12 + x) * 4, (y * 12 + x) * 4 + 4));
    expect(at(0, 0)).toEqual([0, 0, 0, 0]);
    image.bleed();
    // Beside the drawing and far from it, the empty pixels now carry its colour.
    for (const [x, y] of [[3, 3], [0, 0], [11, 5], [6, 0]]) {
      const [r, g, b, a] = at(x, y);
      expect(a).toBe(0);
      expect([r, g, b]).toEqual([40, 160, 60]);
    }
    // The drawing itself is untouched.
    expect(at(6, 3)).toEqual([40, 160, 60, 255]);
  });
});
