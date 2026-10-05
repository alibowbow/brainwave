import type { SoundLayer } from './audioEngine';
import type { loadImmersiveSessionBridge } from './immersiveBridgeLoader';

/** One pending explicit NEW selection. It never runs on mount/restore/resume. */
export function createFreshImmersiveSelection(deps: {
  load: typeof loadImmersiveSessionBridge;
  prime: (signal: AbortSignal) => Promise<unknown>;
  pending: (value: boolean) => void;
  error: () => void;
}) {
  let current: AbortController | null = null;
  const cancel = () => {
    current?.abort();
    current = null;
    deps.pending(false);
  };
  return {
    cancel,
    run(id: string, candidate: readonly SoundLayer[], play: boolean, accept: (layers: SoundLayer[]) => void) {
      cancel();
      const controller = new AbortController();
      current = controller;
      deps.pending(true);
      // Called synchronously from the user's play action, before import awaits.
      // A blocked browser is still handled by the existing tryStart/UI fallback.
      let ready: Promise<unknown>;
      try { ready = play ? deps.prime(controller.signal) : Promise.resolve(); }
      catch {
        current = null;
        deps.pending(false);
        deps.error();
        return;
      }
      void Promise.all([deps.load(), ready]).then(([bridge]) => {
        if (current !== controller || controller.signal.aborted) return;
        const layers = bridge.initialImmersivePresetMix({ sceneId: id, origin: 'new-preset', dirty: false, currentLayers: candidate });
        current = null;
        deps.pending(false);
        try { accept(layers.map(layer => ({ ...layer }))); }
        catch { deps.error(); }
      }).catch(() => {
        if (current !== controller || controller.signal.aborted) return;
        current = null;
        deps.pending(false);
        deps.error();
      });
    },
  };
}
