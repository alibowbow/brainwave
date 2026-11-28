// Visual quality captures for the rain-shelter worlds: builds the isolated QA
// harness, renders each world and writes lossless PNGs for side-by-side review.
//   RAIN_QA_OUTPUT=/tmp/rain/after node components/immersiveWorlds/rainShelters/qa/capture-quality.mjs
//   RAIN_QA_QUERY=post=off   keeps the direct (non-HDR) renderer for comparison
//   RAIN_QA_ACTIVE=<frames>  runs the animation and captures after that many frames
//   RAIN_QA_BUNDLE=<dir>     serves (and builds into) another output directory
//   RAIN_QA_SKIP_BUILD=1     serves an existing bundle
//   RAIN_QA_PORT=<port>      preview port (default 4313)
//   RAIN_QA_SHOW_ACTION=1    keep the accessible action chip in the image
// SwiftShader renders correctly but slowly; these images grade looks, not speed.
import { build, preview } from 'vite';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const qaRoot = path.dirname(fileURLToPath(import.meta.url));
const configFile = path.join(qaRoot, 'vite.config.ts');
const output = path.resolve(process.env.RAIN_QA_OUTPUT || 'artifacts/rain-shelters-quality');
const outDir = path.resolve(process.env.RAIN_QA_BUNDLE || path.join(qaRoot, '.bundle'));
const port = Number(process.env.RAIN_QA_PORT || 4313);
const worlds = (process.env.RAIN_QA_WORLDS || 'tent,window,porch,storm').split(',').filter(Boolean);
const activeFrames = Number(process.env.RAIN_QA_ACTIVE || 0);
// Always load paused (a busy software renderer starves page polling), then resume if asked.
const query = (process.env.RAIN_QA_QUERY ? `&${process.env.RAIN_QA_QUERY}` : '') + '&paused=1';
const viewports = [
  ['desktop', 1280, 800],
  ['portrait', 390, 844],
].filter(([name]) => !process.env.RAIN_QA_VIEWPORTS || process.env.RAIN_QA_VIEWPORTS.split(',').includes(name));

await mkdir(output, { recursive: true });
if (!process.env.RAIN_QA_SKIP_BUILD) await build({ configFile, logLevel: 'warn', build: { outDir, emptyOutDir: true } });
const server = await preview({ configFile, build: { outDir }, preview: { host: '127.0.0.1', port, strictPort: true } });
const base = `http://127.0.0.1:${port}/`;
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
      page.setDefaultTimeout(240000);
      page.on('pageerror', error => report.errors.push(`${world}/${name}: ${error.message}`));
      page.on('console', message => {
        if (message.type() === 'error' && !/favicon|status of 404/.test(message.text())) report.errors.push(`${world}/${name}: ${message.text()}`);
        // Driver performance notes and three's PCF notice are not failures; shader/GL errors are.
        if (message.type() === 'warning' && /WebGLProgram|Shader Error|INVALID_|GL_INVALID|not compiled|program not valid/i.test(message.text())) report.errors.push(`${world}/${name}: ${message.text()}`);
      });
      await page.goto(`${base}?world=${world}${query}&hdr=force`);
      const state = await page.waitForSelector('.rain-shelter[data-state="ready"], .rain-shelter[data-state="failed"]');
      if (await state.getAttribute('data-state') === 'failed') { report.errors.push(`${world}/${name}: scene failed`); await page.close(); continue; }
      await page.waitForFunction(({ width, height }) => {
        const canvas = document.querySelector('.rain-shelter-canvas');
        return canvas && canvas.width === width && canvas.height === height && Number(canvas.dataset.frame) > 0;
      }, { width, height });
      if (activeFrames) {
        const start = await page.locator('.rain-shelter-canvas').evaluate(canvas => Number(canvas.dataset.frame));
        await page.locator('#qa-active').dispatchEvent('click');
        await page.waitForFunction(({ start, frames }) => Number(document.querySelector('.rain-shelter-canvas')?.dataset.frame) > start + frames, { start, frames: activeFrames }, { polling: 1000 });
        await page.locator('#qa-active').dispatchEvent('click');
        await page.waitForFunction(() => document.querySelector('.rain-shelter')?.getAttribute('data-motion') === 'paused');
      }
      await page.evaluate(() => { document.documentElement.dataset.qaCapture = 'true'; });
      // Composition images leave out the accessible action chip (it is QA-irrelevant chrome here).
      if (!process.env.RAIN_QA_SHOW_ACTION) await page.addStyleTag({ content: '.rain-shelter-action{visibility:hidden}' });
      await page.locator('.rain-shelter-canvas').evaluate(canvas => canvas.getContext('webgl2')?.finish());
      const file = path.join(output, `${world}-${name}.png`);
      await page.screenshot({ path: file });
      const info = await page.locator('.rain-shelter-canvas').evaluate(canvas => ({ ...canvas.dataset }));
      report.captures.push({ world, viewport: name, width, height, info, file });
      console.log(file, info.post ?? '', `calls=${info.drawCalls} tris=${info.triangles}`);
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
