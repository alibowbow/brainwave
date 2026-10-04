import * as THREE from 'three';
import { LiveSceneHost, type LiveSceneHolder, type LiveSceneEngine } from '../../liveScene/liveSceneHost';
import type { WaterEdgeInteraction, WaterEdgeKind, WorldFactory, WorldScene } from './contracts';
import { GpuSubmission } from './gpuSubmission';

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
  private running = false;
  private lastTime = 0;
  private time = 0;
  private frames = 0;
  private disposed = false;
  private initializing = false;
  private width = 1;
  private height = 1;
  private pixelRatio = 0;
  private appliedWidth = 0;
  private appliedHeight = 0;
  private appliedPixelRatio = 0;
  private frameDirty = true;
  private gpu: GpuSubmission;
  private gpuFault: string | null = null;
  private baseRotation = new THREE.Quaternion();
  private offsetRotation = new THREE.Quaternion();
  private look = new THREE.Vector2();
  private targetLook = new THREE.Vector2();
  private lastInteraction = -10;
  private onLost: (event: Event) => void;
  constructor(private canvas: HTMLCanvasElement, private factory: WorldFactory, private onContextLost: () => void) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Terrain, trees and lighting are stationary; worlds request a new map
    // only when a shadow-casting object actually moves (the rolling pebble).
    this.renderer.shadowMap.autoUpdate = false;
    this.gpu = new GpuSubmission(this.renderer.getContext() as WebGL2RenderingContext, reason => this.failGpu(reason));
    this.onLost = (event) => { event.preventDefault(); this.failGpu('WebGL context lost'); };
    canvas.addEventListener('webglcontextlost', this.onLost);
    diagnostics.created++; diagnostics.live++;
  }
  async init() {
    if (this.disposed) return;
    if (!this.gpu.ready()) return;
    this.applySize();
    this.world = this.factory(this.renderer);
    this.world.resize(this.width, this.height);
    this.baseRotation.copy(this.world.camera.quaternion);
    this.world.update(0, 0);
    this.renderer.shadowMap.needsUpdate = true;
    this.frameDirty = true;
    // Factory cube/PMREM work and the first real view are one synchronous batch.
    // Fence it together before any later host/RAF/static request can submit.
    this.initializing = true;
    try { this.renderFrame(0); } finally { this.initializing = false; }
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
    this.frameDirty = true;
    // Applying a pending size here would clear the last visible buffer while
    // the GPU is busy. Keep only the latest request until a draw is accepted.
    this.observeSubmission();
  }
  private applySize() {
    const dimensionsChanged = this.width !== this.appliedWidth || this.height !== this.appliedHeight;
    const ratioChanged = this.pixelRatio !== this.appliedPixelRatio;
    if (!dimensionsChanged && !ratioChanged) return;
    if (ratioChanged) this.renderer.setPixelRatio(this.pixelRatio || 1);
    this.renderer.setSize(this.width, this.height, false);
    if (this.world && dimensionsChanged) { this.world.resize(this.width, this.height); this.baseRotation.copy(this.world.camera.quaternion); }
    this.appliedWidth = this.width; this.appliedHeight = this.height; this.appliedPixelRatio = this.pixelRatio;
  }
  private observeSubmission() {
    this.canvas.dataset.waterEdgeSubmission = JSON.stringify({ pending: this.gpu.pending, dirty: this.frameDirty,
      running: this.running, disposed: this.disposed, fault: this.gpuFault || this.gpu.reason,
      submitted: this.gpu.submittedCount, completed: this.gpu.completedCount,
      requestedSize: [this.width, this.height, this.pixelRatio], appliedSize: [this.appliedWidth, this.appliedHeight, this.appliedPixelRatio] });
  }
  private failGpu(reason: string) {
    if (this.disposed || this.gpuFault) return;
    this.gpuFault = reason; this.running = false;
    cancelAnimationFrame(this.raf); this.raf = 0;
    this.observeSubmission();
    this.onContextLost();
  }
  private schedule() {
    if (this.raf || this.disposed || this.gpuFault || (!this.running && !this.frameDirty)) return;
    this.raf = requestAnimationFrame(now => {
      this.raf = 0;
      if (this.disposed || this.gpuFault) return;
      // A released holder can detach after stop() scheduled a pending static
      // retry. Keep its dirtiness for reacquisition without drawing offscreen.
      if (this.canvas.isConnected === false) { this.gpu.ready(); this.observeSubmission(); return; }
      const dt = this.running ? (now - this.lastTime) / 1000 : 0;
      this.lastTime = now;
      this.renderFrame(dt);
      this.schedule();
    });
  }
  renderFrame(dt: number) {
    if (!this.world || this.disposed || this.gpuFault) return;
    // init deliberately draws before host attachment. Every later entry,
    // including a direct paused flush, retains detached work for reacquisition.
    if (!this.initializing && this.canvas.isConnected === false) { this.gpu.ready(); this.observeSubmission(); return; }
    const step = Math.min(0.05, Math.max(0, dt));
    // Keep the already presented canvas across unchanged holder/observer calls.
    // Animated frames, actual resizes and successful interactions still render.
    if (step === 0 && !this.frameDirty) { this.gpu.ready(); this.observeSubmission(); return; }
    if (!this.gpu.ready()) {
      this.observeSubmission();
      // Never advance simulation or accumulate animation dt while waiting.
      // A genuine resize/tap retains one latest static request even on pause.
      if (this.frameDirty) this.schedule();
      return;
    }
    try {
      this.applySize();
      this.frameDirty = true;
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
    } finally {
      // A throwing nested pass may already have queued work. It still occupies
      // the single slot; an explicit retry must wait for genuine completion.
      this.gpu.submitted();
      this.observeSubmission();
    }
  }
  start() {
    if (this.running || this.disposed || this.gpuFault) return;
    this.running = true;
    this.lastTime = performance.now();
    this.schedule(); this.observeSubmission();
  }
  stop() {
    this.running = false; cancelAnimationFrame(this.raf); this.raf = 0;
    // A resize or tap can arrive immediately before pause and before the next
    // RAF. Present that final state at the frozen time; dispose marks itself
    // disposed before stop, so teardown never adds another submission.
    if (this.frameDirty) this.renderFrame(0);
    this.observeSubmission();
  }
  drag(dx: number, dy: number) { this.targetLook.set(THREE.MathUtils.clamp(-dx * .28, -.15, .15), THREE.MathUtils.clamp(-dy * .18, -.09, .09)); }
  releaseDrag() { this.targetLook.set(0, 0); }
  interact(x: number, y: number) {
    if (!this.world || this.disposed || this.time - this.lastInteraction < .65) return null;
    const event = this.world.interact(THREE.MathUtils.clamp(x, -1, 1), THREE.MathUtils.clamp(y, -1, 1), this.time);
    if (event) { this.lastInteraction = this.time; this.frameDirty = true; this.observeSubmission(); }
    return event;
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true; this.stop();
    this.gpu.dispose(); this.observeSubmission();
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
