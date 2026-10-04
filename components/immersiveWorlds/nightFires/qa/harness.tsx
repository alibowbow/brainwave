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
function Harness() {
  const [active, setActive] = useState(query.get('active') === '1');
  const [second, setSecond] = useState(false);
  const [mounted, setMounted] = useState(true);
  Object.assign(window, { __nightQA: { setActive, setSecond, setMounted, events, diagnostics: getNightDiagnostics } });
  return <>{mounted && <div id="holder-primary"><Scene active={active} onInteraction={(event) => events.push(event)} /></div>}{mounted && second && <div id="holder-second"><Scene active={active} onInteraction={(event) => events.push(event)} /></div>}</>;
}
createRoot(document.getElementById('root')!).render(<Harness />);
