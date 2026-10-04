import React, { useEffect, useRef, useState } from 'react';
import type { BackgroundSoundType } from '../../../types';
import type { LiveSceneHolder, LiveSceneStatus } from '../../liveScene/liveSceneHost';
import { useSceneMotion } from '../../useSceneMotion';
import { worldHosts } from './WorldEngine';
import type { WorldId, WorldInteraction } from './types';
import './korean-world.css';

export interface WorldProps {
  active: boolean;
  onInteraction?: (event: WorldInteraction) => void;
  /** Render a real 3D first frame without animation. */
  static3D?: boolean;
  /** Optional existing-engine event subscription. No new audio player is created. */
  subscribeEvents?: (callback: (type: BackgroundSoundType) => void) => () => void;
}
const labels: Record<WorldId, string> = { temple: '산사의 아침', scops: '소쩍새 밤', rural: '시골 여름밤' };

export default function KoreanWorld({ id, active, static3D = false, onInteraction, subscribeEvents }: WorldProps & { id: WorldId }) {
  const root = useRef<HTMLDivElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const holder = useRef<LiveSceneHolder | null>(null);
  const callback = useRef(onInteraction); callback.current = onInteraction;
  const [status, setStatus] = useState<LiveSceneStatus>('loading');
  const motion = useSceneMotion(active && !static3D);
  const host = worldHosts[id];

  useEffect(() => {
    if (!mount.current) return;
    const current: LiveSceneHolder = { mount: mount.current, running: false, onStatus: setStatus };
    holder.current = current;
    const release = host.acquire(current);
    return () => { holder.current = null; release(); };
  }, [host]);
  useEffect(() => { if (holder.current) host.setRunning(holder.current, motion); }, [host, motion, status]);

  useEffect(() => {
    if (!motion || !subscribeEvents || !holder.current) return;
    const current = holder.current;
    return subscribeEvents(type => { if (type === 'scops') host.audio(current, 'scops-call'); });
  }, [host, motion, subscribeEvents]);

  useEffect(() => {
    const surface = root.current;
    const current = holder.current;
    if (!surface || !current || !motion || status !== 'ready') return;
    let gesture: { id: number; x: number; y: number; distance: number; started: number } | null = null;
    const move = (e: PointerEvent) => {
      if (!gesture || e.pointerId !== gesture.id) return;
      const dx = e.clientX - gesture.x, dy = e.clientY - gesture.y;
      gesture.distance = Math.max(gesture.distance, Math.hypot(dx, dy));
      if (gesture.distance > 7) {
        surface.dataset.look = 'drag';
        const unit = Math.max(1, Math.min(surface.clientWidth, surface.clientHeight));
        host.drag(current, dx / unit, dy / unit);
      }
    };
    const end = (e?: PointerEvent) => {
      if (!gesture || (e && gesture.id !== e.pointerId)) return;
      const completed = gesture; gesture = null;
      if (surface.hasPointerCapture(completed.id)) surface.releasePointerCapture(completed.id);
      delete surface.dataset.look;
      host.releaseDrag(current);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
      window.removeEventListener('blur', cancel);
      if (e?.type === 'pointerup' && completed.distance <= 7 && Math.hypot(e.clientX-completed.x,e.clientY-completed.y) <= 7 && performance.now() - completed.started < 700) {
        const box = surface.getBoundingClientRect();
        const x = (e.clientX - box.left) / box.width, y = (e.clientY - box.top) / box.height;
        if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
          const event = host.tap(current, x * 2 - 1, 1 - y * 2);
          if (event) callback.current?.(event);
        }
      }
    };
    const cancel = () => end();
    const down = (e: PointerEvent) => {
      if (gesture || !e.isPrimary || e.button !== 0 || !(e.target instanceof Element) || e.target.closest('button,a,input,select,textarea')) return;
      gesture = { id: e.pointerId, x: e.clientX, y: e.clientY, distance: 0, started: performance.now() };
      // Capture real pointers even if the user drags outside the viewport.
      // Synthetic pointer events in the isolated QA harness have no active pointer.
      try { surface.setPointerCapture(e.pointerId); } catch { /* synthetic pointer */ }
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
      window.addEventListener('blur', cancel);
    };
    surface.addEventListener('pointerdown', down);
    surface.addEventListener('lostpointercapture', end);
    return () => { surface.removeEventListener('pointerdown', down); surface.removeEventListener('lostpointercapture', end); end(); };
  }, [host, motion, status]);

  return <div ref={root} className={`korean-world korean-world-${id}`} data-world={id} data-state={status} data-motion={motion ? 'running' : 'paused'} role="img" aria-label={`${labels[id]} · 3D 풍경`}>
    <div ref={mount} className="korean-world-mount" />
    {status === 'loading' && <span className="korean-world-status" role="status">풍경을 준비하고 있어요</span>}
    {status === 'failed' && <span className="korean-world-status" role="status">이 환경에서는 3D 풍경을 표시할 수 없습니다.</span>}
  </div>;
}
