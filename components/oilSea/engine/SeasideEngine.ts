import * as THREE from 'three';
import type { LiveSceneEngine } from '../../liveScene/liveSceneHost';
import { LookSpring } from '../../liveScene/look';
import { detectTier, DynamicResolution, isMobileDevice, isSoftwareRenderer } from '../../rainyWindow/engine/quality';
import { createBoats } from './boats';
import { createBuildings } from './buildings';
import { createClouds } from './clouds';
import { createGrass, createShrubs } from './grass';
import { createGulls } from './gulls';
import { createOcean } from './ocean';
import { createPine } from './pine';
import { OilPaintPost } from './post';
import { createRocks } from './rocks';
import { createSky } from './sky';
import { createTerrain } from './terrain';
import { createTrees } from './trees';
import { CAMERA, LOOK, SUN } from './world';

export type SeasideQuality = 'high' | 'medium' | 'low' | 'software';

export interface SeasideOptions {
  canvas: HTMLCanvasElement;
  onContextLost?: () => void;
  /** Overrides the quality picked from the device (for development). */
  quality?: SeasideQuality;
}

interface Profile {
  /** Most pixels the painting is made with; the canvas is scaled up to fill the view. */
  maxPixels: number;
  maxPixelRatio: number;
  /** Brush (Kuwahara) radius for a 1280×720 painting, scaled with the resolution. */
  brush: number;
  /** Brush samples: every pixel (1) or every other one (2). */
  stride: number;
  strokeSteps: number;
  dabs: boolean;
  terrainDetail: number;
  clouds: number;
  grass: number;
  shrubs: number;
  rocks: number;
  trees: number;
  gulls: number;
}

const PROFILES: Record<SeasideQuality, Profile> = {
  high: { maxPixels: 2_000_000, maxPixelRatio: 1.5, brush: 3, stride: 2, strokeSteps: 9, dabs: true, terrainDetail: 1, clouds: 132, grass: 31000, shrubs: 1200, rocks: 140, trees: 9000, gulls: 6 },
  medium: { maxPixels: 1_000_000, maxPixelRatio: 1, brush: 3.5, stride: 2, strokeSteps: 6, dabs: true, terrainDetail: 0.8, clouds: 120, grass: 21500, shrubs: 820, rocks: 110, trees: 6400, gulls: 6 },
  low: { maxPixels: 620_000, maxPixelRatio: 1, brush: 3.5, stride: 2, strokeSteps: 4, dabs: false, terrainDetail: 0.6, clouds: 102, grass: 12800, shrubs: 530, rocks: 80, trees: 3850, gulls: 5 },
  software: { maxPixels: 300_000, maxPixelRatio: 1, brush: 3, stride: 2, strokeSteps: 0, dabs: false, terrainDetail: 0.5, clouds: 84, grass: 7100, shrubs: 300, rocks: 70, trees: 2050, gulls: 4 },
};

const REFERENCE_PIXELS = 1280 * 720;

/*
 * A headland above a bay on a summer day, simulated in 3D and painted in
 * oils: the sea, the land with its fields and woods, the grass and a
 * wind-bent pine are rendered as a real scene, then each frame is repainted
 * with brushwork that follows its forms. A drag moves the view across a little.
 */
export class SeasideEngine implements LiveSceneEngine {
  readonly renderer: THREE.WebGLRenderer;
  private readonly quality: SeasideQuality;
  private readonly profile: Profile;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(40, 16 / 9, 1, 80000);
  private readonly sunDirection = new THREE.Vector3(SUN.x, SUN.y, SUN.z).normalize();
  private readonly pacer: DynamicResolution;
  private readonly timed: THREE.ShaderMaterial[] = [];
  private readonly textures: THREE.Texture[] = [];
  private sky: THREE.Mesh | null = null;
  private oceanMaterial: THREE.ShaderMaterial | null = null;
  private sceneTarget: THREE.WebGLRenderTarget | null = null;
  private readonly post: OilPaintPost;
  private readonly sunPoint = new THREE.Vector3();
  /** A drag moves the view slowly and glides it home when let go. */
  private readonly look = new LookSpring(LOOK, { follow: 0.22, settle: 0.8 });
  private cssWidth = 1;
  private cssHeight = 1;
  /** The painting reaches this far past each side of the view (CSS pixels), for the view to slide over. */
  private margin = 0;
  /** Focal length of the view, in CSS pixels. */
  private focal = 1;
  /** How far the painting is slid under the view now (CSS pixels, to the right). */
  private slid = 0;
  private lastSlide = 0;
  private devicePixelRatio = 1;
  private time = 0;
  private energy = 1;
  private raf = 0;
  private lastFrame = 0;
  private running = false;
  private ready = false;
  private disposed = false;

