import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { buildWarmHeart, warmBreath } from './warmHeart';
import { buildSnowVillage, groundHeight, laneCenter } from './snowVillage';
import type { SanctuaryWorld } from './worldTypes';

// Builders are pure scene construction; the renderer is only used by prepare().
const renderer = {} as THREE.WebGLRenderer;
const ndcOf = (world: SanctuaryWorld, point: THREE.Vector3) => {
  world.camera.updateMatrixWorld(true);
  const p = point.clone().project(world.camera);
  return new THREE.Vector2(p.x, p.y);
};
const dispose = (world: SanctuaryWorld) => {
  world.scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    mesh.geometry?.dispose();
  });
  world.dispose?.();
};

describe('warm heart (HDR upgrade)', () => {
  it('opts in to the HDR pipeline with a volume and keeps the warmth touch contract', () => {
    const world = buildWarmHeart(renderer);
    try {
      expect(world.post?.bloomStrength).toBeGreaterThan(0);
      expect(typeof world.createVolume).toBe('function');
      world.resize(1280 / 800);
      world.update(0, 0);
      // Straight ahead lands on living tissue deep in the chamber.
      const event = world.interact(new THREE.Vector2(0, -.25));
      expect(event).toEqual({ kind: 'warmth', strength: .27, x: 0 });
      world.update(.5, .05);
    } finally { dispose(world); }
  });

  it('breathes slowly and smoothly, never in sharp beats', () => {
    let maxStep = 0;
    for (let t = 0; t < 60; t += 1 / 60) {
      const value = warmBreath(t);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
      maxStep = Math.max(maxStep, Math.abs(warmBreath(t + 1 / 60) - value));
    }
    // At 60 fps the light changes by well under 1 % per frame.
    expect(maxStep).toBeLessThan(.006);
  });
});

describe('snow village (HDR upgrade)', () => {
  it('opts in to the HDR pipeline and keeps the rail sweep contract', () => {
    const world = buildSnowVillage(renderer);
    try {
      expect(world.post?.exposure).toBeGreaterThan(0);
      expect(typeof world.createVolume).toBe('function');
      world.resize(1280 / 800);
      world.update(0, 0);
      const railTop = new THREE.Vector3(1.6, .95, .96);
      const event = world.interact(ndcOf(world, railTop));
      expect(event?.kind).toBe('snow');
      expect(event?.strength).toBe(.28);
      expect(event!.x).toBeCloseTo(1.6 / 4.35, 1);
      // Taps on the lantern are not sweeps.
      expect(world.interact(ndcOf(world, new THREE.Vector3(-.45, .95, .96)))).toBeUndefined();
      world.update(1, .05);
    } finally { dispose(world); }
  });

  it('keeps the lane trodden in the middle and banked at the sides', () => {
    for (const z of [-4, -12, -26]) {
      expect(groundHeight(laneCenter(z), z)).toBeLessThan(groundHeight(laneCenter(z) + 5, z));
    }
  });
});
