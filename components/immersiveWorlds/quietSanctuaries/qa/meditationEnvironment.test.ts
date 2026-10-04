import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { createMeditationEnvironment } from '../meditationEnvironment';
import type { TargetDiagnostics } from '../meditationTargets';

/** Unit boundary tests only: real Three target objects, mocked GPU/PMREM execution. */
const rig = vi.hoisted(() => ({
  events: [] as Array<Record<string, unknown>>,
  pairs: [] as any[],
  halfFailure: null as string | null,
  byteFailure: false,
  generationThrows: false,
  glErrors: [] as number[],
  state: { binding: 'caller', face: 4, mip: 2, xr: true, autoClear: true, toneMapping: 6 },
}));

vi.mock('three', async (importOriginal) => {
  const actual = await importOriginal<typeof import('three')>();
  class MockPMREMGenerator {
    _cubeSize = 0;
    _lodMax = 0;
    _pingPongRenderTarget: InstanceType<typeof actual.WebGLRenderTarget> | null = null;
    pair: any;

    _setSize(size: number) { this._cubeSize = size; this._lodMax = Math.floor(Math.log2(size)); }
    _allocateTargets() {
      // These are real CPU-side Three objects. No canvas, context or framebuffer exists.
      const output = new actual.WebGLRenderTarget(336, 256, { type: actual.HalfFloatType });
      const scratch = new actual.WebGLRenderTarget(336, 256, { type: actual.HalfFloatType });
      output.texture.mapping = scratch.texture.mapping = actual.CubeUVReflectionMapping;
      this._pingPongRenderTarget = scratch;
      this.pair = { id: rig.pairs.length, output, scratch, outputDisposals: 0, scratchDisposals: 0, generatorDisposals: 0 };
      const pair = this.pair;
      for (const name of ['output', 'scratch'] as const) {
        pair[name].addEventListener('dispose', () => {
          pair[`${name}Disposals`]++;
          rig.events.push({ kind: 'dispose', id: pair.id, target: name, state: { ...rig.state } });
        });
      }
      rig.pairs.push(pair);
      rig.events.push({ kind: 'allocate', id: pair.id, dimensions: [output.width, output.height, scratch.width, scratch.height] });
      return output;
    }
    fromCubemap(source: unknown, output: unknown) {
      rig.events.push({
        kind: 'generate', id: this.pair.id, source, output,
        types: [this.pair.output.texture.type, this.pair.scratch.texture.type],
        checksAlreadyCompleted: rig.events.filter((event) => event.kind === 'check' && event.id === this.pair.id).map((event) => event.label),
      });
      // Leave changed state even on successful mocked execution. The adapter must
      // restore the caller before releasing scratch or a failed output.
      rig.state = { binding: 'generation-target', face: 0, mip: 0, xr: false, autoClear: false, toneMapping: 0 };
      if (rig.generationThrows) throw new Error('Mock PMREM shader generation failed.');
      return output;
    }
    dispose() {
      if (this.pair) this.pair.generatorDisposals++;
      this._pingPongRenderTarget?.dispose();
    }
  }
  return { ...actual, PMREMGenerator: MockPMREMGenerator };
});

vi.mock('../meditationTargets', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../meditationTargets')>();
  const three = await import('three');
  return {
    // Keep the production retry policy; only the renderer/GPU boundary is fake.
    ...actual,
    captureRendererState: () => ({ ...rig.state }),
    restoreRendererState: (_renderer: unknown, saved: typeof rig.state) => {
      rig.state = { ...saved };
      rig.events.push({ kind: 'restore', state: { ...rig.state } });
    },
    checkMeditationTarget: (_renderer: unknown, target: THREE.WebGLRenderTarget, label: string) => {
      const pair = rig.pairs.find((candidate) => candidate.output === target || candidate.scratch === target);
      const ok = target.texture.type === three.HalfFloatType ? rig.halfFailure !== label : !rig.byteFailure;
      rig.events.push({
        kind: 'check', id: pair.id, target, label, ok,
        // Capture BOTH types at the instant of each first-GPU-allocation seam.
        types: [pair.output.texture.type, pair.scratch.texture.type],
      });
      return ok;
    },
  };
});

