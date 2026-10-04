import { beforeAll, describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { WebGLEnvironments } from 'three/src/renderers/webgl/WebGLEnvironments.js';
import {
  checkForestFramebuffer, configureForestReflectionTarget, createForestByteEnvironment,
  createForestEnvironment, createForestTargetPolicy,
} from './forestRenderTargets';

const COMPLETE = 0x8cd5;
const INCOMPLETE = 0x8cd6;

// These are simulated decisions/state restoration tests, not GPU compatibility evidence.
function simulatedRenderer(extensions: string[] = [], statuses = [COMPLETE]) {
  const previous = new THREE.WebGLCubeRenderTarget(16);
  const bindings: [THREE.WebGLRenderTarget | null, number, number][] = [];
  let statusIndex = 0;
  const renderer = {
    extensions: { has: vi.fn((name: string) => extensions.includes(name)) },
    getRenderTarget: () => previous,
    getActiveCubeFace: () => 5,
    getActiveMipmapLevel: () => 2,
    setRenderTarget: (target: THREE.WebGLRenderTarget | null, face = 0, mip = 0) => {
      bindings.push([target, face, mip]);
    },
    getContext: () => ({
      FRAMEBUFFER: 0x8d40,
      FRAMEBUFFER_COMPLETE: COMPLETE,
      checkFramebufferStatus: () => statuses[Math.min(statusIndex++, statuses.length - 1)],
    }),
  } as unknown as THREE.WebGLRenderer;
  return { renderer, bindings, previous };
}

describe('forest target policy with simulated extension availability', () => {
  it.each([
    [[], false],
    [['EXT_color_buffer_float'], true],
    [['EXT_color_buffer_half_float'], true],
    [['EXT_color_buffer_float', 'EXT_color_buffer_half_float'], true],
  ] as [string[], boolean][])('recognizes RGBA16F renderability for %j', (extensions, supported) => {
    const { renderer } = simulatedRenderer(extensions);
    const policy = createForestTargetPolicy(renderer);
    expect(policy.halfFloatSupported).toBe(supported);
    expect(policy.halfFloatEnabled).toBe(supported);
    expect(renderer.extensions.has).toHaveBeenCalledWith('EXT_color_buffer_float');
    expect(renderer.extensions.has).toHaveBeenCalledWith('EXT_color_buffer_half_float');
  });

  it('forces only the owned byte path while retaining truthful capability reporting', () => {
    const { renderer } = simulatedRenderer(['EXT_color_buffer_float']);
    const policy = createForestTargetPolicy(renderer, { forceByteTargets: true });
    expect(policy.halfFloatSupported).toBe(true);
    expect(policy.halfFloatEnabled).toBe(false);
    expect(policy.mode).toBe('forced-byte');
    expect(renderer.extensions.has('EXT_color_buffer_float')).toBe(true);
  });
});

describe('forest framebuffer checks with a simulated renderer', () => {
  it('checks a byte reflector and restores the previous target, cube face, and mip', () => {
    const { renderer, bindings, previous } = simulatedRenderer();
    const policy = createForestTargetPolicy(renderer);
    const target = new THREE.WebGLRenderTarget(1024, 1024, { type: THREE.HalfFloatType });
    const result = configureForestReflectionTarget(renderer, target, policy);
    expect(result).toMatchObject({ type: 'unsigned-byte', complete: true, width: 1024, height: 1024 });
    expect(bindings).toEqual([[target, 0, 0], [previous, 5, 2]]);
    expect(policy.checks).toEqual([result]);
  });

  it('disposes an incomplete half-float allocation and verifies its byte replacement', () => {
    const { renderer, bindings, previous } = simulatedRenderer(['EXT_color_buffer_half_float'], [INCOMPLETE, COMPLETE]);
    const policy = createForestTargetPolicy(renderer);
    const target = new THREE.WebGLRenderTarget(1024, 1024, { type: THREE.HalfFloatType });
    const dispose = vi.spyOn(target, 'dispose');
    configureForestReflectionTarget(renderer, target, policy);
    expect(dispose).toHaveBeenCalledOnce();
    expect(policy.checks.map(check => [check.type, check.complete])).toEqual([
      ['half-float', false], ['unsigned-byte', true],
    ]);
    expect(bindings[1]).toEqual([previous, 5, 2]);
    expect(bindings[3]).toEqual([previous, 5, 2]);
    expect(policy.halfFloatEnabled).toBe(false);
  });

  it('does not claim success when the byte attachment is incomplete too', () => {
    const { renderer, bindings, previous } = simulatedRenderer([], [INCOMPLETE]);
    const target = new THREE.WebGLRenderTarget(1024, 1024);
    expect(() => configureForestReflectionTarget(renderer, target,
      createForestTargetPolicy(renderer))).toThrow('framebuffer is incomplete');
    expect(bindings.at(-1)).toEqual([previous, 5, 2]);
  });

  it('restores the previous selection even when the GL completeness query throws', () => {
    const { renderer, bindings, previous } = simulatedRenderer();
    renderer.getContext = () => ({
      FRAMEBUFFER: 0x8d40,
      checkFramebufferStatus: () => { throw new Error('simulated context failure'); },
    }) as unknown as WebGL2RenderingContext;
    expect(() => checkForestFramebuffer(renderer, new THREE.WebGLRenderTarget(), 'test'))
      .toThrow('simulated context failure');
    expect(bindings.at(-1)).toEqual([previous, 5, 2]);
  });

  it('restores target selection and rendering state when a simulated PMREM generation fails', () => {
    const { renderer, bindings, previous } = simulatedRenderer(['EXT_color_buffer_float']);
    renderer.xr = { enabled: true } as THREE.WebXRManager;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.autoClear = true;
    const generate = vi.spyOn(THREE.PMREMGenerator.prototype, 'fromScene').mockImplementation(() => {
      renderer.setRenderTarget(new THREE.WebGLRenderTarget<THREE.Texture>(), 0, 0);
      renderer.xr.enabled = false;
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.autoClear = false;
      throw new Error('simulated PMREM failure');
    });
    try {
      expect(() => createForestEnvironment(renderer, new THREE.Scene(),
        createForestTargetPolicy(renderer))).toThrow('simulated PMREM failure');
      expect(bindings.at(-1)).toEqual([previous, 5, 2]);
      expect(renderer.xr.enabled).toBe(true);
      expect(renderer.toneMapping).toBe(THREE.ACESFilmicToneMapping);
      expect(renderer.autoClear).toBe(true);
    } finally {
      generate.mockRestore();
    }
  });
});

describe('forest byte environment and Three r186 CubeUV contract', () => {
  let texture: THREE.DataTexture;
  beforeAll(() => { texture = createForestByteEnvironment(); });

  it('passes directly through the actual renderer environment resolver without invoking PMREM', () => {
    // A renderer without rendering methods would fail if an implicit PMREM were requested.
    // @types/three still describes the former class signature of this internal
    // factory. Keep this assertion on r186's real (renderer, usePMREM) contract.
    const createEnvironments = WebGLEnvironments as unknown as (renderer: object) => {
      get(texture: THREE.Texture, usePMREM: boolean): THREE.Texture;
      dispose(): void;
    };
    const environments = createEnvironments({});
    expect(environments.get(texture, true)).toBe(texture);
    expect(texture.mapping).toBe(THREE.CubeUVReflectionMapping);
    expect(texture.type).toBe(THREE.UnsignedByteType);
    expect(texture.colorSpace).toBe(THREE.LinearSRGBColorSpace);
    expect(texture.image.width).toBe(768);
    expect(texture.image.height).toBe(1024);
    expect(texture.generateMipmaps).toBe(false);
    expect(texture.flipY).toBe(false);
    expect(texture.minFilter).toBe(THREE.LinearFilter);
    environments.dispose();
  });

  it('initializes every face and seam border, including all six extra diffuse levels', () => {
    const pixels = texture.image.data;
    for (let mip = 8; mip >= -2; mip--) {
      const size = 2 ** Math.max(mip, 4);
      const x0 = Math.max(4 - mip, 0) * 48;
      const y0 = 4 * (256 - size);
      let fullyInitialized = true;
      for (let y = y0; y < y0 + 2 * size; y++) for (let x = x0; x < x0 + 3 * size; x++) {
        const index = (y * 768 + x) * 4;
        if (pixels[index + 3] !== 255 || pixels[index] === 0 || pixels[index + 1] === 0 || pixels[index + 2] === 0) {
          fullyInitialized = false;
        }
      }
      expect(fullyInitialized, `mip ${mip} must contain readable radiance`).toBe(true);
    }
  });

  it('retains the sky orientation and smooths its contrast for rough material lighting', () => {
    const redAtFaceCenter = (face: number, mip: number) => {
      const size = 2 ** Math.max(mip, 4);
      const x = Math.max(4 - mip, 0) * 48 + (face % 3) * size + size / 2;
      const y = 4 * (256 - size) + (face > 2 ? size : 0) + size / 2;
      return texture.image.data[(y * 768 + x) * 4] * 4 / 255;
    };
    expect(redAtFaceCenter(1, 8)).toBeCloseTo(0.39, 1);
    expect(redAtFaceCenter(4, 8)).toBeCloseTo(0.72, 1);
    const sharpContrast = redAtFaceCenter(4, 8) - redAtFaceCenter(1, 8);
    const roughContrast = redAtFaceCenter(4, -2) - redAtFaceCenter(1, -2);
    expect(roughContrast).toBeGreaterThan(0);
    expect(roughContrast).toBeLessThan(sharpContrast * 0.9);
  });

  it('takes the byte environment path before any GPU allocation when extensions are absent', () => {
    const { renderer, bindings } = simulatedRenderer();
    const policy = createForestTargetPolicy(renderer);
    const environment = createForestEnvironment(renderer, new THREE.Scene(), policy);
    expect(environment.kind).toBe('byte-cubeuv');
    expect(environment.intensityScale).toBe(4);
    expect(bindings).toEqual([]);
    environment.dispose();
  });

  it('rejects an incomplete full-size PMREM preflight before PMREM can render', () => {
    const { renderer, bindings } = simulatedRenderer(['EXT_color_buffer_float'], [INCOMPLETE]);
    const policy = createForestTargetPolicy(renderer);
    const environment = createForestEnvironment(renderer, new THREE.Scene(), policy);
    expect(environment.kind).toBe('byte-cubeuv');
    expect(policy.checks).toEqual([expect.objectContaining({
      label: 'pmrem-scene-preflight', type: 'half-float', width: 768, height: 1024, complete: false,
    })]);
    expect(bindings).toHaveLength(2);
    expect(policy.halfFloatEnabled).toBe(false);
    environment.dispose();
  });
});
