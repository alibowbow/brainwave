import { describe, expect, it, vi } from 'vitest';
import { HalfFloatType, PlaneGeometry, UnsignedByteType, WebGLCubeRenderTarget, WebGLRenderTarget } from 'three';
import type { WebGLRenderer } from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { configureReflectorTarget } from './reflectorCompatibility';

const COMPLETE = 0x8cd5, UNSUPPORTED = 0x8cdd, FRAMEBUFFER = 0x8d40;

/** Unit doubles model capability/status outcomes; these are not real GPU proof. */
function fixture(options: {
  float?: boolean;
  half?: boolean;
  statuses?: number[];
  checkError?: Error;
  allocationError?: Error;
  lost?: boolean;
  lostDuringCheck?: boolean;
} = {}) {
  const reflector = new Reflector(new PlaneGeometry(2, 4), { textureWidth: 512, textureHeight: 512, multisample: 0 });
  const target = reflector.getRenderTarget();
  const previous = new WebGLCubeRenderTarget(128);
  let current: WebGLRenderTarget | null = previous, cubeFace = 4, mip = 2, checks = 0;
  const initialized = new WeakSet<object>();
  const allocations: { type: number; internalFormat: string | null; width: number; height: number; samples: number }[] = [];
  const lifecycle: string[] = [];
  const dispose = vi.fn(() => { initialized.delete(target); initialized.delete(target.texture); lifecycle.push('dispose'); });
  target.addEventListener('dispose', dispose);
  const gl = {
    FRAMEBUFFER, FRAMEBUFFER_COMPLETE: COMPLETE,
    getExtension: vi.fn((name: string) => {
      lifecycle.push(`extension:${name}`);
      return (name === 'EXT_color_buffer_float' ? options.float : options.half) ? {} : null;
    }),
    isContextLost: vi.fn(() => !!options.lost || !!(options.lostDuringCheck && checks)),
    checkFramebufferStatus: vi.fn((binding: number) => {
      expect(binding).toBe(FRAMEBUFFER);
      expect(current).toBe(target);
      checks++;
      if (options.checkError) throw options.checkError;
      return options.statuses?.[checks - 1] ?? COMPLETE;
    }),
  };
  const renderer = {
    properties: { has: (value: object) => initialized.has(value) },
    getContext: () => gl,
    getRenderTarget: () => current,
    getActiveCubeFace: () => cubeFace,
    getActiveMipmapLevel: () => mip,
    setRenderTarget: vi.fn((next: WebGLRenderTarget | null, face = 0, level = 0) => {
      current = next; cubeFace = face; mip = level;
      if (next === target) {
        lifecycle.push('allocate');
        expect(initialized.has(target)).toBe(false);
        allocations.push({ type: target.texture.type, internalFormat: target.texture.internalFormat, width: target.width, height: target.height, samples: target.samples });
        initialized.add(target); initialized.add(target.texture);
        if (options.allocationError) throw options.allocationError;
      }
    }),
  };
  const verifyRestored = () => {
    expect(current).toBe(previous); expect(cubeFace).toBe(4); expect(mip).toBe(2);
    expect(renderer.setRenderTarget).toHaveBeenLastCalledWith(previous, 4, 2);
  };
  return { reflector, renderer: renderer as unknown as WebGLRenderer, gl, target, previous, allocations, lifecycle, dispose, initialized, verifyRestored };
}

