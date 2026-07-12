import React from 'react';
import { Play, Pause, Timer, Volume2, VolumeX, X, Plus } from 'lucide-react';
import { BackgroundSoundType, NatureMix, NATURE_MIXES } from '../../types';
import { SoundLayer } from '../../services/audioEngine';
import { MAX_LAYER_VOLUME } from '../../audioLevels';
import { getSoundIcon, getSoundLabel } from '../../audioOptions';
import { VolumeSlider } from '../VolumeSlider';

// Shared building blocks for the nature composer — the mobile sheet and the
// desktop side panel compose the same pieces so behavior stays identical.

const TIMER_OPTIONS: (number | null)[] = [null, 15, 30, 60, 90];

export const TransportControls: React.FC<{
  isPlaying: boolean;
  canPlay: boolean;
  timerMin: number | null;
  volume: number;
  onPlay: () => void;
  onStop: () => void;
  onTimerChange: (min: number | null) => void;
  onVolumeChange: (vol: number) => void;
}> = ({ isPlaying, canPlay, timerMin, volume, onPlay, onStop, onTimerChange, onVolumeChange }) => (
  <div>
    <div className="flex items-center gap-3">
      <button
        onClick={isPlaying ? onStop : onPlay}
        disabled={!canPlay}
        aria-label={isPlaying ? '정지' : '재생'}
        className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center text-white shadow-lg transition-all active:scale-95 ${
          !canPlay
            ? 'bg-slate-300 dark:bg-slate-600 cursor-not-allowed'
            : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30'
        }`}
      >
        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          <Timer size={13} /> 취침 타이머
        </div>
        <div className="flex gap-1">
          {TIMER_OPTIONS.map((opt) => (
            <button
              key={opt ?? 'inf'}
              onClick={() => onTimerChange(opt)}
              aria-pressed={timerMin === opt}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
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
    <div className="flex items-center gap-3 mt-3">
      <Volume2 size={15} className="text-slate-400 shrink-0" />
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
  </div>
);

// The heart of the composer: every active sound with its own fader, mute and
// remove — selecting here highlights the object in the scene and vice versa.
export const ActiveSoundList: React.FC<{
  layers: SoundLayer[];
  selectedType: BackgroundSoundType | null;
  onSelectType: (type: BackgroundSoundType | null) => void;
  onLayerVolume: (type: BackgroundSoundType, vol: number) => void;
  onToggleMute: (type: BackgroundSoundType) => void;
  onRemove: (type: BackgroundSoundType) => void;
}> = ({ layers, selectedType, onSelectType, onLayerVolume, onToggleMute, onRemove }) => {
  if (layers.length === 0) {
    return <p className="text-[11px] text-slate-400">장면 속 오브젝트나 아래 추천에서 소리를 골라보세요.</p>;
  }
  return (
    <ul className="space-y-1.5">
      {layers.map((layer) => {
        const selected = selectedType === layer.type;
        return (
          <li
            key={layer.type}
            className={`rounded-xl px-2.5 py-2 transition-colors ${
              selected ? 'bg-emerald-50 dark:bg-emerald-900/25 ring-1 ring-emerald-400/70' : 'bg-slate-50 dark:bg-slate-700/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectType(selected ? null : layer.type)}
                aria-pressed={selected}
                aria-label={`${getSoundLabel(layer.type)} 선택`}
                className={`flex items-center gap-1.5 min-w-0 flex-1 text-left ${layer.muted ? 'opacity-45' : ''}`}
              >
                <span className="text-emerald-600 dark:text-emerald-400 shrink-0">{getSoundIcon(layer.type)}</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{getSoundLabel(layer.type)}</span>
                {layer.muted && <span className="text-[10px] text-slate-400 shrink-0">음소거</span>}
              </button>
              <button
                type="button"
                onClick={() => onToggleMute(layer.type)}
                aria-pressed={!!layer.muted}
                aria-label={`${getSoundLabel(layer.type)} ${layer.muted ? '음소거 해제' : '음소거'}`}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-600/70 transition-colors"
              >
                {layer.muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <button
                type="button"
                onClick={() => onRemove(layer.type)}
                aria-label={`${getSoundLabel(layer.type)} 제거`}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/25 transition-colors"
              >
                <X size={15} />
              </button>
            </div>
            <div className={layer.muted ? 'opacity-45' : ''}>
              <VolumeSlider
                label=""
                ariaLabel={`${getSoundLabel(layer.type)} 볼륨`}
                value={layer.volume}
                max={MAX_LAYER_VOLUME}
                onChange={(value) => onLayerVolume(layer.type, value)}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export const RecommendChips: React.FC<{
  recommendations: BackgroundSoundType[];
  onAdd: (type: BackgroundSoundType) => void;
}> = ({ recommendations, onAdd }) => {
  if (recommendations.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {recommendations.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onAdd(type)}
          className="flex items-center gap-1.5 pl-2 pr-2.5 py-1.5 rounded-full text-[11px] font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <Plus size={12} />
          {getSoundIcon(type)}
          {getSoundLabel(type)}
        </button>
      ))}
    </div>
  );
};

export const MixRail: React.FC<{
  activeMixId: string | null;
  onSelectMix: (mix: NatureMix) => void;
}> = ({ activeMixId, onSelectMix }) => (
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
);
