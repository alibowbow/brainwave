import { describe, expect, it } from 'vitest';
import { readAppRoute, resolveSessionLink, sessionForLink, sessionShareUrl, withAppRoute } from './appLink';
import type { LastSession, UserPreset } from './experience';

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
});
