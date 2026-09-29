/*
 * The painting is never finished: every so often a fresh set of brush strokes
 * is laid out out of sight and then painted over the old one stroke by
 * stroke, region by region. Two stroke sets alternate. Building a set is
 * spread over several frames so no single frame carries it.
 */

export type RepaintStep =
  | { kind: 'strokes'; set: 0 | 1; band: number; bands: number }
  | { kind: 'light'; set: 0 | 1 };

export interface RepaintView {
  /** The set shown in full, or underneath while another is painted over it. */
  shown: 0 | 1;
  /** The set being painted over it, if any, and how far that has got (0–1). */
  painting: 0 | 1 | null;
  progress: number;
}

export class RepaintCycle {
  private shown: 0 | 1 = 0;
  private phase: 'rest' | 'build' | 'paint' = 'rest';
  private timer: number;
  private band = 0;
  private progress = 0;

  constructor(
    readonly bands = 6,
    readonly paintSeconds = 9,
    readonly restSeconds = 5,
    firstRest = 3,
  ) {
    this.timer = firstRest;
  }

  get view(): RepaintView {
    return this.phase === 'paint'
      ? { shown: this.shown, painting: this.hidden, progress: this.progress }
      : { shown: this.shown, painting: null, progress: 0 };
  }

  private get hidden(): 0 | 1 {
    return this.shown === 0 ? 1 : 0;
  }

  /** Advance by `dt` seconds; returns the building work to do this frame, if any. */
  update(dt: number): RepaintStep | null {
    if (!(dt > 0)) return null;
    if (this.phase === 'rest') {
      this.timer -= dt;
      if (this.timer > 0) return null;
      this.phase = 'build';
      this.band = 0;
    }
    if (this.phase === 'build') {
      if (this.band < this.bands) {
        return { kind: 'strokes', set: this.hidden, band: this.band++, bands: this.bands };
      }
      this.phase = 'paint';
      this.progress = 0;
      return { kind: 'light', set: this.hidden };
    }
    this.progress += dt / this.paintSeconds;
    if (this.progress >= 1.06) {
      this.shown = this.hidden;
      this.phase = 'rest';
      this.timer = this.restSeconds;
      this.progress = 0;
    }
    return null;
  }
}
