import { useEffect, useRef, useState } from 'react';
import { useLookDrag } from '../../liveScene/useLookDrag';
import { useSceneMotion } from '../../useSceneMotion';
import { forestHost, type ForestHolder, type ForestInteraction, type ForestStatus } from './forestHost';
import './forest.css';

export type { ForestInteraction } from './forestHost';

export interface ForestWorldProps {
  active: boolean;
  className?: string;
  /** Optional bridge into the existing audio engine; no sound is owned here. */
  onInteraction?: (event: ForestInteraction) => void;
}

/** A seated, first-person morning clearing, served by one shared WebGL scene. */
export default function ForestWorld({ active, className, onInteraction }: ForestWorldProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<ForestHolder | null>(null);
  const callbackRef = useRef(onInteraction);
  callbackRef.current = onInteraction;
  const [status, setStatus] = useState<ForestStatus>('loading');
  const motion = useSceneMotion(active);

  useEffect(() => {
    if (!mountRef.current) return undefined;
    const holder: ForestHolder = {
      mount: mountRef.current,
      running: false,
      onStatus: setStatus,
      onInteraction: (event) => callbackRef.current?.(event),
    };
    holderRef.current = holder;
    const release = forestHost.acquire(holder);
    return () => {
      holderRef.current = null;
      release();
    };
  }, []);

  useEffect(() => {
    if (holderRef.current) forestHost.setRunning(holderRef.current, motion);
  }, [motion, status]);

  useLookDrag(forestHost, rootRef, holderRef, motion && status === 'ready');

  useEffect(() => {
    const root = rootRef.current;
    const holder = holderRef.current;
    if (!motion || status !== 'ready' || !root || !holder) return undefined;
    let pointer: { id: number; x: number; y: number; moved: boolean } | null = null;

    const start = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || pointer) return;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
    };
    const move = (event: PointerEvent) => {
      if (!pointer || event.pointerId !== pointer.id) return;
      if (Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > 6) pointer.moved = true;
    };
    const finish = (event: PointerEvent) => {
      if (!pointer || event.pointerId !== pointer.id) return;
      const wasTap = !pointer.moved && Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) <= 6;
      pointer = null;
      if (!wasTap) return;
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height || event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;
      forestHost.touch(holder, (event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2);
    };
    const cancel = () => { pointer = null; };

    root.addEventListener('pointerdown', start);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', cancel);
    window.addEventListener('blur', cancel);
    return () => {
      root.removeEventListener('pointerdown', start);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', finish);
      window.removeEventListener('pointercancel', cancel);
      window.removeEventListener('blur', cancel);
      cancel();
    };
  }, [motion, status]);

  return (
    <div
      ref={rootRef}
      className={`forest-world${className ? ` ${className}` : ''}`}
      data-state={status}
      data-motion={motion ? 'running' : 'paused'}
      data-scene-surface
      role="group"
      aria-label="아침 숲: 이슬 맺힌 잎과 물가에 앉아 바라보는 숲속 쉼터"
    >
      <div ref={mountRef} className="forest-world-mount" />
      {status === 'loading' ? <span className="forest-world-status" role="status">아침 숲을 준비하고 있어요</span> : null}
      {status === 'failed' ? (
        <div className="forest-world-fallback" role="status">
          <span>아침 숲</span>
          <p>이 기기에서 3D 장면을 표시하지 못했어요.</p>
          <p>세션은 계속 이용할 수 있어요.</p>
        </div>
      ) : null}
    </div>
  );
}
