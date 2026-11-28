import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldScene } from '../contracts';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { fbm3, noise3, seeded } from '../../shared/render/noise';
import { applyRockSurface } from '../../shared/render/rockSurface';
import { VOLUME_PRELUDE, type VolumeEffect } from '../../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';
import { applyFoliage, crownGeometry, leafAtlas, type Crown } from '../render/foliage';
import { barkMaterial, growTree, limbGeometry } from '../render/trees';
import { boulderGeometry, pebbleGeometry } from '../render/stones';
import { radianceProbe } from '../render/surfaces';

/*
 * Original procedural Korean woodland stream (계곡) on a summer morning. The
 * viewer sits on a low rock beside clear, shallow water. One key light: sun
 * through a broken canopy. The canopy is a procedural light cookie shared by
 * the sun and the volumetric haze, so the sunlit flecks on stone and water and
 * the shafts in the air come from exactly the same gaps. Sunlight under the
 * water forms moving caustics on the stones; the forest itself is lit by a
 * radiance probe of bright sky, green canopy and dark ground.
 */

const WATER_Y = 0.08;
const SUN_DIR = new THREE.Vector3(-0.42, 0.66, -0.62).normalize();
const SUN = new THREE.Color(1.0, 0.9, 0.72);
const SUN_TARGET = new THREE.Vector3(.4, 0, -7);
const streamCenter = (z: number) => Math.sin((z + 4) * 0.11) * 1.7 + Math.sin(z * 0.23) * 0.38;
const streamSlope = (z: number) => Math.cos((z + 4) * 0.11) * 0.187 + Math.cos(z * 0.23) * 0.0874;
const streamWidth = (z: number) => 2.5 + Math.sin(z * 0.2) * 0.25 + Math.max(0, z + 3) * 0.05;
const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/** Terrain: a shallow stony bed inside the channel, banks rising outside it. */
function groundHeight(x: number, z: number) {
  const u = Math.abs(x - streamCenter(z)) / streamWidth(z);
  if (u < 1) {
    const depth = .44 * Math.pow(1 - u * u, .7) * (.8 + .2 * Math.sin(z * .37 + 1.3));
    return WATER_Y - depth + noise3(x * 1.4, 0.5, z * 1.4) * .04;
  }
  const d = (u - 1) * streamWidth(z);
  const hill = Math.max(0, d - 3.5) * (.34 + .12 * Math.sin(z * .09 + Math.sign(x - streamCenter(z)))) + fbm3(x * .08, 3.3, z * .08, 3) * 1.6 * smooth(4, 14, d);
  return WATER_Y - .015 + Math.min(d * .42, 1.6) + hill + fbm3(x * .35, 1.7, z * .35, 3) * .28 * Math.min(d, 1.5) + Math.max(0, noise3(x * .9, 4.1, z * .9)) * .12 * smooth(.3, 1.5, d);
}
const GLSL_STREAM = /* glsl */ `
float streamCenter(float z) { return sin((z + 4.0) * 0.11) * 1.7 + sin(z * 0.23) * 0.38; }
float streamSlope(float z) { return cos((z + 4.0) * 0.11) * 0.187 + cos(z * 0.23) * 0.0874; }
float streamWidth(float z) { return 2.5 + sin(z * 0.2) * 0.25 + max(0.0, z + 3.0) * 0.05; }
/** Must match groundHeight() inside the channel. */
float bedHeight(vec2 p) {
  float u = abs(p.x - streamCenter(p.y)) / streamWidth(p.y);
  float depth = 0.44 * pow(max(1.0 - u * u, 0.0), 0.7) * (0.8 + 0.2 * sin(p.y * 0.37 + 1.3));
  return ${WATER_Y.toFixed(3)} - depth + bwNoise(vec3(p.x * 1.4, 0.5, p.y * 1.4)) * 0.04;
}
float caustic(vec2 p, float t) {
  p.y -= t * 0.22;
  float a = pow(max(1.0 - abs(bwNoise(vec3(p * 2.4, t * 0.33))), 0.0), 6.0);
  float b = pow(max(1.0 - abs(bwNoise(vec3(p * 3.3 + 4.1, t * 0.29 + 2.0))), 0.0), 6.0);
  return a * 0.7 + b * 0.6 + a * b * 2.0;
}
`;

/** Canopy openness over a ground point: an open corridor above the water, leafy gaps elsewhere. */
function canopyOpen(x: number, z: number) {
  const u = Math.abs(x - streamCenter(z)) / streamWidth(z);
  const corridor = smooth(1.6, .4, u) * smooth(-48, -6, z);
  const away = Math.max(0, (u - 1) * streamWidth(z));
  const gaps = smooth(.0, .4, fbm3(x * .23, 2.2, z * .23, 4)) * (.12 + .88 * smooth(13, 4, away));
  const flecks = smooth(.15, .55, noise3(x * 1.7, 6.3, z * 1.7));
  const leaves = smooth(-.3, .3, fbm3(x * 3.6, 9.1, z * 3.6, 3));
  return THREE.MathUtils.clamp((corridor * (.3 + .7 * gaps) + gaps * .7 * flecks) * (.15 + .85 * leaves), 0, 1);
}