const initialState = { binding: 'caller', face: 4, mip: 2, xr: true, autoClear: true, toneMapping: 6 };
const capabilities = { floatColorBuffer: true, halfFloatColorBuffer: false };
const renderer = { getContext: () => ({ NO_ERROR: 0, getError: () => rig.glErrors.shift() ?? 0 }) } as unknown as THREE.WebGLRenderer;
const source = () => new THREE.CubeTexture(Array.from({ length: 6 }, () => ({ width: 64, height: 64 })));
const diagnostics = (): TargetDiagnostics => ({ checks: [], attempts: [] });
const events = (kind: string, id?: number) => rig.events.filter((event) => event.kind === kind && (id === undefined || event.id === id));

function expectRestoredBeforeDisposal() {
  for (const event of events('dispose')) expect(event.state).toEqual(initialState);
  expect(rig.state).toEqual(initialState);
}

beforeEach(() => {
  rig.events.length = 0; rig.pairs.length = 0; rig.glErrors.length = 0;
  rig.halfFailure = null; rig.byteFailure = false; rig.generationThrows = false;
  rig.state = { ...initialState };
});

describe('meditation PMREM pair lifecycle (mocked GPU boundary)', () => {
  it('checks both half-float targets before generation, then retains only the checked output', () => {
    const cube = source(); const sourceDispose = vi.spyOn(cube, 'dispose'); const report = diagnostics();
    const result = createMeditationEnvironment(renderer, cube, 'auto', capabilities, report);
    const pair = rig.pairs[0];
    expect(rig.pairs).toHaveLength(1);
    expect(events('allocate')[0].dimensions).toEqual([336, 256, 336, 256]);
    expect(events('check').map((event) => event.label)).toEqual(['environment-output', 'environment-scratch']);
    expect(events('check').map((event) => event.types)).toEqual([
      [THREE.HalfFloatType, THREE.HalfFloatType], [THREE.HalfFloatType, THREE.HalfFloatType],
    ]);
    const generation = events('generate')[0];
    expect(generation.checksAlreadyCompleted).toEqual(['environment-output', 'environment-scratch']);
    expect(generation.output).toBe(pair.output);
    expect(generation.source).toBe(cube);
    expect(result).toBe(pair.output);
    expect(result.texture.mapping).toBe(THREE.CubeUVReflectionMapping);
    expect(pair.outputDisposals).toBe(0);
    expect(pair.scratchDisposals).toBe(1);
    expect(pair.generatorDisposals).toBe(1);
    expect(sourceDispose).not.toHaveBeenCalled();
    expect(report.attempts).toEqual([
      { target: 'environment', storage: 'half-float', ok: true },
      { target: 'environment-generation', storage: 'half-float', ok: true },
    ]);
    expectRestoredBeforeDisposal();
  });

  it.each(['environment-output', 'environment-scratch'])('discards the complete half pair when %s fails, before preparing a fresh byte pair', (failedLabel) => {
    rig.halfFailure = failedLabel;
    const report = diagnostics();
    const result = createMeditationEnvironment(renderer, source(), 'auto', capabilities, report);
    expect(rig.pairs).toHaveLength(2);
    const [half, byte] = rig.pairs;
    expect(half.output).not.toBe(byte.output);
    expect(half.scratch).not.toBe(byte.scratch);
    expect(events('check', half.id)).toHaveLength(2);
    expect(events('generate', half.id)).toHaveLength(0);
    const byteAllocationIndex = rig.events.findIndex((event) => event.kind === 'allocate' && event.id === byte.id);
    for (const name of ['output', 'scratch']) {
      const disposalIndex = rig.events.findIndex((event) => event.kind === 'dispose' && event.id === half.id && event.target === name);
      expect(disposalIndex).toBeGreaterThan(-1);
      expect(disposalIndex).toBeLessThan(byteAllocationIndex);
    }
    expect(half.outputDisposals).toBe(1); expect(half.scratchDisposals).toBe(1);
    expect(events('allocate', byte.id)[0].dimensions).toEqual([336, 256, 336, 256]);
    expect(events('check', byte.id).map((event) => event.types)).toEqual([
      [THREE.UnsignedByteType, THREE.UnsignedByteType], [THREE.UnsignedByteType, THREE.UnsignedByteType],
    ]);
    const generation = events('generate', byte.id)[0];
    expect(generation.output).toBe(byte.output);
    expect(generation.types).toEqual([THREE.UnsignedByteType, THREE.UnsignedByteType]);
    expect(generation.checksAlreadyCompleted).toEqual(['environment-output', 'environment-scratch']);
    expect(result).toBe(byte.output);
    expect(byte.outputDisposals).toBe(0); expect(byte.scratchDisposals).toBe(1);
    expect(report.attempts.map(({ target, storage, ok }) => ({ target, storage, ok }))).toEqual([
      { target: 'environment', storage: 'half-float', ok: false },
      { target: 'environment', storage: 'unsigned-byte', ok: true },
      { target: 'environment-generation', storage: 'unsigned-byte', ok: true },
    ]);
    expectRestoredBeforeDisposal();
  });

  it('releases both final byte targets and never generates when their FBO checks fail', () => {
    rig.halfFailure = 'environment-output'; rig.byteFailure = true;
    expect(() => createMeditationEnvironment(renderer, source(), 'auto', capabilities, diagnostics())).toThrow(/checked byte allocation also failed/);
    expect(rig.pairs).toHaveLength(2);
    expect(events('generate')).toHaveLength(0);
    for (const pair of rig.pairs) {
      expect(pair.outputDisposals).toBe(1); expect(pair.scratchDisposals).toBe(1);
      expect(pair.generatorDisposals).toBe(1);
    }
    expectRestoredBeforeDisposal();
  });

  it('force-byte checks both byte targets without first allocating a half-float pair', () => {
    const result = createMeditationEnvironment(renderer, source(), 'force-byte', capabilities, diagnostics());
    expect(rig.pairs).toHaveLength(1);
    expect(events('check').map((event) => event.types)).toEqual([
      [THREE.UnsignedByteType, THREE.UnsignedByteType], [THREE.UnsignedByteType, THREE.UnsignedByteType],
    ]);
    expect(result).toBe(rig.pairs[0].output);
    expectRestoredBeforeDisposal();
  });

  it('restores caller state and releases output plus scratch after a generation exception', () => {
    rig.generationThrows = true;
    const report = diagnostics();
    expect(() => createMeditationEnvironment(renderer, source(), 'auto', capabilities, report)).toThrow(/Mock PMREM shader generation failed/);
    expect(events('generate')).toHaveLength(1);
    expect(rig.pairs[0].outputDisposals).toBe(1); expect(rig.pairs[0].scratchDisposals).toBe(1);
    expect(report.attempts.at(-1)).toMatchObject({ target: 'environment-generation', ok: false, error: expect.stringContaining('shader generation failed') });
    expectRestoredBeforeDisposal();
  });

  it('rejects a generated output with a reported GL error and releases both targets', () => {
    rig.glErrors.push(0x0506, 0);
    const report = diagnostics();
    expect(() => createMeditationEnvironment(renderer, source(), 'force-byte', capabilities, report)).toThrow(/GL errors: 0x506/);
    expect(rig.pairs[0].outputDisposals).toBe(1); expect(rig.pairs[0].scratchDisposals).toBe(1);
    expect(report.attempts.at(-1)).toMatchObject({ target: 'environment-generation', storage: 'unsigned-byte', ok: false, error: expect.stringContaining('0x506') });
    expectRestoredBeforeDisposal();
  });
});
