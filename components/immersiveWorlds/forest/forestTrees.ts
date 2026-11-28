import * as THREE from 'three';
import { noise3, seeded } from '../shared/render/noise';
import { patchSurface } from '../shared/render/interiorSurface';
import { applyForestSurface, canopyOpenness, canopyPlane, SUN_DIRECTION, type ForestLightUniforms } from './forestLight';
import { GLSL_GROUND, groundHeight } from './forestMath';

/*
 * Broadleaf trees grown in code. Trunks are lofted along curved spines with
 * buttress lobes, a root flare and surface roots; ridged cross-sections break
 * the round silhouette. Limbs fork into secondary branches whose tips carry
 * instanced leaf clusters grouped into crown lobes. All wood of the forest is
 * one mesh (world-space bark), all canopy one instanced mesh.
 */

type Random = () => number;
const TAU = Math.PI * 2;

/** Accumulates lofted wood with a per-vertex tree identity (base xyz, height) for shared wind. */
export class WoodBuilder {
  private positions: number[] = [];
  private normals: number[] = [];
  private trees: number[] = [];
  private indices: number[] = [];
  private tree: [number, number, number, number] = [0, 0, 0, 1];

  setTree(x: number, y: number, z: number, height: number) { this.tree = [x, y, z, height]; }

  get vertexCount() { return this.positions.length / 3; }

  /**
   * A closed tube along a smooth spine. Rings use parallel-transported frames,
   * so lobes keep their angle along a curved trunk. No uv seam: indices wrap.
   */
  loft(spine: THREE.Vector3[], rings: number, sides: number, radius: (t: number, angle: number, point: THREE.Vector3) => number, spacing = 1, initial?: THREE.Vector3) {
    const curve = new THREE.CatmullRomCurve3(spine, false, 'centripetal');
    const positions: number[] = [], indices: number[] = [];
    const point = new THREE.Vector3(), tangent = new THREE.Vector3(), previousTangent = new THREE.Vector3();
    const normal = new THREE.Vector3(), binormal = new THREE.Vector3(), dir = new THREE.Vector3(), q = new THREE.Quaternion();
    for (let k = 0; k <= rings; k++) {
      const t = Math.pow(k / rings, spacing);
      curve.getPointAt(t, point); curve.getTangentAt(t, tangent).normalize();
      if (k === 0) {
        normal.copy(initial ?? new THREE.Vector3(1, 0, 0)).addScaledVector(tangent, -(initial ?? new THREE.Vector3(1, 0, 0)).dot(tangent));
        if (normal.lengthSq() < 1e-6) normal.set(0, 0, 1).addScaledVector(tangent, -tangent.z);
        normal.normalize();
      } else {
        q.setFromUnitVectors(previousTangent, tangent); normal.applyQuaternion(q).normalize();
      }
      previousTangent.copy(tangent);
      binormal.crossVectors(tangent, normal).normalize();
      for (let s = 0; s < sides; s++) {
        const angle = s / sides * TAU;
        dir.copy(normal).multiplyScalar(Math.cos(angle)).addScaledVector(binormal, Math.sin(angle));
        const r = radius(t, angle, point);
        positions.push(point.x + dir.x * r, point.y + dir.y * r, point.z + dir.z * r);
        if (k < rings) {
          const a = k * sides + s, b = k * sides + (s + 1) % sides;
          indices.push(a, b, a + sides, b, b + sides, a + sides);
        }
      }
    }
    const part = new THREE.BufferGeometry();
    part.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    part.setIndex(indices);
    part.computeVertexNormals();
    const offset = this.vertexCount;
    const n = part.attributes.normal.array;
    for (let i = 0; i < positions.length; i++) { this.positions.push(positions[i]); this.normals.push(n[i]); }
    for (let i = 0; i < positions.length / 3; i++) this.trees.push(...this.tree);
    for (const index of indices) this.indices.push(index + offset);
    part.dispose();
  }

  build() {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(this.normals, 3));
    geometry.setAttribute('aTree', new THREE.Float32BufferAttribute(this.trees, 4));
    geometry.setIndex(this.vertexCount > 65535 ? new THREE.Uint32BufferAttribute(this.indices, 1) : new THREE.Uint16BufferAttribute(this.indices, 1));
    geometry.computeBoundingSphere();
    this.positions = []; this.normals = []; this.trees = []; this.indices = [];
    return geometry;
  }
}

