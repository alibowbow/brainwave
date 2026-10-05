import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LiveSceneHost, type LiveSceneEngine, type LiveSceneHolder } from '../../../../liveScene/liveSceneHost';

// Tests the existing shared host contract without modifying it. Fake DOM and
// engine intentionally cannot establish GPU cleanup or browser scheduling time.
function fixture() {
  const canvas = {
    className: '', parentElement: null as unknown,
    setAttribute: vi.fn(),
    remove() { this.parentElement = null; },
  };
  vi.stubGlobal('window', {
    setTimeout, clearTimeout, innerWidth: 1280, innerHeight: 850, devicePixelRatio: 1,
  });
  vi.stubGlobal('document', { createElement: () => canvas });
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
  const engine: LiveSceneEngine = {
    init: vi.fn(async () => {}), setSize: vi.fn(), renderFrame: vi.fn(),
    start: vi.fn(), stop: vi.fn(), dispose: vi.fn(), releaseDrag: vi.fn(),
  };
  const create = vi.fn(() => engine);
  const host = new LiveSceneHost({ canvasClass: 'test', isSupported: () => true, create });
  const holder = (): LiveSceneHolder => {
    const mount = {
      clientWidth: 1280, clientHeight: 850,
      appendChild(child: typeof canvas) { child.parentElement = mount; },
    };
    return { mount: mount as unknown as HTMLElement, running: false, onStatus: vi.fn() };
  };
  return { host, engine, create, holder, canvas };
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => { vi.clearAllTimers(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe('CozyRooms integration: unchanged shared-host retention', () => {
  it('stops and detaches immediately, enters disposal at exactly 5000 ms', async () => {
    const f = fixture(); const release = f.host.acquire(f.holder());
    await Promise.resolve(); release();
    expect(f.canvas.parentElement).toBeNull();
    expect(f.engine.stop).toHaveBeenCalled();
    vi.advanceTimersByTime(4999);
    expect(f.engine.dispose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(f.engine.dispose).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(10000);
    expect(f.engine.dispose).toHaveBeenCalledTimes(1);
  });

  it('quick reacquisition preserves the engine and resets the grace deadline', async () => {
    const f = fixture(); const release = f.host.acquire(f.holder());
    await Promise.resolve(); release(); vi.advanceTimersByTime(4900);
    const releaseAgain = f.host.acquire(f.holder());
    vi.advanceTimersByTime(200);
    expect(f.engine.dispose).not.toHaveBeenCalled();
    expect(f.create).toHaveBeenCalledTimes(1);
    releaseAgain(); vi.advanceTimersByTime(4999);
    expect(f.engine.dispose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(f.engine.dispose).toHaveBeenCalledTimes(1);
  });

  it('moves one canvas between holders and starts grace only after the last release', async () => {
    const f = fixture(); const a = f.holder(); const b = f.holder();
    const releaseA = f.host.acquire(a); await Promise.resolve();
    const releaseB = f.host.acquire(b);
    expect(f.canvas.parentElement).toBe(b.mount);
    releaseB();
    expect(f.canvas.parentElement).toBe(a.mount);
    vi.advanceTimersByTime(6000);
    expect(f.engine.dispose).not.toHaveBeenCalled();
    expect(f.create).toHaveBeenCalledTimes(1);
    releaseA(); vi.advanceTimersByTime(5000);
    expect(f.engine.dispose).toHaveBeenCalledTimes(1);
  });
});
