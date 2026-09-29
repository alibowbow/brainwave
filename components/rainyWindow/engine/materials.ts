import * as THREE from 'three';

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

const PCSS = /* glsl */ `
uniform sampler2D tLampDepth;
uniform mat4 uLampShadowMatrix;
uniform float uLampNear;
uniform float uLampFar;
uniform float uLampSize;
uniform float uLampShadowTexel;

float lampLinearDepth(float depth) {
  float z = depth * 2.0 - 1.0;
  return 2.0 * uLampNear * uLampFar / (uLampFar + uLampNear - z * (uLampFar - uLampNear));
}

vec2 lampVogel(int index, int count, float phi) {
  float r = sqrt((float(index) + 0.5) / float(count));
  float theta = float(index) * 2.39996323 + phi;
  return vec2(cos(theta), sin(theta)) * r;
}

float lampShadow(vec3 worldPosition, vec3 worldNormal) {
  vec4 projected = uLampShadowMatrix * vec4(worldPosition + worldNormal * 0.0018, 1.0);
  if (projected.w <= 0.0) return 1.0;
  vec3 coord = projected.xyz / projected.w;
  if (coord.x < 0.0 || coord.x > 1.0 || coord.y < 0.0 || coord.y > 1.0 || coord.z > 1.0) return 1.0;
  float receiver = lampLinearDepth(coord.z);
  float phi = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) * 6.2831853;
  float bias = 0.0025 + receiver * 0.004;

  // Blocker search over the light's footprint (uLampSize = light width / (2 tan(fov / 2))).
  const float searchNear = 0.14;
  float searchRadius = 0.5 * uLampSize * max(receiver - searchNear, 0.0) / (receiver * searchNear);
  float blockerSum = 0.0;
  float blockers = 0.0;
  for (int i = 0; i < LAMP_SEARCH_TAPS; i++) {
    float blocker = lampLinearDepth(texture2D(tLampDepth, coord.xy + lampVogel(i, LAMP_SEARCH_TAPS, phi) * searchRadius).r);
    if (blocker < receiver - bias) { blockerSum += blocker; blockers += 1.0; }
  }
  if (blockers < 0.5) return 1.0;
  float averageBlocker = blockerSum / blockers;
  float penumbra = 0.5 * uLampSize * (receiver - averageBlocker) / (averageBlocker * receiver);
  float radius = clamp(penumbra, uLampShadowTexel * 1.2, searchRadius);

  float lit = 0.0;
  for (int i = 0; i < LAMP_FILTER_TAPS; i++) {
    float blocker = lampLinearDepth(texture2D(tLampDepth, coord.xy + lampVogel(i, LAMP_FILTER_TAPS, phi + 1.7) * radius).r);
    lit += smoothstep(receiver - bias - 0.0015, receiver - bias + 0.0015, blocker);
  }
  return lit / float(LAMP_FILTER_TAPS);
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

export interface PatchOptions {
  /** Receive the lamp's PCSS shadow. */
  lampShadow?: LampShadowUniforms;
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
    Object.assign(shader.uniforms, options.uniforms ?? {}, options.lampShadow ?? {}, options.occlusion ?? {});
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
    if (options.lampShadow) {
      header += `#define LAMP_SEARCH_TAPS ${shadowTaps.search}\n#define LAMP_FILTER_TAPS ${shadowTaps.filter}\n${PCSS}`;
      lights = lights.replace(
        'getSpotLightInfo( spotLight, geometryPosition, directLight );',
        'getSpotLightInfo( spotLight, geometryPosition, directLight );\n\t\tdirectLight.color *= lampShadow( vWPos, normalize( vWNormal ) );',
      );
    }
    let occlusion = '';
    if (options.occlusion || options.groundContact) {
      if (options.occlusion) header += OCCLUSION;
      const terms = [
        options.occlusion ? 'deskVisibility( vWPos )' : '1.0',
        options.groundContact ? 'mix( 0.42, 1.0, smoothstep( 0.0, 0.022, vWPos.y ) )' : '1.0',
      ].join(' * ');
      header += `\nfloat rwOcclusion() { return ${terms}; }\n`;
      lights = lights.replace(
        'RE_Direct_RectArea( rectAreaLight,',
        'rectAreaLight.color *= rwOcclusion();\n\t\tRE_Direct_RectArea( rectAreaLight,',
      );
      occlusion = `
      {
        float ambientOcclusion = rwOcclusion();
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
