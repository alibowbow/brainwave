/** Bounded follow-up evidence, never overwrites PR58 evidence.
 * npx vite build --config components/immersiveWorlds/waterEdge/dev/vite.config.ts
 * node components/immersiveWorlds/waterEdge/qa/followup-verify.mjs --serve --stage=visual --world=pebble-shore --mode=normal --viewport=desktop
 * Stages run in independent browser processes. lifecycle never invokes screenshot/readPixels/fence.
 */
import { chromium } from 'playwright-core';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { execFileSync } from 'node:child_process';
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateTargetAudit } from './followup-target-assertions.mjs';

const qa = path.dirname(fileURLToPath(import.meta.url)), owned = path.dirname(qa);
const args = process.argv.slice(2), arg = (name, fallback) => args.find(x => x.startsWith(`--${name}=`))?.slice(name.length + 3) || fallback;
const stage = arg('stage', 'visual'), world = arg('world', 'pebble-shore'), mode = arg('mode', 'normal'), viewportName = arg('viewport', 'desktop');
const viewport = ({ desktop: { width: 1280, height: 800 }, portrait: { width: 390, height: 844 } })[viewportName];
if (!viewport || !['visual', 'behavior', 'lifecycle', 'diagnostic'].includes(stage) || !['normal', 'byte'].includes(mode)) throw new Error('Invalid stage/mode/viewport');
const tag = arg('tag', 'final');
if (!/^[a-z0-9-]+$/.test(tag)) throw new Error('Invalid evidence tag');
const drainBeforeDispose = args.includes('--drain-before-dispose');
if (drainBeforeDispose && stage !== 'diagnostic') throw new Error('GPU-drained lifecycle must be a separately labelled diagnostic stage');
const base = process.env.WATER_EDGE_URL || 'http://127.0.0.1:4188';
const evidenceName = arg('evidence', 'followup-lifecycle-evidence');
if (!/^[a-z0-9-]+$/.test(evidenceName) || evidenceName === 'followup-evidence') throw new Error('Use a new owned evidence directory; original followup-evidence is immutable');
const output = path.join(qa, evidenceName); await mkdir(output, { recursive: true });
const stem = `${tag}-${world}-${mode}-${viewportName}-${stage}`;
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
async function treeHash(root, keep = () => true, sourceOnly = false) {
  const digest = createHash('sha256');
  async function walk(dir) {
    for (const item of (await readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = path.join(dir, item.name), rel = path.relative(root, file);
      if (!keep(rel)) continue;
      if (item.isDirectory()) await walk(file);
      else if (!sourceOnly || /\.(tsx?|css|html)$/.test(rel)) digest.update(rel).update('\0').update(await readFile(file)).update('\0');
    }
  }
  await walk(root); return digest.digest('hex');
}
const report = {
  schema: 3, world, mode, stage, tag, drainBeforeDispose, viewportName, viewport, dpr: 1, generatedAt: new Date().toISOString(),
  scope: 'Owned standalone production-entry harness; chrome is harness HTML, not integrated Player/ImmersiveMode. No main/shared routing changes.',
  limitations: ['SwiftShader software GPU; no physical touch device or sustained hardware performance certification.',
    'Fence is an observation of the existing command stream, not a GPU timer or measured per-frame GPU cost.',
    'render-js-return duration includes synchronous driver/compiler stalls; it is not pure JavaScript CPU time.',
    'Configured shared-host retention is 5000 ms; disposal entry/exit and actual context loss are separate measured events.'],
  gitHead: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: owned, encoding: 'utf8' }).trim(),
  gitStatus: execFileSync('git', ['status', '--short'], { cwd: owned, encoding: 'utf8' }).trim(),
  sourceSha256: await treeHash(owned, x => !/^(dev|qa)(\/|$)/.test(x), true),
  harnessSha256: await treeHash(path.join(owned, 'dev'), x => !/^(dist|node_modules)(\/|$)/.test(x), true),
  bundleSha256: await treeHash(path.join(owned, 'dev/dist')),
  scriptSha256: sha(await readFile(fileURLToPath(import.meta.url))),
  status: 'running', checks: {}, captures: [], errors: [], warnings: [], unrun: [],
};
async function save() { await writeFile(path.join(output, `${stem}.json`), JSON.stringify(report, null, 2) + '\n'); }
const assert = (value, message) => { if (!value) throw new Error(message); };
const server = args.includes('--serve') ? createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, base).pathname;
    const file = path.join(owned, 'dev/dist', pathname === '/' ? 'index.html' : pathname);
    const bytes = await readFile(file);
    response.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : file.endsWith('.html') ? 'text/html' : 'application/octet-stream');
    response.end(bytes);
  } catch { response.statusCode = 404; response.end(); }
}) : null;
if (server) await new Promise((resolve, reject) => { server.once('error', reject); server.listen(Number(new URL(base).port), '127.0.0.1', resolve); });
let browser, context, page, tainted = false;
const inspect = () => page.evaluate(() => window.__waterEdgeQA.inspect());
const paused = () => page.waitForFunction(() => window.__waterEdgeQA.inspect().roots.every(root => root.motion === 'paused'));
async function ready() { await page.waitForFunction(() => window.__waterEdgeQA?.inspect().roots.some(root => root.state === 'ready'), null, { timeout: 60000 }); }
async function freeze(label, operation) {
  await operation(); await paused(); await page.waitForTimeout(150);
  const before = await inspect(); await page.waitForTimeout(500); const after = await inspect();
  assert(before.canvases[0].frames === after.canvases[0].frames && before.canvases[0].time === after.canvases[0].time, `${label}: paused submissions or time advanced`);
  report.checks[label] = { status: 'passed', before, after }; await save();
}
async function drain(label, budgetMs = 60000) {
  const start = Date.now();
  const result = await page.evaluate(budget => window.__waterEdgeQA.drainGpu(budget), budgetMs);
  report.checks[label] = { ...result, automationElapsedMs: Date.now() - start }; await save();
  if (result.status !== 'passed') { tainted = true; throw new Error(`${label}: ${result.reason}`); }
  return result;
}
async function capture(label) {
  // One combined bounded budget. Never launch another capture on a contaminated page.
  assert(!tainted, 'Page is tainted by an earlier GPU/capture failure');
  const began = Date.now(), budget = 90000;
  const fence = await drain(`${label}-gpuDrain`, 60000);
  const before = await inspect(); const remaining = budget - (Date.now() - began);
  if (remaining < 1000) { tainted = true; throw new Error(`${label}: capture budget consumed by GPU drain`); }
  const file = `${stem}-${label}.png`, screenshotStart = Date.now();
  let png;
  try { png = await page.screenshot({ path: path.join(output, file), fullPage: false, timeout: remaining }); }
  catch (error) { tainted = true; throw error; }
  const screenshotElapsedMs = Date.now() - screenshotStart, after = await inspect();
  assert(png.readUInt32BE(16) === viewport.width && png.readUInt32BE(20) === viewport.height, 'Native PNG dimensions do not match viewport');
  assert(before.canvases[0].frames === after.canvases[0].frames && before.canvases[0].time === after.canvases[0].time, 'Frame/time changed during paused capture');
  report.captures.push({ file, sha256: sha(png), bytes: png.length, captureMethod: 'Playwright native full viewport PNG via Chromium surface; unmodified HTML+WebGL composition',
    screenshotElapsedMs, combinedElapsedMs: Date.now() - began, fence, before, after }); await save();
  console.log(`${stem}: ${label} PNG; GPU drain ${fence.elapsedMs.toFixed(0)} ms; screenshot ${screenshotElapsedMs} ms`);
}
async function activate() {
  await page.evaluate(() => window.__waterEdgeQA.setActive(true));
  await page.waitForFunction(() => window.__waterEdgeQA.inspect().roots.every(root => root.motion === 'running'));
}
async function endBurst(label) {
  await freeze(label, () => page.evaluate(() => window.__waterEdgeQA.setActive(false)));
  await drain(`${label}-gpuDrain`);
}
try {
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/tmp/cosmic-browser-bin/chromium', headless: true,
    args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-dev-shm-usage'] });
  report.browser = await browser.version();
  context = await browser.newContext({ viewport, deviceScaleFactor: 1, hasTouch: true, reducedMotion: 'no-preference' });
  page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => report.errors.push({ kind: 'pageerror', message: error.message }));
  page.on('console', message => { if (message.type() === 'error') report.errors.push({ kind: 'console', message: message.text() });
    else if (message.type() === 'warning') report.warnings.push(message.text()); });
  await page.goto(`${base}/?world=${world}&active=0&targets=${mode === 'byte' ? 'byte' : 'auto'}&controls=${stage === 'behavior' ? '1' : '0'}`);
  await ready(); await freeze('initialPaused', async () => {});
  report.initial = await inspect(); report.graphics = await page.evaluate(() => window.__waterEdgeQA.graphicsInfo());
  assert(report.initial.sourceSha256 === report.sourceSha256, 'Stale bundle production-source digest');
  assert(report.initial.harnessSha256 === report.harnessSha256, 'Stale bundle harness digest');
  assert(report.initial.canvases.length === 1 && report.initial.canvases[0].width === viewport.width && report.initial.canvases[0].height === viewport.height, 'Canvas backing dimensions changed from requested native DPR1 size');
  assert(report.errors.length === 0, 'Initial console/shader/page errors');
  if (world !== 'night-pond') {
    const audit = report.graphics.targetAudit;
    report.checks.targetCompatibility = { ...validateTargetAudit(audit, { world, mode }), audit };
  }
  if (stage === 'visual') {
    await capture('initial');
    report.unrun.push('Behavior/lifecycle are separate clean stages; no inference from a still PNG.');
  } else if (stage === 'behavior') {
    await capture('chrome-initial');
    // No sibling drag overlay: trusted input lands directly in the production scene subtree.
    await activate();
    await page.mouse.move(viewport.width * .48, viewport.height * .52); await page.mouse.down();
    await page.mouse.move(viewport.width * .56, viewport.height * .58, { steps: 2 });
    assert(await page.locator('[data-world]').getAttribute('data-look') === 'drag', 'Trusted direct-root mouse movement never engaged look');
    await page.evaluate(() => window.__waterEdgeQA.pauseAfterNextPointerUp()); await page.mouse.up();
    assert((await inspect()).events.length === 0, 'Direct-root mouse drag emitted a tap');
    await endBurst('trustedDirectRootMouseDrag');
    report.checks.trustedDirectRootMouseDrag.method = 'Native mouse with sibling overlay absent; harness control panel remains visible, so this is not a full-app hidden-chrome claim.';

    await page.evaluate(() => window.__waterEdgeQA.setOverlay(true));
    await page.getByRole('button', { name: 'Play', exact: true }).click();
    await page.waitForFunction(() => window.__waterEdgeQA.inspect().roots.every(root => root.motion === 'running'));
    await page.getByRole('button', { name: 'Overlay QA control', exact: true }).click();
    assert((await inspect()).events.length === 0, 'Chrome button emitted a scene tap');
    await freeze('nativeChromePlayPause', () => page.getByRole('button', { name: 'Pause', exact: true }).click());
    await drain('nativeChromePlayPause-gpuDrain');
    report.checks.chromeControlSuppression = { status: 'passed', method: 'Native browser clicks on harness Play, overlay button and Pause; scene emitted no interaction' };

    await activate();
    await page.evaluate(() => window.__waterEdgeQA.clearEvents());
    await page.mouse.move(viewport.width * .5, viewport.height * .55); await page.mouse.down();
    await page.mouse.move(viewport.width * .6, viewport.height * .6, { steps: 2 });
    assert(await page.locator('[data-world]').getAttribute('data-look') === 'drag', 'Trusted mouse movement never engaged look');
    await page.evaluate(() => window.__waterEdgeQA.pauseAfterNextPointerUp());
    await page.mouse.up();
    assert((await inspect()).events.length === 0, 'Mouse drag emitted a tap');
    await endBurst('trustedMouseDrag');

    await activate();
    report.checks.syntheticCancellationEdges = await page.evaluate(({ width, height }) => {
      const api = window.__waterEdgeQA, overlay = document.querySelector('[data-scene-drag]');
      const fire = (target, kind, x, y, id) => target.dispatchEvent(new PointerEvent(kind, {
        bubbles: true, pointerId: id, pointerType: 'touch', isPrimary: true, button: 0, clientX: x, clientY: y,
      }));
      const x = width * .5, y = height * .6;
      fire(overlay, 'pointerdown', x, y, 91);
      fire(window, 'pointermove', x + 70, y + 30, 91);
      window.dispatchEvent(new Event('blur'));
      fire(window, 'pointerup', x, y, 91);
      const blurNoTap = api.events.length === 0 && !document.querySelector('[data-world]').hasAttribute('data-look');
      fire(overlay, 'pointerdown', 2, y, 92); fire(window, 'pointerup', -2, y, 92);
      const outsideNoTap = api.events.length === 0;
      fire(overlay, 'pointerdown', x, y, 93); fire(window, 'pointermove', x + 70, y + 30, 93);
      fire(window, 'pointermove', x, y, 93); fire(window, 'pointerup', x, y, 93);
      const outAndBackNoTap = api.events.length === 0;
      api.setActive(false);
      return { status: blurNoTap && outsideNoTap && outAndBackNoTap ? 'passed' : 'failed', blurNoTap, outsideNoTap, outAndBackNoTap,
        method: 'Explicitly synthetic DOM PointerEvents and window blur in one task through real production handlers; not native device input.' };
    }, viewport);
    assert(report.checks.syntheticCancellationEdges.status === 'passed', 'Synthetic blur/outside/out-and-back suppression failed');
    await endBurst('syntheticCancellationEdgesPaused');

    await activate();
    const touchCDP = await context.newCDPSession(page);
    await touchCDP.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: viewport.width * .5, y: viewport.height * .65 }] });
    await touchCDP.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
    await touchCDP.detach();
    assert((await inspect()).events.length === 0, 'Native emulated touch cancellation emitted a tap');
    assert(await page.locator('[data-world]').getAttribute('data-look') === null, 'Canceled pointer left active look state');
    await endBurst('trustedTouchCancel');

    // Native browser touch events are trusted emulated touchscreen input, not physical-device touch.
    const points = world === 'pebble-shore' ? [[.4661,.6446],[.46,.65],[.43,.70]] : world === 'night-pond' ? [[.5,.525],[.675,.55],[.5,.675]] : [[.5,.65],[.4,.62],[.6,.6],[.5,.75]];
    let tapPoint;
    for (const [x,y] of points) {
      await activate(); await page.evaluate(() => window.__waterEdgeQA.pauseAfterNextPointerUp());
      await page.touchscreen.tap(x * viewport.width, y * viewport.height);
      await endBurst('trustedTouchTapPaused');
      if ((await inspect()).events.length) { tapPoint = { x,y }; break; }
    }
    const interactions = (await inspect()).events;
    assert(interactions.length === 1 && interactions[0].world === world, 'Trusted touch did not emit exactly one scene event');
    assert(interactions[0].kind === (world === 'pebble-shore' ? 'pebble-roll' : 'ripple') && interactions[0].strength >= 0 && interactions[0].strength <= 1 && Number.isFinite(interactions[0].position.x) && Number.isFinite(interactions[0].position.z), 'Scene event type or bounds invalid');
    report.checks.touch = { status: 'passed', method: 'Playwright touchscreen.tap, trusted browser emulated touch; not synthetic DOM dispatch or physical hardware', tapPoint, interactions };
    const beforePostInteraction = await inspect();
    await activate();
    await page.waitForFunction(before => window.__waterEdgeQA.inspect().canvases[0].frames >= before + 2,
      beforePostInteraction.canvases[0].frames, { timeout: 30000, polling: 10 });
    await endBurst('postInteractionRendered');
    report.checks.postInteractionRendered.beforeBurst = beforePostInteraction;
    assert(report.checks.postInteractionRendered.before.canvases[0].time > beforePostInteraction.canvases[0].time, 'Post-interaction RAF submissions did not advance simulation time');
    report.checks.postInteractionRendered.note = 'At least two genuine animation submissions after the trusted touch; bounded test burst, not continuous performance evidence.';
    await capture('post-native-input');

    await activate();
    await freeze('static3D', () => page.evaluate(() => window.__waterEdgeQA.setStatic(true))); await drain('static3D-gpuDrain');
    await page.evaluate(() => { window.__waterEdgeQA.setActive(false); window.__waterEdgeQA.setStatic(false); }); await paused();
    await activate();
    await freeze('reducedMotion', () => page.emulateMedia({ reducedMotion: 'reduce' })); await drain('reducedMotion-gpuDrain');
    await page.evaluate(() => window.__waterEdgeQA.setActive(false)); await page.emulateMedia({ reducedMotion: 'no-preference' }); await paused();
    await activate();
    await freeze('syntheticHidden', () => page.evaluate(() => window.__waterEdgeQA.setSyntheticHidden(true))); await drain('syntheticHidden-gpuDrain');
    report.checks.syntheticHidden.method = 'Synthetic document.hidden override+visibilitychange; real background-tab behavior unrun';
    await page.evaluate(() => { window.__waterEdgeQA.setActive(false); window.__waterEdgeQA.setSyntheticHidden(null); }); await paused();
    report.unrun.push('Physical hardware touch; true operating-system background/foreground; sustained GPU throughput; full-app production chrome.');
  } else {
    // Clean no-capture run: no screenshots, toDataURL, readPixels or diagnostic fence before/after teardown.
    const before = await inspect();
    await page.evaluate(() => { window.__waterEdgeQA.markTelemetry('holder-transfer-secondary'); window.__waterEdgeQA.setSecondHolder(true); });
    await page.waitForFunction(() => window.__waterEdgeQA.inspect().canvases[0]?.holder === 'secondary');
    const second = await inspect();
    await page.evaluate(() => { window.__waterEdgeQA.markTelemetry('holder-transfer-primary'); window.__waterEdgeQA.setSecondHolder(false); });
    await page.waitForFunction(() => window.__waterEdgeQA.inspect().canvases[0]?.holder === 'primary');
    const returned = await inspect();
    assert(before.canvases[0].id === second.canvases[0].id && before.canvases[0].id === returned.canvases[0].id && before.diagnostics.created === returned.diagnostics.created && returned.canvases.length === 1, 'Holder transfer created/replaced engine/canvas');
    report.checks.holderTransfer = { status: 'passed', before, second, returned, method: 'Actual production shared-host transfer in harness; native fullscreen/app Escape unrun' };
    report.checks.disposalCycles = [];
    const cycleCount = stage === 'diagnostic' ? 1 : 2;
    for (let cycle = 1; cycle <= cycleCount; cycle++) {
      if (drainBeforeDispose) await drain(`diagnostic-pre-disposal-${cycle}-gpuDrain`);
      const prior = await inspect();
      report.beforeDisposalTelemetry = await page.evaluate(() => window.__waterEdgeQA.inspectTelemetry());
      await save();
      const cycleStart = await page.evaluate(() => performance.now());
      await page.evaluate(() => window.__waterEdgeQA.unmount());
      await page.waitForFunction(() => window.__waterEdgeQA.inspect().diagnostics.live === 0, null, { timeout: 20000, polling: 100 });
      await page.waitForFunction(start => window.__waterEdgeQA.inspectTelemetry().timeline.some(x => x.kind === 'context-loss-observed' && x.atMs >= start), cycleStart, { timeout: 2000 });
      const disposed = await inspect(), telemetry = await page.evaluate(() => window.__waterEdgeQA.inspectTelemetry());
      assert(disposed.diagnostics.created === disposed.diagnostics.disposed && disposed.canvases.length === 0, 'Engine/canvas leaked after grace');
      const event = kind => telemetry.timeline.find(x => x.kind === kind && x.atMs >= cycleStart);
      const removal = event('canvas-detached-observed'), entry = event('dispose-entry'), exit = event('dispose-exit'), lost = event('context-loss-observed');
      const disposal = { cycle, status: 'passed', configuredRetentionMs: 5000, eventualObservationDeadlineMs: 20000, removal, entry, exit, lost,
        removalToDisposeEntryMs: entry.atMs - removal.atMs, disposeSynchronousDurationMs: exit.atMs - entry.atMs,
        removalToContextLossObservationMs: lost.atMs - removal.atMs,
        claim: `${drainBeforeDispose ? 'GPU-drained no-capture diagnostic' : 'Clean no-capture cycle'} reached zero engine/canvas counters and observed context loss within recorded elapsed time; not proof of physical VRAM reclamation or exactly-five-second GPU cleanup.`, disposed };
      disposal.removalToContextLossObservationMs = lost.atMs - removal.atMs;
      disposal.heartbeat = { samples: telemetry.heartbeats.filter(item => item.atMs >= removal.atMs && item.atMs <= lost.atMs + 100),
        note: 'Event-loop lag is separately recorded; a low configured grace does not establish responsive disposal.' };
      disposal.heartbeat.maxLagMs = Math.max(0, ...disposal.heartbeat.samples.map(item => item.lagMs));
      assert(disposal.heartbeat.samples.length > 0 && Number.isFinite(disposal.heartbeat.maxLagMs), 'Missing event-loop responsiveness measurements during removal/disposal');
      assert(disposal.removalToContextLossObservationMs <= 20000, 'Actual recorded removal-to-context-loss duration exceeded the fixed20s gate');
      await page.evaluate(() => window.__waterEdgeQA.mount()); await ready();
      const remounted = await inspect(); assert(remounted.canvases.length === 1 && remounted.diagnostics.live === 1 && remounted.canvases[0].id !== prior.canvases[0].id, 'Remount failed to create exactly one fresh engine');
      report.checks.disposalCycles.push({ ...disposal, remounted }); await save();
    }
    report.unrun.push('Lifecycle rendering/visual correctness deliberately not inferred from no-capture test.');
  }
  report.final = await inspect();
  report.telemetry = await page.evaluate(() => window.__waterEdgeQA.inspectTelemetry());
  assert(report.errors.length === 0, 'Console/shader/page errors');
  if (stage === 'behavior') assert(report.telemetry.input.some(x => x.kind === 'pointerdown' && x.pointerType === 'touch' && x.trusted), 'No trusted touchscreen pointer evidence');
  report.status = 'passed';
} catch (error) {
  report.status = tainted ? 'blocked' : 'failed'; report.failure = String(error.stack || error); report.tainted = tainted;
  console.error(`${stem}: ${report.status}: ${error.message}`);
  // Do not schedule dependent readbacks after timeout. Best-effort JS evidence is independently bounded.
  if (!tainted && page) {
    report.final = await inspect().catch(() => null);
    report.telemetry = await page.evaluate(() => window.__waterEdgeQA?.inspectTelemetry()).catch(() => null);
  }
  report.unrun.push('Every subsequent dependent check after this failure is unrun.'); process.exitCode = 1;
} finally {
  report.finishedAt = new Date().toISOString(); await save();
  await browser?.close().catch(() => {});
  if (server) await new Promise(resolve => server.close(resolve));
  console.log(path.join(output, `${stem}.json`));
}
