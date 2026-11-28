import * as THREE from 'three';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { VOLUME_PRELUDE, type VolumeEffect } from '../../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';
import { applyFoliageShading, beforeMain, withNoise, type CanopyLight, type FoliageWind } from '../../shared/render/foliageShading';
import { seeded } from '../../shared/render/noise';

/*
 * Shared building blocks for the four Living Woods worlds: an HDR sky (also
 * rendered into a small radiance probe), a forest-floor surface, instanced
 * grass and fern crowns, fallen leaves, and the participating-medium pass
 * (mist and canopy god rays) for the HDR pipeline. All procedural.
 */

export type Random = () => number;

const c3 = (c: THREE.Color) => new THREE.Vector3(c.r, c.g, c.b);

// ---- Sky ----------------------------------------------------------------------------------------------

export interface SkyOptions {
  /** Linear HDR radiance. */
  zenith: THREE.Color;
  horizon: THREE.Color;
  /** Horizon colour facing away from the sun (defaults to `horizon`). */
  horizonAway?: THREE.Color;
  /** Below the horizon (seen only in reflections and the probe). */
  ground: THREE.Color;
  toSun: THREE.Vector3;
  sun: THREE.Color;
  /** Cosine of the sun disc's angular radius. */
  sunCos?: number;
  glow: THREE.Color;
  clouds?: { lit: THREE.Color; shade: THREE.Color; cover: number; scale: number; speed: number; amount: number };
  /** A ragged band of distant forest along the horizon (sine of its top elevation). */
  wall?: { color: THREE.Color; height: number };
  time: { value: number };
}

const SKY_GLSL = /* glsl */ `
uniform vec3 uSkyZenith;
uniform vec3 uSkyHorizon;
uniform vec3 uSkyHorizonAway;
uniform vec3 uSkyGround;
uniform vec3 uSkyToSun;
uniform vec3 uSkySun;
uniform vec3 uSkyGlow;
uniform float uSkySunCos;
uniform vec4 uSkyCloud;
uniform vec3 uSkyCloudLit;
uniform vec3 uSkyCloudShade;
uniform float uSkyTime;
uniform vec4 uSkyWall;
vec3 woodsSky(vec3 d) {
  float h = d.y;
  float toward = dot(normalize(vec3(d.x, 0.0, d.z) + 1e-5), normalize(vec3(uSkyToSun.x, 0.0, uSkyToSun.z) + 1e-5)) * 0.5 + 0.5;
  vec3 horizon = mix(uSkyHorizonAway, uSkyHorizon, pow(toward, 4.0));
  vec3 c = mix(horizon, uSkyZenith, pow(clamp(h, 0.0, 1.0), 0.42));
  c = mix(c, uSkyGround, smoothstep(0.0, -0.15, h));
  float mu = dot(d, uSkyToSun);
  c += uSkyGlow * (pow(max(mu, 0.0), 5.0) * 0.55 + pow(max(mu, 0.0), 48.0) * 1.8) * smoothstep(-0.2, 0.05, h);
  if (uSkyCloud.w > 0.0) {
    vec2 q = d.xz / (max(h, 0.0) + 0.12) * uSkyCloud.y + vec2(uSkyTime * uSkyCloud.z, uSkyTime * uSkyCloud.z * 0.4);
    float n = bwFbm5(vec3(q, 0.37)) * 0.5 + 0.5;
    float cover = smoothstep(uSkyCloud.x, uSkyCloud.x + 0.28, n) * smoothstep(-0.02, 0.2, h);
    float thick = smoothstep(uSkyCloud.x + 0.05, uSkyCloud.x + 0.5, n);
    vec3 cloud = mix(uSkyCloudLit, uSkyCloudShade, thick * 0.7) + uSkyGlow * pow(max(mu, 0.0), 4.0) * (1.0 - thick) * 0.9;
    c = mix(c, cloud, cover * uSkyCloud.w);
  }
  c += uSkySun * smoothstep(uSkySunCos, uSkySunCos + 0.0002, mu);
  if (uSkyWall.w > 0.0) {
    float az = atan(d.z, d.x);
    // Crowns along the top edge, faint trunks below: a far forest, not a mountain range.
    float edge = uSkyWall.w * (0.8 + 0.2 * bwNoise(vec3(az * 2.6, 0.0, 1.7)) + 0.1 * bwNoise(vec3(az * 14.0, 2.0, 0.0))
      + 0.07 * bwNoise(vec3(az * 47.0, 5.0, 0.0)) + 0.05 * bwNoise(vec3(az * 150.0, h * 60.0, 3.0)));
    float wall = 1.0 - smoothstep(edge - 0.025, edge + 0.004, h);
    float trunks = smoothstep(0.6, 0.85, bwNoise(vec3(az * 95.0, 0.0, 7.0)) * 0.5 + 0.5) * (1.0 - smoothstep(edge * 0.4, edge, h));
    vec3 wallColor = uSkyWall.rgb * (0.85 + 0.35 * smoothstep(-0.1, edge, h)) * (1.0 - trunks * 0.4);
    c = mix(c, wallColor, wall);
  }
  return c;
}
`;

