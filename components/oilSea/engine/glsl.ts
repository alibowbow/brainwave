/** GLSL shared by the oil sea's passes: noise, and the composition of the view. */

export const HEADER = /* glsl */ `#version 300 es
precision highp float;
precision highp int;
`;

/** Sin-free hashes and value noise, stable on mobile GPUs. */
export const NOISE = /* glsl */ `
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 hash22(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
vec4 hash42(vec2 p) { vec4 p4 = fract(vec4(p.xyxy) * vec4(0.1031, 0.1030, 0.0973, 0.1099)); p4 += dot(p4, p4.wzxy + 33.33); return fract((p4.xxyz + p4.yzzw) * p4.zywx); }
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x), mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    sum += amp * vnoise(p);
    p = mat2(1.6, 1.2, -1.2, 1.6) * p;
    amp *= 0.5;
  }
  return sum;
}
// Foam lace: 1 on the threads between cells, 0 in the holes.
float lace(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float d1 = 8.0;
  float d2 = 8.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      float d = length(g + hash22(i + g) - f);
      if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
    }
  }
  return 1.0 - smoothstep(0.02, 0.22, d2 - d1);
}
float fbm3(vec2 p) {
  float sum = 0.5 * vnoise(p);
  p = mat2(1.6, 1.2, -1.2, 1.6) * p;
  sum += 0.25 * vnoise(p);
  p = mat2(1.6, 1.2, -1.2, 1.6) * p;
  return sum + 0.125 * vnoise(p);
}
`;

/**
 * The composition, shared by every pass that needs to know what is where.
 * Coordinates are in "design space" (see layout.ts): y from 0 at the bottom
 * to 1 at the top; the view is a crop of it.
 */
