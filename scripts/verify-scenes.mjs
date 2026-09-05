import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

// Run against a dev or production preview server. CI installs Chromium; local
// environments may provide SCENE_BROWSER_PATH without changing dependencies.
const browser = await chromium.launch({ executablePath: process.env.SCENE_BROWSER_PATH || undefined, headless: true, args: ['--no-sandbox', '--disable-gpu'] });
// Network failure tests must reach routing rather than a previously cached PWA response.
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, serviceWorkers: 'block' });
await page.addInitScript(() => {
  window.sceneTestAudio = [];
  const createElement = document.createElement.bind(document);
  document.createElement = function(name, ...args) {
    const element = createElement(name, ...args);
    if (name === 'audio') window.sceneTestAudio.push(element);
    return element;
  };
});
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const output = process.env.SCENE_SCREENSHOT_DIR;
if (output) await mkdir(output, { recursive: true });
const capture = async name => { if (output) await page.screenshot({ path: `${output}/${name}.png` }); };
const scene = () => page.locator('.landscape');
const selected = async name => {
  await page.getByRole('button', { name, exact: true }).click();
  await page.waitForFunction(() => {
    const el = document.querySelector('.landscape');
    return el?.dataset.scene === el?.dataset.requestedScene && !el.querySelector('.landscape-status');
  });
  await page.evaluate(() => window.scrollTo(0, 0));
};
const saved = () => page.evaluate(() => JSON.parse(localStorage.getItem('mc_nature_state')));
try {
  for (let attempt = 0; attempt < 20; attempt++) {
    try { await page.goto(process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173'); break; }
    catch (error) { if (attempt === 19) throw error; await new Promise(resolve => setTimeout(resolve, 250)); }
  }
  await page.getByRole('button', { name: '소리 조절', exact: true }).click();
  await selected('시골 여름밤 1개 소리');
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 344, height: 882 }]) {
    await page.setViewportSize(viewport);
    await page.evaluate(() => document.fonts.ready);
    const box = await page.locator('.sound-stage').boundingBox();
    assert.ok(box.y < 110, `scene begins above the fold at ${viewport.width}`);
    assert.ok(box.height > viewport.height * .58, `scene dominates ${viewport.width}`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `no overflow at ${viewport.width}`);
    await capture(`rural-${viewport.width}`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const initialHeight = (await page.locator('.sound-stage').boundingBox()).height;
  await selected('여름 계곡 3개 소리');
  assert.equal((await page.locator('.sound-stage').boundingBox()).height, initialHeight);
  // Every primary object must have a real mouse/touch target, including at
  // portrait crops where the former invisible areas were disconnected.
  const cards = await page.locator('.sound-mix-grid > button').allTextContents();
  for (let i = 0; i < cards.length; i++) {
    await page.locator('.sound-mix-grid > button').nth(i).click();
    await page.waitForFunction(() => { const el = document.querySelector('.landscape'); return el?.dataset.scene === el?.dataset.requestedScene && !el.querySelector('.landscape-status'); });
    await page.evaluate(() => window.scrollTo(0, 0));
    const targets = page.locator('.landscape-point');
    const boxes = await targets.evaluateAll(elements => elements.map(el => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }));
    for (let a = 0; a < boxes.length; a++) for (let b = a + 1; b < boxes.length; b++) {
      const overlap = Math.min(boxes[a].x + 48, boxes[b].x + 48) > Math.max(boxes[a].x, boxes[b].x) && Math.min(boxes[a].y + 48, boxes[b].y + 48) > Math.max(boxes[a].y, boxes[b].y);
      assert.equal(overlap, false, `touch targets overlap in ${cards[i]}`);
    }
    for (let target = 0; target < await targets.count(); target++) {
      await targets.nth(target).click();
      assert.ok(await page.locator('.scene-inspector').isVisible());
      assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('type')), 'range');
      await page.getByRole('button', { name: '소리 조절 닫기', exact: true }).click();
    }
    await capture(`scene-${i}`);
  }
  await selected('모닥불 캠핑 3개 소리');
  await page.locator('.sound-option').filter({ hasText: '빗소리' }).click();
  assert.equal((await saved()).sceneId, 'campfire', 'adding sound preserves campfire');
  assert.equal((await saved()).mixId, null);
  const beforeLayers = (await saved()).layers;
  await page.getByRole('checkbox', { name: '소리 유지', exact: true }).check();
  await selected('겨울 산장 2개 소리');
  assert.deepEqual((await saved()).layers, beforeLayers, 'changing only scenery keeps audio');
  await page.reload();
  // Navigate directly back after reload; scene ID is persisted separately.
  await page.getByRole('button', { name: '자연음', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.landscape')?.dataset.scene === 'winter_lodge');
  await selected('시골 여름밤 1개 소리');
  await page.locator('.sound-play').click();
  await page.waitForFunction(() => { return window.sceneTestAudio.some(a => !a.paused && a.currentTime > .1); });
  assert.equal(await scene().getAttribute('data-motion'), 'running');
  await page.evaluate(() => document.documentElement.classList.add('reduce-motion'));
  await page.waitForFunction(() => document.querySelector('.landscape')?.dataset.motion === 'paused');
  await page.evaluate(() => document.documentElement.classList.remove('reduce-motion'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.querySelector('.landscape')?.dataset.motion === 'paused');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: '시골 풀벌레 조절', exact: true }).click();
  await page.locator('.scene-inspector').getByRole('button', { name: '음소거', exact: true }).click();
  assert.equal(await scene().getAttribute('data-scene'), 'rural_summer_night');
  assert.ok(await page.locator('.landscape-point.is-quiet').count());
  await page.getByRole('button', { name: '소리 조절 닫기', exact: true }).click();
  await selected('모닥불 캠핑 3개 소리');
  await page.waitForFunction(() => { const v = document.querySelector('.landscape-video'); return v && !v.paused && v.currentTime > .1; });
  await page.evaluate(() => { window.sceneVideoBefore = document.querySelector('.landscape-video'); });
  await page.getByRole('button', { name: '장면만 보기', exact: true }).click();
  assert.ok(await page.evaluate(() => window.sceneVideoBefore === document.querySelector('.landscape-video')), 'fullscreen retains video');
  await page.getByRole('combobox', { name: '조절할 소리', exact: true }).selectOption('fire');
  assert.ok(await page.locator('.scene-inspector').isVisible());
  await page.getByRole('button', { name: '소리 조절 닫기', exact: true }).click();
  await page.locator('.sound-play').click();
  await page.waitForFunction(() => document.querySelector('.landscape-video')?.paused);
  await capture('fullscreen');
  await page.getByRole('button', { name: '전체화면 나가기', exact: true }).click();
  await page.waitForFunction(() => !document.querySelector('.nature-viewer-root'));
  await selected('시골 여름밤 1개 소리');
  await page.route('**/bamboo-v5.webp*', route => route.abort());
  await page.getByRole('button', { name: '대나무숲 3개 소리', exact: true }).click();
  await page.getByRole('button', { name: '다시 불러오기', exact: true }).waitFor();
  assert.equal(await scene().getAttribute('data-scene'), 'rural_summer_night', 'failed artwork retains previous scene');
  await page.unroute('**/bamboo-v5.webp*');
  await page.getByRole('button', { name: '다시 불러오기', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.landscape')?.dataset.scene === 'bamboo_grove');
  await page.evaluate(() => document.documentElement.classList.remove('dark'));
  await page.evaluate(() => window.scrollTo(0, 0));
  await capture('light-mobile');
  assert.deepEqual(errors, []);
  console.log('PASS: scene prominence at 4 widths; all 13 scenes and their touch targets; inline focus; independent persisted scenery; real recording playback; mute; reduced motion; fullscreen video continuity and controls; artwork failure/retry.');
} finally { await browser.close(); }
