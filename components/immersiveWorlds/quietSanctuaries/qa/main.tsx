import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import MeditationCourtWorld from '../MeditationCourtWorld';
import WarmHeartWorld from '../WarmHeartWorld';
import SnowVillageWorld from '../SnowVillageWorld';
import type { SanctuaryBuilder, SanctuaryInteraction, SanctuaryKind, SanctuaryProps } from '../worldTypes';
import { SanctuaryHost } from '../SanctuaryEngine';
import SanctuaryView from '../SanctuaryView';
import { createMeditationCourtBuilder } from '../meditation';
import { captureRendererState, checkMeditationTarget, restoreRendererState, type TargetDiagnostics } from '../meditationTargets';

// This QA-only builder chooses real byte allocations without replacing any GL API.
// The fixture also exercises restoration from a complete non-default cube face/mip.
const byteBuilder = createMeditationCourtBuilder({ targetMode: 'force-byte' });
const checkedByteBuilder: SanctuaryBuilder = (renderer) => {
  const original = captureRendererState(renderer);
  const gl = renderer.getContext();
  const fixture = new THREE.WebGLCubeRenderTarget(64, {
    type: THREE.UnsignedByteType, depthBuffer: false, generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter, magFilter: THREE.LinearFilter,
  });
  const probeTarget = new THREE.WebGLRenderTarget(48, 32, { type: THREE.UnsignedByteType, depthBuffer: true });
  const diagnostics: TargetDiagnostics = { checks: [], attempts: [] };
  const errors = () => {
    const result: number[] = [];
    for (let index = 0; index < 32; index++) { const error = gl.getError(); if (error === gl.NO_ERROR) break; result.push(error); }
    return result;
  };
  try {
    renderer.setRenderTarget(fixture, 4, 1);
    renderer.setViewport(3, 4, 17, 19);
    renderer.setScissor(5, 6, 11, 13);
    renderer.setScissorTest(true);
    renderer.xr.enabled = true;
    renderer.autoClear = false;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setClearColor('#123456', .375);
    const fixtureStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    const fixtureErrors = errors();
    if (fixtureStatus !== gl.FRAMEBUFFER_COMPLETE || fixtureErrors.length) throw new Error('QA cube face/mip fixture must itself be complete and GL-error-free.');
    const ok = checkMeditationTarget(renderer, probeTarget, 'qa-nondefault-byte-probe', diagnostics);
    const restoredFixtureStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    const restoredFixtureErrors = errors();
    renderer.domElement.dataset.qaTargetStateProbe = JSON.stringify({
      fixture: { type: 'unsigned-byte', width: 64, height: 64, face: 4, mip: 1, attachmentWidth: 32, attachmentHeight: 32, status: fixtureStatus, glErrors: fixtureErrors },
      diagnostics, restoredFixtureStatus, restoredFixtureErrors, ok,
    });
    if (!ok || restoredFixtureStatus !== gl.FRAMEBUFFER_COMPLETE || restoredFixtureErrors.length) throw new Error('QA real-target non-default renderer restoration failed.');
  } finally {
    restoreRendererState(renderer, original);
    probeTarget.dispose();
    fixture.dispose();
  }
  return byteBuilder(renderer);
};
const byteHost = new SanctuaryHost('meditation', checkedByteBuilder);
function ByteMeditationWorld(props: SanctuaryProps) {
  return <SanctuaryView {...props} host={byteHost} label="QA: 실제 byte 렌더 타깃의 마음 챙김" />;
}

const worlds = {
  meditation: MeditationCourtWorld,
  'warm-heart': WarmHeartWorld,
  'snow-village': SnowVillageWorld,
};
const query = new URLSearchParams(location.search);
const requested = query.get('world');
const kind: SanctuaryKind = requested && requested in worlds ? requested as SanctuaryKind : 'meditation';
const targetMode = kind === 'meditation' && query.get('targets') === 'byte' ? 'force-byte' : 'auto';
const World = targetMode === 'force-byte' ? ByteMeditationWorld : worlds[kind];

function Harness() {
  const [active, setActive] = useState(query.get('inactive') !== '1');
  const [static3D, setStatic] = useState(query.get('static') === '1');
  const [mounted, setMounted] = useState(true);
  const [second, setSecond] = useState(false);
  const [events, setEvents] = useState<SanctuaryInteraction[]>([]);
  const onInteraction = (event: SanctuaryInteraction) => setEvents((previous) => [...previous, event]);

  return (
    <>
      <main data-qa-stage data-world={kind} data-target-mode={targetMode} data-active={active} data-static={static3D} data-mounted={mounted}>
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
        <strong>{kind} · {targetMode}</strong>
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
