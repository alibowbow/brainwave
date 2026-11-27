import * as THREE from 'three';
import { GLSL_NOISE } from './glsl';

/*
 * Shading hooks for vegetation and anything lit through vegetation, applied to
 * MeshStandardMaterial/MeshPhysicalMaterial with onBeforeCompile:
 *  - a world-space position varying (wind-displaced) for procedural shading,
 *  - a scene-wide sun visibility term (canopy gaps, crown shadows) that scales
 *    the first directional light, so dapples on the ground, bark and leaves
 *    match the god rays a volume pass draws with the same GLSL,
 *  - hierarchical wind: whole-plant sway, branch sway sharing a limb phase,
 *    and leaf flutter, all slow and out of step between neighbours,
 *  - leaf translucency (back light and forward scattering of the sun),
 *  - one shared normal for both faces of cards with baked crown normals,
 *  - mip-aware alpha so alpha-tested foliage keeps its density at distance.
 * Original implementation.
 */

/** Sun visibility in world space. `glsl` must define `float bwCanopy(vec3 p)` (0 blocked .. 1 open). */
export interface CanopyLight {
  key: string;
  glsl: string;
  uniforms: Record<string, THREE.IUniform>;
}

export interface FoliageWind {
  time: { value: number };
  /**
   * 'height': template object-space y in [0, height] drives the bend (grass, ferns, instanced plants).
   * 'attribute': per-vertex `aWind` (trunk, branch, flutter weights) and `aWindPhase` (tree, limb phase) from treeGeometry.
   */
  mode: 'height' | 'attribute';
  height?: number;
  /** Sway amplitude in metres at full weight. */
  sway: number;
  /** Leaf flutter amplitude in metres. */
  flutter?: number;
  /** Prevailing wind direction on the ground plane. */
  direction?: [number, number];
  /** Time scale; 1 is a light breeze. */
  speed?: number;
}

export interface FoliageShadingOptions {
  /** Unique key: each distinct option set compiles to its own program. */
  key: string;
  canopy?: CanopyLight | null;
  wind?: FoliageWind | null;
  /** Light transmitted through thin leaves, tinted by `tint` times the albedo. */
  translucency?: { tint: THREE.ColorRepresentation; back: number; forward: number } | null;
  /** Keep the authored normal on both faces (cards with baked crown normals). */
  sharedNormals?: boolean;
  /** Raise alpha with the sampled mip level so cut-out leaves stay dense far away. */
  coverage?: boolean;
  /** Extra fragment code after `color_fragment`; `vBwWorld` and `bwSun` are available. */
  colorGlsl?: string;
  /** Extra fragment code after `roughnessmap_fragment`. */
  roughnessGlsl?: string;
  /** Extra declarations for the fragment shader (functions, uniforms). */
  fragmentHeader?: string;
  /** Extra uniforms shared with the program (by reference). */
  uniforms?: Record<string, THREE.IUniform>;
}

export const GLSL_WIND = /* glsl */ `
uniform float uBwTime;
uniform vec4 uBwWind;
uniform float uBwWindSpeed;
vec3 bwWindOffset(vec3 world, vec3 anchor, float trunkW, float branchW, float flutterW, float phaseA, float phaseB) {
  float t = uBwTime * uBwWindSpeed;
  vec2 dir = uBwWind.zw;
  // A slow travelling gust envelope keeps neighbouring plants out of step.
  float gust = 0.6 + 0.4 * sin(t * 0.21 + dot(anchor.xz, vec2(0.071, 0.053))) * sin(t * 0.13 + anchor.x * 0.031 - anchor.z * 0.047);
  float trunk = (sin(t * 0.43 + phaseA) * 0.7 + sin(t * 0.79 + phaseA * 1.7) * 0.3) * gust;
  float branch = (sin(t * 0.87 + phaseB) * 0.6 + sin(t * 1.43 + phaseB * 2.3) * 0.4) * (0.55 + 0.45 * gust);
  vec3 offset = vec3(dir.x, 0.0, dir.y) * (trunk * trunkW + branch * branchW) * uBwWind.x;
  offset.y -= abs(branch) * branchW * uBwWind.x * 0.2;
  vec3 f = vec3(sin(t * 1.9 + world.y * 3.1 + phaseB * 4.0), sin(t * 2.3 + world.x * 2.7 + phaseA), sin(t * 2.1 + world.z * 3.3 + phaseB));
  return offset + f * flutterW * uBwWind.y * (0.45 + 0.55 * gust);
}
`;

