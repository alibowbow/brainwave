import * as THREE from 'three';
import type { WorldContent } from '../types';
import { buildTree, concatGeometries, loftTube, type TreeBuild } from '../../shared/render/treeGeometry';
import { applyBarkSurface } from '../../shared/render/barkSurface';
import { applyFoliageShading, layerCanopy } from '../../shared/render/foliageShading';
import { broadleafClusterTexture, fernFrondTexture, litterTexture, singleLeafTexture } from '../../shared/render/foliageTextures';
import { boulderGeometry } from '../../shared/render/rockGeometry';
import { applyRockSurface } from '../../shared/render/rockSurface';
import { noise3, seeded } from '../../shared/render/noise';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { leafSprayAtlas, tintGeometry } from './leafAtlas';
import {
  applyForestFloor, bakeEnvironment, bladeGeometry, createSky, createSun, createWoodsVolume, fernCrownGeometry, fernMaterial,
  grassMaterial, instanced, litterGeometry, scatter, terrainGeometry, type Placement, type SkyOptions,
} from './woodsKit';

/** High sun from the right and a little ahead: shafts slant across the view and side-light the old trunk. */
const TO_SUN = new THREE.Vector3(0.62, 0.7, -0.35).normalize();
const srgb = (h: number, s: number, l: number) => new THREE.Color().setHSL(h, s, l, THREE.SRGBColorSpace);

/** A cut-out leaf card, base at the origin, cupped across and drooping toward the tip. */
function leafCard(length: number, width: number) {
  const geometry = new THREE.PlaneGeometry(width, length, 3, 6);
  geometry.translate(0, length / 2, 0);
  const p = geometry.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i) / (width / 2), y = p.getY(i) / length;
    p.setZ(i, x * x * width * 0.16 - y * y * length * 0.18);
  }
  geometry.computeVertexNormals();
  return geometry;
}

