import * as THREE from 'three';
import { beforeMain, withNoise } from './foliageShading';

/*
 * Procedural bark for MeshStandardMaterial on geometry with `aBark` (see
 * treeGeometry.ts): long furrows from noise zero-crossings in a seamless
 * cylinder space, cross-cracked plates, fine flakes, world-space lichen and
 * moss (on upward faces, one side of the trunk and the damp base), optional
 * rain wetness with run-off streaks. Relief shades through a derivative bump,
 * faded with distance so furrows never shimmer. Original implementation.
 */

export interface BarkSurfaceOptions {
  key: string;
  /** Furrow frequency around the trunk (per metre); match treeGeometry's barkScale. */
  scale?: number;
  /** Plate elongation along the branch; match treeGeometry's barkStretch. */
  stretch?: number;
  /** Furrow depth used for the shading bump (metres). */
  depth?: number;
  plate?: THREE.ColorRepresentation;
  fissure?: THREE.ColorRepresentation;
  lichen?: { color: THREE.ColorRepresentation; amount: number };
  moss?: { color: THREE.ColorRepresentation; amount: number; below?: number; side?: THREE.Vector3; up?: number };
  /** 0 dry .. 1 soaked: darker, glossier, with run-off streaks. */
  wetness?: number;
  roughness?: number;
}

