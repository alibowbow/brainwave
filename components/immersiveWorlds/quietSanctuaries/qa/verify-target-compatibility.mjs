import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

// Real render-target verification against the owned built QA harness.
// Native extension discovery and WebGL entry points are never replaced.
// This is browser viewport/SwiftShader evidence; it is not physical Fold/GPU/FPS evidence.
const here = path.dirname(fileURLToPath(import.meta.url));
const repository = path.resolve(here, '../../../..');
const sourceRoot = path.dirname(here);
const assetRoot = path.join(repository, 'public/immersive-worlds/quietSanctuaries');
const output = path.resolve(process.env.SANCTUARY_QA_OUTPUT || path.join(here, 'compat-evidence'));
const base = (process.env.SANCTUARY_QA_URL || 'http://127.0.0.1:4175').replace(/\/?$/, '/');
const hash = (value) => createHash('sha256').update(value).digest('hex');
const git = (...args) => execFileSync('git', args, { cwd: repository, encoding: 'utf8' }).trim();
const capturesOnly = process.env.SANCTUARY_QA_MODE === 'visual';
const baselineCommit = 'c5a100794084e6230e9fdc8a4c036a02a5813176';
const relativeGroup = path.relative(repository, sourceRoot).split(path.sep).join('/');
const baselineReport = JSON.parse(git('show', `${baselineCommit}:${relativeGroup}/qa/evidence/verification.json`));

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
  ...await listFiles(sourceRoot, new Set(['.build', 'evidence', 'compat-evidence', 'node_modules'])),
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
    viewportChecks: 'Static visual captures: desktop 1280×800 and narrow portrait 390×844 for meditation normal/forced-byte and warm/snow preservation. Motion/interaction/lifecycle: native 640×480 browser viewport to limit software-GPU test contention. The production renderer settings are unchanged. Viewports only, not physical Fold hardware.',
    hiddenCheck: 'Synthetic own-property document.hidden/document.visibilityState override plus visibilitychange; not real OS/browser-tab switching.',
  },
  screenshots: [],
  worlds: [],
  targetCompatibility: [],
  preservation: { baselineCommit, sourceFiles: [], screenshots: [] },
  limitations: [
    'Forced-byte is an explicit QA builder configuration using the real renderer, not a claim that this hardware lacks float support.',
    'Native GL APIs and extension results are untouched. Unit policy cases separately cover unavailable/incomplete target combinations.',
    'Initial-state restoration diagnostics describe the real states exercised; no unsupported-device or physical GPU performance claim.',
  ],
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
  let currentScenario = 'normal';
  const observeErrors = (targetPage, world, scenario) => {
    targetPage.on('pageerror', (error) => report.errors.push({ world: world(), scenario: typeof scenario === 'function' ? scenario() : scenario, type: 'pageerror', message: error.message }));
    targetPage.on('console', (message) => {
      const text = message.text();
      if (message.type() === 'error') report.errors.push({ world: world(), scenario: typeof scenario === 'function' ? scenario() : scenario, type: 'console', message: text });
      else if (message.type() === 'warning' && /INVALID_|FRAMEBUFFER_(?:UNSUPPORTED|INCOMPLETE)|GL_OUT_OF_MEMORY|CONTEXT_LOST_WEBGL|WebGL.*(?:error|incomplete|invalid)/i.test(text)) {
        report.errors.push({ world: world(), scenario: typeof scenario === 'function' ? scenario() : scenario, type: 'gl-warning', message: text });
      }
    });
  };
  observeErrors(page, () => currentWorld, () => currentScenario);
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
  const screenshot = async (name, targetPage = page, world = currentWorld, scenario = currentScenario) => {
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
    await writeFile(path.join(output, 'target-compatibility.json'), `${JSON.stringify(report, null, 2)}\n`);
    console.log(`Completed ${label}`);
  };
  const measureBasin = async (targetPage, buffer) => {
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
    return basinPixels;
  };

  const assertRestored = (check) => {
    assert.deepEqual(check.glErrorsBefore, [], `${check.label}: no preexisting GL errors`);
    assert.deepEqual(check.restorationErrors, [], `${check.label}: restoring renderer emits no GL errors`);
    assert.equal(check.framebufferRestored, true, `${check.label}: exact native framebuffer restored`);
    assert.equal(check.stateRestored, true, `${check.label}: complete renderer state restored`);
    assert.deepEqual(check.after, check.before, `${check.label}: renderer state snapshots match`);
  };
  const targetProbe = async (targetPage, buffer, scenario, composition) => {
    const context = await targetPage.locator('canvas.sanctuary-canvas').evaluate((element) => {
      const gl = element.getContext('webgl2');
      if (!gl) return null;
      const errors = [];
      for (let index = 0; index < 32; index++) { const error = gl.getError(); if (error === gl.NO_ERROR) break; errors.push(error); }
      return {
        frame: Number(element.dataset.frame), contextLost: gl.isContextLost(), errors,
        framebufferComplete: gl.FRAMEBUFFER_COMPLETE,
        nativeGetExtension: Function.prototype.toString.call(gl.getExtension),
        nativeCheckFramebufferStatus: Function.prototype.toString.call(gl.checkFramebufferStatus),
        capabilities: { floatColorBuffer: !!gl.getExtension('EXT_color_buffer_float'), halfFloatColorBuffer: !!gl.getExtension('EXT_color_buffer_half_float') },
        advertisedExtensions: gl.getSupportedExtensions()?.filter((name) => /EXT_color_buffer_(?:half_)?float/.test(name)) ?? [],
        targets: JSON.parse(element.dataset.targetCompatibility || 'null'),
        nonDefaultStateProbe: JSON.parse(element.dataset.qaTargetStateProbe || 'null'),
      };
    });
    assert.ok(context && !context.contextLost, 'actual existing WebGL2 context remains usable');
    assert.deepEqual(context.errors, [], 'rendered first frame leaves no GL errors');
    assert.match(context.nativeGetExtension, /\[native code\]/, 'extension query remains a native GL function');
    assert.match(context.nativeCheckFramebufferStatus, /\[native code\]/, 'framebuffer status query remains a native GL function');
    const targets = context.targets;
    assert.ok(targets, 'renderer publishes real target allocation diagnostics');
    assert.equal(targets.status, 'ready');
    assert.equal(targets.mode, scenario === 'forced-byte' ? 'force-byte' : 'auto');
    assert.deepEqual(targets.capabilities, context.capabilities, 'reported extensions match native context capabilities');
    assert.ok(targets.checks.length >= 3, 'reflection plus both PMREM actual target checks are present');
    for (const check of targets.checks) {
      assertRestored(check);
      assert.equal(check.type, check.storage === 'half-float' ? 1016 : 1009, `${check.label}: reported storage matches actual Three texture type`);
      assert.ok(Number.isInteger(check.status), `${check.label}: actual native framebuffer status recorded`);
      assert.equal(check.statusHex, `0x${check.status.toString(16)}`);
      if (check.ok) {
        assert.equal(check.status, context.framebufferComplete, `${check.label}: successful candidate is FRAMEBUFFER_COMPLETE`);
        assert.deepEqual(check.glErrors, [], `${check.label}: successful candidate has no GL errors`);
      }
    }
    const firstStorage = scenario === 'forced-byte' || !(context.capabilities.floatColorBuffer || context.capabilities.halfFloatColorBuffer) ? 'unsigned-byte' : 'half-float';
    for (const target of ['reflection', 'environment']) {
      const attempts = targets.attempts.filter((attempt) => attempt.target === target);
      assert.ok(attempts.length >= 1 && attempts.length <= 2, `${target}: bounded candidate policy`);
      assert.equal(attempts[0].storage, firstStorage, `${target}: capability policy chooses the first real allocation`);
      assert.equal(attempts.at(-1).ok, true, `${target}: selected allocation passed`);
      if (attempts.length === 2) {
        assert.equal(attempts[0].ok, false, `${target}: byte retry follows a rejected half-float allocation`);
        assert.equal(attempts[1].storage, 'unsigned-byte');
      }
      const selected = targets.chosen[target];
      assert.ok(selected, `${target}: selected resource is retained`);
      assert.equal(selected.type, attempts.at(-1).storage === 'half-float' ? 1016 : 1009);
      const labels = target === 'reflection' ? ['reflection'] : ['environment-output', 'environment-scratch'];
      const dimensions = target === 'reflection' ? { width: 1024, height: 1024 } : { width: 336, height: 256 };
      assert.equal(selected.width, dimensions.width); assert.equal(selected.height, dimensions.height);
      for (const label of labels) {
        const checks = targets.checks.filter((check) => check.label === label);
        assert.ok(checks.length >= 1, `${label}: real-sized allocation is checked`);
        for (const check of checks) {
          assert.equal(check.width, dimensions.width); assert.equal(check.height, dimensions.height);
        }
        const selectedCheck = checks.at(-1);
        assert.equal(selectedCheck.type, selected.type); assert.equal(selectedCheck.ok, true);
        assert.equal(selectedCheck.status, context.framebufferComplete);
      }
    }
    assert.equal(targets.chosen.environment.mapping, 306, 'retained environment uses CubeUVReflectionMapping');
    assert.ok(targets.attempts.some((attempt) => attempt.target === 'environment-generation' && attempt.ok), 'checked PMREM output and scratch actually generate the environment');
    if (scenario === 'forced-byte') {
      assert.ok(targets.checks.every((check) => check.storage === 'unsigned-byte'), 'forced-byte allocates no half-float reflection or PMREM target');
      const probe = context.nonDefaultStateProbe;
      assert.ok(probe?.ok, 'real non-default state restoration probe succeeded');
      assert.equal(probe.fixture.face, 4); assert.equal(probe.fixture.mip, 1);
      assert.equal(probe.fixture.attachmentWidth, 32); assert.equal(probe.fixture.attachmentHeight, 32);
      assert.equal(probe.fixture.status, context.framebufferComplete, 'real cube face4/mip1 fixture is complete');
      assert.equal(probe.restoredFixtureStatus, context.framebufferComplete, 'restored cube face4/mip1 fixture remains complete');
      assert.deepEqual(probe.fixture.glErrors, []); assert.deepEqual(probe.restoredFixtureErrors, []);
      assert.equal(probe.diagnostics.checks.length, 1);
      const check = probe.diagnostics.checks[0];
      assertRestored(check);
      assert.equal(check.status, context.framebufferComplete); assert.equal(check.ok, true); assert.deepEqual(check.glErrors, []);
      assert.equal(check.before.face, 4); assert.equal(check.before.mip, 1); assert.ok(check.before.target);
      assert.deepEqual(check.before.currentViewport, [3, 4, 17, 19]);
      assert.deepEqual(check.before.currentScissor, [5, 6, 11, 13]);
      assert.equal(check.before.currentScissorTest, true); assert.equal(check.before.xr, true);
      assert.equal(check.before.autoClear, false); assert.equal(check.before.toneMapping, 0); assert.equal(check.before.clearAlpha, .375);
    } else assert.equal(context.nonDefaultStateProbe, null, 'normal scenario uses unmodified production entry');
    const basinPixels = composition === 'desktop' && buffer ? await measureBasin(targetPage, buffer) : null;
    return { scenario, composition, context, basinPixels, screenshotSha256: buffer ? hash(buffer) : null };
  };

  // Preserve all historical evidence and the two unrelated world implementations.
  const preserved = [
    'warmHeart.ts', 'WarmHeartWorld.tsx', 'snowVillage.ts', 'SnowVillageWorld.tsx',
    'qa/verify.mjs',
    ...git('ls-tree', '-r', '--name-only', baselineCommit, `${relativeGroup}/qa/evidence`).split('\n').filter(Boolean).map((file) => file.slice(relativeGroup.length + 1)),
  ];
  for (const relative of preserved) {
    const baselineBytes = execFileSync('git', ['show', `${baselineCommit}:${relativeGroup}/${relative}`], { cwd: repository });
    const actual = await readFile(path.join(sourceRoot, relative));
    assert.equal(hash(actual), hash(baselineBytes), `baseline source/evidence preserved: ${relative}`);
    report.preservation.sourceFiles.push({ path: `${relativeGroup}/${relative}`, baselineSha256: hash(baselineBytes), actualSha256: hash(actual), identical: true });
  }
  await checkpoint('warm/snow source and historical verifier/evidence preservation');

  // Every composition is captured before the more expensive animated regressions.
  for (const scenario of ['normal', 'forced-byte']) {
    currentScenario = scenario;
    const query = scenario === 'forced-byte' ? '&targets=byte' : '';
    const result = { world: 'meditation', scenario, query, checks: [], tap: null, diagnostics: null, lifecycleViewport: capturesOnly ? null : { width: 640, height: 480 } };
    report.worlds.push(result);
    for (const [composition, viewport] of [['desktop', { width: 1280, height: 800 }], ['portrait', { width: 390, height: 844 }]]) {
      await navigate('meditation', viewport, `${query}&inactive=1`);
      result.checks.push(await assertFrozen(`${scenario} ${composition} initially inactive complete first frame`));
      const buffer = await screenshot(`meditation-${scenario}-${composition}`);
      if (scenario === 'normal') {
        const baselineFile = `meditation-${composition}.png`;
        const baseline = baselineReport.screenshots.find((item) => item.file === baselineFile);
        assert.ok(baseline, `historical pixel baseline exists for ${baselineFile}`);
        const identical = hash(buffer) === baseline.sha256;
        report.preservation.screenshots.push({ file: `meditation-${scenario}-${composition}.png`, baselineFile, baselineSha256: baseline.sha256, actualSha256: hash(buffer), identical });
        assert.ok(identical, `meditation ${composition} normal pixels exactly preserve approved baseline`);
      }
      report.targetCompatibility.push(await targetProbe(page, buffer, scenario, composition));
      await checkpoint(`meditation ${scenario} ${composition} actual render targets and pixels`);
    }
  }
  for (const world of ['warm-heart', 'snow-village']) {
    currentScenario = 'preservation-normal';
    for (const [composition, viewport] of [['desktop', { width: 1280, height: 800 }], ['portrait', { width: 390, height: 844 }]]) {
      await navigate(world, viewport, '&inactive=1');
      await assertFrozen(`${world} ${composition} preserved initially inactive frame`);
      const file = `${world}-${composition}.png`;
      const buffer = await screenshot(`${world}-${composition}`);
      const baseline = baselineReport.screenshots.find((item) => item.file === file);
      assert.ok(baseline, `historical pixel baseline exists for ${file}`);
      const identical = hash(buffer) === baseline.sha256;
      report.preservation.screenshots.push({ file, baselineSha256: baseline.sha256, actualSha256: hash(buffer), identical });
      assert.ok(identical, `${world} ${composition} actual pixels exactly preserve approved baseline`);
      await checkpoint(`${world} ${composition} exact normal pixel preservation`);
    }
  }

  // A smaller native browser viewport makes software-GPU lifecycle checks practical.
  // It changes only the test window size, never scene resolution, quality or frame caps.
  for (const result of report.worlds) {
    const { world, scenario, query } = result;
    currentScenario = scenario;
    if (capturesOnly) {
      result.checks.push('motion and lifecycle checks intentionally skipped in visual-captures-only mode');
      continue;
    }
    await navigate(world, { width: 640, height: 480 }, query);
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
    const movingAfter = await screenshot(`${world}-${scenario}-motion`);
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
    await screenshot(`${world}-${scenario}-interaction`);
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
    await checkpoint(`${world} ${scenario} motion and genuine pointer interaction checks at 640×480`);

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
    await checkpoint(`${world} ${scenario} pause, reduced motion, static3D and synthetic visibility`);

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
    await checkpoint(`${world} ${scenario} exact canvas reuse across two holders`);

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
    result.remountTargetCompatibility = await targetProbe(page, null, scenario, 'lifecycle-remount');
    await press('active');
    await assertFrozen('lifecycle complete');
    await checkpoint(`${world} ${scenario} complete lifecycle including static first mount and disposal grace`);
  }
  assert.deepEqual(report.errors, [], 'no browser runtime, shader, or other console errors');
  const finalSources = await manifest(sourceFiles, repository);
  const finalBundle = await manifest(await listFiles(path.join(here, '.build')), path.join(here, '.build'));
  assert.equal(finalSources.sha256, sources.sha256, 'source content stayed unchanged throughout browser verification');
  assert.equal(finalBundle.sha256, bundle.sha256, 'built content stayed unchanged throughout browser verification');
  report.contentStableThroughoutRun = { sourceSha256: finalSources.sha256, bundleSha256: finalBundle.sha256 };
  report.passed = true;
} catch (error) {
  report.failure = { message: error.message, stack: error.stack };
  console.error(error.stack || error);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  if (previewServer) await new Promise((resolve) => previewServer.httpServer.close(resolve));
  report.finishedAt = new Date().toISOString();
  report.resourcesClosed = { browser: !browser || !browser.isConnected(), previewServer: !previewServer || !previewServer.httpServer.listening };
  await writeFile(path.join(output, 'target-compatibility.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ passed: report.passed, output, sourceSha256: sources.sha256, bundleSha256: bundle.sha256, screenshots: report.screenshots.length, failure: report.failure?.message }, null, 2));
}
