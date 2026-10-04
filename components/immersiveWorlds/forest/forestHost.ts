import { LiveSceneHost, type LiveSceneHolder, type LiveSceneStatus } from '../../liveScene/liveSceneHost';
import { ForestEngine } from './ForestEngine';

/** Positions use the forest's world coordinates; the scene never plays audio. */
export interface ForestInteraction {
  kind: 'water' | 'leaf';
  position: [number, number, number];
  strength: number;
}

export interface ForestHolder extends LiveSceneHolder {
  onInteraction?: (event: ForestInteraction) => void;
}

export type ForestStatus = LiveSceneStatus;

/** A player and its fullscreen view share one canvas, one engine and one RAF. */
class ForestHost extends LiveSceneHost<ForestEngine> {
  private diagnosticByteTargets = false;
  constructor() {
    super({
      canvasClass: 'forest-world-canvas',
      // The renderer does the actual capability check. Do not allocate a probe
      // context, which would waste a context on mobile alongside the scene.
      isSupported: () => typeof window.WebGL2RenderingContext !== 'undefined',
      create: (canvas, onContextLost) => new ForestEngine(canvas, onContextLost, { forceByteTargets: this.diagnosticByteTargets }),
    });
  }

  /** Isolated harness only; never changes capability reports or public props. */
  configureDiagnosticTargets(forceByteTargets: boolean) {
    if (this.engine) throw new Error('Choose the diagnostic target policy before acquiring the forest.');
    this.diagnosticByteTargets = forceByteTargets;
  }

  protected configure(engine: ForestEngine) {
    engine.setOnInteraction((event) => {
      const holder = this.top as ForestHolder | undefined;
      if (this.status === 'ready' && holder?.running) holder.onInteraction?.(event);
    });
  }

  touch(holder: ForestHolder, x: number, y: number) {
    if (this.top !== holder || !holder.running || this.status !== 'ready') return;
    this.engine?.touch(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)));
  }

  /** Diagnostic readback for the isolated harness, never a second renderer. */
  captureFrame() {
    if (!this.top || this.status !== 'ready' || !this.engine) throw new Error('No ready forest holder.');
    return this.engine.captureFrame();
  }
}

export const forestHost = new ForestHost();
