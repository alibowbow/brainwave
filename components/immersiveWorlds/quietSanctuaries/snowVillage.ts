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
import { createDoorLamps, createPlasterMaterial, createWoodMaterial, doorLampUniforms, GLSL_DOOR_LAMPS, GLSL_VILLAGE_GROUND, interiorTexture } from './villageMaterials';
import { createCloudDeck } from './atmosphere';

/*
 * 눈 내리는 밤 — an original, code-only winter village seen from under a porch eave.
 * A low moon to the front-left is the cold key behind a broken deck of snow cloud;
 * warm HDR windows throw their own shapes onto the snow and door lanterns wash the
 * weathered limewash and hand-hewn timbers; two lane lamps and the porch lantern glow
 * in the snowy air. A thick snow load sags the old roofs, curls over the eaves into
 * rounded cornices hung with icicles and rolls over the gable ends. Snow glints,
 * scatters blue in shade, settles on every upward face and is trodden in the lane by
 * boots and sled runners between shovelled berms. Snow falls at four depths on the
 * GPU; chimney smoke drifts slowly over the roofs; the far forest and ridges fade
 * into moonlit haze. No external assets.
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

/**
 * The settled snow surface: the lane and banks, wind-shaped drifts away from the trodden lane,
 * and lumpy berms where the lane was shovelled clear.
 */
const terrain = (x: number, z: number) => {
  const away = Math.abs(x - laneCenter(z));
  const drift = fbm3(x * .21, z * .21, 1.3, 4) * .09 + fbm3(x * .9, z * .9, 4.4, 2) * .02;
  const berm = Math.exp(-Math.pow((away - 1.55) / .38, 2)) * (.16 + .1 * fbm3(x * .7, z * .7, 9.1, 2) + .05 * Math.sin(z * 1.9 + x)) * THREE.MathUtils.smoothstep(-z, -1.5, 3);
  return groundHeight(x, z) + drift * THREE.MathUtils.smoothstep(away, .4, 2.2) + berm;
};

/**
 * Footprints and sled runners in the lane, as a height field for the snow shader (needs
 * villageLane from GLSL_VILLAGE_GROUND). Two walkers' staggered prints with pushed-up rims,
 * half filled by new snow, and a sled's twin runner grooves wandering along the lane.
 */
