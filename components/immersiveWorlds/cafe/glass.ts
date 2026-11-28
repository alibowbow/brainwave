import * as T from 'three';
import { GLSL_COLOR } from '../shared/render/glsl';
import { FULLSCREEN_VERTEX } from '../shared/render/targets';
import { VOLUME_PRELUDE, type VolumeEffect } from '../shared/render/hdrPipeline';

/*
 * The café window, as three cooperating pieces. All original code.
 *
 *  1. `createExteriorBokeh`: a half-resolution pass over the refraction image
 *     (the scene rendered without the glass). It reconstructs world positions
 *     from depth, keeps only what lies beyond the glass, adds blue-hour
 *     aerial haze, then gathers a golden-angle disc whose radius grows with
 *     distance (a thin-lens circle of confusion focused inside the café), so
 *     the near pavement is softer than sharp and the far façades melt into
 *     round bokeh. Street lamps add closed-form in-scattering along the eye
 *     ray (a volumetric halo with no ray-march steps), clipped by geometry.
 *  2. `cafeGlassShader`: the Reflector material. Rain on the outside face
 *     (dense micro beads, larger lens drops and slow stick-slip runners with
 *     wet trails), each drop a tiny lens showing a sharp, inverted image of
 *     the street; condensation on the inside face that frosts the view and
 *     glows where the table lamp lights it; Fresnel-weighted planar
 *     reflection of the warm room.
 *  3. `createCafeDepthVolume`: the HDR pipeline's volume hook. A gentle far
 *     field depth of field for the back of the room (patrons become soft
 *     silhouettes) and faint warm air light around the practical lamps.
 *
 * Everything outputs linear radiance. On the pipeline path the scene is
 * drawn into a half-float target, so three skips tone mapping and sRGB
 * encoding for the glass; on the direct path the same includes apply them.
 */

export const MAX_HALO_LAMPS = 6;

const DEPTH_WORLD = /* glsl */ `
uniform mat4 uInverseProjection;
uniform mat4 uCameraWorld;
vec3 cafeWorldAt(vec2 uv, float depth) {
  vec4 clip = vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  vec4 view = uInverseProjection * clip;
  view /= view.w;
  return (uCameraWorld * view).xyz;
}
`;

