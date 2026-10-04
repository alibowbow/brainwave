/** Dev-only observation. None of these hooks is imported by a production entry. */
import { WaterEdgeEngine } from '../runtime';

type Entry = { kind: string; atMs: number; [key: string]: unknown };
const timeline: Entry[] = [];
const input: Entry[] = [];
const tracked = new Set<HTMLCanvasElement>();
const ids = new WeakMap<HTMLCanvasElement, number>();
let sequence = 0;
let maxHeartbeatLagMs = 0;
let heartbeatAt = performance.now();
const record = (kind: string, detail: Record<string, unknown> = {}) => {
  timeline.push({ kind, atMs: performance.now(), ...detail });
  if (timeline.length > 4000) timeline.shift();
};
function track(canvas: HTMLCanvasElement) {
  if (!ids.has(canvas)) {
    ids.set(canvas, ++sequence); tracked.add(canvas);
    canvas.addEventListener('webglcontextlost', (event) => record('context-loss-observed', { canvasId: ids.get(canvas), trusted: event.isTrusted }));
  }
  return ids.get(canvas)!;
}
function canvasOf(engine: WaterEdgeEngine) { return (engine as unknown as { canvas: HTMLCanvasElement }).canvas; }
const originalRender = WaterEdgeEngine.prototype.renderFrame;
WaterEdgeEngine.prototype.renderFrame = function (dt: number) {
  const canvas = canvasOf(this), id = track(canvas), start = performance.now();
  const before = Number(canvas.dataset.frames || 0);
  try { return originalRender.call(this, dt); }
  finally {
    record('render-js-return', { canvasId: id, dt, startMs: start, elapsedMs: performance.now() - start,
      submitted: Number(canvas.dataset.frames || 0) > before, frame: Number(canvas.dataset.frames || 0), time: canvas.dataset.time });
  }
};
const originalDispose = WaterEdgeEngine.prototype.dispose;
WaterEdgeEngine.prototype.dispose = function () {
  const canvas = canvasOf(this), id = track(canvas);
  record('dispose-entry', { canvasId: id });
  try { return originalDispose.call(this); }
  finally { record('dispose-exit', { canvasId: id }); }
};
new MutationObserver((mutations) => {
  for (const mutation of mutations) for (const removed of mutation.removedNodes) {
    for (const canvas of tracked) if (removed === canvas || removed.contains(canvas)) {
      record(canvas.isConnected ? 'canvas-holder-move-observed' : 'canvas-detached-observed', { canvasId: ids.get(canvas) });
    }
  }
}).observe(document.documentElement, { childList: true, subtree: true });
window.setInterval(() => {
  const now = performance.now();
  maxHeartbeatLagMs = Math.max(maxHeartbeatLagMs, now - heartbeatAt - 50);
  heartbeatAt = now;
}, 50);
for (const kind of ['pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'click', 'blur', 'visibilitychange']) {
  window.addEventListener(kind, (event) => {
    const pointer = event as PointerEvent;
    input.push({ kind, atMs: performance.now(), trusted: event.isTrusted, pointerType: pointer.pointerType,
      x: pointer.clientX, y: pointer.clientY, target: event.target instanceof Element ? event.target.tagName : 'window' });
    if (input.length > 300) input.shift();
  }, { capture: true });
}

function state(canvas: HTMLCanvasElement) {
  return { canvasId: track(canvas), width: canvas.width, height: canvas.height, frames: canvas.dataset.frames, time: canvas.dataset.time };
}
export function inspectTelemetry() { return { timeline: [...timeline], input: [...input], maxHeartbeatLagMs }; }
export function markTelemetry(kind: string) { record(kind); }
export function graphicsInfo() {
  const canvas = document.querySelector<HTMLCanvasElement>('.water-edge-canvas');
  const gl = canvas?.getContext('webgl2');
  if (!gl || !canvas) return null;
  const debug = gl.getExtension('WEBGL_debug_renderer_info');
  return { ...state(canvas), renderer: debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
    vendor: debug ? gl.getParameter(debug.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR), version: gl.getParameter(gl.VERSION),
    extColorBufferFloat: Boolean(gl.getExtension('EXT_color_buffer_float')),
    extColorBufferHalfFloat: Boolean(gl.getExtension('EXT_color_buffer_half_float')),
    targetAudit: canvas.dataset.waterEdgeRenderTargets ? JSON.parse(canvas.dataset.waterEdgeRenderTargets) : null };
}

/** A zero-timeout asynchronous fence observes existing work; it never draws or calls finish/readPixels. */
export async function drainGpu(budgetMs = 45000) {
  const canvas = document.querySelector<HTMLCanvasElement>('.water-edge-canvas');
  const gl = canvas?.getContext('webgl2');
  const began = performance.now();
  if (!canvas || !gl) return { status: 'failed', reason: 'No existing WebGL2 canvas', elapsedMs: 0 };
  const before = state(canvas), sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
  if (!sync) return { status: 'failed', reason: 'fenceSync returned null', before, elapsedMs: performance.now() - began };
  record('gpu-fence-issued', { canvasId: before.canvasId });
  let polls = 0;
  try {
    gl.flush();
    while (performance.now() - began < budgetMs) {
      // WebGL forbids same-task newly issued sync signaling; always yield first.
      await new Promise(resolve => window.setTimeout(resolve, 20));
      polls++;
      if (gl.isContextLost()) return { status: 'failed', reason: 'Context lost during GPU drain', before, polls, elapsedMs: performance.now() - began };
      const after = state(canvas);
      if (!canvas.isConnected || JSON.stringify(before) !== JSON.stringify(after)) return { status: 'failed', reason: 'Canvas/frame/time changed during GPU drain', before, after, polls, elapsedMs: performance.now() - began };
      const status = gl.clientWaitSync(sync, 0, 0);
      if (status === gl.WAIT_FAILED) return { status: 'failed', reason: 'clientWaitSync WAIT_FAILED', before, polls, elapsedMs: performance.now() - began };
      if (status === gl.ALREADY_SIGNALED || status === gl.CONDITION_SATISFIED) {
        record('gpu-fence-signaled', { canvasId: before.canvasId });
        return { status: 'passed', before, after, polls, waitStatus: status, elapsedMs: performance.now() - began };
      }
    }
    return { status: 'blocked', reason: 'GPU fence did not signal within bounded budget; no screenshot queued', before, polls, elapsedMs: performance.now() - began };
  } finally { gl.deleteSync(sync); }
}
