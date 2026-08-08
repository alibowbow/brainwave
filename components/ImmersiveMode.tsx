import React from 'react';
import { Play, Pause, Square, Minimize2 } from 'lucide-react';
import type { VisualMode } from '../types';
import type { SoundLayer } from '../services/audioEngine';
import { AuraVisualizer } from './AuraVisualizer';
import { NatureScene } from './NatureScene';
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
}

const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

// Full-frame session view. Nature is the default; the reactive aura is an
// explicit alternative selected with the same control used in the player.
export const ImmersiveMode: React.FC<Props> = ({
  timeLeft, isPlaying, sessionName, color, visualMode, activeLayers, getAnalyser,
  onVisualModeChange, onPlay, onPause, onStop, onExit,
}) => (
  <div className="fixed inset-0 z-[100] flex h-[100dvh] flex-col items-center justify-center overflow-hidden bg-slate-950 text-white animate-fade-in">
    {visualMode === 'nature' ? (
      <div className="absolute inset-0">
        <NatureScene types={activeLayers.map((layer) => layer.type)} fill />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03110a]/12 via-transparent to-[#020807]/78" />
      </div>
    ) : (
      <AuraVisualizer getAnalyser={getAnalyser} active={isPlaying} color={color} className="absolute inset-0 h-full w-full" />
    )}

    <VisualModeSwitch
      value={visualMode}
      onChange={onVisualModeChange}
      className="absolute left-1/2 top-[max(16px,env(safe-area-inset-top))] z-20 -translate-x-1/2"
      quiet
    />

    <button
      type="button"
      onClick={onExit}
      aria-label="몰입 모드 종료"
      className="absolute right-[max(16px,env(safe-area-inset-right))] top-[max(76px,calc(env(safe-area-inset-top)+76px))] z-20 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/32 backdrop-blur-md transition-colors hover:bg-black/52 sm:top-[max(16px,env(safe-area-inset-top))]"
    >
      <Minimize2 size={20} />
    </button>

    <div className={`relative z-10 select-none px-6 text-center ${visualMode === 'nature' ? 'rounded-[28px] border border-white/12 bg-[#06100c]/38 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm' : ''}`}>
      <div className="text-6xl font-extralight tabular-nums tracking-tight drop-shadow-lg sm:text-7xl">{fmt(timeLeft)}</div>
      <p className={`mt-4 text-sm ${visualMode === 'nature' ? 'text-white/72' : 'text-white/50'}`}>{sessionName}</p>
    </div>

    <div className="absolute bottom-[max(32px,calc(env(safe-area-inset-bottom)+32px))] z-10 flex items-center gap-5 rounded-full border border-white/12 bg-black/30 p-2.5 shadow-2xl backdrop-blur-md sm:bottom-16">
      {!isPlaying ? (
        <button type="button" onClick={onPlay} aria-label="재생" className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-950 transition-transform hover:scale-105 active:scale-95">
          <Play size={30} fill="currentColor" className="ml-1" />
        </button>
      ) : (
        <button type="button" onClick={onPause} aria-label="일시정지" className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-950 transition-transform hover:scale-105 active:scale-95">
          <Pause size={30} fill="currentColor" />
        </button>
      )}
      <button type="button" onClick={onStop} aria-label="세션 종료" className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15 text-red-200 transition-colors hover:bg-red-500/24">
        <Square size={18} fill="currentColor" />
      </button>
    </div>
  </div>
);
