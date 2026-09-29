import { describe, expect, it } from 'vitest';
import { DESIGN_WIDTH, MAX_PAINT_PIXELS, paintSize, seaLayout, strokeCell } from './layout';
import { RepaintCycle } from './repaint';

describe('sea composition', () => {
  it('keeps the surf, the sun and the pine in view on every screen shape', () => {
    for (const aspect of [0.4, 390 / 844, 0.75, 1, 4 / 3, 16 / 9, 2.4, 0, Number.NaN]) {
      const layout = seaLayout(aspect);
      const right = layout.cropLeft + layout.cropWidth;
      expect(layout.cropLeft).toBeLessThanOrEqual(1.02);
      expect(right).toBeGreaterThanOrEqual(1.02);
      expect(layout.sunX).toBeGreaterThan(layout.cropLeft);
      expect(layout.sunX).toBeLessThan(layout.cropLeft + layout.cropWidth * 0.3);
      expect(layout.treeX).toBeGreaterThan(layout.cropLeft + layout.cropWidth * 0.8);
      expect(layout.treeX).toBeLessThan(right);
      expect(layout.sunY).toBeGreaterThan(layout.horizon);
    }
  });

  it('shows the whole composition at 16:9 and widens it evenly beyond', () => {
    expect(seaLayout(16 / 9)).toMatchObject({ cropLeft: 0, cropWidth: 16 / 9 });
    const wide = seaLayout(2.4);
    expect(wide.cropLeft).toBeCloseTo((DESIGN_WIDTH - 2.4) / 2, 6);
    // Phones get a smaller pine so it does not fill the screen.
    expect(seaLayout(390 / 844).treeScale).toBeLessThan(seaLayout(16 / 9).treeScale);
  });

  it('sizes strokes to the view within legible bounds', () => {
    expect(strokeCell(1920, 1080)).toBeCloseTo(1080 * 0.0125, 5);
    expect(strokeCell(200, 300)).toBe(6);
    expect(strokeCell(5000, 3000)).toBe(18);
  });

  it('caps the paint surface on huge screens', () => {
    const size = paintSize(2560, 1440, 2, 1.25);
    expect(size.width * size.height).toBeLessThanOrEqual(MAX_PAINT_PIXELS * 1.01);
    expect(size.width / size.height).toBeCloseTo(2560 / 1440, 2);
    expect(paintSize(390, 844, 3, 1.25)).toEqual({ width: 488, height: 1055 });
  });
});

describe('repaint cycle', () => {
  it('rests, builds the hidden set band by band, lights it, then paints it over', () => {
    const cycle = new RepaintCycle(3, 2, 1, 0.5);
    expect(cycle.update(0.4)).toBeNull();
    expect(cycle.view).toEqual({ shown: 0, painting: null, progress: 0 });
    expect(cycle.update(0.2)).toEqual({ kind: 'strokes', set: 1, band: 0, bands: 3 });
    expect(cycle.update(0.016)).toEqual({ kind: 'strokes', set: 1, band: 1, bands: 3 });
    expect(cycle.update(0.016)).toEqual({ kind: 'strokes', set: 1, band: 2, bands: 3 });
    expect(cycle.update(0.016)).toEqual({ kind: 'light', set: 1 });
    expect(cycle.view.painting).toBe(1);
    cycle.update(1);
    expect(cycle.view.progress).toBeCloseTo(0.5, 5);
    cycle.update(1.2);
    // Fully painted over: the new set is now the one shown, and the next cycle builds the other.
    expect(cycle.view).toEqual({ shown: 1, painting: null, progress: 0 });
    cycle.update(1.01);
    expect(cycle.update(0.016)).toEqual({ kind: 'strokes', set: 0, band: 1, bands: 3 });
  });

  it('stands still without time passing', () => {
    const cycle = new RepaintCycle(2, 1, 1, 0);
    for (const dt of [0, -1, Number.NaN]) expect(cycle.update(dt)).toBeNull();
    expect(cycle.view).toEqual({ shown: 0, painting: null, progress: 0 });
  });
});
