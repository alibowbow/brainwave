/**
 * Isolated real-WebGL verification for the three night worlds.
 *
 * Start Vite at :4189, then run this file from the repository root. The checked
 * in QA harness is intentionally outside the shared app's routing contract.
 * SCENE_BASE_URL, SCENE_BROWSER_PATH, SCENE_SCREENSHOT_DIR are optional.
 * --serve starts/stops the built-harness Vite preview at the intended :4190
 * inside this process's execution environment (useful on isolated runners).
 * --world=mountain|deep|lakeside selects one complete world suite; omission
 * verifies all three. Every report explicitly records its selected scope.
 * Measurements describe this browser/viewport only, never physical Fold
 * hardware, device FPS, audio quality, or real browser-tab visibility changes.
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync, spawn } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';
import { chromium } from 'playwright-core';

const repo = fileURLToPath(new URL('../../../../', import.meta.url));
const owned = path.join(repo, 'components/immersiveWorlds/nightFires');
const output = process.env.SCENE_SCREENSHOT_DIR || path.join(owned, 'qa/evidence');
const serveOwn = process.argv.includes('--serve');
const allowedWorlds = ['mountain', 'deep', 'lakeside'];
const worldArguments = process.argv.slice(2).filter((argument) => argument.startsWith('--world='));
assert.ok(worldArguments.length <= 1, 'Use at most one --world=mountain|deep|lakeside option');
assert.ok(!process.argv.includes('--world'), 'Use --world=deep syntax');
const worldChoice = worldArguments[0]?.slice('--world='.length);
assert.ok(worldChoice === undefined || allowedWorlds.includes(worldChoice), 'World must be mountain, deep, or lakeside');
const selectedWorlds = worldChoice === undefined ? [...allowedWorlds] : [worldChoice];
const base = process.env.SCENE_BASE_URL || `http://127.0.0.1:${serveOwn ? 4190 : 4189}/components/immersiveWorlds/nightFires/qa/index.html`;
const browserPath = process.env.SCENE_BROWSER_PATH || '/tmp/cosmic-browser-bin/chromium';
const sha = (data) => createHash('sha256').update(data).digest('hex');
const git = (args) => {
  try { return execFileSync('git', args, { cwd: repo, encoding: 'utf8' }).trim(); }
  catch { return null; }
};

async function sourceSnapshot() {
  const files = [];
  async function walk(dir) {
    let entries;
    try { entries = await readdir(dir, { withFileTypes: true }); }
    catch (error) { if (error.code === 'ENOENT') return; throw error; }
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.name === 'evidence' || entry.name === 'build' || entry.name === '.vite') continue;
      const absolute = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(absolute);
      else if (/\.(?:ts|tsx|js|mjs|css|html|glsl|png|webp|jpg|jpeg|glb|gltf|svg)$/i.test(entry.name)) {
        files.push({ path: path.relative(repo, absolute), sha256: sha(await readFile(absolute)) });
      }
    }
  }
  await walk(owned);
  await walk(path.join(repo, 'public/immersive-worlds/nightFires'));
  return { sourceTreeSha256: sha(JSON.stringify(files)), files };
}

async function bundleSnapshot() {
  const root = path.join(owned, 'qa/build');
  const files = [];
  async function walk(dir) {
    let entries;
    try { entries = await readdir(dir, { withFileTypes: true }); }
    catch (error) { if (error.code === 'ENOENT') return; throw error; }
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const absolute = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(absolute);
      else files.push({ path: path.relative(root, absolute), sha256: sha(await readFile(absolute)) });
    }
  }
  await walk(root);
  return files.length ? { bundleTreeSha256: sha(JSON.stringify(files)), files } : null;
}

// Chromium's screenshots are noninterlaced 8-bit RGB/RGBA PNGs. Decode their
// actual pixels with built-ins so QA adds no production/package dependencies.
function decodePNG(buffer) {
  assert.equal(buffer.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  let width = 0, height = 0, channels = 0;
  const data = [];
  for (let offset = 8; offset < buffer.length;) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const content = buffer.subarray(offset + 8, offset + 8 + length);
    if (type === 'IHDR') {
      width = content.readUInt32BE(0); height = content.readUInt32BE(4);
      assert.equal(content[8], 8, 'PNG bit depth');
      assert.equal(content[12], 0, 'PNG must not be interlaced');
      channels = content[9] === 6 ? 4 : content[9] === 2 ? 3 : 0;
      assert.ok(channels, `unsupported PNG color type ${content[9]}`);
    }
    if (type === 'IDAT') data.push(content);
    offset += length + 12;
  }
  const raw = inflateSync(Buffer.concat(data));
  const stride = width * channels;
  const pixels = new Uint8Array(width * height * channels);
  const paeth = (a, b, c) => {
    const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    assert.ok(filter <= 4, 'recognized PNG filter');
    for (let x = 0; x < stride; x++) {
      const index = y * stride + x;
      const a = x >= channels ? pixels[index - channels] : 0;
      const b = y ? pixels[index - stride] : 0;
      const c = y && x >= channels ? pixels[index - stride - channels] : 0;
      const predictor = filter === 1 ? a : filter === 2 ? b : filter === 3 ? Math.floor((a + b) / 2) : filter === 4 ? paeth(a, b, c) : 0;
      pixels[index] = raw[y * (stride + 1) + 1 + x] + predictor;
    }
  }
  return { width, height, channels, pixels };
}

function pixelStats(png) {
  const { width, height, channels, pixels } = decodePNG(png);
  const colors = new Set();
  let sum = 0, square = 0, dark = 0, lit = 0;
  const count = width * height;
  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    const luminance = .2126 * r + .7152 * g + .0722 * b;
    sum += luminance; square += luminance * luminance;
    if (luminance < 8) dark++;
    if (luminance > 24) lit++;
    colors.add((r >> 3) * 1024 + (g >> 3) * 32 + (b >> 3));
  }
  const mean = sum / count;
  return { width, height, meanLuminance: mean, luminanceStdDev: Math.sqrt(square / count - mean * mean), colorBuckets: colors.size, below8Fraction: dark / count, above24Fraction: lit / count };
}

function pixelDifference(first, second) {
  const a = decodePNG(first), b = decodePNG(second);
  assert.equal(a.width, b.width); assert.equal(a.height, b.height); assert.equal(a.channels, b.channels);
  let changed = 0, sum = 0;
  for (let i = 0; i < a.pixels.length; i += a.channels) {
    let difference = 0;
    for (let channel = 0; channel < 3; channel++) difference += Math.abs(a.pixels[i + channel] - b.pixels[i + channel]);
    sum += difference;
    if (difference >= 6) changed++;
  }
  return { changedPixels: changed, changedFraction: changed / (a.width * a.height), meanAbsoluteChannelDifference: sum / (a.width * a.height * 3) };
}

const report = {
  suite: 'night-fires-real-webgl', startedAt: new Date().toISOString(),
  selectedWorlds,
  revision: { gitHead: git(['rev-parse', 'HEAD']), gitBranch: git(['branch', '--show-current']), ...(await sourceSnapshot()) },
  isolatedBuild: await bundleSnapshot(),
  delivery: 'Isolated harness only; exact owned source and available isolated build manifests are recorded. Each world records actual loaded script URLs. This is not an integrated production route claim.',
  environment: { browserPath, baseURL: base, renderer: 'to be measured', deviceScaleFactor: 1 },
  limitations: ['Synthetic document.hidden/visibilitychange test is not real browser-tab switching.', 'Fold-inner and landscape are viewport tests, not physical device measurements.', 'Software-WebGL motion is verified from real pixels; no device FPS, thermal, audio, or integrated fullscreen route claim is made.'],
  worlds: [], screenshots: [], status: 'running',
};
await mkdir(output, { recursive: true });

let preview = null;
async function startPreview() {
  assert.equal(new URL(base).port, '4190', '--serve uses only the intended isolated preview port 4190');
  assert.ok(report.isolatedBuild, 'Build the isolated harness before using --serve');
  preview = spawn(process.execPath, [path.join(repo, 'node_modules/vite/bin/vite.js'), 'preview', '--config', path.join(owned, 'qa/vite.config.ts'), '--host', '127.0.0.1', '--port', '4190', '--strictPort'], {
    cwd: repo, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NO_COLOR: '1' },
  });
  await new Promise((resolve, reject) => {
    let log = '';
    const timeout = setTimeout(() => reject(new Error(`Vite preview did not become ready: ${log}`)), 30_000);
    const consume = (chunk) => {
      log = (log + chunk.toString()).slice(-6000);
      if (/Local:.*http:\/\/127\.0\.0\.1:4190/.test(log)) { clearTimeout(timeout); resolve(); }
    };
    preview.stdout.on('data', consume); preview.stderr.on('data', consume);
    preview.once('error', (error) => { clearTimeout(timeout); reject(error); });
    preview.once('exit', (code) => { clearTimeout(timeout); reject(new Error(`Vite preview exited ${code}: ${log}`)); });
  });
  report.environment.previewStartedBySuite = true;
}
let browser;
try {
  if (serveOwn) await startPreview();
  browser = await chromium.launch({
    executablePath: browserPath,
    headless: true,
    args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
    env: { ...process.env, LD_LIBRARY_PATH: [path.dirname(browserPath), process.env.LD_LIBRARY_PATH].filter(Boolean).join(':') },
  });
} catch (error) {
  preview?.kill('SIGTERM');
  throw error;
}
report.environment.browserVersion = browser.version();

async function verifyWorld(world) {
  const result = { world, checks: [], errors: [], status: 'running' };
  report.worlds.push(result);
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
  page.setDefaultTimeout(120_000);
  page.on('pageerror', (error) => result.errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && /three|webgl|shader|program/i.test(message.text())) result.errors.push(message.text());
  });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    const contexts = new WeakSet();
    window.__nightBrowserQA = { contextsCreated: 0 };
    HTMLCanvasElement.prototype.getContext = function (...args) {
      const context = original.apply(this, args);
      if (context && /^(webgl|webgl2|experimental-webgl)$/.test(args[0]) && this.classList.contains('night-world-canvas') && !contexts.has(context)) {
        contexts.add(context); window.__nightBrowserQA.contextsCreated++;
      }
      return context;
    };
  });
  const mark = (name, evidence = true) => { result.checks.push({ name, evidence }); console.log(`${world}: ${name}`); };
  const canvasState = () => page.evaluate(() => {
    const canvas = document.querySelector('.night-world-canvas');
    if (!canvas) return null;
    return { frames: Number(canvas.dataset.renderCount), time: Number(canvas.dataset.time), engineId: canvas.dataset.engineId, width: canvas.width, height: canvas.height, motion: canvas.closest('.night-world')?.dataset.motion };
  });
  const diagnostics = () => page.evaluate(() => window.__nightQA.diagnostics());
  const setActive = (active) => page.evaluate((value) => window.__nightQA.setActive(value), active);
  const waitMotion = (motion) => page.waitForFunction((value) => document.querySelector('.night-world-canvas')?.closest('.night-world')?.dataset.motion === value, motion);
  const ready = () => page.waitForFunction(() => document.querySelector('.night-world-canvas')?.closest('.night-world')?.dataset.state === 'ready');
  async function shot(name, viewport) {
    const box = await page.locator('.night-world-canvas').boundingBox();
    assert.ok(box && box.width > 100 && box.height > 100, 'nonzero parent-filling live canvas');
    const png = await page.screenshot({ clip: box, animations: 'disabled', type: 'png' });
    const file = `${world}-${name}.png`;
    await writeFile(path.join(output, file), png);
    const stats = pixelStats(png);
    // This catches clear/blank/unrendered canvases. Aesthetic approval still
    // requires a human/agent to open every desktop and portrait PNG.
    assert.ok(stats.colorBuckets > 70 && stats.luminanceStdDev > 4, `${world}/${name} has rendered spatial detail: ${JSON.stringify(stats)}`);
    assert.ok(stats.above24Fraction > .035, `${world}/${name} is not hidden in near-black`);
    report.screenshots.push({ file, viewport, sha256: sha(png), bytes: png.length, sourceTreeSha256: report.revision.sourceTreeSha256, stats });
    return png;
  }
  async function pointerTarget() {
    return page.evaluate(() => {
      const canvas = document.querySelector('.night-world-canvas');
      const box = canvas.getBoundingClientRect();
      const targets = JSON.parse(canvas.dataset.targets || '[]');
      const target = targets.find((item) => Number.isFinite(item.x) && Number.isFinite(item.y) && item.x >= 5 && item.y >= 5 && item.x < box.width - 5 && item.y < box.height - 5);
      if (!target) throw new Error(`No in-view projected interaction target: ${JSON.stringify(targets)}`);
      return { ...target, x: target.x + box.left, y: target.y + box.top };
    });
  }
  const eventCount = () => page.evaluate(() => window.__nightQA.events.length);
  try {
    const url = new URL(base); url.searchParams.set('world', world); url.searchParams.set('active', '0');
    await page.goto(url.href, { waitUntil: 'domcontentloaded' });
    await ready(); await waitMotion('paused');
    result.loadedScripts = await page.evaluate(() => Array.from(document.scripts, (script) => script.src).filter(Boolean));
    assert.equal(await page.locator('.night-world-canvas').count(), 1);
    const first = await canvasState();
    assert.ok(first.frames > 0 && first.width >= 1440 && first.height >= 900, 'real full-resolution first frame');
    result.webgl = await page.evaluate(() => {
      const canvas = document.querySelector('.night-world-canvas');
      const gl = canvas.getContext('webgl2');
      if (!gl) return null;
      const debug = gl.getExtension('WEBGL_debug_renderer_info');
      return { version: gl.getParameter(gl.VERSION), renderer: debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER) };
    });
    assert.ok(result.webgl, 'real WebGL2 context available');
    report.environment.renderer = result.webgl.renderer;
    await page.waitForTimeout(350);
    await shot('desktop', { width: 1440, height: 900 });
    mark('paused first frame / full-resolution real WebGL', first);

    await page.waitForTimeout(200);
    const pausedBefore = await canvasState(); await page.waitForTimeout(650); const pausedAfter = await canvasState();
    assert.equal(pausedAfter.time, pausedBefore.time, 'pause must freeze simulation time');
    assert.ok(pausedAfter.frames - pausedBefore.frames <= 1, 'pause must not run a render loop');
    mark('pause freezes time and render loop', { before: pausedBefore, after: pausedAfter });

    const waitAdvancement = (from, frames, seconds) => page.waitForFunction(({ from, frames, seconds }) => {
      const canvas = document.querySelector('.night-world-canvas');
      return canvas && Number(canvas.dataset.renderCount) >= from.frames + frames && Number(canvas.dataset.time) >= from.time + seconds;
    }, { from, frames, seconds }, { polling: 100 });
    await setActive(true); await waitMotion('running');
    await waitAdvancement(pausedAfter, 3, .05);
    await setActive(false); await waitMotion('paused');
    const movingBefore = await canvasState();
    const beforePNG = await page.screenshot({ clip: await page.locator('.night-world-canvas').boundingBox(), type: 'png' });
    await setActive(true); await waitMotion('running');
    await waitAdvancement(movingBefore, 8, .3);
    await setActive(false); await waitMotion('paused');
    const movingAfter = await canvasState();
    const afterPNG = await page.screenshot({ clip: await page.locator('.night-world-canvas').boundingBox(), type: 'png' });
    const difference = pixelDifference(beforePNG, afterPNG);
    assert.ok(movingAfter.frames > movingBefore.frames && movingAfter.time > movingBefore.time, 'active simulation advances');
    assert.ok(difference.changedPixels > 20, 'real image pixels change under active motion');
    await writeFile(path.join(output, `${world}-motion-before.png`), beforePNG);
    await writeFile(path.join(output, `${world}-motion-after.png`), afterPNG);
    result.motionEvidence = { captureMode: 'Paused real-frame snapshots separated by verified active RAF frame and elapsed-time advancement; screenshots avoid competing with the software renderer loop.', before: movingBefore, after: movingAfter, difference, files: [`${world}-motion-before.png`, `${world}-motion-after.png`], sha256: [sha(beforePNG), sha(afterPNG)], sourceTreeSha256: report.revision.sourceTreeSha256 };
    mark('active motion changes actual pixels', result.motionEvidence);
    await setActive(false); await waitMotion('paused');

    // Scene interaction follows the active session contract. A stopped session
    // retains its real frame but intentionally disables scene actions.
    await setActive(true); await waitMotion('running');
    let target = await pointerTarget();
    let beforeEvents = await eventCount();
    await page.mouse.move(target.x, target.y); await page.mouse.down();
    await page.mouse.move(target.x + 80, target.y - 35, { steps: 8 }); await page.mouse.up();
    await page.waitForTimeout(800);
    assert.equal(await eventCount(), beforeEvents, 'a drag must not trigger a log/lantern tap');
    mark('pointer drag does not activate target');

    target = await pointerTarget();
    await page.evaluate((point) => {
      const canvas = document.querySelector('.night-world-canvas');
      const init = { bubbles: true, isPrimary: true, pointerId: 77, pointerType: 'touch', button: 0, clientX: point.x, clientY: point.y };
      canvas.dispatchEvent(new PointerEvent('pointerdown', init));
      window.dispatchEvent(new PointerEvent('pointercancel', init));
      window.dispatchEvent(new PointerEvent('pointerup', init));
    }, target);
    assert.equal(await eventCount(), beforeEvents, 'pointer cancellation must not tap');
    mark('synthetic pointer cancellation does not activate target');

    target = await pointerTarget();
    await page.mouse.click(target.x, target.y);
    await page.waitForFunction((count) => window.__nightQA.events.length > count, beforeEvents, { timeout: 20_000 });
    const tap = await page.evaluate(() => window.__nightQA.events.at(-1));
    assert.equal(tap.world, world); assert.equal(tap.kind, target.kind);
    assert.ok(Number.isFinite(tap.value) && tap.value >= 0 && tap.value <= 1);
    mark('real pointer raycast emits bounded interaction', tap);

    await page.waitForTimeout(720); // Respect the intentional quiet-interaction cooldown.
    beforeEvents = await eventCount();
    const action = page.locator('.night-world-action').first();
    await action.focus(); await page.keyboard.press('Enter');
    await page.waitForFunction((count) => window.__nightQA.events.length > count, beforeEvents, { timeout: 20_000 });
    const keyboard = await page.evaluate(() => window.__nightQA.events.at(-1));
    assert.equal(keyboard.world, world); assert.ok(keyboard.value >= 0 && keyboard.value <= 1);
    mark('keyboard Enter activates accessible scene action', keyboard);
    const keyboardFrame = await canvasState();
    await waitAdvancement(keyboardFrame, 4, .12);
    const keyboardProgress = await canvasState();
    assert.ok(keyboardProgress.frames >= keyboardFrame.frames + 4 && keyboardProgress.time >= keyboardFrame.time + .12);
    mark('active response advances before reduced-motion snapshot', { before: keyboardFrame, after: keyboardProgress });

    await setActive(true); await waitMotion('running');
    await page.emulateMedia({ reducedMotion: 'reduce' }); await waitMotion('paused');
    await page.waitForTimeout(150);
    const reducedBefore = await canvasState(); await page.waitForTimeout(450); const reducedAfter = await canvasState();
    assert.equal(reducedAfter.time, reducedBefore.time);
    assert.ok(reducedAfter.frames - reducedBefore.frames <= 1);
    assert.ok(reducedAfter.frames > 0, 'reduced motion retains a real 3D frame');
    mark('reduced motion freezes while retaining real frame', { before: reducedBefore, after: reducedAfter });
    if (world === 'deep' || world === 'lakeside') {
      await page.waitForTimeout(720); // Do not confuse the quiet-action throttle with a missing response.
      const lantern = page.locator('.night-world-action[data-kind="lantern-brightness"]');
      await lantern.focus();
      // Focus precedes both samples so focus outlines/assistive controls cannot
      // be mistaken for a rendered change in the lantern's static 3D lighting.
      const lanternBeforePNG = await page.screenshot({ clip: await page.locator('.night-world-canvas').boundingBox(), type: 'png' });
      const lanternBefore = await canvasState();
      const lanternEventsBefore = await eventCount();
      await page.keyboard.press('Enter');
      await page.waitForFunction((count) => window.__nightQA.events.length > count, lanternEventsBefore, { timeout: 20_000 });
      const lanternEvent = await page.evaluate(() => window.__nightQA.events.at(-1));
      assert.equal(lanternEvent.world, world);
      assert.equal(lanternEvent.kind, 'lantern-brightness');
      assert.ok(Number.isFinite(lanternEvent.value) && lanternEvent.value >= 0 && lanternEvent.value <= 1);
      const lanternAfter = await canvasState();
      assert.equal(lanternAfter.time, lanternBefore.time, 'reduced-motion lantern response keeps simulation time frozen');
      assert.ok(lanternAfter.frames > lanternBefore.frames, 'reduced-motion lantern renders a new static response');
      const lanternAfterPNG = await page.screenshot({ clip: await page.locator('.night-world-canvas').boundingBox(), type: 'png' });
      const lanternDifference = pixelDifference(lanternBeforePNG, lanternAfterPNG);
      const files = [`${world}-lantern-before.png`, `${world}-lantern-after.png`];
      await writeFile(path.join(output, files[0]), lanternBeforePNG);
      await writeFile(path.join(output, files[1]), lanternAfterPNG);
      result.reducedLanternEvidence = { before: lanternBefore, after: lanternAfter, event: lanternEvent, difference: lanternDifference, files, sha256: [sha(lanternBeforePNG), sha(lanternAfterPNG)], sourceTreeSha256: report.revision.sourceTreeSha256 };
      assert.ok(lanternDifference.changedPixels > 20, `reduced-motion lantern visibly changes actual pixels: ${JSON.stringify(lanternDifference)}`);
      mark('reduced-motion keyboard lantern renders changed static pixels without advancing time', result.reducedLanternEvidence);
    }
    await page.emulateMedia({ reducedMotion: 'no-preference' }); await waitMotion('running');

    await page.evaluate(() => {
      const hidden = Object.getOwnPropertyDescriptor(document, 'hidden');
      const visibility = Object.getOwnPropertyDescriptor(document, 'visibilityState');
      window.__nightRestoreVisibility = () => {
        if (hidden) Object.defineProperty(document, 'hidden', hidden); else delete document.hidden;
        if (visibility) Object.defineProperty(document, 'visibilityState', visibility); else delete document.visibilityState;
        document.dispatchEvent(new Event('visibilitychange'));
      };
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await waitMotion('paused'); await page.waitForTimeout(150);
    const hiddenBefore = await canvasState(); await page.waitForTimeout(450); const hiddenAfter = await canvasState();
    assert.equal(hiddenAfter.time, hiddenBefore.time);
    assert.ok(hiddenAfter.frames - hiddenBefore.frames <= 1);
    mark('synthetic hidden document freezes simulation (not real tab switching)', { before: hiddenBefore, after: hiddenAfter });
    await page.evaluate(() => window.__nightRestoreVisibility()); await waitMotion('running');

    await page.evaluate(() => window.__nightQA.setStatic(true)); await waitMotion('paused');
    await page.waitForTimeout(150);
    const staticBefore = await canvasState(); await page.waitForTimeout(450); const staticAfter = await canvasState();
    assert.ok(staticBefore.frames > 0 && staticAfter.frames > 0, 'static3D retains real rendered geometry');
    assert.equal(staticAfter.time, staticBefore.time, 'explicit static3D does not advance time');
    assert.ok(staticAfter.frames - staticBefore.frames <= 1, 'explicit static3D does not run a loop');
    await page.evaluate(() => window.__nightQA.setStatic(false)); await waitMotion('running');
    await waitAdvancement(staticAfter, 2, .03);
    mark('explicit optional static3D freezes real frame and resumes', { before: staticBefore, after: staticAfter });

    await page.evaluate(() => { window.__nightOriginalCanvas = document.querySelector('.night-world-canvas'); window.__nightQA.setChrome(true); });
    await page.waitForSelector('[data-night-qa-chrome]');
    const lookCount = () => page.locator('.night-world[data-look="drag"]').count();
    const assertCanvasIdentity = async () => {
      assert.equal(await page.locator('.night-world-canvas').count(), 1, 'holders share one canvas');
      assert.ok(await page.evaluate(() => window.__nightOriginalCanvas === document.querySelector('.night-world-canvas')));
      assert.equal((await diagnostics()).liveEngines, 1);
      assert.equal(await page.evaluate(() => window.__nightBrowserQA.contextsCreated), 1, 'one WebGL context before disposal');
    };
    const dragChrome = async (expectedSurface = 'holder-primary') => {
      const point = await pointerTarget();
      const hitSurface = await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.closest('[data-scene-surface]')?.id, point);
      assert.equal(hitSurface, expectedSurface, 'native chrome drag hit-testing reaches the intended surface');
      const beforeDrag = await canvasState();
      const count = await eventCount();
      await page.mouse.move(point.x, point.y); await page.mouse.down();
      await page.mouse.move(point.x + 70, point.y - 30, { steps: 5 });
      assert.equal(await lookCount(), 1, 'only the top holder accepts a chrome drag');
      assert.ok(await page.evaluate(() => document.querySelector('.night-world[data-look="drag"]')?.contains(document.querySelector('.night-world-canvas'))));
      await waitAdvancement(beforeDrag, 2, .02);
      const shifted = await pointerTarget();
      assert.equal(shifted.kind, point.kind, 'compare the same rigid spatial interaction target');
      const shift = { x: shifted.x - point.x, y: shifted.y - point.y };
      assert.ok(Math.hypot(shift.x, shift.y) > 1, 'held chrome drag moves the actual 3D camera projection');
      const viewport = page.viewportSize();
      assert.ok(Math.abs(shift.x) < viewport.width * .25 && Math.abs(shift.y) < viewport.height * .25, 'look stays bounded inside one quarter viewport');
      result.chromeLookSamples ??= [];
      result.chromeLookSamples.push({ hitSurface, before: point, held: shifted, shift, beforeFrame: beforeDrag, heldFrame: await canvasState() });
      await page.mouse.up();
      assert.equal(await lookCount(), 0, 'chrome drag releases cleanly');
      assert.equal(await eventCount(), count, 'chrome drag never becomes a tap');
    };
    const tapChromeExactlyOnce = async () => {
      await page.waitForTimeout(720);
      const point = await pointerTarget();
      const count = await eventCount();
      await page.mouse.click(point.x, point.y);
      await page.waitForFunction((before) => window.__nightQA.events.length > before, count, { timeout: 20_000 });
      assert.equal(await eventCount(), count + 1, 'chrome pointer tap emits exactly one scene event');
      const event = await page.evaluate(() => window.__nightQA.events.at(-1));
      assert.equal(event.kind, point.kind); assert.equal(event.world, world);
      assert.ok(Number.isFinite(event.value) && event.value >= 0 && event.value <= 1);
      return event;
    };
    await dragChrome();
    const chromeTap = await tapChromeExactlyOnce();
    mark('full-cover sibling chrome receives real drag and exactly one raycast tap', chromeTap);

    for (const control of ['button', 'nested-span', 'range', 'link', 'role-button', 'text']) {
      const locator = page.locator(`[data-night-qa-chrome] [data-night-control="${control}"]`).last();
      const box = await locator.boundingBox(); assert.ok(box);
      const x = box.x + box.width / 2, y = box.y + box.height / 2;
      const count = await eventCount();
      await page.mouse.move(x, y); await page.mouse.down();
      await page.mouse.move(x + 18, y, { steps: 3 });
      assert.equal(await lookCount(), 0, `${control} drag stays out of scene look handling`);
      await page.mouse.up();
      const actionsBefore = await page.evaluate(() => window.__nightQA.chromeActions);
      await page.mouse.click(x, y);
      assert.equal(await eventCount(), count, `${control}, including nested chrome, must not emit scene interactions`);
      assert.equal(await lookCount(), 0);
      if (['button', 'nested-span', 'link', 'role-button'].includes(control)) {
        assert.equal(await page.evaluate(() => window.__nightQA.chromeActions), actionsBefore + 1, `${control} native action stays usable`);
      }
      if (control === 'range') {
        const beforeValue = Number(await locator.inputValue());
        await locator.focus(); await page.keyboard.press(beforeValue >= 100 ? 'ArrowLeft' : 'ArrowRight');
        assert.notEqual(Number(await locator.inputValue()), beforeValue, 'range control remains keyboard usable');
        assert.equal(await eventCount(), count);
      }
    }
    mark('chrome native/nested buttons, range, link, rolebutton and text are excluded; controls remain usable', { chromeActions: await page.evaluate(() => window.__nightQA.chromeActions) });

    for (const cancellation of ['pointercancel', 'blur']) {
      const count = await eventCount();
      const point = await pointerTarget();
      await page.evaluate(({ point, cancellation }) => {
        const overlay = Array.from(document.querySelectorAll('[data-night-qa-chrome]')).at(-1);
        const init = { bubbles: true, isPrimary: true, pointerId: 79, pointerType: 'touch', button: 0, clientX: point.x, clientY: point.y };
        overlay.dispatchEvent(new PointerEvent('pointerdown', init));
        if (cancellation === 'blur') window.dispatchEvent(new Event('blur'));
        else window.dispatchEvent(new PointerEvent('pointercancel', init));
        window.dispatchEvent(new PointerEvent('pointerup', init));
      }, { point, cancellation });
      assert.equal(await eventCount(), count, `synthetic chrome ${cancellation} never taps`);
      assert.equal(await lookCount(), 0);
    }
    mark('synthetic overlay pointercancel and window blur clear presses without taps');

    await page.evaluate(() => window.__nightQA.setSameSurface(true));
    await page.waitForFunction(() => document.querySelectorAll('.night-world').length === 2);
    await ready(); await waitMotion('running'); await assertCanvasIdentity();
    assert.equal(await page.locator('[data-scene-surface]').count(), 1, 'covered lower holder and upper holder share nearest surface');
    await dragChrome(); await tapChromeExactlyOnce();
    await page.evaluate(() => window.__nightQA.setSameSurface(false));
    await page.waitForFunction(() => document.querySelectorAll('.night-world').length === 1);
    await waitMotion('running'); await assertCanvasIdentity(); await tapChromeExactlyOnce();
    mark('same-surface covered lower holder cannot duplicate input; return preserves exactly-once tap');

    await page.evaluate(() => window.__nightQA.setSecond(true));
    await page.waitForFunction(() => document.querySelectorAll('.night-world').length === 2);
    await ready(); await waitMotion('running'); await assertCanvasIdentity();
    assert.equal(await page.locator('[data-scene-surface]').count(), 2, 'second holder has its distinct nearest surface');
    await dragChrome('holder-second'); await tapChromeExactlyOnce();
    await page.evaluate(() => window.__nightQA.setSecond(false));
    await page.waitForFunction(() => document.querySelectorAll('.night-world').length === 1);
    await waitMotion('running'); await assertCanvasIdentity(); await tapChromeExactlyOnce();
    mark('distinct-surface second-holder shares canvas/context and preserves exactly-once input on return', await diagnostics());
    await setActive(false); await waitMotion('paused');
    await shot('chrome-overlay', { width: 1440, height: 900 });
    await page.evaluate(() => window.__nightQA.setChrome(false));
    await page.waitForFunction(() => !document.querySelector('[data-night-qa-chrome]'));

    await page.setViewportSize({ width: 390, height: 844 }); await ready(); await page.waitForTimeout(350);
    await shot('portrait', { width: 390, height: 844 });
    const portrait = await canvasState();
    assert.ok(portrait.width >= 390 && portrait.height >= 844);
    await pointerTarget();
    mark('narrow portrait composed real frame and in-view interaction target', portrait);
    if (world === 'deep') {
      await page.setViewportSize({ width: 900, height: 720 }); await page.waitForTimeout(350);
      await shot('fold-inner-viewport', { width: 900, height: 720 });
      mark('Fold-inner viewport coverage (not physical hardware)');
    }
    if (world === 'lakeside') {
      await page.setViewportSize({ width: 900, height: 480 }); await page.waitForTimeout(350);
      await shot('landscape-viewport', { width: 900, height: 480 });
      mark('landscape viewport coverage');
    }

    const beforeMounts = await diagnostics();
    for (let cycle = 0; cycle < 3; cycle++) {
      await page.evaluate(() => window.__nightQA.setMounted(false));
      await page.waitForFunction(() => !document.querySelector('.night-world-canvas'));
      await page.waitForTimeout(100);
      await page.evaluate(() => window.__nightQA.setMounted(true)); await ready();
      assert.ok(await page.evaluate(() => window.__nightOriginalCanvas === document.querySelector('.night-world-canvas')), 'grace-period remount reuses canvas');
      assert.equal((await diagnostics()).liveEngines, 1);
    }
    assert.equal((await diagnostics()).engineCreated, beforeMounts.engineCreated);
    mark('three rapid mount/unmount cycles reuse one engine', await diagnostics());
    await page.evaluate(() => window.__nightQA.setMounted(false));
    await page.waitForFunction(() => !document.querySelector('.night-world-canvas'));
    await page.waitForTimeout(5300);
    await page.waitForFunction(() => window.__nightQA.diagnostics().liveEngines === 0);
    const disposed = await diagnostics();
    assert.equal(disposed.engineDisposed, beforeMounts.engineDisposed + 1);
    await page.evaluate(() => window.__nightQA.setMounted(true)); await ready();
    assert.ok(await page.evaluate(() => window.__nightOriginalCanvas !== document.querySelector('.night-world-canvas')), 'expired engine is recreated');
    assert.equal((await diagnostics()).engineCreated, beforeMounts.engineCreated + 1);
    assert.equal((await diagnostics()).liveEngines, 1);
    assert.equal(await page.evaluate(() => window.__nightBrowserQA.contextsCreated), 2);
    mark('delayed >5 s disposal and clean recreation', { disposed, remounted: await diagnostics() });
    await page.evaluate(() => window.__nightQA.setMounted(false));
    await page.waitForTimeout(5300);
    assert.equal((await diagnostics()).liveEngines, 0);
    assert.deepEqual(result.errors, [], 'no browser/shader errors');
    mark('final unmount releases engine / no browser errors', await diagnostics());
    result.status = 'passed';
  } catch (error) {
    result.status = 'failed'; result.failure = error.stack || String(error);
    console.error(`${world}: FAIL\n${result.failure}`);
    try { await page.screenshot({ path: path.join(output, `${world}-failure.png`) }); } catch {}
  } finally { await page.close(); }
}

try {
  for (const world of selectedWorlds) await verifyWorld(world);
  const after = await sourceSnapshot();
  report.sourceUnchangedDuringVerification = after.sourceTreeSha256 === report.revision.sourceTreeSha256;
  report.finalSourceTreeSha256 = after.sourceTreeSha256;
  const finalBuild = await bundleSnapshot();
  report.buildUnchangedDuringVerification = finalBuild?.bundleTreeSha256 === report.isolatedBuild?.bundleTreeSha256;
  report.status = report.worlds.every((world) => world.status === 'passed') && report.sourceUnchangedDuringVerification && report.buildUnchangedDuringVerification ? 'passed' : 'failed';
  if (!report.sourceUnchangedDuringVerification) report.failure = 'Owned source changed while tests ran; screenshot provenance cannot identify one stable implementation. Rerun after edits settle.';
} finally {
  report.completedAt = new Date().toISOString();
  await writeFile(path.join(output, 'results.json'), `${JSON.stringify(report, null, 2)}\n`);
  await browser.close();
  preview?.kill('SIGTERM');
}
console.log(`${report.status.toUpperCase()}: ${path.join(output, 'results.json')}`);
if (report.status !== 'passed') process.exitCode = 1;
