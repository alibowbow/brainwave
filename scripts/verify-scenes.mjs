// Actual registered worlds and explicitly isolated legacy fallback regressions.
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { assessSceneDisposal, canContinueDfgDiagnostic, requireReleaseDeadline, sampleSceneDisposal } from './scene-disposal-contract.mjs';
import { ownBrowserServer } from './owned-browser.mjs';
import { beginVerificationProvenance } from './verification-provenance.mjs';
import { installNativeTextureLedger } from './native-texture-ledger.mjs';
import { readInstalledDfg, attestTextureUploads } from './expected-dfg.mjs';

const BASE = (process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173').replace(/\/?$/, '/');
const output = process.env.SCENE_SCREENSHOT_DIR;
const reportDir = output || 'artifacts';
await mkdir(reportDir, { recursive: true });
let browser, owned;
const provenance = await beginVerificationProvenance({ baseUrl: BASE, outputDirs: [reportDir] });
const report = { scope: 'Actual 13 Nature studio worlds, then isolated intentional lazy-load failure regression for all legacy artwork/controls/video.', checks: [], fallbackPoints: [], sceneProgress: [], expectedImportFailures: [], errors: [], status: 'running' };
report.provenance = provenance.data;
const expectedDfg = await readInstalledDfg();
report.rendererInternalTextureReference = { ...expectedDfg, bytes: undefined, words: undefined,
  scope: 'Expected installed Three CPU data; runtime upload and raw handle evidence must independently match. Internal retention is unresolved, not an overall release waiver.' };
report.deadlines = { generalNatureReadyMs: 240_000, freshWinterReadyMs: 120_000, rendererReleaseIncludingRetentionMs: 20_000, contextCleanupMs: 15_000 };
const saveReport = () => writeFile(`${reportDir}/nature-verification.json`, `${JSON.stringify(report, null, 2)}\n`);
const bounded = async (promise, timeout, label) => {
  let timer;
  try { return await Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} exceeded ${timeout}ms`)), timeout); })]); }
  finally { clearTimeout(timer); }
};
const check = async (name, run) => {
  const entry = { name, status: 'running', startedAt: new Date().toISOString() }; report.checks.push(entry); await saveReport();
  try { await run(); entry.status = 'passed'; console.log(`PASS: ${name}`); }
  catch (error) { entry.status = 'failed'; entry.failure = String(error); throw error; }
  finally { entry.finishedAt = new Date().toISOString(); await saveReport(); }
};
const closeContext = async context => {
  try { await bounded(context.close(), 15_000, 'browser context cleanup'); }
  catch (error) { report.errors.push({ phase: 'context cleanup', message: String(error) }); await saveReport(); throw error; }
};
const saved = page => page.evaluate(() => JSON.parse(localStorage.getItem('mc_nature_state')));
const capture = async (page, name) => { if (output) await page.screenshot({ path: `${output}/${name}.png`, timeout: 60_000 }); };
const openNature = async page => {
  for (let attempt = 0; attempt < 20; attempt++) {
    try { await page.goto(`${BASE}#/nature`); break; }
    catch (error) { if (attempt === 19) throw error; await new Promise(resolve => setTimeout(resolve, 250)); }
  }
  await page.locator('.sound-studio').waitFor();
};
const mixButton = (page, name) => page.locator('.sound-mix-grid > button').filter({ has: page.getByText(name, { exact: true }) });

