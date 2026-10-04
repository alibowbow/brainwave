import { useEffect, useRef, useState } from 'react';
import type { LiveSceneHolder, LiveSceneStatus } from '../../liveScene/liveSceneHost';
import { useSceneMotion } from '../../useSceneMotion';
import { getWorldHost } from './runtime';
import type { WaterEdgeKind, WaterEdgeProps, WorldFactory } from './contracts';
import './water-edge.css';

const labels: Record<WaterEdgeKind, string> = {
  'night-pond': '달빛이 비치는 여름밤 연못',
  'summer-valley': '돌 사이로 맑은 물이 흐르는 여름 계곡',
  'pebble-shore': '젖은 몽돌 위로 잔잔한 물결이 드는 해변',
};
export default function WorldView({ kind, factory, active, static3D = false, onInteraction }: WaterEdgeProps & { kind: WaterEdgeKind; factory: WorldFactory }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<LiveSceneHolder | null>(null);
  const callback = useRef(onInteraction);
  callback.current = onInteraction;
  const [status, setStatus] = useState<LiveSceneStatus>('loading');
  const policyMotion = useSceneMotion(active);
  const motion = policyMotion && !static3D;
  const host = getWorldHost(kind, factory);
  useEffect(() => {
    if (!mountRef.current) return;
    const holder = { mount: mountRef.current, running: false, onStatus: setStatus };
    holderRef.current = holder;
    const release = host.acquire(holder);
    return () => { holderRef.current = null; release(); };
  }, [host]);
  useEffect(() => { if (holderRef.current) host.setRunning(holderRef.current, motion); }, [host, motion, status]);
  useEffect(() => {
    const root = rootRef.current, holder = holderRef.current;
    if (!root || !holder || !motion || status !== 'ready') return;
    const surface = root.closest<HTMLElement>('[data-scene-surface]') ?? root;
    let pointer: { id: number; x: number; y: number; maxDistance: number; time: number } | null = null;
    const move = (event: PointerEvent) => {
      if (!pointer || event.pointerId !== pointer.id) return;
      const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
      pointer.maxDistance = Math.max(pointer.maxDistance, Math.hypot(dx, dy));
      if (pointer.maxDistance > 8) {
        root.dataset.look = 'drag';
        const unit = Math.max(1, Math.min(root.clientWidth, root.clientHeight));
        host.drag(holder, dx / unit, dy / unit);
      }
    };
    const clean = () => {
      pointer = null; delete root.dataset.look; host.releaseDrag(holder);
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', end); window.removeEventListener('pointercancel', cancel);
    };
    const cancel = (event?: PointerEvent) => { if (!event || pointer?.id === event.pointerId) clean(); };
    const tap = (clientX: number, clientY: number) => {
      const rect = root.getBoundingClientRect();
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return;
      const event = host.tap(holder, (clientX - rect.left) / rect.width * 2 - 1, 1 - (clientY - rect.top) / rect.height * 2);
      if (event) callback.current?.(event);
    };
    const end = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      // Include the final displacement even when the browser coalesced all move events.
      pointer.maxDistance = Math.max(pointer.maxDistance, Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y));
      if (pointer.maxDistance <= 8 && performance.now() - pointer.time < 750) tap(event.clientX, event.clientY);
      clean();
    };
    const start = (event: PointerEvent) => {
      if (pointer || !event.isPrimary || event.button !== 0) return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target || !(root.contains(target) || target.hasAttribute('data-scene-drag'))) return;
      if (target.closest('button, a, input, select, textarea, [role="button"]')) return;
      event.preventDefault();
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, maxDistance: 0, time: performance.now() };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', end); window.addEventListener('pointercancel', cancel);
    };
    const key = (event: KeyboardEvent) => {
      if (event.target !== root || (event.key !== 'Enter' && event.key !== ' ')) return;
      event.preventDefault();
      const bounds = root.getBoundingClientRect(); tap(bounds.left + bounds.width * .5, bounds.top + bounds.height * .72);
    };
    surface.addEventListener('pointerdown', start); root.addEventListener('keydown', key); window.addEventListener('blur', clean);
    return () => { clean(); surface.removeEventListener('pointerdown', start); root.removeEventListener('keydown', key); window.removeEventListener('blur', clean); };
  }, [host, motion, status]);
  return <div className={`water-edge water-edge-${kind}`} ref={rootRef} data-world={kind} data-state={status} data-motion={motion ? 'running' : 'paused'} role="img" aria-label={labels[kind]} tabIndex={motion ? 0 : -1}>
    <div className="water-edge-mount" ref={mountRef} />
    {status !== 'ready' && <span className="water-edge-status" role="status">{status === 'failed' ? '이 환경에서는 3D 화면을 표시할 수 없습니다.' : '물가 풍경을 준비하고 있어요'}</span>}
  </div>;
}
