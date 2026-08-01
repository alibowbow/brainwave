import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { BackgroundSoundType } from '../../types';
import { SoundLayer } from '../../services/audioEngine';
import { SoundLayerPicker } from '../SoundLayerPicker';

interface Props {
  open: boolean;
  layers: SoundLayer[];
  onToggle: (type: BackgroundSoundType) => void;
  onClose: () => void;
}

// Full sound catalog in a bottom drawer: all six categories, tap to layer a
// sound in or out. Fader/mute/remove live in the composer, keeping this a
// clean browsing surface.
export const SoundDrawer: React.FC<Props> = ({ open, layers, onToggle, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col justify-end" role="dialog" aria-modal="true" aria-label="전체 사운드 목록">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
      />
      <div className="relative flex max-h-[86dvh] flex-col rounded-t-[28px] bg-white shadow-2xl animate-slide-up lg:mx-auto lg:mb-5 lg:w-[min(1120px,calc(100%-40px))] lg:rounded-[28px] dark:bg-[#111621]">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 pb-3 pt-4 sm:px-6 dark:border-white/8">
          <div><p className="text-[9px] font-black tracking-[0.15em] text-emerald-500">SOUND LIBRARY</p><h3 className="mt-1 text-base font-black text-slate-900 dark:text-white">전체 사운드</h3></div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="사운드 목록 닫기"
            className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:text-slate-900 dark:bg-white/5 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5 scrollbar-hide sm:px-6">
          <SoundLayerPicker
            activeLayers={layers}
            onToggle={onToggle}
            onVolume={() => { /* faders live in the composer */ }}
            hideScene
            hideLevels
          />
        </div>
      </div>
    </div>
  );
};
