import { registerSW } from 'virtual:pwa-register';
import { isLegacyNatureAudioCache } from './appUpdate';

export type PwaUpdateSignal = 'idle' | 'ready' | 'error';

type SignalListener = (signal: PwaUpdateSignal) => void;

let started = false;
let signal: PwaUpdateSignal = 'idle';
let registration: ServiceWorkerRegistration | null = null;
let updateServiceWorker: ((reloadPage?: boolean) => Promise<void>) | null = null;
const listeners = new Set<SignalListener>();

const emit = (nextSignal: PwaUpdateSignal) => {
  signal = nextSignal;
  listeners.forEach((listener) => listener(nextSignal));
};

export const subscribeToPwaUpdates = (listener: SignalListener) => {
  listeners.add(listener);
  listener(signal);
  return () => listeners.delete(listener);
};

export const startPwaClient = () => {
  if (started || !('serviceWorker' in navigator)) return;
  started = true;
  if (typeof caches !== 'undefined') {
    void caches.keys().then((cacheNames) => Promise.all(
      cacheNames.filter(isLegacyNatureAudioCache).map((cacheName) => caches.delete(cacheName)),
    )).catch(() => undefined);
  }
  updateServiceWorker = registerSW({
    immediate: true,
    onNeedRefresh: () => emit('ready'),
    onRegisteredSW: (_workerUrl, nextRegistration) => {
      registration = nextRegistration ?? null;
    },
    onRegisterError: () => emit('error'),
  });
};

export const getPwaRegistration = () => registration;

export const checkForPwaUpdate = async () => {
  await registration?.update();
};

export const activateWaitingPwaUpdate = async () => {
  await updateServiceWorker?.(true);
};
