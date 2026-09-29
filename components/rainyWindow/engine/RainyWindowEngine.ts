import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { CityBackdrop } from './city';
import { createTarget } from './fullscreen';
import { createGlassMaterial } from './glass';
import { buildInterior, LAMP_COLOR, type Interior } from './interior';
import { shadowTaps } from './materials';
import {
  CAMERA_POSITION, frameForAspect, GLASS_BOTTOM, GLASS_HALF_WIDTH, GLASS_TOP, GLASS_Z,
} from './layout';
import { updateMirrorCamera } from './mirror';
import { PostProcessor } from './post';
import { detectTier, DynamicResolution, isSoftwareRenderer, QUALITY, type QualityProfile, type QualityTier } from './quality';
import { mulberry32 } from './random';
import { DEFAULT_RAIN, RainSimulation } from './rainSimulation';
import { bakeTextures, type BakedTextures } from './textures';
import { WaterMap } from './waterMap';

export interface RainyWindowOptions {
  canvas: HTMLCanvasElement;
  quality?: QualityTier | 'auto';
  seed?: number;
  /** Adapt the render resolution to hold a steady frame rate. */
  dynamicResolution?: boolean;
  onContextLost?: () => void;
}

/** Circle of confusion for the far city, as an angle (radians) so every framing matches. */
const COC_ANGLE = 0.0062;
const CITY_MARGIN = 1.3;

export class RainyWindowEngine {
  readonly renderer: THREE.WebGLRenderer;
  readonly tier: QualityTier;
  readonly profile: QualityProfile;
  /** Minimum time between drawn frames. */
  private readonly frameInterval: number;
  private readonly software: boolean;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(36, 16 / 9, 0.02, 30);
  private readonly baseCamera = new THREE.PerspectiveCamera(36, 16 / 9, 0.02, 30);
  private readonly mirrorCamera = new THREE.PerspectiveCamera();
  private readonly reflectionMatrix = new THREE.Matrix4();
  private readonly glassMaterial = createGlassMaterial();
  private readonly glass: THREE.Mesh;
  private readonly dynamic: DynamicResolution;
  private textures: BakedTextures | null = null;
  private interior: Interior | null = null;
  private city: CityBackdrop | null = null;
  private water: WaterMap | null = null;
  private sim: RainSimulation | null = null;
  private post: PostProcessor | null = null;
  private envTarget: THREE.WebGLRenderTarget | null = null;
  private mainTarget: THREE.WebGLRenderTarget | null = null;
  private reflectionTarget: THREE.WebGLRenderTarget | null = null;
  private cssWidth = 1;
  private cssHeight = 1;
  private devicePixelRatio = 1;
  private renderWidth = 1;
  private renderHeight = 1;
  private time = 0;
  private simCarry = 0;
  private raf = 0;
  private lastFrame = 0;
  private running = false;
  private ready = false;
  private disposed = false;
  private flashes: { start: number; strength: number }[] = [];
  private flashLevel = 0;
  private rainIntensity = 1;
  private readonly lookTarget = new THREE.Vector3();

