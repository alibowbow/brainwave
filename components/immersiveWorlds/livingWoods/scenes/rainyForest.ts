import * as THREE from 'three';
import type { WorldContent } from '../types';
import { buildTree, concatGeometries, loftTube, type TreeBuild } from '../../shared/render/treeGeometry';
import { applyBarkSurface } from '../../shared/render/barkSurface';
import { applyFoliageShading, beforeMain, layerCanopy, withNoise } from '../../shared/render/foliageShading';
import { broadleafClusterTexture, fernFrondTexture, litterTexture } from '../../shared/render/foliageTextures';
import { boulderGeometry } from '../../shared/render/rockGeometry';
import { applyRockSurface } from '../../shared/render/rockSurface';
import { createRainLayer, createRainSplashes, type RainLayer } from '../../shared/render/rainStreaks';
import { seeded } from '../../shared/render/noise';
import {
  applyDewGlints, applyForestFloor, bakeEnvironment, createSky, createSun, createWoodsVolume, fernCrownGeometry, fernMaterial,
  instanced, litterGeometry, scatter, terrainGeometry, type Placement, type SkyOptions,
} from './woodsKit';
import { buildClump, createDrips, ribbedLeafTexture, roundLeafTexture } from './understorey';

/** Overcast: the brightest sky is high above the opening ahead, so soft light falls into the clearing. */
const TO_SKY = new THREE.Vector3(-0.15, 0.92, -0.36).normalize();
const srgb = (h: number, s: number, l: number) => new THREE.Color().setHSL(h, s, l, THREE.SRGBColorSpace);

