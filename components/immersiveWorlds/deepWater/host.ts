import { LiveSceneHost, type LiveSceneHolder } from '../../liveScene/liveSceneHost';
import { DeepWaterEngine } from './engine/DeepWaterEngine';
import type { DeepWaterInteraction, WorldKind } from './engine/types';

export interface DeepWaterHolder extends LiveSceneHolder { onInteraction?: (event: DeepWaterInteraction) => void }
class DeepWaterHost extends LiveSceneHost<DeepWaterEngine> {
  touch(holder: DeepWaterHolder, x: number, y: number) {
    if (this.top !== holder || !holder.running) return;
    const event = this.engine?.interact(x, y);
    if (event) holder.onInteraction?.(event);
  }
}
function host(kind: WorldKind) {
  return new DeepWaterHost({ canvasClass: 'deepwater-canvas', isSupported: () => typeof WebGL2RenderingContext !== 'undefined', create: (canvas, fail) => new DeepWaterEngine(canvas, kind, fail) });
}
export const deepWaterHosts = { waterfall: host('waterfall'), cave: host('cave'), sea: host('sea') };
