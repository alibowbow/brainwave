import assert from 'node:assert/strict';

/** A newly attached paused canvas can receive an initial ResizeObserver redraw.
 * Allow layout to settle without ever allowing simulation time to advance, then
 * require a separate strict window with no redraws. This is not a frame budget.
 */
export async function verifySceneStill(page, selector, snapshot) {
  await page.evaluate((selector) => { window.__stillVerificationCanvas = document.querySelector(selector); }, selector);
  const first = await snapshot(page);
  assert.ok(first, 'paused scene must have a canvas');
  const signature = (data) => JSON.stringify([
    data.frames ?? data.frame, data.width ?? data.bufferWidth, data.height ?? data.bufferHeight, data.cssWidth, data.cssHeight,
  ]);
  const sample = async () => {
    assert.ok(await page.evaluate((selector) => document.querySelector(selector) === window.__stillVerificationCanvas, selector), 'paused canvas identity must not change');
    const data = await snapshot(page);
    assert.ok(data, 'paused canvas must remain present');
    assert.equal(data.running, 'false', 'paused renderer must remain stopped');
    assert.equal(data.motion, 'paused');
    assert.equal(data.time, first.time, 'paused simulation clock must not advance, including during resize settling');
    return data;
  };
  let last = first;
  let stableSince = Date.now();
  const deadline = Date.now() + 15_000;
  const redraws = [];
  while (true) {
    await page.waitForTimeout(100);
    const next = await sample();
    if (signature(next) !== signature(last)) {
      redraws.push({ frames: next.frames ?? next.frame, time: next.time, width: next.width ?? next.bufferWidth, height: next.height ?? next.bufferHeight });
      stableSince = Date.now();
    }
    last = next;
    assert.ok(Date.now() < deadline, 'paused layout/frame count did not settle within 15 seconds');
    if (Date.now() - stableSince >= 400) break;
  }
  const strictStart = last;
  await page.waitForTimeout(500);
  const after = await sample();
  assert.equal(signature(after), signature(strictStart), 'settled paused scene must stop drawing and resizing');
  return { ...after, stillVerification: { settledRedraws: redraws, strictWindowMs: 500, simulationTimeUnchanged: true } };
}
