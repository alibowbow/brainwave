import { afterEach, test, vi } from 'vitest';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import vm from 'node:vm';
import { createColdObserver, installColdReadyBinding } from './cold-autoplay.mjs';

afterEach(() => { vi.clearAllTimers(); vi.useRealTimers(); vi.restoreAllMocks(); });

// Unit policy tests: fake protocol/DOM only. These are not browser, renderer or autoplay evidence.
const title = '깊은 집중';
const scene = { title, hash: '#/play/focus', canvasSelector: '.rainy-window[data-state="ready"] .rainy-window-canvas' };
const url = `http://127.0.0.1:4173/${scene.hash}`;
const snapshot = () => ({ url, hash: scene.hash, headings: [title], hints: ['blocked'],
  activation: { isActive: false, hasBeenActive: false }, inputs: [],
  audio: { contexts: 1, states: ['suspended'], analyserGraphs: 0, bufferSourceStarts: 0, oscillators: 0, resumeCalls: [{ activeGesture: false }] },
  storageError: null, buttons: [{ name: '재생', disabled: false }], timer: '남은 시간 20:00' });
function fixture({ readyScenes = [scene], value = snapshot(), evaluate }: { readyScenes?: typeof scene[], value?: any, evaluate?: () => Promise<any> } = {}) {
  const calls: Array<{ method: string, params: any }> = [], observations: any[] = [];
  const session = Object.assign(new EventEmitter(), { send: async (method: string, params: any) => {
    calls.push({ method, params });
    if (method === 'Runtime.evaluate') return { result: { value: evaluate ? await evaluate() : value } };
    return {};
  } });
  const page = { url: () => url, context: () => ({ newCDPSession: async () => session }) };
  const binding = (overrides = {}) => session.emit('Runtime.bindingCalled', { name: '__brainwaveColdReady', payload: JSON.stringify({
    ...snapshot(), documentOrigin: 1000, wall: 123,
    candidates: [{ title, selector: scene.canvasSelector, ready: true, canvases: [{ width: 1280, height: 850, frames: '1' }] }], ...overrides,
  }) });
  return { session, calls, observations, binding, create: () => createColdObserver(page, (value?: any) => { observations.push(value); }, { readyScenes }) };
}

test('binding is installed before navigation without a current-document evaluation', async () => {
  const f = fixture(); await f.create();
  assert.deepEqual(f.calls.map(call => call.method), ['Page.enable', 'Runtime.enable', 'Runtime.addBinding', 'Page.addScriptToEvaluateOnNewDocument']);
  assert.ok(!f.calls.some(call => call.method === 'Runtime.evaluate'));
  assert.match(f.calls.at(-1).params.source, /rainy-window/);
});

test('buffered exact ready signal is consumed, then every fresh read is explicitly nonactivating', async () => {
  const f = fixture(), cold = await f.create(); f.binding();
  const result = await cold.blocked(title);
  assert.equal(result.timer, '남은 시간 20:00');
  const reads = f.calls.filter(call => call.method === 'Runtime.evaluate');
  assert.equal(reads.length, 1); assert.equal(reads[0].params.userGesture, false);
  assert.equal(reads[0].params.awaitPromise, false); assert.ok(!('timeout' in reads[0].params));
  assert.equal(f.observations[0].label, 'cold renderer ready binding');
});

test('wrong document/title readiness starts no raw reads and expires at the original 60s deadline', async () => {
  vi.useFakeTimers();
  const f = fixture(), cold = await f.create();
  f.binding({ url: url + '-wrong' });
  f.binding({ candidates: [{ title: 'wrong', ready: true }] });
  const start = Date.now(); let settled = false;
  const waiting = cold.waitUntil(() => true, 'unit startup', { readyTitle: title, pristine: true });
  void waiting.then(() => { settled = true; }, () => { settled = true; });
  const rejection = assert.rejects(waiting, /cold ready binding/);
  await vi.advanceTimersByTimeAsync(59_999); assert.equal(settled, false);
  await vi.advanceTimersByTimeAsync(1); await rejection;
  assert.equal(Date.now() - start, 60_000);
  assert.equal(f.calls.filter(call => call.method === 'Runtime.evaluate').length, 0);
});

test('binding and read share the original 60s deadline; readiness cannot buy another read budget', async () => {
  vi.useFakeTimers();
  const f = fixture({ evaluate: () => new Promise(resolve => setTimeout(() => resolve(snapshot()), 6000)) }), cold = await f.create();
  const start = Date.now(); let settled = false;
  const waiting = cold.waitUntil(() => true, 'unit startup', { readyTitle: title, pristine: true });
  void waiting.then(() => { settled = true; }, () => { settled = true; });
  const rejection = assert.rejects(waiting, /non-gesture observation exceeded 2000ms/);
  setTimeout(() => f.binding(), 58_000);
  await vi.advanceTimersByTimeAsync(57_999);
  assert.equal(f.calls.filter(call => call.method === 'Runtime.evaluate').length, 0);
  await vi.advanceTimersByTimeAsync(1);
  assert.equal(f.calls.filter(call => call.method === 'Runtime.evaluate').length, 1);
  await vi.advanceTimersByTimeAsync(1999); assert.equal(settled, false);
  await vi.advanceTimersByTimeAsync(1); await rejection;
  assert.equal(Date.now() - start, 60_000);
  assert.ok(!f.calls.some(call => call.method === 'Runtime.terminateExecution'));
  await vi.advanceTimersByTimeAsync(4000); // The late protocol reply is harmless, not execution-terminated.
});