export function createSkyMaterial(o: SkyOptions) {
  const clouds = o.clouds ?? { lit: new THREE.Color(1, 1, 1), shade: new THREE.Color(0.5, 0.5, 0.5), cover: 1, scale: 1, speed: 0, amount: 0 };
  return new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: {
      uSkyZenith: { value: c3(o.zenith) }, uSkyHorizon: { value: c3(o.horizon) }, uSkyHorizonAway: { value: c3(o.horizonAway ?? o.horizon) }, uSkyGround: { value: c3(o.ground) },
      uSkyToSun: { value: o.toSun.clone().normalize() }, uSkySun: { value: c3(o.sun) }, uSkyGlow: { value: c3(o.glow) },
      uSkySunCos: { value: o.sunCos ?? 0.99985 },
      uSkyCloud: { value: new THREE.Vector4(clouds.cover, clouds.scale, clouds.speed, clouds.amount) },
      uSkyCloudLit: { value: c3(clouds.lit) }, uSkyCloudShade: { value: c3(clouds.shade) },
      uSkyTime: o.time,
      uSkyWall: { value: o.wall ? new THREE.Vector4(o.wall.color.r, o.wall.color.g, o.wall.color.b, o.wall.height) : new THREE.Vector4(0, 0, 0, 0) },
    },
    vertexShader: /* glsl */ `varying vec3 vSkyDir;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vSkyDir = world.xyz - cameraPosition;
  gl_Position = projectionMatrix * viewMatrix * world;
}`,
    fragmentShader: /* glsl */ `${GLSL_NOISE}
${SKY_GLSL}
varying vec3 vSkyDir;
void main() {
  gl_FragColor = vec4(woodsSky(normalize(vSkyDir)), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
  });
}

export function createSky(o: SkyOptions, radius = 150) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 48, 24), createSkyMaterial(o));
  mesh.renderOrder = -10;
  mesh.frustumCulled = false;
  return mesh;
}

/**
 * Radiance probe from a procedural sky (and an optional leaf roof with gaps),
 * prefiltered by PMREM: soft directional ambient plus glossy reflections.
 */
export function bakeEnvironment(renderer: THREE.WebGLRenderer, scene: THREE.Scene, sky: SkyOptions, options: { intensity: number; canopy?: { color: THREE.Color; cover: number } }) {
  const probe = new THREE.Scene();
  const skyMesh = new THREE.Mesh(new THREE.SphereGeometry(40, 48, 24), createSkyMaterial(sky));
  probe.add(skyMesh);
  let roof: THREE.Mesh | null = null;
  if (options.canopy) {
    roof = new THREE.Mesh(new THREE.SphereGeometry(30, 48, 24), new THREE.ShaderMaterial({
      side: THREE.BackSide, transparent: true, depthWrite: false,
      uniforms: { uColor: { value: c3(options.canopy.color) }, uCover: { value: options.canopy.cover } },
      vertexShader: 'varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `${GLSL_NOISE}
uniform vec3 uColor; uniform float uCover; varying vec3 vDir;
void main(){ vec3 d = normalize(vDir); float leaf = smoothstep(-0.1, 0.25, d.y) * smoothstep(0.1, 0.35, bwFbm3(d * 6.0) * 0.5 + 0.5 + uCover - 0.5);
  gl_FragColor = vec4(uColor * (0.7 + 0.6 * d.y), leaf * uCover); }`,
    }));
    probe.add(roof);
  }
  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(probe, 0.03, 0.1, 100);
  pmrem.dispose();
  probe.traverse(object => { if (object instanceof THREE.Mesh) { object.geometry.dispose(); (object.material as THREE.Material).dispose(); } });
  scene.environment = target.texture;
  scene.environmentIntensity = options.intensity;
  return target;
}

// ---- Directional key light ------------------------------------------------------------------------

export function createSun(scene: THREE.Scene, o: { toSun: THREE.Vector3; color: THREE.ColorRepresentation; intensity: number; target: THREE.Vector3; box: [number, number, number, number]; distance: number; mapSize?: number; radius?: number; bias?: number; normalBias?: number }) {
  const sun = new THREE.DirectionalLight(o.color, o.intensity);
  sun.position.copy(o.target).addScaledVector(o.toSun.clone().normalize(), o.distance);
  sun.target.position.copy(o.target);
  sun.castShadow = true;
  sun.shadow.mapSize.set(o.mapSize ?? 2048, o.mapSize ?? 2048);
  const [left, right, bottom, top] = o.box;
  Object.assign(sun.shadow.camera, { left, right, top, bottom, near: 0.5, far: o.distance * 2 });
  sun.shadow.bias = o.bias ?? -0.0004;
  sun.shadow.normalBias = o.normalBias ?? 0.04;
  sun.shadow.radius = o.radius ?? 3;
  scene.add(sun, sun.target);
  return sun;
}

// ---- Volume: mist and canopy shafts ---------------------------------------------------------------

export interface VolumeOptions {
  canopy: CanopyLight;
  toSun: THREE.Vector3;
  /** Sun radiance scattered by the medium (linear HDR). */
  sun: THREE.Color;
  /** Isotropic sky in-scatter. */
  ambient: THREE.Color;
  /** Haze density at `base` height (per metre), its height falloff, base height, and march distance. */
  haze: [number, number, number, number];
  /** Ground mist: density, thickness (metres), noise scale, drift speed. */
  mist?: [number, number, number, number];
  anisotropy?: number;
  steps?: number;
  /** Distances (metres) over which the medium fades in from the viewer, keeping the near field crisp. */
  clear?: [number, number];
  /**
   * Mist banks at chosen distances: [distance, width, density, thickness] each (up to 3), added to
   * the ground mist where a ray passes that far from the viewer (layers of mist between tree rows).
   * Thickness is the e-folding height in metres above the haze base.
   */
  banks?: Array<[number, number, number, number]>;
}

export function createWoodsVolume(o: VolumeOptions): VolumeEffect {
  const steps = Math.min(40, o.steps ?? 28);
  const banks = (o.banks ?? []).slice(0, 3);
  const fragmentShader = /* glsl */ `
${VOLUME_PRELUDE}
${GLSL_NOISE}
${o.canopy.glsl}
uniform vec3 uVolToSun;
uniform vec3 uVolSun;
uniform vec3 uVolAmbient;
uniform vec4 uVolHaze;
uniform vec4 uVolMist;
uniform float uVolG;
${banks.length ? `uniform vec4 uVolBanks[${banks.length}];` : ''}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, uVolHaze.w);
  float mu = dot(rd, uVolToSun);
  // Forward-scattering lobe for shafts toward the sun, plus an isotropic share.
  float phase = mix(bwPhase(mu, uVolG), 0.0795775, 0.35) * 12.5663706;
  float jitter = bwIgn(gl_FragCoord.xy);
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  float previous = 0.0;
  const int STEPS = ${steps};
  for (int i = 0; i < STEPS; i++) {
    // Quadratic spacing puts more samples near the viewer where shafts are sharp.
    float s = (float(i) + jitter) / float(STEPS);
    float t = s * s * maxT;
    float dt = t - previous;
    previous = t;
    vec3 p = ro + rd * t;
    float height = p.y - uVolHaze.z;
    float haze = uVolHaze.x * exp(-max(height, 0.0) * uVolHaze.y);
    float mist = uVolMist.x * exp(-max(height, 0.0) / max(uVolMist.y, 0.05))
      * smoothstep(0.2, 0.8, bwValue(p * uVolMist.z + vec3(uTime * uVolMist.w, 0.0, uTime * uVolMist.w * 0.6)));
    ${banks.length ? `{
      float bankNoise = smoothstep(0.25, 0.75, bwValue(p * 0.09 + vec3(uTime * 0.012, 0.0, 3.0)));
      for (int b = 0; b < ${banks.length}; b++) {
        vec4 bank = uVolBanks[b];
        mist += bank.z * exp(-pow((length(p.xz - ro.xz) - bank.x) / bank.y, 2.0)) * exp(-max(height, 0.0) / bank.w) * (0.45 + 0.55 * bankNoise);
      }
    }` : ''}
    float density = (haze + mist) * (0.7 + 0.3 * bwValue(p * 0.21 + vec3(0.0, uTime * 0.015, uTime * 0.02)));
    ${o.clear ? `density *= smoothstep(${o.clear[0].toFixed(3)}, ${o.clear[1].toFixed(3)}, t);` : ''}
    float sun = bwCanopy(p);
    vec3 radiance = uVolSun * phase * sun + uVolAmbient;
    float stepT = exp(-density * dt);
    scatter += transmittance * radiance * (1.0 - stepT);
    transmittance *= stepT;
  }
  gl_FragColor = vec4(scatter, transmittance);
}
`;
  const mist = o.mist ?? [0, 1, 0.1, 0];
  const material = new THREE.ShaderMaterial({
    vertexShader: FULLSCREEN_VERTEX, fragmentShader, depthTest: false, depthWrite: false, toneMapped: false,
    uniforms: {
      ...o.canopy.uniforms,
      uVolToSun: { value: o.toSun.clone().normalize() },
      uVolSun: { value: c3(o.sun) },
      uVolAmbient: { value: c3(o.ambient) },
      uVolHaze: { value: new THREE.Vector4(...o.haze) },
      uVolMist: { value: new THREE.Vector4(...mist) },
      uVolG: { value: o.anisotropy ?? 0.6 },
      ...(banks.length ? { uVolBanks: { value: banks.map(b => new THREE.Vector4(...b)) } } : {}),
    },
  });
  return { material };
}

// ---- Terrain and forest floor ---------------------------------------------------------------------

/** A ground sheet: dense near the viewer (z around `near`), coarser far away. */
export function terrainGeometry(o: { width: number; zNear: number; zFar: number; columns: number; rows: number; height: (x: number, z: number) => number; centreX?: number }) {
  const positions: number[] = [], indices: number[] = [], uvs: number[] = [];
  for (let r = 0; r <= o.rows; r++) {
    // Rows bunch toward the viewer, where detail is visible.
    const t = r / o.rows;
    const z = o.zNear + (o.zFar - o.zNear) * t * t;
    for (let c = 0; c <= o.columns; c++) {
      const u = c / o.columns;
      const x = (o.centreX ?? 0) + (u - 0.5) * o.width * (0.45 + 0.55 * t * 1.6);
      positions.push(x, o.height(x, z), z);
      uvs.push(u, t);
      if (r < o.rows && c < o.columns) {
        const a = r * (o.columns + 1) + c, b = a + o.columns + 1;
        indices.push(a, a + 1, b, a + 1, b + 1, b);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export interface FloorOptions {
  key: string;
  soil: THREE.ColorRepresentation;
  litter: THREE.ColorRepresentation;
  litterDark: THREE.ColorRepresentation;
  moss: THREE.ColorRepresentation;
  mossAmount: number;
  /** 0 dry .. 1 soaked (darker, glossy hollows). */
  wetness?: number;
  grass?: { color: THREE.ColorRepresentation; amount: number };
  bump?: number;
  /**
   * A carpet of fallen leaves drawn in the shader: two overlapping layers of
   * randomly turned leaf shapes, `cells` leaves per metre, length/width `aspect`.
   * `cover` 0..1 scales how much of the floor they hide.
   */
  carpet?: { cells: number; aspect: number; cover: number };
}

const vec3 = (c: THREE.ColorRepresentation) => { const k = new THREE.Color(c); return `vec3(${k.r.toFixed(4)}, ${k.g.toFixed(4)}, ${k.b.toFixed(4)})`; };
const f = (n: number) => n.toFixed(5);

const LEAF_CARPET = /* glsl */ `
// One layer of fallen leaves: each grid cell owns a turned, tapered leaf that may
// overlap its neighbours; the cell with the highest random key lies on top.
// Returns (shade 0..1, coverage, position along the leaf -1..1, height).
vec4 floorLeaves(vec2 p, float cells, float aspect, float seed, float aa) {
  vec2 q = p * cells;
  vec2 id = floor(q);
  vec4 best = vec4(0.0);
  float bestKey = -1.0;
  for (int x = -1; x <= 1; x++) for (int y = -1; y <= 1; y++) {
    vec2 c = id + vec2(float(x), float(y));
    vec3 h = bwHash3(vec3(c, seed));
    vec2 d = q - (c + h.xy);
    float a = h.z * 6.2831853;
    float ca = cos(a), sa = sin(a);
    vec2 r = vec2(ca * d.x + sa * d.y, -sa * d.x + ca * d.y);
    float len = 0.42 + 0.58 * fract(h.x * 17.3);
    float t = r.x / len;
    if (abs(t) > 1.0) continue;
    float halfW = len / aspect * (0.75 + 0.5 * fract(h.y * 13.1)) * sqrt(max(0.0, 1.0 - t * t)) * (1.0 + 0.25 * t);
    float cover = 1.0 - smoothstep(halfW - aa, halfW + aa * 0.5, abs(r.y));
    float key = fract(h.y * 31.7 + h.x * 7.1);
    if (cover > 0.02 && key > bestKey) {
      bestKey = key;
      float rib = 1.0 - smoothstep(0.0, aa * 1.5 + 0.01, abs(r.y));
      best = vec4(fract(h.x * 7.13 + h.z * 3.7), cover, t, (1.0 - t * t) * (1.0 - abs(r.y) / max(halfW, 1e-3)) * 0.8 + 0.2 - rib * 0.25);
    }
  }
  return best;
}
`;

/** World-space forest floor: soil, fallen leaves, moss patches, damp hollows. Needs applyFoliageShading (vBwWorld). */
export function applyForestFloor<T extends THREE.MeshStandardMaterial>(material: T, o: FloorOptions): T {
  const previous = material.onBeforeCompile;
  const carpet = o.carpet;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.fragmentShader = beforeMain(shader.fragmentShader, `${withNoise(shader.fragmentShader)}
