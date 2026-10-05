import { ownBrowserServer } from './owned-browser.mjs';
import { beginVerificationProvenance } from './verification-provenance.mjs';
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const BASE = (process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173').replace(/\/?$/, '/');
// Drives the deep-focus routine end to end. SwiftShader provides WebGL 2 on
// GPU-less CI runners so the real renderer (not the poster) is exercised.
const reportOutput = process.env.SCENE_SCREENSHOT_DIR || 'artifacts';
await mkdir(reportOutput, { recursive: true });
const provenance = await beginVerificationProvenance({ baseUrl: BASE, outputDirs: [reportOutput] });
const report = { status: 'running', startedAt: new Date().toISOString(), provenance: provenance.data, cleanupErrors: [],
  scope: 'Existing protected focus assertions with real mouse/keyboard input; screenshot size remains a detail smoke check, not artistic approval.',
  lifecycleScope: 'Original final gate proves canvas removal from DOM, not native context loss or physical GPU memory reclamation.',
  errors: [], checks: [] };
const persist = () => writeFile(`${reportOutput}/focus-verification.json`, JSON.stringify(report, null, 2) + '\n');
const stage = async name => { report.currentStep = name; await persist(); };
await persist();
let owned;
const bounded = async (run, timeoutMs, label) => {
  let timer;
  try { return await Promise.race([run(), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} exceeded ${timeoutMs}ms`)), timeoutMs); })]); }
  finally { clearTimeout(timer); }
};
try {
const browserServer = await chromium.launchServer({
  executablePath: process.env.SCENE_BROWSER_PATH || undefined,
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
owned = ownBrowserServer(browserServer, {
  onError: error => { report.cleanupErrors.push(error); report.status = 'failed'; process.exitCode = 1; },
});
report.browserOwnership = owned.state;
const interrupted = signal => {
  report.interrupted = signal; report.status = 'failed'; process.exitCode = 1;
  void persist().catch(error => report.cleanupErrors.push({ stage: 'signal-report', message: String(error) })).finally(() => owned.close());
};
process.once('SIGTERM', () => interrupted('SIGTERM'));
process.once('SIGINT', () => interrupted('SIGINT'));

const browser = await bounded(() => chromium.connect(browserServer.wsEndpoint()), 10_000, 'owned browser connect');
const page = await browser.newPage({ viewport: { width: 1024, height: 700 }, serviceWorkers: 'block' });
provenance.attach(page, 'application');
// Software WebGL is slow on shared runners; give every step room.
page.setDefaultTimeout(120_000);
const errors = report.errors;
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => {
  if (message.type() === 'error' && /three|webgl|shader|program/i.test(message.text())) errors.push(message.text());
});
const output = process.env.SCENE_SCREENSHOT_DIR;
if (output) await mkdir(output, { recursive: true });
const scene = page.locator('.rainy-window').first();
// Reveal controls with real pointer movement, then issue a trusted UI click.
const press = async (name) => {
  const control = page.getByRole('button', { name, exact: true, includeHidden: true }).first();
  const box = await control.boundingBox();
  if (box) await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await control.click();
};

  await stage('load protected scene');
  for (let attempt = 0; attempt < 20; attempt++) {
    try { await page.goto(process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173'); break; }
    catch (error) { if (attempt === 19) throw error; await new Promise((resolve) => setTimeout(resolve, 250)); }
  }

  const card = page.locator('article', { has: page.locator('h3', { hasText: '깊은 집중' }) }).first();
  await card.getByRole('button', { name: '재생', exact: true }).click();
  const notice = page.getByRole('button', { name: '확인하고 시작', exact: true });
  if (await notice.isVisible().catch(() => false)) await notice.click();

  await page.waitForSelector('.rainy-window[data-state="ready"]', { timeout: 240_000 });
  assert.equal(await page.locator('.landscape').count(), 0, 'the illustrated landscape is gone');
  assert.equal(await page.locator('.landscape-rain').count(), 0, 'the CSS rain overlay is gone');
  assert.equal(await page.locator('.rainy-window-canvas').count(), 1, 'one shared canvas');
  assert.equal(await scene.getAttribute('data-motion'), 'running');
  assert.equal(await page.evaluate(() => location.hash), '#/play/focus', 'the address names the routine');

  // A drawn night scene compresses poorly; a blank or flat canvas would be tiny.
  // Page screenshots skip element-stability waits, which crawl under software WebGL.
  await page.waitForTimeout(2500);
  const box = await scene.boundingBox();
  const shot = await page.screenshot({ animations: 'disabled', clip: box });
  assert.ok(shot.length > 90_000, `scene renders detail (${shot.length} bytes)`);
  if (output) await page.screenshot({ animations: 'disabled', path: `${output}/focus-player.png` });

  // Dragging over the view turns it a little and letting go eases it back;
  // a press on the controls never starts a drag.
  const lookState = () => page.evaluate(() => document.querySelector('.rainy-window')?.getAttribute('data-look') ?? null);
  await stage('native scene drag and control exclusion');
  const dragBox = await page.locator('.rainy-window-canvas').boundingBox();
  assert.ok(dragBox, 'the real protected canvas is visible');
  const dragStart = { x: dragBox.x + dragBox.width / 2, y: dragBox.y + dragBox.height / 2 };
  await page.mouse.move(dragStart.x, dragStart.y);
  await page.mouse.down();
  await page.mouse.move(dragStart.x + 160, dragStart.y + 0, { steps: 8 });
  assert.equal(await lookState(), 'drag', 'a drag over the scene turns the view');
  await page.mouse.up();
  assert.equal(await lookState(), null, 'letting go eases the view back');
  const timeBox = await page.locator('[aria-label^="남은 시간"]').first().boundingBox();
  assert.ok(timeBox, 'the real transport control is visible');
  const controlPoint = { x: timeBox.x + timeBox.width / 2, y: timeBox.y + timeBox.height / 2 };
  await page.mouse.move(controlPoint.x, controlPoint.y);
  await page.waitForFunction(point => {
    const time = document.querySelector('[aria-label^="남은 시간"]'), hit = document.elementFromPoint(point.x, point.y);
    return !!time && (hit === time || time.contains(hit));
  }, controlPoint);
  report.nativeInput = { method: 'Playwright native mouse move/down/up', dragStart, controlPoint };
  await page.mouse.down();
  assert.equal(await lookState(), null, 'the controls never start a drag');
  await page.mouse.up();

  // Pausing the session freezes the scene (and keeps the rest of the test light).
  await press('일시정지');
  await page.waitForFunction(() => document.querySelector('.rainy-window')?.getAttribute('data-motion') === 'paused');

  await stage('same-canvas immersive roundtrip, resume and reduced motion');
  // Fullscreen moves the same canvas instead of building a second renderer.
  await press('전체 화면 보기');
  await page.waitForFunction(() => !!document.querySelector('[aria-label="몰입 화면"] .rainy-window-canvas'));
  assert.equal(await page.locator('.rainy-window-canvas').count(), 1, 'fullscreen reuses the canvas');
  if (output) await page.screenshot({ animations: 'disabled', path: `${output}/focus-fullscreen.png` });
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('[aria-label="몰입 화면"]') && !!document.querySelector('.rainy-window .rainy-window-canvas'));

  // Resuming animates again; reduced motion freezes it.
  await press('재생');
  await page.waitForFunction(() => document.querySelector('.rainy-window')?.getAttribute('data-motion') === 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.querySelector('.rainy-window')?.getAttribute('data-motion') === 'paused');

  await stage('session stop removes protected canvas');
  // Ending the session releases the renderer.
  await press('세션 종료');
  await page.waitForFunction(() => !document.querySelector('.rainy-window-canvas'));

  assert.deepEqual(errors, []);
  report.checks.push({ name: 'all original protected scene assertions', status: 'passed' });
  report.status = 'passed';
} catch (error) {
  report.status = 'failed';
  report.failure = { step: report.currentStep, message: String(error), stack: error.stack };
  console.error(error);
  process.exitCode = 1;
} finally {
  await owned?.close();
  try { if (!await provenance.finish()) { report.status = 'failed'; process.exitCode = 1; } }
  catch (error) { report.provenance.errors.push({ phase: 'final snapshot', message: String(error) }); report.status = 'failed'; process.exitCode = 1; }
  if (report.interrupted || report.cleanupErrors.length || !owned?.state.terminationConfirmed) { report.status = 'failed'; process.exitCode = 1; }
  report.finishedAt = new Date().toISOString();
  await persist();
}

if (report.status === 'passed') console.log('PASS: deep-focus plays the live rainy study (no illustration or CSS rain), renders detail, turns a little under a drag, freezes on pause, shares one canvas with fullscreen, resumes, honours reduced motion, and releases on stop.');
