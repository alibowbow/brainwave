import { createElement, Suspense } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'node:stream';
import { describe, expect, it, vi } from 'vitest';
import { createWorldRegistry, immersiveWorldRegistry, type WorldLoaders } from './registry';
import { WORLD_IDS } from './worldCatalog';

describe('reviewed world registration', () => {
  it('leaves all 32 existing scenes alone until a real reviewed module is registered', () => {
    for (const id of WORLD_IDS) {
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
