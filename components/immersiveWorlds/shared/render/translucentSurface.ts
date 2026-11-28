import * as THREE from 'three';
import { GLSL_NOISE } from './glsl';

/*
 * Translucent shading for MeshStandardMaterial / MeshPhysicalMaterial
 * (original implementation). Real subsurface scattering is out of reach on a
 * phone GPU, so this adds the three cues the eye reads as "light inside":
 *  - wrapped diffuse: the terminator softens and takes a tint (red for skin
 *    and membranes, blue for snow), as light diffuses under the surface,
 *  - diffuse transmission: light striking the back of a thin sheet emerges
 *    on the front, scaled by a per-pixel thinness,
 *  - a forward-scattering lobe toward the viewer for back-lit sheets
 *    (normal-distorted, after Barré-Brisebois & Bouchard, GDC 2011).
 * Every light goes through the normal three.js loops, so shadows, point and
 * spot attenuation stay intact. Hooks chain with earlier onBeforeCompile hooks.
 */

export interface TranslucencyOptions {
  /** Unique program key: each distinct option set compiles separately. */
  key: string;
  /** Linear tint of light transmitted through thin regions (multiplied by albedo). */
  color: THREE.ColorRepresentation;
  /** Strength of the view-aligned forward-scattering lobe. */
  forward?: number;
  /** Strength of diffuse transmission for light hitting the back face. */
  diffuse?: number;
  /** How far the surface normal bends the transmitted direction (0..1). */
  distortion?: number;
  /** Exponent of the forward lobe; larger is tighter. */
  power?: number;
  /** Diffuse wrap width (0 = Lambert, 1 = half-Lambert-like). */
  wrap?: number;
  /** Tint of the extra light the wrap adds past the terminator. */
  wrapTint?: THREE.ColorRepresentation;
  /**
   * GLSL statements run after `color_fragment`. They may read `vTranslucentWorld`,
   * `vTranslucentNormal`, the shared GLSL noise, and set `translucentThin` (0 opaque, 1 thin).
   */
  thickness?: string;
  /** Extra fragment declarations (uniforms, helpers) placed after the noise library. */
  declarations?: string;
  /** Uniforms referenced by `thickness` or `declarations`. */
  uniforms?: Record<string, THREE.IUniform>;
}

const linear = (c: THREE.ColorRepresentation) => {
  const color = new THREE.Color(c);
  return new THREE.Vector3(color.r, color.g, color.b);
};

/** World position and normal varyings (instancing aware) for procedural shading. */
export const TRANSLUCENT_VERTEX_VARYINGS = /* glsl */ `
varying vec3 vTranslucentWorld;
varying vec3 vTranslucentNormal;
`;
const VERTEX_WORLD = /* glsl */ `
{
  vec4 tlLocal = vec4(transformed, 1.0);
  vec3 tlNormal = objectNormal;
  #ifdef USE_INSTANCING
    tlLocal = instanceMatrix * tlLocal;
    tlNormal = mat3(instanceMatrix) * tlNormal;
  #endif
  vTranslucentWorld = (modelMatrix * tlLocal).xyz;
  vTranslucentNormal = normalize(mat3(modelMatrix) * tlNormal);
}
`;

/** Surface-gradient bump (Mikkelsen 2010) for a scalar height evaluated per pixel. */
export const GLSL_SURFACE_BUMP = /* glsl */ `
vec3 bwSurfaceBump(vec3 surfacePosition, vec3 surfaceNormal, float height, float strength) {
  vec3 sigmaX = dFdx(surfacePosition), sigmaY = dFdy(surfacePosition);
  vec3 r1 = cross(sigmaY, surfaceNormal), r2 = cross(surfaceNormal, sigmaX);
  float det = dot(sigmaX, r1);
  vec3 grad = sign(det) * (dFdx(height) * r1 + dFdy(height) * r2) * strength;
  return normalize(abs(det) * surfaceNormal - grad);
}
`;

const DIRECT = /* glsl */ `
float translucentThin = 1.0;
vec3 translucentTransmit = vec3(0.0);
uniform vec3 uTlColor;
uniform vec4 uTlLobe;
uniform float uTlWrap;
uniform vec3 uTlWrapTint;
void RE_Direct_Translucent( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
  RE_Direct_Physical( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
  float nl = dot( geometryNormal, directLight.direction );
  // Wrapped diffuse beyond the clamped Lambert term, tinted by the scattering colour.
  float wrapped = saturate( ( nl + uTlWrap ) / ( 1.0 + uTlWrap ) );
  float extra = max( wrapped - saturate( nl ), 0.0 ) / ( 1.0 + uTlWrap );
  reflectedLight.directDiffuse += extra * directLight.color * uTlWrapTint * BRDF_Lambert( material.diffuseContribution );
  // Transmission through thin regions: diffuse from the back face plus a forward lobe.
  vec3 through = directLight.direction + geometryNormal * uTlLobe.z;
  // Only light arriving from behind the sheet scatters forward through it.
  float lobe = pow( saturate( dot( geometryViewDir, -normalize( through ) ) ), uTlLobe.w ) * uTlLobe.x * ( 1.0 - smoothstep( -0.3, 0.25, nl ) );
  float back = saturate( -nl ) * uTlLobe.y;
  reflectedLight.directDiffuse += directLight.color * translucentTransmit * ( lobe + back ) * RECIPROCAL_PI;
}
#undef RE_Direct
#define RE_Direct RE_Direct_Translucent
`;

/**
 * Noise and bump helpers, unless an earlier hook already declared them.
 * Convention for chained hooks: shared libraries go after `#include <common>`
 * (guarded by this helper); every other declaration goes right before
 * `void main() {`, so later hooks always see earlier declarations.
 */
export function withSharedGlsl(source: string) {
  return `${source.includes('bwPcg3') ? '' : GLSL_NOISE}\n${source.includes('bwSurfaceBump') ? '' : GLSL_SURFACE_BUMP}`;
}

/** Adds wrap lighting and thin-sheet transmission to a standard or physical material. */
export function applyTranslucency<T extends THREE.MeshStandardMaterial>(material: T, options: TranslucencyOptions): T {
  const uniforms: Record<string, THREE.IUniform> = {
    uTlColor: { value: linear(options.color) },
    uTlLobe: { value: new THREE.Vector4(options.forward ?? 0.6, options.diffuse ?? 0.5, options.distortion ?? 0.3, options.power ?? 3) },
    uTlWrap: { value: options.wrap ?? 0.35 },
    uTlWrapTint: { value: linear(options.wrapTint ?? '#ffffff') },
    ...options.uniforms,
  };
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${TRANSLUCENT_VERTEX_VARYINGS}`)
      .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>\n${VERTEX_WORLD}`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${TRANSLUCENT_VERTEX_VARYINGS}\n${withSharedGlsl(shader.fragmentShader)}`)
      .replace('#include <lights_physical_pars_fragment>', `#include <lights_physical_pars_fragment>\n${DIRECT}`)
      .replace('void main() {', `${options.declarations ?? ''}\nvoid main() {`)
      .replace('#include <color_fragment>', `#include <color_fragment>
${options.thickness ?? ''}
translucentTransmit = uTlColor * clamp(translucentThin, 0.0, 1.0) * diffuseColor.rgb;
`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|bw-translucent-v1|${options.key}`;
  return material;
}
