import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { groundHeight } from './forestMath';

const UP = new THREE.Vector3(0, 1, 0);
const TAU = Math.PI * 2;

/** A continuous, coordinate-based surface: duplicate triangle corners get identical color. */
function rockRelief(x: number, y: number, z: number) {
  return 1 + 0.055 * Math.sin(x * 5.3 + z * 4.1) * Math.cos(y * 4.6)
    + 0.026 * Math.sin(z * 10.8 + x * 7.7 + y * 2.1);
}

function mossAmount(x: number, y: number, z: number) {
  const edge = y + 0.13 * Math.sin(x * 8.1 + z * 3.7) * Math.cos(z * 6.3);
  const patch = 0.62 + 0.38 * Math.sin(x * 4.2 + z * 3.2 + 0.9);
  return THREE.MathUtils.smoothstep(edge, 0.22, 0.79) * patch;
}

/** Three tiny curved moss blades, repeated as one instanced draw. No alpha cards. */
function mossTuftGeometry() {
  const positions: number[] = [], indices: number[] = [];
  for (let blade = 0; blade < 3; blade++) {
    const angle = blade / 3 * TAU;
    const ca = Math.cos(angle), sa = Math.sin(angle);
    const start = positions.length / 3;
    for (const [x, y, z] of [[-0.2, 0, 0], [0.2, 0, 0], [-0.11, 0.63, 0.06], [0.11, 0.63, 0.06], [0, 1, 0.23]]) {
      positions.push(x * ca - z * sa, y, x * sa + z * ca);
    }
    indices.push(start, start + 1, start + 2, start + 1, start + 3, start + 2, start + 2, start + 3, start + 4);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}

/** Original smooth wet stones. Main geometry and all moss together use two draw calls. */
export function createForestStones(base: THREE.MeshStandardMaterial, random: () => number): THREE.Group {
  const group = new THREE.Group(); group.name = 'forest-stones';
  const parts: THREE.BufferGeometry[] = [];
  const tufts: { matrix: THREE.Matrix4; color: THREE.Color }[] = [];
  const grey = new THREE.Color('#a0a7a1');
  const damp = new THREE.Color('#69776e');
  const mossGreen = new THREE.Color('#7b8a4d');

  const add = (x: number, z: number, size: number, flatten = 0.66) => {
    const large = size >= 0.45;
    const geometry = new THREE.IcosahedronGeometry(1, large ? 3 : 1);
    const positions = geometry.attributes.position;
    const normals = geometry.attributes.normal;
    const colors: number[] = [];
    const normal = new THREE.Vector3();
    for (let i = 0; i < positions.count; i++) {
      const px = positions.getX(i), py = positions.getY(i), pz = positions.getZ(i);
      const relief = rockRelief(px, py, pz);
      positions.setXYZ(i, px * relief, py * relief * flatten, pz * relief * 0.85);
      // IcosahedronGeometry is non-indexed. computeVertexNormals() would make
      // separate flat faces; the ellipsoid gradient keeps shared corners smooth.
      normal.set(px, py / flatten, pz / 0.85).normalize();
      normals.setXYZ(i, normal.x, normal.y, normal.z);
      const mineral = 0.035 * Math.sin(px * 17.3 + pz * 12.7) * Math.sin(py * 11.1 - pz * 3.9);
      const color = grey.clone().lerp(damp, THREE.MathUtils.smoothstep(-py, -0.25, 0.65) * 0.58);
      color.lerp(mossGreen, mossAmount(px, py, pz) * 0.77);
      color.multiplyScalar(0.97 + mineral);
      colors.push(color.r, color.g, color.b);
    }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const angle = random() * TAU;
    const rotation = new THREE.Quaternion().setFromAxisAngle(UP, angle);
    const center = new THREE.Vector3(x, groundHeight(x, z) + size * 0.12, z);
    geometry.scale(size, size, size); geometry.applyQuaternion(rotation); geometry.translate(center.x, center.y, center.z);
    parts.push(geometry);

    if (large) {
      // Sparse tiny blades sit on the moss patches rather than obscuring the stone.
      for (let i = 0; i < 110; i++) {
        const px = (random() - 0.5) * 1.56, pz = (random() - 0.5) * 1.56;
        const radial = px * px + pz * pz;
        if (radial > 0.9) continue;
        const py = Math.sqrt(1 - radial);
        if (mossAmount(px, py, pz) < 0.42) continue;
        const relief = rockRelief(px, py, pz);
        const localNormal = new THREE.Vector3(px, py / flatten, pz / 0.85).normalize();
        const point = new THREE.Vector3(px * relief * size, py * relief * flatten * size, pz * relief * 0.85 * size);
        point.addScaledVector(localNormal, -0.008).applyQuaternion(rotation).add(center);
        const orientation = new THREE.Quaternion().setFromUnitVectors(UP, localNormal).premultiply(rotation);
        const height = 0.009 + random() * 0.018;
        const width = 0.018 + random() * 0.022;
        const matrix = new THREE.Matrix4().compose(point, orientation, new THREE.Vector3(width, height, width));
        const color = new THREE.Color().setHSL(0.205 + random() * 0.035, 0.28 + random() * 0.12, 0.26 + random() * 0.1);
        tufts.push({ matrix, color });
      }
    }
  };

  [
    [-2.45, 1.8, 0.73], [2.6, 1.0, 0.77], [-2.25, -2.1, 0.56], [1.8, -3.45, 0.69],
    [-0.72, 2.91, 0.33], [0.58, 3.07, 0.38], [-3.1, -4.9, 0.8], [3.4, -6.1, 1.1],
  ].forEach(([x, z, size]) => add(x, z, size));
  for (let i = 0; i < 76; i++) {
    const angle = random() * TAU, radius = 0.9 + random() * 0.32;
    add(Math.cos(angle) * 2.55 * radius - 0.18, Math.sin(angle) * 3.45 * radius - 0.55, 0.08 + random() * 0.22);
  }
  for (let i = 0; i < 70; i++) {
    const x = (random() - 0.5) * 4, z = (random() - 0.5) * 5 - 0.5;
    add(x, z, 0.035 + random() * 0.09, 0.6);
  }

  const material = base.clone();
  material.name = 'forest-smooth-wet-stone';
  material.color.set('white'); material.vertexColors = true;
  material.roughness = 0.48; material.bumpScale = 0.015;
  const stoneGeometry = mergeGeometries(parts)!;
  parts.forEach(part => part.dispose());
  const stones = new THREE.Mesh(stoneGeometry, material); stones.name = 'forest-stone-surfaces';
  stones.castShadow = true; stones.receiveShadow = true; group.add(stones);

  const mossMaterial = new THREE.MeshStandardMaterial({ color: '#b7c88a', roughness: 0.97, side: THREE.DoubleSide });
  const moss = new THREE.InstancedMesh(mossTuftGeometry(), mossMaterial, tufts.length); moss.name = 'forest-stone-moss';
  tufts.forEach(({ matrix, color }, i) => { moss.setMatrixAt(i, matrix); moss.setColorAt(i, color); });
  moss.instanceMatrix.needsUpdate = true; moss.castShadow = true; moss.receiveShadow = true; moss.computeBoundingSphere();
  group.add(moss);
  return group;
}
