import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { fbm3, noise3, seeded } from '../shared/render/noise';

/*
 * Distant mixed conifer forest for the deep night and the lakeside (original).
 * A row of identical cones on a crest reads as the teeth of a comb; a real
 * forest edge is irregular for several reasons at once, all modelled here:
 *  - species with different silhouettes: slender spruce with ragged, drooping
 *    tiers, denser firs, old pines with a bare trunk and a flat, clumpy crown,
 *    young trees and the odd dead snag,
 *  - stands and clearings: a clumping density field accepts trees in groves,
 *    with gaps, a few big trees and smaller ones crowding their edges,
 *  - age: heights follow a skewed distribution modulated by the stand,
 *  - each crown is asymmetric (wind-shaped, missing branches on one side),
 *    leans a little and carries its own tint.
 * Every variant is one instanced draw; trees do not cast shadows. The shading
 * darkens toward the dense lower crown and lifts the moonlit tips.
 */

const tau = Math.PI * 2;
export type ForestVariant = 'spruce' | 'fir' | 'pine' | 'young' | 'snag';

function finish(parts: THREE.BufferGeometry[]) {
  const merged = mergeGeometries(parts.map((g) => {
    const flat = g.index ? g.toNonIndexed() : g;
    for (const name of Object.keys(flat.attributes)) if (name !== 'position') flat.deleteAttribute(name);
    return flat;
  }));
  parts.forEach((g) => g.dispose());
  merged.computeVertexNormals();
  // Crown normals: blend the facet normal with the outward direction from the trunk,
  // lifted toward the sky, so a crown shades as one soft volume rather than facets.
  const p = merged.attributes.position as THREE.BufferAttribute, n = merged.attributes.normal as THREE.BufferAttribute;
  const v = new THREE.Vector3(), o = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    o.set(p.getX(i), 0, p.getZ(i));
    if (o.lengthSq() > 1e-6) o.normalize();
    v.fromBufferAttribute(n, i).multiplyScalar(0.45).addScaledVector(o, 0.55).add(new THREE.Vector3(0, 0.35, 0)).normalize();
    n.setXYZ(i, v.x, v.y, v.z);
  }
  return merged;
}

function trunk(height: number, radius: number, sides = 5) {
  const g = new THREE.CylinderGeometry(radius * 0.35, radius, height, sides, 1, true);
  g.translate(0, height / 2 - 0.02, 0);
  return g;
}

