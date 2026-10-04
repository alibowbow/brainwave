import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const qaRoot = path.dirname(fileURLToPath(import.meta.url));
const ownedRoot = path.dirname(qaRoot);
const projectRoot = path.resolve(qaRoot, '../../../..');
const output = process.env.SCENE_SCREENSHOT_DIR || path.join(qaRoot, 'evidence');
const baseURL = process.env.SCENE_BASE_URL || 'http://127.0.0.1:4175/';
const sourceExtensions = /\.(?:tsx?|css|mjs|html)$/;
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.sort((a,b) => a.name.localeCompare(b.name)).filter((e) => !['node_modules', 'evidence', '.bundle'].includes(e.name)).map(async (e) => e.isDirectory() ? filesIn(path.join(dir, e.name)) : [path.join(dir, e.name)]))).flat();
}
const sourceFiles = (await filesIn(ownedRoot)).filter((p) => sourceExtensions.test(p));
const sourceHashes = Object.fromEntries(await Promise.all(sourceFiles.map(async (p) => [path.relative(projectRoot, p), hash(await readFile(p))])));
let bundleHashes = {};
try {
  // The built QA bundle is served, so evidence identifies exact emitted JS/CSS.
  const assets = await readdir(path.join(qaRoot, '.bundle', 'assets'));
  bundleHashes = Object.fromEntries(await Promise.all(assets.sort().map(async (f) => [f, hash(await readFile(path.join(qaRoot, '.bundle', 'assets', f)))])));
} catch { /* Dev-server evidence is still tied to source hashes; marked below. */ }
let gitHead = null;
try { gitHead = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: projectRoot, encoding: 'utf8' }).trim(); } catch { /* optional outside git */ }
const report = {
  schema: 'brainwave-rain-shelters-qa-v1', startedAt: new Date().toISOString(), gitHead,
  sourceTreeSHA256: hash(JSON.stringify(sourceHashes)), sourceHashes, bundleHashes,
  mode: Object.keys(bundleHashes).length ? 'isolated-built-QA-bundle' : 'source-dev-server',
  baseURL, browser: null, worlds: [], errors: [],
  limitations: ['All dimensions are browser viewport tests, not physical Fold hardware.', 'Hidden-state test explicitly overrides document.visibilityState; it is not a real browser-tab switch.', 'SwiftShader results establish rendering and behavior, not device FPS or thermal performance.', 'Second-holder test exercises shared canvas relocation; production App/fullscreen wiring belongs to integration.', 'The baseline shared player applies touch-action:none only to its protected worlds. Integration must extend that policy for these four IDs; this fixture does not mask it. Native mouse and synthetic touch gesture tests do not establish real mobile pan suppression.'],
};
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || undefined,
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
report.browser = { version: browser.version(), executable: process.env.SCENE_BROWSER_PATH || 'playwright-default', renderer: 'SwiftShader requested', viewportDeviceScaleFactor: 1 };
const worlds = (process.env.SCENE_WORLDS || 'tent,window,porch,storm').split(',');
const captureOnly = process.env.SCENE_CAPTURE_ONLY === '1';
const tapTargets = { tent: [0, 0], window: [0, 0], porch: [0.238, -0.428], storm: [0.31, 0.02] };
const actions = { tent: 'opening', window: 'glass-trace', porch: 'basin-ripple', storm: 'awning' };

