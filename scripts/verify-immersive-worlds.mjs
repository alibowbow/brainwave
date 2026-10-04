import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

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
const report = {
  startedAt: new Date().toISOString(),
  baseUrl: BASE,
  renderer: 'Chromium headless with SwiftShader',
  applicationPilotHead: '531ecb22b31a4b098eec155b08f3f5af4f24c04e',
  standalonePilotHead: process.env.SCENE_FOREST_HARNESS_URL ? '531ecb22b31a4b098eec155b08f3f5af4f24c04e' : '989186c396e9b15641d8ef31d43c5dee7df5b49a',
  standaloneUrl: HARNESS,
  deviceScope: 'Desktop and Fold-like CSS viewport checks; no physical Fold or FPS measurement.',
  visibilityScope: 'Simulated document.hidden getter and visibilitychange event; not a real background-tab test.',
  fullscreenScope: 'One canvas across the harness second holder and application CSS immersive overlay; not browser Fullscreen API.',
  sourceScope: process.env.SCENE_FOREST_HARNESS_URL
    ? 'Both the source standalone harness and production-built application use reviewed 531ecb2 source and current integration helpers. The older public QA bundle is not used in this run.'
    : 'Public standalone QA is the older 989186c snapshot; application checks use reviewed 531ecb2 source. Never label old bundle PNGs as latest-head evidence.',
  visualReview: 'PNG artifacts require human visual inspection; this script does not grade artistic quality.',
  checks: [],
  errors: [],
  screenshots: [],
  status: 'running',
};
let browser;
let currentPage;
let currentStep = 'launch browser';

await mkdir(output, { recursive: true });

const check = async (name, run) => {
  currentStep = name;
  const start = Date.now();
  const evidence = await run();
  report.checks.push({ name, status: 'passed', elapsedMs: Date.now() - start, evidence });
  console.log(`PASS: ${name}`);
  return evidence;
};

const watch = (page, surface) => {
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
  const before = await snapshot(page);
  await page.waitForTimeout(300);
  const after = await snapshot(page);
  assert.equal(after.frames, before.frames, 'paused renderer must not keep drawing');
  assert.equal(after.time, before.time, 'paused simulation clock must not advance');
  return after;
};

const pressHarness = (page, testId) => page.getByTestId(testId).dispatchEvent('click');
// Existing scene controls fade out. Dispatching their click checks their handler
// without an actionability wait spending minutes on software-rendered frames.
const pressApp = (page, name) => page.getByRole('button', { name, exact: true, includeHidden: true }).first().dispatchEvent('click');

const capture = async (page, name) => {
  const filename = `${name}.png`;
  await page.screenshot({ path: path.join(output, filename), animations: 'disabled', timeout: 120_000 });
  report.screenshots.push(filename);
  return filename;
};

const viewportCaptures = async (page, surface) => {
  const results = [];
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.evaluate(() => document.fonts.ready);
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
});

const disposedAfterRelease = async (page) => {
  await page.waitForFunction(() => !document.querySelector('.forest-world-canvas'));
  assert.equal(await page.evaluate(() => window.__forestVerificationCanvas.dataset.running), 'false', 'last holder stops immediately');
  const started = Date.now();
  // The unmodified pilot uses the protected-compatible five-second host default.
  await page.waitForTimeout(5100);
  await page.waitForFunction(() => window.__forestVerificationCanvas?.dataset.disposed === 'true', undefined, { timeout: 15_000, polling: 100 });
  return page.evaluate((waitedMs) => ({
    waitedAfterRemovalMs: waitedMs,
    disposed: window.__forestVerificationCanvas.dataset.disposed,
    running: window.__forestVerificationCanvas.dataset.running,
    connected: window.__forestVerificationCanvas.isConnected,
    finalFrames: Number(window.__forestVerificationCanvas.dataset.frames),
  }), Date.now() - started);
};

const dragThroughChrome = async (page, visible) => {
  if (visible) {
    await page.locator('section[data-scene-surface]').first().dispatchEvent('pointermove');
  }
  await page.waitForFunction((shown) => {
    const chrome = document.querySelector('section[data-scene-surface] > [data-scene-drag]');
    return chrome && (getComputedStyle(chrome).visibility !== 'hidden') === shown;
  }, visible);
  const hit = await page.evaluate((shown) => {
    const world = document.querySelector('.forest-world');
    const canvas = world.querySelector('.forest-world-canvas');
    const rect = canvas.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const target = document.elementFromPoint(x, y);
    const expectedTarget = shown ? target?.hasAttribute('data-scene-drag') : world.contains(target);
    if (!expectedTarget) throw new Error(`Unexpected ${shown ? 'visible' : 'hidden'} chrome hit target: ${target?.tagName} ${target?.className}`);
    const event = { bubbles: true, isPrimary: true, pointerId: 41, pointerType: 'mouse', button: 0, clientX: x, clientY: y };
    target.dispatchEvent(new PointerEvent('pointerdown', event));
    window.dispatchEvent(new PointerEvent('pointermove', { ...event, clientX: x + 100 }));
    return { chromeVisibleAtStart: shown, hitTag: target.tagName, hitWasDragSurface: target.hasAttribute('data-scene-drag'), lookState: world.dataset.look };
  }, visible);
  assert.equal(hit.lookState, 'drag', 'hit-tested scene or visible chrome must start look drag');
  await page.waitForFunction(() => Math.abs(Number(document.querySelector('.forest-world-canvas')?.dataset.lookYaw)) > 0.00001);
  await page.evaluate(() => window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, isPrimary: true, pointerId: 41, pointerType: 'mouse', button: 0 })));
  assert.equal(await page.locator('.forest-world').getAttribute('data-look'), null);
  return { ...hit, yawAfterDrag: await page.locator('.forest-world-canvas').getAttribute('data-look-yaw') };
};

