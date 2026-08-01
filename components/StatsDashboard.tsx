import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Clock3,
  Flame,
  Play,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import type { SessionLog } from '../types';

interface Props {
  logs: SessionLog[];
  dailyGoalMinutes?: number;
  onStartSession?: () => void;
}

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

const fmtTotal = (minutes: number) => {
  if (minutes < 60) return `${minutes}분`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}시간 ${rest}분` : `${hours}시간`;
};
export const StatsDashboard: React.FC<Props> = ({ logs, dailyGoalMinutes = 30, onStartSession }) => {
  const [period, setPeriod] = useState<7 | 30>(7);

  const stats = useMemo(() => {
    const byDay = new Map<string, number>();
    logs.forEach((log) => {
      const key = new Date(log.startedAt).toDateString();
      byDay.set(key, (byDay.get(key) ?? 0) + log.durationMinutes);
    });

    const today = new Date();
    const todayMinutes = byDay.get(today.toDateString()) ?? 0;
    let streak = 0;
    const cursor = new Date(today);
    if (!byDay.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1);
    while (byDay.has(cursor.toDateString())) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    const totalMinutes = logs.reduce((sum, log) => sum + log.durationMinutes, 0);
    const withMood = logs.filter((log) => log.moodBefore != null);
    const moodDelta = withMood.length
      ? withMood.reduce((sum, log) => sum + (log.moodAfter - (log.moodBefore ?? log.moodAfter)), 0) / withMood.length
      : null;

    const days = Array.from({ length: period }, (_, index) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (period - 1 - index));
      return {
        key: date.toDateString(),
        label: period === 7 ? DAY_LABELS[date.getDay()] : `${date.getMonth() + 1}/${date.getDate()}`,
        minutes: byDay.get(date.toDateString()) ?? 0,
        isToday: index === period - 1,
      };
    });

    return { todayMinutes, streak, totalMinutes, moodDelta, days };
  }, [logs, period]);

  const maxMinutes = Math.max(1, ...stats.days.map((day) => day.minutes));
  const periodTotal = stats.days.reduce((sum, day) => sum + day.minutes, 0);
  const goalProgress = Math.min(100, Math.round((stats.todayMinutes / Math.max(1, dailyGoalMinutes)) * 100));

  if (logs.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1180px] px-4 py-5 sm:px-6 sm:py-7 lg:px-9 lg:py-8">
        <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#11172a] via-[#171d36] to-[#2b2454] px-6 py-16 text-center text-white shadow-[0_26px_70px_rgba(12,18,40,0.22)] sm:px-10 sm:py-24">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[90px]" />
          <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-[22px] bg-white/10 text-[#aab2ff]"><BarChart3 size={24} /></span>
          <h2 className="relative mt-6 text-[28px] font-black tracking-[-0.05em]">첫 기록을 만들어 볼까요?</h2>
          <p className="relative mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/55">세션을 마치면 집중 시간, 연속 기록, 컨디션 변화를 이곳에서 한눈에 확인할 수 있어요.</p>
          {onStartSession ? <button type="button" onClick={onStartSession} className="relative mx-auto mt-7 flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-black text-slate-950"><Play size={16} fill="currentColor" /> 루틴 고르기</button> : null}
        </section>
      </div>
    );
  }

  const tiles = [
    { Icon: Clock3, label: '누적 시간', value: fmtTotal(stats.totalMinutes), tone: 'text-[#7180ef]' },
    { Icon: CalendarCheck, label: '완료 세션', value: `${logs.length}회`, tone: 'text-emerald-500' },
    { Icon: Flame, label: '연속 기록', value: `${stats.streak}일`, tone: 'text-orange-500' },
    { Icon: TrendingUp, label: '평균 컨디션 변화', value: stats.moodDelta == null ? '기록 필요' : `${stats.moodDelta > 0 ? '+' : ''}${stats.moodDelta.toFixed(1)}`, tone: stats.moodDelta != null && stats.moodDelta > 0 ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-300' },
  ];

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-5 sm:px-6 sm:py-7 lg:px-9 lg:py-8">
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
        <article className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#13192b] via-[#171e36] to-[#282658] p-6 text-white shadow-[0_26px_70px_rgba(12,18,40,0.22)] sm:p-8">
          <div className="absolute -right-12 -top-16 h-72 w-72 rounded-full bg-indigo-500/18 blur-[75px]" />
          <div className="relative flex h-full min-h-[245px] flex-col">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#9ba6ff]">TODAY'S RHYTHM</p>
            <h2 className="mt-2 text-[32px] font-black tracking-[-0.055em] sm:text-[42px]">오늘 {stats.todayMinutes}분을 채웠어요</h2>
            <p className="mt-2 text-sm text-white/52">{goalProgress >= 100 ? '목표를 달성했습니다. 남은 시간은 편안하게 쉬어가세요.' : `${Math.max(0, dailyGoalMinutes - stats.todayMinutes)}분 더 이어가면 오늘 목표에 도달합니다.`}</p>
            <div className="mt-auto pt-8">
              <div className="flex items-center justify-between text-[10px] font-black text-white/55"><span>오늘 목표</span><span>{stats.todayMinutes} / {dailyGoalMinutes}분</span></div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#7180ff] to-[#b391ff] transition-[width] duration-500" style={{ width: `${goalProgress}%` }} /></div>
            </div>
          </div>
        </article>

        <div className="grid grid-cols-2 gap-3">
          {tiles.map(({ Icon, label, value, tone }) => (
            <article key={label} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm dark:border-white/8 dark:bg-[#111621]">
              <Icon size={17} className={tone} />
              <strong className="mt-4 block text-xl font-black tracking-[-0.035em] text-slate-950 dark:text-white">{value}</strong>
              <span className="mt-1 block text-[10px] font-bold leading-snug text-slate-400">{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/8 dark:bg-[#111621]" aria-labelledby="trend-title">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black tracking-[0.15em] text-[#7180ef]">CONSISTENCY</p>
            <h3 id="trend-title" className="mt-1 text-lg font-black tracking-[-0.035em] text-slate-950 dark:text-white">집중 시간 흐름</h3>
          </div>
          <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-white/[0.035]">
            {([7, 30] as const).map((days) => <button key={days} type="button" onClick={() => setPeriod(days)} aria-pressed={period === days} className={`min-h-8 rounded-lg px-3 text-[10px] font-black ${period === days ? 'bg-white text-slate-950 shadow-sm dark:bg-white/10 dark:text-white' : 'text-slate-400'}`}>{days}일</button>)}
          </div>
        </div>
        <div className="mt-7 flex h-48 items-end gap-1.5 border-b border-slate-100 sm:gap-2 dark:border-white/7" role="img" aria-label={`최근 ${period}일 세션 시간 막대 그래프`}>
          {stats.days.map((day, index) => {
            const showLabel = period === 7 || index % 5 === 0 || day.isToday;
            return (
              <div key={day.key} className="flex h-full min-w-0 flex-1 flex-col justify-end gap-2">
                {day.minutes > 0 ? <span className={`text-center text-[9px] font-black tabular-nums ${day.isToday ? 'text-[#6878ed]' : 'text-slate-400'}`}>{period === 7 || day.isToday ? day.minutes : ''}</span> : null}
                <div className={`mx-auto w-full max-w-8 rounded-t-md transition-[height] duration-500 ${day.isToday ? 'bg-gradient-to-t from-[#5969e5] to-[#9b8bff]' : 'bg-slate-200 dark:bg-white/10'}`} style={{ height: day.minutes ? `${Math.max(8, (day.minutes / maxMinutes) * 150)}px` : '3px' }} />
                <span className={`h-4 truncate text-center text-[8px] font-bold ${day.isToday ? 'text-slate-950 dark:text-white' : 'text-slate-300 dark:text-slate-600'}`}>{showLabel ? day.label : ''}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs"><span className="font-bold text-slate-400">최근 {period}일</span><strong className="font-black text-slate-950 dark:text-white">총 {fmtTotal(periodTotal)}</strong></div>
      </section>

      <section className="mt-5" aria-labelledby="recent-title">
        <div className="mb-3 flex items-end justify-between">
          <div><p className="text-[10px] font-black tracking-[0.15em] text-emerald-500">HISTORY</p><h3 id="recent-title" className="mt-1 text-lg font-black tracking-[-0.035em] text-slate-950 dark:text-white">최근 세션</h3></div>
          <span className="text-[10px] font-bold text-slate-400">최근 20개</span>
        </div>
        <div className="grid gap-2 lg:grid-cols-2">
          {logs.slice(0, 20).map((log) => (
            <article key={log.id} className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm dark:border-white/8 dark:bg-[#111621]">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10"><Sparkles size={17} /></span>
              <div className="min-w-0 flex-1"><h4 className="truncate text-sm font-black text-slate-900 dark:text-white">{log.modeName}</h4><p className="mt-1 text-[10px] font-semibold text-slate-400">{new Intl.DateTimeFormat('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(log.startedAt))}</p></div>
              <div className="text-right"><strong className="block text-sm font-black tabular-nums text-[#6878ed]">{log.durationMinutes}분</strong><span className="mt-1 block text-[9px] font-bold text-slate-400">{log.moodBefore != null ? `상태 ${log.moodBefore} → ${log.moodAfter}` : `종료 상태 ${log.moodAfter}/5`}</span></div>
            </article>
          ))}
        </div>
        {onStartSession ? <button type="button" onClick={onStartSession} className="mx-auto mt-5 flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-xs font-black text-slate-500 shadow-sm transition-colors hover:text-slate-950 dark:border-white/8 dark:bg-white/4 dark:text-slate-400 dark:hover:text-white">새 루틴 시작 <ArrowRight size={14} /></button> : null}
      </section>
    </div>
  );
};
