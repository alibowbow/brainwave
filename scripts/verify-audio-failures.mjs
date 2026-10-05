import { ownBrowserServer } from './owned-browser.mjs';
import { pressSceneControl } from './press-scene-control.mjs';
import { beginVerificationProvenance } from './verification-provenance.mjs';
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createColdObserver, installColdInputProbe } from './cold-autoplay.mjs';

const BASE = (process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173').replace(/\/?$/, '/');
const output = path.join(process.env.SCENE_SCREENSHOT_DIR || 'artifacts', 'audio');
const audioPattern = '**/audio/nature/**';
const provenance = await beginVerificationProvenance({ baseUrl: BASE, outputDirs: [process.env.SCENE_SCREENSHOT_DIR || 'artifacts'] });
const report = { provenance: provenance.data, cleanupErrors: [],
  startedAt: new Date().toISOString(),
  baseUrl: BASE,
  scope: 'Existing application routes, native Web Audio and controlled HTTP 503 audio responses in isolated browser contexts.',
  evidenceScope: 'PCM measured at the existing pre-limiter master analyser. No human audition, speaker/headphone, perceptual quality, or output loudness claim.',
  policy: 'Browser autoplay policy remains enabled. Native AudioContext methods are observed, not replaced with successful fake playback.',
  recordingScope: 'Existing monsoon-eaves preset with every non-rain layer removed through its actual picker, leaving only the approved rain recording and disabled brainwave tone.',
  checks: [], errors: [], screenshots: [], requests: [], coldObservations: [], status: 'running',
};
let browser;
let owned;
let currentPage;
let currentStep = 'launch browser';
await mkdir(output, { recursive: true });
const coldObservers = new WeakMap();
const persist = () => writeFile(path.join(output, 'audio-failure-verification.json'), `${JSON.stringify(report, null, 2)}\n`);
await persist();

const check = async (name, run) => {
  currentStep = name;
  report.currentStep = name;
  await persist();
  const start = Date.now();
  const evidence = await run();
  report.checks.push({ name, status: 'passed', elapsedMs: Date.now() - start, evidence });
  await persist();
  console.log(`PASS: ${name}`);
  return evidence;
};

const capture = async (page, name) => {
  const filename = `${name}.png`;
  await page.screenshot({ path: path.join(output, filename), animations: 'disabled', timeout: 60_000 });
  report.screenshots.push(filename);
  return filename;
};

const observeNativeAudio = () => {
  const NativeContext = window.AudioContext;
  const evidence = { contexts: [], analysers: [], decodes: 0, decodeFailures: 0, bufferStarts: 0, media: [], resumes: [] };
  window.__audioFailureEvidence = evidence;
  window.__coldAudioSnapshot = () => ({
    contexts: evidence.contexts.length,
    states: evidence.contexts.map((context) => context.state),
    analyserGraphs: evidence.analysers.length,
    successfulDecodes: evidence.decodes,
    failedDecodes: evidence.decodeFailures,
    bufferSourceStarts: evidence.bufferStarts,
    resumeCalls: [...evidence.resumes],
    media: evidence.media.map(({ element, ...record }) => ({ ...record, currentTime: element.currentTime, paused: element.paused, readyState: element.readyState })),
  });
  window.AudioContext = class extends NativeContext {
    constructor(...args) { super(...args); evidence.contexts.push(this); }
    resume() {
      evidence.resumes.push({ activeGesture: navigator.userActivation?.isActive ?? null, state: this.state });
      return super.resume();
    }
    createAnalyser() {
      const analyser = super.createAnalyser();
      evidence.analysers.push(analyser);
      return analyser;
    }
    decodeAudioData(...args) {
      return super.decodeAudioData(...args).then((buffer) => {
        evidence.decodes += 1;
        return buffer;
      }, (error) => {
        evidence.decodeFailures += 1;
        throw error;
      });
    }
    createBufferSource() {
      const source = super.createBufferSource();
      const nativeStart = source.start.bind(source);
      source.start = (...args) => { evidence.bufferStarts += 1; return nativeStart(...args); };
      return source;
    }
    createMediaElementSource(element) {
      const record = { element, url: element.src, playingEvents: 0, errorEvents: 0 };
      element.addEventListener('playing', () => { record.playingEvents += 1; });
      element.addEventListener('error', () => { record.errorEvents += 1; });
      evidence.media.push(record);
      return super.createMediaElementSource(element);
    }
  };
};

// Raw CDP preserves the initial autoplay precondition and failure diagnostics.
const audioSnapshot = async (page) => (await coldObservers.get(page).read()).audio;

const measurePcm = async (page, samples = 12) => {
  const measurements = [];
  for (let index = 0; index < samples; index++) {
    measurements.push(await page.evaluate(() => {
      const analyser = window.__audioFailureEvidence.analysers.at(-1);
      if (!analyser) throw new Error('No real session analyser exists');
      const data = new Float32Array(analyser.fftSize);
      analyser.getFloatTimeDomainData(data);
      let peak = 0;
      let energy = 0;
      for (const value of data) { peak = Math.max(peak, Math.abs(value)); energy += value * value; }
      return { peak, rms: Math.sqrt(energy / data.length) };
    }));
    await page.waitForTimeout(100);
  }
  return { samples: measurements.length, intervalMs: 100, maxPeak: Math.max(...measurements.map((sample) => sample.peak)), maxRms: Math.max(...measurements.map((sample) => sample.rms)) };
};

const newCase = async (name) => {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
  await context.addInitScript(observeNativeAudio);
  await context.addInitScript(installColdInputProbe);
  const page = await context.newPage();
  provenance.attach(page, 'application');
  currentPage = page;
  page.setDefaultTimeout(60_000);
  coldObservers.set(page, await createColdObserver(page, async (observation) => {
    report.coldObservations.push({ case: name, at: new Date().toISOString(), ...observation });
    await persist();
  }, { readyScenes: [
    { title: '대나무숲', hash: '#/play/nature/bamboo_grove', canvasSelector: '[data-immersive-world-id="nature:bamboo_grove"] .living-woods[data-status="ready"] .living-woods-canvas' },
    { title: '장마철 처마', hash: '#/play/nature/monsoon_eaves', canvasSelector: '[data-immersive-world-id="nature:monsoon_eaves"] .rain-shelter[data-state="ready"] .rain-shelter-canvas' },
  ] }));
  page.on('pageerror', (error) => report.errors.push({ case: name, message: error.message }));
  page.on('response', (response) => {
    if (response.url().includes('/audio/nature/')) report.requests.push({ case: name, kind: 'response', status: response.status(), url: response.url() });
  });
  const blocked = [];
  const failAudio = async (route) => {
    const request = { case: name, kind: 'injected-503', url: route.request().url(), resourceType: route.request().resourceType() };
    blocked.push(request);
    report.requests.push(request);
    await route.fulfill({ status: 503, contentType: 'audio/mpeg', body: '' });
  };
  await page.route(audioPattern, failAudio);
  return { context, page, blocked, failAudio };
};

const startWithGesture = async (page, route, title) => {
  await page.goto(`${BASE}${route}`);
  const cold = coldObservers.get(page);
  // Even locator waits can grant activation via injected Runtime.callFunctionOn.
  // Only raw Runtime.evaluate(userGesture:false) may inspect this cold document.
  const blocked = await cold.blocked(title);
  const before = blocked.audio;
  assert.equal(blocked.lastSession, null, 'cold isolated route must not persist a session before playback');
  await cold.frozenTimer(blocked, 1300);
  const nativeInput = await cold.firstClick();
  await page.getByRole('button', { name: '일시정지', exact: true, includeHidden: true }).first().waitFor({ state: 'attached' });
  await page.waitForFunction(() => window.__audioFailureEvidence.contexts[0]?.state === 'running' && window.__audioFailureEvidence.analysers.length === 1);
  assert.equal(await page.getByRole('dialog').count(), 0, 'one playback tap must not introduce a second dialog');
  const after = await audioSnapshot(page);
  assert.equal(after.contexts, 1);
  assert.ok(after.resumeCalls.some((call) => call.activeGesture === true), 'native resume must occur within the actual user gesture');
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('mc_brain_last')).brainwaveEnabled), false, 'nature-only fixture must have no audible brainwave tone');
  return { before, after, route, nativeInput, oneTrustedTap: true };
};

