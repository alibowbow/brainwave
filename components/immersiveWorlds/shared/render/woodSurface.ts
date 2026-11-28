import * as THREE from 'three';
import { glslFloat, glslVec3, patchSurface } from './interiorSurface';

/*
 * Procedural wood for MeshStandardMaterial / MeshPhysicalMaterial. Growth
 * rings are distances from an off-board pith line that runs along the grain,
 * distorted by low-frequency noise, so flat faces show cathedral figure and
 * end faces show rings, exactly as sawn timber does. Fibre streaks and pores
 * fade out before they can alias. Optional shader-drawn boards (floors,
 * panelling) give each plank its own tone, grain offset and bevelled seams.
 * Varnish uses the physical clearcoat lobe, dulled in worn patches and seams.
 */

export interface WoodSurfaceOptions {
  /** Unique key: each distinct option set compiles to its own program. */
  key: string;
  /** Grain direction, in the chosen space. */
  axis?: 'x' | 'y' | 'z';
  /** Evaluate in geometry units (props move with their mesh) instead of world space. */
  objectSpace?: boolean;
  /** Object frame comes from `surfaceLocal` attributes (merged props); implies object space. */
  localFrame?: boolean;
  /** Pith position across the grain; default is off-board (sawn timber). [0, 0] centres rings (logs). */
  pith?: [number, number];
  /** Bark colour on faces whose normal points away from the pith (round outside of logs). */
  bark?: THREE.ColorRepresentation;
  /** Overall feature scale multiplier (use with scaled meshes). */
  scale?: number;
  /** Growth rings per metre of radius. */
  rings?: number;
  /** Earlywood/latewood contrast (0..1). */
  figure?: number;
  /** Latewood band colour; defaults to a darker, warmer version of the base colour. */
  latewood?: THREE.ColorRepresentation;
  /** Open pore density (0..1): oak high, maple low. */
  pores?: number;
  /** Matte worn patches (0..1). */
  wear?: number;
  /** Relief multiplier. */
  bump?: number;
  /** Per-surface variation seed. */
  seed?: number;
  /** Shader-drawn boards: width across the grain, length along it, bevel width (metres). */
  planks?: { width: number; length: number; bevel?: number; tone?: number };
}

const swizzle = { x: 'zyx', y: 'xzy', z: 'xyz' } as const;

