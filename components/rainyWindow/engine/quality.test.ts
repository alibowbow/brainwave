import { describe, expect, it } from 'vitest';
import { detectTier, DynamicResolution } from './quality';

describe('quality tier', () => {
  it('starts software rasterisers and weak phones low, phones medium and desktops high', () => {
    expect(detectTier({ renderer: 'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device))' })).toBe('low');
    expect(detectTier({ renderer: 'Mali-G52', mobile: true })).toBe('low');
    expect(detectTier({ renderer: 'Apple GPU', mobile: true, cores: 6, memory: 6 })).toBe('medium');
    expect(detectTier({ renderer: 'ANGLE (NVIDIA GeForce RTX 3070)', cores: 16 })).toBe('high');
  });
});

describe('dynamic resolution', () => {
  it('drops resolution under sustained load and recovers when there is headroom', () => {
    const controller = new DynamicResolution(0.55, 1, 1);
    for (let i = 0; i < 40 * 4; i++) controller.update(33);
    expect(controller.scale).toBeLessThan(0.8);
    expect(controller.scale).toBeGreaterThanOrEqual(0.55);
    const lowered = controller.scale;
    for (let i = 0; i < 40 * 30; i++) controller.update(16.7);
    expect(controller.scale).toBeGreaterThan(lowered);
    expect(controller.scale).toBeLessThanOrEqual(1);
  });

  it('ignores stalls such as a hidden tab', () => {
    const controller = new DynamicResolution(0.55, 1, 1);
    for (let i = 0; i < 400; i++) controller.update(i % 10 === 0 ? 900 : 16.6);
    expect(controller.scale).toBe(1);
  });
});