float floorWet = 0.0;
float floorMoss = 0.0;
float floorCarpetH = 0.0;
${carpet ? LEAF_CARPET : ''}
float floorHeight(vec3 p) {
  float litter = bwNoise(vec3(p.x * 9.0, p.z * 9.0, 1.0)) * 0.35 + bwNoise(vec3(p.x * 23.0 + 3.0, p.z * 19.0, 2.0)) * 0.2;
  return (bwFbm3(vec3(p.x * 1.3, 0.0, p.z * 1.3)) * 0.6 + litter * ${carpet ? '0.3' : '1.0'}) * 0.02;
}`).replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 p = vBwWorld;
  float broad = bwFbm3(vec3(p.x * 0.18, 0.0, p.z * 0.18) + 3.0);
  float mid = bwNoise(vec3(p.x * 1.1, 0.0, p.z * 1.1) + 7.0);
  float leaves = bwNoise(vec3(p.x * 6.5, 0.0, p.z * 6.5)) * 0.5 + 0.5;
  float leaves2 = bwNoise(vec3(p.x * 17.0 + 4.0, 0.0, p.z * 14.0)) * 0.5 + 0.5;
  vec3 soil = ${vec3(o.soil)} * (0.8 + 0.3 * mid);
  vec3 litter = mix(${vec3(o.litterDark)}, ${vec3(o.litter)}, smoothstep(0.3, 0.75, leaves) * 0.8 + leaves2 * 0.2);
  litter *= 0.75 + 0.45 * leaves2 * leaves;
  float litterMask = smoothstep(-0.35, 0.25, broad + mid * 0.3);
  vec3 color = mix(soil, litter, litterMask);
  ${carpet ? `{
    // Pixel footprint in cells: fade the individual leaves to their average where they would alias.
    float aa = length(fwidth(p.xz)) * ${f(carpet.cells)};
    float detail = 1.0 - smoothstep(0.35, 0.9, aa);
    float cover = clamp(${f(carpet.cover)} * (0.55 + 0.6 * litterMask), 0.0, 1.0);
    vec3 dark = ${vec3(o.litterDark)}, light = ${vec3(o.litter)};
    vec3 carpetColor = soil;
    if (detail > 0.0) {
      vec4 under = floorLeaves(p.xz, ${f(carpet.cells * 0.8)}, ${f(carpet.aspect)}, 7.0, aa * 0.8);
      vec4 top = floorLeaves(p.xz, ${f(carpet.cells)}, ${f(carpet.aspect)}, 1.0, aa);
      vec3 underColor = mix(dark, light, under.x) * (0.55 + 0.25 * under.w);
      vec3 topColor = mix(dark, light, top.x * 0.85 + 0.15) * (0.78 + 0.35 * top.w) * (0.92 + 0.16 * leaves2);
      carpetColor = mix(carpetColor, underColor, under.y);
      // Leaves on top shade the ones beneath around their edges.
      carpetColor *= 1.0 - 0.25 * top.y * (1.0 - under.y);
      carpetColor = mix(carpetColor, topColor, top.y);
      floorCarpetH = (top.y * (0.004 + 0.003 * top.w) + under.y * 0.002) * detail;
    }
    vec3 average = mix(soil, mix(dark, light, 0.5) * 0.8, 0.85);
    color = mix(color, mix(average, carpetColor, detail), cover);
  }` : ''}
  floorMoss = smoothstep(0.55, 0.85, (bwFbm3(vec3(p.x * 0.45, 3.0, p.z * 0.45)) * 0.5 + 0.5) + ${f(o.mossAmount)} - 0.5 + mid * 0.15);
  color = mix(color, ${vec3(o.moss)} * (0.65 + 0.5 * leaves2), floorMoss);
  ${o.grass ? `float grassy = smoothstep(0.45, 0.75, bwNoise(vec3(p.x * 0.6, 5.0, p.z * 0.6)) * 0.5 + 0.5 + ${f(o.grass.amount)} - 0.5);
  color = mix(color, ${vec3(o.grass.color)} * (0.7 + 0.5 * leaves), grassy);` : ''}
  ${o.wetness ? `floorWet = clamp(${f(o.wetness)} * (0.6 + 0.6 * smoothstep(0.1, -0.4, broad)), 0.0, 1.0);
  color *= mix(1.0, 0.5, floorWet * (1.0 - floorMoss * 0.5));` : ''}
  diffuseColor.rgb *= color;
}`).replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor, 0.97, floorMoss);
roughnessFactor = mix(roughnessFactor, 0.22, floorWet * (1.0 - floorMoss * 0.7));`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  vec3 p = vBwWorld;
  const float e = 0.01;
  float h0 = floorHeight(p);
  vec3 grad = vec3(floorHeight(p + vec3(e, 0.0, 0.0)) - h0, 0.0, floorHeight(p + vec3(0.0, 0.0, e)) - h0) / e;
  float fade = (1.0 - smoothstep(8.0, 30.0, length(vViewPosition))) * mix(1.0, 0.4, floorWet);
  grad *= ${f(o.bump ?? 1)} * fade;
  vec3 viewGrad = (viewMatrix * vec4(grad, 0.0)).xyz;
  normal = normalize(normal - (viewGrad - dot(viewGrad, normal) * normal));
  ${carpet ? `{
    // Leaf edges and curl through screen-space derivatives of the carpet height.
    vec3 sx = dFdx(-vViewPosition), sy = dFdy(-vViewPosition);
    vec3 r1 = cross(sy, normal), r2 = cross(normal, sx);
    float det = dot(sx, r1);
    vec2 dh = vec2(dFdx(floorCarpetH), dFdy(floorCarpetH)) * fade;
    normal = normalize(abs(det) * normal - sign(det) * (dh.x * r1 + dh.y * r2));
  }` : ''}
}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|lw-floor-v2|${o.key}`;
  return material;
}

