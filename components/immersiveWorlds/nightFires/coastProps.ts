import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { noise3 } from '../shared/render/noise';
import { createWoodMaterial } from '../shared/render/woodSurface';
import { createFabricMaterial } from '../shared/render/fabricSurface';
import { patchSurface } from '../shared/render/interiorSurface';
import { seeded } from './scenery';

/*
 * Camp furniture for the coast clearing (original geometry, procedural
 * surfaces only): a weathered deck that runs out over the water, a folding
 * canvas chair, a stacked log pile, a slatted crate, an old hurricane lantern
 * and an enamel mug. Props merged into one mesh keep their own wood frame
 * through `surfaceLocal` attributes, so grain never runs across a gap.
 */

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/** Records the geometry's current local frame (plus an offset) for woodSurface's `localFrame`. */
export function framed(geometry: THREE.BufferGeometry, offset = V(0, 0, 0)) {
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const normal = geometry.attributes.normal as THREE.BufferAttribute;
  const local = new Float32Array(position.count * 3), localNormal = new Float32Array(position.count * 3);
  for (let i = 0; i < position.count; i++) {
    local.set([position.getX(i) + offset.x, position.getY(i) + offset.y, position.getZ(i) + offset.z], i * 3);
    localNormal.set([normal.getX(i), normal.getY(i), normal.getZ(i)], i * 3);
  }
  geometry.setAttribute('surfaceLocal', new THREE.BufferAttribute(local, 3));
  geometry.setAttribute('surfaceLocalNormal', new THREE.BufferAttribute(localNormal, 3));
  return geometry;
}

function placed(geometry: THREE.BufferGeometry, position: THREE.Vector3, rotation: THREE.Euler | THREE.Quaternion = new THREE.Euler()) {
  const q = rotation instanceof THREE.Quaternion ? rotation : new THREE.Quaternion().setFromEuler(rotation);
  geometry.applyMatrix4(new THREE.Matrix4().compose(position, q, V(1, 1, 1)));
  return geometry;
}

function shadowed<T extends THREE.Object3D>(object: T) {
  object.traverse((child) => { if ((child as THREE.Mesh).isMesh) { child.castShadow = true; child.receiveShadow = true; } });
  return object;
}

/** A board between two points with its long axis on local x, for framed wood. */
function board(a: THREE.Vector3, b: THREE.Vector3, width: number, thickness: number, random: () => number, up = V(0, 1, 0)) {
  const length = a.distanceTo(b);
  const g = framed(new THREE.BoxGeometry(length, thickness, width, 6, 1, 1), V(random() * 5, random() * 0.3, random() * 0.3));
  const x = b.clone().sub(a).normalize();
  const z = new THREE.Vector3().crossVectors(x, up).normalize();
  const y = new THREE.Vector3().crossVectors(z, x).normalize();
  const basis = new THREE.Matrix4().makeBasis(x, y, z);
  g.applyMatrix4(basis);
  g.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
  return g;
}

export interface DeckLayout { x0: number; x1: number; z0: number; z1: number; top: number }

