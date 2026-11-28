import * as THREE from 'three';
import { noise3, fbm3, seeded } from '../shared/render/noise';

/*
 * Code-only vegetation for the cosmic garden (original implementation):
 *  - grass carpets: thousands of tapered, curved blades that follow a height
 *    function, with darker roots, sun-bleached tips and a rim fringe that
 *    spills over an edge and breaks the silhouette,
 *  - leaf clusters (shrubs, tree crowns, vines) built from small cupped
 *    leaves whose shading normals blend toward the clump's sphere, so a crown
 *    reads as a soft volume instead of scattered cards,
 *  - hanging strands (roots and vines) as thin tubes that sway from their
 *    attachment point.
 * Everything is geometry with vertex colours: no textures, no canvas, so it
 * builds in Node tests too. One shared material set animates every piece:
 * `aSway` = (sway in metres at full wind, phase), `aThin` = how much key light
 * passes through. The garden's bioluminescent flowers light nearby grass and
 * stone through `GLOW_LIGHTS`.
 */

export const MAX_GLOW_LIGHTS = 8;

/** GLSL: soft local light from glowing plants, as albedo-weighted irradiance. */
export const GLOW_LIGHTS = /* glsl */ `
uniform vec4 uGlowPos[${MAX_GLOW_LIGHTS}];
uniform vec3 uGlowColor[${MAX_GLOW_LIGHTS}];
uniform float uGlowTime;
vec3 cosmicGlowIrradiance(vec3 p, vec3 n) {
  vec3 sum = vec3(0.0);
  for (int i = 0; i < ${MAX_GLOW_LIGHTS}; i++) {
    vec4 g = uGlowPos[i];
    if (g.w <= 0.0) continue;
    vec3 d = g.xyz - p;
    float r2 = dot(d, d);
    // Smooth inverse-square with a soft core, cut off well before it tiles.
    float fall = g.w / (r2 + .06) * (1.0 - smoothstep(g.w * 3.0, g.w * 5.5, r2));
    float facing = .30 + .70 * max(dot(n, d * inversesqrt(max(r2, 1e-4))), 0.0);
    sum += uGlowColor[i] * fall * facing;
  }
  return sum;
}
`;

export interface GlowLights {
  uniforms: { uGlowPos: { value: THREE.Vector4[] }; uGlowColor: { value: THREE.Color[] }; uGlowTime: { value: number } };
}

export function createGlowLights(): GlowLights {
  return {
    uniforms: {
      uGlowPos: { value: Array.from({ length: MAX_GLOW_LIGHTS }, () => new THREE.Vector4(0, 0, 0, 0)) },
      uGlowColor: { value: Array.from({ length: MAX_GLOW_LIGHTS }, () => new THREE.Color(0, 0, 0)) },
      uGlowTime: { value: 0 },
    },
  };
}

/**
 * Adds the glow-light irradiance to a material that already exposes a world
 * position varying. `lichen` (GLSL float expression) marks where faint
 * luminous lichen specks may grow, e.g. on moss.
 */
