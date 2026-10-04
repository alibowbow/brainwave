import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { captureScenePng } from './capture-scene.mjs';
import { verifySceneStill } from './verify-scene-still.mjs';

const BASE = (process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173').replace(/\/?$/, '/');
const output = path.join(process.env.SCENE_SCREENSHOT_DIR || 'artifacts', 'worlds');
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'fold-cover', width: 344, height: 882 },
  { name: 'fold-inner', width: 768, height: 1024 },
  { name: 'landscape', width: 1024, height: 768 },
];
const report = {
  startedAt: new Date().toISOString(), baseUrl: BASE,
  pilotHead: '8b9383b8086b99bec04eb2273a68ec9d2bd76f43',
  renderer: 'Headless Chromium with SwiftShader; no physical device or FPS claim.',
  captureMethod: 'Bounded native Chromium compositor capture, lossless PNG, unchanged viewport and rendering quality. GPU readback can still fail; capture failures remain failures.',
  scope: 'Actual amb:focus_cafe application route first, then the rebuilt standalone pilot. Fold-like CSS viewports only.',
  visibilityScope: 'Injected document.hidden getter plus visibilitychange; not an actual background-tab test.',
  fullscreenScope: 'Application CSS immersive overlay and standalone second holder, not the native Fullscreen API.',
  contextScope: 'Capability probe contexts are recorded separately from live cafe renderer contexts; a lost probe is not a second live renderer.',
  visualReview: 'Saved PNGs require human visual review; no automated artistic-quality or audio-audition claim.',
  checks: [], screenshots: [], captureFailures: [], errors: [], status: 'running',
};
let browser;
let currentPage;
let step = 'launch browser';
await mkdir(output, { recursive: true });

