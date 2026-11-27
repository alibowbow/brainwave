// Visual quality captures for the cozy rooms: builds the isolated QA harness,
// renders each world and writes lossless PNGs plus a small report.
//   COZY_QUALITY_OUTPUT=/tmp/cozy/after node components/immersiveWorlds/cozyRooms/qa/capture-quality.mjs
//   COZY_QUALITY_QUERY=post=off   captures the direct (no HDR pipeline) fallback path
//   COZY_QUALITY_ACTIVE=<frames>  runs the animation for that many frames first
//   COZY_QUALITY_SKIP_BUILD=1     reuses the previous bundle
// SwiftShader renders correctly but slowly; these images grade looks, not speed.
import { build, preview } from 'vite';
import react from '@vitejs/plugin-react';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const qa = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(process.env.COZY_QUALITY_OUTPUT || '/tmp/cozy-quality');
const bundle = path.resolve(process.env.COZY_QUALITY_BUNDLE || '/tmp/cozy-quality-bundle');
const port = Number(process.env.COZY_PORT || 4314);
const worlds = (process.env.COZY_WORLDS || 'relax,sleep_prep,power_nap,nature:winter_lodge').split(',').filter(Boolean);
const activeFrames = Number(process.env.COZY_QUALITY_ACTIVE || 0);
const query = process.env.COZY_QUALITY_QUERY ? `&${process.env.COZY_QUALITY_QUERY}` : '';
const viewports = [['desktop', 1280, 800], ['portrait', 390, 844]]
  .filter(([name]) => !process.env.COZY_VIEWPORTS || process.env.COZY_VIEWPORTS.split(',').includes(name));

await mkdir(output, { recursive: true });
if (!process.env.COZY_QUALITY_SKIP_BUILD) {
  await build({ configFile: false, root: qa, base: './', logLevel: 'warn', plugins: [react()], build: { outDir: bundle, emptyOutDir: true, chunkSizeWarningLimit: 4000 } });
}
const server = await preview({ configFile: false, root: qa, build: { outDir: bundle }, preview: { host: '127.0.0.1', port, strictPort: true } });
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || '/opt/pw-browsers/chromium',
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-dev-shm-usage'],
});
const report = { query, activeFrames, captures: [], errors: [] };
try {
  for (const world of worlds) {
    for (const [name, width, height] of viewports) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, serviceWorkers: 'block' });
      page.setDefaultTimeout(600000);
      page.on('pageerror', error => report.errors.push(`${world}/${name}: ${error.message}`));
      page.on('console', message => {
        if (message.type() === 'error' && !/favicon|status of 404/.test(message.text())) report.errors.push(`${world}/${name}: ${message.text()}`);
        if (message.type() === 'warning' && /shader|program|GL_INVALID|error/i.test(message.text()) && !/ReadPixels/.test(message.text())) report.errors.push(`${world}/${name} warning: ${message.text()}`);
      });
      const started = Date.now();
      await page.goto(`http://127.0.0.1:${port}/?world=${encodeURIComponent(world)}${query}`);
      await page.waitForSelector('.cozy-world[data-state="ready"], .cozy-world[data-state="failed"]');
      if (await page.locator('.cozy-world[data-state="failed"]').count()) { report.errors.push(`${world}/${name}: world failed`); await page.close(); continue; }
      await page.waitForFunction(({ width, height }) => { const c = document.querySelector('canvas'); return c && c.width === width && c.height === height; }, { width, height });
      if (activeFrames) {
        const first = await page.evaluate(() => window.__cozyQA.inspect().frames);
        await page.evaluate(() => window.__cozyQA.setActive(true));
        await page.waitForFunction(n => window.__cozyQA.inspect().frames >= n, first + activeFrames);
        await page.evaluate(() => window.__cozyQA.setActive(false));
        await page.waitForFunction(() => !window.__cozyQA.inspect().running);
      }
      await page.waitForFunction(() => { const d = window.__cozyQA.inspect(); return d && !d.image.dirty && !d.image.awaitingCompletion && d.gpu.inFlight === 0; });
      const file = path.join(output, `${world.replace(':', '-')}-${name}.png`);
      await page.screenshot({ path: file });
      const d = await page.evaluate(() => window.__cozyQA.inspect());
      const post = await page.evaluate(() => document.querySelector('canvas')?.dataset.post ?? null);
      report.captures.push({ world, viewport: name, file, post, ms: Date.now() - started, frames: d.frames, time: d.time, drawCalls: d.drawCalls, triangles: d.triangles, memory: d.memory });
      console.log(file, post, `${Date.now() - started}ms`, `calls=${d.drawCalls}`, `tris=${d.triangles}`);
      await page.close();
    }
  }
} finally {
  await writeFile(path.join(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  await browser.close();
  await new Promise(resolve => server.httpServer.close(resolve));
}
if (report.errors.length) { console.error(report.errors.join('\n')); process.exitCode = 1; }
