import { describe, expect, it } from 'vitest';
import type * as THREE from 'three';
import { bloomChain, msaaSamples } from './targets';
import { fbm3, noise3, ridged3, seeded } from './noise';
import { HdrPipeline, isSoftwareRenderer, supportsHdrTargets } from './hdrPipeline';

describe('shared render targets', () => {
  it('builds a bloom pyramid from half resolution down to an 8 px floor', () => {
    expect(bloomChain(1280, 800)).toEqual([[640, 400], [320, 200], [160, 100], [80, 50], [40, 25], [20, 12]]);
    expect(bloomChain(390, 844).at(-1)![0]).toBeGreaterThanOrEqual(8);
    expect(bloomChain(4, 4)).toHaveLength(1);
  });

  it('uses fewer MSAA samples on dense screens and never exceeds the device limit', () => {
    expect(msaaSamples(1, 8)).toBe(4);
    expect(msaaSamples(2, 8)).toBe(2);
    expect(msaaSamples(1, 0)).toBe(0);
  });
});

describe('procedural noise', () => {
  it('is deterministic, finite and bounded', () => {
    const samples = Array.from({ length: 400 }, (_, i) => noise3(i * .37 - 40, i * .11, -i * .23));
    expect(samples).toEqual(Array.from({ length: 400 }, (_, i) => noise3(i * .37 - 40, i * .11, -i * .23)));
    expect(samples.every(value => Number.isFinite(value) && Math.abs(value) < 1.6)).toBe(true);
    expect(Math.max(...samples) - Math.min(...samples)).toBeGreaterThan(.8);
    expect(noise3(3, 4, 5)).toBeCloseTo(0, 6);
    expect(Number.isFinite(fbm3(1.3, 2.2, -9.1, 5))).toBe(true);
    expect(ridged3(1.3, 2.2, -9.1)).toBeGreaterThanOrEqual(0);
  });

  it('seeds placement streams reproducibly', () => {
    const a = seeded(7), b = seeded(7);
    const first = Array.from({ length: 5 }, a);
    expect(first).toEqual(Array.from({ length: 5 }, b));
    expect(first.every(value => value >= 0 && value < 1)).toBe(true);
  });
});

describe('HDR pipeline capability', () => {
  it('declines without float colour buffers so engines keep direct rendering', () => {
    const renderer = { getContext: () => ({ getExtension: () => null, checkFramebufferStatus: () => 0 }) } as unknown as THREE.WebGLRenderer;
    expect(supportsHdrTargets(renderer)).toBe(false);
    expect(HdrPipeline.create(renderer)).toBeNull();
  });

  const withRenderer = (name: string) => ({
    getContext: () => ({
      RENDERER: 0x1f01,
      getExtension: (ext: string) => ext === 'WEBGL_debug_renderer_info' ? { UNMASKED_RENDERER_WEBGL: 0x9246 } : {},
      getParameter: (pname: number) => pname === 0x9246 ? name : 'WebKit WebGL',
      checkFramebufferStatus: () => 0,
    }),
  }) as unknown as THREE.WebGLRenderer;

  it('recognises CPU rasterisers and declines there so pages stay responsive', () => {
    const swiftShader = withRenderer('ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)');
    expect(isSoftwareRenderer(swiftShader)).toBe(true);
    expect(isSoftwareRenderer(withRenderer('llvmpipe (LLVM 15.0.7, 256 bits)'))).toBe(true);
    expect(isSoftwareRenderer(withRenderer('ANGLE (Qualcomm, Adreno (TM) 740, OpenGL ES 3.2)'))).toBe(false);
    expect(isSoftwareRenderer({ getContext: () => ({}) } as unknown as THREE.WebGLRenderer)).toBe(false);
    expect(HdrPipeline.create(swiftShader)).toBeNull();
  });
});
