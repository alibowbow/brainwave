import { afterEach, describe, expect, it, vi } from 'vitest';
import { resumeAudioContext } from './audioPlaybackGate';

class Context extends EventTarget {
  state: AudioContextState = 'suspended';
  resume = vi.fn<() => Promise<void>>(() => new Promise(() => {}));
  change(state: AudioContextState) { this.state = state; this.dispatchEvent(new Event('statechange')); }
  get audio() { return this as unknown as AudioContext; }
}

afterEach(() => vi.useRealTimers());
describe('audio playback readiness', () => {
  it('accepts an already running context without another resume', async () => {
    const ctx = new Context(); ctx.state = 'running';
    expect(await resumeAudioContext(ctx.audio)).toBe('running');
    expect(ctx.resume).not.toHaveBeenCalled();
  });
  it('waits for actual running state, including a statechange before resume resolves', async () => {
    const ctx = new Context();
    const result = resumeAudioContext(ctx.audio);
    expect(ctx.resume).toHaveBeenCalledOnce();
    ctx.change('running');
    expect(await result).toBe('running');
  });
  it('bounds an indefinitely pending browser autoplay request and removes listeners', async () => {
    vi.useFakeTimers();
    const ctx = new Context(); const remove = vi.spyOn(ctx, 'removeEventListener');
    const result = resumeAudioContext(ctx.audio);
    await vi.advanceTimersByTimeAsync(1200);
    expect(await result).toBe('blocked');
    expect(remove).toHaveBeenCalledOnce();
    ctx.change('running'); // A later unrelated gesture must not start this attempt.
    expect(await result).toBe('blocked');
    expect(vi.getTimerCount()).toBe(0);
  });
  it('cancels pending work immediately and allows a fresh tap retry', async () => {
    vi.useFakeTimers();
    const ctx = new Context(); const controller = new AbortController();
    const pending = resumeAudioContext(ctx.audio, controller.signal);
    controller.abort();
    expect(await pending).toBe('cancelled');
    expect(vi.getTimerCount()).toBe(0);
    ctx.resume.mockImplementation(async () => ctx.change('running'));
    expect(await resumeAudioContext(ctx.audio)).toBe('running');
  });
  it('does not invoke resume for an already cancelled request', async () => {
    const ctx = new Context(); const controller = new AbortController(); controller.abort();
    expect(await resumeAudioContext(ctx.audio, controller.signal)).toBe('cancelled');
    expect(ctx.resume).not.toHaveBeenCalled();
  });
  it('distinguishes an explicit autoplay denial from audio errors', async () => {
    const ctx = new Context();
    ctx.resume.mockRejectedValue(Object.assign(new Error('denied'), { name: 'NotAllowedError' }));
    expect(await resumeAudioContext(ctx.audio)).toBe('blocked');
    ctx.resume.mockRejectedValue(new Error('device unavailable'));
    expect(await resumeAudioContext(ctx.audio)).toBe('error');
  });
  it('does not treat a resolved resume promise as proof of running', async () => {
    vi.useFakeTimers();
    const ctx = new Context(); ctx.resume.mockResolvedValue();
    const result = resumeAudioContext(ctx.audio);
    await vi.advanceTimersByTimeAsync(1200);
    expect(await result).toBe('blocked');
  });
  it('handles a closed context and synchronous failures without uncaught errors', async () => {
    const ctx = new Context(); ctx.state = 'closed';
    expect(await resumeAudioContext(ctx.audio)).toBe('error');
    ctx.state = 'suspended'; ctx.resume.mockImplementation(() => { throw new Error('failed'); });
    expect(await resumeAudioContext(ctx.audio)).toBe('error');
  });
});
