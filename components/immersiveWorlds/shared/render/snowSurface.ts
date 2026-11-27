import * as THREE from 'three';
import { applyTranslucency, withSharedGlsl } from './translucentSurface';

/*
 * Code-only snow for the immersive worlds (original implementation).
 *  - `createSnowMaterial`: settled snow for MeshStandardMaterial. Wrapped,
 *    blue-tinted diffuse stands in for subsurface scattering at the
 *    terminator and in shade; per-light glints come from sparse, randomly
 *    oriented ice facets on a world-space cell grid (stable, never swimming,
 *    faded out where cells shrink below a pixel); wind ripples, soft lumps and
 *    an optional trodden path perturb the normal and albedo.
 *  - `applySnowCover`: normal-based accumulation on other materials (roofs,
 *    rails, branches): upward-facing surfaces whiten with a noisy edge.
 * Hooks chain with earlier onBeforeCompile hooks.
 */

export interface SnowOptions {
  key: string;
  /** Albedo of fresh snow (sRGB hex). */
  color?: THREE.ColorRepresentation;
  /** Linear tint of light scattered past the terminator and into shade. */
  scatter?: THREE.ColorRepresentation;
  /** Wrap width of the scattered term (0..1). */
  wrap?: number;
  /** Multiplier on indirect (sky) diffuse light: snow shade reads blue. */
  ambientTint?: THREE.ColorRepresentation;
  /** Peak glint radiance multiplier per light; 0 disables glints. */
  sparkle?: number;
  /** Fraction of cells holding a facet (0..1). */
  sparkleDensity?: number;
  /** Facet cells per metre. */
  sparkleScale?: number;
  /** Strength of wind ripples and lumps in the normal. */
  ripple?: number;
  /** World-space direction (xz) that wind ripples run across. */
  rippleDirection?: [number, number];
  roughness?: number;
  /** GLSL expression in `vec3 p` (world) returning 0..1 for compacted, darker snow. */
  trodden?: string;
}