test('after immediate readiness the original 5s fresh-read limit still applies', async () => {
  vi.useFakeTimers();
  const f = fixture({ evaluate: () => new Promise(resolve => setTimeout(() => resolve(snapshot()), 6000)) }), cold = await f.create();
  f.binding(); const start = Date.now(); let settled = false;
  const waiting = cold.blocked(title);
  void waiting.then(() => { settled = true; }, () => { settled = true; });
  const rejection = assert.rejects(waiting, /non-gesture observation exceeded 5000ms/);
  await vi.advanceTimersByTimeAsync(4999); assert.equal(settled, false);
  await vi.advanceTimersByTimeAsync(1); await rejection;
  assert.equal(Date.now() - start, 5000);
  await vi.advanceTimersByTimeAsync(1000);
});

test('a late protocol ACK fails the 5s bound even if its promise beats the delayed timeout callback', async () => {
  vi.useFakeTimers(); let monotonic = 0;
  vi.spyOn(performance, 'now').mockImplementation(() => monotonic);
  const f = fixture({ evaluate: async () => { monotonic += 5001; return snapshot(); } }), cold = await f.create();
  f.binding();
  await assert.rejects(cold.blocked(title), /non-gesture observation exceeded 5000ms.*ACK observed after 5001ms/);
  assert.ok(!f.calls.some(call => call.method === 'Runtime.terminateExecution'));
});

test('generic no-world history/guide waits do not require a ready canvas or binding', async () => {
  const value = { ...snapshot(), headings: [], hash: '#/guide', audio: null };
  const f = fixture({ readyScenes: [], value }), cold = await f.create();
  const result = await cold.waitUntil(s => s.hash === '#/guide', 'guide', { timeoutMs: 100 });
  assert.equal(result.hash, '#/guide');
  assert.deepEqual(f.calls.map(call => call.method), ['Runtime.evaluate']);
});

test('pre-ready input/audio violations remain failures even if the final ready sample looks pristine', async () => {
  const f = fixture(), cold = await f.create();
  f.binding({ candidates: [], inputs: [{ type: 'click', trusted: true }] });
  f.binding();
  await assert.rejects(cold.blocked(title), /no dispatched or trusted input/);
  assert.equal(f.calls.filter(call => call.method === 'Runtime.evaluate').length, 0);
});

test('DOM binding requires exact route, heading and one attached nonzero actual canvas', () => {
  const sent: any[] = []; let observer: any;
  class Canvas { isConnected = true; width = 1280; height = 850; dataset = { frames: '1' }; className = 'rainy-window-canvas'; }
  const canvas = new Canvas(), state = { title: 'wrong', canvases: [canvas] };
  const root: any = { __ready: value => sent.push(JSON.parse(value)), __coldAudioSnapshot: () => snapshot().audio, __coldInputProbe: [] }; root.top = root;
  const context = vm.createContext({ window: root, document: { querySelectorAll: selector => selector === 'h1' ? [{ textContent: state.title }] : state.canvases },
    location: { href: url, hash: scene.hash }, performance: { timeOrigin: 1000, now: () => 15 },
    navigator: { userActivation: { isActive: false, hasBeenActive: false } }, HTMLCanvasElement: Canvas,
    MutationObserver: class { disconnected = false; constructor(public callback: () => void) { observer = this; } observe() {} disconnect() { this.disconnected = true; } } });
  vm.runInContext(`(${installColdReadyBinding.toString()})('__ready', ${JSON.stringify([scene])})`, context);
  assert.equal(sent.at(-1).candidates[0].ready, false);
  state.title = title; canvas.width = 0; observer.callback(); assert.equal(sent.at(-1).candidates[0].ready, false);
  canvas.width = 1280; canvas.isConnected = false; observer.callback(); assert.equal(sent.at(-1).candidates[0].ready, false);
  canvas.isConnected = true; state.canvases = [canvas, new Canvas()]; observer.callback(); assert.equal(sent.at(-1).candidates[0].ready, false);
  state.canvases = [canvas]; context.location.hash = '#/guide'; observer.callback(); assert.equal(sent.at(-1).candidates.length, 0);
  context.location.hash = scene.hash; observer.callback(); assert.equal(sent.at(-1).candidates[0].ready, true);
  assert.equal(observer.disconnected, true);
});
