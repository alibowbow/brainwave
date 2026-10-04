import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

// Run against the OWNED harness build, not the application's production route.
// This is browser viewport/SwiftShader evidence; it is not physical Fold/GPU/FPS evidence.
const here = path.dirname(fileURLToPath(import.meta.url));
const repository = path.resolve(here, '../../../..');
const sourceRoot = path.dirname(here);
const assetRoot = path.join(repository, 'public/immersive-worlds/quietSanctuaries');
const output = path.resolve(process.env.SANCTUARY_QA_OUTPUT || path.join(here, 'evidence'));
const base = (process.env.SANCTUARY_QA_URL || 'http://127.0.0.1:4175').replace(/\/?$/, '/');
const hash = (value) => createHash('sha256').update(value).digest('hex');
const git = (...args) => execFileSync('git', args, { cwd: repository, encoding: 'utf8' }).trim();
const capturesOnly = process.env.SANCTUARY_QA_MODE === 'visual';

async function listFiles(directory, excluded = new Set()) {
  const entries = await readdir(directory, { withFileTypes: true }).catch((error) => {
    if (error.code === 'ENOENT') return [];
    throw error;
  });
  const paths = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (excluded.has(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...await listFiles(full, excluded));
    else paths.push(full);
  }
  return paths;
}

async function manifest(files, root) {
  const entries = [];
  for (const file of files) entries.push({ path: path.relative(root, file).split(path.sep).join('/'), sha256: hash(await readFile(file)) });
  entries.sort((a, b) => a.path.localeCompare(b.path));
  return { sha256: hash(JSON.stringify(entries)), files: entries };
}

await mkdir(output, { recursive: true });
const sourceFiles = [
  ...await listFiles(sourceRoot, new Set(['.build', 'evidence', 'node_modules'])),
  ...await listFiles(assetRoot),
].filter((file) => !file.startsWith(`${output}${path.sep}`));
const sources = await manifest(sourceFiles, repository);
const bundle = await manifest(await listFiles(path.join(here, '.build')), path.join(here, '.build'));
assert.ok(bundle.files.some((file) => file.path === 'index.html'), 'Build the isolated QA harness before verification.');
const report = {
  generatedAt: new Date().toISOString(),
  gitHead: git('rev-parse', 'HEAD'),
  gitBranch: git('branch', '--show-current'),
  ownedGitStatus: git('status', '--short', '--', path.relative(repository, sourceRoot), path.relative(repository, assetRoot)),
  sourceManifest: sources,
  bundleManifest: bundle,
  servedBundleVerified: false,
  base,
  mode: capturesOnly ? 'visual-captures-only' : 'full-lifecycle-and-visual',
  scope: 'Isolated owned components; no shared player integration is claimed.',
  environment: {
    browser: null,
    headless: true,
    graphics: 'Chromium launched with ANGLE SwiftShader; no real-device performance claim.',
    viewportChecks: 'Static visual captures: desktop 1280×800; narrow portrait 390×844; Fold-inner-like 900×650. Motion/interaction/lifecycle: native 640×480 browser viewport to limit software-GPU test contention. The production renderer settings are unchanged. Viewports only, not physical Fold hardware.',
    hiddenCheck: 'Synthetic own-property document.hidden/document.visibilityState override plus visibilitychange; not real OS/browser-tab switching.',
  },
  screenshots: [],
  worlds: [],
  reflectionCapabilities: {
    normal: null,
    forcedMissingExtensions: null,
    limitation: 'The byte path masks two color-buffer extension queries before application startup in a separate browser context; it is capability simulation, not evidence from physically unsupported hardware. No pixel equality between the two material-lighting paths is claimed.',
  },
  errors: [],
  passed: false,
};

