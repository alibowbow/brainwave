import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { captureScenePng } from './capture-scene.mjs';

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
  pilotHead: 'c0de2c42bd803545cc1675587eda6ffc84aef9aa',
  renderer: 'Headless Chromium with SwiftShader; no physical device or FPS claim.',
  captureMethod: 'Native Chromium compositor, lossless PNG fast encoding, unchanged viewport and rendering quality.',
  scope: 'Actual amb:focus_cafe application route first, then the rebuilt standalone pilot. Fold-like CSS viewports only.',
  visibilityScope: 'Injected document.hidden getter plus visibilitychange; not an actual background-tab test.',
  fullscreenScope: 'Application CSS immersive overlay and standalone second holder, not the native Fullscreen API.',
  contextScope: 'Capability probe contexts are recorded separately from live cafe renderer contexts; a lost probe is not a second live renderer.',
  visualReview: 'Saved PNGs require human visual review; no automated artistic-quality or audio-audition claim.',
  checks: [], screenshots: [], errors: [], status: 'running',
};
let browser;
let currentPage;
let step = 'launch browser';
await mkdir(output, { recursive: true });

const check = async (name, run) => {
  step = name;
  const start = Date.now();
  const evidence = await run();
  report.checks.push({ name, status: 'passed', elapsedMs: Date.now() - start, evidence });
  console.log(`PASS: ${name}`);
  return evidence;
};
const capture = async (page, name) => {
  const filename = `${name}.png`;
  await captureScenePng(page, path.join(output, filename));
  report.screenshots.push(filename);
  return filename;
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
  const before = await snapshot(page);
  await page.waitForTimeout(300);
  const after = await snapshot(page);
  assert.equal(after.frames, before.frames, 'paused scene must stop drawing');
  assert.equal(after.time, before.time, 'paused simulation must stop advancing');
  return after;
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
  await check('cafe app drag reaches the scene through visible and hidden chrome', async () => ({ visible: await drag(page, true), hidden: await drag(page, false) }));
  await check('cafe application pause freezes rendering', async () => { await press(page, '일시정지'); return frozen(page); });
  await check('cafe application desktop and Fold-like paused screenshots', async () => {
    const results = [];
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.evaluate(() => document.fonts.ready);
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
  await app.context.close();

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
  await pilot.context.close();
  report.status = 'passed';
} catch (error) {
  report.status = 'failed';
  report.failure = { step, message: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined };
  if (currentPage && !currentPage.isClosed()) {
    try { await capture(currentPage, 'cafe-failure'); } catch (captureError) { report.failure.captureError = String(captureError); }
    try { report.failure.data = await snapshot(currentPage); report.failure.contexts = await contexts(currentPage); } catch { /* no live canvas after a failed load */ }
  }
  console.error(`FAIL: ${step}: ${report.failure.message}`);
  process.exitCode = 1;
} finally {
  report.finishedAt = new Date().toISOString();
  await writeFile(path.join(output, 'cafe-verification.json'), `${JSON.stringify(report, null, 2)}\n`);
  await browser?.close();
  console.log(`Cafe verification report: ${path.join(output, 'cafe-verification.json')}`);
}
