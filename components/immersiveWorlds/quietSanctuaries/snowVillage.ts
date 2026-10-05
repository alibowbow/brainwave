import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { SanctuaryBuilder } from './worldTypes';

/** Original spatial winter village. All geometry and material maps are generated here. */
export const buildSnowVillage: SanctuaryBuilder = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#243a55');
  scene.fog = new THREE.FogExp2('#40566d', 0.019);
  const camera = new THREE.PerspectiveCamera(51, 1, 0.08, 160);
  let randomState = 10973;
  const random = () => {
    randomState = (1664525 * randomState + 1013904223) >>> 0;
    return randomState / 4294967296;
  };
  const materials = new Set<THREE.Material>();
  const material = (parameters: THREE.MeshStandardMaterialParameters) => {
    const value = new THREE.MeshStandardMaterial(parameters);
    materials.add(value);
    return value;
  };
  const noise2 = (x: number, y: number, period: number) => {
    const ix = Math.floor(x), iy = Math.floor(y);
    const fx = x - ix, fy = y - iy;
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    const hash = (a: number, b: number) => {
      const v = Math.sin(((a + period) % period) * 127.1 + ((b + period) % period) * 311.7 + 73.3) * 43758.5453;
      return v - Math.floor(v);
    };
    return THREE.MathUtils.lerp(THREE.MathUtils.lerp(hash(ix, iy), hash(ix + 1, iy), sx),
      THREE.MathUtils.lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), sx), sy) * 2 - 1;
  };
  const texture = (kind: 'wood' | 'plaster' | 'snow' | 'slate') => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const pixels = ctx.createImageData(256, 256);
    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 256; x++) {
        const i = (y * 256 + x) * 4;
        const n = random() * 2 - 1;
        const grain = Math.sin(y * 1.19 + Math.sin(x * 0.019) * 4) * 0.5 +
          Math.sin(y * 0.18 + Math.sin(x * 0.028 + y * 0.01) * 2.3) * 0.5;
        let c: number[];
        if (kind === 'wood') {
          const knot = Math.sin(Math.hypot((x - 180) * 0.32, y - 116) * 0.56) *
            Math.exp(-Math.hypot((x - 180) * 0.25, y - 116) * 0.044);
          const v = grain * 7 + n * 3 + knot * 9 + noise2(x / 64, y / 16, 16) * 7;
          c = [125 + v, 103 + v * 0.83, 79 + v * 0.68];
        } else if (kind === 'plaster') {
          const v = noise2(x / 32, y / 32, 8) * 12 + noise2(x / 8, y / 8, 32) * 4 + n * 2;
          c = [183 + v, 177 + v, 161 + v];
        } else if (kind === 'slate') {
          const v = n * 16 + Math.sin(x * 0.44 + y * 0.016) * 6;
          c = [67 + v, 77 + v, 83 + v];
        } else {
          const v = n * 2 + noise2(x / 32, y / 32, 8) * 3;
          c = [231 + v, 239 + v, 244 + v];
        }
        pixels.data[i] = c[0]; pixels.data[i + 1] = c[1]; pixels.data[i + 2] = c[2]; pixels.data[i + 3] = 255;
      }
    }
    ctx.putImageData(pixels, 0, 0);
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set(kind === 'wood' ? 2 : 4, kind === 'wood' ? 1 : 4);
    return map;
  };
  const woodMap = texture('wood');
  const snowMap = texture('snow');
  const plasterMap = texture('plaster');
  const slateMap = texture('slate');
  const timber = material({ color: '#929995', map: woodMap, roughness: 0.92, bumpMap: woodMap, bumpScale: 0.018 });
  const railWood = material({ color: '#a19481', map: woodMap, roughness: 0.86, bumpMap: woodMap, bumpScale: 0.012 });
  const darkWood = material({ color: '#747b7c', map: woodMap, roughness: 0.92 });
  const snow = material({ color: '#e1e7eb', map: snowMap, roughness: 0.94, bumpMap: snowMap, bumpScale: 0.004 });
  const roofSnow = material({ color: '#dce7ef', map: snowMap, roughness: 0.94 });
  const snowShade = material({ color: '#a7bbcc', map: snowMap, roughness: 1 });
  const plaster = material({ color: '#969b9c', map: plasterMap, roughness: 0.99, bumpMap: plasterMap, bumpScale: 0.012 });
  const plasterWarm = material({ color: '#b0a99b', map: plasterMap, roughness: 0.96, bumpMap: plasterMap, bumpScale: 0.012 });
  const slate = material({ color: '#777d84', map: slateMap, roughness: 0.9 });
  const stone = material({ color: '#697784', map: slateMap, roughness: 0.96, bumpMap: slateMap, bumpScale: 0.06 });
  const brass = material({ color: '#6f5739', metalness: 0.66, roughness: 0.43 });
  const blackIron = material({ color: '#2f383d', metalness: 0.6, roughness: 0.55 });
  const needles = material({ color: '#243d3b', roughness: 0.96 });
  const windowAmber = material({ color: '#ffd799', emissive: '#ffa757', emissiveIntensity: 0.86, roughness: 0.69 });
  const windowDim = material({ color: '#ba9c7b', emissive: '#dd9f62', emissiveIntensity: 0.34, roughness: 0.74 });
  const windowDark = material({ color: '#263948', roughness: 0.27, metalness: 0.16 });
  const lanternGlass = material({ color: '#f9cf8b', emissive: '#ffb264', emissiveIntensity: 0.5, roughness: 0.3, transparent: true, opacity: 0.4 });

  const staticRoot = new THREE.Group();
  scene.add(staticRoot);
  const mesh = (geo: THREE.BufferGeometry, mat: THREE.Material, parent: THREE.Object3D = staticRoot) => {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = true; m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  const box = (x: number, y: number, z: number, w: number, h: number, d: number, mat: THREE.Material, parent = staticRoot) => {
    const m = mesh(new THREE.BoxGeometry(w, h, d), mat, parent);
    m.position.set(x, y, z); return m;
  };
  const beam = (a: THREE.Vector3, b: THREE.Vector3, radius: number, mat: THREE.Material, parent = staticRoot) => {
    const m = mesh(new THREE.CylinderGeometry(radius * 0.9, radius, a.distanceTo(b), 7), mat, parent);
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
    return m;
  };

  // A volumetric sky dome keeps the dusk gradient stable while looking around.
  const sky = new THREE.Mesh(new THREE.SphereGeometry(115, 28, 18), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { top: { value: new THREE.Color('#14273f') }, horizon: { value: new THREE.Color('#53687c') } },
    vertexShader: 'varying vec3 vWorld; void main(){vWorld=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: 'uniform vec3 top;uniform vec3 horizon;varying vec3 vWorld;void main(){float h=clamp(normalize(vWorld).y,0.,1.);gl_FragColor=vec4(mix(horizon,top,pow(h,.43)),1.);}'
  }));
  scene.add(sky);
  scene.add(new THREE.HemisphereLight('#bdd6f1', '#65717b', 1.78));
  const moon = new THREE.DirectionalLight('#c4dbf2', 1.14);
  moon.position.set(-9, 18, 9);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.radius = 6;
  moon.shadow.intensity = 0.53;
  moon.shadow.camera.left = -22; moon.shadow.camera.right = 22;
  moon.shadow.camera.top = 22; moon.shadow.camera.bottom = -22;
  moon.shadow.camera.near = 0.5; moon.shadow.camera.far = 80;
  moon.shadow.bias = -0.0003; moon.shadow.normalBias = 0.022;
  moon.target.position.set(0, 0, -11);
  scene.add(moon, moon.target);
  const porchBounce = new THREE.PointLight('#ffdba8', 3.9, 4.4, 2);
  porchBounce.position.set(-0.45, 1.55, 1.65);
  scene.add(porchBounce);

  const laneCenter = (z: number) => Math.sin((-z + 2) * 0.115) * 1.6 + Math.sin(z * 0.037) * 0.4;
  const groundHeight = (x: number, z: number) => {
    const dist = Math.abs(x - laneCenter(z));
    const banks = THREE.MathUtils.smoothstep(dist, 1.6, 4.5);
    return -0.17 + banks * (0.31 + Math.sin(z * 0.6 + x) * 0.07) +
      Math.sin(x * 0.83 + z * 0.39) * 0.024 + Math.cos(z * 0.73) * 0.025;
  };
  const groundGeometry = new THREE.PlaneGeometry(95, 110, 74, 96);
  groundGeometry.rotateX(-Math.PI / 2);
  groundGeometry.translate(0, 0, -43);
  const gp = groundGeometry.attributes.position;
  for (let i = 0; i < gp.count; i++) gp.setY(i, groundHeight(gp.getX(i), gp.getZ(i)));
  groundGeometry.computeVertexNormals();
  mesh(groundGeometry, snow);

  // Soft wooded rises surround the lane; the horizon is not an unbounded plane.
  const hillGeo = new THREE.PlaneGeometry(155, 85, 54, 28);
  hillGeo.rotateX(-Math.PI / 2); hillGeo.translate(0, 0, -77);
  const hp = hillGeo.attributes.position;
  for (let i = 0; i < hp.count; i++) {
    const x = hp.getX(i), z = hp.getZ(i);
    const rise = Math.max(0, (-z - 43) / 37);
    hp.setY(i, rise * (6 + Math.sin(x * 0.066) * 3.4 + Math.sin(x * 0.135) * 1.7));
  }
  hillGeo.computeVertexNormals(); mesh(hillGeo, snowShade);

  const roofHalf = (width: number, depth: number, wall: number, pitch: number, side: number, mat: THREE.Material, extra: number, parent: THREE.Group) => {
    const cols = 14, rows = 20;
    const points: number[] = [], uv: number[] = [], ix: number[] = [];
    for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++) {
      const u = c / cols, v = r / rows;
      const x = side * (u * (width / 2 + 0.3));
      const z = (v - 0.5) * (depth + 0.7);
      const y = wall + pitch * (1 - u) + extra +
        (extra > 0 ? noise2(u * 3 + 5, v * 6 + side, 32) * 0.085 + Math.sin(v * 7.3 + side) * 0.027 + Math.pow(u, 3) * 0.045 : 0);
      points.push(x, y, z); uv.push(u * 2, v * 3);
      if (c < cols && r < rows) {
        const a = r * (cols + 1) + c, b = a + cols + 1;
        if (side > 0) ix.push(a, b, a + 1, b, b + 1, a + 1);
        else ix.push(a, a + 1, b, b, a + 1, b + 1);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(ix); geo.computeVertexNormals();
    mesh(geo, mat, parent);
    // Eaves carry a rounded overhang of real snow, with a dark fascia beneath.
    if (extra > 0) {
      const lip = mesh(new RoundedBoxGeometry(0.34, 0.31, depth + 0.83, 4, 0.12), mat, parent);
      lip.position.set(side * (width / 2 + 0.3), wall + extra - 0.045, 0);
      lip.rotation.z = side * -0.08;
      const lp = lip.geometry.attributes.position;
      for (let i = 0; i < lp.count; i++) lp.setY(i, lp.getY(i) + noise2(lp.getZ(i) * 1.8 + 9, side + 3, 32) * 0.045);
      lip.geometry.computeVertexNormals();
    }
  };
  const triangularGable = (w: number, y: number, rise: number, z: number, mat: THREE.Material, parent: THREE.Group) => {
    const shape = new THREE.Shape(); shape.moveTo(-w / 2, y); shape.lineTo(w / 2, y); shape.lineTo(0, y + rise); shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.13, bevelEnabled: false });
    const m = mesh(geo, mat, parent); m.position.z = z; return m;
  };
  const windows: THREE.PointLight[] = [];
  const revealStone = material({ color: '#b1afa6', map: plasterMap, roughness: 0.94, bumpMap: plasterMap, bumpScale: 0.014 });
  const interiorShadow = material({ color: '#3c3025', roughness: 0.97 });
  const glassPane = material({ color: '#a1b9c8', transparent: true, opacity: 0.12, roughness: 0.23, metalness: 0.22, depthWrite: false });
  const contactCanvas = document.createElement('canvas'); contactCanvas.width = contactCanvas.height = 96;
  const contactCtx = contactCanvas.getContext('2d')!;
  const contactGradient = contactCtx.createRadialGradient(48, 48, 3, 48, 48, 48);
  contactGradient.addColorStop(0, 'rgba(33,43,58,.26)');
  contactGradient.addColorStop(0.45, 'rgba(33,43,58,.13)');
  contactGradient.addColorStop(1, 'rgba(33,43,58,0)');
  contactCtx.fillStyle = contactGradient; contactCtx.fillRect(0, 0, 96, 96);
  const contactMap = new THREE.CanvasTexture(contactCanvas);
  const contactMaterial = new THREE.MeshBasicMaterial({ map: contactMap, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 });
  const contactPatch = (x: number, z: number, w: number, d: number, parent = staticRoot) => {
    const patch = new THREE.Mesh(new THREE.PlaneGeometry(w, d), contactMaterial);
    patch.rotation.x = -Math.PI / 2; patch.position.set(x, groundHeight(x, z) + 0.012, z); patch.renderOrder = 1; parent.add(patch);
  };
  const snowDrift = (x: number, z: number, w: number, d: number, h: number) => {
    const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
    const rings = 6, segments = 24, phase = random() * 7;
    for (let r = 0; r <= rings; r++) for (let a = 0; a <= segments; a++) {
      const t = r / rings, angle = a / segments * Math.PI * 2;
      const irregular = 1 + Math.sin(angle * 3 + phase) * 0.1 + Math.cos(angle * 5 + phase) * 0.045;
      const px = x + Math.cos(angle) * w * 0.5 * t * irregular;
      const pz = z + Math.sin(angle) * d * 0.5 * t * irregular;
      positions.push(px, groundHeight(px, pz) + Math.pow(Math.max(0, 1 - t * t), 1.6) * h - 0.008, pz);
      uvs.push(t * Math.cos(angle) * 0.5 + 0.5, t * Math.sin(angle) * 0.5 + 0.5);
      if (r < rings && a < segments) { const k = r * (segments + 1) + a; indices.push(k, k + 1, k + segments + 1, k + 1, k + segments + 2, k + segments + 1); }
    }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); geometry.setIndex(indices); geometry.computeVertexNormals(); mesh(geometry, snow);
  };
  type WallOpening = { x: number; y: number; w: number; h: number };
  const piercedWall = (width: number, wall: number, openings: WallOpening[], mat: THREE.Material, parent: THREE.Group, z: number) => {
    const shape = new THREE.Shape(); shape.moveTo(-width / 2, 0.12); shape.lineTo(width / 2, 0.12); shape.lineTo(width / 2, wall + 0.12); shape.lineTo(-width / 2, wall + 0.12); shape.closePath();
    for (const opening of openings) {
      const hole = new THREE.Path();
      hole.moveTo(opening.x - opening.w / 2, opening.y - opening.h / 2);
      hole.lineTo(opening.x - opening.w / 2, opening.y + opening.h / 2);
      hole.lineTo(opening.x + opening.w / 2, opening.y + opening.h / 2);
      hole.lineTo(opening.x + opening.w / 2, opening.y - opening.h / 2); hole.closePath(); shape.holes.push(hole);
    }
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.31, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.008, bevelSegments: 2, steps: 1 });
    const uv = geometry.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 0.37, uv.getY(i) * 0.37);
    const wallMesh = mesh(geometry, mat, parent); wallMesh.position.z = z - 0.31; return wallMesh;
  };
  const addWindow = (parent: THREE.Group, x: number, y: number, z: number, w: number, h: number, on: number, side = false) => {
    const win = new THREE.Group(); win.position.set(x, y, z); if (side) win.rotation.y = -Math.PI / 2; parent.add(win);
    // The wall itself is pierced: these reveals and glazing sit INSIDE its 31cm depth.
    box(0, 0, -0.34, w + 0.13, h + 0.13, 0.055, interiorShadow, win);
    box(0, 0, -0.295, w, h, 0.018, on > 0.65 ? windowAmber : on > 0.22 ? windowDim : windowDark, win);
    for (const sideX of [-1, 1]) box(sideX * (w / 2 + 0.023), 0, -0.105, 0.076, h + 0.16, 0.24, revealStone, win);
    box(0, h / 2 + 0.041, -0.105, w + 0.11, 0.081, 0.24, revealStone, win);
    for (const sideX of [-1, 1]) box(sideX * (w / 2 - 0.035), 0, -0.212, 0.052, h - 0.01, 0.095, timber, win);
    for (const sideY of [-1, 1]) box(0, sideY * (h / 2 - 0.03), -0.212, w, 0.052, 0.095, timber, win);
    box(0, 0, -0.193, 0.035, h - 0.02, 0.092, darkWood, win);
    box(0, h * 0.03, -0.191, w - 0.04, 0.028, 0.092, darkWood, win);
    box(0, 0, -0.235, w - 0.06, h - 0.06, 0.005, glassPane, win);
    const sill = mesh(new RoundedBoxGeometry(w + 0.29, 0.12, 0.42, 2, 0.018), stone, win); sill.position.set(0, -h / 2 - 0.064, -0.02);
    const sillSnow = mesh(new RoundedBoxGeometry(w + 0.23, 0.083, 0.23, 3, 0.035), snow, win); sillSnow.position.set(-0.017, -h / 2 + 0.003, 0.068); sillSnow.rotation.z = 0.009;
    if (on > 0.3) {
      const curtain = material({ color: on > 0.6 ? '#c2ae92' : '#8f8980', emissive: '#9c693d', emissiveIntensity: 0.12, roughness: 1 });
      for (let i = 0; i < 3; i++) {
        const fold = mesh(new THREE.CylinderGeometry(w * 0.045, w * 0.05, h * 0.96, 7), curtain, win);
        fold.position.set(-w * 0.41 + i * w * 0.052, 0, -0.263);
      }
    }
    if (random() > 0.35) {
      const shutter = new THREE.Group(); shutter.position.set(w / 2 + 0.11, 0, 0.035); shutter.rotation.y = -0.24; win.add(shutter);
      for (let i = 0; i < 3; i++) box(0.042 + i * 0.064, 0, 0, 0.059, h + 0.08, 0.041, timber, shutter);
      for (const sy of [-0.3, 0.3]) box(0.1, h * sy, 0.023, 0.21, 0.042, 0.025, darkWood, shutter);
    }
  };
  const house = (x: number, z: number, w: number, d: number, wall: number, pitch: number, rotation: number, warm: boolean, variant: number) => {
    const group = new THREE.Group(); group.position.set(x, groundHeight(x, z) - 0.12, z); group.rotation.y = rotation; staticRoot.add(group);
    const housePlaster = warm ? plasterWarm : plaster;
    const doorX = variant % 2 ? -w * 0.24 : w * 0.22;
    const mainW = Math.min(w * 0.22, 0.83), mainY = Math.min(1.55, wall * 0.62);
    const openings: WallOpening[] = [{ x: -doorX, y: mainY, w: mainW + 0.07, h: 1.02 }, { x: doorX, y: 0.825, w: 0.77, h: 1.35 }];
    if (wall > 3.2) openings.push({ x: -w * 0.24, y: wall * 0.8, w: 0.6, h: 0.73 }, { x: w * 0.22, y: wall * 0.8, w: 0.64, h: 0.75 });
    box(0, -0.06, 0, w + 0.07, 0.38, d + 0.08, stone, group);
    piercedWall(w, wall, openings, housePlaster, group, d / 2);
    box(0, wall / 2 + 0.12, -d / 2 + 0.14, w, wall, 0.28, housePlaster, group);
    box(w / 2 - 0.14, wall / 2 + 0.12, 0, 0.28, wall, d, housePlaster, group);
    const sideWall = new THREE.Group(); sideWall.position.x = -w / 2; sideWall.rotation.y = -Math.PI / 2; group.add(sideWall);
    piercedWall(d, wall, [{ x: 0.2, y: wall * 0.55, w: 0.74, h: 0.95 }], housePlaster, sideWall, 0);
    triangularGable(w, wall + 0.1, pitch - 0.1, d / 2 - 0.06, housePlaster, group);
    triangularGable(w, wall + 0.1, pitch - 0.1, -d / 2 - 0.06, housePlaster, group);
    for (const s of [-1, 1]) {
      roofHalf(w, d, wall + 0.1, pitch, s, slate, 0, group);
      roofHalf(w, d, wall + 0.1, pitch, s, roofSnow, 0.26 + variant * 0.018, group);
      box(s * (w / 2 - 0.065), wall / 2 + 0.13, d / 2 + 0.006, 0.13, wall, 0.15, timber, group);
      box(s * (w / 2 + 0.24), wall + 0.04, 0, 0.13, 0.16, d + 0.65, darkWood, group);
      beam(new THREE.Vector3(s * (w / 2 + 0.28), wall + 0.11, d / 2 + 0.35), new THREE.Vector3(0, wall + pitch + 0.11, d / 2 + 0.35), 0.065, darkWood, group);
      const snowEdge: THREE.Vector3[] = [];
      for (let i = 0; i <= 9; i++) { const t = i / 9; snowEdge.push(new THREE.Vector3(s * (w / 2 + 0.31) * (1 - t), wall + pitch * t + 0.36 + Math.sin(t * 8 + variant) * 0.025, d / 2 + 0.36 + Math.sin(t * 9 + variant) * 0.025)); }
      mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(snowEdge), 24, 0.14, 8, false), roofSnow, group);
    }
    box(0, wall + 0.05, d / 2 + 0.015, w, 0.135, 0.15, timber, group);
    box(0, wall + pitch * 0.45, d / 2 + 0.065, 0.083, pitch * 0.92, 0.095, timber, group);
    // Deep entrance, weathered board door, and uneven stone threshold.
    box(doorX, 0.825, d / 2 - 0.27, 0.73, 1.35, 0.07, darkWood, group);
    for (let i = 0; i < 5; i++) box(doorX - 0.29 + i * 0.145, 0.825, d / 2 - 0.217, 0.137, 1.31, 0.025, i % 2 ? timber : darkWood, group);
    box(doorX + 0.23, 0.86, d / 2 - 0.172, 0.024, 0.07, 0.035, brass, group);
    const step = mesh(new RoundedBoxGeometry(1.02, 0.17, 0.65, 2, 0.035), stone, group); step.position.set(doorX, 0.085, d / 2 + 0.22);
    addWindow(group, -doorX, mainY, d / 2, mainW, 0.92, warm ? 0.9 : 0.53);
    if (wall > 3.2) {
      addWindow(group, -w * 0.24, wall * 0.8, d / 2, 0.53, 0.63, 0.14);
      addWindow(group, w * 0.22, wall * 0.8, d / 2, 0.57, 0.65, warm ? 0.68 : 0.14);
    }
    addWindow(group, -w / 2, wall * 0.55, 0.2, 0.67, 0.85, warm ? 0.46 : 0.78, true);
    const chimneyX = w * 0.26;
    box(chimneyX, wall + pitch * 0.79 + 0.33, -d * 0.21, 0.42, 0.94, 0.48, stone, group);
    const chimneyCap = mesh(new RoundedBoxGeometry(0.59, 0.19, 0.66, 3, 0.077), snow, group); chimneyCap.position.set(chimneyX, wall + pitch * 0.79 + 0.84, -d * 0.21);
    box(doorX, 1.59, d / 2 + 0.26, 0.98, 0.11, 0.64, darkWood, group);
    const canopySnow = mesh(new RoundedBoxGeometry(1.08, 0.16, 0.73, 3, 0.07), snow, group); canopySnow.position.set(doorX + 0.013, 1.72, d / 2 + 0.29);
    for (let i = 0; i < 4; i++) {
      const px = x - w * 0.46 + i * w * 0.32 + (random() - 0.5) * 0.24;
      snowDrift(px, z + d / 2 + 0.21 + random() * 0.3, 0.85 + random() * 0.55, 0.55 + random() * 0.24, 0.1 + random() * 0.12);
    }
    contactPatch(x, z + d / 2 + 0.05, w + 0.8, 1.5);
    if (z > -22) {
      const light = new THREE.PointLight(warm ? '#ffcd90' : '#edc99c', warm ? 2.9 : 1.45, 4.6, 2);
      const local = new THREE.Vector3(-doorX, mainY, d / 2 + 0.36).applyAxisAngle(new THREE.Vector3(0,1,0), rotation).add(group.position);
      light.position.copy(local); windows.push(light); scene.add(light);
    }
  };
  house(-4.1, -8, 3.5, 4.3, 2.6, 1.62, 0.1, true, 1);
  house(4.45, -10.3, 4.5, 5.1, 3.35, 1.8, -0.18, false, 2);
  house(-5.8, -17.4, 4.2, 4.7, 2.65, 1.8, 0.15, false, 3);
  house(5.5, -21.1, 3.25, 4.7, 2.25, 1.75, -0.06, true, 4);
  house(-4.7, -29.7, 3.55, 4, 2.72, 1.57, -0.09, true, 5);
  house(4.1, -35.5, 4.2, 4.7, 3.05, 1.75, -0.2, false, 6);
  house(-4.55, -42, 3.4, 4.25, 2.4, 1.65, 0.19, false, 7);
  house(0.6, -51, 3.6, 4.3, 2.6, 1.67, -0.08, true, 8);

  const treeGround = (x: number, z: number) => groundHeight(x, z) + (z < -43 ? Math.max(0, (-z - 43) / 37) * (6 + Math.sin(x * 0.066) * 3.4 + Math.sin(x * 0.135) * 1.7) : 0);
  const snowBough = (start: THREE.Vector3, end: THREE.Vector3, width: number, depth: number, parent: THREE.Group) => {
    const delta = end.clone().sub(start), length = delta.length();
    const geo = new THREE.SphereGeometry(1, parent.userData.distant ? 6 : 9, parent.userData.distant ? 4 : 5);
    const pos = geo.attributes.position;
    const phase = random() * 9;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i), vy = pos.getY(i), vz = pos.getZ(i);
      pos.setXYZ(i, vx * (1 + Math.sin(vz * 4 + phase) * 0.09), vy * (0.88 + noise2(vx * 3 + 8, vz * 3 + 8, 32) * 0.17), vz * (1 + Math.cos(vx * 5 + phase) * 0.11));
    }
    geo.computeVertexNormals();
    const patch = mesh(geo, roofSnow, parent); patch.position.copy(start).add(end).multiplyScalar(0.5); patch.position.y += depth * 0.27;
    patch.scale.set(length * 0.56, depth, width);
    patch.rotation.y = -Math.atan2(delta.z, delta.x); patch.rotation.z = Math.atan2(delta.y, Math.hypot(delta.x, delta.z));
  };
  const needleBough = (start: THREE.Vector3, end: THREE.Vector3, parent: THREE.Group) => {
    // One coherent, uneven spray of evergreen foliage around each woody branch.
    // This bridges the smaller attached sprays without stacked cones or circular tiers.
    const delta = end.clone().sub(start), length = delta.length();
    const orientation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1,0,0), delta.clone().normalize());
    const positions: number[] = [], uv: number[] = [], indices: number[] = [];
    const sections = 7, radial = 8, phase = random() * 6;
    for (let j = 0; j <= sections; j++) for (let k = 0; k <= radial; k++) {
      const u = j / sections, theta = k / radial * Math.PI * 2;
      const envelope = Math.pow(Math.max(0, Math.sin(Math.PI * u)), 0.64) * (0.84 + Math.sin(u * 8 + phase) * 0.16) + 0.018;
      const lobe = 1 + Math.sin(theta * 3 + u * 7 + phase) * 0.14;
      const local = new THREE.Vector3(u * length, Math.cos(theta) * length * 0.14 * envelope * lobe, Math.sin(theta) * length * 0.245 * envelope * lobe);
      local.applyQuaternion(orientation).add(start); positions.push(local.x,local.y,local.z); uv.push(u,k/radial);
      if (j < sections && k < radial) { const a = j * (radial + 1) + k; indices.push(a,a+1,a+radial+1,a+1,a+radial+2,a+radial+1); }
    }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3)); geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2)); geometry.setIndex(indices); geometry.computeVertexNormals(); mesh(geometry,needles,parent);
  };
  const fir = (x: number, z: number, height: number, scale = 1) => {
    const group = new THREE.Group(); group.position.set(x, treeGround(x, z), z); group.rotation.y = random() * Math.PI * 2; group.userData.distant = z < -35; staticRoot.add(group);
    const lean = (random() - 0.5) * height * 0.06;
    const trunk = mesh(new THREE.CylinderGeometry(height * 0.0018, height * 0.019, Math.hypot(height,lean), 8), darkWood, group);
    trunk.position.set(lean * .5,height * .5,0); trunk.rotation.z = -Math.atan2(lean,height);
    const levels = Math.ceil(height * (z < -35 ? 0.91 : 1.08));
    const phase = random() * Math.PI * 2;
    for (let level = 0; level < levels; level++) {
      const t = level / levels;
      const ly = height * (0.17 + t * 0.79) + (random() - 0.5) * height * 0.065;
      const radius = Math.pow(1 - t, 0.78) * height * 0.30 * scale;
      const branches = 4 + Math.floor(random() * 2);
      for (let b = 0; b < branches; b++) {
        if (random() < 0.1 && t < 0.5) continue;
        const angle = phase + b / branches * Math.PI * 2 + level * 1.82 + (random() - 0.5) * 0.68;
        const length = radius * (0.57 + random() * 0.58) * (1 + Math.sin(angle + phase) * 0.16);
        const begin = new THREE.Vector3(lean * ly / height, ly, 0);
        const end = new THREE.Vector3(begin.x + Math.cos(angle) * length, ly - length * (0.17 + random() * 0.18), Math.sin(angle) * length);
        beam(begin, end, Math.max(0.011, length * 0.026), darkWood, group);
        needleBough(begin.clone().lerp(end,.1),end,group);
        if (random() > .13) snowBough(begin.clone().lerp(end,.25).add(new THREE.Vector3(0,length*.09,0)),begin.clone().lerp(end,.93).add(new THREE.Vector3(0,length*.05,0)),length*.19,.055+length*.07,group);
        for (let twig = 0; twig < (z < -35 ? 2 : 3); twig++) {
          const tbranch = 0.31 + twig * 0.23;
          const center = begin.clone().lerp(end, tbranch);
          const spread = length * (0.27 - twig * 0.058);
          const tips: THREE.Vector3[] = [];
          for (const side of [-1, 1]) {
            const tip = center.clone().add(new THREE.Vector3(Math.cos(angle + side * 0.68) * spread, -spread * 0.15, Math.sin(angle + side * 0.68) * spread));
            beam(center, tip, 0.009, needles, group); tips.push(tip);
            // Non-conical needle sprays: lopsided flattened fans with visible twig gaps.
            const foliage = mesh(new THREE.SphereGeometry(1, z < -35 ? 5 : 6, z < -35 ? 3 : 4), needles, group);
            foliage.position.copy(center).lerp(tip, 0.59); foliage.scale.set(spread * 0.58, spread * 0.13 + 0.018, spread * 0.23); foliage.rotation.y = -(angle + side * 0.68);
          }
          if (random() > 0.18) snowBough(tips[0], tips[1], length * 0.1, 0.044 + length * 0.032, group);
        }
        if (random() > 0.35) snowBough(begin.clone().lerp(end, 0.26), begin.clone().lerp(end, 0.94), length * 0.1, 0.055 + length * 0.042, group);
      }
    }
    const tipGeometry = new THREE.SphereGeometry(1,8,6);
    const tipPositions = tipGeometry.attributes.position;
    for(let i=0;i<tipPositions.count;i++) { const y=tipPositions.getY(i); tipPositions.setX(i,tipPositions.getX(i)*(1-Math.max(0,y)*.58)); tipPositions.setZ(i,tipPositions.getZ(i)*(1-Math.max(0,y)*.58)); }
    tipGeometry.computeVertexNormals();
    const apex=mesh(tipGeometry,needles,group); apex.position.set(lean,height*.936,0);apex.scale.set(height*.039,height*.08,height*.038);apex.rotation.z=lean/height;
    snowBough(new THREE.Vector3(lean-height*.027,height*.906,0),new THREE.Vector3(lean+height*.028,height*.942,0),height*.024,height*.011,group);
    if (z > -35) { snowDrift(x, z, 1.1 + height * 0.12, 0.85, 0.15); contactPatch(x, z, 1.8, 1.4); }
  };
  const bareTree = (x: number, z: number, height: number, seed: number) => {
    const group = new THREE.Group(); group.position.set(x, treeGround(x,z), z); staticRoot.add(group);
    const trunk = new THREE.Vector3(Math.sin(seed) * 0.26, height * 0.64, 0.09);
    beam(new THREE.Vector3(), trunk, height * 0.019, timber, group);
    for (let i = 0; i < 6; i++) {
      const a = seed + i * 2.32, root = trunk.clone().multiplyScalar(0.43 + i * 0.091);
      const tip = root.clone().add(new THREE.Vector3(Math.cos(a) * height * (0.24 + i * 0.016), height * (0.27 - i * 0.011), Math.sin(a) * height * 0.25));
      beam(root, tip, height * 0.009, timber, group);
      for (let j = 0; j < 3; j++) {
        const fork = root.clone().lerp(tip, 0.45 + j * 0.17);
        const small = fork.clone().add(new THREE.Vector3(Math.cos(a + j) * height * 0.12, height * 0.15, Math.sin(a + j) * height * 0.1));
        beam(fork, small, height * 0.0035, timber, group);
      }
      if (i % 2 === 0) snowBough(root.clone().lerp(tip,.2), root.clone().lerp(tip,.8), height * .015, height * .012, group);
    }
  };
  [[-9,-4,6.8],[8.8,-4.9,6.1],[-10.4,-13,8.1],[9.6,-19,7.2],[-8.6,-25,6.8],[10.1,-30,7.6],[-11,-38,7],[8,-44,7.8],[-8,-51,7.5]].forEach(([x,z,h]) => fir(x,z,h));
  for (let i = 0; i < 15; i++) fir(-38 + i * 5.4 + (random() - .5) * 2.3, -58 - random() * 18, 4.9 + random() * 5.7, .72 + random() * .35);
  bareTree(-7.3,-14.3,5.4,1.7); bareTree(7.4,-28.8,5.8,4.2); bareTree(-12.2,-43.5,6.3,3.1);
  for (let i = 0; i < 9; i++) {
    const z = -3.6 - i * 3.2, side = i % 2 ? -1 : 1;
    const x = laneCenter(z) + side * (2 + random() * .5);
    snowDrift(x,z,.45+random()*.8,.4+random()*.65,.045+random()*.105);
  }

  // Fence posts and a few overhead cables place the village at life-sized scale.
  const fence = (x: number, z: number, length: number, rotation: number) => {
    const group = new THREE.Group(); group.position.set(x, 0, z); group.rotation.y = rotation; staticRoot.add(group);
    const n = Math.ceil(length / 0.75);
    for (let i = 0; i <= n; i++) {
      const bx = (i / n - 0.5) * length;
      box(bx, 0.62, 0, 0.09, 0.94 + Math.sin(i * 2) * 0.07, 0.11, timber, group);
      box(bx, 1.1, 0, 0.15, 0.09, 0.17, snow, group);
    }
    for (const y of [0.39, 0.85]) box(0, y, -0.05, length + 0.12, 0.09, 0.09, darkWood, group);
  };
  fence(-4, -3.5, 2.8, 0.21);
  fence(4.4, -5.8, 3.4, -0.2);
  fence(-3.8, -21.7, 2.4, 0.08);
  // Lantern down the bend, intentionally much dimmer and smaller than the near one.
  beam(new THREE.Vector3(2.8, 0, -17), new THREE.Vector3(2.8, 2.9, -17), 0.045, blackIron);
  box(2.8, 2.8, -17, 0.23, 0.37, 0.21, windowDim);
  box(2.8, 3.01, -17, 0.32, 0.07, 0.29, snow);
  const laneLamp = new THREE.PointLight('#ffd495', 2, 4.6, 2); laneLamp.position.set(2.8, 2.7, -17); scene.add(laneLamp);

  // Sheltered first-person foreground: planks below, tactile rail and eave above.
  for (let i = 0; i < 20; i++) box(-4.55 + i * 0.48, -0.055, 2.7, 0.46, 0.12, 5.1, i % 4 ? railWood : timber);
  const handrail = mesh(new RoundedBoxGeometry(8.7, 0.18, 0.34, 3, 0.033), railWood); handrail.position.set(0, 0.73, 0.96);
  box(0, 0.26, 0.98, 8.7, 0.115, 0.125, darkWood);
  for (let i = -7; i <= 7; i++) box(i * 0.59 + 0.13, 0.43, 0.97, 0.073, 0.62, 0.09, timber);
  for (const x of [-3.9, 3.9]) {
    box(x, 1.4, 0.95, 0.25, 2.92, 0.25, railWood);
    box(x, 2.57, 1.13, 0.41, 0.12, 0.61, darkWood);
    beam(new THREE.Vector3(x, 1.96, 0.95), new THREE.Vector3(x * 0.77, 2.58, 0.95), 0.075, railWood);
  }
  for (let i = 0; i < 20; i++) box(-4.55 + i * 0.48, 2.76, 2.5, 0.465, 0.14, 4.2, timber);
  box(0, 2.63, 0.52, 9.55, 0.25, 0.24, railWood);
  for (let i = -4; i <= 4; i++) box(i * 1.03, 2.61, 2.5, 0.13, 0.18, 4.35, darkWood);
  box(0, 2.82, 0.45, 9.65, 0.16, 0.65, snow);
  // Small tapered icicles carry the roof load without dominating the view.
  for (let i = 0; i < 19; i++) {
    const len = 0.055 + random() * 0.18;
    const icicle = mesh(new THREE.ConeGeometry(0.013 + random() * 0.009, len, 5), roofSnow);
    icicle.position.set(-4.35 + i * 0.48, 2.73 - len / 2, 0.16); icicle.rotation.z = Math.PI;
  }

  // The lantern is modeled at hand scale, with metal cage, glass and a tiny wick.
  const lantern = new THREE.Group(); lantern.position.set(-0.45, 0.88, 1); staticRoot.add(lantern);
  box(0, 0.016, 0, 0.25, 0.055, 0.23, brass, lantern);
  box(0, 0.23, 0, 0.175, 0.32, 0.17, lanternGlass, lantern);
  for (const x of [-0.105, 0.105]) for (const z of [-0.098, 0.098]) box(x, 0.23, z, 0.022, 0.39, 0.022, brass, lantern);
  const lid = mesh(new THREE.ConeGeometry(0.19, 0.13, 4), brass, lantern); lid.position.y = 0.465; lid.rotation.y = Math.PI / 4;
  box(0, 0.525, 0, 0.055, 0.05, 0.045, brass, lantern);
  const handle = mesh(new THREE.TorusGeometry(0.084, 0.009, 5, 18, Math.PI), brass, lantern); handle.position.y = 0.53;
  const flame = mesh(new THREE.SphereGeometry(0.028, 8, 7), windowAmber, lantern); flame.position.y = 0.19; flame.scale.set(0.8, 1.6, 0.7);
  const lampLight = new THREE.PointLight('#ffd59a', 1.9, 4.2, 2); lampLight.position.set(-0.45, 1.14, 1.02); scene.add(lampLight);
  const lampGlowCanvas = document.createElement('canvas'); lampGlowCanvas.width = lampGlowCanvas.height = 64;
  const lctx = lampGlowCanvas.getContext('2d')!, gradient = lctx.createRadialGradient(32,32,0,32,32,32);
  gradient.addColorStop(0, 'rgba(255,204,130,.65)'); gradient.addColorStop(0.24,'rgba(255,185,106,.19)'); gradient.addColorStop(1,'rgba(255,181,110,0)');
  lctx.fillStyle = gradient; lctx.fillRect(0,0,64,64);
  const lampGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(lampGlowCanvas), transparent: true, opacity: 0.36, depthWrite: false, blending: THREE.AdditiveBlending }));
  lampGlow.position.set(-0.45, 1.1, 1.04); lampGlow.scale.set(0.62, 0.7, 1); scene.add(lampGlow);

  // The rail snow is continuous geometry, and a tap makes a shallow soft-edged sweep.
  const snowCols = 160, snowRows = 12;
  const snowGeo = new THREE.PlaneGeometry(8.7, 0.43, snowCols, snowRows);
  snowGeo.rotateX(-Math.PI / 2); snowGeo.translate(0, 0, 0.96);
  const sp = snowGeo.attributes.position;
  const originalY = new Float32Array(sp.count), cleared = new Float32Array(sp.count), clearTarget = new Float32Array(sp.count);
  for (let i = 0; i < sp.count; i++) {
    const x = sp.getX(i), z = sp.getZ(i);
    const across = (z - 0.96) / 0.215;
    originalY[i] = 0.835 + Math.sqrt(Math.max(0, 1 - across * across)) * (0.115 + Math.sin(x * 6.2) * 0.009) + Math.sin(x * 11.3) * 0.004;
    sp.setY(i, originalY[i]);
  }
  snowGeo.computeVertexNormals();
  const railSnow = new THREE.Mesh(snowGeo, snow); railSnow.castShadow = true; railSnow.receiveShadow = true; scene.add(railSnow);

  // Snow falls through different true depths outside the shelter, with no cursor attraction.
  const flakeCount = 580, flakePositions = new Float32Array(flakeCount * 3), flakeVelocity = new Float32Array(flakeCount);
  const flakeSeed = new Float32Array(flakeCount), flakeColors = new Float32Array(flakeCount * 3);
  for (let i = 0; i < flakeCount; i++) {
    const near = i < 140;
    flakePositions[i*3] = (random() - 0.5) * (near ? 22 : 66);
    flakePositions[i*3+1] = random() * (near ? 10 : 16);
    flakePositions[i*3+2] = near ? -random() * 15 - 0.6 : -random() * 60 - 7;
    flakeVelocity[i] = 0.25 + random() * 0.33; flakeSeed[i] = random() * Math.PI * 2;
    const v = 0.53 + random() * 0.35; flakeColors.set([v * 0.86,v * 0.94,v],i*3);
  }
  const snowParticleCanvas = document.createElement('canvas'); snowParticleCanvas.width = snowParticleCanvas.height = 32;
  const pctx = snowParticleCanvas.getContext('2d')!, pg = pctx.createRadialGradient(16,16,0,16,16,16);
  pg.addColorStop(0,'rgba(255,255,255,1)'); pg.addColorStop(0.3,'rgba(255,255,255,.85)'); pg.addColorStop(1,'rgba(255,255,255,0)');
  pctx.fillStyle = pg; pctx.fillRect(0,0,32,32);
  const flakeTexture = new THREE.CanvasTexture(snowParticleCanvas);
  const flakesGeo = new THREE.BufferGeometry(); flakesGeo.setAttribute('position',new THREE.BufferAttribute(flakePositions,3)); flakesGeo.setAttribute('color',new THREE.BufferAttribute(flakeColors,3));
  const flakes = new THREE.Points(flakesGeo,new THREE.PointsMaterial({ map:flakeTexture,size:0.052,transparent:true,opacity:0.63,vertexColors:true,depthWrite:false,sizeAttenuation:true })); scene.add(flakes);

  const dustCount=46, dustPositions=new Float32Array(dustCount*3), dustVelocity=new Float32Array(dustCount*3);
  for(let i=0;i<dustCount;i++) dustPositions[i*3+1]=-20;
  const dustGeo=new THREE.BufferGeometry();dustGeo.setAttribute('position',new THREE.BufferAttribute(dustPositions,3));
  const dustMat=new THREE.PointsMaterial({map:flakeTexture,color:'#e6edf3',size:0.025,transparent:true,opacity:0,depthWrite:false});
  const dust=new THREE.Points(dustGeo,dustMat);dust.frustumCulled=false;scene.add(dust);let dustAge=10;
  const raycaster=new THREE.Raycaster();

  // Baking opaque static material groups substantially lowers geometry draw overhead.
  // Transparent lantern glass remains separate, preserving sorting.
  staticRoot.updateMatrixWorld(true);
  const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
  const remove: THREE.Mesh[]=[];
  staticRoot.traverse(object=>{
    if(!(object instanceof THREE.Mesh)||Array.isArray(object.material)||object.material.transparent)return;
    const source=object.geometry.index?object.geometry.toNonIndexed():object.geometry.clone();
    source.applyMatrix4(object.matrixWorld);
    for(const attribute of Object.keys(source.attributes)) if(!['position','normal','uv'].includes(attribute)) source.deleteAttribute(attribute);
    if(!source.attributes.uv) source.setAttribute('uv',new THREE.BufferAttribute(new Float32Array(source.attributes.position.count*2),2));
    const list=batches.get(object.material)??[];list.push(source);batches.set(object.material,list);remove.push(object);
  });
  for(const [mat,geometries] of batches){
    const merged=mergeGeometries(geometries,false);
    geometries.forEach(geo=>geo.dispose());
    if(merged){const combined=new THREE.Mesh(merged,mat);combined.castShadow=true;combined.receiveShadow=true;scene.add(combined);}
  }
  remove.forEach(object=>{object.removeFromParent();object.geometry.dispose();});
  // Transform the remaining transparent glass into the same world frame before flattening.
  const lastMeshes:THREE.Mesh[]=[];staticRoot.traverse(object=>{if(object instanceof THREE.Mesh)lastMeshes.push(object);});
  for(const object of lastMeshes){object.updateWorldMatrix(true,false);const world=object.matrixWorld.clone();object.removeFromParent();object.matrix.copy(world);object.matrix.decompose(object.position,object.quaternion,object.scale);scene.add(object);}
  staticRoot.removeFromParent();

  const resize=(aspect:number)=>{
    camera.aspect=aspect;
    const portrait=aspect<0.86;
    camera.fov=portrait?53:50;
    camera.position.set(portrait?-0.4:0.2,portrait?1.41:1.47,portrait?3.55:3.27);
    camera.lookAt(portrait?0:0.28,portrait?0.65:1.65,portrait?-12:-19);
    camera.updateProjectionMatrix();
  };
  resize(1);
  return {
    scene,camera,resize,
    update(elapsed,dt){
      for(let i=0;i<flakeCount;i++){
        flakePositions[i*3]+=Math.sin(elapsed*0.13+flakeSeed[i])*dt*0.052+dt*0.036;
        flakePositions[i*3+1]-=dt*flakeVelocity[i];
        if(flakePositions[i*3+1]<-0.3){
          flakePositions[i*3+1]=i<140?10:16;
          flakePositions[i*3]=(random()-0.5)*(i<140?22:66);
        }
      }
      flakesGeo.attributes.position.needsUpdate=true;
      lampLight.intensity=1.9+Math.sin(elapsed*1.27)*0.025;
      let changed=false;
      for(let i=0;i<sp.count;i++)if(Math.abs(clearTarget[i]-cleared[i])>0.00015){
        cleared[i]+= (clearTarget[i]-cleared[i])*Math.min(1,dt*5);
        sp.setY(i,originalY[i]-cleared[i]);changed=true;
      }
      if(changed){sp.needsUpdate=true;snowGeo.computeVertexNormals();}
      if(dustAge<2.4){
        dustAge+=dt;dustMat.opacity=Math.max(0,0.53*(1-dustAge/2.4));
        for(let i=0;i<dustCount;i++){
          dustVelocity[i*3+1]-=dt*0.28;
          for(let j=0;j<3;j++)dustPositions[i*3+j]+=dustVelocity[i*3+j]*dt;
        }
        dustGeo.attributes.position.needsUpdate=true;
      }
    },
    interact(ndc){
      camera.updateMatrixWorld(true);scene.updateMatrixWorld(true);raycaster.setFromCamera(ndc,camera);
      const hit=raycaster.intersectObject(railSnow,false)[0];if(!hit)return undefined;
      const x=hit.point.x;
      if(Math.abs(x+0.45)<0.28)return undefined;
      for(let i=0;i<sp.count;i++){
        const distance=Math.abs(sp.getX(i)-x);
        const weight=Math.exp(-Math.pow(distance/0.27,4));
        clearTarget[i]=Math.min(originalY[i]-0.828,Math.max(clearTarget[i],weight*(originalY[i]-0.828)));
      }
      for(let i=0;i<dustCount;i++){
        dustPositions.set([x+(random()-.5)*.5,.92+random()*.025,.86+(random()-.5)*.14],i*3);
        dustVelocity.set([(random()-.5)*.22,.05+random()*.11,-.12-random()*.18],i*3);
      }
      dustAge=0;dustMat.opacity=.53;dustGeo.attributes.position.needsUpdate=true;
      return {kind:'snow',strength:0.28,x:THREE.MathUtils.clamp(x/4.35,-1,1)};
    },
    dispose(){
      // Materials that had no surviving geometry still own textures through the shared maps.
      // The host disposes all traversed material/geometry/map resources.
      for(const light of windows)light.dispose();
    }
  };
};
