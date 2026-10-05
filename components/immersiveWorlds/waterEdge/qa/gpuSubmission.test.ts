import { describe, expect, it, vi } from 'vitest';
import { GpuSubmission } from '../gpuSubmission';

function fixture() {
  let next = 1;
  const gl = {
    ALREADY_SIGNALED: 0x911A, TIMEOUT_EXPIRED: 0x911B,
    CONDITION_SATISFIED: 0x911C, WAIT_FAILED: 0x911D,
    SYNC_GPU_COMMANDS_COMPLETE: 0x9117,
    isContextLost: vi.fn(() => false),
    fenceSync: vi.fn(() => ({ id: next++ } as unknown as WebGLSync)),
    clientWaitSync: vi.fn(() => 0x911B),
    deleteSync: vi.fn(), flush: vi.fn(), finish: vi.fn(),
  };
  const onFault = vi.fn();
  const gate = new GpuSubmission(gl as unknown as WebGL2RenderingContext, onFault);
  return { gate, gl, onFault };
}

describe('one in-flight GPU submission batch', () => {
  it('starts ready and fences/flushes a submitted batch once', () => {
    const { gate, gl, onFault } = fixture();
    expect(gate.ready()).toBe(true); expect(gate.pending).toBe(false);
    expect(gate.submittedCount).toBe(0); expect(gate.completedCount).toBe(0); expect(gate.failed).toBe(false);
    expect(gl.clientWaitSync).not.toHaveBeenCalled();
    gate.submitted();
    expect(gate.pending).toBe(true);
    expect(gate.submittedCount).toBe(1); expect(gate.completedCount).toBe(0);
    expect(gl.fenceSync).toHaveBeenCalledExactlyOnceWith(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    expect(gl.flush).toHaveBeenCalledTimes(1);
    expect(onFault).not.toHaveBeenCalled();
  });

  it('does not free an unsignaled batch, allocate another fence or busy-wait', () => {
    const { gate, gl } = fixture();
    gate.submitted();
    const sync = gl.fenceSync.mock.results[0].value;
    for (let attempt = 0; attempt < 5; attempt++) {
      expect(gate.ready()).toBe(false);
      expect(gl.clientWaitSync).toHaveBeenCalledTimes(attempt + 1);
      expect(gl.clientWaitSync).toHaveBeenLastCalledWith(sync, 0, 0);
    }
    expect(gate.pending).toBe(true);
    expect(gate.completedCount).toBe(0);
    expect(gl.deleteSync).not.toHaveBeenCalled();
    expect(gl.fenceSync).toHaveBeenCalledTimes(1);
    expect(gl.flush).toHaveBeenCalledTimes(1);
    expect(gl.finish).not.toHaveBeenCalled();
  });

  it.each([0x911A, 0x911C])('retires only a genuinely signaled status %s and deletes that fence exactly once', status => {
    const { gate, gl, onFault } = fixture();
    gate.submitted();
    const sync = gl.fenceSync.mock.results[0].value;
    gl.clientWaitSync.mockReturnValue(status);
    expect(gate.ready()).toBe(true); expect(gate.pending).toBe(false);
    expect(gate.completedCount).toBe(1);
    expect(gl.deleteSync).toHaveBeenCalledExactlyOnceWith(sync);
    expect(gate.ready()).toBe(true);
    expect(gl.clientWaitSync).toHaveBeenCalledTimes(1);
    expect(gl.deleteSync).toHaveBeenCalledTimes(1);
    gate.submitted(); expect(gate.pending).toBe(true);
    expect(gl.fenceSync).toHaveBeenCalledTimes(2);
    expect(onFault).not.toHaveBeenCalled();
  });

  it('does not mistake WAIT_FAILED for completed capacity', () => {
    const { gate, gl, onFault } = fixture();
    gate.submitted();
    gl.clientWaitSync.mockReturnValue(gl.WAIT_FAILED);
    expect(gate.ready()).toBe(false);
    expect(gate.failed).toBe(true); expect(gate.completedCount).toBe(0);
    expect(onFault).toHaveBeenCalledTimes(1);
    gl.clientWaitSync.mockReturnValue(gl.ALREADY_SIGNALED);
    expect(gate.ready()).toBe(false); gate.submitted();
    expect(gl.fenceSync).toHaveBeenCalledTimes(1);
    expect(onFault).toHaveBeenCalledTimes(1);
    gate.dispose(); gate.dispose();
    expect(gl.deleteSync).toHaveBeenCalledTimes(1);
  });

  it('faults a null fence instead of treating untracked submitted work as free capacity', () => {
    const { gate, gl, onFault } = fixture();
    gl.fenceSync.mockReturnValueOnce(null);
    gate.submitted();
    expect(onFault).toHaveBeenCalledTimes(1);
    expect(gate.failed).toBe(true); expect(gate.completedCount).toBe(0);
    expect(gate.ready()).toBe(false); gate.submitted();
    expect(gl.fenceSync).toHaveBeenCalledTimes(1);
    expect(gl.clientWaitSync).not.toHaveBeenCalled();
    expect(gl.deleteSync).not.toHaveBeenCalled();
    gate.dispose(); expect(onFault).toHaveBeenCalledTimes(1);
  });

  it('rejects a second submission while a batch is pending instead of overwriting its sync', () => {
    const { gate, gl, onFault } = fixture();
    expect(gate.submitted()).toBe(true);
    expect(gate.submitted()).toBe(false);
    expect(gate.failed).toBe(true); expect(gate.ready()).toBe(false);
    expect(gl.fenceSync).toHaveBeenCalledTimes(1);
    expect(gl.deleteSync).toHaveBeenCalledTimes(1);
    expect(gate.completedCount).toBe(0);
    expect(onFault).toHaveBeenCalledTimes(1);
  });

  it('handles a thrown completion query as a fault, never as signaled work', () => {
    const { gate, gl, onFault } = fixture();
    gate.submitted();
    gl.clientWaitSync.mockImplementation(() => { throw new Error('driver query failure'); });
    expect(gate.ready()).toBe(false);
    expect(gate.failed).toBe(true); expect(gate.completedCount).toBe(0);
    expect(onFault).toHaveBeenCalledTimes(1);
    gate.dispose(); expect(gl.deleteSync).toHaveBeenCalledTimes(1);
  });

  it('reports context loss before any fence and does not submit into a lost context', () => {
    const { gate, gl, onFault } = fixture();
    gl.isContextLost.mockReturnValue(true);
    expect(gate.ready()).toBe(false);
    gate.submitted(); expect(gate.ready()).toBe(false);
    expect(onFault).toHaveBeenCalledTimes(1);
    expect(gl.fenceSync).not.toHaveBeenCalled();
    expect(gl.clientWaitSync).not.toHaveBeenCalled();
  });

  it('reports context loss with a pending fence and releases its JS handle once', () => {
    const { gate, gl, onFault } = fixture();
    gate.submitted(); gl.isContextLost.mockReturnValue(true);
    expect(gate.ready()).toBe(false);
    expect(onFault).toHaveBeenCalledTimes(1);
    expect(gl.clientWaitSync).not.toHaveBeenCalled();
    gate.dispose(); gate.dispose();
    expect(gl.deleteSync).toHaveBeenCalledTimes(1);
    expect(gate.pending).toBe(false);
  });

  it('disposes a pending fence without waiting or adding more GPU work', () => {
    const { gate, gl, onFault } = fixture();
    gate.submitted();
    const sync = gl.fenceSync.mock.results[0].value;
    gate.dispose(); gate.dispose();
    expect(gl.deleteSync).toHaveBeenCalledExactlyOnceWith(sync);
    expect(gate.completedCount).toBe(0); // disposal deletes a handle; it does not establish GPU completion
    expect(gl.clientWaitSync).not.toHaveBeenCalled();
    expect(gl.fenceSync).toHaveBeenCalledTimes(1); expect(gl.flush).toHaveBeenCalledTimes(1);
    expect(gate.pending).toBe(false); expect(gate.ready()).toBe(false);
    gate.submitted(); expect(gl.fenceSync).toHaveBeenCalledTimes(1);
    expect(gl.finish).not.toHaveBeenCalled(); expect(onFault).not.toHaveBeenCalled();
  });
});
