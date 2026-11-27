import * as THREE from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { fbm3, ridged3, seeded } from './noise';

/** Faceted, eroded boulder normalised to a unit box, so mesh scale gives exact extents. */
export function boulderGeometry(seed: number, detail: number) {
  const random = seeded(seed * 7919 + 13);
  const base = new THREE.IcosahedronGeometry(1, detail);
  base.deleteAttribute('normal'); base.deleteAttribute('uv');
  const geometry = mergeVertices(base); base.dispose();
  const planes = Array.from({ length: 7 }, () => {
    const n = new THREE.Vector3(random() * 2 - 1, (random() * 2 - 1) * .7, random() * 2 - 1).normalize();
    return { n, c: .62 + random() * .3 };
  });
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const p = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    p.fromBufferAttribute(position, i).normalize();
    // Fracture planes give limestone its blocky facets; noise erodes them.
    let r = 1;
    for (const { n, c } of planes) { const d = p.dot(n); if (d > 1e-3) r = Math.min(r, c / d); }
    r = THREE.MathUtils.lerp(r, .82, .18);
    r *= 1 + fbm3(p.x * 1.7 + seed, p.y * 1.7, p.z * 1.7, 4) * .13 + (ridged3(p.x * 3.1, p.y * 3.1 + seed, p.z * 3.1, 3) - .35) * .05;
    p.multiplyScalar(r);
    if (p.y < -.32) p.y = THREE.MathUtils.lerp(p.y, -.32, .75);
    position.setXYZ(i, p.x, p.y, p.z);
  }
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const centre = box.getCenter(new THREE.Vector3()), size = box.getSize(new THREE.Vector3());
  geometry.translate(-centre.x, -centre.y, -centre.z);
  geometry.scale(2 / size.x, 2 / size.y, 2 / size.z);
  geometry.computeVertexNormals();
  return geometry;
}
