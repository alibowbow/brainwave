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
    subscribers: subscribers.size, audioDispatches, visibility: document.visibilityState, hidden: document.hidden,
  };
}

function Harness() {
  const [active, setActive] = useState(params.get('active') !== '0');
  const [static3D, setStatic] = useState(params.get('static') === '1');
  const [mounted, setMounted] = useState(true);
  const [second, setSecond] = useState(false);
  const [, refresh] = useState(0);
  const onInteraction = useCallback((event: WorldInteraction) => { events.push(event); refresh(x => x + 1); }, []);
  const dispatchScops = useCallback(() => { audioDispatches++; for (const callback of subscribers) callback('scops'); }, []);
  const api = {
    setActive, setStatic, setMounted, setSecond, snapshot, dispatchScops,
    clearEvents: () => { events.length = 0; refresh(x => x + 1); },
  };
  (window as typeof window & { koreanQA: typeof api }).koreanQA = api;
  return <>
    <main data-holder="primary">
      {mounted && <World active={active} static3D={static3D} onInteraction={onInteraction} subscribeEvents={subscribeEvents} />}
    </main>
    {mounted && second && <section data-holder="secondary" aria-label="Second scene holder"><World active={active} static3D={static3D} onInteraction={onInteraction} subscribeEvents={subscribeEvents} /></section>}
    {params.get('capture') !== '1' && <aside>
      <strong>{scene} · isolated WebGL QA</strong>
      <nav>{(['temple', 'scops', 'rural'] as const).map(id => <a key={id} href={`?scene=${id}`}>{id}</a>)}</nav>
      <button onClick={() => setActive(x => !x)}>{active ? 'Pause' : 'Play'}</button>
      <button onClick={() => setStatic(x => !x)}>Static 3D: {String(static3D)}</button>
      <button onClick={() => setMounted(x => !x)}>Mounted: {String(mounted)}</button>
      <button onClick={() => setSecond(x => !x)}>Second holder: {String(second)}</button>
      <button onClick={dispatchScops}>Emit existing-engine scops event</button>
      <output>{events.map((e, i) => <span key={i}>{e.type} ({e.strength.toFixed(2)}) </span>)}</output>
    </aside>}
  </>;
}

createRoot(document.getElementById('root')!).render(<Harness />);
