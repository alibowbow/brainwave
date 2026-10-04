import { useEffect, useRef, useState } from 'react';
import { useSceneMotion } from '../../useSceneMotion';
import type { LiveSceneStatus } from '../../liveScene/liveSceneHost';
import { deepWaterHosts, type DeepWaterHolder } from './host';
import type { DeepWaterInteraction, WorldKind } from './engine/types';
import './deepWater.css';

export interface DeepWaterProps {
  active: boolean;
  static3D?: boolean;
  onInteraction?: (event: DeepWaterInteraction) => void;
}
const names = { waterfall: '폭포 계곡', cave: '동굴 명상', sea: '깊은 바다' };
export default function DeepWaterView({ active, static3D = false, onInteraction, kind }: DeepWaterProps & { kind: WorldKind }) {
  const root = useRef<HTMLDivElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const holder = useRef<DeepWaterHolder | null>(null);
  const [status, setStatus] = useState<LiveSceneStatus>('loading');
  const allowed = useSceneMotion(active);
  const motion = allowed && !static3D;
  const host = deepWaterHosts[kind];
  const callback = useRef(onInteraction);
  callback.current = onInteraction;
  useEffect(() => {
    if (!mount.current) return;
    const current: DeepWaterHolder = { mount: mount.current, running: false, onStatus: setStatus, onInteraction: event => callback.current?.(event) };
    holder.current = current;
    const release = host.acquire(current);
    return () => { holder.current = null; release(); };
  }, [host]);
  useEffect(() => { if (holder.current) host.setRunning(holder.current, motion); }, [host, motion, status]);
  useEffect(() => {
    const element = root.current;
    const current = holder.current;
    if (!element || !current || !motion || status !== 'ready') return;
    let pointer: { id: number; x: number; y: number; moved: boolean; started: number } | null = null;
    const end = (event?: PointerEvent) => {
      if (!pointer || (event && event.pointerId !== pointer.id)) return;
      const p = pointer; pointer = null; delete element.dataset.look;
      host.releaseDrag(current);
      if (event?.type === 'pointerup' && !p.moved && performance.now() - p.started < 600) {
        const rect = element.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) host.touch(current, (event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2);
      }
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', end); window.removeEventListener('pointercancel', end); window.removeEventListener('blur', cancel);
    };
    const cancel = () => end();
    const move = (event: PointerEvent) => {
      if (!pointer || event.pointerId !== pointer.id) return;
      const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
      pointer.moved ||= Math.hypot(dx, dy) > 7;
      if (pointer.moved) { element.dataset.look = 'drag'; const unit = Math.max(1, Math.min(element.clientWidth, element.clientHeight)); host.drag(current, dx / unit, dy / unit); }
    };
    const down = (event: PointerEvent) => {
      if (pointer || !event.isPrimary || event.button !== 0 || (event.target as Element)?.closest('button,a,input,select,textarea')) return;
      if (event.pointerType === 'mouse') event.preventDefault();
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false, started: performance.now() };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', end); window.addEventListener('pointercancel', end); window.addEventListener('blur', cancel);
    };
    element.addEventListener('pointerdown', down);
    return () => { element.removeEventListener('pointerdown', down); cancel(); };
  }, [host, motion, status]);
  return <div ref={root} className={`deepwater-world deepwater-${kind}`} data-world={kind} data-state={status} data-motion={motion ? 'running' : 'paused'} aria-label={`${names[kind]} 3D 풍경`}>
    <div ref={mount} className="deepwater-mount" />
    {status !== 'ready' && <span className="deepwater-status" role="status">{status === 'failed' ? '이 환경에서 3D 장면을 표시할 수 없습니다.' : `${names[kind]}을 준비하고 있어요`}</span>}
  </div>;
}
