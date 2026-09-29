import { DynamicResolution, isSoftwareRenderer } from '../../rainyWindow/engine/quality';
import type { LiveSceneEngine } from '../../liveScene/liveSceneHost';
import { createPass, createTarget, createTexture, finishPass, formats, type Pass, type Target, type Texture } from './gl';
import { paintSize, seaLayout, strokeCell, type SeaLayout } from './layout';
import { RepaintCycle } from './repaint';
import { COMPOSITE_FRAGMENT, FLOW_FRAGMENT, LIGHT_FRAGMENT, SCENE_FRAGMENT, STROKE_FRAGMENT } from './shaders';

export interface OilSeaOptions {
  canvas: HTMLCanvasElement;
  onContextLost?: () => void;
}

/** The colour source is smooth, so it is drawn at a fraction of the canvas. */
const SCENE_SCALE = 0.5;
const FLOW_SCALE = 0.25;
/** Paper, then the pencil drawing spreading over it, then the paint going on. */
const INTRO_SECONDS = 2.8 + 3.8 * 1.06;

interface StrokeSet {
  offset: Texture;
  light: Texture;
  mask: Texture;
  strokes: Target;
  lighting: Target;
  seed: number;
}

/*
 * An animated sea painted in oils: a small procedural seascape supplies the
 * colour, two alternating stroke sets lay it down as brushwork. The painting
 * first draws itself (a pencil sketch spreading over the paper, then strokes of
 * paint), then lives: the surf rolls in and, every so often, a fresh layer of
 * strokes is painted over the last.
 */
export class OilSeaEngine implements LiveSceneEngine {
  private readonly gl: WebGL2RenderingContext;
  private readonly software: boolean;
  private readonly pacer = new DynamicResolution(1, 1, 1, 1);
  private readonly repaint = new RepaintCycle(6, 9, 6, 4);
  private passes: Record<'scene' | 'flow' | 'strokes' | 'light' | 'composite', Pass> | null = null;
  private readonly vao: WebGLVertexArrayObject | null;
  private layout: SeaLayout = seaLayout(16 / 9);
  private cssWidth = 1;
  private cssHeight = 1;
  private devicePixelRatio = 1;
  private width = 0;
  private height = 0;
  private cell = 12;
  private scene: { texture: Texture; target: Target } | null = null;
  private flow: { texture: Texture; target: Target } | null = null;
  private shape: Texture | null = null;
  private order: Texture | null = null;
  private sets: [StrokeSet, StrokeSet] | null = null;
  private seeds = 0;
  private time = 0;
  /** Seconds into the drawing-in; Infinity once the painting is finished. */
  private intro = 0;
  /** When a still of the finished painting was first shown, before the scene ever ran. */
  private stillShownAt = 0;
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

