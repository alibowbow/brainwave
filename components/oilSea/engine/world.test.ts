import { describe, expect, it } from 'vitest';
import { PINE_BASE } from './pine';
import { CAMERA, coastDistance, headlandFall, headlandFrame, headlandPoint, SLOPE_RUN, seaDepth, shoreX, terrainHeight } from './world';

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

  it('shelves the sea floor away from the beach', () => {
    const z = -1200;
    expect(Math.abs(coastDistance(shoreX(z), z))).toBeLessThan(1);
    expect(seaDepth(0)).toBeLessThan(0.5);
    expect(seaDepth(200)).toBeGreaterThan(seaDepth(20));
    expect(terrainHeight(shoreX(z) - 150, z)).toBeLessThan(-3);
    expect(terrainHeight(shoreX(z) + 30, z)).toBeGreaterThan(0);
  });
});
