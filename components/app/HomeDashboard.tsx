import React, { useMemo } from 'react';
import {
  ArrowRight,
  Brain,
  Clock3,
  Flame,
  Headphones,
  Leaf,
  Play,
  RotateCcw,
  Sparkles,
  TimerReset,
} from 'lucide-react';
import {
  PRESETS,
  type AmbiencePreset,
  type SessionLog,
  type SessionPreset,
} from '../../types';
import {
  FEATURED_AMBIENCES,
  currentStreak,
  getAmbienceVisual,
  getGreeting,
  getPresetVisual,
  getTimeRecommendation,
  minutesOnDate,
} from './catalog';

export interface LastSessionSummary {
  name: string;
  durationMinutes: number;
  brainwaveEnabled: boolean;
  layerCount: number;
  waveLabel: string;
}

interface Props {
  logs: SessionLog[];
  dailyGoalMinutes: number;
  lastSession: LastSessionSummary | null;
  onResumeLast: () => void;
  onQuickStartPreset: (preset: SessionPreset) => void;
  onConfigurePreset: (preset: SessionPreset) => void;
  onQuickStartAmbience: (preset: AmbiencePreset) => void;
  onOpenLibrary: () => void;
  onOpenNature: () => void;
}

const artworkUrl = (path: string) => new URL(path, document.baseURI).toString();

const QUICK_IDS = ['focus', 'relax', 'power_nap', 'sleep_prep'];
const QUICK_ICONS = [Brain, Sparkles, TimerReset, Clock3];

