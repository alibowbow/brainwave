import * as THREE from 'three';
import { seeded } from '../../shared/render/noise';
import { applyFoliageShading, type FoliageWind } from '../../shared/render/foliageShading';

/*
 * Rain-soaked foliage for the shelters' gardens and fields, built on the shared
 * tree and foliage modules: leaf-cluster cards cut from code-drawn atlases, a
 * water film (clearcoat) that mirrors the overcast in the radiance probe, slow
 * coherent sway, and dense clipped shrubs made of the same cards on an
 * ellipsoid. Original implementation.
 */

export interface WetLeafOptions {
  key: string;
  map: THREE.Texture;
  wind: FoliageWind | null;
  /** Light passing through thin leaves toward the bright sky. */
  translucency?: { tint: THREE.ColorRepresentation; back: number; forward: number };
  /** Roughness of the leaf surface under its water film. */
  roughness?: number;
  /** Strength of the water film (clearcoat). */
  film?: number;
}

/** Cut-out leaf cards with a glossy water film. */
export function wetLeafMaterial(options: WetLeafOptions) {
  const material = new THREE.MeshPhysicalMaterial({
    map: options.map, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, alphaToCoverage: true,
    roughness: options.roughness ?? 0.42, clearcoat: options.film ?? 0.55, clearcoatRoughness: 0.14,
  });
  return applyFoliageShading(material, {
    key: options.key, wind: options.wind, sharedNormals: true, coverage: true,
    translucency: options.translucency ?? { tint: '#cfe89a', back: 0.3, forward: 0.4 },
  });
}

/**
 * A clipped shrub (azalea, box): leaf cards facing out of an ellipsoid, with
 * normals from the ellipsoid so the mound shades as one soft volume, darker in
 * its core and underside. Same attributes as treeGeometry leaves (`aWind`,
 * `aWindPhase`), so one material serves trees and shrubs.
 */
