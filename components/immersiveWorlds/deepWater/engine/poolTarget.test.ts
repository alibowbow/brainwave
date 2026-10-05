import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { preferBytePoolTargets, preparePoolTarget } from './poolTarget';

const COMPLETE = 0x8cd5;
const INCOMPLETE = 0x8cd6;

type Binding = {
  target: THREE.WebGLRenderTarget | null;
  face: number;
  mip: number;
  type?: THREE.TextureDataType;
  format?: THREE.AnyPixelFormat;
  internalFormat?: string | null;
};

/** CPU contract double only: these tests do not establish actual GPU support. */
function fixture(options: {
  float?: boolean;
  halfFloat?: boolean;
  statuses?: number[];
  bindError?: Error;
  checkError?: Error;
} = {}) {
  const target = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: 0 });
  const previous = new THREE.WebGLRenderTarget(8, 8);
  const saved = { target: previous, face: 4, mip: 2 };
  let current: Binding = { ...saved };
  const bindings: Binding[] = [];
  const events: string[] = [];
  const statuses = [...(options.statuses ?? [COMPLETE])];
  target.addEventListener('dispose', () => events.push('dispose'));
  const gl = {
    FRAMEBUFFER: 0x8d40,
    FRAMEBUFFER_COMPLETE: COMPLETE,
    getExtension: vi.fn((name: string) => {
      events.push(`extension:${name}`);
      if (name === 'EXT_color_buffer_float' && options.float) return {};
      if (name === 'EXT_color_buffer_half_float' && options.halfFloat) return {};
      return null;
    }),
    checkFramebufferStatus: vi.fn((binding: number) => {
      expect(binding).toBe(0x8d40);
      events.push('check');
      if (options.checkError) throw options.checkError;
      return statuses.shift() ?? COMPLETE;
    }),
  };
  const renderer = {
    getContext: () => gl,
    getRenderTarget: () => current.target,
    getActiveCubeFace: () => current.face,
    getActiveMipmapLevel: () => current.mip,
    setRenderTarget: vi.fn((next: THREE.WebGLRenderTarget | null, face = 0, mip = 0) => {
      const binding = {
        target: next, face, mip,
        type: next?.texture.type,
        format: next?.texture.format,
        internalFormat: next?.texture.internalFormat,
      };
      bindings.push(binding);
      events.push(next === target ? `bind:${next.texture.type}` : 'restore');
      current = binding;
      if (next === target && options.bindError) throw options.bindError;
    }),
    domElement: { dataset: {} as Record<string, string> },
  } as unknown as THREE.WebGLRenderer;
  return {
    renderer, target, previous, saved, gl, bindings, events,
    current: () => current,
    poolBindings: () => bindings.filter(binding => binding.target === target),
  };
}

function expectRestored(test: ReturnType<typeof fixture>) {
  expect(test.current()).toMatchObject(test.saved);
  expect(test.bindings.at(-1)).toMatchObject(test.saved);
}

describe('pool reflection target capability contract (CPU)', () => {
  it.each([
    { name: 'no color-buffer extension', float: false, halfFloat: false, type: THREE.UnsignedByteType, format: 'RGBA8', fallback: 'missing-color-buffer-extension' },
    { name: 'EXT_color_buffer_float', float: true, halfFloat: false, type: THREE.HalfFloatType, format: 'RGBA16F', fallback: 'none' },
    { name: 'EXT_color_buffer_half_float only', float: false, halfFloat: true, type: THREE.HalfFloatType, format: 'RGBA16F', fallback: 'none' },
  ])('selects the supported exact RGBA format before first bind: $name', capability => {
    const test = fixture(capability);
    const report = preparePoolTarget(test.renderer, test.target);
    expect(test.poolBindings()).toHaveLength(1);
    expect(test.poolBindings()[0]).toMatchObject({
      type: capability.type,
      format: THREE.RGBAFormat,
      internalFormat: capability.format,
    });
    const firstBind = test.events.findIndex(event => event.startsWith('bind:'));
    for (const extension of ['EXT_color_buffer_float', 'EXT_color_buffer_half_float']) {
      const enabledAt = test.events.indexOf(`extension:${extension}`);
      expect(enabledAt).toBeGreaterThanOrEqual(0);
      expect(enabledAt).toBeLessThan(firstBind);
    }
    expect(report).toMatchObject({
      type: capability.type === THREE.HalfFloatType ? 'half-float' : 'byte',
      format: capability.format,
      float: capability.float,
      halfFloat: capability.halfFloat,
      forcedByte: false,
      fallback: capability.fallback,
      status: COMPLETE,
      complete: true,
    });
    expect(JSON.parse(test.renderer.domElement.dataset.poolTarget!)).toEqual(report);
    expectRestored(test);
  });

  it('uses the real renderer-scoped byte preference without changing advertised extensions', () => {
    const forced = fixture({ float: true, halfFloat: true });
    preferBytePoolTargets(forced.renderer);
    const report = preparePoolTarget(forced.renderer, forced.target);
    expect(forced.poolBindings()[0]).toMatchObject({ type: THREE.UnsignedByteType, internalFormat: 'RGBA8' });
    expect(report).toMatchObject({ type: 'byte', float: true, halfFloat: true, forcedByte: true, fallback: 'forced-byte' });
    expectRestored(forced);

    const ordinary = fixture({ float: true });
    expect(preparePoolTarget(ordinary.renderer, ordinary.target)).toMatchObject({ type: 'half-float', forcedByte: false });
    expectRestored(ordinary);
  });

  it('releases an incomplete half-float allocation before retrying the same mirror as byte', () => {
    const test = fixture({ float: true, statuses: [INCOMPLETE, COMPLETE] });
    const report = preparePoolTarget(test.renderer, test.target);
    expect(test.poolBindings().map(binding => [binding.type, binding.internalFormat])).toEqual([
      [THREE.HalfFloatType, 'RGBA16F'], [THREE.UnsignedByteType, 'RGBA8'],
    ]);
    expect(test.events.filter(event => !event.startsWith('extension:'))).toEqual([
      `bind:${THREE.HalfFloatType}`, 'check', 'restore', 'dispose',
      `bind:${THREE.UnsignedByteType}`, 'check', 'restore',
    ]);
    expect(test.bindings.filter(binding => binding.target === test.previous)).toHaveLength(2);
    for (const restored of test.bindings.filter(binding => binding.target === test.previous)) expect(restored).toMatchObject(test.saved);
    expect(report).toMatchObject({ type: 'byte', fallback: 'incomplete-half-float-framebuffer', complete: true });
    expectRestored(test);
  });

  it.each([
    { name: 'direct byte path', float: false, statuses: [INCOMPLETE] },
    { name: 'byte fallback after rejected half-float', float: true, statuses: [INCOMPLETE, INCOMPLETE] },
  ])('reports failure and restores target/face/mip when $name is incomplete', options => {
    const test = fixture(options);
    expect(() => preparePoolTarget(test.renderer, test.target)).toThrow(`DeepWater reflection framebuffer incomplete: ${INCOMPLETE}`);
    expect(test.renderer.domElement.dataset.poolTarget).toBeUndefined();
    expectRestored(test);
  });

  it.each(['bindError', 'checkError'] as const)('restores target/face/mip when %s interrupts probing', errorSource => {
    const error = new Error(`synthetic ${errorSource}`);
    const test = fixture({ float: true, [errorSource]: error });
    expect(() => preparePoolTarget(test.renderer, test.target)).toThrow(error);
    expect(test.renderer.domElement.dataset.poolTarget).toBeUndefined();
    expectRestored(test);
  });
});
