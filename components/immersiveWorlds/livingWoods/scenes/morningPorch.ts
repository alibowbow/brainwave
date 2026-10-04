import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldContent } from '../types';

/** Original geometry and procedural materials; no borrowed assets or audio. */
export function createMorningPorch(scene: THREE.Scene, camera: THREE.PerspectiveCamera): WorldContent {
  let seed = 94201;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const range = (a: number, b: number) => a + random() * (b - a);
  const root = new THREE.Group();
  scene.add(root);
  scene.background = new THREE.Color('#dcebef');
  scene.fog = new THREE.FogExp2('#d1e2db', 0.013);
  camera.position.set(0, 1.68, 4.8);
  camera.fov = 53;
  camera.lookAt(0, 1.25, -8);
  camera.updateProjectionMatrix();

  const hemi = new THREE.HemisphereLight('#e4f3ff', '#b2b699', 2.5);
  scene.add(hemi);
  const sunlight = new THREE.DirectionalLight('#fff0cb', 3.8);
  sunlight.position.set(-9, 13, 1);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(2048, 2048);
  Object.assign(sunlight.shadow.camera, { left: -14, right: 14, top: 17, bottom: -10, near: 0.5, far: 55 });
  sunlight.shadow.bias = -0.00018;
  sunlight.shadow.normalBias = 0.025;
  sunlight.shadow.radius = 4;
  sunlight.target.position.set(0, 0, -4);
  scene.add(sunlight, sunlight.target);
  const porchBounce = new THREE.PointLight('#ffdab1', 1.3, 7, 2);
  porchBounce.position.set(-1, 2.6, 4);
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
  const stoneMap = canvasTexture(256, (ctx, n) => {
    ctx.fillStyle = '#aaa892'; ctx.fillRect(0, 0, n, n);
    for (let i = 0; i < 7000; i++) {
      const v = Math.floor(range(45, 180));
      ctx.fillStyle = `rgba(${v},${v + 5},${v - 12},${range(.05, .2)})`;
      ctx.fillRect(random() * n, random() * n, range(1, 5), range(1, 3));
    }
    for (let i = 0; i < 65; i++) {
      ctx.fillStyle = `rgba(87,107,66,${range(.07, .25)})`;
      ctx.beginPath(); ctx.ellipse(random() * n, random() * n, range(1, 11), range(1, 6), random() * Math.PI, 0, 7); ctx.fill();
    }
  });
  const earthMap = canvasTexture(256, (ctx, n) => {
    ctx.fillStyle = '#82915e'; ctx.fillRect(0, 0, n, n);
    for (let i = 0; i < 9000; i++) {
      ctx.fillStyle = random() > .45 ? 'rgba(43,56,25,.16)' : 'rgba(178,170,104,.2)';
      ctx.fillRect(random() * n, random() * n, range(1, 4), range(1, 4));
    }
  });
  earthMap.repeat.set(22, 30);
  const glazeMap = canvasTexture(256, (ctx, n) => {
    ctx.fillStyle = '#d1d4b1'; ctx.fillRect(0, 0, n, n);
    for (let i = 0; i < 6000; i++) {
      ctx.fillStyle = random() > .12 ? 'rgba(103,118,81,.035)' : 'rgba(68,63,37,.32)';
      ctx.beginPath(); ctx.arc(random() * n, random() * n, range(.15, .9), 0, 7); ctx.fill();
    }
  });
  const leafVeinMap = canvasTexture(256, (ctx, n) => {
    ctx.fillStyle = '#f0f2e6'; ctx.fillRect(0, 0, n, n);
    const gradient = ctx.createLinearGradient(0, 0, n, 0);
    gradient.addColorStop(0, 'rgba(85,117,58,.2)'); gradient.addColorStop(.48, 'rgba(246,246,200,.18)'); gradient.addColorStop(1, 'rgba(72,100,46,.15)');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, n, n);
    ctx.strokeStyle = 'rgba(111,139,63,.38)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(n / 2, 0); ctx.lineTo(n / 2, n); ctx.stroke();
    for (let i = 0; i < 10; i++) {
      const y = i * 26;
      ctx.strokeStyle = 'rgba(112,141,71,.25)'; ctx.lineWidth = .8;
      for (const side of [-1, 1]) {
        ctx.beginPath(); ctx.moveTo(n / 2, y); ctx.quadraticCurveTo(n / 2 + side * 42, y + 8, n / 2 + side * 128, y + 57); ctx.stroke();
      }
    }
  });
  const wood = new THREE.MeshStandardMaterial({ map: woodMap, roughness: .72, color: '#eee4d6', bumpMap: woodMap, bumpScale: .014 });
  const darkWood = new THREE.MeshStandardMaterial({ map: woodMap, color: '#766552', roughness: .91, bumpMap: woodMap, bumpScale: .018 });
  const stone = new THREE.MeshStandardMaterial({ map: stoneMap, color: '#b7b6a0', roughness: .98, bumpMap: stoneMap, bumpScale: .043 });
  const groundMaterial = new THREE.MeshStandardMaterial({ map: earthMap, roughness: 1 });
  const leafMaterial = new THREE.MeshStandardMaterial({ color: '#d6dfb9', map: leafVeinMap, bumpMap: leafVeinMap, bumpScale: .003, side: THREE.DoubleSide, roughness: .57, metalness: .02, emissive: '#567338', emissiveIntensity: .1 });
  const paleLeafMaterial = new THREE.MeshStandardMaterial({ color: '#b9c478', map: leafVeinMap, side: THREE.DoubleSide, roughness: .48, emissive: '#59753c', emissiveIntensity: .12 });
  const leafDark = new THREE.MeshStandardMaterial({ color: '#b6c697', map: leafVeinMap, bumpMap: leafVeinMap, bumpScale: .008, side: THREE.DoubleSide, roughness: .69, emissive: '#567c3c', emissiveIntensity: .12 });
  const bark = new THREE.MeshStandardMaterial({ map: woodMap, color: '#b8b4a2', roughness: .94, bumpMap: woodMap, bumpScale: .035 });
  const dummy = new THREE.Object3D();

  function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, position: number[] = [0, 0, 0], parent: THREE.Object3D = root) {
    const item = new THREE.Mesh(geometry, material);
    item.position.set(position[0], position[1], position[2]);
    item.castShadow = true; item.receiveShadow = true;
    parent.add(item); return item;
  }
  function box(w: number, h: number, d: number, material: THREE.Material, position: number[], parent = root) {
    return mesh(new THREE.BoxGeometry(w, h, d), material, position, parent);
  }
  function branch(a: THREE.Vector3, b: THREE.Vector3, r1: number, r2: number, material: THREE.MeshStandardMaterial = bark, parent: THREE.Object3D = root) {
    const length = a.distanceTo(b);
    const bend = new THREE.Vector3(Math.sin(a.x * 2.1 + b.y), 0, Math.cos(a.z + b.x)) .multiplyScalar(length * .048);
    const curve = new THREE.CatmullRomCurve3([a, a.clone().lerp(b, .33).add(bend), a.clone().lerp(b, .68).addScaledVector(bend, .72), b]);
    const geometry = new THREE.TubeGeometry(curve, 8, r1, 8, false);
    const points = geometry.attributes.position;
    for (let i = 0; i <= 8; i++) {
      const t = i / 8, center = curve.getPointAt(t);
      const scale = (r1 * (1 - t) + r2 * t) / r1 * (1 + .16 * Math.exp(-t * 15));
      for (let j = 0; j <= 8; j++) {
        const index = i * 9 + j;
        points.setXYZ(index, center.x + (points.getX(index) - center.x) * scale, center.y + (points.getY(index) - center.y) * scale, center.z + (points.getZ(index) - center.z) * scale);
      }
    }
    geometry.computeVertexNormals();
    const piece = mesh(geometry, material, [0, 0, 0], parent);
    if (parent === root && material === bark) piece.userData.morningBark = true;
    return piece;
  }
  /** Folded botanical blade: raised midrib and non-flat gently curling tip. */
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
  function instances(geometry: THREE.BufferGeometry, material: THREE.Material, count: number) {
    const object = new THREE.InstancedMesh(geometry, material, count);
    object.castShadow = true; object.receiveShadow = true;
    root.add(object); return object;
  }

  // A pale eastern sky surrounds the environment, with no planar backdrop.
  const sky = new THREE.Mesh(new THREE.SphereGeometry(140, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, toneMapped: false,
    uniforms: { zenith: { value: new THREE.Color('#a8d8ee') }, horizon: { value: new THREE.Color('#fff0da') } },
    vertexShader: 'varying vec3 vPosition; void main(){vPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: 'uniform vec3 zenith;uniform vec3 horizon;varying vec3 vPosition;void main(){vec3 d=normalize(vPosition);float h=pow(max(d.y,0.),.45);vec3 c=mix(horizon,zenith,h);float sun=pow(max(dot(d,normalize(vec3(-.72,.29,-.64))),0.),38.);c+=vec3(.09,.04,.005)*sun;gl_FragColor=vec4(c,1.);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}',
  }));
  root.add(sky);

  const ground = mesh(new THREE.PlaneGeometry(160, 180, 45, 45), groundMaterial, [0, -.18, -45]);
  ground.rotation.x = -Math.PI / 2;
  const gp = ground.geometry.attributes.position;
  for (let i = 0; i < gp.count; i++) {
    const x = gp.getX(i), y = gp.getY(i);
    gp.setZ(i, Math.sin(x * .4 + y * .13) * .055 + Math.cos(x * .17 - y * .27) * .04);
  }
  ground.geometry.computeVertexNormals();
  // Far ridgelines are real terrain meshes; the fog creates atmospheric separation.
  for (let h = 0; h < 3; h++) {
    const g = new THREE.PlaneGeometry(185, 54, 70, 20);
    g.rotateX(-Math.PI / 2);
    const points = g.attributes.position;
    for (let i = 0; i < points.count; i++) {
      const x = points.getX(i), z = points.getZ(i);
      points.setY(i, Math.max(0, Math.sin((z + 27) / 54 * Math.PI)) * (4.5 + h * 1.8 + Math.sin(x * .06 + h) * 2 + Math.sin(x * .13 + h * 1.9) * 1.2));
    }
    g.computeVertexNormals();
    mesh(g, new THREE.MeshStandardMaterial({ color: ['#839576', '#8ba194', '#9aafa2'][h], roughness: 1 }), [h * 7 - 10, -.4, -65 - h * 18]);
  }

  // Porch planks and framing retain irregular wood grain and a sheltered near field.
  box(11, .23, 7.5, darkWood, [0, -.07, 4.1]);
  for (let i = 0; i < 19; i++) {
    const plank = box(10.8, .075, .385, wood, [0, .09 + range(-.004, .004), .45 + i * .397]);
    plank.material = wood.clone();
    (plank.material as THREE.MeshStandardMaterial).color.setHSL(.09, range(.05, .09), range(.8, .9));
  }
  box(10.9, .16, .17, darkWood, [0, .01, .2]);
  box(4.8, .18, .72, wood, [-.2, -.17, -.23]);
  box(.25, 3.75, .27, darkWood, [-3.55, 1.9, .61]);
  box(.25, 3.75, .27, darkWood, [4.15, 1.9, .62]);
  box(8.0, .22, .32, darkWood, [.25, 3.75, .62]);
  box(9.1, .13, 5.4, darkWood, [.25, 3.95, 3.2]);
  for (let i = 0; i < 9; i++) box(.1, .17, 5.25, wood, [-3.8 + i, 3.81, 3.1]);
  const plaster = new THREE.MeshStandardMaterial({ color: '#ddd5be', roughness: .96 });
  box(.25, 3.7, 6.5, plaster, [-4.3, 1.9, 3.7]);
  box(.11, .14, 6.5, darkWood, [-4.14, .42, 3.7]);
  box(.11, .12, 6.5, darkWood, [-4.14, 2.8, 3.7]);

  // Meandering stepping stones avoid a central straight corridor composition.
  const steppingStone = new THREE.IcosahedronGeometry(1, 1);
  const stoneObjects = instances(steppingStone, stone, 22);
  for (let i = 0; i < 22; i++) {
    const t = i / 21;
    dummy.position.set(.15 + Math.sin(t * 4) * 1.6, -.11, -.8 - t * 10.5);
    dummy.rotation.set(range(-.045, .045), range(0, 6.28), range(-.05, .05));
    dummy.scale.set(range(.42, .61), range(.09, .13), range(.32, .47));
    dummy.updateMatrix(); stoneObjects.setMatrixAt(i, dummy.matrix);
    stoneObjects.setColorAt(i, new THREE.Color().setHSL(.13, range(.03, .1), range(.64, .8)));
  }

  // Lichen-covered boundary wall, broken by a little slatted gate on the right.
  box(18.2, .89, .6, new THREE.MeshStandardMaterial({ color: '#898c73', roughness: 1 }), [-3.3, .23, -12.4]);
  box(7.8, .89, .6, new THREE.MeshStandardMaterial({ color: '#898c73', roughness: 1 }), [11.8, .23, -12.4]);
  const wallStones = instances(new THREE.IcosahedronGeometry(1, 1), stone, 153);
  for (let i = 0; i < 153; i++) {
    const row = Math.floor(i / 51), col = i % 51;
    let x = -12.2 + col * .55;
    if (x > 5.2) x += 2.0;
    dummy.position.set(x + (row % 2) * .23, -.04 + row * .31, -12.2 + range(-.035, .035));
    dummy.rotation.set(range(-.2, .2), range(-.25, .25), range(-.16, .16));
    dummy.scale.set(range(.32, .4), range(.18, .22), range(.36, .42));
    dummy.updateMatrix(); wallStones.setMatrixAt(i, dummy.matrix);
    wallStones.setColorAt(i, new THREE.Color().setHSL(range(.12, .16), range(.05, .16), range(.55, .82)));
  }
  const wallCaps = instances(new THREE.BoxGeometry(.67, .13, .86), stone, 42);
  for (let i = 0; i < 42; i++) {
    let x = -12 + i * .68;
    if (x > 5.2) x += 2;
    dummy.position.set(x, .84 + range(-.018, .018), -12.4);
    dummy.rotation.set(0, range(-.03, .03), range(-.02, .02)); dummy.scale.set(1, 1, 1);
    dummy.updateMatrix(); wallCaps.setMatrixAt(i, dummy.matrix);
  }
  for (const x of [5.35, 7.35]) box(.15, 1.35, .15, darkWood, [x, .4, -12.1]);
  for (let i = 0; i < 8; i++) box(.12, 1.04, .055, wood, [5.53 + i * .23, .45, -12.12]);
  box(1.95, .1, .08, darkWood, [6.36, .25, -12.05]);
  box(1.95, .1, .08, darkWood, [6.36, .78, -12.05]);

  // Thousands of individually folded leaves make spatial foliage, not solid blobs.
  const grass = instances(bladeGeometry(.018, .33, .095, 2), leafMaterial, 10000);
  for (let i = 0; i < grass.count; i++) {
    let x = range(-14, 14), z = range(-15, .1);
    const center = .15 + Math.sin(Math.max(0, Math.min(1, (-z - .8) / 10.5)) * 4) * 1.6;
    if (Math.abs(x - center) < .7 && z > -11.6) x += x < center ? -.9 : .9;
    dummy.position.set(x, -.16, z);
    dummy.rotation.set(range(-1.75, -.75), range(0, 6.28), range(-.5, .5));
    dummy.scale.setScalar(range(.35, .94)); dummy.updateMatrix(); grass.setMatrixAt(i, dummy.matrix);
    grass.setColorAt(i, new THREE.Color().setHSL(range(.19, .27), range(.3, .48), range(.54, .78)));
  }
  const fieldGrass = instances(bladeGeometry(.028, 1.2, .2, 3), paleLeafMaterial, 2700);
  for (let i = 0; i < fieldGrass.count; i++) {
    dummy.position.set(range(-28, 28), -.12, range(-34, -13));
    dummy.rotation.set(-range(1.2, 1.6), range(0, 6.28), range(-.1, .1));
    dummy.scale.setScalar(range(.5, 1.1)); dummy.updateMatrix(); fieldGrass.setMatrixAt(i, dummy.matrix);
  }
  const gardenLeaves = instances(bladeGeometry(.165, .8, .26), leafDark, 940);
  for (let i = 0; i < gardenLeaves.count; i++) {
    const clump = Math.floor(i / 17), j = i % 17;
    const side = clump % 2 ? -1 : 1;
    const z = -.7 - Math.floor(clump / 2) * .36 + Math.sin(clump * 8.71) * .35;
    const x = side * (2.0 + Math.sin(clump * 1.32) * .75 + Math.floor(clump / 22) * 1.3);
    dummy.position.set(x, -.08 + j * .002, z);
    dummy.rotation.set(-range(.12, .8), j * 2.4, range(-.2, .2));
    dummy.scale.setScalar(range(.48, 1.2) * (.8 + Math.sin(clump * 9.2) * .2)); dummy.updateMatrix(); gardenLeaves.setMatrixAt(i, dummy.matrix);
    gardenLeaves.setColorAt(i, new THREE.Color().setHSL(range(.21, .29), range(.18, .4), range(.65, .86)));
  }
  // Dew is sparse and restricted to visible large leaves, never screen-space sparkles.
  const dewdrops = instances(new THREE.SphereGeometry(.016, 6, 4), new THREE.MeshPhysicalMaterial({ color: '#eef8de', roughness: .06, metalness: .13, transparent: true, opacity: .7, clearcoat: 1 }), 75);
  const leafMatrix = new THREE.Matrix4();
  for (let i = 0; i < 75; i++) {
    gardenLeaves.getMatrixAt(i * 3, leafMatrix);
    const t = range(.28, .72);
    dummy.position.set(0, .26 * t * t + Math.sin(t * Math.PI) * .165 * .22 + .006, .8 * t).applyMatrix4(leafMatrix);
    dummy.rotation.set(0, 0, 0); dummy.scale.set(range(.5, 1), .45, range(.5, 1));
    dummy.updateMatrix(); dewdrops.setMatrixAt(i, dummy.matrix);
  }

  // Scattered calendula/cosmos plantings: stems, central disks and curved petals.
  const flowerStems = instances(new THREE.CylinderGeometry(.012, .014, 1, 5), leafDark, 150);
  const petals = instances(bladeGeometry(.075, .21, .035, 4), new THREE.MeshStandardMaterial({ color: '#f4d193', side: THREE.DoubleSide, roughness: .7 }), 1350);
  const centers = instances(new THREE.SphereGeometry(.049, 6, 4), new THREE.MeshStandardMaterial({ color: '#9b7936', roughness: .93 }), 150);
  for (let i = 0; i < 150; i++) {
    const patch = i % 3;
    const x = [-2.5, 3.4, -6.6][patch] + range(-1, 1);
    const z = [-3.5, -5.5, -9][patch] + range(-1.2, 1.2);
    const height = range(.32, .8);
    dummy.position.set(x, height * .5 - .1, z); dummy.rotation.set(0, 0, range(-.13, .13));
    dummy.scale.set(1, height, 1); dummy.updateMatrix(); flowerStems.setMatrixAt(i, dummy.matrix);
    dummy.position.set(x, height - .1, z); dummy.rotation.set(0, 0, 0); dummy.scale.set(1, .45, 1); dummy.updateMatrix(); centers.setMatrixAt(i, dummy.matrix);
    const flowerColor = new THREE.Color(i % 5 === 0 ? '#e3dcd0' : i % 3 === 0 ? '#f0b969' : '#f8d89c');
    for (let k = 0; k < 9; k++) {
      dummy.position.set(x, height - .09, z); dummy.rotation.set(range(-.2, .05), k * Math.PI * 2 / 9, 0); dummy.scale.setScalar(range(.8, 1.05));
      dummy.updateMatrix(); petals.setMatrixAt(i * 9 + k, dummy.matrix); petals.setColorAt(i * 9 + k, flowerColor);
    }
  }

  const canopyMaterial = leafMaterial.clone();
  canopyMaterial.color.set('#c6d09f');
  canopyMaterial.emissiveIntensity = .04;
  const treeLeaves = instances(bladeGeometry(.13, .49, .07, 4), canopyMaterial, 8800);
  let leafIndex = 0;
  const trees = [
    [-5.4, -5.8, 6.7, .9], [6.8, -9, 7.2, .85], [-12.5, -19, 8.6, 1.3],
    [12, -23, 8.2, 1.5], [-7.2, -28, 7.4, 1.1], [2.8, -39, 10.2, 1.5], [19, -29, 9.2, 1.4],
  ];
  for (let treeIndex = 0; treeIndex < trees.length; treeIndex++) {
    const [x, z, height, spread] = trees[treeIndex];
    const trunkTop = new THREE.Vector3(x + Math.sin(treeIndex * 1.7) * .62, height * .8, z + Math.cos(treeIndex) * .35);
    branch(new THREE.Vector3(x, -.2, z), trunkTop, .27 * spread, .028 * spread);
    for (let b = 0; b < 8; b++) {
      const angle = b * 2.4 + treeIndex + range(-.3, .3);
      const start = new THREE.Vector3(x + Math.sin(treeIndex * 1.7) * .3, height * range(.27, .65), z);
      const end = new THREE.Vector3(x + Math.cos(angle) * range(1.1, 3.1) * spread, height * range(.55, 1.13), z + Math.sin(angle) * range(1.2, 2.7) * spread);
      branch(start, end, range(.058, .105) * spread, .014 * spread);
      for (let sub = 0; sub < 2; sub++) {
        const tip = end.clone().add(new THREE.Vector3(range(-.7, .7), range(.2, .7), range(-.7, .7)));
        branch(start.clone().lerp(end, .65), tip, .032 * spread, .008 * spread);
      }
      const leavesPerBranch = treeIndex < 2 ? 185 : 144;
      for (let j = 0; j < leavesPerBranch && leafIndex < treeLeaves.count; j++) {
        const a = random() * Math.PI * 2, radius = Math.pow(random(), .7) * range(.85, 1.5) * spread;
        dummy.position.set(end.x + Math.cos(a) * radius, end.y + range(-.8, .85) * spread, end.z + Math.sin(a) * radius);
        dummy.rotation.set(range(-1.1, .7), range(0, 6.28), range(-.65, .65));
        dummy.scale.setScalar(range(.65, 1.3) * spread); dummy.updateMatrix(); treeLeaves.setMatrixAt(leafIndex, dummy.matrix);
        treeLeaves.setColorAt(leafIndex, new THREE.Color().setHSL(range(.2, .29), range(.25, .47), range(.57, .83)));
        leafIndex++;
      }
    }
  }
  treeLeaves.count = leafIndex;
  const treeBranches = root.children.filter(object => object.userData.morningBark) as THREE.Mesh[];
  const transformedBranches = treeBranches.map(object => { object.updateMatrix(); return object.geometry.clone().applyMatrix4(object.matrix); });
  const mergedBranches = mergeGeometries(transformedBranches);
  if (mergedBranches) {
    mesh(mergedBranches, bark);
    treeBranches.forEach(object => { root.remove(object); object.geometry.dispose(); });
  }
  transformedBranches.forEach(geometry => geometry.dispose());
  // An irregular distant hedgerow anchors the fields to the landscape's horizon.
  const hedgeLeaves = instances(bladeGeometry(.065, .23, .045, 3), canopyMaterial, 2200);
  for (let i = 0; i < hedgeLeaves.count; i++) {
    const clump = Math.floor(i / 130);
    const centerX = -35 + clump * 4.2 + Math.sin(clump * 5.3) * .8;
    const offsetX = range(-2.1, 2.1);
    const x = centerX + offsetX;
    const z = -24 - Math.sin(centerX * .12) * 2.5 + range(-1.4, 1.4);
    const dome = Math.sqrt(Math.max(0, 1 - offsetX * offsetX / 4.5));
    const height = (.55 + Math.sin(clump * 3.7) * .2) * dome;
    dummy.position.set(x, range(.15, .95) + height, z);
    dummy.rotation.set(range(-1, .7), range(0, 6.28), range(-.5, .5)); dummy.scale.setScalar(range(1.2, 2.6));
    dummy.updateMatrix(); hedgeLeaves.setMatrixAt(i, dummy.matrix);
    hedgeLeaves.setColorAt(i, new THREE.Color().setHSL(range(.22, .3), range(.15, .28), range(.57, .72)));
  }

  // A tactile oiled table, linen and celadon tea set occupy the seated near field.
  const table = new THREE.Group(); root.add(table);
  table.position.set(.26, 0, 3.03);
  const topShape = new THREE.Shape();
  const tw = 1.85, td = 1.08, r = .12;
  topShape.moveTo(-tw / 2 + r, -td / 2);
  topShape.lineTo(tw / 2 - r, -td / 2); topShape.quadraticCurveTo(tw / 2, -td / 2, tw / 2, -td / 2 + r);
  topShape.lineTo(tw / 2, td / 2 - r); topShape.quadraticCurveTo(tw / 2, td / 2, tw / 2 - r, td / 2);
  topShape.lineTo(-tw / 2 + r, td / 2); topShape.quadraticCurveTo(-tw / 2, td / 2, -tw / 2, td / 2 - r);
  topShape.lineTo(-tw / 2, -td / 2 + r); topShape.quadraticCurveTo(-tw / 2, -td / 2, -tw / 2 + r, -td / 2);
  const topGeometry = new THREE.ExtrudeGeometry(topShape, { depth: .075, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: .012, bevelThickness: .011, curveSegments: 8 });
  topGeometry.rotateX(-Math.PI / 2);
  const tableTop = mesh(topGeometry, wood, [0, .84, 0], table); tableTop.receiveShadow = true;
  for (const x of [-.7, .7]) for (const z of [-.36, .36]) box(.07, .77, .07, darkWood, [x, .45, z], table);
  const linenMap = canvasTexture(128, (ctx, n) => {
    ctx.fillStyle = '#e7dfc9'; ctx.fillRect(0, 0, n, n);
    for (let i = 0; i < n; i += 2) {
      ctx.fillStyle = 'rgba(120,111,91,.055)'; ctx.fillRect(i, 0, 1, n);
      ctx.fillStyle = 'rgba(255,255,236,.16)'; ctx.fillRect(0, i, n, 1);
    }
  });
  linenMap.repeat.set(2, 2);
  const linenMaterial = new THREE.MeshStandardMaterial({ color: '#eee8d9', map: linenMap, bumpMap: linenMap, bumpScale: .0008, roughness: 1, side: THREE.DoubleSide });
  const linen = new THREE.PlaneGeometry(.71, .6, 12, 12);
  const lp = linen.attributes.position;
  for (let i = 0; i < lp.count; i++) lp.setZ(i, Math.sin(lp.getX(i) * 35) * .003 + Math.cos(lp.getY(i) * 24) * .003);
  linen.computeVertexNormals();
  const cloth = mesh(linen, linenMaterial, [.4, .947, .015], table); cloth.rotation.x = -Math.PI / 2; cloth.rotation.z = .14;
  const glaze = new THREE.MeshPhysicalMaterial({ map: glazeMap, color: '#e0e1c8', roughness: .27, clearcoat: .65, clearcoatRoughness: .21, bumpMap: glazeMap, bumpScale: .0006 });
  const rimMaterial = new THREE.MeshStandardMaterial({ color: '#97815a', roughness: .64 });
  const teaSet = new THREE.Group(); table.add(teaSet); teaSet.position.set(-.15, .94, -.035);
  const saucerProfile = [[0, .008], [.14, .008], [.2, .012], [.285, .035], [.32, .055], [.315, .069], [.27, .057], [.2, .027], [.14, .025], [0, .025]].map(([x, y]) => new THREE.Vector2(x, y));
  mesh(new THREE.LatheGeometry(saucerProfile, 48), glaze, [0, 0, 0], teaSet);
  const cupProfile = [[.13, .029], [.155, .033], [.168, .06], [.18, .19], [.206, .318], [.203, .33], [.187, .33], [.183, .312], [.16, .17], [.147, .065], [.12, .057], [0, .057], [0, .037]].map(([x, y]) => new THREE.Vector2(x, y));
  const cup = mesh(new THREE.LatheGeometry(cupProfile, 64), glaze, [0, .02, 0], teaSet);
  cup.name = 'morning-tea-cup';
  const rim = mesh(new THREE.TorusGeometry(.197, .004, 6, 64), rimMaterial, [0, .352, 0], teaSet); rim.rotation.x = Math.PI / 2;
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(.19, .294, 0), new THREE.Vector3(.31, .305, 0), new THREE.Vector3(.356, .224, 0), new THREE.Vector3(.318, .124, 0), new THREE.Vector3(.17, .103, 0),
  ]);
  const handle = mesh(new THREE.TubeGeometry(handleCurve, 28, .025, 8, false), glaze, [0, .02, 0], teaSet);
  handle.name = 'morning-tea-cup-handle';
  const tea = mesh(new THREE.CircleGeometry(.183, 64), new THREE.MeshPhysicalMaterial({ color: '#748145', roughness: .17, metalness: .11, clearcoat: 1, clearcoatRoughness: .1 }), [0, .328, 0], teaSet);
  tea.rotation.x = -Math.PI / 2; tea.name = 'morning-tea-surface';
  const meniscus = mesh(new THREE.TorusGeometry(.18, .003, 5, 64), new THREE.MeshPhysicalMaterial({ color: '#c5c69e', roughness: .2, metalness: .2 }), [0, .329, 0], teaSet); meniscus.rotation.x = Math.PI / 2;
  const rippleMaterials: THREE.MeshBasicMaterial[] = [];
  const ripples: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: '#f0e9c6', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
    const ring = mesh(new THREE.RingGeometry(.9, 1, 48), mat, [0, .330 + i * .0002, 0], teaSet); ring.rotation.x = -Math.PI / 2;
    rippleMaterials.push(mat); ripples.push(ring);
  }
  // A modest book is closed and partly beneath the linen, with independent page edges.
  const book = new THREE.Group(); table.add(book); book.position.set(.5, .987, -.13); book.rotation.y = -.18;
  const bookCover = new THREE.MeshStandardMaterial({ color: '#667060', roughness: .95 });
  box(.35, .038, .48, new THREE.MeshStandardMaterial({ color: '#dbd0ae', roughness: 1 }), [0, 0, 0], book);
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
      fragmentShader: `uniform float time;uniform float phase;uniform float strength;varying vec2 vUv;void main(){float a=exp(-pow((vUv.x-.5)*5.,2.));a*=sin(vUv.y*3.14159)*pow(1.-vUv.y,1.2);a*=.65+.35*sin(vUv.y*22.-time*1.1+phase);gl_FragColor=vec4(.94,.95,.88,a*strength);}`,
    });
    const steam = mesh(new THREE.PlaneGeometry(.11, .58, 4, 18), material, [(i - 1) * .045, .62 + i * .035, -.015], teaSet);
    steam.rotation.y = (i - 1) * .55; steam.castShadow = false; steam.receiveShadow = false;
    steamMaterials.push(material);
  }

  // One low-contrast bird perched on the wall; its tiny head turn stays unintrusive.
  const bird = new THREE.Group(); root.add(bird); bird.position.set(-1.35, .947, -12.32); bird.rotation.y = .9;
  const feather = new THREE.MeshStandardMaterial({ color: '#717264', roughness: 1 });
  const birdBody = mesh(new THREE.SphereGeometry(1, 12, 8), feather, [0, .063, 0], bird); birdBody.scale.set(.06, .072, .112); birdBody.rotation.x = -.3;
  const head = new THREE.Group(); bird.add(head); head.position.set(0, .13, -.064);
  mesh(new THREE.SphereGeometry(.047, 10, 8), feather, [0, 0, 0], head);
  const beak = mesh(new THREE.ConeGeometry(.013, .053, 5), new THREE.MeshStandardMaterial({ color: '#7b6546', roughness: .85 }), [0, -.006, -.061], head); beak.rotation.x = -Math.PI / 2;
  for (const x of [-.027, .027]) branch(new THREE.Vector3(x, .016, 0), new THREE.Vector3(x, -.03, -.01), .006, .006, feather, bird);
  const tail = mesh(bladeGeometry(.035, .16, .01, 3), feather, [0, .066, .058], bird); tail.rotation.x = -.36;

  let touchedAt = -100;
  const initialTreeY = treeLeaves.position.y;
  return {
    interactionTargets: [cup, tea, handle],
    interact(_hit, time) { touchedAt = time; },
    resize(aspect) {
      camera.position.set(0, aspect < .8 ? 1.64 : 1.68, aspect < .8 ? 5 : 4.8);
      camera.fov = aspect < .8 ? 58 : 53;
      camera.lookAt(aspect < .8 ? .04 : 0, aspect < .8 ? .32 : 1.25, -8);
      camera.updateProjectionMatrix();
      table.position.x = aspect < .8 ? .12 : .26;
    },
    update(time) {
      const elapsed = time - touchedAt;
      const pulse = elapsed >= 0 && elapsed < 4 ? Math.exp(-elapsed * .8) : 0;
      for (let i = 0; i < ripples.length; i++) {
        const phase = elapsed * .85 - i * .3;
        const t = phase - Math.floor(phase);
        ripples[i].scale.setScalar(.02 + t * .15);
        rippleMaterials[i].opacity = phase >= 0 ? pulse * (1 - t) * .31 : 0;
      }
      for (const mat of steamMaterials) {
        mat.uniforms.time.value = time;
        mat.uniforms.strength.value = .17 + pulse * .14;
      }
      treeLeaves.position.x = Math.sin(time * .21) * .025;
      treeLeaves.position.y = initialTreeY + Math.sin(time * .27 + 1) * .013;
      gardenLeaves.rotation.z = Math.sin(time * .32) * .002;
      grass.rotation.z = Math.sin(time * .39) * .0007;
      fieldGrass.rotation.z = Math.sin(time * .19) * .001;
      petals.position.x = Math.sin(time * .51) * .008;
      head.rotation.y = Math.sin(time * .15) * .2;
    },
  };
}