const SKY_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform vec3 uSun;
uniform float uTime;
varying vec3 vSkyWorld;
void main() {
  vec3 d = normalize(vSkyWorld - cameraPosition);
  float h = max(d.y, 0.0);
  vec3 c = mix(vec3(1.1, 1.35, 1.5), vec3(0.4, 0.8, 1.55), pow(h, 0.5));
  float s = max(dot(d, uSun), 0.0);
  c += vec3(4.0, 3.4, 2.4) * pow(s, 24.0) + vec3(60.0, 52.0, 40.0) * smoothstep(0.9993, 0.9997, s);
  vec2 cp = d.xz / (h + 0.12) * 1.3 + vec2(uTime * 0.004, uTime * 0.0015);
  float cloud = smoothstep(0.0, 0.55, bwFbm3(vec3(cp, 3.1)) + 0.05) * smoothstep(0.05, 0.3, h);
  c = mix(c, vec3(3.2, 3.2, 3.1) + vec3(1.5, 1.2, 0.8) * pow(s, 6.0), cloud * 0.55);
  if (d.y < 0.0) c = vec3(0.12, 0.14, 0.1);
  gl_FragColor = vec4(c, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const PROBE_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform vec3 uSun;
varying vec3 vSkyWorld;
void main() {
  vec3 d = normalize(vSkyWorld);
  float h = d.y;
  vec3 sky = mix(vec3(1.3, 1.5, 1.6), vec3(0.45, 0.8, 1.4), pow(max(h, 0.0), 0.5));
  sky += vec3(30.0, 26.0, 20.0) * smoothstep(0.997, 0.999, dot(d, uSun));
  // Canopy: leafy green with gaps, open along the stream axis (z).
  float corridor = smoothstep(0.55, 0.15, abs(d.x)) * smoothstep(0.2, 0.6, h);
  float leaf = smoothstep(-0.25, 0.2, bwFbm3(d * 7.0)) * (1.0 - corridor * 0.7);
  vec3 canopy = mix(vec3(0.025, 0.05, 0.012), vec3(0.12, 0.2, 0.05), smoothstep(0.2, 0.8, h)) * (0.7 + 0.5 * bwNoise(d * 21.0));
  vec3 c = mix(sky, canopy, leaf * smoothstep(0.02, 0.2, h));
  // Banks and trunks near the horizon, stream and stones below.
  vec3 bank = vec3(0.06, 0.07, 0.035) * (0.8 + 0.4 * bwNoise(d * 13.0));
  c = mix(c, bank, 1.0 - smoothstep(0.0, 0.22, h));
  if (h < 0.0) c = mix(vec3(0.05, 0.045, 0.03), vec3(0.09, 0.11, 0.07), smoothstep(-0.5, 0.0, h));
  gl_FragColor = vec4(c, 1.0);
}
`;

const VOLUME_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
${GLSL_NOISE}
uniform sampler2D tCookie;
uniform mat4 uSunMatrix;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uAmbient;
uniform float uDensity;
uniform float uWaterY;
float sunlit(vec3 p) {
  vec4 c = uSunMatrix * vec4(p, 1.0);
  vec2 uv = c.xy / c.w;
  if (c.w <= 0.0 || uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0;
  return texture2D(tCookie, uv).r;
}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float tWater = rd.y < -1e-4 ? (uWaterY - ro.y) / rd.y : 1e4;
  float maxT = min(min(surface, tWater), 46.0);
  float jitter = bwIgn(gl_FragCoord.xy);
  float phase = (bwPhase(dot(rd, uSunDir), 0.62) * 0.8 + bwPhase(dot(rd, uSunDir), 0.0) * 0.2) * 12.5663706;
  const int STEPS = 34;
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  float previous = 0.0;
  for (int i = 0; i < STEPS; i++) {
    float t = maxT * pow((float(i) + jitter) / float(STEPS), 1.5);
    float dt = t - previous; previous = t;
    vec3 p = ro + rd * t;
    float h = max(p.y - uWaterY, 0.0);
    // Humid air: denser over the water, drifting pollen and spray motes.
    float motes = 0.55 + 0.45 * bwValue(p * 0.6 + vec3(uTime * 0.04, uTime * 0.012, -uTime * 0.03));
    float density = uDensity * (0.6 + 0.9 * exp(-h * 0.9)) * motes;
    vec3 radiance = uSunColor * phase * sunlit(p) + uAmbient;
    float stepT = exp(-density * dt);
    scatter += transmittance * radiance * (1.0 - stepT);
    transmittance *= stepT;
  }
  gl_FragColor = vec4(scatter, transmittance);
}
`;

export function createSummerValley(renderer: THREE.WebGLRenderer): WorldScene {
  let stream = seeded(42891);
  const random = () => stream();
  const section = (seed: number) => { stream = seeded(seed); };
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(1.2, 1.5, 1.7);
  const camera = new THREE.PerspectiveCamera(53, 1, 0.08, 120);
  const clock = { value: 0 };
  const ripple = new THREE.Vector4(0, 0, -100, 0);

  // --- Sun through the canopy: one spot light with a procedural cookie. ------
  const sun = new THREE.SpotLight(SUN, 11, 0, .5, .2, 0);
  sun.position.copy(SUN_TARGET).addScaledVector(SUN_DIR, 70);
  sun.target.position.copy(SUN_TARGET);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 40; sun.shadow.camera.far = 110;
  sun.shadow.bias = -.00008; sun.shadow.normalBias = .04; sun.shadow.radius = 2;
  scene.add(sun, sun.target);
  sun.updateMatrixWorld(); sun.target.updateMatrixWorld();
  // Cookie texels are evaluated where they land on the ground, so the gaps
  // line up with the stream corridor regardless of the projection.
  const cookie = (() => {
    const size = 384, data = new Uint8Array(size * size * 4);
    const projector = new THREE.PerspectiveCamera(THREE.MathUtils.radToDeg(sun.angle * 2), 1, 1, 200);
    projector.position.copy(sun.position); projector.lookAt(sun.target.position); projector.updateMatrixWorld(); projector.updateProjectionMatrix();
    const ray = new THREE.Vector3(), origin = projector.position;
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      ray.set((x + .5) / size * 2 - 1, (y + .5) / size * 2 - 1, .5).unproject(projector).sub(origin).normalize();
      const t = (0 - origin.y) / ray.y;
      const gx = origin.x + ray.x * t, gz = origin.z + ray.z * t;
      const v = Math.round(canopyOpen(gx, gz) * 255);
      const i = (y * size + x) * 4;
      data[i] = v; data[i + 1] = v; data[i + 2] = Math.round(v * .96); data[i + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.magFilter = THREE.LinearFilter; texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  })();
  sun.map = cookie;
  // Warm bounce from the sunlit channel onto the near banks and stones; a cool
  // one from open sky over the water. Small and local: no flat fill.
  const bounce = new THREE.PointLight('#d8d29a', 3, 11, 2);
  bounce.position.set(streamCenter(1) - .2, .7, 1);
  const skyBounce = new THREE.PointLight('#9cc4d8', 2.5, 12, 2);
  skyBounce.position.set(streamCenter(-6), 1.6, -6);
  scene.add(bounce, skyBounce);

  // --- Sky and radiance probe. -----------------------------------------------
  const sky = new THREE.Mesh(new THREE.SphereGeometry(100, 48, 24), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, uniforms: { uSun: { value: SUN_DIR }, uTime: clock },
    vertexShader: 'varying vec3 vSkyWorld;void main(){vec4 w=modelMatrix*vec4(position,1.);vSkyWorld=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader: SKY_FRAGMENT,
  }));
  sky.name = 'summer-valley-sky'; sky.frustumCulled = false; sky.renderOrder = -5;
  scene.add(sky);
  const environment = radianceProbe(renderer, probe => {
    probe.add(new THREE.Mesh(new THREE.SphereGeometry(30, 48, 24), new THREE.ShaderMaterial({
      side: THREE.BackSide, uniforms: { uSun: { value: SUN_DIR } },
      vertexShader: 'varying vec3 vSkyWorld;void main(){vSkyWorld=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: PROBE_FRAGMENT,
    })));
  });
  scene.environment = environment.texture;
  scene.environmentIntensity = .4;

  // --- Materials. --------------------------------------------------------------
  /** Sunlight under the water: refracted caustics modulate direct light on submerged surfaces. */
  const causticPatch = (material: THREE.MeshStandardMaterial, key: string) => {
    material.onBeforeCompile = shader => {
      shader.uniforms.uStreamTime = clock;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vStreamWorld;')
        .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
{
  vec4 sw = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
  sw = instanceMatrix * sw;
  #endif
  vStreamWorld = (modelMatrix * sw).xyz;
}`);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>
uniform float uStreamTime;
varying vec3 vStreamWorld;`)
        .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
{
  float below = ${WATER_Y.toFixed(3)} - vStreamWorld.y;
  if (below > 0.0) {
    vec2 cp = vStreamWorld.xz + vec2(${(SUN_DIR.x / SUN_DIR.y).toFixed(4)}, ${(SUN_DIR.z / SUN_DIR.y).toFixed(4)}) * below * 0.75;
    float c = caustic(cp, uStreamTime);
    float w = smoothstep(0.0, 0.05, below);
    reflectedLight.directDiffuse *= mix(1.0, 0.4 + 2.3 * c, w);
    // Water absorbs red first: submerged stone turns green-gold with depth.
    vec3 absorb = exp(-vec3(1.2, 0.42, 0.5) * below * 1.6);
    reflectedLight.directDiffuse *= mix(vec3(1.0), absorb, w);
    reflectedLight.indirectDiffuse *= mix(vec3(1.0), absorb * vec3(0.85, 1.0, 0.95), w);
    // Stone under water has almost no specular: its index nearly matches water.
    reflectedLight.directSpecular *= mix(1.0, 0.12, w);
    reflectedLight.indirectSpecular *= mix(1.0, 0.12, w);
  }
}`);
    };
    const base = material.customProgramCacheKey.bind(material);
    material.customProgramCacheKey = () => `${base()}|valley-caustic-v1|${key}`;
    return material;
  };
  const withStreamGLSL = (material: THREE.MeshStandardMaterial) => {
    // The rock patch already brings the noise; add the stream helpers after it,
    // and give instanced cobbles true world positions for their stone pattern.
    const chained = material.onBeforeCompile;
    material.onBeforeCompile = (shader, live) => {
      chained.call(material, shader, live);
      shader.fragmentShader = shader.fragmentShader.replace('uniform float uStreamTime;', `uniform float uStreamTime;\n${GLSL_STREAM}`);
      shader.vertexShader = shader.vertexShader.replace('#include <fog_vertex>', `#include <fog_vertex>
#ifdef USE_INSTANCING
vRockWorld = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
vRockNormal = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * objectNormal);
#endif`);
    };
    return material;
  };

  // Granite boulders and cobbles: world-space stone, wet below the waterline,
  // moss on the shaded tops, caustics underwater and reflected sparkle above.
  const reflectedCaustics = { centre: new THREE.Vector3(streamCenter(-2), WATER_Y, -2), radius: 9, color: new THREE.Color(.9, 1.0, .85).multiplyScalar(.35), time: clock };
  const graniteOptions = {
    scale: 1.1, bump: 1.3, stain: '#6b5a3e', stainAmount: .3, cavity: .55, strata: .1, waterY: WATER_Y, wetBand: .28,
    drips: .05, dryRoughness: .78, wetRoughness: .12, algae: '#4b5a2a', algaeAmount: .55, caustics: reflectedCaustics,
  };
  const graniteMaterial = (key: string, color: string, moss: number, submergedClear = false) => {
    const material = new THREE.MeshStandardMaterial({ color, roughness: .8, metalness: 0 });
    causticPatch(material, `${key}-c`);
    // Cobbles on the bed read as clean, sunlit stone through clear water: no
    // dark wet band or algae skin, only a little dampness.
    const clear = submergedClear ? { waterY: -10, wetness: .3, algaeAmount: 0 } : {};
    applyRockSurface(material, { ...graniteOptions, key, moss: moss > 0 ? { color: '#4f6b22', amount: moss } : undefined, algaeAmount: moss > 0 ? .55 : .25, ...clear });
    return withStreamGLSL(material);
  };
  const boulderMaterial = graniteMaterial('valley-boulder', '#a29d8f', .75);
  const cobbleMaterial = graniteMaterial('valley-cobble', '#ffffff', 0, true);

  // --- Terrain: bed and banks as one surface. ---------------------------------
  section(7);
  const groundGeometry = new THREE.PlaneGeometry(64, 1, 256, 210);
  groundGeometry.rotateX(-Math.PI / 2);
  {
    const gp = groundGeometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < gp.count; i++) {
      const v = .5 - gp.getZ(i); // keeps the plane's upward winding
      const z = 10 - 66 * Math.pow(v, 1.35);
      const x = gp.getX(i) + streamCenter(z);
      gp.setXYZ(i, x, groundHeight(x, z), z);
    }
    groundGeometry.computeVertexNormals();
  }
  const groundMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .95, metalness: 0 });
  causticPatch(groundMaterial, 'valley-ground');
  {
    const chained = groundMaterial.onBeforeCompile;
    groundMaterial.onBeforeCompile = (shader, live) => {
      chained.call(groundMaterial, shader, live);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vGroundNormal;')
        .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvGroundNormal = normalize(mat3(modelMatrix) * objectNormal);');
      shader.fragmentShader = shader.fragmentShader
        .replace('uniform float uStreamTime;', `uniform float uStreamTime;
varying vec3 vGroundNormal;
${GLSL_NOISE}
${GLSL_STREAM}
float groundRelief(vec3 p) { return bwFbm3(p * 2.7) * 0.025 + bwNoise(p * 13.0) * 0.006 + pow(max(1.0 - abs(bwNoise(p * 5.5)), 0.0), 8.0) * 0.01; }`)
        .replace('#include <color_fragment>', `#include <color_fragment>
vec3 gp = vStreamWorld;
float macro = bwFbm3(gp * 0.3 + 2.0);
float mid = bwNoise(gp * 1.9);
float fine = bwNoise(gp * 11.0);
float above = gp.y - ${WATER_Y.toFixed(3)};
// Stream bed: sand and fine gravel; banks: soil, leaf litter, moss and grass.
vec3 sand = mix(vec3(0.42, 0.37, 0.26), vec3(0.3, 0.28, 0.22), smoothstep(-0.3, 0.5, macro)) * (0.8 + 0.3 * fine);
float gravel = smoothstep(0.35, 0.6, bwNoise(gp * 7.0 + 3.0));
sand = mix(sand, vec3(0.22, 0.21, 0.18) * (0.7 + 0.6 * fine), gravel * 0.6);
vec3 soil = vec3(0.16, 0.12, 0.075) * (0.75 + 0.4 * mid);
vec3 litter = mix(vec3(0.24, 0.17, 0.08), vec3(0.17, 0.14, 0.07), fine * 0.5 + 0.5) * (0.8 + 0.3 * mid);
vec3 moss = mix(vec3(0.07, 0.13, 0.025), vec3(0.13, 0.2, 0.04), smoothstep(-0.4, 0.5, macro)) * (0.8 + 0.3 * fine);
float flatness = smoothstep(0.5, 0.92, vGroundNormal.y);
vec3 bank = mix(soil, litter, smoothstep(-0.2, 0.4, bwFbm3(gp * 0.8 + 7.0)));
bank = mix(bank, moss, smoothstep(0.0, 0.45, macro + 0.25) * flatness);
float shore = smoothstep(-0.02, 0.18, above + 0.05 * mid);
vec3 groundColor = mix(sand, bank, shore);
float wet = 1.0 - smoothstep(0.0, 0.14, above + 0.04 * mid);
groundColor *= mix(1.0, 0.62, wet * shore + (1.0 - shore) * 0.3);
diffuseColor.rgb = groundColor;`)
        .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(0.95, 0.35, wet * shore);`)
        .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  const float e = 0.012;
  float h0 = groundRelief(gp);
  vec3 grad = vec3(groundRelief(gp + vec3(e, 0, 0)) - h0, 0.0, groundRelief(gp + vec3(0, 0, e)) - h0) / e;
  // Fade relief finer than a pixel: it would only alias into sparkle.
  grad *= 1.0 - smoothstep(0.02, 0.09, length(fwidth(gp)));
  vec3 viewGrad = (viewMatrix * vec4(grad, 0.0)).xyz;
  normal = normalize(normal - (viewGrad - dot(viewGrad, normal) * normal));
}`);
    };
    groundMaterial.customProgramCacheKey = () => 'valley-ground-v2';
  }
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.name = 'summer-valley-bed-and-banks'; ground.receiveShadow = true;
  scene.add(ground);

  // --- Stones. ----------------------------------------------------------------
  section(11);
  const dummy = new THREE.Object3D();
  const cobbleShapes = [pebbleGeometry(5, 3, .35), pebbleGeometry(9, 3, .2), pebbleGeometry(14, 3, .5), pebbleGeometry(21, 1, .35)];
  const cobbleSets: THREE.Matrix4[][] = cobbleShapes.map(() => []);
  const cobbleColors: THREE.Color[][] = cobbleShapes.map(() => []);
  const tones = ['#d4c8ae', '#b0ab9c', '#e3d6bb', '#a3aaa2', '#c9b39a', '#ddd2bf', '#948f84'];
  for (let i = 0; i < 1500; i++) {
    const z = 10 - random() * 62;
    const edge = (random() * 2 - 1) * (streamWidth(z) + 1.2);
    const x = streamCenter(z) + edge;
    const size = (.05 + Math.pow(random(), 2.2) * .26) * (z < -20 ? 1.3 : 1);
    const sx = size * (1 + random() * .6), sy = size * (.42 + random() * .3), sz = size * (.8 + random() * .5);
    dummy.position.set(x, groundHeight(x, z) + sy * .45, z);
    dummy.rotation.set((random() - .5) * .3, random() * Math.PI * 2, (random() - .5) * .3);
    dummy.scale.set(sx, sy, sz); dummy.updateMatrix();
    const variant = z < -16 ? 3 : Math.floor(random() * 3);
    cobbleSets[variant].push(dummy.matrix.clone());
    cobbleColors[variant].push(new THREE.Color(tones[Math.floor(random() * tones.length)]));
  }
  cobbleShapes.forEach((shape, v) => {
    const mesh = new THREE.InstancedMesh(shape, cobbleMaterial, cobbleSets[v].length);
    cobbleSets[v].forEach((m, i) => { mesh.setMatrixAt(i, m); mesh.setColorAt(i, cobbleColors[v][i]); });
    mesh.receiveShadow = true; mesh.castShadow = v < 3; mesh.name = `summer-valley-cobbles-${v}`;
    scene.add(mesh);
  });
  const boulderObjects: THREE.Mesh[] = [];
  const boulders: Array<[number, number, number, number, number, number, number]> = [
    [-2.18, .16, 3.2, 1.23, .8, 1.13, 18], [2.24, .06, 1.8, .93, .58, 1.2, 16],
    [-3.0, .26, -.35, 1.22, .78, 1.04, 14], [2.62, .14, -2.4, .89, .68, .98, 12],
    [.6, -.09, -5.8, .54, .32, .74, 10], [-2.6, .12, -8.3, .81, .48, 1.02, 10],
    [-.85, -.05, -10.7, .6, .26, .7, 8], [2.3, .22, -14.2, 1.3, .62, 1.0, 8],
    [-2.8, .2, -18.5, 1.3, .72, 1.2, 7], [.35, .04, -22.4, .9, .4, .7, 6],
    [-.75, .06, 5.8, .7, .34, .61, 14], [3.53, .5, 4.3, 1.18, .88, 1.05, 14],
  ];
  boulders.forEach(([x, y, z, sx, sy, sz, detail], i) => {
    const mesh = new THREE.Mesh(boulderGeometry(101 + i * 13, detail, { facets: 9, rounding: .5, relief: 1.6, base: .25 }), boulderMaterial);
    mesh.position.set(x, y, z); mesh.scale.set(sx, sy, sz);
    mesh.rotation.set(random() * .16, random() * 6, random() * .12);
    mesh.castShadow = mesh.receiveShadow = true; mesh.name = `summer-valley-boulder-${i}`;
    scene.add(mesh); boulderObjects.push(mesh);
  });

  // --- Trees, understory and their shared leaf material. ----------------------
  section(23);
  const limbs: THREE.BufferGeometry[] = [];
  const crowns: Crown[] = [];
  const canopyTint = new THREE.Color(.52, .66, .3), shrubTint = new THREE.Color(.42, .58, .24);
  for (let i = 0; i < 46; i++) {
    const side = i % 2 ? -1 : 1;
    const z = i < 10 ? 6 - i * 3.6 + random() * 3 : -3 - random() * 46;
    const x = streamCenter(z) + side * (streamWidth(z) + 1.4 + random() * (i < 10 ? 4.5 : 17));
    const h = 8 + Math.pow(random(), .8) * 7;
    growTree({ base: new THREE.Vector3(x, groundHeight(x, z) - .05, z), height: h, radius: (i < 14 ? .22 : .14) + random() * (i < 14 ? .26 : .18), branches: 6,
      crown: 1.5 + random() * .9, cardsPerCrown: 54, cardSize: [.55, .85], tint: canopyTint, spread: .3, lean: new THREE.Vector2(-side * (.05 + random() * .1), (random() - .5) * .1) }, random, limbs, crowns);
  }
  for (let i = 0; i < 18; i++) {
    const z = -40 - random() * 12, x = streamCenter(z) + (random() * 2 - 1) * 14;
    growTree({ base: new THREE.Vector3(x, groundHeight(x, z) - .05, z), height: 9 + random() * 6, radius: .14 + random() * .14, branches: 5,
      crown: 1.8 + random() * .8, cardsPerCrown: 30, cardSize: [.8, 1.2], tint: canopyTint, spread: .3 }, random, limbs, crowns);
  }
  // Hillside forest above the banks, so no bare slope shows between trunks.
  for (let i = 0; i < 70; i++) {
    const side = i % 2 ? 1 : -1, z = 8 - random() * 58;
    const x = streamCenter(z) + side * (streamWidth(z) + 11 + random() * 19);
    growTree({ base: new THREE.Vector3(x, groundHeight(x, z) - .05, z), height: 10 + random() * 6, radius: .16 + random() * .12, branches: 5,
      crown: 2 + random() * .8, cardsPerCrown: 26, cardSize: [.9, 1.3], tint: canopyTint, spread: .32 }, random, limbs, crowns);
  }
  // Understory where the stream bends out of sight upstream.
  for (let i = 0; i < 40; i++) {
    const z = -32 - random() * 22, x = streamCenter(z) + (random() * 2 - 1) * (streamWidth(z) + 8) * (z < -44 ? 1 : .0) + (z < -44 ? 0 : (random() > .5 ? 1 : -1) * (streamWidth(z) + .5 + random() * 6));
    const r = 1.1 + random() * 1.3;
    crowns.push({ centre: new THREE.Vector3(x, groundHeight(x, z) + r * (.6 + random() * 1.2), z), radii: new THREE.Vector3(r * 1.3, r * .9, r * 1.1), cards: 36, size: [.6, .95], tint: shrubTint });
  }
  // Shrubs and saplings scattered up the slopes.
  for (let i = 0; i < 90; i++) {
    // Kept clear of the seat: close shrubs would read as giant cut-out leaves.
    const z = 0 - random() * 48, side = i % 2 ? 1 : -1;
    const x = streamCenter(z) + side * (streamWidth(z) + 6 + random() * 22);
    const r = .8 + random() * 1.2;
    crowns.push({ centre: new THREE.Vector3(x, groundHeight(x, z) + r * (.5 + random() * .6), z), radii: new THREE.Vector3(r * 1.3, r * .8, r * 1.2), cards: 24, size: [.55, .9], tint: shrubTint });
  }
  for (let i = 0; i < 64; i++) {
    const z = i < 22 ? -38 - random() * 14 : 6 - random() * 44;
    const side = i % 2 ? 1 : -1;
    const x = streamCenter(z) + side * (streamWidth(z) + .8 + random() * 10);
    const r = .7 + random() * 1.1;
    const ground = groundHeight(x, z);
    crowns.push({ centre: new THREE.Vector3(x, ground + r * .75, z), radii: new THREE.Vector3(r * 1.25, r * .8, r * 1.1), cards: 40, size: [.45, .75], tint: shrubTint });
    if (random() > .4) limbs.push(limbGeometry([new THREE.Vector3(x, ground - .1, z), new THREE.Vector3(x + (random() - .5) * .3, ground + r * .7, z)], .03, .6, 4, i));
  }
  const bark = barkMaterial('#6d6556', { key: 'valley-bark', lichen: '#9aa38a', moss: '#4a6a22', mossHeight: 1.4 });
  const trunks = new THREE.Mesh(mergeGeometries(limbs), bark);
  limbs.forEach(g => g.dispose());
  trunks.name = 'summer-valley-trees'; trunks.castShadow = true; trunks.receiveShadow = true;
  scene.add(trunks);
  const atlas = leafAtlas({ seed: 314, variants: 2, hsl: [.24, .55, .42], jitter: [.05, .15, .12], twigColor: '#5a4a34', leavesPerTwig: 10 });
  const sunThroughLeaves = SUN.clone().multiplyScalar(5);
  // Sprig cards closer than a few metres to the seat would read as cut-outs.
  const seat = new THREE.Vector3(.3, 1.3, 6.7);
  const visibleCrowns = crowns.filter(crown => crown.centre.distanceTo(seat) > 5.5 + crown.radii.x * .5);
  const leaves = new THREE.Mesh(crownGeometry(visibleCrowns, 977, 2), applyFoliage(
    new THREE.MeshStandardMaterial({ map: atlas, vertexColors: true, alphaTest: .45, alphaToCoverage: true, side: THREE.DoubleSide, roughness: .72 }),
    { key: 'valley-crowns', time: clock, lightDirection: SUN_DIR, lightColor: sunThroughLeaves, translucency: .9, wind: .06, crownNormals: true, specular: .5 },
  ));
  leaves.name = 'summer-valley-leaves'; leaves.receiveShadow = true;
  scene.add(leaves);

  // --- Ferns and grass. -------------------------------------------------------
  section(31);
  const plantGeometries: THREE.BufferGeometry[] = [];
  const plantColor = new THREE.Color();
  const pushStrip = (p: number[], c: number[], o: number[], w: number[], idx: number[]) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(c, 3));
    g.setAttribute('aOcc', new THREE.Float32BufferAttribute(o, 1)); g.setAttribute('aWind', new THREE.Float32BufferAttribute(w, 1));
    g.setIndex(idx.length ? idx : Array.from({ length: p.length / 3 }, (_, i) => i));
    g.computeVertexNormals(); plantGeometries.push(g);
  };
  // Ferns: arched fronds with paired tapering pinnae.
  for (let f = 0; f < 70; f++) {
    const z = 7 - random() * 40;
    const side = random() > .5 ? 1 : -1;
    const x = streamCenter(z) + side * (streamWidth(z) + .25 + random() * 3);
    const groundY = groundHeight(x, z);
    const size = .6 + random() * .6;
    const p: number[] = [], c: number[] = [], o: number[] = [], w: number[] = [];
    for (let frond = 0; frond < 9; frond++) {
      const angle = frond * Math.PI * 2 / 9 + random() * .4;
      const length = size * (.7 + random() * .4);
      const point = (u: number) => new THREE.Vector3(x + Math.cos(angle) * u * length, groundY + Math.sin(u * Math.PI * .7) * length * .72, z + Math.sin(angle) * u * length);
      for (let j = 1; j < 13; j++) {
        const u = j / 14, base = point(u), leafLength = Math.sin(u * Math.PI) * length * .3;
        for (const sign of [-1, 1]) {
          const a = angle + sign * 1.05;
          const tip = base.clone().add(new THREE.Vector3(Math.cos(a) * leafLength, .02 + u * .02, Math.sin(a) * leafLength));
          const dir = tip.clone().sub(base), across = new THREE.Vector3(-dir.z, 0, dir.x).normalize().multiplyScalar(leafLength * .16);
          const mid = base.clone().lerp(tip, .4); mid.y += leafLength * .07;
          plantColor.setHSL(.23 + random() * .03, .5, .2 + u * .12);
          for (const q of [base, mid.clone().add(across), tip, base, tip, mid.clone().sub(across)]) {
            p.push(q.x, q.y, q.z); c.push(plantColor.r, plantColor.g, plantColor.b); o.push(.5 + .5 * u); w.push(u * u);
          }
        }
      }
    }
    pushStrip(p, c, o, w, []);
  }
  // Grass and sedge tufts, thicker along the water.
  for (let i = 0, placed = 0; i < 40000 && placed < 7000; i++) {
    const z = 9 - random() * 52, side = random() > .5 ? 1 : -1;
    const d = .05 + random() * 9;
    const tuftX = streamCenter(z) + side * (streamWidth(z) + d);
    if (random() > Math.exp(-d * .22) * (.4 + .6 * smooth(-.2, .3, noise3(tuftX * .7, 3.3, z * .7)))) continue;
    const blades = 5 + Math.floor(random() * 6);
    const tuftHeight = (.14 + random() * .32) * (d < 1 ? 1.4 : 1);
    const tuftHue = .19 + random() * .07;
    for (let b = 0; b < blades; b++, placed++) {
    const x = tuftX + (random() - .5) * .08, bz = z + (random() - .5) * .08;
    const y0 = groundHeight(x, bz) - .02, h = tuftHeight * (.6 + random() * .5), width = .01 + random() * .012;
    const a = random() * Math.PI * 2, lean = .08 + random() * .22;
    plantColor.setHSL(tuftHue + random() * .02, .35 + random() * .25, .18 + random() * .14);
    const p: number[] = [], c: number[] = [], o: number[] = [], w: number[] = [], idx: number[] = [];
    for (let j = 0; j <= 3; j++) {
      const t = j / 3, curve = t * t * lean, bw = width * (1 - t * .85);
      const cx = x + Math.cos(a) * curve, cz = bz + Math.sin(a) * curve;
      for (const k of [-1, 1]) { p.push(cx - Math.sin(a) * bw * k, y0 + h * t * (1 - lean * t * .3), cz + Math.cos(a) * bw * k); const s = .45 + .55 * t; c.push(plantColor.r * s, plantColor.g * s, plantColor.b * s); o.push(.4 + .6 * t); w.push(t * t); }
      if (j < 3) { const q = j * 2; idx.push(q, q + 2, q + 3, q, q + 3, q + 1); }
    }
    pushStrip(p, c, o, w, idx);
    }
  }
  const plants = new THREE.Mesh(mergeGeometries(plantGeometries), applyFoliage(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .75, side: THREE.DoubleSide }), {
    key: 'valley-plants', time: clock, lightDirection: SUN_DIR, lightColor: sunThroughLeaves, translucency: .8, wind: .03, specular: .5,
  }));
  plantGeometries.forEach(g => g.dispose());
  plants.name = 'summer-valley-ferns-and-grass'; plants.castShadow = true; plants.receiveShadow = true;
  scene.add(plants);

  // --- Water: lit, flowing, clear; transmits the bed by depth and Fresnel. ---
  const wakeRocks = boulders.filter(([x, , z, sx]) => Math.abs(x - streamCenter(z)) < streamWidth(z) + sx * .5 && z > -24).slice(0, 8)
    .map(([x, , z, sx, , sz]) => new THREE.Vector3(x, z, Math.max(sx, sz)));
  while (wakeRocks.length < 8) wakeRocks.push(new THREE.Vector3(0, 100, 0));
  const waterMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .05, metalness: 0, transparent: true, depthWrite: true,
    blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor });
  waterMaterial.onBeforeCompile = shader => {
    shader.uniforms.uStreamTime = clock;
    shader.uniforms.uRipple = { value: ripple };
    shader.uniforms.uWake = { value: wakeRocks };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWaterWorld;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWaterWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float uStreamTime;
uniform vec4 uRipple;
uniform vec3 uWake[8];
varying vec3 vWaterWorld;
${GLSL_NOISE}
${GLSL_STREAM}
float waterHeight(vec2 p, vec2 flow, float t) {
  float h = bwNoise(vec3(p * vec2(2.2, 1.4) - flow * t, t * 0.18)) * 0.6 + bwNoise(vec3(p * 5.3 - flow * t * 1.3, t * 0.3 + 3.0)) * 0.25;
  return h;
}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec2 wp = vWaterWorld.xz;
float bed = bedHeight(wp);
float depth = max(${WATER_Y.toFixed(3)} - bed, 0.0);
float across = abs(wp.x - streamCenter(wp.y)) / streamWidth(wp.y);
vec2 flowDir = normalize(vec2(streamSlope(wp.y), 1.0));
float speed = 0.12 + 0.38 * (1.0 - across * across) + 0.25 * smoothstep(0.18, 0.05, depth);
// Wakes and pillows of white water around the rocks in the current.
float foam = 0.0, rough = 0.0;
for (int i = 0; i < 8; i++) {
  vec2 rel = wp - uWake[i].xy;
  float r = uWake[i].z;
  float along = rel.y / r, side = rel.x / r;
  float ringD = length(rel) / r - 1.0;
  float ring = exp(-ringD * ringD * 30.0) * smoothstep(0.2, 0.7, bwNoise(vec3(rel * 6.0, uStreamTime * 0.5)) + 0.35);
  float wake = smoothstep(0.0, 0.6, along) * exp(-along * 0.35) * exp(-side * side / ((0.55 + along * 0.22) * (0.55 + along * 0.22)) * 3.0);
  rough += ring * 0.8 + wake;
  foam += ring * 0.28 + wake * 0.3 * smoothstep(0.4, 0.75, bwNoise(vec3(side * 3.0, along * 1.5 - uStreamTime * 1.4, uStreamTime * 0.2)));
}
foam *= smoothstep(0.02, 0.1, depth);
diffuseColor.rgb = mix(vec3(0.003, 0.009, 0.008), vec3(0.75, 0.78, 0.74), clamp(foam, 0.0, 1.0));`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(0.035, 0.28, clamp(foam * 1.5, 0.0, 1.0));`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
float waterAlpha;
{
  float t = uStreamTime;
  float cycle = 2.6;
  float p0 = fract(t / cycle), p1 = fract(t / cycle + 0.5);
  float w0 = 1.0 - abs(1.0 - 2.0 * p0);
  vec2 drift = flowDir * speed * cycle;
  const float e = 0.03;
  vec2 q0 = wp - drift * p0, q1 = wp - drift * p1 + vec2(0.37, 0.71);
  float a0 = waterHeight(q0, vec2(0.0), t), a1 = waterHeight(q1, vec2(0.0), t);
  vec2 g = vec2(waterHeight(q0 + vec2(e, 0.0), vec2(0.0), t) - a0, waterHeight(q0 + vec2(0.0, e), vec2(0.0), t) - a0) / e * w0
         + vec2(waterHeight(q1 + vec2(e, 0.0), vec2(0.0), t) - a1, waterHeight(q1 + vec2(0.0, e), vec2(0.0), t) - a1) / e * (1.0 - w0);
  float amplitude = 0.012 + 0.02 * smoothstep(0.2, 0.06, depth) + 0.035 * clamp(rough, 0.0, 1.5);
  g *= amplitude;
  float age = t - uRipple.z;
  vec2 rd = wp - uRipple.xy;
  float rl = length(rd);
  float front = rl - age * 0.7;
  g += rd / max(rl, 1e-3) * cos(front * 22.0) * exp(-front * front * 9.0) * exp(-age * 0.6) * step(0.0, age) * uRipple.w * 0.08;
  vec3 wn = normalize(vec3(-g.x, 1.0, -g.y));
  normal = normalize((viewMatrix * vec4(wn, 0.0)).xyz);
  vec3 toEye = normalize(cameraPosition - vWaterWorld);
  float cosV = max(dot(wn, toEye), 0.0);
  float fresnel = 0.02 + 0.98 * pow(clamp(1.0 - cosV, 0.0, 1.0), 5.0);
  // Refracted path length through the water column.
  float cosT = sqrt(1.0 - (1.0 - cosV * cosV) / 1.77);
  float path = depth / max(cosT, 0.2);
  float transmit = exp(-path * 1.1);
  waterAlpha = clamp(1.0 - transmit * (1.0 - fresnel) + foam * 0.7, 0.0, 1.0) * smoothstep(0.0, 0.012, depth);
}`)
      .replace('#include <opaque_fragment>', `gl_FragColor = vec4(totalDiffuse * waterAlpha + totalSpecular * smoothstep(0.0, 0.012, depth) + totalEmissiveRadiance, waterAlpha);`);
  };
  waterMaterial.customProgramCacheKey = () => 'valley-water-v2';
  const waterGeometry = new THREE.PlaneGeometry(24, 64, 4, 16);
  waterGeometry.rotateX(-Math.PI / 2);
  const water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.position.set(0, WATER_Y, -21);
  water.name = 'summer-valley-stream'; water.renderOrder = 5; water.receiveShadow = true;
  scene.add(water);

  // --- Fish: lofted bodies, dark backs, pale bellies; soft shadows on the bed. -
  section(47);
  const fishGeometry = (() => {
    const rings = 14, sides = 10, positions: number[] = [], colors: number[] = [], indices: number[] = [];
    for (let j = 0; j <= rings; j++) {
      const t = j / rings, x = t * 2 - 1;
      const r = Math.pow(Math.sin(Math.PI * Math.min(.999, t * .92 + .04)), .75) * (t > .82 ? 1 - (t - .82) * 2.2 : 1) * .17;
      for (let i = 0; i <= sides; i++) {
        const a = i / sides * Math.PI * 2;
        const y = Math.sin(a) * r * 1.05, z = Math.cos(a) * r * .62;
        positions.push(x, y, z);
        const back = THREE.MathUtils.smoothstep(Math.sin(a), -.2, .6);
        colors.push(THREE.MathUtils.lerp(.55, .09, back), THREE.MathUtils.lerp(.56, .1, back), THREE.MathUtils.lerp(.5, .075, back));
        if (j < rings && i < sides) { const k = j * (sides + 1) + i; indices.push(k, k + sides + 1, k + 1, k + 1, k + sides + 1, k + sides + 2); }
      }
    }
    const tail = positions.length / 3;
    positions.push(-1, 0, 0, -1.38, .2, 0, -1.3, 0, 0, -1.38, -.18, 0);
    for (let k = 0; k < 4; k++) colors.push(.12, .13, .1);
    indices.push(tail, tail + 1, tail + 2, tail, tail + 2, tail + 3, tail, tail + 2, tail + 1, tail, tail + 3, tail + 2);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    g.setIndex(indices); g.computeVertexNormals();
    return g;
  })();
  const fishMaterial = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .32, metalness: .15 });
  const shadowTexture = (() => {
    const size = 64, data = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const u = (x + .5) / size * 2 - 1, v = (y + .5) / size * 2 - 1;
      const a = Math.exp(-(u * u * 1.2 + v * v * 5) * 2.4);
      data.set([0, 0, 0, Math.round(a * 255)], (y * size + x) * 4);
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat); texture.needsUpdate = true;
    texture.magFilter = THREE.LinearFilter; texture.minFilter = THREE.LinearFilter;
    return texture;
  })();
  const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false, color: '#000000', opacity: .5 });
  const shadowGeometry = new THREE.PlaneGeometry(.34, .2); shadowGeometry.rotateX(-Math.PI / 2);
  const fish: Array<{ group: THREE.Group; body: THREE.Mesh; shade: THREE.Mesh; origin: THREE.Vector3; phase: number; heading: number; turn: number; targetTurn: number }> = [];
  for (let i = 0; i < 8; i++) {
    const group = new THREE.Group();
    const body = new THREE.Mesh(fishGeometry, fishMaterial);
    const length = .07 + random() * .035;
    body.scale.set(length, length, length); group.add(body);
    const origin = new THREE.Vector3(streamCenter(1.5 - i * .9) + (random() - .5) * 2.4, -.12 - random() * .06, 1.5 - random() * 7);
    group.position.copy(origin); group.rotation.y = random() * 6;
    // Each shadow fades with the sunlight where it falls: none in canopy shade.
    const shade = new THREE.Mesh(shadowGeometry, shadowMaterial.clone());
    shade.renderOrder = 1;
    scene.add(group, shade);
    fish.push({ group, body, shade, origin, phase: random() * 6, heading: group.rotation.y, turn: 0, targetTurn: 0 });
  }

  // Gentle drifting motes catching the light in the shafts.
  section(59);
  const moteCount = 360, motePositions = new Float32Array(moteCount * 3), moteSeeds = new Float32Array(moteCount);
  for (let i = 0; i < moteCount; i++) {
    const z = 4 - random() * 22;
    motePositions.set([streamCenter(z) + (random() - .5) * 7, .3 + random() * 4, z], i * 3); moteSeeds[i] = random();
  }
  const moteGeometry = new THREE.BufferGeometry();
  moteGeometry.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
  moteGeometry.setAttribute('seed', new THREE.BufferAttribute(moteSeeds, 1));
  const moteUniforms = { uTime: clock, uPixelRatio: { value: Math.min(2, renderer.getPixelRatio()) }, tCookie: { value: cookie }, uSunMatrix: { value: sun.shadow.matrix } };
  const motes = new THREE.Points(moteGeometry, new THREE.ShaderMaterial({
    uniforms: moteUniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `uniform float uTime;uniform float uPixelRatio;uniform sampler2D tCookie;uniform mat4 uSunMatrix;attribute float seed;varying float vLight;
      void main(){vec3 p=position+vec3(sin(uTime*.05+seed*40.)*.5,sin(uTime*.035+seed*17.)*.35,cos(uTime*.045+seed*23.)*.5);
        vec4 c=uSunMatrix*vec4(p,1.);vec2 uv=c.xy/c.w;float lit=(uv.x>0.&&uv.x<1.&&uv.y>0.&&uv.y<1.)?texture2D(tCookie,uv).r:0.;
        vLight=lit*(.35+.65*fract(seed*7.13))*(.6+.4*sin(uTime*.3+seed*60.));
        vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=clamp(22./-mv.z,1.,2.6)*uPixelRatio;gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `varying float vLight;void main(){float d=length(gl_PointCoord-.5)*2.;gl_FragColor=vec4(vec3(2.2,2.0,1.6)*vLight*(1.-smoothstep(.1,1.,d)),1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
  }));
  motes.name = 'summer-valley-sunlit-motes'; motes.frustumCulled = false;
  scene.add(motes);

  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -WATER_Y);
  const hit = new THREE.Vector3();
  const shadowOffset = new THREE.Vector2(SUN_DIR.x / SUN_DIR.y, SUN_DIR.z / SUN_DIR.y);
  function resize(width: number, height: number) {
    const portrait = width / height < .8;
    camera.aspect = width / height;
    camera.fov = portrait ? 59 : 53;
    camera.position.set(portrait ? .2 : .32, portrait ? 1.42 : 1.3, portrait ? 6.95 : 6.65);
    camera.lookAt(portrait ? .05 : -.3, portrait ? .16 : .78, portrait ? -3 : -8);
    camera.updateProjectionMatrix();
  }
  resize(16, 9);
  return {
    scene, camera, resize,
    post: {
      exposure: 1.0, bloomStrength: .07, bloomThreshold: 0, aoStrength: .9, aoRadius: .55,
      saturation: 1.04, contrast: 1.08, shadowTint: [.9, .98, 1.07], highlightTint: [1.06, 1.0, .9], vignette: .38, grain: .02,
    },
    createVolume(): VolumeEffect {
      const material = new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX, fragmentShader: VOLUME_FRAGMENT, depthTest: false, depthWrite: false, toneMapped: false,
        uniforms: {
          tCookie: { value: cookie }, uSunMatrix: { value: sun.shadow.matrix }, uSunDir: { value: SUN_DIR.clone() },
          uSunColor: { value: new THREE.Vector3(SUN.r, SUN.g, SUN.b).multiplyScalar(1.3) }, uAmbient: { value: new THREE.Vector3(.02, .035, .035) },
          uDensity: { value: .02 }, uWaterY: { value: WATER_Y },
        },
      });
      return { material };
    },
    setPostActive(active) {
      scene.fog = active ? null : new THREE.FogExp2('#9fb4a2', .014);
      renderer.toneMappingExposure = active ? 1 : .9;
    },
    setDrawingSize() { moteUniforms.uPixelRatio.value = Math.min(2, renderer.getPixelRatio()); },
    update(time, dt) {
      clock.value = time;
      fish.forEach(f => {
        const step = Math.min(dt, .1);
        f.targetTurn *= Math.exp(-step * .15);
        f.turn += (f.targetTurn - f.turn) * (1 - Math.exp(-step * .75));
        f.group.position.set(f.origin.x + Math.sin(time * .13 + f.phase) * .44, f.origin.y + Math.sin(time * .2 + f.phase) * .008, f.origin.z + Math.cos(time * .12 + f.phase) * .28);
        f.group.rotation.y = f.heading + Math.sin(time * .11 + f.phase) * .26 + f.turn;
        f.body.rotation.y = Math.sin(time * 2.2 + f.phase) * .08;
        const below = f.group.position.y - groundHeight(f.group.position.x, f.group.position.z);
        f.shade.position.set(f.group.position.x - shadowOffset.x * below, groundHeight(f.group.position.x, f.group.position.z) + .012, f.group.position.z - shadowOffset.y * below);
        f.shade.rotation.y = f.group.rotation.y;
        (f.shade.material as THREE.MeshBasicMaterial).opacity = .6 * canopyOpen(f.shade.position.x, f.shade.position.z);
      });
    },
    interact(x, y, time) {
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      if (!raycaster.ray.intersectPlane(plane, hit) || hit.z > 6.4 || hit.z < -36 || Math.abs(hit.x - streamCenter(hit.z)) > streamWidth(hit.z)) return null;
      if (groundHeight(hit.x, hit.z) > WATER_Y) return null;
      const obstruction = raycaster.intersectObjects(boulderObjects, false)[0];
      if (obstruction && obstruction.distance < raycaster.ray.origin.distanceTo(hit) - .018) return null;
      ripple.set(hit.x, hit.z, time, 1);
      fish.forEach(f => { const distance = f.group.position.distanceTo(hit); if (distance < 3) f.targetTurn = THREE.MathUtils.clamp(f.targetTurn + (f.origin.x > hit.x ? 1 : -1) * .42 * (1 - distance / 3), -.6, .6); });
      return { world: 'summer-valley', kind: 'ripple', strength: .35, position: { x: hit.x, z: hit.z } };
    },
    dispose() { environment.dispose(); cookie.dispose(); atlas.dispose(); shadowTexture.dispose(); shadowMaterial.dispose(); },
  };
}