const vec3Literal = (c: THREE.ColorRepresentation) => {
  const color = new THREE.Color(c);
  return `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
};

/** The shared noise, guarded so several hooks on one program include it once. */
export function withNoise(source: string) {
  return source.includes('uvec3 bwPcg3') ? '' : `#ifndef BW_NOISE\n#define BW_NOISE\n${GLSL_NOISE}\n#endif\n`;
}

/** Inserts declarations just before main(), after everything earlier hooks declared. */
export function beforeMain(source: string, text: string) {
  return source.replace(/void\s+main\s*\(\s*\)\s*\{/, match => `${text}\n${match}`);
}

export function applyFoliageShading<T extends THREE.MeshStandardMaterial>(material: T, options: FoliageShadingOptions): T {
  const previous = material.onBeforeCompile;
  const wind = options.wind;
  const windUniform = wind ? {
    uBwTime: wind.time,
    uBwWind: { value: new THREE.Vector4(wind.sway, wind.flutter ?? 0, ...normalised(wind.direction ?? [1, 0.35])) },
    uBwWindSpeed: { value: wind.speed ?? 1 },
  } : {};
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    Object.assign(shader.uniforms, windUniform, options.canopy?.uniforms ?? {}, options.uniforms ?? {});
    const defines: string[] = [];
    if (wind) {
      defines.push('#define BW_WIND');
      if (wind.mode === 'attribute') defines.push('#define BW_WIND_ATTRIBUTE');
      defines.push(`#define BW_WIND_HEIGHT ${(wind.height ?? 1).toFixed(4)}`);
    }
    shader.vertexShader = beforeMain(shader.vertexShader, `${defines.join('\n')}
varying vec3 vBwWorld;
${wind ? GLSL_WIND : ''}
${wind?.mode === 'attribute' ? 'attribute vec3 aWind;\nattribute vec2 aWindPhase;' : ''}
`)
      .replace('#include <project_vertex>', `
vec4 bwWorldPos = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
  bwWorldPos = instanceMatrix * bwWorldPos;
#endif
bwWorldPos = modelMatrix * bwWorldPos;
#ifdef BW_WIND
  #ifdef USE_INSTANCING
    vec3 bwAnchor = (modelMatrix * vec4(instanceMatrix[3].xyz, 1.0)).xyz;
    float bwScale = length(instanceMatrix[1].xyz);
  #else
    vec3 bwAnchor = modelMatrix[3].xyz;
    float bwScale = 1.0;
  #endif
  #ifdef BW_WIND_ATTRIBUTE
    bwWorldPos.xyz += bwWindOffset(bwWorldPos.xyz, bwAnchor + vec3(aWindPhase.x * 3.0, 0.0, 0.0), aWind.x, aWind.y, aWind.z, aWindPhase.x, aWindPhase.y);
  #else
    float bwH = clamp(position.y / BW_WIND_HEIGHT, 0.0, 1.5);
    float bwPhase = dot(bwAnchor.xz, vec2(1.37, 2.11));
    bwWorldPos.xyz += bwWindOffset(bwWorldPos.xyz, bwAnchor, bwH * bwH * bwScale, 0.0, bwH * bwScale, bwPhase, bwPhase * 1.31 + 0.7);
  #endif
#endif
vBwWorld = bwWorldPos.xyz;
vec4 mvPosition = viewMatrix * bwWorldPos;
gl_Position = projectionMatrix * mvPosition;
`);

    const lights = THREE.ShaderChunk.lights_fragment_begin;
    const dirStart = lights.indexOf('#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )');
    const reDirect = 'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );';
    const translucency = options.translucency;
    let dirPart = lights.slice(dirStart)
      .replace('getDirectionalLightInfo( directionalLight, directLight );', `getDirectionalLightInfo( directionalLight, directLight );
		#if ( UNROLLED_LOOP_INDEX == 0 )
		directLight.color *= bwSun;
		#endif`);
    if (translucency) {
      dirPart = dirPart.replace(reDirect, `${reDirect}
		{
			// Thin leaves pass sunlight through to the shaded side, strongest looking toward the sun.
			float bwBack = saturate( -dot( geometryNormal, directLight.direction ) );
			float bwForward = pow( saturate( dot( geometryViewDir, -directLight.direction ) ), 5.0 );
			reflectedLight.directDiffuse += directLight.color * material.diffuseColor * ${vec3Literal(translucency.tint)} * ( bwBack * ${translucency.back.toFixed(4)} + bwForward * ${translucency.forward.toFixed(4)} );
		}`);
    }
    const lightsChunk = `float bwSun = ${options.canopy ? 'bwCanopy( vBwWorld )' : '1.0'};\n${lights.slice(0, dirStart)}${dirPart}`;

    shader.fragmentShader = beforeMain(shader.fragmentShader, `varying vec3 vBwWorld;
${options.canopy || options.fragmentHeader ? withNoise(shader.fragmentShader) : ''}
${options.canopy?.glsl ?? ''}
${options.fragmentHeader ?? ''}
`).replace('#include <lights_fragment_begin>', lightsChunk);
    if (options.sharedNormals) {
      shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_begin>',
        THREE.ShaderChunk.normal_fragment_begin.replace(/normal \*= faceDirection;/g, '').replace(/bitangent \*= faceDirection;/g, '').replace(/tangent \*= faceDirection;/g, ''));
    }
    if (options.coverage) {
      shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
#ifdef USE_MAP
{
  vec2 bwTexel = vMapUv * vec2(textureSize(map, 0));
  vec2 bwDx = dFdx(bwTexel), bwDy = dFdy(bwTexel);
  float bwMip = max(0.0, 0.5 * log2(max(dot(bwDx, bwDx), dot(bwDy, bwDy))));
  diffuseColor.a *= 1.0 + bwMip * 0.25;
}
#endif`);
    }
    if (options.colorGlsl) shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>\n${options.colorGlsl}`);
    if (options.roughnessGlsl) shader.fragmentShader = shader.fragmentShader.replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>\n${options.roughnessGlsl}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|bw-foliage-v1|${options.key}|${options.canopy?.key ?? 'open'}`;
  return material;
}

