export type BrainWaveType = 'alpha' | 'beta' | 'gamma' | 'theta' | 'delta';
export type BackgroundSoundType =
  | 'none'
  | 'rain'
  | 'thunder'
  | 'stream'
  | 'waterfall'
  | 'wave'
  | 'fire'
  | 'forest'
  | 'birds'
  | 'cuckoo'
  | 'woodpecker'
  | 'ducks'
  | 'cicadas'
  | 'frogs'
  | 'owl'
  | 'night'
  | 'cave'
  | 'chimes'
  | 'bowl'
  | 'drone'
  | 'blizzard'
  | 'seabirds'
  | 'fan'
  | 'white'
  | 'pink';

export interface SessionPreset {
  id: string;
  name: string;
  description: string;
  defaultDurationMinutes: number;
  brainWaveType: BrainWaveType;
  defaultBackgroundSound: BackgroundSoundType;
}

export interface SessionLog {
  id: string;
  modeId: string;
  modeName: string;
  startedAt: string;
  durationMinutes: number;
  moodBefore: number | null;
  moodAfter: number;
  helpfulScore: number;
  note?: string;
}

export interface AppSettings {
  darkMode: boolean;
  showSoundNotice: boolean;
}

export const WAVE_FREQS = {
  alpha: { base: 200, beat: 10 },
  beta: { base: 250, beat: 20 },
  gamma: { base: 220, beat: 40 },
  theta: { base: 150, beat: 6 },
  delta: { base: 190, beat: 2.5 },
};

export const getBrainWaveLabel = (type: BrainWaveType) => {
  switch (type) {
    case 'alpha': return '알파파 (집중/안정)';
    case 'beta': return '베타파 (각성/활동)';
    case 'gamma': return '감마파 (몰입/각성)';
    case 'theta': return '세타파 (이완/명상)';
    case 'delta': return '델타파 (수면/회복)';
    default: return type;
  }
};

export const PRESETS: SessionPreset[] = [
  { id: 'focus', name: '깊은 집중 (Focus)', description: '학습 및 업무 효율을 높여주는 집중 모드', defaultDurationMinutes: 40, brainWaveType: 'alpha', defaultBackgroundSound: 'rain' },
  { id: 'relax', name: '불멍 힐링 (Relax)', description: '따뜻한 장작불 소리와 함께하는 휴식', defaultDurationMinutes: 20, brainWaveType: 'theta', defaultBackgroundSound: 'fire' },
  { id: 'country_morning', name: '상쾌한 아침 (Morning)', description: '새소리와 함께 활기찬 하루 시작', defaultDurationMinutes: 25, brainWaveType: 'alpha', defaultBackgroundSound: 'birds' },
  { id: 'sleep_prep', name: '수면 준비 (Sleep)', description: '깊은 잠을 유도하는 델타파 세션', defaultDurationMinutes: 30, brainWaveType: 'delta', defaultBackgroundSound: 'night' },
  { id: 'power_nap', name: '파워 냅 (Nap)', description: '짧고 가볍게 피로를 푸는 낮잠', defaultDurationMinutes: 15, brainWaveType: 'theta', defaultBackgroundSound: 'forest' },
  { id: 'meditation', name: '마음 챙김 (Meditation)', description: '내면의 평화를 찾는 명상 시간', defaultDurationMinutes: 25, brainWaveType: 'alpha', defaultBackgroundSound: 'none' },
];

// Curated multi-sound "ambience" combos — one tap sets several layers + a
// matching brain wave, and the diorama composes into a coherent scene.
export interface AmbiencePreset {
  id: string;
  name: string;
  description: string;
  emoji: string;
  brainWaveType: BrainWaveType;
  durationMinutes: number;
  layers: { type: BackgroundSoundType; volume: number }[];
}

