import { ACCENT_KINDS, type AccentKind } from './types';

/** Pre-bus sample peak ceiling; NOT a physical-device loudness measurement. */
export const ACCENT_PEAK_CEILING = 0.024;
export const ACCENT_SPECS: Readonly<Record<AccentKind, { seconds: number; attack: number; cooldown: number }>> = Object.freeze({
  'water-drop': Object.freeze({ seconds: 0.85, attack: 0.065, cooldown: 4.5 }),
  'soft-rustle': Object.freeze({ seconds: 1.25, attack: 0.18, cooldown: 6 }),
  'ceramic-touch': Object.freeze({ seconds: 0.7, attack: 0.055, cooldown: 8 }),
  'ember-tick': Object.freeze({ seconds: 0.55, attack: 0.075, cooldown: 7 }),
  'soft-resonance': Object.freeze({ seconds: 3.2, attack: 0.42, cooldown: 14 }),
});

export const isAccentKind = (value: unknown): value is AccentKind =>
  typeof value === 'string' && (ACCENT_KINDS as readonly string[]).includes(value);

/** Deterministic, finite original synthesis. No recording, oscillator loop or timer. */
export function renderAccentPcm(kind: AccentKind, sampleRate: number): Float32Array {
  if (!isAccentKind(kind) || !Number.isFinite(sampleRate) || sampleRate < 8000 || sampleRate > 192000) {
    throw new RangeError('Unsupported accent or sample rate');
  }
  const { seconds, attack } = ACCENT_SPECS[kind];
  const length = Math.ceil(seconds * sampleRate);
  const data = new Float32Array(length);
  let seed = 0x51a7 + ACCENT_KINDS.indexOf(kind) * 997;
  let low = 0;
  let slow = 0;
  let phase = 0;
  const lowRate = 1 - Math.exp(-2 * Math.PI * 1150 / sampleRate);
  const slowRate = 1 - Math.exp(-2 * Math.PI * 150 / sampleRate);
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    const noise = (seed >>> 0) / 0xffffffff * 2 - 1;
    low += lowRate * (noise - low);
    slow += slowRate * (noise - slow);
    const band = low - slow;
    const rise = t < attack ? 0.5 - 0.5 * Math.cos(Math.PI * t / attack) : 1;
    // Raised-cosine end guarantees exactly silent edges, including the long cue.
    const decay = t < attack ? 1 : 0.5 + 0.5 * Math.cos(Math.PI * (t - attack) / (seconds - attack));
    let wave = 0;
    switch (kind) {
      case 'water-drop': {
        const frequency = 340 + 280 * Math.exp(-t * 9);
        phase += 2 * Math.PI * frequency / sampleRate;
        wave = 0.62 * Math.sin(phase) * Math.exp(-t * 4.8) + band * 0.18;
        break;
      }
      case 'soft-rustle':
        wave = band * (0.42 + 0.16 * Math.sin(t * 17) ** 2);
        break;
      case 'ceramic-touch':
        wave = (0.52 * Math.sin(2 * Math.PI * 420 * t) + 0.14 * Math.sin(2 * Math.PI * 863 * t)) * Math.exp(-t * 7) + band * 0.08;
        break;
      case 'ember-tick':
        wave = band * 0.5 * Math.exp(-t * 4) + 0.09 * Math.sin(2 * Math.PI * 210 * t) * Math.exp(-t * 8);
        break;
      case 'soft-resonance':
        wave = (0.48 * Math.sin(2 * Math.PI * 174 * t) + 0.2 * Math.sin(2 * Math.PI * 261.3 * t) + 0.08 * Math.sin(2 * Math.PI * 349 * t)) * Math.exp(-t * 0.65);
        break;
    }
    data[i] = Math.max(-ACCENT_PEAK_CEILING, Math.min(ACCENT_PEAK_CEILING, wave * rise * decay * ACCENT_PEAK_CEILING));
  }
  data[0] = 0;
  data[length - 1] = 0;
  return data;
}
