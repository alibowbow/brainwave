import React, { useEffect, useRef, useState } from 'react';
import { LiveSceneHost, type LiveSceneHolder, type LiveSceneStatus } from '../../liveScene/liveSceneHost';
import { useSceneMotion } from '../../useSceneMotion';
import { ShelterEngine } from './engine/ShelterEngine';
import type { ShelterInteraction, WorldBuilder, WorldKind } from './engine/types';
import './rain-shelters.css';

export interface ShelterWorldProps {
  active: boolean;
  onInteraction?: (event: ShelterInteraction) => void;
  /** Preserve a real rendered 3D first frame without scheduling animation. */
  static3D?: boolean;
}
class ShelterHost extends LiveSceneHost<ShelterEngine> {
  private gestureCancellers = new Map<LiveSceneHolder, () => void>();
  registerGesture(holder: LiveSceneHolder, cancel: () => void) {
    this.gestureCancellers.set(holder, cancel);
    return () => { this.gestureCancellers.delete(holder); };
  }
  override acquire(holder: LiveSceneHolder) {
    // A gesture must never survive the canvas moving into or out of fullscreen.
    this.gestureCancellers.forEach(cancel => cancel());
    const release = super.acquire(holder);
    return () => { this.gestureCancellers.forEach(cancel => cancel()); release(); };
  }
  owns(holder: LiveSceneHolder) { return this.top === holder; }
  interact(holder: LiveSceneHolder, x: number, y: number, explicit = false) {
    return this.top === holder ? this.engine?.interact(x, y, explicit) ?? null : null;
  }
}
const hosts = new Map<WorldKind, ShelterHost>();
function getHost(kind: WorldKind, builder: WorldBuilder) {
  let host = hosts.get(kind);
  if (!host) {
    host = new ShelterHost({ canvasClass: 'rain-shelter-canvas', isSupported: () => typeof WebGL2RenderingContext !== 'undefined', create: (canvas, lost) => new ShelterEngine(canvas, kind, builder, lost) });
    hosts.set(kind, host);
  }
  return host;
}
const labels: Record<WorldKind, [string, string]> = {
  tent: ['텐트 속 빗소리', '텐트 입구 조절'], window: ['비 오는 창가', '유리에 빗방울 길 내기'],
  porch: ['장마철 처마', '돌확 물결 만들기'], storm: ['여름 뇌우', '차양 열림 조절'],
};

export function ShelterWorld({ active, onInteraction, static3D = false, kind, builder }: ShelterWorldProps & { kind: WorldKind; builder: WorldBuilder }) {
  const rootRef = useRef<HTMLDivElement>(null); const mountRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<LiveSceneHolder | null>(null);
  const callback = useRef(onInteraction); callback.current = onInteraction;
  const [status, setStatus] = useState<LiveSceneStatus>('loading');
  const [lastValue, setLastValue] = useState<number | null>(null);
  const motionAllowed = useSceneMotion(active); const running = motionAllowed && !static3D;
  const host = getHost(kind, builder);

  useEffect(() => {
    if (!mountRef.current) return;
    const holder: LiveSceneHolder = { mount: mountRef.current, running: false, onStatus: setStatus };
    holderRef.current = holder;
    const release = host.acquire(holder);
    return () => { holderRef.current = null; release(); };
  }, [host]);
  useEffect(() => { if (holderRef.current) host.setRunning(holderRef.current, running); }, [host, running, status]);

  const interact = (x: number, y: number, explicit = false) => {
    const holder = holderRef.current; if (!holder || !active || status !== 'ready') return;
    const event = host.interact(holder, x, y, explicit);
    if (event) { setLastValue(event.value); callback.current?.(event); }
  };
  const interactionRef = useRef(interact); interactionRef.current = interact;

  useEffect(() => {
    const root = rootRef.current; const holder = holderRef.current;
    if (!root || !holder || !active || status !== 'ready') return;
    // Player/fullscreen chrome is a sibling covering the scene, so listen at
    // the closest scene surface and admit only the actual scene or clear layer.
    const surface = root.closest<HTMLElement>('[data-scene-surface]') ?? root;
    const controls = 'button, input, select, textarea, a[href], summary, label, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="link"], [role="slider"], [role="switch"], [role="checkbox"], [role="radio"], [tabindex]:not([tabindex="-1"]), [data-scene-control], [data-scene-no-drag], [inert]';
    let pointer: { id: number; x: number; y: number; moved: boolean } | null = null;
    const move = (event: PointerEvent) => {
      if (!pointer || event.pointerId !== pointer.id) return;
      if (!host.owns(holder)) { cancel(); return; }
      const dx = event.clientX - pointer.x; const dy = event.clientY - pointer.y;
      if (Math.hypot(dx, dy) > 8) pointer.moved = true;
      if (pointer.moved && running) { root.dataset.look = 'drag'; const unit = Math.max(1, Math.min(root.clientWidth, root.clientHeight)); host.drag(holder, dx / unit, dy / unit); }
    };
    const finish = (event?: PointerEvent, cancelled = true) => {
      if (!pointer || (event && event.pointerId !== pointer.id)) return;
      const current = pointer; pointer = null; delete root.dataset.look; host.releaseDrag(holder);
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', cancel);
      const endTarget = event?.target instanceof Element ? event.target : null;
      if (!cancelled && event && host.owns(holder) && !endTarget?.closest(controls) && !current.moved && Math.hypot(event.clientX-current.x, event.clientY-current.y) <= 8) {
        const r = root.getBoundingClientRect();
        if (event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom) interactionRef.current((event.clientX-r.left)/r.width*2-1, 1-(event.clientY-r.top)/r.height*2);
      }
    };
    const up = (event: PointerEvent) => finish(event, false);
    const cancel = (event?: PointerEvent) => finish(event, true);
    const down = (event: PointerEvent) => {
      if (pointer || !host.owns(holder) || !event.isPrimary || event.button !== 0) return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target || target.closest(controls) || !surface.contains(target)) return;
      if (surface !== root && target.closest('[data-scene-surface]') !== surface) return;
      if (!root.contains(target) && !target.hasAttribute('data-scene-drag')) return;
      const bounds = root.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) return;
      if (event.pointerType === 'mouse') event.preventDefault();
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', cancel);
    };
    const blur = () => cancel();
    const unregisterGesture = host.registerGesture(holder, blur);
    surface.addEventListener('pointerdown', down); window.addEventListener('blur', blur);
    return () => { unregisterGesture(); surface.removeEventListener('pointerdown', down); window.removeEventListener('blur', blur); cancel(); };
  }, [active, host, running, status]);

  return <div ref={rootRef} className={`rain-shelter rain-shelter-${kind}`} data-world={kind} data-state={status} data-motion={running ? 'running' : 'paused'} data-interaction-value={lastValue ?? ''} role="group" aria-label={`${labels[kind][0]} 3D 풍경`}>
    <div ref={mountRef} className="rain-shelter-mount" />
    {status === 'ready' && <button className="rain-shelter-action" aria-label={labels[kind][1]} disabled={!active} onClick={() => interact(0, 0, true)}>{labels[kind][1]}<span aria-hidden="true"> ↗</span></button>}
    {status === 'loading' && <span className="rain-shelter-status" role="status">쉼터를 준비하고 있어요</span>}
    {status === 'failed' && <span className="rain-shelter-status" role="status">이 환경에서 3D 풍경을 표시할 수 없습니다.</span>}
  </div>;
}
