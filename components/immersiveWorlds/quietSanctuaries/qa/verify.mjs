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
    viewportChecks: 'Desktop 1280×800; narrow portrait 390×844; Fold-inner-like 900×650. Viewports only, not physical Fold hardware.',
    hiddenCheck: 'Synthetic own-property document.hidden/document.visibilityState override plus visibilitychange; not real OS/browser-tab switching.',
  },
  screenshots: [],
  worlds: [],
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
  page.on('pageerror', (error) => report.errors.push({ world: currentWorld, type: 'pageerror', message: error.message }));
  page.on('console', (message) => {
    if (message.type() === 'error') report.errors.push({ world: currentWorld, type: 'console', message: message.text() });
  });
  const canvas = () => page.locator('canvas.sanctuary-canvas');
  const press = (action) => page.locator(`[data-qa="${action}"]`).dispatchEvent('click');
  const state = () => canvas().evaluate((element) => ({
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
  const ready = async () => {
    await page.waitForSelector('.sanctuary-world[data-state="ready"] canvas.sanctuary-canvas', { timeout: 180_000 });
    assert.equal(await canvas().count(), 1, 'one scene canvas');
    await page.waitForFunction(() => Number(document.querySelector('canvas.sanctuary-canvas')?.dataset.frame) >= 1);
    const value = await state();
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
  const pixels = async (extra = {}) => page.screenshot({ ...imageOptions, clip: await page.locator('[data-qa-stage]').boundingBox(), ...extra });
  const screenshot = async (name) => {
    const file = `${name}.png`;
    const buffer = await pixels({ path: path.join(output, file) });
    const diagnostics = await state();
    assert.ok(buffer.length > 5000, 'actual scene screenshot has nontrivial pixel data');
    const evidence = { file, sha256: hash(buffer), bytes: buffer.length, viewport: page.viewportSize(), world: currentWorld, sourceSha256: sources.sha256, bundleSha256: bundle.sha256, gitHead: report.gitHead, diagnostics };
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

  for (const world of ['meditation', 'warm-heart', 'snow-village']) {
    const result = { world, checks: [], tap: null, diagnostics: null };
    report.worlds.push(result);
    if (capturesOnly) {
      await navigate(world, { width: 1280, height: 800 }, '&inactive=1');
      await assertFrozen('desktop inactive first-frame visual capture');
      await screenshot(`${world}-desktop`);
      await navigate(world, { width: 390, height: 844 }, '&inactive=1');
      await assertFrozen('portrait inactive first-frame visual capture');
      await screenshot(`${world}-portrait`);
      result.checks.push('motion and lifecycle checks intentionally skipped in visual-captures-only mode; real spatial first frames captured');
      continue;
    }
    await navigate(world, { width: 1280, height: 800 });
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
    await screenshot(`${world}-desktop`);
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
    await press('mount');
    await page.waitForFunction(() => document.querySelectorAll('canvas.sanctuary-canvas').length === 0);
    await page.waitForTimeout(5300);
    await press('mount');
    await ready();
    assert.notEqual((await state()).engineId, priorEngineId, 'later mount recreates an engine after disposal grace');
    result.checks.push('last release removes canvas; remount after 5.3 seconds creates fresh engine');
    result.diagnostics = await state();

    await navigate(world, { width: 1280, height: 800 }, '&inactive=1');
    result.checks.push(await assertFrozen('initial active=false first frame'));
    assert.ok((await state()).frame >= 1, 'initial inactive mount renders its first spatial frame');

    await navigate(world, { width: 1280, height: 800 }, '&static=1');
    result.checks.push(await assertFrozen('initial static3D=true first frame'));
    assert.ok((await state()).frame >= 1, 'initial static mount renders its first spatial frame');

    await navigate(world, { width: 390, height: 844 });
    await assertAdvances();
    await press('active');
    await assertFrozen('portrait paused composition capture');
    await screenshot(`${world}-portrait`);
    result.checks.push('narrow portrait composition rendered at 390×844');
  }
  await navigate('snow-village', { width: 900, height: 650 }, capturesOnly ? '&inactive=1' : '');
  if (!capturesOnly) {
    await assertAdvances();
    await press('active');
  }
  await assertFrozen('Fold-inner-like landscape composition capture');
  await screenshot('snow-village-fold-inner-viewport');
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
