import React from 'react';
import { ChevronUp, Pause, Play, Square } from 'lucide-react';

interface Props {
  tone: 'session' | 'nature';
  title: string;
  subtitle: string;
  isPlaying: boolean;
  onOpen: () => void;
  onToggle: () => void;
  onStop: () => void;
}

export const NowPlayingBar: React.FC<Props> = ({ tone, title, subtitle, isPlaying, onOpen, onToggle, onStop }) => {
  const nature = tone === 'nature';
  return (
    <section
      aria-label="현재 재생 중"
      className="fixed bottom-[calc(86px+env(safe-area-inset-bottom))] left-3 right-3 z-50 mx-auto flex max-w-[680px] items-center gap-3 overflow-hidden rounded-[22px] border border-white/10 bg-[#101522]/95 p-2.5 text-white shadow-[0_18px_55px_rgba(5,8,18,0.4)] backdrop-blur-xl lg:bottom-6 lg:left-auto lg:right-6 lg:w-[440px]"
    >
      <button
        type="button"
        onClick={onOpen}
        className={`relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl ${nature ? 'bg-emerald-500/18 text-emerald-300' : 'bg-indigo-500/18 text-indigo-300'}`}
        aria-label="재생 화면 열기"
      >
        <span className="playing-bars" data-running={isPlaying ? 'true' : 'false'} aria-hidden="true"><i /><i /><i /></span>
      </button>
      <button type="button" onClick={onOpen} className="min-h-11 min-w-0 flex-1 text-left">
        <p className="truncate text-sm font-extrabold tracking-[-0.02em]">{title}</p>
        <p className={`mt-0.5 truncate text-[11px] font-semibold ${nature ? 'text-emerald-300' : 'text-indigo-300'}`}>{subtitle}</p>
      </button>
      <button type="button" onClick={onOpen} aria-label="펼치기" className="grid h-11 w-11 place-items-center rounded-full text-white/55 hover:bg-white/8 hover:text-white">
        <ChevronUp size={17} />
      </button>
      <button type="button" onClick={onToggle} aria-label={isPlaying ? '일시정지' : '재생'} className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-950 transition-transform active:scale-95">
        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
      </button>
      <button type="button" onClick={onStop} aria-label="종료" className="grid h-11 w-11 place-items-center rounded-full text-white/50 hover:bg-red-500/12 hover:text-red-300">
        <Square size={15} fill="currentColor" />
      </button>
    </section>
  );
};
