import { afterEach, describe, expect, it, vi } from 'vitest';
import * as T from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { cafeFramebuffer, configureCafeTarget, preserveCafeReflectorState, requireCafeFramebuffer, selectCafeTargetType, withCafeTargetState } from './renderTargets';

const COMPLETE = 0x8cd5;
const INCOMPLETE = 0x8cd6;
const cleanup: (() => void)[] = [];
afterEach(() => { for (const dispose of cleanup.splice(0)) dispose(); });

/** Unit-only renderer double. These checks verify decisions and state, not GPU support. */
function mockRenderer(options: {
  extensions?: string[];
  status?: (target: T.WebGLRenderTarget) => number;
} = {}) {
  const previous = new T.WebGLCubeRenderTarget(16);
  cleanup.push(() => previous.dispose());
  let target: T.WebGLRenderTarget | null = previous;
  let face = 4;
  let mip = 1;
  const seen = new Set<T.WebGLRenderTarget>();
  const disposed = new Set<T.WebGLRenderTarget>();
  const gl = {
    FRAMEBUFFER: 0x8d40,
    FRAMEBUFFER_COMPLETE: COMPLETE,
    getExtension: vi.fn((name: string) => options.extensions?.includes(name) ? {} : null),
    checkFramebufferStatus: vi.fn(() => {
      if (!target) throw new Error('A target must be bound before checking it.');
      return options.status?.(target) ?? COMPLETE;
    }),
  };
  const renderer = {
    getContext: () => gl,
    getRenderTarget: () => target,
    getActiveCubeFace: () => face,
    getActiveMipmapLevel: () => mip,
    setRenderTarget: vi.fn((next: T.WebGLRenderTarget | null, nextFace = 0, nextMip = 0) => {
      target = next;
      face = nextFace;
      mip = nextMip;
      if (next && next !== previous && !seen.has(next)) {
        seen.add(next);
        next.addEventListener('dispose', () => disposed.add(next));
      }
    }),
    xr: { enabled: true },
    shadowMap: { autoUpdate: false },
  };
  return { renderer: renderer as unknown as T.WebGLRenderer, gl, previous, seen, disposed,
    state: () => ({ target, face, mip }), setRenderTarget: renderer.setRenderTarget };
}

function expectRestored(fixture: ReturnType<typeof mockRenderer>) {
  expect(fixture.state()).toEqual({ target: fixture.previous, face: 4, mip: 1 });
}

describe('cafe target capability decisions', () => {
  it('skips HalfFloat without either extension and disposes its successful RGBA8 probe', () => {
    const fixture = mockRenderer();
    const result = selectCafeTargetType(fixture.renderer);
    expect(result.type).toBe(T.UnsignedByteType);
    expect(result.extensions).toEqual({ colorBufferFloat: false, colorBufferHalfFloat: false });
    expect(result.probes.map((probe) => [probe.type, probe.internalFormat])).toEqual([[T.UnsignedByteType, 'RGBA8']]);
    expect(fixture.gl.checkFramebufferStatus).toHaveBeenCalledTimes(1);
    expect(fixture.disposed).toEqual(fixture.seen);
    expectRestored(fixture);
  });

  it.each(['EXT_color_buffer_float', 'EXT_color_buffer_half_float'])('accepts %s alone only after a complete RGBA16F probe', (extension) => {
    const fixture = mockRenderer({ extensions: [extension] });
    const result = selectCafeTargetType(fixture.renderer);
    expect(result.type).toBe(T.HalfFloatType);
    expect(result.probes).toHaveLength(1);
    expect(result.probes[0]).toMatchObject({ type: T.HalfFloatType, internalFormat: 'RGBA16F', format: T.RGBAFormat,
      samples: 0, complete: true, status: COMPLETE });
    expect([...fixture.seen][0].depthBuffer).toBe(true);
    expect(fixture.disposed).toEqual(fixture.seen);
    expectRestored(fixture);
  });

  it('falls back to RGBA8 when advertised half-float storage is incomplete', () => {
    const fixture = mockRenderer({ extensions: ['EXT_color_buffer_float'],
      status: (target) => target.texture.type === T.HalfFloatType ? INCOMPLETE : COMPLETE });
    const result = selectCafeTargetType(fixture.renderer);
    expect(result.type).toBe(T.UnsignedByteType);
    expect(result.probes.map((probe) => [probe.type, probe.complete])).toEqual([[T.HalfFloatType, false], [T.UnsignedByteType, true]]);
    expect(fixture.disposed.size).toBe(2);
    expect(fixture.disposed).toEqual(fixture.seen);
    expectRestored(fixture);
  });

  it('honors explicit byte preference without pretending the real extensions are absent', () => {
    const fixture = mockRenderer({ extensions: ['EXT_color_buffer_float', 'EXT_color_buffer_half_float'] });
    const result = selectCafeTargetType(fixture.renderer, 'byte');
    expect(result.type).toBe(T.UnsignedByteType);
    expect(result.preference).toBe('byte');
    expect(result.extensions).toEqual({ colorBufferFloat: true, colorBufferHalfFloat: true });
    expect(result.probes.map((probe) => probe.type)).toEqual([T.UnsignedByteType]);
    expect([...fixture.seen].every((target) => target.texture.type === T.UnsignedByteType)).toBe(true);
    expectRestored(fixture);
  });

  it('rejects when neither candidate is complete, disposing both and preserving the caller target', () => {
    const fixture = mockRenderer({ extensions: ['EXT_color_buffer_half_float'], status: () => INCOMPLETE });
    expect(() => selectCafeTargetType(fixture.renderer)).toThrow('complete RGBA8 framebuffer');
    expect(fixture.gl.checkFramebufferStatus).toHaveBeenCalledTimes(2);
    expect(fixture.disposed.size).toBe(2);
    expect(fixture.disposed).toEqual(fixture.seen);
    expectRestored(fixture);
  });

  it('restores target, cube face and mip and disposes the probe if the framebuffer query throws', () => {
    const failure = new Error('framebuffer query failed');
    const fixture = mockRenderer({ extensions: ['EXT_color_buffer_float'], status: () => { throw failure; } });
    expect(() => selectCafeTargetType(fixture.renderer)).toThrow(failure);
    expect(fixture.disposed.size).toBe(1);
    expect(fixture.disposed).toEqual(fixture.seen);
    expectRestored(fixture);
  });
});