/** Instanced leaf clusters for the whole canopy. */
export class CanopyBuilder {
  matrices: THREE.Matrix4[] = [];
  colors: THREE.Color[] = [];
  trees: number[] = [];
  leaves: number[] = [];
  private dummy = new THREE.Object3D();

  add(position: THREE.Vector3, size: number, crownNormal: THREE.Vector3, occlusion: number, tree: [number, number, number, number], color: THREE.Color, random: Random) {
    this.dummy.position.copy(position);
    this.dummy.rotation.set((random() - 0.5) * 0.7, random() * TAU, (random() - 0.5) * 0.7);
    this.dummy.scale.setScalar(size);
    this.dummy.updateMatrix();
    this.matrices.push(this.dummy.matrix.clone());
    this.colors.push(color);
    this.trees.push(...tree);
    this.leaves.push(crownNormal.x, crownNormal.y, crownNormal.z, occlusion);
  }

  get count() { return this.matrices.length; }

  build(geometry: THREE.BufferGeometry, material: THREE.Material) {
    geometry.setAttribute('aTree', new THREE.InstancedBufferAttribute(new Float32Array(this.trees), 4));
    geometry.setAttribute('aLeaf', new THREE.InstancedBufferAttribute(new Float32Array(this.leaves), 4));
    const mesh = new THREE.InstancedMesh(geometry, material, this.count);
    this.matrices.forEach((matrix, i) => { mesh.setMatrixAt(i, matrix); mesh.setColorAt(i, this.colors[i]); });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
    return mesh;
  }
}

export interface TreeSpec {
  x: number;
  z: number;
  height: number;
  radius: number;
  /** 2: near (buttresses, roots, fine ridges), 1: middle distance, 0: far. */
  detail: 0 | 1 | 2;
  seed: number;
  /** Fraction of the height where the crown limbs begin (default 0.42). */
  crownStart?: number;
  /** A clearing to reach toward with long, low limbs (x, z). */
  toward?: [number, number];
}

/** Drop clusters where the cookie says the canopy is open, so real gaps line up with light. */
function canopyAllows(position: THREE.Vector3, random: Random) {
  const [qx, qz] = canopyPlane(position.x, position.y, position.z);
  const open = canopyOpenness(qx, qz);
  return random() > (open - 0.32) * 2.2;
}

const leafTint = (random: Random, light = 0) => new THREE.Color().setHSL(0.21 + random() * 0.07, 0.35 + random() * 0.3, 0.42 + random() * 0.16 + light);

