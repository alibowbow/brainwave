import { LiveSceneHost, type LiveSceneHolder, type LiveSceneStatus } from '../liveScene/liveSceneHost';
import { RainyWindowEngine } from './engine/RainyWindowEngine';

export type RainyWindowStatus = LiveSceneStatus;
export type RainyWindowHolder = LiveSceneHolder;

/** The rainy study's shared engine, plus the rain and lightning it responds to. */
class RainyWindowHost extends LiveSceneHost<RainyWindowEngine> {
  private rain = 1;

  constructor() {
    super({
      canvasClass: 'rainy-window-canvas',
      isSupported: () => RainyWindowEngine.isSupported(),
      create: (canvas, onContextLost) => new RainyWindowEngine({ canvas, onContextLost }),
    });
  }

  protected configure(engine: RainyWindowEngine) {
    engine.setRainIntensity(this.rain);
  }

  setRainIntensity(intensity: number) {
    this.rain = intensity;
    this.engine?.setRainIntensity(intensity);
  }

  flash(strength: number) {
    if (this.status === 'ready' && this.top?.running) this.engine?.flash(strength);
  }
}

export const rainyWindowHost = new RainyWindowHost();
