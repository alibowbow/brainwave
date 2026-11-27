import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { seeded, mesh, beam, fire, lantern, stoneMaterial, woodMaterial, barkMaterial, fabricMaterial } from './scenery';
import type { WorldRecipe, NightInteractionKind } from './worldTypes';
import { createNoiseVolume, fireFlicker } from '../shared/render/fireFlame';
import { GLSL_NOISE } from '../shared/render/glsl';
import { bakeNightEnvironment, createNightSky, GLSL_NIGHT_SKY } from '../shared/render/skyNight';
import { createNightVolume } from './atmosphere';
import { boulderGeometry, createFoliageMaterial, createGroundMaterial, createTerrainMaterial, distantSpruceGeometry, leafSprayTexture, ridgeGeometry } from './landscape';

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
uniform float uTime;
void main() {
  vec3 p = position;
  p.y += sin(p.x * .64 + p.z * .48 + uTime * .24) * .012 + sin(p.x * 1.71 - p.z * .88 + uTime * .31) * .006;
  vec4 world = modelMatrix * vec4(p, 1.0);
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
varying vec3 vWorld;
// Broad, gently phase-warped slopes avoid parallel reflection stripes; detail fades with footprint.
float wave(vec2 p, float footprint) {
  float warp = sin(p.x * .095 + p.y * .071) * .65 + sin(p.x * .04 - p.y * .13) * .37;
  float broad = sin(p.x * .42 + p.y * .60 + uTime * .11 + warp) * .0105;
  float crossWave = sin(-p.x * .85 + p.y * .37 - uTime * .09 + cos(p.y * .063) * .73) * .0038;
  float middle = sin(p.x * .74 + p.y * .47 + uTime * .16 + warp) * .0009 / (1. + footprint * footprint * .8);
  float fine = sin(p.x * 1.3 - p.y * .82 + uTime * .19 + warp) * .00025 / (1. + footprint * footprint * 2.7);
  return broad + crossWave + middle + fine;
}
float ripple(vec2 p, float footprint) {
  // Small capillary ripples for the moon's glitter, faded where pixels are large.
  vec3 q = vec3(p * 1.7, uTime * 0.35);
  float n = (texture(uSkyNoise, q * 0.25).g - 0.5) + (texture(uSkyNoise, q * 0.6 + 0.3).b - 0.5) * 0.6;
  return n * 0.07 / (1.0 + footprint * footprint * 3.0);
}
void main() {
  vec2 p = vWorld.xz;
  float footprint = max(length(dFdx(p)), length(dFdy(p)));
  float e = clamp(footprint * .7, .12, 2.8);
  float normalFade = 1. / (1. + footprint * .14);
  vec3 n = normalize(vec3(
    (wave(p - vec2(e, 0.), footprint) - wave(p + vec2(e, 0.), footprint)) * normalFade / (2. * e), 1.,
    (wave(p - vec2(0., e), footprint) - wave(p + vec2(0., e), footprint)) * normalFade / (2. * e)));
  float re = 0.06;
  vec3 nGlint = normalize(n + vec3(ripple(p - vec2(re, 0.0), footprint) - ripple(p + vec2(re, 0.0), footprint), 0.0,
                                  ripple(p - vec2(0.0, re), footprint) - ripple(p + vec2(0.0, re), footprint)) / (2.0 * re));
  vec3 viewDir = normalize(cameraPosition - vWorld);
  vec3 r = reflect(-viewDir, n);
  r.y = abs(r.y);
  float fresnel = .02 + .98 * pow(1. - max(0., dot(viewDir, n)), 5.0);
  float pixelAngle = max(length(fwidth(r)), 1e-4);
  vec3 reflected = (bwNightSkyBase(r) + bwMoon(r, pixelAngle * 3.0) * 0.6) * 0.9;
  // The hills mirrored from a precomputed skyline (elevation by azimuth).
  float azimuth = atan(r.x, -r.z);
  vec4 skyline = texture(uSkyline, vec2(azimuth / ${(SKYLINE_RANGE * 2).toFixed(3)} + 0.5, 0.5));
  float ridgeElevation = skyline.r * ${SKYLINE_MAX.toFixed(3)};
  float soften = 0.008 + pixelAngle * 2.0 + footprint * 0.001;
  float hill = 1.0 - smoothstep(ridgeElevation - soften, ridgeElevation + soften, asin(clamp(r.y, 0.0, 1.0)));
  vec3 hillColor = mix(uHill, uHillHaze, smoothstep(0.2, 0.9, skyline.g) * 0.8 + 0.2 * smoothstep(0.0, ridgeElevation + 1e-3, asin(r.y)));
  reflected = mix(reflected, hillColor, hill);
  // The moon's glitter path from the small ripples.
  vec3 rg = reflect(-viewDir, nGlint);
  float glint = pow(max(dot(rg, uMoonDir), 0.0), 900.0) * 6.0 + pow(max(dot(rg, uMoonDir), 0.0), 120.0) * 0.08;
  vec3 deep = vec3(.006, .011, .016) + vec3(.004, .006, .01) * clamp(-vWorld.z / 100., 0., 1.);
  vec3 color = mix(deep, reflected, fresnel) + uMoonColor * 0.0016 * glint * (1.0 - hill);
  // Firelight falls on the nearest water by the shore.
  vec3 toFire = uFirePos - vWorld;
  color += uFireGlow * uWarmth * (0.6 + 0.4 * fresnel) / (dot(toFire, toFire) * 0.6 + 1.0) * smoothstep(-12.0, -5.5, vWorld.z);
  gl_FragColor = vec4(color, 1.);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/** All geometry and shading are original. Distances are metres; the viewpoint is a seated camper. */
export function buildLakesideWorld(): WorldRecipe {
  const scene = new THREE.Scene();
  scene.name = 'Lakeside camp — violet twilight';
  const fallbackFog = new THREE.FogExp2('#3b3a52', .0055);
  scene.fog = fallbackFog;
  const rng = seeded(882719);
  const noise = createNoiseVolume(48, 17);

  // Violet afterglow over the western hills, a young crescent setting into it, the first stars.
  const afterglow = direction(-38, 0);
  const moonDir = direction(-24, 11);
  const sky = createNightSky({
    noise, zenith: '#182048', horizon: '#64557e', brightness: 0.21,
    glow: { color: '#c48a8e', direction: afterglow, intensity: 0.32, width: 1.8, height: 0.16 },
    airglow: 0,
    moon: { direction: moonDir, intensity: 40, radius: 0.012, halo: 0.8, color: '#fff2dc', sunDirection: direction(-46, -14) },
    stars: { count: 1400, seed: 2048, intensity: 0.55, galacticFraction: 0 },
  });
  scene.add(sky.group);

  // Soft twilight from the west is the cool key; fire, lantern and tent glow are the warm keys.
  const twilight = new THREE.DirectionalLight('#b9a8d8', 0.55);
  twilight.position.copy(afterglow).setY(0.35).normalize().multiplyScalar(60);
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
  const groundGeometry = new THREE.BufferGeometry();
  const groundVertices: number[] = [], groundIndices: number[] = [];
  const gx = 160, gz = 64;
  for (let iz = 0; iz <= gz; iz++) for (let ix = 0; ix <= gx; ix++) {
    const x = -32 + ix / gx * 64;
    const v = iz / gz;
    const z = THREE.MathUtils.lerp(shore(x) - .15, 19, v);
    const rise = Math.min(v * 2.9, 1);
    const y = -.08 + rise * .075 + Math.sin(x * 1.2) * Math.sin(z * 1.5) * .025 * rise;
    groundVertices.push(x, y, z);
    if (ix < gx && iz < gz) { const a = iz * (gx + 1) + ix; groundIndices.push(a, a + gx + 1, a + 1, a + 1, a + gx + 1, a + gx + 2); }
  }
  groundGeometry.setAttribute('position', new THREE.Float32BufferAttribute(groundVertices, 3));
  groundGeometry.setIndex(groundIndices); groundGeometry.computeVertexNormals();
  const firePosition: [number, number, number] = [-.78, .035, -.87];
  const ground = new THREE.Mesh(groundGeometry, createGroundMaterial({
    key: 'lakeside-beach', soil: '#6e655a', litter: '#5a4c3c', litterAmount: 0.25, grass: '#4f5236', grassAmount: 0.35, grassBias: -0.25,
    pebble: '#7d746a', pebbleAmount: 0.55, scale: 1.3, hearth: { centre: new THREE.Vector3(...firePosition), radius: .8 }, wetBelow: -.072, wetBand: .012,
  }));
  ground.receiveShadow = true; add(ground);

  // Lake: same sky as the dome, the hills mirrored from a skyline, the crescent's glitter path.
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
  // Skyline seen from the middle of the near water: elevation and distance per azimuth.
  const skylineData = new Uint8Array(SKYLINE_BINS * 4);
  const elevations = new Float32Array(SKYLINE_BINS), distances = new Float32Array(SKYLINE_BINS).fill(1);
  const reference = V(0, -.03, -12);
  for (const geometry of islandGeometries) {
    const position = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < position.count; i++) {
      const dx = position.getX(i) - reference.x, dz = position.getZ(i) - reference.z;
      const distance = Math.hypot(dx, dz);
      const azimuth = Math.atan2(dx, -dz);
      const bin = Math.round((azimuth / (SKYLINE_RANGE * 2) + .5) * (SKYLINE_BINS - 1));
      if (bin < 0 || bin >= SKYLINE_BINS) continue;
      const elevation = Math.atan2(position.getY(i) - reference.y, distance);
      if (elevation > elevations[bin]) { elevations[bin] = elevation; distances[bin] = Math.min(1, distance / 160); }
    }
  }
  for (let i = 0; i < SKYLINE_BINS; i++) {
    let e = 0, d = 0, w = 0;
    for (let k = -2; k <= 2; k++) { const j = THREE.MathUtils.clamp(i + k, 0, SKYLINE_BINS - 1); const weight = 3 - Math.abs(k); e += elevations[j] * weight; d += distances[j] * weight; w += weight; }
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

  // Spruce along the far shores, tiny with distance.
  const spruce = distantSpruceGeometry();
  const placements: THREE.Matrix4[] = [];
  islandGeometries.forEach((geometry) => {
    const position = geometry.attributes.position as THREE.BufferAttribute, normal = geometry.attributes.normal as THREE.BufferAttribute;
    let placed = 0;
    for (let attempt = 0; attempt < 6000 && placed < 650; attempt++) {
      const i = Math.floor(rng() * position.count);
      if (normal.getY(i) < .66 || position.getY(i) < .2) continue;
      const h = 1.4 + Math.pow(rng(), 2.2) * 6;
      const width = h * (.24 + rng() * .18);
      placements.push(new THREE.Matrix4().compose(V(position.getX(i) + (rng() - .5) * 1.4, position.getY(i) - .3, position.getZ(i) + (rng() - .5) * 1.4), new THREE.Quaternion().setFromEuler(new THREE.Euler((rng() - .5) * .06, rng() * 6.28, (rng() - .5) * .06)), V(width, h, width)));
      placed++;
    }
  });
  const shoreForest = new THREE.InstancedMesh(spruce, new THREE.MeshStandardMaterial({ color: '#1c241f', roughness: .95, side: THREE.DoubleSide }), placements.length);
  placements.forEach((matrix, i) => shoreForest.setMatrixAt(i, matrix));
  shoreForest.name = 'Far-shore spruce';
  add(shoreForest);

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
  add(pebbles);

  // Tensioned canvas tent with bowed panels, seams, a raised fly edge and a genuinely open entrance.
  const tent = new THREE.Group(); tent.position.set(-3.06, 0, -3.3); tent.rotation.y = -.17; add(tent);
  const tentGlowPosition = { value: new THREE.Vector3() };
  const tentGlowStrength = { value: .36 };
  const canvasMat = fabricMaterial('#a99f86', 'lakeside-tent-fly', { side: THREE.DoubleSide, glow: { position: tentGlowPosition, color: '#ffb066', strength: tentGlowStrength } });
  const canvasDark = fabricMaterial('#6f705d', 'lakeside-tent-trim', { side: THREE.DoubleSide, weave: 160 });
  const canvasInside = fabricMaterial('#c4ad86', 'lakeside-tent-door', { side: THREE.DoubleSide, glow: { position: tentGlowPosition, color: '#ffb066', strength: tentGlowStrength } });
  const halfWidth = 1.44, frontZ = 1.34, backZ = -1.65, ridgeHeight = 2.07;
  function tentPoint(side: number, s: number, t: number, inner = false) {
    const z = THREE.MathUtils.lerp(frontZ, backZ, t);
    const ridge = ridgeHeight - .105 * Math.sin(t * Math.PI) - t * .12;
    const x = side * (halfWidth * s + Math.sin(t * Math.PI) * .055 * s);
    const y = .07 + (ridge - .07) * (1 - s) - Math.sin(s * Math.PI) * (.13 + .045 * Math.sin(t * 9)) + .018 * Math.sin(s * 27 + t * 11) * Math.sin(t * Math.PI) * Math.sin(s * Math.PI);
    return V(x, y - (inner ? .032 : 0), z);
  }
  for (const side of [-1, 1]) {
    const geometry = new THREE.BufferGeometry(); const pos: number[] = [], uv: number[] = [], idx: number[] = [];
    const nu = 40, nv = 34;
    for (let v = 0; v <= nv; v++) for (let u = 0; u <= nu; u++) {
      const p = tentPoint(side, u / nu, v / nv); pos.push(p.x, p.y, p.z); uv.push(u / nu * 2, v / nv * 3);
      if (u < nu && v < nv) { const a = v * (nu + 1) + u; idx.push(a, a + 1, a + nu + 1, a + 1, a + nu + 2, a + nu + 1); }
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geometry.setIndex(idx); geometry.computeVertexNormals();
    const panel = new THREE.Mesh(geometry, canvasMat); panel.castShadow = true; panel.receiveShadow = true; tent.add(panel);
    for (const t of [0, .5, 1]) tent.add(tube(Array.from({ length: 25 }, (_, n) => tentPoint(side, n / 24, t).add(V(0, .008, .004))), .012, canvasDark, 32));
    tent.add(tube(Array.from({ length: 30 }, (_, n) => tentPoint(side, 1, n / 29)), .024, canvasDark, 36));
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
      const z = frontZ + Math.sin(u * Math.PI * 1.6) * .1 * Math.sin(h * Math.PI) + side * .018;
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
  const innerGlow = new THREE.PointLight('#ffad5e', 2.6, 4.2, 2); innerGlow.position.set(.45, .55, -.75); tent.add(innerGlow);
  for (const side of [-1, 1]) for (const z of [frontZ, backZ]) {
    const peg = V(side * 2.07, .005, z + (z > 0 ? .58 : -.3));
    const anchor = V(side * halfWidth, .09, z);
    tent.add(tube([anchor, V((anchor.x + peg.x) * .5, .045, (anchor.z + peg.z) * .5), peg], .008, ropeMat, 10));
    tent.add(beam(peg.clone().add(V(0, -.10, 0)), peg.clone().add(V(.018, .09, -.035)), .016, darkMetal));
  }
  const guyEnd = V(0, .06, frontZ + 1.04);
  tent.add(tube([V(0, ridgeHeight, frontZ), V(.01, 1.02, frontZ + .54), guyEnd], .007, ropeMat));
  tent.add(beam(guyEnd.clone().add(V(0, -.1, 0)), guyEnd.clone().add(V(.018, .1, -.025)), .016, darkMetal));

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
      scene.environmentIntensity = 1.0;
    },
    createVolume() {
      const volume = createNightVolume({
        noise, moonDirection: afterglow.clone().setY(.15).normalize(), moon: new THREE.Color(.05, .04, .06), ambient: new THREE.Color(.014, .014, .024),
        fogDensity: .0016, fogHeight: 10, fogBase: 0, maxDistance: 300,
        mist: { y: 0, thickness: .6, density: .006, start: 22, tint: new THREE.Color(.9, .88, 1.0) },
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
