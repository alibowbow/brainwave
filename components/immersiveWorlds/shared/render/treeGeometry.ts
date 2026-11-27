import * as THREE from 'three';
import { noise3, seeded } from './noise';

/*
 * Procedural trees as two merged geometries: lofted bark (trunk, limbs, twigs)
 * and leaf-cluster cards. Pure geometry, no DOM; deterministic per seed.
 *
 * Bark vertices carry `aBark` = (cos a * r, sin a * r, distance along branch),
 * a seamless cylinder space for barkSurface.ts. The near-trunk relief is
 * displaced with the same gradient noise the GPU uses, so modelled furrows and
 * shaded fissures line up. Both geometries carry `aWind` (trunk, branch,
 * flutter weights) and `aWindPhase` (tree, limb phase) for foliageShading.ts,
 * so leaves stay attached to the branches that sway them.
 * Original implementation.
 */

export interface TreeLeafOptions {
  /** Cards per terminal branch. */
  cardsPerTwig: number;
  /** Card edge length in metres. */
  size: number;
  /** Fraction of a terminal branch, from its tip, that carries leaves. */
  reach?: number;
  /** Card variants side by side in the atlas. */
  atlasColumns?: number;
  /** 0 keeps card normals, 1 uses crown-sphere normals (soft, volumetric shading). */
  crownNormals?: number;
  /** Baked occlusion from the crown interior to its surface. */
  shade?: [number, number];
  /** Upward tilt of cards toward the sky (0..1). */
  skyward?: number;
  /** Extra cards around each limb's interior to close holes in the crown. */
  fill?: number;
}

export interface TreeOptions {
  seed: number;
  base: THREE.Vector3;
  height: number;
  /** Trunk radius just above the root flare (metres). */
  radius: number;
  form: 'broadleaf' | 'column' | 'sapling';
  lean?: [number, number];
  gnarl?: number;
  /** Root flare: 0 none, 1 a strong old-tree flare. */
  flare?: number;
  /** Number of buttress lobes at the base; 0 for none. */
  buttresses?: number;
  crownStart?: number;
  limbs?: number;
  /** Branch levels below the limbs (0..2). */
  levels?: number;
  /** Limb length relative to tree height. */
  spread?: number;
  /** Children per branch at each level. */
  children?: number;
  radial?: number;
  ringsPerMetre?: number;
  /** Depth of modelled bark furrows in metres (0 for distant trees). */
  displace?: number;
  barkScale?: number;
  barkStretch?: number;
  leaves?: TreeLeafOptions | null;
  /** Overall flexibility multiplier for wind weights. */
  flex?: number;
  /** Upward curl of limbs (broadleaf) or droop (negative). */
  curl?: number;
}

export interface TreeBuild {
  bark: THREE.BufferGeometry;
  leaves: THREE.BufferGeometry | null;
  crown: { centre: THREE.Vector3; radius: THREE.Vector3 };
  tips: THREE.Vector3[];
  triangles: number;
}

interface Branch {
  points: THREE.Vector3[];
  radii: number[];
  level: number;
  length: number;
  limb: number;
  phase: number;
  branchW0: number;
  terminal: boolean;
}

const UP = new THREE.Vector3(0, 1, 0);

/** Fissure relief at a bark-space point; shared shape with barkSurface's GPU height. */
export function barkRelief(x: number, y: number, z: number, scale: number, stretch: number) {
  const n = noise3(x * scale, y * scale, z * scale / stretch);
  const fissure = 1 - THREE.MathUtils.smoothstep(Math.abs(n), 0, 0.2);
  const plate = noise3(x * scale * 2.7 + 5.1, y * scale * 2.7, z * scale * 2.7 / stretch) * 0.25;
  return -fissure + plate * (1 - fissure);
}

function perpendicular(v: THREE.Vector3) {
  const a = Math.abs(v.y) < 0.9 ? UP : new THREE.Vector3(1, 0, 0);
  return new THREE.Vector3().crossVectors(v, a).normalize();
}

function rotateAround(v: THREE.Vector3, axis: THREE.Vector3, angle: number) {
  return v.clone().applyAxisAngle(axis, angle);
}

