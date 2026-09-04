import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Eye, SlidersHorizontal, Plus, RotateCcw, Leaf } from 'lucide-react';
import { BackgroundSoundType, NatureMix, NATURE_MIXES } from '../types';
import type { SoundLayer, SoundPlaybackSnapshot } from '../services/audioEngine';
import { defaultSoundLevel } from '../audioLevels';
import { NatureScene } from './NatureScene';
import { SoundLayerPicker } from './SoundLayerPicker';
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
  /** Home scene cards open directly into the landscape; regular navigation
      opens the composer so the top-level Nature menu remains one tap. */
  initialSceneOnly?: boolean;
  playbackStates: SoundPlaybackSnapshot;
  onRetrySound: (type: BackgroundSoundType) => void;
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
  initialSceneOnly = false, playbackStates, onRetrySound,
}) => {
  const [selected, setSelected] = useState<BackgroundSoundType | null>(null);
  const catalogRef = useRef<HTMLElement>(null);
  const [sceneOnly, setSceneOnly] = useState(initialSceneOnly);
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
    <div className="sound-stage">
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
        <div className="sound-studio">
          <header className="sound-studio-heading">
            <div><p className="sound-eyebrow">SOUND SPACES</p><h1>자연의 소리 <Leaf size={24} aria-hidden="true" /></h1><p className="sound-subtitle">{mixName}</p></div>
            {isPlaying && timerMin != null && <span className="sound-countdown">{fmt(timeLeft)} 남음</span>}
          </header>
          <div className="sound-workspace">
            <section className="sound-transport-panel" aria-label="재생 조절">
              <TransportControls isPlaying={isPlaying} canPlay={layers.length > 0} timerMin={timerMin} volume={volume} onPlay={onPlay} onStop={onStop} onTimerChange={onTimerChange} onVolumeChange={onVolumeChange} />
            </section>
            <section className="sound-mixer" aria-labelledby="active-sounds-title">
              <div className="sound-section-heading"><h2 id="active-sounds-title">선택한 소리 <span>{layers.length}</span></h2>
                {layers.length > 0 && <button type="button" className="sound-text-button" onClick={() => layers.forEach((layer) => { if (!layer.muted) onLayerVolume(layer.type, defaultSoundLevel(layer.type)); })}><RotateCcw size={14} /> 추천 음량</button>}
              </div>
              <ActiveSoundList layers={layers} selectedType={selectedValid} isPlaying={isPlaying} playbackStates={playbackStates} onRetrySound={onRetrySound} onSelectType={setSelected} onLayerVolume={onLayerVolume} onToggleMute={onToggleMute} onRemove={handleRemove} />
              <button type="button" className="sound-add" onClick={() => { catalogRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); catalogRef.current?.querySelector<HTMLInputElement>('input[type="search"]')?.focus({ preventScroll: true }); }}><Plus size={18} /> 소리 추가</button>
            </section>
            {stage}
          </div>
          <section className="sound-spaces" aria-labelledby="sound-spaces-title">
            <div className="sound-section-heading"><h2 id="sound-spaces-title">소리 공간</h2><span className="sound-section-note">조합을 골라 바로 전환</span></div>
            <MixRail activeMixId={activeMixId} onSelectMix={onSelectMix} />
          </section>
          <section ref={catalogRef} className="sound-catalog" aria-labelledby="sound-catalog-title">
            <div className="sound-section-heading"><h2 id="sound-catalog-title">소리 보관함</h2></div>
            <SoundLayerPicker activeLayers={layers} onToggle={onToggleLayer} onVolume={onLayerVolume} hideLevels />
            {recommendations.length > 0 && <div className="sound-suggestions"><h3>함께 듣기</h3><RecommendChips recommendations={recommendations} onAdd={handleAdd} /></div>}
          </section>
        </div>
      )}
    </div>
  );
};
