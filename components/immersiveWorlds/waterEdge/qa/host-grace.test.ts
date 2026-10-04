import { afterEach, describe, expect, it, vi } from 'vitest';
import { LiveSceneHost, type LiveSceneEngine, type LiveSceneHolder } from '../../../liveScene/liveSceneHost';

// This proves the shared host's timer contract only. It cannot measure GL cleanup.
describe('WaterEdge use of the unchanged shared host retention contract', () => {
  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

  it('enters disposal at 5000 ms after the last release and cancels it on reacquisition', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('window', { setTimeout, clearTimeout, devicePixelRatio: 1, innerWidth: 1280, innerHeight: 800 });
    const canvas = { className: '', parentElement: null as unknown, setAttribute: vi.fn(), remove: vi.fn() };
    vi.stubGlobal('document', { createElement: () => canvas });
    vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
    const engine: LiveSceneEngine = {
      init: vi.fn(async () => {}), setSize: vi.fn(), renderFrame: vi.fn(),
      start: vi.fn(), stop: vi.fn(), dispose: vi.fn(),
    };
    const create = vi.fn(() => engine);
    const host = new LiveSceneHost({ canvasClass: 'test', isSupported: () => true, create });
    const makeHolder = (): LiveSceneHolder => {
      const mount = { clientWidth: 1280, clientHeight: 800, appendChild: () => { canvas.parentElement = mount; } };
      return { mount: mount as unknown as HTMLElement, running: false, onStatus: vi.fn() };
    };
    const release = host.acquire(makeHolder());
    await Promise.resolve();
    release();
    expect(engine.stop).toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(4999);
    expect(engine.dispose).not.toHaveBeenCalled();
    const releaseAgain = host.acquire(makeHolder());
    await vi.advanceTimersByTimeAsync(1);
    expect(engine.dispose).not.toHaveBeenCalled();
    expect(create).toHaveBeenCalledTimes(1);
    releaseAgain();
    await vi.advanceTimersByTimeAsync(4999);
    expect(engine.dispose).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(engine.dispose).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(5000);
    expect(engine.dispose).toHaveBeenCalledTimes(1);
  });
});