const GLSL_TRACKS = /* glsl */ `
float trackFoot(vec3 p, float path, float stride, float phase, float seed, inout float print, inout float rim) {
  float along = (p.z + phase) / stride;
  float cell = floor(along);
  vec3 r = bwHash3(vec3(cell, seed, 7.0));
  float side = mod(cell, 2.0) < 1.0 ? -1.0 : 1.0;
  vec2 centre = vec2(path + side * .1 + (r.x - .5) * .05, (cell + .5 + (r.y - .5) * .12) * stride - phase);
  vec2 local = vec2(p.x, p.z) - centre;
  float a = side * .12 + (r.z - .5) * .2;
  local = vec2(cos(a) * local.x - sin(a) * local.y, sin(a) * local.x + cos(a) * local.y);
  // A boot print: wider at the toe than the heel.
  float width = .052 + .012 * smoothstep(-.12, .1, local.y);
  float d = length(local / vec2(width, .135));
  float inPrint = 1.0 - smoothstep(.72, 1.02, d);
  float lip = exp(-pow((d - 1.2) / .3, 2.0));
  float fill = .45 + .55 * r.x;
  print = max(print, inPrint * fill);
  rim = max(rim, lip * fill);
  return -.022 * inPrint * fill + .0025 * lip * fill;
}
float villageTracks(vec3 p, out float print, out float rim) {
  print = 0.0; rim = 0.0;
  if (p.z > -1.6 || p.z < -46.0) return 0.0;
  float lane = villageLane(p.z);
  float fade = smoothstep(-46.0, -30.0, p.z) * smoothstep(-1.6, -3.0, p.z);
  float h = 0.0;
  // Sled runners: two narrow grooves 0.42 m apart, drifting gently across the lane.
  float sled = lane + .45 + sin(p.z * .19) * .3 + sin(p.z * .061 + 1.0) * .25;
  float runner = min(abs(p.x - sled + .21), abs(p.x - sled - .21));
  float groove = exp(-pow(runner / .03, 2.0));
  h -= .014 * groove;
  print = max(print, groove * .8);
  // Two walkers, one each side of the sled track.
  float w1 = lane - .55 + sin(p.z * .33) * .12;
  float w2 = lane + 1.05 + sin(p.z * .27 + 2.0) * .1;
  if (abs(p.x - w1) < .4) h += trackFoot(p, w1, .36, 0.0, 1.0, print, rim);
  if (abs(p.x - w2) < .4) h += trackFoot(p, w2, .33, .17, 2.0, print, rim);
  print *= fade; rim *= fade;
  return h * fade;
}
`;

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
    stars: { count: 2600, seed: 4411, intensity: 0.55, galacticFraction: 0.2, twinkle: 0.5 },
  });
  scene.add(sky.group);
  // It is snowing: a broken deck of snow cloud drifts slowly over the stars, its thin edges
  // silvered near the moon and faintly warmed from below by the village.
  const clouds = createCloudDeck({ noise, moonDirection: moonDir, base: new THREE.Color(.05, .058, .078), moonLight: new THREE.Color(.22, .27, .36), townGlow: new THREE.Color(.07, .042, .022), cover: .5 });
  scene.add(clouds.mesh);
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
  const doorLamps = createDoorLamps();
  let doorLampCount = 0;
  const laneTrodden = `(1.0 - smoothstep(.55, 1.25, abs(p.x - villageLane(p.z)))) * .55 + exp(-pow((abs(p.x - villageLane(p.z)) - .5) / .11, 2.0)) * .45 * smoothstep(-60.0, -6.0, p.z)`;
  const groundSnow = createSnowMaterial({ key: 'village-ground', trodden: laneTrodden, sparkle: 30, ripple: 1, sparkleDensity: .12 });
  const capSnow = createSnowMaterial({ key: 'village-cap', sparkle: 22, ripple: .45, sparkleDensity: .12 });
  const railSnowMaterial = createSnowMaterial({ key: 'village-rail', sparkle: 34, ripple: .35, sparkleScale: 240, sparkleDensity: .16 });
  // Windows cast their light onto the ground snow (analytic, no extra light loops): a soft glow
  // plus the window's own shape, mullion shadows included, thrown from a lamp inside the room.
  const spillPos = Array.from({ length: 8 }, () => v3(0, -100, 0));
  const spillDir = Array.from({ length: 8 }, () => v3(0, 0, 1));
  const spillColor = Array.from({ length: 8 }, () => v3(0, 0, 0));
  const spillSize = Array.from({ length: 8 }, () => new THREE.Vector2(.3, .4));
  let spillCount = 0;
  {
    const previous = groundSnow.onBeforeCompile;
    groundSnow.onBeforeCompile = (shader, renderer) => {
      previous.call(groundSnow, shader, renderer);
      shader.uniforms.uSpillPos = { value: spillPos };
      shader.uniforms.uSpillDir = { value: spillDir };
      shader.uniforms.uSpillColor = { value: spillColor };
      shader.uniforms.uSpillSize = { value: spillSize };
      Object.assign(shader.uniforms, doorLampUniforms(doorLamps));
      shader.fragmentShader = shader.fragmentShader
        .replace('void main() {', `${GLSL_VILLAGE_GROUND}
uniform vec3 uSpillPos[8]; uniform vec3 uSpillDir[8]; uniform vec3 uSpillColor[8]; uniform vec2 uSpillSize[8];
${GLSL_DOOR_LAMPS}
${GLSL_TRACKS}
void main() {`)
        .replace('#include <color_fragment>', `#include <color_fragment>
float trackPrint = 0.0, trackRim = 0.0;
float trackHeight = villageTracks(vTranslucentWorld, trackPrint, trackRim);
// Packed snow inside prints and runners is a little greyer and bluer.
diffuseColor.rgb *= mix(vec3(1.0), vec3(.88, .9, .95), trackPrint);
`)
        .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = bwSurfaceBump(-vViewPosition, normal, trackHeight * clamp(1.6 - length(fwidth(vTranslucentWorld)) * 14.0, 0.0, 1.0), 1.0);
`)
        .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
{
  vec3 n = normalize(inverseTransformDirection(normal, viewMatrix));
  vec3 spill = vec3(0.0);
  for (int i = 0; i < 8; i++) {
    vec3 c = uSpillPos[i];
    vec3 w = uSpillDir[i];
    vec3 d = c - vTranslucentWorld;
    float d2 = dot(d, d);
    vec3 l = d * inversesqrt(d2);
    float facing = max(dot(-l, w) * .8 + .2, 0.0);
    // Soft glow around the window.
    vec3 glow = uSpillColor[i] * facing * max(dot(n, l), 0.0) / (d2 + .35);
    // The lit window pane projected from a ceiling lamp inside the room onto the snow just outside.
    vec3 lamp = c - w * 1.0 + vec3(0.0, .95, 0.0);
    vec3 toP = vTranslucentWorld - lamp;
    float denom = dot(toP, w);
    float shape = 0.0;
    if (denom > 1e-3) {
      vec3 q = lamp + toP * (dot(c - lamp, w) / denom) - c;
      vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), w));
      vec2 local = vec2(dot(q, right), q.y);
      float blur = .02 + .05 * sqrt(d2);
      vec2 hs = uSpillSize[i];
      float inside = (1.0 - smoothstep(hs.x - blur, hs.x + blur, abs(local.x))) * (1.0 - smoothstep(hs.y - blur, hs.y + blur, abs(local.y)));
      float mullion = smoothstep(.012, .03 + blur * .5, abs(local.x)) * smoothstep(.01, .026 + blur * .5, abs(local.y - hs.y * .06));
      vec3 lv = normalize(-toP);
      shape = inside * mix(.2, 1.0, mullion) * max(dot(n, lv), 0.0) * 3.2 / (dot(toP, toP) * .5 + .4);
    }
    spill += glow * .55 + uSpillColor[i] * shape;
  }
  spill += doorLampWash(vTranslucentWorld, n);
  reflectedLight.directDiffuse += spill * BRDF_Lambert(material.diffuseContribution);
}`);
    };
  }
  const covered = <T extends THREE.MeshStandardMaterial>(material: T, key: string, threshold = .6, amount = 1) => applySnowCover(material, { key, threshold, amount });
  const timber = covered(createWoodMaterial('#7d6a57', { key: 'timber', weathered: .55, lamps: doorLamps }), 'timber');
  const darkWood = covered(createWoodMaterial('#584638', { key: 'dark-wood', weathered: .45, lamps: doorLamps }), 'dark-wood');
  const railWood = covered(createWoodMaterial('#8b6c52', { key: 'rail-wood', weathered: .3, bump: 1.3 }), 'rail-wood', .7, .85);
  const porchWood = createWoodMaterial('#6d5644', { key: 'porch-wood', weathered: .2, bump: 1.2 });
  // x, z, width, depth, wall, pitch, rotation, warm (lit), variant: one row of the village lane.
  const houseSpecs: Array<[number, number, number, number, number, number, number, boolean, number]> = [
    [-4.1, -8, 3.5, 4.3, 2.6, 1.62, 0.1, true, 1],
    [4.45, -10.3, 4.5, 5.1, 3.35, 1.8, -0.18, false, 2],
    [-5.8, -17.4, 4.2, 4.7, 2.65, 1.8, 0.15, false, 3],
    [5.5, -21.1, 3.25, 4.7, 2.25, 1.75, -0.06, true, 4],
    [-4.7, -29.7, 3.55, 4, 2.72, 1.57, -0.09, true, 5],
    [4.1, -35.5, 4.2, 4.7, 3.05, 1.75, -0.2, false, 6],
    [-4.55, -42, 3.4, 4.25, 2.4, 1.65, 0.19, false, 7],
    [0.6, -51, 3.6, 4.3, 2.6, 1.67, -0.08, true, 8],
  ];
  // Every house its own limewash: ochre, rose, cream, grey-green, buff; all aged and uneven.
  const houseTints = ['#ffe2bc', '#f6d6cc', '#f1ede2', '#dfe4d8', '#ffd9a8', '#e9e2d6', '#f8dcc4', '#e6dcd0'];
  const plaster = createPlasterMaterial('#cbbfab', {
    key: 'plaster', grime: '#4d4a42', lamps: doorLamps,
    houses: houseSpecs.map(([x, z], i) => ({ centre: v3(x, 0, z), tint: houseTints[i] })),
  });
  const stone = covered(createRockMaterial('#7b766e', { key: 'village-stone', scale: 2.2, bump: .9, drips: .1, stainAmount: .2, strata: .1 }), 'village-stone', .55);
  const slate = covered(new THREE.MeshStandardMaterial({ color: '#3c434c', roughness: .62 }), 'slate', .5);
  const brass = new THREE.MeshStandardMaterial({ color: '#b08448', metalness: 1, roughness: .32 });
  const iron = covered(new THREE.MeshStandardMaterial({ color: '#23272b', metalness: .65, roughness: .5 }), 'iron', .6);
  const ice = new THREE.MeshStandardMaterial({ color: '#dfe9f2', roughness: .08, metalness: 0, envMapIntensity: 1.4 });
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
  const sprigGeometry = new THREE.IcosahedronGeometry(1, 1);
  const sprigMaterial = applySnowCover(new THREE.MeshStandardMaterial({ color: '#1f3326', roughness: .9 }), { key: 'village-sprig', threshold: .5, amount: .7, scale: 12 });
  const doorGlass = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, .66, .34).multiplyScalar(6) });
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
  /**
   * A hand-hewn timber from a to b: bowed a little along its length, slightly uneven in
   * section and never perfectly square to the wall. Width runs in the wall plane.
   */
  const timberBetween = (a: THREE.Vector3, b: THREE.Vector3, width: number, depth: number, mat: THREE.Material, parent: THREE.Object3D = staticRoot, bow = .014) => {
    const length = a.distanceTo(b);
    const geo = new THREE.BoxGeometry(width, length, depth, 1, Math.max(2, Math.round(length * 3)), 1);
    const pos = geo.getAttribute('position');
    const seed = random() * 40, sign = random() > .5 ? 1 : -1, bend = bow * (.5 + random());
    for (let i = 0; i < pos.count; i++) {
      const t = pos.getY(i) / length + .5;
      const swell = 1 + noise3(t * 3 + seed, pos.getX(i) * 9, pos.getZ(i) * 9) * .12;
      pos.setX(i, pos.getX(i) * swell + sign * Math.sin(Math.PI * t) * bend + noise3(t * 5, seed, 1.3) * .004);
      pos.setZ(i, pos.getZ(i) * swell);
    }
    geo.computeVertexNormals();
    const m = mesh(geo, mat, parent);
    m.position.copy(a).add(b).multiplyScalar(.5);
    m.quaternion.setFromUnitVectors(v3(0, 1, 0), b.clone().sub(a).normalize());
    m.rotateY((random() - .5) * .04);
    return m;
  };
  /** A timber given as a box: its longest side becomes the length. */
  const timberBox = (x: number, y: number, z: number, w: number, h: number, d: number, mat: THREE.Material, parent: THREE.Object3D = staticRoot, bow = .014) => {
    const tilt = (random() - .5) * .025;
    if (h >= w && h >= d) return timberBetween(v3(x - tilt * h / 2, y - h / 2, z), v3(x + tilt * h / 2, y + h / 2, z), w, d, mat, parent, bow);
    if (w >= d) return timberBetween(v3(x - w / 2, y - tilt * w / 2, z), v3(x + w / 2, y + tilt * w / 2, z), h, d, mat, parent, bow);
    return timberBetween(v3(x, y - tilt * d / 2, z - d / 2), v3(x, y + tilt * d / 2, z + d / 2), w, h, mat, parent, bow);
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
  /** Ridge sag of an old roof between its gables: most at the ridge, none at the gable ends. */
  const roofSag = (z: number, u: number, depth: number) => .055 * Math.max(0, 1 - Math.pow(z / ((depth + .7) / 2 + .2), 2)) * (1 - .7 * u);
  const roofHalf = (width: number, depth: number, wall: number, pitch: number, side: number, mat: THREE.Material, parent: THREE.Group) => {
    const cols = 8, rows = 8;
    const points: number[] = [], uv: number[] = [], ix: number[] = [];
    for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++) {
      const u = c / cols, v = r / rows;
      const x = side * (u * (width / 2 + 0.3));
      const z = (v - 0.5) * (depth + 0.7);
      const y = wall + pitch * (1 - u) - roofSag(z, u, depth);
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
  };
  /**
   * The snow load on one roof half, one continuous surface: a thick pack (thinner where the
   * wind scours the ridge) that creeps past the eave and curls over it in a soft, rounded
   * cornice, sagging between rafters. Returns the cornice's underside (house-local) for icicles.
   */
  const roofSnow = (width: number, depth: number, base: number, pitch: number, side: number, parent: THREE.Group, seed: number) => {
    const eave = width / 2 + .3, half = (depth + .7) / 2 + .03, slope = pitch / eave;
    const rows = 30;
    const profiles: Array<Array<[number, number]>> = [];
    const drips: THREE.Vector3[] = [];
    for (let r = 0; r <= rows; r++) {
      const z = (r / rows * 2 - 1) * half;
      const end = Math.sqrt(THREE.MathUtils.clamp((half - Math.abs(z)) / .32, 0, 1));
      const rafter = .5 + .5 * Math.sin(z * 5.5 + seed);
      const pack = (.3 + .07 * noise3(z * .9 + seed, side * 3, seed)) * (.78 + .22 * end);
      const ridge = (.17 + .03 * noise3(z * .9 + seed, 0, seed)) * (.78 + .22 * end);
      const profile: Array<[number, number]> = [];
      const thickness = (u: number) => THREE.MathUtils.lerp(ridge, pack, THREE.MathUtils.smoothstep(u, 0, .3)) + noise3(u * 3 + seed, z * 2, seed + side) * .025 * end;
      for (let i = 0; i <= 14; i++) {
        const u = i / 14;
        profile.push([u * eave, base + pitch * (1 - u) + thickness(u)]);
      }
      // Creep past the eave, then curl over in a rounded nose.
      const out = (.1 + .07 * noise3(z * 1.4 + seed, 2 + side, seed) + .03 * rafter) * end;
      const topEave = base + thickness(1);
      for (let k = 1; k <= 3; k++) {
        const f = k / 3;
        profile.push([eave + out * f, topEave - slope * out * f * (1 + .6 * f)]);
      }
      const tipX = eave + out, tipY = topEave - slope * out * 1.3;
      const radius = Math.max(.03, pack * (.27 + .1 * rafter) * end);
      for (let k = 1; k <= 9; k++) {
        const a = Math.PI / 2 - Math.PI * k / 9;
        profile.push([tipX + Math.cos(a) * radius * (.9 + .25 * end), tipY - radius + Math.sin(a) * radius]);
      }
      const bottomY = tipY - 2 * radius;
      profile.push([tipX - radius * .3, bottomY + .01], [eave + .02, Math.min(base - .04, bottomY + radius * .6)], [eave - .06, base - .01]);
      profiles.push(profile);
      if (end > .6 && r % 2 === 0) drips.push(v3(side * tipX, bottomY + .01, z));
    }
    const count = profiles[0].length;
    const positions: number[] = [], indices: number[] = [];
    const slateAt = (x: number) => base + pitch * (1 - x / eave);
    const ring = (profile: Array<[number, number]>, z: number) => { for (const [x, y] of profile) positions.push(side * x, y, z); };
    const capRows = 5;
    // Rounded ends: the pack rolls over the gable edge and down onto the bargeboard.
    const cap = (profile: Array<[number, number]>, k: number): Array<[number, number]> => profile.map(([x, y]) => {
      const f = Math.pow(k / capRows, 1.4);
      return [x, THREE.MathUtils.lerp(y, slateAt(Math.min(x, eave)) - .06, f)];
    });
    for (let k = capRows; k >= 1; k--) ring(cap(profiles[0], k), -half - .03 * k * (1 - k / (capRows * 2.2)));
    for (let r = 0; r <= rows; r++) ring(profiles[r], (r / rows * 2 - 1) * half);
    for (let k = 1; k <= capRows; k++) ring(cap(profiles[rows], k), half + .03 * k * (1 - k / (capRows * 2.2)));
    const totalRows = rows + capRows * 2;
    for (let i = 0; i < positions.length; i += 3) positions[i + 1] -= roofSag(positions[i + 2], Math.min(1, Math.abs(positions[i]) / eave), depth);
    for (let r = 0; r < totalRows; r++) for (let i = 0; i < count - 1; i++) {
      const a = r * count + i, b = a + 1, c = a + count, d = c + 1;
      if (side > 0) indices.push(a, c, b, b, c, d); else indices.push(a, b, c, b, d, c);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices); geo.computeVertexNormals();
    mesh(geo, capSnow, parent);
    return drips;
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
      spillPos[spillCount].copy(world); spillDir[spillCount].copy(out); spillSize[spillCount].set(w / 2, h / 2);
      spillColor[spillCount].set(1, .6, .28).multiplyScalar((on > .65 ? 2.6 : 1.2) * w * h);
      spillCount++;
    }
  };
  const chimneys: THREE.Vector3[] = [];
  const windowGlows: THREE.Vector3[] = [];
  const eaveDrips: THREE.Vector3[] = [];
  const doorGlows: THREE.Vector3[] = [];
  const house = (x: number, z: number, w: number, d: number, wall: number, pitch: number, rotation: number, warm: boolean, variant: number) => {
    const group = new THREE.Group(); group.position.set(x, terrain(x, z) - 0.12, z); group.rotation.y = rotation; staticRoot.add(group);
    group.updateMatrixWorld(true);
    const housePlaster = plaster;
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
    // Half-timbering on the gable end, the roofs and their snow load.
    for (const s of [-1, 1]) {
      roofHalf(w, d, wall + 0.1, pitch, s, slate, group);
      for (const drip of roofSnow(w, d, wall + 0.1, pitch, s, group, variant * 3.1 + s)) eaveDrips.push(group.localToWorld(drip));
      timberBox(s * (w / 2 - 0.065), wall / 2 + 0.13, d / 2 + 0.006, 0.13, wall, 0.15, timber, group);
      timberBox(s * (w / 2 + 0.24), wall + 0.04, 0, 0.13, 0.16, d + 0.65, darkWood, group, .02);
      timberBetween(v3(s * (w / 2 + 0.28), wall + 0.11, d / 2 + 0.35), v3(0, wall + pitch + 0.11, d / 2 + 0.35), 0.13, 0.11, darkWood, group, .018);
    }
    timberBox(0, wall + 0.05, d / 2 + 0.015, w, 0.135, 0.15, timber, group, .018);
    timberBox(0, wall + pitch * 0.45, d / 2 + 0.065, 0.083, pitch * 0.92, 0.095, timber, group);
    // Half-timbering that respects the openings: a sill rail broken by the door, studs
    // beside the window and door, and raked struts in the gable.
    const railY = mainY - 0.62;
    const doorLeft = doorX - 0.47, doorRight = doorX + 0.47;
    if (doorLeft - (-w / 2) > .2) timberBox((-w / 2 + doorLeft) / 2, railY, d / 2 + 0.012, doorLeft + w / 2, 0.1, 0.1, darkWood, group);
    if (w / 2 - doorRight > .2) timberBox((w / 2 + doorRight) / 2, railY, d / 2 + 0.012, w / 2 - doorRight, 0.1, 0.1, darkWood, group);
    for (const sx of [-1, 1]) {
      const studX = -doorX + sx * (mainW / 2 + 0.2);
      if (Math.abs(studX - doorX) > .55 && Math.abs(studX) < w / 2 - .2) timberBox(studX, (railY + wall) / 2, d / 2 + 0.01, 0.09, wall - railY, 0.09, darkWood, group);
      timberBox(doorX + sx * 0.47, (0.12 + wall) / 2, d / 2 + 0.01, 0.1, wall - 0.12, 0.1, darkWood, group);
      timberBetween(v3(sx * w * .4, wall + .14, d / 2 + .03), v3(sx * w * .07, wall + pitch * .6, d / 2 + .03), .085, .08, darkWood, group, .012);
    }
    // Deep entrance, weathered board door, and an uneven stone threshold under snow.
    box(doorX, 0.825, d / 2 - 0.27, 0.73, 1.35, 0.07, darkWood, group);
    for (let i = 0; i < 5; i++) box(doorX - 0.29 + i * 0.145, 0.825, d / 2 - 0.217, 0.137, 1.31, 0.025, i % 2 ? timber : darkWood, group);
    box(doorX + 0.23, 0.86, d / 2 - 0.172, 0.024, 0.07, 0.035, brass, group);
    const step = mesh(new RoundedBoxGeometry(1.02, 0.17, 0.65, 2, 0.035), stone, group); step.position.set(doorX, 0.085, d / 2 + 0.22);
    // A small iron lantern on a bracket beside the door, lit in every house.
    {
      const lx = doorX - Math.sign(doorX || 1) * .64, ly = 2.02, lz = d / 2 + .2;
      box(lx, ly + .2, d / 2 + .06, .04, .04, .2, iron, group);
      box(lx, ly, lz, .13, .2, .13, doorGlass, group);
      for (const dx of [-.07, .07]) for (const dz of [-.07, .07]) box(lx + dx, ly, lz + dz, .018, .24, .018, iron, group);
      const cap = mesh(new THREE.ConeGeometry(.12, .1, 4), iron, group); cap.position.set(lx, ly + .16, lz); cap.rotation.y = Math.PI / 4;
      snowCap(lx, ly + .2, lz, .14, .14, .04, group);
      if (doorLampCount < 4) {
        const world = group.localToWorld(v3(lx, ly, lz + .05));
        doorLamps.positions[doorLampCount++].set(world.x, world.y, world.z, warm ? .9 : .75);
      }
      doorGlows.push(group.localToWorld(v3(lx, ly, lz)));
    }
    addWindow(group, -doorX, mainY, d / 2, mainW, 0.92, warm ? 0.9 : 0.55);
    {
      // A planter box under the window: fir sprigs poking through a cushion of snow.
      const by = mainY - .46 - .2, bz = d / 2 + .2;
      timberBox(-doorX, by, bz, mainW + .22, .2, .22, darkWood, group, .004);
      for (let k = 0; k < 7; k++) {
        const sprig = mesh(sprigGeometry, sprigMaterial, group);
        sprig.position.set(-doorX + (k / 6 - .5) * (mainW + .05), by + .12 + random() * .04, bz + (random() - .5) * .08);
        sprig.scale.set(.07 + random() * .03, .06 + random() * .04, .06);
        sprig.rotation.set(random(), random() * 3, random());
      }
      snowCap(-doorX, by + .1, bz, mainW + .2, .2, .06, group);
    }
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
    if (variant === 1) {
      // A wooden sled leans against the wall beside the door, its slats dusted with snow.
      const sled = new THREE.Group(); sled.position.set(doorX + .72, .12, d / 2 + .3); sled.rotation.set(-1.05, .25, 0); group.add(sled);
      for (const sx of [-.17, .17]) {
        const runner: THREE.Vector3[] = [];
        for (let i = 0; i <= 10; i++) { const t = i / 10; runner.push(v3(sx, t > .82 ? (t - .82) * .9 : 0, -.45 + t * .95 + (t > .82 ? -(t - .82) * .5 : 0))); }
        mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(runner), 20, .014, 6, false), iron, sled);
        for (const t of [.2, .55]) timberBox(sx, .07, -.45 + t * .95, .04, .14, .04, darkWood, sled, 0);
      }
      for (let i = 0; i < 5; i++) timberBox(0, .15, -.36 + i * .14, .44, .025, .1, timber, sled, .004);
      snowCap(0, .16, -.08, .4, .5, .03, sled);
    }
    if (variant === 2) {
      const deckY = wall * .62, deckZ = d / 2 + .38, span = w * .78;
      timberBox(0, deckY, deckZ, span, .1, .62, darkWood, group, .01);
      for (const sx of [-1, 1]) {
        timberBetween(v3(sx * span * .42, deckY - .75, d / 2 + .02), v3(sx * span * .42, deckY - .05, deckZ + .2), .09, .09, darkWood, group, .006);
        timberBox(sx * span * .5, deckY + .48, deckZ + .27, .08, .86, .08, timber, group);
      }
      const posts = 9;
      for (let i = 1; i < posts; i++) timberBox(-span / 2 + span * i / posts, deckY + .36, deckZ + .27, .045, .62, .045, timber, group, .003);
      timberBox(0, deckY + .9, deckZ + .27, span + .08, .08, .1, timber, group, .012);
      snowCap(0, deckY + .94, deckZ + .27, span + .06, .14, .07, group);
      snowCap(0, deckY + .05, deckZ + .12, span - .05, .36, .09, group);
      for (const sx of [-1, 1]) snowCap(sx * span * .5, deckY + .91, deckZ + .27, .1, .1, .05, group);
    }
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
  for (const spec of houseSpecs) house(...spec);
  // Icicles hang from the snow cornices: mostly short, a few long, gaps where the eave is warm.
  {
    const geometry = new THREE.ConeGeometry(1, 1, 7, 6);
    geometry.rotateX(Math.PI); geometry.translate(0, -.5, 0);
    const ip = geometry.getAttribute('position');
    for (let k = 0; k < ip.count; k++) {
      const y = ip.getY(k), ripple = 1 + .18 * Math.sin(y * 31) * (1 + y);
      ip.setX(k, ip.getX(k) * ripple); ip.setZ(k, ip.getZ(k) * ripple);
    }
    geometry.computeVertexNormals();
    const matrices: THREE.Matrix4[] = [];
    const q = new THREE.Quaternion(), scale = new THREE.Vector3();
    for (const drip of eaveDrips) {
      if (random() < .3) continue;
      const length = .04 + Math.pow(random(), 2.4) * .42;
      const radius = .011 + length * .05 + random() * .006;
      q.setFromAxisAngle(v3(0, 0, 1), (random() - .5) * .08);
      scale.set(radius, length, radius);
      matrices.push(new THREE.Matrix4().compose(drip.clone().add(v3((random() - .5) * .05, .015, (random() - .5) * .12)), q, scale));
    }
    const icicles = new THREE.InstancedMesh(geometry, ice, matrices.length);
    matrices.forEach((matrix, i) => icicles.setMatrixAt(i, matrix));
    icicles.instanceMatrix.needsUpdate = true;
    icicles.castShadow = false; icicles.receiveShadow = false; icicles.name = 'Eave icicles';
    scene.add(icicles);
  }

  // ---------------------------------------------------------------- trees
  const treeGround = (x: number, z: number) => z < -43 ? Math.max(terrain(x, z), hillHeight(x, z) - .2) : terrain(x, z);
  const needles = applySnowCover(createFoliageMaterial(needleSprayTexture(51, '#2c4235'), 'village-spruce'), { key: 'village-spruce', threshold: .7, amount: .78, scale: 3.2 });
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
    const len = 0.04 + Math.pow(random(), 2.5) * 0.2;
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
  // Round, soft powder grains (a tiny generated sprite; never square points).
  const grainSize = 32, grainData = new Uint8Array(grainSize * grainSize * 4);
  for (let y = 0; y < grainSize; y++) for (let x = 0; x < grainSize; x++) {
    const r = Math.hypot(x + .5 - grainSize / 2, y + .5 - grainSize / 2) / (grainSize / 2);
    grainData.set([255, 255, 255, Math.round(255 * Math.max(0, 1 - r) ** 1.6)], (y * grainSize + x) * 4);
  }
  const grainSprite = new THREE.DataTexture(grainData, grainSize, grainSize, THREE.RGBAFormat);
  grainSprite.needsUpdate = true;
  const dustMat = new THREE.PointsMaterial({ color: new THREE.Color(.55, .6, .7), map: grainSprite, size: 0.03, transparent: true, opacity: 0, depthWrite: false });
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
          { position: doorGlows[0], color: new THREE.Color(1, .62, .3).multiplyScalar(.012) },
        ],
        smoke: [
          { base: chimneys[0], radius: .3, height: 8, density: 1.1 },
          { base: chimneys[1], radius: .32, height: 8.5, density: 1.0 },
        ],
        wind: new THREE.Vector2(.42, -.12),
        smokeLight: new THREE.Color(.09, .06, .036),
      });
      volumeUniforms = volume.uniforms;
      return volume;
    },
    setPostActive(active) { scene.fog = active ? null : fallbackFog; },
    update(elapsed, dt) {
      snowfall.update(elapsed);
      sky.update(elapsed);
      clouds.update(elapsed);
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
