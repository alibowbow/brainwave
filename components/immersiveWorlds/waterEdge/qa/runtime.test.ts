import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { WaterEdgeEngine } from '../runtime';
import type { WaterEdgeInteraction, WorldScene } from '../contracts';

interface RendererDouble {
  width: number;
  height: number;
  ratio: number;
  renderedSizes: number[][];
  setPixelRatio: ReturnType<typeof vi.fn>;
  setSize: ReturnType<typeof vi.fn>;
  render: ReturnType<typeof vi.fn>;
  dispose: ReturnType<typeof vi.fn>;
  forceContextLoss: ReturnType<typeof vi.fn>;
  renderLists: { dispose: ReturnType<typeof vi.fn> };
}
const doubles = vi.hoisted(() => ({ renderers: [] as RendererDouble[] }));

// Only GPU submission/allocation is doubled. Worlds use real Three scene/camera
// objects, and tests drive the real owned engine's public methods.
vi.mock('three', async importOriginal => {
  const actual = await importOriginal<typeof import('three')>();
  return {
    ...actual,
    WebGLRenderer: class {
      width = 300;
      height = 150;
      ratio = 1;
      renderedSizes: number[][] = [];
      shadowMap = { enabled: false, type: 0, autoUpdate: true, needsUpdate: false };
      info = { render: { calls: 7, triangles: 23 } };
      renderLists = { dispose: vi.fn() };
      dispose = vi.fn();
      forceContextLoss = vi.fn();
      setPixelRatio = vi.fn((value: number) => { this.ratio = value; });
      setSize = vi.fn((width: number, height: number) => { this.width = width; this.height = height; });
      render = vi.fn(() => { this.renderedSizes.push([this.width, this.height, this.ratio]); });
      constructor() { doubles.renderers.push(this); }
    },
  };
});

const engines: WaterEdgeEngine[] = [];
let pending: Map<number, FrameRequestCallback>;
let clock: number;
let nextFrame: number;

beforeEach(() => {
  doubles.renderers.length = 0;
  pending = new Map(); clock = 1000; nextFrame = 1;
  vi.spyOn(performance, 'now').mockImplementation(() => clock);
  vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => {
    const id = nextFrame++; pending.set(id, callback); return id;
  }));
  vi.stubGlobal('cancelAnimationFrame', vi.fn((id: number) => pending.delete(id)));
});

afterEach(() => {
  engines.splice(0).forEach(engine => engine.dispose());
  vi.restoreAllMocks(); vi.unstubAllGlobals();
});

function animationTick(milliseconds = 16) {
  clock += milliseconds;
  const callbacks = [...pending.values()]; pending.clear();
  callbacks.forEach(callback => callback(clock));
}

async function fixture(width = 1280, height = 800, ratio = 1) {
  const canvas = { dataset: {} as Record<string, string>, addEventListener: vi.fn(), removeEventListener: vi.fn() };
  const camera = new THREE.PerspectiveCamera();
  const world = {
    scene: new THREE.Scene(), camera,
    resize: vi.fn((w: number, h: number) => { camera.aspect = w / h; camera.updateProjectionMatrix(); }),
    update: vi.fn(), interact: vi.fn<WorldScene['interact']>(() => null), dispose: vi.fn(),
  } satisfies WorldScene;
  const engine = new WaterEdgeEngine(canvas as unknown as HTMLCanvasElement, () => world, vi.fn());
  engines.push(engine);
  engine.setSize(width, height, ratio);
  await engine.init();
  return { engine, canvas, world, renderer: doubles.renderers.at(-1)! };
}

const ripple: WaterEdgeInteraction = { world: 'summer-valley', kind: 'ripple', strength: .35, position: { x: 0, z: 0 } };

