import { LiveSceneHost, type LiveSceneHolder, type LiveSceneStatus } from '../liveScene/liveSceneHost';
import { RainyWindowEngine } from './engine/RainyWindowEngine';

export type RainyWindowStatus = LiveSceneStatus;
export type RainyWindowHolder = LiveSceneHolder;

/** The rainy study's shared engine, plus the rain, lightning and drag it responds to. */
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

  // A drag belongs to the view it started in.
  protected topChanged() {
    this.engine?.releaseDrag();
  }

  setRainIntensity(intensity: number) {
    this.rain = intensity;
    this.engine?.setRainIntensity(intensity);
  }

  flash(strength: number) {
    if (this.status === 'ready' && this.top?.running) this.engine?.flash(strength);
  }

  /** Turn the view a little while the view on top is dragged. */
  drag(holder: RainyWindowHolder, dx: number, dy: number) {
    if (this.top === holder) this.engine?.drag(dx, dy);
  }

  releaseDrag(holder: RainyWindowHolder) {
    if (this.top === holder) this.engine?.releaseDrag();
  }
}

export const rainyWindowHost = new RainyWindowHost();
