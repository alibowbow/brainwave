import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import { chromium } from 'playwright-core';

// Diagnostic only: exercise the currently frozen build, never rebuild or edit
// it, never lower resolution or synthesize a replacement screenshot.
const qaRoot = path.dirname(fileURLToPath(import.meta.url));
const world = process.env.LIVING_WOODS_WORLDS || 'morning';
assert.ok(['morning', 'rainy', 'ancient', 'bamboo'].includes(world));
const output = path.resolve(process.env.SCENE_SCREENSHOT_DIR || path.join(qaRoot, 'hit-diagnostic'));
await mkdir(output, { recursive: true });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function bounded(promise, ms, label) {
  let timer;
  try { return await Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} exceeded ${ms} ms`)), ms); })]); }
  finally { clearTimeout(timer); }
}
const manifest = JSON.parse(await readFile(path.join(qaRoot, '.build-manifest.json'), 'utf8'));
const report = { createdAt: new Date().toISOString(), world, scope: 'Read-only frozen bundle, native hit diagnostic, no acceptance relaxation', manifest, runnerHash: createHash('sha256').update(await readFile(fileURLToPath(import.meta.url))).digest('hex'), snapshots: [], errors: [] };
const server = await preview({ configFile: false, root: qaRoot, build: { outDir: '.build' }, preview: { host: '127.0.0.1', port: 0 } });
const address = server.httpServer.address();
assert.ok(address && typeof address !== 'string');
let browser, page;
try {
  browser = await chromium.launch({ executablePath: process.env.SCENE_BROWSER_PATH || '/tmp/cosmic-browser-bin/chromium', headless: true, args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  await context.addInitScript(() => {
    const diag = { events: [], classChanges: [], point: null, lifecycleSamples: [] };
    setInterval(() => {
      if (diag.lifecycleSamples.length >= 240) return;
      const canvas = document.querySelector('canvas');
      diag.lifecycleSamples.push({ nowMs: performance.now(), readyState: document.readyState, canvasCount: document.querySelectorAll('canvas').length, canvas: canvas ? { dataset: { ...canvas.dataset }, width: canvas.width, height: canvas.height, status: canvas.closest('[data-status]')?.getAttribute('data-status'), motion: canvas.closest('[data-status]')?.getAttribute('data-motion') } : null });
    }, 250);
    const describe = element => {
      if (!(element instanceof Element)) return null;
      const style = getComputedStyle(element), box = element.getBoundingClientRect();
      return { tag: element.tagName, id: element.id, classes: element.getAttribute('class'), world: element.getAttribute('data-world'), surface: element.hasAttribute('data-scene-surface'), drag: element.hasAttribute('data-scene-drag'), role: element.getAttribute('role'), label: element.getAttribute('aria-label'), style: { visibility: style.visibility, pointerEvents: style.pointerEvents, zIndex: style.zIndex, opacity: style.opacity }, box: { x: box.x, y: box.y, width: box.width, height: box.height } };
    };
    const chain = element => { const result = []; for (let item = element; item && result.length < 8; item = item.parentElement) result.push(describe(item)); return result; };
    const snapshot = point => {
      const target = document.elementFromPoint(point.clientX, point.clientY);
      return { nowMs: performance.now(), point, scroll: { x: scrollX, y: scrollY }, activeElement: describe(document.activeElement), target: describe(target), ancestry: chain(target), stack: document.elementsFromPoint(point.clientX, point.clientY).slice(0, 12).map(describe), overlays: [...document.querySelectorAll('[data-scene-drag]')].map(describe), canvas: describe(document.querySelector('canvas')), world: describe(document.querySelector('[data-world]')), events: window.__livingWoodsFollowupQA?.events(), metrics: window.__livingWoodsFollowupQA?.metrics() };
    };
    for (const type of ['pointermove', 'pointerdown', 'pointerup', 'pointerover', 'pointerout', 'click', 'keydown', 'focusin', 'focusout']) document.addEventListener(type, event => {
      if (diag.events.length > 200) return;
      diag.events.push({ type, timeMs: performance.now(), trusted: event.isTrusted, x: event.clientX, y: event.clientY, key: event.key, target: describe(event.target), overlay: describe(document.querySelector('[data-scene-drag]')) });
    }, true);
    const observer = new MutationObserver(records => {
      for (const record of records) if (record.target instanceof Element && record.target.hasAttribute('data-scene-drag')) diag.classChanges.push({ nowMs: performance.now(), overlay: describe(record.target), hit: diag.point ? snapshot(diag.point).target : null });
    });
    document.addEventListener('DOMContentLoaded', () => observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] }));
    window.__hitDiagnostic = { diag, snapshot, setPoint: point => { diag.point = point; } };
  });
  page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
  report.stage = 'navigation';
  await page.goto(`http://127.0.0.1:${address.port}/?world=${world}&mode=player`, { waitUntil: 'domcontentloaded' });
  report.stage = 'initial-ready';
  await page.waitForFunction(() => document.querySelector('canvas')?.closest('[data-status]')?.getAttribute('data-status') === 'ready');
  report.initialReady = await page.evaluate(() => ({ nowMs: performance.now(), canvas: { ...document.querySelector('canvas')?.dataset } }));
  report.stage = 'initial-gpu-retirement';
  await page.waitForFunction(() => Number(document.querySelector('canvas')?.dataset.pendingSubmissions || 0) === 0);
  report.stage = 'native-play-visible-tap';
  await page.keyboard.press('Shift');
  await page.getByRole('button', { name: '재생', exact: true }).click();
  await page.waitForFunction(() => Number(document.querySelector('canvas')?.dataset.time) > 0);
  const snapshot = async (label, point) => { const value = await page.evaluate(point => window.__hitDiagnostic.snapshot(point), point); report.snapshots.push({ label, ...value }); return value; };
  await delay(700);
  await page.evaluate(() => window.__livingWoodsFollowupQA.clearEvents());
  const target = (await page.evaluate(() => window.__livingWoodsFollowupQA.targets()))[0];
  await page.mouse.move(target.clientX, target.clientY); await page.mouse.down(); await page.mouse.up();
  await snapshot('visible-native-tap', target);
  report.stage = 'native-visible-drag';
  await delay(700); await page.evaluate(() => window.__livingWoodsFollowupQA.clearEvents());
  const drag = (await page.evaluate(() => window.__livingWoodsFollowupQA.targets()))[0];
  await page.mouse.move(drag.clientX, drag.clientY); await page.mouse.down();
  await page.mouse.move(Math.min(1200, drag.clientX + 125), Math.max(80, drag.clientY - 35), { steps: 5 }); await page.mouse.up();
  await delay(700); await page.evaluate(() => window.__livingWoodsFollowupQA.clearEvents());
  const hidden = (await page.evaluate(() => window.__livingWoodsFollowupQA.targets()))[0];
  await page.evaluate(point => window.__hitDiagnostic.setPoint(point), hidden);
  await page.mouse.move(hidden.clientX, hidden.clientY);
  report.stage = 'hidden-hit-observation';
  await snapshot('before-hide', hidden);
  const atomic = await page.waitForFunction(point => {
    const overlay = document.querySelector('[data-scene-drag]');
    if (!overlay || getComputedStyle(overlay).visibility !== 'hidden') return false;
    return window.__hitDiagnostic.snapshot(point);
  }, hidden, { timeout: 6500 });
  report.snapshots.push({ label: 'atomic-hidden-and-hit', ...await atomic.jsonValue() });
  await snapshot('separate-next-task-hit', hidden);
  for (const ms of [100, 300, 1000]) { await delay(ms); await snapshot(`hidden-plus-${ms}-ms`, hidden); }
  await page.mouse.down(); await page.mouse.up();
  await snapshot('after-native-hidden-attempt', hidden);
  report.trace = await page.evaluate(() => window.__hitDiagnostic.diag);
  report.stage = 'final-pause-and-gpu-retirement';
  await page.evaluate(() => window.__livingWoodsFollowupQA.setActive(false));
  await page.waitForFunction(() => Number(document.querySelector('canvas')?.dataset.pendingSubmissions || 0) === 0);
  report.stage = 'complete';
} catch (error) {
  report.errors.push(error.stack || String(error));
  if (page) {
    try {
      // DOM-only telemetry does not query GL or submit any frame/readback.
      report.failureState = await bounded(page.evaluate(() => {
        const canvas = document.querySelector('canvas'), world = document.querySelector('[data-world]');
        return { nowMs: performance.now(), readyState: document.readyState, url: location.href, visibility: document.visibilityState, bodyText: document.body.innerText.slice(0, 1500), canvasCount: document.querySelectorAll('canvas').length,
          canvas: canvas ? { dataset: { ...canvas.dataset }, width: canvas.width, height: canvas.height } : null,
          world: world ? { dataset: { ...world.dataset }, bounds: world.getBoundingClientRect().toJSON() } : null,
          trace: window.__hitDiagnostic?.diag };
      }), 2000, 'failure DOM telemetry');
    } catch (telemetryError) { report.failureTelemetryError = telemetryError.message; }
  }
}
finally {
  await writeFile(path.join(output, `${world}-hit-diagnostic.json`), JSON.stringify(report, null, 2) + '\n');
  if (browser) {
    try { await bounded(browser.close(), 10000, 'diagnostic browser close'); }
    catch (error) { report.closeError = error.message; await writeFile(path.join(output, `${world}-hit-diagnostic.json`), JSON.stringify(report, null, 2) + '\n'); }
  }
  await new Promise(resolve => server.httpServer.close(resolve));
}
console.log(`Diagnostic written: ${path.join(output, `${world}-hit-diagnostic.json`)}`);
