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

  it('round-trips the chosen space independently of edited names and sounds', () => {
    const custom: UserPreset = { ...preset, name: '소리 없는 내 쉼터', worldId: 'amb:cosmic', layers: [] };
    const last: LastSession = { ...lastSession, name: custom.name, worldId: custom.worldId, layers: [] };
    const exported = JSON.stringify(createBackupPayload([], [custom], last));
    const parsed = parseBackupPayload(JSON.parse(exported));
    expect(parsed?.presets).toEqual([custom]);
    expect(parsed?.lastSession).toEqual(last);
  });

  it.each(['future:space', '', null, 42, { id: 'focus' }])('strips invalid optional world identity %j without losing saved audio', (worldId) => {
    const input = {
      version: 1,
      logs: [],
      presets: [{ ...preset, worldId }],
      lastSession: { ...lastSession, worldId },
    };
    const parsed = parseBackupPayload(input);
    expect(parsed?.presets).toEqual([preset]);
    expect(parsed?.lastSession).toEqual(lastSession);
    expect(parsed?.presets[0]).not.toHaveProperty('worldId');
    expect(parsed?.lastSession).not.toHaveProperty('worldId');
    expect(input.presets[0].worldId).toEqual(worldId);
    expect(input.lastSession.worldId).toEqual(worldId);
  });

  it('keeps legacy backups without adding a guessed world identity', () => {
    const parsed = parseBackupPayload(createBackupPayload([], [preset], lastSession));
    expect(parsed?.presets).toEqual([preset]);
    expect(parsed?.lastSession).toEqual(lastSession);
    expect(parsed?.presets[0]).not.toHaveProperty('worldId');
    expect(parsed?.lastSession).not.toHaveProperty('worldId');
  });
});
