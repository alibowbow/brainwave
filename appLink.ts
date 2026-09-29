import { defaultSoundLevel } from './audioLevels';
import type { AppView } from './components/app/AppShell';
import type { LastSession, UserPreset } from './experience';
import { AMBIENCE_PRESETS, NATURE_MIXES, PRESETS, type AmbiencePreset, type NatureMix, type SessionPreset } from './types';

/*
 * Addresses for the app's pages, carried after `#` so any static host serves
 * them without extra configuration:
 *   (no hash)            home
 *   #/library …          a top-level page
 *   #/play/focus         a routine on the player (#/play/amb/cosmic for a
 *                        sound scene, #/play/nature/<mix>, #/play/user/<id>
 *                        for one saved on this device, #/play/last)
 */

export type AppRoute =
  | { kind: 'view'; view: AppView }
  | { kind: 'play'; sessionId: string };

const LINKED_VIEWS = new Set<AppView>(['library', 'nature', 'guide', 'insights', 'settings']);
const SESSION_KINDS = new Set(['amb', 'nature', 'user']);
const SEGMENT = /^[a-z0-9_-]{1,64}$/i;

/** The hash for a route; home has none, so its address stays the plain app address. */
export const appRouteHash = (route: AppRoute | null) => {
  if (!route || (route.kind === 'view' && route.view === 'home')) return '';
  if (route.kind === 'view') return `#/${route.view}`;
  const parts = route.sessionId.split(':');
  if (parts.length > 2 || !parts.every((part) => SEGMENT.test(part))) return '';
  if (parts.length === 2 && !SESSION_KINDS.has(parts[0])) return '';
  return `#/play/${parts.join('/')}`;
};

/** The route a URL's hash names, if any (other hashes, such as in-page anchors, are left alone). */
export const readAppRoute = (href: string): AppRoute | null => {
  const hash = new URL(href).hash;
  if (!hash.startsWith('#/')) return null;
  let path: string;
  try { path = decodeURIComponent(hash.slice(2)); } catch { return null; }
  const segments = path.split('/').filter(Boolean);
  if (!segments.length || !segments.every((segment) => SEGMENT.test(segment))) return null;
  if (segments[0] === 'play') {
    if (segments.length === 2) return { kind: 'play', sessionId: segments[1] };
    if (segments.length === 3 && SESSION_KINDS.has(segments[1])) return { kind: 'play', sessionId: `${segments[1]}:${segments[2]}` };
    return null;
  }
  if (segments.length === 1 && LINKED_VIEWS.has(segments[0] as AppView)) return { kind: 'view', view: segments[0] as AppView };
  return null;
};

/** `href` addressing `route`, with everything else in it kept. */
export const withAppRoute = (href: string, route: AppRoute | null) => {
  const url = new URL(href);
  url.hash = appRouteHash(route);
  return url.toString();
};

/** A clean link to share a routine: the app's address and the routine, nothing else. */
export const sessionShareUrl = (appUrl: string, sessionId: string) => {
  const url = new URL(appUrl);
  url.search = '';
  return withAppRoute(url.toString(), { kind: 'play', sessionId });
};

export type SessionLinkTarget =
  | { kind: 'preset'; preset: SessionPreset }
  | { kind: 'ambience'; preset: AmbiencePreset }
  | { kind: 'nature'; mix: NatureMix }
  | { kind: 'user'; preset: UserPreset }
  | { kind: 'last'; session: LastSession };

