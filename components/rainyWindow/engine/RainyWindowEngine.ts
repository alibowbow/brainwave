import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { LookSpring } from '../../liveScene/look';
import { CityBackdrop } from './city';
import { createTarget } from './fullscreen';
import { bakeGrime, createGlassMaterial } from './glass';
import { buildInterior, LAMP_COLOR, type Interior } from './interior';
import { shadowTaps } from './materials';
import {
  CAMERA_POSITION, frameForAspect, GLASS_BOTTOM, GLASS_HALF_WIDTH, GLASS_TOP, GLASS_Z,
} from './layout';
import { updateMirrorCamera } from './mirror';
import { PostProcessor } from './post';
import { detectTier, DynamicResolution, isMobileDevice, isSoftwareRenderer, QUALITY, samplesFor, type QualityProfile, type QualityTier } from './quality';
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

/*
 * A drag turns the view a few degrees around a point near the lamp and mug,
 * so they hold still while the city slides behind the window frame.
 */
/** Largest turn a drag can make, in radians (about 3.4° across, 2° up and down). */
const LOOK_LIMIT = { yaw: 0.06, pitch: 0.035 } as const;
/** How far in front of the camera the view turns around, in metres (near the focus distance). */
const LOOK_PIVOT = 1;

export class RainyWindowEngine {
  readonly renderer: THREE.WebGLRenderer;
  readonly tier: QualityTier;
  readonly profile: QualityProfile;
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
  private grime: THREE.WebGLRenderTarget | null = null;
  private grimeRegion = '';
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
  private frameIndex = 0;
  /** Draw every layer on the next frame (after a resize, or when redrawing a paused view). */
  private refreshAll = true;
  private ready = false;
  private disposed = false;
  private flashes: { start: number; strength: number }[] = [];
  private flashLevel = 0;
  private rainIntensity = 1;
  private readonly lookTarget = new THREE.Vector3();
  private readonly look = new LookSpring(LOOK_LIMIT);
  private readonly drift = new THREE.Vector3();
  private readonly sway = new THREE.Vector3();
  private readonly rest = new THREE.Vector3();
  private readonly forward = new THREE.Vector3();
  private readonly right = new THREE.Vector3();
  private readonly pivot = new THREE.Vector3();
  private readonly aim = new THREE.Vector3();
  private readonly orbit = new THREE.Quaternion();
  private readonly orbitPitch = new THREE.Quaternion();

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
    this.tier = options.quality && options.quality !== 'auto' ? options.quality : detectTier({
      renderer: rendererName,
      cores: nav.hardwareConcurrency,
      memory: nav.deviceMemory,
      mobile: isMobileDevice(nav.userAgent, nav.maxTouchPoints, nav.userAgentData?.mobile),
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
    // Building the study takes a few heavy steps; yielding between them keeps
    // the page responsive (the poster shows meanwhile).
    const breathe = async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      return this.disposed;
    };
    RectAreaLightUniformsLib.init();
    shadowTaps.search = this.profile.shadowTaps[0];
    shadowTaps.filter = this.profile.shadowTaps[1];
    const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    this.textures = bakeTextures(renderer, this.profile.textureScale, anisotropy);
    if (await breathe()) return;
    this.interior = buildInterior(this.textures, this.options.seed ?? 11);
    this.scene.add(this.interior.group);
    this.scene.add(this.glass);
    if (await breathe()) return;

    const pmrem = new THREE.PMREMGenerator(renderer);
    this.envTarget = pmrem.fromScene(this.interior.environmentScene, 0, 0.05, 20, { position: new THREE.Vector3(0.1, 0.16, -0.1), size: 256 });
    pmrem.dispose();
    this.scene.environment = this.envTarget.texture;
    this.scene.environmentIntensity = 1;
    if (await breathe()) return;

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
    if (await breathe()) return;

    this.interior.renderLampShadow(renderer, this.profile.shadowSize);
    if (await breathe()) return;
    this.applySize(true);
    if (await breathe()) return;
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

  /** Turn the view slightly for a drag of `dx`, `dy` shorter sides of the view. */
  drag(dx: number, dy: number) {
    this.look.drag(dx, dy);
  }

  /** Ease the view back to the resting shot. */
  releaseDrag() {
    this.look.release();
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

  /**
   * Minimum time between drawn frames. The thresholds sit between display
   * refresh multiples so 60, 90, 120 and 144 Hz screens all pace evenly.
   */
  private get frameInterval() {
    if (this.software) return 1000 / 12;
    return this.dynamic.rate === 60 ? 1000 / 75 : 1000 / 35;
  }

  private basePixelRatio() {
    return Math.min(this.devicePixelRatio, this.profile.maxPixelRatio);
  }

  private pixelRatio() {
    return this.basePixelRatio() * this.dynamic.scale;
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
    this.refreshAll = true;

    const aspect = width / height;
    const frame = frameForAspect(aspect);
    this.lookTarget.set(frame.target.x, frame.target.y, frame.target.z);
    for (const camera of [this.camera, this.baseCamera]) {
      camera.aspect = aspect;
      camera.fov = frame.fov;
      camera.updateProjectionMatrix();
      this.pose(camera, 0, 0);
    }

    this.mainTarget?.dispose();
    this.mainTarget = createTarget(width, height, { samples: samplesFor(this.profile, ratio), depth: true, depthTexture: this.profile.dofTaps > 0 });
    this.reflectionTarget?.dispose();
    this.reflectionTarget = this.profile.reflection
      ? createTarget(width * this.profile.reflectionScale, height * this.profile.reflectionScale, { depth: true })
      : null;
    this.post.setSize(width, height);

    // The view can turn a little when dragged: the city and the rain must
    // already cover every pose it can reach.
    const poses = [this.baseCamera];
    for (const [yaw, pitch] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const camera = this.baseCamera.clone();
      this.pose(camera, yaw * LOOK_LIMIT.yaw, pitch * LOOK_LIMIT.pitch);
      poses.push(camera);
    }
    const edges = [[-1, -1], [1, -1], [-1, 1], [1, 1], [0, -1], [0, 1], [-1, 0], [1, 0]];
    const tanHalf = Math.tan((frame.fov * Math.PI) / 360);
    const direction = new THREE.Vector3();
    let reach = 1;
    for (const camera of poses) {
      for (const [nx, ny] of edges) {
        direction.set(nx, ny, 0.5).unproject(camera).sub(camera.position).transformDirection(this.baseCamera.matrixWorldInverse);
        reach = Math.max(reach, Math.abs(direction.x / direction.z) / (tanHalf * aspect), Math.abs(direction.y / direction.z) / tanHalf);
      }
    }
    // Leave room for the blur and the drops' lens beyond the furthest turn.
    const margin = Math.max(CITY_MARGIN, reach * 1.08);
    this.city.setView(this.baseCamera.quaternion, frame.fov, aspect, margin);
    // The city follows the full-resolution frame, so dynamic resolution never
    // has to redraw and re-blur it.
    const fullHeight = this.cssHeight * this.basePixelRatio();
    const cityWidth = this.cssWidth * this.basePixelRatio() * this.profile.cityScale * margin;
    const cityHeight = fullHeight * this.profile.cityScale * margin;
    const focalPx = fullHeight / (2 * tanHalf);
    this.city.setSize(cityWidth, cityHeight, COC_ANGLE * focalPx * this.profile.cityScale);

    // Rain covers exactly the part of the pane any pose can see.
    let x0 = Infinity; let x1 = -Infinity; let y0 = Infinity; let y1 = -Infinity;
    for (const camera of poses) {
      const origin = camera.position;
      for (const [nx, ny] of edges) {
        const dir = direction.set(nx * 1.04, ny * 1.04, 0.5).unproject(camera).sub(origin).normalize();
        const t = (GLASS_Z - origin.z) / dir.z;
        x0 = Math.min(x0, origin.x + dir.x * t);
        x1 = Math.max(x1, origin.x + dir.x * t);
        y0 = Math.min(y0, origin.y + dir.y * t);
        y1 = Math.max(y1, origin.y + dir.y * t);
      }
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
    const grimeRegion = [x0, y0, x1, y1].map((value) => value.toFixed(4)).join();
    if (grimeRegion !== this.grimeRegion || !this.grime) {
      this.grime?.dispose();
      this.grime = bakeGrime(this.renderer, { x0, y0, x1, y1 });
      this.grimeRegion = grimeRegion;
    }
    uniforms.tGrime.value = this.grime.texture;
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

  /**
   * Place a camera at the resting shot turned by `yaw` (right) and `pitch`
   * (up) around a point near the lamp and mug, with optional hand-held drift.
   */
  private pose(camera: THREE.PerspectiveCamera, yaw: number, pitch: number, drift?: THREE.Vector3, sway?: THREE.Vector3) {
    this.rest.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);
    this.forward.copy(this.lookTarget).sub(this.rest).normalize();
    this.pivot.copy(this.rest).addScaledVector(this.forward, LOOK_PIVOT);
    this.right.crossVectors(this.forward, camera.up).normalize();
    // Turning right swings the camera left around the pivot; turning up swings it down.
    this.orbit.setFromAxisAngle(camera.up, -yaw).multiply(this.orbitPitch.setFromAxisAngle(this.right, pitch));
    camera.position.copy(this.rest).sub(this.pivot).applyQuaternion(this.orbit).add(this.pivot);
    this.aim.copy(this.lookTarget).sub(this.pivot).applyQuaternion(this.orbit).add(this.pivot);
    if (drift) camera.position.add(drift);
    if (sway) this.aim.add(sway);
    camera.lookAt(this.aim);
    camera.updateMatrixWorld();
  }

  private updateCamera(dt: number) {
    const t = this.time;
    this.look.update(dt);
    // A resting camera: slow, sub-millimetre breathing and drift.
    this.drift.set(
      Math.sin(t * 0.21) * 0.0016 + Math.sin(t * 0.53 + 1.3) * 0.0006,
      Math.sin(t * 0.17 + 0.6) * 0.0012 + Math.sin(t * 0.41) * 0.0005,
      Math.sin(t * 0.13 + 2.1) * 0.001,
    );
    this.sway.set(Math.sin(t * 0.11 + 0.4) * 0.0035, Math.sin(t * 0.09 + 2.2) * 0.0025, 0);
    this.pose(this.camera, this.look.yaw, this.look.pitch, this.drift, this.sway);
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

    this.updateCamera(dt);
    this.updateFlash();
    // At 60 fps the far city and the room's faint reflection in the pane
    // change too little between frames to redraw both every time, so they
    // take turns; each frame then carries about the same load.
    this.frameIndex++;
    const everything = this.refreshAll || dt === 0 || this.software || this.dynamic.rate !== 60;
    this.refreshAll = false;
    const drawCity = everything || this.frameIndex % 2 === 0;
    const drawReflection = everything || this.frameIndex % 2 === 1;
    if (drawCity) this.city.render(this.time, this.flashLevel);
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
    if (this.reflectionTarget && drawReflection) {
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
    this.grime?.dispose();
    this.glass.geometry.dispose();
    this.glassMaterial.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}