export function buildTree(o: TreeOptions): TreeBuild {
  const random = seeded(o.seed * 7919 + 101);
  const range = (a: number, b: number) => a + random() * (b - a);
  const H = o.height, R = o.radius;
  const gnarl = o.gnarl ?? 0.35;
  const flex = o.flex ?? 1;
  const treePhase = random() * Math.PI * 2;
  const branches: Branch[] = [];

  const wiggle = (p: THREE.Vector3, amount: number, salt: number) => new THREE.Vector3(
    noise3(p.x * 0.35 + salt, p.y * 0.35, p.z * 0.35) * amount,
    noise3(p.x * 0.35, p.y * 0.35 + salt + 9.1, p.z * 0.35) * amount * 0.4,
    noise3(p.x * 0.35, p.y * 0.35, p.z * 0.35 + salt + 3.7) * amount,
  );

  // Trunk: a gently wandering axis with a lean that grows with height.
  const trunkTop = o.form === 'broadleaf' ? 0.82 : o.form === 'sapling' ? 1 : 0.97;
  const trunkSteps = Math.max(8, Math.round(H * 1.4));
  const trunk: Branch = { points: [], radii: [], level: 0, length: 0, limb: 0, phase: treePhase, branchW0: 0, terminal: o.form === 'sapling' && !(o.limbs ?? 0) };
  for (let i = 0; i <= trunkSteps; i++) {
    const t = i / trunkSteps;
    const h = t * H * trunkTop;
    const p = new THREE.Vector3(o.base.x + (o.lean?.[0] ?? 0) * t ** 1.6, o.base.y + h, o.base.z + (o.lean?.[1] ?? 0) * t ** 1.6);
    p.add(wiggle(p, gnarl * R * 0.9 * Math.min(1, t * 4), o.seed));
    trunk.points.push(p);
    const taper = o.form === 'column' ? 1 - 0.78 * t : o.form === 'sapling' ? 1 - 0.85 * t : 1 - 0.62 * t;
    trunk.radii.push(R * Math.max(0.05, taper));
  }
  trunk.length = H * trunkTop;
  branches.push(trunk);

  const pointAt = (b: Branch, t: number) => {
    const f = t * (b.points.length - 1), i = Math.min(b.points.length - 2, Math.floor(f));
    return b.points[i].clone().lerp(b.points[i + 1], f - i);
  };
  const radiusAt = (b: Branch, t: number) => {
    const f = t * (b.radii.length - 1), i = Math.min(b.radii.length - 2, Math.floor(f));
    return THREE.MathUtils.lerp(b.radii[i], b.radii[i + 1], f - i);
  };
  const directionAt = (b: Branch, t: number) => {
    const f = t * (b.points.length - 1), i = Math.min(b.points.length - 2, Math.floor(f));
    return b.points[i + 1].clone().sub(b.points[i]).normalize();
  };

  const levelFlex = [0, 0.9, 1.5, 2.1];
  const grow = (start: THREE.Vector3, direction: THREE.Vector3, length: number, radius: number, level: number, limb: number, phase: number, branchW0: number, curl: number): Branch => {
    const steps = Math.max(3, Math.min(14, Math.round(length * 2.2)));
    const b: Branch = { points: [start.clone()], radii: [radius], level, length, limb, phase, branchW0, terminal: false };
    const dir = direction.clone().normalize();
    const p = start.clone();
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      dir.addScaledVector(UP, curl * (0.25 + t) / steps).add(wiggle(p.clone().multiplyScalar(1.7), gnarl * 0.55 / steps * 3, limb * 13.1 + level)).normalize();
      p.addScaledVector(dir, length / steps);
      b.points.push(p.clone());
      b.radii.push(radius * Math.max(0.12, 1 - t * 0.82));
    }
    branches.push(b);
    return b;
  };

  const spawnChildren = (parent: Branch, depth: number) => {
    if (depth <= 0) { parent.terminal = true; return; }
    const count = o.children ?? 3;
    for (let c = 0; c < count; c++) {
      const t = THREE.MathUtils.clamp(0.28 + (c + range(0.1, 0.9)) / count * 0.66, 0.2, 0.96);
      const from = pointAt(parent, t), along = directionAt(parent, t);
      const side = rotateAround(perpendicular(along), along, c * 2.39996 + range(-0.5, 0.5));
      const dir = along.clone().multiplyScalar(Math.cos(range(0.55, 0.95))).addScaledVector(side, Math.sin(range(0.6, 1.0))).normalize();
      const length = parent.length * range(0.42, 0.62) * (1 - t * 0.35);
      const radius = Math.max(0.006, radiusAt(parent, t) * 0.62);
      const w0 = parent.branchW0 + (t ** 1.5) * (parent.length / H) * levelFlex[Math.min(3, parent.level)] * flex;
      const child = grow(from, dir, length, radius, parent.level + 1, parent.limb, parent.phase, w0, (o.curl ?? 0.6) * 0.7);
      spawnChildren(child, depth - 1);
    }
  };

  const levels = o.levels ?? 2;
  const limbCount = o.limbs ?? (o.form === 'broadleaf' ? 6 : o.form === 'column' ? 5 : 5);
  const crownStart = o.crownStart ?? (o.form === 'broadleaf' ? 0.42 : o.form === 'column' ? 0.7 : 0.3);
  const spread = o.spread ?? (o.form === 'broadleaf' ? 0.42 : o.form === 'column' ? 0.16 : 0.32);
  for (let l = 0; l < limbCount; l++) {
    const t = crownStart + (l + range(0.1, 0.9)) / limbCount * ((o.form === 'broadleaf' ? 0.86 : 0.97) - crownStart);
    const tTrunk = t / trunkTop;
    const from = pointAt(trunk, Math.min(1, tTrunk));
    const azimuth = l * 2.39996 + range(-0.4, 0.4);
    const elevation = o.form === 'column' ? range(1.05, 1.35) : range(0.55, 1.0) * (1 - (t - crownStart) * 0.5);
    const dir = new THREE.Vector3(Math.cos(azimuth) * Math.sin(elevation), Math.cos(elevation), Math.sin(azimuth) * Math.sin(elevation));
    const length = H * spread * range(0.8, 1.2) * (o.form === 'broadleaf' ? 1 - (t - crownStart) * 0.7 : 1 - (t - crownStart) * 1.2);
    const radius = radiusAt(trunk, Math.min(1, tTrunk)) * (o.form === 'broadleaf' ? range(0.48, 0.66) : range(0.28, 0.4));
    const limbPhase = treePhase + l * 1.93 + range(0, 1);
    const w0 = 0;
    const limb = grow(from, dir, Math.max(0.4, length), radius, 1, l + 1, limbPhase, w0, o.curl ?? (o.form === 'column' ? -0.2 : 0.6));
    spawnChildren(limb, levels);
  }
  if (o.form === 'broadleaf') {
    // The leader continues above the limbs and ends in its own small crown.
    const top = trunk.points[trunk.points.length - 1];
    const leader = grow(top, directionAt(trunk, 0.98).add(new THREE.Vector3(0, 0.6, 0)), H * (1 - trunkTop) * 1.1, trunk.radii[trunk.radii.length - 1], 1, limbCount + 1, treePhase + 0.7, 0, 0.2);
    spawnChildren(leader, Math.max(0, levels - 1));
  }

  // ---- Bark mesh ------------------------------------------------------------------------------------
  const positions: number[] = [], normals: number[] = [], uvs: number[] = [], barkCoords: number[] = [], wind: number[] = [], windPhase: number[] = [], indices: number[] = [];
  const seams: Array<[number, number]> = [];
  const radialBase = o.radial ?? 16;
  const ringsPerMetre = o.ringsPerMetre ?? 3;
  const displace = o.displace ?? 0;
  const barkScale = o.barkScale ?? 1.6, barkStretch = o.barkStretch ?? 4.5;
  const flareAmount = o.flare ?? 0;
  const buttressCount = o.buttresses ?? 0;
  const buttressPhase = random() * Math.PI * 2;
  const tips: THREE.Vector3[] = [];
  const v = new THREE.Vector3();

  for (const b of branches) {
    const curve = new THREE.CatmullRomCurve3(b.points, false, 'centripetal');
    const rings = Math.max(2, Math.min(b.level === 0 ? 160 : 40, Math.round(b.length * ringsPerMetre * (b.level === 0 ? 1 : 0.7))));
    const r0 = b.radii[0];
    const radial = b.level === 0 ? radialBase : Math.max(4, Math.min(radialBase, Math.round(radialBase * Math.sqrt(r0 / R) * 1.1)));
    let normal = perpendicular(curve.getTangent(0));
    let previousTangent = curve.getTangent(0);
    const first = positions.length / 3;
    const relief = b.level === 0 ? displace : b.level === 1 ? displace * 0.5 : 0;
    for (let i = 0; i <= rings; i++) {
      const t = i / rings;
      const centre = curve.getPoint(t);
      const tangent = curve.getTangent(t);
      // Parallel transport keeps the ring frame from twisting along the branch.
      const axis = new THREE.Vector3().crossVectors(previousTangent, tangent);
      if (axis.lengthSq() > 1e-10) normal.applyAxisAngle(axis.normalize(), Math.acos(THREE.MathUtils.clamp(previousTangent.dot(tangent), -1, 1)));
      normal = normal.sub(tangent.clone().multiplyScalar(normal.dot(tangent))).normalize();
      const binormal = new THREE.Vector3().crossVectors(tangent, normal);
      previousTangent = tangent;
      const along = t * b.length;
      const ringRadius = radiusAt(b, t);
      const height = centre.y - o.base.y;
      const flare = b.level === 0 ? 1 + flareAmount * 1.4 * Math.exp(-height / Math.max(0.2, R * 1.1)) : 1;
      const base = ringRadius * flare;
      const trunkW = flex * 0.55 * Math.min(1.2, Math.max(0, height / H)) ** 2;
      const branchW = b.level === 0 ? 0 : b.branchW0 + (t ** 1.5) * (b.length / H) * levelFlex[Math.min(3, b.level)] * flex;
      const flutterW = b.terminal ? 0.15 * t : 0;
      for (let j = 0; j <= radial; j++) {
        const a = (j / radial) * Math.PI * 2;
        const ca = Math.cos(a), sa = Math.sin(a);
        let r = base;
        if (b.level === 0 && buttressCount > 0) {
          const lobe = Math.pow(0.5 + 0.5 * Math.cos(buttressCount * a + buttressPhase + noise3(ca * 1.3, sa * 1.3, o.seed) * 1.2), 3);
          r *= 1 + flareAmount * 0.9 * (lobe - 0.25) * Math.exp(-height / Math.max(0.25, R * 1.5));
        }
        if (relief > 0) r += relief * barkRelief(ca * base, sa * base, along, barkScale, barkStretch) * Math.min(1, base / 0.08);
        v.copy(centre).addScaledVector(normal, ca * r).addScaledVector(binormal, sa * r);
        positions.push(v.x, v.y, v.z);
        normals.push(0, 0, 0);
        uvs.push(j / radial, along);
        barkCoords.push(ca * base, sa * base, along + b.limb * 7.31);
        wind.push(trunkW, branchW, flutterW);
        windPhase.push(treePhase, b.phase);
      }
      const row = first + i * (radial + 1);
      seams.push([row, row + radial]);
      if (i < rings) for (let j = 0; j < radial; j++) {
        const a = row + j, c = a + radial + 1;
        indices.push(a, c, a + 1, a + 1, c, c + 1);
      }
    }
    if (b.terminal) tips.push(curve.getPoint(1));
  }
  const bark = new THREE.BufferGeometry();
  bark.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  bark.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  bark.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  bark.setAttribute('aBark', new THREE.Float32BufferAttribute(barkCoords, 3));
  bark.setAttribute('aWind', new THREE.Float32BufferAttribute(wind, 3));
  bark.setAttribute('aWindPhase', new THREE.Float32BufferAttribute(windPhase, 2));
  bark.setIndex(indices);
  bark.computeVertexNormals();
  const n = bark.attributes.normal as THREE.BufferAttribute;
  for (const [a, c] of seams) {
    v.set(n.getX(a) + n.getX(c), n.getY(a) + n.getY(c), n.getZ(a) + n.getZ(c)).normalize();
    n.setXYZ(a, v.x, v.y, v.z); n.setXYZ(c, v.x, v.y, v.z);
  }

  // ---- Leaf cards ------------------------------------------------------------------------------------
  let leaves: THREE.BufferGeometry | null = null;
  const crownBox = new THREE.Box3();
  const centre = new THREE.Vector3();
  const crownRadius = new THREE.Vector3(1, 1, 1);
  const leafOptions = o.leaves;
  if (leafOptions) {
    type Card = { p: THREE.Vector3; up: THREE.Vector3; face: THREE.Vector3; size: number; limb: number; phase: number; branchW: number; column: number };
    const cards: Card[] = [];
    const reach = leafOptions.reach ?? 0.65;
    const columns = leafOptions.atlasColumns ?? 2;
    const skyward = leafOptions.skyward ?? 0.35;
    for (const b of branches) {
      if (!b.terminal) continue;
      const count = leafOptions.cardsPerTwig;
      for (let c = 0; c < count; c++) {
        const t = 1 - reach + reach * ((c + random()) / count);
        const p = pointAt(b, t);
        const along = directionAt(b, t);
        const side = rotateAround(perpendicular(along), along, random() * Math.PI * 2);
        p.addScaledVector(side, leafOptions.size * range(0.05, 0.3));
        const up = along.clone().multiplyScalar(0.55).addScaledVector(side, 0.7).add(new THREE.Vector3(range(-0.3, 0.3), range(-0.25, 0.35), range(-0.3, 0.3))).normalize();
        let face = perpendicular(up);
        face = rotateAround(face, up, random() * Math.PI * 2);
        face.lerp(UP, skyward * Math.max(0, 1 - Math.abs(up.y))).normalize();
        const branchW = b.branchW0 + (t ** 1.5) * (b.length / H) * levelFlex[Math.min(3, b.level)] * flex;
        cards.push({ p, up, face, size: leafOptions.size * range(0.75, 1.2), limb: b.limb, phase: b.phase, branchW, column: Math.floor(random() * columns) });
      }
    }
    // Interior fill: a few cards near each limb's leaf centroid close see-through holes.
    const limbCentres = new Map<number, { sum: THREE.Vector3; count: number }>();
    for (const card of cards) {
      const entry = limbCentres.get(card.limb) ?? { sum: new THREE.Vector3(), count: 0 };
      entry.sum.add(card.p); entry.count++;
      limbCentres.set(card.limb, entry);
    }
    const fill = leafOptions.fill ?? 0;
    for (const [limb, entry] of limbCentres) {
      const c = entry.sum.clone().divideScalar(entry.count);
      const sample = cards.find(card => card.limb === limb)!;
      for (let k = 0; k < Math.round(fill * entry.count); k++) {
        const up = new THREE.Vector3(range(-1, 1), range(-0.2, 1), range(-1, 1)).normalize();
        cards.push({ p: c.clone().add(new THREE.Vector3(range(-1, 1), range(-0.6, 0.6), range(-1, 1)).multiplyScalar(leafOptions.size * 1.4)), up, face: rotateAround(perpendicular(up), up, random() * 6.283), size: leafOptions.size * range(0.8, 1.2), limb, phase: sample.phase, branchW: sample.branchW * 0.8, column: Math.floor(random() * columns) });
      }
    }
    for (const card of cards) crownBox.expandByPoint(card.p);
    crownBox.getCenter(centre);
    const ext = new THREE.Vector3();
    for (const card of cards) {
      ext.x = Math.max(ext.x, Math.abs(card.p.x - centre.x));
      ext.y = Math.max(ext.y, Math.abs(card.p.y - centre.y));
      ext.z = Math.max(ext.z, Math.abs(card.p.z - centre.z));
    }
    crownRadius.copy(ext).addScalar(leafOptions.size * 0.4).max(new THREE.Vector3(0.3, 0.3, 0.3));
    const centres = new Map<number, THREE.Vector3>();
    for (const [limb, entry] of limbCentres) centres.set(limb, entry.sum.clone().divideScalar(entry.count).lerp(centre, 0.35));

    const lp: number[] = [], ln: number[] = [], luv: number[] = [], lc: number[] = [], lw: number[] = [], lph: number[] = [], li: number[] = [];
    const blend = leafOptions.crownNormals ?? 0.7;
    const [shadeIn, shadeOut] = leafOptions.shade ?? [0.45, 1];
    const corner = new THREE.Vector3(), sphere = new THREE.Vector3(), out = new THREE.Vector3();
    for (const card of cards) {
      const right = new THREE.Vector3().crossVectors(card.up, card.face).normalize();
      const limbCentre = centres.get(card.limb) ?? centre;
      out.copy(card.p).sub(limbCentre);
      const facing = out.dot(card.face) < 0 ? -1 : 1;
      const tint = range(0.88, 1.1);
      const baseIndex = lp.length / 3;
      for (let row = 0; row <= 2; row++) {
        for (let col = 0; col <= 2; col++) {
          const u = col / 2, w = row / 2;
          const x = (u - 0.5) * card.size, y = (w - 0.08) * card.size;
          // A slight cup across the card and a droop toward its tip.
          const cup = ((u - 0.5) * 2) ** 2 * card.size * 0.09 - w * w * card.size * 0.12;
          corner.copy(card.p).addScaledVector(right, x).addScaledVector(card.up, y).addScaledVector(card.face, cup * facing);
          lp.push(corner.x, corner.y, corner.z);
          sphere.copy(corner).sub(limbCentre).normalize();
          const nrm = card.face.clone().multiplyScalar(facing).lerp(sphere, blend).normalize();
          ln.push(nrm.x, nrm.y, nrm.z);
          luv.push((card.column + u) / columns, w);
          // Occlusion: darker toward the crown core and its underside.
          const depth = THREE.MathUtils.clamp(corner.clone().sub(centre).divide(crownRadius).length(), 0, 1.2);
          const under = 0.82 + 0.18 * THREE.MathUtils.clamp(sphere.y * 0.5 + 0.5, 0, 1);
          const ao = THREE.MathUtils.lerp(shadeIn, shadeOut, THREE.MathUtils.smoothstep(depth, 0.15, 1.0)) * under * tint;
          lc.push(ao, ao, ao);
          lw.push(flex * 0.55 * Math.min(1.2, Math.max(0, (corner.y - o.base.y) / H)) ** 2, card.branchW, 0.25 + 0.75 * w);
          lph.push(treePhase, card.phase);
        }
      }
      for (let row = 0; row < 2; row++) for (let col = 0; col < 2; col++) {
        const a = baseIndex + row * 3 + col;
        li.push(a, a + 1, a + 3, a + 1, a + 4, a + 3);
      }
    }
    leaves = new THREE.BufferGeometry();
    leaves.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3));
    leaves.setAttribute('normal', new THREE.Float32BufferAttribute(ln, 3));
    leaves.setAttribute('uv', new THREE.Float32BufferAttribute(luv, 2));
    leaves.setAttribute('color', new THREE.Float32BufferAttribute(lc, 3));
    leaves.setAttribute('aWind', new THREE.Float32BufferAttribute(lw, 3));
    leaves.setAttribute('aWindPhase', new THREE.Float32BufferAttribute(lph, 2));
    leaves.setIndex(li);
  } else {
    centre.copy(o.base).add(new THREE.Vector3(0, H * 0.75, 0));
    crownRadius.set(H * 0.2, H * 0.15, H * 0.2);
  }
  const triangles = indices.length / 3 + (leaves?.index ? leaves.index.count / 3 : 0);
  return { bark, leaves, crown: { centre, radius: crownRadius }, tips, triangles };
}

