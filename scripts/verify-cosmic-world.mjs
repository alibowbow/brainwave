import { ownBrowserServer } from './owned-browser.mjs';
import { beginVerificationProvenance } from './verification-provenance.mjs';
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { captureScenePng } from './capture-scene.mjs';
import { verifySceneStill } from './verify-scene-still.mjs';
import { createColdObserver, installColdInputProbe, installNativeStartupAudioProbe } from './cold-autoplay.mjs';

const BASE = (process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173').replace(/\/?$/, '/');
const output = path.join(process.env.SCENE_SCREENSHOT_DIR || 'artifacts', 'worlds');
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'fold-cover', width: 344, height: 882 },
  { name: 'fold-inner', width: 768, height: 1024 },
  { name: 'landscape', width: 1024, height: 768 },
];
const provenance = await beginVerificationProvenance({ baseUrl: BASE, outputDirs: [process.env.SCENE_SCREENSHOT_DIR || 'artifacts'] });
const report = {
  provenance: provenance.data,
  cleanupErrors: [],
  startedAt: new Date().toISOString(), baseUrl: BASE,
  historicalOwnerCheckpoint: 'a0178faaf919a07cd04bdf53a5efa476b58b8e5e',
  renderer: 'Headless Chromium with SwiftShader; no physical device or FPS claim.',
  captureMethod: 'Native Chromium compositor, lossless PNG fast encoding, unchanged viewport and rendering quality.',
  renderEvidence: 'Frame/draw/triangle counters demonstrate submitted rendering, not GPU completion. PNG capture and human visual review are separate evidence.',
  scope: 'Actual amb:cosmic application route first, then the rebuilt standalone pilot. Fold-like CSS viewports only.',
  visibilityScope: 'Injected document.hidden getter plus visibilitychange; not an actual background-tab test.',
  fullscreenScope: 'Application CSS immersive overlay and standalone second holder, not the native Fullscreen API.',
  contextScope: 'Native WebGL contexts are observed without replacing rendering; one live cosmic scene context is required and disposal must actually lose it.',
  audioScope: 'Only existing session playback gating is tested. No touch-to-audio callback, new sound, or audio audition is claimed.',
  visualReview: 'Saved PNGs require human visual review; no automated artistic-quality or audio-audition claim.',
  coldObservations: [], checks: [], screenshots: [], captureAttempts: [], captureErrors: [], errors: [], functionalStatus: 'running', visualEvidenceStatus: 'pending', status: 'running',
};
let browser;
let owned;
let currentPage;
const coldObservers = new WeakMap();
let step = 'launch browser';
let consecutiveCaptureFailures = 0;
const blockedCapturePages = new WeakSet();
await mkdir(output, { recursive: true });
const saveReport = () => writeFile(path.join(output, 'cosmic-verification.json'), `${JSON.stringify(report, null, 2)}\n`);
const bounded = async (operation, timeoutMs, label) => {
  let timer;
  try {
    return await Promise.race([
      operation,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(Object.assign(new Error(`${label} exceeded ${timeoutMs} ms`), { code: 'SCENE_CHECK_TIMEOUT' })), timeoutMs);
      }),
    ]);
  } finally { clearTimeout(timer); }
};

