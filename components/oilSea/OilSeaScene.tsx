import React, { useEffect, useRef, useState } from 'react';
import { useLookDrag } from '../liveScene/useLookDrag';
import { useSceneMotion } from '../useSceneMotion';
import { oilSeaHost, type OilSeaHolder, type OilSeaStatus } from './oilSeaHost';
import { OilSeaPoster } from './OilSeaPoster';
import './oil-sea.css';

interface Props {
  /** The session is playing; the painting moves only while this is true. */
  active: boolean;
  /** How hard the surf breaks (follows the wave sound's level). */
  waveEnergy: number;
}

/** The ocean-shore routine's sea, painted in oils as it plays; a drag turns the view a little. */
export default function OilSeaScene({ active, waveEnergy }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<OilSeaHolder | null>(null);
  const [status, setStatus] = useState<OilSeaStatus>('loading');
  const motion = useSceneMotion(active);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    const holder: OilSeaHolder = { mount, running: false, onStatus: setStatus };
    holderRef.current = holder;
    const release = oilSeaHost.acquire(holder);
    return () => {
      holderRef.current = null;
      release();
    };
  }, []);

  useEffect(() => {
    if (holderRef.current) oilSeaHost.setRunning(holderRef.current, motion);
  }, [motion, status]);

  useEffect(() => {
    oilSeaHost.setWaveEnergy(waveEnergy);
  }, [waveEnergy]);

  useLookDrag(oilSeaHost, rootRef, holderRef, motion);

  return (
    <div ref={rootRef} className="oil-sea" data-state={status} data-motion={motion ? 'running' : 'paused'}>
      {status === 'failed' ? <OilSeaPoster /> : null}
      <div ref={mountRef} className="oil-sea-mount" />
      {status === 'loading' ? <span className="sr-only" role="status">바다 그림을 준비하고 있어요</span> : null}
    </div>
  );
}
