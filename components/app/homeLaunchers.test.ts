import { describe, expect, it } from 'vitest';
import { NATURE_MIXES, PRESETS } from '../../types';
import { HOME_NATURE_MIX_IDS, HOME_PRESET_IDS } from './homeLaunchers';

describe('home one-tap launchers', () => {
  it('shows all six built-in routines', () => {
    expect(HOME_PRESET_IDS).toHaveLength(6);
  });

  it('only references existing routine presets', () => {
    const known = new Set(PRESETS.map((preset) => preset.id));
    expect(HOME_PRESET_IDS.every((id) => known.has(id))).toBe(true);
  });

  it('does not duplicate routine cards', () => {
    expect(new Set(HOME_PRESET_IDS).size).toBe(HOME_PRESET_IDS.length);
  });

  it('shows four representative nature scenes', () => {
    expect(HOME_NATURE_MIX_IDS).toHaveLength(4);
  });

  it('only references existing nature mixes', () => {
    const known = new Set(NATURE_MIXES.map((mix) => mix.id));
    expect(HOME_NATURE_MIX_IDS.every((id) => known.has(id))).toBe(true);
  });

  it('does not duplicate nature scene cards', () => {
    expect(new Set(HOME_NATURE_MIX_IDS).size).toBe(HOME_NATURE_MIX_IDS.length);
  });
});
