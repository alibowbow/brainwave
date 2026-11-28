import * as THREE from 'three';
import { GLSL_NIGHT_SKY } from '../../shared/render/skyNight';
import { VOLUME_PRELUDE } from '../../shared/render/hdrPipeline';
import { applyFoliageShading, beforeMain, withNoise } from '../../shared/render/foliageShading';
import { canvasToFoliageTexture } from '../../shared/render/foliageTextures';
import { seeded } from '../../shared/render/noise';
import { KP_NOISE } from './kit';

/*
 * Parts of the rural summer night (original, code-only): the farm road and
 * paddy layout shared by CPU placement and GPU shading, moonlit cloud deck,
 * flooded-paddy water, cracked concrete farm road, earthen paddy ridges,
 * young rice and ridge weeds, forest crowns built from leaf cards, a
 * Korean farmhouse's materials and the ground-mist volume.
 */

/* ---------------------------------------------------------------- layout */

/** Farm road centreline (x for a given z) and half width, metres. */
export const pathX = (z: number) => 2.8 * Math.exp(-(((z + 1) / 10) ** 2)) - 1.2 * Math.exp(-(((z + 13) / 5) ** 2)) + 5.5 * Math.exp(-(((z + 29) / 8) ** 2));
export const ROAD_HALF = 1.45;
export const PATH_GLSL = /* glsl */ `
float ruralPathX(float z) { return 2.8 * exp(-pow((z + 1.0) / 10.0, 2.0)) - 1.2 * exp(-pow((z + 13.0) / 5.0, 2.0)) + 5.5 * exp(-pow((z + 29.0) / 8.0, 2.0)); }
`;
/** The flooded paddies end at the village edge. */
export const PADDY_BACK = -37.5;
/** House yard (raised, dry). */
export const YARD = { x0: .5, x1: 15.5, z0: -38.5, z1: -22.5 };
/** Earthen ridges between paddies: [x0, z0, x1, z1]. Ends meet the road embankment. */
export const RIDGES: Array<[number, number, number, number]> = [
  // Left of the road: transverse (across the view) and longitudinal (receding) bunds.
  [-80, 1.2, -1, 1.2], [-80, -14.5, -1.5, -14.5], [-80, -29.5, -1, -29.5],
  [-12.5, 12, -12.5, PADDY_BACK], [-29, 12, -29, PADDY_BACK], [-50, 12, -50, PADDY_BACK],
  // Right of the road.
  [3.5, -5.2, 80, -5.2], [6.5, -19.5, 80, -19.5],
  [13.5, 12, 13.5, -19.5], [29, 12, 29, PADDY_BACK], [48, 12, 48, PADDY_BACK],
  [YARD.x1, -19.5, YARD.x1, PADDY_BACK],
];

/** Is a ground point inside a flooded paddy (not road, yard or ridge)? */
export function inPaddy(x: number, z: number, margin = 0) {
  if (z < PADDY_BACK + margin || z > 13) return false;
  if (Math.abs(x - pathX(z)) < ROAD_HALF + .95 + margin) return false;
  if (x > YARD.x0 - margin && x < YARD.x1 + margin && z > YARD.z0 - margin && z < YARD.z1 + margin) return false;
  for (const [x0, z0, x1, z1] of RIDGES) {
    const minX = Math.min(x0, x1), maxX = Math.max(x0, x1), minZ = Math.min(z0, z1), maxZ = Math.max(z0, z1);
    if (x > minX - .45 - margin && x < maxX + .45 + margin && z > minZ - .45 - margin && z < maxZ + .45 + margin) return false;
  }
  return true;
}

/* ------------------------------------------------------------- the sky */

/** Moonlit cloud deck, shared by the dome and the paddy reflections. Needs GLSL_NIGHT_SKY. */
export const GLSL_RURAL_CLOUDS = /* glsl */ `
uniform float uCloudTime;
uniform vec3 uCloudLit;
uniform vec3 uCloudShade;
float ruralCloudField(vec2 q) {
  vec3 p = vec3(q * 0.27 + vec2(uCloudTime * 0.0012, uCloudTime * 0.0005), 0.37);
  float n = skyNoise(p) * 0.62 + skyNoise(p * 2.9 + vec3(0.31, 0.17, 0.53)) * 0.28 + texture(uSkyNoise, p * 7.3 + 0.7).b * 0.1;
  return n;
}
/** Plane coordinates of the deck along a view direction (gently curved toward the horizon). */
vec2 ruralCloudPlane(vec3 d) { return d.xz / (max(d.y, 0.0) + 0.075); }
float ruralCloudCoverage(vec3 d) {
  float cov = 0.535;
  // Broken stratocumulus banks low in the sky, thinner altocumulus overhead.
  cov -= 0.06 * (1.0 - smoothstep(0.04, 0.3, d.y));
  cov -= 0.045 * smoothstep(0.0, 0.7, d.x) * (1.0 - smoothstep(0.2, 0.55, d.y));
  cov += 0.05 * smoothstep(0.55, 0.9, d.y);
  // A small clear patch keeps the moon's disc readable; nearby cloud edges catch its light.
  float m = dot(d, uMoonDir);
  cov += 0.12 * smoothstep(0.992, 0.9985, m);
  vec3 bank = normalize(uMoonDir + vec3(0.16, -0.075, 0.03));
  cov -= 0.075 * smoothstep(0.955, 0.995, dot(d, bank));
  return cov;
}
float ruralCloudDensity(vec3 d) {
  vec2 q = ruralCloudPlane(d);
  float c = ruralCloudCoverage(d);
  return smoothstep(c, c + 0.17, ruralCloudField(q));
}
/** Colour and alpha of the cloud deck. lit=1 marches two samples toward the moon for self-shadow. */
vec4 ruralClouds(vec3 d, float lit) {
  if (d.y <= 0.0) return vec4(0.0);
  vec2 q = ruralCloudPlane(d);
  float c = ruralCloudCoverage(d);
  float n = ruralCloudField(q);
  float density = smoothstep(c, c + 0.17, n);
  if (density <= 0.001) return vec4(0.0);
  vec2 toMoon = normalize(uMoonDir.xz + 1e-4);
  float shadow = 0.0;
  if (lit > 0.5) {
    shadow = smoothstep(c, c + 0.2, ruralCloudField(q + toMoon * 0.55)) + 0.6 * smoothstep(c, c + 0.2, ruralCloudField(q + toMoon * 1.3));
  } else {
    shadow = density * 1.2;
  }
  float towardMoon = exp(-shadow * 1.9);
  float cosT = dot(d, uMoonDir);
  // Forward scattering lights the thin edges near the moon (silver lining); powder darkens thick cores.
  float g = 0.62;
  float phase = (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * cosT, 1.5) * 0.08;
  float thin = 1.0 - smoothstep(0.15, 0.9, density);
  float powder = 1.0 - exp(-density * 3.0);
  vec3 col = uCloudShade * (0.55 + 0.45 * smoothstep(0.0, 0.6, d.y)) * (0.75 + 0.25 * n);
  col += uCloudLit * towardMoon * (0.035 * powder + phase * (0.08 + 1.1 * thin * thin));
  float horizon = smoothstep(0.0, 0.07, d.y);
  return vec4(col, density * 0.94 * horizon);
}
`;

