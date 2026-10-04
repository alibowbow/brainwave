import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import {
  configureEnvironmentQA, createCheckedEnvironment, environmentCandidates, environmentSize,
  type EnvironmentAudit,
} from './environment';

// Use the installed package resolver, including when node_modules is provided by
// an ancestor workspace. This pins the private allocation hook actually in use.
const require = createRequire(import.meta.url);
const pmremSourcePath = require.resolve('three/src/extras/PMREMGenerator.js');
const environmentsModule = pathToFileURL(require.resolve('three/src/renderers/webgl/WebGLEnvironments.js')).href;
const COMPLETE = 0x8cd5, INCOMPLETE = 0x8cd6;
interface TargetRecord {
  target: THREE.WebGLRenderTarget;
  typeAtFirstBind: number;
  internalFormatAtFirstBind: string | null;
  disposals: number;
}
type Trace = { kind: 'allocate' | 'check' | 'draw' | 'dispose'; target: THREE.WebGLRenderTarget; status?: number };
interface BoundaryOptions {
  float?: boolean; half?: boolean;
  statuses?: number[];
  throwOnDraw?: boolean;
  errorAfterDraw?: boolean;
}

/** Real PMREM CPU descriptors, shaders, layout, draw ordering and cleanup run
 * unchanged. Only the renderer / GL boundary is controlled; this cannot prove
 * hardware renderability and is complemented by actual browser QA. */
function boundary(options: BoundaryOptions = {}) {
  const records: TargetRecord[] = [], trace: Trace[] = [];
  const original = new THREE.WebGLRenderTarget(32, 32);
  let current: THREE.WebGLRenderTarget | null = original, face = 3, mip = 2, checks = 0;
  let pendingError = 0, drawNumber = 0;
  const saved = { target: original, face, mip, xr: true, autoClear: true, toneMapping: THREE.ACESFilmicToneMapping };
  const gl = Object.freeze({
    NO_ERROR: 0, FRAMEBUFFER: 0x8d40, FRAMEBUFFER_COMPLETE: COMPLETE,
    getError: vi.fn(() => { const error = pendingError; pendingError = 0; return error; }),
    checkFramebufferStatus: vi.fn((binding: number) => {
      expect(binding).toBe(0x8d40);
      const status = options.statuses?.[checks++] ?? COMPLETE;
      trace.push({ kind: 'check', target: current!, status });
      return status;
    }),
  });
  const hasExtension = vi.fn((name: string) => name === 'EXT_color_buffer_float' ? !!options.float
    : name === 'EXT_color_buffer_half_float' ? !!options.half : false);
  const renderer = {
    xr: { enabled: saved.xr }, autoClear: saved.autoClear, toneMapping: saved.toneMapping as THREE.ToneMapping,
    extensions: Object.freeze({ has: hasExtension }),
    getContext: () => gl,
    getRenderTarget: () => current,
    getActiveCubeFace: () => face,
    getActiveMipmapLevel: () => mip,
    setRenderTarget: vi.fn((target: THREE.WebGLRenderTarget | null, nextFace = 0, nextMip = 0) => {
      current = target; face = nextFace; mip = nextMip;
      if (target && target !== original && !records.some(record => record.target === target)) {
        const record: TargetRecord = { target, typeAtFirstBind: target.texture.type,
          internalFormatAtFirstBind: target.texture.internalFormat, disposals: 0 };
        records.push(record); trace.push({ kind: 'allocate', target });
        target.addEventListener('dispose', () => { record.disposals++; trace.push({ kind: 'dispose', target }); });
      }
    }),
    render: vi.fn(() => {
      // Simulate state touched by a rendering failure and check restoration of
      // all fields, not just the renderer's top-level target reference.
      renderer.xr.enabled = false; renderer.autoClear = false; renderer.toneMapping = THREE.NoToneMapping;
      trace.push({ kind: 'draw', target: current! }); drawNumber++;
      if (options.throwOnDraw) throw new Error('controlled GPU draw failure');
      if (options.errorAfterDraw) pendingError = 0x0502;
    }),
  };
  const source = new THREE.Texture({ width: 512, height: 256 } as HTMLImageElement);
  source.mapping = THREE.EquirectangularReflectionMapping;
  const sourceDispose = vi.fn(); source.addEventListener('dispose', sourceDispose);
  const events: EnvironmentAudit[] = [];
  const snapshot = () => ({ target: current, face, mip, xr: renderer.xr.enabled,
    autoClear: renderer.autoClear, toneMapping: renderer.toneMapping });
  return { renderer: renderer as unknown as THREE.WebGLRenderer, controls: renderer,
    gl, source, sourceDispose, records, trace, saved, snapshot, events,
    configure(forceByte = false) { configureEnvironmentQA({ forceByte, onEvent: event => events.push(event) }); },
    get drawNumber() { return drawNumber; },
  };
}

