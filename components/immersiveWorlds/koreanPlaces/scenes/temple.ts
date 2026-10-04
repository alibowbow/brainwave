import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { SceneContent, WorldInteraction } from '../types';

/** Original, procedural Korean mountain bell pavilion. No fetched or copied assets. */
export function createTempleScene(): SceneContent {
  const scene = new THREE.Scene();
  scene.name = 'Temple dawn — seated bell pavilion';
  scene.background = new THREE.Color('#b4cbd0');
  scene.fog = new THREE.FogExp2('#b8cbcc', 0.0105);
  scene.userData.exposure = 1.16;
  const camera = new THREE.PerspectiveCamera(53, 1, 0.06, 210);
  const staticRoot = new THREE.Group();
  scene.add(staticRoot);
  let seed = 71103;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const mix = (a: number, b: number) => a + (b - a) * random();
  const texture = (kind: 'wood' | 'bronze' | 'stone' | 'tile') => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const base = { wood: [96, 61, 39], bronze: [78, 91, 67], stone: [129, 129, 117], tile: [59, 75, 77] }[kind];
    const pixels = ctx.createImageData(256, 256);
    for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) {
      const p = (y * 256 + x) * 4;
      let n = (random() - .5) * (kind === 'wood' ? 15 : 23);
      if (kind === 'wood') n += Math.sin(x * .39 + Math.sin(y * .05) * 1.2) * 8 + Math.sin(x * 1.51 + Math.sin(y * .021)) * 3;
      if (kind === 'bronze') n += Math.sin(x * .087 + Math.sin(y * .084) * 2) * Math.sin(y * .036) * 23;
      if (kind === 'stone') n += Math.sin(x * .043 + y * .059) * 7;
      for (let c = 0; c < 3; c++) pixels.data[p + c] = Math.max(0, Math.min(255, base[c] + n));
      pixels.data[p + 3] = 255;
    }
    ctx.putImageData(pixels, 0, 0);
    if (kind === 'wood') {
      for (let i = 0; i < 38; i++) {
        const x = random() * 256; ctx.strokeStyle = `rgba(27,17,10,${mix(.08, .24)})`; ctx.lineWidth = mix(.4, 1.6);
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.bezierCurveTo(x + mix(-4, 4), 80, x + mix(-4, 4), 200, x, 256); ctx.stroke();
      }
      for (let i = 0; i < 5; i++) { const x = mix(15, 240), y = mix(15, 240); for (let r = 3; r < 14; r += 3) { ctx.strokeStyle = 'rgba(42,23,12,.15)'; ctx.beginPath(); ctx.ellipse(x, y, r * .45, r * 2.1, .12, 0, Math.PI * 2); ctx.stroke(); } }
    }
    const result = new THREE.CanvasTexture(canvas); result.colorSpace = THREE.SRGBColorSpace;
    result.wrapS = result.wrapT = THREE.RepeatWrapping; result.anisotropy = 4;
    return result;
  };
  const woodMap = texture('wood'), bronzeMap = texture('bronze'), stoneMap = texture('stone'), tileMap = texture('tile');
  const wood = new THREE.MeshStandardMaterial({ map: woodMap, roughness: .84, color: '#d2b190' });
  const oldWood = new THREE.MeshStandardMaterial({ map: woodMap, roughness: .93, color: '#806d58' });
  const deckWood = new THREE.MeshStandardMaterial({ map: woodMap, roughness: .84, color: '#d9c09c' });
  const red = new THREE.MeshStandardMaterial({ map: woodMap, roughness: .77, color: '#bd735a' });
  const jade = new THREE.MeshStandardMaterial({ color: '#528575', roughness: .85 });
  const darkJade = new THREE.MeshStandardMaterial({ color: '#234f47', roughness: .85 });
  const paintedCream = new THREE.MeshStandardMaterial({ color: '#cfb889', roughness: .83 });
  const cinnabar = new THREE.MeshStandardMaterial({ color: '#b36143', roughness: .84 });
  const tile = new THREE.MeshStandardMaterial({ map: tileMap, color: '#b4b9ae', roughness: .79 });
  const tileEdge = new THREE.MeshStandardMaterial({ color: '#414d4c', roughness: .84 });
  const plaster = new THREE.MeshStandardMaterial({ color: '#d4c8ac', roughness: .98 });
  const stone = new THREE.MeshStandardMaterial({ map: stoneMap, color: '#b8b6a7', roughness: .98 });
  const bronze = new THREE.MeshStandardMaterial({ map: bronzeMap, color: '#a9b38f', roughness: .61, metalness: .7 });
  const bronzeEdge = new THREE.MeshStandardMaterial({ color: '#776d43', roughness: .58, metalness: .75 });
  const bronzeDark = new THREE.MeshStandardMaterial({ color: '#34483b', roughness: .7, metalness: .62 });
  const ropeMaterial = new THREE.MeshStandardMaterial({ color: '#b5a080', roughness: 1 });
  const bark = new THREE.MeshStandardMaterial({ map: woodMap, color: '#6f7160', roughness: .96 });
  const moss = new THREE.MeshStandardMaterial({ color: '#738363', roughness: 1 });
  const create = (geo: THREE.BufferGeometry, mat: THREE.Material, parent: THREE.Object3D = staticRoot) => {
    const obj = new THREE.Mesh(geo, mat); obj.castShadow = true; obj.receiveShadow = true; parent.add(obj); return obj;
  };
  const box = (size: number[], pos: number[], mat: THREE.Material, parent = staticRoot) => {
    const mesh = create(new THREE.BoxGeometry(size[0], size[1], size[2]), mat, parent); mesh.position.set(pos[0], pos[1], pos[2]); return mesh;
  };
  const cylinder = (r1: number, r2: number, height: number, pos: number[], mat: THREE.Material, parent: THREE.Object3D = staticRoot, segments = 16) => {
    const mesh = create(new THREE.CylinderGeometry(r1, r2, height, segments), mat, parent); mesh.position.set(pos[0], pos[1], pos[2]); return mesh;
  };
  const rod = (a: THREE.Vector3, b: THREE.Vector3, radius: number, mat: THREE.Material, parent: THREE.Object3D = staticRoot, r2 = radius) => {
    const delta = b.clone().sub(a); const mesh = cylinder(r2, radius, delta.length(), [0, 0, 0], mat, parent, 9);
    mesh.position.copy(a).add(b).multiplyScalar(.5); mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize()); return mesh;
  };
  const torus = (radius: number, tube: number, pos: number[], mat: THREE.Material, parent: THREE.Object3D = staticRoot) => {
    const obj = create(new THREE.TorusGeometry(radius, tube, 5, 72), mat, parent); obj.rotation.x = Math.PI / 2; obj.position.set(...pos as [number, number, number]); return obj;
  };
  const curveRod = (points: THREE.Vector3[], radius: number, material: THREE.Material, parent: THREE.Object3D = staticRoot) =>
    create(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 16, radius, 7, false), material, parent);

  // A luminous dawn sky, real horizon depth and warm eastern sun.
  const skyGeo = new THREE.SphereGeometry(180, 32, 24);
  const sky = new THREE.Mesh(skyGeo, new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false, uniforms: {},
    vertexShader: 'varying vec3 vP; void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: 'varying vec3 vP; void main(){vec3 d=normalize(vP); float h=smoothstep(-.05,.6,d.y); vec3 col=mix(vec3(.91,.77,.59),vec3(.44,.65,.71),h); float glow=pow(max(dot(d,normalize(vec3(.52,.18,-.84))),0.),24.); col+=vec3(.18,.11,.035)*glow; gl_FragColor=vec4(col,1.); #include <colorspace_fragment> }' }));
  sky.material.fragmentShader = sky.material.fragmentShader.replace(' #include <colorspace_fragment> }', '\n#include <colorspace_fragment>\n}');
  sky.frustumCulled = false; scene.add(sky);
  const hemi = new THREE.HemisphereLight('#dcebf0', '#766750', 2.15); scene.add(hemi);
  const sun = new THREE.DirectionalLight('#ffe0a7', 3.5); sun.position.set(13, 19, -20); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); sun.shadow.camera.left = -15; sun.shadow.camera.right = 15;
  sun.shadow.camera.top = 14; sun.shadow.camera.bottom = -14; sun.shadow.camera.near = .5; sun.shadow.camera.far = 65;
  sun.shadow.normalBias = .022; sun.shadow.bias = -.00015; sun.target.position.set(-1, 0, -4); scene.add(sun, sun.target);
  const bounce = new THREE.PointLight('#ffe0b1', 8, 16, 2); bounce.position.set(-1, 2.9, 2); scene.add(bounce);
  const sunDisk = new THREE.Mesh(new THREE.SphereGeometry(2.3, 24, 16), new THREE.MeshBasicMaterial({ color: '#fff0c7', fog: false })); sunDisk.position.set(37, 15, -100); scene.add(sunDisk);

  // Far mountain silhouettes have irregular continuous ridgelines, not solid cone peaks.
  for (let layer = 0; layer < 4; layer++) {
    const z = -95 + layer * 14, positions: number[] = [], indices: number[] = [];
    for (let i = 0; i <= 90; i++) {
      const x = -105 + i * 2.5;
      const crest = 12 + layer * 1.1 + Math.sin(i * .099 + layer * 1.1) * 6.7 + Math.sin(i * .241 + layer) * 2.7 + Math.sin(i * .477) * .6;
      positions.push(x, crest, z + Math.sin(i * .14) * 2, x, -7, z);
      if (i < 90) { const a = i * 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); geometry.setIndex(indices); geometry.computeVertexNormals();
    const ridge = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: ['#a4bfc1', '#90b0b2', '#759c9c', '#587f7c'][layer], roughness: 1, side: THREE.DoubleSide })); scene.add(ridge);
  }
  const mistCanvas = document.createElement('canvas'); mistCanvas.width = 256; mistCanvas.height = 64;
  const mc = mistCanvas.getContext('2d')!, mg = mc.createRadialGradient(128, 32, 2, 128, 32, 128);
  mg.addColorStop(0, 'rgba(238,236,215,.62)'); mg.addColorStop(.4, 'rgba(220,231,224,.34)'); mg.addColorStop(1, 'rgba(218,233,228,0)');
  mc.fillStyle = mg; mc.fillRect(0, 0, 256, 64);
  const mistTexture = new THREE.CanvasTexture(mistCanvas); mistTexture.colorSpace = THREE.SRGBColorSpace;
  const mists: THREE.Sprite[] = [];
  for (let i = 0; i < 7; i++) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: mistTexture, transparent: true, opacity: .35, depthWrite: false, color: '#e2eee5', fog: false }));
    sprite.position.set(-28 + i * 10, 4 + (i % 3) * 1.6, -46 - (i % 2) * 12); sprite.scale.set(36, 8, 1); scene.add(sprite); mists.push(sprite);
  }

  // Seated eye-level platform: worn boards, end grain, peg heads, and the low stone apron.
  box([12, .3, 8], [0, -.06, .9], stone);
  for (let i = 0; i < 26; i++) {
    const board = box([.454, .16, 7.75], [-5.73 + i * .458, .18 + mix(-.003, .003), .95], deckWood);
    board.rotation.y = mix(-.0004, .0004);
    for (const z of [-2.65, 4.5]) cylinder(.014, .014, .007, [board.position.x + .15, .266, z], bronzeDark, staticRoot, 6);
  }
  box([11.95, .28, .2], [0, .13, -3.03], oldWood);
  for (let i = 0; i < 3; i++) box([5.2 + i * .5, .19, .55], [1.25, -.07 - i * .16, -3.4 - i * .45], stone);
  box([140, .45, 110], [0, -.96, -52], new THREE.MeshStandardMaterial({ map: stoneMap, color: '#bcb89c', roughness: 1 }));
  const gravel = new THREE.MeshStandardMaterial({ color: '#929888', roughness: .96 });
  for (let i = 0; i < 65; i++) {
    const x = mix(-12, 13), z = mix(-24, -4);
    if (x > -.8 && x < 4 && z > -14) continue;
    const pebble = create(new THREE.DodecahedronGeometry(mix(.035, .1), 0), gravel); pebble.position.set(x, -.698, z); pebble.scale.y = .35;
  }
  // An uneven walking route directs the eye through the courtyard towards the mountain hall.
  for (let row = 0; row < 16; row++) for (let col = 0; col < 3; col++) {
    const pathStone = box([1.02 + mix(-.1, .07), .1, 1.02 + mix(-.07, .1)], [col * 1.1 + .03 * Math.sin(row) -.12, -.665, -4.8 - row * 1.12], stone);
    pathStone.rotation.y = mix(-.024, .024);
  }

  // Four substantial red timber columns and stacked dancheong brackets frame the open pavilion.
  for (const x of [-4.35, 4.35]) for (const z of [-2.7, 4.4]) {
    cylinder(.48, .55, .32, [x, .3, z], stone, staticRoot, 10);
    cylinder(.235, .3, 4.5, [x, 2.63, z], red, staticRoot, 24);
    cylinder(.315, .325, .21, [x, 4.62, z], darkJade);
    for (let tier = 0; tier < 3; tier++) {
      const length = 1.15 + tier * .43, y = 4.71 + tier * .19;
      box([length, .16, .32], [x, y, z], tier % 2 ? jade : darkJade);
      box([.32, .16, length], [x, y + .08, z], jade);
      for (const side of [-1, 1]) {
        box([.11, .17, .36], [x + side * (length * .5 - .12), y, z], cinnabar);
        box([.075, .075, .37], [x + side * (length * .5 - .12), y + .015, z], paintedCream);
      }
    }
  }
  for (const z of [-2.7, 4.4]) {
    box([9.6, .31, .38], [0, 4.56, z], darkJade);
    box([9.65, .11, .41], [0, 4.74, z], cinnabar);
    box([9.7, .065, .42], [0, 4.8, z], paintedCream);
    for (let i = 0; i < 23; i++) {
      const x = -4.5 + i * .405;
      const ornament = create(new THREE.CircleGeometry(.084, 8), paintedCream); ornament.position.set(x, 4.565, z + (z > 0 ? -.196 : .196));
      ornament.rotation.y = z > 0 ? Math.PI : 0;
      const center = create(new THREE.CircleGeometry(.035, 12), cinnabar); center.position.copy(ornament.position); center.position.z += z > 0 ? -.002 : .002; center.rotation.copy(ornament.rotation);
    }
  }
  for (const x of [-4.35, 4.35]) box([.36, .29, 8.1], [x, 4.61, .8], jade);
  // Ceiling rafters are exposed in deep perspective, with colored end caps at the eave.
  for (let i = 0; i < 23; i++) {
    const x = -5.0 + i * .455;
    const rafter = box([.11, .15, 8.9], [x, 5.12, .8], oldWood); rafter.rotation.z = Math.sin(x * .3) * .015;
    for (const z of [-3.65, 5.25]) {
      cylinder(.08, .08, .025, [x, 5.12, z], paintedCream).rotation.x = Math.PI / 2;
      cylinder(.037, .037, .028, [x, 5.12, z + .015], cinnabar).rotation.x = Math.PI / 2;
    }
  }
  // Swept tiled roof: original continuous curved surface, individually raised half-cylinder tile courses.
  const buildRoof = (parent: THREE.Group, width: number, depth: number, y: number, ridgeRise: number, detailed = true) => {
    const roofSurface = new THREE.BufferGeometry(), p: number[] = [], uv: number[] = [], idx: number[] = [];
    const nx = 36, nz = 24;
    const roofY = (x: number, z: number) => y + ridgeRise * (1 - Math.pow(Math.abs(z) / (depth / 2), .72)) + .33 * Math.pow(Math.abs(x) / (width / 2), 5) + .30 * Math.pow(Math.abs(z) / (depth / 2), 6);
    for (let iz = 0; iz <= nz; iz++) for (let ix = 0; ix <= nx; ix++) { const x = (ix / nx - .5) * width, z = (iz / nz - .5) * depth; p.push(x, roofY(x, z), z); uv.push(ix / nx * 8, iz / nz * 5); }
    for (let iz = 0; iz < nz; iz++) for (let ix = 0; ix < nx; ix++) { const a = iz * (nx + 1) + ix; idx.push(a, a + nx + 1, a + 1, a + 1, a + nx + 1, a + nx + 2); }
    roofSurface.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); roofSurface.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); roofSurface.setIndex(idx); roofSurface.computeVertexNormals(); create(roofSurface, tile, parent);
    const count = detailed ? Math.floor(width / .22) : Math.floor(width / .29);
    for (let ix = 0; ix < count; ix++) {
      const x = -width / 2 + .12 + ix * (width - .24) / (count - 1);
      for (const side of [-1, 1]) {
        const points = [];
        for (let k = 0; k <= 10; k++) { const z = side * (.03 + k / 10 * (depth / 2 - .03)); points.push(new THREE.Vector3(x, roofY(x, z) + .055, z)); }
        create(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 10, detailed ? .067 : .08, 5, false), tileEdge, parent);
        const endZ = side * depth / 2;
        const cap = create(new THREE.CircleGeometry(.078, 9), tileEdge, parent); cap.position.set(x, roofY(x, endZ) + .045, endZ + side * .018); if (side < 0) cap.rotation.y = Math.PI;
      }
    }
    for (const side of [-1, 1]) {
      const points = [];
      for (let k = 0; k <= 12; k++) { const x = -width / 2 + width * k / 12; points.push(new THREE.Vector3(x, roofY(x, side * depth / 2) -.05, side * depth / 2)); }
      create(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 28, .075, 7, false), tileEdge, parent);
    }
    const ridgePts = [];
    for (let k = 0; k <= 16; k++) { const x = -width / 2 + width * k / 16; ridgePts.push(new THREE.Vector3(x, roofY(x, 0) + .15, 0)); }
    create(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ridgePts), 24, .15, 8, false), tileEdge, parent);
  };
  buildRoof(staticRoot, 11.7, 9.6, 5.25, 1.7);

  // Bell is a true hollow lathe shell, with raised Korean lotus borders and a yongnyu suspension loop.
  const bellPivot = new THREE.Group(); bellPivot.position.set(-2.28, 4.38, -.75); scene.add(bellPivot);
  const bellShape = [new THREE.Vector2(.32, -.45), new THREE.Vector2(.48, -.52), new THREE.Vector2(.56, -.64), new THREE.Vector2(.61, -.9), new THREE.Vector2(.68, -1.35), new THREE.Vector2(.78, -1.95), new THREE.Vector2(.9, -2.36), new THREE.Vector2(.94, -2.43), new THREE.Vector2(.94, -2.54), new THREE.Vector2(.85, -2.55), new THREE.Vector2(.82, -2.4), new THREE.Vector2(.69, -1.93), new THREE.Vector2(.59, -1.33), new THREE.Vector2(.51, -.73), new THREE.Vector2(.3, -.6)];
  const bellMesh = create(new THREE.LatheGeometry(bellShape.reverse(), 80), bronze, bellPivot); bellMesh.name = 'Tactile bronze temple bell';
  for (const [r, y] of [[.94, -2.46], [.91, -2.36], [.85, -2.18], [.62, -.95], [.59, -.76]]) torus(r, .025, [0, y, 0], bronzeEdge, bellPivot);
  // Repeated yudoo bosses in four plaques, each physically raised from the cast bronze body.
  for (let side = 0; side < 4; side++) {
    const angle = side * Math.PI / 2 + Math.PI / 4;
    for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) {
      const a = angle + (col - 1) * .16, y = -1.00 - row * .135, r = .655 + row * .02;
      const boss = create(new THREE.SphereGeometry(.032, 8, 6), bronzeEdge, bellPivot); boss.position.set(Math.sin(a) * r, y, Math.cos(a) * r); boss.scale.set(1, 1, .75);
    }
    for (const sideOffset of [-.3, .3]) {
      const a = angle + sideOffset; rod(new THREE.Vector3(Math.sin(a) * .61, -.82, Math.cos(a) * .61), new THREE.Vector3(Math.sin(a) * .72, -1.42, Math.cos(a) * .72), .011, bronzeEdge, bellPivot);
    }
  }
  for (let i = 0; i < 36; i++) {
    const a = i / 36 * Math.PI * 2;
    const petal = create(new THREE.SphereGeometry(.06, 7, 5), bronzeEdge, bellPivot); petal.position.set(Math.sin(a) * .88, -2.27, Math.cos(a) * .88); petal.scale.set(.6, 1.7, .22); petal.rotation.y = a;
  }
  // Cast striking medallion, oriented into the visitor's view.
  const strikingDisk = create(new THREE.CylinderGeometry(.16, .16, .03, 32), bronzeEdge, bellPivot); strikingDisk.position.set(.26, -1.79, .716); strikingDisk.rotation.x = Math.PI / 2; strikingDisk.rotation.z = -.34;
  const diskRing = create(new THREE.TorusGeometry(.135, .008, 5, 32), bronzeDark, bellPivot); diskRing.position.set(.26, -1.79, .737);
  const loop = create(new THREE.TorusGeometry(.19, .055, 8, 30, Math.PI * 1.8), bronzeEdge, bellPivot); loop.position.y = -.24; loop.rotation.z = .24;
  curveRod([new THREE.Vector3(-.19, -.46, .02), new THREE.Vector3(-.24, -.24, 0), new THREE.Vector3(-.11, -.08, .01), new THREE.Vector3(.03, -.23, .02), new THREE.Vector3(.16, -.44, .03)], .048, bronze, bellPivot);
  cylinder(.055, .068, .42, [-2.28, 4.43, -.75], bronzeDark);
  box([4.7, .28, .33], [-2.05, 4.74, -.75], oldWood);
  // Wooden dangling striker, ropes and wound end grain.
  const striker = new THREE.Group(); striker.position.set(-.57, 2.49, -.62); scene.add(striker);
  const log = cylinder(.125, .15, 1.9, [0, 0, 0], wood, striker, 24); log.rotation.z = Math.PI / 2;
  for (const x of [-.58, .58]) {
    for (let i = 0; i < 5; i++) { const wrap = torus(.153, .012, [x + i * .022, 0, 0], ropeMaterial, striker); wrap.rotation.z = Math.PI / 2; }
    rod(new THREE.Vector3(x, .13, 0), new THREE.Vector3(x, 2.12, 0), .019, ropeMaterial, striker);
  }
  // A small bench and teacup place the viewer in the timber shelter rather than above a diorama.
  box([2.7, .09, .49], [3.35, .7, 1.58], wood);
  for (const x of [2.38, 4.3]) { box([.14, .45, .33], [x, .455, 1.58], oldWood); }
  const tray = cylinder(.32, .32, .03, [2.58, .773, 1.57], oldWood, staticRoot, 32);
  tray.scale.set(1.4, 1, 1);
  const ceramic = new THREE.MeshStandardMaterial({ color: '#9bb0a0', roughness: .3, metalness: .06 });
  const cup = create(new THREE.LatheGeometry([new THREE.Vector2(.065, 0), new THREE.Vector2(.09, .012), new THREE.Vector2(.104, .14), new THREE.Vector2(.094, .148), new THREE.Vector2(.083, .027)], 28), ceramic); cup.position.set(2.6, .789, 1.57);
  const tea = cylinder(.086, .086, .001, [2.6, .916, 1.57], new THREE.MeshStandardMaterial({ color: '#8a7f49', roughness: .18, metalness: .05 }), staticRoot, 28);
  tea.receiveShadow = true;
  // Side railing intentionally stays below the view of the distant courtyard.
  for (const x of [-4.9, 4.9]) {
    for (let i = 0; i < 5; i++) box([.12, .75, .12], [x, .61, -.8 + i * 1.05], wood);
    box([.19, .13, 5.7], [x, 1.03, 1.1], wood);
    box([.085, .08, 5.7], [x, .58, 1.1], oldWood);
  }

  // Across the courtyard: a quiet hall with paper panels, lattice doors and lifted tile eaves.
  const hall = new THREE.Group(); hall.position.set(.9, -.4, -23); staticRoot.add(hall);
  box([10.4, .42, 5.9], [0, -.03, 0], stone, hall);
  box([9.0, 2.7, 4.45], [0, 1.48, 0], plaster, hall);
  for (let col = -4; col <= 4; col++) {
    cylinder(.115, .145, 3.0, [col * 1.06, 1.5, 2.32], red, hall, 12);
    if (col < 4) {
      box([.9, 2.0, .07], [col * 1.06 + .53, 1.36, 2.275], new THREE.MeshStandardMaterial({ color: '#9c997c', roughness: .91 }), hall);
      for (let k = 0; k < 5; k++) box([.026, 1.96, .04], [col * 1.06 + .18 + k * .175, 1.36, 2.323], oldWood, hall);
      for (let k = 0; k < 7; k++) box([.89, .024, .04], [col * 1.06 + .53, .43 + k * .3, 2.326], oldWood, hall);
    }
  }
  box([10.2, .28, .23], [0, 2.93, 2.34], darkJade, hall);
  box([10.3, .065, .25], [0, 3.09, 2.34], cinnabar, hall);
  buildRoof(hall, 12.2, 7.2, 3.15, 1.4, false);
  for (let i = 0; i < 3; i++) box([3.8 + i * .4, .16, .46], [0, -.18 - i * .13, 3.15 + i * .44], stone, hall);

  // Rounded weathered stones carry lichen patches; no duplicate boulder silhouette.
  const rock = (x: number, y: number, z: number, sx: number, sy: number, sz: number) => {
    const geo = new THREE.IcosahedronGeometry(1, 1), attr = geo.getAttribute('position');
    for (let i = 0; i < attr.count; i++) { const s = mix(.85, 1.1); attr.setXYZ(i, attr.getX(i) * s, attr.getY(i) * s, attr.getZ(i) * s); }
    geo.computeVertexNormals(); const obj = create(geo, stone); obj.position.set(x, y, z); obj.scale.set(sx, sy, sz); obj.rotation.y = random() * 6.28;
    const patch = create(new THREE.SphereGeometry(1, 10, 6, 0, Math.PI * 2, 0, Math.PI * .36), moss); patch.position.set(x, y + sy * .54, z); patch.scale.set(sx * .65, sy * .43, sz * .65);
  };
  for (let i = 0; i < 18; i++) rock(mix(-15, -7), -.55, mix(-24, -5), mix(.45, 1.4), mix(.4, .9), mix(.6, 1.5));
  for (let i = 0; i < 14; i++) rock(mix(7, 17), -.65, mix(-27, -6), mix(.4, .85), mix(.3, .7), mix(.45, 1.1));
  // Granite lantern beside the processional path — faceted structure and actual open chamber.
  const stoneLantern = new THREE.Group(); stoneLantern.position.set(5.25, -.7, -9.5); staticRoot.add(stoneLantern);
  cylinder(.72, .92, .17, [0, .085, 0], stone, stoneLantern, 8);
  cylinder(.33, .6, .35, [0, .3, 0], stone, stoneLantern, 8);
  cylinder(.23, .29, 1.03, [0, .96, 0], stone, stoneLantern, 8);
  cylinder(.57, .3, .2, [0, 1.57, 0], stone, stoneLantern, 8);
  cylinder(.62, .64, .13, [0, 1.74, 0], stone, stoneLantern, 8);
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; cylinder(.08, .095, .65, [Math.sin(a) * .42, 2.09, Math.cos(a) * .42], stone, stoneLantern, 6); }
  cylinder(.27, .81, .3, [0, 2.58, 0], stone, stoneLantern, 6);
  cylinder(.1, .25, .33, [0, 2.88, 0], stone, stoneLantern, 8);
  const lanternGlow = new THREE.MeshBasicMaterial({ color: '#eed7a4' }); cylinder(.045, .06, .18, [0, 1.91, 0], lanternGlow, stoneLantern, 10);

  // Pine geometry uses individual needles on layered crooked branches; leaf crowns are never spheres.
  const needleMat = new THREE.MeshStandardMaterial({ color: '#536c48', roughness: .92, side: THREE.DoubleSide });
  const needleGeo = new THREE.BufferGeometry();
  needleGeo.setAttribute('position', new THREE.Float32BufferAttribute([-.018, 0, 0, .015, 0, 0, 0, .4, 0, 0, 0, -.016, 0, 0, .017, 0, .4, 0], 3)); needleGeo.computeVertexNormals();
  const needleMatrices: THREE.Matrix4[] = [], needleColors: THREE.Color[] = [];
  const dummy = new THREE.Object3D();
  const tuft = (center: THREE.Vector3, size: number, density: number) => {
    for (let i = 0; i < density; i++) {
      const a = random() * 6.283, rad = Math.sqrt(random()) * size;
      dummy.position.set(center.x + Math.cos(a) * rad, center.y + mix(-.13, .25), center.z + Math.sin(a) * rad);
      dummy.rotation.set(mix(-.75, .75), random() * 6.28, mix(-1, 1)); const s = mix(.6, 1.25); dummy.scale.set(s, s * mix(.8, 1.4), s); dummy.updateMatrix();
      needleMatrices.push(dummy.matrix.clone()); needleColors.push(new THREE.Color().setHSL(mix(.22, .27), mix(.16, .29), mix(.23, .38)));
    }
  };
  const pine = (x: number, z: number, size: number, sway: number) => {
    const base = new THREE.Vector3(x, -.72, z), top = new THREE.Vector3(x + sway, size, z + .3);
    curveRod([base, new THREE.Vector3(x + sway * .2, size * .4, z), new THREE.Vector3(x + sway * .6, size * .74, z + .22), top], .10 * size / 6, bark);
    for (let i = 0; i < 8; i++) {
      const h = .39 + i * .079, a = i * 2.36, length = size * (.41 - h * .23);
      const begin = new THREE.Vector3(x + sway * h, size * h, z + h * .3), end = begin.clone().add(new THREE.Vector3(Math.sin(a) * length, size * .048, Math.cos(a) * length));
      curveRod([begin, begin.clone().lerp(end, .6).add(new THREE.Vector3(0, -.14, 0)), end], .039 * size / 6, bark);
      for (let j = 0; j < 3; j++) { const c = begin.clone().lerp(end, .45 + j * .26); tuft(c, size * .12, Math.round(70 * Math.min(size / 6, 1.6))); }
    }
    tuft(top, size * .13, 160);
  };
  for (const v of [[-9, -7, 8, 1.8], [-14, -16, 11, -.9], [-7, -25, 8, 1], [10, -21, 10, -1.1], [16, -30, 13, -.8], [-20, -32, 12, 1.2], [18, -8, 9, -1.6]]) pine(v[0], v[1], v[2], v[3]);
  const needles = new THREE.InstancedMesh(needleGeo, needleMat, needleMatrices.length);
  needleMatrices.forEach((m, i) => { needles.setMatrixAt(i, m); needles.setColorAt(i, needleColors[i]); }); needles.castShadow = true; needles.receiveShadow = true; staticRoot.add(needles);

  // An overhanging maple branch provides broad translucent leaf detail at the right of the open view.
  const branchGroup = new THREE.Group(); branchGroup.position.set(8.1, -.65, -5.9); scene.add(branchGroup);
  curveRod([new THREE.Vector3(0, 0, 0), new THREE.Vector3(-.7, 2.8, .4), new THREE.Vector3(-1.5, 4.4, .1), new THREE.Vector3(-3.8, 5.1, -.4)], .13, bark, branchGroup);
  const leafShape = new THREE.Shape(); leafShape.moveTo(0, -.07); leafShape.lineTo(-.12, .035); leafShape.lineTo(-.08, .066); leafShape.lineTo(-.19, .17); leafShape.lineTo(-.07, .15); leafShape.lineTo(-.063, .26); leafShape.lineTo(0, .20); leafShape.lineTo(.035, .34); leafShape.lineTo(.092, .18); leafShape.lineTo(.20, .23); leafShape.lineTo(.133, .105); leafShape.lineTo(.22, .062); leafShape.lineTo(.088, .021); leafShape.closePath();
  const mapleGeo = new THREE.ShapeGeometry(leafShape);
  const mapleMat = new THREE.MeshStandardMaterial({ color: '#97a359', roughness: .88, side: THREE.DoubleSide, metalness: 0 });
  const leafInstances = new THREE.InstancedMesh(mapleGeo, mapleMat, 840);
  for (let i = 0; i < 12; i++) {
    const start = new THREE.Vector3(-.7 - i * .22, 3.4 + i * .13, -.1), a = i * 2.15;
    const end = start.clone().add(new THREE.Vector3(Math.sin(a) * 1.05, .22 + random() * .3, Math.cos(a) * .9));
    curveRod([start, start.clone().lerp(end, .5).add(new THREE.Vector3(0, .11, 0)), end], .018, bark, branchGroup);
    for (let j = 0; j < 70; j++) {
      const index = i * 70 + j, r = Math.sqrt(random()) * .88, a2 = random() * 6.28;
      dummy.position.set(end.x + Math.cos(a2) * r, end.y + mix(-.2, .4), end.z + Math.sin(a2) * r); dummy.rotation.set(-Math.PI / 2 + mix(-.55, .55), random() * 6.28, mix(-.4, .4));
      const s = mix(.6, 1.25); dummy.scale.setScalar(s); dummy.updateMatrix(); leafInstances.setMatrixAt(index, dummy.matrix); leafInstances.setColorAt(index, new THREE.Color().setHSL(mix(.17, .23), mix(.32, .5), mix(.33, .49)));
    }
  }
  leafInstances.castShadow = true; leafInstances.receiveShadow = true; branchGroup.add(leafInstances);
  // Tufts of unmanicured grass emerge beside stones and stairs.
  const grassGeo = new THREE.BufferGeometry(); grassGeo.setAttribute('position', new THREE.Float32BufferAttribute([-.025, 0, 0, .026, 0, 0, .052, .25, .028, .052, .25, .028, .026, 0, 0, .05, .40, .04], 3)); grassGeo.computeVertexNormals();
  const grassMat = new THREE.MeshStandardMaterial({ color: '#7b8861', roughness: 1, side: THREE.DoubleSide });
  const grasses = new THREE.InstancedMesh(grassGeo, grassMat, 900);
  for (let i = 0; i < 900; i++) {
    const side = random() > .5 ? 1 : -1; dummy.position.set(side * mix(5.1, 13), -.7, mix(-26, -4)); dummy.rotation.set(0, random() * 6.28, mix(-.3, .3)); const s = mix(.45, 1.5); dummy.scale.set(s, s, s); dummy.updateMatrix(); grasses.setMatrixAt(i, dummy.matrix);
  } grasses.receiveShadow = true; staticRoot.add(grasses);

  // Fish-shaped wind chime under the right eave: touchable but restrained in both size and response.
  const chimePivot = new THREE.Group(); chimePivot.position.set(2.63, 4.58, -2.32); scene.add(chimePivot);
  rod(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -.42, 0), .007, bronzeDark, chimePivot);
  const chime = create(new THREE.LatheGeometry([new THREE.Vector2(.028, -.42), new THREE.Vector2(.09, -.45), new THREE.Vector2(.115, -.58), new THREE.Vector2(.12, -.61), new THREE.Vector2(.09, -.61), new THREE.Vector2(.069, -.47)].reverse(), 24), bronze, chimePivot);
  rod(new THREE.Vector3(0, -.5, 0), new THREE.Vector3(0, -1.13, 0), .004, bronzeDark, chimePivot);
  const fishShape = new THREE.Shape(); fishShape.moveTo(-.13, 0); fishShape.quadraticCurveTo(-.04, .08, .085, .025); fishShape.lineTo(.16, .073); fishShape.lineTo(.15, -.067); fishShape.lineTo(.07, -.026); fishShape.quadraticCurveTo(-.04, -.08, -.13, 0);
  const fish = create(new THREE.ExtrudeGeometry(fishShape, { depth: .006, bevelEnabled: false }), bronzeEdge, chimePivot); fish.position.set(0, -1.13, 0);
  chime.name = 'Bronze wind chime';

  // Static geometry is merged by material for a compact draw list. Animated touch targets stay separate.
  staticRoot.updateMatrixWorld(true);
  const buckets = new Map<THREE.Material, THREE.BufferGeometry[]>();
  const originals: THREE.Mesh[] = [];
  staticRoot.traverse((object) => {
    if (!(object instanceof THREE.Mesh) || object instanceof THREE.InstancedMesh || Array.isArray(object.material)) return;
    const geometry = object.geometry.clone().applyMatrix4(object.matrixWorld);
    for (const key of Object.keys(geometry.attributes)) if (key !== 'position' && key !== 'normal' && key !== 'uv') geometry.deleteAttribute(key);
    if (!geometry.getAttribute('uv')) geometry.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(geometry.getAttribute('position').count * 2), 2));
    const nonIndexed = geometry.index ? geometry.toNonIndexed() : geometry;
    if (nonIndexed !== geometry) geometry.dispose();
    const list = buckets.get(object.material) ?? []; list.push(nonIndexed); buckets.set(object.material, list); originals.push(object);
  });
  const originalGeos = new Set<THREE.BufferGeometry>();
  originals.forEach((mesh) => { mesh.parent?.remove(mesh); originalGeos.add(mesh.geometry); });
  originalGeos.forEach((g) => g.dispose());
  buckets.forEach((list, material) => { const merged = mergeGeometries(list, false); list.forEach((g) => g.dispose()); if (merged) { const mesh = new THREE.Mesh(merged, material); mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh); } });

  const raycaster = new THREE.Raycaster();
  let bellImpulse = 0, chimeImpulse = 0, elapsed = 0;
  const hitTargets = [bellMesh, log, chime, fish];
  const resize = (aspect: number) => {
    camera.aspect = aspect;
    if (aspect < .8) {
      camera.fov = 57; camera.position.set(-1.0, 1.72, 4.9); camera.lookAt(-1.65, 2.2, -8);
    } else if (aspect < 1.25) {
      camera.fov = 54; camera.position.set(.55, 1.65, 4.6); camera.lookAt(-.25, 2.20, -9.5);
    } else {
      camera.fov = 53; camera.position.set(.8, 1.62, 4.8); camera.lookAt(-.05, 2.03, -10.5);
    }
    camera.updateProjectionMatrix(); camera.updateMatrixWorld();
  };
  resize(16 / 9);
  return {
    scene, camera, resize,
    update(time, dt) {
      elapsed = time; bellImpulse *= Math.exp(-dt * .7); chimeImpulse *= Math.exp(-dt * 1.1);
      bellPivot.rotation.z = Math.sin(time * 1.74) * .008 + Math.sin(time * 2.7) * bellImpulse * .018;
      striker.rotation.z = Math.sin(time * 2.7) * bellImpulse * .028;
      chimePivot.rotation.z = Math.sin(time * 1.15) * .025 + Math.sin(time * 3.7) * chimeImpulse * .1;
      chimePivot.rotation.x = Math.sin(time * .82) * .017;
      branchGroup.rotation.z = Math.sin(time * .31) * .0035;
      leafInstances.rotation.y = Math.sin(time * .57) * .002;
      for (let i = 0; i < mists.length; i++) mists[i].position.x = -28 + i * 10 + Math.sin(time * .018 + i) * 1.8;
    },
    interact(ndc): WorldInteraction | null {
      scene.updateMatrixWorld(true); raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(hitTargets, false); if (!hits.length) return null;
      const isChime = hits[0].object === chime || hits[0].object === fish;
      if (isChime) chimeImpulse = Math.min(.72, chimeImpulse + .42); else bellImpulse = Math.min(1, bellImpulse + .72);
      // The host/audio integrator owns all audio; position and bounded strength make spatial decay possible.
      return { scene: 'nature:temple_dawn', type: 'bell', strength: isChime ? .2 : .62, position: hits[0].point.toArray() as [number, number, number] };
    },
    dispose() { void elapsed; },
  };
}
