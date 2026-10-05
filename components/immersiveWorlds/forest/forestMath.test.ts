import { describe, expect, it } from 'vitest';
import { forestPixelRatio, forestRandom, groundHeight, pondRadius } from './forestMath';

describe('deterministic forest layout', () => {
  it('recreates exactly the same layout from a seed, without sharing mutable state', () => {
    const first = forestRandom(7391);
    const second = forestRandom(7391);
    const different = forestRandom(7392);
    const expected = Array.from({ length: 128 }, () => first());
    expect(Array.from({ length: 128 }, () => second())).toEqual(expected);
    expect(Array.from({ length: 128 }, () => different())).not.toEqual(expected);
    // Creating or consuming another layout must not affect an existing stream.
    forestRandom(1)();
    expect(second()).toBe(first());
  });

  it('keeps every placement sample in the half-open unit interval', () => {
    for (const seed of [0, 1, -1, 7391, 0x7fffffff]) {
      const random = forestRandom(seed);
      for (let i = 0; i < 2048; i++) {
        const value = random();
        expect(Number.isFinite(value)).toBe(true);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
      }
    }
  });
});

describe('pool basin and dry shore', () => {
  // ForestEngine places the water at y=.075 m; this is a scene design invariant.
  const waterHeight = 0.075;
  const pointAt = (radius: number, angle: number) => [
    -0.18 + Math.cos(angle) * 2.55 * radius,
    -0.55 + Math.sin(angle) * 3.45 * radius,
  ] as const;

  it('measures the off-centre elliptical basin consistently in all directions', () => {
    expect(pondRadius(-0.18, -0.55)).toBe(0);
    for (const radius of [0.3, 0.75, 1, 1.2]) {
      for (let i = 0; i < 32; i++) {
        const [x, z] = pointAt(radius, i * Math.PI / 16);
        expect(pondRadius(x, z)).toBeCloseTo(radius, 12);
      }
    }
  });

  it('keeps the entire inner basin below the water, including uneven bed detail', () => {
    for (const radius of [0, 0.15, 0.3, 0.45, 0.6, 0.75]) {
      for (let i = 0; i < 64; i++) {
        const [x, z] = pointAt(radius, i * Math.PI / 32);
        expect(groundHeight(x, z)).toBeLessThan(waterHeight - 0.08);
      }
    }
  });

  it('keeps the surrounding shore above the pool in every direction', () => {
    for (const radius of [1.12, 1.3, 1.6, 2]) {
      for (let i = 0; i < 64; i++) {
        const [x, z] = pointAt(radius, i * Math.PI / 32);
        expect(groundHeight(x, z)).toBeGreaterThan(waterHeight + 0.1);
      }
    }
  });
});

describe('forest display resolution', () => {
  it('preserves native resolution on standard desktop and high-density folded displays', () => {
    for (const [width, height, deviceRatio] of [
      [1920, 1080, 1], [2560, 1440, 1], [1280, 720, 2],
      [344, 882, 2], [882, 344, 2], [800, 1000, 2],
    ]) {
      expect(forestPixelRatio(width, height, deviceRatio)).toBe(deviceRatio);
    }
  });

  it('bounds oversized buffers without reducing CSS-pixel resolution below one', () => {
    for (const [width, height, deviceRatio] of [
      [1920, 1080, 2], [2560, 1440, 2], [3840, 2160, 2], [5120, 2880, 3],
    ]) {
      const ratio = forestPixelRatio(width, height, deviceRatio);
      expect(ratio).toBeGreaterThanOrEqual(1);
      expect(ratio).toBeLessThanOrEqual(deviceRatio);
      expect(ratio).toBeLessThanOrEqual(2);
      // A native 4K/5K CSS viewport itself can exceed the 4.2 MP supersampling budget.
      expect(width * height * ratio * ratio).toBeLessThanOrEqual(Math.max(width * height, 4_200_000) + 0.001);
    }
  });

  it('handles an initially unmeasured mount and an unavailable device DPR', () => {
    expect(forestPixelRatio(0, 0, 0)).toBe(1);
    expect(forestPixelRatio(344, 882, 0)).toBe(1);
    expect(Number.isFinite(forestPixelRatio(0, 0, 2))).toBe(true);
  });
});
