import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { DeepWaterEngine } from './DeepWaterEngine';

const mock = vi.hoisted(() => ({ renderer: {} as object }));
vi.mock('three', async importOriginal => ({
  ...await importOriginal<typeof import('three')>(),
  WebGLRenderer: class { constructor() { return mock.renderer; } },
}));

// These tests exercise scheduling with synthetic sync statuses. Real GPU
// completion and image evidence remain the browser harness's responsibility.
describe('DeepWater bounded GPU submissions', () => {
  let engine: DeepWaterEngine;
  let canvas: HTMLCanvasElement;
  let callbacks: Map<number, FrameRequestCallback>;
  let statuses: Map<WebGLSync, number>;
  let onFailure: ReturnType<typeof vi.fn<() => void>>;
  let gl: {
    SYNC_GPU_COMMANDS_COMPLETE: number; TIMEOUT_EXPIRED: number;
    ALREADY_SIGNALED: number; CONDITION_SATISFIED: number; WAIT_FAILED: number;
    fenceSync: ReturnType<typeof vi.fn<() => WebGLSync | null>>;
    clientWaitSync: ReturnType<typeof vi.fn<(fence: WebGLSync, flags: number, timeout: number) => number>>;
    deleteSync: ReturnType<typeof vi.fn>; flush: ReturnType<typeof vi.fn>;
  };
  let render: ReturnType<typeof vi.fn>;
  let setSize: ReturnType<typeof vi.fn>;

  const step = () => {
    const pending = [...callbacks.values()]; callbacks.clear();
    pending.forEach(callback => callback(performance.now()));
  };

  beforeEach(() => {
    vi.useFakeTimers();
    callbacks = new Map(); statuses = new Map(); let nextId = 0;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { callbacks.set(++nextId, callback); return nextId; });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => callbacks.delete(id));
    vi.stubGlobal('window', { setTimeout, clearTimeout });
    gl = {
      SYNC_GPU_COMMANDS_COMPLETE: 37143, TIMEOUT_EXPIRED: 37147,
      ALREADY_SIGNALED: 37146, CONDITION_SATISFIED: 37148, WAIT_FAILED: 37149,
      fenceSync: vi.fn(() => { const fence = {} as WebGLSync; statuses.set(fence, gl.TIMEOUT_EXPIRED); return fence; }),
      clientWaitSync: vi.fn(fence => statuses.get(fence)!),
      deleteSync: vi.fn(fence => statuses.delete(fence)), flush: vi.fn(),
    };
    render = vi.fn(); setSize = vi.fn(); onFailure = vi.fn();
    mock.renderer = {
      shadowMap: {}, renderLists: { dispose: vi.fn() },
      info: { render: { calls: 1, triangles: 1 }, memory: { geometries: 1 } },
      getContext: () => gl, render, setSize, setPixelRatio: vi.fn(), dispose: vi.fn(), forceContextLoss: vi.fn(),
    };
    canvas = { dataset: {}, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as HTMLCanvasElement;
    engine = new DeepWaterEngine(canvas, 'sea', onFailure);
    Object.assign(engine, { content: { scene: new THREE.Scene(), camera: new THREE.PerspectiveCamera(), target: new THREE.Vector3(), update: vi.fn() } });
  });

  afterEach(() => { engine.dispose(); vi.unstubAllGlobals(); vi.useRealTimers(); });

  it('holds at two in-flight draws and eventually renders a queued paused resize', () => {
    engine.renderFrame(0); engine.renderFrame(0);
    engine.setSize(390, 844, 2); engine.renderFrame(0);
    step();
    expect(render).toHaveBeenCalledTimes(2);
    expect(canvas.dataset.gpuPending).toBe('2');
    statuses.set([...statuses.keys()][0], gl.CONDITION_SATISFIED);
    step();
    expect(render).toHaveBeenCalledTimes(3);
    expect(setSize).toHaveBeenCalledWith(390, 844, false);
    expect(canvas.dataset.gpuPending).toBe('2');
    expect(callbacks.size).toBe(0);
    expect(gl.clientWaitSync.mock.calls.every(([, flags, timeout]) => flags === 0 && timeout === 0)).toBe(true);
  });

  it('does not treat stopped animation as completed GPU work', async () => {
    engine.renderFrame(0); engine.stop();
    let complete = false;
    const idle = engine.awaitGPUIdle().then(() => { complete = true; });
    await Promise.resolve();
    expect(complete).toBe(false);
    statuses.forEach((_, fence) => statuses.set(fence, gl.ALREADY_SIGNALED));
    step(); await idle;
    expect(canvas.dataset.gpuState).toBe('idle');
    expect(gl.deleteSync).toHaveBeenCalledTimes(1);
    expect(callbacks.size).toBe(0);
  });

  it('reports WAIT_FAILED without counting it as idle or submitting another draw', async () => {
    engine.renderFrame(0);
    statuses.forEach((_, fence) => statuses.set(fence, gl.WAIT_FAILED));
    engine.renderFrame(0);
    expect(render).toHaveBeenCalledTimes(1);
    expect(onFailure).toHaveBeenCalledTimes(1);
    expect(canvas.dataset.gpuState).toBe('failed');
    await expect(engine.awaitGPUIdle()).rejects.toThrow('GPU completion check failed');
  });

  it('reports an unavailable completion fence rather than allowing unbounded submissions', async () => {
    gl.fenceSync.mockReturnValueOnce(null);
    engine.renderFrame(0); engine.renderFrame(0);
    expect(render).toHaveBeenCalledTimes(1);
    expect(onFailure).toHaveBeenCalledTimes(1);
    await expect(engine.awaitGPUIdle()).rejects.toThrow('Could not create');
  });

  it('deletes outstanding syncs and cancels queued demand and idle waits on disposal', async () => {
    engine.renderFrame(0); engine.renderFrame(0); engine.renderFrame(0);
    const idle = engine.awaitGPUIdle();
    engine.dispose();
    await expect(idle).rejects.toThrow('disposed before GPU completion');
    expect(gl.deleteSync).toHaveBeenCalledTimes(2);
    expect(callbacks.size).toBe(0);
    expect(canvas.dataset.gpuState).toBe('disposed');
    expect(vi.getTimerCount()).toBe(0);
  });

  it('rejects a running renderer and times out honestly when stopped fences stay busy', async () => {
    engine.start();
    await expect(engine.awaitGPUIdle()).rejects.toThrow('Stop the renderer');
    engine.stop(); engine.renderFrame(0);
    const idle = expect(engine.awaitGPUIdle(100)).rejects.toThrow('Timed out');
    await vi.advanceTimersByTimeAsync(100); await idle;
    expect(canvas.dataset.gpuState).toBe('busy');
    expect(callbacks.size).toBe(0);
  });
});
