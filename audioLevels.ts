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
// generators and short animal calls have very different crest factors, so these
// trims are calibrated from real Web Audio analyser measurements rather than
// from oscillator gain values alone.
const NATURE_SOURCE_TRIM: Partial<Record<BackgroundSoundType, number>> = {
  rain: 0.9,
  thunder: 0.75,
  stream: 1.35,
  waterfall: 0.95,
  wave: 0.9,
  fire: 0.65,
  forest: 0.55,
  birds: 0.82,
  cuckoo: 1.15,
  woodpecker: 1,
  ducks: 1.2,
  cicadas: 1.25,
  frogs: 0.9,
  owl: 0.5,
  cave: 1.05,
  night: 1.45,
  chimes: 1.5,
  bowl: 1.15,
  drone: 0.65,
  blizzard: 0.65,
  seabirds: 0.72,
  fan: 1.1,
  white: 2.4,
  pink: 2,
  // v3.8.0 sounds, trimmed from offline-render RMS measurements.
  tent: 1,
  window: 0.9,
  eaves: 1.1,
  dthunder: 0.8,
  pebbles: 1.2,
  deepsea: 0.8,
  bamboo: 0.9,
  temple: 1.0,
  scops: 1.25,
  heartbeat: 1.05,
  brown: 1.2,
};

// A sparse owl or chime must not duck a steady rain bed as much as another
// continuous noise bed would. The weights represent average acoustic load, not
// the raw number of enabled layers.
const NATURE_MIX_WEIGHT: Partial<Record<BackgroundSoundType, number>> = {
  birds: 0.34,
  cuckoo: 0.3,
  woodpecker: 0.32,
  ducks: 0.38,
  frogs: 0.42,
  owl: 0.3,
  scops: 0.42,
  chimes: 0.35,
  bowl: 0.45,
  seabirds: 0.34,
  heartbeat: 0.55,
  night: 0.6,
  cicadas: 0.7,
  dthunder: 0.75,
  temple: 0.7,
};

export const TONE_MODE_TRIM = {
  binaural: 0.45,
  isochronic: 0.65,
} as const;

const DEFAULT_SOUND_LEVELS: Partial<Record<BackgroundSoundType, number>> = {
  rain: 0.72,
  thunder: 0.72,
  stream: 0.68,
  waterfall: 0.68,
  wave: 0.75,
  fire: 0.68,
  forest: 0.65,
  birds: 0.68,
  cuckoo: 0.66,
  woodpecker: 0.62,
  ducks: 0.66,
  cicadas: 0.64,
  frogs: 0.7,
  owl: 0.68,
  night: 0.66,
  cave: 0.7,
  chimes: 0.68,
  bowl: 0.64,
  drone: 0.62,
  blizzard: 0.64,
  seabirds: 0.68,
  fan: 0.6,
  white: 0.56,
  pink: 0.58,
  tent: 0.76,
  window: 0.72,
  eaves: 0.7,
  dthunder: 0.66,
  pebbles: 0.7,
  deepsea: 0.68,
  bamboo: 0.68,
  temple: 0.66,
  scops: 0.62,
  heartbeat: 0.72,
  brown: 0.58,
};

export const clampUnit = (value: number) => Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));

export const clampLayerVolume = (value: number) =>
  Math.max(0, Math.min(MAX_LAYER_VOLUME, Number.isFinite(value) ? value : 0));

// UI sliders represent perceived level. A gentle power curve gives the lower
// half enough resolution while still reaching unity gain at 100%.
export const levelToGain = (level: number) => Math.pow(clampUnit(level), 1.45);

// Adding layers should enrich a scene, not multiply its loudness. This mild
// equal-power compensation uses role-weighted load to keep presets out of the
// limiter while preserving the relative positions of individual faders.
export const natureMixCompensation = (mixLoad: number) => {
  const load = Math.max(1, Number.isFinite(mixLoad) ? mixLoad : 1);
  return 1 / Math.sqrt(1 + (load - 1) * 0.3);
};

export const natureMixLoad = (layers: readonly { type: BackgroundSoundType; volume: number }[]) =>
  Math.max(
    1,
    layers.reduce(
      (load, layer) =>
        load + (Number.isFinite(layer.volume) && layer.volume > 0.001 ? (NATURE_MIX_WEIGHT[layer.type] ?? 1) : 0),
      0,
    ),
  );

export const natureBusGain = (level: number, mixLoad: number) =>
  levelToGain(level) * 0.72 * natureMixCompensation(mixLoad);

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
