import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import MorningPorchWorld from '../MorningPorchWorld';
import RainyForestWorld from '../RainyForestWorld';
import AncientForestWorld from '../AncientForestWorld';
import BambooWorld from '../BambooWorld';
import { getWoodsHost } from '../host';

const worlds = { morning: MorningPorchWorld, rainy: RainyForestWorld, ancient: AncientForestWorld, bamboo: BambooWorld };
type WorldName = keyof typeof worlds;
type Target = { x: number; y: number; name?: string; clientX: number; clientY: number };

declare global {
  interface Window {
    __livingWoodsQA: {
      setActive: (value: boolean) => void;
      setStatic: (value: boolean) => void;
      setMounted: (value: boolean) => void;
      setSecond: (value: boolean) => void;
      events: () => unknown[];
      clearEvents: () => void;
      targets: () => Target[];
      captureCanvas: () => string;
      world: WorldName;
    };
  }
}

const interactions: unknown[] = [];
const params = new URLSearchParams(location.search);
const requested = params.get('world') as WorldName;
const world = requested in worlds ? requested : 'morning';

function Harness() {
  const [active, setActive] = useState(params.get('active') !== '0');
  const [static3D, setStatic] = useState(params.get('static') === '1');
  const [mounted, setMounted] = useState(true);
  const [second, setSecond] = useState(false);
  const interact = useCallback((event: unknown) => { interactions.push(event); }, []);
  const World = worlds[world];

  useEffect(() => {
    window.__livingWoodsQA = {
      world,
      setActive: (value) => flushSync(() => setActive(value)),
      setStatic: (value) => flushSync(() => setStatic(value)),
      setMounted: (value) => flushSync(() => setMounted(value)),
      setSecond: (value) => flushSync(() => setSecond(value)),
      events: () => interactions.slice(),
      clearEvents: () => { interactions.length = 0; },
      captureCanvas: () => {
        // QA only: obtain actual WebGL pixels synchronously in the same task
        // before a non-preserved drawing buffer is cleared by the browser.
        // This avoids a proven headless compositor readback timeout without
        // changing production renderer settings or adding a production hook.
        const engine = (getWoodsHost(world) as unknown as { engine: { renderFrame: (dt: number) => void } | null }).engine;
        const canvas = document.querySelector<HTMLCanvasElement>('canvas[data-engine-id]');
        if (!engine || !canvas) throw new Error('Scene engine is not mounted');
        engine.renderFrame(0);
        return canvas.toDataURL('image/png');
      },
      targets: () => {
        const canvas = document.querySelector<HTMLCanvasElement>('canvas[data-engine-id]');
        if (!canvas) return [];
        const box = canvas.getBoundingClientRect();
        try {
          const targets = JSON.parse(canvas.dataset.targets || '[]') as (Target | [number, number])[];
          return targets.map((target) => {
            const x = Array.isArray(target) ? target[0] : target.x;
            const y = Array.isArray(target) ? target[1] : target.y;
            return { x, y, name: Array.isArray(target) ? undefined : target.name, clientX: box.left + x * box.width, clientY: box.top + y * box.height };
          }).filter((target) => Number.isFinite(target.x) && Number.isFinite(target.y) && target.x >= 0 && target.x <= 1 && target.y >= 0 && target.y <= 1);
        } catch { return []; }
      },
    };
  }, []);

  return <>
    {mounted && <div className="qa-holder" data-qa-holder="primary"><World active={active} static3D={static3D} onInteraction={interact} /></div>}
    {mounted && second && <div className="qa-holder qa-holder-secondary" data-qa-holder="secondary"><World active={active} static3D={static3D} onInteraction={interact} /></div>}
    {params.get('controls') === '1' && <nav className="qa-controls" aria-label="Isolated scene test controls">
      <button onClick={() => setActive((value) => !value)}>{active ? 'Pause' : 'Resume'}</button>
      <button onClick={() => setStatic((value) => !value)}>Static: {String(static3D)}</button>
      <button onClick={() => setSecond((value) => !value)}>Second holder: {String(second)}</button>
      <button onClick={() => setMounted((value) => !value)}>{mounted ? 'Unmount' : 'Mount'}</button>
    </nav>}
  </>;
}

createRoot(document.getElementById('root')!).render(<Harness />);
