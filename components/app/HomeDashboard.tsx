import React, { useMemo } from 'react';
import {
  AlarmClock,
  BarChart3,
  Brain,
  Clock3,
  Compass,
  Flame,
  Headphones,
  Leaf,
  Moon,
  Play,
  RotateCcw,
  Settings,
  Sparkles,
} from 'lucide-react';
import {
  NATURE_MIXES,
  PRESETS,
  type NatureMix,
  type SessionLog,
  type SessionPreset,
} from '../../types';
import {
  currentStreak,
  getGreeting,
  getPresetVisual,
  getTimeRecommendation,
  minutesOnDate,
} from './catalog';
import {
  displayPresetName,
  HOME_NATURE_MIX_IDS,
  HOME_NATURE_VISUALS,
  HOME_PRESET_IDS,
} from './homeLaunchers';

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
  onQuickStartNature: (mix: NatureMix) => void;
  onOpenLibrary: () => void;
  onOpenNature: () => void;
  onOpenInsights: () => void;
  onOpenSettings: () => void;
}

const artworkUrl = (path: string) => new URL(path, document.baseURI).toString();

const PRESET_ICONS = [Brain, Flame, Sparkles, Moon, AlarmClock, Headphones];
const HOME_PRESETS = HOME_PRESET_IDS
  .map((id) => PRESETS.find((preset) => preset.id === id))
  .filter(Boolean) as SessionPreset[];
const HOME_NATURE_MIXES = HOME_NATURE_MIX_IDS
  .map((id) => NATURE_MIXES.find((mix) => mix.id === id))
  .filter(Boolean) as NatureMix[];
const SHORTCUT_TONES = {
  indigo: 'bg-indigo-500/12 text-indigo-400',
  emerald: 'bg-emerald-500/12 text-emerald-400',
  cyan: 'bg-cyan-500/12 text-cyan-400',
  slate: 'bg-slate-500/18 text-slate-300',
} as const;

