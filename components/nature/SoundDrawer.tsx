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
    <div className="absolute inset-0 z-50 flex flex-col justify-end" role="dialog" aria-modal="true" aria-label="전체 사운드 목록">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px] cursor-default"
      />
      <div className="relative bg-white dark:bg-slate-800 rounded-t-2xl shadow-2xl max-h-[78%] flex flex-col animate-slide-up">
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">전체 사운드</h3>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="사운드 목록 닫기"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto scrollbar-hide px-4 py-3">
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
