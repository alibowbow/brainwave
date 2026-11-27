import * as THREE from 'three';
import { LiveSceneHost, type LiveSceneEngine, type LiveSceneHolder } from '../../liveScene/liveSceneHost';
import { LookSpring } from '../../liveScene/look';
import { HdrPipeline } from '../shared/render/hdrPipeline';
import type { SceneContent, WorldId, WorldInteraction } from './types';

type Factory = (renderer: THREE.WebGLRenderer) => SceneContent;
const factories: Record<WorldId, () => Promise<Factory>> = {
  temple: () => import('./scenes/temple').then(m => m.createTempleScene),
  scops: () => import('./scenes/scops').then(m => m.createScopsScene),
  rural: () => import('./scenes/rural').then(m => m.createRuralScene),
};

// Only the isolated QA harness calls this, to capture the direct fallback path.
let qaDirectRendering = false;
export function configureRenderingQA(options: { direct?: boolean } = {}) { qaDirectRendering = !!options.direct; }

/** One renderer per world, transported between player and fullscreen by LiveSceneHost. */
export class WorldEngine implements LiveSceneEngine {
  private renderer: THREE.WebGLRenderer;
  private content: SceneContent | null = null;
  private post: HdrPipeline | null = null;
  private frame = 0;
  private last = 0;
  private time = 0;
  private width = 1;
  private height = 1;
  private disposed = false;
  private rendered = 0;
  private cameraBase = new THREE.Quaternion();
  private look = new LookSpring({ yaw: 0.085, pitch: 0.045 }, { follow: 0.2, settle: 1.1 });
  private lastInteraction = -Infinity;
  private contextLost: (event: Event) => void;