function normalised([x, z]: [number, number]): [number, number] {
  const length = Math.hypot(x, z) || 1;
  return [x / length, z / length];
}

/**
 * Canopy as a broken leaf layer at height `height`: the sun ray from a point is
 * followed up to the layer and tested against gap noise there, so patches on
 * the floor, on bark and in the air (god rays) all line up.
 */
export function layerCanopy(options: { key: string; toSun: THREE.Vector3; height: number; scale: number; cover: number; softness?: number; floor?: number; time: { value: number };
  /** Gaps that light a chosen world point (x, y, z) with a patch of `radius` metres at the leaf layer. */
  clearings?: Array<{ target: THREE.Vector3; radius: number }> }): CanopyLight {
  const toSun = options.toSun.clone().normalize();
  const clearings = (options.clearings ?? []).slice(0, 4).map(({ target, radius }) => {
    const rise = options.height - target.y;
    return new THREE.Vector4(target.x + toSun.x / Math.max(toSun.y, 0.2) * rise, target.z + toSun.z / Math.max(toSun.y, 0.2) * rise, radius, 1);
  });
  while (clearings.length < 4) clearings.push(new THREE.Vector4(0, 0, 1, 0));
  return {
    key: `layer-${options.key}`,
    uniforms: {
      uBwToSun: { value: toSun },
      uBwCanopy: { value: new THREE.Vector4(options.height, options.cover, options.scale, options.softness ?? 0.12) },
      uBwCanopyFloor: { value: options.floor ?? 0.02 },
      uBwCanopyTime: options.time,
      uBwClearing: { value: clearings },
    },
    glsl: /* glsl */ `
uniform vec3 uBwToSun;
uniform vec4 uBwCanopy;
uniform float uBwCanopyFloor;
uniform float uBwCanopyTime;
uniform vec4 uBwClearing[4];
float bwCanopy(vec3 p) {
  float rise = uBwCanopy.x - p.y;
  if (rise < -1.5) return 1.0;
  vec2 s = p.xz + uBwToSun.xz / max(uBwToSun.y, 0.2) * rise;
  float t = uBwCanopyTime;
  // Broad crowns, then leaf-scale holes that breathe slowly with the wind.
  float crowns = bwNoise(vec3(s * uBwCanopy.z, 1.3));
  float leaves = bwNoise(vec3(s * uBwCanopy.z * 3.7 + vec2(sin(t * 0.21), cos(t * 0.17)) * 0.18, 7.1 + t * 0.03));
  float open = crowns * 0.7 + leaves * 0.3;
  for (int i = 0; i < 4; i++) {
    vec4 g = uBwClearing[i];
    if (g.w > 0.0) open = max(open, (uBwCanopy.y + uBwCanopy.w * 1.5) * (1.0 - smoothstep(g.z * 0.45, g.z, distance(s, g.xy))) + leaves * 0.12);
  }
  float light = smoothstep(uBwCanopy.y, uBwCanopy.y + uBwCanopy.w, open);
  // Above the leaf layer the sun is unbroken.
  return mix(mix(uBwCanopyFloor, 1.0, light), 1.0, smoothstep(-0.2, 1.5, -rise));
}
`,
  };
}

