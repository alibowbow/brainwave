import { describe, expect, it } from 'vitest';
import type { SessionLog } from '../../types';
import { getAdaptiveRecommendation } from './adaptiveRecommendation';

const log = ({
  presetId,
  dayOffset = 0,
  helpful = 5,
  before = 2,
  after = 4,
}: {
  presetId: string;
  dayOffset?: number;
  helpful?: number;
  before?: number | null;
  after?: number;
}): SessionLog => {
  const startedAt = new Date(2026, 7, 20, 19, 0, 0);
  startedAt.setDate(startedAt.getDate() - dayOffset);
  return {
    id: `${presetId}-${dayOffset}`,
    modeId: presetId,
    modeName: presetId,
    startedAt: startedAt.toISOString(),
    durationMinutes: 20,
    moodBefore: before,
    moodAfter: after,
    helpfulScore: helpful,
  };
};

describe('adaptive home recommendation', () => {
  it('uses the time-aware default and shortens it around the remaining daily goal', () => {
    const recommendation = getAdaptiveRecommendation({
      date: new Date(2026, 7, 20, 13, 0, 0),
      logs: [],
      dailyGoalMinutes: 30,
      todayMinutes: 20,
    });

    expect(recommendation.primary.id).toBe('focus');
    expect(recommendation.primary.defaultDurationMinutes).toBe(15);
    expect(recommendation.context).toContain('목표까지 10분');
    expect(recommendation.personalized).toBe(false);
  });

  it('promotes a repeatedly helpful routine inside the current time window', () => {
    const logs = [
      log({ presetId: 'meditation', dayOffset: 1 }),
      log({ presetId: 'meditation', dayOffset: 4 }),
      log({ presetId: 'meditation', dayOffset: 8 }),
      log({ presetId: 'relax', dayOffset: 2, helpful: 2, before: 3, after: 2 }),
    ];
    const recommendation = getAdaptiveRecommendation({
      date: new Date(2026, 7, 20, 19, 30, 0),
      logs,
      dailyGoalMinutes: 30,
      todayMinutes: 0,
    });

    expect(recommendation.primary.id).toBe('meditation');
    expect(recommendation.personalized).toBe(true);
    expect(recommendation.reason).toContain('최근 3회');
  });

  it('ignores preference evidence that is older than the learning window', () => {
    const recommendation = getAdaptiveRecommendation({
      date: new Date(2026, 7, 20, 19, 30, 0),
      logs: [log({ presetId: 'meditation', dayOffset: 60 }), log({ presetId: 'meditation', dayOffset: 61 })],
      dailyGoalMinutes: 30,
      todayMinutes: 0,
    });

    expect(recommendation.primary.id).toBe('relax');
    expect(recommendation.personalized).toBe(false);
  });

  it('switches its message once the daily goal is complete', () => {
    const recommendation = getAdaptiveRecommendation({
      date: new Date(2026, 7, 20, 8, 0, 0),
      logs: [],
      dailyGoalMinutes: 30,
      todayMinutes: 45,
    });

    expect(recommendation.remainingGoalMinutes).toBe(0);
    expect(recommendation.context).toContain('오늘 목표 달성');
    expect(recommendation.reason).toContain('이미 채웠어요');
  });
});
