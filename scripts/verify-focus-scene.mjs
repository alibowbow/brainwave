import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

// Drives the deep-focus routine end to end. SwiftShader provides WebGL 2 on
// GPU-less CI runners so the real renderer (not the poster) is exercised.
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || undefined,
  headless: true,
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 700 }, serviceWorkers: 'block' });
// Software WebGL is slow on shared runners; give every step room.
page.setDefaultTimeout(120_000);
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => {
  if (message.type() === 'error' && /three|webgl|shader|program/i.test(message.text())) errors.push(message.text());
});
const output = process.env.SCENE_SCREENSHOT_DIR;
if (output) await mkdir(output, { recursive: true });
const scene = page.locator('.rainy-window').first();
// Player controls fade out after a few seconds; under software WebGL a normal
// click can outlast that, so trigger them directly.
const press = (name) => page.getByRole('button', { name, exact: true, includeHidden: true }).first().dispatchEvent('click');

try {
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

  // A drawn night scene compresses poorly; a blank or flat canvas would be tiny.
  // Page screenshots skip element-stability waits, which crawl under software WebGL.
  await page.waitForTimeout(2500);
  const box = await scene.boundingBox();
  const shot = await page.screenshot({ clip: box });
  assert.ok(shot.length > 90_000, `scene renders detail (${shot.length} bytes)`);
  if (output) await page.screenshot({ path: `${output}/focus-player.png` });

  // Pausing the session freezes the scene (and keeps the rest of the test light).
  await press('일시정지');
  await page.waitForFunction(() => document.querySelector('.rainy-window')?.getAttribute('data-motion') === 'paused');

  // Fullscreen moves the same canvas instead of building a second renderer.
  await press('전체 화면 보기');
  await page.waitForFunction(() => !!document.querySelector('[aria-label="몰입 화면"] .rainy-window-canvas'));
  assert.equal(await page.locator('.rainy-window-canvas').count(), 1, 'fullscreen reuses the canvas');
  if (output) await page.screenshot({ path: `${output}/focus-fullscreen.png` });
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('[aria-label="몰입 화면"]') && !!document.querySelector('.rainy-window .rainy-window-canvas'));

  // Resuming animates again; reduced motion freezes it.
  await press('재생');
  await page.waitForFunction(() => document.querySelector('.rainy-window')?.getAttribute('data-motion') === 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.querySelector('.rainy-window')?.getAttribute('data-motion') === 'paused');

  // Ending the session releases the renderer.
  await press('세션 종료');
  await page.waitForFunction(() => !document.querySelector('.rainy-window-canvas'));

  assert.deepEqual(errors, []);
  console.log('PASS: deep-focus plays the live rainy study (no illustration or CSS rain), renders detail, freezes on pause, shares one canvas with fullscreen, resumes, honours reduced motion, and releases on stop.');
} finally {
  await browser.close();
}
