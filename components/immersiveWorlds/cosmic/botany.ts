import * as THREE from 'three';

export type PlantKind = 'fern' | 'broadleaf' | 'grass' | 'blossom';

/** Pulse positions are in world space; age and update time are in seconds. */
export interface BotanicalPulse {
  position: THREE.Vector3;
  age: number;
}

export interface BotanicalModel {
  group: THREE.Group;
  interactables: THREE.Object3D[];
  update(time: number, pulse?: BotanicalPulse | null): void;
  dispose(): void;
}

type Random = () => number;
type Family = 0 | 1 | 2 | 3 | 4;

interface Leaf {
  root: THREE.Vector3;
  direction: THREE.Vector3;
  length: number;
  width: number;
  color: THREE.Color;
  phase: number;
  family?: Family;
  arch?: number;
  droop?: number;
  cup?: number;
  twist?: number;
  roll?: number;
  surfaceNormal?: THREE.Vector3;
}

interface PlantPlacement {
  kind: PlantKind;
  seed: number;
  x?: number;
  z?: number;
  scale?: number;
  rotation?: number;
}

const UP = new THREE.Vector3(0, 1, 0);
const TAU = Math.PI * 2;

function randomFrom(seed: number): Random {
  let state = seed | 0;
  return () => {
    state += 0x6d2b79f5;
    let value = Math.imul(state ^ (state >>> 15), state | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function jade(random: Random, young = false): THREE.Color {
  // Natural, slightly olive greens; the light makes them glow, not the albedo.
  return new THREE.Color().setHSL(
    0.27 + random() * 0.07,
    0.30 + random() * 0.16,
    (young ? 0.20 : 0.12) + random() * 0.07,
  );
}

/** A small indexed-geometry builder keeps each botanical patch to 2–3 draws. */
class BotanicalGeometry {
  positions: number[] = [];
  colors: number[] = [];
  uvs: number[] = [];
  leafData: number[] = [];
  indices: number[] = [];

  vertex(position: THREE.Vector3, u: number, v: number, color: THREE.Color, phase: number, family: Family, weight: number): number {
    const index = this.positions.length / 3;
    this.positions.push(position.x, position.y, position.z);
    this.colors.push(color.r, color.g, color.b);
    this.uvs.push(u, v);
    this.leafData.push(phase, family, weight, 0);
    return index;
  }

  append(source: BotanicalGeometry, matrix: THREE.Matrix4): void {
    const offset = this.positions.length / 3;
    const point = new THREE.Vector3();
    for (let i = 0; i < source.positions.length; i += 3) {
      point.fromArray(source.positions, i).applyMatrix4(matrix);
      this.positions.push(point.x, point.y, point.z);
    }
    // Avoid spreading large arrays: a garden can contain thousands of leaflets.
    for (const value of source.colors) this.colors.push(value);
    for (const value of source.uvs) this.uvs.push(value);
    for (const value of source.leafData) this.leafData.push(value);
    for (const index of source.indices) this.indices.push(index + offset);
  }

  geometry(): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(this.colors, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(this.uvs, 2));
    geometry.setAttribute('aBotany', new THREE.Float32BufferAttribute(this.leafData, 4));
    geometry.setIndex(this.indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    // Leave room for the shader's small breeze and touch displacement.
    geometry.boundingBox?.expandByScalar(0.06);
    if (geometry.boundingSphere) geometry.boundingSphere.radius += 0.06;
    return geometry;
  }
}

function addLeaf(batch: BotanicalGeometry, leaf: Leaf): void {
  const family = leaf.family ?? 0;
  // Fern leaflets are small on screen: fewer rows keep the garden well under
  // a million triangles without changing their silhouette.
  const segments = family === 1 ? 6 : family === 2 ? 10 : family === 3 ? 12 : 14;
  const across = family === 2 ? 2 : family === 1 ? 2 : 6;
  const axis = leaf.direction.clone().normalize();
  const right = new THREE.Vector3().crossVectors(axis, leaf.surfaceNormal ?? UP);
  if (right.lengthSq() < 0.0001) right.set(1, 0, 0);
  right.normalize();
  const normal = new THREE.Vector3().crossVectors(right, axis).normalize();
  if (leaf.roll) {
    right.applyAxisAngle(axis, leaf.roll);
    normal.applyAxisAngle(axis, leaf.roll);
  }
  const base = batch.positions.length / 3;
  const point = new THREE.Vector3();

  for (let row = 0; row <= segments; row++) {
    const t = row / segments;
    // Very narrow terminal rows retain good normals without coincident vertices.
    let profile = Math.max(0.004, Math.pow(Math.sin(Math.PI * t), family === 0 ? 0.58 : family === 3 ? 0.65 : 0.72));
    if (family === 2) profile = Math.max(0.004, (0.83 + 0.17 * Math.sin(Math.PI * t)) * Math.pow(1 - t, 0.72));
    if (family === 1) profile *= 1 + Math.sin(t * Math.PI * 15) * 0.055;
    const centerCurve = (leaf.arch ?? 0.12) * Math.sin(t * Math.PI) + (leaf.droop ?? -0.09) * t * t;
    for (let column = 0; column <= across; column++) {
      const u = (column / across) * 2 - 1;
      const asymmetry = 1 + u * 0.07 * Math.sin(t * Math.PI + leaf.phase);
      const fold = (leaf.cup ?? -0.055) * Math.pow(Math.abs(u), 1.45) * Math.sin(Math.PI * t);
      const twist = (leaf.twist ?? 0.035) * u * Math.sin(Math.PI * t) * t;
      point.copy(leaf.root)
        .addScaledVector(axis, leaf.length * t)
        .addScaledVector(right, u * leaf.width * 0.5 * profile * asymmetry)
        .addScaledVector(normal, leaf.length * (centerCurve + fold + twist));
      const flex = Math.max(0, leaf.root.y) * 0.20 + t * t * 0.72;
      batch.vertex(point, (u + 1) * 0.5, t, leaf.color, leaf.phase, family, flex);
    }
  }
  for (let row = 0; row < segments; row++) {
    for (let column = 0; column < across; column++) {
      const a = base + row * (across + 1) + column;
      const b = a + across + 1;
      batch.indices.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
}

function addStem(batch: BotanicalGeometry, points: THREE.Vector3[], radius: number, color: THREE.Color, phase = 0, segments = 12): void {
  const curve = new THREE.CatmullRomCurve3(points);
  const frames = curve.computeFrenetFrames(segments, false);
  const sides = 5;
  const base = batch.positions.length / 3;
  const point = new THREE.Vector3();
  for (let row = 0; row <= segments; row++) {
    const t = row / segments;
    const center = curve.getPointAt(t);
    const thickness = radius * (1 - 0.68 * t);
    for (let side = 0; side <= sides; side++) {
      const angle = (side / sides) * TAU;
      point.copy(center)
        .addScaledVector(frames.normals[row], Math.cos(angle) * thickness)
        .addScaledVector(frames.binormals[row], Math.sin(angle) * thickness);
      batch.vertex(point, side / sides, t, color, phase, 4, Math.max(0, point.y) * 0.20);
    }
  }
  for (let row = 0; row < segments; row++) {
    for (let side = 0; side < sides; side++) {
      const a = base + row * (sides + 1) + side;
      const b = a + sides + 1;
      batch.indices.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
}

function addPollen(batch: BotanicalGeometry, center: THREE.Vector3, radius: number, color: THREE.Color, phase: number): void {
  const rows = 5;
  const sides = 8;
  const base = batch.positions.length / 3;
  for (let row = 0; row <= rows; row++) {
    const phi = (row / rows) * Math.PI;
    for (let side = 0; side <= sides; side++) {
      const theta = (side / sides) * TAU;
      const point = new THREE.Vector3(
        center.x + Math.cos(theta) * Math.sin(phi) * radius,
        center.y + Math.cos(phi) * radius * 0.68,
        center.z + Math.sin(theta) * Math.sin(phi) * radius,
      );
      batch.vertex(point, side / sides, row / rows, color, phase, 4, center.y * 0.20);
    }
  }
  for (let row = 0; row < rows; row++) {
    for (let side = 0; side < sides; side++) {
      const a = base + row * (sides + 1) + side;
      const b = a + sides + 1;
      batch.indices.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
}

function growBroadleaf(leaves: BotanicalGeometry, stems: BotanicalGeometry, random: Random): void {
  const stalkColor = new THREE.Color('#355937');
  const offsetAngle = random() * TAU;
  // Interleaved shoots and a basal rosette build a continuous canopy instead of
  // putting tiny leaves at intervals on a conspicuous, bare central cane.
  for (let shoot = 0; shoot < 3; shoot++) {
    const shootAngle = offsetAngle + shoot * 2.39996;
    const shootRadial = new THREE.Vector3(Math.sin(shootAngle), 0, Math.cos(shootAngle));
    const height = [0.94, 0.72, 0.57][shoot];
    const root = shootRadial.clone().multiplyScalar(0.10 + shoot * 0.025);
    const lean = shootRadial.clone().multiplyScalar(0.07 + shoot * 0.027);
    const crown = root.clone().add(lean).addScaledVector(UP, height);
    const phase = random() * TAU;
    addStem(stems, [root, root.clone().addScaledVector(UP, height * 0.43), crown], 0.013, stalkColor, phase);
    for (let tier = 0; tier < 8; tier++) {
      const t = 0.13 + tier * 0.113;
      const angle = offsetAngle + tier * 2.39996 + shoot * 1.73;
      const radial = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
      const attachment = root.clone().addScaledVector(UP, height * t).addScaledVector(lean, t);
      const petiole = 0.055 + (1 - t) * 0.075;
      const leafRoot = attachment.clone().addScaledVector(radial, petiole).addScaledVector(UP, 0.065 + t * 0.035);
      addStem(stems, [attachment, attachment.clone().lerp(leafRoot, 0.6).addScaledVector(UP, 0.018), leafRoot], 0.0045, stalkColor, phase, 5);
      const length = (0.51 + random() * 0.12) * (1 - tier * 0.042) * (shoot === 2 ? 0.86 : 1);
      addLeaf(leaves, {
        root: leafRoot,
        direction: radial.clone().addScaledVector(UP, 0.28 + tier * 0.073),
        length,
        width: length * (0.60 + random() * 0.16),
        color: jade(random, tier > 5),
        phase,
        arch: 0.11 + random() * 0.08,
        droop: -0.16 - random() * 0.15,
        cup: -0.075 - random() * 0.025,
        twist: (random() - 0.5) * 0.19,
        roll: (random() - 0.5) * 0.34,
      });
    }
  }
  for (let leaf = 0; leaf < 6; leaf++) {
    const angle = offsetAngle + leaf * 2.39996;
    const radial = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const root = radial.clone().multiplyScalar(0.035);
    const attachment = radial.clone().multiplyScalar(0.13).addScaledVector(UP, 0.16 + random() * 0.085);
    const phase = random() * TAU;
    addStem(stems, [root, root.clone().lerp(attachment, 0.55).addScaledVector(UP, 0.02), attachment], 0.006, stalkColor, phase, 8);
    const length = 0.56 + random() * 0.10;
    addLeaf(leaves, {
      root: attachment, direction: radial.clone().addScaledVector(UP, 0.32 + random() * 0.20),
      length, width: length * (0.65 + random() * 0.09), color: jade(random), phase,
      arch: 0.14, droop: -0.31, cup: -0.085,
      twist: (random() - 0.5) * 0.18, roll: (random() - 0.5) * 0.27,
    });
  }
}

function growFern(leaves: BotanicalGeometry, stems: BotanicalGeometry, random: Random): void {
  const stalkColor = new THREE.Color('#3b6035');
  const rotation = random() * TAU;
  for (let frond = 0; frond < 11; frond++) {
    const angle = rotation + frond * 2.39996 + random() * 0.18;
    const radial = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const right = new THREE.Vector3(Math.cos(angle), 0, -Math.sin(angle));
    const size = 0.70 + random() * 0.32;
    const upright = frond < 3;
    const reach = upright ? 0.69 : 1.01;
    const peak = upright ? 1.00 : 0.72 + random() * 0.14;
    const phase = random() * TAU;
    const root = radial.clone().multiplyScalar(0.015 + random() * 0.045);
    const points = [
      root,
      radial.clone().multiplyScalar(0.12 * size).addScaledVector(UP, 0.27 * size),
      radial.clone().multiplyScalar(reach * 0.53 * size).addScaledVector(UP, peak * size),
      radial.clone().multiplyScalar(reach * size).addScaledVector(UP, (upright ? 0.91 : 0.41 + random() * 0.20) * size),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    addStem(stems, points, 0.0065, stalkColor, phase, 20);
    for (let pair = 0; pair < 14; pair++) {
      const t = 0.15 + pair * 0.0615;
      const taper = Math.pow(Math.sin(Math.PI * (0.18 + pair / 14 * 0.80)), 0.73);
      for (const side of [-1, 1]) {
        const stagger = side === 1 ? 0.011 : 0;
        const attachment = curve.getPoint(Math.min(0.985, t + stagger));
        const tangent = curve.getTangent(t).normalize();
        const surfaceNormal = new THREE.Vector3().crossVectors(right, tangent).normalize();
        if (surfaceNormal.y < 0) surfaceNormal.negate();
        const length = (0.285 + random() * 0.045) * taper * size;
        addLeaf(leaves, {
          root: attachment,
          direction: right.clone().multiplyScalar(side).addScaledVector(tangent, 0.29 + pair * 0.013).addScaledVector(UP, 0.045),
          length,
          width: length * (0.36 + random() * 0.09),
          color: jade(random, upright && pair > 10),
          phase,
          family: 1,
          arch: 0.08,
          droop: -0.09,
          cup: -0.036,
          twist: side * 0.035,
          roll: side * (0.035 + random() * 0.10),
          surfaceNormal,
        });
      }
    }
    addLeaf(leaves, {
      root: curve.getPoint(0.93), direction: curve.getTangent(0.96),
      length: 0.12 * size, width: 0.038 * size, color: jade(random, true), phase, family: 1,
    });
  }
}

function growGrass(leaves: BotanicalGeometry, stems: BotanicalGeometry, random: Random): void {
  for (let blade = 0; blade < 38; blade++) {
    const angle = random() * TAU;
    const radius = Math.sqrt(random()) * 0.15;
    const radial = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const root = radial.clone().multiplyScalar(radius);
    const length = 0.40 + random() * 0.47;
    addLeaf(leaves, {
      root,
      direction: radial.clone().multiplyScalar(0.08 + random() * 0.27).addScaledVector(UP, 1),
      length,
      width: 0.012 + random() * 0.026,
      color: jade(random, blade % 6 === 0),
      phase: random() * TAU,
      family: 2,
      arch: -0.06,
      droop: -0.22 - random() * 0.23,
      cup: -0.024,
      twist: (random() - 0.5) * 0.08,
      roll: (random() - 0.5) * 0.7,
    });
  }
  // A few fine bronze-green seed stems interrupt the uniform blade silhouette.
  for (let stem = 0; stem < 4; stem++) {
    const angle = random() * TAU;
    const tip = new THREE.Vector3(Math.sin(angle) * 0.15, 0.60 + random() * 0.28, Math.cos(angle) * 0.15);
    addStem(stems, [new THREE.Vector3(), tip.clone().multiplyScalar(0.55).add(new THREE.Vector3(0, 0.045, 0)), tip], 0.0018, new THREE.Color('#787b42'), angle);
    for (let seed = 0; seed < 5; seed++) {
      const start = tip.clone().addScaledVector(UP, -seed * 0.025);
      addLeaf(leaves, {
        root: start, direction: new THREE.Vector3(Math.sin(angle + seed * 2.4) * 0.35, 1, Math.cos(angle + seed * 2.4) * 0.35),
        length: 0.042, width: 0.009, color: new THREE.Color('#8e9060'), phase: angle, family: 2,
        arch: 0.015, droop: 0,
      });
    }
  }
}

function growBlossom(leaves: BotanicalGeometry, stems: BotanicalGeometry, pollen: BotanicalGeometry, random: Random): void {
  const green = new THREE.Color('#527f55');
  const gold = new THREE.Color('#dbbe69');
  const rotation = random() * TAU;
  for (let shoot = 0; shoot < 5; shoot++) {
    const angle = rotation + shoot * 2.4;
    const radial = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const root = radial.clone().multiplyScalar(0.055 + random() * 0.08);
    const height = 0.58 + random() * 0.44;
    const top = root.clone().addScaledVector(radial, 0.06 + random() * 0.10).addScaledVector(UP, height);
    const phase = random() * TAU;
    const points = [root, root.clone().lerp(top, 0.5).addScaledVector(radial, -0.035), top];
    const curve = new THREE.CatmullRomCurve3(points);
    addStem(stems, points, 0.0045, green, phase, 16);
    for (let node = 0; node < 3; node++) {
      const directionAngle = angle + node * 2.2;
      const leafAxis = new THREE.Vector3(Math.sin(directionAngle), 0.45, Math.cos(directionAngle));
      addLeaf(leaves, {
        root: curve.getPoint(0.22 + node * 0.19), direction: leafAxis,
        length: 0.22 - node * 0.025, width: 0.055, color: jade(random, node === 2), phase,
        arch: 0.09, droop: -0.12, twist: 0.055,
      });
    }
    // Six separate cupped laminae make a open, dimensional corolla.
    for (let petal = 0; petal < 6; petal++) {
      const petalAngle = angle + (petal / 6) * TAU;
      const petalAxis = new THREE.Vector3(Math.sin(petalAngle), 0.10 + random() * 0.08, Math.cos(petalAngle));
      const petalColor = new THREE.Color().setHSL(0.73 + random() * 0.035, 0.14 + random() * 0.12, 0.71 + random() * 0.14);
      addLeaf(leaves, {
        root: top.clone().addScaledVector(petalAxis, 0.004), direction: petalAxis,
        length: 0.105 + random() * 0.025, width: 0.073 + random() * 0.012,
        color: petalColor, phase, family: 3,
        arch: 0.13, droop: 0.05, cup: 0.075, twist: (random() - 0.5) * 0.06,
      });
    }
    addPollen(pollen, top.clone().addScaledVector(UP, 0.012), 0.022, gold, phase);
    for (let anther = 0; anther < 7; anther++) {
      const theta = (anther / 7) * TAU + angle;
      const tip = top.clone().add(new THREE.Vector3(Math.sin(theta) * 0.023, 0.035 + random() * 0.016, Math.cos(theta) * 0.023));
      addStem(stems, [top, tip.clone().lerp(top, 0.4), tip], 0.0011, gold, phase, 3);
      addPollen(pollen, tip, 0.0045, gold, phase);
    }
  }
}

function buildPlant(kind: PlantKind, seed: number): [BotanicalGeometry, BotanicalGeometry, BotanicalGeometry] {
  const leaves = new BotanicalGeometry();
  const stems = new BotanicalGeometry();
  const pollen = new BotanicalGeometry();
  const random = randomFrom(seed);
  if (kind === 'fern') growFern(leaves, stems, random);
  else if (kind === 'grass') growGrass(leaves, stems, random);
  else if (kind === 'blossom') growBlossom(leaves, stems, pollen, random);
  else growBroadleaf(leaves, stems, random);
  return [leaves, stems, pollen];
}

interface BotanyUniforms {
  uBotanyTime: { value: number };
  uBotanyPulse: { value: THREE.Vector4 };
  /** World direction toward the key star and its diffuse radiance scale. */
  uBotanyKeyDir: { value: THREE.Vector3 };
  uBotanyKeyColor: { value: THREE.Vector3 };
}

/** One leaf/stem/pollen material set; a garden shares it across every plant. */
export interface BotanyMaterialSet {
  uniforms: BotanyUniforms;
  materials: readonly [THREE.MeshStandardMaterial, THREE.MeshStandardMaterial, THREE.MeshStandardMaterial];
  dispose(): void;
}

const vertexDeclarations = /* glsl */ `
  attribute vec4 aBotany;
  uniform float uBotanyTime;
  uniform vec4 uBotanyPulse;
  varying vec2 vBotanyUv;
  varying vec4 vBotanyData;
  varying float vBotanyTouch;
`;

const vertexDeformation = /* glsl */ `
  vBotanyUv = uv;
  vBotanyData = aBotany;
  vec3 botanyWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
  float botanyBreeze = sin(uBotanyTime * 0.71 + botanyWorld.x * 0.47 + botanyWorld.z * 0.37);
  float botanyFlutter = sin(uBotanyTime * 1.37 + aBotany.x + uv.y * 2.1);
  float botanyWeight = min(aBotany.z, 1.25);
  transformed.x += (botanyBreeze * 0.010 + botanyFlutter * 0.0025) * botanyWeight;
  transformed.z += (botanyBreeze * 0.005 + cos(uBotanyTime * 0.53 + aBotany.x) * 0.002) * botanyWeight;
  float botanyAge = max(0.0, uBotanyPulse.w);
  float botanyDistance = distance(botanyWorld, uBotanyPulse.xyz);
  float botanyRing = exp(-pow((botanyDistance - botanyAge * 1.7) / 0.55, 2.0));
  vBotanyTouch = uBotanyPulse.w < 0.0 ? 0.0 : botanyRing * exp(-botanyAge * 0.8);
  transformed.y += sin(botanyAge * 5.0 - botanyDistance * 3.0) * vBotanyTouch * botanyWeight * 0.018;
`;

const fragmentDeclarations = /* glsl */ `
  uniform float uBotanyTime;
  uniform vec3 uBotanyKeyDir;
  uniform vec3 uBotanyKeyColor;
  varying vec2 vBotanyUv;
  varying vec4 vBotanyData;
  varying float vBotanyTouch;
  float botanyHash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float botanyNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(botanyHash(i), botanyHash(i + vec2(1.0, 0.0)), f.x),
      mix(botanyHash(i + vec2(0.0, 1.0)), botanyHash(i + vec2(1.0)), f.x), f.y);
  }
`;

function createMaterial(uniforms: BotanyUniforms, kind: 'leaf' | 'stem' | 'pollen'): THREE.MeshStandardMaterial {
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    roughness: kind === 'leaf' ? 0.58 : kind === 'pollen' ? 0.5 : 0.78,
    metalness: 0,
    specularIntensity: kind === 'leaf' ? 0.45 : 0.4,
    side: kind === 'leaf' ? THREE.DoubleSide : THREE.FrontSide,
  });
  material.name = `Cosmic garden ${kind}`;
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${vertexDeclarations}`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>\n${vertexDeformation}`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>\n${fragmentDeclarations}`);
    if (kind === 'leaf') {
      shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', /* glsl */ `
        #include <color_fragment>
        float leafX = abs(vBotanyUv.x - 0.5) * 2.0;
        float leafY = vBotanyUv.y;
        float leafFamily = vBotanyData.y;
        float leafAA = max(fwidth(leafX), 0.0012);
        float leafMidribWidth = mix(0.040, 0.010, leafY);
        float leafMidrib = 1.0 - smoothstep(leafMidribWidth, leafMidribWidth + leafAA, leafX);
        float leafBranches = leafY * (leafFamily > 0.5 && leafFamily < 1.5 ? 8.0 : 6.5) - pow(leafX, 0.82) * 1.8;
        float leafBranchDistance = abs(fract(leafBranches + 0.5) - 0.5);
        float leafBranchAA = max(fwidth(leafBranches), 0.01);
        float leafBranchVein = 1.0 - smoothstep(0.025, 0.025 + leafBranchAA, leafBranchDistance);
        leafBranchVein *= (1.0 - smoothstep(0.45, 0.94, leafX)) * smoothstep(0.04, 0.17, leafY) * (1.0 - smoothstep(0.84, 1.0, leafY));
        float leafGrain = botanyNoise(vBotanyUv * vec2(26.0, 57.0) + vBotanyData.x * 3.0);
        float leafMottle = botanyNoise(vBotanyUv * vec2(4.0, 8.0) + vBotanyData.x);
        float leafVeins = max(leafMidrib * 0.38, leafBranchVein * 0.17);
        if (leafFamily > 1.5 && leafFamily < 2.5) leafVeins = leafMidrib * 0.27;
        if (leafFamily > 2.5) leafVeins = leafMidrib * 0.08 + leafBranchVein * 0.035;
        vec3 leafVeinColor = leafFamily > 2.5 ? vec3(0.62, 0.55, 0.73) : vec3(0.30, 0.42, 0.10);
        diffuseColor.rgb *= 0.86 + leafMottle * 0.20 + leafGrain * 0.05;
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.6 + leafVeinColor * 0.25, leafVeins);
        // Older, sun-bleached tips and a slightly darker rim, like real laminae.
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(1.25, 1.12, 0.72), smoothstep(0.72, 1.0, leafY) * 0.35);
        diffuseColor.rgb *= 1.0 - 0.12 * pow(leafX, 4.0);
      `).replace('#include <roughnessmap_fragment>', /* glsl */ `
        #include <roughnessmap_fragment>
        roughnessFactor *= 0.93 + leafGrain * 0.12 - leafVeins * 0.12;
      `).replace('#include <opaque_fragment>', /* glsl */ `
        // Translucent lamina: starlight passing through glows yellow-green,
        // strongest when the viewer looks toward the star through the leaf.
        vec3 leafKey = normalize((viewMatrix * vec4(uBotanyKeyDir, 0.0)).xyz);
        vec3 leafView = normalize(vViewPosition);
        float leafBehind = clamp(dot(-normal, leafKey), 0.0, 1.0);
        float leafThrough = pow(clamp(dot(-leafView, leafKey), 0.0, 1.0), 3.0);
        float leafThinness = (1.0 - leafVeins * 0.8) * (0.55 + leafX * 0.45) * (leafFamily > 2.5 ? 1.3 : 1.0);
        vec3 leafTransmit = diffuseColor.rgb * vec3(1.35, 1.45, 0.62) + vec3(0.010, 0.018, 0.0);
        outgoingLight += leafTransmit * uBotanyKeyColor * leafThinness * leafBehind * (0.16 + 0.75 * leafThrough);
        // Restrained bioluminescence: a few fern fronds' young tips, faint veins
        // in the broad leaves and the inner petals, each breathing on its own.
        float leafSeed = fract(vBotanyData.x * 0.1591549 * 7.0);
        float leafBreath = 0.75 + 0.25 * sin(uBotanyTime * 0.21 + vBotanyData.x * 3.1);
        // Distant islands must not sparkle: the glow fades out beyond a few metres.
        float leafNear = 1.0 - smoothstep(6.0, 14.0, length(vViewPosition));
        float leafTips = (leafFamily > 0.5 && leafFamily < 1.5) ? smoothstep(0.65, 1.0, leafY) * step(0.8, leafSeed) * leafNear : 0.0;
        float leafVeinGlow = leafFamily < 0.5 ? leafVeins * step(0.5, leafSeed) * 0.5 : 0.0;
        float leafHeart = leafFamily > 2.5 ? (1.0 - smoothstep(0.0, 0.45, leafY)) * 0.8 : 0.0;
        vec3 leafGlowColor = leafFamily > 2.5 ? vec3(0.60, 0.42, 0.95) : vec3(0.16, 0.85, 0.62);
        outgoingLight += leafGlowColor * (leafTips * 0.10 + leafVeinGlow * 0.08 + leafHeart * 0.22) * leafBreath;
        outgoingLight += vec3(0.30, 0.95, 0.72) * vBotanyTouch * 0.55;
        #include <opaque_fragment>
      `);
    } else if (kind === 'pollen') {
      shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>', /* glsl */ `
        // Luminous anthers: a warm HDR core the bloom softens, slowly breathing.
        // Only nearby anthers glow; far away they would sparkle like glitter.
        float pollenNear = 1.0 - smoothstep(4.0, 11.0, length(vViewPosition));
        float pollenBreath = 0.7 + 0.3 * sin(uBotanyTime * 0.17 + vBotanyData.x * 2.3);
        outgoingLight += vec3(1.0, 0.72, 0.34) * (0.03 + 0.42 * pollenNear) * pollenBreath + vec3(0.30, 0.95, 0.72) * vBotanyTouch * 1.5;
        #include <opaque_fragment>
      `);
    } else {
      shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>', /* glsl */ `
        outgoingLight += vec3(0.30, 0.95, 0.72) * vBotanyTouch * 0.25;
        #include <opaque_fragment>
      `);
    }
  };
  material.customProgramCacheKey = () => `cosmic-botany-v3-${kind}`;
  return material;
}

/** Leaf, stem and pollen materials with one set of uniforms, shared by many plants. */
export function createBotanyMaterials(): BotanyMaterialSet {
  const uniforms: BotanyUniforms = {
    uBotanyTime: { value: 0 },
    uBotanyPulse: { value: new THREE.Vector4(0, 0, 0, -1) },
    uBotanyKeyDir: { value: new THREE.Vector3(-0.74, 0.42, -0.52).normalize() },
    uBotanyKeyColor: { value: new THREE.Vector3(1.0, 0.93, 0.84).multiplyScalar(3.4 / Math.PI) },
  };
  const materials = [createMaterial(uniforms, 'leaf'), createMaterial(uniforms, 'stem'), createMaterial(uniforms, 'pollen')] as const;
  let disposed = false;
  return {
    uniforms,
    materials,
    dispose() {
      if (disposed) return;
      disposed = true;
      materials.forEach((material) => material.dispose());
    },
  };
}

function createModel(placements: PlantPlacement[], label: string, shared?: BotanyMaterialSet): BotanicalModel {
  const group = new THREE.Group();
  group.name = label;
  group.userData.botanical = true;
  const batches = [new BotanicalGeometry(), new BotanicalGeometry(), new BotanicalGeometry()];
  for (const placement of placements) {
    const pieces = buildPlant(placement.kind, placement.seed);
    const scale = placement.scale ?? 1;
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(placement.x ?? 0, 0, placement.z ?? 0),
      new THREE.Quaternion().setFromAxisAngle(UP, placement.rotation ?? 0),
      new THREE.Vector3(scale, scale, scale),
    );
    pieces.forEach((piece, index) => batches[index].append(piece, matrix));
  }
  // A plant either owns its materials or borrows a garden-wide set.
  const owned = shared ? null : createBotanyMaterials();
  const set = shared ?? owned!;
  const uniforms = set.uniforms;
  const geometries: THREE.BufferGeometry[] = [];
  const interactables: THREE.Object3D[] = [];
  const kinds = ['leaf', 'stem', 'pollen'] as const;
  const used = new Set<THREE.Material>();
  batches.forEach((batch, index) => {
    if (!batch.indices.length) return;
    const geometry = batch.geometry();
    const material = set.materials[index];
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = `${label} ${kinds[index]}`;
    mesh.userData.botanical = true;
    mesh.userData.plantKind = placements.length === 1 ? placements[0].kind : 'garden';
    mesh.userData.label = label;
    // Receiving shadows gives leaves depth; avoiding animated shadow passes keeps
    // a dense ground layer inexpensive and prevents mismatched wind silhouettes.
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    group.add(mesh);
    used.add(material);
    geometries.push(geometry);
    if (index === 0) interactables.push(mesh);
  });
  // An owned set disposes only what this plant actually used, exactly once.
  if (owned) owned.materials.forEach((material) => { if (!used.has(material)) material.dispose(); });
  let disposed = false;
  return {
    group,
    interactables,
    update(time, pulse) {
      if (disposed) return;
      uniforms.uBotanyTime.value = Number.isFinite(time) ? time : 0;
      if (pulse && pulse.age >= 0 && pulse.age < 7) {
        uniforms.uBotanyPulse.value.set(pulse.position.x, pulse.position.y, pulse.position.z, pulse.age);
      } else {
        uniforms.uBotanyPulse.value.w = -1;
      }
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      geometries.forEach((geometry) => geometry.dispose());
      if (owned) used.forEach((material) => material.dispose());
      group.clear();
      interactables.length = 0;
    },
  };
}

/** A local, meter-scale plant. Move/rotate/scale its group freely after creation. */
export function createPlant(kind: PlantKind, seed = 1, shared?: BotanyMaterialSet): BotanicalModel {
  const names: Record<PlantKind, string> = {
    fern: 'Jade fern', broadleaf: 'Verdant leaves', grass: 'Silvergrass', blossom: 'Moon blossoms',
  };
  return createModel([{ kind, seed }], names[kind], shared);
}

/** A natural mixed planting, centered at the origin and approximately 3 m wide. */
export function createBotany(seed = 1, shared?: BotanyMaterialSet): BotanicalModel {
  return createModel([
    { kind: 'broadleaf', seed: seed + 3, x: -0.37, z: 0.28, rotation: 0.8 },
    { kind: 'fern', seed: seed + 11, x: 0.46, z: 0.24, scale: 0.9, rotation: 1.2 },
    { kind: 'blossom', seed: seed + 23, x: -0.05, z: -0.19, rotation: 0.3 },
    { kind: 'grass', seed: seed + 37, x: -0.77, z: -0.16, scale: 0.85 },
    { kind: 'grass', seed: seed + 43, x: 0.73, z: -0.14, scale: 0.73, rotation: 1.8 },
    { kind: 'fern', seed: seed + 59, x: -0.22, z: -0.51, scale: 0.67, rotation: 2.5 },
  ], 'Moon garden planting', shared);
}
