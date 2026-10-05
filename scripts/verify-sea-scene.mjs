import { ownBrowserServer } from './owned-browser.mjs';
import { beginVerificationProvenance } from './verification-provenance.mjs';
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

// Drives the ocean-shore routine end to end: the sea painted in oils replaces
// the illustrated coast. SwiftShader provides WebGL 2 on GPU-less CI runners so
// the real renderer (not the still) is exercised.
const BASE = (process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173').replace(/\/?$/, '/');
const reportOutput = process.env.SCENE_SCREENSHOT_DIR || 'artifacts';
await mkdir(reportOutput, { recursive: true });
const provenance = await beginVerificationProvenance({ baseUrl: BASE, outputDirs: [reportOutput] });
const report = { status: 'running', startedAt: new Date().toISOString(), provenance: provenance.data, cleanupErrors: [],
  scope: 'Existing protected sea assertions with real mouse/keyboard input; screenshot size remains a detail smoke check, not artistic approval.',
  lifecycleScope: 'Original final gate proves canvas removal from DOM, not native context loss or physical GPU memory reclamation.',
  errors: [], checks: [] };
const persist = () => writeFile(`${reportOutput}/sea-verification.json`, JSON.stringify(report, null, 2) + '\n');
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
  if (message.type() === 'error' && /webgl|shader|program|framebuffer/i.test(message.text())) errors.push(message.text());
});
const output = process.env.SCENE_SCREENSHOT_DIR;
if (output) await mkdir(output, { recursive: true });
const scene = page.locator('.oil-sea').first();
const motion = () => scene.getAttribute('data-motion');
// Reveal controls with real pointer movement, then issue a trusted UI click.
const press = async (name) => {
  const control = page.getByRole('button', { name, exact: true, includeHidden: true }).first();
  const box = await control.boundingBox();
  if (box) await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await control.click();
};
const shoot = async () => page.screenshot({ animations: 'disabled', clip: await scene.boundingBox() });

  await stage('load protected scene');
  for (let attempt = 0; attempt < 20; attempt++) {
    try { await page.goto(`${BASE}#/play/amb/ocean_shore`); break; }
    catch (error) { if (attempt === 19) throw error; await new Promise((resolve) => setTimeout(resolve, 250)); }
  }

  // Linked routines autoplay when permitted, or offer one tap under normal policy.
  await page.waitForSelector('h1:has-text("파도 해변")');
  await page.waitForSelector('.oil-sea[data-state="ready"]', { timeout: 240_000 });
  assert.equal(await page.locator('.landscape').count(), 0, 'the illustrated coast is gone');
  assert.equal(await page.locator('.oil-sea-canvas').count(), 1, 'one shared canvas');
  const fallback = page.getByRole('button', { name: '눌러서 재생', exact: true });
  if (await fallback.isVisible().catch(() => false)) await fallback.click();
  await page.waitForFunction(() => document.querySelector('.oil-sea')?.getAttribute('data-motion') === 'running');
  await press('일시정지');
  await page.waitForFunction(() => document.querySelector('.oil-sea')?.getAttribute('data-motion') === 'paused');
  assert.equal(await motion(), 'paused');
  // A painted seascape compresses poorly; a blank or flat canvas would be tiny.
  await page.waitForTimeout(1500);
  const still = await shoot();
  assert.ok(still.length > 150_000, `the painting renders detail (${still.length} bytes)`);
  if (output) await page.screenshot({ animations: 'disabled', path: `${output}/sea-player.png` });

  // Playing sets the sea moving: the surf rolls on between two looks.
  await press('재생');
  const notice = page.getByRole('button', { name: '확인하고 시작', exact: true });
  if (await notice.isVisible().catch(() => false)) await notice.click();
  await page.waitForFunction(() => document.querySelector('.oil-sea')?.getAttribute('data-motion') === 'running');
  await page.waitForTimeout(2500);
  const before = await shoot();
  await page.waitForTimeout(2500);
  const after = await shoot();
  assert.ok(!before.equals(after), 'the sea moves while the routine plays');
  assert.ok(after.length > 150_000, `the moving painting keeps its detail (${after.length} bytes)`);

  // Dragging over the view moves it across a little and letting go eases it
  // back; a press on the controls never starts a drag.
  const lookState = () => page.evaluate(() => document.querySelector('.oil-sea')?.getAttribute('data-look') ?? null);
  await stage('native scene drag and control exclusion');
  const dragBox = await page.locator('.oil-sea-canvas').boundingBox();
  assert.ok(dragBox, 'the real protected canvas is visible');
  const dragStart = { x: dragBox.x + dragBox.width / 2, y: dragBox.y + dragBox.height / 2 };
  await page.mouse.move(dragStart.x, dragStart.y);
  await page.mouse.down();
  await page.mouse.move(dragStart.x + 200, dragStart.y + 60, { steps: 8 });
  assert.equal(await lookState(), 'drag', 'a drag over the scene moves the view');
  // The painting slides under the view on the page, not by painting it again.
  const slid = () => page.evaluate(() => document.querySelector('.oil-sea-canvas')?.style.transform ?? '');
  await page.waitForFunction(() => /translate3d\(\d/.test(document.querySelector('.oil-sea-canvas')?.style.transform ?? ''));
  const turned = await shoot();
  assert.ok(turned.length > 150_000, `the moved view keeps its detail (${turned.length} bytes)`);
  await page.mouse.up();
  assert.equal(await lookState(), null, 'letting go eases the view back');
  await page.waitForFunction(() => !(document.querySelector('.oil-sea-canvas')?.style.transform ?? ''));
  assert.equal(await slid(), '', 'the painting settles back under the view');
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
  await page.waitForFunction(() => document.querySelector('.oil-sea')?.getAttribute('data-motion') === 'paused');

  await stage('same-canvas immersive roundtrip, resume and reduced motion');
  // Fullscreen moves the same canvas instead of building a second renderer.
  await press('전체 화면 보기');
  await page.waitForFunction(() => !!document.querySelector('[aria-label="몰입 화면"] .oil-sea-canvas'));
  assert.equal(await page.locator('.oil-sea-canvas').count(), 1, 'fullscreen reuses the canvas');
  if (output) await page.screenshot({ animations: 'disabled', path: `${output}/sea-fullscreen.png` });
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('[aria-label="몰입 화면"]') && !!document.querySelector('.oil-sea .oil-sea-canvas'));

  // Resuming animates again; reduced motion freezes it.
  await press('재생');
  await page.waitForFunction(() => document.querySelector('.oil-sea')?.getAttribute('data-motion') === 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.querySelector('.oil-sea')?.getAttribute('data-motion') === 'paused');

  await stage('session stop removes protected canvas');
  // Ending the session releases the renderer.
  await press('세션 종료');
  await page.waitForFunction(() => !document.querySelector('.oil-sea-canvas'));

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

if (report.status === 'passed') console.log('PASS: the ocean shore plays in front of the sea painted in oils (no illustration), starts from its link with a policy-safe fallback, shows the finished painting when paused, moves while playing, moves across a little under a drag, freezes on pause, shares one canvas with fullscreen, resumes, honours reduced motion, and releases on stop.');
