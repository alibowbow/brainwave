/** Completion-aware backpressure for every forest main-frame submission.
 * A RAF is only a later event-loop task, never evidence that a GPU fence passed.
 */
export type ForestGPUFault = 'context-lost' | 'wait-failed' | 'null-fence' | 'unexpected-wait-status' | 'submission-error';

export interface ForestFrameState {
  /** Admitted GL batches, conservatively including partially failed attempts.
   * Only completed is GPU-completion evidence; Engine.frames counts returned renders.
   */
  submitted: number;
  initializationSubmitted: number;
  completed: number;
  pending: number;
  abandoned: number;
  queued: boolean;
  captures: number;
  running: boolean;
  disposed: boolean;
  fault: ForestGPUFault | null;
}

type FenceContext = Pick<WebGL2RenderingContext,
  'SYNC_GPU_COMMANDS_COMPLETE' | 'ALREADY_SIGNALED' | 'CONDITION_SATISFIED' |
  'TIMEOUT_EXPIRED' | 'WAIT_FAILED' | 'fenceSync' | 'clientWaitSync' | 'deleteSync' | 'flush' | 'isContextLost'>;

interface SchedulerOptions<Capture> {
  gl: FenceContext;
  draw(dt: number): void;
  readback(): Capture;
  onState(state: ForestFrameState): void;
  onFault(fault: ForestGPUFault): void;
  canDraw?(): boolean;
  requestFrame(callback: FrameRequestCallback): number;
  cancelFrame(handle: number): void;
  now(): number;
}

export class ForestFrameScheduler<Capture> {
  private fences: WebGLSync[] = [];
  private request: number | null = null;
  private redraw: number | null = null;
  private captures: { resolve(value: Capture): void; reject(error: Error): void }[] = [];
  private submitted = 0;
  private initializationSubmitted = 0;
  private completed = 0;
  private abandoned = 0;
  private unfenced = 0;
  private running = false;
  private disposed = false;
  private fault: ForestGPUFault | null = null;
  private last = 0;

  constructor(private readonly options: SchedulerOptions<Capture>) { this.publish(); }

  get state(): ForestFrameState {
    return { submitted: this.submitted, initializationSubmitted: this.initializationSubmitted, completed: this.completed, pending: this.fences.length,
      abandoned: this.abandoned, queued: this.redraw !== null || this.captures.length > 0,
      captures: this.captures.length, running: this.running, disposed: this.disposed, fault: this.fault };
  }

  /** One initial environment/compilation batch, before any main-frame request.
   * It shares the same two slots; this is not a general unbounded render path.
   */
  trackInitialization() {
    if (this.disposed || this.fault || this.submitted || this.request !== null) return;
    this.submitted++; this.initializationSubmitted++; this.unfenced++;
    try {
      const { gl } = this.options;
      if (gl.isContextLost()) { this.fail('context-lost'); return; }
      const fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      if (!fence) { this.fail(gl.isContextLost() ? 'context-lost' : 'null-fence'); return; }
      this.fences.push(fence); this.unfenced--; gl.flush();
      if (gl.isContextLost()) { this.fail('context-lost'); return; }
      this.publish(); this.schedule();
    } catch { this.fail(this.options.gl.isContextLost() ? 'context-lost' : 'submission-error'); }
  }

  /** Keep the newest request, without adding a submission for each observer/holder callback. */
  renderFrame(dt = 0) {
    if (this.disposed || this.fault) return;
    this.redraw = Math.max(0, Number.isFinite(dt) ? dt : 0);
    this.publish(); this.schedule();
  }

  start() {
    if (this.running || this.disposed || this.fault) return;
    this.running = true; this.last = this.options.now();
    this.publish(); this.schedule();
  }

  stop() {
    this.running = false;
    this.cancel();
    // Pausing cancels animation. A pending static frame/readback and fence
    // retirement still need later tasks, including on a paused renderer.
    this.publish(); this.schedule();
  }

  capture(): Promise<Capture> {
    if (this.disposed || this.fault) return Promise.reject(this.error());
    const result = new Promise<Capture>((resolve, reject) => this.captures.push({ resolve, reject }));
    this.publish(); this.schedule();
    return result;
  }

  contextLost() { this.fail('context-lost'); }

