import React from 'react';
import { Play, Pause, Square, ChevronDown, Clock, Activity, Volume2, Sliders, Bird, CloudRain, Wind, Sun, CloudMoon, Flame, Volume1 } from 'lucide-react';
import { BackgroundSoundType, BrainWaveType, getBrainWaveLabel } from '../types';

interface PlayerProps {
  sessionName: string;
  timeLeft: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onMinimize: () => void;
  onTimeChange: (val: number) => void;
  currentBrainWave: BrainWaveType;
  onWaveChange: (val: BrainWaveType) => void;
  currentSound: BackgroundSoundType;
  onSoundChange: (val: BackgroundSoundType) => void;
  volumes: { master: number; binaural: number; bg: number };
  onVolumeChange: (key: 'master' | 'binaural' | 'bg', val: number) => void;
}

export const Player: React.FC<PlayerProps> = ({
  sessionName,
  timeLeft,
  isPlaying,
  onPlay,
  onPause,
  onStop,
  onMinimize,
  onTimeChange,
  currentBrainWave,
  onWaveChange,
  currentSound,
  onSoundChange,
  volumes,
  onVolumeChange,
}) => {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getSoundIcon = (type: BackgroundSoundType) => {
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

  const getSoundLabel = (type: BackgroundSoundType) => {
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

  return (
    <div className="flex flex-col animate-slide-up pb-32">
      <div className="flex justify-center mb-6 pt-2">
        <button
          onClick={onMinimize}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
        >
          <ChevronDown size={18} />
          <span>축소하기</span>
        </button>
      </div>

      <div className="relative w-64 h-64 mx-auto flex items-center justify-center mb-8 shrink-0">
        <div className={`absolute w-full h-full rounded-full bg-gradient-to-tr from-primary-500/30 to-purple-500/30 blur-xl ${isPlaying ? 'animate-breathe' : 'opacity-20'}`}></div>
        <div className={`absolute w-3/4 h-3/4 rounded-full bg-gradient-to-bl from-primary-400/40 to-blue-400/40 blur-lg ${isPlaying ? 'animate-breathe' : 'opacity-20'}`} style={{ animationDelay: '1s' }}></div>
        <div className="relative z-10 text-5xl font-light tabular-nums text-slate-800 dark:text-white tracking-tight">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{sessionName}</h2>
        <div className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center gap-2">
          <Activity size={14} /> {getBrainWaveLabel(currentBrainWave).split(' ')[0]}
          <span>·</span>
          <Volume2 size={14} /> {getSoundLabel(currentSound)}
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mb-10">
        {!isPlaying ? (
          <button onClick={onPlay} className="w-16 h-16 rounded-full bg-primary-600 hover:bg-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 transition-all hover:scale-105 active:scale-95">
            <Play size={32} fill="currentColor" className="ml-1" />
          </button>
        ) : (
          <button onClick={onPause} className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95">
            <Pause size={32} fill="currentColor" />
          </button>
        )}
        <button onClick={onStop} className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50 flex items-center justify-center transition-all">
          <Square size={20} fill="currentColor" />
        </button>
      </div>

      <div className="w-full px-4 space-y-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <Clock size={14} /> 재생 시간 (분)
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="120"
              value={Math.ceil(timeLeft / 60)}
              onChange={(e) => onTimeChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="w-16 text-right font-mono font-bold text-primary-600 dark:text-primary-400">{Math.ceil(timeLeft / 60)}분</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <Activity size={14} /> 뇌파 선택 (Brainwave)
          </div>
          <div className="grid grid-cols-4 gap-2">
            {(['alpha', 'beta', 'theta', 'delta'] as BrainWaveType[]).map((wave) => (
              <button
                key={wave}
                onClick={() => onWaveChange(wave)}
                className={`py-2 px-1 rounded-lg text-sm font-medium transition-all ${
                  currentBrainWave === wave
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {wave === 'alpha' ? '알파' : wave === 'beta' ? '베타' : wave === 'theta' ? '세타' : '델타'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <Volume2 size={14} /> 배경음 (Atmosphere)
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {(['none', 'rain', 'fire', 'birds', 'night', 'wave', 'forest', 'white'] as BackgroundSoundType[]).map((sound) => (
              <button
                key={sound}
                onClick={() => onSoundChange(sound)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl min-w-[70px] transition-all border ${
                  currentSound === sound
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'border-transparent bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {getSoundIcon(sound)}
                <span className="text-[10px] font-bold">{getSoundLabel(sound)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <Sliders size={14} /> 볼륨 믹서
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold w-16 text-slate-600 dark:text-slate-300">뇌파음</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volumes.binaural}
                onChange={(e) => onVolumeChange('binaural', Number(e.target.value))}
                className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold w-16 text-slate-600 dark:text-slate-300">자연음</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volumes.bg}
                onChange={(e) => onVolumeChange('bg', Number(e.target.value))}
                className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="pt-3 mt-3 border-t border-dashed border-slate-200 dark:border-slate-700 flex items-center gap-4">
              <span className="text-xs font-bold w-16 text-primary-600 dark:text-primary-400">전체 볼륨</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volumes.master}
                onChange={(e) => onVolumeChange('master', Number(e.target.value))}
                className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
