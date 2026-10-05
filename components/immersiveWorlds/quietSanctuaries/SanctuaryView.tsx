import React, { useEffect, useRef, useState } from 'react';
import type { LiveSceneHolder, LiveSceneStatus } from '../../liveScene/liveSceneHost';
import { useSceneMotion } from '../../useSceneMotion';
import type { SanctuaryHost } from './SanctuaryEngine';
import type { SanctuaryProps } from './worldTypes';
import './sanctuaries.css';

interface Props extends SanctuaryProps { host: SanctuaryHost; label: string }
export default function SanctuaryView({ active, static3D = false, onInteraction, host, label }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<LiveSceneHolder | null>(null);
  const callbackRef = useRef(onInteraction);
  callbackRef.current = onInteraction;
  const [status, setStatus] = useState<LiveSceneStatus>('loading');
  const motion = useSceneMotion(active && !static3D);
  useEffect(() => {
    if (!mountRef.current) return;
    const holder: LiveSceneHolder = { mount: mountRef.current, running: false, onStatus: setStatus };
    holderRef.current = holder;
    const release = host.acquire(holder);
    return () => { holderRef.current = null; release(); };
  }, [host]);
  useEffect(() => { if (holderRef.current) host.setRunning(holderRef.current, motion); }, [host, motion, status]);
  useEffect(() => {
    const root = rootRef.current;
    const holder = holderRef.current;
    if (!root || !holder || !motion || status !== 'ready') return;
    const surface = root.closest<HTMLElement>('[data-scene-surface]') ?? root;
    let pointer: { id: number; x: number; y: number; moved: boolean } | null = null;
    const cancel = () => {
      pointer = null;
      delete root.dataset.look;
      host.releaseDrag(holder);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', canceled);
      window.removeEventListener('blur', cancel);
    };
    const move = (event: PointerEvent) => {
      if (!pointer || event.pointerId !== pointer.id) return;
      const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
      pointer.moved ||= Math.hypot(dx, dy) > 8;
      if (pointer.moved) {
        root.dataset.look = 'drag';
        const unit = Math.max(1, Math.min(root.clientWidth, root.clientHeight));
        host.drag(holder, dx / unit, dy / unit);
      }
    };
    const up = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const distance = Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y);
      if (!pointer.moved && distance <= 8) {
        const rect = root.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
          const interaction = host.interact(holder, (event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2);
          if (interaction) callbackRef.current?.(interaction);
        }
      }
      cancel();
    };
    const canceled = (event: PointerEvent) => { if (pointer?.id === event.pointerId) cancel(); };
    const down = (event: PointerEvent) => {
      if (pointer || !event.isPrimary || event.button !== 0) return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target || target.closest('button, a, input, select, textarea, [role="button"]')) return;
      if (!(root.contains(target) || target.hasAttribute('data-scene-drag'))) return;
      if (event.pointerType === 'mouse') event.preventDefault();
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', canceled);
      window.addEventListener('blur', cancel);
    };
    surface.addEventListener('pointerdown', down);
    return () => { surface.removeEventListener('pointerdown', down); cancel(); };
  }, [host, motion, status]);
  return <div ref={rootRef} className="sanctuary-world" data-sanctuary={host.kind} data-state={status} data-motion={motion ? 'running' : 'paused'} role="img" aria-label={label}>
    <div ref={mountRef} className="sanctuary-mount" />
    {status === 'loading' && <span className="sanctuary-status" role="status">고요한 공간을 준비하고 있어요</span>}
    {status === 'failed' && <span className="sanctuary-status" role="status">이 환경에서는 3D 장면을 표시할 수 없어요</span>}
  </div>;
}