const CLOUD_DOME_VERTEX = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 clip = projectionMatrix * viewMatrix * vec4(cameraPosition + position * 400.0, 1.0);
  clip.z = clip.w * 0.9999985;
  gl_Position = clip;
}`;

const CLOUD_DOME_FRAGMENT = /* glsl */ `
${GLSL_NIGHT_SKY}
${GLSL_RURAL_CLOUDS}
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  vec4 cloud = ruralClouds(d, 1.0);
  if (cloud.a <= 0.002) discard;
  gl_FragColor = vec4(cloud.rgb, cloud.a);
}`;

export function cloudUniforms() {
  return {
    uCloudTime: { value: 0 },
    uCloudLit: { value: new THREE.Vector3(.5, .56, .68) },
    uCloudShade: { value: new THREE.Vector3(.0095, .0135, .024) },
  };
}

/** Cloud deck dome drawn over the stars (alpha), on the far plane like the sky. */
export function createCloudDome(skyUniforms: Record<string, THREE.IUniform>, clouds: ReturnType<typeof cloudUniforms>) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 24, 0, Math.PI * 2, 0, Math.PI * .52), new THREE.ShaderMaterial({
    uniforms: { ...skyUniforms, ...clouds }, vertexShader: CLOUD_DOME_VERTEX, fragmentShader: CLOUD_DOME_FRAGMENT,
    side: THREE.BackSide, transparent: true, depthWrite: false,
  }));
  mesh.frustumCulled = false; mesh.renderOrder = -8; mesh.name = 'Moonlit cloud deck';
  return mesh;
}

/* ----------------------------------------------------------- paddy water */

export const SKYLINE_BINS = 512;
export const SKYLINE_MAX = .32;

const WATER_VERTEX = /* glsl */ `
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}`;

const WATER_FRAGMENT = /* glsl */ `
precision highp float;
${KP_NOISE}
${GLSL_NIGHT_SKY}
${GLSL_RURAL_CLOUDS}
uniform float uTime;
uniform sampler2D uSkyline;
uniform vec3 uTreeline;
uniform vec3 uTreelineHaze;
uniform vec3 uLampPos[3];
uniform vec3 uLampColor[3];
uniform vec3 uMurk;
uniform vec3 uFogColor;
uniform float uFog;
varying vec3 vWorld;
float ripple(vec2 p, float footprint) {
  // Wind ripples drift slowly; cat's-paw patches come and go.
  vec3 q = vec3(p * 0.55, uTime * 0.045);
  float gust = smoothstep(0.35, 0.7, texture(uSkyNoise, vec3(p * 0.012 + vec2(uTime * 0.004, 0.0), 0.71)).r);
  float n = (texture(uSkyNoise, q).g - 0.5) + (texture(uSkyNoise, q * 2.3 + vec3(0.0, 0.0, uTime * 0.03)).b - 0.5) * 0.5;
  return n * (0.25 + 0.75 * gust) / (1.0 + footprint * footprint * 9.0);
}
// Slow, sparse rings where a water strider or a drop disturbs the surface.
float rings(vec2 p) {
  float h = 0.0;
  vec2 cell = floor(p / 2.3);
  for (int k = 0; k < 4; k++) {
    vec2 c = cell + vec2(float(k / 2), float(k % 2));
    vec3 r = bwHash3(vec3(c, 3.0));
    float period = 5.0 + r.z * 6.0;
    float age = mod(uTime + r.x * period, period);
    vec2 o = (c + r.xy) * 2.3;
    float d = length(p - o);
    float front = age * 0.22;
    h += sin((d - front) * 34.0) * exp(-pow((d - front) / 0.05, 2.0)) * exp(-age * 0.7) * step(r.z, 0.55);
  }
  return h;
}
void main() {
  vec2 p = vWorld.xz;
  float footprint = max(length(dFdx(p)), length(dFdy(p)));
  float e = clamp(footprint * 0.7, 0.015, 0.5);
  float h0 = ripple(p, footprint) * 0.018 + rings(p) * 0.0012 / (1.0 + footprint * 30.0);
  float hx = ripple(p + vec2(e, 0.0), footprint) * 0.018 + rings(p + vec2(e, 0.0)) * 0.0012 / (1.0 + footprint * 30.0);
  float hz = ripple(p + vec2(0.0, e), footprint) * 0.018 + rings(p + vec2(0.0, e)) * 0.0012 / (1.0 + footprint * 30.0);
  vec3 n = normalize(vec3(-(hx - h0) / e, 1.0, -(hz - h0) / e));
  vec3 V = normalize(cameraPosition - vWorld);
  vec3 R = reflect(-V, n);
  R.y = max(R.y, 0.002);
  float fresnel = 0.02 + 0.98 * pow(1.0 - max(dot(n, V), 0.0), 5.0);
  float pixelAngle = max(length(fwidth(R)), 1e-4);
  vec3 reflected = bwNightSkyBase(R) + bwMoon(R, pixelAngle * 2.5);
  vec4 cloud = ruralClouds(R, 0.0);
  reflected = mix(reflected, cloud.rgb, cloud.a);
  // Treeline, hills and the farmhouse mirrored from a skyline table (elevation by azimuth).
  float azimuth = atan(R.x, -R.z);
  vec4 skyline = texture(uSkyline, vec2(azimuth / 6.2831853 + 0.5, 0.5));
  float ridge = skyline.r * ${SKYLINE_MAX.toFixed(3)};
  float soften = 0.004 + pixelAngle * 1.5;
  float elevation = asin(clamp(R.y, 0.0, 1.0));
  float hill = 1.0 - smoothstep(ridge - soften, ridge + soften, elevation);
  vec3 hillColor = mix(uTreeline, uTreelineHaze, skyline.g) * (0.75 + 0.5 * smoothstep(0.0, ridge + 1e-3, elevation));
  reflected = mix(reflected, hillColor, hill);
  // Warm windows and the yard lamp drawn out into streaks by the ripples.
  vec3 lamps = vec3(0.0);
  for (int i = 0; i < 3; i++) {
    vec3 toLamp = uLampPos[i] - vWorld;
    float c = max(dot(R, normalize(toLamp)), 0.0);
    lamps += uLampColor[i] * (pow(c, 1800.0) * 1.6 + pow(c, 160.0) * 0.06);
  }
  float murkDepth = 0.6 + 0.4 * texture(uSkyNoise, vec3(p * 0.07, 0.21)).r;
  // The moon's glitter path from capillary ripples.
  vec3 q2 = vec3(p * 2.6, uTime * 0.3);
  vec2 cap = vec2(texture(uSkyNoise, q2).g - 0.5, texture(uSkyNoise, q2 + vec3(0.37, 0.11, 0.5)).g - 0.5) * 0.28 / (1.0 + footprint * footprint * 40.0);
  vec3 Rg = reflect(-V, normalize(n + vec3(cap.x, 0.0, cap.y)));
  float glint = pow(max(dot(Rg, uMoonDir), 0.0), 700.0) * 5.0 + pow(max(dot(Rg, uMoonDir), 0.0), 90.0) * 0.12;
  vec3 color = uMurk * murkDepth + (reflected + lamps) * fresnel + uMoonColor * 0.0035 * glint * (1.0 - hill) * fresnel * 4.0;
  float dist = length(cameraPosition - vWorld);
  color = mix(color, uFogColor, uFog * (1.0 - exp(-dist * 0.012)));
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export function createPaddyWaterMaterial(skyUniforms: Record<string, THREE.IUniform>, clouds: ReturnType<typeof cloudUniforms>, skyline: THREE.Texture, time: { value: number }) {
  return new THREE.ShaderMaterial({
    uniforms: {
      ...skyUniforms, ...clouds, uTime: time, uSkyline: { value: skyline },
      uTreeline: { value: new THREE.Vector3(.0012, .0019, .0026) }, uTreelineHaze: { value: new THREE.Vector3(.008, .012, .022) },
      uLampPos: { value: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()] },
      uLampColor: { value: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()] },
      uMurk: { value: new THREE.Vector3(.0016, .0021, .0016) },
      uFogColor: { value: new THREE.Vector3(.012, .018, .032) }, uFog: { value: 0 },
    },
    vertexShader: WATER_VERTEX,
    fragmentShader: WATER_FRAGMENT,
  });
}

