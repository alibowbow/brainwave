import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, preview } from 'vite';
import react from '@vitejs/plugin-react';
import { chromium } from 'playwright-core';

const qaRoot = path.dirname(fileURLToPath(import.meta.url));
const groupRoot = path.dirname(qaRoot);
const hash = (data) => createHash('sha256').update(data).digest('hex');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function collect(directory, parent = directory) {
  const result = [];
  for (const item of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    if (['evidence', '.build', 'node_modules'].includes(item.name)) continue;
    const file = path.join(directory, item.name);
    if (item.isDirectory()) result.push(...await collect(file, parent));
    else result.push({ path: path.relative(parent, file).replaceAll(path.sep, '/'), sha256: hash(await readFile(file)) });
  }
  return result;
}

async function browserPath() {
  const candidates = [process.env.SCENE_BROWSER_PATH, chromium.executablePath(), '/tmp/cosmic-browser-bin/chromium'];
  for (const candidate of candidates) {
    if (!candidate) continue;
    try { await access(candidate); if ((await stat(candidate)).size > 100_000) return candidate; } catch { /* Try the next already-installed route. */ }
  }
  throw new Error('No installed Chromium executable. Run the repository CI browser-install step, then set SCENE_BROWSER_PATH if needed. This runner never downloads browsers.');
}

