import React from 'react';
import { Play, Pause, ChevronUp, ChevronDown, LibraryBig } from 'lucide-react';
import { BackgroundSoundType, NatureMix } from '../../types';
import { SoundLayer } from '../../services/audioEngine';
import { getSoundIcon, getSoundLabel } from '../../audioOptions';
import { TransportControls, ActiveSoundList, RecommendChips, MixRail } from './controls';

interface Props {
  layers: SoundLayer[];
  isPlaying: boolean;
  mixName: string;
  timerMin: number | null;
  timeLeft: number;
  volume: number;
  activeMixId: string | null;
  selectedType: BackgroundSoundType | null;
  recommendations: BackgroundSoundType[];
  expanded: boolean;
  onToggleExpanded: () => void;
  onPlay: () => void;
  onStop: () => void;
  onVolumeChange: (vol: number) => void;
  onTimerChange: (min: number | null) => void;
  onLayerVolume: (type: BackgroundSoundType, vol: number) => void;
  onToggleMute: (type: BackgroundSoundType) => void;
  onRemove: (type: BackgroundSoundType) => void;
  onSelectType: (type: BackgroundSoundType | null) => void;
  onAddSound: (type: BackgroundSoundType) => void;
  onSelectMix: (mix: NatureMix) => void;
  onOpenDrawer: () => void;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// The always-reachable bottom composer. Collapsed: play, scene name, timer,
// master volume and the active sounds at a glance. Expanded: the full mixer
// (faders/mute/remove first), then recommendations and the catalog entry.
export const ComposerSheet: React.FC<Props> = ({
  layers, isPlaying, mixName, timerMin, timeLeft, volume, activeMixId, selectedType,
  recommendations, expanded, onToggleExpanded, onPlay, onStop, onVolumeChange, onTimerChange,
  onLayerVolume, onToggleMute, onRemove, onSelectType, onAddSound, onSelectMix, onOpenDrawer,
}) => {
  const timerText = isPlaying
    ? (timerMin != null ? `⏱ ${fmt(timeLeft)}` : '∞ 재생 중')
    : (timerMin != null ? `타이머 ${timerMin}분` : '타이머 ∞');

  return (
    <section
      aria-label="사운드 컴포저"
      className={`flex min-h-0 flex-col rounded-t-[28px] border-t border-slate-200 bg-white shadow-[0_-12px_36px_rgba(15,23,42,0.14)] dark:border-white/8 dark:bg-[#111621] ${
        expanded ? 'h-full' : 'h-auto'
      }`}
    >
      {/* grab handle */}
      <button
        type="button"
        onClick={onToggleExpanded}
        aria-expanded={expanded}
        aria-label={expanded ? '컴포저 접기' : '컴포저 펼치기'}
        className="flex min-h-11 w-full flex-col items-center justify-center gap-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <span className="w-9 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
        {expanded ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
      </button>

      {!expanded ? (
        <div className="px-3 pb-3">
          {/* collapsed bar: transport + status + master volume */}
          <div className="flex items-center gap-3">
            <button
              onClick={isPlaying ? onStop : onPlay}
              disabled={layers.length === 0}
              aria-label={isPlaying ? '정지' : '재생'}
              className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-white shadow-md transition-all active:scale-95 ${
                layers.length === 0
                  ? 'bg-slate-300 dark:bg-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30'
              }`}
            >
              {isPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" className="ml-0.5" />}
            </button>
            <button type="button" onClick={onToggleExpanded} className="flex-1 min-w-0 text-left">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{mixName}</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                {timerText} · 사운드 {layers.length}개
              </p>
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              aria-label="전체 볼륨"
              value={volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 shrink-0"
            />
          </div>
          {/* active sounds at a glance — tap one to select & expand */}
          {layers.length > 0 && (
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide mt-2 -mx-1 px-1">
              {layers.map((l) => (
                <button
                  key={l.type}
                  type="button"
                  onClick={() => { onSelectType(l.type); if (!expanded) onToggleExpanded(); }}
                  aria-label={`${getSoundLabel(l.type)} 조절`}
                  className={`flex min-h-9 shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-colors ${
                    l.muted
                      ? 'border-slate-200 dark:border-slate-600 text-slate-400 opacity-60'
                      : selectedType === l.type
                        ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/25 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {getSoundIcon(l.type)}
                  {getSoundLabel(l.type)}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-[calc(88px+env(safe-area-inset-bottom))] scrollbar-hide">
          <TransportControls
            isPlaying={isPlaying}
            canPlay={layers.length > 0}
            timerMin={timerMin}
            volume={volume}
            onPlay={onPlay}
            onStop={onStop}
            onTimerChange={onTimerChange}
            onVolumeChange={onVolumeChange}
          />

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              활성 사운드
            </p>
            <ActiveSoundList
              layers={layers}
              selectedType={selectedType}
              onSelectType={onSelectType}
              onLayerVolume={onLayerVolume}
              onToggleMute={onToggleMute}
              onRemove={onRemove}
            />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              이 장면에 어울리는 소리
            </p>
            <RecommendChips recommendations={recommendations} onAdd={onAddSound} />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              추천 조합
            </p>
            <MixRail activeMixId={activeMixId} onSelectMix={onSelectMix} />
          </div>

          <button
            type="button"
            onClick={onOpenDrawer}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <LibraryBig size={15} /> 전체 사운드 보기
          </button>
        </div>
      )}
    </section>
  );
};
