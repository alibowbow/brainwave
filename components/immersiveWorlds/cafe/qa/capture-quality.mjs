// Visual quality captures for the café: serves the isolated QA harness from
// the Vite dev server and writes lossless PNGs plus a small report.
//   CAFE_QUALITY_OUTPUT=/tmp/cafe/after node components/immersiveWorlds/cafe/qa/capture-quality.mjs
//   CAFE_QUALITY_QUERY=post=off   captures the direct (no HDR pipeline) path
//   CAFE_QUALITY_QUERY=targets=byte  captures the forced byte-target fallback
//   CAFE_QUALITY_ACTIVE=<frames>  runs the real animation loop for that many frames first
//   CAFE_QUALITY_ADVANCE=<seconds> then moves scene time on (rain, steam) and draws
//                                 one frame; SwiftShader is too slow for long real runs
//   CAFE_PORT=4319                dev server port (several agents share the machine)
// SwiftShader renders correctly but slowly; these images grade looks, not speed.
import { createServer } from 'vite';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve(process.env.CAFE_QUALITY_OUTPUT || '/tmp/cafe-quality');
const port = Number(process.env.CAFE_PORT || 4319);
const activeFrames = Number(process.env.CAFE_QUALITY_ACTIVE || 0);
const advance = Number(process.env.CAFE_QUALITY_ADVANCE || 0);
const query = process.env.CAFE_QUALITY_QUERY ? `&${process.env.CAFE_QUALITY_QUERY}` : '';
const viewports = [['desktop', 1280, 800], ['portrait', 390, 844]]
  .filter(([name]) => !process.env.CAFE_VIEWPORTS || process.env.CAFE_VIEWPORTS.split(',').includes(name));

await mkdir(output, { recursive: true });
const server = await createServer({ logLevel: 'warn', server: { host: '127.0.0.1', port, strictPort: true, hmr: false } });
await server.listen();
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || '/opt/pw-browsers/chromium',
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-dev-shm-usage'],
});
const report = { query, activeFrames, advance, captures: [], errors: [] };
try {
  for (const [name, width, height] of viewports) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, serviceWorkers: 'block' });
    page.setDefaultTimeout(900000);
    page.on('pageerror', error => report.errors.push(`${name}: ${error.message}`));
    page.on('console', message => {
      if (message.type() === 'error' && !/favicon|status of 404/.test(message.text())) report.errors.push(`${name}: ${message.text()}`);
      if (message.type() === 'warning' && /shader|program|GL_INVALID|error/i.test(message.text()) && !/ReadPixels/.test(message.text())) report.errors.push(`${name} warning: ${message.text()}`);
    });
    const started = Date.now();
    await page.goto(`http://127.0.0.1:${port}/components/immersiveWorlds/cafe/qa/index.html?paused&nolabel${query}&hdr=force`);
    await page.waitForSelector('.cafe-world[data-state="ready"], .cafe-world[data-state="failed"]');
    if (await page.locator('.cafe-world[data-state="failed"]').count()) { report.errors.push(`${name}: scene failed`); await page.close(); continue; }
    await page.waitForFunction(({ width, height }) => { const c = document.querySelector('canvas'); return c && c.width === width && c.height === height; }, { width, height });
    if (activeFrames) {
      const first = await page.evaluate(() => Number(document.querySelector('canvas').dataset.frames));
      await page.getByRole('button', { name: 'Resume', exact: true }).dispatchEvent('click');
      await page.waitForFunction(n => Number(document.querySelector('canvas')?.dataset.frames) >= n, first + activeFrames, { polling: 250 });
      await page.getByRole('button', { name: 'Pause', exact: true }).dispatchEvent('click');
      await page.waitForFunction(() => document.querySelector('canvas')?.dataset.running === 'false');
    }
    if (advance) await page.evaluate(seconds => window.cafeQA.advance(seconds), advance);
    // Hide the harness chrome so the image shows only the scene.
    await page.addStyleTag({ content: 'nav,.label{display:none!important}' });
    await page.waitForTimeout(300);
    const file = path.join(output, `cafe-${name}${activeFrames || advance ? `-t${(activeFrames * .05 + advance).toFixed(1)}` : ''}.png`);
    await page.screenshot({ path: file });
    const data = await page.evaluate(() => { const c = document.querySelector('canvas'); return { ...c.dataset }; });
    report.captures.push({ viewport: name, file, ms: Date.now() - started, frames: data.frames, time: data.time, post: data.post ?? null, environment: data.environment ?? null, drawCalls: data.drawCalls, triangles: data.triangles });
    console.log(file, `${Date.now() - started}ms`, `calls=${data.drawCalls}`, `tris=${data.triangles}`, data.post ?? '');
    await page.close();
  }
} finally {
  await writeFile(path.join(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  await browser.close();
  await server.close();
}
if (report.errors.length) { console.error(report.errors.join('\n')); process.exitCode = 1; }