export function shrubGeometry(seed: number, centre: THREE.Vector3, radii: THREE.Vector3, cards: number, size: number, columns = 2) {
  const random = seeded(seed * 4099 + 7);
  const range = (a: number, b: number) => a + random() * (b - a);
  const positions: number[] = [], normals: number[] = [], uvs: number[] = [], colors: number[] = [], wind: number[] = [], phases: number[] = [], indices: number[] = [];
  const phase = random() * Math.PI * 2;
  const n = new THREE.Vector3(), p = new THREE.Vector3(), up = new THREE.Vector3(), right = new THREE.Vector3(), corner = new THREE.Vector3(), normal = new THREE.Vector3();
  for (let c = 0; c < cards; c++) {
    // Cards cover the upper shell more than the shaded underside.
    n.set(range(-1, 1), Math.pow(random(), 0.7) * 1.15 - 0.2, range(-1, 1)).normalize();
    const depth = Math.pow(random(), 0.45);
    p.set(n.x * radii.x, n.y * radii.y, n.z * radii.z).multiplyScalar(0.55 + 0.45 * depth).add(centre);
    up.copy(n).multiplyScalar(0.6).add(new THREE.Vector3(range(-0.5, 0.5), 0.5, range(-0.5, 0.5))).normalize();
    right.crossVectors(up, n).normalize();
    if (right.lengthSq() < 1e-4) right.set(1, 0, 0);
    const face = new THREE.Vector3().crossVectors(right, up).normalize();
    const s = size * range(0.7, 1.25);
    const tint = range(0.85, 1.12);
    const column = Math.floor(random() * columns);
    const base = positions.length / 3;
    for (let row = 0; row <= 1; row++) for (let col = 0; col <= 1; col++) {
      const u = col, w = row;
      corner.copy(p).addScaledVector(right, (u - 0.5) * s).addScaledVector(up, (w - 0.15) * s).addScaledVector(face, -w * s * 0.1);
      positions.push(corner.x, corner.y, corner.z);
      normal.copy(corner).sub(centre).divide(radii).normalize();
      normals.push(normal.x, normal.y, normal.z);
      uvs.push((column + u) / columns, w);
      const radial = Math.min(1.2, corner.clone().sub(centre).divide(radii).length());
      const ao = THREE.MathUtils.lerp(0.32, 1, THREE.MathUtils.smoothstep(radial, 0.35, 1)) * (0.7 + 0.3 * THREE.MathUtils.clamp(normal.y * 0.5 + 0.5, 0, 1)) * tint;
      colors.push(ao, ao, ao);
      const height = Math.max(0, corner.y - (centre.y - radii.y)) / (2 * radii.y);
      wind.push(0.15 * height * height, 0.15 * height, 0.3 + 0.7 * w);
      phases.push(phase, phase + c * 0.37);
    }
    indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute('aWind', new THREE.Float32BufferAttribute(wind, 3));
  geometry.setAttribute('aWindPhase', new THREE.Float32BufferAttribute(phases, 2));
  geometry.setIndex(indices);
  return geometry;
}

export interface SprayCard {
  /** Where the spray leaves its branch. */
  base: THREE.Vector3;
  /** Direction the spray grows (it droops further under its own weight). */
  along: THREE.Vector3;
  length: number;
  width: number;
  /** Downward bend at the tip, metres. */
  droop: number;
  /** Baked occlusion (0 dark core .. 1 open). */
  shade: number;
  /** Sway weight at the tip and phase. */
  sway: number;
  phase: number;
}

/**
 * Hanging sprays (cedar, hemlock) as bent cut-out cards: a tall atlas laid along
 * the spray, arching down toward its tip, with the treeGeometry leaf attributes.
 */
export function sprayGeometry(cards: SprayCard[]) {
  const positions: number[] = [], normals: number[] = [], uvs: number[] = [], colors: number[] = [], wind: number[] = [], phases: number[] = [], indices: number[] = [];
  const side = new THREE.Vector3(), normal = new THREE.Vector3(), point = new THREE.Vector3(), down = new THREE.Vector3(0, -1, 0);
  const ROWS = 3;
  for (const card of cards) {
    const along = card.along.clone().normalize();
    side.crossVectors(along, down);
    if (side.lengthSq() < 1e-4) side.set(1, 0, 0);
    side.normalize();
    // Sprays hang flattish, facing up and a little outward.
    normal.crossVectors(side, along).normalize();
    if (normal.y < 0) normal.negate();
    const base = positions.length / 3;
    for (let row = 0; row <= ROWS; row++) {
      const t = row / ROWS;
      for (let col = 0; col <= 1; col++) {
        const u = col - 0.5;
        point.copy(card.base).addScaledVector(along, t * card.length).addScaledVector(side, u * card.width * (0.55 + 0.45 * Math.sin(Math.PI * Math.min(1, t + 0.15))));
        point.y -= card.droop * t * t;
        point.addScaledVector(normal, -Math.abs(u) * card.width * 0.25);
        positions.push(point.x, point.y, point.z);
        normals.push(normal.x, normal.y, normal.z);
        uvs.push(col, t);
        const ao = card.shade * (0.75 + 0.25 * t);
        colors.push(ao, ao, ao);
        wind.push(0.02 * t, card.sway * t * t, 0.3 + 0.7 * t);
        phases.push(card.phase, card.phase * 1.7 + row);
      }
    }
    for (let row = 0; row < ROWS; row++) {
      const a = base + row * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute('aWind', new THREE.Float32BufferAttribute(wind, 3));
  geometry.setAttribute('aWindPhase', new THREE.Float32BufferAttribute(phases, 2));
  geometry.setIndex(indices);
  return geometry;
}

/**
 * A tuft of arching, folded blades (mondo grass, sedge) in unit height: blades
 * lean out and fall back over, darker at the base. Template for instancing.
 */
export function tuftGeometry(seed: number, blades = 10, rows = 4, arch = 0.6) {
  const random = seeded(seed * 613 + 5);
  const positions: number[] = [], colors: number[] = [], indices: number[] = [];
  for (let b = 0; b < blades; b++) {
    const dir = b / blades * Math.PI * 2 + random() * 0.6;
    const lean = 0.2 + random() * arch, h = 0.55 + random() * 0.45, w = 0.025 + random() * 0.02;
    const start = positions.length / 3;
    for (let j = 0; j <= rows; j++) {
      const t = j / rows;
      // Rises, then arches over and droops at the tip.
      const out = lean * t * t * 1.4, y = h * (t - lean * 0.55 * t * t * t);
      const cx = Math.cos(dir) * out, cz = Math.sin(dir) * out;
      const ww = w * (1 - t * 0.85);
      const fold = ww * 0.45 * Math.sin(Math.PI * t);
      positions.push(cx - Math.sin(dir) * ww, y, cz + Math.cos(dir) * ww, cx + Math.cos(dir) * fold, y + fold, cz + Math.sin(dir) * fold, cx + Math.sin(dir) * ww, y, cz - Math.cos(dir) * ww);
      const shade = 0.35 + 0.65 * Math.pow(t, 0.7);
      colors.push(shade * 0.9, shade * 0.9, shade * 0.9, shade, shade, shade, shade * 0.9, shade * 0.9, shade * 0.9);
      if (j < rows) {
        const k = start + j * 3;
        indices.push(k, k + 1, k + 3, k + 1, k + 4, k + 3, k + 1, k + 2, k + 4, k + 2, k + 5, k + 4);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** Recolours a leaf geometry's baked occlusion by a tint (per tree or shrub variety). */
export function tintLeaves(geometry: THREE.BufferGeometry, tint: THREE.Color) {
  const color = geometry.getAttribute('color') as THREE.BufferAttribute | undefined;
  if (!color) return geometry;
  for (let i = 0; i < color.count; i++) color.setXYZ(i, color.getX(i) * tint.r, color.getY(i) * tint.g, color.getZ(i) * tint.b);
  return geometry;
}
