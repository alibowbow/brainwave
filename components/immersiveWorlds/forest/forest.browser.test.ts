import { it, expect } from 'vitest';
import { chromium, type Browser, type Page } from 'playwright-core';
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
type Screenshot = { filename: string; bytes: number; sha256: string; width: number; height: number };
interface BrowserReport {
  status: 'running' | 'passed' | 'failed';
  startedAt: string;
  finishedAt?: string;
  renderer: string;
  limitations: string[];
  screenshots: Screenshot[];
  checks: { name: string; passed: boolean; detail: unknown }[];
  errors: string[];
  lifecycleReport?: unknown;
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

async function screenshot(page: Page, filename: string, report: BrowserReport) {
  const buffer = await page.screenshot({ type: 'jpeg', quality: 86, animations: 'allow' });
  const viewport = page.viewportSize()!;
  const evidence: Screenshot = {
    filename, bytes: buffer.length, sha256: createHash('sha256').update(buffer).digest('hex'),
    width: viewport.width, height: viewport.height,
  };
  await writeFile(path.join(outputDirectory, filename), buffer);
  report.screenshots.push(evidence);
  // Transfer visual evidence in existing CI logs without changing workflow
  // permissions, adding an upload action or using an external storage service.
  const encoded = buffer.toString('base64'), chunkSize = 8192;
  const count = Math.ceil(encoded.length / chunkSize);
  for (let index = 0; index < count; index++) {
    console.log(`FOREST_SCREENSHOT ${filename} ${index + 1}/${count} ${encoded.slice(index * chunkSize, (index + 1) * chunkSize)}`);
  }
  return evidence;
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
      'Reduced motion is tested with browser media emulation and the actual app class.',
      'The hidden-state hook is simulated only inside this isolated test document; actual OS/tab backgrounding remains unverified.',
      'DOM gesture assertions use PointerEvents through the component; they are not physical touchscreen tests.',
    ],
    screenshots: [], checks: [], errors: [],
  };
  let browser: Browser | undefined;
  let page: Page | undefined;
  let server: ChildProcess | undefined;
  let serverLog = '';
  let caught: unknown;
  const check = (name: string, passed: boolean, detail: unknown) => {
    report.checks.push({ name, passed, detail });
    expect(passed, `${name}: ${JSON.stringify(detail)}`).toBe(true);
  };

  try {
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
    await page.goto(harnessURL, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => ['ready', 'failed'].includes(document.querySelector<HTMLElement>('.forest-world')?.dataset.state ?? ''), undefined, { timeout: 90000 });
    const state = await page.locator('.forest-world').getAttribute('data-state');
    check('Engine ready instead of fallback', state === 'ready', { state });
    await waitForRunning(page, true);
    await page.waitForFunction(() => Number(document.querySelector<HTMLCanvasElement>('.forest-world-canvas')?.dataset.frames) > 2);
    const initial = await diagnostic(page);
    check('Nonzero rendered geometry and full desktop buffer', Number(initial.triangles) > 1000 && Number(initial.drawCalls) > 0 && initial.cssWidth === 1280 && initial.cssHeight === 800 && initial.width === 1280 && initial.height === 800, initial);

    // Capture all three layouts before interaction tests so a failure still
    // leaves real-renderer visual evidence for review in the CI log.
    await page.evaluate(() => { document.querySelector<HTMLElement>('.forest-harness')!.dataset.capture = 'true'; });
    await page.waitForTimeout(900);
    const desktop = await screenshot(page, 'forest-desktop.jpg', report);
    const movementBefore = await diagnostic(page);
    await page.waitForFunction((time) => Number(document.querySelector<HTMLCanvasElement>('.forest-world-canvas')?.dataset.time) > time + .25, Number(movementBefore.time));
    const motion = await screenshot(page, 'forest-motion.jpg', report);
    const movementAfter = await diagnostic(page);
    check('Actual rendered motion changes the image', desktop.sha256 !== motion.sha256 && Number(movementAfter.frames) > Number(movementBefore.frames) && Number(movementAfter.time) > Number(movementBefore.time), { before: movementBefore, after: movementAfter, beforeImage: desktop.sha256, afterImage: motion.sha256 });

    for (const size of [{ width: 344, height: 800, filename: 'forest-fold-portrait.jpg' }, { width: 882, height: 344, filename: 'forest-fold-landscape.jpg' }]) {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.waitForFunction(({ width, height }) => {
        const canvas = document.querySelector<HTMLCanvasElement>('.forest-world-canvas');
        return canvas?.clientWidth === width && canvas.clientHeight === height && canvas.width === width && canvas.height === height;
      }, size);
      const before = await diagnostic(page);
      await page.waitForFunction((frames) => Number(document.querySelector<HTMLCanvasElement>('.forest-world-canvas')?.dataset.frames) > frames + 1, Number(before.frames));
      await screenshot(page, size.filename, report);
      check(`Actual ${size.width}×${size.height} layout renders`, Number((await diagnostic(page)).triangles) > 1000, await diagnostic(page));
    }

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.evaluate(() => { document.querySelector<HTMLElement>('.forest-harness')!.dataset.capture = 'false'; });
    await page.getByTestId('qa-run').dispatchEvent('click');
    await page.waitForFunction(() => ['passed', 'failed'].includes(document.querySelector<HTMLElement>('[data-testid="qa-status"]')?.dataset.state ?? ''), undefined, { timeout: 130000 });
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

    // Test only the hook's response to hidden. This is deliberately separate
    // from a real tab/background test, which headless CI cannot substantiate.
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
            if (report.screenshots.some((shot) => shot.filename === size.filename)) continue;
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
}, 420000);
