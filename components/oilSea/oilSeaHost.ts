import { LiveSceneHost, type LiveSceneHolder, type LiveSceneStatus } from '../liveScene/liveSceneHost';
import { OilSeaEngine } from './engine/OilSeaEngine';

export type OilSeaStatus = LiveSceneStatus;
export type OilSeaHolder = LiveSceneHolder;

/** The painted sea's shared engine, and how lively its surf is. */
class OilSeaHost extends LiveSceneHost<OilSeaEngine> {
  private energy = 1;

  constructor() {
    super({
      canvasClass: 'oil-sea-canvas',
      isSupported: () => OilSeaEngine.isSupported(),
      create: (canvas, onContextLost) => new OilSeaEngine({ canvas, onContextLost }),
    });
  }

  protected configure(engine: OilSeaEngine) {
    engine.setWaveEnergy(this.energy);
  }

  setWaveEnergy(level: number) {
    this.energy = level;
    this.engine?.setWaveEnergy(level);
  }
}

export const oilSeaHost = new OilSeaHost();
