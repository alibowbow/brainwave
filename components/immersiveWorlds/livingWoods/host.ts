import { LiveSceneHost, type LiveSceneHolder } from '../../liveScene/liveSceneHost';
import { WoodsEngine } from './engine';
import type { LivingWorld } from './types';

class WoodsHost extends LiveSceneHost<WoodsEngine> {
  constructor(world: LivingWorld) {
    super({ canvasClass: 'living-woods-canvas', isSupported: () => typeof window.WebGL2RenderingContext !== 'undefined', create: (canvas, lost) => new WoodsEngine(canvas, world, lost) });
  }
  tap(holder: LiveSceneHolder, x: number, y: number) {
    if (this.top !== holder || !holder.running) return null;
    return this.engine?.tap(x, y) ?? null;
  }
}
const hosts = new Map<LivingWorld, WoodsHost>();
export function getWoodsHost(world: LivingWorld) {
  let host = hosts.get(world);
  if (!host) { host = new WoodsHost(world); hosts.set(world, host); }
  return host;
}
