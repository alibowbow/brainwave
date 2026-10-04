import * as THREE from 'three';
import type { LiveSceneEngine } from '../../liveScene/liveSceneHost';
import type { LivingWorld, LivingWoodsInteraction, WorldContent } from './types';
import { worldMetadata } from './types';
import { createMorningPorch } from './scenes/morningPorch';
import { createRainyForest } from './scenes/rainyForest';
import { createAncientForest } from './scenes/ancientForest';
import { createBamboo } from './scenes/bamboo';

const builders = { morning: createMorningPorch, rainy: createRainyForest, ancient: createAncientForest, bamboo: createBamboo };
let engineSerial = 0;

export class WoodsEngine implements LiveSceneEngine {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(52, 1, 0.08, 180);
  private content: WorldContent | null = null;
  private raycaster = new THREE.Raycaster();
  private baseRotation = new THREE.Quaternion();
  private look = new THREE.Vector2();
  private lookTarget = new THREE.Vector2();
  private lookRotation = new THREE.Quaternion();
  private time = 0;
  private previous = 0;
  private frame = 0;
  private raf = 0;
  private running = false;
  private disposed = false;
  private lastInteraction = -Infinity;
  private aspect = 1;
  private contextLost = (event: Event) => { event.preventDefault(); this.onContextLost(); };

  constructor(private canvas: HTMLCanvasElement, private world: LivingWorld, private onContextLost: () => void) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate = false;
    canvas.dataset.engineId = String(++engineSerial);
    canvas.addEventListener('webglcontextlost', this.contextLost);
  }
  async init() {
    this.content = builders[this.world](this.scene, this.camera);
    this.content.resize?.(this.aspect);
    this.baseRotation.copy(this.camera.quaternion);
    this.renderer.shadowMap.needsUpdate = true;
  }
  setSize(width: number, height: number, dpr: number) {
    if (this.disposed) return;
    this.aspect = Math.max(1, width) / Math.max(1, height);
    this.renderer.setPixelRatio(Math.min(2, Math.max(1, dpr)));
    this.renderer.setSize(Math.max(1, width), Math.max(1, height), false);
    this.camera.aspect = this.aspect;
    if (this.content) {
      this.camera.quaternion.copy(this.baseRotation);
      this.content.resize?.(this.aspect);
      this.baseRotation.copy(this.camera.quaternion);
    }
    this.camera.updateProjectionMatrix();
    this.renderer.shadowMap.needsUpdate = true;
  }
  renderFrame(dt: number) {
    if (!this.content || this.disposed) return;
    const step = Math.min(0.05, Math.max(0, dt));
    this.time += step;
    this.look.lerp(this.lookTarget, step ? 1 - Math.exp(-step * 5) : 1);
    this.content.update(this.time, step);
    this.lookRotation.setFromEuler(new THREE.Euler(this.look.y, this.look.x, 0, 'YXZ'));
    this.camera.quaternion.copy(this.baseRotation).multiply(this.lookRotation);
    // Static shadow map is sufficient for tiny foliage motion. Refresh during touch response.
    if (performance.now() - this.lastInteraction < 1000 && this.frame % 8 === 0) this.renderer.shadowMap.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
    this.frame++;
    this.canvas.dataset.frames = String(this.frame);
    this.canvas.dataset.time = this.time.toFixed(4);
    this.canvas.dataset.drawCalls = String(this.renderer.info.render.calls);
    this.canvas.dataset.triangles = String(this.renderer.info.render.triangles);
    this.canvas.dataset.geometries = String(this.renderer.info.memory.geometries);
    this.canvas.dataset.textures = String(this.renderer.info.memory.textures);
    if (this.frame % 12 === 1 || step === 0) this.updateTargetEvidence();
  }
  private updateTargetEvidence() {
    const targets = this.content?.interactionTargets.map(object => {
      const point = new THREE.Box3().setFromObject(object).getCenter(new THREE.Vector3()).project(this.camera);
      return { x: (point.x + 1) / 2, y: (1 - point.y) / 2, visible: point.z > -1 && point.z < 1 && Math.abs(point.x) < 1 && Math.abs(point.y) < 1 };
    });
    this.canvas.dataset.targets = JSON.stringify(targets ?? []);
  }
  start() {
    if (this.running || this.disposed) return;
    this.running = true;
    this.previous = performance.now();
    const tick = (now: number) => {
      if (!this.running || this.disposed) return;
      const dt = (now - this.previous) / 1000; this.previous = now;
      this.renderFrame(dt);
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }
  stop() { this.running = false; cancelAnimationFrame(this.raf); this.raf = 0; }
  drag(dx: number, dy: number) { this.lookTarget.set(THREE.MathUtils.clamp(-dx * 0.24, -0.14, 0.14), THREE.MathUtils.clamp(-dy * 0.16, -0.08, 0.08)); }
  releaseDrag() { this.lookTarget.set(0, 0); }
  tap(x: number, y: number): LivingWoodsInteraction | null {
    if (!this.running || !this.content || performance.now() - this.lastInteraction < 650) return null;
    this.raycaster.setFromCamera(new THREE.Vector2(x * 2 - 1, 1 - y * 2), this.camera);
    const hit = this.raycaster.intersectObjects(this.content.interactionTargets, true)[0];
    if (!hit) return null;
    this.lastInteraction = performance.now();
    this.content.interact?.(hit, this.time);
    return { world: this.world, sceneId: worldMetadata[this.world].sceneId, kind: worldMetadata[this.world].kind, strength: 0.24 };
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true; this.canvas.dataset.disposed = 'true'; this.stop();
    this.canvas.removeEventListener('webglcontextlost', this.contextLost);
    this.content?.dispose?.();
    const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>(), textures = new Set<THREE.Texture>();
    this.scene.traverse(object => {
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) geometries.add(mesh.geometry);
      if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(m => materials.add(m));
      if ((object as THREE.Light).isLight) (object as THREE.DirectionalLight).shadow?.dispose();
    });
    for (const material of materials) {
      Object.values(material).forEach(value => { if (value instanceof THREE.Texture) textures.add(value); });
      if (material instanceof THREE.ShaderMaterial) Object.values(material.uniforms).forEach(u => { if (u.value instanceof THREE.Texture) textures.add(u.value); });
    }
    if (this.scene.background instanceof THREE.Texture) textures.add(this.scene.background);
    if (this.scene.environment) textures.add(this.scene.environment);
    geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose());
    this.scene.clear(); this.content = null;
    this.renderer.dispose(); this.renderer.forceContextLoss();
  }
}
