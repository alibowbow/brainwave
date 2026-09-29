/*
 * A gentle look-around. Dragging over the study turns the view a few degrees
 * around a point near the lamp and mug, so they hold still while the city
 * slides behind the window frame; letting go eases the view back to the shot.
 */

/** Largest turn a drag can make, in radians (about 3.4° across, 2° up and down). */
export const LOOK_LIMIT = { yaw: 0.06, pitch: 0.035 } as const;

/** How far in front of the camera the view turns around, in metres (near the focus distance). */
export const LOOK_PIVOT = 1;

/** How quickly a drag approaches the limit, per shorter side of the view. */
const LOOK_GAIN = 2.2;

/**
 * The turn for a drag measured in shorter sides of the view. The scene follows
 * the pointer like a turntable: dragging right turns the view right, dragging
 * down tips it down, and the turn eases into its limit instead of stopping hard.
 */
export function lookForDrag(dx: number, dy: number) {
  const safe = (value: number) => (Number.isFinite(value) ? value : 0);
  return {
    yaw: LOOK_LIMIT.yaw * Math.tanh(safe(dx) * LOOK_GAIN),
    pitch: -LOOK_LIMIT.pitch * Math.tanh(safe(dy) * LOOK_GAIN),
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

  /** Follow a drag of `dx`, `dy` shorter sides from where it started. */
  drag(dx: number, dy: number) {
    const turn = lookForDrag(dx, dy);
    this.targetYaw = turn.yaw;
    this.targetPitch = turn.pitch;
    this.held = true;
  }

  release() {
    this.targetYaw = 0;
    this.targetPitch = 0;
    this.held = false;
  }

  update(dt: number) {
    if (!(dt > 0)) return;
    const smoothTime = this.held ? 0.09 : 0.45;
    [this.yaw, this.yawVelocity] = smoothDamp(this.yaw, this.targetYaw, this.yawVelocity, smoothTime, dt);
    [this.pitch, this.pitchVelocity] = smoothDamp(this.pitch, this.targetPitch, this.pitchVelocity, smoothTime, dt);
  }
}
