import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { HOME_CATALOG } from '../app/HomeDashboard';
import { AMBIENCE_PRESETS, NATURE_MIXES, PRESETS } from '../../types';
import { sessionBackdropFor } from '../session/sessionBackdrop';
import { isProtectedWorldId, isWorldId, PILOT_DIRECTORIES, WORLD_IDS, worldIdForCard, worldIdForSession } from './worldCatalog';

describe('canonical immersive world mapping', () => {
  it('matches the exact 30 canonical IDs in the supplied implementation brief', () => {
    const brief = readFileSync(new URL('../../docs/immersive-worlds/scene-upgrade-implementation-brief.md', import.meta.url), 'utf8');
    const planned = [...brief.matchAll(/^\d+\. \*\*([a-z_:]+) —/gm)].map(match => match[1]);
    expect(planned).toHaveLength(30);
    expect(new Set(planned).size).toBe(30);
    expect(planned.sort()).toEqual(WORLD_IDS.filter(id => !isProtectedWorldId(id)).sort());
  });
  it('covers all 32 actual home cards exactly once, with 30 upgrade candidates', () => {
    const mapped = HOME_CATALOG.map(({ id }) => worldIdForCard(id));
    expect(mapped).toHaveLength(32);
    expect(new Set(mapped).size).toBe(32);
    expect([...mapped].sort()).toEqual([...WORLD_IDS].sort());
    expect(WORLD_IDS.filter(isProtectedWorldId)).toEqual(['focus', 'amb:ocean_shore']);
    expect(WORLD_IDS.filter(id => !isProtectedWorldId(id))).toHaveLength(30);
  });

  it('keeps ordinary window/pebble/campfire cards distinct from the protected worlds', () => {
    for (const id of ['nature:window_rain', 'nature:pebble_shore', 'nature:campfire'] as const) {
      expect(isProtectedWorldId(id)).toBe(false);
      expect(worldIdForSession({ id })).toBe(id);
    }
    expect(worldIdForSession({ id: 'amb:focus_cafe', worldId: 'focus' })).toBe('amb:focus_cafe');
    expect(PILOT_DIRECTORIES['amb:cosmic']).toBe('components/immersiveWorlds/cosmic/');
  });

  it('keeps identity through renamed saves and resolves legacy last sessions only by an exact built-in name', () => {
    expect(worldIdForSession({ id: 'user:1', name: '이름 변경', worldId: 'amb:cosmic' })).toBe('amb:cosmic');
    for (const { id, name } of [
      ...PRESETS,
      ...AMBIENCE_PRESETS.map(p => ({ ...p, id: `amb:${p.id}` })),
      ...NATURE_MIXES.map(p => ({ ...p, id: `nature:${p.id}` })),
    ]) expect(worldIdForSession({ id: 'last', name })).toBe(id);
    expect(worldIdForSession({ id: 'user:2', name: '우주 명상' })).toBeUndefined();
    expect(worldIdForSession({ id: 'last', name: '우주 명상', worldId: 'invalid' })).toBeUndefined();
    expect(worldIdForSession({ id: 'last', name: '알 수 없는 장면' })).toBeUndefined();
    expect(isWorldId('__proto__')).toBe(false);
    expect(worldIdForCard('ambience:unknown')).toBeUndefined();
  });

  it('retains protected renderers on renamed saved presets and ignores misleading names', () => {
    expect(sessionBackdropFor({ id: 'user:1', name: '창가', worldId: 'focus' })).toBe('rainy-window');
    expect(sessionBackdropFor({ id: 'last', name: '바다', worldId: 'amb:ocean_shore' })).toBe('oil-sea');
    expect(sessionBackdropFor({ id: 'user:2', name: '파도 해변' })).toBeUndefined();
    expect(sessionBackdropFor({ id: 'last', name: '깊은 집중 (Focus)', worldId: 'amb:cosmic' })).toBeUndefined();
    expect(sessionBackdropFor({ id: 'last', name: '파도 해변', worldId: 'amb:focus_cafe' })).toBeUndefined();
  });
});
