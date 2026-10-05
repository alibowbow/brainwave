// Reproduction of the tent/porch protocols originally executed as inline Node scripts.
// This archived file was written afterward; it is NOT the execution provenance of
// tent-supplement.json, detached-context-diagnostic.json, or porch-fresh-static.json.
// The original reports retain their real run heads and observation timestamps.
// Run from the repository root; generated files use a separate reproduction folder.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import { chromium } from 'playwright-core';

const evidence = path.dirname(fileURLToPath(import.meta.url));
const qa = path.dirname(evidence);
const project = path.resolve(qa, '../../../..');
const output = path.join(evidence, 'reproduced-inline-protocols');
await mkdir(output, { recursive: true });
const server = await preview({ configFile: path.join(qa, 'vite.config.ts') });
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || undefined,
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const report = { gitHead: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: project, encoding: 'utf8' }).trim(), observedAt: new Date().toISOString(), worlds: [] };
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
try {
  for (const world of ['tent', 'porch']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    page.setDefaultTimeout(120_000);
    const canvas = () => page.locator('.rain-shelter-canvas');
    const ready = () => page.waitForSelector('.rain-shelter[data-state="ready"][data-motion="paused"]', { timeout: 240_000 });
    const metrics = () => canvas().evaluate((c) => ({ frame: Number(c.dataset.frame), time: Number(c.dataset.time) }));
    const capture = async (suffix) => {
      await page.evaluate(() => { document.documentElement.dataset.qaCapture = 'true'; });
      await canvas().evaluate((c) => c.getContext('webgl2').finish());
      const file = `${world}-${suffix}.png`;
      const bytes = await page.screenshot({ path: path.join(output, file), animations: 'disabled' });
      await page.evaluate(() => { delete document.documentElement.dataset.qaCapture; });
      assert.ok(bytes.length > 10_000);
      return { file, bytes: bytes.length, sha256: hash(bytes) };
    };
    const result = { world };
    if (world === 'tent') {
      await page.goto('http://127.0.0.1:4175/?world=tent&paused=1', { waitUntil: 'domcontentloaded' });
      await ready();
      const oldCanvas = await canvas().elementHandle();
      await oldCanvas.evaluate((c) => { window.__losses = 0; c.addEventListener('webglcontextlost', () => window.__losses++); });
      await page.locator('#qa-mounted').dispatchEvent('click');
      await page.waitForFunction(() => document.querySelectorAll('.rain-shelter-canvas').length === 0);
      await page.waitForTimeout(5700);
      await page.waitForFunction((c) => c.getContext('webgl2').isContextLost(), oldCanvas);
      result.releasedContext = await oldCanvas.evaluate((c) => ({ connected: c.isConnected, contextLost: c.getContext('webgl2').isContextLost(), lossEvents: window.__losses }));
      assert.equal(result.releasedContext.connected, false);
      assert.equal(result.releasedContext.contextLost, true);
      await page.locator('#qa-mounted').dispatchEvent('click');
      await ready();
      result.freshCanvasDifferent = await canvas().evaluate((c, old) => c !== old, oldCanvas);
      assert.equal(result.freshCanvasDifferent, true);
    }
    await page.goto(`http://127.0.0.1:4175/?world=${world}&static3D=1`, { waitUntil: 'domcontentloaded' });
    await ready();
    await page.evaluate(() => document.fonts.ready);
    result.beforeFrame = await metrics();
    assert.ok(result.beforeFrame.frame >= 1);
    assert.equal(result.beforeFrame.time, 0);
    result.beforePixels = await capture('static-before');
    await page.waitForTimeout(650);
    assert.deepEqual(await metrics(), result.beforeFrame);
    if (world === 'porch') {
      await page.mouse.click(195, 591); // Native sibling-overlay hit on basin water.
      await page.waitForFunction(() => Number(document.querySelector('#qa-events').dataset.count) === 1);
      result.afterFrame = await metrics();
      result.afterPixels = await capture('static-after');
      assert.equal(result.afterFrame.frame, result.beforeFrame.frame + 1);
      assert.equal(result.afterFrame.time, 0);
      assert.notEqual(result.beforePixels.sha256, result.afterPixels.sha256);
      await page.waitForTimeout(650);
      assert.deepEqual(await metrics(), result.afterFrame);
    }
    result.pass = true;
    report.worlds.push(result);
    await context.close();
  }
  report.pass = true;
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
} finally {
  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}
