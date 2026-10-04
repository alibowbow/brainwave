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
export async function createColdObserver(page, onObservation = () => {}) {
  const session = await page.context().newCDPSession(page);
  const evaluateWithoutGesture = async expression => {
    const result = await bounded(session.send('Runtime.evaluate', {
      expression, returnByValue: true, userGesture: false, awaitPromise: false,
    }), 5000, 'non-gesture observation');
    if (result.exceptionDetails) throw new Error(`Raw CDP observation failed: ${result.exceptionDetails.exception?.description || result.exceptionDetails.text}`);
    return result.result.value;
  };
  const read = async label => {
    const value = await evaluateWithoutGesture(snapshotExpression);
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
  const waitUntil = async (predicate, label, { pristine = false, timeoutMs = 60_000 } = {}) => {
    const start = Date.now(); let last, prior = '';
    while (Date.now() - start < timeoutMs) {
      last = await read();
      const signature = JSON.stringify({ url: last.url, hash: last.hash, headings: last.headings, hints: last.hints, states: last.audio?.states,
        scene: last.scene, graphs: last.audio?.analyserGraphs, starts: last.audio?.bufferSourceStarts, activation: last.activation, inputs: last.inputs.length });
      if (signature !== prior) { await onObservation({ label, snapshot: last }); prior = signature; }
      if (pristine) assertPristine(last);
      if (predicate(last)) return last;
      await delay(50);
    }
    throw new Error(`${label} did not settle within ${timeoutMs}ms: ${JSON.stringify(last)}`);
  };
  const blocked = async title => {
    const value = await waitUntil(s => s.headings.includes(title) && s.hints.includes('blocked') && s.audio?.contexts === 1,
      'cold route waits for blocked fallback', { pristine: true });
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
