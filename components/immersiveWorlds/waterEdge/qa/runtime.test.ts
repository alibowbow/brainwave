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
  gl: {
    status: number;
    lost: boolean;
    fenceSync: ReturnType<typeof vi.fn>;
    clientWaitSync: ReturnType<typeof vi.fn>;
    deleteSync: ReturnType<typeof vi.fn>;
    flush: ReturnType<typeof vi.fn>;
    finish: ReturnType<typeof vi.fn>;
    isContextLost: ReturnType<typeof vi.fn>;
  };
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
      gl = {
        status: 0x911A, lost: false,
        ALREADY_SIGNALED: 0x911A, TIMEOUT_EXPIRED: 0x911B,
        CONDITION_SATISFIED: 0x911C, WAIT_FAILED: 0x911D,
        SYNC_GPU_COMMANDS_COMPLETE: 0x9117,
        fenceSync: vi.fn(() => ({})),
        clientWaitSync: vi.fn(() => this.gl.status),
        deleteSync: vi.fn(), flush: vi.fn(), finish: vi.fn(),
        isContextLost: vi.fn(() => this.gl.lost),
      };
      getContext = () => this.gl;
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

async function fixture(width = 1280, height = 800, ratio = 1, initiallyConnected = true) {
  const canvas = { dataset: {} as Record<string, string>, isConnected: initiallyConnected, addEventListener: vi.fn(), removeEventListener: vi.fn() };
  const camera = new THREE.PerspectiveCamera();
  const world = {
    scene: new THREE.Scene(), camera,
    resize: vi.fn((w: number, h: number) => { camera.aspect = w / h; camera.updateProjectionMatrix(); }),
    update: vi.fn(), interact: vi.fn<WorldScene['interact']>(() => null), dispose: vi.fn(),
  } satisfies WorldScene;
  const onLost = vi.fn();
  const engine = new WaterEdgeEngine(canvas as unknown as HTMLCanvasElement, () => world, onLost);
  engines.push(engine);
  engine.setSize(width, height, ratio);
  await engine.init();
  return { engine, canvas, world, onLost, renderer: doubles.renderers.at(-1)! };
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
    expect(renderer.setSize).toHaveBeenCalledTimes(2); // only initial and latest accepted backing size
    expect(renderer.setPixelRatio).toHaveBeenCalledTimes(2);
    expect(world.resize).toHaveBeenCalledTimes(2); // intermediate requested views never replace the accepted camera
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
    engine.setSize(390, 844, 1);
    renderer.render.mockImplementationOnce(() => { throw new Error('render fault'); });
    expect(() => engine.renderFrame(0)).toThrow('render fault');
    engine.renderFrame(0); engine.renderFrame(0);
    expect(renderer.render).toHaveBeenCalledTimes(3); // initialized + failed + retry
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
    expect(renderer.renderedSizes).toEqual([[1280, 800, 1], [1280, 800, 1], [390, 844, 1]]);
    engine.stop(); engine.renderFrame(0);
    expect(renderer.renderedSizes).toEqual([[1280, 800, 1], [1280, 800, 1], [390, 844, 1]]);
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

describe('WaterEdge completion-aware submission across all rendering paths', () => {
  it('fences factory work and the first visible frame as one batch, then does not spin or submit behind it', async () => {
    const { engine, renderer, world } = await fixture();
    expect(renderer.gl.fenceSync).toHaveBeenCalledTimes(1);
    expect(renderer.gl.flush).toHaveBeenCalledTimes(1);
    expect(renderer.render).toHaveBeenCalledTimes(1);
    const updates = world.update.mock.calls.length;
    renderer.gl.status = 0x911B;
    engine.setSize(390, 844, 1);
    engine.renderFrame(0);
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(world.update).toHaveBeenCalledTimes(updates);
    expect(renderer.gl.clientWaitSync).toHaveBeenCalledTimes(1);
    expect(renderer.gl.clientWaitSync).toHaveBeenLastCalledWith(expect.anything(), 0, 0);
    expect(pending.size).toBe(1);
    animationTick();
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(renderer.gl.clientWaitSync).toHaveBeenCalledTimes(2);
    expect(renderer.gl.deleteSync).not.toHaveBeenCalled();
    expect(renderer.gl.fenceSync).toHaveBeenCalledTimes(1);
    expect(renderer.gl.finish).not.toHaveBeenCalled();
    renderer.gl.status = 0x911C;
    animationTick();
    expect(renderer.render).toHaveBeenCalledTimes(2);
    expect(renderer.gl.deleteSync).toHaveBeenCalledTimes(1);
    expect(renderer.gl.fenceSync).toHaveBeenCalledTimes(2);
  });

  it('coalesces blocked paused resizes and holder requests into the latest full-size static frame', async () => {
    const { engine, renderer, canvas } = await fixture();
    renderer.gl.status = 0x911B;
    for (const [width, height] of [[390, 844], [884, 700], [1280, 800], [390, 844]]) {
      engine.setSize(width, height, 1); engine.renderFrame(0); engine.stop();
    }
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(pending.size).toBe(1);
    expect(renderer.gl.fenceSync).toHaveBeenCalledTimes(1);
    for (let i = 0; i < 5; i++) animationTick();
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(canvas.dataset.time).toBe('0.0000');
    renderer.gl.status = 0x911A;
    animationTick();
    expect(renderer.renderedSizes).toEqual([[1280, 800, 1], [390, 844, 1]]);
    expect(canvas.dataset.time).toBe('0.0000');
    expect(pending.size).toBe(0);
  });

  it('does not advance simulation or escape capacity across active RAF ticks and repeated pause/resume', async () => {
    const { engine, renderer, canvas, world } = await fixture();
    const updates = world.update.mock.calls.length;
    renderer.gl.status = 0x911B;
    engine.start(); engine.start();
    for (let i = 0; i < 4; i++) animationTick();
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(world.update).toHaveBeenCalledTimes(updates);
    expect(canvas.dataset.time).toBe('0.0000');
    expect(renderer.gl.fenceSync).toHaveBeenCalledTimes(1);
    engine.stop(); engine.start(); engine.stop(); engine.start();
    expect(pending.size).toBe(1);
    animationTick(); expect(renderer.render).toHaveBeenCalledTimes(1);
    renderer.gl.status = 0x911C;
    animationTick();
    expect(renderer.render).toHaveBeenCalledTimes(2);
    expect(Number(canvas.dataset.time)).toBeGreaterThan(0);
    expect(pending.size).toBe(1);
    engine.stop();
    expect(pending.size).toBe(0);
  });

  it('preserves a same-time interaction until GPU completion when pause arrives first', async () => {
    const { engine, renderer, world, canvas } = await fixture();
    renderer.gl.status = 0x911B;
    world.interact.mockReturnValue(ripple);
    expect(engine.interact(0, 0)).toBe(ripple);
    engine.stop();
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(pending.size).toBe(1);
    renderer.gl.status = 0x911A;
    animationTick();
    expect(renderer.render).toHaveBeenCalledTimes(2);
    expect(canvas.dataset.time).toBe('0.0000');
    expect(pending.size).toBe(0);
  });

  it.each(['wait-failed', 'lost-context'])('faults explicitly on %s without submitting, advancing or treating it as completion', async kind => {
    const { engine, renderer, onLost, world } = await fixture();
    const updates = world.update.mock.calls.length;
    if (kind === 'wait-failed') renderer.gl.status = 0x911D;
    else renderer.gl.lost = true;
    engine.start(); animationTick();
    expect(onLost).toHaveBeenCalledTimes(1);
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(world.update).toHaveBeenCalledTimes(updates);
    expect(renderer.gl.fenceSync).toHaveBeenCalledTimes(1);
    expect(pending.size).toBe(0);
    engine.start(); engine.renderFrame(.02); animationTick();
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(onLost).toHaveBeenCalledTimes(1);
  });

  it('stops after a null post-render fence instead of replenishing unknown GPU capacity', async () => {
    const { engine, renderer, onLost } = await fixture();
    renderer.gl.fenceSync.mockReturnValueOnce(null);
    engine.setSize(390, 844, 1);
    engine.renderFrame(0);
    expect(renderer.render).toHaveBeenCalledTimes(2);
    expect(onLost).toHaveBeenCalledTimes(1);
    engine.start(); engine.renderFrame(.02); animationTick();
    expect(renderer.render).toHaveBeenCalledTimes(2);
    expect(pending.size).toBe(0);
  });

  it('cancels a pending static retry and deletes its outstanding fence once on disposal', async () => {
    const { engine, renderer } = await fixture();
    renderer.gl.status = 0x911B;
    engine.setSize(390, 844, 1); engine.renderFrame(0);
    expect(pending.size).toBe(1);
    const alreadyDeleted = renderer.gl.deleteSync.mock.calls.length;
    const alreadyPolled = renderer.gl.clientWaitSync.mock.calls.length;
    engine.dispose(); engine.dispose(); animationTick();
    expect(renderer.gl.deleteSync).toHaveBeenCalledTimes(alreadyDeleted + 1);
    expect(renderer.gl.clientWaitSync).toHaveBeenCalledTimes(alreadyPolled);
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(pending.size).toBe(0);
    expect(renderer.gl.finish).not.toHaveBeenCalled();
  });

  it('does not draw a detached canvas, but preserves the latest static view for reattachment', async () => {
    const { engine, renderer, canvas } = await fixture();
    renderer.gl.status = 0x911B;
    engine.setSize(390, 844, 1); engine.renderFrame(0);
    canvas.isConnected = false;
    renderer.gl.status = 0x911A;
    animationTick();
    expect(renderer.render).toHaveBeenCalledTimes(1);
    canvas.isConnected = true;
    engine.setSize(390, 844, 1); engine.renderFrame(0);
    expect(renderer.renderedSizes).toEqual([[1280, 800, 1], [390, 844, 1]]);
    expect(canvas.dataset.time).toBe('0.0000');
  });

  it('blocks direct detached render and stop flushes while retaining the requested view for reacquisition', async () => {
    const { engine, renderer, canvas, world } = await fixture();
    const updates = world.update.mock.calls.length;
    canvas.isConnected = false;
    engine.setSize(390, 844, 1); engine.stop(); engine.renderFrame(0); engine.renderFrame(.03);
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(renderer.setSize).toHaveBeenCalledTimes(1);
    expect(world.update).toHaveBeenCalledTimes(updates);
    expect(canvas.dataset.time).toBe('0.0000');
    expect(JSON.parse(canvas.dataset.waterEdgeSubmission).dirty).toBe(true);
    expect(pending.size).toBe(0);
    canvas.isConnected = true;
    engine.setSize(390, 844, 1); engine.renderFrame(0);
    expect(renderer.renderedSizes).toEqual([[1280, 800, 1], [390, 844, 1]]);
    expect(canvas.dataset.time).toBe('0.0000');
    expect(JSON.parse(canvas.dataset.waterEdgeSubmission).dirty).toBe(false);
  });

  it('allows exactly the initialization view before host attachment, then applies the detached guard', async () => {
    const { engine, renderer, canvas } = await fixture(1280, 800, 1, false);
    expect(renderer.renderedSizes).toEqual([[1280, 800, 1]]);
    expect(renderer.gl.fenceSync).toHaveBeenCalledTimes(1);
    expect(canvas.dataset.frames).toBe('1');
    engine.renderFrame(.03); engine.stop();
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(canvas.dataset.time).toBe('0.0000');
    canvas.isConnected = true;
    engine.renderFrame(0);
    expect(renderer.render).toHaveBeenCalledTimes(1);
    engine.setSize(390, 844, 1); engine.renderFrame(0);
    expect(renderer.renderedSizes).toEqual([[1280, 800, 1], [390, 844, 1]]);
  });

  it('keeps GPU work from a throwing render fenced and retries its frozen state only after completion', async () => {
    const { engine, renderer, canvas } = await fixture();
    renderer.render.mockImplementationOnce(() => { throw new Error('nested pass failed after submitting'); });
    expect(() => engine.renderFrame(.02)).toThrow('nested pass failed after submitting');
    expect(renderer.gl.fenceSync).toHaveBeenCalledTimes(2);
    renderer.gl.status = 0x911B;
    engine.stop(); engine.renderFrame(0); animationTick();
    expect(renderer.render).toHaveBeenCalledTimes(2);
    expect(renderer.gl.fenceSync).toHaveBeenCalledTimes(2);
    expect(pending.size).toBe(1);
    renderer.gl.status = 0x911C;
    animationTick();
    expect(renderer.render).toHaveBeenCalledTimes(3);
    expect(canvas.dataset.time).toBe('0.0200');
    expect(pending.size).toBe(0);
  });
});
