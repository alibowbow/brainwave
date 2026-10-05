import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { lantern } from './scenery';

function fixture() {
  const lamp = lantern([0, 0, 0]);
  const light = lamp.group.children.find((child) => child instanceof THREE.PointLight) as THREE.PointLight;
  const dispose = () => lamp.group.traverse((child) => {
    const mesh = child as THREE.Mesh;
    mesh.geometry?.dispose();
    if (mesh.material) for (const m of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) m.dispose();
  });
  return { lamp, light, dispose };
}

describe('lantern response in live and static 3D', () => {
  it('eases an active light toward its bounded target without an immediate flash', () => {
    const { lamp, light, dispose } = fixture();
    lamp.update(0, 0);
    const before = light.intensity;
    expect(lamp.toggle()).toBe(1);
    lamp.update(0, 1 / 60);
    expect(light.intensity).toBeGreaterThan(before);
    expect(light.intensity).toBeLessThan(3.3);
    const intermediate = light.intensity;
    // A subsequent static redraw (resize) must not jump to the pending target.
    lamp.update(0, 0);
    expect(light.intensity).toBe(intermediate);
    for (let i = 0; i < 120; i++) lamp.update(0, 1 / 60);
    expect(light.intensity).toBeCloseTo(3.3, 1);
    dispose();
  });
  it('provides an immediate static response at all three levels when motion is disabled', () => {
    const { lamp, light, dispose } = fixture();
    for (const target of [1, 0.38, 0.7]) {
      expect(lamp.toggle()).toBe(target);
      lamp.update(0, 0);
      expect(light.intensity).toBeCloseTo(3.3 * target, 5);
    }
    dispose();
  });
});
