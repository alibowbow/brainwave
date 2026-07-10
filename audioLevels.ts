import type { BackgroundSoundType } from './types';

export interface MixVolumes {
  master: number;
  binaural: number;
  bg: number;
}

export const DEFAULT_MIX_VOLUMES: MixVolumes = {
  master: 0.72,
  binaural: 0.45,
  bg: 0.76,
};

export const MIX_PROFILES: { id: string; label: string; description: string; volumes: MixVolumes }[] = [
  {
    id: 'soft',
    label: '편안',
    description: '잠들기 전처럼 낮고 부드럽게',
    volumes: { master: 0.58, binaural: 0.36, bg: 0.62 },
  },
  {
    id: 'balanced',
    label: '균형',
    description: '자연음과 뇌파음을 편안하게 균형',
    volumes: DEFAULT_MIX_VOLUMES,
  },
  {
    id: 'nature',
    label: '자연음 강조',
    description: '자연음을 앞에 두고 뇌파음은 은은하게',
    volumes: { master: 0.76, binaural: 0.32, bg: 0.9 },
  },
];

export const MAX_LAYER_VOLUME = 1.2;

// Source calibration is separate from the user's fader. Continuous procedural
// generators differ widely in raw RMS, so these conservative trims bring the
// beds closer together without undoing the recently hand-tuned creature calls.
const NATURE_SOURCE_TRIM: Partial<Record<BackgroundSoundType, number>> = {
  rain: 0.9,
  thunder: 0.75,
  stream: 1.8,
  waterfall: 0.95,
  wave: 0.8,
  fire: 0.65,
  forest: 0.55,
  cave: 0.9,
  night: 0.9,
  drone: 0.65,
  blizzard: 0.65,
  fan: 1.1,
  white: 2,
  pink: 1.7,
  // v3.8.0 sounds, trimmed from offline-render RMS measurements.
  tent: 0.95,
  window: 0.9,
  eaves: 1.0,
  dthunder: 0.8,
  valley: 0.9,
  pebbles: 1.1,
  deepsea: 0.8,
  bubbles: 1.1,
  bamboo: 0.75,
  temple: 1.0,
  scops: 1.0,
  heartbeat: 1.0,
  brown: 1.0,
};

export const TONE_MODE_TRIM = {
  binaural: 0.45,
  isochronic: 0.65,
} as const;

const DEFAULT_SOUND_LEVELS: Partial<Record<BackgroundSoundType, number>> = {
  rain: 0.72,
  thunder: 0.72,
  stream: 0.62,
  waterfall: 0.68,
  wave: 0.72,
  fire: 0.68,
  forest: 0.65,
  birds: 0.65,
  cuckoo: 0.62,
  woodpecker: 0.58,
  ducks: 0.58,
  cicadas: 0.58,
  frogs: 0.62,
  owl: 0.62,
  night: 0.62,
  cave: 0.68,
  chimes: 0.58,
  bowl: 0.6,
  drone: 0.62,
  blizzard: 0.64,
  seabirds: 0.58,
  fan: 0.6,
  white: 0.48,
  pink: 0.52,
  tent: 0.72,
  window: 0.72,
  eaves: 0.7,
  dthunder: 0.66,
  valley: 0.68,
  pebbles: 0.7,
  deepsea: 0.68,
  bubbles: 0.62,
  bamboo: 0.65,
  temple: 0.66,
  scops: 0.62,
  heartbeat: 0.7,
  brown: 0.5,
};

export const clampUnit = (value: number) => Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));

export const clampLayerVolume = (value: number) =>
  Math.max(0, Math.min(MAX_LAYER_VOLUME, Number.isFinite(value) ? value : 0));

// UI sliders represent perceived level. A gentle power curve gives the lower
// half enough resolution while still reaching unity gain at 100%.
export const levelToGain = (level: number) => Math.pow(clampUnit(level), 1.6);

// Adding layers should enrich a scene, not multiply its loudness. This mild
// equal-power compensation keeps two-to-five layer presets out of the limiter
// while preserving the relative positions of the individual faders.
export const natureMixCompensation = (layerCount: number) => {
  const count = Math.max(1, Math.floor(Number.isFinite(layerCount) ? layerCount : 1));
  return 1 / Math.sqrt(1 + (count - 1) * 0.35);
};

export const countAudibleLayers = (levels: readonly number[]) =>
  levels.reduce((count, level) => count + (Number.isFinite(level) && level > 0.001 ? 1 : 0), 0);

export const natureBusGain = (level: number, layerCount: number) =>
  levelToGain(level) * 0.6 * natureMixCompensation(layerCount);

export const layerGain = (type: BackgroundSoundType, level: number) =>
  Math.min(2.5, clampLayerVolume(level) * (NATURE_SOURCE_TRIM[type] ?? 1));

export const defaultSoundLevel = (type: BackgroundSoundType) =>
  type === 'none' ? 0 : (DEFAULT_SOUND_LEVELS[type] ?? 0.65);

const validLevel = (value: unknown, fallback: number) =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

export const normalizeMixVolumes = (value?: Partial<MixVolumes> | null): MixVolumes => ({
  master: clampUnit(validLevel(value?.master, DEFAULT_MIX_VOLUMES.master)),
  binaural: clampUnit(validLevel(value?.binaural, DEFAULT_MIX_VOLUMES.binaural)),
  bg: clampUnit(validLevel(value?.bg, DEFAULT_MIX_VOLUMES.bg)),
});
