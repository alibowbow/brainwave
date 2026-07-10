import React from 'react';
import { Play, Pause, Timer, Volume2, Leaf } from 'lucide-react';
import { BackgroundSoundType, NatureMix, NATURE_MIXES } from '../types';
import { SoundLayer } from '../services/audioEngine';
import { SoundLayerPicker } from './SoundLayerPicker';
import { NatureScene } from './NatureScene';

interface Props {
  layers: SoundLayer[];
  isPlaying: boolean;
  timerMin: number | null;      // null = endless (∞)
  timeLeft: number;             // seconds remaining, only when a finite timer is running
  volume: number;
  activeMixId: string | null;
  onPlay: () => void;
  onStop: () => void;
  onToggleLayer: (type: BackgroundSoundType) => void;
  onLayerVolume: (type: BackgroundSoundType, vol: number) => void;
  onSelectMix: (mix: NatureMix) => void;
  onTimerChange: (min: number | null) => void;
  onVolumeChange: (vol: number) => void;
}

const TIMER_OPTIONS: (number | null)[] = [null, 15, 30, 60, 90];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// 자연의 소리 tab: a brainwave-free ambient soundscape player. The diorama is
// the hero; below it live transport (play + sleep timer + volume), one-tap
// curated mixes, and the full layer mixer.
export const NatureMode: React.FC<Props> = ({
  layers, isPlaying, timerMin, timeLeft, volume, activeMixId,
  onPlay, onStop, onToggleLayer, onLayerVolume, onSelectMix, onTimerChange, onVolumeChange,
}) => {
  const activeMix = NATURE_MIXES.find((m) => m.id === activeMixId) ?? null;

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <div className="mb-1 flex items-center gap-2 px-1">
        <Leaf size={18} className="text-emerald-500" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">자연의 소리</h2>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 px-1 mb-4">
        뇌파음 없이 자연의 소리만 자유롭게 겹쳐 들어보세요.
      </p>

      {/* hero diorama */}
      <div className="relative mb-4">
        <NatureScene types={layers.map((l) => l.type)} tall />
        {(activeMix || isPlaying) && (
          <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between pointer-events-none">
            <span className="text-[11px] font-bold text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {activeMix ? `${activeMix.emoji} ${activeMix.name}` : '커스텀 조합'} · 사운드 {layers.length}개
            </span>
            {isPlaying && timerMin != null && (
              <span className="text-[11px] font-mono font-bold text-white/95 bg-black/30 rounded-full px-2 py-0.5 backdrop-blur-sm">
                ⏱ {fmt(timeLeft)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* transport: play/pause + sleep timer */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={isPlaying ? onStop : onPlay}
            disabled={layers.length === 0}
            aria-label={isPlaying ? '정지' : '재생'}
            className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-white shadow-lg transition-all active:scale-95 ${
              layers.length === 0
                ? 'bg-slate-300 dark:bg-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30'
            }`}
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Timer size={14} /> 취침 타이머
            </div>
            <div className="flex gap-1.5">
              {TIMER_OPTIONS.map((opt) => (
                <button
                  key={opt ?? 'inf'}
                  onClick={() => onTimerChange(opt)}
                  aria-pressed={timerMin === opt}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    timerMin === opt
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {opt == null ? '∞' : `${opt}분`}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Volume2 size={16} className="text-slate-400 shrink-0" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            aria-label="전체 볼륨"
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
        {timerMin == null && isPlaying && (
          <p className="text-[10px] text-slate-400 mt-2">타이머 없이 계속 재생돼요. 정지 버튼으로 멈출 수 있어요.</p>
        )}
        {timerMin != null && (
          <p className="text-[10px] text-slate-400 mt-2">시간이 다 되면 알림음 없이 서서히 페이드아웃돼요.</p>
        )}
      </div>

      {/* curated one-tap mixes */}
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 px-1">
          추천 조합
        </p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1 snap-x">
          {NATURE_MIXES.map((mix) => (
            <button
              key={mix.id}
              onClick={() => onSelectMix(mix)}
              aria-pressed={activeMixId === mix.id}
              className={`shrink-0 snap-start flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold border transition-all ${
                activeMixId === mix.id
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-400'
              }`}
            >
              <span className="text-sm leading-none">{mix.emoji}</span>
              {mix.name}
            </button>
          ))}
        </div>
      </div>

      {/* full mixer */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
        <p className="text-slate-600 dark:text-slate-300 font-medium text-sm mb-3">사운드 조합</p>
        <SoundLayerPicker activeLayers={layers} onToggle={onToggleLayer} onVolume={onLayerVolume} hideScene />
      </div>
    </div>
  );
};
