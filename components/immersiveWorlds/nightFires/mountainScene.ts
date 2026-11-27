import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldRecipe } from './worldTypes';
import { seeded, mesh, fire, stoneMaterial, barkMaterial, woodMaterial } from './scenery';
import { createNoiseVolume, createHeatShimmer, applyHeatShimmer, fireFlicker } from '../shared/render/fireFlame';
import { bakeNightEnvironment, createNightSky } from '../shared/render/skyNight';
import { createNightVolume } from './atmosphere';
import { boulderGeometry, coniferGeometry, createFoliageMaterial, createGroundMaterial, createTerrainMaterial, distantSpruceGeometry, needleSprayTexture, ridgeGeometry } from './landscape';

const direction = (azimuthDegrees: number, elevationDegrees: number) => {
  const a = THREE.MathUtils.degToRad(azimuthDegrees), e = THREE.MathUtils.degToRad(elevationDegrees);
  return new THREE.Vector3(Math.sin(a) * Math.cos(e), Math.sin(e), -Math.cos(a) * Math.cos(e));
};

/** Original mountain clearing, deliberately without lakeside camping equipment. */
export function buildMountainWorld(): WorldRecipe {
  const scene = new THREE.Scene();
  scene.name = 'Mountain clearing — night fire';
  // Direct (non-HDR) fallback keeps a simple fog; the volume pass replaces it.
  const fallbackFog = new THREE.FogExp2(0x0b1626, 0.008);
  scene.fog = fallbackFog;
  scene.userData.exposure = 1.25;
  const random = seeded(194031);
  const noise = createNoiseVolume(48, 7);
  const firePosition: [number, number, number] = [0, -0.005, 0.65];
  const shimmer = createHeatShimmer(new THREE.Vector3(firePosition[0], 0.9, firePosition[2]), 0.42, 2.6, 0.0022);

  // A thin crescent low in the west: enough light to model the ridges, dark enough for the Milky Way.
  const moonDir = direction(-62, 19);
  const sky = createNightSky({
    noise, zenith: '#0c1a38', horizon: '#33506a', brightness: 0.075,
    glow: { color: '#3b5878', direction: moonDir, intensity: 0.05, width: 2.2, height: 0.2 },
    airglow: 0.02,
    moon: { direction: moonDir, intensity: 34, radius: 0.0125, halo: 1.2, color: '#fff1d6', sunDirection: direction(-90, -14) },
    galaxy: { pole: new THREE.Vector3().crossVectors(direction(24, 12), direction(-50, 70)).normalize(), centre: direction(24, 12), intensity: 0.075 },
    stars: { count: 6500, seed: 7261, intensity: 1.8, galacticFraction: 0.45 },
    heat: shimmer,
  });
  scene.add(sky.group);

  // One cool, motivated key from the moon; the fire is the warm key nearby.
  const moonlight = new THREE.DirectionalLight(0x9fb8de, 1.15);
  moonlight.position.copy(moonDir).multiplyScalar(60);
  moonlight.castShadow = true;
  moonlight.shadow.mapSize.set(2048, 2048);
  Object.assign(moonlight.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 140 });
  moonlight.shadow.normalBias = 0.04;
  moonlight.shadow.bias = -0.0002;
  moonlight.shadow.radius = 3;
  moonlight.target.position.set(0, 0, -2);
  scene.add(moonlight, moonlight.target);

  // Shallow undulations continue beyond the clearing; no floating circular platform.
  function groundHeight(x: number, z: number) {
    const clearing = Math.exp(-(x * x / 15 + (z - 0.7) * (z - 0.7) / 19));
    const ripples = Math.sin(x * 0.43 + z * 0.25) * 0.14 + Math.cos(z * 0.48 - x * 0.19) * 0.11;
    const slopes = Math.max(0, -z - 8) * 0.037 + Math.pow(Math.max(0, Math.abs(x) - 5), 1.1) * 0.052;
    const soil = (Math.sin(x * 2.61 + z * 1.32) * Math.cos(z * 1.71 - x * 1.21) * 0.023 + Math.sin(x * 4.2 - z * 3.6) * 0.009) * (1 - clearing * 0.7);
    return ripples * (1 - clearing) + slopes + soil - 0.04;
  }
  const groundGeo = new THREE.PlaneGeometry(110, 110, 150, 150);
  groundGeo.rotateX(-Math.PI / 2);
  groundGeo.translate(0, 0, -30);
  const groundPos = groundGeo.attributes.position;
  for (let i = 0; i < groundPos.count; i++) groundPos.setY(i, groundHeight(groundPos.getX(i), groundPos.getZ(i)));
  groundGeo.computeVertexNormals();
  groundGeo.deleteAttribute('uv');
  const earth = createGroundMaterial({
    key: 'mountain-clearing', soil: '#4a3f33', litter: '#6e5a40', litterAmount: 0.75, grass: '#4a5134', grassAmount: 0.55, grassBias: -0.1,
    pebble: '#7d7a74', pebbleAmount: 0.5, hearth: { centre: new THREE.Vector3(...firePosition), radius: 1.05 },
  });
  const terrain = new THREE.Mesh(groundGeo, earth);
  terrain.name = 'Continuous rough pine-litter clearing';
  terrain.receiveShadow = true;
  scene.add(terrain);

  // Layered, eroded ranges: forested lower slopes, rock crests, snow on the far peaks.
  const ranges: Array<{ geometry: THREE.BufferGeometry; mesh: THREE.Mesh }> = [];
  function range(z: number, width: number, depth: number, peaks: Array<[number, number, number]>, seed: number, rock: string, forest: string, treeLine: number, snowLine: number, crest = 0.45) {
    const geometry = ridgeGeometry({ z, width, depth, base: -1.7, peaks, seed, relief: 0.42, crest, segments: [260, 52] });
    const material = applyHeatShimmer(createTerrainMaterial({ key: `mountain-range-${seed}`, rock, forest, treeLine, snowLine, bump: 1 }), shimmer, `range-${seed}`);
    const ridge = new THREE.Mesh(geometry, material);
    ridge.receiveShadow = true;
    ridge.name = `Mountain range ${seed}`;
    scene.add(ridge);
    ranges.push({ geometry, mesh: ridge });
    return geometry;
  }
  range(-122, 330, 70, [[-105, 30, 30], [-48, 40, 22], [6, 28, 34], [58, 44, 24], [118, 30, 40]], 53, '#7a818c', '#26302f', 18, 24, 0.55);
  range(-84, 250, 56, [[-82, 20, 30], [-22, 21, 26], [34, 13, 20], [74, 25, 28]], 91, '#656b72', '#1f2a27', 15, 21, 0.5);
  const nearRange = range(-50, 190, 40, [[-58, 8, 26], [4, 3.5, 22], [52, 9, 24]], 123, '#4f5450', '#1c2622', 30, 99, 0.42);

  // Distant spruce forest on the near range's lower slopes, instanced.
  const spruce = distantSpruceGeometry();
  const spruceMaterial = applyHeatShimmer(new THREE.MeshStandardMaterial({ color: '#1d2a24', roughness: 0.95, side: THREE.DoubleSide }), shimmer, 'distant-spruce');
  const placements: THREE.Matrix4[] = [];
  const np = nearRange.attributes.position as THREE.BufferAttribute, nn = nearRange.attributes.normal as THREE.BufferAttribute;
  const forestRandom = seeded(4410);
  for (let attempt = 0; attempt < 30000 && placements.length < 1800; attempt++) {
    const i = Math.floor(forestRandom() * np.count);
    const y = np.getY(i);
    if (nn.getY(i) < 0.72 || y > 3.2 || y < -1.2) continue;
    const h = 2.6 + forestRandom() * 3;
    placements.push(new THREE.Matrix4().compose(
      new THREE.Vector3(np.getX(i) + (forestRandom() - 0.5) * 1.5, y - 0.3, np.getZ(i) + (forestRandom() - 0.5) * 1.5),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, forestRandom() * 6.28, (forestRandom() - 0.5) * 0.08)),
      new THREE.Vector3(h * (0.32 + forestRandom() * 0.1), h, h * (0.32 + forestRandom() * 0.1)),
    ));
  }
  const forest = new THREE.InstancedMesh(spruce, spruceMaterial, placements.length);
  placements.forEach((matrix, i) => forest.setMatrixAt(i, matrix));
  forest.name = 'Distant spruce forest';
  forest.receiveShadow = true;
  scene.add(forest);

  // Framing conifers: furrowed trunks and needle cards, merged per material.
  const spray = needleSprayTexture(31, '#3a5236');
  const foliageMaterial = createFoliageMaterial(spray, 'mountain-spruce');
  const trunkMaterial = barkMaterial('#5a4a3c', 'mountain-spruce-bark', { furrows: 6, lichen: 0.25 });
  const treePlacements: Array<[number, number, number, number]> = [
    [-5.4, -4.2, 13.5, 50], [6.5, -8.5, 15.5, 77], [-10.3, -14, 15.1, 90],
    [12.8, -20.8, 16.3, 116], [-15.7, -23, 14.7, 149], [-7.8, -24.3, 11.1, 159],
    [18.5, -31.7, 14.0, 190], [-21.5, -33.0, 15.4, 221], [9.9, -32.6, 10.0, 259],
    // Stands that close the clearing at the sides; the valley view stays open.
    [-17.5, -11, 17, 301], [-23, -17, 19, 307], [-27, -9, 16, 311], [-19, -28, 15, 317], [-29, -24, 18, 331],
    [16.5, -14, 16, 337], [22, -10, 18, 347], [26, -22, 19, 353], [21, -36, 14, 359], [30, -30, 17, 367],
    [-13, -38, 12, 373], [14, -44, 11, 379],
  ];
  const woodParts: THREE.BufferGeometry[] = [], needleParts: THREE.BufferGeometry[] = [];
  for (const [x, z, height, seed] of treePlacements) {
    const { wood, foliage } = coniferGeometry({ height, seed, spread: 0.2 + (seed % 5) * 0.01, clearTrunk: 0.16 + (seed % 3) * 0.03 });
    const matrix = new THREE.Matrix4().compose(new THREE.Vector3(x, groundHeight(x, z), z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), seed * 1.37), new THREE.Vector3(1, 1, 1));
    wood.applyMatrix4(matrix); foliage.applyMatrix4(matrix);
    woodParts.push(wood); needleParts.push(foliage);
  }
  const trunks = mesh(mergeGeometries(woodParts), trunkMaterial);
  const crowns = mesh(mergeGeometries(needleParts), foliageMaterial);
  woodParts.concat(needleParts).forEach((g) => g.dispose());
  trunks.name = 'Spruce trunks'; crowns.name = 'Spruce crowns';
  scene.add(trunks, crowns);

  // Broken foreground bedrock crops the image naturally and catches the fire and rim light.
  const granite = stoneMaterial('#827d76', { key: 'mountain-granite', scale: 2.6, bump: 1.7, stain: '#5b4632', stainAmount: 0.25, cavity: 0.7, strata: 0.3, drips: 0.05, dryRoughness: 0.85, moss: { color: '#6f765a', amount: 0.7 } });
  const boulderParts: THREE.BufferGeometry[] = [];
  const stones: Array<[number, number, number, number, number, number, number]> = [
    [-1.55, 2.75, 0.83, 0.45, 0.79, -0.14, 701],
    [1.65, 2.6, 0.77, 0.40, 0.89, -0.12, 704],
    [-3.7, -0.9, 1.75, 0.86, 1.1, -0.22, 721],
    [3.2, -2.5, 1.38, 0.62, 1.20, -0.18, 738],
    [-4.8, -6.2, 1.12, 0.42, 0.70, -0.12, 764],
    [5.4, -12.2, 1.70, 0.90, 1.25, -0.3, 789],
  ];
  for (const [x, z, sx, sy, sz, sunk, salt] of stones) {
    const g = boulderGeometry(salt, 22, 11, 0.12);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, groundHeight(x, z) + sy * 0.62 + sunk, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0.04, salt * 0.071, 0.03)), new THREE.Vector3(sx, sy, sz)));
    boulderParts.push(g);
  }
  // Finer gravel creates contact and believable changes of scale around the fire.
  for (let i = 0; i < 44; i++) {
    const angle = random() * Math.PI * 2;
    const radius = 1.4 + random() * 4.6;
    const x = Math.cos(angle) * radius;
    const z = 0.7 + Math.sin(angle) * radius;
    const s = 0.03 + Math.pow(random(), 2) * 0.13;
    const g = boulderGeometry(900 + i, 3);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, groundHeight(x, z) + s * 0.3, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(random() * 0.4, random() * 6, random() * 0.4)), new THREE.Vector3(s * 1.4, s * 0.6, s)));
    boulderParts.push(g);
  }
  const boulders = mesh(mergeGeometries(boulderParts), granite);
  boulderParts.forEach((g) => g.dispose());
  boulders.name = 'Granite boulders and gravel';
  scene.add(boulders);

  // A naturally fallen trunk off the central sightline, with weathered end grain.
  const logA = new THREE.Vector3(-4.0, groundHeight(-4.0, -3.3) + 0.25, -3.3);
  const logB = new THREE.Vector3(-1.9, groundHeight(-1.9, -5.3) + 0.25, -5.3);
  const logLength = logA.distanceTo(logB);
  const logGeometry = new THREE.CylinderGeometry(0.2, 0.23, logLength, 36, 12, false);
  const lp = logGeometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < lp.count; i++) {
    const y = lp.getY(i), x = lp.getX(i), z = lp.getZ(i);
    const r = Math.hypot(x, z);
    if (r < 1e-4) continue;
    const bulge = 1 + 0.05 * Math.sin(y * 2.1 + 1) + 0.03 * Math.sin(Math.atan2(z, x) * 3 + y);
    lp.setX(i, x * bulge); lp.setZ(i, z * bulge);
  }
  logGeometry.computeVertexNormals();
  const fallenLog = mesh(logGeometry, barkMaterial('#4f4134', 'mountain-fallen-log', { furrows: 7, lichen: 0.45 }));
  fallenLog.position.copy(logA).add(logB).multiplyScalar(0.5);
  fallenLog.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), logB.clone().sub(logA).normalize());
  fallenLog.name = 'Fallen spruce trunk';
  scene.add(fallenLog);
  const endGrain = mesh(new THREE.CircleGeometry(0.205, 40), woodMaterial('#8c7457', 'mountain-log-end', { axis: 'z', ring: 46, weathered: 0.5 }));
  endGrain.position.copy(logA).addScaledVector(logA.clone().sub(logB).normalize(), 0.004);
  endGrain.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), logA.clone().sub(logB).normalize());
  scene.add(endGrain);

  // Ground litter is one spatial mesh, fine enough to read as needles, not giant grass.
  const litterPositions: number[] = [], litterColors: number[] = [];
  const needleColors = [new THREE.Color(0x6d5a3e), new THREE.Color(0x58492f), new THREE.Color(0x857a60), new THREE.Color(0x3a4436)];
  for (let i = 0; i < 9000; i++) {
    const x = (random() - 0.5) * 18;
    const z = random() * 17 - 10;
    if (x * x + (z - 0.7) ** 2 < 1.6) continue;
    const angle = random() * Math.PI * 2, length = 0.05 + random() * 0.1;
    const y = groundHeight(x, z) + 0.012;
    const dx = Math.cos(angle) * length, dz = Math.sin(angle) * length;
    litterPositions.push(x, y, z, x + dx, y + 0.003, z + dz, x - dz * 0.035, y + 0.006, z + dx * 0.035);
    const c = needleColors[Math.floor(random() * needleColors.length)];
    for (let j = 0; j < 3; j++) litterColors.push(c.r, c.g, c.b);
  }
  // Denser litter and fallen twigs in the firelit ring around the hearth.
  for (let i = 0; i < 5000; i++) {
    const a = random() * Math.PI * 2, r = 1.25 + Math.pow(random(), 1.4) * 3.2;
    const x = Math.cos(a) * r, z = 0.65 + Math.sin(a) * r;
    const angle = random() * Math.PI * 2, length = 0.04 + random() * 0.09;
    const y = groundHeight(x, z) + 0.011;
    const dx = Math.cos(angle) * length, dz = Math.sin(angle) * length;
    litterPositions.push(x, y, z, x + dx, y + 0.003, z + dz, x - dz * 0.04, y + 0.006, z + dx * 0.04);
    const c = needleColors[Math.floor(random() * needleColors.length)];
    for (let j = 0; j < 3; j++) litterColors.push(c.r, c.g, c.b);
  }
  const litterGeometry = new THREE.BufferGeometry();
  litterGeometry.setAttribute('position', new THREE.Float32BufferAttribute(litterPositions, 3));
  litterGeometry.setAttribute('color', new THREE.Float32BufferAttribute(litterColors, 3));
  litterGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(new Array(litterPositions.length / 3).fill(0).flatMap(() => [0, 1, 0]), 3));
  const litter = new THREE.Mesh(litterGeometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, side: THREE.DoubleSide }));
  litter.receiveShadow = true;
  litter.name = 'Needle litter';
  scene.add(litter);

  // Low sparse tussocks soften the rock/soil boundary; each blade is individually bent.
  const grassPositions: number[] = [], grassColors: number[] = [], grassBend: number[] = [];
  const grassRandom = seeded(1149);
  for (let clump = 0; clump < 300; clump++) {
    const theta = grassRandom() * Math.PI * 2;
    const radius = 1.9 + grassRandom() * 9;
    const cx = Math.cos(theta) * radius, cz = -0.4 + Math.sin(theta) * radius;
    if (Math.abs(cx) < 0.9 && cz > 1.3) continue;
    for (let blade = 0; blade < 12; blade++) {
      const x = cx + (grassRandom() - 0.5) * 0.26, z = cz + (grassRandom() - 0.5) * 0.26;
      const y = groundHeight(x, z) + 0.004;
      const height = 0.07 + Math.pow(grassRandom(), 1.5) * 0.22;
      const a = grassRandom() * Math.PI * 2;
      const dx = Math.cos(a), dz = Math.sin(a);
      const width = 0.003 + grassRandom() * 0.005;
      const bend = 0.02 + grassRandom() * 0.08;
      const color = new THREE.Color().setHSL(0.13 + grassRandom() * 0.08, 0.16 + grassRandom() * 0.18, 0.2 + grassRandom() * 0.1);
      for (let segment = 0; segment < 4; segment++) {
        const t0 = segment / 4, t1 = (segment + 1) / 4;
        const bx0 = x + dx * bend * t0 * t0, bz0 = z + dz * bend * t0 * t0;
        const bx1 = x + dx * bend * t1 * t1, bz1 = z + dz * bend * t1 * t1;
        const yy0 = y + height * (t0 - 0.12 * t0 * t0), yy1 = y + height * (t1 - 0.12 * t1 * t1);
        const w0 = width * (1 - t0) ** 0.8, w1 = width * (1 - t1) ** 0.8;
        grassPositions.push(bx0 - dz * w0, yy0, bz0 + dx * w0, bx0 + dz * w0, yy0, bz0 - dx * w0, bx1 - dz * w1, yy1, bz1 + dx * w1,
          bx0 + dz * w0, yy0, bz0 - dx * w0, bx1 + dz * w1, yy1, bz1 - dx * w1, bx1 - dz * w1, yy1, bz1 + dx * w1);
        for (let v = 0; v < 6; v++) {
          const tip = v === 2 || v === 4 || v === 5 ? t1 : t0;
          grassColors.push(color.r * (0.7 + 0.5 * tip), color.g * (0.7 + 0.5 * tip), color.b * (0.7 + 0.4 * tip));
          grassBend.push(tip * tip);
        }
      }
    }
  }
  const grassGeometry = new THREE.BufferGeometry();
  grassGeometry.setAttribute('position', new THREE.Float32BufferAttribute(grassPositions, 3));
  grassGeometry.setAttribute('color', new THREE.Float32BufferAttribute(grassColors, 3));
  grassGeometry.setAttribute('aBend', new THREE.Float32BufferAttribute(grassBend, 1));
  grassGeometry.computeVertexNormals();
  const grassTime = { value: 0 };
  const grassMaterial = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, side: THREE.DoubleSide });
  grassMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uGrassTime = grassTime;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aBend;\nuniform float uGrassTime;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