const persist = () => writeFile(path.join(output, 'cafe-verification.json'), `${JSON.stringify(report, null, 2)}\n`);

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
  step = name;
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
const createPage = async (surface) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
  await context.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    window.__cafeVerificationContexts = [];
    HTMLCanvasElement.prototype.getContext = function (...args) {
      const result = getContext.apply(this, args);
      if (result && /^(webgl2?|experimental-webgl)$/.test(args[0]) && !window.__cafeVerificationContexts.some((entry) => entry.context === result)) {
        window.__cafeVerificationContexts.push({ canvas: this, context: result });
      }
      return result;
    };
  });
  const page = await context.newPage();
  currentPage = page;
  page.setDefaultTimeout(120_000);
  page.on('pageerror', (error) => report.errors.push({ surface, kind: 'runtime', message: error.message }));
  page.on('console', (message) => {
    if (message.type() === 'error' && /three|webgl|shader|program|framebuffer/i.test(message.text())) report.errors.push({ surface, kind: 'renderer', message: message.text() });
  });
  return { context, page };
};
const contexts = (page) => page.evaluate(() => window.__cafeVerificationContexts.map(({ canvas, context }) => ({
  kind: canvas.classList.contains('cafe-world-canvas') ? 'scene' : 'capability-probe-or-other',
  className: canvas.className, connected: canvas.isConnected, lost: context.isContextLost(), lifecycle: canvas.dataset.lifecycle ?? null,
})));
const snapshot = (page) => page.evaluate(() => {
  const canvas = document.querySelector('.cafe-world-canvas');
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  return {
    ...canvas.dataset, width: canvas.width, height: canvas.height, cssWidth: rect.width, cssHeight: rect.height,
    devicePixelRatio, motion: canvas.closest('.cafe-world')?.dataset.motion,
  };
});
const ready = async (page) => {
  await page.waitForFunction(() => ['ready', 'failed'].includes(document.querySelector('.cafe-world')?.dataset.state), undefined, { timeout: 240_000 });
  assert.equal(await page.locator('.cafe-world').first().getAttribute('data-state'), 'ready', 'cafe must render instead of showing unsupported fallback');
  assert.equal(await page.locator('.cafe-world-canvas').count(), 1);
  const data = await snapshot(page);
  assert.equal(data.engine, 'three-webgl2');
  assert.equal(data.lifecycle, 'ready');
  assert.ok(Number(data.frames) > 0 && Number(data.drawCalls) > 0 && Number(data.triangles) > 0, 'real geometry must be rendered');
  const gpu = await contexts(page);
  assert.equal(gpu.filter((entry) => entry.kind === 'scene' && !entry.lost).length, 1);
  assert.ok(gpu.filter((entry) => entry.kind !== 'scene').every((entry) => entry.lost), 'capability probes must release their contexts');
  return { data, contexts: gpu };
};
const frozen = async (page) => {
  await page.waitForFunction(() => {
    const canvas = document.querySelector('.cafe-world-canvas');
    return canvas?.dataset.running === 'false' && canvas.closest('.cafe-world')?.dataset.motion === 'paused';
  });
  return verifySceneStill(page, '.cafe-world-canvas', snapshot);
};
const running = async (page) => {
  await page.waitForFunction(() => {
    const canvas = document.querySelector('.cafe-world-canvas');
    return canvas?.dataset.running === 'true' && canvas.closest('.cafe-world')?.dataset.motion === 'running';
  });
  const before = await snapshot(page);
  await page.waitForFunction((frame) => Number(document.querySelector('.cafe-world-canvas')?.dataset.frames) > frame, Number(before.frames));
  return { before, after: await snapshot(page) };
};
const press = (page, name) => page.getByRole('button', { name, exact: true, includeHidden: true }).first().dispatchEvent('click');
const remember = (page) => page.evaluate(() => { window.__savedCafeVerificationCanvas = document.querySelector('.cafe-world-canvas'); });
const finalDisposal = async (page) => {
  await page.waitForFunction(() => !document.querySelector('.cafe-world-canvas'));
  assert.equal(await page.evaluate(() => window.__savedCafeVerificationCanvas.dataset.running), 'false');
  const start = Date.now();
  await page.waitForTimeout(5100);
  await page.waitForFunction(() => window.__savedCafeVerificationCanvas.dataset.lifecycle === 'disposed', undefined, { polling: 100, timeout: 120_000 });
  const gpu = await contexts(page);
  assert.equal(gpu.filter((entry) => entry.kind === 'scene' && !entry.lost).length, 0);
  return { waitedAfterRemovalMs: Date.now() - start, lifecycle: await page.evaluate(() => window.__savedCafeVerificationCanvas.dataset.lifecycle), contexts: gpu };
};
const drag = async (page, visible) => {
  if (visible) await page.locator('section[data-scene-surface]').first().dispatchEvent('pointermove');
  await page.waitForFunction((shown) => {
    const chrome = document.querySelector('section[data-scene-surface] > [data-scene-drag]');
    return chrome && (getComputedStyle(chrome).visibility !== 'hidden') === shown;
  }, visible);
  const evidence = await page.evaluate((shown) => {
    const root = document.querySelector('.cafe-world');
    const rect = root.getBoundingClientRect();
    const point = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    const target = document.elementFromPoint(point.x, point.y);
    if (!(shown ? target?.hasAttribute('data-scene-drag') : root.contains(target))) throw new Error('Unexpected cafe drag hit target');
    const event = { bubbles: true, isPrimary: true, pointerId: 71, pointerType: 'mouse', button: 0, clientX: point.x, clientY: point.y };
    target.dispatchEvent(new PointerEvent('pointerdown', event));
    const frameBefore = Number(root.querySelector('canvas').dataset.frames);
    window.dispatchEvent(new PointerEvent('pointermove', { ...event, clientX: point.x + (shown ? 100 : -100) }));
    return { chromeVisibleAtStart: shown, target: target.tagName, look: root.dataset.look, frameBefore, direction: shown ? 1 : -1 };
  }, visible);
  assert.equal(evidence.look, 'drag');
  await page.waitForFunction(({ frameBefore, direction }) => {
    const data = document.querySelector('.cafe-world-canvas')?.dataset;
    return Number(data?.frames) > frameBefore && Number(data?.yaw) * direction > 0.00001;
  }, evidence);
  const yaw = (await snapshot(page)).yaw;
  await page.evaluate(() => window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, isPrimary: true, pointerId: 71, pointerType: 'mouse', button: 0 })));
  assert.equal(await page.locator('.cafe-world').getAttribute('data-look'), null);
  return { ...evidence, yaw, events: 'synthetic pointer events on the actual hit-tested target' };
};

