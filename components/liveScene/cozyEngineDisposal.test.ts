import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import * as THREE from 'three';
import { CozyEngine } from '../immersiveWorlds/cozyRooms/engine';
import type { WorldBuild } from '../immersiveWorlds/cozyRooms/contracts';

interface RendererDouble {
  render: Mock<(scene: THREE.Scene, camera: THREE.Camera) => void>;
  dispose: Mock<() => void>;
}
const rendererState = vi.hoisted(() => ({ instances: [] as RendererDouble[] }));

// Exercise the real CozyEngine and real Three resource disposal methods/events.
// Only the WebGL renderer boundary is replaced. These are source/unit checks,
// not evidence of actual GL deletion, GPU completion, or browser reclamation.
vi.mock('three', async importOriginal => {
  const actual = await importOriginal<typeof import('three')>();
  class Renderer {
    shadowMap = { enabled: false, type: 0 };
    info = { render: { calls: 0, triangles: 0 }, memory: { geometries: 0, textures: 0 } };
    constructor() { rendererState.instances.push(this); }
    render = vi.fn((_scene: THREE.Scene, _camera: THREE.Camera) => {});
    dispose = vi.fn(() => {});
  }
  return { ...actual, WebGLRenderer: Renderer };
});

class CanvasDouble extends EventTarget {
  dataset: Record<string, string> = {};
}

const engines: CozyEngine[] = [];
const pendingFrames = new Map<number, FrameRequestCallback>();
let rafSerial = 0;

function fixture(world: WorldBuild) {
  const canvas = new CanvasDouble();
  const added = vi.spyOn(canvas, 'addEventListener');
  const removed = vi.spyOn(canvas, 'removeEventListener');
  const factory = vi.fn(() => world);
  const lost = vi.fn();
  const engine = new CozyEngine(canvas as unknown as HTMLCanvasElement, factory, lost);
  engines.push(engine);
  return { canvas, added, removed, factory, lost, engine, renderer: rendererState.instances.at(-1)! };
}

function resourceWorld() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const geometry = new THREE.BoxGeometry();
  const otherGeometry = new THREE.PlaneGeometry();
  const map = new THREE.Texture();
  const uniformTexture = new THREE.Texture();
  const background = new THREE.Texture();
  const environment = new THREE.Texture();
  const detachedTexture = new THREE.Texture();
  const material = new THREE.MeshStandardMaterial({ map, normalMap: map });
  const shader = new THREE.ShaderMaterial({
    uniforms: { shared: { value: map }, dedicated: { value: uniformTexture }, repeated: { value: uniformTexture } },
  });
  const instances = new THREE.InstancedMesh(geometry, material, 2);
  const group = new THREE.Group();
  group.add(new THREE.Mesh(geometry, [material, shader, material]), new THREE.Mesh(otherGeometry, shader), instances);
  const light = new THREE.DirectionalLight();
  light.shadow.map = new THREE.WebGLRenderTarget(4, 4);
  light.shadow.mapPass = new THREE.WebGLRenderTarget(4, 4);
  scene.add(group, light);
  scene.background = background;
  scene.environment = environment;

  const disposables = [geometry, otherGeometry, material, shader, map, uniformTexture, background, environment, detachedTexture,
    instances, light.shadow, light.shadow.map, light.shadow.mapPass];
  const disposeSpies = disposables.map(resource => vi.spyOn(resource, 'dispose'));
  const resourceEvents = [geometry, otherGeometry, material, shader, map, uniformTexture, background, environment, detachedTexture,
    instances, light.shadow.map, light.shadow.mapPass].map(resource => {
    const listener = vi.fn();
    // These concrete Three classes all publish their real disposal event.
    (resource as THREE.EventDispatcher<{ dispose: {} }>).addEventListener('dispose', listener);
    return listener;
  });
  const dispose = vi.fn(() => detachedTexture.dispose());
  const update = vi.fn();
  const world: WorldBuild = { scene, camera, update, resize: vi.fn(), interact: vi.fn(() => null), dispose };
  return { world, update, dispose, disposeSpies, resourceEvents };
}

