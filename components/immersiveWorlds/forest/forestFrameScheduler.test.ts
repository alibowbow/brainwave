import { describe, expect, it, vi } from 'vitest';
import { ForestFrameScheduler } from './forestFrameScheduler';

function rig() {
  let task = 0, now = 0, nextRequest = 0, nextFence = 0, lost = false, connected = true;
  const requests = new Map<number, FrameRequestCallback>();
  const created = new Map<WebGLSync, number>();
  const statuses = new Map<WebGLSync, number>();
  const frames: { task: number; dt: number }[] = [];
  const faults = vi.fn();
  const gl = {
    SYNC_GPU_COMMANDS_COMPLETE: 0x9117 as const, ALREADY_SIGNALED: 0x911a as const, TIMEOUT_EXPIRED: 0x911b as const,
    CONDITION_SATISFIED: 0x911c as const, WAIT_FAILED: 0x911d as const,
    isContextLost: vi.fn(() => lost),
    fenceSync: vi.fn((): WebGLSync | null => {
      const fence = { id: ++nextFence } as WebGLSync;
      created.set(fence, task); statuses.set(fence, gl.TIMEOUT_EXPIRED); return fence;
    }),
    clientWaitSync: vi.fn((fence: WebGLSync, flags: number, timeout: number) => {
      expect(flags).toBe(0); expect(timeout).toBe(0);
      // Even an immediate readback cannot make a newly inserted WebGL sync
      // observable as signaled within the task which created it.
      if (created.get(fence) === task) return gl.TIMEOUT_EXPIRED;
      return statuses.get(fence)!;
    }),
    deleteSync: vi.fn((fence: WebGLSync) => { statuses.delete(fence); }),
    flush: vi.fn(),
  };
  const draw = vi.fn((dt: number) => { frames.push({ task, dt }); });
  const readback = vi.fn(() => ({ task, frame: frames.length }));
  const scheduler = new ForestFrameScheduler({
    gl, draw, readback, onState: vi.fn(), onFault: faults, canDraw: () => connected,
    now: () => now,
    requestFrame: (callback) => { const id = ++nextRequest; requests.set(id, callback); return id; },
    cancelFrame: (id) => { requests.delete(id); },
  });
  return {
    scheduler, gl, draw, readback, frames, faults, requests, statuses, created,
    lose: () => { lost = true; }, connect: (value: boolean) => { connected = value; },
    tick: (ms = 16) => {
      task++; now += ms;
      const callbacks = [...requests.values()]; requests.clear();
      for (const callback of callbacks) callback(now);
      expect(requests.size).toBeLessThanOrEqual(1);
      expect(scheduler.state.pending).toBeLessThanOrEqual(2);
    },
    signal: (fence = [...statuses.keys()][0]) => { statuses.set(fence, gl.CONDITION_SATISFIED); },
    signalAll: () => { for (const fence of statuses.keys()) statuses.set(fence, gl.ALREADY_SIGNALED); },
  };
}

