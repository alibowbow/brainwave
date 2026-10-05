import { describe, expect, it } from 'vitest';
import { readAppRoute, resolveSessionLink, sessionForLink, sessionShareUrl, withAppRoute } from './appLink';
import type { LastSession, UserPreset } from './experience';
import { createBackupPayload, parseBackupPayload } from './experience';
import { WORLD_IDS, worldIdForSession } from './components/immersiveWorlds/worldCatalog';

const APP = 'https://example.com/brainwave/';
const saved = {
  userPresets: [{ id: '1695000000000', name: '내 저녁', brainWaveType: 'alpha', toneMode: 'binaural', brainwaveEnabled: true, durationMinutes: 20, layers: [] }] as UserPreset[],
  lastSession: { name: '깊은 집중 (Focus)', brainWaveType: 'alpha', toneMode: 'binaural', brainwaveEnabled: true, durationMinutes: 40, layers: [], sleepMode: false } as LastSession,
};

describe('app addresses', () => {
  it('gives pages and routines readable hash addresses and keeps home plain', () => {
    expect(withAppRoute(APP, { kind: 'view', view: 'library' })).toBe(`${APP}#/library`);
    expect(withAppRoute(`${APP}#/library`, { kind: 'view', view: 'home' })).toBe(APP);
    expect(withAppRoute(APP, { kind: 'play', sessionId: 'focus' })).toBe(`${APP}#/play/focus`);
    expect(withAppRoute(APP, { kind: 'play', sessionId: 'amb:cosmic' })).toBe(`${APP}#/play/amb/cosmic`);
    expect(withAppRoute(`${APP}?v=2`, { kind: 'play', sessionId: 'nature:tent_rain' })).toBe(`${APP}?v=2#/play/nature/tent_rain`);
    expect(withAppRoute(`${APP}#/play/focus`, null)).toBe(APP);
  });

  it('never writes an address it could not read back', () => {
    expect(withAppRoute(APP, { kind: 'play', sessionId: 'odd:kind' })).toBe(APP);
    expect(withAppRoute(APP, { kind: 'play', sessionId: 'has space' })).toBe(APP);
  });

  it('reads back every address it writes', () => {
    for (const route of [
      { kind: 'view', view: 'insights' },
      { kind: 'play', sessionId: 'focus' },
      { kind: 'play', sessionId: 'amb:cosmic' },
      { kind: 'play', sessionId: 'user:1695000000000' },
      { kind: 'play', sessionId: 'last' },
    ] as const) {
      expect(readAppRoute(withAppRoute(APP, route))).toEqual(route);
    }
  });

  it('ignores hashes that are not app addresses', () => {
    expect(readAppRoute(APP)).toBeNull();
    expect(readAppRoute(`${APP}#main`)).toBeNull();
    expect(readAppRoute(`${APP}#/home`)).toBeNull();
    expect(readAppRoute(`${APP}#/play`)).toBeNull();
    expect(readAppRoute(`${APP}#/play/other/focus`)).toBeNull();
    expect(readAppRoute(`${APP}#/play/${encodeURIComponent('<script>')}`)).toBeNull();
    expect(readAppRoute(`${APP}#/%E0%A4%A`)).toBeNull();
  });

  it('shares only the routine, never the rest of the address', () => {
    expect(sessionShareUrl(`${APP}?__force_update=1#/library`, 'amb:cosmic')).toBe(`${APP}#/play/amb/cosmic`);
  });
});

describe('routine links', () => {
  it('finds built-in routines, sound scenes and what this device saved', () => {
    expect(resolveSessionLink('focus', saved)).toMatchObject({ kind: 'preset', preset: { id: 'focus' } });
    expect(resolveSessionLink('amb:cosmic', saved)).toMatchObject({ kind: 'ambience', preset: { id: 'cosmic', name: '우주 명상' } });
    expect(resolveSessionLink('nature:tent_rain', saved)).toMatchObject({ kind: 'nature', mix: { id: 'tent_rain' } });
    expect(resolveSessionLink('user:1695000000000', saved)).toMatchObject({ kind: 'user', preset: { name: '내 저녁' } });
    expect(resolveSessionLink('last', saved)).toMatchObject({ kind: 'last', session: { name: '깊은 집중 (Focus)' } });
  });

  it('opens nothing for routines that do not exist here', () => {
    expect(resolveSessionLink('amb:nowhere', saved)).toBeNull();
    expect(resolveSessionLink('user:123', saved)).toBeNull();
    expect(resolveSessionLink('last', { userPresets: [], lastSession: null })).toBeNull();
    expect(resolveSessionLink('other:focus', saved)).toBeNull();
  });
});

