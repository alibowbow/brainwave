import { afterEach, describe, expect, it, vi } from 'vitest';
import type { PerspectiveCamera } from 'three';

const doubles = vi.hoisted(() => ({ renderer: null as any, content: null as any }));
vi.mock('three', async importOriginal => ({
  ...await importOriginal<typeof import('three')>(),
  WebGLRenderer: vi.fn(function () { return doubles.renderer; }),
}));
vi.mock('./scenes/morningPorch', () => ({ createMorningPorch: () => doubles.content }));
vi.mock('./scenes/rainyForest', () => ({ createRainyForest: () => doubles.content }));
vi.mock('./scenes/ancientForest', () => ({ createAncientForest: () => doubles.content }));
vi.mock('./scenes/bamboo', () => ({ createBamboo: () => doubles.content }));
import { WoodsEngine } from './engine';

/** Actual engine + gate; only the GPU, scene construction, clock and RAF are doubles. */
function setup() {
  let now = 0, nextRaf = 0, syncSerial = 0;
  const pendingRafs = new Map<number, FrameRequestCallback>();
  const statuses = new Map<WebGLSync, number>();
  const state = { lost: false, nullFence: false };
  const gl = {
    ALREADY_SIGNALED: 0x911a, CONDITION_SATISFIED: 0x911c, TIMEOUT_EXPIRED: 0x911b,
    WAIT_FAILED: 0x911d, SYNC_GPU_COMMANDS_COMPLETE: 0x9117,
    isContextLost: () => state.lost,
    fenceSync: vi.fn(() => {
      if (state.nullFence) return null;
      const sync = { serial: ++syncSerial } as unknown as WebGLSync;
      statuses.set(sync, 0x911b); return sync;
    }),
    clientWaitSync: vi.fn((sync: WebGLSync) => statuses.get(sync)!),
    deleteSync: vi.fn(), flush: vi.fn(),
  };
  const orientations: number[][] = [];
  const renderer = {
    shadowMap: {}, getContext: () => gl,
    setPixelRatio: vi.fn(), setSize: vi.fn(),
    render: vi.fn((_scene: unknown, camera: PerspectiveCamera) => { orientations.push(camera.quaternion.toArray()); }),
    info: { render: { calls: 1, triangles: 1 }, memory: { geometries: 0, textures: 0 } },
    dispose: vi.fn(), forceContextLoss: vi.fn(() => { state.lost = true; }),
  };
  const content = { update: vi.fn(), resize: vi.fn(), interactionTargets: [], dispose: vi.fn() };
  doubles.renderer = renderer; doubles.content = content;
  vi.stubGlobal('window', {});
  vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => {
    const id = ++nextRaf; pendingRafs.set(id, callback); return id;
  }));
  vi.stubGlobal('cancelAnimationFrame', vi.fn((id: number) => { pendingRafs.delete(id); }));
  vi.spyOn(performance, 'now').mockImplementation(() => now);
  const canvas = Object.assign(new EventTarget(), {
    dataset: {} as Record<string, string>, toDataURL: vi.fn(() => 'data:image/png;base64,test-only-double'),
  }) as unknown as HTMLCanvasElement;
  let engine: WoodsEngine;
  // This matches the real host's synchronous failure -> teardown contract.
  const fail = vi.fn(() => engine.dispose());
  engine = new WoodsEngine(canvas, 'morning', fail);
  const tick = (elapsed = 16) => {
    now += elapsed;
    const callbacks = [...pendingRafs.values()]; pendingRafs.clear();
    callbacks.forEach(callback => callback(now));
  };
  const signalAll = () => { statuses.forEach((_status, sync) => statuses.set(sync, gl.ALREADY_SIGNALED)); };
  const initialize = async () => { engine.setSize(1280, 800, 1); await engine.init(); engine.renderFrame(0); };
  return { engine, canvas, renderer, content, gl, state, statuses, orientations, pendingRafs, tick, signalAll, initialize, fail };
}

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('LivingWoods actual engine scheduling and lifecycle', () => {
  it('does not schedule before init, deduplicates static host calls, and guards direct capture', async () => {
    const f = setup();
    f.engine.stop(); f.engine.renderFrame(0);
    expect(f.pendingRafs.size).toBe(0); expect(f.renderer.render).not.toHaveBeenCalled();
    await f.initialize();
    f.engine.setSize(1280, 800, 1); f.engine.renderFrame(0); f.engine.renderFrame(0);
    expect(f.renderer.render).toHaveBeenCalledOnce();
    expect(() => f.engine.captureFrame()).toThrow(/drained/);
    expect(f.canvas.toDataURL).not.toHaveBeenCalled();
    f.signalAll(); f.tick();
    expect(f.pendingRafs.size).toBe(0);
    expect(f.engine.captureFrame()).toBe('data:image/png;base64,test-only-double');
    expect(f.renderer.render).toHaveBeenCalledTimes(2);
    expect(f.canvas.dataset.time).toBe('0.0000');
    expect(f.canvas.dataset.pendingSubmissions).toBe('1');
    expect(f.canvas.toDataURL).toHaveBeenCalledExactlyOnceWith('image/png');
    f.engine.dispose();
  });

  it('coalesces all blocked paused resizes to the latest size and renders a later holder return', async () => {
    const f = setup(); await f.initialize();
    const canvasIdentity = f.canvas;
    f.engine.setSize(700, 800, 1); f.engine.renderFrame(0);
    for (const [width, height] of [[360, 780], [780, 360], [690, 780], [1280, 800], [900, 1200]]) {
      f.engine.setSize(width, height, 1); f.engine.renderFrame(0);
    }
    expect(f.renderer.render).toHaveBeenCalledTimes(2);
    expect(f.renderer.setSize).toHaveBeenCalledTimes(2);
    expect(f.canvas.dataset.pendingSubmissions).toBe('2');
    f.statuses.set([...f.statuses.keys()][0], f.gl.CONDITION_SATISFIED); f.tick();
    expect(f.renderer.render).toHaveBeenCalledTimes(3);
    expect(f.renderer.setSize).toHaveBeenLastCalledWith(900, 1200, false);
    expect(f.canvas.dataset.pendingStaticFrame).toBe('false');
    expect(f.canvas.dataset.time).toBe('0.0000');
    f.signalAll(); f.tick();
    expect(f.pendingRafs.size).toBe(0);
    f.engine.releaseDrag(); f.engine.setSize(1280, 800, 1); f.engine.renderFrame(0);
    expect(f.renderer.render).toHaveBeenCalledTimes(4);
    expect(f.renderer.setSize).toHaveBeenLastCalledWith(1280, 800, false);
    expect(f.canvas).toBe(canvasIdentity);
    expect(f.content.update.mock.calls.every(([_time, dt]) => dt === 0)).toBe(true);
    f.engine.dispose();
  });

  it('keeps one RAF across repeated pause/resume and never advances animation while blocked', async () => {
    const f = setup(); await f.initialize();
    f.engine.start(); f.engine.start(); f.tick();
    expect(f.renderer.render).toHaveBeenCalledTimes(2);
    const time = f.canvas.dataset.time;
    for (let i = 0; i < 8; i++) {
      f.engine.stop(); f.engine.start(); f.engine.start();
      expect(f.pendingRafs.size).toBe(1); f.tick(100);
      expect(f.renderer.render).toHaveBeenCalledTimes(2);
      expect(f.canvas.dataset.time).toBe(time);
    }
    f.engine.stop(); f.tick();
    expect(f.renderer.render).toHaveBeenCalledTimes(2);
    f.statuses.set([...f.statuses.keys()][0], f.gl.ALREADY_SIGNALED);
    f.engine.start(); f.tick();
    expect(f.renderer.render).toHaveBeenCalledTimes(3);
    expect(f.content.update.mock.calls.at(-1)?.[1]).toBe(0.016);
    f.engine.stop(); f.engine.stop(); f.signalAll(); f.tick();
    expect(f.pendingRafs.size).toBe(0);
    expect(f.renderer.render).toHaveBeenCalledTimes(3);
    f.engine.dispose();
  });

  it('restores a released look at the same holder size without advancing paused simulation', async () => {
    const f = setup(); await f.initialize(); f.signalAll(); f.tick();
    const centered = f.orientations[0];
    f.engine.start(); f.engine.drag(0.5, 0.4); f.tick();
    expect(f.orientations.at(-1)).not.toEqual(centered);
    f.engine.stop();
    const time = f.canvas.dataset.time;
    f.engine.releaseDrag(); f.engine.setSize(1280, 800, 1); f.engine.renderFrame(0);
    expect(f.orientations.at(-1)).toEqual(centered);
    expect(f.canvas.dataset.time).toBe(time);
    expect(f.renderer.setSize).toHaveBeenCalledOnce();
    f.signalAll(); f.tick();
    expect(f.pendingRafs.size).toBe(0);
    f.engine.dispose();
  });

  it('disposes pending GPU handles and engine resources once, cancelling all future work', async () => {
    const f = setup(); await f.initialize(); f.engine.start(); f.tick();
    expect(f.canvas.dataset.pendingSubmissions).toBe('2');
    f.engine.dispose(); f.engine.dispose();
    f.engine.start(); f.engine.setSize(360, 780, 2); f.engine.renderFrame(0); f.tick();
    expect(f.pendingRafs.size).toBe(0);
    expect(f.renderer.render).toHaveBeenCalledTimes(2);
    expect(f.gl.deleteSync).toHaveBeenCalledTimes(2);
    expect(f.content.dispose).toHaveBeenCalledOnce();
    expect(f.renderer.dispose).toHaveBeenCalledOnce(); expect(f.renderer.forceContextLoss).toHaveBeenCalledOnce();
    expect(f.canvas.dataset.pendingSubmissions).toBe('0');
    expect(f.canvas.dataset.disposed).toBe('true');
    expect(Number(f.canvas.dataset.disposeEndMs)).toBeGreaterThanOrEqual(Number(f.canvas.dataset.disposeStartMs));
    expect(() => f.engine.captureFrame()).toThrow(/drained/);
  });

  it('routes an actual gate fault through the host failure callback without completing unknown GPU work', async () => {
    const f = setup(); await f.initialize();
    f.statuses.set([...f.statuses.keys()][0], f.gl.WAIT_FAILED); f.tick();
    expect(f.fail).toHaveBeenCalledOnce();
    expect(f.canvas.dataset.renderFault).toMatch(/wait failed/);
    expect(f.canvas.dataset.completedSubmissions).toBe('0');
    expect(f.canvas.dataset.disposed).toBe('true');
    expect(f.pendingRafs.size).toBe(0);
    expect(f.gl.deleteSync).toHaveBeenCalledOnce();
    f.tick(); f.engine.dispose();
    expect(f.renderer.render).toHaveBeenCalledOnce(); expect(f.renderer.dispose).toHaveBeenCalledOnce();
  });
});
