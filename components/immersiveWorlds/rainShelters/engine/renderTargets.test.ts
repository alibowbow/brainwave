import { afterEach, describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import {
  captureRainTargetState, checkRainFramebuffer, createRainRefractionTarget, getRainTargetDiagnostics,
  prepareRainShadowTargets, setRainTargetMode, withRainRenderTargetState, withRainTargetState,
} from './renderTargets';

/** Policy/lifecycle unit tests: real Three target objects, explicitly mocked WebGL boundary. */
function rig(options: { float?: boolean; half?: boolean; halfIncomplete?: boolean; byteIncomplete?: boolean; throwHalf?: boolean; halfError?: boolean } = {}) {
  const sentinel = new THREE.WebGLRenderTarget(48, 32);
  let target: THREE.WebGLRenderTarget | null = sentinel, face = 3, mip = 2;
  const viewport = new THREE.Vector4(2, 3, 43, 27), currentViewport = viewport.clone();
  const scissor = new THREE.Vector4(3, 4, 40, 25), currentScissor = scissor.clone();
  let scissorTest = true, currentScissorTest = true, error = 0;
  let clearColor = new THREE.Color('#334455'), clearAlpha = .4;
  const events: { action: string; target?: THREE.WebGLRenderTarget; width?: number; height?: number }[] = [];
  const gl = {
    FRAMEBUFFER: 0x8d40, FRAMEBUFFER_COMPLETE: 0x8cd5, FRAMEBUFFER_BINDING: 0x8ca6,
    SCISSOR_BOX: 0x0c10, SCISSOR_TEST: 0x0c11, NO_ERROR: 0,
    getExtension: vi.fn((name: string) => name === 'EXT_color_buffer_float' ? (options.float ? {} : null) : (options.half ? {} : null)),
    getParameter: vi.fn((name: number) => name === 0x8ca6 ? target : currentScissor.toArray()),
    isEnabled: () => currentScissorTest,
    checkFramebufferStatus: vi.fn(() => {
      events.push({ action: 'check', target: target!, width: target!.width, height: target!.height });
      if (target!.texture.type === THREE.HalfFloatType && options.halfError) error = 0x0506;
      return target!.texture.type === THREE.HalfFloatType
        ? (options.halfIncomplete ? 0x8cdd : 0x8cd5) : (options.byteIncomplete ? 0x8cdd : 0x8cd5);
    }),
    getError: () => { const value = error; error = 0; return value; },
  };
  const renderer = {
    xr: { enabled: true }, shadowMap: { enabled: true, autoUpdate: true, type: THREE.PCFSoftShadowMap },
    autoClear: false, toneMapping: THREE.ACESFilmicToneMapping, capabilities: { maxTextureSize: 8192, reversedDepthBuffer: false },
    getContext: () => gl, getRenderTarget: () => target, getActiveCubeFace: () => face, getActiveMipmapLevel: () => mip,
    getViewport: (out: THREE.Vector4) => out.copy(viewport), getCurrentViewport: (out: THREE.Vector4) => out.copy(currentViewport),
    getScissor: (out: THREE.Vector4) => out.copy(scissor), getScissorTest: () => scissorTest,
    getClearColor: (out: THREE.Color) => out.copy(clearColor), getClearAlpha: () => clearAlpha,
    setClearColor: (color: THREE.Color, alpha: number) => { clearColor = color.clone(); clearAlpha = alpha; },
    setViewport: (value: THREE.Vector4) => { viewport.copy(value); currentViewport.copy(value); },
    setScissor: (value: THREE.Vector4) => { scissor.copy(value); currentScissor.copy(value); },
    setScissorTest: (value: boolean) => { scissorTest = value; currentScissorTest = value; },
    setRenderTarget: vi.fn((value: THREE.WebGLRenderTarget | null, nextFace = 0, nextMip = 0) => {
      target = value; face = nextFace; mip = nextMip;
      events.push({ action: 'bind', target: value ?? undefined });
      currentViewport.copy(value?.viewport ?? viewport); currentScissor.copy(value?.scissor ?? scissor); currentScissorTest = value?.scissorTest ?? scissorTest;
      if (value?.texture.type === THREE.HalfFloatType && options.throwHalf) throw new Error('mock allocation failed');
    }),
  } as unknown as THREE.WebGLRenderer;
  const originalDispose = THREE.WebGLRenderTarget.prototype.dispose;
  vi.spyOn(THREE.WebGLRenderTarget.prototype, 'dispose').mockImplementation(function () {
    events.push({ action: 'dispose', target: this }); originalDispose.call(this);
  });
  return { renderer, gl, events, sentinel };
}
afterEach(() => vi.restoreAllMocks());

describe('Rain native-size refraction storage selection (mocked GPU policy)', () => {
  it.each([{ float: true }, { half: true }])('uses either genuine half-float color-renderability extension %j', options => {
    const { renderer, events } = rig(options), controller = createRainRefractionTarget(renderer);
    const target = controller.ensure(1440, 1000);
    expect([target.width, target.height, target.texture.type, target.texture.internalFormat]).toEqual([1440, 1000, THREE.HalfFloatType, 'RGBA16F']);
    expect(events.filter(e => e.action === 'check')).toHaveLength(1);
    expect(getRainTargetDiagnostics(renderer).checks[0]).toMatchObject({ complete: true, stateRestored: true, before: { face: 3, mip: 2 }, after: { face: 3, mip: 2 } });
    controller.dispose();
  });

  it('does not assume half-float renderability merely because renderer exists', () => {
    const { renderer } = rig(), target = createRainRefractionTarget(renderer).ensure(412, 915);
    expect(target.texture.type).toBe(THREE.UnsignedByteType);
    expect(getRainTargetDiagnostics(renderer).checks).toHaveLength(1);
  });

  it('forces genuine byte storage without falsifying either native extension', () => {
    const { renderer, gl } = rig({ float: true, half: true });
    setRainTargetMode(renderer, 'force-byte');
    expect(createRainRefractionTarget(renderer).ensure(1440, 1000).texture.type).toBe(THREE.UnsignedByteType);
    expect(getRainTargetDiagnostics(renderer)).toMatchObject({ mode: 'force-byte', capabilities: { colorBufferFloat: true, colorBufferHalfFloat: true } });
    expect(gl.getExtension).toHaveBeenCalledTimes(2);
    expect(() => setRainTargetMode(renderer, 'auto')).toThrow(/before any target allocation/);
  });

  it.each([{ halfIncomplete: true }, { throwHalf: true }, { halfError: true }])('disposes failed half storage before allocating checked full-size byte %j', failure => {
    const { renderer, events } = rig({ float: true, ...failure });
    const target = createRainRefractionTarget(renderer).ensure(1440, 1000);
    expect(target.texture.type).toBe(THREE.UnsignedByteType);
    const halfDisposed = events.findIndex(e => e.action === 'dispose' && e.target?.texture.type === THREE.HalfFloatType);
    const byteBound = events.findIndex(e => e.action === 'bind' && e.target === target);
    expect(halfDisposed).toBeGreaterThan(-1); expect(halfDisposed).toBeLessThan(byteBound);
    expect(getRainTargetDiagnostics(renderer).attempts.map(a => [a.storage, a.ok])).toEqual([['half-float', false], ['unsigned-byte', true]]);
    expect(getRainTargetDiagnostics(renderer).checks.every(c => c.stateRestored)).toBe(true);
    expect([target.width, target.height]).toEqual([1440, 1000]);
  });

  it('fails closed and preserves binding when both complete-storage candidates fail', () => {
    const { renderer, events, sentinel } = rig({ half: true, halfIncomplete: true, byteIncomplete: true });
    expect(() => createRainRefractionTarget(renderer).ensure(1440, 1000)).toThrow(/complete full-size RGBA8/);
    expect(events.filter(e => e.action === 'dispose')).toHaveLength(2);
    expect(renderer.getRenderTarget()).toBe(sentinel);
    expect(renderer.getActiveCubeFace()).toBe(3); expect(renderer.getActiveMipmapLevel()).toBe(2);
  });

  it('reuses equal-size storage; resize allocates/checks before disposing old storage; double dispose is safe', () => {
    const { renderer, events } = rig({ float: true }), controller = createRainRefractionTarget(renderer);
    const old = controller.ensure(1440, 1000);
    expect(controller.ensure(1440, 1000)).toBe(old);
    const next = controller.ensure(412, 915);
    expect(next).not.toBe(old); expect([next.width, next.height]).toEqual([412, 915]);
    expect(events.filter(e => e.action === 'check')).toHaveLength(2);
    const check = events.findIndex(e => e.action === 'check' && e.target === next);
    const disposed = events.findIndex(e => e.action === 'dispose' && e.target === old);
    expect(check).toBeLessThan(disposed);
    controller.dispose(); controller.dispose();
    expect(events.filter(e => e.action === 'dispose' && e.target === next)).toHaveLength(1);
    expect(() => controller.ensure(412, 915)).toThrow(/disposed/);
  });
});

describe('Rain renderer state and implicit shadow storage', () => {
  it.each([false, true])('restores full renderer state after checked work, exception=%s', throws => {
    const { renderer } = rig(); const before = captureRainTargetState(renderer);
    const target = new THREE.WebGLRenderTarget(73, 51);
    const run = () => withRainTargetState(renderer, () => {
      renderer.setRenderTarget(target); renderer.xr.enabled = false; renderer.autoClear = true;
      renderer.shadowMap.autoUpdate = false; renderer.toneMapping = THREE.NoToneMapping;
      renderer.setClearColor(new THREE.Color('red'), 1);
      if (throws) throw new Error('intentional scene exception');
    });
    if (throws) expect(run).toThrow(/intentional/); else run();
    expect(captureRainTargetState(renderer)).toEqual(before);
  });

  it.each([false, true])('hot refraction pass restores target/face/mip with zero GL queries, exception=%s', throws => {
    const { renderer, gl, sentinel } = rig(); gl.getParameter.mockClear();
    const run = () => withRainRenderTargetState(renderer, () => {
      renderer.setRenderTarget(new THREE.WebGLRenderTarget<THREE.Texture>(73, 51));
      if (throws) throw new Error('intentional scene exception');
    });
    if (throws) expect(run).toThrow(/intentional/); else run();
    expect(renderer.getRenderTarget()).toBe(sentinel); expect(renderer.getActiveCubeFace()).toBe(3); expect(renderer.getActiveMipmapLevel()).toBe(2);
    expect(gl.getParameter).not.toHaveBeenCalled();
  });

  it('checks exact 1024² PCF RGBA8 plus unsigned-int depth target before any shadow draw', () => {
    const { renderer } = rig(), scene = new THREE.Scene(), light = new THREE.DirectionalLight();
    light.castShadow = true; light.shadow.mapSize.set(1024, 1024); scene.add(light);
    prepareRainShadowTargets(renderer, scene);
    expect(light.shadow.map).not.toBeNull();
    expect(light.shadow.map!.depthTexture).toMatchObject({ type: THREE.UnsignedIntType, compareFunction: THREE.LessEqualCompare, minFilter: THREE.LinearFilter });
    expect(getRainTargetDiagnostics(renderer).checks[0]).toMatchObject({ label: 'directional-shadow', width: 1024, height: 1024, type: THREE.UnsignedByteType, depthTextureType: THREE.UnsignedIntType, complete: true });
  });

  it('disposes incomplete shadow storage and never assigns it for rendering', () => {
    const { renderer, events } = rig({ byteIncomplete: true }), scene = new THREE.Scene(), light = new THREE.DirectionalLight();
    light.castShadow = true; light.shadow.mapSize.set(1024, 1024); scene.add(light);
    expect(() => prepareRainShadowTargets(renderer, scene)).toThrow(/incomplete/);
    expect(light.shadow.map).toBeNull(); expect(events.filter(e => e.action === 'dispose')).toHaveLength(1);
  });

  it('rejects unsupported shadow dimensions without silently reducing resolution', () => {
    const { renderer } = rig(), scene = new THREE.Scene(), light = new THREE.DirectionalLight();
    light.castShadow = true; light.shadow.mapSize.set(16384, 1024); scene.add(light);
    expect(() => prepareRainShadowTargets(renderer, scene)).toThrow(/original shadow resolution was preserved/);
    expect(light.shadow.mapSize.toArray()).toEqual([16384, 1024]);
  });

  it('records exact real-allocation GL failure separately from restored state', () => {
    const { renderer } = rig({ halfError: true });
    const target = new THREE.WebGLRenderTarget(1440, 1000, { type: THREE.HalfFloatType });
    expect(checkRainFramebuffer(renderer, target, 'test-boundary')).toBe(false);
    expect(getRainTargetDiagnostics(renderer).checks[0]).toMatchObject({ status: 0x8cd5, complete: false, glErrors: [0x0506], stateRestored: true });
  });
});