/** What a routine link opens here, or null when this device has no such routine. */
export const resolveSessionLink = (
  sessionId: string,
  saved: { userPresets: readonly UserPreset[]; lastSession: LastSession | null },
): SessionLinkTarget | null => {
  const [kind, id] = sessionId.includes(':') ? sessionId.split(':') : ['', sessionId];
  if (!kind) {
    if (id === 'last') return saved.lastSession ? { kind: 'last', session: saved.lastSession } : null;
    const preset = PRESETS.find((item) => item.id === id);
    return preset ? { kind: 'preset', preset } : null;
  }
  if (kind === 'amb') {
    const preset = AMBIENCE_PRESETS.find((item) => item.id === id);
    return preset ? { kind: 'ambience', preset } : null;
  }
  if (kind === 'nature') {
    const mix = NATURE_MIXES.find((item) => item.id === id);
    return mix ? { kind: 'nature', mix } : null;
  }
  if (kind === 'user') {
    const preset = saved.userPresets.find((item) => item.id === id);
    return preset ? { kind: 'user', preset } : null;
  }
  return null;
};

/**
 * How a linked routine plays: what the player shows (`selected`) and the
 * settings to start it with (`snapshot`). A snapshot without `mix` keeps the
 * listener's current volumes, as starting the routine from its card does.
 */
export const sessionForLink = (target: SessionLinkTarget, natureMinutes: number): { selected: SessionPreset; snapshot: LastSession } => {
  switch (target.kind) {
    case 'preset': {
      const { preset } = target;
      const sound = preset.defaultBackgroundSound;
      return {
        selected: preset,
        snapshot: {
          name: preset.name,
          brainWaveType: preset.brainWaveType,
          toneMode: 'binaural',
          brainwaveEnabled: true,
          durationMinutes: preset.defaultDurationMinutes,
          layers: sound === 'none' ? [] : [{ type: sound, volume: defaultSoundLevel(sound) }],
          sleepMode: preset.id === 'sleep_prep',
        },
      };
    }
    case 'ambience': {
      const { preset } = target;
      return {
        selected: {
          id: `amb:${preset.id}`,
          name: preset.name,
          description: preset.description,
          defaultDurationMinutes: preset.durationMinutes,
          brainWaveType: preset.brainWaveType,
          defaultBackgroundSound: 'none',
        },
        snapshot: {
          name: preset.name,
          brainWaveType: preset.brainWaveType,
          toneMode: 'binaural',
          brainwaveEnabled: true,
          durationMinutes: preset.durationMinutes,
          layers: preset.layers.map((layer) => ({ ...layer })),
          sleepMode: false,
        },
      };
    }
    case 'nature': {
      const { mix } = target;
      return {
        selected: {
          id: `nature:${mix.id}`,
          name: mix.name,
          description: '자연음만으로 구성하는 사운드 장면',
          defaultDurationMinutes: natureMinutes,
          brainWaveType: 'alpha',
          defaultBackgroundSound: 'none',
        },
        snapshot: {
          name: mix.name,
          brainWaveType: 'alpha',
          toneMode: 'binaural',
          brainwaveEnabled: false,
          durationMinutes: natureMinutes,
          layers: mix.layers.map((layer) => ({ ...layer })),
          sleepMode: false,
        },
      };
    }
    case 'user': {
      const { preset } = target;
      return {
        selected: {
          id: `user:${preset.id}`,
          name: preset.name,
          description: '내가 저장한 리듬과 사운드 조합',
          defaultDurationMinutes: preset.durationMinutes,
          brainWaveType: preset.brainWaveType,
          defaultBackgroundSound: 'none',
        },
        snapshot: {
          name: preset.name,
          brainWaveType: preset.brainWaveType,
          toneMode: preset.toneMode,
          brainwaveEnabled: preset.brainwaveEnabled,
          durationMinutes: preset.durationMinutes,
          layers: preset.layers.map((layer) => ({ ...layer })),
          sleepMode: false,
          mix: preset.mix,
        },
      };
    }
    case 'last': {
      const { session } = target;
      return {
        selected: {
          id: 'last',
          name: session.name,
          description: '최근 사용한 리듬과 사운드 조합',
          defaultDurationMinutes: session.durationMinutes,
          brainWaveType: session.brainWaveType,
          defaultBackgroundSound: 'none',
        },
        snapshot: { ...session, layers: session.layers.map((layer) => ({ ...layer })) },
      };
    }
  }
};