const BOKEH_FRAGMENT = /* glsl */ `
${GLSL_COLOR}
${DEPTH_WORLD}
uniform sampler2D tColor;
uniform sampler2D tDepth;
uniform vec2 uSourceSize;
uniform float uGlassZ;
uniform float uFocus;
uniform float uMaxRadius;
uniform vec3 uHaze;
uniform float uHazeDensity;
uniform float uHighlightBoost;
uniform float uTime;
uniform vec4 uLamps[${MAX_HALO_LAMPS}];
uniform vec3 uLampColors[${MAX_HALO_LAMPS}];
uniform float uHalo;
varying vec2 vUv;
const int TAPS = 28;
bool cafeOutside(vec3 p, float depth) { return depth >= 0.99999 || p.z < uGlassZ - 0.015; }
float cafeCoc(float dist) { return clamp(1.0 - uFocus / max(dist, 1e-3), 0.0, 1.0); }
void main() {
  vec3 eye = uCameraWorld[3].xyz;
  float d0 = texture2D(tDepth, vUv).x;
  vec3 p0 = cafeWorldAt(vUv, d0);
  bool out0 = cafeOutside(p0, d0);
  vec3 ray = normalize(p0 - eye);
  float far0 = d0 >= 0.99999 ? 80.0 : length(p0 - eye);
  // Interior pixels hide the street; use the widest blur so the glass beside them stays soft.
  float radius = out0 ? max(cafeCoc(far0) * uMaxRadius, 1.0) : uMaxRadius;
  float glassT = (uGlassZ - eye.z) / min(ray.z, -1e-3);
  float spin = bwIgn(gl_FragCoord.xy) * 6.2831853;
  // Read a pre-filtered mip matched to the tap spacing, so a bulb of one or two
  // pixels still spreads into a smooth disc instead of a speckle.
  float lod = clamp(log2(radius * 1.25 / sqrt(float(TAPS))), 0.0, 4.0);
  vec3 sum = vec3(0.0);
  float weight = 0.0;
  for (int i = 0; i < TAPS; i++) {
    float t = (float(i) + 0.5) / float(TAPS);
    float a = spin + float(i) * 2.3999632;
    float r = sqrt(t) * radius;
    vec2 uv = vUv + vec2(cos(a), sin(a)) * r / uSourceSize;
    float d = texture2D(tDepth, uv).x;
    vec3 p = cafeWorldAt(uv, d);
    if (!cafeOutside(p, d)) continue;
    float dist = d >= 0.99999 ? 80.0 : length(p - eye);
    // Scatter-as-gather: a tap only spreads as far as its own blur circle.
    float reach = cafeCoc(dist) * uMaxRadius + 1.5;
    float w = clamp(reach - r + 1.0, 0.0, 1.0);
    vec3 c = textureLod(tColor, uv, lod).rgb;
    // Aerial haze on the stretch beyond the glass, thinning with height.
    float travel = max(dist - glassT, 0.0);
    float haze = (1.0 - exp(-uHazeDensity * travel)) * mix(1.0, 0.75, smoothstep(2.0, 14.0, p.y));
    c = mix(c, uHaze, d >= 0.99999 || dist > 55.0 ? 0.0 : haze);
    // Bright sources dominate a real lens's defocus; favour them slightly.
    w *= 1.0 + uHighlightBoost * smoothstep(0.35, 2.0, bwLuma(c));
    sum += c * w;
    weight += w;
  }
  vec3 color = weight > 1e-4 ? sum / weight : uHaze;
  // Closed-form single scattering from each lamp along the ray beyond the glass:
  // integral of 1 / (h^2 + (t - b)^2) dt = (atan((t1 - b) / h) - atan((t0 - b) / h)) / h.
  float t0 = glassT, t1 = out0 ? far0 : glassT + 25.0;
  vec3 halo = vec3(0.0);
  for (int i = 0; i < ${MAX_HALO_LAMPS}; i++) {
    vec4 lamp = uLamps[i];
    if (lamp.w <= 0.0) continue;
    vec3 rel = lamp.xyz - eye;
    float b = dot(rel, ray);
    float h = sqrt(max(dot(rel, rel) - b * b, 0.0)) + 0.06;
    float integral = (atan((t1 - b) / h) - atan((t0 - b) / h)) / h;
    // Falling rain is lit where it crosses the light: soft, slow vertical streaks.
    vec3 hit = eye + ray * clamp(b, t0, t1);
    float streak = 0.75 + 0.5 * smoothstep(0.55, 0.95, fract(hit.x * 23.0 + 0.37 * sin(hit.x * 3.1)) * fract(hit.y * 0.9 + uTime * 0.55 + hit.x * 7.0));
    halo += uLampColors[i] * lamp.w * integral * streak;
  }
  gl_FragColor = vec4(color + halo * uHalo, 1.0);
}
`;

export interface BokehLamp { position: T.Vector3; color: T.Color; strength: number }

export function createExteriorBokeh(options: { glassZ: number; lamps: BokehLamp[] }) {
  const lamps = Array.from({ length: MAX_HALO_LAMPS }, (_, i) => {
    const lamp = options.lamps[i];
    return lamp ? new T.Vector4(lamp.position.x, lamp.position.y, lamp.position.z, lamp.strength) : new T.Vector4(0, 0, 0, 0);
  });
  const colors = Array.from({ length: MAX_HALO_LAMPS }, (_, i) => options.lamps[i]?.color.clone() ?? new T.Color(0, 0, 0));
  return new T.ShaderMaterial({
    name: 'CafeExteriorBokeh',
    vertexShader: FULLSCREEN_VERTEX,
    fragmentShader: BOKEH_FRAGMENT,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    uniforms: {
      tColor: { value: null },
      tDepth: { value: null },
      uInverseProjection: { value: new T.Matrix4() },
      uCameraWorld: { value: new T.Matrix4() },
      uSourceSize: { value: new T.Vector2(1, 1) },
      uGlassZ: { value: options.glassZ },
      uFocus: { value: 2.6 },
      uMaxRadius: { value: 20 },
      uHaze: { value: new T.Color(0.055, 0.094, 0.185) },
      uHazeDensity: { value: 0.075 },
      uHighlightBoost: { value: 0.35 },
      uTime: { value: 0 },
      uLamps: { value: lamps },
      uLampColors: { value: colors },
      uHalo: { value: 1 },
    },
  });
}