/** Weathered deck on posts, running from the bank out over the water, with a low rail at the far end. */
export function createDeck(layout: DeckLayout, ground: (x: number, z: number) => number) {
  const random = seeded(7341);
  const group = new THREE.Group();
  group.name = 'Weathered deck over the water';
  const { x0, x1, z0, z1, top } = layout;
  const planks: THREE.BufferGeometry[] = [], frame: THREE.BufferGeometry[] = [];
  const width = 0.142, gap = 0.012, thickness = 0.034;
  const count = Math.floor((z0 - z1) / (width + gap));
  for (let i = 0; i < count; i++) {
    const z = z0 - width / 2 - i * (width + gap);
    // Staggered joints; each piece sits a hair differently and cups slightly.
    const joint = x0 + 1.2 + random() * (x1 - x0 - 2.4);
    for (const [a, b] of [[x0 - 0.03, joint - 0.003], [joint + 0.003, x1 + 0.03]]) {
      const length = b - a;
      const g = framed(new THREE.BoxGeometry(length, thickness, width, Math.max(2, Math.round(length * 3)), 1, 2), V(random() * 7, random() * 0.4, random() * 0.4));
      const p = g.attributes.position as THREE.BufferAttribute;
      for (let v = 0; v < p.count; v++) {
        const across = p.getZ(v) / (width / 2);
        if (p.getY(v) > 0) p.setY(v, p.getY(v) - across * across * 0.0025 + noise3(p.getX(v) * 0.7 + i, i * 0.3, 0) * 0.002);
      }
      g.computeVertexNormals();
      planks.push(placed(g, V((a + b) / 2, top - thickness / 2 + (random() - 0.5) * 0.004, z), new THREE.Euler((random() - 0.5) * 0.006, (random() - 0.5) * 0.004, (random() - 0.5) * 0.003)));
    }
  }
  // Rim boards, joists and posts down to the bed or the sea floor.
  const rimHeight = 0.2;
  // With a horizontal `up`, the board's width stands vertically.
  frame.push(board(V(x0 - 0.02, top - thickness - rimHeight / 2, z0 - 0.03), V(x1 + 0.02, top - thickness - rimHeight / 2, z0 - 0.03), rimHeight, 0.04, random, V(0, 0, 1)));
  frame.push(board(V(x0 - 0.04, top - thickness - rimHeight / 2, z1 - 0.02), V(x1 + 0.04, top - thickness - rimHeight / 2, z1 - 0.02), rimHeight, 0.04, random, V(0, 0, 1)));
  for (const x of [x0 - 0.02, x1 + 0.02]) frame.push(board(V(x, top - thickness - rimHeight / 2, z0), V(x, top - thickness - rimHeight / 2, z1), rimHeight, 0.04, random, V(1, 0, 0)));
  for (let x = x0 + 1.1; x < x1 - 0.5; x += 1.15) frame.push(board(V(x, top - thickness - 0.08, z0), V(x, top - thickness - 0.08, z1), 0.05, 0.15, random));
  const posts: Array<[number, number]> = [];
  for (let z = z0 - 0.1; z > z1 - 0.01; z -= 1.95) for (const x of [x0 + 0.05, (x0 + x1) / 2, x1 - 0.05]) posts.push([x, z]);
  for (const x of [x0 + 0.05, (x0 + x1) / 2, x1 - 0.05]) posts.push([x, z1 + 0.06]);
  for (const [x, z] of posts) {
    const bottom = ground(x, z) - 0.35;
    // Built lying along x (the grain axis), then stood up.
    const g = framed(new THREE.BoxGeometry(top - bottom, 0.11, 0.11, 4, 1, 1), V(random() * 3, 0, random() * 3));
    frame.push(placed(g, V(x, (top + bottom) / 2 - thickness, z), new THREE.Euler(0, 0, Math.PI / 2 + (random() - 0.5) * 0.02)));
  }
  // Low rail along the far end and the far half of each side.
  const railTop = top + 0.82;
  const railPosts: THREE.Vector3[] = [];
  for (let x = x0 + 0.05; x <= x1 - 0.04; x += (x1 - x0 - 0.1) / 4) railPosts.push(V(x, 0, z1 + 0.05));
  for (const x of [x0 + 0.05, x1 - 0.05]) for (const z of [z1 + 1.6, z1 + 3.1]) railPosts.push(V(x, 0, z));
  for (const p of railPosts) {
    const g = framed(new THREE.BoxGeometry(0.85, 0.075, 0.075, 3, 1, 1), V(random() * 3, 0, random() * 3));
    frame.push(placed(g, V(p.x, top + 0.425 - 0.01, p.z), new THREE.Euler(0, 0, Math.PI / 2 + (random() - 0.5) * 0.03)));
  }
  const rail = (a: THREE.Vector3, b: THREE.Vector3, y: number, h: number) => frame.push(board(V(a.x, y, a.z), V(b.x, y, b.z), 0.075, h, random));
  for (const [y, h] of [[railTop, 0.045], [top + 0.42, 0.06]] as Array<[number, number]>) {
    rail(V(x0 + 0.01, 0, z1 + 0.05), V(x1 - 0.01, 0, z1 + 0.05), y, h);
    rail(V(x0 + 0.05, 0, z1 + 0.02), V(x0 + 0.05, 0, z1 + 3.15), y, h);
    rail(V(x1 - 0.05, 0, z1 + 0.02), V(x1 - 0.05, 0, z1 + 3.15), y, h);
  }
  const wood = createWoodMaterial('#8f8273', { key: 'coast-deck', axis: 'x', localFrame: true, rings: 24, figure: 0.55, pores: 0.35, wear: 0.55, bump: 1.4, roughness: 0.86 });
  const deckWood = new THREE.Mesh(mergeGeometries(planks), wood);
  deckWood.name = 'Deck planks';
  const frameWood = new THREE.Mesh(mergeGeometries(frame), createWoodMaterial('#6e6052', { key: 'coast-deck-frame', axis: 'x', localFrame: true, rings: 22, figure: 0.5, pores: 0.3, wear: 0.35, bump: 1.2, roughness: 0.9 }));
  frameWood.name = 'Deck frame, posts and rail';
  planks.concat(frame).forEach((g) => g.dispose());
  group.add(deckWood, frameWood);
  return { group: shadowed(group), posts, bounds: new THREE.Box3(V(x0 - 0.05, top - 0.3, z1 - 0.05), V(x1 + 0.05, top + 0.85, z0 + 0.05)) };
}

