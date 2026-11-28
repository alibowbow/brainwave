// Visual quality captures for the quiet sanctuaries (warm heart, snow village and the
// meditation world): builds the isolated QA harness, serves it, renders each world and
// writes lossless PNGs for side-by-side review.
//   SANCTUARY_CAPTURE_OUTPUT=/tmp/claude-0/quietSanctuaries-captures/after node components/immersiveWorlds/quietSanctuaries/qa/capture-quality.mjs
// SANCTUARY_CAPTURE_ACTIVE=<frames> runs the animation and captures after that
// many frames (snow must fall, the warm space must breathe);
// SANCTUARY_CAPTURE_QUERY=post=off captures the direct renderer, t=<seconds> starts the
// scene clock later (compare moments without long animated runs on slow rasterisers);
// SANCTUARY_CAPTURE_WORLDS / SANCTUARY_CAPTURE_VIEWPORTS narrow the run;
// SANCTUARY_CAPTURE_PORT overrides the preview port (default 4317);
// SANCTUARY_CAPTURE_TAP=x,y (CSS pixels as viewport fractions) taps the scene
// before an active capture. Any page or shader error fails the run.
// The harness has no public directory; files under /immersive-worlds/ are answered from
// the repository's public/ (the meditation world's assets: run scripts/prepare-mosi-assets.mjs).
// SwiftShader output grades appearance only, never device speed.
import { build, preview } from 'vite';
import { chromium } from 'playwright-core';
import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const config = 'components/immersiveWorlds/quietSanctuaries/qa/vite.config.ts';
const output = path.resolve(process.env.SANCTUARY_CAPTURE_OUTPUT || '/tmp/claude-0/quietSanctuaries-captures/latest');
const worlds = (process.env.SANCTUARY_CAPTURE_WORLDS || 'warm-heart,snow-village').split(',').filter(Boolean);
const activeFrames = Number(process.env.SANCTUARY_CAPTURE_ACTIVE || 0);
const port = Number(process.env.SANCTUARY_CAPTURE_PORT || 4317);
const tap = process.env.SANCTUARY_CAPTURE_TAP ? process.env.SANCTUARY_CAPTURE_TAP.split(',').map(Number) : null;
const query = (process.env.SANCTUARY_CAPTURE_QUERY ? `&${process.env.SANCTUARY_CAPTURE_QUERY}` : '') + (activeFrames ? '' : '&inactive=1');
const viewports = [
  ['desktop', 1280, 800],
  ['portrait', 390, 844],
].filter(([name]) => !process.env.SANCTUARY_CAPTURE_VIEWPORTS || process.env.SANCTUARY_CAPTURE_VIEWPORTS.split(',').includes(name));

await mkdir(output, { recursive: true });
if (!process.env.SANCTUARY_CAPTURE_SKIP_BUILD) await build({ configFile: config, logLevel: 'warn' });
const server = await preview({ configFile: config, preview: { port, strictPort: true, host: '127.0.0.1' } });
const base = `http://127.0.0.1:${port}/`;
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || '/opt/pw-browsers/chromium',
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-dev-shm-usage'],
});
const report = { query, activeFrames, tap, captures: [], errors: [] };
try {
  for (const world of worlds) {
    for (const [name, width, height] of viewports) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
      await page.route('**/immersive-worlds/**', async (route) => {
        const file = path.resolve('public', decodeURIComponent(new URL(route.request().url()).pathname).replace(/^\/+/, ''));
        if (file.startsWith(path.resolve('public') + path.sep) && await access(file).then(() => true, () => false)) await route.fulfill({ path: file });
        else await route.fulfill({ status: 404, body: '' });
      });
      page.setDefaultTimeout(activeFrames ? 2400000 : 900000);
      page.on('pageerror', error => report.errors.push(`${world}/${name}: ${error.message}`));
      page.on('console', message => {
        if ((message.type() === 'error' || message.type() === 'warning') && !/favicon|status of 404|GPU stall|ReadPixels/i.test(message.text())) report.errors.push(`${world}/${name}: ${message.type()}: ${message.text()}`);
      });
      const started = Date.now();
      await page.goto(`${base}?world=${world}${query}&hdr=force`);
      await page.addStyleTag({ content: '[data-qa-controls] { visibility: hidden !important; }' });
      await page.waitForSelector('.sanctuary-world[data-state="ready"] canvas.sanctuary-canvas');
      await page.waitForFunction(({ width, height }) => {
        const canvas = document.querySelector('canvas.sanctuary-canvas');
        return canvas && canvas.width === width && canvas.height === height && Number(canvas.dataset.frame) >= 1;
      }, { width, height });
      if (activeFrames) {
        if (tap) {
          await page.waitForFunction(() => Number(document.querySelector('canvas.sanctuary-canvas')?.dataset.frame) > 2);
          await page.mouse.click(width * tap[0], height * tap[1]);
        }
        await page.waitForFunction((frames) => Number(document.querySelector('canvas.sanctuary-canvas')?.dataset.frame) > frames, activeFrames);
        await page.evaluate(() => document.querySelector('[data-qa="active"]').click());
        await page.waitForFunction(() => document.querySelector('.sanctuary-world')?.dataset.motion === 'paused');
      }
      await page.waitForTimeout(600);
      const file = path.join(output, `${world}-${name}${activeFrames ? '-active' : ''}.png`);
      await page.screenshot({ path: file });
      const info = await page.evaluate(() => {
        const canvas = document.querySelector('canvas.sanctuary-canvas');
        const events = document.querySelector('[data-qa-events]');
        return { post: canvas?.dataset.post ?? null, frames: canvas?.dataset.frame, elapsed: canvas?.dataset.elapsed, calls: canvas?.dataset.drawCalls, triangles: canvas?.dataset.triangles, interactions: events?.dataset.count };
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
