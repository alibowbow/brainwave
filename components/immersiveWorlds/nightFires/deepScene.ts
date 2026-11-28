import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldRecipe } from './worldTypes';
import { seeded, mesh, lantern, stoneMaterial, woodMaterial, barkMaterial } from './scenery';
import { createNoiseVolume } from '../shared/render/fireFlame';
import { bakeNightEnvironment, createNightSky } from '../shared/render/skyNight';
import { createNightVolume } from './atmosphere';
import { boulderGeometry, coniferGeometry, createFoliageMaterial, createGroundMaterial, createTerrainMaterial, needleSprayTexture, ridgeGeometry } from './landscape';
import { addTreeSway, buildForest, forestMaterial, scatterForest } from './forest';

const direction = (azimuthDegrees: number, elevationDegrees: number) => {
  const a = THREE.MathUtils.degToRad(azimuthDegrees), e = THREE.MathUtils.degToRad(elevationDegrees);
  return new THREE.Vector3(Math.sin(a) * Math.cos(e), Math.sin(e), -Math.cos(a) * Math.cos(e));
};

/** Original mountain lookout: moonlit ridge layers over a misty valley, a stone parapet and a lantern on a timber seat. */
export function buildDeepNightWorld(): WorldRecipe {
  const scene = new THREE.Scene();
  scene.name = 'Hilltop overlook — deep night';
  const fallbackFog = new THREE.FogExp2('#18233a', 0.0042);
  scene.fog = fallbackFog;
  const random = seeded(19812);
  const noise = createNoiseVolume(48, 11);

  // A waxing gibbous moon over the far ranges: it backlights the layers; a modest
  // halo and a clear, dark sky keep the twinkling stars readable.
  const moonDir = direction(27, 19);
  const sky = createNightSky({
    noise, zenith: '#071026', horizon: '#2a3956', brightness: 0.055,
    glow: { color: '#56688a', direction: moonDir, intensity: 0.028, width: 5, height: 0.12 },
    airglow: 0.015,
    moon: { direction: moonDir, intensity: 46, radius: 0.0135, halo: 0.55, color: '#fff3df', sunDirection: direction(27 + 150, -12) },
    galaxy: { pole: new THREE.Vector3().crossVectors(direction(-70, 8), direction(10, 80)).normalize(), centre: direction(-70, 8), intensity: 0.025 },
    stars: { count: 3800, seed: 713, intensity: 2.1, galacticFraction: 0.3, twinkle: 0.8 },
  });
  scene.add(sky.group);

  const moonLight = new THREE.DirectionalLight('#a9bde6', 0.85);
  moonLight.position.copy(moonDir).multiplyScalar(60);
  moonLight.castShadow = true;
  moonLight.shadow.mapSize.set(2048, 2048);
  Object.assign(moonLight.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 140 });
  moonLight.shadow.normalBias = 0.035;
  moonLight.shadow.bias = -0.0002;
  moonLight.shadow.radius = 3;
  moonLight.target.position.set(0, 0, 2);
  scene.add(moonLight, moonLight.target);

  // Layered ranges across the valley, each eroded, the farthest snow-dusted.
  const layers: Array<[number, number, number, number, Array<[number, number, number]>, number, string, string, number, number]> = [
    [-215, 560, 70, -18, [[-160, 44, 50], [-60, 56, 40], [40, 48, 46], [150, 60, 50]], 735, '#727c8c', '#252d32', 10, 28],
    [-152, 440, 60, -16, [[-140, 30, 38], [-40, 38, 30], [70, 34, 36], [170, 28, 40]], 752, '#5d6672', '#1e272b', 12, 40],
    [-104, 330, 50, -14, [[-110, 20, 30], [-20, 16, 26], [60, 24, 28]], 781, '#4c535a', '#1b2427', 16, 99],
    [-70, 250, 38, -12, [[-80, 12, 24], [10, 7, 22], [85, 13, 26]], 799, '#41474a', '#182023', 99, 99],
  ];
  const nearestLayer: THREE.BufferGeometry[] = [];
  for (const [z, width, depth, base, peaks, seed, rock, forest, treeLine, snowLine] of layers) {
    const geometry = ridgeGeometry({ z, width, depth, base, peaks, seed, relief: 0.45, crest: 0.5, segments: [280, 48] });
    const ridge = new THREE.Mesh(geometry, createTerrainMaterial({ key: `deep-layer-${seed}`, rock, forest, treeLine, snowLine, bump: 1 }));
    ridge.receiveShadow = true;
    ridge.name = `Ridge layer ${seed}`;
    scene.add(ridge);
    if (seed === 799) nearestLayer.push(geometry);
  }

  // A broad nearer saddle falls away under the terrace; irregular contours reveal the basin.
  const terrainHeight = (x: number, z: number) => {
    const shoulders = Math.pow(Math.min(1, Math.abs(x) / 49), 1.7) * 14;
    return -10 + shoulders + Math.sin(x * .13 + z * .04) * 1.6 + Math.sin(x * .048 - z * .09) * 2.2;
  };
  const groundGeometry = new THREE.PlaneGeometry(145, 110, 150, 120);
  groundGeometry.rotateX(-Math.PI / 2);
  const groundPositions = groundGeometry.attributes.position;
  for (let i = 0; i < groundPositions.count; i++) {
    const x = groundPositions.getX(i), z = groundPositions.getZ(i) - 42;
    groundPositions.setXYZ(i, x, terrainHeight(x, z), z);
  }
  groundGeometry.computeVertexNormals();
  groundGeometry.deleteAttribute('uv');
  const ground = new THREE.Mesh(groundGeometry, createGroundMaterial({ key: 'deep-valley', soil: '#2c3328', litter: '#3c3a2c', litterAmount: 0.3, grass: '#2f3b2c', grassAmount: 0.8, grassBias: 0.25, pebble: '#5c5f5c', pebbleAmount: 0.3, scale: 0.6 }));
  ground.receiveShadow = true;
  scene.add(ground);

  const houseLocations: Array<[number, number, number]> = [
    [-25, -36, .95], [-20, -42, .75], [-17, -40, 1.1], [13, -34, .9], [17, -43, 1.1], [25, -45, .7], [-5, -58, .75], [1, -62, 1.1], [36, -39, .8],
  ];
  // Mixed conifer forest on the valley flanks and the nearest ridge: groves and
  // clearings, several species and ages, so no crest reads as a comb.
  const np = nearestLayer[0].attributes.position as THREE.BufferAttribute, nn = nearestLayer[0].attributes.normal as THREE.BufferAttribute;
  const nearHouse = (x: number, z: number) => houseLocations.some(([hx, hz]) => Math.hypot(hx - x, hz - z) < 4.5);
  const forestShading = forestMaterial({ color: '#1b2520', tips: '#3d4b4c', key: 'deep-forest' });
  const flankTrees = scatterForest({
    seed: 5521, count: 820, grove: 16, openness: 0.42, height: [2.4, 8.5], mix: { pine: 0.05 },
    sample: (r) => {
      const side = r() < 0.5 ? -1 : 1;
      const x = side * (13 + Math.pow(r(), 0.7) * 52), z = -8 - r() * 72;
      return nearHouse(x, z) ? null : { x, y: terrainHeight(x, z), z };
    },
  });
  const ridgeTrees = scatterForest({
    seed: 811, count: 1050, grove: 22, openness: 0.5, height: [2.2, 6.8], mix: { pine: 0, snag: 0.05 },
    sample: (r) => {
      const i = Math.floor(r() * np.count);
      if (nn.getY(i) < 0.7 || np.getY(i) > 2) return null;
      return { x: np.getX(i) + (r() - 0.5) * 2.5, y: np.getY(i) - 0.25, z: np.getZ(i) + (r() - 0.5) * 2.5 };
    },
    // Thinner toward the crest, where wind and rock win.
    density: (_x, y) => 1 - THREE.MathUtils.smoothstep(y, -5, 2) * 0.75,
  });
  scene.add(buildForest(flankTrees, forestShading, 'Valley conifers', 7));
  scene.add(buildForest(ridgeTrees, forestShading, 'Ridge conifers', 7, 0.55));

  // Sparse, low-contrast buildings belong to the valley; a few windows glow warm (HDR, they bloom).
  const walls = stoneMaterial('#5d6266', { key: 'deep-house-walls', scale: 2.5, bump: 0.6, stainAmount: 0.15, cavity: 0.3, strata: 0.1, drips: 0.05 });
  const roofs = woodMaterial('#2d343c', 'deep-roofs', { axis: 'x', ring: 20, weathered: 0.5 });
  const windowColors = ['#ffb36b', '#ffc98d', '#ffa75a', '#d9c4a8'];
  const wallParts: THREE.BufferGeometry[] = [], roofParts: THREE.BufferGeometry[] = [];
  const windowGroups: THREE.Mesh[] = [];
  houseLocations.forEach(([x, z, originalScale], index) => {
    const scale = originalScale * .7;
    const placement = new THREE.Matrix4().compose(new THREE.Vector3(x, terrainHeight(x, z) + .45 * scale, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), (random() - .5) * .45), new THREE.Vector3(1, 1, 1));
    const body = new THREE.BoxGeometry(1.7 * scale, .9 * scale, 1.2 * scale);
    wallParts.push(body.applyMatrix4(placement));
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-1.02 * scale, .38 * scale); roofShape.lineTo(0, 1.03 * scale); roofShape.lineTo(1.02 * scale, .38 * scale); roofShape.closePath();
    const roof = new THREE.ExtrudeGeometry(roofShape, { depth: 1.45 * scale, bevelEnabled: false });
    roof.translate(0, 0, -.725 * scale);
    roof.deleteAttribute('uv');
    roofParts.push(roof.applyMatrix4(placement));
    if (index % 3 === 0) {
      const chimney = new THREE.BoxGeometry(.18 * scale, .37 * scale, .21 * scale);
      chimney.translate(.45 * scale, .88 * scale, -.2 * scale);
      wallParts.push(chimney.applyMatrix4(placement));
    }
    const lit = new THREE.MeshBasicMaterial({ color: new THREE.Color(windowColors[index % windowColors.length]).multiplyScalar(index % 4 === 1 ? 1.2 : 4.5) });
    for (let w = 0; w < (index % 3 === 0 ? 2 : 1); w++) {
      const pane = new THREE.PlaneGeometry(.19 * scale, .23 * scale);
      pane.translate((w - .35) * .58 * scale, -.06 * scale, .607 * scale);
      const windowMesh = new THREE.Mesh(pane.applyMatrix4(placement), lit);
      windowGroups.push(windowMesh);
      scene.add(windowMesh);
    }
  });
  for (const parts of [wallParts, roofParts]) for (const g of parts) { if (g.attributes.uv) g.deleteAttribute('uv'); }
  const houses = mesh(mergeGeometries(wallParts.map((g) => g.index ? g.toNonIndexed() : g)), walls);
  const houseRoofs = mesh(mergeGeometries(roofParts.map((g) => g.index ? g.toNonIndexed() : g)), roofs);
  wallParts.concat(roofParts).forEach((g) => g.dispose());
  houses.name = 'Valley houses'; houseRoofs.name = 'Valley roofs';
  scene.add(houses, houseRoofs);

  // Distant village lights on the lower slopes across the valley, seen through the mist.
  const villageParts: THREE.BufferGeometry[] = [];
  const villageRandom = seeded(4407);
  const villageCentres: THREE.Vector3[] = [];
  for (let attempt = 0; attempt < 6000 && villageCentres.length < 5; attempt++) {
    const i = Math.floor(villageRandom() * np.count);
    const p = new THREE.Vector3(np.getX(i), np.getY(i), np.getZ(i));
    if (nn.getY(i) < 0.86 || p.y > -6 || p.y < -11.5 || Math.abs(p.x) > 80) continue;
    if (villageCentres.some((c) => c.distanceTo(p) < 20)) continue;
    villageCentres.push(p);
  }
  for (const [index, centre] of villageCentres.entries()) {
    const count = [14, 9, 6, 4, 3][index] ?? 3;
    for (let k = 0, placed = 0; k < 600 && placed < count; k++) {
      const i = Math.floor(villageRandom() * np.count);
      const dx = np.getX(i) - centre.x, dz = np.getZ(i) - centre.z;
      if (Math.hypot(dx, dz) > 1.5 + count * 0.15 || nn.getY(i) < 0.75) continue;
      const g = new THREE.OctahedronGeometry(0.05 + villageRandom() * 0.04, 0);
      g.translate(np.getX(i), np.getY(i) + 0.3, np.getZ(i));
      const tint = new THREE.Color(windowColors[(index + k) % windowColors.length]).multiplyScalar(villageRandom() < 0.3 ? 4 : 10 + villageRandom() * 8);
      const colors = new Float32Array(g.attributes.position.count * 3);
      for (let v = 0; v < colors.length; v += 3) { colors[v] = tint.r; colors[v + 1] = tint.g; colors[v + 2] = tint.b; }
      g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      g.deleteAttribute('uv'); g.deleteAttribute('normal');
      villageParts.push(g);
      placed++;
    }
  }
  if (villageParts.length) {
    const village = new THREE.Mesh(mergeGeometries(villageParts), new THREE.MeshBasicMaterial({ vertexColors: true }));
    villageParts.forEach((g) => g.dispose());
    village.name = 'Village lights';
    scene.add(village);
  }

  // The lookout: laid paving behind a low rubble parapet with flat coping
  // stones, and a timber seat built against it where the lantern stands.
  const R = 6, CX = 0, CZ = 5;
  const A0 = Math.PI * 1.12, A1 = Math.PI * 1.88;
  const onArc = (angle: number, radius: number) => new THREE.Vector3(CX + Math.cos(angle) * radius, 0, CZ + Math.sin(angle) * radius);
  const yawAt = (angle: number) => -angle + Math.PI / 2;
  const masonry = stoneMaterial('#7a7b74', { key: 'deep-masonry', scale: 3.4, bump: 1.9, stain: '#5c4a36', stainAmount: 0.28, cavity: 0.7, strata: 0.35, drips: 0.18, dryRoughness: 0.88, moss: { color: '#4a5a31', amount: 0.55 } });
  const coping = stoneMaterial('#85857c', { key: 'deep-coping', scale: 2.6, bump: 1.4, stain: '#5f5040', stainAmount: 0.22, cavity: 0.55, strata: 0.15, drips: 0.1, dryRoughness: 0.84, moss: { color: '#55663a', amount: 0.75 } });
  const mortar = stoneMaterial('#5e5b54', { key: 'deep-mortar', scale: 9, bump: 0.6, stain: '#4a4036', stainAmount: 0.3, cavity: 0.35, strata: 0.0, drips: 0.25, dryRoughness: 0.95 });
  const paving = stoneMaterial('#7a7e78', { key: 'deep-paving', scale: 3.2, bump: 1.0, stain: '#6b5a44', stainAmount: 0.2, cavity: 0.5, strata: 0.15, drips: 0.0, dryRoughness: 0.8, moss: { color: '#3f4c2d', amount: 0.25 } });
  const plinthGeometry = new THREE.CylinderGeometry(R + 0.48, R + 1.2, 2.4, 96, 10, false);
  const pp = plinthGeometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pp.count; i++) {
    const x = pp.getX(i), y = pp.getY(i), z = pp.getZ(i);
    const r = Math.hypot(x, z);
    if (r < 1e-3 || y > 1.19) continue;
    const a = Math.atan2(z, x);
    const bulge = 1 + 0.035 * Math.sin(a * 7 + y * 2) + 0.03 * Math.sin(a * 23 - y * 5) + 0.02 * Math.sin(y * 9 + a * 3);
    pp.setX(i, x * bulge); pp.setZ(i, z * bulge);
  }
  plinthGeometry.computeVertexNormals();
  const plinth = mesh(plinthGeometry, masonry, [CX, -1.48, CZ]);
  plinth.castShadow = false;
  scene.add(plinth);
  const slabParts: THREE.BufferGeometry[] = [];
  function pavingStone(w: number, d: number) {
    const shape = new THREE.Shape();
    const cut = .025 + random() * .043;
    shape.moveTo(-w / 2 + cut, -d / 2); shape.lineTo(w / 2 - cut * .7, -d / 2); shape.lineTo(w / 2, -d / 2 + cut);
    shape.lineTo(w / 2, d / 2 - cut * 1.3); shape.lineTo(w / 2 - cut, d / 2); shape.lineTo(-w / 2 + cut * 1.2, d / 2);
    shape.lineTo(-w / 2, d / 2 - cut); shape.lineTo(-w / 2, -d / 2 + cut); shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: .05, bevelEnabled: true, bevelThickness: .012, bevelSize: .012, bevelSegments: 2, steps: 1 });
    geometry.rotateX(-Math.PI / 2);
    geometry.deleteAttribute('uv');
    return geometry;
  }
  const missingSlabs: THREE.Vector3[] = [];
  for (let z = -1.1; z < 4.6; z += .76) {
    for (let x = -4.6; x < 4.7; x += .86) {
      const px = x + (Math.round(z / .76) % 2) * .31 + (random() - .5) * .013;
      if (Math.hypot(px - CX, z - CZ) > R - 0.32) continue;
      // A few slabs have sunk or gone; grass grows in their place.
      if (random() < 0.035) { missingSlabs.push(new THREE.Vector3(px, -.2, z)); continue; }
      const g = pavingStone(.8 + random() * .03, .7 + random() * .03);
      const tilt = random() < 0.2 ? .035 : .012;
      g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(px, -.24 + random() * .014, z), new THREE.Quaternion().setFromEuler(new THREE.Euler((random() - .5) * tilt, (random() - .5) * .03, (random() - .5) * tilt)), new THREE.Vector3(1, 1, 1)));
      slabParts.push(g);
    }
  }
  const slabs = mesh(mergeGeometries(slabParts), paving);
  slabParts.forEach((g) => g.dispose());
  slabs.castShadow = false;
  slabs.name = 'Laid paving';
  scene.add(slabs);
  // Joints between the slabs: dark soil and moss slightly below the paving.
  const joints = mesh(new THREE.CircleGeometry(R - 0.05, 96), createGroundMaterial({ key: 'deep-joints', soil: '#262822', litter: '#3a3a2e', litterAmount: 0.3, grass: '#34432c', grassAmount: 0.7, grassBias: 0.2, pebbleAmount: 0.2, scale: 2 }), [CX, -.205, CZ], [-Math.PI / 2, 0, 0]);
  joints.castShadow = false;
  scene.add(joints);

  // Lime-mortar core of the parapet: the rubble face stones sit proud of it.
  const WALL_BASE = -0.22, WALL_TOP = 0.29;
  const coreShape = new THREE.Shape();
  const arcSteps = 72;
  for (let k = 0; k <= arcSteps; k++) { const p = onArc(THREE.MathUtils.lerp(A0, A1, k / arcSteps), R + 0.035); if (k) coreShape.lineTo(p.x, -p.z); else coreShape.moveTo(p.x, -p.z); }
  for (let k = arcSteps; k >= 0; k--) { const p = onArc(THREE.MathUtils.lerp(A0, A1, k / arcSteps), R + 0.4); coreShape.lineTo(p.x, -p.z); }
  const coreGeometry = new THREE.ExtrudeGeometry(coreShape, { depth: WALL_TOP - WALL_BASE, bevelEnabled: false, curveSegments: 1 });
  coreGeometry.rotateX(-Math.PI / 2);
  coreGeometry.translate(0, WALL_BASE, 0);
  coreGeometry.deleteAttribute('uv');
  const core = mesh(coreGeometry, mortar);
  core.name = 'Parapet mortar core';
  scene.add(core);

  // Rubble face: three rough courses of split stone, sizes and set varying, tight joints.
  const faceParts: THREE.BufferGeometry[] = [];
  const courses: Array<[number, number]> = [[WALL_BASE, 0.19], [WALL_BASE + 0.19, 0.17], [WALL_BASE + 0.36, 0.15]];
  courses.forEach(([base, height], c) => {
    let angle = A0 + random() * 0.05;
    let k = 0;
    while (angle < A1) {
      const length = 0.26 + random() * 0.36 + (c === 0 ? 0.1 : 0);
      const step = length / R;
      const mid = angle + step * 0.5;
      angle += step + 0.012 / R;
      k++;
      const h = height * (0.86 + random() * 0.12);
      const depth = 0.22 + random() * 0.1;
      const proud = 0.005 + random() * 0.04;
      const g = boulderGeometry(3100 + c * 211 + k * 7, 3, 9, 0.075, true);
      const centre = onArc(mid, R - proud + depth / 2);
      centre.y = base + height * 0.5 + (random() - 0.5) * 0.02;
      g.applyMatrix4(new THREE.Matrix4().compose(centre,
        new THREE.Quaternion().setFromEuler(new THREE.Euler((random() - .5) * .06, yawAt(mid) + (random() - .5) * .08, (random() - .5) * .07)),
        new THREE.Vector3(length / 2 - 0.009, h / 2 - 0.008, depth / 2)));
      faceParts.push(g);
    }
  });
  const face = mesh(mergeGeometries(faceParts), masonry);
  faceParts.forEach((g) => g.dispose());
  face.name = 'Rubble parapet';
  scene.add(face);
  // Flat coping slabs, slightly overhanging, chipped on their edges.
  const copingParts: THREE.BufferGeometry[] = [];
  for (let angle = A0, k = 0; angle < A1; k++) {
    const length = 0.55 + random() * 0.3;
    const step = length / (R + 0.2);
    const mid = angle + step * 0.5;
    angle += step + 0.014 / (R + 0.2);
    const thickness = 0.085 + random() * 0.02;
    const g = boulderGeometry(4700 + k * 13, 5, 10, 0.03, true);
    const centre = onArc(mid, R + 0.19);
    centre.y = WALL_TOP + thickness / 2 + 0.004;
    g.applyMatrix4(new THREE.Matrix4().compose(centre,
      new THREE.Quaternion().setFromEuler(new THREE.Euler((random() - .5) * .03, yawAt(mid) + (random() - .5) * .04, (random() - .5) * .025)),
      new THREE.Vector3(length / 2 - 0.006, thickness / 2, 0.27)));
    copingParts.push(g);
  }
  const copingMesh = mesh(mergeGeometries(copingParts), coping);
  copingParts.forEach((g) => g.dispose());
  copingMesh.name = 'Parapet coping';
  scene.add(copingMesh);

  // A timber seat built against the parapet on stone piers; the lantern stands on it.
  const seatFrom = 2 * Math.PI - Math.acos(-0.2 / (R - 0.24)), seatTo = 2 * Math.PI - Math.acos(2.35 / (R - 0.24));
  const pierAngles = [seatFrom + 0.012, (seatFrom + seatTo) / 2, seatTo - 0.012];
  const pierParts: THREE.BufferGeometry[] = [];
  pierAngles.forEach((angle, i) => {
    const g = boulderGeometry(5200 + i * 17, 4, 9, 0.06, true);
    const centre = onArc(angle, R - 0.2);
    centre.y = WALL_BASE + 0.15;
    g.applyMatrix4(new THREE.Matrix4().compose(centre, new THREE.Quaternion().setFromEuler(new THREE.Euler(0, yawAt(angle) + (random() - .5) * .1, 0)), new THREE.Vector3(0.15, 0.15, 0.19)));
    pierParts.push(g);
  });
  const piers = mesh(mergeGeometries(pierParts), masonry);
  pierParts.forEach((g) => g.dispose());
  piers.name = 'Seat piers';
  scene.add(piers);
  const seatWood = woodMaterial('#7d654c', 'deep-seat', { axis: 'x', ring: 26, weathered: 0.55, roughness: 0.82 });
  const iron = new THREE.MeshStandardMaterial({ color: '#3d4448', roughness: 0.6, metalness: 0.85 });
  const SEAT_TOP = WALL_BASE + 0.3 + 0.07;
  function plank(a: THREE.Vector3, b: THREE.Vector3, width: number, thickness: number) {
    const lengthAB = a.distanceTo(b);
    const shape = new THREE.Shape();
    const r = 0.03, w = lengthAB, d = width;
    shape.moveTo(-w / 2 + r, -d / 2); shape.lineTo(w / 2 - r, -d / 2); shape.quadraticCurveTo(w / 2, -d / 2, w / 2, -d / 2 + r);
    shape.lineTo(w / 2, d / 2 - r); shape.quadraticCurveTo(w / 2, d / 2, w / 2 - r, d / 2); shape.lineTo(-w / 2 + r, d / 2);
    shape.quadraticCurveTo(-w / 2, d / 2, -w / 2, d / 2 - r); shape.lineTo(-w / 2, -d / 2 + r); shape.quadraticCurveTo(-w / 2, -d / 2, -w / 2 + r, -d / 2);
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: true, bevelThickness: .008, bevelSize: .008, bevelSegments: 2, steps: 1, curveSegments: 4 });
    geometry.rotateX(-Math.PI / 2);
    const item = mesh(geometry, seatWood, [(a.x + b.x) / 2, SEAT_TOP - thickness, (a.z + b.z) / 2], [0, -Math.atan2(b.z - a.z, b.x - a.x), 0]);
    item.name = 'Seat plank';
    scene.add(item);
    // Hand-forged spikes hold it to the piers.
    for (const end of [a, b]) {
      const t = end.clone().lerp(a.clone().add(b).multiplyScalar(0.5), 0.07 / Math.max(lengthAB, 0.1));
      scene.add(mesh(new THREE.CylinderGeometry(.013, .015, .008, 10), iron, [t.x, SEAT_TOP + .002, t.z]));
    }
  }
  for (let i = 0; i < 2; i++) {
    const a = onArc(pierAngles[i] - (i === 0 ? 0.01 : 0), R - 0.22), b = onArc(pierAngles[i + 1] + (i === 1 ? 0.01 : 0), R - 0.22);
    plank(a, b, 0.36, 0.07);
  }

  const lampAngle = 2 * Math.PI - Math.acos(0.62 / (R - 0.22));
  const lampSpot = onArc(lampAngle, R - 0.22);
  const lamp = lantern([lampSpot.x, SEAT_TOP, lampSpot.z], .72);
  scene.add(lamp.group);
  // The lantern throws soft shadows of its own frame; the map renders only on layout changes.
  const lampLight = lamp.group.children.find((child): child is THREE.PointLight => child instanceof THREE.PointLight);
  if (lampLight) {
    lampLight.castShadow = true;
    lampLight.shadow.mapSize.set(512, 512);
    lampLight.shadow.radius = 5;
    lampLight.shadow.bias = -0.003;
    lampLight.shadow.normalBias = 0.02;
    lampLight.shadow.camera.near = 0.05;
    lampLight.shadow.camera.far = 6;
  }
  // Warm light returned by the seat and paving around the lamp.
  const lanternBounce = new THREE.PointLight('#f4b067', 0.55, 4.2, 2);
  lanternBounce.position.set(lampSpot.x - 0.05, SEAT_TOP + 0.12, lampSpot.z + 0.45);
  scene.add(lanternBounce);

  // Small alpine grass ribbons, rooted among the margins, respond only to a slow breeze.
  const bladePositions: number[] = [], bladeColors: number[] = [], bladeWeights: number[] = [], bladeIndices: number[] = [];
  const grassTints = ['#56685a', '#5f6e62', '#78806a', '#4b5c55'].map(c => new THREE.Color(c));
  function grassBlade(x: number, y: number, z: number, height: number, angle: number, tint: THREE.Color) {
    const start = bladePositions.length / 3;
    const width = .004 + random() * .005;
    const lean = .08 + random() * .13;
    for (let j = 0; j < 4; j++) {
      const q = j / 3;
      const bx = x + Math.cos(angle) * lean * q * q, bz = z + Math.sin(angle) * lean * q * q;
      for (const side of [-1, 1]) {
        bladePositions.push(bx + Math.sin(angle) * width * (1 - q * .92) * side, y + height * q, bz - Math.cos(angle) * width * (1 - q * .92) * side);
        bladeWeights.push(q * q);
        bladeColors.push(tint.r * (.62 + q * .45), tint.g * (.62 + q * .45), tint.b * (.62 + q * .45));
      }
      if (j < 3) { const a = start + j * 2; bladeIndices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
  }
  // Tufts along the foot of the parapet, in sunk slabs and joints, and a few on the coping.
  for (let i = 0; i < 520; i++) {
    const a = THREE.MathUtils.lerp(A0, A1, random());
    if (random() > 0.35 + 0.65 * Math.abs(Math.sin(a * 9.0 + 1.3))) continue;
    const p = onArc(a, R - 0.01 - Math.pow(random(), 1.6) * 0.3);
    const tint = grassTints[i % grassTints.length];
    for (let j = 0; j < 4; j++) grassBlade(p.x + (random() - .5) * .1, -.2, p.z + (random() - .5) * .1, .1 + random() * .3, random() * Math.PI * 2, tint);
  }
  for (const spot of missingSlabs) {
    for (let j = 0; j < 30; j++) grassBlade(spot.x + (random() - .5) * .6, -.205, spot.z + (random() - .5) * .5, .06 + random() * .16, random() * 6.28, grassTints[j % 4]);
  }
  for (let i = 0; i < 90; i++) {
    const x = (random() - .5) * 8, z = random() * 4.8;
    if (Math.hypot(x - CX, z - CZ) > R - 0.4) continue;
    for (let j = 0; j < 3; j++) grassBlade(x + (random() - .5) * .05, -.205, z + (random() - .5) * .05, .04 + random() * .1, random() * 6.28, grassTints[i % 4]);
  }
  for (let i = 0; i < 26; i++) {
    const p = onArc(THREE.MathUtils.lerp(A0, A1, random()), R + 0.05 + random() * 0.3);
    for (let j = 0; j < 5; j++) grassBlade(p.x + (random() - .5) * .06, WALL_TOP + 0.09, p.z + (random() - .5) * .06, .07 + random() * .16, random() * 6.28, grassTints[(i + j) % 4]);
  }
  const grassGeometry = new THREE.BufferGeometry();
  grassGeometry.setAttribute('position', new THREE.Float32BufferAttribute(bladePositions, 3));
  grassGeometry.setAttribute('color', new THREE.Float32BufferAttribute(bladeColors, 3));
  grassGeometry.setAttribute('nightWind', new THREE.Float32BufferAttribute(bladeWeights, 1));
  grassGeometry.setIndex(bladeIndices);
  grassGeometry.computeVertexNormals();
  const grassTime = { value: 0 };
  const grassMaterial = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .9, side: THREE.DoubleSide });
  grassMaterial.onBeforeCompile = shader => {
    shader.uniforms.nightTime = grassTime;
    shader.vertexShader = 'attribute float nightWind; uniform float nightTime;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader
      .replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed.x += sin(nightTime * 0.31 + position.x * 0.63 + position.z * 0.38) * nightWind * 0.024;\ntransformed.z += cos(nightTime * 0.23 + position.x * 0.37) * nightWind * 0.012;')
      .replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\nobjectNormal = normalize(objectNormal * 0.4 + vec3(0.0, 1.0, 0.0));');
  };
  grassMaterial.customProgramCacheKey = () => 'night-overlook-grass-v2';
  const grasses = new THREE.Mesh(grassGeometry, grassMaterial);
  grasses.receiveShadow = true;
  scene.add(grasses);

  // Two old spruces grow on rocky ledges below the lookout. Their crowns rise past
  // the parapet and frame the valley; the needle cards sway slowly and the moon
  // throws their shadow toward the terrace.
  const swayTime = { value: 0 };
  const LEDGE_Y = -1.6;
  const framingNeedles = addTreeSway(createFoliageMaterial(needleSprayTexture(41, '#26352a'), 'deep-framing-spruce'), swayTime, LEDGE_Y, 9, 'deep-framing');
  // The moon dominates the radiance probe: keep it from frosting the needle cards.
  framingNeedles.envMapIntensity = 0.35;
  framingNeedles.color.setScalar(0.6);
  const framingBark = addTreeSway(barkMaterial('#4a3f36', 'deep-framing-bark', { furrows: 6, lichen: 0.35 }), swayTime, LEDGE_Y, 9, 'deep-framing-bark');
  const framingWood: THREE.BufferGeometry[] = [], framingFoliage: THREE.BufferGeometry[] = [], ledgeParts: THREE.BufferGeometry[] = [];
  for (const [x, z, height, seed] of [[-5.7, -2.3, 9, 61], [6.3, -3.7, 8, 83]] as Array<[number, number, number, number]>) {
    const { wood, foliage } = coniferGeometry({ height, seed, spread: 0.22, clearTrunk: 0.1, lean: 0.07 });
    const placement = new THREE.Matrix4().compose(new THREE.Vector3(x, LEDGE_Y, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), seed * 1.37), new THREE.Vector3(1, 1, 1));
    wood.applyMatrix4(placement); foliage.applyMatrix4(placement);
    framingWood.push(wood); framingFoliage.push(foliage);
    for (let k = 0; k < 4; k++) {
      const g = boulderGeometry(7300 + seed + k, 4, 10, 0.12);
      g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x + (random() - .5) * 2.2, LEDGE_Y - 0.2, z + (random() - .5) * 2.2), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, random() * 6, 0)), new THREE.Vector3(0.8 + random() * 0.6, 0.5 + random() * 0.4, 0.7 + random() * 0.5)));
      ledgeParts.push(g);
    }
  }
  const framingTrunks = mesh(mergeGeometries(framingWood), framingBark);
  const framingCrowns = mesh(mergeGeometries(framingFoliage), framingNeedles);
  const ledges = mesh(mergeGeometries(ledgeParts), masonry);
  framingWood.concat(framingFoliage, ledgeParts).forEach((g) => g.dispose());
  framingTrunks.name = 'Framing spruce trunks'; framingCrowns.name = 'Framing spruce crowns'; ledges.name = 'Rock ledges';
  ledges.castShadow = false;
  scene.add(framingTrunks, framingCrowns, ledges);

  // Irregular brush on the flank: branching stems merged into one draw.
  const brushParts: THREE.BufferGeometry[] = [];
  const stem = (a: THREE.Vector3, b: THREE.Vector3, radius: number) => {
    const d = b.clone().sub(a);
    const g = new THREE.CylinderGeometry(radius * .6, radius, d.length(), 6, 1);
    g.applyMatrix4(new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(.5), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()), new THREE.Vector3(1, 1, 1)));
    g.deleteAttribute('uv');
    brushParts.push(g.toNonIndexed()); g.dispose();
  };
  for (let i = 0; i < 12; i++) {
    const side = i % 2 ? -1 : 1;
    const x = side * (7.0 + random() * 9), z = -3 - random() * 8;
    const trunkY = -4.2 + Math.abs(x) * .14;
    const h = 1.2 + random() * 1.5;
    const base = new THREE.Vector3(x, trunkY, z), tip = new THREE.Vector3(x + side * .2, trunkY + h, z);
    stem(base, tip, .027 + random() * .018);
    for (let j = 0; j < 6; j++) {
      const q = .35 + j * .10, angle = j * 2.4 + i;
      const a = new THREE.Vector3().lerpVectors(base, tip, q);
      const b = a.clone().add(new THREE.Vector3(Math.cos(angle) * .7 * (1.3 - q), .23, Math.sin(angle) * .65 * (1.3 - q)));
      stem(a, b, .014);
      stem(b, b.clone().add(new THREE.Vector3(.12, .22, -.1)), .006);
    }
  }
  const brush = mesh(mergeGeometries(brushParts), barkMaterial('#41463f', 'deep-brush', { furrows: 3, lichen: 0.3 }));
  brushParts.forEach((g) => g.dispose());
  scene.add(brush);

  const bounceGain = 1.6;
  lanternBounce.intensity = 0.7 * bounceGain;
  let bounceTarget = lanternBounce.intensity;
  let bounceChanged = false;
  let environment: THREE.WebGLRenderTarget | null = null;
  let volumeUniforms: Record<string, THREE.IUniform> | null = null;
  return {
    scene,
    view: aspect => {
      // A narrow screen stands a step closer; the lantern on the seat stays in both framings.
      const portrait = aspect < .8;
      return portrait
        ? { position: [.15, 1.39, 3.12], target: [.2, 1.68, -30], fov: 62 }
        : { position: [0, 1.38, 3.62], target: [.3, 1.69, -32], fov: 53 };
    },
    targets: [{ object: lamp.target, kind: 'lantern-brightness' }],
    interact: () => {
      const level = lamp.toggle();
      bounceTarget = level * bounceGain;
      bounceChanged = true;
      return level;
    },
    post: {
      exposure: 1.4, bloomStrength: 0.09, bloomThreshold: 0, aoStrength: 0.8, aoRadius: 0.5,
      saturation: 1.02, contrast: 1.08, shadowTint: [0.86, 0.96, 1.14], highlightTint: [1.08, 1.0, 0.9], vignette: 0.48, grain: 0.028,
    },
    prepare(renderer) {
      environment = bakeNightEnvironment(renderer, sky.dome, '#0b0e12');
      scene.environment = environment.texture;
      scene.environmentIntensity = 1.8;
    },
    createVolume() {
      const volume = createNightVolume({
        noise, moonDirection: moonDir, moon: new THREE.Color(0.055, 0.064, 0.086), ambient: new THREE.Color(0.012, 0.016, 0.026), phase: 0.4,
        fogDensity: 0.003, fogHeight: 13, fogBase: -12, maxDistance: 480,
        // Valley mist pools below the ridges and drifts slowly across the basin.
        mist: { y: -7, thickness: 4, density: 0.03, start: 18, tint: new THREE.Color(0.95, 1.0, 1.1), drift: new THREE.Vector2(0.0035, 0.0012), contrast: 1.6 },
        // Fog lying between the far ridges: their feet fade, their crests stand clear.
        upperMist: { y: 2, thickness: 3.5, density: 0.006, start: 95 },
        glow: { position: new THREE.Vector3(lampSpot.x, SEAT_TOP + 0.2, lampSpot.z), color: new THREE.Color(1.0, 0.62, 0.3), density: 0.0035 },
      });
      volumeUniforms = volume.uniforms;
      return volume;
    },
    setPostActive(active) { scene.fog = active ? null : fallbackFog; },
    update: (elapsed, dt) => {
      grassTime.value = elapsed;
      swayTime.value = elapsed;
      sky.update(elapsed);
      lamp.update(elapsed, dt);
      // Here the lantern is the only warm key: a stronger, wider pool than on a camp table.
      if (lampLight) lampLight.intensity *= 2.4;
      if (dt === 0 && bounceChanged) lanternBounce.intensity = bounceTarget;
      bounceChanged = false;
      lanternBounce.intensity += (bounceTarget - lanternBounce.intensity) * (1 - Math.exp(-Math.max(0, dt) * 2.4));
      if (volumeUniforms) volumeUniforms.uFlicker.value = lanternBounce.intensity / bounceGain + 0.2;
    },
    dispose() { environment?.dispose(); environment = null; },
  };
}