let browser;
let previewServer;
try {
  if (process.env.SANCTUARY_QA_SERVE === '1') {
    const { preview } = await import('vite');
    const target = new URL(base);
    previewServer = await preview({ configFile: path.join(here, 'vite.config.ts'), preview: { host: target.hostname, port: Number(target.port || 80), strictPort: true } });
    console.log(`Owned QA preview listening at ${base}`);
  }
  // Bind the resulting screenshots to the EXACT bundle served by the test URL.
  for (const entry of bundle.files) {
    const response = await fetch(new URL(entry.path, base));
    assert.equal(response.status, 200, `served bundle file ${entry.path}`);
    assert.equal(hash(Buffer.from(await response.arrayBuffer())), entry.sha256, `served bundle SHA: ${entry.path}`);
  }
  report.servedBundleVerified = true;
  console.log(`Verified served bundle ${bundle.sha256}`);
  browser = await chromium.launch({
    executablePath: process.env.SCENE_BROWSER_PATH || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    headless: true,
    args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
  });
  report.environment.browser = browser.version();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
  page.setDefaultTimeout(90_000);
  let currentWorld = '';
  const observeErrors = (targetPage, world, scenario) => {
    targetPage.on('pageerror', (error) => report.errors.push({ world: world(), scenario, type: 'pageerror', message: error.message }));
    targetPage.on('console', (message) => {
      const text = message.text();
      if (message.type() === 'error') report.errors.push({ world: world(), scenario, type: 'console', message: text });
      else if (message.type() === 'warning' && /INVALID_|FRAMEBUFFER_(?:UNSUPPORTED|INCOMPLETE)|GL_OUT_OF_MEMORY|CONTEXT_LOST_WEBGL|WebGL.*(?:error|incomplete|invalid)/i.test(text)) {
        report.errors.push({ world: world(), scenario, type: 'gl-warning', message: text });
      }
    });
  };
  observeErrors(page, () => currentWorld, 'normal-capabilities');
  const canvas = () => page.locator('canvas.sanctuary-canvas');
  const press = (action) => page.locator(`[data-qa="${action}"]`).dispatchEvent('click');
  const state = (targetPage = page) => targetPage.locator('canvas.sanctuary-canvas').evaluate((element) => ({
    engineId: element.dataset.engineId,
    frame: Number(element.dataset.frame),
    elapsed: Number(element.dataset.elapsed),
    interactions: Number(element.dataset.interactions),
    width: element.width,
    height: element.height,
    diagnostics: { ...element.dataset },
  }));
  const count = async () => Number(await page.locator('[data-qa-events]').getAttribute('data-count'));
  const motion = async (wanted) => page.waitForFunction((expected) => {
    const element = document.querySelector('canvas.sanctuary-canvas');
    return element?.closest('.sanctuary-world')?.getAttribute('data-motion') === expected;
  }, wanted);
  const ready = async (targetPage = page) => {
    await targetPage.waitForSelector('.sanctuary-world[data-state="ready"] canvas.sanctuary-canvas', { timeout: 180_000 });
    assert.equal(await targetPage.locator('canvas.sanctuary-canvas').count(), 1, 'one scene canvas');
    await targetPage.waitForFunction(() => Number(document.querySelector('canvas.sanctuary-canvas')?.dataset.frame) >= 1);
    const value = await state(targetPage);
    assert.ok(value.width > 0 && value.height > 0 && value.engineId, 'real nonzero renderer with stable identity');
    return value;
  };
  const assertFrozen = async (reason) => {
    await motion('paused');
    await page.waitForTimeout(250);
    const before = await state();
    await page.waitForTimeout(500);
    const after = await state();
    assert.equal(after.frame, before.frame, `${reason}: frame count stops`);
    assert.equal(after.elapsed, before.elapsed, `${reason}: simulation clock stops`);
    return { reason, before, after };
  };
  const assertAdvances = async () => {
    await motion('running');
    const before = await state();
    await page.waitForFunction((prior) => Number(document.querySelector('canvas.sanctuary-canvas')?.dataset.frame) >= prior + 3, before.frame);
    const after = await state();
    assert.ok(after.elapsed > before.elapsed, 'active simulation time advances');
    return { before, after };
  };
  const imageOptions = { style: '[data-qa-controls] { visibility: hidden !important; }', animations: 'disabled' };
  const pixels = async (extra = {}, targetPage = page) => targetPage.screenshot({ ...imageOptions, clip: await targetPage.locator('[data-qa-stage]').boundingBox(), ...extra });
  const screenshot = async (name, targetPage = page, world = currentWorld, scenario = 'normal-capabilities') => {
    const file = `${name}.png`;
    const buffer = await pixels({ path: path.join(output, file) }, targetPage);
    const diagnostics = await state(targetPage);
    assert.ok(buffer.length > 5000, 'actual scene screenshot has nontrivial pixel data');
    const evidence = { file, sha256: hash(buffer), bytes: buffer.length, viewport: targetPage.viewportSize(), world, scenario, sourceSha256: sources.sha256, bundleSha256: bundle.sha256, gitHead: report.gitHead, diagnostics };
    report.screenshots.push(evidence);
    console.log(`Captured ${file} (${buffer.length} bytes; frame ${diagnostics.frame})`);
    return buffer;
  };
  const navigate = async (world, viewport, query = '') => {
    currentWorld = world;
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(`${base}?world=${world}${query}`, { waitUntil: 'networkidle' });
    await ready();
    console.log(`Ready ${world} ${viewport.width}×${viewport.height}${query}`);
  };
  const checkpoint = async (label) => {
    report.lastCompletedCheckpoint = { label, at: new Date().toISOString() };
    await writeFile(path.join(output, 'verification.json'), `${JSON.stringify(report, null, 2)}\n`);
    console.log(`Completed ${label}`);
  };
  const reflectionProbe = async (targetPage, buffer, forced) => {
    const context = await targetPage.locator('canvas.sanctuary-canvas').evaluate((element) => {
      // This retrieves the renderer's existing WebGL2 context, never a competing one.
      const gl = element.getContext('webgl2');
      if (!gl) return null;
      const maskBeforeProbe = window.__sanctuaryExtensionMask ? JSON.parse(JSON.stringify(window.__sanctuaryExtensionMask)) : null;
      const errors = [];
      for (let index = 0; index < 16; index++) {
        const code = gl.getError();
        if (code === gl.NO_ERROR) break;
        errors.push(code);
      }
      return {
        frame: Number(element.dataset.frame),
        type: element.dataset.reflectionTargetType,
        reportedFloatExtension: element.dataset.reflectionFloatExtension,
        reportedHalfFloatExtension: element.dataset.reflectionHalfFloatExtension,
        floatExtension: !!gl.getExtension('EXT_color_buffer_float'),
        halfFloatExtension: !!gl.getExtension('EXT_color_buffer_half_float'),
        advertisedExtensions: gl.getSupportedExtensions()?.filter((name) => /EXT_color_buffer_(?:half_)?float/.test(name)) ?? [],
        contextLost: gl.isContextLost(),
        errors,
        maskBeforeProbe,
      };
    });
    assert.ok(context && !context.contextLost, 'reflection uses a live existing WebGL2 context');
    assert.deepEqual(context.errors, [], 'reflection render leaves no WebGL errors');
    assert.equal(context.reportedFloatExtension, String(context.floatExtension), 'float capability diagnostics match the actual context');
    assert.equal(context.reportedHalfFloatExtension, String(context.halfFloatExtension), 'half-float capability diagnostics match the actual context');
    const expectedType = context.floatExtension || context.halfFloatExtension ? 'half-float' : 'unsigned-byte';
    assert.equal(context.type, expectedType, 'reflection target type matches available color-buffer capabilities');
    if (forced) {
      assert.equal(context.floatExtension, false, 'float color buffers are unavailable to the app');
      assert.equal(context.halfFloatExtension, false, 'half-float color buffers are unavailable to the app');
      assert.equal(context.type, 'unsigned-byte', 'the missing-extension renderer selects the byte target');
      assert.ok(context.maskBeforeProbe?.installedBeforeApplication, 'extension mask is installed before application scripts');
      for (const extension of ['EXT_color_buffer_float', 'EXT_color_buffer_half_float']) {
        assert.ok(context.maskBeforeProbe.blockedRequests.some((request) => request.name === extension && request.observedSceneFrame === 0), `${extension} was masked during renderer startup before its first scene frame`);
      }
    }
    // Decode the captured PNG only for measurement, without changing the WebGL scene.
    // This interior rectangle excludes the rim and bowl in the fixed desktop composition.
    const basinPixels = await targetPage.evaluate(async (base64) => {
      const image = new Image();
      image.src = `data:image/png;base64,${base64}`;
      await image.decode();
      const sample = document.createElement('canvas');
      sample.width = image.naturalWidth; sample.height = image.naturalHeight;
      const ctx = sample.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(image, 0, 0);
      const region = { left: .28, top: .635, right: .68, bottom: .735 };
      const x = Math.round(sample.width * region.left), y = Math.round(sample.height * region.top);
      const width = Math.round(sample.width * (region.right - region.left));
      const height = Math.round(sample.height * (region.bottom - region.top));
      const data = ctx.getImageData(x, y, width, height).data;
      let minimum = Infinity, maximum = -Infinity, sum = 0, sumSquares = 0, samples = 0;
      const colors = new Set();
      for (let row = 0; row < height; row += 3) for (let column = 0; column < width; column += 3) {
        const i = (row * width + column) * 4;
        const luminance = .2126 * data[i] + .7152 * data[i + 1] + .0722 * data[i + 2];
        minimum = Math.min(minimum, luminance); maximum = Math.max(maximum, luminance);
        sum += luminance; sumSquares += luminance * luminance; samples++;
        colors.add((data[i] << 16) | (data[i + 1] << 8) | data[i + 2]);
      }
      const mean = sum / samples;
      return { normalizedRegion: region, pixelRegion: { x, y, width, height }, samples, uniqueColors: colors.size, minimum, maximum, mean, standardDeviation: Math.sqrt(Math.max(0, sumSquares / samples - mean * mean)) };
    }, buffer.toString('base64'));
    assert.ok(basinPixels.uniqueColors >= 16 && basinPixels.maximum - basinPixels.minimum >= 8, 'the rendered basin contains usable nonuniform pixels, not a black/flat failed target');
    return { forced, expectedType, context, basinPixels, screenshotSha256: hash(buffer) };
  };

  // Capture every full-resolution composition first, with true inactive first frames.
  for (const world of ['meditation', 'warm-heart', 'snow-village']) {
    const result = { world, checks: [], tap: null, diagnostics: null, lifecycleViewport: capturesOnly ? null : { width: 640, height: 480 } };
    report.worlds.push(result);
    await navigate(world, { width: 1280, height: 800 }, '&inactive=1');
    result.checks.push(await assertFrozen('desktop 1280×800 initial active=false first frame'));
    const desktop = await screenshot(`${world}-desktop`);
    if (world === 'meditation') report.reflectionCapabilities.normal = await reflectionProbe(page, desktop, false);
    await navigate(world, { width: 390, height: 844 }, '&inactive=1');
    result.checks.push(await assertFrozen('portrait 390×844 initial active=false first frame'));
    await screenshot(`${world}-portrait`);
    await checkpoint(`${world} full-resolution desktop and portrait captures`);
  }
  await navigate('snow-village', { width: 900, height: 650 }, '&inactive=1');
  await assertFrozen('Fold-inner-like landscape composition capture');
  await screenshot('snow-village-fold-inner-viewport');
  await checkpoint('all seven full-resolution visual captures');

  // A fresh isolated context masks capability discovery before the real app initializes.
  // There is no production URL flag, altered shader, alternative renderer, or fallback poster.
  const byteContext = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
  try {
    await byteContext.addInitScript(() => {
      const blocked = new Set(['EXT_color_buffer_float', 'EXT_color_buffer_half_float']);
      const diagnostics = { installedBeforeApplication: true, installedAt: performance.now(), blockedRequests: [] };
      window.__sanctuaryExtensionMask = diagnostics;
      for (const Context of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) {
        if (!Context) continue;
        const original = Context.prototype.getExtension;
        Context.prototype.getExtension = function (name) {
          if (blocked.has(name)) {
            diagnostics.blockedRequests.push({ name, context: Context.name, at: performance.now(), observedSceneFrame: Number(document.querySelector('canvas.sanctuary-canvas')?.dataset.frame ?? 0) });
            return null;
          }
          return original.call(this, name);
        };
      }
    });
    const bytePage = await byteContext.newPage();
    bytePage.setDefaultTimeout(90_000);
    observeErrors(bytePage, () => 'meditation', 'forced-missing-color-buffer-extensions');
    await bytePage.goto(`${base}?world=meditation&inactive=1`, { waitUntil: 'networkidle' });
    await ready(bytePage);
    assert.equal(await bytePage.locator('.sanctuary-world').getAttribute('data-motion'), 'paused', 'byte capability case renders its complete inactive first frame');
    const bytePixels = await screenshot('meditation-byte-fallback-desktop', bytePage, 'meditation', 'forced-missing-color-buffer-extensions');
    report.reflectionCapabilities.forcedMissingExtensions = await reflectionProbe(bytePage, bytePixels, true);
    await checkpoint('normal reflection capability path and forced missing-extension byte first frame');
  } finally {
    await byteContext.close();
  }

  // A smaller native browser viewport makes software-GPU lifecycle checks practical.
  // It changes only the test window size, never scene resolution, quality or frame caps.
  for (const result of report.worlds) {
    const { world } = result;
    if (capturesOnly) {
      result.checks.push('motion and lifecycle checks intentionally skipped in visual-captures-only mode');
      continue;
    }
    await navigate(world, { width: 640, height: 480 });
    // The manual QA toolbar would cover lower foreground targets in this small window.
    // Scene inputs stay genuine; harness toggles remain available through dispatchEvent.
    await page.addStyleTag({ content: '[data-qa-controls] { visibility: hidden !important; }' });
    result.checks.push({ active: await assertAdvances() });
    await press('active');
    await assertFrozen('motion baseline capture');
    const movingBefore = await pixels();
    await press('active');
    await assertAdvances();
    await page.waitForTimeout(700);
    await press('active');
    await assertFrozen('motion advanced-frame capture');
    const movingAfter = await screenshot(`${world}-motion`);
    assert.notEqual(hash(movingBefore), hash(movingAfter), `${world}: actual pixels change while active`);
    result.checks.push('active rendered pixels change (two captured frames; no FPS inference)');
    result.checks.push(await assertFrozen('active=false'));
    await press('active');
    await assertAdvances();

    // Actual pointer clicks are raycast by the world; no direct interaction calls.
    const area = await canvas().boundingBox();
    const originalCount = await count();
    const candidates = [
      [.5, .72], [.5, .86], [.28, .78], [.72, .78], [.5, .55], [.3, .5], [.7, .5],
      ...[.88, .75, .6, .45, .3].flatMap((y) => [.16, .32, .5, .68, .84].map((x) => [x, y])),
    ];
    for (const [nx, ny] of candidates) {
      const x = area.x + area.width * nx;
      const y = area.y + area.height * ny;
      await page.mouse.click(x, y);
      if (await count() > originalCount) { result.tap = { x, y, normalizedX: nx, normalizedY: ny }; break; }
    }
    assert.ok(result.tap, `${world}: a real pointer tap reaches the intended raycast target`);
    const events = JSON.parse(await page.locator('[data-qa-events]').getAttribute('data-events'));
    const emitted = events.at(-1);
    assert.equal(emitted.world, world);
    assert.ok(emitted.strength >= 0 && emitted.strength <= .45, 'bounded interaction strength');
    assert.ok(Number.isFinite(emitted.x) && Math.abs(emitted.x) <= 1, 'bounded finite spatial interaction position');
    result.tap.event = emitted;
    await assertAdvances();
    await press('active');
    await assertFrozen('post-interaction capture');
    await screenshot(`${world}-interaction`);
    await press('active');
    await assertAdvances();
    const interactionsBeforeDrag = await count();
    await page.waitForTimeout(750); // Let the 700ms interaction rate limit expire.
    await page.mouse.move(result.tap.x, result.tap.y);
    await page.mouse.down();
    await page.mouse.move(result.tap.x + 90, result.tap.y - 45, { steps: 8 });
    await page.mouse.up();
    assert.equal(await count(), interactionsBeforeDrag, 'drag never becomes a tap');
    result.checks.push('real pointer drag does not emit tap');
    await page.waitForTimeout(750);
    await page.mouse.move(result.tap.x, result.tap.y);
    await page.mouse.down();
    await page.mouse.move(result.tap.x + 60, result.tap.y - 25, { steps: 4 });
    await page.mouse.move(result.tap.x, result.tap.y, { steps: 4 });
    await page.mouse.up();
    assert.equal(await count(), interactionsBeforeDrag, 'out-and-back drag never becomes a tap');
    result.checks.push('out-and-back drag preserves the moved flag and emits no tap');
    await page.waitForTimeout(750);
    await page.mouse.move(result.tap.x, result.tap.y);
    await page.mouse.down();
    await canvas().dispatchEvent('pointercancel', { pointerId: 1, pointerType: 'mouse', isPrimary: true, bubbles: true });
    await page.mouse.up();
    assert.equal(await count(), interactionsBeforeDrag, 'cancelled pointer does not emit tap');
    result.checks.push('pointer cancellation does not emit tap (synthetic cancel after real down)');
    await checkpoint(`${world} motion and genuine pointer interaction checks at 640×480`);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    result.checks.push(await assertFrozen('prefers-reduced-motion'));
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await assertAdvances();
    await press('static');
    result.checks.push(await assertFrozen('static3D'));
    await press('static');
    await assertAdvances();
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    result.checks.push(await assertFrozen('synthetic hidden=true (not real tab switching)'));
    await page.evaluate(() => {
      delete document.hidden;
      delete document.visibilityState;
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await assertAdvances();
    await checkpoint(`${world} pause, reduced motion, static3D and synthetic visibility`);

    // Preserve the precise DOM canvas object, not merely a similar canvas count.
    await canvas().evaluate((element) => { window.__sanctuaryOriginalCanvas = element; });
    const firstEngine = (await state()).engineId;
    await press('second');
    await page.waitForSelector('[data-qa-holder="second"] canvas.sanctuary-canvas');
    assert.equal(await canvas().count(), 1, 'second holder moves, rather than duplicates, the canvas');
    assert.equal((await state()).engineId, firstEngine, 'second holder keeps the engine identity');
    assert.ok(await canvas().evaluate((element) => element === window.__sanctuaryOriginalCanvas), 'second holder has the exact same canvas object');
    await press('second');
    await page.waitForSelector('[data-qa-holder="primary"] canvas.sanctuary-canvas');
    assert.ok(await canvas().evaluate((element) => element === window.__sanctuaryOriginalCanvas), 'return to primary keeps the exact same canvas');
    result.checks.push('second holder and return both reuse the exact canvas DOM object and engine');
    await checkpoint(`${world} exact canvas reuse across two holders`);

    // Static first frame must work even when mounted directly without active motion.
    await press('mount');
    await page.waitForFunction(() => document.querySelectorAll('canvas.sanctuary-canvas').length === 0);
    await page.waitForTimeout(5300); // The shared host intentionally keeps a five-second grace.
    await press('static');
    await press('mount');
    await ready();
    result.checks.push(await assertFrozen('static3D first mount'));
    assert.ok((await state()).frame >= 1, 'static first mount renders a complete first frame');
    await press('static');
    await assertAdvances();
    for (let cycle = 0; cycle < 3; cycle++) {
      const previousEngine = (await state()).engineId;
      await press('mount');
      await page.waitForFunction(() => document.querySelectorAll('canvas.sanctuary-canvas').length === 0);
      await page.waitForTimeout(350);
      await press('mount');
      await ready();
      assert.equal((await state()).engineId, previousEngine, 'quick remount reuses the engine within the shared grace period');
    }
    result.checks.push('three quick unmount/remount cycles: one canvas and same engine within shared disposal grace');
    const priorEngineId = (await state()).engineId;
    await canvas().evaluate((element) => {
      window.__sanctuaryReleasedCanvas = element;
      window.__sanctuaryReleasedContext = element.getContext('webgl2');
    });
    await press('mount');
    await page.waitForFunction(() => document.querySelectorAll('canvas.sanctuary-canvas').length === 0);
    await page.waitForTimeout(5300);
    await page.waitForFunction(() => window.__sanctuaryReleasedContext?.isContextLost() === true);
    assert.ok(await page.evaluate(() => window.__sanctuaryReleasedContext?.isContextLost()), 'the released renderer actually loses its GPU context after disposal grace');
    result.disposal = { engineId: priorEngineId, minimumGraceWaitMs: 5300, releasedContextLost: true };
    await page.evaluate(() => { delete window.__sanctuaryReleasedCanvas; delete window.__sanctuaryReleasedContext; });
    await press('mount');
    await ready();
    assert.notEqual((await state()).engineId, priorEngineId, 'later mount recreates an engine after disposal grace');
    result.checks.push('last release removes canvas and loses its actual GPU context after grace; later remount creates fresh engine');
    result.diagnostics = await state();
    await press('active');
    await assertFrozen('lifecycle complete');
    await checkpoint(`${world} complete lifecycle including static first mount and disposal grace`);
  }
  assert.deepEqual(report.errors, [], 'no browser runtime, shader, or other console errors');
  report.passed = true;
} catch (error) {
  report.failure = { message: error.message, stack: error.stack };
  console.error(error.stack || error);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  if (previewServer) await new Promise((resolve) => previewServer.httpServer.close(resolve));
  report.finishedAt = new Date().toISOString();
  await writeFile(path.join(output, 'verification.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ passed: report.passed, output, sourceSha256: sources.sha256, bundleSha256: bundle.sha256, screenshots: report.screenshots.length, failure: report.failure?.message }, null, 2));
}
