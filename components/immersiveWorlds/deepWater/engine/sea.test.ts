import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createDeepSea } from './sea';

// World factory tests require no canvas/WebGL context; rendering is covered separately by real PNG QA.
describe('deep sea geometry and bounded organism interaction', () => {
  it('has finite three-dimensional geometry and responds only to a hit on the nearby organism', () => {
    const world = createDeepSea({} as THREE.WebGLRenderer);
    world.update(0, 0);
    world.scene.updateMatrixWorld(true);
    const misses = new THREE.Raycaster(new THREE.Vector3(0, 1.5, 7), new THREE.Vector3(0, 1, 0));
    expect(world.interact?.(misses, 0)).toBeNull();
    const bell = world.scene.getObjectByName('deep-sea-touch-bell')!;
    const aim = bell.localToWorld(new THREE.Vector3(0, .55, 0));
    const hit = new THREE.Raycaster(world.camera.position.clone(), aim.clone().sub(world.camera.position).normalize());
    expect(world.interact?.(hit, 0)).toEqual({ world: 'sea', kind: 'organism-pulse', strength: .28, pan: .18 });
    world.scene.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      const positions = object.geometry.getAttribute('position');
      expect(positions.count).toBeGreaterThan(0);
      expect(positions.array.every(Number.isFinite)).toBe(true);
    });
  });

  it('never approaches the observer when animated or touched; portrait retains a usable view', () => {
    const world = createDeepSea({} as THREE.WebGLRenderer);
    const organism = world.scene.getObjectByName('deep-sea-touch-organism')!;
    const origin = organism.position.clone();
    for (let time = 0; time <= 120; time += 5) {
      world.update(time, .05);
      expect(organism.position.z).toBe(origin.z);
      expect(Math.abs(organism.position.x - origin.x)).toBeLessThanOrEqual(.17);
      expect(Math.abs(organism.position.y - origin.y)).toBeLessThanOrEqual(.24);
    }
    world.camera.aspect = 390 / 844;
    world.resize?.(world.camera.aspect);
    world.camera.lookAt(world.target);
    world.camera.updateMatrixWorld(true);
    const projected = organism.position.clone().project(world.camera);
    expect(Math.abs(projected.x)).toBeLessThan(.8);
    expect(Math.abs(projected.y)).toBeLessThan(.8);
  });
});