export function addGlowLighting<T extends THREE.Material>(material: T, glow: GlowLights, worldVarying: string, key: string, lichen?: string): T {
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    Object.assign(shader.uniforms, glow.uniforms);
    shader.fragmentShader = shader.fragmentShader
      .replace('void main() {', `${GLOW_LIGHTS}\nvoid main() {`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  vec3 glowNormal = normalize((vec4(normal, 0.0) * viewMatrix).xyz);
  totalEmissiveRadiance += diffuseColor.rgb * cosmicGlowIrradiance(${worldVarying}, glowNormal);
  ${lichen ? `{
    vec3 lp = ${worldVarying} * 9.0;
    float speck = smoothstep(.70, .86, bwNoise(lp)) * smoothstep(.1, .5, bwNoise(lp * .23 + 4.0));
    float breathe = .6 + .4 * sin(uGlowTime * .37 + dot(floor(lp * .5), vec3(1.7, 3.1, 2.3)));
    totalEmissiveRadiance += vec3(.16, .95, .78) * speck * (${lichen}) * breathe * 1.4;
  }` : ''}
}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|cosmic-glow-v1|${key}`;
  return material;
}

/** A growing geometry with the vegetation attributes. */
export class VegetationBuffer {
  positions: number[] = [];
  normals: number[] = [];
  colors: number[] = [];
  sway: number[] = [];
  thin: number[] = [];
  indices: number[] = [];
  /** Optional bioluminescence per vertex: (strength, hue, pulse phase). */
  glow: number[] | null = null;
  glowState: [number, number, number] = [0, 0, 0];

  vertex(p: THREE.Vector3, n: THREE.Vector3, c: THREE.Color, sway: number, phase: number, thin: number) {
    this.positions.push(p.x, p.y, p.z);
    this.normals.push(n.x, n.y, n.z);
    this.colors.push(c.r, c.g, c.b);
    this.sway.push(sway, phase);
    this.thin.push(thin);
    if (this.glow) this.glow.push(this.glowState[0], this.glowState[1], this.glowState[2]);
    return this.positions.length / 3 - 1;
  }

  get triangles() { return this.indices.length / 3; }

  geometry(): THREE.BufferGeometry {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.normals, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.colors, 3));
    g.setAttribute('aSway', new THREE.Float32BufferAttribute(this.sway, 2));
    g.setAttribute('aThin', new THREE.Float32BufferAttribute(this.thin, 1));
    if (this.glow) g.setAttribute('aGlow', new THREE.Float32BufferAttribute(this.glow, 3));
    g.setIndex(this.indices);
    g.computeBoundingSphere();
    if (g.boundingSphere) g.boundingSphere.radius += .2;
    return g;
  }
}

const UP = new THREE.Vector3(0, 1, 0);
const tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3(), tmpC = new THREE.Vector3(), tmpN = new THREE.Vector3();

export interface GrassOptions {
  seed: number;
  count: number;
  /** Returns a point on the ground for (u, v) in [0,1)², or null to reject it. */
  sample(u: number, v: number, random: () => number): { position: THREE.Vector3; normal: THREE.Vector3; density?: number; dry?: number } | null;
  height: [number, number];
  width: [number, number];
  /** Sway at the tip in metres. */
  sway: number;
  palette?: { root: THREE.Color; mid: THREE.Color; tip: THREE.Color; dry: THREE.Color };
  /** 0 keeps blades upright; 1 lets them flop along `lean`. */
  lean?: (p: THREE.Vector3) => THREE.Vector3 | null;
}

const DEFAULT_GRASS = {
  root: new THREE.Color(.020, .034, .016),
  mid: new THREE.Color(.075, .135, .040),
  tip: new THREE.Color(.20, .27, .085),
  dry: new THREE.Color(.30, .26, .12),
};

/**
 * Grass blades: five vertices each (three triangles), curved along a random
 * bend, normals blended toward the ground normal so the carpet shades softly.
 */
export function addGrass(buffer: VegetationBuffer, o: GrassOptions) {
  const random = seeded(o.seed);
  const palette = o.palette ?? DEFAULT_GRASS;
  const color = new THREE.Color();
  let placed = 0;
  for (let attempt = 0; attempt < o.count * 3 && placed < o.count; attempt++) {
    const hit = o.sample(random(), random(), random);
    if (!hit) continue;
    if (hit.density !== undefined && random() > hit.density) continue;
    placed++;
    const base = hit.position;
    const h = THREE.MathUtils.lerp(o.height[0], o.height[1], Math.pow(random(), 1.4)) * (hit.density !== undefined ? .65 + .35 * hit.density : 1);
    const w = THREE.MathUtils.lerp(o.width[0], o.width[1], random());
    const yaw = random() * Math.PI * 2;
    const facing = tmpA.set(Math.cos(yaw), 0, Math.sin(yaw));
    const side = tmpB.crossVectors(UP, facing).normalize();
    const leanDir = o.lean?.(base) ?? null;
    const bendAmount = .18 + random() * .45;
    const bend = (leanDir ? leanDir.clone().multiplyScalar(.55 + random() * .4) : facing.clone()).multiplyScalar(bendAmount * h);
    const phase = random() * Math.PI * 2 + base.x * .7 + base.z * .4;
    const dry = THREE.MathUtils.clamp((hit.dry ?? 0) + (random() - .5) * .3, 0, 1);
    const tint = .8 + random() * .4;
    const n = tmpN.copy(hit.normal).multiplyScalar(.75).addScaledVector(facing, .25).normalize();
    const point = (t: number, offset: number) => {
      const p = base.clone().addScaledVector(hit.normal, h * t * (1 - .25 * t * bendAmount));
      p.addScaledVector(bend, t * t);
      p.addScaledVector(side, offset);
      return p;
    };
    const vertexColor = (t: number) => {
      color.copy(palette.root).lerp(palette.mid, Math.min(1, t * 1.6));
      if (t > .55) color.lerp(palette.tip, (t - .55) / .45);
      color.lerp(palette.dry, dry * (.3 + .7 * t));
      return color.multiplyScalar(tint);
    };
    const i0 = buffer.vertex(point(0, -w * .5), n, vertexColor(0), 0, phase, .2);
    const i1 = buffer.vertex(point(0, w * .5), n, vertexColor(0), 0, phase, .2);
    const i2 = buffer.vertex(point(.5, -w * .36), n, vertexColor(.5), o.sway * .25, phase, .7);
    const i3 = buffer.vertex(point(.5, w * .36), n, vertexColor(.5), o.sway * .25, phase, .7);
    const i4 = buffer.vertex(point(1, 0), n, vertexColor(1), o.sway, phase, 1);
    buffer.indices.push(i0, i1, i2, i1, i3, i2, i2, i3, i4);
  }
  return placed;
}

export interface LeafClusterOptions {
  seed: number;
  centre: THREE.Vector3;
  radius: THREE.Vector3;
  leaves: number;
  size: [number, number];
  /** Shading normals bend this far toward the crown sphere (0..1). */
  crown?: number;
  base: THREE.Color;
  light: THREE.Color;
  sway: number;
  /** Flatten the bottom of the clump (0 round, 1 flat). */
  flat?: number;
  /** Fraction of leaves drawn from a warm or silvery accent colour. */
  accent?: { color: THREE.Color; amount: number };
  /** Two-triangle leaves for distant crowns. */
  quad?: boolean;
}

/** A soft clump of small cupped leaves (four triangles each). */
export function addLeafCluster(buffer: VegetationBuffer, o: LeafClusterOptions) {
  const random = seeded(o.seed);
  const color = new THREE.Color();
  const crown = o.crown ?? .7;
  for (let i = 0; i < o.leaves; i++) {
    // Points biased toward the surface of the ellipsoid, not its hidden core.
    const u = random() * 2 - 1, a = random() * Math.PI * 2, r = Math.sqrt(1 - u * u);
    const dir = tmpA.set(r * Math.cos(a), u, r * Math.sin(a));
    if (o.flat && dir.y < 0) dir.y *= 1 - o.flat;
    const depth = .62 + .38 * Math.pow(random(), .45);
    const p = o.centre.clone().add(new THREE.Vector3(dir.x * o.radius.x, dir.y * o.radius.y, dir.z * o.radius.z).multiplyScalar(depth));
    const outward = new THREE.Vector3(dir.x / o.radius.x, dir.y / o.radius.y, dir.z / o.radius.z).normalize();
    const size = THREE.MathUtils.lerp(o.size[0], o.size[1], random());
    // Leaf axis points outward and droops; its face tilts toward the sky.
    const axis = outward.clone().multiplyScalar(.7).add(new THREE.Vector3((random() - .5) * .8, -.25 - random() * .3, (random() - .5) * .8)).normalize();
    const across = new THREE.Vector3().crossVectors(axis, UP);
    if (across.lengthSq() < 1e-4) across.set(1, 0, 0);
    across.normalize();
    const face = new THREE.Vector3().crossVectors(across, axis).normalize();
    if (face.y < 0) face.negate();
    const shading = face.clone().lerp(outward, crown).normalize();
    // Light from the crown interior is occluded: darker leaves inside.
    const occlusion = .45 + .55 * Math.pow(depth, 2.2) * (.75 + .25 * Math.max(0, dir.y));
    color.copy(o.base).lerp(o.light, random() * .6 + Math.max(0, dir.y) * .3);
    if (o.accent && random() < o.accent.amount) color.lerp(o.accent.color, .55 + random() * .3);
    color.multiplyScalar(occlusion);
    const phase = random() * Math.PI * 2;
    const sway = o.sway * (.4 + .6 * depth);
    const tip = p.clone().addScaledVector(axis, size);
    const mid = p.clone().addScaledVector(axis, size * .45).addScaledVector(face, size * .08);
    const left = mid.clone().addScaledVector(across, -size * .32).addScaledVector(face, -size * .06);
    const right = mid.clone().addScaledVector(across, size * .32).addScaledVector(face, -size * .06);
    const i0 = buffer.vertex(p, shading, color, sway * .7, phase, .6);
    const i1 = buffer.vertex(left, shading, color, sway, phase, .9);
    const i2 = buffer.vertex(right, shading, color, sway, phase, .9);
    if (o.quad) {
      const i4 = buffer.vertex(tip, shading, color.clone().multiplyScalar(1.08), sway * 1.1, phase, 1);
      buffer.indices.push(i0, i1, i2, i1, i4, i2);
      continue;
    }
    const i3 = buffer.vertex(mid, shading, color, sway, phase, .8);
    const i4 = buffer.vertex(tip, shading, color.clone().multiplyScalar(1.08), sway * 1.1, phase, 1);
    buffer.indices.push(i0, i1, i3, i0, i3, i2, i1, i4, i3, i3, i4, i2);
  }
}

export interface StrandOptions {
  points: THREE.Vector3[];
  radius: [number, number];
  sides: number;
  segments: number;
  color: (t: number, out: THREE.Color) => THREE.Color;
  /** Sway in metres at the free end; grows with the square of the hanging length. */
  sway: number;
  phase: number;
  thin?: number;
}

/** A thin tapered tube along a curve: roots, vines, stems. */
export function addStrand(buffer: VegetationBuffer, o: StrandOptions) {
  const curve = new THREE.CatmullRomCurve3(o.points);
  const frames = curve.computeFrenetFrames(o.segments, false);
  const base = buffer.positions.length / 3;
  const color = new THREE.Color();
  for (let row = 0; row <= o.segments; row++) {
    const t = row / o.segments;
    const centre = curve.getPointAt(t, tmpC);
    const radius = THREE.MathUtils.lerp(o.radius[0], o.radius[1], t);
    o.color(t, color);
    for (let side = 0; side < o.sides; side++) {
      const angle = side / o.sides * Math.PI * 2;
      const normal = tmpN.copy(frames.normals[row]).multiplyScalar(Math.cos(angle)).addScaledVector(frames.binormals[row], Math.sin(angle)).normalize();
      const p = centre.clone().addScaledVector(normal, radius);
      buffer.vertex(p, normal, color, o.sway * t * t, o.phase, o.thin ?? .15);
    }
  }
  for (let row = 0; row < o.segments; row++) {
    for (let side = 0; side < o.sides; side++) {
      const a = base + row * o.sides + side, b = base + row * o.sides + (side + 1) % o.sides;
      const c = a + o.sides, d = b + o.sides;
      buffer.indices.push(a, c, b, b, c, d);
    }
  }
  return curve;
}

/** A hanging vine: a strand with small paired leaves along its lower length. */
export function addVine(buffer: VegetationBuffer, o: { seed: number; start: THREE.Vector3; outward: THREE.Vector3; length: number; leafSize: number; leafColor: THREE.Color; stemColor: THREE.Color; sway: number; wallDistance?: (y: number) => number }) {
  const random = seeded(o.seed);
  const points: THREE.Vector3[] = [];
  const steps = 8;
  const phase = random() * Math.PI * 2;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const p = o.start.clone().addScaledVector(o.outward, .06 + .18 * Math.sin(t * Math.PI * .5) + (o.wallDistance?.(t) ?? 0));
    p.y -= t * o.length;
    p.x += noise3(o.seed * 1.3, t * 2.2, 0) * .14 * t;
    p.z += noise3(0, t * 2.2, o.seed * 1.7) * .14 * t;
    points.push(p);
  }
  const curve = addStrand(buffer, {
    points, radius: [.012, .006], sides: 3, segments: 10, sway: o.sway, phase,
    color: (t, out) => out.copy(o.stemColor).multiplyScalar(.8 + .3 * t),
  });
  const color = new THREE.Color();
  const count = Math.round(o.length / (o.leafSize * .9));
  for (let i = 0; i < count; i++) {
    const t = .08 + .92 * i / count;
    const p = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);
    const yaw = random() * Math.PI * 2;
    const dir = new THREE.Vector3(Math.cos(yaw), -.35 - random() * .4, Math.sin(yaw)).addScaledVector(o.outward, .8).normalize();
    const across = new THREE.Vector3().crossVectors(dir, tangent).normalize();
    const face = new THREE.Vector3().crossVectors(across, dir).normalize();
    if (face.dot(o.outward) < 0) face.negate();
    const size = o.leafSize * (.7 + random() * .6) * (1 - .35 * t);
    color.copy(o.leafColor).multiplyScalar(.75 + random() * .45);
    const sway = o.sway * t * t;
    const tip = p.clone().addScaledVector(dir, size);
    const mid = p.clone().addScaledVector(dir, size * .5);
    const i0 = buffer.vertex(p, face, color, sway, phase, .7);
    const i1 = buffer.vertex(mid.clone().addScaledVector(across, -size * .3), face, color, sway, phase, .9);
    const i2 = buffer.vertex(mid.clone().addScaledVector(across, size * .3), face, color, sway, phase, .9);
    const i3 = buffer.vertex(tip, face, color, sway, phase, 1);
    buffer.indices.push(i0, i1, i2, i1, i3, i2);
  }
}

/** Linear colours of the garden's bioluminescence, by hue index. */
export const GLOW_HUES = [
  new THREE.Color(.16, .95, .78), // sea-glass teal
  new THREE.Color(.46, .42, 1.0), // violet-blue
  new THREE.Color(1.0, .60, .24), // ember amber
  new THREE.Color(.42, 1.0, .40), // spring green
];

/** The shared slow pulse (CPU twin of the shader), 0..1. */
export function glowPulse(time: number, phase: number) {
  return (.58 + .42 * Math.sin(time * .42 + phase)) * (.86 + .14 * Math.sin(time * .13 + phase * .37));
}

export interface VegetationMaterials {
  /** Grass, leaves and vines (double-sided, translucent to the key light). */
  foliage: THREE.MeshStandardMaterial;
  /** Roots and bark-like strands (opaque, stiffer). */
  wood: THREE.MeshStandardMaterial;
  /** Bioluminescent flowers, caps and tendrils: foliage shading plus a soft pulsing glow. */
  glow: THREE.MeshStandardMaterial;
  time: { value: number };
  dispose(): void;
}

/** One vegetation material set for every island and the terrace. */
export function createVegetationMaterials(options: { sun: THREE.Vector3; sunRadiance: THREE.Color; glow: GlowLights }): VegetationMaterials {
  const time = { value: 0 };
  const sunDir = { value: options.sun.clone() };
  const sunColor = { value: new THREE.Vector3(options.sunRadiance.r, options.sunRadiance.g, options.sunRadiance.b) };
  const make = (kind: 'foliage' | 'wood' | 'glow') => {
    const thinSheet = kind !== 'wood';
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: kind === 'wood' ? .92 : kind === 'glow' ? .5 : .74, metalness: 0,
      side: thinSheet ? THREE.DoubleSide : THREE.FrontSide,
    });
    material.name = `Cosmic vegetation ${kind}`;
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, { uVegTime: time, uVegSun: sunDir, uVegSunColor: sunColor }, options.glow.uniforms);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>
attribute vec2 aSway;
attribute float aThin;
uniform float uVegTime;
varying float vVegThin;
varying vec3 vVegWorld;
${kind === 'glow' ? 'attribute vec3 aGlow;\nvarying vec3 vVegGlow;' : ''}`)
        .replace('#include <begin_vertex>', `#include <begin_vertex>
{
  vec3 anchor = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  vec3 w = (modelMatrix * vec4(transformed, 1.0)).xyz;
  // Slow, unsynchronised breeze: a travelling swell plus a gentle flutter.
  float swell = sin(uVegTime * .55 + w.x * .31 + w.z * .23 + aSway.y) * .65 + sin(uVegTime * .23 + anchor.x * .7 + aSway.y * .5) * .35;
  float flutter = sin(uVegTime * 1.7 + aSway.y * 3.1 + w.y * 2.0) * .18;
  transformed.x += (swell + flutter) * aSway.x;
  transformed.z += (cos(uVegTime * .41 + w.z * .27 + aSway.y * 1.3) * .5 + flutter * .5) * aSway.x;
  vVegThin = aThin;
  ${kind === 'glow' ? 'vVegGlow = aGlow;' : ''}
}`)
        .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
vVegWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>
uniform vec3 uVegSun;
uniform vec3 uVegSunColor;
uniform float uVegTime;
varying float vVegThin;
varying vec3 vVegWorld;
${kind === 'glow' ? `varying vec3 vVegGlow;
const vec3 GLOW_HUE[4] = vec3[4](${GLOW_HUES.map(c => `vec3(${c.r.toFixed(3)}, ${c.g.toFixed(3)}, ${c.b.toFixed(3)})`).join(', ')});` : ''}
${GLOW_LIGHTS}`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  vec3 glowNormal = normalize((vec4(normal, 0.0) * viewMatrix).xyz);
  totalEmissiveRadiance += diffuseColor.rgb * cosmicGlowIrradiance(vVegWorld, glowNormal);
}`)
        .replace('#include <emissivemap_fragment>', kind === 'glow' ? `#include <emissivemap_fragment>
{
  // A slow, soft pulse per plant (period ~15 s); never a flash.
  float pulse = (.58 + .42 * sin(uVegTime * .42 + vVegGlow.z)) * (.86 + .14 * sin(uVegTime * .13 + vVegGlow.z * .37));
  vec3 hue = GLOW_HUE[int(clamp(vVegGlow.y, 0.0, 3.0) + .5)];
  totalEmissiveRadiance += hue * vVegGlow.x * pulse;
}` : '#include <emissivemap_fragment>')
        .replace('#include <opaque_fragment>', kind !== 'wood' ? `
{
  // Thin blades and leaves pass key light: strongest when lit from behind and
  // when the viewer looks toward the star through them.
  vec3 key = normalize((viewMatrix * vec4(uVegSun, 0.0)).xyz);
  vec3 toEye = normalize(vViewPosition);
  float behind = clamp(dot(-normal, key), 0.0, 1.0);
  float through = pow(clamp(dot(-toEye, key), 0.0, 1.0), 4.0);
  vec3 transmit = diffuseColor.rgb * vec3(1.25, 1.35, .55) + vec3(.004, .007, 0.0);
  outgoingLight += transmit * uVegSunColor * vVegThin * (behind * .22 + through * .65);
}
#include <opaque_fragment>` : '#include <opaque_fragment>');
    };
    material.customProgramCacheKey = () => `cosmic-vegetation-v1-${kind}`;
    return material;
  };
  const foliage = make('foliage'), wood = make('wood'), glow = make('glow');
  return { foliage, wood, glow, time, dispose() { foliage.dispose(); wood.dispose(); glow.dispose(); } };
}

/** Deterministic helpers shared by island and terrace planting. */
export function islandNoise(x: number, z: number, seed: number) {
  return fbm3(x * .45 + seed, 2.3, z * .45 - seed, 3);
}
