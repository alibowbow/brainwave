import { describe, expect, it } from 'vitest';
import { AMBIENCE_PRESETS, NATURE_MIXES, PRESETS } from '../../types';
import { HOME_CATALOG } from './HomeDashboard';

describe('unified home catalog', () => {
  it('includes every routine, soundscape, and nature scene', () => {
    expect(HOME_CATALOG).toHaveLength(PRESETS.length + AMBIENCE_PRESETS.length + NATURE_MIXES.length);
  });

  it('preserves the complete source collection for each category', () => {
    expect(HOME_CATALOG.filter((entry) => entry.kind === 'routine').map((entry) => entry.source.id)).toEqual(PRESETS.map((preset) => preset.id));
    expect(HOME_CATALOG.filter((entry) => entry.kind === 'ambience').map((entry) => entry.source.id)).toEqual(AMBIENCE_PRESETS.map((preset) => preset.id));
    expect(HOME_CATALOG.filter((entry) => entry.kind === 'nature').map((entry) => entry.source.id)).toEqual(NATURE_MIXES.map((mix) => mix.id));
  });

  it('uses unique cross-category card ids', () => {
    expect(new Set(HOME_CATALOG.map((entry) => entry.id)).size).toBe(HOME_CATALOG.length);
  });

  it('promotes the rural summer night and keeps it cricket-only', () => {
    expect(NATURE_MIXES[0]).toMatchObject({
      id: 'rural_summer_night',
      layers: [{ type: 'ruralCrickets', volume: 0.78 }],
    });
    expect(HOME_CATALOG[0].id).toBe('nature:rural_summer_night');
  });
});
