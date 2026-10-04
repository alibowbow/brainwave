import * as THREE from 'three';
import type { LiveSceneEngine, LiveSceneHolder } from '../../liveScene/liveSceneHost';
import { LiveSceneHost } from '../../liveScene/liveSceneHost';
import { LookSpring } from '../../liveScene/look';
import type { SanctuaryBuilder, SanctuaryKind, SanctuaryWorld } from './worldTypes';

let nextEngineId = 0;
export class SanctuaryEngine implements LiveSceneEngine {
  private renderer: THREE.WebGLRenderer;
  private world: SanctuaryWorld | null = null;
  private width = 1;
  private height = 1;
  private elapsed = 0;
  private frame = 0;
  private raf = 0;
  private previous = 0;
  private disposed = false;
  private lastTouch = -Infinity;
  private look = new LookSpring({ yaw: 0.13, pitch: 0.055 }, { follow: 0.28, settle: 1.2 });
  private baseQuaternion = new THREE.Quaternion();
  private lookQuaternion = new THREE.Quaternion();
  private lookEuler = new THREE.Euler();
  private lost: (event: Event) => void;

  constructor(private canvas: HTMLCanvasElement, private build: SanctuaryBuilder, onLost: () => void) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvas.dataset.engineId = String(++nextEngineId);
    canvas.dataset.interactions = '0';
    this.lost = (event) => { event.preventDefault(); if (!this.disposed) onLost(); };
    canvas.addEventListener('webglcontextlost', this.lost);
  }
  async init() {
    this.world = this.build(this.renderer);
    this.resizeCamera();
  }
  setSize(width: number, height: number, dpr: number) {
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    // Native CSS resolution is never lowered. Cap only supersampling above 2x.
    this.renderer.setPixelRatio(Math.min(Math.max(dpr, 1), 2));
    this.renderer.setSize(this.width, this.height, false);
    this.resizeCamera();
  }
  private resizeCamera() {
    if (!this.world) return;
    this.world.camera.aspect = this.width / this.height;
    this.world.resize(this.width / this.height);
    this.world.camera.updateProjectionMatrix();
    this.baseQuaternion.copy(this.world.camera.quaternion);
  }
  renderFrame(dt: number) {
    if (this.disposed || !this.world) return;
    const step = Math.min(Math.max(dt, 0), 0.05);
    this.elapsed += step;
    this.look.update(step);
    this.lookEuler.set(this.look.pitch, this.look.yaw, 0, 'YXZ');
    this.lookQuaternion.setFromEuler(this.lookEuler);
    this.world.camera.quaternion.copy(this.baseQuaternion).multiply(this.lookQuaternion);
    this.world.update(this.elapsed, step);
    this.renderer.render(this.world.scene, this.world.camera);
    this.canvas.dataset.frame = String(++this.frame);
    this.canvas.dataset.elapsed = this.elapsed.toFixed(4);
    this.canvas.dataset.drawCalls = String(this.renderer.info.render.calls);
    this.canvas.dataset.triangles = String(this.renderer.info.render.triangles);
    this.canvas.dataset.geometries = String(this.renderer.info.memory.geometries);
    this.canvas.dataset.textures = String(this.renderer.info.memory.textures);
  }
  start() {
    if (this.raf || this.disposed) return;
    this.previous = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }
  private tick = (now: number) => {
    this.raf = 0;
    this.renderFrame((now - this.previous) / 1000);
    this.previous = now;
    if (!this.disposed) this.raf = requestAnimationFrame(this.tick);
  };
  stop() { cancelAnimationFrame(this.raf); this.raf = 0; this.look.release(); }
  drag(dx: number, dy: number) { this.look.drag(dx, dy); }
  releaseDrag() { this.look.release(); }
  interact(x: number, y: number) {
    const now = performance.now();
    if (!this.world || this.disposed || now - this.lastTouch < 700) return;
    const result = this.world.interact(new THREE.Vector2(THREE.MathUtils.clamp(x, -1, 1), THREE.MathUtils.clamp(y, -1, 1)));
    if (result) {
      this.lastTouch = now;
      this.canvas.dataset.interactions = String(Number(this.canvas.dataset.interactions) + 1);
      return { ...result, strength: THREE.MathUtils.clamp(result.strength, 0, 0.45), x: THREE.MathUtils.clamp(result.x, -1, 1) };
    }
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.stop();
    this.canvas.removeEventListener('webglcontextlost', this.lost);
    if (this.world) {
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      const textures = new Set<THREE.Texture>();
      const addTexture = (value: unknown) => { if (value instanceof THREE.Texture) textures.add(value); };
      this.world.scene.traverse((object) => {
        if (object instanceof THREE.InstancedMesh) object.dispose();
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((material) => materials.add(material));
        const light = object as THREE.DirectionalLight;
        light.shadow?.map?.dispose();
        light.shadow?.mapPass?.dispose();
      });
      materials.forEach((material) => {
        Object.values(material).forEach(addTexture);
        const shader = material as THREE.ShaderMaterial;
        if (shader.uniforms) Object.values(shader.uniforms).forEach((uniform) => addTexture(uniform.value));
        material.dispose();
      });
      addTexture(this.world.scene.environment);
      addTexture(this.world.scene.background);
      textures.forEach((texture) => texture.dispose());
      geometries.forEach((geometry) => geometry.dispose());
      this.world.dispose?.();
      this.world.scene.clear();
      this.world = null;
    }
    this.renderer.renderLists.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}

export class SanctuaryHost extends LiveSceneHost<SanctuaryEngine> {
  constructor(public readonly kind: SanctuaryKind, builder: SanctuaryBuilder) {
    super({ canvasClass: 'sanctuary-canvas', isSupported: () => typeof window !== 'undefined', create: (canvas, onLost) => new SanctuaryEngine(canvas, builder, onLost) });
  }
  interact(holder: LiveSceneHolder, x: number, y: number) {
    if (holder !== this.top || !holder.running || this.status !== 'ready') return;
    const event = this.engine?.interact(x, y);
    return event ? { ...event, world: this.kind } : undefined;
  }
}
