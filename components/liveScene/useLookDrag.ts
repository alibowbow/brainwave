import { useEffect, type RefObject } from 'react';
import type { LiveSceneEngine, LiveSceneHolder, LiveSceneHost } from './liveSceneHost';

/**
 * Dragging across a live scene turns its view a few degrees; letting go eases
 * it back. The drag can start anywhere on the surface the scene fills (marked
 * with data-scene-surface) except on the controls above it, and is measured in
 * shorter sides of that surface. While it lasts the scene's root is marked
 * data-look="drag".
 */
export function useLookDrag<E extends LiveSceneEngine>(
  host: LiveSceneHost<E>,
  rootRef: RefObject<HTMLElement | null>,
  holderRef: RefObject<LiveSceneHolder | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const root = rootRef.current;
    const holder = holderRef.current;
    if (!enabled || !root || !holder) return undefined;
    const surface = root.closest<HTMLElement>('[data-scene-surface]') ?? root;
    let drag: { id: number; x: number; y: number } | null = null;

    const move = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const unit = Math.max(1, Math.min(surface.clientWidth, surface.clientHeight));
      host.drag(holder, (event.clientX - drag.x) / unit, (event.clientY - drag.y) / unit);
    };
    const end = (event?: PointerEvent) => {
      if (!drag || (event && event.pointerId !== drag.id)) return;
      drag = null;
      delete root.dataset.look;
      host.releaseDrag(holder);
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
  }, [enabled, host, rootRef, holderRef]);
}
