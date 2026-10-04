import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import MountainCampfireWorld from '../MountainCampfireWorld';
import DeepNightWorld from '../DeepNightWorld';
import LakesideCampWorld from '../LakesideCampWorld';
import { getNightDiagnostics } from '../nightEngine';
import type { NightWorldId, NightInteraction } from '../worldTypes';
const query = new URLSearchParams(location.search);
const worlds = { mountain: MountainCampfireWorld, deep: DeepNightWorld, lakeside: LakesideCampWorld };
const world = (query.get('world') ?? 'mountain') as NightWorldId;
const Scene = worlds[world] ?? worlds.mountain;
const events: NightInteraction[] = [];
let chromeActions = 0;
const chromeAction = () => { chromeActions++; };
function Chrome() {
  return <div data-night-qa-chrome data-scene-drag style={{ position: 'absolute', inset: 0, zIndex: 5, touchAction: 'none' }}>
    <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, background: '#101729e8', color: '#ffe7bd', font: '14px system-ui' }}>
      <button type="button" data-night-control="button" onClick={chromeAction}>일시정지 UI</button>
      <button type="button" data-night-control="nested-button" onClick={chromeAction}><span data-night-control="nested-span">전체 화면 UI</span></button>
      <label>볼륨 <input data-night-control="range" type="range" min="0" max="100" defaultValue="46" aria-label="QA 볼륨" onChange={chromeAction} /></label>
      <a data-night-control="link" href="#qa-local" style={{ color: '#ffe7bd' }} onClick={(event) => { event.preventDefault(); chromeAction(); }}>루틴 UI</a>
      <div data-night-control="role-button" role="button" tabIndex={0} onClick={chromeAction} onKeyDown={(event) => { if (event.key === 'Enter') chromeAction(); }} style={{ padding: 6, border: '1px solid #af946f' }}>설정 UI</div>
      <span data-night-control="text">플레이어 크롬 겹침 검증</span>
    </div>
  </div>;
}
function Harness() {
  const [active, setActive] = useState(query.get('active') === '1');
  const [second, setSecond] = useState(false);
  const [sameSurface, setSameSurface] = useState(false);
  const [chrome, setChrome] = useState(false);
  const [static3D, setStatic] = useState(false);
  const [mounted, setMounted] = useState(true);
  Object.assign(window, { __nightQA: { setActive, setSecond, setSameSurface, setChrome, setStatic, setMounted, events, get chromeActions() { return chromeActions; }, diagnostics: getNightDiagnostics } });
  const interact = (event: NightInteraction) => events.push(event);
  return <>
    {mounted && <div id="holder-primary" data-scene-surface style={{ touchAction: 'none', isolation: 'isolate' }}>
      <div style={{ visibility: sameSurface ? 'hidden' : 'visible' }}><Scene active={active} static3D={static3D} onInteraction={interact} /></div>
      {sameSurface && <Scene active={active} static3D={static3D} onInteraction={interact} />}
      {chrome && <Chrome />}
    </div>}
    {mounted && second && <div id="holder-second" data-scene-surface style={{ touchAction: 'none' }}><Scene active={active} static3D={static3D} onInteraction={interact} />{chrome && <Chrome />}</div>}
  </>;
}
createRoot(document.getElementById('root')!).render(<Harness />);