describe('cafe target configuration and public state restoration', () => {
  it('sets the selected attachment format and disables multisampling before the first binding', () => {
    const fixture = mockRenderer();
    const target = new T.WebGLRenderTarget(8, 16, { type: T.HalfFloatType, samples: 4 });
    cleanup.push(() => target.dispose());
    configureCafeTarget(target, T.UnsignedByteType);
    expect(fixture.setRenderTarget).not.toHaveBeenCalled();
    const result = cafeFramebuffer(fixture.renderer, target, 'reflection');
    expect(result).toMatchObject({ label: 'reflection', width: 8, height: 16, type: T.UnsignedByteType,
      internalFormat: 'RGBA8', format: T.RGBAFormat, samples: 0, complete: true });
    expectRestored(fixture);
  });

  it('restores the caller target before reporting a required incomplete framebuffer', () => {
    const fixture = mockRenderer({ status: () => INCOMPLETE });
    const target = new T.WebGLRenderTarget(4, 4);
    cleanup.push(() => target.dispose());
    expect(() => requireCafeFramebuffer(fixture.renderer, target, 'reflection')).toThrow('Cafe reflection framebuffer incomplete: 0x8cd6');
    expectRestored(fixture);
  });

  it('returns the callback result and restores a changed target on success', () => {
    const fixture = mockRenderer();
    const result = withCafeTargetState(fixture.renderer, () => {
      fixture.renderer.setRenderTarget(null);
      return 'frame-complete';
    });
    expect(result).toBe('frame-complete');
    expectRestored(fixture);
  });

  it('restores face and mip even when the target pointer itself is unchanged', () => {
    const fixture = mockRenderer();
    const failure = new Error('render failed');
    expect(() => withCafeTargetState(fixture.renderer, () => {
      fixture.renderer.setRenderTarget(fixture.previous, 0, 0);
      throw failure;
    })).toThrow(failure);
    expectRestored(fixture);
  });
});

describe('cafe Reflector wrapper', () => {
  it.each([false, true])('restores target, face, mip, XR, shadow and visibility (throw=%s)', (throws) => {
    const fixture = mockRenderer();
    const reflector = new Reflector(new T.PlaneGeometry(1, 1), { multisample: 0 });
    cleanup.push(() => { reflector.dispose(); reflector.geometry.dispose(); });
    const saved = { xr: !throws, shadow: throws, visible: throws };
    fixture.renderer.xr.enabled = saved.xr;
    fixture.renderer.shadowMap.autoUpdate = saved.shadow;
    reflector.visible = saved.visible;
    const failure = new Error('reflection draw failed');
    const original = vi.fn(function (this: T.Object3D, renderer: T.WebGLRenderer) {
      expect(this).toBe(reflector);
      renderer.setRenderTarget(reflector.getRenderTarget());
      renderer.xr.enabled = !saved.xr;
      renderer.shadowMap.autoUpdate = !saved.shadow;
      reflector.visible = !saved.visible;
      if (throws) throw failure;
      // This matches r186 Reflector's lossy restoration of only the target pointer.
      renderer.setRenderTarget(fixture.previous);
    });
    reflector.onBeforeRender = original;
    preserveCafeReflectorState(reflector);
    const render = () => reflector.onBeforeRender(fixture.renderer, new T.Scene(), new T.PerspectiveCamera(), reflector.geometry, reflector.material as T.Material, null);
    if (throws) expect(render).toThrow(failure);
    else expect(render).not.toThrow();
    expect(original).toHaveBeenCalledTimes(1);
    expectRestored(fixture);
    expect(fixture.renderer.xr.enabled).toBe(saved.xr);
    expect(fixture.renderer.shadowMap.autoUpdate).toBe(saved.shadow);
    expect(reflector.visible).toBe(saved.visible);
  });
});
