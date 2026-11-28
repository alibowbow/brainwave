import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldBuilder } from './types';
import { rng } from './materials';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { fbm3, noise3 } from '../../shared/render/noise';
import { createRockMaterial } from '../../shared/render/rockSurface';
import { applyWetSurface } from '../../shared/render/wetSurface';
import { createRainLayer, createRainSplashes } from '../../shared/render/rainStreaks';
import { assignProbe, captureProbe, captureSkyProbe, createMist, createSky } from './atmosphere';
import { applyBark, applyFoliage, applyGround, patch } from './surfaces';
import { boulderGeometry, fernFronds, leafletGeometry, limbGeometry, trunkGeometry } from './geometry';
import { createLantern } from './props';
import { buildTree, concatGeometries } from '../../shared/render/treeGeometry';
import { type FoliageWind } from '../../shared/render/foliageShading';
import { broadleafClusterTexture, fernFrondTexture } from '../../shared/render/foliageTextures';
import { shrubGeometry, sprayGeometry, wetLeafMaterial, type SprayCard } from './wetFoliage';

/*
 * Original procedural shelter: lying in a sleeping bag inside a wet tunnel
 * tent, looking out of the door into a misty cedar wood. The canvas itself is
 * the main light inside: overcast daylight soaks through it, the sleeves and
 * seams show as darker bands and beaded water sits and slides on the outside.
 * A small paraffin lantern is the warm key; rain, drips off the door hood,
 * splashes, puddles and mist live outside.
 */

const ARCHES = [0, 0.43, 0.88];
const ROOF_Z0 = -1.72, ROOF_LENGTH = 6.1;
const GROUND_Y = -0.115;
const EYE = new THREE.Vector3(0.05, 0.82, 1.7);
/** The footpath's centre line beyond the door (x as a function of z), CPU and GPU. */
const trailX = (z: number) => 0.35 * Math.sin(-z * 0.3) - (z + 2) * 0.06;
const TRAIL_GLSL = '0.35 * sin(-z * 0.3) - (z + 2.0) * 0.06';
const nearTrail = (x: number, z: number, margin = 0.7) => z < -1.8 && Math.abs(x - trailX(z)) < margin;

function canopyPoint(u: number, v: number) {
  const a = u * Math.PI;
  const z = ROOF_Z0 + v * ROOF_LENGTH;
  // Fabric sags between the pole arches and gathers into the sleeves.
  let span = 1, nearest = 1;
  for (let k = 0; k < ARCHES.length; k++) {
    const next = ARCHES[k + 1] ?? 1;
    if (v >= ARCHES[k] && v <= next) span = (v - ARCHES[k]) / (next - ARCHES[k]);
    nearest = Math.min(nearest, Math.abs(v - ARCHES[k]) * ROOF_LENGTH);
  }
  const sag = 0.07 * Math.pow(Math.sin(Math.PI * Math.min(1, span)), 1.4) * (0.35 + 0.65 * Math.sin(a));
  const gather = (v < 0.05 ? 0.004 : 0.014) * Math.exp(-nearest * 7) * Math.sin(a * 46 + noise3(a * 3, z, 1) * 3);
  const tension = 0.009 * Math.sin(a * 13 + z * 5.3 + noise3(a, z * 0.7, 4) * 2) * Math.sin(Math.PI * Math.min(1, span));
  const r = 2.1 - sag + gather + tension + 0.006 * fbm3(a * 2, z * 1.4, 2, 3);
  return new THREE.Vector3(Math.cos(a) * r, 0.025 + Math.sin(a) * r, z);
}

const FABRIC_GLSL = /* glsl */ `
// q = (metres downhill from the ridge, metres across the slope).
// Beads sitting on the outside of the fly, seen through it against the bright sky:
// each casts a soft shadow wider than itself, and as a lens focuses a small bright
// core just downhill of its centre. Sizes are uneven and they gather in clusters.
void fabricBeads(vec2 q, out float shade, out float core) {
  shade = 0.0; core = 0.0;
  float cluster = smoothstep(-0.45, 0.5, bwNoise(vec3(q * 1.6, 7.0)) + 0.4 * bwNoise(vec3(q * 4.1, 2.0)));
  for (int i = 0; i < 3; i++) {
    float size = i == 0 ? 0.034 : i == 1 ? 0.066 : 0.13;
    float density = i == 0 ? 0.5 : i == 1 ? 0.38 : 0.22;
    vec2 cell = floor(q / size);
    vec3 h = bwHash3(vec3(cell, float(i) * 7.0 + 3.0));
    float present = step(1.0 - density * (0.15 + 1.5 * cluster * cluster), h.z);
    vec2 c = (cell + 0.25 + 0.5 * h.xy) * size;
    float r = size * (0.08 + 0.2 * fract(h.z * 13.7 + h.x * 3.1));
    vec2 d = q - c;
    // Gravity sags each bead downhill into a teardrop.
    d.x -= r * 0.2;
    d.x *= d.x > 0.0 ? 0.72 : 1.15;
    d.y *= 1.0 + 0.25 * (h.y - 0.5);
    float dist = length(d) / r;
    float weight = 0.55 + 0.25 * float(i);
    shade = max(shade, (1.0 - smoothstep(0.15, 2.6, dist)) * present * weight);
    core = max(core, exp(-pow(length(d - vec2(r * 0.3, 0.0)) / r, 2.0) * 9.0) * present * (i == 0 ? 0.3 : 0.8));
  }
}
// A few drops slide slowly down the slope on meandering paths, leaving a dark wet trail.
float fabricRuns(vec2 q, float t, out float trail) {
  float laneW = 0.34;
  float laneId = floor(q.y / laneW);
  vec3 h = bwHash3(vec3(laneId, 17.0, 1.0));
  float onLane = step(0.45, h.y);
  float span = 3.2;
  float head = fract(t * (0.008 + 0.016 * h.z) / span + h.x) * span;
  float path = (laneId + 0.3 + 0.4 * h.x) * laneW + 0.035 * sin(q.x * 7.0 + h.z * 6.0) + 0.025 * bwNoise(vec3(q.x * 2.6, laneId, 4.0));
  float dx = abs(q.y - path);
  float along = q.x - head;
  float drop = (1.0 - smoothstep(0.006, 0.013, length(vec2(dx, along * 0.5)))) * onLane;
  float behind = 1.0 - step(0.0, along);
  // The wet track is wider than the drop and dries out (fades) a little way behind it.
  trail = (1.0 - smoothstep(0.006, 0.02, dx)) * behind * onLane * (0.2 + 0.8 * smoothstep(-0.6, 0.0, along));
  return drop;
}
// Fresh impacts: a brief dark flick and ring where a raindrop lands, somewhere new each time.
float fabricImpacts(vec2 q, float t) {
  vec2 cell = floor(q / 0.12);
  vec3 h = bwHash3(vec3(cell, 29.0));
  float cycle = t * (0.5 + 0.8 * h.z) + h.x * 7.0;
  float age = fract(cycle);
  vec3 g = bwHash3(vec3(cell, floor(cycle) + 40.0));
  vec2 c = (cell + 0.15 + 0.7 * g.xy) * 0.12;
  float d = length(q - c);
  float ring = exp(-pow((d - age * 0.016) / 0.0035, 2.0));
  return ring * (1.0 - smoothstep(0.0, 0.22, age)) * step(0.45, g.z);
}
`;

