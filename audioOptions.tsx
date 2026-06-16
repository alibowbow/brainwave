import React from 'react';
import { CloudRain, Wind, Sun, Activity, Bird, CloudMoon, Flame, Volume1 } from 'lucide-react';
import { BackgroundSoundType, BrainWaveType } from './types';

// Display order of the selectable background sounds (shared by the config and player UIs).
export const SOUND_ORDER: BackgroundSoundType[] = ['none', 'rain', 'fire', 'birds', 'night', 'wave', 'forest', 'white'];

// Display order of the selectable brain waves.
export const WAVE_ORDER: BrainWaveType[] = ['alpha', 'beta', 'theta', 'delta'];

export const getSoundIcon = (type: BackgroundSoundType) => {
  switch (type) {
    case 'rain': return <CloudRain size={20} />;
    case 'wave': return <Wind size={20} />;
    case 'forest': return <Sun size={20} />;
    case 'white': return <Activity size={20} />;
    case 'birds': return <Bird size={20} />;
    case 'night': return <CloudMoon size={20} />;
    case 'fire': return <Flame size={20} />;
    case 'none': return <Volume1 size={20} />;
  }
};

export const getSoundLabel = (type: BackgroundSoundType) => {
  switch (type) {
    case 'none': return '없음';
    case 'white': return '백색소음';
    case 'rain': return '빗소리';
    case 'wave': return '파도';
    case 'forest': return '숲바람';
    case 'birds': return '새소리';
    case 'night': return '밤 벌레';
    case 'fire': return '모닥불';
    default: return type;
  }
};

const WAVE_SHORT: Record<BrainWaveType, string> = {
  alpha: '알파',
  beta: '베타',
  theta: '세타',
  delta: '델타',
};

export const getWaveShortLabel = (type: BrainWaveType) => WAVE_SHORT[type];