try {
  browser = await chromium.launch({ executablePath: process.env.SCENE_BROWSER_PATH || undefined, headless: true,
    args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-dev-shm-usage', '--autoplay-policy=document-user-activation-required'] });
  const app = await createPage('application');
  const page = app.page;
  await check('cafe application route loads a real scene and requires one playback tap', async () => {
    await page.goto(`${BASE}#/play/amb/focus_cafe`);
    await page.getByRole('heading', { name: '카페 집중', exact: true }).waitFor();
    await page.locator('[data-playback-hint="blocked"]').waitFor();
    assert.equal(await page.getByRole('button', { name: '일시정지', exact: true, includeHidden: true }).count(), 0);
    const initialTimer = await page.locator('[aria-label^="남은 시간"]').first().getAttribute('aria-label');
    await page.waitForTimeout(1300);
    assert.equal(await page.locator('[aria-label^="남은 시간"]').first().getAttribute('aria-label'), initialTimer);
    const rendered = await ready(page);
    assert.equal(await page.locator('.landscape').count(), 0);
    await page.getByRole('button', { name: '눌러서 재생', exact: true }).click();
    const motion = await running(page);
    assert.equal(await page.getByRole('dialog').count(), 0, 'one tap must not open a second confirmation');
    return { route: await page.evaluate(() => location.hash), oneTrustedTap: true, rendered, motion };
  });
  await check('cafe app drag reaches visible and hidden chrome and excludes controls', async () => {
    const visible = await drag(page, true);
    const hidden = await drag(page, false);
    await page.getByRole('button', { name: '일시정지', exact: true, includeHidden: true }).first().dispatchEvent('pointerdown', { isPrimary: true, pointerId: 72, pointerType: 'mouse', button: 0 });
    assert.equal(await page.locator('.cafe-world').getAttribute('data-look'), null, 'transport button must not begin look drag');
    await page.evaluate(() => window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, isPrimary: true, pointerId: 72, pointerType: 'mouse', button: 0 })));
    return { visible, hidden, transportControlsStartDrag: false };
  });
  await check('cafe application pause freezes rendering', async () => { await press(page, '일시정지'); return frozen(page); });
  await check('cafe application desktop and Fold-like paused screenshots', async () => {
    const results = [];
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForFunction(() => {
        const canvas = document.querySelector('.cafe-world-canvas');
        if (!canvas) return false;
        const rect = canvas.getBoundingClientRect();
        const ratio = Math.min(2, Math.max(1, devicePixelRatio));
        return rect.width > 0 && rect.height > 0 && Math.abs(canvas.width - rect.width * ratio) < 3 && Math.abs(canvas.height - rect.height * ratio) < 3;
      });
      const data = await frozen(page);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `no horizontal overflow at ${viewport.name}`);
      results.push({ viewport, data, screenshot: await capture(page, `cafe-app-${viewport.name}`) });
    }
    return results;
  });
  await check('cafe immersive overlay reuses the exact canvas and restores it on Escape', async () => {
    await remember(page);
    await press(page, '전체 화면 보기');
    await page.waitForFunction(() => document.querySelector('[aria-label="몰입 화면"] .cafe-world-canvas') === window.__savedCafeVerificationCanvas);
    assert.equal(await page.locator('.cafe-world-canvas').count(), 1);
    const screenshot = await capture(page, 'cafe-app-immersive');
    const gpu = await contexts(page);
    assert.equal(gpu.filter((entry) => entry.kind === 'scene' && !entry.lost).length, 1);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('[aria-label="몰입 화면"]') && document.querySelector('.cafe-world-canvas') === window.__savedCafeVerificationCanvas);
    return { sameCanvas: true, contexts: gpu, screenshot, data: await frozen(page) };
  });
  await check('cafe application resumes and respects OS and app reduced motion', async () => {
    await press(page, '재생');
    const resumed = await running(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const osReduced = await frozen(page);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await running(page);
    await page.evaluate(() => document.documentElement.classList.add('reduce-motion'));
    const appReduced = await frozen(page);
    await page.evaluate(() => document.documentElement.classList.remove('reduce-motion'));
    return { resumed, osReduced, appReduced, restored: await running(page) };
  });
  await check('cafe simulated hidden signal stops rendering and visible signal resumes', async () => {
    await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
    const hidden = await frozen(page);
    await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
    const restored = await running(page);
    await press(page, '일시정지');
    await frozen(page);
    return { method: 'simulated visibility signal; not a physical background tab', hidden, restored };
  });
  await check('cafe navigation and browser Back restore the correct paused world', async () => {
    await page.evaluate(() => { location.hash = '#/guide'; });
    await page.waitForFunction(() => !document.querySelector('.cafe-world-canvas'));
    await page.goBack();
    await page.getByRole('heading', { name: '카페 집중', exact: true }).waitFor();
    await ready(page);
    assert.equal(await page.evaluate(() => location.hash), '#/play/amb/focus_cafe');
    return frozen(page);
  });
  await check('cafe final app release disposes engine and context after five seconds', async () => {
    await remember(page);
    await page.evaluate(() => { location.hash = '#/guide'; });
    return finalDisposal(page);
  });
  await bounded(() => app.context.close(), 10_000, 'close cafe application');

  const pilot = await createPage('standalone rebuilt pilot');
  await check('rebuilt cafe standalone paused entry contains the real renderer', async () => {
    await pilot.page.goto(`${BASE}immersive-worlds/cafe/pilot/?paused`);
    const rendered = await ready(pilot.page);
    return { rendered, paused: await frozen(pilot.page), screenshot: await capture(pilot.page, 'cafe-standalone-desktop') };
  });
  await check('standalone cafe second holder preserves canvas identity', async () => {
    await remember(pilot.page);
    await press(pilot.page, 'Fullscreen holder');
    await pilot.page.waitForFunction(() => document.querySelector('#fullscreen .cafe-world-canvas') === window.__savedCafeVerificationCanvas);
    assert.equal(await pilot.page.locator('.cafe-world-canvas').count(), 1);
    await press(pilot.page, 'Exit fullscreen');
    await pilot.page.waitForFunction(() => document.querySelector('main .cafe-world-canvas') === window.__savedCafeVerificationCanvas);
    return { sameCanvas: true, contexts: await contexts(pilot.page) };
  });
  await check('standalone cafe unmount reaches final disposal and remount works', async () => {
    await press(pilot.page, 'Unmount');
    const disposed = await finalDisposal(pilot.page);
    await press(pilot.page, 'Mount');
    const remounted = await ready(pilot.page);
    assert.ok(await pilot.page.evaluate(() => document.querySelector('.cafe-world-canvas') !== window.__savedCafeVerificationCanvas));
    return { disposed, remounted };
  });
  await check('cafe has no uncaught runtime or renderer errors', () => { assert.deepEqual(report.errors, []); return { errors: [] }; });
  await bounded(() => pilot.context.close(), 10_000, 'close cafe standalone');
  report.status = report.captureFailures.length ? 'failed' : 'passed';
  if (report.status === 'failed') process.exitCode = 1;
} catch (error) {
  report.status = 'failed';
  report.failure = { step, message: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined };
  await persist();
  if (currentPage && !currentPage.isClosed()) {
    try { report.failure.data = await bounded(() => snapshot(currentPage), 5000, 'failure snapshot'); report.failure.contexts = await bounded(() => contexts(currentPage), 5000, 'failure contexts'); } catch { /* no live canvas after a failed load */ }
  }
  console.error(`FAIL: ${step}: ${report.failure.message}`);
  process.exitCode = 1;
} finally {
  report.finishedAt = new Date().toISOString();
  await persist();
  try { await bounded(() => browser?.close(), 10_000, 'browser cleanup'); } catch (error) { report.cleanupError = String(error); report.status = 'failed'; process.exitCode = 1; await persist(); }
  console.log(`Cafe verification report: ${path.join(output, 'cafe-verification.json')}`);
}
