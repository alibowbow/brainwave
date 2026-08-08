export const FORCE_UPDATE_PARAM = 'brainwave-update';

export type AppUpdateStatus = 'idle' | 'checking' | 'ready' | 'installing' | 'error';

interface ForcedRefreshOptions {
  registration: Pick<ServiceWorkerRegistration, 'scope' | 'unregister'> | null;
  scopeUrl: string;
  currentUrl: string;
  fetcher?: typeof fetch;
  cacheStorage?: Pick<CacheStorage, 'keys' | 'delete'>;
  now?: () => number;
}

export const withForceUpdateNonce = (href: string, timestamp = Date.now()) => {
  const url = new URL(href);
  url.searchParams.set(FORCE_UPDATE_PARAM, String(timestamp));
  return url.toString();
};

export const stripForceUpdateNonce = (href: string) => {
  const url = new URL(href);
  url.searchParams.delete(FORCE_UPDATE_PARAM);
  return url.toString();
};

export const isScopedPrecache = (cacheName: string, scopeUrl: string) => (
  cacheName.startsWith('workbox-precache') && cacheName.includes(scopeUrl)
);

export const waitForWaitingWorker = async (
  registration: ServiceWorkerRegistration,
  timeoutMs = 6_000,
) => {
  if (registration.waiting) return true;
  const worker = registration.installing;
  if (!worker) return false;
  if (worker.state === 'installed') return true;

  return new Promise<boolean>((resolve) => {
    let settled = false;
    const finish = (ready: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      worker.removeEventListener('statechange', onStateChange);
      resolve(ready);
    };
    const onStateChange = () => {
      if (worker.state === 'installed') finish(true);
      else if (worker.state === 'redundant') finish(false);
    };
    const timeout = window.setTimeout(
      () => finish(Boolean(registration.waiting) || worker.state === 'installed'),
      timeoutMs,
    );
    worker.addEventListener('statechange', onStateChange);
  });
};

/**
 * Verifies that the network is reachable, then removes only this app's shell
 * precache and registration. User data and large nature audio/video caches are
 * deliberately preserved. The caller navigates to the returned cache-busted URL.
 */
export const prepareForcedRefresh = async ({
  registration,
  scopeUrl,
  currentUrl,
  fetcher = fetch,
  cacheStorage = typeof caches === 'undefined' ? undefined : caches,
  now = Date.now,
}: ForcedRefreshOptions) => {
  const timestamp = now();
  const probeUrl = new URL('manifest.webmanifest', scopeUrl);
  probeUrl.searchParams.set(FORCE_UPDATE_PARAM, String(timestamp));
  const response = await fetcher(probeUrl, { cache: 'no-store' });
  if (!response.ok) throw new Error(`update-probe-${response.status}`);

  const effectiveScope = registration?.scope ?? scopeUrl;
  if (cacheStorage) {
    const cacheNames = await cacheStorage.keys();
    await Promise.all(
      cacheNames
        .filter((cacheName) => isScopedPrecache(cacheName, effectiveScope))
        .map((cacheName) => cacheStorage.delete(cacheName)),
    );
  }
  await registration?.unregister();
  return withForceUpdateNonce(currentUrl, timestamp);
};
