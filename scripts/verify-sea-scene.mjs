import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

// Drives the ocean-shore routine end to end: the sea painted in oils replaces
// the illustrated coast. SwiftShader provides WebGL 2 on GPU-less CI runners so
// the real renderer (not the still) is exercised.
const BASE = (process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173').replace(/\/?$/, '/');
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || undefined,
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 700 }, serviceWorkers: 'block' });
// Software WebGL is slow on shared runners; give every step room.
page.setDefaultTimeout(120_000);
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => {
  if (message.type() === 'error' && /webgl|shader|program|framebuffer/i.test(message.text())) errors.push(message.text());
});
const output = process.env.SCENE_SCREENSHOT_DIR;
if (output) await mkdir(output, { recursive: true });
const scene = page.locator('.oil-sea').first();
const motion = () => scene.getAttribute('data-motion');
// Player controls fade out after a few seconds; under software WebGL a normal
// click can outlast that, so trigger them directly.
const press = (name) => page.getByRole('button', { name, exact: true, includeHidden: true }).first().dispatchEvent('click');
const shoot = async () => page.screenshot({ clip: await scene.boundingBox() });

try {
  for (let attempt = 0; attempt < 20; attempt++) {
    try { await page.goto(`${BASE}#/play/amb/ocean_shore`); break; }
    catch (error) { if (attempt === 19) throw error; await new Promise((resolve) => setTimeout(resolve, 250)); }
  }

  // Opened from a link the routine waits for a tap, showing the finished painting.
  await page.waitForSelector('h1:has-text("파도 해변")');
  await page.waitForSelector('.oil-sea[data-state="ready"]', { timeout: 240_000 });
  assert.equal(await page.locator('.landscape').count(), 0, 'the illustrated coast is gone');
  assert.equal(await page.locator('.oil-sea-canvas').count(), 1, 'one shared canvas');
  assert.equal(await motion(), 'paused');
  // A painted seascape compresses poorly; a blank or flat canvas would be tiny.
  await page.waitForTimeout(1500);
  const still = await shoot();
  assert.ok(still.length > 150_000, `the painting renders detail (${still.length} bytes)`);
  if (output) await page.screenshot({ path: `${output}/sea-player.png` });

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
  await page.evaluate(() => {
    const canvas = document.querySelector('.oil-sea-canvas');
    const rect = canvas.getBoundingClientRect();
    const init = { bubbles: true, isPrimary: true, pointerId: 7, pointerType: 'mouse', button: 0, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 };
    canvas.dispatchEvent(new PointerEvent('pointerdown', init));
    window.dispatchEvent(new PointerEvent('pointermove', { ...init, clientX: init.clientX + 200, clientY: init.clientY + 60 }));
  });
  assert.equal(await lookState(), 'drag', 'a drag over the scene moves the view');
  await page.waitForTimeout(1500);
  const turned = await shoot();
  assert.ok(turned.length > 150_000, `the moved view keeps its detail (${turned.length} bytes)`);
  await page.evaluate(() => window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, isPrimary: true, pointerId: 7, pointerType: 'mouse', button: 0 })));
  assert.equal(await lookState(), null, 'letting go eases the view back');
  await page.evaluate(() => {
    const time = document.querySelector('[aria-label^="남은 시간"]');
    time.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, isPrimary: true, pointerId: 8, pointerType: 'mouse', button: 0 }));
  });
  assert.equal(await lookState(), null, 'the controls never start a drag');
  await page.evaluate(() => window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, isPrimary: true, pointerId: 8, pointerType: 'mouse', button: 0 })));

  // Pausing the session freezes the scene (and keeps the rest of the test light).
  await press('일시정지');
  await page.waitForFunction(() => document.querySelector('.oil-sea')?.getAttribute('data-motion') === 'paused');

  // Fullscreen moves the same canvas instead of building a second renderer.
  await press('전체 화면 보기');
  await page.waitForFunction(() => !!document.querySelector('[aria-label="몰입 화면"] .oil-sea-canvas'));
  assert.equal(await page.locator('.oil-sea-canvas').count(), 1, 'fullscreen reuses the canvas');
  if (output) await page.screenshot({ path: `${output}/sea-fullscreen.png` });
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('[aria-label="몰입 화면"]') && !!document.querySelector('.oil-sea .oil-sea-canvas'));

  // Resuming animates again; reduced motion freezes it.
  await press('재생');
  await page.waitForFunction(() => document.querySelector('.oil-sea')?.getAttribute('data-motion') === 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.querySelector('.oil-sea')?.getAttribute('data-motion') === 'paused');

  // Ending the session releases the renderer.
  await press('세션 종료');
  await page.waitForFunction(() => !document.querySelector('.oil-sea-canvas'));

  assert.deepEqual(errors, []);
  console.log('PASS: the ocean shore plays in front of the sea painted in oils (no illustration), shows the finished painting until played, moves while playing, moves across a little under a drag, freezes on pause, shares one canvas with fullscreen, resumes, honours reduced motion, and releases on stop.');
} finally {
  await browser.close();
}
