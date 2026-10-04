import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { LiveSceneHolder } from '../../liveScene/liveSceneHost';

interface RendererControl {
  finish(): void;
  fail(error: Error): void;
  compileAsync: ReturnType<typeof vi.fn>;
  render: ReturnType<typeof vi.fn>;
  dispose: ReturnType<typeof vi.fn>;
}

const rendererControls = vi.hoisted(() => [] as RendererControl[]);

// Keep Three's real scene/camera/resource classes. Only the GPU boundary is
// controlled, so a compile can remain pending across the real host's retirement.
vi.mock('three', async importOriginal => {
  const actual = await importOriginal<typeof import('three')>();
  class ControlledRenderer {
    shadowMap = {};
    info = { render: { calls: 1, triangles: 1 }, memory: { geometries: 0, textures: 0 } };
    finish!: () => void;
    fail!: (error: Error) => void;
    pending = new Promise<void>((resolve, reject) => { this.finish = resolve; this.fail = reject; });
    compileAsync = vi.fn(() => this.pending);
    render = vi.fn();
    dispose = vi.fn();
    forceContextLoss = vi.fn();
    setPixelRatio = vi.fn();
    setSize = vi.fn();
    constructor() { rendererControls.push(this); }
  }
  return { ...actual, WebGLRenderer: ControlledRenderer };
});

vi.mock('./scenes/scops', async () => {
  const THREE = await import('three');
  return {
    createScopsScene: () => ({
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(),
      resize() {},
      update() {},
      interact: () => null,
    }),
  };
});

import { WorldEngine, WorldHost } from './WorldEngine';

class TestCanvas extends EventTarget {
  dataset: Record<string, string> = {};
  parentElement: unknown = null;
  setAttribute() {}
  remove() { this.parentElement = null; }
}

const canvas = () => new TestCanvas() as unknown as HTMLCanvasElement;
let timeoutId = 0;
const retirementTimers = new Map<number, () => void>();

function runRetirementTimers() {
  const callbacks = [...retirementTimers.values()];
  retirementTimers.clear();
  callbacks.forEach(callback => callback());
}

function holder(): LiveSceneHolder {
  return {
    mount: {
      clientWidth: 800,
      clientHeight: 600,
      appendChild(child: TestCanvas) { child.parentElement = this; },
    } as unknown as HTMLElement,
    running: false,
    onStatus: vi.fn(),
  };
}

beforeEach(() => {
  rendererControls.length = 0;
  retirementTimers.clear();
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
  vi.stubGlobal('window', {
    devicePixelRatio: 1,
    setTimeout(callback: () => void) {
      retirementTimers.set(++timeoutId, callback);
      return timeoutId;
    },
    clearTimeout(id: number) { retirementTimers.delete(id); },
  });
  vi.stubGlobal('document', { createElement: canvas });
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
});

afterEach(() => {
  runRetirementTimers();
  vi.unstubAllGlobals();
});

describe('Korean world asynchronous retirement', () => {
  it('reports initialization failures while the world is still live', async () => {
    const engine = new WorldEngine(canvas(), 'scops', vi.fn());
    const initialization = engine.init();
    await vi.dynamicImportSettled();
    expect(rendererControls[0].compileAsync).toHaveBeenCalledOnce();

    const failure = new Error('shader compilation failed');
    const rejected = expect(initialization).rejects.toBe(failure);
    rendererControls[0].fail(failure);
    await rejected;
    engine.dispose();
  });

  it('settles a retired world without reporting its late initialization failure', async () => {
    const engine = new WorldEngine(canvas(), 'scops', vi.fn());
    const initialization = engine.init();
    await vi.dynamicImportSettled();
    expect(rendererControls[0].compileAsync).toHaveBeenCalledOnce();

    engine.dispose();
    const settled = expect(initialization).resolves.toBeUndefined();
    rendererControls[0].fail(new Error('old compilation completed with an error'));
    await settled;
    expect(rendererControls[0].dispose).toHaveBeenCalledOnce();
    expect(rendererControls[0].render).not.toHaveBeenCalled();
  });

  it('keeps the successor canvas ready when its retired predecessor fails late', async () => {
    // Exercise the unmodified shared host. Its catch tears down the current
    // engine, so a leaked obsolete rejection really would destroy the successor.
    const host = new WorldHost({
      canvasClass: 'korean-world-canvas',
      isSupported: () => true,
      create: (element, onLost) => new WorldEngine(element, 'scops', onLost),
    });
    const oldHolder = holder();
    const releaseOld = host.acquire(oldHolder);
    await vi.dynamicImportSettled();
    expect(rendererControls[0].compileAsync).toHaveBeenCalledOnce();
    releaseOld();
    runRetirementTimers();
    expect(rendererControls[0].dispose).toHaveBeenCalledOnce();

    const successor = holder();
    const releaseSuccessor = host.acquire(successor);
    await vi.dynamicImportSettled();
    const nextRenderer = rendererControls[1];
    nextRenderer.finish();
    await vi.dynamicImportSettled();
    expect(successor.onStatus).toHaveBeenLastCalledWith('ready');
    expect(nextRenderer.render).toHaveBeenCalledOnce();

    rendererControls[0].fail(new Error('retired shader failure'));
    await vi.dynamicImportSettled();
    expect(successor.onStatus).toHaveBeenLastCalledWith('ready');
    expect(successor.onStatus).not.toHaveBeenCalledWith('failed');
    expect(nextRenderer.dispose).not.toHaveBeenCalled();

    // Attaching another paused holder redraws with the same functioning canvas.
    const fullscreen = holder();
    const releaseFullscreen = host.acquire(fullscreen);
    expect(rendererControls).toHaveLength(2);
    expect(fullscreen.onStatus).toHaveBeenLastCalledWith('ready');
    expect(nextRenderer.render.mock.calls.length).toBeGreaterThan(1);
    releaseFullscreen();
    releaseSuccessor();
  });
});
