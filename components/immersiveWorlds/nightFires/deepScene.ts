import * as THREE from 'three';
import type { WorldRecipe } from './worldTypes';
import { seeded, material, mesh, beam, rock, sky, lantern } from './scenery';

/** Original hilltop overlook: real height-field mountains, a worn bench and a stone terrace. */
export function buildDeepNightWorld(): WorldRecipe {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#202d48', 0.0046);
  sky(scene, '#07101f', '#394663', 713, 430);
  const random = seeded(19812);
  const hemisphere = new THREE.HemisphereLight('#b1c6f6', '#43454b', 0.79);
  scene.add(hemisphere);
  const moonLight = new THREE.DirectionalLight('#bdd0ff', 1.25);
  moonLight.position.set(-35, 32, 28);
  moonLight.castShadow = true;
  moonLight.shadow.mapSize.set(1024, 1024);
  moonLight.shadow.camera.left = -9;
  moonLight.shadow.camera.right = 9;
  moonLight.shadow.camera.top = 9;
  moonLight.shadow.camera.bottom = -9;
  moonLight.shadow.normalBias = 0.035;
  scene.add(moonLight);
  const valleyFill = new THREE.DirectionalLight('#778cb6', .23);
  valleyFill.position.set(30, 12, 24);
  scene.add(valleyFill);

  // Moonlit ridgelines are independent continuous surfaces rather than stacked cutout planes.
  function mountainBand(z: number, spread: number, peak: number, seed: number, tint: string) {
    const rng = seeded(seed);
    const phases = [rng() * 6, rng() * 6, rng() * 6, rng() * 6];
    const nx = 236, nz = 54;
    const positions: number[] = [], colors: number[] = [], indices: number[] = [];
    const base = new THREE.Color(tint);
    const shade = new THREE.Color();
    for (let iz = 0; iz <= nz; iz++) {
      const q = iz / nz;
      for (let ix = 0; ix <= nx; ix++) {
        const x = (ix / nx - 0.5) * spread;
        const serration = Math.sin(x * 0.037 + phases[0]) * 0.27
          + Math.sin(x * 0.081 + phases[1]) * 0.22
          + Math.sin(x * 0.193 + phases[2]) * 0.11
          + Math.sin(x * 0.413 + phases[3]) * 0.048
          + Math.sin(x * 0.83 + phases[1]) * 0.013;
        const height = peak * (0.73 + serration);
        const ridge = Math.sin(Math.PI * q) ** 0.83;
        // Secondary spurs continue down the slope: their real normals catch the low moon.
        const rib = Math.sin(x * .31 + q * 7 + Math.sin(x * .073) * 1.8) * .073
          + Math.sin(x * .64 - q * 15 + phases[2]) * .031
          + Math.sin(x * 1.37 + q * 26) * .008;
        const y = -14 + ridge * (height + 14) + ridge * peak * rib
          + Math.sin(x * .057 + q * 4) * ridge * 1.5;
        positions.push(x, y, z + q * 32 + Math.sin(x * .073 + phases[0]) * ridge * 3.7);
        const shadeValue = .84 + q * .13 + rib * .50 + Math.sin(x * .21 + q * 20) * .025;
        shade.copy(base).multiplyScalar(shadeValue);
        colors.push(shade.r, shade.g, shade.b);
        if (ix < nx && iz < nz) {
          const a = iz * (nx + 1) + ix;
          indices.push(a, a + nx + 1, a + 1, a + 1, a + nx + 1, a + nx + 2);
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    const surface = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 1, metalness: 0, side: THREE.DoubleSide,
    }));
    surface.receiveShadow = true;
    scene.add(surface);
  }
  mountainBand(-174, 420, 31, 735, '#697c9b');
  mountainBand(-126, 315, 21, 752, '#4b637e');
  mountainBand(-83, 225, 10, 781, '#415965');

  // A broad nearer saddle falls away under the terrace; irregular contours reveal the basin.
  const terrainHeight = (x: number, z: number) => {
    const shoulders = Math.pow(Math.min(1, Math.abs(x) / 49), 1.7) * 14;
    return -10 + shoulders + Math.sin(x * .13 + z * .04) * 1.6 + Math.sin(x * .048 - z * .09) * 2.2;
  };
  const groundGeometry = new THREE.PlaneGeometry(145, 110, 94, 74);
  groundGeometry.rotateX(-Math.PI / 2);
  const groundPositions = groundGeometry.attributes.position;
  for (let i = 0; i < groundPositions.count; i++) {
    const x = groundPositions.getX(i), z = groundPositions.getZ(i) - 42;
    groundPositions.setXYZ(i, x, terrainHeight(x, z), z);
  }
  groundGeometry.computeVertexNormals();
  const ground = new THREE.Mesh(groundGeometry, material('earth', '#293c3b'));
  ground.receiveShadow = true;
  scene.add(ground);

  // Sparse, low-contrast buildings belong to the valley, never a repeated luminous grid.
  const houseWalls = material('stone', '#47535d');
  const roofMaterial = material('wood', '#25313d');
  const windowColors = ['#dba873', '#b9a083', '#edbd85', '#a7b6c7'];
  const houseLocations: Array<[number, number, number, number]> = [
    [-25, -6.3, -36, .95], [-20, -7.2, -42, .75], [-17, -7.5, -40, 1.1],
    [13, -7.1, -34, .9], [17, -7.2, -43, 1.1], [25, -6.0, -45, .7],
    [-5, -7.7, -58, .75], [1, -7.4, -62, 1.1], [36, -2.9, -39, .8],
  ];
  houseLocations.forEach(([x, _y, z, originalScale], index) => {
    const scale = originalScale * .70;
    const group = new THREE.Group();
    const house = mesh(new THREE.BoxGeometry(1.7 * scale, .9 * scale, 1.2 * scale), houseWalls, [0, 0, 0]);
    group.add(house);
    // A pitched roof is actually volumetric, with eaves and a ridge.
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-1.02 * scale, .38 * scale);
    roofShape.lineTo(0, 1.03 * scale);
    roofShape.lineTo(1.02 * scale, .38 * scale);
    roofShape.closePath();
    const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(roofShape, { depth: 1.45 * scale, bevelEnabled: false }), roofMaterial);
    roof.position.z = -.725 * scale;
    group.add(roof);
    group.add(mesh(new THREE.BoxGeometry(2.06 * scale, .05 * scale, 1.49 * scale), roofMaterial, [0, .38 * scale, 0]));
    if (index % 3 === 0) group.add(mesh(new THREE.BoxGeometry(.18 * scale, .37 * scale, .21 * scale), houseWalls, [.45 * scale, .88 * scale, -.2 * scale]));
    const windows = new THREE.MeshBasicMaterial({ color: windowColors[index % windowColors.length], transparent: true, opacity: .54 });
    for (let w = 0; w < (index % 3 === 0 ? 2 : 1); w++) {
      group.add(mesh(new THREE.PlaneGeometry(.19 * scale, .23 * scale), windows, [(w - .35) * .58 * scale, -.06 * scale, .607 * scale]));
    }
    group.position.set(x, terrainHeight(x, z) + .45 * scale, z);
    group.rotation.y = (random() - .5) * .45;
    scene.add(group);
  });

  // The overlook is an irregular laid-stone platform with individual weathered paving slabs.
  const terrace = mesh(new THREE.CylinderGeometry(7.7, 8.5, 2.4, 15), material('stone', '#4e5553'), [0, -1.48, 3.0]);
  terrace.receiveShadow = true;
  scene.add(terrace);
  const infill = mesh(new THREE.CylinderGeometry(7.65, 7.65, .035, 30), material('earth', '#5d6765'), [0, -.198, 3]);
  infill.receiveShadow = true;
  scene.add(infill);
  const slabMaterials = ['#727b78', '#6b7777', '#818882', '#68716b', '#69777b'].map((c, i) => {
    const surface = material('stone', c);
    for (const texture of [surface.map, surface.bumpMap, surface.roughnessMap]) if (texture) {
      texture.repeat.set(1.8, 1.8);
      texture.offset.set(i * .137, i * .219);
    }
    return surface;
  });
  function pavingStone(w: number, d: number) {
    const shape = new THREE.Shape();
    const cut = .025 + random() * .043;
    shape.moveTo(-w / 2 + cut, -d / 2);
    shape.lineTo(w / 2 - cut * .7, -d / 2);
    shape.lineTo(w / 2, -d / 2 + cut);
    shape.lineTo(w / 2, d / 2 - cut * 1.3);
    shape.lineTo(w / 2 - cut, d / 2);
    shape.lineTo(-w / 2 + cut * 1.2, d / 2);
    shape.lineTo(-w / 2, d / 2 - cut);
    shape.lineTo(-w / 2, -d / 2 + cut);
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: .046, bevelEnabled: true, bevelThickness: .009, bevelSize: .008, bevelSegments: 2, steps: 1 });
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }
  for (let z = -1.9; z < 8; z += .76) {
    for (let x = -6.3; x < 6.5; x += .86) {
      const px = x + (Math.round(z / .76) % 2) * .31 + (random() - .5) * .013;
      if (px * px + (z - 3) * (z - 3) > 50) continue;
      const slab = mesh(pavingStone(.817 + random() * .014, .716 + random() * .014), slabMaterials[Math.floor(random() * slabMaterials.length)], [px, -.211 + random() * .006, z]);
      slab.rotation.y = (random() - .5) * .011;
      slab.receiveShadow = true;
      scene.add(slab);
    }
  }
  const masonry = material('stone', '#687372');
  // Broken, low parapet caps give a tactile foreground without becoming a view-blocking railing.
  for (let i = 0; i < 24; i++) {
    const angle = Math.PI * (1.07 + i / 23 * .86);
    const x = Math.cos(angle) * 6.2, z = 3 + Math.sin(angle) * 5.4;
    const stone = rock([x, .0, z], [.61, .31 + random() * .13, .55], 913 + i, masonry);
    stone.rotation.y = -angle + random() * .2;
    stone.castShadow = true;
    scene.add(stone);
  }
  for (let i = 0; i < 25; i++) {
    const side = i % 2 ? 1 : -1;
    scene.add(rock([side * (4.8 + random() * 2.8), -.1 + random() * .09, -2.8 + random() * 7], [.14 + random() * .3, .08 + random() * .1, .15 + random() * .24], 530 + i, masonry));
  }

  // Worn timber armrests in first-person, edged boards, bolts and genuine joinery.
  const wood = material('wood', '#75604d');
  wood.roughness = .94;
  wood.bumpScale = .009;
  for (const texture of [wood.map, wood.bumpMap]) if (texture) texture.repeat.set(2.8, .65);
  const darkWood = material('wood', '#3b3732');
  const iron = material('metal', '#465259');
  const bench = new THREE.Group();
  function board(w: number, d: number, h: number, x: number, y: number, z: number, mat = wood) {
    const shape = new THREE.Shape();
    const r = Math.min(.055, w / 5, d / 5);
    shape.moveTo(-w / 2 + r, -d / 2);
    shape.lineTo(w / 2 - r, -d / 2);
    shape.quadraticCurveTo(w / 2, -d / 2, w / 2, -d / 2 + r);
    shape.lineTo(w / 2, d / 2 - r);
    shape.quadraticCurveTo(w / 2, d / 2, w / 2 - r, d / 2);
    shape.lineTo(-w / 2 + r, d / 2);
    shape.quadraticCurveTo(-w / 2, d / 2, -w / 2, d / 2 - r);
    shape.lineTo(-w / 2, -d / 2 + r);
    shape.quadraticCurveTo(-w / 2, -d / 2, -w / 2 + r, -d / 2);
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: true, bevelThickness: .009, bevelSize: .009, bevelSegments: 2, steps: 1, curveSegments: 4 });
    geometry.rotateX(-Math.PI / 2);
    const item = mesh(geometry, mat, [x, y, z]);
    item.castShadow = true;
    item.receiveShadow = true;
    bench.add(item);
    return item;
  }
  for (const side of [-1, 1]) {
    board(.23, 2.15, .095, side * .64, .79, 3.01);
    // Angled, softened supports keep the armrests physically legible.
    bench.add(beam(new THREE.Vector3(side * .64, -.12, 2.25), new THREE.Vector3(side * .64, .77, 2.25), .052, iron));
    bench.add(beam(new THREE.Vector3(side * .64, -.12, 3.9), new THREE.Vector3(side * .64, .77, 3.9), .052, iron));
    board(.08, 1.68, .09, side * .64, .03, 3.05, darkWood);
    for (const z of [2.09, 3.94]) {
      const screw = mesh(new THREE.CylinderGeometry(.021, .021, .008, 10), iron, [side * .64, .894, z]);
      bench.add(screw);
      bench.add(mesh(new THREE.BoxGeometry(.023, .002, .004), darkWood, [side * .64, .899, z]));
    }
    // Fine wood splits cross the worn end grain; no large artificial decorative pattern.
    for (let i = 0; i < 3; i++) {
      bench.add(mesh(new THREE.BoxGeometry(.0011, .001, .07 + random() * .12), darkWood, [side * .64 + (random() - .5) * .10, .895, 2.04 + random() * .15]));
    }
  }
  for (let i = 0; i < 4; i++) board(1.74, .18, .065, 0, .16, 3.73 + i * .195);
  scene.add(bench);

  // A short reclaimed stone shelf places the lantern within reach and the portrait composition.
  const shelf = rock([.93, .04, .35], [.68, .3, .47], 435, masonry);
  shelf.receiveShadow = true;
  scene.add(shelf);
  const lamp = lantern([.93, .34, .35], .72);
  scene.add(lamp.group);
  const lanternBounce = new THREE.PointLight('#f4bb72', 1.0, 3.8, 2);
  lanternBounce.position.set(.93, .68, .35);
  scene.add(lanternBounce);

  // Small alpine grass ribbons, correctly rooted among the margins, respond only to a slow breeze.
  const bladePositions: number[] = [], bladeColors: number[] = [], bladeWeights: number[] = [], bladeIndices: number[] = [];
  const grassTints = ['#647b70', '#6f817b', '#8a9080', '#566c69'].map(c => new THREE.Color(c));
  function grassBlade(x: number, y: number, z: number, height: number, angle: number, tint: THREE.Color) {
    const start = bladePositions.length / 3;
    const width = .004 + random() * .005;
    const lean = .08 + random() * .13;
    for (let j = 0; j < 4; j++) {
      const q = j / 3;
      const bx = x + Math.cos(angle) * lean * q * q;
      const bz = z + Math.sin(angle) * lean * q * q;
      for (const side of [-1, 1]) {
        bladePositions.push(bx + Math.sin(angle) * width * (1 - q * .92) * side, y + height * q, bz - Math.cos(angle) * width * (1 - q * .92) * side);
        bladeWeights.push(q * q);
        bladeColors.push(tint.r * (.76 + q * .35), tint.g * (.76 + q * .35), tint.b * (.76 + q * .35));
      }
      if (j < 3) {
        const a = start + j * 2;
        bladeIndices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
  }
  for (let i = 0; i < 790; i++) {
    const a = Math.PI * (1.02 + random() * .95);
    const radius = 5.2 + random() * 1.5;
    const x = Math.cos(a) * radius, z = 3 + Math.sin(a) * radius * .86;
    const tint = grassTints[i % grassTints.length];
    for (let j = 0; j < 4; j++) grassBlade(x + random() * .11, -.14, z + random() * .11, .13 + random() * .29, random() * Math.PI * 2, tint);
  }
  // Several small tufts close to the lamp give the warm light a natural surface to catch.
  for (let i = 0; i < 60; i++) {
    const x = 1.64 + random() * .44, z = -.25 + random() * 1.25;
    for (let j = 0; j < 3; j++) grassBlade(x, -.17, z, .11 + random() * .20, random() * 6.28, grassTints[i % 4]);
  }
  const grassGeometry = new THREE.BufferGeometry();
  grassGeometry.setAttribute('position', new THREE.Float32BufferAttribute(bladePositions, 3));
  grassGeometry.setAttribute('color', new THREE.Float32BufferAttribute(bladeColors, 3));
  grassGeometry.setAttribute('nightWind', new THREE.Float32BufferAttribute(bladeWeights, 1));
  grassGeometry.setIndex(bladeIndices);
  grassGeometry.computeVertexNormals();
  const grassTime = { value: 0 };
  const grassMaterial = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, side: THREE.DoubleSide });
  grassMaterial.onBeforeCompile = shader => {
    shader.uniforms.nightTime = grassTime;
    shader.vertexShader = 'attribute float nightWind; uniform float nightTime;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed.x += sin(nightTime * 0.31 + position.x * 0.63 + position.z * 0.38) * nightWind * 0.024;\ntransformed.z += cos(nightTime * 0.23 + position.x * 0.37) * nightWind * 0.012;');
  };
  grassMaterial.customProgramCacheKey = () => 'night-overlook-grass-v1';
  const grasses = new THREE.Mesh(grassGeometry, grassMaterial);
  grasses.receiveShadow = true;
  scene.add(grasses);

  // Irregular brush on the flank, built from branching stems rather than spherical tree placeholders.
  const branchMaterial = material('bark', '#454b45');
  for (let i = 0; i < 12; i++) {
    const side = i % 2 ? -1 : 1;
    const x = side * (7.0 + random() * 9), z = -3 - random() * 8;
    const trunkY = -4.2 + Math.abs(x) * .14;
    const h = 1.2 + random() * 1.5;
    const base = new THREE.Vector3(x, trunkY, z);
    const tip = new THREE.Vector3(x + side * .2, trunkY + h, z);
    scene.add(beam(base, tip, .027 + random() * .018, branchMaterial));
    for (let j = 0; j < 6; j++) {
      const q = .35 + j * .10, angle = j * 2.4 + i;
      const a = new THREE.Vector3().lerpVectors(base, tip, q);
      const b = a.clone().add(new THREE.Vector3(Math.cos(angle) * .7 * (1.3 - q), .23, Math.sin(angle) * .65 * (1.3 - q)));
      scene.add(beam(a, b, .014, branchMaterial));
      scene.add(beam(b, b.clone().add(new THREE.Vector3(.12, .22, -.1)), .006, branchMaterial));
    }
  }

  let bounceTarget = lanternBounce.intensity;
  let bounceChanged = false;
  return {
    scene,
    view: aspect => aspect < .8
      ? { position: [.08, 1.39, 4.42], target: [.2, 2.4, -30], fov: 62 }
      : { position: [0, 1.38, 3.62], target: [.3, 2.6, -32], fov: 53 },
    targets: [{ object: lamp.target, kind: 'lantern-brightness' }],
    interact: () => {
      const level = lamp.toggle();
      bounceTarget = level * 1.45;
      bounceChanged = true;
      return level;
    },
    update: (elapsed, dt) => {
      grassTime.value = elapsed;
      lamp.update(elapsed, dt);
      if (dt === 0 && bounceChanged) lanternBounce.intensity = bounceTarget;
      bounceChanged = false;
      lanternBounce.intensity += (bounceTarget - lanternBounce.intensity) * (1 - Math.exp(-Math.max(0, dt) * 2.4));
    },
  };
}
