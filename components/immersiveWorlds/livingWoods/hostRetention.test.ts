import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LiveSceneHost, type LiveSceneEngine, type LiveSceneHolder } from '../../liveScene/liveSceneHost';

/** Minimal DOM doubles: this test proves the host timer contract, never GPU cleanup. */
class CanvasDouble {
  className = '';
  parentElement: MountDouble | null = null;
  setAttribute = vi.fn();
  remove() {
    if (this.parentElement) this.parentElement.children = this.parentElement.children.filter(child => child !== this);
    this.parentElement = null;
  }
}
class MountDouble {
  clientWidth = 1280;
  clientHeight = 800;
  children: CanvasDouble[] = [];
  appendChild(canvas: CanvasDouble) {
    canvas.remove(); this.children.push(canvas); canvas.parentElement = this;
    return canvas;
  }
}

function fixture() {
  const disposeEntries: number[] = [];
  const engine: LiveSceneEngine = {
    init: vi.fn(async () => {}),
    setSize: vi.fn(), renderFrame: vi.fn(), start: vi.fn(), stop: vi.fn(), releaseDrag: vi.fn(),
    dispose: vi.fn(() => { disposeEntries.push(Date.now()); }),
  };
  const create = vi.fn(() => engine);
  const host = new LiveSceneHost({ canvasClass: 'living-woods-canvas', isSupported: () => true, create });
  const makeHolder = () => {
    const mount = new MountDouble();
    const holder: LiveSceneHolder = { mount: mount as unknown as HTMLElement, running: false, onStatus: vi.fn() };
    return { mount, holder };
  };
  return { host, engine, create, disposeEntries, makeHolder };
}

beforeEach(() => {
  vi.useFakeTimers(); vi.setSystemTime(0);
  vi.stubGlobal('window', {
    innerWidth: 1280, innerHeight: 800, devicePixelRatio: 1,
    setTimeout: (callback: () => void, delay: number) => setTimeout(callback, delay),
    clearTimeout: (handle: ReturnType<typeof setTimeout>) => clearTimeout(handle),
  });
  vi.stubGlobal('document', { createElement: vi.fn(() => new CanvasDouble()) });
  vi.stubGlobal('ResizeObserver', class {
    observe = vi.fn(); disconnect = vi.fn();
  });
});
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); vi.restoreAllMocks(); });

describe('unchanged shared host 5000 ms retention contract (deterministic timer, no GPU)', () => {
  it('stops and detaches immediately, and enters dispose at 5000 ms after final release', async () => {
    const f = fixture(), first = f.makeHolder();
    const release = f.host.acquire(first.holder);
    await Promise.resolve();
    expect(first.holder.onStatus).toHaveBeenLastCalledWith('ready');
    expect(first.mount.children).toHaveLength(1);
    release();
    expect(first.mount.children).toHaveLength(0);
    expect(f.engine.stop).toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(4999);
    expect(f.engine.dispose).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(f.engine.dispose).toHaveBeenCalledTimes(1);
    expect(f.disposeEntries).toEqual([5000]);
    await vi.advanceTimersByTimeAsync(10_000);
    expect(f.engine.dispose).toHaveBeenCalledTimes(1);
  });

  it('cancels a pending grace timer on reacquire and retains the exact canvas and engine', async () => {
    const f = fixture(), first = f.makeHolder();
    const releaseFirst = f.host.acquire(first.holder);
    await Promise.resolve();
    const canvas = first.mount.children[0];
    releaseFirst();
    await vi.advanceTimersByTimeAsync(4999);
    const second = f.makeHolder(), releaseSecond = f.host.acquire(second.holder);
    expect(second.mount.children[0]).toBe(canvas);
    expect(f.create).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(7001);
    expect(f.engine.dispose).not.toHaveBeenCalled();
    releaseSecond();
    await vi.advanceTimersByTimeAsync(4999);
    expect(f.engine.dispose).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(f.disposeEntries).toEqual([17_000]);
  });

  it('moves one canvas across two holders and starts grace only after the final holder closes', async () => {
    const f = fixture(), first = f.makeHolder(), second = f.makeHolder();
    const releaseFirst = f.host.acquire(first.holder);
    await Promise.resolve();
    const canvas = first.mount.children[0];
    const releaseSecond = f.host.acquire(second.holder);
    expect(first.mount.children).toHaveLength(0);
    expect(second.mount.children).toEqual([canvas]);
    releaseSecond();
    expect(first.mount.children).toEqual([canvas]);
    expect(second.mount.children).toHaveLength(0);
    await vi.advanceTimersByTimeAsync(6000);
    expect(f.engine.dispose).not.toHaveBeenCalled();
    expect(f.create).toHaveBeenCalledTimes(1);
    releaseFirst();
    await vi.advanceTimersByTimeAsync(4999);
    expect(f.engine.dispose).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(f.disposeEntries).toEqual([11_000]);
  });
});
