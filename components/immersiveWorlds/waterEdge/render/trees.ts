import * as THREE from 'three';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { noise3 } from '../../shared/render/noise';
import type { Crown } from './foliage';

/*
 * Broadleaf trees grown in code: tapered, gently bending limbs with bark relief
 * and a root flare, forking into secondary branches whose tips carry leaf
 * crowns (see foliage.ts). Limbs are emitted as geometry to merge per world.
 */

/** A tapered tube along a curve, with bark ridges and an optional root flare. */
export function limbGeometry(points: THREE.Vector3[], radius: number, taper: number, sides: number, seed: number, flare = 0) {
  const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
  const length = curve.getLength();
  const rings = Math.max(3, Math.min(24, Math.round(length / Math.max(radius * 2.2, .12))));
  const frames = curve.computeFrenetFrames(rings, false);
  const positions: number[] = [], indices: number[] = [];
  const point = new THREE.Vector3();
  for (let j = 0; j <= rings; j++) {
    const t = j / rings;
    curve.getPointAt(t, point);
    const along = t * length;
    const r0 = radius * (1 - taper * t) * (1 + flare * Math.exp(-along * 3.2));
    const n = frames.normals[j], b = frames.binormals[j];
    for (let i = 0; i <= sides; i++) {
      const a = i / sides * Math.PI * 2;
      const ridge = 1 + .07 * noise3(Math.cos(a) * 2.2 + seed, along * 1.7, Math.sin(a) * 2.2) + .04 * Math.sin(a * 5 + along * 1.3 + seed);
      const r = r0 * ridge;
      positions.push(point.x + (n.x * Math.cos(a) + b.x * Math.sin(a)) * r, point.y + (n.y * Math.cos(a) + b.y * Math.sin(a)) * r, point.z + (n.z * Math.cos(a) + b.z * Math.sin(a)) * r);
      if (j < rings && i < sides) {
        const k = j * (sides + 1) + i;
        indices.push(k, k + sides + 1, k + 1, k + 1, k + sides + 1, k + sides + 2);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export interface TreeSpec {
  base: THREE.Vector3;
  height: number;
  radius: number;
  /** Main scaffold limbs. */
  branches: number;
  /** Crown ellipsoid radius around each branch tip, metres. */
  crown: number;
  cardsPerCrown: number;
  cardSize: [number, number];
  tint: THREE.Color;
  /** Horizontal spread of the canopy relative to height. */
  spread?: number;
  /** Lean direction and amount (radians-ish). */
  lean?: THREE.Vector2;
}

export function growTree(spec: TreeSpec, random: () => number, limbs: THREE.BufferGeometry[], crowns: Crown[]) {
  const { base, height, radius, branches } = spec;
  const spread = spec.spread ?? .45;
  const lean = spec.lean ?? new THREE.Vector2((random() - .5) * .3, (random() - .5) * .3);
  const seed = random() * 100;
  const trunkTop = base.clone().add(new THREE.Vector3(lean.x * height * .5, height * .62, lean.y * height * .5));
  const trunkMid = base.clone().lerp(trunkTop, .5).add(new THREE.Vector3((random() - .5) * radius * 2, 0, (random() - .5) * radius * 2));
  limbs.push(limbGeometry([base.clone().setY(base.y - .3), base, trunkMid, trunkTop], radius, .55, radius > .12 ? 9 : 7, seed, .55));
  for (let b = 0; b < branches; b++) {
    const t = .45 + .55 * (b + random() * .6) / branches;
    const start = base.clone().lerp(trunkTop, t);
    const angle = b * 2.39996 + random() * .8;
    const reach = height * spread * (.55 + random() * .5) * (1.15 - t * .4);
    const rise = height * (.22 + random() * .3) * (1.1 - t * .5);
    const end = start.clone().add(new THREE.Vector3(Math.cos(angle) * reach, rise, Math.sin(angle) * reach));
    const elbow = start.clone().lerp(end, .45).add(new THREE.Vector3(0, rise * .18, 0));
    const r = radius * (.42 - t * .12);
    limbs.push(limbGeometry([start, elbow, end], r, .7, 6, seed + b));
    const tips = 2 + Math.floor(random() * 2);
    for (let k = 0; k < tips; k++) {
      const from = start.clone().lerp(end, .55 + random() * .35);
      const a = angle + (random() - .5) * 1.6;
      const twig = from.clone().add(new THREE.Vector3(Math.cos(a) * reach * .45, rise * (.2 + random() * .35), Math.sin(a) * reach * .45));
      limbs.push(limbGeometry([from, from.clone().lerp(twig, .5).add(new THREE.Vector3(0, .1, 0)), twig], r * .4, .75, 4, seed + b * 7 + k));
      const size = spec.crown * (.75 + random() * .5);
      crowns.push({ centre: twig.clone().add(new THREE.Vector3(0, size * .15, 0)), radii: new THREE.Vector3(size, size * (.62 + random() * .2), size), cards: Math.round(spec.cardsPerCrown * (.8 + random() * .4)), size: spec.cardSize, tint: spec.tint });
    }
  }
  // A crown over the leader closes the top of the canopy.
  const top = trunkTop.clone().add(new THREE.Vector3(0, height * .3, 0));
  limbs.push(limbGeometry([trunkTop, trunkTop.clone().lerp(top, .5), top], radius * .35, .8, 5, seed + 99));
  crowns.push({ centre: top, radii: new THREE.Vector3(spec.crown * 1.1, spec.crown * .8, spec.crown * 1.1), cards: spec.cardsPerCrown, size: spec.cardSize, tint: spec.tint });
}

/** World-space bark: vertical fissures, lichen and moss toward the damp base. */
export function barkMaterial(color: THREE.ColorRepresentation, options: { key: string; lichen?: THREE.ColorRepresentation; moss?: THREE.ColorRepresentation; mossHeight?: number }) {
  const material = new THREE.MeshStandardMaterial({ color, roughness: .92, metalness: 0 });
  const lichen = new THREE.Color(options.lichen ?? '#7d8a74'), moss = new THREE.Color(options.moss ?? '#3d5226');
  const v = (c: THREE.Color) => `vec3(${c.r.toFixed(4)}, ${c.g.toFixed(4)}, ${c.b.toFixed(4)})`;
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vBarkWorld;\nvarying vec3 vBarkNormal;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvBarkWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvBarkNormal = normalize(mat3(modelMatrix) * objectNormal);');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vBarkWorld;
varying vec3 vBarkNormal;
${GLSL_NOISE}
float barkHeight(vec3 p) {
  float fissure = max(1.0 - abs(bwNoise(vec3(p.x * 9.0, p.y * 1.1, p.z * 9.0))), 0.0);
  return pow(fissure, 3.0) * 0.02 + bwNoise(p * 31.0) * 0.003;
}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 bp = vBarkWorld;
float barkF = pow(max(1.0 - abs(bwNoise(vec3(bp.x * 9.0, bp.y * 1.1, bp.z * 9.0))), 0.0), 3.0);
float barkMacro = bwFbm3(bp * vec3(1.4, 0.35, 1.4) + 3.0);
diffuseColor.rgb *= (0.62 + 0.38 * barkF) * (0.82 + 0.3 * barkMacro);
float barkLichen = smoothstep(0.25, 0.65, bwFbm3(bp * 2.3 + 9.0)) * 0.55;
diffuseColor.rgb = mix(diffuseColor.rgb, ${v(lichen)} * (0.7 + 0.3 * barkF), barkLichen * barkF);
float barkMoss = (1.0 - smoothstep(0.1, ${(options.mossHeight ?? 1.2).toFixed(3)}, bp.y + 0.4 * bwNoise(bp * 1.7))) * smoothstep(-0.2, 0.6, vBarkNormal.y + 0.5 * bwNoise(bp * 3.0));
diffuseColor.rgb = mix(diffuseColor.rgb, ${v(moss)} * (0.7 + 0.5 * bwNoise(bp * 7.0)), clamp(barkMoss, 0.0, 0.85));`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  const float e = 0.01;
  float h0 = barkHeight(bp);
  vec3 grad = vec3(barkHeight(bp + vec3(e, 0, 0)) - h0, barkHeight(bp + vec3(0, e, 0)) - h0, barkHeight(bp + vec3(0, 0, e)) - h0) / e;
  vec3 viewGrad = (viewMatrix * vec4(grad * 1.2, 0.0)).xyz;
  normal = normalize(normal - (viewGrad - dot(viewGrad, normal) * normal));
}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|we-bark-v1|${options.key}`;
  return material;
}
