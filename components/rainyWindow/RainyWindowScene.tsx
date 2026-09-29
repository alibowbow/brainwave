import React, { useEffect, useRef, useState } from 'react';
import type { BackgroundSoundType } from '../../types';
import { useSceneMotion } from '../useSceneMotion';
import { rainyWindowHost, type RainyWindowHolder, type RainyWindowStatus } from './rainyWindowHost';
import { RainyWindowPoster } from './RainyWindowPoster';
import './rainy-window.css';

interface Props {
  /** The session is playing; the scene animates only while this is true. */
  active: boolean;
  rainIntensity: number;
  subscribeEvents?: (callback: (type: BackgroundSoundType) => void) => () => void;
}

/** Real-time rainy night study for the deep-focus routine. */
export default function RainyWindowScene({ active, rainIntensity, subscribeEvents }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<RainyWindowHolder | null>(null);
  const [status, setStatus] = useState<RainyWindowStatus>('loading');
  const motion = useSceneMotion(active);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    const holder: RainyWindowHolder = { mount, running: false, onStatus: setStatus };
    holderRef.current = holder;
    const release = rainyWindowHost.acquire(holder);
    return () => {
      holderRef.current = null;
      release();
    };
  }, []);

  useEffect(() => {
    if (holderRef.current) rainyWindowHost.setRunning(holderRef.current, motion);
  }, [motion, status]);

  useEffect(() => {
    rainyWindowHost.setRainIntensity(rainIntensity);
  }, [rainIntensity]);

  useEffect(() => {
    if (!motion || !subscribeEvents) return undefined;
    return subscribeEvents((type) => {
      if (type === 'thunder') rainyWindowHost.flash(1);
      else if (type === 'dthunder') rainyWindowHost.flash(0.45);
    });
  }, [motion, subscribeEvents]);

  return (
    <div className="rainy-window" data-state={status} data-motion={motion ? 'running' : 'paused'}>
      <RainyWindowPoster />
      <div ref={mountRef} className="rainy-window-mount" />
      {status === 'loading' ? <span className="sr-only" role="status">비 오는 창가 장면을 준비하고 있어요</span> : null}
    </div>
  );
}