// ---- Instanced vegetation ------------------------------------------------------------------------

/** A tapering, slightly folded blade, 0..1 tall, leaning toward +z. Normals lean upward for soft lawns. */
export function bladeGeometry(segments = 4, curve = 0.35) {
  const positions: number[] = [], normals: number[] = [], colors: number[] = [], indices: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const w = 0.5 * (1 - Math.pow(t, 1.6));
    const z = curve * t * t, y = t * (1 - 0.12 * t * t);
    const ao = 0.32 + 0.68 * Math.pow(t, 0.7);
    for (const s of [-1, 0, 1]) {
      positions.push(s * w, y, z - (s === 0 ? -0.04 * w : 0));
      const n = new THREE.Vector3(s * 0.25, 0.85, -0.45 + t * 0.3).normalize();
      normals.push(n.x, n.y, n.z);
      colors.push(ao, ao, ao);
    }
    if (i < segments) {
      const a = i * 3;
      indices.push(a, a + 3, a + 1, a + 1, a + 3, a + 4, a + 1, a + 4, a + 2, a + 2, a + 4, a + 5);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  return geometry;
}

export interface Placement { x: number; y: number; z: number; yaw: number; tilt?: number; scale: THREE.Vector3; color: THREE.Color }

export function instanced(geometry: THREE.BufferGeometry, material: THREE.Material, placements: Placement[], shadows: { cast: boolean; receive: boolean }) {
  const mesh = new THREE.InstancedMesh(geometry, material, Math.max(1, placements.length));
  const dummy = new THREE.Object3D();
  placements.forEach((p, i) => {
    dummy.position.set(p.x, p.y, p.z);
    dummy.rotation.set(p.tilt ?? 0, p.yaw, 0, 'YXZ');
    dummy.scale.copy(p.scale);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    mesh.setColorAt(i, p.color);
  });
  mesh.count = placements.length;
  mesh.castShadow = shadows.cast; mesh.receiveShadow = shadows.receive;
  mesh.computeBoundingSphere();
  return mesh;
}

export function grassMaterial(o: { key: string; canopy: CanopyLight | null; wind: FoliageWind; roughness: number; translucency?: number; color?: THREE.ColorRepresentation }) {
  const material = new THREE.MeshStandardMaterial({ color: o.color ?? '#ffffff', vertexColors: true, side: THREE.DoubleSide, roughness: o.roughness, metalness: 0 });
  return applyFoliageShading(material, {
    key: `grass-${o.key}`, canopy: o.canopy, wind: o.wind, sharedNormals: true,
    translucency: { tint: '#d8ff8a', back: o.translucency ?? 0.55, forward: (o.translucency ?? 0.55) * 1.6 },
  });
}

/** A fern frond as a curved, cupped strip: base at the origin, arching out along +x. */
function frondStrip(length: number, width: number, rise: number, droop: number, segments = 10) {
  const positions: number[] = [], normals: number[] = [], uvs: number[] = [], colors: number[] = [], indices: number[] = [];
  let x = 0, y = 0;
  let angle = rise;
  const step = length / segments;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const w = width * 0.5;
    const ao = 0.35 + 0.65 * Math.min(1, t * 1.6);
    for (const s of [-1, 0, 1]) {
      // Pinnae sag to the sides of the rachis.
      positions.push(x, y - (s === 0 ? 0 : w * 0.35 * Math.sin(t * Math.PI * 0.9 + 0.2)), s * w);
      const n = new THREE.Vector3(-Math.sin(angle) * 0.6, 1, s * 0.3).normalize();
      normals.push(n.x, n.y, n.z);
      uvs.push((s + 1) / 2, t);
      colors.push(ao, ao, ao);
    }
    if (i < segments) {
      const a = i * 3;
      indices.push(a, a + 1, a + 3, a + 1, a + 4, a + 3, a + 1, a + 2, a + 4, a + 2, a + 5, a + 4);
    }
    x += Math.cos(angle) * step; y += Math.sin(angle) * step;
    angle -= droop / segments;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  return geometry;
}

/** One fern crown (merged fronds around a vertical axis), roughly 1 m across at scale 1. */
export function fernCrownGeometry(seed: number, fronds = 9) {
  const random = seeded(seed);
  const parts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < fronds; i++) {
    const length = 0.55 + random() * 0.35;
    const strip = frondStrip(length, length * 0.42, 0.75 + random() * 0.45, 1.5 + random() * 0.9);
    strip.rotateX((random() - 0.5) * 0.3);
    strip.rotateY((i / fronds) * Math.PI * 2 + random() * 0.5);
    parts.push(strip);
  }
  // Two young fronds stand more upright in the centre.
  for (let i = 0; i < 2; i++) {
    const strip = frondStrip(0.45, 0.16, 1.25, 1.2, 8);
    strip.rotateY(random() * Math.PI * 2);
    parts.push(strip);
  }
  const merged = mergeSimple(parts);
  parts.forEach(part => part.dispose());
  return merged;
}