async function verifyLiveNature() {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
  await context.addInitScript(installNativeTextureLedger, expectedDfg);
  await context.addInitScript(() => {
    window.__natureVerification = { contexts: [], media: [], callbacks: [], documentStartedAtMs: performance.now() };
    // Track native renderer canvas listeners, excluding our own observers.
    // Surface/window input listeners are verified by separate source/unit tests.
    const listenerStates = new WeakMap();
    const stateFor = canvas => {
      if (!listenerStates.has(canvas)) listenerStates.set(canvas, { records: [], added: 0, removed: 0 });
      return listenerStates.get(canvas);
    };
    const nativeAdd = EventTarget.prototype.addEventListener;
    const nativeRemove = EventTarget.prototype.removeEventListener;
    const captureFlag = options => typeof options === 'boolean' ? options : !!options?.capture;
    const tracked = (target, type) => target instanceof HTMLCanvasElement && /^webglcontext(lost|restored|creationerror)$/.test(type);
    EventTarget.prototype.addEventListener = function(type, callback, options) {
      const result = nativeAdd.call(this, type, callback, options);
      if (callback && tracked(this, type)) {
        const state = stateFor(this), capture = captureFlag(options);
        if (!state.records.some(x => x.type === type && x.callback === callback && x.capture === capture)) {
          state.records.push({ type, callback, capture }); state.added++;
        }
      }
      return result;
    };
    EventTarget.prototype.removeEventListener = function(type, callback, options) {
      const result = nativeRemove.call(this, type, callback, options);
      if (tracked(this, type)) {
        const state = stateFor(this), capture = captureFlag(options), before = state.records.length;
        state.records = state.records.filter(x => x.type !== type || x.callback !== callback || x.capture !== capture);
        state.removed += before - state.records.length;
      }
      return result;
    };
    const identity = item => {
      const canvas = item.canvas;
      const slot = canvas.closest('[data-immersive-world-id]');
      if (slot) item.worldId = slot.dataset.immersiveWorldId;
      const value = { className: canvas.className, id: canvas.id, worldId: item.worldId ?? null,
        connected: canvas.isConnected, lifecycle: canvas.dataset.lifecycle ?? null, disposed: canvas.dataset.disposed ?? null,
        gpuState: canvas.dataset.gpuState ?? null, running: canvas.dataset.running ?? null,
        disposeStartMs: canvas.dataset.disposeStartMs ?? null, disposeEndMs: canvas.dataset.disposeEndMs ?? null };
      const key = JSON.stringify(value);
      if (key !== item.lastIdentityKey) {
        item.lastIdentityKey = key;
        item.events.push({ kind: 'identity-or-lifecycle-attribute-observed', atMs: performance.now(), ...value });
      }
      return value;
    };
    // Observe owner-provided lifecycle attributes without calling engine methods.
    // Attribute observation is not proof of an unexposed dispose() entry/return.
    new MutationObserver(() => window.__natureVerification.contexts.forEach(identity)).observe(document, {
      subtree: true, childList: true, attributes: true,
      attributeFilter: ['class', 'id', 'data-immersive-world-id', 'data-lifecycle', 'data-disposed', 'data-gpu-state', 'data-running', 'data-dispose-start-ms', 'data-dispose-end-ms'],
    });
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (...args) {
      const gl = getContext.apply(this, args);
      if (gl && /^(webgl2?|experimental-webgl)$/.test(args[0]) && !window.__natureVerification.contexts.some(x => x.gl === gl)) {
        const item = { id: window.__natureVerification.contexts.length + 1, gl, canvas: this, draws: 0,
          createdAtMs: performance.now(), events: [], listeners: stateFor(this), glDeletes: {},
          textureLedger: window.__createNativeTextureLedger(gl) };
        nativeAdd.call(this, 'webglcontextlost', event => {
          item.textureLedger.noteContextLost();
          item.events.push({ kind: 'webglcontextlost', isTrusted: event.isTrusted, atMs: performance.now() });
        });
        nativeAdd.call(this, 'webglcontextrestored', event => item.events.push({ kind: 'webglcontextrestored', isTrusted: event.isTrusted, atMs: performance.now() }));
        identity(item);
        window.__natureVerification.contexts.push(item);
        for (const key of ['drawArrays', 'drawElements', 'drawArraysInstanced', 'drawElementsInstanced']) {
          if (typeof gl[key] !== 'function') continue;
          const original = gl[key].bind(gl);
          gl[key] = (...values) => { item.draws++; return original(...values); };
        }
        // These call counts support resource accounting; they do not measure
        // physical GPU memory or require renderer-internal handles to reach 0.
        for (const key of ['deleteBuffer', 'deleteTexture', 'deleteProgram', 'deleteShader', 'deleteFramebuffer', 'deleteRenderbuffer', 'deleteVertexArray', 'deleteSync']) {
          if (typeof gl[key] !== 'function') continue;
          const original = gl[key].bind(gl);
          gl[key] = (...values) => { item.glDeletes[key] = (item.glDeletes[key] || 0) + 1; return original(...values); };
        }
      }
      return gl;
    };
    const create = document.createElement.bind(document);
    document.createElement = function (tag, ...args) {
      const node = create(tag, ...args);
      if (String(tag).toLowerCase() === 'audio') window.__natureVerification.media.push(node);
      return node;
    };
  });
  const page = await context.newPage();
  provenance.attach(page, 'application');
  page.setDefaultTimeout(120_000);
  page.on('pageerror', e => report.errors.push({ phase: 'live Nature', message: e.message }));
  const snapshot = () => page.evaluate(() => {
    const slot = document.querySelector('.sound-stage [data-immersive-world-id]');
    const root = slot?.querySelector('[data-motion]'), canvas = slot?.querySelector('canvas');
    const observed = window.__natureVerification.contexts.find(x => x.canvas === canvas);
    return { id: slot?.dataset.immersiveWorldId, state: root?.dataset.state ?? root?.dataset.status,
      callbacks: Number(slot?.dataset.worldCallbacks || 0),
      motion: root?.dataset.motion, width: canvas?.width, height: canvas?.height, data: canvas ? { ...canvas.dataset } : null,
      draws: observed?.draws ?? 0, lost: observed?.gl.isContextLost() ?? null };
  });
  const ready = async (id, timeout = 240_000) => {
    await page.waitForFunction(id => {
      const slot = document.querySelector('.sound-stage [data-immersive-world-id]');
      const root = slot?.querySelector('[data-motion]'), canvas = slot?.querySelector('canvas');
      const observed = window.__natureVerification.contexts.find(x => x.canvas === canvas);
      return slot?.dataset.immersiveWorldId === `nature:${id}` && (root?.dataset.state ?? root?.dataset.status) === 'ready'
        && canvas?.width > 0 && canvas?.height > 0 && observed?.draws > 0 && !observed.gl.isContextLost();
    }, id, { timeout });
    assert.equal(await page.locator('.sound-stage canvas').count(), 1);
    assert.equal(await page.locator('.sound-stage .landscape').count(), 0, 'registered world must not silently pass on legacy fallback');
    assert.equal((await saved(page)).sceneId, id);
  };
  const selected = async (id, name, timeout = 240_000) => {
    await mixButton(page, name).click(); await ready(id, timeout);
    await page.evaluate(() => window.scrollTo(0, 0));
  };
  const still = async () => {
    await page.waitForFunction(() => document.querySelector('.sound-stage [data-immersive-world-id] [data-motion]')?.dataset.motion === 'paused');
    const initial = await snapshot();
    let prior = initial, stableSince = Date.now(); const deadline = Date.now() + 15_000;
    while (Date.now() - stableSince < 400) {
      await page.waitForTimeout(100); const next = await snapshot();
      assert.equal(next.motion, 'paused'); assert.equal(next.lost, false);
      assert.equal(next.data.time ?? next.data.elapsed, initial.data.time ?? initial.data.elapsed, 'paused simulation must not advance');
      if (JSON.stringify([next.draws, next.width, next.height]) !== JSON.stringify([prior.draws, prior.width, prior.height])) stableSince = Date.now();
      prior = next; assert.ok(Date.now() < deadline, 'paused resize/draws must settle within 15 seconds');
    }
    await page.waitForTimeout(500); const after = await snapshot();
    assert.equal(after.draws, prior.draws, 'settled paused renderer submits no further draws');
    assert.equal(after.data.time ?? after.data.elapsed, initial.data.time ?? initial.data.elapsed);
  };
  const running = async () => {
    const previous = await snapshot();
    await page.waitForFunction(previousDraws => {
      const canvas = document.querySelector('.sound-stage canvas');
      const observed = window.__natureVerification.contexts.find(x => x.canvas === canvas);
      return canvas?.closest('[data-motion]')?.dataset.motion === 'running' && observed?.draws > previousDraws;
    }, previous.draws);
  };
  const all = [
    ['rural_summer_night', '시골 여름밤'], ['tent_rain', '텐트 속 빗소리'], ['window_rain', '비 오는 창가'],
    ['monsoon_eaves', '장마철 처마'], ['deep_sea', '깊은 바다'], ['pebble_shore', '몽돌 해변'],
    ['bamboo_grove', '대나무숲'], ['temple_dawn', '산사의 아침'], ['summer_valley', '여름 계곡'],
    ['scops_night', '소쩍새 밤'], ['campfire', '모닥불 캠핑'], ['womb', '포근한 심장'], ['winter_lodge', '겨울 산장'],
  ];
  const releaseObserved = async label => {
    const startedAt = Date.now(); // Includes navigation, detach and the host's 5 s retention.
    const result = { label, configuredTimeoutMs: 20_000, startedAt, status: 'running',
      evidenceLevels: {
        actualApp: 'Host records actual dispose calls/returns; retained canvas identity, owner post-dispose diagnostics, native canvas-listener removal, GL delete calls and subsequent draw/frame stability.',
        sourceUnit: 'Real CozyEngine resource traversal, exact disposal/lifetime increments, RAF cancellation and owned listener cleanup tested with a mocked renderer. No actual GPU inference.',
        limits: 'Observer intentionally retains old canvas/GL references. No GC wait or physical GPU reclamation measurement. Cozy automatic context loss is recorded, not required.',
      } };
    (report.rendererReleases ??= []).push(result);
    let previous;
    try {
      await bounded(page.evaluate(() => { location.hash = '#/guide'; }), 20_000, 'leave Nature');
      for (;;) {
        const remaining = 20_000 - (Date.now() - startedAt);
        assert.ok(remaining > 0, 'renderer release exceeded fixed 20s including host retention');
        const sample = attestTextureUploads(await bounded(page.evaluate(sampleSceneDisposal), remaining, 'renderer disposal observation'));
        const acknowledgedAt = Date.now();
        requireReleaseDeadline(startedAt, sample.observedAt, acknowledgedAt);
        const assessments = sample.contexts.map(assessSceneDisposal);
        result.observed = sample; result.assessments = assessments;
        const ready = sample.contexts.length > 0 && assessments.every(x => x.ready);
        const quiet = previous && sample.observedAt - previous.observedAt >= 500 && sample.contexts.every(x => {
          const prior = previous.contexts.find(p => p.id === x.id);
          return prior && x.draws === prior.draws && (!Number.isFinite(x.frames) || x.frames === prior.frames);
        });
        if (ready && quiet) {
          result.actualWaitElapsedMs = acknowledgedAt - startedAt; result.status = 'passed';
          result.quietWindowMs = sample.observedAt - previous.observedAt;
          result.quietStart = previous;
          await saveReport(); return result;
        }
        if (ready && !previous) previous = sample;
        else if (!ready || (previous && sample.contexts.some(x => x.draws !== previous.contexts.find(p => p.id === x.id)?.draws))) previous = undefined;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      result.status = 'failed'; result.actualWaitElapsedMs = Date.now() - startedAt; result.failure = String(error);
      // Preserve the failed deadline before a separately bounded diagnostic read.
      report.contextReleaseFailure = result; await saveReport();
      try { result.failureObservation = attestTextureUploads(await bounded(page.evaluate(sampleSceneDisposal), 5000, 'release failure diagnostics')); }
      catch (diagnosticError) { result.diagnosticError = String(diagnosticError); }
      await saveReport(); throw error;
    }
  };
  const freshCozySession = async oldRelease => {
    const startedAt = Date.now();
    const entry = { configuredTimeoutMs: 120_000, status: 'running',
      scope: 'Actual App fresh Winter after observed disposal; separate from the original owner four-world 120s sequence, whose failure remains open.' };
    report.cozyFreshSession = entry;
    try {
      await bounded((async () => {
        await page.evaluate(() => { location.hash = '#/nature'; });
        await page.locator('.sound-studio').waitFor();
        await mixButton(page, '겨울 산장').click();
        await ready('winter_lodge', Math.max(1, 120_000 - (Date.now() - startedAt)));
      })(), 120_000, 'fresh Winter ready');
      entry.readyElapsedMs = Date.now() - startedAt;
      assert.ok(entry.readyElapsedMs <= 120_000, 'fresh-ready acknowledgement must also arrive within 120 seconds');
      const fresh = await snapshot();
      const old = oldRelease.observed.contexts.filter(x => x.worldId === 'nature:winter_lodge');
      assert.ok(old.length > 0, 'must have disposed an actual old Winter');
      assert.ok(old.every(x => x.instance !== Number(fresh.data.instance)), 'fresh Winter must have a distinct engine instance');
      assert.ok(await page.evaluate(ids => {
        const current = document.querySelector('.sound-stage canvas');
        return window.__natureVerification.contexts.filter(x => ids.includes(x.id)).every(x => x.canvas !== current && !x.canvas.isConnected);
      }, old.map(x => x.id)), 'fresh Winter must use a new canvas');
      entry.fresh = fresh;
      await page.locator('.sound-play').click(); await running();
      // Move from the actual Play control through native keyboard focus to the
      // last preceding Cozy action, then activate it once with Enter.
      let focused = false;
      for (let i = 0; i < 12; i++) {
        await page.keyboard.press('Shift+Tab');
        focused = await page.evaluate(() => !!document.activeElement?.matches('.cozy-world-access button'));
        if (focused) break;
      }
      assert.ok(focused, 'native keyboard must reach an enabled Cozy action');
      const before = await snapshot();
      await page.keyboard.press('Enter');
      await page.waitForFunction(callbacks => Number(document.querySelector('.sound-stage [data-immersive-world-id]')?.dataset.worldCallbacks) > callbacks, before.callbacks);
      assert.equal((await snapshot()).callbacks - before.callbacks, 1, 'one native Enter must emit one real scene callback');
      entry.nativeKeyboardAction = await page.evaluate(() => ({ label: document.activeElement?.textContent, focused: document.activeElement?.matches('.cozy-world-access button') }));
      await page.locator('.sound-play').click(); await still();
      entry.status = 'passed';
    } catch (error) { entry.status = 'failed'; entry.failure = String(error); throw error; }
    finally { entry.finishedAt = new Date().toISOString(); await saveReport(); }
  };
  const requireCozyLifetimeAdvance = (prior, next) => {
    assert.equal(next.observed.documentOrigin, prior.observed.documentOrigin, 'lifetime comparison must stay in the same document');
    const cozy = record => record.observed.contexts.filter(x => x.worldId === 'nature:winter_lodge');
    const old = cozy(prior), fresh = cozy(next).filter(x => !old.some(p => p.id === x.id));
    assert.equal(fresh.length, 1, 'one fresh Winter context must independently retire');
    assert.equal(fresh[0].host.diagnostics.lifetime.disposed,
      Math.max(...old.map(x => x.host.diagnostics.lifetime.disposed)) + 1,
      'actual owner lifetime must advance exactly once for the fresh session');
    assert.equal(fresh[0].host.diagnostics.lifetime.created,
      Math.max(...old.map(x => x.host.diagnostics.lifetime.created)) + 1,
      'actual owner lifetime must create exactly one fresh session');
    report.cozyLifetimeAdvance = { before: old.map(x => ({ id: x.id, lifetime: x.host.diagnostics.lifetime })), after: fresh[0].host.diagnostics.lifetime };
  };
  const targetedRelease = async (name, label) => {
    try {
      let release;
      await check(name, async () => { release = await releaseObserved(label); });
      return release;
    } catch (error) {
      const release = report.rendererReleases?.at(-1);
      // Continue independent fresh-session diagnostics only after observed real
      // retirement and an exact explanation of every remaining texture handle.
      // The resource/internal-retention check stays FAILED and the process must
      // still fail overall. This does not turn a timeout or unknown leak into pass.
      const safeToObserveFresh = canContinueDfgDiagnostic(release?.observed);
      if (!safeToObserveFresh) throw error;
      (report.diagnosticContinuations ??= []).push({ afterFailedCheck: name,
        reason: 'Actual owner retirement observed; exact DFG/internal handles remain unresolved. Continue independent fresh session, retaining overall failure.' });
      await check(`${label}: separate post-failure detached-canvas quiet observation`, async () => {
        const before = release.observed;
        await new Promise(resolve => setTimeout(resolve, 500));
        const after = attestTextureUploads(await bounded(page.evaluate(sampleSceneDisposal), 5000, 'retired canvas quiet observation'));
        assert.ok(canContinueDfgDiagnostic(after, before), 'retirement, exact DFG identity and context set must remain qualified after quiet observation');
        for (const old of before.contexts) {
          const current = after.contexts.find(x => x.id === old.id);
          assert.ok(current && !current.connected);
          assert.equal(current.draws, old.draws, 'retired renderer must submit no further GL draws');
          if (Number.isFinite(old.frames)) assert.equal(current.frames, old.frames);
        }
        release.separateQuietObservation = { before, after,
          scope: 'Additional observation after failed 20s resource gate; does not change that failed deadline.' };
      });
      await saveReport(); return release;
    }
  };
  try {
    await openNature(page);
    if (process.env.SCENE_VERIFY_SCOPE === 'cozy-disposal') {
      report.scope = 'Targeted actual App Winter disposal contract and fresh session; does not replace the original owner four-world 120s sequence.';
      await bounded(selected('winter_lodge', '겨울 산장', 120_000), 120_000, 'targeted initial Winter ready'); await still();
      const released = await targetedRelease('Cozy real disposal postconditions within 20s including retention', 'targeted old Winter');
      await check('fresh actual Winter uses new canvas/instance, ready within 120s and native keyboard', async () => { await freshCozySession(released); });
      const freshRelease = await targetedRelease('fresh Winter independently disposes once with no further draws', 'targeted fresh Winter');
      await check('actual fresh owner lifetime created/disposed advances once', async () => { requireCozyLifetimeAdvance(released, freshRelease); });
      return;
    }
    await check('all 13 Nature cards select their exact independent rendered world', async () => {
      assert.equal(await page.locator('.sound-mix-grid > button').count(), all.length, 'update the explicit coverage table when cards change');
      for (const [id, name] of all) { await selected(id, name); await still(); await capture(page, `live-${id}`); report.sceneProgress.push({ id, phase: 'live', status: 'passed' }); await saveReport(); }
    });
    await page.getByRole('checkbox', { name: '소리 유지', exact: true }).uncheck();
    await selected('rural_summer_night', '시골 여름밤');
    await check('live rural remains prominent with no overflow at four widths', async () => {
      for (const viewport of [{ width: 1440, height: 1000 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 344, height: 882 }]) {
        await page.setViewportSize(viewport); await still(); await page.evaluate(() => document.fonts.ready);
        const box = await page.locator('.sound-stage').boundingBox();
        assert.ok(box.y < 110); assert.ok(box.height > viewport.height * .58);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        await capture(page, `live-rural-${viewport.width}`);
      }
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await check('sound edits and kept sound layers preserve independent scenery and reload exactly', async () => {
      await selected('campfire', '모닥불 캠핑');
      const height = (await page.locator('.sound-stage').boundingBox()).height;
      await page.locator('.sound-option').filter({ hasText: '빗소리' }).click();
      assert.equal((await saved(page)).sceneId, 'campfire'); assert.equal((await saved(page)).mixId, null);
      await page.getByRole('button', { name: '소리 조절', exact: true }).click();
      const slider = page.getByRole('slider', { name: '빗소리 볼륨', exact: true });
      await slider.press('Home'); await slider.press('ArrowRight');
      await page.waitForFunction(() => JSON.parse(localStorage.getItem('mc_nature_state')).layers.find(x => x.type === 'rain')?.volume === .01);
      const layers = (await saved(page)).layers;
      await page.getByRole('checkbox', { name: '소리 유지', exact: true }).check();
      await selected('winter_lodge', '겨울 산장');
      assert.equal((await page.locator('.sound-stage').boundingBox()).height, height);
      assert.deepEqual((await saved(page)).layers, layers);
      const persisted = await saved(page); await page.reload(); await page.locator('.sound-studio').waitFor(); await ready('winter_lodge');
      assert.deepEqual(await saved(page), persisted, 'reload must preserve edited layers, volume, timer and scene identity');
    });
    await page.getByRole('checkbox', { name: '소리 유지', exact: true }).uncheck();
    await selected('rural_summer_night', '시골 여름밤');
    await check('real rural recording, motion preferences, inline mute and exact-canvas viewer continuity', async () => {
      await page.locator('.sound-play').click(); await running();
      await page.waitForFunction(() => window.__natureVerification.media.some(a => !a.paused && a.currentTime > .1));
      await page.evaluate(() => document.documentElement.classList.add('reduce-motion')); await still();
      await page.evaluate(() => document.documentElement.classList.remove('reduce-motion')); await running();
      await page.emulateMedia({ reducedMotion: 'reduce' }); await still();
      await page.emulateMedia({ reducedMotion: 'no-preference' }); await running();
      await page.locator('.sound-play').click(); await still();
      await page.evaluate(() => { window.__natureSavedCanvas = document.querySelector('.sound-stage canvas'); });
      await page.getByRole('button', { name: '장면만 보기', exact: true }).click();
      await page.locator('.nature-viewer-root').waitFor();
      assert.ok(await page.evaluate(() => window.__natureSavedCanvas === document.querySelector('.sound-stage canvas')));
      await page.getByRole('combobox', { name: '조절할 소리', exact: true }).selectOption('ruralCrickets');
      await page.locator('.scene-inspector').waitFor();
      assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('type')), 'range');
      await page.locator('.scene-inspector').getByRole('button', { name: '음소거', exact: true }).click();
      await page.waitForFunction(() => JSON.parse(localStorage.getItem('mc_nature_state')).layers.find(x => x.type === 'ruralCrickets')?.muted === true);
      assert.equal((await saved(page)).sceneId, 'rural_summer_night');
      await page.getByRole('button', { name: '소리 조절 닫기', exact: true }).click();
      await page.getByRole('button', { name: '전체화면 나가기', exact: true }).click();
      await page.waitForFunction(() => !document.querySelector('.nature-viewer-root'));
      assert.ok(await page.evaluate(() => window.__natureSavedCanvas === document.querySelector('.sound-stage canvas'))); await still();
    });
    let released;
    await check('leaving Nature satisfies each renderer disposal contract within 20s including retention', async () => {
      released = await releaseObserved('full Nature sequence');
    });
    await check('fresh actual Winter uses a distinct canvas/instance, ready within 120s and native keyboard', async () => {
      await freshCozySession(released);
    });
    await check('fresh Winter satisfies its disposal contract again', async () => { requireCozyLifetimeAdvance(released, await releaseObserved('fresh Winter after full Nature sequence')); });
  } finally { await closeContext(context); }
}

async function verifyLegacyFallback() {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, serviceWorkers: 'block' });
  const page = await context.newPage();
  provenance.attach(page, 'application');
  page.setDefaultTimeout(120_000);
  const blocked = [];
  // This is a separate, explicitly failing-network fixture, never evidence that
  // registered 3D scenes render. Both Vite development and production chunk
  // names follow the checked-in build contract; shared registry/slot stay live.
  await page.route('**/*', route => {
    const url = route.request().url(), pathname = new URL(url).pathname;
    const ownedModule = /\/assets\/world-[^/]+\.js$/.test(pathname)
      || /\/components\/immersiveWorlds\/(?:forest|cafe|cosmic|livingWoods|koreanPlaces|quietSanctuaries|deepWater|nightFires|waterEdge|rainShelters|cozyRooms)\//.test(pathname);
    if (route.request().resourceType() === 'script' && ownedModule) { blocked.push(url); return route.abort('failed'); }
    return route.continue();
  });
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
const capture = async name => { if (output) await page.screenshot({ path: `${output}/legacy-${name}.png`, timeout: 60_000 }); };
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
  await openNature(page);
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
  // Only source types anchored in the legacy illustration have scene buttons.
  // New profiles can legitimately use unanchored sources (deep_sea brown/drone).
  // Verify the exact expected intersection instead of requiring a fake point.
  const legacyPointLayers = {
    rural_summer_night: ['ruralCrickets'], tent_rain: ['tent', 'dthunder'],
    window_rain: ['window', 'eaves'], monsoon_eaves: ['eaves', 'rain'],
    deep_sea: ['deepsea'], pebble_shore: ['pebbles', 'wave', 'seabirds'],
    bamboo_grove: ['bamboo', 'birds', 'stream'], temple_dawn: ['temple', 'forest', 'birds'],
    summer_valley: ['stream', 'waterfall', 'cicadas'], scops_night: ['scops', 'night', 'stream'],
    campfire: ['fire', 'night', 'owl'], womb: ['heartbeat', 'brown'], winter_lodge: ['blizzard', 'fire'],
  };
  assert.equal(cards.length, Object.keys(legacyPointLayers).length);
  for (let i = 0; i < cards.length; i++) {
    await page.locator('.sound-mix-grid > button').nth(i).click();
    await page.waitForFunction(() => { const el = document.querySelector('.landscape'); return el?.dataset.scene === el?.dataset.requestedScene && !el.querySelector('.landscape-status'); });
    const id = (await saved()).sceneId;
    assert.ok(legacyPointLayers[id], `explicit legacy coverage for ${id}`);
    await page.evaluate(() => window.scrollTo(0, 0));
    const targets = page.locator('.landscape-point');
    const expectedTypes = (await saved()).layers.map(layer => layer.type).filter(type => legacyPointLayers[id].includes(type));
    assert.deepEqual((await targets.evaluateAll(elements => elements.map(el => el.dataset.sound))).sort(), [...expectedTypes].sort());
    report.fallbackPoints.push({ id, count: await targets.count(), expectedTypes });
    await saveReport();
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
    await capture(`scene-${i}`); report.sceneProgress.push({ id, phase: 'intentional legacy fallback', status: 'passed' }); await saveReport();
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
  // Cave is deliberately outside the 30-world registry. Restore its saved legacy
  // identity and exercise image failure/retry without relying on obsolete
  // cross-world React-boundary retention or an image that the 3D world never uses.
  await page.evaluate(() => {
    const state = JSON.parse(localStorage.getItem('mc_nature_state'));
    localStorage.setItem('mc_nature_state', JSON.stringify({ ...state, sceneId: 'cave', mixId: null, layers: [{ type: 'cave', volume: .4 }] }));
  });
  await page.route('**/cave-v5.webp*', route => route.abort());
  await page.reload(); await page.locator('.sound-studio').waitFor();
  await page.getByRole('button', { name: '다시 불러오기', exact: true }).waitFor();
  assert.equal(await scene().getAttribute('data-scene'), 'cave');
  assert.equal(await page.locator('[data-immersive-world-id]').count(), 0, 'unregistered legacy cave does not claim a 3D world');
  assert.equal((await saved()).sceneId, 'cave');
  assert.deepEqual((await saved()).layers, [{ type: 'cave', volume: .4 }]);
  await page.unroute('**/cave-v5.webp*');
  await page.getByRole('button', { name: '다시 불러오기', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.landscape')?.dataset.scene === 'cave' && !document.querySelector('.landscape-status'));
  await page.locator('.landscape-point[data-sound="cave"]').click();
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('type')), 'range');
  await page.getByRole('button', { name: '소리 조절 닫기', exact: true }).click();
  await page.evaluate(() => { document.documentElement.classList.remove('dark'); window.scrollTo(0, 0); });
  await capture('light-mobile');
  const unexpected = errors.filter(message => !blocked.some(url => message.includes(url)));
  assert.deepEqual(unexpected, [], 'only specifically intercepted lazy-module failures are expected');
  assert.ok(blocked.length > 0, 'legacy fallback fixture must actually interrupt world loading');
  report.expectedImportFailures.push(...blocked);
  report.checks.push('legacy fallback: all13 controls, focus, persistence, audio, mute, motion, video continuity, cave artwork failure/retry');
  console.log('PASS: scene prominence at 4 widths; all 13 scenes and their touch targets; inline focus; independent persisted scenery; real recording playback; mute; reduced motion; fullscreen video continuity and controls; artwork failure/retry.');
} finally { await closeContext(context); }

}

