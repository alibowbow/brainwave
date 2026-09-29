import { describe, expect, it } from 'vitest';
import { frameForAspect } from './layout';

const horizontalFov = (fov: number, aspect: number) => 2 * Math.atan(Math.tan((fov * Math.PI) / 360) * aspect) * 180 / Math.PI;

describe('fixed camera framing', () => {
  it('uses a calm 36° lens on wide screens looking straight at the window', () => {
    const frame = frameForAspect(16 / 9);
    expect(frame.fov).toBeCloseTo(36, 5);
    expect(frame.target.x).toBeCloseTo(0.02, 5);
  });

  it('keeps enough width on phones and slides toward the lamp and mug', () => {
    const phone = frameForAspect(390 / 776);
    expect(horizontalFov(phone.fov, 390 / 776)).toBeGreaterThanOrEqual(27.9);
    expect(phone.fov).toBeLessThanOrEqual(60);
    expect(phone.target.x).toBeGreaterThan(0.2);
  });

  it('never exceeds a cinema lens on ultra-wide monitors and survives odd sizes', () => {
    expect(frameForAspect(3.4).fov).toBe(33);
    for (const aspect of [0, Number.NaN, 0.2, 1, 10]) {
      const frame = frameForAspect(aspect);
      expect(Number.isFinite(frame.fov)).toBe(true);
      expect(frame.fov).toBeGreaterThan(30);
      expect(frame.fov).toBeLessThanOrEqual(60);
    }
  });
});
