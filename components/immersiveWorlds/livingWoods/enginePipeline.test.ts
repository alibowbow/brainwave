import { afterEach, describe, expect, it, vi } from 'vitest';

const doubles = vi.hoisted(() => ({ renderer: null as any, content: null as any, pipeline: null as any, create: vi.fn() }));
vi.mock('three', async importOriginal => ({
  ...await importOriginal<typeof import('three')>(),
  WebGLRenderer: vi.fn(function () { return doubles.renderer; }),
}));
vi.mock('../shared/render/hdrPipeline', () => ({ HdrPipeline: { create: doubles.create } }));
vi.mock('./scenes/morningPorch', () => ({ createMorningPorch: () => doubles.content }));
vi.mock('./scenes/rainyForest', () => ({ createRainyForest: () => doubles.content }));
vi.mock('./scenes/ancientForest', () => ({ createAncientForest: () => doubles.content }));
vi.mock('./scenes/bamboo', () => ({ createBamboo: () => doubles.content }));
import { WoodsEngine } from './engine';

/** GPU, pipeline and scene are doubles; this checks only how the engine drives the HDR path. */
function setup(withPipeline: boolean) {
  const gl = {
    ALREADY_SIGNALED: 0x911a, CONDITION_SATISFIED: 0x911c, TIMEOUT_EXPIRED: 0x911b, WAIT_FAILED: 0x911d, SYNC_GPU_COMMANDS_COMPLETE: 0x9117,
    isContextLost: () => false, fenceSync: vi.fn(() => ({})), clientWaitSync: vi.fn(() => 0x911a), deleteSync: vi.fn(), flush: vi.fn(),
  };
  doubles.renderer = {
    shadowMap: {}, getContext: () => gl, setPixelRatio: vi.fn(), setSize: vi.fn(), render: vi.fn(),
    info: { render: { calls: 1, triangles: 1 }, memory: { geometries: 0, textures: 0 } }, dispose: vi.fn(), forceContextLoss: vi.fn(),
  };
  const volume = { material: {} };
  doubles.content = {
    update: vi.fn(), resize: vi.fn(), interactionTargets: [], dispose: vi.fn(), prepare: vi.fn(), setPostActive: vi.fn(),
    post: { exposure: 1.2 }, createVolume: vi.fn(() => volume),
  };
  doubles.pipeline = { report: { type: 'half-float' }, setSize: vi.fn(), render: vi.fn(), dispose: vi.fn() };
  doubles.create.mockReset();
  doubles.create.mockImplementation((_renderer: unknown, options: { volume?: () => unknown }) => {
    if (!withPipeline) return null;
    options.volume?.();
    return doubles.pipeline;
  });
  vi.stubGlobal('window', {});
  vi.stubGlobal('requestAnimationFrame', vi.fn(() => 1));
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
  const canvas = Object.assign(new EventTarget(), { dataset: {} as Record<string, string>, toDataURL: vi.fn() }) as unknown as HTMLCanvasElement;
  const engine = new WoodsEngine(canvas, 'ancient', vi.fn());
  return { engine, canvas, volume };
}

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('LivingWoods HDR pipeline path', () => {
  it('creates the pipeline after the world, forwards size, renders through it and disposes it once', async () => {
    const f = setup(true);
    f.engine.setSize(390, 844, 2);
    await f.engine.init();
    expect(doubles.content.prepare).toHaveBeenCalledWith(doubles.renderer);
    expect(doubles.create).toHaveBeenCalledOnce();
    expect(doubles.create.mock.calls[0][1].settings).toEqual({ exposure: 1.2 });
    expect(doubles.content.createVolume).toHaveBeenCalledOnce();
    expect(doubles.content.setPostActive).toHaveBeenCalledWith(true);
    f.engine.renderFrame(0);
    expect(doubles.pipeline.setSize).toHaveBeenCalledWith(390, 844, 2);
    expect(doubles.pipeline.render).toHaveBeenCalledOnce();
    expect(doubles.renderer.render).not.toHaveBeenCalled();
    expect(JSON.parse(f.canvas.dataset.post!)).toEqual({ type: 'half-float' });
    f.engine.dispose(); f.engine.dispose();
    expect(doubles.pipeline.dispose).toHaveBeenCalledOnce();
    expect(doubles.renderer.dispose).toHaveBeenCalledOnce();
  });

  it('keeps the direct renderer when float targets are unavailable', async () => {
    const f = setup(false);
    f.engine.setSize(1280, 800, 1);
    await f.engine.init();
    f.engine.renderFrame(0);
    expect(doubles.content.setPostActive).toHaveBeenCalledWith(false);
    expect(doubles.renderer.render).toHaveBeenCalledOnce();
    expect(f.canvas.dataset.post).toBe('direct');
    f.engine.dispose();
  });

  it('does not build the world or a pipeline for an engine released while its scene code loaded', async () => {
    const f = setup(true);
    const pending = f.engine.init();
    f.engine.dispose();
    await pending;
    expect(doubles.create).not.toHaveBeenCalled();
    expect(doubles.content.prepare).not.toHaveBeenCalled();
  });
});
