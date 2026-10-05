import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const qaRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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
const worlds = ['porch'];
report.supplement = {reason:'Complete remaining porch assertions after preserved prior segment',viewport:{width:390,height:844},scriptSHA256:hash(await readFile(fileURLToPath(import.meta.url)))};
const captureOnly = false;
const tapTargets = { tent: [0, 0], window: [0, 0], porch: [0, -0.4], storm: [0.31, 0.02] };
const actions = { tent: 'opening', window: 'glass-trace', porch: 'basin-ripple', storm: 'awning' };

try {
  for (const world of worlds) {
    const result = { world, checks: [], screenshots: [], errors: [], renderer: null };
    report.worlds.push(result);
    const pushCheck=(check)=>{result.checks.push(check);console.log(`CHECK ${world}: ${check.name}`);};
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
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
      await page.goto(`${baseURL}${baseURL.includes('?') ? '&' : '?'}world=${world}&static3D=1`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
      await ready();
      console.log(`READY ${world}: actual WebGL scene`);
      assert.equal(await canvas().count(), 1);
      result.renderer = await canvas().evaluate((c) => { const gl = c.getContext('webgl2'); const ext = gl?.getExtension('WEBGL_debug_renderer_info'); return { webgl2: !!gl, vendor: ext && gl.getParameter(ext.UNMASKED_VENDOR_WEBGL), renderer: ext && gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) }; });
      assert.equal(result.renderer.webgl2, true, 'real WebGL2 renderer');
      await motion('paused');
      const originalCanvas=await canvas().elementHandle();
      const staticFrame=await metric();
      assert.equal(staticFrame.time,0);
      await page.waitForTimeout(650);
      assert.equal((await metric()).frame,staticFrame.frame);
      await clickControl('#qa-static');
      await motion('running');
      pushCheck({ name: 'static3D preserves full 3D frame without animation', pass: true });
      await page.evaluate(() => { Object.defineProperty(document,'visibilityState',{configurable:true,get:()=> 'hidden'}); Object.defineProperty(document,'hidden',{configurable:true,get:()=> true}); document.dispatchEvent(new Event('visibilitychange')); });
      await motion('paused');
      const hidden = await metric();
      await page.waitForTimeout(650);
      assert.equal((await metric()).time, hidden.time);
      await page.evaluate(() => { delete document.visibilityState; delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
      await motion('running');
      pushCheck({ name: 'synthetic hidden state pauses; visibility restoration resumes', pass: true, actualTabSwitch: false });
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
      pushCheck({ name: 'three quick mount/unmount cycles reuse one live scene and one overlay listener', pass: true });
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
      pushCheck({ name: 'delayed teardown releases WebGL context and later remount is fresh', pass: true, telemetry: disposed, releasedContext });
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
      pushCheck({name:'fresh static3D first load renders a nonblank full 3D frame with no RAF',pass:true,frame:firstStatic,pixels:firstStaticPixels});
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
      pushCheck({name:'static3D canvas interaction visibly redraws exactly once without animation',pass:true,before:staticBefore,after:staticAfter});
      assert.deepEqual(result.errors, []);
    } catch(error) {
      result.errors.push(String(error?.stack || error));
      try { await page.screenshot({ path: path.join(output, `${world}-supplement-failure.png`) }); } catch {}
    } finally {
      await context.close();
      result.pass = result.errors.length === 0;
      await writeFile(path.join(output,'porch-supplement-report.json'), JSON.stringify(report,null,2)+'\n');
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
  await writeFile(path.join(output,'porch-supplement-report.json'), JSON.stringify(report,null,2)+'\n');
}
if (!report.pass) process.exitCode=1;
