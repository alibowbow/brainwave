import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';

const BASE = (process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173').replace(/\/?$/, '/');
const browser = await chromium.launch({
  executablePath: process.env.SCENE_BROWSER_PATH || undefined,
  headless: true,
  // Exercise the restrictive policy; never disable browser autoplay protection.
  args: ['--no-sandbox', '--autoplay-policy=document-user-activation-required'],
});
const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, serviceWorkers: 'block' });
await context.addInitScript(() => {
  const NativeContext = window.AudioContext;
  window.__audioContexts = [];
  window.__oscillatorsCreated = 0;
  window.__sessionGraphsCreated = 0;
  window.AudioContext = class extends NativeContext {
    constructor(...args) { super(...args); window.__audioContexts.push(this); }
    createAnalyser() { window.__sessionGraphsCreated++; return super.createAnalyser(); }
    createOscillator() { window.__oscillatorsCreated++; return super.createOscillator(); }
  };
});
const page = await context.newPage();
page.setDefaultTimeout(60_000);
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
const hash = () => page.evaluate(() => location.hash);
const button = (name) => page.getByRole('button', { name, exact: true, includeHidden: true }).first();
const press = (name) => button(name).dispatchEvent('click');
const playing = () => button('일시정지').waitFor({ state: 'attached' });
const stopped = () => button('재생').waitFor({ state: 'attached' });
const typeLink = async (address, expected = address) => {
  await page.evaluate((next) => { location.hash = next; }, address);
  await page.waitForFunction((expected) => location.hash === expected, expected);
};

try {
  for (let attempt = 0; attempt < 20; attempt++) {
    try { await page.goto(`${BASE}#/play/focus`); break; }
    catch (error) { if (attempt === 19) throw error; await new Promise((resolve) => setTimeout(resolve, 250)); }
  }
  // Cold focus link attempts resume, but a blocked context must not count time,
  // write a recent session, show Pause, create voices, or hide the tap fallback.
  await page.waitForSelector('h1:has-text("깊은 집중")');
  await page.locator('[data-playback-hint="blocked"]').waitFor();
  await stopped();
  assert.equal(await hash(), '#/play/focus');
  assert.equal(await page.evaluate(() => localStorage.getItem('mc_brain_last')), null);
  assert.equal(await page.evaluate(() => window.__oscillatorsCreated), 0);
  const initialTimer = await page.locator('[aria-label^="남은 시간"]').first().getAttribute('aria-label');
  await page.waitForTimeout(1500);
  assert.equal(await page.locator('[aria-label^="남은 시간"]').first().getAttribute('aria-label'), initialTimer);
  assert.equal(await page.evaluate(() => window.__audioContexts[0].state), 'suspended');
  await page.getByRole('button', { name: '눌러서 재생', exact: true }).click();
  await playing();
  assert.equal(await page.getByRole('dialog').count(), 0); // exactly one tap
  assert.equal(await page.evaluate(() => window.__audioContexts[0].state), 'running');
  assert.match(await page.evaluate(() => JSON.parse(localStorage.getItem('mc_brain_last')).name), /깊은 집중/);
  await page.waitForFunction((before) => document.querySelector('[aria-label^="남은 시간"]')?.getAttribute('aria-label') !== before, initialTimer);

  // Hash navigation can start immediately once normal browser policy permits.
  await typeLink('#/play/amb/cosmic');
  await page.waitForSelector('h1:has-text("우주 명상")');
  await playing();
  assert.equal(await page.locator('[data-playback-hint]').count(), 0);
  await page.evaluate(() => { window.__copied = null; navigator.clipboard.writeText = async (text) => { window.__copied = text; }; });
  await press('이 루틴 링크 복사');
  await page.waitForFunction(() => window.__copied);
  assert.equal(await page.evaluate(() => window.__copied), `${BASE}#/play/amb/cosmic`);

  // Back/Forward between different play links restores the correct preset.
  await page.goBack();
  await page.waitForSelector('h1:has-text("깊은 집중")');
  await playing();
  await page.goForward();
  await page.waitForSelector('h1:has-text("우주 명상")');
  await playing();
  const starts = await page.evaluate(() => window.__sessionGraphsCreated);
  await page.evaluate(() => window.dispatchEvent(new HashChangeEvent('hashchange')));
  await page.waitForTimeout(100);
  assert.equal(await page.evaluate(() => window.__sessionGraphsCreated), starts);
  assert.equal(await page.evaluate(() => window.__audioContexts.length), 1);

  // Returning to the same paused session must not auto-resume/reset it.
  await press('일시정지'); await stopped();
  await typeLink('#/guide');
  await page.goBack();
  await page.waitForSelector('h1:has-text("우주 명상")');
  await stopped();
  assert.equal(await page.evaluate(() => window.__sessionGraphsCreated), starts);

  // All link families use the same startup path, including device-local saves.
  await typeLink('#/play/nature/deep_sea');
  await page.waitForSelector('h1:has-text("깊은 바다")');
  await playing();
  assert.equal(await hash(), '#/play/nature/deep_sea');
  await page.evaluate(() => {
    const last = JSON.parse(localStorage.getItem('mc_brain_last'));
    localStorage.setItem('mc_brain_presets', JSON.stringify([{ ...last, id: 'link-test', name: '링크 테스트', createdAt: new Date().toISOString() }]));
  });
  await page.reload();
  // Reload can again require a gesture; accept either result according to the browser.
  await page.waitForSelector('h1');
  await page.waitForFunction(() => !document.querySelector('[data-playback-hint="starting"]'));
  if (await page.locator('[data-playback-hint="blocked"]').count()) await page.getByRole('button', { name: '눌러서 재생' }).click();
  await playing();
  await typeLink('#/play/user/link-test');
  await page.waitForSelector('h1:has-text("링크 테스트")'); await playing();
  await typeLink('#/play/last');
  await page.waitForSelector('h1:has-text("링크 테스트")'); await playing();

  await typeLink('#/play/amb/nowhere', '');
  await page.waitForFunction(() => location.hash === '');
  assert.equal(await button('일시정지').count(), 0);
  assert.equal(await page.locator('[data-playback-hint]').count(), 0);

  // Leaving while resume is pending cannot later start hidden sound.
  await page.goto('about:blank');
  await page.goto(`${BASE}#/play/relax`);
  await page.locator('[data-playback-hint="blocked"]').waitFor();
  await page.goBack();
  await page.waitForFunction(() => location.hash === '');
  await page.goForward();
  await page.locator('[data-playback-hint]').waitFor();
  await typeLink('#/guide');
  await page.waitForTimeout(1500);
  assert.equal(await page.evaluate(() => window.__oscillatorsCreated), 0);
  assert.equal(await page.locator('[data-playback-hint]').count(), 0);

  assert.deepEqual(errors, []);
  console.log('PASS: cold-link autoplay policy fallback, one-tap retry, accurate timer/history, warm hash autoplay, all link families, Back/Forward, reload, idempotence, invalid links and cancelled startup.');
} finally {
  await browser.close();
}
