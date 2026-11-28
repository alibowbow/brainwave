import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { seeded, mesh, beam, fire, lantern, stoneMaterial, woodMaterial, barkMaterial, fabricMaterial } from './scenery';
import type { WorldRecipe, NightInteractionKind } from './worldTypes';
import { createNoiseVolume, fireFlicker } from '../shared/render/fireFlame';
import { GLSL_NOISE } from '../shared/render/glsl';
import { bakeNightEnvironment, createNightSky, GLSL_NIGHT_SKY } from '../shared/render/skyNight';
import { createNightVolume } from './atmosphere';
import { boulderGeometry, createFoliageMaterial, createGroundMaterial, createTerrainMaterial, leafSprayTexture, ridgeGeometry } from './landscape';
import { buildForest, forestMaterial, scatterForest } from './forest';
import { createGrass, scatter } from './coastFlora';
import { applyFabricSurface } from '../shared/render/fabricSurface';
import { createNightClouds } from './nightClouds';

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const shore = (x: number) => -5.6 + Math.sin(x * .29 + .8) * .48 + Math.cos(x * .7) * .18 + Math.min(Math.abs(x) * .11, 1.5);
const direction = (azimuthDegrees: number, elevationDegrees: number) => {
  const a = THREE.MathUtils.degToRad(azimuthDegrees), e = THREE.MathUtils.degToRad(elevationDegrees);
  return new THREE.Vector3(Math.sin(a) * Math.cos(e), Math.sin(e), -Math.cos(a) * Math.cos(e));
};
const SKYLINE_BINS = 512;
const SKYLINE_RANGE = 1.6;
const SKYLINE_MAX = 0.25;

