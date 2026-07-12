import React, { useMemo, useState } from 'react';
import { Leaf, LibraryBig } from 'lucide-react';
import { BackgroundSoundType, NatureMix, NATURE_MIXES } from '../types';
import { SoundLayer } from '../services/audioEngine';
import { NatureScene } from './NatureScene';
import { ComposerSheet } from './nature/ComposerSheet';
import { SoundDrawer } from './nature/SoundDrawer';
import { TransportControls, ActiveSoundList, RecommendChips, MixRail } from './nature/controls';
import { getRecommendations } from './nature/recommend';

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
  onToggleMute: (type: BackgroundSoundType) => void;
  onSelectMix: (mix: NatureMix) => void;
  onTimerChange: (min: number | null) => void;
  onVolumeChange: (vol: number) => void;
  subscribeEvents: (cb: (type: BackgroundSoundType) => void) => () => void;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// 자연의 소리: a living soundscape composer. The scene IS the interface —
// tap an object to select its sound; the bottom sheet (mobile) or side panel
// (desktop) carries transport, faders, recommendations and the full catalog.
export const NatureMode: React.FC<Props> = ({
  layers, isPlaying, timerMin, timeLeft, volume, activeMixId,
  onPlay, onStop, onToggleLayer, onLayerVolume, onToggleMute, onSelectMix,
  onTimerChange, onVolumeChange, subscribeEvents,
}) => {
  const [selected, setSelected] = useState<BackgroundSoundType | null>(null);
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeMix = NATURE_MIXES.find((m) => m.id === activeMixId) ?? null;
  const mixName = activeMix ? `${activeMix.emoji} ${activeMix.name}` : layers.length > 0 ? '커스텀 조합' : '자연의 소리';
  const recommendations = useMemo(() => getRecommendations(layers), [layers]);
  const selectedValid = selected != null && layers.some((l) => l.type === selected) ? selected : null;

  const handleSceneSelect = (type: BackgroundSoundType) => {
    setSelected((prev) => (prev === type ? null : type));
    setSheetExpanded(true);
  };

  const handleRemove = (type: BackgroundSoundType) => {
    if (selected === type) setSelected(null);
    onToggleLayer(type);
  };

  const handleAdd = (type: BackgroundSoundType) => {
    onToggleLayer(type);
    setSelected(type);
  };

  const stage = (
    <div className="relative flex-1 min-h-0 lg:h-full">
      <NatureScene
        types={layers.filter((l) => !l.muted).map((l) => l.type)}
        fill
        interactive
        selectedType={selectedValid}
        onSelectType={handleSceneSelect}
        subscribeEvents={subscribeEvents}
      />
      {/* status scrim */}
      <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between pointer-events-none">
        <span className="text-[11px] font-bold text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          <Leaf size={11} className="inline -mt-0.5 mr-1" />
          {mixName}{layers.length > 0 ? ` · 사운드 ${layers.length}개` : ''}
        </span>
        {isPlaying && timerMin != null && (
          <span className="text-[11px] font-mono font-bold text-white/95 bg-black/30 rounded-full px-2 py-0.5 backdrop-blur-sm">
            ⏱ {fmt(timeLeft)}
          </span>
        )}
      </div>
      {layers.length > 0 && !selectedValid && (
        <p className="absolute top-2 right-3 text-[10px] font-semibold text-white/85 bg-black/25 rounded-full px-2 py-0.5 backdrop-blur-sm pointer-events-none">
          오브젝트를 눌러 소리를 조절해보세요
        </p>
      )}
    </div>
  );

  return (
    <div className="h-full min-h-0 relative flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-4 lg:p-4 p-3 pb-0 lg:pb-4 gap-2">
      {/* stage — always visible while composing */}
      {stage}

      {/* mobile: bottom composer sheet */}
      <div className="lg:hidden shrink-0 -mx-3 flex flex-col min-h-0" style={{ height: sheetExpanded ? '62%' : 'auto' }}>
        <ComposerSheet
          layers={layers}
          isPlaying={isPlaying}
          mixName={mixName}
          timerMin={timerMin}
          timeLeft={timeLeft}
          volume={volume}
          activeMixId={activeMixId}
          selectedType={selectedValid}
          recommendations={recommendations}
          expanded={sheetExpanded}
          onToggleExpanded={() => setSheetExpanded((v) => !v)}
          onPlay={onPlay}
          onStop={onStop}
          onVolumeChange={onVolumeChange}
          onTimerChange={onTimerChange}
          onLayerVolume={onLayerVolume}
          onToggleMute={onToggleMute}
          onRemove={handleRemove}
          onSelectType={setSelected}
          onAddSound={handleAdd}
          onSelectMix={onSelectMix}
          onOpenDrawer={() => setDrawerOpen(true)}
        />
      </div>

      {/* desktop: fixed side panel — the scene stays in view while mixing */}
      <div className="hidden lg:flex flex-col gap-4 min-h-0 overflow-y-auto scrollbar-hide pr-1">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-4">
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
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">활성 사운드</p>
          <ActiveSoundList
            layers={layers}
            selectedType={selectedValid}
            onSelectType={setSelected}
            onLayerVolume={onLayerVolume}
            onToggleMute={onToggleMute}
            onRemove={handleRemove}
          />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">이 장면에 어울리는 소리</p>
          <RecommendChips recommendations={recommendations} onAdd={handleAdd} />
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-4 mb-2">추천 조합</p>
          <MixRail activeMixId={activeMixId} onSelectMix={onSelectMix} />
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="w-full mt-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <LibraryBig size={15} /> 전체 사운드 보기
          </button>
        </div>
      </div>

      <SoundDrawer
        open={drawerOpen}
        layers={layers}
        onToggle={(type) => onToggleLayer(type)}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};
