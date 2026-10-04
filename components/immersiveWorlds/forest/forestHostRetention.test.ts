import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LiveSceneHost, type LiveSceneHolder } from '../../liveScene/liveSceneHost';

class CanvasStub {
  className = '';
  parentElement: MountStub | null = null;
  setAttribute = vi.fn();

  remove() {
    if (!this.parentElement) return;
    const mount = this.parentElement;
    mount.children = mount.children.filter((child) => child !== this);
    this.parentElement = null;
  }
}

class MountStub {
  clientWidth = 800;
  clientHeight = 600;
  children: CanvasStub[] = [];

  appendChild(canvas: CanvasStub) {
    canvas.remove();
    this.children.push(canvas);
    canvas.parentElement = this;
    return canvas;
  }
}

class ResizeObserverStub {
  observe = vi.fn();
  disconnect = vi.fn();
}

function makeHolder() {
  const mount = new MountStub();
  const holder: LiveSceneHolder = {
    mount: mount as unknown as HTMLElement,
    running: true,
    onStatus: vi.fn(),
  };
  return { mount, holder };
}

function makeEngine() {
  return {
    init: vi.fn(async () => {}),
    setSize: vi.fn(),
    renderFrame: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    dispose: vi.fn(),
  };
}

function makeHost() {
  const engines: ReturnType<typeof makeEngine>[] = [];
  const canvases: HTMLCanvasElement[] = [];
  const create = vi.fn((canvas: HTMLCanvasElement) => {
    const engine = makeEngine();
    canvases.push(canvas);
    engines.push(engine);
    return engine;
  });
  const host = new LiveSceneHost({
    canvasClass: 'forest-live-canvas',
    isSupported: () => true,
    create,
  });
  return { host, create, engines, canvases };
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('window', {
    setTimeout: vi.fn(setTimeout),
    clearTimeout: vi.fn(clearTimeout),
    innerWidth: 800,
    innerHeight: 600,
    devicePixelRatio: 1,
  });
  vi.stubGlobal('document', {
    createElement: vi.fn((tag: string) => {
      if (tag !== 'canvas') throw new Error(`Unexpected element: ${tag}`);
      return new CanvasStub();
    }),
  });
  vi.stubGlobal('ResizeObserver', ResizeObserverStub);
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('forest shared-host retention contract', () => {
  // These tests measure when the host invokes engine.dispose(). A fake engine
  // cannot establish when a browser or GPU finishes releasing its resources.
  it('stops immediately and calls dispose once when the 5000 ms grace timer fires', async () => {
    const { host, engines } = makeHost();
    const { holder, mount } = makeHolder();
    const release = host.acquire(holder);
    await Promise.resolve();
    const engine = engines[0];
    expect(engine.start).toHaveBeenCalledOnce();

    release();

    expect(engine.stop).toHaveBeenCalledOnce();
    expect(mount.children).toHaveLength(0);
    expect(window.setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(4999);
    expect(engine.dispose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(engine.dispose).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(10_000);
    expect(engine.dispose).toHaveBeenCalledOnce();
  });

  it('cancels the grace timer on reacquire and gives the next last release a full grace period', async () => {
    const { host, create, engines, canvases } = makeHost();
    const first = makeHolder();
    const releaseFirst = host.acquire(first.holder);
    await Promise.resolve();
    const engine = engines[0];
    const canvas = canvases[0];
    releaseFirst();
    vi.advanceTimersByTime(4999);

    const second = makeHolder();
    const releaseSecond = host.acquire(second.holder);

    expect(create).toHaveBeenCalledOnce();
    expect(second.mount.children).toEqual([canvas]);
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(5001);
    expect(engine.dispose).not.toHaveBeenCalled();

    releaseSecond();
    vi.advanceTimersByTime(4999);
    expect(engine.dispose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(engine.dispose).toHaveBeenCalledOnce();
  });

  it('moves the same canvas to the top holder and back without starting last-holder retention', async () => {
    const { host, create, engines, canvases } = makeHost();
    const player = makeHolder();
    const fullscreen = makeHolder();
    const releasePlayer = host.acquire(player.holder);
    await Promise.resolve();
    const canvas = canvases[0];
    const releaseFullscreen = host.acquire(fullscreen.holder);

    expect(player.mount.children).toHaveLength(0);
    expect(fullscreen.mount.children).toEqual([canvas]);
    expect(create).toHaveBeenCalledOnce();

    releaseFullscreen();

    expect(fullscreen.mount.children).toHaveLength(0);
    expect(player.mount.children).toEqual([canvas]);
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(5000);
    expect(engines[0].dispose).not.toHaveBeenCalled();
    expect(engines[0].stop).not.toHaveBeenCalled();

    releasePlayer();
    vi.advanceTimersByTime(5000);
    expect(engines[0].dispose).toHaveBeenCalledOnce();
  });

  it('creates a fresh engine after retention expires and disposes each engine exactly once', async () => {
    const { host, create, engines, canvases } = makeHost();
    const first = makeHolder();
    const releaseFirst = host.acquire(first.holder);
    await Promise.resolve();
    releaseFirst();
    vi.advanceTimersByTime(5000);

    const second = makeHolder();
    const releaseSecond = host.acquire(second.holder);
    await Promise.resolve();

    expect(create).toHaveBeenCalledTimes(2);
    expect(canvases[1]).not.toBe(canvases[0]);
    expect(engines[0].dispose).toHaveBeenCalledOnce();
    expect(engines[1].dispose).not.toHaveBeenCalled();
    releaseSecond();
    vi.advanceTimersByTime(5000);
    vi.advanceTimersByTime(10_000);
    expect(engines[0].dispose).toHaveBeenCalledOnce();
    expect(engines[1].dispose).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
  });
});
