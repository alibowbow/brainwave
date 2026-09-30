import { describe, expect, it } from 'vitest';
import { BOATS } from './boats';
import { LIGHTHOUSE } from './buildings';
import { PINE_BASE } from './pine';
import { CAMERA, cliffTop, coastDistance, farCoastX, fieldAt, headlandFall, headlandFrame, headlandPoint, SLOPE_RUN, seaDepth, shoreX, terrainHeight, woodsDensity } from './world';

/** Whether the ground anywhere between the viewer and a point rises above the line of sight. */
function inView(x: number, y: number, z: number) {
  for (let t = 0.01; t < 0.99; t += 0.002) {
    const ground = Math.max(0, terrainHeight(CAMERA.x + (x - CAMERA.x) * t, CAMERA.z + (z - CAMERA.z) * t));
    if (ground > CAMERA.y + (y - CAMERA.y) * t) return false;
  }
  return true;
}

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

  it('sails the boats on open water, clear of the coast', () => {
    for (const boat of BOATS) {
      for (let dx = -boat.range; dx <= boat.range; dx += 10) {
        expect(coastDistance(boat.x + dx, boat.z)).toBeGreaterThan(200);
      }
      expect(inView(boat.x, 5, boat.z)).toBe(true);
    }
  });

  it('stands the lighthouse on the far headland, in sight of the viewer', () => {
    const { x, z } = LIGHTHOUSE;
    expect(coastDistance(x, z)).toBeLessThan(-40);
    const ground = terrainHeight(x, z);
    expect(ground).toBeGreaterThan(50);
    // Its lantern, and the tower well down from it.
    expect(inView(x, ground + 40, z)).toBe(true);
    expect(inView(x, ground + 15, z)).toBe(true);
  });

  it('gives the cliffs a level top and none elsewhere', () => {
    expect(cliffTop(shoreX(-1200) - 50, -1200)).toBe(0);
    // Along a far headland's cliff, the top runs level from one point to the next.
    let previous = -1;
    for (let z = -12400; z <= -11800; z += 25) {
      const top = cliffTop(farCoastX(z) - 30, z);
      expect(top).toBeGreaterThan(60);
      if (previous >= 0) expect(Math.abs(top - previous)).toBeLessThan(30);
      previous = top;
    }
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
