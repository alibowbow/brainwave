/** Owned, isolated browser validation. Build and preview dev/vite.config.ts first.
 * WATER_EDGE_URL=http://127.0.0.1:4187 node .../qa/verify.mjs --serve [--smoke] [--world=night-pond]
 * --smoke writes first-*.png only, for visual iteration. Full run records exact hashes.
 */
import { chromium } from 'playwright-core';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { execFileSync } from 'node:child_process';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const directory = path.dirname(fileURLToPath(import.meta.url));
const ownedRoot = path.dirname(directory);
const args = process.argv.slice(2);
const smoke = args.includes('--smoke');
const screenshotsOnly = args.includes('--screenshots-only');
const onlyWorld = args.find(value => value.startsWith('--world='))?.split('=')[1];
const worlds = (onlyWorld ? [onlyWorld] : ['night-pond', 'summer-valley', 'pebble-shore']);
const base = process.env.WATER_EDGE_URL || 'http://127.0.0.1:4187';
const viewports = { desktop: { width: 1280, height: 800 }, portrait: { width: 390, height: 844 }, 'fold-inner-viewport': { width: 884, height: 700 } };
const sha = (value) => createHash('sha256').update(value).digest('hex');
async function treeHash(root, keep, sourceOnly = false) {
  const digest = createHash('sha256');
  async function walk(dir) {
    for (const entry of (await readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = path.join(dir, entry.name), relative = path.relative(root, file);
      if (!keep(relative)) continue;
      if (entry.isDirectory()) await walk(file);
      else if (!sourceOnly || /\.(tsx?|css|html)$/.test(relative)) digest.update(relative).update('\0').update(await readFile(file)).update('\0');
    }
  }
  await walk(root); return digest.digest('hex');
}
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const server = args.includes('--serve') ? createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, base).pathname;
    const file = path.join(ownedRoot, 'dev/dist', pathname === '/' ? 'index.html' : pathname);
    const data = await readFile(file);
    response.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : file.endsWith('.html') ? 'text/html' : 'application/octet-stream');
    response.end(data);
  } catch { response.statusCode = 404; response.end(); }
}) : null;
if (server) await new Promise((resolve, reject) => { server.once('error', reject); server.listen(Number(new URL(base).port), '127.0.0.1', resolve); });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/tmp/cosmic-browser-bin/chromium', headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-dev-shm-usage'] });
const result = {
  schema: 1, generatedAt: new Date().toISOString(), browser: await browser.version(),
  environment: 'Headless Chromium with software SwiftShader; viewport checks, not physical device performance.',
  visibilityTest: 'Synthetic document.hidden override plus visibilitychange; not real browser tab switching.',
  gitHead: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ownedRoot, encoding: 'utf8' }).trim(),
  gitStatus: execFileSync('git', ['status', '--short'], { cwd: ownedRoot, encoding: 'utf8' }).trim(),
  sourceSha256: await treeHash(ownedRoot, name => !/^(dev|qa)(\/|$)/.test(name), true),
  harnessSha256: await treeHash(path.join(ownedRoot, 'dev'), name => !/^(dist|node_modules)(\/|$)/.test(name), true),
  bundleSha256: await treeHash(path.join(ownedRoot, 'dev/dist'), () => true),
  worlds: {}, failures: [],
};
async function inspect(page) { return page.evaluate(() => window.__waterEdgeQA.inspect()); }
async function ready(page) { await page.waitForFunction(() => window.__waterEdgeQA?.inspect().roots.some(root => root.state === 'ready'), null, { timeout: 60000 }); }
async function waitFrames(page, count = 2) {
  const before = (await inspect(page)).canvases[0]?.frames || 0;
  await page.waitForFunction(({ before, count }) => (window.__waterEdgeQA.inspect().canvases[0]?.frames || 0) >= before + count, { before, count }, { timeout: 30000 });
}
async function freezeCheck(page, label, operation) {
  await operation();
  await page.waitForFunction(() => window.__waterEdgeQA.inspect().roots.every(root => root.motion === 'paused'));
  await page.waitForTimeout(150);
  const before = await inspect(page);
  await page.waitForTimeout(800);
  const after = await inspect(page);
  assert(before.canvases[0].time === after.canvases[0].time, `${label}: animation time advanced`);
  assert(before.canvases[0].frames === after.canvases[0].frames, `${label}: continuous render loop survived pause`);
  return { label, before, after };
}
async function pixelDifference(page, first, second) {
  return page.evaluate(async ({ a, b }) => {
    async function pixels(value) {
      const bytes = Uint8Array.from(atob(value), char => char.charCodeAt(0));
      const bitmap = await createImageBitmap(new Blob([bytes], { type: 'image/png' }));
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height), context = canvas.getContext('2d');
      context.drawImage(bitmap, 0, 0); return context.getImageData(0, 0, bitmap.width, bitmap.height).data;
    }
    const [aPixels, bPixels] = await Promise.all([pixels(a), pixels(b)]);
    let changed = 0, totalDifference = 0;
    for (let i = 0; i < aPixels.length; i += 4) {
      const difference = Math.abs(aPixels[i] - bPixels[i]) + Math.abs(aPixels[i + 1] - bPixels[i + 1]) + Math.abs(aPixels[i + 2] - bPixels[i + 2]);
      if (difference > 6) changed++;
      totalDifference += difference;
    }
    return { changedPixelsOver6RGB: changed, totalPixels: aPixels.length / 4, meanAbsoluteRGBDifference: totalDifference / (aPixels.length / 4 * 3) };
  }, { a: first.toString('base64'), b: second.toString('base64') });
}
try {
  for (const world of worlds) {
    const report = result.worlds[world] = { screenshots: [], consoleErrors: [], pageErrors: [], checks: {} };
    const context = await browser.newContext({ viewport: viewports.desktop, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    page.on('pageerror', error => report.pageErrors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') { report.consoleErrors.push(message.text()); console.error(`${world} console: ${message.text()}`); } });
    try {
      await page.goto(`${base}/?world=${world}&active=0`); await ready(page);
      assert(report.consoleErrors.length === 0 && report.pageErrors.length === 0, 'Shader/page errors on first rendered frame');
      if (!smoke) {
        const version = await inspect(page);
        assert(version.sourceSha256 === result.sourceSha256, 'Built source hash differs from current render source. Rebuild harness.');
        assert(version.harnessSha256 === result.harnessSha256, 'Built harness hash differs from current harness. Rebuild harness.');
      }
      for (const [label, viewport] of Object.entries(viewports)) {
        if (smoke && label === 'fold-inner-viewport') continue;
        await page.setViewportSize(viewport); await page.waitForTimeout(250);
        // Capture a real rendered frame without racing the software GPU animation queue.
        await page.evaluate(() => window.__waterEdgeQA.setActive(false));
        await page.waitForFunction(() => window.__waterEdgeQA.inspect().roots.every(root => root.motion === 'paused'));
        await page.waitForTimeout(150);
        const name = `${smoke ? 'first-' : ''}${world}-${label}.png`;
        assert(report.consoleErrors.length === 0 && report.pageErrors.length === 0, 'Shader/page errors before screenshot');
        const png = await page.screenshot({ path: path.join(directory, name), timeout: 90000 });
        const state = await inspect(page);
        assert(state.canvases.length === 1 && state.canvases[0].width === viewport.width && state.canvases[0].height === viewport.height, `${label}: canvas does not fill viewport`);
        report.screenshots.push({ file: name, sha256: sha(png), viewport, state, captureMode: 'Real WebGL current frame, paused only for screenshot readback' });

        console.log(`${world} ${label}: ${name}`);
      }
      if (smoke || screenshotsOnly) continue;
      await page.setViewportSize(viewports.desktop); await page.waitForTimeout(150);
      const first = await page.screenshot({ timeout: 90000 }); const before = await inspect(page);
      await page.evaluate(() => window.__waterEdgeQA.setActive(true)); await waitFrames(page, 8);
      await page.evaluate(() => window.__waterEdgeQA.setActive(false));
      await page.waitForFunction(() => window.__waterEdgeQA.inspect().roots.every(root => root.motion === 'paused'));
      const second = await page.screenshot({ timeout: 90000 }); const after = await inspect(page);
      const diff = await pixelDifference(page, first, second);
      assert(after.canvases[0].time > before.canvases[0].time && diff.changedPixelsOver6RGB > 15, 'Active scene did not visibly animate');
      report.checks.motion = { before, after, difference: diff, firstSha256: sha(first), secondSha256: sha(second) };
      await page.evaluate(() => window.__waterEdgeQA.setActive(true)); await waitFrames(page);
      report.checks.inactive = await freezeCheck(page, 'active=false', () => page.evaluate(() => window.__waterEdgeQA.setActive(false)));
      await page.evaluate(() => window.__waterEdgeQA.setActive(true)); await waitFrames(page);
      report.checks.static3D = await freezeCheck(page, 'static3D=true', () => page.evaluate(() => window.__waterEdgeQA.setStatic(true)));
      await page.evaluate(() => window.__waterEdgeQA.setStatic(false)); await waitFrames(page);
      report.checks.reducedMotion = await freezeCheck(page, 'emulated prefers-reduced-motion', () => page.emulateMedia({ reducedMotion: 'reduce' }));
      await page.emulateMedia({ reducedMotion: 'no-preference' }); await waitFrames(page);
      report.checks.syntheticHidden = await freezeCheck(page, 'synthetic document.hidden', () => page.evaluate(() => window.__waterEdgeQA.setSyntheticHidden(true)));
      await page.evaluate(() => window.__waterEdgeQA.setSyntheticHidden(null)); await waitFrames(page);
      // A real mouse drag must not become a tap at pointerup.
      await page.evaluate(() => { window.__waterEdgeQA.clearEvents(); window.__waterEdgeQA.setOverlay(true); });
      await page.getByRole('button', { name: 'Overlay QA control' }).click();
      assert((await inspect(page)).events.length === 0, 'Parent overlay control emitted an interaction');
      await page.mouse.move(630, 450); await page.mouse.down(); await page.mouse.move(730, 490, { steps: 6 }); await page.mouse.up();
      assert((await inspect(page)).events.length === 0, 'Drag emitted a tap interaction');
      // Browser automation dispatch covers explicit pointercancel and an outside release within tap tolerance.
      for (const [test, endType, x, endX] of [['cancel', 'pointercancel', 630, 630], ['outside', 'pointerup', 2, -2]]) {
        await page.evaluate(({ endType, x, endX }) => {
          const root = document.querySelector('[data-holder="primary"] [data-world]');
          root.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 17, isPrimary: true, button: 0, clientX: x, clientY: 500 }));
          window.dispatchEvent(new PointerEvent(endType, { bubbles: true, pointerId: 17, isPrimary: true, button: 0, clientX: endX, clientY: 500 }));
        }, { endType, x, endX });
        assert((await inspect(page)).events.length === 0, `${test} emitted a tap interaction`);
      }
      await waitFrames(page, 2);
      const points = world === 'pebble-shore' ? [[.4661, .6446], [.46, .65], [.43, .70]] : world === 'night-pond' ? [[.5, .525], [.675, .55], [.5, .675], [.4, .59], [.65, .63], [.6, .72]] : [[.5, .65], [.4, .62], [.6, .6], [.5, .75]];
      let tapPoint;
      for (const [x, y] of points) {
        await page.mouse.click(x * 1280, y * 800);
        if ((await inspect(page)).events.length) { tapPoint = { x, y }; break; }
      }
      const interaction = (await inspect(page)).events;
      assert(interaction.length === 1, 'Water/pebble tap did not emit one bounded interaction');
      assert(interaction[0].strength >= 0 && interaction[0].strength <= 1 && Number.isFinite(interaction[0].position.x) && Number.isFinite(interaction[0].position.z), 'Unbounded interaction');
      report.checks.pointer = { parentSurfaceOverlayControlSuppressed: true, parentSurfaceOverlayTapWorked: true, realMouseDragNoTap: true, syntheticCancellationNoTap: true, syntheticOutsideReleaseNoTap: true, tapPoint, events: interaction };
      await page.evaluate(() => { window.__waterEdgeQA.setActive(false); window.__waterEdgeQA.setOverlay(false); });
      await page.waitForFunction(() => window.__waterEdgeQA.inspect().roots.every(root => root.motion === 'paused'));
      const canvasBefore = (await inspect(page)).canvases[0]; const createdBefore = (await inspect(page)).diagnostics.created;
      await page.evaluate(() => window.__waterEdgeQA.setSecondHolder(true));
      await page.waitForFunction(() => window.__waterEdgeQA.inspect().canvases[0]?.holder === 'secondary');
      const holderSecond = await inspect(page);
      assert(holderSecond.canvases.length === 1 && holderSecond.canvases[0].id === canvasBefore.id && holderSecond.diagnostics.created === createdBefore, 'Second holder created another canvas/context');
      await page.evaluate(() => window.__waterEdgeQA.setSecondHolder(false));
      await page.waitForFunction(() => window.__waterEdgeQA.inspect().canvases[0]?.holder === 'primary');
      const holderReturned = await inspect(page);
      assert(holderReturned.canvases.length === 1 && holderReturned.canvases[0].id === canvasBefore.id, 'Canvas identity lost returning to primary');
      report.checks.secondHolder = { before: canvasBefore, second: holderSecond, returned: holderReturned, note: 'Holder transfer models shared fullscreen ownership; does not invoke browser Fullscreen API.' };
      report.checks.mountCycles = [];
      for (let cycle = 0; cycle < 2; cycle++) {
        await page.evaluate(() => window.__waterEdgeQA.unmount());
        await page.waitForFunction(() => window.__waterEdgeQA.inspect().diagnostics.live === 0, null, { timeout: 9000 });
        const disposed = await inspect(page);
        assert(disposed.canvases.length === 0 && disposed.diagnostics.created === disposed.diagnostics.disposed, 'Scene leaked after host disposal delay');
        await page.evaluate(() => window.__waterEdgeQA.mount()); await ready(page);
        const remounted = await inspect(page);
        assert(remounted.diagnostics.live === 1 && remounted.canvases.length === 1, 'Remount did not make exactly one engine');
        report.checks.mountCycles.push({ cycle: cycle + 1, disposed, remounted });
      }
      assert(report.pageErrors.length === 0, 'Page errors occurred');
      assert(report.consoleErrors.length === 0, 'Console/shader errors occurred');
      report.pass = true;
      console.log(`${world}: all checks passed`);
    } catch (error) {
      report.pass = false; report.failure = String(error.stack || error);
      report.failureState = await inspect(page).catch(() => null);
      await page.evaluate(() => window.__waterEdgeQA?.setActive(false)).catch(() => {});
      result.failures.push({ world, error: String(error.message || error) });
      console.error(`${world}: ${report.failure}`);
    } finally {
      await writeFile(path.join(directory, 'verification-progress.json'), JSON.stringify(result, null, 2) + '\n');
      await context.close();
    }
  }
} finally {
  await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
  const output = path.join(directory, smoke ? 'first-render.json' : screenshotsOnly ? 'screenshots.json' : onlyWorld ? `verification-${onlyWorld}.json` : 'verification.json');
  await writeFile(output, JSON.stringify(result, null, 2) + '\n');
  console.log(output);
}
if (result.failures.length) process.exitCode = 1;
