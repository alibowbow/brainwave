import React from 'react';
import {
  CloudRain, CloudLightning, Droplets, Mountain, Waves, Flame, Wind, Bird, 
  Feather, CloudMoon, Bell, Disc3, Orbit, Snowflake, Sailboat, Fan, Activity, AudioLines, Volume1,
  Sunrise, Hammer, Egg, Gem, Tent, Blinds, Droplet, Zap, HeartPulse, AudioWaveform, Sprout,
  Landmark, Shell, Fish, MoonStar,
} from 'lucide-react';
import { BackgroundSoundType, BrainWaveType } from './types';

// Sounds grouped into the six soundscape categories — drives the picker UI
// and the recommendation logic.
export const SOUND_GROUPS: { label: string; sounds: BackgroundSoundType[] }[] = [
  { label: '환경음', sounds: ['forest', 'bamboo', 'night', 'ruralCrickets', 'cave'] },
  { label: '날씨', sounds: ['rain', 'tent', 'window', 'eaves', 'thunder', 'dthunder', 'blizzard'] },
  { label: '물', sounds: ['stream', 'waterfall', 'wave', 'pebbles', 'deepsea'] },
  { label: '동물', sounds: ['birds', 'cuckoo', 'woodpecker', 'seabirds', 'owl', 'scops', 'cicadas', 'ducks'] },
  { label: '오브젝트', sounds: ['fire', 'temple', 'chimes', 'bowl', 'fan'] },
  { label: '추상음', sounds: ['drone', 'heartbeat', 'brown', 'white', 'pink'] },
];

// Flat display order (selectable sounds; 'none' is handled by the picker itself).
export const SOUND_ORDER: BackgroundSoundType[] = ['none', ...SOUND_GROUPS.flatMap((g) => g.sounds)];

// Display order of the selectable brain waves.
export const WAVE_ORDER: BrainWaveType[] = ['alpha', 'beta', 'gamma', 'theta', 'delta'];

export const getSoundIcon = (type: BackgroundSoundType) => {
  switch (type) {
    case 'rain': return <CloudRain size={20} />;
    case 'tent': return <Tent size={20} />;
    case 'window': return <Blinds size={20} />;
    case 'eaves': return <Droplet size={20} />;
    case 'thunder': return <CloudLightning size={20} />;
    case 'dthunder': return <Zap size={20} />;
    case 'stream': return <Droplets size={20} />;
    case 'waterfall': return <Mountain size={20} />;
    case 'wave': return <Waves size={20} />;
    case 'pebbles': return <Shell size={20} />;
    case 'deepsea': return <Fish size={20} />;
    case 'fire': return <Flame size={20} />;
    case 'bamboo': return <Sprout size={20} />;
    case 'temple': return <Landmark size={20} />;
    case 'scops': return <MoonStar size={20} />;
    case 'heartbeat': return <HeartPulse size={20} />;
    case 'brown': return <AudioWaveform size={20} />;
    case 'forest': return <Wind size={20} />;
    case 'birds': return <Bird size={20} />;
    case 'cuckoo': return <Sunrise size={20} />;
    case 'woodpecker': return <Hammer size={20} />;
    case 'ducks': return <Egg size={20} />;
    case 'cave': return <Gem size={20} />;
    case 'cicadas': return <Bug size={20} />;
    case 'owl': return <Feather size={20} />;
    case 'night': return <CloudMoon size={20} />;
    case 'ruralCrickets': return <Bug size={20} />;
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
    case 'tent': return '텐트 비';
    case 'window': return '창가 비';
    case 'eaves': return '처마 물방울';
    case 'thunder': return '뇌우';
    case 'dthunder': return '먼 천둥';
    case 'stream': return '시냇물';
    case 'waterfall': return '폭포';
    case 'wave': return '파도';
    case 'pebbles': return '몽돌 해변';
    case 'deepsea': return '깊은 바다';
    case 'fire': return '모닥불';
    case 'bamboo': return '대나무숲';
    case 'temple': return '산사의 종';
    case 'scops': return '소쩍새';
    case 'heartbeat': return '심장 박동';
    case 'brown': return '브라운';
    case 'forest': return '숲바람';
    case 'birds': return '새소리';
    case 'cuckoo': return '뻐꾸기';
    case 'woodpecker': return '딱따구리';
    case 'ducks': return '오리';
    case 'cave': return '동굴';
    case 'cicadas': return '매미';
    case 'owl': return '부엉이';
    case 'night': return '밤 벌레';
    case 'ruralCrickets': return '시골 풀벌레';
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
