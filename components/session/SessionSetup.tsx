import React, { useDeferredValue, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Clock3,
  Headphones,
  Layers3,
  Moon,
  Play,
  RotateCcw,
  Save,
  Search,
  SlidersHorizontal,
  Sparkles,
  Target,
  Volume2,
  X,
} from 'lucide-react';
import { type BrainWaveType, type SessionPreset } from '../../types';
import type { SoundLayer, ToneMode } from '../../services/audioEngine';
import { DEFAULT_MIX_VOLUMES, MAX_LAYER_VOLUME, MIX_PROFILES, type MixVolumes } from '../../audioLevels';
import { SOUND_GROUPS, WAVE_ORDER, getSoundIcon, getSoundLabel, getWaveShortLabel } from '../../audioOptions';
import { Toggle } from '../Toggle';
import { VolumeSlider } from '../VolumeSlider';

interface Props {
  preset: SessionPreset;
  durationMinutes: number;
  brainWave: BrainWaveType;
  brainwaveEnabled: boolean;
  toneMode: ToneMode;
  layers: SoundLayer[];
  volumes: MixVolumes;
  sleepMode: boolean;
  moodBefore: number | null;
  intention?: string;
  onBack: () => void;
  onStart: () => void;
  onDurationChange: (minutes: number) => void;
  onWaveChange: (wave: BrainWaveType) => void;
  onToggleBrainwave: () => void;
  onToneModeChange: (mode: ToneMode) => void;
  onToggleLayer: (type: SoundLayer['type']) => void;
  onLayerVolume: (type: SoundLayer['type'], volume: number) => void;
  onBalanceLayers: () => void;
  onMixChange: (volumes: MixVolumes) => void;
  onToggleSleepMode: () => void;
  onMoodBeforeChange: (score: number | null) => void;
  onIntentionChange?: (value: string) => void;
  onSave: () => void;
}

const DURATION_OPTIONS = [10, 20, 30, 40, 60, 90];
const MOOD_LABELS = ['많이 지침', '지침', '보통', '좋음', '아주 좋음'];
type MobilePane = 'library' | 'mix';