export function growTree(spec: TreeSpec, wood: WoodBuilder, canopy: CanopyBuilder) {
  const random = seeded(spec.seed);
  const { height: H, radius: R, detail } = spec;
  const groundY = groundHeight(spec.x, spec.z);
  const base = new THREE.Vector3(spec.x, groundY - 0.35, spec.z);
  const tree: [number, number, number, number] = [spec.x, groundY, spec.z, H];
  wood.setTree(...tree);
  const lean = new THREE.Vector2((random() - 0.5) * 0.09, (random() - 0.5) * 0.09);
  const wobble = () => (random() - 0.5) * R * 0.9;
  const trunkTop = 0.86;
  const spine = [0, 0.18, 0.4, 0.62, trunkTop].map((f, i) => new THREE.Vector3(
    spec.x + lean.x * H * f * f + (i ? wobble() * f : 0), groundY - 0.35 + (H + 0.35) * f, spec.z + lean.y * H * f * f + (i ? wobble() * f : 0)));

  // Buttress lobes: a few strong, irregular ribs where roots leave the trunk.
  const lobeCount = detail === 0 ? 0 : 4 + Math.floor(random() * 2);
  const lobes = Array.from({ length: lobeCount }, (_, i) => ({ angle: (i + random() * 0.5) / lobeCount * TAU, weight: 0.55 + random() * 0.7, sharp: 5 + random() * 9 }));
  const lobeAt = (angle: number) => { let v = 0; for (const l of lobes) v = Math.max(v, l.weight * Math.pow(Math.max(0, Math.cos(angle - l.angle)), l.sharp)); return v; };
  const seed = random() * 50;
  const rings = detail === 2 ? 44 : detail === 1 ? 20 : 8;
  const sides = detail === 2 ? 30 : detail === 1 ? 14 : 7;
  wood.loft(spine, rings, sides, (t, angle, point) => {
    const h = point.y - groundY;
    const taper = 1 - 0.6 * Math.pow(t, 0.9);
    const flare = Math.exp(-Math.max(0, h) / (R * 2.3));
    const ridges = detail === 0 ? 1 : 1 + 0.032 * noise3(Math.cos(angle) * 2.4 + seed, h * 0.3, Math.sin(angle) * 2.4)
      + (detail === 2 ? 0.018 * noise3(Math.cos(angle) * 7 + seed, h * 1.4, Math.sin(angle) * 7) : 0);
    return R * taper * (1 + flare * (0.2 + 1.3 * lobeAt(angle))) * ridges;
  }, detail === 2 ? 1.7 : 1.3, new THREE.Vector3(1, 0, 0));

  // Surface roots run out from the buttresses and dive into the litter.
  if (detail === 2) {
    for (const lobe of lobes) {
      const dir = new THREE.Vector3(Math.cos(lobe.angle), 0, -Math.sin(lobe.angle));
      const reach = R * (3.2 + random() * 2.6) * lobe.weight;
      const points = [0.15, 0.45, 0.75, 1].map((f) => {
        const p = base.clone().setY(0).addScaledVector(dir, R * 0.6 + reach * f).add(new THREE.Vector3((random() - 0.5) * 0.15 * f, 0, (random() - 0.5) * 0.15 * f));
        p.y = groundHeight(p.x, p.z) + R * 0.18 * (1 - f) - 0.03 - f * 0.05;
        return p;
      });
      points.unshift(base.clone().addScaledVector(dir, R * 0.5).setY(groundY + R * 0.55 * lobe.weight));
      wood.loft(points, 12, 9, (t) => R * (0.32 * lobe.weight + 0.05) * (1 - 0.88 * t), 1);
    }
  }

  // Limbs: upward-curving scaffold branches from the upper trunk, each forking
  // twice; leaf clusters crowd the outer part of every fork in crown lobes.
  // Trees at the clearing's edge also reach long, low limbs toward its light.
  const curve = new THREE.CatmullRomCurve3(spine);
  const crownCentre = curve.getPointAt(1).clone().add(new THREE.Vector3(0, H * 0.05, 0));
  const branchSides = detail === 2 ? 9 : detail === 1 ? 6 : 4;
  const clusterSize = detail === 2 ? 1.0 : detail === 1 ? 1.3 : 1.8;
  const perLobe = detail === 2 ? 12 : detail === 1 ? 10 : 7;
  const limb = (t: number, azimuth: number, reach: number, rise: number, lobeScale: number, thickness = 1) => {
    const start = curve.getPointAt(Math.min(1, t / trunkTop * 0.98));
    const out = new THREE.Vector3(Math.cos(azimuth), 0, Math.sin(azimuth));
    const side = new THREE.Vector3(-out.z, 0, out.x).multiplyScalar(reach * (random() - 0.5) * 0.25);
    const end = start.clone().addScaledVector(out, reach).add(new THREE.Vector3(0, rise, 0)).add(side);
    const elbow = start.clone().addScaledVector(out, reach * 0.4).add(new THREE.Vector3(0, rise * 0.62 + reach * 0.06, 0)).addScaledVector(side, -0.4);
    const knee = start.clone().addScaledVector(out, reach * 0.72).add(new THREE.Vector3(0, rise * 0.92 + reach * 0.03, 0)).addScaledVector(side, 0.3);
    const r0 = Math.max(0.022, R * (0.36 - (t - 0.3) * 0.3) * (1 - Math.pow(t, 3) * 0.3) * thickness);
    wood.loft([start.clone().addScaledVector(out, -R * 0.3), elbow, knee, end], detail === 2 ? 16 : 6, branchSides, (u) => r0 * (1 - 0.82 * Math.pow(u, 0.8)), 1);
    const forks = detail === 0 ? 2 : 3;
    for (let f = 0; f <= forks; f++) {
      let tip: THREE.Vector3, from: THREE.Vector3;
      if (f === forks) { tip = end; from = elbow; }
      else {
        from = elbow.clone().lerp(end, 0.2 + f * 0.25 + random() * 0.1);
        const a = azimuth + (random() - 0.5) * 1.9;
        tip = from.clone().add(new THREE.Vector3(Math.cos(a) * reach * 0.42, Math.abs(rise) * (0.2 + random() * 0.4) + 0.3, Math.sin(a) * reach * 0.42));
        if (detail > 0) wood.loft([from, from.clone().lerp(tip, 0.5).add(new THREE.Vector3(0, 0.12, 0)), tip], 4, Math.max(4, branchSides - 3), (u) => r0 * 0.38 * (1 - 0.8 * u), 1);
      }
      // A crown lobe around each tip.
      const lobeRadius = (detail === 2 ? 1.45 : detail === 1 ? 1.75 : 2.2) * (0.8 + random() * 0.45) * Math.min(1.25, H / 15) * lobeScale;
      const centre = tip.clone().add(new THREE.Vector3(0, lobeRadius * 0.2, 0));
      const count = Math.round(perLobe * lobeScale * lobeScale);
      for (let k = 0; k < count; k++) {
        const d = new THREE.Vector3(random() * 2 - 1, random() * 1.6 - 0.6, random() * 2 - 1);
        if (d.lengthSq() > 1) d.normalize();
        const shell = Math.pow(d.length(), 0.6);
        const position = centre.clone().add(d.multiplyScalar(lobeRadius));
        if (!canopyAllows(position, random)) continue;
        const crownNormal = position.clone().sub(crownCentre).normalize().multiplyScalar(0.5)
          .add(position.clone().sub(centre).normalize().multiplyScalar(0.5)).add(new THREE.Vector3(0, 0.3, 0)).normalize();
        const occlusion = (0.42 + 0.58 * shell) * (0.72 + 0.28 * THREE.MathUtils.clamp((position.y - centre.y) / lobeRadius + 0.5, 0, 1));
        canopy.add(position, clusterSize * (0.8 + random() * 0.45), crownNormal, occlusion, tree, leafTint(random), random);
      }
    }
  };
  const crownStart = spec.crownStart ?? 0.42;
  const limbs = detail === 2 ? 9 : detail === 1 ? 7 : 5;
  for (let l = 0; l < limbs; l++) {
    const t = crownStart + (0.96 - crownStart) * (l + random() * 0.7) / limbs;
    limb(t, l * 2.39996 + random() * 0.6, H * (0.16 + random() * 0.1) * (1.2 - t * 0.55), H * (0.1 + random() * 0.1) * (1.1 - t * 0.3), 1);
  }
  if (spec.toward) {
    // Long, low limbs over the clearing frame the view with lit leaves.
    const azimuth = Math.atan2(spec.toward[1] - spec.z, spec.toward[0] - spec.x);
    for (let l = 0; l < 3; l++) {
      const t = 0.26 + l * 0.07 + random() * 0.03;
      limb(t, azimuth + (l - 1) * 0.55 + (random() - 0.5) * 0.3, H * (0.26 + random() * 0.08), H * (0.05 + random() * 0.05), 0.85, 0.55);
    }
  }
}

