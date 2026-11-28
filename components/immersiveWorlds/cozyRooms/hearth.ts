import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldBuild } from './contracts';
import { createFireDetail } from './fireDetail';
import { batchStatic, clothSheet, cushion, stoneBlock, withLocalFrame } from './geometry';
import { captureRoomProbe, createRoomVolume } from './lighting';
import { LIMESTONE_PALETTE, rubbleFace, stonePalette, tintStone } from './masonry';
import { createRockMaterial } from '../shared/render/rockSurface';
import { createWoodMaterial } from '../shared/render/woodSurface';
import { createFabricMaterial } from '../shared/render/fabricSurface';
import { createGlazeMaterial, createPlasterMaterial, patchSurface } from '../shared/render/interiorSurface';
import { CORNICE_SMALL, DADO_RAIL, PANEL_MOULD, PICTURE_FRAME, SKIRTING, frameMoulding, onWall, roundedBlock, straightMoulding } from './roomTrim';
import { armThrow, createBookMaterial, createDialMaterial, createLeatherMaterial, fillShelves, logBasket, mantelClock, wingbackChair } from './readingRoom';
import { createLeafMaterial, trailingPlant } from './houseplant';
import { noise3, seeded } from '../shared/render/noise';

/*
 * 불멍 힐링: seated in a velvet armchair before a stone fireplace at night.
 * The fire is the key light: one shadowed point light at the firebox mouth,
 * so the surround, mantel and andirons shape the light that reaches the room.
 * A shaded wall sconce is the only other source; the rest is the room's own
 * bounce (a radiance probe of the lit room) and a faint warm floor bounce.
 * Furnished as a reading room: a built-in bookcase in the right alcove under a
 * brass picture light, a leather wingback with a knitted throw, side table, tea
 * and an oil landscape in the left alcove, a log basket, a mantel clock and a
 * trailing plant; oak panelling to dado height with trowelled plaster above.
 * All geometry and surfaces are original procedural work.
 */

const OPENING = { rx: 1.22, ry: 0.82, spring: 1.22, ring: 0.4 };
const BREAST = { x0: -1.86, x1: 1.86, front: -3.3, back: -3.98, top: 4.0 };

/** Inside the opening plus its voussoir ring. */
function inArchZone(x: number, y: number) {
  if (y < OPENING.spring) return Math.abs(x) < OPENING.rx;
  const ex = x / (OPENING.rx + OPENING.ring), ey = (y - OPENING.spring) / (OPENING.ry + OPENING.ring);
  return ex * ex + ey * ey < 1;
}
/** Half-width the arch zone occupies at height y. */
function archHalfWidth(y: number) {
  if (y < OPENING.spring) return OPENING.rx;
  const ey = (y - OPENING.spring) / (OPENING.ry + OPENING.ring);
  return ey >= 1 ? 0 : (OPENING.rx + OPENING.ring) * Math.sqrt(1 - ey * ey);
}