export function applyWoodSurface<T extends THREE.MeshStandardMaterial>(material: T, options: WoodSurfaceOptions): T {
  const o = { axis: 'z' as const, scale: 1, rings: 28, figure: 0.65, pores: 0.4, wear: 0.15, bump: 1, seed: 0, ...options };
  const planks = o.planks;
  const latewood = o.latewood ? glslVec3(o.latewood) : 'diffuseColor.rgb * vec3(0.52, 0.43, 0.36)';
  const seed = o.seed * 17.31;
  return patchSurface(material, {
    key: `wood|${o.key}`,
    objectSpace: o.objectSpace || o.localFrame,
    localAttribute: o.localFrame,
    color: `
vec3 wdQ = (vSurface * ${glslFloat(o.scale)}).${swizzle[o.axis]} + vec3(${glslFloat(seed * 0.37)}, ${glslFloat(seed * 0.11)}, ${glslFloat(seed)});
float wdBoard = 0.5, wdSeam = 1.0;
${planks ? `{
  float wdW = ${glslFloat(planks.width)}, wdL = ${glslFloat(planks.length)};
  float wdCol = floor(wdQ.x / wdW);
  float wdShift = bwHash1(vec3(wdCol, 3.0, 7.0)) * wdL;
  float wdSeg = floor((wdQ.z + wdShift) / wdL);
  wdBoard = bwHash1(vec3(wdCol, wdSeg, 11.0));
  float wdU = (wdQ.x / wdW - wdCol) * wdW;
  float wdV = fract((wdQ.z + wdShift) / wdL) * wdL;
  float wdEdge = min(min(wdU, wdW - wdU), min(wdV, wdL - wdV));
  float wdBevel = ${glslFloat(planks.bevel ?? 0.004)};
  // A filtered seam: never thinner than a pixel, so distant boards do not crawl.
  float wdPix = max(length(fwidth(wdQ.xz)), 1e-5);
  wdSeam = smoothstep(0.0, max(wdBevel, wdPix * 1.5), wdEdge);
  // Seams fade as they shrink below a few pixels, leaving only the board tone.
  wdSeam = mix(1.0, wdSeam, 1.0 - 0.6 * smoothstep(wdBevel * 1.2, wdBevel * 5.0, wdPix));
  wdQ += vec3(wdBoard * 3.7, wdBoard * 1.9, wdBoard * 11.0);
}` : ''}
float wdWarp = bwFbm3(vec3(wdQ.xy * 2.4, wdQ.z * 0.32));
vec2 wdPith = ${o.pith ? `vec2(${glslFloat(o.pith[0])}, ${glslFloat(o.pith[1])}) + vec2(${glslFloat(seed * 0.37)}, ${glslFloat(seed * 0.11)})` : 'vec2(0.31 + 0.25 * wdBoard, -0.27 + 0.1 * wdBoard)'};
float wdR = length(wdQ.xy - wdPith) + wdWarp * 0.05 + bwNoise(vec3(wdQ.xy * 7.0, wdQ.z * 0.9)) * 0.005;
float wdRings = wdR * ${glslFloat(o.rings)};
float wdF = fract(wdRings);
float wdLate = smoothstep(0.42, 0.8, wdF) * (1.0 - smoothstep(0.88, 1.0, wdF));
wdLate = mix(0.32, wdLate, bwResolve(fwidth(wdRings) * 1.6));
float wdStreak = bwNoise(vec3(wdQ.xy * 150.0, wdQ.z * 2.2)) * bwResolve(length(fwidth(wdQ.xy)) * 150.0);
float wdPore = smoothstep(0.62, 0.95, bwValue(vec3(wdQ.xy * 380.0, wdQ.z * 12.0))) * bwResolve(length(fwidth(wdQ)) * 380.0) * ${glslFloat(o.pores)};
float wdTone = 0.9 + ${glslFloat(planks?.tone ?? 0.28)} * (wdBoard - 0.5) + 0.12 * bwFbm3(vec3(wdQ.xy * 0.9, wdQ.z * 0.15) + 1.3);
vec3 wdColor = mix(diffuseColor.rgb * 1.16, ${latewood}, wdLate * ${glslFloat(o.figure)}) * wdTone * (0.94 + 0.08 * wdStreak);
wdColor *= 1.0 - 0.4 * wdPore;
wdColor *= mix(0.55, 1.0, wdSeam);
float wdWear = smoothstep(0.3, 0.85, bwFbm3(vSurface * 1.1 + 4.0)) * ${glslFloat(o.wear)};
wdColor = mix(wdColor, wdColor * 1.08 + 0.01, wdWear * 0.6);
float wdBark = 0.0, wdBarkH = 0.0;
${o.bark ? `{
  vec3 wdN = normalize(vSurfaceNormal).${swizzle[o.axis]};
  vec2 wdRad = wdQ.xy - wdPith;
  float wdOut = dot(normalize(wdN.xy + 1e-5), normalize(wdRad + 1e-5));
  wdBark = smoothstep(0.82, 0.95, wdOut) * (1.0 - smoothstep(0.35, 0.6, abs(wdN.z)));
  float wdFissure = bwRidged(vec3(wdQ.xy * 26.0, wdQ.z * 4.5));
  wdBarkH = wdFissure * 0.006;
  wdColor = mix(wdColor, ${glslVec3(o.bark)} * (0.45 + 0.75 * wdFissure), wdBark);
}` : ''}
diffuseColor.rgb = wdColor;`,
    height: `mix((-wdLate * 0.00022 + wdStreak * 0.00007 - wdPore * 0.0001 - (1.0 - wdSeam) * 0.0012) * ${glslFloat(o.bump)}, wdBarkH, wdBark)`,
    roughness: 'roughnessFactor = mix(clamp(roughnessFactor * (0.9 + 0.22 * wdLate) + 0.22 * wdPore + 0.3 * wdWear + (1.0 - wdSeam) * 0.25, 0.04, 1.0), 0.95, wdBark);',
    lights: `#ifdef USE_CLEARCOAT
material.clearcoat *= wdSeam * (1.0 - 0.75 * wdWear);
material.clearcoatRoughness = clamp(material.clearcoatRoughness + 0.25 * wdWear, 0.0, 1.0);
#endif`,
  });
}

/**
 * Wood with an optional varnish coat. `varnish` > 0 returns a MeshPhysicalMaterial
 * whose clearcoat gives the second, sharper reflection of lacquered timber.
 */
export function createWoodMaterial(color: THREE.ColorRepresentation, options: WoodSurfaceOptions & { varnish?: number; roughness?: number }, params: THREE.MeshPhysicalMaterialParameters = {}) {
  const { varnish = 0, roughness = 0.62, ...surface } = options;
  const material = varnish > 0
    ? new THREE.MeshPhysicalMaterial({ color, roughness, metalness: 0, clearcoat: varnish, clearcoatRoughness: 0.16, ...params })
    : new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, ...params });
  return applyWoodSurface(material, surface);
}
