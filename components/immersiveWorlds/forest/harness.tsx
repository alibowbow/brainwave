import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ForestWorld, { type ForestInteraction } from './ForestWorld';

const harnessStyle = `
  html, body, #forest-harness-root { margin: 0; width: 100%; height: 100%; overflow: hidden; }
  .forest-harness { position: fixed; inset: 0; background: #263a2c; color: #edf0df; font-family: system-ui, sans-serif; }
  .forest-harness-stage { position: absolute; inset: 0; }
  .forest-harness-overlay { position: fixed; inset: 0; z-index: 2; }
  .forest-harness-controls { position: fixed; z-index: 5; top: 12px; left: 12px; right: 12px; width: fit-content; max-width: calc(100% - 48px); padding: 12px; border: 1px solid #bacaab40; border-radius: 12px; background: #0d2114cb; box-shadow: 0 6px 24px #09100d30; backdrop-filter: blur(10px); }
  .forest-harness-controls h1 { font-size: 14px; font-weight: 550; margin: 0 0 8px; letter-spacing: .03em; }
  .forest-harness-controls p { font-size: 11px; margin: 6px 0 0; line-height: 1.5; }
  .forest-harness-actions { display: flex; gap: 5px; flex-wrap: wrap; }
  .forest-harness-controls button { color: inherit; background: #e3ecca14; padding: 6px 9px; border: 1px solid #d9e8ba44; border-radius: 5px; cursor: pointer; font: inherit; font-size: 11px; }
  .forest-harness-controls button:focus-visible { outline: 2px solid #e0dda6; outline-offset: 2px; }
  .forest-harness-controls output { display: block; font-size: 10px; margin-top: 7px; opacity: .8; }
  .forest-harness-empty { position: absolute; top: 50%; width: 100%; text-align: center; }
  .forest-harness[data-capture='true'] .forest-harness-controls { display: none; }
`;

function ForestHarness() {
  const [active, setActive] = useState(true);
  const [mounted, setMounted] = useState(true);
  const [second, setSecond] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [counts, setCounts] = useState({ main: 0, second: 0 });
  const [last, setLast] = useState<{ holder: string; event: ForestInteraction } | null>(null);
  const capture = new URLSearchParams(window.location.search).get('capture') === '1';

  useEffect(() => {
    const wasReduced = document.documentElement.classList.contains('reduce-motion');
    return () => { document.documentElement.classList.toggle('reduce-motion', wasReduced); };
  }, []);
  useEffect(() => { document.documentElement.classList.toggle('reduce-motion', reduced); }, [reduced]);

  const record = (holder: 'main' | 'second', event: ForestInteraction) => {
    setCounts((current) => ({ ...current, [holder]: current[holder] + 1 }));
    setLast({ holder, event });
  };

  return (
    <div className="forest-harness" data-capture={capture} data-active={active} data-mounted={mounted} data-reduced={reduced} data-second={second}>
      <style>{harnessStyle}</style>
      <main className="forest-harness-stage" data-testid="main-holder">
        {mounted ? <ForestWorld active={active} onInteraction={(event) => record('main', event)} /> : <p className="forest-harness-empty">Scene unmounted</p>}
      </main>
      {mounted && second ? (
        <section className="forest-harness-overlay" aria-label="Fullscreen holder" data-testid="second-holder">
          <ForestWorld active={active} onInteraction={(event) => record('second', event)} />
        </section>
      ) : null}
      <aside className="forest-harness-controls" aria-label="Scene verification controls">
        <h1>아침 숲 · 독립 3D 검증</h1>
        <div className="forest-harness-actions">
          <button type="button" data-testid="active-toggle" aria-pressed={active} onClick={() => setActive((value) => !value)}>{active ? 'Pause' : 'Play'}</button>
          <button type="button" data-testid="motion-toggle" aria-pressed={reduced} onClick={() => setReduced((value) => !value)}>Reduced motion {reduced ? 'on' : 'off'}</button>
          <button type="button" data-testid="holder-toggle" aria-pressed={second} onClick={() => setSecond((value) => !value)}>Second holder {second ? 'on' : 'off'}</button>
          <button type="button" data-testid="mount-toggle" aria-pressed={mounted} onClick={() => setMounted((value) => !value)}>{mounted ? 'Unmount' : 'Mount'}</button>
        </div>
        <p>조금 드래그하면 시선이 움직이고 천천히 돌아옵니다. 가까운 잎이나 물을 가볍게 눌러 보세요.</p>
        <output data-testid="interaction-status" data-main-events={counts.main} data-second-events={counts.second} data-event-holder={last?.holder ?? ''} data-event-kind={last?.event.kind ?? ''}>
          Events main {counts.main} / second {counts.second}{last ? ` · ${last.holder}: ${last.event.kind} ${last.event.strength.toFixed(2)}` : ' · no audio created'}
        </output>
      </aside>
    </div>
  );
}

createRoot(document.getElementById('forest-harness-root')!).render(<StrictMode><ForestHarness /></StrictMode>);
