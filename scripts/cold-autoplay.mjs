import assert from 'node:assert/strict';

/** Install before navigation. Observes real input; never invokes an audio API. */
export function installColdInputProbe() {
  window.__coldInputProbe = [];
  for (const type of ['pointerdown', 'pointerup', 'click', 'keydown']) {
    document.addEventListener(type, event => {
      const control = event.target instanceof Element ? event.target.closest('button') : null;
      let opacity = 1;
      for (let parent = control; parent; parent = parent.parentElement) opacity *= Number(getComputedStyle(parent).opacity);
      window.__coldInputProbe.push({ type, trusted: event.isTrusted, wall: performance.now(),
        activation: navigator.userActivation?.isActive ?? null,
        hint: document.querySelector('[data-playback-hint]')?.getAttribute('data-playback-hint') ?? null,
        audio: window.__coldAudioSnapshot?.() ?? null,
        control: control ? { name: control.getAttribute('aria-label') || control.textContent.trim(), disabled: control.disabled,
          inert: !!control.closest('[inert]'), visibility: getComputedStyle(control).visibility, effectiveOpacity: opacity,
          hit: 'clientX' in event ? control.contains(document.elementFromPoint(event.clientX, event.clientY)) : null } : null,
      });
    }, { capture: true });
  }
}

/** Lightweight native startup counters for renderer acceptance scripts. */
export function installNativeStartupAudioProbe() {
  const NativeContext = window.AudioContext;
  const evidence = { contexts: [], analyserGraphs: 0, bufferSourceStarts: 0, oscillators: 0, resumeCalls: [] };
  window.__coldAudioSnapshot = () => ({ ...evidence, contexts: evidence.contexts.length,
    states: evidence.contexts.map(context => context.state), resumeCalls: [...evidence.resumeCalls] });
  window.AudioContext = class extends NativeContext {
    constructor(...args) { super(...args); evidence.contexts.push(this); }
    resume() {
      evidence.resumeCalls.push({ activeGesture: navigator.userActivation?.isActive ?? null, state: this.state });
      return super.resume();
    }
    createAnalyser() { evidence.analyserGraphs++; return super.createAnalyser(); }
    createOscillator() { evidence.oscillators++; return super.createOscillator(); }
    createBufferSource() {
      const source = super.createBufferSource(), nativeStart = source.start.bind(source);
      source.start = (...args) => { evidence.bufferSourceStarts++; return nativeStart(...args); };
      return source;
    }
  };
}

/** Installed by CDP before navigation. DOM/data reads only: no layout, GL, input or audio calls. */
export function installColdReadyBinding(bindingName, scenes) {
  if (window !== window.top) return;
  let prior = '';
  const observe = () => {
    const headings = [...document.querySelectorAll('h1')].map(element => element.textContent.trim());
    const candidates = scenes.filter(scene => scene.hash === location.hash).map(scene => {
      const canvases = [...document.querySelectorAll(scene.canvasSelector)]
        .filter(canvas => canvas instanceof HTMLCanvasElement && canvas.isConnected && canvas.width > 0 && canvas.height > 0);
      return { title: scene.title, selector: scene.canvasSelector, ready: headings.includes(scene.title) && canvases.length === 1,
        canvases: canvases.map(canvas => ({ className: canvas.className, width: canvas.width, height: canvas.height,
          frames: canvas.dataset.frames ?? canvas.dataset.frame ?? null })) };
    });
    const value = { url: location.href, hash: location.hash, documentOrigin: performance.timeOrigin, wall: performance.now(),
      headings, candidates, hints: [...document.querySelectorAll('[data-playback-hint]')].map(element => element.getAttribute('data-playback-hint')), activation: { isActive: navigator.userActivation?.isActive ?? null, hasBeenActive: navigator.userActivation?.hasBeenActive ?? null },
      audio: window.__coldAudioSnapshot?.() ?? null, inputs: [...(window.__coldInputProbe ?? [])] };
    const signature = JSON.stringify({ hash: value.hash, headings, candidates, hints: value.hints, audio: value.audio, activation: value.activation, inputs: value.inputs.length });
    if (signature !== prior) { prior = signature; window[bindingName](JSON.stringify(value)); }
    // Keep collecting until renderer AND blocked audio readiness coincide in the same document.
    // Later history/guide waits stay generic; no extra startup budget or initial raw polling.
    if (candidates.some(candidate => candidate.ready) && value.hints.includes('blocked') &&
      value.audio?.contexts === 1 && value.audio.states?.length === 1 && value.audio.states[0] === 'suspended') observer.disconnect();
  };
  const observer = new MutationObserver(observe);
  observer.observe(document, { subtree: true, childList: true, characterData: true, attributes: true,
    attributeFilter: ['class', 'data-state', 'data-status', 'width', 'height', 'data-frame', 'data-frames', 'data-playback-hint'] });
  observe();
}

