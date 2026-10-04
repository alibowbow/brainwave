import { describe, expect, it, vi } from 'vitest';
import { SubmissionGate, SubmissionGateError, type SubmissionContext } from './submissionGate';

function setup(maxPending = 2) {
  let serial = 0;
  const state = { lost: false, nullFence: false };
  const statuses = new Map<WebGLSync, number>();
  const gl: SubmissionContext = {
    ALREADY_SIGNALED: 0x911a,
    CONDITION_SATISFIED: 0x911c,
    TIMEOUT_EXPIRED: 0x911b,
    WAIT_FAILED: 0x911d,
    SYNC_GPU_COMMANDS_COMPLETE: 0x9117,
    isContextLost: vi.fn(() => state.lost),
    fenceSync: vi.fn(() => {
      if (state.nullFence) return null;
      const sync = { serial: ++serial } as unknown as WebGLSync;
      statuses.set(sync, gl.TIMEOUT_EXPIRED);
      return sync;
    }),
    clientWaitSync: vi.fn((sync: WebGLSync, _flags: number, _timeout: number) => statuses.get(sync)!),
    deleteSync: vi.fn(),
    flush: vi.fn(),
  };
  return { gl, state, statuses, gate: new SubmissionGate(gl, maxPending) };
}

function expectFault(action: () => unknown, code: SubmissionGateError['code']) {
  try {
    action();
    expect.unreachable('Expected an explicit submission fault.');
  } catch (error) {
    expect(error).toBeInstanceOf(SubmissionGateError);
    expect((error as SubmissionGateError).code).toBe(code);
  }
}

