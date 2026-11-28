import * as THREE from 'three';
import type { WorldContent } from '../types';
import { buildTree, concatGeometries, loftTube, type TreeBuild } from '../../shared/render/treeGeometry';
import { applyBarkSurface } from '../../shared/render/barkSurface';
import { applyFoliageShading, beforeMain, layerCanopy, withNoise } from '../../shared/render/foliageShading';
import { broadleafClusterTexture, fernFrondTexture, litterTexture, singleLeafTexture } from '../../shared/render/foliageTextures';
import { boulderGeometry } from '../../shared/render/rockGeometry';
import { applyRockSurface } from '../../shared/render/rockSurface';
import { seeded } from '../../shared/render/noise';
import {
  applyForestFloor, bakeEnvironment, createSky, createSun, createWoodsVolume, fernCrownGeometry, fernMaterial,
  instanced, litterGeometry, scatter, terrainGeometry, type Placement, type SkyOptions,
} from './woodsKit';

/** Overcast: the brightest sky is high above the opening ahead, so soft light falls into the clearing. */
const TO_SKY = new THREE.Vector3(-0.15, 0.92, -0.36).normalize();
const srgb = (h: number, s: number, l: number) => new THREE.Color().setHSL(h, s, l, THREE.SRGBColorSpace);

/** A folded, continuous leaf with an asymmetrical rolled margin; texture alpha cuts the final outline. */
function broadLeaf(width = 1, length = 2, bend = 0.16, rows = 34, columns = 14) {
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  for (let i = 0; i <= rows; i++) {
    const v = i / rows;
    const outline = Math.min(1, Math.pow(Math.sin(Math.PI * Math.min(1, v * 1.04 + 0.02)), 0.5) * 1.08);
    for (let j = 0; j <= columns; j++) {
      const u = (j / columns) * 2 - 1;
      const x = u * width * outline * 0.5;
      const y = Math.sin(v * Math.PI) * bend - u * u * width * 0.05 * outline
        + Math.sin(v * 17 + (u > 0 ? 0 : 1.4)) * Math.pow(Math.abs(u), 4) * 0.0035;
      positions.push(x + 0.035 * Math.sin(v * 3), y, v * length);
      uvs.push(0.5 + x / width, v);
    }
  }
  for (let i = 0; i < rows; i++) for (let j = 0; j < columns; j++) {
    const a = i * (columns + 1) + j, b = a + columns + 1;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices); geo.computeVertexNormals();
  return geo;
}

/** Rain as thin camera-facing streak quads animated entirely on the GPU. */
function createRain(count: number, seed: number, time: { value: number }, box: { x: [number, number]; z: [number, number]; height: number }) {
  const random = seeded(seed);
  const corners = [-1, 0, 1, 0, -1, 1, 1, 1];
  const rain = new Float32Array(count * 4 * 4), corner = new Float32Array(count * 4 * 2), indices: number[] = [];
  for (let i = 0; i < count; i++) {
    const x = box.x[0] + random() * (box.x[1] - box.x[0]);
    const z = box.z[0] + random() * (box.z[1] - box.z[0]);
    const speed = 6.5 + random() * 2.5, phase = random();
    for (let k = 0; k < 4; k++) {
      rain.set([x, z, speed, phase], (i * 4 + k) * 4);
      corner.set([corners[k * 2], corners[k * 2 + 1]], (i * 4 + k) * 2);
    }
    const a = i * 4;
    indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 4 * 3), 3));
  geometry.setAttribute('aRain', new THREE.BufferAttribute(rain, 4));
  geometry.setAttribute('aCorner', new THREE.BufferAttribute(corner, 2));
  geometry.setIndex(indices);
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    uniforms: { uTime: time, uHeight: { value: box.height }, uColor: { value: new THREE.Vector3(0.62, 0.7, 0.72) } },
    vertexShader: /* glsl */ `uniform float uTime; uniform float uHeight; attribute vec4 aRain; attribute vec2 aCorner; varying vec2 vCorner; varying float vDist;
void main() {
  float y = uHeight - mod(uTime * aRain.z + aRain.w * uHeight, uHeight) - 0.3;
  vec3 fall = normalize(vec3(0.06, -1.0, 0.025));
  vec3 head = vec3(aRain.x, y, aRain.y);
  // Streak length is the distance travelled during a short exposure.
  vec3 p = head - fall * aRain.z * 0.032 * aCorner.y;
  vec3 view = normalize(cameraPosition - p);
  vec3 side = normalize(cross(fall, view));
  float d = distance(cameraPosition, p);
  p += side * aCorner.x * (0.0022 + d * 0.0008);
  vCorner = aCorner; vDist = d;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,
    fragmentShader: /* glsl */ `uniform vec3 uColor; varying vec2 vCorner; varying float vDist;
