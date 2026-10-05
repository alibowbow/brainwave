import { it, expect } from 'vitest';
import { chromium, type Browser, type Page, type CDPSession } from 'playwright-core';
import { execFileSync, spawn, type ChildProcess } from 'node:child_process';
import { createHash } from 'node:crypto';
import { access, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const sceneDirectory = fileURLToPath(new URL('./', import.meta.url));
const repositoryDirectory = fileURLToPath(new URL('../../../', import.meta.url));
const outputDirectory = path.join(sceneDirectory, 'qa/ci-output');
const harnessURL = 'http://127.0.0.1:4178/components/immersiveWorlds/forest/harness.html';
const delay = (milliseconds: number) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

type Diagnostic = Record<string, string | number>;
type CaptureMethod = 'cdp-surface-png' | 'direct-webgl-png';
type Screenshot = { filename: string; bytes: number; sha256: string; width: number; height: number; method: CaptureMethod; scope: string; time: number; frame: number; dpr: number; elapsedMs: number; budgetMs: number };
const taintedPages = new WeakSet<Page>();
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
  sourceIdentity?: Record<string, unknown>;
  browserEnvironment?: Record<string, unknown>;
  visualFailure?: string;
  dependentEvidence: { evidence: string; status: 'tainted/not-run'; reason: string }[];
  lifecycleIsolation?: Record<string, unknown>;
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

class CaptureTimeout extends Error {}

async function bounded<T>(operation: Promise<T>, label: string, milliseconds = 30000): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  try {
    return await Promise.race([operation, new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new CaptureTimeout(`${label} exceeded ${milliseconds} ms`)), milliseconds); })]);
  } finally { clearTimeout(timer!); }
}