describe('LivingWoods completion-aware scene submission gate', () => {
  it('keeps two unsignaled draws bounded without simulation, resize, or extra fence work', () => {
    const { gate, gl, statuses } = setup();
    let simulation = 0;
    const draw = vi.fn(() => { simulation += 0.016; });
    expect(gate.submit(draw)).toBe(true);
    expect(gate.submit(draw)).toBe(true);
    expect(gate.pending).toBe(2);
    expect(gl.clientWaitSync).not.toHaveBeenCalled();
    for (let laterFrame = 0; laterFrame < 20; laterFrame++) {
      gate.poll();
      expect(gate.submit(draw)).toBe(false);
    }
    expect(draw).toHaveBeenCalledTimes(2);
    expect(simulation).toBe(0.032);
    expect(gl.fenceSync).toHaveBeenCalledTimes(2);
    expect(gl.flush).toHaveBeenCalledTimes(2);
    expect(gl.clientWaitSync).toHaveBeenCalledTimes(20);
    for (const [, flags, timeout] of vi.mocked(gl.clientWaitSync).mock.calls) {
      expect([flags, timeout]).toEqual([0, 0]);
    }
    const [oldest, next] = [...statuses.keys()];
    statuses.set(oldest, gl.CONDITION_SATISFIED);
    gate.poll();
    expect(gl.deleteSync).toHaveBeenCalledExactlyOnceWith(oldest);
    expect(gate.completed).toBe(1);
    expect(gate.submit(draw)).toBe(true);
    expect(gate.submit(draw)).toBe(false);
    expect(gate.pending).toBe(2);
    expect([...statuses.keys()][1]).toBe(next);
  });

  it('recognizes both successful statuses and never retires the same sync twice', () => {
    const { gate, gl, statuses } = setup();
    gate.submit(() => {}); gate.submit(() => {});
    const [a, b] = [...statuses.keys()];
    statuses.set(a, gl.ALREADY_SIGNALED); statuses.set(b, gl.CONDITION_SATISFIED);
    gate.poll(); gate.poll();
    expect(gate.pending).toBe(0);
    expect(gate.completed).toBe(2);
    expect(gl.deleteSync).toHaveBeenCalledTimes(2);
    expect(vi.mocked(gl.deleteSync).mock.calls).toEqual([[a], [b]]);
    gate.dispose(); gate.dispose();
    expect(gl.deleteSync).toHaveBeenCalledTimes(2);
  });

  it('does not free capacity merely because a caller pauses, resumes, or requests static redraws', () => {
    const { gate, gl, statuses } = setup();
    gate.submit(() => {}); gate.submit(() => {});
    const staticDraw = vi.fn();
    const animatedDraw = vi.fn();
    for (let transition = 0; transition < 8; transition++) {
      // A caller can stop/start RAF freely, but pending GPU work remains owned.
      expect(gate.submit(staticDraw)).toBe(false);
      gate.poll();
      expect(gate.submit(animatedDraw)).toBe(false);
    }
    expect(staticDraw).not.toHaveBeenCalled();
    expect(animatedDraw).not.toHaveBeenCalled();
    expect(gate.pending).toBe(2);
    statuses.set([...statuses.keys()][0], gl.ALREADY_SIGNALED);
    gate.poll();
    expect(gate.submit(staticDraw)).toBe(true);
    expect(gate.submit(animatedDraw)).toBe(false);
    expect(gate.pending).toBe(2);
  });

  it('leaves blocked static work untouched so a caller can retain only its latest native size', () => {
    const { gate, gl, statuses } = setup();
    const renders: string[] = [];
    let latestSize = '1280x800';
    let simulation = 12.5;
    const drawStatic = () => { renders.push(latestSize); simulation += 0; };
    gate.submit(drawStatic); gate.submit(drawStatic);
    for (const size of ['360x780', '780x360', '690x780', '1280x800', '900x1200']) {
      latestSize = size;
      expect(gate.submit(drawStatic)).toBe(false);
    }
    expect(renders).toEqual(['1280x800', '1280x800']);
    expect(gate.pending).toBe(2);
    statuses.set([...statuses.keys()][0], gl.CONDITION_SATISFIED);
    gate.poll();
    expect(gate.submit(drawStatic)).toBe(true);
    expect(renders).toEqual(['1280x800', '1280x800', '900x1200']);
    expect(simulation).toBe(12.5);
  });

  it('does not poll a direct-capture sync in its submission task or require a further render to retire it', () => {
    const { gate, gl, statuses } = setup();
    const capture = vi.fn();
    expect(gate.submit(capture)).toBe(true);
    const sync = [...statuses.keys()][0];
    expect(gl.clientWaitSync).not.toHaveBeenCalled();
    gate.poll(); // A subsequent event-loop task still observes an unsignaled fence.
    expect(gate.pending).toBe(1);
    statuses.set(sync, gl.ALREADY_SIGNALED);
    gate.poll(); // A later drain-only RAF can retire without another draw.
    expect(gate.pending).toBe(0);
    expect(capture).toHaveBeenCalledTimes(1);
    expect(gate.submitted).toBe(1);
    expect(gate.completed).toBe(1);
  });

  it.each(['WAIT_FAILED', 'unknown'] as const)('fails closed on %s without treating deletion as GPU completion', status => {
    const { gate, gl, statuses } = setup();
    gate.submit(() => {}); gate.submit(() => {});
    const syncs = [...statuses.keys()];
    statuses.set(syncs[0], status === 'WAIT_FAILED' ? gl.WAIT_FAILED : 123456);
    const code = status === 'WAIT_FAILED' ? 'wait-failed' : 'unexpected-wait-status';
    expectFault(() => gate.poll(), code);
    expect(gate.completed).toBe(0);
    expect(gate.pending).toBe(0);
    expect(gate.canSubmit).toBe(false);
    expect(gate.fault?.code).toBe(code);
    const draw = vi.fn();
    expectFault(() => gate.submit(draw), code);
    expect(draw).not.toHaveBeenCalled();
    gate.dispose(); gate.dispose();
    expect(vi.mocked(gl.deleteSync).mock.calls).toEqual(syncs.map(sync => [sync]));
  });

  it('fails closed when fenceSync is null after drawing', () => {
    const { gate, state, gl } = setup();
    gate.submit(() => {});
    state.nullFence = true;
    const draw = vi.fn();
    expectFault(() => gate.submit(draw), 'null-fence');
    expect(draw).toHaveBeenCalledOnce();
    expect(gate.submitted).toBe(2);
    expect(gate.completed).toBe(0);
    expect(gate.canSubmit).toBe(false);
    expect(gate.pending).toBe(0);
    expect(gl.deleteSync).toHaveBeenCalledOnce();
    gate.dispose();
    expect(gl.deleteSync).toHaveBeenCalledOnce();
  });

  it('detects context loss before drawing, after drawing, and after fencing', () => {
    const before = setup();
    before.state.lost = true;
    const untouched = vi.fn();
    expectFault(() => before.gate.submit(untouched), 'context-lost');
    expect(untouched).not.toHaveBeenCalled();
    expect(before.gl.fenceSync).not.toHaveBeenCalled();

    const during = setup();
    expectFault(() => during.gate.submit(() => { during.state.lost = true; }), 'context-lost');
    expect(during.gl.fenceSync).not.toHaveBeenCalled();
    expect(during.gate.completed).toBe(0);

    const after = setup();
    after.gate.submit(() => {});
    after.state.lost = true;
    expectFault(() => after.gate.poll(), 'context-lost');
    expect(after.gl.clientWaitSync).not.toHaveBeenCalled();
    expect(after.gl.deleteSync).toHaveBeenCalledOnce();
    expect(after.gate.pending).toBe(0);
    expect(after.gate.completed).toBe(0);
  });

  it('handles context loss during wait without accepting an apparent signal', () => {
    const { gate, gl, state } = setup();
    gate.submit(() => {});
    vi.mocked(gl.clientWaitSync).mockImplementation(() => { state.lost = true; return gl.ALREADY_SIGNALED; });
    expectFault(() => gate.poll(), 'context-lost');
    expect(gate.completed).toBe(0);
    expect(gl.deleteSync).toHaveBeenCalledOnce();
  });

  it('fails closed on draw or driver exceptions and releases all owned syncs once', () => {
    const drawFailure = setup();
    drawFailure.gate.submit(() => {});
    expectFault(() => drawFailure.gate.submit(() => { throw new Error('draw failed'); }), 'draw-failed');
    expect(drawFailure.gate.pending).toBe(0);
    expect(drawFailure.gl.deleteSync).toHaveBeenCalledOnce();

    const waitFailure = setup();
    waitFailure.gate.submit(() => {});
    vi.mocked(waitFailure.gl.clientWaitSync).mockImplementation(() => { throw new Error('wait failed'); });
    expectFault(() => waitFailure.gate.poll(), 'context-error');
    waitFailure.gate.dispose();
    expect(waitFailure.gl.deleteSync).toHaveBeenCalledOnce();

    const flushFailure = setup();
    vi.mocked(flushFailure.gl.flush).mockImplementation(() => { throw new Error('flush failed'); });
    expectFault(() => flushFailure.gate.submit(() => {}), 'context-error');
    expect(flushFailure.gate.pending).toBe(0);
    expect(flushFailure.gl.deleteSync).toHaveBeenCalledOnce();
    expect(flushFailure.gate.completed).toBe(0);
  });

  it('clears pending references once on disposal, even if deleteSync throws', () => {
    const { gate, gl } = setup();
    gate.submit(() => {}); gate.submit(() => {});
    vi.mocked(gl.deleteSync).mockImplementation(() => { throw new Error('context destroyed'); });
    gate.dispose(); gate.dispose(); gate.poll();
    const draw = vi.fn();
    expect(gate.submit(draw)).toBe(false);
    expect(draw).not.toHaveBeenCalled();
    expect(gl.deleteSync).toHaveBeenCalledTimes(2);
    expect(gate.pending).toBe(0);
    expect(gate.completed).toBe(0);
    expect(gate.canSubmit).toBe(false);
  });

  it('does not create syncs after disposal inside a draw or allow nested submissions', () => {
    const { gate, gl } = setup();
    const nested = vi.fn();
    expect(gate.submit(() => {
      expect(gate.submit(nested)).toBe(false);
      gate.dispose();
    })).toBe(false);
    expect(nested).not.toHaveBeenCalled();
    expect(gl.fenceSync).not.toHaveBeenCalled();
    expect(gate.pending).toBe(0);
  });
});
