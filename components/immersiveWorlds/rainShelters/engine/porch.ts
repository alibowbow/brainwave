import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldBuilder } from './types';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { fbm3, noise3, seeded } from '../../shared/render/noise';
import { createRockMaterial } from '../../shared/render/rockSurface';
import { applyWetSurface, GLSL_WET_RIPPLES } from '../../shared/render/wetSurface';
import { createRainLayer, createRainSplashes, createRunoff, type RunoffStream } from '../../shared/render/rainStreaks';
import { assignProbe, captureProbe, captureSkyProbe, createMist, createSky } from './atmosphere';
import { applyFoliage, applyGround, applyTimber, TimberSet } from './surfaces';
import { boulderGeometry, fernFronds, leafletGeometry, limbGeometry } from './geometry';
import { buildTree, concatGeometries } from '../../shared/render/treeGeometry';
import { applyBarkSurface } from '../../shared/render/barkSurface';
import { applyFoliageShading, type FoliageWind } from '../../shared/render/foliageShading';
import { broadleafClusterTexture } from '../../shared/render/foliageTextures';
import { shrubGeometry, tuftGeometry, wetLeafMaterial } from './wetFoliage';

/*
 * Original procedural architecture: seated on the open wooden floor of a
 * traditional porch in the monsoon. Round rafters and a tiled eave frame the
 * top; water pours off every tile channel in a curtain of streams onto a
 * pebble trench; a carved granite basin is fed by a bamboo spout at arm's
 * reach; the garden of stepping stones, mossy boulders and ferns dissolves
 * into rain mist. No glass between the viewer and the garden.
 */

const GROUND = -0.23;
// Section through the eave (seated eye at y 1.49, z 3.7): the eave droops so its
// whole edge shows below the column-top beam, as it does from a real maru.
const POST_TOP = 2.3, BEAM_Y = 2.42, PURLIN_Y = 2.67;
const RAFTER_MID = new THREE.Vector3(0, 2.875, 0.54), RAFTER_TIP = new THREE.Vector3(0, 2.2, -0.5);
const EAVE_SLOPE = (RAFTER_MID.y - RAFTER_TIP.y) / (RAFTER_MID.z - RAFTER_TIP.z);
/** Tile edge: channel arcs are centred at TILE_Y, so their mouths sit 0.2 lower. */
const TILE_Z = -0.86, TILE_Y = 2.53, TILE_RISE = 0.5;
const TILE_PITCH = 0.3;