const vec3 = (c: THREE.ColorRepresentation) => {
  const color = new THREE.Color(c);
  return `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
};
const f = (n: number) => n.toFixed(5);

export function applyBarkSurface<T extends THREE.MeshStandardMaterial>(material: T, options: BarkSurfaceOptions): T {
  const o = { scale: 1.6, stretch: 4.5, depth: 0.03, plate: '#6d6457', fissure: '#1f1a15', wetness: 0, roughness: 0.86, ...options };
  const side = o.moss?.side?.clone().normalize() ?? new THREE.Vector3(0, 0, 1);
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.vertexShader = beforeMain(shader.vertexShader, `attribute vec3 aBark;
varying vec3 vBark;
varying vec3 vBarkWorld;
varying vec2 vBarkFacing;`).replace('#include <begin_vertex>', `#include <begin_vertex>
{
  vBark = aBark;
  mat4 barkM = modelMatrix;
  #ifdef USE_INSTANCING
    barkM = barkM * instanceMatrix;
  #endif
  vBarkWorld = (barkM * vec4(transformed, 1.0)).xyz;
  vec3 barkN = normalize(mat3(barkM) * objectNormal);
  vBarkFacing = vec2(barkN.y, dot(barkN, vec3(${f(side.x)}, ${f(side.y)}, ${f(side.z)})));
}`);
    const S = f(o.scale), ST = f(o.stretch);
    shader.fragmentShader = beforeMain(shader.fragmentShader, `${withNoise(shader.fragmentShader)}
varying vec3 vBark;
varying vec3 vBarkWorld;
varying vec2 vBarkFacing;
float barkH = 0.0;
float barkMoss = 0.0;
float barkFiss = 0.0;
float barkWet = 0.0;
vec3 barkBump(vec3 surfPos, vec3 surfNorm, float h, float faceDir) {
  vec3 sx = dFdx(surfPos), sy = dFdy(surfPos);
  vec3 r1 = cross(sy, surfNorm), r2 = cross(surfNorm, sx);
  float det = dot(sx, r1) * faceDir;
  vec2 dh = vec2(dFdx(h), dFdy(h));
  vec3 grad = sign(det) * (dh.x * r1 + dh.y * r2);
  return normalize(abs(det) * surfNorm - grad);
}`).replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 q = vBark;
  float n = bwNoise(q * vec3(${S}, ${S}, ${S} / ${ST}));
  float fiss = 1.0 - smoothstep(0.0, 0.2, abs(n));
  float plate = bwNoise(q * vec3(${S} * 2.7, ${S} * 2.7, ${S} * 2.7 / ${ST}) + vec3(5.1, 0.0, 0.0));
  float crack = 1.0 - smoothstep(0.0, 0.1, abs(bwNoise(q * vec3(${S} * 3.3, ${S} * 3.3, ${S} * 1.4) + 3.3)));
  float flakes = bwNoise(q * vec3(${S} * 11.0, ${S} * 11.0, ${S} * 11.0 / (${ST} * 0.5)) + 11.0);
  crack *= (1.0 - fiss) * smoothstep(0.1, 0.5, bwNoise(q * ${S} * 0.7 + 2.0) + 0.3);
  barkFiss = fiss;
  barkH = (-fiss + plate * 0.25 * (1.0 - fiss) - crack * 0.35 + flakes * 0.08) * ${f(o.depth)};
  float macro = bwFbm3(vBarkWorld * 0.33 + 4.0);
  vec3 plateColor = diffuseColor.rgb * ${vec3(o.plate)} * (0.78 + 0.34 * macro + 0.16 * plate + 0.08 * flakes);
  vec3 color = mix(plateColor, ${vec3(o.fissure)} * (0.8 + 0.4 * macro), fiss * 0.92);
  color *= 1.0 - crack * 0.45;
  ${o.lichen ? `float lichen = smoothstep(0.32, 0.62, bwNoise(vBarkWorld * 1.6 + 2.0) * 0.7 + bwNoise(vBarkWorld * 5.3) * 0.3) * (1.0 - fiss) * ${f(o.lichen.amount)};
  color = mix(color, ${vec3(o.lichen.color)} * (0.8 + 0.35 * flakes), lichen);` : ''}
  ${o.moss ? `float mossMask = bwNoise(vBarkWorld * 0.9 + 7.0) * 0.6 + bwNoise(vBarkWorld * 3.7) * 0.4;
  float mossSite = smoothstep(-0.2, 0.7, vBarkFacing.x) * ${f(o.moss.up ?? 0.6)} + smoothstep(-0.1, 0.8, vBarkFacing.y) * 0.55
    + (1.0 - smoothstep(${f(o.moss.below ?? 0)} - 0.6, ${f(o.moss.below ?? 0)} + 0.9, vBarkWorld.y + mossMask * 0.8)) * 1.2;
  barkMoss = clamp(smoothstep(0.35, 0.85, mossSite * ${f(o.moss.amount)} + mossMask * 0.35 + fiss * 0.15), 0.0, 1.0);
  vec3 mossColor = ${vec3(o.moss.color)} * (0.62 + 0.45 * bwNoise(vBarkWorld * 7.0 + 1.0) + 0.25 * flakes + 0.25 * macro);
  color = mix(color, mossColor, barkMoss);
  barkH = mix(barkH, flakes * 0.004 + bwNoise(vBarkWorld * 23.0) * 0.003, barkMoss * 0.85);` : ''}
  ${o.wetness > 0 ? `float runoff = smoothstep(0.1, 0.6, bwNoise(vec3(q.x * 2.3, q.y * 2.3, q.z * 0.12) + 9.0));
  barkWet = clamp(${f(o.wetness)} * (0.65 + 0.35 * runoff) + fiss * 0.2, 0.0, 1.0);
  color *= mix(1.0, 0.55, barkWet * (1.0 - barkMoss * 0.5));` : ''}
  diffuseColor.rgb = color;
}`).replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = clamp(${f(o.roughness)} * (0.92 + 0.14 * barkFiss) , 0.05, 1.0);
roughnessFactor = mix(roughnessFactor, 0.96, barkMoss);
roughnessFactor = mix(roughnessFactor, 0.32, barkWet * (1.0 - barkMoss * 0.6));`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  float fade = 1.0 - smoothstep(10.0, 38.0, length(vViewPosition));
  normal = barkBump(-vViewPosition, normal, barkH * fade, faceDirection);
}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|bw-bark-v1|${options.key}`;
  return material;
}
