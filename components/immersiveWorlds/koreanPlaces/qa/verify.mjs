import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import http from 'node:http';

const qa = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(qa, '../../../..');
const args = process.argv.slice(2);
const option = (name, fallback) => args.find(a => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=') ?? fallback;
const environmentMode = option('environment', 'normal');
if (!['normal', 'forced-byte'].includes(environmentMode)) throw new Error('Environment mode must be normal or forced-byte.');
const evidence = path.resolve(qa, option('output', `evidence/environment-${environmentMode}`));
if (!evidence.startsWith(`${path.join(qa, 'evidence')}${path.sep}`)) throw new Error('Follow-up output must be a subdirectory of qa/evidence, preserving original evidence.');
const sceneOption = option('scene', 'all');
const scenes = sceneOption === 'all' ? ['scops', 'temple'] : [sceneOption];
if (scenes.some(scene => !['temple', 'scops', 'rural'].includes(scene))) throw new Error('Unknown scene option.');
const screenshotsOnly = args.includes('--screenshots-only');
let base = option('url', null);
const executablePath = option('browser', process.env.CHROMIUM_PATH || '/tmp/cosmic-browser-bin/chromium');
const hash = value => createHash('sha256').update(value).digest('hex');
const relative = file => path.relative(repo, file).split(path.sep).join('/');
const results = { generatedAt: new Date().toISOString(), mode: screenshotsOnly ? 'screenshots-only' : 'full', renderer: 'Chromium headless; ANGLE SwiftShader software WebGL', hardwareClaim: 'Viewport tests only. No physical Fold, device FPS, battery, or thermal claims.', visibilityScope: 'The mandatory hidden-state test uses a labelled synthetic visibilitychange; actual tab visibility is separately reported if observable.', browserExecutable: executablePath, repositoryHead: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repo, encoding: 'utf8' }).trim(), source: {}, bundle: {}, screenshots: [], worlds: {}, errors: [] };
results.environmentMode = environmentMode;

