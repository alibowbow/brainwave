import type { BackgroundSoundType } from '../../types';
import { resolveImmersiveAudioProfile } from './profiles';
import type { AccentRequest } from './types';

/** Consumer-owned translation boundary. Never pass world coordinates or PointerEvents. */
export interface NormalizedWorldTouch {
  phase: 'tap';
  /** Scene-specific canonical kind explicitly allowlisted by its audio profile. */
  kind: string;
  /** Projected, normalized screen coordinate, 0..1. */
  screenX: number;
  /** Unit interval, independent from raw pressure/velocity or world positions. */
  intensity: number;
}

export interface InteractionLayerState {
  type: BackgroundSoundType;
  volume: number;
  muted?: boolean;
}

/** No side effects. Unknown scenes/kinds, drag/cancel, absent/muted sources fail closed. */
export function normalizeWorldTouch(
  sceneId: unknown,
  event: unknown,
  layers: readonly InteractionLayerState[],
): AccentRequest | null {
  const profile = resolveImmersiveAudioProfile(sceneId);
  if (!profile || !event || typeof event !== 'object' || !Array.isArray(layers)) return null;
  const value = event as Partial<NormalizedWorldTouch>;
  if (value.phase !== 'tap' || typeof value.kind !== 'string' ||
      typeof value.screenX !== 'number' || !Number.isFinite(value.screenX) || value.screenX < 0 || value.screenX > 1 ||
      typeof value.intensity !== 'number' || !Number.isFinite(value.intensity) || value.intensity <= 0 || value.intensity > 1) return null;
  if (!Object.hasOwn(profile.interactions, value.kind)) return null;
  const rule = profile.interactions[value.kind];
  // Duplicated sources are ambiguous state, so do not bypass a muted copy.
  const matches = layers.filter((layer) => layer && layer.type === rule.source);
  if (matches.length !== 1) return null;
  const layer = matches[0];
  if ((layer.muted !== undefined && layer.muted !== false) || typeof layer.volume !== 'number' ||
      !Number.isFinite(layer.volume) || layer.volume <= 0) return null;
  return {
    kind: rule.accent,
    intensity: Math.min(1, layer.volume) * value.intensity * rule.intensity,
    // Long resonances stay at the scene anchor; nearby touches follow the hit point.
    pan: rule.accent === 'soft-resonance' ? rule.pan : Math.max(-0.6, Math.min(0.6, (value.screenX - 0.5) * 1.3)),
  };
}
