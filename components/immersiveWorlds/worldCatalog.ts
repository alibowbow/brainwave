import { AMBIENCE_PRESETS, NATURE_MIXES, PRESETS } from '../../types';

/** Stable session IDs, not names, palette variants, or inferred sound types. */
export const WORLD_IDS = [
  'focus', 'relax', 'country_morning', 'sleep_prep', 'power_nap', 'meditation',
  'amb:morning_forest', 'amb:rainy_forest', 'amb:night_pond', 'amb:ocean_shore',
  'amb:waterfall_valley', 'amb:campfire_night', 'amb:deep_night', 'amb:snowy_night',
  'amb:summer_storm', 'amb:cosmic', 'amb:focus_cafe', 'amb:deep_forest', 'amb:cave_meditation',
  'nature:rural_summer_night', 'nature:tent_rain', 'nature:window_rain',
  'nature:monsoon_eaves', 'nature:deep_sea', 'nature:pebble_shore', 'nature:bamboo_grove',
  'nature:temple_dawn', 'nature:summer_valley', 'nature:scops_night', 'nature:campfire',
  'nature:womb', 'nature:winter_lodge',
] as const;

export type WorldId = typeof WORLD_IDS[number];
export type ProtectedWorldId = 'focus' | 'amb:ocean_shore';
export type UpgradeableWorldId = Exclude<WorldId, ProtectedWorldId>;
const worldIds = new Set<string>(WORLD_IDS);

export const isWorldId = (value: unknown): value is WorldId => typeof value === 'string' && worldIds.has(value);
export const isProtectedWorldId = (value: WorldId): value is ProtectedWorldId => value === 'focus' || value === 'amb:ocean_shore';

/** Normalizes HOME_CATALOG keys without coupling the renderer to home UI. */
export function worldIdForCard(cardId: string): WorldId | undefined {
  const id = cardId.startsWith('preset:') ? cardId.slice(7)
    : cardId.startsWith('ambience:') ? `amb:${cardId.slice(9)}` : cardId;
  return isWorldId(id) ? id : undefined;
}

const builtIns = [
  ...PRESETS.map(({ id, name }) => ({ id, name })),
  ...AMBIENCE_PRESETS.map(({ id, name }) => ({ id: `amb:${id}`, name })),
  ...NATURE_MIXES.map(({ id, name }) => ({ id: `nature:${id}`, name })),
];

/** Saved identity survives renamed presets and edited audio. Only legacy last
 * sessions may use an unambiguous exact built-in name; custom names never do. */
export function worldIdForSession(preset: { id: string; name?: string; worldId?: unknown } | null | undefined): WorldId | undefined {
  if (!preset) return undefined;
  if (isWorldId(preset.id)) return preset.id;
  if (isWorldId(preset.worldId)) return preset.worldId;
  if (preset.id !== 'last' || preset.worldId != null) return undefined;
  const matches = builtIns.filter(({ name }) => name === preset.name);
  return matches.length === 1 && isWorldId(matches[0].id) ? matches[0].id : undefined;
}

/** The only pilot ownership agreed so far; no imports until their PRs pass review. */
export const PILOT_DIRECTORIES = {
  'amb:focus_cafe': 'components/immersiveWorlds/cafe/',
  'amb:morning_forest': 'components/immersiveWorlds/forest/',
  'amb:cosmic': 'components/immersiveWorlds/cosmic/',
} as const satisfies Partial<Record<UpgradeableWorldId, string>>;
