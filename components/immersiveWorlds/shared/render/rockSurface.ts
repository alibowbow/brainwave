import * as THREE from 'three';
import { GLSL_NOISE } from './glsl';

/*
 * Procedural rock surface for MeshStandardMaterial. Everything is evaluated in
 * world space, so large meshes never show UV seams or stretching:
 *  - albedo: broad mineral blotches, sediment strata, downward mineral stains,
 *    darkened crevices and a wet/algae band at the waterline,
 *  - roughness: dry stone versus wet film, with drip streaks that catch light,
 *  - normal: a world-space height field (pits, grain, cracks) differentiated
 *    by finite differences and applied as a surface-gradient bump.
 */

export interface RockSurfaceOptions {
  /** World-space feature scale; 1 suits metre-sized rock faces. */
  scale?: number;
  /** Strength of the bump (0..~2). */
  bump?: number;
  /** Colour multiplied into stained streaks (iron, manganese). */
  stain?: THREE.ColorRepresentation;
  stainAmount?: number;
  /** Crevice darkening (0..1). */
  cavity?: number;
  /** Sediment layering amplitude (0..1). */
  strata?: number;
  dryRoughness?: number;
  wetRoughness?: number;
  /** Baseline wetness everywhere (0..1). */
  wetness?: number;
  /** Fraction of the surface covered by wet drip streaks (0..1). */
  drips?: number;
  /** Water surface height; stone below and just above it is wet and tinted. */
  waterY?: number;
  wetBand?: number;
  algae?: THREE.ColorRepresentation;
  algaeAmount?: number;
  /** Light reflected off sunlit water, dancing on nearby stone. */
  caustics?: { centre: THREE.Vector3; radius: number; color: THREE.Color; time: { value: number } };
  /** Unique key: each distinct option set compiles to its own program. */
  key: string;
}

