import { describe, expect, it } from 'vitest';
import { PINE_BASE } from './pine';
import { CAMERA, coastDistance, fieldAt, headlandFall, headlandFrame, headlandPoint, SLOPE_RUN, seaDepth, shoreX, terrainHeight, woodsDensity } from './world';

describe('seaside world', () => {
  it('maps points to and from the headland frame', () => {
    for (const [a, b] of [[0, 0], [12, -30], [SLOPE_RUN, 140], [-20, 5]]) {
      const { x, z } = headlandPoint(a, b);
      const back = headlandFrame(x, z);
      expect(back.a).toBeCloseTo(a, 6);
      expect(back.b).toBeCloseTo(b, 6);
    }
  });

  it('stands the viewer above the headland with the sea below', () => {
    const ground = terrainHeight(CAMERA.x, CAMERA.z);
    expect(ground).toBeGreaterThan(40);
    expect(CAMERA.y - ground).toBeGreaterThan(5);
    expect(CAMERA.y - ground).toBeLessThan(20);
    // Out to the left of the view lies open water.
    const bearing = CAMERA.yaw - 0.35;
    const x = CAMERA.x + Math.sin(bearing) * 400;
    const z = CAMERA.z - Math.cos(bearing) * 400;
    expect(coastDistance(x, z)).toBeGreaterThan(0);
    expect(terrainHeight(x, z)).toBeLessThan(0);
  });

  it('roots the pine on the headland top', () => {
    expect(coastDistance(PINE_BASE.x, PINE_BASE.z)).toBeLessThan(-20);
    expect(headlandFall(PINE_BASE.x, PINE_BASE.z)).toBeLessThan(0.1);
  });

  it('keeps the woods off the beach and the headland', () => {
    expect(woodsDensity(CAMERA.x, CAMERA.z)).toBe(0);
    expect(woodsDensity(shoreX(-1200) + 20, -1200)).toBe(0);
    let wooded = 0;
    for (let i = 0; i < 400; i++) wooded += woodsDensity(400 + (i % 20) * 60, -600 - Math.floor(i / 20) * 80) > 0.5 ? 1 : 0;
    expect(wooded).toBeGreaterThan(20);
    expect(wooded).toBeLessThan(300);
  });

  it('measures the distance to the field borders', () => {
    let crossings = 0;
    for (let i = 0; i < 3000; i++) {
      const x = 300 + (i % 60) * 7.3;
      const z = -900 - Math.floor(i / 60) * 9.1;
      const here = fieldAt(x, z);
      const next = fieldAt(x + 1, z);
      expect(here.border).toBeGreaterThanOrEqual(-0.01);
      if (here.cell[0] !== next.cell[0] || here.cell[1] !== next.cell[1]) {
        crossings++;
        expect(here.border).toBeLessThan(2);
        expect(next.border).toBeLessThan(2);
      }
    }
    expect(crossings).toBeGreaterThan(5);
  });

  it('shelves the sea floor away from the beach', () => {
    const z = -1200;
    expect(Math.abs(coastDistance(shoreX(z), z))).toBeLessThan(1);
    expect(seaDepth(0)).toBeLessThan(0.5);
    expect(seaDepth(200)).toBeGreaterThan(seaDepth(20));
    expect(terrainHeight(shoreX(z) - 150, z)).toBeLessThan(-3);
    expect(terrainHeight(shoreX(z) + 30, z)).toBeGreaterThan(0);
  });
});
