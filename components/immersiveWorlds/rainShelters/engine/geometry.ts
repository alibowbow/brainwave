import * as THREE from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { fbm3, noise3, ridged3, seeded } from '../../shared/render/noise';

/* Procedural organic geometry shared by the rain shelters: no primitives left bare. */

/** Faceted, eroded stone normalised to a unit box (scale gives exact extents). */
export function boulderGeometry(seed: number, detail = 6, flatBase = -0.3) {
  const random = seeded(seed * 7919 + 13);
  const base = new THREE.IcosahedronGeometry(1, detail);
  base.deleteAttribute('normal'); base.deleteAttribute('uv');
  const geometry = mergeVertices(base); base.dispose();
  const planes = Array.from({ length: 7 }, () => ({
    n: new THREE.Vector3(random() * 2 - 1, (random() * 2 - 1) * 0.7, random() * 2 - 1).normalize(),
    c: 0.66 + random() * 0.28,
  }));
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const p = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    p.fromBufferAttribute(position, i).normalize();
    let r = 1;
    for (const { n, c } of planes) { const d = p.dot(n); if (d > 1e-3) r = Math.min(r, c / d); }
    r = THREE.MathUtils.lerp(r, 0.84, 0.25);
    r *= 1 + fbm3(p.x * 1.6 + seed, p.y * 1.6, p.z * 1.6, 4) * 0.14 + (ridged3(p.x * 3.2, p.y * 3.2 + seed, p.z * 3.2, 3) - 0.35) * 0.06;
    p.multiplyScalar(r);
    if (p.y < flatBase) p.y = THREE.MathUtils.lerp(p.y, flatBase, 0.8);
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

/**
 * A tree trunk lofted along a gently bending axis: buttressed root flare at
 * the foot, bark ridges, taper. World-space output for merging.
 */
export function trunkGeometry(base: THREE.Vector3, height: number, radius: number, seed: number, options: { lean?: THREE.Vector2; sides?: number; rings?: number; top?: number } = {}) {
  const sides = options.sides ?? 18, rings = options.rings ?? Math.max(10, Math.round(height * 2.2));
  const lean = options.lean ?? new THREE.Vector2(0, 0);
  const topRadius = options.top ?? 0.35;
  const positions: number[] = [], indices: number[] = [];
  const lobes = 4 + (seed % 3);
  for (let j = 0; j <= rings; j++) {
    const t = j / rings;
    const y = -0.25 + t * (height + 0.25);
    const bend = new THREE.Vector2(lean.x * t * t + 0.12 * Math.sin(t * 3.1 + seed), lean.y * t * t + 0.1 * Math.cos(t * 2.7 + seed * 1.3));
    const flare = 1 + 1.1 * Math.exp(-Math.max(0, y) * 2.6);
    for (let i = 0; i <= sides; i++) {
      const a = i / sides * Math.PI * 2;
      const buttress = 1 + 0.45 * Math.exp(-Math.max(0, y) * 2.2) * Math.pow(Math.max(0, Math.cos(a * lobes + seed)), 3);
      const ridge = 1 + 0.035 * noise3(Math.cos(a) * 3 + seed, y * 0.9, Math.sin(a) * 3) + 0.02 * Math.sin(a * 11 + y * 2 + seed);
      const r = radius * THREE.MathUtils.lerp(1, topRadius, Math.pow(t, 1.15)) * flare * buttress * ridge;
      positions.push(base.x + bend.x + Math.cos(a) * r, base.y + y, base.z + bend.y + Math.sin(a) * r);
      if (j < rings && i < sides) {
        const n = j * (sides + 1) + i;
        indices.push(n, n + sides + 1, n + 1, n + 1, n + sides + 1, n + sides + 2);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** A tapering branch or stem along a curve, world space. */
export function limbGeometry(points: THREE.Vector3[], radius: number, endRadius: number, radial = 6, segments = 10) {
  const curve = new THREE.CatmullRomCurve3(points);
  const frames = curve.computeFrenetFrames(segments, false);
  const positions: number[] = [], indices: number[] = [];
  for (let j = 0; j <= segments; j++) {
    const t = j / segments, c = curve.getPointAt(t);
    const r = THREE.MathUtils.lerp(radius, endRadius, t);
    const n = frames.normals[j], b = frames.binormals[j];
    for (let i = 0; i <= radial; i++) {
      const a = i / radial * Math.PI * 2;
      positions.push(c.x + (n.x * Math.cos(a) + b.x * Math.sin(a)) * r, c.y + (n.y * Math.cos(a) + b.y * Math.sin(a)) * r, c.z + (n.z * Math.cos(a) + b.z * Math.sin(a)) * r);
      if (j < segments && i < radial) {
        const k = j * (radial + 1) + i;
        indices.push(k, k + radial + 1, k + 1, k + 1, k + radial + 1, k + radial + 2);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** Leaflet: a cupped, pointed blade with a midrib crease (unit length along +y). */
export function leafletGeometry(rows = 8, width = 0.32, cup = 0.08) {
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  for (let j = 0; j <= rows; j++) {
    const t = j / rows;
    const w = Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.08)), 0.8) * width * (1 - 0.25 * t);
    for (let i = 0; i <= 2; i++) {
      const q = i - 1;
      positions.push(q * w, t, (q === 0 ? 0.02 : cup) * Math.sin(Math.PI * t) - 0.06 * t * t);
      uvs.push(i / 2, t);
    }
  }
  for (let j = 0; j < rows; j++) for (let i = 0; i < 2; i++) {
    const a = j * 3 + i, b = a + 3;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** Matrices for fern fronds: arching rachis with paired pinnae that shrink to the tip. */
export function fernFronds(centre: THREE.Vector3, size: number, fronds: number, random: () => number, stems: THREE.BufferGeometry[], leaves: THREE.Matrix4[]) {
  const dummy = new THREE.Object3D();
  for (let k = 0; k < fronds; k++) {
    const a = k / fronds * Math.PI * 2 + random() * 0.5;
    const length = size * (0.7 + random() * 0.45);
    const rise = 0.55 + random() * 0.25;
    const point = (v: number) => new THREE.Vector3(
      centre.x + Math.cos(a) * length * v,
      centre.y + Math.sin(v * Math.PI * 0.78) * length * rise - v * v * length * 0.2,
      centre.z + Math.sin(a) * length * v,
    );
    const pts = Array.from({ length: 6 }, (_, i) => point(i / 5));
    stems.push(limbGeometry(pts, 0.006 * size + 0.003, 0.0015, 3, 8));
    const pairs = 14;
    for (let j = 1; j < pairs; j++) {
      const v = j / pairs, p = point(v), q = point(Math.min(1, v + 0.02));
      const tangent = q.clone().sub(p).normalize();
      const leafLength = length * 0.3 * Math.sin(Math.PI * Math.min(1, v * 1.05 + 0.08)) + 0.02;
      for (const side of [-1, 1]) {
        const out = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(side);
        out.addScaledVector(tangent, 0.35).add(new THREE.Vector3(0, -0.12 - v * 0.2, 0)).normalize();
        dummy.position.copy(p);
        dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), out);
        dummy.rotateY((random() - 0.5) * 0.4);
        dummy.scale.set(leafLength * 0.75, leafLength, leafLength);
        dummy.updateMatrix();
        leaves.push(dummy.matrix.clone());
      }
    }
  }
}
