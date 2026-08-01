import React from 'react';
import {
  Activity,
  ArrowLeft,
  ChevronRight,
  Clock3,
  Headphones,
  Layers3,
  Moon,
  Play,
  Save,
  SlidersHorizontal,
  Sparkles,
  Target,
  Volume2,
} from 'lucide-react';
import { AMBIENCE_PRESETS, type BrainWaveType, type SessionPreset, getBrainWaveLabel } from '../../types';
import type { SoundLayer, ToneMode } from '../../services/audioEngine';
import type { MixVolumes } from '../../audioLevels';
import { WAVE_ORDER, getSoundIcon, getSoundLabel } from '../../audioOptions';
import { SoundLayerPicker } from '../SoundLayerPicker';
import { Toggle } from '../Toggle';
import { VolumeMixer } from '../VolumeMixer';
import { getAmbienceVisual, getPresetVisual } from '../app/catalog';

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
const artworkUrl = (path: string) => new URL(path, document.baseURI).toString();

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
  const ambience = preset.id.startsWith('amb:')
    ? AMBIENCE_PRESETS.find((item) => `amb:${item.id}` === preset.id)
    : null;
  const visual = ambience ? getAmbienceVisual(ambience) : getPresetVisual(preset);
  const label = ambience ? ambience.name : visual.text;

  return (
    <div className="mx-auto w-full max-w-[1340px] px-4 py-4 sm:px-6 sm:py-7 lg:px-9 lg:py-8">
      <button type="button" onClick={onBack} className="mb-4 flex min-h-10 items-center gap-2 rounded-full px-1 text-xs font-black text-slate-400 transition-colors hover:text-slate-950 dark:hover:text-white">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white shadow-sm dark:border-white/8 dark:bg-white/5"><ArrowLeft size={16} /></span>
        루틴으로 돌아가기
      </button>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_400px] xl:gap-7">
        <div className="space-y-5">
          <section className={`relative min-h-[270px] overflow-hidden rounded-[30px] bg-gradient-to-br ${visual.gradient} text-white shadow-[0_24px_65px_rgba(14,22,50,0.22)] sm:min-h-[340px]`}>
            {visual.artwork ? <img src={artworkUrl(visual.artwork)} alt="" decoding="async" width="1000" height="400" className="absolute inset-0 h-full w-full object-cover" /> : null}
            {ambience ? <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[150px] opacity-[0.13] sm:right-10 sm:text-[210px]" aria-hidden="true">{ambience.emoji}</div> : null}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050914]/90 via-[#050914]/46 to-transparent" />
            <div className="relative flex min-h-[270px] max-w-2xl flex-col justify-end p-6 sm:min-h-[340px] sm:p-8">
              <p className="text-[10px] font-black tracking-[0.17em] text-white/56">SESSION STUDIO</p>
              <h2 className="mt-2 text-[34px] font-black leading-none tracking-[-0.055em] sm:text-[48px]">{label}</h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/68">{preset.description}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-black text-white/72">
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md"><Clock3 size={12} /> {durationMinutes}분</span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md"><Activity size={12} /> {brainwaveEnabled ? getBrainWaveLabel(brainWave).split(' ')[0] : '뇌파음 없음'}</span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md"><Layers3 size={12} /> {layers.length}개 사운드</span>
              </div>
            </div>
          </section>

          <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/8 dark:bg-[#111621]" aria-labelledby="duration-title">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black tracking-[0.15em] text-slate-400">DURATION</p>
                <h3 id="duration-title" className="mt-1 text-base font-black tracking-[-0.025em] text-slate-950 dark:text-white">얼마나 이어갈까요?</h3>
              </div>
              <strong className="text-2xl font-black tabular-nums text-[#6878ed]">{durationMinutes}<span className="ml-1 text-xs">분</span></strong>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {DURATION_OPTIONS.map((minutes) => (
                <button key={minutes} type="button" onClick={() => onDurationChange(minutes)} aria-pressed={durationMinutes === minutes} className={`min-h-11 rounded-2xl text-xs font-black transition-all ${durationMinutes === minutes ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15 dark:bg-white dark:text-slate-950' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:bg-white/[0.035] dark:text-slate-400 dark:hover:bg-white/7 dark:hover:text-white'}`}>{minutes}분</button>
              ))}
            </div>
            <input type="range" min="5" max="120" step="5" value={durationMinutes} onChange={(event) => onDurationChange(Number(event.target.value))} aria-label="세션 시간" className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#7180ff] dark:bg-white/10" />
          </section>

          <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/8 dark:bg-[#111621]" aria-labelledby="brainwave-title">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black tracking-[0.15em] text-[#7180ef]">BRAINWAVE</p>
                <h3 id="brainwave-title" className="mt-1 text-base font-black tracking-[-0.025em] text-slate-950 dark:text-white">뇌파 레이어</h3>
              </div>
              <Toggle checked={brainwaveEnabled} onChange={onToggleBrainwave} label="뇌파음 사용" />
            </div>
            <div className={`mt-5 grid grid-cols-5 gap-1.5 transition-opacity ${brainwaveEnabled ? '' : 'pointer-events-none opacity-35'}`}>
              {WAVE_ORDER.map((wave) => (
                <button key={wave} type="button" disabled={!brainwaveEnabled} onClick={() => onWaveChange(wave)} aria-pressed={brainWave === wave} className={`min-h-12 rounded-2xl px-1 text-xs font-black transition-all ${brainWave === wave ? 'bg-[#6878ed] text-white shadow-lg shadow-[#7180ff]/20' : 'bg-slate-50 text-slate-500 hover:text-slate-950 dark:bg-white/[0.035] dark:text-slate-400 dark:hover:text-white'}`}>{getBrainWaveLabel(wave).split(' ')[0].replace('파', '')}</button>
              ))}
            </div>
            {brainwaveEnabled ? (
              <div className="mt-4 rounded-2xl bg-slate-50 p-1 dark:bg-white/[0.035]">
                <div className="grid grid-cols-2 gap-1">
                  {(['binaural', 'isochronic'] as ToneMode[]).map((mode) => (
                    <button key={mode} type="button" onClick={() => onToneModeChange(mode)} aria-pressed={toneMode === mode} className={`min-h-10 rounded-xl text-xs font-black transition-all ${toneMode === mode ? 'bg-white text-slate-950 shadow-sm dark:bg-white/10 dark:text-white' : 'text-slate-400'}`}>{mode === 'binaural' ? '바이노럴 · 헤드폰' : '아이소크로닉 · 스피커'}</button>
                  ))}
                </div>
              </div>
            ) : <p className="mt-4 text-xs text-slate-400">자연음과 노이즈 레이어만 재생합니다.</p>}
          </section>

          <details className="group rounded-[26px] border border-slate-200 bg-white shadow-sm dark:border-white/8 dark:bg-[#111621]">
            <summary className="flex min-h-[76px] cursor-pointer list-none items-center gap-3 px-5 sm:px-6">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/12 dark:text-emerald-300"><Volume2 size={18} /></span>
              <span className="min-w-0 flex-1">
                <strong className="block text-sm font-black text-slate-950 dark:text-white">환경음 레이어</strong>
                <span className="mt-1 flex gap-1.5 overflow-hidden text-[10px] font-bold text-slate-400">
                  {layers.length ? layers.slice(0, 4).map((layer) => <span key={layer.type} className="flex shrink-0 items-center gap-1">{getSoundIcon(layer.type)} {getSoundLabel(layer.type)}</span>) : '선택된 소리 없음'}
                </span>
              </span>
              <ChevronRight size={18} className="text-slate-300 transition-transform group-open:rotate-90" />
            </summary>
            <div className="border-t border-slate-100 px-5 py-5 sm:px-6 dark:border-white/7">
              <SoundLayerPicker activeLayers={layers} onToggle={onToggleLayer} onVolume={onLayerVolume} onBalance={onBalanceLayers} hideScene />
            </div>
          </details>

          <details className="group rounded-[26px] border border-slate-200 bg-white shadow-sm dark:border-white/8 dark:bg-[#111621]">
            <summary className="flex min-h-[76px] cursor-pointer list-none items-center gap-3 px-5 sm:px-6">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-500/12 dark:text-violet-300"><SlidersHorizontal size={18} /></span>
              <span className="min-w-0 flex-1">
                <strong className="block text-sm font-black text-slate-950 dark:text-white">전체 볼륨 밸런스</strong>
                <span className="mt-1 block text-[10px] font-bold text-slate-400">마스터 · 뇌파 · 환경음</span>
              </span>
              <ChevronRight size={18} className="text-slate-300 transition-transform group-open:rotate-90" />
            </summary>
            <div className="border-t border-slate-100 px-5 py-5 sm:px-6 dark:border-white/7">
              <VolumeMixer volumes={volumes} brainwaveEnabled={brainwaveEnabled} onChange={onMixChange} />
            </div>
          </details>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-[112px] lg:self-start">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_22px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#111621]">
            <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.14em] text-slate-400"><Sparkles size={13} className="text-[#7584ff]" /> SESSION SUMMARY</div>
            <dl className="mt-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm dark:border-white/7"><dt className="text-slate-400">시간</dt><dd className="font-black text-slate-950 dark:text-white">{durationMinutes}분</dd></div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm dark:border-white/7"><dt className="text-slate-400">뇌파</dt><dd className="font-black text-slate-950 dark:text-white">{brainwaveEnabled ? getBrainWaveLabel(brainWave).split(' ')[0] : '사용 안 함'}</dd></div>
              <div className="flex items-center justify-between text-sm"><dt className="text-slate-400">환경음</dt><dd className="font-black text-slate-950 dark:text-white">{layers.length}개</dd></div>
            </dl>

            <div className="mt-5 rounded-[20px] bg-slate-50 p-4 dark:bg-white/[0.035]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <strong className="flex items-center gap-2 text-xs font-black text-slate-800 dark:text-slate-100"><Moon size={14} className="text-indigo-400" /> 수면 종료</strong>
                  <p className="mt-1 text-[10px] leading-relaxed text-slate-400">알림 없이 12초 동안 서서히 줄어듭니다.</p>
                </div>
                <Toggle checked={sleepMode} onChange={onToggleSleepMode} label="수면 종료" />
              </div>
            </div>

            <button type="button" onClick={onStart} disabled={layers.length === 0 && !brainwaveEnabled} className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-[20px] bg-gradient-to-r from-[#6675ef] to-[#8a6ee8] text-sm font-black text-white shadow-xl shadow-indigo-500/24 transition-transform hover:scale-[1.01] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-40">
              <Play size={18} fill="currentColor" /> {durationMinutes}분 세션 시작
            </button>
            <button type="button" onClick={onSave} className="mt-2.5 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 text-xs font-black text-slate-500 transition-colors hover:text-slate-950 dark:border-white/8 dark:text-slate-400 dark:hover:text-white"><Save size={15} /> 내 루틴으로 저장</button>
            {brainwaveEnabled && toneMode === 'binaural' ? <p className="mt-3 flex items-start gap-2 text-[10px] leading-relaxed text-slate-400"><Headphones size={13} className="mt-0.5 shrink-0 text-[#7584ff]" /> 좌우 주파수 차이를 위해 스테레오 이어폰이나 헤드폰을 사용하세요.</p> : null}
          </section>

          {onIntentionChange ? (
            <section className="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-white/8 dark:bg-[#111621]">
              <label className="block">
                <span className="flex items-center gap-2 text-[10px] font-black tracking-[0.14em] text-slate-400"><Target size={13} className="text-[#7584ff]" /> SESSION INTENTION · 선택</span>
                <span className="mt-1 block text-sm font-black text-slate-950 dark:text-white">이번 시간에 남길 한 문장</span>
                <input value={intention} onChange={(event) => onIntentionChange(event.target.value)} maxLength={48} placeholder="예: 보고서 초안을 끝낸다" className="mt-3 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-xs font-semibold text-slate-950 outline-none transition focus:border-[#7180ef] focus:ring-4 focus:ring-[#7180ef]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-600" />
              </label>
            </section>
          ) : null}

          <section className="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-white/8 dark:bg-[#111621]">
            <p className="text-[10px] font-black tracking-[0.14em] text-slate-400">BEFORE SESSION · 선택</p>
            <h3 className="mt-1 text-sm font-black text-slate-950 dark:text-white">지금 컨디션은 어떤가요?</h3>
            <div className="mt-4 grid grid-cols-5 gap-1.5">
              {MOOD_LABELS.map((labelText, index) => {
                const score = index + 1;
                return <button key={labelText} type="button" onClick={() => onMoodBeforeChange(moodBefore === score ? null : score)} aria-pressed={moodBefore === score} aria-label={labelText} title={labelText} className={`grid aspect-square place-items-center rounded-2xl text-xs font-black transition-all ${moodBefore === score ? 'bg-[#6f7ff3] text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-50 text-slate-400 hover:text-slate-950 dark:bg-white/[0.035] dark:hover:text-white'}`}>{score}</button>;
              })}
            </div>
            <p className="mt-2 min-h-4 text-center text-[10px] font-bold text-slate-400">{moodBefore ? MOOD_LABELS[moodBefore - 1] : '건너뛰어도 괜찮아요'}</p>
          </section>
        </aside>
      </div>

      <div className="sticky bottom-[calc(84px+env(safe-area-inset-bottom))] z-20 mt-5 rounded-[22px] border border-white/10 bg-[#111725]/95 p-2.5 shadow-[0_18px_50px_rgba(8,12,25,0.35)] backdrop-blur-xl lg:hidden">
        <button type="button" onClick={onStart} disabled={layers.length === 0 && !brainwaveEnabled} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[17px] bg-white text-sm font-black text-slate-950 disabled:opacity-40"><Play size={17} fill="currentColor" /> {durationMinutes}분 시작</button>
      </div>
    </div>
  );
};