/** Growth rings and a soft, rotted heart for the cut end of the fallen log. */
function logEndTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const random = seeded(311);
  const c = size / 2;
  ctx.fillStyle = '#7d6446'; ctx.fillRect(0, 0, size, size);
  for (let r = c; r > 4; r -= 3 + random() * 4) {
    ctx.strokeStyle = `rgba(${random() > 0.5 ? '70,50,30' : '150,124,86'},${0.2 + random() * 0.2})`;
    ctx.lineWidth = 1 + random() * 1.5;
    ctx.beginPath();
    for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.1) {
      const rr = r * (1 + 0.03 * Math.sin(a * 3 + r * 0.1));
      if (a === 0) ctx.moveTo(c + Math.cos(a) * rr, c + Math.sin(a) * rr); else ctx.lineTo(c + Math.cos(a) * rr, c + Math.sin(a) * rr);
    }
    ctx.stroke();
  }
  // Soft, darker heartwood starting to rot; green algae creeping in from the rim.
  const heart = ctx.createRadialGradient(c * 1.05, c * 0.95, 0, c, c, c * 0.32);
  heart.addColorStop(0, 'rgba(48,32,18,0.8)'); heart.addColorStop(0.7, 'rgba(70,48,28,0.4)'); heart.addColorStop(1, 'rgba(70,48,28,0)');
  ctx.fillStyle = heart; ctx.fillRect(0, 0, size, size);
  // Checks (radial cracks) and a dark rim of bark.
  ctx.strokeStyle = 'rgba(20,14,8,0.7)';
  for (let i = 0; i < 7; i++) {
    const a = random() * Math.PI * 2;
    ctx.lineWidth = 1 + random() * 2;
    ctx.beginPath(); ctx.moveTo(c + Math.cos(a) * c * 0.3, c + Math.sin(a) * c * 0.3); ctx.lineTo(c + Math.cos(a) * c * (0.7 + random() * 0.3), c + Math.sin(a) * c * (0.7 + random() * 0.3)); ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(60,90,30,0.35)'; ctx.lineWidth = size * 0.08;
  ctx.beginPath(); ctx.arc(c, c, c - size * 0.07, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#2e2216'; ctx.lineWidth = size * 0.035;
  ctx.beginPath(); ctx.arc(c, c, c - size * 0.018, 0, Math.PI * 2); ctx.stroke();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createRainyForest(scene: THREE.Scene, camera: THREE.PerspectiveCamera): WorldContent {
  const random = seeded(382849);
  const time = { value: 0 };
  let environment: THREE.WebGLRenderTarget | null = null;
  camera.position.set(0, 1.3, 5.5);
  camera.fov = 57;
  camera.lookAt(0.1, 1.08, -8);
  camera.updateProjectionMatrix();

  // Bright, even overcast; no sun disc, no flashes.
  const sky: SkyOptions = {
    zenith: new THREE.Color(0.86, 0.92, 0.96).multiplyScalar(1.5), horizon: new THREE.Color(0.66, 0.75, 0.8).multiplyScalar(1.2),
    ground: new THREE.Color(0.05, 0.06, 0.05), toSun: TO_SKY, sun: new THREE.Color(0, 0, 0), glow: new THREE.Color(0.9, 0.95, 1).multiplyScalar(0.35),
    clouds: { lit: new THREE.Color(1.5, 1.55, 1.62), shade: new THREE.Color(0.78, 0.85, 0.92), cover: 0.35, scale: 0.3, speed: 0.006, amount: 0.6 },
    wall: { color: new THREE.Color(0.15, 0.2, 0.22), height: 0.16 },
    time,
  };
  scene.add(createSky(sky, 120));
  scene.background = new THREE.Color(0.42, 0.5, 0.54);
  const fog = new THREE.FogExp2(0xffffff, 0.02);
  fog.color.setRGB(0.19, 0.24, 0.27);
  scene.fog = fog;
  createSun(scene, { toSun: TO_SKY, color: '#e2ebee', intensity: 2.8, target: new THREE.Vector3(0, 0, -4), box: [-14, 14, -12, 16], distance: 40, radius: 7, normalBias: 0.05 });

  const groundY = (x: number, z: number) => -0.09 + Math.max(0, Math.abs(x) - 1.5) * 0.023 + 0.08 * Math.sin(x * 1.9 + (z - 22) * 0.55) * Math.sin((z - 22) * 1.25 + x * 0.25);
  const canopy = layerCanopy({ key: 'rainy', toSun: TO_SKY, height: 14, scale: 0.06, cover: -0.15, softness: 0.6, floor: 0.32, time });
  const wind = { time, mode: 'attribute' as const, sway: 0.22, flutter: 0.03, direction: [0.6, -0.8] as [number, number], speed: 0.85 };

  // ---- Soaked trunks: dark, glossy bark with moss and run-off streaks ----------------------------
  const barkMaterial = applyFoliageShading(applyBarkSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.85 }), {
    key: 'rainy-bark', scale: 1.7, stretch: 5, depth: 0.035, plate: '#5f5a4e', fissure: '#14120e', wetness: 0.9,
    lichen: { color: '#8f9e84', amount: 0.32 }, moss: { color: '#40691f', amount: 0.85, below: 1.4, side: new THREE.Vector3(0.2, 0, 1), up: 0.95 },
  }), { key: 'rainy-bark', canopy, wind });
  const fixed: Array<[number, number, number, number]> = [
    [-3.2, 1.5, 0.7, 20], [3.8, 0.0, 0.6, 21], [-4.3, -6.5, 0.55, 22], [4.1, -9, 0.44, 21], [-1.9, -12, 0.42, 22], [1.7, -17, 0.37, 23],
  ];
  const spots: Array<[number, number, number, number]> = [...fixed];
  for (let i = 0; i < 90; i++) {
    const z = -5 - random() * 52;
    let x = (random() - 0.5) * (26 + -z * 0.58);
    if (Math.abs(x) < 2.4 && z > -11) x += x < 0 ? -3 : 3;
    spots.push([x, z, 0.22 + random() * 0.43, 16 + random() * 10]);
  }
  const trees: TreeBuild[] = spots.map(([x, z, r, h], i) => buildTree({
    seed: 60 + i, base: new THREE.Vector3(x, groundY(x, z) - 0.12, z), height: h, radius: r, form: 'column',
    gnarl: 0.3, flare: 0.7, buttresses: i < 6 ? 4 : 0, crownStart: 0.32 + random() * 0.2, limbs: i < 6 ? 7 : 5, levels: 1, children: 3,
    spread: 0.2, curl: 0.15, radial: i < 6 ? 26 : 10, ringsPerMetre: i < 6 ? 4 : 0.8, displace: i < 6 ? 0.03 : 0, barkScale: 1.7, barkStretch: 5, flex: 0.25,
    leaves: { cardsPerTwig: i < 6 ? 16 : 11, size: 1.5, reach: 0.85, crownNormals: 0.75, shade: [0.25, 1], fill: 0.2 },
  }));
  const barkParts = trees.map(t => t.bark);
  // Surface roots of the six near trees run into the wet litter.
  const rootRandom = seeded(77);
  for (const [x, z, r] of fixed) {
    for (let k = 0; k < 4; k++) {
      const angle = rootRandom() * Math.PI * 2, reach = 1.2 + rootRandom() * 1.6;
      const dir = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      const points = [0, 0.33, 0.66, 1].map(t => {
        const p = new THREE.Vector3(x, 0, z).addScaledVector(dir, r * 0.4 + t * reach);
        p.y = groundY(p.x, p.z) + 0.7 * (1 - t) ** 2 - 0.05;
        return p;
      });
      barkParts.push(loftTube(points, [r * 0.32, r * 0.24, r * 0.14, r * 0.05], { radial: 12, ringsPerMetre: 8, displace: 0.01, barkScale: 1.7, barkStretch: 4, barkOffset: 200 + k * 7, flatten: 0.4 }));
    }
  }
  // A mossy fallen log lies across the right of the path, half sunk in the litter.
  const logPoints = [[1.45, -2.7], [3.0, -3.5], [4.7, -4.3], [6.6, -5.5]].map(([x, z], i) => new THREE.Vector3(x, groundY(x, z) + 0.13 + Math.sin(i * 1.3) * 0.03, z));
  const logRadii = [0.27, 0.3, 0.29, 0.26];
  barkParts.push(loftTube(logPoints, logRadii, { radial: 24, ringsPerMetre: 7, displace: 0.022, barkScale: 1.5, barkStretch: 4, barkOffset: 410, flatten: 0.3 }));
  // A broken limb lying along the log, and a thin one by the path.
  barkParts.push(loftTube([new THREE.Vector3(2.4, groundY(2.4, -2.5) + 0.05, -2.5), new THREE.Vector3(3.3, groundY(3.3, -2.9) + 0.07, -2.9), new THREE.Vector3(4.1, groundY(4.1, -3.1) + 0.04, -3.1)], [0.05, 0.04, 0.02], { radial: 8, ringsPerMetre: 8, displace: 0.004, barkOffset: 450, flatten: 0.2 }));
  barkParts.push(loftTube([new THREE.Vector3(-1.5, groundY(-1.5, -1.2) + 0.03, -1.2), new THREE.Vector3(-2.1, groundY(-2.1, -1.8) + 0.05, -1.8), new THREE.Vector3(-2.9, groundY(-2.9, -2.0) + 0.03, -2.0)], [0.035, 0.03, 0.015], { radial: 7, ringsPerMetre: 8, displace: 0.003, barkOffset: 470, flatten: 0.2 }));
  const bark = new THREE.Mesh(concatGeometries(barkParts), barkMaterial);
  bark.castShadow = true; bark.receiveShadow = true; scene.add(bark);
  barkParts.forEach(g => g.dispose());
  {
    // The log's broken near end: rings and a rotted heart, facing back along the trunk.
    const tangent = logPoints[0].clone().sub(logPoints[1]).normalize();
    const end = new THREE.Mesh(new THREE.CircleGeometry(logRadii[0] * 0.98, 32), new THREE.MeshStandardMaterial({ map: logEndTexture(), roughness: 0.55, color: '#9a8c7a' }));
    end.position.copy(logPoints[0]).addScaledVector(tangent, 0.005);
    end.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
    end.scale.y = 0.85;
    end.castShadow = true; end.receiveShadow = true;
    scene.add(end);
  }
  const canopyAtlas = broadleafClusterTexture({ seed: 52, palette: { base: '#3c6427', light: '#6d9440', dark: '#213d16', stem: '#3f3a2a' }, round: 0.45 });
  const canopyMaterial = applyFoliageShading(new THREE.MeshPhysicalMaterial({ map: canopyAtlas, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, alphaToCoverage: true, roughness: 0.38, clearcoat: 0.4, clearcoatRoughness: 0.2 }), {
    key: 'rainy-canopy', canopy, wind, sharedNormals: true, coverage: true, translucency: { tint: '#d8f09a', back: 0.35, forward: 0.5 },
  });
  const canopyLeaves = new THREE.Mesh(concatGeometries(trees.map(t => t.leaves).filter((g): g is THREE.BufferGeometry => !!g)), canopyMaterial);
  canopyLeaves.castShadow = true; canopyLeaves.receiveShadow = true; scene.add(canopyLeaves);
  trees.forEach(t => { t.bark.dispose(); t.leaves?.dispose(); });

  // ---- Wet floor, puddles and stones --------------------------------------------------------------
  const floorMaterial = applyFoliageShading(applyForestFloor(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.85 }), {
    key: 'rainy-floor', soil: '#2b2218', litter: '#6a4a2a', litterDark: '#2a1c11', moss: '#3b601d', mossAmount: 0.55, wetness: 0.85, bump: 0.7, carpet: { cells: 10, aspect: 2.7, cover: 0.62 },
  }), { key: 'rainy-floor', canopy });
  const ground = new THREE.Mesh(terrainGeometry({ width: 90, zNear: 7, zFar: -70, columns: 170, rows: 160, height: groundY }), floorMaterial);
  ground.receiveShadow = true; scene.add(ground);

  // Puddles: a glossy physical surface whose normals carry rain-drop ring ripples.
  const puddleMaterial = new THREE.MeshPhysicalMaterial({ color: '#1d2520', roughness: 0.04, metalness: 0, transparent: true, depthWrite: false, specularIntensity: 1 });
  puddleMaterial.onBeforeCompile = shader => {
    shader.uniforms.uRainTime = time;
    shader.vertexShader = beforeMain(shader.vertexShader, 'varying vec3 vPuddleWorld;\nvarying vec2 vPuddleUv;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvPuddleWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvPuddleUv = uv;');
    shader.fragmentShader = beforeMain(shader.fragmentShader, `${withNoise(shader.fragmentShader)}
uniform float uRainTime;
varying vec3 vPuddleWorld;
varying vec2 vPuddleUv;
float puddleHeight(vec2 p) {
  float h = bwNoise(vec3(p * 2.1, uRainTime * 0.15)) * 0.0012;
  vec2 grid = floor(p * 2.2);
  for (int x = -1; x <= 1; x++) for (int y = -1; y <= 1; y++) {
    vec2 id = grid + vec2(float(x), float(y));
    vec3 r = bwHash3(vec3(id, 3.0));
    vec2 centre = (id + r.xy) / 2.2;
    float age = fract(uRainTime * 0.55 + r.z);
    float d = distance(p, centre);
    float ring = sin(d * 70.0 - age * 22.0) * exp(-pow((d - age * 0.22) * 18.0, 2.0)) * (1.0 - age);
    h += ring * 0.0035;
  }
  return h;
}`).replace('#include <color_fragment>', `#include <color_fragment>
diffuseColor.a = 0.94 * (1.0 - smoothstep(0.72, 0.98, length(vPuddleUv * 2.0 - 1.0)));`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  vec2 p = vPuddleWorld.xz; const float e = 0.006;
  float h0 = puddleHeight(p);
  vec3 grad = vec3(puddleHeight(p + vec2(e, 0.0)) - h0, 0.0, puddleHeight(p + vec2(0.0, e)) - h0) / e;
  vec3 viewGrad = (viewMatrix * vec4(grad, 0.0)).xyz;
  normal = normalize(normal - (viewGrad - dot(viewGrad, normal) * normal));
}`);
  };
  puddleMaterial.customProgramCacheKey = () => 'rainy-puddle-v2';
  const pools = [{ x: 0.05, z: 0.05, rx: 1.07, rz: 2.0 }, { x: -0.45, z: -4.7, rx: 1.35, rz: 2.3 }, { x: 1.1, z: -10.2, rx: 1.1, rz: 2.0 }, { x: -0.7, z: 3.3, rx: 0.5, rz: 0.6 }];
  pools.forEach((spec, p) => {
    const geo = new THREE.CircleGeometry(1, 90);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 1; i < pos.count; i++) {
      const a = Math.atan2(pos.getZ(i), pos.getX(i));
      const r = 1 + Math.sin(a * 3 + p) * 0.12 + Math.sin(a * 7 - p) * 0.05;
      pos.setXYZ(i, pos.getX(i) * spec.rx * r, 0, pos.getZ(i) * spec.rz * r);
    }
    const mesh = new THREE.Mesh(geo, puddleMaterial);
    mesh.position.set(spec.x, groundY(spec.x, spec.z) + 0.035, spec.z);
    mesh.renderOrder = 2; mesh.receiveShadow = true;
    scene.add(mesh);
  });
  const inPool = (x: number, z: number, margin = 1) => pools.some(p => ((x - p.x) / p.rx) ** 2 + ((z - p.z) / p.rz) ** 2 < margin);

  const stoneMaterial = applyFoliageShading(applyRockSurface(new THREE.MeshStandardMaterial({ color: '#6b6e66', roughness: 0.8 }), {
    key: 'rainy-stone', scale: 2, bump: 1, wetness: 0.8, drips: 0.4, stainAmount: 0.15, moss: { color: '#3f6420', amount: 0.75 },
  }), { key: 'rainy-stone', canopy });
  const stoneRandom = seeded(4242);
  const stoneParts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 26; i++) {
    const z = 4.2 - stoneRandom() * 22;
    let x = (stoneRandom() - 0.5) * 12;
    if (Math.abs(x) < 1.3) x += x > 0 ? 1.5 : -1.5;
    // Smaller stones gather along the path edge; a few large ones sit back among the ferns.
    const s = i < 10 ? 0.06 + stoneRandom() * 0.12 : 0.15 + stoneRandom() ** 2 * 0.5;
    if (i < 10) x = (x > 0 ? 1 : -1) * (1.15 + stoneRandom() * 0.5);
    const g = boulderGeometry(i + 3, 3);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, groundY(x, z) + s * 0.12, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, stoneRandom() * 6.28, 0)), new THREE.Vector3(s * 1.3, s * 0.65, s)));
    stoneParts.push(g);
  }
  const stones = new THREE.Mesh(concatGeometries(stoneParts), stoneMaterial);
  stones.castShadow = true; stones.receiveShadow = true; scene.add(stones);
  stoneParts.forEach(g => g.dispose());

  // ---- Ferns and wet litter -----------------------------------------------------------------------
  const fernAtlas = fernFrondTexture({ seed: 17, palette: { base: '#3d7a26', light: '#78b442', dark: '#1f4417', stem: '#4c6a2c' } });
  const fernWind = { time, mode: 'height' as const, height: 0.8, sway: 0.05, flutter: 0.02, direction: [0.6, -0.8] as [number, number], speed: 1 };
  const ferns = applyDewGlints(fernMaterial({ key: 'rainy', map: fernAtlas, canopy, wind: fernWind, roughness: 0.4 }), { key: 'rainy-fern-beads', toSun: TO_SKY, cells: 45, cover: 0.2, strength: 3 });
  const fernSpots: Placement[] = scatter(300, 91, r => {
    const z = 4.8 - r() * 33;
    let x = (r() - 0.5) * (13 + Math.max(0, -z) * 0.55);
    if (Math.abs(x) < 1.2 && z > -12) x += x < 0 ? -1.8 : 1.8;
    if (inPool(x, z, 1.3)) return null;
    const s = 0.55 + r() * 0.9;
    return { x, y: groundY(x, z) + 0.02, z, yaw: r() * 6.28, scale: new THREE.Vector3(s * 1.1, s * (0.8 + r() * 0.3), s), color: srgb(0.22 + r() * 0.06, 0.5 + r() * 0.2, 0.36 + r() * 0.14) };
  });
  // Framing crowns close to the seat, and a line along the log.
  for (const [x, z, s] of [[-1.55, 2.3, 1.0], [1.35, 1.4, 0.9], [-2.3, 3.6, 0.95], [1.3, 4.2, 0.9], [2.6, 3.7, 1.0], [3.8, -2.6, 0.85], [5.4, -3.6, 0.9]]) {
    fernSpots.push({ x, y: groundY(x, z) + 0.02, z, yaw: x * 2.3, scale: new THREE.Vector3(s, s * 0.85, s), color: srgb(0.24, 0.46, 0.4) });
  }
  const fernTemplates = [fernCrownGeometry(23, 10), fernCrownGeometry(29, 12), fernCrownGeometry(31, 9)];
  fernTemplates.forEach((template, i) => scene.add(instanced(template, ferns, fernSpots.filter((_, k) => k % 3 === i), { cast: true, receive: true })));
  const litterAtlas = litterTexture({ seed: 8, colors: ['#6a4224', '#8a6a34', '#3a2818', '#7a5a2e'] });
  const litterMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ map: litterAtlas, alphaTest: 0.5, alphaToCoverage: true, side: THREE.DoubleSide, roughness: 0.3 }), { key: 'rainy-litter', canopy, coverage: true });
  for (let cell = 0; cell < 4; cell++) {
    const leaves = scatter(700, 500 + cell, r => {
      const x = (r() - 0.5) * 12, z = 5 - Math.pow(r(), 1.3) * 18;
      if (inPool(x, z)) return null;
      const s = 0.07 + r() * 0.08;
      return { x, y: groundY(x, z) + 0.012, z, yaw: r() * 6.28, tilt: (r() - 0.5) * 0.2, scale: new THREE.Vector3(s, s, s * 1.4), color: srgb(0.08, 0.2, 0.45 + r() * 0.3) };
    });
    scene.add(instanced(litterGeometry(cell), litterMaterial, leaves, { cast: false, receive: true }));
  }

  // ---- Broad-leaved understorey: rooted clumps of round and ribbed leaves --------------------------
  const roundAtlas = roundLeafTexture({ seed: 44, palette: { base: '#2c6620', light: '#5f9a36', dark: '#143510', stem: '#3d5a2c' } });
  const ribbedAtlas = ribbedLeafTexture({ seed: 45, palette: { base: '#285a2a', light: '#548a3e', dark: '#133014', stem: '#3d5a2c' } });
  const clumpLeafMaterial = (key: string, map: THREE.Texture) => applyDewGlints(applyFoliageShading(new THREE.MeshPhysicalMaterial({
    map, alphaTest: 0.5, alphaToCoverage: true, side: THREE.DoubleSide, roughness: 0.5, clearcoat: 0.6, clearcoatRoughness: 0.12, envMapIntensity: 0.6,
  }), { key, canopy, coverage: true, translucency: { tint: '#c8f08a', back: 0.42, forward: 0.7 } }), { key: `${key}-beads`, toSun: TO_SKY, cells: 26, cover: 0.22, strength: 3.5 });
  const clumpMaterials = { round: clumpLeafMaterial('rainy-round-leaf', roundAtlas), ribbed: clumpLeafMaterial('rainy-ribbed-leaf', ribbedAtlas) };
  const stalkMaterial = applyFoliageShading(new THREE.MeshPhysicalMaterial({ color: '#466a34', roughness: 0.35, clearcoat: 0.6, clearcoatRoughness: 0.15 }), { key: 'rainy-stalk', canopy });
  type ClumpSpec = [number, number, 'round' | 'ribbed', number, number];
  const nearSpecs: ClumpSpec[] = [
    [-2.05, 2.95, 'round', 1.05, 8], [1.95, 2.6, 'round', 1.15, 9], [-2.7, 0.2, 'ribbed', 1.1, 11],
    [2.6, -1.4, 'round', 0.95, 7], [-1.95, -3.5, 'round', 0.85, 7], [2.2, -6.2, 'ribbed', 1.0, 10],
    // Low plants right at the path's edges also frame the narrow portrait view.
    [0.8, 2.35, 'ribbed', 0.75, 9], [-0.95, 1.75, 'round', 0.7, 6],
  ];
  const farSpecs: ClumpSpec[] = [
    [-3.6, -7.5, 'round', 0.9, 7], [3.4, -9.5, 'round', 1.0, 7], [-2.6, -12, 'ribbed', 1.0, 9], [2.9, -14, 'round', 0.9, 6],
    [-4.6, -2.4, 'round', 1.0, 7], [4.4, 1.2, 'ribbed', 1.1, 10], [-4.1, 3.6, 'round', 1.2, 8], [5.2, -4.8, 'round', 1.0, 7],
  ];
  const clumpRandom = seeded(5150);
  const nearClumps: THREE.Group[] = [];
  const nearLeaves: THREE.Mesh[] = [];
  const dripTips: Array<{ point: THREE.Vector3; ground: number; group: number }> = [];
  const splashPoints: number[] = [];
  const farLeafParts: Record<'round' | 'ribbed', THREE.BufferGeometry[]> = { round: [], ribbed: [] };
  const farStalkParts: THREE.BufferGeometry[] = [];
  const beadMaterial = new THREE.MeshPhysicalMaterial({ color: '#8fa39c', roughness: 0.02, metalness: 0, transparent: true, opacity: 0.5, clearcoat: 1, clearcoatRoughness: 0.02, specularIntensity: 1 });
  const beadGeometry = new THREE.SphereGeometry(1, 10, 7);
  [...nearSpecs, ...farSpecs].forEach(([x, z, kind, scale, count], index) => {
    const near = index < nearSpecs.length;
    const clump = buildClump({ seed: 800 + index * 7, kind, leaves: count, scale });
    const group = new THREE.Group();
    group.position.set(x, groundY(x, z) - 0.01, z);
    group.rotation.y = clumpRandom() * Math.PI * 2;
    group.updateMatrixWorld(true);
    for (const tip of clump.tips) {
      const world = tip.clone().applyMatrix4(group.matrixWorld);
      dripTips.push({ point: world, ground: groundY(world.x, world.z), group: near ? index : nearSpecs.length });
    }
    if (near) {
      const leaves = new THREE.Mesh(clump.leaves, clumpMaterials[kind]);
      leaves.castShadow = true; leaves.receiveShadow = true;
      leaves.userData.interaction = 'leaf';
      const stalks = new THREE.Mesh(clump.stalks, stalkMaterial);
      stalks.castShadow = true; stalks.receiveShadow = true;
      // Water beads sitting on the upper leaf surfaces.
      const beads = new THREE.InstancedMesh(beadGeometry, beadMaterial, clump.tops.length);
      const dummy = new THREE.Object3D();
      clump.tops.forEach((p, i) => {
        const s = 0.004 + clumpRandom() * 0.006;
        dummy.position.copy(p); dummy.scale.set(s, s * 0.6, s); dummy.updateMatrix();
        beads.setMatrixAt(i, dummy.matrix);
      });
      group.add(leaves, stalks, beads);
      scene.add(group);
      nearClumps.push(group); nearLeaves.push(leaves);
      for (let i = 0; i < clump.tops.length; i += 2) {
        const world = clump.tops[i].clone().applyMatrix4(group.matrixWorld);
        splashPoints.push(world.x, world.y, world.z);
      }
    } else {
      clump.leaves.applyMatrix4(group.matrixWorld);
      clump.stalks.applyMatrix4(group.matrixWorld);
      farLeafParts[kind].push(clump.leaves);
      farStalkParts.push(clump.stalks);
    }
  });
  for (const kind of ['round', 'ribbed'] as const) {
    const mesh = new THREE.Mesh(concatGeometries(farLeafParts[kind]), clumpMaterials[kind]);
    mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh);
    farLeafParts[kind].forEach(g => g.dispose());
  }
  const farStalks = new THREE.Mesh(concatGeometries(farStalkParts), stalkMaterial);
  farStalks.castShadow = true; scene.add(farStalks);
  farStalkParts.forEach(g => g.dispose());

  // ---- Rain: three depth layers, drips from every leaf tip, splashes on puddles and leaves --------
  const rainSky = new THREE.Color(1.05, 1.15, 1.2);
  const rainLayers: RainLayer[] = [
    // Few, fine streaks close by (a long exposure there reads as hatching), denser curtains further out.
    createRainLayer({ time, count: 800, min: new THREE.Vector3(-3.4, -0.2, -1.5), max: new THREE.Vector3(3.4, 4.6, 4.2), speed: 7.2, width: 0.0014, shutter: 0.022, radiance: rainSky, opacity: 0.45, boost: 1.3, seed: 41, wind: new THREE.Vector2(0.05, -0.03), nearFade: 1.1 }),
    createRainLayer({ time, count: 4800, min: new THREE.Vector3(-9, -0.2, -13), max: new THREE.Vector3(9, 9, -1.5), speed: 7.6, width: 0.0014, shutter: 0.028, radiance: rainSky, opacity: 0.48, boost: 1.3, seed: 42, wind: new THREE.Vector2(0.05, -0.03) }),
    createRainLayer({ time, count: 8000, min: new THREE.Vector3(-20, -0.2, -38), max: new THREE.Vector3(20, 15, -13), speed: 8, width: 0.0015, shutter: 0.028, radiance: rainSky, opacity: 0.45, boost: 1.1, seed: 43, wind: new THREE.Vector2(0.05, -0.03) }),
  ];
  const viewSize = new THREE.Vector2();
  rainLayers.forEach(layer => {
    // Keep streaks about a pixel wide at the actual target height (HDR target or canvas).
    layer.mesh.onBeforeRender = renderer => {
      const target = renderer.getRenderTarget();
      layer.setViewHeight(target ? target.height : renderer.getDrawingBufferSize(viewSize).y);
    };
    scene.add(layer.mesh);
  });
  const drips = createDrips({ tips: dripTips, time, groups: nearSpecs.length + 1, radiance: new THREE.Color(1.2, 1.3, 1.35) });
  scene.add(drips.mesh);
  const splashRandom = seeded(6061);
  for (const pool of pools) {
    for (let i = 0; i < 26; i++) {
      const a = splashRandom() * Math.PI * 2, d = Math.sqrt(splashRandom()) * 0.85;
      const x = pool.x + Math.cos(a) * pool.rx * d, z = pool.z + Math.sin(a) * pool.rz * d;
      splashPoints.push(x, groundY(pool.x, pool.z) + 0.04, z);
    }
  }
  for (let i = 0; i < 40; i++) {
    const z = 4 - splashRandom() * 14, x = (splashRandom() - 0.5) * 2.4;
    if (!inPool(x, z)) splashPoints.push(x, groundY(x, z) + 0.02, z);
  }
  const splashes = createRainSplashes({ points: splashPoints, time, size: 0.04, rate: 1.5, life: 0.22, jitter: 0.14, radiance: new THREE.Color(1.0, 1.08, 1.12), opacity: 0.55 });
  scene.add(splashes.mesh);

  // Without the HDR volume, a few soft mist cards keep some depth.
  const mistCanvas = document.createElement('canvas'); mistCanvas.width = mistCanvas.height = 128;
  const mistCtx = mistCanvas.getContext('2d')!;
  const gradient = mistCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(215,239,225,0.48)'); gradient.addColorStop(0.4, 'rgba(215,239,225,0.20)'); gradient.addColorStop(1, 'rgba(215,239,225,0)');
  mistCtx.fillStyle = gradient; mistCtx.fillRect(0, 0, 128, 128);
  const mistMap = new THREE.CanvasTexture(mistCanvas); mistMap.colorSpace = THREE.SRGBColorSpace;
  const mists: THREE.Mesh[] = [];
  for (let i = 0; i < 5; i++) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(12 + i * 2, 1.6), new THREE.MeshBasicMaterial({ map: mistMap, transparent: true, opacity: 0.12 + i * 0.017, depthWrite: false, side: THREE.DoubleSide }));
    mesh.position.set(i % 2 === 0 ? -2 : 2, 0.8, -5 - i * 5.7); mesh.visible = false; scene.add(mesh); mists.push(mesh);
  }

  const touchAt = nearClumps.map(() => -100);
  const rest = nearClumps.map(group => group.rotation.clone());
  let lastTouch = -100;
  return {
    interactionTargets: nearLeaves,
    interact(hit, now) {
      const index = nearLeaves.indexOf(hit.object as THREE.Mesh);
      if (index < 0 || now - lastTouch < 0.45) return;
      lastTouch = now; touchAt[index] = now;
      // The touched plant trembles and lets its gathered drops go; no camera movement or flash.
      drips.touch(index, now);
    },
    post: {
      exposure: 1.16, bloomStrength: 0.08, bloomThreshold: 0, aoStrength: 1, aoRadius: 0.7,
      saturation: 1.12, contrast: 1.16, shadowTint: [0.86, 0.98, 1.08], highlightTint: [1.02, 1.01, 0.97], vignette: 0.42, grain: 0.03,
    },
    prepare(renderer) { environment = bakeEnvironment(renderer, scene, sky, { intensity: 1.0, canopy: { color: new THREE.Color(0.05, 0.08, 0.06), cover: 0.42 } }); },
    // Layered mist: clear at the seat, banks between the near, middle and far trunks.
    createVolume: () => createWoodsVolume({
      canopy, toSun: TO_SKY, sun: new THREE.Color(0.75, 0.82, 0.86).multiplyScalar(0.4), ambient: new THREE.Color(0.26, 0.31, 0.36).multiplyScalar(0.5),
      haze: [0.006, 0.04, -0.2, 70], mist: [0.03, 0.8, 0.1, 0.05], anisotropy: 0.3, steps: 28,
      clear: [1.5, 6], banks: [[10, 3, 0.03, 2], [20, 5, 0.03, 2.6], [35, 8, 0.024, 3.2]],
    }),
    setPostActive(active) {
      mists.forEach(mist => { mist.visible = !active; });
      // Without the volume pass nothing dims the rain, so drop the compensation boost.
      rainLayers.forEach((layer, i) => layer.setBoost(active ? [1.3, 1.3, 1.1][i] : 1));
    },
    update(now) {
      time.value = now;
      for (let i = 0; i < nearClumps.length; i++) {
        const age = now - touchAt[i];
        const touch = age >= 0 && age < 4 ? Math.sin(age * 9) * Math.exp(-age * 2.2) * 0.05 : 0;
        // Rain beats on the leaves: a slow sway with small, quick nods.
        const sway = Math.sin(now * 0.5 + i * 1.7) * 0.008 + Math.sin(now * 2.3 + i * 3.1) * 0.003;
        nearClumps[i].rotation.set(rest[i].x + sway + touch, rest[i].y, rest[i].z + sway * 0.6 + touch * 0.4);
      }
      for (let i = 0; i < mists.length; i++) mists[i].position.x = (i % 2 === 0 ? -2 : 2) + Math.sin(now * 0.045 + i) * 1.1;
    },
    resize(aspect) {
      // Portrait keeps the plants and the wet path in the middle; widen the vertical field only modestly.
      camera.fov = aspect < 0.75 ? 63 : 57;
      camera.updateProjectionMatrix();
    },
    dispose() {
      environment?.dispose(); environment = null;
      rainLayers.forEach(layer => layer.dispose());
      drips.dispose(); splashes.dispose();
    },
  };
}
