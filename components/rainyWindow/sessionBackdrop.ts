import { PRESETS, type BackgroundSoundType } from '../../types';

/** Backdrops a session can show instead of an illustrated nature scene. */
export type SessionBackdropVariant = 'campfire' | 'rainy-window';

const FOCUS_PRESET = PRESETS.find((preset) => preset.id === 'focus');

/**
 * The deep-focus routine plays in front of the rainy night window. Resuming
 * that routine from "last session" keeps the same place.
 */
export function sessionBackdropFor(preset: { id: string; name: string } | null | undefined): SessionBackdropVariant | undefined {
  if (!preset) return undefined;
  if (preset.id === 'focus' || (preset.id === 'last' && preset.name === FOCUS_PRESET?.name)) return 'rainy-window';
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
