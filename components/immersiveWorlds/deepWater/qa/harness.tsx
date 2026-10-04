import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import WaterfallWorld from '../WaterfallWorld';
import CaveWorld from '../CaveWorld';
import DeepSeaWorld from '../DeepSeaWorld';
import type { DeepWaterInteraction, WorldKind } from '../engine/types';
import './harness.css';
import { deepWaterHosts } from '../host';
import { preferBytePoolTargets } from '../engine/poolTarget';
import type { WebGLRenderer } from 'three';

declare global {
  interface Window {
    __deepWaterQA: {
      setActive(value: boolean): void;
      setStatic(value: boolean): void;
      setSecondHolder(value: boolean): void;
      setMounted(value: boolean): void;
      setChrome(value: boolean): void;
      waitGPUIdle(): Promise<unknown>;
      diagnostics(): Record<string, unknown>;
      interactions: DeepWaterInteraction[];
      scene: WorldKind;
      state: { active: boolean; static3D: boolean; secondHolder: boolean; mounted: boolean; chrome: boolean };
    };
  }
}
const params = new URLSearchParams(window.location.search);
const requested = params.get('scene');
const kind: WorldKind = requested === 'cave' || requested === 'sea' ? requested : 'waterfall';
const scenes = { waterfall: WaterfallWorld, cave: CaveWorld, sea: DeepSeaWorld };
const Scene = scenes[kind];
const interactions: DeepWaterInteraction[] = [];
const inputCounters = { drag: 0, touch: 0, releaseDrag: 0 };
const controlEvents: string[] = [];
const sceneHost = deepWaterHosts[kind];
type QAEngine = { disposed: boolean; renderer: WebGLRenderer; awaitGPUIdle(timeoutMs?: number): Promise<unknown> };
const host = sceneHost as unknown as { holders: { mount: HTMLElement; running: boolean }[]; engine: QAEngine | null; status: string; disposeTimer: number; canvas: HTMLCanvasElement | null; configure(engine: QAEngine): void };
// QA-only observers preserve all original methods and the actual raycaster.
const drag = sceneHost.drag.bind(sceneHost), touch = sceneHost.touch.bind(sceneHost), releaseDrag = sceneHost.releaseDrag.bind(sceneHost);
sceneHost.drag = (...args) => { inputCounters.drag++; return drag(...args); };
sceneHost.touch = (...args) => { inputCounters.touch++; return touch(...args); };
sceneHost.releaseDrag = (...args) => { inputCounters.releaseDrag++; return releaseDrag(...args); };
if (params.get('reflection') === 'byte') {
  const configure = host.configure.bind(host);
  host.configure = engine => { configure(engine); preferBytePoolTargets(engine.renderer); };
}
const waitGPUIdle = async () => {
  if (!host.engine) throw new Error('Cannot verify GPU completion without a live scene engine');
  return host.engine.awaitGPUIdle(120000);
};
const diagnostics = () => {
  return { holders: host.holders.length, holderRunning: host.holders.map(h => h.running), hasEngine: !!host.engine, engineDisposed: host.engine?.disposed, status: host.status, disposeTimer: host.disposeTimer, topConnected: host.holders.at(-1)?.mount.isConnected ?? null, canvasConnected: host.canvas?.isConnected ?? null, hidden: document.hidden, visibility: document.visibilityState, time: performance.now(), inputCounters: { ...inputCounters }, controlEvents: [...controlEvents], forcedByte: params.get('reflection') === 'byte' };
};
const onInteraction = (event: DeepWaterInteraction) => interactions.push({ ...event });
function ChromeFixture({ visible }: { visible: boolean }) {
  return <div data-scene-drag className={`qa-chrome ${visible ? '' : 'qa-chrome-hidden'}`}>
    <div className="qa-chrome-controls">
      <button type="button" data-qa-control="button" onClick={() => controlEvents.push('button')}><span data-qa-control="button-child">Player button</span></button>
      <label>Volume <input type="range" data-qa-control="range" defaultValue="50" aria-label="Fixture volume" onChange={() => controlEvents.push('range')} /></label>
      <select data-qa-control="select" aria-label="Fixture selection" onChange={() => controlEvents.push('select')}><option>One</option><option>Two</option></select>
      <a data-qa-control="link" href="#qa-control" onClick={event => { event.preventDefault(); controlEvents.push('link'); }}>Fixture link</a>
      <div data-qa-control="slider" role="slider" tabIndex={0} aria-label="ARIA slider" aria-valuemin={0} aria-valuemax={100} aria-valuenow={50}>Slider</div>
      <div data-qa-control="switch" role="switch" tabIndex={0} aria-checked="false">Switch</div>
      <div data-qa-control="tab" role="tab" tabIndex={0} aria-selected="false">Tab</div>
      <span data-qa-control="plain">Chrome text</span>
      <div data-scene-surface className="qa-foreign-surface"><div data-scene-drag data-qa-control="foreign">Foreign surface</div></div>
    </div>
  </div>;
}
function Harness() {
  const [active, setActive] = useState(params.get('active') === '1');
  const [static3D, setStatic] = useState(params.has('static'));
  const [secondHolder, setSecondHolder] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [chrome, setChrome] = useState(false);
  useEffect(() => {
    window.__deepWaterQA = { setActive, setStatic, setSecondHolder, setMounted, setChrome, waitGPUIdle, diagnostics, interactions, scene: kind, state: { active, static3D, secondHolder, mounted, chrome } };
  }, [active, static3D, secondHolder, mounted, chrome]);
  return <>
    <main id="primary-holder" data-scene-surface>{mounted && <><div className="qa-scene-slot"><Scene active={active} static3D={static3D} onInteraction={onInteraction} /></div><ChromeFixture visible={chrome} /></>}</main>
    {mounted && secondHolder && <aside id="second-holder" data-scene-surface aria-label="Second fullscreen-style holder"><div className="qa-scene-slot"><Scene active={active} static3D={static3D} onInteraction={onInteraction} /></div><ChromeFixture visible={chrome} /></aside>}
    {params.has('controls') && <nav aria-label="QA controls"><button onClick={() => setActive(value => !value)}>{active ? 'Pause' : 'Resume'}</button><button onClick={() => setStatic(value => !value)}>Static first frame</button><button onClick={() => setSecondHolder(value => !value)}>Second holder</button><button onClick={() => setMounted(value => !value)}>{mounted ? 'Unmount' : 'Mount'}</button></nav>}
  </>;
}
createRoot(document.getElementById('root')!).render(<Harness />);
