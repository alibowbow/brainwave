import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Leaf, LibraryBig } from 'lucide-react';
import { BackgroundSoundType, NatureMix, NATURE_MIXES } from '../types';
import { SoundLayer } from '../services/audioEngine';
import { NatureScene } from './NatureScene';
import { ComposerSheet } from './nature/ComposerSheet';
import { SoundDrawer } from './nature/SoundDrawer';
import { TransportControls, ActiveSoundList, RecommendChips, MixRail } from './nature/controls';
import { getRecommendations } from './nature/recommend';
import { VisualModeSwitch } from './VisualModeSwitch';

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

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => Promise<void> | void;
};

const fullscreenElement = () => {
  const fullscreenDocument = document as FullscreenDocument;
  return document.fullscreenElement ?? fullscreenDocument.webkitFullscreenElement ?? null;
};

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
  const [sceneOnly, setSceneOnly] = useState(true);
  const [viewerControlsVisible, setViewerControlsVisible] = useState(true);
  const viewerRootRef = useRef<HTMLDivElement>(null);
  const viewerControlsTimerRef = useRef<number | null>(null);

  const activeMix = NATURE_MIXES.find((m) => m.id === activeMixId) ?? null;
  const mixName = activeMix ? `${activeMix.emoji} ${activeMix.name}` : layers.length > 0 ? '커스텀 조합' : '자연의 소리';
  const recommendations = useMemo(() => getRecommendations(layers), [layers]);
  const selectedValid = selected != null && layers.some((l) => l.type === selected) ? selected : null;
  const visibleTypes = useMemo(
    () => layers.filter((layer) => !layer.muted).map((layer) => layer.type),
    [layers],
  );

  const revealViewerControls = useCallback(() => {
    setViewerControlsVisible(true);
    if (viewerControlsTimerRef.current != null) window.clearTimeout(viewerControlsTimerRef.current);
    viewerControlsTimerRef.current = window.setTimeout(() => setViewerControlsVisible(false), 3600);
  }, []);

  const holdViewerControls = useCallback(() => {
    setViewerControlsVisible(true);
    if (viewerControlsTimerRef.current != null) window.clearTimeout(viewerControlsTimerRef.current);
  }, []);

  const enterSceneOnly = () => {
    setSceneOnly(true);
    revealViewerControls();

    const element = viewerRootRef.current as (HTMLDivElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    }) | null;
    if (!element || fullscreenElement()) return;
    const requestFullscreen = element.requestFullscreen ?? element.webkitRequestFullscreen;
    try {
      void Promise.resolve(requestFullscreen?.call(element)).catch(() => undefined);
    } catch {
      // Fixed-position viewer remains available when fullscreen is unsupported.
    }
  };

  const exitSceneOnly = useCallback(() => {
    setSceneOnly(false);
    const fullscreenDocument = document as FullscreenDocument;
    if (!fullscreenElement()) return;
    try {
      const exitFullscreen = document.exitFullscreen ?? fullscreenDocument.webkitExitFullscreen;
      void Promise.resolve(exitFullscreen?.call(document)).catch(() => undefined);
    } catch {
      // The fixed-position fallback has already been closed.
    }
  }, []);

  useEffect(() => {
    if (!sceneOnly) return;
    revealViewerControls();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !fullscreenElement()) exitSceneOnly();
    };
    const onFullscreenChange = () => {
      const fullscreenDocument = document as FullscreenDocument;
      const fullscreenSupported = document.fullscreenEnabled || fullscreenDocument.webkitFullscreenEnabled;
      if (!fullscreenElement() && fullscreenSupported) setSceneOnly(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
    };
  }, [exitSceneOnly, revealViewerControls, sceneOnly]);

  useEffect(() => () => {
    if (viewerControlsTimerRef.current != null) window.clearTimeout(viewerControlsTimerRef.current);
  }, []);

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
    <div className="relative h-[clamp(360px,calc(100dvh-305px-env(safe-area-inset-bottom)),800px)] shrink-0 overflow-hidden rounded-[28px] border border-slate-200/70 bg-[#111621] shadow-[0_28px_70px_rgba(13,25,30,0.18)] lg:h-full lg:min-h-0 dark:border-white/8">
      <NatureScene
        types={visibleTypes}
        fill
        interactive
        selectedType={selectedValid}
        onSelectType={handleSceneSelect}
        subscribeEvents={subscribeEvents}
      />
      <div className="pointer-events-none absolute left-4 top-4 hidden rounded-full border border-white/12 bg-black/22 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-white/76 backdrop-blur-md sm:block">
        장면 속 오브젝트를 눌러 믹스
      </div>
      <VisualModeSwitch
        value="graphics"
        onChange={(mode) => { if (mode === 'nature') enterSceneOnly(); }}
        className="absolute left-1/2 top-4 z-40 -translate-x-1/2"
      />
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1.5 text-[11px] font-bold text-white/95 shadow-lg backdrop-blur-md">
          <Leaf size={11} className="inline -mt-0.5 mr-1" />
          {mixName}{layers.length > 0 ? ` · 사운드 ${layers.length}개` : ''}
        </span>
        {isPlaying && timerMin != null && (
          <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1.5 font-mono text-[11px] font-bold text-white/95 backdrop-blur-md">
            ⏱ {fmt(timeLeft)}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div
      ref={viewerRootRef}
      className={sceneOnly ? 'nature-viewer-root fixed inset-0 z-[200] h-[100dvh] overflow-hidden bg-slate-950' : 'relative'}
    >
      {sceneOnly ? (
        <div
          className="relative h-full w-full cursor-default overflow-hidden"
          onPointerMove={revealViewerControls}
          onPointerDown={revealViewerControls}
        >
          <NatureScene
            types={visibleTypes}
            fill
            subscribeEvents={subscribeEvents}
          />
          <div
            onFocusCapture={holdViewerControls}
            onBlurCapture={revealViewerControls}
            className={`absolute left-1/2 top-[max(16px,env(safe-area-inset-top))] z-50 -translate-x-1/2 transition-[opacity,transform] duration-300 ${viewerControlsVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 pointer-events-none opacity-0'}`}
          >
            <VisualModeSwitch
              value="nature"
              onChange={(mode) => { if (mode === 'graphics') exitSceneOnly(); }}
              quiet
            />
          </div>
        </div>
      ) : (
        <div className="relative flex min-h-[calc(100dvh-68px)] flex-col gap-3 p-3 pb-0 sm:p-4 sm:pb-0 lg:grid lg:min-h-[calc(100dvh-88px)] lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-4 lg:p-4">
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
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div className="min-w-0"><h2 className="truncate text-lg font-bold text-slate-800 dark:text-slate-100">{mixName}</h2><p className="mt-1 text-xs text-slate-400">레이어 {layers.length}개 · 기기에서 실시간 합성</p></div>
                {isPlaying ? <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-500">재생 중</span> : null}
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

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <p className="mb-2 text-xs font-bold text-slate-400 dark:text-slate-500">활성 사운드</p>
              <ActiveSoundList
                layers={layers}
                selectedType={selectedValid}
                onSelectType={setSelected}
                onLayerVolume={onLayerVolume}
                onToggleMute={onToggleMute}
                onRemove={handleRemove}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <p className="mb-2 text-xs font-bold text-slate-400 dark:text-slate-500">이 장면에 어울리는 소리</p>
              <RecommendChips recommendations={recommendations} onAdd={handleAdd} />
              <p className="mb-2 mt-4 text-xs font-bold text-slate-400 dark:text-slate-500">추천 조합</p>
              <MixRail activeMixId={activeMixId} onSelectMix={onSelectMix} />
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <LibraryBig size={15} /> 전체 사운드 보기
              </button>
            </div>
          </div>
        </div>
      )}

      {!sceneOnly ? (
        <SoundDrawer
          open={drawerOpen}
          layers={layers}
          onToggle={(type) => onToggleLayer(type)}
          onClose={() => setDrawerOpen(false)}
        />
      ) : null}
    </div>
  );
};
