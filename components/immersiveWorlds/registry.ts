import { createElement, lazy, type LazyExoticComponent, type ComponentType } from 'react';
import type { ImmersiveWorldLoader, ImmersiveWorldProps } from './contract';
import { isProtectedWorldId, isWorldId, type UpgradeableWorldId } from './worldCatalog';

export type WorldLoaders = Partial<Record<UpgradeableWorldId, ImmersiveWorldLoader>>;

/** Exact owned trees admitted for integration QA. Registration is not a final
 * quality/lifecycle approval; the intake ledger records outstanding gates.
 * Explicit lazy entries keep every renderer out of startup imports. */
const approvedLoaders: WorldLoaders = {
  'amb:morning_forest': () => import('./forest/ForestWorld'),
  'amb:focus_cafe': () => import('./cafe/CafeWorld'),
  'amb:cosmic': () => import('./cosmic/CosmicWorld').then(({ default: World }) => ({
    default: ({ onInteraction, ...props }: ImmersiveWorldProps) => createElement(World, { ...props, onInteract: onInteraction }),
  })),
  'meditation': () => import('./quietSanctuaries/MeditationCourtWorld'),
  'nature:womb': () => import('./quietSanctuaries/WarmHeartWorld'),
  'amb:snowy_night': () => import('./quietSanctuaries/SnowVillageWorld'),
  'amb:waterfall_valley': () => import('./deepWater/WaterfallWorld'),
  'amb:cave_meditation': () => import('./deepWater/CaveWorld'),
  'nature:deep_sea': () => import('./deepWater/DeepSeaWorld'),
  'amb:campfire_night': () => import('./nightFires/MountainCampfireWorld'),
  'amb:deep_night': () => import('./nightFires/DeepNightWorld'),
  'nature:campfire': () => import('./nightFires/LakesideCampWorld'),
  'amb:night_pond': () => import('./waterEdge/NightPondWorld'),
  'nature:summer_valley': () => import('./waterEdge/SummerValleyWorld'),
  'nature:pebble_shore': () => import('./waterEdge/PebbleShoreWorld'),
  'nature:tent_rain': () => import('./rainShelters/RainTentWorld'),
  'nature:window_rain': () => import('./rainShelters/GardenWindowWorld'),
  'nature:monsoon_eaves': () => import('./rainShelters/MonsoonPorchWorld'),
  'amb:summer_storm': () => import('./rainShelters/SummerStormWorld'),
  'relax': () => import('./cozyRooms/HearthWorld'),
  'sleep_prep': () => import('./cozyRooms/SleepRoomWorld'),
  'power_nap': () => import('./cozyRooms/NapTerraceWorld'),
  'nature:winter_lodge': () => import('./cozyRooms/WinterLodgeWorld'),
  'nature:temple_dawn': () => import('./koreanPlaces/TempleWorld'),
  'nature:scops_night': () => import('./koreanPlaces/ScopsNightWorld'),
  'nature:rural_summer_night': () => import('./koreanPlaces/RuralSummerNightWorld'),
  'country_morning': () => import('./livingWoods/MorningPorchWorld'),
  'amb:rainy_forest': () => import('./livingWoods/RainyForestWorld'),
  'amb:deep_forest': () => import('./livingWoods/AncientForestWorld'),
  'nature:bamboo_grove': () => import('./livingWoods/BambooWorld'),
};

export function createWorldRegistry(loaders: WorldLoaders) {
  const entries = new Map(Object.entries(loaders));
  for (const id of entries.keys()) {
    if (!isWorldId(id) || isProtectedWorldId(id)) throw new Error(`Cannot register immersive world: ${id}`);
  }
  const components = new Map<string, LazyExoticComponent<ComponentType<ImmersiveWorldProps>>>();
  return {
    has(id: unknown): boolean { return typeof id === 'string' && entries.has(id); },
    get(id: unknown) {
      if (typeof id !== 'string') return undefined;
      const load = entries.get(id);
      if (!load) return undefined;
      let component = components.get(id);
      if (!component) {
        component = lazy(load);
        components.set(id, component);
      }
      return component;
    },
  };
}

export const immersiveWorldRegistry = createWorldRegistry(approvedLoaders);
