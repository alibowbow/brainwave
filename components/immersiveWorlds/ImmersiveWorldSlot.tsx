import React, { Component, Suspense, type ReactNode } from 'react';
import type { ImmersiveWorldProps } from './contract';
import { immersiveWorldRegistry } from './registry';

class WorldBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

interface Props extends ImmersiveWorldProps {
  worldId?: string;
  fallback: ReactNode;
}

/** Both the session player and the nature studio enter through this slot.
 * No loader, unavailable chunk, or render error keeps the existing experience.
 * The keyed boundary prevents a failed world poisoning the next selection. */
export function ImmersiveWorldSlot({ worldId, fallback, ...props }: Props) {
  const World = immersiveWorldRegistry.get(worldId);
  if (!World) return <>{fallback}</>;
  return <WorldBoundary key={worldId} fallback={fallback}>
    <Suspense fallback={fallback}><World {...props} /></Suspense>
  </WorldBoundary>;
}
