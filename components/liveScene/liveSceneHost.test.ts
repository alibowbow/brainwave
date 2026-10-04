import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LiveSceneHost, type LiveSceneEngine, type LiveSceneHolder } from './liveSceneHost';

class TestCanvas {
  className = '';
  parentElement: TestMount | null = null;
  setAttribute = vi.fn();
  remove() { this.parentElement = null; }
}

class TestMount {
  clientWidth = 640;
  clientHeight = 480;
  appendChild(canvas: TestCanvas) { canvas.parentElement = this; }
}

class TestEngine implements LiveSceneEngine {
  resolveInit!: () => void;
  rejectInit!: (error: Error) => void;
  init = vi.fn(() => new Promise<void>((resolve, reject) => {
    this.resolveInit = resolve;
    this.rejectInit = reject;
  }));
  setSize = vi.fn();
  renderFrame = vi.fn();
  start = vi.fn();
  stop = vi.fn();
  dispose = vi.fn();
  releaseDrag = vi.fn();

  constructor(readonly canvas: TestCanvas, readonly loseContext: () => void) {}
}

const holder = (running = true): LiveSceneHolder => ({
  mount: new TestMount() as unknown as HTMLElement,
  running,
  onStatus: vi.fn(),
});

const setup = (disposeDelayMs?: number, configure?: (engine: TestEngine) => void) => {
  const engines: TestEngine[] = [];
  const create = vi.fn((canvas: HTMLCanvasElement, onContextLost: () => void) => {
    const engine = new TestEngine(canvas as unknown as TestCanvas, onContextLost);
    engines.push(engine);
    configure?.(engine);
    return engine;
  });
  const host = new LiveSceneHost({ canvasClass: 'scene-canvas', disposeDelayMs, isSupported: () => true, create });
  return { host, engines, create };
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('window', {
    innerWidth: 1280,
    innerHeight: 800,
    devicePixelRatio: 2,
    setTimeout: (...args: Parameters<typeof setTimeout>) => setTimeout(...args),
    clearTimeout: (id: ReturnType<typeof setTimeout>) => clearTimeout(id),
  });
  vi.stubGlobal('document', { createElement: () => new TestCanvas() });
  vi.stubGlobal('ResizeObserver', class {
    observe = vi.fn();
    disconnect = vi.fn();
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('shared live scene lifecycle', () => {
  it('retains the protected scenes default for five seconds, and cancels disposal on return', async () => {
    const { host, engines, create } = setup();
    const first = holder();
    const release = host.acquire(first);
    engines[0].resolveInit();
    await Promise.resolve();
    release();
    expect(engines[0].canvas.parentElement).toBeNull();
    await vi.advanceTimersByTimeAsync(4999);
    expect(engines[0].dispose).not.toHaveBeenCalled();
    const again = holder();
    const releaseAgain = host.acquire(again);
    await vi.advanceTimersByTimeAsync(1);
    expect(create).toHaveBeenCalledOnce();
    expect(engines[0].canvas.parentElement).toBe(again.mount);
    expect(engines[0].dispose).not.toHaveBeenCalled();
    releaseAgain();
    await vi.advanceTimersByTimeAsync(5000);
    expect(engines[0].dispose).toHaveBeenCalledOnce();
  });

  it('reuses one canvas for fullscreen and restores the underlying holder before disposing', async () => {
    const { host, engines, create } = setup(0);
    const player = holder(false);
    const releasePlayer = host.acquire(player);
    engines[0].resolveInit();
    await Promise.resolve();
    const fullscreen = holder(true);
    const releaseFullscreen = host.acquire(fullscreen);
    expect(create).toHaveBeenCalledOnce();
    expect(engines[0].canvas.parentElement).toBe(fullscreen.mount);
    expect(engines[0].start).toHaveBeenCalled();
    engines[0].stop.mockClear();
    releaseFullscreen();
    expect(engines[0].canvas.parentElement).toBe(player.mount);
    expect(engines[0].stop).toHaveBeenCalled();
    expect(engines[0].dispose).not.toHaveBeenCalled();
    releasePlayer();
    expect(engines[0].dispose).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('ignores an old init rejection after a replacement world has mounted', async () => {
    const { host, engines } = setup(0);
    const release = host.acquire(holder());
    release();
    const next = holder();
    host.acquire(next);
    engines[1].resolveInit();
    await Promise.resolve();
    engines[0].rejectInit(new Error('late load failure'));
    await Promise.resolve();
    await Promise.resolve();
    expect(engines[1].dispose).not.toHaveBeenCalled();
    expect(engines[1].canvas.parentElement).toBe(next.mount);
    expect(next.onStatus).toHaveBeenLastCalledWith('ready');
  });

  it('does not render or start an old init that resolves after release', async () => {
    const { host, engines } = setup(0);
    const release = host.acquire(holder());
    release();
    engines[0].resolveInit();
    await Promise.resolve();
    expect(engines[0].renderFrame).not.toHaveBeenCalled();
    expect(engines[0].start).not.toHaveBeenCalled();
    expect(engines[0].dispose).toHaveBeenCalledOnce();
  });

  it('ignores context loss from a disposed engine while failing the current one', () => {
    const { host, engines } = setup(0);
    const release = host.acquire(holder());
    release();
    const next = holder();
    host.acquire(next);
    engines[0].loseContext();
    expect(engines[1].dispose).not.toHaveBeenCalled();
    engines[1].loseContext();
    expect(engines[1].dispose).toHaveBeenCalledOnce();
    expect(next.onStatus).toHaveBeenLastCalledWith('failed');
  });

  it('disposes an engine that loses context synchronously during creation without initializing it', () => {
    const { host, engines } = setup(0, (engine) => engine.loseContext());
    const view = holder();
    expect(() => host.acquire(view)).not.toThrow();
    expect(engines[0].init).not.toHaveBeenCalled();
    expect(engines[0].dispose).toHaveBeenCalledOnce();
    expect(engines[0].canvas.parentElement).toBeNull();
    expect(view.onStatus).toHaveBeenLastCalledWith('failed');
  });

  it('does not recurse if engine disposal reports context loss', () => {
    const { host, engines } = setup(0, (engine) => engine.dispose.mockImplementation(engine.loseContext));
    const release = host.acquire(holder());
    expect(release).not.toThrow();
    expect(engines[0].dispose).toHaveBeenCalledOnce();
  });

  it('releases a current engine on asynchronous or synchronous initialization failure', async () => {
    const first = setup(0);
    const view = holder();
    first.host.acquire(view);
    first.engines[0].rejectInit(new Error('cannot initialize'));
    await Promise.resolve();
    await Promise.resolve();
    expect(first.engines[0].dispose).toHaveBeenCalledOnce();
    expect(view.onStatus).toHaveBeenLastCalledWith('failed');

    const second = setup(0, (engine) => engine.init.mockImplementation(() => { throw new Error('cannot initialize'); }));
    const other = holder();
    expect(() => second.host.acquire(other)).not.toThrow();
    expect(second.engines[0].dispose).toHaveBeenCalledOnce();
    expect(other.onStatus).toHaveBeenLastCalledWith('failed');
  });
});