/** A one-row texture of skyline elevation (r) and haze (g) by azimuth, seen from `eye`. */
export function skylineTexture(eye: THREE.Vector3, samples: Array<[number, number, number, number]>) {
  const elevation = new Float32Array(SKYLINE_BINS), haze = new Float32Array(SKYLINE_BINS);
  // samples: x, y, z (top point) and horizontal radius.
  for (const [x, y, z, radius] of samples) {
    const dx = x - eye.x, dz = z - eye.z, distance = Math.max(1, Math.hypot(dx, dz));
    const azimuth = Math.atan2(dx, -dz), spread = Math.atan2(radius, distance);
    const e = Math.atan2(y - eye.y, distance);
    const b0 = Math.floor(((azimuth - spread) / (Math.PI * 2) + .5) * SKYLINE_BINS), b1 = Math.ceil(((azimuth + spread) / (Math.PI * 2) + .5) * SKYLINE_BINS);
    for (let b = b0; b <= b1; b++) {
      const bin = ((b % SKYLINE_BINS) + SKYLINE_BINS) % SKYLINE_BINS;
      // Rounded crowns: lower toward the sides of each sample.
      const u = (((b + .5) / SKYLINE_BINS - .5) * Math.PI * 2 - azimuth) / Math.max(spread, 1e-4);
      const local = e - Math.atan2(y * .18 * u * u, distance);
      if (local > elevation[bin]) { elevation[bin] = local; haze[bin] = THREE.MathUtils.clamp((distance - 30) / 300, 0, 1); }
    }
  }
  const data = new Uint8Array(SKYLINE_BINS * 4);
  for (let i = 0; i < SKYLINE_BINS; i++) {
    data[i * 4] = Math.round(THREE.MathUtils.clamp(elevation[i] / SKYLINE_MAX, 0, 1) * 255);
    data[i * 4 + 1] = Math.round(haze[i] * 255);
    data[i * 4 + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, SKYLINE_BINS, 1, THREE.RGBAFormat);
  texture.magFilter = texture.minFilter = THREE.LinearFilter;
  texture.wrapS = THREE.RepeatWrapping; texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return { texture, elevation, haze };
}

/* ------------------------------------------------------------ surfaces */

/** Adds world position/normal varyings to a standard material and returns the patch helper. */
function worldPatch(material: THREE.MeshStandardMaterial, key: string, header: string, patch: (shader: THREE.WebGLProgramParametersWithUniforms) => void) {
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.vertexShader = beforeMain(shader.vertexShader, 'varying vec3 vRwWorld;\nvarying vec3 vRwNormal;').replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
{
  vec4 rwP = vec4(transformed, 1.0);
  vec3 rwN = objectNormal;
  #ifdef USE_INSTANCING
    rwP = instanceMatrix * rwP; rwN = mat3(instanceMatrix) * rwN;
  #endif
  vRwWorld = (modelMatrix * rwP).xyz;
  vRwNormal = normalize(mat3(modelMatrix) * rwN);
}`);
    shader.fragmentShader = beforeMain(shader.fragmentShader, `varying vec3 vRwWorld;\nvarying vec3 vRwNormal;\n${withNoise(shader.fragmentShader)}\n${header}`);
    patch(shader);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|kp-rural-${key}`;
  return material;
}

const bump = (fn: string, scale: string) => /* glsl */ `
{
  float bE = 0.006;
  float bH = ${fn}(vRwWorld);
  vec3 bG = vec3(${fn}(vRwWorld + vec3(bE, 0.0, 0.0)) - bH, ${fn}(vRwWorld + vec3(0.0, bE, 0.0)) - bH, ${fn}(vRwWorld + vec3(0.0, 0.0, bE)) - bH) / bE;
  bG *= ${scale};
  vec3 bV = (viewMatrix * vec4(bG, 0.0)).xyz;
  normal = normalize(normal - (bV - dot(bV, normal) * normal));
}`;

/** Cracked concrete farm road: slab joints, hairline cracks, tyre polish, crumbling edges with moss, damp patches and puddles that mirror the sky. */
export function createRoadMaterial() {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .7, metalness: 0 });
  return worldPatch(material, 'road-v2', `${PATH_GLSL}
float roadLateral(vec3 p) { return (p.x - ruralPathX(p.z)) / ${ROAD_HALF.toFixed(3)}; }
float roadAlong(vec3 p) { return -p.z; }
// Map cracking: edges of an irregular cell pattern, only where the slab has failed.
vec2 roadCells(vec2 x) {
  vec2 n = floor(x), f = fract(x);
  float d1 = 8.0, d2 = 8.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 g = vec2(float(i), float(j));
    vec2 o = bwHash3(vec3(n + g, 17.0)).xy;
    float d = length(g + o - f);
    if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
  }
  return vec2(d1, d2);
}
float roadCrack(vec3 p) {
  vec2 warp = vec2(bwNoise(vec3(p.xz * 3.0, 1.0)), bwNoise(vec3(p.xz * 3.0, 5.0))) * 0.06;
  vec2 c = roadCells(p.xz * vec2(1.1, 0.75) + warp);
  float edge = 1.0 - smoothstep(0.0, 0.035, c.y - c.x);
  float failed = smoothstep(0.05, 0.4, bwNoise(vec3(p.x * 0.3, 2.0, p.z * 0.22)));
  // One wandering transverse crack per slab, as concrete shrinks.
  float along = -p.z + bwNoise(vec3(p.x * 0.9, 3.0, p.z * 0.1)) * 0.35;
  float slabMid = abs(fract(along / 4.8) - 0.5) * 4.8;
  float transverse = (1.0 - smoothstep(0.0, 0.018, slabMid)) * step(0.35, bwHash3(vec3(floor(along / 4.8), 9.0, 2.0)).x);
  return max(edge * failed, transverse);
}
float roadPuddle(vec3 p) {
  float lat = roadLateral(p);
  float rut = exp(-pow((abs(lat) - 0.52) / 0.2, 2.0)) * 0.7 + smoothstep(0.75, 1.0, abs(lat)) * 0.5;
  float low = bwFbm3(vec3(p.x * 0.7, 0.0, p.z * 0.42) + 7.0) * 0.8 + bwNoise(vec3(p.xz * 2.1, 4.0).xzy) * 0.1;
  return smoothstep(0.27, 0.31, low + rut * 0.3 - 0.1);
}
float roadPuddleHalo(vec3 p) {
  float lat = roadLateral(p);
  float rut = exp(-pow((abs(lat) - 0.52) / 0.2, 2.0)) * 0.7 + smoothstep(0.75, 1.0, abs(lat)) * 0.5;
  float low = bwFbm3(vec3(p.x * 0.7, 0.0, p.z * 0.42) + 7.0) * 0.8 + bwNoise(vec3(p.xz * 2.1, 4.0).xzy) * 0.1;
  return smoothstep(0.1, 0.24, low + rut * 0.3 - 0.1);
}
float roadHeight(vec3 p) {
  float along = roadAlong(p);
  float joint = 1.0 - smoothstep(0.0, 0.025, abs(fract(along / 4.8 + 0.5) - 0.5) * 4.8);
  float aggregate = bwNoise(p * 38.0) * 0.25 + bwNoise(p * 9.0) * 0.2;
  float edge = smoothstep(0.88, 1.0, abs(roadLateral(p))) * bwNoise(p * 6.0) * 0.6;
  return aggregate - joint * 1.6 - roadCrack(p) * 1.4 + edge;
}`, shader => {
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 rp = vRwWorld;
float rLat = roadLateral(rp);
float rAlong = roadAlong(rp);
float rSlab = floor(rAlong / 4.8 + 0.5);
vec3 rSlabTone = bwHash3(vec3(rSlab, 7.0, 1.0));
vec3 concrete = mix(vec3(0.44, 0.43, 0.4), vec3(0.56, 0.55, 0.51), rSlabTone.x);
concrete *= 0.86 + 0.18 * bwFbm3(rp * vec3(0.6, 1.0, 0.25) + rSlabTone * 11.0);
// Aggregate speckle and fine pores.
float speck = bwValue(rp * 61.0);
concrete *= 0.92 + 0.16 * smoothstep(0.55, 0.95, speck) - 0.08 * smoothstep(0.45, 0.05, speck);
// Tyre tracks are worn darker and smoother; the crown between them collects grit.
float track = exp(-pow((abs(rLat) - 0.52) / 0.17, 2.0));
concrete *= 1.0 - 0.13 * track;
// Joints, cracks and the crumbling edge hold soil and moss.
float joint = 1.0 - smoothstep(0.0, 0.03, abs(fract(rAlong / 4.8 + 0.5) - 0.5) * 4.8);
float crack = roadCrack(rp);
float edge = smoothstep(0.82, 1.0, abs(rLat));
float soil = max(max(joint, crack), edge * smoothstep(-0.2, 0.4, bwFbm3(rp * 1.6)));
float moss = soil * smoothstep(-0.1, 0.5, bwNoise(rp * 2.3 + 5.0));
concrete = mix(concrete, vec3(0.1, 0.085, 0.07), soil * 0.75);
concrete = mix(concrete, vec3(0.08, 0.11, 0.05), moss * 0.7);
// Damp dark patches and puddles.
float damp = smoothstep(0.0, 0.5, bwFbm3(rp * vec3(0.4, 1.0, 0.18) + 2.0)) * 0.6 + edge * 0.4;
float rPuddle = roadPuddle(rp);
concrete *= 1.0 - damp * 0.3 - roadPuddleHalo(rp) * 0.35;
concrete = mix(concrete, concrete * 0.32, rPuddle);
diffuseColor.rgb *= concrete;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(0.78, 0.55, track) - damp * 0.3;
roughnessFactor = mix(roughnessFactor, 0.95, soil * 0.6);
roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.55, roadPuddleHalo(rp));
roughnessFactor = mix(roughnessFactor, 0.03, rPuddle);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  float bE = 0.008;
  float bH = roadHeight(vRwWorld);
  vec3 bG = vec3(roadHeight(vRwWorld + vec3(bE, 0.0, 0.0)) - bH, 0.0, roadHeight(vRwWorld + vec3(0.0, 0.0, bE)) - bH) / bE;
  bG *= 0.0035 * (1.0 - rPuddle);
  vec3 bV = (viewMatrix * vec4(bG, 0.0)).xyz;
  normal = normalize(normal - (bV - dot(bV, normal) * normal));
}`);
  });
}

/** Earth of the paddy ridges, road shoulders and the yard: wet mud near the water, grass and clover cover above. */
export function createEarthMaterial(key: string, o: { grass: number; mud?: number; packed?: number }) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .9 });
  return worldPatch(material, `earth-${key}`, `
