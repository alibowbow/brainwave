// Real renderer + native mouse for scene taps/look and native controls. Guard
// edge cases use explicitly dispatched PointerEvents and are labelled as such.
export async function verifyOverlay({ page, scene, check, waitFrames, control, data, screenshot }) {
  const read = () => page.evaluate(() => ({
    ...window.__deepWaterQA.diagnostics(),
    events: window.__deepWaterQA.interactions.length,
    event: window.__deepWaterQA.interactions.at(-1),
  }));
  const unchanged = (a, b) => a.inputCounters.drag === b.inputCounters.drag && a.inputCounters.touch === b.inputCounters.touch && a.events === b.events;
  const candidates = scene === 'sea'
    ? [[.63, .40], [.63, .43], [.60, .43], [.65, .40], [.60, .40], [.62, .45], [.66, .43], [.58, .43]]
    : [[.5, .68], [.5, .60], [.65, .63], [.36, .65], [.5, .75], [.65, .73], [.35, .75], [.52, .55]];
  const primary = '#primary-holder', second = '#second-holder';
  const layer = holder => `${holder} > .qa-chrome`;
  let lastSuccessfulTapTime = Number((await data()).time);
  const nativeTap = async (holder, label) => {
    // Waterfall also has a 0.55-second scene-clock guard. A slow GPU may
    // advance less simulation time than 700ms wall time; wait for real frames,
    // never bypass the guard or advance the scene directly.
    await page.waitForFunction(last => Number(document.querySelector('canvas')?.dataset.time) - last >= .60, lastSuccessfulTapTime);
    const attempts = [];
    for (const [x, y] of candidates) {
      await page.waitForTimeout(700); // Existing scene interaction cooldown is 650 ms.
      const before = await read();
      const hit = await page.evaluate(({ x, y, holder }) => {
        const target = document.elementFromPoint(x * 800, y * 600);
        const surface = document.querySelector(holder);
        return !!target && (target === surface.querySelector(':scope > .qa-chrome') || !!surface.querySelector('.deepwater-world')?.contains(target));
      }, { x, y, holder });
      await page.mouse.click(x * 800, y * 600);
      const after = await read();
      attempts.push({ x, y, hit, touches: after.inputCounters.touch - before.inputCounters.touch, callbacks: after.events - before.events });
      check(scene, `${label}: one native tap invokes one host touch`, hit && after.inputCounters.touch === before.inputCounters.touch + 1, attempts.at(-1));
      if (after.events === before.events + 1) {
        check(scene, `${label}: one tap emits exactly one real raycast callback`, after.event?.world === scene && after.event.strength >= 0 && after.event.strength <= 1 && Math.abs(after.event.pan) <= 1, { ...attempts.at(-1), event: after.event });
        lastSuccessfulTapTime = Number((await data()).time);
        return { x, y, event: after.event };
      }
      check(scene, `${label}: missed raycast does not duplicate callbacks`, after.events === before.events);
    }
    check(scene, `${label}: a visible real scene target is hittable`, false, attempts);
  };
  const dispatch = (selector, type, id, x = 400, y = 408) => page.evaluate(({ selector, type, id, x, y }) => {
    const target = selector === 'window' ? window : document.querySelector(selector);
    if (!target) throw new Error(`Missing QA target ${selector}`);
    target.dispatchEvent(new PointerEvent(type, { bubbles: true, isPrimary: true, pointerId: id, pointerType: 'touch', button: 0, clientX: x, clientY: y }));
  }, { selector, type, id, x, y });

  await page.setViewportSize({ width: 800, height: 600 });
  await control('setStatic', false); await control('setActive', true); await control('setChrome', true);
  await page.waitForSelector(`${layer(primary)}:not(.qa-chrome-hidden)`); await waitFrames(1);
  const visibleTap = await nativeTap(primary, 'visible sibling chrome');
  if (screenshot) { await screenshot(scene, 'chrome-visible', 800, 600); await control('setActive', true); await waitFrames(1); }

  let before = await read();
  const yawBefore = Number((await data()).yaw);
  await page.mouse.move(360, 370); await page.mouse.down(); await page.mouse.move(470, 385, { steps: 3 }); await waitFrames(2);
  const dragging = await read();
  check(scene, 'visible sibling chrome native drag turns actual camera', dragging.inputCounters.drag > before.inputCounters.drag && Math.abs(Number((await data()).yaw) - yawBefore) > .0001 && await page.locator(`${primary} .deepwater-world`).getAttribute('data-look') === 'drag');
  check(scene, 'only current surface captures the native mouse pointer', await page.locator(primary).evaluate(surface => surface.hasPointerCapture(1)));
  await page.mouse.up();
  check(scene, 'native drag releases capture without emitting tap', (await read()).events === before.events && await page.locator(primary).evaluate(surface => !surface.hasPointerCapture(1)) && await page.locator(`${primary} .deepwater-world`).getAttribute('data-look') === null);

  // Native controls retain their own behavior and never invoke scene input.
  before = await read();
  await page.locator(`${primary} [data-qa-control="button-child"]`).click();
  await page.locator(`${primary} [data-qa-control="range"]`).click({ position: { x: 80, y: 8 } });
  await page.locator(`${primary} [data-qa-control="link"]`).click();
  const afterControls = await read();
  check(scene, 'native button child, range, and link work without moving scene', unchanged(before, afterControls) && afterControls.controlEvents.includes('button') && afterControls.controlEvents.includes('range') && afterControls.controlEvents.includes('link'), { controls: afterControls.controlEvents });
  for (const name of ['button-child', 'range', 'select', 'link', 'slider', 'switch', 'tab', 'plain', 'foreign']) {
    before = await read();
    await dispatch(`${primary} [data-qa-control="${name}"]`, 'pointerdown', 101);
    await dispatch('window', 'pointermove', 101, 485, 435);
    await dispatch('window', 'pointerup', 101, 485, 435);
    check(scene, `dispatched guard: ${name} emits no scene drag or tap`, unchanged(before, await read()));
  }
  for (const reason of ['pointercancel', 'blur']) {
    before = await read();
    await dispatch(layer(primary), 'pointerdown', 102);
    await dispatch('window', 'pointermove', 102, 490, 420);
    check(scene, `${reason} fixture starts an actual look gesture`, await page.locator(`${primary} .deepwater-world`).getAttribute('data-look') === 'drag');
    if (reason === 'blur') await page.evaluate(() => window.dispatchEvent(new Event('blur')));
    else await dispatch('window', 'pointercancel', 102, 490, 420);
    await dispatch('window', 'pointerup', 102);
    const after = await read();
    check(scene, `${reason} cancels gesture and prevents a later tap`, after.events === before.events && after.inputCounters.touch === before.inputCounters.touch && await page.locator(`${primary} .deepwater-world`).getAttribute('data-look') === null);
  }

  await control('setChrome', false); await page.waitForSelector(`${layer(primary)}.qa-chrome-hidden`, { state: 'attached' });
  const hiddenTap = await nativeTap(primary, 'hidden chrome scene subtree');
  await control('setChrome', true); await page.waitForSelector(`${layer(primary)}:not(.qa-chrome-hidden)`);
  await page.evaluate(() => { window.__deepWaterOverlayCanvas = document.querySelector('canvas'); });
  before = await read();
  await page.mouse.move(400, 400); await page.mouse.down(); await page.mouse.move(455, 412);
  await control('setSecondHolder', true); await page.waitForSelector(`${second} canvas`);
  await page.mouse.up();
  const transferred = await read();
  check(scene, 'holder transfer cancels captured lower gesture without tap', transferred.events === before.events && transferred.inputCounters.touch === before.inputCounters.touch && await page.locator(`${primary} .deepwater-world`).getAttribute('data-look') === null && await page.locator(primary).evaluate(surface => !surface.hasPointerCapture(1)));
  check(scene, 'overlay holder transfer reuses one original canvas', await page.evaluate(() => document.querySelector('#second-holder canvas') === window.__deepWaterOverlayCanvas && document.querySelectorAll('canvas').length === 1));
  before = await read();
  await dispatch(layer(primary), 'pointerdown', 103); await dispatch('window', 'pointermove', 103, 490, 420); await dispatch('window', 'pointerup', 103);
  check(scene, 'stale lower holder ignores dispatched overlay input', unchanged(before, await read()));
  const secondTap = await nativeTap(second, 'top fullscreen-style sibling chrome');

  // Start on the top holder, transfer back, then up: no gesture crosses holders.
  before = await read();
  await page.mouse.move(400, 400); await page.mouse.down();
  await control('setSecondHolder', false); await page.waitForSelector(`${primary} canvas`); await page.mouse.up();
  check(scene, 'top-holder removal cancels tap before canvas returns', (await read()).events === before.events && (await read()).inputCounters.touch === before.inputCounters.touch);
  // A removal and return in the same DOM task must still cancel the pointer.
  before = await read();
  await dispatch(layer(primary), 'pointerdown', 104);
  await page.evaluate(() => { const c = document.querySelector('canvas'); const mount = c.parentElement; const parking = document.createElement('div'); parking.appendChild(c); mount.appendChild(c); });
  await dispatch('window', 'pointerup', 104);
  check(scene, 'same-task canvas out-and-back cancels stale pointer', (await read()).events === before.events && (await read()).inputCounters.touch === before.inputCounters.touch);
  for (let i = 0; i < 3; i++) {
    await control('setMounted', false); await page.waitForFunction(() => !document.querySelector('canvas'));
    await control('setMounted', true); await page.waitForSelector(`${primary} .deepwater-world[data-state="ready"]`);
  }
  check(scene, 'rapid overlay holder reuse retains single original canvas', await page.evaluate(() => document.querySelector('canvas') === window.__deepWaterOverlayCanvas && document.querySelectorAll('canvas').length === 1));
  const reusedTap = await nativeTap(primary, 'rapidly reused overlay holder');
  await control('setSecondHolder', false); await control('setChrome', false); await control('setActive', true); await waitFrames(1);
  return { visibleTap, hiddenTap, secondTap, reusedTap, final: await read() };
}
