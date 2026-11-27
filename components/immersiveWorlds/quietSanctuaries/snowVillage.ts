import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { SanctuaryBuilder } from './worldTypes';
import { createNoiseVolume } from '../shared/render/fireFlame';
import { fbm3, noise3, seeded } from '../shared/render/noise';
import { createRockMaterial } from '../shared/render/rockSurface';
import { bakeNightEnvironment, createNightSky } from '../shared/render/skyNight';
import { applySnowCover, createSnowMaterial } from '../shared/render/snowSurface';
import { createSnowfall } from '../shared/render/snowFall';
import { coniferGeometry, createFoliageMaterial, createTerrainMaterial, distantSpruceGeometry, needleSprayTexture, ridgeGeometry } from '../nightFires/landscape';
import { createSnowNightVolume } from './atmosphere';
import { createPlasterMaterial, createWoodMaterial, GLSL_VILLAGE_GROUND, interiorTexture } from './villageMaterials';

/*
 * 눈 내리는 밤 — an original, code-only winter village seen from under a porch eave.
 * A low moon to the front-left is the cold key; warm HDR windows pool light on
 * the snow; two lane lamps and the porch lantern glow in the snowy air. Snow
 * glints, scatters blue in shade, and settles on every upward face. Snow falls
 * at three depths on the GPU; chimney smoke drifts slowly over the roofs; the
 * far forest and ridges fade into moonlit haze. No external assets.
 */

const v3 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const direction = (azimuthDegrees: number, elevationDegrees: number) => {
  const a = THREE.MathUtils.degToRad(azimuthDegrees), e = THREE.MathUtils.degToRad(elevationDegrees);
  return v3(Math.sin(a) * Math.cos(e), Math.sin(e), -Math.cos(a) * Math.cos(e));
};

export const laneCenter = (z: number) => Math.sin((-z + 2) * 0.115) * 1.6 + Math.sin(z * 0.037) * 0.4;
/** Matches GLSL_VILLAGE_GROUND, so shaders know the snow surface height. */
export const groundHeight = (x: number, z: number) => {
  const dist = Math.abs(x - laneCenter(z));
  const banks = THREE.MathUtils.smoothstep(dist, 1.6, 4.5);
  return -0.17 + banks * (0.31 + Math.sin(z * 0.6 + x) * 0.07) + Math.sin(x * 0.83 + z * 0.39) * 0.024 + Math.cos(z * 0.73) * 0.025;
};

/** The settled snow surface: the lane and banks plus wind-shaped drifts away from the trodden lane. */
const terrain = (x: number, z: number) => {
  const drift = fbm3(x * .21, z * .21, 1.3, 4) * .09 + fbm3(x * .9, z * .9, 4.4, 2) * .02;
  return groundHeight(x, z) + drift * THREE.MathUtils.smoothstep(Math.abs(x - laneCenter(z)), .4, 2.2);
};