function mergeSimple(parts: THREE.BufferGeometry[]) {
  const names = ['position', 'normal', 'uv', 'color'];
  const out = new THREE.BufferGeometry();
  let count = 0;
  for (const part of parts) count += part.attributes.position.count;
  for (const name of names) {
    const size = parts[0].attributes[name].itemSize;
    const array = new Float32Array(count * size);
    let offset = 0;
    for (const part of parts) { array.set(part.attributes[name].array as Float32Array, offset); offset += part.attributes[name].count * size; }
    out.setAttribute(name, new THREE.BufferAttribute(array, size));
  }
  const indices: number[] = [];
  let base = 0;
  for (const part of parts) { for (const i of part.index!.array) indices.push(i + base); base += part.attributes.position.count; }
  out.setIndex(indices);
  return out;
}

export function fernMaterial(o: { key: string; map: THREE.Texture; canopy: CanopyLight | null; wind: FoliageWind; roughness: number; wet?: boolean }) {
  const material = new THREE.MeshStandardMaterial({ map: o.map, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, alphaToCoverage: true, roughness: o.roughness, metalness: 0 });
  return applyFoliageShading(material, {
    key: `fern-${o.key}`, canopy: o.canopy, wind: o.wind, sharedNormals: true, coverage: true,
    translucency: { tint: '#e2ff9a', back: 0.5, forward: 0.9 },
  });
}