float earthHeight(vec3 p) { return bwNoise(p * 9.0) * 0.5 + bwNoise(p * 27.0) * 0.3 + bwValue(p * 63.0) * 0.2; }`, shader => {
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 ep = vRwWorld;
float wetLine = 1.0 - smoothstep(0.02, ${(.14 + (o.mud ?? 0) * .1).toFixed(3)}, ep.y);
vec3 mud = mix(vec3(0.075, 0.06, 0.045), vec3(0.13, 0.105, 0.075), bwValue(ep * 7.0));
float cover = smoothstep(-0.3, 0.35, bwFbm3(ep * 1.3 + 3.0) + ${(o.grass - .5).toFixed(3)});
cover *= 1.0 - wetLine * 0.8;
vec3 grass = mix(vec3(0.07, 0.11, 0.035), vec3(0.13, 0.17, 0.06), bwValue(ep * 13.0)) * (0.8 + 0.4 * bwValue(ep * 41.0));
vec3 earth = mix(mud, grass, cover);
${o.packed ? `float packedPath = ${o.packed.toFixed(3)} * smoothstep(0.2, 0.6, bwFbm3(ep * 0.4)); earth = mix(earth, vec3(0.16, 0.14, 0.11) * (0.85 + 0.3 * bwValue(ep * 19.0)), packedPath);` : ''}
earth *= mix(1.0, 0.55, wetLine);
diffuseColor.rgb *= earth;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(0.92, 0.3, wetLine);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
${bump('earthHeight', '0.004')}`);
  });
}