try {
  browser = await chromium.launch({
    executablePath: process.env.SCENE_BROWSER_PATH || undefined,
    headless: true,
    args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=document-user-activation-required'],
  });

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
  await check('standalone second holder reuses the exact canvas and restores it', async () => {
    await pressHarness(harness, 'active-toggle');
    await frozen(harness);
    await rememberCanvas(harness);
    await pressHarness(harness, 'holder-toggle');
    await harness.waitForFunction(() => document.querySelector('[data-testid="second-holder"] .forest-world-canvas') === window.__forestVerificationCanvas);
    assert.equal(await harness.locator('.forest-world-canvas').count(), 1);
    const screenshot = await capture(harness, 'forest-harness-second-holder');
    await pressHarness(harness, 'holder-toggle');
    await harness.waitForFunction(() => document.querySelector('[data-testid="main-holder"] .forest-world-canvas') === window.__forestVerificationCanvas);
    assert.equal(await harness.locator('.forest-world-canvas').count(), 1);
    return { sameCanvas: true, screenshot, snapshot: await frozen(harness) };
  });
  await check('standalone final holder release reaches engine disposal after five seconds', async () => {
    await pressHarness(harness, 'mount-toggle');
    return disposedAfterRelease(harness);
  });
  await check('standalone remount creates a fresh real canvas', async () => {
    await pressHarness(harness, 'mount-toggle');
    await ready(harness);
    assert.ok(await harness.evaluate(() => document.querySelector('.forest-world-canvas') !== window.__forestVerificationCanvas));
    return frozen(harness);
  });
  await harnessContext.close();

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
  await check('application drag works through visible chrome and the uncovered canvas', async () => {
    const visibleChrome = await dragThroughChrome(app, true);
    const hiddenChrome = await dragThroughChrome(app, false);
    await app.evaluate(() => {
      const control = document.querySelector('[aria-label^="남은 시간"]');
      control.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, isPrimary: true, pointerId: 42, pointerType: 'mouse', button: 0 }));
    });
    assert.equal(await app.locator('.forest-world').getAttribute('data-look'), null, 'transport controls must not start look drag');
    return { visibleChrome, hiddenChrome, transportControlsStartDrag: false, events: 'synthetic pointer events dispatched to actual hit-tested targets' };
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
    const screenshot = await capture(app, 'forest-app-immersive');
    await app.keyboard.press('Escape');
    await app.waitForFunction(() => !document.querySelector('[aria-label="몰입 화면"]') && document.querySelector('.forest-world-canvas') === window.__forestVerificationCanvas);
    return { sameCanvas: true, fullscreenType: 'CSS immersive overlay', screenshot, snapshot: await frozen(app) };
  });
  await check('application respects OS reduced motion while the session plays', async () => {
    await pressApp(app, '재생');
    await running(app);
    await app.emulateMedia({ reducedMotion: 'reduce' });
    const reduced = await frozen(app);
    await app.emulateMedia({ reducedMotion: 'no-preference' });
    const restored = await running(app);
    await pressApp(app, '일시정지');
    await frozen(app);
    return { reduced, restored };
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
  await check('application final navigation releases the engine after five seconds', async () => {
    await rememberCanvas(app);
    await app.evaluate(() => { location.hash = '#/guide'; });
    return disposedAfterRelease(app);
  });
  await check('no uncaught runtime or renderer errors on either surface', () => {
    assert.deepEqual(report.errors, []);
    return { errors: [] };
  });
  await appContext.close();
  report.status = 'passed';
} catch (error) {
  report.status = 'failed';
  report.failure = { step: currentStep, message: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined };
  if (currentPage && !currentPage.isClosed()) {
    try { await capture(currentPage, 'forest-failure'); } catch (captureError) { report.failure.captureError = String(captureError); }
    try { report.failure.canvas = await snapshot(currentPage); } catch { /* failed navigation may have no execution context */ }
  }
  console.error(`FAIL: ${currentStep}: ${report.failure.message}`);
  process.exitCode = 1;
} finally {
  report.finishedAt = new Date().toISOString();
  await writeFile(path.join(output, 'forest-verification.json'), `${JSON.stringify(report, null, 2)}\n`);
  await browser?.close();
  console.log(`Forest verification report: ${path.join(output, 'forest-verification.json')}`);
}