afterEach(() => { configureEnvironmentQA(); vi.restoreAllMocks(); });

describe('Korean environment allocation policy', () => {
  it.each([
    [false, false, ['unsigned-byte']],
    [true, false, ['half-float', 'unsigned-byte']],
    [false, true, ['half-float', 'unsigned-byte']],
    [true, true, ['half-float', 'unsigned-byte']],
  ] as const)('float=%s / half=%s selects supported candidates', (float, half, expected) => {
    expect(environmentCandidates({ colorBufferFloat: float, colorBufferHalfFloat: half })).toEqual(expected);
    expect(environmentCandidates({ colorBufferFloat: float, colorBufferHalfFloat: half }, true)).toEqual(['unsigned-byte']);
  });

  it.each([
    [256, 64, 336, 256], [512, 128, 384, 512],
  ])('keeps the native full CubeUV layout for a %i-pixel source', (sourceWidth, cubeSize, width, height) => {
    expect(environmentSize(sourceWidth)).toEqual({ cubeSize, width, height });
  });

  it.each([0, 32, Number.NaN, Number.POSITIVE_INFINITY])('rejects unusable source size %s', width => {
    expect(() => environmentSize(width)).toThrow('Invalid Korean environment source size');
  });
});

describe('installed r186 allocation contract', () => {
  it('pins the reviewed PMREM source and proves native allocation touches no renderer / GPU', () => {
    expect(THREE.REVISION).toBe('186');
    expect(createHash('sha256').update(readFileSync(pmremSourcePath)).digest('hex'))
      .toBe('78f7cc24a9aa22852f4c46052f39e5fe5507bee6313a824851ba899ed2219ecc');
    const forbiddenRenderer = new Proxy({}, { get(_target, property) { throw new Error(`GPU access in allocation: ${String(property)}`); } });
    const generator = new THREE.PMREMGenerator(forbiddenRenderer as THREE.WebGLRenderer) as THREE.PMREMGenerator & {
      _setSize(size: number): void; _allocateTargets(): THREE.WebGLRenderTarget; _pingPongRenderTarget: THREE.WebGLRenderTarget;
    };
    generator._setSize(128);
    const output = generator._allocateTargets();
    try {
      for (const target of [output, generator._pingPongRenderTarget]) {
        expect([target.width, target.height, target.samples, target.depthBuffer]).toEqual([384, 512, 0, false]);
        expect(target.texture).toMatchObject({ type: THREE.HalfFloatType, format: THREE.RGBAFormat,
          colorSpace: THREE.LinearSRGBColorSpace, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
          generateMipmaps: false, mapping: THREE.CubeUVReflectionMapping });
      }
      expect(generator._pingPongRenderTarget).not.toBe(output);
    } finally { output.dispose(); generator.dispose(); }
  });

  it('the actual WebGLEnvironments implementation passes CubeUV through without automatic PMREM', async () => {
    const { WebGLEnvironments } = await import(/* @vite-ignore */ environmentsModule);
    const inaccessibleRenderer = new Proxy({}, { get(_target, property) { throw new Error(`Unexpected automatic conversion: ${String(property)}`); } });
    const environment = WebGLEnvironments(inaccessibleRenderer);
    const texture = new THREE.Texture(); texture.mapping = THREE.CubeUVReflectionMapping;
    texture.isRenderTargetTexture = true; texture.pmremVersion = 7;
    expect(environment.get(texture, true)).toBe(texture);
    expect(environment.get(texture, true)).toBe(texture);
    expect(environment.get(texture, false)).toBe(texture);
    environment.dispose(); texture.dispose();
  });
});

