import * as THREE from 'three';
import { GLSL_NOISE } from './glsl';

/*
 * Interior surfaces for MeshStandardMaterial / MeshPhysicalMaterial, evaluated
 * procedurally in the fragment shader so they never tile or blur up close:
 *  - plaster: broad trowel relief, faint stains and grime near the floor,
 *  - glaze: fired ceramic with iron speckle, pooled colour and a glossy coat.
 * Relief is a height in metres turned into a normal with screen-space
 * derivatives (surface-gradient bump), so it is scale-correct and cheap.
 * The building blocks (`patchSurface`, `GLSL_SURFACE_BUMP`) are shared by the
 * wood and fabric surfaces.
 */

/** Surface-gradient bump: perturbs a view-space normal by a height field given in metres. */
export const GLSL_SURFACE_BUMP = /* glsl */ `
vec3 bwSurfaceBump(vec3 viewPosition, vec3 n, float height, float faceDir) {
  vec3 dpdx = dFdx(viewPosition), dpdy = dFdy(viewPosition);
  float dhdx = dFdx(height), dhdy = dFdy(height);
  vec3 r1 = cross(dpdy, n), r2 = cross(n, dpdx);
  float det = dot(dpdx, r1) * faceDir;
  vec3 grad = sign(det) * (dhdx * r1 + dhdy * r2);
  return normalize(abs(det) * n - grad);
}
/** 0 where a pattern of the given screen-space frequency would alias, 1 where it resolves. */
float bwResolve(float frequencyPerPixel) { return 1.0 - smoothstep(0.2, 0.6, frequencyPerPixel); }
`;

export interface SurfacePatch {
  /** Unique key: each distinct option set compiles to its own program. */
  key: string;
  /** GLSL helpers placed after <common> in the fragment shader. */
  fragmentHeader?: string;
  /** Code after <color_fragment>; may modify diffuseColor and declare surface variables used later. */
  color?: string;
  /** Code after <roughnessmap_fragment>; may modify roughnessFactor. */
  roughness?: string;
  /** Expression (float, metres) for relief; applied after <normal_fragment_maps>. */
  height?: string;
  /** Code after <emissivemap_fragment>; may add to totalEmissiveRadiance. */
  emissive?: string;
  /** Code after <lights_physical_fragment>; may adjust `material` (e.g. clearcoat under USE_CLEARCOAT). */
  lights?: string;
  /** Use object-space position (geometry units) instead of world space for vSurface. */
  objectSpace?: boolean;
  /**
   * Read the object-space frame from `surfaceLocal` / `surfaceLocalNormal`
   * attributes, so props merged into one mesh keep their own grain or pattern.
   */
  localAttribute?: boolean;
  uniforms?: Record<string, THREE.IUniform>;
}

/**
 * Patches a lit material. `vSurface` (position) and `vSurfaceNormal` (normal)
 * are available in the fragment code in the chosen space, `vSurfaceWorld` is
 * always the world position and `vSurfaceUv` mirrors the geometry uv.
 */
export function patchSurface<T extends THREE.MeshStandardMaterial>(material: T, patch: SurfacePatch): T {
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    Object.assign(shader.uniforms, patch.uniforms ?? {});
    const space = patch.localAttribute
      ? 'vSurface = surfaceLocal; vSurfaceNormal = normalize(surfaceLocalNormal);'
      : patch.objectSpace
      ? 'vSurface = transformed; vSurfaceNormal = normalize(objectNormal);'
      : `#ifdef USE_INSTANCING
mat4 surfaceModel = modelMatrix * instanceMatrix;
#else
mat4 surfaceModel = modelMatrix;
#endif
vSurface = (surfaceModel * vec4(transformed, 1.0)).xyz; vSurfaceNormal = normalize(mat3(surfaceModel) * objectNormal);`;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
varying vec3 vSurface;
varying vec3 vSurfaceNormal;
varying vec3 vSurfaceWorld;
varying vec2 vSurfaceUv;
${patch.localAttribute ? 'attribute vec3 surfaceLocal;\nattribute vec3 surfaceLocalNormal;' : ''}`)
      .replace('#include <uv_vertex>', '#include <uv_vertex>\nvSurfaceUv = uv;')
      .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
#ifdef USE_INSTANCING
vSurfaceWorld = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
#else
vSurfaceWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
#endif
${space}`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vSurface;
varying vec3 vSurfaceNormal;
varying vec3 vSurfaceWorld;
varying vec2 vSurfaceUv;
${GLSL_NOISE}
${GLSL_SURFACE_BUMP}
${patch.fragmentHeader ?? ''}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float surfaceHeight = 0.0;
${patch.color ?? ''}
${patch.height ? `surfaceHeight = ${patch.height};` : ''}`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>\n${patch.roughness ?? ''}`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
${patch.height ? 'normal = bwSurfaceBump(-vViewPosition, normal, surfaceHeight, faceDirection);' : ''}`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>\n${patch.emissive ?? ''}`)
      .replace('#include <lights_physical_fragment>', `#include <lights_physical_fragment>\n${patch.lights ?? ''}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|bw-surface-v1|${patch.key}`;
  return material;
}

