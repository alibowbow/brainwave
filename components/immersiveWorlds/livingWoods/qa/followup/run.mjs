import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, preview } from 'vite';
import react from '@vitejs/plugin-react';
import { chromium } from 'playwright-core';

const qaRoot = path.dirname(fileURLToPath(import.meta.url));
const groupRoot = path.resolve(qaRoot, '../..');
const repoRoot = path.resolve(groupRoot, '../../..');
const sha = data => createHash('sha256').update(data).digest('hex');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const captureBudgetMs = 60_000;
const functionalTimeoutMs = 15_000;
const viewports = { desktop: { width: 1280, height: 800 }, portrait: { width: 390, height: 844 }, 'fold-inner-viewport': { width: 882, height: 768 } };

async function filesIn(directory, relativeTo = directory, excluded = []) {
  const files = [];
  for (const item of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    if (excluded.includes(item.name) || item.name.startsWith('.')) continue;
    const full = path.join(directory, item.name);
    if (item.isDirectory()) files.push(...await filesIn(full, relativeTo, excluded));
    else files.push({ path: path.relative(relativeTo, full).replaceAll(path.sep, '/'), sha256: sha(await readFile(full)) });
  }
  return files;
}
async function sourceInventory() {
  const files = await filesIn(groupRoot, repoRoot, ['qa']);
  for (const name of ['components/Player.tsx', 'components/ImmersiveMode.tsx', 'components/liveScene/liveSceneHost.ts', 'components/useSceneMotion.ts', 'index.css', 'sound-studio.css', 'tailwind.config.js', 'postcss.config.js', 'package.json', 'package-lock.json']) {
    files.push({ path: name, sha256: sha(await readFile(path.join(repoRoot, name))) });
  }
  const assets = path.join(repoRoot, 'public/immersive-worlds/livingWoods');
  try { files.push(...await filesIn(assets, repoRoot)); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  return files.sort((a, b) => a.path.localeCompare(b.path));
}
async function findBrowser() {
  for (const candidate of [process.env.SCENE_BROWSER_PATH, chromium.executablePath(), '/tmp/cosmic-browser-bin/chromium']) {
    if (!candidate) continue;
    try { await access(candidate); if ((await stat(candidate)).size > 100_000) return candidate; } catch { /* installed paths only */ }
  }
  throw new Error('No installed Chromium: no automatic browser download is attempted');
}
async function bounded(promise, ms, label) {
  let timer;
  try { return await Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} exceeded ${ms} ms; page is contaminated and will not be reused`)), ms); })]); }
  finally { clearTimeout(timer); }
}

export async function runFollowupQA() {
  const selected = (process.env.LIVING_WOODS_WORLDS || 'morning,rainy,ancient,bamboo').split(',');
  selected.forEach(world => assert.ok(['morning', 'rainy', 'ancient', 'bamboo'].includes(world)));
  const phase = process.env.LIVING_WOODS_PHASE || 'all';
  assert.ok(['all', 'capture', 'functional', 'interaction', 'lifecycle'].includes(phase), `unknown QA phase ${phase}`);
  const output = path.resolve(process.env.SCENE_SCREENSHOT_DIR || path.join(qaRoot, 'evidence'));
  await mkdir(output, { recursive: true });
  assert.ok(!(await readdir(output)).some(name => name === 'report.json' || name.endsWith('.png')),
    'QA output already contains evidence; set SCENE_SCREENSHOT_DIR to a new empty directory.');
  const sourceFiles = await sourceInventory();
  const harnessFiles = await Promise.all(['index.html', 'harness.tsx', 'backdrop.tsx'].map(async name => ({ path: name, sha256: sha(await readFile(path.join(qaRoot, name))) })));
  const options = {
    configFile: false, root: qaRoot, base: '/', publicDir: path.join(repoRoot, 'public'),
    plugins: [{ name: 'livingwoods-owned-qa-backdrop', enforce: 'pre', resolveId(source, importer) {
      if (source === './SessionBackdrop' && importer && /\/components\/(Player|ImmersiveMode)\.tsx$/.test(importer)) return path.join(qaRoot, 'backdrop.tsx');
    } }, react()],
    build: { outDir: '.build', emptyOutDir: true, sourcemap: false },
  };
  const manifestPath = path.join(qaRoot, '.build-manifest.json');
  const sourceHash = sha(JSON.stringify(sourceFiles)), harnessHash = sha(JSON.stringify(harnessFiles));
  if (process.env.LIVING_WOODS_FOLLOWUP_REUSE_BUILD === '1') {
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    assert.equal(manifest.sourceHash, sourceHash, 'frozen source must match current runtime source');
    assert.equal(manifest.harnessHash, harnessHash, 'frozen harness build inputs must match');
    assert.equal(manifest.bundleHash, sha(JSON.stringify(await filesIn(path.join(qaRoot, '.build')))), 'frozen bundle hash must match');
  } else {
    await build(options);
    const bundleHash = sha(JSON.stringify(await filesIn(path.join(qaRoot, '.build'))));
    await writeFile(manifestPath, JSON.stringify({ sourceHash, harnessHash, bundleHash }, null, 2) + '\n');
  }
  const bundleFiles = await filesIn(path.join(qaRoot, '.build'));
  const originalPngs = (await filesIn(path.resolve(qaRoot, '../evidence'))).filter(file => /^(morning|rainy|ancient|bamboo)-(desktop|portrait|fold-inner-viewport)\.png$/.test(file.path));
  const report = {
    generatedAt: new Date().toISOString(), phase, sourceRevision: process.env.SCENE_SOURCE_REVISION || 'working tree: exact hashes below',
    sourceFiles, sourceHash, harnessFiles, harnessHash, bundleFiles, bundleHash: sha(JSON.stringify(bundleFiles)), runnerHash: sha(await readFile(fileURLToPath(import.meta.url))),
    before: { originalBranch: 'codex/living-woods-four-worlds', originalHead: 'a3ec0ca45fc9e545fbee3791a72e1d90a56c7249', evidenceRoot: '../evidence', originalPngs },
    environment: { browserExecutable: await findBrowser(), browserVersion: null, backend: 'Chromium SwiftShader software WebGL', dpr: 1,
      capture: 'Native browser viewport PNG via Playwright; nonblocking completion fence and PNG share a strict 60-second budget. No screenshot is queued after a drain failure.',
      scope: 'Unmodified production Player/ImmersiveMode wrappers and stylesheet, owned QA-only SessionBackdrop injection. Not actual App/catalog/audio-engine integration; no audio context created.',
      hardware: 'Viewport emulation only, no physical Fold, hardware FPS, power or thermal claim.' },
    jobs: [], failed: [], passed: false,
    unrun: ['Actual integrated main App/catalog registration, production audio engine/autoplay and Back/history routing: shared integrator scope.', 'Physical-device touch and Fold hardware.'],
  };
  report.plannedJobs = selected.flatMap(world => [
    ...(['all', 'capture'].includes(phase) ? [`${world}/scene/normal`, `${world}/wrapper/normal`, ...(world === 'bamboo' ? ['bamboo/scene/forced-byte'] : [])] : []),
    ...(['all', 'functional', 'interaction'].includes(phase) ? [`${world}/native-interaction/normal`] : []),
    ...(['all', 'functional', 'lifecycle'].includes(phase) ? [`${world}/clean-lifecycle/normal`] : []),
  ]);
  const server = await preview({ ...options, preview: { host: '127.0.0.1', port: 0 } });
  const address = server.httpServer.address();
  assert.ok(address && typeof address !== 'string');
  const base = `http://127.0.0.1:${address.port}`;
  const saveReport = () => {
    const attempted = new Set(report.jobs.map(job => `${job.world}/${job.kind}/${job.forceByte ? 'forced-byte' : 'normal'}`));
    report.notRunJobs = report.plannedJobs.filter(job => !attempted.has(job));
    return writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  };

  async function job(world, kind, forceByte, fn) {
    const entry = { world, kind, forceByte, checks: {}, screenshots: [], errors: [], passed: false };
    report.jobs.push(entry);
    let browser, page;
    try {
      console.log(`LivingWoods follow-up ${world}/${kind}${forceByte ? '/forced-byte' : ''}`);
      browser = await chromium.launch({ executablePath: report.environment.browserExecutable, headless: true,
        args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
      report.environment.browserVersion = browser.version();
      const context = await browser.newContext({ viewport: viewports.desktop, deviceScaleFactor: 1, serviceWorkers: 'block' });
      if (forceByte) await context.addInitScript(() => { window.__livingWoodsQAForceByte = true; });
      page = await context.newPage();
      page.setDefaultTimeout(functionalTimeoutMs);
      page.on('pageerror', error => entry.errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') entry.errors.push(message.text()); });
      const api = (method, value) => page.evaluate(({ method, value }) => window.__livingWoodsFollowupQA[method](value), { method, value });
      const metrics = () => api('metrics');
      const ready = () => page.waitForFunction(() => document.querySelector('canvas[data-engine-id]')?.closest('[data-status]')?.getAttribute('data-status') === 'ready');
      const motion = expected => page.waitForFunction(value => document.querySelector('canvas[data-engine-id]')?.closest('[data-status]')?.getAttribute('data-motion') === value, expected);
      const settled = async () => {
        await page.waitForFunction(() => {
          const canvas = document.querySelector('canvas[data-engine-id]'); if (!canvas) return false;
          const box = canvas.getBoundingClientRect(), dpr = Math.min(2, Math.max(1, devicePixelRatio));
          return Number(canvas.dataset.pendingSubmissions || 0) === 0 && canvas.dataset.pendingStaticFrame !== 'true' && canvas.width > 0 && canvas.height > 0
            && Math.abs(canvas.width - Math.round(box.width * dpr)) <= 1 && Math.abs(canvas.height - Math.round(box.height * dpr)) <= 1;
        });
      };
      const stable = async name => {
        await motion('paused'); await settled(); await delay(400);
        const before = await metrics(); await delay(500); const after = await metrics();
        assert.equal(after.frames, before.frames, `${name}: frames stay paused`);
        assert.equal(after.time, before.time, `${name}: simulation stays paused`);
        entry.checks[name] = { passed: true, before, after };
      };
      const shot = async label => {
        await stable(`still-${label}`);
        const start = Date.now();
        const drain = await bounded(api('drain', captureBudgetMs - 1000), captureBudgetMs, `${label} GPU drain`);
        const remaining = captureBudgetMs - (Date.now() - start);
        assert.ok(remaining > 0, 'shared capture budget remains');
        const bytes = await bounded(page.screenshot({ type: 'png', fullPage: false, timeout: remaining, animations: 'allow' }), remaining, `${label} native browser PNG`);
        const filename = `${world}-${kind}-${label}${forceByte ? '-forced-byte' : ''}.png`;
        await writeFile(path.join(output, filename), bytes);
        assert.ok(bytes.length > 10000, 'PNG contains actual scene and chrome pixels');
        assert.equal(bytes.readUInt32BE(16), page.viewportSize().width, 'PNG width is native viewport');
        assert.equal(bytes.readUInt32BE(20), page.viewportSize().height, 'PNG height is native viewport');
        const state = await metrics();
        const record = { file: filename, sha256: sha(bytes), bytes: bytes.length, viewport: page.viewportSize(), state, drain, durationMs: Date.now() - start, captureMethod: 'native browser viewport PNG', bundleHash: report.bundleHash, sourceHash };
        entry.screenshots.push(record); console.log(`  saved ${filename} in ${record.durationMs} ms`);
        return bytes;
      };
      const load = async mode => {
        await page.goto(`${base}/?world=${world}&mode=${mode}`, { waitUntil: 'domcontentloaded' });
        await ready(); await motion('paused'); await settled();
        const state = await metrics();
        assert.equal(state.canvasCount, 1); assert.equal(state.time, 0);
        entry.initial = state;
        if (world === 'bamboo') {
          const reflection = JSON.parse(state.dataset.reflectorCompatibility || 'null');
          assert.ok(reflection, 'bamboo exposes actual target compatibility outcome');
          assert.equal(reflection.framebufferComplete, true, 'actual allocated reflection framebuffer is complete');
          assert.equal(reflection.forcedByte, forceByte, 'scoped force flag observed before allocation');
          assert.ok(reflection.width > 0 && reflection.height > 0);
          entry.checks.reflector = { passed: true, data: reflection, forcedByteRequested: forceByte };
          if (forceByte) assert.equal(reflection.textureType, 'UnsignedByteType', 'forced-byte actual target type');
          else if (reflection.extensions.colorBufferFloat || reflection.extensions.colorBufferHalfFloat) assert.equal(reflection.attempts[0].textureType, 'HalfFloatType', 'normal supported path retains half-float default');
        }
      };
      await fn({ page, context, api, metrics, motion, stable, shot, load, settled, entry });
      assert.deepEqual(entry.errors, [], 'No browser JavaScript/WebGL errors');
      entry.passed = true;
    } catch (error) {
      entry.errors.push(error.stack || String(error)); report.failed.push(`${world}/${kind}: ${error.message || error}`);
      console.error(`FAIL ${world}/${kind}: ${error.message || error}`);
      // DOM-only failure telemetry cannot submit or read back GPU work. Keep
      // the original timeout failure even if the page settles afterwards.
      if (page && !page.isClosed()) {
        try {
          entry.failureState = await bounded(page.evaluate(() => {
            const canvas = document.querySelector('canvas[data-engine-id]');
            const box = canvas?.getBoundingClientRect();
            return { atMs: performance.now(), visibility: document.visibilityState,
              status: canvas?.closest('[data-status]')?.getAttribute('data-status'),
              motion: canvas?.closest('[data-motion]')?.getAttribute('data-motion'),
              dataset: canvas ? { ...canvas.dataset } : null,
              buffer: canvas ? { width: canvas.width, height: canvas.height } : null,
              css: box ? { width: box.width, height: box.height } : null,
              dpr: devicePixelRatio };
          }), 2000, 'DOM-only failure telemetry');
        } catch (diagnosticError) { entry.failureTelemetryError = diagnosticError.message; }
      }
    } finally {
      // A timeout does not cancel pending GPU work. Never issue another action
      // or capture in the failed page; lifecycle jobs get a fresh browser.
      await saveReport();
      if (browser) {
        try { await bounded(browser.close(), 10_000, 'browser close'); }
        catch (error) {
          entry.closeError = error.message;
          report.failed.push(`${world}/${kind}: browser did not close within bound; remaining jobs are unrun`);
          await saveReport();
          // An unresolved close may still hold a graphics process. Do not launch
          // another browser over it or use that run for lifecycle conclusions.
          throw error;
        }
      }
    }
  }

  async function visual({ page, load, shot, entry }, wrappers = false) {
    await load(wrappers ? 'player' : 'scene');
    for (const [name, viewport] of Object.entries(viewports)) {
      await page.setViewportSize(viewport);
      if (wrappers) await page.keyboard.press('Shift');
      await shot(name);
    }
    entry.checks.scope = wrappers ? 'Native PNG of real Player wrapper with isolated owned scene adapter.' : 'Native PNG of original scene at full requested viewport, no quality reduction.';
  }

  async function nativeContract({ page, context, api, metrics, motion, stable, shot, load, entry }, capturePost) {
    await load('player');
    await api('rememberCanvas');
    await page.keyboard.press('Shift');
    await page.getByRole('button', { name: '재생', exact: true }).click(); await motion('running');
    const start = await metrics();
    await page.waitForFunction(previous => Number(document.querySelector('canvas')?.dataset.time) > previous, start.time);
    // Scene pointerdown intentionally prevents mouse default focus changes.
    // Leaving Play focused would make its eventual hidden-state focusout
    // invoke the real wrapper's onBlurCapture and immediately reveal chrome.
    // A trusted click on the noninteractive header establishes the ordinary
    // unfocused viewing state without synthetic blur or changing product code.
    const heading = page.locator('header h1');
    const headingBounds = await heading.boundingBox();
    assert.ok(headingBounds, 'real session heading is visible');
    const headingHit = await page.evaluate(({ x, y }) => {
      const target = document.elementFromPoint(x, y);
      return { tag: target?.tagName, text: target?.textContent, outsideScene: !target?.closest('[data-scene-surface]') };
    }, { x: headingBounds.x + headingBounds.width / 2, y: headingBounds.y + headingBounds.height / 2 });
    assert.equal(headingHit.tag, 'H1'); assert.equal(headingHit.outsideScene, true);
    await heading.click();
    const focusedAfterHeading = await page.evaluate(() => ({ tag: document.activeElement?.tagName, label: document.activeElement?.getAttribute('aria-label') }));
    assert.notEqual(focusedAfterHeading.tag, 'BUTTON', 'native heading click naturally releases Play focus');
    entry.checks.nativeFocusSetup = { passed: true, headingHit, focusedAfterHeading, input: 'Trusted native click on actual noninteractive Player header heading; no synthetic blur.' };
    const tap = async (name, hidden = false) => {
      await delay(700); await api('clearEvents');
      const centers = await api('targets');
      const useTriangleInteriors = entry.world === 'bamboo' && name === 'portraitNativeTap';
      const interiors = useTriangleInteriors ? await api('triangleTargets') : [];
      if (useTriangleInteriors) assert.ok(interiors.length, 'portrait fixture has a verified point on real leaf geometry');
      const targets = useTriangleInteriors ? [...interiors.slice(0, 6), ...centers].slice(0, 8) : centers;
      const attempts = [];
      entry.checks[`${name}Attempts`] = { selection: useTriangleInteriors ? 'Read-only real triangle interiors verified by scene-target raycast, followed by original center fallback; native input unchanged.' : 'Original projected target centers', candidates: targets, attempts };
      assert.ok(targets.length, `${name}: visible raycast target`);
      let success;
      for (const target of targets) {
        const attempt = { target, overlayHit: null, callbackCount: 0 };
        attempts.push(attempt);
        await page.mouse.move(target.clientX, target.clientY);
        if (hidden) {
          await page.waitForFunction(() => { const overlay = document.querySelector('[data-scene-drag]'); return overlay && getComputedStyle(overlay).visibility === 'hidden'; }, null, { timeout: 6000 });
          const hit = await page.evaluate(({ clientX, clientY }) => {
            const target = document.elementFromPoint(clientX, clientY), ancestry = [];
            for (let item = target; item && ancestry.length < 7; item = item.parentElement) ancestry.push({ tag: item.tagName, classes: item.getAttribute('class'), world: item.getAttribute('data-world'), surface: item.hasAttribute('data-scene-surface'), drag: item.hasAttribute('data-scene-drag') });
            const overlay = document.querySelector('[data-scene-drag]');
            return { tag: target?.tagName, scene: !!target?.closest('[data-world]'), ancestry, activeElement: { tag: document.activeElement?.tagName, label: document.activeElement?.getAttribute('aria-label') }, overlayVisibility: overlay && getComputedStyle(overlay).visibility };
          }, target);
          entry.checks.hiddenChromeHitTest = { passed: hit.scene && hit.overlayVisibility === 'hidden', hit };
          attempt.overlayHit = hit;
          assert.equal(hit.overlayVisibility, 'hidden', 'hidden state persists until actual hit-test task');
          assert.ok(hit.scene, 'hidden chrome exposes the real scene in native hit testing');
        } else {
          const hit = await page.evaluate(({ clientX, clientY }) => document.elementFromPoint(clientX, clientY)?.hasAttribute('data-scene-drag'), target);
          attempt.overlayHit = hit;
          if (!hit) continue;
        }
        await page.mouse.down(); await page.mouse.up();
        const events = await api('events');
        attempt.callbackCount = events.length;
        if (events.length) { success = { target, events }; break; }
      }
      assert.ok(success, `${name}: trusted native tap hits an owned object`);
      assert.equal(success.events.length, 1, `${name}: one bounded callback`);
      entry.checks[name] = { passed: true, ...success, input: 'Playwright native mouse, isTrusted verified in log' };
    };
    await tap('visibleChromeTap');
    await delay(700); await api('clearEvents');
    const target = (await api('targets'))[0];
    await page.mouse.move(target.clientX, target.clientY); await page.mouse.down();
    await page.mouse.move(Math.min(1200, target.clientX + 125), Math.max(80, target.clientY - 35), { steps: 5 });
    assert.equal(await page.locator('[data-world]').getAttribute('data-look'), 'drag', 'visible chrome native drag engages look');
    await page.mouse.up(); assert.equal((await api('events')).length, 0, 'drag never emits tap');
    entry.checks.visibleChromeDrag = { passed: true, input: 'native mouse' };
    await tap('hiddenChromeTap', true);
    // Hidden-chrome drag begins on the scene, even though pointerdown reveals UI.
    await delay(700); await api('clearEvents');
    const hiddenTarget = (await api('targets'))[0];
    await page.mouse.move(hiddenTarget.clientX, hiddenTarget.clientY);
    await page.waitForFunction(() => getComputedStyle(document.querySelector('[data-scene-drag]')).visibility === 'hidden', null, { timeout: 6000 });
    await page.mouse.down(); await page.mouse.move(Math.min(1200, hiddenTarget.clientX + 100), Math.max(80, hiddenTarget.clientY - 30), { steps: 4 });
    assert.equal(await page.locator('[data-world]').getAttribute('data-look'), 'drag');
    await page.mouse.up(); assert.equal((await api('events')).length, 0);
    entry.checks.hiddenChromeDrag = { passed: true, input: 'native mouse' };
    await page.keyboard.press('Shift');
    await page.getByRole('button', { name: '일시정지', exact: true }).click(); await stable('nativePause');
    assert.equal((await api('events')).length, 0, 'chrome pause is excluded from scene taps');
    if (capturePost) await shot('post-native-interaction-paused');
    entry.checks.inputTrust = await api('nativeInputLog');
    assert.ok(entry.checks.inputTrust.length > 4 && entry.checks.inputTrust.every(item => item.trusted), 'all preceding pointerdown inputs are trusted');

    await page.getByRole('button', { name: '전체 화면 보기', exact: true }).click();
    await page.waitForFunction(() => !!document.querySelector('[role="dialog"] canvas'));
    assert.equal((await metrics()).canvasCount, 1); assert.equal((await api('lifecycle')).sameCanvas, true);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('[role="dialog"]'));
    assert.equal((await metrics()).canvasCount, 1); assert.equal((await api('lifecycle')).sameCanvas, true);
    await stable('pausedAfterNativeHolderTransfer');
    entry.checks.nativeFullscreenEscape = { passed: true, identicalCanvas: true, count: 1, scope: 'Real production wrappers, owned injected backdrop; browser Fullscreen API is not used by this product UI.' };

    await page.setViewportSize(viewports.portrait); await stable('portraitBeforeNativeTap');
    await page.keyboard.press('Shift');
    await page.getByRole('button', { name: '재생', exact: true }).click(); await motion('running');
    await tap('portraitNativeTap');
    await page.keyboard.press('Shift');
    await page.getByRole('button', { name: '일시정지', exact: true }).click(); await stable('portraitNativePause');
    entry.checks.portraitInputTrust = await api('nativeInputLog');
    assert.ok(entry.checks.portraitInputTrust.every(item => item.trusted), 'all pointer inputs through portrait tap are trusted');
    await page.setViewportSize(viewports.desktop); await stable('desktopRestoredAfterPortraitTap');

    await api('setActive', true); await motion('running');
    await page.emulateMedia({ reducedMotion: 'reduce' }); await stable('reducedMotionMedia');
    await page.emulateMedia({ reducedMotion: 'no-preference' }); await motion('running');
    await page.evaluate(() => document.documentElement.classList.add('reduce-motion')); await stable('appReducedMotionClass');
    await page.evaluate(() => document.documentElement.classList.remove('reduce-motion')); await motion('running');
    const other = await context.newPage(); await other.goto('about:blank'); await other.bringToFront();
    const visibility = (await metrics()).visibility;
    if (visibility === 'hidden') { await stable('nativeTabHidden'); entry.checks.nativeTabHidden.input = 'Browser second page brought to foreground'; }
    else entry.checks.nativeTabHidden = { passed: false, status: 'unrun', reason: 'This headless browser keeps background pages visible; no real hidden-state claim.' };
    await other.close(); await page.bringToFront();
    await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' }); document.dispatchEvent(new Event('visibilitychange')); });
    await stable('syntheticHidden');
    await page.evaluate(() => { delete document.hidden; delete document.visibilityState; document.dispatchEvent(new Event('visibilitychange')); }); await motion('running');
    await delay(700); await api('clearEvents');
    await page.evaluate(() => {
      const target = window.__livingWoodsFollowupQA.targets()[0]; const surface = document.querySelector('[data-scene-drag]');
      const init = { bubbles: true, isPrimary: true, pointerId: 31, pointerType: 'touch', button: 0, clientX: target.clientX, clientY: target.clientY };
      surface.dispatchEvent(new PointerEvent('pointerdown', init)); window.dispatchEvent(new PointerEvent('pointercancel', init)); window.dispatchEvent(new PointerEvent('pointerup', init));
      surface.dispatchEvent(new PointerEvent('pointerdown', { ...init, pointerId: 32 })); window.dispatchEvent(new Event('blur')); window.dispatchEvent(new PointerEvent('pointerup', { ...init, pointerId: 32 }));
    });
    assert.equal((await api('events')).length, 0); entry.checks.pointerCancelAndBlur = { passed: true, input: 'Synthetic PointerEvent cancellation and window blur; not native input' };
    await api('setActive', false); await stable('finalPaused');
    entry.final = await metrics();
    assert.ok(entry.final.maxPendingSubmissions <= 2, 'observed native interaction workload never exceeds two pending submissions');
    entry.checks.observedSubmissionBound = { passed: true, maxObserved: entry.final.maxPendingSubmissions, observationIntervalMs: 25, scope: 'Browser samples; exhaustive status/state combinations are covered by the owned deterministic submission-gate tests.' };
  }

  async function cleanLifecycle({ page, api, metrics, load, stable, entry }) {
    await load('scene'); await api('rememberCanvas');
    const originalEngine = (await metrics()).dataset.engineId;
    for (let i = 0; i < 3; i++) {
      await api('setMounted', false); await page.waitForFunction(() => !document.querySelector('canvas'));
      await api('setMounted', true); await page.waitForFunction(() => !!document.querySelector('canvas[data-engine-id]'));
      assert.equal((await metrics()).dataset.engineId, originalEngine); assert.equal((await api('lifecycle')).sameCanvas, true);
    }
    await stable('rapidRemountPaused');
    entry.checks.rapidRemount = { passed: true, cycles: 3, sameEngineAndCanvas: true };
    await api('setActive', true);
    await page.waitForFunction(() => Number(document.querySelector('canvas')?.dataset.time) > 0);
    await api('setStatic', true); await stable('static3D'); await api('setActive', false); await api('setStatic', false);
    await stable('cleanNoCaptureBeforeRemoval');
    await api('rememberCanvas');
    await api('setMounted', false); await page.waitForFunction(() => !document.querySelector('canvas'));
    const removed = await api('lifecycle');
    await delay(5100);
    await page.waitForFunction(() => { const state = window.__livingWoodsFollowupQA.lifecycle(); return state.dataset.disposeEndMs && state.contextLostMs !== undefined; }, null, { timeout: 5000 });
    const done = await api('lifecycle');
    const start = Number(done.dataset.disposeStartMs), end = Number(done.dataset.disposeEndMs);
    assert.ok(Number.isFinite(start) && Number.isFinite(end));
    assert.ok(start >= done.removalMs + 4900, 'host retains approximately five seconds before dispose entry');
    assert.ok(start - done.removalMs < 7500, 'clean disposal enters without timer starvation');
    assert.ok(end - start < 3000, 'actual synchronous cleanup finishes within original bounded budget');
    assert.ok(done.contextLostMs >= start, 'actual context loss event observed after dispose entry');
    assert.equal(done.dataset.frames, removed.dataset.frames, 'detached engine submits no further frames');
    entry.checks.cleanNoCaptureDisposal = { passed: true, configuredHostGraceMs: 5000, removalMs: done.removalMs, disposeEntryMs: start, disposeExitMs: end, contextLostMs: done.contextLostMs,
      removalToDisposeEntryMs: start - done.removalMs, actualDisposeDurationMs: end - start, removalToContextLossMs: done.contextLostMs - done.removalMs,
      maxHeartbeatLagMs: done.maxHeartbeatLagMs, heartbeatCount: done.heartbeatCount, noScreenshotsInThisBrowser: true };
    await api('setMounted', true); await page.waitForFunction(() => document.querySelector('canvas[data-engine-id]')?.closest('[data-status]')?.getAttribute('data-status') === 'ready');
    // Ready means a draw was submitted, not completed. Drain and prove the new
    // paused canvas before closing this otherwise-clean lifecycle browser.
    await stable('recreatedInactive');
    const cold = await metrics(); assert.notEqual(cold.dataset.engineId, originalEngine); assert.equal(cold.time, 0);
    entry.checks.coldRecreate = { passed: true, state: cold };
  }

  try {
    for (const world of selected) {
      if (['all', 'capture'].includes(phase)) {
        await job(world, 'scene', false, args => visual(args));
        await job(world, 'wrapper', false, args => visual(args, true));
        if (world === 'bamboo') await job(world, 'scene', true, async args => { await args.load('scene'); await args.shot('desktop'); });
      }
      if (['all', 'functional', 'interaction'].includes(phase)) await job(world, 'native-interaction', false, args => nativeContract(args, phase !== 'functional'));
      if (['all', 'functional', 'lifecycle'].includes(phase)) await job(world, 'clean-lifecycle', false, cleanLifecycle);
    }
    report.passed = report.failed.length === 0;
    await saveReport();
    if (!report.passed) throw new Error(`${report.failed.length} LivingWoods follow-up jobs failed; ${path.join(output, 'report.json')}`);
    return report;
  } finally { await saveReport(); await new Promise(resolve => server.httpServer.close(resolve)); }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await runFollowupQA();
