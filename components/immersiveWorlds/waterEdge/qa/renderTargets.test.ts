import { afterEach, describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { assertFramebufferComplete, configureWaterEdgeRenderTargets, createCheckedCubeTarget, halfFloatColorAllowed, withRenderTargetState } from '../renderTargets';
import { createShoreEnvironment, cubeUvTile, roughnessForCubeUvMip } from '../byteEnvironment';

function rendererFixture(extensions: string[] = [], incompleteHalf = false) {
  const previous = new THREE.WebGLCubeRenderTarget(16);
  let target: THREE.WebGLRenderTarget | null = previous;
  let face = 4, mip = 2;
  const allocations: THREE.WebGLRenderTarget[] = [];
  const gl = {
    FRAMEBUFFER: 0x8D40, FRAMEBUFFER_COMPLETE: 0x8CD5,
    getExtension: vi.fn((name: string) => extensions.includes(name) ? {} : null),
    isContextLost: vi.fn(() => false),
    checkFramebufferStatus: vi.fn(() => incompleteHalf && target?.texture.type === THREE.HalfFloatType ? 0x8CDD : 0x8CD5),
  };
  const renderer = {
    domElement: { dataset: {} }, getContext: () => gl,
    getRenderTarget: () => target, getActiveCubeFace: () => face, getActiveMipmapLevel: () => mip,
    setRenderTarget: vi.fn((next: THREE.WebGLRenderTarget | null, nextFace = 0, nextMip = 0) => {
      target = next; face = nextFace; mip = nextMip;
      if (next && next !== previous) allocations.push(next);
    }),
    toneMapping: THREE.ACESFilmicToneMapping, xr: { enabled: true }, autoClear: true,
    render: vi.fn(),
  } as unknown as THREE.WebGLRenderer;
  return { renderer, gl, previous, allocations, restored: () => [target, face, mip] };
}

afterEach(() => { configureWaterEdgeRenderTargets({ forceByte: false }); vi.restoreAllMocks(); });

describe('WaterEdge render-target format selection and state ownership', () => {
  it.each(['EXT_color_buffer_float', 'EXT_color_buffer_half_float'])('recognizes actual %s RGBA16F support', extension => {
    const { renderer } = rendererFixture([extension]);
    expect(halfFloatColorAllowed(renderer)).toBe(true);
    const cube = createCheckedCubeTarget(renderer, 'reflection', 128);
    expect(cube.texture.type).toBe(THREE.HalfFloatType);
    cube.dispose();
  });

  it('uses byte BEFORE GPU allocation when WebGL2 lacks both color-buffer extensions', () => {
    const { renderer, allocations, gl, previous, restored } = rendererFixture();
    const cube = createCheckedCubeTarget(renderer, 'reflection', 128);
    expect(cube.texture.type).toBe(THREE.UnsignedByteType);
    expect(allocations.every(target => target.texture.type === THREE.UnsignedByteType)).toBe(true);
    expect(gl.checkFramebufferStatus).toHaveBeenCalledTimes(6);
    expect(restored()).toEqual([previous, 4, 2]);
  });

  it('discards a genuinely incomplete half target and validates all byte cube faces before use', () => {
    const { renderer, restored, previous, gl } = rendererFixture(['EXT_color_buffer_float'], true);
    const dispose = vi.spyOn(THREE.WebGLCubeRenderTarget.prototype, 'dispose');
    const cube = createCheckedCubeTarget(renderer, 'reflection', 128);
    expect(cube.texture.type).toBe(THREE.UnsignedByteType);
    expect(dispose).toHaveBeenCalledTimes(1);
    expect(gl.checkFramebufferStatus).toHaveBeenCalledTimes(7);
    expect(restored()).toEqual([previous, 4, 2]);
    expect(JSON.parse(renderer.domElement.dataset.waterEdgeRenderTargets!).checks.map((item: { complete: boolean }) => item.complete)).toEqual([false, true]);
  });

  it('restores target, nonzero cube face and mip on failed validation and failed nested capture', () => {
    const { renderer, restored, previous, gl } = rendererFixture();
    gl.checkFramebufferStatus.mockReturnValue(0x8CDD);
    expect(() => assertFramebufferComplete(renderer, new THREE.WebGLRenderTarget(4, 4), 'broken')).toThrow('incomplete');
    expect(restored()).toEqual([previous, 4, 2]);
    expect(() => withRenderTargetState(renderer, () => { renderer.setRenderTarget(null); throw new Error('render fault'); })).toThrow('render fault');
    expect(restored()).toEqual([previous, 4, 2]);
  });

  it('does not treat context loss as framebuffer completion', () => {
    const { renderer, gl, restored, previous } = rendererFixture();
    gl.isContextLost.mockReturnValue(true);
    expect(() => createCheckedCubeTarget(renderer, 'lost', 128)).toThrow('context lost');
    expect(gl.checkFramebufferStatus).not.toHaveBeenCalled();
    expect(restored()).toEqual([previous, 4, 2]);
  });
});

describe('WaterEdge environment generation chooses compatibility path before rendering', () => {
  it('forced byte never calls PMREM, allocates no float target, and preserves all CubeUV roughness levels', () => {
    configureWaterEdgeRenderTargets({ forceByte: true });
    const { renderer, allocations, restored, previous } = rendererFixture(['EXT_color_buffer_float']);
    const pmrem = vi.spyOn(THREE.PMREMGenerator.prototype, 'fromScene');
    vi.spyOn(THREE.CubeCamera.prototype, 'update').mockImplementation(() => {});
    const target = createShoreEnvironment(renderer, new THREE.Scene());
    expect(pmrem).not.toHaveBeenCalled();
    expect(allocations.every(item => item.texture.type === THREE.UnsignedByteType)).toBe(true);
    expect(target.texture.mapping).toBe(THREE.CubeUVReflectionMapping);
    expect([target.width, target.height]).toEqual([768, 1024]);
    expect(renderer.render).toHaveBeenCalledTimes(66);
    expect(restored()).toEqual([previous, 4, 2]);
    expect(renderer.toneMapping).toBe(THREE.ACESFilmicToneMapping);
    expect(renderer.xr.enabled).toBe(true);
    expect(renderer.autoClear).toBe(true);
  });

  it('supported PMREM begins only after exact output/ping-pong format preflights', () => {
    const { renderer, gl, restored, previous } = rendererFixture(['EXT_color_buffer_half_float']);
    const fromScene = vi.spyOn(THREE.PMREMGenerator.prototype, 'fromScene').mockImplementation(() => {
      expect(gl.checkFramebufferStatus).toHaveBeenCalledTimes(2);
      return new THREE.WebGLRenderTarget(768, 1024, { type: THREE.HalfFloatType });
    });
    const result = createShoreEnvironment(renderer, new THREE.Scene());
    expect(fromScene).toHaveBeenCalledTimes(1);
    expect(gl.checkFramebufferStatus).toHaveBeenCalledTimes(3);
    expect(result.texture.type).toBe(THREE.HalfFloatType);
    expect(restored()).toEqual([previous, 4, 2]);
  });

  it('falls back before PMREM when exact half-float format preflight fails', () => {
    const { renderer } = rendererFixture(['EXT_color_buffer_float'], true);
    const pmrem = vi.spyOn(THREE.PMREMGenerator.prototype, 'fromScene');
    vi.spyOn(THREE.CubeCamera.prototype, 'update').mockImplementation(() => {});
    const target = createShoreEnvironment(renderer, new THREE.Scene());
    expect(pmrem).not.toHaveBeenCalled();
    expect(target.texture.type).toBe(THREE.UnsignedByteType);
  });

  it('packs every face and roughness level without atlas overlap or missing diffuse tiles', () => {
    const occupied = new Uint8Array(768 * 1024);
    let previousRoughness = 0;
    for (let mip = 8; mip >= -2; mip--) {
      const roughness = roughnessForCubeUvMip(mip);
      expect(roughness).toBeGreaterThan(previousRoughness); previousRoughness = roughness;
      for (let face = 0; face < 6; face++) {
        const { x, y, size } = cubeUvTile(mip, face);
        expect(x + size).toBeLessThanOrEqual(768); expect(y + size).toBeLessThanOrEqual(1024);
        for (let row = y; row < y + size; row++) for (let col = x; col < x + size; col++) {
          const index = row * 768 + col;
          if (occupied[index]) throw new Error(`Overlapping CubeUV tile at ${mip}, face ${face}`);
          occupied[index] = 1;
        }
      }
    }
    expect(roughnessForCubeUvMip(-2)).toBe(1);
  });
});
