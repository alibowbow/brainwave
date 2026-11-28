// Visual quality captures for the Living Woods worlds. Builds the isolated QA
// harness, renders each world and writes lossless PNGs of the real WebGL canvas
// (the same synchronous readback the contract runner uses). Run once per
// variant and compare the folders side by side, for example:
//   LIVING_WOODS_QA_OUTPUT=/tmp/lw/before LIVING_WOODS_QUERY=post=off node components/immersiveWorlds/livingWoods/qa/capture-quality.mjs
//   LIVING_WOODS_QA_OUTPUT=/tmp/lw/after node components/immersiveWorlds/livingWoods/qa/capture-quality.mjs
// LIVING_WOODS_ACTIVE=<frames> runs the animation and captures after that many
// frames (wind, rain and drips must move). LIVING_WOODS_PORT overrides 4316.
// SwiftShader renders correctly but slowly: these images grade looks, not speed.
import { build, preview } from 'vite';
import react from '@vitejs/plugin-react';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const qaRoot = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(process.env.LIVING_WOODS_QA_OUTPUT || '/tmp/living-woods-quality');
const outDir = process.env.LIVING_WOODS_QA_DIST || path.join(path.dirname(output), '.living-woods-dist');
const worlds = (process.env.LIVING_WOODS_WORLDS || 'morning,rainy,ancient,bamboo').split(',').filter(Boolean);
const activeFrames = Number(process.env.LIVING_WOODS_ACTIVE || 0);
const port = Number(process.env.LIVING_WOODS_PORT || 4316);
const query = (process.env.LIVING_WOODS_QUERY ? `&${process.env.LIVING_WOODS_QUERY}` : '') + `&active=${activeFrames ? 1 : 0}`;
const viewports = [
  ['desktop', 1280, 800],
  ['portrait', 390, 844],
].filter(([name]) => !process.env.LIVING_WOODS_VIEWPORTS || process.env.LIVING_WOODS_VIEWPORTS.split(',').includes(name));
const config = {
  configFile: false, root: qaRoot, base: '/', publicDir: false, logLevel: 'warn', plugins: [react()],
  build: { outDir, emptyOutDir: true, sourcemap: false },
  preview: { host: '127.0.0.1', port, strictPort: true },
};

await mkdir(output, { recursive: true });
if (!process.env.LIVING_WOODS_SKIP_BUILD) await build(config);
const server = await preview(config);
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || '/opt/pw-browsers/chromium',
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-dev-shm-usage'],
});
const report = { query, activeFrames, captures: [], errors: [] };
try {
  for (const world of worlds) {
    for (const [name, width, height] of viewports) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
      page.setDefaultTimeout(Number(process.env.LIVING_WOODS_TIMEOUT || 900_000));
      page.on('pageerror', error => report.errors.push(`${world}/${name}: ${error.message}`));
      page.on('console', message => {
        if (message.type() === 'error' && !/favicon|status of 404/.test(message.text())) report.errors.push(`${world}/${name}: ${message.text()}`);
        if (message.type() === 'warning' && /shader|program|GL_INVALID|error/i.test(message.text()) && !/GPU stall due to ReadPixels/.test(message.text())) report.errors.push(`${world}/${name}: ${message.text()}`);
      });
      const started = Date.now();
      await page.goto(`http://127.0.0.1:${port}/?world=${world}${query}`);
      await page.waitForFunction(() => document.querySelector('[data-status]')?.getAttribute('data-status') === 'ready');
      await page.waitForFunction(({ width, height, frames }) => {
        const canvas = document.querySelector('canvas[data-engine-id]');
        return canvas && canvas.width === width && canvas.height === height && Number(canvas.dataset.frames) > frames;
      }, { width, height, frames: activeFrames });
      if (activeFrames) {
        await page.evaluate(() => window.__livingWoodsQA.setActive(false));
        await page.waitForFunction(() => document.querySelector('[data-motion]')?.getAttribute('data-motion') === 'paused');
      }
      const data = await page.evaluate(() => window.__livingWoodsQA.captureCanvas());
      const file = path.join(output, `${world}-${name}${activeFrames ? '-active' : ''}.png`);
      await writeFile(file, Buffer.from(data.slice('data:image/png;base64,'.length), 'base64'));
      const stats = await page.evaluate(() => {
        const canvas = document.querySelector('canvas[data-engine-id]');
        const d = canvas?.dataset ?? {};
        return { post: d.post ?? null, time: d.time, frames: d.frames, drawCalls: d.drawCalls, triangles: d.triangles, geometries: d.geometries, textures: d.textures, fault: d.renderFault ?? null };
      });
      if (stats.fault) report.errors.push(`${world}/${name}: render fault ${stats.fault}`);
      report.captures.push({ world, viewport: name, width, height, file, seconds: (Date.now() - started) / 1000, ...stats });
      console.log(file, JSON.stringify(stats), `${((Date.now() - started) / 1000).toFixed(1)}s`);
      await page.close();
    }
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
