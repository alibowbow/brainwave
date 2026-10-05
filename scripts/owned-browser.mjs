/** Cleanup is limited to the BrowserServer and ChildProcess this run created. */
export function ownBrowserServer(server, { onError, onLog, closeTimeoutMs = 10_000, killTimeoutMs = 5_000 } = {}) {
  const child = server.process();
  if (!child?.pid) throw new Error('Launched BrowserServer must expose its owned ChildProcess PID');
  const state = { pid:child.pid, launchedAt:new Date().toISOString(), terminationConfirmed:false, forcedKill:false, events:[] };
  const log = (kind, fields = {}) => {
    const event = { kind, at:new Date().toISOString(), ...fields };
    state.events.push(event);onLog?.(event);
  };
  const markExit = (code, signal) => {
    if (state.terminationConfirmed) return;
    state.terminationConfirmed = true;
    state.exitCode = code;state.signal = signal;log('owned-browser-exit', { code, signal });
  };
  child.once('exit', markExit);
  if (child.exitCode !== null || child.signalCode !== null) markExit(child.exitCode, child.signalCode);
  log('owned-browser-created', { pid:child.pid });
  const bounded = async (work, timeoutMs, label) => {
    let timer;
    try { return await Promise.race([Promise.resolve().then(work),new Promise((_, reject) => { timer=setTimeout(() => reject(new Error(`${label} exceeded ${timeoutMs}ms`)), timeoutMs); })]); }
    finally { clearTimeout(timer); }
  };
  const fail = (stage, error) => {
    const message = String(error);log('owned-browser-cleanup-error', { stage, message });onError?.({ kind:'cleanup', stage, message });
  };
  let closing;
  return { state,
    close() {
      if (closing) return closing;
      closing = (async () => {
        let graceful = false;
        try {
          log('owned-browser-close-send');
          await bounded(() => server.close(), closeTimeoutMs, 'owned browser server close');
          if (!state.terminationConfirmed) throw new Error('BrowserServer.close resolved without owned ChildProcess exit confirmation');
          graceful = true;log('owned-browser-close-ack');
        } catch (error) { fail('graceful-close', error); }
        if (!graceful) {
          state.forcedKill = true;log('owned-browser-kill-send', { pid:child.pid });
          // Public Playwright API owns this process group; never search for or
          // signal another browser, and never infer ownership from global PIDs.
          try {
            await bounded(() => server.kill(), killTimeoutMs, 'owned browser server kill');
            if (!state.terminationConfirmed) throw new Error('BrowserServer.kill resolved without owned ChildProcess exit confirmation');
            log('owned-browser-kill-ack');
          } catch (error) { fail('forced-kill', error); }
        }
        if (!state.terminationConfirmed) fail('exit-unconfirmed', new Error('Owned Chromium termination remains unconfirmed'));
        state.finishedAt = new Date().toISOString();
        return state;
      })();
      return closing;
    },
  };
}
