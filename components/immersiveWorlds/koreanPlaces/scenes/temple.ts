import * as THREE from 'three';
import type { SceneContent, WorldInteraction } from '../types';
import { createCheckedEnvironment } from '../environment';
import { VOLUME_PRELUDE, type VolumeEffect } from '../../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';
import { createRockMaterial } from '../../shared/render/rockSurface';
import { boulderGeometry } from '../../shared/render/rockGeometry';
import { fbm3, seeded } from '../../shared/render/noise';
import { applyFoliage, applyWeathering, applyWood, bakeStatic, canvasTexture, glowTexture, lathe, taperedTube, KP_NOISE } from './kit';
import { beamGeometry, beamMaterial, beamTexture, PALETTE, rafterEndTexture } from './dancheong';
import { buildRoof, tileMaterial } from './koreanRoof';
import { SUN, add, barkMaterial, bracketArm, bracketMaterials, columnGeometry, CREST_GLSL, latticeTexture, mountains, needleTexture, pagoda, pine, rounded, stoneLantern, type PineOutput } from './templeParts';

const SUN_COLOR = new THREE.Color(1, .74, .5);

const SKY_FRAGMENT = /* glsl */ `
${KP_NOISE}
uniform vec3 uSunDir;
uniform float uTime;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  float h = d.y;
  float cs = dot(d, uSunDir);
  float sunSide = 0.5 + 0.5 * dot(normalize(d.xz + 1e-4), normalize(uSunDir.xz));
  vec3 zenith = vec3(0.16, 0.27, 0.48);
  vec3 horizon = mix(vec3(0.66, 0.66, 0.78), vec3(1.65, 1.02, 0.58), pow(sunSide, 3.0));
  float k = pow(1.0 - clamp(h, 0.0, 1.0), 5.0);
  vec3 col = mix(zenith, horizon, k);
  col = mix(col, horizon * 0.9, smoothstep(0.0, -0.05, h));
  col += vec3(1.5, 0.85, 0.42) * pow(max(cs, 0.0), 10.0) * 0.9;
  col += vec3(5.0, 3.2, 1.8) * pow(max(cs, 0.0), 260.0) + vec3(1.2, 0.7, 0.35) * pow(max(cs, 0.0), 40.0);
  col += vec3(160.0, 132.0, 96.0) * smoothstep(0.99989, 0.99993, cs);
  vec2 uv = d.xz / (max(h, 0.0) + 0.1);
  float n = bwFbm5(vec3(uv * vec2(0.7, 2.2) + vec2(uTime * 0.003, 0.0), 2.0));
  float cloud = smoothstep(0.0, 0.42, n) * smoothstep(0.03, 0.14, h) * (1.0 - smoothstep(0.28, 0.62, h));
  vec3 cloudLit = mix(vec3(0.7, 0.58, 0.66), vec3(2.6, 1.55, 0.85), pow(max(cs, 0.0), 5.0));
  col = mix(col, cloudLit, cloud * 0.55);
  gl_FragColor = vec4(col, 1.0);
}`;

const VOLUME_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
${KP_NOISE}
${CREST_GLSL}
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uSkyColor;
uniform vec3 uU1;
uniform vec3 uU2;
uniform vec4 uCrowns[10];
uniform float uHaze;
uniform float uValley;
uniform float uGround;
float ridgeShadow(vec3 p) {
  float vis = 1.0;
  float zs[3] = float[3](RIDGE_Z0, RIDGE_Z1, RIDGE_Z2);
  for (int l = 0; l < 3; l++) {
    float t = (zs[l] - p.z) / uSunDir.z;
    if (t > 0.0) { vec3 q = p + uSunDir * t; vis *= smoothstep(-3.0, 2.0, q.y - ridgeCrest(l, q.x)); }
  }
  return vis;
}
float crownShadow(vec3 p) {
  float vis = 1.0;
  for (int i = 0; i < 10; i++) {
    vec4 c = uCrowns[i];
    vec3 oc = c.xyz - p;
    float t = dot(oc, uSunDir);
    if (t < 0.0) continue;
    vec3 perp = oc - uSunDir * t;
    vec2 q = vec2(dot(perp, uU1), dot(perp, uU2) * 1.5);
    float d = length(q) / c.w;
    if (d > 1.0) continue;
    float holes = smoothstep(0.38, 0.66, bwValue(vec3(q * 1.3, float(i) * 7.0)));
    vis *= mix(1.0, 0.06 + 0.85 * holes, 1.0 - smoothstep(0.5, 1.0, d));
  }
  return vis;
}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, 420.0);
  float cosT = dot(rd, uSunDir);
  float phase = (0.65 * bwPhase(cosT, 0.65) + 0.35 * bwPhase(cosT, 0.0)) * 12.5663706;
  float jitter = bwIgn(gl_FragCoord.xy);
  const int STEPS = 36;
  vec3 scatter = vec3(0.0);
  float T = 1.0;
  for (int i = 0; i < STEPS; i++) {
    float s = (float(i) + jitter) / float(STEPS);
    float t = maxT * s * s;
    float dt = maxT * 2.0 * max(s, 0.5 / float(STEPS)) / float(STEPS);
    vec3 p = ro + rd * t;
    float haze = uHaze * (exp(-max(p.y + 0.7, 0.0) / 16.0) + 1.0 * exp(-max(p.y + 0.7, 0.0) / 6.0) * smoothstep(-70.0, -20.0, p.z));
    float far = smoothstep(-35.0, -70.0, p.z);
    float mistH = 1.0 + max(-p.z - 40.0, 0.0) * 0.16;
    float band = exp(-pow((p.y - mistH) / (2.2 + far * 3.5), 2.0));
    float wisps = smoothstep(-0.3, 0.5, bwFbm3(p * vec3(0.016, 0.07, 0.02) + vec3(uTime * 0.004, 0.0, uTime * 0.002)));
    float valley = uValley * far * band * wisps;
    float ground = uGround * exp(-max(p.y + 0.72, 0.0) / 0.8) * smoothstep(-5.0, -12.0, p.z) * (0.35 + 0.65 * bwValue(p * vec3(0.16, 0.5, 0.16) + vec3(uTime * 0.015, 0.0, 0.0)));
    float density = haze + valley + ground;
    if (density < 1e-6) continue;
    float vis = ridgeShadow(p) * (p.z > -60.0 ? crownShadow(p) : 1.0);
    vec3 radiance = (uSunColor * phase * vis + uSkyColor) * density;
    float stepT = exp(-density * dt);
    scatter += T * radiance * (1.0 - stepT) / density;
    T *= stepT;
  }
  gl_FragColor = vec4(scatter, T);
}`;

/** Courtyard earth: packed decomposed-granite sand with gravel, moss at the edges and dew-dark patches. */
function groundMaterial() {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .95 });
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vGdWorld;').replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvGdWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vGdWorld;\n${KP_NOISE}
float gdHeight(vec3 p) { return bwValue(p * 26.0) * 0.6 + bwValue(p * 61.0) * 0.4; }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 gp = vGdWorld;
float court = (1.0 - smoothstep(8.0, 13.0, abs(gp.x - 0.6))) * smoothstep(-37.0, -32.0, gp.z);
float macro = bwFbm3(gp * 0.18);
float grit = bwValue(gp * 26.0);
float stones = smoothstep(0.72, 0.86, bwValue(gp * 9.0 + 3.0));
vec3 sand = mix(vec3(0.4, 0.36, 0.3), vec3(0.52, 0.48, 0.41), grit) * (0.86 + 0.26 * macro);
sand = mix(sand, vec3(0.42, 0.4, 0.38), stones * 0.5);
float mossy = smoothstep(-0.1, 0.4, bwFbm3(gp * 0.35 + 7.0)) * (1.0 - court * 0.85);
vec3 moss = mix(vec3(0.16, 0.2, 0.08), vec3(0.3, 0.34, 0.14), bwValue(gp * 4.0));
vec3 forest = mix(vec3(0.17, 0.17, 0.1), vec3(0.24, 0.22, 0.14), macro * 0.5 + 0.5);
vec3 gcol = mix(forest, sand, court);
gcol = mix(gcol, moss, mossy * 0.75);
float damp = smoothstep(0.1, 0.5, bwFbm3(gp * 0.09 + 21.0)) * court;
gcol *= 1.0 - damp * 0.18;
diffuseColor.rgb *= gcol;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = clamp(0.92 - damp * 0.3 - stones * 0.1, 0.3, 1.0);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  const float e = 0.004;
  float h0 = gdHeight(vGdWorld);
  vec3 g = vec3(gdHeight(vGdWorld + vec3(e, 0, 0)) - h0, 0.0, gdHeight(vGdWorld + vec3(0, 0, e)) - h0) / e;
  vec3 vg = (viewMatrix * vec4(g * 0.0035, 0.0)).xyz;
  normal = normalize(normal - (vg - dot(vg, normal) * normal));
}`);
  };
  material.customProgramCacheKey = () => 'kp-temple-ground-v1';
  return material;
}

