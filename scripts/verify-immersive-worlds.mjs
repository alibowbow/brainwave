import { pressSceneControl, hoverSceneControl } from './press-scene-control.mjs';
import { ownBrowserServer } from './owned-browser.mjs';
import { beginVerificationProvenance } from './verification-provenance.mjs';
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { captureScenePng } from './capture-scene.mjs';
import { verifySceneStill } from './verify-scene-still.mjs';

// Real pilot only: the standalone bundle and its reviewed application route.
// SwiftShader is a correctness runner, never evidence of device performance.
const BASE = (process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173').replace(/\/?$/, '/');
const HARNESS = process.env.SCENE_FOREST_HARNESS_URL || `${BASE}immersive-worlds/forest/qa/`;
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
  startedAt: new Date().toISOString(),
  baseUrl: BASE,
  renderer: 'Chromium headless with SwiftShader',
  captureMethod: 'Bounded native Chromium compositor capture, lossless PNG, unchanged viewport and rendering quality. GPU readback can still fail; capture failures remain failures.',
  historicalOwnerCheckpoint: '1925398f9c1eaf2319bf624d4f17e68e17d745dd',
  standaloneUrl: HARNESS,
  deviceScope: 'Desktop and Fold-like CSS viewport checks; no physical Fold or FPS measurement.',
  visibilityScope: 'Simulated document.hidden getter and visibilitychange event; not a real background-tab test.',
  fullscreenScope: 'One canvas across the harness second holder and application CSS immersive overlay; not browser Fullscreen API.',
  sourceScope: process.env.SCENE_FOREST_HARNESS_URL
    ? 'The source standalone harness uses current working-tree source and helpers; application response bytes must match the captured production dist. The public owner bundle is not used.'
    : 'The public standalone QA bundle and current application are distinct surfaces. Each served script is hashed separately; the historical checkpoint is not the current application identity.',
  visualReview: 'PNG artifacts require human visual inspection; this script does not grade artistic quality.',
  checks: [],
  errors: [],
  screenshots: [],
  captureFailures: [],
  status: 'running',
};
let browser;
let owned;
let currentPage;
let currentStep = 'launch browser';

await mkdir(output, { recursive: true });

const persist = () => writeFile(path.join(output, 'forest-verification.json'), `${JSON.stringify(report, null, 2)}\n`);