/** Plaster over the farmhouse block walls: chalky, rain-streaked from the eaves, grimy at the plinth. */
export function createRenderMaterial(color: THREE.ColorRepresentation, key: string, plinth: number) {
  const material = new THREE.MeshStandardMaterial({ color, roughness: .88 });
  return worldPatch(material, `render-${key}`, `
float renderHeight(vec3 p) { return bwNoise(p * 14.0) * 0.4 + bwValue(p * 70.0) * 0.6; }`, shader => {
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 p = vRwWorld;
  float mottle = bwFbm3(p * 0.9 + 4.0);
  float streak = smoothstep(0.1, 0.6, bwFbm3(vec3(p.x * 4.0, p.y * 0.3, p.z * 4.0) + 9.0));
  float grime = 1.0 - smoothstep(0.0, 0.9, p.y - ${plinth.toFixed(3)});
  diffuseColor.rgb *= (0.9 + 0.16 * mottle) * (1.0 - 0.14 * streak) * (1.0 - 0.45 * grime);
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.7, 0.78, 0.62), grime * smoothstep(0.0, 0.5, bwNoise(p * 3.0)) * 0.5);
}`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
${bump('renderHeight', '0.0025')}`);
  });
}

/** Grey cement roof tiles in courses running down the slope, with lichen and moonlit sheen on their crowns. */
export function createRoofTileMaterial(key: string, slope: THREE.Vector3) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .62, metalness: 0 });
  const s = slope.clone().normalize();
  return worldPatch(material, `tile-${key}`, `
const vec3 tileDown = vec3(${s.x.toFixed(4)}, ${s.y.toFixed(4)}, ${s.z.toFixed(4)});
vec2 tileUv(vec3 p) {
  vec3 across = normalize(cross(tileDown, vec3(0.0, 1.0, 0.0)));
  return vec2(dot(p, across), dot(p, tileDown));
}
float tileHeight(vec3 p) {
  vec2 uv = tileUv(p);
  float wave = sin(uv.x / 0.29 * 6.2831853);
  float course = fract(uv.y / 0.34);
  return wave * 0.5 + 0.5 - smoothstep(0.86, 1.0, course) * 0.9 + bwNoise(p * 30.0) * 0.08;
}`, shader => {
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 p = vRwWorld;
  vec2 uv = tileUv(p);
  vec2 cell = floor(vec2(uv.x / 0.29, uv.y / 0.34));
  vec3 h = bwHash3(vec3(cell, 13.0));
  float wave = sin(uv.x / 0.29 * 6.2831853) * 0.5 + 0.5;
  vec3 tile = mix(vec3(0.17, 0.19, 0.21), vec3(0.26, 0.28, 0.3), h.x) * (0.85 + 0.25 * wave);
  float lichen = smoothstep(0.45, 0.8, bwFbm3(p * 1.8 + h * 3.0)) * 0.5;
  tile = mix(tile, vec3(0.3, 0.32, 0.24), lichen);
  float gap = smoothstep(0.88, 1.0, fract(uv.y / 0.34));
  tile *= 1.0 - gap * 0.6;
  diffuseColor.rgb *= tile;
}`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  float bE = 0.01;
  float bH = tileHeight(vRwWorld);
  vec3 bG = vec3(tileHeight(vRwWorld + vec3(bE, 0.0, 0.0)) - bH, tileHeight(vRwWorld + vec3(0.0, bE, 0.0)) - bH, tileHeight(vRwWorld + vec3(0.0, 0.0, bE)) - bH) / bE;
  bG *= 0.03;
  vec3 bV = (viewMatrix * vec4(bG, 0.0)).xyz;
  normal = normalize(normal - (bV - dot(bV, normal) * normal));
}`);
  });
}

