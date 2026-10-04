export type AudioReadyResult = 'running' | 'blocked' | 'cancelled' | 'error';

/** resume() can remain pending indefinitely when autoplay is blocked. Never
 * start a session clock (or create voices) until the context really runs. */
export function resumeAudioContext(
  context: AudioContext,
  signal?: AbortSignal,
  timeoutMs = 1200,
): Promise<AudioReadyResult> {
  if (signal?.aborted) return Promise.resolve('cancelled');
  if (context.state === 'running') return Promise.resolve('running');
  if (context.state === 'closed') return Promise.resolve('error');
  return new Promise((resolve) => {
    let settled = false;
    const finish = (result: AudioReadyResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      context.removeEventListener('statechange', onStateChange);
      signal?.removeEventListener('abort', onAbort);
      resolve(result);
    };
    const onStateChange = () => {
      if (context.state === 'running') finish('running');
      else if (context.state === 'closed') finish('error');
    };
    const onAbort = () => finish('cancelled');
    const timer = setTimeout(() => finish(context.state === 'running' ? 'running' : 'blocked'), timeoutMs);
    context.addEventListener('statechange', onStateChange);
    signal?.addEventListener('abort', onAbort, { once: true });
    // Invoke synchronously, inside the click handler when this is a tap retry.
    try {
      void context.resume().then(onStateChange, (error: unknown) => {
        finish((error as { name?: string })?.name === 'NotAllowedError' ? 'blocked' : 'error');
      });
    } catch {
      finish('error');
    }
  });
}
