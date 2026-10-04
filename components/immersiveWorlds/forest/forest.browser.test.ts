import { it, expect } from 'vitest';
import { chromium, type Browser, type Page, type CDPSession } from 'playwright-core';
import { execFileSync, spawn, type ChildProcess } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const sceneDirectory = fileURLToPath(new URL('./', import.meta.url));
const repositoryDirectory = fileURLToPath(new URL('../../../', import.meta.url));
const outputDirectory = path.join(sceneDirectory, 'qa/ci-output');
const harnessURL = 'http://127.0.0.1:4178/components/immersiveWorlds/forest/harness.html';
const delay = (milliseconds: number) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

type Diagnostic = Record<string, string | number>;
type Screenshot = { filename: string; bytes: number; sha256: string; width: number; height: number; method: 'cdp-view' | 'direct-webgl'; time?: number };
interface BrowserReport {
  status: 'running' | 'passed' | 'failed';
  startedAt: string;
  finishedAt?: string;
  renderer: string;
  limitations: string[];
  screenshots: Screenshot[];
  checks: { name: string; passed: boolean; detail: unknown }[];
  errors: string[];
  captureAttempts: { filename: string; method: string; passed: boolean; detail: unknown }[];
  captureFailures: string[];
  lifecycleReport?: unknown;
  actualVisibility?: Record<string, unknown>;
  failure?: string;
  serverLog?: string;
}

async function diagnostic(page: Page): Promise<Diagnostic> {
  return page.evaluate(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('.forest-world-canvas');
    if (!canvas) throw new Error('No live forest canvas');
    return { ...canvas.dataset, cssWidth: canvas.clientWidth, cssHeight: canvas.clientHeight, width: canvas.width, height: canvas.height };
  });
}

async function waitForRunning(page: Page, running: boolean) {
  await page.waitForFunction((value) => document.querySelector<HTMLCanvasElement>('.forest-world-canvas')?.dataset.running === String(value), running);
}

// Several recorded CI attempts stalled inside Chromium's compositor capture.
// Default to synchronous readback of the actual full-size scene render. The
// browser-view route remains opt-in for environments whose compositor works.
let preferDirectCapture = process.env.FOREST_QA_COMPOSITOR_CAPTURE !== '1';