export const HomeDashboard: React.FC<Props> = ({
  logs,
  dailyGoalMinutes,
  lastSession,
  onResumeLast,
  onQuickStartPreset,
  onConfigurePreset,
  onQuickStartAmbience,
  onOpenLibrary,
  onOpenNature,
}) => {
  const now = useMemo(() => new Date(), []);
  const recommended = getTimeRecommendation(now);
  const visual = getPresetVisual(recommended);
  const todayMinutes = minutesOnDate(logs, now);
  const streak = currentStreak(logs, now);
  const progress = Math.min(100, Math.round((todayMinutes / Math.max(1, dailyGoalMinutes)) * 100));
  const quickPresets = QUICK_IDS.map((id) => PRESETS.find((preset) => preset.id === id)).filter(Boolean) as SessionPreset[];
  const dayLabel = new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' }).format(now);

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 sm:py-7 lg:px-9 lg:py-8">
      <div className="mb-6 flex items-end justify-between gap-4 lg:mb-8">
        <div>
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500">{dayLabel}</p>
          <h2 className="mt-1 text-[28px] font-bold text-slate-950 sm:text-[34px] dark:text-white">
            {getGreeting(now)}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            지금 상태에 맞는 소리로 하루의 리듬을 정돈해 보세요.
          </p>
        </div>
        <button type="button" onClick={onOpenLibrary} className="hidden min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:flex dark:border-white/8 dark:bg-white/5 dark:text-slate-200">
          전체 루틴 <ArrowRight size={15} />
        </button>
      </div>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.7fr)]" aria-label="오늘의 추천">
        <article className={`group relative min-h-[390px] overflow-hidden rounded-3xl bg-gradient-to-br ${visual.gradient} text-white shadow-2xl shadow-slate-900/20 sm:min-h-[430px]`}>
          {visual.artwork ? (
            <img
              src={artworkUrl(visual.artwork)}
              alt=""
              width="1000"
              height="400"
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050914]/92 via-[#050914]/54 to-[#050914]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050914]/76 via-transparent to-transparent" />
          <div className="relative flex min-h-[390px] flex-col p-6 sm:min-h-[430px] sm:p-9">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-white/16 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] backdrop-blur-md">지금 추천</span>
              <span className="flex items-center gap-1.5 rounded-full bg-black/22 px-3 py-1.5 text-[11px] font-bold backdrop-blur-md"><Headphones size={13} /> {recommended.defaultDurationMinutes}분</span>
            </div>
            <div className="mt-auto max-w-xl">
              <p className="text-xs font-bold tracking-[0.14em] text-white/62">{visual.eyebrow}</p>
              <h3 className="mt-2 text-[36px] font-bold leading-[1.03] sm:text-[52px]">{visual.text}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/72 sm:text-base">{recommended.description}</p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => onQuickStartPreset(recommended)}
                  className="flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-slate-950 shadow-xl shadow-black/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Play size={17} fill="currentColor" /> 바로 시작
                </button>
                <button
                  type="button"
                  onClick={() => onConfigurePreset(recommended)}
                  className="min-h-12 rounded-full border border-white/20 bg-white/9 px-5 text-sm font-extrabold text-white backdrop-blur-md transition-colors hover:bg-white/15"
                >
                  세부 조정
                </button>
              </div>
            </div>
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <article className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-[#111621]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400">TODAY</p>
                <h3 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">오늘의 리듬</h3>
              </div>
              <div
                className="grid h-[82px] w-[82px] shrink-0 place-items-center rounded-full"
                style={{ background: `conic-gradient(#7180ff ${progress * 3.6}deg, ${progress ? '#e8ebf2' : '#e8ebf2'} 0deg)` }}
              >
                <div className="grid h-[66px] w-[66px] place-items-center rounded-full bg-white text-center dark:bg-[#111621]">
                  <div>
                    <strong className="block text-lg font-bold tabular-nums text-slate-950 dark:text-white">{todayMinutes}</strong>
                    <span className="block text-[9px] font-bold text-slate-400">/{dailyGoalMinutes}분</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/[0.035]">
                <Flame size={15} className="text-orange-400" />
                <strong className="mt-2 block text-lg font-bold text-slate-950 dark:text-white">{streak}일</strong>
                <span className="text-[10px] font-semibold text-slate-400">연속 기록</span>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/[0.035]">
                <Sparkles size={15} className="text-violet-400" />
                <strong className="mt-2 block text-lg font-bold text-slate-950 dark:text-white">{logs.length}회</strong>
                <span className="text-[10px] font-semibold text-slate-400">완료 세션</span>
              </div>
            </div>
          </article>

          <article className="flex min-h-[184px] flex-col rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-[#111621]">
            {lastSession ? (
              <>
                <div className="flex items-start justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/12 dark:text-indigo-300"><RotateCcw size={18} /></span>
                  <span className="text-[10px] font-bold tracking-[0.13em] text-slate-400">RECENT</span>
                </div>
                <div className="mt-auto">
                  <h3 className="truncate text-lg font-bold text-slate-950 dark:text-white">{lastSession.name}</h3>
                  <p className="mt-1 truncate text-[11px] font-semibold text-slate-400">{lastSession.waveLabel} · {lastSession.durationMinutes}분 · {lastSession.layerCount}개 사운드</p>
                  <button type="button" onClick={onResumeLast} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-3 text-xs font-bold text-white transition-transform active:scale-[0.99] dark:bg-white dark:text-slate-950">
                    <Play size={14} fill="currentColor" /> 이 구성 다시 열기
                  </button>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-start justify-center">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/12 dark:text-indigo-300"><Headphones size={18} /></span>
                <h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">첫 루틴을 시작해 보세요</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">사용한 조합은 기기에 저장되어 다음에 바로 이어갈 수 있어요.</p>
              </div>
            )}
          </article>
        </div>
      </section>

      <section className="mt-9" aria-labelledby="quick-title">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-[#7180f0]">QUICK START</p>
            <h3 id="quick-title" className="mt-1 text-xl font-bold text-slate-950 dark:text-white">지금 필요한 리듬</h3>
          </div>
          <button type="button" onClick={onOpenLibrary} className="-mr-2 flex min-h-11 items-center gap-1 rounded-xl px-2 text-xs font-extrabold text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/5 dark:hover:text-white">모두 보기 <ArrowRight size={14} /></button>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {quickPresets.map((preset, index) => {
            const itemVisual = getPresetVisual(preset);
            const Icon = QUICK_ICONS[index];
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onQuickStartPreset(preset)}
                className="group relative min-h-[156px] overflow-hidden rounded-2xl bg-slate-900 p-4 text-left text-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                {itemVisual.artwork ? <img src={artworkUrl(itemVisual.artwork)} alt="" loading="lazy" decoding="async" width="1000" height="400" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/34 to-black/10" />
                <span className="relative grid h-9 w-9 place-items-center rounded-2xl bg-white/13 backdrop-blur-md"><Icon size={17} /></span>
                <div className="relative mt-8">
                  <strong className="block text-sm font-bold">{itemVisual.text}</strong>
                  <span className="mt-1 block text-[10px] font-bold text-white/62">{preset.defaultDurationMinutes}분 · {itemVisual.eyebrow}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-9" aria-labelledby="soundscape-title">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-emerald-500">SOUNDSCAPES</p>
            <h3 id="soundscape-title" className="mt-1 text-xl font-bold text-slate-950 dark:text-white">소리로 공간 바꾸기</h3>
          </div>
          <button type="button" onClick={onOpenNature} className="-mr-2 flex min-h-11 items-center gap-1 rounded-xl px-2 text-xs font-extrabold text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-500/8 dark:hover:text-emerald-300"><Leaf size={13} /> 자연 스튜디오</button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURED_AMBIENCES.map((preset) => {
            const itemVisual = getAmbienceVisual(preset);
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onQuickStartAmbience(preset)}
                className={`group relative min-h-[154px] overflow-hidden rounded-2xl bg-gradient-to-br ${itemVisual.gradient} p-5 text-left text-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="absolute -right-6 -top-7 text-[92px] opacity-16 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" aria-hidden="true">{preset.emoji}</div>
                <div className="relative flex h-full flex-col">
                  <span className="text-2xl" aria-hidden="true">{preset.emoji}</span>
                  <div className="mt-auto pt-7">
                    <strong className="block text-base font-bold">{preset.name}</strong>
                    <span className="mt-1 block text-[10px] font-bold text-white/65">{itemVisual.eyebrow}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
