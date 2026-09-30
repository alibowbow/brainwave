import { describe, expect, it } from 'vitest';
import { LookSpring, lookForDrag as lookFor } from './look';

const LOOK_LIMIT = { yaw: 0.06, pitch: 0.035 };
const lookForDrag = (dx: number, dy: number) => lookFor(dx, dy, LOOK_LIMIT);

describe('drag look-around', () => {
  it('follows the pointer like a turntable', () => {
    const right = lookForDrag(0.3, 0);
    expect(right.yaw).toBeGreaterThan(0);
    expect(right.pitch).toBeCloseTo(0, 10);
    const down = lookForDrag(0, 0.3);
    expect(down.pitch).toBeLessThan(0);
    const back = lookForDrag(-0.3, -0.3);
    expect(back.yaw).toBeCloseTo(-right.yaw, 10);
    expect(back.pitch).toBeCloseTo(-down.pitch, 10);
  });

  it('never turns past its limit however far the drag goes', () => {
    const far = lookForDrag(40, -40);
    expect(far.yaw).toBeLessThanOrEqual(LOOK_LIMIT.yaw);
    expect(far.pitch).toBeLessThanOrEqual(LOOK_LIMIT.pitch);
    expect(far.yaw).toBeGreaterThan(LOOK_LIMIT.yaw * 0.99);
    // A short nudge is a small turn, not a jump to the limit.
    expect(lookForDrag(0.05, 0).yaw).toBeLessThan(LOOK_LIMIT.yaw * 0.15);
  });

  it('ignores broken input', () => {
    const turn = lookForDrag(Number.NaN, Number.POSITIVE_INFINITY);
    expect(Math.abs(turn.yaw)).toBe(0);
    expect(Math.abs(turn.pitch)).toBe(0);
  });
});

describe('look spring', () => {
  const run = (spring: LookSpring, seconds: number, dt: number) => {
    let peak = 0;
    for (let t = 0; t < seconds; t += dt) {
      spring.update(dt);
      peak = Math.max(peak, Math.abs(spring.yaw));
    }
    return peak;
  };

  it('keeps up with a drag and eases home after release', () => {
    const spring = new LookSpring(LOOK_LIMIT);
    spring.drag(1, 0);
    const target = lookForDrag(1, 0).yaw;
    run(spring, 0.4, 1 / 60);
    expect(spring.yaw).toBeGreaterThan(target * 0.95);
    expect(spring.yaw).toBeLessThanOrEqual(target);

    spring.release();
    run(spring, 0.3, 1 / 60);
    expect(spring.yaw).toBeGreaterThan(target * 0.3);
    run(spring, 2.5, 1 / 60);
    expect(Math.abs(spring.yaw)).toBeLessThan(target * 0.01);
  });

  it('stays calm on slow devices and never overshoots', () => {
    const spring = new LookSpring(LOOK_LIMIT);
    spring.drag(-2, 2);
    const target = lookForDrag(-2, 2);
    const peak = run(spring, 2, 0.1);
    expect(peak).toBeLessThanOrEqual(Math.abs(target.yaw) + 1e-12);
    expect(spring.pitch).toBeCloseTo(target.pitch, 6);
    spring.release();
    spring.update(1);
    expect(Math.abs(spring.yaw)).toBeLessThan(Math.abs(target.yaw));
    expect(Math.sign(spring.yaw)).not.toBe(1);
  });

  it('holds still without time passing', () => {
    const spring = new LookSpring(LOOK_LIMIT);
    spring.drag(1, 1);
    for (const dt of [0, -1, Number.NaN]) spring.update(dt);
    expect(spring.yaw).toBe(0);
    expect(spring.pitch).toBe(0);
  });

  it('moves more slowly with a heavier feel', () => {
    const quick = new LookSpring(LOOK_LIMIT);
    const heavy = new LookSpring(LOOK_LIMIT, { follow: 0.22, settle: 0.8 });
    for (const spring of [quick, heavy]) spring.drag(1, 0);
    run(quick, 0.1, 1 / 60);
    run(heavy, 0.1, 1 / 60);
    expect(heavy.yaw).toBeLessThan(quick.yaw * 0.8);
    for (const spring of [quick, heavy]) spring.release();
    run(quick, 0.5, 1 / 60);
    run(heavy, 0.5, 1 / 60);
    expect(heavy.yaw).toBeGreaterThan(quick.yaw);
  });

  it('comes to rest exactly at the shot', () => {
    const spring = new LookSpring(LOOK_LIMIT);
    expect(spring.moving).toBe(false);
    spring.drag(0.5, -0.5);
    expect(spring.moving).toBe(true);
    spring.release();
    run(spring, 4, 1 / 60);
    expect(spring.yaw).toBe(0);
    expect(spring.pitch).toBe(0);
    expect(spring.moving).toBe(false);
  });
});
