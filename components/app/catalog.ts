import { AMBIENCE_PRESETS, PRESETS, type AmbiencePreset, type SessionLog, type SessionPreset } from '../../types';

export type RoutineCategory = 'focus' | 'calm' | 'sleep' | 'restore';

export interface RoutineVisual {
  category: RoutineCategory;
  eyebrow: string;
  artwork?: string;
  gradient: string;
  accent: string;
  text: string;
}

export const ROUTINE_VISUALS: Record<string, RoutineVisual> = {
  focus: {
    category: 'focus',
    eyebrow: '집중 · 알파',
    artwork: 'images/presets/focus.webp',
    gradient: 'from-[#071d3b] via-[#0d4b80] to-[#6756df]',
    accent: '#7c8cff',
    text: '맑은 집중',
  },
  relax: {
    category: 'calm',
    eyebrow: '휴식 · 세타',
    artwork: 'images/presets/relax.webp',
    gradient: 'from-[#21132f] via-[#773956] to-[#e47846]',
    accent: '#ff9a68',
    text: '느린 회복',
  },
  country_morning: {
    category: 'restore',
    eyebrow: '아침 · 알파',
    artwork: 'images/presets/morning.webp',
    gradient: 'from-[#226c75] via-[#67a66c] to-[#f4ca6d]',
    accent: '#f2c45f',
    text: '가벼운 시작',
  },
  sleep_prep: {
    category: 'sleep',
    eyebrow: '수면 · 델타',
    artwork: 'images/presets/sleep.webp',
    gradient: 'from-[#080f29] via-[#243067] to-[#7763bd]',
    accent: '#8795ff',
    text: '깊은 밤',
  },
  power_nap: {
    category: 'restore',
    eyebrow: '회복 · 세타',
    artwork: 'images/presets/nap.webp',
    gradient: 'from-[#255b62] via-[#75a78b] to-[#d7c899]',
    accent: '#79d7bf',
    text: '짧은 충전',
  },
  meditation: {
    category: 'calm',
    eyebrow: '명상 · 알파',
    artwork: 'images/presets/meditation.webp',
    gradient: 'from-[#181136] via-[#604b9d] to-[#d894ce]',
    accent: '#cf9dff',
    text: '마음 정돈',
  },
};

const AMBIENCE_META: Record<string, Pick<RoutineVisual, 'category' | 'gradient' | 'accent'>> = {
  morning_forest: { category: 'restore', gradient: 'from-emerald-950 via-emerald-700 to-amber-400', accent: '#6ee7b7' },
  rainy_forest: { category: 'calm', gradient: 'from-slate-950 via-slate-700 to-cyan-700', accent: '#67e8f9' },
  night_pond: { category: 'sleep', gradient: 'from-indigo-950 via-slate-900 to-emerald-950', accent: '#818cf8' },
  ocean_shore: { category: 'calm', gradient: 'from-blue-950 via-cyan-700 to-sky-300', accent: '#38bdf8' },
  waterfall_valley: { category: 'restore', gradient: 'from-emerald-950 via-teal-700 to-sky-400', accent: '#5eead4' },
  campfire_night: { category: 'calm', gradient: 'from-slate-950 via-orange-950 to-orange-500', accent: '#fb923c' },
  deep_night: { category: 'sleep', gradient: 'from-slate-950 via-indigo-950 to-violet-900', accent: '#818cf8' },
  snowy_night: { category: 'sleep', gradient: 'from-slate-950 via-blue-900 to-slate-300', accent: '#bae6fd' },
  summer_storm: { category: 'focus', gradient: 'from-slate-950 via-indigo-900 to-cyan-800', accent: '#a5b4fc' },
  cosmic: { category: 'calm', gradient: 'from-violet-950 via-indigo-900 to-fuchsia-700', accent: '#c4b5fd' },
  focus_cafe: { category: 'focus', gradient: 'from-stone-950 via-slate-800 to-amber-800', accent: '#fbbf24' },
  deep_forest: { category: 'focus', gradient: 'from-emerald-950 via-green-900 to-lime-700', accent: '#86efac' },
  cave_meditation: { category: 'calm', gradient: 'from-slate-950 via-violet-950 to-slate-700', accent: '#a78bfa' },
};

export const getAmbienceVisual = (preset: AmbiencePreset): RoutineVisual => {
  const meta = AMBIENCE_META[preset.id] ?? AMBIENCE_META.rainy_forest;
  return {
    ...meta,
    eyebrow: `${preset.layers.length}개 레이어 · ${preset.durationMinutes}분`,
    gradient: meta.gradient,
    text: preset.name,
  };
};

export const getPresetVisual = (preset: SessionPreset): RoutineVisual =>
  ROUTINE_VISUALS[preset.id] ?? {
    category: 'focus',
    eyebrow: '커스텀 루틴',
    gradient: 'from-slate-950 via-indigo-900 to-violet-700',
    accent: '#818cf8',
    text: preset.name,
  };

export const getTimeRecommendation = (date = new Date()): SessionPreset => {
  const hour = date.getHours();
  const targetId = hour < 5 ? 'sleep_prep'
    : hour < 10 ? 'country_morning'
      : hour < 17 ? 'focus'
        : hour < 22 ? 'relax'
          : 'sleep_prep';
  return PRESETS.find((preset) => preset.id === targetId) ?? PRESETS[0];
};

export const getGreeting = (date = new Date()) => {
  const hour = date.getHours();
  if (hour < 5) return '조용한 새벽이에요';
  if (hour < 11) return '좋은 아침이에요';
  if (hour < 17) return '흐름을 이어가 볼까요?';
  if (hour < 22) return '오늘도 수고했어요';
  return '이제 천천히 쉬어가요';
};

export const minutesOnDate = (logs: SessionLog[], date = new Date()) => {
  const key = date.toDateString();
  return logs.reduce((total, log) => (
    new Date(log.startedAt).toDateString() === key ? total + log.durationMinutes : total
  ), 0);
};

export const currentStreak = (logs: SessionLog[], date = new Date()) => {
  const activeDays = new Set(logs.map((log) => new Date(log.startedAt).toDateString()));
  const cursor = new Date(date);
  if (!activeDays.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (activeDays.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

export const CATEGORY_LABELS: Record<RoutineCategory | 'all', string> = {
  all: '전체',
  focus: '집중',
  calm: '이완',
  sleep: '수면',
  restore: '회복',
};

export const FEATURED_AMBIENCES = AMBIENCE_PRESETS.filter((preset) =>
  ['rainy_forest', 'ocean_shore', 'campfire_night', 'cosmic'].includes(preset.id),
);
