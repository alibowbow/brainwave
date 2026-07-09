import React, { useState } from 'react';
import { Play, Pause, Square, ChevronDown, Clock, Activity, Volume2, Wind, Maximize2 } from 'lucide-react';
import { BackgroundSoundType, BrainWaveType, getBrainWaveLabel } from '../types';
import { WAVE_ORDER, getSoundLabel, getWaveShortLabel, getWaveColor } from '../audioOptions';
import { SoundLayer, ToneMode } from '../services/audioEngine';
import type { MixVolumes } from '../audioLevels';
import { Toggle } from './Toggle';
import { SoundLayerPicker } from './SoundLayerPicker';
import { VolumeMixer } from './VolumeMixer';
import { BreathingGuide } from './BreathingGuide';
import { AuraVisualizer } from './AuraVisualizer';
import { NatureScene } from './NatureScene';

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
  onBalanceLayers: () => void;
  volumes: MixVolumes;
  onMixChange: (volumes: MixVolumes) => void;
  brainwaveEnabled: boolean;
  onToggleBrainwave: () => void;
  toneMode: ToneMode;
  onToneModeChange: (mode: ToneMode) => void;
  getAnalyser: () => AnalyserNode | null;
  onImmersive: () => void;
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
  onBalanceLayers,
  volumes,
  onMixChange,
  brainwaveEnabled,
  onToggleBrainwave,
  toneMode,
  onToneModeChange,
  getAnalyser,
  onImmersive,
}) => {
  const [breathingOn, setBreathingOn] = useState(false);
  const auraColor = brainwaveEnabled ? getWaveColor(currentBrainWave) : '#6366f1';

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative isolate flex flex-col animate-slide-up pb-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-primary-500/15 dark:bg-primary-500/10 blur-3xl animate-breathe" />
        <div className="absolute -top-10 -right-20 w-80 h-80 rounded-full bg-purple-500/10 dark:bg-purple-500/10 blur-3xl animate-breathe" style={{ animationDelay: '3s' }} />
      </div>
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
        <AuraVisualizer getAnalyser={getAnalyser} active={isPlaying} color={auraColor} className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 text-5xl font-light tabular-nums text-slate-800 dark:text-white tracking-tight drop-shadow-sm">
          {formatTime(timeLeft)}
        </div>
        <BreathingGuide active={breathingOn && isPlaying} />
      </div>

      <div className="flex justify-center gap-2 -mt-4 mb-4">
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
        <button
          onClick={onImmersive}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <Maximize2 size={13} /> 몰입 모드
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

      <div className="px-4 mb-8">
        <NatureScene types={activeLayers.map((l) => l.type)} />
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
          <SoundLayerPicker activeLayers={activeLayers} onToggle={onToggleLayer} onVolume={onLayerVolume} onBalance={onBalanceLayers} />
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
          <VolumeMixer volumes={volumes} brainwaveEnabled={brainwaveEnabled} onChange={onMixChange} />
        </div>
      </div>
    </div>
  );
};
