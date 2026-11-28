import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { fbm3, noise3, ridged3 } from '../shared/render/noise';

/*
 * Code-only geometry for the cozy interiors: dressed stones with chipped,
 * rounded arrises; soft upholstery; cloth with real thickness; and a static
 * batcher that merges everything that never moves into few draw calls.
 */

/**
 * A dressed stone block of exact extents (w, h, d) centred on the origin:
 * rounded arrises, a slightly pillowed face, chisel relief and chipped edges.
 * `rough` 0 gives sawn ashlar, 1 gives rough rubble. `step` is the vertex
 * spacing: keep it small for stone, larger for smooth joinery.
 */
export function stoneBlock(w: number, h: number, d: number, seed: number, rough = 0.5, bevel = 0.025, outline = 0, step = 0.035) {
  const base = new THREE.BoxGeometry(w, h, d, Math.max(2, Math.ceil(w / step)), Math.max(2, Math.ceil(h / step)), Math.max(2, Math.ceil(d / step)));
  base.deleteAttribute('normal'); base.deleteAttribute('uv');
  const geometry = mergeVertices(base); base.dispose();
  const p = geometry.attributes.position as THREE.BufferAttribute;
  const ex = w / 2, ey = h / 2, ez = d / 2;
  const r = Math.min(bevel * (0.7 + rough * 0.8), ex * 0.45, ey * 0.45, ez * 0.45);
  const v = new THREE.Vector3(), inner = new THREE.Vector3(), n = new THREE.Vector3();
  const s = seed * 7.13;
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    inner.set(THREE.MathUtils.clamp(v.x, -ex + r, ex - r), THREE.MathUtils.clamp(v.y, -ey + r, ey - r), THREE.MathUtils.clamp(v.z, -ez + r, ez - r));
    n.subVectors(v, inner);
    const len = n.length();
    if (len > 1e-6) n.divideScalar(len); else n.set(0, 0, 1);
    v.copy(inner).addScaledVector(n, r);
    // Edge proximity: 1 on the arrises, 0 in the middle of faces.
    const edge = Math.max(
      Math.min(Math.abs(v.x) / ex, Math.abs(v.y) / ey) ** 6,
      Math.min(Math.abs(v.y) / ey, Math.abs(v.z) / ez) ** 6,
      Math.min(Math.abs(v.x) / ex, Math.abs(v.z) / ez) ** 6,
    );
    const pillow = (1 - (v.x / ex) ** 2) * (1 - (v.y / ey) ** 2) * 0.006 * (0.5 + rough);
    // Broad facets plus finer pitting: split stone, not moulded clay.
    const chisel = fbm3(v.x * 7 + s, v.y * 7, v.z * 7 - s, 3) * (0.004 + rough * 0.009)
      + (ridged3(v.x * 3.1 - s, v.y * 3.1, v.z * 3.1 + s, 2) - 0.5) * rough * 0.012;
    const chips = Math.max(0, ridged3(v.x * 5 + s, v.y * 5 - s, v.z * 5, 3) - 0.42) * edge * (0.02 + rough * 0.045);
    v.addScaledVector(n, pillow + chisel - chips);
    if (outline > 0) {
      // Irregular outline: the face edges wander, as with split field stone.
      const a = outline * Math.min(ex, ey);
      v.x += noise3(v.y * 2.6 + s, v.z * 1.3, s * 0.37) * a * (v.x / ex) * 1.4;
      v.y += noise3(v.x * 2.6 - s, v.z * 1.3 + 3.1, s * 0.71) * a * (v.y / ey) * 1.2;
    }
    p.setXYZ(i, v.x, v.y, v.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Superellipsoid upholstery: boxy with soft rounded edges and gently domed
 * faces, like a stuffed cushion or arm. `round` near 0.2 is tailored, 0.5 soft.
 */
export function cushion(w: number, h: number, d: number, round = 0.3, segments = 32, seed = 0) {
  const geometry = new THREE.SphereGeometry(1, segments, Math.round(segments * 0.75));
  const p = geometry.attributes.position as THREE.BufferAttribute;
  const shape = (c: number) => Math.sign(c) * Math.abs(c) ** round;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    // Slight sag and lumps keep upholstery from looking machined.
    const lump = 1 + noise3(x * 1.7 + seed, y * 1.7, z * 1.7) * 0.025;
    p.setXYZ(i, shape(x) * w / 2 * lump, shape(y) * h / 2 * lump, shape(z) * d / 2 * lump);
  }
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * A cloth sheet with thickness: `surface(u, v)` gives the top surface for
 * u, v in [0, 1]; the underside follows it at `thickness` and the hem is
 * closed, so edges read as fabric rather than paper. UVs are in metres-ish
 * units given by `uvScale` so the weave density is consistent.
 */
export function clothSheet(cols: number, rows: number, surface: (u: number, v: number, target: THREE.Vector3) => void, thickness: number, uvScale: [number, number] = [1, 1]) {
  const top = new THREE.PlaneGeometry(1, 1, cols, rows);
  const p = top.attributes.position as THREE.BufferAttribute;
  const uv = top.attributes.uv as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    const u = uv.getX(i), w = uv.getY(i);
    surface(u, w, v);
    p.setXYZ(i, v.x, v.y, v.z);
    uv.setXY(i, u * uvScale[0], w * uvScale[1]);
  }
  top.computeVertexNormals();
  // Underside: offset along the top normal, reversed winding.
  const bottom = top.clone();
  const bp = bottom.attributes.position as THREE.BufferAttribute, normal = top.attributes.normal as THREE.BufferAttribute;
  for (let i = 0; i < bp.count; i++) bp.setXYZ(i, bp.getX(i) - normal.getX(i) * thickness, bp.getY(i) - normal.getY(i) * thickness, bp.getZ(i) - normal.getZ(i) * thickness);
  const index = bottom.index!;
  for (let i = 0; i < index.count; i += 3) { const a = index.getX(i + 1); index.setX(i + 1, index.getX(i + 2)); index.setX(i + 2, a); }
  bottom.computeVertexNormals();
  // Hem strips around the boundary.
  const hemPositions: number[] = [], hemUvs: number[] = [], hemIndex: number[] = [];
  const stride = cols + 1;
  const boundary: number[] = [];
  for (let x = 0; x <= cols; x++) boundary.push(x);
  for (let y = 1; y <= rows; y++) boundary.push(y * stride + cols);
  for (let x = cols - 1; x >= 0; x--) boundary.push(rows * stride + x);
  for (let y = rows - 1; y >= 1; y--) boundary.push(y * stride);
  boundary.push(0);
  boundary.forEach((vertex, k) => {
    hemPositions.push(p.getX(vertex), p.getY(vertex), p.getZ(vertex), bp.getX(vertex), bp.getY(vertex), bp.getZ(vertex));
    hemUvs.push(uv.getX(vertex), uv.getY(vertex), uv.getX(vertex), uv.getY(vertex) + thickness * uvScale[1]);
    if (k < boundary.length - 1) { const a = k * 2; hemIndex.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
  });
  const hem = new THREE.BufferGeometry();
  hem.setAttribute('position', new THREE.Float32BufferAttribute(hemPositions, 3));
  hem.setAttribute('uv', new THREE.Float32BufferAttribute(hemUvs, 2));
  hem.setIndex(hemIndex); hem.computeVertexNormals();
  const merged = mergeGeometries([top, bottom, hem], false)!;
  top.dispose(); bottom.dispose(); hem.dispose();
  return merged;
}

/** Tube along points with a tapering radius; used for rolled arms, piping and twigs. */
export function taperedTube(points: THREE.Vector3[], radius: (t: number) => number, tubular = 32, radial = 10) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, tubular, 1, radial, false);
  const p = geometry.attributes.position as THREE.BufferAttribute;
  for (let j = 0; j <= tubular; j++) {
    const centre = curve.getPointAt(j / tubular), r = radius(j / tubular);
    for (let i = 0; i <= radial; i++) {
      const index = j * (radial + 1) + i;
      const x = p.getX(index) - centre.x, y = p.getY(index) - centre.y, z = p.getZ(index) - centre.z;
      p.setXYZ(index, centre.x + x * r, centre.y + y * r, centre.z + z * r);
    }
  }
  geometry.computeVertexNormals();
  return geometry;
}

