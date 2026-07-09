import React from 'react';
import { BackgroundSoundType } from '../types';
import { SoundLayer } from '../services/audioEngine';
import { SOUND_GROUPS, getSoundIcon, getSoundLabel } from '../audioOptions';
import { MAX_LAYER_VOLUME } from '../audioLevels';
import { NatureScene } from './NatureScene';
import { VolumeSlider } from './VolumeSlider';

interface Props {
  activeLayers: SoundLayer[];
  onToggle: (type: BackgroundSoundType) => void;
  onVolume: (type: BackgroundSoundType, vol: number) => void;
  onBalance?: () => void;
}

// Multi-select background-sound picker, grouped by scene: tap a chip to layer a
// sound in/out, and each active layer gets its own volume slider so users can
// mix soundscapes.
export const SoundLayerPicker: React.FC<Props> = ({ activeLayers, onToggle, onVolume, onBalance }) => {
  const isActive = (t: BackgroundSoundType) => activeLayers.some((l) => l.type === t);

  return (
    <div>
      <div className="mb-4">
        <NatureScene types={activeLayers.map((l) => l.type)} />
      </div>
      <div className="space-y-3">
        {SOUND_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              {group.label}
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {group.sounds.map((sound) => (
                <button
                  key={sound}
                  onClick={() => onToggle(sound)}
                  aria-pressed={isActive(sound)}
                  aria-label={getSoundLabel(sound)}
                  className={`flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl border transition-all min-w-0 ${
                    isActive(sound)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'border-transparent bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {getSoundIcon(sound)}
                  <span className="text-[10px] font-bold whitespace-nowrap max-w-full truncate px-0.5">{getSoundLabel(sound)}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {activeLayers.length > 0 ? (
        <div className="mt-4 space-y-2 border-t border-dashed border-slate-200 pt-3 dark:border-slate-700">
          <div className="flex items-center justify-between gap-2 pb-1">
            <p className="text-[11px] font-semibold text-slate-400">개별 소리 음량</p>
            {onBalance && (
              <button
                type="button"
                onClick={onBalance}
                className="min-h-9 rounded-lg px-2 text-[11px] font-bold text-primary-600 transition-colors hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20"
              >
                추천값 적용
              </button>
            )}
          </div>
          {activeLayers.map((layer) => (
            <VolumeSlider
              key={layer.type}
              label={getSoundLabel(layer.type)}
              value={layer.volume}
              max={MAX_LAYER_VOLUME}
              onChange={(value) => onVolume(layer.type, value)}
            />
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-slate-400 mt-3">
          사운드를 탭해 자유롭게 겹쳐보세요. 여러 개를 동시에 재생할 수 있어요.
        </p>
      )}
    </div>
  );
};