describe('WaterEdge static frame reuse without changing animation quality', () => {
  it('draws the initialized world once and skips repeated clean zero-time frames', async () => {
    const { engine, renderer, canvas, world } = await fixture();
    expect(world.resize).toHaveBeenLastCalledWith(1280, 800);
    engine.renderFrame(0);
    for (let i = 0; i < 8; i++) engine.renderFrame(0);
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(world.update).toHaveBeenCalledTimes(2); // init + first visible frame
    expect(canvas.dataset.frames).toBe('1'); expect(canvas.dataset.time).toBe('0.0000');
  });

  it('does not clear or submit for repeated same-size holder/observer sequences', async () => {
    const { engine, renderer, world } = await fixture();
    engine.renderFrame(0);
    for (let i = 0; i < 8; i++) {
      engine.setSize(1280, 800, 1); engine.renderFrame(0); engine.stop();
    }
    expect(renderer.setPixelRatio).toHaveBeenCalledTimes(1);
    expect(renderer.setSize).toHaveBeenCalledTimes(1);
    expect(world.resize).toHaveBeenCalledTimes(1);
    expect(renderer.render).toHaveBeenCalledTimes(1);
  });

  it('compares effective DPR and dimensions, including the existing DPR ceiling', async () => {
    const { engine, renderer, world } = await fixture(1, 1, 2);
    engine.renderFrame(0);
    for (const ratio of [2, 2.5, 3, 5]) { engine.setSize(0, -3, ratio); engine.renderFrame(0); }
    expect(renderer.setSize).toHaveBeenCalledTimes(1);
    expect(renderer.setSize).toHaveBeenLastCalledWith(1, 1, false);
    expect(renderer.setPixelRatio).toHaveBeenCalledTimes(1);
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(world.resize).toHaveBeenCalledTimes(1);
    expect(renderer.renderedSizes).toEqual([[1, 1, 2]]);
  });

  it('forces the initial 1×1 allocation despite initial cached dimensions also being 1×1', async () => {
    const { engine, renderer } = await fixture(1, 1, 1);
    engine.renderFrame(0);
    expect(renderer.setSize).toHaveBeenCalledTimes(1);
    expect(renderer.renderedSizes).toEqual([[1, 1, 1]]);
  });

  it('renders real size and DPR changes, retaining the latest size and unchanged simulation time', async () => {
    const { engine, renderer, world, canvas } = await fixture();
    engine.renderFrame(0);
    engine.setSize(390, 844, 1);
    engine.setSize(884, 700, 1);
    engine.setSize(884, 700, 1.5);
    engine.renderFrame(0); engine.renderFrame(0);
    expect(renderer.renderedSizes).toEqual([[1280, 800, 1], [884, 700, 1.5]]);
    expect(renderer.setSize).toHaveBeenCalledTimes(4);
    expect(renderer.setPixelRatio).toHaveBeenCalledTimes(2);
    expect(world.resize).toHaveBeenCalledTimes(3); // DPR-only must not reset camera composition
    expect(canvas.dataset.time).toBe('0.0000');
  });

  it('invalidates on a successful same-time tap, but not a rejected or rate-limited tap', async () => {
    const { engine, renderer, world, canvas } = await fixture();
    engine.renderFrame(0);
    expect(engine.interact(0, 0)).toBeNull(); engine.renderFrame(0);
    expect(renderer.render).toHaveBeenCalledTimes(1);
    world.interact.mockReturnValue(ripple);
    expect(engine.interact(0, 0)).toBe(ripple); engine.renderFrame(0);
    expect(renderer.render).toHaveBeenCalledTimes(2);
    expect(engine.interact(0, 0)).toBeNull(); engine.renderFrame(0);
    expect(renderer.render).toHaveBeenCalledTimes(2);
    expect(world.interact).toHaveBeenCalledTimes(2);
    expect(canvas.dataset.time).toBe('0.0000');
  });

  it('continues submitting and advancing every positive animation step', async () => {
    const { engine, renderer, world, canvas } = await fixture();
    engine.renderFrame(0);
    engine.renderFrame(.02); engine.renderFrame(.02); engine.renderFrame(.2);
    expect(renderer.render).toHaveBeenCalledTimes(4);
    expect(world.update).toHaveBeenLastCalledWith(.09, .05);
    expect(canvas.dataset.time).toBe('0.0900');
    engine.renderFrame(0);
    expect(renderer.render).toHaveBeenCalledTimes(4);
  });

  it('retains a dirty request when rendering fails, then retries instead of declaring it clean', async () => {
    const { engine, renderer } = await fixture();
    renderer.render.mockImplementationOnce(() => { throw new Error('render fault'); });
    expect(() => engine.renderFrame(0)).toThrow('render fault');
    engine.renderFrame(0); engine.renderFrame(0);
    expect(renderer.render).toHaveBeenCalledTimes(2);
  });

  it('retries the frozen current state if an animated render fails after a clean frame', async () => {
    const { engine, renderer, canvas } = await fixture();
    engine.renderFrame(0);
    renderer.render.mockImplementationOnce(() => { throw new Error('animated render fault'); });
    expect(() => engine.renderFrame(.02)).toThrow('animated render fault');
    engine.stop(); engine.renderFrame(0);
    expect(renderer.render).toHaveBeenCalledTimes(3);
    expect(canvas.dataset.time).toBe('0.0200');
  });
});

