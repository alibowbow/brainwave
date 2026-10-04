import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import http from 'node:http';

const qa = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(qa, '../../../..');
const evidence = path.join(qa, 'evidence');
const args = process.argv.slice(2);
const option = (name, fallback) => args.find(a => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=') ?? fallback;
const sceneOption = option('scene', 'all');
const scenes = sceneOption === 'all' ? ['temple', 'scops', 'rural'] : [sceneOption];
const screenshotsOnly = args.includes('--screenshots-only');
let base = option('url', null);
const executablePath = option('browser', process.env.CHROMIUM_PATH || '/tmp/cosmic-browser-bin/chromium');
const hash = value => createHash('sha256').update(value).digest('hex');
const relative = file => path.relative(repo, file).split(path.sep).join('/');
const results = { generatedAt: new Date().toISOString(), mode: screenshotsOnly ? 'screenshots-only' : 'full', renderer: 'Chromium headless; ANGLE SwiftShader software WebGL', hardwareClaim: 'Viewport tests only. No physical Fold, device FPS, battery, or thermal claims.', visibilityScope: 'The mandatory hidden-state test uses a labelled synthetic visibilitychange; actual tab visibility is separately reported if observable.', browserExecutable: executablePath, repositoryHead: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repo, encoding: 'utf8' }).trim(), source: {}, bundle: {}, screenshots: [], worlds: {}, errors: [] };

async function filesUnder(directory) {
  let entries;
  try { entries = await fs.readdir(directory, { withFileTypes: true }); } catch { return []; }
  const output = [];
  for (const item of entries) {
    if (['dist', 'evidence', 'node_modules', '.git'].includes(item.name)) continue;
    const file = path.join(directory, item.name);
    if (item.isDirectory()) output.push(...await filesUnder(file));
    else output.push(file);
  }
  return output;
}
async function manifest(files) {
  const list = [];
  for (const file of [...files].sort()) list.push({ path: relative(file), sha256: hash(await fs.readFile(file)) });
  return { sha256: hash(JSON.stringify(list)), files: list };
}
async function distFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async item => item.isDirectory() ? distFiles(path.join(directory, item.name)) : [path.join(directory, item.name)]))).flat();
}