  constructor(private canvas: HTMLCanvasElement, private id: WorldId, onLost: () => void) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'default' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.shadowMap.enabled = true;
    // PCF in r186 is filtered by each light's shadow.radius (PCFSoft was removed).
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.contextLost = event => { event.preventDefault(); onLost(); };
    canvas.addEventListener('webglcontextlost', this.contextLost);
    canvas.dataset.world = id;
  }

  async init() {
    try {
      const factory = await factories[this.id]();
      if (this.disposed) return;
      this.content = factory(this.renderer);
      this.renderer.toneMappingExposure = this.content.scene.userData.exposure ?? 1;
      this.createPost(this.content);
      this.content.resize(this.width / this.height);
      this.cameraBase.copy(this.content.camera.quaternion);
      // With the HDR pipeline the scene renders into a float target, whose program
      // variants (linear output, no tone mapping) differ from the canvas ones:
      // compile those, so the first visible frame does not recompile every material.
      const variant = this.post ? new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType }) : null;
      const previous = variant ? this.renderer.getRenderTarget() : null;
      if (variant) this.renderer.setRenderTarget(variant);
      const compiling = this.renderer.compileAsync(this.content.scene, this.content.camera);
      if (variant) this.renderer.setRenderTarget(previous);
      try { await compiling; } finally { variant?.dispose(); }
    } catch (error) {
      // The shared host's rejection path is not generation-scoped. A late
      // rejected import/compile from a retired engine must not tear down its successor.
      if (!this.disposed) throw error;
    }
  }

  /** HDR is the quality path. Without colour-renderable float targets (or if the
   * pipeline cannot be built) the engine keeps rendering directly, as before. */
  private createPost(content: SceneContent) {
    if (!qaDirectRendering && typeof this.renderer.getContext === 'function') {
      try {
        this.post = HdrPipeline.create(this.renderer, { settings: content.post, volume: content.createVolume ? () => content.createVolume!() : null });
        this.post?.setSize(this.width, this.height, this.renderer.getPixelRatio());
      } catch {
        this.post?.dispose(); this.post = null;
      }
    }
    content.setPostActive?.(!!this.post);
    this.canvas.dataset.post = this.post ? JSON.stringify(this.post.report) : 'direct';
  }

  setSize(width: number, height: number, dpr: number) {
    if (this.disposed) return;
    this.width = Math.max(1, width); this.height = Math.max(1, height);
    this.renderer.setPixelRatio(Math.min(2, Math.max(1, dpr)));
    this.renderer.setSize(this.width, this.height, false);
    if (this.post) {
      this.post.setSize(this.width, this.height, this.renderer.getPixelRatio());
      this.canvas.dataset.post = JSON.stringify(this.post.report);
    }
    if (this.content) {
      this.content.resize(this.width / this.height);
      this.cameraBase.copy(this.content.camera.quaternion);
    }
  }

  renderFrame(dt: number) {
    if (this.disposed || !this.content) return;
    const step = Math.max(0, Math.min(dt, 0.08));
    this.time += step;
    this.look.update(step);
    this.content.update(this.time, step);
    this.content.camera.quaternion.copy(this.cameraBase);
    this.content.camera.rotateY(this.look.yaw);
    this.content.camera.rotateX(this.look.pitch);
    if (this.post) this.post.render(this.content.scene, this.content.camera, this.time);
    else this.renderer.render(this.content.scene, this.content.camera);
    this.canvas.dataset.frames = String(++this.rendered);
    this.canvas.dataset.time = this.time.toFixed(3);
    this.canvas.dataset.drawCalls = String(this.renderer.info.render.calls);
    this.canvas.dataset.triangles = String(this.renderer.info.render.triangles);
    this.canvas.dataset.geometries = String(this.renderer.info.memory.geometries);
    this.canvas.dataset.textures = String(this.renderer.info.memory.textures);
  }

  start() {
    if (this.frame || this.disposed) return;
    this.last = performance.now();
    const tick = (now: number) => {
      const dt = (now - this.last) / 1000; this.last = now;
      this.renderFrame(dt);
      this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
    this.canvas.dataset.running = 'true';
  }
  stop() { cancelAnimationFrame(this.frame); this.frame = 0; this.canvas.dataset.running = 'false'; }
  drag(dx: number, dy: number) { this.look.drag(dx, dy); }
  releaseDrag() { this.look.release(); }
  interact(x: number, y: number): WorldInteraction | null {
    if (!this.content || !this.frame || this.time - this.lastInteraction < 0.7) return null;
    const event = this.content.interact(new THREE.Vector2(x, y));
    if (event) this.lastInteraction = this.time;
    return event;
  }
  audioEvent(type: 'scops-call') { if (this.frame) this.content?.audioEvent?.(type); }

  dispose() {
    if (this.disposed) return;
    this.disposed = true; this.stop();
    this.canvas.removeEventListener('webglcontextlost', this.contextLost);
    this.post?.dispose(); this.post = null;
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    if (this.content?.scene.environment instanceof THREE.Texture) textures.add(this.content.scene.environment);
    if (this.content?.scene.background instanceof THREE.Texture) textures.add(this.content.scene.background);
    this.content?.scene.traverse(object => {
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) geometries.add(mesh.geometry);
      if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(m => materials.add(m));
      const light = object as THREE.Light & { shadow?: THREE.LightShadow };
      light.shadow?.dispose();
      if ((object as THREE.InstancedMesh).isInstancedMesh) (object as THREE.InstancedMesh).dispose();
    });
    materials.forEach(material => {
      for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value);
      if (material instanceof THREE.ShaderMaterial) Object.values(material.uniforms).forEach(u => { if (u.value instanceof THREE.Texture) textures.add(u.value); });
      material.dispose();
    });
    textures.forEach(texture => texture.dispose());
    geometries.forEach(geometry => geometry.dispose());
    this.content?.dispose?.();
    this.content?.scene.clear(); this.content = null;
    this.renderer.dispose(); this.renderer.forceContextLoss();
  }
}

export class WorldHost extends LiveSceneHost<WorldEngine> {
  owns(holder: LiveSceneHolder) { return this.top === holder; }
  tap(holder: LiveSceneHolder, x: number, y: number) {
    return this.top === holder && holder.running ? this.engine?.interact(x, y) ?? null : null;
  }
  audio(holder: LiveSceneHolder, type: 'scops-call') {
    if (this.top === holder && holder.running) this.engine?.audioEvent(type);
  }
}
export const worldHosts: Record<WorldId, WorldHost> = Object.fromEntries(
  (['temple', 'scops', 'rural'] as const).map(id => [id, new WorldHost({
    canvasClass: 'korean-world-canvas',
    isSupported: () => typeof window !== 'undefined' && 'WebGL2RenderingContext' in window,
    create: (canvas, onLost) => new WorldEngine(canvas, id, onLost),
  })]),
) as Record<WorldId, WorldHost>;
