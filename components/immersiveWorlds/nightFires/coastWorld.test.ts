import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { buildMountainWorld, coastGround } from './mountainScene';
import { SEA_LEVEL, shoreProfile, shoreZ } from './coastWater';
import type { WorldRecipe } from './worldTypes';

function release(recipe: WorldRecipe) {
  recipe.scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    mesh.geometry?.dispose();
    if (mesh.material) for (const m of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) m.dispose();
  });
  recipe.dispose?.();
}

const find = (recipe: WorldRecipe, name: string) => {
  let found: THREE.Object3D | undefined;
  recipe.scene.traverse((object) => { if (!found && object.name.startsWith(name)) found = object; });
  return found;
};

describe('campfire by the sea (amb:campfire_night, world "mountain")', () => {
  it('has a camp bank above a sea inlet whose beach runs into the water', () => {
    // Camp ground around the fire sits clearly above the water.
    expect(coastGround(0, 0.9)).toBeGreaterThan(SEA_LEVEL + 0.4);
    // Beyond the jetty and in the cove the bed is under water.
    expect(coastGround(0, -9)).toBeLessThan(SEA_LEVEL - 0.5);
    expect(coastGround(-3.5, -6)).toBeLessThan(SEA_LEVEL);
    // The beach crosses the mean waterline: the swash has something to run up.
    expect(shoreProfile(-0.3)).toBeLessThan(SEA_LEVEL);
    expect(shoreProfile(0.6)).toBeGreaterThan(SEA_LEVEL);
    expect(shoreProfile(0.6)).toBeLessThan(SEA_LEVEL + 0.2);
    // A point juts out on the left for the pines.
    expect(shoreZ(-8)).toBeLessThan(shoreZ(-3) - 4);
  });

  it('keeps the water, sky, plants and fire moving, slowly and without flashes', () => {
    const recipe = buildMountainWorld();
    recipe.view(1.6);
    const water = find(recipe, 'Sea inlet') as THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>;
    expect(water).toBeTruthy();
    const uniforms = water.material.uniforms;
    // Eight wave trains with real lengths and gentle steepness (calm inlet, not a still mirror).
    expect(uniforms.uWaveLength.value).toHaveLength(8);
    for (const steep of uniforms.uWaveSteep.value as number[]) { expect(steep).toBeGreaterThan(0); expect(steep).toBeLessThan(0.05); }
    expect(water.material.fragmentShader).toContain('coastLap');
    const fireLight = find(recipe, 'Campfire by the sea')!.getObjectByProperty('type', 'PointLight') as THREE.PointLight;
    expect(fireLight.castShadow).toBe(true);
    recipe.update(1, 1 / 60);
    const t1 = uniforms.uTime.value, sky1 = uniforms.uSkyTime.value, light1 = fireLight.intensity;
    recipe.update(4.2, 1 / 60);
    expect(uniforms.uTime.value).toBeGreaterThan(t1);
    expect(uniforms.uSkyTime.value).toBeGreaterThan(sky1);
    // The fire's light flickers smoothly: it changes but stays within a soft band.
    expect(fireLight.intensity).not.toBe(light1);
    expect(fireLight.intensity / light1).toBeGreaterThan(0.6);
    expect(fireLight.intensity / light1).toBeLessThan(1.6);
    release(recipe);
  }, 60_000);

  it('composes the poster: pines, spruce, deck, chair, firewood, crate, lantern, mug and lavender', () => {
    const recipe = buildMountainWorld();
    for (const name of ['Pine crowns', 'Spruce crowns', 'Weathered deck', 'Folding canvas camp chair', 'Stacked firewood', 'Wooden crate', 'Hurricane lantern', 'Enamel mug', 'Lavender flower spikes', 'Campfire by the sea', 'Teepee of split logs', 'Twilight sky', 'Far cabin lights']) {
      expect(find(recipe, name), name).toBeTruthy();
    }
    // Only the logs are interactive, as before: tapping them stokes the fire.
    expect(recipe.targets.map((t) => t.kind)).toEqual(['log-embers']);
    expect(recipe.interact('log-embers')).toBeGreaterThan(0);
    release(recipe);
  }, 60_000);

  it('moves props into a narrower semicircle for portrait instead of cropping them', () => {
    const recipe = buildMountainWorld();
    const lamp = find(recipe, 'Hurricane lantern')!;
    recipe.view(1.6);
    const wide = lamp.position.x;
    const desktop = recipe.view(1.6);
    recipe.view(0.46);
    expect(Math.abs(lamp.position.x)).toBeLessThan(Math.abs(wide));
    const portrait = recipe.view(0.46);
    expect(portrait.fov).toBeGreaterThan(desktop.fov);
    release(recipe);
  }, 60_000);

  it('stays within a phone-sized triangle budget, shadows included', () => {
    const recipe = buildMountainWorld();
    recipe.view(1.6);
    let drawn = 0, casters = 0;
    recipe.scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (!mesh.isMesh || !mesh.visible) return;
      const geometry = mesh.geometry;
      const triangles = (geometry.index ? geometry.index.count : geometry.attributes.position.count) / 3 * ((mesh as THREE.InstancedMesh).count ?? 1);
      drawn += triangles;
      if (mesh.castShadow) casters += triangles;
    });
    // Upper bound before culling; the shadow maps re-render only when the layout changes.
    expect(drawn).toBeLessThan(450_000);
    expect(casters).toBeLessThan(90_000);
    release(recipe);
  }, 60_000);
});