/** Weathered softwood (posts, boards, the 평상): grain along `axis`, greyed by sun and rain. */
export function createTimberMaterial(key: string, axis: 'x' | 'y' | 'z', color: THREE.ColorRepresentation) {
  const material = new THREE.MeshStandardMaterial({ color, roughness: .82 });
  const across = axis === 'y' ? 'xz' : axis === 'x' ? 'yz' : 'xy';
  return worldPatch(material, `timber-${key}`, `
float timberGrain(vec3 p) { return bwNoise(vec3(p.${axis} * 1.4, p.${across} * 46.0)) * 0.6 + bwNoise(vec3(p.${axis} * 6.0, p.${across} * 140.0)) * 0.4; }`, shader => {
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  float g = timberGrain(vRwWorld);
  float weather = bwFbm3(vRwWorld * 0.8);
  diffuseColor.rgb *= (0.8 + 0.3 * g) * (0.85 + 0.25 * weather);
}`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
${bump('timberGrain', '0.0015')}`);
  });
}

/* ---------------------------------------------------------- vegetation */

type Push = (x: number, y: number, z: number, c: THREE.Color) => number;
function builder() {
  const positions: number[] = [], colors: number[] = [], indices: number[] = [], normals: number[] = [];
  const push: Push = (x, y, z, c) => { positions.push(x, y, z); colors.push(c.r, c.g, c.b); return positions.length / 3 - 1; };
  return {
    positions, colors, indices, normals, push,
    geometry(computeNormals = true) {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      if (normals.length) g.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      g.setIndex(indices);
      if (computeNormals && !normals.length) g.computeVertexNormals();
      return g;
    },
  };
}

/** A hill of young transplanted rice: arching leaf blades from one base. Object y spans 0..~0.36. */
export function riceHill(seed: number, blades: number, segments: number, height: number) {
  const random = seeded(seed);
  const b = builder();
  const base = new THREE.Color('#3f5a20'), tip = new THREE.Color('#a6bf5c');
  for (let k = 0; k < blades; k++) {
    const a = k * 2.39996 + random() * .6;
    const h = height * (.62 + random() * .45);
    const lean = .12 + random() * .38;
    const w0 = .007 + random() * .004;
    const dx = Math.cos(a), dz = Math.sin(a);
    const ox = (random() - .5) * .025, oz = (random() - .5) * .025;
    const row: number[] = [];
    for (let j = 0; j <= segments; j++) {
      const t = j / segments;
      // The blade rises, then arches outward and down toward its tip.
      const out = Math.sin(lean) * h * Math.pow(t, 1.6) * 1.2;
      const y = h * (t - .32 * lean * t * t * t);
      const w = j === segments ? 0 : w0 * (1 - .75 * t);
      const c = base.clone().lerp(tip, Math.pow(t, 1.3) * (.7 + random() * .3));
      const cx = ox + dx * out, cz = oz + dz * out;
      row.push(b.push(cx - dz * w, y, cz + dx * w, c), b.push(cx + dz * w, y, cz - dx * w, c));
    }
    for (let j = 0; j < segments; j++) {
      const i0 = row[j * 2], i1 = row[j * 2 + 1], i2 = row[j * 2 + 2], i3 = row[j * 2 + 3];
      if (j === segments - 1) b.indices.push(i0, i1, i2); else b.indices.push(i0, i1, i3, i0, i3, i2);
    }
  }
  return b.geometry();
}

/** Ridge and shoulder grass: a clump of narrow blades. */
export function grassClump(seed: number, blades: number, height: number) {
  const random = seeded(seed);
  const b = builder();
  for (let k = 0; k < blades; k++) {
    const a = random() * Math.PI * 2, r = random() * .07, h = height * (.5 + random() * .6), lean = .1 + random() * .5;
    const dx = Math.cos(a), dz = Math.sin(a), w = .007 + random() * .006;
    const c0 = new THREE.Color('#33471c'), c1 = new THREE.Color().setHSL(.2 + random() * .07, .4 + random() * .2, .32 + random() * .18);
    const x0 = Math.cos(a) * r, z0 = Math.sin(a) * r;
    const m = [b.push(x0 - dz * w, 0, z0 + dx * w, c0), b.push(x0 + dz * w, 0, z0 - dx * w, c0)];
    const mx = x0 + dx * lean * h * .35, mz = z0 + dz * lean * h * .35;
    m.push(b.push(mx - dz * w * .6, h * .55, mz + dx * w * .6, c0.clone().lerp(c1, .6)), b.push(mx + dz * w * .6, h * .55, mz - dx * w * .6, c0.clone().lerp(c1, .6)));
    const tx = x0 + dx * lean * h, tz = z0 + dz * lean * h;
    m.push(b.push(tx, h * (1 - lean * .25), tz, c1));
    b.indices.push(m[0], m[1], m[3], m[0], m[3], m[2], m[2], m[3], m[4]);
  }
  return b.geometry();
}

/** A low rosette of oval leaves (plantain, shepherd's purse) hugging the bank. */
export function rosette(seed: number) {
  const random = seeded(seed);
  const b = builder();
  const leaves = 6 + Math.floor(random() * 4);
  for (let k = 0; k < leaves; k++) {
    const a = k / leaves * Math.PI * 2 + random() * .4, l = .1 + random() * .08, w = l * (.3 + random() * .15), lift = .02 + random() * .05;
    const dx = Math.cos(a), dz = Math.sin(a);
    const c = new THREE.Color().setHSL(.22 + random() * .06, .3 + random() * .15, .13 + random() * .08);
    const tip = c.clone().multiplyScalar(1.25);
    const i0 = b.push(0, .005, 0, c);
    const i1 = b.push(dx * l * .45 - dz * w, lift * .7, dz * l * .45 + dx * w, c), i2 = b.push(dx * l * .45 + dz * w, lift * .7, dz * l * .45 - dx * w, c);
    const i3 = b.push(dx * l, lift, dz * l, tip);
    const i4 = b.push(dx * l * .45, lift * .9, dz * l * .45, c);
    b.indices.push(i0, i4, i1, i0, i2, i4, i1, i4, i3, i4, i2, i3);
  }
  return b.geometry();
}

