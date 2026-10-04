import React, { useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';
import TempleWorld from '../TempleWorld';
import ScopsNightWorld from '../ScopsNightWorld';
import RuralSummerNightWorld from '../RuralSummerNightWorld';
import type { WorldInteraction, WorldId } from '../types';
import type { BackgroundSoundType } from '../../../../types';
import './qa.css';

const params = new URLSearchParams(location.search);
const requested = params.get('scene');
const scene: WorldId = requested === 'scops' || requested === 'rural' ? requested : 'temple';
const World = { temple: TempleWorld, scops: ScopsNightWorld, rural: RuralSummerNightWorld }[scene];
const events: WorldInteraction[] = [];
const subscribers = new Set<(type: BackgroundSoundType) => void>();
const identities = new WeakMap<HTMLCanvasElement, number>();
let nextIdentity = 0;
let audioDispatches = 0;
const chromeActions: string[] = [];
type Probe = { x: number; y: number; kind: 'button' | 'input' | 'rolebutton' } | null;

function Chrome({ probe }: { probe: Probe }) {
  return <div data-scene-drag data-qa-chrome className="qa-scene-chrome">
    <div className="qa-chrome-heading"><span>한국 풍경 · Player / Immersive DOM QA</span><button onClick={() => chromeActions.push('close')}>닫기</button></div>
    <div className="qa-chrome-controls"><span>20:00</span><button onClick={() => chromeActions.push('play')}>재생 조절</button><input aria-label="QA 음량" type="range" onChange={() => chromeActions.push('volume')} /><span role="button" tabIndex={0} onClick={() => chromeActions.push('immersive')}>몰입</span></div>
    {probe && <div className="qa-control-probe" style={{ left: probe.x, top: probe.y }}>
      {probe.kind === 'button' && <button data-qa-probe="button" onClick={() => chromeActions.push('probe-button')}>UI</button>}
      {probe.kind === 'input' && <input data-qa-probe="input" aria-label="Exclusion probe volume" type="range" defaultValue={50} onChange={() => chromeActions.push('probe-input')} />}
      {probe.kind === 'rolebutton' && <span data-qa-probe="rolebutton" role="button" tabIndex={0} onClick={() => chromeActions.push('probe-rolebutton')}>UI</span>}
    </div>}
  </div>;
}

function subscribeEvents(callback: (type: BackgroundSoundType) => void) {
  subscribers.add(callback);
  return () => { subscribers.delete(callback); };
}

function snapshot() {
  const canvases = Array.from(document.querySelectorAll<HTMLCanvasElement>('.korean-world-canvas'));
  const canvas = canvases[0];
  if (canvas && !identities.has(canvas)) identities.set(canvas, ++nextIdentity);
  return {
    scene, canvasCount: canvases.length, canvasIdentity: canvas ? identities.get(canvas) : null,
    canvasHolder: canvas?.closest('[data-holder]')?.getAttribute('data-holder') ?? null,
    canvas: canvas ? { ...canvas.dataset, width: canvas.width, height: canvas.height } : null,
    surfaces: Array.from(document.querySelectorAll<HTMLElement>('.korean-world')).map(e => ({ ...e.dataset })),
    events: events.map(event => ({ ...event, position: [...event.position] })),
    subscribers: subscribers.size, audioDispatches, chromeActions: [...chromeActions], chromeVisible: !!document.querySelector('[data-qa-chrome]'), visibility: document.visibilityState, hidden: document.hidden,
  };
}

function Harness() {
  const [active, setActive] = useState(params.get('active') !== '0');
  const [static3D, setStatic] = useState(params.get('static') === '1');
  const [mounted, setMounted] = useState(true);
  const [second, setSecond] = useState(false);
  const [chrome, setChrome] = useState(params.get('chrome') === '1');
  const [probe, setProbe] = useState<Probe>(null);
  const [, refresh] = useState(0);
  const onInteraction = useCallback((event: WorldInteraction) => { events.push(event); refresh(x => x + 1); }, []);
  const dispatchScops = useCallback(() => { audioDispatches++; for (const callback of subscribers) callback('scops'); }, []);
  const api = {
    setActive, setStatic, setMounted, setSecond, setChrome, setProbe, snapshot, dispatchScops,
    clearEvents: () => { events.length = 0; refresh(x => x + 1); },
  };
  (window as typeof window & { koreanQA: typeof api }).koreanQA = api;
  return <>
    <main data-holder="primary" data-scene-surface>
      <div className="qa-scene-layer">{mounted && <World active={active} static3D={static3D} onInteraction={onInteraction} subscribeEvents={subscribeEvents} />}</div>
      {mounted && chrome && <Chrome probe={probe} />}
    </main>
    {mounted && second && <section data-holder="secondary" data-scene-surface aria-label="Second scene holder"><div className="qa-scene-layer"><World active={active} static3D={static3D} onInteraction={onInteraction} subscribeEvents={subscribeEvents} /></div>{chrome && <Chrome probe={probe} />}</section>}
    {params.get('capture') !== '1' && <aside>
      <strong>{scene} · isolated WebGL QA</strong>
      <nav>{(['temple', 'scops', 'rural'] as const).map(id => <a key={id} href={`?scene=${id}`}>{id}</a>)}</nav>
      <button onClick={() => setActive(x => !x)}>{active ? 'Pause' : 'Play'}</button>
      <button onClick={() => setStatic(x => !x)}>Static 3D: {String(static3D)}</button>
      <button onClick={() => setMounted(x => !x)}>Mounted: {String(mounted)}</button>
      <button onClick={() => setSecond(x => !x)}>Second holder: {String(second)}</button>
      <button onClick={() => setChrome(x => !x)}>Sibling chrome: {String(chrome)}</button>
      <button onClick={dispatchScops}>Emit existing-engine scops event</button>
      <output>{events.map((e, i) => <span key={i}>{e.type} ({e.strength.toFixed(2)}) </span>)}</output>
    </aside>}
  </>;
}

createRoot(document.getElementById('root')!).render(<Harness />);