/** Records the current (object-space) position and normal as `surfaceLocal*` attributes before transforms are baked. */
export function withLocalFrame(geometry: THREE.BufferGeometry) {
  if (!geometry.getAttribute('normal')) geometry.computeVertexNormals();
  geometry.setAttribute('surfaceLocal', geometry.getAttribute('position').clone());
  geometry.setAttribute('surfaceLocalNormal', geometry.getAttribute('normal').clone());
  return geometry;
}

/** Bakes a mesh's transform into a copy of its geometry (non-indexed, uv-safe) for merging. */
export function bakedGeometry(geometry: THREE.BufferGeometry, matrix: THREE.Matrix4) {
  const copy = geometry.index ? geometry.toNonIndexed() : geometry.clone();
  copy.applyMatrix4(matrix);
  return copy;
}

/**
 * Merges static meshes sharing a material into one mesh each. Skips moving or
 * interactive objects (userData.dynamic / cozyAction anywhere up the chain),
 * shader materials and multi-material meshes. Attributes are reduced to the
 * set common to the batch so mixed primitive types still merge.
 */
export function batchStatic(root: THREE.Object3D, minimum = 2) {
  root.updateMatrixWorld(true);
  const batches = new Map<string, THREE.Mesh[]>();
  root.traverse(object => {
    if (!(object instanceof THREE.Mesh) || object instanceof THREE.InstancedMesh || Array.isArray(object.material) || object.children.length || object.material instanceof THREE.ShaderMaterial) return;
    let parent: THREE.Object3D | null = object;
    while (parent) { if (parent.userData.cozyAction || parent.userData.dynamic) return; parent = parent.parent; }
    // Only identical attribute layouts merge, so no mesh loses its uv or local frame.
    const layout = Object.keys(object.geometry.attributes).sort().join(',');
    const key = `${object.material.uuid}:${object.castShadow}:${object.receiveShadow}:${object.renderOrder}:${layout}`;
    const list = batches.get(key) ?? []; list.push(object); batches.set(key, list);
  });
  const inverse = new THREE.Matrix4().copy(root.matrixWorld).invert();
  batches.forEach(objects => {
    if (objects.length < minimum) return;
    const names = Object.keys(objects[0].geometry.attributes).filter(name => objects.every(o => o.geometry.getAttribute(name)));
    const geometries = objects.map(object => {
      const g = bakedGeometry(object.geometry, new THREE.Matrix4().multiplyMatrices(inverse, object.matrixWorld));
      for (const name of Object.keys(g.attributes)) if (!names.includes(name)) g.deleteAttribute(name);
      g.morphAttributes = {};
      return g;
    });
    const geometry = mergeGeometries(geometries, false);
    geometries.forEach(g => g.dispose());
    if (!geometry) return;
    const combined = new THREE.Mesh(geometry, objects[0].material);
    combined.castShadow = objects[0].castShadow; combined.receiveShadow = objects[0].receiveShadow; combined.renderOrder = objects[0].renderOrder;
    objects.forEach(object => { object.removeFromParent(); object.geometry.dispose(); });
    root.add(combined);
  });
}