try {
  await saveReport();
  const server = await chromium.launchServer({ executablePath: process.env.SCENE_BROWSER_PATH || undefined, headless: true,
    args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  owned = ownBrowserServer(server, { closeTimeoutMs: 15_000, onError: error => { report.errors.push(error); report.status = 'failed'; process.exitCode = 1; } });
  report.browserOwnership = owned.state;
  await saveReport();
  const interrupted = signal => {
    report.interrupted = signal; report.status = 'failed'; process.exitCode = 1;
    void saveReport().catch(error => report.errors.push({ phase: 'signal report', message: String(error) })).finally(() => owned.close());
  };
  process.once('SIGTERM', () => interrupted('SIGTERM'));
  process.once('SIGINT', () => interrupted('SIGINT'));
  browser = await bounded(chromium.connect(server.wsEndpoint()), 10_000, 'owned browser connect');
  await verifyLiveNature();
  if (process.env.SCENE_VERIFY_SCOPE !== 'cozy-disposal') await check('intentional legacy fallback regression', verifyLegacyFallback);
  assert.ok(!report.checks.some(check => typeof check === 'object' && check.status === 'failed'), 'Independent diagnostics do not waive any failed lifecycle check');
  assert.deepEqual(report.errors, []);
  report.status = 'passed';
} catch (error) {
  report.status = 'failed'; report.failure = String(error); process.exitCode = 1;
  console.error(error);
} finally {
  if (owned) await owned.close();
  if (!await provenance.finish()) { report.status = 'failed'; report.provenanceFailure = 'Source, dist or served-response binding failed'; process.exitCode = 1; }
  report.finishedAt = new Date().toISOString();
  await saveReport();
}
