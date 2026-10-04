export type LiveSceneStatus = 'loading' | 'ready' | 'failed';

export interface LiveSceneHolder {
  /** Element the shared canvas is placed into while this holder is on top. */
  mount: HTMLElement;
  running: boolean;
  onStatus: (status: LiveSceneStatus) => void;
}

/** What a real-time scene engine offers its host. */
export interface LiveSceneEngine {
  init(): Promise<void>;
  setSize(width: number, height: number, devicePixelRatio: number): void;
  renderFrame(dt: number): void;
  start(): void;
  stop(): void;
  dispose(): void;
  /** Turn the view slightly for a drag of `dx`, `dy` shorter sides of the view (scenes that can look around). */
  drag?(dx: number, dy: number): void;
  /** Ease the view back once the drag ends. */
  releaseDrag?(): void;
}

export interface LiveSceneHostOptions<E extends LiveSceneEngine> {
  /** Class given to the shared canvas (styles fade it in once ready). */
  canvasClass: string;
  /** Idle retention after the last view closes. New worlds can use 0 to release GPU resources immediately. */
  disposeDelayMs?: number;
  isSupported(): boolean;
  create(canvas: HTMLCanvasElement, onContextLost: () => void): E;
}

/*
 * One WebGL engine for every view of a scene. The session player and the
 * fullscreen view both show it; the canvas simply moves to whichever view is
 * on top, so entering fullscreen never compiles shaders or holds two GPU
 * contexts. The engine is kept briefly after the last view closes so a quick
 * return is instant.
 */
export class LiveSceneHost<E extends LiveSceneEngine> {
  private holders: LiveSceneHolder[] = [];
  protected engine: E | null = null;
  private canvas: HTMLCanvasElement | null = null;
  protected status: LiveSceneStatus = 'loading';
  private unsupported = false;
  private disposeTimer = 0;
  private observer: ResizeObserver | null = null;
  private observed: HTMLElement | null = null;

  constructor(private readonly options: LiveSceneHostOptions<E>) {}

  acquire(holder: LiveSceneHolder) {
    window.clearTimeout(this.disposeTimer);
    this.holders.push(holder);
    this.ensureEngine();
    this.attachTop();
    holder.onStatus(this.status);
    return () => this.release(holder);
  }

  setRunning(holder: LiveSceneHolder, running: boolean) {
    holder.running = running;
    if (this.top === holder) this.applyRunning();
  }

  protected get top(): LiveSceneHolder | undefined {
    return this.holders[this.holders.length - 1];
  }

  /** Called with each new engine before it initialises, to apply stored settings. */
  protected configure(_engine: E) {}

  /** Turn the view a little while the view on top is dragged. */
  drag(holder: LiveSceneHolder, dx: number, dy: number) {
    if (this.top === holder) this.engine?.drag?.(dx, dy);
  }

  releaseDrag(holder: LiveSceneHolder) {
    if (this.top === holder) this.engine?.releaseDrag?.();
  }

  private release(holder: LiveSceneHolder) {
    this.holders = this.holders.filter((item) => item !== holder);
    if (this.holders.length) {
      this.attachTop();
      return;
    }
    this.engine?.stop();
    this.observe(null);
    this.canvas?.remove();
    const delay = this.options.disposeDelayMs ?? 5000;
    if (delay <= 0) this.teardown();
    else this.disposeTimer = window.setTimeout(() => this.teardown(), delay);
  }

  private setStatus(status: LiveSceneStatus) {
    this.status = status;
    for (const holder of this.holders) holder.onStatus(status);
  }

  private ensureEngine() {
    if (this.engine || this.unsupported) return;
    if (!this.options.isSupported()) {
      this.unsupported = true;
      this.setStatus('failed');
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.className = this.options.canvasClass;
    canvas.setAttribute('aria-hidden', 'true');
    this.canvas = canvas;
    let engine: E;
    try {
      engine = this.options.create(canvas, () => {
        // A disposed engine can report context loss after its replacement
        // has mounted. Only the canvas from this creation owns the failure.
        if (this.canvas === canvas) this.fail();
      });
    } catch {
      if (this.canvas === canvas) this.fail();
      return;
    }
    // Context loss may be reported synchronously inside create(), before
    // the host can store the new engine. Do not revive that failed instance.
    if (this.canvas !== canvas) {
      engine.dispose();
      return;
    }
    this.engine = engine;
    try {
      this.setStatus('loading');
      this.configure(engine);
      this.resize();
      engine.init().then(() => {
        if (this.engine !== engine) return;
        engine.renderFrame(0);
        this.setStatus('ready');
        this.applyRunning();
      }).catch(() => {
        if (this.engine === engine) this.fail();
      });
    } catch {
      if (this.engine === engine) this.fail();
    }
  }

  private attachTop() {
    const top = this.top;
    if (!top || !this.canvas) return;
    // A drag belongs to the view it started in.
    this.engine?.releaseDrag?.();
    if (this.canvas.parentElement !== top.mount) top.mount.appendChild(this.canvas);
    this.observe(top.mount);
    this.resize();
    this.applyRunning();
  }

  private observe(element: HTMLElement | null) {
    if (this.observed === element) return;
    this.observer?.disconnect();
    this.observed = element;
    if (!element) return;
    this.observer ??= new ResizeObserver(() => this.resize());
    this.observer.observe(element);
  }

  private resize() {
    const mount = this.top?.mount;
    if (!mount || !this.engine) return;
    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;
    this.engine.setSize(width, height, window.devicePixelRatio || 1);
    // A resized canvas is cleared; show the current frame even while paused.
    if (this.status === 'ready' && !this.top?.running) this.engine.renderFrame(0);
  }

  private applyRunning() {
    if (!this.engine || this.status !== 'ready') return;
    if (this.top?.running) this.engine.start();
    else this.engine.stop();
  }

  private fail() {
    this.teardown();
    this.setStatus('failed');
  }

  private teardown() {
    window.clearTimeout(this.disposeTimer);
    this.observe(null);
    const engine = this.engine;
    const canvas = this.canvas;
    this.engine = null;
    this.canvas = null;
    canvas?.remove();
    // Clear ownership first: dispose() can itself report context loss.
    engine?.dispose();
    if (this.status !== 'failed') this.status = 'loading';
  }
}
