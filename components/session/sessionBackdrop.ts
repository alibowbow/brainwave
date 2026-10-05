import type { BackgroundSoundType } from '../../types';
import { worldIdForSession } from '../immersiveWorlds/worldCatalog';

/** Backdrops a session can show instead of an illustrated nature scene. */
export type SessionBackdropVariant = 'campfire' | 'rainy-window' | 'oil-sea';

/**
 * The deep-focus routine plays in front of the rainy night window, the ocean
 * shore in front of a sea painted in oils. Resuming either routine from
 * "last session" keeps the same place.
 */
export function sessionBackdropFor(preset: { id: string; name: string; worldId?: unknown } | null | undefined): SessionBackdropVariant | undefined {
  if (!preset) return undefined;
  const worldId = worldIdForSession(preset);
  if (worldId === 'focus') return 'rainy-window';
  if (worldId === 'amb:ocean_shore') return 'oil-sea';
  if (preset.id === 'relax' || preset.id === 'amb:campfire_night') return 'campfire';
  return undefined;
}

const RAIN_SOUNDS: ReadonlySet<BackgroundSoundType> = new Set<BackgroundSoundType>(['rain', 'window', 'eaves', 'tent', 'thunder']);

/**
 * How hard it rains on the glass follows the rain the listener hears. With no
 * rain layer the pane stays wet and only the odd drop still arrives.
 */
export function rainIntensityFor(layers: ReadonlyArray<{ type: BackgroundSoundType; volume: number; muted?: boolean }>): number {
  let loudest = -1;
  for (const layer of layers) {
    if (!RAIN_SOUNDS.has(layer.type)) continue;
    loudest = Math.max(loudest, layer.muted ? 0 : layer.volume);
  }
  if (loudest < 0) return 0.18;
  return Math.round((0.35 + 0.8 * Math.min(1, Math.max(0, loudest))) * 100) / 100;
}

/**
 * The painted surf breaks as hard as the waves the listener hears: louder
 * waves, more foam. With the wave layer muted or absent the sea stays calm.
 */
export function waveEnergyFor(layers: ReadonlyArray<{ type: BackgroundSoundType; volume: number; muted?: boolean }>): number {
  const wave = layers.find((layer) => layer.type === 'wave');
  if (!wave || wave.muted) return 0.2;
  return Math.round((0.4 + 0.9 * Math.min(1, Math.max(0, wave.volume))) * 100) / 100;
}
