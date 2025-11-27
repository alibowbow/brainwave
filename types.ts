export type BrainWaveType = 'alpha' | 'beta' | 'theta' | 'delta';
export type BackgroundSoundType = 'none' | 'rain' | 'wave' | 'forest' | 'white' | 'birds' | 'night' | 'fire';

export interface SessionPreset {
  id: string;
  name: string;
  description: string;
  defaultDurationMinutes: number;
  brainWaveType: BrainWaveType;
  defaultBackgroundSound: BackgroundSoundType;
  baseFreq: number; 
  beatFreq: number; 
}

export interface SessionLog {
  id: string;
  modeId: string;
  modeName: string;
  startedAt: string;
  durationMinutes: number;
  moodBefore: number; 
  moodAfter: number; 
  helpfulScore: number; 
  note?: string;
}

export interface AppSettings {
  darkMode: boolean;
  defaultSessionDuration: number;
  showSoundNotice: boolean;
}

export interface AiSessionSuggestion {
  name: string;
  description: string;
  durationMinutes: number;
  brainWaveType: BrainWaveType;
  backgroundSound: BackgroundSoundType;
  guidance: string;
}

export const WAVE_FREQS = {
    alpha: { base: 200, beat: 10 },
    beta: { base: 250, beat: 20 },
    theta: { base: 150, beat: 6 },
    delta: { base: 190, beat: 2.5 }
};

// Helper for Korean Labels
export const getBrainWaveLabel = (type: BrainWaveType) => {
  switch(type) {
    case 'alpha': return '알파파 (집중/안정)';
    case 'beta': return '베타파 (각성/활동)';
    case 'theta': return '세타파 (이완/명상)';
    case 'delta': return '델타파 (숙면/회복)';
    default: return type;
  }
};

export const PRESETS: SessionPreset[] = [
  { id: 'focus', name: '깊은 집중 (Focus)', description: '학습 및 업무 효율을 높여주는 집중 모드', defaultDurationMinutes: 40, brainWaveType: 'alpha', defaultBackgroundSound: 'rain', baseFreq: 200, beatFreq: 10 },
  { id: 'relax', name: '불멍 힐링 (Relax)', description: '따뜻한 장작불 소리와 함께하는 휴식', defaultDurationMinutes: 20, brainWaveType: 'theta', defaultBackgroundSound: 'fire', baseFreq: 150, beatFreq: 6 },
  { id: 'country_morning', name: '상쾌한 아침 (Morning)', description: '새소리와 함께 활기찬 하루 시작', defaultDurationMinutes: 25, brainWaveType: 'alpha', defaultBackgroundSound: 'birds', baseFreq: 180, beatFreq: 9 },
  { id: 'sleep_prep', name: '숙면 준비 (Sleep)', description: '깊은 잠을 유도하는 델타파 세션', defaultDurationMinutes: 30, brainWaveType: 'delta', defaultBackgroundSound: 'night', baseFreq: 190, beatFreq: 2.5 },
  { id: 'power_nap', name: '파워 냅 (Nap)', description: '짧고 개운하게 피로를 푸는 낮잠', defaultDurationMinutes: 15, brainWaveType: 'theta', defaultBackgroundSound: 'forest', baseFreq: 140, beatFreq: 5 },
  { id: 'meditation', name: '마음 챙김 (Meditation)', description: '내면의 평화를 찾는 명상 시간', defaultDurationMinutes: 25, brainWaveType: 'alpha', defaultBackgroundSound: 'none', baseFreq: 180, beatFreq: 8 },
];