const WATER_VERTEX = /* glsl */ `
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const WATER_FRAGMENT = /* glsl */ `
precision highp float;
${GLSL_NIGHT_SKY}
uniform float uTime;
uniform float uWarmth;
uniform sampler2D uSkyline;
uniform vec3 uHill;
uniform vec3 uHillHaze;
uniform vec3 uFireGlow;
uniform vec3 uFirePos;
uniform vec3 uFarLight;
uniform vec3 uFarColor;
uniform float uMoonGlint;
varying vec3 vWorld;
float lakeShore(float x) { return -5.6 + sin(x * .29 + .8) * .48 + cos(x * .7) * .18 + min(abs(x) * .11, 1.5); }
float rippleHeight(vec2 p, float t) {
  float a = texture(uSkyNoise, vec3(p * 0.23 + vec2(0.019, 0.031) * t, t * 0.011)).g;
  float b = texture(uSkyNoise, vec3(p * vec2(0.61, 0.52) + vec2(-0.026, 0.047) * t, 0.5 + t * 0.019)).b;
  return (a - 0.5) * 0.022 + (b - 0.5) * 0.01;
}
// One small wind-wave train (short fetch, slowed dispersion). The part a pixel
// cannot resolve is handed on as slope variance, so far water stays rough for glints.
void lakeWave(vec2 p, float t, float angle, float wavelength, float steep, float phase, vec2 dpx, vec2 dpy, inout vec2 slope, inout float variance) {
  vec2 dir = vec2(sin(angle), cos(angle));
  float k = 6.2831853 / wavelength;
  float a = dot(p, dir) * k - sqrt(9.81 * k) * 0.55 * t + phase;
  float fp = length(vec2(dot(dpx, dir), dot(dpy, dir)));
  float fade = 1.0 - smoothstep(wavelength * 0.12, wavelength * 0.45, fp);
  slope += dir * cos(a) * steep * fade;
  variance += 0.5 * steep * steep * (1.0 - fade);
}
// Beckmann distribution in slope space, converted to half-vector density.
float lakeGlint(vec2 offset, float variance, float hy) {
  return exp(-dot(offset, offset) / (2.0 * variance)) / (6.2831853 * variance * pow(max(hy, 0.05), 4.0));
}
void main() {
  vec2 p = vWorld.xz;
  float t = uTime;
  vec3 V = normalize(cameraPosition - vWorld);
  vec2 dpx = dFdx(p), dpy = dFdy(p);
  // Calm slicks drift over the lake; inside them the short waves die down.
  float calm = mix(0.35, 1.0, smoothstep(0.34, 0.66, texture(uSkyNoise, vec3(p * 0.008 + vec2(0.0011, 0.0016) * t, 0.31 + t * 0.001)).r));
  vec2 slope = vec2(0.0);
  float variance = 0.0001;
  lakeWave(p, t, 0.12, 3.1, 0.03, 0.0, dpx, dpy, slope, variance);
  lakeWave(p, t, -0.38, 1.9, 0.034, 1.7, dpx, dpy, slope, variance);
  lakeWave(p, t, 0.52, 1.25, 0.038 * calm, 3.1, dpx, dpy, slope, variance);
  lakeWave(p, t, -0.15, 0.83, 0.04 * calm, 4.6, dpx, dpy, slope, variance);
  lakeWave(p, t, 0.85, 0.57, 0.042 * calm, 2.2, dpx, dpy, slope, variance);
  lakeWave(p, t, -0.7, 0.39, 0.042 * calm, 5.3, dpx, dpy, slope, variance);
  // Capillary ripples near the eye; far away they survive only as roughness.
  float footprintFine = sqrt(length(dpx) * length(dpy));
  float e = 0.08;
  float h0 = rippleHeight(p, t);
  vec2 ripple = vec2(rippleHeight(p + vec2(e, 0.0), t) - h0, rippleHeight(p + vec2(0.0, e), t) - h0) / e * calm;
  float resolve = 1.0 / (1.0 + pow(footprintFine / 0.035, 2.0));
  slope += ripple * resolve;
  variance += (dot(ripple, ripple) * 0.5 + 0.0004 * calm) * (1.0 - resolve);

  vec3 n = normalize(vec3(-slope.x, 1.0, -slope.y));
  float nv = max(dot(n, V), 1e-3);
  float fresnel = 0.02 + 0.98 * pow(1.0 - nv, 5.0);
  vec3 r = reflect(-V, n);
  r.y = max(r.y, 0.004);
  float pixelAngle = max(length(fwidth(r)), 1e-4);
  vec3 reflected = bwNightSkyBase(r);
  // The headlands and their forest mirrored from a precomputed skyline (elevation by azimuth).
  float azimuth = atan(r.x, -r.z);
  vec4 skyline = texture(uSkyline, vec2(azimuth / ${(SKYLINE_RANGE * 2).toFixed(3)} + 0.5, 0.5));
  float ridgeElevation = skyline.r * ${SKYLINE_MAX.toFixed(3)};
  float elevation = asin(clamp(r.y, 0.0, 1.0));
  float soften = 0.004 + pixelAngle * 1.5 + sqrt(variance) * 0.3;
  float hill = 1.0 - smoothstep(ridgeElevation - soften, ridgeElevation + soften, elevation);
  vec3 hillColor = mix(uHill, uHillHaze, smoothstep(0.2, 0.9, skyline.g) * 0.8 + 0.2 * smoothstep(0.0, ridgeElevation + 1e-3, elevation));
  reflected = mix(reflected, hillColor, hill);

  // The moon and a cabin light across the lake: the lobes stretch into a wavering
  // glitter path and a warm column; resolved waves break them into moving glints.
  vec3 Hm = normalize(uMoonDir + V);
  vec3 glints = uMoonColor * uMoonGlint * lakeGlint(-Hm.xz / max(Hm.y, 1e-3) - slope, variance + 0.00003, Hm.y) * (1.0 - hill);
  vec3 Hf = normalize(normalize(uFarLight - vWorld) + V);
  glints += uFarColor * lakeGlint(-Hf.xz / max(Hf.y, 1e-3) - slope, variance + 0.00002, Hf.y);
  glints *= fresnel / max(4.0 * nv, 0.05);

  vec3 deep = vec3(.005, .009, .014) + vec3(.004, .006, .01) * clamp(-vWorld.z / 100., 0., 1.);
  vec3 color = mix(deep, reflected, fresnel) + glints;
  // Firelight in the clear shallows: ripple-focused light wavers over the stony bed.
  float shallow = 1.0 - smoothstep(0.0, 4.5, lakeShore(p.x) - p.y);
  vec3 toFire = uFirePos - vWorld;
  float fireFall = 1.0 / (dot(toFire, toFire) * 0.12 + 1.0);
  float c1 = texture(uSkyNoise, vec3(p * vec2(1.1, 1.6) + vec2(0.0, t * 0.045), t * 0.06)).g;
  float c2 = texture(uSkyNoise, vec3(p * vec2(1.9, 2.6) - vec2(t * 0.035, 0.0), 0.4 + t * 0.08)).b;
  float caustic = pow(1.0 - abs(c1 - 0.5) * 2.0, 7.0) * 0.6 + pow(1.0 - abs(c2 - 0.5) * 2.0, 9.0) * 0.5;
  color += uFireGlow * uWarmth * fireFall * (0.25 + 3.2 * caustic) * shallow * shallow * (1.0 - fresnel) * 0.6;
  // A low warm sheen where the firelight grazes the near water.
  color += uFireGlow * uWarmth * fireFall * 0.22 * fresnel * smoothstep(-14.0, -5.5, vWorld.z);
  gl_FragColor = vec4(color, 1.);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/**
 * Tent cotton: the shared plain weave, plus felled seams every canvas width
 * (0.75 m along the tent), a hem at the eave, ridge tape and rain grime low
 * down. A lamp inside shows through the cloth; doubled seams let less through.
 */
function tentCanvas(color: THREE.ColorRepresentation, key: string, glow: { position: { value: THREE.Vector3 }; strength: { value: number } }, seams: boolean) {
  const material = new THREE.MeshStandardMaterial({ color, roughness: .88, metalness: 0, side: THREE.DoubleSide });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTentGlowPos = glow.position;
    shader.uniforms.uTentGlowStrength = glow.strength;
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 uTentGlowPos;\nuniform float uTentGlowStrength;')
      .replace('#include <color_fragment>', `#include <color_fragment>
float tentBand = 0.0;
${seams ? `{
  float seamAa = fwidth(vSurfaceUv.y) * 1.5 + 0.002;
  float seamDistance = abs(fract(vSurfaceUv.y * 1.3333 + 0.5) - 0.5) / 1.3333;
  float seam = 1.0 - smoothstep(0.01, 0.01 + seamAa, seamDistance);
  float hem = smoothstep(1.9 - seamAa, 1.92, vSurfaceUv.x);
  float tape = 1.0 - smoothstep(0.035, 0.035 + seamAa, vSurfaceUv.x);
  tentBand = max(seam, max(hem, tape));
  float grime = smoothstep(1.45, 2.0, vSurfaceUv.x) * (0.55 + 0.45 * bwNoise(vSurfaceWorld * 3.0));
  float weather = bwFbm3(vSurfaceWorld * vec3(0.9, 2.2, 0.9) + 4.0);
  diffuseColor.rgb *= mix(1.0, 0.92, tentBand) * (1.0 - 0.3 * grime) * (0.92 + 0.16 * weather);
  surfaceHeight += tentBand * 0.0015;
}` : ''}`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  vec3 toLight = vSurfaceWorld - uTentGlowPos;
  float through = uTentGlowStrength / (dot(toLight, toLight) + 0.35);
  totalEmissiveRadiance += vec3(1.0, 0.62, 0.32) * diffuseColor.rgb * through * (1.0 - 0.45 * tentBand);
}`);
  };
  return applyFabricSurface(material, { key: `lakeside-tent-${key}`, weave: 'plain', threads: [420, 420], heather: .7, threadContrast: .4, fuzz: .25, depth: .0004 });
}

/** All geometry and shading are original. Distances are metres; the viewpoint is a seated camper. */
export function buildLakesideWorld(): WorldRecipe {
  const scene = new THREE.Scene();
  scene.name = 'Lakeside camp — violet twilight';
  const fallbackFog = new THREE.FogExp2('#3b3a52', .0055);
  scene.fog = fallbackFog;
  const rng = seeded(882719);
  const noise = createNoiseVolume(48, 17);

  // Violet afterglow over the western hills, a young crescent above the open water, the first stars.
  const afterglow = direction(-38, 0);
  const moonDir = direction(4, 12.5);
  const sky = createNightSky({
    noise, zenith: '#182048', horizon: '#64557e', brightness: 0.21,
    glow: { color: '#c48a8e', direction: afterglow, intensity: 0.32, width: 1.8, height: 0.16 },
    airglow: 0,
    moon: { direction: moonDir, intensity: 44, radius: 0.012, halo: 0.6, color: '#fff2dc', sunDirection: direction(-46, -14) },
    stars: { count: 1400, seed: 2048, intensity: 0.55, galacticFraction: 0, twinkle: 0.6 },
  });
  scene.add(sky.group);
  // Thin streaks of cloud catch the last rose light on the side of the afterglow.
  const clouds = createNightClouds({
    noise, glowDirection: afterglow, moonDirection: moonDir, cover: .4,
    lit: new THREE.Color(.15, .068, .072), shade: new THREE.Color(.02, .017, .036), moon: new THREE.Color(.1, .094, .088),
  });
  scene.add(clouds.mesh);

  // Soft twilight from the west is the cool key; fire, lantern and tent glow are the warm keys.
  const twilight = new THREE.DirectionalLight('#b9a8d8', 0.8);
  twilight.position.copy(afterglow).setY(0.55).normalize().multiplyScalar(60);
  twilight.castShadow = true;
  twilight.shadow.mapSize.set(2048, 2048);
  Object.assign(twilight.shadow.camera, { left: -12, right: 12, top: 11, bottom: -11, near: 1, far: 140 });
  twilight.shadow.normalBias = .03; twilight.shadow.bias = -.0001; twilight.shadow.radius = 5;
  twilight.target.position.set(0, 0, -1);
  scene.add(twilight, twilight.target);

  const bark = barkMaterial('#5f5245', 'lakeside-firewood-bark', { furrows: 6, lichen: 0.2 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: '#2e3332', roughness: .45, metalness: .9 });
  const ropeMat = fabricMaterial('#b3ad97', 'lakeside-rope', { weave: 40 });
  const add = (object: THREE.Object3D) => { scene.add(object); return object; };
  const tube = (points: THREE.Vector3[], radius: number, mat: THREE.Material, segments = 24) => {
    const obj = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, 8, false), mat);
    obj.castShadow = true;
    return obj;
  };

  // A scalloped mineral beach, rising into the campsite: the waterline is actual geometry.
  const groundY = (x: number, z: number) => {
    const z0 = shore(x) - .15;
    const v = THREE.MathUtils.clamp((z - z0) / (19 - z0), 0, 1);
    const rise = Math.min(v * 2.9, 1);
    return -.08 + rise * .075 + Math.sin(x * 1.2) * Math.sin(z * 1.5) * .025 * rise;
  };
  const groundGeometry = new THREE.BufferGeometry();
  const groundVertices: number[] = [], groundIndices: number[] = [];
  const gx = 160, gz = 64;
  for (let iz = 0; iz <= gz; iz++) for (let ix = 0; ix <= gx; ix++) {
    const x = -32 + ix / gx * 64;
    const z = THREE.MathUtils.lerp(shore(x) - .15, 19, iz / gz);
    groundVertices.push(x, groundY(x, z), z);
    if (ix < gx && iz < gz) { const a = iz * (gx + 1) + ix; groundIndices.push(a, a + gx + 1, a + 1, a + 1, a + gx + 1, a + gx + 2); }
  }
  groundGeometry.setAttribute('position', new THREE.Float32BufferAttribute(groundVertices, 3));
  groundGeometry.setIndex(groundIndices); groundGeometry.computeVertexNormals();
  const firePosition: [number, number, number] = [-.78, .035, -.87];
  // Campsite floor: shingle by the water, then soil strewn with fallen pine needles and a little grass.
  const ground = new THREE.Mesh(groundGeometry, createGroundMaterial({
    key: 'lakeside-beach', soil: '#6b6156', litter: '#5a4c3c', litterAmount: 0.3, grass: '#4f5236', grassAmount: 0.35, grassBias: -0.25,
    pebble: '#7f7b74', pebbleAmount: 0.22, scale: 1.3, hearth: { centre: new THREE.Vector3(...firePosition), radius: .8 }, wetBelow: -.072, wetBand: .012,
    needles: { color: '#7a5636', amount: 0.75, scale: 13 },
  }));
  ground.receiveShadow = true; add(ground);

  // Lake: same sky as the dome, the headlands and forest mirrored from a skyline, the crescent's glitter path.
  const islandGeometries: THREE.BufferGeometry[] = [];
  const islandSpecs: Array<[number, number, number, number, number, string, string]> = [
    [-45, -140, 175, 30, 20, '#545c68', '#262f30'], [81, -116, 165, 30, 24, '#4c5562', '#222b2c'],
    [-75, -82, 118, 22, 13, '#3f4a50', '#1e2827'], [83, -80, 123, 22, 15, '#3e4a52', '#1d2726'], [-26, -97, 46, 12, 4.5, '#3c4a50', '#1e2826'],
  ];
  islandSpecs.forEach(([cx, z, width, depth, height, rock, forest], index) => {
    const geometry = ridgeGeometry({ x: cx, z, width, depth, base: -.9, peaks: [[-width * .18, height, width * .22], [width * .16, height * .85, width * .2]], seed: 300 + index * 17, relief: .35, crest: .45, taper: .32, segments: [160, 26] });
    islandGeometries.push(geometry);
    const island = new THREE.Mesh(geometry, createTerrainMaterial({ key: `lakeside-island-${index}`, rock, forest, treeLine: 60, bump: .8 }));
    island.receiveShadow = true;
    island.name = `Lake headland ${index}`;
    add(island);
  });

  // A lone cabin on the near headland, one window lit: its light runs across the water toward the camp.
  const cabinSpot = (() => {
    const position = islandGeometries[4].attributes.position as THREE.BufferAttribute, normal = islandGeometries[4].attributes.normal as THREE.BufferAttribute;
    let best = -1, bestScore = -Infinity;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i), y = position.getY(i);
      if (x < -19 || x > -9 || y < .5 || y > 2.2 || normal.getY(i) < .8) continue;
      const score = position.getZ(i) - Math.abs(x + 13) * .3;
      if (score > bestScore) { bestScore = score; best = i; }
    }
    return best < 0 ? V(-13, .8, -92) : V(position.getX(best), position.getY(best), position.getZ(best));
  })();
  const cabin = new THREE.Group(); cabin.position.copy(cabinSpot); cabin.rotation.y = .25; add(cabin);
  const cabinWood = woodMaterial('#3b332c', 'lakeside-cabin', { axis: 'x', ring: 20, weathered: .4 });
  cabin.add(mesh(new THREE.BoxGeometry(2.2, 1.5, 1.8), cabinWood, [0, .6, 0]));
  const cabinRoof = new THREE.Shape(); cabinRoof.moveTo(-1.35, 1.3); cabinRoof.lineTo(0, 2.15); cabinRoof.lineTo(1.35, 1.3); cabinRoof.closePath();
  const roofGeometry = new THREE.ExtrudeGeometry(cabinRoof, { depth: 2.1, bevelEnabled: false }); roofGeometry.translate(0, 0, -1.05);
  cabin.add(mesh(roofGeometry, cabinWood));
  const cabinWindow = mesh(new THREE.PlaneGeometry(.42, .36), new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffb068').multiplyScalar(7) }), [.45, .75, .905]);
  cabinWindow.castShadow = false;
  cabin.add(cabinWindow);
  cabin.updateMatrixWorld(true);
  const farLight = cabinWindow.getWorldPosition(new THREE.Vector3());

  // Mixed conifers on the headlands: groves, clearings and several species, never a comb.
  const shoreTrees = islandGeometries.flatMap((geometry, index) => {
    const position = geometry.attributes.position as THREE.BufferAttribute, normal = geometry.attributes.normal as THREE.BufferAttribute;
    return scatterForest({
      seed: 300 + index * 31, count: [430, 420, 300, 300, 150][index], grove: index === 4 ? 9 : 14, openness: .38,
      height: index === 4 ? [2.4, 6.5] : [3, 9.5], mix: { snag: .03, pine: .12 },
      sample: (r) => {
        const i = Math.floor(r() * position.count);
        if (normal.getY(i) < .62 || position.getY(i) < .25) return null;
        const x = position.getX(i) + (r() - .5) * 1.6, z = position.getZ(i) + (r() - .5) * 1.6;
        return Math.hypot(x - cabinSpot.x, z - cabinSpot.z) < 4 ? null : { x, y: position.getY(i) - .3, z };
      },
    });
  });
  add(buildForest(shoreTrees, forestMaterial({ color: '#1c241f', tips: '#3a3f4a', key: 'lakeside-forest' }), 'Far-shore conifers', 11, .5));

  // Skyline seen from the middle of the near water: elevation and distance per azimuth,
  // from the headlands and the crowns standing on them.
  const skylineData = new Uint8Array(SKYLINE_BINS * 4);
  const elevations = new Float32Array(SKYLINE_BINS), distances = new Float32Array(SKYLINE_BINS).fill(1);
  const reference = V(0, -.03, -12);
  const binOf = (azimuth: number) => (azimuth / (SKYLINE_RANGE * 2) + .5) * (SKYLINE_BINS - 1);
  const raise = (bin: number, elevation: number, distance: number) => {
    if (bin < 0 || bin >= SKYLINE_BINS || elevation <= elevations[bin]) return;
    elevations[bin] = elevation; distances[bin] = Math.min(1, distance / 160);
  };
  for (const geometry of islandGeometries) {
    const position = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < position.count; i++) {
      const dx = position.getX(i) - reference.x, dz = position.getZ(i) - reference.z;
      const distance = Math.hypot(dx, dz);
      raise(Math.round(binOf(Math.atan2(dx, -dz))), Math.atan2(position.getY(i) - reference.y, distance), distance);
    }
  }
  const treeBase = new THREE.Vector3(), treeScale = new THREE.Vector3(), treeTurn = new THREE.Quaternion();
  for (const tree of shoreTrees) {
    tree.matrix.decompose(treeBase, treeTurn, treeScale);
    const dx = treeBase.x - reference.x, dz = treeBase.z - reference.z;
    const distance = Math.hypot(dx, dz), azimuth = Math.atan2(dx, -dz);
    const halfWidth = Math.atan2(treeScale.x * .28, distance);
    const top = Math.atan2(treeBase.y + treeScale.y - reference.y, distance), foot = Math.atan2(treeBase.y + treeScale.y * .25 - reference.y, distance);
    for (let b = Math.floor(binOf(azimuth - halfWidth)); b <= Math.ceil(binOf(azimuth + halfWidth)); b++) {
      const across = Math.abs((b / (SKYLINE_BINS - 1) - .5) * SKYLINE_RANGE * 2 - azimuth) / Math.max(halfWidth, 1e-4);
      if (across <= 1) raise(b, top - (top - foot) * across, distance);
    }
  }
  for (let i = 0; i < SKYLINE_BINS; i++) {
    let e = 0, d = 0, w = 0;
    for (let k = -1; k <= 1; k++) { const j = THREE.MathUtils.clamp(i + k, 0, SKYLINE_BINS - 1); const weight = 2 - Math.abs(k); e += elevations[j] * weight; d += distances[j] * weight; w += weight; }
    skylineData[i * 4] = Math.round(THREE.MathUtils.clamp(e / w / SKYLINE_MAX, 0, 1) * 255);
    skylineData[i * 4 + 1] = Math.round(THREE.MathUtils.clamp(d / w, 0, 1) * 255);
    skylineData[i * 4 + 3] = 255;
  }
  const skyline = new THREE.DataTexture(skylineData, SKYLINE_BINS, 1, THREE.RGBAFormat);
  skyline.magFilter = skyline.minFilter = THREE.LinearFilter;
  skyline.wrapS = skyline.wrapT = THREE.ClampToEdgeWrapping;
  skyline.needsUpdate = true;
  const waterUniforms = {
    ...sky.uniforms, uTime: { value: 0 }, uWarmth: { value: .55 }, uSkyline: { value: skyline },
    uHill: { value: new THREE.Vector3(.004, .005, .008) }, uHillHaze: { value: new THREE.Vector3(.016, .014, .024) },
    uFireGlow: { value: new THREE.Vector3(.5, .2, .06) }, uFirePos: { value: new THREE.Vector3(firePosition[0], .4, firePosition[2]) },
    uFarLight: { value: farLight }, uFarColor: { value: new THREE.Vector3(1.0, .58, .26).multiplyScalar(.0022) }, uMoonGlint: { value: .00013 },
  };
  const waterMaterial = new THREE.ShaderMaterial({ uniforms: waterUniforms, vertexShader: WATER_VERTEX, fragmentShader: WATER_FRAGMENT });
  const waterGeometry = new THREE.PlaneGeometry(230, 210, 128, 100);
  waterGeometry.rotateX(-Math.PI / 2);
  waterGeometry.translate(0, -.035, -108);
  const wp = waterGeometry.attributes.position;
  for (let i = 0; i < wp.count; i++) {
    const z = wp.getZ(i); const near = THREE.MathUtils.clamp((z + 11) / 8, 0, 1);
    wp.setZ(i, z + near * (shore(wp.getX(i)) + 3));
  }
  wp.needsUpdate = true;
  const water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.name = 'Lake';
  add(water);

  // Pebbles and boulders: faceted stone, merged; wet and dark at the waterline.
  const shingle = stoneMaterial('#8c8378', { key: 'lakeside-shingle', scale: 6, bump: .7, stain: '#5b4a3a', stainAmount: .2, cavity: .4, strata: .1, drips: 0, waterY: -.03, wetBand: .25, algaeAmount: .1, dryRoughness: .8, wetRoughness: .15 });
  const pebbleParts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 520; i++) {
    const x = (rng() - .5) * 32; const z = shore(x) + rng() * (i < 380 ? 2.9 : 12);
    if (Math.hypot(x - firePosition[0], z - firePosition[2]) < 1.1) continue;
    const size = .025 + Math.pow(rng(), 2) * .12;
    const g = boulderGeometry(2000 + i, 1, 8);
    g.applyMatrix4(new THREE.Matrix4().compose(V(x, -.02 + size * .3, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rng() * .4, rng() * 6, rng() * .4)), V(size * (1 + rng() * .6), size * (.38 + rng() * .35), size)));
    pebbleParts.push(g);
  }
  for (let i = 0; i < 20; i++) {
    const side = i % 2 ? -1 : 1, x = side * (3.5 + rng() * 14), z = shore(x) + rng() * .9;
    const g = boulderGeometry(130 + i, 8);
    g.applyMatrix4(new THREE.Matrix4().compose(V(x, -.04, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rng() * 6, 0)), V(.25 + rng() * .6, .16 + rng() * .24, .32 + rng() * .56)));
    pebbleParts.push(g);
  }
  const pebbles = mesh(mergeGeometries(pebbleParts), shingle);
  pebbleParts.forEach((g) => g.dispose());
  pebbles.name = 'Beach shingle and boulders';
  // Shingle is too small to matter in the fire's shadow maps; ambient occlusion grounds it.
  pebbles.castShadow = false;
  add(pebbles);

  // A ridge tent of cotton canvas: the ridge sags between its poles, the panels
  // billow between the pegged corners and the mid-eave pullouts, stress folds run
  // from the pullouts, felled seams join the canvas widths, and the lamp inside
  // glows through the cloth (darker where the seams double it).
  const tent = new THREE.Group(); tent.position.set(-3.06, 0, -3.3); tent.rotation.y = -.17; add(tent);
  const tentGlowPosition = { value: new THREE.Vector3() };
  const tentGlowStrength = { value: .15 };
  const canvasMat = tentCanvas('#b0a587', 'fly', { position: tentGlowPosition, strength: tentGlowStrength }, true);
  const canvasDark = fabricMaterial('#6f705d', 'lakeside-tent-trim', { side: THREE.DoubleSide, weave: 160 });
  const canvasInside = tentCanvas('#c2ae8a', 'door', { position: tentGlowPosition, strength: tentGlowStrength }, false);
  const halfWidth = 1.44, frontZ = 1.34, backZ = -1.65, ridgeHeight = 2.07;
  function tentPoint(side: number, s: number, t: number, inner = false) {
    const z = THREE.MathUtils.lerp(frontZ, backZ, t);
    // Held at the poles (t = 0, 1), the corners and the mid-eave pullout (s = 1, t = .5).
    const span = Math.abs(Math.sin(t * Math.PI * 2));
    const ridge = ridgeHeight - .085 * Math.sin(t * Math.PI) - t * .06;
    const billow = Math.sin(s * Math.PI) * (.1 + .045 * span) + .03 * s * s * span;
    // Stress folds fan out from each pullout toward the ridge ends.
    let folds = 0;
    for (const sign of [-1, 1]) {
      const along = (t - .5) * sign + (1 - s) * .5;
      folds += Math.sin(along * 38) * Math.exp(-Math.pow(along / .22, 2)) * Math.pow(s, 1.5) * (1 - s * .4);
    }
    const x = side * (halfWidth * s - .05 * Math.sin(s * Math.PI) * span);
    const y = .07 + (ridge - .07) * (1 - s) - billow + .012 * folds + .05 * Math.pow(s, 6) * span;
    return V(x - side * .006 * folds, y - (inner ? .032 : 0), z);
  }
  for (const side of [-1, 1]) {
    const geometry = new THREE.BufferGeometry(); const pos: number[] = [], uv: number[] = [], idx: number[] = [];
    const nu = 44, nv = 48;
    for (let v = 0; v <= nv; v++) for (let u = 0; u <= nu; u++) {
      const p = tentPoint(side, u / nu, v / nv); pos.push(p.x, p.y, p.z); uv.push(u / nu * 2, v / nv * 3);
      if (u < nu && v < nv) { const a = v * (nu + 1) + u; idx.push(a, a + 1, a + nu + 1, a + 1, a + nu + 2, a + nu + 1); }
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geometry.setIndex(idx); geometry.computeVertexNormals();
    const panel = new THREE.Mesh(geometry, canvasMat); panel.castShadow = true; panel.receiveShadow = true; tent.add(panel);
    for (const t of [0, 1]) tent.add(tube(Array.from({ length: 25 }, (_, n) => tentPoint(side, n / 24, t).add(V(0, .008, .004))), .012, canvasDark, 32));
    tent.add(tube(Array.from({ length: 40 }, (_, n) => tentPoint(side, 1, n / 39)), .02, canvasDark, 48));
  }
  tent.add(tube(Array.from({ length: 25 }, (_, n) => tentPoint(1, 0, n / 24).add(V(0, .018, 0))), .019, canvasDark, 30));
  const rearShape = new THREE.Shape(); rearShape.moveTo(-halfWidth, .08); rearShape.lineTo(0, ridgeHeight - .12); rearShape.lineTo(halfWidth, .08); rearShape.closePath();
  tent.add(mesh(new THREE.ShapeGeometry(rearShape), canvasDark, [0, 0, backZ]));
  for (const side of [-1, 1]) {
    const geo = new THREE.BufferGeometry(); const pos: number[] = [], uv: number[] = [], idx: number[] = [];
    const cols = 14, rows = 28;
    for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) {
      const h = j / rows, u = i / cols;
      const outside = halfWidth * (1 - h);
      const inside = (.82 * (1 - h) + .18 * Math.sin(h * Math.PI));
      const x = side * THREE.MathUtils.lerp(outside, inside, u);
      const y = .07 + h * (ridgeHeight - .08);
      // Tied back: the cloth gathers into soft vertical folds toward the tie.
      const z = frontZ + Math.sin(u * Math.PI * 1.6) * .1 * Math.sin(h * Math.PI) + Math.sin(u * 19 + h * 3) * .012 * u + side * .018;
      pos.push(x, y, z); uv.push(u, h * 2);
      if (i < cols && j < rows) { const a = j * (cols + 1) + i; idx.push(a, a + 1, a + cols + 1, a + 1, a + cols + 2, a + cols + 1); }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(idx); geo.computeVertexNormals();
    const flap = new THREE.Mesh(geo, canvasInside); flap.castShadow = true; flap.receiveShadow = true; tent.add(flap);
    const seam = Array.from({ length: 30 }, (_, i) => { const h = i / 29; return V(side * (.82 * (1 - h) + .18 * Math.sin(h * Math.PI)), .07 + h * (ridgeHeight - .08), frontZ + .018); });
    tent.add(tube(seam, .014, canvasDark, 30));
  }
  tent.add(beam(V(0, .02, frontZ - .015), V(0, ridgeHeight + .014, frontZ - .015), .021, darkMetal));
  // Low warm sleeping area is visible through the open entrance.
  tent.add(mesh(new THREE.BoxGeometry(2.57, .055, 2.8), canvasDark, [0, .02, -.1]));
  const sleeping = fabricMaterial('#8e5f52', 'lakeside-sleeping-bag', { weave: 90 });
  const pad = mesh(new THREE.BoxGeometry(.79, .08, 1.95), sleeping, [-.45, .12, -.2]); tent.add(pad);
  for (let i = 0; i < 12; i++) tent.add(mesh(new THREE.CapsuleGeometry(.08, .58, 4, 10), sleeping, [-.45, .19, -.99 + i * .143], [0, 0, Math.PI / 2]));
  const pillow = mesh(new THREE.SphereGeometry(.3, 24, 16), canvasInside, [-.46, .26, -1.02]); pillow.scale.set(1.19, .36, .68); tent.add(pillow);
  const innerGlow = new THREE.PointLight('#ffad5e', 2.2, 4.2, 2); innerGlow.position.set(.45, .55, -.75); tent.add(innerGlow);
  // Guy lines from the corners, the mid-eave pullouts and the front pole, each to a driven peg.
  const pegWood = woodMaterial('#8a6d4f', 'lakeside-pegs', { axis: 'y', ring: 40, weathered: .5 });
  const guy = (anchor: THREE.Vector3, peg: THREE.Vector3) => {
    const middle = anchor.clone().lerp(peg, .5).add(V(0, -.025 * anchor.distanceTo(peg), 0));
    tent.add(tube([anchor, middle, peg], .0075, ropeMat, 12));
    // Wooden peg leaning against the pull, its head proud of the ground.
    tent.add(beam(peg.clone().add(V(0, -.12, 0)), peg.clone().add(V(.02, .085, -.02)), .014, pegWood, 6));
  };
  for (const side of [-1, 1]) {
    for (const z of [frontZ, backZ]) guy(V(side * halfWidth, .09, z), V(side * 2.07, .005, z + (z > 0 ? .58 : -.3)));
    guy(tentPoint(side, 1, .5).add(V(0, .02, 0)), V(side * 2.25, .005, THREE.MathUtils.lerp(frontZ, backZ, .5)));
  }
  guy(V(0, ridgeHeight, frontZ), V(0, .06, frontZ + 1.04));

  // Empty folding chair opposite the tent: rails, sagging canvas and a draped throw.
  const chair = new THREE.Group(); chair.position.set(2.16, .02, -1.65); chair.rotation.y = -.34; add(chair);
  const chairCanvas = fabricMaterial('#5f6150', 'lakeside-chair', { side: THREE.DoubleSide, weave: 140 });
  function fabricPatch(width: number, depth: number, height: number, back: boolean) {
    const geo = new THREE.PlaneGeometry(width, depth, 22, 20); const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), sag = (1 - Math.pow(x / (width / 2), 2)) * (1 - Math.pow(y / (depth / 2), 2));
      if (back) pos.setXYZ(i, x, height + y, -.30 - sag * .13 - y * .20);
      else pos.setXYZ(i, x, height - sag * .087, y);
    }
    geo.computeVertexNormals(); const fabric = new THREE.Mesh(geo, chairCanvas); fabric.castShadow = true; fabric.receiveShadow = true; chair.add(fabric);
  }
  fabricPatch(.72, .61, .56, false); fabricPatch(.72, .69, .96, true);
  const armWood = woodMaterial('#7a5f45', 'lakeside-chair-arm', { axis: 'y', ring: 40, weathered: .2, roughness: .6 });
  for (const side of [-1, 1]) {
    const x = side * .39;
    chair.add(beam(V(x, .03, .39), V(x, 1.37, -.45), .022, darkMetal));
    chair.add(beam(V(x, .03, -.43), V(x, .65, .31), .022, darkMetal));
    chair.add(beam(V(x, .63, .34), V(x, .7, -.37), .03, armWood));
    chair.add(mesh(new THREE.SphereGeometry(.04, 16, 10), darkMetal, [x, .40, .0]));
  }
  chair.add(beam(V(-.39, .57, .3), V(.39, .57, .3), .02, darkMetal));
  chair.add(beam(V(-.39, 1.32, -.45), V(.39, 1.32, -.45), .02, darkMetal));
  chair.add(beam(V(-.39, .56, -.32), V(.39, .56, -.32), .02, darkMetal));
  const throwMat = fabricMaterial('#a26c58', 'lakeside-throw', { side: THREE.DoubleSide, weave: 70 });
  const throwGeo = new THREE.PlaneGeometry(.47, .68, 25, 25); const tp = throwGeo.attributes.position;
  for (let i = 0; i < tp.count; i++) {
    const x = tp.getX(i), s = (tp.getY(i) + .34) / .68;
    tp.setXYZ(i, x + .14, s < .45 ? .59 + Math.sin(x * 39) * .01 : .59 - (s - .45) * .55, .1 + s * .48);
  }
  throwGeo.computeVertexNormals(); const throwMesh = new THREE.Mesh(throwGeo, throwMat); throwMesh.castShadow = true; throwMesh.receiveShadow = true; chair.add(throwMesh);
  for (let i = 0; i < 16; i++) chair.add(beam(V(-.085 + i * .03, .28, .58), V(-.08 + i * .03, .21 - rng() * .025, .595), .004, throwMat, 5));

  const campfire = fire(firePosition, .74, { noise, lightIntensity: 7.5, bounceIntensity: 1.4 });
  add(campfire.group);
  // Split firewood with growth rings: tactile, off-centre foreground objects.
  const endGrain = woodMaterial('#9c8462', 'lakeside-log-ends', { axis: 'z', ring: 60, weathered: .25 });
  for (let i = 0; i < 4; i++) {
    const a = V(-2.08 + i * .11, .12 + (i > 2 ? .17 : 0), .21 + i * .08), b = a.clone().add(V(.67, -.015, .29));
    add(beam(a, b, .095, bark, 20));
    const end = mesh(new THREE.CircleGeometry(.082, 28), endGrain, [b.x, b.y, b.z]); end.quaternion.setFromUnitVectors(V(0, 0, 1), b.clone().sub(a).normalize()); end.position.addScaledVector(b.clone().sub(a).normalize(), .001); add(end);
  }

  // A low hand-built camp table at arm's reach with planks, a mug, a book and the lantern.
  const table = new THREE.Group(); table.position.set(.62, 0, 1.31); table.rotation.y = -.08; add(table);
  const plankWood = woodMaterial('#7c6249', 'lakeside-table', { axis: 'x', ring: 30, weathered: .35, roughness: .74 });
  const legWood = woodMaterial('#6c5540', 'lakeside-table-legs', { axis: 'y', ring: 30, weathered: .3 });
  for (let i = 0; i < 3; i++) {
    const shape = new THREE.Shape();
    shape.moveTo(-.71, -.142); shape.lineTo(.67, -.145); shape.quadraticCurveTo(.72, -.13, .714, -.09); shape.lineTo(.705, .127); shape.quadraticCurveTo(.70, .15, .66, .15); shape.lineTo(-.68, .147); shape.quadraticCurveTo(-.726, .14, -.72, .09); shape.lineTo(-.715, -.1); shape.quadraticCurveTo(-.715, -.145, -.71, -.142);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: .056, bevelEnabled: true, bevelSize: .007, bevelThickness: .004, bevelSegments: 3, steps: 1, curveSegments: 6 });
    const plank = mesh(geo, plankWood, [0, .63, -.33 + i * .323], [-Math.PI / 2, 0, 0]); table.add(plank);
    for (const x of [-.54, .54]) table.add(mesh(new THREE.CylinderGeometry(.009, .009, .003, 12), darkMetal, [x, .692, -.33 + i * .323]));
  }
  for (const x of [-.5, .5]) {
    table.add(beam(V(x, .02, -.40), V(x, .64, .25), .042, legWood));
    table.add(beam(V(x, .02, .35), V(x, .64, -.28), .042, legWood));
  }
  table.add(beam(V(-.52, .32, -.02), V(.52, .32, -.02), .032, legWood));
  const mug = new THREE.Group(); mug.position.set(-.18, .702, .02); mug.rotation.y = -.2; table.add(mug);
  const enamel = new THREE.MeshPhysicalMaterial({ color: '#bfd2c6', roughness: .22, metalness: 0, clearcoat: .8, clearcoatRoughness: .15 });
  const mugProfile = [V(.0, .008, 0), V(.119, .008, 0), V(.136, .028, 0), V(.142, .212, 0), V(.146, .23, 0), V(.136, .236, 0), V(.128, .23, 0), V(.126, .037, 0), V(.02, .032, 0)];
  const body = new THREE.Mesh(new THREE.LatheGeometry(mugProfile.map(p => new THREE.Vector2(p.x, p.y)), 64), enamel); body.castShadow = true; body.receiveShadow = true; mug.add(body);
  const rimMat = new THREE.MeshStandardMaterial({ color: '#33423f', roughness: .3, metalness: .6 });
  mug.add(mesh(new THREE.TorusGeometry(.14, .009, 10, 64), rimMat, [0, .231, 0], [Math.PI / 2, 0, 0]));
  const handle = mesh(new THREE.TorusGeometry(.082, .019, 12, 40, Math.PI * 1.66), enamel, [.15, .124, 0], [0, 0, -.83 * Math.PI]); handle.scale.set(.83, 1, 1); mug.add(handle);
  const coffee = new THREE.MeshPhysicalMaterial({ color: '#2a1a14', roughness: .08, metalness: 0, clearcoat: 1, clearcoatRoughness: .05 });
  mug.add(mesh(new THREE.CircleGeometry(.126, 48), coffee, [0, .203, 0], [-Math.PI / 2, 0, 0]));
  for (let i = 0; i < 9; i++) {
    const angle = rng() * Math.PI * 2;
    const chip = mesh(new THREE.SphereGeometry(.009, 6, 5), rimMat, [Math.cos(angle) * .139, .233, Math.sin(angle) * .139]); chip.scale.set(1, .21, .7); mug.add(chip);
  }
  const bookCover = fabricMaterial('#6e5b44', 'lakeside-book', { weave: 260 });
  table.add(mesh(new THREE.BoxGeometry(.29, .033, .39), bookCover, [.26, .71, -.25], [0, -.12, 0]));
  table.add(mesh(new THREE.BoxGeometry(.267, .022, .36), new THREE.MeshStandardMaterial({ color: '#d1c3a3', roughness: .95 }), [.26, .714, -.25], [0, -.12, 0]));
  const lamp = lantern([1.16, .707, 1.49], .68); add(lamp.group);

  // Soft steam over the mug: thin ribbons with noisy, fading alpha.
  const steamObjects: THREE.Mesh[] = [];
  const steamTime = { value: 0 };
  const steamOrigin = V(.62, 0, 1.31).add(V(-.18, .94, .02).applyAxisAngle(V(0, 1, 0), -.08));
  for (let strand = 0; strand < 3; strand++) {
    const geometry = new THREE.PlaneGeometry(.05, .4, 1, 24);
    geometry.translate(0, .2, 0);
    const material = new THREE.ShaderMaterial({
      uniforms: { uTime: steamTime, uPhase: { value: strand * 2.1 } }, transparent: true, depthWrite: false, side: THREE.DoubleSide,
      vertexShader: `uniform float uTime; uniform float uPhase; varying vec2 vUv;
        void main(){ vUv = uv; vec3 p = position; float t = uv.y;
          p.x += sin(t * 7.2 - uTime * .35 + uPhase) * .03 * t + (uv.x - .5) * .03 * t;
          p.z += cos(t * 5.1 - uTime * .24 + uPhase) * .02 * t;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.); }`,
      fragmentShader: `uniform float uTime; uniform float uPhase; varying vec2 vUv;
        void main(){ float t = vUv.y; float edge = pow(sin(vUv.x * 3.14159), 2.0);
          float wisp = .5 + .5 * sin(t * 18. - uTime * .9 + uPhase + sin(vUv.x * 6. + t * 4.) * 1.5);
          float a = edge * smoothstep(0., .15, t) * (1. - smoothstep(.45, 1., t)) * (.35 + .65 * wisp) * .09;
          gl_FragColor = vec4(vec3(.9, .88, .92) * .5, a);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    const obj = new THREE.Mesh(geometry, material); obj.position.copy(steamOrigin); obj.rotation.y = strand * Math.PI / 3; obj.renderOrder = 6;
    add(obj); steamObjects.push(obj);
  }

  // Shore grasses: individually bent ribbons in spatial clumps.
  const grassVerts: number[] = [], grassIndices: number[] = [], grassColors: number[] = [];
  const grassBase = new THREE.Color('#6b6a48');
  for (let clump = 0; clump < 170; clump++) {
    const x = (rng() - .5) * 38, z = shore(x) + rng() * 3.8;
    if (Math.abs(x) < 3.2 || (x < -1 && z > -4.6)) continue;
    for (let blade = 0; blade < 10; blade++) {
      const angle = rng() * 6.28, lean = .1 + rng() * .22, h = .14 + rng() * .53, width = .01 + rng() * .014;
      const bx = x + (rng() - .5) * .32, bz = z + (rng() - .5) * .32;
      const base = grassVerts.length / 3;
      const color = grassBase.clone().multiplyScalar(.7 + rng() * .55);
      for (let s = 0; s <= 4; s++) {
        const t = s / 4, cx = bx + Math.cos(angle) * lean * t * t, cz = bz + Math.sin(angle) * lean * t * t;
        for (const side of [-1, 1]) {
          grassVerts.push(cx + Math.cos(angle + Math.PI / 2) * width * (1 - t) * side, .012 + h * t, cz + Math.sin(angle + Math.PI / 2) * width * (1 - t) * side);
          grassColors.push(color.r * (.7 + .3 * t), color.g * (.75 + .25 * t), color.b * (.8 + .1 * t));
        }
        if (s < 4) { const a = base + s * 2; grassIndices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
      }
    }
  }
  const grassGeometry = new THREE.BufferGeometry(); grassGeometry.setAttribute('position', new THREE.Float32BufferAttribute(grassVerts, 3)); grassGeometry.setAttribute('color', new THREE.Float32BufferAttribute(grassColors, 3)); grassGeometry.setIndex(grassIndices); grassGeometry.computeVertexNormals();
  const grassMotion = { value: 0 };
  const grassMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .85, side: THREE.DoubleSide });
  grassMat.onBeforeCompile = shader => {
    shader.uniforms.uLakesideWindTime = grassMotion;
    shader.vertexShader = 'uniform float uLakesideWindTime;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      float bend=max(0.,position.y); bend*=bend;
      float wind=sin(position.x*.31+position.z*.22+uLakesideWindTime*.28)*.026;
      wind+=sin(position.x*1.7-position.z*.91+uLakesideWindTime*.34)*.009;
      transformed.x+=wind*bend; transformed.z+=wind*.32*bend;
    `).replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\nobjectNormal = normalize(objectNormal * 0.4 + vec3(0.0, 1.0, 0.0));');
  };
  grassMat.customProgramCacheKey = () => 'nightfires-lakeside-grass-v2';
  const grass = new THREE.Mesh(grassGeometry, grassMat); grass.receiveShadow = true; add(grass);

  // Ground dressing: grass tufts, half-buried stones, a chopping stump and roots.
  // Kept clear of the hearth and of the tent, chair and table in both framings.
  const footprints: Array<[number, number, number]> = [
    [firePosition[0], firePosition[2], 1.25], [-3.06, -3.3, 2.1], [-1.45, -3.8, 2.1], [2.16, -1.65, .65], [1.4, -2.15, .65],
    [.62, 1.31, .55], [.36, 1.31, .55], [-1.6, .45, .55], [-2.75, .55, .45], [5.5, -4.95, 1.7],
  ];
  const clear = (x: number, z: number, margin = 0) => footprints.every(([fx, fz, r]) => Math.hypot(x - fx, z - fz) > r + margin);
  const campGrass = scatter(190, 7713, [-9, 9, -6.5, 4.5], (x, z) => {
    if (z < shore(x) + .2 || !clear(x, z, .1)) return false;
    // Trampled bare in the middle of the camp, tufted toward the edges and the water.
    const edge = THREE.MathUtils.smoothstep(Math.abs(x), 1.5, 5) + THREE.MathUtils.smoothstep(shore(x) + 2.5 - z, 0, 2.5);
    return rng() < .25 + .75 * Math.min(1, edge);
  }, [.7, 1.4]);
  const tufts = createGrass(campGrass, groundY, grassMotion, 21);
  tufts.name = 'Camp grass tufts';
  add(tufts);
  const stoneParts: THREE.BufferGeometry[] = [];
  for (let i = 0, placed = 0; i < 400 && placed < 46; i++) {
    const x = (rng() - .5) * 16, z = shore(x) + .6 + rng() * 9;
    if (!clear(x, z, .15)) continue;
    const size = .05 + Math.pow(rng(), 2.2) * .2;
    const g = boulderGeometry(6100 + i, 3, 9, .1);
    g.applyMatrix4(new THREE.Matrix4().compose(V(x, groundY(x, z) + size * .12, z), new THREE.Quaternion().setFromEuler(new THREE.Euler((rng() - .5) * .3, rng() * 6.28, (rng() - .5) * .3)), V(size * (1 + rng() * .5), size * (.45 + rng() * .3), size)));
    stoneParts.push(g);
    placed++;
  }
  const campStones = mesh(mergeGeometries(stoneParts), stoneMaterial('#86817a', { key: 'lakeside-camp-stones', scale: 5, bump: .9, stain: '#5b4a3a', stainAmount: .25, cavity: .5, strata: .15, drips: 0, dryRoughness: .86, moss: { color: '#4d5530', amount: .3 } }));
  stoneParts.forEach((g) => g.dispose());
  campStones.name = 'Half-buried stones';
  campStones.castShadow = false;
  add(campStones);
  // Roots: bark-covered, dipping in and out of the soil.
  const rootParts: THREE.BufferGeometry[] = [];
  const root = (from: THREE.Vector3, angle: number, length: number, radius: number, seed: number) => {
    const points: THREE.Vector3[] = [];
    for (let k = 0; k <= 6; k++) {
      const q = k / 6;
      const wander = Math.sin(q * 5 + seed) * .12 * q;
      const x = from.x + Math.cos(angle + wander) * length * q, z = from.z + Math.sin(angle + wander) * length * q;
      // Rises from the trunk flare, then sinks into the ground and resurfaces once.
      const y = groundY(x, z) + radius * (1.6 * (1 - q) * (1 - q) + .35 * Math.sin(q * 9 + seed) - .25);
      points.push(V(x, y + (k === 0 ? radius * 1.2 : 0), z));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const g = new THREE.TubeGeometry(curve, 18, radius, 7, false);
    // Taper toward the tip.
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const t = Math.floor(i / 8) / 18, c = curve.getPointAt(Math.min(1, t)), k = 1 - t * .8;
      p.setXYZ(i, c.x + (p.getX(i) - c.x) * k, c.y + (p.getY(i) - c.y) * k, c.z + (p.getZ(i) - c.z) * k);
    }
    g.deleteAttribute('uv');
    g.computeVertexNormals();
    rootParts.push(g);
  };
  // An old pine stump by the woodpile, sawn flat, its roots gripping the soil.
  const stumpSpot = V(-2.75, groundY(-2.75, .55), .55);
  const stumpProfile = [V(.36, -.05, 0), V(.33, .02, 0), V(.27, .08, 0), V(.25, .2, 0), V(.245, .36, 0), V(.24, .4, 0), V(0, .4, 0)].map((p) => new THREE.Vector2(p.x, p.y));
  const stumpGeometry = new THREE.LatheGeometry(stumpProfile, 28);
  stumpGeometry.deleteAttribute('uv');
  const stump = mesh(stumpGeometry, barkMaterial('#4f463d', 'lakeside-stump', { furrows: 8, lichen: .35 }), [stumpSpot.x, stumpSpot.y, stumpSpot.z]);
  stump.name = 'Chopping stump';
  add(stump);
  const stumpTop = mesh(new THREE.CircleGeometry(.238, 40), woodMaterial('#8d7556', 'lakeside-stump-top', { axis: 'z', ring: 40, weathered: .6, roughness: .9 }), [stumpSpot.x, stumpSpot.y + .401, stumpSpot.z], [-Math.PI / 2, 0, 0]);
  add(stumpTop);
  for (let k = 0; k < 6; k++) root(stumpSpot.clone().add(V(Math.cos(k * 1.1 + .3) * .26, 0, Math.sin(k * 1.1 + .3) * .26)), k * 1.1 + .3, .55 + rng() * .5, .045 + rng() * .02, k * 1.7);
  for (let tree = 0; tree < 3; tree++) {
    const base = V(5.9 + tree * 2.1, 0, -2.7 - tree * 3.2);
    for (let k = 0; k < 5; k++) root(base.clone().add(V(Math.cos(k * 1.3) * .1, 0, Math.sin(k * 1.3) * .1)), k * 1.3 + tree, .7 + rng() * .8, .035 + rng() * .02, k + tree * 3);
  }
  const roots = mesh(mergeGeometries(rootParts), bark);
  rootParts.forEach((g) => g.dispose());
  roots.name = 'Roots';
  add(roots);
  // Fallen twigs and a few cones among the needles.
  const twigParts: THREE.BufferGeometry[] = [];
  for (let i = 0, placed = 0; i < 300 && placed < 60; i++) {
    const x = (rng() - .5) * 12, z = shore(x) + 1 + rng() * 8;
    if (!clear(x, z, .05)) continue;
    const a = rng() * 6.28, l = .12 + rng() * .35;
    const g = new THREE.CylinderGeometry(.004, .007, l, 5, 1);
    g.rotateZ(Math.PI / 2); g.rotateY(a);
    g.translate(x, groundY(x, z) + .006, z);
    g.deleteAttribute('uv');
    twigParts.push(g);
    if (rng() < .3) {
      const cone = new THREE.SphereGeometry(.025, 7, 5);
      cone.scale(1, 1, 1.7); cone.rotateY(rng() * 6.28);
      cone.translate(x + .1, groundY(x + .1, z) + .02, z + .05);
      cone.deleteAttribute('uv');
      twigParts.push(cone);
    }
    placed++;
  }
  const twigs = mesh(mergeGeometries(twigParts.map((g) => g.index ? g.toNonIndexed() : g)), bark);
  twigParts.forEach((g) => g.dispose());
  twigs.castShadow = false;
  twigs.name = 'Twigs and cones';
  add(twigs);

  // Sedge along the waterline either side of the open water, tall enough to stand
  // against the moonlit lake; kept clear of the glitter path in the middle.
  const sedge = scatter(70, 9917, [-10, 10, -7, -3], (x, z) => {
    const edge = z - shore(x);
    return Math.abs(x - .7) > 2.4 && edge > -.7 && edge < .5 && clear(x, z, .2);
  }, [2.2, 3.4]);
  const sedgeMesh = createGrass(sedge, (x, z) => Math.max(groundY(x, z), -.05), grassMotion, 33);
  sedgeMesh.name = 'Shore sedge';
  add(sedgeMesh);

  // An old clinker rowboat pulled half out of the water, oars shipped, its painter
  // rope tied to a stake on the beach.
  const boat = new THREE.Group();
  boat.position.set(5.5, -.03, -4.95);
  boat.rotation.set(0, -Math.atan2(.62, .78), .1);
  add(boat);
  const hullWood = woodMaterial('#5c5045', 'lakeside-boat-hull', { axis: 'x', ring: 14, weathered: .7, roughness: .82 });
  const BOAT_L = 3.1;
  const hullAt = (u: number, side: number, a: number) => {
    // u: stern (0) to bow (1); a: keel (0) to gunwale (1) around the section.
    const x = (u - .5) * BOAT_L;
    const beam = .53 * Math.pow(Math.sin(Math.PI * (.18 + .82 * Math.pow(u, .9))), .55) * (u < .05 ? .97 : 1);
    const keel = .07 * Math.pow(2 * u - 1, 2) + .02;
    const sheer = .44 + .16 * Math.pow(Math.max(0, u - .55) / .45, 2) + .06 * Math.pow(Math.max(0, .3 - u) / .3, 2);
    // Clinker laps: each strake steps out a little over the one below.
    const strake = a * 5, lap = (strake - Math.floor(strake)) * .012;
    const s = Math.pow(Math.sin(a * Math.PI / 2), .75);
    return V(x, keel + (sheer - keel) * (1 - Math.cos(a * Math.PI / 2)) * .85 + (sheer - keel) * .15 * a, side * (beam * s + lap));
  };
  const hullPositions: number[] = [], hullIndices: number[] = [];
  const NU = 40, NA = 12;
  for (let i = 0; i <= NU; i++) for (let j = 0; j <= NA * 2; j++) {
    const side = j < NA ? -1 : 1, a = Math.abs(j - NA) / NA;
    const p = hullAt(i / NU, side, a);
    hullPositions.push(p.x, p.y, p.z);
    if (i < NU && j < NA * 2) { const q = i * (NA * 2 + 1) + j; hullIndices.push(q, q + 1, q + NA * 2 + 1, q + 1, q + NA * 2 + 2, q + NA * 2 + 1); }
  }
  const hullGeometry = new THREE.BufferGeometry();
  hullGeometry.setAttribute('position', new THREE.Float32BufferAttribute(hullPositions, 3));
  hullGeometry.setIndex(hullIndices);
  hullGeometry.computeVertexNormals();
  const hull = new THREE.Mesh(hullGeometry, hullWood);
  hullWood.side = THREE.DoubleSide;
  hull.castShadow = hull.receiveShadow = true;
  hull.name = 'Rowboat hull';
  boat.add(hull);
  // Transom, gunwales, thwarts and oars.
  const transom = new THREE.Shape();
  for (let j = 0; j <= NA * 2; j++) { const side = j < NA ? -1 : 1, p = hullAt(0, side, Math.abs(j - NA) / NA); if (j) transom.lineTo(p.z, p.y); else transom.moveTo(p.z, p.y); }
  boat.add(mesh(new THREE.ShapeGeometry(transom), hullWood, [-BOAT_L / 2 + .005, 0, 0], [0, -Math.PI / 2, 0]));
  const railWood = woodMaterial('#6b5b4b', 'lakeside-boat-rail', { axis: 'y', ring: 30, weathered: .5 });
  for (const side of [-1, 1]) boat.add(tube(Array.from({ length: 24 }, (_, k) => hullAt(.01 + k / 23 * .98, side, 1).add(V(0, .012, -side * .01))), .022, railWood, 40));
  for (const u of [.36, .68]) {
    const left = hullAt(u, -1, .82), right = hullAt(u, 1, .82);
    boat.add(mesh(new THREE.BoxGeometry(.22, .035, right.z - left.z - .03), hullWood, [left.x, left.y, 0]));
  }
  for (const side of [-1, 1]) {
    const blade = V(-.95, .3, side * .18), handle = V(1.05, .5, side * .3);
    boat.add(beam(blade, handle, .022, railWood, 8));
    const paddle = mesh(new THREE.BoxGeometry(.5, .012, .13), railWood, [blade.x - .2, blade.y - .04, blade.z]);
    paddle.rotation.z = Math.atan2(handle.y - blade.y, handle.x - blade.x);
    boat.add(paddle);
  }
  boat.updateMatrixWorld(true);
  const bow = hullAt(.99, 0, 1).applyMatrix4(boat.matrixWorld);
  const stake = V(bow.x + .9, groundY(bow.x + .9, bow.z + .8), bow.z + .8);
  add(beam(stake.clone().add(V(0, -.1, 0)), stake.clone().add(V(.02, .28, -.02)), .028, pegWood, 7));
  add(tube([bow, bow.clone().lerp(stake, .5).add(V(0, -.18, 0)), stake.clone().add(V(0, .2, 0))], .009, ropeMat, 16));

  // Birches frame the open sky on the right: pale bark with dark lenticels, leaf cards on bent branches.
  const birchBark = new THREE.MeshStandardMaterial({ color: '#c9c2b0', roughness: .8, metalness: 0 });
  birchBark.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vBirchWorld;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvBirchWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vBirchWorld;\n${GLSL_NOISE}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float birchMark = smoothstep(0.58, 0.8, bwNoise(vBirchWorld * vec3(5.0, 26.0, 5.0)) + 0.2 * bwNoise(vBirchWorld * 2.0));
float birchStain = smoothstep(0.2, 0.7, bwFbm3(vBirchWorld * vec3(1.5, 0.4, 1.5)));
diffuseColor.rgb *= mix(vec3(1.0), vec3(0.08, 0.07, 0.065), birchMark) * (1.0 - 0.25 * birchStain);
`);
  };
  birchBark.customProgramCacheKey = () => 'night-birch-v1';
  const leafMaterial = createFoliageMaterial(leafSprayTexture(77, '#6d7f52'), 'lakeside-birch-leaves');
  const leafPositions: number[] = [], leafNormals: number[] = [], leafUvs: number[] = [], leafColors: number[] = [], leafIndex: number[] = [];
  const birchParts: THREE.BufferGeometry[] = [];
  const birchTube = (points: THREE.Vector3[], radius: number, segments: number) => {
    const curve = new THREE.CatmullRomCurve3(points);
    const g = new THREE.TubeGeometry(curve, segments, radius, 10, false);
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const t = Math.floor(i / 11) / segments;
      const c = curve.getPointAt(Math.min(1, t));
      const k = 1 - t * .55;
      p.setXYZ(i, c.x + (p.getX(i) - c.x) * k, c.y + (p.getY(i) - c.y) * k, c.z + (p.getZ(i) - c.z) * k);
    }
    g.deleteAttribute('uv');
    g.computeVertexNormals();
    birchParts.push(g.toNonIndexed()); g.dispose();
  };
  const leafCard = (centre: THREE.Vector3, along: THREE.Vector3, across: THREE.Vector3, size: number, crown: THREE.Vector3) => {
    const start = leafPositions.length / 3;
    for (const [u, v] of [[-.5, -.5], [.5, -.5], [.5, .5], [-.5, .5]]) {
      const p = centre.clone().addScaledVector(along, u * size).addScaledVector(across, v * size * .5);
      leafPositions.push(p.x, p.y, p.z);
      const n = p.clone().sub(crown).normalize().add(V(0, .4, 0)).normalize();
      leafNormals.push(n.x, n.y, n.z); leafUvs.push(u + .5, v + .5);
      const shade = .7 + rng() * .5; leafColors.push(shade, shade, shade * .95);
    }
    leafIndex.push(start, start + 1, start + 2, start, start + 2, start + 3);
  };
  for (let tree = 0; tree < 3; tree++) {
    const x = 5.9 + tree * 2.1, z = -2.7 - tree * 3.2, h = 6.5 + rng() * 3;
    birchTube([V(x, -.1, z), V(x + .13, h * .4, z - .04), V(x + .43, h * .77, z - .21), V(x + .68, h, z - .4)], .09 + (2 - tree) * .016, 28);
    const crown = V(x + .5, h * .78, z - .2);
    for (let b = 0; b < 9; b++) {
      const by = h * (.46 + b * .058), angle = b * 2.36 + tree;
      const start = V(x + .3, by, z - .1), end = V(x + .3 + Math.cos(angle) * (1.35 + rng() * .7), by + .55 + rng() * .65, z + Math.sin(angle) * 1.3);
      birchTube([start, start.clone().lerp(end, .5).add(V(0, .2, 0)), end], .02 + (9 - b) * .0014, 12);
      for (let l = 0; l < 44; l++) {
        const t = .25 + rng() * .75;
        const p = start.clone().lerp(end, t).add(V((rng() - .5) * .7, rng() * .5 - .15, (rng() - .5) * .6));
        const along = V(rng() - .5, -.3 - rng() * .5, rng() - .5).normalize();
        const across = V(-along.z, 0, along.x).normalize().applyAxisAngle(along, (rng() - .5) * 1.2);
        leafCard(p, along, across, .4 + rng() * .25, crown);
      }
    }
  }
  const birches = mesh(mergeGeometries(birchParts), birchBark);
  birchParts.forEach((g) => g.dispose());
  birches.name = 'Birch trunks';
  add(birches);
  const leafGeometry = new THREE.BufferGeometry();
  leafGeometry.setAttribute('position', new THREE.Float32BufferAttribute(leafPositions, 3));
  leafGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(leafNormals, 3));
  leafGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(leafUvs, 2));
  leafGeometry.setAttribute('color', new THREE.Float32BufferAttribute(leafColors, 3));
  leafGeometry.setIndex(leafIndex);
  const leaves = mesh(leafGeometry, leafMaterial);
  leaves.name = 'Birch leaves';
  add(leaves);

  let elapsed = 0;
  let environment: THREE.WebGLRenderTarget | null = null;
  let volumeUniforms: Record<string, THREE.IUniform> | null = null;
  const fireGlow = campfire.glow.clone();
  return {
    scene,
    view: aspect => {
      // A narrow screen receives a closer semicircle of equipment. The tent's
      // doorway and the complete mug/lantern remain readable instead of a blind crop.
      const portrait = aspect < .85;
      tent.position.x = portrait ? -1.45 : -3.06;
      tent.position.z = portrait ? -3.80 : -3.3;
      chair.position.x = portrait ? 1.40 : 2.16;
      chair.position.z = portrait ? -2.15 : -1.65;
      table.position.x = portrait ? .36 : .62;
      lamp.group.position.x = portrait ? .59 : 1.16;
      for (const steam of steamObjects) steam.position.x = steamOrigin.x + (portrait ? -.26 : 0);
      tent.updateMatrixWorld(true);
      tentGlowPosition.value.copy(innerGlow.position).applyMatrix4(tent.matrixWorld);
      return portrait
        ? { position: [.08, 1.28, 3.7], target: [.1, 1.3, -14], fov: 65 }
        : { position: [.12, 1.55, 4.23], target: [-.18, 1.12, -7.4], fov: 55 };
    },
    update: (time, dt) => {
      elapsed = time;
      waterUniforms.uTime.value = time;
      grassMotion.value = time;
      steamTime.value = time;
      sky.update(time);
      clouds.uniforms.uTime.value = time;
      campfire.update(time, dt); lamp.update(time, dt);
      const flicker = fireFlicker(time, firePosition[0]);
      if (volumeUniforms) volumeUniforms.uFlicker.value = flicker;
      tentGlowStrength.value = .36 * (.96 + .04 * Math.sin(time * .7));
    },
    targets: [{ object: campfire.target, kind: 'log-embers' }, { object: lamp.target, kind: 'lantern-brightness' }],
    interact: (kind: NightInteractionKind) => {
      if (kind === 'lantern-brightness') return lamp.toggle();
      campfire.stoke(); waterUniforms.uWarmth.value = .64 + Math.sin(elapsed) * .02; return .45;
    },
    post: {
      exposure: 1.3, bloomStrength: .08, bloomThreshold: 0, aoStrength: .85, aoRadius: .5,
      saturation: 1.05, contrast: 1.06, shadowTint: [.92, .94, 1.1], highlightTint: [1.08, 1.0, .9], vignette: .45, grain: .026,
    },
    prepare(renderer) {
      environment = bakeNightEnvironment(renderer, sky.dome, '#17151a');
      scene.environment = environment.texture;
      scene.environmentIntensity = 1.5;
    },
    createVolume() {
      const volume = createNightVolume({
        noise, moonDirection: afterglow.clone().setY(.15).normalize(), moon: new THREE.Color(.05, .04, .06), ambient: new THREE.Color(.014, .014, .024),
        // Haze pools low over the lake, so each headland's foot fades behind the next;
        // a thin mist lies on the water beyond the shallows and drifts slowly.
        fogDensity: .0021, fogHeight: 6, fogBase: 0, maxDistance: 300,
        mist: { y: .3, thickness: 1.8, density: .011, start: 24, tint: new THREE.Color(.9, .88, 1.0), drift: new THREE.Vector2(.003, .0011), contrast: 1.3 },
        glow: { position: fireGlow, color: new THREE.Color(1.0, .48, .18), density: .008 },
        smoke: { base: V(firePosition[0], .8, firePosition[2]), radius: .1, height: 3.6, density: .25, wind: new THREE.Vector2(.07, -.05), fireLight: new THREE.Color(1.0, .42, .14).multiplyScalar(.5) },
      });
      volumeUniforms = volume.uniforms;
      return volume;
    },
    setPostActive(active) { scene.fog = active ? null : fallbackFog; },
    dispose() { environment?.dispose(); environment = null; },
  };
}