/** Thin understory tree: a slender stem, a few twigs and a small open crown. */
export function growSapling(x: number, z: number, height: number, seed: number, wood: WoodBuilder, canopy: CanopyBuilder) {
  const random = seeded(seed);
  const groundY = groundHeight(x, z);
  const tree: [number, number, number, number] = [x, groundY, z, height];
  wood.setTree(...tree);
  const top = new THREE.Vector3(x + (random() - 0.5) * height * 0.15, groundY + height, z + (random() - 0.5) * height * 0.15);
  const mid = new THREE.Vector3(x, groundY, z).lerp(top, 0.5).add(new THREE.Vector3((random() - 0.5) * 0.12, 0, (random() - 0.5) * 0.12));
  const r = 0.018 + height * 0.006;
  wood.loft([new THREE.Vector3(x, groundY - 0.1, z), mid, top], 6, 5, (t) => r * (1 - 0.8 * t), 1);
  const centre = new THREE.Vector3(x, groundY, z).lerp(top, 0.78);
  const twigs = 3 + Math.floor(random() * 3);
  for (let i = 0; i < twigs; i++) {
    const from = new THREE.Vector3(x, groundY, z).lerp(top, 0.45 + i / twigs * 0.45);
    const a = random() * TAU, reach = height * (0.15 + random() * 0.15);
    const tip = from.clone().add(new THREE.Vector3(Math.cos(a) * reach, reach * 0.5, Math.sin(a) * reach));
    wood.loft([from, from.clone().lerp(tip, 0.5).add(new THREE.Vector3(0, 0.04, 0)), tip], 3, 4, (t) => r * 0.45 * (1 - 0.8 * t), 1);
    const count = 2 + Math.floor(random() * 2);
    for (let k = 0; k < count; k++) {
      const p = tip.clone().add(new THREE.Vector3((random() - 0.5) * 0.4, (random() - 0.2) * 0.3, (random() - 0.5) * 0.4));
      const n = p.clone().sub(centre).add(new THREE.Vector3(0, 0.2, 0)).normalize();
      canopy.add(p, 0.45 + random() * 0.25, n, 0.85 + random() * 0.15, tree, leafTint(random, 0.05), random);
    }
  }
}

