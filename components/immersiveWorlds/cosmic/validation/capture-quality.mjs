// Visual quality captures for the cosmic garden. Builds the isolated harness
// into a temporary folder (never into public/), serves it and writes PNGs.
//   COSMIC_QA_OUTPUT=/tmp/claude-0/cosmic-captures/after node components/immersiveWorlds/cosmic/validation/capture-quality.mjs
// COSMIC_QA_QUERY=post=off captures the direct (pre-pipeline) renderer for a
// before/after comparison. COSMIC_QA_ACTIVE=<frames> runs the animation and
// captures after that many frames; otherwise the reduced-motion still is used.
// COSMIC_QA_VIEWPORTS narrows the run (desktop,portrait). COSMIC_QA_PORT
// overrides the preview port (default 4318). Any page or shader error fails
// the run. SwiftShader output grades appearance only, never device speed.
import { build, preview } from 'vite';
import react from '@vitejs/plugin-react';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));
const output = path.resolve(process.env.COSMIC_QA_OUTPUT || '/tmp/claude-0/cosmic-captures/latest');
const outDir = path.resolve(process.env.COSMIC_QA_BUILD || '/tmp/claude-0/cosmic-captures/build');
const activeFrames = Number(process.env.COSMIC_QA_ACTIVE || 0);
const port = Number(process.env.COSMIC_QA_PORT || 4318);
const extra = process.env.COSMIC_QA_QUERY ? `&${process.env.COSMIC_QA_QUERY}` : '';
const query = `?clean${activeFrames ? '' : '&still'}${extra}`;
const viewports = [
  ['desktop', 1280, 800],
  ['portrait', 390, 844],
].filter(([name]) => !process.env.COSMIC_QA_VIEWPORTS || process.env.COSMIC_QA_VIEWPORTS.split(',').includes(name));

const config = { configFile: false, root, base: './', publicDir: false, logLevel: 'warn', plugins: [react()] };
await mkdir(output, { recursive: true });
if (!process.env.COSMIC_QA_SKIP_BUILD) {
  await build({ ...config, build: { outDir, emptyOutDir: true, chunkSizeWarningLimit: 4000 } });
}
const server = await preview({ ...config, build: { outDir }, preview: { port, strictPort: true, host: '127.0.0.1' } });
const base = `http://127.0.0.1:${port}/index.html`;
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || '/opt/pw-browsers/chromium',
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-dev-shm-usage'],
});
const report = { query, activeFrames, captures: [], errors: [] };
try {
  for (const [name, width, height] of viewports) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, serviceWorkers: 'block', reducedMotion: activeFrames ? 'no-preference' : 'reduce' });
    page.setDefaultTimeout(activeFrames ? 1_800_000 : 900_000);
    page.on('pageerror', error => report.errors.push(`${name}: ${error.message}`));
    page.on('console', message => {
      if ((message.type() === 'error' || message.type() === 'warning') && !/favicon|status of 404|GPU stall|ReadPixels|KHR_parallel_shader_compile/i.test(message.text())) report.errors.push(`${name}: ${message.type()}: ${message.text()}`);
    });
    const started = Date.now();
    await page.goto(`${base}${query}`);
    await page.waitForSelector('.cosmic-world[data-state="ready"]');
    await page.waitForFunction(({ width, height, frames }) => {
      const canvas = document.querySelector('.cosmic-world-canvas');
      return canvas && canvas.width === width && canvas.height === height && Number(canvas.dataset.frame) > frames
        && Number(getComputedStyle(canvas).opacity) >= 0.999;
    }, { width, height, frames: activeFrames });
    await page.waitForTimeout(500);
    const file = path.join(output, `cosmic-${name}${activeFrames ? '-active' : ''}.png`);
    await page.screenshot({ path: file });
    const info = await page.evaluate(() => {
      const c = document.querySelector('.cosmic-world-canvas');
      return { post: c?.dataset.post ?? null, frame: c?.dataset.frame, time: c?.dataset.time, calls: c?.dataset.drawCalls, triangles: c?.dataset.triangles, quality: c?.dataset.quality, reflection: c?.dataset.reflectionFormat };
    });
    report.captures.push({ viewport: name, width, height, file, seconds: (Date.now() - started) / 1000, ...info });
    console.log(file, JSON.stringify(info), `${((Date.now() - started) / 1000).toFixed(1)}s`);
    await page.close();
  }
} finally {
  await writeFile(path.join(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  await browser.close();
  await new Promise(resolve => server.httpServer.close(resolve));
}
if (report.errors.length) {
  console.error(report.errors.join('\n'));
  process.exitCode = 1;
}