await fs.mkdir(evidence, { recursive: true });
const sourceFiles = (await filesUnder(path.dirname(qa))).filter(file => /\.(tsx?|css|mjs|html)$/.test(file));
sourceFiles.push(...['components/useSceneMotion.ts', 'components/liveScene/liveSceneHost.ts', 'components/liveScene/look.ts'].map(file => path.join(repo, file)));
results.source = await manifest(sourceFiles);
try { results.bundle = await manifest(await distFiles(path.join(qa, 'dist'))); } catch { results.bundle = { error: 'No built QA bundle. Run vite build with the owned qa/vite.config.ts first.' }; }
// Keep the standard static server and browser in the same executor network namespace.
// A separately launched preview may be unreachable across isolated exec invocations.
let server;
if (!base) {
  const output = path.join(qa, 'dist');
  const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json' };
  server = http.createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      const file = path.resolve(output, `.${pathname}`);
      if (!file.startsWith(`${output}${path.sep}`)) { response.writeHead(403).end(); return; }
      const content = await fs.readFile(file);
      response.writeHead(200, { 'content-type': mime[path.extname(file)] || 'application/octet-stream' }).end(content);
    } catch { response.writeHead(404).end('Not found'); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
}
const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
results.browserVersion = browser.version();
const context = await browser.newContext({ viewport: { width: 1365, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'no-preference', hasTouch: true });
await context.addInitScript(() => {
  window.__qaAudioContexts = 0;
  for (const key of ['AudioContext', 'webkitAudioContext']) {
    if (typeof window[key] === 'function') {
      const Base = window[key];
      window[key] = class extends Base { constructor(...args) { super(...args); window.__qaAudioContexts++; } };
    }
  }
  const listeners = new WeakMap();
  const originalAdd = EventTarget.prototype.addEventListener;
  const originalRemove = EventTarget.prototype.removeEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'pointerdown' && this instanceof Element && this.matches('[data-scene-surface]')) {
      const set = listeners.get(this) || new Set(); set.add(listener); listeners.set(this, set);
    }
    return originalAdd.call(this, type, listener, options);
  };
  EventTarget.prototype.removeEventListener = function(type, listener, options) {
    if (type === 'pointerdown' && this instanceof Element && this.matches('[data-scene-surface]')) listeners.get(this)?.delete(listener);
    return originalRemove.call(this, type, listener, options);
  };
  window.__qaPointerCounts = () => Array.from(document.querySelectorAll('[data-scene-surface]')).map(element => ({ holder: element.dataset.holder, pointerdown: listeners.get(element)?.size || 0 }));
});
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
page.setDefaultTimeout(120000);
page.on('pageerror', error => { results.errors.push({ type: 'pageerror', text: error.message }); process.stdout.write(`PAGE ERROR ${error.message}\n`); });
page.on('console', message => { if (message.type() === 'error') { results.errors.push({ type: 'console', text: message.text() }); process.stdout.write(`CONSOLE ERROR ${message.text()}\n`); } });
page.on('requestfailed', request => results.errors.push({ type: 'requestfailed', url: request.url(), text: request.failure()?.errorText }));
const snap = () => page.evaluate(() => window.koreanQA.snapshot());
const api = (method, value) => page.evaluate(({ method, value }) => window.koreanQA[method](value), { method, value });
const ready = async () => {
  await page.waitForFunction(() => document.querySelector('.korean-world[data-state="ready"],.korean-world[data-state="failed"]'));
  const state = await snap();
  assert(state.surfaces.every(surface => surface.state === 'ready'), `World failed to initialize: ${JSON.stringify(state)}`);
  await page.waitForFunction(() => Number(document.querySelector('canvas')?.dataset.frames) > 0);
};
const running = async () => page.waitForFunction(() => document.querySelector('canvas')?.dataset.running === 'true');
const stopped = async () => page.waitForFunction(() => document.querySelector('canvas')?.dataset.running === 'false');
const pixelHash = async () => hash(await page.locator('canvas').screenshot({ timeout: 120000 }));
function assert(check, message) { if (!check) throw new Error(message); }
async function stable(label) {
  await stopped();
  const before = await snap(), first = await pixelHash();
  await page.waitForTimeout(280);
  const after = await snap(), second = await pixelHash();
  const result = { beforeTime: before.canvas?.time, afterTime: after.canvas?.time, beforeFrames: before.canvas?.frames, afterFrames: after.canvas?.frames, pixelsIdentical: first === second, pass: before.canvas?.time === after.canvas?.time && before.canvas?.frames === after.canvas?.frames && first === second };
  assert(result.pass, `${label}: time, render frames, or pixels changed while stopped`);
  return result;
}
async function navigate(scene, extra = '') {
  await page.goto(`${base}/components/immersiveWorlds/koreanPlaces/qa/index.html?scene=${scene}&capture=1${extra}`, { waitUntil: 'networkidle', timeout: 120000 });
  process.stdout.write(`Loaded ${scene}; waiting for scene ready\n`);
  await ready();
  process.stdout.write(`Ready ${scene}\n`);
}
async function capture(scene, name, viewport) {
  await page.setViewportSize(viewport);
  await ready();
  await page.waitForTimeout(150);
  const file = path.join(evidence, `${scene}-${name}.png`);
  const bytes = await page.locator('canvas').screenshot({ path: file, timeout: 120000 });
  const entry = { scene, viewport: name, width: viewport.width, height: viewport.height, path: relative(file), sha256: hash(bytes), bytes: bytes.length, state: await snap() };
  results.screenshots.push(entry);
  process.stdout.write(`Captured ${scene}-${name}.png (${bytes.length} bytes)\n`);
}
async function testInteraction(scene) {
  await api('setChrome', true);
  await page.waitForSelector('[data-qa-chrome]');
  await api('clearEvents');
  const before = await snap();
  // Original content is raycast through genuine mouse input; hints are only search order.
  const hints = scene === 'scops' ? [[.75, .75], [.70, .77], [.77, .70]] : scene === 'rural' ? [[.2, .85], [.3, .8], [.7, .85]] : [[.26, .45], [.3, .52], [.73, .45]];
  const candidates = [...hints];
  for (const y of [.3, .4, .5, .6, .7, .8, .9]) for (const x of [.1, .2, .3, .4, .5, .6, .7, .8, .9]) candidates.push([x, y]);
  let hit = null;
  for (const [x, y] of candidates) {
    await page.mouse.click(Math.round(x * 1365), Math.round(y * 900));
    const state = await snap();
    if (state.events.length) { hit = { x: Math.round(x * 1365), y: Math.round(y * 900), event: state.events[0] }; break; }
  }
  assert(hit, `${scene}: no tactile object reacted to the raycast tap search`);
  assert(hit.event.strength >= 0 && hit.event.strength <= 1, `${scene}: event strength is not bounded [0,1]`);
  assert(hit.event.position.length === 3 && hit.event.position.every(Number.isFinite), `${scene}: invalid event position`);
  const hitLayer = await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.hasAttribute('data-scene-drag'), hit);
  assert(hitLayer, `${scene}: successful tap did not land on the full-cover sibling chrome`);
  await page.mouse.click(hit.x, hit.y);
  const duplicate = await snap();
  assert(duplicate.events.length === 1, `${scene}: immediate repeated tap bypassed cooldown`);
  // Let the real scene cooldown expire, then test cancellation over the KNOWN hit target.
  // Otherwise a gesture over empty space could appear to pass despite broken cancellation.
  await page.waitForFunction(time => Number(document.querySelector('canvas')?.dataset.time) > time + .8, Number(duplicate.canvas.time));
  await api('clearEvents');
  await page.evaluate(({ x, y }) => {
    const surface = document.querySelector('[data-holder="primary"] [data-scene-drag]');
    surface.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 42, isPrimary: true, button: 0, clientX: x, clientY: y }));
    window.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true, pointerId: 42, isPrimary: true, button: 0, clientX: x, clientY: y }));
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 42, isPrimary: true, button: 0, clientX: x, clientY: y }));
  }, hit);
  const cancel = await snap();
  assert(cancel.events.length === 0, `${scene}: cancelled pointer generated a tap event over a known tactile target`);
  await page.evaluate(({ x, y }) => {
    const surface = document.querySelector('[data-holder="primary"] [data-scene-drag]');
    surface.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 43, isPrimary: true, button: 0, clientX: x, clientY: y }));
    window.dispatchEvent(new Event('blur'));
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 43, isPrimary: true, button: 0, clientX: x, clientY: y }));
  }, hit);
  const blur = await snap();
  assert(blur.events.length === 0, `${scene}: window blur did not cancel gesture over a known tactile target`);
  await page.mouse.move(hit.x, hit.y); await page.mouse.down();
  await page.mouse.move(hit.x + 110, hit.y - 35, { steps: 5 });
  const duringDrag = await snap();
  assert(duringDrag.surfaces.some(surface => surface.look === 'drag'), `${scene}: visible sibling chrome drag never reached the world look handler`);
  await page.mouse.move(hit.x, hit.y, { steps: 5 }); await page.mouse.up();
  const drag = await snap();
  assert(drag.events.length === 0, `${scene}: drag returning to the known tactile target generated a tap event`);
  const exclusions = [];
  for (const kind of ['button', 'input', 'rolebutton']) {
    await api('setProbe', { x: hit.x, y: hit.y, kind });
    await page.waitForSelector(`[data-qa-probe="${kind}"]`);
    const start = await snap();
    if (kind === 'input') {
      await page.mouse.move(hit.x, hit.y); await page.mouse.down(); await page.mouse.move(hit.x + 22, hit.y, { steps: 3 });
      const movingControl = await snap();
      assert(!movingControl.surfaces.some(surface => surface.look === 'drag'), `${scene}: range input gesture leaked into camera look`);
      await page.mouse.up();
    } else await page.mouse.click(hit.x, hit.y);
    const end = await snap();
    const passed = end.events.length === 0 && end.chromeActions.length > start.chromeActions.length;
    assert(passed, `${scene}: ${kind} over a known tactile target leaked a world event or did not receive its own input`);
    exclusions.push({ kind, worldEvents: end.events.length, uiActions: end.chromeActions.length - start.chromeActions.length, pass: passed });
  }
  await api('setProbe', null); await page.waitForFunction(() => !document.querySelector('[data-qa-probe]'));
  return { pass: true, fixture: 'Real world component under Player/Immersive-style sibling data-scene-drag overlay; not the shared app chrome components themselves', chromeVisible: before.chromeVisible, raycastTapHitSiblingChrome: hitLayer, cancellationTarget: 'Previously verified raycast target, after cooldown expired', dragReachedLookHandler: true, dragNotTap: drag.events.length === 0, syntheticPointerCancelNotTap: cancel.events.length === 0, syntheticBlurNotTap: blur.events.length === 0, interactiveChromeExclusions: exclusions, tap: hit, immediateTapBounded: duplicate.events.length === 1, initialCanvas: before.canvasIdentity };
}
async function testBrowserTouch(scene, hit) {
  const policy = await page.evaluate(() => {
    const surface = document.querySelector('[data-holder="primary"][data-scene-surface]');
    const normal = getComputedStyle(surface).touchAction;
    const original = surface.style.touchAction;
    surface.style.touchAction = 'pan-y';
    const inlinePanY = getComputedStyle(surface).touchAction;
    surface.style.touchAction = original;
    return { normal, inlinePanY, restored: getComputedStyle(surface).touchAction };
  });
  assert(policy.normal === 'none' && policy.inlinePanY === 'pan-y' && policy.restored === 'none', `${scene}: ancestor touch policy or inline override is wrong`);
  await api('clearEvents');
  await page.evaluate(() => {
    window.__qaTrustedTouchCancels = [];
    window.addEventListener('pointercancel', event => { if (event.isTrusted && event.pointerType === 'touch') window.__qaTrustedTouchCancels.push({ type: event.pointerType, trusted: event.isTrusted }); }, { once: true });
  });
  const point = (x, y) => ({ x, y, id: 71, radiusX: 5, radiusY: 5, force: 1 });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point(hit.x, hit.y)] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [point(hit.x + 32, hit.y - 14)] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [point(hit.x + 88, hit.y - 28)] });
  const moving = await snap();
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  const ended = await snap();
  const canceled = await page.evaluate(() => window.__qaTrustedTouchCancels);
  const pass = moving.surfaces.some(surface => surface.look === 'drag') && ended.events.length === 0 && canceled.length === 0;
  assert(pass, `${scene}: browser touch drag failed to reach look, emitted a tap, or triggered native pointercancel`);
  return { pass, method: 'Chromium CDP Input.dispatchTouchEvent; trusted browser touch input, not synthetic DOM dispatch and not physical-device hardware', chromeVisible: true, policy, dragReachedLookHandler: true, worldEvents: ended.events.length, trustedPointerCancels: canceled.length };
}
async function lifecycle(scene) {
  const record = {};
  await page.setViewportSize({ width: 1365, height: 900 });
  await api('setActive', false); await stopped();
  const first = await snap(), firstPixels = await pixelHash();
  await api('setActive', true); await running();
  await page.waitForFunction(({ frames, time }) => {
    const canvas = document.querySelector('canvas');
    return Number(canvas?.dataset.frames) >= frames + 3 && Number(canvas?.dataset.time) > time;
  }, { frames: Number(first.canvas.frames), time: Number(first.canvas.time) });
  await api('setActive', false); await stopped();
  const second = await snap(), secondPixels = await pixelHash();
  record.motion = { method: 'Compare two paused screenshot endpoints separated by at least three genuine animated frames', pass: Number(second.canvas.time) > Number(first.canvas.time) && secondPixels !== firstPixels, beforeTime: first.canvas.time, afterTime: second.canvas.time, beforeFrames: first.canvas.frames, afterFrames: second.canvas.frames, pixelsChanged: firstPixels !== secondPixels };
  assert(record.motion.pass, `${scene}: motion did not advance time and pixels`);
  await api('setActive', false); record.pause = await stable(`${scene} pause`);
  await api('setActive', true); await running();
  record.interaction = await testInteraction(scene);
  record.browserTouch = await testBrowserTouch(scene, record.interaction.tap);
  await api('setActive', false); await stopped();
  await capture(scene, 'chrome', { width: 1365, height: 900 });
  await api('setActive', true); await running();
  const identity = (await snap()).canvasIdentity;
  const transports = [];
  for (let cycle = 0; cycle < 3; cycle++) {
    await api('clearEvents');
    await api('setSecond', true);
    await page.waitForFunction(() => window.koreanQA.snapshot().canvasHolder === 'secondary');
    const secondary = await snap();
    assert(secondary.canvasCount === 1 && secondary.canvasIdentity === identity, `${scene}: second holder did not reuse canvas`);
    const listeners = await page.evaluate(() => window.__qaPointerCounts());
    assert(listeners.length === 2 && listeners.every(item => item.pointerdown === 1), `${scene}: missing or duplicate scene-surface pointerdown listeners during transport`);
    await page.evaluate(({ x, y }) => {
      const covered = document.querySelector('[data-holder="primary"] [data-scene-drag]');
      covered.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 89, isPrimary: true, button: 0, clientX: x, clientY: y }));
      window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 89, isPrimary: true, button: 0, clientX: x, clientY: y }));
    }, record.interaction.tap);
    assert((await snap()).events.length === 0, `${scene}: covered primary holder handled a tap`);
    await api('setSecond', false);
    await page.waitForFunction(() => window.koreanQA.snapshot().canvasHolder === 'primary');
    const returned = await snap();
    const returnedListeners = await page.evaluate(() => window.__qaPointerCounts());
    const passed = returned.canvasIdentity === identity && returned.canvasCount === 1 && returnedListeners.length === 1 && returnedListeners[0].pointerdown === 1;
    assert(passed, `${scene}: repeated transport failed canvas reuse or pointer handler cleanup`);
    transports.push({ cycle: cycle + 1, secondaryIdentity: secondary.canvasIdentity, returnedIdentity: returned.canvasIdentity, listeners, returnedListeners, coveredHolderInert: true, pass: passed });
  }
  record.secondHolder = { pass: true, originalIdentity: identity, cycles: transports };
  await page.emulateMedia({ reducedMotion: 'reduce' }); record.reducedMotion = await stable(`${scene} reduced motion`);
  await page.emulateMedia({ reducedMotion: 'no-preference' }); await running();
  await api('setStatic', true); record.static3D = await stable(`${scene} static3D`);
  await api('setStatic', false); await running();
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  record.syntheticHidden = { method: 'Own-property overrides of document.hidden/visibilityState plus visibilitychange, not actual tab hiding', ...await stable(`${scene} synthetic hidden`) };
  await page.evaluate(() => { delete document.hidden; delete document.visibilityState; document.dispatchEvent(new Event('visibilitychange')); }); await running();
  if (scene === 'scops') {
    const beforeCall = await snap(); await api('dispatchScops'); await page.waitForTimeout(150); const afterCall = await snap();
    record.externalAudioEvent = { pass: beforeCall.subscribers === 1 && afterCall.audioDispatches === beforeCall.audioDispatches + 1, event: 'scops', subscribers: beforeCall.subscribers, dispatches: afterCall.audioDispatches, limitation: 'Checks existing-engine event subscription and dispatch. It does not claim actual sound playback quality or visually classify the tiny owl animation.' };
    assert(record.externalAudioEvent.pass, 'scops event subscription missing');
  }
  const rapidIds = [];
  for (let index = 0; index < 3; index++) {
    await api('setMounted', false); await page.waitForFunction(() => !document.querySelector('canvas')); await page.waitForTimeout(90);
    await api('setMounted', true); await ready(); rapidIds.push((await snap()).canvasIdentity);
  }
  assert(rapidIds.every(id => id === identity), `${scene}: rapid remount did not retain the one canvas`);
  await api('setMounted', false); await page.waitForFunction(() => !document.querySelector('canvas')); await page.waitForTimeout(5400);
  await api('setMounted', true); await ready(); const rebuilt = await snap();
  record.mountUnmount = { pass: rebuilt.canvasCount === 1 && rebuilt.canvasIdentity !== identity, rapidRemountCount: rapidIds.length, rapidIdentities: rapidIds, graceWindowWaitMs: 5400, rebuiltIdentity: rebuilt.canvasIdentity, newCanvasAfterDisposal: rebuilt.canvasIdentity !== identity, limitation: 'Observed detach/reuse/new canvas after the host disposal timer; no direct GPU memory profiler was available.' };
  assert(record.mountUnmount.pass, `${scene}: delayed remount did not rebuild a unique canvas`);
  record.createdAudioContexts = await page.evaluate(() => window.__qaAudioContexts);
  assert(record.createdAudioContexts === 0, `${scene}: created an independent audio context`);
  await navigate(scene, '&static=1');
  record.staticFirstFrame = await stable(`${scene} initial static3D`);
  record.metrics = (await snap()).canvas;
  return record;
}

