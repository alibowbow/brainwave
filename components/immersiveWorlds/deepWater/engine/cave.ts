import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { createPool } from './environment';
import type { WorldContent } from './types';
import { createRockMaterial } from '../../shared/render/rockSurface';
import { fbm3, noise3, ridged3, seeded } from '../../shared/render/noise';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { VOLUME_PRELUDE, type VolumeEffect } from '../../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';

/*
 * Original limestone grotto, built entirely in code. Units are metres; the
 * observer sits on a wet ledge at the water. One shaft of daylight falls
 * through a roof opening hung with leaves: it is the key light, the source of
 * the god rays and of the warm bounce that colours the surrounding stone.
 */

const WATER_Y = 0.02;
const APERTURE_THETA = 1.285;
const APERTURE_Z = -18.2;
const SHAFT_FOOT = new THREE.Vector3(-2, 0.03, -12.3);
const SUN = new THREE.Color(1.0, 0.82, 0.58);
const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/** Opening in (theta, z) space; also used to keep displacement away from it. */
const apertureDistance = (theta: number, z: number) => ((z - APERTURE_Z) / 2.9) ** 2 + ((theta - APERTURE_THETA) / 0.13) ** 2;

function baseWall(theta: number, z: number) {
  const taper = 1 - THREE.MathUtils.smoothstep(-z, 35, 59) * 0.86;
  const radius = (13.5 + 2.6 * Math.exp(-(((z + 16) / 13) ** 2)) + Math.sin(z * .13) * 1.5 + Math.sin(z * .41) * .53) * taper;
  const roof = (15.5 + Math.sin(z * .10 + 1) * 1.1) * Math.max(.45, taper);
  const centreX = Math.sin(z * .075) * 1.5;
  return { x: Math.cos(theta) * radius + centreX, y: Math.pow(Math.max(0, Math.sin(theta)), .88) * roof - 3, centreX };
}

/** Continuous cavern surface with eroded, layered relief along the local radial direction. */
function wallPoint(theta: number, z: number) {
  const { x, y, centreX } = baseWall(theta, z);
  let dx = x - centreX, dy = y + 3;
  const length = Math.hypot(dx, dy) || 1; dx /= length; dy /= length;
  const big = fbm3(x * .085, y * .11, z * .085, 3) * 1.5;
  const eroded = ridged3(x * .3 + 5, y * .34, z * .3, 3) * 1.1 - .35;
  const fine = fbm3(x * 1.05, y * 1.05, z * 1.05, 2) * .14;
  // Horizontal solution ledges, as left by former water levels.
  const ledge = Math.pow(Math.abs(Math.sin(y * .85 + fbm3(x * .2, y * .2, z * .2, 2) * 2.2)), 7) * .42;
  const keepOpening = .25 + .75 * smooth(1.2, 3.5, apertureDistance(theta, z));
  const d = (big + eroded + fine + ledge) * keepOpening;
  return new THREE.Vector3(x + dx * d, y + dy * d, z);
}

/** Faceted, eroded boulder normalised to a unit box, so mesh scale gives exact extents. */
function boulderGeometry(seed: number, detail: number) {
  const random = seeded(seed * 7919 + 13);
  const base = new THREE.IcosahedronGeometry(1, detail);
  base.deleteAttribute('normal'); base.deleteAttribute('uv');
  const geometry = mergeVertices(base); base.dispose();
  const planes = Array.from({ length: 7 }, () => {
    const n = new THREE.Vector3(random() * 2 - 1, (random() * 2 - 1) * .7, random() * 2 - 1).normalize();
    return { n, c: .62 + random() * .3 };
  });
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const p = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    p.fromBufferAttribute(position, i).normalize();
    // Fracture planes give limestone its blocky facets; noise erodes them.
    let r = 1;
    for (const { n, c } of planes) { const d = p.dot(n); if (d > 1e-3) r = Math.min(r, c / d); }
    r = THREE.MathUtils.lerp(r, .82, .18);
    r *= 1 + fbm3(p.x * 1.7 + seed, p.y * 1.7, p.z * 1.7, 4) * .13 + (ridged3(p.x * 3.1, p.y * 3.1 + seed, p.z * 3.1, 3) - .35) * .05;
    p.multiplyScalar(r);
    if (p.y < -.32) p.y = THREE.MathUtils.lerp(p.y, -.32, .75);
    position.setXYZ(i, p.x, p.y, p.z);
  }
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const centre = box.getCenter(new THREE.Vector3()), size = box.getSize(new THREE.Vector3());
  geometry.translate(-centre.x, -centre.y, -centre.z);
  geometry.scale(2 / size.x, 2 / size.y, 2 / size.z);
  geometry.computeVertexNormals();
  return geometry;
}

