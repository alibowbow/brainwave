import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { boulderGeometry } from '../shared/render/rockGeometry';
import { applyRockSurface } from '../shared/render/rockSurface';
import { noise3, ridged3 } from '../shared/render/noise';
import { applyForestSurface, WATER_LEVEL, type ForestLightUniforms } from './forestLight';
import { groundHeight } from './forestMath';

const TAU = Math.PI * 2;

/**
 * Eroded, wet, mossy stones around and inside the pool. Fracture-faceted
 * boulder geometry, world-space rock shading with moss on the dry tops, a wet
 * algae band at the waterline, caustics underwater and light reflected off
 * the pool dancing on the nearby faces. All stones are one mesh, which is also
 * the touch occluder. Moss lives in the shader: separate tuft geometry read as
 * dark specks at the seat's viewing distance and was removed.
 */
export function createForestStones(uniforms: ForestLightUniforms, random: () => number, time: { value: number }): THREE.Group {
  const group = new THREE.Group(); group.name = 'forest-stones';
  const parts: THREE.BufferGeometry[] = [];

  const add = (x: number, z: number, size: number, detail: number, flatten: number, sink: number) => {
    const seed = Math.floor(random() * 1e6);
    const geometry = boulderGeometry(seed, detail);
    if (detail >= 3) {
      // Weathering on top of the fracture facets: solution pits, runnels and a
      // rough skin, strongest on large stones that sit within arm's reach.
      const p = geometry.attributes.position as THREE.BufferAttribute, n = geometry.attributes.normal as THREE.BufferAttribute;
      const o = (seed % 997) * 0.37;
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
        const d = (ridged3(x * 2.4 + o, y * 2.4, z * 2.4, 3) - 0.42) * 0.06 + noise3(x * 7 + o, y * 7, z * 7) * 0.018 - Math.max(0, noise3(x * 3.3, y * 3.3 + o, z * 3.3)) * 0.035;
        p.setXYZ(i, x + n.getX(i) * d, y + n.getY(i) * d, z + n.getZ(i) * d);
      }
      geometry.computeVertexNormals();
    }
    const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler((random() - 0.5) * 0.25, random() * TAU, (random() - 0.5) * 0.2));
    const scale = new THREE.Vector3(size * (0.95 + random() * 0.3), size * flatten * (0.85 + random() * 0.3), size * (0.85 + random() * 0.3));
    const centre = new THREE.Vector3(x, groundHeight(x, z) + scale.y * (1 - sink), z);
    geometry.applyMatrix4(new THREE.Matrix4().compose(centre, rotation, scale));
    geometry.computeVertexNormals();
    parts.push(geometry);
  };

  // Large stones framing the seat and the pool (unchanged layout).
  ([
    [-2.45, 1.8, 0.78], [2.6, 1.0, 0.8], [-2.25, -2.1, 0.6], [1.8, -3.45, 0.72],
    [-0.72, 2.91, 0.36], [0.58, 3.07, 0.4], [-3.1, -4.9, 0.82], [3.4, -6.1, 1.1],
  ] as const).forEach(([x, z, size]) => add(x, z, size, 6, 0.62, 0.42));
  // Rim stones along the waterline.
  for (let i = 0; i < 64; i++) {
    const angle = random() * TAU, radius = 0.92 + random() * 0.3;
    add(Math.cos(angle) * 2.55 * radius - 0.18, Math.sin(angle) * 3.45 * radius - 0.55, 0.1 + random() * 0.22, 3, 0.55, 0.45);
  }
  // Cobbles on the bed, seen through the water.
  for (let i = 0; i < 80; i++) {
    const angle = random() * TAU, radius = Math.sqrt(random()) * 0.85;
    add(Math.cos(angle) * 2.55 * radius - 0.18, Math.sin(angle) * 3.45 * radius - 0.55, 0.05 + random() * 0.11, 1, 0.5, 0.35);
  }

  const material = new THREE.MeshStandardMaterial({ name: 'forest-wet-stone', color: '#958f80', roughness: 0.82, metalness: 0 });
  applyForestSurface(material, uniforms, { key: 'forest-stone', underwater: true });
  applyRockSurface(material, {
    key: 'forest-stone', scale: 1.25, bump: 1.25, stain: '#6f5c40', stainAmount: 0.3, cavity: 0.8, strata: 0.16,
    dryRoughness: 0.8, wetRoughness: 0.12, wetness: 0.04, drips: 0.1, waterY: WATER_LEVEL, wetBand: 0.24,
    algae: '#3b4826', algaeAmount: 0.55, moss: { color: '#4a6420', amount: 0.62 },
    caustics: { centre: new THREE.Vector3(-0.18, WATER_LEVEL, -0.55), radius: 3.4, color: new THREE.Color(1.0, 0.92, 0.7).multiplyScalar(0.35), time },
  });
  const stoneGeometry = mergeGeometries(parts)!;
  parts.forEach(part => part.dispose());
  const stones = new THREE.Mesh(stoneGeometry, material); stones.name = 'forest-stone-surfaces';
  stones.castShadow = true; stones.receiveShadow = true; group.add(stones);

  return group;
}