/** Folding director's chair: wooden frame, X braces, sagging canvas seat and back. */
export function createCampChair() {
  const random = seeded(2209);
  const group = new THREE.Group();
  group.name = 'Folding canvas camp chair';
  const frame: THREE.BufferGeometry[] = [];
  const stick = (a: THREE.Vector3, b: THREE.Vector3, r: number) => {
    const d = b.clone().sub(a);
    const g = framed(new THREE.CylinderGeometry(r * 0.92, r, d.length(), 10, 2), V(random() * 2, 0, random() * 2));
    return placed(g, a.clone().add(b).multiplyScalar(0.5), new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), d.normalize()));
  };
  const w = 0.29, seatY = 0.44, depth = 0.22;
  for (const side of [-1, 1]) {
    const x = side * w;
    frame.push(stick(V(x, 0, depth), V(x, 0.66, depth), 0.019));            // front leg to arm
    frame.push(stick(V(x, 0, -depth), V(x * 0.98, 0.98, -depth - 0.06), 0.019)); // back leg and back upright
    frame.push(stick(V(x, 0.655, depth + 0.04), V(x, 0.675, -depth - 0.03), 0.017)); // armrest
    frame.push(stick(V(x, seatY - 0.02, depth), V(x, seatY - 0.02, -depth), 0.016)); // seat rail
    frame.push(stick(V(x, 0.05, depth), V(x, 0.05, -depth), 0.012));           // foot stretcher
  }
  // X braces front and back, crossing under the seat.
  for (const z of [depth + 0.005, -depth - 0.005]) {
    frame.push(stick(V(-w, 0.06, z), V(w, seatY - 0.05, z), 0.012));
    frame.push(stick(V(w, 0.06, z), V(-w, seatY - 0.05, z), 0.012));
  }
  frame.push(stick(V(-w * 0.98, 0.95, -depth - 0.055), V(w * 0.98, 0.95, -depth - 0.055), 0.012));
  const woodMat = createWoodMaterial('#5b3d27', { key: 'coast-chair-frame', axis: 'y', localFrame: true, rings: 60, figure: 0.5, pores: 0.4, wear: 0.25, bump: 0.8, varnish: 0.35, roughness: 0.5 });
  const woodMesh = new THREE.Mesh(mergeGeometries(frame), woodMat);
  frame.forEach((g) => g.dispose());
  woodMesh.name = 'Chair frame';
  group.add(woodMesh);
  const canvas = createFabricMaterial('#56606f', { key: 'coast-chair-canvas', weave: 'plain', threads: [150, 150], heather: 0.6, threadContrast: 0.4, fuzz: 0.25, roughness: 0.9 }, { side: THREE.DoubleSide });
  const sling = (width: number, height: number, sag: number, place: (u: number, v: number, s: number) => THREE.Vector3) => {
    const g = new THREE.PlaneGeometry(width, height, 20, 16);
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const u = p.getX(i) / width + 0.5, v = p.getY(i) / height + 0.5;
      const s = Math.sin(u * Math.PI) * (0.35 + 0.65 * Math.sin(v * Math.PI)) * sag;
      const q = place(u, v, s);
      p.setXYZ(i, q.x, q.y, q.z);
    }
    g.computeVertexNormals();
    return new THREE.Mesh(g, canvas);
  };
  group.add(sling(2 * w, 2 * depth, 0.06, (u, v, s) => V((u - 0.5) * 2 * w, seatY - s, (v - 0.5) * 2 * depth)));
  group.add(sling(2 * w * 0.98, 0.3, 0.04, (u, v, s) => V((u - 0.5) * 2 * w * 0.98, 0.62 + v * 0.3, -depth - 0.02 - v * 0.035 - s)));
  return shadowed(group);
}

