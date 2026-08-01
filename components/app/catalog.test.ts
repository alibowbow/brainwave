import { describe, expect, it } from 'vitest';
import type { SessionLog } from '../../types';
import { currentStreak, getGreeting, getTimeRecommendation, minutesOnDate } from './catalog';

const logAt = (date: Date, durationMinutes = 20): SessionLog => ({
  id: date.toISOString(),
  modeId: 'focus',
  modeName: '맑은 집중',
  startedAt: date.toISOString(),
  durationMinutes,
  moodBefore: 3,
  moodAfter: 4,
  helpfulScore: 4,
});

const atHour = (hour: number) => new Date(2026, 7, 2, hour, 0, 0);

describe('time-aware dashboard recommendations', () => {
  it.each([
    [2, 'sleep_prep'],
    [7, 'country_morning'],
    [13, 'focus'],
    [19, 'relax'],
    [23, 'sleep_prep'],
  ])('selects the expected routine at %i:00', (hour, expectedId) => {
    expect(getTimeRecommendation(atHour(hour)).id).toBe(expectedId);
  });

  it('changes its greeting across the day', () => {
    expect(getGreeting(atHour(8))).toBe('좋은 아침이에요');
    expect(getGreeting(atHour(14))).toBe('흐름을 이어가 볼까요?');
    expect(getGreeting(atHour(23))).toBe('이제 천천히 쉬어가요');
  });
});

describe('daily progress helpers', () => {
  it('totals only sessions from the requested local day', () => {
    const now = new Date(2026, 7, 2, 18, 0, 0);
    const logs = [
      logAt(new Date(2026, 7, 2, 7, 30, 0), 15),
      logAt(new Date(2026, 7, 2, 16, 0, 0), 25),
      logAt(new Date(2026, 7, 1, 23, 0, 0), 60),
    ];
    expect(minutesOnDate(logs, now)).toBe(40);
  });

  it('counts a streak through today and allows yesterday as the latest day', () => {
    const now = new Date(2026, 7, 5, 18, 0, 0);
    const consecutive = [0, 1, 2].map((daysAgo) => {
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      return logAt(date);
    });
    expect(currentStreak(consecutive, now)).toBe(3);

    const throughYesterday = consecutive.slice(1);
    expect(currentStreak(throughYesterday, now)).toBe(2);
  });

  it('stops at the first missing day', () => {
    const now = new Date(2026, 7, 5, 18, 0, 0);
    const today = logAt(now);
    const twoDaysAgo = new Date(now);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    expect(currentStreak([today, logAt(twoDaysAgo)], now)).toBe(1);
  });
});
