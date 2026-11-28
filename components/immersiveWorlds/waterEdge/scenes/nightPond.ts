import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldScene } from '../contracts';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { fbm3, noise3, seeded } from '../../shared/render/noise';
import { createRockMaterial } from '../../shared/render/rockSurface';
import { VOLUME_PRELUDE, type VolumeEffect } from '../../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';
import { applyFoliage, crownGeometry, leafAtlas, type Crown } from '../render/foliage';
import { barkMaterial, growTree, limbGeometry } from '../render/trees';
import { boulderGeometry, pebbleGeometry } from '../render/stones';
import { radianceProbe, reflectiveSurface } from '../render/surfaces';
import { PondLife, RING_SLOTS, TAP_SLOTS, WATER_FRAGMENT, WATER_VERTEX, bakeGustTexture, bakePondMap, bakeRippleTexture, createDrift, trainField } from './nightPondWater';

/*
 * Original procedural scene: a summer pond at night, seen from a seat at the
 * water's edge. Metres; y = 0 is the still water surface. A low moon in front
 * of the viewer is the only strong light: it backlights the reeds and tree
 * line, lays a glittering path across the water and lights a thin mist that
 * lies on the pond. Everything else is a dim, cool sky ambient.
 */

const MOON = new THREE.Vector3(0.105, 0.17, -1).normalize();
const MOON_LIGHT = new THREE.Color(0.62, 0.74, 1.0);
const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const leftEdge = (z: number) => -(3.9 + Math.max(0, -z) * .16 + Math.sin(z * .29) * 1.05);
const rightEdge = (z: number) => 5.6 + Math.max(0, -z) * .1 + Math.sin(z * .23 + 1.5) * 1.35;
const rearEdge = (x: number) => -21.5 - Math.cos(x * .18) * 3.8;
/** Approximate signed distance to the shoreline, positive on land. */
function shoreDistance(x: number, z: number) {
  const side = Math.max(leftEdge(z) - x, x - rightEdge(z));
  const rear = rearEdge(x) - z;
  const k = 1.2, h = Math.max(k - Math.abs(side - rear), 0) / k;
  return Math.max(side, rear) + h * h * k * .25 + fbm3(x * .21, 3.7, z * .21, 3) * .55;
}
function groundHeight(x: number, z: number) {
  const d = shoreDistance(x, z);
  const lip = -.1 + .16 * smooth(-.5, .5, d);
  if (d < 0) return lip + Math.max(d * .1, -.85) + noise3(x * .7, 1.3, z * .7) * .03;
  const bank = (1 - Math.exp(-d * .42)) * .62 + fbm3(x * .32, 8.1, z * .32, 3) * .32 * smooth(0, 2.5, d) + Math.max(0, noise3(x * .9, 2.2, z * .9)) * .12 * smooth(.5, 2, d) + Math.max(0, -z - 26) * .12 + smooth(-26, -40, z) * fbm3(x * .12, 4.4, z * .12, 2) * 1.2;
  return lip + bank;
}

