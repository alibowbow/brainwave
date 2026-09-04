import React, { useState } from 'react';
import { Search, Check } from 'lucide-react';
import { BackgroundSoundType } from '../types';
import { SoundLayer } from '../services/audioEngine';
import { SOUND_GROUPS, getSoundIcon, getSoundLabel, getSoundOrigin } from '../audioOptions';
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
  const [query, setQuery] = useState('');
  const [originFilter, setOriginFilter] = useState<'all' | 'REAL' | 'AI'>('all');
  const visibleGroups = SOUND_GROUPS.map((group) => ({ ...group, sounds: group.sounds.filter((type) => (originFilter === 'all' || getSoundOrigin(type) === originFilter) && getSoundLabel(type).includes(query.trim())) })).filter((group) => group.sounds.length);
  const isActive = (t: BackgroundSoundType) => activeLayers.some((l) => l.type === t);

  return (
    <div className="sound-picker">
      <div className="sound-library-tools">
        <div className="sound-filters" aria-label="음원 종류">
          {([['all', '전체'], ['REAL', '실제 녹음'], ['AI', '합성']] as const).map(([id, label]) => <button type="button" key={id} aria-pressed={originFilter === id} onClick={() => setOriginFilter(id)}>{label}</button>)}
        </div>
        <label className="sound-search"><Search size={17} /><input type="search" aria-label="소리 검색" placeholder="소리 검색" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
      </div>
      {!visibleGroups.length && <div className="sound-empty" role="status">일치하는 소리가 없습니다. <button type="button" onClick={() => { setQuery(''); setOriginFilter('all'); }}>전체 보기</button></div>}
      <div className={`space-y-4 ${compact ? 'sound-picker-compact' : ''}`}>
        {visibleGroups.map((group) => (
          <div key={group.label}>
            <p className="sound-group-label">
              {group.label}
            </p>
            <div className="sound-option-grid">
              {group.sounds.map((sound) => {
                const active = isActive(sound);
                const origin = getSoundOrigin(sound);
                const label = getSoundLabel(sound);
                return (
                  <button
                    key={sound}
                    type="button"
                    onClick={() => onToggle(sound)}
                    aria-pressed={active}
                    aria-label={`${label} · ${origin === 'REAL' ? '리얼 녹음' : 'AI 합성'}`}
                    className={`sound-option ${active ? 'is-active' : ''}`}
                  >
                    <span className="sound-origin" data-origin={origin}>{origin}</span>
                    {active && <Check size={14} className="sound-option-check" aria-hidden="true" />}
                    {getSoundIcon(sound)}
                    <span className="sound-option-label">{label}</span>
                  </button>
                );
              })}
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

