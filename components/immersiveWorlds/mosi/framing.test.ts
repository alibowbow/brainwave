import { describe, it, expect } from 'vitest';
import { fittedFov, selectFrame } from './framing';
describe('Blender responsive framing', () => {
  it('selects five authored compositions', () => {
    expect([.5,.75,1,16/9,2].map(a=>selectFrame(a).name)).toEqual(['phone_1x2','tablet_3x4','fold_square','desktop_16x9','wide_2x1']);
  });
  it('handles invalid and narrow containers', () => {
    expect(selectFrame(NaN).name).toBe('fold_square');
    expect(Number.isFinite(fittedFov(24,.5,.01))).toBe(true);
  });
  it('uses cover cropping without stretching', () => {
    const base=fittedFov(38,16/9,16/9);
    expect(fittedFov(38,16/9,2)).toBeLessThan(base);
    expect(fittedFov(38,16/9,1)).toBe(base);
  });
});
