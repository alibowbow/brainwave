import React from 'react';
import { BackgroundSoundType } from '../types';
import { SoundLayer } from '../services/audioEngine';
import { SOUND_GROUPS, getSoundIcon, getSoundLabel } from '../audioOptions';
import { MAX_LAYER_VOLUME } from '../audioLevels';
import { VolumeSlider } from './VolumeSlider';

interface Props {
  activeLayers: SoundLayer[];
  onToggle: (type: BackgroundSoundType) => void;
  onVolume: (type: BackgroundSoundType, vol: number) => void;
  hideScene?: boolean;  // retained for backwards compatibility; the catalog no longer renders a duplicate scene
  hideLevels?: boolean; // catalog-only view (the composer owns the faders)
  onBalance?: () => void;
  compact?: boolean;
}

// Multi-select background-sound picker, grouped by scene: tap a chip to layer a
// sound in/out, and each active layer gets its own volume slider so users can
// mix soundscapes.
export const SoundLayerPicker: React.FC<Props> = ({ activeLayers, onToggle, onVolume, hideLevels, onBalance, compact = false }) => {
  const isActive = (t: BackgroundSoundType) => activeLayers.some((l) => l.type === t);

  return (
    <div>
      <div className={`space-y-4 ${compact ? 'sound-picker-compact' : ''}`}>
        {SOUND_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 text-[10px] font-black tracking-[0.14em] text-slate-400 dark:text-slate-500">
              {group.label}
            </p>
            <div className={`grid gap-2 ${compact ? 'grid-cols-4 sm:grid-cols-5 xl:grid-cols-6' : 'grid-cols-4 sm:grid-cols-5'}`}>
              {group.sounds.map((sound) => (
                <button
                  key={sound}
                  type="button"
                  onClick={() => onToggle(sound)}
                  aria-pressed={isActive(sound)}
                  aria-label={getSoundLabel(sound)}
                  className={`flex min-w-0 flex-col items-center justify-center gap-1.5 rounded-2xl border px-1 transition-all ${compact ? 'min-h-[64px] py-2' : 'min-h-[72px] py-2.5'} ${
                    isActive(sound)
                      ? 'border-[#7180ef]/45 bg-[#7180ef]/10 text-[#5f6fe3] shadow-sm dark:border-[#8491ff]/35 dark:bg-[#7180ef]/12 dark:text-[#aab3ff]'
                      : 'border-transparent bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-800 dark:bg-white/[0.035] dark:text-slate-500 dark:hover:bg-white/7 dark:hover:text-slate-200'
                  }`}
                >
                  {getSoundIcon(sound)}
                  <span className="max-w-full truncate whitespace-nowrap px-0.5 text-[10px] font-black">{getSoundLabel(sound)}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!hideLevels && activeLayers.length > 0 ? (
        <div className="mt-5 space-y-2 border-t border-dashed border-slate-200 pt-4 dark:border-white/8">
          <div className="flex items-center justify-between gap-2 pb-1">
            <p className="text-[11px] font-black text-slate-400">개별 소리 음량</p>
            {onBalance && (
              <button
                type="button"
                onClick={onBalance}
                className="min-h-9 rounded-xl px-2 text-[11px] font-black text-[#6878ed] transition-colors hover:bg-[#7180ef]/8"
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
        <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
          사운드를 탭해 자유롭게 겹쳐보세요. 여러 개를 동시에 재생할 수 있어요.
        </p>
      )}
    </div>
  );
};
