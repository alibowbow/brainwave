import { afterEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ renderer: {} as Record<string, unknown> }));
vi.mock('three', async (importOriginal) => ({
  ...await importOriginal<typeof import('three')>(),
  WebGLRenderer: class { constructor() { Object.assign(this, mocks.renderer); } },
}));
// These tests execute the real Engine's scheduling and resize methods. Render
// target capability/FBO behavior has its own tests and is not a mocked pixel test.
vi.mock('./forestRenderTargets', async (importOriginal) => ({
  ...await importOriginal<typeof import('./forestRenderTargets')>(),
  createForestTargetPolicy: () => ({ mode: 'byte', halfFloatSupported: false, checks: [] }),
}));
import { ForestEngine } from './ForestEngine';

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

function rig() {
  let now = 0, task = 0, nextRequest = 0, nextFence = 0, ratio = 1;
  const requests = new Map<number, FrameRequestCallback>();
  const fences = new Map<WebGLSync, number>();
  const renders: { width: number; height: number; task: number }[] = [];
  const contextLost = vi.fn();
  const gl = {
    SYNC_GPU_COMMANDS_COMPLETE: 0x9117, ALREADY_SIGNALED: 0x911a, TIMEOUT_EXPIRED: 0x911b,
    CONDITION_SATISFIED: 0x911c, WAIT_FAILED: 0x911d,
    isContextLost: vi.fn(() => false),
    fenceSync: vi.fn(() => { const fence = { id: ++nextFence } as WebGLSync; fences.set(fence, gl.TIMEOUT_EXPIRED); return fence; }),
    clientWaitSync: vi.fn((fence: WebGLSync, flags: number, timeout: number) => { expect([flags, timeout]).toEqual([0, 0]); return fences.get(fence)!; }),
    deleteSync: vi.fn((fence: WebGLSync) => { fences.delete(fence); }), flush: vi.fn(),
  };
  class Canvas extends EventTarget {
    dataset: Record<string, string> = {};
    width = 300; height = 150; isConnected = true;
    parentElement = {} as HTMLElement;
    toDataURL = vi.fn((mime: string) => {
      expect(mime).toBe('image/png'); expect(renders.at(-1)?.task).toBe(task);
      return 'data:image/png;base64,fixture';
    });
  }
  const canvas = new Canvas();
  const renderer = {
    getContext: () => gl,
    shadowMap: {}, info: { autoReset: true, reset: vi.fn(), render: { calls: 1, triangles: 3 } },
    setPixelRatio: vi.fn((value: number) => { ratio = value; }), getPixelRatio: () => ratio,
    setSize: vi.fn((width: number, height: number, updateStyle: boolean) => {
      expect(updateStyle).toBe(false); canvas.width = Math.floor(width * ratio); canvas.height = Math.floor(height * ratio);
    }),
    render: vi.fn(() => { renders.push({ width: canvas.width, height: canvas.height, task }); }),
    renderLists: { dispose: vi.fn() }, dispose: vi.fn(), forceContextLoss: vi.fn(),
  };
  mocks.renderer = renderer;
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { const id = ++nextRequest; requests.set(id, callback); return id; });
  vi.stubGlobal('cancelAnimationFrame', (id: number) => { requests.delete(id); });
  vi.spyOn(performance, 'now').mockImplementation(() => now);
  const engine = new ForestEngine(canvas as unknown as HTMLCanvasElement, contextLost);
  Object.assign(engine, { ready: true, waterUniforms: { time: { value: 0 } } });
  return {
    engine, canvas, renderer, gl, renders, requests, contextLost,
    tick: () => { task++; now += 16; const callbacks = [...requests.values()]; requests.clear(); for (const callback of callbacks) callback(now); expect(requests.size).toBeLessThanOrEqual(1); },
    signal: () => { for (const fence of fences.keys()) fences.set(fence, gl.CONDITION_SATISFIED); },
  };
}

