import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import type { BinauralEngine, SoundLayer, SoundPlaybackSnapshot } from '../../services/audioEngine';
import { loadImmersiveSessionBridge } from '../../services/immersiveBridgeLoader';
import { isProtectedWorldId, isWorldId } from './worldCatalog';

type Holder = 'player' | 'immersive' | 'nature';
interface State {
  engine: BinauralEngine;
  worldId: string | undefined;
  holder: Holder | null;
  playing: boolean;
  pending: boolean;
  layers: readonly SoundLayer[];
  master: number;
  nature: number;
}

/** The UI owns scene/holder eligibility; the engine owns the graph and gate. */
export function useImmersiveAudioBridge(state: State) {
  const current = useRef(state);
  current.current = state;
  const blocked = useRef(true);
  const loaded = useRef<Awaited<ReturnType<typeof loadImmersiveSessionBridge>> | null>(null);
  const previousPlayback = useRef<SoundPlaybackSnapshot>({});
  const positionKey = useRef('');
  const publish = useCallback(() => {
    const s = current.current;
    const profile = loaded.current?.resolveImmersiveAudioProfile(s.worldId);
    const playback = s.engine.getPlaybackStates();
    if (Object.entries(previousPlayback.current).some(([type, value]) => value === 'playing' && playback[type as keyof SoundPlaybackSnapshot] !== 'playing')) {
      s.engine.releaseImmersiveAccents();
    }
    previousPlayback.current = playback;
    const audible = s.layers.some(l => !l.muted && Number.isFinite(l.volume) && l.volume > 0 && playback[l.type] === 'playing');
    s.engine.setImmersiveAccentState({
      active: !blocked.current && !s.pending && !!profile && !!s.holder && s.playing && !document.hidden,
      muted: !Number.isFinite(s.master) || s.master <= 0 || !Number.isFinite(s.nature) || s.nature <= 0 || !audible,
      gateOpen: s.playing && s.engine.isPlaybackReady(),
    });
    const key = !s.pending && s.holder && s.playing && s.engine.isPlaybackReady() ? `${profile?.id ?? ''}:${Object.keys(playback).sort().join(',')}` : '';
    if (key !== positionKey.current) {
      if (key && (profile || positionKey.current)) s.engine.setScenePositions({ ...loaded.current?.resolveScenePositions(s.worldId) });
      positionKey.current = key;
    }
  }, []);
  const invalidate = useCallback(() => {
    blocked.current = true;
    current.current.engine.pauseImmersiveAccents();
  }, []);

  useLayoutEffect(() => {
    blocked.current = false;
    publish();
  });
  useEffect(() => {
    let cancelled = false;
    const id = state.worldId;
    if (isWorldId(id) && !isProtectedWorldId(id) && state.holder) {
      void loadImmersiveSessionBridge().then(bridge => {
        if (cancelled) return;
        loaded.current = bridge;
        state.engine.setImmersiveAccentFactory(bridge.createSceneAccentController);
        publish();
      }).catch(() => { /* optional accents stay closed; a later selection retries */ });
    }
    return () => { cancelled = true; state.engine.pauseImmersiveAccents(); };
  }, [state.engine, state.holder, state.worldId, publish]);
  useEffect(() => {
    const unsubscribe = state.engine.onPlaybackState(publish);
    const visibility = () => { if (document.hidden) state.engine.pauseImmersiveAccents(); publish(); };
    document.addEventListener('visibilitychange', visibility);
    return () => {
      unsubscribe();
      document.removeEventListener('visibilitychange', visibility);
      state.engine.pauseImmersiveAccents();
    };
  }, [state.engine, publish]);

  const interaction = useCallback((holder: Holder, id: string, event: unknown) => {
    const s = current.current;
    if (blocked.current || s.pending || s.holder !== holder || s.worldId !== id || !s.playing || document.hidden || !s.engine.isPlaybackReady()) return;
    const request = loaded.current?.worldAccentRequest(id, event, s.layers, s.engine.getPlaybackStates());
    if (request) s.engine.triggerImmersiveAccent(request);
  }, []);
  const onPlayerInteraction = useCallback((id: string, event: unknown) => interaction('player', id, event), [interaction]);
  const onImmersiveInteraction = useCallback((id: string, event: unknown) => interaction('immersive', id, event), [interaction]);
  const onNatureInteraction = useCallback((id: string, event: unknown) => interaction('nature', id, event), [interaction]);
  return { invalidate, onPlayerInteraction, onImmersiveInteraction, onNatureInteraction };
}
