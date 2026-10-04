import * as THREE from 'three';
import type { WorldBuild } from './contracts';
import { wood, stone, fabric, rough, rounded } from './materials';

// Independently authored geometry. No external model, image, shader or demo code.
// The garden is built in metres around a reclining viewer, not a miniature set.
function randomSeed(seed: number) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 4294967296; };
}
function cylinderBetween(a: THREE.Vector3, b: THREE.Vector3, r: number, material: THREE.Material, top = r) {
  const d = b.clone().sub(a);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(top, r, d.length(), 10), material);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

/** A slightly folded lanceolate olive leaf, with a raised central vein. */
function leafGeometry() {
  const vertices: number[] = [], uvs: number[] = [], indices: number[] = [];
  for (let row = 0; row <= 5; row++) {
    const t = row / 5, width = Math.sin(t * Math.PI) * 0.035;
    for (let col = 0; col < 3; col++) {
      vertices.push((col - 1) * width, t * 0.17, Math.sin(t * Math.PI) * (col === 1 ? 0.009 : -0.005));
      uvs.push(col / 2, t);
    }
  }
  for (let row = 0; row < 5; row++) for (let col = 0; col < 2; col++) {
    const i = row * 3 + col;
    indices.push(i, i + 1, i + 3, i + 1, i + 4, i + 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(indices); g.computeVertexNormals();
  return g;
}

/** Narrow, cupped foliage for the four trees close enough to resolve a leaf. */
function nearLeafGeometry() {
  const vertices: number[] = [], indices: number[] = [];
  for (let row = 0; row <= 7; row++) {
    const t = row / 7, width = Math.pow(Math.sin(t * Math.PI), 0.85) * 0.025;
    for (let col = 0; col < 3; col++) {
      const side = col - 1;
      // The ridge, rolled margins and curved tip produce changing normals across
      // the blade. Its silhouette remains lanceolate when seen from either side.
      vertices.push(side * width + Math.sin(t * Math.PI) * 0.006, t * 0.17,
        Math.sin(t * Math.PI) * (0.015 - Math.abs(side) * 0.013) + side * width * (t - 0.35) * 0.65 - t * t * 0.016);
    }
  }
  for (let row = 0; row < 7; row++) for (let col = 0; col < 2; col++) {
    const i = row * 3 + col; indices.push(i, i + 1, i + 3, i + 1, i + 4, i + 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}

type NearOliveForm = {
  leader: [number, number, number][];
  // Each limb starts at a different height along the continuing leader. The
  // final coordinate controls its bend, rather than making a radial fork.
  limbs: [number, number, number, number, number][];
};
const nearOliveForms: NearOliveForm[] = [
  { leader: [[0, 0, 0], [0.07, 0.72, 0.02], [-0.14, 1.48, 0.11], [-0.35, 2.30, 0.03], [-0.18, 3.30, -0.14]],
    limbs: [[0.29, -1.63, 2.13, 0.22, -0.11], [0.42, 1.40, 2.67, -0.54, 0.17], [0.49, -0.92, 2.70, -1.19, 0.13], [0.60, 0.76, 3.00, 1.03, -0.12], [0.72, -1.45, 3.25, -0.15, 0.03], [0.81, 0.43, 3.55, -0.74, 0.13]] },
  { leader: [[0, 0, 0], [-0.08, 0.80, 0.05], [0.12, 1.48, -0.02], [0.33, 2.30, -0.13], [0.16, 3.43, 0.03]],
    limbs: [[0.33, 1.71, 2.36, 0.33, -0.15], [0.47, -1.54, 2.78, -0.31, 0.02], [0.55, 0.75, 2.79, -1.22, 0.10], [0.65, -0.69, 3.03, 0.99, -0.13], [0.75, 1.27, 3.49, -0.35, 0.08], [0.84, -0.67, 3.62, -0.61, 0.04]] },
  { leader: [[0, 0, 0], [0.02, 0.69, -0.08], [0.22, 1.43, -0.03], [0.03, 2.35, 0.16], [0.38, 3.23, 0.08]],
    limbs: [[0.32, -1.65, 2.13, -0.24, -0.10], [0.43, 1.32, 2.57, 0.64, 0.06], [0.54, -0.65, 2.68, 1.04, -0.12], [0.64, 0.87, 2.97, -1.09, 0.07], [0.72, -1.27, 3.19, -0.27, 0.10], [0.83, 1.07, 3.44, 0.36, 0.08]] },
  { leader: [[0, 0, 0], [-0.12, 0.72, 0.03], [-0.04, 1.54, 0.12], [0.20, 2.26, -0.10], [0.06, 3.30, -0.24]],
    limbs: [[0.31, 1.63, 2.06, 0.38, -0.18], [0.45, -1.50, 2.76, -0.18, 0.11], [0.52, 0.52, 2.63, -1.10, -0.10], [0.63, -0.80, 2.97, 1.00, 0.05], [0.73, 1.20, 3.24, -0.43, -0.01], [0.84, -0.46, 3.55, 0.45, 0.07]] },
];

export function createNapTerraceWorld(): WorldBuild {
  const rng = randomSeed(48203);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#c9dbd5');
  scene.fog = new THREE.FogExp2('#c9d7c3', 0.025);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.05, 100);
  const target = new THREE.Vector3();
  const warmWood = wood('#88704c', 2.5);
  const bark = wood('#655b43', 7);
  warmWood.bumpScale = 0.002; warmWood.roughness = 0.8;
  warmWood.map?.repeat.set(0.65, 1.8);
  bark.roughness = 0.96;
  const floorStone = stone('#b5ab92', 3.5);
  const chairLinen = fabric('#d4c7a7', 5);
  const throwLinen = fabric('#899982', 7);
  throwLinen.map?.repeat.set(2, 2); throwLinen.bumpScale = 0.004;
  const sailMat = fabric('#eee2c5', 14);
  sailMat.side = THREE.DoubleSide;
  sailMat.emissive.set('#d9c79f'); sailMat.emissiveIntensity = 0.47;
  sailMat.bumpScale = 0.0015;
  floorStone.bumpScale = 0.003;
  // A cloth transmission map carries soft, varied leaf silhouettes on the
  // underside. It is a lighting cue on curved 3D cloth, never a scenic backdrop.
  const dappleCanvas = document.createElement('canvas'); dappleCanvas.width = dappleCanvas.height = 512;
  const dappleContext = dappleCanvas.getContext('2d')!;
  dappleContext.fillStyle = '#fbfaf3'; dappleContext.fillRect(0, 0, 512, 512);
  const dappleRandom = randomSeed(9931);
  dappleContext.filter = 'blur(7px)';
  for (let branch = 0; branch < 8; branch++) {
    const bx = dappleRandom() * 512, by = dappleRandom() * 512;
    for (let leaf = 0; leaf < 16; leaf++) {
      const angle = dappleRandom() * Math.PI * 2;
      dappleContext.fillStyle = `rgba(94,103,66,${0.10 + dappleRandom() * 0.17})`;
      dappleContext.beginPath(); dappleContext.ellipse(bx + (dappleRandom() - 0.5) * 160, by + (dappleRandom() - 0.5) * 110, 6 + dappleRandom() * 7, 16 + dappleRandom() * 12, angle, 0, Math.PI * 2); dappleContext.fill();
    }
  }
  const dappleMap = new THREE.CanvasTexture(dappleCanvas); dappleMap.colorSpace = THREE.SRGBColorSpace;
  dappleMap.wrapS = dappleMap.wrapT = THREE.RepeatWrapping; sailMat.emissiveMap = dappleMap;
  const brass = new THREE.MeshStandardMaterial({ color: '#8e7850', metalness: 0.68, roughness: 0.43 });
  scene.add(new THREE.HemisphereLight('#e1edf1', '#77785d', 2.0));
  const sun = new THREE.DirectionalLight('#fff0ca', 2.5);
  sun.position.set(-6, 9, -4); sun.target.position.set(0, 0, -2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 1, far: 28 });
  sun.shadow.normalBias = 0.03; sun.shadow.bias = -0.00012; sun.shadow.radius = 4;
  scene.add(sun, sun.target);
  const fill = new THREE.DirectionalLight('#d9e9e6', 0.58); fill.position.set(5, 3, 3); scene.add(fill);

  const addMesh = (geometry: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, z: number) => {
    const m = new THREE.Mesh(geometry, material); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; scene.add(m); return m;
  };
  const box = (w: number, h: number, d: number, x: number, y: number, z: number, material: THREE.Material, radius = 0.03) => {
    const m = rounded(w, h, d, radius, material); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; scene.add(m); return m;
  };

  // An open terrace with individually jointed honed limestone flags.
  const mortar = rough('#aaa48d', 1);
  box(11, 0.28, 8.1, 0, -0.22, -0.25, mortar);
  for (let row = 0; row < 9; row++) for (let col = 0; col < 11; col++) {
    const tile = box(0.98, 0.075, 0.86, -5 + col + (row % 2) * 0.24, -0.055, 3.2 - row * 0.88, floorStone, 0.017);
    tile.rotation.y = (rng() - 0.5) * 0.002;
  }
  // Low edge of the terrace, kept below the seated line of sight.
  box(11, 0.15, 0.45, 0, -0.015, -4.5, stone('#bab6a0', 2), 0.045);
  box(0.48, 0.64, 7.3, -5.1, 0.20, -0.9, stone('#c0bba3', 2), 0.07);
  box(0.48, 0.50, 7.3, 5.1, 0.12, -0.9, stone('#c0bba3', 2), 0.07);

  // The viewer is actually in a long chaise. Close armrests and wrinkled linen
  // establish body scale; rounded padding and seams avoid primitive box furniture.
  const chair = new THREE.Group(); scene.add(chair);
  const cushion = rounded(1.23, 0.20, 2.8, 0.1, chairLinen);
  cushion.position.set(0, 0.44, 1.45); cushion.rotation.x = -0.042; cushion.receiveShadow = true; chair.add(cushion);
  const pipeMat = fabric('#a79e84', 4);
  for (const side of [-1, 1]) {
    const arm = rounded(0.105, 0.115, 2.7, 0.047, warmWood);
    arm.position.set(side * 0.76, 0.79, 1.2); arm.rotation.x = -0.055; arm.castShadow = true; arm.receiveShadow = true; chair.add(arm);
    for (const z of [-0.07, 2.35]) chair.add(cylinderBetween(new THREE.Vector3(side * 0.68, 0.12, z), new THREE.Vector3(side * 0.76, 0.81, z), 0.028, warmWood));
    const seam = cylinderBetween(new THREE.Vector3(side * 0.589, 0.5, 0.10), new THREE.Vector3(side * 0.589, 0.61, 2.80), 0.006, pipeMat);
    chair.add(seam);
  }
  // A draped sage throw folds over the near right arm and the recliner foot.
  const throwGeo = new THREE.PlaneGeometry(1.1, 1.48, 34, 36);
  const throwPos = throwGeo.attributes.position;
  for (let i = 0; i < throwPos.count; i++) {
    const x = throwPos.getX(i), t = (throwPos.getY(i) + 0.74) / 1.48;
    const folds = 0.007 * Math.sin(x * 41 + t * 13) + 0.019 * Math.sin(x * 12 + t * 3) + 0.018 * Math.cos(t * 11 + x * 4);
    throwPos.setXYZ(i, x + 0.24, 0.69 + folds - Math.max(0, x - 0.41) * 0.9, 0.25 + t * 1.48);
  }
  throwGeo.computeVertexNormals(); throwLinen.side = THREE.DoubleSide;
  const blanket = new THREE.Mesh(throwGeo, throwLinen); blanket.receiveShadow = blanket.castShadow = true; chair.add(blanket);
  // Visible fine fringe on the far hem.
  for (let i = 0; i < 30; i++) {
    const x = -0.29 + i * 0.036;
    chair.add(cylinderBetween(new THREE.Vector3(x, 0.687, 0.25), new THREE.Vector3(x + 0.007, 0.665, 0.18 - rng() * 0.028), 0.0021, throwLinen));
  }

  // Low slatted side table: tea, a closed clothbound book and thick pottery.
  const table = new THREE.Group(); table.position.set(-1.35, 0, 0.56); table.rotation.y = -0.11; scene.add(table);
  const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.49, 0.065, 64), warmWood); tableTop.position.y = 0.66; tableTop.castShadow = tableTop.receiveShadow = true; table.add(tableTop);
  for (let i = 0; i < 3; i++) {
    const angle = i / 3 * Math.PI * 2;
    table.add(cylinderBetween(new THREE.Vector3(Math.cos(angle) * 0.40, 0.04, Math.sin(angle) * 0.40), new THREE.Vector3(Math.cos(angle) * 0.3, 0.64, Math.sin(angle) * 0.3), 0.025, warmWood));
  }
  const book = rounded(0.39, 0.037, 0.28, 0.009, fabric('#b8a880', 3)); book.position.set(0.02, 0.72, 0.10); book.rotation.y = -0.20; table.add(book);
  const pages = rounded(0.37, 0.021, 0.25, 0.004, rough('#e0d6bb')); pages.position.set(0.02, 0.719, 0.10); pages.rotation.y = -0.20; table.add(pages);
  const cupProfile = [new THREE.Vector2(0.065, 0), new THREE.Vector2(0.067, 0.015), new THREE.Vector2(0.081, 0.10), new THREE.Vector2(0.079, 0.133), new THREE.Vector2(0.073, 0.136), new THREE.Vector2(0.073, 0.121), new THREE.Vector2(0.061, 0.021)];
  const cupMat = new THREE.MeshStandardMaterial({ color: '#ccc9ae', roughness: 0.24, metalness: 0.02 });
  const cup = new THREE.Mesh(new THREE.LatheGeometry(cupProfile, 40), cupMat); cup.position.set(-0.19, 0.70, -0.12); cup.castShadow = true; table.add(cup);
  const tea = new THREE.Mesh(new THREE.CircleGeometry(0.071, 40), new THREE.MeshPhysicalMaterial({ color: '#4e4029', roughness: 0.15, metalness: 0.18, clearcoat: 0.7 })); tea.rotation.x = -Math.PI / 2; tea.position.set(-0.19, 0.821, -0.12); table.add(tea);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.012, 8, 24, Math.PI * 1.7), cupMat); handle.position.set(-0.275, 0.774, -0.12); handle.rotation.z = Math.PI * 0.15; table.add(handle);

  // Architectural tensioned sail, real fabric geometry with a curved edge and
  // corner loads. A narrow rolled hem, ropes and fittings make its thickness legible.
  const sailGeo = new THREE.PlaneGeometry(7.3, 5.0, 48, 36);
  const sailBase = new Float32Array(sailGeo.attributes.position.count * 3);
  const sailPosition = sailGeo.attributes.position;
  const sailHeight = (u: number, v: number) => 3.08 - 0.38 * Math.sin(u * Math.PI) * Math.sin(v * Math.PI) + 0.13 * u - 0.13 * v;
  for (let i = 0; i < sailPosition.count; i++) {
    const u = (sailPosition.getX(i) + 3.65) / 7.3, v = (sailPosition.getY(i) + 2.5) / 5;
    const x = (u - 0.5) * 7.3, z = 1.9 - v * 5 + Math.sin(u * Math.PI) * 0.25 * v;
    const y = sailHeight(u, v);
    sailPosition.setXYZ(i, x, y, z); sailBase[i * 3] = x; sailBase[i * 3 + 1] = y; sailBase[i * 3 + 2] = z;
  }
  sailGeo.computeVertexNormals();
  const sail = new THREE.Mesh(sailGeo, sailMat); sail.castShadow = true; sail.receiveShadow = true; sail.userData.cozyAction = 'canopy'; scene.add(sail);
  const hemMat = fabric('#c2b796', 4);
  for (const v of [0, 1]) {
    const pts = Array.from({ length: 40 }, (_, i) => { const u = i / 39; return new THREE.Vector3((u - 0.5) * 7.3, sailHeight(u, v) - 0.004, 1.9 - v * 5 + Math.sin(u * Math.PI) * 0.25 * v); });
    const hem = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.012, 6, false), hemMat); hem.userData.cozyAction = 'canopy'; scene.add(hem);
  }
  for (const side of [-1, 1]) {
    const post = cylinderBetween(new THREE.Vector3(side * 3.97, 0, -3.45), new THREE.Vector3(side * 3.97, 3.53, -3.45), 0.043, warmWood, 0.039); scene.add(post);
    scene.add(cylinderBetween(new THREE.Vector3(side * 3.65, sailHeight(side === 1 ? 1 : 0, 1), -3.1), new THREE.Vector3(side * 3.97, 3.48, -3.45), 0.013, hemMat));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.027, 0.006, 6, 16), brass); ring.position.set(side * 3.65, sailHeight(side === 1 ? 1 : 0, 1), -3.1); ring.rotation.x = Math.PI / 2; scene.add(ring);
  }

  // Terrain occupies the full horizon and has physical depth and occlusion.
  const terrainGeometry = new THREE.PlaneGeometry(90, 75, 65, 60); terrainGeometry.rotateX(-Math.PI / 2);
  const tp = terrainGeometry.attributes.position;
  for (let i = 0; i < tp.count; i++) {
    const x = tp.getX(i), z = tp.getZ(i) - 30;
    tp.setXYZ(i, x, -0.40 + Math.sin(x * 0.15 + z * 0.10) * 0.25 + Math.sin(z * 0.12) * 0.35 + Math.max(0, -z - 18) * (0.13 + Math.sin(x * 0.07) * 0.045), z);
  }
  terrainGeometry.computeVertexNormals();
  const grassCanvas = document.createElement('canvas'); grassCanvas.width = grassCanvas.height = 512;
  const grassContext = grassCanvas.getContext('2d')!, grassPixels = grassContext.createImageData(512, 512);
  const groundRandom = randomSeed(21);
  for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) {
    const n = Math.sin(x * 0.038 + Math.sin(y * 0.026)) * 8 + Math.cos(y * 0.063 + x * 0.018) * 6 + (groundRandom() - 0.5) * 18;
    const i = (y * 512 + x) * 4; grassPixels.data[i] = 137 + n; grassPixels.data[i + 1] = 153 + n; grassPixels.data[i + 2] = 111 + n; grassPixels.data[i + 3] = 255;
  }
  grassContext.putImageData(grassPixels, 0, 0);
  const groundMap = new THREE.CanvasTexture(grassCanvas); groundMap.wrapS = groundMap.wrapT = THREE.RepeatWrapping; groundMap.repeat.set(6, 5); groundMap.colorSpace = THREE.SRGBColorSpace;
  const terrainMaterial = new THREE.MeshStandardMaterial({ color: '#829d62', roughness: 1, map: groundMap });
  const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial); terrain.receiveShadow = true; scene.add(terrain);
  // The mown path gently curves away through taller grass rather than a straight
  // tunnel/grid. Muted gold soil separates foreground greenery and distant trees.
  const pathV: number[] = [], pathI: number[] = [];
  for (let j = 0; j <= 35; j++) {
    const z = -4.6 - j * 0.6, x = 1.4 + Math.sin(j * 0.092) * 2.5;
    for (const side of [-1, 1]) pathV.push(x + side * (0.46 + j * 0.005), -0.22 + Math.sin(x * 0.15 + z * 0.10) * 0.25 + Math.sin(z * 0.12) * 0.35, z);
    if (j < 35) { const n = j * 2; pathI.push(n, n + 2, n + 1, n + 1, n + 2, n + 3); }
  }
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.Float32BufferAttribute(pathV, 3)); pg.setIndex(pathI); pg.computeVertexNormals();
  const path = new THREE.Mesh(pg, stone('#a2a17b', 5)); path.receiveShadow = true; scene.add(path);

  // Tree skeletons and thousands of individually curved leaves share batched
  // geometry. The branching silhouette has gaps, age and asymmetry.
  const leaves = leafGeometry();
  const leafMaterials = ['#64764b', '#829260', '#566f48', '#a0a978'].map(color => new THREE.MeshStandardMaterial({ color, roughness: 0.89, side: THREE.DoubleSide }));
  const nearLeaves = nearLeafGeometry();
  const nearLeafMaterials = ['#637b4d', '#798b59', '#536c45', '#929e6e'].map(color => new THREE.MeshStandardMaterial({ color, roughness: 0.83, side: THREE.DoubleSide }));
  const wind = { value: 0 };
  for (const material of [...leafMaterials, ...nearLeafMaterials]) {
    material.onBeforeCompile = shader => {
      shader.uniforms.cozyLeafTime = wind;
      shader.vertexShader = 'uniform float cozyLeafTime;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        #ifdef USE_INSTANCING
          float leafPhase = instanceMatrix[3].x * 3.7 + instanceMatrix[3].z * 2.3;
          transformed.z += sin(cozyLeafTime * 0.7 + leafPhase) * 0.010 * pow(clamp(position.y / 0.17, 0.0, 1.0), 2.0);
        #endif`);
    };
    material.customProgramCacheKey = () => 'cozy-nap-curved-leaf-v1';
  }
  const trees: Array<{ group: THREE.Group; phase: number; base: number }> = [];
  function olive(x: number, z: number, scale: number, seed: number, nearForm?: NearOliveForm) {
    const rand = randomSeed(seed), group = new THREE.Group();
    const groundY = -0.40 + Math.sin(x * 0.15 + z * 0.10) * 0.25 + Math.sin(z * 0.12) * 0.35 + Math.max(0, -z - 18) * (0.13 + Math.sin(x * 0.07) * 0.045);
    group.position.set(x, groundY - 0.03, z); group.scale.setScalar(scale); scene.add(group);
    const branchVertices: number[] = [], branchIndices: number[] = [];
    const leafMatrices: THREE.Matrix4[][] = [[], [], [], []];
    function branch(start: THREE.Vector3, end: THREE.Vector3, radius: number, depth: number) {
      const midpoint = start.clone().lerp(end, 0.54).add(new THREE.Vector3((rand() - 0.5) * 0.38, 0.15, (rand() - 0.5) * 0.38));
      const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);
      const frames = curve.computeFrenetFrames(7, false), offset = branchVertices.length / 3;
      for (let j = 0; j <= 7; j++) {
        const p = curve.getPoint(j / 7), r = radius * (1 - j / 7 * 0.65);
        for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2; const v = p.clone().addScaledVector(frames.normals[j], Math.cos(a) * r).addScaledVector(frames.binormals[j], Math.sin(a) * r); branchVertices.push(v.x, v.y, v.z); }
      }
      for (let j = 0; j < 7; j++) for (let k = 0; k < 7; k++) { const a = offset + j * 7 + k, b = offset + j * 7 + (k + 1) % 7; branchIndices.push(a, b, a + 7, b, b + 7, a + 7); }
      if (depth < 3) {
        const length = depth === 0 ? 1.6 : depth === 1 ? 0.95 : 0.6;
        const n = depth === 0 ? 5 : 3;
        for (let k = 0; k < n; k++) {
          const a = rand() * Math.PI * 2, spread = depth === 0 ? 0.95 : 0.8;
          const root = start.clone().lerp(end, 0.63 + rand() * 0.37);
          const child = root.clone().add(new THREE.Vector3(Math.cos(a) * length * spread, length * (0.3 + rand() * 0.58), Math.sin(a) * length * spread));
          branch(root, child, radius * (0.34 + rand() * 0.15), depth + 1);
        }
      }
      if (depth >= 2) {
        const dummy = new THREE.Object3D();
        for (let k = 0; k < (depth === 2 ? 40 : 65); k++) {
          dummy.position.copy(start).lerp(end, rand()).add(new THREE.Vector3((rand() - 0.5) * 0.61, (rand() - 0.5) * 0.40, (rand() - 0.5) * 0.61));
          dummy.rotation.set(rand() * 1.9 - 0.7, rand() * Math.PI * 2, rand() * 2.3 - 1.15);
          dummy.scale.set(0.8 + rand() * 0.75, 0.75 + rand() * 0.8, 1); dummy.updateMatrix(); leafMatrices[k % 4].push(dummy.matrix.clone());
        }
      }
    }
    if (nearForm) {
      const up = new THREE.Vector3(0, 1, 0), leaf = new THREE.Object3D();
      // Tapered bent wood stays one indexed mesh per tree, including the fine
      // twigs. Unequal longitudinal ridges break the round extrusion silhouette.
      const woodCurve = (curve: THREE.Curve<THREE.Vector3>, rootRadius: number, tipRadius: number, sections = 8) => {
        const sides = rootRadius > 0.035 ? 9 : 5;
        const frames = curve.computeFrenetFrames(sections, false), offset = branchVertices.length / 3;
        for (let j = 0; j <= sections; j++) {
          const t = j / sections, point = curve.getPoint(t), radius = THREE.MathUtils.lerp(rootRadius, tipRadius, t);
          for (let k = 0; k < sides; k++) {
            const angle = k / sides * Math.PI * 2;
            const ridge = 1 + Math.sin(angle * 3 + seed * 0.11 + t * 1.7) * 0.12 + Math.sin(angle * 5 - t) * 0.055;
            const vertex = point.clone().addScaledVector(frames.normals[j], Math.cos(angle) * radius * ridge).addScaledVector(frames.binormals[j], Math.sin(angle) * radius * ridge);
            branchVertices.push(vertex.x, vertex.y, vertex.z);
          }
        }
        for (let j = 0; j < sections; j++) for (let k = 0; k < sides; k++) {
          const a = offset + j * sides + k, b = offset + j * sides + (k + 1) % sides;
          branchIndices.push(a, b, a + sides, b, b + sides, a + sides);
        }
      };
      const leader = new THREE.CatmullRomCurve3(nearForm.leader.map(point => new THREE.Vector3(...point)));
      woodCurve(leader, 0.145, 0.016, 19);
      const limbs: THREE.Curve<THREE.Vector3>[] = nearForm.limbs.map(([height, tx, ty, tz, bend], index) => {
        const root = leader.getPoint(height), tip = new THREE.Vector3(tx, ty, tz);
        const elbow = root.clone().lerp(tip, 0.43);
        elbow.y += bend - 0.15; elbow.z += Math.sin(index * 1.7 + seed) * 0.19;
        const curve = new THREE.QuadraticBezierCurve3(root, elbow, tip);
        woodCurve(curve, 0.060 - height * 0.034, 0.008, 9);
        return curve;
      });
      // The retained leader has its own higher, offset spray, not a matching arm.
      limbs.push(new THREE.QuadraticBezierCurve3(leader.getPoint(0.78), leader.getPoint(0.91), leader.getPoint(1)));
      limbs.forEach((limb, limbIndex) => {
        const twigCount = limbIndex === limbs.length - 1 ? 4 : 5;
        for (let twigIndex = 0; twigIndex < twigCount; twigIndex++) {
          const t = 0.36 + twigIndex * 0.14 + rand() * 0.055;
          const root = limb.getPoint(Math.min(t, 0.98));
          const tangent = limb.getTangent(Math.min(t, 0.98));
          const angle = limbIndex * 2.13 + twigIndex * 2.4 + rand() * 0.8;
          const tip = root.clone().addScaledVector(tangent, 0.25 + rand() * 0.20)
            .add(new THREE.Vector3(Math.cos(angle) * (0.35 + rand() * 0.27), 0.14 + rand() * 0.35, Math.sin(angle) * (0.43 + rand() * 0.32)));
          const bend = root.clone().lerp(tip, 0.5); bend.y += 0.12;
          const twig = new THREE.QuadraticBezierCurve3(root, bend, tip);
          woodCurve(twig, 0.009, 0.0028, 5);
          for (let shootIndex = 0; shootIndex < 4; shootIndex++) {
            const start = twig.getPoint(0.23 + shootIndex * 0.21);
            const spread = angle + shootIndex * 2.21 + rand() * 0.6;
            const end = start.clone().add(new THREE.Vector3(Math.cos(spread) * (0.20 + rand() * 0.24), 0.10 + rand() * 0.23 - (shootIndex === 3 ? 0.18 : 0), Math.sin(spread) * (0.25 + rand() * 0.26)));
            const arc = start.clone().lerp(end, 0.58); arc.y += 0.045;
            const shoot = new THREE.QuadraticBezierCurve3(start, arc, end);
            woodCurve(shoot, 0.0032, 0.0009, 3);
            for (let node = 0; node < 11; node++) for (const side of [-1, 1]) {
              const along = 0.10 + node * 0.081 + rand() * 0.019;
              leaf.position.copy(shoot.getPoint(along));
              const facing = spread + side * (0.70 + rand() * 0.45);
              const direction = new THREE.Vector3(Math.cos(facing), 0.12 + rand() * 0.70 - along * 0.28, Math.sin(facing)).normalize();
              leaf.quaternion.setFromUnitVectors(up, direction);
              leaf.rotateY(side * 0.45 + (rand() - 0.5) * 1.5);
              leaf.scale.set(0.78 + rand() * 0.38, 0.77 + rand() * 0.39, 1); leaf.updateMatrix();
              // Inner/rear sprays stay cooler and darker; sunward tips reveal a
              // few silver-green undersides. The shade is coherent within each
              // crown volume instead of alternating every four floating leaves.
              const inner = along < 0.40 || leaf.position.z < -0.55;
              const shade = inner ? (rand() < 0.62 ? 2 : 0) : (rand() < 0.23 ? 3 : 1);
              leafMatrices[shade].push(leaf.matrix.clone());
            }
          }
        }
      });
    } else {
      branch(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-0.12, 1.65, 0.07), 0.115, 0);
    }
    const bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.Float32BufferAttribute(branchVertices, 3)); bg.setIndex(branchIndices); bg.computeVertexNormals();
    const bm = new THREE.Mesh(bg, bark); bm.castShadow = true; bm.receiveShadow = true; group.add(bm);
    leafMatrices.forEach((matrices, i) => { const mesh = new THREE.InstancedMesh(nearForm ? nearLeaves : leaves, (nearForm ? nearLeafMaterials : leafMaterials)[i], matrices.length); matrices.forEach((matrix, j) => mesh.setMatrixAt(j, matrix)); mesh.castShadow = true; mesh.receiveShadow = true; group.add(mesh); });
    trees.push({ group, phase: seed * 0.73, base: (rand() - 0.5) * 0.09 });
  }
  olive(-3.8, -4.9, 1.65, 81, nearOliveForms[0]); olive(4.4, -7.8, 1.6, 832, nearOliveForms[1]); olive(-6.7, -10.6, 1.35, 11, nearOliveForms[2]);
  olive(0.0, -16.3, 1.7, 279, nearOliveForms[3]); olive(6.8, -18, 1.45, 737); olive(-9.8, -24, 1.85, 933);
  olive(-2.1, -29, 1.75, 622); olive(11.9, -28.6, 1.9, 19); olive(-13.5, -14, 1.4, 674);

  // Loose rosemary and meadow edges: tapered curved blades, no billboard shrubs.
  const grassV: number[] = [], grassI: number[] = [];
  for (let blade = 0; blade < 9; blade++) {
    const angle = blade * 2.399, height = 0.18 + rng() * 0.20, lean = 0.09 + rng() * 0.08, offset = grassV.length / 3;
    for (let j = 0; j <= 4; j++) { const t = j / 4, w = 0.012 * (1 - t); for (const side of [-1, 1]) grassV.push(Math.cos(angle) * lean * t * t + Math.sin(angle) * w * side, height * t, Math.sin(angle) * lean * t * t + Math.cos(angle) * w * side); }
    for (let j = 0; j < 4; j++) { const n = offset + j * 2; grassI.push(n, n + 1, n + 2, n + 1, n + 3, n + 2); }
  }
  const grassGeo = new THREE.BufferGeometry(); grassGeo.setAttribute('position', new THREE.Float32BufferAttribute(grassV, 3)); grassGeo.setIndex(grassI); grassGeo.computeVertexNormals();
  const grassMat = new THREE.MeshStandardMaterial({ color: '#708551', roughness: 1, side: THREE.DoubleSide });
  const grassInstances: THREE.Matrix4[] = []; const dummy = new THREE.Object3D();
  for (let j = 0; j < 4100; j++) {
    const x = (rng() - 0.5) * 30, z = -5 - rng() * 35, step = (-z - 4.6) / 0.6, pathX = 1.4 + Math.sin(step * 0.092) * 2.5;
    if (Math.abs(x - pathX) < 0.75 && z > -26) continue;
    dummy.position.set(x, -0.40 + Math.sin(x * 0.15 + z * 0.10) * 0.25 + Math.sin(z * 0.12) * 0.35 + Math.max(0, -z - 18) * (0.13 + Math.sin(x * 0.07) * 0.045), z);
    dummy.rotation.set(0, rng() * 6.28, 0); dummy.scale.setScalar(0.75 + rng() * 1.3); dummy.updateMatrix(); grassInstances.push(dummy.matrix.clone());
  }
  const grass = new THREE.InstancedMesh(grassGeo, grassMat, grassInstances.length); grassInstances.forEach((m, i) => grass.setMatrixAt(i, m)); grass.receiveShadow = true; scene.add(grass);

  // A terracotta rosemary pot fills the nearer side in portrait without obscuring
  // the depth of the garden. Its rounded body is lathed, with a rolled rim.
  const potMat = stone('#9a7559', 3);
  const pot = addMesh(new THREE.LatheGeometry([new THREE.Vector2(0.23, 0), new THREE.Vector2(0.24, 0.06), new THREE.Vector2(0.33, 0.47), new THREE.Vector2(0.35, 0.50), new THREE.Vector2(0.35, 0.55), new THREE.Vector2(0.31, 0.56), new THREE.Vector2(0.30, 0.51)], 40), potMat, 1.42, 0, -1.42);
  const soil = new THREE.Mesh(new THREE.CircleGeometry(0.305, 36), rough('#514c39')); soil.rotation.x = -Math.PI / 2; soil.position.set(1.42, 0.50, -1.42); scene.add(soil);
  const herbGroup = new THREE.Group(); herbGroup.position.set(1.42, 0, -1.42); scene.add(herbGroup);
  const herb = new THREE.InstancedMesh(leaves, leafMaterials[2], 1120);
  for (let stem = 0; stem < 28; stem++) {
    const a = rng() * Math.PI * 2, radius = 0.12 + rng() * 0.24, h = 0.28 + rng() * 0.30;
    const start = new THREE.Vector3(Math.cos(a) * 0.08, 0.51, Math.sin(a) * 0.08);
    const end = new THREE.Vector3(Math.cos(a) * radius, 0.52 + h, Math.sin(a) * radius);
    herbGroup.add(cylinderBetween(start, end, 0.007, bark, 0.002));
    for (let leaf = 0; leaf < 40; leaf++) {
      const t = 0.16 + rng() * 0.84;
      dummy.position.copy(start).lerp(end, t).add(new THREE.Vector3((rng() - 0.5) * 0.12, (rng() - 0.5) * 0.08, (rng() - 0.5) * 0.12)); dummy.rotation.set(rng() * 1.5, a + leaf * 2.4, (rng() - 0.5) * 1.6); dummy.scale.set(0.33, 0.40, 0.33); dummy.updateMatrix(); herb.setMatrixAt(stem * 40 + leaf, dummy.matrix);
    }
  }
  herb.castShadow = true; herb.receiveShadow = true; herbGroup.add(herb);
  pot.name = 'hand-thrown-terracotta';

  // A barely visible length of pull cord is an alternate reachable touch target.
  const cord = cylinderBetween(new THREE.Vector3(1.46, 2.95, -1.4), new THREE.Vector3(1.46, 1.60, -1.4), 0.009, hemMat); cord.userData.cozyAction = 'canopy'; scene.add(cord);
  const cordGrip = addMesh(new THREE.CapsuleGeometry(0.028, 0.11, 4, 8), warmWood, 1.46, 1.57, -1.4); cordGrip.userData.cozyAction = 'canopy';
  let currentTime = 0, responseStarted = -20;

  const resize = (aspect: number) => {
    camera.aspect = aspect;
    // Portrait is composed from the recliner itself: close cloth and armrests at
    // the bottom, canopy at top, full-height living garden in the middle.
    const portrait = aspect < 0.85;
    camera.fov = portrait ? 62 : aspect > 1.9 ? 53 : 56;
    chair.scale.x = portrait ? 0.79 : 1;
    table.position.set(portrait ? -0.75 : -1.35, 0, portrait ? -0.18 : 0.56);
    cup.position.x = tea.position.x = portrait ? 0.13 : -0.19;
    handle.position.x = portrait ? 0.045 : -0.275;
    pot.position.x = soil.position.x = portrait ? 0.86 : 1.42;
    herbGroup.position.x = portrait ? 0.86 : 1.42;
    cord.position.x = cordGrip.position.x = portrait ? 0.69 : 1.46;
    camera.position.set(portrait ? 0.05 : 0.12, portrait ? 1.16 : 1.19, portrait ? 2.50 : 2.72);
    target.set(portrait ? 0.02 : -0.18, portrait ? 1.30 : 1.23, -5.2);
    camera.lookAt(target); camera.updateProjectionMatrix();
  };
  resize(1.6);
  return {
    scene, camera, resize,
    update(time: number, _dt: number) {
      currentTime = time;
      wind.value = time;
      dappleMap.offset.x = Math.sin(time * 0.15) * 0.009;
      const response = Math.max(0, 1 - (time - responseStarted) / 5);
      for (let i = 0; i < sailPosition.count; i++) {
        const x = sailBase[i * 3], z = sailBase[i * 3 + 2];
        const edge = Math.sin((x / 7.3 + 0.5) * Math.PI) * Math.sin(Math.max(0, Math.min(1, (1.9 - z) / 5)) * Math.PI);
        sailPosition.setY(i, sailBase[i * 3 + 1] + Math.sin(time * 0.60 + x * 0.85 + z * 0.6) * (0.014 + response * 0.043) * edge);
      }
      sailPosition.needsUpdate = true;
      // Position changes remain under six centimetres; normals update only with
      // active animation, never requiring another renderer or animation loop.
      sailGeo.computeVertexNormals();
      for (const t of trees) { t.group.rotation.z = t.base + Math.sin(time * 0.27 + t.phase) * 0.005; t.group.rotation.x = Math.sin(time * 0.21 + t.phase) * 0.003; }
      herb.rotation.z = Math.sin(time * 0.45) * 0.004;
    },
    interact(action: string) {
      if (action !== 'canopy') return null;
      responseStarted = currentTime;
      return { type: 'canopy', intensity: 0.22 };
    },
  };
}