const snapshotExpression = `(() => {
  let lastSession = null, storageError = null;
  try { lastSession = localStorage.getItem('mc_brain_last'); } catch (error) { storageError = String(error); }
  return ({
  url: location.href, hash: location.hash, wall: performance.now(), documentOrigin: performance.timeOrigin, readyState: document.readyState,
  activation: { isActive: navigator.userActivation?.isActive ?? null, hasBeenActive: navigator.userActivation?.hasBeenActive ?? null },
  headings: [...document.querySelectorAll('h1')].map(e => e.textContent.trim()),
  activeNavigation: [...document.querySelectorAll('[aria-current="page"]')].map(e => e.textContent.trim()),
  hints: [...document.querySelectorAll('[data-playback-hint]')].map(e => e.getAttribute('data-playback-hint')),
  timer: document.querySelector('[aria-label^="남은 시간"]')?.getAttribute('aria-label') ?? null,
  dialogs: document.querySelectorAll('[role="dialog"]').length,
  buttons: [...document.querySelectorAll('button')].map(e => ({ name: e.getAttribute('aria-label') || e.textContent.trim(), disabled: e.disabled })),
  lastSession, storageError,
  audio: window.__coldAudioSnapshot?.() ?? null, scene: window.__coldSceneSnapshot?.() ?? null, inputs: [...(window.__coldInputProbe ?? [])]
}); })()`;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function bounded(promise, ms, label) {
  let timer;
  try { return await Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} exceeded ${ms}ms`)), ms); })]); }
  finally { clearTimeout(timer); }
}

/** Playwright injected locator/evaluate code can mark execution as userGesture.
 * This Chromium-only observer uses raw CDP until the real native mouse click.
 * All audio methods still run natively; no resume policy or state is changed.
 */
export async function createColdObserver(page, onObservation = () => {}, { readyScenes = [] } = {}) {
  const session = await page.context().newCDPSession(page);
  const bindingName = '__brainwaveColdReady';
  let readiness = [], documentOrigin = null;
  const listeners = new Set();
  session.on('Runtime.executionContextsCleared', () => { readiness = []; documentOrigin = null; });
  session.on('Runtime.bindingCalled', event => {
    if (event.name !== bindingName) return;
    const value = { ...JSON.parse(event.payload), nodeReceivedAt: Date.now() };
    if (value.documentOrigin !== documentOrigin) { readiness = []; documentOrigin = value.documentOrigin; }
    readiness.push(value);
    for (const listener of listeners) listener();
  });
  // addBinding/new-document script do not evaluate in a gesture-bearing execution context.
  // No current-document evaluation is needed: every caller installs this before page.goto().
  if (readyScenes.length) {
    // This CDP session must enable Page before its new-document script can run.
    await session.send('Page.enable');
    await session.send('Runtime.enable');
    await session.send('Runtime.addBinding', { name: bindingName });
    await session.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `(${installColdReadyBinding.toString()})(${JSON.stringify(bindingName)}, ${JSON.stringify(readyScenes)});`,
    });
  }
  let lastReadTiming;
  const evaluateWithoutGesture = async (expression, deadlineAt = Infinity) => {
    const finiteDeadline = Number.isFinite(deadlineAt);
    const remaining = finiteDeadline ? deadlineAt - Date.now() : 5000;
    if (remaining <= 0) throw new Error('cold observation reached the absolute startup deadline');
    const startedAt = performance.now();
    const timing = { phase: 'fresh-read', nodeRequestedAt: Date.now(), nodeAcknowledgedAt: null,
      nodeFinishedAt: null, elapsedMs: null, limitMs: remaining, deadlineAt: finiteDeadline ? deadlineAt : null,
      collectionWarningMs: 5000, delayedRead: null, userGesture: false, outcome: 'pending' };
    lastReadTiming = timing;
    const noteDelay = () => { timing.delayedRead ??= { nodeRecordedAt: Date.now(), elapsedMs: performance.now() - startedAt, continuedSameRequest: true }; };
    const warningTimer = finiteDeadline ? setTimeout(noteDelay, 5000) : undefined;
    const label = finiteDeadline ? 'non-gesture observation absolute deadline' : 'non-gesture observation';
    try {
      // Send once. The 5s collection warning neither abandons nor duplicates this request.
      const request = session.send('Runtime.evaluate', {
        expression, returnByValue: true, userGesture: false, awaitPromise: false,
      });
      const result = await bounded(request, remaining, label);
      timing.nodeAcknowledgedAt = Date.now();
      timing.elapsedMs = performance.now() - startedAt;
      // A delayed Node timer callback cannot turn an already-late ACK into a passing read.
      if (finiteDeadline && timing.elapsedMs >= 5000) noteDelay();
      if (timing.elapsedMs > remaining || (finiteDeadline && Date.now() >= deadlineAt)) throw new Error(`${label} exceeded ${remaining}ms (ACK observed after ${timing.elapsedMs}ms)`);
      if (result.exceptionDetails) throw new Error(`Raw CDP observation failed: ${result.exceptionDetails.exception?.description || result.exceptionDetails.text}`);
      timing.outcome = 'acknowledged';
      return result.result.value;
    } catch (error) {
      timing.outcome = String(error.message).startsWith(`${label} exceeded`) ? 'read-timeout' : 'read-error';
      timing.nodeFinishedAt = Date.now(); timing.elapsedMs = performance.now() - startedAt;
      error.message += ` [observationTiming=${JSON.stringify(timing)}]`;
      throw error;
    } finally {
      clearTimeout(warningTimer);
      timing.nodeFinishedAt = Date.now(); timing.elapsedMs = performance.now() - startedAt;
    }
  };
  const read = async (label, deadlineAt = Infinity) => {
    const value = await evaluateWithoutGesture(snapshotExpression, deadlineAt);
    value.observationTiming = { ...lastReadTiming };
    if (value.observationTiming.delayedRead) await onObservation({ label: 'delayed non-gesture read', timing: value.observationTiming });
    if (label) await onObservation({ label, snapshot: value });
    return value;
  };
  const assertNoGraph = value => {
    if (!value.audio) return;
    assert.equal(value.audio.analyserGraphs, 0, 'no audio graph before the first actual input');
    if ('bufferSourceStarts' in value.audio) assert.equal(value.audio.bufferSourceStarts, 0);
    if ('oscillators' in value.audio) assert.equal(value.audio.oscillators, 0);
  };
  const assertPristine = value => {
    assert.equal(value.activation.isActive, false, 'observer must not grant transient activation');
    assert.equal(value.activation.hasBeenActive, false, 'no user activation before native input');
    assert.equal(value.inputs.length, 0, 'no dispatched or trusted input before first native click');
    assertNoGraph(value);
    assert.ok((value.audio?.resumeCalls ?? []).every(call => call.activeGesture === false), 'no gesture-bearing resume before real input');
  };
  const waitForReady = async (title, deadlineAt, pristine) => {
    assert.ok(readyScenes.some(scene => scene.title === title), `cold ready selector must be configured for ${title}`);
    const selected = () => readiness.findLast(value => value.url === page.url() &&
      value.candidates.some(candidate => candidate.title === title && candidate.ready) && value.hints?.includes('blocked') &&
      value.audio?.contexts === 1 && value.audio.states?.length === 1 && value.audio.states[0] === 'suspended');
    const timing = { phase: 'ready-binding', nodeRequestedAt: Date.now(), nodeAcknowledgedAt: null, elapsedMs: null, deadlineAt };
    let pending;
    try {
      if (!selected()) await bounded(new Promise(resolve => {
        const changed = () => { if (selected()) resolve(); };
        listeners.add(changed);
        // Remove this listener on both success and deadline failure below.
        pending = changed;
      }), Math.max(0, deadlineAt - Date.now()), `cold ready binding for ${title}`);
      assert.ok(Date.now() < deadlineAt, 'ready binding must arrive within the original startup deadline');
      timing.nodeAcknowledgedAt = Date.now(); timing.elapsedMs = timing.nodeAcknowledgedAt - timing.nodeRequestedAt;
      const evidence = readiness.filter(value => value.url === page.url());
      if (pristine) for (const value of evidence) assertPristine(value);
      await onObservation({ label: 'cold renderer ready binding', title, timing, evidence, ready: selected() });
    } catch (error) {
      timing.elapsedMs = Date.now() - timing.nodeRequestedAt;
      await onObservation({ label: 'cold renderer ready binding failed', title, timing, evidence: readiness.filter(value => value.url === page.url()), message: String(error) });
      throw error;
    } finally { if (pending) listeners.delete(pending); }
  };
  const waitUntil = async (predicate, label, { pristine = false, timeoutMs = 60_000, readyTitle = '' } = {}) => {
    const deadlineAt = Date.now() + timeoutMs; let last, prior = '';
    // Binding collection and subsequent fresh reads share ONE deadline. A busy initialization
    // cannot spend a second budget, and no Runtime.evaluate is queued until actual readiness.
    if (readyTitle) await waitForReady(readyTitle, deadlineAt, pristine);
    while (Date.now() < deadlineAt) {
      last = await read(undefined, deadlineAt);
      assert.ok(Date.now() < deadlineAt, `${label} exceeded the absolute ${timeoutMs}ms startup deadline`);
      const signature = JSON.stringify({ url: last.url, hash: last.hash, headings: last.headings, hints: last.hints, states: last.audio?.states,
        scene: last.scene, graphs: last.audio?.analyserGraphs, starts: last.audio?.bufferSourceStarts, activation: last.activation, inputs: last.inputs.length });
      if (signature !== prior) { await onObservation({ label, snapshot: last }); prior = signature; }
      if (pristine) assertPristine(last);
      assert.ok(Date.now() < deadlineAt, `${label} exceeded the absolute ${timeoutMs}ms startup deadline`);
      if (predicate(last)) return last;
      await delay(Math.min(50, Math.max(0, deadlineAt - Date.now())));
    }
    throw new Error(`${label} did not settle within ${timeoutMs}ms: ${JSON.stringify(last)}`);
  };
  const blocked = async title => {
    const value = await waitUntil(s => s.headings.includes(title) && s.hints.includes('blocked') && s.audio?.contexts === 1,
      'cold route waits for blocked fallback', { pristine: true, readyTitle: title });
    assert.deepEqual(value.audio.states, ['suspended']);
    assert.equal(value.storageError, null, 'application storage remains readable');
    assert.equal(value.buttons.filter(x => x.name === '일시정지').length, 0);
    assert.ok(value.buttons.some(x => x.name === '재생'));
    assert.equal(typeof value.timer, 'string');
    return value;
  };
  const frozenTimer = async (before, durationMs) => {
    await delay(durationMs);
    const after = await read(`cold timer after ${durationMs}ms`);
    assertPristine(after); assert.deepEqual(after.audio.states, ['suspended']);
    assert.equal(after.storageError, null);
    assert.ok(after.hints.includes('blocked'));
    assert.equal(after.audio.contexts, 1); assert.equal(after.timer, before.timer);
    assert.equal(after.lastSession, before.lastSession, 'cold route must not write recent session');
    return after;
  };
  const firstClick = async ({ pristine = true } = {}) => {
    const before = await read('immediately before native first click');
    if (pristine) assertPristine(before); else assertNoGraph(before);
    assert.ok(before.hints.includes('blocked')); assert.equal(before.audio.contexts, 1);
    assert.deepEqual(before.audio.states, ['suspended']);
    const controls = await evaluateWithoutGesture(`(() => [...document.querySelectorAll('button')]
      .filter(e => (e.getAttribute('aria-label') || e.textContent.trim()) === '눌러서 재생' && e.getClientRects().length)
      .map(e => { const r = e.getBoundingClientRect(), x = r.x + r.width / 2, y = r.y + r.height / 2;
        let opacity = 1; for (let parent = e; parent; parent = parent.parentElement) opacity *= Number(getComputedStyle(parent).opacity);
        return { x, y, width: r.width, height: r.height, disabled: e.disabled, inert: !!e.closest('[inert]'),
          visibility: getComputedStyle(e).visibility, effectiveOpacity: opacity, hit: e.contains(document.elementFromPoint(x, y)),
          inViewport: x >= 0 && y >= 0 && x < innerWidth && y < innerHeight }; }))()`);
    assert.equal(controls.length, 1, 'one actual fallback control');
    const geometry = controls[0];
    assert.equal(geometry.disabled, false); assert.equal(geometry.inert, false); assert.equal(geometry.visibility, 'visible');
    assert.ok(geometry.effectiveOpacity > 0 && geometry.width > 0 && geometry.height > 0 && geometry.inViewport && geometry.hit,
      'first playback button must already be visibly hit-testable without injected locator actionability');
    // No Playwright locator/evaluate/waitForFunction or forced click before this input.
    await page.mouse.click(geometry.x, geometry.y);
    const after = await read('after native first click');
    const inputs = after.inputs.slice(before.inputs.length), down = inputs.filter(e => e.type === 'pointerdown');
    assert.equal(down.length, 1, 'exactly one native pointerdown');
    assert.equal(inputs.filter(e => e.type === 'click').length, 1, 'exactly one native click');
    assert.ok(inputs.every(e => e.trusted));
    assert.equal(down[0].control?.name, '눌러서 재생'); assert.equal(down[0].hint, 'blocked');
    assert.equal(down[0].control.hit, true); assert.equal(down[0].control.visibility, 'visible');
    assert.ok(down[0].control.effectiveOpacity > 0); assert.equal(down[0].control.disabled, false); assert.equal(down[0].control.inert, false);
    assert.equal(down[0].activation, true); assert.equal(down[0].audio.contexts, 1);
    assert.equal(down[0].audio.analyserGraphs, 0, 'no graph at the actual first input boundary');
    if ('bufferSourceStarts' in down[0].audio) assert.equal(down[0].audio.bufferSourceStarts, 0);
    if ('oscillators' in down[0].audio) assert.equal(down[0].audio.oscillators, 0);
    const evidence = { before, geometry, inputs, after };
    await onObservation({ label: 'verified native first click', evidence });
    return evidence;
  };
  return { read, blocked, frozenTimer, firstClick, waitUntil, evaluateWithoutGesture };
}
