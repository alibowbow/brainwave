// Visual quality captures for the Korean places worlds: builds the isolated QA
// harness, renders each world's first static frame and writes lossless PNGs.
// Run once per variant and compare the folders side by side, for example:
//   KOREAN_QA_OUTPUT=/tmp/kp/after node components/immersiveWorlds/koreanPlaces/qa/capture-quality.mjs
//   KOREAN_QA_QUERY=post=off ... captures the direct (no HDR pipeline) fallback.
// KOREAN_QA_ACTIVE=<frames> runs the animation and captures after that many
// frames, to check time-driven shading (mist, water, wind) in motion.
// KOREAN_QA_PORT overrides the preview port (default 4315).
// SwiftShader renders correctly but slowly; these images grade looks, not speed.
import { build, preview } from 'vite';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const config = 'components/immersiveWorlds/koreanPlaces/qa/vite.config.ts';
const output = path.resolve(process.env.KOREAN_QA_OUTPUT || 'artifacts/korean-places-quality');
const scenes = (process.env.KOREAN_QA_SCENES || 'temple,scops,rural').split(',').filter(Boolean);
const activeFrames = Number(process.env.KOREAN_QA_ACTIVE || 0);
const port = Number(process.env.KOREAN_QA_PORT || 4315);
const query = `capture=1&active=${activeFrames ? 1 : 0}` + (process.env.KOREAN_QA_QUERY ? `&${process.env.KOREAN_QA_QUERY}` : '');
const viewports = [
  ['desktop', 1280, 800],
  ['portrait', 390, 844],
].filter(([name]) => !process.env.KOREAN_QA_VIEWPORTS || process.env.KOREAN_QA_VIEWPORTS.split(',').includes(name));

await mkdir(output, { recursive: true });
if (!process.env.KOREAN_QA_SKIP_BUILD) await build({ configFile: config, logLevel: 'warn' });
const server = await preview({ configFile: config, preview: { port, strictPort: true, host: '127.0.0.1' } });
const base = `http://127.0.0.1:${port}/components/immersiveWorlds/koreanPlaces/qa/index.html`;
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || '/opt/pw-browsers/chromium',
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-dev-shm-usage'],
});
const report = { query, captures: [], errors: [] };
try {
  for (const scene of scenes) {
    for (const [name, width, height] of viewports) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
      page.setDefaultTimeout(900000);
      page.on('pageerror', error => report.errors.push(`${scene}/${name}: ${error.message}`));
      page.on('console', message => {
        // The harness has no favicon; that request is not a scene failure.
        if (message.type() === 'error' && !/favicon|status of 404/.test(message.text())) report.errors.push(`${scene}/${name}: ${message.text()}`);
        if (/Shader Error|Program Info Log|ERROR: \d/.test(message.text())) report.errors.push(`${scene}/${name}: ${message.text()}`);
      });
      const started = Date.now();
      await page.goto(`${base}?scene=${scene}&${query}&hdr=force`);
      await page.waitForSelector('.korean-world[data-state="ready"],.korean-world[data-state="failed"]');
      const state = await page.evaluate(() => document.querySelector('.korean-world')?.getAttribute('data-state'));
      if (state !== 'ready') { report.errors.push(`${scene}/${name}: world state ${state}`); await page.close(); continue; }
      await page.waitForFunction(({ width, height, frames }) => {
        const canvas = document.querySelector('canvas');
        return canvas && canvas.width === width && canvas.height === height && Number(canvas.dataset.frames) > frames;
      }, { width, height, frames: activeFrames });
      if (activeFrames) {
        await page.evaluate(() => window.koreanQA.setActive(false));
        await page.waitForFunction(() => document.querySelector('canvas')?.dataset.running === 'false');
      }
      await page.evaluate(() => window.sceneQAScheduler.flush());
      const file = path.join(output, `${scene}-${name}.png`);
      await page.screenshot({ path: file });
      const data = await page.evaluate(() => ({ ...document.querySelector('canvas')?.dataset }));
      report.captures.push({ scene, viewport: name, width, height, seconds: (Date.now() - started) / 1000, data, file });
      console.log(file, data.post ?? 'direct', `calls=${data.drawCalls} tris=${data.triangles}`, `${((Date.now() - started) / 1000).toFixed(1)}s`);
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