describe('forest completion-aware submission policy', () => {
  it('bounds a slow queue at two, without simulation steps or extra fences while full', () => {
    const r = rig(); r.scheduler.start(); r.tick(); r.tick();
    const steps = r.frames.slice();
    for (let i = 0; i < 100; i++) r.tick(100);
    expect(r.frames).toEqual(steps); expect(r.gl.fenceSync).toHaveBeenCalledTimes(2);
    r.signal(); r.tick();
    expect(r.frames).toHaveLength(3);
    expect(r.scheduler.state).toMatchObject({ submitted: 3, completed: 1, pending: 2, fault: null });
    expect(r.gl.deleteSync).toHaveBeenCalledTimes(1);
  });

  it('counts the one initialization batch against the same bound', () => {
    const r = rig(); r.scheduler.trackInitialization(); r.scheduler.trackInitialization();
    r.scheduler.renderFrame(0); r.tick(); r.scheduler.start();
    for (let i = 0; i < 20; i++) r.tick();
    expect(r.frames).toHaveLength(1);
    expect(r.scheduler.state).toMatchObject({ submitted: 2, initializationSubmitted: 1, pending: 2 });
  });

  it('coalesces paused redraws and drains the final fence without another render', () => {
    const r = rig(); r.scheduler.start(); r.tick(); r.tick(); r.scheduler.stop();
    for (let i = 0; i < 80; i++) { r.scheduler.renderFrame(0); r.tick(); }
    expect(r.frames).toHaveLength(2); expect(r.scheduler.state.queued).toBe(true);
    r.signalAll(); r.tick();
    expect(r.frames).toHaveLength(3); expect(r.frames.at(-1)?.dt).toBe(0);
    expect(r.scheduler.state).toMatchObject({ pending: 1, completed: 2, queued: false, running: false });
    r.signalAll(); r.tick();
    expect(r.frames).toHaveLength(3); expect(r.gl.deleteSync).toHaveBeenCalledTimes(3);
    expect(r.scheduler.state).toMatchObject({ submitted: 3, completed: 3, pending: 0 });
    expect(r.requests.size).toBe(0);
  });

  it('retains fences across repeated pause/resume without duplicate loops or capacity escapes', () => {
    const r = rig(); r.scheduler.start(); r.tick(); r.tick();
    for (let i = 0; i < 30; i++) { r.scheduler.stop(); r.scheduler.start(); r.scheduler.start(); r.tick(1000); }
    expect(r.frames).toHaveLength(2); expect(r.scheduler.state.pending).toBe(2);
    r.scheduler.stop(); r.signalAll(); r.tick();
    expect(r.frames).toHaveLength(2); expect(r.requests.size).toBe(0);
    r.scheduler.start(); r.tick(); expect(r.frames.at(-1)?.dt).toBeCloseTo(.016);
  });

  it('waits for capacity then draws and reads a capture in one later task', async () => {
    const r = rig(); r.scheduler.start(); r.tick(); r.tick(); r.scheduler.stop();
    const capture = r.scheduler.capture(), second = r.scheduler.capture();
    r.tick(); expect(r.readback).not.toHaveBeenCalled();
    r.signal(); r.tick();
    const result = await capture;
    expect(await second).toEqual(result); expect(r.readback).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ task: r.frames.at(-1)!.task, frame: 3 });
    expect(r.frames.at(-1)!.dt).toBe(0);
    const newFence = [...r.created.keys()].at(-1)!;
    expect(r.gl.clientWaitSync.mock.calls.some(([fence]) => fence === newFence)).toBe(false);
    expect(r.scheduler.state).toMatchObject({ completed: 1, pending: 2 });
    r.signalAll(); r.tick();
    expect(r.scheduler.state).toMatchObject({ completed: 3, pending: 0 });
    expect(r.frames).toHaveLength(3); expect(r.requests.size).toBe(0);
  });

  it('keeps a detached final frame queued, retires old work, then renders on reattachment', () => {
    const r = rig(); r.scheduler.start(); r.tick(); r.tick(); r.scheduler.stop();
    r.scheduler.renderFrame(0); r.connect(false); r.signalAll(); r.tick();
    expect(r.frames).toHaveLength(2); expect(r.scheduler.state).toMatchObject({ pending: 0, queued: true });
    expect(r.requests.size).toBe(0);
    r.connect(true); r.scheduler.renderFrame(0); r.tick();
    expect(r.frames).toHaveLength(3); expect(r.frames.at(-1)?.dt).toBe(0);
  });

  it.each(['wait-failed', 'unexpected-wait-status'] as const)('fails closed on %s without claiming GPU completion', async (fault) => {
    const r = rig(); r.scheduler.start(); r.tick(); r.tick();
    const capture = r.scheduler.capture(); const rejected = expect(capture).rejects.toThrow(fault);
    r.statuses.set([...r.statuses.keys()][0], fault === 'wait-failed' ? r.gl.WAIT_FAILED : -1); r.tick();
    await rejected;
    expect(r.scheduler.state).toMatchObject({ submitted: 2, completed: 0, pending: 0, abandoned: 2, fault, running: false });
    expect(r.gl.deleteSync).toHaveBeenCalledTimes(2); expect(r.faults).toHaveBeenCalledExactlyOnceWith(fault);
    r.scheduler.start(); r.scheduler.renderFrame(0); r.tick(); r.scheduler.dispose(); r.scheduler.dispose();
    expect(r.frames).toHaveLength(2); expect(r.gl.deleteSync).toHaveBeenCalledTimes(2); expect(r.requests.size).toBe(0);
  });

  it('fails closed on a null fence after a real draw', async () => {
    const r = rig(); r.gl.fenceSync.mockReturnValue(null);
    const capture = r.scheduler.capture(); const rejected = expect(capture).rejects.toThrow('null-fence'); r.tick(); await rejected;
    expect(r.scheduler.state).toMatchObject({ submitted: 1, completed: 0, pending: 0, abandoned: 1, fault: 'null-fence' });
    expect(r.frames).toHaveLength(1); expect(r.readback).not.toHaveBeenCalled(); expect(r.gl.flush).not.toHaveBeenCalled();
    r.scheduler.renderFrame(0); r.scheduler.start(); r.tick(); expect(r.frames).toHaveLength(1);
  });

  it.each(['before-draw', 'after-draw', 'after-fence', 'pending'] as const)('clears invalid handles on context loss %s', (when) => {
    const r = rig();
    if (when === 'before-draw') r.lose();
    if (when === 'after-draw') r.draw.mockImplementationOnce((dt) => { r.frames.push({ task: 1, dt }); r.lose(); });
    if (when === 'after-fence') r.gl.flush.mockImplementationOnce(r.lose);
    r.scheduler.renderFrame(0); r.tick();
    if (when === 'pending') { r.lose(); r.scheduler.contextLost(); }
    expect(r.scheduler.state).toMatchObject({ completed: 0, pending: 0, fault: 'context-lost', abandoned: when === 'before-draw' ? 0 : 1 });
    expect(r.gl.deleteSync).not.toHaveBeenCalled(); // invalidated by the context, not GPU-completed
    r.scheduler.dispose(); r.scheduler.dispose();
    expect(r.faults).toHaveBeenCalledTimes(1); expect(r.requests.size).toBe(0);
  });

  it('disposes pending work once, rejects captures, and never submits after disposal', async () => {
    const r = rig(); r.scheduler.start(); r.tick(); r.tick();
    const capture = r.scheduler.capture(), rejected = expect(capture).rejects.toThrow('disposed');
    r.scheduler.dispose(); r.scheduler.dispose(); await rejected;
    r.scheduler.start(); r.scheduler.renderFrame(0); r.tick();
    expect(r.gl.deleteSync).toHaveBeenCalledTimes(2); expect(r.faults).not.toHaveBeenCalled();
    expect(r.frames).toHaveLength(2); expect(r.requests.size).toBe(0);
    expect(r.scheduler.state).toMatchObject({ disposed: true, completed: 0, pending: 0, abandoned: 2, captures: 0, queued: false });
  });

  it('does not mistake a thrown sync call for completion', () => {
    const r = rig(); r.gl.fenceSync.mockImplementationOnce(() => { throw new Error('driver failure'); });
    r.scheduler.renderFrame(0); r.tick();
    expect(r.scheduler.state).toMatchObject({ submitted: 1, completed: 0, abandoned: 1, fault: 'submission-error' });
    expect(r.requests.size).toBe(0);
  });

  it('accounts a partially submitted draw before a later render/audit exception', () => {
    const r = rig();
    r.draw.mockImplementationOnce((dt) => { r.frames.push({ task: 1, dt }); throw new Error('post-render framebuffer audit'); });
    r.scheduler.renderFrame(0); r.tick();
    expect(r.frames).toHaveLength(1);
    expect(r.scheduler.state).toMatchObject({ submitted: 1, completed: 0, pending: 0, abandoned: 1, fault: 'submission-error' });
    expect(r.gl.fenceSync).not.toHaveBeenCalled(); expect(r.requests.size).toBe(0);
  });
});
