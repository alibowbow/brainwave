import { StrictMode, useEffect, useRef, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import ForestWorld, { type ForestInteraction } from './ForestWorld';

const harnessStyle = `
  html, body, #forest-harness-root { margin: 0; width: 100%; height: 100%; overflow: hidden; }
  .forest-harness { position: fixed; inset: 0; background: #263a2c; color: #edf0df; font-family: system-ui, sans-serif; }
  .forest-harness-viewport { position: absolute; inset: 0; display: grid; place-items: safe center; overflow: auto; background: #142017; }
  .forest-harness-frame { position: relative; flex: none; overflow: hidden; background: #263a2c; }
  .forest-harness-stage { position: absolute; inset: 0; }
  .forest-harness-overlay { position: absolute; inset: 0; z-index: 2; }
  .forest-harness-controls { position: fixed; z-index: 5; top: 12px; left: 12px; right: 12px; width: fit-content; max-width: calc(100% - 48px); padding: 12px; border: 1px solid #bacaab40; border-radius: 12px; background: #0d2114cb; box-shadow: 0 6px 24px #09100d30; backdrop-filter: blur(10px); }
  .forest-harness-controls h1 { font-size: 14px; font-weight: 550; margin: 0 0 8px; letter-spacing: .03em; }
  .forest-harness-controls p { font-size: 11px; margin: 6px 0 0; line-height: 1.5; }
  .forest-harness-actions { display: flex; gap: 5px; flex-wrap: wrap; }
  .forest-harness-controls button { color: inherit; background: #e3ecca14; padding: 6px 9px; border: 1px solid #d9e8ba44; border-radius: 5px; cursor: pointer; font: inherit; font-size: 11px; }
  .forest-harness-controls button:focus-visible { outline: 2px solid #e0dda6; outline-offset: 2px; }
  .forest-harness-controls button:disabled { opacity: .45; cursor: wait; }
  .forest-harness-controls button[aria-pressed='true'] { background: #e3ecca2c; }
  .forest-harness-controls .forest-harness-actions + .forest-harness-actions { margin-top: 6px; }
  .forest-harness-controls output { display: block; font-size: 10px; margin-top: 7px; opacity: .8; }
  .forest-harness-controls pre { margin: 8px 0 0; max-height: 200px; width: min(600px, calc(100vw - 78px)); overflow: auto; white-space: pre-wrap; font-size: 10px; line-height: 1.4; }
  .forest-harness-empty { position: absolute; top: 50%; width: 100%; text-align: center; }
  .forest-harness[data-capture='true'] .forest-harness-controls { display: none; }
`;

type Viewport = 'desktop' | 'portrait' | 'landscape';
interface QACheck { name: string; passed: boolean; detail: unknown }
interface QAReport {
  status: 'running' | 'passed' | 'failed';
  startedAt: string;
  finishedAt?: string;
  method: string;
  environment: Record<string, unknown>;
  checks: QACheck[];
}
interface VisibilitySample {
  state: DocumentVisibilityState;
  at: string;
  frames?: number;
  time?: number;
  durationMs?: number;
  framesDelta?: number;
  timeDelta?: number;
  passed?: boolean;
  note?: string;
  simulated?: boolean;
}

const delay = (milliseconds: number) => new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));
async function waitFor(condition: () => boolean, message: string, timeout = 15000) {
  const began = performance.now();
  while (!condition()) {
    if (performance.now() - began > timeout) throw new Error(message);
    await delay(80);
  }
}

function snapshot(canvas: HTMLCanvasElement) {
  return { ...canvas.dataset, cssWidth: canvas.clientWidth, cssHeight: canvas.clientHeight, width: canvas.width, height: canvas.height };
}

/** Exercise the public DOM event handlers; never invoke an engine method. */
function pointer(target: EventTarget, type: string, x: number, y: number) {
  target.dispatchEvent(new PointerEvent(type, {
    bubbles: true, cancelable: true, composed: true,
    pointerId: 7101, isPrimary: true, pointerType: 'touch',
    button: 0, buttons: type === 'pointerup' || type === 'pointercancel' ? 0 : 1,
    clientX: x, clientY: y,
  }));
}

function tap(target: HTMLElement, xFraction: number, yFraction: number) {
  const rect = target.getBoundingClientRect();
  const x = rect.left + rect.width * xFraction, y = rect.top + rect.height * yFraction;
  pointer(target, 'pointerdown', x, y);
  pointer(window, 'pointerup', x, y);
}

