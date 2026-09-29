import { RainyWindowEngine } from './engine/RainyWindowEngine';

export type RainyWindowStatus = 'loading' | 'ready' | 'failed';

export interface RainyWindowHolder {
  /** Element the shared canvas is placed into while this holder is on top. */
  mount: HTMLElement;
  running: boolean;
  onStatus: (status: RainyWindowStatus) => void;
}

/*
 * One WebGL engine for every view of the study. The session player and the
 * fullscreen view both show it; the canvas simply moves to whichever view is
 * on top, so entering fullscreen never compiles shaders or holds two GPU
 * contexts. The engine is kept briefly after the last view closes so a quick
 * return is instant.
 */
class RainyWindowHost {
  private holders: RainyWindowHolder[] = [];
  private engine: RainyWindowEngine | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private status: RainyWindowStatus = 'loading';
  private unsupported = false;
  private disposeTimer = 0;
  private rain = 1;
  private observer: ResizeObserver | null = null;
  private observed: HTMLElement | null = null;

  acquire(holder: RainyWindowHolder) {
    window.clearTimeout(this.disposeTimer);
    this.holders.push(holder);
    this.ensureEngine();
    this.attachTop();
    holder.onStatus(this.status);
    return () => this.release(holder);
  }

  setRunning(holder: RainyWindowHolder, running: boolean) {
    holder.running = running;
    if (this.top === holder) this.applyRunning();
  }

  setRainIntensity(intensity: number) {
    this.rain = intensity;
    this.engine?.setRainIntensity(intensity);
  }

  flash(strength: number) {
    if (this.status === 'ready' && this.top?.running) this.engine?.flash(strength);
  }

  /** Turn the view a little while the view on top is dragged. */
  drag(holder: RainyWindowHolder, dx: number, dy: number) {
    if (this.top === holder) this.engine?.drag(dx, dy);
  }

  releaseDrag(holder: RainyWindowHolder) {
    if (this.top === holder) this.engine?.releaseDrag();
  }

  private get top(): RainyWindowHolder | undefined {
    return this.holders[this.holders.length - 1];
  }

  private release(holder: RainyWindowHolder) {
    this.holders = this.holders.filter((item) => item !== holder);
    if (this.holders.length) {
      this.attachTop();
      return;
    }
    this.engine?.stop();
    this.observe(null);
    this.canvas?.remove();
    this.disposeTimer = window.setTimeout(() => this.teardown(), 5000);
  }

  private setStatus(status: RainyWindowStatus) {
    this.status = status;
    for (const holder of this.holders) holder.onStatus(status);
  }

  private ensureEngine() {
    if (this.engine || this.unsupported) return;
    if (!RainyWindowEngine.isSupported()) {
      this.unsupported = true;
      this.setStatus('failed');
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.className = 'rainy-window-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    this.canvas = canvas;
    try {
      this.engine = new RainyWindowEngine({ canvas, onContextLost: () => this.fail() });
    } catch {
      this.fail();
      return;
    }
    const engine = this.engine;
    this.setStatus('loading');
    engine.setRainIntensity(this.rain);
    this.resize();
    engine.init().then(() => {
      if (this.engine !== engine) return;
      engine.renderFrame(0);
      this.setStatus('ready');
      this.applyRunning();
    }).catch(() => this.fail());
  }

  private attachTop() {
    const top = this.top;
    if (!top || !this.canvas) return;
    // A drag belongs to the view it started in.
    this.engine?.releaseDrag();
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
    this.engine?.dispose();
    this.engine = null;
    this.canvas?.remove();
    this.canvas = null;
    if (this.status !== 'failed') this.status = 'loading';
  }
}

export const rainyWindowHost = new RainyWindowHost();
