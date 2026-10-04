import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import NightPondWorld from '../NightPondWorld';
import SummerValleyWorld from '../SummerValleyWorld';
import PebbleShoreWorld from '../PebbleShoreWorld';
import { diagnostics } from '../runtime';
import type { WaterEdgeInteraction, WaterEdgeKind } from '../contracts';
import './style.css';

declare const __WATER_EDGE_SOURCE_SHA__: string;
declare const __WATER_EDGE_HARNESS_SHA__: string;
const worlds = { 'night-pond': NightPondWorld, 'summer-valley': SummerValleyWorld, 'pebble-shore': PebbleShoreWorld };
const query = new URLSearchParams(location.search);
const initialKind = query.get('world') as WaterEdgeKind;
const events: WaterEdgeInteraction[] = [];
const canvasIds = new WeakMap<HTMLCanvasElement, number>();
let nextCanvasId = 1;
let syntheticHidden: boolean | null = null;
const originalHidden = Object.getOwnPropertyDescriptor(document, 'hidden');
function setSyntheticHidden(hidden: boolean | null) {
  syntheticHidden = hidden;
  if (hidden === null) {
    if (originalHidden) Object.defineProperty(document, 'hidden', originalHidden);
    else delete (document as unknown as Record<string, unknown>).hidden;
  } else Object.defineProperty(document, 'hidden', { configurable: true, get: () => hidden });
  document.dispatchEvent(new Event('visibilitychange'));
}
function inspect() {
  return {
    sourceSha256: __WATER_EDGE_SOURCE_SHA__, harnessSha256: __WATER_EDGE_HARNESS_SHA__,
    diagnostics: { ...diagnostics }, syntheticHidden,
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    roots: [...document.querySelectorAll<HTMLElement>('[data-world]')].map((node) => ({
      world: node.dataset.world, state: node.dataset.state, motion: node.dataset.motion,
      holder: node.closest<HTMLElement>('[data-holder]')?.dataset.holder,
      width: node.clientWidth, height: node.clientHeight,
    })),
    canvases: [...document.querySelectorAll<HTMLCanvasElement>('.water-edge-canvas')].map((canvas) => {
      if (!canvasIds.has(canvas)) canvasIds.set(canvas, nextCanvasId++);
      return { id: canvasIds.get(canvas), holder: canvas.closest<HTMLElement>('[data-holder]')?.dataset.holder,
        width: canvas.width, height: canvas.height, frames: Number(canvas.dataset.frames),
        time: Number(canvas.dataset.time), drawCalls: Number(canvas.dataset.drawCalls), triangles: Number(canvas.dataset.triangles) };
    }),
    events: events.map((event) => ({ ...event, position: { ...event.position } })),
  };
}
function Harness() {
  const [kind, setKind] = useState<WaterEdgeKind>(initialKind in worlds ? initialKind : 'night-pond');
  const [active, setActive] = useState(query.get('active') !== '0');
  const [static3D, setStatic] = useState(query.get('static') === '1');
  const [mounted, setMounted] = useState(true);
  const [second, setSecondHolder] = useState(false);
  const [overlay, setOverlay] = useState(false);
  useEffect(() => {
    window.__waterEdgeQA = {
      setActive, setStatic, setSecondHolder, setOverlay, setWorld: setKind,
      mount: () => setMounted(true), unmount: () => { setSecondHolder(false); setMounted(false); },
      inspect, events, clearEvents: () => { events.length = 0; }, setSyntheticHidden,
    };
    return () => { setSyntheticHidden(null); delete window.__waterEdgeQA; };
  }, []);
  const World = worlds[kind];
  const onInteraction = (event: WaterEdgeInteraction) => { events.push(event); };
  return <>
    <main className="qa-holder" data-holder="primary" data-scene-surface>{mounted && <World active={active} static3D={static3D} onInteraction={onInteraction} />}{overlay && <div className="qa-drag-overlay" data-scene-drag><button type="button">Overlay QA control</button></div>}</main>
    {mounted && second && <section className="qa-holder qa-secondary" data-holder="secondary" data-scene-surface><World active={active} static3D={static3D} onInteraction={onInteraction} /></section>}
    {query.get('controls') === '1' && <aside className="qa-controls">
      <select aria-label="World" value={kind} onChange={(event) => setKind(event.target.value as WaterEdgeKind)}>{Object.keys(worlds).map((id) => <option key={id}>{id}</option>)}</select>
      <label><input type="checkbox" checked={active} onChange={(event) => setActive(event.target.checked)} />Active</label>
      <label><input type="checkbox" checked={static3D} onChange={(event) => setStatic(event.target.checked)} />Static 3D</label>
      <label><input type="checkbox" checked={second} onChange={(event) => setSecondHolder(event.target.checked)} />Second holder</label>
      <button onClick={() => setMounted(!mounted)}>{mounted ? 'Unmount' : 'Mount'}</button>
    </aside>}
  </>;
}
interface WaterEdgeQA {
  setActive(value: boolean): void; setStatic(value: boolean): void; setSecondHolder(value: boolean): void; setOverlay(value: boolean): void;
  setWorld(value: WaterEdgeKind): void; mount(): void; unmount(): void; inspect: typeof inspect;
  events: WaterEdgeInteraction[]; clearEvents(): void; setSyntheticHidden(value: boolean | null): void;
}
declare global { interface Window { __waterEdgeQA?: WaterEdgeQA } }
createRoot(document.getElementById('root')!).render(<Harness />);
