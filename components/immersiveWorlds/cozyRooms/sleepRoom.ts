import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldBuild } from './contracts';
import { batchStatic, cushion } from './geometry';
import { captureRoomProbe, createRoomVolume } from './lighting';
import { ARCHITRAVE, CORNICE, DADO_RAIL, PANEL_MOULD, PICTURE_FRAME, SKIRTING, createWallpaperMaterial, frameMoulding, metricPlane, onWall, roundedBlock, straightMoulding, wallWithOpenings } from './roomTrim';
import { type BedBox, duvetGeometry, duvetLift, headboardGeometry, pillowGeometry, sheetGeometry, throwGeometry, turnDownGeometry } from './bedding';
import { createLeafMaterial, fiddleLeafFig } from './houseplant';
import { createNightView } from './nightView';
import { createWoodMaterial } from '../shared/render/woodSurface';
import { applyFabricSurface, createFabricMaterial } from '../shared/render/fabricSurface';
import { createGlazeMaterial, createPlasterMaterial, patchSurface } from '../shared/render/interiorSurface';
import { applyFoliageShading, type CanopyLight } from '../shared/render/foliageShading';
import { seeded } from '../shared/render/noise';

/*
 * 수면 준비: a bedroom at night, seen from a reading chair in the corner. The
 * made bed stands against the left wall under a framed print; a casement
 * window between long linen curtains looks onto a moonlit garden, where the
 * lower boughs of a lime tree sway slowly across a sky of twinkling stars.
 * The moon is the key: a cold, shadowed beam through the glazing lays the
 * window bars across the duvet and the rug, broken into soft leaf dapples by
 * the tree, with dust drifting in it. A ceramic lamp on the far nightstand is
 * the warm counterpoint and can be dimmed; the curtain gap can be widened.
 * Walls are embossed wallpaper above a panelled dado, with a moulded skirting,
 * cornice and architrave. Original procedural work.
 */

const ROOM = { x0: -2.6, x1: 2.6, z0: -3.0, z1: 3.3, h: 2.75 };
const WIN = { x0: -1.3, x1: 0.5, y0: 0.86, y1: 2.32, glass: -3.15, reveal: 0.26 };
const WIN_CX = (WIN.x0 + WIN.x1) / 2;
/** Direction moonlight travels (into the room, down and to the left). */
const MOON_DIR = new THREE.Vector3(-0.42, -0.6, 1).normalize();
const TO_MOON = MOON_DIR.clone().negate();
const BED: BedBox = { x0: -2.42, x1: -0.5, z0: -2.16, z1: -0.66, top: 0.6 };
const DADO = 0.9;
const ROD_Y = 2.55;