try {
  for (const scene of scenes) {
    process.stdout.write(`Testing ${scene}\n`);
    await page.setViewportSize({ width: 1365, height: 900 });
    await navigate(scene, '&active=0');
    await stopped();
    await capture(scene, 'desktop', { width: 1365, height: 900 });
    await capture(scene, 'portrait', { width: 390, height: 844 });
    await capture(scene, 'fold', { width: 960, height: 700 });
    results.worlds[scene] = screenshotsOnly ? { screenshotsCaptured: true } : await lifecycle(scene);
  }
  if (!screenshotsOnly) {
    const other = await context.newPage(); await other.goto('about:blank'); await other.bringToFront(); await page.waitForTimeout(150);
    const observed = await page.evaluate(() => ({ hidden: document.hidden, visibilityState: document.visibilityState }));
    results.actualTabVisibility = { ...observed, tested: observed.hidden, note: observed.hidden ? 'Original page became hidden after a separate page was brought forward.' : 'Headless Chromium did not hide the original page; actual tab-hide behavior remains unverified.' };
    await other.close();
  }
  results.pass = results.errors.length === 0;
} catch (error) {
  results.pass = false;
  results.failure = error.stack;
  try { await page.screenshot({ path: path.join(evidence, 'debug-failure.png') }); results.failureState = await snap(); } catch {}
  process.exitCode = 1;
} finally {
  const sourceAfter = await manifest(sourceFiles);
  const bundleAfter = await manifest(await distFiles(path.join(qa, 'dist')));
  results.integrity = { sourceUnchangedDuringRun: sourceAfter.sha256 === results.source.sha256, bundleUnchangedDuringRun: bundleAfter.sha256 === results.bundle.sha256 };
  if (!results.integrity.sourceUnchangedDuringRun || !results.integrity.bundleUnchangedDuringRun) {
    results.pass = false;
    results.errors.push({ type: 'integrity', text: 'Source or built harness changed during capture; rebuild and repeat for final evidence.' });
  }
  if (!results.pass) process.exitCode = 1;
  results.finishedAt = new Date().toISOString();
  const filename = screenshotsOnly ? `screenshots-${sceneOption}.json` : `verification-${sceneOption}.json`;
  await fs.writeFile(path.join(evidence, filename), `${JSON.stringify(results, null, 2)}\n`);
  await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
  process.stdout.write(`Evidence: ${relative(path.join(evidence, filename))}; pass=${results.pass}\n`);
}
