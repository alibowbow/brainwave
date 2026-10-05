import './instrumentation';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import RainTentWorld from '../../RainTentWorld';
import GardenWindowWorld from '../../GardenWindowWorld';
import MonsoonPorchWorld from '../../MonsoonPorchWorld';
import SummerStormWorld from '../../SummerStormWorld';
import type { ShelterInteraction, WorldKind } from '../../engine/types';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import './harness.css';

const worlds = { tent: RainTentWorld, window: GardenWindowWorld, porch: MonsoonPorchWorld, storm: SummerStormWorld };
const query = new URLSearchParams(window.location.search);
const selected = query.get('world');
const world: WorldKind = selected && selected in worlds ? selected as WorldKind : 'tent';

function Harness() {
  const [active, setActive] = useState(query.get('paused') !== '1');
  const [mounted, setMounted] = useState(true);
  const [secondHolder, setSecondHolder] = useState(false);
  const [static3D, setStatic3D] = useState(query.get('static3D') === '1');
  const [events, setEvents] = useState<ShelterInteraction[]>([]);
  const [chromeClicks, setChromeClicks] = useState(0);
  const onInteraction = (event: ShelterInteraction) => setEvents((old) => [...old.slice(-49), event]);
  const World = worlds[world];
  const chrome = <>
    <div className="qa-drag-overlay" data-scene-drag aria-label="QA transparent player drag surface">
    <div className="qa-player-chrome" aria-label="QA player chrome">
      <button data-qa-chrome-button onClick={() => setChromeClicks((old) => old + 1)}>Player chrome</button>
      <input data-qa-chrome-input type="range" aria-label="QA player volume" min="0" max="100" defaultValue="50" />
    </div>
    </div>
  </>;
  return <>
    <main id="qa-stage" data-world={world} data-mounted={mounted} data-active={active} data-static={static3D}>
      {mounted && <div id="qa-primary-holder" className="qa-holder" data-scene-surface><World active={active} static3D={static3D} onInteraction={onInteraction} />{chrome}</div>}
      {mounted && secondHolder && <div id="qa-second-holder" className="qa-holder qa-second" data-scene-surface aria-label="QA second holder"><World active={active} static3D={static3D} onInteraction={onInteraction} />{chrome}</div>}
    </main>
    <aside id="qa-controls" aria-label="Isolated QA controls">
      <strong>{world}</strong>
      <button id="qa-active" onClick={() => setActive((old) => !old)}>{active ? 'Pause' : 'Resume'}</button>
      <button id="qa-mounted" onClick={() => { setMounted((old) => !old); setSecondHolder(false); }}>{mounted ? 'Unmount' : 'Mount'}</button>
      <button id="qa-second" disabled={!mounted} onClick={() => setSecondHolder((old) => !old)}>{secondHolder ? 'Close second holder' : 'Open second holder'}</button>
      <button id="qa-static" onClick={() => setStatic3D((old) => !old)}>Static {static3D ? 'on' : 'off'}</button>
      <output id="qa-events" data-count={events.length} data-chrome-clicks={chromeClicks} data-events={JSON.stringify(events)}>{events.length} interactions</output>
    </aside>
  </>;
}

createRoot(document.getElementById('root')!).render(<Harness />);