/** Original, procedural Korean mountain bell pavilion at dawn. No fetched or copied assets. */
export function createTempleScene(renderer: THREE.WebGLRenderer): SceneContent {
  const scene = new THREE.Scene();
  scene.name = 'Temple dawn — seated bell pavilion';
  scene.background = new THREE.Color('#9fb0b8');
  const directFog = new THREE.FogExp2('#b9b8b0', 0.0085);
  scene.fog = directFog;
  scene.userData.exposure = 1.0;
  const camera = new THREE.PerspectiveCamera(53, 1, 0.06, 700);
  const staticRoot = new THREE.Group();
  scene.add(staticRoot);
  let seed = 71103;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const mix = (a: number, b: number) => a + (b - a) * random();
  const textures: THREE.Texture[] = [];
  const own = <T extends THREE.Texture>(t: T) => { textures.push(t); return t; };

  /* ------------------------------------------------------------ materials */
  // Bell casting maps (aged bronze, porous verdigris) keep their own deterministic field.
  const castSize = 512;
  const castCanvases = Array.from({ length: 5 }, () => { const c = document.createElement('canvas'); c.width = c.height = castSize; return c; });
  const castPixels = castCanvases.map(c => c.getContext('2d')!.createImageData(castSize, castSize));
  const grainHash = (x: number, y: number) => {
    let h = Math.imul(x ^ 72831, 374761393) ^ Math.imul(y ^ 9127, 668265263);
    h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  const castNoise = (x: number, y: number, period: number) => {
    const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
    const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    const h = (dx: number, dy: number) => grainHash(((ix + dx) % period + period) % period, iy + dy);
    return THREE.MathUtils.lerp(THREE.MathUtils.lerp(h(0, 0), h(1, 0), u), THREE.MathUtils.lerp(h(0, 1), h(1, 1), u), v);
  };
  for (let y = 0; y < castSize; y++) for (let x = 0; x < castSize; x++) {
    const u = x / castSize, v = y / castSize;
    const broad = castNoise(u * 10, v * 17, 10), medium = castNoise(u * 32, v * 51, 32);
    const fine = castNoise(u * 96, v * 137, 96), pore = grainHash(x, y);
    // Verdigris gathers in runs down the bell: stretch the field vertically.
    const runs = castNoise(u * 40, v * 6, 40);
    const patina = THREE.MathUtils.smoothstep(broad * .5 + medium * .25 + runs * .15 + fine * .1, .42, .7);
    const worn = THREE.MathUtils.smoothstep(medium, .6, .87) * (1 - patina);
    const grain = (fine - .5) * 10 + (pore - .5) * 5;
    const agedBronze = [96 + worn * 50, 72 + worn * 38, 46 + worn * 22];
    const verdigris = [72, 108, 90];
    const offset = (y * castSize + x) * 4;
    for (let c = 0; c < 3; c++) {
      castPixels[0].data[offset + c] = THREE.MathUtils.lerp(agedBronze[c], verdigris[c], patina * .9) + grain;
      castPixels[4].data[offset + c] = THREE.MathUtils.lerp(agedBronze[c], verdigris[c], patina * .15) + grain * .45;
      castPixels[1].data[offset + c] = (0.42 + patina * .48 - worn * .16) * 255;
      castPixels[2].data[offset + c] = 123 + (fine - .5) * 31 + (pore - .5) * 15 + patina * 17;
      castPixels[3].data[offset + c] = (0.95 - patina * .7) * 255;
    }
    for (const pixels of castPixels) pixels.data[offset + 3] = 255;
  }
  castCanvases.forEach((c, i) => c.getContext('2d')!.putImageData(castPixels[i], 0, 0));
  const [castColor, castRoughness, castBump, castMetalness, wornBronzeColor] = castCanvases.map((c, i) => {
    const map = own(new THREE.CanvasTexture(c)); map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 4; if (i === 0 || i === 4) map.colorSpace = THREE.SRGBColorSpace; return map;
  });
  // Reflection environment: dawn sky, warm glow toward the sun, earthen courtyard below.
  const envCanvas = document.createElement('canvas'); envCanvas.width = 512; envCanvas.height = 256;
  const ec = envCanvas.getContext('2d')!, eg = ec.createLinearGradient(0, 0, 0, 256);
  eg.addColorStop(0, '#6f8fb5'); eg.addColorStop(.38, '#b9c0cc'); eg.addColorStop(.49, '#ead2b4'); eg.addColorStop(.52, '#8b8576'); eg.addColorStop(.7, '#6d6455'); eg.addColorStop(1, '#3d3830');
  ec.fillStyle = eg; ec.fillRect(0, 0, 512, 256);
  const glow = ec.createRadialGradient(156, 106, 1, 156, 106, 120); glow.addColorStop(0, 'rgba(255,226,170,1)'); glow.addColorStop(.25, 'rgba(255,205,150,.55)'); glow.addColorStop(1, 'rgba(255,205,150,0)');
  ec.fillStyle = glow; ec.fillRect(0, 0, 512, 256);
  // The pavilion ceiling overhead reads as a dark warm band in reflections.
  ec.fillStyle = 'rgba(60,34,26,.55)'; ec.fillRect(0, 0, 512, 40);
  const environment = new THREE.CanvasTexture(envCanvas); environment.colorSpace = THREE.SRGBColorSpace; environment.mapping = THREE.EquirectangularReflectionMapping;
  const checkedEnvironment = createCheckedEnvironment(renderer, environment, 'temple');
  scene.environment = checkedEnvironment.texture; scene.environmentIntensity = .55;

  const deckWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'z', plank: { across: 'x', width: .458, offset: 5.96 }, light: '#80634a', dark: '#4b3728', polish: .9, rings: 30, roughness: [.38, .55], key: 'deck' });
  const frameWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'x', light: '#94785a', dark: '#57402e', rings: 9, key: 'frame-x' });
  const frameWoodZ = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'z', light: '#94785a', dark: '#57402e', rings: 9, key: 'frame-z' });
  const columnWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'y', light: '#a07c5a', dark: '#5e432f', rings: 8, paint: { color: '#6e2b1f', wear: .32, roughness: .66 }, key: 'column' });
  const rafterWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'z', light: '#8d7558', dark: '#5a4330', paint: { color: PALETTE.noerok, wear: .12, roughness: .72 }, key: 'rafter' });
  const boardWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff', side: THREE.DoubleSide }), { axis: 'z', light: '#8d7558', dark: '#5a4330', paint: { color: '#7a3224', wear: .1, roughness: .75 }, key: 'soffit' });
  const strikerWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'x', light: '#8f7a62', dark: '#5c4a38', rings: 16, polish: .3, key: 'striker' });
  const beamMap = own(beamTexture('green')), beamMapBlue = own(beamTexture('blue'));
  const beam = applyWeathering(beamMaterial(beamMap, 'green'), { key: 'beam-green', mottle: .12, bump: .8 });
  const beamBlue = applyWeathering(beamMaterial(beamMapBlue, 'blue'), { key: 'beam-blue', mottle: .12, bump: .8 });
  const brackets = bracketMaterials(); own(brackets.caps.map!);
  const sideGreen = applyWeathering(new THREE.MeshStandardMaterial({ color: PALETTE.noerok, roughness: .8 }), { key: 'side-green', mottle: .15 });
  const vermilion = applyWeathering(new THREE.MeshStandardMaterial({ color: PALETTE.jangdan, roughness: .78 }), { key: 'vermilion', mottle: .15 });
  const cream = applyWeathering(new THREE.MeshStandardMaterial({ color: PALETTE.baek, roughness: .82 }), { key: 'cream', mottle: .12 });
  const granite = createRockMaterial('#b3ad9f', { key: 'temple-granite', scale: 2.2, bump: .55, stainAmount: .15, cavity: .45, strata: 0, drips: .06, dryRoughness: .84, moss: { color: '#56632f', amount: .4 } });
  const boulderStone = createRockMaterial('#9c9787', { key: 'temple-boulder', scale: 1.1, bump: 1, stainAmount: .25, cavity: .6, strata: .1, drips: .1, moss: { color: '#4d5a29', amount: .6 } });
  const tile = tileMaterial('temple-tile', { color: '#4e5657' });
  const ridgeMat = applyWeathering(new THREE.MeshStandardMaterial({ color: '#3c4344', roughness: .7 }), { key: 'ridge', mottle: .2, bump: 1.4 });
  const endTile = new THREE.MeshStandardMaterial({ color: '#4a5152', roughness: .65 });
  const rafterEnd = new THREE.MeshStandardMaterial({ map: own(rafterEndTexture()), roughness: .8 });
  const plaster = applyWeathering(new THREE.MeshStandardMaterial({ color: '#d9d0bd', roughness: .95 }), { key: 'plaster', mottle: .1, grime: .35, grimeY: .3, grimeHeight: .9, streaks: .12, bump: 1.6 });
  const lattice = own(latticeTexture());
  const latticeMat = new THREE.MeshStandardMaterial({ map: lattice, bumpMap: lattice, bumpScale: 2.2, roughness: .86 });
  const bronze = new THREE.MeshStandardMaterial({ map: castColor, roughnessMap: castRoughness, bumpMap: castBump, bumpScale: 1.4, metalnessMap: castMetalness, roughness: .9, metalness: 1, envMapIntensity: 1.25 });
  const bronzeEdge = new THREE.MeshStandardMaterial({ map: wornBronzeColor, color: '#e8dcc0', roughnessMap: castRoughness, bumpMap: castBump, bumpScale: .3, roughness: .7, metalness: .85, envMapIntensity: 1.25 });
  const bronzeDark = new THREE.MeshStandardMaterial({ color: '#3b4136', roughness: .72, metalness: .55 });
  const bronzeRelief = new THREE.MeshStandardMaterial({ map: wornBronzeColor, color: '#ddd3b7', roughnessMap: castRoughness, roughness: .75, metalness: .75 });
  const bronzeEngraving = new THREE.MeshStandardMaterial({ map: wornBronzeColor, color: '#8c836c', roughness: .86, metalness: .5 });
  const ropeMaterial = applyWeathering(new THREE.MeshStandardMaterial({ color: '#a8916e', roughness: 1 }), { key: 'rope', mottle: .25, bump: 3, scale: 4 });
  const bark = barkMaterial();
  const lanternGlow = new THREE.MeshStandardMaterial({ color: '#1a1410', emissive: '#ffb36a', emissiveIntensity: 2.2, roughness: 1 });

  /* ------------------------------------------------------------- sky/light */
  const sky = new THREE.Mesh(new THREE.SphereGeometry(520, 48, 24), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { uSunDir: { value: SUN.clone() }, uTime: { value: 0 } },
    vertexShader: 'varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: SKY_FRAGMENT,
  }));
  sky.renderOrder = -10; sky.frustumCulled = false; scene.add(sky);
  const hemi = new THREE.HemisphereLight('#b7c6d8', '#5d5040', .32); scene.add(hemi);
  const sun = new THREE.DirectionalLight(SUN_COLOR, 3.4);
  sun.target.position.set(0, 0, -9); sun.position.copy(sun.target.position).addScaledVector(SUN, 60);
  sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -17, right: 17, top: 13, bottom: -13, near: 20, far: 110 });
  sun.shadow.radius = 3; sun.shadow.normalBias = .03; sun.shadow.bias = -.0002;
  scene.add(sun, sun.target);
  // Fake bounce: the sunlit deck throws warm light up into the ceiling and onto the bell.
  const deckBounce = new THREE.PointLight('#ffb27a', 5, 9, 1.6); deckBounce.position.set(-.6, .9, -1.2); scene.add(deckBounce);
  const ceilingBounce = new THREE.PointLight('#e6a27a', 4, 10, 1.4); ceilingBounce.position.set(.5, 2.6, .6); scene.add(ceilingBounce);
  const courtyardBounce = new THREE.PointLight('#c9b7a0', 14, 26, 1.2); courtyardBounce.position.set(1, 1.2, -17); scene.add(courtyardBounce);

  /* ---------------------------------------------------------- terrain/sky */
  staticRoot.add(mountains());
  // Courtyard floor, then wooded banks rising gently toward the valley sides.
  const groundY = (x: number, z: number) => {
    const outside = Math.min(28, Math.max(0, Math.abs(x - .6) - 12) + Math.max(0, -z - 38) * .8);
    return -.72 + fbm3(x * .05, 0, z * .05, 3) * .12 + Math.pow(outside, 1.15) * .26 + fbm3(x * .03, 2, z * .03, 4) * Math.min(outside, 10) * .4;
  };
  const groundGeo = new THREE.PlaneGeometry(180, 120, 150, 100); groundGeo.rotateX(-Math.PI / 2);
  const gpos = groundGeo.attributes.position;
  for (let i = 0; i < gpos.count; i++) { const x = gpos.getX(i), z = gpos.getZ(i) - 45; gpos.setXYZ(i, x, groundY(x, z), z); }
  groundGeo.computeVertexNormals();
  const ground = add(staticRoot, groundGeo, groundMaterial()); ground.castShadow = false;

  // Path of worn granite slabs leading to the hall.
  for (let row = 0; row < 18; row++) for (let col = 0; col < 3; col++) {
    const w = 1.0 + mix(-.08, .05), d = .95 + mix(-.06, .06);
    if (Math.hypot(col * 1.06 - .5 - .75, -5.2 - row * 1.06 + 21.5) < 1.1) continue;
    const slab = add(staticRoot, rounded(w, .14, d, .035), granite, [col * 1.06 - .5 + .03 * Math.sin(row), -.68, -5.2 - row * 1.06]);
    slab.rotation.y = mix(-.03, .03); slab.rotation.z = mix(-.012, .012);
  }
  // Mossy boulders around the courtyard edges.
  const boulderGeos = [0, 1, 2, 3].map(s => boulderGeometry(s + 3, 3));
  const boulder = (x: number, z: number, sx: number, sy: number, sz: number) => {
    const m = add(staticRoot, boulderGeos[Math.floor(random() * 4)].clone(), boulderStone, [x, -.72 + sy * .35, z]);
    m.scale.set(sx, sy, sz); m.rotation.y = random() * 6.28;
  };
  for (let i = 0; i < 16; i++) boulder(mix(-15, -7), mix(-26, -6), mix(.5, 1.3), mix(.4, .8), mix(.6, 1.4));
  for (let i = 0; i < 12; i++) boulder(mix(8, 16), mix(-28, -8), mix(.4, .9), mix(.3, .6), mix(.5, 1.1));
  boulderGeos.forEach(g => g.dispose());

  /* -------------------------------------------------------------- pavilion */
  // Granite platform, worn boards with real gaps, the front sill and side rails.
  for (const [w, h, d, x, y, z] of [[12.3, .62, .6, 0, -.36, -3.15], [12.3, .62, .6, 0, -.36, 5.0], [.6, .62, 7.6, -5.85, -.36, .93], [.6, .62, 7.6, 5.85, -.36, .93]]) {
    const n = Math.max(1, Math.round(Math.max(w, d) / 1.3));
    for (let k = 0; k < n; k++) {
      const along = (k + .5) / n - .5;
      add(staticRoot, rounded(w > d ? w / n - .025 : w, h, d > w ? d / n - .025 : d, .04), granite, [x + (w > d ? along * w : 0), y + mix(-.01, .01), z + (d > w ? along * d : 0)]);
    }
  }
  for (let i = 0; i < 3; i++) add(staticRoot, rounded(5.4 + i * .5, .2, .55, .04), granite, [1.25, -.1 - i * .2, -3.75 - i * .5]);
  for (let i = 0; i < 26; i++) {
    const board = add(staticRoot, rounded(.44, .12, 7.75, .018, 2), deckWood, [-5.73 + i * .458, .2 + mix(-.003, .003), .95]);
    board.rotation.y = mix(-.0004, .0004);
  }
  add(staticRoot, rounded(11.95, .26, .22, .03), frameWood, [0, .14, -3.03]);
  for (const x of [-4.9, 4.9]) {
    for (let i = 0; i < 5; i++) add(staticRoot, rounded(.12, .75, .12, .02), frameWoodZ, [x, .63, -.8 + i * 1.05]);
    add(staticRoot, rounded(.16, .12, 5.7, .03), frameWoodZ, [x, 1.04, 1.1]);
    add(staticRoot, rounded(.085, .08, 5.7, .02), frameWoodZ, [x, .58, 1.1]);
  }
  // Columns with entasis on carved granite bases.
  const columnTop = 4.68;
  const colGeo = columnGeometry(columnTop - .4, .265);
  const corners: Array<[number, number]> = [];
  for (const x of [-4.35, 4.35]) for (const z of [-2.7, 4.4]) corners.push([x, z]);
  for (const [x, z] of corners) {
    add(staticRoot, new THREE.CylinderGeometry(.4, .5, .18, 8), granite, [x, .3, z]);
    add(staticRoot, lathe([[.4, 0], [.38, .04], [.31, .1], [.3, .14], [0, .14]], 16), granite, [x, .39, z]);
    add(staticRoot, colGeo.clone(), columnWood, [x, .4, z]);
  }
  colGeo.dispose();
  // Beams: lintels between columns carry the dancheong; purlins and joists above.
  const beamX = (length: number, h: number, d: number, pos: [number, number, number], material = beam, parent: THREE.Object3D = staticRoot) => add(parent, beamGeometry(length, h, d), material, pos);
  const beamZ = (length: number, h: number, d: number, pos: [number, number, number], material = beam, parent: THREE.Object3D = staticRoot) => { const m = beamX(length, h, d, pos, material, parent); m.rotation.y = Math.PI / 2; return m; };
  for (const z of [-2.7, 4.4]) { beamX(9.5, .36, .27, [0, 4.42, z]); beamX(9.3, .16, .2, [0, 4.92, z], beamBlue); }
  for (const x of [-4.35, 4.35]) { beamZ(7.9, .36, .27, [x, 4.42, .85]); beamZ(7.7, .16, .2, [x, 4.92, .85], beamBlue); }
  // Great cross beams on the end column pairs carry the upper purlins and ridge post.
  for (const x of [-4.35, 4.35]) { beamZ(7.6, .44, .36, [x, 5.38, .85]); add(staticRoot, rounded(.3, 1.4, .3, .03), sideGreen, [x, 6.3, .85]); }
  const purlin = (z: number, y: number, r: number, length: number) => { const m = add(staticRoot, new THREE.CylinderGeometry(r, r, length, 18), beamBlue, [0, y, z]); m.rotation.z = Math.PI / 2; };
  purlin(-2.7, 5.12, .15, 10.4); purlin(4.4, 5.12, .15, 10.4); purlin(-1.575, 5.61, .15, 9.0); purlin(3.275, 5.61, .15, 9.0); purlin(.85, 7.13, .15, 7.2);
  // Wing brackets at every column (two tiers), capitals and bearing blocks.
  const arm = (x: number, y: number, z: number, angle: number, length: number, height: number) => {
    const a = bracketArm(length, height, .17, [brackets.caps, brackets.sides]);
    a.position.set(x, y, z); a.rotation.y = angle; a.castShadow = a.receiveShadow = true; staticRoot.add(a); return a;
  };
  for (const [x, z] of corners) {
    const outZ = z < .85 ? -1 : 1, outX = x < 0 ? -1 : 1;
    add(staticRoot, new THREE.CylinderGeometry(.3, .23, .16, 4, 1), sideGreen, [x, columnTop + .08, z]).rotation.y = Math.PI / 4;
    add(staticRoot, rounded(.46, .07, .46, .015), vermilion, [x, columnTop + .19, z]);
    arm(x, 4.3, z, outZ < 0 ? Math.PI / 2 : -Math.PI / 2, 1.25, .26);
    arm(x, columnTop + .22, z, outZ < 0 ? Math.PI / 2 : -Math.PI / 2, 1.6, .26);
    arm(x, 4.3, z, outX > 0 ? 0 : Math.PI, 1.25, .26);
    arm(x, columnTop + .22, z, outX > 0 ? 0 : Math.PI, 1.6, .26);
    for (const dz of [-.42, 0, .42]) add(staticRoot, rounded(.16, .1, .16, .015), cream, [x, columnTop + .53, z + dz * outZ * -1]);
  }
  // Decorative blocks between columns on the front lintel, each with a painted rosette.
  const rosetteMap = own(canvasTexture(256, 256, ctx => {
    ctx.fillStyle = PALETTE.noerok; ctx.fillRect(0, 0, 256, 256);
    const ring = (r: number, c: string) => { ctx.beginPath(); ctx.arc(128, 128, r, 0, Math.PI * 2); ctx.fillStyle = c; ctx.fill(); };
    ring(112, PALETTE.meok); ring(106, PALETTE.baek); ring(98, PALETTE.meok);
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * Math.PI * 2;
      ctx.save(); ctx.translate(128 + Math.cos(a) * 62, 128 + Math.sin(a) * 62); ctx.rotate(a);
      for (const [c, s] of [[PALETTE.meok, 1], [PALETTE.juhong, .9], [PALETTE.jangdan, .72], [PALETTE.bunhong, .5], [PALETTE.baek, .28]] as Array<[string, number]>) { ctx.beginPath(); ctx.ellipse(0, 0, 36 * s, 17 * s, 0, 0, Math.PI * 2); ctx.fillStyle = c; ctx.fill(); }
      ctx.restore();
    }
    ring(28, PALETTE.meok); ring(24, PALETTE.hwang); ring(10, PALETTE.jangdan);
  }));
  const rosetteMat = new THREE.MeshStandardMaterial({ map: rosetteMap, roughness: .8 });
  const hwabanShape = new THREE.Shape();
  hwabanShape.moveTo(-.34, 0); hwabanShape.bezierCurveTo(-.36, .18, -.2, .26, -.16, .36); hwabanShape.lineTo(.16, .36); hwabanShape.bezierCurveTo(.2, .26, .36, .18, .34, 0); hwabanShape.closePath();
  const hwabanGeo = new THREE.ExtrudeGeometry(hwabanShape, { depth: .14, bevelEnabled: true, bevelThickness: .01, bevelSize: .01, bevelSegments: 1, curveSegments: 8 });
  hwabanGeo.translate(0, 0, -.07);
  const uvs = hwabanGeo.attributes.uv;
  for (let i = 0; i < uvs.count; i++) uvs.setXY(i, uvs.getX(i) / .72 + .5, uvs.getY(i) / .36);
  for (const z of [-2.7, 4.4]) for (const x of [-2.9, -1.45, 0, 1.45, 2.9]) {
    const block = new THREE.Mesh(hwabanGeo.clone(), [rosetteMat, sideGreen]); block.position.set(x, 4.6, z); block.castShadow = block.receiveShadow = true; staticRoot.add(block);
  }
  hwabanGeo.dispose();
  // Roof: hip-and-gable with a fully visible painted soffit and two tiers of rafters.
  const pavilionRoof = buildRoof({ halfWidth: 6.0, halfDepth: 4.85, eaveY: 5.4, ridgeY: 7.7, hipDepth: 2.5, lift: .5, flare: .22, thickness: .3, row: .29 }, { tile, ridge: ridgeMat, gable: boardWood, soffit: boardWood, rafter: rafterWood, rafterEnd, endTile });
  pavilionRoof.group.position.set(0, 0, .85); staticRoot.add(pavilionRoof.group);

  /* ------------------------------------------------------------------- bell */
  const bellPivot = new THREE.Group(); bellPivot.position.set(-2.28, 4.38, -.75); scene.add(bellPivot);
  const create = (geo: THREE.BufferGeometry, mat: THREE.Material, parent: THREE.Object3D) => add(parent, geo, mat);
  const torus = (radius: number, tube: number, pos: number[], mat: THREE.Material, parent: THREE.Object3D) => { const o = create(new THREE.TorusGeometry(radius, tube, 6, 80), mat, parent); o.rotation.x = Math.PI / 2; o.position.set(pos[0], pos[1], pos[2]); return o; };
  const curveRod = (points: THREE.Vector3[], radius: number, material: THREE.Material, parent: THREE.Object3D) => create(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 16, radius, 7, false), material, parent);
  const rod = (a: THREE.Vector3, b: THREE.Vector3, radius: number, mat: THREE.Material, parent: THREE.Object3D) => {
    const delta = b.clone().sub(a); const m = create(new THREE.CylinderGeometry(radius, radius, delta.length(), 9), mat, parent);
    m.position.copy(a).add(b).multiplyScalar(.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize()); return m;
  };
  const bellShape = [new THREE.Vector2(.32, -.45), new THREE.Vector2(.48, -.52), new THREE.Vector2(.56, -.64), new THREE.Vector2(.61, -.9), new THREE.Vector2(.68, -1.35), new THREE.Vector2(.78, -1.95), new THREE.Vector2(.9, -2.36), new THREE.Vector2(.94, -2.43), new THREE.Vector2(.94, -2.54), new THREE.Vector2(.85, -2.55), new THREE.Vector2(.82, -2.4), new THREE.Vector2(.69, -1.93), new THREE.Vector2(.59, -1.33), new THREE.Vector2(.51, -.73), new THREE.Vector2(.3, -.6)];
  const bellMesh = create(new THREE.LatheGeometry(bellShape.reverse(), 96), bronze, bellPivot); bellMesh.name = 'Tactile bronze temple bell';
  for (const [r, y] of [[.94, -2.46], [.91, -2.36], [.85, -2.18], [.62, -.95], [.59, -.76]]) torus(r, .019, [0, y, 0], bronzeEdge, bellPivot);
  for (let side = 0; side < 4; side++) {
    const angle = side * Math.PI / 2 + Math.PI / 4;
    for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) {
      const a = angle + (col - 1) * .16, y = -1.0 - row * .135, r = .655 + row * .02;
      const boss = create(new THREE.SphereGeometry(.032, 10, 8), bronzeEdge, bellPivot); boss.position.set(Math.sin(a) * r, y, Math.cos(a) * r); boss.scale.set(1, 1, .75);
    }
    for (const sideOffset of [-.3, .3]) { const a = angle + sideOffset; rod(new THREE.Vector3(Math.sin(a) * .61, -.82, Math.cos(a) * .61), new THREE.Vector3(Math.sin(a) * .72, -1.42, Math.cos(a) * .72), .011, bronzeEdge, bellPivot); }
  }
  for (let i = 0; i < 36; i++) {
    const a = i / 36 * Math.PI * 2;
    const petal = create(new THREE.SphereGeometry(.06, 8, 6), bronzeEdge, bellPivot); petal.position.set(Math.sin(a) * .88, -2.27, Math.cos(a) * .88); petal.scale.set(.6, 1.7, .22); petal.rotation.y = a;
  }
  const strikingDisk = create(new THREE.CylinderGeometry(.16, .16, .03, 32), bronzeEdge, bellPivot); strikingDisk.position.set(.26, -1.79, .716); strikingDisk.rotation.x = Math.PI / 2; strikingDisk.rotation.z = -.34;
  const diskRing = create(new THREE.TorusGeometry(.135, .008, 5, 32), bronzeDark, bellPivot); diskRing.position.set(.26, -1.79, .737);
  const bellRadiusAt = (y: number) => {
    const profile = [[-2.36, .9], [-1.95, .78], [-1.35, .68], [-.9, .61]];
    for (let i = 0; i < profile.length - 1; i++) { const [low, r0] = profile[i], [high, r1] = profile[i + 1]; if (y <= high) return THREE.MathUtils.lerp(r0, r1, (y - low) / (high - low)); }
    return .61;
  };
  const castingLine = (coords: number[][], angle: number, raised: boolean) => {
    const points = coords.map(([a, y]) => { const radius = bellRadiusAt(y) + (raised ? .0025 : -.0006); return new THREE.Vector3(Math.sin(angle + a) * radius, y, Math.cos(angle + a) * radius); });
    curveRod(points, raised ? .0032 : .0018, raised ? bronzeRelief : bronzeEngraving, bellPivot);
  };
  for (let panel = 0; panel < 4; panel++) {
    const angle = panel * Math.PI / 2 + Math.PI / 4;
    for (const side of [-1, 1]) {
      castingLine([[0, -1.99], [side * .16, -1.85], [side * .30, -1.81], [side * .31, -1.65], [side * .19, -1.63], [side * .17, -1.75], [side * .23, -1.76]], angle, true);
      castingLine([[side * .035, -1.985], [side * .17, -1.88], [side * .32, -1.835], [side * .34, -1.66], [side * .20, -1.605]], angle, false);
      castingLine([[0, -1.94], [side * .10, -1.78], [side * .11, -1.62], [side * .055, -1.52], [0, -1.69], [0, -1.94]], angle, true);
      castingLine([[0, -2.035], [side * .13, -1.99], [side * .25, -2.00], [side * .16, -2.07], [0, -2.035]], angle, true);
    }
    castingLine([[0, -1.94], [0, -1.79], [0, -1.59], [0, -1.48]], angle, false);
    castingLine([[-.38, -2.12], [-.19, -2.125], [0, -2.128], [.19, -2.125], [.38, -2.12]], angle, false);
  }
  for (let petal = 0; petal < 12; petal++) {
    const angle = petal * Math.PI / 6;
    const relief = create(new THREE.SphereGeometry(.021, 8, 5), bronzeRelief, bellPivot);
    relief.position.set(.26 + Math.cos(angle) * .103, -1.79 + Math.sin(angle) * .103, .741); relief.scale.set(1.25, .7, .16); relief.rotation.z = angle;
  }
  const strikeCenter = create(new THREE.SphereGeometry(.072, 24, 12), bronzeEdge, bellPivot); strikeCenter.position.set(.26, -1.79, .74); strikeCenter.scale.z = .07;
  const loop = create(new THREE.TorusGeometry(.19, .055, 10, 36, Math.PI * 1.8), bronzeEdge, bellPivot); loop.position.y = -.24; loop.rotation.z = .24;
  curveRod([new THREE.Vector3(-.19, -.46, .02), new THREE.Vector3(-.24, -.24, 0), new THREE.Vector3(-.11, -.08, .01), new THREE.Vector3(.03, -.23, .02), new THREE.Vector3(.16, -.44, .03)], .048, bronze, bellPivot);
  add(staticRoot, new THREE.CylinderGeometry(.055, .068, .56, 12), bronzeDark, [-2.28, 4.64, -.75]);
  add(staticRoot, rounded(8.9, .3, .34, .04), frameWood, [0, 5.07, -.75]);
  // Wooden striker log on ropes.
  const striker = new THREE.Group(); striker.position.set(-.57, 2.49, -.62); scene.add(striker);
  const log = add(striker, lathe([[0, -.95], [.12, -.95], [.142, -.9], [.15, 0], [.142, .9], [.12, .95], [0, .95]], 28), strikerWood); log.rotation.z = Math.PI / 2;
  for (const x of [-.58, .58]) {
    for (let i = 0; i < 5; i++) { const wrap = torus(.153, .012, [x + i * .022, 0, 0], ropeMaterial, striker); wrap.rotation.z = Math.PI / 2; }
    rod(new THREE.Vector3(x, .13, 0), new THREE.Vector3(x, 2.12, 0), .019, ropeMaterial, striker);
  }

  /* -------------------------------------------------------------- tea set */
  const teaTable = new THREE.Group(); scene.add(teaTable);
  const tableWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'x', light: '#7c5a3e', dark: '#43301f', rings: 14, polish: .9, roughness: [.4, .6], key: 'table' });
  add(teaTable, rounded(1.48, .09, .87, .025), tableWood, [0, .71, 0]);
  for (const x of [-.58, .58]) for (const z of [-.3, .3]) add(teaTable, rounded(.1, .46, .1, .015), tableWood, [x, .44, z]);
  const tray = add(teaTable, new THREE.CylinderGeometry(.38, .4, .035, 48), tableWood, [0, .772, 0]); tray.scale.set(1.37, 1, 1);
  const trayRim = torus(.373, .013, [0, .79, 0], tableWood, teaTable); trayRim.scale.set(1.37, 1, 1);
  const celadon = new THREE.MeshPhysicalMaterial({ color: '#a9bfa8', roughness: .32, clearcoat: 1, clearcoatRoughness: .08, metalness: 0 });
  applyWeathering(celadon, { key: 'celadon', mottle: .08, bump: .3, scale: 6 });
  add(teaTable, lathe([[.075, 0], [.115, .014], [.145, .2], [.138, .209], [.13, .2], [.104, .03], [0, .03]], 48), celadon, [.25, .79, .105]);
  const tea = new THREE.MeshPhysicalMaterial({ color: '#4a3415', roughness: .05, clearcoat: 1, metalness: 0 });
  add(teaTable, new THREE.CircleGeometry(.128, 36), tea, [.25, .97, .105]).rotation.x = -Math.PI / 2;
  const potMat = new THREE.MeshPhysicalMaterial({ color: '#7d7a5e', roughness: .45, clearcoat: .6, clearcoatRoughness: .2 });
  const potGroup = new THREE.Group(); potGroup.position.set(-.22, .79, -.025); potGroup.scale.setScalar(.78); teaTable.add(potGroup);
  add(potGroup, lathe([[0, 0], [.12, 0], [.21, .055], [.23, .19], [.18, .30], [.115, .34], [0, .34]], 48), potMat);
  add(potGroup, new THREE.CylinderGeometry(.13, .15, .04, 32), potMat, [0, .35, 0]);
  add(potGroup, new THREE.CylinderGeometry(.037, .05, .052, 20), potMat, [0, .395, 0]);
  add(potGroup, new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-.15, .27, 0), new THREE.Vector3(-.35, .33, 0), new THREE.Vector3(-.39, .13, 0), new THREE.Vector3(-.2, .07, 0)]), 20, .026, 8), potMat);
  add(potGroup, new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(.195, .135, 0), new THREE.Vector3(.285, .215, 0), new THREE.Vector3(.315, .34, 0)]), 16, .03, 8), potMat);
  const wovenMat = applyWeathering(new THREE.MeshStandardMaterial({ color: '#a89878', roughness: 1 }), { key: 'mat', mottle: .2, bump: 4, scale: 8 });
  add(teaTable, rounded(.25, .012, .23, .004), wovenMat, [.32, .79, -.17]);

  /* ------------------------------------------------------------------ hall */
  const hall = new THREE.Group(); hall.position.set(.9, -.72, -30); hall.rotation.y = .04; staticRoot.add(hall);
  // Stepped granite platform and a central stair.
  for (const [w, h, d, y] of [[17, .5, 10.4, .25], [16.2, .5, 9.6, .75]]) {
    const n = Math.round(w / 1.4);
    for (let k = 0; k < n; k++) add(hall, rounded(w / n - .03, h, d, .05), granite, [(k + .5) / n * w - w / 2, y, 0]);
  }
  for (let i = 0; i < 4; i++) add(hall, rounded(3.6, .25, .42, .04), granite, [0, .125 + i * .25, 5.45 - i * .38]);
  const hallColumnTop = 4.6;
  const hallCol = columnGeometry(hallColumnTop - 1.0, .22);
  const fronts: number[] = [];
  for (let k = -4; k <= 4; k++) fronts.push(k * 1.7);
  for (const z of [3.6, -3.6]) for (const x of fronts) {
    add(hall, new THREE.CylinderGeometry(.33, .38, .14, 8), granite, [x, 1.07, z]);
    add(hall, hallCol.clone(), columnWood, [x, 1.0, z]);
  }
  for (const x of [-6.8, 6.8]) for (const z of [-1.2, 1.2]) { add(hall, hallCol.clone(), columnWood, [x, 1.0, z]); }
  hallCol.dispose();
  // Lattice doors across the front, plaster walls elsewhere.
  for (let k = 0; k < 8; k++) {
    const x0 = fronts[k], x1 = fronts[k + 1], w = (x1 - x0 - .26) / 2;
    for (const half of [0, 1]) {
      const door = add(hall, new THREE.PlaneGeometry(w - .02, 3.1), latticeMat, [x0 + .13 + w * (half + .5), 2.6, 3.5]);
      door.castShadow = false;
    }
    add(hall, rounded(x1 - x0, .1, .12, .02), frameWood, [(x0 + x1) / 2, 1.1, 3.5]);
    add(hall, rounded(x1 - x0, .1, .12, .02), frameWood, [(x0 + x1) / 2, 4.15, 3.5]);
    add(hall, rounded(x1 - x0 - .3, .32, .06, .02), plaster, [(x0 + x1) / 2, 4.38, 3.52]);
  }
  add(hall, new THREE.BoxGeometry(13.4, 3.6, .2), plaster, [0, 2.8, -3.55]);
  for (const x of [-6.75, 6.75]) add(hall, new THREE.BoxGeometry(.2, 3.6, 7.0), plaster, [x, 2.8, 0]);
  for (const z of [3.6, -3.6]) { beamX(13.9, .34, .26, [0, hallColumnTop - .12, z], beam, hall); beamX(13.6, .2, .22, [0, hallColumnTop + .42, z], beamBlue, hall); }
  for (const x of [-6.8, 6.8]) { beamZ(7.6, .34, .26, [x, hallColumnTop - .12, 0], beam, hall); }
  // Closed ceiling: no gap between the bracket band and the eaves can show sky.
  add(hall, new THREE.BoxGeometry(13.8, .12, 7.4), boardWood, [0, hallColumnTop + .95, 0]);
  // Multi-bracket band (다포) between columns: stacked arms and bearing blocks.
  const hallBracket = (x: number, z: number, out: number, angle: number) => {
    const g = new THREE.Group(); g.position.set(x, hallColumnTop + .02, z); g.rotation.y = angle; hall.add(g);
    add(g, new THREE.CylinderGeometry(.2, .15, .14, 4), sideGreen, [0, .07, 0]).rotation.y = Math.PI / 4;
    for (let tier = 0; tier < 3; tier++) {
      const a = bracketArm(.75 + tier * .32, .2, .13, [brackets.caps, brackets.sides]); a.position.set(0, .16 + tier * .2, out * .12 * tier); a.rotation.y = out > 0 ? -Math.PI / 2 : Math.PI / 2; a.castShadow = true; g.add(a);
      add(g, rounded(.62 + tier * .2, .12, .12, .015), tier % 2 ? sideGreen : beamBlue, [0, .22 + tier * .2, 0]);
      for (const dx of [-.28 - tier * .1, 0, .28 + tier * .1]) add(g, rounded(.12, .08, .12, .012), cream, [dx, .32 + tier * .2, 0]);
    }
  };
  for (const z of [3.6, -3.6]) for (let k = 0; k < fronts.length; k++) {
    hallBracket(fronts[k], z, z > 0 ? 1 : -1, 0);
    if (k < fronts.length - 1) hallBracket((fronts[k] + fronts[k + 1]) / 2, z, z > 0 ? 1 : -1, 0);
  }
  for (const x of [-6.8, 6.8]) for (const z of [-2.4, 0, 2.4]) hallBracket(x, z, 1, x > 0 ? -Math.PI / 2 : Math.PI / 2);
  // A plain dark name board above the central doors (no lettering).
  add(hall, rounded(2.2, .75, .1, .03), new THREE.MeshStandardMaterial({ color: '#2b2520', roughness: .6 }), [0, 5.0, 3.85]).rotation.x = -.18;
  add(hall, rounded(2.36, .9, .06, .03), vermilion, [0, 5.0, 3.81]).rotation.x = -.18;
  const hallRoof = buildRoof({ halfWidth: 9.2, halfDepth: 5.7, eaveY: 5.3, ridgeY: 9.4, hipDepth: 2.9, lift: .7, flare: .28, thickness: .38, soffit: 2.4, row: .31 }, { tile, ridge: ridgeMat, gable: boardWood, soffit: boardWood, rafter: rafterWood, rafterEnd, endTile });
  hall.add(hallRoof.group);

  /* ------------------------------------------------------- pagoda, lantern */
  const pagodaRoot = pagoda(granite, staticRoot); pagodaRoot.position.set(6.6, -.72, -19.5); pagodaRoot.rotation.y = .1;
  const lanternRoot = stoneLantern(granite, lanternGlow, staticRoot); lanternRoot.position.set(.75, -.72, -21.5);
  lanternRoot.scale.setScalar(1.05);

  /* ------------------------------------------------------------------ pines */
  const pineOut: PineOutput = { pads: [], padColors: [], crowns: [] };
  const pineRand = seeded(4410);
  const pineSpots: Array<[number, number, number, number]> = [[-9, -7, 9, 1.4], [-13.5, -15, 12, -.9], [-8.5, -24, 10, 1], [17, -21, 11, -1.1], [24.5, -35, 13, -.8], [-19, -31, 13, 1.2], [17.5, -9, 10, -1.6], [-21, -42, 14, .9], [-12, -38, 11, -.7], [-4.5, -40, 12, 1.2], [6, -41, 12, -.5], [9.5, -39, 13, 1], [27.5, -44, 15, -1], [-27, -24, 13, 1], [25, -21, 12, -.8]];
  for (const [x, z, h, lean] of pineSpots) pine(staticRoot, bark, pineRand, new THREE.Vector3(x, -.8, z), h, lean, pineOut, z > -30 ? 1 : .6);
  const needleMap = own(needleTexture());
  const needleMat = applyFoliage(new THREE.MeshStandardMaterial({ map: needleMap, color: '#ffffff', roughness: .85, side: THREE.DoubleSide, alphaTest: .4, alphaToCoverage: true }), { translucency: '#b9d27a', wrap: .5, key: 'pine-needles' });
  const padGeo = new THREE.PlaneGeometry(1, 1);
  const pads = new THREE.InstancedMesh(padGeo, needleMat, pineOut.pads.length);
  pineOut.pads.forEach((m, i) => { pads.setMatrixAt(i, m); pads.setColorAt(i, pineOut.padColors[i]); });
  pads.castShadow = true; pads.receiveShadow = true; scene.add(pads);
  // Distant forest on the slopes behind the hall: many simple crowns.
  const distantGeo = new THREE.IcosahedronGeometry(1, 1);
  const dp = distantGeo.attributes.position;
  for (let i = 0; i < dp.count; i++) { const s = 1 + fbm3(dp.getX(i) * 2, dp.getY(i) * 2, dp.getZ(i) * 2, 2) * .35; dp.setXYZ(i, dp.getX(i) * s, dp.getY(i) * s * .8, dp.getZ(i) * s); }
  distantGeo.computeVertexNormals();
  const distantMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 1 });
  const distantSpots: THREE.Matrix4[] = [], distantColors: THREE.Color[] = [];
  const o = new THREE.Object3D();
  for (let i = 0; i < 520; i++) {
    const x = mix(-90, 90), z = mix(-75, -40);
    const outside = Math.max(0, Math.abs(x - .6) - 12) + Math.max(0, -z - 38);
    if (outside < 2) continue;
    // Keep the corridor toward the rising sun open.
    if (Math.abs(x - (.8 + SUN.x / -SUN.z * (4.8 - z))) < 10) continue;
    const y = groundY(x, z);
    const s = mix(1.6, 3.2);
    o.position.set(x, y + s * .9, z); o.scale.set(s, s * mix(.9, 1.4), s); o.rotation.y = random() * 6; o.updateMatrix();
    distantSpots.push(o.matrix.clone()); distantColors.push(new THREE.Color().setHSL(mix(.24, .3), mix(.25, .4), mix(.1, .17)));
  }
  const distant = new THREE.InstancedMesh(distantGeo, distantMat, distantSpots.length);
  distantSpots.forEach((m, i) => { distant.setMatrixAt(i, m); distant.setColorAt(i, distantColors[i]); });
  scene.add(distant);

  // Maple branch on the right: thin back-lit leaves catch the low sun.
  const branchGroup = new THREE.Group(); branchGroup.position.set(9.2, -.65, -6.6); scene.add(branchGroup);
  add(branchGroup, taperedTube([new THREE.Vector3(0, 0, 0), new THREE.Vector3(-.5, 2.8, .4), new THREE.Vector3(-1.1, 4.6, .1), new THREE.Vector3(-2.6, 5.6, -.4)], t => .16 * (1 - t * .7), 20, 9), bark);
  const leafShape = new THREE.Shape(); leafShape.moveTo(0, -.07); leafShape.lineTo(-.12, .035); leafShape.lineTo(-.08, .066); leafShape.lineTo(-.19, .17); leafShape.lineTo(-.07, .15); leafShape.lineTo(-.063, .26); leafShape.lineTo(0, .20); leafShape.lineTo(.035, .34); leafShape.lineTo(.092, .18); leafShape.lineTo(.20, .23); leafShape.lineTo(.133, .105); leafShape.lineTo(.22, .062); leafShape.lineTo(.088, .021); leafShape.closePath();
  const mapleGeo = new THREE.ShapeGeometry(leafShape);
  const mp = mapleGeo.attributes.position;
  for (let i = 0; i < mp.count; i++) mp.setZ(i, (mp.getX(i) ** 2) * .9 - mp.getY(i) * .05);
  mapleGeo.computeVertexNormals();
  const mapleMat = applyFoliage(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .7, side: THREE.DoubleSide }), { translucency: '#ffd890', wrap: .45, key: 'maple' });
  const mapleMatrices: THREE.Matrix4[] = [], mapleColors: THREE.Color[] = [];
  for (let i = 0; i < 11; i++) {
    const start = new THREE.Vector3(-.5 - i * .2, 3.6 + i * .16, -.1), a = .6 + i * 2.15;
    const end = start.clone().add(new THREE.Vector3(Math.max(-.6, Math.sin(a) * 1.05), .22 + random() * .3, Math.cos(a) * .9));
    add(branchGroup, taperedTube([start, start.clone().lerp(end, .5).add(new THREE.Vector3(0, .11, 0)), end], t => .028 * (1 - t * .6), 8, 5), bark);
    for (let j = 0; j < 80; j++) {
      const r = Math.sqrt(random()) * .9, a2 = random() * 6.28;
      o.position.set(end.x + Math.cos(a2) * r, end.y + mix(-.25, .35), end.z + Math.sin(a2) * r);
      o.rotation.set(-Math.PI / 2 + mix(-.6, .6), random() * 6.28, mix(-.4, .4)); o.scale.setScalar(mix(.65, 1.25)); o.updateMatrix();
      mapleMatrices.push(o.matrix.clone());
      mapleColors.push(new THREE.Color().setHSL(mix(.15, .24), mix(.45, .62), mix(.22, .36)));
    }
  }
  const leafInstances = new THREE.InstancedMesh(mapleGeo, mapleMat, mapleMatrices.length);
  mapleMatrices.forEach((m, i) => { leafInstances.setMatrixAt(i, m); leafInstances.setColorAt(i, mapleColors[i]); });
  leafInstances.castShadow = true; leafInstances.receiveShadow = true; branchGroup.add(leafInstances);
  // Grass tufts along stones and stair edges.
  const grassGeo = new THREE.BufferGeometry(); grassGeo.setAttribute('position', new THREE.Float32BufferAttribute([-.022, 0, 0, .022, 0, 0, .04, .3, .02, .04, .3, .02, .022, 0, 0, .05, .42, .035], 3)); grassGeo.computeVertexNormals();
  const grassMat = applyFoliage(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .9, side: THREE.DoubleSide }), { translucency: '#8fa04a', wrap: .4, key: 'temple-grass' });
  const grasses = new THREE.InstancedMesh(grassGeo, grassMat, 2600);
  for (let i = 0; i < 2600; i++) {
    const side = random() > .5 ? 1 : -1;
    const x = i < 1600 ? side * mix(5.5, 14) : (random() > .5 ? mix(-1.6, -1.1) : mix(2.1, 2.6)), z = i < 1600 ? mix(-28, -4) : -5 - random() * 18;
    o.position.set(x, -.72, z); o.rotation.set(0, random() * 6.28, mix(-.35, .35)); const s = i < 1600 ? mix(.5, 1.5) : mix(.3, .7); o.scale.set(s, s, s); o.updateMatrix(); grasses.setMatrixAt(i, o.matrix);
    grasses.setColorAt(i, new THREE.Color().setHSL(mix(.17, .25), mix(.35, .5), mix(.12, .2)));
  }
  grasses.receiveShadow = true; staticRoot.add(grasses);

  /* ------------------------------------------------------------ wind chime */
  const chimePivot = new THREE.Group(); chimePivot.position.set(2.63, 4.58, -2.32); scene.add(chimePivot);
  rod(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -.42, 0), .007, bronzeDark, chimePivot);
  const chime = create(new THREE.LatheGeometry([new THREE.Vector2(.028, -.42), new THREE.Vector2(.09, -.45), new THREE.Vector2(.115, -.58), new THREE.Vector2(.12, -.61), new THREE.Vector2(.09, -.61), new THREE.Vector2(.069, -.47)].reverse(), 32), bronze, chimePivot);
  rod(new THREE.Vector3(0, -.5, 0), new THREE.Vector3(0, -1.13, 0), .004, bronzeDark, chimePivot);
  const fishShape = new THREE.Shape(); fishShape.moveTo(-.13, 0); fishShape.quadraticCurveTo(-.04, .08, .085, .025); fishShape.lineTo(.16, .073); fishShape.lineTo(.15, -.067); fishShape.lineTo(.07, -.026); fishShape.quadraticCurveTo(-.04, -.08, -.13, 0);
  const fish = create(new THREE.ExtrudeGeometry(fishShape, { depth: .006, bevelEnabled: true, bevelThickness: .002, bevelSize: .002, bevelSegments: 1 }), bronzeEdge, chimePivot); fish.position.set(0, -1.13, 0);
  chime.name = 'Bronze wind chime';

  /* ------------------------------------------ direct-path mist stand-ins */
  const mistTexture = own(glowTexture(64, 1.6));
  const mists: THREE.Sprite[] = [];
  for (let i = 0; i < 8; i++) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: mistTexture, transparent: true, opacity: .22, depthWrite: false, color: '#f1e6d6', fog: false }));
    sprite.position.set(-35 + i * 10, 5 + (i % 3) * 2.5, -70 - (i % 2) * 20); sprite.scale.set(40, 7, 1); scene.add(sprite); mists.push(sprite);
  }

  /* ---------------------------------------------------------------- baking */
  bakeStatic(staticRoot, scene);
  for (const group of [bellPivot, striker, chimePivot, teaTable, branchGroup]) {
    const keep = group === bellPivot ? [bellMesh] : group === striker ? [log] : group === chimePivot ? [chime, fish] : [];
    keep.forEach(m => { m.userData.keep = true; });
    bakeStatic(group, group);
  }

  const raycaster = new THREE.Raycaster();
  let bellImpulse = 0, chimeImpulse = 0;
  const hitTargets = [bellMesh, log, chime, fish];
  const resize = (aspect: number) => {
    camera.aspect = aspect;
    if (aspect < .8) {
      camera.fov = 54; camera.position.set(-1.8, 1.65, 4.9); camera.lookAt(-1.65, 2.2, -8); teaTable.position.set(-1.8, 0, 2.25); teaTable.rotation.y = -.22;
    } else if (aspect < 1.25) {
      camera.fov = 54; camera.position.set(.55, 1.65, 4.6); camera.lookAt(-.25, 2.2, -9.5); teaTable.position.set(2.6, 0, 1.65); teaTable.rotation.y = -.15;
    } else {
      camera.fov = 53; camera.position.set(.8, 1.62, 4.8); camera.lookAt(-.05, 2.03, -10.5); teaTable.position.set(2.3, 0, 1.72); teaTable.rotation.y = -.13;
    }
    camera.updateProjectionMatrix(); camera.updateMatrixWorld();
  };
  resize(16 / 9);

  const u1 = new THREE.Vector3().crossVectors(SUN, new THREE.Vector3(0, 1, 0)).normalize();
  const u2 = new THREE.Vector3().crossVectors(u1, SUN).normalize();
  // Shafts only matter where crowns stand between the courtyard air and the sun.
  const sunLine = (c: THREE.Vector4) => { const v = new THREE.Vector3(c.x - .8, c.y - 1.62, c.z - 4.8); return v.sub(SUN.clone().multiplyScalar(v.dot(SUN))).length() - c.w; };
  const crowns = [...pineOut.crowns].sort((a, b) => sunLine(a) - sunLine(b)).slice(0, 10);
  while (crowns.length < 10) crowns.push(new THREE.Vector4(0, -100, 0, .01));
  const skyUniforms = (sky.material as THREE.ShaderMaterial).uniforms;
  return {
    scene, camera, resize,
    dispose() { checkedEnvironment.dispose(); textures.forEach(t => t.dispose()); },
    post: {
      exposure: .96, bloomStrength: .1, bloomThreshold: 0, aoStrength: .9, aoRadius: .7,
      saturation: 1.1, contrast: 1.12, shadowTint: [.93, .98, 1.07], highlightTint: [1.07, 1.0, .91], vignette: .42, grain: .018,
    },
    setPostActive(active) {
      scene.fog = active ? null : directFog;
      mists.forEach(m => { m.visible = !active; });
    },
    createVolume(): VolumeEffect {
      return { material: new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX, fragmentShader: VOLUME_FRAGMENT, depthTest: false, depthWrite: false, toneMapped: false,
        uniforms: {
          uSunDir: { value: SUN.clone() }, uSunColor: { value: new THREE.Vector3(SUN_COLOR.r, SUN_COLOR.g, SUN_COLOR.b).multiplyScalar(1.5) },
          uSkyColor: { value: new THREE.Vector3(.36, .4, .5) }, uU1: { value: u1 }, uU2: { value: u2 }, uCrowns: { value: crowns },
          uHaze: { value: .0012 }, uValley: { value: .028 }, uGround: { value: .0032 },
        },
      }) };
    },
    update(time, dt) {
      skyUniforms.uTime.value = time;
      bellImpulse *= Math.exp(-dt * .7); chimeImpulse *= Math.exp(-dt * 1.1);
      bellPivot.rotation.z = Math.sin(time * 1.74) * .008 + Math.sin(time * 2.7) * bellImpulse * .018;
      striker.rotation.z = Math.sin(time * 2.7) * bellImpulse * .028;
      chimePivot.rotation.z = Math.sin(time * 1.15) * .025 + Math.sin(time * 3.7) * chimeImpulse * .1;
      chimePivot.rotation.x = Math.sin(time * .82) * .017;
      branchGroup.rotation.z = Math.sin(time * .31) * .0035;
      leafInstances.rotation.y = Math.sin(time * .57) * .002;
      pads.rotation.y = Math.sin(time * .19) * .0006;
      for (let i = 0; i < mists.length; i++) mists[i].position.x = -35 + i * 10 + Math.sin(time * .018 + i) * 1.8;
    },
    interact(ndc): WorldInteraction | null {
      scene.updateMatrixWorld(true); raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(hitTargets, false); if (!hits.length) return null;
      const isChime = hits[0].object === chime || hits[0].object === fish;
      if (isChime) chimeImpulse = Math.min(.72, chimeImpulse + .42); else bellImpulse = Math.min(1, bellImpulse + .72);
      // The host/audio integrator owns all audio; position and bounded strength make spatial decay possible.
      return { scene: 'nature:temple_dawn', type: 'bell', strength: isChime ? .2 : .62, position: hits[0].point.toArray() as [number, number, number] };
    },
  };
}
