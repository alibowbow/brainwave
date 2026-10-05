/** Dev-only observation. None of these hooks is imported by a production entry. */
import { WaterEdgeEngine } from '../runtime';
import type * as THREE from 'three';

type Entry = { kind: string; atMs: number; [key: string]: unknown };
const timeline: Entry[] = [];
const input: Entry[] = [];
const tracked = new Set<HTMLCanvasElement>();
const ids = new WeakMap<HTMLCanvasElement, number>();
let sequence = 0;
let maxHeartbeatLagMs = 0;
let heartbeatAt = performance.now();
const heartbeats: { atMs: number; lagMs: number }[] = [];
type DrawInfo = { calls: number; submittedElements: number };
type EngineObserved = { canvas: HTMLCanvasElement; renderer: THREE.WebGLRenderer; world: { dispose?: () => void } | null };
type RendererObserved = { update(count: number, mode: number, instances: number): void };
type RenderCall = { draws: DrawInfo; targets: Record<string, DrawInfo> };
const instrumented = new WeakSet<THREE.WebGLRenderer>();
const totals = new WeakMap<THREE.WebGLRenderer, DrawInfo>();
const scopes = new WeakMap<THREE.WebGLRenderer, string>();
const renderStacks = new WeakMap<THREE.WebGLRenderer, RenderCall[]>();
const lastSizes = new WeakMap<WaterEdgeEngine, { width: number; height: number; dpr: number; atMs: number; same: boolean }>();
let lastAction = 'initial-mount';
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
function observed(engine: WaterEdgeEngine) { return engine as unknown as EngineObserved; }
function canvasOf(engine: WaterEdgeEngine) { return observed(engine).canvas; }
function phase<T>(renderer: THREE.WebGLRenderer, name: string, call: () => T): T {
  const id = track(renderer.domElement), at = performance.now();
  const bookkeeping = () => ({ ...renderer.info.memory, programs: renderer.info.programs?.length ?? null });
  record(`${name}-entry`, { canvasId: id, jsResourceBookkeeping: bookkeeping() });
  try { return call(); }
  finally { record(`${name}-exit`, { canvasId: id, elapsedMs: performance.now() - at, jsResourceBookkeeping: bookkeeping() }); }
}
function rendererHooks(renderer: THREE.WebGLRenderer) {
  if (instrumented.has(renderer)) return;
  instrumented.add(renderer);
  const aggregate = { calls: 0, submittedElements: 0 }; totals.set(renderer, aggregate);
  const stack: RenderCall[] = []; renderStacks.set(renderer, stack);
  const info = renderer.info as unknown as RendererObserved;
  const originalUpdate = info.update;
  const previousAutoReset = renderer.info.autoReset;
  renderer.info.autoReset = false;
  // Observe Three's own post-draw accounting, without changing GL methods/state.
  // The active innermost renderer call gets exclusive counts; global deltas include children.
  info.update = function (count, mode, instances) {
    aggregate.calls++; aggregate.submittedElements += count * instances;
    const current = stack.at(-1);
    if (current) {
      current.draws.calls++; current.draws.submittedElements += count * instances;
      const target = renderer.getRenderTarget();
      const key = target ? `${target.texture.uuid}:${target.width}x${target.height}:type${target.texture.type}:face${renderer.getActiveCubeFace()}:mip${renderer.getActiveMipmapLevel()}` : 'canvas';
      const item = current.targets[key] ??= { calls: 0, submittedElements: 0 };
      item.calls++; item.submittedElements += count * instances;
    }
    return originalUpdate.call(this, count, mode, instances);
  };
  const original = renderer.render;
  renderer.render = function (scene, camera) {
    const begin = performance.now(), before = { ...aggregate }, target = renderer.getRenderTarget();
    const current: RenderCall = { draws: { calls: 0, submittedElements: 0 }, targets: {} }; stack.push(current);
    const scope = scopes.get(renderer) || 'outside-engine-scope';
    try { return original.call(this, scene, camera); }
    finally {
      stack.pop();
      record('renderer-render-return', { canvasId: track(renderer.domElement), scope, action: lastAction, nestedDepth: stack.length,
        startMs: begin, elapsedMs: performance.now() - begin, exclusiveDrawCalls: current.draws.calls,
        inclusiveDrawCalls: aggregate.calls - before.calls, cumulativeDrawCalls: aggregate.calls,
        drawTargets: current.targets, sceneName: scene.name || scene.type, cameraType: camera.type,
        destination: target ? { width: target.width, height: target.height, type: target.texture.type, cube: Boolean((target as unknown as { isWebGLCubeRenderTarget?: boolean }).isWebGLCubeRenderTarget) } : 'canvas' });
    }
  };
  const listsDispose = renderer.renderLists.dispose;
  renderer.renderLists.dispose = () => phase(renderer, 'render-lists-dispose', () => listsDispose.call(renderer.renderLists));
  const rendererDispose = renderer.dispose;
  renderer.dispose = () => phase(renderer, 'renderer-dispose', () => rendererDispose.call(renderer));
  const forceLoss = renderer.forceContextLoss;
  renderer.forceContextLoss = () => {
    try { return phase(renderer, 'force-context-loss', () => forceLoss.call(renderer)); }
    finally { renderer.info.autoReset = previousAutoReset; }
  };
}
const originalInit = WaterEdgeEngine.prototype.init;
WaterEdgeEngine.prototype.init = function () {
  const { renderer } = observed(this); rendererHooks(renderer);
  scopes.set(renderer, 'engine-initialization'); const began = performance.now();
  record('engine-init-entry', { canvasId: track(renderer.domElement) });
  let result: Promise<void>;
  try {
    result = originalInit.call(this);
    const world = observed(this).world;
    if (world?.dispose) { const dispose = world.dispose; world.dispose = () => phase(renderer, 'world-dispose', () => dispose.call(world)); }
  } finally { scopes.delete(renderer); }
  return result.finally(() => record('engine-init-exit', { canvasId: track(renderer.domElement), elapsedMs: performance.now() - began, drawCalls: totals.get(renderer)?.calls }));
};
const originalSetSize = WaterEdgeEngine.prototype.setSize;
WaterEdgeEngine.prototype.setSize = function (width, height, dpr) {
  const prior = lastSizes.get(this);
  const detail = { width, height, dpr, atMs: performance.now(), same: Boolean(prior && prior.width === width && prior.height === height && prior.dpr === dpr) };
  lastSizes.set(this, detail); record('set-size-request', { canvasId: track(canvasOf(this)), action: lastAction, ...detail });
  return originalSetSize.call(this, width, height, dpr);
};
const originalRender = WaterEdgeEngine.prototype.renderFrame;
WaterEdgeEngine.prototype.renderFrame = function (dt: number) {
  const canvas = canvasOf(this), id = track(canvas), start = performance.now();
  const renderer = observed(this).renderer, beforeDraws = totals.get(renderer)?.calls || 0;
  const reason = dt > 0 ? 'raf' : Number(canvas.dataset.frames || 0) === 0 ? 'initial-static' : 'static-redraw';
  scopes.set(renderer, reason);
  const before = Number(canvas.dataset.frames || 0);
  try { return originalRender.call(this, dt); }
  finally {
    scopes.delete(renderer);
    record('render-js-return', { canvasId: id, dt, reason, action: lastAction, lastSize: lastSizes.get(this), drawCalls: (totals.get(renderer)?.calls || 0) - beforeDraws, startMs: start, elapsedMs: performance.now() - start,
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
  const lagMs = now - heartbeatAt - 50;
  maxHeartbeatLagMs = Math.max(maxHeartbeatLagMs, lagMs);
  heartbeats.push({ atMs: now, lagMs }); if (heartbeats.length > 4000) heartbeats.shift();
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
export function inspectTelemetry() { return { timeline: [...timeline], input: [...input], maxHeartbeatLagMs, heartbeats: [...heartbeats],
  countingMethod: 'Dev-only Three renderer.info.update pass-through, autoReset=false; exclusive per-render and inclusive/global actual draw submission counters. submittedElements=count*instances, not triangle counts. Legacy canvas drawCalls becomes cumulative. Resource counters are JavaScript bookkeeping, not physical VRAM. No GL function/state monkeypatch. CPU wall durations include synchronous driver stalls.' }; }
export function markTelemetry(kind: string) { lastAction = kind; record(kind); }
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
