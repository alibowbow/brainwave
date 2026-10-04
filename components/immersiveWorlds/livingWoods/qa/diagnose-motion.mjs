// A bounded diagnostic of compositor readback after resumed WebGL motion.
// Uses the existing frozen QA bundle; changes no scene or browser policy.
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import { preview } from 'vite';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'evidence', 'motion-diagnostic');
await mkdir(output, { recursive: true });
const previous = JSON.parse(await readFile(path.join(root, 'evidence', 'report.json'), 'utf8'));
const result = { browserMode: 'standard multi-process Chromium', bundleHash: previous.bundleHash, sourceHash: previous.sourceHash, viewport: { width: 640, height: 400 }, events: [], errors: [], passed: false };
const server = await preview({ configFile: false, root, build: { outDir: '.build' }, preview: { host: '127.0.0.1', port: 0 } });
const browser = await chromium.launch({ executablePath: process.env.SCENE_BROWSER_PATH || '/tmp/cosmic-browser-bin/chromium', headless: true, args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: result.viewport, deviceScaleFactor: 1, serviceWorkers: 'block' });
page.setDefaultTimeout(60_000);
page.on('pageerror', (error) => result.errors.push(error.message));
page.on('console', (message) => { if (message.type() === 'error') result.errors.push(message.text()); });
const metrics = () => page.evaluate(() => {
  const canvas = document.querySelector('canvas');
  return { time: Number(canvas?.dataset.time), frames: Number(canvas?.dataset.frames), width: canvas?.width, height: canvas?.height, status: canvas?.closest('[data-status]')?.getAttribute('data-status'), motion: canvas?.closest('[data-status]')?.getAttribute('data-motion') };
});
const record = async (label) => { const data = { label, ...await metrics() }; result.events.push(data); console.log(JSON.stringify(data)); };
try {
  await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/?world=morning&active=0`);
  await page.waitForFunction(() => document.querySelector('canvas')?.closest('[data-status]')?.getAttribute('data-status') === 'ready');
  await record('cold-ready');
  const cold = await page.screenshot({ path: path.join(output, 'cold.png'), timeout: 30_000 });
  await page.evaluate(() => window.__livingWoodsQA.setActive(true));
  await page.waitForFunction(() => Number(document.querySelector('canvas')?.dataset.time) > .1, null, { polling: 50 });
  await record('advanced');
  await page.evaluate(() => window.__livingWoodsQA.setActive(false));
  await page.waitForFunction(() => document.querySelector('canvas')?.closest('[data-status]')?.getAttribute('data-motion') === 'paused', null, { polling: 50 });
  await record('paused');
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await record('paused-after-1000ms');
  const a = result.events.at(-2), b = result.events.at(-1);
  assert.equal(a.frames, b.frames, 'renderer frame counter stops');
  assert.equal(a.time, b.time, 'simulation time stops');
  const after = await page.screenshot({ path: path.join(output, 'after-motion.png'), timeout: 30_000 });
  assert.ok(!cold.equals(after), 'actual visible pixels move between cold and advanced frames');
  assert.deepEqual(result.errors, []);
  result.passed = true;
  console.log('PASS: standard multi-process Chromium resumes, pauses, and captures moved pixels.');
} catch (error) {
  result.errors.push(error.stack || String(error));
  throw error;
} finally {
  await writeFile(path.join(output, 'result.json'), JSON.stringify(result, null, 2) + '\n');
  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}
