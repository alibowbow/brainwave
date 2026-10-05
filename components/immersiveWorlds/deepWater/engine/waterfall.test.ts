import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createWaterfall } from './waterfall';
import type { WorldContent } from './types';

describe('waterfall spatial contract', () => {
  let world: WorldContent;
  beforeAll(() => {
    // The scene factory creates CPU geometry/render targets; no WebGL context or real renderer is used here.
    const renderer = { domElement: { height: 800 } } as unknown as THREE.WebGLRenderer;
    world = createWaterfall(renderer);
    world.scene.updateMatrixWorld(true);
  });
  afterAll(() => {
    world.dispose?.();
    const geometry = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    world.scene.traverse(object => {
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) geometry.add(mesh.geometry);
      if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(m => materials.add(m));
    });
    geometry.forEach(item => item.dispose());
    materials.forEach(item => item.dispose());
  });

  it('has finite spatial geometry and finite portrait/landscape projections', () => {
    let inspected = 0;
    world.scene.traverse(object => {
      const geometry = (object as THREE.Mesh).geometry;
      if (!geometry) return;
      for (const attribute of Object.values(geometry.attributes)) {
        const values = attribute.array;
        let finite = true;
        for (let i = 0; i < values.length; i++) if (!Number.isFinite(values[i])) { finite = false; break; }
        expect(finite).toBe(true);
      }
      inspected++;
    });
    expect(inspected).toBeGreaterThan(0);
    for (const aspect of [390 / 844, 1280 / 800, 883 / 712]) {
      world.resize?.(aspect);
      expect(world.camera.projectionMatrix.elements.every(Number.isFinite)).toBe(true);
      expect(world.camera.position.y).toBeGreaterThan(0);
    }
    world.resize?.(1280 / 800);
    world.scene.updateMatrixWorld(true);
  });

  it('accepts a visible pool ray but rejects water behind the near stone shelf', () => {
    function rayTo(x: number, z: number) {
      const origin = world.camera.position.clone();
      return new THREE.Raycaster(origin, new THREE.Vector3(x, .025, z).sub(origin).normalize());
    }
    const event = world.interact?.(rayTo(0, -3), 1);
    expect(event).toMatchObject({ world: 'waterfall', kind: 'pool-ripple' });
    expect(event?.strength).toBeLessThanOrEqual(.3);
    expect(world.interact?.(rayTo(-2.8, 4.5), 2)).toBeNull();
    // The factory itself rejects repeated impulses even if a caller omits the host's rate limiter.
    expect(world.interact?.(rayTo(0, -3), 1.1)).toBeNull();
  });
});