export const buildPorch: WorldBuilder = ({ scene, camera }) => {
  const random = seeded(520731);
  const range = (a: number, b: number) => a + random() * (b - a);
  const time = { value: 0 };
  scene.background = new THREE.Color('#8fa3a0');
  camera.position.set(0, 1.49, 3.7);
  camera.lookAt(0.08, 0.92, -5);
  camera.near = 0.035;
  camera.far = 140;
  const disposables: { dispose(): void }[] = [];

  // ---- Sky and light ----------------------------------------------------------
  const glowDirection = new THREE.Vector3(-0.4, 0.6, -0.7).normalize();
  const sky = createSky({
    time, zenith: new THREE.Color(2.5, 2.7, 2.75), horizon: new THREE.Color(1.45, 1.6, 1.62),
    cloudDark: new THREE.Color(1.2, 1.32, 1.36), cloudLight: new THREE.Color(2.3, 2.45, 2.5),
    glowDirection, glow: new THREE.Color(0.6, 0.58, 0.5), ground: new THREE.Color(0.1, 0.12, 0.09), coverage: 0.9, scale: 0.7, drift: 0.015,
  });
  scene.add(sky.mesh);
  const key = new THREE.DirectionalLight('#e1e9e6', 1.4);
  key.name = 'porch-overcast-key';
  key.position.set(-7, 14, -10); key.target.position.set(0, 0, -4);
  key.castShadow = true; key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -13, right: 13, top: 13, bottom: -11, near: 1, far: 50 });
  key.shadow.bias = -0.0008; key.shadow.normalBias = 0.03; key.shadow.radius = 4;
  // The world is static apart from foliage sway: render the key shadow once, and
  // again only while something that casts it moves (saves a pass every frame).
  key.shadow.autoUpdate = false; key.shadow.needsUpdate = true;
  scene.add(key, key.target);
  // Light bouncing off the wet garden and floor up into the dark eaves (stands in for GI).
  const eaveBounce = new THREE.PointLight('#b9c4b4', 1.4, 9, 2);
  eaveBounce.position.set(0.5, 1.1, -0.2);
  scene.add(eaveBounce);
  const fallbackFill = new THREE.HemisphereLight('#d4e2de', '#777057', 1.6);
  fallbackFill.visible = false; scene.add(fallbackFill);

  // ---- Materials --------------------------------------------------------------------
  const pine = applyWetSurface(applyTimber(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.7 }), {
    key: 'porch-floor', early: '#a8845e', late: '#6a4a2e', rings: 30, weathering: 0.32, roughness: [0.5, 0.75],
  }), { key: 'porch-floor', time, wetness: 0.9, darkening: 0.62, wetRoughness: 0.14, puddles: 0.5, puddleSize: 0.4, rippleDensity: 12, ripples: 0.6,
    shelter: { normal: new THREE.Vector3(0, 0, -1), offset: -0.85, softness: 0.25 } });
  const beams = applyTimber(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.75 }), {
    key: 'porch-beams', early: '#8a6544', late: '#4c321e', rings: 26, weathering: 0.25,
  });
  const rafterWood = applyWetSurface(applyTimber(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.78 }), {
    key: 'porch-rafters', early: '#7b5a3c', late: '#3e2817', rings: 22, weathering: 0.35,
  }), { key: 'porch-rafters', time, wetness: 0.8, darkening: 0.65, wetRoughness: 0.3, streaks: 0.5,
    shelter: { normal: new THREE.Vector3(0, 0, -1), offset: 0.3, softness: 0.25 } });
  const tileMaterial = applyWetSurface(new THREE.MeshStandardMaterial({ color: '#4a4e4d', roughness: 0.55 }), {
    key: 'porch-tiles', time, wetness: 1, darkening: 0.6, wetRoughness: 0.1, streaks: 0.8,
  });
  const granite = createRockMaterial('#8b8c86', { key: 'porch-granite', scale: 5, bump: 0.8, strata: 0.05, stainAmount: 0.15, cavity: 0.4, wetness: 0.55, drips: 0.4, dryRoughness: 0.72, wetRoughness: 0.16, moss: { color: '#55702e', amount: 0.25 } });
  const gardenStone = createRockMaterial('#6e6e64', { key: 'porch-boulder', scale: 1.6, bump: 1.2, strata: 0.25, cavity: 0.6, wetness: 0.8, drips: 0.25, dryRoughness: 0.74, wetRoughness: 0.15, moss: { color: '#365a1c', amount: 0.9 } });
  const steppingStone = applyWetSurface(createRockMaterial('#8d8c82', { key: 'porch-steps', scale: 2.4, bump: 0.9, strata: 0.1, cavity: 0.5, wetness: 0.85, drips: 0.1, dryRoughness: 0.7, wetRoughness: 0.12 }), {
    key: 'porch-steps', time, wetness: 0.3, darkening: 0.9, wetRoughness: 0.12, puddles: 0.2, puddleSize: 0.25, rippleDensity: 11,
  });
  const pebbleMaterial = createRockMaterial('#6d6d66', { key: 'porch-pebbles', scale: 6, bump: 0.6, strata: 0, cavity: 0.3, wetness: 1, dryRoughness: 0.6, wetRoughness: 0.08 });
  // A moss lawn: soaked moss is dark and saturated, and only standing water shines.
  const soil = applyWetSurface(applyGround(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.95 }), {
    key: 'porch-garden', soil: '#2a261d', litter: ['#3e2c1a', '#5a4226'], litterAmount: 0.3, moss: '#233d17', mossAmount: 0.62,
  }), { key: 'porch-garden', time, wetness: 0.9, darkening: 0.58, wetRoughness: 0.5, puddles: 0.38, puddleSize: 1.3, ripples: 1, rippleDensity: 9 });

  // ---- The porch: floor, posts, beams ---------------------------------------------
  const wood = new TimberSet(11), framing = new TimberSet(23);
  for (let i = 0; i < 31; i++) {
    const width = 0.432 + range(-0.01, 0.01);
    wood.box(width, 0.1, 5.45, { x: -6.91 + i * 0.462, y: 0.065 + range(-0.004, 0.004), z: 3.0 }, new THREE.Euler(0, 0, range(-0.003, 0.003)), { radius: 0.01, grain: 'z' });
  }
  // Edge sill (along the front), with an under-beam and a stone foundation line.
  framing.box(14.3, 0.2, 0.22, { x: 0, y: 0.0, z: 0.28 }, undefined, { radius: 0.02 });
  framing.box(14.1, 0.18, 0.3, { x: 0, y: -0.12, z: 0.42 }, undefined, { radius: 0.02 });
  for (const x of [-4.5, 1.35]) {
    framing.box(0.3, POST_TOP - 0.12, 0.3, { x, y: (POST_TOP + 0.12) / 2, z: 0.54 }, undefined, { radius: 0.035, grain: 'y' });
    // Capital block (주두) under the beam.
    framing.box(0.42, 0.12, 0.42, { x, y: POST_TOP - 0.06, z: 0.54 }, undefined, { radius: 0.02 });
  }
  framing.box(14.3, 0.24, 0.24, { x: 0, y: BEAM_Y, z: 0.54 }, undefined, { radius: 0.03 });
  framing.log(new THREE.Vector3(-7.2, PURLIN_Y, 0.54), new THREE.Vector3(7.2, PURLIN_Y, 0.54), 0.13, 0.13, 18);
  framing.log(new THREE.Vector3(-7.2, 3.3, 3.0), new THREE.Vector3(7.2, 3.3, 3.0), 0.16, 0.16, 18);
  // Roof boards on the drooping outer rafters, then flatter inside.
  const boardY = (z: number) => z < RAFTER_MID.z ? RAFTER_TIP.y + (z - RAFTER_TIP.z) * EAVE_SLOPE : RAFTER_MID.y + (z - RAFTER_MID.z) * 0.22;
  for (let i = 0; i < 26; i++) {
    const z0 = -0.42 + 0.09 + i * 0.18;
    const slope = z0 < RAFTER_MID.z ? EAVE_SLOPE : 0.22;
    framing.box(14.4, 0.03, 0.185, { x: 0, y: boardY(z0) + 0.09, z: z0 }, new THREE.Euler(-Math.atan(slope), 0, 0), { radius: 0.004, grain: 'x' });
  }
  // Back wall and ceiling enclose the room behind the viewer (they also shape the probe).
  framing.box(14.4, 3.6, 0.12, { x: 0, y: 1.8, z: 5.75 }, undefined, { grain: 'y' });
  scene.add(wood.build(pine, 'porch-floor-planks'));
  const frameMesh = framing.build(beams, 'porch-frame');
  scene.add(frameMesh);
  // Double eaves: round rafters whose end grain shows past the boards, and square
  // flying rafters above them carrying the tile overhang. Their outer ends get wet.
  const rafterSet = new TimberSet(31);
  for (let x = -7.05; x <= 7.05; x += TILE_PITCH) {
    const lean = range(-0.01, 0.01);
    // Rafters bend down past the purlin: flatter inside, drooping toward the eave.
    rafterSet.log(new THREE.Vector3(x + lean, RAFTER_MID.y + 3.06 * 0.22, 3.6), new THREE.Vector3(x, RAFTER_MID.y, RAFTER_MID.z), 0.08, 0.078, 12);
    rafterSet.log(new THREE.Vector3(x, RAFTER_MID.y + 0.012, RAFTER_MID.z + 0.04), new THREE.Vector3(x, RAFTER_TIP.y, RAFTER_TIP.z), 0.078, 0.07, 12);
    // Square flying rafters (부연) carry the tiles further out.
    const flyStart = new THREE.Vector3(x, boardY(0.15) + 0.15, 0.15), flyEnd = new THREE.Vector3(x, RAFTER_TIP.y + 0.12, TILE_Z + 0.07);
    const flyMid = flyStart.clone().add(flyEnd).multiplyScalar(0.5), flyDir = flyEnd.clone().sub(flyStart);
    rafterSet.box(0.085, 0.085, flyDir.length(), flyMid, new THREE.Euler(Math.atan2(flyDir.y, -flyDir.z), 0, 0), { radius: 0.008, grain: 'z' });
    const disc = new THREE.CircleGeometry(0.069, 16);
    const direction = new THREE.Vector3(0, RAFTER_TIP.y - RAFTER_MID.y, RAFTER_TIP.z - RAFTER_MID.z).normalize();
    rafterSet.add(disc, new THREE.Vector3(0, 0, 1), new THREE.Matrix4().compose(new THREE.Vector3(x, RAFTER_TIP.y, RAFTER_TIP.z).addScaledVector(direction, 0.002), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction), new THREE.Vector3(1, 1, 1)), true);
  }
  const rafters = rafterSet.build(rafterWood, 'porch-rafters');
  scene.add(rafters);

  // Column bases (주춧돌): rough-dressed granite.
  const plinths: THREE.BufferGeometry[] = [];
  for (const x of [-4.5, 1.35]) {
    const g = boulderGeometry(Math.round(x * 10) + 99, 4, -0.6);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, -0.07, 0.54), new THREE.Quaternion(), new THREE.Vector3(0.34, 0.2, 0.32)));
    plinths.push(g);
  }

  // ---- Tiled eave: concave channels, convex covers and their end tiles ------------
  const tiles: THREE.BufferGeometry[] = [];
  // Concave channel (∪) and convex cover (∩), both running down the slope (z).
  const channel = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 10, 2, true, -Math.PI * 0.28, Math.PI * 0.56);
  channel.rotateX(Math.PI / 2);
  const cover = new THREE.CylinderGeometry(0.078, 0.078, 0.5, 12, 2, true, Math.PI / 2, Math.PI);
  cover.rotateX(Math.PI / 2);
  const coverEnd = new THREE.CylinderGeometry(0.088, 0.088, 0.028, 20);
  coverEnd.rotateX(Math.PI / 2);
  const boss = new THREE.SphereGeometry(0.024, 10, 8); boss.scale(1, 1, 0.5);
  // Drip-lip end tile: a drooping ∪ band below the channel mouth.
  const lipShape = new THREE.Shape();
  lipShape.absarc(0, 0, 0.27, -Math.PI * 0.78, -Math.PI * 0.22, false);
  lipShape.absarc(0, 0, 0.2, -Math.PI * 0.22, -Math.PI * 0.78, true);
  const lip = new THREE.ExtrudeGeometry(lipShape, { depth: 0.025, bevelEnabled: false, curveSegments: 10 });
  lip.translate(0, 0, -0.0125);
  const tilt = new THREE.Euler(-Math.atan(TILE_RISE), 0, 0);
  const place = (g: THREE.BufferGeometry, x: number, y: number, z: number, extra?: THREE.Euler) => {
    const clone = g.clone();
    if (extra) clone.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(extra));
    clone.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(tilt), new THREE.Vector3(1, 1, 1)));
    tiles.push(clone);
  };
  const channelXs: number[] = [];
  for (let x = -7.2 + TILE_PITCH / 2; x <= 7.2; x += TILE_PITCH) {
    const sag = 0.025 * Math.sin(x * 0.7);
    for (let row = 0; row < 3; row++) place(channel, x, TILE_Y + row * 0.42 * TILE_RISE + sag, TILE_Z + 0.27 + row * 0.42);
    // Drip-lip end tile (암막새) hangs below the channel mouth.
    place(lip, x, TILE_Y + sag, TILE_Z + 0.01);
    channelXs.push(x);
    const cx = x + TILE_PITCH / 2;
    if (cx <= 7.2) {
      for (let row = 0; row < 3; row++) place(cover, cx, TILE_Y - 0.12 + row * 0.42 * TILE_RISE + sag, TILE_Z + 0.27 + row * 0.42);
      place(coverEnd, cx, TILE_Y - 0.12 + sag, TILE_Z + 0.01);
      place(boss, cx, TILE_Y - 0.12 + sag, TILE_Z - 0.008);
    }
  }
  const tileGeometry = mergeGeometries(tiles.map(g => { g.deleteAttribute('uv'); return g.index ? g.toNonIndexed() : g; }))!;
  tileGeometry.computeVertexNormals();
  const eaveTiles = new THREE.Mesh(tileGeometry, tileMaterial);
  eaveTiles.name = 'porch-eave-tiles'; eaveTiles.castShadow = true; eaveTiles.receiveShadow = true;
  scene.add(eaveTiles);
  tiles.forEach(g => g.dispose()); [channel, cover, coverEnd, boss, lip].forEach(g => g.dispose());

  // ---- Garden ground, drip trench, stones --------------------------------------------
  // The stepping-stone path's centre line (the stones below sit on it).
  const pathX = (z: number) => { const i = (-1.55 - z) / 0.77; return -0.8 + Math.sin(i * 0.74) * 1.1 - i * 0.06; };
  const groundHeight = (x: number, z: number) => {
    const garden = THREE.MathUtils.smoothstep(-z, 1.2, 4);
    const offPath = z > -1.2 ? 0 : THREE.MathUtils.smoothstep(Math.abs(x - pathX(z)), 0.55, 1.3);
    // Moss hummocks: soft mounds a hand high, between broader swells of the ground.
    const hummocks = (Math.max(0, noise3(x * 0.55, 4, z * 0.55)) * 0.22 + 0.05 * noise3(x * 1.7, 5, z * 1.7)) * offPath;
    return GROUND + garden * (0.18 * fbm3(x * 0.16, 1, z * 0.16, 3) + 0.06 * noise3(x * 0.8, 2, z * 0.8) + hummocks);
  };
  const groundGeometry = new THREE.PlaneGeometry(70, 60, 150, 140);
  groundGeometry.rotateX(-Math.PI / 2);
  const gp = groundGeometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < gp.count; i++) {
    const t = (gp.getZ(i) + 30) / 60;
    const z = 1.0 - Math.pow(1 - t, 1.5) * 59;
    const x = gp.getX(i) * (0.35 + 0.65 * Math.min(1, -z / 18));
    gp.setXYZ(i, x, groundHeight(x, z), z);
  }
  groundGeometry.computeVertexNormals();
  const ground = new THREE.Mesh(groundGeometry, soil); ground.receiveShadow = true; ground.name = 'porch-garden-ground';
  scene.add(ground);

  const pebbles: THREE.BufferGeometry[] = [];
  const pebbleBase = [0, 1, 2, 3].map(seed => boulderGeometry(400 + seed, 1, -0.2));
  // The drip trench is packed with river pebbles, a few larger cobbles among them.
  for (let i = 0; i < 950; i++) {
    const x = range(-7, 7), z = TILE_Z - 0.08 + range(-0.32, 0.32);
    const s = i % 17 === 0 ? range(0.07, 0.11) : range(0.025, 0.055);
    const g = pebbleBase[i % 4].clone();
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, GROUND + 0.01 + s * 0.3, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(range(-0.3, 0.3), range(0, 6.28), 0)), new THREE.Vector3(s * range(1, 1.5), s * 0.6, s)));
    pebbles.push(g);
  }
  const pebbleMesh = new THREE.Mesh(mergeGeometries(pebbles)!, pebbleMaterial);
  pebbleMesh.receiveShadow = true; pebbleMesh.name = 'porch-drip-trench';
  scene.add(pebbleMesh);
  pebbles.forEach(g => g.dispose()); pebbleBase.forEach(g => g.dispose());

  const stepGeometries: THREE.BufferGeometry[] = [];
  const steps: [number, number][] = [];
  for (let i = 0; i < 11; i++) {
    const x = -0.8 + Math.sin(i * 0.74) * 1.1 - i * 0.06, z = -1.55 - i * 0.77;
    steps.push([x, z]);
    const g = boulderGeometry(200 + i, 4, -0.1);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, groundHeight(x, z) + 0.035, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, range(0, 6.28), 0)), new THREE.Vector3(range(0.36, 0.5), 0.08, range(0.28, 0.42))));
    stepGeometries.push(g);
  }
  const stepMesh = new THREE.Mesh(mergeGeometries(stepGeometries)!, steppingStone);
  stepMesh.castShadow = stepMesh.receiveShadow = true;
  scene.add(stepMesh);
  stepGeometries.forEach(g => g.dispose());

  const boulders: THREE.BufferGeometry[] = [...plinths];
  const boulderSpots: [number, number, number, number, number][] = [
    [-3.4, -7.2, 1.2, 0.75, 0.9], [-2.1, -8.4, 0.8, 0.5, 0.7], [0.7, -7.9, 1.0, 0.62, 0.8], [2.6, -6.6, 0.7, 0.45, 0.6],
    [4.3, -9.4, 1.3, 0.85, 1.0], [-5.6, -10.6, 1.1, 0.7, 0.9], [6.2, -6.0, 0.8, 0.5, 0.7], [-1.0, -11.5, 0.9, 0.55, 0.7],
  ];
  boulderSpots.forEach(([x, z, w, h, d], i) => {
    const g = boulderGeometry(31 + i * 7, 6);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, groundHeight(x, z) + h * 0.55, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(range(-0.1, 0.1), range(0, 6.28), range(-0.1, 0.1))), new THREE.Vector3(w, h, d)));
    boulders.push(g);
  });
  // Low dry-stone garden wall closing the view, softened by mist.
  for (let i = 0; i < 70; i++) {
    const row = i % 2, x = -16 + Math.floor(i / 2) * 0.95 + row * 0.45 + range(-0.1, 0.1), z = -16 + Math.sin(x * 0.3) * 0.3;
    const g = boulderGeometry(600 + (i % 9), 3);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, groundHeight(x, z) + 0.2 + row * 0.38, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, range(-0.2, 0.2), 0)), new THREE.Vector3(range(0.45, 0.6), range(0.2, 0.26), range(0.35, 0.45))));
    boulders.push(g);
  }
  const boulderMesh = new THREE.Mesh(mergeGeometries(boulders)!, gardenStone);
  boulderMesh.castShadow = boulderMesh.receiveShadow = true; boulderMesh.name = 'porch-garden-stones';
  scene.add(boulderMesh);
  boulders.forEach(g => g.dispose());

  // ---- Vegetation ---------------------------------------------------------------------
  // Layered, soaked garden planting: maples whose crowns are leaf-cluster cards with a
  // water film, clipped azalea mounds and a hedge before the wall, ferns at the path.
  const leafMaterial = applyWetSurface(applyFoliage(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.4, side: THREE.DoubleSide }), {
    key: 'porch-leaf', translucency: new THREE.Color(0.55, 0.85, 0.3), strength: 0.8,
  }), { key: 'porch-leaf', time, wetness: 0.6, darkening: 0.85, wetRoughness: 0.2 });
  const gardenWind: FoliageWind = { time, mode: 'attribute', sway: 0.07, flutter: 0.01, direction: [0.8, 0.35], speed: 0.5 };
  const mapleAtlas = broadleafClusterTexture({ seed: 31, palette: { base: '#36602a', light: '#5a8a38', dark: '#1b3614', stem: '#3b3224' }, round: 0.45, leafScale: 1.0, density: 1.4 });
  const shrubAtlas = broadleafClusterTexture({ seed: 47, palette: { base: '#284a1d', light: '#3f6a28', dark: '#142a10', stem: '#2e2a1d' }, round: 0.7, leafScale: 0.7, density: 2.2 });
  disposables.push(mapleAtlas, shrubAtlas);
  const canopyMaterial = wetLeafMaterial({ key: 'porch-canopy', map: mapleAtlas, wind: gardenWind, film: 0.3, translucency: { tint: '#cfe89a', back: 0.3, forward: 0.4 } });
  const shrubMaterial = wetLeafMaterial({ key: 'porch-shrub', map: shrubAtlas, wind: gardenWind, roughness: 0.55, film: 0.3, translucency: { tint: '#b8d88a', back: 0.05, forward: 0.05 } });
  // Dense, dark interiors under the leaf shells: clipped shrubs never show sky through them.
  const shrubCoreMaterial = applyWetSurface(new THREE.MeshStandardMaterial({ color: '#16260f', roughness: 0.75 }), { key: 'porch-shrub-core', time, wetness: 0.5, darkening: 0.9, wetRoughness: 0.4 });
  const barkMaterial = applyFoliageShading(applyBarkSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.85 }), {
    key: 'porch-bark', scale: 2.4, stretch: 4, depth: 0.02, plate: '#5a554b', fissure: '#15120e', wetness: 0.9,
    lichen: { color: '#7d8b74', amount: 0.2 }, moss: { color: '#36561d', amount: 0.75, below: 0.9, up: 0.85 },
  }), { key: 'porch-bark', wind: gardenWind });
  // Two maples frame the view; others stand back in layers behind the stones and the wall.
  const treeSpots: [number, number, number, number][] = [
    [-5.7, -8.6, 6.2, 0.2], [5.5, -9.3, 6.8, 0.22],
    [-2.9, -13.4, 7.2, 0.19], [2.3, -14.6, 8.2, 0.23], [7.8, -13.8, 6.8, 0.2], [-8.4, -12.6, 6.4, 0.18],
    [-0.4, -19.5, 9.2, 0.25], [-5.2, -20.2, 8.6, 0.22], [4.8, -21, 9.4, 0.24], [10.4, -19, 8.2, 0.2], [-11.2, -18.4, 8.4, 0.2],
    [1.6, -25.5, 10.5, 0.26], [-7.4, -26.5, 9.8, 0.24], [7.8, -27.4, 10.4, 0.25], [-13.6, -24.5, 9.4, 0.22], [13.4, -25.5, 9.6, 0.22],
    // A closing wall of older trees behind, so the garden is held by woodland, not sky.
    [-3.6, -31, 12, 0.3], [4.2, -33, 12.5, 0.3], [-10.5, -32, 11.5, 0.28], [11, -31.5, 11.8, 0.28], [-1.5, -37, 13, 0.32], [8.5, -38, 12.5, 0.3], [-17, -30, 11, 0.26], [17.5, -30.5, 11, 0.26],
  ];
  const treeBuilds = treeSpots.map(([x, z, h, r], i) => buildTree({
    seed: 300 + i * 13, base: new THREE.Vector3(x, groundHeight(x, z) - 0.08, z), height: h, radius: r, form: 'broadleaf',
    lean: [range(-0.6, 0.6), range(-0.4, 0.4)], gnarl: 0.5, flare: 0.5, crownStart: 0.26 + range(0, 0.1), limbs: i < 2 ? 8 : 7, levels: i < 16 ? 2 : 1, children: 3,
    spread: 0.42, curl: 0.12, radial: i < 2 ? 14 : 8, ringsPerMetre: i < 6 ? 2 : 0.8, displace: 0, barkScale: 2.4, barkStretch: 4, flex: 0.4,
    // The misted back wall needs only big, coarse crowns.
    leaves: { cardsPerTwig: i < 6 ? 12 : i < 16 ? 10 : 14, size: i < 6 ? 1.45 : i < 16 ? 2.2 : 2.9, reach: 0.85, crownNormals: 0.78, shade: [0.22, 1], fill: 0.6, skyward: 0.4 },
  }));
  const trees = new THREE.Mesh(concatGeometries(treeBuilds.map(t => t.bark)), barkMaterial);
  trees.castShadow = true; trees.receiveShadow = true; trees.name = 'porch-garden-trees'; scene.add(trees);
  const crownParts = treeBuilds.map(t => t.leaves).filter((g): g is THREE.BufferGeometry => !!g);
  // Clipped azalea mounds around the stones and a box hedge before the wall.
  const mounds: [number, number, number][] = [[-2.7, -5.4, 0.75], [3.7, -5.1, 0.85], [-4.7, -6.4, 0.95], [1.9, -9.9, 0.75], [-0.3, -13.2, 1.0], [5.2, -12.3, 1.1], [-7.3, -11.6, 1.05], [2.9, -3.3, 0.5], [-1.4, -9.6, 0.6]];
  const shrubParts: THREE.BufferGeometry[] = [], coreParts: THREE.BufferGeometry[] = [];
  const coreBase = new THREE.IcosahedronGeometry(1, 2);
  const addShrub = (seed: number, centre: THREE.Vector3, radii: THREE.Vector3, cards: number, size: number) => {
    shrubParts.push(shrubGeometry(seed, centre, radii, cards, size));
    const core = coreBase.clone();
    const cp = core.attributes.position as THREE.BufferAttribute;
    for (let k = 0; k < cp.count; k++) {
      const x = cp.getX(k), y = cp.getY(k), z = cp.getZ(k), n = 0.82 + 0.1 * noise3(x * 2 + seed, y * 2, z * 2);
      cp.setXYZ(k, centre.x + x * radii.x * n, centre.y + Math.max(y, -0.6) * radii.y * n, centre.z + z * radii.z * n);
    }
    core.computeVertexNormals(); coreParts.push(core);
  };
  mounds.forEach(([x, z, s], i) => addShrub(i + 3, new THREE.Vector3(x, groundHeight(x, z) + s * 0.42, z), new THREE.Vector3(s * 1.15, s * 0.62, s), Math.round(170 * s * s + 40), 0.4 + s * 0.12));
  for (let i = 0; i < 20; i++) {
    const x = -15 + i * 1.55 + range(-0.2, 0.2), z = -15.1 + range(-0.2, 0.2);
    addShrub(40 + i, new THREE.Vector3(x, groundHeight(x, z) + 0.55, z), new THREE.Vector3(1.05, 0.8, 0.75), 190, 0.52);
  }
  coreBase.dispose();
  const shrubCores = new THREE.Mesh(mergeGeometries(coreParts)!, shrubCoreMaterial);
  shrubCores.receiveShadow = true; shrubCores.castShadow = true; scene.add(shrubCores);
  coreParts.forEach(g => g.dispose());
  const leaves = new THREE.Mesh(concatGeometries(crownParts), canopyMaterial);
  leaves.castShadow = true; leaves.receiveShadow = true; leaves.name = 'porch-garden-leaves'; scene.add(leaves);
  const shrubs = new THREE.Mesh(concatGeometries(shrubParts), shrubMaterial);
  shrubs.castShadow = true; shrubs.receiveShadow = true; shrubs.name = 'porch-garden-shrubs'; scene.add(shrubs);
  treeBuilds.forEach(t => { t.bark.dispose(); t.leaves?.dispose(); });
  shrubParts.forEach(g => g.dispose());
  const color = new THREE.Color();

  const fernStems: THREE.BufferGeometry[] = [];
  const fernMatrices: THREE.Matrix4[] = [];
  const fernSpots: [number, number, number][] = [[-2.1, -1.15, 1.0], [2.15, -1.25, 0.95], [-3.2, -2.6, 1.15], [2.7, -3.4, 1.05], [3.5, -5.9, 1.1], [-4.5, -4.9, 1.05], [-2.9, -8.2, 0.9], [4.8, -9, 1.2], [-5.5, -10, 1.1], [6.5, -5, 1.0], [1.9, -10, 0.8], [-7.1, -7.2, 1.1], [-1.4, -3.4, 0.7], [1.2, -2.2, 0.6]];
  for (const [x, z, size] of fernSpots) fernFronds(new THREE.Vector3(x, groundHeight(x, z), z), size, 9, random, fernStems, fernMatrices);
  const stemMesh = new THREE.Mesh(mergeGeometries(fernStems)!, new THREE.MeshStandardMaterial({ color: '#4b5e2c', roughness: 0.6 }));
  fernStems.forEach(g => g.dispose());
  scene.add(stemMesh);
  const ferns = new THREE.InstancedMesh(leafletGeometry(4, 0.22, 0.05), leafMaterial, fernMatrices.length);
  fernMatrices.forEach((m, i) => { ferns.setMatrixAt(i, m); ferns.setColorAt(i, color.setHSL(range(0.2, 0.26), range(0.38, 0.55), range(0.22, 0.32), THREE.SRGBColorSpace)); });
  ferns.castShadow = true; ferns.receiveShadow = true; ferns.name = 'porch-ferns';
  scene.add(ferns);

  // Mondo grass: dark arching tufts edging the trench, the stepping stones, the stones
  // and the lantern, scattered thinner over the moss. Glossy with water, swaying a little.
  const tuftMaterial = applyFoliageShading(new THREE.MeshPhysicalMaterial({ color: '#ffffff', vertexColors: true, roughness: 0.45, clearcoat: 0.45, clearcoatRoughness: 0.2, side: THREE.DoubleSide }), {
    key: 'porch-mondo', wind: { time, mode: 'height', height: 1, sway: 0.03, flutter: 0.006, direction: [0.8, 0.35], speed: 0.6 },
    translucency: { tint: '#a8c878', back: 0.2, forward: 0.2 },
  });
  const tuftTemplate = tuftGeometry(5, 11, 4, 0.7);
  const tuftSpots: [number, number, number][] = [];
  // A dense double row edges the trench; clumps gather at the stones, the lantern and the path.
  for (let x = -7; x <= 7; x += range(0.1, 0.17)) tuftSpots.push([x, -1.3 + range(-0.1, 0.1), range(0.34, 0.5)]);
  for (let x = -7; x <= 7; x += range(0.14, 0.24)) tuftSpots.push([x, -1.52 + range(-0.1, 0.1), range(0.3, 0.44)]);
  steps.forEach(([sx, sz]) => { for (let k = 0; k < 8; k++) { const a = range(0, 6.28), r = range(0.42, 0.6); tuftSpots.push([sx + Math.cos(a) * r, sz + Math.sin(a) * r * 0.85, range(0.26, 0.4)]); } });
  boulderSpots.forEach(([x, z, w, , d]) => { for (let k = 0; k < 12; k++) { const a = range(0, 6.28); tuftSpots.push([x + Math.cos(a) * w * range(0.9, 1.15), z + Math.sin(a) * d * range(0.9, 1.15), range(0.32, 0.5)]); } });
  for (let k = 0; k < 14; k++) { const a = k / 14 * 6.28; tuftSpots.push([1.75 + Math.cos(a) * range(0.4, 0.55), -6.3 + Math.sin(a) * range(0.4, 0.55), range(0.3, 0.42)]); }
  const tufts = new THREE.InstancedMesh(tuftTemplate, tuftMaterial, tuftSpots.length);
  const tuftDummy = new THREE.Object3D();
  tuftSpots.forEach(([x, z, h], i) => {
    tuftDummy.position.set(x, groundHeight(x, z) - 0.01, z); tuftDummy.rotation.set(0, range(0, 6.28), 0);
    tuftDummy.scale.set(h * range(0.9, 1.3), h, h * range(0.9, 1.3)); tuftDummy.updateMatrix();
    tufts.setMatrixAt(i, tuftDummy.matrix);
    tufts.setColorAt(i, color.setHSL(range(0.22, 0.28), range(0.35, 0.5), range(0.12, 0.19), THREE.SRGBColorSpace));
  });
  tufts.castShadow = true; tufts.receiveShadow = true; tufts.name = 'porch-mondo-grass'; scene.add(tufts);
  disposables.push(tuftTemplate);

  // Ridges of wooded hills recede into the rain.
  const hills = new THREE.Group(); scene.add(hills);
  for (let layer = 0; layer < 3; layer++) {
    const g = new THREE.PlaneGeometry(130, 30, 160, 20); g.rotateX(-Math.PI / 2);
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i);
      const ridge = 5 + layer * 2.2 + fbm3(x * 0.03 + layer * 7, 1, 2, 3) * 4 + 0.5 * noise3(x * 0.5, layer, 3);
      const depth = Math.max(0, Math.sin((z + 15) / 30 * Math.PI));
      p.setY(i, -0.8 + depth * ridge + 0.4 * noise3(x * 0.4, z * 0.4, layer));
    }
    g.computeVertexNormals();
    const hill = new THREE.Mesh(g, applyFoliage(new THREE.MeshStandardMaterial({ color: ['#2f4430', '#36493a', '#3d5044'][layer], roughness: 1 }), { key: `porch-hill-${layer}`, translucency: '#000000', strength: 0 }));
    hill.position.z = -36 - layer * 18;
    hills.add(hill);
  }

  // ---- A carved granite lantern beside the path: an octagonal base, pillar, fire chamber
  // with four windows and an upturned roof stone, moss on its ledges --------------------
  const lanternParts: THREE.BufferGeometry[] = [];
  const LX = 1.75, LZ = -6.3, LY = groundHeight(LX, LZ) - 0.03;
  let ly = LY;
  const tier = (rTop: number, rBottom: number, h: number) => {
    const g = new THREE.CylinderGeometry(rTop, rBottom, h, 8, 1);
    g.deleteAttribute('uv'); const flat = g.toNonIndexed(); g.dispose();
    flat.rotateY(Math.PI / 8); flat.translate(LX, ly + h / 2, LZ); flat.computeVertexNormals();
    lanternParts.push(flat); ly += h;
  };
  tier(0.3, 0.36, 0.1); tier(0.24, 0.3, 0.1); tier(0.19, 0.24, 0.06); tier(0.085, 0.095, 0.52);
  tier(0.27, 0.19, 0.1); tier(0.28, 0.28, 0.03);
  const chamberY = ly; tier(0.17, 0.17, 0.27);
  tier(0.36, 0.36, 0.025); tier(0.08, 0.37, 0.15); tier(0.05, 0.07, 0.05);
  const finialSource = new THREE.SphereGeometry(0.055, 12, 8); finialSource.deleteAttribute('uv');
  const finial = finialSource.toNonIndexed(); finialSource.dispose(); finial.translate(LX, ly + 0.04, LZ); lanternParts.push(finial);
  const stoneLantern = new THREE.Mesh(mergeGeometries(lanternParts)!, gardenStone);
  stoneLantern.castShadow = stoneLantern.receiveShadow = true; stoneLantern.name = 'porch-stone-lantern'; scene.add(stoneLantern);
  lanternParts.forEach(g => g.dispose());
  const windowGeometries: THREE.BufferGeometry[] = [];
  for (let k = 0; k < 4; k++) {
    const a = k * Math.PI / 2 + Math.PI / 8;
    const w = new THREE.PlaneGeometry(0.085, 0.15);
    w.rotateY(a); w.translate(LX + Math.sin(a) * 0.159, chamberY + 0.14, LZ + Math.cos(a) * 0.159);
    windowGeometries.push(w);
  }
  const lanternWindows = new THREE.Mesh(mergeGeometries(windowGeometries)!, new THREE.MeshStandardMaterial({ color: '#0c0d0b', roughness: 0.9 }));
  scene.add(lanternWindows); windowGeometries.forEach(g => g.dispose());

  // ---- The carved granite basin at arm's reach ------------------------------------------
  const basin = new THREE.Group(); basin.position.set(0.64, -0.13, -0.03); scene.add(basin);
  const profile = [new THREE.Vector2(0.09, 0), new THREE.Vector2(0.37, 0.025), new THREE.Vector2(0.55, 0.11), new THREE.Vector2(0.65, 0.25), new THREE.Vector2(0.715, 0.49), new THREE.Vector2(0.7, 0.63), new THREE.Vector2(0.69, 0.655), new THREE.Vector2(0.665, 0.67), new THREE.Vector2(0.588, 0.665), new THREE.Vector2(0.565, 0.645), new THREE.Vector2(0.55, 0.6), new THREE.Vector2(0.51, 0.37), new THREE.Vector2(0.39, 0.23), new THREE.Vector2(0.1, 0.19), new THREE.Vector2(0, 0.19)];
  const basinGeometry = new THREE.LatheGeometry(profile, 120);
  const bp = basinGeometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < bp.count; i++) {
    const x = bp.getX(i), y = bp.getY(i), z = bp.getZ(i), a = Math.atan2(x, z);
    // Hand-carved: uneven wall, chisel facets on the outside, a softened rim.
    const variation = Math.sin(a * 7 + 0.4) * 0.012 + Math.sin(a * 13 - 0.7) * 0.004 + 0.012 * noise3(Math.cos(a) * 2, y * 4, Math.sin(a) * 2) + 0.004 * noise3(Math.cos(a) * 9, y * 14, Math.sin(a) * 9);
    bp.setXYZ(i, x * (1 + variation), y + Math.sin(a * 5) * 0.008 * Math.min(y, 1), z * (1 + variation));
  }
  basinGeometry.computeVertexNormals();
  const bowl = new THREE.Mesh(basinGeometry, granite); bowl.castShadow = bowl.receiveShadow = true; basin.add(bowl);
  const footing = new THREE.Mesh(boulderGeometry(77, 4, -0.2), gardenStone); footing.position.set(0.64, -0.2, -0.03); footing.scale.set(0.78, 0.13, 0.66);
  footing.receiveShadow = true; scene.add(footing);

  // Water: dark, mirror-smooth, stirred by the spout's trickle and its spatter, by drips
  // falling from the two wet rafter ends overhead, and by the viewer's touch.
  // Drip sources in the water's local plane (x, -z from the basin centre): period, phase.
  const BASIN_X = 0.64, BASIN_Z = -0.03, WATER_Y = -0.13 + 0.581, DRIP_TOP = RAFTER_TIP.y - 0.06;
  const drips = [[0.45, 2.3, 0.4], [0.75, 3.1, 1.7], [0.45, 4.3, 3.1]].map(([x, period, phase]) => ({ x, period, phase }));
  const dripFall = Math.sqrt(2 * (DRIP_TOP - WATER_Y) / 9.81);
  const uniforms = {
    uTime: time, uTouch: { value: new THREE.Vector2(0.12, -0.05) }, uTouchTime: { value: -100 },
    uDrips: { value: drips.map(d => new THREE.Vector4(d.x - BASIN_X, -(RAFTER_TIP.z - BASIN_Z), d.period, d.phase)) },
  };
  const waterMat = new THREE.MeshStandardMaterial({ color: '#0e1a17', roughness: 0.03, metalness: 0 });
  waterMat.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vWaterP;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWaterP = position.xy;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float uTime; uniform vec2 uTouch; uniform float uTouchTime;