const press = (page, name) => pressSceneControl(page, name, { record: evidence => (report.controlObservations ??= []).push(evidence) });
const waitForRequests = async (page, blocked, required) => {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (required.every((file) => blocked.some((request) => new URL(request.url).pathname.endsWith(`/${file}`)))) return;
    await page.waitForTimeout(100);
  }
  assert.fail(`Expected injected failures did not occur for: ${required.join(', ')}`);
};

const bounded = async (run, timeoutMs, label) => {
  let timer;
  try { return await Promise.race([run(), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} exceeded ${timeoutMs}ms`)), timeoutMs); })]); }
  finally { clearTimeout(timer); }
};

try {
  const browserServer = await chromium.launchServer({
    executablePath: process.env.SCENE_BROWSER_PATH || undefined,
    headless: true,
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

  browser = await bounded(() => chromium.connect(browserServer.wsEndpoint()), 10_000, 'owned browser connect');

  const hybrid = await newCase('hybrid procedural fallback');
  await check('hybrid session waits for one trusted gesture before creating its graph', () => startWithGesture(hybrid.page, '#/play/nature/bamboo_grove', '대나무숲'));
  await check('hybrid recording failures preserve real procedural output', async () => {
    const expected = ['mountain-wind-cc0-v2.mp3', 'forest-birds-alishan-cc0-v2.mp3', 'creek-brook-cc0-v3.mp3'];
    await waitForRequests(hybrid.page, hybrid.blocked, expected);
    await hybrid.page.waitForTimeout(1000);
    const audio = await audioSnapshot(hybrid.page);
    assert.equal(audio.successfulDecodes, 0, 'no recorded sample can have succeeded through the injected failures');
    assert.equal(audio.media.length, 0, 'these hybrid layers use their procedural path when decoding fails');
    assert.ok(audio.bufferSourceStarts > 0);
    assert.equal(audio.contexts, 1);
    assert.equal(await hybrid.page.locator('[data-sound-error]').count(), 0, 'working procedural fallback must not report total playback failure');
    const pcm = await measurePcm(hybrid.page);
    assert.ok(pcm.maxRms > 0.000001, `procedural mix must produce nonzero PCM after sample failure (${pcm.maxRms})`);
    return { failedFiles: expected, audio, pcm, screenshot: await capture(hybrid.page, 'hybrid-fallback') };
  });
  await bounded(() => hybrid.context.close(), 10_000, 'hybrid context close');

  const recording = await newCase('recording-only rain');
  const page = recording.page;
  await check('recording-only test starts through one trusted playback gesture', () => startWithGesture(page, '#/play/nature/monsoon_eaves', '장마철 처마'));
  await check('real picker isolates rain and player shows its actionable failure', async () => {
    await waitForRequests(page, recording.blocked, ['rain-jun-v1.mp3']);
    await page.locator('[data-sound-error="rain"]').waitFor();
    await press(page, '세션 세부 조절 열기');
    // Fresh immersive profiles may include quiet stream alongside eaves/rain.
    // Isolate the intended recording using the actual picker; retain the strict
    // selected-length, silence, retry and single-context assertions below.
    const activeOptions = page.locator('.sound-option[aria-pressed="true"]');
    const removeNames = (await activeOptions.allTextContents()).filter(text => !/빗소리/.test(text));
    for (const text of removeNames) {
      const option = page.locator('.sound-option').filter({ hasText: text });
      assert.equal(await option.count(), 1, 'one exact selected source to remove');
      await option.click();
      assert.equal(await option.getAttribute('aria-pressed'), 'false');
    }
    const selected = await page.locator('.sound-option[aria-pressed="true"]').allTextContents();
    assert.equal(selected.length, 1);
    assert.match(selected[0], /빗소리/);
    await press(page, '세션 조절 닫기');
    await page.evaluate(() => window.scrollTo(0, 0));
    const notice = page.locator('[data-sound-error="rain"]');
    assert.ok(await notice.isVisible());
    assert.ok(await notice.getByRole('button', { name: '빗소리 다시 불러오기', exact: true }).isVisible());
    // Let the removed eaves fade and its finite convolution tail fully finish.
    await page.waitForTimeout(4200);
    const pcm = await measurePcm(page);
    assert.ok(pcm.maxPeak < 0.0000001, `unavailable recording must not revive the muted synthesized rain (${pcm.maxPeak})`);
    const audio = await audioSnapshot(page);
    assert.equal(audio.successfulDecodes, 0);
    assert.equal(audio.contexts, 1);
    assert.ok(audio.media.some((media) => media.url.endsWith('/rain-jun-v1.mp3') && media.errorEvents > 0));
    return { selected, pcm, audio, screenshot: await capture(page, 'rain-player-failure'), synthesisScope: 'No audible procedural-rain fallback at the master analyser; internal muted generators are not claimed absent.' };
  });
  await check('immersive view keeps one actionable notice and retries in the existing AudioContext', async () => {
    await press(page, '전체 화면 보기');
    const immersive = page.getByRole('dialog', { name: '몰입 화면', exact: true });
    const notice = immersive.locator('[data-sound-error="rain"]');
    await notice.waitFor();
    assert.equal(await page.locator('[data-sound-error="rain"]').count(), 1, 'covered player notice must not duplicate the immersive notice');
    const before = await audioSnapshot(page);
    const oldRequests = recording.blocked.length;
    await notice.getByRole('button', { name: '빗소리 다시 불러오기', exact: true }).click();
    for (let attempt = 0; attempt < 100 && recording.blocked.length === oldRequests; attempt++) await page.waitForTimeout(100);
    assert.ok(recording.blocked.length > oldRequests, 'retry must request the same unavailable recording again');
    await notice.waitFor();
    const after = await audioSnapshot(page);
    assert.equal(after.contexts, 1, 'retry must reuse the application AudioContext');
    assert.equal(after.analyserGraphs, before.analyserGraphs, 'one failed layer retry must not rebuild the whole session');
    assert.equal(after.successfulDecodes, 0);
    const pcm = await measurePcm(page);
    assert.ok(pcm.maxPeak < 0.0000001, 'repeated failure must remain silent instead of substituting synthesized rain');
    return { before, after, pcm, screenshot: await capture(page, 'rain-immersive-failure') };
  });
  await check('unrouting the failure and one trusted retry restores the same recording', async () => {
    await page.unroute(audioPattern, recording.failAudio);
    const immersive = page.getByRole('dialog', { name: '몰입 화면', exact: true });
    await immersive.getByRole('button', { name: '빗소리 다시 불러오기', exact: true }).click();
    await page.waitForFunction(() => {
      const evidence = window.__audioFailureEvidence;
      return evidence.decodes > 0 || evidence.media.some((media) => media.playingEvents > 0 && media.element.currentTime > 0.1);
    });
    await page.waitForFunction(() => !document.querySelector('[data-sound-error="rain"]'));
    await page.waitForTimeout(1800);
    const pcm = await measurePcm(page);
    assert.ok(pcm.maxRms > 0.000001, 'recovered real recording must contribute nonzero PCM');
    const audio = await audioSnapshot(page);
    assert.equal(audio.contexts, 1);
    assert.equal(audio.analyserGraphs, 1);
    assert.ok(audio.media.every((media) => media.url.endsWith('/rain-jun-v1.mp3')), 'every recording attempt must keep the approved rain URL');
    assert.ok(report.requests.some((request) => request.case === 'recording-only rain' && request.kind === 'response' && request.status >= 200 && request.status < 300 && new URL(request.url).pathname.endsWith('/rain-jun-v1.mp3')));
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('[aria-label="몰입 화면"]'));
    assert.equal(await page.locator('[data-sound-error]').count(), 0);
    return { audio, pcm, screenshot: await capture(page, 'rain-recovered-player'), recovery: 'Same local recording, native media/buffer playback, no context replacement.' };
  });
  await check('no uncaught audio runtime failures beyond injected network responses', () => {
    assert.deepEqual(report.errors, []);
    return { errors: [], injectedResponsesAreExpected: true };
  });
  await bounded(() => recording.context.close(), 10_000, 'recording context close');
  report.status = 'passed';
} catch (error) {
  report.status = 'failed';
  report.failure = { step: currentStep, message: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined };
  if (currentPage && !currentPage.isClosed()) {
    // Preserve the non-gesture state before screenshot/diagnostic work.
    try {
      report.failure.cold = await coldObservers.get(currentPage)?.read('failure before screenshot');
      report.failure.audio = report.failure.cold?.audio;
      await persist();
    } catch (observationError) { report.failure.observationError = String(observationError); }
    try { await capture(currentPage, 'audio-failure'); } catch (captureError) { report.failure.captureError = String(captureError); }
  }
  console.error(`FAIL: ${currentStep}: ${report.failure.message}`);
  process.exitCode = 1;
} finally {
  await persist();
  await owned?.close();
  try { if (!await provenance.finish()) { report.status = 'failed'; process.exitCode = 1; } }
  catch (error) { report.provenance.errors.push({ phase: 'final snapshot', message: String(error) }); report.status = 'failed'; process.exitCode = 1; }
  if (report.interrupted || report.cleanupErrors.length || !owned?.state.terminationConfirmed) { report.status = 'failed'; process.exitCode = 1; }
  report.finishedAt = new Date().toISOString();
  await persist();
  console.log(`Audio failure report: ${path.join(output, 'audio-failure-verification.json')}`);
}
