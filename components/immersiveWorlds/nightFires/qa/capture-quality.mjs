// Visual quality captures for the night worlds: builds the isolated QA harness,
// serves it, renders each world and writes lossless PNGs for side-by-side review.
//   NIGHT_QA_OUTPUT=/tmp/night/after node components/immersiveWorlds/nightFires/qa/capture-quality.mjs
// NIGHT_QA_ACTIVE=<frames> runs the animation and captures after that many
// frames (the fire must move); NIGHT_QA_QUERY=post=off captures the direct
// renderer; NIGHT_QA_WORLDS / NIGHT_QA_VIEWPORTS narrow the run; NIGHT_QA_PORT
// overrides the preview port (default 4312). Any page or shader error fails the
// run. SwiftShader output grades appearance only, never device speed.
import { build, preview } from 'vite';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const config = 'components/immersiveWorlds/nightFires/qa/vite.config.ts';
const output = path.resolve(process.env.NIGHT_QA_OUTPUT || '/tmp/claude-0/nightFires-captures/latest');
const worlds = (process.env.NIGHT_QA_WORLDS || 'mountain,deep,lakeside').split(',').filter(Boolean);
const activeFrames = Number(process.env.NIGHT_QA_ACTIVE || 0);
const port = Number(process.env.NIGHT_QA_PORT || 4312);
const query = (process.env.NIGHT_QA_QUERY ? `&${process.env.NIGHT_QA_QUERY}` : '') + `&active=${activeFrames ? 1 : 0}`;
const viewports = [
  ['desktop', 1280, 800],
  ['portrait', 390, 844],
].filter(([name]) => !process.env.NIGHT_QA_VIEWPORTS || process.env.NIGHT_QA_VIEWPORTS.split(',').includes(name));

await mkdir(output, { recursive: true });
if (!process.env.NIGHT_QA_SKIP_BUILD) await build({ configFile: config, logLevel: 'warn' });
const server = await preview({ configFile: config, preview: { port, strictPort: true, host: '127.0.0.1' } });
const base = `http://127.0.0.1:${port}/components/immersiveWorlds/nightFires/qa/index.html`;
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
      page.setDefaultTimeout(activeFrames ? 1500000 : 600000);
      page.on('pageerror', error => report.errors.push(`${world}/${name}: ${error.message}`));
      page.on('console', message => {
        if ((message.type() === 'error' || message.type() === 'warning') && !/favicon|status of 404|GPU stall|ReadPixels/i.test(message.text())) report.errors.push(`${world}/${name}: ${message.type()}: ${message.text()}`);
      });
      const started = Date.now();
      await page.goto(`${base}?world=${world}${query}&hdr=force`);
      await page.waitForSelector('.night-world[data-state="ready"]');
      await page.waitForFunction(({ width, height, frames }) => {
        const canvas = document.querySelector('.night-world-canvas');
        return canvas && canvas.width === width && canvas.height === height && Number(canvas.dataset.renderCount) > frames;
      }, { width, height, frames: activeFrames });
      if (activeFrames) {
        await page.evaluate(() => window.__nightQA.setActive(false));
        await page.waitForFunction(() => document.querySelector('.night-world')?.dataset.motion === 'paused');
      }
      await page.waitForTimeout(400);
      const file = path.join(output, `${world}-${name}${activeFrames ? '-active' : ''}.png`);
      await page.screenshot({ path: file });
      const info = await page.evaluate(() => {
        const canvas = document.querySelector('.night-world-canvas');
        return { post: canvas?.dataset.post ?? null, frames: canvas?.dataset.renderCount, time: canvas?.dataset.time, calls: canvas?.dataset.calls, triangles: canvas?.dataset.triangles };
      });
      report.captures.push({ world, viewport: name, width, height, file, seconds: (Date.now() - started) / 1000, ...info });
      console.log(file, JSON.stringify(info), `${((Date.now() - started) / 1000).toFixed(1)}s`);
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
