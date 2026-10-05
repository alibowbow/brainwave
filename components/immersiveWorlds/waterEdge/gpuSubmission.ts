/** One complete render batch may be in flight. No fixed frame rate or quality reduction. */
export class GpuSubmission {
  private sync: WebGLSync | null = null;
  private disposed = false;
  failed = false;
  submittedCount = 0;
  completedCount = 0;
  reason: string | null = null;

  constructor(private gl: WebGL2RenderingContext, private onFault: (reason: string) => void) {}
  get pending() { return this.sync !== null; }

  private fault(reason: string): false {
    if (this.failed || this.disposed) return false;
    this.failed = true; this.reason = reason;
    if (this.sync) { this.gl.deleteSync(this.sync); this.sync = null; }
    // Set the fault first: the owner's failure handler may synchronously dispose.
    this.onFault(reason);
    return false;
  }

  ready(): boolean {
    if (this.failed || this.disposed) return false;
    if (this.gl.isContextLost()) return this.fault('WebGL context lost before GPU completion');
    if (!this.sync) return true;
    let status: number;
    try { status = this.gl.clientWaitSync(this.sync, 0, 0); }
    catch { return this.fault('GPU completion query threw'); }
    if (status === this.gl.TIMEOUT_EXPIRED) return false;
    if (status !== this.gl.ALREADY_SIGNALED && status !== this.gl.CONDITION_SATISFIED) {
      return this.fault(status === this.gl.WAIT_FAILED ? 'GPU completion WAIT_FAILED' : 'Unknown GPU completion status');
    }
    this.gl.deleteSync(this.sync); this.sync = null;
    this.completedCount++;
    return true;
  }

  /** Called only after all subpasses of one accepted render have returned. */
  submitted(): boolean {
    if (this.failed || this.disposed) return false;
    if (this.sync) return this.fault('Submission attempted with a GPU batch still pending');
    this.submittedCount++;
    if (this.gl.isContextLost()) return this.fault('WebGL context lost during submission');
    try {
      this.sync = this.gl.fenceSync(this.gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      if (!this.sync) return this.fault('GPU fenceSync returned null');
      this.gl.flush();
    } catch { return this.fault('GPU completion fence could not be submitted'); }
    return true;
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    if (this.sync) { this.gl.deleteSync(this.sync); this.sync = null; }
    // Deleting a sync is bookkeeping, never proof that queued GPU work completed.
  }
}