/** Linear working-space colour as a GLSL literal. */
const glslVec3 = (c: THREE.ColorRepresentation) => {
  const color = new THREE.Color(c);
  return `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
};
const f = (n: number) => n.toFixed(5);

/** Settled snow: blue subsurface wrap, ice glints, ripples and lumps. */
export function createSnowMaterial(options: SnowOptions, params: THREE.MeshStandardMaterialParameters = {}) {
  const o = {
    color: '#f1f5fb', scatter: '#6d98dc', wrap: 0.55, ambientTint: '#c4d5f4', sparkle: 26, sparkleDensity: 0.14,
    sparkleScale: 170, ripple: 1, rippleDirection: [0.8, 0.6] as [number, number], roughness: 0.72, ...options,
  };
  const material = new THREE.MeshStandardMaterial({ color: o.color, roughness: o.roughness, metalness: 0, ...params });
  applyTranslucency(material, {
    key: `snow-${o.key}`, color: o.scatter, forward: 0, diffuse: 0, wrap: o.wrap, wrapTint: o.scatter,
  });
  const dir = new THREE.Vector2(...o.rippleDirection).normalize();
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.fragmentShader = shader.fragmentShader
      // After the translucent override (declared at the lighting chunk), before main.
      .replace('void main() {', `vec3 snowFacet = vec3(0.0, 0.0, 1.0);
float snowGlint = 0.0;
void RE_Direct_Snow( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
  RE_Direct_Translucent( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
  if (snowGlint > 0.0) {
    vec3 h = normalize( directLight.direction + geometryViewDir );
    float lit = saturate( dot( geometryNormal, directLight.direction ) * 4.0 );
    reflectedLight.directSpecular += directLight.color * pow( saturate( dot( snowFacet, h ) ), 220.0 ) * snowGlint * lit;
  }
}
#undef RE_Direct
#define RE_Direct RE_Direct_Snow
float snowLumps(vec3 p) {
  vec2 d = vec2(${f(dir.x)}, ${f(dir.y)});
  float along = dot(p.xz, d);
  float warp = bwNoise(p * 0.9 + 3.0) * 2.2;
  float ripples = sin(along * 9.0 + warp) * 0.5 + 0.5;
  ripples = ripples * ripples * smoothstep(-0.2, 0.5, bwNoise(p * 0.35 + 7.0));
  return bwFbm3(p * 0.7) * 0.05 + ripples * 0.007 + bwNoise(p * 4.3) * 0.004;
}
void main() {`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float snowTrodden = 0.0;
{
  vec3 p = vTranslucentWorld;
  ${o.trodden ? `snowTrodden = clamp(${o.trodden}, 0.0, 1.0);` : ''}
  float drift = bwNoise(p * 0.45 + 2.0);
  diffuseColor.rgb *= 0.95 + 0.05 * drift;
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.8, 0.83, 0.88), snowTrodden * (0.65 + 0.35 * bwNoise(p * 2.7)));
}
`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = clamp(roughnessFactor - snowTrodden * 0.18, 0.2, 1.0);
`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  vec3 p = vTranslucentWorld;
  float fade = clamp(1.4 - length(fwidth(p)) * 9.0, 0.0, 1.0);
  float h = snowLumps(p) * mix(0.35, 1.0, fade) * (1.0 - snowTrodden * 0.5) + snowTrodden * bwNoise(p * vec3(6.0, 1.0, 1.4)) * 0.006;
  normal = bwSurfaceBump(-vViewPosition, normal, h, ${f(o.ripple)});
  // Ice facets: sparse cells, each tilted at random within 60 degrees of the surface,
  // glint when the half vector falls inside their narrow lobe.
  vec3 sp = p * ${f(o.sparkleScale)};
  vec3 cell = floor(sp);
  vec3 r = bwHash3(cell);
  float pixel = length(fwidth(sp));
  float present = step(1.0 - ${f(o.sparkleDensity)}, r.x) * (1.0 - smoothstep(0.2, 0.46, length(fract(sp) - 0.5)));
  snowGlint = present * clamp(1.7 - pixel * 0.8, 0.0, 1.0) * ${f(o.sparkle)} * (1.0 - snowTrodden * 0.7);
  vec3 sn = normalize(vTranslucentNormal);
  vec3 st = normalize(cross(sn, abs(sn.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
  vec3 sb = cross(sn, st);
  float cosT = 1.0 - r.z * 0.5, sinT = sqrt(max(1.0 - cosT * cosT, 0.0)), phi = r.y * 6.2831853;
  vec3 facetWorld = sn * cosT + (st * cos(phi) + sb * sin(phi)) * sinT;
  snowFacet = normalize((viewMatrix * vec4(facetWorld, 0.0)).xyz);
}
`)
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
reflectedLight.indirectDiffuse *= ${glslVec3(o.ambientTint)};
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|bw-snow-v1|${o.key}`;
  return material;
}

export interface SnowCoverOptions {
  key: string;
  /** 0..1 overall cover. */
  amount?: number;
  /** World normal.y where cover begins (lower covers steeper faces). */
  threshold?: number;
  color?: THREE.ColorRepresentation;
  roughness?: number;
  /** Feature size of the ragged cover edge, in cycles per metre. */
  scale?: number;
}

/** Normal-based snow accumulation for any standard material. */
export function applySnowCover<T extends THREE.MeshStandardMaterial>(material: T, options: SnowCoverOptions): T {
  const o = { amount: 1, threshold: 0.55, color: '#eef3fa', roughness: 0.8, scale: 2.4, ...options };
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vSnowWorld;\nvarying vec3 vSnowNormal;')
      .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
{
  vec4 snowLocal = vec4(transformed, 1.0);
  vec3 snowN = objectNormal;
  #ifdef USE_INSTANCING
    snowLocal = instanceMatrix * snowLocal;
    snowN = mat3(instanceMatrix) * snowN;
  #endif
  vSnowWorld = (modelMatrix * snowLocal).xyz;
  vSnowNormal = normalize(mat3(modelMatrix) * snowN);
}`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vSnowWorld;\nvarying vec3 vSnowNormal;\n${withSharedGlsl(shader.fragmentShader)}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float snowCover;
{
  vec3 p = vSnowWorld * ${f(o.scale)};
  float edge = bwNoise(p) * 0.22 + bwNoise(p * 4.1 + 3.0) * 0.08;
  snowCover = smoothstep(${f(o.threshold)}, ${f(o.threshold + 0.2)}, normalize(vSnowNormal).y + edge) * ${f(o.amount)};
  diffuseColor.rgb = mix(diffuseColor.rgb, ${glslVec3(o.color)} * (0.94 + 0.06 * bwNoise(p * 7.0)), snowCover);
}
`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor, ${f(o.roughness)}, snowCover);
`)
      .replace('#include <metalnessmap_fragment>', `#include <metalnessmap_fragment>
metalnessFactor *= 1.0 - snowCover;
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|bw-snow-cover-v1|${o.key}`;
  return material;
}
