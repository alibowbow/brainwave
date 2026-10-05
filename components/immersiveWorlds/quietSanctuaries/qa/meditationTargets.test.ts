import { afterEach, describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import {
  checkMeditationTarget,
  selectCheckedTarget,
  type TargetCapabilities,
  type TargetDiagnostics,
  type TargetStorage,
} from '../meditationTargets';

// These are policy/state unit tests with explicit renderer/GL fakes, not GPU compatibility evidence.
const floatCapabilities: TargetCapabilities = { floatColorBuffer: true, halfFloatColorBuffer: false };
const byteCapabilities: TargetCapabilities = { floatColorBuffer: false, halfFloatColorBuffer: false };
const targetsToDispose: THREE.WebGLRenderTarget[] = [];
function target(width = 37, height = 19, options: THREE.RenderTargetOptions = {}) {
  const value = new THREE.WebGLRenderTarget(width, height, options);
  targetsToDispose.push(value);
  return value;
}
afterEach(() => { targetsToDispose.splice(0).forEach((value) => value.dispose()); });

function candidate(storage: TargetStorage, outcome: 'complete' | 'incomplete' | Error, events: string[] = []) {
  return {
    value: { storage },
    check: vi.fn(() => {
      events.push(`check:${storage}`);
      if (outcome instanceof Error) throw outcome;
      return outcome === 'complete';
    }),
    dispose: vi.fn(() => { events.push(`dispose:${storage}`); }),
  };
}

describe('selectCheckedTarget storage policy', () => {
  it.each([
    { floatColorBuffer: true, halfFloatColorBuffer: false },
    { floatColorBuffer: false, halfFloatColorBuffer: true },
    { floatColorBuffer: true, halfFloatColorBuffer: true },
  ])('checks half-float first when either extension is available: %j', (capabilities) => {
    const half = candidate('half-float', 'complete');
    const allocate = vi.fn(() => half);
    const report = vi.fn();
    expect(selectCheckedTarget(capabilities, 'auto', allocate, report)).toBe(half.value);
    expect(allocate).toHaveBeenCalledExactlyOnceWith('half-float');
    expect(half.check).toHaveBeenCalledOnce();
    expect(half.dispose).not.toHaveBeenCalled();
    expect(report).toHaveBeenCalledExactlyOnceWith('half-float', true);
  });

  it.each([
    { capabilities: byteCapabilities, mode: 'auto' as const },
    { capabilities: floatCapabilities, mode: 'force-byte' as const },
    { capabilities: { floatColorBuffer: false, halfFloatColorBuffer: true }, mode: 'force-byte' as const },
    { capabilities: byteCapabilities, mode: 'force-byte' as const },
  ])('only allocates checked byte storage for %j', ({ capabilities, mode }) => {
    const byte = candidate('unsigned-byte', 'complete');
    const allocate = vi.fn(() => byte);
    expect(selectCheckedTarget(capabilities, mode, allocate)).toBe(byte.value);
    expect(allocate).toHaveBeenCalledExactlyOnceWith('unsigned-byte');
    expect(byte.check).toHaveBeenCalledOnce();
    expect(byte.dispose).not.toHaveBeenCalled();
  });

  it.each(['incomplete', new Error('half framebuffer probe threw')] as const)(
    'releases a rejected half candidate before checking byte fallback (%s)', (halfOutcome) => {
      const events: string[] = [];
      const half = candidate('half-float', halfOutcome, events);
      const byte = candidate('unsigned-byte', 'complete', events);
      const report = vi.fn();
      const allocate = vi.fn((storage: TargetStorage) => {
        events.push(`allocate:${storage}`);
        return storage === 'half-float' ? half : byte;
      });
      expect(selectCheckedTarget(floatCapabilities, 'auto', allocate, report)).toBe(byte.value);
      expect(half.dispose).toHaveBeenCalledOnce();
      expect(byte.dispose).not.toHaveBeenCalled();
      expect(events.indexOf('dispose:half-float')).toBeLessThan(events.indexOf('allocate:unsigned-byte'));
      expect(byte.check).toHaveBeenCalledOnce();
      expect(report.mock.calls.map(([storage, ok]) => [storage, ok])).toEqual([
        ['half-float', false], ['unsigned-byte', true],
      ]);
      if (halfOutcome instanceof Error) expect(report.mock.calls[0][2]).toBe(halfOutcome);
      else expect(String(report.mock.calls[0][2])).toMatch(/incomplete|GL error/i);
    },
  );

  it('continues to a checked byte candidate when half allocation itself throws', () => {
    const allocationError = new Error('half target allocation failed');
    const byte = candidate('unsigned-byte', 'complete');
    const report = vi.fn();
    const allocate = vi.fn((storage: TargetStorage) => {
      if (storage === 'half-float') throw allocationError;
      return byte;
    });
    expect(selectCheckedTarget(floatCapabilities, 'auto', allocate, report)).toBe(byte.value);
    expect(allocate.mock.calls.map(([storage]) => storage)).toEqual(['half-float', 'unsigned-byte']);
    expect(report).toHaveBeenNthCalledWith(1, 'half-float', false, allocationError);
    expect(byte.check).toHaveBeenCalledOnce();
    expect(byte.dispose).not.toHaveBeenCalled();
  });

  it.each(['incomplete', new Error('byte framebuffer probe threw')] as const)(
    'fails honestly and releases both rejected candidates when byte cannot work (%s)', (byteOutcome) => {
      const half = candidate('half-float', 'incomplete');
      const byte = candidate('unsigned-byte', byteOutcome);
      const report = vi.fn();
      expect(() => selectCheckedTarget(floatCapabilities, 'auto', (storage) => storage === 'half-float' ? half : byte, report))
        .toThrow(/render target unavailable.*checked byte allocation also failed/i);
      expect(half.dispose).toHaveBeenCalledOnce();
      expect(byte.dispose).toHaveBeenCalledOnce();
      expect(report.mock.calls.map(([storage, ok]) => [storage, ok])).toEqual([
        ['half-float', false], ['unsigned-byte', false],
      ]);
      if (byteOutcome instanceof Error) expect(report.mock.calls[1][2]).toBe(byteOutcome);
    },
  );

  it('does not leak the byte-only candidate when its completeness check fails', () => {
    const byte = candidate('unsigned-byte', 'incomplete');
    const allocate = vi.fn(() => byte);
    expect(() => selectCheckedTarget(byteCapabilities, 'auto', allocate)).toThrow(/unsigned-byte/);
    expect(allocate).toHaveBeenCalledExactlyOnceWith('unsigned-byte');
    expect(byte.dispose).toHaveBeenCalledOnce();
  });

  it('retains byte allocation exception details without pretending a target was created', () => {
    const allocationError = new Error('byte allocation exhausted');
    const allocate = vi.fn(() => { throw allocationError; });
    const report = vi.fn();
    expect(() => selectCheckedTarget(floatCapabilities, 'force-byte', allocate, report)).toThrow(/byte allocation exhausted/);
    expect(allocate).toHaveBeenCalledExactlyOnceWith('unsigned-byte');
    expect(report).toHaveBeenCalledExactlyOnceWith('unsigned-byte', false, allocationError);
  });
});

const GL = {
  NO_ERROR: 0,
  FRAMEBUFFER: 0x8d40,
  FRAMEBUFFER_COMPLETE: 0x8cd5,
  FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 0x8cd6,
  FRAMEBUFFER_BINDING: 0x8ca6,
  SCISSOR_BOX: 0x0c10,
  SCISSOR_TEST: 0x0c11,
  INVALID_OPERATION: 0x0502,
  INVALID_FRAMEBUFFER_OPERATION: 0x0506,
};
interface FakeOptions {
  defaultFramebuffer?: boolean;
  status?: number;
  errorsBefore?: number[];
  errorsDuring?: number[];
  bindError?: Error;
  checkError?: Error;
  wrongRestoredFramebuffer?: boolean;
  restorationErrors?: number[];
  mutateRendererDuringProbe?: boolean;
}

function fakeRenderer(probe: THREE.WebGLRenderTarget, options: FakeOptions = {}) {
  const previous = options.defaultFramebuffer ? null : target(300, 190);
  const previousLayout = previous ? {
    viewport: previous.viewport.toArray(), scissor: previous.scissor.toArray(), scissorTest: previous.scissorTest,
  } : null;
  const priorFramebuffer = previous ? { name: 'previous-framebuffer' } : null;
  const probeFramebuffer = { name: 'probe-framebuffer' };
  const state = {
    target: previous,
    face: previous ? 2 : 0,
    mip: previous ? 1 : 0,
    viewport: new THREE.Vector4(3, 5, 640, 360),
    currentViewport: previous ? new THREE.Vector4(13, 17, 80, 55) : new THREE.Vector4(3, 5, 640, 360),
    scissor: new THREE.Vector4(7, 9, 420, 270),
    currentScissor: previous ? new THREE.Vector4(19, 23, 67, 49) : new THREE.Vector4(7, 9, 420, 270),
    scissorTest: false,
    currentScissorTest: Boolean(previous),
    framebuffer: priorFramebuffer as object | null,
    clearColor: new THREE.Color('#35697f'),
    clearAlpha: .37,
  };
  const errors = [...(options.errorsBefore ?? [])];
  const gl = {
    ...GL,
    getError: vi.fn(() => errors.shift() ?? GL.NO_ERROR),
    getParameter: vi.fn((parameter: number) => {
      if (parameter === GL.SCISSOR_BOX) return new Int32Array(state.currentScissor.toArray());
      if (parameter === GL.FRAMEBUFFER_BINDING) return state.framebuffer;
      throw new Error(`Unexpected fake GL parameter ${parameter}`);
    }),
    isEnabled: vi.fn((parameter: number) => {
      if (parameter !== GL.SCISSOR_TEST) throw new Error(`Unexpected fake GL capability ${parameter}`);
      return state.currentScissorTest;
    }),
    checkFramebufferStatus: vi.fn((binding: number) => {
      expect(binding).toBe(GL.FRAMEBUFFER);
      expect(state.target).toBe(probe);
      if (options.checkError) throw options.checkError;
      return options.status ?? GL.FRAMEBUFFER_COMPLETE;
    }),
  };
  const api = {
    xr: { enabled: true },
    autoClear: false,
    toneMapping: THREE.ACESFilmicToneMapping as THREE.ToneMapping,
    getContext: () => gl,
    getRenderTarget: () => state.target,
    getActiveCubeFace: () => state.face,
    getActiveMipmapLevel: () => state.mip,
    getViewport: (value: THREE.Vector4) => value.copy(state.viewport),
    getCurrentViewport: (value: THREE.Vector4) => value.copy(state.currentViewport),
    getScissor: (value: THREE.Vector4) => value.copy(state.scissor),
    getScissorTest: () => state.scissorTest,
    getClearColor: (value: THREE.Color) => value.copy(state.clearColor),
    getClearAlpha: () => state.clearAlpha,
    setClearColor: (value: THREE.Color, alpha: number) => { state.clearColor.copy(value); state.clearAlpha = alpha; },
    setViewport: (value: THREE.Vector4) => { state.viewport.copy(value); state.currentViewport.copy(value); },
    setScissor: (value: THREE.Vector4) => { state.scissor.copy(value); state.currentScissor.copy(value); },
    setScissorTest: (value: boolean) => { state.scissorTest = value; state.currentScissorTest = value; },
    setRenderTarget: vi.fn((value: THREE.WebGLRenderTarget | null, face = 0, mip = 0) => {
      state.target = value; state.face = face; state.mip = mip;
      state.currentViewport.copy(value?.viewport ?? state.viewport);
      state.currentScissor.copy(value?.scissor ?? state.scissor);
      state.currentScissorTest = value?.scissorTest ?? state.scissorTest;
      state.framebuffer = value === probe ? probeFramebuffer : priorFramebuffer;
      if (value === probe) {
        errors.push(...(options.errorsDuring ?? []));
        if (options.mutateRendererDuringProbe) {
          api.xr.enabled = false; api.autoClear = true; api.toneMapping = THREE.NoToneMapping;
          state.clearColor.set('#f6cc88'); state.clearAlpha = 1;
          state.viewport.set(0, 0, 1, 1); state.scissor.set(0, 0, 2, 2); state.scissorTest = true;
        }
        // Simulate partial native allocation before failure, so restoration must actually do work.
        if (options.bindError) throw options.bindError;
      } else {
        if (options.wrongRestoredFramebuffer) state.framebuffer = { name: 'wrong-framebuffer' };
        errors.push(...(options.restorationErrors ?? []));
      }
    }),
  };
  const inspect = () => ({
    target: state.target,
    face: state.face, mip: state.mip,
    viewport: state.viewport.toArray(), currentViewport: state.currentViewport.toArray(),
    scissor: state.scissor.toArray(), currentScissor: state.currentScissor.toArray(),
    scissorTest: state.scissorTest, currentScissorTest: state.currentScissorTest,
    framebuffer: state.framebuffer,
    xr: api.xr.enabled, autoClear: api.autoClear, toneMapping: api.toneMapping,
    clearColor: state.clearColor.toArray(), clearAlpha: state.clearAlpha,
  });
  return { renderer: api as unknown as THREE.WebGLRenderer, api, gl, state, previous, previousLayout, inspect };
}

const diagnostics = (): TargetDiagnostics => ({ checks: [], attempts: [] });

describe('checkMeditationTarget native-GL adapter (unit fakes only)', () => {
  it.each([THREE.HalfFloatType, THREE.UnsignedByteType])('checks and records the actual target allocation (type %s)', (type) => {
    const probe = target(37, 19, { type, format: THREE.RGBAFormat, depthBuffer: true, samples: 2 });
    const fake = fakeRenderer(probe, { mutateRendererDuringProbe: true });
    const before = fake.inspect();
    const records = diagnostics();
    expect(checkMeditationTarget(fake.renderer, probe, 'unit-reflection', records)).toBe(true);
    expect(records.checks).toHaveLength(1);
    expect(records.checks[0]).toMatchObject({
      label: 'unit-reflection', width: 37, height: 19,
      storage: type === THREE.HalfFloatType ? 'half-float' : 'unsigned-byte', type,
      format: THREE.RGBAFormat, depthBuffer: true, samples: 2,
      status: GL.FRAMEBUFFER_COMPLETE, statusHex: '0x8cd5',
      glErrorsBefore: [], glErrors: [], restorationErrors: [],
      framebufferRestored: true, stateRestored: true, ok: true,
    });
    expect(fake.gl.checkFramebufferStatus).toHaveBeenCalledOnce();
    expect(fake.api.setRenderTarget).toHaveBeenNthCalledWith(1, probe, 0, 0);
    expect(fake.inspect()).toEqual(before);
    expect(fake.state.framebuffer).toBe(before.framebuffer);
    // Restoring an active viewport must not overwrite the target's persistent layout.
    expect({ viewport: fake.previous!.viewport.toArray(), scissor: fake.previous!.scissor.toArray(), scissorTest: fake.previous!.scissorTest })
      .toEqual(fake.previousLayout);
    expect(records.checks[0].before).toEqual(records.checks[0].after);
  });

  it('restores the default framebuffer and reports a depthless, non-MSAA target accurately', () => {
    const probe = target(11, 7, { type: THREE.UnsignedByteType, depthBuffer: false, samples: 0 });
    const fake = fakeRenderer(probe, { defaultFramebuffer: true, mutateRendererDuringProbe: true });
    const before = fake.inspect();
    const records = diagnostics();
    expect(checkMeditationTarget(fake.renderer, probe, 'unit-environment', records)).toBe(true);
    expect(records.checks[0]).toMatchObject({ width: 11, height: 7, depthBuffer: false, samples: 0, stateRestored: true });
    expect(fake.inspect()).toEqual(before);
    expect(fake.state.framebuffer).toBeNull();
  });

  it('rejects an incomplete framebuffer even when no GL error is emitted', () => {
    const probe = target();
    const fake = fakeRenderer(probe, { status: GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT });
    const before = fake.inspect();
    const records = diagnostics();
    expect(checkMeditationTarget(fake.renderer, probe, 'incomplete', records)).toBe(false);
    expect(records.checks[0]).toMatchObject({ status: GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT, glErrors: [], stateRestored: true, ok: false });
    expect(fake.inspect()).toEqual(before);
  });

  it.each([
    { errorsBefore: [GL.INVALID_OPERATION], errorsDuring: [] },
    { errorsBefore: [], errorsDuring: [GL.INVALID_FRAMEBUFFER_OPERATION, GL.INVALID_OPERATION] },
  ])('does not call a complete framebuffer valid when native GL errors exist (%j)', (options) => {
    const probe = target();
    const fake = fakeRenderer(probe, options);
    const records = diagnostics();
    expect(checkMeditationTarget(fake.renderer, probe, 'native-error', records)).toBe(false);
    expect(records.checks[0]).toMatchObject({
      status: GL.FRAMEBUFFER_COMPLETE, glErrorsBefore: options.errorsBefore,
      glErrors: options.errorsDuring, restorationErrors: [], stateRestored: true, ok: false,
    });
  });

  it.each(['bindError', 'checkError'] as const)('restores full state and records evidence if %s throws', (failureAt) => {
    const probe = target(23, 17, { type: THREE.HalfFloatType });
    const originalError = new Error(`${failureAt}: native allocation/check failure`);
    const fake = fakeRenderer(probe, { [failureAt]: originalError, mutateRendererDuringProbe: true });
    const before = fake.inspect();
    const records = diagnostics();
    let thrown: unknown;
    try { checkMeditationTarget(fake.renderer, probe, failureAt, records); } catch (error) { thrown = error; }
    expect(thrown).toBe(originalError);
    expect(fake.inspect()).toEqual(before);
    expect(fake.state.framebuffer).toBe(before.framebuffer);
    expect(records.checks).toHaveLength(1);
    expect(records.checks[0]).toMatchObject({
      label: failureAt, width: 23, height: 17, status: null,
      framebufferRestored: true, stateRestored: true, ok: false, error: String(originalError),
    });
    if (failureAt === 'bindError') expect(fake.gl.checkFramebufferStatus).not.toHaveBeenCalled();
  });

  it.each([
    { wrongRestoredFramebuffer: true },
    { restorationErrors: [GL.INVALID_OPERATION] },
  ])('throws and records a failed restoration instead of accepting the candidate (%j)', (options) => {
    const probe = target();
    const fake = fakeRenderer(probe, options);
    const records = diagnostics();
    expect(() => checkMeditationTarget(fake.renderer, probe, 'bad-restore', records)).toThrow(/renderer state could not be restored/i);
    expect(records.checks[0]).toMatchObject({ stateRestored: false, ok: false });
    if ('wrongRestoredFramebuffer' in options) expect(records.checks[0].framebufferRestored).toBe(false);
    else expect(records.checks[0].restorationErrors).toEqual(options.restorationErrors);
  });

  it('disposes a candidate after failed restoration and stops rather than retrying on corrupted state', () => {
    const probe = target();
    const fake = fakeRenderer(probe, { wrongRestoredFramebuffer: true });
    const records = diagnostics();
    const dispose = vi.fn();
    const allocate = vi.fn(() => ({ value: probe, check: () => checkMeditationTarget(fake.renderer, probe, 'restore-failure', records), dispose }));
    const report = vi.fn();
    expect(() => selectCheckedTarget(floatCapabilities, 'auto', allocate, report)).toThrow(/renderer state could not be restored/i);
    expect(allocate).toHaveBeenCalledExactlyOnceWith('half-float');
    expect(dispose).toHaveBeenCalledOnce();
    expect(report.mock.calls[0].slice(0, 2)).toEqual(['half-float', false]);
  });
});
