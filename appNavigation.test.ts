import { describe, expect, it } from 'vitest';
import {
  APP_HISTORY_KEY,
  NATURE_SCENE_HISTORY_KEY,
  hasNatureSceneHistory,
  readAppHistoryEntry,
  sameLocation,
  withAppHistoryEntry,
  withNatureSceneHistory,
  type AppHistoryEntry,
} from './appNavigation';

const HOME: AppHistoryEntry = {
  activeView: 'home',
  viewMode: 'list',
  immersive: false,
  index: 0,
  version: 1,
};

describe('app navigation history', () => {
  it('round-trips a versioned app location while preserving foreign history state', () => {
    const state = withAppHistoryEntry({ external: 'kept' }, HOME);
    expect((state as Record<string, unknown>).external).toBe('kept');
    expect(readAppHistoryEntry(state)).toEqual(HOME);
  });

  it('restores the brainwave guide as a first-class app location', () => {
    const guide: AppHistoryEntry = { ...HOME, activeView: 'guide', index: 2 };
    expect(readAppHistoryEntry(withAppHistoryEntry({}, guide))).toEqual(guide);
  });

  it('rejects malformed or incompatible history entries', () => {
    expect(readAppHistoryEntry(null)).toBeNull();
    expect(readAppHistoryEntry({ [APP_HISTORY_KEY]: { ...HOME, version: 2 } })).toBeNull();
    expect(readAppHistoryEntry({ [APP_HISTORY_KEY]: { ...HOME, activeView: 'missing' } })).toBeNull();
    expect(readAppHistoryEntry({ [APP_HISTORY_KEY]: { ...HOME, index: -1 } })).toBeNull();
  });

  it('compares only the visible app location, not its history index', () => {
    const sameScreenAtAnotherIndex: AppHistoryEntry = { ...HOME, index: 4 };
    expect(sameLocation(HOME, sameScreenAtAnotherIndex)).toBe(true);
    expect(sameLocation(HOME, { ...HOME, activeView: 'nature' })).toBe(false);
    expect(sameLocation(HOME, { ...HOME, immersive: true })).toBe(false);
  });

  it('marks a nature scene overlay without discarding the app location', () => {
    const state = withNatureSceneHistory(withAppHistoryEntry({}, HOME));
    expect(hasNatureSceneHistory(state)).toBe(true);
    expect(state[NATURE_SCENE_HISTORY_KEY]).toBe(true);
    expect(readAppHistoryEntry(state)).toEqual(HOME);
  });
});
