import * as THREE from 'three';
import { createTarget, FullscreenPass, passMaterial } from './fullscreen';

/*
 * Shared additions to three's physical materials:
 *  - contact-hardening soft shadows (PCSS) from the desk lamp, sampled from a
 *    depth map we render once, because nothing in the room moves;
 *  - analytic ambient occlusion from the objects standing on the desk, which
 *    also darkens the shadowless window light where it cannot reach.
 */

export interface LampShadowUniforms {
  tLampDepth: THREE.IUniform<THREE.Texture | null>;
  uLampShadowMatrix: THREE.IUniform<THREE.Matrix4>;
  uLampNear: THREE.IUniform<number>;
  uLampFar: THREE.IUniform<number>;
  uLampSize: THREE.IUniform<number>;
  uLampShadowTexel: THREE.IUniform<number>;
}

export interface OcclusionUniforms {
  uAoCylinders: THREE.IUniform<THREE.Vector4[]>;
  uAoBoxes: THREE.IUniform<THREE.Vector4[]>;
  uAoBoxShape: THREE.IUniform<THREE.Vector2[]>;
}

export const MAX_AO_CYLINDERS = 6;

/** Sample counts compiled into every PCSS receiver; set once per engine from its quality tier. */
export const shadowTaps = { search: 16, filter: 32 };
export const MAX_AO_BOXES = 4;

export const createLampShadowUniforms = (): LampShadowUniforms => ({
  tLampDepth: { value: null },
  uLampShadowMatrix: { value: new THREE.Matrix4() },
  uLampNear: { value: 0.03 },
  uLampFar: { value: 2 },
  uLampSize: { value: 0.08 },
  uLampShadowTexel: { value: 1 / 2048 },
});

export const createOcclusionUniforms = (): OcclusionUniforms => ({
  uAoCylinders: { value: Array.from({ length: MAX_AO_CYLINDERS }, () => new THREE.Vector4(0, 0, 0, 0)) },
  uAoBoxes: { value: Array.from({ length: MAX_AO_BOXES }, () => new THREE.Vector4(0, 0, 0, 0)) },
  uAoBoxShape: { value: Array.from({ length: MAX_AO_BOXES }, () => new THREE.Vector2(0, 0)) },
});

/** A Vogel (golden-angle) disk as GLSL constants, so no tap pays for sqrt, sin and cos. */
export function vogelDisk(name: string, count: number) {
  const points: string[] = [];
  for (let i = 0; i < count; i++) {
    const r = Math.sqrt((i + 0.5) / count);
    const theta = i * 2.39996323;
    points.push(`vec2(${(Math.cos(theta) * r).toFixed(6)}, ${(Math.sin(theta) * r).toFixed(6)})`);
  }
  return `const vec2 ${name}[${count}] = vec2[](${points.join(', ')});`;
}

