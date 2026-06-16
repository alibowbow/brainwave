import React from 'react';
import {
  CloudRain, CloudLightning, Droplets, Waves, Flame, Wind, Bird, CloudMoon,
  Bell, Disc3, Orbit, Fan, Activity, AudioLines, Volume1,
} from 'lucide-react';
import { BackgroundSoundType, BrainWaveType } from './types';

// Display order of the selectable background sounds (shared by the config and player UIs).
export const SOUND_ORDER: BackgroundSoundType[] = [
  'none', 'rain', 'thunder', 'stream', 'wave', 'fire', 'forest',
  'birds', 'night', 'chimes', 'bowl', 'drone', 'fan', 'white', 'pink',
];

// Display order of the selectable brain waves.
export const WAVE_ORDER: BrainWaveType[] = ['alpha', 'beta', 'theta', 'delta'];

export const getSoundIcon = (type: BackgroundSoundType) => {
  switch (type) {
    case 'rain': return <CloudRain size={20} />;
    case 'thunder': return <CloudLightning size={20} />;
    case 'stream': return <Droplets size={20} />;
    case 'wave': return <Waves size={20} />;
    case 'fire': return <Flame size={20} />;
    case 'forest': return <Wind size={20} />;
    case 'birds': return <Bird size={20} />;
    case 'night': return <CloudMoon size={20} />;
    case 'chimes': return <Bell size={20} />;
    case 'bowl': return <Disc3 size={20} />;
    case 'drone': return <Orbit size={20} />;
    case 'fan': return <Fan size={20} />;
    case 'white': return <Activity size={20} />;
    case 'pink': return <AudioLines size={20} />;
    case 'none': return <Volume1 size={20} />;
  }
};

export const getSoundLabel = (type: BackgroundSoundType) => {
  switch (type) {
    case 'none': return '없음';
    case 'rain': return '빗소리';
    case 'thunder': return '뇌우';
    case 'stream': return '시냇물';
    case 'wave': return '파도';
    case 'fire': return '모닥불';
    case 'forest': return '숲바람';
    case 'birds': return '새소리';
    case 'night': return '밤 벌레';
    case 'chimes': return '풍경';
    case 'bowl': return '싱잉볼';
    case 'drone': return '딥 드론';
    case 'fan': return '선풍기';
    case 'white': return '백색소음';
    case 'pink': return '핑크 노이즈';
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
