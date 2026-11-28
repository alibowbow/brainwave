import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { patchSurface } from '../shared/render/interiorSurface';
import { noise3, seeded } from '../shared/render/noise';

/*
 * Code-only houseplants for the cozy rooms. Leaves are bent grids, not cards:
 * a curved midrib, a V-fold across it, a wavy margin and a uv in leaf space
 * (u along the midrib, v across) that the leaf shader uses to draw the midrib
 * and lateral veins. Each leaf carries its own tint in vertex colours.
 * Original procedural work.
 */

export interface LeafShape {
  length: number;
  width: number;
  /** Half-width profile along the midrib (u in 0..1, returns 0..1). */
  outline: (u: number) => number;
  /** Fold depth across the midrib, as a fraction of the half-width. */
  fold?: number;
  /** Arch of the midrib (metres of sag at the tip, + droops). */
  droop?: number;
  /** Margin waviness (metres). */
  ripple?: number;
}

/** A leaf grid from its base at the origin pointing along +y, facing +z. */
export function leafGeometry(shape: LeafShape, seed: number, cols = 6, rows = 10) {
  const g = new THREE.PlaneGeometry(1, 1, cols, rows);
  const p = g.attributes.position, uv = g.attributes.uv as THREE.BufferAttribute;
  const fold = shape.fold ?? 0.25, droop = shape.droop ?? 0.1, ripple = shape.ripple ?? 0.006;
  for (let i = 0; i < p.count; i++) {
    const v = uv.getX(i) * 2 - 1, u = uv.getY(i);
    const half = shape.width / 2 * shape.outline(u);
    const across = v * half;
    // The midrib arches up then droops toward the tip.
    const y = u * shape.length * (1 - 0.15 * u * droop / Math.max(shape.length, 0.01));
    const z = Math.sin(u * Math.PI * 0.6) * shape.length * 0.08 - u * u * droop + Math.abs(v) * half * fold
      + Math.sin(u * 13 + seed + v * 2) * ripple * Math.abs(v) + noise3(u * 4, v * 2, seed) * ripple * 0.6;
    p.setXYZ(i, across, y, z);
    uv.setXY(i, u, v);
  }
  g.computeVertexNormals();
  return g;
}

/** Dark glossy leaves with a pale midrib and lateral veins drawn from the leaf uv. */
export function createLeafMaterial(key: string, color: THREE.ColorRepresentation, options: { veins?: number; gloss?: number } = {}) {
  const material = new THREE.MeshPhysicalMaterial({ color, roughness: 0.42, metalness: 0, clearcoat: options.gloss ?? 0.5, clearcoatRoughness: 0.3, side: THREE.DoubleSide, vertexColors: true, sheen: 0.3, sheenColor: '#9fb38a' });
  return patchSurface(material, {
    key: `leaf|${key}`,
    color: `
vec2 lfUv = vSurfaceUv;
float lfRib = 1.0 - smoothstep(0.015, 0.04, abs(lfUv.y));
float lfLat = abs(fract(lfUv.x * ${(options.veins ?? 9).toFixed(1)} - abs(lfUv.y) * 1.4) - 0.5);
float lfVein = (1.0 - smoothstep(0.03, 0.09, lfLat)) * smoothstep(0.06, 0.2, abs(lfUv.y)) * (1.0 - smoothstep(0.75, 1.0, abs(lfUv.y)));
float lfMottle = bwFbm3(vec3(lfUv * vec2(6.0, 4.0), vSurfaceWorld.x * 3.0));
vec3 lfColor = diffuseColor.rgb * (0.85 + 0.25 * lfMottle);
lfColor = mix(lfColor, lfColor * vec3(1.6, 1.5, 1.1), lfRib * 0.7 + lfVein * 0.25);
// Edges a little browner and thinner.
lfColor *= mix(1.0, 0.85, smoothstep(0.8, 1.0, abs(lfUv.y)));
diffuseColor.rgb = lfColor;`,
    height: '(lfRib * -0.0008 - lfVein * 0.0004)',
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.2 * lfRib, 0.2, 1.0);',
  });
}

const paint = (g: THREE.BufferGeometry, c: THREE.Color) => {
  const colors = new Float32Array(g.attributes.position.count * 3);
  for (let i = 0; i < colors.length; i += 3) colors.set([c.r, c.g, c.b], i);
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return g;
};

