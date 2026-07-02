import React, { useMemo } from 'react';
import { Flame, CalendarCheck, Clock, Smile, BarChart2 } from 'lucide-react';
import { SessionLog } from '../types';

interface Props {
  logs: SessionLog[];
}

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

const fmtTotal = (m: number) => {
  if (m < 60) return `${m}분`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest ? `${h}시간 ${rest}분` : `${h}시간`;
};

// History tab: KPI tiles + a 7-day minutes column chart + the recent session list.
export const StatsDashboard: React.FC<Props> = ({ logs }) => {
  const stats = useMemo(() => {
    const byDay = new Map<string, number>();
    logs.forEach((l) => {
      const k = new Date(l.startedAt).toDateString();
      byDay.set(k, (byDay.get(k) ?? 0) + l.durationMinutes);
    });

    // Streak: consecutive days with a session, counting back from today
    // (yesterday keeps the streak alive if today has none yet).
    let streak = 0;
    const cursor = new Date();
    if (!byDay.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1);
    while (byDay.has(cursor.toDateString())) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    const totalMinutes = logs.reduce((s, l) => s + l.durationMinutes, 0);

    const withBefore = logs.filter((l) => l.moodBefore != null);
    const moodDelta = withBefore.length
      ? withBefore.reduce((s, l) => s + (l.moodAfter - (l.moodBefore as number)), 0) / withBefore.length
      : null;

    const week: { key: string; label: string; minutes: number; isToday: boolean }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      week.push({
        key: d.toDateString(),
        label: DAY_LABELS[d.getDay()],
        minutes: byDay.get(d.toDateString()) ?? 0,
        isToday: i === 0,
      });
    }

    return { streak, totalMinutes, moodDelta, week };
  }, [logs]);

  if (logs.length === 0) {
    return (
      <div className="text-center text-slate-400 mt-20">
        <BarChart2 size={40} className="mx-auto mb-4 opacity-50" />
        <p>아직 기록된 세션이 없습니다.</p>
        <p className="text-xs mt-1">첫 세션을 완료하면 통계가 쌓여요.</p>
      </div>
    );
  }

  const maxMinutes = Math.max(...stats.week.map((w) => w.minutes), 1);
  const weekTotal = stats.week.reduce((s, w) => s + w.minutes, 0);

  const tiles = [
    { Icon: Flame, label: '연속 기록', value: `${stats.streak}일` },
    { Icon: CalendarCheck, label: '총 세션', value: `${logs.length}회` },
    { Icon: Clock, label: '총 시간', value: fmtTotal(stats.totalMinutes) },
    {
      Icon: Smile,
      label: '기분 변화',
      value: stats.moodDelta == null ? '—' : `${stats.moodDelta > 0 ? '+' : ''}${stats.moodDelta.toFixed(1)}`,
      tone: stats.moodDelta == null ? '' : stats.moodDelta > 0 ? 'text-emerald-600 dark:text-emerald-400' : stats.moodDelta < 0 ? 'text-red-500' : '',
      caption: '세션 전 → 후 평균',
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {tiles.map(({ Icon, label, value, tone, caption }) => (
          <div key={label} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
              <Icon size={13} /> {label}
            </div>
            <div className={`text-2xl font-semibold ${tone || 'text-slate-900 dark:text-white'}`}>{value}</div>
            {caption && <div className="text-[10px] text-slate-400 mt-0.5">{caption}</div>}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">최근 7일 (분)</span>
          <span className="text-xs text-slate-400">{weekTotal > 0 ? `총 ${fmtTotal(weekTotal)}` : '이번 주 세션 없음'}</span>
        </div>

        <div className="flex items-end gap-2 h-28 border-b border-slate-200 dark:border-slate-700" aria-hidden="true">
          {stats.week.map((w) => {
            const labelled = w.minutes > 0 && (w.isToday || w.minutes === maxMinutes);
            return (
              <div key={w.key} className="flex-1 h-full flex flex-col justify-end items-center gap-1 min-w-0" title={`${w.label}요일 ${w.minutes}분`}>
                {labelled && (
                  <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 leading-none">{w.minutes}</span>
                )}
                {w.minutes > 0 && (
                  <div
                    className="w-full max-w-[24px] bg-primary-600 dark:bg-primary-500 rounded-t-[4px]"
                    style={{ height: `${Math.max((w.minutes / maxMinutes) * 88, 6)}%` }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 mt-1.5" aria-hidden="true">
          {stats.week.map((w) => (
            <span key={w.key} className={`flex-1 text-center text-[10px] ${w.isToday ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-400'}`}>
              {w.label}
            </span>
          ))}
        </div>

        <table className="sr-only">
          <caption>최근 7일 세션 시간</caption>
          <thead>
            <tr><th>요일</th><th>분</th></tr>
          </thead>
          <tbody>
            {stats.week.map((w) => (
              <tr key={w.key}><td>{w.label}</td><td>{w.minutes}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">최근 세션</h3>
        {logs.slice(0, 20).map((log) => (
          <div key={log.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200">{log.modeName}</h4>
              <span className="text-xs text-slate-500">{new Date(log.startedAt).toLocaleDateString()}</span>
            </div>
            <div className="text-right">
              <div className="font-mono text-primary-600 dark:text-primary-400 font-bold">{log.durationMinutes}분</div>
              <div className="text-xs text-slate-400">
                {log.moodBefore != null ? `기분 ${log.moodBefore} → ${log.moodAfter}` : `기분 ${log.moodAfter}/5`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