export const AMBIENCE_PRESETS: AmbiencePreset[] = [
  { id: 'morning_forest', name: '아침 숲', description: '햇살 드는 숲, 시냇물과 새소리', emoji: '🌤️', brainWaveType: 'alpha', durationMinutes: 30,
    layers: [{ type: 'birds', volume: 0.7 }, { type: 'forest', volume: 0.8 }, { type: 'stream', volume: 0.55 }] },
  { id: 'rainy_forest', name: '비 오는 숲', description: '숲에 내리는 잔잔한 비', emoji: '🌧️', brainWaveType: 'theta', durationMinutes: 30,
    layers: [{ type: 'rain', volume: 0.8 }, { type: 'forest', volume: 0.7 }, { type: 'birds', volume: 0.45 }] },
  { id: 'night_pond', name: '여름밤 연못', description: '풀벌레·개구리·부엉이의 밤', emoji: '🌙', brainWaveType: 'delta', durationMinutes: 40,
    layers: [{ type: 'night', volume: 0.7 }, { type: 'frogs', volume: 0.55 }, { type: 'owl', volume: 0.5 }, { type: 'stream', volume: 0.55 }] },
  { id: 'ocean_shore', name: '파도 해변', description: '바다와 갈매기', emoji: '🌊', brainWaveType: 'alpha', durationMinutes: 25,
    layers: [{ type: 'wave', volume: 0.8 }, { type: 'seabirds', volume: 0.5 }] },
  { id: 'waterfall_valley', name: '폭포 계곡', description: '절벽 폭포와 시냇물', emoji: '🏞️', brainWaveType: 'alpha', durationMinutes: 30,
    layers: [{ type: 'waterfall', volume: 0.8 }, { type: 'stream', volume: 0.6 }, { type: 'birds', volume: 0.45 }] },
  { id: 'campfire_night', name: '모닥불 밤', description: '별밤의 모닥불과 풀벌레', emoji: '🔥', brainWaveType: 'theta', durationMinutes: 25,
    layers: [{ type: 'fire', volume: 0.8 }, { type: 'night', volume: 0.55 }, { type: 'owl', volume: 0.45 }] },
  { id: 'deep_night', name: '깊은 밤', description: '풀벌레와 낮은 드론의 심야', emoji: '🌌', brainWaveType: 'delta', durationMinutes: 45,
    layers: [{ type: 'night', volume: 0.55 }, { type: 'owl', volume: 0.45 }, { type: 'drone', volume: 0.7 }] },
  { id: 'snowy_night', name: '눈 내리는 밤', description: '포근한 겨울밤의 눈', emoji: '❄️', brainWaveType: 'delta', durationMinutes: 40,
    layers: [{ type: 'blizzard', volume: 0.65 }, { type: 'drone', volume: 0.6 }] },
  { id: 'summer_storm', name: '여름 뇌우', description: '천둥과 빗속의 몰입', emoji: '⛈️', brainWaveType: 'theta', durationMinutes: 30,
    layers: [{ type: 'thunder', volume: 0.8 }, { type: 'forest', volume: 0.5 }] },
  { id: 'cosmic', name: '우주 명상', description: '드론·싱잉볼·풍경의 명상', emoji: '🧘', brainWaveType: 'theta', durationMinutes: 20,
    layers: [{ type: 'drone', volume: 0.7 }, { type: 'bowl', volume: 0.6 }, { type: 'chimes', volume: 0.5 }] },
  { id: 'focus_cafe', name: '카페 집중', description: '비 오는 창가의 백색소음', emoji: '☕', brainWaveType: 'alpha', durationMinutes: 40,
    layers: [{ type: 'pink', volume: 0.5 }, { type: 'rain', volume: 0.6 }] },
  { id: 'deep_forest', name: '깊은 숲', description: '뻐꾸기와 딱따구리의 오지 숲', emoji: '🌲', brainWaveType: 'alpha', durationMinutes: 35,
    layers: [{ type: 'forest', volume: 0.7 }, { type: 'cuckoo', volume: 0.55 }, { type: 'woodpecker', volume: 0.5 }, { type: 'stream', volume: 0.4 }] },
  { id: 'cave_meditation', name: '동굴 명상', description: '울리는 물방울과 고요한 공명', emoji: '🦇', brainWaveType: 'theta', durationMinutes: 25,
    layers: [{ type: 'cave', volume: 0.75 }, { type: 'bowl', volume: 0.5 }, { type: 'drone', volume: 0.45 }] },
];