/** A fallen trunk: irregular, broken at both ends, half sunk into the litter. */
export function growLog(start: THREE.Vector3, end: THREE.Vector3, radius: number, seed: number, wood: WoodBuilder, detail = 2) {
  const random = seeded(seed);
  wood.setTree(start.x, start.y - 10, start.z, 1);
  const points = [0, 0.3, 0.65, 1].map((f) => start.clone().lerp(end, f).add(new THREE.Vector3(0, (random() - 0.5) * radius * 0.4, (random() - 0.5) * radius * 0.4)));
  const phase = random() * 10;
  wood.loft(points, detail === 2 ? 36 : 14, detail === 2 ? 20 : 10, (t, angle) => {
    const broken = Math.min(1, Math.min(t, 1 - t) * 9);
    const jag = 0.75 + 0.25 * Math.abs(Math.sin(angle * 3 + phase)) + 0.15 * noise3(Math.cos(angle) * 2, t * 6 + phase, Math.sin(angle) * 2);
    return radius * (1 - 0.18 * t) * (0.42 + 0.58 * Math.pow(broken, 0.5) * jag + (1 - broken) * 0.2 * jag) * (1 + 0.04 * noise3(Math.cos(angle) * 3, t * 14, Math.sin(angle) * 3 + phase));
  }, 1);
}

/**
 * World-space bark: long vertical fissures splitting it into plates, cross
 * checks, pale lichen on dry plates, moss on the side away from the sun, on
 * the damp base and on upward faces; a wet, darker foot. No textures.
 */