// tLampDepth holds linear distance from the lamp in metres (converted once
// when the static depth map is drawn).
const pcss = (searchTaps: number, filterTaps: number) => /* glsl */ `
uniform sampler2D tLampDepth;
uniform mat4 uLampShadowMatrix;
uniform float uLampNear;
uniform float uLampFar;
uniform float uLampSize;
uniform float uLampShadowTexel;
${vogelDisk('LAMP_SEARCH_DISK', searchTaps)}
${vogelDisk('LAMP_FILTER_DISK', filterTaps)}

float lampLinearDepth(float depth) {
  float z = depth * 2.0 - 1.0;
  return 2.0 * uLampNear * uLampFar / (uLampFar + uLampNear - z * (uLampFar - uLampNear));
}

float lampShadow(vec3 worldPosition, vec3 worldNormal) {
  vec4 projected = uLampShadowMatrix * vec4(worldPosition + worldNormal * 0.0018, 1.0);
  if (projected.w <= 0.0) return 1.0;
  vec3 coord = projected.xyz / projected.w;
  if (coord.x < 0.0 || coord.x > 1.0 || coord.y < 0.0 || coord.y > 1.0 || coord.z > 1.0) return 1.0;
  float receiver = lampLinearDepth(coord.z);
  float phi = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) * 6.2831853;
  vec2 cs = vec2(cos(phi), sin(phi));
  mat2 rotation = mat2(cs.x, cs.y, -cs.y, cs.x);
  float bias = 0.0025 + receiver * 0.004;

  // Blocker search over the light's footprint (uLampSize = light width / (2 tan(fov / 2))).
  const float searchNear = 0.14;
  float searchRadius = 0.5 * uLampSize * max(receiver - searchNear, 0.0) / (receiver * searchNear);
  float blockerSum = 0.0;
  float blockers = 0.0;
  for (int i = 0; i < ${searchTaps}; i++) {
    float blocker = texture2D(tLampDepth, coord.xy + rotation * LAMP_SEARCH_DISK[i] * searchRadius).r;
    if (blocker < receiver - bias) { blockerSum += blocker; blockers += 1.0; }
  }
  if (blockers < 0.5) return 1.0;
  float averageBlocker = blockerSum / blockers;
  float penumbra = 0.5 * uLampSize * (receiver - averageBlocker) / (averageBlocker * receiver);
  float radius = clamp(penumbra, uLampShadowTexel * 1.2, searchRadius);

  // The filter disk is turned against the search disk so their patterns never line up.
  mat2 filterRotation = rotation * mat2(-0.128844, 0.991665, -0.991665, -0.128844);
  float lit = 0.0;
  for (int i = 0; i < ${filterTaps}; i++) {
    float blocker = texture2D(tLampDepth, coord.xy + filterRotation * LAMP_FILTER_DISK[i] * radius).r;
    lit += smoothstep(receiver - bias - 0.0015, receiver - bias + 0.0015, blocker);
  }
  return lit / float(${filterTaps});
}
`;

const OCCLUSION = /* glsl */ `
uniform vec4 uAoCylinders[${MAX_AO_CYLINDERS}];
uniform vec4 uAoBoxes[${MAX_AO_BOXES}];
uniform vec2 uAoBoxShape[${MAX_AO_BOXES}];

// Cosine-weighted sky blocked by upright cylinders and flat boxes on the desk.
float deskVisibility(vec3 p) {
  float visibility = 1.0;
  for (int i = 0; i < ${MAX_AO_CYLINDERS}; i++) {
    vec4 c = uAoCylinders[i];
    if (c.z <= 0.0) continue;
    float d = max(length(p.xz - c.xy) - c.z, 0.0);
    float azimuth = asin(clamp(c.z / (c.z + d), 0.0, 1.0)) / 3.14159265;
    float h2 = c.w * c.w;
    float lift = max(p.y, 0.0);
    visibility *= 1.0 - azimuth * h2 / (h2 + d * d) * (1.0 - smoothstep(0.0, c.w, lift));
  }
  for (int i = 0; i < ${MAX_AO_BOXES}; i++) {
    vec4 b = uAoBoxes[i];
    if (b.z <= 0.0) continue;
    float angle = uAoBoxShape[i].x;
    float h = uAoBoxShape[i].y;
    vec2 q = p.xz - b.xy;
    q = vec2(cos(angle) * q.x - sin(angle) * q.y, sin(angle) * q.x + cos(angle) * q.y);
    vec2 e = abs(q) - b.zw;
    float d = length(max(e, 0.0)) + min(max(e.x, e.y), 0.0);
    if (d < 0.0 || p.y > h) continue;
    visibility *= 1.0 - 0.55 * h * h / (h * h + d * d * 3.0);
  }
  return visibility;
}
`;

/** Lamp shadow and desk occlusion baked over the desk top (R: shadow, G: occlusion). */
export interface DeskLightingUniforms {
  tDeskLighting: THREE.IUniform<THREE.Texture | null>;
  /** x0, z0, 1 / width, 1 / depth of the baked area. */
  uDeskLightingRect: THREE.IUniform<THREE.Vector4>;
}

export const createDeskLightingUniforms = (): DeskLightingUniforms => ({
  tDeskLighting: { value: null },
  uDeskLightingRect: { value: new THREE.Vector4(0, 0, 1, 1) },
});

