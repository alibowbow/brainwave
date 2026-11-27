// Visual quality captures for the morning forest's HDR upgrade. Builds the
// isolated harness, renders the first static frame (or an animated frame) and
// writes lossless PNGs plus a small JSON report. Compare folders side by side:
//   FOREST_QA_OUTPUT=/tmp/forest/before node components/immersiveWorlds/forest/qa/capture-hdr.mjs
//   FOREST_QA_OUTPUT=/tmp/forest/direct FOREST_QA_QUERY=post=off node components/immersiveWorlds/forest/qa/capture-hdr.mjs
// FOREST_QA_ACTIVE=<frames> runs the real animation for that many submitted
// frames, pauses through the harness's actual active toggle, then captures.
// FOREST_QA_PORT overrides the preview port (default 4320). SwiftShader output
// grades appearance only; it says nothing about device frame rate.
import { build, preview } from 'vite';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const config = path.join(directory, '../harness.vite.config.ts');
const output = path.resolve(process.env.FOREST_QA_OUTPUT || '/tmp/claude-0/forest-captures/latest');
const activeFrames = Number(process.env.FOREST_QA_ACTIVE || 0);
const port = Number(process.env.FOREST_QA_PORT || 4320);
const extra = process.env.FOREST_QA_QUERY ? `&${process.env.FOREST_QA_QUERY}` : '';
const viewports = [
  ['desktop', 1280, 800],
  ['portrait', 390, 844],
].filter(([name]) => !process.env.FOREST_QA_VIEWPORTS || process.env.FOREST_QA_VIEWPORTS.split(',').includes(name));

await mkdir(output, { recursive: true });
if (!process.env.FOREST_QA_SKIP_BUILD) await build({ configFile: config, logLevel: 'warn' });
const server = await preview({ configFile: config, logLevel: 'warn', preview: { host: '127.0.0.1', port, strictPort: true } });
const base = `http://127.0.0.1:${port}/components/immersiveWorlds/forest/harness.html`;
const browser = await chromium.launch({
  executablePath: process.env.FOREST_QA_BROWSER || '/opt/pw-browsers/chromium',
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-dev-shm-usage'],
});
const report = { query: process.env.FOREST_QA_QUERY || '', activeFrames, captures: [], errors: [] };
const drained = () => {
  const d = document.querySelector('.forest-world-canvas')?.dataset;
  return d?.running === 'false' && d.gpuPending === '0' && d.gpuQueued === 'false';
};
try {
  for (const [name, width, height] of viewports) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    page.setDefaultTimeout(600000);
    page.on('pageerror', error => report.errors.push(`${name}: ${error.message}`));
    page.on('console', message => {
      if (message.type() === 'error' && !/favicon|status of 404/.test(message.text())) report.errors.push(`${name}: ${message.text()}`);
      // Shader compile/link problems surface as warnings; driver notices do not.
      if (message.type() === 'warning' && /shader|program|webgl/i.test(message.text()) && !/KHR_parallel_shader_compile|GPU stall|PCFSoftShadowMap/.test(message.text())) report.errors.push(`${name}: ${message.text()}`);
    });
    const began = Date.now();
    await page.goto(`${base}?capture=1${activeFrames ? '' : '&paused=1'}${extra}`);
    // The canvas fades in over 800 ms; a busy software rasterizer can stall that
    // CSS transition, so captures show the canvas at full opacity immediately.
    await page.addStyleTag({ content: '.forest-world-canvas { transition: none !important; }' });
    await page.waitForSelector('.forest-world[data-state="ready"], .forest-world[data-state="failed"]', { state: 'attached' });
    if (await page.locator('.forest-world').getAttribute('data-state') === 'failed') throw new Error(`${name}: forest fallback rendered`);
    await page.waitForFunction(({ width, height, frames }) => {
      const canvas = document.querySelector('.forest-world-canvas');
      return canvas && canvas.width === width && canvas.height === height && Number(canvas.dataset.frames) > frames;
    }, { width, height, frames: activeFrames }, { polling: 250 });
    if (activeFrames) await page.evaluate(() => document.querySelector('[data-testid="active-toggle"]').click());
    await page.waitForFunction(drained, undefined, { polling: 100 });
    const state = await page.evaluate(() => ({ ...document.querySelector('.forest-world-canvas').dataset }));
    const file = path.join(output, `forest-${name}.png`);
    const bytes = await page.screenshot({ path: file });
    report.captures.push({ viewport: name, width, height, file, sha256: createHash('sha256').update(bytes).digest('hex'), elapsedMs: Date.now() - began,
      frames: state.frames, time: state.time, canopyClusters: state.canopyClusters, postReason: state.postReason, post: state.post ?? 'direct', targetMode: state.targetMode, drawCalls: state.drawCalls, triangles: state.triangles });
    console.log(file, state.post ?? 'direct', `frames=${state.frames}`, `time=${state.time}`, `calls=${state.drawCalls}`, `tris=${state.triangles}`, `clusters=${state.canopyClusters}`, `${Date.now() - began}ms`);
    await page.close();
  }
} catch (error) {
  report.errors.push(String(error?.stack || error));
} finally {
  await writeFile(path.join(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  await browser.close();
  await new Promise(resolve => server.httpServer.close(resolve));
}
if (report.errors.length) {
  console.error(report.errors.join('\n'));
  process.exitCode = 1;
}
