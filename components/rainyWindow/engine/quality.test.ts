import { describe, expect, it } from 'vitest';
import { detectTier, DynamicResolution, isMobileDevice, QUALITY, samplesFor } from './quality';

describe('quality tier', () => {
  it('starts software rasterisers and weak phones low, phones medium and desktops high', () => {
    expect(detectTier({ renderer: 'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device))' })).toBe('low');
    expect(detectTier({ renderer: 'Mali-G52', mobile: true })).toBe('low');
    expect(detectTier({ renderer: 'Apple GPU', mobile: true, cores: 6, memory: 6 })).toBe('medium');
    expect(detectTier({ renderer: 'ANGLE (NVIDIA GeForce RTX 3070)', cores: 16 })).toBe('high');
  });

  it('keeps integrated laptop graphics off the top tier', () => {
    expect(detectTier({ renderer: 'ANGLE (Intel, Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0, D3D11)', cores: 8 })).toBe('medium');
    expect(detectTier({ renderer: 'ANGLE (Intel, Intel(R) Iris(R) Xe Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)', cores: 8 })).toBe('medium');
    expect(detectTier({ renderer: 'ANGLE (AMD, AMD Radeon(TM) Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)', cores: 8 })).toBe('medium');
    expect(detectTier({ renderer: 'ANGLE (Intel, Intel(R) Arc(TM) A770 Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)', cores: 16 })).toBe('high');
    expect(detectTier({ renderer: 'ANGLE (Apple, ANGLE Metal Renderer: Apple M2, Unspecified Version)', cores: 8 })).toBe('high');
  });

  it('recognises iPads that report a desktop browser', () => {
    const ipad = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
    expect(isMobileDevice(ipad, 5)).toBe(true);
    expect(isMobileDevice(ipad, 0)).toBe(false);
    expect(isMobileDevice('Mozilla/5.0 (Linux; Android 14)', 5)).toBe(true);
    expect(isMobileDevice('anything', 0, true)).toBe(true);
  });
});

describe('frame pacing', () => {
  const feed = (controller: DynamicResolution, frameMs: number, batches: number) => {
    for (let i = 0; i < 40 * batches; i++) controller.update(frameMs);
  };

  it('trades resolution first, then settles at a steady 30 fps rather than stuttering', () => {
    const controller = new DynamicResolution(0.55, 1, 1);
    feed(controller, 33, 1);
    expect(controller.rate).toBe(60);
    expect(controller.scale).toBeLessThan(0.8);
    expect(controller.scale).toBeGreaterThanOrEqual(0.72);
    feed(controller, 33, 2);
    expect(controller.rate).toBe(30);
    expect(controller.scale).toBe(1);
    // A steady 30 fps is on budget and stays put.
    feed(controller, 33.4, 10);
    expect(controller.rate).toBe(30);
    expect(controller.scale).toBe(1);
    // Too slow even for 30: resolution gives way down to the floor.
    feed(controller, 60, 12);
    expect(controller.scale).toBeGreaterThanOrEqual(0.55);
    expect(controller.scale).toBeLessThan(0.7);
  });

  it('recovers resolution when there is headroom', () => {
    const controller = new DynamicResolution(0.55, 1, 1);
    feed(controller, 33, 1);
    const lowered = controller.scale;
    feed(controller, 16.7, 30);
    expect(controller.scale).toBeGreaterThan(lowered);
    expect(controller.scale).toBeLessThanOrEqual(1);
    expect(controller.rate).toBe(60);
  });

  it('reads a 90 Hz display as on time and ignores stalls such as a hidden tab', () => {
    const display90 = new DynamicResolution(0.55, 1, 1);
    feed(display90, 22.2, 10);
    expect(display90.scale).toBe(1);
    expect(display90.rate).toBe(60);
    const stalls = new DynamicResolution(0.55, 1, 1);
    for (let i = 0; i < 400; i++) stalls.update(i % 10 === 0 ? 900 : 16.6);
    expect(stalls.scale).toBe(1);
  });
});

describe('msaa', () => {
  it('uses fewer samples on dense screens', () => {
    expect(samplesFor(QUALITY.high, 1)).toBe(4);
    expect(samplesFor(QUALITY.high, 1.5)).toBe(2);
    expect(samplesFor(QUALITY.low, 1)).toBe(0);
  });
});