beforeEach(() => {
  rendererState.instances.length = 0;
  pendingFrames.clear();
  rafSerial = 0;
  vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => {
    const id = ++rafSerial;
    pendingFrames.set(id, callback);
    return id;
  }));
  vi.stubGlobal('cancelAnimationFrame', vi.fn((id: number) => { pendingFrames.delete(id); }));
});

afterEach(() => {
  for (const engine of engines.splice(0)) engine.dispose();
  pendingFrames.clear();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('CozyEngine resource retirement at the renderer boundary', () => {
  it('disposes each reachable resource once, runs world cleanup, and retires only its own RAF/listener', async () => {
    const resources = resourceWorld();
    const f = fixture(resources.world);
    await f.engine.init();
    f.engine.renderFrame(0);
    const before = f.engine.diagnostics();
    const unrelatedFrame = requestAnimationFrame(vi.fn());
    f.engine.start();
    const ownFrame = [...pendingFrames.keys()].find(id => id !== unrelatedFrame)!;
    const obsoleteCallback = pendingFrames.get(ownFrame)!;
    expect(f.engine.diagnostics().running).toBe(true);
    expect(f.added).toHaveBeenCalledTimes(1);
    const [eventName, handler] = f.added.mock.calls[0];
    expect(eventName).toBe('webglcontextlost');
    const liveEvent = new Event(eventName, { cancelable: true });
    f.canvas.dispatchEvent(liveEvent);
    expect(liveEvent.defaultPrevented).toBe(true);
    expect(f.lost).toHaveBeenCalledTimes(1);

    f.engine.dispose();
    f.engine.dispose();
    expect(f.removed).toHaveBeenCalledExactlyOnceWith(eventName, handler);
    expect(cancelAnimationFrame).toHaveBeenCalledExactlyOnceWith(ownFrame);
    expect([...pendingFrames.keys()]).toEqual([unrelatedFrame]);
    for (const dispose of resources.disposeSpies) expect(dispose).toHaveBeenCalledTimes(1);
    for (const event of resources.resourceEvents) expect(event).toHaveBeenCalledTimes(1);
    expect(resources.dispose).toHaveBeenCalledTimes(1);
    expect(f.renderer.dispose).toHaveBeenCalledTimes(1);
    expect(f.engine.diagnostics()).toMatchObject({
      running: false, targets: [], frames: before.frames,
      lifetime: { created: before.lifetime.created, disposed: before.lifetime.disposed + 1 },
    });

    const retiredEvent = new Event(eventName, { cancelable: true });
    f.canvas.dispatchEvent(retiredEvent);
    expect(retiredEvent.defaultPrevented).toBe(false);
    expect(f.lost).toHaveBeenCalledTimes(1);
    const updates = resources.update.mock.calls.length;
    obsoleteCallback(performance.now() + 16);
    f.engine.renderFrame(0);
    f.engine.start();
    expect(resources.update).toHaveBeenCalledTimes(updates);
    expect(f.renderer.render).toHaveBeenCalledTimes(1);
    expect([...pendingFrames.keys()]).toEqual([unrelatedFrame]);
  });

  it('can retire before world initialization without constructing resources or double-counting its lifetime', () => {
    const world: WorldBuild = {
      scene: new THREE.Scene(), camera: new THREE.PerspectiveCamera(),
      update: vi.fn(), resize: vi.fn(), interact: vi.fn(() => null), dispose: vi.fn(),
    };
    const f = fixture(world);
    const before = f.engine.diagnostics();
    f.engine.dispose();
    f.engine.dispose();
    expect(f.factory).not.toHaveBeenCalled();
    expect(world.dispose).not.toHaveBeenCalled();
    expect(f.renderer.dispose).toHaveBeenCalledTimes(1);
    expect(f.removed).toHaveBeenCalledExactlyOnceWith('webglcontextlost', f.added.mock.calls[0][1]);
    expect(pendingFrames.size).toBe(0);
    expect(f.engine.diagnostics()).toMatchObject({
      running: false, frames: 0,
      lifetime: { created: before.lifetime.created, disposed: before.lifetime.disposed + 1 },
    });
  });
});
