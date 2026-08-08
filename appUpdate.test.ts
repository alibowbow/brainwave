import { describe, expect, it, vi } from 'vitest';
import {
  FORCE_UPDATE_PARAM,
  isScopedPrecache,
  prepareForcedRefresh,
  stripForceUpdateNonce,
  withForceUpdateNonce,
} from './appUpdate';

describe('forced app update helpers', () => {
  it('adds and removes a cache-busting marker without losing the route', () => {
    const refreshed = withForceUpdateNonce('https://example.com/brainwave/?mode=nature#pond', 42);
    expect(refreshed).toBe(`https://example.com/brainwave/?mode=nature&${FORCE_UPDATE_PARAM}=42#pond`);
    expect(stripForceUpdateNonce(refreshed)).toBe('https://example.com/brainwave/?mode=nature#pond');
  });

  it('targets only the Workbox precache for the Brainwave scope', () => {
    const scope = 'https://example.com/brainwave/';
    expect(isScopedPrecache(`workbox-precache-v2-${scope}`, scope)).toBe(true);
    expect(isScopedPrecache('nature-audio-v1', scope)).toBe(false);
    expect(isScopedPrecache('workbox-precache-v2-https://example.com/eng/', scope)).toBe(false);
  });

  it('checks the network before replacing only the scoped app shell cache', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    const unregister = vi.fn().mockResolvedValue(true);
    const deleteCache = vi.fn().mockResolvedValue(true);
    const cacheStorage = {
      keys: vi.fn().mockResolvedValue([
        'workbox-precache-v2-https://example.com/brainwave/',
        'workbox-precache-v2-https://example.com/eng/',
        'nature-audio-v1',
      ]),
      delete: deleteCache,
    };

    const nextUrl = await prepareForcedRefresh({
      registration: { scope: 'https://example.com/brainwave/', unregister },
      scopeUrl: 'https://example.com/brainwave/',
      currentUrl: 'https://example.com/brainwave/#night',
      fetcher: fetcher as unknown as typeof fetch,
      cacheStorage,
      now: () => 99,
    });

    expect(fetcher).toHaveBeenCalledWith(
      new URL(`https://example.com/brainwave/manifest.webmanifest?${FORCE_UPDATE_PARAM}=99`),
      { cache: 'no-store' },
    );
    expect(deleteCache).toHaveBeenCalledTimes(1);
    expect(deleteCache).toHaveBeenCalledWith('workbox-precache-v2-https://example.com/brainwave/');
    expect(unregister).toHaveBeenCalledOnce();
    expect(nextUrl).toBe(`https://example.com/brainwave/?${FORCE_UPDATE_PARAM}=99#night`);
  });

  it('keeps the current worker and caches intact when the network probe fails', async () => {
    const unregister = vi.fn();
    const deleteCache = vi.fn();
    await expect(prepareForcedRefresh({
      registration: { scope: 'https://example.com/brainwave/', unregister },
      scopeUrl: 'https://example.com/brainwave/',
      currentUrl: 'https://example.com/brainwave/',
      fetcher: vi.fn().mockResolvedValue({ ok: false, status: 503 }) as unknown as typeof fetch,
      cacheStorage: { keys: vi.fn(), delete: deleteCache },
    })).rejects.toThrow('update-probe-503');
    expect(deleteCache).not.toHaveBeenCalled();
    expect(unregister).not.toHaveBeenCalled();
  });
});