const check = async (name, run) => {
  step = name;
  const start = Date.now();
  report.activeStage = name;
  console.log(`START: ${name}`);
  await saveReport();
  const captureFailuresBefore = report.captureErrors.length;
  // Playwright's default timeout does not bound evaluate/viewport operations.
  // Four independent PNG attempts need a larger enclosing budget.
  const timeoutMs = name.includes('screenshots') ? 600_000 : 300_000;
  const evidence = await bounded(run(), timeoutMs, name);
  const status = report.captureErrors.length > captureFailuresBefore ? 'incomplete-visual-evidence' : 'passed';
  report.checks.push({ name, status, functionalStatus: 'passed', elapsedMs: Date.now() - start, evidence });
  await saveReport();
  console.log(`${status === 'passed' ? 'PASS' : 'INCOMPLETE CAPTURE'}: ${name}`);
  return evidence;
};
const capture = async (page, name) => {
  const filename = `${name}.png`;
  const attempt = { filename, step, startedAt: new Date().toISOString(), status: 'pending' };
  report.captureAttempts.push(attempt);
  console.log(`CAPTURE START: ${filename}`);
  await saveReport();
  const skipReason = blockedCapturePages.has(page)
    ? 'Capture not run: an earlier timeout may still have GPU work queued on this page.'
    : consecutiveCaptureFailures >= 2 ? 'Capture not run after two consecutive non-timeout capture failures on this page.' : null;
  try {
    if (skipReason) throw new Error(`${skipReason} Functional checks continue; visual evidence remains incomplete.`);
    const image = await captureScenePng(page, path.join(output, filename));
    const viewport = page.viewportSize();
    assert.equal(image.width, viewport.width, 'PNG must preserve the requested viewport width');
    assert.equal(image.height, viewport.height, 'PNG must preserve the requested viewport height');
    consecutiveCaptureFailures = 0;
    attempt.status = 'captured';
    attempt.finishedAt = new Date().toISOString();
    report.screenshots.push({ filename, ...image });
    await saveReport();
    console.log(`CAPTURE SAVED: ${filename} (${image.width}x${image.height})`);
    return { status: 'captured', filename, ...image };
  } catch (error) {
    if (!skipReason) consecutiveCaptureFailures += 1;
    if (error?.code === 'SCENE_CAPTURE_TIMEOUT') blockedCapturePages.add(page);
    attempt.status = skipReason ? 'not-run' : 'failed';
    attempt.finishedAt = new Date().toISOString();
    const result = { status: attempt.status, filename, step, message: error instanceof Error ? error.message : String(error), code: error?.code, captureStage: error?.captureStage };
    report.captureErrors.push(result);
    await saveReport();
    console.error(`CAPTURE INCOMPLETE: ${filename}: ${result.message}`);
    return result;
  }
};
const createPage = async (surface) => {
  consecutiveCaptureFailures = 0;
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
  await context.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    window.__cosmicVerificationContexts = [];
    HTMLCanvasElement.prototype.getContext = function (...args) {
      const result = getContext.apply(this, args);
      if (result && /^(webgl2?|experimental-webgl)$/.test(args[0]) && !window.__cosmicVerificationContexts.some((entry) => entry.context === result)) {
        window.__cosmicVerificationContexts.push({ canvas: this, context: result });
      }
      return result;
    };
    window.__coldSceneSnapshot = () => {
      const root = document.querySelector('.cosmic-world'), canvas = document.querySelector('.cosmic-world-canvas');
      const rect = canvas?.getBoundingClientRect();
      return { state: root?.dataset.state ?? null, count: document.querySelectorAll('.cosmic-world-canvas').length,
        landscapeCount: document.querySelectorAll('.landscape').length,
        data: canvas ? { ...canvas.dataset, width: canvas.width, height: canvas.height, cssWidth: rect.width, cssHeight: rect.height,
          devicePixelRatio, motion: root?.dataset.motion } : null,
        contexts: window.__cosmicVerificationContexts.map(({ canvas, context }) => ({
          kind: canvas.classList.contains('cosmic-world-canvas') ? 'scene' : 'capability-probe-or-other',
          className: canvas.className, connected: canvas.isConnected, lost: context.isContextLost(), disposed: canvas.dataset.disposed ?? null,
        })),
      };
    };
  });
  await context.addInitScript(installNativeStartupAudioProbe);
  await context.addInitScript(installColdInputProbe);
  const page = await context.newPage();
  provenance.attach(page, surface);
  currentPage = page;
  page.setDefaultTimeout(120_000);
  coldObservers.set(page, await createColdObserver(page, async observation => {
    report.coldObservations.push({ surface, at: new Date().toISOString(), ...observation });
    await saveReport();
  }));
  page.on('pageerror', (error) => report.errors.push({ surface, kind: 'runtime', message: error.message }));
  page.on('console', (message) => {
    if (message.type() === 'error' && /three|webgl|shader|program|framebuffer/i.test(message.text())) report.errors.push({ surface, kind: 'renderer', message: message.text() });
  });
  return { context, page };
};
const contexts = (page) => page.evaluate(() => window.__cosmicVerificationContexts.map(({ canvas, context }) => ({
  kind: canvas.classList.contains('cosmic-world-canvas') ? 'scene' : 'capability-probe-or-other',
  className: canvas.className, connected: canvas.isConnected, lost: context.isContextLost(), disposed: canvas.dataset.disposed ?? null,
})));
const snapshot = (page) => page.evaluate(() => {
  const canvas = document.querySelector('.cosmic-world-canvas');
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  return {
    ...canvas.dataset, width: canvas.width, height: canvas.height, cssWidth: rect.width, cssHeight: rect.height,
    devicePixelRatio, motion: canvas.closest('.cosmic-world')?.dataset.motion,
  };
});
const ready = async (page, coldStart = false) => {
  let data, gpu, landscapeCount;
  if (coldStart) {
    // Preserve the existing 240s scene-readiness budget without injected polling.
    const observed = await coldObservers.get(page).waitUntil(s => ['ready', 'failed'].includes(s.scene?.state),
      'cosmic cold renderer readiness', { pristine: true, timeoutMs: 240_000 });
    assert.equal(observed.scene.state, 'ready', 'cosmic must render instead of showing unsupported fallback');
    assert.equal(observed.scene.count, 1);
    data = observed.scene.data; gpu = observed.scene.contexts; landscapeCount = observed.scene.landscapeCount;
  } else {
    await page.waitForFunction(() => ['ready', 'failed'].includes(document.querySelector('.cosmic-world')?.dataset.state), undefined, { timeout: 240_000 });
    assert.equal(await page.locator('.cosmic-world').first().getAttribute('data-state'), 'ready', 'cosmic must render instead of showing unsupported fallback');
    assert.equal(await page.locator('.cosmic-world-canvas').count(), 1);
    data = await snapshot(page); gpu = await contexts(page);
  }
  assert.equal(data.renderer, 'three-webgl2');
  assert.ok(Number(data.frame) > 0 && Number(data.drawCalls) > 0 && Number(data.triangles) > 0, 'real geometry draw calls must be submitted');
  assert.equal(gpu.filter((entry) => entry.kind === 'scene' && !entry.lost).length, 1);
  assert.ok(gpu.filter((entry) => entry.kind !== 'scene').every((entry) => entry.lost), 'capability probes must release their contexts');
  return { data, contexts: gpu, ...(coldStart ? { landscapeCount } : {}) };
};
const frozen = async (page) => {
  await page.waitForFunction(() => {
    const canvas = document.querySelector('.cosmic-world-canvas');
    return canvas?.dataset.running === 'false' && canvas.closest('.cosmic-world')?.dataset.motion === 'paused';
  });
  return verifySceneStill(page, '.cosmic-world-canvas', snapshot);
};
const running = async (page) => {
  await page.waitForFunction(() => {
    const canvas = document.querySelector('.cosmic-world-canvas');
    return canvas?.dataset.running === 'true' && canvas.closest('.cosmic-world')?.dataset.motion === 'running';
  });
  const before = await snapshot(page);
  await page.waitForFunction((frame) => Number(document.querySelector('.cosmic-world-canvas')?.dataset.frame) > frame, Number(before.frame));
  return { before, after: await snapshot(page) };
};
const revealChrome = async page => {
  const surface = page.locator('section[data-scene-surface]').first();
  if (await surface.count()) {
    const box = await surface.boundingBox();
    if (box) await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  }
};
const press = async (page, name) => {
  await revealChrome(page);
  await page.getByRole('button', { name, exact: true, includeHidden: true }).first().click();
};
const remember = (page) => page.evaluate(() => { window.__savedCosmicVerificationCanvas = document.querySelector('.cosmic-world-canvas'); });
const finalDisposal = async (page) => {
  await page.waitForFunction(() => !document.querySelector('.cosmic-world-canvas'));
  assert.equal(await page.evaluate(() => window.__savedCosmicVerificationCanvas.dataset.running), 'false');
  const start = Date.now();
  await page.waitForTimeout(5100);
  await page.waitForFunction(() => window.__savedCosmicVerificationCanvas.dataset.disposed === 'true', undefined, { polling: 100, timeout: 120_000 });
  const gpu = await contexts(page);
  assert.equal(gpu.filter((entry) => entry.kind === 'scene' && !entry.lost).length, 0);
  return { waitedAfterRemovalMs: Date.now() - start, disposed: await page.evaluate(() => window.__savedCosmicVerificationCanvas.dataset.disposed), contexts: gpu };
};
const drag = async (page, visible) => {
  // A real click on the non-interactive title clears transport focus; no blur
  // dispatch/focus() is used. Position the mouse BEFORE waiting for auto-hide,
  // so the first native down genuinely starts with the requested chrome state.
  await page.getByRole('heading', { level: 1 }).first().click();
  const box = await page.locator('.cosmic-world-canvas').boundingBox();
  assert.ok(box, 'actual scene canvas must be visible');
  const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  await page.mouse.move(point.x - 1, point.y);
  await page.mouse.move(point.x, point.y);
  await page.waitForFunction((shown) => {
    const chrome = document.querySelector('section[data-scene-surface] > [data-scene-drag]');
    return chrome && (getComputedStyle(chrome).visibility !== 'hidden') === shown;
  }, visible);
  const evidence = await page.evaluate(({ shown, point }) => {
    const root = document.querySelector('.cosmic-world');
    const target = document.elementFromPoint(point.x, point.y);
    if (!(root.contains(target) && !target?.closest('button, input, select, textarea, a'))) throw new Error('Unexpected cosmic drag hit target');
    return { chromeVisibleAtStart: shown, target: target.tagName, point,
      frameBefore: Number(root.querySelector('canvas').dataset.frame), direction: shown ? 1 : -1 };
  }, { shown: visible, point });
  let yaw;
  await page.mouse.down();
  try {
    await page.mouse.move(point.x + (visible ? 100 : -100), point.y, { steps: 8 });
    evidence.look = await page.locator('.cosmic-world').getAttribute('data-look');
    assert.equal(evidence.look, 'drag');
    await page.waitForFunction(({ frameBefore, direction }) => {
      const data = document.querySelector('.cosmic-world-canvas')?.dataset;
      return Number(data?.frame) > frameBefore && Number(data?.yaw) * direction > 0.00001;
    }, evidence);
    yaw = (await snapshot(page)).yaw;
  } finally { await page.mouse.up(); }
  assert.equal(await page.locator('.cosmic-world').getAttribute('data-look'), null);
  return { ...evidence, yaw, events: 'native mouse move/down/up on the actual hit-tested target' };
};