type FabricKind = 'vault' | 'flap' | 'visor' | 'back';

function fabricMaterial(kind: FabricKind, time: { value: number }, sky: THREE.Color, ground: THREE.Color, transmit: number) {
  const material = new THREE.MeshStandardMaterial({ color: '#c2b996', roughness: 0.86, side: THREE.DoubleSide });
  material.defines = { USE_UV: '', [`FABRIC_${kind.toUpperCase()}`]: '' };
  material.onBeforeCompile = shader => {
    shader.uniforms.uTime = time;
    shader.uniforms.uSkyOutside = { value: sky };
    shader.uniforms.uGroundOutside = { value: ground };
    shader.uniforms.uTransmit = { value: transmit };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTime;\nvarying vec3 vFabricWorld;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
      // The canvas breathes very slightly in the gusts.
      transformed += objectNormal * sin(uTime * 0.37 + position.z * 0.9 + position.x * 0.5) * sin(uTime * 0.23 + position.y * 1.7) * 0.004;`)
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvFabricWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float uTime;
uniform vec3 uSkyOutside, uGroundOutside;
uniform float uTransmit;
varying vec3 vFabricWorld;
float fabricWrinkle;
${GLSL_NOISE}
${FABRIC_GLSL}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 fp = vFabricWorld;
vec3 fabricOut;
vec2 dropQ;        // (metres downhill, metres across the slope)
float sleeve = 0.0, hem = 0.0, ridge = 0.0;
#if defined(FABRIC_VAULT) || defined(FABRIC_VISOR)
  float ang = atan(fp.y - 0.025, fp.x);
  fabricOut = normalize(vec3(fp.x, fp.y - 0.025, 0.0));
  dropQ = vec2(abs(ang - 1.5708) * 2.1, fp.z);
  #ifdef FABRIC_VAULT
  for (int k = 0; k < 3; k++) {
    float z = ${ROOF_Z0.toFixed(3)} + ${ROOF_LENGTH.toFixed(3)} * (k == 0 ? ${ARCHES[0].toFixed(3)} : k == 1 ? ${ARCHES[1].toFixed(3)} : ${ARCHES[2].toFixed(3)});
    float d = abs(fp.z - z);
    sleeve = max(sleeve, 1.0 - smoothstep(0.034, 0.05, d));
    // Twin stitch lines along each sleeve.
    sleeve = max(sleeve, 0.55 * exp(-pow((d - 0.058) / 0.0025, 2.0)));
  }
  // Felled panel seams run the length of the tent: a double layer with two stitch rows.
  for (int k = 0; k < 4; k++) {
    float s = k == 0 ? 0.55 : k == 1 ? 1.02 : k == 2 ? 2.12 : 2.59;
    float d = abs(ang - s) * 2.1;
    sleeve = max(sleeve, 0.5 * (1.0 - smoothstep(0.007, 0.011, d)));
    sleeve = max(sleeve, 0.4 * exp(-pow((d - 0.014) / 0.0016, 2.0)));
  }
  hem = 1.0 - smoothstep(0.09, 0.16, fp.y);
  ridge = 0.6 * (1.0 - smoothstep(0.012, 0.02, abs(ang - 1.5708) * 2.1));
  #endif
#else
  fabricOut = vec3(0.0, 0.0, ${kind === 'back' ? '1.0' : '-1.0'});
  dropQ = vec2(2.3 - fp.y, fp.x);
  hem = 1.0 - smoothstep(0.08, 0.14, fp.y);
#endif
// Weave and ripstop, faded out before they alias.
vec2 threads = vec2(dropQ.x, dropQ.y) * 230.0;
float fw = max(fwidth(threads.x), fwidth(threads.y));
float weave = mix(0.5, 0.5 + 0.5 * sin(threads.x * 6.2832) * sin(threads.y * 6.2832), 1.0 - smoothstep(0.2, 0.55, fw));
vec2 grid = abs(fract(dropQ * 16.0) - 0.5);
float ripstop = (1.0 - smoothstep(0.0, 0.03, min(grid.x, grid.y))) * (1.0 - smoothstep(0.02, 0.06, fwidth(dropQ.x * 16.0)));
float beadShade, core, trail;
fabricBeads(dropQ, beadShade, core);
float runner = fabricRuns(dropQ, uTime, trail);
float beads = max(beadShade, runner);
core = max(core, runner * 0.8);
float impacts = fabricImpacts(dropQ, uTime);
// Soaked patches: the cloth darkens unevenly, most on the lower walls and along seams.
float patches = smoothstep(0.05, 0.6, bwFbm3(vec3(dropQ * vec2(0.9, 0.7), 5.0)) * 0.5 + 0.5 + 0.35 * smoothstep(0.55, 0.0, fabricOut.y) - 0.25);
float soak = clamp(patches * 0.75 + smoothstep(0.55, 0.15, fabricOut.y) * 0.25 + trail * 0.8 + sleeve * 0.3, 0.0, 1.0);
vec3 outside = mix(uGroundOutside, uSkyOutside, pow(smoothstep(-0.7, 1.0, fabricOut.y), 1.8));
// The wet canopy overhead shades the fly in soft, uneven patches.
// Evaluated along the cloth (not projected from above, which smeared into bands on
// the steep walls) and strongest on the roof, where the canopy overhangs.
float dapple = bwFbm3(vec3(dropQ * 1.1, 2.0)) + 0.5 * bwFbm3(vec3(dropQ * 0.3, 8.0));
outside *= mix(1.0, 0.5 + 0.65 * smoothstep(-0.75, 0.75, dapple), smoothstep(0.1, 0.7, fabricOut.y));
float transmit = uTransmit * (0.86 + 0.14 * weave) * (1.0 - 0.06 * ripstop) * (1.0 - 0.82 * sleeve) * (1.0 - 0.45 * hem) * (1.0 - 0.5 * ridge);
transmit *= (1.0 - 0.46 * beads) * (1.0 - 0.32 * soak) * (1.0 - 0.3 * impacts);
transmit += uTransmit * 0.26 * core * (1.0 - sleeve);
diffuseColor.rgb *= (0.9 + 0.1 * weave) * (1.0 - 0.25 * sleeve) * (1.0 - 0.14 * soak);
diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.92, 0.9, 0.84), soak);
// Fine tension wrinkles, stretched along the panel, catch the lantern light.
fabricWrinkle = bwNoise(vec3(dropQ.x * 3.0, dropQ.y * 11.0, 4.0)) * 0.6 + bwNoise(vec3(dropQ.x * 9.0 + dropQ.y * 4.0, dropQ.y * 20.0, 9.0)) * 0.25;
transmit *= 1.0 + 0.12 * fabricWrinkle;
totalEmissiveRadiance += outside * transmit * diffuseColor.rgb;
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  vec3 pos = -vViewPosition;
  vec3 dpdx = dFdx(pos), dpdy = dFdy(pos);
  vec2 dh = vec2(dFdx(fabricWrinkle), dFdy(fabricWrinkle)) * 0.004;
  vec3 r1 = cross(dpdy, normal), r2 = cross(normal, dpdx);
  float det = dot(dpdx, r1);
  normal = normalize(abs(det) * normal - sign(det) * (dh.x * r1 + dh.y * r2));
}`);
  };
  material.customProgramCacheKey = () => `tent-fabric-${kind}-v3`;
  return material;
}

