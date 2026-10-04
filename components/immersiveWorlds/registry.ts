import { lazy, type LazyExoticComponent, type ComponentType } from 'react';
import type { ImmersiveWorldLoader, ImmersiveWorldProps } from './contract';
import { isProtectedWorldId, isWorldId, type UpgradeableWorldId } from './worldCatalog';

export type WorldLoaders = Partial<Record<UpgradeableWorldId, ImmersiveWorldLoader>>;

/** Explicit reviewed imports only. Never glob/eager-import an unfinished pilot.
 * Forest (#49, f4d24d6), café (#50, 8b9383b) and cosmic (#52, a0178fa)
 * enter draft QA only.
 * This is not a visual-quality approval. Other worlds keep their existing view. */
const approvedLoaders: WorldLoaders = {
  'amb:morning_forest': () => import('./forest/ForestWorld'),
  'amb:focus_cafe': () => import('./cafe/CafeWorld'),
  'amb:cosmic': () => import('./cosmic/CosmicWorld'),
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