  static isSupported() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      const ok = !!gl && !!gl.getExtension('EXT_color_buffer_float');
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
      return ok;
    } catch {
      return false;
    }
  }

  constructor(private readonly options: RainyWindowOptions) {
    const { canvas } = options;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.shadowMap.enabled = false;
    const gl = this.renderer.getContext();
    const debug = gl.getExtension('WEBGL_debug_renderer_info');
    const nav = navigator as Navigator & { deviceMemory?: number; userAgentData?: { mobile?: boolean } };
    const rendererName = debug ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)) : String(gl.getParameter(gl.RENDERER));
    this.software = isSoftwareRenderer(rendererName);
    this.frameInterval = this.software ? 1000 / 12 : 1000 / 64;
    this.tier = options.quality && options.quality !== 'auto' ? options.quality : detectTier({
      renderer: rendererName,
      cores: nav.hardwareConcurrency,
      memory: nav.deviceMemory,
      mobile: nav.userAgentData?.mobile ?? /Android|iPhone|iPad|Mobile/i.test(nav.userAgent),
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE) as number,
    });
    this.profile = QUALITY[this.tier];
    this.dynamic = new DynamicResolution(0.55, 1, this.software && options.dynamicResolution !== false ? 0.6 : 1);
    this.glass = new THREE.Mesh(
      new THREE.PlaneGeometry(GLASS_HALF_WIDTH * 2, GLASS_TOP - GLASS_BOTTOM).translate(0, (GLASS_TOP + GLASS_BOTTOM) / 2, GLASS_Z),
      this.glassMaterial,
    );
    this.glass.layers.set(1);
    this.camera.layers.enable(1);
    canvas.addEventListener('webglcontextlost', this.handleContextLost, false);
  }

  private handleContextLost = (event: Event) => {
    event.preventDefault();
    this.stop();
    this.options.onContextLost?.();
  };

  /** Build every resource; resolves once the first frame can be drawn without hitches. */
  async init() {
    const renderer = this.renderer;
    RectAreaLightUniformsLib.init();
    shadowTaps.search = this.profile.shadowTaps[0];
    shadowTaps.filter = this.profile.shadowTaps[1];
    const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    this.textures = bakeTextures(renderer, this.profile.textureScale, anisotropy);
    this.interior = buildInterior(this.textures, this.options.seed ?? 11);
    this.scene.add(this.interior.group);
    this.scene.add(this.glass);

    const pmrem = new THREE.PMREMGenerator(renderer);
    this.envTarget = pmrem.fromScene(this.interior.environmentScene, 0, 0.05, 20, { position: new THREE.Vector3(0.1, 0.16, -0.1), size: 256 });
    pmrem.dispose();
    this.scene.environment = this.envTarget.texture;
    this.scene.environmentIntensity = 1;

    this.city = new CityBackdrop(renderer, {
      zenith: new THREE.Color(0.007, 0.019, 0.056),
      horizon: new THREE.Color(0.028, 0.064, 0.15),
      glow: new THREE.Color(0.028, 0.052, 0.11),
      fog: new THREE.Color(0.03, 0.062, 0.14),
    }, (this.options.seed ?? 11) * 7919);
    this.water = new WaterMap(renderer);
    this.sim = new RainSimulation(1, 1, { ...DEFAULT_RAIN, maxDrops: this.profile.maxDrops }, mulberry32((this.options.seed ?? 11) * 31));
    this.post = new PostProcessor(renderer, Math.max(1, this.profile.dofTaps));
    if (!this.profile.dofTaps) this.post.settings.focus = 0;

    this.interior.renderLampShadow(renderer, this.profile.shadowSize);
    this.applySize(true);
    this.prewet();
    try {
      await renderer.compileAsync(this.scene, this.camera);
    } catch {
      // Parallel compilation is an optimisation only.
    }
    if (this.disposed) return;
    this.ready = true;
  }

  private prewet() {
    const sim = this.sim!;
    const water = this.water!;
    const area = sim.area;
    sim.seed(Math.round(area * 820));
    const beads = [];
    const rng = mulberry32(97);
    const count = Math.round(area * 26000);
    for (let i = 0; i < count; i++) beads.push({ x: rng() * sim.width, y: rng() * sim.height, r: 0.28 + 0.55 * rng() * rng() });
    water.sprinkle(beads);
    for (let i = 0; i < 150; i++) {
      sim.step(1);
      water.collect(sim);
    }
    water.render(sim);
  }

  setSize(width: number, height: number, devicePixelRatio: number) {
    this.cssWidth = Math.max(1, width);
    this.cssHeight = Math.max(1, height);
    this.devicePixelRatio = devicePixelRatio || 1;
    if (this.ready || this.interior) this.applySize(true);
  }

  setRainIntensity(intensity: number) {
    this.rainIntensity = Math.max(0, Math.min(1.5, intensity));
    if (this.sim) this.sim.intensity = this.rainIntensity;
  }

  /** Distant lightning: a few ragged pulses through the clouds. */
  flash(strength = 1) {
    const start = this.time;
    const pulses = 2 + Math.floor(Math.random() * 3);
    let offset = 0;
    for (let i = 0; i < pulses; i++) {
      this.flashes.push({ start: start + offset, strength: strength * (i === 0 ? 1 : 0.35 + Math.random() * 0.6) });
      offset += 0.06 + Math.random() * 0.22;
    }
  }

  private pixelRatio() {
    return Math.min(this.devicePixelRatio, this.profile.maxPixelRatio) * this.dynamic.scale;
  }

  private applySize(force: boolean) {
    if (!this.interior || !this.city || !this.water || !this.sim || !this.post) return;
    const ratio = this.pixelRatio();
    const width = Math.max(2, Math.round(this.cssWidth * ratio));
    const height = Math.max(2, Math.round(this.cssHeight * ratio));
    if (!force && width === this.renderWidth && height === this.renderHeight) return;
    this.renderWidth = width;
    this.renderHeight = height;
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(width, height, false);

    const aspect = width / height;
    const frame = frameForAspect(aspect);
    for (const camera of [this.camera, this.baseCamera]) {
      camera.aspect = aspect;
      camera.fov = frame.fov;
      camera.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);
      camera.lookAt(frame.target.x, frame.target.y, frame.target.z);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
    }
    this.lookTarget.set(frame.target.x, frame.target.y, frame.target.z);

    this.mainTarget?.dispose();
    this.mainTarget = createTarget(width, height, { samples: this.profile.msaa, depth: true, depthTexture: this.profile.dofTaps > 0 });
    this.reflectionTarget?.dispose();
    this.reflectionTarget = this.profile.reflection
      ? createTarget(width * this.profile.reflectionScale, height * this.profile.reflectionScale, { depth: true })
      : null;
    this.post.setSize(width, height);

    this.city.setView(this.baseCamera.quaternion, frame.fov, aspect, CITY_MARGIN);
    const cityWidth = width * this.profile.cityScale * CITY_MARGIN;
    const cityHeight = height * this.profile.cityScale * CITY_MARGIN;
    const focalPx = height / (2 * Math.tan((frame.fov * Math.PI) / 360));
    this.city.setSize(cityWidth, cityHeight, COC_ANGLE * focalPx * this.profile.cityScale);

    // Rain covers exactly the visible part of the pane.
    const corners = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
    let x0 = Infinity; let x1 = -Infinity; let y0 = Infinity; let y1 = -Infinity;
    const origin = this.baseCamera.position;
    for (const [nx, ny] of corners) {
      const point = new THREE.Vector3(nx * 1.04, ny * 1.04, 0.5).unproject(this.baseCamera);
      const dir = point.sub(origin).normalize();
      const t = (GLASS_Z - origin.z) / dir.z;
      x0 = Math.min(x0, origin.x + dir.x * t);
      x1 = Math.max(x1, origin.x + dir.x * t);
      y0 = Math.min(y0, origin.y + dir.y * t);
      y1 = Math.max(y1, origin.y + dir.y * t);
    }
    y0 = Math.max(GLASS_BOTTOM - 0.01, y0);
    y1 = Math.min(GLASS_TOP, y1);
    const previous = this.water.region;
    const distance = CAMERA_POSITION.z - GLASS_Z;
    const pxPerMM = height / (2 * distance * Math.tan((frame.fov * Math.PI) / 360) * 1000);
    const widthMM = (x1 - x0) * 1000;
    const heightMM = (y1 - y0) * 1000;
    // Density follows the screen at full resolution (so dynamic resolution never
    // rebuilds it), bounded by the tier's memory budget.
    const wanted = pxPerMM / Math.max(0.35, this.dynamic.scale) * this.profile.waterDensity;
    const budget = Math.sqrt(this.profile.maxWaterTexels / Math.max(1, widthMM * heightMM));
    const rebuilt = this.water.setRegion({ x0, y0, x1, y1 }, Math.min(2.2, wanted, budget));
    if (this.sim.width <= 1) this.sim.resize(widthMM, heightMM);
    else this.sim.resize(widthMM, heightMM, (previous.x0 - x0) * 1000, (y1 - previous.y1) * 1000);
    if (rebuilt && this.ready) {
      const rng = mulberry32(Math.floor(this.time * 1000));
      const beads = [];
      const count = Math.round(this.sim.area * 26000);
      for (let i = 0; i < count; i++) beads.push({ x: rng() * this.sim.width, y: rng() * this.sim.height, r: 0.28 + 0.55 * rng() * rng() });
      this.water.sprinkle(beads);
    }

    const uniforms = this.glassMaterial.uniforms;
    uniforms.uWaterRect.value.set(x0, y0, x1, y1);
    uniforms.uWaterTexel.value.set(1 / this.water.width, 1 / this.water.height);
    uniforms.uTexelMM.value.set(widthMM / this.water.width, heightMM / this.water.height);
    uniforms.uCityAspect.value = aspect;
    uniforms.uLampPos.value.copy(this.interior.lamp.bulb);
    uniforms.uLampColor.value.copy(LAMP_COLOR).multiplyScalar(2.4);
    uniforms.uReflectionStrength.value = this.reflectionTarget ? 2.2 : 0;
  }

  start() {
    if (this.running || this.disposed) return;
    this.running = true;
    this.lastFrame = 0;
    this.dynamic.reset();
    this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private loop = (now: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.loop);
    if (!this.ready) return;
    if (this.lastFrame && now - this.lastFrame < this.frameInterval) return;
    const elapsed = this.lastFrame ? now - this.lastFrame : 1000 / 60;
    this.lastFrame = now;
    if (this.options.dynamicResolution !== false && !this.software && this.dynamic.update(elapsed)) this.applySize(false);
    this.renderFrame(Math.min(0.1, elapsed / 1000));
  };

  private updateCamera() {
    const t = this.time;
    // A resting camera: slow, sub-millimetre breathing and drift.
    const bx = Math.sin(t * 0.21) * 0.0016 + Math.sin(t * 0.53 + 1.3) * 0.0006;
    const by = Math.sin(t * 0.17 + 0.6) * 0.0012 + Math.sin(t * 0.41) * 0.0005;
    const bz = Math.sin(t * 0.13 + 2.1) * 0.001;
    this.camera.position.set(CAMERA_POSITION.x + bx, CAMERA_POSITION.y + by, CAMERA_POSITION.z + bz);
    this.camera.lookAt(
      this.lookTarget.x + Math.sin(t * 0.11 + 0.4) * 0.0035,
      this.lookTarget.y + Math.sin(t * 0.09 + 2.2) * 0.0025,
      this.lookTarget.z,
    );
    this.camera.updateMatrixWorld();
  }

  private updateFlash() {
    let level = 0;
    this.flashes = this.flashes.filter((flash) => this.time - flash.start < 2.5);
    for (const flash of this.flashes) {
      const age = this.time - flash.start;
      if (age < 0) continue;
      level += flash.strength * Math.exp(-age * 9) * (age < 0.025 ? age / 0.025 : 1);
    }
    this.flashLevel = Math.min(2, level);
  }

  /** Advance the world by `dt` seconds and draw one frame. */
  renderFrame(dt: number) {
    if (!this.ready || !this.interior || !this.city || !this.water || !this.sim || !this.post || !this.mainTarget) return;
    const renderer = this.renderer;
    this.time += dt;

    // Rain comes and goes in slow waves on top of what the listener chose.
    const t = this.time;
    const wave = 0.74 + 0.5 * (0.5 + 0.5 * Math.sin(t * 0.021)) * (0.5 + 0.5 * Math.sin(t * 0.047 + 1.7));
    this.sim.intensity = this.rainIntensity * wave;
    this.simCarry += dt * 60;
    let ticks = 0;
    while (this.simCarry >= 1 && ticks < 4) {
      this.sim.step(1);
      this.water.collect(this.sim);
      this.simCarry -= 1;
      ticks++;
    }
    if (ticks === 4) this.simCarry = 0;
    this.water.render(this.sim);

    this.updateCamera();
    this.updateFlash();
    this.city.render(this.time, this.flashLevel);
    this.interior.windowLight.intensity = this.interior.windowLightBase * (1 + this.flashLevel * 7);
    this.interior.update(this.time, this.camera, this.renderHeight / (2 * Math.tan((this.camera.fov * Math.PI) / 360)));

    const uniforms = this.glassMaterial.uniforms;
    uniforms.tWater.value = this.water.texture;
    uniforms.uHasWater.value = 1;
    uniforms.tCityBlur.value = this.city.blurTexture;
    uniforms.tCitySharp.value = this.city.sharpTexture;
    uniforms.uCityViewProj.value.copy(this.city.viewProjection);
    uniforms.uFlash.value = this.flashLevel;
    uniforms.uTime.value = this.time;

    renderer.setClearColor(0x000000, 1);
    if (this.reflectionTarget) {
      updateMirrorCamera(this.camera, new THREE.Vector3(0, 0, GLASS_Z), new THREE.Vector3(0, 0, 1), this.mirrorCamera, this.reflectionMatrix, true);
      this.mirrorCamera.layers.set(0);
      renderer.setRenderTarget(this.reflectionTarget);
      renderer.clear();
      renderer.render(this.scene, this.mirrorCamera);
      uniforms.tReflection.value = this.reflectionTarget.texture;
      uniforms.uReflectionMatrix.value.copy(this.reflectionMatrix);
    }

    renderer.setRenderTarget(this.mainTarget);
    renderer.clear();
    renderer.render(this.scene, this.camera);
    const depth = this.mainTarget.depthTexture ? { texture: this.mainTarget.depthTexture, near: this.camera.near, far: this.camera.far } : null;
    this.post.render(this.mainTarget.texture, this.time, null, depth);
  }

  /** Debug/testing hook: advance the simulation without drawing. */
  advance(seconds: number) {
    if (!this.sim || !this.water) return;
    const ticks = Math.round(seconds * 60);
    for (let i = 0; i < ticks; i++) {
      this.sim.step(1);
      this.water.collect(this.sim);
    }
    this.time += seconds;
  }

  get isReady() { return this.ready; }

  /** Tuning hooks for development tools. */
  get debug() {
    return { post: this.post, interior: this.interior, city: this.city, glass: this.glassMaterial, sim: this.sim, water: this.water, scene: this.scene, camera: this.camera, textures: this.textures };
  }

  dispose() {
    this.disposed = true;
    this.stop();
    this.options.canvas.removeEventListener('webglcontextlost', this.handleContextLost, false);
    this.interior?.dispose();
    this.textures?.dispose();
    this.city?.dispose();
    this.water?.dispose();
    this.post?.dispose();
    this.envTarget?.dispose();
    this.mainTarget?.dispose();
    this.reflectionTarget?.dispose();
    this.glass.geometry.dispose();
    this.glassMaterial.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}
