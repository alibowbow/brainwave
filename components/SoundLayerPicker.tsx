import React from 'react';
import { BackgroundSoundType } from '../types';
import { SoundLayer } from '../services/audioEngine';
import { SOUND_ORDER, getSoundIcon, getSoundLabel } from '../audioOptions';

interface Props {
  activeLayers: SoundLayer[];
  onToggle: (type: BackgroundSoundType) => void;
  onVolume: (type: BackgroundSoundType, vol: number) => void;
}

// Multi-select background-sound picker: tap a chip to layer a sound in/out, and
// each active layer gets its own volume slider so users can mix soundscapes.
export const SoundLayerPicker: React.FC<Props> = ({ activeLayers, onToggle, onVolume }) => {
  const isActive = (t: BackgroundSoundType) => activeLayers.some((l) => l.type === t);
  const chips = SOUND_ORDER.filter((s) => s !== 'none');

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {chips.map((sound) => (
          <button
            key={sound}
            onClick={() => onToggle(sound)}
            aria-pressed={isActive(sound)}
            aria-label={getSoundLabel(sound)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl min-w-[70px] border transition-all ${
              isActive(sound)
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                : 'border-transparent bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {getSoundIcon(sound)}
            <span className="text-[10px] font-bold whitespace-nowrap">{getSoundLabel(sound)}</span>
          </button>
        ))}
      </div>

      {activeLayers.length > 0 ? (
        <div className="mt-4 space-y-3">
          {activeLayers.map((layer) => (
            <div key={layer.type} className="flex items-center gap-3">
              <span className="text-xs font-semibold w-16 shrink-0 text-slate-600 dark:text-slate-300">
                {getSoundLabel(layer.type)}
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                aria-label={`${getSoundLabel(layer.type)} 볼륨`}
                value={layer.volume}
                onChange={(e) => onVolume(layer.type, Number(e.target.value))}
                className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-slate-400 mt-2">
          사운드를 탭해 자유롭게 겹쳐보세요. 여러 개를 동시에 재생할 수 있어요.
        </p>
      )}
    </div>
  );
};
