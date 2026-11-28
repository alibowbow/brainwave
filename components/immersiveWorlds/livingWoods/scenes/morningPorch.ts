import * as THREE from 'three';
import type { WorldContent } from '../types';
import { buildTree, concatGeometries, type TreeBuild } from '../../shared/render/treeGeometry';
import { applyBarkSurface } from '../../shared/render/barkSurface';
import { applyFoliageShading, crownCanopy } from '../../shared/render/foliageShading';
import { boulderGeometry } from '../../shared/render/rockGeometry';
import { applyRockSurface } from '../../shared/render/rockSurface';
import { seeded } from '../../shared/render/noise';
import {
  applyDewGlints, applyForestFloor, bakeEnvironment, bladeGeometry as grassBlade, createSky, createSun, createWoodsVolume,
  grassMaterial, instanced, scatter, terrainGeometry, type Placement, type SkyOptions,
} from './woodsKit';
import { leafSprayAtlas, tintGeometry } from './leafAtlas';

/** Early sun low over the left of the garden: leaves glow back-lit, long shadows rake toward the porch and the right. */
const TO_SUN = new THREE.Vector3(-0.78, 0.22, -0.58).normalize();
const srgb = (h: number, s: number, l: number) => new THREE.Color().setHSL(h, s, l, THREE.SRGBColorSpace);

