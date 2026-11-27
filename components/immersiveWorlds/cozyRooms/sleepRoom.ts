import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldBuild } from './contracts';
import { batchStatic, clothSheet, cushion, stoneBlock } from './geometry';
import { captureRoomProbe, createRoomVolume } from './lighting';
import { createWoodMaterial } from '../shared/render/woodSurface';
import { applyFabricSurface, createFabricMaterial } from '../shared/render/fabricSurface';
import { createGlazeMaterial, createPlasterMaterial, patchSurface } from '../shared/render/interiorSurface';
import { GLSL_NOISE } from '../shared/render/glsl';
import { fbm3, noise3, seeded } from '../shared/render/noise';

/*
 * 수면 준비: reclined in bed at night, facing a tall window between linen
 * curtains. The moon is the key light: a cold, shadowed beam through the
 * curtain gap that lays the window bars across the floor and the foot of the
 * bed, with dust drifting in it. The curtains glow faintly where moonlight
 * passes through them. A ceramic bedside lamp gives the only warm pool and can
 * be dimmed; the curtain gap can be widened. Original procedural work.
 */

const WIN = { x0: -1.35, x1: 1.75, y0: 0.8, y1: 3.75, z: -4.12 };
const MOON_DIR = new THREE.Vector3(0.22, -0.4, 1).normalize(); // direction the light travels

const NIGHT_VERTEX = /* glsl */ `
varying vec3 vWorld;
varying vec3 vNormalW;
void main() {
  #ifdef USE_INSTANCING
  mat4 m = modelMatrix * instanceMatrix;
  #else
  mat4 m = modelMatrix;
  #endif
  vec4 w = m * vec4(position, 1.0);
  vWorld = w.xyz; vNormalW = normalize(mat3(m) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const NIGHT_SKY = /* glsl */ `