/** Daisy fleabane (개망초): wiry branching stems with small white ray flowers, common on paddy ridges in early summer. */
export function fleabane(seed: number) {
  const random = seeded(seed);
  const b = builder();
  const stem = new THREE.Color('#3c5524'), ray = new THREE.Color('#e9ecf2'), disc = new THREE.Color('#e2c341');
  const h = .45 + random() * .35;
  const ribbon = (ax: number, ay: number, az: number, bx: number, by: number, bz: number, w: number) => {
    const i = b.push(ax - w, ay, az, stem), j = b.push(ax + w, ay, az, stem), k = b.push(bx + w * .6, by, bz, stem), l = b.push(bx - w * .6, by, bz, stem);
    b.indices.push(i, j, k, i, k, l);
    const m = b.push(ax, ay, az - w, stem), n = b.push(ax, ay, az + w, stem), o = b.push(bx, by, bz + w * .6, stem), p = b.push(bx, by, bz - w * .6, stem);
    b.indices.push(m, n, o, m, o, p);
  };
  const top = [(random() - .5) * .06, h, (random() - .5) * .06];
  ribbon(0, 0, 0, top[0], top[1], top[2], .004);
  const heads = 7 + Math.floor(random() * 7);
  for (let k = 0; k < heads; k++) {
    const a = random() * Math.PI * 2, reach = .03 + random() * .11, lift = .02 + random() * .07;
    const sx = top[0] * .8, sy = h * (.72 + random() * .2), sz = top[2] * .8;
    const fx = sx + Math.cos(a) * reach, fy = sy + lift, fz = sz + Math.sin(a) * reach;
    ribbon(sx, sy, sz, fx, fy, fz, .0025);
    // A flat flower head facing up: white ray florets around a yellow disc.
    const r = .0055 + random() * .0025, centre = b.push(fx, fy + .002, fz, disc);
    const ring: number[] = [];
    for (let i = 0; i < 8; i++) { const t = i / 8 * Math.PI * 2; ring.push(b.push(fx + Math.cos(t) * r * .45, fy + .0015, fz + Math.sin(t) * r * .45, disc)); }
    for (let i = 0; i < 8; i++) b.indices.push(centre, ring[(i + 1) % 8], ring[i]);
    const outer: number[] = [];
    for (let i = 0; i < 12; i++) { const t = i / 12 * Math.PI * 2; outer.push(b.push(fx + Math.cos(t) * r * 1.9, fy - .001, fz + Math.sin(t) * r * 1.9, ray)); }
    const inner: number[] = [];
    for (let i = 0; i < 12; i++) { const t = i / 12 * Math.PI * 2; inner.push(b.push(fx + Math.cos(t) * r * .45, fy + .001, fz + Math.sin(t) * r * .45, ray)); }
    for (let i = 0; i < 12; i++) { const n = (i + 1) % 12; b.indices.push(inner[i], inner[n], outer[n], inner[i], outer[n], outer[i]); }
  }
  const g = b.geometry(false);
  // Flowers face the sky: an upward normal everywhere reads as soft petals rather than ribbons.
  const normals = new Float32Array(g.attributes.position.count * 3);
  for (let i = 0; i < normals.length; i += 3) { normals[i + 1] = 1; }
  g.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  return g;
}

/** Foliage-lit, wind-swayed vertex-coloured plant material with an optional local touch bend. */
export function plantMaterial(key: string, time: { value: number }, o: { height: number; sway: number; flutter?: number; translucency?: THREE.ColorRepresentation; roughness?: number; touch?: { value: THREE.Vector3 } }) {
  const material = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: o.roughness ?? .55 });
  if (o.touch) {
    const touch = o.touch;
    material.onBeforeCompile = shader => {
      shader.uniforms.uRuralTouch = touch;
      shader.vertexShader = beforeMain(shader.vertexShader, 'uniform vec3 uRuralTouch;').replace('#include <begin_vertex>', `#include <begin_vertex>
#ifdef USE_INSTANCING
{
  vec3 root = vec3(instanceMatrix[3]);
  vec2 away = root.xz - uRuralTouch.xy;
  float bend = exp(-dot(away, away) * 0.9) * uRuralTouch.z;
  float h = max(position.y, 0.0) / ${o.height.toFixed(3)};
  vec2 dir = normalize(away + vec2(0.001, 0.0));
  vec3 push = mat3(inverse(mat3(instanceMatrix))) * vec3(dir.x, -0.35, dir.y);
  transformed += push * bend * h * h * ${(o.height * .45).toFixed(3)};
}
#endif`);
    };
  }
  return applyFoliageShading(material, {
    key: `rural-${key}`,
    wind: { time, mode: 'height', height: o.height, sway: o.sway, flutter: o.flutter ?? o.sway * .3, direction: [1, -.35], speed: .8 },
    translucency: { tint: o.translucency ?? '#cde68a', back: .25, forward: .5 },
  });
}

