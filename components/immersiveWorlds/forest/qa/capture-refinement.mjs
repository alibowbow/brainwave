import { chromium } from 'playwright-core';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, '../../../../');
const publicRoot = path.join(root, 'public/immersive-worlds/forest/qa');
const output = path.join(directory, 'refinement');
const mode = process.argv[2] === 'byte' ? 'byte' : 'normal';
await mkdir(output, { recursive: true });
const manifest = JSON.parse(await readFile(path.join(publicRoot, 'build-manifest.json'), 'utf8'));
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const server = createServer(async (request, response) => {
  const filename = path.basename(new URL(request.url, 'http://localhost').pathname) || 'index.html';
  if (!['index.html', 'forest-qa.mjs', 'build-manifest.json'].includes(filename)) { response.writeHead(404).end(); return; }
  try {
    const bytes = await readFile(path.join(publicRoot, filename));
    response.setHeader('Content-Type', filename.endsWith('.mjs') ? 'text/javascript' : filename.endsWith('.json') ? 'application/json' : 'text/html');
    response.end(bytes);
  } catch { response.writeHead(404).end(); }
});
await new Promise((resolve) => server.listen(4189, '127.0.0.1', resolve));
const report = { mode, startedAt: new Date().toISOString(), source: manifest, status: 'running', captures: [], errors: [], checks: [], limitations: ['Chromium software WebGL is visual/functional evidence, not hardware FPS or physical Fold testing.', 'Owned harness DOM/chrome is captured intact. Shared app routing is absent at the guarded source and remains integration-owner work.'] };
let browser;
const checkpoint = () => writeFile(path.join(output, `${mode}-report.json`), JSON.stringify(report, null, 2) + '\n');
async function state(page) {
  return page.locator('.forest-world-canvas').evaluate((canvas) => {
    const gl = canvas.getContext('webgl2'), ext = gl.getExtension('WEBGL_debug_renderer_info');
    return { ...canvas.dataset, width: canvas.width, height: canvas.height, cssWidth: canvas.clientWidth, cssHeight: canvas.clientHeight,
      renderer: gl.getParameter(ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER), version: gl.getParameter(gl.VERSION),
      extensions: { float: !!gl.getExtension('EXT_color_buffer_float'), halfFloat: !!gl.getExtension('EXT_color_buffer_half_float') } };
  });
}
async function drain(page, budget = 45000) {
  const began = Date.now();
  await page.waitForFunction(() => {
    const d = document.querySelector('.forest-world-canvas')?.dataset;
    return d?.running === 'false' && d.gpuPending === '0' && d.gpuQueued === 'false';
  }, undefined, { polling: 25, timeout: budget });
  const result = await page.evaluate(async (remaining) => {
    const canvas = document.querySelector('.forest-world-canvas'), gl = canvas.getContext('webgl2');
    const identity = { frame: canvas.dataset.frames, time: canvas.dataset.time, width: canvas.width, height: canvas.height };
    const at = performance.now();
    if (gl.isContextLost()) throw new Error('Context lost before diagnostic fence');
    const fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    if (!fence) throw new Error('Null diagnostic fence is not GPU completion');
    gl.flush(); let polls = 0;
    try {
      for (;;) {
        await new Promise((resolve) => setTimeout(resolve, 16)); polls++;
        if (gl.isContextLost()) throw new Error('Context lost during diagnostic fence');
        const status = gl.clientWaitSync(fence, 0, 0);
        if (status === gl.WAIT_FAILED) throw new Error('Diagnostic WAIT_FAILED is not GPU completion');
        if (status === gl.ALREADY_SIGNALED || status === gl.CONDITION_SATISFIED) {
          if (document.querySelector('.forest-world-canvas') !== canvas || canvas.dataset.frames !== identity.frame || canvas.dataset.time !== identity.time || canvas.width !== identity.width || canvas.height !== identity.height) throw new Error('Frame changed during completion observation');
          return { diagnosticFenceMs: performance.now() - at, polls, status, ...identity };
        }
        if (status !== gl.TIMEOUT_EXPIRED) throw new Error(`Unexpected fence status ${status}`);
        if (performance.now() - at > remaining) throw new Error('GPU drain budget expired');
      }
    } finally { if (!gl.isContextLost()) gl.deleteSync(fence); }
  }, Math.max(1, budget - (Date.now() - began)));
  return { ...result, queueAndFenceWaitMs: Date.now() - began };
}
async function capture(page, label) {
  const began = Date.now();
  const completion = await drain(page);
  const before = await state(page);
  const bytes = await page.screenshot({ type: 'png', timeout: Math.max(1, 60000 - (Date.now() - began)) });
  const captureMs = Date.now() - began - completion.queueAndFenceWaitMs;
  const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20);
  const viewport = page.viewportSize();
  if (width !== viewport.width || height !== viewport.height) throw new Error('Native compositor dimensions mismatch');
  const filename = `${mode}-${label}.png`;
  await writeFile(path.join(output, filename), bytes);
  report.captures.push({ filename, sha256: hash(bytes), bytes: bytes.length, width, height, method: 'Playwright Chromium native compositor PNG; intact owned harness DOM and scene', completion, captureMs, state: before });
  await checkpoint();
  console.log(JSON.stringify({ captured: filename, captureMs, completion, state: before }));
}
async function sceneReadback(page, label) {
  await drain(page);
  const captured = await page.evaluate(async () => {
    const detail = {};
    document.querySelector('.forest-harness').dispatchEvent(new CustomEvent('forest:diagnostic-capture', { detail }));
    if (detail.error || !detail.result) throw new Error(detail.error || 'No capture promise');
    return await detail.result;
  });
  if (!captured.dataUrl.startsWith('data:image/png;base64,')) throw new Error('Expected actual PNG readback');
  const bytes = Buffer.from(captured.dataUrl.split(',')[1], 'base64');
  const filename = `${mode}-${label}-scene.png`;
  await writeFile(path.join(output, filename), bytes);
  report.captures.push({ filename, sha256: hash(bytes), bytes: bytes.length, width: captured.width, height: captured.height,
    time: captured.time, readbackMs: captured.readbackMs, method: captured.method,
    scope: 'Supplemental native actual scene pixels only; excludes DOM/compositor. Readback time combines GPU wait/readback and PNG encoding; it is not GPU render duration.',
    completionAfterReadback: await drain(page) });
  await checkpoint();
}
try {
  browser = await chromium.launch({ executablePath: process.env.FOREST_QA_BROWSER || '/tmp/cosmic-browser-bin/chromium', headless: true, args: ['--use-angle=swiftshader'] });
  report.browser = await browser.version();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
  const page = await context.newPage();
  page.on('pageerror', (error) => report.errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') report.errors.push(message.text()); });
  await page.goto(`http://127.0.0.1:4189/index.html?paused=1${mode === 'byte' ? '&byte=1' : ''}`);
  const servedBytes = await page.evaluate(async () => Array.from(new Uint8Array(await (await fetch('./forest-qa.mjs')).arrayBuffer())));
  report.servedBundleSha256 = hash(Buffer.from(servedBytes));
  if (report.servedBundleSha256 !== manifest.bundleSha256) throw new Error('Served bundle differs from source-bound build manifest');
  await page.waitForFunction(() => ['ready', 'failed'].includes(document.querySelector('.forest-world')?.dataset.state), undefined, { timeout: 90000 });
  if (await page.locator('.forest-world').getAttribute('data-state') !== 'ready') throw new Error('Renderer entered fallback');
  await page.waitForTimeout(900);
  await capture(page, 'desktop-paused-first');
  await sceneReadback(page, 'desktop');
  await page.setViewportSize({ width: 344, height: 800 });
  await page.waitForFunction(() => document.querySelector('canvas')?.width === 344 && document.querySelector('canvas')?.height === 800);
  await capture(page, 'portrait-paused');
  await sceneReadback(page, 'portrait');
  if (mode === 'normal') {
    await page.setViewportSize({ width: 882, height: 344 });
    await page.waitForFunction(() => document.querySelector('canvas')?.width === 882 && document.querySelector('canvas')?.height === 344);
    const beforeMotion = await state(page), beganMotion = Date.now();
    await page.getByTestId('active-toggle').click();
    await page.waitForFunction((before) => Number(document.querySelector('canvas')?.dataset.frames) > Number(before.frames) + 2 && Number(document.querySelector('canvas')?.dataset.time) > Number(before.time), beforeMotion, { timeout: 45000 });
    // A real browser pointer drag below the intact controls; no engine call.
    await page.mouse.move(430, 280); await page.mouse.down(); await page.mouse.move(485, 288, { steps: 5 });
    await page.waitForFunction(() => Math.abs(Number(document.querySelector('canvas')?.dataset.lookYaw)) > .009, undefined, { timeout: 45000 });
    await page.mouse.up();
    await page.getByTestId('active-toggle').click();
    await page.waitForFunction(() => document.querySelector('canvas')?.dataset.running === 'false');
    report.checks.push({ name: 'Motion and real pointer drag then pause', passed: true, observedWallMs: Date.now() - beganMotion, before: beforeMotion, afterSubmission: await state(page), meaning: 'Submission/time movement only; completion is independently fenced below.' });
    await capture(page, 'motion-drag-paused');
    const beforeTransfers = await state(page);
    for (let i = 0; i < 8; i++) {
      await page.getByTestId('holder-toggle').click();
      await page.setViewportSize({ width: i % 2 ? 882 : 883, height: 344 });
      const observed = await state(page);
      if (Number(observed.gpuPending) > 2) throw new Error('Paused resize/holder transfer exceeded two GPU slots');
    }
    await page.setViewportSize({ width: 882, height: 344 });
    await drain(page);
    const afterTransfers = await state(page);
    report.checks.push({ name: 'Repeated paused resize and holder transfer drain final native frame', passed: beforeTransfers.time === afterTransfers.time && afterTransfers.width === 882 && afterTransfers.height === 344, before: beforeTransfers, after: afterTransfers });
    await capture(page, 'paused-holder-restored');
  }
  if (report.errors.length || report.checks.some((check) => !check.passed)) throw new Error('Observed page/shader errors or failed checks');
  report.status = 'passed';
} catch (error) {
  report.status = 'failed'; report.failure = String(error); process.exitCode = 1; console.error(error);
} finally {
  report.finishedAt = new Date().toISOString(); await checkpoint();
  if (browser) await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