export interface PatchOptions {
  /** Receive the lamp's PCSS shadow. */
  lampShadow?: LampShadowUniforms;
  /**
   * Read the lamp shadow and desk occlusion from the bake instead of working
   * them out per pixel (only for surfaces lying on the desk top).
   */
  deskLighting?: DeskLightingUniforms;
  /** Receive contact occlusion from the objects on the desk. */
  occlusion?: OcclusionUniforms;
  /** Upright objects darken where they meet the desk. */
  groundContact?: boolean;
  /** Additional uniforms. */
  uniforms?: Record<string, THREE.IUniform>;
  vertexHeader?: string;
  vertexMain?: string;
  fragmentHeader?: string;
  /** Runs after the colour map is applied (diffuseColor available). */
  fragmentColor?: string;
  /** Runs after emissive (totalEmissiveRadiance available). */
  fragmentEmissive?: string;
  /** Runs right before output (outgoingLight available). */
  fragmentOutput?: string;
}

let patchId = 0;

export function patchMaterial<T extends THREE.Material>(material: T, options: PatchOptions): T {
  const key = `rainy-${patchId++}`;
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, options.uniforms ?? {}, options.lampShadow ?? {}, options.occlusion ?? {}, options.deskLighting ?? {});
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vWPos;\nvarying vec3 vWNormal;\n${options.vertexHeader ?? ''}`)
      .replace('#include <fog_vertex>', `#include <fog_vertex>
  vec4 rwWorld = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    rwWorld = instanceMatrix * rwWorld;
  #endif
  vWPos = (modelMatrix * rwWorld).xyz;
  vWNormal = normalize(mat3(modelMatrix) * objectNormal);
  ${options.vertexMain ?? ''}`);

    let lights = THREE.ShaderChunk.lights_fragment_begin;
    let header = `varying vec3 vWPos;\nvarying vec3 vWNormal;\n${options.fragmentHeader ?? ''}`;
    const baked = options.deskLighting;
    if (baked) {
      header += `
uniform sampler2D tDeskLighting;
uniform vec4 uDeskLightingRect;
vec2 rwDeskLighting() { return texture2D(tDeskLighting, (vWPos.xz - uDeskLightingRect.xy) * uDeskLightingRect.zw).rg; }
`;
    }
    if (options.lampShadow || baked) {
      if (!baked) header += pcss(shadowTaps.search, shadowTaps.filter);
      const shadow = baked ? 'rwBaked.r' : 'lampShadow( vWPos, normalize( vWNormal ) )';
      // Outside the lamp's cone there is no light to shadow.
      lights = lights.replace(
        'getSpotLightInfo( spotLight, geometryPosition, directLight );',
        `getSpotLightInfo( spotLight, geometryPosition, directLight );\n\t\tif ( directLight.visible ) directLight.color *= ${shadow};`,
      );
    }
    let occlusion = '';
    if (options.occlusion || options.groundContact || baked) {
      if (options.occlusion && !baked) header += OCCLUSION;
      const terms = [
        baked ? 'rwBaked.g' : options.occlusion ? 'deskVisibility( vWPos )' : '1.0',
        options.groundContact ? 'mix( 0.42, 1.0, smoothstep( 0.0, 0.022, vWPos.y ) )' : '1.0',
      ].join(' * ');
      // Worked out once per pixel for the window light and the ambient terms alike.
      lights = `float rwAo = ${terms};\n${lights}`.replace(
        'RE_Direct_RectArea( rectAreaLight,',
        'rectAreaLight.color *= rwAo;\n\t\tRE_Direct_RectArea( rectAreaLight,',
      );
      occlusion = `
      {
        float ambientOcclusion = rwAo;
        reflectedLight.indirectDiffuse *= ambientOcclusion;
        #if defined( USE_CLEARCOAT )
          clearcoatSpecularIndirect *= ambientOcclusion;
        #endif
        #if defined( USE_SHEEN )
          sheenSpecularIndirect *= ambientOcclusion;
        #endif
        #if defined( USE_ENVMAP ) && defined( STANDARD )
          float rwDotNV = saturate( dot( geometryNormal, geometryViewDir ) );
          reflectedLight.indirectSpecular *= computeSpecularOcclusion( rwDotNV, ambientOcclusion, material.roughness );
        #endif
      }`;
    }

    // One lookup serves both the shadow and the occlusion.
    if (baked) lights = `vec2 rwBaked = rwDeskLighting();\n${lights}`;
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${header}`)
      .replace('#include <lights_fragment_begin>', lights)
      .replace('#include <aomap_fragment>', `#include <aomap_fragment>\n${occlusion}`)
      .replace('#include <color_fragment>', `#include <color_fragment>\n${options.fragmentColor ?? ''}`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>\n${options.fragmentEmissive ?? ''}`)
      .replace('#include <opaque_fragment>', `${options.fragmentOutput ?? ''}\n#include <opaque_fragment>`);
  };
  material.customProgramCacheKey = () => `${key}-${shadowTaps.search}-${shadowTaps.filter}`;
  return material;
}