describe('owned bamboo reflector allocation compatibility', () => {
  it.each([
    { float: true, half: false },
    { float: false, half: true },
    { float: true, half: true },
  ])('keeps full-size half-float with genuine float=$float/half=$half capability', capabilities => {
    const f = fixture(capabilities);
    const geometry = f.reflector.geometry, material = f.reflector.material;
    const result = configureReflectorTarget(f.reflector, f.renderer);
    expect(result).toMatchObject({ textureType: 'HalfFloatType', internalFormat: 'RGBA16F', forcedByte: false, framebufferComplete: true, width: 512, height: 512, samples: 0 });
    expect(result.extensions).toEqual({ colorBufferFloat: capabilities.float, colorBufferHalfFloat: capabilities.half });
    expect(f.allocations).toEqual([{ type: HalfFloatType, internalFormat: 'RGBA16F', width: 512, height: 512, samples: 0 }]);
    expect(f.lifecycle.slice(0, 3)).toEqual(['extension:EXT_color_buffer_float', 'extension:EXT_color_buffer_half_float', 'allocate']);
    expect(f.reflector.geometry).toBe(geometry); expect(f.reflector.material).toBe(material);
    expect(f.dispose).not.toHaveBeenCalled(); f.verifyRestored();
  });

  it('selects byte before the first allocation without either color-buffer extension', () => {
    const f = fixture();
    const result = configureReflectorTarget(f.reflector, f.renderer);
    expect(result.textureType).toBe('UnsignedByteType');
    expect(result.extensions).toEqual({ colorBufferFloat: false, colorBufferHalfFloat: false });
    expect(f.allocations.map(a => a.type)).toEqual([UnsignedByteType]);
    expect(f.allocations[0]).toMatchObject({ internalFormat: 'RGBA8', width: 512, height: 512, samples: 0 });
    f.verifyRestored();
  });

  it('forces real byte storage while reporting genuine extension support unchanged', () => {
    const f = fixture({ float: true, half: true });
    const result = configureReflectorTarget(f.reflector, f.renderer, { forceByte: true });
    expect(result).toMatchObject({ forcedByte: true, textureType: 'UnsignedByteType', extensions: { colorBufferFloat: true, colorBufferHalfFloat: true } });
    expect(f.allocations.map(a => a.type)).toEqual([UnsignedByteType]);
    f.verifyRestored();
  });

  it('releases an incomplete half-float allocation before retrying byte at the same size', () => {
    const f = fixture({ float: true, statuses: [UNSUPPORTED, COMPLETE] });
    const texture = f.target.texture;
    const result = configureReflectorTarget(f.reflector, f.renderer);
    expect(result.attempts).toEqual([{ textureType: 'HalfFloatType', framebufferStatus: UNSUPPORTED }, { textureType: 'UnsignedByteType', framebufferStatus: COMPLETE }]);
    expect(f.lifecycle.slice(-3)).toEqual(['allocate', 'dispose', 'allocate']);
    expect(f.allocations.map(a => [a.type, a.width, a.height])).toEqual([[HalfFloatType, 512, 512], [UnsignedByteType, 512, 512]]);
    expect(f.target.texture).toBe(texture); expect(f.dispose).toHaveBeenCalledTimes(1);
    f.verifyRestored();
  });

  it('rejects an incomplete byte target and releases it, never claiming a render pass', () => {
    const f = fixture({ statuses: [UNSUPPORTED] });
    expect(() => configureReflectorTarget(f.reflector, f.renderer)).toThrow(/UnsignedByteType:0x8cdd/);
    expect(f.dispose).toHaveBeenCalledTimes(1); f.verifyRestored();
  });

  it.each(['checkError', 'allocationError'] as const)('restores target, cube face and mip even after %s', kind => {
    const fault = new Error(`simulated ${kind}`);
    const f = fixture({ float: true, [kind]: fault });
    expect(() => configureReflectorTarget(f.reflector, f.renderer)).toThrow(fault);
    expect(f.dispose).toHaveBeenCalledTimes(1); f.verifyRestored();
  });

  it('treats context loss during checking as failure even if framebuffer status says complete', () => {
    const f = fixture({ float: true, lostDuringCheck: true });
    expect(() => configureReflectorTarget(f.reflector, f.renderer)).toThrow(/context was lost/);
    expect(f.dispose).toHaveBeenCalledTimes(1); f.verifyRestored();
  });

  it('does not attempt extension checks or allocations when the context is already lost', () => {
    const f = fixture({ lost: true });
    expect(() => configureReflectorTarget(f.reflector, f.renderer)).toThrow(/context is lost/);
    expect(f.gl.getExtension).not.toHaveBeenCalled(); expect(f.allocations).toHaveLength(0);
  });

  it.each(['target', 'texture'] as const)('rejects late configuration after %s initialization', kind => {
    const f = fixture({ float: true });
    f.initialized.add(kind === 'target' ? f.target : f.target.texture);
    expect(() => configureReflectorTarget(f.reflector, f.renderer)).toThrow(/before target or texture initialization/);
    expect(f.allocations).toHaveLength(0); expect(f.dispose).not.toHaveBeenCalled();
  });
});