/** Needle tufts for pine crowns, drawn in code. */
export function pineNeedleTexture(seed: number) {
  const size = 256, element = document.createElement('canvas'); element.width = size * 2; element.height = size;
  const ctx = element.getContext('2d', { willReadFrequently: true })!;
  const random = seeded(seed);
  for (let v = 0; v < 2; v++) {
    const ox = v * size;
    for (let t = 0; t < 9; t++) {
      const cx = ox + size * (.2 + random() * .6), cy = size * (.25 + random() * .55), spread = size * (.12 + random() * .1);
      for (let n = 0; n < 70; n++) {
        const a = random() * Math.PI * 2, l = spread * (.5 + random() * .6);
        const shade = 36 + random() * 40;
        ctx.strokeStyle = `rgb(${shade * .6 | 0},${shade + 20 | 0},${shade * .55 | 0})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * l, cy + Math.sin(a) * l * .55 - l * .2); ctx.stroke();
      }
    }
  }
  return canvasToFoliageTexture(element);
}

/** A crown of leaf cards (atlas with two variants side by side) inside an ellipsoid; normals point out of the crown. */
export function cardCrown(seed: number, cards: number, radius: THREE.Vector3, size: number, o: { flat?: number; pads?: number; view?: THREE.Vector3; facing?: number } = {}) {
  const random = seeded(seed);
  const positions: number[] = [], normals: number[] = [], uvs: number[] = [], colors: number[] = [], indices: number[] = [];
  const pads = o.pads ?? 0;
  const padCentres = Array.from({ length: pads }, (_, i) => new THREE.Vector3((random() - .5) * radius.x * 1.2, radius.y * (-.7 + 1.5 * (i + .5) / pads), (random() - .5) * radius.z * 1.2));
  for (let i = 0; i < cards; i++) {
    let centre: THREE.Vector3;
    if (pads) {
      const pc = padCentres[i % pads], a = random() * Math.PI * 2, r = Math.sqrt(random()) * radius.x * (.55 - .25 * (pc.y / radius.y));
      centre = new THREE.Vector3(pc.x + Math.cos(a) * r, pc.y + (random() - .5) * radius.y * .18, pc.z + Math.sin(a) * r);
    } else {
      const u = random() * 2 - 1, a = random() * Math.PI * 2, r = Math.pow(random(), .35);
      const s = Math.sqrt(1 - u * u);
      centre = new THREE.Vector3(Math.cos(a) * s * radius.x * r, u * radius.y * r, Math.sin(a) * s * radius.z * r);
    }
    const out = new THREE.Vector3(centre.x / radius.x, centre.y / radius.y + .35, centre.z / radius.z).normalize();
    // Cards lie roughly tangent to the crown, tilted up toward the sky.
    const flat = o.flat ?? .3;
    const facing = out.clone().lerp(new THREE.Vector3(0, 1, 0), flat).add(new THREE.Vector3((random() - .5) * .8, (random() - .5) * .4, (random() - .5) * .8)).normalize();
    // Distant crowns turn most cards toward the (fixed) viewer, so they read as leaf mass instead of edge-on slivers.
    if (o.view) facing.lerp(o.view, o.facing ?? .65).normalize();
    const tangent = new THREE.Vector3(0, 1, 0).cross(facing); if (tangent.lengthSq() < .01) tangent.set(1, 0, 0); tangent.normalize().applyAxisAngle(facing, random() * Math.PI * 2);
    const bitangent = facing.clone().cross(tangent).normalize();
    const s = size * (.75 + random() * .5), half = s * .5;
    const v0 = positions.length / 3, variant = random() < .5 ? 0 : .5;
    const depth = Math.min(1, centre.clone().divide(radius).length() + .1);
    const shade = .22 + .78 * Math.pow(Math.max(0, out.y * .5 + .5), 1.3) * Math.pow(depth, 1.4);
    for (const [cx, cy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      const p = centre.clone().addScaledVector(tangent, cx * half).addScaledVector(bitangent, cy * half);
      positions.push(p.x, p.y, p.z);
      const n = out;
      normals.push(n.x, n.y, n.z);
      uvs.push(variant + (cx + 1) * .25, (cy + 1) * .5);
      colors.push(shade, shade, shade);
    }
    indices.push(v0, v0 + 1, v0 + 2, v0, v0 + 2, v0 + 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  g.setIndex(indices);
  return g;
}

/** Turns each 3x3 leaf card of a treeGeometry crown partly toward a fixed eye (impostor-like), keeping its centre and normals. */
export function faceCards(geometry: THREE.BufferGeometry, eye: THREE.Vector3, amount: number) {
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const centre = new THREE.Vector3(), a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3(), v = new THREE.Vector3(), offset = new THREE.Vector3();
  const q = new THREE.Quaternion(), identity = new THREE.Quaternion();
  for (let start = 0; start + 9 <= position.count; start += 9) {
    centre.fromBufferAttribute(position, start + 4);
    a.fromBufferAttribute(position, start); b.fromBufferAttribute(position, start + 2); c.fromBufferAttribute(position, start + 6);
    n.crossVectors(b.sub(a), c.sub(a)).normalize();
    v.copy(eye).sub(centre).normalize();
    if (n.dot(v) < 0) n.negate();
    q.setFromUnitVectors(n, v); q.copy(identity.clone().slerp(q, amount));
    for (let i = start; i < start + 9; i++) {
      offset.fromBufferAttribute(position, i).sub(centre).applyQuaternion(q).add(centre);
      position.setXYZ(i, offset.x, offset.y, offset.z);
    }
  }
  position.needsUpdate = true;
  return geometry;
}

/* ---------------------------------------------------------------- mist */

export const RURAL_VOLUME_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
${KP_NOISE}
${PATH_GLSL}
uniform vec3 uMoonDir;
uniform vec3 uMoonColor;
uniform vec3 uAmbient;
uniform vec3 uLamp;
uniform vec3 uLampColor;
uniform float uHaze;
uniform float uMist;
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, 420.0);
  float cosT = dot(rd, uMoonDir);
  float phase = (0.4 * bwPhase(cosT, 0.5) + 0.6 * bwPhase(cosT, 0.05)) * 12.5663706;
  float jitter = bwIgn(gl_FragCoord.xy);
  const int STEPS = 22;
  vec3 scatter = vec3(0.0);
  float T = 1.0;
  for (int i = 0; i < STEPS; i++) {
    float s = (float(i) + jitter) / float(STEPS);
    float t = maxT * s * s;
    float dt = maxT * 2.0 * max(s, 0.5 / float(STEPS)) / float(STEPS);
    vec3 p = ro + rd * t;
    float haze = uHaze * exp(-max(p.y, 0.0) / 14.0);
    // Thin ground mist lies over the flooded paddies, drifting slowly, thinner over the road.
    float drift = smoothstep(0.3, 0.75, bwValue(p * vec3(0.09, 0.6, 0.12) + vec3(uTime * 0.025, 0.0, uTime * 0.01)));
    float paddy = smoothstep(-44.0, -36.0, p.z) * smoothstep(0.8, 2.6, abs(p.x - ruralPathX(p.z)));
    float mist = uMist * exp(-max(p.y, 0.0) / 0.55) * (0.15 + 0.85 * drift) * (0.25 + 0.75 * paddy) * smoothstep(3.0, 14.0, t);
    float density = haze + mist;
    vec3 toLamp = uLamp - p;
    vec3 lamp = uLampColor / (1.0 + dot(toLamp, toLamp) * 0.9);
    vec3 radiance = (uMoonColor * phase + uAmbient + lamp) * density;
    float stepT = exp(-density * dt);
    scatter += T * radiance * (1.0 - stepT) / max(density, 1e-6);
    T *= stepT;
  }
  gl_FragColor = vec4(scatter, T);
}`;
