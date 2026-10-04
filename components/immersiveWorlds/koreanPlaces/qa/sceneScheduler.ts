import { WorldEngine } from '../WorldEngine';

/** Isolated test harness only. The application never imports this module. */
export function installSceneTestScheduler() {
  const nativeRAF = window.requestAnimationFrame.bind(window);
  const nativeCancel = window.cancelAnimationFrame.bind(window);
  const engineCallbacks = new WeakSet<FrameRequestCallback>();
  const pending = new Map<number, { callback: FrameRequestCallback; nativeId: number | null }>();
  let registration = false;
  let held = false;
  let nextId = 1_000_000_000;
  let controlledFrames = 0;
  const originalStart = WorldEngine.prototype.start;
  WorldEngine.prototype.start = function () {
    const previous = registration;
    registration = true;
    try { return originalStart.call(this); } finally { registration = previous; }
  };
  function schedule(id: number) {
    const item = pending.get(id);
    if (!item || item.nativeId !== null) return;
    item.nativeId = nativeRAF(timestamp => {
      const current = pending.get(id);
      if (!current) return;
      pending.delete(id);
      current.callback(timestamp);
    });
  }
  window.requestAnimationFrame = callback => {
    if (!registration && !engineCallbacks.has(callback)) return nativeRAF(callback);
    engineCallbacks.add(callback);
    const id = ++nextId;
    pending.set(id, { callback, nativeId: null });
    if (!held) schedule(id);
    return id;
  };
  window.cancelAnimationFrame = id => {
    const item = pending.get(id);
    if (!item) { nativeCancel(id); return; }
    if (item.nativeId !== null) nativeCancel(item.nativeId);
    pending.delete(id);
  };
  const api = {
    setHeld(value: boolean) {
      held = value;
      for (const [id, item] of pending) {
        if (held && item.nativeId !== null) { nativeCancel(item.nativeId); item.nativeId = null; }
        else if (!held) schedule(id);
      }
    },
    async stepFrame() {
      if (!held) throw new Error('Controlled frame requires a held test scheduler');
      // Real elapsed time and a real browser RAF timestamp, never a fabricated dt.
      await new Promise(resolve => window.setTimeout(resolve, 85));
      return await new Promise<{ callbacks: number; controlledFrames: number; timestamp: number }>(resolve => {
        nativeRAF(timestamp => {
          const callbacks = [...pending.entries()];
          for (const [id, item] of callbacks) {
            if (item.nativeId !== null) nativeCancel(item.nativeId);
            pending.delete(id);
            item.callback(timestamp);
            controlledFrames++;
          }
          resolve({ callbacks: callbacks.length, controlledFrames, timestamp });
        });
      });
    },
    flush() {
      for (const canvas of document.querySelectorAll<HTMLCanvasElement>('.korean-world-canvas')) canvas.getContext('webgl2')?.finish();
    },
    snapshot() { return { held, pendingCallbacks: pending.size, controlledFrames }; },
  };
  (window as typeof window & { sceneQAScheduler: typeof api }).sceneQAScheduler = api;
}
