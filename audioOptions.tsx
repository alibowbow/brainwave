import React from 'react';
import {
  CloudRain, CloudLightning, Droplets, Mountain, Waves, Flame, Wind, Bird, Bug, Turtle,
  Feather, CloudMoon, Bell, Disc3, Orbit, Snowflake, Sailboat, Fan, Activity, AudioLines, Volume1,
  Sunrise, Hammer, Egg, Gem,
} from 'lucide-react';
import { BackgroundSoundType, BrainWaveType } from './types';

// Sounds grouped by scene — drives the categorized picker UI.
export const SOUND_GROUPS: { label: string; sounds: BackgroundSoundType[] }[] = [
  { label: '물 · 비', sounds: ['rain', 'thunder', 'stream', 'waterfall', 'wave'] },
  { label: '새', sounds: ['birds', 'cuckoo', 'woodpecker', 'seabirds', 'owl'] },
  { label: '숲 · 생물', sounds: ['forest', 'cicadas', 'frogs', 'ducks', 'night'] },
  { label: '공간 · 명상', sounds: ['fire', 'chimes', 'bowl', 'drone', 'cave'] },
  { label: '바람 · 노이즈', sounds: ['blizzard', 'fan', 'white', 'pink'] },
];

// Flat display order (selectable sounds; 'none' is handled by the picker itself).
export const SOUND_ORDER: BackgroundSoundType[] = ['none', ...SOUND_GROUPS.flatMap((g) => g.sounds)];

// Display order of the selectable brain waves.
export const WAVE_ORDER: BrainWaveType[] = ['alpha', 'beta', 'gamma', 'theta', 'delta'];

export const getSoundIcon = (type: BackgroundSoundType) => {
  switch (type) {
    case 'rain': return <CloudRain size={20} />;
    case 'thunder': return <CloudLightning size={20} />;
    case 'stream': return <Droplets size={20} />;
    case 'waterfall': return <Mountain size={20} />;
    case 'wave': return <Waves size={20} />;
    case 'fire': return <Flame size={20} />;
    case 'forest': return <Wind size={20} />;
    case 'birds': return <Bird size={20} />;
    case 'cuckoo': return <Sunrise size={20} />;
    case 'woodpecker': return <Hammer size={20} />;
    case 'ducks': return <Egg size={20} />;
    case 'cave': return <Gem size={20} />;
    case 'cicadas': return <Bug size={20} />;
    case 'frogs': return <Turtle size={20} />;
    case 'owl': return <Feather size={20} />;
    case 'night': return <CloudMoon size={20} />;
    case 'chimes': return <Bell size={20} />;
    case 'bowl': return <Disc3 size={20} />;
    case 'drone': return <Orbit size={20} />;
    case 'blizzard': return <Snowflake size={20} />;
    case 'seabirds': return <Sailboat size={20} />;
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
    case 'waterfall': return '폭포';
    case 'wave': return '파도';
    case 'fire': return '모닥불';
    case 'forest': return '숲바람';
    case 'birds': return '새소리';
    case 'cuckoo': return '뻐꾸기';
    case 'woodpecker': return '딱따구리';
    case 'ducks': return '오리';
    case 'cave': return '동굴';
    case 'cicadas': return '매미';
    case 'frogs': return '개구리';
    case 'owl': return '부엉이';
    case 'night': return '밤 벌레';
    case 'chimes': return '풍경';
    case 'bowl': return '싱잉볼';
    case 'drone': return '딥 드론';
    case 'blizzard': return '겨울바람';
    case 'seabirds': return '바닷새';
    case 'fan': return '선풍기';
    case 'white': return '백색소음';
    case 'pink': return '핑크';
    default: return type;
  }
};

const WAVE_SHORT: Record<BrainWaveType, string> = {
  alpha: '알파',
  beta: '베타',
  gamma: '감마',
  theta: '세타',
  delta: '델타',
};

export const getWaveShortLabel = (type: BrainWaveType) => WAVE_SHORT[type];

// Energy-aura color per brain wave (drives the live visualizer).
const WAVE_COLOR: Record<BrainWaveType, string> = {
  alpha: '#6366f1', // indigo — focus/calm
  beta: '#0ea5e9',  // sky — alert/active
  gamma: '#f5a524',  // gold — the "awakened" state
  theta: '#8b5cf6', // violet — relaxed/meditative
  delta: '#3b82f6', // blue — deep sleep
};

export const getWaveColor = (type: BrainWaveType) => WAVE_COLOR[type];