/** Original geometry and procedural materials; no borrowed assets or audio. */
export function createMorningPorch(scene: THREE.Scene, camera: THREE.PerspectiveCamera): WorldContent {
  let seed = 94201;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const range = (a: number, b: number) => a + random() * (b - a);
  const root = new THREE.Group();
  scene.add(root);
  const time = { value: 0 };
  let environment: THREE.WebGLRenderTarget | null = null;
  camera.position.set(0, 1.68, 4.8);
  camera.fov = 53;
  camera.lookAt(0, 1.25, -8);
  camera.updateProjectionMatrix();

  // HDR morning sky: warm low sun glow, a clear blue zenith and thin drifting cloud.
  const sky: SkyOptions = {
    zenith: new THREE.Color(0.11, 0.27, 0.66).multiplyScalar(1.1),
    horizon: new THREE.Color(1.0, 0.7, 0.42).multiplyScalar(1.6),
    horizonAway: new THREE.Color(0.5, 0.62, 0.84).multiplyScalar(0.85),
    ground: new THREE.Color(0.12, 0.15, 0.08),
    toSun: TO_SUN,
    sun: new THREE.Color(1, 0.8, 0.52).multiplyScalar(90),
    sunCos: 0.99975,
    glow: new THREE.Color(1.0, 0.58, 0.26).multiplyScalar(2.4),
    clouds: { lit: new THREE.Color(1.9, 1.55, 1.25), shade: new THREE.Color(0.6, 0.66, 0.82), cover: 0.8, scale: 0.85, speed: 0.0025, amount: 0.38 },
    time,
  };
  root.add(createSky(sky, 165));
  scene.background = new THREE.Color(0.7, 0.72, 0.78);
  // Thin, cool aerial perspective; the warm sun-side glow and the pooled mist come from the volume pass.
  const fog = new THREE.FogExp2(0xffffff, 0.0036);
  fog.color.setRGB(0.6, 0.66, 0.78);
  scene.fog = fog;

  createSun(scene, { toSun: TO_SUN, color: '#ffd6a0', intensity: 7.4, target: new THREE.Vector3(0, 0, -10), box: [-30, 30, -9, 16], distance: 60, mapSize: 2048, radius: 2.4, normalBias: 0.03 });
  // A dim, warm bounce off the sunlit boards under the porch roof.
  const porchBounce = new THREE.PointLight('#ffcf9a', 0.9, 6, 2);
  porchBounce.position.set(-0.5, 1.2, 3.2);
  scene.add(porchBounce);

  function canvasTexture(size: number, draw: (ctx: CanvasRenderingContext2D, n: number) => void) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    draw(ctx, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 8;
    return texture;
  }
  const woodMap = canvasTexture(512, (ctx, n) => {
    ctx.fillStyle = '#9f7651'; ctx.fillRect(0, 0, n, n);
    for (let i = 0; i < 700; i++) {
      const y = random() * n;
      ctx.strokeStyle = `rgba(${random() > .5 ? '61,37,19' : '230,206,157'},${range(.035, .18)})`;
      ctx.lineWidth = range(.3, 2.2);
      ctx.beginPath();
      for (let x = 0; x <= n; x += 8) {
        const yy = y + Math.sin(x * .013 + y * .008) * 3 + Math.sin(x * .042 + y) * .7;
        if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
    for (let j = 0; j < 4; j++) {
      const x = range(60, 450), y = range(40, 470);
      for (let k = 0; k < 8; k++) {
        ctx.strokeStyle = `rgba(63,37,23,${.15 - k * .012})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.ellipse(x, y, 4 + k * 4.4, 1 + k * 1.7, 0, 0, Math.PI * 2); ctx.stroke();
      }
    }
  });
  const glazeMap = canvasTexture(256, (ctx, n) => {
    ctx.fillStyle = '#e4e0cf'; ctx.fillRect(0, 0, n, n);
    for (let i = 0; i < 6000; i++) {
      ctx.fillStyle = random() > .12 ? 'rgba(128,132,103,.025)' : 'rgba(108,93,66,.18)';
      ctx.beginPath(); ctx.arc(random() * n, random() * n, range(.15, .9), 0, 7); ctx.fill();
    }
  });
  const wood = new THREE.MeshStandardMaterial({ map: woodMap, roughness: .7, color: '#b4a28d', bumpMap: woodMap, bumpScale: .014 });
  const darkWood = new THREE.MeshStandardMaterial({ map: woodMap, color: '#5e5042', roughness: .88, bumpMap: woodMap, bumpScale: .018 });

  function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, position: number[] = [0, 0, 0], parent: THREE.Object3D = root) {
    const item = new THREE.Mesh(geometry, material);
    item.position.set(position[0], position[1], position[2]);
    item.castShadow = true; item.receiveShadow = true;
    parent.add(item); return item;
  }
  function box(w: number, h: number, d: number, material: THREE.Material, position: number[], parent = root) {
    return mesh(new THREE.BoxGeometry(w, h, d), material, position, parent);
  }
  function branch(a: THREE.Vector3, b: THREE.Vector3, r1: number, material: THREE.Material, parent: THREE.Object3D) {
    const curve = new THREE.CatmullRomCurve3([a, a.clone().lerp(b, .5), b]);
    return mesh(new THREE.TubeGeometry(curve, 4, r1, 6, false), material, [0, 0, 0], parent);
  }
  /** Folded blade with a raised midrib (the bird's tail). */
  function bladeGeometry(width: number, length: number, bend = .12, segments = 7) {
    const p: number[] = [], uv: number[] = [], indices: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const w = Math.pow(Math.sin(t * Math.PI), .82) * width;
      p.push(-w, bend * t * t, t * length, 0, bend * t * t + Math.sin(t * Math.PI) * width * .22, t * length, w, bend * t * t, t * length);
      uv.push(0, t, .5, t, 1, t);
      if (i < segments) {
        const a = i * 3;
        indices.push(a, a + 3, a + 1, a + 1, a + 3, a + 4, a + 1, a + 4, a + 2, a + 2, a + 4, a + 5);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geometry.setIndex(indices); geometry.computeVertexNormals(); return geometry;
  }

  // ---- Garden trees: lofted, branching, with dense leaf clusters ------------------------------------
  // The field beyond the wall falls into a broad hollow before rising to the far tree line; mist pools in it.
  const groundY = (x: number, z: number) => -0.17 + Math.sin(x * .4 + z * .13) * .045 + Math.cos(x * .17 - z * .27) * .035
    + Math.max(0, -z - 14) * 0.018 + Math.sin(x * 0.05 + 1.3) * Math.max(0, -z - 20) * 0.012
    - 1.45 * Math.exp(-(((z + 33) / 10) ** 2)) * (0.75 + 0.25 * Math.sin(x * 0.07 + 0.8));
  const treeSpecs: Array<[number, number, number, number, number]> = [
    // x, z, height, trunk radius, detail (2 hero, 1 mid)
    [-5.7, -6.2, 10.4, 0.34, 2], [7.2, -9.6, 10.8, 0.35, 2], [-12.8, -19, 12, 0.38, 1],
    [12.6, -23.5, 12.6, 0.38, 1], [-6.8, -29, 11.4, 0.34, 1], [3.4, -41, 13, 0.4, 1], [19, -31, 11.6, 0.36, 1],
  ];
  // Each tree carries its own leaf tint (and every card a little jitter), so crowns never match.
  const treeTints = [[1, 1, 0.94], [0.9, 1, 0.88], [0.8, 0.92, 0.86], [1.06, 1.02, 0.78], [0.74, 0.86, 0.84], [0.95, 0.98, 0.82], [0.82, 0.94, 0.9]];
  const tintRandom = seeded(6021);
  const trees: TreeBuild[] = treeSpecs.map(([x, z, height, radius, detail], i) => {
    const tree = buildTree({
      seed: 300 + i * 17, base: new THREE.Vector3(x, groundY(x, z) - 0.05, z), height, radius, form: 'broadleaf',
      lean: [(random() - 0.5) * 0.8, (random() - 0.5) * 0.6], gnarl: 0.5, flare: 0.6, buttresses: 4,
      limbs: detail === 2 ? 9 : 9, levels: 2, children: 3, crownStart: detail === 2 ? 0.3 : 0.2 + (i % 3) * 0.04, spread: detail === 2 ? 0.4 : 0.44 + (i % 2) * 0.06, curl: detail === 2 ? 0.55 : 0.35,
      radial: detail === 2 ? 22 : 12, ringsPerMetre: detail === 2 ? 5 : 2.4, displace: detail === 2 ? 0.014 : 0,
      barkScale: 2.4, barkStretch: 3.2, flex: 0.8,
      leaves: { cardsPerTwig: detail === 2 ? 30 : 22, size: detail === 2 ? 0.95 : 1.2, reach: 0.8, atlasColumns: 4, crownNormals: detail === 2 ? 0.62 : 0.55, shade: detail === 2 ? [0.26, 1.08] : [0.18, 1.06], skyward: 0.3, fill: 0.45 },
    });
    tintGeometry(tree.leaves, new THREE.Color(...treeTints[i]), 0.2, tintRandom);
    return tree;
  });
  // Two staggered rows of field-edge trees on the far rise, varied in height, spread and colour.
  const farRandom = seeded(5511);
  for (let i = 0; i < 18; i++) {
    const row = i % 2;
    const x = -50 + i * 5.8 + (farRandom() - 0.5) * 3, z = -50 - row * 6 - farRandom() * 5;
    const tree = buildTree({
      seed: 900 + i, base: new THREE.Vector3(x, groundY(x, z) - 0.1, z), height: 8 + farRandom() * 6, radius: 0.26 + farRandom() * 0.1, form: 'broadleaf',
      crownStart: 0.28 + farRandom() * 0.16, limbs: 7, levels: 1, children: 4, spread: 0.3 + farRandom() * 0.16, curl: 0.6, radial: 6, ringsPerMetre: 1, flex: 0.5,
      leaves: { cardsPerTwig: 14, size: 1.75, reach: 0.85, atlasColumns: 4, crownNormals: 0.75, shade: [0.3, 1], fill: 0.35 },
    });
    tintGeometry(tree.leaves, new THREE.Color().setRGB(0.9 + farRandom() * 0.2, 0.95 + farRandom() * 0.1, 0.8 + farRandom() * 0.2), 0.15, tintRandom);
    trees.push(tree);
  }
  const leafAtlas = leafSprayAtlas({ seed: 77, palette: { base: '#557d2c', light: '#a6c457', dark: '#2c4a1b', stem: '#5a4a32' }, columns: 4, leaf: 0.17, aspect: 0.46, leaves: 11, twigs: 4, round: 0.4 });
  const canopy = crownCanopy({
    key: 'morning', toSun: TO_SUN, time, density: 1.4, gaps: 0.1,
    crowns: trees.slice(0, 7).map(t => ({ centre: t.crown.centre, radius: t.crown.radius.clone().multiplyScalar(0.86) })),
  });
  const wind = { time, mode: 'attribute' as const, sway: 0.35, flutter: 0.025, direction: [1, 0.3] as [number, number], speed: 0.9 };
  const barkMaterial = applyFoliageShading(applyBarkSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.88 }), {
    key: 'morning-bark', scale: 2.4, stretch: 3.2, depth: 0.016, plate: '#7c7467', fissure: '#2a241d',
    lichen: { color: '#a3a88a', amount: 0.45 }, moss: { color: '#4d5f27', amount: 0.35, below: 0.25, side: new THREE.Vector3(0.6, 0, 0.8) },
  }), { key: 'morning-bark', canopy, wind });
  const foliage = (key: string, map: THREE.Texture, roughness = 0.5) => applyFoliageShading(new THREE.MeshStandardMaterial({ map, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, alphaToCoverage: true, roughness, metalness: 0 }), {
    key, canopy, wind, sharedNormals: true, coverage: true,
    translucency: { tint: '#ffe58a', back: 0.8, forward: 1.8 },
  });
  const leafMaterial = foliage('morning-leaves', leafAtlas);

  // Garden shrubs and the hedgerow: three kinds with their own leaves, habit and colour.
  // 0 a dense rounded mound of small leaves, 1 arching stems of narrow leaves, 2 broad toothed leaves.
  const shrubAtlases = [
    leafSprayAtlas({ seed: 131, palette: { base: '#3f6a2a', light: '#7fa64a', dark: '#22401a', stem: '#4a3e2c' }, columns: 4, cell: 256, leaf: 0.12, aspect: 0.55, leaves: 15, twigs: 5, round: 0.6 }),
    leafSprayAtlas({ seed: 137, palette: { base: '#6f9134', light: '#b5cd62', dark: '#40601f', stem: '#6a5433' }, columns: 4, cell: 256, leaf: 0.16, aspect: 0.28, leaves: 13, twigs: 4, round: 0.1 }),
    leafSprayAtlas({ seed: 139, palette: { base: '#466e2e', light: '#86ad55', dark: '#264420', stem: '#4d4030' }, columns: 4, cell: 256, leaf: 0.24, aspect: 0.62, leaves: 6, twigs: 3, round: 0.55, toothed: true }),
  ];
  const shrubKinds = [
    { limbs: 11, children: 4, spread: 0.62, curl: 0.35, cards: 8, size: (h: number) => 0.3 + h * 0.1, normals: 0.85, skyward: 0.45, fill: 0.7, squash: [1.25, 0.78] },
    { limbs: 10, children: 3, spread: 0.75, curl: 1.3, cards: 8, size: (h: number) => 0.4 + h * 0.08, normals: 0.65, skyward: 0.2, fill: 0.3, squash: [1.05, 1] },
    { limbs: 8, children: 3, spread: 0.55, curl: 0.7, cards: 6, size: (h: number) => 0.46 + h * 0.1, normals: 0.75, skyward: 0.35, fill: 0.45, squash: [1.1, 0.9] },
  ];
  const shrubSpots: Array<[number, number, number, number]> = [
    [-2.6, -3.4, 1.1, 0], [-3.5, -4.7, 1.5, 1], [-1.6, -5.0, 0.85, 2], [3.5, -5.3, 1.2, 2], [4.7, -6.5, 1.7, 1], [2.5, -6.8, 0.9, 0],
    [-6.8, -9.2, 1.6, 0], [-8.3, -10.6, 2.0, 1], [8.8, -11.2, 1.8, 0], [10.6, -11.7, 2.2, 2], [-10.6, -11.4, 1.9, 2],
  ];
  for (let i = 0; i < 18; i++) shrubSpots.push([-34 + i * 4.1 + (farRandom() - 0.5) * 1.5, -24 - Math.sin(i * 0.9) * 2.2 - farRandom() * 1.5, 1.8 + farRandom() * 1.4, i % 3]);
  const shrubLeaves: THREE.BufferGeometry[][] = [[], [], []];
  const shrubRandom = seeded(7177);
  shrubSpots.forEach(([x, z, h, kind], i) => {
    const k = shrubKinds[kind];
    const far = i >= 11;
    const shrub = buildTree({
      seed: 1400 + i * 3, base: new THREE.Vector3(0, 0, 0), height: h, radius: 0.03 * h, form: 'sapling',
      limbs: far ? k.limbs - 3 : k.limbs, levels: 1, children: k.children, crownStart: 0.04, spread: k.spread, curl: k.curl, radial: 5, ringsPerMetre: 3, flex: 1.1,
      leaves: { cardsPerTwig: far ? Math.round(k.cards * 0.7) : k.cards, size: k.size(h) * (far ? 1.25 : 1), reach: 0.85, atlasColumns: 4, crownNormals: k.normals, shade: [0.28, 1.06], skyward: k.skyward, fill: k.fill },
    });
    const s = k.squash[0] * (0.9 + shrubRandom() * 0.25);
    const matrix = new THREE.Matrix4().compose(new THREE.Vector3(x, groundY(x, z) - 0.05, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), shrubRandom() * 6.28), new THREE.Vector3(s, k.squash[1] * (0.9 + shrubRandom() * 0.2), s * (0.85 + shrubRandom() * 0.3)));
    shrub.bark.applyMatrix4(matrix);
    shrub.leaves?.applyMatrix4(matrix);
    const hue = kind === 1 ? [1.08, 1.06, 0.85] : kind === 0 ? [0.92, 1, 0.95] : [1, 1, 0.92];
    tintGeometry(shrub.leaves, new THREE.Color(hue[0] * (0.9 + shrubRandom() * 0.2), hue[1] * (0.92 + shrubRandom() * 0.16), hue[2]), 0.22, shrubRandom);
    if (shrub.leaves) shrubLeaves[kind].push(shrub.leaves);
    trees.push({ ...shrub, leaves: null });
  });
  const bark = new THREE.Mesh(concatGeometries(trees.map(t => t.bark)), barkMaterial);
  bark.castShadow = true; bark.receiveShadow = true; root.add(bark);
  const leafGeometries = trees.map(t => t.leaves).filter((g): g is THREE.BufferGeometry => !!g);
  const leaves = new THREE.Mesh(concatGeometries(leafGeometries), leafMaterial);
  leaves.receiveShadow = true; root.add(leaves);
  shrubLeaves.forEach((parts, kind) => {
    // Shrubs are not in the analytic crown set, so their cut-out leaves cast real (static) shadow-map shadows.
    const mesh = new THREE.Mesh(concatGeometries(parts), foliage(`morning-shrub-${kind}`, shrubAtlases[kind], 0.46));
    mesh.castShadow = true; mesh.receiveShadow = true; root.add(mesh);
    parts.forEach(g => g.dispose());
  });
  trees.forEach(t => { t.bark.dispose(); t.leaves?.dispose(); });

  // ---- Lawn, beds and fields ---------------------------------------------------------------------
  const pathX = (z: number) => .15 + Math.sin(Math.max(0, Math.min(1, (-z - .8) / 10.5)) * 4) * 1.6;
  const groundMaterial = applyFoliageShading(applyForestFloor(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.9 }), {
    key: 'morning-lawn', soil: '#3d3324', litter: '#6c6a3c', litterDark: '#3e4424', moss: '#4a6a26', mossAmount: 0.45,
    grass: { color: '#48682a', amount: 0.9 }, bump: 0.6,
  }), { key: 'morning-lawn', canopy });
  const ground = new THREE.Mesh(terrainGeometry({ width: 120, zNear: 1.2, zFar: -95, columns: 150, rows: 150, height: groundY }), groundMaterial);
  ground.receiveShadow = true; root.add(ground);

  const grassWind = { time, mode: 'height' as const, height: 1, sway: 0.06, flutter: 0.012, direction: [1, 0.3] as [number, number], speed: 1 };
  // Dew: beads on the blades catch the low sun (only where it reaches) and twinkle as the grass stirs.
  const lawn = applyDewGlints(grassMaterial({ key: 'morning-lawn', canopy, wind: grassWind, roughness: 0.36, translucency: 0.7 }), { key: 'morning-dew', toSun: TO_SUN, cells: 50, cover: 0.5, strength: 14 });
  const nearGrass = scatter(33000, 811, r => {
    const z = -0.2 - Math.pow(r(), 1.35) * 12.4;
    const x = (r() - 0.5) * 30;
    if (Math.abs(x - pathX(z)) < 0.55 && z > -11.4) return null;
    if (z < -11.9 && z > -12.9) return null;
    const h = 0.12 + r() * 0.2 + (Math.abs(x - pathX(z)) > 3 ? r() * 0.12 : 0);
    const dry = r() < 0.12;
    return { x, y: groundY(x, z) - 0.01, z, yaw: r() * Math.PI * 2, tilt: (r() - 0.5) * 0.5, scale: new THREE.Vector3(0.014 + r() * 0.011, h, h), color: dry ? srgb(0.13 + r() * 0.03, 0.4, 0.42 + r() * 0.1) : srgb(0.2 + r() * 0.07, 0.48 + r() * 0.2, 0.26 + r() * 0.16) };
  });
  // Three-segment blades only where their curve is visible; two segments further out (triangle budget).
  root.add(instanced(grassBlade(3, 0.4), lawn, nearGrass.filter(p => p.z > -4.5), { cast: false, receive: true }));
  root.add(instanced(grassBlade(2, 0.4), lawn, nearGrass.filter(p => p.z <= -4.5), { cast: false, receive: true }));
  const fieldGrass = scatter(8000, 812, r => {
    const z = -13.2 - r() * 30, x = (r() - 0.5) * (40 + -z * 0.8);
    const h = 0.4 + r() * 0.5;
    return { x, y: groundY(x, z) - 0.02, z, yaw: r() * Math.PI * 2, tilt: (r() - 0.5) * 0.4, scale: new THREE.Vector3(0.025 + r() * 0.02, h, h), color: srgb(0.14 + r() * 0.1, 0.35 + r() * 0.2, 0.32 + r() * 0.16) };
  });
  root.add(instanced(grassBlade(2, 0.5), lawn, fieldGrass, { cast: false, receive: true }));

  // Cosmos and calendula: thin stems, translucent petals that glow against the low sun.
  const petalMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.6 }), {
    key: 'morning-petals', canopy, wind: grassWind, translucency: { tint: '#fff2d8', back: 0.9, forward: 1.4 },
  });
  const stemMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ color: '#4c6a2c', roughness: 0.7 }), { key: 'morning-stems', canopy, wind: grassWind });
  const flowerStems: Placement[] = [], petals: Placement[] = [], hearts: Placement[] = [];
  const beds: Array<[number, number, number]> = [[-2.6, -3.6, 1.1], [3.6, -5.6, 1.2], [-7, -9.4, 1.3]];
  const flowerRandom = seeded(4401);
  for (let i = 0; i < 170; i++) {
    const [bx, bz, spread] = beds[i % 3];
    const a = flowerRandom() * Math.PI * 2, d = Math.sqrt(flowerRandom()) * spread;
    const x = bx + Math.cos(a) * d * 1.3, z = bz + Math.sin(a) * d * 0.9;
    const height = 0.45 + flowerRandom() * 0.5;
    const y0 = groundY(x, z) - 0.02;
    flowerStems.push({ x, y: y0, z, yaw: 0, tilt: (flowerRandom() - 0.5) * 0.25, scale: new THREE.Vector3(1, height, 1), color: new THREE.Color(1, 1, 1) });
    const color = i % 5 === 0 ? srgb(0.12, 0.25, 0.9) : i % 3 === 0 ? srgb(0.085, 0.85, 0.58) : srgb(0.95, 0.55, 0.78);
    const yaw0 = flowerRandom() * Math.PI;
    for (let k = 0; k < 8; k++) petals.push({ x, y: y0 + height, z, yaw: yaw0 + k * Math.PI / 4, tilt: -1.25 + flowerRandom() * 0.3, scale: new THREE.Vector3(0.05, 0.075, 0.075), color });
    hearts.push({ x, y: y0 + height + 0.005, z, yaw: 0, scale: new THREE.Vector3(0.022, 0.012, 0.022), color: srgb(0.11, 0.8, 0.3) });
  }
  const stemGeometry = new THREE.CylinderGeometry(0.004, 0.006, 1, 4, 3); stemGeometry.translate(0, 0.5, 0);
  root.add(instanced(stemGeometry, stemMaterial, flowerStems, { cast: false, receive: true }));
  root.add(instanced(grassBlade(2, 0.25), petalMaterial, petals, { cast: false, receive: true }));
  root.add(instanced(new THREE.SphereGeometry(1, 8, 6), new THREE.MeshStandardMaterial({ roughness: 0.9 }), hearts, { cast: false, receive: true }));

  // ---- Stone: stepping stones and a lichen-covered dry-stone wall --------------------------------
  const stoneMaterial = applyFoliageShading(applyRockSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', vertexColors: true, roughness: 0.9 }), {
    key: 'morning-stone', scale: 2.2, bump: 1.1, stain: '#7a6a4a', stainAmount: 0.25, strata: 0.15, cavity: 0.6, drips: 0,
    moss: { color: '#56692c', amount: 0.55 },
  }), { key: 'morning-stone', canopy });
  const stoneParts: THREE.BufferGeometry[] = [];
  const stoneVariants = [0, 1, 2, 3].map(i => boulderGeometry(41 + i, 2));
  // Wall stones are 15 m away: coarser shells, the rock shader carries their surface.
  const wallVariants = [0, 1, 2, 3].map(i => boulderGeometry(51 + i, 1));
  const addStone = (x: number, y: number, z: number, sx: number, sy: number, sz: number, yaw: number, tint: THREE.Color) => {
    const g = (z < -10 ? wallVariants : stoneVariants)[stoneParts.length % 4].clone();
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(range(-0.08, 0.08), yaw, range(-0.08, 0.08))), new THREE.Vector3(sx, sy, sz)));
    const colors = new Float32Array(g.attributes.position.count * 3);
    for (let i = 0; i < colors.length; i += 3) colors.set([tint.r, tint.g, tint.b], i);
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    stoneParts.push(g);
  };
  for (let i = 0; i < 20; i++) {
    const t = i / 19, z = -0.8 - t * 10.4, x = pathX(z);
    addStone(x + range(-0.08, 0.08), groundY(x, z) - 0.03, z, range(0.3, 0.42), range(0.06, 0.09), range(0.24, 0.32), range(0, 6.28), srgb(0.11, range(0.05, 0.12), range(0.5, 0.62)));
  }
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 58; col++) {
      const x = -14 + col * 0.52 + (row % 2) * 0.24;
      if (x > 5.15 && x < 7.55) continue;
      const y = -0.08 + row * 0.24 + range(-0.02, 0.02);
      addStone(x, y, -12.4 + range(-0.05, 0.05), range(0.27, 0.34), range(0.13, 0.17), range(0.26, 0.33), range(-0.3, 0.3), srgb(range(0.1, 0.15), range(0.05, 0.14), range(0.46, 0.62)));
    }
  }
  for (let col = 0; col < 40; col++) {
    const x = -14 + col * 0.74;
    if (x > 5.0 && x < 7.6) continue;
    addStone(x, 0.86, -12.4, range(0.4, 0.46), 0.09, range(0.34, 0.4), range(-0.15, 0.15), srgb(0.12, range(0.06, 0.12), range(0.52, 0.6)));
  }
  const stones = new THREE.Mesh(concatGeometries(stoneParts), stoneMaterial);
  stones.castShadow = true; stones.receiveShadow = true; root.add(stones);
  stoneParts.forEach(g => g.dispose()); stoneVariants.forEach(g => g.dispose()); wallVariants.forEach(g => g.dispose());
  // The weathered slatted gate in the wall's gap.
  const gateWood = applyFoliageShading(new THREE.MeshStandardMaterial({ map: woodMap, color: '#8a7f70', roughness: 0.92 }), { key: 'morning-gate', canopy });
  for (const x of [5.3, 7.4]) box(.15, 1.4, .15, gateWood, [x, .45, -12.1]);
  for (let i = 0; i < 8; i++) box(.12, 1.04, .05, gateWood, [5.53 + i * .23, .47, -12.12]);
  box(1.95, .1, .08, gateWood, [6.36, .25, -12.05]);
  box(1.95, .1, .08, gateWood, [6.36, .8, -12.05]);

  // Far ridgelines: forested hills dissolving into the morning haze.
  const hillMaterial = new THREE.MeshStandardMaterial({ color: '#4d6040', roughness: 1 });
  for (let h = 0; h < 3; h++) {
    const g = new THREE.PlaneGeometry(220, 60, 110, 24);
    g.rotateX(-Math.PI / 2);
    const points = g.attributes.position;
    for (let i = 0; i < points.count; i++) {
      const x = points.getX(i), z = points.getZ(i);
      points.setY(i, Math.max(0, Math.sin((z + 30) / 60 * Math.PI)) * (6 + h * 3.5 + Math.sin(x * .05 + h) * 3 + Math.sin(x * .13 + h * 1.9) * 1.4 + Math.sin(x * 0.4 + h) * 0.3));
    }
    g.computeVertexNormals();
    const hill = mesh(g, hillMaterial, [h * 9 - 12, -0.6, -88 - h * 24]);
    hill.castShadow = false;
  }

  // ---- Porch: planks, posts, roof and plaster wall frame the seated view -------------------------
  box(11, .23, 7.5, darkWood, [0, -.07, 4.1]);
  for (let i = 0; i < 19; i++) {
    const plank = box(10.8, .075, .385, wood, [0, .09 + range(-.004, .004), .45 + i * .397]);
    plank.material = wood.clone();
    (plank.material as THREE.MeshStandardMaterial).color.setHSL(.08, range(.12, .2), range(.6, .7), THREE.SRGBColorSpace);
  }
  box(10.9, .16, .17, darkWood, [0, .01, .2]);
  box(4.8, .18, .72, wood, [-.2, -.17, -.23]);
  box(.25, 3.75, .27, darkWood, [-3.55, 1.9, .61]);
  box(.25, 3.75, .27, darkWood, [4.15, 1.9, .62]);
  box(8.0, .22, .32, darkWood, [.25, 3.75, .62]);
  box(9.1, .13, 5.4, darkWood, [.25, 3.95, 3.2]);
  for (let i = 0; i < 9; i++) box(.1, .17, 5.25, wood, [-3.8 + i, 3.81, 3.1]);
  const plaster = new THREE.MeshStandardMaterial({ color: '#c9c0aa', roughness: .96 });
  box(.25, 3.7, 6.5, plaster, [-4.3, 1.9, 3.7]);
  box(.11, .14, 6.5, darkWood, [-4.14, .42, 3.7]);
  box(.11, .12, 6.5, darkWood, [-4.14, 2.8, 3.7]);

  // A tactile oiled table, linen and celadon tea set occupy the seated near field.
  const table = new THREE.Group(); root.add(table);
  table.position.set(.26, 0, 3.03);
  // These bounded tabletop maps have their own deterministic noise.
  const materialNoise = (x: number, y: number) => {
    const value = Math.sin(x * 127.1 + y * 311.7 + 71.2) * 43758.5453;
    return value - Math.floor(value);
  };
  const woodGrowth = (u: number, v: number) => {
    const knot = Math.exp(-Math.pow((u - .24) / .21, 2) - Math.pow((v - .74) / .12, 2));
    // Variable annual-ring spacing and a small off-centre knot bend the fibers;
    // no repeated uniform dark ruled lines across the whole board.
    return v * 51 + Math.sin(v * 9 + u * 2.3) * 1.25 + Math.sin(v * 24 - u * 5.4) * .47
      + Math.sin(u * 19 + v * 13) * .17 + knot * Math.sin((v - .74) * 31) * 4;
  };
  const tableColor = canvasTexture(512, (ctx, n) => {
    const pixels = ctx.createImageData(n, n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const u = x / n, v = y / n;
      const growth = woodGrowth(u, v);
      const latewood = Math.pow(.5 + .5 * Math.sin(growth * Math.PI * 2), 21);
      const fiber = Math.sin(v * 2200 + Math.sin(u * 13 + v * 5) * 4 + Math.sin(u * 43) * .4) * 2;
      const tone = -2 - latewood * 13 + Math.sin(v * 42 + u * .7) * 2 + fiber + (materialNoise(x, y) - .5) * 5;
      const index = (y * n + x) * 4;
      pixels.data.set([166 + tone, 125 + tone * .79, 83 + tone * .57, 255], index);
    }
    ctx.putImageData(pixels, 0, 0);
  });
  // Red stores shallow pore height; green stores oil/latewood roughness.
  // Linear data maps keep those quantities independent of display color space.
  const tableSurface = canvasTexture(512, (ctx, n) => {
    const pixels = ctx.createImageData(n, n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const u = x / n, v = y / n;
      const growth = woodGrowth(u, v);
      const pore = Math.pow(.5 + .5 * Math.sin(growth * Math.PI * 2), 21);
      const noise = materialNoise(x, y);
      pixels.data.set([151 - pore * 37 + noise * 12, 155 + pore * 28 + noise * 12, 128, 255], (y * n + x) * 4);
    }
    ctx.putImageData(pixels, 0, 0);
  });
  tableSurface.colorSpace = THREE.NoColorSpace;
  tableColor.wrapS = tableColor.wrapT = tableSurface.wrapS = tableSurface.wrapT = THREE.ClampToEdgeWrapping;
  const tableWood = new THREE.MeshPhysicalMaterial({
    map: tableColor, color: '#e8dccb', roughness: .9, roughnessMap: tableSurface,
    bumpMap: tableSurface, bumpScale: .0022, clearcoat: .12, clearcoatRoughness: .6,
  });
  const ceramicSurface = canvasTexture(256, (ctx, n) => {
    const pixels = ctx.createImageData(n, n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const fine = materialNoise(x * 1.4, y * 1.4);
      const pooling = .5 + .5 * Math.sin(x * .041 + Math.sin(y * .027) * 2.6);
      pixels.data.set([118 + fine * 26, 181 + fine * 32 + pooling * 25, 128, 255], (y * n + x) * 4);
    }
    ctx.putImageData(pixels, 0, 0);
  });
  ceramicSurface.colorSpace = THREE.NoColorSpace;
  // Short-range porch bounce gives the glaze a local reflected-light highlight.
  const tableBounce = new THREE.PointLight('#fff0d4', .5, 2.25, 2);
  tableBounce.position.set(-.55, 1.88, .69); table.add(tableBounce);
  const glazeBounce = new THREE.PointLight('#fff5dd', .35, 1.5, 2);
  glazeBounce.position.set(-.38, .962, .72); table.add(glazeBounce);

  const contactMap = canvasTexture(128, (ctx, n) => {
    const gradient = ctx.createRadialGradient(n / 2, n / 2, n * .13, n / 2, n / 2, n * .5);
    gradient.addColorStop(0, 'rgba(38,26,15,.68)');
    gradient.addColorStop(.48, 'rgba(38,26,15,.28)');
    gradient.addColorStop(1, 'rgba(38,26,15,0)');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, n, n);
  });
  const bookContactMap = canvasTexture(128, (ctx, n) => {
    const pixels = ctx.createImageData(n, n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const edge = Math.max(Math.abs(x / n - .5) / .46, Math.abs(y / n - .5) / .46);
      const opacity = Math.pow(Math.max(0, Math.min(1, (1 - edge) / .22)), 1.6) * .38;
      pixels.data.set([40, 31, 22, opacity * 255], (y * n + x) * 4);
    }
    ctx.putImageData(pixels, 0, 0);
  });
  function contact(width: number, depth: number, x: number, y: number, z: number, parent: THREE.Object3D, map = contactMap, opacity = 1) {
    const shadow = mesh(new THREE.PlaneGeometry(width, depth), new THREE.MeshBasicMaterial({
      map, transparent: true, opacity, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1,
    }), [x, y, z], parent);
    shadow.rotation.x = -Math.PI / 2;
    shadow.castShadow = false; shadow.receiveShadow = false;
    return shadow;
  }
  const topShape = new THREE.Shape();
  const tw = 1.85, td = 1.08, r = .12;
  topShape.moveTo(-tw / 2 + r, -td / 2);
  topShape.lineTo(tw / 2 - r, -td / 2); topShape.quadraticCurveTo(tw / 2, -td / 2, tw / 2, -td / 2 + r);
  topShape.lineTo(tw / 2, td / 2 - r); topShape.quadraticCurveTo(tw / 2, td / 2, tw / 2 - r, td / 2);
  topShape.lineTo(-tw / 2 + r, td / 2); topShape.quadraticCurveTo(-tw / 2, td / 2, -tw / 2, td / 2 - r);
  topShape.lineTo(-tw / 2, -td / 2 + r); topShape.quadraticCurveTo(-tw / 2, -td / 2, -tw / 2 + r, -td / 2);
  const topGeometry = new THREE.ExtrudeGeometry(topShape, { depth: .075, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: .012, bevelThickness: .011, curveSegments: 8 });
  topGeometry.rotateX(-Math.PI / 2);
  const topPositions = topGeometry.attributes.position, topUv = topGeometry.attributes.uv;
  for (let i = 0; i < topPositions.count; i++) topUv.setXY(i, topPositions.getX(i) / tw + .5, topPositions.getZ(i) / td + .5);
  const tableTop = mesh(topGeometry, tableWood, [0, .84, 0], table); tableTop.receiveShadow = true;
  for (const x of [-.7, .7]) for (const z of [-.36, .36]) box(.07, .77, .07, darkWood, [x, .45, z], table);
  const linenMap = canvasTexture(128, (ctx, n) => {
    ctx.fillStyle = '#e7dfc9'; ctx.fillRect(0, 0, n, n);
    for (let i = 0; i < n; i += 2) {
      ctx.fillStyle = 'rgba(120,111,91,.055)'; ctx.fillRect(i, 0, 1, n);
      ctx.fillStyle = 'rgba(255,255,236,.16)'; ctx.fillRect(0, i, n, 1);
    }
  });
  linenMap.repeat.set(2, 2);
  const linenMaterial = new THREE.MeshStandardMaterial({ color: '#e0d9c8', map: linenMap, bumpMap: linenMap, bumpScale: .0008, roughness: 1, side: THREE.DoubleSide });
  const linen = new THREE.PlaneGeometry(.71, .6, 12, 12);
  const lp = linen.attributes.position;
  for (let i = 0; i < lp.count; i++) lp.setZ(i, Math.sin(lp.getX(i) * 35) * .0017 + Math.cos(lp.getY(i) * 24) * .0012);
  linen.computeVertexNormals();
  const cloth = mesh(linen, linenMaterial, [.4, .93, .015], table); cloth.rotation.x = -Math.PI / 2; cloth.rotation.z = .14;
  const glaze = new THREE.MeshPhysicalMaterial({
    map: glazeMap, color: '#f0eadb', roughness: .29, roughnessMap: ceramicSurface,
    clearcoat: .86, clearcoatRoughness: .15, bumpMap: ceramicSurface, bumpScale: .0014,
  });
  const rimMaterial = new THREE.MeshStandardMaterial({ color: '#97815a', roughness: .64 });
  const teaSet = new THREE.Group(); table.add(teaSet); teaSet.position.set(-.15, .92, -.035);
  // The tabletop top is .926; the saucer's lowest surface is .928.
  // Small bound AO decals supplement the garden-scale shadow map at contact.
  contact(.73, .66, -.132, .927, -.021, table, contactMap, .76);
  const saucerProfile = [[0, .008], [.14, .008], [.2, .012], [.285, .035], [.32, .055], [.315, .069], [.27, .057], [.2, .027], [.14, .025], [0, .025]].map(([x, y]) => new THREE.Vector2(x, y));
  mesh(new THREE.LatheGeometry(saucerProfile, 48), glaze, [0, 0, 0], teaSet);
  const cupProfile = [[.13, .029], [.155, .033], [.168, .06], [.18, .19], [.206, .318], [.203, .33], [.187, .33], [.183, .312], [.16, .17], [.147, .065], [.12, .057], [0, .057], [0, .037]].map(([x, y]) => new THREE.Vector2(x, y));
  contact(.37, .35, 0, .0256, 0, teaSet, contactMap, .85);
  const foot = mesh(new THREE.TorusGeometry(.13, .003, 8, 64), new THREE.MeshStandardMaterial({ color: '#b2a189', roughness: .87 }), [0, .028, 0], teaSet);
  foot.rotation.x = Math.PI / 2;
  const cup = mesh(new THREE.LatheGeometry(cupProfile, 64), glaze, [0, .001, 0], teaSet);
  cup.name = 'morning-tea-cup';
  const rim = mesh(new THREE.TorusGeometry(.197, .004, 6, 64), rimMaterial, [0, .333, 0], teaSet); rim.rotation.x = Math.PI / 2;
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(.19, .294, 0), new THREE.Vector3(.31, .305, 0), new THREE.Vector3(.356, .224, 0), new THREE.Vector3(.318, .124, 0), new THREE.Vector3(.17, .103, 0),
  ]);
  const handle = mesh(new THREE.TubeGeometry(handleCurve, 28, .025, 8, false), glaze, [0, .001, 0], teaSet);
  handle.name = 'morning-tea-cup-handle';
  const tea = mesh(new THREE.CircleGeometry(.183, 64), new THREE.MeshPhysicalMaterial({ color: '#56561f', roughness: .16, metalness: 0, specularIntensity: .3 }), [0, .309, 0], teaSet);
  tea.rotation.x = -Math.PI / 2; tea.name = 'morning-tea-surface';
  const meniscus = mesh(new THREE.TorusGeometry(.18, .003, 5, 64), new THREE.MeshPhysicalMaterial({ color: '#c5c69e', roughness: .2, metalness: .2 }), [0, .310, 0], teaSet); meniscus.rotation.x = Math.PI / 2;
  const rippleMaterials: THREE.MeshBasicMaterial[] = [];
  const ripples: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: '#f0e9c6', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
    const ring = mesh(new THREE.RingGeometry(.9, 1, 48), mat, [0, .311 + i * .0002, 0], teaSet); ring.rotation.x = -Math.PI / 2;
    rippleMaterials.push(mat); ripples.push(ring);
  }
  // A modest book is closed and partly beneath the linen, with independent page edges.
  const book = new THREE.Group(); table.add(book); book.position.set(.5, .9605, -.13); book.rotation.y = -.18;
  const bookContact = contact(.435, .565, .5, .9331, -.13, table, bookContactMap);
  bookContact.rotation.z = -.18;
  const bookCover = new THREE.MeshStandardMaterial({ color: '#4f5a4a', roughness: .95 });
  box(.35, .038, .48, new THREE.MeshStandardMaterial({ color: '#cfc4a2', roughness: 1 }), [0, 0, 0], book);
  box(.37, .007, .5, bookCover, [0, .023, 0], book);
  box(.37, .007, .5, bookCover, [0, -.023, 0], book);
  box(.015, .055, .5, bookCover, [-.18, 0, 0], book);
  for (let i = 0; i < 4; i++) box(.33, .001, .003, new THREE.MeshStandardMaterial({ color: '#b5ab8e', roughness: 1 }), [.007, -.012 + i * .007, .241], book);

  const steamMaterials: THREE.ShaderMaterial[] = [];
  for (let i = 0; i < 3; i++) {
    const material = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
      uniforms: { time: { value: 0 }, strength: { value: .18 }, phase: { value: i * 2.13 } },
      vertexShader: `uniform float time;uniform float phase;varying vec2 vUv;void main(){vUv=uv;vec3 p=position;p.x+=sin(uv.y*8.-time*.55+phase)*.038*uv.y;p.z+=cos(uv.y*7.+time*.4+phase)*.025*uv.y;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
      fragmentShader: `uniform float time;uniform float phase;uniform float strength;varying vec2 vUv;void main(){float a=exp(-pow((vUv.x-.5)*5.,2.));a*=sin(vUv.y*3.14159)*pow(1.-vUv.y,1.2);a*=.65+.35*sin(vUv.y*22.-time*1.1+phase);gl_FragColor=vec4(1.2,1.15,1.05,a*strength);}`,
    });
    const steam = mesh(new THREE.PlaneGeometry(.11, .58, 4, 18), material, [(i - 1) * .045, .601 + i * .035, -.015], teaSet);
    steam.rotation.y = (i - 1) * .55; steam.castShadow = false; steam.receiveShadow = false;
    steamMaterials.push(material);
  }

  // One low-contrast bird perched on the wall; its tiny head turn stays unintrusive.
  const bird = new THREE.Group(); root.add(bird); bird.position.set(-1.35, .96, -12.32); bird.rotation.y = .9;
  const feather = new THREE.MeshStandardMaterial({ color: '#5d5d52', roughness: 1 });
  const birdBody = mesh(new THREE.SphereGeometry(1, 16, 12), feather, [0, .063, 0], bird); birdBody.scale.set(.06, .072, .112); birdBody.rotation.x = -.3;
  const head = new THREE.Group(); bird.add(head); head.position.set(0, .13, -.064);
  mesh(new THREE.SphereGeometry(.047, 14, 10), feather, [0, 0, 0], head);
  const beak = mesh(new THREE.ConeGeometry(.013, .053, 6), new THREE.MeshStandardMaterial({ color: '#6b5636', roughness: .85 }), [0, -.006, -.061], head); beak.rotation.x = -Math.PI / 2;
  for (const x of [-.027, .027]) branch(new THREE.Vector3(x, .016, 0), new THREE.Vector3(x, -.03, -.01), .006, feather, bird);
  const tail = mesh(bladeGeometry(.035, .16, .01, 3), feather, [0, .066, .058], bird); tail.rotation.x = -.36;

  let touchedAt = -100;
  return {
    interactionTargets: [cup, tea, handle],
    interact(_hit, now) { touchedAt = now; },
    post: {
      exposure: 1.08, bloomStrength: 0.08, bloomThreshold: 0, aoStrength: 0.8, aoRadius: 0.4,
      saturation: 1.08, contrast: 1.14, shadowTint: [0.86, 0.95, 1.1], highlightTint: [1.06, 1.0, 0.92], vignette: 0.34, grain: 0.02,
    },
    prepare(renderer) { environment = bakeEnvironment(renderer, scene, sky, { intensity: 0.4 }); },
    // Near garden stays crisp; mist lies in the hollow and in banks between the tree rows, lit gold toward the sun.
    createVolume: () => createWoodsVolume({
      canopy, toSun: TO_SUN, sun: new THREE.Color(1.0, 0.76, 0.5).multiplyScalar(1.35), ambient: new THREE.Color(0.34, 0.4, 0.52).multiplyScalar(0.22),
      haze: [0.0034, 0.07, -1.2, 140], mist: [0.06, 0.55, 0.1, 0.03], anisotropy: 0.66, steps: 28,
      clear: [3, 12], banks: [[26, 7, 0.05, 1.9], [50, 10, 0.03, 2.4], [80, 16, 0.02, 3]],
    }),
    resize(aspect) {
      camera.position.set(0, aspect < .8 ? 1.64 : 1.68, aspect < .8 ? 5 : 4.8);
      camera.fov = aspect < .8 ? 58 : 53;
      camera.lookAt(aspect < .8 ? .04 : 0, aspect < .8 ? .62 : 1.25, -8);
      camera.updateProjectionMatrix();
      table.position.x = aspect < .8 ? .12 : .26;
    },
    update(now) {
      time.value = now;
      const elapsed = now - touchedAt;
      const pulse = elapsed >= 0 && elapsed < 4 ? Math.exp(-elapsed * .8) : 0;
      for (let i = 0; i < ripples.length; i++) {
        const phase = elapsed * .85 - i * .3;
        const t = phase - Math.floor(phase);
        ripples[i].scale.setScalar(.02 + t * .15);
        rippleMaterials[i].opacity = phase >= 0 ? pulse * (1 - t) * .31 : 0;
      }
      for (const mat of steamMaterials) {
        mat.uniforms.time.value = now;
        mat.uniforms.strength.value = .17 + pulse * .14;
      }
      head.rotation.y = Math.sin(now * .15) * .2;
    },
    dispose() { environment?.dispose(); environment = null; },
  };
}
