import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import MeditationCourtWorld from '../MeditationCourtWorld';
import WarmHeartWorld from '../WarmHeartWorld';
import SnowVillageWorld from '../SnowVillageWorld';
import type { SanctuaryInteraction, SanctuaryKind } from '../worldTypes';

const worlds = {
  meditation: MeditationCourtWorld,
  'warm-heart': WarmHeartWorld,
  'snow-village': SnowVillageWorld,
};
const query = new URLSearchParams(location.search);
const requested = query.get('world');
const kind: SanctuaryKind = requested && requested in worlds ? requested as SanctuaryKind : 'meditation';
const World = worlds[kind];

function Harness() {
  const [active, setActive] = useState(query.get('inactive') !== '1');
  const [static3D, setStatic] = useState(query.get('static') === '1');
  const [mounted, setMounted] = useState(true);
  const [second, setSecond] = useState(false);
  const [events, setEvents] = useState<SanctuaryInteraction[]>([]);
  const onInteraction = (event: SanctuaryInteraction) => setEvents((previous) => [...previous, event]);

  return (
    <>
      <main data-qa-stage data-world={kind} data-active={active} data-static={static3D} data-mounted={mounted}>
        <div data-qa-holder="primary" className="qa-holder">
          {mounted && <World active={active} static3D={static3D} onInteraction={onInteraction} />}
        </div>
        {mounted && second && (
          <div data-qa-holder="second" className="qa-holder qa-second">
            <World active={active} static3D={static3D} onInteraction={onInteraction} />
          </div>
        )}
      </main>
      <aside data-qa-controls aria-label="QA harness controls">
        <strong>{kind}</strong>
        <button data-qa="active" onClick={() => setActive(!active)}>Active: {String(active)}</button>
        <button data-qa="static" onClick={() => setStatic(!static3D)}>Static 3D: {String(static3D)}</button>
        <button data-qa="second" onClick={() => setSecond(!second)}>Second holder: {String(second)}</button>
        <button data-qa="mount" onClick={() => { setMounted(!mounted); setSecond(false); }}>Mounted: {String(mounted)}</button>
        <output data-qa-events data-count={events.length} data-events={JSON.stringify(events)}>
          Interactions: {events.length}{events.length ? ` · ${events[events.length - 1].kind}` : ''}
        </output>
      </aside>
    </>
  );
}

const style = document.createElement('style');
style.textContent = `
  * { box-sizing: border-box; }
  html, body, #root, [data-qa-stage], .qa-holder { width: 100%; height: 100%; margin: 0; }
  html, body { overflow: hidden; background: #182027; }
  [data-qa-stage] { position: fixed; inset: 0; }
  .qa-holder { position: absolute; inset: 0; }
  .qa-second { z-index: 2; }
  [data-qa-controls] { position: fixed; z-index: 10; left: 8px; right: 8px; bottom: 8px; display: flex; gap: 6px; align-items: center; flex-wrap: wrap; padding: 8px; border-radius: 10px; background: #111c; color: #fff; font: 11px/1.4 system-ui; }
  [data-qa-controls] button { border: 1px solid #ffffff55; border-radius: 5px; background: #fff1; color: inherit; padding: 4px 7px; font: inherit; }
  [data-qa-controls] output { opacity: .8; }
`;
document.head.append(style);
createRoot(document.getElementById('root')!).render(<Harness />);