/** Only native, lossless PNG bytes qualify as image evidence. */
function imageSize(buffer: Buffer) {
  if (buffer.length <= 24 || !buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    throw new Error('Capture did not return a PNG');
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

async function screenshot(page: Page, filename: string, report: BrowserReport, method: CaptureMethod = 'cdp-surface-png'): Promise<Screenshot> {
  if (taintedPages.has(page)) throw new Error(`Refusing ${filename}: this page has unresolved capture work.`);
  // There is one capture method per attempt. A timeout does not cancel work in
  // Chromium, so neither another capture nor a resume may follow on this page.
  const budgetMs = method === 'direct-webgl-png' ? 90000 : 30000;
  const began = Date.now(), deadline = began + budgetMs;
  const remaining = () => {
    const value = deadline - Date.now();
    if (value <= 0) throw new CaptureTimeout(`${filename} exhausted its ${budgetMs} ms capture budget`);
    return value;
  };
  const stage = <T>(operation: () => Promise<T>, label: string) => {
    const milliseconds = remaining();
    return bounded(operation(), `${filename}: ${label}`, milliseconds);
  };
  const viewport = page.viewportSize()!;
  let wasRunning = false;
  let session: CDPSession | undefined;
  let completed = false;
  let activeStage = 'pause and strict stillness';
  try {
    if (await stage(() => page.getByTestId('qa-status').getAttribute('data-state'), 'read QA state') === 'running') {
      throw new Error(`Refusing ${filename}: in-page lifecycle QA owns the transport controls.`);
    }
    wasRunning = await stage(() => page.locator('.forest-world-canvas').getAttribute('data-running'), 'read running state') === 'true';
    if (wasRunning) {
      await stage(() => page.getByTestId('active-toggle').dispatchEvent('click'), 'pause through actual prop');
      await stage(() => waitForRunning(page, false), 'wait for pause');
    }
    await stage(() => page.waitForFunction(({ width, height }) => {
      const canvas = document.querySelector<HTMLCanvasElement>('.forest-world-canvas');
      return canvas?.clientWidth === width && canvas.clientHeight === height && canvas.width === width && canvas.height === height && canvas.dataset.gpuQueued === 'false';
    }, viewport), 'native buffer dimensions');
    // Allow a pending native resize to settle, then prove no submission/time
    // change for a separate 500 ms interval before inserting the diagnostic fence.
    await stage(() => delay(400), 'settle');
    const stableBefore = await stage(() => diagnostic(page), 'stillness baseline');
    await stage(() => delay(500), 'strict stillness interval');
    const stableAfter = await stage(() => diagnostic(page), 'stillness result');
    if (stableBefore.running !== 'false' || stableAfter.running !== 'false' || stableBefore.frames !== stableAfter.frames || stableBefore.time !== stableAfter.time) {
      throw new Error(`Scene did not remain strictly still: ${JSON.stringify({ before: stableBefore, after: stableAfter })}`);
    }
    const canvasHandle = await stage(() => page.locator('.forest-world-canvas').elementHandle(), 'retain exact canvas identity');
    if (!canvasHandle) throw new Error('Paused canvas disappeared');
    try {
      activeStage = 'GPU completion fence';
      const gpu = await stage(() => canvasHandle.evaluate(async (element, milliseconds) => {
        const canvas = element as HTMLCanvasElement;
        const gl = canvas.getContext('webgl2');
        if (!gl || gl.isContextLost()) throw new Error('Existing WebGL2 context unavailable or lost');
        const frame = canvas.dataset.frames, time = canvas.dataset.time;
        const width = canvas.width, height = canvas.height;
        const began = performance.now();
        let contextLost = false;
        const onLost = () => { contextLost = true; };
        canvas.addEventListener('webglcontextlost', onLost);
        let fence: WebGLSync | null = null;
        let polls = 0, status: number = gl.TIMEOUT_EXPIRED;
        try {
          fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
          if (!fence) throw new Error('GPU completion fenceSync returned null');
          gl.flush();
          while (true) {
            // A newly created WebGL sync cannot signal in its creation task.
            // Every zero-timeout observation happens in a later timeout task.
            await new Promise<void>((resolve) => setTimeout(resolve, 16));
            if (contextLost || gl.isContextLost()) throw new Error('Context lost while awaiting GPU completion');
            if (document.querySelector('.forest-world-canvas') !== canvas || canvas.dataset.running !== 'false' || canvas.dataset.frames !== frame || canvas.dataset.time !== time || canvas.width !== width || canvas.height !== height) {
              throw new Error('Canvas identity, frame, time, native size or paused state changed during GPU drain');
            }
            status = gl.clientWaitSync(fence, 0, 0); polls++;
            if (status === gl.WAIT_FAILED) throw new Error('GPU completion clientWaitSync returned WAIT_FAILED');
            if (status === gl.ALREADY_SIGNALED || status === gl.CONDITION_SATISFIED) break;
            if (status !== gl.TIMEOUT_EXPIRED) throw new Error(`Unknown GPU completion status ${status}`);
            if (performance.now() - began >= milliseconds) throw new Error(`GPU drain exceeded remaining capture budget (${milliseconds} ms)`);
          }
          const rendererInfo = gl.getExtension('WEBGL_debug_renderer_info');
          return {
            elapsedMs: performance.now() - began, polls, status,
            statusName: status === gl.ALREADY_SIGNALED ? 'ALREADY_SIGNALED' : 'CONDITION_SATISFIED',
            frame, time, width, height, dpr: window.devicePixelRatio,
            renderer: rendererInfo ? gl.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
            version: gl.getParameter(gl.VERSION), route: location.href,
          };
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          throw new Error(`${message}; GPU drain ${JSON.stringify({ elapsedMs: performance.now() - began, polls, status, frame, time, width, height })}`);
        } finally {
          if (fence) gl.deleteSync(fence);
          canvas.removeEventListener('webglcontextlost', onLost);
        }
      }, Math.max(1, remaining() - 100)), 'GPU completion fence');
      report.captureAttempts.push({ filename, method: 'existing-context-fence', passed: true, detail: gpu });
      activeStage = method;
      let buffer: Buffer;
      let captureTime = Number(gpu.time), captureFrame = Number(gpu.frame);
      const scope = method === 'cdp-surface-png'
        ? 'Native Chromium surface PNG, including the actual harness DOM, controls and CSS composition; this isolated harness is not the full app route.'
        : 'Supplemental native same-render WebGL PNG; excludes all DOM controls, app chrome, CSS clipping/opacity/composition and browser compositor.';
      if (method === 'cdp-surface-png') {
        session = await stage(() => page.context().newCDPSession(page), 'create capture session');
        const capture = await stage(() => session.send('Page.captureScreenshot', {
          format: 'png', fromSurface: true, captureBeyondViewport: false,
        }), 'native compositor PNG');
        buffer = Buffer.from(capture.data, 'base64');
        const unchanged = await stage(() => canvasHandle.evaluate((element, expected) => {
          const canvas = element as HTMLCanvasElement;
          const gl = canvas.getContext('webgl2');
          return document.querySelector('.forest-world-canvas') === canvas && !!gl && !gl.isContextLost()
            && canvas.dataset.running === 'false' && canvas.dataset.frames === expected.frame && canvas.dataset.time === expected.time
            && canvas.width === expected.width && canvas.height === expected.height;
        }, gpu), 'verify same paused frame after compositor capture');
        if (!unchanged) throw new Error('Canvas/context/frame/time changed during compositor PNG capture');
      } else {
        const captured = await stage(() => page.evaluate(async () => {
          const detail: { result?: Promise<{ dataUrl: string; width: number; height: number; time: number }>; error?: string } = {};
          document.querySelector('.forest-harness')?.dispatchEvent(new CustomEvent('forest:diagnostic-capture', { detail }));
          if (detail.error || !detail.result) throw new Error(detail.error || 'Asynchronous WebGL capture callback did not return a request');
          return await detail.result;
        }), 'asynchronous same-render PNG');
        const match = /^data:image\/png;base64,(.+)$/.exec(captured.dataUrl);
        if (!match) throw new Error('Direct WebGL capture did not return a lossless PNG data URL');
        buffer = Buffer.from(match[1], 'base64');
        captureTime = captured.time;
        const after = await stage(() => diagnostic(page), 'direct capture diagnostics');
        const sameCanvas = await stage(() => canvasHandle.evaluate((element) => {
          const canvas = element as HTMLCanvasElement;
          const gl = canvas.getContext('webgl2');
          return document.querySelector('.forest-world-canvas') === canvas && !!gl && !gl.isContextLost();
        }), 'direct capture canvas/context identity');
        captureFrame = Number(after.frames);
        if (!sameCanvas || captureFrame !== Number(gpu.frame) + 1 || captured.width !== viewport.width || captured.height !== viewport.height || after.running !== 'false' || Math.abs(captureTime - Number(gpu.time)) > .000051 || after.time !== gpu.time) {
          throw new Error('Direct WebGL capture changed simulation time, paused state or native dimensions');
        }
      }
      const actual = imageSize(buffer);
      if (actual.width !== viewport.width || actual.height !== viewport.height) {
        throw new Error(`${method} returned ${actual.width}×${actual.height}; expected native ${viewport.width}×${viewport.height}`);
      }
      const evidence: Screenshot = {
        filename, bytes: buffer.length, sha256: createHash('sha256').update(buffer).digest('hex'), ...actual,
        method, scope, time: captureTime, frame: captureFrame, dpr: gpu.dpr, elapsedMs: Date.now() - began, budgetMs,
      };
      await writeFile(path.join(outputDirectory, filename), buffer);
      report.screenshots.push(evidence);
      report.captureAttempts.push({ filename, method, passed: true, detail: evidence });
      const encoded = buffer.toString('base64'), chunkSize = 8192, count = Math.ceil(encoded.length / chunkSize);
      if (process.env.CI && !process.env.FOREST_QA_BROWSER) {
        for (let index = 0; index < count; index++) console.log(`FOREST_SCREENSHOT ${filename} ${index + 1}/${count} ${encoded.slice(index * chunkSize, (index + 1) * chunkSize)}`);
      }
      completed = true;
      return evidence;
    } finally {
      // Disposing a remote handle is housekeeping, never another render/readback.
      if (!taintedPages.has(page)) void canvasHandle.dispose().catch(() => undefined);
    }
  } catch (error) {
    taintedPages.add(page);
    const note = `${filename}: ${error instanceof Error ? error.message : String(error)}`;
    report.captureFailures.push(note);
    report.captureAttempts.push({ filename, method: activeStage, passed: false, detail: { error: note, elapsedMs: Date.now() - began, budgetMs, timedOut: error instanceof CaptureTimeout || (error instanceof Error && error.name === 'TimeoutError') || note.includes('GPU drain exceeded remaining capture budget'), pageTainted: true } });
    report.dependentEvidence.push({ evidence: 'Further captures, animation resume and lifecycle results on this visual page', status: 'tainted/not-run', reason: note });
    console.log(`FOREST_CAPTURE_FAILURE ${note}`);
    throw error;
  } finally {
    if (session) await bounded(session.detach(), 'Detach capture session (does not cancel capture work)', 5000).catch(() => undefined);
    if (completed && wasRunning && !taintedPages.has(page) && !page.isClosed()) {
      await page.getByTestId('active-toggle').dispatchEvent('click');
      await waitForRunning(page, true);
    }
  }
}

/**
 * The repository's existing CI runs npm test before its browser installation
 * step. Install the already-declared playwright-core browser here, confined to
 * CI. Local WebGL runs require an explicit, already-installed executable via
 * FOREST_QA_BROWSER; that controlled path never attempts a browser installation.
 */
it.runIf(Boolean(process.env.CI || process.env.FOREST_QA_BROWSER))('renders and validates the isolated morning forest in Chromium', async () => {
  const report: BrowserReport = {
    status: 'running', startedAt: new Date().toISOString(),
    renderer: 'Headless Chromium WebGL2 using SwiftShader; actual Three.js geometry and shaders.',
    limitations: [
      'Software rendering in Linux CI is not representative of physical-phone performance.',
      '344×800 and 882×344 are layout simulations, not physical Fold hardware tests.',
      'Motion uses native 882×344 after layout captures; lifecycle runs in a separate fresh browser without screenshots. Rendering quality and resolution scale are unchanged.',
      'Reduced motion is tested with browser media emulation and the actual app class.',
      'Native tab/window visibility is observed when supported by headless Chromium; the separate document.hidden override tests only the simulated hook.',
      'DOM gesture assertions use PointerEvents through the component; they are not physical touchscreen tests.',
      'This route is the isolated forest harness, not full-app immersive entry/Escape/Back acceptance.',
      'Direct same-render PNGs, when explicitly requested, are supplemental scene pixels and cannot satisfy the compositor/DOM image gate.',
    ],
    screenshots: [], checks: [], errors: [], captureAttempts: [], captureFailures: [], dependentEvidence: [],
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

  const servedModulesSha256: Record<string, string> = {};
  const servedResponses: Promise<void>[] = [];
  const launchPage = async (viewport: { width: number; height: number }, phase: string) => {
    browser = await chromium.launch({
      executablePath: process.env.FOREST_QA_BROWSER || process.env.SCENE_BROWSER_PATH || undefined,
      headless: true,
      args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
    });
    // A real second tab remains available for native visibility observation.
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1, serviceWorkers: 'block' });
    const nextPage = await context.newPage();
    nextPage.setDefaultTimeout(45000);
    nextPage.on('pageerror', (error) => report.errors.push(`${phase}: ${error.message}`));
    nextPage.on('console', (message) => {
      if (message.type() === 'error' && /three|webgl|shader|program/i.test(message.text())) report.errors.push(`${phase}: ${message.text()}`);
    });
    nextPage.on('response', (response) => {
      const url = new URL(response.url());
      if (url.origin === new URL(harnessURL).origin && url.pathname.includes('/forest/') && /\.(?:tsx?|css|html)$/.test(url.pathname)) {
        servedResponses.push(response.body().then((bytes) => { servedModulesSha256[`${phase}:${url.pathname}${url.search}`] = createHash('sha256').update(bytes).digest('hex'); }).catch((error) => { report.errors.push(`Hash served response ${url.pathname}: ${String(error)}`); }));
      }
    });
    await nextPage.goto(`${harnessURL}?paused=1`, { waitUntil: 'domcontentloaded' });
    await nextPage.waitForFunction(() => ['ready', 'failed'].includes(document.querySelector<HTMLElement>('.forest-world')?.dataset.state ?? ''), undefined, { timeout: 90000 });
    const state = await nextPage.locator('.forest-world').getAttribute('data-state');
    check(`${phase}: engine ready instead of fallback`, state === 'ready', { state });
    await waitForRunning(nextPage, false);
    await nextPage.waitForFunction(() => Number(document.querySelector<HTMLCanvasElement>('.forest-world-canvas')?.dataset.frames) > 0);
    report.browserEnvironment ??= {};
    report.browserEnvironment[phase] = {
      version: browser.version(), executablePath: process.env.FOREST_QA_BROWSER || process.env.SCENE_BROWSER_PATH || 'Playwright-managed Chromium',
      viewport, dpr: 1, route: nextPage.url(),
      ...await nextPage.evaluate(() => {
        const gl = document.querySelector<HTMLCanvasElement>('.forest-world-canvas')?.getContext('webgl2');
        const extension = gl?.getExtension('WEBGL_debug_renderer_info');
        return { userAgent: navigator.userAgent, renderer: gl && extension ? gl.getParameter(extension.UNMASKED_RENDERER_WEBGL) : gl?.getParameter(gl.RENDERER), webglVersion: gl?.getParameter(gl.VERSION) };
      }),
    };
    return nextPage;
  };
  const captureView = async (filename: string) => {
    const image = await screenshot(page!, filename, report);
    if (process.env.FOREST_QA_DIRECT_CAPTURE === '1') {
      await screenshot(page!, filename.replace(/\.png$/, '-scene.png'), report, 'direct-webgl-png');
    }
    return image;
  };

  try {
    await mkdir(outputDirectory, { recursive: true });
    const sources = (await readdir(sceneDirectory)).filter((filename) => /\.(?:tsx?|css|html)$/.test(filename) && (!filename.includes('.test.') || filename === 'forest.browser.test.ts')).sort();
    const hashes = await Promise.all(sources.map(async (filename) => [filename, createHash('sha256').update(await readFile(path.join(sceneDirectory, filename))).digest('hex')]));
    report.sourceIdentity = {
      commit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repositoryDirectory, encoding: 'utf8' }).trim(),
      workingTree: execFileSync('git', ['status', '--short'], { cwd: repositoryDirectory, encoding: 'utf8' }).trim(),
      sourceSha256: Object.fromEntries(hashes), servedModulesSha256,
      servingMode: 'Vite development harness; hashes cover actual served transformed modules and HTML, not an optimized production bundle.',
    };
    if (process.env.FOREST_QA_BROWSER) {
      await access(process.env.FOREST_QA_BROWSER, constants.X_OK);
      const executable = await stat(process.env.FOREST_QA_BROWSER);
      if (!executable.isFile() || executable.size === 0) throw new Error('FOREST_QA_BROWSER must name a nonempty installed executable');
    } else {
      execFileSync(process.execPath, [path.join(repositoryDirectory, 'node_modules/playwright-core/cli.js'), 'install', '--with-deps', 'chromium'], {
        cwd: repositoryDirectory, env: process.env, stdio: 'inherit', timeout: 180000,
      });
    }
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

    page = await launchPage({ width: 1280, height: 800 }, 'visual');
    const initial = await diagnostic(page);
    check('Initial active=false mount draws a static 3D frame', initial.running === 'false' && Number(initial.frames) > 0 && Number(initial.time) === 0, initial);
    check('Nonzero rendered geometry and full desktop buffer', Number(initial.triangles) > 1000 && Number(initial.drawCalls) > 0 && initial.cssWidth === 1280 && initial.cssHeight === 800 && initial.width === 1280 && initial.height === 800, initial);

    try {
      // Capture all three layouts while the scene remains initially inactive.
      // Each actual resize requests only the final native frame. Real DOM and CSS
      // remain present in every compositor PNG; capture adds no forced redraw.
      await captureView('forest-desktop.png');
      let landscape: Screenshot | null = null;

      for (const size of [{ width: 344, height: 800, filename: 'forest-fold-portrait.png' }, { width: 882, height: 344, filename: 'forest-fold-landscape.png' }]) {
        await page.setViewportSize({ width: size.width, height: size.height });
        await page.waitForFunction(({ width, height }) => {
          const canvas = document.querySelector<HTMLCanvasElement>('.forest-world-canvas');
          return canvas?.clientWidth === width && canvas.clientHeight === height && canvas.width === width && canvas.height === height && canvas.dataset.gpuQueued === 'false';
        }, size);
        const view = await captureView(size.filename);
        if (size.filename === 'forest-fold-landscape.png') landscape = view;
        check(`Actual ${size.width}×${size.height} layout renders`, Number((await diagnostic(page)).triangles) > 1000, await diagnostic(page));
      }

      // Compare motion at the same requested native landscape dimensions.
      // This changes the test viewport, not scene quality/DPR.
      const movementBefore = await diagnostic(page);
      check('Static layout captures preserve the initial inactive simulation', movementBefore.running === 'false' && movementBefore.time === initial.time, { initial, afterThreeLayouts: movementBefore });
      await page.getByTestId('active-toggle').dispatchEvent('click');
      await waitForRunning(page, true);
      await page.waitForFunction((time) => Number(document.querySelector<HTMLCanvasElement>('.forest-world-canvas')?.dataset.time) > time + .25, Number(movementBefore.time));
      const motion = await captureView('forest-motion.png');
      const movementAfter = await diagnostic(page);
      imageMovementPassed = !!landscape && !!motion && landscape.method === motion.method && landscape.width === 882 && landscape.height === 344 && motion.width === 882 && motion.height === 344 && landscape.sha256 !== motion.sha256 && Number(movementAfter.frames) > Number(movementBefore.frames) && Number(movementAfter.time) > Number(movementBefore.time);
      // A visual failure cannot count as success even if clean functional QA passes.
      report.checks.push({ name: 'Actual rendered motion changes the image', passed: imageMovementPassed, detail: { nativeViewport: [882, 344], before: movementBefore, after: movementAfter, beforeImage: landscape?.sha256, afterImage: motion?.sha256, beforeMethod: landscape?.method, afterMethod: motion?.method } });

    } catch (error) {
      report.visualFailure = error instanceof Error ? error.message : String(error);
      for (const filename of ['forest-desktop.png', 'forest-fold-portrait.png', 'forest-fold-landscape.png', 'forest-motion.png']) {
        if (!report.screenshots.some((shot) => shot.filename === filename)) {
          report.dependentEvidence.push({ evidence: filename, status: 'tainted/not-run', reason: report.visualFailure });
        }
      }
    }

    // A Promise.race or CDP detach never cancels an outstanding GPU/readback
    // request. Close the entire visual browser before clean no-capture QA.
    // If close itself fails, do not start another browser over unresolved work.
    try {
      await bounded(browser!.close(), 'Close visual browser before isolated lifecycle', 30000);
    } catch (error) {
      report.dependentEvidence.push({ evidence: 'Clean no-capture lifecycle browser', status: 'tainted/not-run', reason: `Visual browser could not be closed; no overlapping browser launched: ${String(error)}` });
      throw error;
    }
    browser = undefined;
    page = undefined;
    report.lifecycleIsolation = { separateFreshBrowser: true, screenshotsRequested: 0, visualPageTainted: !!report.visualFailure, status: 'running' };
    page = await launchPage({ width: 882, height: 344 }, 'clean-functional');
    await page.getByTestId('qa-run').dispatchEvent('click');
    // These generous waits accommodate software rendering only. The scene's
    // resolution, materials, geometry, simulation step and RAF remain unchanged.
    await page.waitForFunction(() => ['passed', 'failed'].includes(document.querySelector<HTMLElement>('[data-testid="qa-status"]')?.dataset.state ?? ''), undefined, { timeout: 300000 });
    report.lifecycleReport = JSON.parse(await page.getByTestId('qa-report').innerText());
    const lifecycleState = await page.getByTestId('qa-status').getAttribute('data-state');
    check('Clean no-capture real-component lifecycle and interactions pass', lifecycleState === 'passed', report.lifecycleReport);

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
    report.lifecycleIsolation = { ...report.lifecycleIsolation, status: 'passed' };
    check('No page or WebGL shader errors', report.errors.length === 0, report.errors);
    const capturedViews = ['forest-desktop', 'forest-motion', 'forest-fold-portrait', 'forest-fold-landscape'].every((name) => report.screenshots.some((shot) => shot.filename === `${name}.png` && shot.method === 'cdp-surface-png'));
    check('Native-resolution capture and motion evidence complete', capturedViews && imageMovementPassed && report.captureFailures.length === 0 && !report.visualFailure, { capturedViews, imageMovementPassed, captureFailures: report.captureFailures, visualFailure: report.visualFailure, methods: report.screenshots.map(({ filename, method }) => ({ filename, method })) });
    report.status = 'passed';
  } catch (error) {
    caught = error;
    report.status = 'failed';
    report.failure = error instanceof Error ? `${error.message}\n${error.stack ?? ''}` : String(error);
    report.serverLog = serverLog;
    if (report.lifecycleIsolation?.status === 'running') report.lifecycleIsolation.status = 'failed';
  } finally {
    // No failure screenshots or end-of-test rescue captures: they would taint
    // the independent functional run or overlap an unresolved capture request.
    if (browser) await bounded(browser.close(), 'Final browser close', 30000).catch((error) => { report.errors.push(String(error)); });
    if (server && server.exitCode === null) {
      server.kill('SIGTERM');
      await Promise.race([new Promise<void>((resolve) => server!.once('exit', () => resolve())), delay(1500)]);
      if (server.exitCode === null) server.kill('SIGKILL');
    }
    await Promise.allSettled(servedResponses);
    report.finishedAt = new Date().toISOString();
    await mkdir(outputDirectory, { recursive: true });
    await writeFile(path.join(outputDirectory, 'forest-browser-report.json'), JSON.stringify(report, null, 2));
    console.log(`FOREST_BROWSER_REPORT ${JSON.stringify(report)}`);
  }
  if (caught) throw caught;
}, 900000);
