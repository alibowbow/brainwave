import { MAX_LAYER_VOLUME, type MixVolumes } from './audioLevels';
import { SOUND_ORDER } from './audioOptions';
import type { SoundLayer, ToneMode } from './services/audioEngine';
import {
  type BrainWaveType,
  type SessionLog,
} from './types';

export interface UserPreset {
  id: string;
  name: string;
  brainWaveType: BrainWaveType;
  toneMode: ToneMode;
  brainwaveEnabled: boolean;
  durationMinutes: number;
  layers: SoundLayer[];
  mix?: MixVolumes;
}

export interface LastSession {
  name: string;
  brainWaveType: BrainWaveType;
  toneMode: ToneMode;
  brainwaveEnabled: boolean;
  durationMinutes: number;
  layers: SoundLayer[];
  sleepMode: boolean;
  mix?: MixVolumes;
  intention?: string;
}


export interface BackupPayload {
  version: 1;
  exportedAt: string;
  logs: SessionLog[];
  presets: UserPreset[];
  lastSession: LastSession | null;
}

export const createBackupPayload = (
  logs: SessionLog[],
  presets: UserPreset[],
  lastSession: LastSession | null,
): BackupPayload => ({
  version: 1,
  exportedAt: new Date().toISOString(),
  logs,
  presets,
  lastSession,
});

export const parseBackupPayload = (value: unknown): BackupPayload | null => {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<BackupPayload>;
  if (candidate.version !== 1 || !Array.isArray(candidate.logs) || !Array.isArray(candidate.presets)) return null;

  const isFiniteNumber = (input: unknown): input is number => typeof input === 'number' && Number.isFinite(input);
  const soundTypes = new Set(SOUND_ORDER);
  const isBrainWave = (input: unknown): input is BrainWaveType => (
    input === 'alpha' || input === 'beta' || input === 'gamma' || input === 'theta' || input === 'delta'
  );
  const isMix = (input: unknown): input is MixVolumes => {
    if (!input || typeof input !== 'object') return false;
    const mix = input as Partial<MixVolumes>;
    return isFiniteNumber(mix.master) && mix.master >= 0 && mix.master <= 1
      && isFiniteNumber(mix.binaural) && mix.binaural >= 0 && mix.binaural <= 1
      && isFiniteNumber(mix.bg) && mix.bg >= 0 && mix.bg <= 1;
  };
  const isLayer = (input: unknown): input is SoundLayer => {
    if (!input || typeof input !== 'object') return false;
    const layer = input as Partial<SoundLayer>;
    return typeof layer.type === 'string'
      && soundTypes.has(layer.type as SoundLayer['type'])
      && isFiniteNumber(layer.volume)
      && layer.volume >= 0
      && layer.volume <= MAX_LAYER_VOLUME
      && (layer.muted == null || typeof layer.muted === 'boolean');
  };
  const isLog = (input: unknown): input is SessionLog => {
    if (!input || typeof input !== 'object') return false;
    const log = input as Partial<SessionLog>;
    return typeof log.id === 'string'
      && typeof log.modeId === 'string'
      && typeof log.modeName === 'string'
      && typeof log.startedAt === 'string'
      && !Number.isNaN(Date.parse(log.startedAt))
      && isFiniteNumber(log.durationMinutes)
      && log.durationMinutes >= 1
      && log.durationMinutes <= 1_440
      && (log.moodBefore == null || (isFiniteNumber(log.moodBefore) && log.moodBefore >= 1 && log.moodBefore <= 5))
      && isFiniteNumber(log.moodAfter)
      && log.moodAfter >= 1
      && log.moodAfter <= 5
      && isFiniteNumber(log.helpfulScore)
      && log.helpfulScore >= 1
      && log.helpfulScore <= 5;
  };
  const isPreset = (input: unknown): input is UserPreset => {
    if (!input || typeof input !== 'object') return false;
    const preset = input as Partial<UserPreset>;
    return typeof preset.id === 'string'
      && typeof preset.name === 'string'
      && preset.name.length > 0
      && isBrainWave(preset.brainWaveType)
      && (preset.toneMode === 'binaural' || preset.toneMode === 'isochronic')
      && typeof preset.brainwaveEnabled === 'boolean'
      && isFiniteNumber(preset.durationMinutes)
      && preset.durationMinutes >= 1
      && preset.durationMinutes <= 480
      && Array.isArray(preset.layers)
      && preset.layers.every(isLayer)
      && (preset.mix == null || isMix(preset.mix));
  };
  const isLastSession = (input: unknown): input is LastSession => {
    if (!input || typeof input !== 'object') return false;
    const session = input as Partial<LastSession>;
    return typeof session.name === 'string'
      && session.name.length > 0
      && isBrainWave(session.brainWaveType)
      && (session.toneMode === 'binaural' || session.toneMode === 'isochronic')
      && typeof session.brainwaveEnabled === 'boolean'
      && typeof session.sleepMode === 'boolean'
      && isFiniteNumber(session.durationMinutes)
      && session.durationMinutes >= 1
      && session.durationMinutes <= 480
      && Array.isArray(session.layers)
      && session.layers.every(isLayer)
      && (session.mix == null || isMix(session.mix))
      && (session.intention == null || typeof session.intention === 'string');
  };

  return {
    version: 1,
    exportedAt: typeof candidate.exportedAt === 'string' ? candidate.exportedAt : new Date().toISOString(),
    logs: candidate.logs.slice(0, 5_000).filter(isLog),
    presets: candidate.presets.slice(0, 500).filter(isPreset),
    lastSession: isLastSession(candidate.lastSession) ? candidate.lastSession : null,
  };
};
