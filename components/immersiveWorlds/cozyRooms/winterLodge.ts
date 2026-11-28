import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldBuild } from './contracts';
import { createFireDetail } from './fireDetail';
import { batchStatic, clothSheet, cushion, stoneBlock, withLocalFrame } from './geometry';
import { captureRoomProbe, createRoomVolume } from './lighting';
import { GRANITE_PALETTE, rubbleFace, stonePalette, tintStone } from './masonry';
import { createRockMaterial } from '../shared/render/rockSurface';
import { createWoodMaterial } from '../shared/render/woodSurface';
import { createFabricMaterial } from '../shared/render/fabricSurface';
import { createGlazeMaterial, createPlasterMaterial, patchSurface } from '../shared/render/interiorSurface';
import { GLSL_NOISE } from '../shared/render/glsl';
import { createSnowfall } from '../shared/render/snowFall';
import { roundedBlock } from './roomTrim';
import { FROST_FRAGMENT, SPRUCE_FRAGMENT, SPRUCE_VERTEX, spruceGeometry } from './winterView';
import { fbm3, noise3, seeded } from '../shared/render/noise';

/*
 * 겨울 산장: seated in a log cabin at blue hour, facing a wide window onto a
 * snowfield, conifers and mountains whose peaks still hold the last pink of the
 * sun setting behind the lodge. The window's cold sky light (a soft shadowed
 * spot from outside the glass) meets the warm fire on the right and the floor
 * lamp on the left. The exterior is shaded in code against the twilight sky,
 * with aerial perspective; nothing is an image. Snow-laden spruces stand in
 * three depth layers, snow falls at three depths and the panes carry fern frost
 * and condensation. Original procedural work.
 */

const WINDOW = { cx: -0.69, width: 7.04, y0: 0.77, y1: 3.87, z: -4.84 };
const SKY = new THREE.Color(0.36, 0.44, 0.62);

const EXTERIOR_COMMON = /* glsl */ `
${GLSL_NOISE}
uniform vec3 uHorizon;
uniform vec3 uSkyLight;
uniform float uTime;
varying vec3 vWorld;
varying vec3 vNormalW;
vec3 aerial(vec3 color, float dist, float height) {
  float f = 1.0 - exp(-dist * 0.0068 * exp(-max(height, 0.0) * 0.03));
  return mix(color, uHorizon, clamp(f, 0.0, 0.85));
}
`;

const EXTERIOR_VERTEX = /* glsl */ `
varying vec3 vWorld;
varying vec3 vNormalW;
void main() {
  #ifdef USE_INSTANCING
  mat4 m = modelMatrix * instanceMatrix;
  #else
  mat4 m = modelMatrix;
  #endif
  vec4 w = m * vec4(position, 1.0);
  vWorld = w.xyz;
  vNormalW = normalize(mat3(m) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const SKY_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform vec3 uMoonDir;
uniform float uTime;
varying vec3 vWorld;
void main() {
  vec3 d = normalize(vWorld - cameraPosition);
  float h = d.y;
  // Blue hour away from the sunset: Earth's shadow low, the pink Belt of Venus above it.
  vec3 zenith = vec3(0.03, 0.06, 0.16), mid = vec3(0.12, 0.2, 0.42), horizon = vec3(0.4, 0.46, 0.64);
  vec3 sky = mix(horizon, mid, smoothstep(0.02, 0.28, h));
  sky = mix(sky, zenith, smoothstep(0.25, 0.85, h));
  float belt = exp(-pow((h - 0.085) / 0.06, 2.0));
  sky = mix(sky, vec3(0.78, 0.52, 0.6), belt * 0.45);
  sky *= mix(0.78, 1.0, smoothstep(-0.02, 0.05, h));
  // Thin high cloud, barely lit.
  vec2 cp = d.xz / max(h + 0.12, 0.05);
  float cloud = smoothstep(0.1, 0.7, bwFbm3(vec3(cp * vec2(0.35, 1.2), 3.0)) + 0.15) * smoothstep(0.05, 0.3, h) * 0.35;
  sky = mix(sky, vec3(0.32, 0.36, 0.52), cloud);
  // First stars.
  vec3 sp = d * 420.0;
  vec3 cell = floor(sp);
  vec3 hsh = bwHash3(cell);
  float star = step(0.9965, hsh.x) * smoothstep(0.45, 0.0, length(fract(sp) - 0.5 - (hsh.yzx - 0.5) * 0.4) * 2.0);
  sky += vec3(0.9, 0.95, 1.0) * star * smoothstep(0.25, 0.7, h) * (0.6 + 0.4 * sin(uTime * (0.3 + hsh.z) + hsh.y * 30.0)) * 1.6 * (1.0 - cloud);
  // A rising moon with a soft halo.
  float md = acos(clamp(dot(d, uMoonDir), -1.0, 1.0));
  sky += vec3(1.0, 0.97, 0.9) * (smoothstep(0.0105, 0.0095, md) * 14.0 + exp(-md * 38.0) * 0.5 + exp(-md * 9.0) * 0.07);
  gl_FragColor = vec4(sky * 0.8, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const MOUNTAIN_FRAGMENT = /* glsl */ `