describe('WaterEdge pause and disposal retain a final dirty frame without duplicate loops', () => {
  it('flushes a real resize exactly once on stop without advancing simulation time', async () => {
    const { engine, renderer, canvas } = await fixture();
    engine.renderFrame(.04);
    engine.setSize(390, 844, 1);
    engine.stop();
    expect(renderer.renderedSizes).toEqual([[1280, 800, 1], [390, 844, 1]]);
    engine.stop(); engine.renderFrame(0);
    expect(renderer.renderedSizes).toEqual([[1280, 800, 1], [390, 844, 1]]);
    expect(canvas.dataset.time).toBe('0.0400');
  });

  it('flushes a successful tap arriving just before pause exactly once', async () => {
    const { engine, renderer, world, canvas } = await fixture();
    engine.renderFrame(0); world.interact.mockReturnValue(ripple);
    engine.interact(0, 0); engine.stop(); engine.stop();
    expect(renderer.render).toHaveBeenCalledTimes(2);
    expect(canvas.dataset.time).toBe('0.0000');
  });

  it('maintains one RAF loop across repeated start, stop and resume', async () => {
    const { engine, renderer } = await fixture();
    engine.renderFrame(0);
    engine.start(); engine.start(); expect(pending.size).toBe(1);
    animationTick(); expect(pending.size).toBe(1); expect(renderer.render).toHaveBeenCalledTimes(2);
    engine.stop(); engine.stop(); expect(pending.size).toBe(0);
    animationTick(); expect(renderer.render).toHaveBeenCalledTimes(2);
    engine.start(); engine.start(); expect(pending.size).toBe(1);
    animationTick(); expect(pending.size).toBe(1); expect(renderer.render).toHaveBeenCalledTimes(3);
    engine.stop(); expect(pending.size).toBe(0);
  });

  it('disposes once without drawing a pending dirty frame or scheduling again', async () => {
    const { engine, renderer, world, canvas } = await fixture();
    engine.renderFrame(0); engine.start(); engine.setSize(390, 844, 1);
    engine.dispose(); engine.dispose(); engine.stop(); engine.start(); engine.renderFrame(.03);
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(world.dispose).toHaveBeenCalledTimes(1);
    expect(renderer.renderLists.dispose).toHaveBeenCalledTimes(1);
    expect(renderer.dispose).toHaveBeenCalledTimes(1);
    expect(renderer.forceContextLoss).toHaveBeenCalledTimes(1);
    expect(canvas.removeEventListener).toHaveBeenCalledTimes(1);
    expect(pending.size).toBe(0);
  });
});
