import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldRecipe } from './worldTypes';
import { seeded, mesh, beam, lantern, stoneMaterial, woodMaterial, barkMaterial } from './scenery';
import { createNoiseVolume } from '../shared/render/fireFlame';
import { bakeNightEnvironment, createNightSky } from '../shared/render/skyNight';
import { createNightVolume } from './atmosphere';
import { boulderGeometry, createGroundMaterial, createTerrainMaterial, distantSpruceGeometry, ridgeGeometry } from './landscape';

const direction = (azimuthDegrees: number, elevationDegrees: number) => {
  const a = THREE.MathUtils.degToRad(azimuthDegrees), e = THREE.MathUtils.degToRad(elevationDegrees);
  return new THREE.Vector3(Math.sin(a) * Math.cos(e), Math.sin(e), -Math.cos(a) * Math.cos(e));
};

/** Original hilltop overlook: moonlit ridge layers over a misty valley, a worn bench and a stone terrace. */
export function buildDeepNightWorld(): WorldRecipe {
  const scene = new THREE.Scene();
  scene.name = 'Hilltop overlook — deep night';
  const fallbackFog = new THREE.FogExp2('#18233a', 0.0042);
  scene.fog = fallbackFog;
  const random = seeded(19812);
  const noise = createNoiseVolume(48, 11);

  // A waxing gibbous moon over the far ranges: it backlights the layers and washes out most stars.
  const moonDir = direction(27, 19);
  const sky = createNightSky({
    noise, zenith: '#0a1430', horizon: '#3a4a68', brightness: 0.07,
    glow: { color: '#5a6c8c', direction: moonDir, intensity: 0.1, width: 3, height: 0.16 },
    airglow: 0.015,
    moon: { direction: moonDir, intensity: 42, radius: 0.0135, halo: 2.2, color: '#fff3df', sunDirection: direction(27 + 150, -12) },
    galaxy: { pole: new THREE.Vector3().crossVectors(direction(-70, 8), direction(10, 80)).normalize(), centre: direction(-70, 8), intensity: 0.025 },
    stars: { count: 3200, seed: 713, intensity: 0.95, galacticFraction: 0.3 },
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
  // Spruce on the valley flanks and the nearest layer, instanced and tiny with distance.
  const spruce = distantSpruceGeometry();
  const placements: THREE.Matrix4[] = [];
  const forestRandom = seeded(5521);
  for (let k = 0; k < 700; k++) {
    const side = forestRandom() < 0.5 ? -1 : 1;
    const x = side * (16 + Math.pow(forestRandom(), 0.7) * 48), z = -10 - forestRandom() * 66;
    const y = terrainHeight(x, z);
    if (houseLocations.some(([hx, hz]) => Math.hypot(hx - x, hz - z) < 5)) continue;
    const h = 2.2 + Math.pow(forestRandom(), 1.5) * 6;
    placements.push(new THREE.Matrix4().compose(new THREE.Vector3(x, y - 0.2, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, forestRandom() * 6.28, 0)), new THREE.Vector3(h * 0.3, h, h * 0.3)));
  }
  const np = nearestLayer[0].attributes.position as THREE.BufferAttribute, nn = nearestLayer[0].attributes.normal as THREE.BufferAttribute;
  for (let attempt = 0; attempt < 20000 && placements.length < 1800; attempt++) {
    const i = Math.floor(forestRandom() * np.count);
    if (nn.getY(i) < 0.75 || np.getY(i) > -2) continue;
    const h = 3 + forestRandom() * 3;
    placements.push(new THREE.Matrix4().compose(new THREE.Vector3(np.getX(i), np.getY(i) - 0.3, np.getZ(i)), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, forestRandom() * 6.28, 0)), new THREE.Vector3(h * 0.3, h, h * 0.3)));
  }
  const forest = new THREE.InstancedMesh(spruce, new THREE.MeshStandardMaterial({ color: '#18211c', roughness: 0.95, side: THREE.DoubleSide }), placements.length);
  placements.forEach((m, i) => forest.setMatrixAt(i, m));
  forest.receiveShadow = true;
  forest.name = 'Valley spruce';
  scene.add(forest);

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

  // The overlook: a rough stone plinth, laid paving and a broken parapet.
  const masonry = stoneMaterial('#6d7270', { key: 'deep-masonry', scale: 3, bump: 1.7, stain: '#5c4a36', stainAmount: 0.2, cavity: 0.62, strata: 0.3, drips: 0.12, dryRoughness: 0.86, moss: { color: '#46552f', amount: 0.6 } });
  const paving = stoneMaterial('#767c78', { key: 'deep-paving', scale: 3.2, bump: 0.9, stain: '#6b5a44', stainAmount: 0.18, cavity: 0.5, strata: 0.15, drips: 0.0, dryRoughness: 0.8, moss: { color: '#3f4c2d', amount: 0.18 } });
  const plinthGeometry = new THREE.CylinderGeometry(7.7, 8.6, 2.4, 96, 10, false);
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
  const plinth = mesh(plinthGeometry, masonry, [0, -1.48, 3.0]);
  plinth.castShadow = false;
  scene.add(plinth);
  const slabParts: THREE.BufferGeometry[] = [];
  function pavingStone(w: number, d: number) {
    const shape = new THREE.Shape();
    const cut = .025 + random() * .043;
    shape.moveTo(-w / 2 + cut, -d / 2); shape.lineTo(w / 2 - cut * .7, -d / 2); shape.lineTo(w / 2, -d / 2 + cut);
    shape.lineTo(w / 2, d / 2 - cut * 1.3); shape.lineTo(w / 2 - cut, d / 2); shape.lineTo(-w / 2 + cut * 1.2, d / 2);
    shape.lineTo(-w / 2, d / 2 - cut); shape.lineTo(-w / 2, -d / 2 + cut); shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: .05, bevelEnabled: true, bevelThickness: .012, bevelSize: .012, bevelSegments: 3, steps: 1 });
    geometry.rotateX(-Math.PI / 2);
    geometry.deleteAttribute('uv');
    return geometry;
  }
  for (let z = -1.9; z < 8; z += .76) {
    for (let x = -6.3; x < 6.5; x += .86) {
      const px = x + (Math.round(z / .76) % 2) * .31 + (random() - .5) * .013;
      if (px * px + (z - 3) * (z - 3) > 50) continue;
      const g = pavingStone(.8 + random() * .03, .7 + random() * .03);
      g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(px, -.24 + random() * .012, z), new THREE.Quaternion().setFromEuler(new THREE.Euler((random() - .5) * .012, (random() - .5) * .03, (random() - .5) * .012)), new THREE.Vector3(1, 1, 1)));
      slabParts.push(g);
    }
  }
  const slabs = mesh(mergeGeometries(slabParts), paving);
  slabParts.forEach((g) => g.dispose());
  slabs.castShadow = false;
  slabs.name = 'Laid paving';
  scene.add(slabs);
  // Joints between the slabs: dark soil and moss slightly below the paving.
  const joints = mesh(new THREE.CircleGeometry(7.65, 64), createGroundMaterial({ key: 'deep-joints', soil: '#232621', litter: '#3a3a2e', litterAmount: 0.3, grass: '#34432c', grassAmount: 0.7, grassBias: 0.2, pebbleAmount: 0.2, scale: 2 }), [0, -.205, 3], [-Math.PI / 2, 0, 0]);
  joints.castShadow = false;
  scene.add(joints);
  // A low dry-stone wall in two courses, with a few fallen gaps.
  const parapetParts: THREE.BufferGeometry[] = [];
  const course = (angleFrom: number, angleTo: number, baseY: number, height: [number, number], length: [number, number], depth: [number, number], seed: number, gaps: number) => {
    let angle = angleFrom;
    let k = 0;
    while (angle < angleTo) {
      const l = length[0] + random() * (length[1] - length[0]);
      const step = l / 5.8;
      const mid = angle + step * .5;
      angle += step * (1.02 + random() * .05);
      k++;
      if (random() < gaps) continue;
      const h = height[0] + random() * (height[1] - height[0]);
      const g = boulderGeometry(seed + k * 13, 10, 5, 0.07, true);
      const x = Math.cos(mid) * 6.15, z = 3 + Math.sin(mid) * 5.35;
      g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, baseY + h * .5, z),
        new THREE.Quaternion().setFromEuler(new THREE.Euler((random() - .5) * .08, -mid + Math.PI / 2 + (random() - .5) * .12, (random() - .5) * .1)),
        new THREE.Vector3(l * .5, h * .5, (depth[0] + random() * (depth[1] - depth[0])) * .5)));
      parapetParts.push(g);
    }
  };
  course(Math.PI * 1.06, Math.PI * 1.94, -.22, [.24, .32], [.5, .78], [.42, .55], 913, .02);
  course(Math.PI * 1.08, Math.PI * 1.92, .07, [.14, .22], [.36, .6], [.32, .44], 1913, .16);
  for (let i = 0; i < 25; i++) {
    const side = i % 2 ? 1 : -1;
    const g = boulderGeometry(530 + i, 5);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(side * (4.8 + random() * 2.8), -.12 + random() * .09, -2.8 + random() * 7), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, random() * 6, 0)), new THREE.Vector3(.14 + random() * .3, .08 + random() * .1, .15 + random() * .24)));
    parapetParts.push(g);
  }
  const parapet = mesh(mergeGeometries(parapetParts), masonry);
  parapetParts.forEach((g) => g.dispose());
  parapet.name = 'Broken parapet';
  scene.add(parapet);

  // Worn timber armrests in first person: edged boards, iron supports and bolts.
  const wood = woodMaterial('#6f5a47', 'deep-bench', { axis: 'z', ring: 34, weathered: 0.45, roughness: 0.86 });
  const darkWood = woodMaterial('#3b342d', 'deep-bench-dark', { axis: 'z', ring: 30, weathered: 0.2 });
  const iron = new THREE.MeshStandardMaterial({ color: '#3d4448', roughness: 0.6, metalness: 0.85 });
  const bench = new THREE.Group();
  function board(w: number, d: number, h: number, x: number, y: number, z: number, mat = wood) {
    const shape = new THREE.Shape();
    const r = Math.min(.055, w / 5, d / 5);
    shape.moveTo(-w / 2 + r, -d / 2); shape.lineTo(w / 2 - r, -d / 2); shape.quadraticCurveTo(w / 2, -d / 2, w / 2, -d / 2 + r);
    shape.lineTo(w / 2, d / 2 - r); shape.quadraticCurveTo(w / 2, d / 2, w / 2 - r, d / 2); shape.lineTo(-w / 2 + r, d / 2);
    shape.quadraticCurveTo(-w / 2, d / 2, -w / 2, d / 2 - r); shape.lineTo(-w / 2, -d / 2 + r); shape.quadraticCurveTo(-w / 2, -d / 2, -w / 2 + r, -d / 2);
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: true, bevelThickness: .009, bevelSize: .009, bevelSegments: 3, steps: 1, curveSegments: 6 });
    geometry.rotateX(-Math.PI / 2);
    const item = mesh(geometry, mat, [x, y, z]);
    bench.add(item);
    return item;
  }
  for (const side of [-1, 1]) {
    board(.23, 2.15, .095, side * .64, .79, 3.01);
    bench.add(beam(new THREE.Vector3(side * .64, -.12, 2.25), new THREE.Vector3(side * .64, .77, 2.25), .045, iron));
    bench.add(beam(new THREE.Vector3(side * .64, -.12, 3.9), new THREE.Vector3(side * .64, .77, 3.9), .045, iron));
    board(.08, 1.68, .09, side * .64, .03, 3.05, darkWood);
    for (const z of [2.09, 3.94]) bench.add(mesh(new THREE.CylinderGeometry(.019, .021, .01, 16), iron, [side * .64, .894, z]));
  }
  const seatWood = woodMaterial('#6f5a47', 'deep-bench-seat', { axis: 'x', ring: 34, weathered: 0.45, roughness: 0.86 });
  for (let i = 0; i < 4; i++) board(1.74, .18, .065, 0, .16, 3.73 + i * .195, seatWood);
  scene.add(bench);

  // A short reclaimed stone shelf places the lantern within reach and the portrait composition.
  const shelfGeometry = boulderGeometry(435, 16, 12, 0.13);
  const shelf = mesh(shelfGeometry, masonry, [.93, .02, .35]);
  shelf.scale.set(.62, .3, .45);
  scene.add(shelf);
  const lamp = lantern([.93, .32, .35], .72);
  scene.add(lamp.group);
  const lanternBounce = new THREE.PointLight('#f4b067', 1.0, 3.8, 2);
  lanternBounce.position.set(.93, .62, .35);
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
  for (let i = 0; i < 900; i++) {
    const a = Math.PI * (1.02 + random() * .95);
    const radius = 5.2 + random() * 1.6;
    const x = Math.cos(a) * radius, z = 3 + Math.sin(a) * radius * .86;
    const tint = grassTints[i % grassTints.length];
    for (let j = 0; j < 4; j++) grassBlade(x + random() * .11, -.16, z + random() * .11, .13 + random() * .29, random() * Math.PI * 2, tint);
  }
  for (let i = 0; i < 70; i++) {
    const x = 1.64 + random() * .44, z = -.25 + random() * 1.25;
    for (let j = 0; j < 3; j++) grassBlade(x, -.2, z, .11 + random() * .2, random() * 6.28, grassTints[i % 4]);
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

  let bounceTarget = lanternBounce.intensity;
  let bounceChanged = false;
  let environment: THREE.WebGLRenderTarget | null = null;
  let volumeUniforms: Record<string, THREE.IUniform> | null = null;
  return {
    scene,
    view: aspect => {
      // Step the narrow view forward so the near armrest cannot hide the lamp.
      // Restore all three objects on widening; the desktop/Fold layout is fixed.
      const portrait = aspect < .8;
      const lampX = portrait ? .65 : .93;
      shelf.position.x = lampX;
      lamp.group.position.x = lampX;
      lanternBounce.position.x = lampX;
      if (volumeUniforms) volumeUniforms.uGlowPos.value.set(lampX, .6, .35);
      return portrait
        ? { position: [.15, 1.39, 3.12], target: [.2, 2.4, -30], fov: 62 }
        : { position: [0, 1.38, 3.62], target: [.3, 2.6, -32], fov: 53 };
    },
    targets: [{ object: lamp.target, kind: 'lantern-brightness' }],
    interact: () => {
      const level = lamp.toggle();
      bounceTarget = level * 1.45;
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
      scene.environmentIntensity = 1.0;
    },
    createVolume() {
      const volume = createNightVolume({
        noise, moonDirection: moonDir, moon: new THREE.Color(0.075, 0.085, 0.11), ambient: new THREE.Color(0.012, 0.016, 0.026),
        fogDensity: 0.0042, fogHeight: 22, fogBase: -10, maxDistance: 480,
        mist: { y: -7.5, thickness: 4.5, density: 0.022, start: 18, tint: new THREE.Color(0.95, 1.0, 1.1) },
        glow: { position: new THREE.Vector3(lamp.group.position.x, .6, .35), color: new THREE.Color(1.0, 0.62, 0.3), density: 0.0035 },
      });
      volumeUniforms = volume.uniforms;
      return volume;
    },
    setPostActive(active) { scene.fog = active ? null : fallbackFog; },
    update: (elapsed, dt) => {
      grassTime.value = elapsed;
      sky.update(elapsed);
      lamp.update(elapsed, dt);
      if (dt === 0 && bounceChanged) lanternBounce.intensity = bounceTarget;
      bounceChanged = false;
      lanternBounce.intensity += (bounceTarget - lanternBounce.intensity) * (1 - Math.exp(-Math.max(0, dt) * 2.4));
      if (volumeUniforms) volumeUniforms.uFlicker.value = lanternBounce.intensity / 1.45 + 0.2;
    },
    dispose() { environment?.dispose(); environment = null; },
  };
}