${GLSL_NOISE}
uniform vec3 uMoon;
uniform float uTime;
varying vec3 vWorld;
void main() {
  vec3 d = normalize(vWorld - cameraPosition);
  float h = d.y;
  vec3 sky = mix(vec3(0.05, 0.08, 0.16), vec3(0.012, 0.022, 0.06), smoothstep(0.0, 0.55, h));
  float md = acos(clamp(dot(d, uMoon), -1.0, 1.0));
  // Moonlit haze: a broad glow around the moon and a paler band at the horizon.
  sky += vec3(0.12, 0.15, 0.22) * exp(-md * 3.0) + vec3(0.05, 0.06, 0.08) * exp(-max(h, 0.0) * 9.0);
  vec2 cp = d.xz / max(h + 0.15, 0.05);
  float cloud = smoothstep(0.05, 0.75, bwFbm3(vec3(cp * vec2(0.5, 1.4) + vec2(uTime * 0.004, 0.0), 2.0)) + 0.1) * smoothstep(0.02, 0.25, h);
  // Clouds near the moon are silver-edged; elsewhere they hide stars.
  sky = mix(sky, vec3(0.06, 0.075, 0.11) + vec3(0.25, 0.27, 0.3) * exp(-md * 4.0), cloud * 0.7);
  vec3 sp = d * 520.0; vec3 cell = floor(sp); vec3 hs = bwHash3(cell);
  float star = step(0.9955, hs.x) * smoothstep(0.5, 0.0, length(fract(sp) - 0.5 - (hs.yzx - 0.5) * 0.4) * 2.0);
  sky += vec3(0.85, 0.9, 1.0) * star * (1.0 - cloud) * smoothstep(0.05, 0.3, h) * (0.65 + 0.35 * sin(uTime * (0.2 + hs.z * 0.3) + hs.y * 40.0)) * 2.2;
  // A crescent: a bright disc with an offset dark limb, and a soft halo.
  vec3 side = normalize(cross(uMoon, vec3(0.0, 1.0, 0.0)));
  float disc = smoothstep(0.0145, 0.0125, md);
  float limb = smoothstep(0.0125, 0.0105, acos(clamp(dot(d, normalize(uMoon + side * 0.009 + vec3(0.0, 0.004, 0.0))), -1.0, 1.0)));
  sky += vec3(1.0, 0.97, 0.88) * disc * (1.0 - limb) * 22.0 + vec3(0.5, 0.55, 0.65) * exp(-md * 55.0) * 0.6;
  gl_FragColor = vec4(sky, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const NIGHT_LAND = /* glsl */ `
${GLSL_NOISE}
uniform vec3 uMoon;
uniform float uLeaf;
varying vec3 vWorld;
varying vec3 vNormalW;
void main() {
  vec3 n = normalize(vNormalW) * (gl_FrontFacing ? 1.0 : -1.0);
  float var = bwNoise(vWorld * 0.7) * 0.5 + bwNoise(vWorld * 3.0) * 0.25;
  // Leaf clusters: high-frequency relief breaks the moonlit side into sprays.
  float sprays = bwNoise(vWorld * 6.0) * 0.6 + bwNoise(vWorld * 15.0) * 0.4;
  vec3 nn = normalize(n + uLeaf * 0.6 * vec3(bwNoise(vWorld * 5.0), bwNoise(vWorld * 5.0 + 3.1), bwNoise(vWorld * 5.0 + 7.3)));
  float lit = clamp(dot(nn, uMoon), 0.0, 1.0) * mix(1.0, smoothstep(-0.2, 0.5, sprays), uLeaf);
  vec3 albedo = mix(vec3(0.03, 0.04, 0.038), vec3(0.05, 0.065, 0.045), uLeaf) * (0.65 + 0.6 * var);
  vec3 view = normalize(cameraPosition - vWorld);
  float rim = pow(1.0 - abs(dot(n, view)), 3.0) * uLeaf * 0.6;
  vec3 color = albedo * (vec3(0.025, 0.03, 0.05) + vec3(0.5, 0.58, 0.8) * (lit * 0.9 + rim));
  float dist = length(vWorld - cameraPosition);
  color = mix(color, vec3(0.03, 0.045, 0.08), 1.0 - exp(-dist * 0.03));
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export function createSleepRoomWorld(): WorldBuild {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0.01, 0.015, 0.03);
  const camera = new THREE.PerspectiveCamera(46, 1, 0.06, 120);
  const random = seeded(0x51ee9);
  const matrix = new THREE.Matrix4(), euler = new THREE.Euler(), quat = new THREE.Quaternion(), pos = new THREE.Vector3(), scl = new THREE.Vector3();
  const place = (geometry: THREE.BufferGeometry, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => {
    matrix.compose(pos.set(x, y, z), quat.setFromEuler(euler.set(rx, ry, rz)), scl.set(sx, sy, sz));
    return geometry.applyMatrix4(matrix);
  };
  let destination: THREE.Object3D = scene;
  const add = (geometry: THREE.BufferGeometry, material: THREE.Material, shadow = true) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = shadow; mesh.receiveShadow = true; destination.add(mesh); return mesh;
  };
  const timeUniform = { value: 0 };

  // --- Materials --------------------------------------------------------------
  const paint = createPlasterMaterial('#8d96a0', { key: 'sleep-wall', floorY: 0, stains: 0.25, bump: 0.6 });
  const ceilingPaint = createPlasterMaterial('#8a9096', { key: 'sleep-ceiling', stains: 0.15, bump: 0.5 });
  const floor = createWoodMaterial('#7a5a40', { key: 'sleep-floor', axis: 'z', rings: 22, figure: 0.65, pores: 0.35, wear: 0.25, varnish: 0.55, roughness: 0.42, planks: { width: 0.18, length: 2.1, bevel: 0.0035, tone: 0.3 } });
  const walnut = createWoodMaterial('#5a3d2a', { key: 'sleep-walnut', axis: 'x', rings: 30, figure: 0.8, pores: 0.5, wear: 0.1, varnish: 0.6, roughness: 0.4 });
  const walnutY = createWoodMaterial('#5a3d2a', { key: 'sleep-walnut-y', axis: 'y', rings: 30, figure: 0.8, pores: 0.5, wear: 0.1, varnish: 0.6, roughness: 0.4 });
  const frameWood = createWoodMaterial('#d9d2c4', { key: 'sleep-frame', axis: 'y', rings: 30, figure: 0.15, pores: 0.1, wear: 0.05, varnish: 0.25, roughness: 0.5 });
  const frameWoodX = createWoodMaterial('#d9d2c4', { key: 'sleep-frame-x', axis: 'x', rings: 30, figure: 0.15, pores: 0.1, wear: 0.05, varnish: 0.25, roughness: 0.5 });
  const linen = createFabricMaterial('#c3c8c4', { key: 'sleep-duvet', weave: 'plain', threads: [420, 420], heather: 0.6, threadContrast: 0.5, fuzz: 0.4, depth: 0.0004, sheen: 0.5, sheenColor: '#eef2f2', roughness: 0.9 }, { side: THREE.DoubleSide });
  const sheet = createFabricMaterial('#dfe1da', { key: 'sleep-sheet', weave: 'plain', threads: [500, 500], heather: 0.3, fuzz: 0.3, depth: 0.0003, sheen: 0.4, roughness: 0.88 }, { side: THREE.DoubleSide });
  const curtainLinen = applyFabricSurface(new THREE.MeshPhysicalMaterial({ color: '#cfcfc6', roughness: 0.95, sheen: 0.4, sheenColor: '#ffffff', side: THREE.DoubleSide }), { key: 'sleep-curtain', weave: 'plain', threads: [260, 260], heather: 0.5, fuzz: 0.3, depth: 0.0004 });
  const rugWool = createFabricMaterial('#7c7466', { key: 'sleep-rug', weave: 'knit', threads: [70, 110], heather: 0.9, fuzz: 1, depth: 0.0025, roughness: 0.98,
    pattern: 'fbBase *= 0.85 + 0.25 * step(0.5, fract(fbUv.x * 1.6 + 0.25 * sin(fbUv.y * 3.0)));' }, { side: THREE.DoubleSide });
  const brass = patchSurface(new THREE.MeshStandardMaterial({ color: '#b08b55', metalness: 1, roughness: 0.32 }), {
    key: 'sleep-brass', color: 'float brN = bwFbm3(vSurfaceWorld * 14.0); diffuseColor.rgb *= 0.75 + 0.3 * brN;', roughness: 'roughnessFactor = clamp(roughnessFactor + 0.2 * brN, 0.12, 1.0);',
  });
  const lampGlaze = createGlazeMaterial('#4f6e6a', { key: 'sleep-lamp', pool: '#2a3e3c', speckle: 0.4, scale: 4 });
  const shadeLinen = createFabricMaterial('#e0cda4', { key: 'sleep-shade', weave: 'plain', threads: [300, 300], roughness: 0.9 }, { side: THREE.DoubleSide, emissive: '#ffa955', emissiveIntensity: 1 });
  const glassMaterial = new THREE.MeshPhysicalMaterial({ color: '#000000', roughness: 0.22, specularIntensity: 0.12, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
  const drinkGlass = new THREE.MeshPhysicalMaterial({ color: '#cfdde2', roughness: 0.06, metalness: 0, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false, clearcoat: 1 });
  const paper = new THREE.MeshStandardMaterial({ color: '#cbc4ae', roughness: 0.92 });
  const bookCloth = createFabricMaterial('#41584f', { key: 'sleep-book', weave: 'plain', threads: [500, 500], roughness: 0.8 });

  // --- Lights: moon key, lamp pool, the room's own bounce --------------------
  const moon = new THREE.DirectionalLight(new THREE.Color(0.62, 0.72, 1.0), 5.5);
  moon.position.copy(MOON_DIR).multiplyScalar(-14).add(new THREE.Vector3(0.2, 1.5, -1.5));
  moon.target.position.set(0.2, 1.5, -1.5);
  moon.castShadow = true; moon.shadow.mapSize.set(2048, 2048);
  Object.assign(moon.shadow.camera, { left: -4.5, right: 4.5, top: 4.5, bottom: -4.5, near: 4, far: 26 });
  moon.shadow.bias = -0.0004; moon.shadow.normalBias = 0.02; moon.shadow.radius = 4;
  moon.shadow.autoUpdate = false; moon.shadow.needsUpdate = true;
  scene.add(moon, moon.target);
  scene.add(new THREE.HemisphereLight('#2a3a5c', '#141110', 0.05));

  // --- Room shell ----------------------------------------------------------------
  const wallShape = new THREE.Shape();
  wallShape.moveTo(-3.6, 0); wallShape.lineTo(3.6, 0); wallShape.lineTo(3.6, 4.6); wallShape.lineTo(-3.6, 4.6); wallShape.closePath();
  const hole = new THREE.Path(); hole.moveTo(WIN.x0, WIN.y0); hole.lineTo(WIN.x1, WIN.y0); hole.lineTo(WIN.x1, WIN.y1); hole.lineTo(WIN.x0, WIN.y1); hole.closePath();
  wallShape.holes.push(hole);
  // Back wall with real thickness: inner face, reveals and outer face.
  add(place(new THREE.ShapeGeometry(wallShape), 0, 0, WIN.z + 0.11), paint, true);
  for (const [x, ry] of [[WIN.x0, Math.PI / 2], [WIN.x1, -Math.PI / 2]] as const) add(place(new THREE.PlaneGeometry(0.24, WIN.y1 - WIN.y0), x, (WIN.y0 + WIN.y1) / 2, WIN.z - 0.01, 0, ry), paint);
  add(place(new THREE.PlaneGeometry(WIN.x1 - WIN.x0, 0.24), (WIN.x0 + WIN.x1) / 2, WIN.y1, WIN.z - 0.01, Math.PI / 2), paint);
  add(place(new THREE.PlaneGeometry(7.2, 4.6), -3.6, 2.3, 0.4, 0, Math.PI / 2, 0, 9.0 / 7.2), paint, false);
  add(place(new THREE.PlaneGeometry(7.2, 4.6), 3.6, 2.3, 0.4, 0, -Math.PI / 2, 0, 9.0 / 7.2), paint, false);
  add(place(new THREE.PlaneGeometry(7.2, 4.6), 0, 2.3, 4.9, 0, Math.PI), paint, false);
  add(place(new THREE.PlaneGeometry(7.2, 9.1), 0, 0, 0.4, -Math.PI / 2), floor, false).name = 'sleep-floor';
  add(place(new THREE.PlaneGeometry(7.2, 9.1), 0, 4.6, 0.4, Math.PI / 2), ceilingPaint, false);
  for (const [w, x, z, ry] of [[7.2, 0, WIN.z + 0.125, 0], [9.0, -3.585, 0.4, Math.PI / 2], [9.0, 3.585, 0.4, Math.PI / 2]] as const) add(place(stoneBlock(w, 0.14, 0.025, 2 + x, 0.02, 0.004), x, 0.07, z, 0, ry), walnut);
  // Window: painted timber casement, sill, bars that the moon will cast.
  const frameParts: Array<[THREE.BufferGeometry, THREE.Material]> = [
    [place(stoneBlock(0.11, WIN.y1 - WIN.y0, 0.14, 21, 0.02, 0.008), WIN.x0 + 0.055, (WIN.y0 + WIN.y1) / 2, WIN.z), frameWood],
    [place(stoneBlock(0.11, WIN.y1 - WIN.y0, 0.14, 22, 0.02, 0.008), WIN.x1 - 0.055, (WIN.y0 + WIN.y1) / 2, WIN.z), frameWood],
    [place(stoneBlock(WIN.x1 - WIN.x0, 0.11, 0.14, 23, 0.02, 0.008), (WIN.x0 + WIN.x1) / 2, WIN.y1 - 0.055, WIN.z), frameWoodX],
    [place(stoneBlock(WIN.x1 - WIN.x0, 0.12, 0.14, 24, 0.02, 0.008), (WIN.x0 + WIN.x1) / 2, WIN.y0 + 0.06, WIN.z), frameWoodX],
    [place(stoneBlock(0.065, WIN.y1 - WIN.y0 - 0.2, 0.1, 25, 0.02, 0.006), (WIN.x0 + WIN.x1) / 2, (WIN.y0 + WIN.y1) / 2, WIN.z), frameWood],
    [place(stoneBlock(WIN.x1 - WIN.x0 - 0.2, 0.06, 0.09, 26, 0.02, 0.006), (WIN.x0 + WIN.x1) / 2, 2.55, WIN.z), frameWoodX],
    [place(stoneBlock(WIN.x1 - WIN.x0 + 0.26, 0.05, 0.36, 27, 0.04, 0.008), (WIN.x0 + WIN.x1) / 2, WIN.y0 - 0.02, WIN.z + 0.14), frameWoodX],
  ];
  frameParts.forEach(([g, m]) => add(g, m));
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(WIN.x1 - WIN.x0, WIN.y1 - WIN.y0), glassMaterial);
  pane.position.set((WIN.x0 + WIN.x1) / 2, (WIN.y0 + WIN.y1) / 2, WIN.z - 0.02); pane.renderOrder = 8; pane.userData.dynamic = true; scene.add(pane);
  // A small plant on the sill, a silhouette against the sky.
  const potGlaze = createGlazeMaterial('#8b6a52', { key: 'sleep-pot', pool: '#5a3f2c', speckle: 0.6, scale: 6 });
  add(place(new THREE.LatheGeometry([[0, 0], [0.07, 0], [0.085, 0.02], [0.095, 0.13], [0.1, 0.15], [0.092, 0.152], [0.085, 0.14], [0, 0.13]].map(([r, h]) => new THREE.Vector2(r, h)), 32), -0.85, WIN.y0 + 0.005, WIN.z + 0.18), potGlaze);
  const leafShape = new THREE.Shape(); leafShape.moveTo(0, 0); leafShape.quadraticCurveTo(0.035, 0.05, 0, 0.13); leafShape.quadraticCurveTo(-0.035, 0.05, 0, 0);
  const leafBase = new THREE.ShapeGeometry(leafShape, 6); leafBase.deleteAttribute('uv');
  const plantLeaves: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 26; i++) {
    const a = random() * Math.PI * 2, tilt = 0.25 + random() * 0.9, s = 0.7 + random() * 0.7;
    plantLeaves.push(place(leafBase.clone(), -0.85 + Math.cos(a) * 0.03, WIN.y0 + 0.14 + random() * 0.08, WIN.z + 0.18 + Math.sin(a) * 0.03, 0, a, tilt, s, s, s).toNonIndexed());
  }
  const plantMaterial = new THREE.MeshStandardMaterial({ color: '#2e4a33', roughness: 0.6, side: THREE.DoubleSide });
  add(mergeGeometries(plantLeaves, false)!, plantMaterial);
  plantLeaves.forEach(g => g.dispose()); leafBase.dispose();

  // --- Night garden outside -------------------------------------------------------
  const moonSky = MOON_DIR.clone().negate();
  const sky = new THREE.Mesh(new THREE.SphereGeometry(90, 48, 24), new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false, uniforms: { uMoon: { value: new THREE.Vector3(0.04, 0.23, -1).normalize() }, uTime: timeUniform }, vertexShader: 'varying vec3 vWorld; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }', fragmentShader: NIGHT_SKY }));
  sky.renderOrder = -10; sky.frustumCulled = false; scene.add(sky);
  const land = (leaf: number) => new THREE.ShaderMaterial({ vertexShader: NIGHT_VERTEX, fragmentShader: NIGHT_LAND, side: THREE.DoubleSide, uniforms: { uMoon: { value: moonSky.clone() }, uLeaf: { value: leaf } } });
  const groundMaterial = land(0);
  const garden = new THREE.PlaneGeometry(80, 60, 80, 60); garden.rotateX(-Math.PI / 2);
  const gp = garden.attributes.position;
  for (let i = 0; i < gp.count; i++) { const x = gp.getX(i), z = gp.getZ(i) - 34; gp.setXYZ(i, x, -0.6 + fbm3(x * 0.08, 0, z * 0.08, 3) * 0.6 + Math.max(0, -z - 22) * 0.18 * (0.6 + 0.4 * Math.sin(x * 0.11)), z); }
  garden.computeVertexNormals();
  scene.add(new THREE.Mesh(garden, groundMaterial));
  // Trees: leafy silhouettes drawn per pixel on camera-facing cards. Each crown
  // is a ragged cloud of leaf sprays with a moonlit edge and a branching trunk.
  const treeCards: THREE.BufferGeometry[] = [];
  const trees: Array<[number, number, number, number]> = [[-4.4, -10, 6.2, 4.6], [4.2, -11.5, 5.6, 4.4], [-8.2, -19, 7.4, 5.6], [7.0, -21, 8.2, 6.0], [-1.4, -26, 6.8, 5.2], [11, -26, 7, 5.4], [-13, -24, 7.6, 6]];
  const eye = new THREE.Vector3(-0.2, 1.3, 2.9);
  trees.forEach(([x, z, h, w], index) => {
    const card = new THREE.PlaneGeometry(w, h);
    card.translate(0, h / 2, 0);
    const yaw = Math.atan2(eye.x - x, eye.z - z);
    card.rotateY(yaw); card.translate(x, -0.6, z);
    const seeds = new Float32Array(card.attributes.position.count).fill(index * 7.31 + 1);
    card.setAttribute('treeSeed', new THREE.BufferAttribute(seeds, 1));
    treeCards.push(card);
  });
  const treeMaterial = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: { uMoon: { value: moonSky.clone() }, uTime: timeUniform },
    vertexShader: `attribute float treeSeed; varying vec2 vUv; varying float vSeed; varying vec3 vWorld;
      void main(){ vUv = uv; vSeed = treeSeed; vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: `${GLSL_NOISE}
      uniform vec3 uMoon; uniform float uTime; varying vec2 vUv; varying float vSeed; varying vec3 vWorld;
      float crown(vec2 p) {
        vec2 c = p - vec2(0.5, 0.62);
        float r = length(c * vec2(1.0, 1.25));
        float body = 0.42 + 0.12 * bwNoise(vec3(c * 3.0, vSeed)) - r;
        float sprays = bwFbm3(vec3(p * 9.0, vSeed + 1.0)) * 0.16 + bwNoise(vec3(p * 30.0, vSeed + 2.0)) * 0.05;
        return body + sprays;
      }
      void main() {
        vec2 p = vUv;
        p.x += sin(uTime * 0.2 + vSeed) * 0.004 * p.y;
        float d = crown(p);
        // Trunk and two main limbs into the crown.
        float trunk = 0.022 + 0.01 * (1.0 - p.y);
        float t0 = abs(p.x - 0.5 - 0.03 * sin(p.y * 6.0 + vSeed)) - trunk;
        float limbL = abs(p.x - 0.5 + (p.y - 0.3) * 0.5) - 0.012;
        float limbR = abs(p.x - 0.5 - (p.y - 0.34) * 0.45) - 0.01;
        float wood = min(t0, min(limbL * step(0.3, p.y), limbR * step(0.34, p.y)));
        float woodMask = step(wood, 0.0) * step(p.y, 0.62);
        // Holes in the crown let the sky through.
        float holes = smoothstep(0.55, 0.75, bwNoise(vec3(p * 14.0, vSeed + 5.0))) * smoothstep(0.02, 0.12, d);
        if (d < 0.0 && woodMask < 0.5) discard;
        if (holes > 0.5 && woodMask < 0.5) discard;
        // Moonlit edge: the crown's gradient points toward the moon side.
        vec2 e = vec2(0.006, 0.0);
        vec2 grad = vec2(crown(p + e.xy) - crown(p - e.xy), crown(p + e.yx) - crown(p - e.yx));
        vec2 moon2 = normalize(vec2(uMoon.x, uMoon.y));
        float edge = smoothstep(0.08, 0.0, d) * clamp(dot(normalize(-grad + 1e-5), moon2), 0.0, 1.0);
        float sprayLight = smoothstep(0.1, 0.6, bwNoise(vec3(p * 22.0, vSeed + 3.0)));
        vec3 color = vec3(0.012, 0.017, 0.02) + vec3(0.11, 0.14, 0.2) * edge * (0.4 + 0.6 * sprayLight);
        float dist = length(vWorld - cameraPosition);
        color = mix(color, vec3(0.03, 0.045, 0.08), 1.0 - exp(-dist * 0.025));
        gl_FragColor = vec4(color, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const treeMesh = new THREE.Mesh(mergeGeometries(treeCards, false)!, treeMaterial); treeMesh.name = 'sleep-garden-trees';
  scene.add(treeMesh);
  treeCards.forEach(g => g.dispose());
  // Low hills beyond the garden.
  const hills = new THREE.PlaneGeometry(160, 30, 160, 4);
  const hp = hills.attributes.position;
  for (let i = 0; i < hp.count; i++) { const x = hp.getX(i); if (hp.getY(i) > 0) hp.setY(i, 3 + 3.2 * (0.5 + fbm3(x * 0.02, 0, 3, 4)) + 1.2 * Math.sin(x * 0.05)); else hp.setY(i, -8); }
  hills.computeVertexNormals();
  const hillMesh = new THREE.Mesh(hills, land(0)); hillMesh.position.set(0, 0, -48); scene.add(hillMesh);

  // --- Curtains: deep pleats, real hems, faint moon glow through the linen ---------
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 4.1, 16), brass); rod.rotation.z = Math.PI / 2; rod.position.set(0.2, 4.02, WIN.z + 0.5); rod.castShadow = true; scene.add(rod);
  for (const x of [-1.86, 2.26]) { const finial = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 12), brass); finial.position.set(x, 4.02, WIN.z + 0.5); scene.add(finial); }
  const curtainState: { mesh: THREE.Mesh; base: Float32Array; side: number }[] = [];
  const curtainGlow = { value: 0.0 };
  const curtainMaterial = curtainLinen;
  const previous = curtainMaterial.onBeforeCompile;
  curtainMaterial.onBeforeCompile = (shader, renderer) => {
    previous.call(curtainMaterial, shader, renderer);
    shader.uniforms.uCurtainGlow = curtainGlow;
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uCurtainGlow;')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
// Moonlight transmitted through the weave, stronger in the thin pleat valleys.
totalEmissiveRadiance += vec3(0.42, 0.5, 0.72) * uCurtainGlow * (0.6 + 0.4 * (1.0 - fbH)) * smoothstep(${(WIN.y0 - 0.2).toFixed(2)}, ${(WIN.y0 + 0.4).toFixed(2)}, vSurfaceWorld.y) * (1.0 - smoothstep(${(WIN.y1 - 0.2).toFixed(2)}, ${(WIN.y1 + 0.3).toFixed(2)}, vSurfaceWorld.y));`);
  };
  for (const side of [-1, 1]) {
    const width = side < 0 ? 1.2 : 1.02;
    const geo = new THREE.PlaneGeometry(width, 3.4, 72, 48);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i); const down = (1.7 - y) / 3.4;
      const pleat = Math.sin(x * 26 + Math.sin(x * 5.6) * 0.7) * (0.04 + down * 0.035) + Math.sin(x * 9.3 + 0.5) * down * 0.025;
      p.setXYZ(i, x + side * Math.sin(down * Math.PI) * 0.05, y + (Math.cos(x * 13) - 1) * 0.02 * down, pleat);
    }
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, curtainMaterial);
    mesh.position.set(side < 0 ? -1.08 : 1.52, 2.27, WIN.z + 0.45); mesh.castShadow = true; mesh.receiveShadow = true; mesh.userData.cozyAction = 'curtain';
    scene.add(mesh);
    curtainState.push({ mesh, base: new Float32Array(p.array), side });
    for (let j = 0; j < 9; j++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.032, 0.005, 6, 16), brass);
      ring.rotation.y = Math.PI / 2; ring.position.set(mesh.position.x - width * 0.45 + j * width * 0.1125, 3.99, WIN.z + 0.5); ring.userData.dynamic = true; scene.add(ring);
    }
  }

  // --- Bed: walnut frame, mattress, quilted duvet, folded sheet ---------------------
  add(place(stoneBlock(2.5, 0.26, 4.85, 31, 0.04, 0.03, 0, 0.12), -0.12, 0.35, 1.82), walnut);
  add(place(stoneBlock(2.5, 0.6, 0.07, 32, 0.04, 0.02, 0, 0.06), -0.12, 0.42, -0.6), walnut).name = 'sleep-footboard';
  for (const x of [-1.33, 1.09]) for (const z of [-0.55, 4.2]) add(place(stoneBlock(0.1, 0.36, 0.1, 33 + x + z, 0.03, 0.01), x, 0.18, z), walnutY);
  add(place(cushion(2.34, 0.26, 4.7, 0.18, 40, 3), -0.12, 0.6, 1.86), sheet);
  const quiltHeight = (x: number, z: number) => {
    const edge = Math.max(0, (Math.abs(x) - 1.02) / 0.34);
    const knee = Math.exp(-((x + 0.22) ** 2 / 0.56 + (z - 0.42) ** 2 / 0.5)) * 0.3;
    const feet = Math.exp(-((x + 0.1) ** 2 / 0.4 + (z + 1.4) ** 2 / 0.3)) * 0.12;
    const turn = Math.exp(-((z - 1.57) ** 2) / 0.045) * 0.09;
    // Quilting channels: the stitched lines pull the down in, the bays puff out.
    const channel = Math.pow(Math.abs(Math.sin((x + 1.3) * Math.PI / 0.46)), 0.6) * 0.022;
    return 0.74 + knee + feet + turn + channel - edge * edge * 0.36 + Math.sin(z * 8.2 + x * 1.9) * 0.018 + noise3(x * 2, z * 2, 5) * 0.025;
  };
  const duvet = clothSheet(110, 140, (u, v, target) => {
    const x = (u - 0.5) * 2.71, z = 2.24 - v * 4.67;
    const over = Math.max(0, Math.abs(x) - 1.18);
    target.set(x - Math.sign(x) * over * 0.3, quiltHeight(Math.min(Math.abs(x), 1.18) * Math.sign(x), z) - over * 1.6, z + 1.63);
  }, 0.03, [2.71, 4.67]);
  const duvetMesh = add(duvet, linen); duvetMesh.name = 'sleep-duvet';
  const fold = clothSheet(80, 14, (u, v, target) => {
    const x = (u - 0.5) * 2.36, z = 0.22 - v * 0.44;
    target.set(x, 0.79 + Math.sin((z + 0.22) / 0.44 * Math.PI) * 0.095 + Math.sin(x * 9) * 0.012 - Math.max(0, Math.abs(x) - 1.05) * 1.15, z + 3.24);
  }, 0.012, [2.36, 0.44]);
  add(fold, sheet);

  // --- Bedside: walnut cabinet, ceramic lamp, book, a glass of water ----------------
  const bedside = new THREE.Group(); bedside.userData.dynamic = true; scene.add(bedside);
  destination = bedside;
  add(place(stoneBlock(0.84, 0.66, 0.72, 41, 0.03, 0.02), 1.66, 0.4, -1.0), walnut);
  add(place(stoneBlock(0.92, 0.05, 0.8, 42, 0.03, 0.012), 1.66, 0.755, -1.0), walnut);
  for (const y of [0.25, 0.55]) {
    add(place(stoneBlock(0.74, 0.25, 0.03, 43 + y, 0.02, 0.008), 1.66, y, -0.625), walnut);
    const knob = add(place(new THREE.CylinderGeometry(0.022, 0.016, 0.03, 16), 1.66, y + 0.03, -0.6, Math.PI / 2), brass); knob.castShadow = false;
  }
  const lampBase = add(new THREE.LatheGeometry([[0, 0], [0.12, 0], [0.14, 0.03], [0.15, 0.1], [0.12, 0.2], [0.14, 0.3], [0.1, 0.36], [0.05, 0.39], [0.04, 0.41], [0, 0.41]].map(([r, h]) => new THREE.Vector2(r, h)), 48), lampGlaze);
  lampBase.position.set(1.63, 0.78, -0.96);
  lampBase.userData.cozyAction = 'lamp';
  add(place(new THREE.CylinderGeometry(0.012, 0.012, 0.22, 10), 1.63, 1.3, -0.96), brass);
  const shadeGeometry = new THREE.CylinderGeometry(0.21, 0.34, 0.42, 96, 8, true);
  const sp = shadeGeometry.attributes.position;
  for (let i = 0; i < sp.count; i++) { const a = Math.atan2(sp.getZ(i), sp.getX(i)); const pleat = 1 + Math.cos(a * 30) * 0.012; sp.setX(i, sp.getX(i) * pleat); sp.setZ(i, sp.getZ(i) * pleat); }
  shadeGeometry.computeVertexNormals();
  const shade = new THREE.Mesh(shadeGeometry, shadeLinen); shade.position.set(1.63, 1.5, -0.96); shade.userData.cozyAction = 'lamp'; shade.castShadow = false; bedside.add(shade);
  const lampDown = new THREE.SpotLight('#ffc78a', 5, 0, 1.15, 0.8, 2);
  lampDown.position.set(1.63, 1.42, -0.96); lampDown.target.position.set(1.4, 0, -0.5);
  lampDown.castShadow = true; lampDown.shadow.mapSize.set(1024, 1024); lampDown.shadow.radius = 4; lampDown.shadow.bias = -0.0008; lampDown.shadow.normalBias = 0.015;
  lampDown.shadow.camera.near = 0.1; lampDown.shadow.camera.far = 6; lampDown.shadow.autoUpdate = false; lampDown.shadow.needsUpdate = true;
  bedside.add(lampDown, lampDown.target);
  const lampGlow = new THREE.PointLight('#ffb978', 3.2, 0, 2); lampGlow.position.set(1.63, 1.52, -0.96); bedside.add(lampGlow);
  add(place(stoneBlock(0.25, 0.03, 0.34, 51, 0.01, 0.006), 1.41, 0.795, -0.8, 0, 0.1), bookCloth);
  add(place(new THREE.BoxGeometry(0.235, 0.022, 0.325), 1.415, 0.795, -0.797, 0, 0.1), paper);
  add(place(new THREE.LatheGeometry([[0.05, 0], [0.058, 0.004], [0.062, 0.16], [0.057, 0.16], [0.053, 0.008], [0, 0.006]].map(([r, h]) => new THREE.Vector2(r, h)), 32), 1.92, 0.78, -0.77), drinkGlass, false);
  const water = add(place(new THREE.CircleGeometry(0.052, 32), 1.92, 0.89, -0.77, -Math.PI / 2), new THREE.MeshPhysicalMaterial({ color: '#90aab4', roughness: 0.04, transparent: true, opacity: 0.35, depthWrite: false }), false);
  water.renderOrder = 3;
  destination = scene;

  // --- Rug, framed print -------------------------------------------------------------
  add(clothSheet(60, 60, (u, v, target) => target.set(-1.75 + u * 3.25, 0.012 + Math.max(0, noise3(u * 4, 1, v * 4)) * 0.008, 0.6 - v * 3.0), 0.014, [3.25, 3.0]), rugWool, false);
  add(place(stoneBlock(0.72, 0.92, 0.04, 61, 0.02, 0.008), -2.32, 2.57, WIN.z + 0.14), walnut);
  const printMaterial = patchSurface(new THREE.MeshStandardMaterial({ color: '#c9c3b0', roughness: 0.95 }), {
    key: 'sleep-print',
    color: `
vec2 pp = (vSurfaceWorld.xy - vec2(-2.32, 2.57)) / vec2(0.32, 0.42);
// A quiet botanical line study: one stem and leaves, ink pooled at the strokes.
float stem = abs(pp.x + 0.12 * sin(pp.y * 2.2) + 0.05);
float ink = smoothstep(0.03, 0.0, stem) * step(-0.75, pp.y) * step(pp.y, 0.7);
for (int i = 0; i < 5; i++) {
  float fy = -0.5 + float(i) * 0.26; float s = mod(float(i), 2.0) < 0.5 ? 1.0 : -1.0;
  vec2 q = pp - vec2(-0.05 + 0.12 * sin(fy * 2.2) * -1.0, fy);
  q = mat2(0.8, -0.6 * s, 0.6 * s, 0.8) * q;
  float leaf = length(q * vec2(1.0, 2.6) - vec2(0.18 * s, 0.0)) - 0.16;
  ink = max(ink, smoothstep(0.02, 0.0, abs(leaf)) * 0.9);
}
diffuseColor.rgb = mix(diffuseColor.rgb * (0.95 + 0.05 * bwNoise(vSurfaceWorld * 80.0)), vec3(0.2, 0.25, 0.23), ink * 0.85);`,
  });
  add(place(new THREE.PlaneGeometry(0.64, 0.84), -2.32, 2.57, WIN.z + 0.165), printMaterial, false);

  batchStatic(scene);

  let lampBright = true, lampLevel = 1, curtainOpen = false, curtainGap = 0, currentTime = 0;
  let probe: THREE.WebGLRenderTarget | null = null;
  let volumeUniforms: Record<string, THREE.IUniform> | null = null;
  const gapRange = () => {
    // Open span of the window between the curtain edges, in window coordinates [-1, 1].
    const cx = (WIN.x0 + WIN.x1) / 2, half = (WIN.x1 - WIN.x0) / 2;
    const left = -1.08 + 0.6 - curtainGap * 0.6, right = 1.52 - 0.51 + curtainGap * 0.6;
    return [(left - cx) / half, (right - cx) / half];
  };
  const resize = (aspect: number) => {
    camera.aspect = aspect;
    bedside.position.set(aspect < 0.82 ? -1.04 : 0, 0, aspect < 0.82 ? -0.7 : 0);
    if (aspect < 0.82) { camera.fov = 52; camera.position.set(0.15, 1.30, 2.34); camera.lookAt(0.25, 1.78, -3.45); }
    else if (aspect < 1.32) { camera.fov = 48; camera.position.set(-0.15, 1.31, 2.66); camera.lookAt(0.12, 1.62, -3.32); }
    else { camera.fov = 45; camera.position.set(-0.22, 1.29, 2.9); camera.lookAt(0.06, 1.55, -3.1); }
    camera.updateProjectionMatrix();
    lampDown.shadow.needsUpdate = true; moon.shadow.needsUpdate = true;
  };
  resize(16 / 9);
  return {
    scene, camera, resize,
    post: {
      exposure: 1.8, bloomStrength: 0.075, bloomThreshold: 0, aoStrength: 0.9, aoRadius: 0.4,
      saturation: 0.98, contrast: 1.07, shadowTint: [0.86, 0.94, 1.12], highlightTint: [1.05, 1.0, 0.94], vignette: 0.5, grain: 0.03,
    },
    createVolume() {
      const [min, max] = gapRange();
      const effect = createRoomVolume({
        haze: 0.032, dust: 0.65, anisotropy: 0.5, maxDistance: 9,
        beam: { centre: new THREE.Vector3((WIN.x0 + WIN.x1) / 2, (WIN.y0 + WIN.y1) / 2, WIN.z), right: new THREE.Vector3((WIN.x1 - WIN.x0) / 2, 0, 0), up: new THREE.Vector3(0, (WIN.y1 - WIN.y0) / 2, 0), direction: MOON_DIR.clone(), color: new THREE.Color(0.24, 0.29, 0.43), gap: { min, max, transmit: 0.03 } },
        ambient: new THREE.Color(0.002, 0.003, 0.005),
      });
      volumeUniforms = effect.uniforms;
      return effect;
    },
    prepare(renderer) {
      probe = captureRoomProbe(renderer, scene, new THREE.Vector3(0, 1.5, 0.5), 0.9, { hide: [pane] });
    },
    update(time, dt) {
      currentTime = time; timeUniform.value = time;
      const ease = dt > 0 ? 1 - Math.exp(-dt * 3.2) : 1;
      lampLevel += ((lampBright ? 1 : 0.3) - lampLevel) * ease;
      lampDown.intensity = 5 * lampLevel; lampGlow.intensity = 3.2 * lampLevel;
      shadeLinen.emissiveIntensity = 0.12 + lampLevel * 0.95;
      const previousGap = curtainGap;
      curtainGap += ((curtainOpen ? 0.27 : 0) - curtainGap) * ease;
      curtainGlow.value = 0.12;
      for (const item of curtainState) {
        const p = item.mesh.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
          const x = item.base[i * 3], y = item.base[i * 3 + 1], z = item.base[i * 3 + 2];
          const down = Math.max(0, (1.7 - y) / 3.4);
          p.setXYZ(i, x + item.side * curtainGap * (0.2 + down * 0.8), y, z + Math.sin(currentTime * 0.37 + x * 2.3 + item.side) * 0.02 * down * down);
        }
        p.needsUpdate = true; item.mesh.geometry.computeVertexNormals();
      }
      if (Math.abs(curtainGap - previousGap) > 1e-4) moon.shadow.needsUpdate = true;
      if (volumeUniforms) { const [min, max] = gapRange(); volumeUniforms.uGap.value.set(min, max, 0.05); }
    },
    interact(action) {
      if (action === 'lamp') { lampBright = !lampBright; return { type: 'lamp', intensity: 0.16 }; }
      if (action === 'curtain') { curtainOpen = !curtainOpen; return { type: 'curtain', intensity: 0.2 }; }
      return null;
    },
    dispose() { probe?.dispose(); probe = null; },
  };
}
