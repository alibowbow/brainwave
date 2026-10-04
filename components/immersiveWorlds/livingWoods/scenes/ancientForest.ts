import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldContent } from '../types';

/** Independent, metre-scale old-growth forest. All forms/textures are authored here. */
export function createAncientForest(scene: THREE.Scene, camera: THREE.PerspectiveCamera): WorldContent {
  let seed = 74129;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const tau = Math.PI * 2;
  const root = new THREE.Group();
  root.name = 'ancient-forest-world';
  scene.add(root);
  scene.background = new THREE.Color('#647566');
  scene.fog = new THREE.FogExp2('#647566', .029);
  camera.position.set(.15, 1.42, 5.25);
  camera.lookAt(.1, 2.75, -9.8);
  camera.fov = 58;
  camera.near = .08;
  camera.far = 95;
  camera.updateProjectionMatrix();

  const hemi = new THREE.HemisphereLight('#d6e2c6', '#333727', 1.8);
  root.add(hemi);
  const sun = new THREE.DirectionalLight('#ffdfa5', 3.2);
  sun.position.set(7, 18, -9);
  sun.target.position.set(0, 0, -2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 18, bottom: -16, near: 1, far: 48 });
  sun.shadow.bias = -.0004;
  sun.shadow.normalBias = .035;
  sun.shadow.radius = 3;
  root.add(sun, sun.target);
  const shade = new THREE.DirectionalLight('#8fbdb0', .58);
  shade.position.set(-10, 7, 5);
  root.add(shade);
  const bounce = new THREE.PointLight('#daca82', 2.1, 9, 2);
  bounce.position.set(.6, 2.4, -.5);
  root.add(bounce);

  function texture(kind: 'bark' | 'floor') {
    const canvas = document.createElement('canvas');
    canvas.width = kind === 'bark' ? 512 : 512;
    canvas.height = kind === 'bark' ? 1024 : 512;
    const ctx = canvas.getContext('2d')!;
    const image = ctx.createImageData(canvas.width, canvas.height);
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const j = (y * canvas.width + x) * 4;
        const grain = random() * 29;
        const cracks = kind === 'bark' ? Math.pow(Math.abs(Math.sin(x * .083 + Math.sin(y * .008) * .9 + Math.sin(x * .035 + y * .014) * .5)), 14) * 38 : 0;
        const broad = Math.sin(x * .038 + Math.sin(y * .007)) * 9 + Math.sin(y * .051 + x * .059) * 5;
        const val = (kind === 'bark' ? 112 : 71) + broad + grain - cracks;
        image.data[j] = val * (kind === 'bark' ? .96 : .86);
        image.data[j + 1] = val * (kind === 'bark' ? .94 : .94);
        image.data[j + 2] = val * (kind === 'bark' ? .8 : .64);
        image.data[j + 3] = 255;
      }
    }
    ctx.putImageData(image, 0, 0);
    if (kind === 'bark') {
      for (let i = 0; i < 235; i++) {
        const x = random() * 512, y = random() * 1024, length = 35 + random() * 300;
        ctx.beginPath(); ctx.moveTo(x, y);
        ctx.bezierCurveTo(x - 10, y + length * .33, x + 12, y + length * .6, x - 2, y + length);
        ctx.strokeStyle = `rgba(30,32,24,${.18 + random() * .32})`;
        ctx.lineWidth = .6 + random() * 2.2; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + 2.5, y + 4); ctx.lineTo(x + 4, y + length * .8);
        ctx.strokeStyle = 'rgba(197,194,159,.18)'; ctx.lineWidth = 1; ctx.stroke();
      }
    } else {
      for (let i = 0; i < 5200; i++) {
        const x = random() * 512, y = random() * 512;
        ctx.fillStyle = ['#454936', '#343b29', '#656145', '#74704a', '#576047'][Math.floor(random() * 5)];
        ctx.beginPath(); ctx.ellipse(x, y, .5 + random() * 4, .5 + random() * 2, random() * tau, 0, tau); ctx.fill();
      }
    }
    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(kind === 'bark' ? 2.5 : 12, kind === 'bark' ? 2 : 12);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
    return map;
  }
  const barkMap = texture('bark');
  const floorMap = texture('floor');
  const bark = new THREE.MeshStandardMaterial({ map: barkMap, bumpMap: barkMap, bumpScale: .13, roughness: .98, vertexColors: true });
  const darkBark = new THREE.MeshStandardMaterial({ map: barkMap, bumpMap: barkMap, bumpScale: .08, roughness: 1, color: '#899380', vertexColors: true });
  const moss = new THREE.MeshStandardMaterial({ color: '#71864c', roughness: 1, vertexColors: true });
  const leafMat = new THREE.MeshStandardMaterial({ color: '#71945a', side: THREE.DoubleSide, roughness: .91, vertexColors: true });
  const canopyMat = new THREE.MeshStandardMaterial({ color: '#607d45', side: THREE.DoubleSide, roughness: .87 });
  const twigMat = new THREE.MeshStandardMaterial({ color: '#655942', roughness: 1 });
  const litterMat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 1, vertexColors: true });
  const ground = new THREE.PlaneGeometry(120, 120, 130, 130);
  ground.rotateX(-Math.PI / 2);
  const groundY = (x: number, z: number) => -.16 + .15 * Math.sin(x * .28 + z * .14) + .10 * Math.cos(z * .61 + x * .28) + Math.max(0, -z - 12) * .023;
  const gp = ground.getAttribute('position');
  for (let i = 0; i < gp.count; i++) gp.setY(i, groundY(gp.getX(i), gp.getZ(i)));
  ground.computeVertexNormals();
  const groundMesh = new THREE.Mesh(ground, new THREE.MeshStandardMaterial({ map: floorMap, bumpMap: floorMap, bumpScale: .12, roughness: 1, color: '#a4a783' }));
  groundMesh.receiveShadow = true; root.add(groundMesh);

  const barkPieces: THREE.BufferGeometry[] = [], farBarkPieces: THREE.BufferGeometry[] = [], mossPieces: THREE.BufferGeometry[] = [];
  function tube(points: THREE.Vector3[], radius: number, taper: number, segments = 30, radial = 12, mossTop = false) {
    const curve = new THREE.CatmullRomCurve3(points);
    const g = new THREE.TubeGeometry(curve, segments, 1, radial, false);
    const pos = g.getAttribute('position'), uv = g.getAttribute('uv');
    const frames = curve.computeFrenetFrames(segments, false);
    const colors = new Float32Array(pos.count * 3);
    for (let j = 0; j <= segments; j++) {
      const t = j / segments, center = curve.getPointAt(t);
      const r = radius * Math.pow(1 - t * .96, taper);
      for (let k = 0; k <= radial; k++) {
        const i = j * (radial + 1) + k, a = k / radial * tau;
        const ripple = 1 + .075 * Math.sin(a * 5 + t * 17) + .045 * Math.sin(a * 9 - t * 29);
        const n = frames.normals[j], b = frames.binormals[j];
        pos.setXYZ(i, center.x + (-Math.cos(a) * n.x + Math.sin(a) * b.x) * r * ripple,
          center.y + (-Math.cos(a) * n.y + Math.sin(a) * b.y) * r * ripple,
          center.z + (-Math.cos(a) * n.z + Math.sin(a) * b.z) * r * ripple);
        const c = new THREE.Color(mossTop ? '#a1b184' : '#aaab94');
        c.multiplyScalar(.79 + .19 * Math.sin(a * 3 + t * 14) ** 2);
        colors.set([c.r, c.g, c.b], i * 3);
        uv.setXY(i, k / radial, t * (points[0].distanceTo(points[points.length - 1]) / 4));
      }
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3)); g.computeVertexNormals();
    return g;
  }
  function trunk(x: number, z: number, radius: number, height: number, lean: number, near: boolean) {
    const radial = near ? 44 : 16, levels = near ? 56 : 18;
    const g = new THREE.CylinderGeometry(1, 1, 1, radial, levels, true);
    const pos = g.getAttribute('position'), colors = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const t = pos.getY(i) + .5;
      const a = Math.atan2(pos.getX(i), pos.getZ(i));
      const flare = .98 + Math.exp(-t * 15) * .73;
      const ridge = 1 + .07 * Math.sin(a * 9 + t * 8) + .06 * Math.sin(a * 5 - t * 3) + .02 * Math.sin(a * 23 + t * 44);
      const r = radius * (1 - t * .44) * flare * ridge;
      const y = t * height + groundY(x, z);
      pos.setXYZ(i, x + Math.sin(a) * r + lean * t * t, y, z + Math.cos(a) * r + Math.sin(t * 3) * radius * .22);
      const c = new THREE.Color(t < .12 && Math.sin(a * 3 + t * 18) > -.2 ? '#869579' : '#b3aea0');
      c.multiplyScalar(.82 + .18 * Math.sin(a * 6 + .4) ** 2);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3)); g.computeVertexNormals();
    (near ? barkPieces : farBarkPieces).push(g);
  }
  const oldX = -3.6, oldZ = -3.8;
  trunk(oldX, oldZ, 1.65, 25, -.9, true);
  const rootCurves = [
    [new THREE.Vector3(-3.1, 1.9, -3.4), new THREE.Vector3(-2.05, .80, -1.6), new THREE.Vector3(-.3, .31, .1), new THREE.Vector3(1.18, .0, 2.4)],
    [new THREE.Vector3(-3.4, 1.3, -2.9), new THREE.Vector3(-4.2, .52, -1.0), new THREE.Vector3(-3.6, .13, 2.7), new THREE.Vector3(-4.3, -.02, 4.9)],
    [new THREE.Vector3(-2.6, 1.5, -4.1), new THREE.Vector3(-.9, .43, -4.6), new THREE.Vector3(.8, .11, -5.9), new THREE.Vector3(2.9, -.04, -6.4)],
    [new THREE.Vector3(-4.0, 1.0, -4.5), new THREE.Vector3(-5.3, .42, -6.3), new THREE.Vector3(-7.2, .04, -8.9)],
    [new THREE.Vector3(-4.1, 1.7, -3.6), new THREE.Vector3(-5.8, .45, -2.1), new THREE.Vector3(-8.3, -.04, -.9)],
  ];
  rootCurves.forEach((p, i) => {
    const r = i === 0 ? .58 : .49;
    barkPieces.push(tube(p, r, .65, 46, 18));
    // Broken moss strips follow the upper crest instead of a smooth green sleeve.
    for (let strip = 0; strip < 5; strip++) {
      const curve = new THREE.CatmullRomCurve3(p);
      const start = .12 + strip * .15;
      const vertices: number[] = [], colors: number[] = [], uvs: number[] = [], indices: number[] = [];
      const rows = 14, cols = 9;
      for (let row = 0; row <= rows; row++) {
        const t = start + row / rows * .13;
        const center = curve.getPointAt(t), tangent = curve.getTangentAt(t);
        const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        const radius = r * Math.pow(1 - t * .96, .65);
        for (let col = 0; col <= cols; col++) {
          const theta = ((col / cols) - .5) * (1.35 + .2 * Math.sin(row * 1.7));
          const thickness = .014 + random() * .029;
          const v = center.clone().addScaledVector(side, Math.sin(theta) * (radius + thickness));
          v.y += Math.cos(theta) * (radius + thickness);
          vertices.push(v.x,v.y,v.z); uvs.push(col / cols,row / rows);
          const color = new THREE.Color().setHSL(.20 + random() * .035,.27 + random() * .21,.40 + random() * .17);
          colors.push(color.r,color.g,color.b);
          if (row < rows && col < cols) {
            const a = row * (cols + 1) + col;
            indices.push(a,a+1,a+cols+1,a+1,a+cols+2,a+cols+1);
          }
        }
      }
      const patch = new THREE.BufferGeometry();
      patch.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
      patch.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
      patch.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
      patch.setIndex(indices);patch.computeVertexNormals();mossPieces.push(patch);
    }
  });
  barkPieces.push(tube([new THREE.Vector3(-3.0, 8.5, -3.8), new THREE.Vector3(-.8, 10.3, -5.3), new THREE.Vector3(3.0, 11.4, -5.9), new THREE.Vector3(6.7, 11.8, -9.0)], .53, 1, 35, 16));
  barkPieces.push(tube([new THREE.Vector3(-3.8, 12.5, -3.8), new THREE.Vector3(-5.6, 14.2, -1.4), new THREE.Vector3(-8.2, 14.3, 1.3)], .53, 1, 24, 14));

  const trees = [
    [5.6, -6, .66, 24], [2.6, -13.0, .8, 28], [-8, -12, .7, 24], [-1.7, -18.5, .73, 31],
    [7.7, -17, .53, 26], [-7.4, -22, .47, 28], [12, -24, .6, 30], [2.5, -29, .66, 32],
    [-14, -16, .9, 29], [-12, -34, .47, 30], [16, -33, .6, 31], [-.8, -42, .55, 30],
  ];
  for (let i = 0; i < 51; i++) {
    const z = -13 - random() * 55, x = (random() - .5) * 65;
    if (Math.abs(x) < 4 && z > -20) continue;
    trees.push([x, z, .18 + random() * .39, 19 + random() * 15]);
  }
  trees.forEach(([x, z, r, h], i) => {
    trunk(x, z, r, h, (random() - .5) * 2, false);
    if (i < 17) {
      for (let b = 0; b < 3; b++) {
        const angle = random() * tau, y = h * (.36 + b * .16), reach = 3 + random() * 4;
        farBarkPieces.push(tube([new THREE.Vector3(x, y, z), new THREE.Vector3(x + Math.cos(angle) * reach * .55, y + 1.1, z + Math.sin(angle) * reach * .55), new THREE.Vector3(x + Math.cos(angle) * reach, y + 1.7, z + Math.sin(angle) * reach)], r * .43, .9, 15, 7));
      }
    }
  });

  // Decayed fallen timber introduces a horizontal landmark and broken organic silhouette.
  const fallen = [new THREE.Vector3(2.3, .34, -8.2), new THREE.Vector3(4.4, .48, -10.2), new THREE.Vector3(7.8, .20, -11.4)];
  barkPieces.push(tube(fallen, .51, .2, 30, 18));
  mossPieces.push(tube(fallen.map(v => v.clone().add(new THREE.Vector3(0, .47, 0))), .11, .4, 30, 10, true));
  for (let i = 0; i < 6; i++) {
    const angle = i * 1.1;
    barkPieces.push(tube([new THREE.Vector3(2.3, .34, -8.2), new THREE.Vector3(2.3 + Math.sin(angle) * .37, .3 + Math.cos(angle) * .35, -7.8 + random() * .3)], .12, 1.2, 6, 5));
  }
  function merged(parts: THREE.BufferGeometry[], material: THREE.Material, shadow: boolean) {
    const g = mergeGeometries(parts.map(part => part.index ? part.toNonIndexed() : part), false)!;
    const mesh = new THREE.Mesh(g, material); mesh.castShadow = shadow; mesh.receiveShadow = true; root.add(mesh);
    parts.forEach(p => p.dispose()); return mesh;
  }
  merged(barkPieces, bark, true); merged(farBarkPieces, darkBark, true); merged(mossPieces, moss, false);

  // Individual three-dimensional canopy leaves, never sphere foliage.
  function leafGeometry() {
    const g = new THREE.BufferGeometry();
    const vertices = [0,0,0, -.15,.23,.035, -.22,.55,.06, -.12,.84,.03, 0,1,0, .15,.8,.032, .22,.47,.06, .13,.19,.03, 0,.48,.11];
    const indices: number[] = [];
    for (let i = 0; i < 8; i++) indices.push(i, (i + 1) % 8, 8);
    g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); g.setIndex(indices); g.computeVertexNormals(); return g;
  }
  const leafGeo = leafGeometry();
  const canopies: THREE.InstancedMesh[] = [];
  const temp = new THREE.Object3D();
  const clusterOrigins = [new THREE.Vector3(-3, 11.5, -4.8), new THREE.Vector3(3.5, 11.6, -7.2), new THREE.Vector3(-7, 9, -6), ...trees.slice(0, 24).map(t => new THREE.Vector3(t[0], t[3] * .54, t[1]))];
  for (let layer = 0; layer < 3; layer++) {
    const count = 2400, leaves = new THREE.InstancedMesh(leafGeo, canopyMat, count);
    leaves.instanceMatrix.setUsage(THREE.StaticDrawUsage);
    for (let i = 0; i < count; i++) {
      const c = clusterOrigins[Math.floor(random() * clusterOrigins.length)];
      const a = random() * tau, r = Math.sqrt(random()) * 6;
      temp.position.set(c.x + Math.cos(a) * r, c.y + (random() - .5) * 2.8 + layer * 1.7, c.z + Math.sin(a) * r);
      temp.rotation.set(Math.PI / 2 + (random() - .5) * 1.1, random() * tau, random() * tau);
      const size = .55 + random() * .72;
      temp.scale.set(size, size, size); temp.updateMatrix(); leaves.setMatrixAt(i, temp.matrix);
      leaves.setColorAt(i, new THREE.Color().setHSL(.21 + random() * .075, .28 + random() * .2, .37 + random() * .21));
    }
    leaves.castShadow = true; leaves.receiveShadow = true; root.add(leaves); canopies.push(leaves);
  }

  // Ground fern pinnae are folded surfaces with a central rib. Asymmetric fronds
  // overlap the root silhouettes and carry the localized warm illumination.
  const fernPositions: number[] = [], fernColors: number[] = [];
  function triangle(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, color: THREE.Color, positions = fernPositions, colors = fernColors) {
    for (const v of [a,b,c]) { positions.push(v.x,v.y,v.z); colors.push(color.r,color.g,color.b); }
  }
  function fern(x: number, z: number, size: number, density = 8) {
    const baseY = groundY(x,z) + .03;
    for (let f = 0; f < density; f++) {
      const a = f / density * tau + random() * .6;
      const length = size * (.65 + random() * .5);
      const forward = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
      const sideways = new THREE.Vector3(-Math.sin(a), 0, Math.cos(a));
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 14; j++) {
        const t = j / 14;
        points.push(new THREE.Vector3(x, baseY + Math.sin(t * Math.PI * .86) * size * .61 + .045, z).addScaledVector(forward, t * length));
      }
      for (let j = 1; j < 14; j++) {
        const t = j / 14;
        const p = points[j];
        const half = size * .23 * Math.sin(Math.PI * t) ** .7;
        for (const side of [-1,1]) {
          const tip = p.clone().addScaledVector(sideways, half * side).addScaledVector(forward, length * .075);
          tip.y -= .025 * size;
          const sideA = p.clone().lerp(tip,.45).addScaledVector(forward, -size * .044);
          const sideB = p.clone().lerp(tip,.58).addScaledVector(forward, size * .038);
          const mid = p.clone().lerp(tip,.50); mid.y += size * .021;
          const color = new THREE.Color().setHSL(.215 + random() * .045, .32 + random() * .16, .35 + random() * .18);
          triangle(p, sideA, mid, color); triangle(sideA, tip, mid, color);
          color.multiplyScalar(1.12); triangle(tip, sideB, mid, color); triangle(sideB, p, mid, color);
        }
        const ribA = p.clone().addScaledVector(sideways, .008 * size), ribB = p.clone().addScaledVector(sideways,-.008*size);
        triangle(ribA, ribB, points[j+1], new THREE.Color('#b3bd77'));
      }
    }
  }
  fern(1.57, 1.12, 1.27, 10); fern(-1.16, 1.46, .83, 9); fern(2.8, -1.8, 1.0); fern(-.9,-4.3,.81);
  for (let i = 0; i < 68; i++) {
    const x = (random() - .5) * 33, z = 2 - random() * 35;
    if (Math.abs(x) < 1.8 && z > -6 && z < .8) continue;
    fern(x,z,.42 + random() * .82, 6 + Math.floor(random()*3));
  }
  const fernGeo = new THREE.BufferGeometry();
  fernGeo.setAttribute('position', new THREE.Float32BufferAttribute(fernPositions,3));
  fernGeo.setAttribute('color', new THREE.Float32BufferAttribute(fernColors,3)); fernGeo.computeVertexNormals();
  const fernMesh = new THREE.Mesh(fernGeo,leafMat); fernMesh.receiveShadow = true; root.add(fernMesh);

  // Scattered real leaf litter catches light at different angles, breaking a flat ground plane.
  const litterPositions: number[] = [], litterColors: number[] = [];
  for (let i = 0; i < 760; i++) {
    const x = (random()-.5)*28, z = 4-random()*27, a=random()*tau, s=.035+random()*.13;
    const c = new THREE.Vector3(x,groundY(x,z)+.025,z);
    const d = new THREE.Vector3(Math.cos(a)*s,0,Math.sin(a)*s), e = new THREE.Vector3(-d.z*.47,.008+random()*.02,d.x*.47);
    const color = new THREE.Color().setHSL(.08+random()*.07,.24+random()*.25,.2+random()*.12);
    triangle(c.clone().sub(d), c.clone().add(e), c.clone().add(d),color,litterPositions,litterColors);
    triangle(c.clone().sub(d), c.clone().add(d), c.clone().sub(e),color,litterPositions,litterColors);
  }
  const litterGeo = new THREE.BufferGeometry(); litterGeo.setAttribute('position',new THREE.Float32BufferAttribute(litterPositions,3)); litterGeo.setAttribute('color',new THREE.Float32BufferAttribute(litterColors,3)); litterGeo.computeVertexNormals();
  const litter = new THREE.Mesh(litterGeo,litterMat); litter.receiveShadow = true; root.add(litter);

  // Tactile sapling in the shared portrait centre-right. Touch only deflects this twig.
  const sprig = new THREE.Group(); sprig.position.set(1.13,.0,1.45); root.add(sprig);
  const stemCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0),new THREE.Vector3(-.09,.52,-.05),new THREE.Vector3(-.27,1.06,-.12)]);
  const stem = new THREE.Mesh(new THREE.TubeGeometry(stemCurve,20,.012,6,false),twigMat); sprig.add(stem);
  const nearLeaves: THREE.Object3D[] = [];
  const broadleaf = new THREE.MeshStandardMaterial({ color:'#7e9c50', roughness:.78, side:THREE.DoubleSide });
  for (let i=0;i<7;i++) {
    const t=.23+i*.105, p=stemCurve.getPoint(t), side=i%2===0?1:-1;
    const leaf=new THREE.Mesh(leafGeo,broadleaf); leaf.position.copy(p);
    leaf.rotation.set(-.38,.32*side,-side*(.8+i*.035)); leaf.scale.set(.55,.48+(i%3)*.07,.55);
    leaf.castShadow=true;leaf.receiveShadow=true;leaf.userData.livingWoodsInteraction='leaf';sprig.add(leaf);nearLeaves.push(leaf);
    const vein = new THREE.Mesh(new THREE.CylinderGeometry(.0017,.003,.82,4),new THREE.MeshStandardMaterial({ color:'#c6ca8a',roughness:1 }));
    vein.position.set(0,.46,.107); vein.scale.set(1,1,1); leaf.add(vein);
  }
  const restRotation = .08; sprig.rotation.z=restRotation;
  let touchedAt=-100;

  // Very small drifting dust motes only in the sunlit opening; no glowing firefly show.
  const motesGeo = new THREE.BufferGeometry(), motesPositions = new Float32Array(34*3);
  for(let i=0;i<34;i++){motesPositions[i*3]=-1+random()*5;motesPositions[i*3+1]=.3+random()*4.5;motesPositions[i*3+2]=-2-random()*13;}
  motesGeo.setAttribute('position',new THREE.BufferAttribute(motesPositions,3));
  const motes=new THREE.Points(motesGeo,new THREE.PointsMaterial({color:'#e4d6a3',size:.025,transparent:true,opacity:.33,depthWrite:false}));root.add(motes);

  // A tiny distant insect uses two folded wing planes; life stays low contrast.
  const insect = new THREE.Group(); insect.position.set(.9,1.7,-13); root.add(insect);
  const wingMaterial = new THREE.MeshStandardMaterial({ color:'#9a9f76',roughness:1,side:THREE.DoubleSide });
  const wings:THREE.Mesh[]=[];
  for(const side of [-1,1]){
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,side*.026,.035,0,side*.064,.004,.01,side*.032,-.021,0],3));geometry.setIndex([0,1,2,0,2,3]);geometry.computeVertexNormals();
    const wing=new THREE.Mesh(geometry,wingMaterial);insect.add(wing);wings.push(wing);
  }
  return {
    interactionTargets: nearLeaves,
    interact(_hit: THREE.Intersection, time: number) { touchedAt=time; },
    update(time: number, _dt: number) {
      const elapsed=time-touchedAt;
      const response=elapsed>=0&&elapsed<5?Math.exp(-elapsed*1.25)*Math.sin(elapsed*4)*.19:0;
      sprig.rotation.z=restRotation+Math.sin(time*.35)*.011+response;
      sprig.rotation.x=Math.sin(time*.27+1)*.008;
      canopies.forEach((canopy,i)=>{canopy.rotation.z=Math.sin(time*.085+i*1.9)*.0011;});
      motes.position.x=Math.sin(time*.07)*.23;motes.position.y=Math.sin(time*.11)*.08;
      insect.position.x=.9+Math.sin(time*.13)*.38;insect.position.y=1.7+Math.sin(time*.21)*.09;
      wings[0].rotation.y=Math.sin(time*3.2)*.4;wings[1].rotation.y=-Math.sin(time*3.2)*.4;
    },
    resize(aspect:number) {
      camera.fov=aspect<.8?61:58;
      camera.position.set(aspect<.8?.2:.15,1.42,aspect<.8?5.50:5.25);
      camera.lookAt(aspect<.8?-.1:.1,aspect<.8?2.6:2.75,-9.8);
      camera.updateProjectionMatrix();
    },
  };
}
