import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';

// Every page and every routine on the player has an address after `#`:
// links open it, the player can copy it, and Back/Forward/reload respect it.
const BASE = (process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173').replace(/\/?$/, '/');
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || undefined,
  headless: true,
  args: ['--no-sandbox', '--autoplay-policy=user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, serviceWorkers: 'block' });
page.setDefaultTimeout(60_000);
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
const hash = () => page.evaluate(() => location.hash);
const currentPage = () => page.evaluate(() => [...document.querySelectorAll('[aria-current="page"]')].map((item) => item.textContent.trim()).join('|'));
const button = (name) => page.getByRole('button', { name, exact: true, includeHidden: true }).first();
// Player controls fade out after a few seconds; trigger them directly.
const press = (name) => button(name).dispatchEvent('click');

try {
  for (let attempt = 0; attempt < 20; attempt++) {
    try { await page.goto(`${BASE}#/play/amb/cosmic`); break; }
    catch (error) { if (attempt === 19) throw error; await new Promise((resolve) => setTimeout(resolve, 250)); }
  }

  // A shared link opens the routine on the player, ready to play (sound needs a tap).
  await page.waitForSelector('h1:has-text("우주 명상")');
  assert.equal(await hash(), '#/play/amb/cosmic');
  await button('재생').waitFor({ state: 'attached' });

  // The player copies a clean link to the routine.
  await page.evaluate(() => { window.__copied = null; navigator.clipboard.writeText = async (text) => { window.__copied = text; }; });
  await press('이 루틴 링크 복사');
  await page.waitForFunction(() => window.__copied);
  assert.equal(await page.evaluate(() => window.__copied), `${BASE}#/play/amb/cosmic`);

  // The first play starts it (after the headphone notice when it applies).
  await press('재생');
  const notice = page.getByRole('button', { name: '확인하고 시작', exact: true });
  if (await notice.isVisible().catch(() => false)) await notice.click();
  await button('일시정지').waitFor({ state: 'attached' });
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('mc_brain_last') || 'null')?.name), '우주 명상');

  // Back goes to the app's home with the plain address; Forward returns to the running session.
  await page.goBack();
  await page.waitForFunction(() => location.hash === '' && !document.querySelector('h1')?.textContent?.includes('우주 명상'));
  await page.goForward();
  await page.waitForFunction(() => location.hash === '#/play/amb/cosmic');
  await button('일시정지').waitFor({ state: 'attached' });
  await press('세션 종료');

  // Typing a page address switches to it.
  for (const [address, label] of [['#/insights', '리포트'], ['#/guide', '뇌파 가이드'], ['#/nature', '자연의 소리']]) {
    await page.evaluate((next) => { location.hash = next; }, address);
    await page.waitForFunction((expected) => [...document.querySelectorAll('[aria-current="page"]')].some((item) => item.textContent.includes(expected)), label);
    assert.equal(await hash(), address);
  }
  await page.goBack();
  await page.waitForFunction(() => location.hash === '#/guide');
  assert.match(await currentPage(), /뇌파 가이드/);

  // A routine this device does not have lands home; reloading a routine keeps it.
  await page.goto('about:blank');
  await page.goto(`${BASE}#/play/amb/nowhere`);
  await page.waitForFunction(() => location.hash === '');
  await page.goto('about:blank');
  await page.goto(`${BASE}#/play/relax`);
  await page.waitForSelector('h1:has-text("불멍")');
  await page.reload();
  await page.waitForSelector('h1:has-text("불멍")');
  assert.equal(await hash(), '#/play/relax');

  assert.deepEqual(errors, []);
  console.log('PASS: links open routines ready on the player, the player copies a clean link, pages have typed addresses, and Back, Forward and reload follow them.');
} finally {
  await browser.close();
}