void main() {
  float a = (1.0 - abs(vCorner.x)) * smoothstep(0.0, 0.35, vCorner.y) * (1.0 - smoothstep(0.7, 1.0, vCorner.y));
  a *= smoothstep(1.2, 3.5, vDist) * (1.0 - smoothstep(14.0, 26.0, vDist)) * 0.5;
  gl_FragColor = vec4(uColor, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 4;
  return mesh;
}

export function createRainyForest(scene: THREE.Scene, camera: THREE.PerspectiveCamera): WorldContent {
  const random = seeded(382849);
  const time = { value: 0 };
  let environment: THREE.WebGLRenderTarget | null = null;
  camera.position.set(0, 1.34, 5.5);
  camera.fov = 57;
  camera.lookAt(0.1, 1.18, -8);
  camera.updateProjectionMatrix();

  // Bright, even overcast; no sun disc, no flashes.
  const sky: SkyOptions = {
    zenith: new THREE.Color(0.86, 0.92, 0.95).multiplyScalar(1.5), horizon: new THREE.Color(0.7, 0.78, 0.78).multiplyScalar(1.15),
    ground: new THREE.Color(0.05, 0.06, 0.05), toSun: TO_SKY, sun: new THREE.Color(0, 0, 0), glow: new THREE.Color(0.9, 0.95, 1).multiplyScalar(0.35),
    clouds: { lit: new THREE.Color(1.5, 1.55, 1.6), shade: new THREE.Color(0.8, 0.86, 0.9), cover: 0.35, scale: 0.3, speed: 0.006, amount: 0.6 },
    wall: { color: new THREE.Color(0.19, 0.24, 0.24), height: 0.16 },
    time,
  };
  scene.add(createSky(sky, 120));
  scene.background = new THREE.Color(0.42, 0.5, 0.5);
  const fog = new THREE.FogExp2(0xffffff, 0.024);
  fog.color.setRGB(0.19, 0.24, 0.24);
  scene.fog = fog;
  createSun(scene, { toSun: TO_SKY, color: '#dde8ea', intensity: 2.6, target: new THREE.Vector3(0, 0, -4), box: [-14, 14, -12, 16], distance: 40, radius: 7, normalBias: 0.05 });

  const groundY = (x: number, z: number) => -0.09 + Math.max(0, Math.abs(x) - 1.5) * 0.023 + 0.08 * Math.sin(x * 1.9 + (z - 22) * 0.55) * Math.sin((z - 22) * 1.25 + x * 0.25);
  const canopy = layerCanopy({ key: 'rainy', toSun: TO_SKY, height: 14, scale: 0.06, cover: -0.15, softness: 0.6, floor: 0.32, time });
  const wind = { time, mode: 'attribute' as const, sway: 0.22, flutter: 0.03, direction: [0.6, -0.8] as [number, number], speed: 0.85 };

  // ---- Soaked trunks: dark, glossy bark with moss and run-off streaks ----------------------------
  const barkMaterial = applyFoliageShading(applyBarkSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.85 }), {
    key: 'rainy-bark', scale: 1.7, stretch: 5, depth: 0.03, plate: '#5d5a50', fissure: '#14120e', wetness: 0.85,
    lichen: { color: '#8b9a82', amount: 0.3 }, moss: { color: '#3f6420', amount: 0.85, below: 1.4, side: new THREE.Vector3(0.2, 0, 1), up: 0.9 },
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
    spread: 0.2, curl: 0.15, radial: i < 6 ? 26 : 10, ringsPerMetre: i < 6 ? 4 : 0.8, displace: i < 6 ? 0.025 : 0, barkScale: 1.7, barkStretch: 5, flex: 0.25,
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
  const bark = new THREE.Mesh(concatGeometries(barkParts), barkMaterial);
  bark.castShadow = true; bark.receiveShadow = true; scene.add(bark);
  barkParts.forEach(g => g.dispose());
  const canopyAtlas = broadleafClusterTexture({ seed: 52, palette: { base: '#3c6427', light: '#6d9440', dark: '#213d16', stem: '#3f3a2a' }, round: 0.45 });
  const canopyMaterial = applyFoliageShading(new THREE.MeshPhysicalMaterial({ map: canopyAtlas, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, alphaToCoverage: true, roughness: 0.38, clearcoat: 0.4, clearcoatRoughness: 0.2 }), {
    key: 'rainy-canopy', canopy, wind, sharedNormals: true, coverage: true, translucency: { tint: '#d8f09a', back: 0.35, forward: 0.5 },
  });
  const canopyLeaves = new THREE.Mesh(concatGeometries(trees.map(t => t.leaves).filter((g): g is THREE.BufferGeometry => !!g)), canopyMaterial);
  canopyLeaves.castShadow = true; canopyLeaves.receiveShadow = true; scene.add(canopyLeaves);
  trees.forEach(t => { t.bark.dispose(); t.leaves?.dispose(); });

  // ---- Wet floor, puddles and stones --------------------------------------------------------------
  const floorMaterial = applyFoliageShading(applyForestFloor(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.85 }), {
    key: 'rainy-floor', soil: '#2a2419', litter: '#58472c', litterDark: '#2c2217', moss: '#35521c', mossAmount: 0.55, wetness: 0.85, bump: 0.7, carpet: { cells: 10, aspect: 2.7, cover: 0.62 },
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
  const pools = [{ x: 0.05, z: 0.05, rx: 1.07, rz: 2.0 }, { x: -0.45, z: -4.7, rx: 1.35, rz: 2.3 }, { x: 1.1, z: -10.2, rx: 1.1, rz: 2.0 }, { x: -1.6, z: 2.7, rx: 0.6, rz: 0.8 }];
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

  const stoneMaterial = applyFoliageShading(applyRockSurface(new THREE.MeshStandardMaterial({ color: '#6b6e66', roughness: 0.8 }), {
    key: 'rainy-stone', scale: 2, bump: 1, wetness: 0.75, drips: 0.4, stainAmount: 0.15, moss: { color: '#3f6420', amount: 0.75 },
  }), { key: 'rainy-stone', canopy });
  const stoneRandom = seeded(4242);
  for (let i = 0; i < 16; i++) {
    const z = 4.2 - stoneRandom() * 22;
    let x = (stoneRandom() - 0.5) * 12;
    if (Math.abs(x) < 1.5) x += x > 0 ? 1.8 : -1.8;
    const s = 0.15 + stoneRandom() ** 2 * 0.5;
    const stone = new THREE.Mesh(boulderGeometry(i + 3, 3), stoneMaterial);
    stone.scale.set(s * 1.3, s * 0.65, s);
    stone.position.set(x, groundY(x, z) + s * 0.15, z);
    stone.rotation.y = stoneRandom() * 6.28;
    stone.castShadow = true; stone.receiveShadow = true;
    scene.add(stone);
  }

  // ---- Ferns and wet litter -----------------------------------------------------------------------
  const fernAtlas = fernFrondTexture({ seed: 17, palette: { base: '#3a7426', light: '#6faa3c', dark: '#1f4417', stem: '#4c6a2c' } });
  const fernWind = { time, mode: 'height' as const, height: 0.8, sway: 0.05, flutter: 0.02, direction: [0.6, -0.8] as [number, number], speed: 1 };
  const ferns = fernMaterial({ key: 'rainy', map: fernAtlas, canopy, wind: fernWind, roughness: 0.46 });
  const fernSpots: Placement[] = scatter(240, 91, r => {
    const z = 4.8 - r() * 33;
    let x = (r() - 0.5) * (13 + Math.max(0, -z) * 0.55);
    if (Math.abs(x) < 1.2 && z > -12) x += x < 0 ? -1.8 : 1.8;
    const s = 0.55 + r() * 0.9;
    return { x, y: groundY(x, z) + 0.02, z, yaw: r() * 6.28, scale: new THREE.Vector3(s * 1.1, s * (0.8 + r() * 0.3), s), color: srgb(0.22 + r() * 0.06, 0.5 + r() * 0.2, 0.36 + r() * 0.14) };
  });
  // Framing crowns close to the seat.
  for (const [x, z, s] of [[-1.25, 2.0, 1.1], [1.62, 2.4, 1.2], [-1.9, 3.3, 0.95], [1.2, 4.35, 0.9], [-0.86, 4.05, 0.7], [2.3, 3.2, 1.0]]) {
    fernSpots.push({ x, y: groundY(x, z) + 0.02, z, yaw: x * 2.3, scale: new THREE.Vector3(s, s * 0.85, s), color: srgb(0.24, 0.42, 0.4) });
  }
  const fernTemplates = [fernCrownGeometry(23, 10), fernCrownGeometry(29, 12), fernCrownGeometry(31, 9)];
  fernTemplates.forEach((template, i) => scene.add(instanced(template, ferns, fernSpots.filter((_, k) => k % 3 === i), { cast: true, receive: true })));
  const litterAtlas = litterTexture({ seed: 8, colors: ['#5a3d22', '#7a6234', '#3a2818', '#66502e'] });
  const litterMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ map: litterAtlas, alphaTest: 0.5, alphaToCoverage: true, side: THREE.DoubleSide, roughness: 0.35 }), { key: 'rainy-litter', canopy, coverage: true });
  for (let cell = 0; cell < 4; cell++) {
    const leaves = scatter(700, 500 + cell, r => {
      const x = (r() - 0.5) * 12, z = 5 - Math.pow(r(), 1.3) * 18;
      if (pools.some(p => ((x - p.x) / p.rx) ** 2 + ((z - p.z) / p.rz) ** 2 < 1)) return null;
      const s = 0.07 + r() * 0.08;
      return { x, y: groundY(x, z) + 0.012, z, yaw: r() * 6.28, tilt: (r() - 0.5) * 0.2, scale: new THREE.Vector3(s, s, s * 1.4), color: srgb(0.08, 0.2, 0.45 + r() * 0.3) };
    });
    scene.add(instanced(litterGeometry(cell), litterMaterial, leaves, { cast: false, receive: true }));
  }

  // ---- The shelter: broad, beaded leaves overhead on real stalks ---------------------------------
  const shelter = new THREE.Group(); scene.add(shelter);
  const shelterTexture = singleLeafTexture({ seed: 44, palette: { base: '#3b6a2a', light: '#77a14a', dark: '#1f3d17', stem: '#3d5a2c' }, width: 512, height: 1024, round: 0.18, fill: 0.4 });
  const leafMaterial = applyFoliageShading(new THREE.MeshPhysicalMaterial({ map: shelterTexture, alphaTest: 0.5, alphaToCoverage: true, side: THREE.DoubleSide, roughness: 0.4, clearcoat: 0.45, clearcoatRoughness: 0.12 }), {
    key: 'rainy-shelter', canopy, coverage: true, translucency: { tint: '#c8f08a', back: 0.38, forward: 0.6 },
  });
  const nearLeaves: THREE.Mesh[] = [];
  const leafRest: THREE.Euler[] = [];
  const leafSpecifications = [
    { x: -2.48, y: 2.69, z: 0.8, width: 1.75, length: 3.15, yaw: 0.45, roll: -0.18, pitch: 0.10 },
    { x: 2.25, y: 2.84, z: 0.15, width: 1.62, length: 3.15, yaw: -0.42, roll: 0.21, pitch: 0.06 },
    { x: -0.6, y: 3.1, z: -0.25, width: 1.30, length: 2.8, yaw: 0.25, roll: -0.08, pitch: 0.04 },
    { x: 1.7, y: 0.90, z: 2.7, width: 1.28, length: 1.7, yaw: -1.8, roll: 0.55, pitch: -0.12 },
    { x: -1.7, y: 0.65, z: 3.2, width: 0.86, length: 1.7, yaw: 1.5, roll: -0.55, pitch: -0.1 },
  ];
  const petioleMaterial = applyFoliageShading(new THREE.MeshPhysicalMaterial({ color: '#3b5a33', roughness: 0.3, clearcoat: 0.6 }), { key: 'rainy-petiole', canopy });
  for (const spec of leafSpecifications) {
    const mesh = new THREE.Mesh(broadLeaf(spec.width, spec.length, 0.14), leafMaterial);
    mesh.position.set(spec.x, spec.y, spec.z);
    mesh.rotation.set(spec.pitch, spec.yaw, spec.roll);
    mesh.castShadow = true; mesh.receiveShadow = true;
    mesh.userData.interaction = 'leaf';
    shelter.add(mesh); nearLeaves.push(mesh); leafRest.push(mesh.rotation.clone());
    const stalk = new THREE.CatmullRomCurve3([
      new THREE.Vector3(spec.x * 1.15, groundY(spec.x * 1.15, spec.z - 0.4), spec.z - 0.4),
      new THREE.Vector3(spec.x * 1.13, spec.y * 0.45, spec.z - 0.5),
      new THREE.Vector3(spec.x * 1.08, spec.y * 0.82, spec.z - 0.25),
      new THREE.Vector3(spec.x, spec.y, spec.z),
    ]);
    const stem = new THREE.Mesh(new THREE.TubeGeometry(stalk, 24, 0.024, 8, false), petioleMaterial);
    stem.castShadow = true; stem.receiveShadow = true; shelter.add(stem);
  }

  // Beads of water on the leaves and drops falling from them.
  const dropMaterial = new THREE.MeshPhysicalMaterial({ color: '#7d918c', roughness: 0.02, metalness: 0, transparent: true, opacity: 0.45, clearcoat: 1, clearcoatRoughness: 0.02, specularIntensity: 1 });
  const beads = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 10, 8), dropMaterial, 60);
  const beadBases: THREE.Vector3[] = [];
  const beadAttachments: Array<{ leaf: number; point: THREE.Vector3; size: number }> = [];
  const dummy = new THREE.Object3D();
  shelter.updateMatrixWorld(true);
  for (let i = 0; i < 60; i++) {
    const leaf = i % 3, spec = leafSpecifications[leaf];
    const t = 0.3 + random() * 0.62;
    const across = (random() - 0.5) * 0.7;
    const local = new THREE.Vector3(across * spec.width * Math.sin(Math.PI * t) * 0.5, Math.sin(t * Math.PI) * 0.14 - (across * across) * spec.width * 0.05 + 0.012, t * spec.length);
    const s = 0.007 + random() * 0.007;
    beadAttachments.push({ leaf, point: local.clone(), size: s });
    beadBases.push(local.applyMatrix4(nearLeaves[leaf].matrixWorld));
  }
  scene.add(beads);
  const fallingCount = 60;
  const falling = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), dropMaterial, fallingCount);
  const fallingOrigins: THREE.Vector3[] = [];
  const fallingStarts = new Float32Array(fallingCount);
  // Leaf tips drip steadily, each on its own rhythm.
  const tips = leafSpecifications.slice(0, 3).map((spec, i) => new THREE.Vector3(0, Math.sin(0.98 * Math.PI) * 0.14 - 0.01, spec.length * 0.99).applyMatrix4(nearLeaves[i].matrixWorld));
  for (let i = 0; i < fallingCount; i++) {
    fallingOrigins.push((i < 24 ? tips[i % 3] : beadBases[i % beadBases.length]).clone());
    fallingStarts[i] = -random() * 5;
    dummy.position.copy(fallingOrigins[i]); dummy.scale.setScalar(0); dummy.updateMatrix(); falling.setMatrixAt(i, dummy.matrix);
  }
  falling.frustumCulled = false; scene.add(falling);

  const rain = createRain(4200, 7, time, { x: [-11, 11], z: [-26, -1.2], height: 12 });
  scene.add(rain);

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

  let touchedLeaf = -1, touchAt = -100, nextDrop = 0;
  return {
    interactionTargets: nearLeaves,
    interact(hit, now) {
      const index = nearLeaves.indexOf(hit.object as THREE.Mesh);
      if (index < 0 || now - touchAt < 0.45) return;
      touchedLeaf = index; touchAt = now;
      // A touch releases only a bounded handful of beads; no camera movement or flash.
      for (let j = 0; j < 12; j++) {
        const slot = 24 + ((nextDrop++) % (fallingCount - 24));
        fallingOrigins[slot].copy(hit.point).add(new THREE.Vector3((random() - 0.5) * 0.32, 0.01, (random() - 0.5) * 0.3));
        fallingStarts[slot] = now + j * 0.027;
      }
    },
    post: {
      exposure: 1.12, bloomStrength: 0.08, bloomThreshold: 0, aoStrength: 1, aoRadius: 0.7,
      saturation: 1.02, contrast: 1.12, shadowTint: [0.88, 0.99, 1.05], highlightTint: [1.0, 1.02, 1.02], vignette: 0.42, grain: 0.03,
    },
    prepare(renderer) { environment = bakeEnvironment(renderer, scene, sky, { intensity: 0.95, canopy: { color: new THREE.Color(0.05, 0.08, 0.06), cover: 0.6 } }); },
    createVolume: () => createWoodsVolume({
      canopy, toSun: TO_SKY, sun: new THREE.Color(0.75, 0.82, 0.85).multiplyScalar(0.4), ambient: new THREE.Color(0.25, 0.3, 0.31).multiplyScalar(0.45),
      haze: [0.008, 0.03, -0.2, 60], mist: [0.028, 0.9, 0.1, 0.05], anisotropy: 0.3, steps: 28,
    }),
    setPostActive(active) { mists.forEach(mist => { mist.visible = !active; }); },
    update(now, dt) {
      time.value = now;
      for (let i = 0; i < nearLeaves.length; i++) {
        const sway = Math.sin(now * 0.44 + i * 1.7) * 0.010;
        const age = now - touchAt;
        const touch = i === touchedLeaf && age < 5 ? Math.sin(age * 8) * Math.exp(-age * 1.8) * 0.058 : 0;
        nearLeaves[i].rotation.copy(leafRest[i]); nearLeaves[i].rotation.x += sway + touch;
      }
      shelter.updateMatrixWorld(true);
      for (let i = 0; i < beadAttachments.length; i++) {
        const attachment = beadAttachments[i];
        beadBases[i].copy(attachment.point).applyMatrix4(nearLeaves[attachment.leaf].matrixWorld);
        dummy.position.copy(beadBases[i]); dummy.rotation.set(0, 0, 0);
        dummy.scale.set(attachment.size, attachment.size * 0.7, attachment.size);
        dummy.updateMatrix(); beads.setMatrixAt(i, dummy.matrix);
      }
      beads.instanceMatrix.needsUpdate = true;
      for (let i = 0; i < mists.length; i++) mists[i].position.x = (i % 2 === 0 ? -2 : 2) + Math.sin(now * 0.045 + i) * 1.1;
      for (let i = 0; i < fallingCount; i++) {
        if (dt > 0 && now - fallingStarts[i] > 2.2 + (i % 7) * 0.4) {
          fallingStarts[i] = now + 0.6 + random() * 3.4;
          if (i < 24) fallingOrigins[i].copy(tips[i % 3]); else fallingOrigins[i].copy(beadBases[i % beadBases.length]);
        }
        const age = now - fallingStarts[i];
        const y = fallingOrigins[i].y - age * age * 4.9;
        if (age >= 0 && age < 1.8 && y > groundY(fallingOrigins[i].x, fallingOrigins[i].z) + 0.03) {
          dummy.position.copy(fallingOrigins[i]); dummy.position.y = y;
          dummy.scale.set(0.006, 0.01 + Math.min(0.022, age * 0.05), 0.006);
        } else dummy.scale.setScalar(0);
        dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); falling.setMatrixAt(i, dummy.matrix);
      }
      falling.instanceMatrix.needsUpdate = true;
    },
    resize(aspect) {
      // Portrait keeps the leaf and wet path in the middle; widen the vertical field only modestly.
      camera.fov = aspect < 0.75 ? 63 : 57;
      camera.updateProjectionMatrix();
    },
    dispose() { environment?.dispose(); environment = null; },
  };
}
