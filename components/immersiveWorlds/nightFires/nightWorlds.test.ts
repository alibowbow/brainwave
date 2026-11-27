import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { buildMountainWorld } from './mountainScene';
import { buildDeepNightWorld } from './deepScene';
import { buildLakesideWorld } from './lakesideScene';
import { createNightVolume } from './atmosphere';
import { boulderGeometry, ridgeGeometry } from './landscape';
import { createEmbers, createNoiseVolume, fireFlicker } from '../shared/render/fireFlame';
import { nightSkyUniforms } from '../shared/render/skyNight';
import type { WorldRecipe } from './worldTypes';

function release(recipe: WorldRecipe) {
  recipe.scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    mesh.geometry?.dispose();
    if (mesh.material) for (const m of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) m.dispose();
  });
  recipe.dispose?.();
}

describe('night worlds on the HDR path', () => {
  const builders = { mountain: buildMountainWorld, deep: buildDeepNightWorld, lakeside: buildLakesideWorld };
  for (const [name, build] of Object.entries(builders)) {
    it(`${name} builds without a DOM, with HDR settings, a bounded volume pass and a fog fallback`, () => {
      const recipe = build();
      expect(recipe.post?.exposure).toBeGreaterThan(0);
      expect(recipe.createVolume).toBeTypeOf('function');
      const volume = recipe.createVolume!();
      // Half-resolution march budget: haze plus plume stay within 40 steps.
      const steps = [...volume.material.fragmentShader.matchAll(/const int \w+ = (\d+);/g)].reduce((sum, m) => sum + Number(m[1]), 0);
      expect(steps).toBeLessThanOrEqual(40);
      volume.material.dispose();
      // The direct renderer keeps simple fog; the volume pass replaces it.
      recipe.setPostActive?.(false);
      expect(recipe.scene.fog).toBeTruthy();
      recipe.setPostActive?.(true);
      expect(recipe.scene.fog).toBeNull();
      // One strong key, no flat hemisphere fill.
      let hemispheres = 0, keys = 0;
      recipe.scene.traverse((object) => {
        if (object instanceof THREE.HemisphereLight) hemispheres++;
        if (object instanceof THREE.DirectionalLight) keys++;
      });
      expect(hemispheres).toBe(0);
      expect(keys).toBe(1);
      // Interaction targets still exist and respond within bounds.
      expect(recipe.targets.length).toBeGreaterThan(0);
      for (const { kind } of recipe.targets) {
        const value = recipe.interact(kind);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      }
      recipe.update(0.5, 1 / 60);
      release(recipe);
    }, 60_000);
  }
});

describe('shared fire and sky building blocks', () => {
  it('generates a deterministic, tileable noise volume', () => {
    const a = createNoiseVolume(16, 3), b = createNoiseVolume(16, 3);
    const data = a.image.data as Uint8Array;
    expect(data).toEqual(b.image.data);
    // Opposite faces of the periodic lattice match closely.
    let difference = 0;
    for (let y = 0; y < 16; y++) for (let z = 0; z < 16; z++) {
      difference += Math.abs(data[((z * 16 + y) * 16) * 4] - data[((z * 16 + y) * 16 + 15) * 4]);
    }
    expect(difference / 256).toBeLessThan(40);
    a.dispose(); b.dispose();
  }, 30_000);
  it('keeps the fire light flicker gentle and bounded', () => {
    for (let t = 0; t < 30; t += 0.07) {
      const value = fireFlicker(t, 1.3);
      expect(value).toBeGreaterThan(0.7);
      expect(value).toBeLessThan(1.3);
    }
  });
  it('raises ember spawning gently and within bounds when stoked repeatedly', () => {
    const embers = createEmbers({ count: 8, radius: 0.2, spawnY: 0.2, rise: 1, seed: 4 });
    for (let i = 0; i < 10; i++) embers.stoke(i * 0.1, 0.35);
    expect(embers.uniforms.uStokeAmp.value).toBeLessThanOrEqual(0.55);
    embers.points.geometry.dispose();
    (embers.points.material as THREE.Material).dispose();
  });
  it('builds sky uniforms with normalised directions', () => {
    const uniforms = nightSkyUniforms({ noise: new THREE.Data3DTexture(), zenith: '#000', horizon: '#111', moon: { direction: new THREE.Vector3(1, 1, 0), intensity: 10 } });
    expect(uniforms.uMoonDir.value.length()).toBeCloseTo(1, 5);
    expect(uniforms.uMoonShape.value.x).toBeGreaterThan(0);
  });
  it('makes faceted boulders that fill their unit box and eroded ridges with real relief', () => {
    const boulder = boulderGeometry(7, 4, 10, 0.1, true);
    boulder.computeBoundingBox();
    expect(boulder.boundingBox!.max.x).toBeCloseTo(1, 3);
    const ridge = ridgeGeometry({ z: -50, width: 100, depth: 20, base: -1, peaks: [[0, 10, 20]], seed: 3, segments: [40, 10] });
    ridge.computeBoundingBox();
    expect(ridge.boundingBox!.max.y).toBeGreaterThan(4);
    boulder.dispose(); ridge.dispose();
  });
  it('marches at most 34 steps in the night volume pass', () => {
    const volume = createNightVolume({
      noise: new THREE.Data3DTexture(), moonDirection: new THREE.Vector3(0, 1, 0), moon: new THREE.Color(), ambient: new THREE.Color(),
      fogDensity: 0.01, fogHeight: 10, fogBase: 0, maxDistance: 100,
    });
    expect(volume.material.fragmentShader).toContain('const int HAZE = 20;');
    expect(volume.material.fragmentShader).toContain('const int SMOKE = 14;');
    volume.material.dispose();
  });
});