export const GLASS_VERTEX = /* glsl */ `
uniform mat4 textureMatrix;
varying vec2 vUv;
varying vec4 vReflect;
varying vec3 vWorld;
void main() {
  vUv = uv;
  vReflect = textureMatrix * vec4(position, 1.0);
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const GLASS_FRAGMENT = /* glsl */ `
uniform vec3 color;
uniform sampler2D tDiffuse;
uniform sampler2D tSharp;
uniform sampler2D tSharpDepth;
uniform sampler2D tBokeh;
uniform vec2 resolution;
uniform vec2 glassSize;
uniform vec2 wipe;
uniform float wipeAge;
uniform float time;
uniform vec3 lampPosition;
uniform vec3 lampGlow;
uniform vec3 roomGlow;
uniform float reflectionStrength;
varying vec2 vUv;
varying vec4 vReflect;
varying vec3 vWorld;

float cgHash(vec2 p) { p = fract(p * vec2(233.34, 851.73)); p += dot(p, p + 23.45); return fract(p.x * p.y); }
vec2 cgHash2(vec2 p) { float n = cgHash(p); return vec2(n, cgHash(p + n + 17.1)); }
float cgValue(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(cgHash(i), cgHash(i + vec2(1, 0)), f.x), mix(cgHash(i + vec2(0, 1)), cgHash(i + vec2(1, 1)), f.x), f.y);
}

// One sparse layer of resting drops. xy: lens slope (cap normal), z: coverage, w: rim.
vec4 cgBeads(vec2 p, float cell, float rMin, float rMax, float density, float seed) {
  vec2 g = p / cell, id = floor(g), f = fract(g) - 0.5;
  float h = cgHash(id + seed);
  if (h > density) return vec4(0.0);
  float r = mix(rMin, rMax, pow(cgHash(id * 1.31 + seed + 4.7), 2.2)) / cell;
  // Rain keeps arriving: each bead lands on its own slow cycle and slowly shrinks
  // as it spreads and evaporates. Periods of half a minute or more, never in step.
  if (seed > 2.0) {
    float life = fract(time * (0.018 + 0.02 * cgHash(id + seed + 2.0)) + cgHash(id + seed + 5.0));
    r *= smoothstep(0.0, 0.02, life) * (1.0 - 0.4 * life);
    if (r <= 0.0) return vec4(0.0);
  }
  vec2 centre = (cgHash2(id * 1.73 + seed) - 0.5) * (1.0 - 2.0 * r);
  vec2 d = f - centre;
  // Gravity flattens the crown and gathers water at the foot of each bead.
  d.y *= d.y > 0.0 ? 1.18 : 0.94;
  float q = length(d) / r;
  if (q >= 1.0) return vec4(0.0);
  float cover = 1.0 - smoothstep(0.82, 1.0, q);
  vec2 slope = d / r / sqrt(max(1.0 - q * q, 0.08));
  return vec4(slope, cover, smoothstep(0.6, 0.95, q) * cover);
}

