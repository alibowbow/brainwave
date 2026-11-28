import * as THREE from 'three';
import { GLSL_NOISE } from './glsl';

/*
 * Rain-wet surfaces for MeshStandardMaterial / MeshPhysicalMaterial, in world
 * space so large or merged meshes never show seams:
 *  - porosity darkening and a glossy water film (albedo and roughness),
 *  - standing water on up-facing surfaces, with animated rain-ring ripples
 *    in the normal so puddles reflect the radiance probe and sparkle,
 *  - slow sheen streaks running down vertical faces,
 *  - an optional shelter plane: the covered side of it stays dry.
 * Original implementation. Chains any existing onBeforeCompile (e.g. the
 * rock surface) and runs after its albedo/roughness edits.
 */

export interface WetSurfaceOptions {
  /** Unique key: each distinct option set compiles to its own program. */
  key: string;
  /** Shared clock in seconds (ripples and running water). */
  time: { value: number };
  /** Baseline wetness on exposed surfaces (0..1). */
  wetness?: number;
  /** Albedo multiplier at full wetness; porous materials darken a lot. */
  darkening?: number;
  /** Roughness of a fully wet film. */
  wetRoughness?: number;
  /** Fraction of up-facing surface covered by standing water (0..1). */
  puddles?: number;
  /** World-space feature size of puddle shapes, metres. */
  puddleSize?: number;
  /** Ripple strength inside puddles (0..1). */
  ripples?: number;
  /** Rain impact cells per metre. */
  rippleDensity?: number;
  /** Running-water streaks on vertical faces (0..1). */
  streaks?: number;
  /** Surfaces on the negative side of this plane are sheltered and stay dry. */
  shelter?: { normal: THREE.Vector3; offset: number; softness?: number };
}

/** Rain-ring ripple gradient for a horizontal water film (xz in rain cells). */
export const GLSL_WET_RIPPLES = /* glsl */ `
vec2 wetRippleGradient(vec2 p, float t) {
  vec2 g = vec2(0.0);
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec2 q = p * (1.0 + 0.29 * fi) + vec2(fi * 7.31, fi * 3.17);
    vec2 cell = floor(q);
    vec3 h = bwHash3(vec3(cell, fi + 11.0));
    // Each cell drops at its own rate and phase; a third of the cells rest.
    float age = fract(t * (0.42 + 0.38 * h.z) + h.x * 3.7 + h.y * 1.3);
    vec2 d = q - (cell + 0.28 + 0.44 * h.xy);
    float r = length(d);
    float x = (r - age * 0.42) * 30.0;
    float env = (1.0 - age) * (1.0 - age) * step(0.33, h.z) * (1.0 - smoothstep(0.38, 0.5, r));
    g += d / max(r, 1e-3) * sin(x) * exp(-x * x * 0.08) * env;
  }
  return g;
}
`;

const f = (n: number) => n.toFixed(5);

export function applyWetSurface<T extends THREE.MeshStandardMaterial>(material: T, options: WetSurfaceOptions): T {
  const o = {
    wetness: 0.8, darkening: 0.6, wetRoughness: 0.12, puddles: 0, puddleSize: 1.6,
    ripples: 1, rippleDensity: 9, streaks: 0, ...options,
  };
  const shelter = options.shelter;
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.uniforms.uWetTime = options.time;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWetWorld;\nvarying vec3 vWetNormal;')
      .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
{
  vec4 wetWorld = vec4(transformed, 1.0);
  vec3 wetNormal = objectNormal;
  #ifdef USE_INSTANCING
  wetWorld = instanceMatrix * wetWorld;
  wetNormal = mat3(instanceMatrix) * wetNormal;
  #endif
  vWetWorld = (modelMatrix * wetWorld).xyz;
  vWetNormal = normalize(mat3(modelMatrix) * wetNormal);
}`);
    // Declarations go just before main(), after any noise an earlier patch added.
    const needsNoise = !shader.fragmentShader.includes('bwPcg3(');
    shader.fragmentShader = shader.fragmentShader
      .replace(/void\s+main\s*\(\s*\)\s*\{/, () => `varying vec3 vWetWorld;
varying vec3 vWetNormal;
uniform float uWetTime;
${needsNoise ? GLSL_NOISE : ''}
${GLSL_WET_RIPPLES}
void main() {`)
      .replace('#include <metalnessmap_fragment>', `#include <metalnessmap_fragment>
vec3 wetN = normalize(vWetNormal);
float wetExposed = ${shelter ? `smoothstep(${f(-(shelter.softness ?? 0.3))}, ${f(shelter.softness ?? 0.3)}, dot(vWetWorld, ${`vec3(${f(shelter.normal.x)}, ${f(shelter.normal.y)}, ${f(shelter.normal.z)})`}) - ${f(shelter.offset)})` : '1.0'};
float wetUp = smoothstep(0.72, 0.96, wetN.y);
float wetPuddle = 0.0;
${o.puddles > 0 ? `{
  float shape = bwFbm3(vec3(vWetWorld.xz / ${f(o.puddleSize)}, 3.7)) * 0.5 + 0.5 + 0.04 * bwNoise(vec3(vWetWorld.xz * 9.0, 1.0));
  float cut = 1.0 - ${f(o.puddles)} * 0.5;
  wetPuddle = smoothstep(cut, cut + 0.035, shape) * wetUp * wetExposed;
}` : ''}
float wetStreak = 0.0;
${o.streaks > 0 ? `wetStreak = (1.0 - wetUp) * smoothstep(0.25, 0.75, bwNoise(vec3(vWetWorld.x * 7.0 + vWetWorld.z * 7.0, vWetWorld.y * 0.55 + uWetTime * 0.06, vWetWorld.z * 3.0))) * ${f(o.streaks)};` : ''}
float wetAmount = clamp(${f(o.wetness)} * wetExposed * (0.85 + 0.15 * bwNoise(vWetWorld * 1.7)) + wetStreak * wetExposed, 0.0, 1.0);
diffuseColor.rgb *= mix(1.0, ${f(o.darkening)}, wetAmount);
diffuseColor.rgb *= mix(1.0, 0.55, wetPuddle);
roughnessFactor = mix(roughnessFactor, ${f(o.wetRoughness)}, wetAmount);
roughnessFactor = mix(roughnessFactor, 0.025, wetPuddle);
metalnessFactor *= 1.0 - wetPuddle;
`)
      .replace('#include <emissivemap_fragment>', `${o.puddles > 0 ? `if (wetPuddle > 0.001) {
  vec2 rippleGrad = wetRippleGradient(vWetWorld.xz * ${f(o.rippleDensity)}, uWetTime) * ${f(o.ripples * 0.22)};
  vec3 wetFlatN = normalize((viewMatrix * vec4(-rippleGrad.x, 1.0, -rippleGrad.y, 0.0)).xyz);
  normal = normalize(mix(normal, wetFlatN, wetPuddle));
}` : ''}
#include <emissivemap_fragment>`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|bw-wet-v1|${options.key}`;
  return material;
}