/** A dripstone formation: lumpy accretion rings around a gently wandering axis. */
function dripstone(anchor: THREE.Vector3, height: number, radius: number, seed: number, up: boolean) {
  const rings = Math.max(10, Math.round(14 + height * 5)), sides = 16;
  const positions: number[] = [], indices: number[] = [];
  const random = seeded(seed * 104729 + 7);
  const bendX = (random() - .5) * .12 * height, bendZ = (random() - .5) * .12 * height;
  const sign = up ? 1 : -1;
  for (let j = 0; j <= rings; j++) {
    const t = j / rings - .06; // start inside the rock so the root never floats
    const tc = Math.max(0, t);
    const axisX = bendX * tc * tc, axisZ = bendZ * tc * tc;
    const profile = up ? (Math.pow(1 - tc, .55) * .8 + .2) * (1 + .65 * Math.exp(-tc * 6)) : Math.pow(1 - tc, 1.35) * (1 + .7 * Math.exp(-tc * 7));
    const tip = up ? radius * .25 : .012;
    for (let i = 0; i <= sides; i++) {
      const a = i / sides * Math.PI * 2;
      const cx = Math.cos(a), cz = Math.sin(a);
      const y = sign * t * height;
      const lump = 1 + (up ? .3 : .16) * noise3(cx * 1.3 + seed, y * (up ? .9 : 2.1), cz * 1.3) + .07 * noise3(cx * 4 + seed, y * 7, cz * 4)
        + .08 * Math.sin(tc * 46 + seed) * (1 - tc)
        // Flowstone draperies: vertical flutes that wander with height.
        + (up ? .1 * Math.pow(Math.abs(Math.sin(a * 4 + noise3(seed, y * .6, 3) * 2)), 3) : 0);
      const r = Math.max(tip * (1 - tc) + .004, radius * profile * lump);
      positions.push(anchor.x + axisX + cx * r, anchor.y + y, anchor.z + axisZ + cz * r);
      if (j < rings && i < sides) {
        const n = j * (sides + 1) + i;
        if (up) indices.push(n, n + 1, n + sides + 1, n + 1, n + sides + 2, n + sides + 1);
        else indices.push(n, n + sides + 1, n + 1, n + 1, n + sides + 1, n + sides + 2);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** Light cookie for the roof opening: ragged rim, overhanging leaves and twigs. */
function shaftCookie() {
  const size = 128, data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = (x + .5) / size * 2 - 1, v = (y + .5) / size * 2 - 1;
    const r = Math.hypot(u, v), a = Math.atan2(v, u);
    const edge = .84 + .09 * noise3(Math.cos(a) * 2, Math.sin(a) * 2, 1.3) + .04 * noise3(Math.cos(a) * 5, Math.sin(a) * 5, 7.1);
    const open = 1 - smooth(edge - .16, edge, r);
    const leaves = smooth(.04, .2, fbm3(u * 3.4, v * 3.4, 4.1, 4)) * smooth(.2, .9, r);
    const twig = Math.pow(1 - Math.abs(noise3(u * 2.3, v * 2.3, 9.7)), 22);
    const value = open * (1 - .88 * leaves) * (1 - .75 * twig);
    const index = (y * size + x) * 4;
    data[index] = Math.round(255 * value); data[index + 1] = Math.round(250 * value); data[index + 2] = Math.round(236 * value); data[index + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.LinearFilter; texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

const VOLUME_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
${GLSL_NOISE}
uniform vec3 uApex;
uniform vec3 uFoot;
uniform float uTopRadius;
uniform float uFootRadius;
uniform vec3 uSun;
uniform vec3 uAmbient;
uniform float uShaftDensity;
uniform float uMistDensity;
uniform float uWaterY;
float shaftDensity(vec3 p, vec3 axis, float axisLength, vec3 u1, vec3 u2) {
  vec3 ap = p - uApex;
  float s = dot(ap, axis) / axisLength;
  if (s < -0.05 || s > 1.2) return 0.0;
  vec3 radial = ap - axis * (s * axisLength);
  float r = mix(uTopRadius, uFootRadius, clamp(s, 0.0, 1.0));
  float d = length(radial);
  float inside = 1.0 - smoothstep(r * 0.45, r, d);
  if (inside <= 0.0) return 0.0;
  // Cross-section coordinates are constant along the beam: streaks radiate from the opening.
  vec2 q = vec2(dot(radial, u1), dot(radial, u2)) / r;
  float streak = 0.45 + 0.55 * smoothstep(-0.35, 0.55, bwNoise(vec3(q * 3.1, 1.7 + s * 0.35 + uTime * 0.006)));
  float drift = 0.65 + 0.35 * bwNoise(p * 0.42 + vec3(0.0, uTime * 0.025, uTime * 0.018));
  return inside * streak * drift * smoothstep(-0.05, 0.08, s) * (1.0 - smoothstep(1.0, 1.2, s));
}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float tWater = rd.y < -1e-4 ? (uWaterY - ro.y) / rd.y : 1e4;
  float maxT = min(min(surface, tWater), 70.0);
  vec3 axis = uFoot - uApex;
  float axisLength = length(axis);
  axis /= axisLength;
  vec3 u1 = normalize(cross(axis, vec3(0.0, 0.0, 1.0)));
  vec3 u2 = cross(axis, u1);
  float phase = bwPhase(dot(axis, -rd), 0.58) * 12.5663706;
  float jitter = bwIgn(gl_FragCoord.xy);
  const int STEPS = 36;
  float dt = maxT / float(STEPS);
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  for (int i = 0; i < STEPS; i++) {
    vec3 p = ro + rd * ((float(i) + jitter) * dt);
    float shaft = shaftDensity(p, axis, axisLength, u1, u2) * uShaftDensity;
    float height = max(p.y - uWaterY, 0.0);
    // Broad cave haze plus a thin bank of mist lying on the still water.
    float mist = uMistDensity * (exp(-height * 0.75) + 1.6 * exp(-height * 3.2)) * (0.4 + 0.6 * bwValue(p * 0.3 + vec3(uTime * 0.03, 0.0, uTime * 0.01)));
    float extinction = shaft + mist;
    vec3 radiance = uSun * phase * shaft + uAmbient * mist;
    float stepT = exp(-extinction * dt);
    scatter += transmittance * radiance * (1.0 - stepT) / max(extinction, 1e-4);
    transmittance *= stepT;
  }
  // The still pool mirrors the shaft: march the reflected ray, weighted by Fresnel.
  if (tWater < min(surface, 70.0) + 0.5) {
    vec3 origin = ro + rd * tWater;
    vec3 reflected = reflect(rd, vec3(0.0, 1.0, 0.0));
    float fresnel = 0.02 + 0.98 * pow(1.0 - max(reflected.y, 0.0), 5.0);
    float reflectedPhase = bwPhase(dot(axis, -reflected), 0.58) * 12.5663706;
    const int REFLECTED = 14;
    float rdt = 26.0 / float(REFLECTED);
    vec3 mirrored = vec3(0.0);
    for (int i = 0; i < REFLECTED; i++) {
      vec3 p = origin + reflected * ((float(i) + jitter) * rdt);
      mirrored += uSun * reflectedPhase * shaftDensity(p, axis, axisLength, u1, u2) * uShaftDensity * rdt;
    }
    scatter += transmittance * fresnel * mirrored;
  }
  gl_FragColor = vec4(scatter, transmittance);
}
`;

const SKY_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform vec3 uCentre;
varying vec3 vWorld;
void main() {
  vec2 d = (vWorld.xz - uCentre.xz) / 3.2;
  float canopy = smoothstep(-0.05, 0.25, bwFbm3(vec3(d * 2.2, 4.1))) * smoothstep(0.1, 0.9, length(d));
  float twig = pow(1.0 - abs(bwNoise(vec3(d * 1.9, 9.7))), 26.0);
  vec3 sky = vec3(5.2, 5.6, 6.1);
  // Backlit leaves glow green-gold but stay well below the sky.
  vec3 leaf = vec3(0.9, 1.35, 0.42) * (0.55 + 0.45 * bwNoise(vec3(d * 9.0, 2.0)));
  vec3 color = mix(sky, leaf, clamp(canopy * 0.92 + twig * 0.8, 0.0, 1.0));
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export function createCave(renderer: THREE.WebGLRenderer): WorldContent {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#05080a');
  const camera = new THREE.PerspectiveCamera(53, 1, 0.08, 115);
  camera.position.set(0.75, 2.2, 10.5);
  const target = new THREE.Vector3(-0.2, 4.2, -15);
  camera.lookAt(target);
  const timeUniform = { value: 0 };

  const aperture = wallPoint(APERTURE_THETA, APERTURE_Z);
  const shaftAxis = SHAFT_FOOT.clone().sub(aperture);
  const shaftLength = shaftAxis.length();
  const towardSun = shaftAxis.clone().normalize().negate();

  // --- Light: daylight through the roof is the only strong source. -------------
  scene.add(new THREE.HemisphereLight('#4f86a0', '#1c1a18', 0.17));
  const spot = new THREE.SpotLight(SUN, 11, 0, Math.atan(3.3 / shaftLength), .55, 0);
  spot.map = shaftCookie();
  spot.castShadow = true; spot.shadow.mapSize.set(2048, 2048);
  spot.shadow.camera.near = .5; spot.shadow.camera.far = 46; spot.shadow.bias = -.00012; spot.shadow.normalBias = .03;
  spot.shadow.autoUpdate = false; spot.shadow.needsUpdate = true;
  spot.position.copy(aperture).addScaledVector(towardSun, .6);
  spot.target.position.copy(SHAFT_FOOT);
  scene.add(spot, spot.target);
  // Bounce from the sunlit water and stone: warm, soft, local. Stands in for GI.
  const bounce = new THREE.PointLight('#ffcf94', 120, 26, 2);
  bounce.position.copy(SHAFT_FOOT).add(new THREE.Vector3(.4, 1.3, .3));
  const waterBounce = new THREE.PointLight('#7fd3c4', 70, 22, 2);
  waterBounce.position.copy(SHAFT_FOOT).add(new THREE.Vector3(-1.2, .35, 2.4));
  // Faint cold light from a distant passage gives the far tunnel depth and silhouettes.
  const passage = new THREE.PointLight('#7fa7cf', 320, 42, 2);
  passage.position.set(-1.0, 3.4, -44);
  // Just enough fill for the seated ledge to read in the dark.
  const near = new THREE.PointLight('#8ba3b4', 14, 16, 2);
  near.position.set(1.2, 4.2, 8.6);
  // The glowworm colony washes the roof with the faintest cyan.
  const colonyGlow = new THREE.PointLight('#4fc3d6', 7, 30, 2);
  colonyGlow.position.set(.5, 10.5, -7);
  scene.add(bounce, waterBounce, passage, near, colonyGlow);

  // --- Materials: world-space procedural stone. --------------------------------
  // Sunlit water throws moving caustics onto the stone around the shaft's foot.
  const caustics = { centre: new THREE.Vector3(SHAFT_FOOT.x, WATER_Y, SHAFT_FOOT.z), radius: 5.2, color: new THREE.Color(.75, 1.0, .86).multiplyScalar(.9), time: timeUniform };
  const limestone = createRockMaterial('#8e8c84', { key: 'cave-wall', caustics, scale: 1, bump: 1.25, stain: '#7a5432', stainAmount: .42, cavity: .62, strata: .7, waterY: WATER_Y, wetBand: 1.1, drips: .32, dryRoughness: .82, wetRoughness: .2 }, { side: THREE.DoubleSide });
  const calcite = createRockMaterial('#cfc3a8', { key: 'cave-calcite', caustics, scale: 1.6, bump: .7, stain: '#b48a5a', stainAmount: .25, cavity: .3, strata: .2, waterY: WATER_Y, wetness: .35, drips: .5, dryRoughness: .5, wetRoughness: .14, algaeAmount: 0 });
  const wetStone = createRockMaterial('#8a897d', { key: 'cave-wet-stone', caustics, scale: 1.3, bump: 1.4, stain: '#3e3a30', stainAmount: .3, cavity: .7, strata: .3, waterY: WATER_Y, wetBand: .9, wetness: .25, drips: .2, dryRoughness: .78, wetRoughness: .16, algae: '#33402a', algaeAmount: .45 });
  const mossyStone = createRockMaterial('#7d7c70', { key: 'cave-mossy', caustics, moss: { color: '#6b8a2e', amount: .95 }, scale: 1.3, bump: 1.2, cavity: .6, strata: .3, waterY: WATER_Y, wetBand: .5, wetness: .2, drips: .1, dryRoughness: .8, wetRoughness: .18, algae: '#33402a', algaeAmount: .5 });
  const bedStone = createRockMaterial('#4d544d', { key: 'cave-bed', scale: .9, bump: .8, cavity: .5, strata: .1, wetness: 1, dryRoughness: .5, wetRoughness: .3, algae: '#2c3a2a', algaeAmount: .6, waterY: WATER_Y });

  // --- Cavern shell. -------------------------------------------------------------
  const circum = 220, length = 280;
  const wallPositions: number[] = [], wallIndices: number[] = [];
  for (let j = 0; j <= length; j++) {
    const z = 17 - j / length * 77;
    for (let i = 0; i <= circum; i++) {
      const p = wallPoint(i / circum * Math.PI, z);
      wallPositions.push(p.x, p.y, p.z);
    }
  }
  for (let j = 0; j < length; j++) for (let i = 0; i < circum; i++) {
    const z = 17 - (j + .5) / length * 77, theta = (i + .5) / circum * Math.PI;
    // Actual opening in the roof, not a light pasted on a closed ceiling.
    if (apertureDistance(theta, z) < 1 + .14 * Math.sin(z * 3.7 + theta * 17)) continue;
    const a = j * (circum + 1) + i, b = a + circum + 1;
    wallIndices.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const wallGeometry = new THREE.BufferGeometry();
  wallGeometry.setAttribute('position', new THREE.Float32BufferAttribute(wallPositions, 3));
  wallGeometry.setIndex(wallIndices); wallGeometry.computeVertexNormals();
  const cavern = new THREE.Mesh(wallGeometry, limestone);
  cavern.name = 'cave-continuous-limestone-shell';
  cavern.receiveShadow = true;
  scene.add(cavern);

  // A refined stone lip with a ragged inner contour frames the opening.
  const rimSegments = 96, rimRings = 9, rimPositions: number[] = [], rimIndices: number[] = [];
  for (let ring = 0; ring <= rimRings; ring++) {
    const t = ring / rimRings;
    for (let i = 0; i <= rimSegments; i++) {
      const a = i / rimSegments * Math.PI * 2;
      const irregular = 1 + .1 * Math.sin(a * 3 + .7) + .05 * Math.sin(a * 7 - 1.2) + .04 * noise3(Math.cos(a) * 3, Math.sin(a) * 3, 2.5);
      const theta = APERTURE_THETA + Math.cos(a) * THREE.MathUtils.lerp(.087 * irregular, .22, t);
      const z = APERTURE_Z + Math.sin(a) * THREE.MathUtils.lerp(2.0 * (1 + .075 * Math.sin(a * 5 + .4)), 4.4, t);
      const point = wallPoint(theta, z);
      point.y -= .06 + .22 * (1 - t) + .28 * Math.sin(t * Math.PI) * (1 + .15 * Math.sin(a * 6));
      rimPositions.push(point.x, point.y, point.z);
      if (ring < rimRings && i < rimSegments) { const n = ring * (rimSegments + 1) + i; rimIndices.push(n, n + 1, n + rimSegments + 1, n + 1, n + rimSegments + 2, n + rimSegments + 1); }
    }
  }
  const rimGeometry = new THREE.BufferGeometry();
  rimGeometry.setAttribute('position', new THREE.Float32BufferAttribute(rimPositions, 3));
  rimGeometry.setIndex(rimIndices); rimGeometry.computeVertexNormals();
  const apertureRim = new THREE.Mesh(rimGeometry, limestone);
  apertureRim.name = 'cave-daylight-stone-rim'; apertureRim.receiveShadow = true;
  scene.add(apertureRim);

  // Submerged bed: deep centre, shallow broken shelves, scattered cobbles.
  const bedGeometry = new THREE.PlaneGeometry(34, 82, 96, 180);
  bedGeometry.rotateX(-Math.PI / 2);
  const bp = bedGeometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < bp.count; i++) {
    const x = bp.getX(i), z = bp.getZ(i) - 16;
    const bank = Math.pow(Math.abs(x) / 17, 3) * 3.4;
    const relief = fbm3(x * .25, 0, z * .25, 4) * .55 + Math.max(0, noise3(x * 1.3, 2, z * 1.3)) * .18;
    bp.setXYZ(i, x, -3.45 + bank + relief, z);
  }
  bedGeometry.computeVertexNormals();
  const bed = new THREE.Mesh(bedGeometry, bedStone); bed.receiveShadow = true; scene.add(bed);

  const pool = createPool(renderer, scene, {
    width: 31, depth: 70, y: WATER_Y, color: '#2f6f66', position: [0, WATER_Y, -16], distortion: .5,
    clear: { deepColor: '#01141a', glow: { x: SHAFT_FOOT.x, z: SHAFT_FOOT.z, radius: 3.6, color: new THREE.Color(.3, .9, .78).multiplyScalar(2.6) }, lightDirection: towardSun, glint: 6 },
  });

  // --- Dripstones: clustered stalactites, a few stalagmites and buttresses. ------
  const random = seeded(4242);
  const hanging: THREE.BufferGeometry[] = [], standing: THREE.BufferGeometry[] = [];
  const clusters: Array<[number, number, number, number]> = [
    [.64, -2, 4.3, .8], [.79, -4, 3.8, .65], [.99, -6, 2.9, .48], [2.30, -5, 5.2, .90], [2.14, -9, 4.8, .66], [2.40, -12, 4.0, .69],
    [.72, -17, 5.0, .70], [.85, -20, 3.5, .54], [1.59, -18, 2.9, .43], [1.85, -28, 4.1, .57], [.61, -31, 2.6, .48], [2.22, -32, 4.3, .65],
    [.50, 4, 4.2, .85], [2.55, 3, 3.6, .64], [1.05, -24, 3.2, .5], [1.9, -40, 3.4, .5], [1.2, -44, 2.6, .4],
  ];
  clusters.forEach(([angle, z, height, radius], index) => {
    hanging.push(dripstone(wallPoint(angle, z), height, radius * .62, index + 9, false));
    const satellites = 3 + Math.floor(random() * 5);
    for (let k = 0; k < satellites; k++) {
      const a = angle + (random() - .5) * .22, zz = z + (random() - .5) * 3.4;
      if (apertureDistance(a, zz) < 2.2) continue;
      const scale = .18 + random() * .55;
      hanging.push(dripstone(wallPoint(a, zz), height * scale, radius * .42 * Math.sqrt(scale), index * 31 + k, false));
    }
  });
  // Fine "soda straw" fringes along the roof.
  for (let k = 0; k < 70; k++) {
    const a = .45 + random() * 2.25, z = 12 - random() * 52;
    if (apertureDistance(a, z) < 2.5 || (z > 5 && Math.abs(a - Math.PI / 2) < .35)) continue;
    hanging.push(dripstone(wallPoint(a, z), .25 + random() * .9, .035 + random() * .05, 500 + k, false));
  }
  const buttresses: Array<[number, number, number, number, number]> = [
    [-10.7, -1, -3, 9, 1.8], [-10.2, -1, -13, 7, 1.3], [-8.9, -1, -25, 6, 1.15],
    [11.0, -1, -6, 7, 1.8], [10.2, -1, -19, 8, 1.35], [8.5, -1, -32, 5, 1.1],
  ];
  buttresses.forEach(([x, y, z, h, r], index) => standing.push(dripstone(new THREE.Vector3(x, y, z), h, r, 31 + index, true)));
  [[-7.2, -21, 2.6, .7]].forEach(([x, z, h, r], index) =>
    standing.push(dripstone(new THREE.Vector3(x, -1.3, z), h + 1.3, r, 77 + index, true)));
  const dripMesh = new THREE.Mesh(mergeGeometries(hanging), calcite);
  dripMesh.name = 'cave-dripstones'; dripMesh.castShadow = true; dripMesh.receiveShadow = true;
  const standMesh = new THREE.Mesh(mergeGeometries(standing), calcite);
  standMesh.name = 'cave-stalagmites'; standMesh.castShadow = true; standMesh.receiveShadow = true;
  hanging.concat(standing).forEach(geometry => geometry.dispose());
  scene.add(dripMesh, standMesh);

  // --- Boulders: the seated ledge in the foreground and fallen blocks beyond. ----
  const boulder = (position: [number, number, number], scale: [number, number, number], seed: number, material: THREE.Material, detail: number) => {
    const mesh = new THREE.Mesh(boulderGeometry(seed, detail), material);
    mesh.position.set(...position); mesh.scale.set(...scale);
    mesh.rotation.set(.04 * Math.sin(seed), seed * .71, .05 * Math.cos(seed));
    mesh.castShadow = true; mesh.receiveShadow = true;
    scene.add(mesh);
    return mesh;
  };
  boulder([-4.0, -.37, 7.2], [5.1, .88, 3.5], 42, wetStone, 22);
  boulder([3.8, -.48, 10.2], [5.0, 1.0, 3.6], 27, limestone, 22);
  boulder([-7.3, -.15, 2.3], [2.1, .95, 2.6], 83, wetStone, 14);
  boulder([8.3, -.4, -1.5], [2.0, 1.0, 3.1], 57, wetStone, 14);
  boulder([-5.7, -.67, -9], [2.2, 1.4, 3.2], 12, wetStone, 12);
  boulder([6.6, -1.64, -17], [2.5, 1.4, 2.9], 91, wetStone, 12);
  boulder([8.6, -.59, -31.4], [3.8, .79, 3.9], 124, wetStone, 10);
  boulder([-1.15, -.12, 5.8], [1.85, .56, 2.35], 163, wetStone, 14);
  boulder([-1.6, -.22, 4.3], [1.5, .44, 1.4], 187, wetStone, 12);
  // A low island catches the foot of the shaft: the brightest, warmest stone in view.
  boulder([-3.6, -.5, -13.2], [1.8, .64, 1.5], 211, mossyStone, 16);
  for (let i = 0; i < 23; i++) {
    const s = Math.sin(i * 19.79) * .5 + .5;
    const side = i % 2 === 0 ? -1 : 1;
    boulder([side * (7.2 + s * 2.2), -.69 + s * .18, 8 - i * 1.45], [.28 + s * .6, .17 + s * .25, .42 + s * .76], 100 + i, wetStone, 6);
  }

  // --- Roots of the trees above hang through the opening into the light. --------
  const rootRandom = seeded(313);
  const rootGeometries: THREE.BufferGeometry[] = [];
  for (let k = 0; k < 34; k++) {
    const a = rootRandom() * Math.PI * 2, ring = rootRandom() * .7;
    const start = wallPoint(APERTURE_THETA + Math.cos(a) * THREE.MathUtils.lerp(.08, .15, ring), APERTURE_Z + Math.sin(a) * THREE.MathUtils.lerp(1.8, 3.2, ring));
    start.y -= .15;
    const drop = 1.2 + rootRandom() ** 1.8 * 10.5;
    const points = Array.from({ length: 9 }, (_, i) => {
      const t = i / 8;
      return new THREE.Vector3(start.x + Math.sin(t * 2.7 + k) * .22 * t + (rootRandom() - .5) * .06, start.y - drop * t, start.z + Math.cos(t * 2.1 + k * 1.7) * .22 * t + (rootRandom() - .5) * .06);
    });
    const curve = new THREE.CatmullRomCurve3(points);
    const tubular = 48, radial = 7;
    const tube = new THREE.TubeGeometry(curve, tubular, .018 + rootRandom() * .045, radial, false);
    // Taper each root toward its tip.
    const rootPosition = tube.attributes.position as THREE.BufferAttribute;
    const centre = new THREE.Vector3(), vertex = new THREE.Vector3();
    for (let i = 0; i <= tubular; i++) {
      curve.getPointAt(i / tubular, centre);
      const taper = 1 - .75 * i / tubular;
      for (let j = 0; j <= radial; j++) {
        const index = i * (radial + 1) + j;
        vertex.fromBufferAttribute(rootPosition, index).sub(centre).multiplyScalar(taper).add(centre);
        rootPosition.setXYZ(index, vertex.x, vertex.y, vertex.z);
      }
    }
    tube.deleteAttribute('uv'); tube.computeVertexNormals();
    rootGeometries.push(tube);
  }
  const roots = new THREE.Mesh(mergeGeometries(rootGeometries), new THREE.MeshStandardMaterial({ color: '#3b2d21', roughness: .72 }));
  rootGeometries.forEach(geometry => geometry.dispose());
  roots.name = 'cave-hanging-roots'; roots.castShadow = true; roots.receiveShadow = true;
  scene.add(roots);

  // --- Glowworm colony: blue-green lures and beaded silk threads on the roof. -----
  // Each breathes slowly on its own phase; the still pool mirrors them like stars.
  const wormRandom = seeded(9001);
  const wormPositions: number[] = [], wormGlow: number[] = [], wormPhase: number[] = [];
  for (let attempt = 0; attempt < 160000 && wormGlow.length < 27000; attempt++) {
    const theta = .22 + wormRandom() * (Math.PI - .44), z = 15 - wormRandom() * 64;
    if (apertureDistance(theta, z) < 5) continue;
    // Cheap rejection on the undisplaced wall before the full surface evaluation.
    const rough = baseWall(theta, z);
    if (rough.y < 3.6) continue;
    const colony = smooth(-.1, .35, fbm3(rough.x * .16 + 3, rough.y * .16, z * .16, 3));
    if (wormRandom() > colony) continue;
    const p = wallPoint(theta, z);
    const inward = new THREE.Vector3(rough.centreX - p.x, -3 - p.y, 0).normalize();
    p.addScaledVector(inward, .05);
    const phase = wormRandom(), bright = .55 + wormRandom() * .45;
    wormPositions.push(p.x, p.y, p.z); wormGlow.push(bright); wormPhase.push(phase);
    const thread = .06 + wormRandom() ** 2 * .4;
    for (let k = 1; k <= 2; k++) {
      wormPositions.push(p.x, p.y - thread * k / 2, p.z);
      wormGlow.push(bright * (.3 - k * .08)); wormPhase.push(phase);
    }
  }
  const wormGeometry = new THREE.BufferGeometry();
  wormGeometry.setAttribute('position', new THREE.Float32BufferAttribute(wormPositions, 3));
  wormGeometry.setAttribute('glow', new THREE.Float32BufferAttribute(wormGlow, 1));
  wormGeometry.setAttribute('phase', new THREE.Float32BufferAttribute(wormPhase, 1));
  const glowworms = new THREE.Points(wormGeometry, new THREE.ShaderMaterial({
    uniforms: { uPixelRatio: { value: Math.min(renderer.getPixelRatio(), 2) }, uTime: timeUniform },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `uniform float uPixelRatio;uniform float uTime;attribute float glow;attribute float phase;varying float vGlow;
      void main(){vec4 mv=modelViewMatrix*vec4(position,1.);
        vGlow=glow*(.72+.28*sin(uTime*(.12+phase*.2)+phase*40.));
        gl_PointSize=clamp(46./-mv.z,1.3,3.4)*uPixelRatio;gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `varying float vGlow;void main(){float d=length(gl_PointCoord-.5)*2.;float core=1.-smoothstep(0.,1.,d);
      // Kept below white so the hue survives the tone curve; bloom supplies the halo.
      gl_FragColor=vec4(vec3(.16,.78,1.)*2.4*vGlow*core,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
  }));
  glowworms.name = 'cave-glowworms';
  scene.add(glowworms);

  // --- Daylight beyond the opening: bright sky behind a leafy canopy. -----------
  const skyMaterial = new THREE.ShaderMaterial({
    uniforms: { uCentre: { value: aperture.clone() } }, side: THREE.DoubleSide,
    vertexShader: 'varying vec3 vWorld;void main(){vec4 w=modelMatrix*vec4(position,1.);vWorld=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader: SKY_FRAGMENT,
  });
  const skylight = new THREE.Mesh(new THREE.PlaneGeometry(120, 160), skyMaterial);
  skylight.rotation.x = -Math.PI / 2;
  skylight.name = 'cave-daylight-sky';
  skylight.position.set(aperture.x, 25, aperture.z);
  scene.add(skylight);
  const openingMarker = new THREE.Object3D(); openingMarker.name = 'cave-daylight-aperture';
  openingMarker.position.copy(aperture); scene.add(openingMarker);

  // Fallback beam for renderers without the HDR volume pass.
  const beamGeometry = new THREE.BufferGeometry();
  const across = new THREE.Vector3(1, 0, .32).normalize();
  const corners = [aperture.clone().addScaledVector(across, -.9), aperture.clone().addScaledVector(across, .9), SHAFT_FOOT.clone().addScaledVector(across, 3.6), SHAFT_FOOT.clone().addScaledVector(across, -3.6)];
  beamGeometry.setAttribute('position', new THREE.Float32BufferAttribute(corners.flatMap(p => p.toArray()), 3));
  beamGeometry.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 1], 2));
  beamGeometry.setIndex([0, 1, 2, 0, 2, 3]);
  const beam = new THREE.Mesh(beamGeometry, new THREE.ShaderMaterial({
    uniforms: { uTime: timeUniform }, transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: 'varying vec2 vUv;uniform float uTime;void main(){float edge=pow(max(0.,sin(vUv.x*3.14159265)),2.7);float lines=.78+.1*sin(vUv.x*46.+sin(vUv.y*2.+uTime*.07))+.07*sin(vUv.x*89.);float fade=smoothstep(0.,.055,vUv.y)*(1.-smoothstep(.65,1.,vUv.y));gl_FragColor=vec4(vec3(.91,.91,.68),edge*lines*fade*.19);}',
  }));
  beam.name = 'cave-fallback-beam';
  scene.add(beam);

  // Suspended moisture glints only inside the lit volume; motion is in the shader.
  const dustCount = 700, dustPositions = new Float32Array(dustCount * 3), dustSeeds = new Float32Array(dustCount);
  const dustRandom = seeded(77);
  const side = new THREE.Vector3().crossVectors(shaftAxis, new THREE.Vector3(0, 0, 1)).normalize();
  const side2 = new THREE.Vector3().crossVectors(shaftAxis, side).normalize();
  for (let i = 0; i < dustCount; i++) {
    const t = .08 + dustRandom() * .92;
    const radius = THREE.MathUtils.lerp(1.2, 3.3, t) * Math.sqrt(dustRandom());
    const a = dustRandom() * Math.PI * 2;
    const p = aperture.clone().addScaledVector(shaftAxis, t).addScaledVector(side, Math.cos(a) * radius).addScaledVector(side2, Math.sin(a) * radius);
    dustPositions.set(p.toArray(), i * 3); dustSeeds[i] = dustRandom();
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  dustGeometry.setAttribute('seed', new THREE.BufferAttribute(dustSeeds, 1));
  const dustMaterial = new THREE.ShaderMaterial({
    uniforms: { uPixelRatio: { value: Math.min(renderer.getPixelRatio(), 2) }, uTime: timeUniform, uApex: { value: aperture.clone() }, uAxis: { value: shaftAxis.clone() } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `uniform float uPixelRatio;uniform float uTime;uniform vec3 uApex;uniform vec3 uAxis;attribute float seed;varying float vLight;
      void main(){
        vec3 p=position+vec3(sin(uTime*.07+seed*40.)*.22,sin(uTime*.045+seed*17.)*.3,cos(uTime*.06+seed*23.)*.22);
        float len=length(uAxis);vec3 ap=p-uApex;float s=clamp(dot(ap,uAxis)/(len*len),0.,1.);
        float d=length(ap-uAxis*s);float r=mix(1.2,3.3,s);
        vLight=(1.-smoothstep(r*.5,r,d))*(.35+.65*fract(seed*7.13))*(.6+.4*sin(uTime*.4+seed*60.));
        vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=clamp(26./-mv.z,1.,3.)*uPixelRatio;gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `varying float vLight;void main(){float d=length(gl_PointCoord-.5)*2.;gl_FragColor=vec4(vec3(1.6,1.45,1.15)*vLight*(1.-smoothstep(.1,1.,d)),1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
  });
  scene.add(new THREE.Points(dustGeometry, dustMaterial));

  const dropMaterial = new THREE.MeshPhysicalMaterial({ color: '#cfe8e0', roughness: .05, metalness: 0, transparent: true, opacity: .7, emissive: '#3a4a44' });
  const drops: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const drop = new THREE.Mesh(new THREE.SphereGeometry(.017, 6, 8), dropMaterial);
    drop.scale.set(.8, 2.5, .8); drop.position.set(-3.3 + i * 1.42, 8, -10.5 - i * .68); scene.add(drop); drops.push(drop);
  }

  const solidOccluders = scene.children.filter(object => object instanceof THREE.Mesh && object !== pool.mesh && !(object.material instanceof THREE.ShaderMaterial) && !(Array.isArray(object.material) ? object.material.some(m => m.transparent) : object.material.transparent));
  let lastDropCycle = -1;
  let environment: THREE.WebGLRenderTarget | null = null;
  return {
    scene, camera, target,
    post: {
      exposure: 1.25, bloomStrength: .1, bloomThreshold: 0, aoStrength: 1, aoRadius: .9,
      saturation: 1.06, contrast: 1.14, shadowTint: [.86, .98, 1.12], highlightTint: [1.1, 1.0, .84], vignette: .55, grain: .03,
    },
    prepare(live) {
      // A tiny radiance probe: dark rock, the bright opening and teal water glow.
      // Wet stone reflects it, so highlights line up with the real daylight.
      const probe = new THREE.Scene();
      const shell = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 16), new THREE.MeshBasicMaterial({ color: new THREE.Color(.018, .024, .026), side: THREE.BackSide }));
      const opening = new THREE.Mesh(new THREE.CircleGeometry(2.6, 32), new THREE.MeshBasicMaterial({ color: new THREE.Color(14, 13, 11), side: THREE.DoubleSide }));
      opening.position.copy(aperture).sub(camera.position).normalize().multiplyScalar(20); opening.lookAt(0, 0, 0);
      const pond = new THREE.Mesh(new THREE.CircleGeometry(6, 32), new THREE.MeshBasicMaterial({ color: new THREE.Color(.08, .2, .17), side: THREE.DoubleSide }));
      pond.position.copy(SHAFT_FOOT).sub(camera.position).normalize().multiplyScalar(18); pond.lookAt(0, 0, 0);
      probe.add(shell, opening, pond);
      const pmrem = new THREE.PMREMGenerator(live);
      environment = pmrem.fromScene(probe, .02);
      pmrem.dispose();
      probe.traverse(object => { if (object instanceof THREE.Mesh) { object.geometry.dispose(); (object.material as THREE.Material).dispose(); } });
      scene.environment = environment.texture;
      scene.environmentIntensity = 1.2;
    },
    createVolume(): VolumeEffect {
      const material = new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX, fragmentShader: VOLUME_FRAGMENT, depthTest: false, depthWrite: false, toneMapped: false,
        uniforms: {
          uApex: { value: aperture.clone() }, uFoot: { value: SHAFT_FOOT.clone() }, uTopRadius: { value: 1.25 }, uFootRadius: { value: 3.4 },
          uSun: { value: new THREE.Vector3(SUN.r, SUN.g, SUN.b).multiplyScalar(4.2) }, uAmbient: { value: new THREE.Vector3(.05, .11, .14) },
          uShaftDensity: { value: .05 }, uMistDensity: { value: .045 }, uWaterY: { value: WATER_Y },
        },
      });
      return { material };
    },
    setPostActive(active) { beam.visible = !active; },
    update(time, dt) {
      timeUniform.value = time; pool.update(time);
      drops.forEach((drop, i) => { const phase = ((time * .095 + i * .237) % 1); drop.visible = phase > .87; drop.position.y = 7.5 - (Math.max(0, phase - .87) / .13) ** 2 * 7.45; });
      const cycle = Math.floor(time * .095);
      if (cycle !== lastDropCycle && dt > 0) { lastDropCycle = cycle; pool.ripple(-1.9, -11.2, time); }
    },
    interact(ray, time) {
      const hits = ray.intersectObjects([...solidOccluders, pool.mesh], false);
      if (!hits.length || hits[0].object !== pool.mesh) return null;
      const p = hits[0].point;
      pool.ripple(p.x, p.z, time);
      return { world: 'cave', kind: 'pool-ripple', strength: .35, pan: THREE.MathUtils.clamp(p.x / 14, -.75, .75) };
    },
    resize(aspect) {
      camera.fov = aspect < .8 ? 59 : 53;
      camera.position.set(aspect < .8 ? .4 : .75, 2.2, 10.5);
      target.set(aspect < .8 ? .45 : -.2, 4.2, -15);
      camera.updateProjectionMatrix(); camera.lookAt(target);
    },
    dispose() { pool.dispose(); environment?.dispose(); environment = null; spot.map?.dispose(); },
  };
}