describe('ForestEngine uses one bounded path for actual main frames', () => {
  it('coalesces many paused resizes/holder transfers and restores the latest native buffer', () => {
    const r = rig(), originalCanvas = r.canvas;
    r.engine.setSize(1440, 1000, 1); r.engine.renderFrame(0); r.tick();
    r.engine.setSize(344, 800, 2); r.engine.renderFrame(0); r.tick();
    for (let i = 0; i < 120; i++) {
      // attachTop plus ResizeObserver request a frame from the same engine.
      r.engine.setSize(500 + i, 300 + i, 2); r.engine.renderFrame(0); r.engine.renderFrame(0); r.tick();
    }
    r.engine.setSize(1440, 1000, 1); r.engine.renderFrame(0); r.tick();
    expect(r.renders).toHaveLength(2); expect(r.renderer.setSize).toHaveBeenCalledTimes(2);
    expect([r.canvas.width, r.canvas.height]).toEqual([688, 1600]); // no premature clear while full
    expect(r.canvas.dataset.gpuQueued).toBe('true'); expect(r.canvas.dataset.time).toBe('0.0000');
    r.signal(); r.tick();
    expect(r.renders).toHaveLength(3); expect(r.renders.at(-1)).toMatchObject({ width: 1440, height: 1000 });
    expect(r.canvas).toBe(originalCanvas); expect(r.canvas.dataset.gpuQueued).toBe('false'); expect(r.canvas.dataset.time).toBe('0.0000');
    r.signal(); r.tick();
    expect(r.canvas.dataset.gpuCompleted).toBe('3'); expect(r.requests.size).toBe(0);
    r.engine.dispose();
  });

  it('does not clear or redraw an unchanged paused size after an observer duplicate', () => {
    const r = rig(); r.engine.setSize(882, 344, 2); r.engine.renderFrame(0); r.tick();
    for (let i = 0; i < 50; i++) { r.engine.setSize(882, 344, 2); r.engine.renderFrame(0); r.tick(); }
    expect(r.renderer.setSize).toHaveBeenCalledTimes(1); expect(r.renders).toHaveLength(1);
    expect([r.canvas.width, r.canvas.height]).toEqual([1764, 688]);
    r.engine.dispose();
  });

  it('refreshes the restored paused holder even when both holders have identical dimensions', () => {
    const r = rig(), firstHolder = r.canvas.parentElement;
    r.engine.setSize(1440, 1000, 1); r.engine.renderFrame(0); r.tick();
    r.canvas.parentElement = {} as HTMLElement;
    r.engine.setSize(1440, 1000, 1); r.engine.renderFrame(0); r.tick();
    r.canvas.parentElement = firstHolder;
    r.engine.setSize(1440, 1000, 1); r.engine.renderFrame(0); r.tick();
    expect(r.renders).toHaveLength(2); expect(r.canvas.dataset.gpuQueued).toBe('true');
    r.signal(); r.tick();
    expect(r.renders).toHaveLength(3); expect(r.canvas.parentElement).toBe(firstHolder);
    expect(r.renderer.setSize).toHaveBeenCalledTimes(1); // holder refresh never clears a same-size buffer
    expect(r.canvas.dataset.time).toBe('0.0000');
    r.engine.dispose();
  });

  it('waits for a capture slot, reads the new full-size frame in the same task, and stays paused', async () => {
    const r = rig(); r.engine.start(); r.tick(); r.tick(); r.engine.stop();
    const time = r.canvas.dataset.time;
    r.engine.setSize(344, 800, 2);
    const capture = r.engine.captureFrame(); r.tick();
    expect(r.canvas.toDataURL).not.toHaveBeenCalled(); expect(r.renders).toHaveLength(2);
    r.signal(); r.tick();
    expect(await capture).toMatchObject({ width: 688, height: 1600, method: 'same-task-webgl-png', dataUrl: 'data:image/png;base64,fixture' });
    expect(r.canvas.dataset.time).toBe(time); expect(r.canvas.dataset.running).toBe('false');
    expect(r.canvas.dataset.gpuPending).toBe('1'); expect(r.canvas.dataset.gpuCompleted).toBe('2');
    r.signal(); r.tick(); expect(r.canvas.dataset.gpuCompleted).toBe('3'); expect(r.renders).toHaveLength(3);
    r.engine.dispose();
  });

  it('preserves a queued paused frame across detach/restore and disposes only once', () => {
    const r = rig(); r.engine.start(); r.tick(); r.tick(); r.engine.stop();
    r.engine.setSize(344, 800, 2); r.canvas.isConnected = false; r.signal(); r.tick();
    expect(r.renders).toHaveLength(2); expect(r.requests.size).toBe(0);
    r.canvas.isConnected = true; r.engine.setSize(344, 800, 2); r.engine.renderFrame(0); r.tick();
    expect(r.renders.at(-1)).toMatchObject({ width: 688, height: 1600 });
    r.engine.dispose();
    const entry = r.canvas.dataset.disposeStartedAt, exit = r.canvas.dataset.disposeFinishedAt;
    r.tick(); r.engine.dispose(); r.engine.renderFrame(0); r.engine.start(); r.tick();
    expect(r.renderer.dispose).toHaveBeenCalledTimes(1); expect(r.renderer.forceContextLoss).toHaveBeenCalledTimes(1);
    expect(r.renders).toHaveLength(3); expect(r.requests.size).toBe(0);
    expect(r.canvas.dataset).toMatchObject({ disposed: 'true', gpuPending: '0', gpuAbandoned: '1', disposeStartedAt: entry, disposeFinishedAt: exit });
    expect(Number(exit)).toBeGreaterThanOrEqual(Number(entry));
  });

  it('reports a returned renderer frame even if the following framebuffer audit faults', () => {
    const r = rig();
    Object.assign(r.engine, { auditRenderTargets: () => { throw new Error('incomplete shadow framebuffer'); } });
    r.engine.renderFrame(0); r.tick();
    expect(r.renderer.render).toHaveBeenCalledTimes(1);
    expect(r.canvas.dataset).toMatchObject({ frames: '1', gpuSubmissionAttempts: '1', gpuCompleted: '0', gpuAbandoned: '1', gpuFault: 'submission-error' });
    expect(r.contextLost).toHaveBeenCalledTimes(1); expect(r.requests.size).toBe(0);
    r.engine.dispose();
  });
});