/** Stacked split and round logs, end grain toward the fire, bark on the rounds. */
export function createLogPile() {
  const random = seeded(5123);
  const parts: THREE.BufferGeometry[] = [];
  const rows = [[-0.33, -0.11, 0.11, 0.33], [-0.22, 0, 0.22], [-0.11, 0.11], [0]];
  rows.forEach((row, level) => {
    for (const x of row) {
      const r = 0.075 + random() * 0.055, length = 0.66 + random() * 0.26;
      const g = new THREE.CylinderGeometry(r, r * (0.95 + random() * 0.08), length, 22, 3);
      const p = g.attributes.position as THREE.BufferAttribute;
      const salt = random() * 20;
      for (let v = 0; v < p.count; v++) {
        const px = p.getX(v), pz = p.getZ(v), py = p.getY(v);
        const rad = Math.hypot(px, pz);
        if (rad < 1e-4) continue;
        const a = Math.atan2(pz, px);
        const k = 1 + noise3(Math.cos(a) * 1.5 + salt, py * 2, Math.sin(a) * 1.5) * 0.07 + Math.sin(a * 2 + salt) * 0.03;
        p.setX(v, px * k); p.setZ(v, pz * k);
      }
      g.computeVertexNormals();
      framed(g);
      const y = 0.1 + level * 0.19;
      parts.push(placed(g, V(x + (random() - 0.5) * 0.04, y - (0.11 - r) * 0.8, (random() - 0.5) * 0.16), new THREE.Euler(Math.PI / 2 + (random() - 0.5) * 0.04, (random() - 0.5) * 0.05, (random() - 0.5) * 0.05)));
    }
  });
  const material = createWoodMaterial('#5e5246', { key: 'coast-log-pile', axis: 'y', localFrame: true, pith: [0.01, -0.02], bark: '#4a3b2e', rings: 95, figure: 0.75, pores: 0.25, wear: 0.4, bump: 1.4, roughness: 0.8 });
  const pile = new THREE.Mesh(mergeGeometries(parts), material);
  parts.forEach((g) => g.dispose());
  pile.name = 'Stacked firewood';
  return shadowed(pile);
}

/** Slatted wooden crate with a few split sticks of kindling. */
export function createCrate() {
  const random = seeded(8817);
  const parts: THREE.BufferGeometry[] = [];
  const W = 0.62, H = 0.4, D = 0.4, slat = 0.115, t = 0.018;
  for (let i = 0; i < 3; i++) {
    const y = 0.035 + i * (slat + 0.017) + slat / 2;
    for (const z of [D / 2, -D / 2]) parts.push(placed(framed(new THREE.BoxGeometry(W, slat, t, 4, 1, 1), V(random() * 3, random(), 0)), V(0, y, z)));
    for (const x of [W / 2, -W / 2]) parts.push(placed(framed(new THREE.BoxGeometry(D - 0.02, slat, t, 3, 1, 1), V(random() * 3, random(), 0)), V(x, y, 0), new THREE.Euler(0, Math.PI / 2, 0)));
  }
  for (const [x, z] of [[W / 2 - 0.025, D / 2 - 0.03], [-W / 2 + 0.025, D / 2 - 0.03], [W / 2 - 0.025, -D / 2 + 0.03], [-W / 2 + 0.025, -D / 2 + 0.03]]) {
    parts.push(placed(framed(new THREE.BoxGeometry(H, 0.04, 0.04, 2, 1, 1), V(random() * 3, 0, 0)), V(x, H / 2, z), new THREE.Euler(0, 0, Math.PI / 2)));
  }
  parts.push(placed(framed(new THREE.BoxGeometry(W - 0.02, 0.016, D - 0.02, 3, 1, 3)), V(0, 0.03, 0)));
  for (let i = 0; i < 7; i++) {
    const g = framed(new THREE.BoxGeometry(0.5 + random() * 0.15, 0.035 + random() * 0.02, 0.04 + random() * 0.02, 3, 1, 1), V(random() * 4, 0, 0));
    parts.push(placed(g, V(-0.12 + random() * 0.24, H - 0.02 + random() * 0.05, -0.13 + i * 0.045), new THREE.Euler(0, (random() - 0.5) * 0.3, 0.1 + random() * 0.25)));
  }
  const material = createWoodMaterial('#8c6a48', { key: 'coast-crate', axis: 'x', localFrame: true, rings: 30, figure: 0.55, pores: 0.3, wear: 0.45, bump: 1.1, roughness: 0.82 });
  const crate = new THREE.Mesh(mergeGeometries(parts), material);
  parts.forEach((g) => g.dispose());
  crate.name = 'Wooden crate';
  return shadowed(crate);
}