const SKY_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform vec3 uMoon;
uniform float uTime;
varying vec3 vSkyWorld;
vec3 skyBase(vec3 d) {
  float h = max(d.y, 0.0);
  vec3 zenith = vec3(0.0035, 0.0068, 0.016);
  vec3 horizon = vec3(0.020, 0.034, 0.048);
  vec3 c = mix(horizon, zenith, pow(h, 0.45));
  float m = max(dot(d, uMoon), 0.0);
  // Aureole: forward scattering of moonlight in the summer haze.
  c += vec3(0.30, 0.36, 0.42) * (pow(m, 900.0) * 1.0 + pow(m, 120.0) * 0.05 + pow(m, 12.0) * 0.006);
  return c;
}
void main() {
  vec3 d = normalize(vSkyWorld - cameraPosition);
  vec3 c = skyBase(d);
  float h = max(d.y, 0.0);
  // Moon disc with maria and limb darkening.
  vec3 side = normalize(cross(uMoon, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(side, uMoon);
  vec2 q = vec2(dot(d, side), dot(d, up)) / 0.0125;
  float r = length(q);
  if (dot(d, uMoon) > 0.0 && r < 1.08) {
    float maria = smoothstep(-0.1, 0.45, bwFbm3(vec3(q * 1.6, 2.3))) * 0.42 + smoothstep(0.2, 0.7, bwNoise(vec3(q * 5.0, 7.1))) * 0.12;
    float limb = sqrt(max(1.0 - r * r, 0.0));
    vec3 disc = vec3(1.0, 0.97, 0.9) * 16.0 * (1.0 - maria) * (0.55 + 0.45 * limb);
    c = mix(c, disc, 1.0 - smoothstep(0.96, 1.04, r));
  }
  // Stars: sparse hashed points, fewer toward the hazy horizon and the moon.
  vec3 sp = d * 260.0;
  vec3 cell = floor(sp);
  vec3 hsh = bwHash3(cell);
  if (hsh.x > 0.9935) {
    vec3 centre = cell + 0.25 + hsh.yzx * 0.5;
    float dist = length(sp - centre);
    float mag = pow(hsh.y, 6.0) * 2.4 + 0.12;
    float twinkle = 0.82 + 0.18 * sin(uTime * (0.35 + hsh.z * 0.6) + hsh.x * 90.0);
    vec3 tint = mix(vec3(0.75, 0.85, 1.0), vec3(1.0, 0.88, 0.72), hsh.z);
    c += tint * mag * twinkle * exp(-dist * dist * 9.0) * smoothstep(0.03, 0.3, h) * (1.0 - smoothstep(0.985, 0.999, dot(d, uMoon)));
  }
  // A faint band of the summer Milky Way.
  vec3 band = normalize(vec3(-0.55, 0.45, -0.7));
  float galaxyX = dot(d, band) * 3.4;
  float galaxy = exp(-galaxyX * galaxyX) * smoothstep(0.05, 0.4, h);
  c += vec3(0.010, 0.012, 0.016) * galaxy * (0.5 + 0.7 * bwFbm3(d * 9.0));
  // Thin moonlit cloud wisps above the far tree line.
  vec2 cp = d.xz / (h + 0.07) * 0.9 + vec2(uTime * 0.0016, uTime * 0.0004);
  float cloud = smoothstep(0.05, 0.6, bwFbm3(vec3(cp * 0.8, 1.7)) + 0.12) * smoothstep(0.015, 0.1, h) * (1.0 - smoothstep(0.25, 0.6, h));
  float lining = pow(max(dot(d, uMoon), 0.0), 14.0);
  vec3 cloudColor = vec3(0.012, 0.017, 0.024) + vec3(0.5, 0.56, 0.62) * lining * 0.4;
  c = mix(c, cloudColor, cloud * 0.72);
  if (d.y < 0.0) c = vec3(0.004, 0.006, 0.008);
  gl_FragColor = vec4(c, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const VOLUME_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
${GLSL_NOISE}
uniform vec3 uMoon;
uniform vec3 uMoonColor;
uniform vec3 uAmbient;
uniform float uMist;
uniform float uHaze;
float mistAt(vec3 p) {
  float h = max(p.y, 0.0);
  float layer = exp(-h * 2.4);
  float patches = smoothstep(0.3, 0.78, bwValue(vec3(p.x * 0.21 + uTime * 0.035, p.y * 0.7, p.z * 0.17 + uTime * 0.012)));
  float wisps = 0.65 + 0.35 * bwValue(p * 0.9 + vec3(uTime * 0.05, 0.0, 0.0));
  float far = smoothstep(-2.0, -16.0, p.z);
  // The mist lies on the open water, not over the wooded banks.
  float overWater = smoothstep(8.5, 4.5, abs(p.x - 0.8 + 0.04 * p.z)) * smoothstep(-31.0, -22.0, p.z);
  return uMist * layer * (0.2 + 0.8 * patches) * wisps * (0.35 + 0.65 * far) * overWater + uHaze * exp(-h * 0.18);
}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, 85.0);
  float jitter = bwIgn(gl_FragCoord.xy);
  float cosTheta = dot(rd, uMoon);
  float phase = (bwPhase(cosTheta, 0.72) * 0.7 + bwPhase(cosTheta, 0.0) * 0.3) * 12.5663706;
  const int STEPS = 30;
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  float previous = 0.0;
  for (int i = 0; i < STEPS; i++) {
    float t = maxT * pow((float(i) + jitter) / float(STEPS), 1.7);
    float dt = t - previous; previous = t;
    vec3 p = ro + rd * t;
    float density = mistAt(p);
    vec3 radiance = uMoonColor * phase + uAmbient;
    float stepT = exp(-density * dt);
    scatter += transmittance * radiance * (1.0 - stepT);
    transmittance *= stepT;
  }
  gl_FragColor = vec4(scatter, transmittance);
}
`;

export function createNightPond(renderer: THREE.WebGLRenderer): WorldScene {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0.004, 0.006, 0.009);
  const camera = new THREE.PerspectiveCamera(51, 1, 0.08, 150);
  camera.position.set(0, 0.97, 4.8);
  camera.lookAt(0, -.6, -7);
  // Each section draws from its own stream, so tuning one never reshuffles another.
  let stream = seeded(173921);
  const random = () => stream();
  const section = (seed: number) => { stream = seeded(seed); };
  const between = (a: number, b: number) => a + (b - a) * random();
  const time = { value: 0 };

  // --- Light: the moon is the key; the sky is a dim cool ambient. -------------
  const moonRadiance = MOON_LIGHT.clone().multiplyScalar(1.0);
  const moon = new THREE.DirectionalLight(MOON_LIGHT, 1.55);
  moon.position.copy(MOON).multiplyScalar(30).add(new THREE.Vector3(0, 0, -4));
  moon.target.position.set(0, 0, -4);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  Object.assign(moon.shadow.camera, { left: -14, right: 14, top: 9, bottom: -6, near: 1, far: 70 });
  moon.shadow.bias = -.0004; moon.shadow.normalBias = .03; moon.shadow.radius = 2.5;
  scene.add(moon, moon.target);
  scene.add(new THREE.HemisphereLight('#3d5877', '#0b0f0c', .42));
  // Moonlit water throws a faint cool bounce onto the camera-facing near shore.
  const waterBounce = new THREE.PointLight('#6f8fb8', 1.3, 10, 2);
  waterBounce.position.set(0, .45, 1.6);
  scene.add(waterBounce);

  // --- Sky. ------------------------------------------------------------------
  const skyMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, uniforms: { uMoon: { value: MOON }, uTime: time },
    vertexShader: 'varying vec3 vSkyWorld;void main(){vec4 w=modelMatrix*vec4(position,1.);vSkyWorld=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader: SKY_FRAGMENT,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(110, 64, 32), skyMaterial);
  sky.name = 'night-pond-sky'; sky.renderOrder = -5; sky.frustumCulled = false;
  scene.add(sky);

  // --- Radiance probe: moonlit sky over a dark ring of trees. -----------------
  const environment = radianceProbe(renderer, probe => {
    const probeSky = skyMaterial.clone();
    probeSky.uniforms.uTime = { value: 0 };
    probe.add(new THREE.Mesh(new THREE.SphereGeometry(30, 48, 24), probeSky));
    const treeLine = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 7, 48, 1, true), new THREE.MeshBasicMaterial({ color: new THREE.Color(.003, .005, .005), side: THREE.BackSide }));
    treeLine.position.y = 1; probe.add(treeLine);
    const pond = new THREE.Mesh(new THREE.CircleGeometry(24, 48), new THREE.MeshBasicMaterial({ color: new THREE.Color(.008, .012, .016) }));
    pond.rotation.x = -Math.PI / 2; pond.position.y = -1.5; probe.add(pond);
  });
  scene.environment = environment.texture;
  scene.environmentIntensity = 1;

  // --- Ground: one continuous terrain for banks, shoreline and pond bed. ------
  const groundGeometry = new THREE.PlaneGeometry(64, 1, 256, 190);
  groundGeometry.rotateX(-Math.PI / 2);
  {
    const gp = groundGeometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < gp.count; i++) {
      const x = gp.getX(i), v = .5 - gp.getZ(i); // 0 near the viewer .. 1 far, upward winding kept
      const z = 9 - 62 * Math.pow(v, 1.45);
      gp.setXYZ(i, x, groundHeight(x, z), z);
    }
    groundGeometry.computeVertexNormals();
  }
  const groundMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .95, metalness: 0 });
  groundMaterial.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vGround;\nvarying vec3 vGroundNormal;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvGround = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvGroundNormal = normalize(mat3(modelMatrix) * objectNormal);');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vGround;
varying vec3 vGroundNormal;
${GLSL_NOISE}
float groundRelief(vec3 p) { return bwFbm3(p * 3.1) * 0.02 + bwNoise(p * 17.0) * 0.004; }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 gp = vGround;
float macro = bwFbm3(gp * 0.35 + 4.0);
float mid = bwNoise(gp * 1.7);
float fine = bwNoise(gp * 9.0);
vec3 mud = vec3(0.045, 0.038, 0.03) * (0.8 + 0.3 * mid);
vec3 grass = mix(vec3(0.030, 0.052, 0.024), vec3(0.052, 0.068, 0.030), smoothstep(-0.4, 0.5, macro)) * (0.75 + 0.35 * fine);
vec3 litter = vec3(0.07, 0.055, 0.038) * (0.8 + 0.4 * fine);
float above = gp.y;
float flatness = smoothstep(0.55, 0.9, vGroundNormal.y);
float grassy = smoothstep(0.05, 0.3, above + 0.1 * mid) * flatness * smoothstep(-0.3, 0.2, macro + 0.3);
vec3 groundColor = mix(mud, grass, grassy);
groundColor = mix(groundColor, litter, smoothstep(0.35, 0.7, bwFbm3(gp * 0.9 + 11.0)) * smoothstep(0.1, 0.5, above) * 0.6);
// Silt and drowned leaves on the bed.
vec3 silt = mix(vec3(0.05, 0.055, 0.038), vec3(0.075, 0.06, 0.035), smoothstep(0.2, 0.6, fine)) * (0.7 + 0.4 * mid);
groundColor = mix(groundColor, silt, 1.0 - smoothstep(-0.12, 0.0, above));
float wet = 1.0 - smoothstep(0.0, 0.16, above + 0.04 * mid);
groundColor *= mix(1.0, 0.6, wet);
diffuseColor.rgb = groundColor;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(0.93, 0.3, wet * smoothstep(-0.03, 0.01, above));
roughnessFactor = mix(roughnessFactor, 0.98, grassy);`)
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
{
  // Under the surface: dim, green-shifted light and no specular glare.
  float below = clamp(-above / 0.5, 0.0, 1.0);
  vec3 absorb = mix(vec3(1.0), vec3(0.18, 0.4, 0.36), below);
  reflectedLight.directDiffuse *= absorb; reflectedLight.indirectDiffuse *= absorb;
  float dry = smoothstep(-0.03, 0.0, above);
  reflectedLight.directSpecular *= dry; reflectedLight.indirectSpecular *= dry;
}`)
      .replace('#include <lights_physical_fragment>', `#include <lights_physical_fragment>
// Grass and loose litter scatter light: no glossy sheen at grazing moonlight.
material.specularF90 = mix(1.0, 0.18, max(grassy, 1.0 - wet));
material.specularColor *= mix(1.0, 0.5, grassy);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  const float e = 0.015;
  float h0 = groundRelief(gp);
  vec3 grad = vec3(groundRelief(gp + vec3(e, 0, 0)) - h0, 0.0, groundRelief(gp + vec3(0, 0, e)) - h0) / e;
  // Fade relief finer than a pixel: it would only alias into sparkle.
  grad *= 1.0 - smoothstep(0.02, 0.09, length(fwidth(gp)));
  vec3 viewGrad = (viewMatrix * vec4(grad, 0.0)).xyz;
  normal = normalize(normal - (viewGrad - dot(viewGrad, normal) * normal));
}`);
  };
  groundMaterial.customProgramCacheKey = () => 'night-pond-ground-v2';
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.name = 'night-pond-banks-and-bed'; ground.receiveShadow = true;
  scene.add(ground);

  // --- Water: planar mirror, wind ripples, rings, moon glitter (nightPondWater). -
  const mistMoon = new THREE.Vector3(MOON_LIGHT.r, MOON_LIGHT.g, MOON_LIGHT.b).multiplyScalar(.05), mistAmbient = new THREE.Vector3(.005, .008, .012), mist = .05;
  const surface = reflectiveSurface(renderer, new THREE.PlaneGeometry(80, 92), {
    name: 'NightPondWater',
    uniforms: {
      color: { value: new THREE.Color(0x7f7f7f) }, tDiffuse: { value: null }, textureMatrix: { value: new THREE.Matrix4() },
      uTime: { value: 0 }, uMoon: { value: MOON.clone() },
      uRings: { value: Array.from({ length: RING_SLOTS }, () => new THREE.Vector4(0, 0, -100, 0)) },
      uRingShape: { value: Array.from({ length: RING_SLOTS }, () => new THREE.Vector4(1, 0, 0, 0)) },
      uMoonRadiance: { value: new THREE.Vector3(1, 1, 1) }, uDeep: { value: new THREE.Color(.0022, .0042, .0046) },
      uRipple: { value: null }, uGust: { value: null }, uPondMap: { value: null }, uRippleDecode: { value: 1 },
      uMistMoon: { value: mistMoon }, uMistAmbient: { value: mistAmbient }, uMist: { value: mist },
    },
    vertexShader: WATER_VERTEX, fragmentShader: WATER_FRAGMENT,
  }, { label: 'night-pond-reflection', scale: .5 });
  const water = surface.mesh;
  // Reflector clones its uniforms: everything below writes into the material's own copies.
  const waterUniforms = surface.material.uniforms;
  waterUniforms.uMoonRadiance.value.set(MOON_LIGHT.r, MOON_LIGHT.g, MOON_LIGHT.b).multiplyScalar(16);
  {
    const ripple = bakeRippleTexture(4127);
    ripple.texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    waterUniforms.uRipple.value = ripple.texture; waterUniforms.uRippleDecode.value = ripple.decode;
    waterUniforms.uGust.value = bakeGustTexture(6271);
  }
  surface.material.transparent = true;
  surface.material.depthWrite = true;
  water.name = 'night-pond-water';
  water.rotation.x = -Math.PI / 2; water.position.set(0, 0, -16); water.renderOrder = 2;
  scene.add(water);

  section(11);
  // --- Stones: half-drowned boulders and a pebbled margin. --------------------
  const rockMaterial = createRockMaterial('#6e746c', {
    key: 'night-pond-boulder', scale: 1.4, bump: 1.5, waterY: 0, wetBand: .22, wetness: .1, drips: .08,
    dryRoughness: .92, wetRoughness: .16, algae: '#28361f', algaeAmount: .55, cavity: .6, strata: .15,
    stain: '#4a4a3a', stainAmount: .25, moss: { color: '#3c4f22', amount: .7 },
  });
  {
    // Dry, lichen-dusted crowns scatter the low moonlight rather than mirroring it.
    const chained = rockMaterial.onBeforeCompile;
    rockMaterial.onBeforeCompile = (shader, live) => {
      chained.call(rockMaterial, shader, live);
      shader.fragmentShader = shader.fragmentShader.replace('#include <lights_physical_fragment>', `#include <lights_physical_fragment>