describe('linked routines', () => {
  it('set up each routine the way its own card starts it', () => {
    const focus = sessionForLink(resolveSessionLink('focus', saved)!, 30);
    expect(focus.selected.id).toBe('focus');
    expect(focus.snapshot).toMatchObject({ durationMinutes: 40, brainwaveEnabled: true, sleepMode: false, layers: [{ type: 'rain' }] });
    expect(focus.snapshot.mix).toBeUndefined();

    const cosmic = sessionForLink(resolveSessionLink('amb:cosmic', saved)!, 30);
    expect(cosmic.selected).toMatchObject({ id: 'amb:cosmic', name: '우주 명상' });
    expect(cosmic.snapshot.layers.length).toBeGreaterThan(0);

    const tent = sessionForLink(resolveSessionLink('nature:tent_rain', saved)!, 45);
    expect(tent.selected.id).toBe('nature:tent_rain');
    expect(tent.snapshot).toMatchObject({ brainwaveEnabled: false, durationMinutes: 45 });

    expect(sessionForLink(resolveSessionLink('sleep_prep', saved)!, 30).snapshot.sleepMode).toBe(true);
    expect(sessionForLink(resolveSessionLink('user:1695000000000', saved)!, 30).selected.id).toBe('user:1695000000000');
    expect(sessionForLink(resolveSessionLink('last', saved)!, 30).selected).toMatchObject({ id: 'last', name: '깊은 집중 (Focus)' });
  });

  it('carries every built-in card identity into its selected session and saved snapshot', () => {
    for (const id of WORLD_IDS) {
      const target = resolveSessionLink(id, saved);
      expect(target, id).not.toBeNull();
      const linked = sessionForLink(target!, 30);
      expect(linked.selected.worldId, id).toBe(id);
      expect(linked.snapshot.worldId, id).toBe(id);
      expect(worldIdForSession(linked.selected), id).toBe(id);
      const resumed = sessionForLink({ kind: 'last', session: linked.snapshot }, 30);
      expect(resumed.selected.worldId, id).toBe(id);
    }
  });

  it('retains the space after renaming, editing audio, exporting, importing and resuming a saved preset', () => {
    const edited: UserPreset = {
      ...saved.userPresets[0],
      name: '내 새로운 휴식',
      worldId: 'amb:focus_cafe',
      layers: [{ type: 'deepsea', volume: 0.3 }],
    };
    const imported = parseBackupPayload(JSON.parse(JSON.stringify(createBackupPayload([], [edited], null))))!;
    const linked = sessionForLink(resolveSessionLink(`user:${edited.id}`, { userPresets: imported.presets, lastSession: null })!, 30);
    expect(linked.selected).toMatchObject({ id: `user:${edited.id}`, name: edited.name, worldId: 'amb:focus_cafe' });
    expect(linked.snapshot).toMatchObject({ name: edited.name, worldId: 'amb:focus_cafe', layers: edited.layers });
    expect(linked.snapshot.layers).not.toBe(edited.layers);
    const resumed = sessionForLink(resolveSessionLink('last', { userPresets: [], lastSession: linked.snapshot })!, 30);
    expect(resumed.selected).toMatchObject({ id: 'last', worldId: 'amb:focus_cafe' });
    expect(resumed.snapshot.layers).toEqual(edited.layers);
  });

  it('recovers legacy built-in last sessions without guessing a scene for custom saved names', () => {
    expect(sessionForLink({ kind: 'last', session: saved.lastSession }, 30).snapshot.worldId).toBe('focus');
    const custom = sessionForLink({ kind: 'user', preset: { ...saved.userPresets[0], name: saved.lastSession.name } }, 30);
    expect(custom.selected.worldId).toBeUndefined();
    expect(custom.snapshot.worldId).toBeUndefined();
  });

  it('ignores invalid scene identities from unvalidated local saved records', () => {
    const custom = sessionForLink({ kind: 'user', preset: { ...saved.userPresets[0], worldId: 'future:space' } }, 30);
    const recent = sessionForLink({ kind: 'last', session: { ...saved.lastSession, worldId: 'future:space' } }, 30);
    expect(custom.selected.worldId).toBeUndefined();
    expect(custom.snapshot.worldId).toBeUndefined();
    expect(recent.selected.worldId).toBeUndefined();
    expect(recent.snapshot.worldId).toBeUndefined();
  });
});
