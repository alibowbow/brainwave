import { PRESETS, type SessionLog, type SessionPreset } from '../../types';
import { getTimeRecommendation } from './catalog';

export interface AdaptiveRecommendationInput {
  date?: Date;
  logs: SessionLog[];
  dailyGoalMinutes: number;
  todayMinutes: number;
}

export interface AdaptiveRecommendation {
  primary: SessionPreset;
  alternatives: SessionPreset[];
  reason: string;
  context: string[];
  remainingGoalMinutes: number;
  personalized: boolean;
}

interface HistorySummary {
  count: number;
  averageHelpful: number;
  averageMoodGain: number;
}

interface TimeWindow {
  label: string;
  ids: string[];
  reason: string;
}

const PRESET_BY_ID = new Map(PRESETS.map((preset) => [preset.id, preset]));
const DAY_MS = 24 * 60 * 60 * 1_000;

const stripEnglishName = (name: string) => name.replace(/\s*\([^)]*\)/, '');

const getTimeWindow = (date: Date): TimeWindow => {
  const hour = date.getHours();
  if (hour < 5) {
    return {
      label: '고요한 새벽',
      ids: ['sleep_prep', 'relax', 'meditation'],
      reason: '빛과 자극을 낮추고 몸이 쉬는 쪽으로 천천히 전환할 시간이에요.',
    };
  }
  if (hour < 10) {
    return {
      label: '아침의 리듬',
      ids: ['country_morning', 'focus', 'meditation'],
      reason: '과하게 밀어붙이기보다 맑고 가볍게 하루의 리듬을 여는 시간이 잘 맞아요.',
    };
  }
  if (hour < 17) {
    return {
      label: '집중 시간대',
      ids: ['focus', 'power_nap', 'meditation'],
      reason: '주의를 한곳에 모으거나 짧게 재충전하기 좋은 시간대예요.',
    };
  }
  if (hour < 22) {
    return {
      label: '저녁 회복',
      ids: ['relax', 'meditation', 'sleep_prep'],
      reason: '하루의 속도를 낮추고 남은 긴장을 풀어 주기 좋은 시간이에요.',
    };
  }
  return {
    label: '잠들기 전',
    ids: ['sleep_prep', 'relax', 'meditation'],
    reason: '강한 자극을 줄이고 수면으로 자연스럽게 이어질 리듬이 필요해요.',
  };
};

const normalizeModeId = (modeId: string) => modeId.startsWith('preset:') ? modeId.slice(7) : modeId;

const summarizeHistory = (logs: SessionLog[], presetId: string, now: Date): HistorySummary => {
  const cutoff = now.getTime() - 45 * DAY_MS;
  const matches = logs.filter((log) => {
    const startedAt = new Date(log.startedAt).getTime();
    return Number.isFinite(startedAt)
      && startedAt >= cutoff
      && normalizeModeId(log.modeId) === presetId;
  });

  if (matches.length === 0) {
    return { count: 0, averageHelpful: 0, averageMoodGain: 0 };
  }

  const averageHelpful = matches.reduce((sum, log) => sum + log.helpfulScore, 0) / matches.length;
  const moodLogs = matches.filter((log) => log.moodBefore != null);
  const averageMoodGain = moodLogs.length
    ? moodLogs.reduce((sum, log) => sum + (log.moodAfter - (log.moodBefore ?? log.moodAfter)), 0) / moodLogs.length
    : 0;

  return { count: matches.length, averageHelpful, averageMoodGain };
};

const adaptDuration = (preset: SessionPreset, remainingGoalMinutes: number): SessionPreset => {
  if (remainingGoalMinutes <= 0 || remainingGoalMinutes >= preset.defaultDurationMinutes) return { ...preset };

  const minimum = preset.id === 'sleep_prep' ? 25 : preset.id === 'power_nap' ? 10 : 15;
  const rounded = Math.ceil(remainingGoalMinutes / 5) * 5;
  return {
    ...preset,
    defaultDurationMinutes: Math.min(preset.defaultDurationMinutes, Math.max(minimum, rounded)),
  };
};

const scoreCandidate = (
  preset: SessionPreset,
  index: number,
  logs: SessionLog[],
  now: Date,
  remainingGoalMinutes: number,
) => {
  const history = summarizeHistory(logs, preset.id, now);
  const baseScore = [4.8, 3.2, 2.2][index] ?? 1;
  const historyScore = history.count === 0
    ? 0
    : Math.min(4.2,
      Math.min(history.count, 4) * 0.25
      + (history.averageHelpful - 3) * 0.8
      + history.averageMoodGain * 0.6);

  const recentIds = logs.slice(0, 2).map((log) => normalizeModeId(log.modeId));
  const repetitionPenalty = recentIds[0] === preset.id ? 0.75 : recentIds[1] === preset.id ? 0.25 : 0;
  const completionBonus = remainingGoalMinutes === 0 && ['relax', 'meditation', 'power_nap'].includes(preset.id) ? 0.45 : 0;

  return {
    preset,
    history,
    score: baseScore + historyScore + completionBonus - repetitionPenalty,
  };
};

export const getAdaptiveRecommendation = ({
  date = new Date(),
  logs,
  dailyGoalMinutes,
  todayMinutes,
}: AdaptiveRecommendationInput): AdaptiveRecommendation => {
  const window = getTimeWindow(date);
  const remainingGoalMinutes = Math.max(0, dailyGoalMinutes - todayMinutes);
  const defaultPreset = getTimeRecommendation(date);
  const candidates = window.ids
    .map((id) => PRESET_BY_ID.get(id))
    .filter((preset): preset is SessionPreset => Boolean(preset));

  const ranked = candidates
    .map((preset, index) => scoreCandidate(preset, index, logs, date, remainingGoalMinutes))
    .sort((a, b) => b.score - a.score);

  const winner = ranked[0] ?? {
    preset: defaultPreset,
    history: summarizeHistory(logs, defaultPreset.id, date),
    score: 0,
  };
  const personalized = winner.preset.id !== defaultPreset.id
    && winner.history.count >= 2
    && winner.history.averageHelpful >= 4;
  const primary = adaptDuration(winner.preset, remainingGoalMinutes);
  const alternatives = ranked
    .slice(1, 3)
    .map(({ preset }) => adaptDuration(preset, remainingGoalMinutes));

  const context = [window.label];
  context.push(remainingGoalMinutes > 0 ? `목표까지 ${remainingGoalMinutes}분` : '오늘 목표 달성');
  if (personalized) context.push('최근 만족도 반영');

  let reason = window.reason;
  if (personalized) {
    reason = `최근 ${winner.history.count}회에서 만족도가 높았던 ${stripEnglishName(primary.name)}을 지금 시간대의 첫 선택으로 올렸어요.`;
  } else if (remainingGoalMinutes > 0 && primary.defaultDurationMinutes < winner.preset.defaultDurationMinutes) {
    reason = `오늘 목표까지 ${remainingGoalMinutes}분 남았어요. ${primary.defaultDurationMinutes}분 루틴으로 부담 없이 흐름을 마무리해 보세요.`;
  } else if (remainingGoalMinutes === 0) {
    reason = `오늘 목표는 이미 채웠어요. 기록을 더 쌓기보다 ${stripEnglishName(primary.name)}으로 편안하게 리듬을 이어가 보세요.`;
  }

  return {
    primary,
    alternatives,
    reason,
    context,
    remainingGoalMinutes,
    personalized,
  };
};