/** Tarnished brass: darker in crevices, greener where handled least, rougher where dull. */
function agedBrass(color: THREE.ColorRepresentation, key: string) {
  return patchSurface(new THREE.MeshStandardMaterial({ color, metalness: 0.85, roughness: 0.42 }), {
    key: `coast-brass|${key}`,
    objectSpace: true,
    color: `
float brTarnish = smoothstep(-0.2, 0.6, bwFbm3(vSurface * 26.0 + 3.0));
float brSpot = smoothstep(0.55, 0.8, bwNoise(vSurface * 90.0));
diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.55, 0.6, 0.5), brTarnish * 0.6);
diffuseColor.rgb *= 1.0 - 0.35 * brSpot;`,
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.3 * brTarnish + 0.2 * brSpot, 0.2, 1.0);',
    height: 'brSpot * 0.00015',
  });
}

const lathe = (points: Array<[number, number]>, segments = 40) => new THREE.LatheGeometry(points.map(([r, y]) => new THREE.Vector2(r, y)), segments);

/** An old hurricane (kerosene) lantern: fount, air tubes, guard wires, glass globe, cap and bail. */
export function createHurricaneLantern() {
  const group = new THREE.Group();
  group.name = 'Hurricane lantern';
  const brass = agedBrass('#93733f', 'body');
  const dark = agedBrass('#4b4136', 'frame');
  const body = (geometry: THREE.BufferGeometry, material: THREE.Material) => { const m = new THREE.Mesh(geometry, material); m.castShadow = true; m.receiveShadow = true; group.add(m); return m; };
  body(lathe([[0, 0], [0.088, 0], [0.098, 0.008], [0.104, 0.03], [0.1, 0.055], [0.078, 0.072], [0.05, 0.08], [0.046, 0.086]]), brass);
  body(new THREE.CylinderGeometry(0.046, 0.05, 0.03, 24), dark).position.y = 0.1;
  body(lathe([[0.044, 0.262], [0.06, 0.268], [0.068, 0.282], [0.058, 0.298], [0.036, 0.316], [0.026, 0.33], [0.02, 0.336]]), brass);
  body(new THREE.CylinderGeometry(0.02, 0.02, 0.012, 16), dark).position.y = 0.34;
  for (const side of [-1, 1]) {
    const tube = new THREE.CatmullRomCurve3([V(side * 0.1, 0.04, 0), V(side * 0.114, 0.13, 0), V(side * 0.11, 0.225, 0), V(side * 0.07, 0.29, 0), V(side * 0.04, 0.3, 0)]);
    body(new THREE.TubeGeometry(tube, 24, 0.0075, 8, false), dark);
  }
  for (let i = 0; i < 4; i++) {
    const a = i / 4 * Math.PI * 2 + Math.PI / 4;
    const wire = new THREE.CatmullRomCurve3([0.108, 0.15, 0.2, 0.255].map((y, k) => V(Math.cos(a) * [0.05, 0.088, 0.088, 0.052][k], y, Math.sin(a) * [0.05, 0.088, 0.088, 0.052][k])));
    body(new THREE.TubeGeometry(wire, 16, 0.0028, 6, false), dark).castShadow = false;
  }
  const bail = new THREE.CatmullRomCurve3(Array.from({ length: 13 }, (_, k) => { const a = k / 12 * Math.PI; return V(Math.cos(a) * 0.095, 0.3 + Math.sin(a) * 0.12, 0); }));
  body(new THREE.TubeGeometry(bail, 30, 0.0032, 6, false), dark);
  const level = { value: 0.8 };
  const glass = new THREE.MeshPhysicalMaterial({
    color: '#fff0dc', roughness: 0.12, metalness: 0, transparent: true, opacity: 0.22, clearcoat: 1, clearcoatRoughness: 0.08,
    emissive: '#ffa45a', emissiveIntensity: 0.35, side: THREE.DoubleSide, depthWrite: false,
  });
  const globe = new THREE.Mesh(lathe([[0.04, 0.112], [0.064, 0.138], [0.077, 0.18], [0.071, 0.222], [0.05, 0.252], [0.042, 0.262]], 48), glass);
  globe.renderOrder = 2;
  group.add(globe);
  const flameMat = new THREE.MeshStandardMaterial({ color: '#000000', emissive: '#ffb35c', emissiveIntensity: 14, roughness: 1 });
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.012, 14, 10), flameMat);
  flame.scale.set(0.8, 2.1, 0.8);
  flame.position.y = 0.155;
  group.add(flame);
  const light = new THREE.PointLight('#ffb468', 2.4, 7, 1.8);
  light.position.set(0, 0.165, 0);
  light.castShadow = true;
  light.shadow.mapSize.set(256, 256);
  light.shadow.radius = 3;
  light.shadow.bias = -0.002;
  light.shadow.normalBias = 0.02;
  light.shadow.camera.near = 0.13;
  light.shadow.camera.far = 3;
  group.add(light);
  // The lantern's own wires and fount would cage its light; only the world receives its shadows.
  group.traverse((child) => { if ((child as THREE.Mesh).isMesh) child.castShadow = false; });
  return {
    group, light,
    update(time: number) {
      const flicker = 1 + Math.sin(time * 7.1) * 0.012 + Math.sin(time * 2.3 + 1.1) * 0.02 + Math.sin(time * 13.7) * 0.006;
      light.intensity = 2.4 * level.value * flicker;
      flameMat.emissiveIntensity = 14 * level.value * flicker;
      flame.scale.y = 2.1 * (0.97 + 0.03 * Math.sin(time * 5.3));
      glass.emissiveIntensity = 0.35 * level.value * flicker;
    },
  };
}

