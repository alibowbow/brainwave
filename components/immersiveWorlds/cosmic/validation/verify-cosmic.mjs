import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import { sourceFingerprint } from './source-fingerprint.mjs';

// Run against the isolated Vite harness, without mounting or modifying the app:
// SCENE_BASE_URL=http://127.0.0.1:5193 node components/immersiveWorlds/cosmic/validation/verify-cosmic.mjs
// SCENE_BROWSER_PATH can select an already installed Chromium binary.
// SCENE_SCREENSHOT_DIR optionally saves screenshots and the factual run report.
const base = (process.env.SCENE_BASE_URL || 'http://127.0.0.1:5193').replace(/\/$/, '');
const url = `${base}${process.env.SCENE_HARNESS_PATH || '/components/immersiveWorlds/cosmic/validation/index.html'}`;
const output = process.env.SCENE_SCREENSHOT_DIR || 'components/immersiveWorlds/cosmic/validation/screenshots';
const errors = [];
const report = { url, source:await sourceFingerprint(), renderer: 'Chromium with requested SwiftShader launch flags', checks: [], limitations: [] };
if (output) await mkdir(output, { recursive: true });
let browser;
let page;
let canvas;
const press = (name) => page.getByRole('button', { name, exact: true }).click();
const metric = async (name) => {
  const raw = await canvas.getAttribute(`data-${name}`);
  assert.notEqual(raw, null, `canvas exposes data-${name}`);
  const value = Number(raw);
  assert.ok(Number.isFinite(value), `${name} is finite`);
  return value;
};
const ready = () => page.waitForSelector('.cosmic-world[data-state="ready"]', { timeout: 120_000 });
const motion = (state) => page.waitForSelector(`.cosmic-world[data-motion="${state}"]`);
const settledSize=()=>page.waitForFunction(()=>{const c=document.querySelector('.cosmic-world-canvas');if(!c)return false;const r=c.getBoundingClientRect();return c.width>0&&c.height>0&&Math.abs(c.width/c.height-r.width/r.height)<.015&&c.width<=Math.ceil(r.width*2)&&c.height<=Math.ceil(r.height*2);});

const check = (label) => { report.checks.push(label); console.log(`PASS: ${label}`); };
const screenshot = async (name) => {
  if (!output || !page) return;
  if (name !== 'cosmic-failure') {
    await page.waitForFunction(() => {
      const element = document.querySelector('.cosmic-world-canvas');
      return element && Number(getComputedStyle(element).opacity) >= 0.999;
    });
  }
  await page.screenshot({ path: `${output}/${name}.png`, fullPage: true, timeout: 120_000 });
};
const stopped = async (label) => {
  // Give the last already-requested frame a chance to finish, then require both
  // the rendered frame count and scene time to stay fixed.
  await page.waitForTimeout(250);
  const before = [await metric('frame'), await metric('time')];
  await page.waitForTimeout(500);
  const after = [await metric('frame'), await metric('time')];
  assert.deepEqual(after, before, label);
};
const advances = async (label) => {
  const before = await metric('frame');
  await page.waitForFunction((frame) => Number(document.querySelector('.cosmic-world-canvas')?.getAttribute('data-frame')) > frame, before);
  check(label);
};

