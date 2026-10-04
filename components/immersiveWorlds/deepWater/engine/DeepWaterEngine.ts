import * as THREE from 'three';
import { LookSpring } from '../../../liveScene/look';
import type { LiveSceneEngine } from '../../../liveScene/liveSceneHost';
import type { DeepWaterInteraction, WorldContent, WorldKind } from './types';

export class DeepWaterEngine implements LiveSceneEngine {
  private renderer: THREE.WebGLRenderer;
  private content: WorldContent | null = null;
  private disposed = false;
  private raf = 0;
  private running = false;
  private last = 0;
  private time = 0;
  private frames = 0;
  private width = 1;
  private height = 1;
  private look = new LookSpring({ yaw: .16, pitch: .085 }, { follow: .25, settle: 1.2 });
  private lookRotation = new THREE.Quaternion();
  private ray = new THREE.Raycaster();
  private lastTouch = -Infinity;
  private contextLost = (event: Event) => { event.preventDefault(); if (!this.disposed) this.onContextLost(); };

  constructor(private canvas: HTMLCanvasElement, private kind: WorldKind, private onContextLost: () => void) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.canvas.addEventListener('webglcontextlost', this.contextLost);
  }

  async init() {
    try {
      const create = this.kind === 'waterfall'
        ? (await import('./waterfall')).createWaterfall
        : this.kind === 'cave' ? (await import('./cave')).createCave
        : (await import('./sea')).createDeepSea;
      if (this.disposed) return;
      this.content = create(this.renderer);
    } catch (error) {
      // The shared host has a delayed-release grace period. An import rejection
      // from a disposed generation must not fail a newer host engine.
      if (this.disposed) return;
      throw error;
    }
    this.content.camera.aspect = this.width / this.height;
    this.content.resize?.(this.width / this.height);
    this.content.camera.updateProjectionMatrix();
    this.content.scene.updateMatrixWorld(true);
  }

  setSize(width: number, height: number, dpr: number) {
    this.width = Math.max(1, width); this.height = Math.max(1, height);
    this.renderer.setPixelRatio(Math.min(2, Math.max(1, dpr)));
    this.renderer.setSize(this.width, this.height, false);
    if (!this.content) return;
    this.content.camera.aspect = this.width / this.height;
    this.content.resize?.(this.width / this.height);
    this.content.camera.updateProjectionMatrix();
  }

  renderFrame(dt: number) {
    if (this.disposed || !this.content) return;
    const safeDt = Number.isFinite(dt) ? Math.max(0, Math.min(dt, .05)) : 0;
    this.time += safeDt;
    this.look.update(safeDt);
    const { scene, camera, target } = this.content;
    this.content.update(this.time, safeDt);
    camera.lookAt(target);
    this.lookRotation.setFromEuler(new THREE.Euler(this.look.pitch, this.look.yaw, 0, 'YXZ'));
    camera.quaternion.multiply(this.lookRotation);
    this.renderer.render(scene, camera);
    this.frames++;
    this.canvas.dataset.frames = String(this.frames);
    this.canvas.dataset.time = this.time.toFixed(4);
    this.canvas.dataset.calls = String(this.renderer.info.render.calls);
    this.canvas.dataset.triangles = String(this.renderer.info.render.triangles);
    this.canvas.dataset.geometries = String(this.renderer.info.memory.geometries);
    this.canvas.dataset.yaw = this.look.yaw.toFixed(4);
  }

  private tick = (stamp: number) => {
    if (!this.running || this.disposed) return;
    const dt = this.last ? (stamp - this.last) / 1000 : 0;
    this.last = stamp;
    this.renderFrame(dt);
    this.raf = requestAnimationFrame(this.tick);
  };

  start() { if (this.running || this.disposed) return; this.running = true; this.last = 0; this.canvas.dataset.running = 'true'; this.raf = requestAnimationFrame(this.tick); }
  stop() { this.running = false; cancelAnimationFrame(this.raf); this.raf = 0; this.last = 0; this.canvas.dataset.running = 'false'; }
  drag(dx: number, dy: number) { if (this.running) this.look.drag(dx, dy); }
  releaseDrag() { this.look.release(); }

  interact(x: number, y: number): DeepWaterInteraction | null {
    if (!this.running || !this.content || performance.now() - this.lastTouch < 650) return null;
    this.ray.setFromCamera(new THREE.Vector2(x, y), this.content.camera);
    const event = this.content.interact?.(this.ray, this.time) ?? null;
    if (!event) return null;
    this.lastTouch = performance.now();
    return { ...event, world: this.kind, strength: THREE.MathUtils.clamp(event.strength, 0, 1), pan: THREE.MathUtils.clamp(event.pan, -1, 1) };
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true; this.stop();
    this.canvas.removeEventListener('webglcontextlost', this.contextLost);
    this.content?.dispose?.();
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    this.content?.scene.traverse(object => {
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) geometries.add(mesh.geometry);
      if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(material => materials.add(material));
      const light = object as THREE.Light & { shadow?: THREE.LightShadow };
      light.shadow?.map?.dispose();
    });
    materials.forEach(material => {
      Object.values(material).forEach(value => { if (value instanceof THREE.Texture) textures.add(value); });
      if (material instanceof THREE.ShaderMaterial) Object.values(material.uniforms).forEach(uniform => { if (uniform.value instanceof THREE.Texture) textures.add(uniform.value); });
    });
    if (this.content?.scene.environment) textures.add(this.content.scene.environment);
    if (this.content?.scene.background instanceof THREE.Texture) textures.add(this.content.scene.background);
    geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose());
    this.content = null;
    this.renderer.renderLists.dispose(); this.renderer.dispose(); this.renderer.forceContextLoss();
    this.canvas.dataset.disposed = 'true';
  }
}
