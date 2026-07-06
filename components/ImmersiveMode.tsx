import React from 'react';
import { Play, Pause, Square, Minimize2 } from 'lucide-react';
import { AuraVisualizer } from './AuraVisualizer';

interface Props {
  timeLeft: number;
  isPlaying: boolean;
  sessionName: string;
  color: string;
  getAnalyser: () => AnalyserNode | null;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onExit: () => void;
}

const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

// Full-frame "awakened" view: the aura fills a dark space with an oversized
// timer. Deliberately dark regardless of theme for a cinematic feel.
export const ImmersiveMode: React.FC<Props> = ({
  timeLeft, isPlaying, sessionName, color, getAnalyser, onPlay, onPause, onStop, onExit,
}) => (
  <div className="absolute inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-center overflow-hidden animate-fade-in">
    <AuraVisualizer getAnalyser={getAnalyser} active={isPlaying} color={color} className="absolute inset-0 w-full h-full" />

    <button
      onClick={onExit}
      aria-label="몰입 모드 종료"
      className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
    >
      <Minimize2 size={20} />
    </button>

    <div className="relative z-10 text-center px-6 select-none">
      <div className="text-7xl font-extralight tabular-nums tracking-tight drop-shadow-lg">{fmt(timeLeft)}</div>
      <p className="mt-4 text-white/50 text-sm">{sessionName}</p>
    </div>

    <div className="absolute bottom-16 z-10 flex items-center gap-6">
      {!isPlaying ? (
        <button onClick={onPlay} aria-label="재생" className="w-16 h-16 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-colors">
          <Play size={30} fill="currentColor" className="ml-1" />
        </button>
      ) : (
        <button onClick={onPause} aria-label="일시정지" className="w-16 h-16 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-colors">
          <Pause size={30} fill="currentColor" />
        </button>
      )}
      <button onClick={onStop} aria-label="세션 종료" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-red-300 backdrop-blur-sm flex items-center justify-center transition-colors">
        <Square size={18} fill="currentColor" />
      </button>
    </div>
  </div>
);