try {
  browser = await chromium.launch({
    executablePath: process.env.SCENE_BROWSER_PATH || undefined,
    headless: true,
    args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
  });
  const context = await browser.newContext({ viewport: { width: 800, height: 500 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
  page = await context.newPage();
  page.setDefaultTimeout(30_000);
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && /three|webgl|shader|program|framebuffer/i.test(message.text())) errors.push(message.text());
  });
  canvas = page.locator('.cosmic-world-canvas');
  await page.goto(url);
  await ready();
  await motion('running');
  assert.equal(await canvas.count(), 1, 'one renderer canvas');
  assert.ok(await metric('draw-calls') > 0, 'actual WebGL draw calls');
  report.webglRenderer = await canvas.evaluate((element) => {
    const gl = element.getContext('webgl2');
    const extension = gl?.getExtension('WEBGL_debug_renderer_info');
    return gl ? gl.getParameter(extension ? extension.UNMASKED_RENDERER_WEBGL : gl.RENDERER) : null;
  });
  await advances('the isolated garden renders and advances');
  report.limitations.push('Behavior checks run at800×500 to keep software rasterization practical; separate full-size capture uses1280×800.');

  await canvas.evaluate((element) => { window.__cosmicCanvasForValidation = element; });
  await press('Pause');
  await motion('paused');
  await stopped('pause stops rendering and world time');
  check('pause freezes the finished scene');
  await press('Resume');
  await motion('running');
  assert.equal(await canvas.evaluate((element) => element === window.__cosmicCanvasForValidation), true, 'resume retains canvas identity');
  await advances('resume advances the same canvas');

  await canvas.evaluate((element) => { window.__cosmicCanvasForValidation = element; });
  await press('Second holder');
  await ready();
  assert.equal(await canvas.count(), 1, 'moving holders keeps one canvas');
  assert.equal(await canvas.evaluate((element) => element === window.__cosmicCanvasForValidation), true, 'the holder move retains canvas identity');
  await advances('moving between holders retains the same renderer');
  await press('Second holder');
  await ready();

  const box = await canvas.boundingBox();
  assert.ok(box && box.width > 0 && box.height > 0, 'canvas fills a visible holder');
  const startX = box.x + box.width * 0.4;
  const startY = box.y + box.height * 0.45;
  const yawBefore = await metric('yaw');
  const pulsesBeforeDrag = await metric('pulses');
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + Math.min(260, box.width * 0.45), startY + 30, { steps: 8 });
  await page.waitForTimeout(300);
  const yawDragged = await metric('yaw');
  assert.ok(Math.abs(yawDragged - yawBefore) > 0.001, 'drag changes camera yaw');
  assert.ok(Math.abs(yawDragged) < 1, 'drag stays a bounded scene adjustment');
  await page.mouse.up();
  await page.waitForTimeout(150);
  assert.equal(await metric('pulses'), pulsesBeforeDrag, 'drag does not also trigger a tap pulse');
  check('drag adjusts the view within a small range');
  // Returning a drag to its origin must never be reclassified as a tap.
  const beforeReturnDrag=await metric('pulses');
  await page.mouse.move(startX,startY);await page.mouse.down();
  await page.mouse.move(startX+120,startY,{steps:3});
  await page.mouse.move(startX,startY,{steps:3});await page.mouse.up();
  await page.waitForTimeout(150);
  assert.equal(await metric('pulses'),beforeReturnDrag,'out-and-back drag does not become a tap');
  check('an out-and-back drag never emits a touch event');

  await canvas.evaluate(element=>{
    const r=element.getBoundingClientRect();
    const init={bubbles:true,isPrimary:true,pointerType:'touch',pointerId:79,button:0,clientX:r.x+r.width*.5,clientY:r.y+r.height*.8};
    element.dispatchEvent(new PointerEvent('pointerdown',init));
    window.dispatchEvent(new PointerEvent('pointercancel',init));
    window.dispatchEvent(new PointerEvent('pointerup',init));
  });
  assert.equal(await metric('pulses'),beforeReturnDrag,'cancelled pointer never emits a tap');
  assert.equal(await page.locator('.cosmic-world').first().getAttribute('data-look'),null);
  check('pointercancel releases look and suppresses tap');


  const pulsesBeforeTouch = await metric('pulses');
  const nearbyGlow = page.getByRole('button', { name: '가까운 빛에 손길 보내기', exact: true }).first();
  await nearbyGlow.focus();
  await nearbyGlow.press('Enter');
  await page.waitForFunction((previous) => Number(document.querySelector('.cosmic-world-canvas')?.getAttribute('data-pulses')) > previous, pulsesBeforeTouch);
  check('the keyboard-accessible nearby glow control starts a local response');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await motion('paused');
  await stopped('reduced motion freezes rendering and world time');

  check('reduced motion keeps a still, rendered garden');
  const frozenPulses=await metric('pulses');
  await page.mouse.click(startX,startY);
  assert.equal(await metric('pulses'),frozenPulses,'reduced motion suppresses interactions');

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await motion('running');
  await advances('motion resumes after the preference is restored');

  // Headless Chromium does not consistently expose true background-tab
  // visibility. Exercise the engine's visibility handler deterministically and
  // disclose the distinction in the report rather than claiming an OS-tab test.
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await motion('paused');
  await stopped('the visibility handler stops rendering and world time');
  await page.evaluate(() => {
    delete document.hidden;
    delete document.visibilityState;
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await motion('running');
  await advances('the visibility handler resumes the scene');
  await page.locator('.garden-stage').evaluate(element=>{element.style.transform='translateX(200vw)';});
  await motion('paused');await stopped('offscreen observer freezes the scene');
  await page.locator('.garden-stage').evaluate(element=>{element.style.transform='';});
  await motion('running');await advances('viewport visibility resumes the same scene');
  await page.evaluate(()=>document.documentElement.classList.add('reduce-motion'));
  await motion('paused');await stopped('app-level motion preference freezes scene');
  await page.evaluate(()=>document.documentElement.classList.remove('reduce-motion'));
  await motion('running');await advances('app-level motion preference restores rendering');
  report.limitations.push('Hidden-tab coverage uses a synthetic visibilitychange with overridden document visibility, not a real operating-system tab switch.');

  await press('Pause');await motion('paused');
  await page.setViewportSize({ width: 390, height: 844 });
  await settledSize();
  const size = await canvas.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { width: element.width, height: element.height, cssWidth: rect.width, cssHeight: rect.height };
  });
  assert.ok(size.width > 0 && size.height > 0, 'portrait buffer remains allocated');
  assert.ok(size.width <= Math.ceil(size.cssWidth * 2) && size.height <= Math.ceil(size.cssHeight * 2), 'raster DPR does not exceed 2');
  assert.ok(Math.abs(size.width / size.height - size.cssWidth / size.cssHeight) < 0.03, 'buffer aspect ratio follows the portrait holder');
  assert.ok(await metric('draw-calls')>0,'paused resize redraws the real scene');
  await screenshot('cosmic-portrait');
  check('portrait resize retains a bounded raster buffer');

  for (const [name, width, height] of [['fold-portrait', 344, 882], ['fold-landscape', 882, 344]]) {
    await page.setViewportSize({ width, height });
    await settledSize();
    assert.ok(await metric('draw-calls')>0);check(`${name} redraws a still at the requested aspect`);
    await screenshot(`cosmic-${name}`);
  }

  await page.setViewportSize({width:800,height:500});await press('Resume');await motion('running');
  for (let attempt = 0; attempt < 3; attempt++) {
    await canvas.evaluate((element) => { window.__cosmicCanvasForValidation = element; });
    await press('Unmount');
    assert.equal(await canvas.count(), 0, 'unmount removes the renderer canvas');
    await page.waitForFunction(() => window.__cosmicCanvasForValidation?.getAttribute('data-disposed') === 'true', undefined, { timeout: 30_000 });
    const disposedFrame = await page.evaluate(() => window.__cosmicCanvasForValidation?.getAttribute('data-frame'));
    await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => window.__cosmicCanvasForValidation?.getAttribute('data-frame')), disposedFrame, 'the removed renderer stops drawing');
    await press('Mount');
    await ready();
    assert.equal(await canvas.count(), 1, 'remount creates exactly one canvas');
    await advances(`remount ${attempt + 1} renders again`);
  }

  // Keep behavioral coverage and captures inexpensive under software WebGL.
  // A separate initially-still portrait context verifies the DPR=2 allocation
  // without running two full animated scenes at once.
  await press('Pause');
  await motion('paused');
  const hidpiContext = await browser.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2,
    reducedMotion: 'reduce', serviceWorkers: 'block',
  });
  try {
    const hidpiPage = await hidpiContext.newPage();
    hidpiPage.on('pageerror', (error) => errors.push(error.message));
    await hidpiPage.goto(`${url}?clean`);
    await hidpiPage.waitForSelector('.cosmic-world[data-state="ready"][data-motion="paused"]', { timeout: 120_000 });
    const buffer = await hidpiPage.locator('.cosmic-world-canvas').evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { width: element.width, height: element.height, cssWidth: rect.width, cssHeight: rect.height, calls: Number(element.dataset.drawCalls), dpr: devicePixelRatio };
    });
    assert.equal(buffer.dpr, 2, 'the independent portrait context actually uses DPR 2');
    assert.ok(buffer.calls > 0 && buffer.width > 0 && buffer.height > 0, 'the DPR 2 still performs real rendering');
    assert.ok(buffer.width <= Math.ceil(buffer.cssWidth * 2) && buffer.height <= Math.ceil(buffer.cssHeight * 2), 'DPR 2 allocation stays within the cap');
    assert.ok(Math.abs(buffer.width / buffer.height - buffer.cssWidth / buffer.cssHeight) < 0.03, 'DPR 2 buffer preserves portrait aspect');
    report.hidpiPortrait = buffer;
    check('a separate DPR 2 portrait context renders a capped reduced-motion still');
  } finally {
    await hidpiContext.close();
  }

  assert.deepEqual(errors, [], 'no page or WebGL errors');
  assert.equal((await sourceFingerprint()).digest,report.source.digest,'source and built harness unchanged throughout behavior checks');
  report.status = 'passed';
  report.limitations.push('Software rendering verifies behavior and output, not native-GPU frame rate or battery usage.');
  report.limitations.push('Behavior and screenshots use device scale factor 1; a separate initially-still portrait context checks device scale factor 2.');
  report.limitations.push('Telemetry and screenshots do not establish visual quality; review the saved desktop and portrait images separately.');
  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  report.status = 'failed';
  report.error = String(error);
  report.errors = errors;
  await screenshot('cosmic-failure').catch(() => {});
  throw error;
} finally {
  if (output) await writeFile(`${output}/cosmic-validation.json`, `${JSON.stringify(report, null, 2)}\n`);
  await browser?.close();
}
