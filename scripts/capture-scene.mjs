import { writeFile } from 'node:fs/promises';

/** Capture the current viewport with unchanged rendering and lossless PNG.
 * This uses the same Chromium capture backend as Playwright screenshots: it
 * avoids Playwright's preparation, but does not bypass GPU/compositor work.
 * One deadline covers preparation, capture, writing and session cleanup.
 */
export async function captureScenePng(page, filename) {
  const started = Date.now();
  const deadline = started + 120_000;
  let session;
  let finished = false;
  const log = (message) => console.log(`[scene-capture] ${filename}: ${message} (+${Date.now() - started} ms)`);
  const failure = (stage, timedOut, cause) => {
    const detail = timedOut ? '120-second capture deadline reached' : (cause instanceof Error ? cause.message : String(cause));
    const error = new Error(`Scene PNG ${stage}: ${detail}`, cause === undefined ? undefined : { cause });
    error.name = 'SceneCaptureError';
    error.code = timedOut ? 'SCENE_CAPTURE_TIMEOUT' : 'SCENE_CAPTURE_FAILED';
    error.captureStage = stage;
    return error;
  };
  const runStage = async (stage, run) => {
    const remaining = deadline - Date.now();
    log(`START ${stage}; ${Math.max(0, remaining)} ms remaining`);
    if (remaining <= 0) throw failure(stage, true);
    let timer;
    try {
      // Promise.race observes the losing operation too, including late errors.
      const result = await Promise.race([
        Promise.resolve().then(run),
        new Promise((_, reject) => { timer = setTimeout(() => reject(failure(stage, true)), remaining); }),
      ]);
      log(`DONE ${stage}`);
      return result;
    } catch (error) {
      const reported = error?.name === 'SceneCaptureError' ? error : failure(stage, false, error);
      log(`FAIL ${stage}: ${reported.message}`);
      throw reported;
    } finally {
      clearTimeout(timer);
    }
  };
  const detach = async (target, waitMs) => {
    let timer;
    const operation = Promise.resolve().then(() => target.detach()).then(
      () => log('DONE detach'),
      (error) => log(`CLEANUP detach failed: ${error instanceof Error ? error.message : String(error)}`),
    );
    if (waitMs <= 0) {
      log('CLEANUP detach requested without waiting; capture deadline exhausted');
      return;
    }
    try {
      await Promise.race([
        operation,
        new Promise((resolve) => { timer = setTimeout(() => { log('CLEANUP detach wait expired'); resolve(); }, waitMs); }),
      ]);
    } finally {
      clearTimeout(timer);
    }
  };
  try {
    await runStage('fonts', () => page.evaluate(() => document.fonts.ready.then(() => undefined)));
    await runStage('animation preparation', () => page.evaluate(() => {
      for (const animation of document.getAnimations()) {
        if (animation.playState === 'running' && animation.effect?.getComputedTiming().iterations !== Infinity) {
          try { animation.finish(); } catch { /* Non-finite animations stay unchanged. */ }
        }
      }
    }));
    await runStage('CDP session', async () => {
      const opened = await page.context().newCDPSession(page);
      // Session creation may finish after its deadline; do not leak that handle.
      if (finished) {
        await detach(opened, 0);
        return;
      }
      session = opened;
    });
    const { data } = await runStage('compositor PNG', () => session.send('Page.captureScreenshot', {
      format: 'png', fromSurface: true, captureBeyondViewport: false, optimizeForSpeed: true,
    }));
    const bytes = Buffer.from(data, 'base64');
    await runStage('write PNG', () => writeFile(filename, bytes));
    return { bytes: bytes.length, width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  } finally {
    finished = true;
    if (session) await detach(session, Math.min(2000, Math.max(0, deadline - Date.now())));
  }
}
