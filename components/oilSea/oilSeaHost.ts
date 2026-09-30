import { LiveSceneHost, type LiveSceneHolder, type LiveSceneStatus } from '../liveScene/liveSceneHost';
import { SeasideEngine } from './engine/SeasideEngine';

export type OilSeaStatus = LiveSceneStatus;
export type OilSeaHolder = LiveSceneHolder;

/** The painted seaside's shared engine, and how lively its surf is. */
class OilSeaHost extends LiveSceneHost<SeasideEngine> {
  private energy = 1;

  constructor() {
    super({
      canvasClass: 'oil-sea-canvas',
      isSupported: () => SeasideEngine.isSupported(),
      create: (canvas, onContextLost) => new SeasideEngine({ canvas, onContextLost }),
    });
  }

  protected configure(engine: SeasideEngine) {
    engine.setWaveEnergy(this.energy);
  }

  setWaveEnergy(level: number) {
    this.energy = level;
    this.engine?.setWaveEnergy(level);
  }
}

export const oilSeaHost = new OilSeaHost();
