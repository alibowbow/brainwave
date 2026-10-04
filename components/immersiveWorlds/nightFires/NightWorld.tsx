import React, { useEffect, useRef, useState } from 'react';
import type { LiveSceneHolder, LiveSceneStatus } from '../../liveScene/liveSceneHost';
import { useSceneMotion } from '../../useSceneMotion';
import { getNightHost } from './nightEngine';
import type { NightWorldId, NightWorldProps, NightInteractionKind } from './worldTypes';
import './night-world.css';

const labels = {
  mountain: { title: '모닥불 밤', description: '산속 공터에서 작은 모닥불과 겹겹의 능선, 별을 바라봅니다.' },
  deep: { title: '깊은 밤', description: '언덕 위 나무 벤치에서 고요한 산과 멀리 켜진 집의 불빛을 바라봅니다.' },
  lakeside: { title: '모닥불 캠핑', description: '보랏빛 호숫가, 텐트와 작은 모닥불 곁에 앉아 쉽니다.' },
};
const actions: Record<NightWorldId, NightInteractionKind[]> = { mountain: ['log-embers'], deep: ['lantern-brightness'], lakeside: ['log-embers', 'lantern-brightness'] };
const actionLabels = { 'log-embers': '장작에 작은 불씨 피우기', 'lantern-brightness': '랜턴 밝기 조절' };

export default function NightWorld({ world, active, static3D = false, onInteraction, className = '' }: NightWorldProps & { world: NightWorldId }) {
  const root = useRef<HTMLDivElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const holder = useRef<LiveSceneHolder | null>(null);
  const callback = useRef(onInteraction);
  callback.current = onInteraction;
  const [status, setStatus] = useState<LiveSceneStatus>('loading');
  const motion = useSceneMotion(active && !static3D);
  const host = getNightHost(world);

  useEffect(() => {
    if (!mount.current) return;
    const entry: LiveSceneHolder = { mount: mount.current, running: false, onStatus: setStatus };
    holder.current = entry;
    const release = host.acquire(entry);
    return () => { holder.current = null; release(); };
  }, [host]);
  useEffect(() => { if (holder.current) host.setRunning(holder.current, motion); }, [host, motion, status]);

  useEffect(() => {
    const element = root.current;
    const entry = holder.current;
    if (!element || !entry || status !== 'ready' || !active) return;
    const surface = element.closest<HTMLElement>('[data-scene-surface]') ?? element;
    const chromeSelector = 'button, a, input, select, textarea, label, summary, [role="button"], [role="slider"], [role="textbox"], [role="link"], [contenteditable]:not([contenteditable="false"])';
    let press: { id: number; x: number; y: number; distance: number; at: number } | null = null;
    const cancel = () => {
      const pointerId = press?.id;
      press = null;
      if (pointerId !== undefined && element.hasPointerCapture?.(pointerId)) element.releasePointerCapture(pointerId);
      delete element.dataset.look;
      host.releaseDrag(entry);
    };
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || press || document.hidden) return;
      if (!host.ownsInput(entry)) return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      // Player/fullscreen chrome is a sibling full-cover transparent drag surface.
      // Never cross into nested scene surfaces or turn actual controls into gestures.
      const targetSurface = target.closest<HTMLElement>('[data-scene-surface]');
      if (targetSurface && targetSurface !== surface) return;
      if (!(element.contains(target) || target.hasAttribute('data-scene-drag'))) return;
      if (target.closest(chromeSelector)) return;
      press = { id: event.pointerId, x: event.clientX, y: event.clientY, distance: 0, at: performance.now() };
      try { element.setPointerCapture?.(event.pointerId); } catch { /* Synthetic QA pointers have no active browser capture. */ }
      if (event.pointerType === 'mouse') event.preventDefault();
    };
    const move = (event: PointerEvent) => {
      if (!press || press.id !== event.pointerId) return;
      const dx = event.clientX - press.x;
      const dy = event.clientY - press.y;
      press.distance = Math.max(press.distance, Math.hypot(dx, dy));
      if (press.distance <= 8) return;
      element.dataset.look = 'drag';
      if (motion) { const unit = Math.max(1, Math.min(element.clientWidth, element.clientHeight)); host.drag(entry, dx / unit, dy / unit); }
    };
    const up = (event: PointerEvent) => {
      if (!press || press.id !== event.pointerId) return;
      const distance = Math.max(press.distance, Math.hypot(event.clientX - press.x, event.clientY - press.y));
      const isTap = distance <= 8 && performance.now() - press.at < 650 && !document.hidden;
      cancel();
      if (!isTap) return;
      const bounds = element.getBoundingClientRect();
      const point: [number, number] = [(event.clientX - bounds.left) / bounds.width, (event.clientY - bounds.top) / bounds.height];
      if (point.some((n) => n < 0 || n > 1)) return;
      const interaction = host.interact(entry, undefined, point);
      if (interaction) callback.current?.(interaction);
    };
    const pointerCancel = (event: PointerEvent) => { if (press?.id === event.pointerId) cancel(); };
    const visibility = () => { if (document.hidden) cancel(); };
    surface.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', pointerCancel);
    element.addEventListener('lostpointercapture', pointerCancel);
    window.addEventListener('blur', cancel);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      surface.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', pointerCancel);
      element.removeEventListener('lostpointercapture', pointerCancel);
      window.removeEventListener('blur', cancel);
      document.removeEventListener('visibilitychange', visibility);
      cancel();
    };
  }, [active, host, motion, status]);

  const keyboardAction = (kind: NightInteractionKind) => {
    if (!holder.current || !active || document.hidden) return;
    const event = host.interact(holder.current, kind);
    if (event) callback.current?.(event);
  };
  return <div ref={root} className={`night-world ${className}`} data-world={world} data-state={status} data-motion={motion ? 'running' : 'paused'} role="group" aria-label={`${labels[world].title} 3D 풍경`}>
    <div className="night-world-mount" ref={mount} />
    <span className="night-world-sr">{labels[world].description} 화면을 천천히 끌어 둘러볼 수 있습니다.</span>
    {status !== 'ready' && <div className="night-world-status" role="status">{status === 'loading' ? '밤 풍경을 준비하고 있어요' : '이 환경에서는 3D 풍경을 표시할 수 없습니다.'}</div>}
    <div className="night-world-actions">{actions[world].map((kind) => <button className="night-world-action" type="button" data-kind={kind} key={kind} disabled={!active || status !== 'ready'} onClick={() => keyboardAction(kind)}>{actionLabels[kind]}</button>)}</div>
  </div>;
}