/**
 * Canopy as a few leafy ellipsoid crowns (garden trees): sunlight is attenuated
 * by the chord through each crown, broken by leaf-gap noise, so a crown shades
 * itself, dapples the lawn and casts shafts into mist.
 */
export function crownCanopy(options: { key: string; toSun: THREE.Vector3; crowns: Array<{ centre: THREE.Vector3; radius: THREE.Vector3 }>; density: number; gaps: number; time: { value: number } }): CanopyLight {
  const count = Math.max(1, options.crowns.length);
  const centres = options.crowns.map(c => new THREE.Vector4(c.centre.x, c.centre.y, c.centre.z, 0));
  const radii = options.crowns.map(c => new THREE.Vector4(c.radius.x, c.radius.y, c.radius.z, 0));
  while (centres.length < count) { centres.push(new THREE.Vector4(0, -1e3, 0, 0)); radii.push(new THREE.Vector4(1, 1, 1, 0)); }
  return {
    key: `crowns-${options.key}-${count}`,
    uniforms: {
      uBwToSun: { value: options.toSun.clone().normalize() },
      uBwCrownCentre: { value: centres },
      uBwCrownRadius: { value: radii },
      uBwCrownShape: { value: new THREE.Vector2(options.density, options.gaps) },
      uBwCanopyTime: options.time,
    },
    glsl: /* glsl */ `
#define BW_CROWNS ${count}
uniform vec3 uBwToSun;
uniform vec4 uBwCrownCentre[BW_CROWNS];
uniform vec4 uBwCrownRadius[BW_CROWNS];
uniform vec2 uBwCrownShape;
uniform float uBwCanopyTime;
float bwCanopy(vec3 p) {
  float visibility = 1.0;
  for (int i = 0; i < BW_CROWNS; i++) {
    vec3 r = uBwCrownRadius[i].xyz;
    vec3 o = (p - uBwCrownCentre[i].xyz) / r;
    vec3 d = uBwToSun / r;
    float a = dot(d, d), b = dot(o, d), c = dot(o, o) - 1.0;
    float disc = b * b - a * c;
    if (disc <= 0.0) continue;
    float q = sqrt(disc);
    float t1 = (-b + q) / a;
    if (t1 <= 0.0) continue;
    float t0 = max((-b - q) / a, 0.0);
    float chord = t1 - t0;
    vec3 mid = p + uBwToSun * (0.5 * (t0 + t1));
    float t = uBwCanopyTime;
    float holes = bwNoise(mid * 1.15 + vec3(sin(t * 0.23), 0.0, cos(t * 0.19)) * 0.12) * 0.65 + bwNoise(mid * 3.3 + vec3(0.0, t * 0.04, 0.0)) * 0.35;
    float open = smoothstep(uBwCrownShape.y, uBwCrownShape.y + 0.16, holes);
    visibility *= mix(exp(-chord * uBwCrownShape.x), 1.0, open * (1.0 - smoothstep(0.6, 1.0, chord / (2.0 * max(max(r.x, r.y), r.z)))) * 0.9);
  }
  return visibility;
}
`,
  };
}
