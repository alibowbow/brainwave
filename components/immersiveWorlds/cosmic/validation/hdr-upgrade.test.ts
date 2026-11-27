import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { cosmicPostTier, createCosmicQualityState, advanceCosmicQuality } from '../qualityPolicy';
import { createDustVolume, MAX_DUST_STEPS, MAX_MIST, MAX_OCCLUDERS } from '../spaceDust';
import { createGarden, COSMIC_DETAIL_LAYER } from '../garden';
import { createCosmicSky, COSMIC_SUN_DIRECTION } from '../sky';
import { createNoiseVolume } from '../../shared/render/fireFlame';

describe('cosmic HDR quality tiers', () => {
  it('keeps AO and the full dust march at full quality and sheds them under pressure', () => {
    expect(cosmicPostTier(1)).toEqual({ ao: true, volumeSteps: 32 });
    const reduced = Array.from({ length: 65 }).reduce<ReturnType<typeof createCosmicQualityState>>(
      state => advanceCosmicQuality(state, 0.125), createCosmicQualityState());
    expect(reduced.quality).toBe(0.8);
    expect(cosmicPostTier(reduced.quality)).toEqual({ ao: false, volumeSteps: 20 });
    // Half-resolution raymarching stays within the phone budget at every tier.
    for (const quality of [1, 0.8] as const) expect(cosmicPostTier(quality).volumeSteps).toBeLessThanOrEqual(40);
  });
});

describe('cosmic dust volume', () => {
  it('bounds its march and exposes fixed occluder and mist slots', () => {
    const noise = createNoiseVolume(8, 3);
    const dust = createDustVolume({
      noise, sun: COSMIC_SUN_DIRECTION, sunColor: new THREE.Color(1, 1, 1), ambient: new THREE.Color(0, 0, 0), density: .01, maxDistance: 90,
    });
    try {
      expect(dust.occluders).toHaveLength(MAX_OCCLUDERS);
      expect(dust.mist).toHaveLength(MAX_MIST);
      expect(dust.material.uniforms.uSteps.value).toBe(MAX_DUST_STEPS);
      dust.setSteps(1000);
      expect(dust.material.uniforms.uSteps.value).toBe(MAX_DUST_STEPS);
      dust.setSteps(0);
      expect(dust.material.uniforms.uSteps.value).toBe(4);
      expect(MAX_DUST_STEPS).toBeLessThanOrEqual(40);
      expect(dust.material.fragmentShader).toContain('bwSceneRay');
    } finally { dust.material.dispose(); noise.dispose(); }
  });
});

describe('cosmic garden geometry and lifecycle', () => {
  it('stays within a plausible triangle budget, writes finite occluders and disposes everything once', () => {
    const noise = createNoiseVolume(8, 5);
    const garden = createGarden({ noise });
    try {
      let triangles = 0;
      const resources = new Set<THREE.BufferGeometry | THREE.Material>();
      let detail = 0;
      garden.group.traverse(object => {
        if (object.layers.isEnabled(COSMIC_DETAIL_LAYER) && !object.layers.isEnabled(0)) detail++;
        if (object instanceof THREE.Mesh || object instanceof THREE.Sprite) {
          // Sprites share three's module-level quad; only their material is ours.
          if (object instanceof THREE.Mesh) resources.add(object.geometry);
          (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => resources.add(m));
          if (object instanceof THREE.Mesh) {
            const position = object.geometry.getAttribute('position');
            const values = position.array as ArrayLike<number>;
            let finite = true;
            for (let i = 0; i < values.length; i++) if (!Number.isFinite(values[i])) { finite = false; break; }
            expect(finite).toBe(true);
            triangles += (object.geometry.index?.count ?? position.count) / 3;
          }
        }
      });
      // No multi-million-triangle meshes: the whole garden stays well below one million.
      expect(triangles).toBeGreaterThan(100_000);
      expect(triangles).toBeLessThan(900_000);
      // Island foliage and falls skip the pond reflection pass.
      expect(detail).toBeGreaterThan(0);
      const occluders = Array.from({ length: MAX_OCCLUDERS }, () => new THREE.Vector4());
      const mist = Array.from({ length: MAX_MIST }, () => new THREE.Vector4());
      garden.update(12, null);
      garden.writeOccluders(occluders);
      garden.writeMist(mist);
      expect(occluders.filter(o => o.w > 0)).toHaveLength(7);
      expect(mist.filter(m => m.w > 0)).toHaveLength(3);
      [...occluders, ...mist].forEach(v => expect(v.toArray().every(Number.isFinite)).toBe(true));
      const counts = new Map<object, number>();
      // The Reflector's internal render target is owned and disposed by Reflector itself.
      resources.forEach(r => r.addEventListener('dispose', () => counts.set(r, (counts.get(r) || 0) + 1)));
      garden.dispose(); garden.dispose();
      resources.forEach(r => expect(counts.get(r)).toBe(1));
    } finally { noise.dispose(); }
    // Builds the whole garden's geometry on the CPU; generous for loaded CI machines.
  }, 60_000);
});

describe('cosmic sky resources', () => {
  it('owns and releases its shared noise volume with the sky', () => {
    const sky = createCosmicSky();
    let released = 0;
    sky.noise.addEventListener('dispose', () => released++);
    sky.update(3);
    sky.dispose(); sky.dispose();
    expect(released).toBe(1);
    expect(COSMIC_SUN_DIRECTION.length()).toBeCloseTo(1, 10);
  });
});
