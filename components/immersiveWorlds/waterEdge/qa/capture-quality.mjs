// Visual quality captures for the water-edge worlds: builds the isolated dev
// harness, renders each world and writes lossless PNGs for side-by-side review.
//   WATER_EDGE_QA_OUTPUT=/tmp/we/after WATER_EDGE_PORT=4311 node components/immersiveWorlds/waterEdge/qa/capture-quality.mjs
// WATER_EDGE_QUERY=post=off captures the direct (non-HDR) renderer path.
// WATER_EDGE_ACTIVE=<frames> runs the animation for that many frames and
// pauses before capture, to check time-driven shading in motion.
// WATER_EDGE_WORLDS / WATER_EDGE_VIEWPORTS narrow the run; WATER_EDGE_SKIP_BUILD
// reuses dev/dist. SwiftShader output grades appearance only, not device speed.
import { build, preview } from 'vite';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const config = path.join(directory, '../dev/vite.config.ts');
const output = path.resolve(process.env.WATER_EDGE_QA_OUTPUT || 'artifacts/water-edge-quality');
const worlds = (process.env.WATER_EDGE_WORLDS || 'night-pond,summer-valley,pebble-shore').split(',').filter(Boolean);
const activeFrames = Number(process.env.WATER_EDGE_ACTIVE || 0);
const port = Number(process.env.WATER_EDGE_PORT || 4187);
const query = process.env.WATER_EDGE_QUERY ? `&${process.env.WATER_EDGE_QUERY}` : '';
const viewports = [
  ['desktop', 1280, 800],
  ['portrait', 390, 844],
].filter(([name]) => !process.env.WATER_EDGE_VIEWPORTS || process.env.WATER_EDGE_VIEWPORTS.split(',').includes(name));

await mkdir(output, { recursive: true });
if (!process.env.WATER_EDGE_SKIP_BUILD) await build({ configFile: config, logLevel: 'warn' });
const server = await preview({ configFile: config, preview: { host: '127.0.0.1', port, strictPort: true } });
const base = `http://127.0.0.1:${port}`;
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || '/opt/pw-browsers/chromium',
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-dev-shm-usage'],
});
const report = { query: process.env.WATER_EDGE_QUERY || '', activeFrames, captures: [], errors: [] };
const inspect = page => page.evaluate(() => window.__waterEdgeQA.inspect());
try {
  for (const world of worlds) {
    for (const [name, width, height] of viewports) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
      page.setDefaultTimeout(240000);
      page.on('pageerror', error => report.errors.push(`${world}/${name}: ${error.message}`));
      page.on('console', message => {
        if (message.type() === 'error' && !/favicon|status of 404/.test(message.text())) report.errors.push(`${world}/${name}: ${message.text()}`);
      });
      await page.goto(`${base}/?world=${world}&active=0${query}&hdr=force`);
      try {
        await page.waitForFunction(() => window.__waterEdgeQA?.inspect().roots.some(root => root.state !== 'loading'), null, { polling: 500 });
      } catch (error) {
        report.errors.push(`${world}/${name}: never left loading (${error.message})`);
        console.error(report.errors.join('\n'));
        await page.close();
        continue;
      }
      if (!(await page.evaluate(() => window.__waterEdgeQA.inspect().roots.some(root => root.state === 'ready')))) {
        report.errors.push(`${world}/${name}: world failed to start`);
        console.error(report.errors.join('\n'));
        await page.close();
        continue;
      }
      await page.waitForFunction(({ width, height }) => {
        const canvas = window.__waterEdgeQA.inspect().canvases[0];
        return canvas && canvas.width === width && canvas.height === height && canvas.frames > 0;
      }, { width, height }, { polling: 500 });
      if (activeFrames) {
        // Start the clock only once the first frame is up; poll on a timer, since
        // software-rendered frames can starve animation-frame polling.
        await page.evaluate(() => window.__waterEdgeQA.setActive(true));
        await page.waitForFunction(frames => window.__waterEdgeQA.inspect().canvases[0].frames > frames, activeFrames, { polling: 1000, timeout: 900000 });
      }
      await page.evaluate(() => window.__waterEdgeQA.setActive(false));
      await page.waitForFunction(() => window.__waterEdgeQA.inspect().roots.every(root => root.motion === 'paused'));
      await page.waitForTimeout(200);
      const drained = await page.evaluate(() => window.__waterEdgeQA.drainGpu(120000));
      const file = path.join(output, `${world}-${name}.png`);
      await page.screenshot({ path: file, timeout: 240000 });
      const state = await inspect(page);
      const canvas = state.canvases[0];
      const post = await page.evaluate(() => document.querySelector('.water-edge-canvas')?.dataset.post ?? null);
      report.captures.push({ world, viewport: name, width, height, post, frames: canvas.frames, time: canvas.time, drawCalls: canvas.drawCalls, triangles: canvas.triangles, drain: drained.status, file });
      console.log(file, `frames=${canvas.frames} time=${canvas.time} calls=${canvas.drawCalls} tris=${canvas.triangles}`, post);
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