export const glslVec3 = (c: THREE.ColorRepresentation) => {
  const color = new THREE.Color(c);
  return `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
};
export const glslFloat = (n: number) => n.toFixed(5);

export interface PlasterOptions {
  key: string;
  /** Feature scale; 1 suits room walls in metres. */
  scale?: number;
  /** Relief strength multiplier. */
  bump?: number;
  /** Faint water/age stains (0..1). */
  stains?: number;
  /** Floor height: walls darken slightly toward it (scuffs, settled dust). */
  floorY?: number;
  /** Soot or smoke darkening above a point (fireplace), radius in metres. */
  soot?: { centre: THREE.Vector3; radius: number; amount: number };
}

/** Lime plaster: broad trowel relief, faint stains, grime at the skirting. */
export function createPlasterMaterial(color: THREE.ColorRepresentation, options: PlasterOptions, params: THREE.MeshStandardMaterialParameters = {}) {
  const o = { scale: 1, bump: 1, stains: 0.5, floorY: -1e3, ...options };
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0, ...params });
  const soot = o.soot;
  return patchSurface(material, {
    key: `plaster|${o.key}`,
    color: `
vec3 plP = vSurface * ${glslFloat(o.scale)};
float plBroad = bwFbm3(plP * 0.55 + 7.1);
float plTrowel = bwNoise(vec3(plP.x * 1.6 + plP.y * 0.7, plP.y * 2.1 - plP.z * 0.4, plP.z * 1.6 + plP.x * 0.3) + 2.3);
float plFineFreq = length(fwidth(plP)) * 34.0;
float plFine = bwNoise(plP * 34.0) * bwResolve(plFineFreq);
float plStain = smoothstep(0.15, 0.75, bwFbm3(vec3(plP.x * 0.4, plP.y * 0.18, plP.z * 0.4) + 3.0)) * ${glslFloat(o.stains)};
vec3 plColor = diffuseColor.rgb * (0.92 + 0.08 * plBroad + 0.04 * plTrowel + 0.025 * plFine);
plColor *= 1.0 - 0.1 * plStain;
plColor *= mix(0.78, 1.0, smoothstep(0.0, 0.55, vSurface.y - ${glslFloat(o.floorY)} + 0.08 * plBroad));
${soot ? `{
  vec3 sd = (vSurface - ${glslVec3(new THREE.Color(soot.centre.x, soot.centre.y, soot.centre.z))});
  float sootMask = exp(-dot(sd.xz, sd.xz) / ${glslFloat(soot.radius * soot.radius)}) * smoothstep(-0.4, 0.6, sd.y) * (0.75 + 0.25 * plBroad);
  plColor *= 1.0 - ${glslFloat(soot.amount)} * sootMask;
}` : ''}
diffuseColor.rgb = plColor;`,
    height: `(plTrowel * 0.0011 + plBroad * 0.0016 + plFine * 0.00008) * ${glslFloat(o.bump)}`,
    roughness: 'roughnessFactor = clamp(roughnessFactor * (0.94 + 0.08 * plTrowel) - 0.05 * plStain, 0.3, 1.0);',
  });
}

export interface GlazeOptions {
  key: string;
  /** Dark iron speckle density (0..1). */
  speckle?: number;
  /** Colour where glaze pools thicker (rims, low areas use world height bands). */
  pool?: THREE.ColorRepresentation;
  scale?: number;
}

/** Fired stoneware glaze: speckles, pooled depth and a glassy clearcoat. */
export function createGlazeMaterial(color: THREE.ColorRepresentation, options: GlazeOptions, params: THREE.MeshPhysicalMaterialParameters = {}) {
  const o = { speckle: 0.5, pool: color, scale: 1, ...options };
  const material = new THREE.MeshPhysicalMaterial({ color, roughness: 0.32, metalness: 0, clearcoat: 0.8, clearcoatRoughness: 0.12, ...params });
  return patchSurface(material, {
    key: `glaze|${o.key}`,
    objectSpace: true,
    color: `
vec3 glP = vSurface * ${glslFloat(o.scale)};
float glFlow = bwFbm3(vec3(glP.x * 9.0, glP.y * 3.0, glP.z * 9.0));
float glSpeck = step(0.86 - 0.12 * ${glslFloat(o.speckle)}, bwValue(glP * 160.0)) * bwResolve(length(fwidth(glP)) * 160.0);
vec3 glColor = mix(diffuseColor.rgb, ${glslVec3(o.pool)}, smoothstep(-0.2, 0.5, glFlow) * 0.55);
glColor *= 0.94 + 0.08 * bwNoise(glP * 40.0);
glColor = mix(glColor, glColor * 0.32, glSpeck);
diffuseColor.rgb = glColor;`,
    height: 'glFlow * 0.0004',
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.06 * glFlow, 0.05, 1.0);',
  });
}
