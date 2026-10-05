import * as THREE from 'three';
import type { WorldRecipe } from './worldTypes';
import { seeded, material, mesh, beam, rock, pine, sky, fire } from './scenery';

/** Original mountain clearing, deliberately without lakeside camping equipment. */
export function buildMountainWorld(): WorldRecipe {
  const scene = new THREE.Scene();
  scene.name = 'Mountain clearing — night fire';
  scene.fog = new THREE.FogExp2(0x172c42, 0.009);
  scene.userData.exposure = 1.23;
  const random = seeded(194031);
  sky(scene, '#081327', '#34475d', 7261, 2200);

  const moonlight = new THREE.DirectionalLight(0xb4d6f1, 1.25);
  moonlight.position.set(-11, 18, -12);
  moonlight.castShadow = true;
  moonlight.shadow.mapSize.set(1024, 1024);
  moonlight.shadow.camera.left = -12;
  moonlight.shadow.camera.right = 12;
  moonlight.shadow.camera.top = 11;
  moonlight.shadow.camera.bottom = -10;
  moonlight.shadow.camera.near = 0.5;
  moonlight.shadow.camera.far = 55;
  moonlight.shadow.normalBias = 0.035;
  moonlight.shadow.bias = -0.00012;
  moonlight.target.position.set(0, 0, -1);
  scene.add(moonlight, moonlight.target);
  scene.add(new THREE.HemisphereLight(0x7c9eba, 0x473b2a, 1.05));
  const lowBounce = new THREE.PointLight(0xffa758, 0.7, 5.5, 2);
  lowBounce.position.set(0, 0.52, 0.65);
  scene.add(lowBounce);
  // A broad cool fill reveals bark ridges without flattening the warm hearth light.
  const skyFill = new THREE.DirectionalLight(0xabc7db, 0.36);
  skyFill.position.set(2, 8, 8);
  scene.add(skyFill);

  const earth = material('earth', 0x5e5140);
  earth.map?.repeat.set(70, 72);
  earth.bumpMap?.repeat.set(70, 72);
  earth.bumpScale = 0.027;
  const bark = material('bark', 0x594737);
  const greyStone = material('stone', 0x636d6c);
  const paleStone = material('stone', 0x77807b);
  const wood = material('wood', 0x766049);

  // Shallow undulations continue beyond the clearing; no floating circular platform.
  function groundHeight(x: number, z: number) {
    const clearing = Math.exp(-(x * x / 15 + (z - 0.7) * (z - 0.7) / 19));
    const ripples = Math.sin(x * 0.43 + z * 0.25) * 0.14 + Math.cos(z * 0.48 - x * 0.19) * 0.11;
    const slopes = Math.max(0, -z - 8) * 0.037 + Math.pow(Math.max(0, Math.abs(x) - 5), 1.1) * 0.052;
    const soil = (Math.sin(x * 2.61 + z * 1.32) * Math.cos(z * 1.71 - x * 1.21) * 0.023 + Math.sin(x * 4.2 - z * 3.6) * 0.009) * (1 - clearing * 0.7);
    return ripples * (1 - clearing) + slopes + soil - 0.04;
  }
  const groundGeo = new THREE.PlaneGeometry(92, 95, 74, 78);
  groundGeo.rotateX(-Math.PI / 2);
  groundGeo.translate(0, 0, -26);
  const groundPos = groundGeo.attributes.position;
  const groundColors: number[] = [];
  for (let i = 0; i < groundPos.count; i++) {
    const x = groundPos.getX(i), z = groundPos.getZ(i);
    groundPos.setY(i, groundHeight(x, z));
    const variation = 0.77 + random() * 0.3;
    groundColors.push(variation, variation * (0.97 + random() * 0.03), variation * 0.90);
  }
  groundGeo.setAttribute('color', new THREE.Float32BufferAttribute(groundColors, 3));
  groundGeo.computeVertexNormals();
  earth.vertexColors = true;
  const terrain = new THREE.Mesh(groundGeo, earth);
  terrain.name = 'Continuous rough pine-litter clearing';
  terrain.receiveShadow = true;
  scene.add(terrain);

  // Actual layered three-dimensional ridges: each has different saddles and peaks.
  function mountainRange(zCenter: number, width: number, depth: number, peaks: Array<[number, number, number]>, color: number, salt: number) {
    const rangeRandom = seeded(salt);
    const geo = new THREE.PlaneGeometry(width, depth, 72, 18);
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, 0, zCenter);
    const pos = geo.attributes.position;
    const colors: number[] = [];
    const c = new THREE.Color(color);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i);
      const crest = Math.exp(-Math.pow((z - zCenter) / (depth * 0.29), 2));
      let height = 0.5;
      for (const [peakX, peakY, spread] of peaks) height += peakY * Math.exp(-Math.pow((x - peakX) / spread, 2));
      const detail = Math.sin(x * 0.29 + salt) * 0.6 + Math.sin(x * 0.61 - z * 0.11) * 0.32 + (rangeRandom() - 0.5) * 0.8;
      pos.setY(i, (height + detail) * crest - 1.7);
      const shade = 0.82 + rangeRandom() * 0.23;
      colors.push(c.r * shade, c.g * shade, c.b * shade);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    const m = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 1, metalness: 0 });
    const mountain = new THREE.Mesh(geo, m);
    mountain.receiveShadow = true;
    mountain.name = `Mountain ridge ${salt}`;
    scene.add(mountain);
  }
  mountainRange(-116, 290, 61, [[-92, 19, 32], [-40, 25, 20], [4, 17, 31], [53, 30, 23], [110, 18, 40]], 0x66788a, 53);
  mountainRange(-80, 235, 53, [[-77, 15, 30], [-19, 16, 24], [35, 8, 20], [70, 20, 28]], 0x415868, 91);
  mountainRange(-47, 164, 36, [[-49, 9, 27], [6, 3.8, 21], [50, 11, 25]], 0x293d49, 123);

  // Irregular clusters, asymmetry and deliberate open central view of the mountains.
  const treePlacements: Array<[number, number, number, number]> = [
    [-5.4, -4.2, 12.7, 50], [6.5, -8.5, 14.5, 77], [-10.3, -14, 14.1, 90],
    [12.8, -20.8, 15.3, 116], [-15.7, -23, 13.7, 149], [-7.8, -24.3, 10.1, 159],
    [18.5, -31.7, 13.0, 190], [-21.5, -33.0, 14.4, 221], [9.9, -32.6, 9.0, 259],
  ];
  const movingTrees: THREE.Object3D[] = [];
  for (const [x, z, height, seed] of treePlacements) {
    const tree = pine(x, groundHeight(x, z), z, height, seed);
    scene.add(tree);
    movingTrees.push(tree);
  }

  // Broken foreground bedrock crops the image naturally and catches cold rim light.
  const stones: Array<[number, number, number, number, number, number, number]> = [
    [-1.36, 2.95, 0.83, 0.45, 0.79, -0.11, 701],
    [1.50, 2.90, 0.77, 0.40, 0.89, -0.10, 704],
    [-3.7, -0.9, 1.75, 0.86, 1.1, -0.18, 721],
    [3.2, -2.5, 1.38, 0.62, 1.20, -0.15, 738],
    [-4.8, -6.2, 1.12, 0.42, 0.70, -0.10, 764],
    [5.4, -12.2, 1.70, 0.90, 1.25, -0.28, 789],
  ];
  for (const [x, z, sx, sy, sz, sunk, salt] of stones) {
    const boulder = rock([x, groundHeight(x, z) + sy * 0.55 + sunk, z], [sx, sy, sz], salt, salt % 2 ? greyStone : paleStone);
    boulder.rotation.y = salt * 0.071;
    scene.add(boulder);
  }
  // Finer gravel creates contact and believable changes of scale around the fire.
  for (let i = 0; i < 30; i++) {
    const angle = random() * Math.PI * 2;
    const radius = 1.75 + random() * 4.3;
    const x = Math.cos(angle) * radius;
    const z = 0.7 + Math.sin(angle) * radius;
    const s = 0.025 + Math.pow(random(), 2) * 0.11;
    scene.add(rock([x, groundHeight(x, z) + s * 0.22, z], [s * 1.5, s * 0.6, s], 900 + i, greyStone));
  }

  // Curved roots emerge from the framing trees and settle into the shallow soil.
  const rootPaths = [
    [[-5.4, -4.2], [-5.2, -2.5], [-4.1, -2.0], [-2.8, -2.2], [-2.0, -1.7]],
    [[-5.4, -4.2], [-5.4, -2.1], [-5.2, -0.6], [-4.4, 0.6]],
    [[-5.0, -2.3], [-4.2, -1.0], [-3.9, 0.5], [-3.1, 1.6]],
    [[6.5, -8.5], [6.2, -6.1], [5.0, -5.1], [4.3, -4.9]],
  ];
  rootPaths.forEach((path, index) => {
    const points = path.map(([x, z], j) => new THREE.Vector3(x, groundHeight(x, z) + (j === 0 ? 0.20 : 0.055), z));
    const curve = new THREE.CatmullRomCurve3(points);
    const root = new THREE.Mesh(new THREE.TubeGeometry(curve, 22, index % 2 ? 0.045 : 0.073, 7, false), bark);
    root.castShadow = true;
    root.receiveShadow = true;
    root.name = 'Exposed weathered pine root';
    scene.add(root);
  });

  // A naturally fallen trunk stays well off the central sightline; exposed end-grain.
  const logA = new THREE.Vector3(-4.0, groundHeight(-4.0, -3.3) + 0.29, -3.3);
  const logB = new THREE.Vector3(-1.9, groundHeight(-1.9, -5.3) + 0.29, -5.3);
  const fallenLog = beam(logA, logB, 0.23, bark);
  fallenLog.castShadow = true;
  fallenLog.receiveShadow = true;
  scene.add(fallenLog);
  const logEnd = mesh(new THREE.CircleGeometry(0.203, 30), wood);
  logEnd.position.copy(logA.clone().sub(logB).normalize().multiplyScalar(0.014).add(logA));
  logEnd.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), logA.clone().sub(logB).normalize());
  scene.add(logEnd);
  const endRings = new THREE.Group();
  for (let ring = 1; ring <= 5; ring++) {
    const g = new THREE.TorusGeometry(ring * 0.031, 0.0025, 3, 28);
    const growth = new THREE.Mesh(g, bark);
    growth.position.z = 0.002;
    growth.scale.y = 0.92 + ring * 0.009;
    endRings.add(growth);
  }
  endRings.position.copy(logEnd.position);
  endRings.quaternion.copy(logEnd.quaternion);
  scene.add(endRings);

  // Ground litter is one spatial mesh, fine enough to read as needles, not giant grass.
  const litterPositions: number[] = [], litterColors: number[] = [];
  const needleColors = [new THREE.Color(0x7d6746), new THREE.Color(0x65563d), new THREE.Color(0x999075), new THREE.Color(0x3c4940)];
  for (let i = 0; i < 6700; i++) {
    const x = (random() - 0.5) * 18;
    const z = random() * 17 - 10;
    if (x * x + (z - 0.7) ** 2 < 1.5) continue;
    const angle = random() * Math.PI * 2, length = 0.05 + random() * 0.105;
    const y = groundHeight(x, z) + 0.013;
    const dx = Math.cos(angle) * length, dz = Math.sin(angle) * length;
    litterPositions.push(x, y, z, x + dx, y + 0.003, z + dz, x - dz * 0.035, y + 0.006, z + dx * 0.035);
    const c = needleColors[Math.floor(random() * needleColors.length)];
    for (let j = 0; j < 3; j++) litterColors.push(c.r, c.g, c.b);
  }
  const litterGeometry = new THREE.BufferGeometry();
  litterGeometry.setAttribute('position', new THREE.Float32BufferAttribute(litterPositions, 3));
  litterGeometry.setAttribute('color', new THREE.Float32BufferAttribute(litterColors, 3));
  litterGeometry.computeVertexNormals();
  const litterMaterial = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, side: THREE.DoubleSide });
  const litter = new THREE.Mesh(litterGeometry, litterMaterial);
  litter.receiveShadow = true;
  scene.add(litter);

  // Low sparse tussocks soften the rock/soil boundary; their silhouette is individually bent.
  const grassPositions: number[] = [];
  const grassColors: number[] = [];
  const grassRandom = seeded(1149);
  for (let clump = 0; clump < 240; clump++) {
    const theta = grassRandom() * Math.PI * 2;
    const radius = 2.0 + grassRandom() * 8.5;
    const cx = Math.cos(theta) * radius, cz = -0.4 + Math.sin(theta) * radius;
    if (Math.abs(cx) < 0.9 && cz > 1.3) continue;
    for (let blade = 0; blade < 10; blade++) {
      const x = cx + (grassRandom() - 0.5) * 0.24, z = cz + (grassRandom() - 0.5) * 0.24;
      const y = groundHeight(x, z) + 0.007;
      const height = 0.065 + Math.pow(grassRandom(), 1.5) * 0.19;
      const a = grassRandom() * Math.PI * 2;
      const dx = Math.cos(a), dz = Math.sin(a);
      const width = 0.003 + grassRandom() * 0.0055;
      const bend = 0.018 + grassRandom() * 0.075;
      const color = new THREE.Color().setHSL(0.19 + grassRandom() * 0.065, 0.10 + grassRandom() * 0.16, 0.17 + grassRandom() * 0.08);
      // Four tapered curve segments replace the conspicuous straight triangular cards.
      for (let segment = 0; segment < 4; segment++) {
        const t0 = segment / 4, t1 = (segment + 1) / 4;
        const bx0 = x + dx * bend * t0 * t0, bz0 = z + dz * bend * t0 * t0;
        const bx1 = x + dx * bend * t1 * t1, bz1 = z + dz * bend * t1 * t1;
        const yy0 = y + height * (t0 - 0.12 * t0 * t0), yy1 = y + height * (t1 - 0.12 * t1 * t1);
        const w0 = width * (1 - t0) ** 0.8, w1 = width * (1 - t1) ** 0.8;
        grassPositions.push(
          bx0 - dz * w0, yy0, bz0 + dx * w0,
          bx0 + dz * w0, yy0, bz0 - dx * w0,
          bx1 - dz * w1, yy1, bz1 + dx * w1,
          bx0 + dz * w0, yy0, bz0 - dx * w0,
          bx1 + dz * w1, yy1, bz1 - dx * w1,
          bx1 - dz * w1, yy1, bz1 + dx * w1,
        );
        for (let v = 0; v < 6; v++) grassColors.push(color.r, color.g, color.b);
      }
    }
  }
  const grassGeometry = new THREE.BufferGeometry();
  grassGeometry.setAttribute('position', new THREE.Float32BufferAttribute(grassPositions, 3));
  grassGeometry.setAttribute('color', new THREE.Float32BufferAttribute(grassColors, 3));
  grassGeometry.computeVertexNormals();
  const grass = new THREE.Mesh(grassGeometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, side: THREE.DoubleSide }));
  grass.name = 'Sparse alpine grass among stones';
  grass.receiveShadow = true;
  scene.add(grass);

  const hearth = fire([0, -0.005, 0.65], 1);
  hearth.group.name = 'Mountain campfire: touch logs for faint embers';
  scene.add(hearth.group);

  return {
    scene,
    view: (aspect) => aspect < 0.85
      ? { position: [0.12, 1.57, 4.62], target: [0, 1.19, -10], fov: 67 }
      : { position: [0.12, 1.62, 5.00], target: [0.1, 1.37, -12], fov: 59 },
    targets: [{ object: hearth.target, kind: 'log-embers' }],
    interact: (kind) => {
      if (kind !== 'log-embers') return 0;
      hearth.stoke();
      return 0.32;
    },
    update: (elapsed, dt) => {
      hearth.update(elapsed, dt);
      lowBounce.intensity = 0.68 + Math.sin(elapsed * 1.3) * 0.04 + Math.sin(elapsed * 2.1) * 0.03;
      movingTrees.forEach((tree, index) => {
        tree.rotation.z = Math.sin(elapsed * 0.14 + index * 1.7) * 0.0018;
        tree.rotation.x = Math.cos(elapsed * 0.11 + index) * 0.0010;
      });
    },
  };
}
