import * as THREE from 'three';
import type { LiveSceneEngine, LiveSceneHolder } from '../../liveScene/liveSceneHost';
import { LiveSceneHost } from '../../liveScene/liveSceneHost';
import { buildMountainWorld } from './mountainScene';
import { buildDeepNightWorld } from './deepScene';
import { buildLakesideWorld } from './lakesideScene';
import type { NightWorldId, NightInteraction, NightInteractionKind, WorldRecipe } from './worldTypes';

/** Read-only diagnostics used by the isolated verification harness. No user data. */
const diagnostics = { engineCreated: 0, engineDisposed: 0, liveEngines: 0, frames: 0 };
export const getNightDiagnostics = () => ({ ...diagnostics });
const builders = { mountain: buildMountainWorld, deep: buildDeepNightWorld, lakeside: buildLakesideWorld };

export class NightEngine implements LiveSceneEngine {
  private renderer: THREE.WebGLRenderer;
  private recipe: WorldRecipe | null = null;
  private camera = new THREE.PerspectiveCamera(52, 1, 0.05, 600);
  private basePosition = new THREE.Vector3();
  private baseTarget = new THREE.Vector3();
  private target = new THREE.Vector3();
  private direction = new THREE.Vector3();
  private ray = new THREE.Raycaster();
  private look = new THREE.Vector2();
  private desiredLook = new THREE.Vector2();
  private width = 1;
  private height = 1;
  private running = false;
  private disposed = false;
  private raf = 0;
  private lastTime = 0;
  private elapsed = 0;
  private frameCount = 0;
  private lastInteraction = -Infinity;
  private contextLost: (event: Event) => void;