/** Independent, metre-scale old-growth forest. All forms and materials are generated here. */
export function createAncientForest(scene: THREE.Scene, camera: THREE.PerspectiveCamera): WorldContent {
  const random = seeded(74129);
  const range = (a: number, b: number) => a + random() * (b - a);
  const tau = Math.PI * 2;
  const root = new THREE.Group();
  root.name = 'ancient-forest-world';
  scene.add(root);
  const time = { value: 0 };
  let environment: THREE.WebGLRenderTarget | null = null;
  camera.position.set(.15, 1.42, 5.25);
  camera.lookAt(.1, 2.75, -9.8);
  camera.fov = 58;
  camera.near = .08;
  camera.far = 95;
  camera.updateProjectionMatrix();

  // Bright sky survives only in small gaps of the canopy.
  const sky: SkyOptions = {
    zenith: new THREE.Color(0.62, 0.78, 1.0).multiplyScalar(2.0), horizon: new THREE.Color(0.85, 0.92, 0.85).multiplyScalar(1.6),
    ground: new THREE.Color(0.04, 0.05, 0.03), toSun: TO_SUN, sun: new THREE.Color(1, 0.93, 0.78).multiplyScalar(60),
    glow: new THREE.Color(1, 0.86, 0.62).multiplyScalar(1.6), time,
    wall: { color: new THREE.Color(0.07, 0.095, 0.072), height: 0.3 },
  };
  root.add(createSky(sky, 90));
  scene.background = new THREE.Color(0.2, 0.25, 0.2);
  const fog = new THREE.FogExp2(0xffffff, 0.013);
  fog.color.setRGB(0.075, 0.1, 0.08);
  scene.fog = fog;
  createSun(scene, { toSun: TO_SUN, color: '#fff0d2', intensity: 7.5, target: new THREE.Vector3(0, 0, -6), box: [-20, 20, -16, 20], distance: 46, radius: 3, normalBias: 0.05 });
  // Soft warm bounce from the sunlit litter in front of the old trunk.
  const bounce = new THREE.PointLight('#c9a86a', 3.5, 9, 2);
  bounce.position.set(-1.2, 0.7, -1.2);
  root.add(bounce);

  // Rolling floor: broad swells, smaller root-heaved humps and hollows, and the old tree's own root mound.
  const groundY = (x: number, z: number) => -.16 + .15 * Math.sin(x * .28 + z * .14) + .10 * Math.cos(z * .61 + x * .28) + Math.max(0, -z - 12) * .023
    + 0.2 * noise3(x * 0.3, 0.5, z * 0.3) + 0.06 * noise3(x * 1.1, 2.5, z * 1.1)
    + 0.4 * Math.exp(-((Math.max(0, Math.hypot(x + 3.6, z + 3.8) - 1.4) / 1.8) ** 2));
  const canopy = layerCanopy({
    key: 'ancient', toSun: TO_SUN, height: 17, scale: 0.085, cover: 0.24, softness: 0.08, floor: 0.045, time,
    clearings: [
      { target: new THREE.Vector3(-2.3, 2.4, -3.2), radius: 2.1 }, { target: new THREE.Vector3(1.4, 0, -12), radius: 2.6 },
      { target: new THREE.Vector3(-7.5, 0, -9), radius: 1.8 }, { target: new THREE.Vector3(2.2, 0, -1.5), radius: 1.4 },
    ],
  });
  const wind = { time, mode: 'attribute' as const, sway: 0.3, flutter: 0.02, direction: [0.8, -0.5] as [number, number], speed: 0.8 };

  // ---- Old-growth bark: deep furrows, moss up the shaded flank and over the roots ----------------
  const barkMaterial = applyFoliageShading(applyBarkSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.9 }), {
    // Fine furrows in the shading (many per metre) over the broad modelled ridges of the geometry.
    key: 'ancient-bark', scale: 5.5, stretch: 6, depth: 0.04, plate: '#94897a', fissure: '#0c0907',
    lichen: { color: '#a9b297', amount: 0.55 }, moss: { color: '#4b6a1f', amount: 0.8, below: 1.1, side: new THREE.Vector3(0.3, 0, 1), up: 0.9 },
  }), { key: 'ancient-bark', canopy, wind });
  const farBarkMaterial = applyFoliageShading(applyBarkSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.9 }), {
    key: 'ancient-far-bark', scale: 6, stretch: 6, depth: 0.03, plate: '#6a6255', fissure: '#14110d',
    lichen: { color: '#8c9680', amount: 0.35 }, moss: { color: '#465f22', amount: 0.55, below: 0.8, side: new THREE.Vector3(0.3, 0, 1) },
  }), { key: 'ancient-far-bark', canopy, wind });

  const oldX = -3.6, oldZ = -3.8;
  const hero = buildTree({
    seed: 11, base: new THREE.Vector3(oldX, groundY(oldX, oldZ) - 0.12, oldZ), height: 30, radius: 1.35, form: 'column',
    gnarl: 0.3, flare: 0.75, buttresses: 7, crownStart: 0.58, limbs: 6, levels: 1, children: 3, spread: 0.24, curl: -0.1,
    radial: 72, ringsPerMetre: 7, displace: 0.11, barkScale: 1.5, barkStretch: 7, flex: 0.12,
    leaves: { cardsPerTwig: 14, size: 2.1, reach: 0.8, crownNormals: 0.8, shade: [0.25, 1], fill: 0.2 },
  });
  const heroParts: THREE.BufferGeometry[] = [hero.bark];
  // Two great low limbs cross the upper view.
  heroParts.push(loftTube([new THREE.Vector3(-3.1, 8.4, -3.7), new THREE.Vector3(-0.8, 10.2, -5.2), new THREE.Vector3(3.0, 11.4, -6.0), new THREE.Vector3(6.8, 11.9, -9.0), new THREE.Vector3(9.4, 13.4, -10.6)], [0.62, 0.5, 0.4, 0.3, 0.12], { radial: 24, ringsPerMetre: 4, displace: 0.03, barkScale: 1.3, barkStretch: 5, barkOffset: 31 }));
  heroParts.push(loftTube([new THREE.Vector3(-3.9, 12.3, -3.6), new THREE.Vector3(-5.6, 14.0, -1.6), new THREE.Vector3(-8.2, 14.4, 1.2), new THREE.Vector3(-10.4, 15.8, 2.4)], [0.55, 0.42, 0.28, 0.1], { radial: 20, ringsPerMetre: 4, displace: 0.025, barkScale: 1.3, barkStretch: 5, barkOffset: 57 }));
  // Buttress roots climb out of the flare as tall, sinuous ridges and run off under the litter.
  const rootRandom = seeded(551);
  for (let k = 0; k < 15; k++) {
    const angle = -0.4 + k * 0.43 + (rootRandom() - 0.5) * 0.3;
    // A root aimed straight at the viewer foreshortens into a post; skip that bearing.
    if (Math.abs(Math.atan2(Math.sin(angle - 1.18), Math.cos(angle - 1.18))) < 0.28) continue;
    const major = k % 3 !== 2;
    const lift = major ? 1.15 + rootRandom() * 0.7 : 0.5 + rootRandom() * 0.3;
    const dir = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const reach = (major ? 2.6 + rootRandom() * 3.6 : 1.4 + rootRandom() * 1.4);
    const side = new THREE.Vector3(-dir.z, 0, dir.x);
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 7; i++) {
      const t = i / 7;
      const d = 1.2 + t * reach;
      const p = new THREE.Vector3(oldX, 0, oldZ).addScaledVector(dir, d).addScaledVector(side, Math.sin(t * 4.3 + k) * 0.5 * t);
      p.y = groundY(p.x, p.z) + (lift * (1 - t) ** 2.2) - 0.05 - t * t * 0.22;
      points.push(p);
    }
    const r0 = major ? 0.34 + rootRandom() * 0.18 : 0.15 + rootRandom() * 0.08;
    heroParts.push(loftTube(points, [r0, r0 * 0.82, r0 * 0.64, r0 * 0.48, r0 * 0.36, r0 * 0.26, r0 * 0.16, r0 * 0.06], { radial: 22, ringsPerMetre: 9, displace: 0.025, barkScale: 1.5, barkStretch: 5, barkOffset: 80 + k * 13, flatten: 0.45 }));
  }
  // Decaying fallen trunks: horizontal landmarks whose broken ends taper into splinters.
  const lying = (xz: Array<[number, number]>, radii: number[], sink: number) => xz.map(([x, z], i) => new THREE.Vector3(x, groundY(x, z) + radii[i] * sink, z));
  const fallenRadii = [0.1, 0.4, 0.5, 0.47, 0.42, 0.12];
  const deadParts: THREE.BufferGeometry[] = [];
  deadParts.push(loftTube(lying([[1.6, -7.5], [2.4, -8.3], [4.4, -10.2], [7.8, -11.4], [10.8, -12.8], [11.6, -13.1]], fallenRadii, 0.45), fallenRadii, { radial: 26, ringsPerMetre: 6, displace: 0.035, barkScale: 1.5, barkStretch: 4, barkOffset: 140, flatten: 0.3 }));
  const nearLogRadii = [0.05, 0.22, 0.26, 0.24, 0.2, 0.05];
  deadParts.push(loftTube(lying([[2.5, 1.9], [2.9, 1.5], [3.9, 0.7], [5.2, -0.2], [6.5, -0.7], [6.9, -0.8]], nearLogRadii, 0.4), nearLogRadii, { radial: 20, ringsPerMetre: 8, displace: 0.02, barkScale: 2, barkStretch: 4, barkOffset: 190, flatten: 0.3 }));
  // Fallen branches and twigs scattered through the litter.
  const branchRandom = seeded(9013);
  for (let i = 0; i < 26; i++) {
    const x = -7 + branchRandom() * 14, z = 3.8 - branchRandom() * 16;
    if (Math.hypot(x - oldX, z - oldZ) < 3.2 || Math.hypot(x - 1.1, z - 1.4) < 0.6) { continue; }
    const length = 0.5 + branchRandom() * 1.6;
    const yaw = branchRandom() * Math.PI * 2;
    const r0 = 0.025 + branchRandom() * 0.05;
    const dir = new THREE.Vector3(Math.cos(yaw), 0, Math.sin(yaw));
    const across = new THREE.Vector3(-dir.z, 0, dir.x);
    const kink = (branchRandom() - 0.5) * 0.5;
    // Crooked, not ruler-straight: a kink and a little noise along the length; partly sunk in the litter.
    const pts = [0, 0.25, 0.5, 0.75, 1].map((t, k) => {
      const p = new THREE.Vector3(x, 0, z).addScaledVector(dir, t * length)
        .addScaledVector(across, (Math.sin(t * Math.PI) * kink + noise3(x + k * 0.7, z, i) * 0.06) * length);
      p.y = groundY(p.x, p.z) + r0 * (1 - t * 0.5) * (0.3 + 0.4 * Math.abs(Math.sin(k * 1.7 + i)));
      return p;
    });
    deadParts.push(loftTube(pts, [r0, r0 * 0.85, r0 * 0.7, r0 * 0.5, r0 * 0.2], { radial: 6, ringsPerMetre: 8, barkScale: 3, barkStretch: 4, barkOffset: 300 + i * 5, flatten: 0.25 }));
    if (branchRandom() < 0.6) {
      // A side twig forking off.
      const from = pts[1].clone();
      const twigDir = dir.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), (branchRandom() < 0.5 ? -1 : 1) * (0.5 + branchRandom() * 0.4));
      const tl = length * (0.25 + branchRandom() * 0.25);
      const to = from.clone().addScaledVector(twigDir, tl);
      to.y = groundY(to.x, to.z) + r0 * 0.3;
      deadParts.push(loftTube([from, from.clone().lerp(to, 0.5).add(new THREE.Vector3(0, r0 * 0.4, 0)), to], [r0 * 0.5, r0 * 0.35, r0 * 0.12], { radial: 5, ringsPerMetre: 7, barkScale: 3, barkStretch: 4, barkOffset: 500 + i * 3 }));
    }
  }
  const deadwoodMaterial = applyFoliageShading(applyBarkSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.92 }), {
    key: 'ancient-deadwood', scale: 2.4, stretch: 3, depth: 0.035, plate: '#8e8574', fissure: '#2a2219',
    lichen: { color: '#b2b79c', amount: 0.6 }, moss: { color: '#527524', amount: 0.95, below: 0.2, side: new THREE.Vector3(0.3, 0, 1), up: 1.3 },
  }), { key: 'ancient-deadwood', canopy });
  const deadwood = new THREE.Mesh(concatGeometries(deadParts), deadwoodMaterial);
  deadwood.castShadow = true; deadwood.receiveShadow = true; root.add(deadwood);
  deadParts.forEach(g => g.dispose());
  const heroMesh = new THREE.Mesh(concatGeometries(heroParts), barkMaterial);
  heroMesh.castShadow = true; heroMesh.receiveShadow = true; root.add(heroMesh);
  heroParts.forEach(g => g.dispose());

  // ---- The surrounding forest: tall trunks receding into haze --------------------------------------
  const treeSpots: Array<[number, number, number, number]> = [
    [5.6, -6, .66, 26], [2.6, -13.0, .8, 30], [-8, -12, .7, 26], [-1.7, -18.5, .73, 31],
    [7.7, -17, .53, 27], [-7.4, -22, .47, 28], [12, -24, .6, 30], [2.5, -29, .66, 32],
    [-14, -16, .9, 29], [-12, -34, .47, 30], [16, -33, .6, 31], [-.8, -42, .55, 30],
  ];
  for (let i = 0; i < 52; i++) {
    const z = -13 - random() * 55, x = (random() - .5) * 70;
    if (Math.abs(x) < 4 && z > -20) continue;
    treeSpots.push([x, z, .25 + random() * .45, 22 + random() * 12]);
  }
  const forest: TreeBuild[] = treeSpots.map(([x, z, r, h], i) => buildTree({
    seed: 40 + i, base: new THREE.Vector3(x, groundY(x, z) - 0.08, z), height: h, radius: r, form: 'column',
    gnarl: 0.22, flare: i < 12 ? 0.85 : 0.6, buttresses: i < 12 ? 5 : 3, crownStart: 0.45 + random() * 0.2, limbs: i < 12 ? 7 : 5, levels: 1, children: 3,
    spread: 0.2, curl: -0.15, radial: i < 12 ? 26 : 10, ringsPerMetre: i < 12 ? 3 : 0.8, displace: i < 12 ? 0.04 : 0, barkScale: 1.9, barkStretch: 6, flex: 0.2,
    leaves: { cardsPerTwig: i < 12 ? 16 : 11, size: 1.9, reach: 0.85, crownNormals: 0.8, shade: [0.22, 1], fill: 0.2 },
  }));
  // Sub-canopy saplings interrupt the trunk rhythm at human scale.
  const saplingSpots: Array<[number, number, number]> = [[-1.5, -11, 3.1], [5, -13, 4.2], [-6.1, -9, 3.6], [1.1, -22, 4.1], [9.1, -19, 5.0]];
  for (let i = 0; i < 16; i++) saplingSpots.push([(random() - 0.5) * 34, -7 - random() * 30, 2.2 + random() * 3.5]);
  const understory: TreeBuild[] = saplingSpots.map(([x, z, h], i) => buildTree({
    seed: 700 + i, base: new THREE.Vector3(x, groundY(x, z) - 0.05, z), height: h, radius: 0.03 + h * 0.008, form: 'sapling',
    limbs: i % 2 ? 9 : 7, levels: 1, children: 3, crownStart: i % 2 ? 0.05 : 0.18 + (i % 3) * 0.05, spread: i % 2 ? 0.45 : 0.5, curl: i % 2 ? 0.9 : 0.4, radial: 6, ringsPerMetre: 2, flex: 1.2,
    leaves: { cardsPerTwig: 12, size: 0.5, reach: 0.85, atlasColumns: 4, crownNormals: 0.6, shade: [0.24, 1.02], skyward: 0.55, fill: 0.35 },
  }));
  const farBark = new THREE.Mesh(concatGeometries([...forest, ...understory].map(t => t.bark)), farBarkMaterial);
  farBark.castShadow = true; farBark.receiveShadow = true; root.add(farBark);
  const leafAtlas = broadleafClusterTexture({ seed: 31, palette: { base: '#47662a', light: '#86a44a', dark: '#29401a', stem: '#4a3c2a' }, round: 0.4 });
  const leafMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ map: leafAtlas, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, alphaToCoverage: true, roughness: 0.55 }), {
    key: 'ancient-leaves', canopy, wind, sharedNormals: true, coverage: true, translucency: { tint: '#e8ff8a', back: 0.8, forward: 1.8 },
  });
  const leafParts = [hero, ...forest].map(t => t.leaves).filter((g): g is THREE.BufferGeometry => !!g);
  const leaves = new THREE.Mesh(concatGeometries(leafParts), leafMaterial);
  leaves.castShadow = true; leaves.receiveShadow = true; root.add(leaves);
  // Understorey saplings: dense sprays of small leaves, each plant its own shade of green.
  const saplingAtlas = leafSprayAtlas({ seed: 33, palette: { base: '#4c7a2a', light: '#9cc052', dark: '#284519', stem: '#4a3c2a' }, columns: 4, cell: 320, leaf: 0.15, aspect: 0.5, leaves: 11, twigs: 4, round: 0.45, toothed: true });
  const saplingMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ map: saplingAtlas, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, alphaToCoverage: true, roughness: 0.5 }), {
    key: 'ancient-sapling', canopy, wind, sharedNormals: true, coverage: true, translucency: { tint: '#e8ff8a', back: 0.85, forward: 1.9 },
  });
  const tintRandom = seeded(4040);
  understory.forEach(t => tintGeometry(t.leaves, new THREE.Color(0.85 + tintRandom() * 0.3, 0.92 + tintRandom() * 0.12, 0.75 + tintRandom() * 0.3), 0.2, tintRandom));
  const saplingLeaves = new THREE.Mesh(concatGeometries(understory.map(t => t.leaves).filter((g): g is THREE.BufferGeometry => !!g)), saplingMaterial);
  saplingLeaves.castShadow = true; saplingLeaves.receiveShadow = true; root.add(saplingLeaves);
  [hero, ...forest, ...understory].forEach(t => { t.bark.dispose(); t.leaves?.dispose(); });

  // ---- Floor: litter, moss, ferns and mossy stones ---------------------------------------------------
  const floorMaterial = applyFoliageShading(applyForestFloor(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.92 }), {
    key: 'ancient-floor', soil: '#2c241a', litter: '#6c5333', litterDark: '#36291b', moss: '#3f5f1c', mossAmount: 0.6, wetness: 0.15, bump: 1.1, carpet: { cells: 9, aspect: 2.3, cover: 0.85 },
  }), { key: 'ancient-floor', canopy });
  const ground = new THREE.Mesh(terrainGeometry({ width: 110, zNear: 6.5, zFar: -80, columns: 170, rows: 160, height: groundY }), floorMaterial);
  ground.receiveShadow = true; root.add(ground);

  const fernAtlas = fernFrondTexture({ seed: 9, palette: { base: '#4f8228', light: '#94bc4c', dark: '#2d4c19', stem: '#62733a' } });
  const fernWind = { time, mode: 'height' as const, height: 0.8, sway: 0.05, flutter: 0.012, direction: [0.8, -0.5] as [number, number], speed: 0.9 };
  const ferns = fernMaterial({ key: 'ancient', map: fernAtlas, canopy, wind: fernWind, roughness: 0.62 });
  const fernSpots: Placement[] = [
    [1.57, 1.12, 1.27], [-1.16, 1.46, .83], [2.8, -1.8, 1.0], [-.9, -4.3, .81], [-6.2, 0.5, 1.2], [3.9, 2.6, 0.9],
  ].map(([x, z, s]) => ({ x, y: groundY(x, z) + 0.02, z, yaw: x * 3.1, scale: new THREE.Vector3(s, s * 0.9, s), color: srgb(0.24, 0.45, 0.42) }));
  const fernClusters = [[-3.2, 2.2], [3.1, 1.4], [-1.6, -0.8], [4.6, -2.2], [-5.8, -0.4], [2.0, 3.4], [-2.6, 3.8], [5.8, 2.6],
    ...Array.from({ length: 22 }, (_, i) => [(Math.sin(i * 12.9898) * 0.5) * 34, 1 - ((i * 0.618) % 1) * 34])];
  fernSpots.push(...scatter(520, 61, r => {
    const [cx, cz] = fernClusters[Math.floor(r() * fernClusters.length)];
    const x = r() < 0.8 ? cx + (r() - .5) * 4.5 : (r() - .5) * 36, z = r() < 0.8 ? cz + (r() - .5) * 4.5 : 3 - r() * 38;
    if (Math.abs(x - 0.2) < 1.6 && z > -7 && z < 4.2) return null;
    if (Math.hypot(x - oldX, z - oldZ) < 1.9) return null;
    const s = 0.55 + r() * 0.85;
    return { x, y: groundY(x, z) + 0.02, z, yaw: r() * tau, scale: new THREE.Vector3(s, s * (0.75 + r() * 0.35), s), color: srgb(0.21 + r() * 0.06, 0.35 + r() * 0.2, 0.34 + r() * 0.14) };
  }));
  const fernTemplates = [fernCrownGeometry(5, 9), fernCrownGeometry(7, 11), fernCrownGeometry(13, 8)];
  fernTemplates.forEach((template, i) => root.add(instanced(template, ferns, fernSpots.filter((_, k) => k % 3 === i), { cast: true, receive: true })));

  // Sparse woodland grass and sedge where light reaches the floor.
  const grassWind = { time, mode: 'height' as const, height: 1, sway: 0.05, flutter: 0.01, direction: [0.8, -0.5] as [number, number], speed: 1 };
  const tussocks = scatter(260, 63, r => {
    const [cx, cz] = fernClusters[Math.floor(r() * fernClusters.length)];
    const x = cx + (r() - .5) * 8, z = cz + (r() - .5) * 8;
    return { x, y: 0, z, yaw: 0, scale: new THREE.Vector3(), color: new THREE.Color() };
  });
  const woodGrass = scatter(7800, 62, r => {
    const t = tussocks[Math.floor(r() * tussocks.length)];
    const a = r() * tau, d = Math.sqrt(r()) * 0.28;
    const x = t.x + Math.cos(a) * d, z = t.z + Math.sin(a) * d;
    if (Math.hypot(x - oldX, z - oldZ) < 1.7) return null;
    const h = 0.12 + r() * 0.3;
    return { x, y: groundY(x, z) - 0.01, z, yaw: a + (r() - 0.5) * 0.8, tilt: 0.25 + r() * 0.45, scale: new THREE.Vector3(0.014 + r() * 0.01, h * 1.2, h * 1.2), color: srgb(0.2 + r() * 0.06, 0.4 + r() * 0.2, 0.28 + r() * 0.12) };
  });
  root.add(instanced(bladeGeometry(3, 0.5), grassMaterial({ key: 'ancient-grass', canopy, wind: grassWind, roughness: 0.6, translucency: 0.7 }), woodGrass, { cast: false, receive: true }));
  const litterAtlas = litterTexture({ seed: 3, colors: ['#7a5631', '#9a7a3c', '#4e3622', '#8c6a42'] });
  const litterMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ map: litterAtlas, alphaTest: 0.5, alphaToCoverage: true, side: THREE.DoubleSide, roughness: 0.85 }), { key: 'ancient-litter', canopy, coverage: true });
  for (let cell = 0; cell < 4; cell++) {
    const spots = scatter(1400, 300 + cell, r => {
      const x = (r() - .5) * 18, z = 5 - Math.pow(r(), 1.4) * 22;
      const s = 0.07 + r() * 0.08;
      return { x, y: groundY(x, z) + 0.012, z, yaw: r() * tau, tilt: (r() - 0.5) * 0.25, scale: new THREE.Vector3(s, s, s * 1.4), color: srgb(0.08, 0.2, 0.55 + r() * 0.35) };
    });
    root.add(instanced(litterGeometry(cell), litterMaterial, spots, { cast: false, receive: true }));
  }

  const stoneMaterial = applyFoliageShading(applyRockSurface(new THREE.MeshStandardMaterial({ color: '#7d7a6e', roughness: 0.9 }), {
    key: 'ancient-stone', scale: 1.8, bump: 1.2, stainAmount: 0.2, strata: 0.1, drips: 0, wetness: 0.1, moss: { color: '#456a1e', amount: 0.85 },
  }), { key: 'ancient-stone', canopy });
  // Large mossy boulders, then a scatter of smaller half-buried stones among the roots and litter.
  const stoneParts: THREE.BufferGeometry[] = [];
  const placeStone = (x: number, z: number, s: number, seedValue: number, detail: number, sink: number) => {
    const g = boulderGeometry(seedValue, detail);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, groundY(x, z) + s * sink, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, x * 1.7 + z, 0)), new THREE.Vector3(s * 1.3, s * 0.75, s)));
    stoneParts.push(g);
  };
  for (const [x, z, s, seedValue] of [[0.9, -2.4, 0.55, 3], [-6.6, -1.4, 0.85, 5], [4.3, -5.4, 0.62, 8], [-1.4, -9.6, 0.7, 12], [6.2, 0.4, 0.5, 17]]) placeStone(x, z, s, seedValue, 4, 0.25);
  const pebbleRandom = seeded(7310);
  for (let i = 0; i < 22; i++) {
    // Clustered: most near a few spots, the rest scattered.
    const centres = [[-0.4, -1.8], [3.4, -3.4], [-2.0, -6.8], [5.2, -8.4], [-5.2, 1.6]];
    const [cx, cz] = centres[i % centres.length];
    const x = cx + (pebbleRandom() - 0.5) * 2.4, z = cz + (pebbleRandom() - 0.5) * 2.4;
    if (Math.hypot(x - oldX, z - oldZ) < 2.6 || Math.hypot(x - 1.1, z - 1.4) < 0.5) continue;
    placeStone(x, z, 0.08 + pebbleRandom() ** 2 * 0.28, 30 + i, 2, 0.05);
  }
  const stones = new THREE.Mesh(concatGeometries(stoneParts), stoneMaterial);
  stones.castShadow = true; stones.receiveShadow = true; root.add(stones);
  stoneParts.forEach(g => g.dispose());

  // Small clusters of pale woodland mushrooms on the root mound and the fallen trunks.
  {
    const capProfile = [[0, 0.62], [0.35, 0.6], [0.7, 0.5], [0.95, 0.32], [1.0, 0.18], [0.85, 0.14], [0.3, 0.12], [0.12, 0.1]].map(([x, y]) => new THREE.Vector2(x, y));
    const cap = new THREE.LatheGeometry(capProfile, 12);
    const stem = new THREE.CylinderGeometry(0.11, 0.15, 0.34, 7, 1, true); stem.translate(0, 0.0, 0);
    const parts: THREE.BufferGeometry[] = [];
    const tint = (g: THREE.BufferGeometry, c: THREE.Color) => {
      const colors = new Float32Array(g.attributes.position.count * 3);
      for (let i = 0; i < colors.length; i += 3) colors.set([c.r, c.g, c.b], i);
      g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      g.deleteAttribute('uv');
      return g;
    };
    const mushroomRandom = seeded(2290);
    const spots: Array<[number, number, number]> = [[-1.7, -1.6, 7], [-5.3, -1.0, 5], [2.4, -8.2, 6], [3.6, 0.6, 5], [-2.2, -5.9, 4]];
    for (const [sx, sz, n] of spots) {
      for (let i = 0; i < n; i++) {
        const x = sx + (mushroomRandom() - 0.5) * 0.35, z = sz + (mushroomRandom() - 0.5) * 0.35;
        const size = 0.025 + mushroomRandom() * 0.03;
        const height = size * (1.6 + mushroomRandom());
        const lean = new THREE.Quaternion().setFromEuler(new THREE.Euler((mushroomRandom() - 0.5) * 0.4, mushroomRandom() * 6.28, (mushroomRandom() - 0.5) * 0.4));
        const y = groundY(x, z) - 0.01;
        const s = stem.clone();
        s.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, y + height * 0.5, z), lean, new THREE.Vector3(size, height / 0.34, size)));
        parts.push(tint(s, new THREE.Color().setHSL(0.11, 0.25, 0.78, THREE.SRGBColorSpace)));
        const c = cap.clone();
        const top = new THREE.Vector3(0, height * 0.5, 0).applyQuaternion(lean);
        c.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, y + height * 0.5, z).add(top).add(new THREE.Vector3(0, -size * 0.25, 0)), lean, new THREE.Vector3(size, size, size)));
        parts.push(tint(c, new THREE.Color().setHSL(0.07 + mushroomRandom() * 0.03, 0.42, 0.42 + mushroomRandom() * 0.18, THREE.SRGBColorSpace)));
      }
    }
    const mushrooms = new THREE.Mesh(concatGeometries(parts), applyFoliageShading(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, side: THREE.DoubleSide }), { key: 'ancient-mushroom', canopy }));
    mushrooms.castShadow = false; mushrooms.receiveShadow = true; root.add(mushrooms);
    parts.forEach(g => g.dispose()); cap.dispose(); stem.dispose();
  }

  // ---- The reachable sapling: a few large cut-out leaves, the only thing touch moves --------------
  const sprig = new THREE.Group(); sprig.position.set(1.13, groundY(1.13, 1.45), 1.45); root.add(sprig);
  const stemCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(-.09, .52, -.05), new THREE.Vector3(-.27, 1.06, -.12)]);
  const twigMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ color: '#5a4b35', roughness: .9 }), { key: 'ancient-twig', canopy });
  const stem = new THREE.Mesh(new THREE.TubeGeometry(stemCurve, 20, .011, 6, false), twigMaterial);
  stem.castShadow = true; sprig.add(stem);
  const nearLeafTexture = singleLeafTexture({ seed: 21, palette: { base: '#5d8a2e', light: '#a6c45a', dark: '#36561c', stem: '#5a4a30' }, round: 0.35 });
  const nearLeafMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ map: nearLeafTexture, alphaTest: .5, alphaToCoverage: true, side: THREE.DoubleSide, roughness: .45 }), {
    key: 'ancient-near-leaf', canopy, coverage: true, translucency: { tint: '#f0ff9a', back: 0.85, forward: 1.8 },
  });
  const nearLeafGeometry = leafCard(0.36, 0.2);
  const nearLeaves: THREE.Object3D[] = [];
  for (let i = 0; i < 7; i++) {
    const t = .23 + i * .105, p = stemCurve.getPoint(t), side = i % 2 === 0 ? 1 : -1;
    const leaf = new THREE.Mesh(nearLeafGeometry, nearLeafMaterial); leaf.position.copy(p);
    leaf.rotation.set(-.5, .32 * side, -side * (.95 + i * .035));
    leaf.scale.setScalar(0.85 + (i % 3) * 0.12);
    leaf.castShadow = true; leaf.receiveShadow = true; leaf.userData.livingWoodsInteraction = 'leaf'; sprig.add(leaf); nearLeaves.push(leaf);
  }
  const restRotation = .08; sprig.rotation.z = restRotation;
  let touchedAt = -100;

  // Dust motes glint only where they drift through a shaft of sun; no firefly show.
  const moteCount = 700;
  const motePositions = new Float32Array(moteCount * 3), moteSeeds = new Float32Array(moteCount);
  const moteRandom = seeded(808);
  for (let i = 0; i < moteCount; i++) {
    motePositions.set([-5 + moteRandom() * 11, 0.2 + moteRandom() * 7, 1.5 - moteRandom() * 16], i * 3);
    moteSeeds[i] = moteRandom();
  }
  const moteGeometry = new THREE.BufferGeometry();
  moteGeometry.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
  moteGeometry.setAttribute('aSeed', new THREE.BufferAttribute(moteSeeds, 1));
  const motes = new THREE.Points(moteGeometry, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { ...canopy.uniforms, uTime: time, uScale: { value: 600 } },
    vertexShader: /* glsl */ `uniform float uTime; uniform float uScale; attribute float aSeed; varying vec3 vWorld; varying float vSeed;
void main() {
  vec3 p = position;
  p.x += sin(uTime * 0.11 + aSeed * 40.0) * 0.25; p.y += sin(uTime * 0.07 + aSeed * 23.0) * 0.18; p.z += cos(uTime * 0.09 + aSeed * 31.0) * 0.2;
  vec4 world = modelMatrix * vec4(p, 1.0); vWorld = world.xyz; vSeed = aSeed;
  vec4 mv = viewMatrix * world; gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(uScale * (0.012 + aSeed * 0.012) / -mv.z, 1.0, 6.0);
}`,
    fragmentShader: /* glsl */ `${GLSL_NOISE}
${canopy.glsl}
varying vec3 vWorld; varying float vSeed;
void main() {
  vec2 c = gl_PointCoord - 0.5; float disc = smoothstep(0.5, 0.0, length(c));
  float lit = bwCanopy(vWorld);
  gl_FragColor = vec4(vec3(2.6, 2.3, 1.7) * lit * disc * (0.5 + vSeed), 1.0);
}`,
  }));
  motes.frustumCulled = false; root.add(motes);

  // A tiny distant insect: two folded wing planes; life stays far and low contrast.
  const insect = new THREE.Group(); insect.position.set(.9, 1.7, -13); root.add(insect);
  const wingMaterial = new THREE.MeshStandardMaterial({ color: '#8a8f68', roughness: 1, side: THREE.DoubleSide });
  const wings: THREE.Mesh[] = [];
  for (const side of [-1, 1]) {
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, side * .026, .035, 0, side * .064, .004, .01, side * .032, -.021, 0], 3)); geometry.setIndex([0, 1, 2, 0, 2, 3]); geometry.computeVertexNormals();
    const wing = new THREE.Mesh(geometry, wingMaterial); insect.add(wing); wings.push(wing);
  }

  return {
    interactionTargets: nearLeaves,
    interact(_hit: THREE.Intersection, now: number) { touchedAt = now; },
    post: {
      exposure: 1.45, bloomStrength: 0.09, bloomThreshold: 0, aoStrength: 1, aoRadius: 0.8,
      saturation: 1.05, contrast: 1.12, shadowTint: [0.86, 0.99, 1.02], highlightTint: [1.08, 1.02, 0.88], vignette: 0.42, grain: 0.025,
    },
    prepare(renderer) { environment = bakeEnvironment(renderer, scene, sky, { intensity: 0.95, canopy: { color: new THREE.Color(0.05, 0.085, 0.04), cover: 0.85 } }); },
    createVolume: () => createWoodsVolume({
      canopy, toSun: TO_SUN, sun: new THREE.Color(1, 0.9, 0.72).multiplyScalar(3.2), ambient: new THREE.Color(0.06, 0.09, 0.07).multiplyScalar(0.6),
      haze: [0.0065, 0.02, -0.2, 70], mist: [0.011, 1.0, 0.09, 0.03], anisotropy: 0.72, steps: 32, clear: [2, 7],
    }),
    update(now: number) {
      time.value = now;
      const elapsed = now - touchedAt;
      const response = elapsed >= 0 && elapsed < 5 ? Math.exp(-elapsed * 1.25) * Math.sin(elapsed * 4) * .19 : 0;
      sprig.rotation.z = restRotation + Math.sin(now * .35) * .011 + response;
      sprig.rotation.x = Math.sin(now * .27 + 1) * .008;
      insect.position.x = .9 + Math.sin(now * .13) * .38; insect.position.y = 1.7 + Math.sin(now * .21) * .09;
      wings[0].rotation.y = Math.sin(now * 3.2) * .4; wings[1].rotation.y = -Math.sin(now * 3.2) * .4;
    },
    resize(aspect: number) {
      camera.fov = aspect < .8 ? 61 : 58;
      camera.position.set(aspect < .8 ? -.85 : .15, 1.42, aspect < .8 ? 5.50 : 5.25);
      camera.lookAt(aspect < .8 ? -1.55 : .1, aspect < .8 ? 2.45 : 2.75, -9.8);
      sprig.position.x = aspect < .8 ? -.18 : 1.13;
      camera.updateProjectionMatrix();
    },
    dispose() { environment?.dispose(); environment = null; },
  };
}