try {
  await saveReport();
  const browserServer = await chromium.launchServer({ executablePath: process.env.SCENE_BROWSER_PATH || undefined, headless: true,
    args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-dev-shm-usage', '--autoplay-policy=document-user-activation-required'] });
  owned = ownBrowserServer(browserServer, {
    closeTimeoutMs: 30_000,
    onError: error => { report.cleanupErrors.push(error); report.status = 'failed'; process.exitCode = 1; },
  });
  report.browserOwnership = owned.state;
  const interrupted = signal => {
    report.interrupted = signal; report.status = 'failed'; process.exitCode = 1;
    void saveReport().catch(error => report.cleanupErrors.push({ stage: 'signal-report', message: String(error) })).finally(() => owned.close());
  };
  process.once('SIGTERM', () => interrupted('SIGTERM'));
  process.once('SIGINT', () => interrupted('SIGINT'));
  browser = await bounded(chromium.connect(browserServer.wsEndpoint()), 10_000, 'owned browser connect');
  const app = await createPage('application');
  const page = app.page;
  await check('cosmic application route loads a real scene and requires one playback tap', async () => {
    await page.goto(`${BASE}#/play/amb/cosmic`);
    const cold = coldObservers.get(page);
    const blocked = await cold.blocked('우주 명상');
    assert.equal(blocked.lastSession, null);
    await cold.frozenTimer(blocked, 1300);
    const rendered = await ready(page, true);
    assert.equal(rendered.landscapeCount, 0);
    const nativeInput = await cold.firstClick();
    const motion = await running(page);
    assert.equal(await page.getByRole('dialog').count(), 0, 'one tap must not open a second confirmation');
    const audio = (await cold.read('audio after native first playback')).audio;
    assert.equal(audio.contexts, 1); assert.deepEqual(audio.states, ['running']);
    assert.equal(audio.analyserGraphs, 1);
    assert.ok(audio.resumeCalls.some(call => call.activeGesture === true));
    return { route: blocked.hash, oneTrustedTap: true, nativeInput, audio, rendered, motion };
  });
  // Capture before the longer live drag/motion sequence can queue software-GPU work.
  await check('cosmic application pause freezes rendering', async () => { await press(page, '일시정지'); return frozen(page); });
  await check('cosmic application desktop and Fold-like paused screenshots', async () => {
    const results = [];
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForFunction(() => {
        const canvas = document.querySelector('.cosmic-world-canvas');
        if (!canvas) return false;
        const rect = canvas.getBoundingClientRect();
        const ratio = Number(canvas.dataset.dpr);
        return rect.width > 0 && rect.height > 0 && Math.abs(canvas.width - rect.width * ratio) < 3 && Math.abs(canvas.height - rect.height * ratio) < 3;
      });
      const data = await frozen(page);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `no horizontal overflow at ${viewport.name}`);
      results.push({ viewport, data, screenshot: await capture(page, `cosmic-app-${viewport.name}`) });
    }
    return results;
  });
  await check('cosmic immersive overlay reuses the exact canvas and restores it on Escape', async () => {
    await remember(page);
    await press(page, '전체 화면 보기');
    await page.waitForFunction(() => document.querySelector('[aria-label="몰입 화면"] .cosmic-world-canvas') === window.__savedCosmicVerificationCanvas);
    assert.equal(await page.locator('.cosmic-world-canvas').count(), 1);
    await frozen(page);
    const screenshot = await capture(page, 'cosmic-app-immersive');
    const gpu = await contexts(page);
    assert.equal(gpu.filter((entry) => entry.kind === 'scene' && !entry.lost).length, 1);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('[aria-label="몰입 화면"]') && document.querySelector('.cosmic-world-canvas') === window.__savedCosmicVerificationCanvas);
    return { sameCanvas: true, contexts: gpu, screenshot, data: await frozen(page) };
  });
  await check('cosmic application resumes and drag works through visible and hidden chrome and excludes controls', async () => {
    await press(page, '재생');
    const resumed = await running(page);
    const visible = await drag(page, true);
    const hidden = await drag(page, false);
    await revealChrome(page);
    const control = page.getByRole('button', { name: '일시정지', exact: true, includeHidden: true }).first();
    await control.hover();
    await page.mouse.down();
    try {
    assert.equal(await page.locator('.cosmic-world').getAttribute('data-look'), null, 'transport button pointerdown must not begin look drag');
    } finally {
      // Move away before releasing to avoid activating Pause while testing only
      // its down/exclusion path. The complete stream is native mouse input.
      const box = await page.locator('.cosmic-world-canvas').boundingBox();
      if (box) await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.up();
    }
    return { resumed, visible, hidden, transportControlsStartDrag: false };
  });
  await check('cosmic application respects OS and app reduced motion', async () => {
    const beforePreferences = await running(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const osReduced = await frozen(page);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await running(page);
    await page.evaluate(() => document.documentElement.classList.add('reduce-motion'));
    const appReduced = await frozen(page);
    await page.evaluate(() => document.documentElement.classList.remove('reduce-motion'));
    return { beforePreferences, osReduced, appReduced, restored: await running(page) };
  });
  await check('cosmic simulated hidden signal stops rendering and visible signal resumes', async () => {
    await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
    const hidden = await frozen(page);
    await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
    const restored = await running(page);
    await press(page, '일시정지');
    await frozen(page);
    return { method: 'simulated visibility signal; not a physical background tab', hidden, restored };
  });
  await check('cosmic navigation and browser Back restore the correct paused world', async () => {
    await page.evaluate(() => { location.hash = '#/guide'; });
    await page.waitForFunction(() => !document.querySelector('.cosmic-world-canvas'));
    await page.goBack();
    await page.getByRole('heading', { name: '우주 명상', exact: true }).waitFor();
    await ready(page);
    assert.equal(await page.evaluate(() => location.hash), '#/play/amb/cosmic');
    return frozen(page);
  });
  await check('cosmic app release eventually disposes after the five-second grace period and Back mounts a fresh renderer', async () => {
    await remember(page);
    await page.evaluate(() => { location.hash = '#/guide'; });
    const disposed = await finalDisposal(page);
    await page.goBack();
    await page.getByRole('heading', { name: '우주 명상', exact: true }).waitFor();
    const remounted = await ready(page);
    assert.ok(await page.evaluate(() => document.querySelector('.cosmic-world-canvas') !== window.__savedCosmicVerificationCanvas), 'disposed renderer must not be revived');
    return { disposed, remounted, paused: await frozen(page) };
  });
  await check('close cosmic application browser context', () => bounded(app.context.close(), 15_000, 'application context close'));

  const pilot = await createPage('standalone rebuilt pilot');
  await check('rebuilt cosmic standalone paused entry contains the real renderer', async () => {
    await pilot.page.goto(`${BASE}immersive-worlds/cosmic/preview/index.html?clean&still`);
    const rendered = await ready(pilot.page);
    return { rendered, paused: await frozen(pilot.page), screenshot: await capture(pilot.page, 'cosmic-standalone-desktop') };
  });
  await check('standalone cosmic second holder preserves canvas identity', async () => {
    await pilot.page.goto(`${BASE}immersive-worlds/cosmic/preview/index.html?still`);
    await ready(pilot.page);
    await frozen(pilot.page);
    await remember(pilot.page);
    await press(pilot.page, 'Second holder');
    await pilot.page.waitForFunction(() => document.querySelector('.garden-second .cosmic-world-canvas') === window.__savedCosmicVerificationCanvas);
    assert.equal(await pilot.page.locator('.cosmic-world-canvas').count(), 1);
    await press(pilot.page, 'Second holder');
    await pilot.page.waitForFunction(() => document.querySelector('.garden-stage .cosmic-world-canvas') === window.__savedCosmicVerificationCanvas);
    return { sameCanvas: true, contexts: await contexts(pilot.page) };
  });
  await check('standalone cosmic unmount reaches final disposal and remount works', async () => {
    await press(pilot.page, 'Unmount');
    const disposed = await finalDisposal(pilot.page);
    await press(pilot.page, 'Mount');
    const remounted = await ready(pilot.page);
    assert.ok(await pilot.page.evaluate(() => document.querySelector('.cosmic-world-canvas') !== window.__savedCosmicVerificationCanvas));
    return { disposed, remounted };
  });
  await check('cosmic has no uncaught runtime or renderer errors', () => { assert.deepEqual(report.errors, []); return { errors: [] }; });
  await check('close cosmic standalone browser context', () => bounded(pilot.context.close(), 15_000, 'standalone context close'));
  report.functionalStatus = 'passed';
  report.visualEvidenceStatus = report.captureErrors.length ? 'incomplete' : 'captured-pending-human-review';
  report.status = report.captureErrors.length ? 'failed' : 'passed';
  if (report.captureErrors.length) process.exitCode = 1;
} catch (error) {
  report.status = 'failed';
  report.functionalStatus = 'failed';
  report.failure = { step, message: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined, code: error?.code };
  await saveReport(); // Preserve the actual failure before any browser diagnostic can stall.
  if (currentPage && !currentPage.isClosed()) {
    try { report.failure.cold = await coldObservers.get(currentPage)?.read('failure before injected diagnostics'); await saveReport(); }
    catch (observationError) { report.failure.coldObservationError = String(observationError); }
    // Do not spend another capture timeout diagnosing a previous compositor stall.
    if (!report.captureErrors.length && error?.code !== 'SCENE_CHECK_TIMEOUT') {
      try { await capture(currentPage, 'cosmic-failure'); } catch (captureError) { report.failure.captureError = String(captureError); }
    } else report.failure.captureSkipped = 'Earlier capture failure or functional timeout already recorded; no further capture attempted.';
    try {
      [report.failure.data, report.failure.contexts] = await bounded(Promise.all([snapshot(currentPage), contexts(currentPage)]), 5000, 'failure diagnostics');
    } catch (diagnosticError) { report.failure.diagnosticError = String(diagnosticError); }
  }
  console.error(`FAIL: ${step}: ${report.failure.message}`);
  process.exitCode = 1;
} finally {
  await owned?.close();
  try { if (!await provenance.finish()) { report.status = 'failed'; process.exitCode = 1; } }
  catch (error) { report.provenance.errors.push({ phase: 'final snapshot', message: String(error) }); report.status = 'failed'; process.exitCode = 1; }
  if (report.interrupted || report.cleanupErrors.length || !owned?.state.terminationConfirmed) { report.status = 'failed'; process.exitCode = 1; }
  report.finishedAt = new Date().toISOString();
  if (report.visualEvidenceStatus === 'pending') report.visualEvidenceStatus = 'incomplete';
  await saveReport();
  console.log(`Cosmic verification report: ${path.join(output, 'cosmic-verification.json')} · ${report.status}`);
}
