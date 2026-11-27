import * as THREE from 'three';
import { glslFloat, patchSurface } from './interiorSurface';

/*
 * Procedural textiles for MeshStandardMaterial / MeshPhysicalMaterial, in the
 * geometry's uv space so the weave follows folds and seams:
 *  - plain / twill: interlaced warp and weft with per-thread colour,
 *  - knit: columns of interlocking V stitches,
 *  - velvet / pile: no visible weave, crushed pile tone and fibre fuzz.
 * Weave relief fades to its average before it can alias, leaving only the
 * slow heather mottling at a distance. Pair with the physical `sheen` lobe for
 * the soft rim light of wool and velvet.
 */

export interface FabricSurfaceOptions {
  /** Unique key: each distinct option set compiles to its own program. */
  key: string;
  weave?: 'plain' | 'twill' | 'knit' | 'velvet';
  /** Threads (or stitches) per uv unit along u and v. */
  threads?: [number, number];
  /** Slow colour mottling (0..1). */
  heather?: number;
  /** Per-thread colour variation (0..1). */
  threadContrast?: number;
  /** Loose fibre fuzz (0..1). */
  fuzz?: number;
  /** Relief depth in metres for one thread height. */
  depth?: number;
  /**
   * Optional GLSL that may change `fbBase` (vec3 colour) from `fbUv` (uv)
   * after the weave is known: stripes, checks or a woven rug design.
   */
  pattern?: string;
  /** GLSL helpers available to `pattern`. */
  patternHeader?: string;
}

export function applyFabricSurface<T extends THREE.MeshStandardMaterial>(material: T, options: FabricSurfaceOptions): T {
  const o = { weave: 'plain' as const, threads: [180, 180] as [number, number], heather: 0.5, threadContrast: 0.5, fuzz: 0.3, depth: 0.0005, ...options };
  const weave = o.weave === 'knit' ? `
  // Columns of V stitches: each half-column leans the other way, rows offset.
  vec2 fbK = vec2(fbT.x * 2.0, fbT.y);
  float fbHalf = fract(fbK.x) - 0.5;
  float fbLean = fract(fbK.y + (mod(floor(fbK.x), 2.0) < 0.5 ? fbHalf : -fbHalf) * 0.9);
  float fbH0 = sin(3.14159 * clamp(abs(fbHalf) * 2.0, 0.0, 1.0)) * 0.25 + 0.75 * sin(3.14159 * fbLean);
  float fbId = bwHash1(vec3(floor(fbK.x), floor(fbK.y + 0.5), 5.0));`
    : o.weave === 'velvet' ? `
  float fbH0 = 0.5 + 0.5 * bwNoise(vec3(fbT * 1.0, 2.0));
  float fbId = bwHash1(vec3(floor(fbT * 0.5), 9.0));`
    : `
  vec2 fbCell = floor(fbT), fbF = fract(fbT);
  float fbOver = ${o.weave === 'twill' ? 'step(1.5, mod(fbCell.x + fbCell.y, 4.0))' : 'mod(fbCell.x + fbCell.y, 2.0)'};
  float fbWarp = sin(fbF.x * 3.14159) * (0.62 + 0.38 * sin(fbF.y * 3.14159));
  float fbWeft = sin(fbF.y * 3.14159) * (0.62 + 0.38 * sin(fbF.x * 3.14159));
  float fbH0 = mix(fbWeft, fbWarp, fbOver);
  float fbId = mix(bwHash1(vec3(fbCell.y, 1.0, 0.0)), bwHash1(vec3(fbCell.x, 2.0, 0.0)), fbOver);`;
  return patchSurface(material, {
    key: `fabric|${o.key}`,
    fragmentHeader: o.patternHeader,
    color: `
vec2 fbUv = vSurfaceUv;
vec2 fbT = fbUv * vec2(${glslFloat(o.threads[0])}, ${glslFloat(o.threads[1])});
vec2 fbFw = fwidth(fbT);
float fbAa = bwResolve(max(fbFw.x, fbFw.y));
${weave}
float fbH = mix(0.5, fbH0, fbAa);
float fbThread = mix(0.5, fbId, fbAa);
float fbFuzz = bwNoise(vec3(fbT * 2.7, 4.0)) * bwResolve(max(fbFw.x, fbFw.y) * 2.7);
float fbHeather = bwFbm3(vec3(fbUv * 5.0, 1.7)) + 0.5 * bwNoise(vec3(fbUv * 23.0, 3.1));
vec3 fbBase = diffuseColor.rgb;
${o.pattern ?? ''}
vec3 fbColor = fbBase * (1.0 + ${glslFloat(o.heather)} * 0.16 * fbHeather);
fbColor *= 1.0 + ${glslFloat(o.threadContrast)} * 0.22 * (fbThread - 0.5);
// Thread crowns catch light; valleys between threads stay shaded.
fbColor *= 0.82 + 0.3 * fbH + ${glslFloat(o.fuzz)} * 0.08 * fbFuzz;
diffuseColor.rgb = fbColor;`,
    height: `((fbH - 0.5) + ${glslFloat(o.fuzz)} * 0.3 * fbFuzz) * ${glslFloat(o.depth)} * mix(0.25, 1.0, fbAa)`,
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.06 * (0.5 - fbH), 0.3, 1.0);',
  });
}

/** Fabric material; `sheen` (0..1) selects MeshPhysicalMaterial for wool, velvet and brushed cotton. */
export function createFabricMaterial(color: THREE.ColorRepresentation, options: FabricSurfaceOptions & { sheen?: number; sheenColor?: THREE.ColorRepresentation; roughness?: number }, params: THREE.MeshPhysicalMaterialParameters = {}) {
  const { sheen = 0, sheenColor, roughness = 0.92, ...surface } = options;
  const material = sheen > 0
    ? new THREE.MeshPhysicalMaterial({ color, roughness, metalness: 0, sheen, sheenRoughness: 0.55, sheenColor: sheenColor ?? new THREE.Color(color).lerp(new THREE.Color('#ffffff'), 0.35), ...params })
    : new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, ...params });
  return applyFabricSurface(material, surface);
}
