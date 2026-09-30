import { describe, expect, it } from 'vitest';
import { AMBIENCE_PRESETS, PRESETS } from '../../types';
import { rainIntensityFor, sessionBackdropFor, waveEnergyFor } from './sessionBackdrop';

const focus = PRESETS.find((preset) => preset.id === 'focus')!;
const ocean = AMBIENCE_PRESETS.find((preset) => preset.id === 'ocean_shore')!;

describe('session backdrop', () => {
  it('plays the deep-focus routine in the rainy study, including when resumed', () => {
    expect(sessionBackdropFor(focus)).toBe('rainy-window');
    expect(sessionBackdropFor({ id: 'last', name: focus.name })).toBe('rainy-window');
    expect(sessionBackdropFor({ id: 'last', name: '불멍 힐링 (Relax)' })).toBeUndefined();
  });

  it('plays the ocean shore in front of the painted sea, including when resumed', () => {
    expect(sessionBackdropFor({ id: `amb:${ocean.id}`, name: ocean.name })).toBe('oil-sea');
    expect(sessionBackdropFor({ id: 'last', name: ocean.name })).toBe('oil-sea');
    expect(sessionBackdropFor({ id: 'amb:waterfall_valley', name: '폭포 계곡' })).toBeUndefined();
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

  it('lets the surf follow the waves the listener hears', () => {
    expect(waveEnergyFor([])).toBe(0.2);
    expect(waveEnergyFor([{ type: 'seabirds', volume: 1 }])).toBe(0.2);
    expect(waveEnergyFor(ocean.layers)).toBe(1.12);
    expect(waveEnergyFor([{ type: 'wave', volume: 1, muted: true }])).toBe(0.2);
    expect(waveEnergyFor([{ type: 'wave', volume: 3 }])).toBe(1.3);
  });
});