export interface LoftOptions {
  radial: number;
  ringsPerMetre: number;
  /** Modelled furrow depth (metres). */
  displace?: number;
  barkScale?: number;
  barkStretch?: number;
  /** Offset along the bark space so neighbouring tubes do not share a pattern. */
  barkOffset?: number;
  /** Per-vertex wind weights (trunk, branch, flutter) and phases; zero for roots and logs. */
  wind?: [number, number, number];
  phase?: [number, number];
  /** Flatten the underside (roots lying on soil), 0..1. */
  flatten?: number;
}

/**
 * A lofted bark tube along `points` with per-point radii (roots, fallen logs,
 * single limbs). Same attributes as buildTree's bark, so it shares materials.
 */
export function loftTube(points: THREE.Vector3[], radii: number[], o: LoftOptions): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
  const length = curve.getLength();
  const rings = Math.max(2, Math.min(200, Math.round(length * o.ringsPerMetre)));
  const radiusAt = (t: number) => {
    const f = t * (radii.length - 1), i = Math.min(radii.length - 2, Math.floor(f));
    return THREE.MathUtils.lerp(radii[i], radii[i + 1], f - i);
  };
  const positions: number[] = [], uvs: number[] = [], bark: number[] = [], wind: number[] = [], phase: number[] = [], indices: number[] = [];
  const seams: Array<[number, number]> = [];
  let tangentPrev = curve.getTangent(0);
  let normal = perpendicular(tangentPrev);
  const v = new THREE.Vector3();
  const scale = o.barkScale ?? 1.6, stretch = o.barkStretch ?? 4.5;
  for (let i = 0; i <= rings; i++) {
    const t = i / rings;
    const centre = curve.getPoint(t), tangent = curve.getTangent(t);
    const axis = new THREE.Vector3().crossVectors(tangentPrev, tangent);
    if (axis.lengthSq() > 1e-10) normal.applyAxisAngle(axis.normalize(), Math.acos(THREE.MathUtils.clamp(tangentPrev.dot(tangent), -1, 1)));
    normal = normal.sub(tangent.clone().multiplyScalar(normal.dot(tangent))).normalize();
    const binormal = new THREE.Vector3().crossVectors(tangent, normal);
    tangentPrev = tangent;
    const base = radiusAt(t), along = t * length + (o.barkOffset ?? 0);
    for (let j = 0; j <= o.radial; j++) {
      const a = (j / o.radial) * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
      let r = base;
      if (o.displace) r += o.displace * barkRelief(ca * base, sa * base, along, scale, stretch) * Math.min(1, base / 0.08);
      v.copy(normal).multiplyScalar(ca * r).addScaledVector(binormal, sa * r);
      if (o.flatten && v.y < 0) v.y *= 1 - o.flatten;
      v.add(centre);
      positions.push(v.x, v.y, v.z);
      uvs.push(j / o.radial, along);
      bark.push(ca * base, sa * base, along);
      wind.push(...(o.wind ?? [0, 0, 0]));
      phase.push(...(o.phase ?? [0, 0]));
    }
    const row = i * (o.radial + 1);
    seams.push([row, row + o.radial]);
    if (i < rings) for (let j = 0; j < o.radial; j++) {
      const a = row + j, c = a + o.radial + 1;
      indices.push(a, c, a + 1, a + 1, c, c + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(new Float32Array(positions.length), 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('aBark', new THREE.Float32BufferAttribute(bark, 3));
  geometry.setAttribute('aWind', new THREE.Float32BufferAttribute(wind, 3));
  geometry.setAttribute('aWindPhase', new THREE.Float32BufferAttribute(phase, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const n = geometry.attributes.normal as THREE.BufferAttribute;
  for (const [a, c] of seams) {
    v.set(n.getX(a) + n.getX(c), n.getY(a) + n.getY(c), n.getZ(a) + n.getZ(c)).normalize();
    n.setXYZ(a, v.x, v.y, v.z); n.setXYZ(c, v.x, v.y, v.z);
  }
  return geometry;
}

/** Concatenates geometries that share the same attribute layout (cheaper than a generic merge). */
export function concatGeometries(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const result = new THREE.BufferGeometry();
  if (!parts.length) return result;
  const names = Object.keys(parts[0].attributes);
  let vertexCount = 0, indexCount = 0;
  for (const part of parts) { vertexCount += part.attributes.position.count; indexCount += part.index ? part.index.count : part.attributes.position.count; }
  for (const name of names) {
    const size = parts[0].attributes[name].itemSize;
    const array = new Float32Array(vertexCount * size);
    let offset = 0;
    for (const part of parts) {
      const attribute = part.attributes[name] as THREE.BufferAttribute;
      array.set(attribute.array as Float32Array, offset);
      offset += attribute.count * size;
    }
    result.setAttribute(name, new THREE.BufferAttribute(array, size));
  }
  const index = vertexCount > 65535 ? new Uint32Array(indexCount) : new Uint16Array(indexCount);
  let vertexOffset = 0, indexOffset = 0;
  for (const part of parts) {
    const count = part.attributes.position.count;
    if (part.index) {
      const source = part.index.array;
      for (let i = 0; i < source.length; i++) index[indexOffset + i] = source[i] + vertexOffset;
      indexOffset += source.length;
    } else {
      for (let i = 0; i < count; i++) index[indexOffset + i] = i + vertexOffset;
      indexOffset += count;
    }
    vertexOffset += count;
  }
  result.setIndex(new THREE.BufferAttribute(index, 1));
  return result;
}
