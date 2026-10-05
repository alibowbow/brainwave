import { describe, expect, it } from 'vitest';
import { ACCENT_PEAK_CEILING, isAccentKind, renderAccentPcm } from './synthesis';
import { ACCENT_KINDS, type AccentKind } from './types';

// Signal assertions concern original mono PCM before the engine's existing
// gains/panner/limiter. They are neither an audition nor a device SPL/LUFS test.
function measure(pcm: Float32Array) {
  let peak = 0, sum = 0, energy = 0, largestStep = 0, finite = true;
  for (let i = 0; i < pcm.length; i++) {
    const sample = pcm[i];
    finite &&= Number.isFinite(sample);
    peak = Math.max(peak, Math.abs(sample));
    sum += sample;
    energy += sample * sample;
    if (i) largestStep = Math.max(largestStep, Math.abs(sample - pcm[i - 1]));
  }
  return { peak, rms: Math.sqrt(energy / pcm.length), dc: sum / pcm.length, largestStep, finite };
}
function windowPeak(pcm: Float32Array, start: number, end: number) {
  let peak = 0;
  for (let i = start; i < end; i++) peak = Math.max(peak, Math.abs(pcm[i]));
  return peak;
}
const durations: Record<AccentKind, number> = {
  'water-drop': 0.85,
  'soft-rustle': 1.25,
  'ceramic-touch': 0.7,
  'ember-tick': 0.55,
  'soft-resonance': 3.2,
};

describe('original scene accent PCM', () => {
  it('allowlists the five documented quiet cues', () => {
    expect([...ACCENT_KINDS].sort()).toEqual(Object.keys(durations).sort());
    for (const kind of ACCENT_KINDS) expect(isAccentKind(kind)).toBe(true);
    for (const unknown of [undefined, null, '', 0, 'water-drop ', 'thunder', 'constructor', '__proto__', {}, []]) {
      expect(isAccentKind(unknown)).toBe(false);
    }
    expect(ACCENT_PEAK_CEILING).toBeLessThanOrEqual(0.024);
  });

  for (const sampleRate of [44100, 48000]) {
    describe(`${sampleRate} Hz`, () => {
      it.each(ACCENT_KINDS)('%s is finite, audible PCM with a restrained peak and smooth silent edges', kind => {
        const pcm = renderAccentPcm(kind, sampleRate);
        const stats = measure(pcm);
        expect(pcm).toBeInstanceOf(Float32Array);
        expect(pcm.length).toBe(Math.ceil(durations[kind] * sampleRate));
        expect(stats.finite).toBe(true);
        expect(pcm[0]).toBe(0);
        expect(pcm.at(-1)).toBe(0);
        expect(stats.peak).toBeGreaterThan(0.0005);
        expect(stats.peak).toBeLessThanOrEqual(0.024);
        expect(stats.rms).toBeGreaterThan(0.0001);
        expect(stats.rms).toBeLessThan(0.01);
        expect(Math.abs(stats.dc)).toBeLessThan(0.0001);
        // A conservative derivative bound catches sample impulses, discontinuities
        // and accidentally unfiltered full-scale noise without enforcing a timbre.
        expect(stats.largestStep).toBeLessThan(0.005);
        expect(Math.abs(pcm[1])).toBeLessThan(0.0000001);
        expect(Math.abs(pcm.at(-2)!)).toBeLessThan(0.0000001);
        const edgeWindow = Math.floor(sampleRate * 0.005);
        expect(windowPeak(pcm, 0, edgeWindow)).toBeLessThan(stats.peak * 0.08);
        expect(windowPeak(pcm, pcm.length - edgeWindow, pcm.length)).toBeLessThan(stats.peak * 0.003);
      });
    });
  }

  it.each(ACCENT_KINDS)('%s has stable levels across common sample rates and repeatable independent output', kind => {
    const first = renderAccentPcm(kind, 44100);
    const repeat = renderAccentPcm(kind, 44100);
    const alternate = renderAccentPcm(kind, 48000);
    expect(first).not.toBe(repeat);
    expect(first).toEqual(repeat);
    const lowRate = measure(first), highRate = measure(alternate);
    expect(Math.max(lowRate.rms, highRate.rms) / Math.min(lowRate.rms, highRate.rms)).toBeLessThan(1.25);
    first.fill(0);
    expect(measure(repeat).peak).toBeGreaterThan(0.0005);
  });

  it.each([NaN, Infinity, -Infinity, -48000, 0, 7999, 192001])('rejects unsupported sample rate %s before rendering', sampleRate => {
    expect(() => renderAccentPcm('water-drop', sampleRate)).toThrow(RangeError);
  });

  it.each([null, undefined, 'thunder', '__proto__', {}])('rejects unrecognized synthesis kind %j', kind => {
    expect(() => renderAccentPcm(kind as AccentKind, 48000)).toThrow(RangeError);
  });
});
