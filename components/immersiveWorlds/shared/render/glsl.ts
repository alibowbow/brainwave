/*
 * Shared GLSL for the immersive worlds. Original code: an integer PCG hash
 * (Jarzynski & Olano, "Hash Functions for GPU Rendering", 2020), quintic
 * gradient noise and the usual fBm/ridged combinations built on it.
 * Every function is deterministic in world space so surfaces never swim.
 */

/** Hashing and gradient noise. Requires WebGL2 (GLSL ES 3.00 unsigned ints). */
export const GLSL_NOISE = /* glsl */ `
uvec3 bwPcg3(uvec3 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  v ^= v >> 16u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  return v;
}
vec3 bwHash3(vec3 cell) { return vec3(bwPcg3(uvec3(ivec3(cell) + 4096))) * (1.0 / 4294967295.0); }
float bwHash1(vec3 cell) { return bwHash3(cell).x; }
vec3 bwGrad(vec3 cell) { return bwHash3(cell) * 2.0 - 1.0; }
/** Gradient noise in roughly [-1, 1]. */
float bwNoise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = dot(bwGrad(i), f);
  float b = dot(bwGrad(i + vec3(1, 0, 0)), f - vec3(1, 0, 0));
  float c = dot(bwGrad(i + vec3(0, 1, 0)), f - vec3(0, 1, 0));
  float d = dot(bwGrad(i + vec3(1, 1, 0)), f - vec3(1, 1, 0));
  float e = dot(bwGrad(i + vec3(0, 0, 1)), f - vec3(0, 0, 1));
  float g = dot(bwGrad(i + vec3(1, 0, 1)), f - vec3(1, 0, 1));
  float h = dot(bwGrad(i + vec3(0, 1, 1)), f - vec3(0, 1, 1));
  float k = dot(bwGrad(i + vec3(1, 1, 1)), f - vec3(1, 1, 1));
  return mix(mix(mix(a, b, u.x), mix(c, d, u.x), u.y), mix(mix(e, g, u.x), mix(h, k, u.x), u.y), u.z) * 1.6;
}
/** Value noise in [0, 1]; cheaper, used for masks. */
float bwValue(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(bwHash1(i), bwHash1(i + vec3(1, 0, 0)), u.x), mix(bwHash1(i + vec3(0, 1, 0)), bwHash1(i + vec3(1, 1, 0)), u.x), u.y),
             mix(mix(bwHash1(i + vec3(0, 0, 1)), bwHash1(i + vec3(1, 0, 1)), u.x), mix(bwHash1(i + vec3(0, 1, 1)), bwHash1(i + vec3(1, 1, 1)), u.x), u.y), u.z);
}
const mat3 BW_ROT = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64);
float bwFbm3(vec3 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 3; i++) { s += a * bwNoise(p); p = BW_ROT * p * 2.03; a *= 0.5; } return s; }
float bwFbm5(vec3 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * bwNoise(p); p = BW_ROT * p * 2.03; a *= 0.5; } return s; }
/** Sharp-crested ridges in [0, 1] for cracks, veins and erosion lines. */
float bwRidged(vec3 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { float n = 1.0 - abs(bwNoise(p)); s += a * n * n; p = BW_ROT * p * 2.07; a *= 0.5; } return s; }
`;

export const GLSL_COLOR = /* glsl */ `
float bwLuma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
vec3 bwLinearToSrgb(vec3 c) {
  c = max(c, 0.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}
/** Interleaved gradient noise (screen space), stable under small blurs. */
float bwIgn(vec2 pixel) { return fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715)))); }
`;

/** Depth-buffer helpers shared by screen-space passes. */
export const GLSL_DEPTH = /* glsl */ `
uniform sampler2D tDepth;
uniform mat4 uProjection;
uniform mat4 uInverseProjection;
// Half-resolution passes put their pixel centres exactly on full-resolution
// texel boundaries, where a nearest depth fetch may pick either row depending on
// rounding. That shows up as fixed horizontal stripes on steep surfaces. Snap to
// one texel centre with a small bias so the choice is always the same.
vec2 bwDepthUv(vec2 uv) {
  vec2 size = vec2(textureSize(tDepth, 0));
  return (floor(uv * size - 0.25) + 0.5) / size;
}
vec3 bwViewPosition(vec2 uv) {
  uv = bwDepthUv(uv);
  float depth = texture2D(tDepth, uv).x;
  vec4 clip = vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  vec4 view = uInverseProjection * clip;
  return view.xyz / view.w;
}
float bwRawDepth(vec2 uv) { return texture2D(tDepth, bwDepthUv(uv)).x; }
`;