  static isSupported() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
      return !!gl;
    } catch {
      return false;
    }
  }

  constructor(private readonly options: SeasideOptions) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: options.canvas,
      antialias: false,
      alpha: false,
      depth: true,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.autoClear = true;
    const gl = this.renderer.getContext();
    const debug = gl.getExtension('WEBGL_debug_renderer_info');
    const name = debug ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)) : String(gl.getParameter(gl.RENDERER));
    const nav = navigator as Navigator & { deviceMemory?: number; userAgentData?: { mobile?: boolean } };
    this.quality = options.quality ?? (isSoftwareRenderer(name) ? 'software' : detectTier({
      renderer: name,
      cores: nav.hardwareConcurrency,
      memory: nav.deviceMemory,
      mobile: isMobileDevice(nav.userAgent, nav.maxTouchPoints, nav.userAgentData?.mobile),
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE) as number,
    }));
    this.profile = PROFILES[this.quality];
    this.pacer = new DynamicResolution(0.6, 1, 1, 0.75);
    options.canvas.addEventListener('webglcontextlost', this.handleContextLost, false);

    this.camera.position.set(CAMERA.x, CAMERA.y, CAMERA.z);
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.set(CAMERA.pitch, -CAMERA.yaw, 0);

    this.post = new OilPaintPost(this.renderer, { radius: this.profile.brush, stride: this.profile.stride, strokeSteps: this.profile.strokeSteps, dabs: this.profile.dabs });
  }

  private get software() {
    return this.quality === 'software';
  }

  private handleContextLost = (event: Event) => {
    event.preventDefault();
    this.stop();
    this.options.onContextLost?.();
  };

  async init() {
    const { profile } = this;
    const sky = createSky(this.sunDirection);
    sky.mesh.scale.setScalar(20000);
    this.sky = sky.mesh;
    this.scene.add(sky.mesh);
    const clouds = createClouds(this.sunDirection, profile.clouds);
    this.scene.add(clouds.mesh);
    const ocean = createOcean(this.sunDirection);
    this.oceanMaterial = ocean.material;
    this.scene.add(ocean.mesh);
    const terrain = createTerrain(this.sunDirection, profile.terrainDetail);
    this.scene.add(terrain.mesh);
    const grass = createGrass(this.sunDirection, profile.grass);
    this.scene.add(grass.mesh);
    const shrubs = createShrubs(this.sunDirection, profile.shrubs);
    this.scene.add(shrubs.mesh);
    const rocks = createRocks(this.sunDirection, profile.rocks);
    this.scene.add(rocks.mesh);
    ocean.setRocks(rocks.waterline);
    const trees = createTrees(this.sunDirection, profile.trees);
    this.scene.add(trees.mesh);
    const buildings = createBuildings(this.sunDirection);
    this.scene.add(buildings.mesh);
    const boats = createBoats(this.sunDirection);
    this.scene.add(boats.mesh);
    const pine = createPine(this.sunDirection);
    this.scene.add(pine.group);
    const gulls = createGulls(this.sunDirection, profile.gulls);
    this.scene.add(gulls.mesh);
    this.timed.push(sky.material, clouds.material, ocean.material, terrain.material, grass.material, shrubs.material, rocks.material, trees.material, buildings.material, boats.material, gulls.material, ...pine.materials);
    this.textures.push(clouds.texture, grass.texture, shrubs.texture, trees.texture, ...pine.textures);
    await this.renderer.compileAsync(this.scene, this.camera);
    if (this.disposed) return;
    this.resize();
    this.ready = true;
  }

  setSize(width: number, height: number, devicePixelRatio: number) {
    this.cssWidth = Math.max(1, width);
    this.cssHeight = Math.max(1, height);
    this.devicePixelRatio = devicePixelRatio || 1;
    if (this.ready) this.resize();
  }

  setWaveEnergy(level: number) {
    this.energy = Math.max(0, Math.min(1.5, level));
  }

  private resize() {
    const { profile } = this;
    const ratio = Math.min(this.devicePixelRatio, profile.maxPixelRatio) * this.pacer.scale;
    let viewWidth = Math.round(this.cssWidth * ratio);
    let viewHeight = Math.round(this.cssHeight * ratio);
    const budget = profile.maxPixels * this.pacer.scale * this.pacer.scale;
    if (viewWidth * viewHeight > budget) {
      const scale = Math.sqrt(budget / (viewWidth * viewHeight));
      viewWidth = Math.round(viewWidth * scale);
      viewHeight = Math.round(viewHeight * scale);
    }
    // Keep the bay, the sun and the pine in view on narrow screens.
    const aspect = this.cssWidth / this.cssHeight;
    const fov = aspect >= 16 / 9 ? 40 : THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(20)) * Math.min(1.6, (16 / 9) / aspect)));
    // A drag slides the painting under the view, so it is painted wider than
    // the view by as far as it can slide. The margins come out of the same
    // pixels (the picture is made a little coarser), so it costs no more.
    this.focal = this.cssHeight / 2 / Math.tan(THREE.MathUtils.degToRad(fov / 2));
    this.margin = Math.ceil(this.focal * Math.tan(LOOK.yaw));
    const painted = this.cssWidth + 2 * this.margin;
    const fit = Math.sqrt(this.cssWidth / painted);
    const width = Math.max(1, Math.round(viewWidth * fit * (painted / this.cssWidth)));
    const height = Math.max(1, Math.round(viewHeight * fit));
    const canvas = this.options.canvas;
    canvas.style.width = `${painted}px`;
    canvas.style.left = `${-this.margin}px`;
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld();
    this.sceneTarget?.dispose();
    // The depth buffer is kept as a texture: the painting works near things with a finer brush.
    this.sceneTarget = new THREE.WebGLRenderTarget(width, height, { type: THREE.HalfFloatType, depthBuffer: true, depthTexture: new THREE.DepthTexture(width, height) });
    // The same brush on the same picture, whatever the resolution it is made at.
    const shown = width * (this.cssWidth / painted);
    this.post.setSize(width, height, profile.brush * Math.sqrt((shown * height) / REFERENCE_PIXELS), shown / width);
    this.sunPoint.copy(this.sunDirection).multiplyScalar(10000).add(this.camera.position).project(this.camera);
    this.post.setSun(this.sunPoint.x * 0.5 + 0.5, this.sunPoint.y * 0.5 + 0.5, Math.abs(this.sunPoint.x) < 1.2 && this.sunPoint.z < 1);
    if (this.oceanMaterial) {
      // Angle one pixel covers, for filtering waves finer than a pixel.
      this.oceanMaterial.uniforms.uDetail.value = (2 * Math.tan(THREE.MathUtils.degToRad(fov / 2))) / height;
    }
    this.slid = Number.NaN;
    this.slide(0);
  }

  /** Slide the view across a little for a drag of `dx`, `dy` shorter sides of the view (only across counts). */
  drag(dx: number, dy: number) {
    this.look.drag(dx, dy);
  }

  releaseDrag() {
    this.look.release();
  }

  /**
   * Slide the painting under the view as the drag has it, so the scene
   * follows the pointer. This is done on the page (a transform of the
   * canvas), at the screen's own rate: however slowly the painting itself is
   * made, the view moves smoothly, and nothing is painted again for it. The
   * camera never turns, which would swing the whole sea like a tilted board.
   */
  private slide(dt: number) {
    if (!this.look.moving && this.slid === 0) return;
    this.look.update(dt);
    const ratio = this.devicePixelRatio;
    const slid = Math.round(Math.max(-this.margin, Math.min(this.margin, Math.tan(this.look.yaw) * this.focal)) * ratio) / ratio;
    if (slid === this.slid) return;
    this.slid = slid;
    this.options.canvas.style.transform = slid ? `translate3d(${slid}px, 0, 0)` : '';
  }

  start() {
    if (this.running || this.disposed) return;
    this.running = true;
    this.lastFrame = 0;
    this.lastSlide = 0;
    this.pacer.reset();
    this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private get frameInterval() {
    if (this.software) return 1000 / 12;
    return this.pacer.rate === 60 ? 1000 / 75 : 1000 / 35;
  }

  private loop = (now: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.loop);
    if (!this.ready) return;
    this.slide(this.lastSlide ? Math.min(0.1, (now - this.lastSlide) / 1000) : 0);
    this.lastSlide = now;
    if (this.lastFrame && now - this.lastFrame < this.frameInterval) return;
    const elapsed = this.lastFrame ? now - this.lastFrame : 1000 / 60;
    this.lastFrame = now;
    if (!this.software && this.pacer.update(elapsed)) this.resize();
    this.renderFrame(Math.min(0.1, elapsed / 1000));
  };

  /** Advance by `dt` seconds and draw one frame (dt 0 redraws as is). */
  renderFrame(dt: number) {
    if (!this.ready || !this.sceneTarget) return;
    this.time += dt;
    for (const material of this.timed) material.uniforms.uTime.value = this.time;
    if (this.oceanMaterial) this.oceanMaterial.uniforms.uEnergy.value = this.energy;
    this.sky?.position.copy(this.camera.position);
    this.renderer.setRenderTarget(this.sceneTarget);
    this.renderer.render(this.scene, this.camera);
    this.post.render(this.sceneTarget.texture, this.sceneTarget.depthTexture, [this.camera.near, this.camera.far], this.debugView);
  }

  /** Development aid: 1 shows the render before it is painted, 2 the brush each pixel gets. */
  debugView = 0;

  get isReady() { return this.ready; }

  dispose() {
    this.disposed = true;
    this.stop();
    this.options.canvas.removeEventListener('webglcontextlost', this.handleContextLost, false);
    this.sceneTarget?.dispose();
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        (object.material as THREE.Material).dispose();
      }
    });
    this.post.dispose();
    for (const texture of this.textures) texture.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}