const bounded = async (run, ms, label) => {
  let timer;
  try {
    return await Promise.race([
      Promise.resolve().then(run),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} exceeded ${ms} ms; subsequent assertions were not run`)), ms); }),
    ]);
  } finally { clearTimeout(timer); }
};

const check = async (name, run) => {
  currentStep = name;
  report.currentStep = name;
  await persist();
  console.log(`START: ${name}`);
  const start = Date.now();
  const capturesBefore = report.captureFailures.length;
  const evidence = await bounded(run, 600_000, name);
  const captureFailed = report.captureFailures.length > capturesBefore;
  report.checks.push({ name, status: captureFailed ? 'failed' : 'passed', elapsedMs: Date.now() - start, evidence,
    ...(captureFailed ? { failure: 'Required PNG capture failed; functional evidence is retained separately.' } : {}) });
  await persist();
  console.log(`${captureFailed ? 'FAIL (capture)' : 'PASS'}: ${name}`);
  return evidence;
};

const watch = (page, surface) => {
  provenance.attach(page, surface);
  page.setDefaultTimeout(120_000);
  page.on('pageerror', (error) => report.errors.push({ surface, kind: 'runtime', message: error.message }));
  page.on('console', (message) => {
    if (message.type() === 'error' && /three|webgl|shader|program|framebuffer/i.test(message.text())) {
      report.errors.push({ surface, kind: 'renderer', message: message.text() });
    }
  });
};

const ready = async (page) => {
  await page.waitForFunction(() => {
    const world = document.querySelector('.forest-world');
    return world?.dataset.state === 'ready' || world?.dataset.state === 'failed';
  }, undefined, { timeout: 240_000 });
  assert.equal(await page.locator('.forest-world').first().getAttribute('data-state'), 'ready', 'real forest must initialize, not its failure fallback');
  assert.equal(await page.locator('.forest-world-fallback').count(), 0);
  assert.equal(await page.locator('.forest-world-canvas').count(), 1);
  await page.waitForFunction(() => Number(document.querySelector('.forest-world-canvas')?.dataset.frames) > 0);
};

const snapshot = (page) => page.evaluate(() => {
  const canvas = document.querySelector('.forest-world-canvas');
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  const gl = canvas.getContext('webgl2');
  return {
    state: canvas.closest('.forest-world')?.dataset.state,
    motion: canvas.closest('.forest-world')?.dataset.motion,
    frames: Number(canvas.dataset.frames),
    time: Number(canvas.dataset.time),
    running: canvas.dataset.running,
    disposed: canvas.dataset.disposed ?? null,
    drawCalls: Number(canvas.dataset.drawCalls),
    triangles: Number(canvas.dataset.triangles),
    dpr: Number(canvas.dataset.dpr),
    cssWidth: rect.width,
    cssHeight: rect.height,
    bufferWidth: canvas.width,
    bufferHeight: canvas.height,
    webgl2: Boolean(gl && typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext),
    contextLost: gl?.isContextLost() ?? null,
  };
});

const running = async (page) => {
  await page.waitForFunction(() => {
    const canvas = document.querySelector('.forest-world-canvas');
    return canvas?.dataset.running === 'true' && canvas.closest('.forest-world')?.dataset.motion === 'running';
  });
  const before = await snapshot(page);
  await page.waitForFunction((frames) => Number(document.querySelector('.forest-world-canvas')?.dataset.frames) > frames, before.frames);
  return { before, after: await snapshot(page) };
};

const frozen = async (page) => {
  await page.waitForFunction(() => {
    const canvas = document.querySelector('.forest-world-canvas');
    return canvas?.dataset.running === 'false' && canvas.closest('.forest-world')?.dataset.motion === 'paused';
  });
  return verifySceneStill(page, '.forest-world-canvas', snapshot);
};

const revealChrome = async page => {
  const surface = page.locator('section[data-scene-surface]').first();
  if (await surface.count()) {
    const box = await surface.boundingBox();
    if (box) await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  }
};
const pressHarness = (page, testId) => page.getByTestId(testId).click();
const pressApp = (page, name) => pressSceneControl(page, name, {
  record: evidence => (report.controlObservations ??= []).push(evidence),
});

const stalledCapturePages = new WeakSet();
const capture = async (page, name) => {
  const filename = `${name}.png`;
  report.captureInProgress = filename;
  await persist();
  try {
    if (stalledCapturePages.has(page)) {
      const skipped = { status: 'not-run', filename, message: 'Previous capture on this page timed out; its GPU readback may still be pending.' };
      report.captureFailures.push(skipped);
      return skipped;
    }
    const dimensions = await captureScenePng(page, path.join(output, filename));
    report.screenshots.push(filename);
    return { status: 'passed', filename, ...dimensions };
  } catch (error) {
    if (error?.code === 'SCENE_CAPTURE_TIMEOUT') stalledCapturePages.add(page);
    const failure = { status: 'failed', filename, message: String(error), stage: error?.captureStage, code: error?.code };
    report.captureFailures.push(failure);
    console.error(`CAPTURE FAIL: ${filename}: ${failure.message}`);
    return failure;
  } finally {
    delete report.captureInProgress;
    await persist();
  }
};

const viewportCaptures = async (page, surface) => {
  const results = [];
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.waitForFunction(() => {
      const canvas = document.querySelector('.forest-world-canvas');
      if (!canvas) return false;
      const rect = canvas.getBoundingClientRect();
      const dpr = Number(canvas.dataset.dpr);
      return rect.width > 0 && rect.height > 0 && Math.abs(canvas.width - rect.width * dpr) < 3 && Math.abs(canvas.height - rect.height * dpr) < 3;
    });
    const evidence = await frozen(page);
    assert.ok(evidence.webgl2 && !evidence.contextLost, 'capture must contain a live WebGL 2 canvas');
    assert.ok(evidence.drawCalls > 0 && evidence.triangles > 0, 'the real forest must submit geometry');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `horizontal overflow at ${viewport.name}`);
    const screenshot = await capture(page, `forest-${surface}-${viewport.name}`);
    results.push({ viewport, screenshot, ...evidence });
  }
  return results;
};

const rememberCanvas = (page) => page.evaluate(() => {
  window.__forestVerificationCanvas = document.querySelector('.forest-world-canvas');
  window.__forestVerificationContext = window.__forestVerificationCanvas.getContext('webgl2');
});

const disposedAfterRelease = async (page) => {
  await page.waitForFunction(() => !document.querySelector('.forest-world-canvas'));
  assert.equal(await page.evaluate(() => window.__forestVerificationCanvas.dataset.running), 'false', 'last holder stops immediately');
  const started = Date.now();
  // The unmodified pilot uses the protected-compatible five-second host default.
  await page.waitForTimeout(5100);
  await page.waitForFunction(() => window.__forestVerificationCanvas?.dataset.disposed === 'true', undefined, { timeout: 120_000, polling: 100 });
  const evidence = await page.evaluate((waitedMs) => ({
    waitedAfterRemovalMs: waitedMs,
    disposed: window.__forestVerificationCanvas.dataset.disposed,
    running: window.__forestVerificationCanvas.dataset.running,
    connected: window.__forestVerificationCanvas.isConnected,
    finalFrames: Number(window.__forestVerificationCanvas.dataset.frames),
    contextLost: window.__forestVerificationContext?.isContextLost() ?? null,
  }), Date.now() - started);
  assert.equal(evidence.contextLost, true, 'final release must lose the actual renderer context');
  return evidence;
};

const dragThroughChrome = async (page, visible) => {
  // A real click on the non-interactive title clears transport focus; no blur
  // dispatch/focus() is used. Position the mouse BEFORE waiting for auto-hide,
  // so the first native down genuinely starts with the requested chrome state.
  await page.getByRole('heading', { level: 1 }).first().click();
  const box = await page.locator('.forest-world-canvas').boundingBox();
  assert.ok(box, 'actual scene canvas must be visible');
  const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  await page.mouse.move(point.x - 1, point.y);
  await page.mouse.move(point.x, point.y);
  await page.waitForFunction((shown) => {
    const chrome = document.querySelector('section[data-scene-surface] > [data-scene-drag]');
    return chrome && (getComputedStyle(chrome).visibility !== 'hidden') === shown;
  }, visible);
  const hit = await page.evaluate(({ shown, point }) => {
    const root = document.querySelector('.forest-world');
    const target = document.elementFromPoint(point.x, point.y);
    if (!(root.contains(target) && !target?.closest('button, input, select, textarea, a'))) throw new Error('Unexpected forest drag hit target');
    return { chromeVisibleAtStart: shown, hitTag: target.tagName, hitWasDragSurface: target.hasAttribute('data-scene-drag'), point,
      frameBefore: Number(root.querySelector('canvas').dataset.frames), direction: shown ? 1 : -1 };
  }, { shown: visible, point });
  let yaw;
  await page.mouse.down();
  try {
    await page.mouse.move(point.x + (visible ? 100 : -100), point.y, { steps: 8 });
    hit.lookState = await page.locator('.forest-world').getAttribute('data-look');
    assert.equal(hit.lookState, 'drag', 'hit-tested scene or visible chrome must start look drag');
    await page.waitForFunction(({ frameBefore, direction }) => {
      const data = document.querySelector('.forest-world-canvas')?.dataset;
      return Number(data?.frames) > frameBefore && Number(data?.lookYaw) * direction > 0.00001;
    }, hit);
    yaw = (await snapshot(page)).lookYaw;
  } finally { await page.mouse.up(); }
  assert.equal(await page.locator('.forest-world').getAttribute('data-look'), null);
  return { ...hit, yawAfterDrag: await page.locator('.forest-world-canvas').getAttribute('data-look-yaw'), events: 'native mouse move/down/up on the actual hit-tested target' };
};

try {
  await persist();
  const browserServer = await chromium.launchServer({
    executablePath: process.env.SCENE_BROWSER_PATH || undefined,
    headless: true,
    args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=document-user-activation-required'],
  });

  owned = ownBrowserServer(browserServer, {
    closeTimeoutMs: 30_000,
    onError: error => { report.cleanupErrors.push(error); report.status = 'failed'; process.exitCode = 1; },
  });
  report.browserOwnership = owned.state;
  const interrupted = signal => {
    report.interrupted = signal; report.status = 'failed'; process.exitCode = 1;
    void persist().catch(error => report.cleanupErrors.push({ stage: 'signal-report', message: String(error) })).finally(() => owned.close());
  };
  process.once('SIGTERM', () => interrupted('SIGTERM'));
  process.once('SIGINT', () => interrupted('SIGINT'));
  browser = await bounded(() => chromium.connect(browserServer.wsEndpoint()), 10_000, 'owned browser connect');
  const harnessContext = await browser.newContext({ viewport: { width: viewports[0].width, height: viewports[0].height }, serviceWorkers: 'block' });
  const harness = await harnessContext.newPage();
  currentPage = harness;
  watch(harness, 'standalone harness');
  await check('standalone harness initializes the real forest and advances frames', async () => {
    await harness.goto(HARNESS);
    await ready(harness);
    return running(harness);
  });
  await check('standalone active=false stops rendering', async () => {
    await pressHarness(harness, 'active-toggle');
    return frozen(harness);
  });
  await check('standalone paused desktop and Fold-like viewport screenshots', () => viewportCaptures(harness, 'harness'));

  await check('standalone second holder reuses the exact canvas and restores it', async () => {
    await rememberCanvas(harness);
    await pressHarness(harness, 'holder-toggle');
    await harness.waitForFunction(() => document.querySelector('[data-testid="second-holder"] .forest-world-canvas') === window.__forestVerificationCanvas);
    assert.equal(await harness.locator('.forest-world-canvas').count(), 1);
    await frozen(harness);
    const screenshot = await capture(harness, 'forest-harness-second-holder');
    await pressHarness(harness, 'holder-toggle');
    await harness.waitForFunction(() => document.querySelector('[data-testid="main-holder"] .forest-world-canvas') === window.__forestVerificationCanvas);
    assert.equal(await harness.locator('.forest-world-canvas').count(), 1);
    return { sameCanvas: true, screenshot, snapshot: await frozen(harness) };
  });

  await check('standalone simulated hidden document stops and visible document resumes', async () => {
    await pressHarness(harness, 'active-toggle');
    await running(harness);
    await harness.evaluate(() => {
      document.documentElement.dataset.forestVisibilitySimulation = 'ci-hook-test';
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    const hidden = await frozen(harness);
    await harness.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event('visibilitychange'));
      delete document.documentElement.dataset.forestVisibilitySimulation;
    });
    const restored = await running(harness);
    return { method: 'simulated document.hidden; no actual background tab claim', hidden, restored };
  });
  await check('standalone OS reduced motion pauses and resumes', async () => {
    await harness.emulateMedia({ reducedMotion: 'reduce' });
    const reduced = await frozen(harness);
    await harness.emulateMedia({ reducedMotion: 'no-preference' });
    return { reduced, restored: await running(harness) };
  });
  await check('standalone app reduced-motion preference pauses and resumes', async () => {
    await pressHarness(harness, 'motion-toggle');
    const reduced = await frozen(harness);
    await pressHarness(harness, 'motion-toggle');
    return { reduced, restored: await running(harness) };
  });
  await check('standalone final holder release eventually reaches engine disposal after the five-second grace', async () => {
    await pressHarness(harness, 'active-toggle');
    await frozen(harness);
    await pressHarness(harness, 'mount-toggle');
    return disposedAfterRelease(harness);
  });
  await check('standalone remount creates a fresh real canvas', async () => {
    await pressHarness(harness, 'mount-toggle');
    await ready(harness);
    assert.ok(await harness.evaluate(() => document.querySelector('.forest-world-canvas') !== window.__forestVerificationCanvas));
    return frozen(harness);
  });
  await bounded(() => harnessContext.close(), 10_000, 'close forest harness');

  const appContext = await browser.newContext({ viewport: { width: viewports[0].width, height: viewports[0].height }, serviceWorkers: 'block' });
  const app = await appContext.newPage();
  currentPage = app;
  watch(app, 'application');
  await check('morning-forest application link loads the pilot and starts with policy-safe playback', async () => {
    await app.goto(`${BASE}#/play/amb/morning_forest`);
    await app.waitForSelector('h1:has-text("아침 숲")');
    await ready(app);
    assert.equal(await app.locator('.landscape').count(), 0, 'integrated card must not show the previous illustrated fallback');
    await app.waitForFunction(() => document.querySelector('[aria-label="일시정지"]') || document.querySelector('[data-playback-hint="blocked"]') || document.querySelector('[data-playback-hint="error"]'));
    assert.equal(await app.locator('[data-playback-hint="error"]').count(), 0);
    const blocked = await app.locator('[data-playback-hint="blocked"]').count() > 0;
    if (blocked) await app.getByRole('button', { name: '눌러서 재생', exact: true }).click();
    const motion = await running(app);
    assert.equal(await app.getByRole('dialog').count(), 0, 'one playback tap must not require a second dialog');
    return { route: await app.evaluate(() => location.hash), autoplayBlocked: blocked, oneTapRetry: blocked, ...motion };
  });
  await check('application pause stops the real renderer', async () => {
    await pressApp(app, '일시정지');
    return frozen(app);
  });
  await check('application paused desktop and Fold-like viewport screenshots', () => viewportCaptures(app, 'app'));
  await check('application immersive overlay reuses the exact canvas and Escape restores it', async () => {
    await rememberCanvas(app);
    await pressApp(app, '전체 화면 보기');
    await app.waitForFunction(() => document.querySelector('[aria-label="몰입 화면"] .forest-world-canvas') === window.__forestVerificationCanvas);
    assert.equal(await app.locator('.forest-world-canvas').count(), 1);
    await frozen(app);
    const screenshot = await capture(app, 'forest-app-immersive');
    await app.keyboard.press('Escape');
    await app.waitForFunction(() => !document.querySelector('[aria-label="몰입 화면"]') && document.querySelector('.forest-world-canvas') === window.__forestVerificationCanvas);
    return { sameCanvas: true, fullscreenType: 'CSS immersive overlay', screenshot, snapshot: await frozen(app) };
  });
  await check('application drag works through visible chrome and the uncovered canvas', async () => {
    await pressApp(app, '재생');
    await running(app);
    const visibleChrome = await dragThroughChrome(app, true);
    const hiddenChrome = await dragThroughChrome(app, false);
    await revealChrome(app);
    await hoverSceneControl(app, '일시정지', {
      record: evidence => (report.controlObservations ??= []).push(evidence),
    });
    await app.mouse.down();
    try {
    assert.equal(await app.locator('.forest-world').getAttribute('data-look'), null, 'transport controls must not start look drag');
    } finally {
      const box = await app.locator('.forest-world-canvas').boundingBox();
      if (box) await app.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await app.mouse.up();
    }
    return { visibleChrome, hiddenChrome, transportControlsStartDrag: false, events: 'native mouse move/down/up on actual hit-tested targets' };
  });
  await check('application respects OS reduced motion while the session plays', async () => {
    await running(app);
    await app.emulateMedia({ reducedMotion: 'reduce' });
    const reduced = await frozen(app);
    await app.emulateMedia({ reducedMotion: 'no-preference' });
    const restored = await running(app);
    await pressApp(app, '일시정지');
    await frozen(app);
    return { reduced, restored };
  });
  await check('application app reduced motion and simulated hidden state pause and resume', async () => {
    await pressApp(app, '재생');
    await running(app);
    await app.evaluate(() => document.documentElement.classList.add('reduce-motion'));
    const appReduced = await frozen(app);
    await app.evaluate(() => document.documentElement.classList.remove('reduce-motion'));
    await running(app);
    await app.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
    const hidden = await frozen(app);
    await app.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
    const restored = await running(app);
    await pressApp(app, '일시정지');
    await frozen(app);
    return { method: 'simulated visibility signal; not an actual background tab', appReduced, hidden, restored };
  });
  await check('application navigation away and browser Back restore the correct paused world', async () => {
    await app.evaluate(() => { location.hash = '#/guide'; });
    await app.waitForFunction(() => !document.querySelector('.forest-world-canvas'));
    await app.goBack();
    await app.waitForSelector('h1:has-text("아침 숲")');
    await ready(app);
    assert.equal(await app.evaluate(() => location.hash), '#/play/amb/morning_forest');
    return frozen(app);
  });
  await check('application final navigation eventually releases the engine after the five-second grace', async () => {
    await rememberCanvas(app);
    await app.evaluate(() => { location.hash = '#/guide'; });
    return disposedAfterRelease(app);
  });
  await check('no uncaught runtime or renderer errors on either surface', () => {
    assert.deepEqual(report.errors, []);
    return { errors: [] };
  });
  await bounded(() => appContext.close(), 10_000, 'close forest application');
  report.status = report.captureFailures.length ? 'failed' : 'passed';
  if (report.status === 'failed') process.exitCode = 1;
} catch (error) {
  report.status = 'failed';
  report.failure = { step: currentStep, message: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined };
  await persist();
  if (currentPage && !currentPage.isClosed()) {
    try { report.failure.canvas = await bounded(() => snapshot(currentPage), 5000, 'failure snapshot'); } catch { /* failed navigation may have no execution context */ }
  }
  console.error(`FAIL: ${currentStep}: ${report.failure.message}`);
  process.exitCode = 1;
} finally {
  await owned?.close();
  try { if (!await provenance.finish()) { report.status = 'failed'; process.exitCode = 1; } }
  catch (error) { report.provenance.errors.push({ phase: 'final snapshot', message: String(error) }); report.status = 'failed'; process.exitCode = 1; }
  if (report.interrupted || report.cleanupErrors.length || !owned?.state.terminationConfirmed) { report.status = 'failed'; process.exitCode = 1; }
  report.finishedAt = new Date().toISOString();
  await persist();
  console.log(`Forest verification report: ${path.join(output, 'forest-verification.json')} · ${report.status}`);
}
