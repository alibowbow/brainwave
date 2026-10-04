import * as THREE from 'three';
import type { LiveSceneEngine } from '../../../liveScene/liveSceneHost';
import type { ShelterInteraction, WorldBuilder, WorldKind, WorldRecipe } from './types';

export class ShelterEngine implements LiveSceneEngine {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(56, 1, .055, 240);
  private recipe: WorldRecipe | null = null;
  private raf = 0;
  private running = false;
  private disposed = false;
  private width = 1;
  private height = 1;
  private elapsed = 0;
  private frame = 0;
  private previous = 0;
  private baseRotation = new THREE.Quaternion();
  private targetLook = new THREE.Vector2();
  private look = new THREE.Vector2();
  private lookRotation = new THREE.Quaternion();
  private euler = new THREE.Euler(0, 0, 0, 'YXZ');
  private contextLost: (event: Event) => void;

  constructor(private canvas: HTMLCanvasElement, private kind: WorldKind, private builder: WorldBuilder, onLost: () => void) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.contextLost = (event) => { event.preventDefault(); onLost(); };
    canvas.addEventListener('webglcontextlost', this.contextLost);
    canvas.dataset.world = kind;
  }

  async init() {
    this.recipe = this.builder({ scene: this.scene, camera: this.camera, renderer: this.renderer });
    this.applyComposition();
  }

  setSize(width: number, height: number, dpr: number) {
    this.width = Math.max(1, width); this.height = Math.max(1, height);
    this.renderer.setPixelRatio(Math.min(2, Math.max(1, dpr)));
    this.renderer.setSize(this.width, this.height, false);
    this.applyComposition();
  }

  private applyComposition() {
    this.camera.aspect = this.width / this.height;
    this.recipe?.resize(this.camera.aspect);
    this.camera.updateProjectionMatrix();
    this.baseRotation.copy(this.camera.quaternion);
  }

  renderFrame(dt: number) {
    if (this.disposed || !this.recipe) return;
    const safeDt = Math.max(0, Math.min(dt, .06)); this.elapsed += safeDt;
    this.look.lerp(this.targetLook, safeDt === 0 ? 1 : 1 - Math.exp(-safeDt * 7));
    this.euler.set(this.look.y, this.look.x, 0);
    this.lookRotation.setFromEuler(this.euler);
    this.camera.quaternion.copy(this.baseRotation).multiply(this.lookRotation);
    this.camera.updateMatrixWorld();
    this.recipe.update(this.elapsed, safeDt);
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.camera);
    this.canvas.dataset.frame = String(++this.frame);
    this.canvas.dataset.time = this.elapsed.toFixed(4);
    this.canvas.dataset.drawCalls = String(this.renderer.info.render.calls);
    this.canvas.dataset.triangles = String(this.renderer.info.render.triangles);
    this.canvas.dataset.geometries = String(this.renderer.info.memory.geometries);
    this.canvas.dataset.textures = String(this.renderer.info.memory.textures);
  }

  start() {
    if (this.running || this.disposed) return;
    this.running = true; this.previous = performance.now();
    const tick = (now: number) => {
      if (!this.running || this.disposed) return;
      const dt = (now - this.previous) / 1000; this.previous = now;
      this.renderFrame(dt); this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  stop() { this.running = false; cancelAnimationFrame(this.raf); this.raf = 0; this.targetLook.set(0, 0); }
  drag(dx: number, dy: number) { this.targetLook.set(THREE.MathUtils.clamp(-dx * .24, -.15, .15), THREE.MathUtils.clamp(-dy * .18, -.09, .09)); }
  releaseDrag() { this.targetLook.set(0, 0); }

  interact(x: number, y: number, explicit = false): ShelterInteraction | null {
    const event = this.recipe?.interact(x, y, explicit, !this.running);
    if (!event) return null;
    this.renderFrame(0);
    return { world: this.kind, action: event.action, value: THREE.MathUtils.clamp(event.value, 0, 1) };
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true; this.stop();
    this.canvas.removeEventListener('webglcontextlost', this.contextLost);
    this.recipe?.dispose?.();
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>(); const textures = new Set<THREE.Texture>();
    this.scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) geometries.add(mesh.geometry);
      const mats = mesh.material ? (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) : [];
      for (const mat of mats) {
        materials.add(mat);
        for (const value of Object.values(mat)) if (value instanceof THREE.Texture) textures.add(value);
        if (mat instanceof THREE.ShaderMaterial) for (const uniform of Object.values(mat.uniforms)) if (uniform.value instanceof THREE.Texture) textures.add(uniform.value);
      }
      const light = object as THREE.Light & { shadow?: THREE.LightShadow };
      light.shadow?.dispose();
    });
    for (const texture of textures) texture.dispose();
    for (const mat of materials) mat.dispose();
    for (const geo of geometries) geo.dispose();
    this.scene.clear(); this.renderer.dispose(); this.renderer.forceContextLoss(); this.recipe = null;
  }
}