/** A fallen leaf: a 0.5 m quad with lifted, curled edges, using one cell of a 2x2 litter atlas. */
export function litterGeometry(cell: number) {
  const geometry = new THREE.PlaneGeometry(1, 1, 2, 2);
  geometry.rotateX(-Math.PI / 2);
  const p = geometry.attributes.position, uv = geometry.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i);
    p.setY(i, (x * x * 2.2 + z * z * 0.6) * 0.12);
    uv.setXY(i, (uv.getX(i) + (cell % 2)) / 2, (uv.getY(i) + 1 - Math.floor(cell / 2)) / 2);
  }
  geometry.computeVertexNormals();
  return geometry;
}

/** Scatters points over a region with rejection; deterministic. */
export function scatter(count: number, seed: number, sample: (random: Random) => Placement | null) {
  const random = seeded(seed);
  const result: Placement[] = [];
  let guard = count * 6;
  while (result.length < count && guard-- > 0) {
    const p = sample(random);
    if (p) result.push(p);
  }
  return result;
}

// ---- Dew and rain beads --------------------------------------------------------------------------

/**
 * Water beads on blades and leaves (chain after applyFoliageShading with translucency): each
 * small cell may hold a droplet whose tiny sphere mirrors the sun toward the viewer. The glint
 * uses the direct sun after canopy and shadow-map visibility, so beads in shade stay dark, peaks
 * with Fresnel when looking toward the sun, twinkles as wind moves the blades, and fades where
 * cells would shrink below a pixel. One hash and a few ALU per fragment.
 */