export const HomeDashboard: React.FC<Props> = ({
  logs,
  dailyGoalMinutes,
  lastSession,
  onResumeLast,
  onQuickStartPreset,
  onQuickStartNature,
  onOpenLibrary,
  onOpenNature,
  onOpenInsights,
  onOpenSettings,
}) => {
  const now = useMemo(() => new Date(), []);
  const recommended = getTimeRecommendation(now);
  const todayMinutes = minutesOnDate(logs, now);
  const streak = currentStreak(logs, now);
  const progress = Math.min(100, Math.round((todayMinutes / Math.max(1, dailyGoalMinutes)) * 100));
  const dayLabel = new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' }).format(now);
  const shortcuts = [
    { label: '루틴', detail: '전체 목록', Icon: Compass, tone: 'indigo', onClick: onOpenLibrary },
    { label: '자연', detail: '소리 조합', Icon: Leaf, tone: 'emerald', onClick: onOpenNature },
    { label: '리포트', detail: '기록 보기', Icon: BarChart3, tone: 'cyan', onClick: onOpenInsights },
    { label: '설정', detail: '앱 관리', Icon: Settings, tone: 'slate', onClick: onOpenSettings },
  ] as const;

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 sm:py-7 lg:px-9 lg:py-8">
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
        <div>
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500">{dayLabel}</p>
          <h2 className="mt-1 text-[28px] font-bold text-slate-950 sm:text-[34px] dark:text-white">
            {getGreeting(now)}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            원하는 리듬을 누르면 곧바로 시작됩니다.
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex dark:border-white/8 dark:bg-white/5">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600 dark:bg-indigo-500/12 dark:text-indigo-300">{progress}%</span>
          <div className="pr-1 text-[11px]">
            <strong className="block font-bold text-slate-900 dark:text-white">오늘 {todayMinutes}/{dailyGoalMinutes}분</strong>
            <span className="mt-0.5 block text-slate-400">{streak}일 연속</span>
          </div>
        </div>
      </div>

      <nav className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="홈 바로가기">
        {shortcuts.map(({ label, detail, Icon, tone, onClick }) => {
          return (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className="flex min-h-[78px] min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-2 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:min-h-[84px] sm:flex-row sm:justify-start sm:px-4 sm:text-left dark:border-white/8 dark:bg-white/[0.065] dark:hover:border-white/14 dark:hover:bg-white/[0.085]"
            >
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${SHORTCUT_TONES[tone]}`}><Icon size={18} /></span>
              <span className="min-w-0">
                <strong className="block truncate text-[11px] font-bold text-slate-900 sm:text-xs dark:text-white">{label}</strong>
                <span className="mt-0.5 hidden truncate text-[10px] text-slate-400 sm:block">{detail}</span>
              </span>
            </button>
          );
        })}
      </nav>

      <section className="mt-8" aria-labelledby="one-tap-title">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.17em] text-[#7180f0]">ONE TAP</p>
            <h3 id="one-tap-title" className="mt-1 text-xl font-bold text-slate-950 dark:text-white">한 번에 시작</h3>
          </div>
          <span className="text-right text-[10px] font-semibold text-slate-400">세부 화면 없이 바로 재생</span>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {HOME_PRESETS.map((preset, index) => {
            const visual = getPresetVisual(preset);
            const Icon = PRESET_ICONS[index];
            const isRecommended = preset.id === recommended.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onQuickStartPreset(preset)}
                aria-label={`${displayPresetName(preset.name)} ${preset.defaultDurationMinutes}분 바로 재생`}
                className="group relative min-h-[148px] overflow-hidden rounded-2xl bg-slate-900 p-4 text-left text-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                {visual.artwork ? (
                  <img
                    src={artworkUrl(visual.artwork)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="1000"
                    height="400"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/28 to-black/5" />
                <div className="relative flex h-full min-h-[116px] flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/14 backdrop-blur-md"><Icon size={17} /></span>
                    {isRecommended ? <span className="rounded-full bg-white/18 px-2.5 py-1 text-[9px] font-bold backdrop-blur-md">지금 추천</span> : null}
                  </div>
                  <div className="mt-auto pt-5">
                    <strong className="block truncate text-sm font-bold">{displayPresetName(preset.name)}</strong>
                    <span className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-white/68">
                      <Clock3 size={11} /> {preset.defaultDurationMinutes}분 <Play size={9} fill="currentColor" /> 바로 재생
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-9" aria-labelledby="nature-launch-title">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.17em] text-emerald-500">NATURE, INSTANTLY</p>
            <h3 id="nature-launch-title" className="mt-1 text-xl font-bold text-slate-950 dark:text-white">자연 장면 바로 열기</h3>
          </div>
          <span className="text-right text-[10px] font-semibold text-slate-400">탭하면 장면과 소리가 함께 시작</span>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {HOME_NATURE_MIXES.map((mix) => (
            <button
              key={mix.id}
              type="button"
              onClick={() => onQuickStartNature(mix)}
              aria-label={`${mix.name} 자연 장면 바로 재생`}
              className={`group relative min-h-[122px] overflow-hidden rounded-2xl bg-gradient-to-br ${HOME_NATURE_VISUALS[mix.id as keyof typeof HOME_NATURE_VISUALS]} p-4 text-left text-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300`}
            >
              <span className="absolute right-0 top-3 grid gap-2 opacity-25" aria-hidden="true">
                {[0, 1, 2, 3].map((line) => <i key={line} className="block h-1.5 w-14 bg-white" />)}
              </span>
              <div className="relative flex h-full min-h-[90px] flex-col">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/13 backdrop-blur-sm"><Leaf size={17} /></span>
                <div className="mt-auto pt-5">
                  <strong className="block truncate text-sm font-bold">{mix.name}</strong>
                  <span className="mt-1 flex items-center gap-1 text-[10px] font-bold text-white/68"><Play size={9} fill="currentColor" /> 바로 재생</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-9 grid gap-4 lg:grid-cols-2" aria-label="오늘의 기록과 최근 구성">
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-white/[0.045]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em] text-slate-400">TODAY</p>
              <h3 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">오늘의 리듬</h3>
              <p className="mt-2 text-xs text-slate-400">{progress >= 100 ? '오늘 목표를 채웠어요.' : `${Math.max(0, dailyGoalMinutes - todayMinutes)}분이면 오늘 목표를 채워요.`}</p>
            </div>
            <strong className="text-2xl font-bold tabular-nums text-indigo-500">{todayMinutes}<span className="ml-1 text-[10px] text-slate-400">/{dailyGoalMinutes}분</span></strong>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/8">
            <div className="h-full rounded-full bg-indigo-500 transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
        </article>

        {lastSession ? (
          <button
            type="button"
            onClick={onResumeLast}
            className="group flex min-h-[132px] items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/8 dark:bg-white/[0.045]"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-indigo-500/12 text-indigo-400"><RotateCcw size={20} /></span>
            <span className="min-w-0 flex-1">
              <span className="text-[10px] font-bold tracking-[0.15em] text-slate-400">RECENT · 바로 재생</span>
              <strong className="mt-1 block truncate text-base font-bold text-slate-950 dark:text-white">{displayPresetName(lastSession.name)}</strong>
              <span className="mt-1 block truncate text-[10px] text-slate-400">{lastSession.waveLabel} · {lastSession.durationMinutes}분 · 사운드 {lastSession.layerCount}개</span>
            </span>
            <Play size={17} className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5" fill="currentColor" />
          </button>
        ) : (
          <div className="flex min-h-[132px] items-center gap-4 rounded-3xl border border-dashed border-slate-200 p-5 dark:border-white/10">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-indigo-500/12 text-indigo-400"><Headphones size={20} /></span>
            <div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">첫 리듬을 시작해 보세요</h3>
              <p className="mt-1 text-xs text-slate-400">최근 구성은 다음부터 여기서 바로 재생할 수 있어요.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