const vec3 = (c: THREE.ColorRepresentation) => {
  const color = new THREE.Color(c);
  return `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
};
const f = (n: number) => n.toFixed(5);

export function createRockMaterial(color: THREE.ColorRepresentation, options: RockSurfaceOptions, params: THREE.MeshStandardMaterialParameters = {}) {
  const material = new THREE.MeshStandardMaterial({ color, roughness: options.dryRoughness ?? 0.86, metalness: 0, ...params });
  applyRockSurface(material, options);
  return material;
}

export function applyRockSurface(material: THREE.MeshStandardMaterial, options: RockSurfaceOptions) {
  const o = {
    scale: 1, bump: 1, stain: '#8a5a32', stainAmount: 0.35, cavity: 0.55, strata: 0.35,
    dryRoughness: 0.86, wetRoughness: 0.22, wetness: 0, drips: 0.25, waterY: -1e3, wetBand: 0.6,
    algae: '#3d4a2c', algaeAmount: 0.25, ...options,
  };
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    const caustics = options.caustics;
    if (caustics) {
      shader.uniforms.uRockTime = caustics.time;
      shader.uniforms.uCausticCentre = { value: caustics.centre };
      shader.uniforms.uCausticColor = { value: caustics.color };
    }
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vRockWorld;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvRockWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vRockWorld;
${GLSL_NOISE}
${options.caustics ? 'uniform float uRockTime; uniform vec3 uCausticCentre; uniform vec3 uCausticColor;' : ''}
float rockCrackAt(vec3 p) {
  // Sparse fractures: a low-frequency mask keeps them from tiling into a net.
  return pow(1.0 - abs(bwNoise(p * 1.15 + 3.1)), 22.0) * smoothstep(0.05, 0.45, bwNoise(p * 0.31 + 8.3));
}
float rockHeight(vec3 p) {
  float crack = rockCrackAt(p);
  return bwFbm3(p * 2.6) * 0.035 + bwNoise(p * 11.0) * 0.006 + bwNoise(p * 37.0) * 0.0018 - crack * 0.012;
}
`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 rockP = vRockWorld * ${f(o.scale)};
float rockMacro = bwFbm3(rockP * 0.16 + 11.0);
float rockMid = bwNoise(rockP * 0.9 + 4.0);
float rockStrata = sin(rockP.y * 3.4 + bwFbm3(rockP * 0.22) * 5.0);
float rockStain = smoothstep(0.05, 0.6, bwFbm3(vec3(rockP.x * 0.85, rockP.y * 0.09, rockP.z * 0.85) + 7.0));
float rockCrack = rockCrackAt(rockP);
float rockPit = smoothstep(0.35, 0.75, bwNoise(rockP * 4.3 + 1.7));
vec3 rockColor = diffuseColor.rgb * (0.74 + 0.30 * rockMacro + 0.10 * rockMid);
rockColor *= 1.0 + ${f(o.strata)} * 0.12 * rockStrata;
rockColor = mix(rockColor, rockColor * ${vec3(o.stain)} * 1.6, rockStain * ${f(o.stainAmount)});
rockColor *= 1.0 - ${f(o.cavity)} * (0.35 * rockCrack + 0.22 * rockPit);
float rockAbove = vRockWorld.y - ${f(o.waterY)};
float rockBand = 1.0 - smoothstep(0.0, ${f(o.wetBand)}, rockAbove + 0.12 * bwNoise(rockP * 1.7));
float rockDrip = smoothstep(0.42, 0.72, bwFbm3(vec3(rockP.x * 2.2, rockP.y * 0.11, rockP.z * 2.2) + 19.0)) * ${f(o.drips)} * 2.0;
float rockWet = clamp(max(max(${f(o.wetness)}, rockBand), rockDrip), 0.0, 1.0);
rockColor = mix(rockColor, ${vec3(o.algae)} * (0.8 + 0.4 * rockMid), rockBand * ${f(o.algaeAmount)} * smoothstep(-0.4, 0.2, rockAbove));
rockColor *= mix(1.0, 0.58, rockWet);
diffuseColor.rgb = rockColor;
`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(${f(o.dryRoughness)}, ${f(o.wetRoughness)}, rockWet) * (0.9 + 0.2 * rockMid);
roughnessFactor = clamp(roughnessFactor + rockCrack * 0.15, 0.04, 1.0);
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  const float e = 0.012;
  float h0 = rockHeight(rockP);
  vec3 grad = vec3(rockHeight(rockP + vec3(e, 0.0, 0.0)) - h0, rockHeight(rockP + vec3(0.0, e, 0.0)) - h0, rockHeight(rockP + vec3(0.0, 0.0, e)) - h0) / e;
  // Wet films smooth out the finest relief.
  grad *= ${f(o.bump)} * mix(1.0, 0.65, rockWet);
  vec3 viewGrad = (viewMatrix * vec4(grad, 0.0)).xyz;
  normal = normalize(normal - (viewGrad - dot(viewGrad, normal) * normal));
}
`)
      .replace('#include <emissivemap_fragment>', options.caustics ? `#include <emissivemap_fragment>
{
  // Two drifting ridge layers make the bright filaments of reflected caustics.
  vec3 cp = vRockWorld * 1.45;
  float c1 = 1.0 - abs(bwNoise(cp + vec3(0.0, uRockTime * 0.22, uRockTime * 0.16)));
  float c2 = 1.0 - abs(bwNoise(cp * 1.7 + vec3(uRockTime * 0.19, 0.0, -uRockTime * 0.14) + 5.0));
  float pattern = pow(c1, 9.0) + 0.7 * pow(c2, 9.0);
  vec3 toPool = uCausticCentre - vRockWorld;
  float reach = exp(-dot(toPool, toPool) / ${f((options.caustics?.radius ?? 1) ** 2)});
  vec3 worldNormal = normalize((vec4(normal, 0.0) * viewMatrix).xyz);
  float facing = max(dot(worldNormal, normalize(toPool)), 0.0);
  float aboveWater = smoothstep(0.05, 0.5, vRockWorld.y - ${f(o.waterY)});
  totalEmissiveRadiance += uCausticColor * pattern * reach * facing * aboveWater * diffuseColor.rgb * 2.5;
}
` : '#include <emissivemap_fragment>');
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|bw-rock-v1|${options.key}`;
  return material;
}