/** Runs against an isolated production build; no app route or shared source is changed. */
export async function runLivingWoodsQA() {
  const worlds = (process.env.LIVING_WOODS_WORLDS || 'morning,rainy,ancient,bamboo').split(',');
  for (const world of worlds) assert.ok(['morning', 'rainy', 'ancient', 'bamboo'].includes(world), `unknown world ${world}`);
  const output = path.resolve(process.env.SCENE_SCREENSHOT_DIR || path.join(qaRoot, 'evidence'));
  await mkdir(output, { recursive: true });
  const sourceFiles = await collect(groupRoot);
  const sourceHash = hash(JSON.stringify(sourceFiles));
  const options = {
    configFile: false,
    root: qaRoot,
    base: '/',
    plugins: [react()],
    build: { outDir: '.build', emptyOutDir: true, sourcemap: false },
  };
  await build(options);
  const bundleFiles = await collect(path.join(qaRoot, '.build'));
  const report = {
    generatedAt: new Date().toISOString(),
    sourceRevision: process.env.SCENE_SOURCE_REVISION || 'uncommitted source snapshot; use sourceHash/sourceFiles for exact provenance',
    sourceHash,
    sourceFiles,
    bundleHash: hash(JSON.stringify(bundleFiles)),
    bundleFiles,
    environment: { renderer: 'Chromium software WebGL (SwiftShader)', hardwareClaim: 'Viewport checks only; no physical phone/Fold or device FPS/thermal claim.', hiddenTest: 'Synthetic visibilitychange with document.hidden/visibilityState override, not real tab switching.' },
    scenes: [],
    errors: [],
    passed: false,
  };
  const executablePath = await browserPath();
  report.environment.browserExecutable = executablePath;
  const server = await preview({ ...options, preview: { host: '127.0.0.1', port: 0, strictPort: false } });
  const address = server.httpServer.address();
  assert.ok(address && typeof address !== 'string');
  const base = `http://127.0.0.1:${address.port}`;
  let browser;
  try {
    browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-zygote', '--single-process'] });
    report.environment.browserVersion = browser.version();
    for (const world of worlds) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
      page.setDefaultTimeout(120_000);
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      const entry = { world, screenshots: [], checks: {}, metrics: [], errors };
      report.scenes.push(entry);
      console.log(`Living Woods QA: ${world}`);
      const api = (method, value) => page.evaluate(({ method, value }) => window.__livingWoodsQA[method](value), { method, value });
      const metrics = () => page.evaluate(() => {
        const canvas = document.querySelector('canvas[data-engine-id]');
        const host = canvas?.closest('[data-status]');
        return { canvasCount: document.querySelectorAll('canvas').length, engine: canvas?.dataset.engineId, frames: Number(canvas?.dataset.frames), time: Number(canvas?.dataset.time), drawCalls: Number(canvas?.dataset.drawCalls), triangles: Number(canvas?.dataset.triangles), geometries: Number(canvas?.dataset.geometries), textures: Number(canvas?.dataset.textures), width: canvas?.width, height: canvas?.height, status: host?.getAttribute('data-status'), motion: host?.getAttribute('data-motion') };
      });
      const waitReady = () => page.waitForFunction(() => document.querySelector('canvas[data-engine-id]')?.closest('[data-status]')?.getAttribute('data-status') === 'ready');
      const waitMotion = (motion) => page.waitForFunction((expected) => document.querySelector('canvas[data-engine-id]')?.closest('[data-status]')?.getAttribute('data-motion') === expected, motion);
      const shot = async (label) => {
        const filename = `${world}-${label}.png`;
        const bytes = await page.screenshot({ path: path.join(output, filename) });
        assert.ok(bytes.length > 10_000, `${world}/${label} must contain an actual rendered scene`);
        entry.screenshots.push({ file: filename, sha256: hash(bytes), bytes: bytes.length, viewport: page.viewportSize(), bundleHash: report.bundleHash });
        return bytes;
      };
      const still = async (check) => {
        await delay(350);
        const before = await metrics();
        const first = await page.screenshot();
        await delay(700);
        const second = await page.screenshot();
        const after = await metrics();
        assert.equal(after.frames, before.frames, `${world}: ${check} stops frame production`);
        assert.equal(after.time, before.time, `${world}: ${check} stops scene simulation`);
        assert.ok(first.equals(second), `${world}: ${check} keeps identical rendered pixels`);
        entry.checks[check] = { passed: true, before, after, identicalPixels: true };
      };
      try {
        await page.goto(`${base}/?world=${world}`);
        await waitReady();
        await waitMotion('running');
        const before = await metrics();
        assert.equal(before.canvasCount, 1);
        assert.ok(before.width > 0 && before.height > 0);
        const pixelsBefore = await page.screenshot();
        await page.waitForFunction((previous) => Number(document.querySelector('canvas')?.dataset.time) > previous + 0.3, before.time);
        const pixelsAfter = await page.screenshot();
        assert.ok(!pixelsBefore.equals(pixelsAfter), `${world}: actual visible pixels move`);
        entry.checks.actualMotion = { passed: true, before, after: await metrics(), differentPixels: true };

        await api('setActive', false);
        await waitMotion('paused');
        await still('inactive');
        await shot('desktop');
        entry.metrics.push({ viewport: 'desktop', ...await metrics() });
        await page.setViewportSize({ width: 390, height: 844 });
        await delay(450);
        await shot('portrait');
        entry.metrics.push({ viewport: 'portrait', ...await metrics() });
        await page.setViewportSize({ width: 882, height: 768 });
        await delay(450);
        await shot('fold-inner-viewport');
        entry.metrics.push({ viewport: 'fold-inner-viewport', ...await metrics() });
        if (process.env.LIVING_WOODS_SCREENSHOTS_ONLY === '1' || process.env.QA_CAPTURE_ONLY === '1' || process.argv.includes('--capture-only')) {
          assert.deepEqual(errors, [], `${world}: no JavaScript/WebGL errors`);
          entry.checks.scope = 'screenshots and motion/pause only';
          continue;
        }

        await page.setViewportSize({ width: 1280, height: 800 });
        await api('setActive', true);
        await waitMotion('running');
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await waitMotion('paused');
        await still('reducedMotion');
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await waitMotion('running');
        await api('setStatic', true);
        await waitMotion('paused');
        await still('static3D');
        await api('setStatic', false);
        await waitMotion('running');
        await page.evaluate(() => {
          Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
          Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
          document.dispatchEvent(new Event('visibilitychange'));
        });
        await waitMotion('paused');
        await still('syntheticHidden');
        await page.evaluate(() => {
          delete document.hidden;
          delete document.visibilityState;
          document.dispatchEvent(new Event('visibilitychange'));
        });
        await waitMotion('running');

        await api('clearEvents');
        const targets = await api('targets');
        assert.ok(targets.length > 0, `${world}: the raycast target projects into the visible view`);
        let tapped;
        for (const target of targets) {
          await page.mouse.click(target.clientX, target.clientY);
          await delay(120);
          if ((await api('events')).length) { tapped = target; break; }
        }
        assert.ok(tapped, `${world}: actual pointer tap must hit a scene object`);
        const events = await api('events');
        entry.checks.raycastTap = { passed: true, target: tapped, events };
        assert.equal(events.length, 1, `${world}: one tap emits one bounded interaction event`);
        await shot('interaction');
        await delay(800); // Beyond interaction cooldown: an accidental tap must not be masked.
        await api('clearEvents');
        const latest = (await api('targets'))[0];
        await page.mouse.move(latest.clientX, latest.clientY);
        await page.mouse.down();
        await page.mouse.move(Math.min(1260, latest.clientX + 130), Math.max(25, latest.clientY - 45), { steps: 6 });
        await page.mouse.up();
        await delay(150);
        assert.equal((await api('events')).length, 0, `${world}: drag does not trigger a tap`);
        entry.checks.dragNotTap = { passed: true };
        await delay(800); // Cancellation is tested outside the engine's tap rate limit.
        await page.evaluate(() => {
          const canvas = document.querySelector('canvas');
          const target = window.__livingWoodsQA.targets()[0];
          const init = { bubbles: true, isPrimary: true, pointerId: 31, pointerType: 'touch', button: 0, clientX: target.clientX, clientY: target.clientY };
          canvas.dispatchEvent(new PointerEvent('pointerdown', init));
          canvas.dispatchEvent(new PointerEvent('pointercancel', init));
          canvas.dispatchEvent(new PointerEvent('pointerup', init));
          window.dispatchEvent(new PointerEvent('pointerup', init));
        });
        assert.equal((await api('events')).length, 0, `${world}: cancelled pointer cannot emit a tap`);
        entry.checks.pointerCancellation = { passed: true, eventType: 'synthetic PointerEvent cancel sequence' };

        // Portrait needs a deliberate composition, and its near target must
        // remain reachable rather than being cropped outside the narrow frame.
        await page.setViewportSize({ width: 390, height: 844 });
        await delay(800);
        await api('clearEvents');
        const portraitTargets = await api('targets');
        assert.ok(portraitTargets.length > 0, `${world}: portrait raycast target stays onscreen`);
        let portraitTapped;
        for (const target of portraitTargets) {
          await page.mouse.click(target.clientX, target.clientY);
          await delay(120);
          if ((await api('events')).length) { portraitTapped = target; break; }
        }
        assert.ok(portraitTapped, `${world}: portrait near object responds to a real pointer tap`);
        assert.equal((await api('events')).length, 1);
        entry.checks.portraitRaycastTap = { passed: true, target: portraitTapped, events: await api('events') };
        await shot('portrait-interaction');
        await page.setViewportSize({ width: 1280, height: 800 });

        await api('setActive', false);
        await waitMotion('paused');
        await page.evaluate(() => { window.__qaOriginalCanvas = document.querySelector('canvas'); });
        const engineId = (await metrics()).engine;
        await api('setSecond', true);
        await page.waitForFunction(() => !!document.querySelector('[data-qa-holder="secondary"] canvas'));
        assert.equal((await metrics()).canvasCount, 1);
        assert.equal((await metrics()).engine, engineId);
        assert.ok(await page.evaluate(() => document.querySelector('canvas') === window.__qaOriginalCanvas));
        await api('setSecond', false);
        await page.waitForFunction(() => !!document.querySelector('[data-qa-holder="primary"] canvas'));
        assert.ok(await page.evaluate(() => document.querySelector('canvas') === window.__qaOriginalCanvas));
        entry.checks.secondHolderReuse = { passed: true, engineId, identicalCanvasObject: true, scope: 'Same-scene second holder overlay; app fullscreen integration is owned by the integrator.' };

        for (let cycle = 0; cycle < 3; cycle++) {
          await api('setMounted', false);
          await page.waitForFunction(() => !document.querySelector('canvas'));
          await api('setMounted', true);
          await waitReady();
          assert.equal((await metrics()).canvasCount, 1);
          assert.equal((await metrics()).engine, engineId, 'quick remount uses the retained host engine');
        }
        entry.checks.repeatedMount = { passed: true, cycles: 3 };
        await api('setMounted', false);
        await page.waitForFunction(() => !document.querySelector('canvas'));
        const detachedFrames = await page.evaluate(() => window.__qaOriginalCanvas.dataset.frames);
        await delay(5500);
        assert.equal(await page.evaluate(() => window.__qaOriginalCanvas.dataset.frames), detachedFrames, 'detached renderer does not produce frames');
        const disposed = await page.evaluate(() => window.__qaOriginalCanvas.dataset.disposed === 'true');
        assert.ok(disposed, 'host grace period ends in explicit renderer disposal');
        await api('setMounted', true);
        await waitReady();
        assert.notEqual((await metrics()).engine, engineId, 'mount after disposal gets a new engine');
        entry.checks.delayedDisposal = { passed: true, gracePeriodWaitMs: 5500, detachedFramesStable: true, explicitDisposeFlag: disposed };
        assert.deepEqual(errors, [], `${world}: no JavaScript/WebGL errors`);
      } finally {
        await page.close();
        await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
      }
    }
    report.passed = true;
    console.log(`PASS: ${worlds.length} living-woods worlds. Evidence: ${output}; source SHA-256 ${sourceHash}; bundle SHA-256 ${report.bundleHash}`);
    return report;
  } catch (error) {
    report.errors.push(error instanceof Error ? error.stack : String(error));
    throw error;
  } finally {
    await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
    if (browser) await browser.close();
    await new Promise((resolve) => server.httpServer.close(resolve));
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await runLivingWoodsQA();
}
