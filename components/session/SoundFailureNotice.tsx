import React from 'react';
import { getSoundLabel } from '../../audioOptions';
import type { BackgroundSoundType } from '../../types';
import type { SoundLayer, SoundPlaybackSnapshot } from '../../services/audioEngine';

interface Props {
  active: boolean;
  layers: readonly SoundLayer[];
  playbackStates?: SoundPlaybackSnapshot;
  onRetrySound?: (type: BackgroundSoundType) => void;
  className?: string;
}

/** A failed recording must remain visible in both player and fullscreen. */
export function SoundFailureNotice({ active, layers, playbackStates = {}, onRetrySound, className = '' }: Props) {
  const failed = active ? layers.filter(layer => !layer.muted && layer.volume > 0 && playbackStates[layer.type] === 'error') : [];
  if (!failed.length) return null;
  return <div className={`relative z-30 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-b border-amber-200/15 bg-slate-900 px-4 py-2 ${className}`} aria-live="polite">
    {failed.map(layer => <div key={layer.type} className="flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1" data-sound-error={layer.type}>
      <p className="text-xs text-amber-100" role="status">{getSoundLabel(layer.type)} 소리를 불러오지 못했어요.</p>
      {onRetrySound && <button type="button" onClick={() => onRetrySound(layer.type)} aria-label={`${getSoundLabel(layer.type)} 다시 불러오기`} className="min-h-11 rounded-xl px-3 text-xs font-bold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">다시 불러오기</button>}
    </div>)}
  </div>;
}
