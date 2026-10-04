import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createBroadleafPlant, type ForestMaterials } from './botany';
import { forestRandom } from './forestMath';

function materials(): ForestMaterials {
  return {
    bark: new THREE.MeshStandardMaterial(), leaf: new THREE.MeshPhysicalMaterial({ side: THREE.DoubleSide }),
    ground: new THREE.MeshStandardMaterial(), rock: new THREE.MeshStandardMaterial(),
    moss: new THREE.MeshStandardMaterial(), twig: new THREE.MeshStandardMaterial(),
    dew: new THREE.MeshPhysicalMaterial({ transparent: true }),
  };
}

function build(foreground: boolean, seed: number) {
  const random = forestRandom(seed);
  let draws = 0;
  const group = createBroadleafPlant(materials(), () => { draws++; return random(); }, .82, foreground);
  return { group, draws, next: random() };
}

function mesh(group: THREE.Group, name: string) {
  return group.getObjectByName(name) as THREE.InstancedMesh;
}

function dispose(group: THREE.Group) {
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.geometry.dispose();
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) material.dispose();
    if (object instanceof THREE.InstancedMesh) object.dispose();
  });
}

describe('bounded foreground leaf refinement', () => {
  it('preserves every leaf pose, colour, stem and later layout random sample', () => {
    for (const seed of [7391, 17, 405]) {
      const standard = build(false, seed), foreground = build(true, seed);
      const a = mesh(standard.group, 'forest-broadleaf-leaves');
      const b = mesh(foreground.group, 'forest-broadleaf-leaves');
      expect(foreground.draws).toBe(20 * a.count + 2);
      expect(foreground.draws).toBe(standard.draws);
      expect(foreground.next).toBe(standard.next);
      expect(b.instanceMatrix.array).toEqual(a.instanceMatrix.array);
      expect(b.instanceColor?.array).toEqual(a.instanceColor?.array);
      expect(foreground.group.userData.swaySeed).toBe(standard.group.userData.swaySeed);
      expect((foreground.group.children[0] as THREE.Mesh).geometry.attributes.position.array)
        .toEqual((standard.group.children[0] as THREE.Mesh).geometry.attributes.position.array);
      expect(b.geometry.attributes.position.count).toBeGreaterThan(a.geometry.attributes.position.count);
      for (const value of b.geometry.attributes.normal.array) expect(Number.isFinite(value)).toBe(true);
      dispose(standard.group); dispose(foreground.group);
    }
  });

  it('seats each small dew cap on its own curved leaf and points it along the surface normal', () => {
    const { group } = build(true, 7391);
    const leaves = mesh(group, 'forest-broadleaf-leaves'), dew = mesh(group, 'forest-leaf-dew');
    const target = new THREE.Mesh(leaves.geometry, leaves.material);
    target.matrixAutoUpdate = false;
    for (let i = 0; i < dew.count; i++) {
      const matrix = new THREE.Matrix4(), centre = new THREE.Vector3(), rotation = new THREE.Quaternion(), scale = new THREE.Vector3();
      dew.getMatrixAt(i, matrix); matrix.decompose(centre, rotation, scale);
      const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(rotation);
      leaves.getMatrixAt(Math.floor(i / 2), target.matrix); target.updateMatrixWorld(true);
      const ray = new THREE.Raycaster(centre, normal.clone().negate(), 0, scale.z * 2);
      const hit = ray.intersectObject(target)[0];
      expect(hit).toBeDefined();
      // The cap intersects the actual triangulated lamina; it cannot float
      // above it or be buried below it, including on the curved/twisted blade.
      expect(hit.distance).toBeGreaterThan(scale.z * .4);
      expect(hit.distance).toBeLessThan(scale.z);
      const leafNormal = hit.face!.normal.clone().applyMatrix3(new THREE.Matrix3().getNormalMatrix(target.matrixWorld)).normalize();
      expect(leafNormal.dot(normal)).toBeGreaterThan(.97);
      expect(scale.x).toBeLessThan(.009);
      expect(scale.z / scale.x).toBeCloseTo(.66, 5);
    }
    dispose(group);
  });
});