export function applyDewGlints<T extends THREE.MeshStandardMaterial>(material: T, o: { key: string; toSun: THREE.Vector3; cells?: number; cover?: number; strength?: number }): T {
  const previous = material.onBeforeCompile;
  const toSun = o.toSun.clone().normalize();
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    const marker = '// Thin leaves pass sunlight through to the shaded side';
    if (!shader.fragmentShader.includes(marker)) return;
    shader.fragmentShader = beforeMain(shader.fragmentShader, `${withNoise(shader.fragmentShader)}
vec3 bwDewSun = vec3(0.0);`)
      .replace(marker, `bwDewSun = directLight.color;\n\t\t\t${marker}`)
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
{
  vec3 dewCellP = vBwWorld * ${(o.cells ?? 70).toFixed(2)};
  vec3 dewCell = floor(dewCellP);
  vec3 dewHash = bwHash3(dewCell + 17.0);
  vec3 dewLocal = fract(dewCellP) - (0.25 + 0.5 * dewHash);
  float dewFoot = length(fwidth(dewCellP));
  float dewBead = step(1.0 - ${(o.cover ?? 0.3).toFixed(3)}, dewHash.z) * (1.0 - smoothstep(0.18, 0.32, length(dewLocal) / max(1.0, dewFoot * 0.6)));
  vec3 dewV = normalize(cameraPosition - vBwWorld);
  vec3 dewL = vec3(${toSun.x.toFixed(4)}, ${toSun.y.toFixed(4)}, ${toSun.z.toFixed(4)});
  float dewVH = saturate(dot(dewV, normalize(dewV + dewL)));
  // A bead is a tiny sphere: some facet always faces the half vector; grazing (back-lit) views reflect most.
  float dewFresnel = 0.04 + 0.96 * pow(1.0 - dewVH, 3.0);
  float dewNear = 1.0 - smoothstep(0.35, 1.1, dewFoot);
  reflectedLight.directSpecular += bwDewSun * dewBead * dewFresnel * dewNear * ${(o.strength ?? 6).toFixed(3)} * (0.4 + 0.6 * dewHash.x);
}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|lw-dew-v1|${o.key}`;
  return material;
}