describe('checked native PMREM generation', () => {
  it.each([
    [512, 'temple', false, false, false, THREE.UnsignedByteType, 'RGBA8'],
    [256, 'scops', true, false, false, THREE.HalfFloatType, 'RGBA16F'],
    [512, 'temple', false, true, false, THREE.HalfFloatType, 'RGBA16F'],
    [256, 'scops', true, true, true, THREE.UnsignedByteType, 'RGBA8'],
  ] as const)('checks both full-size stores before any draw (%s %s)', (width, scene, float, half, forceByte, type, format) => {
    const b = boundary({ float, half }); b.source.image.width = width; b.source.image.height = width / 2; b.configure(forceByte);
    const originalGetContext = b.controls.getContext, originalStatusCheck = b.gl.checkFramebufferStatus;
    const result = createCheckedEnvironment(b.renderer, b.source, scene);
    expect(b.records).toHaveLength(2);
    for (const record of b.records) {
      expect(record.typeAtFirstBind).toBe(type); expect(record.internalFormatAtFirstBind).toBe(format);
      const size = environmentSize(width);
      expect([record.target.width, record.target.height]).toEqual([size.width, size.height]);
    }
    const firstDraw = b.trace.findIndex(event => event.kind === 'draw');
    expect(firstDraw).toBeGreaterThan(-1);
    expect(b.trace.slice(0, firstDraw).filter(event => event.kind === 'check')).toHaveLength(2);
    expect(b.controls.render).toHaveBeenCalled();
    expect(b.controls.getContext).toBe(originalGetContext); expect(b.gl.checkFramebufferStatus).toBe(originalStatusCheck);
    expect(Object.isFrozen(b.gl)).toBe(true); expect(Object.isFrozen(b.controls.extensions)).toBe(true);
    expect(b.controls.extensions.has.mock.calls.map(call => call[0])).toEqual(['EXT_color_buffer_float', 'EXT_color_buffer_half_float']);
    expect(b.snapshot()).toEqual(b.saved);
    expect(b.events[0]).toMatchObject({ success: true, restored: true, forceByte, selectedType: type === THREE.HalfFloatType ? 'half-float' : 'unsigned-byte' });
    expect(b.events[0].attempts).toHaveLength(1);
    for (const audit of b.events[0].attempts[0].targets) {
      expect(audit.status).toBe(COMPLETE); expect(audit.restored).toBe(true); expect(audit.errors).toEqual([]);
      expect(audit.stateBefore).toEqual({ target: b.saved.target.texture.uuid, cubeFace: 3, mip: 2 });
      expect(audit.stateAfter).toEqual(audit.stateBefore);
    }
    expect(b.sourceDispose).toHaveBeenCalledOnce();
    expect(b.records.map(record => record.disposals)).toEqual([0, 1]);
    result.dispose(); result.dispose();
    expect(b.records.map(record => record.disposals)).toEqual([1, 1]);
    expect(b.events.map(event => event.phase)).toEqual(['generation', 'dispose']);
    expect(b.events[1].disposed).toBe(true);
  });

  it.each([
    ['output', [INCOMPLETE, COMPLETE]], ['ping-pong', [COMPLETE, INCOMPLETE]],
  ] as const)('discards both unsupported half-float targets before retrying fresh byte: %s failure', (_role, statuses) => {
    const b = boundary({ half: true, statuses: [...statuses, COMPLETE, COMPLETE] }); b.configure();
    const result = createCheckedEnvironment(b.renderer, b.source, 'temple');
    expect(b.records).toHaveLength(4);
    expect(b.records.map(record => record.typeAtFirstBind)).toEqual([
      THREE.HalfFloatType, THREE.HalfFloatType, THREE.UnsignedByteType, THREE.UnsignedByteType,
    ]);
    expect(new Set(b.records.map(record => record.target)).size).toBe(4);
    expect(b.records.map(record => record.disposals)).toEqual([1, 1, 0, 1]);
    const firstByteAllocation = b.trace.findIndex(event => event.kind === 'allocate' && event.target === b.records[2].target);
    for (const record of b.records.slice(0, 2)) {
      expect(b.trace.findIndex(event => event.kind === 'dispose' && event.target === record.target)).toBeLessThan(firstByteAllocation);
      expect(b.trace.some(event => event.kind === 'draw' && event.target === record.target)).toBe(false);
    }
    expect(b.trace.filter(event => event.kind === 'draw').every(event => event.target.texture.type === THREE.UnsignedByteType)).toBe(true);
    expect(b.events[0].attempts.map(attempt => ({ type: attempt.type, success: attempt.success, discarded: attempt.discarded })))
      .toEqual([{ type: 'half-float', success: false, discarded: true }, { type: 'unsigned-byte', success: true, discarded: false }]);
    expect(b.events[0].attempts.every(attempt => attempt.targets.length === 2)).toBe(true);
    expect(b.snapshot()).toEqual(b.saved); expect(b.sourceDispose).toHaveBeenCalledOnce();
    result.dispose(); expect(b.records.every(record => record.disposals === 1)).toBe(true);
  });

  it('throws when final byte allocation is incomplete, cleans both attempts, and restores all state', () => {
    const b = boundary({ float: true, statuses: [INCOMPLETE, COMPLETE, COMPLETE, INCOMPLETE] }); b.configure();
    expect(() => createCheckedEnvironment(b.renderer, b.source, 'temple')).toThrow('PMREM target is not color-renderable');
    expect(b.controls.render).not.toHaveBeenCalled();
    expect(b.records).toHaveLength(4); expect(b.records.every(record => record.disposals === 1)).toBe(true);
    expect(b.snapshot()).toEqual(b.saved); expect(b.sourceDispose).toHaveBeenCalledOnce();
    expect(b.events).toHaveLength(1);
    expect(b.events[0]).toMatchObject({ success: false, selectedType: null, restored: true });
    expect(b.events[0].attempts.every(attempt => !attempt.success && attempt.discarded)).toBe(true);
  });

  it('restores target/cube-face/mip, XR, autoClear and toneMapping after a draw exception', () => {
    const b = boundary({ throwOnDraw: true }); b.configure();
    expect(() => createCheckedEnvironment(b.renderer, b.source, 'temple')).toThrow('controlled GPU draw failure');
    expect(b.drawNumber).toBe(1); expect(b.records.every(record => record.disposals === 1)).toBe(true);
    expect(b.snapshot()).toEqual(b.saved); expect(b.sourceDispose).toHaveBeenCalledOnce();
    expect(b.events[0]).toMatchObject({ success: false, restored: true });
  });

  it('rejects a real reported GL error after generation and does not leak its completed output', () => {
    const b = boundary({ errorAfterDraw: true }); b.configure();
    expect(() => createCheckedEnvironment(b.renderer, b.source, 'scops')).toThrow('WebGL error during environment generation');
    expect(b.events[0].generationErrors).toEqual([0x0502]);
    expect(b.events[0].attempts[0]).toMatchObject({ success: false, discarded: true });
    expect(b.records.every(record => record.disposals === 1)).toBe(true);
    expect(b.snapshot()).toEqual(b.saved); expect(b.sourceDispose).toHaveBeenCalledOnce();
  });
});
