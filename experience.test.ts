import { describe, expect, it } from 'vitest';
import {
  createBackupPayload,
  parseBackupPayload,
  type LastSession,
  type UserPreset,
} from './experience';
import type { SessionLog } from './types';

const log = (id: string, startedAt: string, durationMinutes = 20): SessionLog => ({
  id,
  modeId: 'focus',
  modeName: '맑은 집중',
  startedAt,
  durationMinutes,
  moodBefore: 2,
  moodAfter: 4,
  helpfulScore: 4,
});

const preset: UserPreset = {
  id: 'saved-1',
  name: '오후 집중',
  brainWaveType: 'alpha',
  toneMode: 'binaural',
  brainwaveEnabled: true,
  durationMinutes: 30,
  layers: [{ type: 'rain', volume: 0.7 }],
};

const lastSession: LastSession = {
  ...preset,
  name: preset.name,
  sleepMode: false,
};

describe('backup payloads', () => {
  it('round-trips valid local data', () => {
    const payload = createBackupPayload([log('1', new Date().toISOString())], [preset], lastSession);
    expect(parseBackupPayload(payload)).toMatchObject({
      version: 1,
      logs: [{ id: '1' }],
      presets: [{ id: 'saved-1' }],
      lastSession: { name: '오후 집중' },
    });
  });

  it('rejects unknown backup versions', () => {
    expect(parseBackupPayload({ version: 9, logs: [], presets: [] })).toBeNull();
  });

  it('filters malformed nested records instead of trusting imported JSON', () => {
    const parsed = parseBackupPayload({
      version: 1,
      exportedAt: new Date().toISOString(),
      logs: [{ id: 'bad', modeName: 'broken', durationMinutes: Number.NaN }],
      presets: [{ ...preset, layers: [{ type: 'rain', volume: 99 }] }],
      lastSession: { ...lastSession, toneMode: 'unknown' },
    });
    expect(parsed).toMatchObject({ logs: [], presets: [], lastSession: null });
  });
});