${EXTERIOR_COMMON}
uniform vec3 uSun;
uniform float uGlowLow;
uniform float uGlowHigh;
void main() {
  vec3 n = normalize(vNormalW);
  float ridge = bwRidged(vWorld * vec3(0.09, 0.14, 0.09));
  float steep = smoothstep(0.22, 0.5, 1.0 - n.y + (ridge - 0.5) * 0.5);
  vec3 snow = vec3(0.62, 0.68, 0.82), rock = vec3(0.07, 0.08, 0.1);
  vec3 albedo = mix(snow, rock, steep * 0.9);
  vec3 color = albedo * uSkyLight * (0.45 + 0.55 * clamp(n.y * 0.6 + 0.4 + dot(n, vec3(0.0, 0.0, 0.35)), 0.0, 1.0));
  // Alpenglow: only the highest slopes facing the hidden sun still catch it.
  float glow = smoothstep(uGlowLow, uGlowHigh, vWorld.y + ridge * 3.0) * clamp(dot(n, uSun) * 1.4 + 0.2, 0.0, 1.0);
  color += vec3(1.0, 0.45, 0.4) * glow * albedo * 1.6;
  gl_FragColor = vec4(aerial(color, length(vWorld - cameraPosition), vWorld.y), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const SNOW_FRAGMENT = /* glsl */ `
${EXTERIOR_COMMON}
uniform vec4 uSpill;
void main() {
  vec3 n = normalize(vNormalW);
  float drift = bwFbm3(vWorld * vec3(0.35, 0.0, 0.35));
  float ripple = bwNoise(vWorld * vec3(2.2, 0.0, 0.7));
  vec3 color = vec3(0.7, 0.76, 0.88) * uSkyLight * (0.55 + 0.45 * clamp(n.y + drift * 0.15 + ripple * 0.04, 0.0, 1.0));
  // Wind-drift shadows hold a deeper blue.
  color *= 0.9 + 0.12 * drift;
  // Ice crystals glint as the eye moves; stable in world space.
  vec3 sp = floor(vWorld * 55.0);
  vec3 h = bwHash3(sp);
  float dist = length(vWorld - cameraPosition);
  color += vec3(0.8, 0.9, 1.0) * step(0.997, h.x) * smoothstep(30.0, 6.0, dist) * (0.6 + 0.4 * sin(uTime * 0.5 + h.y * 40.0)) * 1.4;
  // Warm lamplight falling out of the window onto the nearest snow.
  vec2 rel = vec2((vWorld.x - uSpill.x) / uSpill.z, (vWorld.z - uSpill.y) / uSpill.w);
  float spill = exp(-dot(rel, rel)) * smoothstep(0.0, -1.0, vWorld.z - uSpill.y + 0.5);
  color += vec3(1.0, 0.62, 0.32) * spill * 0.32;
  gl_FragColor = vec4(aerial(color, dist, vWorld.y), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;


export function createWinterLodgeWorld(): WorldBuild {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0.02, 0.03, 0.06);
  const camera = new THREE.PerspectiveCamera(51, 1, 0.06, 260);
  const random = seeded(30410);
  const matrix = new THREE.Matrix4(), euler = new THREE.Euler(), quat = new THREE.Quaternion(), pos = new THREE.Vector3(), scl = new THREE.Vector3();
  const place = (geometry: THREE.BufferGeometry, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => {
    matrix.compose(pos.set(x, y, z), quat.setFromEuler(euler.set(rx, ry, rz)), scl.set(sx, sy, sz));
    return geometry.applyMatrix4(matrix);
  };
  const add = (geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D = scene, shadow = true) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = shadow; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  };
  const timeUniform = { value: 0 };
  let lampOn = true, cupResponse = 0, logResponse = 0, timeNow = 0;

  // --- Materials --------------------------------------------------------------
  const logWood = createWoodMaterial('#93694a', { key: 'lodge-logs', axis: 'x', localFrame: true, pith: [0, 0], rings: 40, figure: 0.75, pores: 0.35, wear: 0.4, roughness: 0.72, bump: 2.4 }, { vertexColors: true });
  const chinking = createPlasterMaterial('#b7ad9c', { key: 'lodge-chinking', scale: 3, bump: 1.5, stains: 0.6 });
  const floor = createWoodMaterial('#6f4e34', { key: 'lodge-floor', axis: 'z', rings: 18, figure: 0.7, pores: 0.4, wear: 0.4, varnish: 0.35, roughness: 0.5, planks: { width: 0.26, length: 2.8, bevel: 0.005, tone: 0.34 } });
  const ceiling = createWoodMaterial('#5d4330', { key: 'lodge-ceiling', axis: 'x', rings: 20, figure: 0.6, pores: 0.3, wear: 0.1, roughness: 0.75, planks: { width: 0.16, length: 3.1, bevel: 0.004, tone: 0.3 } });
  const timber = createWoodMaterial('#4b3221', { key: 'lodge-timber', axis: 'x', rings: 14, figure: 0.6, pores: 0.7, wear: 0.2, roughness: 0.72 });
  const timberY = createWoodMaterial('#4b3221', { key: 'lodge-timber-y', axis: 'y', rings: 14, figure: 0.6, pores: 0.7, wear: 0.2, roughness: 0.72 });
  const sill = createWoodMaterial('#6a4630', { key: 'lodge-sill', axis: 'x', rings: 26, figure: 0.7, pores: 0.5, wear: 0.3, varnish: 0.45, roughness: 0.48 });
  const turned = createWoodMaterial('#5e3e28', { key: 'lodge-turned', axis: 'y', objectSpace: true, rings: 40, figure: 0.6, varnish: 0.45, roughness: 0.5 });
  const stone = createRockMaterial('#ffffff', { key: 'lodge-stone', scale: 3.0, bump: 1.2, stain: '#3d342c', stainAmount: 0.2, cavity: 0.55, strata: 0.1, drips: 0, wetness: 0, dryRoughness: 0.86, algaeAmount: 0 }, { vertexColors: true });
  const mortar = createRockMaterial('#9a9387', { key: 'lodge-mortar', scale: 7, bump: 0.35, cavity: 0.3, strata: 0, stainAmount: 0.05, drips: 0, wetness: 0, dryRoughness: 0.95, algaeAmount: 0 });
  const hearthStone = createRockMaterial('#6f6b66', { key: 'lodge-hearth', scale: 1.6, bump: 0.4, stain: '#3e3a35', stainAmount: 0.15, cavity: 0.35, strata: 0.05, drips: 0, wetness: 0, dryRoughness: 0.6, algaeAmount: 0 });
  const firebrick = patchSurface(new THREE.MeshStandardMaterial({ color: '#33201a', roughness: 0.95 }), {
    key: 'lodge-firebox',
    color: 'float fxN = bwFbm3(vSurfaceWorld * 4.0); diffuseColor.rgb = mix(diffuseColor.rgb * (0.7 + 0.4 * fxN), vec3(0.012, 0.011, 0.01), 0.6 + 0.3 * smoothstep(0.4, 1.4, vSurfaceWorld.y));',
    height: 'fxN * 0.002',
  });
  const iron = patchSurface(new THREE.MeshStandardMaterial({ color: '#1d1b19', metalness: 0.8, roughness: 0.55 }), {
    key: 'lodge-iron',
    color: 'float irN = bwFbm3(vSurfaceWorld * 9.0); diffuseColor.rgb *= 0.8 + 0.35 * irN;',
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.25 * irN, 0.2, 1.0);',
  });
  const brass = patchSurface(new THREE.MeshStandardMaterial({ color: '#b48a52', metalness: 1, roughness: 0.3 }), {
    key: 'lodge-brass',
    color: 'float brN = bwFbm3(vSurfaceWorld * 14.0); diffuseColor.rgb *= 0.75 + 0.3 * brN;',
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.2 * brN, 0.12, 1.0);',
  });
  const tweed = createFabricMaterial('#6a3a2c', { key: 'lodge-tweed', weave: 'twill', threads: [260, 260], heather: 1, threadContrast: 0.9, fuzz: 0.6, depth: 0.0007, sheen: 0.6, sheenColor: '#c8a08a', roughness: 0.9 });
  const plaid = createFabricMaterial('#7c2f26', {
    key: 'lodge-plaid', weave: 'twill', threads: [95, 95], heather: 0.9, threadContrast: 0.7, fuzz: 1, depth: 0.0028, sheen: 0.9, sheenColor: '#f0c8b0', roughness: 0.96,
    pattern: `
{
  // A muted tartan: overlapping warp and weft bands, half-tones where they cross.
  vec2 band = fract(fbUv * vec2(2.2, 2.2));
  float wA = step(0.08, band.x) * step(band.x, 0.36) + step(0.6, band.x) * step(band.x, 0.68);
  float fA = step(0.08, band.y) * step(band.y, 0.36) + step(0.6, band.y) * step(band.y, 0.68);
  float wB = step(0.47, band.x) * step(band.x, 0.49) + step(0.2, band.x) * step(band.x, 0.215);
  float fB = step(0.47, band.y) * step(band.y, 0.49) + step(0.2, band.y) * step(band.y, 0.215);
  vec3 red = fbBase, green = vec3(0.07, 0.12, 0.09), cream = vec3(0.62, 0.55, 0.42);
  vec3 warp = mix(red, green, wA); warp = mix(warp, cream, wB);
  vec3 weft = mix(red, green, fA); weft = mix(weft, cream, fB);
  fbBase = mix(weft, warp, mix(0.5, fbOver, fbAa));
}`,
  }, { side: THREE.DoubleSide });
  const rugWool = createFabricMaterial('#6e6352', { key: 'lodge-rug', weave: 'knit', threads: [90, 140], heather: 0.9, fuzz: 1, depth: 0.003, roughness: 0.98,
    pattern: 'fbBase *= 0.82 + 0.3 * smoothstep(0.3, 0.7, fract(length(fbUv - vec2(1.1, 0.8)) * 6.0));' }, { side: THREE.DoubleSide });
  const linenShade = createFabricMaterial('#d8c49c', { key: 'lodge-shade', weave: 'plain', threads: [300, 300], roughness: 0.9 }, { side: THREE.DoubleSide, emissive: '#ff9a45', emissiveIntensity: 1.1 });
  const ceramic = createGlazeMaterial('#d2c4ad', { key: 'lodge-cup', pool: '#8a6e50', speckle: 0.9, scale: 6 });
  const coffee = new THREE.MeshPhysicalMaterial({ color: '#1e0f08', roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.12 });
  const glass = new THREE.MeshPhysicalMaterial({ color: '#000000', roughness: 0.2, specularIntensity: 0.4, metalness: 0, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, envMapIntensity: 1.2 });

  // --- Room shell: log walls with chinking, plank ceiling and floor ------------
  const logGeometries: THREE.BufferGeometry[] = [];
  const logRadius = 0.15, logStep = 0.32;
  const cabinLog = (length: number, seed: number) => {
    const g = new THREE.CylinderGeometry(logRadius, logRadius, length, 22, Math.max(2, Math.round(length / 0.25)), false);
    g.deleteAttribute('uv');
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i), r = Math.hypot(x, z);
      if (r < 1e-5) continue;
      const a = Math.atan2(z, x);
      const swell = 1 + 0.05 * Math.sin(y / length * Math.PI * 1.3 + seed) + 0.035 * noise3(Math.cos(a) * 1.5 + seed, y * 0.8, Math.sin(a) * 1.5) + 0.02 * noise3(Math.cos(a) * 4, y * 3 + seed, Math.sin(a) * 4);
      // Checking: a long drying crack along the top quarter.
      const check = Math.exp(-((a - 1.2 - 0.3 * Math.sin(seed)) ** 2) / 0.0012) * 0.012 * (0.5 + 0.5 * Math.sin(y * 1.7 + seed));
      p.setXYZ(i, x * swell - Math.cos(a) * check, y, z * swell - Math.sin(a) * check);
    }
    g.computeVertexNormals();
    withLocalFrame(g);
    const local = g.getAttribute('surfaceLocal');
    for (let i = 0; i < local.count; i++) local.setY(i, local.getY(i) + seed * 9.7);
    // Grain runs along the cylinder axis (y); swap into the x-axis frame the material expects.
    const ln = g.getAttribute('surfaceLocalNormal');
    for (let i = 0; i < local.count; i++) {
      const lx = local.getX(i), ly = local.getY(i); local.setX(i, ly); local.setY(i, lx);
      const nx = ln.getX(i), ny = ln.getY(i); ln.setX(i, ny); ln.setY(i, nx);
    }
    return g;
  };
  // Each log its own tone (some silvered, some honey), dark where logs meet the chinking,
  // and a few strips of bark the drawknife missed.
  const toneLog = (g: THREE.BufferGeometry, k: number) => {
    const r = seeded(k * 131 + 7);
    const base = new THREE.Color().setHSL(0.075 + (r() - 0.5) * 0.02, 0.35 + r() * 0.2, 0.42 + r() * 0.16);
    const p = g.attributes.position, n = g.attributes.normal, colors = new Float32Array(p.count * 3);
    for (let i = 0; i < p.count; i++) {
      const contact = Math.pow(Math.abs(n.getY(i)), 3) * (n.getY(i) < 0 ? 0.55 : 0.35);
      const along = p.getX(i) + p.getZ(i);
      const bark = Math.max(0, noise3(along * 0.9 + k, k * 0.3, n.getY(i) * 2) - 0.42) * 2.2 * (1 - Math.abs(n.getY(i)));
      const tone = (1 - contact) * (0.88 + 0.24 * noise3(along * 0.35, k, 1.3));
      const c = base.clone().multiplyScalar(tone * 2.1).lerp(new THREE.Color(0.11, 0.075, 0.05), Math.min(0.85, bark));
      colors.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return g;
  };
  let seed = 1;
  for (let row = 0; row < 16; row++) {
    const y = 0.14 + row * logStep;
    if (y > 4.4) break;
    const spans: Array<[number, number]> = y > WINDOW.y0 - 0.12 && y < WINDOW.y1 + 0.12 ? [[-4.7, WINDOW.cx - WINDOW.width / 2 - 0.08], [WINDOW.cx + WINDOW.width / 2 + 0.08, 4.7]] : [[-4.7, 4.7]];
    for (const [a, b] of spans) {
      const g = cabinLog(b - a, seed++);
      // Logs along x: rotate the cylinder axis onto x; the local frame was already swapped.
      logGeometries.push(toneLog(place(g, (a + b) / 2, y, -5.02, 0, 0, Math.PI / 2), seed));
    }
    for (const side of [-1, 1]) {
      logGeometries.push(toneLog(place(cabinLog(10.4, seed++), side * 4.72, y + logStep / 2, 0, Math.PI / 2, 0, 0), seed));
    }
  }
  add(mergeGeometries(logGeometries, false)!, logWood).name = 'lodge-log-walls';
  logGeometries.forEach(g => g.dispose());
  // Chinking behind the logs, with the window cut out.
  const wallShape = new THREE.Shape();
  wallShape.moveTo(-4.7, 0); wallShape.lineTo(4.7, 0); wallShape.lineTo(4.7, 4.5); wallShape.lineTo(-4.7, 4.5); wallShape.closePath();
  const hole = new THREE.Path();
  hole.moveTo(WINDOW.cx - WINDOW.width / 2, WINDOW.y0); hole.lineTo(WINDOW.cx + WINDOW.width / 2, WINDOW.y0); hole.lineTo(WINDOW.cx + WINDOW.width / 2, WINDOW.y1); hole.lineTo(WINDOW.cx - WINDOW.width / 2, WINDOW.y1); hole.closePath();
  wallShape.holes.push(hole);
  add(place(new THREE.ShapeGeometry(wallShape), 0, 0, -5.06), chinking, scene, true);
  for (const side of [-1, 1]) add(place(new THREE.PlaneGeometry(10.4, 4.5), side * 4.79, 2.25, 0, 0, -side * Math.PI / 2), chinking, scene, false);
  add(place(new THREE.PlaneGeometry(9.6, 4.5), 0, 2.25, 5.2, 0, Math.PI), chinking, scene, false);
  add(place(new THREE.PlaneGeometry(9.6, 10.4), 0, 0, 0, -Math.PI / 2), floor, scene, false).name = 'lodge-floor';
  add(place(new THREE.PlaneGeometry(9.6, 10.4), 0, 4.48, 0, Math.PI / 2), ceiling, scene, false);
  for (const z of [-4.55, -1.4, 1.75, 4.6]) add(place(stoneBlock(9.5, 0.26, 0.24, 60 + z, 0.18, 0.025, 0, 0.08), 0, 4.33, z), timber);

  // --- Window: deep timber frame, mullions, glass, frost and a snowy outer sill -
  const winLeft = WINDOW.cx - WINDOW.width / 2, winRight = WINDOW.cx + WINDOW.width / 2;
  for (const x of [winLeft - 0.06, winRight + 0.06]) add(place(stoneBlock(0.2, WINDOW.y1 - WINDOW.y0 + 0.3, 0.36, 7 + x, 0.12, 0.02), x, (WINDOW.y0 + WINDOW.y1) / 2, -4.86), timberY);
  add(place(stoneBlock(WINDOW.width + 0.4, 0.2, 0.36, 8, 0.12, 0.02), WINDOW.cx, WINDOW.y1 + 0.06, -4.86), timber);
  add(place(stoneBlock(7.6, 0.09, 0.72, 9, 0.06, 0.012, 0, 0.05), WINDOW.cx, WINDOW.y0 - 0.06, -4.6), sill).name = 'lodge-sill';
  add(place(stoneBlock(7.5, 0.12, 0.08, 10, 0.06, 0.012), WINDOW.cx, WINDOW.y0 - 0.16, -4.27), sill);
  for (const x of [-2.83, 1.23]) add(place(stoneBlock(0.09, WINDOW.y1 - WINDOW.y0, 0.16, 11 + x, 0.06, 0.012), x, (WINDOW.y0 + WINDOW.y1) / 2, -4.84), timberY);
  add(place(stoneBlock(WINDOW.width, 0.07, 0.12, 12, 0.06, 0.01), WINDOW.cx, 2.95, -4.84), timber);
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(WINDOW.width, WINDOW.y1 - WINDOW.y0), glass);
  pane.position.set(WINDOW.cx, (WINDOW.y0 + WINDOW.y1) / 2, WINDOW.z); pane.renderOrder = 8; pane.castShadow = false; pane.receiveShadow = false; pane.userData.dynamic = true;
  scene.add(pane);
  // Panes between the frame, mullions and transom, in the frost plane's own metres.
  const paneRects = (() => {
    const m0 = -2.83 - winLeft, m1 = 1.23 - winLeft, t = 2.95 - WINDOW.y0, W = WINDOW.width, H = WINDOW.y1 - WINDOW.y0;
    const cols: Array<[number, number]> = [[0, m0 - 0.045], [m0 + 0.045, m1 - 0.045], [m1 + 0.045, W]];
    const rows: Array<[number, number]> = [[0, t - 0.035], [t + 0.035, H]];
    return rows.flatMap(([y0, y1]) => cols.map(([x0, x1]) => new THREE.Vector4(x0, y0, x1, y1)));
  })();
  const frostMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uSize: { value: new THREE.Vector2(WINDOW.width, WINDOW.y1 - WINDOW.y0) }, uPanes: { value: paneRects }, uWarm: { value: new THREE.Vector3(1.25, 0.95, 0.75) }, uTime: timeUniform },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: FROST_FRAGMENT,
  });
  const frost = new THREE.Mesh(new THREE.PlaneGeometry(WINDOW.width, WINDOW.y1 - WINDOW.y0), frostMaterial);
  frost.position.set(WINDOW.cx, (WINDOW.y0 + WINDOW.y1) / 2, WINDOW.z + 0.012); frost.renderOrder = 9; scene.add(frost);
  // Snow banked on the outer sill.
  const ledgeSnow = new THREE.PlaneGeometry(WINDOW.width + 0.2, 0.4, 140, 8);
  ledgeSnow.rotateX(-Math.PI / 2);
  const ls = ledgeSnow.attributes.position;
  for (let i = 0; i < ls.count; i++) {
    const x = ls.getX(i), z = ls.getZ(i);
    const t = (z + 0.2) / 0.4;
    ls.setY(i, WINDOW.y0 - 0.02 + Math.sin(t * Math.PI) * (0.06 + 0.03 * noise3(x * 1.5, 0, 1)) + (1 - t) * 0.04);
  }
  ledgeSnow.computeVertexNormals();

  // --- Exterior --------------------------------------------------------------
  const exteriorUniforms = { uHorizon: { value: new THREE.Vector3(0.4, 0.46, 0.64).multiplyScalar(0.8) }, uSkyLight: { value: new THREE.Vector3(SKY.r, SKY.g, SKY.b).multiplyScalar(0.62) }, uTime: timeUniform };
  const exterior = (fragmentShader: string, extra: Record<string, THREE.IUniform> = {}) => new THREE.ShaderMaterial({ vertexShader: EXTERIOR_VERTEX, fragmentShader, uniforms: { ...exteriorUniforms, ...extra } });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(200, 48, 24), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { uMoonDir: { value: new THREE.Vector3(-0.42, 0.2, -1).normalize() }, uTime: timeUniform },
    vertexShader: 'varying vec3 vWorld; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader: SKY_FRAGMENT,
  }));
  sky.renderOrder = -10; sky.frustumCulled = false; scene.add(sky);
  const snowMaterial = exterior(SNOW_FRAGMENT, { uSpill: { value: new THREE.Vector4(WINDOW.cx, -6.2, 3.6, 1.6) } });
  // The lodge sits on a shoulder: a short snowfield, then the ground falls into a
  // forested valley so the ranges beyond stay in view over the trees.
  const terrainY = (x: number, z: number) => {
    const fall = THREE.MathUtils.smoothstep(-z, 14, 70) * 6 + THREE.MathUtils.smoothstep(-z, 70, 120) * 2.5;
    return -0.3 + 0.3 * Math.sin(x * 0.1 + z * 0.16) + 0.4 * fbm3(x * 0.04, 0, z * 0.04, 3) * (1 + fall * 0.15) - fall;
  };
  const field = new THREE.PlaneGeometry(240, 200, 140, 110); field.rotateX(-Math.PI / 2);
  const fp = field.attributes.position;
  for (let i = 0; i < fp.count; i++) {
    const x = fp.getX(i), z = fp.getZ(i) - 104;
    fp.setXYZ(i, x, terrainY(x, z), z);
  }
  field.computeVertexNormals();
  const ground = new THREE.Mesh(field, snowMaterial); ground.name = 'lodge-snowfield'; scene.add(ground);
  const ledge = new THREE.Mesh(ledgeSnow, snowMaterial); ledge.position.set(WINDOW.cx, 0, -5.28); scene.add(ledge);
  // Mountain ranges with alpenglow on the high slopes.
  const mountainMaterial = exterior(MOUNTAIN_FRAGMENT, { uSkyLight: { value: new THREE.Vector3(SKY.r, SKY.g, SKY.b).multiplyScalar(0.5) }, uSun: { value: new THREE.Vector3(0.2, 0.25, 1).normalize() }, uGlowLow: { value: 22 }, uGlowHigh: { value: 40 } });
  const ranges: Array<[number, number, number]> = [[-185, 62, 11], [-150, 44, 20], [-122, 26, 38]];
  ranges.forEach(([z, height, s]) => {
    const g = new THREE.PlaneGeometry(320, 40, 220, 40); g.rotateX(-Math.PI / 2);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), t = (p.getZ(i) + 20) / 40;
      const crest = height * (0.5 + 0.32 * fbm3(x * 0.012 + s, 0, s, 4) + 0.22 * (1 - Math.abs(noise3(x * 0.028, s, 1))));
      const gully = (1 - Math.abs(noise3(x * 0.09, t * 1.2, s))) ** 3;
      const y = -20 + (crest + 20) * Math.pow(1 - t, 0.85) + fbm3(x * 0.06, t * 3, s, 3) * 3.2 * Math.sin(t * Math.PI) - gully * 4 * Math.sin(t * Math.PI);
      p.setXYZ(i, x, y, z + p.getZ(i));
    }
    g.computeVertexNormals();
    scene.add(new THREE.Mesh(g, mountainMaterial));
  });
  // Snow-laden spruces in three depth layers: a few big trees on the shoulder, a dense
  // forest down the valley and far silhouettes on the opposite slopes, each fading into the air.
  const spruceMaterial = new THREE.ShaderMaterial({ vertexShader: SPRUCE_VERTEX, fragmentShader: SPRUCE_FRAGMENT, side: THREE.DoubleSide, uniforms: { ...exteriorUniforms, uGlow: { value: new THREE.Vector3(0.9, 0.45, 0.4) } } });
  const layers: Array<{ count: number; detail: 0 | 1 | 2; z: [number, number]; spread: (z: number) => number; height: [number, number]; clear: number }> = [
    { count: 20, detail: 0, z: [-14, -30], spread: () => 56, height: [8, 14], clear: 7 },
    { count: 95, detail: 1, z: [-32, -70], spread: z => 30 - z * 1.1, height: [7, 12], clear: 0 },
    { count: 320, detail: 2, z: [-70, -135], spread: z => 50 - z * 1.3, height: [6, 11], clear: 0 },
  ];
  const groundY = terrainY;
  const spruceMeshes: THREE.InstancedMesh[] = [];
  layers.forEach((layer, li) => {
    const shapes = [spruceGeometry(11 + li * 7, layer.detail), spruceGeometry(29 + li * 5, layer.detail)];
    const matrices: THREE.Matrix4[][] = [[], []];
    let placed = 0;
    for (let attempt = 0; attempt < layer.count * 30 && placed < layer.count; attempt++) {
      const z = layer.z[0] + (layer.z[1] - layer.z[0]) * Math.pow(random(), 0.85);
      const x = (random() - 0.5) * layer.spread(z) - 0.7;
      const clump = fbm3(x * 0.05 + 3, 0, z * 0.07, 3);
      if (Math.abs(x + 0.7) < layer.clear || clump < (li === 0 ? 0.0 : -0.22)) continue;
      const h = layer.height[0] + random() * (layer.height[1] - layer.height[0]);
      const w = h * (0.85 + random() * 0.3);
      matrix.compose(pos.set(x, groundY(x, z) - 0.25, z), quat.setFromEuler(euler.set((random() - 0.5) * 0.04, random() * 6.28, (random() - 0.5) * 0.04)), scl.set(w, h, w));
      matrices[placed % 2].push(matrix.clone()); placed++;
    }
    shapes.forEach((shape, i) => {
      const mesh = new THREE.InstancedMesh(shape, spruceMaterial, matrices[i].length);
      matrices[i].forEach((m, j) => mesh.setMatrixAt(j, m));
      mesh.frustumCulled = false; mesh.castShadow = false; mesh.receiveShadow = false; mesh.name = `lodge-spruce-${li}`;
      scene.add(mesh); spruceMeshes.push(mesh);
    });
  });
  // Falling snow at three depths, outside the glass only; flakes near the window catch the lamplight.
  const snowfall = createSnowfall({
    seed: 7713,
    keyDirection: new THREE.Vector3(-0.42, 0.2, -1).normalize(), keyColor: new THREE.Color(0.12, 0.15, 0.22), ambient: new THREE.Color(0.11, 0.13, 0.2),
    wind: new THREE.Vector3(0.18, 0, 0.05),
    lights: [{ position: new THREE.Vector3(-1.4, 1.9, -4.6), color: new THREE.Color(0.9, 0.55, 0.25) }, { position: new THREE.Vector3(1.5, 1.2, -4.6), color: new THREE.Color(0.6, 0.3, 0.1) }],
    layers: [
      { count: 650, min: new THREE.Vector3(-5.5, -0.6, -8.5), max: new THREE.Vector3(4.5, 5.2, -5.45), size: [0.022, 0.04], speed: [0.35, 0.6], sway: 0.22, softness: 0.5, focus: 3.5, opacity: 0.9, brightness: 1.6 },
      { count: 1800, min: new THREE.Vector3(-16, -1.5, -26), max: new THREE.Vector3(14, 11, -8.5), size: [0.03, 0.05], speed: [0.45, 0.8], sway: 0.3, opacity: 0.85, brightness: 1.2 },
      { count: 2400, min: new THREE.Vector3(-48, -6, -80), max: new THREE.Vector3(42, 24, -26), size: [0.03, 0.06], speed: [0.6, 1.0], sway: 0.5, opacity: 0.7, brightness: 0.8 },
    ],
  });
  snowfall.group.children.forEach(child => { child.renderOrder = 5; });
  scene.add(snowfall.group);
  const flakes = snowfall.group;

  // --- Fireplace on the right, angled toward the chair -------------------------
  const hearth = new THREE.Group(); hearth.position.set(3.1, 0, -1.94); hearth.rotation.y = -0.37; hearth.userData.dynamic = true; scene.add(hearth);
  const FP = { x0: -0.98, x1: 0.98, front: 0.1, back: -0.55, top: 4.46, rx: 0.6, y1: 1.06 };
  const fpSoot = (x: number, y: number, z: number) => Math.min(0.9,
    Math.exp(-(x * x) / 0.4) * THREE.MathUtils.smoothstep(y, FP.y1 - 0.1, FP.y1 + 0.3) * (1 - THREE.MathUtils.smoothstep(y, FP.y1 + 0.5, FP.y1 + 1.6)) * 0.5
    + THREE.MathUtils.smoothstep(-z, -FP.front + 0.05, -FP.front + 0.3) * 0.65);
  const fpStones = rubbleFace({
    x0: FP.x0, x1: FP.x1, y0: 0, y1: FP.top, front: FP.front, depth: 0.2, revealDepth: FP.front - FP.back, random,
    openingHalfWidth: y => (y < FP.y1 + 0.26 ? FP.rx + 0.18 : 0), inOpening: (x, y) => y < FP.y1 + 0.26 && Math.abs(x) < FP.rx + 0.18, revealTop: FP.y1 + 0.26,
    palette: GRANITE_PALETTE, soot: fpSoot, maxWidth: 0.5, maxHeight: 0.34,
  });
  // Jambs and a long lintel stone frame the opening.
  for (const side of [-1, 1]) {
    for (let k = 0; k < 4; k++) {
      const h = 0.25 + random() * 0.04;
      const g = stoneBlock(0.18, h - 0.015, FP.front - FP.back, 400 + k + side * 10, 0.7, 0.03, 0.06);
      place(g, side * (FP.rx + 0.09), 0.12 + k * 0.245 + h / 2, (FP.front + FP.back) / 2 + random() * 0.02);
      fpStones.push(tintStone(g, stonePalette(random, GRANITE_PALETTE), fpSoot));
    }
  }
  const lintel = stoneBlock(FP.rx * 2 + 0.5, 0.24, FP.front - FP.back + 0.03, 444, 0.6, 0.03, 0.05);
  place(lintel, 0, FP.y1 + 0.13, (FP.front + FP.back) / 2 + 0.015);
  fpStones.push(tintStone(lintel, stonePalette(random, GRANITE_PALETTE).multiplyScalar(1.05), fpSoot));
  add(mergeGeometries(fpStones, false)!, stone, hearth).name = 'lodge-fireplace';
  fpStones.forEach(g => g.dispose());
  const fpShape = new THREE.Shape();
  fpShape.moveTo(FP.x0, 0); fpShape.lineTo(FP.x1, 0); fpShape.lineTo(FP.x1, FP.top); fpShape.lineTo(FP.x0, FP.top); fpShape.closePath();
  const fpHole = new THREE.Path(); fpHole.moveTo(-FP.rx, 0); fpHole.lineTo(FP.rx, 0); fpHole.lineTo(FP.rx, FP.y1); fpHole.lineTo(-FP.rx, FP.y1); fpHole.closePath();
  fpShape.holes.push(fpHole);
  add(place(new THREE.ShapeGeometry(fpShape), 0, 0, FP.front - 0.012), mortar, hearth, false);
  for (const side of [-1, 1]) add(place(new THREE.PlaneGeometry(FP.front - FP.back + 0.4, FP.top), side * FP.x1, FP.top / 2, (FP.front + FP.back) / 2 - 0.2, 0, side * Math.PI / 2), mortar, hearth, false);
  add(place(new THREE.PlaneGeometry(FP.rx * 2, FP.y1), 0, FP.y1 / 2, FP.back + 0.02), firebrick, hearth, false);
  for (const side of [-1, 1]) add(place(new THREE.PlaneGeometry(FP.front - FP.back, FP.y1), side * FP.rx * 0.98, FP.y1 / 2, (FP.front + FP.back) / 2, 0, -side * Math.PI / 2), firebrick, hearth, false);
  add(place(new THREE.PlaneGeometry(FP.rx * 2, FP.front - FP.back), 0, FP.y1 - 0.01, (FP.front + FP.back) / 2, Math.PI / 2), firebrick, hearth, false);
  add(place(stoneBlock(2.1, 0.12, 0.62, 451, 0.25, 0.012), 0, 0.06, FP.front + 0.3), hearthStone, hearth);
  add(place(new THREE.PlaneGeometry(FP.rx * 2, FP.front - FP.back), 0, 0.121, (FP.front + FP.back) / 2, -Math.PI / 2), createRockMaterial('#3a3632', { key: 'lodge-inner', scale: 3, bump: 0.3, drips: 0, wetness: 0, strata: 0, stainAmount: 0.05, algaeAmount: 0, dryRoughness: 0.95 }), hearth, false);
  add(place(stoneBlock(2.2, 0.17, 0.4, 452, 0.15, 0.018), 0, 1.62, FP.front + 0.12), timber, hearth).name = 'lodge-mantel';
  const fire = createFireDetail({
    seed: 53017,
    logs: [
      { length: 0.78, radius: 0.075, position: [0.0, 0.215, -0.13], rotation: [0, 0.06, Math.PI / 2] },
      { length: 0.74, radius: 0.08, position: [0.03, 0.215, -0.32], rotation: [0, -0.05, Math.PI / 2] },
      { length: 0.66, radius: 0.065, position: [-0.04, 0.34, -0.22], rotation: [0.1, 0.4, Math.PI / 2 + 0.12] },
    ],
    bed: { width: 0.95, depth: 0.36, y: 0.13, z: -0.22 },
    flame: { width: 0.82, depth: 0.32, y: 0.17, z: -0.22, height: 0.72 },
    light: { intensity: 11, shadow: true, mapSize: 512, forward: 0.3, inner: 0.6 },
    sparks: 16,
  });
  hearth.add(fire.group);
  for (const x of [-0.38, 0.38]) {
    const post = new THREE.LatheGeometry([[0, 0], [0.04, 0], [0.045, 0.015], [0.022, 0.04], [0.016, 0.15], [0.024, 0.2], [0.035, 0.26], [0.024, 0.3], [0, 0.31]].map(([r, h]) => new THREE.Vector2(r, h)), 16);
    add(place(post, x, 0.12, 0.02), iron, hearth);
    add(place(new THREE.BoxGeometry(0.03, 0.03, 0.46), x, 0.15, -0.2), iron, hearth);
  }
  // Mantel still life: pine cones, a lantern and a folded cloth.
  const coneScales: THREE.BufferGeometry[] = [];
  for (let n = 0; n < 3; n++) {
    const cx = 0.35 + n * 0.17, cz = 0.18 + (n % 2) * 0.05;
    for (let i = 0; i < 46; i++) {
      const t = i / 46, a = i * 2.39996;
      const r = 0.05 * Math.sin(Math.PI * Math.min(1, t * 1.15 + 0.08));
      const scale = new THREE.SphereGeometry(1, 6, 4); scale.deleteAttribute('uv');
      coneScales.push(place(scale, cx + Math.cos(a) * r, 1.72 + 0.02 + t * 0.13 * (n === 1 ? 0.8 : 1), cz + Math.sin(a) * r, 0.5, -a, 0, 0.022, 0.008, 0.016).toNonIndexed());
      scale.dispose();
    }
  }
  add(mergeGeometries(coneScales, false)!, createWoodMaterial('#5a3d26', { key: 'lodge-cone', axis: 'y', rings: 60, roughness: 0.85 }), hearth);
  coneScales.forEach(g => g.dispose());
  const lantern = new THREE.Group(); lantern.position.set(-0.55, 1.705, 0.16); hearth.add(lantern);
  add(new THREE.CylinderGeometry(0.075, 0.08, 0.02, 24), iron, lantern);
  add(place(new THREE.CylinderGeometry(0.06, 0.075, 0.03, 24), 0, 0.26, 0), iron, lantern);
  for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + 0.4; add(place(new THREE.CylinderGeometry(0.006, 0.006, 0.25, 6), Math.cos(a) * 0.068, 0.13, Math.sin(a) * 0.068), iron, lantern); }
  add(place(new THREE.TorusGeometry(0.035, 0.005, 6, 18, Math.PI), 0, 0.285, 0), iron, lantern);
  add(place(new THREE.CylinderGeometry(0.022, 0.022, 0.07, 16), 0, 0.045, 0), new THREE.MeshPhysicalMaterial({ color: '#e9dfc8', roughness: 0.45, sheen: 0.4 }), lantern);
  const lanternFlame = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 10), new THREE.MeshBasicMaterial({ color: new THREE.Color(5.5, 2.6, 0.8) }));
  lanternFlame.scale.set(0.008, 0.02, 0.008); lanternFlame.position.y = 0.1; lanternFlame.castShadow = false; lantern.add(lanternFlame);
  const lanternLight = new THREE.PointLight('#ffb064', 0.18, 2.5, 2); lanternLight.position.y = 0.12; lantern.add(lanternLight);

  // Split wood in an iron cradle beside the hearth.
  const woodBin = new THREE.Group(); woodBin.position.set(2.15, 0, -0.75); woodBin.rotation.y = -0.22; scene.add(woodBin);
  const billetMaterial = createWoodMaterial('#9a7a55', { key: 'lodge-billet', axis: 'z', localFrame: true, pith: [0, 0], bark: '#3b2d22', rings: 70, figure: 0.8, pores: 0.3, wear: 0, roughness: 0.9, bump: 1.4 });
  const billets: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 11; i++) {
    const r = 0.06 + random() * 0.025, len = 0.46;
    const shape = new THREE.Shape();
    const wedge = random() < 0.5 ? Math.PI * (0.6 + random() * 0.5) : Math.PI * 2, a0 = random() * 6.28;
    if (wedge < Math.PI * 2) shape.moveTo(0, 0);
    for (let k = 0; k <= 16; k++) { const a = a0 + wedge * k / 16; if (k === 0 && wedge >= Math.PI * 2) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r); else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: len, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 1, curveSegments: 16 });
    g.translate(0, 0, -len / 2); g.deleteAttribute('uv'); g.computeVertexNormals(); withLocalFrame(g);
    const local = g.getAttribute('surfaceLocal');
    for (let k = 0; k < local.count; k++) local.setZ(k, local.getZ(k) + i * 5.3);
    billets.push(place(g, -0.2 + (i % 4) * 0.13 + (Math.floor(i / 4) % 2) * 0.06, 0.1 + Math.floor(i / 4) * 0.12, 0, 0, 0, random()));
  }
  add(mergeGeometries(billets, false)!, billetMaterial, woodBin);
  billets.forEach(g => g.dispose());
  for (const x of [-0.32, 0.32]) for (const z of [-0.25, 0.25]) add(place(new THREE.CylinderGeometry(0.011, 0.011, 0.45, 8), x, 0.22, z, (z > 0 ? -1 : 1) * 0.25), iron, woodBin);

  // --- Floor lamp and side table on the left --------------------------------------
  const lamp = new THREE.Group(); lamp.position.set(-1.82, 0, -0.05); lamp.userData.dynamic = true; scene.add(lamp);
  add(new THREE.LatheGeometry([[0, 0], [0.2, 0], [0.23, 0.015], [0.2, 0.035], [0.05, 0.05], [0.02, 0.07], [0, 0.07]].map(([r, h]) => new THREE.Vector2(r, h)), 40), brass, lamp);
  add(place(new THREE.CylinderGeometry(0.014, 0.017, 1.6, 16), 0, 0.85, 0), brass, lamp);
  const shadeGeometry = new THREE.CylinderGeometry(0.21, 0.37, 0.48, 72, 6, true);
  const sp = shadeGeometry.attributes.position;
  for (let i = 0; i < sp.count; i++) { const a = Math.atan2(sp.getZ(i), sp.getX(i)); const pleat = 1 + Math.cos(a * 36) * 0.012; sp.setX(i, sp.getX(i) * pleat); sp.setZ(i, sp.getZ(i) * pleat); }
  shadeGeometry.computeVertexNormals();
  const shade = new THREE.Mesh(shadeGeometry, linenShade); shade.position.y = 1.79; shade.userData.cozyAction = 'lamp'; shade.castShadow = false; lamp.add(shade);
  for (const [y, r] of [[1.55, 0.37], [2.03, 0.21]] as const) add(place(new THREE.TorusGeometry(r, 0.007, 6, 72), 0, y, 0, Math.PI / 2), brass, lamp);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color(9, 6.5, 3.6) }));
  bulb.position.y = 1.72; bulb.castShadow = false; lamp.add(bulb);
  const switchMesh = add(place(new THREE.BoxGeometry(0.05, 0.08, 0.05), 0.02, 1.3, 0.02), brass, lamp); switchMesh.userData.cozyAction = 'lamp';
  const lampDown = new THREE.SpotLight('#ffc98a', 12, 0, 1.05, 0.85, 2);
  lampDown.position.set(0, 1.68, 0); lampDown.target.position.set(0.25, 0, 0.6);
  lampDown.castShadow = true; lampDown.shadow.mapSize.set(1024, 1024); lampDown.shadow.radius = 5; lampDown.shadow.bias = -0.0008; lampDown.shadow.normalBias = 0.02;
  lampDown.shadow.camera.near = 0.1; lampDown.shadow.camera.far = 6; lampDown.shadow.autoUpdate = false; lampDown.shadow.needsUpdate = true;
  lamp.add(lampDown, lampDown.target);
  const lampGlow = new THREE.PointLight('#ffbf7a', 6, 0, 2); lampGlow.position.set(0, 1.85, 0); lamp.add(lampGlow);
  // The lamp's own rims and stem never shadow its light.
  lamp.traverse(object => { object.castShadow = false; });

  const table = new THREE.Group(); table.position.set(-1.49, 0, 0.68); table.userData.dynamic = true; scene.add(table);
  add(new THREE.LatheGeometry([[0, 0.76], [0.52, 0.76], [0.545, 0.775], [0.55, 0.8], [0.54, 0.83], [0.52, 0.835], [0, 0.835]].map(([r, h]) => new THREE.Vector2(r, h)), 64), turned, table);
  add(new THREE.LatheGeometry([[0.05, 0.04], [0.07, 0.1], [0.045, 0.25], [0.06, 0.45], [0.04, 0.6], [0.055, 0.76]].map(([r, h]) => new THREE.Vector2(r, h)), 24), turned, table);
  for (let i = 0; i < 3; i++) { const a = i * Math.PI * 2 / 3; add(place(new THREE.CylinderGeometry(0.022, 0.03, 0.5, 10), Math.sin(a) * 0.22, 0.07, Math.cos(a) * 0.22, Math.cos(a) * 1.3, 0, -Math.sin(a) * 1.3), turned, table); }
  const cupGroup = new THREE.Group(); cupGroup.position.set(0.1, 0.835, 0.15); table.add(cupGroup);
  const cupProfile = [[0.1, 0], [0.12, 0.006], [0.135, 0.03], [0.145, 0.19], [0.15, 0.222], [0.144, 0.225], [0.135, 0.2], [0.125, 0.035], [0, 0.03]].map(([r, h]) => new THREE.Vector2(r, h));
  const cup = add(new THREE.LatheGeometry(cupProfile, 56), ceramic, cupGroup); cup.userData.cozyAction = 'cup';
  const handle = add(place(new THREE.TorusGeometry(0.07, 0.017, 12, 28, Math.PI * 1.3), -0.19, 0.12, 0, 0, 0, Math.PI * 0.35), ceramic, cupGroup); handle.userData.cozyAction = 'cup';
  const coffeeSurface = add(place(new THREE.CircleGeometry(0.134, 48), 0, 0.19, 0, -Math.PI / 2), coffee, cupGroup); coffeeSurface.userData.cozyAction = 'cup';
  add(place(new THREE.CylinderGeometry(0.2, 0.2, 0.012, 48), 0.1, 0.841, 0.15), createFabricMaterial('#8c7a62', { key: 'lodge-coaster', weave: 'plain', threads: [600, 600], roughness: 0.95 }), table);
  // A clothbound book with a ribbon marker beside the mug.
  const tableBook = new THREE.Group(); tableBook.position.set(-0.2, 0.835, -0.12); tableBook.rotation.y = 0.5; table.add(tableBook);
  add(place(roundedBlock(0.32, 0.045, 0.23, 0.006, 0.05), 0, 0.0225, 0), createFabricMaterial('#2e4a3c', { key: 'lodge-bookcloth', weave: 'plain', threads: [500, 500], heather: 0.5, roughness: 0.75 }), tableBook);
  add(place(new THREE.BoxGeometry(0.305, 0.036, 0.222), 0.004, 0.0225, 0), new THREE.MeshStandardMaterial({ color: '#d8ccb0', roughness: 0.9 }), tableBook);
  add(place(new THREE.PlaneGeometry(0.012, 0.12), 0.06, 0.0, 0.17, -1.2, 0, 0.1), new THREE.MeshStandardMaterial({ color: '#8a2a22', roughness: 0.6, side: THREE.DoubleSide }), tableBook, false);
  // Steam: soft curling ribbons drawn by a shader, very faint.
  const steamMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    uniforms: { uTime: timeUniform, uStrength: { value: 1 } },
    vertexShader: 'uniform float uTime; varying vec2 vUv; void main(){ vUv = uv; vec3 p = position; float h = uv.y; p.x += sin(h * 5.0 + uTime * 0.6) * 0.03 * h + sin(h * 11.0 - uTime * 0.9) * 0.008; p.z += cos(h * 4.0 + uTime * 0.5) * 0.02 * h; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }',
    fragmentShader: `${GLSL_NOISE}
      uniform float uTime; uniform float uStrength; varying vec2 vUv;
      void main(){ float edge = 1.0 - abs(vUv.x - 0.5) * 2.0; float n = bwFbm3(vec3(vUv.x * 3.0, vUv.y * 4.0 - uTime * 0.45, uTime * 0.05));
        float a = smoothstep(0.0, 0.6, edge) * smoothstep(0.0, 0.15, vUv.y) * (1.0 - smoothstep(0.4, 1.0, vUv.y)) * smoothstep(-0.1, 0.4, n) * 0.07 * uStrength;
        gl_FragColor = vec4(vec3(0.9, 0.88, 0.85), a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  for (let n = 0; n < 2; n++) {
    const ribbon = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.5, 1, 24), steamMaterial);
    ribbon.geometry.translate(0, 0.25, 0); ribbon.position.set(0.0 + n * 0.03, 0.2, 0); ribbon.rotation.y = n * 1.3; ribbon.renderOrder = 6; ribbon.castShadow = false;
    cupGroup.add(ribbon);
  }

  // --- Foreground: armchair arms, plaid blanket and a woollen rug ------------------
  const rug = clothSheet(80, 80, (u, v, target) => {
    const x = -2.0 + u * 3.6, z = 2.6 - v * 3.4;
    target.set(x, 0.014 + Math.max(0, noise3(x * 0.8, 1, z * 0.8)) * 0.01, z);
  }, 0.016, [3.6, 3.4]);
  add(rug, rugWool, scene, false).name = 'lodge-rug';
  const chairArms: THREE.Object3D[] = [];
  for (const side of [-1, 1]) {
    const arm = new THREE.Group();
    const body = new THREE.Mesh(cushion(0.3, 0.42, 2.1, 0.3, 48, side * 7), tweed); body.castShadow = body.receiveShadow = true;
    const roll = new THREE.Mesh(cushion(0.36, 0.16, 2.14, 0.45, 40, side * 9), tweed); roll.position.set(side * 0.02, 0.22, 0); roll.castShadow = roll.receiveShadow = true;
    arm.add(body, roll); arm.position.set(side * 1.38, 0.66, 2.4); arm.rotation.x = -0.045; scene.add(arm); chairArms.push(arm);
  }
  // Soft loft plus a few long folds pulled diagonally across the lap and slack creases between them.
  const blanketY = (x: number, d: number) => 0.97 + 0.045 * Math.exp(-Math.pow(x - 0.15 - 0.22 * d, 2) / 0.012) - 0.018 * Math.pow(Math.abs(Math.sin(x * 2.6 - d * 1.4 + 0.5)), 7) + 0.03 * Math.exp(-Math.pow(x + 0.75 - 0.12 * d, 2) / 0.02) * THREE.MathUtils.smoothstep(d, 0.6, 2.0) + 0.035 * Math.sin(x * 5.7 + d * 0.9) + 0.016 * Math.sin(x * 13.8 - d * 2.4) + 0.06 * Math.exp(-Math.pow(x - 0.38, 2) * 3) + 0.05 * Math.exp(-Math.pow(x + 0.45, 2) * 3) * THREE.MathUtils.smoothstep(d, 0.5, 2.4) + noise3(x * 1.6, d * 1.6, 2) * 0.015 + noise3(x * 7, d * 3, 5) * 0.005;
  const blanket = clothSheet(90, 110, (u, v, target) => {
    const x = (u - 0.5) * 2.5, d = v * 3.9;
    const lap = Math.min(d, 3.2);
    const e = Math.max(0, d - 3.2) / 0.7;
    const folds = Math.sin(x * 12 + 0.7) * 0.04 * e;
    target.set(x * (1 + e * 0.05), blanketY(x, lap) - Math.pow(e, 1.2) * 0.75, 3.15 - lap - e * 0.2 + folds);
  }, 0.016, [2.5, 3.9]);
  const blanketMesh = add(blanket, plaid); blanketMesh.name = 'lodge-blanket'; blanketMesh.castShadow = false;
  // A chunky cream knit folded over the near part of the plaid, its folded edge rolled.
  const knitWool = createFabricMaterial('#c9bca4', { key: 'lodge-knit', weave: 'knit', threads: [26, 34], heather: 0.6, threadContrast: 0.35, fuzz: 1, depth: 0.0055, sheen: 0.9, sheenColor: '#fff4e0', roughness: 0.97,
    pattern: 'fbBase *= 0.86 + 0.2 * smoothstep(0.2, 0.0, abs(fract(fbUv.x * 4.2) - 0.5) - 0.18);' }, { side: THREE.DoubleSide });
  const knit = clothSheet(70, 60, (u, v, target) => {
    // Folded in two and dropped across the near-left of the lap; both long edges roll softly.
    const x = -1.28 + u * 1.3 + v * 0.18, d = 0.3 + v * 1.05;
    const roll = (Math.exp(-Math.pow(v / 0.06, 2)) + Math.exp(-Math.pow((1 - v) / 0.06, 2))) * 0.028;
    const slack = Math.sin(u * 9 + v * 2) * 0.008 + noise3(x * 3, d * 3, 8) * 0.008 + 0.018 * Math.sin(v * Math.PI);
    target.set(x, blanketY(x, d) + 0.03 + roll + slack, 3.15 - d);
  }, 0.03, [1.3, 1.05]);
  const knitMesh = add(knit, knitWool); knitMesh.name = 'lodge-knit'; knitMesh.castShadow = false;
  // Fringe along the falling edge.
  const fringe: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 60; i++) {
    const x = -1.22 + i * 0.041;
    const g = new THREE.CylinderGeometry(0.005, 0.0035, 0.1, 4); g.deleteAttribute('uv');
    fringe.push(place(g, x * 1.05, blanketY(x, 3.2) - 0.75 - 0.05, 3.15 - 3.2 - 0.2 + Math.sin(x * 12 + 0.7) * 0.04, (random() - 0.5) * 0.3, 0, (random() - 0.5) * 0.3).toNonIndexed());
    g.dispose();
  }
  add(mergeGeometries(fringe, false)!, plaid, scene, false);
  fringe.forEach(g => g.dispose());

  // --- Light -------------------------------------------------------------------
  // Cold blue-hour sky light enters only through the glazing: a broad, very soft spot
  // from outside the glass, shadowed by the frame and mullions.
  const windowLight = new THREE.SpotLight(new THREE.Color(0.62, 0.72, 0.95), 60, 0, 0.95, 1, 2);
  windowLight.position.set(WINDOW.cx, 4.6, -10.8); windowLight.target.position.set(WINDOW.cx + 0.3, 0.4, 1.8);
  windowLight.castShadow = true; windowLight.shadow.mapSize.set(1024, 1024); windowLight.shadow.radius = 9; windowLight.shadow.bias = -0.0006; windowLight.shadow.normalBias = 0.03;
  windowLight.shadow.camera.near = 4.5; windowLight.shadow.camera.far = 20; windowLight.shadow.autoUpdate = false; windowLight.shadow.needsUpdate = true;
  scene.add(windowLight, windowLight.target);
  scene.add(new THREE.HemisphereLight('#4a5a78', '#1c140e', 0.06));

  batchStatic(scene);
  // Exterior meshes and moving parts stay out of shadow casting and batching.
  for (const object of [ground, ledge, sky, flakes, pane, frost]) { object.castShadow = false; }

  let probe: THREE.WebGLRenderTarget | null = null;
  const applyLamp = () => {
    lampDown.intensity = lampOn ? 12 : 1.5; lampGlow.intensity = lampOn ? 6 : 0.8;
    linenShade.emissiveIntensity = lampOn ? 1.1 : 0.15; bulb.visible = lampOn;
  };
  function resize(aspect: number) {
    camera.aspect = aspect;
    const portrait = aspect < 0.8;
    table.position.set(portrait ? -0.88 : -1.49, 0, portrait ? -0.95 : 0.68);
    lamp.position.set(portrait ? -1.0 : -1.82, 0, portrait ? -1.8 : -0.05);
    hearth.position.set(portrait ? 1.08 : 3.1, 0, portrait ? -2.15 : -1.94);
    if (aspect < 0.8) { camera.fov = 56; camera.position.set(-0.27, 1.72, 3.3); camera.lookAt(-0.30, 1.47, -3.2); }
    else if (aspect < 1.25) { camera.fov = 53; camera.position.set(-0.13, 1.71, 3.56); camera.lookAt(-0.14, 1.57, -3.5); }
    else { camera.fov = 50; camera.position.set(0.06, 1.73, 3.52); camera.lookAt(-0.08, 1.52, -3.6); }
    camera.updateProjectionMatrix();
    // Moved props need their shadows redrawn once.
    lampDown.shadow.needsUpdate = true; windowLight.shadow.needsUpdate = true; fire.light.shadow.needsUpdate = true;
  }
  resize(1.6);
  return {
    scene, camera, resize,
    post: {
      exposure: 1.5, bloomStrength: 0.085, bloomThreshold: 0, aoStrength: 0.95, aoRadius: 0.45,
      saturation: 1.04, contrast: 1.08, shadowTint: [0.88, 0.95, 1.1], highlightTint: [1.06, 1.0, 0.92], vignette: 0.5, grain: 0.028,
    },
    createVolume() {
      hearth.updateMatrixWorld(true);
      const opening = {
        centre: new THREE.Vector3(0, FP.y1 / 2, FP.front + 0.01).applyMatrix4(hearth.matrixWorld),
        right: new THREE.Vector3(FP.rx, 0, 0).applyQuaternion(hearth.quaternion),
        up: new THREE.Vector3(0, FP.y1 / 2, 0),
      };
      return createRoomVolume({
        haze: 0.03, dust: 0.8, anisotropy: 0.35, maxDistance: 11,
        beam: {
          centre: new THREE.Vector3(WINDOW.cx, (WINDOW.y0 + WINDOW.y1) / 2, WINDOW.z), right: new THREE.Vector3(WINDOW.width / 2, 0, 0), up: new THREE.Vector3(0, (WINDOW.y1 - WINDOW.y0) / 2, 0),
          direction: new THREE.Vector3(0.05, -0.3, 1), color: new THREE.Color(0.05, 0.065, 0.1),
        },
        glow: { position: fire.flameCentre.clone().applyMatrix4(hearth.matrixWorld), color: new THREE.Color(1.0, 0.5, 0.18).multiplyScalar(0.6), opening },
        ambient: new THREE.Color(0.003, 0.004, 0.006),
      });
    },
    prepare(renderer) {
      probe = captureRoomProbe(renderer, scene, new THREE.Vector3(0, 1.6, 0.5), 1.25, { hide: [flakes, frost, pane] });
    },
    update(time: number, dt: number) {
      timeNow = time; timeUniform.value = time; snowfall.update(time);
      cupResponse = Math.max(0, cupResponse - dt * 0.55); logResponse = Math.max(0, logResponse - dt * 0.8);
      fire.update(time, logResponse);
      lanternLight.intensity = 0.18 * (1 + 0.05 * Math.sin(time * 1.7) + 0.03 * Math.sin(time * 2.9));
      cupGroup.rotation.z = Math.sin(cupResponse * Math.PI) * 0.012;
      steamMaterial.uniforms.uStrength.value = 1 + cupResponse * 0.6;
      applyLamp();
    },
    interact(action: string) {
      if (action === 'lamp') { lampOn = !lampOn; applyLamp(); return { type: 'lamp', intensity: lampOn ? 0.24 : 0.16 }; }
      if (action === 'cup') { cupResponse = 1; return { type: 'cup', intensity: 0.12 }; }
      if (action === 'log') { logResponse = 1; fire.update(timeNow + 0.08, logResponse); return { type: 'log', intensity: 0.18 }; }
      return null;
    },
    dispose() { probe?.dispose(); probe = null; },
  };
}
