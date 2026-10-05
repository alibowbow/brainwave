import { ownBrowserServer } from './owned-browser.mjs';
import { pressSceneControl } from './press-scene-control.mjs';
import { beginVerificationProvenance } from './verification-provenance.mjs';
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createColdObserver, installColdInputProbe } from './cold-autoplay.mjs';

const BASE = (process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173').replace(/\/?$/, '/');
const output = path.join(process.env.SCENE_SCREENSHOT_DIR || 'artifacts', 'links');
await mkdir(output, { recursive: true });
const provenance = await beginVerificationProvenance({ baseUrl: BASE, outputDirs: [process.env.SCENE_SCREENSHOT_DIR || 'artifacts'] });
const report = { provenance: provenance.data, cleanupErrors: [], status: 'running', startedAt: new Date().toISOString(), baseUrl: BASE, coldObservations: [], checks: [],
  policy: 'Native autoplay remains enabled. Raw CDP reads do not supply a gesture; first playback uses one hit-tested trusted mouse click.',
  fixture: 'Only hold-audio-test cancellation deliberately holds resume/state and later resolves that readiness signal. It is not native playback-success evidence.' };
const persist = () => writeFile(path.join(output, 'link-verification.json'), `${JSON.stringify(report, null, 2)}\n`);
await persist();
let currentStep = 'launch browser';
let owned;
const bounded = async (run, timeoutMs, label) => {
  let timer;
  try { return await Promise.race([run(), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} exceeded ${timeoutMs}ms`)), timeoutMs); })]); }
  finally { clearTimeout(timer); }
};
let cold;
const errors = [];
try {
const browserServer = await chromium.launchServer({
  executablePath: process.env.SCENE_BROWSER_PATH || undefined,
  headless: true,
  // Exercise the restrictive policy; never disable browser autoplay protection.
  args: ['--no-sandbox', '--autoplay-policy=document-user-activation-required'],
});
owned = ownBrowserServer(browserServer, {
  onError: error => { report.cleanupErrors.push(error); report.status = 'failed'; process.exitCode = 1; },
});
report.browserOwnership = owned.state;
await persist();
const interrupted = signal => {
  report.interrupted = signal; report.status = 'failed'; process.exitCode = 1;
  void persist().catch(error => report.cleanupErrors.push({ stage: 'signal-report', message: String(error) })).finally(() => owned.close());
};
process.once('SIGTERM', () => interrupted('SIGTERM'));
process.once('SIGINT', () => interrupted('SIGINT'));

const browser = await bounded(() => chromium.connect(browserServer.wsEndpoint()), 10_000, 'owned browser connect');
const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, serviceWorkers: 'block' });
await context.addInitScript(() => {
  const NativeContext = window.AudioContext;
  window.__audioContexts = [];
  window.__oscillatorsCreated = 0;
  window.__sessionGraphsCreated = 0;
  // Hold only the cancellation fixture in suspended state. History navigation
  // can legitimately unlock real audio before the next automation command.
  window.__holdAudio = location.search.includes('hold-audio-test=1');
  window.__resumeCalls = 0;
  window.__resumeRecords = [];
  window.__coldAudioSnapshot = () => ({
    contexts: window.__audioContexts.length, states: window.__audioContexts.map(audio => audio.state),
    analyserGraphs: window.__sessionGraphsCreated, oscillators: window.__oscillatorsCreated,
    resumeCount: window.__resumeCalls, resumeCalls: [...window.__resumeRecords], held: window.__holdAudio,
  });
  window.__heldResumes = [];
  window.AudioContext = class extends NativeContext {
    constructor(...args) { super(...args); window.__audioContexts.push(this); }
    get state() { return window.__holdAudio ? 'suspended' : super.state; }
    resume() {
      window.__resumeCalls++;
      window.__resumeRecords.push({ activeGesture: navigator.userActivation?.isActive ?? null, state: this.state, held: window.__holdAudio });
      return window.__holdAudio ? new Promise((resolve) => window.__heldResumes.push(resolve)) : super.resume();
    }
    createAnalyser() { window.__sessionGraphsCreated++; return super.createAnalyser(); }
    createOscillator() { window.__oscillatorsCreated++; return super.createOscillator(); }
  };
});
await context.addInitScript(installColdInputProbe);
const page = await context.newPage();
provenance.attach(page, 'application');
page.setDefaultTimeout(60_000);
cold = await createColdObserver(page, async observation => {
  report.coldObservations.push({ at: new Date().toISOString(), step: currentStep, ...observation });
  await persist();
}, { readyScenes: [{ title: '깊은 집중', hash: '#/play/focus',
  canvasSelector: '.rainy-window[data-state="ready"] .rainy-window-canvas' }] });
const checkpoint = async name => { report.checks.push({ name, status: 'passed' }); await persist(); };
page.on('pageerror', (error) => errors.push(error.message));
const hash = () => page.evaluate(() => location.hash);
const button = (name) => page.getByRole('button', { name, exact: true, includeHidden: true }).first();
const press = name => pressSceneControl(page, name, { record: evidence => (report.controlObservations ??= []).push(evidence) });
const playing = () => button('일시정지').waitFor({ state: 'attached' });
const stopped = () => button('재생').waitFor({ state: 'attached' });
const typeLink = async (address, expected = address) => {
  await page.evaluate((next) => { location.hash = next; }, address);
  await page.waitForFunction((expected) => location.hash === expected, expected);
};

  currentStep = 'cold focus autoplay and one native retry';
  for (let attempt = 0; attempt < 20; attempt++) {
    try { await page.goto(`${BASE}#/play/focus`); break; }
    catch (error) { if (attempt === 19) throw error; await new Promise((resolve) => setTimeout(resolve, 250)); }
  }
  // Cold focus link attempts resume, but a blocked context must not count time,
  // write a recent session, show Pause, create voices, or hide the tap fallback.
  const blocked = await cold.blocked('깊은 집중');
  assert.equal(blocked.hash, '#/play/focus');
  assert.equal(blocked.lastSession, null);
  assert.equal(blocked.audio.oscillators, 0);
  const initialTimer = blocked.timer;
  await cold.frozenTimer(blocked, 1500);
  const nativeInput = await cold.firstClick();
  report.nativeFirstClick = nativeInput;
  await playing();
  assert.equal(await page.getByRole('dialog').count(), 0); // exactly one tap
  const runningAudio = (await cold.read('running after native retry')).audio;
  assert.deepEqual(runningAudio.states, ['running']);
  assert.equal(runningAudio.contexts, 1);
  assert.equal(runningAudio.analyserGraphs, 1);
  assert.ok(runningAudio.resumeCalls.some(call => call.activeGesture === true && call.held === false));
  assert.match(await page.evaluate(() => JSON.parse(localStorage.getItem('mc_brain_last')).name), /깊은 집중/);
  await page.waitForFunction((before) => document.querySelector('[aria-label^="남은 시간"]')?.getAttribute('aria-label') !== before, initialTimer);

  await checkpoint(currentStep);
  currentStep = 'warm hash, copy and history';

  // Hash navigation can start immediately once normal browser policy permits.
  await typeLink('#/play/amb/cosmic');
  await page.waitForSelector('h1:has-text("우주 명상")');
  await playing();
  assert.equal(await page.locator('[data-playback-hint]').count(), 0);
  await page.evaluate(() => { window.__copied = null; navigator.clipboard.writeText = async (text) => { window.__copied = text; }; });
  await press('이 루틴 링크 복사');
  await page.waitForFunction(() => window.__copied);
  assert.equal(await page.evaluate(() => window.__copied), `${BASE}#/play/amb/cosmic`);

  // Back/Forward between different play links restores the correct preset.
  await page.goBack();
  await page.waitForSelector('h1:has-text("깊은 집중")');
  await playing();
  await page.goForward();
  await page.waitForSelector('h1:has-text("우주 명상")');
  await playing();
  const starts = await page.evaluate(() => window.__sessionGraphsCreated);
  await page.evaluate(() => window.dispatchEvent(new HashChangeEvent('hashchange')));
  await page.waitForTimeout(100);
  assert.equal(await page.evaluate(() => window.__sessionGraphsCreated), starts);
  assert.equal(await page.evaluate(() => window.__audioContexts.length), 1);

  // Returning to the same paused session must not auto-resume/reset it.
  await press('일시정지'); await stopped();
  await typeLink('#/guide');
  await page.goBack();
  await page.waitForSelector('h1:has-text("우주 명상")');
  await stopped();
  assert.equal(await page.evaluate(() => window.__sessionGraphsCreated), starts);

  await checkpoint(currentStep);
  currentStep = 'saved, last, reload and invalid links';

  // All link families use the same startup path, including device-local saves.
  await typeLink('#/play/nature/deep_sea');
  await page.waitForSelector('h1:has-text("깊은 바다")');
  await playing();
  assert.equal(await hash(), '#/play/nature/deep_sea');
  await page.evaluate(() => {
    const last = JSON.parse(localStorage.getItem('mc_brain_last'));
    localStorage.setItem('mc_brain_presets', JSON.stringify([{ ...last, id: 'link-test', name: '링크 테스트', createdAt: new Date().toISOString() }]));
  });
  await page.reload();
  // Reload can again require a gesture; accept either result according to the browser.
  const reloaded = await cold.waitUntil(s => s.headings.length > 0 && s.audio?.contexts === 1 && !s.hints.includes('starting') &&
    (s.hints.includes('blocked') || s.buttons.some(button => button.name === '일시정지')), 'reload readiness without observer activation');
  if (reloaded.hints.includes('blocked')) await cold.firstClick({ pristine: false });
  await playing();
  await typeLink('#/play/user/link-test');
  await page.waitForSelector('h1:has-text("링크 테스트")'); await playing();
  await typeLink('#/play/last');
  await page.waitForSelector('h1:has-text("링크 테스트")'); await playing();

  await typeLink('#/play/amb/nowhere', '');
  await page.waitForFunction(() => location.hash === '');
  assert.equal(await button('일시정지').count(), 0);
  assert.equal(await page.locator('[data-playback-hint]').count(), 0);

  await checkpoint(currentStep);
  currentStep = 'held readiness is cancelled by navigation';

  // Leaving while resume is pending cannot later start hidden sound.
  await page.goto('about:blank');
  await page.goto(`${BASE}?hold-audio-test=1#/play/relax`);
  const heldBlocked = await cold.waitUntil(s => s.hints.includes('blocked') && s.audio?.contexts === 1,
    'explicit held-resume fixture blocks');
  assert.equal(heldBlocked.audio.held, true);
  assert.equal(heldBlocked.audio.analyserGraphs, 0);
  assert.equal(heldBlocked.audio.oscillators, 0);
  const priorLast = heldBlocked.lastSession;
  const resumeCalls = heldBlocked.audio.resumeCount;
  await page.goBack();
  await cold.waitUntil(s => s.hash === '', 'Back leaves held route');
  // Observe the existing 1200ms pending window before load waits can consume it.
  await page.goForward({ waitUntil: 'domcontentloaded' });
  const pending = await cold.waitUntil(s => s.hints.includes('starting') && s.audio?.held && s.audio.resumeCount > 0,
    'Forward starts a held resume');
  // A full document reload resets instrumentation; BFCache restoration does not.
  const sameDocument = pending.documentOrigin === heldBlocked.documentOrigin;
  assert.ok(pending.audio.resumeCount > (sameDocument ? resumeCalls : 0), 'Forward must call resume in the observed document');
  assert.equal(pending.audio.analyserGraphs, 0);
  assert.equal(pending.audio.oscillators, 0);
  await cold.evaluateWithoutGesture('location.hash = "#/guide"');
  await cold.waitUntil(s => s.hash === '#/guide' && s.activeNavigation.some(text => text.includes('뇌파 가이드')) && s.hints.length === 0,
    'guide cancels pending startup');
  // Resolve the old readiness signal only after leaving. It must have no
  // listeners left that could create a graph or change the current page.
  await cold.evaluateWithoutGesture(`(() => {
    window.__holdAudio = false;
    for (const audio of window.__audioContexts) {
      Object.defineProperty(audio, 'state', { get: () => 'running' });
      audio.dispatchEvent(new Event('statechange'));
    }
    window.__heldResumes.forEach((resolve) => resolve());
  })()`);
  await new Promise(resolve => setTimeout(resolve, 1500));
  const cancelled = await cold.read('after deliberately releasing cancelled held readiness');
  assert.equal(cancelled.audio.oscillators, 0);
  assert.equal(cancelled.audio.analyserGraphs, 0);
  assert.equal(cancelled.lastSession, priorLast);
  assert.equal(cancelled.buttons.filter(button => button.name === '일시정지').length, 0);
  assert.equal(cancelled.hints.length, 0);
  await checkpoint(currentStep);

  assert.deepEqual(errors, []);
  report.status = 'passed';
} catch (error) {
  report.status = 'failed';
  report.failure = { step: currentStep, message: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined };
  try { report.failure.observation = await cold?.read('failure without observer activation'); }
  catch (observationError) { report.failure.observationError = String(observationError); }
  console.error(`FAIL: ${currentStep}: ${report.failure.message}`);
  process.exitCode = 1;
} finally {
  report.errors = errors;
  await persist();
  await owned?.close();
  try { if (!await provenance.finish()) { report.status = 'failed'; process.exitCode = 1; } }
  catch (error) { report.provenance.errors.push({ phase: 'final snapshot', message: String(error) }); report.status = 'failed'; process.exitCode = 1; }
  if (report.interrupted || report.cleanupErrors.length || !owned?.state.terminationConfirmed) { report.status = 'failed'; process.exitCode = 1; }
  report.finishedAt = new Date().toISOString();
  await persist();
  console.log(`Link verification report: ${path.join(output, 'link-verification.json')}`);
}

if (report.status === 'passed') console.log('PASS: cold-link autoplay policy fallback, one-tap retry, accurate timer/history, warm hash autoplay, all link families, Back/Forward, reload, idempotence, invalid links and cancelled startup.');