/** Tiered skirt crown: each tier is a fan of drooping branch tips with notches between. */
function tieredCrown(random: () => number, o: { base: number; tiers: number; radius: number; droop: number; ragged: number; points: number; gaps: number }) {
  const positions: number[] = [], indices: number[] = [];
  // A wind-shaped crown: fuller on one side.
  const lopsided = random() * tau, lopAmount = 0.15 + random() * 0.2;
  for (let t = 0; t < o.tiers; t++) {
    const q = t / o.tiers;
    // Irregular tier spacing; the top tiers crowd together.
    const top = o.base + (1 - o.base) * Math.pow(Math.max(0, q + (random() - 0.5) * 0.35 / o.tiers), 0.95);
    const radius = o.radius * Math.pow(1 - q, 0.85) * (0.8 + random() * 0.4) + 0.02;
    const centre = positions.length / 3;
    positions.push(0, Math.min(1, top + 0.045), 0);
    const missing = random() < o.gaps ? random() * tau : -10;
    const n = o.points * 2;
    for (let k = 0; k <= n; k++) {
      const a = (k % n) / n * tau + t * 0.9;
      const tip = k % 2 === 0;
      let r = radius * (tip ? 0.75 + random() * o.ragged : 0.35 + random() * 0.2);
      r *= 1 + lopAmount * Math.cos(a - lopsided);
      // A branch broken off or shaded out on one side of this tier.
      if (tip && Math.abs(Math.atan2(Math.sin(a - missing), Math.cos(a - missing))) < 0.7) r *= 0.45;
      const drop = tip ? o.droop * (0.8 + random() * 0.5) : 0.38;
      positions.push(Math.cos(a) * r, top - radius * drop, Math.sin(a) * r);
      if (k > 0) indices.push(centre, centre + k + 1, centre + k);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setIndex(indices);
  return g;
}

/** An old pine's crown: overlapping clumps on upswept limbs, rounded but irregular, open below. */
function pineCrown(random: () => number, detail: number) {
  const parts: THREE.BufferGeometry[] = [];
  const pads = 6 + Math.floor(random() * 3);
  for (let k = 0; k < pads; k++) {
    const u = k / (pads - 1);
    const a = k * 2.4 + random() * 0.8, out = (0.05 + random() * 0.1) * (1 - u * 0.6);
    const y = 0.5 + u * 0.42 + (random() - 0.5) * 0.05;
    const pad = new THREE.IcosahedronGeometry(1, detail > 1 ? 1 : 0);
    const pos = pad.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const s = 1 + 0.3 * noise3(pos.getX(i) * 2 + k * 3.1, pos.getY(i) * 2, pos.getZ(i) * 2);
      // Flat-bottomed clumps: needles hang from the limb, the top is domed.
      pos.setXYZ(i, pos.getX(i) * s, Math.max(-0.35, pos.getY(i)) * s, pos.getZ(i) * s);
    }
    const w = (0.075 + random() * 0.05) * (1.15 - u * 0.45);
    pad.scale(w * (1.1 + random() * 0.4), w * 0.6, w * (0.9 + random() * 0.4));
    pad.translate(Math.cos(a) * out, y, Math.sin(a) * out);
    parts.push(pad);
    if (out > 0.04) {
      // The limb carrying it.
      const limb = new THREE.CylinderGeometry(0.004, 0.007, out + 0.02, 3, 1, true);
      limb.rotateZ(Math.PI / 2 - 0.45);
      limb.rotateY(-a);
      limb.translate(Math.cos(a) * out * 0.5, y - 0.04, Math.sin(a) * out * 0.5);
      parts.push(limb);
    }
  }
  return parts;
}

/** One instanced silhouette per variant, unit height, base at the origin. */
export function forestVariantGeometry(variant: ForestVariant, seed = 1, detail = 1) {
  const random = seeded(seed * 977 + variant.length * 31);
  // Far stands use fewer tiers and branch tips; the silhouette keeps its character.
  const tiers = (n: number) => Math.max(4, Math.round(n * (0.45 + 0.55 * detail)));
  const points = (n: number) => Math.max(5, Math.round(n * (0.6 + 0.4 * detail)));
  switch (variant) {
    case 'spruce': return finish([trunk(0.35, 0.025), tieredCrown(random, { base: 0.1, tiers: tiers(11), radius: 0.27, droop: 0.7, ragged: 0.45, points: points(8), gaps: 0.35 })]);
    case 'fir': return finish([trunk(0.3, 0.028), tieredCrown(random, { base: 0.06, tiers: tiers(13), radius: 0.33, droop: 0.55, ragged: 0.25, points: points(9), gaps: 0.12 })]);
    case 'young': return finish([trunk(0.25, 0.03), tieredCrown(random, { base: 0.05, tiers: tiers(6), radius: 0.36, droop: 0.5, ragged: 0.3, points: points(7), gaps: 0.2 })]);
    case 'pine': return finish([trunk(0.75, 0.028, 5), ...pineCrown(random, detail)]);
    case 'snag': {
      const parts: THREE.BufferGeometry[] = [trunk(1, 0.02, 5)];
      for (let k = 0; k < 5; k++) {
        const y = 0.35 + k * 0.12 + random() * 0.05, a = random() * tau, l = 0.06 + random() * 0.1;
        const b = new THREE.CylinderGeometry(0.002, 0.005, l, 3, 1, true);
        b.rotateZ(Math.PI / 2 + 0.3);
        b.rotateY(-a);
        b.translate(Math.cos(a) * l * 0.5, y, Math.sin(a) * l * 0.5);
        parts.push(b);
      }
      return finish(parts);
    }
  }
}

export interface ForestTree { variant: ForestVariant; matrix: THREE.Matrix4; tint: number }

export interface ForestOptions {
  seed: number;
  /** Trees to place. */
  count: number;
  /** Candidate ground point for a random draw, or null to reject. */
  sample: (random: () => number) => { x: number; y: number; z: number } | null;
  /** Height range in metres for the tallest variants. */
  height: [number, number];
  /** Grove scale in metres; smaller gives tighter clumps. */
  grove?: number;
  /** Fraction of the area that is open (meadows, rock, clearings). */
  openness?: number;
  /** Relative weights of the variants. */
  mix?: Partial<Record<ForestVariant, number>>;
  /** Extra acceptance by position (0..1), e.g. thinner near crests. */
  density?: (x: number, y: number, z: number) => number;
  maxAttempts?: number;
}

/** Groves and clearings: a clumped field decides where trees stand and how old they are. */
export function scatterForest(o: ForestOptions): ForestTree[] {
  const random = seeded(o.seed);
  const grove = o.grove ?? 30;
  const openness = o.openness ?? 0.45;
  const mix = { spruce: 0.46, fir: 0.22, pine: 0.14, young: 0.14, snag: 0.04, ...o.mix };
  const total = Object.values(mix).reduce((s, w) => s + w, 0);
  const pick = () => {
    let r = random() * total;
    for (const [variant, weight] of Object.entries(mix) as Array<[ForestVariant, number]>) { if ((r -= weight) <= 0) return variant; }
    return 'spruce';
  };
  const trees: ForestTree[] = [];
  const attempts = o.maxAttempts ?? o.count * 40;
  for (let k = 0; k < attempts && trees.length < o.count; k++) {
    const point = o.sample(random);
    if (!point) continue;
    const { x, y, z } = point;
    // Stand field: broad groves, finer clumps inside them.
    const stand = fbm3(x / grove + o.seed * 0.01, 0.37, z / grove, 3) * 0.8 + noise3(x / (grove * 0.3), 1.9, z / (grove * 0.3)) * 0.35;
    const accept = THREE.MathUtils.smoothstep(stand, openness - 0.62, openness - 0.3) * (o.density?.(x, y, z) ?? 1);
    if (random() > accept) continue;
    const variant = pick();
    // Old stands in the middle of a grove, smaller trees at the edges.
    const age = THREE.MathUtils.clamp(0.35 + 0.65 * THREE.MathUtils.smoothstep(stand, openness - 0.45, openness + 0.15), 0, 1);
    const base = THREE.MathUtils.lerp(o.height[0], o.height[1], Math.pow(random(), 1.6) * age);
    const h = base * (variant === 'young' ? 0.45 : variant === 'pine' ? 1.15 : variant === 'snag' ? 0.8 : 1);
    const width = h * (variant === 'fir' ? 0.95 : variant === 'pine' ? 0.9 : variant === 'young' ? 1.1 : 0.85) * (0.75 + random() * 0.5);
    const lean = new THREE.Euler((random() - 0.5) * 0.07, random() * tau, (random() - 0.5) * 0.07);
    trees.push({
      variant,
      matrix: new THREE.Matrix4().compose(new THREE.Vector3(x, y - h * 0.02, z), new THREE.Quaternion().setFromEuler(lean), new THREE.Vector3(width, h, width * (0.8 + random() * 0.4))),
      tint: 0.75 + random() * 0.5,
    });
  }
  return trees;
}

export interface ForestShading {
  /** Base needle colour (linear-ish albedo). */
  color: THREE.ColorRepresentation;
  /** Tint of the moonlit, upward-facing tips. */
  tips?: THREE.ColorRepresentation;
  key: string;
}

/** Instanced conifer shading: darker dense lower crown, lighter tips, per-tree tint. */
export function forestMaterial(o: ForestShading) {
  const material = new THREE.MeshStandardMaterial({ color: o.color, roughness: 0.92, metalness: 0, side: THREE.DoubleSide });
  const tips = new THREE.Color(o.tips ?? o.color);
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying float vForestY;\nvarying float vForestUp;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvForestY = position.y;\nvForestUp = normal.y;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vForestY;\nvarying float vForestUp;')
      .replace('#include <color_fragment>', `#include <color_fragment>
diffuseColor.rgb *= mix(0.45, 1.05, smoothstep(0.0, 0.9, vForestY));
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(${tips.r.toFixed(4)}, ${tips.g.toFixed(4)}, ${tips.b.toFixed(4)}) * vColor.rgb, smoothstep(0.45, 0.95, vForestUp) * 0.35);`);
  };
  // vColor (from instanceColor) carries each tree's tint.
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|night-forest-v1|${o.key}`;
  return material;
}

/**
 * Slow sway for world-space merged tree geometry: the whole crown leans with a
 * long gust, branch tips nod a little faster, both growing with height above
 * `baseY` (so trunks and root plates stay put).
 */
export function addTreeSway<T extends THREE.Material>(material: T, time: { value: number }, baseY: number, height: number, key: string): T {
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.uniforms.uTreeSwayTime = time;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTreeSwayTime;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
{
  float swayW = clamp((transformed.y - (${baseY.toFixed(3)})) / ${height.toFixed(3)}, 0.0, 1.0);
  swayW *= swayW;
  float t = uTreeSwayTime;
  float gust = 0.6 + 0.4 * sin(t * 0.13 + transformed.x * 0.05);
  transformed.x += (sin(t * 0.47 + transformed.z * 0.21) * 0.07 * gust + sin(t * 1.3 + transformed.x * 2.7 + transformed.y * 1.9) * 0.012) * swayW;
  transformed.z += (cos(t * 0.39 + transformed.x * 0.19) * 0.045 * gust + cos(t * 1.1 + transformed.z * 2.3) * 0.01) * swayW;
}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|night-tree-sway-v1|${key}`;
  return material;
}

/** Builds one instanced mesh per variant used. */
export function buildForest(trees: ForestTree[], material: THREE.Material, name: string, seed = 3, detail = 1) {
  const group = new THREE.Group();
  group.name = name;
  const byVariant = new Map<ForestVariant, ForestTree[]>();
  for (const tree of trees) { const list = byVariant.get(tree.variant) ?? []; list.push(tree); byVariant.set(tree.variant, list); }
  const color = new THREE.Color();
  let triangles = 0;
  for (const [variant, list] of byVariant) {
    const geometry = forestVariantGeometry(variant, seed, detail);
    const mesh = new THREE.InstancedMesh(geometry, material, list.length);
    list.forEach((tree, i) => {
      mesh.setMatrixAt(i, tree.matrix);
      mesh.setColorAt(i, color.setScalar(tree.tint));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    mesh.name = `${name} (${variant})`;
    mesh.computeBoundingSphere();
    group.add(mesh);
    triangles += geometry.attributes.position.count / 3 * list.length;
  }
  group.userData.triangles = triangles;
  return group;
}
