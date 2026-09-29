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
  const rootRef = useRef<HTMLDivElement>(null);
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

  // Dragging across the view turns it a few degrees; letting go eases it back.
  // The drag can start anywhere on the surface the scene fills (marked with
  // data-scene-surface) except on the controls above it.
  useEffect(() => {
    const root = rootRef.current;
    const holder = holderRef.current;
    if (!motion || !root || !holder) return undefined;
    const surface = root.closest<HTMLElement>('[data-scene-surface]') ?? root;
    let drag: { id: number; x: number; y: number } | null = null;

    const move = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const unit = Math.max(1, Math.min(surface.clientWidth, surface.clientHeight));
      rainyWindowHost.drag(holder, (event.clientX - drag.x) / unit, (event.clientY - drag.y) / unit);
    };
    const end = (event?: PointerEvent) => {
      if (!drag || (event && event.pointerId !== drag.id)) return;
      drag = null;
      delete root.dataset.look;
      rainyWindowHost.releaseDrag(holder);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
    };
    const start = (event: PointerEvent) => {
      if (drag || !event.isPrimary || event.button !== 0) return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target || !(root.contains(target) || target.hasAttribute('data-scene-drag'))) return;
      // Keep a mouse drag from selecting the text around it.
      if (event.pointerType === 'mouse') event.preventDefault();
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
      root.dataset.look = 'drag';
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
    };

    surface.addEventListener('pointerdown', start);
    return () => {
      surface.removeEventListener('pointerdown', start);
      end();
    };
  }, [motion]);

  useEffect(() => {
    if (!motion || !subscribeEvents) return undefined;
    return subscribeEvents((type) => {
      if (type === 'thunder') rainyWindowHost.flash(1);
      else if (type === 'dthunder') rainyWindowHost.flash(0.45);
    });
  }, [motion, subscribeEvents]);

  return (
    <div ref={rootRef} className="rainy-window" data-state={status} data-motion={motion ? 'running' : 'paused'}>
      <RainyWindowPoster />
      <div ref={mountRef} className="rainy-window-mount" />
      {status === 'loading' ? <span className="sr-only" role="status">비 오는 창가 장면을 준비하고 있어요</span> : null}
    </div>
  );
}
