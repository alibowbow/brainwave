/*
 * A gentle look-around for the live scenes. Dragging over a scene turns its
 * view a few degrees, never past the scene's limit; letting go eases the view
 * back to the shot.
 */

/** Largest turn a drag can make each way, in radians. */
export interface LookLimit {
  yaw: number;
  pitch: number;
}

/** How the view moves: seconds to catch up with a drag, and to ease home once let go. */
export interface LookFeel {
  follow: number;
  settle: number;
}

const QUICK: LookFeel = { follow: 0.09, settle: 0.45 };

/** How quickly a drag approaches the limit, per shorter side of the view. */
const LOOK_GAIN = 2.2;

/**
 * The turn for a drag measured in shorter sides of the view: a drag to the
 * right gives a positive yaw, a drag down a negative pitch, easing into the
 * limit instead of stopping hard. Each scene decides which way that turns it.
 */
export function lookForDrag(dx: number, dy: number, limit: LookLimit) {
  const safe = (value: number) => (Number.isFinite(value) ? value : 0);
  return {
    yaw: limit.yaw * Math.tanh(safe(dx) * LOOK_GAIN),
    pitch: -limit.pitch * Math.tanh(safe(dy) * LOOK_GAIN),
  };
}

/** Critically damped follow (Unity's SmoothDamp); stable at any frame time and never overshoots. */
function smoothDamp(current: number, target: number, velocity: number, smoothTime: number, dt: number): [number, number] {
  const omega = 2 / smoothTime;
  const x = omega * dt;
  const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current - target;
  const temp = (velocity + omega * change) * dt;
  const next = target + (change + temp) * decay;
  if (target - current > 0 === next > target) return [target, 0];
  return [next, (velocity - omega * temp) * decay];
}

/** The current turn of the view, following a drag closely and drifting home once released. */
export class LookSpring {
  yaw = 0;
  pitch = 0;
  private yawVelocity = 0;
  private pitchVelocity = 0;
  private targetYaw = 0;
  private targetPitch = 0;
  private held = false;

  constructor(private readonly limit: LookLimit, private readonly feel: LookFeel = QUICK) {}

  /** Follow a drag of `dx`, `dy` shorter sides from where it started. */
  drag(dx: number, dy: number) {
    const turn = lookForDrag(dx, dy, this.limit);
    this.targetYaw = turn.yaw;
    this.targetPitch = turn.pitch;
    this.held = true;
  }

  release() {
    this.targetYaw = 0;
    this.targetPitch = 0;
    this.held = false;
  }

  /** Whether the view is turned, or turning. */
  get moving() {
    return this.held || this.yaw !== 0 || this.pitch !== 0;
  }

  update(dt: number) {
    if (!(dt > 0)) return;
    const smoothTime = this.held ? this.feel.follow : this.feel.settle;
    [this.yaw, this.yawVelocity] = smoothDamp(this.yaw, this.targetYaw, this.yawVelocity, smoothTime, dt);
    [this.pitch, this.pitchVelocity] = smoothDamp(this.pitch, this.targetPitch, this.pitchVelocity, smoothTime, dt);
  }
}