/** A fiddle-leaf fig: a few woody stems with large violin-shaped leaves, base at the origin. */
export function fiddleLeafFig(seed: number, height = 1.6) {
  const random = seeded(seed);
  const stems: THREE.BufferGeometry[] = [], leaves: THREE.BufferGeometry[] = [];
  const outline = (u: number) => Math.pow(Math.sin(Math.PI * Math.pow(u, 0.62)), 0.75) * (0.8 + 0.25 * u) * (1 - 0.12 * Math.exp(-Math.pow((u - 0.42) / 0.12, 2)));
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  const trunks = 3;
  for (let k = 0; k < trunks; k++) {
    const lean = new THREE.Vector3((random() - 0.5) * 0.35, 1, (random() - 0.5) * 0.35).normalize();
    const h = height * (0.65 + random() * 0.35);
    const base = new THREE.Vector3((random() - 0.5) * 0.08, 0, (random() - 0.5) * 0.08);
    const pts = [base, base.clone().addScaledVector(lean, h * 0.4).add(new THREE.Vector3((random() - 0.5) * 0.08, 0, (random() - 0.5) * 0.08)), base.clone().addScaledVector(lean, h)];
    const curve = new THREE.CatmullRomCurve3(pts);
    const stem = new THREE.TubeGeometry(curve, 16, 0.014 - k * 0.002, 6, false);
    stems.push(stem);
    // Leaves spiral up the upper two thirds, largest in the middle.
    const count = 10 + Math.floor(random() * 5);
    for (let i = 0; i < count; i++) {
      const t = 0.3 + 0.7 * (i / count) + random() * 0.03;
      const at = curve.getPointAt(Math.min(1, t));
      const size = (0.22 + 0.12 * Math.sin(t * Math.PI)) * (0.85 + random() * 0.3);
      const leaf = leafGeometry({ length: size, width: size * 0.78, outline, fold: 0.22, droop: size * 0.25, ripple: 0.008 }, seed + k * 31 + i, 6, 10);
      const yaw = i * 2.4 + k * 1.3 + random() * 0.4;
      const tilt = 0.35 + random() * 0.6 - t * 0.25;
      leaf.applyMatrix4(m.compose(at, q.setFromEuler(e.set(-tilt, yaw, 0, 'YXZ')), new THREE.Vector3(1, 1, 1)));
      const shade = 0.75 + random() * 0.35;
      leaves.push(paint(leaf, new THREE.Color(shade, shade * (0.95 + random() * 0.1), shade * 0.9)));
    }
  }
  const leafGeometryMerged = mergeGeometries(leaves, false)!;
  leaves.forEach(g => g.dispose());
  const stemGeometry = mergeGeometries(stems.map(g => { g.deleteAttribute('uv'); return g; }), false)!;
  stems.forEach(g => g.dispose());
  return { leaves: leafGeometryMerged, stems: stemGeometry };
}

/** A trailing pothos for a shelf or mantel: heart-shaped leaves on vines that spill over the edge (edge along +z at y = 0). */
export function trailingPlant(seed: number, vines = 6, length = 0.6, leafScale = 1) {
  const random = seeded(seed);
  const outline = (u: number) => Math.pow(Math.sin(Math.PI * Math.pow(u, 0.5)), 0.9) * (1.1 - 0.5 * u);
  const leaves: THREE.BufferGeometry[] = [], stems: THREE.BufferGeometry[] = [];
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  for (let k = 0; k < vines; k++) {
    const a = (k / vines) * Math.PI * 2 + random() * 0.5;
    const out = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const spill = Math.sin(a) > -0.2;
    const pts: THREE.Vector3[] = [new THREE.Vector3(0, 0.12, 0)];
    const L = length * (0.5 + random() * 0.6);
    for (let s = 1; s <= 6; s++) {
      const t = s / 6;
      const p = out.clone().multiplyScalar(0.06 + t * 0.14);
      p.y = 0.12 + 0.04 * Math.sin(t * Math.PI) - (spill ? Math.max(0, t - 0.3) * L : t * 0.03);
      if (spill) p.z += Math.max(0, t - 0.3) * 0.05;
      p.x += (random() - 0.5) * 0.03;
      pts.push(p);
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const stem = new THREE.TubeGeometry(curve, 18, 0.0025, 4, false); stem.deleteAttribute('uv'); stems.push(stem);
    const count = 6 + Math.floor(random() * 4);
    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) / count;
      const at = curve.getPointAt(t);
      const size = (0.05 + random() * 0.03) * leafScale;
      const leaf = leafGeometry({ length: size, width: size * 0.85, outline, fold: 0.15, droop: size * 0.2, ripple: 0.002 }, seed + k * 17 + i, 4, 6);
      leaf.applyMatrix4(m.compose(at, q.setFromEuler(e.set(-0.9 - random() * 0.8, a + (random() - 0.5) * 1.6, (random() - 0.5) * 0.8, 'YXZ')), new THREE.Vector3(1, 1, 1)));
      const shade = 0.8 + random() * 0.4;
      leaves.push(paint(leaf, new THREE.Color(shade * 0.95, shade, shade * 0.75)));
    }
  }
  const leafMerged = mergeGeometries(leaves, false)!; leaves.forEach(g => g.dispose());
  const stemMerged = mergeGeometries(stems, false)!; stems.forEach(g => g.dispose());
  return { leaves: leafMerged, stems: stemMerged };
}