function quiltMaterial() {
  const material = new THREE.MeshStandardMaterial({ color: '#2b5c60', roughness: 0.64 });
  material.defines = { USE_UV: '' };
  material.onBeforeCompile = shader => {
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${GLSL_NOISE}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec2 rq = vUv * vec2(60.0, 150.0);
vec2 rg = abs(fract(rq) - 0.5);
float rip = (1.0 - smoothstep(0.0, 0.06, min(rg.x, rg.y))) * (1.0 - smoothstep(0.03, 0.08, fwidth(rq.x)));
float down = bwNoise(vec3(vUv * vec2(9.0, 30.0), 2.0));
diffuseColor.rgb *= 0.92 + 0.1 * down - 0.08 * rip;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor *= 0.9 + 0.2 * rip + 0.1 * down;`);
  };
  material.customProgramCacheKey = () => 'tent-quilt-v2';
  return material;
}

export const buildTent: WorldBuilder = ({ scene, camera }) => {
  const random = rng(190719);
  const time = { value: 0 };
  scene.background = new THREE.Color('#7f8f8c');
  const disposables: { dispose(): void }[] = [];

  // ---- Sky and light ----------------------------------------------------------
  const glowDirection = new THREE.Vector3(-0.35, 0.55, -0.75).normalize();
  const sky = createSky({
    // Under the cedars the day is dim: the sky the wood sees is a darker overcast than the
    // canvas, which carries its own transmitted daylight (outsideSky below).
    time, zenith: new THREE.Color(1.6, 1.75, 1.82), horizon: new THREE.Color(0.9, 1.0, 1.05),
    cloudDark: new THREE.Color(0.72, 0.8, 0.84), cloudLight: new THREE.Color(1.45, 1.55, 1.6),
    glowDirection, glow: new THREE.Color(0.7, 0.66, 0.58), ground: new THREE.Color(0.1, 0.12, 0.09), coverage: 0.85, scale: 0.8, drift: 0.012,
  });
  scene.add(sky.mesh);
  // Overcast daylight: a broad soft key from the bright part of the sky.
  const key = new THREE.DirectionalLight('#e3ecec', 0.95);
  key.name = 'tent-overcast-key';
  key.position.set(-5, 13, -11); key.target.position.set(0, 0, -6);
  key.castShadow = true; key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -12, right: 12, top: 12, bottom: -10, near: 1, far: 45 });
  key.shadow.bias = -0.0008; key.shadow.normalBias = 0.03; key.shadow.radius = 4;
  // The world is static apart from foliage sway: render the key shadow once, and
  // again only while something that casts it moves (saves a pass every frame).
  key.shadow.autoUpdate = false; key.shadow.needsUpdate = true;
  scene.add(key, key.target);
  // Daylight spilling through the door onto the groundsheet and quilt (stands in for GI).
  const doorSpill = new THREE.PointLight('#d6d3c8', 0.55, 5.5, 2);
  doorSpill.position.set(0, 1.1, -1.2); scene.add(doorSpill);
  // Warm light bounced off the lit canvas and groundsheet fills the far wall, where the
  // sleeping bag shades it from the lantern (otherwise an olive, stain-like band).
  const wallBounce = new THREE.PointLight('#e8c9a0', 0.35, 2.8, 2);
  wallBounce.position.set(1.35, 0.55, 0.9); scene.add(wallBounce);
  const fallbackFill = new THREE.HemisphereLight('#b7d3d3', '#343b2b', 0.9);
  fallbackFill.visible = false; scene.add(fallbackFill);

  // ---- Canvas -------------------------------------------------------------------
  const outsideSky = new THREE.Color(2.15, 2.4, 2.5), outsideGround = new THREE.Color(0.1, 0.105, 0.095);
  const vault = fabricMaterial('vault', time, outsideSky, outsideGround, 0.25);
  const flapFabric = fabricMaterial('flap', time, outsideSky, outsideGround, 0.09);
  const visorFabric = fabricMaterial('visor', time, outsideSky, outsideGround, 0.2);
  const backFabric = fabricMaterial('back', time, outsideSky, outsideGround, 0.1);
  const interior: THREE.Object3D[] = [];
  const mesh = (geometry: THREE.BufferGeometry, mat: THREE.Material, parent: THREE.Object3D = scene) => {
    const object = new THREE.Mesh(geometry, mat); parent.add(object); return object;
  };
  const grid = (cols: number, rows: number, point: (u: number, v: number) => THREE.Vector3) => {
    const positions: number[] = [], uv: number[] = [], indices: number[] = [];
    for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) {
      const p = point(i / cols, j / rows); positions.push(p.x, p.y, p.z); uv.push(i / cols, j / rows);
    }
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const a = j * (cols + 1) + i, b = a + cols + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geometry.setIndex(indices); geometry.computeVertexNormals();
    return geometry;
  };
  const canopy = mesh(grid(128, 96, canopyPoint), vault);
  canopy.name = 'tent-canvas-vault'; canopy.castShadow = true; canopy.receiveShadow = true;
  // Closed rear panel so the inside is a real enclosure (it also shapes the probe).
  const back = mesh(grid(48, 12, (u, v) => {
    const p = canopyPoint(u, 1); return new THREE.Vector3(p.x * (1 - v), 0.025 + (p.y - 0.025) * (1 - v), p.z - 0.04 * Math.sin(Math.PI * v));
  }), backFabric);
  back.castShadow = true;
  // Door hood: the fly reaches past the front arch and sheds water off its lip.
  const LIP_Z = -2.2;
  const visorPoint = (u: number, v: number) => {
    const a = THREE.MathUtils.lerp(0.17, 0.83, u) * Math.PI;
    const p = canopyPoint(a / Math.PI, 0);
    const r = THREE.MathUtils.lerp(2.06, 1.96, v);
    const droop = 0.1 * v * v + 0.015 * Math.sin(a * 21) * v;
    return new THREE.Vector3(Math.cos(a) * r, 0.025 + Math.sin(a) * r - droop, THREE.MathUtils.lerp(p.z, LIP_Z, v));
  };
  const visor = mesh(grid(64, 10, visorPoint), visorFabric);
  visor.castShadow = true;

  const poleMaterial = new THREE.MeshStandardMaterial({ color: '#59625f', metalness: 0.85, roughness: 0.32 });
  const webbing = new THREE.MeshStandardMaterial({ color: '#4a3d2a', roughness: 0.95 });
  const cord = new THREE.MeshStandardMaterial({ color: '#c9ad78', roughness: 0.9 });
  for (const v of ARCHES) {
    const z = ROOF_Z0 + v * ROOF_LENGTH;
    const points = Array.from({ length: 48 }, (_, i) => { const a = (0.012 + i / 47 * 0.976) * Math.PI; return new THREE.Vector3(Math.cos(a) * 2.068, 0.025 + Math.sin(a) * 2.068, z); });
    mesh(limbGeometry(points, 0.012, 0.012, 8, 64), poleMaterial).castShadow = true;
  }
  // Hanging loop and a short gear cord along the ridge.
  const ridgeLine = Array.from({ length: 20 }, (_, i) => { const p = canopyPoint(0.5, 0.06 + i / 19 * 0.8); p.y -= 0.06 + 0.05 * Math.sin(Math.PI * i / 19); return p; });
  mesh(limbGeometry(ridgeLine, 0.004, 0.004, 5, 40), cord);

  // Groundsheet: a coated bathtub floor; the doorstep is wet.
  // Coated groundsheet: welded seams, creases from lying on it, grit tracked in at the door.
  const floorMaterial = applyWetSurface(patch(new THREE.MeshStandardMaterial({ color: '#4b4834', roughness: 0.55 }), {
    key: 'tent-groundsheet', fragmentCommon: 'float sheetHeight;',
    color: `{
  vec3 p = vSurfWorld;
  float crease = bwNoise(vec3(p.x * 2.2, 0.0, p.z * 0.7)) * 0.6 + bwNoise(vec3(p.x * 6.0 + p.z * 2.0, 1.0, p.z * 1.5)) * 0.3;
  float seam = exp(-pow((abs(p.x) - 1.02) / 0.006, 2.0));
  float grime = smoothstep(0.6, -1.4, p.z) * (0.5 + 0.5 * bwFbm3(p * 3.0));
  diffuseColor.rgb *= (0.88 + 0.12 * crease) * (1.0 + 0.25 * seam) * (1.0 - 0.3 * grime);
  sheetHeight = crease * 0.6 + seam * 0.8;
}`,
    roughness: 'roughnessFactor *= 0.9 + 0.2 * sheetHeight;',
    normal: 'normal = shelterBump(normal, sheetHeight, 0.0025 * shelterDetail(0.08));',
  }), {
    key: 'tent-floor', time, wetness: 0.85, darkening: 0.7, wetRoughness: 0.08, puddles: 0.6, puddleSize: 0.35, rippleDensity: 14, ripples: 0.5,
    shelter: { normal: new THREE.Vector3(0, 0, -1), offset: 1.35, softness: 0.18 },
  });
  const floorGeometry = new THREE.PlaneGeometry(4.15, 6.4, 40, 60);
  floorGeometry.rotateX(-Math.PI / 2);
  const fpos = floorGeometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < fpos.count; i++) {
    const x = fpos.getX(i), z = fpos.getZ(i);
    const edge = Math.max(0, Math.abs(x) - 1.82) / 0.26;
    fpos.setY(i, 0.018 + edge * edge * 0.2 + 0.006 * noise3(x * 3, 0, z * 3));
  }
  floorGeometry.computeVertexNormals();
  const floor = mesh(floorGeometry, floorMaterial); floor.position.z = 1.25; floor.receiveShadow = true;
  for (const x of [-1.84, 1.84]) mesh(limbGeometry([new THREE.Vector3(x, 0.07, -1.68), new THREE.Vector3(x, 0.07, 1.2), new THREE.Vector3(x, 0.075, 4.3)], 0.012, 0.012, 6, 20), webbing);
  interior.push(canopy, back, floor);

  // ---- Door panels (interaction) ------------------------------------------------
  const entrance = new THREE.Group(); scene.add(entrance);
  const flaps: THREE.Mesh[] = [];
  const zipperMaterial = new THREE.MeshStandardMaterial({ color: '#24221d', roughness: 0.5, metalness: 0.3 });
  for (const side of [-1, 1]) {
    const geometry = grid(24, 44, (u, v) => {
      const y = 0.035 + v * 2.085;
      const outer = 2.09 * Math.sqrt(Math.max(0, 1 - v * v));
      const inner = 0.96 * Math.pow(1 - v, 0.58) + 0.02;
      const x = side * THREE.MathUtils.lerp(inner, Math.max(inner, outer), u);
      // Soft vertical drapes gathered toward the tie-back, never regular pleats.
      const gather = Math.sin(Math.PI * u) * (0.4 + 0.6 * Math.exp(-Math.pow((v - 0.31) / 0.25, 2)));
      const fold = (0.032 * Math.sin(u * 5.3 * Math.PI + v * 3 + side) + 0.014 * Math.sin(u * 13.7 + v * 7.1) + 0.012 * noise3(u * 4, v * 3, side * 5)) * gather;
      return new THREE.Vector3(x, y, -1.65 + fold + 0.05 * Math.sin(v * 13));
    });
    const flap = mesh(geometry, flapFabric, entrance); flaps.push(flap); flap.castShadow = true;
    const edge = Array.from({ length: 40 }, (_, j) => {
      const v = j / 39;
      return new THREE.Vector3(side * (0.96 * Math.pow(1 - v, 0.58) + 0.02), 0.035 + v * 2.085, -1.6 + 0.05 * Math.sin(v * 13));
    });
    mesh(limbGeometry(edge, 0.011, 0.011, 6, 60), zipperMaterial, flap);
    const tie = mesh(new THREE.TorusGeometry(0.045, 0.009, 8, 24), cord, flap);
    tie.position.set(side * 1.09, 0.65, -1.5); tie.rotation.y = 0.3;
  }
  const openingShape = new THREE.Shape();
  openingShape.moveTo(-1.22, 0.03); openingShape.lineTo(1.22, 0.03);
  openingShape.quadraticCurveTo(0.77, 1.32, 0, 2.1);
  openingShape.quadraticCurveTo(-0.77, 1.32, -1.22, 0.03);
  const openingHit = mesh(new THREE.ShapeGeometry(openingShape), new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false, side: THREE.DoubleSide }));
  openingHit.position.z = -1.57;
  openingHit.name = 'tent-entrance-interaction';

  // ---- Sleeping bag and blanket -------------------------------------------------
  const quiltPoint = (u: number, v: number, seam = false) => {
    const z = -0.78 + v * 4;
    const width = 0.54 + 0.28 * Math.sin(v * Math.PI * 0.69);
    const xx = (u * 2 - 1) * width;
    const puff = Math.pow(Math.max(0, 1 - Math.pow(u * 2 - 1, 2)), 0.65);
    const baffle = seam ? -0.004 : 0.044 * Math.pow(Math.sin(v * Math.PI * 13), 2);
    // Down shifts inside each baffle; the shell creases where it is compressed.
    const crease = 0.014 * Math.sin(u * 31 + v * 17) * (1 - puff) + 0.012 * noise3(u * 7, v * 26, 3) * puff + 0.006 * Math.abs(noise3(u * 22, v * 60, 9)) * puff;
    return new THREE.Vector3(xx - 0.03, 0.04 + puff * (0.245 + 0.08 * v + baffle) + crease, z);
  };
  const quiltGeometry = grid(64, 160, (u, v) => quiltPoint(u, v));
  const quiltUv = quiltGeometry.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < quiltUv.count; i++) quiltUv.setXY(i, quiltUv.getX(i) * 2, quiltUv.getY(i) * 5);
  const quilt = mesh(quiltGeometry, quiltMaterial()); quilt.castShadow = true; quilt.receiveShadow = true;
  const thread = new THREE.MeshStandardMaterial({ color: '#7d918b', roughness: 0.9 });
  const threads: THREE.BufferGeometry[] = [];
  for (let row = 1; row < 13; row++) threads.push(limbGeometry(Array.from({ length: 24 }, (_, i) => quiltPoint(i / 23, row / 13, true).add(new THREE.Vector3(0, 0.003, 0))), 0.0025, 0.0025, 4, 40));
  threads.push(limbGeometry(Array.from({ length: 30 }, (_, i) => quiltPoint(0.975, i / 29).add(new THREE.Vector3(0.007, 0.008, 0))), 0.009, 0.009, 6, 60));
  mesh(mergeGeometries(threads)!, thread).receiveShadow = true;
  threads.forEach(g => g.dispose());
  const woolMaterial = new THREE.MeshStandardMaterial({ color: '#9a8163', roughness: 0.98 });
  woolMaterial.defines = { USE_UV: '' };
  woolMaterial.onBeforeCompile = shader => {
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>\n${GLSL_NOISE}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec2 wq = vUv * vec2(90.0, 70.0);
float twill = sin((wq.x + wq.y) * 3.1416) * 0.5 + 0.5;
float fuzz = bwNoise(vec3(vUv * 40.0, 1.0)) * 0.5 + 0.5;
float check = step(0.5, fract(vUv.x * 3.0)) * step(0.5, fract(vUv.y * 2.4));
diffuseColor.rgb *= mix(0.85 + 0.15 * twill * (1.0 - smoothstep(0.2, 0.6, fwidth(wq.x))), 1.0, 0.3) * (0.85 + 0.3 * fuzz);
diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.55, 0.42, 0.32), check * 0.6);`);
  };
  woolMaterial.customProgramCacheKey = () => 'tent-wool-v1';
  const blanket = mesh(grid(40, 30, (u, v) => {
    const x = (u - 0.5) * 0.85, z = (v - 0.5) * 0.62;
    return new THREE.Vector3(x, 0.025 * Math.sin(x * 35) + 0.02 * Math.cos(z * 14) + 0.03 * Math.exp(-((u - 0.85) ** 2) * 40), z);
  }), woolMaterial);
  blanket.position.set(-0.49, 0.2, 1.63); blanket.rotation.set(0.05, -0.26, 0);
  blanket.castShadow = blanket.receiveShadow = true;
  interior.push(quilt, blanket);

  // ---- Paraffin lantern: the warm key inside ------------------------------------
  const lantern = createLantern({ intensity: 3.6 });
  scene.add(lantern.group, lantern.light);
  lantern.place(-0.88, 0.027, 0.4);
  interior.push(lantern.group);

  // ---- The wood beyond the door --------------------------------------------------
  const outside = new THREE.Group(); scene.add(outside);
  const terrainHeight = (x: number, z: number) => {
    const away = THREE.MathUtils.smoothstep(-z, 1.8, 5);
    return GROUND_Y + away * (0.16 * fbm3(x * 0.18, 0, z * 0.18, 3) + 0.05 * noise3(x * 0.9, 2, z * 0.9)) + 0.012 * noise3(x * 4, 1, z * 4);
  };
  const terrainGeometry = new THREE.PlaneGeometry(56, 52, 150, 150);
  terrainGeometry.rotateX(-Math.PI / 2);
  const tp = terrainGeometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < tp.count; i++) {
    // Denser vertices close to the door, wider strips far away.
    const t = (tp.getZ(i) + 26) / 52;
    const zz = -1.4 - Math.pow(1 - t, 1.6) * 50;
    const xx = tp.getX(i) * (0.3 + 0.7 * Math.min(1, -zz / 16));
    tp.setXYZ(i, xx, terrainHeight(xx, zz), zz);
  }
  terrainGeometry.computeVertexNormals();
  const soil = applyWetSurface(applyGround(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.92 }), {
    key: 'tent-forest', soil: '#3b3326', litter: ['#4a2e17', '#6e4d26'], litterAmount: 0.6, moss: '#405a28', mossAmount: 0.45,
  }), { key: 'tent-forest', time, wetness: 0.85, darkening: 0.62, wetRoughness: 0.46, puddles: 0.32, puddleSize: 1.2, ripples: 0.5, rippleDensity: 5 });
  // A muddy footpath leaves the door and winds off between the trunks, its hollows
  // brimming with rain that mirrors the pale gaps in the canopy.
  soil.onBeforeCompile = ((previous) => (shader: THREE.WebGLProgramParametersWithUniforms, renderer: THREE.WebGLRenderer) => {
    previous(shader, renderer);
    shader.fragmentShader = shader.fragmentShader
      .replace(/void\s+main\s*\(\s*\)\s*\{/, () => `float trailPool = 0.0;\nfloat trailX(float z) { return ${TRAIL_GLSL}; }\nvoid main() {`)
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 tp = vWetWorld;
  float off = abs(tp.x - trailX(tp.z) + 0.08 * bwNoise(vec3(tp.xz * 1.3, 3.0)));
  float trail = (1.0 - smoothstep(0.32, 0.62, off)) * smoothstep(-1.7, -2.2, tp.z);
  vec3 mud = vec3(0.13, 0.1, 0.075) * (0.8 + 0.35 * (bwNoise(vec3(tp.xz * 4.0, 1.0)) * 0.5 + 0.5));
  diffuseColor.rgb = mix(diffuseColor.rgb, mud, trail * 0.9);
  trailPool = trail * smoothstep(0.42, 0.7, bwNoise(vec3(tp.x * 1.6, 2.0, tp.z * 0.7)) * 0.5 + 0.5 + 0.1);
}`)
      .replace('roughnessFactor = mix(roughnessFactor, 0.025, wetPuddle);', 'wetPuddle = max(wetPuddle, trailPool);\ndiffuseColor.rgb *= mix(1.0, 0.6, trailPool);\nroughnessFactor = mix(roughnessFactor, 0.06, wetPuddle);');
  })(soil.onBeforeCompile);
  const terrain = mesh(terrainGeometry, soil, outside); terrain.receiveShadow = true; terrain.name = 'tent-forest-floor';

  // Cedars: buttressed, bending trunks merged into one draw with world-space bark.
  const barkMaterial = applyWetSurface(applyBark(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.82 }), {
    key: 'tent-cedar', plate: '#6e4c36', crevice: '#160f0b', lichen: '#7f8c78', lichenAmount: 0.12, moss: '#3e5a24', mossHeight: 1.3, scale: 7,
  }), { key: 'tent-bark', time, wetness: 0.75, darkening: 0.6, wetRoughness: 0.3, streaks: 0.6 });
  const woody: THREE.BufferGeometry[] = [];
  const dummy = new THREE.Object3D();
  // Cedar foliage hangs in flat feathery sprays: cut-out cards along each living branch.
  const sprays: SprayCard[] = [];
  const forestWind: FoliageWind = { time, mode: 'attribute', sway: 0.12, flutter: 0.012, direction: [0.7, 0.3], speed: 0.5 };
  const treeSpots: [number, number][] = [[-3.1, -5.5], [3.7, -7.2], [-1.7, -10], [1.4, -12], [-0.45, -20], [-5.2, -8.4], [5.8, -11.5], [1.6, -15.6]];
  for (let i = 0; i < 46; i++) {
    let [x, z] = treeSpots[i] ?? [(random() - 0.5) * 40, -6 - random() * 30];
    if (i >= treeSpots.length && Math.abs(x) < 2.2 && z > -9) x += Math.sign(x || 1) * 3;
    const h = 9 + random() * 9, r = 0.16 + random() * 0.24;
    const base = new THREE.Vector3(x, terrainHeight(x, z), z);
    woody.push(trunkGeometry(base, h, r, i + 1, { lean: new THREE.Vector2((random() - 0.5) * 0.5, (random() - 0.5) * 0.5), sides: i < 8 ? 20 : 12 }));
    // Lower dead twigs and higher living branches with drooping sprays.
    const branches = 7;
    for (let b = 0; b < branches; b++) {
      const a = random() * Math.PI * 2, y = 2.6 + b * h * 0.09 + random() * 0.6, length = (b < 2 ? 0.7 : 1.4) + random() * 1.5;
      const start = new THREE.Vector3(x + Math.cos(a) * r * 0.5, base.y + y, z + Math.sin(a) * r * 0.5);
      const end = new THREE.Vector3(x + Math.cos(a) * length, base.y + y + 0.25 - length * 0.18, z + Math.sin(a) * length);
      const mid = start.clone().lerp(end, 0.5).add(new THREE.Vector3(0, 0.18, 0));
      woody.push(limbGeometry([start, mid, end], r * 0.16, 0.012, 5, 6));
      if (b < 2) continue;
      for (let l = 0; l < 7; l++) {
        const f = 0.2 + (l + random()) / 7 * 0.8;
        const p = start.clone().lerp(end, f).add(new THREE.Vector3(0, 0.12 * f, 0));
        const out = new THREE.Vector3(Math.cos(a) * 0.7 + (random() - 0.5) * 0.9, 0.05 + random() * 0.25, Math.sin(a) * 0.7 + (random() - 0.5) * 0.9);
        sprays.push({ base: p, along: out, length: 0.7 + random() * 0.6, width: 0.32 + random() * 0.14, droop: 0.25 + random() * 0.25, shade: 0.55 + 0.45 * f, sway: 0.5 + random() * 0.5, phase: i + b * 0.7 });
      }
    }
  }
  // Fallen, moss-covered log.
  const logPath = [new THREE.Vector3(-4.3, GROUND_Y + 0.14, -4.6), new THREE.Vector3(-2.9, GROUND_Y + 0.2, -5.3), new THREE.Vector3(-1.2, GROUND_Y + 0.16, -6.1), new THREE.Vector3(0.1, GROUND_Y + 0.1, -6.6)];
  woody.push(limbGeometry(logPath, 0.24, 0.19, 14, 24));
  const trees = mesh(mergeGeometries(woody)!, barkMaterial, outside);
  trees.name = 'tent-cedar-trunks'; trees.castShadow = true; trees.receiveShadow = true;
  woody.forEach(g => g.dispose());

  // Ferns and saplings at human scale either side of the muddy door.
  const fernStems: THREE.BufferGeometry[] = [];
  const fernMatrices: THREE.Matrix4[] = [];
  for (let f = 0; f < 34; f++) {
    const x = (random() - 0.5) * 14, z = -2.6 - random() * 13;
    if ((Math.abs(x) < 0.7 && z > -5) || nearTrail(x, z, 1.0)) continue;
    fernFronds(new THREE.Vector3(x, terrainHeight(x, z), z), 0.65 + random() * 0.6, 7 + Math.floor(random() * 4), random, fernStems, fernMatrices);
  }
  const stemMaterial = new THREE.MeshStandardMaterial({ color: '#3f5428', roughness: 0.7 });
  const fernStemMesh = mesh(mergeGeometries(fernStems)!, stemMaterial, outside);
  fernStems.forEach(g => g.dispose());
  fernStemMesh.castShadow = true;
  const leafMaterial = applyWetSurface(applyFoliage(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.42, side: THREE.DoubleSide }), {
    key: 'tent-leaf', translucency: new THREE.Color(0.55, 0.85, 0.3), strength: 0.9,
  }), { key: 'tent-leaf', time, wetness: 0.6, darkening: 0.85, wetRoughness: 0.22 });
  const sprayAtlas = fernFrondTexture({ seed: 23, palette: { base: '#2a4724', light: '#43683a', dark: '#152a16', stem: '#3a3020' } });
  const sprayMaterial = wetLeafMaterial({ key: 'tent-cedar-spray', map: sprayAtlas, wind: forestWind, roughness: 0.5, film: 0.35, translucency: { tint: '#b4d08a', back: 0.2, forward: 0.3 } });
  const canopyLeaves = mesh(sprayGeometry(sprays), sprayMaterial, outside);
  canopyLeaves.castShadow = true; canopyLeaves.receiveShadow = true; canopyLeaves.name = 'tent-cedar-sprays';
  // Understory: vine maples and dogwood saplings reaching for the light, and low salal mounds.
  const understoryAtlas = broadleafClusterTexture({ seed: 61, palette: { base: '#3a6428', light: '#5c8c3a', dark: '#1e3a15', stem: '#3a3122' }, round: 0.5, leafScale: 1.0, density: 1.3 });
  const salalAtlas = broadleafClusterTexture({ seed: 67, palette: { base: '#2c4c22', light: '#44692e', dark: '#162a12', stem: '#2c281c' }, round: 0.7, leafScale: 0.7, density: 1.8 });
  disposables.push(sprayAtlas, understoryAtlas, salalAtlas);
  const understoryMaterial = wetLeafMaterial({ key: 'tent-understory', map: understoryAtlas, wind: forestWind, roughness: 0.55, film: 0.14, translucency: { tint: '#cfe89a', back: 0.3, forward: 0.22 } });
  const salalMaterial = wetLeafMaterial({ key: 'tent-salal', map: salalAtlas, wind: forestWind, roughness: 0.38, film: 0.5 });
  const saplingSpots: [number, number, number][] = [[-2.4, -4.6, 3.2], [2.1, -5.4, 3.8], [-1.2, -8.5, 4.4], [3.4, -9.6, 4.0], [-3.9, -11.5, 5.0], [1.7, -12.8, 4.6], [-5.6, -7.2, 3.6], [5.4, -6.4, 3.4], [-0.9, -16.5, 5.2], [2.6, -18.5, 5.5]];
  const saplings = saplingSpots.map(([x, z, h], i) => buildTree({
    seed: 400 + i * 11, base: new THREE.Vector3(x, terrainHeight(x, z) - 0.05, z), height: h, radius: 0.045 + h * 0.008, form: 'broadleaf',
    lean: [(random() - 0.5) * 0.8, (random() - 0.5) * 0.6], gnarl: 0.6, flare: 0.2, crownStart: 0.25, limbs: 5, levels: 1, children: 3,
    spread: 0.5, curl: 0.05, radial: 6, ringsPerMetre: 1, displace: 0, barkScale: 4, barkStretch: 3, flex: 0.8,
    leaves: { cardsPerTwig: 7, size: 0.75, reach: 0.75, crownNormals: 0.6, shade: [0.35, 1], fill: 0.25, skyward: 0.6 },
  }));
  const saplingBark = mesh(concatGeometries(saplings.map(t => t.bark)), barkMaterial, outside);
  saplingBark.castShadow = true; saplingBark.receiveShadow = true;
  const understory = mesh(concatGeometries(saplings.map(t => t.leaves).filter((g): g is THREE.BufferGeometry => !!g)), understoryMaterial, outside);
  understory.castShadow = true; understory.receiveShadow = true; understory.name = 'tent-understory';
  saplings.forEach(t => { t.bark.dispose(); t.leaves?.dispose(); });
  const salalParts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 26; i++) {
    const x = (random() - 0.5) * 16, z = -2.8 - random() * 14;
    if ((Math.abs(x) < 1.1 && z > -6) || nearTrail(x, z, 1.0)) continue;
    const s = 0.35 + random() * 0.5;
    salalParts.push(shrubGeometry(i + 90, new THREE.Vector3(x, terrainHeight(x, z) + s * 0.3, z), new THREE.Vector3(s * 1.3, s * 0.7, s), Math.round(80 * s + 20), 0.38));
  }
  const salal = mesh(concatGeometries(salalParts), salalMaterial, outside);
  salal.castShadow = true; salal.receiveShadow = true; salal.name = 'tent-salal';
  salalParts.forEach(g => g.dispose());
  const fernLeaves = new THREE.InstancedMesh(leafletGeometry(4, 0.22, 0.05), leafMaterial, fernMatrices.length);
  const fernColor = new THREE.Color();
  fernMatrices.forEach((m, i) => { fernLeaves.setMatrixAt(i, m); fernLeaves.setColorAt(i, fernColor.setHSL(0.21 + random() * 0.06, 0.42 + random() * 0.2, 0.22 + random() * 0.1, THREE.SRGBColorSpace)); });
  fernLeaves.castShadow = true; fernLeaves.receiveShadow = true; outside.add(fernLeaves);

  // Sedge and grass tufts break up the floor between ferns.
  const bladeGeometry = (() => {
    const positions: number[] = [], indices: number[] = [];
    for (let b = 0; b < 9; b++) {
      const dir = b / 9 * Math.PI * 2 + random() * 0.6, lean = 0.25 + random() * 0.4, h = 0.1 + random() * 0.16, w = 0.004 + random() * 0.004;
      const start = positions.length / 3;
      for (let j = 0; j <= 4; j++) {
        const t = j / 4, cx = Math.cos(dir) * lean * t * t * h * 2, cz = Math.sin(dir) * lean * t * t * h * 2, y = h * t;
        const ww = w * (1 - t * 0.9);
        positions.push(cx - Math.sin(dir) * ww, y, cz + Math.cos(dir) * ww, cx + Math.sin(dir) * ww, y, cz - Math.cos(dir) * ww);
        if (j < 4) { const k = start + j * 2; indices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
      }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setIndex(indices); g.computeVertexNormals(); return g;
  })();
  // Sedge tufts crowd the path's edges and thin out across the floor.
  const tufts = new THREE.InstancedMesh(bladeGeometry, leafMaterial, 260);
  for (let i = 0; i < 260; i++) {
    let x = (random() - 0.5) * (2 + i / 260 * 12); const z = -1.95 - Math.pow(random(), 1.3) * 11;
    if (nearTrail(x, z, 0.45)) x += x < trailX(z) ? -0.5 : 0.5;
    dummy.position.set(x, terrainHeight(x, z), z); dummy.rotation.set(0, random() * 6.28, 0); dummy.scale.setScalar(0.7 + random() * 0.9); dummy.updateMatrix();
    tufts.setMatrixAt(i, dummy.matrix); tufts.setColorAt(i, fernColor.setHSL(0.15 + random() * 0.08, 0.25 + random() * 0.15, 0.14 + random() * 0.1, THREE.SRGBColorSpace));
  }
  tufts.receiveShadow = true; outside.add(tufts);

  // Stones: faceted, wet and mossy; one merged draw.
  const stoneMaterial = createRockMaterial('#6b6c62', { key: 'tent-stone', scale: 2.2, bump: 1.1, wetness: 0.75, drips: 0.15, dryRoughness: 0.7, wetRoughness: 0.18, moss: { color: '#4a6a2a', amount: 0.85 }, cavity: 0.6, strata: 0.15, stainAmount: 0.2 });
  const stones: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 34; i++) {
    const x = (random() - 0.5) * 16, z = -2.3 - random() * 16;
    if ((Math.abs(x) < 0.9 && z > -3.2) || nearTrail(x, z)) continue;
    const s = 0.08 + Math.pow(random(), 2) * 0.55;
    const g = boulderGeometry(i * 3 + 7, s > 0.3 ? 5 : 3);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, terrainHeight(x, z) + s * 0.18, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, random() * 6.28, 0)), new THREE.Vector3(s * (1.2 + random()), s * 0.55, s)));
    stones.push(g);
  }
  const stoneMesh = mesh(mergeGeometries(stones)!, stoneMaterial, outside);
  stones.forEach(g => g.dispose());
  stoneMesh.castShadow = true; stoneMesh.receiveShadow = true;

  // Water beads on the exposed front pole.
  const beadMaterial = new THREE.MeshStandardMaterial({ color: '#9fb7b0', metalness: 0, roughness: 0.03, transparent: true, opacity: 0.7 });
  const beads = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 10, 8), beadMaterial, 60);
  for (let i = 0; i < 60; i++) {
    const p = canopyPoint(0.06 + i / 59 * 0.88, 0);
    const r = 0.006 + random() * 0.01;
    dummy.position.set(p.x * 0.985, 0.025 + (p.y - 0.025) * 0.985 - 0.014, p.z); dummy.rotation.set(0, 0, 0); dummy.scale.set(r, r * 1.35, r); dummy.updateMatrix();
    beads.setMatrixAt(i, dummy.matrix);
  }
  scene.add(beads);

  // ---- Rain ----------------------------------------------------------------------
  const rainSky = new THREE.Color(1.15, 1.25, 1.3);
  const rainLayers = [
    // Rain reads against the dark trunks and understory; against bright mist it all but vanishes.
    createRainLayer({ time, count: 1400, min: new THREE.Vector3(-3.2, GROUND_Y - 0.1, -5), max: new THREE.Vector3(3.2, 4.2, -2.3), speed: 7.2, width: 0.0019, shutter: 0.032, radiance: rainSky, opacity: 0.42, boost: 1.1, seed: 1, wind: new THREE.Vector2(0.06, 0.02), nearFade: 0.8, variation: 1, occlusion: 0.9 }),
    createRainLayer({ time, count: 5600, min: new THREE.Vector3(-9, GROUND_Y - 0.1, -14), max: new THREE.Vector3(9, 8, -5), speed: 7.6, width: 0.0016, shutter: 0.03, radiance: rainSky, opacity: 0.5, boost: 1.1, seed: 2, wind: new THREE.Vector2(0.06, 0.02), variation: 1, occlusion: 0.9, gusts: 0.4, gustScale: 6, gustDrift: new THREE.Vector2(0.5, 0.1) }),
    createRainLayer({ time, count: 9000, min: new THREE.Vector3(-24, GROUND_Y - 0.1, -42), max: new THREE.Vector3(24, 16, -14), speed: 8, width: 0.0015, shutter: 0.03, radiance: rainSky, opacity: 0.45, boost: 1, seed: 3, wind: new THREE.Vector2(0.06, 0.02), variation: 1, occlusion: 0.85, gusts: 0.6, gustScale: 9, gustDrift: new THREE.Vector2(0.6, 0.1) }),
  ];
  // Drips off the door hood: they fall from rest and accelerate.
  const drips = createRainLayer({ time, count: 42, gravity: true, dripPause: 2.2, min: new THREE.Vector3(-1.62, GROUND_Y, LIP_Z - 0.03), max: new THREE.Vector3(1.62, 1.88, LIP_Z + 0.02), sag: 0.82, width: 0.003, shutter: 0.02, radiance: new THREE.Color(1.6, 1.7, 1.75), opacity: 0.9, boost: 1.5, seed: 9 });
  rainLayers.forEach(layer => outside.add(layer.mesh));
  scene.add(drips.mesh);
  const splashPoints: number[] = [];
  for (let i = 0; i < 420; i++) {
    const x = (random() - 0.5) * (2.4 + i / 420 * 6), z = -2.35 - Math.pow(random(), 1.5) * 7;
    splashPoints.push(x, terrainHeight(x, z) + 0.01, z);
  }
  for (let i = 0; i < 30; i++) { const x = (random() - 0.5) * 3; splashPoints.push(x, terrainHeight(x, LIP_Z) + 0.01, LIP_Z + (random() - 0.5) * 0.05); }
  const splashes = createRainSplashes({ points: splashPoints, time, size: 0.05, rate: 1.6, jitter: 0.15, radiance: new THREE.Color(1.1, 1.2, 1.25), opacity: 0.5 });
  outside.add(splashes.mesh);
  disposables.push(...rainLayers, drips, splashes);

  // ---- State ----------------------------------------------------------------------
  let opening = 0.68, targetOpening = 0.68;
  const raycaster = new THREE.Raycaster();
  const probes: THREE.WebGLRenderTarget[] = [];
  return {
    post: {
      exposure: 1.1, bloomStrength: 0.07, bloomThreshold: 0, aoStrength: 0.85, aoRadius: 0.26,
      // Neutral shadows: a cool split-tone turned the dim canvas walls green.
      saturation: 1.0, contrast: 1.1, shadowTint: [0.99, 0.97, 0.97], highlightTint: [1.02, 1.0, 0.97], vignette: 0.5, grain: 0.03,
    },
    createVolume: () => createMist({
      skyLight: new THREE.Color(0.31, 0.37, 0.35), glowLight: new THREE.Color(0.07, 0.07, 0.06), glowDirection,
      density: 0.036, heightFalloff: 0.18, groundY: GROUND_Y,
      shelter: { normal: new THREE.Vector3(0, 0, -1), offset: 2.0, softness: 1.6 },
      maxDistance: 80, curtains: 0.7, curtainScale: 8, wind: new THREE.Vector2(0.25, 0.05),
    }),
    prepare(renderer, hdr) {
      if (!hdr) return;
      const skyProbe = captureSkyProbe(renderer, sky.material);
      probes.push(skyProbe);
      scene.environment = skyProbe.texture;
      scene.environmentIntensity = 1;
      const hide = [...rainLayers.map(l => l.mesh), drips.mesh, splashes.mesh];
      // Wet ground and leaves reflect the wood itself, not just open sky.
      const wood = captureProbe(renderer, scene, new THREE.Vector3(0.3, 1.1, -6.5), hide, 128);
      probes.push(wood);
      scene.environment = wood.texture;
      // The teal sleeping bag fills the lower half of the probe and stained the canvas
      // green; the bounce the walls receive is captured from a warm neutral bag instead.
      const bag = quilt.material as THREE.MeshStandardMaterial;
      const bagColor = bag.color.clone();
      bag.color.set('#6a5a48');
      const inside = captureProbe(renderer, scene, EYE, hide, 128);
      bag.color.copy(bagColor);
      probes.push(inside);
      // The canvas already carries its own glow; little extra fill keeps its gradient.
      for (const fabric of [vault, flapFabric, visorFabric, backFabric]) { fabric.envMap = inside.texture; fabric.envMapIntensity = 0.18; }
      for (const object of interior) assignProbe(object, inside.texture, 1);
      assignProbe(beads, inside.texture, 1.2);
    },
    setPostActive(active) {
      fallbackFill.visible = !active && !scene.environment;
      if (!active) { scene.fog = new THREE.FogExp2('#7d918d', 0.045); [...rainLayers, drips].forEach(layer => layer.setBoost(1)); }
    },
    setViewHeight(pixels) { [...rainLayers, drips].forEach(layer => layer.setViewHeight(pixels)); },
    update(t, dt) {
      time.value = t;
      opening = THREE.MathUtils.damp(opening, targetOpening, 2.1, dt);
      const spread = 0.8 + opening * 0.38;
      if (Math.abs(flaps[0].scale.x - spread) > 1e-4) key.shadow.needsUpdate = true;
      flaps[0].scale.x = spread; flaps[1].scale.x = spread;
      flaps[0].position.x = -0.1 * opening; flaps[1].position.x = 0.1 * opening;
      lantern.update(t);
    },
    resize(aspect) {
      const portrait = aspect < 0.82;
      lantern.place(portrait ? -0.62 : -0.88, 0.027, portrait ? -0.52 : 0.4);
      camera.fov = portrait ? 69 : 62;
      camera.position.set(portrait ? 0 : 0.1, portrait ? 0.75 : 0.78, portrait ? 1.77 : 2.05);
      camera.lookAt(portrait ? 0 : 0.02, portrait ? 0.84 : 0.83, -6);
      camera.updateProjectionMatrix();
    },
    interact(x, y, explicit = false, immediate = false) {
      if (!explicit) {
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
        const hit = raycaster.intersectObjects([...flaps, openingHit], false)[0];
        if (!hit) return null;
      }
      targetOpening = targetOpening > 0.5 ? 0.2 : 0.95;
      if (immediate) opening = targetOpening;
      return { action: 'opening', value: targetOpening };
    },
    dispose() {
      disposables.forEach(d => d.dispose());
      probes.forEach(p => p.dispose());
      scene.environment = null;
    },
  };
};