try {
  for (const world of worlds) {
    const result = { world, checks: [], screenshots: [], errors: [], renderer: null };
    report.worlds.push(result);
    const context = await browser.newContext({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
    const page = await context.newPage();
    page.setDefaultTimeout(120_000);
    page.on('pageerror', (error) => result.errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error' && /three|webgl|shader|program|error/i.test(message.text())) result.errors.push(message.text()); });
    await page.addInitScript(() => {
      window.__rainQA = { contexts: 0, losses: 0 };
      const original = HTMLCanvasElement.prototype.getContext;
      const known = new WeakSet();
      HTMLCanvasElement.prototype.getContext = function(type, ...args) {
        const context = original.call(this, type, ...args);
        if (context && /webgl/.test(type) && this.classList.contains('rain-shelter-canvas') && !known.has(this)) {
          known.add(this); window.__rainQA.contexts++;
          this.addEventListener('webglcontextlost', () => { window.__rainQA.losses++; });
        }
        return context;
      };
    });
    const scene = () => page.locator('.rain-shelter').last();
    const canvas = () => page.locator('.rain-shelter-canvas');
    const clickControl = (id) => page.locator(id).dispatchEvent('click');
    const events = () => page.locator('#qa-events').getAttribute('data-events').then(JSON.parse);
    const tapCanvas = async (directCanvas = true) => {
      const [x,y] = tapTargets[world];
      const box = await canvas().boundingBox();
      assert.ok(box, 'canvas has a real nonzero target');
      if (directCanvas) await page.evaluate(() => { document.documentElement.dataset.qaDirectCanvas = 'true'; });
      try { await page.mouse.click(box.x+(x+1)*box.width/2, box.y+(1-y)*box.height/2); }
      finally { if (directCanvas) await page.evaluate(() => { delete document.documentElement.dataset.qaDirectCanvas; }); }
    };
    const expectOneOverlayTap = async (label) => {
      const old = (await events()).length;
      await tapCanvas(false);
      await page.waitForFunction((count) => Number(document.querySelector('#qa-events')?.getAttribute('data-count')) > count, old);
      const current = await events();
      assert.equal(current.length,old+1,label);
      assert.equal(current.at(-1).action,actions[world]);
      assert.ok(current.at(-1).value >= 0 && current.at(-1).value <= 1);
      return current.at(-1);
    };
    const pixelState = async () => {
      await page.evaluate(() => { document.documentElement.dataset.qaCapture = 'true'; });
      await canvas().evaluate((c) => c.getContext('webgl2')?.finish());
      const bytes=await page.screenshot({animations:'disabled'});
      await page.evaluate(() => { delete document.documentElement.dataset.qaCapture; });
      return {sha256:hash(bytes),bytes:bytes.byteLength};
    };
    const metric = () => canvas().evaluate((c) => ({ frame: Number(c.dataset.frame), time: Number(c.dataset.time), width: c.width, height: c.height, drawCalls: Number(c.dataset.drawCalls), triangles: Number(c.dataset.triangles), geometries: Number(c.dataset.geometries), textures: Number(c.dataset.textures) }));
    const motion = (value) => page.waitForFunction((v) => [...document.querySelectorAll('.rain-shelter')].at(-1)?.dataset.motion === v, value);
    const ready = () => page.waitForSelector('.rain-shelter[data-state="ready"]', { timeout: 240_000 });
    const capture = async (name, viewport, showChrome = false) => {
      if (viewport) await page.setViewportSize(viewport);
      await page.waitForTimeout(400);
      await page.evaluate((chrome) => { document.documentElement.dataset.qaCapture = 'true'; if(chrome) document.documentElement.dataset.qaCaptureChrome = 'true'; },showChrome);
      const file = `${world}-${name}.png`;
      await canvas().evaluate((c) => c.getContext('webgl2')?.finish());
      const bytes = await page.screenshot({ path: path.join(output, file), animations: 'disabled' });
      await page.evaluate(() => { delete document.documentElement.dataset.qaCapture; delete document.documentElement.dataset.qaCaptureChrome; });
      assert.ok(bytes.byteLength > 10_000, `actual ${name} screenshot has visual detail`);
      result.screenshots.push({ file, bytes: bytes.byteLength, sha256: hash(bytes), viewport: page.viewportSize(), canvas: await metric() });
      return bytes;
    };
    try {
      await page.goto(`${baseURL}${baseURL.includes('?') ? '&' : '?'}world=${world}&paused=1`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
      await ready();
      console.log(`READY ${world}: actual WebGL scene`);
      assert.equal(await canvas().count(), 1);
      result.renderer = await canvas().evaluate((c) => { const gl = c.getContext('webgl2'); const ext = gl?.getExtension('WEBGL_debug_renderer_info'); return { webgl2: !!gl, vendor: ext && gl.getParameter(ext.UNMASKED_VENDOR_WEBGL), renderer: ext && gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) }; });
      assert.equal(result.renderer.webgl2, true, 'real WebGL2 renderer');
      await motion('paused');
      const initialPaused=await metric();
      assert.ok(initialPaused.frame >= 1 && initialPaused.time === 0, 'initial active=false renders a first 3D frame');
      result.checks.push({name:'initial active=false renders a real first 3D frame',pass:true,frame:initialPaused});
      if (captureOnly) {
        await page.evaluate(() => document.fonts.ready);
        await capture('desktop', {width:1440,height:960});
        await capture('portrait', {width:390,height:844});
        if (world === 'porch') await capture('fold-inner', {width:884,height:768});
        continue;
      }
      await clickControl('#qa-active');
      await motion('running');
      const start = await metric();
      await page.waitForFunction((old) => Number(document.querySelector('.rain-shelter-canvas')?.getAttribute('data-time')) > old.time && Number(document.querySelector('.rain-shelter-canvas')?.getAttribute('data-frame')) > old.frame, start);
      result.checks.push({ name: 'active animation advances frame and simulation time', pass: true, before: start, after: await metric() });
      await clickControl('#qa-active');
      await motion('paused');
      await page.waitForTimeout(250);
      const paused = await metric();
      await page.waitForTimeout(650);
      const still = await metric();
      assert.equal(still.time, paused.time, 'pause freezes simulation');
      assert.equal(still.frame, paused.frame, 'pause stops frame loop');
      result.checks.push({ name: 'active=false stops motion and preserves rendered frame', pass: true, state: still });
      await page.evaluate(() => document.fonts.ready);
      await capture('desktop', { width: 1440, height: 960 });
      await capture('portrait', { width: 390, height: 844 });
      if (world === 'porch') await capture('fold-inner', { width: 884, height: 768 });
      await page.setViewportSize({ width: 1100, height: 800 });
      await clickControl('#qa-active');
      await motion('running');
      const beforeCanvasTap = await events();
      await tapCanvas();
      await page.waitForFunction((old) => Number(document.querySelector('#qa-events')?.getAttribute('data-count')) > old, beforeCanvasTap.length);
      const tapped = await events();
      assert.equal(tapped.length, beforeCanvasTap.length + 1);
      assert.equal(tapped.at(-1).action, actions[world]);
      result.checks.push({name:'native canvas pointer tap hits the intended 3D target',pass:true,ndc:tapTargets[world],event:tapped.at(-1)});
      const beforeInteraction = await events();
      await page.locator('.rain-shelter-action').last().dispatchEvent('click');
      await page.waitForFunction((old) => Number(document.querySelector('#qa-events')?.getAttribute('data-count')) > old, beforeInteraction.length);
      const afterInteraction = await events();
      assert.equal(afterInteraction.length, beforeInteraction.length + 1);
      assert.equal(afterInteraction.at(-1).world, world);
      assert.ok(Number.isFinite(afterInteraction.at(-1).value));
      assert.ok(afterInteraction.at(-1).value >= 0 && afterInteraction.at(-1).value <= 1);
      result.checks.push({ name: 'accessible scene interaction emits one bounded event', pass: true, event: afterInteraction.at(-1) });
      const interactionFrame = await metric();
      await page.waitForFunction((frame) => Number(document.querySelector('.rain-shelter-canvas')?.getAttribute('data-frame')) > frame + 4, interactionFrame.frame);
      await clickControl('#qa-active');
      await motion('paused');
      await capture('interaction');
      await clickControl('#qa-active');
      await motion('running');

      const overlayEvent=await expectOneOverlayTap('visible chrome transparent overlay tap emits exactly one bounded scene event');
      const beforeOverlayDrag=(await events()).length;
      const overlayBox=await page.locator('.qa-drag-overlay').last().boundingBox();
      const overlayX=overlayBox.x+overlayBox.width*.45, overlayY=overlayBox.y+overlayBox.height*.52;
      await page.mouse.move(overlayX,overlayY); await page.mouse.down();
      await page.mouse.move(overlayX+130,overlayY+20,{steps:2});
      assert.equal(await scene().getAttribute('data-look'),'drag','native drag starts through sibling transparent overlay');
      await page.mouse.up();
      assert.equal((await events()).length,beforeOverlayDrag,'native overlay drag is not a tap');
      assert.equal(await scene().getAttribute('data-look'),null);
      const beforeChrome=(await events()).length;
      await page.locator('[data-qa-chrome-button]').last().click();
      assert.ok(Number(await page.locator('#qa-events').getAttribute('data-chrome-clicks')) > 0,'native chrome button click was delivered');
      await page.locator('[data-qa-chrome-input]').last().click({position:{x:80,y:8}});
      await page.keyboard.press('ArrowLeft');
      assert.notEqual(await page.locator('[data-qa-chrome-input]').last().inputValue(),'50','native chrome input received interaction');
      assert.equal((await events()).length,beforeChrome,'interactive button/input chrome must not trigger scene interaction');
      assert.equal(await scene().getAttribute('data-look'),null,'chrome controls never begin scene look');
      result.checks.push({name:'visible player chrome overlay supports native bounded tap/drag while button and input stay separate',pass:true,event:overlayEvent});
      if(world === 'tent') { await clickControl('#qa-active'); await motion('paused'); await capture('player-chrome',undefined,true); await clickControl('#qa-active'); await motion('running'); }

      // Synthetic pointer sequences exercise cancellation and movement thresholds,
      // while the interaction button above supplies a real semantic scene action.
      const countBeforeGesture = (await events()).length;
      const dragObserved = await canvas().evaluate((c) => {
        const r=c.getBoundingClientRect(); const p={bubbles:true,isPrimary:true,pointerId:41,pointerType:'touch',button:0,clientX:r.left+r.width*.5,clientY:r.top+r.height*.6};
        c.dispatchEvent(new PointerEvent('pointerdown',p));
        window.dispatchEvent(new PointerEvent('pointermove',{...p,clientX:p.clientX+130,clientY:p.clientY+20}));
        const dragging=c.closest('.rain-shelter')?.getAttribute('data-look');
        window.dispatchEvent(new PointerEvent('pointerup',{...p,clientX:p.clientX+130,clientY:p.clientY+20}));
        return dragging;
      });
      assert.equal(dragObserved, 'drag', 'active movement starts bounded look gesture');
      assert.equal((await events()).length, countBeforeGesture, 'drag cannot trigger tap interaction');
      await page.locator('.qa-drag-overlay').last().evaluate((c) => {
        const r=c.getBoundingClientRect(); const p={bubbles:true,isPrimary:true,pointerId:42,pointerType:'touch',button:0,clientX:r.left+r.width*.5,clientY:r.top+r.height*.6};
        c.dispatchEvent(new PointerEvent('pointerdown',p));
        window.dispatchEvent(new PointerEvent('pointercancel',p));
        window.dispatchEvent(new PointerEvent('pointerup',p));
      });
      assert.equal((await events()).length, countBeforeGesture, 'cancelled pointer cannot trigger tap interaction');
      assert.equal(await scene().getAttribute('data-look'), null, 'cancelled drag releases view');
      result.checks.push({ name: 'drag is not tap and pointer cancellation releases gesture', pass: true, method: 'synthetic pointerdown/move/up and pointerdown/cancel/up' });
      const lookAfterBlur = await page.locator('.qa-drag-overlay').last().evaluate((c) => {
        const r=c.getBoundingClientRect(); const p={bubbles:true,isPrimary:true,pointerId:43,pointerType:'touch',button:0,clientX:r.left+r.width*.5,clientY:r.top+r.height*.6};
        c.dispatchEvent(new PointerEvent('pointerdown',p));
        window.dispatchEvent(new PointerEvent('pointermove',{...p,clientX:p.clientX+90}));
        window.dispatchEvent(new FocusEvent('blur'));
        const afterBlur = c.closest('[data-scene-surface]')?.querySelector('.rain-shelter')?.getAttribute('data-look');
        window.dispatchEvent(new PointerEvent('pointerup',p));
        return afterBlur;
      });
      assert.equal(lookAfterBlur,null,'window blur clears drag immediately, before pointerup');
      assert.equal((await events()).length,countBeforeGesture,'window blur cannot leave a later tap armed');
      assert.equal(await scene().getAttribute('data-look'),null,'window blur clears drag look state');
      result.checks.push({name:'window blur cancels active gesture and subsequent pointerup emits no interaction',pass:true,method:'synthetic FocusEvent blur during pointer drag'});

      await clickControl('#qa-active');
      await motion('paused');
      const originalCanvas = await canvas().elementHandle();
      const originalContexts = await page.evaluate(() => window.__rainQA.contexts);
      await clickControl('#qa-active'); await motion('running');
      const beforeHolderTransition=(await events()).length;
      await page.mouse.move(overlayX,overlayY); await page.mouse.down();
      await page.mouse.move(overlayX+90,overlayY+15,{steps:2});
      assert.equal(await scene().getAttribute('data-look'),'drag');
      await clickControl('#qa-second');
      await page.waitForSelector('#qa-second-holder .rain-shelter-canvas');
      assert.equal(await page.locator('#qa-primary-holder .rain-shelter').getAttribute('data-look'),null,'holder transfer immediately cancels old gesture before pointerup');
      await page.mouse.up();
      assert.equal((await events()).length,beforeHolderTransition,'pointerup after holder transfer cannot trigger stale tap');
      await motion('running');
      assert.equal(await canvas().count(), 1);
      assert.equal(await canvas().evaluate((c, original) => c === original, originalCanvas), true);
      assert.equal(await page.evaluate(() => window.__rainQA.contexts), originalContexts);
      await expectOneOverlayTap('second holder has exactly one active overlay listener');
      await clickControl('#qa-active'); await motion('paused');
      await clickControl('#qa-second');
      await page.waitForSelector('#qa-primary-holder .rain-shelter-canvas');
      assert.equal(await canvas().evaluate((c, original) => c === original, originalCanvas), true);
      await clickControl('#qa-active'); await motion('running');
      await expectOneOverlayTap('returning from second holder does not duplicate overlay listeners');
      await clickControl('#qa-active'); await motion('paused');
      result.checks.push({ name: 'mid-drag second-holder transfer cancels old gesture, reuses identical canvas and returns with single interaction listeners', pass: true, sceneContexts: originalContexts });

      await clickControl('#qa-active');
      await motion('running');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await motion('paused');
      const reduced = await metric();
      await page.waitForTimeout(650);
      assert.equal((await metric()).time, reduced.time);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await motion('running');
      result.checks.push({ name: 'prefers-reduced-motion freezes scene and change resumes it', pass: true });
      await clickControl('#qa-static');
      await motion('paused');
      const staticFrame = await metric();
      await page.waitForTimeout(650);
      assert.equal((await metric()).time, staticFrame.time);
      await clickControl('#qa-static');
      await motion('running');
      result.checks.push({ name: 'static3D preserves full 3D frame without animation', pass: true });
      await page.evaluate(() => { Object.defineProperty(document,'visibilityState',{configurable:true,get:()=> 'hidden'}); Object.defineProperty(document,'hidden',{configurable:true,get:()=> true}); document.dispatchEvent(new Event('visibilitychange')); });
      await motion('paused');
      const hidden = await metric();
      await page.waitForTimeout(650);
      assert.equal((await metric()).time, hidden.time);
      await page.evaluate(() => { delete document.visibilityState; delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
      await motion('running');
      result.checks.push({ name: 'synthetic hidden state pauses; visibility restoration resumes', pass: true, actualTabSwitch: false });
      await clickControl('#qa-active');
      await motion('paused');
      for (let i=0; i<3; i++) {
        await clickControl('#qa-mounted');
        await page.waitForFunction(() => document.querySelectorAll('.rain-shelter-canvas').length === 0);
        await clickControl('#qa-mounted');
        await ready();
        assert.equal(await canvas().count(),1);
        assert.equal(await canvas().evaluate((c, original) => c===original, originalCanvas),true);
      }
      await clickControl('#qa-active'); await motion('running');
      await expectOneOverlayTap('three remounts retain exactly one active overlay listener');
      await clickControl('#qa-active'); await motion('paused');
      result.checks.push({ name: 'three quick mount/unmount cycles reuse one live scene and one overlay listener', pass: true });
      await clickControl('#qa-mounted');
      await page.waitForFunction(() => document.querySelectorAll('.rain-shelter-canvas').length === 0);
      await page.waitForTimeout(5700);
      const disposed = await page.evaluate(() => window.__rainQA);
      // Chromium may suppress contextlost delivery once the canvas is detached.
      // Inspect the retained real context instead of mistaking missing telemetry for a leak.
      await page.waitForFunction((c) => c.getContext('webgl2')?.isContextLost() === true, originalCanvas);
      const releasedContext = await originalCanvas.evaluate((c) => ({connected:c.isConnected,contextLost:c.getContext('webgl2')?.isContextLost()}));
      assert.equal(releasedContext.contextLost,true,'expired host explicitly releases the actual WebGL context');
      assert.equal(releasedContext.connected,false);
      await clickControl('#qa-mounted');
      await ready();
      assert.equal(await canvas().count(),1);
      assert.equal(await canvas().evaluate((c,original)=>c===original,originalCanvas),false,'expired scene creates a fresh canvas');
      result.checks.push({ name: 'delayed teardown releases WebGL context and later remount is fresh', pass: true, telemetry: disposed, releasedContext });
      await page.goto(`${baseURL}${baseURL.includes('?') ? '&' : '?'}world=${world}&static3D=1`, {waitUntil:'domcontentloaded',timeout:120_000});
      await ready();
      await motion('paused');
      await page.evaluate(() => document.fonts.ready);
      const firstStatic = await metric();
      assert.ok(firstStatic.frame >= 1);
      assert.equal(firstStatic.time,0);
      const firstStaticPixels=await pixelState();
      assert.ok(firstStaticPixels.bytes > 10_000, 'fresh static first frame contains scene detail');
      await page.waitForTimeout(650);
      assert.equal((await metric()).frame,firstStatic.frame);
      result.checks.push({name:'fresh static3D first load renders a nonblank full 3D frame with no RAF',pass:true,frame:firstStatic,pixels:firstStaticPixels});
      const staticBefore = await pixelState();
      const staticEvents = await events();
      await tapCanvas();
      await page.waitForFunction((old) => Number(document.querySelector('#qa-events')?.getAttribute('data-count')) > old, staticEvents.length);
      const staticAfterMetric = await metric();
      const staticAfter = await pixelState();
      assert.equal(staticAfterMetric.time, firstStatic.time);
      assert.equal(staticAfterMetric.frame, firstStatic.frame + 1, 'static interaction draws exactly one real frame');
      assert.notEqual(staticAfter.sha256, staticBefore.sha256, 'static interaction changes actual pixels');
      await page.waitForTimeout(650);
      assert.equal((await metric()).frame, staticAfterMetric.frame, 'no follow-up animation in static mode');
      result.checks.push({name:'static3D canvas interaction visibly redraws exactly once without animation',pass:true,before:staticBefore,after:staticAfter});
      assert.deepEqual(result.errors, []);
    } catch(error) {
      result.errors.push(String(error?.stack || error));
      try { await page.screenshot({ path: path.join(output, `${world}-failure.png`) }); } catch {}
    } finally {
      await context.close();
      result.pass = result.errors.length === 0;
      await writeFile(path.join(output,'report.json'), JSON.stringify(report,null,2)+'\n');
      console.log(`${result.pass ? 'PASS' : 'FAIL'} ${world}: ${result.checks.length} checks, ${result.screenshots.length} screenshots`);
      if (result.errors.length) console.error(result.errors.join('\n'));
    }
  }
} catch(error) {
  report.errors.push(String(error?.stack || error));
} finally {
  await browser.close();
  report.finishedAt = new Date().toISOString();
  report.pass = report.errors.length === 0 && report.worlds.length === worlds.length && report.worlds.every((w)=>w.pass);
  await writeFile(path.join(output,'report.json'), JSON.stringify(report,null,2)+'\n');
}
if (!report.pass) process.exitCode=1;