transformed.x += sin(uGrassTime * 0.42 + position.x * 0.8 + position.z * 0.5) * aBend * 0.018;
transformed.z += cos(uGrassTime * 0.31 + position.x * 0.4) * aBend * 0.01;`)
      .replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\nobjectNormal = normalize(objectNormal * 0.4 + vec3(0.0, 1.0, 0.0));');
  };
  grassMaterial.customProgramCacheKey = () => 'night-mountain-grass-v2';
  const grass = new THREE.Mesh(grassGeometry, grassMaterial);
  grass.name = 'Sparse alpine grass among stones';
  grass.receiveShadow = true;
  scene.add(grass);

  const twigParts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 70; i++) {
    const a = random() * Math.PI * 2, r = 1.15 + Math.pow(random(), 1.2) * 4;
    const x = Math.cos(a) * r, z = 0.65 + Math.sin(a) * r;
    const length = 0.12 + random() * 0.45, radius = 0.006 + random() * 0.012;
    const twig = new THREE.CylinderGeometry(radius * 0.6, radius, length, 6, 3);
    const tp = twig.attributes.position as THREE.BufferAttribute;
    for (let v = 0; v < tp.count; v++) tp.setX(v, tp.getX(v) + Math.sin(tp.getY(v) * 9 + i) * 0.012);
    twig.rotateZ(Math.PI / 2);
    twig.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, groundHeight(x, z) + radius * 0.8, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, random() * Math.PI * 2, (random() - 0.5) * 0.08)), new THREE.Vector3(1, 1, 1)));
    twig.deleteAttribute('uv');
    twig.computeVertexNormals();
    twigParts.push(twig.toNonIndexed()); twig.dispose();
  }
  const twigs = mesh(mergeGeometries(twigParts), barkMaterial('#4d3f31', 'mountain-twigs', { furrows: 3, lichen: 0.3 }));
  twigParts.forEach((g) => g.dispose());
  twigs.name = 'Fallen twigs';
  scene.add(twigs);

  const hearth = fire(firePosition, 1, { noise, lightIntensity: 11, bounceIntensity: 2.2 });
  hearth.group.name = 'Mountain campfire: touch logs for faint embers';
  scene.add(hearth.group);

  let environment: THREE.WebGLRenderTarget | null = null;
  let volumeUniforms: Record<string, THREE.IUniform> | null = null;
  return {
    scene,
    view: (aspect) => aspect < 0.85
      ? { position: [0.08, 1.3, 3.95], target: [0, 1.38, -10], fov: 66 }
      : { position: [0.12, 1.34, 4.35], target: [0.1, 1.55, -12], fov: 57 },
    targets: [{ object: hearth.target, kind: 'log-embers' }],
    interact: (kind) => {
      if (kind !== 'log-embers') return 0;
      hearth.stoke();
      return 0.32;
    },
    post: {
      exposure: 1.32, bloomStrength: 0.085, bloomThreshold: 0, aoStrength: 0.85, aoRadius: 0.55,
      saturation: 1.04, contrast: 1.08, shadowTint: [0.88, 0.97, 1.12], highlightTint: [1.08, 1.0, 0.88], vignette: 0.5, grain: 0.028,
    },
    prepare(renderer) {
      environment = bakeNightEnvironment(renderer, sky.dome, '#0d0f12');
      scene.environment = environment.texture;
      scene.environmentIntensity = 2.2;
    },
    createVolume() {
      const volume = createNightVolume({
        noise, moonDirection: moonDir, moon: new THREE.Color(0.06, 0.075, 0.1), ambient: new THREE.Color(0.01, 0.014, 0.022),
        fogDensity: 0.0032, fogHeight: 14, fogBase: 0, maxDistance: 320,
        mist: { y: 0.2, thickness: 2.2, density: 0.009, start: 16, tint: new THREE.Color(0.9, 1.0, 1.1) },
        glow: { position: hearth.glow, color: new THREE.Color(1.0, 0.45, 0.16), density: 0.012 },
        smoke: { base: new THREE.Vector3(firePosition[0], 1.0, firePosition[2]), radius: 0.12, height: 4.5, density: 0.3, wind: new THREE.Vector2(0.09, -0.04), fireLight: new THREE.Color(1.0, 0.42, 0.14).multiplyScalar(0.7) },
      });
      volumeUniforms = volume.uniforms;
      return volume;
    },
    setPostActive(active) { scene.fog = active ? null : fallbackFog; },
    update: (elapsed, dt) => {
      hearth.update(elapsed, dt);
      sky.update(elapsed);
      grassTime.value = elapsed;
      shimmer.uniforms.uHeatTime.value = elapsed;
      if (volumeUniforms) volumeUniforms.uFlicker.value = fireFlicker(elapsed, firePosition[0]);
    },
    dispose() { environment?.dispose(); environment = null; },
  };
}
