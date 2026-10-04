import { createElement, Suspense } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'node:stream';
import { describe, expect, it, vi } from 'vitest';
import { createWorldRegistry, immersiveWorldRegistry, type WorldLoaders } from './registry';
import { WORLD_IDS } from './worldCatalog';

describe('reviewed world registration', () => {
  it('registers only admitted owned trees, with no protected overrides or placeholders', () => {
    const admitted = new Set(['amb:morning_forest', 'amb:cosmic', 'amb:focus_cafe',
      'meditation', 'nature:womb', 'amb:snowy_night', 'amb:waterfall_valley', 'amb:cave_meditation', 'nature:deep_sea',
      'amb:campfire_night', 'amb:deep_night', 'nature:campfire', 'amb:night_pond', 'nature:summer_valley', 'nature:pebble_shore',
      'nature:tent_rain', 'nature:window_rain', 'nature:monsoon_eaves', 'amb:summer_storm',
      'relax', 'sleep_prep', 'power_nap', 'nature:winter_lodge', 'nature:temple_dawn', 'nature:scops_night', 'nature:rural_summer_night',
      'country_morning', 'amb:rainy_forest', 'amb:deep_forest', 'nature:bamboo_grove']);
    expect(admitted.size).toBe(30);
    expect(new Set(WORLD_IDS.filter(id => immersiveWorldRegistry.has(id)))).toEqual(admitted);
    for (const id of WORLD_IDS) {
      if (admitted.has(id)) continue;
      expect(immersiveWorldRegistry.has(id)).toBe(false);
      expect(immersiveWorldRegistry.get(id)).toBeUndefined();
    }
  });

  it('rejects protected and unknown registrations, even from untyped callers', () => {
    const load = async () => ({ default: () => null });
    for (const id of ['focus', 'amb:ocean_shore', 'amb:unknown']) {
      expect(() => createWorldRegistry({ [id]: load } as WorldLoaders)).toThrow('Cannot register immersive world');
    }
  });

  it('loads only a rendered scene and reuses its lazy identity across player/fullscreen', async () => {
    const cafeLoad = vi.fn(async () => ({ default: ({ active }: { active: boolean }) => createElement('span', null, active ? 'running' : 'paused') }));
    const forestLoad = vi.fn(async () => ({ default: () => null }));
    const registry = createWorldRegistry({ 'amb:focus_cafe': cafeLoad, 'amb:morning_forest': forestLoad });
    expect(registry.has('amb:focus_cafe')).toBe(true);
    const Cafe = registry.get('amb:focus_cafe')!;
    expect(registry.get('amb:focus_cafe')).toBe(Cafe);
    expect(cafeLoad).not.toHaveBeenCalled();
    const html = await new Promise<string>((resolve, reject) => {
      let output = '';
      const sink = new Writable({ write(chunk, _encoding, done) { output += chunk.toString(); done(); } });
      sink.on('finish', () => resolve(output));
      const stream = renderToPipeableStream(createElement(Suspense, { fallback: 'existing scene' }, createElement(Cafe, { active: false })), {
        onAllReady() { stream.pipe(sink); }, onError: reject,
      });
    });
    expect(html).toContain('paused');
    expect(cafeLoad).toHaveBeenCalledTimes(1);
    expect(forestLoad).not.toHaveBeenCalled();
  });
});