// Slow runners: one drop per column segment, sliding in a stick-slip rhythm,
// trailing a narrowing wet path with beads left behind. z: drop, w: trail.
vec4 cgRunners(vec2 p, float column, float seed) {
  float col = floor(p.x / column);
  float hc = cgHash(vec2(col, seed));
  if (hc > 0.42) return vec4(0.0);
  float speed = 0.012 + 0.02 * cgHash(vec2(col, seed + 3.0));
  float phase = hc * 61.0;
  float tt = time * 0.85 + phase;
  float travel = speed * tt + 0.011 * sin(tt * 0.9 + hc * 9.0) + 0.006 * sin(tt * 2.3 + hc * 4.0);
  float period = 0.7 + 1.1 * cgHash(vec2(col, seed + 7.0));
  float s = (p.y + travel) / period;
  float seg = floor(s);
  float hs = cgHash(vec2(col, seg + seed * 3.1));
  if (hs > 0.6) return vec4(0.0);
  float wander = 0.004 * sin(p.y * 31.0 + hc * 12.0) + 0.0025 * sin(p.y * 77.0 + hs * 5.0);
  float x0 = (col + 0.5 + (hc - 0.5) * 0.5) * column + wander;
  float dy = (fract(s) - 0.5) * period;
  float r = 0.0062 + 0.0045 * hs;
  vec2 d = vec2(p.x - x0, dy * (dy < 0.0 ? 0.78 : 1.12));
  float q = length(d) / r;
  float drop = 1.0 - smoothstep(0.82, 1.0, q);
  vec2 slope = drop > 0.0 ? d / r / sqrt(max(1.0 - q * q, 0.08)) : vec2(0.0);
  float len = 0.12 + 0.35 * hs;
  float above = dy / len;
  float width = r * 0.32 * (1.0 - above);
  float trail = above > 0.04 && above < 1.0 ? (1.0 - smoothstep(width * 0.5, width, abs(p.x - x0))) : 0.0;
  // Beads stranded along the trail, shrinking with age.
  float bead = 0.0;
  if (above > 0.0 && above < 1.0) {
    float k = dy / 0.016;
    vec2 bd = vec2(p.x - x0 - 0.0015 * sin(floor(k) * 5.0), (fract(k) - 0.5) * 0.016);
    float br = r * 0.42 * (1.0 - above) * step(0.35, cgHash(vec2(col, floor(k) + seg)));
    float bq = length(bd) / max(br, 1e-4);
    float cover = 1.0 - smoothstep(0.75, 1.0, bq);
    if (cover > 0.0 && br > 1e-4) { slope += bd / br * 0.8 * cover; bead = cover; }
  }
  return vec4(slope, max(drop, bead), trail * (1.0 - drop));
}

vec3 cgBokeh(vec2 uv) { return texture2D(tBokeh, clamp(uv, vec2(0.002), vec2(0.998))).rgb; }

