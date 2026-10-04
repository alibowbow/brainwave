import React, { useEffect, useRef, useState } from 'react';
import type { LiveSceneHolder, LiveSceneStatus } from '../../liveScene/liveSceneHost';
import { useSceneMotion } from '../../useSceneMotion';
import { WoodsGesture } from './gesture';
import { getWoodsHost } from './host';
import { worldMetadata, type LivingWorld, type LivingWoodsProps } from './types';
import './livingWoods.css';

export default function WorldSurface({ world, active, static3D = false, onInteraction }: LivingWoodsProps & { world: LivingWorld }) {
  const mount = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const holder = useRef<LiveSceneHolder | null>(null);
  const callback = useRef(onInteraction);
  callback.current = onInteraction;
  const [status, setStatus] = useState<LiveSceneStatus>('loading');
  const motion = useSceneMotion(active && !static3D);
  const host = getWoodsHost(world);
  useEffect(() => {
    if (!mount.current) return;
    const current: LiveSceneHolder = { mount: mount.current, running: false, onStatus: setStatus };
    holder.current = current;
    const release = host.acquire(current);
    return () => { holder.current = null; release(); };
  }, [host]);
  useEffect(() => { if (holder.current) host.setRunning(holder.current, motion); }, [host, motion, status]);
  useEffect(() => {
    const element = root.current, current = holder.current;
    if (!element || !current || !motion || status !== 'ready') return;
    // The shared surface may carry controls; only the actual scene is interactive.
    const surface = element.closest<HTMLElement>('[data-scene-surface]') ?? element;
    const gesture = new WoodsGesture();
    let pointerId: number | null = null;
    const clear = () => {
      gesture.cancel(); pointerId = null; delete element.dataset.look;
      host.releaseDrag(current);
    };
    const down = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!event.isPrimary || event.button !== 0 || pointerId !== null || !target || !(element.contains(target) || target.hasAttribute('data-scene-drag'))) return;
      if (!gesture.begin(event.pointerId, event.clientX, event.clientY, event.timeStamp)) return;
      pointerId = event.pointerId;
      if (event.pointerType === 'mouse') event.preventDefault();
    };
    const move = (event: PointerEvent) => {
      const delta = gesture.move(event.pointerId, event.clientX, event.clientY);
      if (!delta) return;
      if (Math.hypot(delta.dx, delta.dy) > 8) element.dataset.look = 'drag';
      const unit = Math.max(1, Math.min(element.clientWidth, element.clientHeight));
      host.drag(current, delta.dx / unit, delta.dy / unit);
    };
    const up = (event: PointerEvent) => {
      if (pointerId !== event.pointerId) return;
      const tap = gesture.end(event.pointerId, event.clientX, event.clientY, event.timeStamp);
      if (tap) {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width, y = (event.clientY - bounds.top) / bounds.height;
        if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
          const interaction = host.tap(current, x, y);
          if (interaction) callback.current?.(interaction);
        }
      }
      clear();
    };
    const cancel = (event: PointerEvent) => { if (pointerId === event.pointerId) clear(); };
    const blur = () => clear();
    surface.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', cancel);
    window.addEventListener('blur', blur);
    return () => {
      surface.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', cancel);
      window.removeEventListener('blur', blur);
      clear();
    };
  }, [host, motion, status]);
  return <div ref={root} className={`living-woods living-woods-${world}`} data-world={world} data-status={status} data-motion={motion ? 'running' : 'paused'} role="img" aria-label={`${worldMetadata[world].label} — 앉아서 바라보는 숲. 천천히 끌어 둘러보고 가까운 ${world === 'morning' ? '찻잔' : '잎'}을 눌러 보세요.`}>
    <div ref={mount} className="living-woods-mount" />
    {status === 'loading' && <span className="living-woods-message" role="status">숲을 준비하고 있어요</span>}
    {status === 'failed' && <span className="living-woods-message" role="status">이 환경에서 3D 숲을 표시할 수 없어요</span>}
  </div>;
}
