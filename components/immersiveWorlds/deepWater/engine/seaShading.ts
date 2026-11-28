import * as THREE from 'three';
import { GLSL_NOISE } from '../../shared/render/glsl';

/*
 * Shared underwater shading for the deep-sea world (original code):
 *  - spectral absorption: red light dies within a few metres, blue travels
 *    furthest, and the water in-scatters a blue that brightens toward the
 *    surface. Objects and the backdrop use one closed form, so distant reef
 *    sinks into exactly the colour of the open water behind it;
 *  - surface caustics: two drifting cellular networks projected along the
 *    sun, multiplied into the directional light so they stay shadowed;
 *  - surge: the slow back-and-forth of swell felt at depth, shared by kelp,
 *    fans, anemones and marine snow so everything sways together.
 */

export const SEA_SURFACE_Y = 15;
export const SEA_SUN = new THREE.Vector3(-.22, -1, .28).normalize();

const f = (n: number) => n.toFixed(5);
const v3 = (x: number, y: number, z: number) => `vec3(${f(x)}, ${f(y)}, ${f(z)})`;

/** Per-channel extinction (1/m): red is absorbed fastest. */
const SIGMA = v3(.11, .055, .036);

/** Absorption, in-scatter, caustics and surge. Needs GLSL_NOISE first. */
export const SEA_GLSL = /* glsl */ `
const vec3 SEA_SIGMA = ${SIGMA};
const vec3 SEA_SUN_DIR = ${v3(SEA_SUN.x, SEA_SUN.y, SEA_SUN.z)};
const float SEA_SURFACE = ${f(SEA_SURFACE_Y)};
/** Radiance the water scatters toward the eye along a direction (looking up is brighter). */
vec3 seaInscatter(vec3 dir) {
  float up = smoothstep(-0.6, 0.95, dir.y);
  vec3 c = mix(vec3(0.0015, 0.0105, 0.019), vec3(0.020, 0.128, 0.148), up * up);
  // Forward scattering around the sun's refracted direction.
  float sun = pow(max(dot(dir, -SEA_SUN_DIR), 0.0), 6.0);
  return c + vec3(0.010, 0.045, 0.048) * sun;
}
/** Light brightens toward the surface: the in-scatter source grows with height. */
vec3 seaExtinctionAlong(vec3 dir) { return max(SEA_SIGMA - 0.022 * dir.y, SEA_SIGMA * 0.35); }
vec3 seaBackground(vec3 dir) { return seaInscatter(dir) * SEA_SIGMA / seaExtinctionAlong(dir); }
vec3 seaWater(vec3 color, vec3 world, vec3 eye) {
  vec3 v = world - eye;
  float d = length(v);
  vec3 dir = v / max(d, 1e-4);
  vec3 a = seaExtinctionAlong(dir);
  return color * exp(-SEA_SIGMA * d) + seaInscatter(dir) * SEA_SIGMA / a * (1.0 - exp(-a * d));
}
vec3 seaTransmit(vec3 world, vec3 eye) { return exp(-SEA_SIGMA * length(world - eye)); }

/**
 * Sunlight reaching depth p through the moving surface: broad lenses that
 * drift with the waves make the shafts, and smaller passing wavelets make each
 * one brighten and dim. Shared by the volume pass and the marine snow.
 */
float seaShaft(vec3 p, float t) {
  vec2 s = p.xz - SEA_SUN_DIR.xz / -SEA_SUN_DIR.y * (SEA_SURFACE - p.y);
  float a = bwNoise(vec3(s * 0.30 + vec2(t * 0.045, t * 0.02), t * 0.07));
  float b = bwNoise(vec3(s * 0.80 + vec2(-t * 0.065, t * 0.045) + 7.0, t * 0.11));
  float shaft = smoothstep(0.05, 0.6, a * 0.7 + b * 0.3 + 0.12);
  float flicker = 0.6 + 0.4 * bwNoise(vec3(s * 1.15 + vec2(t * 0.24, -t * 0.16), t * 0.38));
  return shaft * flicker;
}

/** Swell displacement felt at depth (metres), travelling slowly across the reef. */
vec3 seaSurge(vec3 p, float t) {
  float ph = t - dot(p.xz, vec2(0.07, 0.04));
  return vec3(sin(ph * 0.41) * 0.65 + sin(ph * 0.23 + 1.7) * 0.35, 0.0, sin(ph * 0.29 + 0.6) * 0.3);
}

vec2 seaCellPoint(vec2 cell, float t) {
  vec3 h = bwHash3(vec3(cell, 17.0));
  return 0.5 + 0.36 * sin(t * (0.55 + 0.5 * h.z) + 6.2831853 * h.xy);
}
/** F2 - F1 of a gently animated cellular field: zero along cell borders. */
float seaCellEdge(vec2 p, float t) {
  vec2 i = floor(p), q = fract(p);
  float f1 = 8.0, f2 = 8.0;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 o = vec2(float(x), float(y));
    vec2 r = o + seaCellPoint(i + o, t) - q;
    float d = dot(r, r);
    if (d < f1) { f2 = f1; f1 = d; } else if (d < f2) { f2 = d; }
  }
  return sqrt(f2) - sqrt(f1);
}
/** Caustic irradiance gain (mean about 1) at a world point lit through the surface. */
float seaCaustic(vec3 world, float t) {
  float travel = max(SEA_SURFACE - world.y, 0.0) / max(-SEA_SUN_DIR.y, 0.2);
  vec2 s = world.xz - SEA_SUN_DIR.xz / -SEA_SUN_DIR.y * (SEA_SURFACE - world.y);
  float e1 = seaCellEdge(s * 2.4 + vec2(t * 0.09, t * 0.05), t * 0.62);
  float e2 = seaCellEdge(s * 3.5 + vec2(-t * 0.07, t * 0.1) + 3.1, t * 0.5);
  float blur = 0.03 + 0.0016 * travel;
  float l1 = 1.0 - smoothstep(0.0, blur * 2.0, e1);
  float l2 = 1.0 - smoothstep(0.0, blur * 2.6, e2);
  float c = l1 * 0.75 + l2 * 0.5 + l1 * l2 * 2.2;
  // Deeper caustics are broader and dimmer.
  float contrast = exp(-travel * 0.035);
  return mix(1.0, 0.35 + 1.55 * c, contrast);
}
`;