material.specularF90 = mix(0.35, 1.0, rockWet);`);
    };
  }
  const rocks: THREE.Mesh[] = [];
  const rockSpecs: Array<[number, number, number, number, number, number]> = [
    [-.61, -.05, 3.61, .5, .26, .56], [-1.72, -.02, 3.3, 1.06, .36, .74], [1.83, -.03, 3.95, .92, .38, .76],
    [-2.66, .0, 2.7, .84, .33, .6], [2.72, .0, 2.4, .88, .36, .6], [-3.6, .02, .0, .96, .32, .76],
  ];
  rockSpecs.forEach(([x, y, z, sx, sy, sz], i) => {
    const mesh = new THREE.Mesh(boulderGeometry(31 + i * 7, i < 3 ? 16 : 10, { facets: 8, rounding: .45, relief: 1.5, base: .2 }), rockMaterial);
    mesh.position.set(x, y, z); mesh.scale.set(sx, sy, sz); mesh.rotation.y = between(0, 6);
    mesh.castShadow = true; mesh.receiveShadow = true; mesh.name = `night-pond-boulder-${i}`;
    scene.add(mesh); rocks.push(mesh);
  });
  const pebbleMaterial = createRockMaterial('#5d625a', {
    key: 'night-pond-pebble', scale: 2.2, bump: .7, waterY: 0, wetBand: .12, wetness: .25, drips: 0,
    dryRoughness: .7, wetRoughness: .14, algae: '#26331d', algaeAmount: .4, cavity: .35, strata: 0, stainAmount: .15,
  });
  const pebbleShapes = [pebbleGeometry(3, 3, .4), pebbleGeometry(8, 3, .25), pebbleGeometry(13, 3, .55)];
  const dummy = new THREE.Object3D();
  pebbleShapes.forEach((shape, v) => {
    const placements: THREE.Matrix4[] = [];
    for (let attempt = 0; attempt < 2600 && placements.length < 110; attempt++) {
      const z = between(-24, 5), x = between(-14, 16);
      const d = shoreDistance(x, z);
      if (d < -.6 || d > 1.2 || (Math.abs(x) < 2.2 && z > 1)) continue;
      const s = between(.05, .22) * (z < -8 ? 1.4 : 1);
      dummy.position.set(x, groundHeight(x, z) + s * .25, z);
      dummy.rotation.set(between(-.2, .2), between(0, 6.3), between(-.2, .2));
      dummy.scale.set(s * between(1, 1.5), s * between(.45, .7), s * between(.8, 1.2));
      dummy.updateMatrix(); placements.push(dummy.matrix.clone());
    }
    const mesh = new THREE.InstancedMesh(shape, pebbleMaterial, placements.length);
    placements.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.receiveShadow = true; mesh.castShadow = v === 0; mesh.name = `night-pond-margin-stones-${v}`;
    scene.add(mesh);
  });

  section(23);
  // --- Lily pads: notched, curled rims, radial veins and a waxy cuticle. ------
  const lilyMaterial = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: .5, metalness: 0, side: THREE.DoubleSide, envMapIntensity: .5, specularIntensity: .32 });
  lilyMaterial.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vLily;\nvarying vec3 vLilyWorld;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvLily = uv * 2.0 - 1.0;\nvLilyWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec2 vLily;
varying vec3 vLilyWorld;
${GLSL_NOISE}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float lr = length(vLily);
float la = atan(vLily.y, vLily.x);
float vein = pow(abs(cos(la * 11.0 + sin(lr * 9.0) * 0.15)), 60.0) * smoothstep(0.08, 0.3, lr) * (1.0 - smoothstep(0.8, 0.98, lr));
float blotch = bwFbm3(vec3(vLily * 3.0, vLilyWorld.x * 0.7 + vLilyWorld.z * 0.3));
vec3 leaf = mix(vec3(0.034, 0.075, 0.024), vec3(0.07, 0.11, 0.032), smoothstep(-0.3, 0.4, blotch));
leaf = mix(leaf, vec3(0.06, 0.03, 0.018), smoothstep(0.82, 1.0, lr) * 0.7 + smoothstep(0.35, 0.7, blotch) * 0.25);
leaf += vec3(0.012, 0.02, 0.008) * vein;
diffuseColor.rgb = leaf;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = 0.5 + 0.1 * vein + 0.1 * blotch;`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  // Puckered blade between the veins breaks the moon's sheen into facets.
  vec2 g = vec2(bwNoise(vec3(vLily * 5.0, 1.3)), bwNoise(vec3(vLily * 5.0, 4.7))) * 0.11 + vec2(cos(la), sin(la)) * vein * 0.1;
  vec3 viewGrad = (viewMatrix * vec4(g.x, 0.0, g.y, 0.0)).xyz;
  normal = normalize(normal - (viewGrad - dot(viewGrad, normal) * normal));
}`);
  };
  lilyMaterial.customProgramCacheKey = () => 'night-pond-lily-v2';
  function lilyGeometry(radius: number, offset: number) {
    const verts: number[] = [], uv: number[] = [], idx: number[] = [];
    const n = 72, rings = 9, start = .06, end = Math.PI * 2 - .07;
    verts.push(0, 0, 0); uv.push(.5, .5);
    for (let j = 1; j <= rings; j++) for (let i = 0; i <= n; i++) {
      const a = start + (end - start) * i / n, rr = j / rings;
      const r = radius * rr * (1 + Math.sin(a * 5 + offset) * .05 + Math.sin(a * 13 + offset) * .02);
      verts.push(Math.cos(a) * r, .006 + rr * rr * .012 + Math.sin(a * 4 + offset) * .01 * rr + Math.pow(rr, 9) * .03, Math.sin(a) * r);
      uv.push(Math.cos(a) * rr * .5 + .5, Math.sin(a) * rr * .5 + .5);
    }
    for (let i = 0; i < n; i++) idx.push(0, 1 + i + 1, 1 + i);
    for (let j = 0; j < rings - 1; j++) for (let i = 0; i < n; i++) { const a = 1 + j * (n + 1) + i, b = a + n + 1; idx.push(a, b + 1, b, a, a + 1, b + 1); }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals(); return g;
  }
  const lilies: { mesh: THREE.Mesh; phase: number; radius: number; offset: number }[] = [];
  const padLocations = [[-.28, 2.93, .32], [.63, 2.70, .34], [1.64, 1.33, .51], [-2.02, 1.08, .45], [-.22, .67, .33], [2.27, -.08, .37], [-2.9, -.4, .37], [1.26, -.73, .26], [-3.15, -2, .32], [2.71, -2.1, .31], [-1.73, -3.2, .23]];
  for (let i = 0; i < 34; i++) if (i >= padLocations.length) {
    // Pads gather in loose colonies near the banks instead of an even scatter.
    const z = between(-16, -3), sideX = random() > .5 ? rightEdge(z) - between(.6, 3) : leftEdge(z) + between(.6, 3.2);
    padLocations.push([sideX, z, between(.16, .32)]);
  }
  padLocations.forEach((p, i) => {
    const mesh = new THREE.Mesh(lilyGeometry(p[2], i), lilyMaterial);
    // Yaw first, then tilts about world axes, so a pad leans with the local slope.
    mesh.rotation.order = 'XZY';
    mesh.position.set(p[0], .006, p[1]); mesh.rotation.y = between(-3, 3);
    mesh.receiveShadow = true; mesh.name = `night-pond-lily-${i}`;
    scene.add(mesh); lilies.push({ mesh, phase: random() * 6, radius: p[2], offset: i });
  });

  // --- Pond map, pond life and drifting specks. ---------------------------------
  const pondMap = bakePondMap({ shoreDistance, rocks, pads: lilies });
  waterUniforms.uPondMap.value = pondMap.texture;
  const life = new PondLife(waterUniforms.uRings.value, waterUniforms.uRingShape.value, camera,
    (x, z) => pondMap.shore(x, z) < -.35 && pondMap.clearance(x, z) > .12);
  const padCalm = lilies.map(({ mesh }) => Math.sqrt(pondMap.open(mesh.position.x, mesh.position.z)));
  const drift = createDrift(pondMap, life, camera, 9043);
  scene.add(drift.mesh);

  section(37);
  // --- Plants: reeds, sedges, grass and cattails share one swaying material. --
  const plantGeometries: THREE.BufferGeometry[] = [];
  const plantColor = new THREE.Color();
  function blade(x: number, z: number, h: number, width: number, a: number, lean: number, hsl: [number, number, number], rows = 7) {
    const p: number[] = [], c: number[] = [], o: number[] = [], w: number[] = [], idx: number[] = [];
    const y0 = groundHeight(x, z) - .02;
    plantColor.setHSL(hsl[0] + between(-.02, .02), hsl[1] + between(-.05, .05), hsl[2] + between(-.04, .04));
    for (let j = 0; j <= rows; j++) {
      const t = j / rows, curve = t * t * lean;
      const cx = x + Math.cos(a) * curve, cz = z + Math.sin(a) * curve;
      const bw = width * Math.sin(Math.PI * Math.min(.98, t * .5 + .5)) * (1 - t * .9);
      for (let k = -1; k <= 1; k++) {
        p.push(cx - Math.sin(a) * bw * k, y0 + h * t * (1 - curve * .08) + (k === 0 ? bw * .25 : 0), cz + Math.cos(a) * bw * k);
        const shade = (k === 0 ? 1.1 : .9) * (.55 + .45 * t);
        c.push(plantColor.r * shade, plantColor.g * shade, plantColor.b * shade);
        o.push(.45 + .55 * t); w.push(t * t);
      }
      if (j < rows) { const b = j * 3; idx.push(b, b + 3, b + 4, b, b + 4, b + 1, b + 1, b + 4, b + 5, b + 1, b + 5, b + 2); }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(c, 3));
    g.setAttribute('aOcc', new THREE.Float32BufferAttribute(o, 1)); g.setAttribute('aWind', new THREE.Float32BufferAttribute(w, 1));
    g.setIndex(idx); g.computeVertexNormals(); plantGeometries.push(g);
  }
  function cattail(x: number, z: number, h: number) {
    const y0 = groundHeight(x, z) - .05, lean = new THREE.Vector3(between(-.08, .08), 0, between(-.08, .08));
    const top = new THREE.Vector3(x, y0 + h, z).add(lean);
    const stem = limbGeometry([new THREE.Vector3(x, y0, z), new THREE.Vector3(x, y0 + h * .5, z).addScaledVector(lean, .3), top], .007, .35, 4, x * 13);
    const head = limbGeometry([top.clone().setY(top.y - h * .16), top], .024, .1, 7, z * 7);
    const spike = limbGeometry([top, top.clone().setY(top.y + h * .07)], .004, .8, 3, x);
    for (const [g, tone] of [[stem, [.05, .07, .035]], [head, [.07, .04, .022]], [spike, [.05, .045, .03]]] as const) {
      const count = g.attributes.position.count;
      const c = new Float32Array(count * 3), o = new Float32Array(count), w = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const t = THREE.MathUtils.clamp((g.attributes.position.getY(i) - y0) / h, 0, 1.2);
        c.set(tone, i * 3); o[i] = .5 + .5 * Math.min(t, 1); w[i] = t * t;
      }
      g.setAttribute('color', new THREE.BufferAttribute(c, 3)); g.setAttribute('aOcc', new THREE.BufferAttribute(o, 1)); g.setAttribute('aWind', new THREE.BufferAttribute(w, 1));
      plantGeometries.push(g);
    }
  }
  function reeds(cx: number, cz: number, count: number, range: number, near: boolean) {
    for (let i = 0; i < count; i++) {
      const x = cx + between(-range, range), z = cz + between(-range * .6, range * .6);
      const h = between(.4, near ? 1.35 : 1.0);
      blade(x, z, h, between(.03, .07), random() * Math.PI * 2, between(.12, .42), [.24, .32, .16]);
      if (i % 7 === 0) cattail(x + between(-.1, .1), z + between(-.1, .1), h * between(1.05, 1.3));
    }
  }
  reeds(-2.9, 2.2, 90, .65, true); reeds(3.8, 2, 80, .66, true);
  for (let i = 0; i < 26; i++) blade(between(-.69, -.48), between(3.3, 3.7), between(.3, .62), between(.02, .045), between(-.7, .4), between(.1, .3), [.22, .3, .15]);
  for (let i = 0; i < 12; i++) blade(between(1.05, 1.25), between(2.6, 3.1), between(.45, .9), between(.025, .05), between(2.4, 3.5), between(.1, .25), [.22, .3, .15]);
  reeds(-3.9, -1.9, 80, .8, false); reeds(4.9, -5.5, 75, 1.4, false);
  reeds(-6.3, -10.3, 110, 1.8, false); reeds(7.1, -13.7, 110, 2, false); reeds(-1.5, -19.5, 90, 3, false);
  // Low grass and sedge cover every bank so no bare rim shows against the water.
  for (let i = 0, placed = 0; i < 60000 && placed < 9000; i++) {
    const x = between(-20, 20), z = between(-27, 7);
    const d = shoreDistance(x, z);
    // Denser toward the water, in clumps rather than an even lawn.
    if (d < .02 || d > 7 || (Math.abs(x) < 1.5 && z > 3) || random() > Math.exp(-d * .25) * (.45 + .55 * smooth(-.2, .3, noise3(x * .8, 5.5, z * .8)))) continue;
    placed++;
    blade(x, z, between(.1, .34) * (d < 1.2 ? 1.5 : 1), between(.008, .02), random() * Math.PI * 2, between(.04, .16), [.22, .34, .13], 3);
  }
  const plantMaterial = applyFoliage(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .7, side: THREE.DoubleSide }), {
    key: 'night-pond-plants', time, lightDirection: MOON, lightColor: MOON_LIGHT.clone().multiplyScalar(2.2), translucency: 1, wind: .035, specular: .6,
  });
  const plants = new THREE.Mesh(mergeGeometries(plantGeometries), plantMaterial);
  plantGeometries.forEach(g => g.dispose());
  plants.name = 'night-pond-reeds-and-sedges'; plants.castShadow = true; plants.receiveShadow = true;
  scene.add(plants);

  section(41);
  // --- Water lily flowers: layered cupped petals, translucent toward the moon. -
  const petalGeometries: THREE.BufferGeometry[] = [];
  function flower(x: number, z: number, size: number) {
    for (let ring = 0; ring < 3; ring++) for (let i = 0; i < 10 - ring * 2; i++) {
      const a = i / (10 - ring * 2) * Math.PI * 2 + ring * .39;
      const p: number[] = [], c: number[] = [], o: number[] = [], w: number[] = [], ind: number[] = [];
      for (let j = 0; j <= 8; j++) for (let k = 0; k <= 4; k++) {
        const t = j / 8, wv = (k / 4 - .5) * Math.sin(Math.PI * Math.min(1, t * 1.15)) * size * (.62 - ring * .1);
        const out = t * size * (1 - ring * .2);
        const cup = Math.sin(t * Math.PI * .6) * size * (.32 + ring * .32) + Math.pow(Math.abs(k / 4 - .5) * 2, 2) * size * .05;
        p.push(x + Math.cos(a) * out - Math.sin(a) * wv, .02 + cup, z + Math.sin(a) * out + Math.cos(a) * wv);
        const blush = Math.pow(t, 3) * .45;
        c.push(.42, .39 - blush * .15, .385 - blush * .12); o.push(.6 + .4 * t); w.push(t * .3);
        if (j < 8 && k < 4) { const q = j * 5 + k; ind.push(q, q + 5, q + 6, q, q + 6, q + 1); }
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(c, 3));
      g.setAttribute('aOcc', new THREE.Float32BufferAttribute(o, 1)); g.setAttribute('aWind', new THREE.Float32BufferAttribute(w, 1));
      g.setIndex(ind); g.computeVertexNormals(); petalGeometries.push(g);
    }
    const core = limbGeometry([new THREE.Vector3(x, .02, z), new THREE.Vector3(x, .02 + size * .3, z)], size * .16, .3, 10, x);
    const n = core.attributes.position.count;
    core.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 3).map((_, i) => [.55, .38, .05][i % 3]), 3));
    core.setAttribute('aOcc', new THREE.BufferAttribute(new Float32Array(n).fill(.8), 1));
    core.setAttribute('aWind', new THREE.BufferAttribute(new Float32Array(n), 1));
    petalGeometries.push(core);
  }
  flower(-.27, 2.82, .105); flower(2.14, -1.3, .16); flower(-2.45, -2.1, .12);
  const flowers = new THREE.Mesh(mergeGeometries(petalGeometries), applyFoliage(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .55, side: THREE.DoubleSide }), {
    key: 'night-pond-lily-flower', time, lightDirection: MOON, lightColor: MOON_LIGHT.clone().multiplyScalar(1.3), translucency: .5, wind: .004,
  }));
  petalGeometries.forEach(g => g.dispose());
  flowers.name = 'night-pond-water-lilies'; flowers.castShadow = true;
  scene.add(flowers);

  section(53);
  // --- Trees: limbs with bark and sprig-card crowns, framing the moon. --------
  const limbs: THREE.BufferGeometry[] = [];
  const crowns: Crown[] = [];
  const treeTint = new THREE.Color(.11, .16, .085);
  for (let i = 0; i < 26; i++) {
    const side = i % 3 === 0 ? 1 : -1;
    const z = between(-34, -7);
    const x = side > 0 ? rightEdge(z) + between(1.4, 6) : leftEdge(z) - between(1.2, 6);
    const h = between(4, 8);
    growTree({ base: new THREE.Vector3(x, groundHeight(x, z), z), height: h, radius: between(.12, .22), branches: 5, crown: between(.9, 1.5), cardsPerCrown: 34, cardSize: [.7, 1.1], tint: treeTint, spread: .38 }, random, limbs, crowns);
  }
  for (let i = 0; i < 24; i++) {
    const x = between(-22, 22), z = rearEdge(x) - between(1.5, 9);
    // The moon sits low over the far bank: trees under it stay below its disc.
    const moonGap = smooth(6, 2, Math.abs(x - MOON.x / -MOON.z * (camera.position.z - z)));
    growTree({ base: new THREE.Vector3(x, groundHeight(x, z), z), height: between(2.8, 5.5) * (1 - .45 * moonGap), radius: between(.08, .15), branches: 4, crown: between(.9, 1.4), cardsPerCrown: 26, cardSize: [.8, 1.2], tint: treeTint, spread: .4 }, random, limbs, crowns);
  }
  // A second, deeper wood behind the far bank so no bare ground shows through.
  for (let i = 0; i < 30; i++) {
    const x = between(-30, 30), z = rearEdge(x) - between(9, 17);
    const moonGap = smooth(7, 2.5, Math.abs(x - MOON.x / -MOON.z * (camera.position.z - z)));
    growTree({ base: new THREE.Vector3(x, groundHeight(x, z), z), height: between(4.5, 7.5) * (1 - .5 * moonGap), radius: between(.1, .16), branches: 4, crown: between(1.3, 1.9), cardsPerCrown: 34, cardSize: [.9, 1.3], tint: treeTint, spread: .4 }, random, limbs, crowns);
  }
  // Low shrubs along the far bank close the gap between water and canopy.
  for (let i = 0; i < 46; i++) {
    const x = -24 + i * 1.05 + between(-.4, .4), z = rearEdge(x) - between(.4, 2.2);
    const r = between(.6, 1.2);
    crowns.push({ centre: new THREE.Vector3(x, groundHeight(x, z) + r * .5, z), radii: new THREE.Vector3(r * 1.3, r * .7, r), cards: 18, size: [.55, .9], tint: treeTint });
  }
  const bark = barkMaterial('#3c3a33', { key: 'night-pond-bark', lichen: '#59604f', moss: '#26361c', mossHeight: 1 });
  const branches = new THREE.Mesh(mergeGeometries(limbs), bark);
  limbs.forEach(g => g.dispose());
  branches.name = 'night-pond-tree-limbs'; branches.castShadow = true; branches.receiveShadow = true;
  scene.add(branches);
  const atlas = leafAtlas({ seed: 77, variants: 2, hsl: [.25, .38, .36], jitter: [.04, .12, .1], twigColor: '#3a3226' });
  const foliageMaterial = applyFoliage(new THREE.MeshStandardMaterial({ map: atlas, vertexColors: true, alphaTest: .45, alphaToCoverage: true, side: THREE.DoubleSide, roughness: .78 }), {
    key: 'night-pond-crowns', time, lightDirection: MOON, lightColor: MOON_LIGHT.clone().multiplyScalar(2.6), translucency: 1.2, wind: .05, crownNormals: true, specular: .12,
  });
  const foliage = new THREE.Mesh(crownGeometry(crowns, 4401, 2), foliageMaterial);
  foliage.name = 'night-pond-leaf-crowns'; foliage.castShadow = true; foliage.receiveShadow = true;
  foliage.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: atlas, alphaTest: .45, side: THREE.DoubleSide });
  scene.add(foliage);

  section(67);
  // --- Fireflies: slow, unsynchronised breathing glows. -----------------------
  const flyPositions: number[] = [], flyPhases: number[] = [];
  for (let i = 0; i < 46; i++) {
    const side = i % 2 ? 1 : -1, z = between(-19, -2.5);
    const x = side > 0 ? rightEdge(z) + between(-1.8, 1.5) : leftEdge(z) + between(-1.5, 1.8);
    flyPositions.push(x, between(.35, 1.7), z); flyPhases.push(random() * 6.28);
  }
  const flyGeometry = new THREE.BufferGeometry();
  flyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(flyPositions, 3));
  flyGeometry.setAttribute('phase', new THREE.Float32BufferAttribute(flyPhases, 1));
  const flyUniforms = { uTime: time, uPixelRatio: { value: Math.min(2, renderer.getPixelRatio()) } };
  const fireflies = new THREE.Points(flyGeometry, new THREE.ShaderMaterial({
    uniforms: flyUniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `attribute float phase;uniform float uTime;uniform float uPixelRatio;varying float vGlow;
      void main(){vec3 p=position;p.x+=sin(uTime*.13+phase)*.22+sin(uTime*.31+phase*3.)*.05;p.y+=sin(uTime*.19+phase*1.7)*.09;p.z+=cos(uTime*.11+phase*2.3)*.18;
        vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(30./(-mv.z),1.5,4.)*uPixelRatio;
        float period=.33+fract(phase*.73)*.25;vGlow=.12+.88*pow(clamp(.5+.5*sin(uTime*period+phase*5.),0.,1.),4.);}`,
    fragmentShader: `varying float vGlow;void main(){float d=length(gl_PointCoord-.5)*2.;float core=exp(-d*d*5.);
      gl_FragColor=vec4(vec3(1.1,1.5,.35)*7.*vGlow*core,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
  }));
  fireflies.name = 'night-pond-fireflies'; fireflies.frustumCulled = false;
  scene.add(fireflies);

  section(71);
  // --- Small fish: dark shapes gliding just under the surface. ----------------
  const fish: { mesh: THREE.Mesh; base: THREE.Vector3; phase: number }[] = [];
  const fishMaterial = new THREE.MeshStandardMaterial({ color: '#0d1513', roughness: .5 });
  const fishShape = new THREE.Shape();
  fishShape.moveTo(-.19, 0); fishShape.quadraticCurveTo(-.04, .062, .13, 0); fishShape.quadraticCurveTo(-.04, -.062, -.19, 0);
  fishShape.lineTo(-.25, -.046); fishShape.lineTo(-.25, .046); fishShape.closePath();
  const fishGeometry = new THREE.ShapeGeometry(fishShape, 9); fishGeometry.rotateX(-Math.PI / 2);
  for (let i = 0; i < 4; i++) {
    const mesh = new THREE.Mesh(fishGeometry, fishMaterial);
    const base = new THREE.Vector3(between(-1.8, 2), -.07, between(-1.5, 2.2));
    mesh.position.copy(base); scene.add(mesh); fish.push({ mesh, base, phase: random() * 6 });
  }

  const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
  const occluders: THREE.Object3D[] = [water, ...rocks, ...lilies.map(l => l.mesh), flowers];
  let rippleSlot = 0, lastTap = -100;
  const field = { h: 0, sx: 0, sz: 0 };
  return {
    scene, camera,
    post: {
      exposure: 2.9, bloomStrength: .12, bloomThreshold: 0, aoStrength: .7, aoRadius: .45,
      saturation: .92, contrast: 1.1, shadowTint: [.84, .95, 1.16], highlightTint: [1.06, 1.02, .93], vignette: .55, grain: .035,
    },
    createVolume(): VolumeEffect {
      const material = new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX, fragmentShader: VOLUME_FRAGMENT, depthTest: false, depthWrite: false, toneMapped: false,
        uniforms: {
          // Same medium as the water's reflected-path mist, so the two agree.
          uMoon: { value: MOON.clone() }, uMoonColor: { value: mistMoon.clone() },
          uAmbient: { value: mistAmbient.clone() }, uMist: { value: mist }, uHaze: { value: .0012 },
        },
      });
      return { material };
    },
    setPostActive(active) {
      // The direct fallback has no volume pass: keep a little distance haze.
      scene.fog = active ? null : new THREE.FogExp2('#0b141a', .02);
      renderer.toneMappingExposure = active ? 1 : 2.2;
    },
    setDrawingSize(width, height) { surface.setSize(width, height); flyUniforms.uPixelRatio.value = Math.min(2, renderer.getPixelRatio()); },
    resize(width, height) {
      const portrait = width / height < .85;
      camera.aspect = width / height; camera.fov = portrait ? 61 : 51;
      camera.position.set(0, portrait ? 1.02 : .97, 4.8);
      camera.lookAt(portrait ? .1 : 0, portrait ? -1.35 : -.6, portrait ? -5 : -7);
      camera.updateProjectionMatrix();
    },
    update(t) {
      time.value = t; waterUniforms.uTime.value = t;
      life.update(t);
      // Pads ride the passing wave trains and rings, low-passed over their own size.
      lilies.forEach(({ mesh, phase, radius }, i) => {
        const x = mesh.position.x, z = mesh.position.z, calm = padCalm[i];
        trainField(x, z, t, radius, field);
        const ring = life.heightAt(x, z, t), ringX = life.heightAt(x + radius * .6, z, t) - life.heightAt(x - radius * .6, z, t), ringZ = life.heightAt(x, z + radius * .6, t) - life.heightAt(x, z - radius * .6, t);
        mesh.position.y = .006 + (field.h * calm + ring * .7) + Math.sin(t * .31 + phase) * .0012;
        mesh.rotation.x = -(field.sz * calm + ringZ / (radius * 1.2) * .7);
        mesh.rotation.z = field.sx * calm + ringX / (radius * 1.2) * .7;
      });
      drift.update(t);
      fish.forEach(({ mesh, base, phase }) => {
        mesh.position.x = base.x + Math.sin(t * .055 + phase) * .29; mesh.position.z = base.z + Math.cos(t * .055 + phase) * .16;
        mesh.rotation.y = Math.atan2(Math.cos(t * .055 + phase) * .29, -Math.sin(t * .055 + phase) * .16);
      });
    },
    interact(x, y, t) {
      if (t - lastTap < .65) return null;
      pointer.set(x, y); camera.updateMatrixWorld(); scene.updateMatrixWorld(true);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(occluders, false)[0];
      if (!hit || hit.object !== water || hit.distance > 24) return null;
      const p = hit.point;
      if (p.x < leftEdge(p.z) + .2 || p.x > rightEdge(p.z) - .2) return null;
      lastTap = t; life.tap(rippleSlot, p.x, p.z, t, .75); rippleSlot = (rippleSlot + 1) % TAP_SLOTS;
      return { world: 'night-pond', kind: 'ripple', strength: .32, position: { x: p.x, z: p.z } };
    },
    dispose() { surface.dispose(); environment.dispose(); atlas.dispose(); foliage.customDepthMaterial?.dispose(); },
  };
}
