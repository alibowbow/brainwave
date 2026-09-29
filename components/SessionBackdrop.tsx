import React, { Component, Suspense, lazy, useMemo, type ReactNode } from 'react';
import type { BackgroundSoundType } from '../types';
import type { SoundLayer } from '../services/audioEngine';
import { NatureScene } from './NatureScene';
import { OilSeaFallback, OilSeaPaper } from './oilSea/OilSeaPoster';
import { RainyWindowFallback } from './rainyWindow/RainyWindowPoster';
import { rainIntensityFor, waveEnergyFor, type SessionBackdropVariant } from './session/sessionBackdrop';

// three.js stays out of every other session: only this routine loads it.
const RainyWindowScene = lazy(() => import('./rainyWindow/RainyWindowScene'));
// Likewise the painted sea's renderer loads only for the ocean shore.
const OilSeaScene = lazy(() => import('./oilSea/OilSeaScene'));

/** A chunk that cannot load (offline before first use) leaves the still in place. */
class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

interface Props {
  variant?: SessionBackdropVariant;
  layers: SoundLayer[];
  active: boolean;
  subscribeEvents?: (callback: (type: BackgroundSoundType) => void) => () => void;
}

/** The place a session plays in: a live scene (the rainy study, the painted sea) or an illustrated landscape. */
export const SessionBackdrop: React.FC<Props> = ({ variant, layers, active, subscribeEvents }) => {
  const types = useMemo(() => layers.map((layer) => layer.type), [layers]);
  if (variant === 'rainy-window') {
    return (
      <SceneBoundary key={variant} fallback={<RainyWindowFallback />}>
        <Suspense fallback={<RainyWindowFallback />}>
          <RainyWindowScene active={active} rainIntensity={rainIntensityFor(layers)} subscribeEvents={subscribeEvents} />
        </Suspense>
      </SceneBoundary>
    );
  }
  if (variant === 'oil-sea') {
    return (
      <SceneBoundary key={variant} fallback={<OilSeaFallback />}>
        <Suspense fallback={<OilSeaPaper />}>
          <OilSeaScene active={active} waveEnergy={waveEnergyFor(layers)} />
        </Suspense>
      </SceneBoundary>
    );
  }
  return <NatureScene types={types} backgroundVariant={variant === 'campfire' ? 'campfire' : undefined} active={active} subscribeEvents={subscribeEvents} fill />;
};