export const buildSnowVillage: SanctuaryBuilder = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0d1726');
  // Direct (non-HDR) fallback keeps a simple fog; the volume pass replaces it.
  const fallbackFog = new THREE.FogExp2('#2c3c52', 0.016);
  scene.fog = fallbackFog;
  const camera = new THREE.PerspectiveCamera(51, 1, 0.08, 700);
  const random = seeded(10973);
  const noise = createNoiseVolume(48, 31);

  // ---------------------------------------------------------------- sky & light
  const moonDir = direction(-58, 31);
  const sky = createNightSky({
    noise, zenith: '#0b1529', horizon: '#4a5a72', brightness: 0.12,
    glow: { color: '#6a7a92', direction: moonDir, intensity: 0.05, width: 1.6, height: 0.35 },
    airglow: 0.0,
    moon: { direction: moonDir, intensity: 22, radius: 0.014, halo: 2.0, color: '#f4f1ea' },
    stars: { count: 2600, seed: 4411, intensity: 0.55, galacticFraction: 0.2 },
  });
  scene.add(sky.group);
  // One cold, motivated key. Shadows are static and rendered once.
  const moon = new THREE.DirectionalLight('#b0c6ec', 1.25);
  moon.position.copy(moonDir).multiplyScalar(70).add(v3(0, 0, -14));
  moon.target.position.set(0, 0, -14);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  Object.assign(moon.shadow.camera, { left: -26, right: 26, top: 22, bottom: -22, near: 1, far: 160 });
  moon.shadow.bias = -0.0004; moon.shadow.normalBias = 0.06; moon.shadow.radius = 3;
  scene.add(moon, moon.target);

  // ---------------------------------------------------------------- materials
  const laneTrodden = `(1.0 - smoothstep(.55, 1.25, abs(p.x - villageLane(p.z)))) * .55 + exp(-pow((abs(p.x - villageLane(p.z)) - .5) / .11, 2.0)) * .45 * smoothstep(-60.0, -6.0, p.z)`;
  const groundSnow = createSnowMaterial({ key: 'village-ground', trodden: laneTrodden, sparkle: 30, ripple: 1, sparkleDensity: .12 });
  const capSnow = createSnowMaterial({ key: 'village-cap', sparkle: 22, ripple: .45, sparkleDensity: .12 });
  const railSnowMaterial = createSnowMaterial({ key: 'village-rail', sparkle: 34, ripple: .35, sparkleScale: 240, sparkleDensity: .16 });
  // Windows pool warm light on the ground snow (analytic, no extra light loops).
  const spillPos = Array.from({ length: 8 }, () => v3(0, -100, 0));
  const spillDir = Array.from({ length: 8 }, () => v3(0, 0, 1));
  const spillColor = Array.from({ length: 8 }, () => v3(0, 0, 0));
  let spillCount = 0;
  {
    const previous = groundSnow.onBeforeCompile;
    groundSnow.onBeforeCompile = (shader, renderer) => {
      previous.call(groundSnow, shader, renderer);
      shader.uniforms.uSpillPos = { value: spillPos };
      shader.uniforms.uSpillDir = { value: spillDir };
      shader.uniforms.uSpillColor = { value: spillColor };
      shader.fragmentShader = shader.fragmentShader
        .replace('void main() {', `${GLSL_VILLAGE_GROUND}\nuniform vec3 uSpillPos[8]; uniform vec3 uSpillDir[8]; uniform vec3 uSpillColor[8];\nvoid main() {`)
        .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
{
  vec3 n = normalize(inverseTransformDirection(normal, viewMatrix));
  vec3 spill = vec3(0.0);
  for (int i = 0; i < 8; i++) {
    vec3 d = uSpillPos[i] - vTranslucentWorld;
    float d2 = dot(d, d);
    vec3 l = d * inversesqrt(d2);
    float facing = max(dot(-l, uSpillDir[i]) * .8 + .2, 0.0);
    spill += uSpillColor[i] * facing * max(dot(n, l), 0.0) / (d2 + .35);
  }
  reflectedLight.directDiffuse += spill * BRDF_Lambert(material.diffuseContribution);
}`);
    };
  }
  const covered = <T extends THREE.MeshStandardMaterial>(material: T, key: string, threshold = .6, amount = 1) => applySnowCover(material, { key, threshold, amount });
  const timber = covered(createWoodMaterial('#7d6a57', { key: 'timber', weathered: .5 }), 'timber');
  const darkWood = covered(createWoodMaterial('#4f4138', { key: 'dark-wood', weathered: .35 }), 'dark-wood');
  const railWood = covered(createWoodMaterial('#8b6c52', { key: 'rail-wood', weathered: .3, bump: 1.3 }), 'rail-wood', .7, .85);
  const porchWood = createWoodMaterial('#6d5644', { key: 'porch-wood', weathered: .2, bump: 1.2 });
  const plasterWarm = createPlasterMaterial('#e3d5bc', { key: 'plaster-warm' });
  const plasterCool = createPlasterMaterial('#d4cec2', { key: 'plaster-cool', grime: '#545650' });
  const stone = covered(createRockMaterial('#7b766e', { key: 'village-stone', scale: 2.2, bump: .9, drips: .1, stainAmount: .2, strata: .1 }), 'village-stone', .55);
  const slate = covered(new THREE.MeshStandardMaterial({ color: '#3c434c', roughness: .62 }), 'slate', .5);
  const brass = new THREE.MeshStandardMaterial({ color: '#b08448', metalness: 1, roughness: .32 });
  const iron = covered(new THREE.MeshStandardMaterial({ color: '#23272b', metalness: .65, roughness: .5 }), 'iron', .6);
  const ice = new THREE.MeshStandardMaterial({ color: '#d4e6f6', roughness: .06, metalness: 0, envMapIntensity: 1.6 });
  const glassPane = new THREE.MeshStandardMaterial({ color: '#9fb4c4', transparent: true, opacity: .14, roughness: .04, metalness: .1, depthWrite: false });
  const darkGlass = new THREE.MeshStandardMaterial({ color: '#141c26', roughness: .08, metalness: .2 });
  const interiors = [interiorTexture(11), interiorTexture(23), interiorTexture(37)];
  // Lit interiors share a few materials (three rooms × three brightness steps) so they batch.
  const windowMaterials = new Map<string, THREE.MeshBasicMaterial>();
  const windowLit = (k: number, strength: number) => {
    const level = Math.round(strength * 2) / 2;
    const key = `${k % 3}:${level}`;
    let material = windowMaterials.get(key);
    if (!material) { material = new THREE.MeshBasicMaterial({ map: interiors[k % 3], color: new THREE.Color(1, .9, .8).multiplyScalar(level) }); windowMaterials.set(key, material); }
    return material;
  };
  const lampGlass = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, .72, .4).multiplyScalar(9) });
  const flameMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, .62, .28).multiplyScalar(26) });

  const staticRoot = new THREE.Group();
  scene.add(staticRoot);
  const mesh = (geo: THREE.BufferGeometry, mat: THREE.Material, parent: THREE.Object3D = staticRoot) => {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = true; m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  const box = (x: number, y: number, z: number, w: number, h: number, d: number, mat: THREE.Material, parent: THREE.Object3D = staticRoot) => {
    const m = mesh(new THREE.BoxGeometry(w, h, d), mat, parent);
    m.position.set(x, y, z); return m;
  };
  const beam = (a: THREE.Vector3, b: THREE.Vector3, radius: number, mat: THREE.Material, parent: THREE.Object3D = staticRoot, sides = 8) => {
    const m = mesh(new THREE.CylinderGeometry(radius * 0.9, radius, a.distanceTo(b), sides), mat, parent);
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(v3(0, 1, 0), b.clone().sub(a).normalize());
    return m;
  };
  /** A soft, lumpy snow cap lying on top of a box-shaped support. */
  const snowCap = (x: number, y: number, z: number, w: number, d: number, h: number, parent: THREE.Object3D = staticRoot, rotation = 0) => {
    const geo = new RoundedBoxGeometry(w, h, d, 3, Math.min(h, w, d) * .45);
    const pos = geo.getAttribute('position');
    const seed = random() * 50;
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i), py = pos.getY(i), pz = pos.getZ(i);
      const top = Math.max(0, py / (h * .5));
      pos.setY(i, py + top * noise3(px * 3 + seed, pz * 3, seed) * h * .35 + (py < 0 ? 0 : h * .08));
    }
    geo.computeVertexNormals();
    const cap = mesh(geo, capSnow, parent); cap.position.set(x, y + h * .5, z); cap.rotation.y = rotation;
    return cap;
  };

  // ---------------------------------------------------------------- ground & distance
  {
    const columns = 170, rows = 210;
    const positions: number[] = [], indices: number[] = [];
    for (let j = 0; j <= rows; j++) {
      const t = j / rows;
      const z = 4 - 104 * Math.pow(t, 1.55);
      for (let i = 0; i <= columns; i++) {
        const s = i / columns * 2 - 1;
        const x = Math.sign(s) * 50 * Math.pow(Math.abs(s), 1.45);
        positions.push(x, terrain(x, z), z);
        if (i < columns && j < rows) { const a = j * (columns + 1) + i; indices.push(a, a + 1, a + columns + 1, a + 1, a + columns + 2, a + columns + 1); }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices); geometry.computeVertexNormals();
    const ground = new THREE.Mesh(geometry, groundSnow); ground.receiveShadow = true; ground.name = 'Snow lane and banks';
    scene.add(ground);
  }
  // Rolling snowy rises close behind the village, then two forested ranges fading into haze.
  const hillHeight = (x: number, z: number) => Math.max(0, (-z - 43) / 37) * (6 + Math.sin(x * 0.066) * 3.4 + Math.sin(x * 0.135) * 1.7) + fbm3(x * .05, z * .05, 7, 3) * 1.2 * Math.max(0, (-z - 46) / 30);
  {
    const hill = new THREE.PlaneGeometry(170, 70, 120, 50);
    hill.rotateX(-Math.PI / 2); hill.translate(0, 0, -80);
    const hp = hill.getAttribute('position');
    for (let i = 0; i < hp.count; i++) hp.setY(i, hillHeight(hp.getX(i), hp.getZ(i)) - .2);
    hill.computeVertexNormals();
    const hills = new THREE.Mesh(hill, groundSnow); hills.receiveShadow = true; scene.add(hills);
  }
  const ranges = [
    ridgeGeometry({ z: -175, width: 460, depth: 70, base: -2, peaks: [[-120, 24, 70], [-30, 18, 55], [60, 28, 80], [150, 22, 60]], seed: 7, relief: .4, crest: .5, segments: [240, 40] }),
    ridgeGeometry({ z: -290, width: 640, depth: 90, base: -4, peaks: [[-170, 52, 90], [-40, 66, 110], [110, 48, 90], [220, 58, 100]], seed: 13, relief: .45, crest: .45, segments: [240, 40] }),
  ];
  const rangeMaterial = createTerrainMaterial({ key: 'snow-village-ranges', rock: '#4a5260', forest: '#1d2a2e', snow: '#d2dbe6', treeLine: 18, snowLine: 8, bump: 1.2 });
  for (const geometry of ranges) { const range = new THREE.Mesh(geometry, rangeMaterial); range.receiveShadow = true; scene.add(range); }
  // A dark forest band on the rises: instanced spruce silhouettes with snow on their tiers.
  {
    const geometry = distantSpruceGeometry(9);
    const material = applySnowCover(new THREE.MeshStandardMaterial({ color: '#1e2c2b', roughness: .9 }), { key: 'distant-spruce', threshold: .35, amount: .9, scale: 9 });
    const count = 520;
    const forest = new THREE.InstancedMesh(geometry, material, count);
    const matrix = new THREE.Matrix4(), q = new THREE.Quaternion(), scale = new THREE.Vector3();
    let placed = 0;
    for (let i = 0; i < count * 3 && placed < count; i++) {
      const x = (random() - .5) * 150, z = -50 - random() * 34;
      const density = fbm3(x * .04, z * .04, 2.2, 3);
      if (density < -.08 || Math.abs(x) < 8 && z > -56) continue;
      const h = 5 + random() * 6;
      q.setFromAxisAngle(v3(0, 1, 0), random() * Math.PI * 2);
      scale.set(h * (.8 + random() * .3), h, h * (.8 + random() * .3));
      matrix.compose(v3(x, hillHeight(x, z) - .3, z), q, scale);
      forest.setMatrixAt(placed++, matrix);
    }
    forest.count = placed;
    forest.instanceMatrix.needsUpdate = true;
    forest.receiveShadow = true; forest.castShadow = false;
    scene.add(forest);
  }

  // ---------------------------------------------------------------- houses
  const roofHalf = (width: number, depth: number, wall: number, pitch: number, side: number, mat: THREE.Material, extra: number, parent: THREE.Group) => {
    const cols = 16, rows = 26;
    const points: number[] = [], uv: number[] = [], ix: number[] = [];
    const seed = random() * 40;
    for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++) {
      const u = c / cols, v = r / rows;
      const x = side * (u * (width / 2 + 0.3));
      const z = (v - 0.5) * (depth + 0.7);
      const y = wall + pitch * (1 - u) + extra +
        (extra > 0 ? noise3(u * 3 + seed, v * 6 + side, seed) * 0.07 + fbm3(u * 9, v * 12 + seed, 2, 2) * .025 + Math.pow(u, 3) * 0.05 : 0);
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
    if (extra > 0) {
      // A rounded overhang of real snow at the eave, sagging a little between rafters.
      const lip = mesh(new RoundedBoxGeometry(0.36, 0.32, depth + 0.85, 5, 0.13), mat, parent);
      lip.position.set(side * (width / 2 + 0.3), wall + extra - 0.05, 0);
      lip.rotation.z = side * -0.08;
      const lp = lip.geometry.getAttribute('position');
      for (let i = 0; i < lp.count; i++) lp.setY(i, lp.getY(i) + noise3(lp.getZ(i) * 1.8 + seed, side + 3, seed) * 0.05 - Math.max(0, -lp.getY(i)) * .4 * (.5 + .5 * Math.sin(lp.getZ(i) * 3 + seed)));
      lip.geometry.computeVertexNormals();
    }
  };
  const triangularGable = (w: number, y: number, rise: number, z: number, mat: THREE.Material, parent: THREE.Group) => {
    const shape = new THREE.Shape(); shape.moveTo(-w / 2, y); shape.lineTo(w / 2, y); shape.lineTo(0, y + rise); shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.13, bevelEnabled: false });
    const m = mesh(geo, mat, parent); m.position.z = z; return m;
  };
  const snowDrift = (x: number, z: number, w: number, d: number, h: number) => {
    const positions: number[] = [], indices: number[] = [];
    const rings = 7, segments = 28, phase = random() * 7;
    for (let r = 0; r <= rings; r++) for (let a = 0; a <= segments; a++) {
      const t = r / rings, angle = a / segments * Math.PI * 2;
      const irregular = 1 + Math.sin(angle * 3 + phase) * 0.1 + Math.cos(angle * 5 + phase) * 0.045;
      const px = x + Math.cos(angle) * w * 0.5 * t * irregular;
      const pz = z + Math.sin(angle) * d * 0.5 * t * irregular;
      positions.push(px, terrain(px, pz) + Math.pow(Math.max(0, 1 - t * t), 1.6) * h * (1 + noise3(px * 2, pz * 2, phase) * .25) - 0.06 * t * t, pz);
      if (r < rings && a < segments) { const k = r * (segments + 1) + a; indices.push(k, k + 1, k + segments + 1, k + 1, k + segments + 2, k + segments + 1); }
    }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices); geometry.computeVertexNormals(); mesh(geometry, groundSnow);
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
    const wallMesh = mesh(geometry, mat, parent); wallMesh.position.z = z - 0.31; return wallMesh;
  };
  let windowSeed = 0;
  const addWindow = (parent: THREE.Group, x: number, y: number, z: number, w: number, h: number, on: number, side = false) => {
    const win = new THREE.Group(); win.position.set(x, y, z); if (side) win.rotation.y = -Math.PI / 2; parent.add(win);
    // The interior glows at HDR strength; a faint glass pane reflects the sky in front of it.
    const interior = on > 0.22 ? windowLit(windowSeed++, on > 0.65 ? 5.2 * on : 2.2 * on) : darkGlass;
    box(0, 0, -0.3, w + 0.02, h + 0.02, 0.02, interior, win);
    for (const sideX of [-1, 1]) box(sideX * (w / 2 + 0.023), 0, -0.105, 0.076, h + 0.16, 0.24, stone, win);
    box(0, h / 2 + 0.041, -0.105, w + 0.11, 0.081, 0.24, stone, win);
    for (const sideX of [-1, 1]) box(sideX * (w / 2 - 0.035), 0, -0.212, 0.052, h - 0.01, 0.095, timber, win);
    for (const sideY of [-1, 1]) box(0, sideY * (h / 2 - 0.03), -0.212, w, 0.052, 0.095, timber, win);
    box(0, 0, -0.193, 0.035, h - 0.02, 0.092, darkWood, win);
    box(0, h * 0.03, -0.191, w - 0.04, 0.028, 0.092, darkWood, win);
    box(0, 0, -0.235, w - 0.06, h - 0.06, 0.005, glassPane, win);
    const sill = mesh(new RoundedBoxGeometry(w + 0.29, 0.12, 0.42, 2, 0.018), stone, win); sill.position.set(0, -h / 2 - 0.064, -0.02);
    snowCap(-0.01, -h / 2 - 0.005, 0.06, w + 0.22, 0.26, 0.075, win);
    if (random() > 0.35) {
      const shutter = new THREE.Group(); shutter.position.set(w / 2 + 0.11, 0, 0.035); shutter.rotation.y = -0.24; win.add(shutter);
      for (let i = 0; i < 3; i++) box(0.042 + i * 0.064, 0, 0, 0.059, h + 0.08, 0.041, timber, shutter);
      for (const sy of [-0.3, 0.3]) box(0.1, h * sy, 0.023, 0.21, 0.042, 0.025, darkWood, shutter);
    }
    if (on > 0.22 && spillCount < 8) {
      // Register an analytic light pool on the ground snow in front of this window.
      win.updateWorldMatrix(true, false);
      const world = win.localToWorld(v3(0, -0.1, 0.15));
      const out = v3(0, 0, 1).applyQuaternion(win.getWorldQuaternion(new THREE.Quaternion()));
      spillPos[spillCount].copy(world); spillDir[spillCount].copy(out);
      spillColor[spillCount].set(1, .6, .28).multiplyScalar((on > .65 ? 2.6 : 1.2) * w * h);
      spillCount++;
    }
  };
  const chimneys: THREE.Vector3[] = [];
  const windowGlows: THREE.Vector3[] = [];
  const house = (x: number, z: number, w: number, d: number, wall: number, pitch: number, rotation: number, warm: boolean, variant: number) => {
    const group = new THREE.Group(); group.position.set(x, terrain(x, z) - 0.12, z); group.rotation.y = rotation; staticRoot.add(group);
    group.updateMatrixWorld(true);
    const housePlaster = warm ? plasterWarm : plasterCool;
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
    // Half-timbering on the gable end.
    for (const s of [-1, 1]) {
      roofHalf(w, d, wall + 0.1, pitch, s, slate, 0, group);
      roofHalf(w, d, wall + 0.1, pitch, s, capSnow, 0.27 + variant * 0.018, group);
      box(s * (w / 2 - 0.065), wall / 2 + 0.13, d / 2 + 0.006, 0.13, wall, 0.15, timber, group);
      box(s * (w / 2 + 0.24), wall + 0.04, 0, 0.13, 0.16, d + 0.65, darkWood, group);
      beam(v3(s * (w / 2 + 0.28), wall + 0.11, d / 2 + 0.35), v3(0, wall + pitch + 0.11, d / 2 + 0.35), 0.065, darkWood, group);
      const snowEdge: THREE.Vector3[] = [];
      for (let i = 0; i <= 12; i++) { const t = i / 12; snowEdge.push(v3(s * (w / 2 + 0.31) * (1 - t), wall + pitch * t + 0.37 + Math.sin(t * 8 + variant) * 0.025, d / 2 + 0.36 + Math.sin(t * 9 + variant) * 0.025)); }
      mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(snowEdge), 36, 0.14, 10, false), capSnow, group);
    }
    box(0, wall + 0.05, d / 2 + 0.015, w, 0.135, 0.15, timber, group);
    box(0, wall + pitch * 0.45, d / 2 + 0.065, 0.083, pitch * 0.92, 0.095, timber, group);
    // Half-timbering that respects the openings: a sill rail broken by the door, studs
    // beside the window and door, and raked struts in the gable.
    const railY = mainY - 0.62;
    const doorLeft = doorX - 0.47, doorRight = doorX + 0.47;
    if (doorLeft - (-w / 2) > .2) box((-w / 2 + doorLeft) / 2, railY, d / 2 + 0.012, doorLeft + w / 2, 0.1, 0.1, darkWood, group);
    if (w / 2 - doorRight > .2) box((w / 2 + doorRight) / 2, railY, d / 2 + 0.012, w / 2 - doorRight, 0.1, 0.1, darkWood, group);
    for (const sx of [-1, 1]) {
      const studX = -doorX + sx * (mainW / 2 + 0.2);
      if (Math.abs(studX - doorX) > .55 && Math.abs(studX) < w / 2 - .2) box(studX, (railY + wall) / 2, d / 2 + 0.01, 0.09, wall - railY, 0.09, darkWood, group);
      box(doorX + sx * 0.47, (0.12 + wall) / 2, d / 2 + 0.01, 0.1, wall - 0.12, 0.1, darkWood, group);
      beam(v3(sx * w * .4, wall + .14, d / 2 + .03), v3(sx * w * .07, wall + pitch * .6, d / 2 + .03), .045, darkWood, group, 6);
    }
    // Deep entrance, weathered board door, and an uneven stone threshold under snow.
    box(doorX, 0.825, d / 2 - 0.27, 0.73, 1.35, 0.07, darkWood, group);
    for (let i = 0; i < 5; i++) box(doorX - 0.29 + i * 0.145, 0.825, d / 2 - 0.217, 0.137, 1.31, 0.025, i % 2 ? timber : darkWood, group);
    box(doorX + 0.23, 0.86, d / 2 - 0.172, 0.024, 0.07, 0.035, brass, group);
    const step = mesh(new RoundedBoxGeometry(1.02, 0.17, 0.65, 2, 0.035), stone, group); step.position.set(doorX, 0.085, d / 2 + 0.22);
    addWindow(group, -doorX, mainY, d / 2, mainW, 0.92, warm ? 0.9 : 0.55);
    if (wall > 3.2) {
      addWindow(group, -w * 0.24, wall * 0.8, d / 2, 0.53, 0.63, 0.14);
      addWindow(group, w * 0.22, wall * 0.8, d / 2, 0.57, 0.65, warm ? 0.7 : 0.14);
    }
    addWindow(group, -w / 2, wall * 0.55, 0.2, 0.67, 0.85, warm ? 0.46 : 0.78, true);
    windowGlows.push(group.localToWorld(v3(-doorX, mainY, d / 2 + .3)));
    const chimneyX = w * 0.26;
    box(chimneyX, wall + pitch * 0.79 + 0.33, -d * 0.21, 0.42, 0.94, 0.48, stone, group);
    snowCap(chimneyX, wall + pitch * 0.79 + 0.8, -d * 0.21, 0.52, 0.58, 0.11, group);
    chimneys.push(group.localToWorld(v3(chimneyX, wall + pitch * 0.79 + 0.95, -d * 0.21)));
    box(doorX, 1.59, d / 2 + 0.26, 0.98, 0.11, 0.64, darkWood, group);
    snowCap(doorX + 0.013, 1.645, d / 2 + 0.29, 1.08, 0.72, 0.13, group);
    if (variant === 2) {
      // A firewood stack against the lane-side wall, log ends toward the lane, capped with snow.
      const logs = new THREE.Group(); logs.position.set(-w / 2 - 0.3, 0.12, 0.1); group.add(logs);
      for (let row = 0; row < 6; row++) for (let col = 0; col < 12 - (row > 3 ? 1 : 0); col++) {
        const r = 0.065 + random() * 0.02;
        const zc = -0.95 + col * 0.17 + (row % 2) * 0.085 + (random() - .5) * .02;
        const yc = 0.08 + row * 0.15;
        const offset = (random() - .5) * .06;
        beam(v3(-0.24 + offset, yc, zc), v3(0.24 + offset, yc + (random() - .5) * .02, zc), r, row % 3 ? timber : darkWood, logs, 9);
      }
      box(0, 0.02, 0, 0.6, 0.05, 2.15, darkWood, logs);
      snowCap(0, 0.94, 0, 0.56, 2.0, 0.11, logs);
    }
    for (let i = 0; i < 4; i++) {
      const px = x - w * 0.46 + i * w * 0.32 + (random() - 0.5) * 0.24;
      snowDrift(px, z + d / 2 + 0.21 + random() * 0.3, 0.85 + random() * 0.55, 0.55 + random() * 0.24, 0.1 + random() * 0.12);
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

  // ---------------------------------------------------------------- trees
  const treeGround = (x: number, z: number) => z < -43 ? Math.max(terrain(x, z), hillHeight(x, z) - .2) : terrain(x, z);
  const needles = applySnowCover(createFoliageMaterial(needleSprayTexture(51, '#2c4235'), 'village-spruce'), { key: 'village-spruce', threshold: .62, amount: .92, scale: 3.2 });
  const bark = applySnowCover(new THREE.MeshStandardMaterial({ color: '#3b322c', roughness: .95 }), { key: 'village-bark', threshold: .55 });
  {
    const woods: THREE.BufferGeometry[] = [], foliage: THREE.BufferGeometry[] = [];
    const firs: Array<[number, number, number]> = [[-9, -4, 6.8], [8.8, -4.9, 6.1], [-10.4, -13, 8.1], [9.6, -19, 7.2], [-8.6, -25, 6.8], [10.1, -30, 7.6], [-11, -38, 7], [8, -44, 7.8], [-8, -51, 7.5], [-13.5, -8.5, 7.4], [12.6, -12.5, 8.6], [-12.8, -27, 9]];
    firs.forEach(([x, z, h], index) => {
      const tree = coniferGeometry({ height: h, seed: 40 + index * 7, spread: .25, clearTrunk: .1, lean: .03 });
      const matrix = new THREE.Matrix4().compose(v3(x, treeGround(x, z) - .1, z), new THREE.Quaternion().setFromAxisAngle(v3(0, 1, 0), random() * Math.PI * 2), v3(1, 1, 1));
      tree.wood.applyMatrix4(matrix); tree.foliage.applyMatrix4(matrix);
      woods.push(tree.wood); foliage.push(tree.foliage);
      if (z > -35) snowDrift(x, z, 1.4 + h * 0.12, 1.1, 0.17);
    });
    const woodGeometry = mergeGeometries(woods), foliageGeometry = mergeGeometries(foliage);
    woods.forEach((g) => g.dispose()); foliage.forEach((g) => g.dispose());
    const trunks = new THREE.Mesh(woodGeometry, bark); trunks.castShadow = trunks.receiveShadow = true; scene.add(trunks);
    const crowns = new THREE.Mesh(foliageGeometry, needles); crowns.castShadow = crowns.receiveShadow = true; scene.add(crowns);
  }
  const bareTree = (x: number, z: number, height: number, seed: number) => {
    const group = new THREE.Group(); group.position.set(x, treeGround(x, z), z); staticRoot.add(group);
    const trunk = v3(Math.sin(seed) * 0.26, height * 0.64, 0.09);
    beam(v3(0, 0, 0), trunk, height * 0.022, darkWood, group);
    for (let i = 0; i < 7; i++) {
      const a = seed + i * 2.32, root = trunk.clone().multiplyScalar(0.4 + i * 0.085);
      const tip = root.clone().add(v3(Math.cos(a) * height * (0.24 + i * 0.016), height * (0.27 - i * 0.011), Math.sin(a) * height * 0.25));
      beam(root, tip, height * 0.01, darkWood, group, 6);
      for (let j = 0; j < 3; j++) {
        const fork = root.clone().lerp(tip, 0.45 + j * 0.17);
        const small = fork.clone().add(v3(Math.cos(a + j) * height * 0.12, height * 0.15, Math.sin(a + j) * height * 0.1));
        beam(fork, small, height * 0.0045, darkWood, group, 5);
      }
    }
  };
  bareTree(-7.3, -14.3, 5.4, 1.7); bareTree(7.4, -28.8, 5.8, 4.2); bareTree(-12.2, -43.5, 6.3, 3.1);

  // ---------------------------------------------------------------- fences & lamps
  const fence = (x: number, z: number, length: number, rotation: number) => {
    const group = new THREE.Group(); group.position.set(x, terrain(x, z) - .05, z); group.rotation.y = rotation; staticRoot.add(group);
    const n = Math.ceil(length / 0.75);
    for (let i = 0; i <= n; i++) {
      const bx = (i / n - 0.5) * length;
      const h = 0.94 + Math.sin(i * 2) * 0.07;
      box(bx, h / 2 + .15, 0, 0.09, h, 0.11, timber, group);
      snowCap(bx, h + .15, 0, 0.13, 0.15, 0.07, group);
    }
    for (const y of [0.39, 0.85]) {
      box(0, y, -0.05, length + 0.12, 0.09, 0.09, darkWood, group);
      snowCap(0, y + .045, -0.05, length + .1, .1, .045, group);
    }
  };
  fence(-4, -3.5, 2.8, 0.21);
  fence(4.4, -5.8, 3.4, -0.2);
  fence(-3.8, -21.7, 2.4, 0.08);
  const lamps: THREE.Vector3[] = [];
  const lampPost = (x: number, z: number, height: number, armSide: number) => {
    const base = v3(x, terrain(x, z), z);
    beam(base.clone().add(v3(0, -.2, 0)), base.clone().add(v3(0, height, 0)), .05, iron);
    beam(base.clone().add(v3(0, height - .05, 0)), base.clone().add(v3(armSide * .42, height + .05, 0)), .025, iron);
    const head = base.clone().add(v3(armSide * .42, height - .32, 0));
    box(head.x, head.y, head.z, .2, .3, .2, lampGlass);
    for (const dx of [-.11, .11]) for (const dz of [-.11, .11]) box(head.x + dx, head.y, head.z + dz, .025, .36, .025, iron);
    const roof = mesh(new THREE.ConeGeometry(.2, .14, 4), iron); roof.position.set(head.x, head.y + .23, head.z); roof.rotation.y = Math.PI / 4;
    snowCap(head.x, head.y + .25, head.z, .24, .24, .07);
    box(head.x, head.y - .17, head.z, .24, .04, .24, iron);
    lamps.push(head);
  };
  lampPost(2.35, -6.6, 2.9, -1);
  lampPost(-2.15, -19.8, 2.8, 1);

  // ---------------------------------------------------------------- the porch
  // Sheltered first-person foreground: planks below, tactile rail and eave above.
  for (let i = 0; i < 20; i++) box(-4.55 + i * 0.48, -0.055, 2.7, 0.46, 0.12, 5.1, porchWood);
  const handrail = mesh(new RoundedBoxGeometry(8.7, 0.18, 0.34, 3, 0.033), railWood); handrail.position.set(0, 0.73, 0.96);
  box(0, 0.26, 0.98, 8.7, 0.115, 0.125, darkWood);
  for (let i = -7; i <= 7; i++) box(i * 0.59 + 0.13, 0.43, 0.97, 0.073, 0.62, 0.09, timber);
  for (const x of [-3.9, 3.9]) {
    box(x, 1.4, 0.95, 0.25, 2.92, 0.25, railWood);
    box(x, 2.57, 1.13, 0.41, 0.12, 0.61, darkWood);
    beam(v3(x, 1.96, 0.95), v3(x * 0.77, 2.58, 0.95), 0.075, railWood);
  }
  for (let i = 0; i < 20; i++) box(-4.55 + i * 0.48, 2.76, 2.5, 0.465, 0.14, 4.2, porchWood);
  box(0, 2.63, 0.52, 9.55, 0.25, 0.24, railWood);
  for (let i = -4; i <= 4; i++) box(i * 1.03, 2.61, 2.5, 0.13, 0.18, 4.35, darkWood);
  // Snow piled on the eave's outer edge, with a soft overhang.
  {
    const geo = new RoundedBoxGeometry(9.7, .2, .68, 4, .09);
    const pos = geo.getAttribute('position');
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      pos.setY(i, y + (y > 0 ? noise3(x * 2.2, z * 3, 5) * .05 + .03 : 0) - (z > .2 && y < 0 ? .04 * (.5 + .5 * Math.sin(x * 3.1)) : 0));
    }
    geo.computeVertexNormals();
    const eaveSnow = mesh(geo, capSnow); eaveSnow.position.set(0, 2.84, 0.45);
  }
  // Small tapered icicles carry the roof load without dominating the view.
  for (let i = 0; i < 24; i++) {
    const len = 0.05 + Math.pow(random(), 2) * 0.24;
    const icicle = mesh(new THREE.ConeGeometry(0.012 + random() * 0.01, len, 6, 3), ice);
    const ip = icicle.geometry.getAttribute('position');
    for (let k = 0; k < ip.count; k++) ip.setX(k, ip.getX(k) + Math.sin(ip.getY(k) * 40 + i) * .002);
    icicle.geometry.computeVertexNormals();
    icicle.position.set(-4.45 + i * 0.38 + (random() - .5) * .2, 2.72 - len / 2, 0.17); icicle.rotation.z = Math.PI;
  }

  // The lantern is modelled at hand scale, with metal cage, glass and a small flame.
  const lantern = new THREE.Group(); lantern.position.set(-0.45, 0.88, 1); staticRoot.add(lantern);
  box(0, 0.016, 0, 0.25, 0.055, 0.23, brass, lantern);
  for (const x of [-0.105, 0.105]) for (const z of [-0.098, 0.098]) box(x, 0.23, z, 0.022, 0.39, 0.022, brass, lantern);
  const lid = mesh(new THREE.ConeGeometry(0.19, 0.13, 4), brass, lantern); lid.position.y = 0.465; lid.rotation.y = Math.PI / 4;
  box(0, 0.525, 0, 0.055, 0.05, 0.045, brass, lantern);
  const handle = mesh(new THREE.TorusGeometry(0.084, 0.009, 6, 20, Math.PI), brass, lantern); handle.position.y = 0.53;
  box(0, 0.23, 0, 0.175, 0.32, 0.17, glassPane, lantern);
  const wick = mesh(new THREE.CylinderGeometry(.012, .016, .05, 8), brass, lantern); wick.position.y = .1;
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.028, 12, 10), flameMaterial); flame.position.set(-0.45, 0.88 + 0.19, 1); flame.scale.set(0.75, 1.7, 0.7);
  scene.add(flame);
  const lanternPos = v3(-0.45, 1.08, 1.0);
  const lampLight = new THREE.PointLight('#ffc98a', .9, 0, 2); lampLight.position.copy(lanternPos); scene.add(lampLight);
  const laneLights = lamps.map((head, i) => { const light = new THREE.PointLight('#ffc07a', i ? 2.4 : 2.8, 0, 2); light.position.copy(head); scene.add(light); return light; });

  // The rail snow is continuous geometry, and a tap makes a shallow soft-edged sweep.
  const snowCols = 220, snowRows = 14;
  const snowGeo = new THREE.PlaneGeometry(8.7, 0.43, snowCols, snowRows);
  snowGeo.rotateX(-Math.PI / 2); snowGeo.translate(0, 0, 0.96);
  const sp = snowGeo.attributes.position;
  const originalY = new Float32Array(sp.count), cleared = new Float32Array(sp.count), clearTarget = new Float32Array(sp.count);
  for (let i = 0; i < sp.count; i++) {
    const x = sp.getX(i), z = sp.getZ(i);
    const across = (z - 0.96) / 0.215;
    const lumps = noise3(x * 4.1, z * 9, 2.5) * .018 + noise3(x * 13, z * 20, 8.1) * .006;
    originalY[i] = 0.835 + Math.sqrt(Math.max(0, 1 - across * across)) * (0.115 + Math.sin(x * 6.2) * 0.009 + lumps) + Math.sin(x * 11.3) * 0.004;
    sp.setY(i, originalY[i]);
  }
  snowGeo.computeVertexNormals();
  const railSnow = new THREE.Mesh(snowGeo, railSnowMaterial); railSnow.castShadow = true; railSnow.receiveShadow = true; scene.add(railSnow);

  // ---------------------------------------------------------------- falling snow
  const snowLights = [
    { position: lamps[0], color: new THREE.Color(1, .66, .34).multiplyScalar(1.4) },
    { position: lamps[1], color: new THREE.Color(1, .66, .34).multiplyScalar(1.1) },
    { position: lanternPos, color: new THREE.Color(1, .66, .34).multiplyScalar(.3) },
    { position: windowGlows[0], color: new THREE.Color(1, .66, .34).multiplyScalar(.5) },
  ];
  const snowfall = createSnowfall({
    seed: 2207,
    wind: v3(.05, 0, .02),
    keyDirection: moonDir.clone().negate(),
    keyColor: new THREE.Color(.11, .13, .17),
    ambient: new THREE.Color(.05, .062, .085),
    lights: snowLights,
    layers: [
      { count: 3600, min: v3(-32, -.5, -64), max: v3(32, 15, -9), size: [.022, .04], speed: [.45, .8], sway: .3, opacity: .85, brightness: 1 },
      { count: 1700, min: v3(-11, -.5, -12), max: v3(11, 8.5, -1.2), size: [.018, .032], speed: [.4, .75], sway: .22, opacity: .9, brightness: 1.05 },
      { count: 240, min: v3(-4.6, -.5, -2.6), max: v3(4.6, 4.5, .3), size: [.022, .036], speed: [.35, .6], sway: .16, softness: .75, opacity: .8, brightness: 1.1, focus: 4.6 },
      // A few wind-blown flakes drift just past the eave: large, soft and out of focus.
      { count: 70, min: v3(-2.6, .3, .35), max: v3(2.8, 2.6, 2.3), size: [.012, .02], speed: [.12, .22], sway: .35, softness: 1, opacity: .45, brightness: .9, focus: 3 },
    ],
  });
  scene.add(snowfall.group);

  // Brush-off powder from a sweep, CPU-driven only while it settles.
  const dustCount = 60, dustPositions = new Float32Array(dustCount * 3), dustVelocity = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) dustPositions[i * 3 + 1] = -20;
  const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dustMat = new THREE.PointsMaterial({ color: new THREE.Color(.55, .6, .7), size: 0.022, transparent: true, opacity: 0, depthWrite: false });
  const dust = new THREE.Points(dustGeo, dustMat); dust.frustumCulled = false; scene.add(dust); let dustAge = 10;
  const raycaster = new THREE.Raycaster();

  // ---------------------------------------------------------------- static batching
  // Opaque static geometry merges per material; wood keeps its per-board grain axis.
  staticRoot.updateMatrixWorld(true);
  const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
  const remove: THREE.Mesh[] = [];
  const longest = new THREE.Vector3(), size = new THREE.Vector3();
  staticRoot.traverse((object) => {
    if (!(object instanceof THREE.Mesh) || Array.isArray(object.material) || object.material.transparent) return;
    const source = object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone();
    if (object.material.userData.grain) {
      object.geometry.computeBoundingBox();
      object.geometry.boundingBox!.getSize(size);
      longest.set(size.x >= size.y && size.x >= size.z ? 1 : 0, size.y > size.x && size.y >= size.z ? 1 : 0, size.z > size.x && size.z > size.y ? 1 : 0);
      longest.transformDirection(object.matrixWorld);
      const grain = new Float32Array(source.attributes.position.count * 3);
      for (let i = 0; i < grain.length; i += 3) grain.set([longest.x, longest.y, longest.z], i);
      source.setAttribute('grain', new THREE.BufferAttribute(grain, 3));
    }
    source.applyMatrix4(object.matrixWorld);
    for (const attribute of Object.keys(source.attributes)) if (!['position', 'normal', 'uv', 'grain'].includes(attribute)) source.deleteAttribute(attribute);
    if (!source.attributes.uv) source.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(source.attributes.position.count * 2), 2));
    const list = batches.get(object.material) ?? []; list.push(source); batches.set(object.material, list); remove.push(object);
  });
  for (const [mat, geometries] of batches) {
    const merged = mergeGeometries(geometries, false);
    geometries.forEach((geo) => geo.dispose());
    if (merged) { const combined = new THREE.Mesh(merged, mat); combined.castShadow = true; combined.receiveShadow = true; scene.add(combined); }
  }
  remove.forEach((object) => { object.removeFromParent(); object.geometry.dispose(); });
  // The remaining transparent glass keeps its own draw, moved into the world frame.
  const lastMeshes: THREE.Mesh[] = []; staticRoot.traverse((object) => { if (object instanceof THREE.Mesh) lastMeshes.push(object); });
  for (const object of lastMeshes) { object.updateWorldMatrix(true, false); const world = object.matrixWorld.clone(); object.removeFromParent(); object.matrix.copy(world); object.matrix.decompose(object.position, object.quaternion, object.scale); object.castShadow = false; scene.add(object); }
  staticRoot.removeFromParent();

  let environment: THREE.WebGLRenderTarget | null = null;
  let volumeUniforms: Record<string, THREE.IUniform> | null = null;
  let shadowRenderer: THREE.WebGLRenderer | null = null;
  const resize = (aspect: number) => {
    camera.aspect = aspect;
    const portrait = aspect < 0.86;
    camera.fov = portrait ? 53 : 50;
    camera.position.set(portrait ? -0.4 : 0.2, portrait ? 1.41 : 1.47, portrait ? 3.55 : 3.27);
    camera.lookAt(portrait ? 0 : 0.28, portrait ? 0.65 : 1.65, portrait ? -12 : -19);
    camera.updateProjectionMatrix();
  };
  resize(1);
  const lanternFlicker = (t: number) => 1 + Math.sin(t * 1.27) * .025 + Math.sin(t * 2.9 + 1.3) * .012;
  return {
    scene, camera, resize,
    post: {
      exposure: 1.22, bloomStrength: .1, bloomThreshold: 0, aoStrength: .8, aoRadius: .5,
      saturation: 1.02, contrast: 1.08, shadowTint: [.9, .97, 1.12], highlightTint: [1.02, 1.0, .98], vignette: .45, grain: .024,
    },
    prepare(renderer) {
      environment = bakeNightEnvironment(renderer, sky.dome, '#4b6088');
      scene.environment = environment.texture;
      scene.environmentIntensity = 1.6;
      // The village never moves: render the moon's shadow map once.
      shadowRenderer = renderer;
      renderer.shadowMap.autoUpdate = false;
      renderer.shadowMap.needsUpdate = true;
    },
    createVolume() {
      const volume = createSnowNightVolume({
        noise, moonDirection: moonDir, moon: new THREE.Color(.022, .028, .04), ambient: new THREE.Color(.0045, .0062, .0095),
        fogDensity: .004, fogHeight: 14, fogBase: 0, maxDistance: 400,
        curtain: { density: .0045, start: 22 },
        lamps: [
          { position: lamps[0], color: new THREE.Color(1, .62, .3).multiplyScalar(.05) },
          { position: lamps[1], color: new THREE.Color(1, .62, .3).multiplyScalar(.04) },
          { position: lanternPos, color: new THREE.Color(1, .62, .3).multiplyScalar(.0035) },
          { position: windowGlows[0], color: new THREE.Color(1, .62, .3).multiplyScalar(.012) },
        ],
        smoke: [
          { base: chimneys[0], radius: .26, height: 7, density: 1.3 },
          { base: chimneys[1], radius: .28, height: 7.5, density: 1.15 },
        ],
        wind: new THREE.Vector2(.42, -.12),
        smokeLight: new THREE.Color(.03, .02, .012),
      });
      volumeUniforms = volume.uniforms;
      return volume;
    },
    setPostActive(active) { scene.fog = active ? null : fallbackFog; },
    update(elapsed, dt) {
      snowfall.update(elapsed);
      sky.update(elapsed);
      const flicker = lanternFlicker(elapsed);
      lampLight.intensity = .9 * flicker;
      flameMaterial.color.setRGB(1, .62, .28).multiplyScalar(26 * flicker);
      let changed = false;
      for (let i = 0; i < sp.count; i++) if (Math.abs(clearTarget[i] - cleared[i]) > 0.00015) {
        cleared[i] += (clearTarget[i] - cleared[i]) * Math.min(1, dt * 5);
        sp.setY(i, originalY[i] - cleared[i]); changed = true;
      }
      if (changed) { sp.needsUpdate = true; snowGeo.computeVertexNormals(); if (shadowRenderer) shadowRenderer.shadowMap.needsUpdate = true; }
      if (dustAge < 2.4) {
        dustAge += dt; dustMat.opacity = Math.max(0, 0.6 * (1 - dustAge / 2.4));
        for (let i = 0; i < dustCount; i++) {
          dustVelocity[i * 3 + 1] -= dt * 0.28;
          for (let j = 0; j < 3; j++) dustPositions[i * 3 + j] += dustVelocity[i * 3 + j] * dt;
        }
        dustGeo.attributes.position.needsUpdate = true;
      }
      if (volumeUniforms) volumeUniforms.uLampColor.value[2].set(1, .62, .3).multiplyScalar(.0035 * flicker);
    },
    interact(ndc) {
      camera.updateMatrixWorld(true); scene.updateMatrixWorld(true); raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObject(railSnow, false)[0]; if (!hit) return undefined;
      const x = hit.point.x;
      if (Math.abs(x + 0.45) < 0.28) return undefined;
      for (let i = 0; i < sp.count; i++) {
        const distance = Math.abs(sp.getX(i) - x);
        const weight = Math.exp(-Math.pow(distance / 0.27, 4));
        clearTarget[i] = Math.min(originalY[i] - 0.828, Math.max(clearTarget[i], weight * (originalY[i] - 0.828)));
      }
      for (let i = 0; i < dustCount; i++) {
        dustPositions.set([x + (random() - .5) * .5, .92 + random() * .025, .86 + (random() - .5) * .14], i * 3);
        dustVelocity.set([(random() - .5) * .22, .05 + random() * .11, -.12 - random() * .18], i * 3);
      }
      dustAge = 0; dustMat.opacity = .6; dustGeo.attributes.position.needsUpdate = true;
      return { kind: 'snow', strength: 0.28, x: THREE.MathUtils.clamp(x / 4.35, -1, 1) };
    },
    dispose() {
      environment?.dispose(); environment = null;
      noise.dispose();
      // Textures held only by materials that merged away are released with their materials.
      for (const texture of interiors) texture.dispose();
      shadowRenderer = null;
    },
  };
};