  dispose() {
    if (this.disposed) return;
    this.disposed = true; this.running = false; this.redraw = null;
    this.cancel(); this.discardFences(); this.rejectCaptures(); this.publish();
  }

  private error() { return new Error(`Forest GPU scheduler ${this.fault ?? (this.disposed ? 'disposed' : 'unavailable')}.`); }
  private publish() { this.options.onState(this.state); }
  private cancel() {
    if (this.request !== null) this.options.cancelFrame(this.request);
    this.request = null;
  }
  private schedule() {
    if (this.request !== null || this.disposed || this.fault) return;
    if (this.fences.length || ((this.options.canDraw?.() ?? true) && (this.running || this.redraw !== null || this.captures.length)))
      this.request = this.options.requestFrame(this.tick);
  }

  private discardFences() {
    const fences = this.fences; this.fences = [];
    this.abandoned += fences.length + this.unfenced; this.unfenced = 0;
    // Context loss invalidates sync objects. Clear our references, without
    // presenting their invalidation/deletion as completed GPU work.
    if (!this.options.gl.isContextLost()) for (const fence of fences) this.options.gl.deleteSync(fence);
  }
  private rejectCaptures() {
    const captures = this.captures; this.captures = [];
    for (const capture of captures) capture.reject(this.error());
  }
  private fail(fault: ForestGPUFault) {
    if (this.disposed || this.fault) return;
    this.fault = fault; this.running = false; this.redraw = null;
    this.cancel(); this.discardFences(); this.rejectCaptures(); this.publish();
    this.options.onFault(fault);
  }

  private retire() {
    const { gl } = this.options;
    if (gl.isContextLost()) { this.fail('context-lost'); return; }
    while (this.fences.length) {
      const fence = this.fences[0];
      const status = gl.clientWaitSync(fence, 0, 0);
      if (gl.isContextLost()) { this.fail('context-lost'); return; }
      if (status === gl.TIMEOUT_EXPIRED) break;
      if (status !== gl.ALREADY_SIGNALED && status !== gl.CONDITION_SATISFIED) {
        this.fail(status === gl.WAIT_FAILED ? 'wait-failed' : 'unexpected-wait-status'); return;
      }
      this.fences.shift(); gl.deleteSync(fence); this.completed++;
    }
  }

  private tick = (now: number) => {
    this.request = null;
    if (this.disposed || this.fault) return;
    try {
      this.retire();
      if (this.disposed || this.fault) return;
      if (this.fences.length < 2 && (this.options.canDraw?.() ?? true) && (this.running || this.redraw !== null || this.captures.length)) {
        // Captures are static even if requested while animation is active.
        const dt = this.captures.length ? 0 : this.redraw ?? Math.max(0, (now - this.last) / 1000);
        this.redraw = null; this.last = now;
        // Reserve this batch before draw: renderer/audit exceptions may occur
        // after commands were issued. An uncertain attempt must be abandoned,
        // never disappear from accounting or free a slot for another draw.
        this.submitted++; this.unfenced++; this.options.draw(dt);
        const { gl } = this.options;
        if (this.disposed || this.fault || gl.isContextLost()) {
          if (this.disposed || this.fault) { this.abandoned += this.unfenced; this.unfenced = 0; }
          else this.fail('context-lost');
          this.publish(); return;
        }
        const fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        if (!fence) { this.fail(gl.isContextLost() ? 'context-lost' : 'null-fence'); return; }
        this.fences.push(fence); this.unfenced--; gl.flush();
        if (gl.isContextLost()) { this.fail('context-lost'); return; }
        if (this.captures.length) {
          // Read the frame in the draw's call stack: preserveDrawingBuffer is
          // false. Never retire this new fence until a later event-loop task.
          const captures = this.captures; this.captures = [];
          try {
            const result = this.options.readback();
            if (gl.isContextLost()) {
              this.fail('context-lost');
              for (const capture of captures) capture.reject(this.error());
            } else for (const capture of captures) capture.resolve(result);
          } catch (error) {
            for (const capture of captures) capture.reject(error instanceof Error ? error : new Error(String(error)));
          }
        }
      }
      this.publish(); this.schedule();
    } catch {
      this.fail(this.options.gl.isContextLost() ? 'context-lost' : 'submission-error');
    }
  };
}