void main() {
  vec2 p = vUv * glassSize;
  vec2 px = 1.0 / resolution;
  vec2 screen = gl_FragCoord.xy * px;
  // Rain on the outside face.
  vec4 micro = cgBeads(p, 0.011, 0.0012, 0.0034, 0.7, 1.0);
  vec4 small = cgBeads(p + 0.37, 0.026, 0.0028, 0.0068, 0.55, 7.0);
  vec4 large = cgBeads(p + vec2(0.13, 0.61), 0.06, 0.0055, 0.0115, 0.38, 13.0);
  vec4 runA = cgRunners(p, 0.085, 3.0);
  vec4 runB = cgRunners(p + vec2(0.041, 0.9), 0.13, 11.0);
  vec4 lens = large; lens = small.z > lens.z ? small : lens; lens = runA.z > lens.z ? vec4(runA.xy, runA.z, 0.0) : lens; lens = runB.z > lens.z ? vec4(runB.xy, runB.z, 0.0) : lens;
  float drop = clamp(lens.z, 0.0, 1.0);
  float trail = max(runA.w, runB.w);
  // Background: the defocused street, nudged by the micro beads and wet trails.
  vec2 nudge = micro.xy * micro.z * 1.5 * px + vec2(trail * 0.0012, 0.0);
  vec3 outside = cgBokeh(screen + nudge);
  outside = mix(outside, outside * 0.92 + 0.012, micro.z * 0.5);
  // Inside a drop: a strongly magnified, inverted and sharp image of the street.
  // Rays that would land on the room (the lamp, the table) fall back to bokeh.
  float dropPx = 0.012 * resolution.y;
  vec2 refractUv = screen - lens.xy * dropPx * px * 1.6;
  float ownDepth = gl_FragCoord.z;
  float hitDepth = texture2D(tSharpDepth, refractUv).x;
  vec3 sharp = textureLod(tSharp, clamp(refractUv, vec2(0.002), vec2(0.998)), 0.0).rgb;
  vec3 seen = hitDepth > ownDepth ? sharp : cgBokeh(refractUv);
  // Water also scatters a little of the defocused glow it sits on.
  vec3 dropColor = mix(seen, cgBokeh(screen), 0.45) * 1.06 * (1.0 - lens.w * 0.3);
  // Light from above gathers at the lower inside edge of every bead.
  float foot = smoothstep(0.2, 0.9, -lens.y) * smoothstep(0.35, 0.9, length(lens.xy));
  dropColor += (cgBokeh(screen + vec2(0.0, 0.035)) * 1.6 + vec3(0.02, 0.03, 0.045)) * foot;
  vec3 c = mix(outside, dropColor, drop);
  c = mix(c, c * 1.05 + 0.004, trail * 0.6);
  // Planar reflection of the room, Fresnel weighted and rippled by the drops.
  vec2 mirror = vReflect.xy / vReflect.w + (lens.xy * drop + micro.xy * micro.z * 0.3) * 0.004;
  vec3 room = texture2D(tDiffuse, mirror).rgb;
  vec3 viewDir = normalize(cameraPosition - vWorld);
  float fresnel = 0.035 + 0.6 * pow(1.0 - clamp(viewDir.z, 0.0, 1.0), 5.0);
  // Glints: the table lamp caught on bead crowns.
  vec3 toLamp = normalize(lampPosition - vWorld);
  vec3 n = normalize(vec3(-lens.xy * 0.55, 1.0));
  float glint = pow(max(dot(n, normalize(toLamp + viewDir)), 0.0), 220.0) * drop;
  // Condensation on the inside face: a faint film, heavier along the sill and frame.
  float edge = pow(abs(vUv.x - 0.5) * 2.0, 6.0) * 0.4 + pow(1.0 - vUv.y, 10.0) * 0.8 + pow(vUv.y, 9.0) * 0.25;
  float mottle = cgValue(p * 9.0) * 0.6 + cgValue(p * 31.0) * 0.4;
  vec2 wipeDelta = (vUv - wipe) * vec2(glassSize.x / glassSize.y, 1.0);
  float cleared = exp(-dot(wipeDelta, wipeDelta) / 0.0045) * exp(-wipeAge * 0.075);
  float fog = clamp((0.1 + edge) * (0.65 + 0.7 * mottle), 0.0, 0.85) * (1.0 - cleared);
  fog *= 1.0 - trail * 0.4;
  vec3 frosted = (cgBokeh(screen + vec2(0.018, 0.0)) + cgBokeh(screen - vec2(0.018, 0.0)) + cgBokeh(screen + vec2(0.0, 0.02)) + cgBokeh(screen - vec2(0.0, 0.02))) * 0.25;
  float lampDistance = length(lampPosition - vWorld);
  vec3 scatter = roomGlow + lampGlow / (1.0 + lampDistance * lampDistance * 9.0);
  c = mix(c, frosted * 0.9 + scatter, fog);
  c = c * (1.0 - fresnel) + room * fresnel * reflectionStrength + lampGlow * glint * 0.4 * (1.0 - fog);
  gl_FragColor = vec4(c * color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export function cafeGlassShader(glassSize: T.Vector2) {
  return {
    name: 'CafeRainGlass',
    uniforms: {
      color: { value: new T.Color(1, 1, 1) },
      tDiffuse: { value: null },
      textureMatrix: { value: new T.Matrix4() },
      tSharp: { value: null },
      tSharpDepth: { value: null },
      tBokeh: { value: null },
      resolution: { value: new T.Vector2(1, 1) },
      glassSize: { value: glassSize.clone() },
      time: { value: 0 },
      wipe: { value: new T.Vector2(-2, -2) },
      wipeAge: { value: 99 },
      lampPosition: { value: new T.Vector3() },
      lampGlow: { value: new T.Color(0, 0, 0) },
      roomGlow: { value: new T.Color(0.005, 0.008, 0.013) },
      reflectionStrength: { value: .75 },
    },
    vertexShader: GLASS_VERTEX,
    fragmentShader: GLASS_FRAGMENT,
  };
}

const DEPTH_VOLUME_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
uniform sampler2D tColor;
uniform vec4 uGlass;       // x0, x1, y0, y1 of the window opening
uniform float uGlassZ;
uniform float uFocus;
uniform float uMaxRadius;  // pixels at this pass's resolution
uniform vec3 uAir;         // warm air light per metre
uniform float uAirDensity;
uniform vec4 uLights[4];
uniform vec3 uLightColors[4];
const int TAPS = 20;
bool cdvOnGlass(vec3 p) { return abs(p.z - uGlassZ) < 0.04 && p.x > uGlass.x && p.x < uGlass.y && p.y > uGlass.z && p.y < uGlass.w; }
float cdvCoc(float dist) { return clamp((1.0 - uFocus / max(dist, 1e-3)) * 1.25 - 0.2, 0.0, 1.0); }
void main() {
  vec3 origin, dir; float surface;
  bwSceneRay(vUv, origin, dir, surface);
  vec3 hit = origin + dir * min(surface, 60.0);
  if (cdvOnGlass(hit)) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); return; }
  float far = min(surface, 40.0);
  // Faint warm air: slight veiling with distance, plus light caught around each lamp.
  float transmit = exp(-uAirDensity * far);
  vec3 inscatter = uAir * (1.0 - transmit);
  for (int i = 0; i < 4; i++) {
    vec4 l = uLights[i];
    if (l.w <= 0.0) continue;
    vec3 rel = l.xyz - origin;
    float b = dot(rel, dir);
    float h = sqrt(max(dot(rel, rel) - b * b, 0.0)) + 0.08;
    inscatter += uLightColors[i] * l.w * (atan((far - b) / h) - atan(-b / h)) / h;
  }
  float coc = cdvCoc(surface);
  if (coc <= 0.001) { gl_FragColor = vec4(inscatter, transmit); return; }
  float radius = coc * uMaxRadius;
  vec2 texel = 1.0 / uResolution;
  float spin = bwIgn(gl_FragCoord.xy + uFrame * 7.0) * 6.2831853;
  vec3 sum = vec3(0.0); float weight = 0.0;
  for (int i = 0; i < TAPS; i++) {
    float t = (float(i) + 0.5) / float(TAPS);
    float a = spin + float(i) * 2.3999632;
    float r = sqrt(t) * radius;
    vec2 uv = vUv + vec2(cos(a), sin(a)) * r * texel;
    vec3 o2, d2; float s2;
    bwSceneRay(uv, o2, d2, s2);
    if (cdvOnGlass(o2 + d2 * min(s2, 60.0))) continue;
    float reach = cdvCoc(s2) * uMaxRadius + 1.0;
    float w = clamp(reach - r + 1.0, 0.0, 1.0);
    sum += texture2D(tColor, uv).rgb * w;
    weight += w;
  }
  if (weight < 1e-3) { gl_FragColor = vec4(inscatter, transmit); return; }
  vec3 blurred = sum / weight;
  // The radius carries the depth; the blend only fades in the first few pixels.
  float blend = clamp(coc * 4.0, 0.0, 1.0);
  gl_FragColor = vec4(blurred * blend * transmit + inscatter, (1.0 - blend) * transmit);
}
`;

export interface DepthVolumeLight { position: T.Vector3; color: T.Color; strength: number }

/** Far-field depth of field and warm air light for the room (HDR pipeline volume hook). */
export function createCafeDepthVolume(options: {
  color: T.Texture;
  glass: { x: number; y: number; z: number; w: number; h: number };
  lights: DepthVolumeLight[];
}): VolumeEffect & { uniforms: Record<string, T.IUniform> } {
  const g = options.glass;
  const lights = Array.from({ length: 4 }, (_, i) => {
    const l = options.lights[i];
    return l ? new T.Vector4(l.position.x, l.position.y, l.position.z, l.strength) : new T.Vector4();
  });
  const colors = Array.from({ length: 4 }, (_, i) => options.lights[i]?.color.clone() ?? new T.Color(0, 0, 0));
  const material = new T.ShaderMaterial({
    name: 'CafeDepthVolume',
    vertexShader: FULLSCREEN_VERTEX,
    fragmentShader: DEPTH_VOLUME_FRAGMENT,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    uniforms: {
      tColor: { value: options.color },
      uGlass: { value: new T.Vector4(g.x - g.w / 2, g.x + g.w / 2, g.y - g.h / 2, g.y + g.h / 2) },
      uGlassZ: { value: g.z },
      uFocus: { value: 2.3 },
      uMaxRadius: { value: 7 },
      uAir: { value: new T.Color(0.006, 0.0045, 0.003) },
      uAirDensity: { value: 0.035 },
      uLights: { value: lights },
      uLightColors: { value: colors },
    },
  });
  return {
    material,
    uniforms: material.uniforms,
    update(_time, camera) {
      // Scale the blur with the drawing buffer so phones and desktops match.
      const resolution = material.uniforms.uResolution?.value as T.Vector2 | undefined;
      if (resolution) material.uniforms.uMaxRadius.value = Math.max(3, resolution.y * 0.024);
      void camera;
    },
  };
}