async function bounded<T>(operation: Promise<T>, label: string, milliseconds = 30000): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  try {
    return await Promise.race([operation, new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} exceeded ${milliseconds} ms`)), milliseconds); })]);
  } finally { clearTimeout(timer!); }
}

/** Read actual encoded dimensions, rather than trusting the emulated viewport. */
function imageSize(buffer: Buffer) {
  if (buffer.length > 24 && buffer.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) throw new Error('Capture did not return JPEG or PNG');
  let offset = 2;
  while (offset + 8 < buffer.length) {
    while (buffer[offset] === 0xff) offset++;
    const marker = buffer[offset++];
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker === 0x01 || marker >= 0xd0 && marker <= 0xd7) continue;
    const length = buffer.readUInt16BE(offset);
    if (length < 2) break;
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { width: buffer.readUInt16BE(offset + 5), height: buffer.readUInt16BE(offset + 3) };
    }
    offset += length;
  }
  throw new Error('Capture dimensions could not be decoded');
}

async function screenshot(page: Page, filename: string, report: BrowserReport) {
  // A timed-out in-page QA sequence still owns its disabled transport buttons.
  // Do not wait 45 seconds for an impossible pause or disturb an active test.
  if (await page.getByTestId('qa-status').getAttribute('data-state') === 'running') {
    const note = `Skipped ${filename}: in-page lifecycle QA is still running and owns the disabled transport controls.`;
    report.captureFailures.push(note);
    return null;
  }
  // SwiftShader can saturate the compositor while a full-quality reflected
  // scene continuously draws. Freeze via the real session prop for capture;
  // preserve simulation time and native-resolution buffers, then resume.
  // Direct protocol: active=false -> verify full native buffer -> draw and
  // synchronously read that same renderer frame (90-second readback bound).
  // Only opt-in CDP capture refreshes width minus one pixel and restores it
  // before gl.finish()/view capture. Direct readback already draws a fresh frame
  // and needs no extra ResizeObserver-triggered GPU work.
  // Restore active=true if previously running. The shared host renders dt=0
  // on paused resizes. No render resolution or runtime quality is reduced.
  const wasRunning = await page.locator('.forest-world-canvas').getAttribute('data-running') === 'true';
  const viewport = page.viewportSize()!;
  try {
    if (wasRunning) {
      await page.getByTestId('active-toggle').dispatchEvent('click');
      await waitForRunning(page, false);
    }
    const refreshViewport = { width: viewport.width - 1, height: viewport.height };
    const fullSizeCanvas = ({ width, height }: { width: number; height: number }) => {
      const canvas = document.querySelector<HTMLCanvasElement>('.forest-world-canvas');
      return canvas?.clientWidth === width && canvas.clientHeight === height && canvas.width === width && canvas.height === height;
    };
    if (!preferDirectCapture) {
      await page.setViewportSize(refreshViewport);
      await page.waitForFunction(fullSizeCanvas, refreshViewport);
      await page.setViewportSize(viewport);
    }
    await page.waitForFunction(fullSizeCanvas, viewport);
    if (!preferDirectCapture) await page.waitForTimeout(250);

    let buffer: Buffer | undefined;
    let method: Screenshot['method'] = 'cdp-view';
    let capturedTime: number | undefined;
    if (!preferDirectCapture) {
      let session: Awaited<ReturnType<ReturnType<Page['context']>['newCDPSession']>> | undefined;
      try {
        const finish = await bounded(page.evaluate(() => {
          const canvas = document.querySelector<HTMLCanvasElement>('.forest-world-canvas');
          const gl = canvas?.getContext('webgl2');
          if (!gl || gl.isContextLost()) throw new Error('Existing WebGL2 context unavailable');
          const began = performance.now(); gl.finish();
          return { finishMs: performance.now() - began, width: gl.drawingBufferWidth, height: gl.drawingBufferHeight };
        }), 'Existing WebGL2 finish');
        session = await page.context().newCDPSession(page);
        const capture = await bounded(session.send('Page.captureScreenshot', {
          format: 'jpeg', quality: 86, fromSurface: false, captureBeyondViewport: false,
        }), 'CDP view capture');
        buffer = Buffer.from(capture.data, 'base64');
        const actual = imageSize(buffer);
        if (actual.width !== viewport.width || actual.height !== viewport.height) throw new Error(`CDP view returned ${actual.width}×${actual.height}; expected native ${viewport.width}×${viewport.height}`);
        report.captureAttempts.push({ filename, method: 'cdp-view', passed: true, detail: { ...actual, ...finish } });
      } catch (error) {
        buffer = undefined; preferDirectCapture = true;
        report.captureAttempts.push({ filename, method: 'cdp-view', passed: false, detail: error instanceof Error ? error.message : String(error) });
      } finally { if (session) await bounded(session.detach(), 'CDP detach', 5000).catch(() => undefined); }
    }
    if (!buffer) {
      method = 'direct-webgl';
      const captured = await bounded(page.evaluate(() => {
        const detail: { result?: { dataUrl: string; width: number; height: number; time: number }; error?: string } = {};
        document.querySelector('.forest-harness')?.dispatchEvent(new CustomEvent('forest:diagnostic-capture', { detail }));
        if (detail.error || !detail.result) throw new Error(detail.error || 'Synchronous WebGL capture callback did not return a frame');
        return detail.result;
      }), 'Direct real WebGL frame capture', 90000);
      const match = /^data:image\/(jpeg|png);base64,(.+)$/.exec(captured.dataUrl);
      if (!match) throw new Error('Direct WebGL capture did not return a supported image data URL');
      buffer = Buffer.from(match[2], 'base64');
      const actual = imageSize(buffer);
      if (actual.width !== viewport.width || actual.height !== viewport.height || captured.width !== actual.width || captured.height !== actual.height) throw new Error(`Direct WebGL image has unexpected dimensions ${actual.width}×${actual.height}`);
      if (match[1] === 'png') filename = filename.replace(/\.jpg$/, '.png');
      capturedTime = captured.time;
      report.captureAttempts.push({ filename, method, passed: true, detail: { ...actual, time: captured.time, scope: 'Actual scene WebGL buffer; excludes DOM controls and browser compositor.' } });
    }
    const actual = imageSize(buffer);
    const evidence: Screenshot = { filename, bytes: buffer.length, sha256: createHash('sha256').update(buffer).digest('hex'), ...actual, method, ...(capturedTime === undefined ? {} : { time: capturedTime }) };
    await writeFile(path.join(outputDirectory, filename), buffer); report.screenshots.push(evidence);
    const encoded = buffer.toString('base64'), chunkSize = 8192, count = Math.ceil(encoded.length / chunkSize);
    for (let index = 0; index < count; index++) console.log(`FOREST_SCREENSHOT ${filename} ${index + 1}/${count} ${encoded.slice(index * chunkSize, (index + 1) * chunkSize)}`);
    return evidence;
  } catch (error) {
    const note = `${filename}: ${error instanceof Error ? error.message : String(error)}`;
    report.captureFailures.push(note);
    console.log(`FOREST_CAPTURE_FAILURE ${note}`);
    return null;
  } finally {
    if (wasRunning && !page.isClosed()) {
      try {
        await page.setViewportSize(viewport);
        if (await page.locator('.forest-world-canvas').getAttribute('data-running') !== 'true') await page.getByTestId('active-toggle').dispatchEvent('click');
        await waitForRunning(page, true);
      } catch (error) { report.captureFailures.push(`Capture resume: ${error instanceof Error ? error.message : String(error)}`); }
    }
  }
}

/**
 * The repository's existing CI runs npm test before its browser installation
 * step. Install the already-declared playwright-core browser here, confined to
 * CI; local unit tests never start a server, install a browser, or render WebGL.
 */
it.runIf(Boolean(process.env.CI))('renders and validates the isolated morning forest in Chromium', async () => {
  const report: BrowserReport = {
    status: 'running', startedAt: new Date().toISOString(),
    renderer: 'Headless Chromium WebGL2 using SwiftShader; actual Three.js geometry and shaders.',
    limitations: [
      'Software rendering in Linux CI is not representative of physical-phone performance.',
      '344×800 and 882×344 are layout simulations, not physical Fold hardware tests.',
      'Motion and DOM lifecycle run at the requested native 882×344 landscape viewport after all three layout captures; rendering quality and resolution scale are unchanged.',
      'Reduced motion is tested with browser media emulation and the actual app class.',
      'Native tab/window visibility is observed when supported by headless Chromium; the separate document.hidden override tests only the simulated hook.',
      'DOM gesture assertions use PointerEvents through the component; they are not physical touchscreen tests.',
    ],
    screenshots: [], checks: [], errors: [], captureAttempts: [], captureFailures: [],
  };
  let browser: Browser | undefined;
  let page: Page | undefined;
  let server: ChildProcess | undefined;
  let serverLog = '';
  let caught: unknown;
  let imageMovementPassed = false;
  const check = (name: string, passed: boolean, detail: unknown) => {
    report.checks.push({ name, passed, detail });
    expect(passed, `${name}: ${JSON.stringify(detail)}`).toBe(true);
  };

  try {
    preferDirectCapture = process.env.FOREST_QA_COMPOSITOR_CAPTURE !== '1';
    await mkdir(outputDirectory, { recursive: true });
    execFileSync(process.execPath, [path.join(repositoryDirectory, 'node_modules/playwright-core/cli.js'), 'install', '--with-deps', 'chromium'], {
      cwd: repositoryDirectory, env: process.env, stdio: 'inherit', timeout: 180000,
    });
    server = spawn(process.execPath, [path.join(repositoryDirectory, 'node_modules/vite/bin/vite.js'), '--config', path.join(sceneDirectory, 'harness.vite.config.ts')], {
      cwd: repositoryDirectory, env: process.env, stdio: ['ignore', 'pipe', 'pipe'],
    });
    const appendLog = (chunk: Buffer) => { serverLog = (serverLog + chunk.toString()).slice(-16000); };
    server.stdout?.on('data', appendLog); server.stderr?.on('data', appendLog);
    server.on('error', (error) => { serverLog += `\n${error.message}`; });
    let serving = false;
    for (let attempt = 0; attempt < 60; attempt++) {
      try {
        const response = await fetch(harnessURL, { signal: AbortSignal.timeout(1500) });
        if (response.ok) { serving = true; break; }
      } catch { /* The owned Vite harness is still starting. */ }
      if (server.exitCode !== null) throw new Error(`Forest Vite server exited ${server.exitCode}: ${serverLog}`);
      await delay(250);
    }
    if (!serving) throw new Error(`Forest Vite server did not start: ${serverLog}`);

    browser = await chromium.launch({
      executablePath: process.env.SCENE_BROWSER_PATH || undefined,
      headless: true,
      args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
    });
    page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
    page.setDefaultTimeout(45000);
    page.on('pageerror', (error) => report.errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error' && /three|webgl|shader|program/i.test(message.text())) report.errors.push(message.text());
    });
    await page.goto(`${harnessURL}?paused=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => ['ready', 'failed'].includes(document.querySelector<HTMLElement>('.forest-world')?.dataset.state ?? ''), undefined, { timeout: 90000 });
    const state = await page.locator('.forest-world').getAttribute('data-state');
    check('Engine ready instead of fallback', state === 'ready', { state });
    await waitForRunning(page, false);
    await page.waitForFunction(() => Number(document.querySelector<HTMLCanvasElement>('.forest-world-canvas')?.dataset.frames) > 0);
    const initial = await diagnostic(page);
    check('Initial active=false mount draws a static 3D frame', initial.running === 'false' && Number(initial.frames) > 0 && Number(initial.time) === 0, initial);
    check('Nonzero rendered geometry and full desktop buffer', Number(initial.triangles) > 1000 && Number(initial.drawCalls) > 0 && initial.cssWidth === 1280 && initial.cssHeight === 800 && initial.width === 1280 && initial.height === 800, initial);

    // Capture all three layouts while the scene remains initially inactive.
    // Resizing and same-render readback draw real static frames without filling
    // the GPU queue with animation before native visual evidence is available.
    await page.evaluate(() => { document.querySelector<HTMLElement>('.forest-harness')!.dataset.capture = 'true'; });
    await page.waitForTimeout(900);
    await screenshot(page, 'forest-desktop.jpg', report);
    let landscape: Screenshot | null = null;

    for (const size of [{ width: 344, height: 800, filename: 'forest-fold-portrait.jpg' }, { width: 882, height: 344, filename: 'forest-fold-landscape.jpg' }]) {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.waitForFunction(({ width, height }) => {
        const canvas = document.querySelector<HTMLCanvasElement>('.forest-world-canvas');
        return canvas?.clientWidth === width && canvas.clientHeight === height && canvas.width === width && canvas.height === height;
      }, size);
      const view = await screenshot(page, size.filename, report);
      if (size.filename === 'forest-fold-landscape.jpg') landscape = view;
      check(`Actual ${size.width}×${size.height} layout renders`, Number((await diagnostic(page)).triangles) > 1000, await diagnostic(page));
    }

    // Compare motion at the same requested native landscape dimensions and run
    // lifecycle there. This changes the test viewport, not scene quality/DPR.
    const movementBefore = await diagnostic(page);
    check('Static layout captures preserve the initial inactive simulation', movementBefore.running === 'false' && movementBefore.time === initial.time, { initial, afterThreeLayouts: movementBefore });
    await page.getByTestId('active-toggle').dispatchEvent('click');
    await waitForRunning(page, true);
    await page.waitForFunction((time) => Number(document.querySelector<HTMLCanvasElement>('.forest-world-canvas')?.dataset.time) > time + .25, Number(movementBefore.time));
    const motion = await screenshot(page, 'forest-motion.jpg', report);
    const movementAfter = await diagnostic(page);
    imageMovementPassed = !!landscape && !!motion && landscape.method === motion.method && landscape.width === 882 && landscape.height === 344 && motion.width === 882 && motion.height === 344 && landscape.sha256 !== motion.sha256 && Number(movementAfter.frames) > Number(movementBefore.frames) && Number(movementAfter.time) > Number(movementBefore.time);
    // Capture failures remain non-blocking until the final overall verdict.
    report.checks.push({ name: 'Actual rendered motion changes the image', passed: imageMovementPassed, detail: { nativeViewport: [882, 344], before: movementBefore, after: movementAfter, beforeImage: landscape?.sha256, afterImage: motion?.sha256, beforeMethod: landscape?.method, afterMethod: motion?.method } });

    await page.evaluate(() => { document.querySelector<HTMLElement>('.forest-harness')!.dataset.capture = 'false'; });
    await page.getByTestId('qa-run').dispatchEvent('click');
    // These generous waits accommodate software rendering only. The scene's
    // resolution, materials, geometry, simulation step and RAF remain unchanged.
    await page.waitForFunction(() => ['passed', 'failed'].includes(document.querySelector<HTMLElement>('[data-testid="qa-status"]')?.dataset.state ?? ''), undefined, { timeout: 300000 });
    report.lifecycleReport = JSON.parse(await page.getByTestId('qa-report').innerText());
    const lifecycleState = await page.getByTestId('qa-status').getAttribute('data-state');
    check('In-page real-component lifecycle and interactions pass', lifecycleState === 'passed', report.lifecycleReport);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await waitForRunning(page, false);
    await page.waitForTimeout(150);
    const mediaBefore = await diagnostic(page);
    await page.waitForTimeout(750);
    const mediaAfter = await diagnostic(page);
    check('Browser OS reduced-motion emulation freezes frames and time', mediaBefore.frames === mediaAfter.frames && mediaBefore.time === mediaAfter.time, { before: mediaBefore, after: mediaAfter });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await waitForRunning(page, true);
    await page.waitForFunction((frames) => Number(document.querySelector<HTMLCanvasElement>('.forest-world-canvas')?.dataset.frames) > frames, Number(mediaAfter.frames));
    check('Browser OS reduced-motion release resumes', true, await diagnostic(page));

    // Attempt real browser visibility without overriding any document state.
    // Interval polling is essential: requestAnimationFrame stops in hidden tabs.
    let foregroundTab: Page | undefined;
    let visibilitySession: CDPSession | undefined;
    let windowId: number | undefined;
    let minimizedRequestSucceeded = false;
    let actuallyHidden = false;
    let actualHiddenPassed = false;
    let actualHiddenFailure: string | undefined;
    const visibilityAttempts: { method: string; hidden: boolean; note?: string }[] = [];
    let realHiddenEvidence: Record<string, unknown> = {};
    const observeHidden = async () => {
      try {
        await page!.waitForFunction(() => document.hidden && document.visibilityState === 'hidden', undefined, { polling: 100, timeout: 2500 });
        return true;
      } catch { return false; }
    };
    try {
      try {
        foregroundTab = await page.context().newPage();
        await foregroundTab.goto('about:blank');
        await foregroundTab.bringToFront();
        actuallyHidden = await observeHidden();
        visibilityAttempts.push({ method: 'about:blank tab brought to front', hidden: actuallyHidden });
      } catch (error) {
        visibilityAttempts.push({ method: 'about:blank tab brought to front', hidden: false, note: error instanceof Error ? error.message : String(error) });
      }
      if (!actuallyHidden) {
        try {
          visibilitySession = await page.context().newCDPSession(page);
          ({ windowId } = await visibilitySession.send('Browser.getWindowForTarget'));
          await visibilitySession.send('Browser.setWindowBounds', { windowId, bounds: { windowState: 'minimized' } });
          minimizedRequestSucceeded = true;
          actuallyHidden = await observeHidden();
          visibilityAttempts.push({ method: 'native browser window minimized', hidden: actuallyHidden });
        } catch (error) {
          visibilityAttempts.push({ method: 'native browser window minimized', hidden: false, note: error instanceof Error ? error.message : String(error) });
        }
      }
      if (actuallyHidden) {
        await page.waitForFunction(() => document.querySelector<HTMLCanvasElement>('.forest-world-canvas')?.dataset.running === 'false', undefined, { polling: 100, timeout: 15000 });
        const before = await diagnostic(page), began = Date.now();
        await delay(1100);
        const after = await diagnostic(page), durationMs = Date.now() - began;
        const nativeState = await page.evaluate(() => ({ hidden: document.hidden, visibilityState: document.visibilityState }));
        actualHiddenPassed = nativeState.hidden && nativeState.visibilityState === 'hidden' && durationMs >= 900 && before.frames === after.frames && before.time === after.time;
        realHiddenEvidence = { actualTabVisibilityTested: true, simulated: false, method: visibilityAttempts.find((attempt) => attempt.hidden)?.method, durationMs, nativeState, before, after };
      }
    } catch (error) {
      actualHiddenFailure = error instanceof Error ? error.message : String(error);
    } finally {
      // Restore the existing window and original tab even if observation fails.
      if (visibilitySession && windowId !== undefined) {
        try { await visibilitySession.send('Browser.setWindowBounds', { windowId, bounds: { windowState: 'normal' } }); }
        catch (error) {
          const note = `Restore native window: ${error instanceof Error ? error.message : String(error)}`;
          if (minimizedRequestSucceeded) report.errors.push(note);
          else visibilityAttempts.push({ method: 'restore unsupported native window operation', hidden: false, note });
        }
      }
      try { await page.bringToFront(); }
      catch (error) { report.errors.push(`Restore original tab: ${error instanceof Error ? error.message : String(error)}`); }
      if (foregroundTab) await foregroundTab.close().catch(() => undefined);
      if (visibilitySession) await visibilitySession.detach().catch(() => undefined);
    }
    report.actualVisibility = { actualTabVisibilityTested: actuallyHidden, attempts: visibilityAttempts, ...realHiddenEvidence, ...(actualHiddenFailure ? { failure: actualHiddenFailure } : {}) };
    if (actuallyHidden) {
      check('Actual browser hidden state freezes frames and time', actualHiddenPassed && !actualHiddenFailure, report.actualVisibility);
      await page.waitForFunction(() => !document.hidden && document.visibilityState === 'visible', undefined, { polling: 100, timeout: 15000 });
      await waitForRunning(page, true);
      const restored = await diagnostic(page);
      await page.waitForFunction((frames) => Number(document.querySelector<HTMLCanvasElement>('.forest-world-canvas')?.dataset.frames) > frames, Number(restored.frames));
      check('Actual browser visibility restoration resumes animation', true, { actualTabVisibilityTested: true, after: await diagnostic(page) });
    } else {
      report.limitations.push(`Actual hidden state was not observed: ${visibilityAttempts.map((attempt) => `${attempt.method}: ${attempt.note ?? 'document.hidden remained false'}`).join('; ')}. Real tab-background pause remains unverified.`);
    }

    // Independently validate the explicit simulated hook, regardless of whether
    // the native browser visibility transition was available above.
    await page.evaluate(() => {
      document.documentElement.dataset.forestVisibilitySimulation = 'ci-hook-test';
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await waitForRunning(page, false);
    await page.waitForTimeout(150);
    const hiddenBefore = await diagnostic(page);
    await page.waitForTimeout(900);
    const hiddenAfter = await diagnostic(page);
    check('Simulated hidden hook freezes frames and time', hiddenBefore.frames === hiddenAfter.frames && hiddenBefore.time === hiddenAfter.time, { simulated: true, actualTabVisibilityTested: false, before: hiddenBefore, after: hiddenAfter });
    await page.evaluate(() => {
      Reflect.deleteProperty(document, 'hidden');
      document.dispatchEvent(new Event('visibilitychange'));
      delete document.documentElement.dataset.forestVisibilitySimulation;
    });
    await waitForRunning(page, true);
    await page.waitForFunction((frames) => Number(document.querySelector<HTMLCanvasElement>('.forest-world-canvas')?.dataset.frames) > frames, Number(hiddenAfter.frames));
    check('Simulated hidden release resumes without claiming real visibility', true, await diagnostic(page));
    check('No page or WebGL shader errors', report.errors.length === 0, report.errors);
    const capturedViews = ['forest-desktop', 'forest-motion', 'forest-fold-portrait', 'forest-fold-landscape'].every((name) => report.screenshots.some((shot) => shot.filename.replace(/\.(jpg|png)$/, '') === name));
    check('Native-resolution capture and motion evidence complete', capturedViews && imageMovementPassed && report.captureFailures.length === 0, { capturedViews, imageMovementPassed, captureFailures: report.captureFailures, methods: report.screenshots.map(({ filename, method }) => ({ filename, method })) });
    report.status = 'passed';
  } catch (error) {
    caught = error;
    report.status = 'failed';
    report.failure = error instanceof Error ? `${error.message}\n${error.stack ?? ''}` : String(error);
    report.serverLog = serverLog;
    if (page && !page.isClosed()) {
      try { await screenshot(page, 'forest-failure.jpg', report); } catch { /* Preserve the original failure. */ }
    }
  } finally {
    // Always preserve the three requested layout views once a real renderer
    // exists, even when a later assertion failed before the normal captures.
    if (page && !page.isClosed()) {
      try {
        if (await page.locator('.forest-world[data-state="ready"] .forest-world-canvas').count()) {
          await page.evaluate(() => { document.querySelector<HTMLElement>('.forest-harness')!.dataset.capture = 'true'; });
          for (const size of [
            { width: 1280, height: 800, filename: 'forest-desktop.jpg' },
            { width: 344, height: 800, filename: 'forest-fold-portrait.jpg' },
            { width: 882, height: 344, filename: 'forest-fold-landscape.jpg' },
          ]) {
            if (report.screenshots.some((shot) => shot.filename.replace(/\.(jpg|png)$/, '') === size.filename.replace(/\.jpg$/, ''))) continue;
            await page.setViewportSize({ width: size.width, height: size.height });
            await page.waitForFunction(({ width, height }) => {
              const canvas = document.querySelector<HTMLCanvasElement>('.forest-world-canvas');
              return canvas?.width === width && canvas.height === height;
            }, size, { timeout: 15000 });
            await page.waitForTimeout(400);
            await screenshot(page, size.filename, report);
          }
        }
      } catch (error) {
        report.errors.push(`Final screenshot capture: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    if (browser) await browser.close().catch(() => undefined);
    if (server && server.exitCode === null) {
      server.kill('SIGTERM');
      await Promise.race([new Promise<void>((resolve) => server!.once('exit', () => resolve())), delay(1500)]);
      if (server.exitCode === null) server.kill('SIGKILL');
    }
    report.finishedAt = new Date().toISOString();
    await mkdir(outputDirectory, { recursive: true });
    await writeFile(path.join(outputDirectory, 'forest-browser-report.json'), JSON.stringify(report, null, 2));
    console.log(`FOREST_BROWSER_REPORT ${JSON.stringify(report)}`);
  }
  if (caught) throw caught;
}, 900000);
