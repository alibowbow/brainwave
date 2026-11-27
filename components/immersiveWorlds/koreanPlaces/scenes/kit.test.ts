import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { bakeStatic } from './kit';
import { buildRoof, roofShape } from './koreanRoof';
import { crest, RIDGES, SUN } from './templeParts';

describe('static baking', () => {
  it('merges meshes per material, keeps flagged meshes live and preserves geometry', () => {
    const root = new THREE.Group();
    const a = new THREE.MeshStandardMaterial(), b = new THREE.MeshStandardMaterial();
    const box = () => new THREE.BoxGeometry(1, 1, 1);
    for (let i = 0; i < 4; i++) { const m = new THREE.Mesh(box(), i % 2 ? a : b); m.position.x = i * 2; root.add(m); }
    const live = new THREE.Mesh(box(), a); live.userData.keep = true; root.add(live);
    const merged = bakeStatic(root, root);
    expect(merged).toHaveLength(2);
    expect(root.children.filter(c => c !== live)).toHaveLength(2);
    expect(root.children).toContain(live);
    // Two boxes per material, 36 non-indexed vertices each.
    merged.forEach(mesh => expect(mesh.geometry.attributes.position.count).toBe(72));
  });

  it('keeps outward winding under a mirrored transform', () => {
    const root = new THREE.Group();
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial());
    mesh.scale.x = -1; root.add(mesh);
    const [merged] = bakeStatic(root, root);
    const p = merged.geometry.attributes.position;
    const v = [0, 1, 2].map(i => new THREE.Vector3().fromBufferAttribute(p, i));
    const normal = new THREE.Vector3().crossVectors(v[1].clone().sub(v[0]), v[2].clone().sub(v[0]));
    expect(normal.z).toBeGreaterThan(0);
  });
});

describe('hip-and-gable roof', () => {
  const spec = { halfWidth: 6, halfDepth: 4.8, eaveY: 5, ridgeY: 7.5, hipDepth: 2.5, lift: .5, flare: .2 };
  it('lifts the eave toward the corners and reaches the ridge height', () => {
    const { point, W, D } = roofShape(spec);
    expect(point(W, D, 0).y).toBeGreaterThan(point(0, D, 0).y + .4);
    expect(point(0, 0, D).y).toBeCloseTo(7.5, 6);
  });

  it('builds finite tiles facing up and a soffit facing down', () => {
    const m = new THREE.MeshBasicMaterial();
    const { group } = buildRoof(spec, { tile: m, ridge: m, gable: m, soffit: m, rafter: m, rafterEnd: m, endTile: m });
    const [tiles, soffit] = group.children as THREE.Mesh[];
    const meanNormalY = (mesh: THREE.Mesh) => {
      const n = mesh.geometry.attributes.normal; let sum = 0;
      for (let i = 0; i < n.count; i++) sum += n.getY(i);
      return sum / n.count;
    };
    const p = tiles.geometry.attributes.position.array as Float32Array;
    expect(p.every(Number.isFinite)).toBe(true);
    expect(meanNormalY(tiles)).toBeGreaterThan(.5);
    expect(meanNormalY(soffit)).toBeLessThan(-.5);
  });
});

describe('dawn ridges', () => {
  it('open a saddle below the sun line so the sun rises out of the valley', () => {
    const eye = new THREE.Vector3(.8, 1.62, 4.8);
    RIDGES.forEach((ridge, layer) => {
      const t = (ridge.z - eye.z) / SUN.z;
      const x = eye.x + SUN.x * t, y = eye.y + SUN.y * t;
      expect(crest(layer, x)).toBeLessThan(y - 5);
    });
  });
});