export const SessionSetup: React.FC<Props> = ({
  preset,
  durationMinutes,
  brainWave,
  brainwaveEnabled,
  toneMode,
  layers,
  volumes,
  sleepMode,
  moodBefore,
  intention = '',
  onBack,
  onStart,
  onDurationChange,
  onWaveChange,
  onToggleBrainwave,
  onToneModeChange,
  onToggleLayer,
  onLayerVolume,
  onBalanceLayers,
  onMixChange,
  onToggleSleepMode,
  onMoodBeforeChange,
  onIntentionChange,
  onSave,
}) => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase('ko-KR'));
  const [group, setGroup] = useState('전체');
  const [mobilePane, setMobilePane] = useState<MobilePane>('library');
  const sessionName = preset.name.replace(/\s*\([^)]*\)/, '');
  const canStart = layers.length > 0 || brainwaveEnabled;

  const visibleSounds = useMemo(() => SOUND_GROUPS.flatMap((soundGroup) => (
    soundGroup.sounds.map((sound) => ({ sound, group: soundGroup.label }))
  )).filter(({ sound, group: soundGroup }) => {
    const matchesGroup = group === '전체' || group === soundGroup;
    const matchesQuery = !deferredQuery || `${getSoundLabel(sound)} ${soundGroup}`.toLocaleLowerCase('ko-KR').includes(deferredQuery);
    return matchesGroup && matchesQuery;
  }), [deferredQuery, group]);

  const isActive = (type: SoundLayer['type']) => layers.some((layer) => layer.type === type);
  const resetMix = () => {
    onBalanceLayers();
    onMixChange(DEFAULT_MIX_VOLUMES);
  };

  return (
    <div className="mx-auto w-full max-w-[1680px] px-3 py-4 pb-16 sm:px-6 sm:py-6 sm:pb-16 lg:px-8 lg:py-7">
      <header className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-white/10">
        <button type="button" onClick={onBack} aria-label="사운드 홈으로 돌아가기" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white/42 text-slate-500 transition-colors hover:bg-white hover:text-primary-900 dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-400 dark:hover:bg-white/9 dark:hover:text-white">
          <ArrowLeft size={18} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-black tracking-[0.17em] text-slate-500 dark:text-primary-400">SOUND WORKSPACE</p>
          <h1 className="mt-0.5 truncate text-xl font-semibold tracking-[-0.035em] text-primary-900 sm:text-2xl dark:text-amber-100">{sessionName}</h1>
        </div>
        <span className="hidden max-w-[420px] truncate text-[11px] text-slate-500 lg:block dark:text-slate-500">{preset.description}</span>
        <button type="button" onClick={onSave} className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-primary-400/30 bg-slate-100 px-3.5 text-xs font-bold text-primary-700 transition-colors hover:bg-primary-100 dark:border-primary-400/30 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-900">
          <Save size={15} /> <span className="hidden sm:inline">저장하기</span>
        </button>
      </header>

      <section className="mt-4 grid overflow-hidden rounded-2xl border border-slate-200 bg-white/38 dark:border-white/10 dark:bg-white/[0.025] lg:grid-cols-[0.72fr_1.3fr_0.9fr]" aria-label="세션 기본 설정">
        <div className="border-b border-slate-200 p-4 dark:border-white/8 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-[10px] font-black tracking-[0.11em] text-slate-500"><Clock3 size={14} className="text-amber-500" /> 지속 시간</span>
            <strong className="text-lg font-semibold tabular-nums text-slate-900 dark:text-amber-100">{durationMinutes}<span className="ml-0.5 text-[10px]">분</span></strong>
          </div>
          <input type="range" min="5" max="120" step="5" value={durationMinutes} onChange={(event) => onDurationChange(Number(event.target.value))} aria-label="세션 시간" className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-100 accent-primary-500 dark:bg-white/10" />
          <div className="mt-2 flex gap-1 overflow-x-auto pb-0.5 scrollbar-hide">
            {DURATION_OPTIONS.map((minutes) => (
              <button key={minutes} type="button" onClick={() => onDurationChange(minutes)} aria-pressed={durationMinutes === minutes} className={`min-h-11 min-w-11 shrink-0 rounded-lg px-2 text-[10px] font-bold transition-colors ${durationMinutes === minutes ? 'bg-primary-900 text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900 dark:bg-white/[0.045] dark:text-slate-500 dark:hover:text-white'}`}>{minutes}</button>
            ))}
          </div>
        </div>

        <div className="border-b border-slate-200 p-4 dark:border-white/8 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-[10px] font-black tracking-[0.11em] text-slate-500"><Headphones size={14} className="text-primary-500" /> 뇌파 레이어</span>
            <Toggle checked={brainwaveEnabled} onChange={onToggleBrainwave} label="뇌파음 사용" />
          </div>
          <div className={`mt-2 grid grid-cols-5 gap-1 transition-opacity ${brainwaveEnabled ? '' : 'pointer-events-none opacity-35'}`}>
            {WAVE_ORDER.map((wave) => (
              <button key={wave} type="button" disabled={!brainwaveEnabled} onClick={() => onWaveChange(wave)} aria-pressed={brainWave === wave} className={`min-h-11 rounded-lg px-1 text-[10px] font-bold transition-colors ${brainWave === wave ? 'bg-primary-900 text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900 dark:bg-white/[0.045] dark:text-slate-500 dark:hover:text-white'}`}>{getWaveShortLabel(wave)}</button>
            ))}
          </div>
        </div>

        <div className={`p-4 transition-opacity ${brainwaveEnabled ? '' : 'pointer-events-none opacity-35'}`}>
          <span className="flex items-center gap-2 text-[10px] font-black tracking-[0.11em] text-slate-500"><SlidersHorizontal size={14} className="text-amber-500" /> 재생 방식</span>
          <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-white/[0.045]">
            {(['binaural', 'isochronic'] as ToneMode[]).map((mode) => (
              <button key={mode} type="button" disabled={!brainwaveEnabled} onClick={() => onToneModeChange(mode)} aria-pressed={toneMode === mode} className={`min-h-11 rounded-lg text-[10px] font-bold transition-colors ${toneMode === mode ? 'bg-slate-950 text-amber-100 shadow-sm dark:bg-slate-100 dark:text-primary-900' : 'text-slate-500 dark:text-slate-500'}`}>{mode === 'binaural' ? '바이노럴 · 헤드폰' : '아이소크로닉 · 스피커'}</button>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-white/32 p-1 lg:hidden dark:border-white/10 dark:bg-white/[0.025]" role="tablist" aria-label="모바일 편집 화면">
        <button type="button" role="tab" aria-selected={mobilePane === 'library'} onClick={() => setMobilePane('library')} className={`min-h-11 rounded-lg text-xs font-bold ${mobilePane === 'library' ? 'bg-primary-900 text-white' : 'text-slate-500 dark:text-slate-500'}`}>사운드 선택</button>
        <button type="button" role="tab" aria-selected={mobilePane === 'mix'} onClick={() => setMobilePane('mix')} className={`flex min-h-11 items-center justify-center gap-2 rounded-lg text-xs font-bold ${mobilePane === 'mix' ? 'bg-primary-900 text-white' : 'text-slate-500 dark:text-slate-500'}`}>현재 믹스 <span className="rounded-full bg-black/10 px-1.5 py-0.5 text-[9px]">{layers.length + (brainwaveEnabled ? 1 : 0)}</span></button>
      </div>

      <div className="mt-4 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(410px,1.05fr)]">
        <section className={`${mobilePane === 'library' ? 'block' : 'hidden'} min-w-0 rounded-2xl border border-slate-200 bg-white/42 p-4 sm:p-5 lg:block dark:border-white/10 dark:bg-white/[0.03]`} aria-labelledby="sound-library-title">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-black tracking-[0.16em] text-slate-500 dark:text-primary-400">SOUND LIBRARY</p>
              <h2 id="sound-library-title" className="mt-1 text-lg font-semibold text-slate-900 dark:text-amber-100">사운드 라이브러리</h2>
            </div>
            <span className="text-[10px] font-bold text-slate-500">{layers.length}개 선택</span>
          </div>

          <label className="relative mt-4 block">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <span className="sr-only">환경음 검색</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="빗소리, 새소리, 노이즈 검색" className="routine-search-input h-11 w-full rounded-xl border border-slate-200 bg-amber-50 pl-10 pr-11 text-xs font-semibold text-slate-900 outline-none transition-all focus:border-primary-400/30 focus:ring-4 focus:ring-primary-500/10 dark:border-white/9 dark:bg-white/[0.045] dark:text-amber-100 dark:placeholder:text-slate-500" />
            {query ? <button type="button" onClick={() => setQuery('')} aria-label="검색어 지우기" className="absolute right-0 top-0 grid h-11 w-11 place-items-center text-slate-400"><X size={15} /></button> : null}
          </label>

          <div className="mt-3 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-amber-50 p-1 scrollbar-hide dark:border-white/8 dark:bg-white/[0.025]" role="group" aria-label="사운드 분류">
            {['전체', ...SOUND_GROUPS.map((item) => item.label)].map((label) => (
              <button key={label} type="button" onClick={() => setGroup(label)} aria-pressed={group === label} className={`min-h-11 shrink-0 rounded-lg px-3 text-[10px] font-bold transition-colors ${group === label ? 'bg-primary-900 text-white' : 'text-slate-500 hover:bg-white/65 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-white/7 dark:hover:text-white'}`}>{label}</button>
            ))}
          </div>

          {visibleSounds.length ? (
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 xl:grid-cols-5">
              {visibleSounds.map(({ sound, group: soundGroup }) => {
                const active = isActive(sound);
                return (
                  <button
                    key={sound}
                    type="button"
                    onClick={() => onToggleLayer(sound)}
                    aria-pressed={active}
                    className={`relative flex min-h-[78px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-2 text-center transition-all active:scale-[0.98] ${active
                      ? 'border-primary-400/30 bg-primary-100 text-primary-700 shadow-sm dark:border-primary-400/30 dark:bg-primary-900 dark:text-primary-300'
                      : 'border-slate-200 bg-amber-50 text-slate-500 hover:border-primary-400/30 hover:bg-slate-100 hover:text-primary-900 dark:border-white/7 dark:bg-white/[0.035] dark:text-slate-500 dark:hover:border-white/13 dark:hover:bg-white/7 dark:hover:text-amber-100'}`}
                  >
                    {active ? <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-primary-900 text-white"><Check size={10} strokeWidth={3} /></span> : null}
                    <span className="[&>svg]:h-[19px] [&>svg]:w-[19px]">{getSoundIcon(sound)}</span>
                    <span className="max-w-full truncate text-[10px] font-bold">{getSoundLabel(sound)}</span>
                    <span className="text-[8px] font-semibold opacity-55">{soundGroup}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 grid min-h-[250px] place-items-center rounded-xl border border-dashed border-slate-200 text-center dark:border-white/10">
              <div><Search size={24} className="mx-auto text-slate-400" /><p className="mt-2 text-xs font-bold text-slate-500">일치하는 사운드가 없어요</p></div>
            </div>
          )}
        </section>

        <section className={`${mobilePane === 'mix' ? 'block' : 'hidden'} dark min-w-0 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-amber-100 shadow-lg sm:p-5 lg:block dark:border-white/10 dark:bg-primary-900`} aria-labelledby="current-mix-title">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[9px] font-black tracking-[0.16em] text-slate-400">LIVE MIX</p>
              <h2 id="current-mix-title" className="mt-1 flex items-center gap-2 text-lg font-semibold"><Sparkles size={16} className="text-amber-400" /> 현재 믹스</h2>
            </div>
            <div className="flex gap-1.5">
              <button type="button" onClick={onBalanceLayers} className="flex min-h-11 items-center gap-1.5 rounded-xl border border-white/10 px-3 text-[10px] font-bold text-slate-300 transition-colors hover:bg-white/7 hover:text-white"><SlidersHorizontal size={13} /> 추천 밸런스</button>
              <button type="button" onClick={resetMix} aria-label="믹스 초기화" className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-slate-400 transition-colors hover:bg-white/7 hover:text-white"><RotateCcw size={14} /></button>
            </div>
          </div>

          <div className="mt-4 space-y-2.5" aria-live="polite">
            {brainwaveEnabled ? (
              <article className="rounded-xl border border-primary-400/30 bg-primary-700/50 p-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-900 text-primary-100"><Headphones size={18} /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="truncate text-xs font-bold">뇌파음 · {getWaveShortLabel(brainWave)}</strong>
                      <span className="text-[9px] font-bold text-slate-400">{toneMode === 'binaural' ? '헤드폰' : '스피커'}</span>
                    </div>
                    <VolumeSlider label="" ariaLabel="뇌파음 음량" value={volumes.binaural} onChange={(value) => onMixChange({ ...volumes, binaural: value })} />
                  </div>
                  <button type="button" onClick={onToggleBrainwave} aria-label="뇌파음 제거" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 text-slate-400 transition-colors hover:bg-red-500/12 hover:text-red-200"><X size={16} /></button>
                </div>
              </article>
            ) : null}

            {layers.map((layer) => (
              <article key={layer.type} className="rounded-xl border border-white/9 bg-white/[0.035] p-3 transition-colors hover:border-primary-400/30">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-900 text-primary-300 [&>svg]:h-[18px] [&>svg]:w-[18px]">{getSoundIcon(layer.type)}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="truncate text-xs font-bold">{getSoundLabel(layer.type)}</strong>
                      <span className="text-[9px] font-bold text-slate-500">환경음</span>
                    </div>
                    <VolumeSlider label="" ariaLabel={`${getSoundLabel(layer.type)} 음량`} value={layer.volume} max={MAX_LAYER_VOLUME} onChange={(value) => onLayerVolume(layer.type, value)} />
                  </div>
                  <button type="button" onClick={() => onToggleLayer(layer.type)} aria-label={`${getSoundLabel(layer.type)} 제거`} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 text-slate-400 transition-colors hover:bg-red-500/12 hover:text-red-200"><X size={16} /></button>
                </div>
              </article>
            ))}

            {!brainwaveEnabled && layers.length === 0 ? (
              <div className="grid min-h-[160px] place-items-center rounded-xl border border-dashed border-white/12 text-center">
                <div className="px-5"><Layers3 size={24} className="mx-auto text-slate-500" /><p className="mt-2 text-xs font-bold text-slate-400">아직 선택한 소리가 없어요</p><p className="mt-1 text-[10px] text-slate-500">사운드 라이브러리에서 원하는 소리를 추가하세요.</p></div>
              </div>
            ) : null}
          </div>

          <div className="mt-4 rounded-xl border border-white/9 bg-black/12 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-[10px] font-black tracking-[0.12em] text-slate-400"><Volume2 size={14} className="text-amber-400" /> MIX BUS</p>
              <div className="flex gap-1" role="group" aria-label="볼륨 프리셋">
                {MIX_PROFILES.map((profile) => (
                  <button key={profile.id} type="button" title={profile.description} onClick={() => onMixChange(profile.volumes)} className="min-h-11 rounded-lg border border-white/9 px-2.5 text-[9px] font-bold text-slate-400 transition-colors hover:bg-white/7 hover:text-white">{profile.label}</button>
                ))}
              </div>
            </div>
            <div className="mt-2">
              <VolumeSlider label="환경음 전체" value={volumes.bg} onChange={(value) => onMixChange({ ...volumes, bg: value })} />
              <VolumeSlider label="전체 볼륨" value={volumes.master} emphasized onChange={(value) => onMixChange({ ...volumes, master: value })} />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-4 rounded-xl border border-white/9 bg-white/[0.03] px-4 py-3">
            <div>
              <strong className="flex items-center gap-2 text-xs font-bold"><Moon size={14} className="text-amber-400" /> 수면 종료</strong>
              <p className="mt-1 text-[9px] leading-relaxed text-slate-500">시간이 끝나면 12초 동안 부드럽게 줄어듭니다.</p>
            </div>
            <Toggle checked={sleepMode} onChange={onToggleSleepMode} label="수면 종료" />
          </div>

          {(onIntentionChange || moodBefore != null) ? (
            <details className="group mt-3 rounded-xl border border-white/9 bg-white/[0.025]">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-[10px] font-bold text-slate-400">
                <span className="flex items-center gap-2"><Target size={13} /> 메모·컨디션 <span className="font-normal text-slate-500">선택</span></span>
                <span className="transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="border-t border-white/8 p-4">
                {onIntentionChange ? (
                  <label className="block">
                    <span className="text-[10px] font-bold text-slate-400">이번 시간에 남길 한 문장</span>
                    <input value={intention} onChange={(event) => onIntentionChange(event.target.value)} maxLength={48} placeholder="예: 보고서 초안을 끝낸다" className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/12 px-3 text-xs font-semibold text-white outline-none transition focus:border-primary-400/30 focus:ring-4 focus:ring-primary-500/10 placeholder:text-slate-500" />
                  </label>
                ) : null}
                <div className="mt-4">
                  <p className="text-[10px] font-bold text-slate-400">지금 컨디션</p>
                  <div className="mt-2 grid grid-cols-5 gap-1.5">
                    {MOOD_LABELS.map((labelText, index) => {
                      const score = index + 1;
                      return <button key={labelText} type="button" onClick={() => onMoodBeforeChange(moodBefore === score ? null : score)} aria-pressed={moodBefore === score} aria-label={labelText} className={`min-h-11 rounded-lg text-[10px] font-bold transition-colors ${moodBefore === score ? 'bg-primary-700 text-white' : 'bg-white/[0.045] text-slate-500 hover:text-white'}`}>{score}</button>;
                    })}
                  </div>
                </div>
              </div>
            </details>
          ) : null}

          {brainwaveEnabled && toneMode === 'binaural' ? <p className="mt-3 flex items-start gap-2 text-[9px] leading-relaxed text-slate-500"><Headphones size={12} className="mt-0.5 shrink-0 text-slate-400" /> 좌우 주파수 차이를 위해 스테레오 이어폰이나 헤드폰을 사용하세요.</p> : null}

          <button type="button" onClick={onStart} disabled={!canStart} className="mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary-700 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-700 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40">
            <Play size={18} fill="currentColor" /> {durationMinutes}분 세션 시작
          </button>
        </section>
      </div>

      <div className="fixed inset-x-3 bottom-[calc(72px+env(safe-area-inset-bottom))] z-30 lg:hidden">
        {mobilePane === 'library' ? (
          <button type="button" onClick={() => setMobilePane('mix')} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950/95 text-xs font-bold text-amber-100 shadow-xl backdrop-blur-md"><Layers3 size={15} /> 현재 믹스 {layers.length + (brainwaveEnabled ? 1 : 0)}개 보기</button>
        ) : (
          <button type="button" onClick={onStart} disabled={!canStart} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-700 text-xs font-bold text-white shadow-xl disabled:opacity-40"><Play size={15} fill="currentColor" /> {durationMinutes}분 시작</button>
        )}
      </div>
    </div>
  );
};