/** Part of the desk top a lighting bake covers, in metres. */
export interface DeskArea {
  x0: number;
  z0: number;
  width: number;
  depth: number;
}

const BLUR_FRAGMENT = /* glsl */ `
uniform sampler2D tSource;
uniform vec2 uTexel;
varying vec2 vUv;
void main() {
  vec4 sum = vec4(0.0);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      float w = (x == 0 ? 2.0 : 1.0) * (y == 0 ? 2.0 : 1.0);
      sum += texture2D(tSource, vUv + vec2(float(x), float(y)) * uTexel) * w;
    }
  }
  gl_FragColor = sum / 16.0;
}
`;

/**
 * Bake the lamp's soft shadow and the objects' occlusion over the desk top.
 * Nothing in the room moves, so the widest surface in view pays for this
 * lighting once, with more taps than a frame could afford, instead of every
 * frame. Returns an RGBA8 target (R: shadow, G: occlusion).
 */
export function bakeDeskLighting(
  renderer: THREE.WebGLRenderer,
  shadow: LampShadowUniforms,
  occlusion: OcclusionUniforms,
  area: DeskArea,
  width: number,
  height: number,
) {
  const bake = passMaterial(/* glsl */ `
${pcss(24, 64)}
${OCCLUSION}
uniform vec4 uArea;
varying vec2 vUv;
void main() {
  vec3 world = vec3(uArea.x + vUv.x * uArea.z, 0.0, uArea.y + vUv.y * uArea.w);
  gl_FragColor = vec4(lampShadow(world, vec3(0.0, 1.0, 0.0)), deskVisibility(world), 0.0, 1.0);
}
`, { ...shadow, ...occlusion, uArea: { value: new THREE.Vector4(area.x0, area.z0, area.width, area.depth) } });
  const blur = passMaterial(BLUR_FRAGMENT, { tSource: { value: null }, uTexel: { value: new THREE.Vector2(1 / width, 1 / height) } });
  const raw = createTarget(width, height, { type: THREE.UnsignedByteType });
  const target = createTarget(width, height, { type: THREE.UnsignedByteType });
  const pass = new FullscreenPass();
  pass.render(renderer, bake, raw);
  // A light tent filter melts the per-texel sampling noise in the penumbrae.
  blur.uniforms.tSource.value = raw.texture;
  pass.render(renderer, blur, target);
  renderer.setRenderTarget(null);
  pass.dispose();
  bake.dispose();
  blur.dispose();
  raw.dispose();
  return target;
}

/** Turn the lamp's depth buffer into linear distance once, so shadow taps skip the conversion. */
export function linearizeLampDepth(renderer: THREE.WebGLRenderer, depth: THREE.DepthTexture, near: number, far: number, size: number) {
  const material = passMaterial(/* glsl */ `
uniform sampler2D tDepth;
uniform float uNear;
uniform float uFar;
varying vec2 vUv;
void main() {
  float z = texture2D(tDepth, vUv).r * 2.0 - 1.0;
  gl_FragColor = vec4(2.0 * uNear * uFar / (uFar + uNear - z * (uFar - uNear)), 0.0, 0.0, 1.0);
}
`, { tDepth: { value: depth }, uNear: { value: near }, uFar: { value: far } });
  const target = createTarget(size, size, { type: THREE.FloatType, format: THREE.RedFormat, filter: THREE.NearestFilter });
  const pass = new FullscreenPass();
  pass.render(renderer, material, target);
  renderer.setRenderTarget(null);
  pass.dispose();
  material.dispose();
  return target;
}
