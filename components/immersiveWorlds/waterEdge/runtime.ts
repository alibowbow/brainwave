import * as THREE from 'three';
import { LiveSceneHost, type LiveSceneHolder, type LiveSceneEngine } from '../../liveScene/liveSceneHost';
import type { WaterEdgeInteraction, WaterEdgeKind, WorldFactory, WorldScene } from './contracts';

export const diagnostics = { created: 0, disposed: 0, live: 0 };

export function disposeScene(scene: THREE.Scene) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  scene.traverse((object) => {
    if (object instanceof THREE.InstancedMesh) object.dispose();
    const mesh = object as THREE.Mesh;
    if (mesh.geometry) geometries.add(mesh.geometry);
    for (const material of (Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [])) {
      materials.add(material);
      Object.values(material).forEach((v) => { if (v instanceof THREE.Texture) textures.add(v); });
      if (material instanceof THREE.ShaderMaterial) Object.values(material.uniforms).forEach(({ value }) => {
        if (value instanceof THREE.Texture) textures.add(value);
      });
    }
    const light = object as THREE.DirectionalLight;
    light.shadow?.dispose();
  });
  if (scene.background instanceof THREE.Texture) textures.add(scene.background);
  if (scene.environment) textures.add(scene.environment);
  geometries.forEach((v) => v.dispose()); materials.forEach((v) => v.dispose()); textures.forEach((v) => v.dispose());
  scene.clear();
}

export class WaterEdgeEngine implements LiveSceneEngine {
  private renderer: THREE.WebGLRenderer;
  private world: WorldScene | null = null;
  private raf = 0;
  private lastTime = 0;
  private time = 0;
  private frames = 0;
  private disposed = false;
  private width = 1;
  private height = 1;
  private pixelRatio = 0;
  private frameDirty = true;
  private baseRotation = new THREE.Quaternion();
  private offsetRotation = new THREE.Quaternion();
  private look = new THREE.Vector2();
  private targetLook = new THREE.Vector2();
  private lastInteraction = -10;
  private onLost: (event: Event) => void;
  constructor(private canvas: HTMLCanvasElement, private factory: WorldFactory, onContextLost: () => void) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Terrain, trees and lighting are stationary; worlds request a new map
    // only when a shadow-casting object actually moves (the rolling pebble).
    this.renderer.shadowMap.autoUpdate = false;
    this.onLost = (event) => { event.preventDefault(); if (!this.disposed) onContextLost(); };
    canvas.addEventListener('webglcontextlost', this.onLost);
    diagnostics.created++; diagnostics.live++;
  }
  async init() {
    if (this.disposed) return;
    this.world = this.factory(this.renderer);
    this.world.resize(this.width, this.height);
    this.baseRotation.copy(this.world.camera.quaternion);
    this.world.update(0, 0);
    this.renderer.shadowMap.needsUpdate = true;
    this.frameDirty = true;
  }
  setSize(width: number, height: number, dpr: number) {
    width = Math.max(1, width); height = Math.max(1, height);
    const pixelRatio = Math.min(2, Math.max(1, dpr));
    const dimensionsChanged = width !== this.width || height !== this.height;
    const ratioChanged = pixelRatio !== this.pixelRatio;
    // Three rewrites the backing buffer even for an identical setSize. Host
    // attachment and ResizeObserver may both request the same paused view.
    if (!dimensionsChanged && !ratioChanged) return;
    this.width = width; this.height = height; this.pixelRatio = pixelRatio;
    if (ratioChanged) this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(this.width, this.height, false);
    if (this.world && dimensionsChanged) { this.world.resize(this.width, this.height); this.baseRotation.copy(this.world.camera.quaternion); }
    this.frameDirty = true;
  }
  renderFrame(dt: number) {
    if (!this.world || this.disposed) return;
    const step = Math.min(0.05, Math.max(0, dt));
    // Keep the already presented canvas across unchanged holder/observer calls.
    // Animated frames, actual resizes and successful interactions still render.
    if (step === 0 && !this.frameDirty) return;
    this.time += step;
    this.look.lerp(this.targetLook, step ? 1 - Math.exp(-step * 5) : 0);
    this.world.update(this.time, step);
    this.offsetRotation.setFromEuler(new THREE.Euler(this.look.y, this.look.x, 0, 'YXZ'));
    this.world.camera.quaternion.copy(this.baseRotation).multiply(this.offsetRotation);
    this.renderer.render(this.world.scene, this.world.camera);
    this.frameDirty = false;
    this.canvas.dataset.frames = String(++this.frames);
    this.canvas.dataset.time = this.time.toFixed(4);
    this.canvas.dataset.drawCalls = String(this.renderer.info.render.calls);
    this.canvas.dataset.triangles = String(this.renderer.info.render.triangles);
  }
  start() {
    if (this.raf || this.disposed) return;
    this.lastTime = performance.now();
    const loop = (now: number) => {
      this.raf = 0;
      if (this.disposed) return;
      this.renderFrame((now - this.lastTime) / 1000);
      this.lastTime = now;
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }
  stop() {
    cancelAnimationFrame(this.raf); this.raf = 0;
    // A resize or tap can arrive immediately before pause and before the next
    // RAF. Present that final state at the frozen time; dispose marks itself
    // disposed before stop, so teardown never adds another submission.
    if (this.frameDirty) this.renderFrame(0);
  }
  drag(dx: number, dy: number) { this.targetLook.set(THREE.MathUtils.clamp(-dx * .28, -.15, .15), THREE.MathUtils.clamp(-dy * .18, -.09, .09)); }
  releaseDrag() { this.targetLook.set(0, 0); }
  interact(x: number, y: number) {
    if (!this.world || this.disposed || this.time - this.lastInteraction < .65) return null;
    const event = this.world.interact(THREE.MathUtils.clamp(x, -1, 1), THREE.MathUtils.clamp(y, -1, 1), this.time);
    if (event) { this.lastInteraction = this.time; this.frameDirty = true; }
    return event;
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true; this.stop();
    this.canvas.removeEventListener('webglcontextlost', this.onLost);
    if (this.world) { this.world.dispose?.(); disposeScene(this.world.scene); this.world = null; }
    this.renderer.renderLists.dispose(); this.renderer.dispose(); this.renderer.forceContextLoss();
    diagnostics.disposed++; diagnostics.live--;
  }
}

export class WaterEdgeHost extends LiveSceneHost<WaterEdgeEngine> {
  tap(holder: LiveSceneHolder, x: number, y: number): WaterEdgeInteraction | null {
    return this.top === holder && holder.running && this.status === 'ready' ? this.engine?.interact(x, y) ?? null : null;
  }
}
const hosts = new Map<WaterEdgeKind, WaterEdgeHost>();
export function getWorldHost(kind: WaterEdgeKind, factory: WorldFactory) {
  let host = hosts.get(kind);
  if (!host) {
    host = new WaterEdgeHost({ canvasClass: 'water-edge-canvas', isSupported: () => typeof WebGL2RenderingContext !== 'undefined', create: (canvas, lost) => new WaterEdgeEngine(canvas, factory, lost) });
    hosts.set(kind, host);
  }
  return host;
}
