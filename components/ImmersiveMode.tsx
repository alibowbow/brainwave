import type { BackgroundSoundType } from '../types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause, Square, Minimize2 } from 'lucide-react';
import type { VisualMode } from '../types';
import type { SoundLayer } from '../services/audioEngine';
import { AuraVisualizer } from './AuraVisualizer';
import { NatureScene, type NatureBackgroundVariant } from './NatureScene';
import { VisualModeSwitch } from './VisualModeSwitch';

interface Props {
  timeLeft: number;
  isPlaying: boolean;
  sessionName: string;
  color: string;
  visualMode: VisualMode;
  activeLayers: SoundLayer[];
  getAnalyser: () => AnalyserNode | null;
  onVisualModeChange: (mode: VisualMode) => void;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onExit: () => void;
  backgroundVariant?: NatureBackgroundVariant;
  subscribeEvents?: (cb: (type: BackgroundSoundType) => void) => () => void;
}

const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

// Full-frame session view. Nature is the default; the reactive aura is an
// explicit alternative selected with the same control used in the player.
export const ImmersiveMode: React.FC<Props> = ({
  timeLeft, isPlaying, sessionName, color, visualMode, activeLayers, getAnalyser,
  onVisualModeChange, onPlay, onPause, onStop, onExit, backgroundVariant, subscribeEvents,
}) => {
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimerRef = useRef<number | null>(null);
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    if (controlsTimerRef.current != null) window.clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = window.setTimeout(() => setControlsVisible(false), 3600);
  }, []);

  const holdControls = useCallback(() => {
    setControlsVisible(true);
    if (controlsTimerRef.current != null) window.clearTimeout(controlsTimerRef.current);
  }, []);

  useEffect(() => {
    if (visualMode === 'nature') revealControls();
    else holdControls();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onExitRef.current();
      else if (visualMode === 'nature') revealControls();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (controlsTimerRef.current != null) window.clearTimeout(controlsTimerRef.current);
    };
  }, [holdControls, revealControls, visualMode]);

  const chromeVisible = visualMode === 'graphics' || controlsVisible;

  return (
    <div
      className="fixed inset-0 z-[100] flex h-[100dvh] flex-col items-center justify-center overflow-hidden bg-slate-950 text-white animate-fade-in"
      onPointerMove={visualMode === 'nature' ? revealControls : undefined}
      onPointerDown={visualMode === 'nature' ? revealControls : undefined}
      role="dialog"
      aria-modal="true"
      aria-label="몰입 화면"
    >
      {visualMode === 'nature' ? (
        <div className="absolute inset-0">
          <NatureScene types={activeLayers.map((layer) => layer.type)} backgroundVariant={backgroundVariant} active={isPlaying} subscribeEvents={subscribeEvents} fill />
          <div className="absolute inset-0 bg-gradient-to-b from-[#03110a]/8 via-transparent to-[#020807]/60" />
        </div>
      ) : (
        <AuraVisualizer getAnalyser={getAnalyser} active={isPlaying} color={color} className="absolute inset-0 h-full w-full" />
      )}

      <div
        onFocusCapture={holdControls}
        onBlurCapture={revealControls}
        className={`absolute inset-0 z-20 transition-opacity duration-300 motion-reduce:transition-none ${chromeVisible ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`}
      >
        <VisualModeSwitch
          value={visualMode}
          onChange={onVisualModeChange}
          className="absolute left-1/2 top-[max(12px,env(safe-area-inset-top))] -translate-x-1/2"
          compact
          quiet
        />

        <button
          type="button"
          onClick={onExit}
          aria-label="몰입 모드 종료"
          className="absolute right-[max(12px,env(safe-area-inset-right))] top-[max(12px,env(safe-area-inset-top))] grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/58 backdrop-blur-md transition-colors hover:bg-black/72 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Minimize2 size={19} />
        </button>

        <div className="absolute bottom-[max(18px,calc(env(safe-area-inset-bottom)+18px))] left-1/2 flex w-[min(360px,calc(100vw-24px))] -translate-x-1/2 items-center gap-2 rounded-full border border-white/14 bg-black/58 p-1.5 pl-4 shadow-2xl backdrop-blur-md">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold text-white/64">{sessionName}</p>
            <p className="mt-0.5 text-xl font-semibold tabular-nums tracking-tight" aria-label={`남은 시간 ${Math.floor(timeLeft / 60)}분 ${timeLeft % 60}초`}>{fmt(timeLeft)}</p>
          </div>
          {!isPlaying ? (
            <button type="button" onClick={onPlay} aria-label="재생" className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-slate-950 transition-transform hover:scale-105 active:scale-95">
              <Play size={23} fill="currentColor" className="ml-0.5" />
            </button>
          ) : (
            <button type="button" onClick={onPause} aria-label="일시정지" className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-slate-950 transition-transform hover:scale-105 active:scale-95">
              <Pause size={23} fill="currentColor" />
            </button>
          )}
          <button type="button" onClick={onStop} aria-label="세션 종료" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-red-200 transition-colors hover:bg-red-500/20">
            <Square size={16} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};
