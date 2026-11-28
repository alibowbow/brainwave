import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createHearthWorld } from './hearth';
import { createSleepRoomWorld } from './sleepRoom';
import { createNapTerraceWorld } from './napTerrace';
import { createWinterLodgeWorld } from './winterLodge';
import { clothSheet, stoneBlock } from './geometry';
import type { WorldBuild } from './contracts';

// World construction runs without a GPU: these are CPU contracts (geometry,
// targets, bounded interactions, post settings), not evidence of rendered quality.
const worlds: Array<[string, () => WorldBuild, string[]]> = [
  ['relax', createHearthWorld, ['log']],
  ['sleep_prep', createSleepRoomWorld, ['lamp', 'curtain']],
  ['power_nap', createNapTerraceWorld, ['canopy']],
  ['nature:winter_lodge', createWinterLodgeWorld, ['lamp', 'cup', 'log']],
];

function triangles(scene: THREE.Scene) {
  let total = 0;
  scene.traverse(object => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;
    const g = mesh.geometry;
    const count = (g.index ? g.index.count : g.attributes.position.count) / 3;
    total += count * ((mesh as THREE.InstancedMesh).isInstancedMesh ? (mesh as THREE.InstancedMesh).count : 1);
  });
  return total;
}

describe('cozy worlds build procedurally with bounded cost', () => {
  it.each(worlds)('%s has finite geometry, its touch targets and HDR settings', (_id, factory, actions) => {
    const world = factory();
    world.resize(16 / 10);
    world.update(8, 0);
    world.update(8.5, 0.5);
    const tris = triangles(world.scene);
    expect(tris).toBeGreaterThan(50_000);
    // Phone-plausible budget: no multi-million-triangle scenes.
    expect(tris).toBeLessThan(1_500_000);
    const found = new Set<string>();
    world.scene.traverse(object => {
      if (typeof object.userData.cozyAction === 'string') found.add(object.userData.cozyAction);
      const mesh = object as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.geometry.computeBoundingSphere();
        expect(Number.isFinite(mesh.geometry.boundingSphere!.radius)).toBe(true);
      }
    });
    for (const action of actions) {
      expect(found.has(action)).toBe(true);
      const event = world.interact(action);
      expect(event).not.toBeNull();
      expect(event!.intensity).toBeGreaterThanOrEqual(0);
      expect(event!.intensity).toBeLessThanOrEqual(0.35);
    }
    expect(world.interact('nothing')).toBeNull();
    expect(world.post?.exposure).toBeGreaterThan(0);
    expect(typeof world.createVolume).toBe('function');
    world.resize(390 / 844);
    world.update(9, 0.016);
    world.dispose?.();
  }, 60_000);
});

describe('cozy procedural geometry', () => {
  it('builds dressed stones to the requested extents', () => {
    const g = stoneBlock(0.6, 0.3, 0.25, 7, 0.8, 0.04);
    g.computeBoundingBox();
    const size = g.boundingBox!.getSize(new THREE.Vector3());
    expect(size.x).toBeGreaterThan(0.55); expect(size.x).toBeLessThan(0.66);
    expect(size.y).toBeGreaterThan(0.26); expect(size.y).toBeLessThan(0.34);
    expect(g.getAttribute('normal')).toBeTruthy();
  });

  it('gives cloth real thickness with a closed hem', () => {
    const g = clothSheet(8, 8, (u, v, target) => target.set(u, 0.5, -v), 0.02);
    g.computeBoundingBox();
    expect(g.boundingBox!.max.y - g.boundingBox!.min.y).toBeCloseTo(0.02, 3);
    expect(g.getAttribute('uv')).toBeTruthy();
  });
});
