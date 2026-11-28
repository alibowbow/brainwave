import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createNapTerraceWorld } from './napTerrace';
import { buildCypress, buildOlive, canopyVisibility, groundY, oliveCanopy, pathX, TO_SUN, type OliveSpec } from './napGarden';
import type { CanopyLight } from '../shared/render/foliageShading';

// CPU contracts for the nap terrace garden: budget, tree structure, the shared
// canopy (dapple) function and the meadow layout. Not evidence of rendered quality.

function meshTriangles(mesh: THREE.Mesh) {
  const g = mesh.geometry;
  const count = (g.index ? g.index.count : g.attributes.position.count) / 3;
  return count * ((mesh as THREE.InstancedMesh).isInstancedMesh ? (mesh as THREE.InstancedMesh).count : 1);
}

describe('power_nap garden budget', () => {
  it('stays under 0.9M triangles per frame including the shadow pass', () => {
    const world = createNapTerraceWorld();
    world.resize(1.6);
    world.update(8, 0);
    let scene = 0, shadow = 0, meshes = 0;
    world.scene.traverse(object => {
      const mesh = object as THREE.Mesh;
      if (!mesh.isMesh || !mesh.visible) return;
      const tris = meshTriangles(mesh);
      scene += tris; meshes++;
      if (mesh.castShadow) shadow += tris;
    });
    // Upper bound: every mesh in view plus every caster in the sun's shadow map.
    expect(scene + shadow).toBeLessThan(900_000);
    expect(meshes).toBeLessThan(80);
    world.dispose?.();
  }, 60_000);
});

describe('olive trees', () => {
  const spec: OliveSpec = { seed: 81, x: -5.2, z: -5.6, strands: 3, girth: 0.5, split: 1.45, crown: 4.8, lean: [0.55, 0.9], open: 0.7, reach: 1.25, twist: 1.3, crownLean: [2.4, 2.2], gnarl: 1.3, scaffold: { limbs: 2, length: 2.7 }, detail: 'hero', leafSize: 0.44, cards: 10 };

  it('splits an old trunk into twisted strands and forked scaffold limbs, each limb with its own crown', () => {
    const olive = buildOlive(spec);
    expect(olive.crowns).toHaveLength(spec.strands * spec.scaffold!.limbs);
    expect(buildOlive({ ...spec, scaffold: undefined }).crowns).toHaveLength(spec.strands);
    for (const geometry of [olive.bark, olive.leaves]) {
      const count = geometry.attributes.position.count;
      expect(geometry.attributes.aWind.count).toBe(count);
      expect(geometry.attributes.aWindPhase.count).toBe(count);
      expect(Array.from(geometry.attributes.position.array as Float32Array).every(Number.isFinite)).toBe(true);
    }
    // Strands are fused at the foot and part above it.
    const p = olive.bark.attributes.position;
    const base = groundY(spec.x, spec.z);
    let footReach = 0, splitReach = 0;
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i) - base, d = Math.hypot(p.getX(i) - spec.x, p.getZ(i) - spec.z);
      if (y < 0.2) footReach = Math.max(footReach, d);
      if (Math.abs(y - spec.split) < 0.1) splitReach = Math.max(splitReach, d);
    }
    expect(footReach).toBeGreaterThan(spec.girth);
    expect(splitReach).toBeGreaterThan(footReach);
    // Dense small leaf clusters, not a handful of large cards.
    expect(olive.leaves.index!.count / 3).toBeGreaterThan(15_000);
    expect(buildOlive(spec).bark.attributes.position.array).toEqual(olive.bark.attributes.position.array);
  });

  it('builds cypresses as dense columns around a dark core', () => {
    const cypress = buildCypress({ seed: 3, base: new THREE.Vector3(0, 0, -20), height: 11, radius: 1.05, cards: 280, size: 0.95 });
    cypress.leaves.computeBoundingBox();
    const size = cypress.leaves.boundingBox!.getSize(new THREE.Vector3());
    expect(size.y / Math.max(size.x, size.z)).toBeGreaterThan(3.5);
    expect(cypress.leaves.index!.count / 3).toBe(280 * 8);
    expect(cypress.core.attributes.position.count).toBeGreaterThan(0);
  });
});