export function createBarkMaterial(uniforms: ForestLightUniforms, options: { key: string; color: THREE.ColorRepresentation; moss: number; upMoss: number }) {
  const away = new THREE.Vector2(-SUN_DIRECTION.x, -SUN_DIRECTION.z).normalize();
  const material = new THREE.MeshStandardMaterial({ color: options.color, roughness: 0.9, metalness: 0 });
  patchSurface(material, {
    key: `forest-bark|${options.key}`,
    fragmentHeader: GLSL_GROUND,
    color: `
vec3 bkP = vSurface;
vec3 bkN = normalize(vSurfaceNormal);
float bkH = bkP.y - forestGroundHeight(bkP.xz);
float bkPix = length(fwidth(bkP));
// Long furrows that meander a little, splitting and merging up the trunk.
// Gaussian valleys (no abs() creases) keep the derivative bump smooth.
vec2 bkWander = vec2(bwNoise(vec3(bkP.x * 1.1, bkP.y * 0.2, bkP.z * 1.1)), bwNoise(vec3(bkP.z * 1.1 + 5.0, bkP.y * 0.2, bkP.x * 1.1))) * 0.45;
vec3 bkQ = vec3(bkP.x * 7.5 + bkWander.x, bkP.y * 0.36, bkP.z * 7.5 + bkWander.y);
float bkN1 = bwNoise(bkQ);
float bkN2 = bwNoise(bkQ * vec3(2.2, 1.6, 2.2) + 3.1);
float bkResolve = bwResolve(bkPix * 11.0);
float bkResolve2 = bwResolve(bkPix * 24.0);
// Deep primary furrows (~10 cm apart), shallower splits between them; the
// ridge tops between furrows are the weathered, lichen-grey plates.
float bkFissure = exp(-bkN1 * bkN1 * 20.0) * bkResolve;
float bkSplit = exp(-bkN2 * bkN2 * 45.0) * bkResolve2 * 0.45;
float bkRidge = (1.0 - exp(-bkN1 * bkN1 * 5.0)) * (1.0 - bkSplit);
float bkPlate = bwNoise(vec3(bkP.x * 3.0, bkP.y * 0.6, bkP.z * 3.0) + 3.0);
float bkFine = bwNoise(bkP * vec3(34.0, 9.0, 34.0)) * bwResolve(bkPix * 34.0);
float bkMacro = bwNoise(bkP * vec3(0.6, 0.2, 0.6) + 11.0);
vec3 bkColor = diffuseColor.rgb * (0.8 + 0.14 * bkPlate + 0.18 * bkMacro + 0.14 * bkFine);
bkColor *= mix(1.0, 0.7 + 0.6 * bkRidge, bkResolve);
bkColor = mix(bkColor, bkColor * 0.3, max(bkFissure, bkSplit));
float bkLichen = smoothstep(0.28, 0.62, bwNoise(bkP * 1.7 + 5.0) * 0.7 + bwNoise(bkP * 7.0) * 0.3) * (1.0 - bkFissure) * smoothstep(0.8, 2.8, bkH);
bkColor = mix(bkColor, vec3(0.38, 0.4, 0.33) * (0.85 + 0.3 * bkFine), bkLichen * 0.6 * bkRidge * bkRidge);
// Dark rain streaks run down from branch forks.
bkColor *= 1.0 - 0.3 * smoothstep(0.35, 0.75, bwNoise(vec3(bkP.x * 2.2, bkP.y * 0.07, bkP.z * 2.2) + 19.0));
float bkMossNoise = bwNoise(bkP * 2.1 + 1.7);
float bkShade = dot(normalize(bkN.xz + 1e-4), vec2(${away.x.toFixed(4)}, ${away.y.toFixed(4)})) * (1.0 - abs(bkN.y));
float bkMoss = smoothstep(-0.1, 0.55, bkShade + 0.4 * bkMossNoise) * (1.0 - smoothstep(0.5, 3.6, bkH + 1.2 * bkMossNoise)) * ${options.moss.toFixed(3)};
bkMoss = max(bkMoss, smoothstep(0.35, 0.8, bkN.y + 0.3 * bkMossNoise) * ${options.upMoss.toFixed(3)});
// Moss creeps up the furrows first; its own texture is fine-grained, not blotchy.
bkMoss = clamp(bkMoss * (0.8 + 0.4 * bkFissure) + bkFissure * bkMoss * 0.3, 0.0, 1.0);
float bkMossGrain = bwNoise(bkP * 38.0) * bwResolve(bkPix * 38.0);
vec3 bkMossColor = mix(vec3(0.05, 0.08, 0.015), vec3(0.15, 0.21, 0.04), clamp(0.45 + 0.35 * bkMossGrain + 0.3 * bkN.y + 0.2 * bwNoise(bkP * 3.0), 0.0, 1.0));
bkColor = mix(bkColor, bkMossColor, bkMoss);
float bkWet = 1.0 - smoothstep(0.0, 0.6, bkH + 0.25 * bkMossNoise);
bkColor *= mix(1.0, 0.6, bkWet * (1.0 - bkMoss));
diffuseColor.rgb = bkColor;`,
    height: '(-bkFissure * 0.009 - bkSplit * 0.004 + bkRidge * 0.002 + bkFine * 0.0004) * (1.0 - bkMoss * 0.75) + bkMoss * bwNoise(bkP * 20.0) * 0.0015 * bwResolve(bkPix * 20.0)',
    roughness: 'roughnessFactor = clamp(mix(mix(0.84 + 0.1 * bkFissure, 0.97, bkMoss), 0.38, bkWet * (1.0 - bkMoss)), 0.04, 1.0);',
  });
  return applyForestSurface(material, uniforms, { key: `forest-bark|${options.key}`, treeWind: true });
}

/** Alpha-cut canopy cards with crown shading, translucency and three-level wind. */
export function createCanopyMaterial(uniforms: ForestLightUniforms, atlas: THREE.Texture, key: string, translucency = 1) {
  const material = new THREE.MeshStandardMaterial({
    map: atlas, alphaTest: 0.5, alphaToCoverage: true, side: THREE.DoubleSide, roughness: 0.6, metalness: 0,
  });
  return applyForestSurface(material, uniforms, { key, translucency, treeWind: true, sway: 0.06, flutter: 0.028, crown: true, alphaMipBoost: 0.3 });
}