  constructor(private canvas: HTMLCanvasElement, readonly world: NightWorldId, onContextLost: () => void) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor('#111729');
    diagnostics.engineCreated++;
    diagnostics.liveEngines++;
    this.canvas.dataset.engineId = String(diagnostics.engineCreated);
    this.contextLost = (event) => { event.preventDefault(); if (!this.disposed) onContextLost(); };
    canvas.addEventListener('webglcontextlost', this.contextLost);
  }

  async init() {
    this.recipe = builders[this.world]();
    if (typeof this.recipe.scene.userData.exposure === 'number') this.renderer.toneMappingExposure = this.recipe.scene.userData.exposure;
    this.composeView();
  }

  setSize(width: number, height: number, devicePixelRatio: number) {
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    // Up to 2 physical pixels per CSS pixel, preserving antialiasing and sharp foregrounds.
    this.renderer.setPixelRatio(Math.min(2, Math.max(1, devicePixelRatio)));
    this.renderer.setSize(this.width, this.height, false);
    this.camera.aspect = this.width / this.height;
    this.composeView();
  }

  private composeView() {
    if (!this.recipe) return;
    const view = this.recipe.view(this.camera.aspect);
    this.camera.fov = view.fov;
    this.camera.updateProjectionMatrix();
    this.basePosition.fromArray(view.position);
    this.baseTarget.fromArray(view.target);
    this.camera.position.copy(this.basePosition);
    this.applyView();
  }

  private applyView() {
    this.direction.subVectors(this.baseTarget, this.basePosition);
    this.direction.applyEuler(new THREE.Euler(this.look.y, this.look.x, 0, 'YXZ'));
    this.target.copy(this.basePosition).add(this.direction);
    this.camera.lookAt(this.target);
    this.camera.updateMatrixWorld();
  }

  renderFrame(dt: number) {
    if (this.disposed || !this.recipe) return;
    const delta = Math.min(0.05, Math.max(0, dt));
    this.elapsed += delta;
    if (delta) this.look.lerp(this.desiredLook, 1 - Math.exp(-delta * 5));
    this.applyView();
    this.recipe.update(this.elapsed, delta);
    this.renderer.render(this.recipe.scene, this.camera);
    this.frameCount++;
    diagnostics.frames++;
    this.canvas.dataset.renderCount = String(this.frameCount);
    this.canvas.dataset.time = this.elapsed.toFixed(5);
    // QA and assistive tooling can locate genuine spatial targets without assuming layout.
    this.canvas.dataset.targets = JSON.stringify(this.recipe.targets.map(({ object, kind }) => {
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3()).project(this.camera);
      return { kind, x: (center.x + 1) * this.width / 2, y: (1 - center.y) * this.height / 2 };
    }));
  }

  start() {
    if (this.running || this.disposed) return;
    this.running = true;
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }
  private tick = (now: number) => {
    if (!this.running || this.disposed) return;
    const delta = Math.min(0.05, Math.max(0, (now - this.lastTime) / 1000));
    this.lastTime = now;
    this.renderFrame(delta);
    this.raf = requestAnimationFrame(this.tick);
  };
  stop() { this.running = false; cancelAnimationFrame(this.raf); this.raf = 0; this.lastTime = 0; }
  drag(dx: number, dy: number) {
    this.desiredLook.set(THREE.MathUtils.clamp(-dx * 0.3, -0.16, 0.16), THREE.MathUtils.clamp(-dy * 0.22, -0.095, 0.095));
  }
  releaseDrag() { this.desiredLook.set(0, 0); }

  interact(kind?: NightInteractionKind, point?: [number, number]): NightInteraction | null {
    if (!this.recipe || this.disposed || performance.now() - this.lastInteraction < 650) return null;
    let hitKind = kind;
    if (point) {
      this.ray.setFromCamera(new THREE.Vector2(point[0] * 2 - 1, 1 - point[1] * 2), this.camera);
      const intersections = this.ray.intersectObjects(this.recipe.targets.map((t) => t.object), true);
      const hit = intersections[0]?.object;
      if (!hit) return null;
      hitKind = this.recipe.targets.find((t) => {
        let node: THREE.Object3D | null = hit;
        while (node) { if (node === t.object) return true; node = node.parent; }
        return false;
      })?.kind;
    }
    if (!hitKind || !this.recipe.targets.some((t) => t.kind === hitKind)) return null;
    this.lastInteraction = performance.now();
    const value = THREE.MathUtils.clamp(this.recipe.interact(hitKind), 0, 1);
    // A reduced-motion scene still renders a meaningful static response.
    if (!this.running) this.renderFrame(0);
    return { world: this.world, kind: hitKind, value };
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.stop();
    this.canvas.removeEventListener('webglcontextlost', this.contextLost);
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    this.recipe?.scene.traverse((object) => {
      const drawable = object as THREE.Mesh;
      if (drawable.geometry) geometries.add(drawable.geometry);
      if (drawable.material) for (const material of Array.isArray(drawable.material) ? drawable.material : [drawable.material]) materials.add(material);
      if (object instanceof THREE.Light && 'shadow' in object) (object as THREE.DirectionalLight).shadow?.dispose();
    });
    for (const material of materials) {
      for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value);
      if (material instanceof THREE.ShaderMaterial) for (const uniform of Object.values(material.uniforms)) if (uniform.value instanceof THREE.Texture) textures.add(uniform.value);
      material.dispose();
    }
    for (const texture of textures) texture.dispose();
    for (const geometry of geometries) geometry.dispose();
    this.recipe?.dispose?.();
    this.recipe?.scene.clear();
    this.recipe = null;
    this.renderer.renderLists.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    diagnostics.engineDisposed++;
    diagnostics.liveEngines--;
  }
}

export class NightHost extends LiveSceneHost<NightEngine> {
  constructor(world: NightWorldId) {
    super({ canvasClass: 'night-world-canvas', isSupported: () => typeof window !== 'undefined' && 'WebGL2RenderingContext' in window,
      create: (canvas, lost) => new NightEngine(canvas, world, lost) });
  }
  ownsInput(holder: LiveSceneHolder) { return this.top === holder && this.status === 'ready'; }
  interact(holder: LiveSceneHolder, kind?: NightInteractionKind, point?: [number, number]) {
    if (this.top !== holder || this.status !== 'ready') return null;
    return this.engine?.interact(kind, point) ?? null;
  }
}
const hosts: Partial<Record<NightWorldId, NightHost>> = {};
export function getNightHost(world: NightWorldId) { return hosts[world] ??= new NightHost(world); }
