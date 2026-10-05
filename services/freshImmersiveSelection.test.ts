import { describe, expect, it, vi } from 'vitest';
import { createFreshImmersiveSelection } from './freshImmersiveSelection';
import * as bridge from './immersiveSessionBridge';

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
const flush = async () => { await Promise.resolve(); await Promise.resolve(); await Promise.resolve(); };
const candidate = [{ type: 'rain' as const, volume: .91 }];

describe('fresh selection cancellation and cold-load order', () => {
  it('primes on the calling turn, then applies one coherent profile only after metadata arrives', async () => {
    const load = deferred<typeof bridge>();
    const order: string[] = [];
    const accept = vi.fn();
    const selection = createFreshImmersiveSelection({
      load: () => { order.push('load'); return load.promise; },
      prime: () => { order.push('prime'); return Promise.resolve('running'); },
      pending: vi.fn(), error: vi.fn(),
    });
    selection.run('amb:morning_forest', candidate, true, accept);
    expect(order).toEqual(['prime', 'load']);
    expect(accept).not.toHaveBeenCalled();
    load.resolve(bridge); await flush();
    expect(accept).toHaveBeenCalledTimes(1);
    expect(accept.mock.calls[0][0]).toEqual(bridge.resolveImmersiveAudioProfile('amb:morning_forest')!.initialLayers);
    expect(candidate).toEqual([{ type: 'rain', volume: .91 }]);
  });

  it('a replaced request resolving last cannot overwrite the newer selection', async () => {
    const first = deferred<typeof bridge>(), second = deferred<typeof bridge>();
    const load = vi.fn().mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
    const oldAccept = vi.fn(), newAccept = vi.fn(), error = vi.fn();
    const selection = createFreshImmersiveSelection({ load, prime: vi.fn(), pending: vi.fn(), error });
    selection.run('amb:morning_forest', candidate, false, oldAccept);
    selection.run('amb:focus_cafe', candidate, false, newAccept);
    second.resolve(bridge); await flush();
    first.resolve(bridge); await flush();
    expect(newAccept).toHaveBeenCalledTimes(1);
    expect(oldAccept).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  });

  it('edit/navigation cancellation aborts a pending gate and suppresses late accept/error', async () => {
    const load = deferred<typeof bridge>(), gate = deferred<unknown>();
    let signal!: AbortSignal;
    const accept = vi.fn(), error = vi.fn();
    const selection = createFreshImmersiveSelection({
      load: () => load.promise, prime: (value) => { signal = value; return gate.promise; }, pending: vi.fn(), error,
    });
    selection.run('amb:morning_forest', candidate, true, accept);
    selection.cancel();
    expect(signal.aborted).toBe(true);
    load.resolve(bridge); gate.reject(new Error('late gate failure')); await flush();
    expect(accept).not.toHaveBeenCalled(); expect(error).not.toHaveBeenCalled();
  });

  it('a current lazy-load failure leaves the candidate unchanged and permits an explicit retry', async () => {
    const accept = vi.fn(), error = vi.fn();
    const load = vi.fn().mockRejectedValueOnce(new Error('chunk failure')).mockResolvedValueOnce(bridge);
    const selection = createFreshImmersiveSelection({ load, prime: vi.fn(), pending: vi.fn(), error });
    selection.run('amb:morning_forest', candidate, false, accept); await flush();
    expect(error).toHaveBeenCalledTimes(1); expect(accept).not.toHaveBeenCalled();
    selection.run('amb:morning_forest', candidate, false, accept); await flush();
    expect(accept).toHaveBeenCalledTimes(1);
    expect(candidate).toEqual([{ type: 'rain', volume: .91 }]);
  });

  it('configuration selection never primes audio, and protected/custom IDs preserve their candidate', async () => {
    const prime = vi.fn(), accept = vi.fn();
    const selection = createFreshImmersiveSelection({ load: async () => bridge, prime, pending: vi.fn(), error: vi.fn() });
    for (const id of ['focus', 'amb:ocean_shore', 'custom']) {
      selection.run(id, candidate, false, accept); await flush();
      expect(accept.mock.calls.at(-1)![0]).toEqual(candidate);
    }
    expect(prime).not.toHaveBeenCalled();
  });

  it('synchronous context preparation failure exits pending state and reports failure once', async () => {
    const accept = vi.fn(), error = vi.fn(), pending = vi.fn();
    const selection = createFreshImmersiveSelection({
      load: async () => bridge,
      prime: () => { throw new Error('AudioContext unavailable'); },
      pending, error,
    });
    expect(() => selection.run('amb:morning_forest', candidate, true, accept)).not.toThrow();
    await flush();
    expect(accept).not.toHaveBeenCalled();
    expect(pending).toHaveBeenLastCalledWith(false);
    expect(error).toHaveBeenCalledTimes(1);
  });

  it('a completed selection whose consumer throws reports failure rather than silently swallowing it', async () => {
    const error = vi.fn(), pending = vi.fn();
    const selection = createFreshImmersiveSelection({
      load: async () => bridge, prime: vi.fn(), pending, error,
    });
    selection.run('amb:morning_forest', candidate, false, () => { throw new Error('failed to apply selection'); });
    await flush();
    expect(pending).toHaveBeenLastCalledWith(false);
    expect(error).toHaveBeenCalledTimes(1);
  });
});
