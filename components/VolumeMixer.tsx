import React from 'react';
import { RotateCcw, Sliders } from 'lucide-react';
import { DEFAULT_MIX_VOLUMES, MIX_PROFILES, normalizeMixVolumes } from '../audioLevels';
import type { MixVolumes } from '../audioLevels';
import { VolumeSlider } from './VolumeSlider';

interface Props {
  volumes: MixVolumes;
  brainwaveEnabled: boolean;
  onChange: (volumes: MixVolumes) => void;
  showProfiles?: boolean;
}

export const VolumeMixer: React.FC<Props> = ({ volumes, brainwaveEnabled, onChange, showProfiles = true }) => {
  const setOne = (key: keyof MixVolumes, value: number) => onChange(normalizeMixVolumes({ ...volumes, [key]: value }));

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Sliders size={14} /> 볼륨 믹서
        </div>
        <button
          type="button"
          onClick={() => onChange(DEFAULT_MIX_VOLUMES)}
          className="inline-flex min-h-9 items-center gap-1 rounded-lg px-2 text-[11px] font-semibold text-slate-400 transition-colors hover:bg-slate-100 hover:text-primary-600 dark:hover:bg-slate-700"
          aria-label="기본 볼륨으로 초기화"
        >
          <RotateCcw size={13} /> 초기화
        </button>
      </div>

      {showProfiles && (
        <div className="mb-3 grid grid-cols-3 gap-1.5" role="group" aria-label="볼륨 프리셋">
          {MIX_PROFILES.map((profile) => {
            const active = (Object.keys(profile.volumes) as (keyof MixVolumes)[])
              .every((key) => Math.abs(profile.volumes[key] - volumes[key]) < 0.005);
            return (
              <button
                key={profile.id}
                type="button"
                title={profile.description}
                aria-pressed={active}
                onClick={() => onChange(profile.volumes)}
                className={`min-h-10 rounded-lg border px-1.5 text-[11px] font-bold transition-colors ${active
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-primary-400 hover:text-primary-600 dark:border-slate-700 dark:bg-slate-700/50 dark:text-slate-300'}`}
              >
                {profile.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="space-y-1">
        <VolumeSlider
          label="뇌파음"
          value={volumes.binaural}
          disabled={!brainwaveEnabled}
          onChange={(value) => setOne('binaural', value)}
        />
        <VolumeSlider label="자연음 전체" value={volumes.bg} onChange={(value) => setOne('bg', value)} />
        <div className="mt-2 border-t border-dashed border-slate-200 pt-2 dark:border-slate-700">
          <VolumeSlider label="전체 볼륨" value={volumes.master} emphasized onChange={(value) => setOne('master', value)} />
        </div>
      </div>
    </div>
  );
};