export function createHearthWorld(): WorldBuild {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#030303');
  const camera = new THREE.PerspectiveCamera(48, 1, 0.06, 35);
  const random = seeded(0x5825);
  const matrix = new THREE.Matrix4(), euler = new THREE.Euler(), quat = new THREE.Quaternion(), pos = new THREE.Vector3(), scl = new THREE.Vector3();
  const place = (geometry: THREE.BufferGeometry, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => {
    matrix.compose(pos.set(x, y, z), quat.setFromEuler(euler.set(rx, ry, rz)), scl.set(sx, sy, sz));
    return geometry.applyMatrix4(matrix);
  };
  const add = (geometry: THREE.BufferGeometry, material: THREE.Material, shadow = true) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = shadow; mesh.receiveShadow = true; scene.add(mesh); return mesh;
  };

  // --- Materials --------------------------------------------------------------
  const plaster = createPlasterMaterial('#c4b292', { key: 'hearth-wall', floorY: 0, stains: 0.7, bump: 2.4, scale: 1.3 });
  const ceilingPlaster = createPlasterMaterial('#a99a84', { key: 'hearth-ceiling', stains: 0.3 });
  const floor = createWoodMaterial('#6b4a31', { key: 'hearth-floor', axis: 'z', rings: 20, figure: 0.7, pores: 0.45, wear: 0.35, varnish: 0.5, roughness: 0.46, planks: { width: 0.2, length: 2.3, bevel: 0.004, tone: 0.32 } });
  const beam = createWoodMaterial('#3a291c', { key: 'hearth-beam', axis: 'x', rings: 12, figure: 0.55, pores: 0.7, wear: 0.2, roughness: 0.78 });
  const oak = createWoodMaterial('#4c3322', { key: 'hearth-oak', axis: 'x', rings: 24, figure: 0.65, pores: 0.6, wear: 0.25, varnish: 0.3, roughness: 0.56 });
  const turned = createWoodMaterial('#5a3b26', { key: 'hearth-turned', axis: 'y', objectSpace: true, rings: 40, figure: 0.6, varnish: 0.45, roughness: 0.5 });
  const masonry = createRockMaterial('#ffffff', { key: 'hearth-masonry', scale: 3.2, bump: 1.25, stain: '#4d3d2e', stainAmount: 0.22, cavity: 0.55, strata: 0.12, drips: 0, wetness: 0, dryRoughness: 0.88, algaeAmount: 0 }, { vertexColors: true });
  const mortar = createRockMaterial('#a0978a', { key: 'hearth-mortar', scale: 7, bump: 0.35, cavity: 0.3, strata: 0, stainAmount: 0.05, drips: 0, wetness: 0, dryRoughness: 0.95, algaeAmount: 0 });
  const hearthStone = createRockMaterial('#7a756c', { key: 'hearth-slab', scale: 1.6, bump: 0.35, stain: '#3e3a35', stainAmount: 0.15, cavity: 0.35, strata: 0.05, drips: 0, wetness: 0, dryRoughness: 0.62, algaeAmount: 0 });
  const firebrick = patchSurface(new THREE.MeshStandardMaterial({ color: '#3a2219', roughness: 0.95 }), {
    key: 'hearth-firebrick',
    color: `
vec2 fbP = vec2(vSurfaceWorld.x + vSurfaceWorld.z, vSurfaceWorld.y) / vec2(0.23, 0.075);
float fbRow = floor(fbP.y);
fbP.x += mod(fbRow, 2.0) * 0.5;
vec2 fbF = fract(fbP), fbC = floor(fbP);
vec2 fbEdge = min(fbF, 1.0 - fbF) * vec2(0.23, 0.075);
float fbMortar = 1.0 - smoothstep(0.002, 0.006, min(fbEdge.x, fbEdge.y));
float fbTone = bwHash1(vec3(fbC, 3.0));
float fbSoot = smoothstep(0.3, 1.9, vSurfaceWorld.y + 0.35 * bwFbm3(vSurfaceWorld * 2.5));
vec3 fbColor = diffuseColor.rgb * (0.7 + 0.5 * fbTone) * (0.85 + 0.25 * bwNoise(vSurfaceWorld * 18.0));
fbColor = mix(fbColor, vec3(0.06, 0.055, 0.05), fbMortar * 0.8);
fbColor = mix(fbColor, vec3(0.012, 0.011, 0.01), clamp(fbSoot * 0.7 + 0.55, 0.0, 0.95));
diffuseColor.rgb = fbColor;`,
    height: '-fbMortar * 0.004 + bwNoise(vSurfaceWorld * 30.0) * 0.0004',
  });
  const iron = patchSurface(new THREE.MeshStandardMaterial({ color: '#1d1b19', metalness: 0.8, roughness: 0.55 }), {
    key: 'hearth-iron',
    color: 'float irN = bwFbm3(vSurfaceWorld * 9.0); diffuseColor.rgb *= 0.8 + 0.35 * irN; diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.16, 0.07, 0.03), smoothstep(0.25, 0.6, irN) * 0.35);',
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.25 * irN, 0.2, 1.0);',
    height: 'irN * 0.0006',
  });
  const brass = patchSurface(new THREE.MeshStandardMaterial({ color: '#b48a52', metalness: 1, roughness: 0.3 }), {
    key: 'hearth-brass',
    color: 'float brN = bwFbm3(vSurfaceWorld * 14.0); diffuseColor.rgb *= 0.78 + 0.3 * brN;',
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.2 * brN, 0.12, 1.0);',
  });
  const velvet = createFabricMaterial('#4f5a3c', { key: 'hearth-velvet', weave: 'velvet', threads: [90, 90], heather: 0.8, fuzz: 0.7, depth: 0.0008, sheen: 1, sheenColor: '#7d8f6c', roughness: 0.86 });
  const piping = createFabricMaterial('#252f23', { key: 'hearth-piping', weave: 'twill', threads: [400, 60], sheen: 0.8, roughness: 0.8 });
  const throwWool = createFabricMaterial('#b5a084', { key: 'hearth-throw', weave: 'knit', threads: [70, 95], heather: 0.7, fuzz: 0.8, depth: 0.0022, sheen: 0.7, sheenColor: '#efe2cc', roughness: 0.95 }, { side: THREE.DoubleSide });
  const rug = createFabricMaterial('#7b3326', {
    key: 'hearth-rug', weave: 'velvet', threads: [140, 140], heather: 0.9, threadContrast: 0.7, fuzz: 1, depth: 0.0028, roughness: 0.98, sheen: 0.6, sheenColor: '#d08a6a',
    patternHeader: `
vec3 rugPalette(float i) {
  return i < 0.5 ? vec3(0.36, 0.14, 0.09) : i < 1.5 ? vec3(0.13, 0.14, 0.19) : i < 2.5 ? vec3(0.5, 0.37, 0.19) : vec3(0.58, 0.52, 0.42);
}`,
    pattern: `
{
  vec2 ru = fbUv / vec2(3.6, 3.8);
  vec2 edge = min(ru, 1.0 - ru);
  float border = min(edge.x * 3.6, edge.y * 3.8);
  float idx = 0.0;
  if (border < 0.08) idx = 1.0;
  else if (border < 0.12) idx = 3.0;
  else if (border < 0.3) {
    float zig = abs(fract((ru.x + ru.y) * 9.0) - 0.5);
    idx = (abs(border - 0.21) < 0.035 + zig * 0.05) ? 2.0 : 1.0;
  } else if (border < 0.34) idx = 3.0;
  else {
    // Field of small stepped medallions with a hooked outline, offset in rows.
    vec2 g = vec2(ru.x * 5.0, ru.y * 7.0);
    g.x += mod(floor(g.y), 2.0) * 0.5;
    vec2 c = fract(g) - 0.5;
    vec2 s = floor(abs(c) * 14.0) / 14.0;
    float d = s.x + s.y * 1.1;
    float hook = step(0.36, d) * step(d, 0.42) * step(0.5, fract((c.x + c.y) * 7.0));
    idx = d < 0.1 ? 3.0 : d < 0.2 ? 2.0 : d < 0.27 ? 1.0 : hook > 0.5 ? 2.0 : 0.0;
  }
  // Worn and faded toward the hearth; abrash bands from different dye lots.
  fbBase = rugPalette(idx) * (0.88 + 0.1 * sin(ru.y * 21.0 + fbHeather * 2.0));
  // Sun and feet have faded the middle.
  fbBase = mix(fbBase, vec3(dot(fbBase, vec3(0.3, 0.5, 0.2))) * vec3(1.05, 0.98, 0.9), 0.25 * smoothstep(0.2, 0.0, length(ru - 0.5) - 0.2));
}`,
  }, { side: THREE.DoubleSide });
  const linenShade = createFabricMaterial('#d6c29a', { key: 'hearth-shade', weave: 'plain', threads: [300, 300], roughness: 0.9 }, { side: THREE.DoubleSide, emissive: '#ffb265', emissiveIntensity: 0 });
  const paper = new THREE.MeshStandardMaterial({ color: '#cfc3a6', roughness: 0.92 });
  const bookCloth = createFabricMaterial('#ffffff', { key: 'hearth-bookcloth', weave: 'plain', threads: [400, 400], roughness: 0.8 }, { vertexColors: true });
  const vaseGlaze = createGlazeMaterial('#5c6e61', { key: 'hearth-vase', pool: '#2f3b34', speckle: 0.6, scale: 4 });
  const cupGlaze = createGlazeMaterial('#c8b99b', { key: 'hearth-cup', pool: '#8f7a5c', speckle: 0.8, scale: 6 });
  const wax = new THREE.MeshPhysicalMaterial({ color: '#e9dfc8', roughness: 0.45, sheen: 0.4, sheenColor: '#fff4dc' });
  const dried = new THREE.MeshStandardMaterial({ color: '#8f7b52', roughness: 0.9, side: THREE.DoubleSide });
  const soot = new THREE.MeshStandardMaterial({ color: '#0b0a09', roughness: 1 });

  // --- Room shell ----------------------------------------------------------------
  const floorMesh = add(place(new THREE.PlaneGeometry(8.4, 9.2), 0, 0, 0.3, -Math.PI / 2), floor, false);
  floorMesh.name = 'hearth-floor';
  add(place(new THREE.PlaneGeometry(8.4, 4.0), 0, 2.0, -4.0), plaster, false);
  add(place(new THREE.PlaneGeometry(9.2, 4.0), -4.15, 2.0, 0.3, 0, Math.PI / 2), plaster, false);
  add(place(new THREE.PlaneGeometry(9.2, 4.0), 4.15, 2.0, 0.3, 0, -Math.PI / 2), plaster, false);
  add(place(new THREE.PlaneGeometry(8.4, 4.0), 0, 2.0, 4.9, 0, Math.PI), plaster, false);
  add(place(new THREE.PlaneGeometry(8.4, 9.2), 0, 4.0, 0.3, Math.PI / 2), ceilingPlaster, false);
  // Hewn ceiling beams and a skirting board.
  for (const z of [-3.15, -1.0, 1.15, 3.3]) add(place(stoneBlock(8.3, 0.24, 0.21, 40 + z, 0.18, 0.02, 0, 0.07), 0, 3.88, z), beam);
  // Oak panelling to dado height on the side walls and the left alcove: boards with
  // applied mouldings, a moulded skirting and a capped dado rail, all under the firelight.
  const panelOak = createWoodMaterial('#5c3f28', { key: 'hearth-panel', axis: 'y', rings: 26, figure: 0.7, pores: 0.55, wear: 0.15, varnish: 0.45, roughness: 0.5 });
  const trimOak = createWoodMaterial('#4e3421', { key: 'hearth-trim', axis: 'x', rings: 26, figure: 0.6, pores: 0.5, wear: 0.2, varnish: 0.5, roughness: 0.45 });
  const PANEL_H = 1.15;
  const panelRuns: Array<{ origin: THREE.Vector3; yaw: number; from: number; to: number }> = [
    { origin: new THREE.Vector3(0, 0, -3.988), yaw: 0, from: -4.15, to: BREAST.x0 },
    { origin: new THREE.Vector3(-4.138, 0, 0.3), yaw: Math.PI / 2, from: -4.6, to: 4.3 },
    { origin: new THREE.Vector3(4.138, 0, 0.3), yaw: -Math.PI / 2, from: -4.3, to: 4.6 },
  ];
  const panelBoards: THREE.BufferGeometry[] = [], panelTrim: THREE.BufferGeometry[] = [];
  for (const run of panelRuns) {
    const length = run.to - run.from, mid = (run.from + run.to) / 2;
    panelBoards.push(onWall(new THREE.PlaneGeometry(length, PANEL_H).translate(mid, PANEL_H / 2, 0), run.origin, run.yaw));
    panelTrim.push(onWall(straightMoulding(SKIRTING, length).translate(mid, 0, 0), run.origin, run.yaw));
    panelTrim.push(onWall(straightMoulding(DADO_RAIL, length, { caps: true }).translate(mid, PANEL_H - 0.035, 0), run.origin, run.yaw));
    const count = Math.max(1, Math.round(length / 0.78)), pw = length / count;
    for (let k = 0; k < count; k++) panelTrim.push(onWall(frameMoulding(PANEL_MOULD, run.from + k * pw + 0.08, 0.27, run.from + (k + 1) * pw - 0.08, PANEL_H - 0.12), run.origin, run.yaw));
  }
  add(mergeGeometries(panelBoards, false)!, panelOak, false).name = 'hearth-panelling';
  add(mergeGeometries(panelTrim.map(g => g.index ? g.toNonIndexed() : g), false)!, trimOak, true).name = 'hearth-panel-trim';
  panelBoards.forEach(g => g.dispose()); panelTrim.forEach(g => g.dispose());

  // --- Chimney breast: coursed rubble around a stone arch --------------------------
  const stones: THREE.BufferGeometry[] = [];
  const tint = tintStone;
  const archTop = OPENING.spring + OPENING.ry;
  const sootAt = (x: number, y: number, z: number) => {
    const face = Math.exp(-(x * x) / 0.9) * THREE.MathUtils.smoothstep(y, archTop - 0.3, archTop + 0.2) * (1 - THREE.MathUtils.smoothstep(y, archTop + 0.6, archTop + 1.6)) * 0.55;
    const reveal = THREE.MathUtils.smoothstep(-z, -BREAST.front + 0.05, -BREAST.front + 0.4) * (0.55 + 0.35 * THREE.MathUtils.smoothstep(y, 0.3, 1.8));
    return Math.min(0.92, face + reveal + Math.max(0, noise3(x * 3, y * 3, z * 3)) * 0.08);
  };
  const stoneTint = () => stonePalette(random, LIMESTONE_PALETTE);
  // Random rubble around the opening; reveal stones run deep beside it.
  stones.push(...rubbleFace({
    x0: BREAST.x0, x1: BREAST.x1, y0: 0, y1: BREAST.top, front: BREAST.front, depth: 0.2, revealDepth: BREAST.front - BREAST.back,
    random, openingHalfWidth: y => archHalfWidth(Math.max(y, OPENING.spring - 0.001)), inOpening: inArchZone, revealTop: OPENING.spring,
    palette: LIMESTONE_PALETTE, soot: sootAt,
  }));
  // Voussoirs: chiselled blocks bent onto the elliptical arch, keystone proud.
  const voussoirs = 13;
  for (let i = 0; i < voussoirs; i++) {
    const a0 = i / voussoirs * Math.PI + 0.008, a1 = (i + 1) / voussoirs * Math.PI - 0.008;
    const key = i === Math.floor(voussoirs / 2);
    const ring = OPENING.ring * (key ? 1.18 : 1);
    const arc = Math.hypot((OPENING.rx + ring / 2) * (Math.cos(a1) - Math.cos(a0)), (OPENING.ry + ring / 2) * (Math.sin(a1) - Math.sin(a0)));
    const depth = BREAST.front - BREAST.back + (key ? 0.04 : 0);
    const g = stoneBlock(arc, ring, depth, 900 + i, 0.4, 0.028);
    const p = g.attributes.position;
    for (let k = 0; k < p.count; k++) {
      const t = 0.5 - p.getX(k) / arc, s = p.getY(k) / ring + 0.5;
      const a = a0 + (a1 - a0) * t;
      p.setXYZ(k, Math.cos(a) * (OPENING.rx + s * ring), OPENING.spring + Math.sin(a) * (OPENING.ry + s * ring), BREAST.front + (key ? 0.04 : 0) - depth / 2 + p.getZ(k));
    }
    g.computeVertexNormals();
    stones.push(tint(g, stoneTint().multiplyScalar(1.04), sootAt));
  }
  // Corbels under the mantel ends.
  for (const side of [-1, 1]) {
    const g = place(stoneBlock(0.26, 0.3, 0.34, 70 + side, 0.35, 0.03), side * 1.62, 2.38, BREAST.front + 0.15);
    stones.push(tint(g, stoneTint(), () => 0.05));
  }
  const masonryMesh = add(mergeGeometries(stones, false)!, masonry);
  stones.forEach(g => g.dispose());
  masonryMesh.name = 'hearth-masonry';
  // Recessed lime mortar behind the stones, with the opening cut out.
  const mortarShape = new THREE.Shape();
  mortarShape.moveTo(BREAST.x0, 0); mortarShape.lineTo(BREAST.x1, 0); mortarShape.lineTo(BREAST.x1, BREAST.top); mortarShape.lineTo(BREAST.x0, BREAST.top); mortarShape.closePath();
  const hole = new THREE.Path();
  hole.moveTo(-OPENING.rx, 0); hole.lineTo(-OPENING.rx, OPENING.spring);
  for (let i = 0; i <= 32; i++) { const a = Math.PI - i / 32 * Math.PI; hole.lineTo(Math.cos(a) * OPENING.rx, OPENING.spring + Math.sin(a) * OPENING.ry); }
  hole.lineTo(OPENING.rx, 0); hole.closePath();
  mortarShape.holes.push(hole);
  add(place(new THREE.ShapeGeometry(mortarShape, 24), 0, 0, BREAST.front - 0.012), mortar, false);
  // Returns of the breast to the wall.
  for (const side of [-1, 1]) add(place(new THREE.PlaneGeometry(BREAST.front - BREAST.back, BREAST.top), side * (BREAST.x1 + 0.0), BREAST.top / 2, (BREAST.front + BREAST.back) / 2, 0, side * Math.PI / 2), mortar, false);

  // Firebox: splayed firebrick cheeks, back and a soot-black throat.
  const fireboxBack = -3.96, inner = 0.98;
  add(place(new THREE.PlaneGeometry(inner * 2, 2.3), 0, 1.15, fireboxBack), firebrick, false);
  for (const side of [-1, 1]) {
    const from = new THREE.Vector3(side * OPENING.rx, 0, BREAST.front - 0.02), to = new THREE.Vector3(side * inner, 0, fireboxBack);
    const length = from.distanceTo(to);
    const angle = Math.atan2(to.x - from.x, to.z - from.z);
    add(place(new THREE.PlaneGeometry(length, 2.3), (from.x + to.x) / 2, 1.15, (from.z + to.z) / 2, 0, angle + (side > 0 ? Math.PI / 2 : -Math.PI / 2)), firebrick, false);
  }
  add(place(new THREE.PlaneGeometry(2.6, 0.8), 0, 2.05, -3.62, Math.PI / 2), soot, false);
  add(place(new THREE.PlaneGeometry(2.5, 0.7), 0, 0.1, -3.63, -Math.PI / 2), createRockMaterial('#3b3732', { key: 'hearth-inner', scale: 3, bump: 0.3, drips: 0, wetness: 0, strata: 0, stainAmount: 0.05, algaeAmount: 0, dryRoughness: 0.95 }), false);

  // Hearth: three heavy flags in front of the opening.
  const flags: THREE.BufferGeometry[] = [];
  [[-2.35, -0.72], [-0.7, 0.78], [0.8, 2.35]].forEach(([a, b], i) => {
    flags.push(place(stoneBlock(b - a - 0.012, 0.12, 0.98, 300 + i, 0.2, 0.012), (a + b) / 2, 0.06, -2.8));
  });
  add(mergeGeometries(flags, false)!, hearthStone).name = 'hearth-flags';
  flags.forEach(g => g.dispose());

  // Mantel: one oak beam with an adzed face.
  const mantel = stoneBlock(4.3, 0.24, 0.42, 501, 0.12, 0.018, 0, 0.05);
  add(place(mantel, 0, 2.66, BREAST.front + 0.17), beam).name = 'hearth-mantel';

  // --- Fire --------------------------------------------------------------------
  const fire = createFireDetail({
    seed: 0x58251,
    logs: [
      { length: 1.28, radius: 0.1, position: [-0.04, 0.27, -3.47], rotation: [0, 0.08, Math.PI / 2] },
      { length: 1.22, radius: 0.105, position: [0.07, 0.27, -3.73], rotation: [0, -0.07, Math.PI / 2] },
      { length: 1.05, radius: 0.085, position: [0.02, 0.45, -3.6], rotation: [0, 0.32, Math.PI / 2 + 0.1] },
      { length: 0.86, radius: 0.072, position: [-0.3, 0.42, -3.52], rotation: [0.12, -0.6, Math.PI / 2 - 0.22] },
    ],
    bed: { width: 1.7, depth: 0.5, y: 0.13, z: -3.62 },
    flame: { width: 1.3, depth: 0.42, y: 0.22, z: -3.62, height: 1.0 },
    light: { intensity: 7, shadow: true, mapSize: 1024, forward: 0.34, inner: 0.9 },
    sparks: 24,
  });
  scene.add(fire.group);
  // Andirons: front posts with ball finials, bars under the logs.
  const andiron: THREE.BufferGeometry[] = [];
  for (const x of [-0.6, 0.6]) {
    const post = new THREE.LatheGeometry([[0, 0], [0.05, 0], [0.055, 0.02], [0.03, 0.05], [0.022, 0.2], [0.03, 0.26], [0.02, 0.3], [0.045, 0.34], [0.05, 0.38], [0.03, 0.42], [0, 0.43]].map(([r, h]) => new THREE.Vector2(r, h)), 18);
    andiron.push(place(post, x, 0.12, -3.24));
    andiron.push(place(new THREE.BoxGeometry(0.035, 0.035, 0.62), x, 0.17, -3.55));
    andiron.push(place(new THREE.BoxGeometry(0.03, 0.12, 0.03), x, 0.18, -3.84));
  }
  add(mergeGeometries(andiron.map(g => g.index ? g.toNonIndexed() : g), false)!, iron).name = 'hearth-andirons';

  // --- Mantel still life ---------------------------------------------------------
  const vase = add(place(new THREE.LatheGeometry([[0, 0], [0.1, 0.005], [0.13, 0.06], [0.14, 0.18], [0.11, 0.3], [0.065, 0.36], [0.06, 0.4], [0.075, 0.42], [0.06, 0.425], [0.05, 0.4], [0.1, 0.3], [0.12, 0.18], [0.11, 0.05], [0, 0.04]].map(([r, h]) => new THREE.Vector2(r, h)), 48), -1.35, 2.78, -3.18), vaseGlaze);
  vase.name = 'hearth-vase';
  // Dried grasses: thin curved stems with seed heads, merged.
  const grass: THREE.BufferGeometry[] = [];
  for (let k = 0; k < 14; k++) {
    const a = random() * Math.PI * 2, lean = 0.08 + random() * 0.22, height = 0.45 + random() * 0.35;
    const base = new THREE.Vector3(-1.35 + Math.cos(a) * 0.02, 3.1, -3.18 + Math.sin(a) * 0.02);
    const tip = base.clone().add(new THREE.Vector3(Math.cos(a) * lean, height, Math.sin(a) * lean * 0.6));
    const mid = base.clone().lerp(tip, 0.5).add(new THREE.Vector3(Math.cos(a) * 0.04, 0.02, 0));
    const curve = new THREE.QuadraticBezierCurve3(base, mid, tip);
    grass.push(new THREE.TubeGeometry(curve, 10, 0.0025, 4, false));
    for (let s = 0; s < 6; s++) {
      const seedHead = new THREE.SphereGeometry(1, 6, 4);
      const p = curve.getPoint(0.82 + s * 0.03);
      grass.push(place(seedHead, p.x + (random() - 0.5) * 0.02, p.y, p.z, random(), random(), random(), 0.008, 0.022, 0.008));
    }
  }
  add(mergeGeometries(grass.map(g => { g.deleteAttribute('uv'); return g.index ? g.toNonIndexed() : g; }), false)!, dried, false);
  // Brass candlesticks with lit candles.
  const candleFlames: THREE.Mesh[] = [];
  const flameMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform float uTime; varying vec2 vUv;
      void main(){ vec2 p = vUv - vec2(0.5, 0.0); float h = vUv.y; float w = 0.16 * sin(h * 3.14159) * (1.0 - h * 0.45) + 0.015;
        float sway = sin(uTime * 1.1 + h * 2.0) * 0.012 * h;
        float d = abs(p.x - sway) / w; float core = exp(-d * d * 2.2) * smoothstep(0.0, 0.12, h) * (1.0 - smoothstep(0.75, 1.0, h));
        vec3 c = mix(vec3(1.0, 0.45, 0.1), vec3(1.0, 0.86, 0.6), smoothstep(0.1, 0.55, core)) * core * 9.0;
        c += vec3(0.1, 0.2, 0.9) * exp(-d * d * 1.5) * smoothstep(0.18, 0.0, h) * 0.8;
        gl_FragColor = vec4(c, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  for (const [x, height] of [[1.05, 0.2], [1.32, 0.15]] as const) {
    const stick = new THREE.LatheGeometry([[0, 0], [0.065, 0], [0.07, 0.012], [0.04, 0.03], [0.018, 0.06], [0.03, 0.09], [0.016, 0.13], [0.03, 0.15], [0.028, 0.165], [0, 0.165]].map(([r, h]) => new THREE.Vector2(r, h)), 28);
    add(place(stick, x, 2.78, -3.14), brass);
    add(place(new THREE.CylinderGeometry(0.019, 0.02, height, 20), x, 2.945 + height / 2, -3.14), wax);
    const f = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.09), flameMaterial);
    f.position.set(x, 2.945 + height + 0.045, -3.14); f.userData.dynamic = true; f.renderOrder = 4;
    scene.add(f); candleFlames.push(f);
  }
  // A small stack of books lying on the mantel.
  const bookGeometries: THREE.BufferGeometry[] = [];
  const pageGeometries: THREE.BufferGeometry[] = [];
  const bookColors = ['#5b2a22', '#2c3b35', '#6f5b3a', '#3b3446', '#7a6a4f', '#2a3040', '#5e4632'];
  const colorize = (g: THREE.BufferGeometry, c: THREE.Color) => {
    const n = g.attributes.position.count, colors = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) colors.set([c.r, c.g, c.b], i * 3);
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3)); return g;
  };
  const book = (x: number, y: number, z: number, w: number, h: number, d: number, ry: number, rz = 0) => {
    const c = new THREE.Color(bookColors[Math.floor(random() * bookColors.length)]).multiplyScalar(0.8 + random() * 0.4);
    bookGeometries.push(colorize(place(stoneBlock(w, h, d, Math.floor(random() * 999), 0.02, 0.006), x, y, z, 0, ry, rz), c));
    pageGeometries.push(place(new THREE.BoxGeometry(w * 0.96, h * 0.9, d * 0.97), x + Math.sin(ry) * 0.004, y, z + 0.004, 0, ry, rz));
  };
  book(0.42, 2.8, -3.2, 0.3, 0.04, 0.22, 0.12); book(0.45, 2.84, -3.19, 0.27, 0.035, 0.2, -0.05);
  add(mergeGeometries(bookGeometries.map(g => { g.deleteAttribute('uv'); return g.index ? g.toNonIndexed() : g; }), false)!, bookCloth);
  add(mergeGeometries(pageGeometries.map(g => { g.deleteAttribute('uv'); return g.index ? g.toNonIndexed() : g; }), false)!, paper);
  bookGeometries.forEach(g => g.dispose()); pageGeometries.forEach(g => g.dispose());
  // --- Built-in bookcase filling the right alcove, flush with the breast ---------------
  const BC = { x0: BREAST.x1 + 0.02, x1: 4.13, back: -3.98, front: BREAST.front - 0.02, top: 3.76 };
  const caseParts: THREE.BufferGeometry[] = [];
  const caseBlock = (w: number, h: number, d: number, x: number, y: number, z: number, bevel = 0.004) => caseParts.push(place(roundedBlock(w, h, d, bevel, 0.12), x, y, z).toNonIndexed());
  const caseDepth = BC.front - BC.back, caseCz = (BC.front + BC.back) / 2, caseW = BC.x1 - BC.x0, caseCx = (BC.x0 + BC.x1) / 2;
  for (const x of [BC.x0 + 0.02, BC.x1 - 0.02]) caseBlock(0.04, BC.top, caseDepth, x, BC.top / 2, caseCz);
  caseBlock(caseW, 0.05, caseDepth, caseCx, BC.top - 0.025, caseCz);
  caseBlock(caseW, 0.1, 0.03, caseCx, 0.05, BC.front - 0.03);
  caseBlock(caseW + 0.04, 0.045, caseDepth + 0.03, caseCx, 0.8, caseCz + 0.015, 0.008);
  const shelfYs = [1.25, 1.7, 2.15, 2.6, 3.05];
  for (const y of shelfYs) caseBlock(caseW - 0.08, 0.03, caseDepth - 0.04, caseCx, y, caseCz - 0.01, 0.006);
  // Face frame and a deep top rail with a small cornice.
  for (const x of [BC.x0 + 0.035, BC.x1 - 0.035]) caseBlock(0.07, BC.top, 0.03, x, BC.top / 2, BC.front);
  caseBlock(caseW, 0.16, 0.03, caseCx, BC.top - 0.08, BC.front);
  caseParts.push(onWall(straightMoulding(CORNICE_SMALL, caseW + 0.06, { down: true, caps: true }).translate(caseCx, BC.top, 0), new THREE.Vector3(0, 0, BC.front + 0.015), 0).toNonIndexed());
  // Panelled cupboard doors below the counter.
  for (let k = 0; k < 2; k++) {
    const dx0 = BC.x0 + 0.08 + k * (caseW - 0.16) / 2, dx1 = dx0 + (caseW - 0.16) / 2 - 0.01;
    caseBlock(dx1 - dx0, 0.66, 0.022, (dx0 + dx1) / 2, 0.44, BC.front - 0.01);
    caseParts.push(onWall(frameMoulding(PANEL_MOULD, dx0 + 0.07, 0.18, dx1 - 0.07, 0.7), new THREE.Vector3(0, 0, BC.front + 0.001), 0).toNonIndexed());
  }
  add(mergeGeometries(caseParts.map(g => { for (const name of Object.keys(g.attributes)) if (name !== 'position' && name !== 'normal') g.deleteAttribute(name); return g; }), false)!, oak).name = 'hearth-bookcase';
  caseParts.forEach(g => g.dispose());
  add(place(new THREE.PlaneGeometry(caseW - 0.06, BC.top - 0.85), caseCx, 0.82 + (BC.top - 0.85) / 2, BC.back + 0.005), createWoodMaterial('#3a281a', { key: 'hearth-case-back', axis: 'y', rings: 30, figure: 0.5, pores: 0.4, roughness: 0.7, planks: { width: 0.12, length: 4, bevel: 0.002, tone: 0.25 } }), false);
  for (const x of [caseCx - 0.06, caseCx + 0.06]) add(place(new THREE.SphereGeometry(0.016, 12, 8), x, 0.6, BC.front + 0.012), brass, false);
  const shelfRuns = [0.8 + 0.0225, ...shelfYs.map(y => y + 0.015)].map((y, i, all) => ({ x0: BC.x0 + 0.05, x1: BC.x1 - 0.05, y, front: BC.front - 0.025, clear: (i < all.length - 1 ? all[i + 1] - 0.015 : BC.top - 0.16) - y, depth: caseDepth - 0.06 }));
  const books = fillShelves(shelfRuns, random, (run, x) => (run === 1 && x > 3.45 && x < 3.82) || (run === 3 && x > 2.02 && x < 2.32) || (run === 5 && x > 2.9 && x < 3.2));
  add(books, createBookMaterial('hearth-shelves')).name = 'hearth-books';
  add(place(new THREE.LatheGeometry([[0, 0], [0.08, 0.004], [0.1, 0.06], [0.1, 0.16], [0.07, 0.24], [0.06, 0.28], [0.07, 0.3], [0.055, 0.3], [0.05, 0.27], [0.09, 0.17], [0.09, 0.06], [0, 0.05]].map(([r, h]) => new THREE.Vector2(r, h)), 40), 3.62, shelfRuns[1].y, BC.front - 0.2), vaseGlaze);
  const shelfPlant = trailingPlant(7, 7, 0.6, 1.35);
  const potGlaze = createGlazeMaterial('#a2614a', { key: 'hearth-pot', pool: '#6c3a28', speckle: 0.6, scale: 6 });
  const leafMaterial = createLeafMaterial('hearth-pothos', '#4c6b32', { veins: 6, gloss: 0.6 });
  const potProfile = [[0, 0], [0.055, 0], [0.065, 0.02], [0.075, 0.11], [0.08, 0.125], [0.072, 0.128], [0.066, 0.115], [0, 0.11]].map(([r, h]) => new THREE.Vector2(r, h));
  add(place(new THREE.LatheGeometry(potProfile, 32), 2.17, shelfRuns[3].y, BC.front - 0.16), potGlaze);
  add(shelfPlant.leaves.clone().translate(2.17, shelfRuns[3].y, BC.front - 0.16), leafMaterial);
  add(shelfPlant.stems.clone().translate(2.17, shelfRuns[3].y, BC.front - 0.16), dried, false);
  shelfPlant.leaves.dispose(); shelfPlant.stems.dispose();
  // A small framed print propped on the top shelf.
  add(place(roundedBlock(0.22, 0.28, 0.02, 0.006), 3.05, shelfRuns[5].y + 0.14, BC.front - 0.12, -0.12), beam);
  add(place(new THREE.PlaneGeometry(0.16, 0.22), 3.05, shelfRuns[5].y + 0.142, BC.front - 0.108, -0.12), paper, false);
  // A brass picture light over the shelves.
  add(place(new THREE.CylinderGeometry(0.022, 0.022, 0.9, 16), caseCx, BC.top - 0.2, BC.front + 0.13, 0, 0, Math.PI / 2), brass, false);
  add(place(new THREE.CylinderGeometry(0.008, 0.008, 0.14, 8), caseCx, BC.top - 0.16, BC.front + 0.06, Math.PI / 2 - 0.5), brass, false);
  const shelfLight = new THREE.SpotLight('#ffc98c', 2.4, 0, 0.75, 0.9, 2);
  shelfLight.position.set(caseCx, BC.top - 0.36, BC.front + 0.24); shelfLight.target.position.set(caseCx, 0.9, BC.front - 0.25);
  scene.add(shelfLight, shelfLight.target);

  // --- Left alcove: a leather wingback angled to the fire, throw, side table, basket -----
  const chair = wingbackChair();
  const leather = createLeatherMaterial('hearth-wingback', '#6a3519');
  const chairGroup = new THREE.Group(); chairGroup.position.set(-2.72, 0, -2.4); chairGroup.rotation.y = 1.0; scene.add(chairGroup);
  for (const [g, m] of [[chair.leather, leather], [chair.wood, turned]] as const) { const mesh = new THREE.Mesh(g, m); mesh.castShadow = mesh.receiveShadow = true; chairGroup.add(mesh); }
  const draped = armThrow(); draped.scale(-1, 1, 1);
  const drapedMesh = new THREE.Mesh(draped, throwWool); drapedMesh.castShadow = drapedMesh.receiveShadow = true; chairGroup.add(drapedMesh);
  const seatCushion = new THREE.Mesh(cushion(0.4, 0.13, 0.12, 0.35, 32, 13), velvet); seatCushion.position.set(0.05, 0.68, -0.18); seatCushion.rotation.set(-0.35, 0.1, 0.05); seatCushion.castShadow = seatCushion.receiveShadow = true; chairGroup.add(seatCushion);
  // Side table at the chair's left hand with a cup, saucer and an open book.
  const sideTable = new THREE.Group(); sideTable.position.set(-2.62, 0, -1.55); scene.add(sideTable);
  const stTop = new THREE.Mesh(new THREE.LatheGeometry([[0, 0.56], [0.26, 0.56], [0.275, 0.57], [0.28, 0.585], [0.27, 0.6], [0, 0.6]].map(([r, h]) => new THREE.Vector2(r, h)), 48), turned);
  stTop.castShadow = stTop.receiveShadow = true; sideTable.add(stTop);
  const stPost = new THREE.Mesh(new THREE.LatheGeometry([[0.05, 0.03], [0.06, 0.08], [0.035, 0.2], [0.045, 0.35], [0.03, 0.48], [0.045, 0.56]].map(([r, h]) => new THREE.Vector2(r, h)), 20), turned); stPost.castShadow = true; sideTable.add(stPost);
  for (let i = 0; i < 3; i++) { const a = i * Math.PI * 2 / 3; const foot = new THREE.Mesh(roundedBlock(0.05, 0.035, 0.26, 0.01), turned); foot.position.set(Math.sin(a) * 0.12, 0.03, Math.cos(a) * 0.12); foot.rotation.y = a; foot.castShadow = true; sideTable.add(foot); }
  const stSaucer = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [0.1, 0], [0.125, 0.01], [0.135, 0.018], [0.13, 0.021], [0.105, 0.013], [0, 0.01]].map(([r, h]) => new THREE.Vector2(r, h)), 40), cupGlaze);
  stSaucer.position.set(0.08, 0.6, 0.06); sideTable.add(stSaucer);
  const stCup = new THREE.Mesh(new THREE.LatheGeometry([[0.055, 0], [0.065, 0.004], [0.075, 0.02], [0.08, 0.09], [0.083, 0.11], [0.079, 0.112], [0.074, 0.105], [0.071, 0.025], [0, 0.021]].map(([r, h]) => new THREE.Vector2(r, h)), 40), cupGlaze);
  stCup.position.set(0.08, 0.61, 0.06); stCup.castShadow = true; sideTable.add(stCup);
  const stHandle = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.009, 8, 20, Math.PI * 1.3), cupGlaze); stHandle.position.set(0.165, 0.67, 0.06); stHandle.rotation.z = -Math.PI * 0.62; sideTable.add(stHandle);
  const stTea = new THREE.Mesh(new THREE.CircleGeometry(0.074, 32), new THREE.MeshPhysicalMaterial({ color: '#2c160b', roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.12 })); stTea.rotation.x = -Math.PI / 2; stTea.position.set(0.08, 0.705, 0.06); sideTable.add(stTea);
  const openBook = new THREE.Group(); openBook.position.set(-0.07, 0.605, -0.08); openBook.rotation.y = 0.6; sideTable.add(openBook);
  const pageMaterial = new THREE.MeshStandardMaterial({ color: '#e0d6bf', roughness: 0.9, side: THREE.DoubleSide });
  for (const side of [-1, 1]) {
    const leaf = new THREE.PlaneGeometry(0.14, 0.2, 10, 1); leaf.rotateX(-Math.PI / 2);
    const lp = leaf.attributes.position; for (let i = 0; i < lp.count; i++) { const x = lp.getX(i) + 0.07; lp.setXYZ(i, side * x, 0.012 + Math.sin(x / 0.14 * Math.PI * 0.9) * 0.018 - x * 0.04, lp.getZ(i)); }
    leaf.computeVertexNormals();
    const pagesMesh = new THREE.Mesh(leaf, pageMaterial); pagesMesh.castShadow = true; openBook.add(pagesMesh);
  }
  const bookBoard = new THREE.Mesh(roundedBlock(0.3, 0.01, 0.21, 0.003), new THREE.MeshStandardMaterial({ color: '#4a2a22', roughness: 0.7 })); bookBoard.position.y = 0.005; openBook.add(bookBoard);
  // Basket of split logs on the hearth's left flag.
  const basket = logBasket(random);
  const basketWeave = createFabricMaterial('#7d6545', { key: 'hearth-basket', weave: 'twill', threads: [46, 30], heather: 0.8, threadContrast: 0.9, fuzz: 0.4, depth: 0.004, roughness: 0.85 });
  add(basket.basket.translate(-2.02, 0.12, -2.72), basketWeave);
  add(basket.logs.translate(-2.02, 0.12, -2.72), createWoodMaterial('#9a7a55', { key: 'hearth-splitwood', axis: 'z', localFrame: true, pith: [0, 0], bark: '#3b2d22', rings: 70, figure: 0.8, pores: 0.3, wear: 0, roughness: 0.9, bump: 1.4 }));

  // An oil landscape in a gilt frame over the wingback, lit from below by the sconce.
  const gilt = patchSurface(new THREE.MeshStandardMaterial({ color: '#b08a4a', metalness: 1, roughness: 0.38 }), {
    key: 'hearth-gilt', color: 'float gtN = bwFbm3(vSurfaceWorld * 22.0); diffuseColor.rgb *= 0.7 + 0.35 * gtN; diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.12, 0.08, 0.04), smoothstep(0.35, 0.6, gtN) * 0.35);',
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.25 * gtN, 0.2, 1.0);',
  });
  const paint = { x: -3.0, y: 3.0, w: 1.12, h: 0.82 };
  const paintOrigin = new THREE.Vector3(0, 0, -3.985);
  add(onWall(frameMoulding(PICTURE_FRAME, paint.x - paint.w / 2, paint.y - paint.h / 2, paint.x + paint.w / 2, paint.y + paint.h / 2), paintOrigin, 0), gilt).name = 'hearth-painting-frame';
  const canvasMaterial = patchSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.55 }), {
    key: 'hearth-oil',
    color: `
vec2 cv = vSurfaceUv;
// Dusk over a valley: warm sky, blue hills, a dark wood and a river catching the light; impasto strokes.
float stroke = bwNoise(vec3(cv.x * 60.0, cv.y * 18.0, 2.0)) * 0.5 + bwNoise(vec3(cv * 140.0, 5.0)) * 0.25;
vec3 skyTop = vec3(0.18, 0.19, 0.22), skyLow = vec3(0.6, 0.45, 0.28);
vec3 c = mix(skyLow, skyTop, smoothstep(0.45, 1.0, cv.y + stroke * 0.04));
float hillFar = 0.5 + 0.05 * sin(cv.x * 7.0 + 1.0) + 0.03 * bwNoise(vec3(cv * 6.0, 1.0));
float hillNear = 0.38 + 0.08 * sin(cv.x * 4.0 - 0.6) + 0.04 * bwNoise(vec3(cv * 9.0, 3.0));
c = mix(c, vec3(0.3, 0.3, 0.31), smoothstep(hillFar + 0.008, hillFar - 0.008, cv.y));
c = mix(c, vec3(0.14, 0.12, 0.08), smoothstep(hillNear + 0.01, hillNear - 0.01, cv.y));
float river = smoothstep(0.015, 0.0, abs(cv.y - 0.18 - 0.06 * sin(cv.x * 5.0)) - 0.004) * step(cv.y, 0.32);
c = mix(c, vec3(0.55, 0.45, 0.32), river * 0.6);
c *= 0.72;
c *= 0.9 + 0.2 * stroke;
// Old varnish: a warm, slightly darkened film, crazing in the corners.
c = mix(c, c * vec3(0.95, 0.8, 0.55), 0.35);
diffuseColor.rgb = c;`,
    height: 'stroke * 0.0004',
  });
  add(onWall(new THREE.PlaneGeometry(paint.w - 0.1, paint.h - 0.1).translate(paint.x, paint.y, 0.014), paintOrigin, 0), canvasMaterial, false);

  // --- Mantel: a clock, and a trailing plant spilling over the edge ---------------------
  const clock = mantelClock();
  const clockPos = new THREE.Vector3(-0.5, 2.78, -3.1);
  add(clock.wood.translate(clockPos.x, clockPos.y, clockPos.z), createWoodMaterial('#4a2c1a', { key: 'hearth-clock', axis: 'x', rings: 40, figure: 0.8, pores: 0.4, varnish: 0.8, roughness: 0.35 }));
  add(clock.bezel.translate(clockPos.x, clockPos.y, clockPos.z), brass, false);
  add(clock.dial.translate(clockPos.x, clockPos.y, clockPos.z), createDialMaterial('hearth-clock', new THREE.Vector3(clockPos.x, clockPos.y + 0.17, 0)), false);
  const mantelPlant = trailingPlant(19, 9, 0.85, 1.6);
  const mpPos = new THREE.Vector3(0.78, 2.78, -3.02);
  add(place(new THREE.LatheGeometry(potProfile, 32), mpPos.x, mpPos.y, mpPos.z), potGlaze);
  add(mantelPlant.leaves.translate(mpPos.x, mpPos.y, mpPos.z), leafMaterial);
  add(mantelPlant.stems.translate(mpPos.x, mpPos.y, mpPos.z), dried, false);

  // Fire tools on a stand to the right of the hearth.
  const toolsX = 2.05, toolsZ = -2.95;
  add(place(new THREE.CylinderGeometry(0.14, 0.16, 0.03, 32), toolsX, 0.135, toolsZ), iron);
  add(place(new THREE.CylinderGeometry(0.013, 0.016, 0.82, 10), toolsX, 0.56, toolsZ), iron);
  add(place(new THREE.TorusGeometry(0.06, 0.009, 8, 24), toolsX, 0.96, toolsZ, 0, 0.3), iron);
  for (let i = 0; i < 3; i++) {
    const a = i / 3 * Math.PI * 2 + 0.4;
    const tx = toolsX + Math.cos(a) * 0.05, tz = toolsZ + Math.sin(a) * 0.05;
    add(place(new THREE.CylinderGeometry(0.008, 0.008, 0.74, 8), tx, 0.55, tz, Math.sin(a) * 0.05, 0, -Math.cos(a) * 0.05), iron);
    add(place(new THREE.SphereGeometry(0.018, 12, 8), tx, 0.93, tz), brass);
    if (i === 0) add(place(new THREE.BoxGeometry(0.11, 0.14, 0.012), tx, 0.2, tz, 0, a), iron);
  }

  // Wall sconce, left of the breast: brass arm and a linen shade lit from inside.
  const sconceX = -2.95, sconceY = 2.25;
  add(place(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 24), sconceX, sconceY, -3.99, Math.PI / 2), brass);
  add(place(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(sconceX, sconceY, -3.98), new THREE.Vector3(sconceX, sconceY - 0.06, -3.76), new THREE.Vector3(sconceX, sconceY + 0.06, -3.72)), 16, 0.012, 8, false), 0, 0, 0), brass);
  const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.18, 0.24, 48, 1, true), linenShade);
  shade.position.set(sconceX, sconceY + 0.2, -3.72); shade.castShadow = false; scene.add(shade);
  const sconceLight = new THREE.PointLight('#ffc183', 1.3, 0, 2);
  sconceLight.position.set(sconceX, sconceY + 0.16, -3.7); scene.add(sconceLight);

  // --- Foreground: rug, armchair, throw and side table -----------------------------
  const rugGeometry = clothSheet(90, 90, (u, v, target) => {
    const x = -1.85 + u * 3.6, z = 1.55 - v * 3.8;
    const wrinkle = Math.max(0, noise3(x * 0.9, 1.3, z * 0.9)) * 0.012 + noise3(x * 4, 2, z * 4) * 0.0015;
    target.set(x, 0.012 + wrinkle, z);
  }, 0.011, [3.6, 3.8]);
  const rugMesh = add(rugGeometry, rug, false); rugMesh.rotation.y = -0.03; rugMesh.name = 'hearth-rug';
  // Fringe on the far edge.
  const fringe: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 70; i++) {
    const x = -1.83 + i * 0.052, len = 0.06 + random() * 0.03;
    fringe.push(place(new THREE.CylinderGeometry(0.004, 0.003, len, 4), x, 0.008, -2.25 - len / 2, Math.PI / 2 + (random() - 0.5) * 0.2, 0, (random() - 0.5) * 0.3));
  }
  const fringeMesh = add(mergeGeometries(fringe.map(g => { g.deleteAttribute('uv'); return g.toNonIndexed(); }), false)!, throwWool, false);
  fringeMesh.rotation.y = -0.03;

  const chairArms: THREE.Object3D[] = [];
  for (const side of [-1, 1]) {
    const arm = new THREE.Group(); arm.userData.dynamic = true;
    const body = new THREE.Mesh(cushion(0.36, 0.56, 2.0, 0.28, 48, side * 3), velvet); body.position.y = 0.0; body.castShadow = body.receiveShadow = true;
    const roll = new THREE.Mesh(cushion(0.44, 0.2, 2.06, 0.45, 40, side * 5), velvet); roll.position.set(side * 0.02, 0.3, 0); roll.castShadow = roll.receiveShadow = true;
    const pipe = new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(-side * 0.2, 0.31, -1.02), new THREE.Vector3(-side * 0.2, 0.31, 1.02)), 8, 0.012, 8, false), piping);
    arm.add(body, roll, pipe);
    arm.position.set(side * 1.04, 0.62, 2.02); arm.rotation.y = side * -0.035;
    scene.add(arm); chairArms.push(arm);
  }
  const seat = new THREE.Mesh(cushion(1.75, 0.3, 1.6, 0.35, 40, 8), velvet); seat.position.set(0, 0.32, 2.42); seat.castShadow = seat.receiveShadow = true; seat.userData.dynamic = true; scene.add(seat);
  // Knitted throw over the knees, hanging off the front of the seat.
  const throwGeometry = clothSheet(80, 100, (u, v, target) => {
    const x = (u - 0.5) * 1.62, d = v * 1.9;
    const knee = 0.14 * Math.exp(-((x + 0.25) ** 2) * 9) + 0.14 * Math.exp(-((x - 0.28) ** 2) * 9);
    const lapD = Math.min(d, 1.15);
    const lap = 0.62 + knee * THREE.MathUtils.smoothstep(lapD, 0.3, 1.0) + Math.sin(x * 9 + lapD * 2.3) * 0.01 + noise3(x * 3, lapD * 3, 4) * 0.018;
    // Beyond the knees the throw falls toward the floor in soft vertical folds.
    const e = Math.max(0, d - 1.15) / 0.75;
    const folds = Math.sin(x * 13 + 1.3) * 0.035 * e + noise3(x * 5, e * 2, 9) * 0.02 * e;
    target.set(x * (1 + e * 0.06), lap - Math.pow(e, 1.25) * 0.5, 2.65 - lapD - e * 0.18 + folds);
  }, 0.014, [1.62, 1.9]);
  const throwMesh = add(throwGeometry, throwWool); throwMesh.userData.dynamic = true; throwMesh.name = 'hearth-throw';

  const table = new THREE.Group(); scene.add(table); table.position.set(1.51, 0, 0.05);
  const top = new THREE.Mesh(new THREE.LatheGeometry([[0, 0.6], [0.5, 0.6], [0.52, 0.61], [0.53, 0.63], [0.52, 0.65], [0.5, 0.655], [0, 0.655]].map(([r, h]) => new THREE.Vector2(r, h)), 64), turned);
  top.castShadow = top.receiveShadow = true; table.add(top);
  for (const a of [0.2, 2.3, 4.4]) {
    const leg = new THREE.Mesh(new THREE.LatheGeometry([[0.03, 0], [0.034, 0.05], [0.022, 0.2], [0.03, 0.34], [0.026, 0.45], [0.034, 0.56], [0.028, 0.6]].map(([r, h]) => new THREE.Vector2(r, h)), 16), turned);
    leg.position.set(Math.sin(a) * 0.34, 0, Math.cos(a) * 0.34); leg.rotation.set(Math.cos(a) * 0.1, 0, -Math.sin(a) * 0.1); leg.castShadow = leg.receiveShadow = true; table.add(leg);
  }
  const cupProfile = [[0.07, 0], [0.085, 0.004], [0.095, 0.02], [0.1, 0.11], [0.104, 0.135], [0.1, 0.138], [0.093, 0.13], [0.09, 0.03], [0, 0.026]].map(([r, h]) => new THREE.Vector2(r, h));
  const saucer = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [0.12, 0], [0.15, 0.012], [0.165, 0.022], [0.16, 0.026], [0.13, 0.016], [0, 0.012]].map(([r, h]) => new THREE.Vector2(r, h)), 48), cupGlaze);
  saucer.position.set(-0.1, 0.655, -0.12); table.add(saucer);
  const cup = new THREE.Mesh(new THREE.LatheGeometry(cupProfile, 48), cupGlaze); cup.position.set(-0.1, 0.668, -0.12); cup.castShadow = true; table.add(cup);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.011, 10, 24, Math.PI * 1.3), cupGlaze); handle.position.set(0.005, 0.74, -0.12); handle.rotation.z = -Math.PI * 0.62; table.add(handle);
  const tea = new THREE.Mesh(new THREE.CircleGeometry(0.093, 40), new THREE.MeshPhysicalMaterial({ color: '#2c160b', roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.12 }));
  tea.rotation.x = -Math.PI / 2; tea.position.set(-0.1, 0.785, -0.12); table.add(tea);
  const tableBook = new THREE.Mesh(stoneBlock(0.3, 0.04, 0.4, 909, 0.02, 0.006), bookCloth);
  colorize(tableBook.geometry, new THREE.Color('#3d4f46'));
  tableBook.position.set(0.18, 0.676, 0.16); tableBook.rotation.y = 0.25; tableBook.castShadow = true; table.add(tableBook);
  const tablePages = new THREE.Mesh(new THREE.BoxGeometry(0.29, 0.033, 0.385), paper); tablePages.position.set(0.184, 0.676, 0.163); tablePages.rotation.y = 0.25; table.add(tablePages);

  // --- Lights ----------------------------------------------------------------------
  // The fire light lives in the fire group. Warm floor bounce off hearth and rug;
  // a faint cool ambient so the deepest shadows keep their form.
  const floorBounce = new THREE.PointLight('#ff9550', 1.2, 0, 2); floorBounce.position.set(0.0, 0.3, -1.6); scene.add(floorBounce);
  const ceilingBounce = new THREE.PointLight('#ff9d62', 0.6, 0, 2); ceilingBounce.position.set(0.0, 3.4, -2.2); scene.add(ceilingBounce);
  scene.add(new THREE.HemisphereLight('#2a3140', '#120d09', 0.05));
  // A low reading lamp behind the right shoulder (out of view) pools on the lap.
  const readingLamp = new THREE.SpotLight('#ffcf94', 5.5, 0, 0.62, 0.9, 2);
  readingLamp.position.set(1.35, 2.25, 3.7); readingLamp.target.position.set(0.25, 0.55, 1.55);
  readingLamp.castShadow = true; readingLamp.shadow.mapSize.set(1024, 1024); readingLamp.shadow.radius = 5;
  readingLamp.shadow.bias = -0.0008; readingLamp.shadow.normalBias = 0.02; readingLamp.shadow.camera.near = 0.3; readingLamp.shadow.camera.far = 8;
  readingLamp.shadow.autoUpdate = false; readingLamp.shadow.needsUpdate = true;
  scene.add(readingLamp, readingLamp.target);
  // The two candles throw a soft glow over the stone above the mantel.
  const candleLight = new THREE.PointLight('#ffb46b', 0.32, 3.2, 2); candleLight.position.set(1.18, 3.1, -3.02); scene.add(candleLight);
  // A small unshadowed light dancing in the firebox mouth: moving warm shading on the hearth, chair and shelves.
  const dance = new THREE.PointLight('#ff8a3a', 1.1, 9, 2); dance.position.set(0, 0.5, -2.85); scene.add(dance);

  batchStatic(scene);

  let response = 0;
  let probe: THREE.WebGLRenderTarget | null = null;
  let volumeUniforms: Record<string, THREE.IUniform> | null = null;
  const fireOpening = { centre: new THREE.Vector3(0, 1.0, BREAST.front + 0.02), right: new THREE.Vector3(OPENING.rx, 0, 0), up: new THREE.Vector3(0, 1.0, 0) };
  return {
    scene, camera,
    post: {
      exposure: 1.5, bloomStrength: 0.1, bloomThreshold: 0, aoStrength: 1.0, aoRadius: 0.42,
      saturation: 1.04, contrast: 1.1, shadowTint: [0.86, 0.94, 1.1], highlightTint: [1.07, 1.0, 0.9], vignette: 0.55, grain: 0.03,
    },
    createVolume() {
      const effect = createRoomVolume({
        haze: 0.035, dust: 0.7, anisotropy: 0.3, maxDistance: 10,
        glow: { position: fire.flameCentre.clone().add(new THREE.Vector3(0, 0.15, 0)), color: new THREE.Color(1.0, 0.5, 0.18).multiplyScalar(0.9), opening: fireOpening },
        ambient: new THREE.Color(0.004, 0.0035, 0.003),
      });
      volumeUniforms = effect.uniforms;
      return effect;
    },
    prepare(renderer) {
      // The room lights itself: capture its radiance once for reflections and bounce.
      probe = captureRoomProbe(renderer, scene, new THREE.Vector3(0.2, 1.4, 0.2), 0.9, { hide: [...candleFlames] });
    },
    resize(aspect) {
      camera.aspect = aspect;
      if (aspect < 0.8) {
        camera.fov = 55;
        camera.position.set(0.08, 1.18, 2.20);
        camera.lookAt(0.02, 1.02, -2.95);
      } else if (aspect < 1.25) {
        camera.fov = 50;
        camera.position.set(0.10, 1.24, 2.60);
        camera.lookAt(0.05, 1.37, -2.95);
      } else {
        camera.fov = 50;
        camera.position.set(0.31, 1.23, 2.70);
        camera.lookAt(0.05, 1.36, -3.0);
      }
      // The seated viewer is half a metre nearer the fire in the narrow composition.
      const near = aspect < 0.8 ? -0.5 : 0;
      chairArms.forEach((arm, i) => { arm.position.x = (i === 0 ? -1 : 1) * (aspect < 0.8 ? 0.7 : 1.04); arm.position.z = 2.02 + near; });
      seat.position.z = 2.42 + near; throwMesh.position.z = near;
      // Moved furniture needs its shadows redrawn once.
      readingLamp.shadow.needsUpdate = true; fire.light.shadow.needsUpdate = true;
      camera.updateProjectionMatrix();
    },
    update(time, dt) {
      response = Math.max(0, response - dt * 0.28);
      const flicker = fire.update(time, response);
      dance.position.set(Math.sin(time * 2.3) * 0.18 + Math.sin(time * 5.1) * 0.06, 0.45 + Math.sin(time * 3.7) * 0.06, -2.85 + Math.sin(time * 1.7) * 0.05);
      dance.intensity = 1.1 * flicker * (0.85 + 0.15 * Math.sin(time * 6.3));
      if (volumeUniforms) (volumeUniforms.uGlowColor.value as THREE.Color).setRGB(0.9, 0.45, 0.16).multiplyScalar(0.75 + 0.25 * flicker);
      floorBounce.intensity = 1.2 * flicker;
      ceilingBounce.intensity = 0.6 * (0.6 + 0.4 * flicker);
      flameMaterial.uniforms.uTime.value = time;
      candleLight.intensity = 0.32 * (1 + 0.04 * Math.sin(time * 1.3) + 0.03 * Math.sin(time * 2.2 + 1.0));
      linenShade.emissiveIntensity = 2.2;
    },
    interact(action) {
      if (action !== 'log') return null;
      response = 1;
      return { type: 'ember', intensity: 0.2 };
    },
    dispose() { probe?.dispose(); probe = null; },
  };
}
