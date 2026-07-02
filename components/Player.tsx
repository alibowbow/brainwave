import React, { useState } from 'react';
import { Play, Pause, Square, ChevronDown, Clock, Activity, Volume2, Sliders, Wind } from 'lucide-react';
import { BackgroundSoundType, BrainWaveType, getBrainWaveLabel } from '../types';
import { WAVE_ORDER, getSoundLabel, getWaveShortLabel } from '../audioOptions';
import { SoundLayer, ToneMode } from '../services/audioEngine';
import { Toggle } from './Toggle';
import { SoundLayerPicker } from './SoundLayerPicker';
import { BreathingGuide } from './BreathingGuide';

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
  activeLayers: SoundLayer[];
  onToggleLayer: (type: BackgroundSoundType) => void;
  onLayerVolume: (type: BackgroundSoundType, vol: number) => void;
  volumes: { master: number; binaural: number; bg: number };
  onVolumeChange: (key: 'master' | 'binaural' | 'bg', val: number) => void;
  brainwaveEnabled: boolean;
  onToggleBrainwave: () => void;
  toneMode: ToneMode;
  onToneModeChange: (mode: ToneMode) => void;
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
  activeLayers,
  onToggleLayer,
  onLayerVolume,
  volumes,
  onVolumeChange,
  brainwaveEnabled,
  onToggleBrainwave,
  toneMode,
  onToneModeChange,
}) => {
  const [breathingOn, setBreathingOn] = useState(false);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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
        <BreathingGuide active={breathingOn && isPlaying} />
      </div>

      <div className="flex justify-center -mt-4 mb-4">
        <button
          onClick={() => setBreathingOn((v) => !v)}
          aria-pressed={breathingOn}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            breathingOn
              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 ring-1 ring-primary-500/40'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Wind size={13} /> 호흡 가이드
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{sessionName}</h2>
        <div className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center gap-2 flex-wrap px-4">
          {brainwaveEnabled && (
            <>
              <Activity size={14} /> {getBrainWaveLabel(currentBrainWave).split(' ')[0]}
              <span>·</span>
            </>
          )}
          <Volume2 size={14} /> {activeLayers.length ? activeLayers.map((l) => getSoundLabel(l.type)).join(', ') : '자연음 없음'}
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mb-10">
        {!isPlaying ? (
          <button onClick={onPlay} aria-label="재생" className="w-16 h-16 rounded-full bg-primary-600 hover:bg-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 transition-all hover:scale-105 active:scale-95">
            <Play size={32} fill="currentColor" className="ml-1" />
          </button>
        ) : (
          <button onClick={onPause} aria-label="일시정지" className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95">
            <Pause size={32} fill="currentColor" />
          </button>
        )}
        <button onClick={onStop} aria-label="세션 종료" className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50 flex items-center justify-center transition-all">
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
              aria-label="재생 시간 (분)"
              value={Math.ceil(timeLeft / 60)}
              onChange={(e) => onTimeChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="w-16 text-right font-mono font-bold text-primary-600 dark:text-primary-400">{Math.ceil(timeLeft / 60)}분</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              <Activity size={14} /> 뇌파음 (Brainwave)
            </div>
            <Toggle checked={brainwaveEnabled} onChange={onToggleBrainwave} label="뇌파음 사용" />
          </div>
          <div className={`grid grid-cols-5 gap-1.5 transition-opacity ${brainwaveEnabled ? '' : 'opacity-40 pointer-events-none'}`}>
            {WAVE_ORDER.map((wave) => (
              <button
                key={wave}
                onClick={() => onWaveChange(wave)}
                disabled={!brainwaveEnabled}
                aria-pressed={currentBrainWave === wave}
                className={`py-2 px-1 rounded-lg text-sm font-medium transition-all ${
                  currentBrainWave === wave
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {getWaveShortLabel(wave)}
              </button>
            ))}
          </div>
          {brainwaveEnabled && (
            <div className="mt-3">
              <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                {(['binaural', 'isochronic'] as ToneMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => onToneModeChange(m)}
                    aria-pressed={toneMode === m}
                    className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                      toneMode === m
                        ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {m === 'binaural' ? '바이노럴' : '아이소크로닉'}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">
                {toneMode === 'isochronic' ? '아이소크로닉: 스피커로도 효과를 느낄 수 있어요.' : '바이노럴: 헤드폰·이어폰을 착용하세요.'}
              </p>
            </div>
          )}
          {!brainwaveEnabled && (
            <p className="text-[11px] text-slate-400 mt-2">자연음만 재생 중이에요.</p>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <Volume2 size={14} /> 배경음 (Layers)
          </div>
          <SoundLayerPicker activeLayers={activeLayers} onToggle={onToggleLayer} onVolume={onLayerVolume} />
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <Sliders size={14} /> 볼륨 믹서
          </div>

          <div className="space-y-4">
            <div className={`flex items-center gap-4 transition-opacity ${brainwaveEnabled ? '' : 'opacity-40'}`}>
              <span className="text-xs font-semibold w-16 text-slate-600 dark:text-slate-300">뇌파음</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                aria-label="뇌파음 볼륨"
                disabled={!brainwaveEnabled}
                value={volumes.binaural}
                onChange={(e) => onVolumeChange('binaural', Number(e.target.value))}
                className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold w-16 text-slate-600 dark:text-slate-300">자연음</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                aria-label="자연음 볼륨"
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
                aria-label="전체 볼륨"
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
