import React, { Component, Suspense, useCallback, useRef, type ReactNode } from 'react';
import type { ImmersiveWorldProps, WorldInteractionHandler } from './contract';
import { immersiveWorldRegistry } from './registry';

class WorldBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

interface Props extends ImmersiveWorldProps {
  worldId?: string;
  fallback: ReactNode;
  onWorldInteraction?: WorldInteractionHandler;
}

/** Both the session player and the nature studio enter through this slot.
 * No loader, unavailable chunk, or render error keeps the existing experience.
 * The keyed boundary prevents a failed world poisoning the next selection. */
export function ImmersiveWorldSlot({ worldId, fallback, onWorldInteraction, ...props }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const callbacks = useRef({ id: worldId, count: 0 });
  if (callbacks.current.id !== worldId) callbacks.current = { id: worldId, count: 0 };
  const onInteraction = useCallback((event: unknown) => {
    if (!worldId || callbacks.current.id !== worldId || !root.current?.isConnected) return;
    callbacks.current.count += 1;
    root.current?.setAttribute('data-world-callbacks', String(callbacks.current.count));
    onWorldInteraction?.(worldId, event);
  }, [onWorldInteraction, worldId]);
  const World = immersiveWorldRegistry.get(worldId);
  if (!World) return <>{fallback}</>;
  return <div ref={root} data-immersive-world-id={worldId} data-world-callbacks={callbacks.current.count} className="absolute inset-0">
    <WorldBoundary key={worldId} fallback={fallback}>
      <Suspense fallback={fallback}><World {...props} onInteraction={onInteraction} /></Suspense>
    </WorldBoundary>
  </div>;
}