/** Enamel camp mug: rolled dark rim, chipped edge, coffee inside. */
export function createEnamelMug() {
  const group = new THREE.Group();
  group.name = 'Enamel mug';
  const enamel = patchSurface(new THREE.MeshPhysicalMaterial({ color: '#e3d8c3', roughness: 0.32, metalness: 0, clearcoat: 0.6, clearcoatRoughness: 0.18 }), {
    key: 'coast-mug-enamel',
    objectSpace: true,
    color: `
float muChip = smoothstep(0.62, 0.78, bwNoise(vSurface * 70.0 + 2.0)) * smoothstep(0.06, 0.097, vSurface.y);
float muRim = smoothstep(0.091, 0.094, vSurface.y);
float muSpeck = smoothstep(0.7, 0.9, bwNoise(vSurface * 260.0));
diffuseColor.rgb = mix(diffuseColor.rgb * (1.0 - 0.1 * muSpeck), vec3(0.06, 0.065, 0.075), max(muRim, muChip * 0.9));`,
    roughness: 'roughnessFactor = mix(roughnessFactor, 0.6, muChip);',
  });
  const bodyProfile: Array<[number, number]> = [[0, 0.003], [0.036, 0.003], [0.041, 0.008], [0.042, 0.09], [0.045, 0.095], [0.043, 0.099], [0.039, 0.096], [0.038, 0.012], [0.0, 0.01]];
  const mug = new THREE.Mesh(lathe(bodyProfile, 48), enamel);
  group.add(mug);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.0055, 10, 28, Math.PI * 1.25), enamel);
  handle.position.set(0.046, 0.052, 0);
  handle.rotation.z = -Math.PI * 0.62;
  group.add(handle);
  const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.038, 32), new THREE.MeshPhysicalMaterial({ color: '#21140d', roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.04 }));
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.075;
  group.add(coffee);
  return shadowed(group);
}
