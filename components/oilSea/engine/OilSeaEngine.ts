import { DynamicResolution, isSoftwareRenderer } from '../../rainyWindow/engine/quality';
import type { LiveSceneEngine } from '../../liveScene/liveSceneHost';
import { createPass, createTarget, createTexture, finishPass, formats, type Pass, type Target, type Texture } from './gl';
import { paintSize, seaLayout, type SeaLayout } from './layout';
import { FINAL_FRAGMENT, LAYER_FRAGMENT, PAPER_FRAGMENT, STROKE_FRAGMENT, STROKE_SEGMENTS, STROKE_VERTEX } from './paintShaders';
import { GUIDE_FRAGMENT, SEA_FRAGMENT, STILL_FRAGMENT } from './sceneShaders';
import { FLOATS_PER_STROKE, planStrokes, type Guide, type StrokeGroup } from './strokes';

export interface OilSeaOptions {
  canvas: HTMLCanvasElement;
  onContextLost?: () => void;
}

/** The colour the brush picks up is smooth, so it is drawn at a fraction of the canvas. */
const SCENE_SCALE = 0.5;
/** One guide texel per this many canvas pixels. */
const GUIDE_STEP = 6;
/** Paper, then the pencil drawing spreading over it, then the paint going on. */
const SKETCH_SECONDS = 2.8;
const PAINT_SECONDS = 4.2;
const INTRO_SECONDS = SKETCH_SECONDS + PAINT_SECONDS * 1.05;

type PassName = 'still' | 'sea' | 'guide' | 'stroke' | 'layer' | 'paper' | 'final';
type GroupName = 'sea' | 'still' | 'tree';
interface Surface {
  texture: Texture;
  target: Target;
}
interface DrawGroup {
  vao: WebGLVertexArrayObject;
  count: number;
}

/*
 * An animated sea painted in oils. A small procedural seascape supplies the
 * colour; tens of thousands of brush strokes, planned once per canvas size,
 * lay it down: broad strokes first, then finer ones where there is detail.
 * The still parts are painted once into a layer; every frame the sea's
 * strokes are painted again with the colour of the moving water, riding the
 * swell towards the shore, and the pine's strokes sway. The painting first
 * draws itself: a pencil sketch spreading over the paper, then the paint.
 */
export class OilSeaEngine implements LiveSceneEngine {
  private readonly gl: WebGL2RenderingContext;
  private readonly software: boolean;
  private readonly pacer = new DynamicResolution(1, 1, 1, 1);
  private passes: Record<PassName, Pass> | null = null;
  private readonly vao: WebGLVertexArrayObject | null;
  private layout: SeaLayout = seaLayout(16 / 9);
  private cssWidth = 1;
  private cssHeight = 1;
  private devicePixelRatio = 1;
  private width = 0;
  private height = 0;
  private still: Surface | null = null;
  /** The ground behind the pine, opaque but for the sea: the still layer's base. */
  private stillBase: Texture | null = null;
  private sea: Surface | null = null;
  private guide: Surface | null = null;
  private layer: Surface | null = null;
  private paint: Surface | null = null;
  private strokeBuffer: WebGLBuffer | null = null;
  private groups: Record<GroupName, DrawGroup> | null = null;
  private layerPainted = false;
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
    const passes: Record<PassName, Pass> = {
      still: createPass(gl, STILL_FRAGMENT),
      sea: createPass(gl, SEA_FRAGMENT),
      guide: createPass(gl, GUIDE_FRAGMENT),
      stroke: createPass(gl, STROKE_FRAGMENT, STROKE_VERTEX),
      layer: createPass(gl, LAYER_FRAGMENT),
      paper: createPass(gl, PAPER_FRAGMENT),
      final: createPass(gl, FINAL_FRAGMENT),
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
    this.releaseTargets();

    const f = formats(gl);
    const surface = (w: number, h: number, linear: boolean): Surface => {
      const texture = createTexture(gl, Math.max(2, w), Math.max(2, h), linear ? f.linear : f.nearest);
      return { texture, target: createTarget(gl, [texture]) };
    };
    const sceneWidth = Math.round(width * SCENE_SCALE);
    const sceneHeight = Math.round(height * SCENE_SCALE);
    const stillColour = createTexture(gl, sceneWidth, sceneHeight, f.linear);
    this.stillBase = createTexture(gl, sceneWidth, sceneHeight, f.linear);
    this.still = { texture: stillColour, target: createTarget(gl, [stillColour, this.stillBase]) };
    this.sea = surface(sceneWidth, sceneHeight, true);
    this.guide = surface(Math.ceil(width / GUIDE_STEP), Math.ceil(height / GUIDE_STEP), false);
    this.layer = surface(width, height, false);
    this.paint = surface(width, height, false);

    this.use(this.passes!.still, this.still, this.time);
    this.draw();
    this.layOutStrokes();
    this.layerPainted = false;
  }

