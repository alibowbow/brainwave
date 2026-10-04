import { writeFile } from 'node:fs/promises';

/** Capture the native compositor at the current viewport, without Playwright's
 * animation/viewport screenshot preparation. Software WebGL has timed out in
 * that path even with a ready, paused canvas; this preserves full pixel quality.
 * PNG's faster encoding changes compression effort only, never image quality.
 */
export async function captureScenePng(page, filename) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const animation of document.getAnimations()) {
      if (animation.playState === 'running' && animation.effect?.getComputedTiming().iterations !== Infinity) {
        try { animation.finish(); } catch { /* Non-finite animations stay unchanged. */ }
      }
    }
  });
  const session = await page.context().newCDPSession(page);
  let timer;
  try {
    const { data } = await Promise.race([
      session.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false, optimizeForSpeed: true }),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Native scene PNG capture timed out after 120 seconds')), 120_000); }),
    ]);
    const bytes = Buffer.from(data, 'base64');
    await writeFile(filename, bytes);
    return { bytes: bytes.length, width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  } finally {
    clearTimeout(timer);
    await session.detach().catch(() => undefined);
  }
}