const ruralBaseline = '174aa43bffa4ead7723dfc7c4c6f9a86e35f8600';
const ruralPreservationPaths = ['scenes/rural.ts', 'RuralSummerNightWorld.tsx', ...['desktop', 'portrait', 'fold', 'chrome'].map(view => `qa/evidence/final/rural-${view}.png`)].map(file => `components/immersiveWorlds/koreanPlaces/${file}`);
results.ruralPreservation = { baseline: ruralBaseline, method: 'Exact git-baseline/current file bytes; this record is not a new rural render or a performance claim.', files: await Promise.all(ruralPreservationPaths.map(async file => {
  const baselineSha256 = hash(execFileSync('git', ['show', `${ruralBaseline}:${file}`], { cwd: repo, maxBuffer: 8 * 1024 * 1024 }));
  const currentSha256 = hash(await fs.readFile(path.join(repo, file)));
  return { path: file, baselineSha256, currentSha256, unchanged: baselineSha256 === currentSha256 };
})) };
results.ruralPreservation.pass = results.ruralPreservation.files.every(file => file.unchanged);
if (!results.ruralPreservation.pass) throw new Error('Approved rural source or PNG bytes have changed.');

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
const dependencySourceFiles = ['node_modules/three/package.json', 'node_modules/three/src/extras/PMREMGenerator.js', 'node_modules/three/src/renderers/webgl/WebGLEnvironments.js'].map(file => path.join(repo, file));
const threePackage = JSON.parse(await fs.readFile(dependencySourceFiles[0], 'utf8'));
results.dependencySource = { package: threePackage.name, version: threePackage.version, ...await manifest(dependencySourceFiles) };
if (results.dependencySource.package !== 'three' || results.dependencySource.version !== '0.186.1') throw new Error('Environment QA requires the reviewed installed Three 0.186.1 allocation contract.');
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
  window.__qaLastPointer = null;
  window.__qaPointerCaptureEvents = [];
  window.addEventListener('pointerdown', event => { if (event.isTrusted) window.__qaLastPointer = { id: event.pointerId, type: event.pointerType }; }, true);
  for (const type of ['gotpointercapture', 'lostpointercapture']) window.addEventListener(type, event => {
    window.__qaPointerCaptureEvents.push({ type, pointerId: event.pointerId, pointerType: event.pointerType, trusted: event.isTrusted, holder: event.target instanceof Element ? event.target.closest('[data-holder]')?.getAttribute('data-holder') : null, atMs: performance.now() });
  }, true);
});
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
page.setDefaultTimeout(30000);
page.on('pageerror', error => { results.errors.push({ type: 'pageerror', text: error.message }); process.stdout.write(`PAGE ERROR ${error.message}\n`); });
page.on('console', message => { if (message.type() === 'error') { results.errors.push({ type: 'console', text: message.text() }); process.stdout.write(`CONSOLE ERROR ${message.text()}\n`); } });
page.on('requestfailed', request => results.errors.push({ type: 'requestfailed', url: request.url(), text: request.failure()?.errorText }));
function bounded(promise, label, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} exceeded ${timeout}ms; possible software GPU backpressure`)), timeout);
    promise.then(value => { clearTimeout(timer); resolve(value); }, error => { clearTimeout(timer); reject(error); });
  });
}
const evaluate = (callback, argument) => bounded(page.evaluate(callback, argument), 'page.evaluate');
const lifecycleViewport = { width: 683, height: 450 };
results.lifecycleViewport = lifecycleViewport;
results.lifecycleRendering = '683x450 genuine native-RAF motion probe, then QA-only held scene RAF for input/lifecycle. Controlled steps use real native RAF timestamps after >=85ms real wait and real WebGL render + gl.finish. No production frame cap, DPR change, fabricated dt, or direct world-time mutation. Full-size scene screenshots remain unchanged.';
const phase = (scene, label) => process.stdout.write(`Lifecycle ${scene}: ${label}\n`);
const snap = () => evaluate(() => window.koreanQA.snapshot());
const api = (method, value) => evaluate(({ method, value }) => window.koreanQA[method](value), { method, value });
const captureState = () => evaluate(() => ({
  pointer: window.__qaLastPointer,
  holders: Array.from(document.querySelectorAll('[data-scene-surface]')).filter(surface => window.__qaLastPointer && surface.hasPointerCapture(window.__qaLastPointer.id)).map(surface => surface.dataset.holder),
  events: [...window.__qaPointerCaptureEvents],
}));
const ready = async () => {
  await page.waitForFunction(() => document.querySelector('.korean-world[data-state="ready"],.korean-world[data-state="failed"]'));
  const state = await snap();
  assert(state.surfaces.every(surface => surface.state === 'ready'), `World failed to initialize: ${JSON.stringify(state)}`);
  await page.waitForFunction(() => Number(document.querySelector('canvas')?.dataset.frames) > 0);
};
const running = async () => page.waitForFunction(() => document.querySelector('canvas')?.dataset.running === 'true');
const stopped = async () => page.waitForFunction(() => document.querySelector('canvas')?.dataset.running === 'false');
async function canvasImage(options = {}) {
  await page.waitForFunction(() => {
    const canvas = document.querySelector('canvas');
    const ratio = Math.min(2, Math.max(1, devicePixelRatio));
    return canvas?.width === Math.round(innerWidth * ratio) && canvas?.height === Math.round(innerHeight * ratio);
  });
  const bounds = await evaluate(() => {
    const canvas = document.querySelector('canvas');
    const box = canvas.getBoundingClientRect();
    return { x: box.x, y: box.y, width: box.width, height: box.height, backWidth: canvas.width, backHeight: canvas.height, viewportWidth: innerWidth, viewportHeight: innerHeight, ratio: Math.min(2, Math.max(1, devicePixelRatio)) };
  });
  assert(Math.abs(bounds.x) < .1 && Math.abs(bounds.y) < .1 && bounds.width === bounds.viewportWidth && bounds.height === bounds.viewportHeight, 'Scene canvas does not fill the expected viewport');
  assert(bounds.backWidth === Math.round(bounds.width * bounds.ratio) && bounds.backHeight === Math.round(bounds.height * bounds.ratio), 'Canvas backbuffer does not match the resized viewport');
  // Drain the actual WebGL work before asking Chromium for its composited
  // surface. Direct CDP avoids Playwright's temporary screenshot stylesheet /
  // layout preparation while the deliberately paused scene has no renderer RAF.
  // This captures the real viewport, including chrome; no scene redraw or pixel
  // substitution is introduced, and the dimensions/DPR assertions above remain.
  await evaluate(() => window.sceneQAScheduler.flush());
  const captured = await bounded(cdp.send('Page.captureScreenshot', {
    format: 'png', fromSurface: true, captureBeyondViewport: false,
    clip: { x: 0, y: 0, width: bounds.width, height: bounds.height, scale: 1 },
  }), 'Chromium composited screenshot', 60000);
  const bytes = Buffer.from(captured.data, 'base64');
  if (options.path) await fs.writeFile(options.path, bytes);
  return bytes;
}
const pixelHash = async () => hash(await canvasImage());
function assert(check, message) { if (!check) throw new Error(message); }
async function checkEnvironment(scene, label) {
  const observation = await api('inspectEnvironment', label);
  assert(!observation.contextLost && observation.framebufferStatus === 36053 && observation.errors.length === 0, `${scene} ${label}: real rendered context has an incomplete framebuffer or GL errors`);
  const environment = (await snap()).environment;
  if (scene === 'rural') {
    assert(environment.audits.length === 0, 'Rural unexpectedly used the new environment helper');
    return { pass: true, observation, untouchedEnvironment: true };
  }
  const generations = environment.audits.filter(audit => audit.scope === 'scene' && audit.event.phase === 'generation');
  assert(generations.length > 0, `${scene} ${label}: no real scene environment generation audit was recorded`);
  const audit = generations[generations.length - 1].event;
  assert(audit.success && audit.restored && JSON.stringify(audit.stateBefore) === JSON.stringify(audit.stateAfter), `${scene} ${label}: generation failed or did not restore renderer state`);
  assert(audit.glErrorsBefore.length === 0 && audit.generationErrors.length === 0, `${scene} ${label}: environment generation reported GL errors`);
  assert(audit.forceByte === (environmentMode === 'forced-byte'), `${scene} ${label}: requested environment policy did not reach generation`);
  const chosen = audit.attempts.find(attempt => attempt.success && !attempt.discarded && attempt.type === audit.selectedType);
  assert(chosen && chosen.targets.length >= 2 && chosen.targets.some(target => target.role === 'output') && chosen.targets.some(target => target.role === 'ping-pong'), `${scene} ${label}: output and ping-pong target evidence is incomplete`);
  for (const target of chosen.targets) {
    assert(target.status === 36053 && target.errors.length === 0 && target.restored && JSON.stringify(target.stateBefore) === JSON.stringify(target.stateAfter), `${scene} ${label}: ${target.role} target is incomplete, erroneous or not restored`);
    assert(target.type === audit.selectedType && target.format === 'RGBA' && target.internalFormat === (audit.selectedType === 'half-float' ? 'RGBA16F' : 'RGBA8'), `${scene} ${label}: actual selected target type/format mismatch`);
  }
  if (environmentMode === 'forced-byte') assert(audit.selectedType === 'unsigned-byte' && audit.attempts.every(attempt => attempt.type === 'unsigned-byte'), `${scene} ${label}: forced byte mode allocated a half-float attempt`);
  else if (audit.extensions.colorBufferFloat || audit.extensions.colorBufferHalfFloat) assert(audit.attempts[0].type === 'half-float', `${scene} ${label}: normal supported path skipped its half-float FBO check`);
  else assert(audit.selectedType === 'unsigned-byte' && audit.attempts.every(attempt => attempt.type === 'unsigned-byte'), `${scene} ${label}: unsupported half-float allocation was attempted`);
  assert(observation.sceneEnvironmentType === (audit.selectedType === 'half-float' ? 1016 : 1009) && observation.sceneEnvironmentMapping === 306 && audit.environmentMapping === 306, `${scene} ${label}: actual scene environment texture is not the checked CubeUV result`);
  return { pass: true, observation, generationCount: generations.length, audit };
}
async function stable(label) {
  await stopped();
  const scheduler = await evaluate(() => window.sceneQAScheduler.snapshot());
  assert(scheduler.pendingCallbacks === 0, `${label}: stopped engine retained a scheduled RAF callback`);
  const before = await snap(), first = await pixelHash();
  await page.waitForTimeout(280);
  const after = await snap(), second = await pixelHash();
  const result = { beforeTime: before.canvas?.time, afterTime: after.canvas?.time, beforeFrames: before.canvas?.frames, afterFrames: after.canvas?.frames, pendingSceneRAF: scheduler.pendingCallbacks, pixelsIdentical: first === second, pass: before.canvas?.time === after.canvas?.time && before.canvas?.frames === after.canvas?.frames && first === second };
  assert(result.pass, `${label}: time, render frames, or pixels changed while stopped`);
  return result;
}
async function navigate(scene, extra = '') {
  await page.goto(`${base}/components/immersiveWorlds/koreanPlaces/qa/index.html?scene=${scene}&environment=${environmentMode}&capture=1${extra}`, { waitUntil: 'networkidle', timeout: 45000 });
  process.stdout.write(`Loaded ${scene}; waiting for scene ready\n`);
  await ready();
  process.stdout.write(`Ready ${scene}\n`);
}
async function capture(scene, name, viewport) {
  await page.setViewportSize(viewport);
  await ready();
  await page.waitForTimeout(150);
  const file = path.join(evidence, `${scene}-${name}.png`);
  const bytes = await canvasImage({ path: file });
  const entry = { scene, viewport: name, width: viewport.width, height: viewport.height, path: relative(file), sha256: hash(bytes), bytes: bytes.length, state: await snap() };
  results.screenshots.push(entry);
  process.stdout.write(`Captured ${scene}-${name}.png (${bytes.length} bytes)\n`);
}
async function stepSceneFrame() {
  const before = await snap();
  const scheduler = await evaluate(() => window.sceneQAScheduler.stepFrame());
  await evaluate(() => window.sceneQAScheduler.flush());
  const after = await snap();
  assert(scheduler.callbacks === 1 && Number(after.canvas.frames) === Number(before.canvas.frames) + 1, 'Controlled step did not render exactly one real scene frame');
  return { nativeTimestamp: scheduler.timestamp, callbacks: scheduler.callbacks, beforeTime: before.canvas.time, afterTime: after.canvas.time, beforeFrames: before.canvas.frames, afterFrames: after.canvas.frames };
}
async function testInteraction(scene) {
  const viewport = page.viewportSize();
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
    await page.mouse.click(Math.round(x * viewport.width), Math.round(y * viewport.height));
    const state = await snap();
    if (state.events.length) { hit = { x: Math.round(x * viewport.width), y: Math.round(y * viewport.height), event: state.events[0] }; break; }
  }
  assert(hit, `${scene}: no tactile object reacted to the raycast tap search`);
  assert(hit.event.strength >= 0 && hit.event.strength <= 1, `${scene}: event strength is not bounded [0,1]`);
  assert(hit.event.position.length === 3 && hit.event.position.every(Number.isFinite), `${scene}: invalid event position`);
  const hitLayer = await evaluate(({ x, y }) => document.elementFromPoint(x, y)?.hasAttribute('data-scene-drag'), hit);
  assert(hitLayer, `${scene}: successful tap did not land on the full-cover sibling chrome`);
  await page.mouse.click(hit.x, hit.y);
  const duplicate = await snap();
  assert(duplicate.events.length === 1, `${scene}: immediate repeated tap bypassed cooldown`);
  // Let the real scene cooldown expire, then test cancellation over the KNOWN hit target.
  // Otherwise a gesture over empty space could appear to pass despite broken cancellation.
  const cooldownSteps = [];
  for (let index = 0; index < 11; index++) {
    cooldownSteps.push(await stepSceneFrame());
    phase(scene, `cooldown real frame ${index + 1}/11 flushed`);
  }
  assert(Number((await snap()).canvas.time) > Number(duplicate.canvas.time) + .8, `${scene}: eleven real frame steps did not advance scene time beyond cooldown`);
  await api('clearEvents');
  await evaluate(({ x, y }) => {
    const surface = document.querySelector('[data-holder="primary"] [data-scene-drag]');
    surface.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 42, isPrimary: true, button: 0, clientX: x, clientY: y }));
    window.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true, pointerId: 42, isPrimary: true, button: 0, clientX: x, clientY: y }));
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 42, isPrimary: true, button: 0, clientX: x, clientY: y }));
  }, hit);
  const cancel = await snap();
  assert(cancel.events.length === 0, `${scene}: cancelled pointer generated a tap event over a known tactile target`);
  await evaluate(({ x, y }) => {
    const surface = document.querySelector('[data-holder="primary"] [data-scene-drag]');
    surface.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 43, isPrimary: true, button: 0, clientX: x, clientY: y }));
    window.dispatchEvent(new Event('blur'));
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 43, isPrimary: true, button: 0, clientX: x, clientY: y }));
  }, hit);
  const blur = await snap();
  assert(blur.events.length === 0, `${scene}: window blur did not cancel gesture over a known tactile target`);
  await page.mouse.move(hit.x, hit.y); await page.mouse.down();
  const mouseCapture = await captureState();
  assert(mouseCapture.pointer?.type === 'mouse' && mouseCapture.holders.length === 1 && mouseCapture.holders[0] === 'primary', `${scene}: real mouse pointer was not captured by exactly the active scene surface`);
  await page.mouse.move(hit.x + viewport.width * .08, hit.y - viewport.height * .04, { steps: 5 });
  const mouseDragFrame = await stepSceneFrame();
  const duringDrag = await snap();
  assert(duringDrag.surfaces.some(surface => surface.look === 'drag'), `${scene}: visible sibling chrome drag never reached the world look handler`);
  await page.mouse.move(hit.x, hit.y, { steps: 5 }); await page.mouse.up();
  const mouseReleased = await captureState();
  assert(mouseReleased.holders.length === 0, `${scene}: mouse pointer capture was retained after pointerup`);
  const drag = await snap();
  assert(drag.events.length === 0, `${scene}: drag returning to the known tactile target generated a tap event`);
  const captureCancellations = [];
  for (const reason of ['pointercancel', 'blur', 'lostpointercapture']) {
    await evaluate(() => { window.__qaPointerCaptureEvents = []; });
    await page.mouse.move(hit.x, hit.y); await page.mouse.down();
    // setPointerCapture initially sets a pending override. Establish actual
    // native capture before testing its loss; clearing pending capture alone
    // need not emit lostpointercapture and can leave a legitimate tap gesture.
    await page.mouse.move(hit.x + 1, hit.y);
    const captured = await captureState();
    const gotCapture = captured.events.find(event => event.type === 'gotpointercapture' && event.trusted && event.pointerId === captured.pointer.id && event.holder === 'primary');
    assert(captured.holders[0] === 'primary' && gotCapture, `${scene}: ${reason} probe did not establish native gotpointercapture before cancellation`);
    await evaluate(reason => {
      const pointerId = window.__qaLastPointer.id;
      if (reason === 'blur') window.dispatchEvent(new Event('blur'));
      else if (reason === 'pointercancel') window.dispatchEvent(new PointerEvent('pointercancel', { pointerId, isPrimary: true, bubbles: true }));
      else document.querySelector('[data-holder="primary"]').releasePointerCapture(pointerId);
    }, reason);
    // A native lostpointercapture notification is delivered before the next
    // pointer event after releasePointerCapture; process one trusted move.
    await page.mouse.move(hit.x + 2, hit.y);
    await page.mouse.up();
    const released = await captureState(), ended = await snap();
    const lostCapture = released.events.find(event => event.type === 'lostpointercapture' && event.trusted && event.pointerId === captured.pointer.id && event.holder === 'primary' && event.atMs >= gotCapture.atMs);
    const pass = !!lostCapture && released.holders.length === 0 && ended.events.length === 0 && !ended.surfaces.some(surface => surface.look === 'drag');
    assert(pass, `${scene}: ${reason} failed to release capture and cancel the active gesture`);
    captureCancellations.push({ reason, start: captured, end: released, pass, method: reason === 'lostpointercapture' ? 'Real mouse pointer; native releasePointerCapture then trusted pointermove/up' : `Real mouse pointer; labelled synthetic ${reason} cancellation then trusted pointermove/up` });
  }
  const exclusions = [];
  for (const kind of ['button', 'input', 'link', 'rolebutton', 'roleslider', 'roleswitch', 'rolecheckbox', 'roletextbox']) {
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
  return { pass: true, fixture: 'Real world component under Player/Immersive-style sibling data-scene-drag overlay; not the shared app chrome components themselves', chromeVisible: before.chromeVisible, raycastTapHitSiblingChrome: hitLayer, cancellationTarget: 'Previously verified raycast target, after cooldown expired', cooldownSteps, mouseDragFrame, mouseCapture, mouseReleased, captureCancellations, dragReachedLookHandler: true, dragNotTap: drag.events.length === 0, syntheticPointerCancelNotTap: cancel.events.length === 0, syntheticBlurNotTap: blur.events.length === 0, interactiveChromeExclusions: exclusions, tap: hit, immediateTapBounded: duplicate.events.length === 1, initialCanvas: before.canvasIdentity };
}
async function testBrowserTouch(scene, hit) {
  const viewport = page.viewportSize();
  const policy = await evaluate(() => {
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
  await evaluate(() => {
    window.__qaTrustedTouchCancels = [];
    window.addEventListener('pointercancel', event => { if (event.isTrusted && event.pointerType === 'touch') window.__qaTrustedTouchCancels.push({ type: event.pointerType, trusted: event.isTrusted }); }, { once: true });
  });
  const point = (x, y) => ({ x, y, id: 71, radiusX: 5, radiusY: 5, force: 1 });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point(hit.x, hit.y)] });
  const touchCapture = await captureState();
  assert(touchCapture.pointer?.type === 'touch' && touchCapture.holders.length === 1 && touchCapture.holders[0] === 'primary', `${scene}: browser touch was not captured by exactly the active scene surface`);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [point(hit.x + viewport.width * .024, hit.y - viewport.height * .016)] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [point(hit.x + viewport.width * .065, hit.y - viewport.height * .031)] });
  const touchDragFrame = await stepSceneFrame();
  const moving = await snap();
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  const touchReleased = await captureState();
  assert(touchReleased.holders.length === 0, `${scene}: touch capture remained after touchEnd`);
  const ended = await snap();
  const canceled = await evaluate(() => window.__qaTrustedTouchCancels);
  const pass = moving.surfaces.some(surface => surface.look === 'drag') && ended.events.length === 0 && canceled.length === 0;
  assert(pass, `${scene}: browser touch drag failed to reach look, emitted a tap, or triggered native pointercancel`);
  return { pass, method: 'Chromium CDP Input.dispatchTouchEvent; trusted browser touch input, not synthetic DOM dispatch and not physical-device hardware', chromeVisible: true, policy, touchCapture, touchReleased, touchDragFrame, dragReachedLookHandler: true, worldEvents: ended.events.length, trustedPointerCancels: canceled.length };
}
async function lifecycle(scene) {
  const record = { viewport: lifecycleViewport };
  results.worlds[scene] = record;
  record.initialEnvironment = await checkEnvironment(scene, 'before lifecycle');
  phase(scene, 'motion endpoints at 683x450');
  await page.setViewportSize(lifecycleViewport);
  await api('setActive', false); await stopped();
  const nativeScheduler = await evaluate(() => window.sceneQAScheduler.snapshot());
  assert(!nativeScheduler.held, `${scene}: native motion probe was incorrectly gated`);
  const first = await snap(), firstPixels = await pixelHash();
  await api('setActive', true); await running();
  await page.waitForFunction(({ frames, time }) => {
    const canvas = document.querySelector('canvas');
    return Number(canvas?.dataset.frames) >= frames + 3 && Number(canvas?.dataset.time) > time;
  }, { frames: Number(first.canvas.frames), time: Number(first.canvas.time) });
  await api('setActive', false); await stopped();
  const second = await snap(), secondPixels = await pixelHash();
  record.motion = { method: 'Compare two paused screenshot endpoints separated by at least three genuine native RAF animated frames; scheduler held=false', pass: Number(second.canvas.time) > Number(first.canvas.time) && secondPixels !== firstPixels, beforeTime: first.canvas.time, afterTime: second.canvas.time, beforeFrames: first.canvas.frames, afterFrames: second.canvas.frames, pixelsChanged: firstPixels !== secondPixels, scheduler: nativeScheduler };
  assert(record.motion.pass, `${scene}: motion did not advance time and pixels`);
  await api('setActive', false); record.pause = await stable(`${scene} pause`);
  await evaluate(() => window.sceneQAScheduler.setHeld(true));
  record.inputScheduler = 'Scene RAF held between explicitly stepped real renders; input events remain trusted/native. Other browser RAF is unchanged.';
  await api('setActive', true); await running();
  phase(scene, 'visible chrome pointer and UI controls');
  record.interaction = await testInteraction(scene);
  phase(scene, 'trusted browser touch');
  record.browserTouch = await testBrowserTouch(scene, record.interaction.tap);
  // Full-size initial chrome evidence was captured before the motion/input
  // phases. Keep this real lifecycle probe in its stated small viewport to
  // avoid a late full-size SwiftShader readback after many held/stepped frames.
  const identity = (await snap()).canvasIdentity;
  phase(scene, 'three holder transports');
  const transports = [];
  for (let cycle = 0; cycle < 3; cycle++) {
    await api('clearEvents');
    await api('setSecond', true);
    await page.waitForFunction(() => window.koreanQA.snapshot().canvasHolder === 'secondary');
    await evaluate(() => window.sceneQAScheduler.flush());
    const secondary = await snap();
    assert(secondary.canvasCount === 1 && secondary.canvasIdentity === identity, `${scene}: second holder did not reuse canvas`);
    const listeners = await evaluate(() => window.__qaPointerCounts());
    assert(listeners.length === 2 && listeners.every(item => item.pointerdown === 1), `${scene}: missing or duplicate scene-surface pointerdown listeners during transport`);
    await evaluate(({ x, y }) => {
      const covered = document.querySelector('[data-holder="primary"] [data-scene-drag]');
      covered.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 89, isPrimary: true, button: 0, clientX: x, clientY: y }));
      window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 89, isPrimary: true, button: 0, clientX: x, clientY: y }));
    }, record.interaction.tap);
    assert((await snap()).events.length === 0, `${scene}: covered primary holder handled a tap`);
    await evaluate(({ x, y }) => {
      const covered = document.querySelector('[data-holder="primary"] [data-scene-drag]');
      covered.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 90, isPrimary: true, button: 0, clientX: x, clientY: y }));
      window.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerId: 90, isPrimary: true, button: 0, clientX: x + 40, clientY: y + 20 }));
    }, record.interaction.tap);
    assert(!(await snap()).surfaces.some(surface => surface.look === 'drag'), `${scene}: covered primary holder accepted a drag`);
    await evaluate(({ x, y }) => window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 90, isPrimary: true, button: 0, clientX: x, clientY: y })), record.interaction.tap);
    assert((await snap()).events.length === 0, `${scene}: covered holder drag produced an interaction`);
    await api('setSecond', false);
    await page.waitForFunction(() => window.koreanQA.snapshot().canvasHolder === 'primary');
    await evaluate(() => window.sceneQAScheduler.flush());
    const returned = await snap();
    const returnedListeners = await evaluate(() => window.__qaPointerCounts());
    const passed = returned.canvasIdentity === identity && returned.canvasCount === 1 && returnedListeners.length === 1 && returnedListeners[0].pointerdown === 1;
    assert(passed, `${scene}: repeated transport failed canvas reuse or pointer handler cleanup`);
    transports.push({ cycle: cycle + 1, secondaryIdentity: secondary.canvasIdentity, returnedIdentity: returned.canvasIdentity, listeners, returnedListeners, coveredHolderInert: true, pass: passed });
  }
  record.secondHolder = { pass: true, originalIdentity: identity, cycles: transports };
  phase(scene, 'reduced/static/hidden policies');
  await page.emulateMedia({ reducedMotion: 'reduce' }); record.reducedMotion = await stable(`${scene} reduced motion`);
  await page.emulateMedia({ reducedMotion: 'no-preference' }); await running();
  await api('setStatic', true); record.static3D = await stable(`${scene} static3D`);
  await api('setStatic', false); await running();
  await evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  record.syntheticHidden = { method: 'Own-property overrides of document.hidden/visibilityState plus visibilitychange, not actual tab hiding', ...await stable(`${scene} synthetic hidden`) };
  await evaluate(() => { delete document.hidden; delete document.visibilityState; document.dispatchEvent(new Event('visibilitychange')); }); await running();
  if (scene === 'scops') {
    const beforeCall = await snap(); await api('dispatchScops'); await page.waitForTimeout(150); const afterCall = await snap();
    record.externalAudioEvent = { pass: beforeCall.subscribers === 1 && afterCall.audioDispatches === beforeCall.audioDispatches + 1, event: 'scops', subscribers: beforeCall.subscribers, dispatches: afterCall.audioDispatches, limitation: 'Checks existing-engine event subscription and dispatch. It does not claim actual sound playback quality or visually classify the tiny owl animation.' };
    assert(record.externalAudioEvent.pass, 'scops event subscription missing');
  }
  record.afterInputEnvironment = await checkEnvironment(scene, 'after real input, motion and pause policies');
  phase(scene, 'mount reuse and delayed disposal');
  const rapidIds = [];
  for (let index = 0; index < 3; index++) {
    await api('setMounted', false); await page.waitForFunction(() => !document.querySelector('canvas')); await page.waitForTimeout(90);
    await api('setMounted', true); await ready(); rapidIds.push((await snap()).canvasIdentity);
  }
  assert(rapidIds.every(id => id === identity), `${scene}: rapid remount did not retain the one canvas`);
  const unmountRequestedAtMs = await evaluate(() => { const at = performance.now(); window.koreanQA.setMounted(false); return at; });
  await page.waitForFunction(() => !document.querySelector('canvas'));
  const detachedObservedAtMs = await evaluate(() => performance.now());
  assert((await snap()).disposalObservations.length === 0, `${scene}: disposal began immediately instead of retaining the grace period`);
  await page.waitForFunction(identity => window.koreanQA.snapshot().disposalObservations.some(item => item.canvasIdentity === identity && item.completedAtMs !== undefined && item.contextLostAtMs !== undefined), identity, { timeout: 20000 });
  const cleanup = (await snap()).disposalObservations.find(item => item.canvasIdentity === identity);
  assert(cleanup && !cleanup.error && cleanup.startedAtMs - unmountRequestedAtMs >= 4950 && cleanup.completedAtMs >= cleanup.startedAtMs && cleanup.contextLostAtMs >= cleanup.startedAtMs, `${scene}: observed disposal timing or context release is invalid`);
  const detachedListeners = await evaluate(() => window.__qaPointerCounts());
  assert(detachedListeners.every(item => item.pointerdown === 0), `${scene}: unmounted holder retained a scene pointerdown handler`);
  const detachedScheduler = await evaluate(() => window.sceneQAScheduler.snapshot());
  assert(detachedScheduler.pendingCallbacks === 0, `${scene}: disposal retained a scene RAF callback`);
  assert((await snap()).subscribers === 0, `${scene}: disposal retained an existing-engine audio subscription`);
  await api('setMounted', true); await ready(); const rebuilt = await snap();
  record.rebuiltEnvironment = await checkEnvironment(scene, 'after disposal and remount');
  if (scene !== 'rural') {
    assert(record.rebuiltEnvironment.generationCount === record.initialEnvironment.generationCount + 1, `${scene}: true disposal/remount did not generate exactly one new checked environment`);
    const disposals = rebuilt.environment.audits.filter(audit => audit.scope === 'scene' && audit.event.phase === 'dispose');
    assert(disposals.length === 1, `${scene}: scene environment did not report exactly one actual disposal before rebuilding`);
    record.environmentDisposal = disposals;
  }
  record.mountUnmount = { pass: rebuilt.canvasCount === 1 && rebuilt.canvasIdentity !== identity, rapidRemountCount: rapidIds.length, rapidIdentities: rapidIds, hostGraceMsFromSource: 5000, unmountRequestedAtMs, detachedObservedAtMs, cleanup, cleanupStartAfterUnmountRequestMs: cleanup.startedAtMs - unmountRequestedAtMs, synchronousCleanupDurationMs: cleanup.completedAtMs - cleanup.startedAtMs, contextLostAfterUnmountRequestMs: cleanup.contextLostAtMs - unmountRequestedAtMs, detachedListeners, detachedScheduler, rebuiltIdentity: rebuilt.canvasIdentity, newCanvasAfterDisposal: rebuilt.canvasIdentity !== identity, method: 'QA-only wrapper observes real synchronous WorldEngine.dispose entry/return; real webglcontextlost event is observed on the retained detached canvas. Host timer and resource methods are unchanged.', limitation: 'Synchronous cleanup return and browser context loss are distinct from the 5000 ms host grace. No physical GPU driver memory profiler or reclamation latency measurement was available.' };
  assert(record.mountUnmount.pass, `${scene}: delayed remount did not rebuild a unique canvas`);
  record.createdAudioContexts = await evaluate(() => window.__qaAudioContexts);
  assert(record.createdAudioContexts === 0, `${scene}: created an independent audio context`);
  record.finalInputScheduler = await evaluate(() => window.sceneQAScheduler.snapshot());
  phase(scene, 'static first frame');
  await navigate(scene, '&static=1');
  record.staticFirstFrame = await stable(`${scene} initial static3D`);
  record.staticEnvironment = await checkEnvironment(scene, 'static first frame');
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
    if (!screenshotsOnly) {
      await api('setChrome', true);
      await page.waitForSelector('[data-qa-chrome]');
      await capture(scene, 'chrome', { width: 1365, height: 900 });
      results.screenshots[results.screenshots.length - 1].capturePhase = 'Initial paused chrome-visible frame before interaction tests; interaction results are recorded separately in worlds[scene].';
      await api('setChrome', false);
      await page.waitForFunction(() => !document.querySelector('[data-qa-chrome]'));
    }
    await capture(scene, 'portrait', { width: 390, height: 844 });
    await capture(scene, 'fold', { width: 960, height: 700 });
    const initialEnvironment = await checkEnvironment(scene, 'after initial desktop/portrait/Fold captures');
    let sentinelProbe;
    if (!screenshotsOnly && scene !== 'rural') {
      sentinelProbe = await api('probeEnvironmentRestoration');
      assert(sentinelProbe.restored && sentinelProbe.callerRestored && sentinelProbe.before.cubeFace === 2 && sentinelProbe.before.mip === 1 && sentinelProbe.statusBefore === 36053 && sentinelProbe.statusAfter === 36053 && ['errorsBefore', 'bindingErrors', 'errorsAfter', 'finalErrors'].every(key => sentinelProbe[key].length === 0), `${scene}: nonzero cube-face/mip restoration probe failed`);
      sentinelProbe.audits = (await snap()).environment.audits.filter(audit => audit.scope === 'sentinel');
    }
    results.worlds[scene] = screenshotsOnly ? { screenshotsCaptured: true, initialEnvironment } : await lifecycle(scene);
    if (sentinelProbe) results.worlds[scene].sentinelProbe = sentinelProbe;
  }
  if (!screenshotsOnly) {
    const other = await context.newPage(); await other.goto('about:blank'); await other.bringToFront(); await page.waitForTimeout(150);
    const observed = await evaluate(() => ({ hidden: document.hidden, visibilityState: document.visibilityState }));
    results.actualTabVisibility = { ...observed, tested: observed.hidden, note: observed.hidden ? 'Original page became hidden after a separate page was brought forward.' : 'Headless Chromium did not hide the original page; actual tab-hide behavior remains unverified.' };
    await other.close();
  }
  results.pass = results.errors.length === 0;
} catch (error) {
  results.pass = false;
  results.failure = error.stack;
  process.stdout.write(`FAILED: ${error.stack}\n`);
  try { await bounded(evaluate(() => window.koreanQA?.setActive(false)), 'failure pause', 5000); } catch {}
  try { await page.screenshot({ path: path.join(evidence, 'debug-failure.png'), timeout: 5000 }); } catch {}
  try { results.failureState = await bounded(snap(), 'failure snapshot', 5000); } catch {}
  try { results.failurePointerCapture = await bounded(captureState(), 'failure capture telemetry', 5000); } catch {}
  process.exitCode = 1;
} finally {
  const sourceAfter = await manifest(sourceFiles);
  const dependencySourceAfter = await manifest(dependencySourceFiles);
  const bundleAfter = await manifest(await distFiles(path.join(qa, 'dist')));
  results.integrity = { sourceUnchangedDuringRun: sourceAfter.sha256 === results.source.sha256, dependencySourceUnchangedDuringRun: dependencySourceAfter.sha256 === results.dependencySource.sha256, bundleUnchangedDuringRun: bundleAfter.sha256 === results.bundle.sha256 };
  if (!results.integrity.sourceUnchangedDuringRun || !results.integrity.dependencySourceUnchangedDuringRun || !results.integrity.bundleUnchangedDuringRun) {
    results.pass = false;
    results.errors.push({ type: 'integrity', text: 'Scene source, reviewed dependency source or built harness changed during capture; rebuild and repeat for final evidence.' });
  }
  if (!results.pass) process.exitCode = 1;
  results.finishedAt = new Date().toISOString();
  const filename = screenshotsOnly ? `screenshots-${sceneOption}.json` : `verification-${sceneOption}.json`;
  await fs.writeFile(path.join(evidence, filename), `${JSON.stringify(results, null, 2)}\n`);
  await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
  process.stdout.write(`Evidence: ${relative(path.join(evidence, filename))}; pass=${results.pass}\n`);
}