  /** Read the guide back and lay out the strokes for this canvas. */
  private layOutStrokes() {
    const gl = this.gl;
    const guideSurface = this.guide!;
    this.use(this.passes!.guide, guideSurface, this.time);
    this.draw();
    const { width, height } = guideSurface.texture;
    const data = new Uint8Array(width * height * 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, guideSurface.target.framebuffer);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    const guide: Guide = { width, height, data };
    const plan = planStrokes(guide, this.width, this.height, ++this.seeds * 7919);

    const buffer = gl.createBuffer();
    if (!buffer) throw new Error('Could not create the stroke buffer');
    this.strokeBuffer = buffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, plan.data, gl.STATIC_DRAW);
    const stride = FLOATS_PER_STROKE * 4;
    const group = ({ first, count }: StrokeGroup): DrawGroup => {
      const vao = gl.createVertexArray();
      if (!vao) throw new Error('Could not create a vertex array');
      gl.bindVertexArray(vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      for (let location = 0; location < 3; location++) {
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, 4, gl.FLOAT, false, stride, first * stride + location * 16);
        gl.vertexAttribDivisor(location, 1);
      }
      gl.bindVertexArray(null);
      return { vao, count };
    };
    this.groups = { sea: group(plan.sea), still: group(plan.still), tree: group(plan.tree) };
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  private releaseTargets() {
    const gl = this.gl;
    for (const surface of [this.still, this.sea, this.guide, this.layer, this.paint]) {
      if (!surface) continue;
      gl.deleteTexture(surface.texture.texture);
      gl.deleteFramebuffer(surface.target.framebuffer);
    }
    if (this.stillBase) gl.deleteTexture(this.stillBase.texture);
    this.stillBase = null;
    for (const group of Object.values(this.groups ?? {})) gl.deleteVertexArray(group.vao);
    if (this.strokeBuffer) gl.deleteBuffer(this.strokeBuffer);
    this.still = null;
    this.sea = null;
    this.guide = null;
    this.layer = null;
    this.paint = null;
    this.groups = null;
    this.strokeBuffer = null;
  }

  /** Bind a pass drawing into a surface (or the canvas) with the shared uniforms set. */
  private use(pass: Pass, surface: Surface | null, time: number) {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, surface ? surface.target.framebuffer : null);
    gl.viewport(0, 0, surface ? surface.texture.width : this.width, surface ? surface.texture.height : this.height);
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
    set1('uTime', time);
    set1('uEnergy', this.energy);
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

  /** Copy a texture over the surface being painted, either as is or blended (premultiplied). */
  private copy(source: Texture, into: Surface, blend: boolean) {
    const gl = this.gl;
    const pass = this.passes!.layer;
    this.use(pass, into, this.time);
    this.bind(pass, 'tLayer', 0, source);
    if (blend) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    }
    this.draw();
    gl.disable(gl.BLEND);
  }

  private paintStrokes(name: GroupName, colour: Surface, into: Surface, motion: 0 | 1 | 2, reveal: number) {
    const gl = this.gl;
    const group = this.groups?.[name];
    if (!group || !group.count) return;
    const pass = this.passes!.stroke;
    const { set1 } = this.use(pass, into, this.time);
    this.bind(pass, 'tColor', 0, colour.texture);
    set1('uReveal', reveal);
    const at = pass.uniforms.get('uMotion');
    if (at) gl.uniform1i(at, motion);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindVertexArray(group.vao);
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 2 * (STROKE_SEGMENTS + 1), group.count);
    gl.bindVertexArray(this.vao);
    gl.disable(gl.BLEND);
  }

  /** The still strokes, painted once into their own layer. */
  private paintLayer() {
    const gl = this.gl;
    const layer = this.layer!;
    this.copy(this.stillBase!, layer, false);
    this.paintStrokes('still', this.still!, layer, 0, 2);
    this.layerPainted = true;
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
    if (!this.ready || !this.passes || !this.still || !this.sea || !this.paint) return;
    const gl = this.gl;
    this.time += dt;
    // Until it first runs, a still frame (paused, reduced motion) shows the
    // finished painting; the drawing-in plays when the scene starts moving.
    const notStarted = !this.running && dt === 0 && this.intro === 0;
    if (notStarted && !this.stillShownAt) this.stillShownAt = performance.now();
    if (Number.isFinite(this.intro) && dt > 0) this.intro += dt;
    const intro = notStarted || !Number.isFinite(this.intro) ? INTRO_SECONDS : this.intro;
    if (!notStarted && intro >= INTRO_SECONDS) this.intro = Infinity;
    const finished = intro >= INTRO_SECONDS;

    this.use(this.passes.sea, this.sea, this.time);
    this.draw();

    const paint = this.paint;
    if (this.debugView) {
      this.copy(this.debugView === 1 ? this.still.texture : this.sea.texture, paint, false);
    } else if (finished) {
      if (!this.layerPainted) this.paintLayer();
      this.copy(this.sea.texture, paint, false);
      this.paintStrokes('sea', this.sea, paint, 1, 2);
      this.copy(this.layer!.texture, paint, true);
      this.paintStrokes('tree', this.still, paint, 2, 2);
    } else {
      const pass = this.passes.paper;
      const { set1, set2 } = this.use(pass, paint, this.time);
      this.bind(pass, 'tScene', 0, this.still.texture);
      set1('uSketch', Math.min(1, Math.max(0, (intro - 0.5) / (SKETCH_SECONDS - 0.5))));
      set2('uSceneSize', this.still.texture.width, this.still.texture.height);
      this.draw();
      const reveal = Math.max(0, (intro - SKETCH_SECONDS) / PAINT_SECONDS);
      this.paintStrokes('sea', this.sea, paint, 1, reveal);
      this.paintStrokes('still', this.still, paint, 0, reveal);
      this.paintStrokes('tree', this.still, paint, 2, reveal);
    }

    const pass = this.passes.final;
    const { set1 } = this.use(pass, null, this.time);
    this.bind(pass, 'tPaint', 0, paint.texture);
    set1('uGlow', finished ? 1 : Math.min(1, Math.max(0, (intro - SKETCH_SECONDS) / PAINT_SECONDS)));
    set1('uUnit', Math.min(this.width, this.height) / 100);
    this.draw();
    gl.bindVertexArray(null);
  }

  get isReady() { return this.ready; }

  /** Development aid: 1 shows the still colour source, 2 the sea's, without brushwork. */
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