  constructor(private readonly options: OilSeaOptions) {
    const gl = options.canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'default',
    });
    if (!gl) throw new Error('WebGL 2 is not available');
    this.gl = gl;
    const debug = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debug ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)) : String(gl.getParameter(gl.RENDERER));
    this.software = isSoftwareRenderer(renderer);
    this.vao = gl.createVertexArray();
    options.canvas.addEventListener('webglcontextlost', this.handleContextLost, false);
  }

  private handleContextLost = (event: Event) => {
    event.preventDefault();
    this.stop();
    this.options.onContextLost?.();
  };

  async init() {
    const gl = this.gl;
    const passes = {
      scene: createPass(gl, SCENE_FRAGMENT),
      flow: createPass(gl, FLOW_FRAGMENT),
      strokes: createPass(gl, STROKE_FRAGMENT),
      light: createPass(gl, LIGHT_FRAGMENT),
      composite: createPass(gl, COMPOSITE_FRAGMENT),
    };
    // Let the driver compile in parallel where it can before anything waits on it.
    const parallel = gl.getExtension('KHR_parallel_shader_compile');
    if (parallel) {
      const pending = () => Object.values(passes).some((pass) => !gl.getProgramParameter(pass.program, parallel.COMPLETION_STATUS_KHR));
      for (let i = 0; i < 400 && pending(); i++) await new Promise((resolve) => setTimeout(resolve, 16));
    }
    if (this.disposed) return;
    for (const pass of Object.values(passes)) finishPass(gl, pass);
    this.passes = passes;
    this.resizeTargets(true);
    this.ready = true;
  }

  setSize(width: number, height: number, devicePixelRatio: number) {
    this.cssWidth = Math.max(1, width);
    this.cssHeight = Math.max(1, height);
    this.devicePixelRatio = devicePixelRatio || 1;
    if (this.passes) this.resizeTargets(false);
  }

  /** How strongly the surf breaks, following the wave sound's level. */
  setWaveEnergy(level: number) {
    this.energy = Math.max(0, Math.min(1.5, level));
  }

  private resizeTargets(force: boolean) {
    const gl = this.gl;
    const size = this.software
      ? paintSize(this.cssWidth, this.cssHeight, 1, 1)
      : paintSize(this.cssWidth, this.cssHeight, this.devicePixelRatio, 1.25);
    const budget = this.software ? Math.min(1, Math.sqrt(420_000 / (size.width * size.height))) : 1;
    const width = Math.max(2, Math.round(size.width * budget));
    const height = Math.max(2, Math.round(size.height * budget));
    if (!force && width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.options.canvas.width = width;
    this.options.canvas.height = height;
    this.layout = seaLayout(width / height);
    this.cell = strokeCell(width, height);
    this.releaseTargets();

    const f = formats(gl);
    const sceneTexture = createTexture(gl, Math.max(64, Math.round(width * SCENE_SCALE)), Math.max(64, Math.round(height * SCENE_SCALE)), f.linear);
    this.scene = { texture: sceneTexture, target: createTarget(gl, [sceneTexture]) };
    const flowTexture = createTexture(gl, Math.max(32, Math.round(width * FLOW_SCALE)), Math.max(32, Math.round(height * FLOW_SCALE)), f.linear);
    this.flow = { texture: flowTexture, target: createTarget(gl, [flowTexture]) };
    this.shape = createTexture(gl, width, height, f.nearest);
    this.order = createTexture(gl, width, height, f.nearest);
    const makeSet = (): StrokeSet => {
      const offset = createTexture(gl, width, height, f.nearest);
      const light = createTexture(gl, width, height, f.nearest);
      const mask = createTexture(gl, width, height, f.nearest);
      return {
        offset,
        light,
        mask,
        strokes: createTarget(gl, [offset, this.shape!, this.order!]),
        lighting: createTarget(gl, [light, mask]),
        seed: 0,
      };
    };
    this.sets = [makeSet(), makeSet()];

    this.drawFlow();
    for (const index of [0, 1] as const) {
      this.buildStrokes(index, 0, 1, true);
      this.lightStrokes(index);
    }
  }

  private releaseTargets() {
    const gl = this.gl;
    const textures: (Texture | null | undefined)[] = [this.scene?.texture, this.flow?.texture, this.shape, this.order];
    const targets: (Target | null | undefined)[] = [this.scene?.target, this.flow?.target];
    for (const set of this.sets ?? []) {
      textures.push(set.offset, set.light, set.mask);
      targets.push(set.strokes, set.lighting);
    }
    for (const texture of textures) if (texture) gl.deleteTexture(texture.texture);
    for (const target of targets) if (target) gl.deleteFramebuffer(target.framebuffer);
    this.scene = null;
    this.flow = null;
    this.shape = null;
    this.order = null;
    this.sets = null;
  }

  private use(pass: Pass, target: Target | null, width: number, height: number) {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.framebuffer : null);
    gl.viewport(0, 0, width, height);
    gl.useProgram(pass.program);
    gl.bindVertexArray(this.vao);
    const u = pass.uniforms;
    const l = this.layout;
    const set1 = (name: string, value: number) => { const at = u.get(name); if (at) gl.uniform1f(at, value); };
    const set2 = (name: string, x: number, y: number) => { const at = u.get(name); if (at) gl.uniform2f(at, x, y); };
    set2('uCrop', l.cropLeft, l.cropWidth);
    set2('uSun', l.sunX, l.sunY);
    const tree = u.get('uTree');
    if (tree) gl.uniform3f(tree, l.treeX, l.treeY, l.treeScale);
    set1('uHorizon', l.horizon);
    set1('uTime', this.time);
    set1('uEnergy', this.energy);
    set1('uCell', this.cell);
    set2('uResolution', this.width, this.height);
    return { set1, set2 };
  }

  private bind(pass: Pass, name: string, unit: number, texture: Texture) {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture.texture);
    const at = pass.uniforms.get(name);
    if (at) gl.uniform1i(at, unit);
  }

  private draw() {
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  }

  private drawFlow() {
    if (!this.passes || !this.flow) return;
    this.use(this.passes.flow, this.flow.target, this.flow.texture.width, this.flow.texture.height);
    this.draw();
  }

  /** Lay out strokes for one horizontal band of a set (a new seed when the set starts over). */
  private buildStrokes(index: 0 | 1, band: number, bands: number, fresh: boolean) {
    const gl = this.gl;
    if (!this.passes || !this.sets || !this.flow) return;
    const set = this.sets[index];
    if (fresh || band === 0) set.seed = ++this.seeds * 1.618 + index * 0.37;
    const pass = this.passes.strokes;
    const { set1 } = this.use(pass, set.strokes, this.width, this.height);
    set1('uSeed', set.seed);
    this.bind(pass, 'tFlow', 0, this.flow.texture);
    const y0 = Math.floor((this.height * band) / bands);
    const y1 = Math.floor((this.height * (band + 1)) / bands);
    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(0, y0, this.width, y1 - y0);
    this.draw();
    gl.disable(gl.SCISSOR_TEST);
  }

  private lightStrokes(index: 0 | 1) {
    if (!this.passes || !this.sets || !this.shape || !this.order) return;
    const pass = this.passes.light;
    this.use(pass, this.sets[index].lighting, this.width, this.height);
    this.bind(pass, 'tShape', 0, this.shape);
    this.bind(pass, 'tOrder', 1, this.order);
    this.draw();
  }

  start() {
    if (this.running || this.disposed) return;
    // A painting that has already been on screen is not drawn again from
    // scratch when it starts moving; one that starts right away is.
    if (this.intro === 0 && this.stillShownAt && performance.now() - this.stillShownAt > 800) this.intro = Infinity;
    this.running = true;
    this.lastFrame = 0;
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
    if (this.lastFrame && now - this.lastFrame < this.frameInterval) return;
    const elapsed = this.lastFrame ? now - this.lastFrame : 1000 / 60;
    this.lastFrame = now;
    if (!this.software) this.pacer.update(elapsed);
    this.renderFrame(Math.min(0.1, elapsed / 1000));
  };

  /** Advance by `dt` seconds and draw one frame (dt 0 redraws as is). */
  renderFrame(dt: number) {
    if (!this.ready || !this.passes || !this.sets || !this.scene) return;
    const gl = this.gl;
    this.time += dt;
    // Until it first runs, a still frame (paused, reduced motion) shows the
    // finished painting; the drawing-in plays when the scene starts moving.
    const notStarted = !this.running && dt === 0 && this.intro === 0;
    if (notStarted && !this.stillShownAt) this.stillShownAt = performance.now();
    if (!Number.isFinite(this.intro)) {
      // Finished: keep the painting alive.
      const step = this.repaint.update(dt);
      if (step?.kind === 'strokes') this.buildStrokes(step.set, step.band, step.bands, false);
      else if (step?.kind === 'light') this.lightStrokes(step.set);
    } else if (dt > 0) {
      this.intro += dt;
    }

    this.use(this.passes.scene, this.scene.target, this.scene.texture.width, this.scene.texture.height);
    this.draw();

    const view = this.repaint.view;
    const pass = this.passes.composite;
    const { set1, set2 } = this.use(pass, null, this.width, this.height);
    const shown = this.sets[view.shown];
    const over = this.sets[view.painting ?? (view.shown === 0 ? 1 : 0)];
    this.bind(pass, 'tScene', 0, this.scene.texture);
    this.bind(pass, 'tOffsetA', 1, shown.offset);
    this.bind(pass, 'tLightA', 2, shown.light);
    this.bind(pass, 'tMaskA', 3, shown.mask);
    this.bind(pass, 'tOffsetB', 4, over.offset);
    this.bind(pass, 'tLightB', 5, over.light);
    this.bind(pass, 'tMaskB', 6, over.mask);
    const painting = pass.uniforms.get('uPainting');
    if (painting) gl.uniform1i(painting, view.painting === null ? 0 : 1);
    set1('uProgress', view.progress);
    const intro = notStarted || !Number.isFinite(this.intro) ? INTRO_SECONDS : this.intro;
    set1('uSketch', Math.min(1, Math.max(0, (intro - 0.5) / 2.8)));
    set1('uPaintIn', Math.min(1.06, Math.max(0, (intro - 2.8) / 3.8)));
    if (!notStarted && intro >= INTRO_SECONDS) this.intro = Infinity;
    set2('uSceneSize', this.scene.texture.width, this.scene.texture.height);
    const debug = pass.uniforms.get('uDebug');
    if (debug) gl.uniform1i(debug, this.debugView);
    this.draw();
  }

  get isReady() { return this.ready; }

  /** Development aid: 1 shows the colour source without brushwork. */
  debugView = 0;

  dispose() {
    this.disposed = true;
    this.stop();
    this.options.canvas.removeEventListener('webglcontextlost', this.handleContextLost, false);
    const gl = this.gl;
    this.releaseTargets();
    for (const pass of Object.values(this.passes ?? {})) gl.deleteProgram(pass.program);
    this.passes = null;
    if (this.vao) gl.deleteVertexArray(this.vao);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}
