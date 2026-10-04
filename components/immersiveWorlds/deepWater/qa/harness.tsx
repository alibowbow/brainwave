import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import WaterfallWorld from '../WaterfallWorld';
import CaveWorld from '../CaveWorld';
import DeepSeaWorld from '../DeepSeaWorld';
import type { DeepWaterInteraction, WorldKind } from '../engine/types';
import './harness.css';

declare global {
  interface Window {
    __deepWaterQA: {
      setActive(value: boolean): void;
      setStatic(value: boolean): void;
      setSecondHolder(value: boolean): void;
      setMounted(value: boolean): void;
      interactions: DeepWaterInteraction[];
      scene: WorldKind;
      state: { active: boolean; static3D: boolean; secondHolder: boolean; mounted: boolean };
    };
  }
}
const params = new URLSearchParams(window.location.search);
const requested = params.get('scene');
const kind: WorldKind = requested === 'cave' || requested === 'sea' ? requested : 'waterfall';
const scenes = { waterfall: WaterfallWorld, cave: CaveWorld, sea: DeepSeaWorld };
const Scene = scenes[kind];
const interactions: DeepWaterInteraction[] = [];
const onInteraction = (event: DeepWaterInteraction) => interactions.push({ ...event });
function Harness() {
  const [active, setActive] = useState(params.get('active') === '1');
  const [static3D, setStatic] = useState(params.has('static'));
  const [secondHolder, setSecondHolder] = useState(false);
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    window.__deepWaterQA = { setActive, setStatic, setSecondHolder, setMounted, interactions, scene: kind, state: { active, static3D, secondHolder, mounted } };
  }, [active, static3D, secondHolder, mounted]);
  return <>
    <main id="primary-holder">{mounted && <Scene active={active} static3D={static3D} onInteraction={onInteraction} />}</main>
    {mounted && secondHolder && <aside id="second-holder" aria-label="Second fullscreen-style holder"><Scene active={active} static3D={static3D} onInteraction={onInteraction} /></aside>}
    {params.has('controls') && <nav aria-label="QA controls"><button onClick={() => setActive(value => !value)}>{active ? 'Pause' : 'Resume'}</button><button onClick={() => setStatic(value => !value)}>Static first frame</button><button onClick={() => setSecondHolder(value => !value)}>Second holder</button><button onClick={() => setMounted(value => !value)}>{mounted ? 'Unmount' : 'Mount'}</button></nav>}
  </>;
}
createRoot(document.getElementById('root')!).render(<Harness />);
