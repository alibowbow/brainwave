import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { WaterEdgeEngine } from '../runtime';
import type { WorldScene } from '../contracts';

// A context without float colour-buffer extensions (getExtension absent): the
// HDR pipeline must not be created, and the world must hear about it.
vi.mock('three', async importOriginal => {
  const actual = await importOriginal<typeof import('three')>();
  return {
    ...actual,
    WebGLRenderer: class {
      shadowMap = { enabled: false, type: 0, autoUpdate: true, needsUpdate: false };
      info = { render: { calls: 1, triangles: 1 } };
      renderLists = { dispose: vi.fn() };
      dispose = vi.fn();
      forceContextLoss = vi.fn();
      gl = {
        ALREADY_SIGNALED: 0x911A, TIMEOUT_EXPIRED: 0x911B, CONDITION_SATISFIED: 0x911C, WAIT_FAILED: 0x911D, SYNC_GPU_COMMANDS_COMPLETE: 0x9117,
        fenceSync: vi.fn(() => ({})), clientWaitSync: vi.fn(() => 0x911A), deleteSync: vi.fn(), flush: vi.fn(), isContextLost: vi.fn(() => false),
      };
      getContext = () => this.gl;
      setPixelRatio = vi.fn();
      setSize = vi.fn();
      render = vi.fn();
    },
  };
});

beforeEach(() => {
  vi.stubGlobal('requestAnimationFrame', vi.fn(() => 1));
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('WaterEdge HDR image path selection', () => {
  it('keeps the direct renderer without float targets and passes size and fallback state to the world', async () => {
    const canvas = { dataset: {} as Record<string, string>, isConnected: true, addEventListener: vi.fn(), removeEventListener: vi.fn() };
    const camera = new THREE.PerspectiveCamera();
    const world = {
      scene: new THREE.Scene(), camera,
      resize: vi.fn(), update: vi.fn(), interact: vi.fn(() => null), dispose: vi.fn(),
      setPostActive: vi.fn(), setDrawingSize: vi.fn(), createVolume: vi.fn(),
      post: { exposure: 2 },
    } satisfies WorldScene;
    const engine = new WaterEdgeEngine(canvas as unknown as HTMLCanvasElement, () => world, vi.fn());
    engine.setSize(390, 844, 2);
    await engine.init();
    expect(world.setPostActive).toHaveBeenCalledWith(false);
    expect(world.createVolume).not.toHaveBeenCalled();
    expect(canvas.dataset.post).toBe('direct');
    expect(world.setDrawingSize).toHaveBeenLastCalledWith(780, 1688);
    engine.setSize(884, 700, 1);
    engine.renderFrame(0);
    expect(world.setDrawingSize).toHaveBeenLastCalledWith(884, 700);
    engine.dispose();
    expect(world.dispose).toHaveBeenCalledTimes(1);
  });
});
