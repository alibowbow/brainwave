import { describe, expect, it } from 'vitest';
import { GULLS, gullPosition } from './gulls';
import { CAMERA, terrainHeight } from './world';

describe('gulls', () => {
  it('stay clear of the ground and of the viewer, and mostly in view, as they wheel about', () => {
    for (const gull of GULLS) {
      let lowest = Infinity;
      let nearest = Infinity;
      let seen = 0;
      let samples = 0;
      for (let t = 0; t < 1800; t += 0.5) {
        const p = gullPosition(gull, t);
        const dx = p.x - CAMERA.x;
        const dy = p.y - CAMERA.y;
        const dz = p.z - CAMERA.z;
        lowest = Math.min(lowest, p.y - terrainHeight(p.x, p.z));
        nearest = Math.min(nearest, Math.hypot(dx, dy, dz));
        // Across from the middle of the view (which looks north, turned by
        // CAMERA.yaw), and up from the horizon.
        const across = Math.atan2(dx, -dz) - CAMERA.yaw;
        const up = Math.atan2(dy, Math.hypot(dx, dz));
        if (Math.abs(across) < 0.55 && up < 0.15) seen++;
        samples++;
      }
      expect(lowest).toBeGreaterThan(12);
      expect(nearest).toBeGreaterThan(40);
      expect(seen / samples).toBeGreaterThan(0.6);
    }
  });
});
