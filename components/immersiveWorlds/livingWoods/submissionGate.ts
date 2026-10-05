/** A small nonblocking bound on complete scene submissions, including static draws. */
export type SubmissionContext = Pick<WebGL2RenderingContext,
  'ALREADY_SIGNALED' | 'CONDITION_SATISFIED' | 'TIMEOUT_EXPIRED' | 'WAIT_FAILED' |
  'SYNC_GPU_COMMANDS_COMPLETE' | 'clientWaitSync' | 'fenceSync' | 'deleteSync' |
  'flush' | 'isContextLost'>;

export type SubmissionFault = 'context-lost' | 'wait-failed' | 'null-fence' |
  'unexpected-wait-status' | 'draw-failed' | 'context-error';

export class SubmissionGateError extends Error {
  constructor(readonly code: SubmissionFault, message: string, readonly cause?: unknown) {
    super(message);
    this.name = 'SubmissionGateError';
  }
}

/**
 * The engine owns RAF and the latest pending static/resize request. Every draw
 * must enter submit(), and only a later RAF/task may call poll(). A newly
 * created WebGL sync cannot become signaled until control returns to the event
 * loop, so submit deliberately does not poll, wait, or retry.
 *
 * A fault closes the gate. Releasing sync handles on fault/disposal does not
 * cancel submitted GPU work and is never recorded as completed GPU work.
 */
export class SubmissionGate {
  private fences: WebGLSync[] = [];
  private disposed = false;
  private submitting = false;
  private failure: SubmissionGateError | null = null;
  private submittedCount = 0;
  private completedCount = 0;

  constructor(private readonly gl: SubmissionContext, private readonly maxPending = 2) {
    if (!Number.isInteger(maxPending) || maxPending < 1 || maxPending > 2) {
      throw new RangeError('LivingWoods permits one or two pending scene submissions.');
    }
  }

  get pending() { return this.fences.length; }
  get submitted() { return this.submittedCount; }
  get completed() { return this.completedCount; }
  get fault() { return this.failure; }
  get canSubmit() {
    return !this.disposed && !this.failure && !this.submitting && this.fences.length < this.maxPending;
  }

  /** Observe completion once in a later RAF/task; never busy-waits. */
  poll(): void {
    if (this.disposed) return;
    this.assertHealthy();
    if (this.submitting) return;
    while (this.fences.length) {
      let status: number;
      try {
        status = this.gl.clientWaitSync(this.fences[0], 0, 0);
      } catch (cause) {
        this.fail('context-error', 'Could not observe GPU completion.', cause);
      }
      this.assertHealthy();
      if (status === this.gl.TIMEOUT_EXPIRED) return;
      if (status === this.gl.WAIT_FAILED) this.fail('wait-failed', 'GPU completion wait failed.');
      if (status !== this.gl.ALREADY_SIGNALED && status !== this.gl.CONDITION_SATISFIED) {
        this.fail('unexpected-wait-status', `Unexpected GPU completion status: ${status}.`);
      }
      // Remove ownership before deletion so even a deletion error cannot cause
      // a second deletion attempt during the ensuing controlled teardown.
      const sync = this.fences.shift()!;
      try {
        this.gl.deleteSync(sync);
      } catch (cause) {
        this.fail('context-error', 'Could not release a completed GPU sync.', cause);
      }
      this.completedCount++;
    }
  }

  /**
   * Returns false without invoking draw when capacity is unavailable. The
   * caller must keep its latest static request and retry it after a later poll.
   * Animation simulation and renderer.setSize must also live inside draw.
   */
  submit(draw: () => void): boolean {
    if (this.disposed) return false;
    this.assertHealthy();
    if (!this.canSubmit) return false;
    this.submitting = true;
    try {
      try {
        draw();
      } catch (cause) {
        this.fail('draw-failed', 'Scene submission failed.', cause);
      }
      this.submittedCount++;
      // A draw can synchronously trigger the renderer's context-loss teardown.
      // Never issue a new sync after that teardown, or after context loss.
      if (this.disposed) return false;
      this.assertHealthy();
      let sync: WebGLSync | null;
      try {
        sync = this.gl.fenceSync(this.gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      } catch (cause) {
        this.fail('context-error', 'Could not create a GPU completion sync.', cause);
      }
      if (!sync) this.fail('null-fence', 'GPU completion sync was unavailable.');
      this.fences.push(sync);
      try {
        this.gl.flush();
      } catch (cause) {
        this.fail('context-error', 'Could not flush the scene submission.', cause);
      }
      this.assertHealthy();
      return true;
    } finally {
      this.submitting = false;
    }
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.releaseAll();
  }

  private assertHealthy(): void {
    if (this.failure) throw this.failure;
    let lost: boolean;
    try {
      lost = this.gl.isContextLost();
    } catch (cause) {
      this.fail('context-error', 'Could not inspect the renderer context.', cause);
    }
    if (lost) this.fail('context-lost', 'Renderer context was lost.');
  }

  private fail(code: SubmissionFault, message: string, cause?: unknown): never {
    this.failure ??= new SubmissionGateError(code, message, cause);
    this.releaseAll();
    throw this.failure;
  }

  private releaseAll(): void {
    // Clearing references first also makes disposal safe if a context-loss
    // callback reenters teardown during a driver call.
    const owned = this.fences.splice(0);
    for (const sync of owned) {
      try { this.gl.deleteSync(sync); } catch { /* A lost context still releases JS ownership. */ }
    }
  }
}