function ForestHarness() {
  const [active, setActive] = useState(true);
  const [mounted, setMounted] = useState(true);
  const [second, setSecond] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [counts, setCounts] = useState({ main: 0, second: 0 });
  const countsRef = useRef({ main: 0, second: 0 });
  const [last, setLast] = useState<{ holder: string; event: ForestInteraction } | null>(null);
  const query = new URLSearchParams(window.location.search);
  const capture = query.get('capture') === '1';
  const initialViewport = query.get('viewport');
  const [viewport, setViewport] = useState<Viewport>(initialViewport === 'portrait' || initialViewport === 'landscape' ? initialViewport : 'desktop');
  const [qaRunning, setQARunning] = useState(false);
  const qaRunningRef = useRef(false);
  const [report, setReport] = useState<QAReport | null>(null);
  const reportRef = useRef<QAReport | null>(null);
  const [visibilitySamples, setVisibilitySamples] = useState<VisibilitySample[]>([]);
  const visibilityRef = useRef<VisibilitySample[]>([]);
  const [osReduced, setOSReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const wasReduced = document.documentElement.classList.contains('reduce-motion');
    return () => { document.documentElement.classList.toggle('reduce-motion', wasReduced); };
  }, []);
  useEffect(() => { document.documentElement.classList.toggle('reduce-motion', reduced); }, [reduced]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setOSReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let hidden: { canvas: HTMLCanvasElement; frames: number; time: number; at: number } | null = null;
    const log = (sample: VisibilitySample) => {
      visibilityRef.current = [...visibilityRef.current.slice(-19), sample];
      setVisibilitySamples(visibilityRef.current);
    };
    const change = () => {
      const canvas = document.querySelector<HTMLCanvasElement>('.forest-world-canvas');
      const frames = canvas ? Number(canvas.dataset.frames) : undefined;
      const time = canvas ? Number(canvas.dataset.time) : undefined;
      const simulated = document.documentElement.dataset.forestVisibilitySimulation === 'ci-hook-test';
      const sample: VisibilitySample = { state: document.visibilityState, at: new Date().toISOString(), frames, time, ...(simulated ? { simulated: true } : {}) };
      if (document.hidden && canvas && frames !== undefined && time !== undefined) {
        hidden = { canvas, frames, time, at: performance.now() };
        sample.note = simulated ? 'CI-only simulated hidden hook check; not actual tab visibility.' : 'Real browser visibilitychange; no hidden property override.';
      } else if (!document.hidden && hidden) {
        sample.durationMs = Math.round(performance.now() - hidden.at);
        if (canvas === hidden.canvas && frames !== undefined && time !== undefined) {
          sample.framesDelta = frames - hidden.frames;
          sample.timeDelta = Number((time - hidden.time).toFixed(4));
          if (sample.durationMs >= 800) sample.passed = sample.framesDelta <= 2 && sample.timeDelta <= 0.1;
          else sample.note = 'Visibility interval shorter than 800 ms; no pause verdict.';
        } else sample.note = 'Canvas changed while hidden; no pause verdict.';
        hidden = null;
      }
      log(sample);
    };
    document.addEventListener('visibilitychange', change);
    return () => document.removeEventListener('visibilitychange', change);
  }, []);

  const record = (holder: 'main' | 'second', event: ForestInteraction) => {
    countsRef.current = { ...countsRef.current, [holder]: countsRef.current[holder] + 1 };
    setCounts(countsRef.current);
    setLast({ holder, event });
  };

  const runQA = async () => {
    if (qaRunningRef.current) return;
    qaRunningRef.current = true;
    setQARunning(true);
    const result: QAReport = {
      status: 'running', startedAt: new Date().toISOString(),
      method: 'In-page DOM PointerEvent assertions through the component handlers. No direct engine calls. Synthetic gestures are not physical-device testing.',
      environment: {
        viewportPreset: viewport, window: [window.innerWidth, window.innerHeight], devicePixelRatio: window.devicePixelRatio,
        osReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        osReducedMotionTest: 'Observed actual media query only; OS emulation is not performed by this harness.',
        visibilityTest: 'Requires a real tab hide/show cycle; see visibilitySamples. No document.hidden override.',
        userAgent: navigator.userAgent,
      }, checks: [],
    };
    const publish = () => { reportRef.current = { ...result, checks: [...result.checks] }; setReport(reportRef.current); };
    const check = (name: string, passed: boolean, detail: unknown) => { result.checks.push({ name, passed, detail }); publish(); };
    publish();
    const canvasNow = () => document.querySelector<HTMLCanvasElement>('.forest-world-canvas');
    const isReady = () => !!document.querySelector('.forest-world[data-state="ready"] .forest-world-canvas');
    const running = () => canvasNow()?.dataset.running === 'true';
    try {
      setSecond(false); setMounted(true); setReduced(false); setActive(true);
      if (result.environment.osReducedMotion) throw new Error('The actual OS reduced-motion preference is on. Turn it off before running motion assertions; the harness will not override it.');
      await waitFor(() => isReady() && running(), 'The 3D scene did not become ready/running. Inspect fallback and console.', 90000);
      const canvas = canvasNow()!;
      check('Actual rendered 3D canvas', canvas.width > 0 && canvas.height > 0 && Number(canvas.dataset.frames) > 0 && Number(canvas.dataset.triangles) > 0, snapshot(canvas));
      const framesBefore = Number(canvas.dataset.frames), timeBefore = Number(canvas.dataset.time), observedAt = performance.now();
      await delay(1300);
      const frameDelta = Number(canvas.dataset.frames) - framesBefore;
      check('Active animation advances', frameDelta > 0 && Number(canvas.dataset.time) > timeBefore, {
        frameDelta, timeDelta: Number(canvas.dataset.time) - timeBefore,
        observedMs: Math.round(performance.now() - observedAt), observedFPS: Number((frameDelta * 1000 / (performance.now() - observedAt)).toFixed(1)),
      });

      const hitsBefore = { water: Number(canvas.dataset.waterHits), leaf: Number(canvas.dataset.leafHits) };
      const points: Partial<Record<'water' | 'leaf', [number, number]>> = {};
      for (const y of [.62, .78, .9, .48, .36, .97]) {
        for (const x of [.5, .3, .7, .15, .85, .05, .95]) {
          const water = Number(canvas.dataset.waterHits), leaf = Number(canvas.dataset.leafHits);
          tap(canvas, x, y);
          if (Number(canvas.dataset.waterHits) > water) points.water = [x, y];
          if (Number(canvas.dataset.leafHits) > leaf) points.leaf = [x, y];
          await delay(30);
          if (points.water && points.leaf) break;
        }
        if (points.water && points.leaf) break;
      }
      check('Water touch through DOM raycast', Number(canvas.dataset.waterHits) > hitsBefore.water, { before: hitsBefore.water, after: Number(canvas.dataset.waterHits), screenFraction: points.water });
      check('Leaf touch through DOM raycast', Number(canvas.dataset.leafHits) > hitsBefore.leaf, { before: hitsBefore.leaf, after: Number(canvas.dataset.leafHits), screenFraction: points.leaf });
      const touchPoint = points.water ?? points.leaf ?? [.5, .78];

      setActive(false);
      await waitFor(() => canvas.dataset.running === 'false', 'Active=false did not stop the engine.');
      await delay(200);
      const pausedFrame = canvas.dataset.frames, pausedTime = canvas.dataset.time, pausedHits = countsRef.current.main;
      tap(canvas, ...touchPoint);
      await delay(700);
      check('Active=false freezes animation and rejects touches', canvas.dataset.frames === pausedFrame && canvas.dataset.time === pausedTime && countsRef.current.main === pausedHits, { before: { frames: pausedFrame, time: pausedTime, callbacks: pausedHits }, after: { ...snapshot(canvas), callbacks: countsRef.current.main } });
      setActive(true);
      await waitFor(running, 'Animation did not resume after active=true.');

      setReduced(true);
      await waitFor(() => document.documentElement.classList.contains('reduce-motion') && canvas.dataset.running === 'false', 'App reduced-motion class did not stop the engine.');
      await delay(200);
      const reducedFrame = canvas.dataset.frames, reducedTime = canvas.dataset.time, reducedHits = countsRef.current.main;
      tap(canvas, ...touchPoint);
      await delay(700);
      check('App reduced-motion freezes animation and rejects touches', canvas.dataset.frames === reducedFrame && canvas.dataset.time === reducedTime && countsRef.current.main === reducedHits, { before: { frames: reducedFrame, time: reducedTime, callbacks: reducedHits }, after: { ...snapshot(canvas), callbacks: countsRef.current.main } });
      setReduced(false);
      await waitFor(running, 'Animation did not resume after reduced-motion was disabled.');

      const rect = canvas.getBoundingClientRect(), dragX = rect.left + rect.width * .48, dragY = rect.top + rect.height * .48;
      const unit = Math.min(rect.width, rect.height), dragHits = countsRef.current.main;
      pointer(canvas, 'pointerdown', dragX, dragY);
      pointer(window, 'pointermove', dragX + unit * .22, dragY + unit * .04);
      await waitFor(() => Math.abs(Number(canvas.dataset.lookYaw)) > .009, 'DOM drag did not move the camera.', 10000);
      const peakYaw = Math.abs(Number(canvas.dataset.lookYaw));
      pointer(window, 'pointerup', dragX + unit * .22, dragY + unit * .04);
      await delay(120);
      const releaseYaw = Math.abs(Number(canvas.dataset.lookYaw));
      check('Gentle drag changes view without a tap', peakYaw > .009 && countsRef.current.main === dragHits, { peakYaw, callbacksBefore: dragHits, callbacksAfter: countsRef.current.main });
      await waitFor(() => Math.abs(Number(canvas.dataset.lookYaw)) < peakYaw * .65, 'Camera did not slowly return after drag release.', 60000);
      check('View returns gradually after release', releaseYaw > peakYaw * .5 && Math.abs(Number(canvas.dataset.lookYaw)) < peakYaw * .65, { peakYaw, yaw120msAfterRelease: releaseYaw, finalYaw: Number(canvas.dataset.lookYaw) });

      const callbacksBeforeSecond = { ...countsRef.current };
      setSecond(true);
      await waitFor(() => document.querySelector('[data-testid="second-holder"] .forest-world-canvas') === canvas && running(), 'Second holder did not acquire the shared canvas.');
      const mainRoot = document.querySelector<HTMLElement>('[data-testid="main-holder"] .forest-world')!;
      tap(mainRoot, ...touchPoint);
      await delay(80);
      const ignoredCoveredHolder = countsRef.current.main === callbacksBeforeSecond.main && countsRef.current.second === callbacksBeforeSecond.second;
      tap(canvas, ...touchPoint);
      await delay(100);
      check('One shared canvas; only top holder gets callbacks', document.querySelectorAll('.forest-world-canvas').length === 1 && ignoredCoveredHolder && countsRef.current.main === callbacksBeforeSecond.main && countsRef.current.second > callbacksBeforeSecond.second, { sameCanvas: document.querySelector('[data-testid="second-holder"] .forest-world-canvas') === canvas, ignoredCoveredHolder, before: callbacksBeforeSecond, after: { ...countsRef.current } });
      setSecond(false);
      await waitFor(() => document.querySelector('[data-testid="main-holder"] .forest-world-canvas') === canvas && running(), 'Closing the second holder did not return the shared canvas.');
      check('Closing second holder returns the same canvas', document.querySelector('[data-testid="main-holder"] .forest-world-canvas') === canvas, snapshot(canvas));

      setMounted(false);
      await waitFor(() => !canvasNow() && canvas.dataset.running === 'false', 'Unmount did not stop and detach the canvas.');
      const detachedFrame = canvas.dataset.frames;
      await delay(5500);
      check('Last unmount disposes after host reuse window', canvas.dataset.disposed === 'true' && canvas.dataset.running === 'false' && canvas.dataset.frames === detachedFrame, snapshot(canvas));
      setMounted(true);
      await waitFor(() => isReady() && running() && canvasNow() !== canvas, 'Remount did not create a fresh ready engine.', 90000);
      const remounted = canvasNow()!;
      const remountFrames = Number(remounted.dataset.frames);
      await delay(700);
      check('Remount creates a fresh working engine', remounted !== canvas && Number(remounted.dataset.frames) > remountFrames, snapshot(remounted));
    } catch (error) {
      check('QA sequence completed', false, error instanceof Error ? error.message : String(error));
    } finally {
      setMounted(true); setSecond(false); setReduced(false); setActive(true);
      result.finishedAt = new Date().toISOString();
      result.status = result.checks.length > 0 && result.checks.every((item) => item.passed) ? 'passed' : 'failed';
      publish(); qaRunningRef.current = false; setQARunning(false);
    }
  };

  const download = () => {
    const content = { report: reportRef.current, visibilitySamples: visibilityRef.current, actualOSReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches };
    const url = URL.createObjectURL(new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'forest-browser-qa.json'; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const sceneSize: CSSProperties = viewport === 'portrait' ? { width: 344, height: 800 } : viewport === 'landscape' ? { width: 882, height: 344 } : { width: '100%', height: '100%' };
  const passedVisibility = visibilitySamples.filter((sample) => sample.passed === true && !sample.simulated).length;

  return (
    <div className="forest-harness" data-capture={capture} data-active={active} data-mounted={mounted} data-reduced={reduced} data-second={second} data-viewport={viewport} data-qa-state={report?.status ?? 'idle'}>
      <style>{harnessStyle}</style>
      <div className="forest-harness-viewport">
        <div className="forest-harness-frame" data-testid="scene-frame" style={sceneSize}>
          <main className="forest-harness-stage" data-testid="main-holder">
            {mounted ? <ForestWorld active={active} onInteraction={(event) => record('main', event)} /> : <p className="forest-harness-empty">Scene unmounted</p>}
          </main>
          {mounted && second ? (
            <section className="forest-harness-overlay" aria-label="Fullscreen holder" data-testid="second-holder">
              <ForestWorld active={active} onInteraction={(event) => record('second', event)} />
            </section>
          ) : null}
        </div>
      </div>
      <aside className="forest-harness-controls" aria-label="Scene verification controls">
        <h1>아침 숲 · 독립 3D 검증</h1>
        <div className="forest-harness-actions">
          <button disabled={qaRunning} type="button" data-testid="active-toggle" aria-pressed={active} onClick={() => setActive((value) => !value)}>{active ? 'Pause' : 'Play'}</button>
          <button disabled={qaRunning} type="button" data-testid="motion-toggle" aria-pressed={reduced} onClick={() => setReduced((value) => !value)}>Reduced motion {reduced ? 'on' : 'off'}</button>
          <button disabled={qaRunning} type="button" data-testid="holder-toggle" aria-pressed={second} onClick={() => setSecond((value) => !value)}>Second holder {second ? 'on' : 'off'}</button>
          <button disabled={qaRunning} type="button" data-testid="mount-toggle" aria-pressed={mounted} onClick={() => setMounted((value) => !value)}>{mounted ? 'Unmount' : 'Mount'}</button>
        </div>
        <div className="forest-harness-actions">
          <button disabled={qaRunning} type="button" data-testid="viewport-desktop" aria-pressed={viewport === 'desktop'} onClick={() => setViewport('desktop')}>Desktop</button>
          <button disabled={qaRunning} type="button" data-testid="viewport-portrait" aria-pressed={viewport === 'portrait'} onClick={() => setViewport('portrait')}>Fold 344×800</button>
          <button disabled={qaRunning} type="button" data-testid="viewport-landscape" aria-pressed={viewport === 'landscape'} onClick={() => setViewport('landscape')}>Fold 882×344</button>
          <button disabled={qaRunning} type="button" data-testid="qa-run" onClick={() => void runQA()}>{qaRunning ? 'Running QA…' : 'Run lifecycle QA'}</button>
          <button type="button" data-testid="qa-download" onClick={download}>Download JSON</button>
        </div>
        <p>조금 드래그하면 시선이 움직이고 천천히 돌아옵니다. 가까운 잎이나 물을 가볍게 눌러 보세요.</p>
        <output data-testid="interaction-status" data-main-events={counts.main} data-second-events={counts.second} data-event-holder={last?.holder ?? ''} data-event-kind={last?.event.kind ?? ''}>
          Events main {counts.main} / second {counts.second}{last ? ` · ${last.holder}: ${last.event.kind} ${last.event.strength.toFixed(2)}` : ' · no audio created'}
        </output>
        <output data-testid="visibility-status" data-hidden-passes={passedVisibility} data-os-reduced={osReduced}>
          Real hidden cycles passed: {passedVisibility} · actual OS reduced motion: {String(osReduced)} (observed only)
        </output>
        <output data-testid="qa-status" data-state={report?.status ?? 'idle'} data-passed={report?.checks.filter((item) => item.passed).length ?? 0} data-failed={report?.checks.filter((item) => !item.passed).length ?? 0}>
          QA: {report?.status ?? 'not run'}{report ? ` · ${report.checks.filter((item) => item.passed).length}/${report.checks.length} passed` : ''}
        </output>
        {report || visibilitySamples.length ? <pre data-testid="qa-report">{JSON.stringify({ report, visibilitySamples }, null, 2)}</pre> : null}
      </aside>
    </div>
  );
}

createRoot(document.getElementById('forest-harness-root')!).render(<StrictMode><ForestHarness /></StrictMode>);