describe('shared canopy light', () => {
  const time = { value: 0 };
  const crown = { centre: new THREE.Vector3(0, 5, 0), radius: new THREE.Vector3(2, 1.8, 2) };
  const canopy: CanopyLight = oliveCanopy({ crowns: [crown], density: 1.6, gaps: -0.05, softness: 0.2, fleck: 4.5, clump: 1.5, time });
  const underCrown = (y: number) => {
    const values: number[] = [];
    for (let x = -1; x <= 1; x += 0.05) for (let z = -1; z <= 1; z += 0.05) {
      // Points whose sun ray passes through the crown's middle.
      const p = new THREE.Vector3(x, 5, z).addScaledVector(TO_SUN, -(5 - y) / TO_SUN.y);
      values.push(canopyVisibility(canopy, p));
    }
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const spread = Math.sqrt(values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length);
    return { mean, spread };
  };

  it('is full sun away from the crowns and dappled, not solid, beneath them', () => {
    expect(canopyVisibility(canopy, new THREE.Vector3(30, 0, 30))).toBe(1);
    const floor = underCrown(0);
    expect(floor.mean).toBeGreaterThan(0.1);
    expect(floor.mean).toBeLessThan(0.6);
    expect(floor.spread).toBeGreaterThan(0.2);
  });

  it('casts the same leaves on every point of one sun ray (sail, air, floor)', () => {
    const floor = new THREE.Vector3(0.3, 5, -0.2).addScaledVector(TO_SUN, -5 / TO_SUN.y);
    const sail = floor.clone().addScaledVector(TO_SUN, 2.9 / TO_SUN.y);
    expect(floor.y).toBeCloseTo(0, 5);
    expect(canopyVisibility(canopy, floor)).toBeLessThan(1);
    expect(canopyVisibility(canopy, sail)).toBeCloseTo(canopyVisibility(canopy, floor), 5);
  });

  it('declares the GLSL twin with the same uniforms', () => {
    expect(canopy.glsl).toContain('float bwCanopy(vec3 p)');
    expect(canopy.uniforms.uNapCrown.value).toHaveLength(2);
    expect(canopy.uniforms.uBwCanopyTime).toBe(time);
  });
});

describe('meadow', () => {
  const world = createNapTerraceWorld();
  world.resize(1.6);
  const tufts = (prefix: string) => {
    const out: Array<{ x: number; z: number; h: number }> = [];
    const m = new THREE.Matrix4(), p = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3();
    world.scene.traverse(object => {
      const mesh = object as THREE.InstancedMesh;
      if (!mesh.isInstancedMesh || !mesh.name.startsWith(prefix)) return;
      for (let i = 0; i < mesh.count; i++) { mesh.getMatrixAt(i, m); m.decompose(p, q, s); out.push({ x: p.x, z: p.z, h: s.y }); }
    });
    return out;
  };

  it('thins and shortens toward the trodden path', () => {
    const near = tufts('meadow-near-').filter(t => t.z < -8 && t.z > -24);
    const onPath = near.filter(t => Math.abs(t.x - pathX(t.z)) < 0.5);
    const verge = near.filter(t => { const d = Math.abs(t.x - pathX(t.z)); return d > 3 && d < 4; });
    // Same strip width (1 m) on each side: the path holds far fewer, shorter tufts.
    expect(onPath.length).toBeLessThan(verge.length * 0.4);
    const meanHeight = (list: typeof near) => list.reduce((a, t) => a + t.h, 0) / Math.max(1, list.length);
    expect(meanHeight(onPath)).toBeLessThan(meanHeight(verge));
  });

  it('mixes grasses with sparse wildflower drifts and draws distance with a cheaper LOD', () => {
    const count = (name: string) => tufts(name).length;
    const grasses = count('meadow-near-green') + count('meadow-near-dry') + count('meadow-near-mixed');
    const flowers = count('meadow-near-poppy') + count('meadow-near-daisy');
    expect(count('meadow-near-green')).toBeGreaterThan(0);
    expect(count('meadow-near-dry')).toBeGreaterThan(0);
    expect(flowers).toBeGreaterThan(0);
    expect(flowers).toBeLessThan(grasses * 0.15);
    const triangles = (name: string) => {
      let tris = 0;
      world.scene.traverse(object => { const mesh = object as THREE.Mesh; if (mesh.name === name) tris = mesh.geometry.index!.count / 3; });
      return tris;
    };
    expect(triangles('meadow-far-green')).toBeLessThan(triangles('meadow-near-green'));
    const far = tufts('meadow-far-');
    expect(Math.max(...far.map(t => t.z))).toBeLessThan(Math.min(...tufts('meadow-near-').map(t => t.z)) + 1);
  });
});
