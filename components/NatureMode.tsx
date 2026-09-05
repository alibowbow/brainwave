import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Eye, SlidersHorizontal, Plus, RotateCcw, X, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { BackgroundSoundType, NatureMix } from '../types';
import type { SoundLayer, SoundPlaybackSnapshot } from '../services/audioEngine';
import { defaultSoundLevel } from '../audioLevels';
import { NatureScene } from './NatureScene';
import { NATURE_SCENES, type NatureSceneId } from '../sceneCatalog';
import { VolumeSlider } from './VolumeSlider';
import { MAX_LAYER_VOLUME } from '../audioLevels';
import { getSoundLabel } from '../audioOptions';
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
  sceneId: NatureSceneId;
  onSceneChange: (id: NatureSceneId) => void;
  onPositionsChange: (positions: Partial<Record<BackgroundSoundType, number>>) => void;
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

// The landscape stays mounted when entering fullscreen; controls expand on demand.
export const NatureMode: React.FC<Props> = ({
  layers, isPlaying, timerMin, timeLeft, volume,
  onPlay, onStop, onToggleLayer, onLayerVolume, onToggleMute, onSelectMix,
  onTimerChange, onVolumeChange, subscribeEvents, sceneId, onSceneChange, onPositionsChange,
  initialSceneOnly = false, playbackStates, onRetrySound,
}) => {
  const [selected, setSelected] = useState<BackgroundSoundType | null>(null);
  const catalogRef = useRef<HTMLElement>(null);
  const inspectorRef = useRef<HTMLElement>(null);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [mixerOpen, setMixerOpen] = useState(false);
  const [keepSounds, setKeepSounds] = useState(false);
  const [sceneOnly, setSceneOnly] = useState(initialSceneOnly);
  const [viewerControlsVisible, setViewerControlsVisible] = useState(true);
  const viewerRootRef = useRef<HTMLDivElement>(null);
  const viewerControlsTimerRef = useRef<number | null>(null);
  const sceneOnlyRef = useRef(sceneOnly);
  const sceneHistoryActiveRef = useRef(false);

  const mixName = NATURE_SCENES[sceneId].name;
  const recommendations = useMemo(() => getRecommendations(layers), [layers]);
  const selectedValid = selected != null && layers.some((l) => l.type === selected) ? selected : null;
  const visibleTypes = useMemo(
    () => layers.map((layer) => layer.type),
    [layers],
  );

  const quietTypes = useMemo(() => layers.filter(l => l.muted || l.volume === 0).map(l => l.type), [layers]);
  const selectedLayer = inspectorOpen ? layers.find(l => l.type === selectedValid) : undefined;
  useEffect(() => {
    if (!selectedValid || !inspectorOpen) return;
    inspectorRef.current?.querySelector<HTMLInputElement>('input[type=range]')?.focus({ preventScroll: true });
  }, [selectedValid, inspectorOpen]);

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
    requestAnimationFrame(() => viewerRootRef.current?.querySelector<HTMLButtonElement>('.scene-button')?.focus({ preventScroll: true }));
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
    const focusFrame = requestAnimationFrame(() => viewerRootRef.current?.querySelector<HTMLButtonElement>('.scene-button')?.focus({ preventScroll: true }));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const controls = Array.from(viewerRootRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),select:not(:disabled)') ?? []).filter(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || !viewerRootRef.current?.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
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
      cancelAnimationFrame(focusFrame);
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
    setSelected(type);
    setInspectorOpen(true);
    holdViewerControls();
  };
  const closeInspector = () => {
    const type = selected;
    setInspectorOpen(false);
    setSelected(null);
    viewerRootRef.current?.querySelector<HTMLButtonElement>(`[data-sound="${type}"]`)?.focus({ preventScroll: true });
    revealViewerControls();
  };

  const handleRemove = (type: BackgroundSoundType) => {
    if (selected === type) setSelected(null);
    onToggleLayer(type);
  };

  const handleAdd = (type: BackgroundSoundType) => {
    onToggleLayer(type);
    setSelected(type);
  };

  return (
    <div ref={viewerRootRef} className={`sound-studio ${sceneOnly ? 'nature-viewer-root' : ''}`} role={sceneOnly ? 'dialog' : undefined} aria-modal={sceneOnly || undefined} aria-label={sceneOnly ? '자연 장면만 보기' : undefined} data-controls={sceneOnly && !viewerControlsVisible && !selectedLayer ? 'hidden' : 'visible'}>
      <div className="sound-experience" onPointerMove={sceneOnly ? revealViewerControls : undefined} onPointerDown={sceneOnly ? revealViewerControls : undefined}>
        <div className="sound-stage">
          <NatureScene types={visibleTypes} quietTypes={quietTypes} sceneId={sceneId} fill active={isPlaying} interactive selectedType={selectedValid} onSelectType={handleSceneSelect} subscribeEvents={subscribeEvents} onPositionsChange={onPositionsChange} />
          <header className="scene-heading">
            <div><h1>{mixName}</h1><p>{isPlaying ? '재생 중' : '재생 대기'} · {layers.length}개 소리{isPlaying && timerMin != null ? ` · ${fmt(timeLeft)}` : ''}</p></div>
            <button type="button" className="scene-button" onClick={sceneOnly ? exitSceneOnly : enterSceneOnly}><Eye size={18} />{sceneOnly ? '전체화면 나가기' : '장면만 보기'}</button>
          </header>
          {selectedLayer && <section ref={inspectorRef} className="scene-inspector" aria-label="선택한 소리 조절" onFocusCapture={holdViewerControls} onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); closeInspector(); } }}>
            <div className="scene-inspector-heading"><strong>{getSoundLabel(selectedLayer.type)}</strong><button type="button" className="sound-icon-button" aria-label="소리 조절 닫기" onClick={closeInspector}><X size={18} /></button></div>
            <VolumeSlider label="" ariaLabel={`${getSoundLabel(selectedLayer.type)} 장면 음량`} value={selectedLayer.volume} max={MAX_LAYER_VOLUME} onChange={value => onLayerVolume(selectedLayer.type, value)} />
            <div className="scene-inspector-actions"><button type="button" className="sound-text-button" aria-pressed={!!selectedLayer.muted} onClick={() => onToggleMute(selectedLayer.type)}>{selectedLayer.muted ? <VolumeX size={17} /> : <Volume2 size={17} />}{selectedLayer.muted ? '음소거 해제' : '음소거'}</button>
            {isPlaying && playbackStates[selectedLayer.type] === 'error' && <button type="button" className="sound-retry" onClick={() => onRetrySound(selectedLayer.type)}>다시 불러오기</button>}</div>
          </section>}
        </div>
        <section className="sound-transport-panel" aria-label="재생 조절" onFocusCapture={holdViewerControls}>
          <TransportControls isPlaying={isPlaying} canPlay={layers.length > 0} timerMin={timerMin} volume={volume} onPlay={onPlay} onStop={onStop} onTimerChange={onTimerChange} onVolumeChange={onVolumeChange} />
          {sceneOnly ? <label className="scene-layer-select"><SlidersHorizontal size={18} /><span className="sr-only">조절할 소리</span><select aria-label="조절할 소리" value={selectedValid ?? ''} onChange={e => { if (e.target.value) handleSceneSelect(e.target.value as BackgroundSoundType); }}><option value="">소리 조절</option>{layers.map(l => <option key={l.type} value={l.type}>{getSoundLabel(l.type)}</option>)}</select></label> : <button type="button" className="sound-editor-toggle" aria-expanded={mixerOpen} aria-controls="sound-editor" onClick={() => setMixerOpen(v => !v)}><SlidersHorizontal size={18} />소리 조절<ChevronDown size={16} /></button>}
        </section>
      </div>
      <section className="sound-mixer" id="sound-editor" hidden={!mixerOpen || sceneOnly} aria-labelledby="active-sounds-title">
        <div className="sound-section-heading"><h2 id="active-sounds-title">선택한 소리 <span>{layers.length}</span></h2><button type="button" className="sound-text-button" onClick={() => layers.forEach(layer => { if (!layer.muted) onLayerVolume(layer.type, defaultSoundLevel(layer.type)); })}><RotateCcw size={14} />추천 음량</button></div>
        <ActiveSoundList layers={layers} selectedType={selectedValid} isPlaying={isPlaying} playbackStates={playbackStates} onRetrySound={onRetrySound} onSelectType={type => { setSelected(type); setInspectorOpen(false); }} onLayerVolume={onLayerVolume} onToggleMute={onToggleMute} onRemove={handleRemove} />
        <button type="button" className="sound-add" onClick={() => { catalogRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' }); catalogRef.current?.querySelector<HTMLInputElement>('input[type="search"]')?.focus({ preventScroll: true }); }}><Plus size={18} />소리 추가</button>
      </section>
      <section className="sound-spaces" hidden={sceneOnly} aria-labelledby="sound-spaces-title">
        <div className="sound-section-heading"><h2 id="sound-spaces-title">다른 풍경</h2><label className="scene-keep-sounds"><input type="checkbox" checked={keepSounds} onChange={e => setKeepSounds(e.target.checked)} />소리 유지</label></div>
        <MixRail activeMixId={sceneId} onSelectMix={mix => { setSelected(null); setInspectorOpen(false); if (keepSounds) onSceneChange(mix.id as NatureSceneId); else onSelectMix(mix); }} />
      </section>
      <section ref={catalogRef} className="sound-catalog" hidden={sceneOnly} aria-labelledby="sound-catalog-title">
        <div className="sound-section-heading"><h2 id="sound-catalog-title">소리 보관함</h2></div>
        <SoundLayerPicker activeLayers={layers} onToggle={onToggleLayer} onVolume={onLayerVolume} hideLevels />
        {recommendations.length > 0 && <div className="sound-suggestions"><h3>함께 듣기</h3><RecommendChips recommendations={recommendations} onAdd={handleAdd} /></div>}
      </section>
    </div>
  );
};