export interface SeaShadingOptions {
  /** Unique program key. */
  key: string;
  /** How strongly surface caustics modulate the sun (0 none). */
  caustics?: number;
  /** Additive materials are only absorbed; they add no in-scatter. */
  additive?: boolean;
  /** Shared clock for caustics. */
  time?: { value: number };
}

/**
 * Chains underwater absorption (replacing three's fog) and, optionally,
 * caustic sunlight into a built-in lit material.
 */
export function applySeaShading<T extends THREE.Material>(material: T, options: SeaShadingOptions): T {
  const previous = material.onBeforeCompile;
  const defaultKey = material.customProgramCacheKey === THREE.Material.prototype.customProgramCacheKey;
  const innerKey = defaultKey ? previous.toString() : material.customProgramCacheKey();
  const causticStrength = options.caustics ?? 0;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    if (options.time) shader.uniforms.uSeaTime = options.time;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vSeaWorld;')
      .replace('#include <project_vertex>', `#include <project_vertex>
{
  vec4 seaW = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
  seaW = instanceMatrix * seaW;
  #endif
  vSeaWorld = (modelMatrix * seaW).xyz;
}`);
    const noise = shader.fragmentShader.includes('bwPcg3') ? '' : GLSL_NOISE;
    // Libraries after <common>; declarations just before main so they follow earlier hooks' noise.
    let fragment = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${noise}`)
      .replace('void main() {', `varying vec3 vSeaWorld;\n${options.time ? 'uniform float uSeaTime;' : 'const float uSeaTime = 0.0;'}\n${SEA_GLSL}\nvoid main() {`);
    if (causticStrength > 0 && options.time) {
      fragment = fragment.replace('#include <lights_fragment_begin>', `float seaCausticGain = mix(1.0, seaCaustic(vSeaWorld, uSeaTime), ${f(causticStrength)});
${THREE.ShaderChunk.lights_fragment_begin.replace('getDirectionalLightInfo( directionalLight, directLight );', 'getDirectionalLightInfo( directionalLight, directLight );\n\t\tdirectLight.color *= seaCausticGain;')}`);
    }
    fragment = fragment.replace('#include <fog_fragment>', options.additive
      ? 'gl_FragColor.rgb *= seaTransmit(vSeaWorld, cameraPosition);'
      : 'gl_FragColor.rgb = seaWater(gl_FragColor.rgb, vSeaWorld, cameraPosition);');
    shader.fragmentShader = fragment;
  };
  material.customProgramCacheKey = () => `${innerKey}|sea-water-v1|${options.key}`;
  return material;
}

/** CPU twin of seaSurge, for objects moved on the CPU. */
export function seaSurge(x: number, z: number, t: number, out = new THREE.Vector3()) {
  const ph = t - (x * .07 + z * .04);
  return out.set(Math.sin(ph * .41) * .65 + Math.sin(ph * .23 + 1.7) * .35, 0, Math.sin(ph * .29 + .6) * .3);
}

/**
 * Vertex sway for anchored, flexible life (kelp, fans, anemones). `bend` is a
 * GLSL expression in [0,1] for how free a vertex is (0 at the holdfast); the
 * world-space surge is mapped back into object space so every later stage
 * (normals aside) sees the moved vertex.
 */
export function applySway<T extends THREE.Material>(material: T, options: { key: string; time: { value: number }; bend: string; amount: number; flutter?: number; declarations?: string }): T {
  const previous = material.onBeforeCompile;
  const defaultKey = material.customProgramCacheKey === THREE.Material.prototype.customProgramCacheKey;
  const innerKey = defaultKey ? previous.toString() : material.customProgramCacheKey();
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.uniforms.uSwayTime = options.time;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
uniform float uSwayTime;
${options.declarations ?? ''}
vec3 swaySurge(vec3 p, float t) {
  float ph = t - dot(p.xz, vec2(0.07, 0.04));
  return vec3(sin(ph * 0.41) * 0.65 + sin(ph * 0.23 + 1.7) * 0.35, 0.0, sin(ph * 0.29 + 0.6) * 0.3);
}`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
{
  mat4 swayModel = modelMatrix;
  #ifdef USE_INSTANCING
  swayModel = modelMatrix * instanceMatrix;
  #endif
  vec3 swayRoot = (swayModel * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  float swayBend = clamp(${options.bend}, 0.0, 1.0);
  float swayLag = swayBend * 1.4;
  float swaySeed = fract(sin(dot(swayRoot, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
  vec3 swayWorld = swaySurge(swayRoot, uSwayTime - swayLag) * ${f(options.amount)} * swayBend * swayBend;
  swayWorld += vec3(sin(uSwayTime * 1.1 + swaySeed * 40.0 + swayBend * 5.0), 0.0, cos(uSwayTime * 0.9 + swaySeed * 23.0 + swayBend * 4.0)) * ${f(options.flutter ?? 0)} * swayBend;
  // Keep the length roughly constant: a bent stalk droops a little.
  swayWorld.y -= dot(swayWorld.xz, swayWorld.xz) * 0.12;
  transformed += inverse(mat3(swayModel)) * swayWorld;
}`);
  };
  material.customProgramCacheKey = () => `${innerKey}|sea-sway-v1|${options.key}`;
  return material;
}
