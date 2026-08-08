import type { AppView } from './components/app/AppShell';

export type AppViewMode = 'list' | 'config' | 'player' | 'feedback';

export interface AppLocation {
  activeView: AppView;
  viewMode: AppViewMode;
  immersive: boolean;
}

export interface AppHistoryEntry extends AppLocation {
  index: number;
  version: 1;
}

export const APP_HISTORY_KEY = '__brainwaveNavigation';
export const NATURE_SCENE_HISTORY_KEY = '__brainwaveNatureScene';

const APP_VIEWS = new Set<AppView>(['home', 'library', 'nature', 'insights', 'settings']);
const VIEW_MODES = new Set<AppViewMode>(['list', 'config', 'player', 'feedback']);

const stateObject = (state: unknown): Record<string, unknown> => (
  state != null && typeof state === 'object' ? state as Record<string, unknown> : {}
);

export const sameLocation = (left: AppLocation, right: AppLocation) => (
  left.activeView === right.activeView
  && left.viewMode === right.viewMode
  && left.immersive === right.immersive
);

export const readAppHistoryEntry = (state: unknown): AppHistoryEntry | null => {
  const candidate = stateObject(state)[APP_HISTORY_KEY];
  if (candidate == null || typeof candidate !== 'object') return null;
  const entry = candidate as Partial<AppHistoryEntry>;
  if (
    entry.version !== 1
    || typeof entry.activeView !== 'string'
    || !APP_VIEWS.has(entry.activeView as AppView)
    || typeof entry.viewMode !== 'string'
    || !VIEW_MODES.has(entry.viewMode as AppViewMode)
    || typeof entry.immersive !== 'boolean'
    || !Number.isInteger(entry.index)
    || (entry.index ?? -1) < 0
  ) return null;
  return entry as AppHistoryEntry;
};

export const withAppHistoryEntry = (state: unknown, entry: AppHistoryEntry) => ({
  ...stateObject(state),
  [APP_HISTORY_KEY]: entry,
});

export const withNatureSceneHistory = (state: unknown) => ({
  ...stateObject(state),
  [NATURE_SCENE_HISTORY_KEY]: true,
});

export const hasNatureSceneHistory = (state: unknown) => (
  stateObject(state)[NATURE_SCENE_HISTORY_KEY] === true
);

