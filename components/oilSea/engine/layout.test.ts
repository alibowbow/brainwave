import { describe, expect, it } from 'vitest';
import { DESIGN_WIDTH, MAX_PAINT_PIXELS, paintSize, seaLayout } from './layout';

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

  it('caps the paint surface on huge screens', () => {
    const size = paintSize(2560, 1440, 2, 1.25);
    expect(size.width * size.height).toBeLessThanOrEqual(MAX_PAINT_PIXELS * 1.01);
    expect(size.width / size.height).toBeCloseTo(2560 / 1440, 2);
    expect(paintSize(390, 844, 3, 1.25)).toEqual({ width: 488, height: 1055 });
  });
});