export function createSleepRoomWorld(): WorldBuild {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0.01, 0.014, 0.03);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.05, 160);
  const random = seeded(0x51ee9);
  const matrix = new THREE.Matrix4(), euler = new THREE.Euler(), quat = new THREE.Quaternion(), pos = new THREE.Vector3(), scl = new THREE.Vector3();
  const place = (geometry: THREE.BufferGeometry, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => {
    matrix.compose(pos.set(x, y, z), quat.setFromEuler(euler.set(rx, ry, rz)), scl.set(sx, sy, sz));
    return geometry.applyMatrix4(matrix);
  };
  let destination: THREE.Object3D = scene;
  const add = (geometry: THREE.BufferGeometry, material: THREE.Material, shadow = true) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = shadow; mesh.receiveShadow = true; destination.add(mesh); return mesh;
  };
  const timeUniform = { value: 0 };

  // --- The garden outside (also gives the moon's leaf dapples) ------------------------------
  const eye = new THREE.Vector3(1.5, 1.25, 2.5);
  // The visible disc sits in the upper panes from both compositions.
  const moonDisc = new THREE.Vector3(-0.36, 0.12, -1).normalize();
  const view = createNightView({ toMoon: TO_MOON, moonDisc, time: timeUniform, eye });
  scene.add(view.group);
  const canopy: CanopyLight = view.canopy;
  /** Interior surfaces in the moonbeam take the tree's dapples on the moon (first directional) light. */
  const dappled = <T extends THREE.MeshStandardMaterial>(material: T, key: string) => applyFoliageShading(material, { key: `sleep-dapple-${key}`, canopy });

  // --- Materials --------------------------------------------------------------------------
  const wallpaper = dappled(createWallpaperMaterial('#5f6a66', { key: 'sleep-wall', ink: '#77827c', emboss: 0.0005, repeat: [0.2, 0.29] }), 'wallpaper');
  const panelPaint = dappled(patchSurface(new THREE.MeshStandardMaterial({ color: '#d6d2c6', roughness: 0.5 }), {
    key: 'sleep-paint',
    color: 'float ptN = bwNoise(vSurfaceWorld * vec3(3.0, 40.0, 3.0)); diffuseColor.rgb *= 0.97 + 0.03 * ptN;',
    height: 'bwNoise(vSurfaceWorld * vec3(90.0, 6.0, 90.0)) * 0.00004',
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.08 * ptN, 0.3, 1.0);',
  }), 'paint');
  const ceilingPaint = createPlasterMaterial('#b3b1aa', { key: 'sleep-ceiling', stains: 0.1, bump: 0.5 });
  const floor = dappled(createWoodMaterial('#7a5a3e', { key: 'sleep-floor', axis: 'z', rings: 22, figure: 0.65, pores: 0.35, wear: 0.25, varnish: 0.55, roughness: 0.4, planks: { width: 0.16, length: 2.1, bevel: 0.0035, tone: 0.32 } }), 'floor');
  const walnut = createWoodMaterial('#5a3d2a', { key: 'sleep-walnut', axis: 'x', rings: 30, figure: 0.8, pores: 0.5, wear: 0.1, varnish: 0.6, roughness: 0.4 });
  const walnutZ = createWoodMaterial('#5a3d2a', { key: 'sleep-walnut-z', axis: 'z', rings: 30, figure: 0.8, pores: 0.5, wear: 0.1, varnish: 0.6, roughness: 0.4 });
  const walnutY = createWoodMaterial('#5a3d2a', { key: 'sleep-walnut-y', axis: 'y', rings: 30, figure: 0.8, pores: 0.5, wear: 0.1, varnish: 0.6, roughness: 0.4 });
  const sashPaint = dappled(patchSurface(new THREE.MeshStandardMaterial({ color: '#e2ded4', roughness: 0.45 }), {
    key: 'sleep-sash', color: 'diffuseColor.rgb *= 0.96 + 0.04 * bwNoise(vSurfaceWorld * 30.0);', height: 'bwNoise(vSurfaceWorld * vec3(4.0, 70.0, 4.0)) * 0.00005',
  }), 'sash');
  const duvetLinen = dappled(createFabricMaterial('#d3d5cf', { key: 'sleep-duvet', weave: 'plain', threads: [380, 380], heather: 0.7, threadContrast: 0.55, fuzz: 0.45, depth: 0.0004, sheen: 0.55, sheenColor: '#f2f4f2', roughness: 0.88 }, { side: THREE.DoubleSide }), 'duvet');
  const cotton = dappled(createFabricMaterial('#e7e4dc', { key: 'sleep-cotton', weave: 'plain', threads: [520, 520], heather: 0.3, fuzz: 0.25, depth: 0.0003, sheen: 0.45, sheenColor: '#ffffff', roughness: 0.82 }, { side: THREE.DoubleSide }), 'cotton');
  const oatLinen = dappled(createFabricMaterial('#c6bdaa', { key: 'sleep-sham', weave: 'plain', threads: [240, 240], heather: 0.9, threadContrast: 0.7, fuzz: 0.5, depth: 0.0006, sheen: 0.5, sheenColor: '#e8e0cc', roughness: 0.9 }), 'sham');
  const velvet = dappled(createFabricMaterial('#8a5a24', { key: 'sleep-velvet', weave: 'velvet', threads: [80, 80], heather: 0.8, fuzz: 0.7, depth: 0.0006, sheen: 1, sheenColor: '#d9a65c', roughness: 0.75 }), 'velvet');
  const boucle = createFabricMaterial('#46505a', { key: 'sleep-headboard', weave: 'knit', threads: [160, 200], heather: 0.9, threadContrast: 0.5, fuzz: 1, depth: 0.0009, sheen: 0.7, sheenColor: '#8b98a6', roughness: 0.9 });
  const knit = dappled(createFabricMaterial('#8c4c33', { key: 'sleep-throw', weave: 'knit', threads: [36, 48], heather: 0.7, threadContrast: 0.4, fuzz: 0.9, depth: 0.004, sheen: 0.8, sheenColor: '#e0a080', roughness: 0.95 }, { side: THREE.DoubleSide }), 'throw');
  const rugWool = dappled(createFabricMaterial('#d2cab9', {
    key: 'sleep-rug', weave: 'velvet', threads: [120, 120], heather: 0.9, fuzz: 1, depth: 0.002, roughness: 0.98,
    pattern: `
{
  // A Berber lattice: irregular charcoal lozenges hand-knotted on cream pile.
  vec2 rq = fbUv / vec2(0.42, 0.62);
  vec2 rf = fract(rq) - 0.5;
  float wob = 0.03 * sin(fbUv.y * 9.0 + fbUv.x * 3.0) + 0.02 * bwNoise(vec3(fbUv * 4.0, 2.0));
  float lozenge = abs(abs(rf.x) + abs(rf.y) - 0.48 + wob);
  float line = 1.0 - smoothstep(0.022, 0.05, lozenge);
  vec2 edge = min(fbUv, vec2(2.4, 3.1) - fbUv);
  float border = 1.0 - smoothstep(0.05, 0.07, abs(min(edge.x, edge.y) - 0.12));
  fbBase = mix(fbBase, vec3(0.06, 0.055, 0.05), clamp(line + border, 0.0, 1.0) * 0.85);
}`,
  }, { side: THREE.DoubleSide }), 'rug');
  const brass = patchSurface(new THREE.MeshStandardMaterial({ color: '#b08b55', metalness: 1, roughness: 0.3 }), {
    key: 'sleep-brass', color: 'float brN = bwFbm3(vSurfaceWorld * 14.0); diffuseColor.rgb *= 0.75 + 0.3 * brN;', roughness: 'roughnessFactor = clamp(roughnessFactor + 0.2 * brN, 0.12, 1.0);',
  });
  const lampGlaze = createGlazeMaterial('#9aa596', { key: 'sleep-lamp', pool: '#5d6b5c', speckle: 0.5, scale: 4 });
  const shadeLinen = createFabricMaterial('#e6d6b4', { key: 'sleep-shade', weave: 'plain', threads: [300, 300], roughness: 0.9 }, { side: THREE.DoubleSide, emissive: '#ffad5c', emissiveIntensity: 1 });
  const windowGlass = new THREE.MeshStandardMaterial({ color: '#000000', roughness: 0.12, metalness: 0, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, envMapIntensity: 0.22 });
  const pictureGlass = new THREE.MeshStandardMaterial({ color: '#000000', roughness: 0.12, metalness: 0, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, envMapIntensity: 1.4 });
  const drinkGlass = new THREE.MeshPhysicalMaterial({ color: '#d7e3e8', roughness: 0.14, metalness: 0, transparent: true, opacity: 0.2, side: THREE.DoubleSide, depthWrite: false, clearcoat: 0.6, clearcoatRoughness: 0.14 });
  const paper = new THREE.MeshStandardMaterial({ color: '#d2cab2', roughness: 0.92 });
  const bookCloth = createFabricMaterial('#ffffff', { key: 'sleep-books', weave: 'plain', threads: [500, 500], roughness: 0.75 }, { vertexColors: true });
  const blackFrame = createWoodMaterial('#211a15', { key: 'sleep-picture-frame', axis: 'z', rings: 40, figure: 0.3, pores: 0.4, varnish: 0.5, roughness: 0.45 });
  const matBoard = new THREE.MeshStandardMaterial({ color: '#e4dfd2', roughness: 0.95 });

  // --- Lights: moon key, lamp, a faint sky fill ------------------------------------------
  const moon = new THREE.DirectionalLight(new THREE.Color(0.6, 0.7, 1.0), 5.2);
  const moonTarget = new THREE.Vector3(-0.3, 0.6, -0.4);
  moon.position.copy(moonTarget).addScaledVector(MOON_DIR, -12);
  moon.target.position.copy(moonTarget);
  moon.castShadow = true; moon.shadow.mapSize.set(2048, 2048);
  // Covers the whole room so nothing outside the map is lit through the walls.
  Object.assign(moon.shadow.camera, { left: -4.6, right: 4.6, top: 4.6, bottom: -4.6, near: 4, far: 22 });
  moon.shadow.bias = -0.0004; moon.shadow.normalBias = 0.015; moon.shadow.radius = 3;
  moon.shadow.autoUpdate = false; moon.shadow.needsUpdate = true;
  scene.add(moon, moon.target);
  scene.add(new THREE.HemisphereLight('#3a4f80', '#1a1712', 0.2));
  // Sky light: the whole bright pane of night sky, a broad soft cool spot from just outside the glass.
  const skyLight = new THREE.SpotLight(new THREE.Color(0.5, 0.6, 0.95), 20, 0, 1.45, 1, 2);
  skyLight.position.set(WIN_CX + 0.3, (WIN.y0 + WIN.y1) / 2 + 0.6, ROOM.z0 - 2.2); skyLight.target.position.set(WIN_CX - 0.6, 0.3, 0.8);
  skyLight.castShadow = true; skyLight.shadow.mapSize.set(1024, 1024); skyLight.shadow.radius = 10; skyLight.shadow.bias = -0.0006; skyLight.shadow.normalBias = 0.03;
  skyLight.shadow.camera.near = 1.0; skyLight.shadow.camera.far = 12; skyLight.shadow.autoUpdate = false; skyLight.shadow.needsUpdate = true;
  scene.add(skyLight, skyLight.target);

  // --- Room shell: wallpaper over a panelled dado, skirting, cornice ----------------------
  const W = ROOM.x1 - ROOM.x0, D = ROOM.z1 - ROOM.z0;
  // Back wall (window wall) around the opening, as rectangles so uv stays continuous.
  const backRect = (x0: number, y0: number, x1: number, y1: number, material: THREE.Material) =>
    add(place(metricPlane(x1 - x0, y1 - y0, [1, 1], [x0 - ROOM.x0, y0]), (x0 + x1) / 2, (y0 + y1) / 2, ROOM.z0), material, true);
  backRect(ROOM.x0, DADO, WIN.x0, ROOM.h, wallpaper); backRect(WIN.x1, DADO, ROOM.x1, ROOM.h, wallpaper); backRect(WIN.x0, WIN.y1, WIN.x1, ROOM.h, wallpaper);
  backRect(ROOM.x0, 0, WIN.x0, DADO, panelPaint); backRect(WIN.x1, 0, ROOM.x1, DADO, panelPaint); backRect(WIN.x0, 0, WIN.x1, WIN.y0, panelPaint);
  // Outer face of the wall (casts the window shadow) and the reveals.
  const outer = wallWithOpenings(W + 1, ROOM.h + 1, [{ x0: WIN.x0, y0: WIN.y0 + 0.5, x1: WIN.x1, y1: WIN.y1 + 0.5 }]);
  const outerMesh = add(place(outer, 0, -0.5, ROOM.z0 - WIN.reveal), new THREE.MeshStandardMaterial({ color: '#3b3a37', roughness: 0.95, side: THREE.DoubleSide }), true);
  outerMesh.name = 'sleep-wall-outer';
  for (const [x, ry] of [[WIN.x0, Math.PI / 2], [WIN.x1, -Math.PI / 2]] as const) add(place(metricPlane(WIN.reveal, WIN.y1 - WIN.y0), x, (WIN.y0 + WIN.y1) / 2, ROOM.z0 - WIN.reveal / 2, 0, ry), panelPaint);
  add(place(metricPlane(WIN.x1 - WIN.x0, WIN.reveal), WIN_CX, WIN.y1, ROOM.z0 - WIN.reveal / 2, Math.PI / 2), panelPaint);
  // Side and front walls.
  add(place(metricPlane(D, ROOM.h - DADO, [1, 1], [0, DADO]), ROOM.x0, DADO + (ROOM.h - DADO) / 2, (ROOM.z0 + ROOM.z1) / 2, 0, Math.PI / 2), wallpaper, false).name = 'sleep-wall-left';
  add(place(metricPlane(D, DADO), ROOM.x0, DADO / 2, (ROOM.z0 + ROOM.z1) / 2, 0, Math.PI / 2), panelPaint, false);
  // The right wall and ceiling are where moonlight would otherwise leak in: they cast.
  add(place(metricPlane(D, ROOM.h - DADO, [1, 1], [3, DADO]), ROOM.x1, DADO + (ROOM.h - DADO) / 2, (ROOM.z0 + ROOM.z1) / 2, 0, -Math.PI / 2), wallpaper, true);
  add(place(metricPlane(D, DADO), ROOM.x1, DADO / 2, (ROOM.z0 + ROOM.z1) / 2, 0, -Math.PI / 2), panelPaint, true);
  add(place(metricPlane(W, ROOM.h), 0, ROOM.h / 2, ROOM.z1, 0, Math.PI), wallpaper, false);
  add(place(new THREE.PlaneGeometry(W, D), 0, 0, (ROOM.z0 + ROOM.z1) / 2, -Math.PI / 2), floor, false).name = 'sleep-floor';
  add(place(new THREE.PlaneGeometry(W, D), 0, ROOM.h, (ROOM.z0 + ROOM.z1) / 2, Math.PI / 2), ceilingPaint, true);

  // Joinery: one merged mesh of painted mouldings.
  const trim: THREE.BufferGeometry[] = [];
  const walls: Array<{ origin: THREE.Vector3; yaw: number; length: number; spans: Array<[number, number]> }> = [
    // Back wall, wall-local x runs left to right; the window interrupts the dado rail.
    { origin: new THREE.Vector3(0, 0, ROOM.z0), yaw: 0, length: W, spans: [[-W / 2, WIN.x0 - 0.08], [WIN.x1 + 0.08, W / 2]] },
    // Left wall: local x runs toward -z.
    { origin: new THREE.Vector3(ROOM.x0, 0, (ROOM.z0 + ROOM.z1) / 2), yaw: Math.PI / 2, length: D, spans: [[-D / 2, D / 2]] },
    { origin: new THREE.Vector3(ROOM.x1, 0, (ROOM.z0 + ROOM.z1) / 2), yaw: -Math.PI / 2, length: D, spans: [[-D / 2, D / 2]] },
  ];
  for (const wall of walls) {
    trim.push(onWall(straightMoulding(SKIRTING, wall.length), wall.origin, wall.yaw));
    trim.push(onWall(straightMoulding(CORNICE, wall.length, { down: true }).translate(0, ROOM.h, 0), wall.origin, wall.yaw));
    for (const [a, b] of wall.spans) {
      trim.push(onWall(straightMoulding(DADO_RAIL, b - a, { caps: true }).translate((a + b) / 2, DADO - 0.03, 0), wall.origin, wall.yaw));
      // Applied panel mouldings below the rail, sized to the span.
      const count = Math.max(1, Math.round((b - a) / 0.75));
      const pw = (b - a) / count;
      for (let k = 0; k < count; k++) {
        const x0 = a + k * pw + 0.07, x1 = a + (k + 1) * pw - 0.07;
        if (x1 - x0 < 0.2) continue;
        trim.push(onWall(frameMoulding(PANEL_MOULD, x0, 0.26, x1, DADO - 0.11), wall.origin, wall.yaw));
      }
    }
  }
  // Under the window: a panel framed below the sill.
  trim.push(onWall(frameMoulding(PANEL_MOULD, WIN.x0 + 0.08, 0.26, WIN.x1 - 0.08, WIN.y0 - 0.14), new THREE.Vector3(0, 0, ROOM.z0), 0));
  // Architrave on three sides, standing on the window stool.
  trim.push(onWall(frameMoulding(ARCHITRAVE, WIN.x0 - 0.078, WIN.y0 - 0.02, WIN.x1 + 0.078, WIN.y1 + 0.078, [false, true, true, true]), new THREE.Vector3(0, 0, ROOM.z0), 0));
  const trimMesh = add(mergeGeometries(trim.map(g => g.index ? g.toNonIndexed() : g), false)!, sashPaint, true);
  trimMesh.name = 'sleep-joinery';
  trim.forEach(g => g.dispose());
  // Window stool (inner sill) and apron.
  add(place(roundedBlock(WIN.x1 - WIN.x0 + 0.3, 0.035, WIN.reveal + 0.07, 0.008), WIN_CX, WIN.y0 - 0.0175, ROOM.z0 - WIN.reveal / 2 + 0.035), sashPaint);
  add(place(roundedBlock(WIN.x1 - WIN.x0 + 0.16, 0.08, 0.02, 0.004), WIN_CX, WIN.y0 - 0.075, ROOM.z0 + 0.01), sashPaint);

  // --- Casement window: frame, two leaves of six panes, glass ----------------------------------
  const sash: THREE.BufferGeometry[] = [];
  const bar = (w: number, h: number, d: number, x: number, y: number, z = WIN.glass) => sash.push(place(roundedBlock(w, h, d, Math.min(w, h, d) * 0.18, 0.08), x, y, z).toNonIndexed());
  const fw = 0.065;
  bar(fw, WIN.y1 - WIN.y0, 0.09, WIN.x0 + fw / 2, (WIN.y0 + WIN.y1) / 2);
  bar(fw, WIN.y1 - WIN.y0, 0.09, WIN.x1 - fw / 2, (WIN.y0 + WIN.y1) / 2);
  bar(WIN.x1 - WIN.x0, fw, 0.09, WIN_CX, WIN.y1 - fw / 2);
  bar(WIN.x1 - WIN.x0, 0.08, 0.1, WIN_CX, WIN.y0 + 0.04);
  // Leaves meet at the centre; each has stiles, rails and glazing bars (2 x 3 panes).
  const leafW = (WIN.x1 - WIN.x0 - fw * 2) / 2, ly0 = WIN.y0 + 0.08, ly1 = WIN.y1 - fw;
  for (let k = 0; k < 2; k++) {
    const lx0 = WIN.x0 + fw + k * leafW, lx1 = lx0 + leafW;
    bar(0.05, ly1 - ly0, 0.055, lx0 + 0.025, (ly0 + ly1) / 2, WIN.glass + 0.02);
    bar(0.05, ly1 - ly0, 0.055, lx1 - 0.025, (ly0 + ly1) / 2, WIN.glass + 0.02);
    bar(leafW, 0.05, 0.055, (lx0 + lx1) / 2, ly1 - 0.025, WIN.glass + 0.02);
    bar(leafW, 0.07, 0.055, (lx0 + lx1) / 2, ly0 + 0.035, WIN.glass + 0.02);
    bar(0.022, ly1 - ly0 - 0.1, 0.035, (lx0 + lx1) / 2, (ly0 + ly1) / 2, WIN.glass + 0.02);
    for (const t of [1 / 3, 2 / 3]) bar(leafW - 0.08, 0.022, 0.035, (lx0 + lx1) / 2, ly0 + 0.07 + (ly1 - ly0 - 0.12) * t, WIN.glass + 0.02);
    // Brass handle on the meeting stile.
    if (k === 0) { const h = new THREE.CylinderGeometry(0.008, 0.008, 0.12, 8); h.deleteAttribute('uv'); add(place(h, lx1 - 0.02, (ly0 + ly1) / 2, WIN.glass + 0.07), brass, false); }
  }
  const sashMesh = add(mergeGeometries(sash, false)!, sashPaint, true);
  sashMesh.name = 'sleep-casement';
  sash.forEach(g => g.dispose());
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(WIN.x1 - WIN.x0, WIN.y1 - WIN.y0), windowGlass);
  pane.position.set(WIN_CX, (WIN.y0 + WIN.y1) / 2, WIN.glass + 0.015); pane.renderOrder = 8; pane.userData.dynamic = true; scene.add(pane);

  // --- Curtains: long linen drapes on a brass rod, pleated, swaying a little -----------------------
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 2.9, 16), brass); rod.rotation.z = Math.PI / 2; rod.position.set(WIN_CX, ROD_Y, ROOM.z0 + 0.13); rod.castShadow = true; scene.add(rod);
  for (const x of [WIN_CX - 1.47, WIN_CX + 1.47]) { const finial = new THREE.Mesh(new THREE.SphereGeometry(0.032, 16, 12), brass); finial.position.set(x, ROD_Y, ROOM.z0 + 0.13); scene.add(finial); }
  for (const x of [WIN_CX - 1.3, WIN_CX + 1.3]) { const bracket = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.13, 8), brass); bracket.rotation.x = Math.PI / 2; bracket.position.set(x, ROD_Y, ROOM.z0 + 0.065); scene.add(bracket); }
  const curtainGlow = { value: 0.14 }, curtainTime = timeUniform;
  const curtainMaterial = dappled(applyFabricSurface(new THREE.MeshPhysicalMaterial({ color: '#cfc8b8', roughness: 0.95, sheen: 0.5, sheenColor: '#ffffff', side: THREE.DoubleSide }), { key: 'sleep-curtain', weave: 'plain', threads: [200, 200], heather: 0.6, threadContrast: 0.6, fuzz: 0.35, depth: 0.0005 }), 'curtain');
  {
    const previous = curtainMaterial.onBeforeCompile;
    curtainMaterial.onBeforeCompile = (shader, renderer) => {
      previous.call(curtainMaterial, shader, renderer);
      shader.uniforms.uCurtainGlow = curtainGlow; shader.uniforms.uCurtainTime = curtainTime;
      // A slow breath of air from the window: the lower drape moves a centimetre or two.
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float uCurtainTime;')
        .replace('#include <begin_vertex>', `#include <begin_vertex>
{
  float down = clamp(-position.y / 2.5, 0.0, 1.0);
  float sway = sin(uCurtainTime * 0.31 + position.x * 2.1 + modelMatrix[3].x * 3.0) * 0.6 + sin(uCurtainTime * 0.53 + position.x * 4.3) * 0.4;
  transformed.z += sway * 0.016 * down * down;
  transformed.x += sin(uCurtainTime * 0.23 + modelMatrix[3].x) * 0.006 * down * down;
}`);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', '#include <common>\nuniform float uCurtainGlow;')
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
// Moonlight through the weave, stronger in the thin pleat valleys and where the drape covers glass.
totalEmissiveRadiance += vec3(0.4, 0.48, 0.7) * uCurtainGlow * (0.6 + 0.4 * (1.0 - fbH)) * smoothstep(${(WIN.y0 - 0.15).toFixed(2)}, ${(WIN.y0 + 0.3).toFixed(2)}, vSurfaceWorld.y) * (1.0 - smoothstep(${(WIN.y1 - 0.1).toFixed(2)}, ${(WIN.y1 + 0.25).toFixed(2)}, vSurfaceWorld.y)) * smoothstep(${(WIN.x0 - 0.1).toFixed(2)}, ${(WIN.x0 + 0.15).toFixed(2)}, vSurfaceWorld.x) * (1.0 - smoothstep(${(WIN.x1 - 0.15).toFixed(2)}, ${(WIN.x1 + 0.1).toFixed(2)}, vSurfaceWorld.x));`);
    };
    const base = curtainMaterial.customProgramCacheKey.bind(curtainMaterial);
    curtainMaterial.customProgramCacheKey = () => `${base()}|sleep-curtain-sway`;
  }
  const curtains: THREE.Mesh[] = [];
  const CURTAIN_W = 0.78, CURTAIN_H = ROD_Y - 0.06;
  for (const side of [-1, 1]) {
    const geo = new THREE.PlaneGeometry(CURTAIN_W, CURTAIN_H, 90, 60);
    geo.translate(side < 0 ? CURTAIN_W / 2 : -CURTAIN_W / 2, -CURTAIN_H / 2, 0);
    const p = geo.attributes.position, uv = geo.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), down = -y / CURTAIN_H;
      // Pinch-pleated heading: tight pleats at the top relaxing into deep folds.
      const pleat = Math.sin(x * 31 + Math.sin(x * 6.1) * 0.8) * (0.028 + down * 0.03) + Math.sin(x * 11.3 + 0.5 + side) * down * 0.022;
      const header = Math.exp(-(-y) / 0.12) * Math.sin(x * 62) * 0.012;
      // Drapes flare slightly outward toward the hem and puddle on the floor.
      const flare = side * Math.sin(down * Math.PI * 0.5) * 0.04 * (side < 0 ? 1 - x / CURTAIN_W : 1 + x / CURTAIN_W);
      p.setXYZ(i, x + flare, y + (Math.cos(x * 17) - 1) * 0.008 * down, pleat + header + 0.012 * down * down);
      uv.setXY(i, uv.getX(i) * CURTAIN_W, uv.getY(i) * CURTAIN_H);
    }
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, curtainMaterial);
    mesh.position.set(side < 0 ? WIN_CX - 1.4 : WIN_CX + 1.4, ROD_Y - 0.035, ROOM.z0 + 0.16);
    mesh.castShadow = true; mesh.receiveShadow = true; mesh.userData.cozyAction = 'curtain';
    scene.add(mesh); curtains.push(mesh);
    for (let j = 0; j < 11; j++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.004, 6, 16), brass);
      ring.rotation.y = Math.PI / 2; ring.position.set(mesh.position.x + side * -(0.02 + j * 0.07), ROD_Y, ROOM.z0 + 0.13); ring.userData.dynamic = true; scene.add(ring);
    }
  }

  // --- Bed: upholstered frame and channel-tufted headboard, layered bedding ---------------------
  const bedGroup = new THREE.Group(); bedGroup.name = 'sleep-bed'; scene.add(bedGroup);
  destination = bedGroup;
  const bedCz = (BED.z0 + BED.z1) / 2, bedWidth = BED.z1 - BED.z0;
  add(place(headboardGeometry(bedWidth + 0.24, 1.0, 0.1, 9), ROOM.x0 + 0.06, 0.86, bedCz), boucle);
  add(place(cushion(BED.x1 - BED.x0 + 0.1, 0.24, bedWidth + 0.12, 0.22, 40, 2), (BED.x0 + BED.x1) / 2 + 0.02, 0.27, bedCz), boucle);
  for (const x of [BED.x0 + 0.08, BED.x1 - 0.05]) for (const z of [BED.z0 + 0.06, BED.z1 - 0.06]) add(place(new THREE.CylinderGeometry(0.025, 0.018, 0.15, 12), x, 0.075, z), walnutY);
  add(place(cushion(BED.x1 - BED.x0, 0.22, bedWidth, 0.16, 48, 3), (BED.x0 + BED.x1) / 2, BED.top - 0.11, bedCz), cotton);
  const headEdge = -1.86;
  add(sheetGeometry(BED, BED.x0 - 0.02, headEdge + 0.2, 0.2), cotton);
  const duvet = add(duvetGeometry(BED, headEdge, 0.46, 3), duvetLinen); duvet.name = 'sleep-duvet';
  add(turnDownGeometry(BED, headEdge - 0.015, 0.34, 0.44, 5), duvetLinen);
  // Pillows: two euro shams upright, two sleeping pillows, a velvet cushion.
  const pillow = (w: number, d: number, t: number, seed: number, material: THREE.Material, x: number, y: number, z: number, lean: number, yaw = 0, dent = 0) => {
    const g = pillowGeometry(w, d, t, seed, { dent, creases: 1.2 });
    // Local: x across the bed (world z), z depth (world x); stand it up by `lean` about the bed's width axis.
    g.rotateY(Math.PI / 2);
    add(place(g, x, y, z, 0, yaw, lean), material);
  };
  for (const [z, s] of [[bedCz - 0.36, 21], [bedCz + 0.36, 22]] as const) pillow(0.66, 0.66, 0.2, s, oatLinen, BED.x0 + 0.17, BED.top + 0.36, z, -1.15, (random() - 0.5) * 0.06);
  for (const [z, s] of [[bedCz - 0.37, 31], [bedCz + 0.38, 32]] as const) pillow(0.7, 0.48, 0.17, s, cotton, BED.x0 + 0.4, BED.top + 0.22, z, -0.62, (random() - 0.5) * 0.08, 0.025);
  pillow(0.46, 0.42, 0.15, 41, velvet, BED.x0 + 0.62, BED.top + 0.27, bedCz + 0.05, -0.5, 0.12);
  // Throw across the foot, falling over the near side.
  const throwMesh = add(throwGeometry(BED, BED.x1 - 0.62, BED.x1 - 0.1, 0.52, (s, t) => duvetLift(s, t, BED) + 0.028, 11), knit);
  throwMesh.name = 'sleep-throw';
  destination = scene;

  // --- Nightstands: lamp on the far one, book and water on the near one -------------------------
  const bedside = new THREE.Group(); bedside.userData.dynamic = true; scene.add(bedside);
  destination = bedside;
  const nightstand = (x: number, z: number, seed: number) => {
    add(place(roundedBlock(0.46, 0.5, 0.44, 0.01), x, 0.36, z), walnutZ);
    add(place(roundedBlock(0.5, 0.035, 0.48, 0.008), x, 0.628, z), walnutZ);
    add(place(roundedBlock(0.4, 0.17, 0.02, 0.005), x + 0.235, 0.5, z, 0, Math.PI / 2), walnut);
    add(place(roundedBlock(0.4, 0.17, 0.02, 0.005), x + 0.235, 0.27, z, 0, Math.PI / 2), walnut);
    void seed;
    const knob = add(place(new THREE.SphereGeometry(0.016, 12, 8), x + 0.25, 0.5, z), brass); knob.castShadow = false;
    for (const dx of [-0.19, 0.19]) for (const dz of [-0.18, 0.18]) add(place(new THREE.CylinderGeometry(0.018, 0.012, 0.11, 10), x + dx, 0.055, z + dz), walnutY);
  };
  const farStand = { x: ROOM.x0 + 0.3, z: BED.z0 - 0.34 };
  nightstand(farStand.x, farStand.z, 41);
  const lampX = farStand.x + 0.0, lampZ = farStand.z - 0.08, lampY = 0.646;
  const lampBase = add(new THREE.LatheGeometry([[0, 0], [0.085, 0], [0.1, 0.02], [0.115, 0.08], [0.12, 0.15], [0.105, 0.22], [0.07, 0.27], [0.035, 0.3], [0.03, 0.32], [0, 0.32]].map(([r, h]) => new THREE.Vector2(r, h)), 48), lampGlaze);
  lampBase.position.set(lampX, lampY, lampZ); lampBase.userData.cozyAction = 'lamp';
  add(place(new THREE.CylinderGeometry(0.009, 0.009, 0.2, 10), lampX, lampY + 0.41, lampZ), brass);
  const shadeGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.26, 72, 4, true);
  const shade = new THREE.Mesh(shadeGeometry, shadeLinen); shade.position.set(lampX, lampY + 0.5, lampZ); shade.userData.cozyAction = 'lamp'; shade.castShadow = false; bedside.add(shade);
  const lampDown = new THREE.SpotLight('#ffc485', 8, 0, 1.2, 0.85, 2);
  lampDown.position.set(lampX, lampY + 0.42, lampZ); lampDown.target.position.set(lampX + 0.35, 0.45, lampZ + 1.1);
  lampDown.castShadow = true; lampDown.shadow.mapSize.set(1024, 1024); lampDown.shadow.radius = 5; lampDown.shadow.bias = -0.0008; lampDown.shadow.normalBias = 0.015;
  lampDown.shadow.camera.near = 0.08; lampDown.shadow.camera.far = 6; lampDown.shadow.autoUpdate = false; lampDown.shadow.needsUpdate = true;
  bedside.add(lampDown, lampDown.target);
  const lampUp = new THREE.SpotLight('#ffbe80', 0.35, 0, 0.9, 0.95, 2);
  lampUp.position.set(lampX, lampY + 0.56, lampZ); lampUp.target.position.set(lampX, 3, lampZ); bedside.add(lampUp, lampUp.target);
  const lampGlow = new THREE.PointLight('#ffb070', 2.2, 0, 2); lampGlow.position.set(lampX + 0.05, lampY + 0.5, lampZ + 0.1); bedside.add(lampGlow);
  // A book and a glass of water beside the lamp.
  const bookColors = ['#40564e', '#7a3b2c', '#c9b48c'];
  const books: THREE.BufferGeometry[] = [], pages: THREE.BufferGeometry[] = [];
  const colorize = (g: THREE.BufferGeometry, c: THREE.Color) => { const n = g.attributes.position.count, colors = new Float32Array(n * 3); for (let i = 0; i < n; i++) colors.set([c.r, c.g, c.b], i * 3); g.setAttribute('color', new THREE.BufferAttribute(colors, 3)); return g; };
  [[0.03, 0.15, 0.22, 0.03, 0.3], [0.064, 0.14, 0.2, 0.026, -0.15]].forEach(([dy, w, d, h, yaw], i) => {
    books.push(colorize(place(roundedBlock(w, h, d, 0.004, 0.03), farStand.x + 0.05, 0.646 + dy - 0.012, farStand.z + 0.14, 0, yaw + 1.2), new THREE.Color(bookColors[i])).toNonIndexed());
    const pg = new THREE.BoxGeometry(w * 0.95, h * 0.84, d * 0.96); pg.deleteAttribute('uv');
    pages.push(place(pg, farStand.x + 0.054, 0.646 + dy - 0.012, farStand.z + 0.14, 0, yaw + 1.2).toNonIndexed());
  });
  books.forEach(g => g.deleteAttribute('uv'));
  add(mergeGeometries(books, false)!, bookCloth); add(mergeGeometries(pages, false)!, paper);
  books.forEach(g => g.dispose()); pages.forEach(g => g.dispose());
  const glassX = farStand.x + 0.16, glassZ = farStand.z - 0.12;
  add(place(new THREE.LatheGeometry([[0.033, 0], [0.038, 0.003], [0.04, 0.12], [0.037, 0.12], [0.035, 0.006], [0, 0.005]].map(([r, h]) => new THREE.Vector2(r, h)), 32), glassX, 0.646, glassZ), drinkGlass, false).renderOrder = 4;
  const water = add(place(new THREE.CircleGeometry(0.036, 32), glassX, 0.646 + 0.085, glassZ, -Math.PI / 2), new THREE.MeshPhysicalMaterial({ color: '#9fb5be', roughness: 0.14, transparent: true, opacity: 0.35, depthWrite: false }), false);
  water.renderOrder = 3;
  destination = scene;

  // --- Rug, framed print above the bed, a fig by the window ---------------------------------------
  const rugW = 2.4, rugD = 3.1, rugX = -1.25, rugZ = -0.55;
  add(metricRug(rugW, rugD).translate(rugX, 0.004, rugZ), rugWool, false).name = 'sleep-rug';
  const fringe: THREE.BufferGeometry[] = [];
  for (const side of [-1, 1]) for (let i = 0; i < 46; i++) {
    const x = rugX - rugW / 2 + 0.03 + i * (rugW - 0.06) / 45, len = 0.05 + random() * 0.025;
    const g = new THREE.CylinderGeometry(0.004, 0.003, len, 4); g.deleteAttribute('uv');
    fringe.push(place(g, x, 0.007, rugZ + side * (rugD / 2 + len / 2), Math.PI / 2 + (random() - 0.5) * 0.25, 0, (random() - 0.5) * 0.4).toNonIndexed());
  }
  add(mergeGeometries(fringe, false)!, rugWool, false); fringe.forEach(g => g.dispose());
  // Print: a moonlit landscape in soft washes, under a mat and glass, in a dark frame.
  const pic = { cz: bedCz, y: 1.72, w: 0.94, h: 0.66 };
  const picOrigin = new THREE.Vector3(ROOM.x0, 0, 0);
  add(onWall(frameMoulding(PICTURE_FRAME, -pic.cz - pic.w / 2, pic.y - pic.h / 2, -pic.cz + pic.w / 2, pic.y + pic.h / 2), picOrigin, Math.PI / 2), blackFrame).name = 'sleep-picture-frame';
  add(onWall(new THREE.PlaneGeometry(pic.w - 0.09, pic.h - 0.09).translate(-pic.cz, pic.y, 0.012), picOrigin, Math.PI / 2), matBoard, false);
  const printMaterial = patchSurface(new THREE.MeshStandardMaterial({ color: '#cfc8b6', roughness: 0.95 }), {
    key: 'sleep-print',
    color: `
vec2 pp = vSurfaceUv;
// Washes: a pale sky, three receding hills, a moon and a reflection on still water.
vec3 skyC = mix(vec3(0.55, 0.6, 0.66), vec3(0.28, 0.33, 0.42), pp.y);
float h1 = 0.55 + 0.06 * sin(pp.x * 5.0 + 1.0) + 0.03 * bwNoise(vec3(pp * 8.0, 1.0));
float h2 = 0.44 + 0.05 * sin(pp.x * 7.0 + 3.0) + 0.02 * bwNoise(vec3(pp * 12.0, 2.0));
float h3 = 0.32 + 0.03 * sin(pp.x * 4.0 + 0.4);
vec3 c = skyC;
c = mix(c, vec3(0.36, 0.42, 0.46), smoothstep(h1 + 0.01, h1 - 0.01, pp.y));
c = mix(c, vec3(0.25, 0.31, 0.33), smoothstep(h2 + 0.01, h2 - 0.01, pp.y));
c = mix(c, vec3(0.42, 0.47, 0.52), smoothstep(h3 + 0.005, h3 - 0.005, pp.y));
float moonD = length((pp - vec2(0.68, 0.78)) * vec2(1.4, 1.0));
c = mix(c, vec3(0.92, 0.9, 0.8), smoothstep(0.055, 0.05, moonD));
c *= 0.92 + 0.1 * bwFbm3(vec3(pp * 14.0, 3.0));
diffuseColor.rgb = c;`,
  });
  const printPlane = new THREE.PlaneGeometry(pic.w - 0.2, pic.h - 0.2);
  add(onWall(printPlane.translate(-pic.cz, pic.y, 0.014), picOrigin, Math.PI / 2), printMaterial, false);
  const picGlass = add(onWall(new THREE.PlaneGeometry(pic.w - 0.09, pic.h - 0.09).translate(-pic.cz, pic.y, 0.03), picOrigin, Math.PI / 2), pictureGlass, false);
  picGlass.renderOrder = 7; picGlass.userData.dynamic = true;
  // Fiddle-leaf fig in a woven basket right of the window.
  const fig = fiddleLeafFig(77, 1.55);
  const figX = 1.32, figZ = ROOM.z0 + 0.42;
  const figLeaves = add(fig.leaves.translate(figX, 0.36, figZ), dappled(createLeafMaterial('sleep-fig', '#3a5a30', { veins: 7, gloss: 0.6 }), 'fig'));
  figLeaves.name = 'sleep-fig';
  add(fig.stems.translate(figX, 0.36, figZ), new THREE.MeshStandardMaterial({ color: '#5b4a36', roughness: 0.8 }));
  const basketMaterial = createFabricMaterial('#8c7350', { key: 'sleep-basket', weave: 'twill', threads: [40, 28], heather: 0.8, threadContrast: 0.9, fuzz: 0.4, depth: 0.003, roughness: 0.85 });
  const basket = new THREE.LatheGeometry([[0, 0.005], [0.17, 0.005], [0.2, 0.04], [0.215, 0.2], [0.22, 0.36], [0.21, 0.365], [0.2, 0.35], [0, 0.35]].map(([r, h]) => new THREE.Vector2(r, h)), 48);
  const buv = basket.attributes.uv as THREE.BufferAttribute; for (let i = 0; i < buv.count; i++) buv.setXY(i, buv.getX(i) * 1.35, buv.getY(i) * 0.6);
  add(basket.translate(figX, 0, figZ), basketMaterial);
  add(place(new THREE.CircleGeometry(0.2, 24), figX, 0.33, figZ, -Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#1b1510', roughness: 1 }), false);
  // A low upholstered bench under the right wall section, with a folded blanket.
  add(place(cushion(0.8, 0.12, 0.4, 0.2, 32, 6), 2.08, 0.44, ROOM.z0 + 0.35), boucle);
  for (const dx of [-0.33, 0.33]) for (const dz of [-0.14, 0.14]) add(place(new THREE.CylinderGeometry(0.02, 0.014, 0.38, 10), 2.08 + dx, 0.19, ROOM.z0 + 0.35 + dz), walnutY);
  add(place(cushion(0.5, 0.07, 0.34, 0.25, 24, 9), 2.2, 0.535, ROOM.z0 + 0.36, 0, 0.08), knit);

  batchStatic(scene);

  let lampBright = true, lampLevel = 1, curtainOpen = false, curtainGap = 0;
  let probe: THREE.WebGLRenderTarget | null = null;
  let volumeUniforms: Record<string, THREE.IUniform> | null = null;
  /** Open span of the glazing between the drapes, in window coordinates [-1, 1]. */
  const gapRange = () => {
    const half = (WIN.x1 - WIN.x0) / 2;
    const squeeze = 0.78 - 0.23 * curtainGap;
    const left = curtains[0].position.x + CURTAIN_W * squeeze * 0.94, right = curtains[1].position.x - CURTAIN_W * squeeze * 0.94;
    return [(left - WIN_CX) / half, (right - WIN_CX) / half];
  };
  const resize = (aspect: number) => {
    camera.aspect = aspect;
    if (aspect < 0.82) { camera.fov = 58; camera.position.set(0.9, 1.2, 2.4); camera.lookAt(-0.95, 0.62, -2.6); }
    else if (aspect < 1.32) { camera.fov = 52; camera.position.set(0.85, 1.15, 1.55); camera.lookAt(-1.0, 0.98, -2.0); }
    else { camera.fov = 47; camera.position.set(1.1, 1.12, 1.6); camera.lookAt(-1.0, 0.95, -1.9); }
    camera.updateProjectionMatrix();
    lampDown.shadow.needsUpdate = true; moon.shadow.needsUpdate = true; skyLight.shadow.needsUpdate = true;
  };
  resize(16 / 9);
  return {
    scene, camera, resize,
    post: {
      exposure: 2.1, bloomStrength: 0.08, bloomThreshold: 0, aoStrength: 1.0, aoRadius: 0.4,
      saturation: 1.0, contrast: 1.08, shadowTint: [0.8, 0.92, 1.2], highlightTint: [1.05, 1.0, 0.94], vignette: 0.5, grain: 0.03,
    },
    createVolume() {
      const [min, max] = gapRange();
      const effect = createRoomVolume({
        haze: 0.03, dust: 0.75, anisotropy: 0.5, maxDistance: 9, skyDistance: 3,
        beam: { centre: new THREE.Vector3(WIN_CX, (WIN.y0 + WIN.y1) / 2, WIN.glass), right: new THREE.Vector3((WIN.x1 - WIN.x0) / 2, 0, 0), up: new THREE.Vector3(0, (WIN.y1 - WIN.y0) / 2, 0), direction: MOON_DIR.clone(), color: new THREE.Color(0.14, 0.18, 0.28), gap: { min, max, transmit: 0.04 } },
        glow: { position: new THREE.Vector3(lampX, lampY + 0.5, lampZ), color: new THREE.Color(1.0, 0.62, 0.3).multiplyScalar(0.05) },
        ambient: new THREE.Color(0.002, 0.003, 0.005),
      });
      volumeUniforms = effect.uniforms;
      return effect;
    },
    prepare(renderer) {
      // The garden adds no measurable bounce; leaving it out keeps the probe to the room itself.
      probe = captureRoomProbe(renderer, scene, new THREE.Vector3(-0.2, 1.3, -0.3), 0.85, { hide: [pane, picGlass, view.foliage] });
    },
    update(time, dt) {
      timeUniform.value = time; view.update(time);
      const ease = dt > 0 ? 1 - Math.exp(-dt * 3.2) : 1;
      lampLevel += ((lampBright ? 1 : 0.28) - lampLevel) * ease;
      lampDown.intensity = 8 * lampLevel; lampGlow.intensity = 2.6 * lampLevel; lampUp.intensity = 0.35 * lampLevel;
      shadeLinen.emissiveIntensity = 0.12 + lampLevel * 1.05;
      const previousGap = curtainGap;
      curtainGap += ((curtainOpen ? 1 : 0) - curtainGap) * ease;
      // Drawing a drape gathers it toward its end of the rod: a transform, not a rebuild.
      const squeeze = 0.78 - 0.23 * curtainGap;
      for (const mesh of curtains) mesh.scale.x = squeeze;
      if (Math.abs(curtainGap - previousGap) > 1e-4) { moon.shadow.needsUpdate = true; skyLight.shadow.needsUpdate = true; }
      if (volumeUniforms) { const [min, max] = gapRange(); volumeUniforms.uGap.value.set(min, max, 0.04); }
    },
    interact(action) {
      if (action === 'lamp') { lampBright = !lampBright; return { type: 'lamp', intensity: 0.16 }; }
      if (action === 'curtain') { curtainOpen = !curtainOpen; return { type: 'curtain', intensity: 0.2 }; }
      return null;
    },
    dispose() { probe?.dispose(); probe = null; },
  };
}

/** A rug of exact size with a slightly lifted, softly wavy body; uv in metres. */
function metricRug(width: number, depth: number) {
  const g = new THREE.PlaneGeometry(width, depth, 60, 70);
  g.rotateX(-Math.PI / 2);
  const p = g.attributes.position, uv = g.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i);
    const edge = Math.min(width / 2 - Math.abs(x), depth / 2 - Math.abs(z));
    p.setY(i, 0.008 * Math.min(1, edge / 0.03) + 0.004 * Math.sin(x * 3 + z * 2) * Math.min(1, edge / 0.2));
    uv.setXY(i, uv.getX(i) * width, uv.getY(i) * depth);
  }
  g.computeVertexNormals();
  return g;
}
