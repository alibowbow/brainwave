import { describe, expect, it } from 'vitest';
import { PRESETS } from '../../types';
import { rainIntensityFor, sessionBackdropFor } from './sessionBackdrop';

const focus = PRESETS.find((preset) => preset.id === 'focus')!;

describe('session backdrop', () => {
  it('plays the deep-focus routine in the rainy study, including when resumed', () => {
    expect(sessionBackdropFor(focus)).toBe('rainy-window');
    expect(sessionBackdropFor({ id: 'last', name: focus.name })).toBe('rainy-window');
    expect(sessionBackdropFor({ id: 'last', name: '불멍 힐링 (Relax)' })).toBeUndefined();
  });

  it('keeps the campfire for the relax routines and landscapes for the rest', () => {
    expect(sessionBackdropFor({ id: 'relax', name: '' })).toBe('campfire');
    expect(sessionBackdropFor({ id: 'amb:campfire_night', name: '' })).toBe('campfire');
    expect(sessionBackdropFor({ id: 'sleep_prep', name: '' })).toBeUndefined();
    expect(sessionBackdropFor(null)).toBeUndefined();
  });

  it('lets the glass follow the rain the listener hears', () => {
    expect(rainIntensityFor([])).toBe(0.18);
    expect(rainIntensityFor([{ type: 'fire', volume: 1 }])).toBe(0.18);
    expect(rainIntensityFor([{ type: 'rain', volume: 0.5 }])).toBe(0.75);
    expect(rainIntensityFor([{ type: 'rain', volume: 1, muted: true }])).toBe(0.35);
    expect(rainIntensityFor([{ type: 'rain', volume: 0.2 }, { type: 'window', volume: 0.9 }])).toBe(1.07);
  });
});
