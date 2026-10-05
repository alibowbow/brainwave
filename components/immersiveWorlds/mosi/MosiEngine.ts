import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { LiveSceneHost, type LiveSceneEngine, type LiveSceneHolder } from '../../liveScene/liveSceneHost';
import { fittedFov, frames, selectFrame } from './framing';
const ROOT = '/immersive-worlds/mosi/';

/** Actual Blender geometry, with view-dependent Cycles color projection.
 * Lighting is baked, not a runtime path tracer; keep navigation within the authored view. */
export class MosiEngine implements LiveSceneEngine {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera();
  private projector = new THREE.PerspectiveCamera();
  private mesh: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial> | null = null;
  private textures = new Map<string, THREE.Texture>();
  private disposed = false;
  private aspect = 1;
  private frameName = '';
  private raf = 0;
  private previous = 0;
  private elapsed = 0;
  private look = new THREE.Vector2();
  private targetLook = new THREE.Vector2();
  private baseQuaternion = new THREE.Quaternion();
  private lost: (event: Event) => void;
  constructor(private canvas: HTMLCanvasElement, onLost: () => void) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.lost = event => { event.preventDefault(); onLost(); };
    canvas.addEventListener('webglcontextlost', this.lost);
  }
  async init() {
    const textureLoader = new THREE.TextureLoader();
    // allSettled ensures successfully loaded resources are cleaned if any request fails.
    const results = await Promise.allSettled([
      new GLTFLoader().loadAsync(ROOT + 'mosi-room.glb'),
      ...frames.map(async row => {
        const texture = await textureLoader.loadAsync(ROOT + row.name + '.webp');
        texture.colorSpace = THREE.SRGBColorSpace;
        if (this.disposed) texture.dispose(); else this.textures.set(row.name, texture);
        return null;
      }),
    ]);
    const loaded = results[0];
    if (loaded.status === 'fulfilled' && loaded.value && 'scene' in loaded.value) {
      const model = loaded.value.scene;
      model.updateMatrixWorld(true);
      const parts: THREE.BufferGeometry[] = [];
      model.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        if (!this.disposed) {
          const geometry = object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone();
          geometry.applyMatrix4(object.matrixWorld);
          for (const key of Object.keys(geometry.attributes)) if (key !== 'position') geometry.deleteAttribute(key);
          parts.push(geometry);
        }
        object.geometry.dispose();
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) material.dispose();
      });
      if (!this.disposed && parts.length) {
        const geometry = mergeGeometries(parts)!;
        parts.forEach(part => part.dispose());
        const material = new THREE.ShaderMaterial({ side: THREE.DoubleSide, toneMapped: false,
          uniforms: { colorMap: { value: null }, projection: { value: new THREE.Matrix4() } },
          vertexShader: `uniform mat4 projection; varying vec4 projected;
            void main() { vec4 world = modelMatrix * vec4(position, 1.0); projected = projection * world;
              gl_Position = projectionMatrix * viewMatrix * world; }`,
          fragmentShader: `uniform sampler2D colorMap; varying vec4 projected;
            void main() { vec2 uv = projected.xy / projected.w * .5 + .5;
              gl_FragColor = texture2D(colorMap, clamp(uv, vec2(0.0), vec2(1.0)));
              #include <colorspace_fragment>
            }`,
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
      }
    }
    if (this.disposed) return;
    if (results.some(result => result.status === 'rejected') || !this.mesh) throw new Error('Mosi assets unavailable');
    this.configure();
  }
  setSize(width: number, height: number, dpr: number) {
    this.aspect = Math.max(1, width) / Math.max(1, height);
    this.renderer.setPixelRatio(Math.min(2, Math.max(1, dpr)));
    this.renderer.setSize(Math.max(1, width), Math.max(1, height), false);
    this.configure();
  }
  private configure() {
    if (!this.mesh) return;
    const frame = selectFrame(this.aspect);
    this.projector.position.set(.85, .85, 1.5);
    this.projector.lookAt(0, frame.targetHeight, -2.1);
    this.projector.fov = 2 * Math.atan(18 / frame.lens) * 180 / Math.PI;
    this.projector.aspect = frame.aspect;
    this.projector.near = .01; this.projector.far = 100;
    this.projector.updateProjectionMatrix(); this.projector.updateMatrixWorld(true);
    this.camera.copy(this.projector);
    this.camera.aspect = this.aspect;
    this.camera.fov = fittedFov(frame.lens, frame.aspect, this.aspect);
    this.camera.updateProjectionMatrix();
    this.baseQuaternion.copy(this.camera.quaternion);
    if (this.frameName !== frame.name) {
      this.mesh.material.uniforms.projection.value.multiplyMatrices(this.projector.projectionMatrix, this.projector.matrixWorldInverse);
      this.mesh.material.uniforms.colorMap.value = this.textures.get(frame.name)!;
      this.frameName = frame.name;
      this.canvas.dataset.preset = frame.name;
    }
    this.renderFrame(0);
  }
  renderFrame(dt: number) {
    if (this.disposed || !this.mesh) return;
    const step = Math.max(0, Math.min(dt, .05)); this.elapsed += step;
    this.look.lerp(this.targetLook, step ? 1 - Math.exp(-step * 7) : 1);
    this.camera.quaternion.copy(this.baseQuaternion).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(this.look.y, this.look.x, 0, 'YXZ')));
    this.renderer.render(this.scene, this.camera);
    this.canvas.dataset.frame = String(Number(this.canvas.dataset.frame || 0) + 1);
    this.canvas.dataset.elapsed = this.elapsed.toFixed(3);
    this.canvas.dataset.triangles = String(this.renderer.info.render.triangles);
    this.canvas.dataset.drawCalls = String(this.renderer.info.render.calls);
  }
  start() { if (this.raf || this.disposed) return; this.previous = performance.now(); this.raf = requestAnimationFrame(this.tick); }
  private tick = (now: number) => { this.raf = 0; this.renderFrame((now - this.previous) / 1000); this.previous = now; if (!this.disposed) this.raf = requestAnimationFrame(this.tick); };
  stop() { cancelAnimationFrame(this.raf); this.raf = 0; this.targetLook.set(0, 0); this.look.set(0, 0); this.renderFrame(0); }
  drag(dx: number, dy: number) { this.targetLook.set(THREE.MathUtils.clamp(-dx * .012, -.006, .006), THREE.MathUtils.clamp(-dy * .008, -.004, .004)); }
  releaseDrag() { this.targetLook.set(0, 0); }
  dispose() {
    if (this.disposed) return;
    this.stop(); this.disposed = true;
    this.canvas.removeEventListener('webglcontextlost', this.lost);
    this.mesh?.geometry.dispose(); this.mesh?.material.dispose();
    this.textures.forEach(texture => texture.dispose()); this.textures.clear();
    this.scene.clear(); this.renderer.dispose(); this.renderer.forceContextLoss();
  }
}
export class MosiHost extends LiveSceneHost<MosiEngine> {
  readonly kind = 'meditation' as const;
  constructor() { super({ canvasClass: 'sanctuary-canvas', disposeDelayMs: 0, isSupported: () => typeof window !== 'undefined', create: (canvas, onLost) => new MosiEngine(canvas, onLost) }); }
  interact(_holder: LiveSceneHolder, _x: number, _y: number) { return undefined; }
}
