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
    <div className="relative h-[52dvh] min-h-[390px] flex-1 overflow-hidden rounded-[28px] border border-slate-200/70 bg-[#111621] shadow-[0_28px_70px_rgba(13,25,30,0.18)] sm:h-[58dvh] lg:h-full lg:min-h-0 dark:border-white/8">
      <NatureScene
        types={layers.filter((l) => !l.muted).map((l) => l.type)}
        fill
        interactive
        selectedType={selectedValid}
        onSelectType={handleSceneSelect}
        subscribeEvents={subscribeEvents}
      />
      <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/12 bg-black/22 px-3 py-1.5 text-[10px] font-black tracking-[0.12em] text-white/76 backdrop-blur-md">
        장면 속 오브젝트를 눌러 믹스
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1.5 text-[11px] font-black text-white/95 shadow-lg backdrop-blur-md">
          <Leaf size={11} className="inline -mt-0.5 mr-1" />
          {mixName}{layers.length > 0 ? ` · 사운드 ${layers.length}개` : ''}
        </span>
        {isPlaying && timerMin != null && (
          <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1.5 font-mono text-[11px] font-bold text-white/95 backdrop-blur-md">
            ⏱ {fmt(timeLeft)}
          </span>
        )}
      </div>
      {layers.length > 0 && !selectedValid && (
        <span className="pointer-events-none absolute right-4 top-4 hidden h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_5px_rgba(110,231,183,0.12)] sm:block" aria-hidden="true" />
      )}
    </div>
  );

  return (
    <div className="relative flex min-h-[calc(100dvh-68px)] flex-col gap-3 p-3 pb-0 sm:p-4 sm:pb-0 lg:grid lg:min-h-[calc(100dvh-88px)] lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-5 lg:px-9 lg:py-7">
      {/* stage — always visible while composing */}
      {stage}

      {/* mobile: bottom composer sheet */}
      <div className="-mx-3 flex min-h-0 shrink-0 flex-col sm:-mx-4 lg:hidden" style={{ height: sheetExpanded ? '62dvh' : 'auto' }}>
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
      <div className="hidden min-h-0 flex-col gap-4 overflow-y-auto pr-1 scrollbar-hide lg:flex">
        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-[#111621]">
          <p className="text-[10px] font-black tracking-[0.15em] text-emerald-500">LIVE COMPOSER</p>
          <div className="mb-5 mt-1 flex items-end justify-between gap-4">
            <div className="min-w-0"><h2 className="truncate text-lg font-black tracking-[-0.035em] text-slate-950 dark:text-white">{mixName}</h2><p className="mt-1 text-[10px] font-semibold text-slate-400">레이어 {layers.length}개 · 기기에서 실시간 합성</p></div>
            {isPlaying ? <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-black text-emerald-500">PLAYING</span> : null}
          </div>
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

        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-[#111621]">
          <p className="mb-3 text-[10px] font-black tracking-[0.15em] text-slate-400 dark:text-slate-500">ACTIVE SOUNDS</p>
          <ActiveSoundList
            layers={layers}
            selectedType={selectedValid}
            onSelectType={setSelected}
            onLayerVolume={onLayerVolume}
            onToggleMute={onToggleMute}
            onRemove={handleRemove}
          />
        </div>

        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-[#111621]">
          <p className="mb-3 text-[10px] font-black tracking-[0.15em] text-slate-400 dark:text-slate-500">추천 레이어</p>
          <RecommendChips recommendations={recommendations} onAdd={handleAdd} />
          <p className="mb-3 mt-5 text-[10px] font-black tracking-[0.15em] text-slate-400 dark:text-slate-500">SCENE PRESETS</p>
          <MixRail activeMixId={activeMixId} onSelectMix={onSelectMix} />
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 text-xs font-black text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-950 dark:border-white/8 dark:text-slate-400 dark:hover:border-white/15 dark:hover:text-white"
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
