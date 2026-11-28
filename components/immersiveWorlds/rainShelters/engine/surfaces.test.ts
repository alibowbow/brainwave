import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { TimberSet } from './surfaces';
import { boulderGeometry } from './geometry';

describe('procedural timber', () => {
  it('merges pieces into one mesh whose grain follows each piece, rotated with it', () => {
    const set = new TimberSet(3);
    set.box(2, 0.1, 0.2, { x: 0, y: 0, z: 0 });                                   // grain along x
    set.box(0.2, 0.1, 2, { x: 1, y: 0, z: 0 }, new THREE.Euler(0, Math.PI / 2, 0)); // z-long board turned to x
    set.log(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 3, 0), 0.1);          // vertical roundwood
    const mesh = set.build(new THREE.MeshStandardMaterial(), 'test-timber');
    const grain = mesh.geometry.attributes.aGrain as THREE.BufferAttribute;
    const piece = mesh.geometry.attributes.aPiece as THREE.BufferAttribute;
    const centre = mesh.geometry.attributes.aCentre as THREE.BufferAttribute;
    expect(mesh.name).toBe('test-timber');
    expect(grain.count).toBe(mesh.geometry.attributes.position.count);
    expect(Math.abs(grain.getX(0))).toBeCloseTo(1);
    const last = grain.count - 1;
    expect(Math.abs(grain.getY(last))).toBeCloseTo(1);
    // Roundwood carries a negative id so its rings stay concentric.
    expect(piece.getX(last)).toBeLessThan(0);
    expect(piece.getX(0)).toBeGreaterThan(0);
    expect(centre.getY(last)).toBeCloseTo(1.5);
    // The turned board's grain was rotated from z to x.
    const turned = Array.from({ length: grain.count }, (_, i) => i).find(i => centre.getX(i) === 1)!;
    expect(Math.abs(grain.getX(turned))).toBeCloseTo(1);
    expect(Math.abs(grain.getZ(turned))).toBeCloseTo(0);
    mesh.geometry.dispose();
  });

  it('builds deterministic faceted stones normalised to a unit box', () => {
    const a = boulderGeometry(7, 2), b = boulderGeometry(7, 2);
    expect(Array.from(a.attributes.position.array)).toEqual(Array.from(b.attributes.position.array));
    a.computeBoundingBox();
    const size = a.boundingBox!.getSize(new THREE.Vector3());
    expect(size.x).toBeCloseTo(2, 4); expect(size.y).toBeCloseTo(2, 4); expect(size.z).toBeCloseTo(2, 4);
    a.dispose(); b.dispose();
  });
});
