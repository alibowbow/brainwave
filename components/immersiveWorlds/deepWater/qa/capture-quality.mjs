// Visual quality captures for the deep-water worlds: builds the isolated QA
// harness, renders each scene's first static frame and writes lossless PNGs.
// Run once per variant and compare the folders side by side, for example:
//   DEEP_WATER_QA_OUTPUT=/tmp/dw/before DEEP_WATER_QUERY=post=off node components/immersiveWorlds/deepWater/qa/capture-quality.mjs
//   DEEP_WATER_QA_OUTPUT=/tmp/dw/after node components/immersiveWorlds/deepWater/qa/capture-quality.mjs
// DEEP_WATER_ACTIVE=<frames> runs the animation instead and captures after that
// many frames, to check time-driven shading (caustics, mist, dust) in motion.
// SwiftShader renders correctly but slowly; these images grade looks, not speed.
import { build, preview } from 'vite';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const config = 'components/immersiveWorlds/deepWater/qa/vite.config.ts';
const output = path.resolve(process.env.DEEP_WATER_QA_OUTPUT || 'artifacts/deep-water-quality');
const scenes = (process.env.DEEP_WATER_SCENES || 'cave,sea,waterfall').split(',').filter(Boolean);
const activeFrames = Number(process.env.DEEP_WATER_ACTIVE || 0);
const query = (process.env.DEEP_WATER_QUERY ? `&${process.env.DEEP_WATER_QUERY}` : '') + (activeFrames ? '&active=1' : '');
const viewports = [
  ['desktop', 1280, 800],
  ['portrait', 390, 844],
].filter(([name]) => !process.env.DEEP_WATER_VIEWPORTS || process.env.DEEP_WATER_VIEWPORTS.split(',').includes(name));

await mkdir(output, { recursive: true });
if (!process.env.DEEP_WATER_SKIP_BUILD) await build({ configFile: config, logLevel: 'warn' });
const server = await preview({ configFile: config });
const base = 'http://127.0.0.1:4198';
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || undefined,
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-dev-shm-usage'],
});
const report = { query: process.env.DEEP_WATER_QUERY || '', captures: [], errors: [] };
try {
  for (const scene of scenes) {
    for (const [name, width, height] of viewports) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
      page.setDefaultTimeout(180000);
      page.on('pageerror', error => report.errors.push(`${scene}/${name}: ${error.message}`));
      page.on('console', message => {
        // The harness has no favicon; that request is not a scene failure.
        if (message.type() === 'error' && !/favicon|status of 404/.test(message.text())) report.errors.push(`${scene}/${name}: ${message.text()}`);
      });
      await page.goto(`${base}/?scene=${scene}${query}`);
      await page.waitForSelector('.deepwater-world[data-state="ready"]');
      await page.waitForFunction(({ width, height, frames }) => {
        const canvas = document.querySelector('canvas');
        return canvas && canvas.width === width && canvas.height === height && Number(canvas.dataset.frames) > frames;
      }, { width, height, frames: activeFrames });
      if (activeFrames) {
        // Stop the clock before capture so the fence wait measures finished work.
        await page.evaluate(() => window.__deepWaterQA.setActive(false));
        await page.waitForFunction(() => document.querySelector('canvas')?.dataset.running === 'false');
      }
      await page.evaluate(() => window.__deepWaterQA.waitGPUIdle());
      const file = path.join(output, `${scene}-${name}.png`);
      await page.screenshot({ path: file });
      const post = await page.evaluate(() => document.querySelector('canvas')?.dataset.post ?? null);
      report.captures.push({ scene, viewport: name, width, height, post, file });
      console.log(file, post);
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