export const COMPOSITION = /* glsl */ `
uniform vec2 uCrop;
uniform vec2 uSun;
uniform vec3 uTree;
uniform float uHorizon;

// The painter stands on a clifftop looking level out to sea. Distances on
// the water are measured the way a painter spaces them: depth in octaves
// (each step towards the horizon a fixed fraction of the way), across the
// view in steps that shrink with depth at the same rate. Swell, foam and
// glitter drawn in these units close up steadily towards the horizon.
const float CENTRE_X = 0.8888889;
vec2 seaPlane(vec2 p) {
  float d = max(uHorizon - p.y, 1e-3);
  return vec2((p.x - CENTRE_X) / (2.0 * d), -log(d));
}
// The swell rolls in from the open sea on the left towards the beach.
const vec2 SWELL = vec2(0.5, -0.866);
const vec2 CREST = vec2(0.866, 0.5);
const float WAVELENGTH = 0.3;
// Crests arrive this many times a second; strokes on the water travel with them.
const float WAVE_RATE = 0.12;
// Back from the painter's units to the picture.
vec2 fromSeaPlane(vec2 g) {
  float d = exp(-g.y);
  return vec2(CENTRE_X + g.x * 2.0 * d, uHorizon - d);
}
// Direction of a crest line in the picture at p (unit length).
vec2 crestDirection(vec2 p) {
  float d = max(uHorizon - p.y, 1e-3);
  vec2 grad = vec2(SWELL.x / (2.0 * d), SWELL.x * (p.x - CENTRE_X) / (2.0 * d * d) + SWELL.y / d);
  vec2 dir = normalize(vec2(grad.y, -grad.x));
  return dir.x < 0.0 ? -dir : dir;
}

// The water's edge of the bay: sand lies to its right.
float shoreX(float y) {
  float a = 0.655;
  float d = a - y;
  return y > a ? 1.07 + 40.0 * d * d : 1.07 + 1.5 * d * d + 0.25 * d;
}
float beachWidth(float y) { return 0.018 + 0.2 * max(uHorizon - y, 0.0); }

// Distance over the water to the water's edge, square to the beach, in
// units of the eye height above the sea.
float shoreDistance(vec2 p) {
  float d = max(uHorizon - p.y, 1e-3);
  float z = 1.0 / d;
  float x = (shoreX(p.y) - CENTRE_X) * z;
  float z2 = z * 1.2;
  float x2 = (shoreX(uHorizon - 1.0 / z2) - CENTRE_X) * z2;
  float slope = (x2 - x) / (z2 - z);
  return (shoreX(p.y) - p.x) * z / sqrt(1.0 + slope * slope);
}

// The grassy cliff in the foreground rises to the right edge.
float cliffTop(float x) {
  float x0 = uCrop.x + uCrop.y * 0.47;
  float x1 = uCrop.x + uCrop.y + 0.04;
  float t = (x - x0) / max(0.1, x1 - x0);
  if (t <= 0.0) return -1.0;
  float top = 0.54 * pow(min(t, 1.3), 0.85);
  return top + 0.02 * sin(t * 8.0 + 1.0) * t + 0.012 * (vnoise(vec2(x * 24.0, 2.0)) - 0.5);
}

// Headlands along the horizon: a far hazy ridge and nearer hills that roll
// down to the far end of the beach.
float farRidge(float x) {
  float cape = 0.016 * smoothstep(0.28, 0.4, x) * smoothstep(0.66, 0.48, x);
  float hills = smoothstep(0.6, 1.05, x) * (0.05 + 0.012 * sin(x * 8.0 + 0.6));
  return max(cape, hills) + 0.004 * (vnoise(vec2(x * 30.0, 5.0)) - 0.5);
}
float nearRidge(float x) {
  float rise = smoothstep(0.8, 1.5, x);
  return rise * (0.08 + 0.022 * sin(x * 6.0 + 1.3) + 0.012 * sin(x * 17.0)) + 0.006 * (vnoise(vec2(x * 22.0, 8.0)) - 0.5) * rise;
}

// A wind-bent coastal pine: a leaning trunk and limbs as tapered segments,
// needles in flat, layered pads. Positions are relative to the trunk base in
// tree units (uTree.z design units each).
vec2 treeLocal(vec2 p) { return (p - uTree.xy) / uTree.z; }
// Keeps the nearest limb: its signed distance, grain direction and where
// across it the point lies (-1 right edge .. 1 left edge, facing the sun).
void limb(vec2 q, vec2 a, vec2 b, float ra, float rb, inout float best, inout vec2 dir, inout float across) {
  vec2 ba = b - a;
  float h = clamp(dot(q - a, ba) / dot(ba, ba), 0.0, 1.0);
  float r = mix(ra, rb, h);
  vec2 off = q - a - ba * h;
  float d = length(off) - r;
  if (d < best) {
    best = d;
    dir = ba;
    vec2 side = normalize(vec2(-ba.y, ba.x));
    across = dot(off, side.x > 0.0 ? -side : side) / r;
  }
}
// Signed distance (tree units) to the wood, the local direction of the grain,
// and where across the limb the point lies.
float woodDist(vec2 q, out vec2 dir, out float across) {
  float best = 1e3;
  dir = vec2(0.0, 1.0);
  across = 0.0;
  // The trunk leans hard away from the sea wind, then turns up.
  limb(q, vec2(0.04, -0.12), vec2(0.03, 0.02), 0.045, 0.04, best, dir, across);
  limb(q, vec2(0.03, 0.02), vec2(-0.02, 0.14), 0.04, 0.034, best, dir, across);
  limb(q, vec2(-0.02, 0.14), vec2(-0.1, 0.24), 0.034, 0.027, best, dir, across);
  limb(q, vec2(-0.1, 0.24), vec2(-0.15, 0.33), 0.027, 0.021, best, dir, across);
  limb(q, vec2(-0.15, 0.33), vec2(-0.13, 0.44), 0.021, 0.016, best, dir, across);
  limb(q, vec2(-0.13, 0.44), vec2(-0.07, 0.55), 0.016, 0.012, best, dir, across);
  limb(q, vec2(-0.07, 0.55), vec2(-0.06, 0.64), 0.012, 0.007, best, dir, across);
  // Limbs reaching out over the bay, and a few to the side.
  limb(q, vec2(-0.1, 0.24), vec2(-0.24, 0.28), 0.018, 0.011, best, dir, across);
  limb(q, vec2(-0.24, 0.28), vec2(-0.38, 0.27), 0.011, 0.005, best, dir, across);
  limb(q, vec2(-0.15, 0.33), vec2(-0.27, 0.4), 0.013, 0.006, best, dir, across);
  limb(q, vec2(-0.13, 0.44), vec2(0.0, 0.47), 0.011, 0.005, best, dir, across);
  limb(q, vec2(-0.07, 0.55), vec2(-0.18, 0.585), 0.009, 0.004, best, dir, across);
  return best;
}
// Needle pads: how deep inside a pad (> 0) and how much sun reaches it there.
float needleDensity(vec2 q, float sway, out float lit) {
  // Ragged, wind-combed tufts streaming off to the left.
  float tufts = 0.45 * (fbm3(q * vec2(14.0, 40.0)) - 0.5) + 0.26 * (vnoise(q * vec2(50.0, 130.0)) - 0.5);
  float best = -1.0;
  lit = 0.5;
  for (int i = 0; i < 11; i++) {
    vec4 m;
    if (i == 0) m = vec4(-0.42, 0.29, 0.12, 0.045);
    else if (i == 1) m = vec4(-0.28, 0.305, 0.12, 0.06);
    else if (i == 2) m = vec4(-0.15, 0.3, 0.08, 0.05);
    else if (i == 3) m = vec4(-0.32, 0.42, 0.13, 0.06);
    else if (i == 4) m = vec4(-0.16, 0.45, 0.11, 0.065);
    else if (i == 5) m = vec4(0.01, 0.47, 0.1, 0.05);
    else if (i == 6) m = vec4(-0.22, 0.58, 0.12, 0.06);
    else if (i == 7) m = vec4(-0.06, 0.62, 0.14, 0.07);
    else if (i == 8) m = vec4(0.07, 0.57, 0.08, 0.045);
    else if (i == 9) m = vec4(-0.5, 0.33, 0.06, 0.03);
    else m = vec4(-0.1, 0.7, 0.08, 0.04);
    vec2 c = m.xy + vec2(sway * (0.3 + m.y), 0.0);
    vec2 e = (q - c) / m.zw;
    // Flat undersides, domed tops.
    e.y *= e.y < 0.0 ? 1.6 : 1.0;
    float inside = 1.0 - length(e * vec2(1.0 - 0.18 * step(e.x, 0.0), 1.0)) + tufts;
    if (inside > best) {
      best = inside;
      lit = clamp(0.45 + 0.55 * e.y - 0.2 * e.x, 0.0, 1.0);
    }
  }
  return best;
}

// What lies at a point of the picture (the guide stores it; strokes are grouped by it).
const int SKY = 0;
const int FAR_HILLS = 1;
const int LAND = 2;
const int BEACH = 3;
const int SEA = 4;
const int GRASS = 5;
const int NEEDLES = 6;
const int WOOD = 7;

// The part of the picture under p, leaving out the pine.
int groundRegion(vec2 p) {
  float cliff = cliffTop(p.x);
  if (cliff > 0.0 && p.y < cliff) return GRASS;
  if (p.y >= uHorizon) {
    float nearTop = uHorizon + nearRidge(p.x);
    if (p.y < nearTop && nearTop > uHorizon + 0.002) return LAND;
    if (p.y < uHorizon + farRidge(p.x)) return FAR_HILLS;
    return SKY;
  }
  float shore = shoreX(p.y);
  if (p.x < shore) return SEA;
  if (p.x < shore + beachWidth(p.y)) return BEACH;
  return LAND;
}
bool inTreeBox(vec2 q) { return q.x > -0.62 && q.x < 0.22 && q.y > -0.14 && q.y < 0.82; }
`;