uniform vec4 uDrips[3];
varying vec2 vWaterP;
${GLSL_NOISE}
${GLSL_WET_RIPPLES}
vec2 ring(vec2 p, vec2 o, float age, float amp) {
  vec2 d = p - o; float r = length(d);
  float x = (r - age * 0.27) * 56.0;
  return d / max(r, 1e-3) * cos(x) * exp(-x * x * 0.012) * exp(-age * 0.65) * amp;
}`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  vec2 p = vWaterP;
  // A faint stir of spatter everywhere, the trickle's steady ring train, and fine
  // spatter drops landing around it.
  vec2 g = wetRippleGradient(p * 14.0, uTime * 0.6) * 0.02;
  for (int i = 0; i < 4; i++) { float fi = float(i); g += ring(p, vec2(0.27, -0.09), mod(uTime * 1.5 + fi * 0.62, 2.5), 0.06); }
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float cycle = uTime * (0.55 + 0.17 * fi) + fi * 3.7;
    vec3 h = bwHash3(vec3(floor(cycle), fi, 7.0));
    vec2 at = vec2(0.27, -0.09) + (h.xy - 0.5) * 0.3;
    g += ring(p, at, fract(cycle) * 1.6, 0.025 * step(0.3, h.z));
  }
  // Drips from the rafter ends: each ring starts as its falling drop arrives.
  for (int i = 0; i < 3; i++) {
    vec4 d = uDrips[i];
    float age = mod(uTime - d.w, d.z);
    g += ring(p, d.xy, age, 0.11);
  }
  float age = uTime - uTouchTime;
  if (age >= 0.0 && age < 8.0) g += ring(p, uTouch, age, 0.42);
  // The plane's local xy maps to world x and -z.
  vec3 worldN = normalize(vec3(-g.x, 1.0, g.y));
  normal = normalize((viewMatrix * vec4(worldN, 0.0)).xyz);
}`);
  };
  waterMat.customProgramCacheKey = () => 'porch-basin-water-v3';
  const waterGrid = new THREE.CircleGeometry(0.562, 96);
  const water = new THREE.Mesh(waterGrid, waterMat); water.rotation.x = -Math.PI / 2; water.position.y = 0.581; basin.add(water);
  water.name = 'porch-basin-water';

  // Bamboo spout with nodes and a bound joint.
  const bamboo = applyWetSurface(new THREE.MeshStandardMaterial({ color: '#8c8a52', roughness: 0.38 }), { key: 'porch-bamboo', time, wetness: 0.7, darkening: 0.8, wetRoughness: 0.12, streaks: 0.4 });
  const bambooParts: THREE.BufferGeometry[] = [];
  bambooParts.push(limbGeometry([new THREE.Vector3(1.26, -0.13, -0.4), new THREE.Vector3(1.262, 0.4, -0.4), new THREE.Vector3(1.26, 0.92, -0.4)], 0.038, 0.034, 14, 12));
  const spoutStart = new THREE.Vector3(1.5, 0.9, -0.33), spoutEnd = new THREE.Vector3(0.91, 0.81, -0.12);
  bambooParts.push(limbGeometry([spoutStart, spoutStart.clone().lerp(spoutEnd, 0.5), spoutEnd], 0.054, 0.052, 14, 10));
  for (const t of [0.22, 0.62]) {
    const node = new THREE.TorusGeometry(0.055, 0.008, 6, 20);
    node.applyMatrix4(new THREE.Matrix4().compose(spoutStart.clone().lerp(spoutEnd, t), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), spoutEnd.clone().sub(spoutStart).normalize()), new THREE.Vector3(1, 1, 1)));
    bambooParts.push(node);
  }
  for (const y of [0.15, 0.55]) {
    const node = new THREE.TorusGeometry(0.039, 0.006, 6, 20); node.rotateX(Math.PI / 2); node.translate(1.26, y, -0.4); bambooParts.push(node);
  }
  const bambooMesh = new THREE.Mesh(mergeGeometries(bambooParts.map(g => { g.deleteAttribute('uv'); return g.index ? g.toNonIndexed() : g; }))!, bamboo);
  bambooMesh.castShadow = true; scene.add(bambooMesh);
  bambooParts.forEach(g => g.dispose());
  const mouth = new THREE.Mesh(new THREE.CircleGeometry(0.046, 20), new THREE.MeshStandardMaterial({ color: '#141810', roughness: 0.6 }));
  mouth.position.copy(spoutEnd); mouth.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), spoutEnd.clone().sub(spoutStart).normalize()); scene.add(mouth);
  const twine = new THREE.MeshStandardMaterial({ color: '#3f3a28', roughness: 1 });
  for (let i = 0; i < 3; i++) { const knot = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.007, 6, 18), twine); knot.position.set(1.24 - i * 0.015, 0.867 - i * 0.002, -0.242 + i * 0.005); knot.rotation.set(0, 1.22, 1.73); scene.add(knot); }

  // The drips themselves: drops gathering at the rafter ends, then falling into the basin.
  const dripMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: time, uDrips: { value: drips.map(d => new THREE.Vector4(d.x, d.period, d.phase, 0)) }, uTop: { value: DRIP_TOP }, uFall: { value: dripFall }, uZ: { value: RAFTER_TIP.z } },
    vertexShader: `
uniform float uTime, uTop, uFall, uZ;
uniform vec4 uDrips[3];
varying vec2 vQuad;
varying float vAlpha;
void main() {
  int index = int(position.z);
  vec4 d = index == 0 ? uDrips[0] : index == 1 ? uDrips[1] : uDrips[2];
  float t = mod(uTime - d.z, d.y);
  // A bead swells at the rafter end, then falls and stretches with speed.
  float falling = step(d.y - uFall, t);
  float ft = max(t - (d.y - uFall), 0.0);
  float y = uTop - 4.905 * ft * ft;
  float stretch = falling * 9.81 * ft * 0.015 + 0.006;
  float swell = mix(0.002 + 0.0035 * t / max(d.y - uFall, 0.1), 0.0042, falling);
  vec3 head = vec3(d.x, y, uZ);
  vec3 world = head + vec3(0.0, position.y * stretch, 0.0);
  vec4 view = viewMatrix * vec4(world, 1.0);
  view.x += position.x * max(swell, -view.z * 0.0012);
  vQuad = position.xy; vAlpha = 1.0;
  gl_Position = projectionMatrix * view;
}`,
    fragmentShader: `
varying vec2 vQuad;
varying float vAlpha;
void main() {
  float a = exp(-vQuad.x * vQuad.x * 3.0) * (1.0 - smoothstep(0.6, 1.0, vQuad.y)) * 0.85;
  gl_FragColor = vec4(vec3(1.6, 1.7, 1.74) * a, a * 0.5);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
    transparent: true, depthWrite: false, blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
  });
  const dripGeometry = new THREE.BufferGeometry();
  const dripPositions: number[] = [], dripIndex: number[] = [];
  drips.forEach((_, i) => {
    dripPositions.push(-1, 0, i, 1, 0, i, -1, 1, i, 1, 1, i);
    dripIndex.push(i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 1, i * 4 + 3, i * 4 + 2);
  });
  dripGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dripPositions, 3));
  dripGeometry.setIndex(dripIndex);
  const dripMesh = new THREE.Mesh(dripGeometry, dripMaterial);
  dripMesh.frustumCulled = false; dripMesh.renderOrder = 6; scene.add(dripMesh);
  disposables.push(dripGeometry, dripMaterial);

  // ---- Rain, runoff, splashes -------------------------------------------------------------
  const rainSky = new THREE.Color(1.2, 1.3, 1.33);
  const wind = new THREE.Vector2(0.05, 0.03);
  // Real rain at this range: thin motion-blurred threads of uneven brightness that show
  // against the dark planting and all but vanish against the bright sky; the far layers
  // thin to a fine haze that thickens and thins in drifting bands.
  const rainLayers = [
    createRainLayer({ time, count: 1400, min: new THREE.Vector3(-4.5, GROUND - 0.1, -4.2), max: new THREE.Vector3(4.5, 3.6, TILE_Z - 0.2), speed: 7.8, width: 0.0019, shutter: 0.03, radiance: rainSky, opacity: 0.32, boost: 1.05, seed: 11, wind, nearFade: 1, variation: 1, occlusion: 0.9 }),
    createRainLayer({ time, count: 6500, min: new THREE.Vector3(-11, GROUND - 0.1, -14), max: new THREE.Vector3(11, 8, -4.2), speed: 8, width: 0.0016, shutter: 0.03, radiance: rainSky, opacity: 0.45, boost: 1.1, seed: 12, wind, variation: 1, occlusion: 0.9, gusts: 0.45, gustScale: 7, gustDrift: new THREE.Vector2(0.7, 0.2) }),
    createRainLayer({ time, count: 12000, min: new THREE.Vector3(-30, GROUND - 0.1, -46), max: new THREE.Vector3(30, 16, -14), speed: 8.3, width: 0.0015, shutter: 0.03, radiance: rainSky, opacity: 0.42, boost: 1, seed: 13, wind, variation: 1, occlusion: 0.85, gusts: 0.7, gustScale: 10, gustDrift: new THREE.Vector2(0.9, 0.25) }),
  ];
  rainLayers.forEach(layer => scene.add(layer.mesh));
  // Each tile channel sheds what its stretch of roof collects: a few pour as glassy ropes
  // that pinch into chains of drops, most only drip. Uneven, as on a real old roof.
  const streams: RunoffStream[] = channelXs.filter(x => Math.abs(x) < 6).map(x => {
    const n = THREE.MathUtils.clamp(noise3(x * 1.1, 3, 1) * 0.5 + 0.5 + range(-0.18, 0.18), 0, 1);
    const flow = THREE.MathUtils.clamp(0.12 + 1.1 * n * n, 0.08, 1);
    const top = new THREE.Vector3(x + range(-0.02, 0.02), TILE_Y - 0.26 + 0.025 * Math.sin(x * 0.7), TILE_Z - 0.03);
    return { top, bottom: new THREE.Vector3(top.x + range(-0.01, 0.04), GROUND + 0.02, top.z - 0.05 - flow * 0.12), width: 0.012 + flow * 0.03, flow };
  });
  // Brighter than the rain behind: the mist pass later dims everything in front of the garden.
  const runoff = createRunoff(streams, { time, radiance: new THREE.Color(1.15, 1.22, 1.26), opacity: 0.7, chain: true, shutter: 0.015, occlusion: 0.6 });
  // The bamboo spout's steady trickle stays one smooth stream.
  const trickle = createRunoff([{ top: new THREE.Vector3(0.9, 0.79, -0.11), bottom: new THREE.Vector3(0.89, 0.46, -0.1), width: 0.01, flow: 0.9 }], { time, radiance: new THREE.Color(2.0, 2.12, 2.16), opacity: 0.8 });
  scene.add(trickle.mesh); disposables.push(trickle);
  scene.add(runoff.mesh);
  // Splashes where the streams land, plus rain impacts on stones and ground.
  const splashPoints: number[] = [];
  streams.forEach(stream => { for (let k = 0; k < 1 + Math.round(stream.flow! * 3); k++) splashPoints.push(stream.bottom.x + range(-0.03, 0.03), GROUND + 0.04, stream.bottom.z + range(-0.03, 0.03)); });
  const streamSplashes = createRainSplashes({ points: splashPoints, time, size: 0.07, rate: 4, life: 0.18, jitter: 0.04, radiance: new THREE.Color(1.1, 1.18, 1.22), opacity: 0.4, seed: 5 });
  const rainPoints: number[] = [];
  for (let i = 0; i < 520; i++) {
    const [sx, sz] = steps[i % steps.length];
    const onStone = i % 3 === 0;
    const x = onStone ? sx + range(-0.25, 0.25) : range(-4, 4), z = onStone ? sz + range(-0.2, 0.2) : TILE_Z - 0.4 - Math.pow(random(), 1.4) * 8;
    rainPoints.push(x, onStone ? groundHeight(x, z) + 0.12 : groundHeight(x, z) + 0.01, z);
  }
  const rainSplashes = createRainSplashes({ points: rainPoints, time, size: 0.04, rate: 1.7, jitter: 0.1, radiance: new THREE.Color(1.0, 1.08, 1.12), opacity: 0.4, seed: 6 });
  scene.add(streamSplashes.mesh, rainSplashes.mesh);
  disposables.push(...rainLayers, runoff, streamSplashes, rainSplashes);

  const raycaster = new THREE.Raycaster();
  const probes: THREE.WebGLRenderTarget[] = [];
  const porchParts = [scene.getObjectByName('porch-floor-planks')!, frameMesh, rafters, eaveTiles, basin, bambooMesh];
  return {
    post: {
      exposure: 1.1, bloomStrength: 0.05, bloomThreshold: 0, aoStrength: 0.9, aoRadius: 0.38,
      saturation: 1.0, contrast: 1.1, shadowTint: [0.9, 0.97, 1.06], highlightTint: [1.02, 1.0, 0.97], vignette: 0.45, grain: 0.03,
    },
    createVolume: () => createMist({
      skyLight: new THREE.Color(0.6, 0.69, 0.68), glowLight: new THREE.Color(0.1, 0.1, 0.09), glowDirection,
      density: 0.021, heightFalloff: 0.1, groundY: GROUND,
      shelter: { normal: new THREE.Vector3(0, 0, -1), offset: 0.7, softness: 1.4 },
      maxDistance: 110, curtains: 1.5, curtainScale: 9, wind: new THREE.Vector2(0.4, 0.1),
    }),
    prepare(renderer, hdr) {
      if (!hdr) return;
      const skyProbe = captureSkyProbe(renderer, sky.material);
      probes.push(skyProbe);
      scene.environment = skyProbe.texture;
      const hide = [...rainLayers.map(l => l.mesh), runoff.mesh, trickle.mesh, streamSplashes.mesh, rainSplashes.mesh, dripMesh];
      const garden = captureProbe(renderer, scene, new THREE.Vector3(0, 1.3, -5), hide, 128, 140);
      probes.push(garden);
      scene.environment = garden.texture;
      const porch = captureProbe(renderer, scene, new THREE.Vector3(0.3, 1.3, 2.2), hide, 128, 140);
      probes.push(porch);
      for (const part of porchParts) assignProbe(part, porch.texture, 1, material => material !== waterMat);
      // The basin mirrors what is really above it: the dark eave and the bright gap beyond.
      const pool = captureProbe(renderer, scene, new THREE.Vector3(0.64, 0.55, -0.03), [...hide, water], 128, 140);
      probes.push(pool);
      waterMat.envMap = pool.texture; waterMat.needsUpdate = true;
    },
    setPostActive(active) {
      fallbackFill.visible = !active && !scene.environment;
      if (!active) { scene.fog = new THREE.FogExp2('#839b94', 0.036); rainLayers.forEach(layer => layer.setBoost(1)); }
    },
    setViewHeight(pixels) { rainLayers.forEach(layer => layer.setViewHeight(pixels)); runoff.setViewHeight(pixels); },
    resize(aspect) {
      camera.fov = aspect < 0.8 ? 61 : 52;
      // Narrow composition keeps the bowl, rain edge and the path; it never becomes empty roof/floor.
      camera.position.set(aspect < 0.8 ? 0.68 : 0, aspect < 0.8 ? 1.42 : 1.49, aspect < 0.8 ? 3.3 : 3.7);
      camera.lookAt(aspect < 0.8 ? 0.56 : 0.08, aspect < 0.8 ? 1.0 : 0.92, -5);
      camera.updateProjectionMatrix();
    },
    update(t) {
      time.value = t;
      // Low-amplitude coherent fern motion; crowns and shrubs sway in their shader.
      ferns.rotation.y = Math.sin(t * 0.31) * 0.0014;
    },
    interact(x, y, explicit = false) {
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera); scene.updateMatrixWorld(true);
      const hit = explicit ? null : raycaster.intersectObject(water, false)[0];
      if (!explicit && !hit) return null;
      if (hit) { const local = water.worldToLocal(hit.point.clone()); uniforms.uTouch.value.set(local.x, local.y); }
      else uniforms.uTouch.value.set(-0.08, 0.06);
      uniforms.uTouchTime.value = time.value;
      return { action: 'basin-ripple', value: 0.55 };
    },
    dispose() {
      disposables.forEach(d => d.dispose());
      probes.forEach(p => p.dispose());
      scene.environment = null;
    },
  };
};
