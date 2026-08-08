import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Eye, LibraryBig, SlidersHorizontal } from 'lucide-react';
import { BackgroundSoundType, NatureMix, NATURE_MIXES } from '../types';
import { SoundLayer } from '../services/audioEngine';
import { NatureScene } from './NatureScene';
import { ComposerSheet } from './nature/ComposerSheet';
import { SoundDrawer } from './nature/SoundDrawer';
import { TransportControls, ActiveSoundList, RecommendChips, MixRail } from './nature/controls';
import { getRecommendations } from './nature/recommend';
import { hasNatureSceneHistory, withNatureSceneHistory } from '../appNavigation';

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
  const sceneOnlyRef = useRef(sceneOnly);
  const sceneHistoryActiveRef = useRef(false);

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
    sceneOnlyRef.current = true;
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
    sceneOnlyRef.current = false;
    setSceneOnly(false);
    if (sceneHistoryActiveRef.current && hasNatureSceneHistory(window.history.state)) {
      sceneHistoryActiveRef.current = false;
      window.history.back();
    }
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
    const onPopState = (event: PopStateEvent) => {
      const sceneEntry = hasNatureSceneHistory(event.state);
      if (sceneEntry && !sceneOnlyRef.current) {
        sceneHistoryActiveRef.current = true;
        sceneOnlyRef.current = true;
        setSceneOnly(true);
        revealViewerControls();
        return;
      }
      if (!sceneEntry && sceneOnlyRef.current && sceneHistoryActiveRef.current) {
        sceneHistoryActiveRef.current = false;
        sceneOnlyRef.current = false;
        setSceneOnly(false);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [revealViewerControls]);

  useEffect(() => {
    if (!sceneOnly) return;
    sceneOnlyRef.current = true;
    if (!hasNatureSceneHistory(window.history.state)) {
      window.history.pushState(withNatureSceneHistory(window.history.state), '', window.location.href);
    }
    sceneHistoryActiveRef.current = true;
    revealViewerControls();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !fullscreenElement()) exitSceneOnly();
      else revealViewerControls();
    };
    const onFullscreenChange = () => {
      const fullscreenDocument = document as FullscreenDocument;
      const fullscreenSupported = document.fullscreenEnabled || fullscreenDocument.webkitFullscreenEnabled;
      if (!fullscreenElement() && fullscreenSupported && sceneOnlyRef.current) exitSceneOnly();
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
    <div className="relative h-[clamp(400px,calc(100dvh-220px-env(safe-area-inset-bottom)),860px)] shrink-0 overflow-hidden rounded-[24px] border border-slate-200/70 bg-[#111621] shadow-[0_24px_64px_rgba(13,25,30,0.16)] lg:h-full lg:min-h-0 dark:border-white/8">
      <NatureScene
        types={visibleTypes}
        backgroundVariant={activeMixId === 'campfire' ? 'campfire' : undefined}
        fill
        interactive
        selectedType={selectedValid}
        onSelectType={handleSceneSelect}
        subscribeEvents={subscribeEvents}
      />
      <div className="pointer-events-none absolute left-4 top-4 hidden rounded-full border border-white/12 bg-black/22 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-white/76 backdrop-blur-md sm:block">
        장면 속 오브젝트를 눌러 믹스
      </div>
      <button
        type="button"
        onClick={enterSceneOnly}
        className="absolute right-3 top-3 z-40 flex min-h-11 items-center gap-2 rounded-full border border-white/16 bg-black/55 px-4 text-xs font-bold text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <Eye size={15} aria-hidden="true" /> 장면만 보기
      </button>
      <div className="pointer-events-none absolute bottom-3 right-3 flex items-end justify-end">
        {isPlaying && timerMin != null && (
          <span className="rounded-full border border-white/14 bg-black/55 px-3 py-1.5 font-mono text-[11px] font-bold text-white backdrop-blur-md">
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
      role={sceneOnly ? 'dialog' : undefined}
      aria-modal={sceneOnly ? true : undefined}
      aria-label={sceneOnly ? '자연 장면만 보기' : undefined}
    >
      {sceneOnly ? (
        <div
          className="relative h-full w-full cursor-default overflow-hidden"
          onPointerMove={revealViewerControls}
          onPointerDown={revealViewerControls}
        >
          <NatureScene
            types={visibleTypes}
            backgroundVariant={activeMixId === 'campfire' ? 'campfire' : undefined}
            fill
            subscribeEvents={subscribeEvents}
          />
          <div
            onFocusCapture={holdViewerControls}
            onBlurCapture={revealViewerControls}
            className={`absolute right-[max(12px,env(safe-area-inset-right))] top-[max(12px,env(safe-area-inset-top))] z-50 transition-[opacity,transform] duration-300 ${viewerControlsVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 invisible pointer-events-none opacity-0'}`}
          >
            <button
              type="button"
              onClick={exitSceneOnly}
              className="flex min-h-11 items-center gap-2 rounded-full border border-white/16 bg-black/58 px-4 text-xs font-bold text-white shadow-[0_12px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-colors hover:bg-black/72 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <SlidersHorizontal size={15} aria-hidden="true" /> 소리 조절
            </button>
          </div>
          {isPlaying ? (
            <div className={`pointer-events-none absolute bottom-[max(14px,env(safe-area-inset-bottom))] left-[max(14px,env(safe-area-inset-left))] z-40 rounded-full border border-white/14 bg-black/52 px-3 py-2 text-[11px] font-bold text-white/92 backdrop-blur-md transition-opacity duration-300 ${viewerControlsVisible ? 'opacity-100' : 'opacity-0'}`}>
              {timerMin == null ? '재생 중 · ∞' : `재생 중 · ${fmt(timeLeft)}`}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="relative flex min-h-[calc(100dvh-68px)] flex-col gap-3 p-3 pb-0 sm:p-4 sm:pb-0 lg:grid lg:min-h-[calc(100dvh-88px)] lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-4 lg:p-4">
          {/* stage — always visible while composing */}
          {stage}

          {/* mobile: bottom composer sheet */}
          <div className="-mx-3 flex min-h-0 shrink-0 flex-col sm:-mx-4 lg:hidden" style={{ height: sheetExpanded ? 'min(46dvh, 420px)' : 'auto' }}>
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
