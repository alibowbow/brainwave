/*
 * The oil-painted sea is two images: a small, smooth, animated seascape that
 * only supplies colour, and a full-size map of brush strokes that decides how
 * that colour is laid down. The stroke map (where each stroke is, how thick its
 * paint stands and how light catches it) is expensive but only changes when
 * the painting is repainted, so it is built rarely; every frame just picks up
 * colour through it.
 *
 * Coordinates: the painting is composed in "design space" (see layout.ts),
 * y from 0 at the bottom to 1 at the top; the view is a crop of it.
 */

const HEADER = /* glsl */ `#version 300 es
precision highp float;
precision highp int;
`;

/** Sin-free hashes and value noise, stable on mobile GPUs. */
const NOISE = /* glsl */ `
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
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
float fbm3(vec2 p) {
  float sum = 0.5 * vnoise(p);
  p = mat2(1.6, 1.2, -1.2, 1.6) * p;
  sum += 0.25 * vnoise(p);
  p = mat2(1.6, 1.2, -1.2, 1.6) * p;
  return sum + 0.125 * vnoise(p);
}
`;

/** The composition, shared by every pass that needs to know what is where. */
const COMPOSITION = /* glsl */ `
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
`;

/* ------------------------------------------------------------------ */
/* Scene: the smooth, animated seascape the brush picks colour from.   */
/* ------------------------------------------------------------------ */

export const SCENE_FRAGMENT = /* glsl */ `${HEADER}
in vec2 vUv;
out vec4 outColor;
uniform float uTime;
uniform float uEnergy;
${NOISE}
${COMPOSITION}

// Distance to the sun, stretched along the horizon the way its glow spreads.
float glowDistance(vec2 p) { return length((p - uSun) * vec2(0.75, 1.5)); }

vec3 skyAt(vec2 p, out float detail) {
  float h = clamp((p.y - uHorizon) / (1.0 - uHorizon), 0.0, 1.0);
  float r = glowDistance(p);
  float away = smoothstep(0.25, 1.2, distance(p, uSun));
  vec3 col = mix(vec3(1.0, 0.72, 0.42), vec3(0.98, 0.8, 0.6), smoothstep(0.0, 0.45, h));
  col = mix(col, vec3(0.92, 0.84, 0.76), smoothstep(0.4, 1.0, h));
  // Away from the sun the evening turns rose and, high up, faintly blue.
  col = mix(col, vec3(0.95, 0.7, 0.6), away * (1.0 - h) * 0.45);
  col = mix(col, vec3(0.72, 0.79, 0.86), away * smoothstep(0.45, 1.0, h) * 0.6);
  col = mix(col, vec3(1.0, 0.8, 0.46), exp(-r * 3.2) * 0.85);
  col = mix(col, vec3(1.0, 0.94, 0.74), exp(-r * 10.0));

  // Heaped clouds in drifting groups, smaller and flatter towards the
  // horizon, with thin gold bars low down.
  vec2 q = vec2((p.x - uTime * 0.003) * 2.4, (p.y - uHorizon) * 5.0);
  q /= 0.5 + 0.7 * h;
  vec2 warp = vec2(fbm3(q * 0.7 + 3.0), fbm3(q * 0.7 + vec2(7.0, 1.0))) - 0.5;
  vec2 c = q * vec2(1.4, 1.6) + warp * 0.6 + vec2(4.1, 1.7);
  float heap = fbm(c);
  float groups = smoothstep(0.3, 0.7, fbm3(q * vec2(0.3, 0.5) + 11.0));
  float thin = smoothstep(0.08, 0.3, distance(p, uSun));
  float cloud = smoothstep(0.46, 0.55, heap - 0.1 * (1.0 - groups) + 0.04 * h) * (0.35 + 0.65 * thin);
  float bars = fbm3(vec2(q.x * 0.8, q.y * 7.0) + warp * 0.5 + vec2(9.3, 2.1));
  float bar = smoothstep(0.55, 0.66, bars) * smoothstep(0.02, 0.1, h) * smoothstep(0.4, 0.16, h);
  float density = max(cloud, bar * 0.9);
  // Edges turned to the sun catch its light; the rest lies in rosy shade.
  vec2 toSun = normalize(uSun - p + vec2(1e-4, 0.0));
  float lit = clamp(0.45 + (fbm3(c) - fbm3(c + toSun * 0.35)) * 6.0 + 0.25 * smoothstep(0.58, 0.5, heap), 0.0, 1.0);
  float nearSun = exp(-distance(p, uSun) * 2.0);
  vec3 shade = mix(vec3(0.72, 0.56, 0.6), vec3(0.97, 0.66, 0.46), nearSun);
  shade = mix(shade, vec3(0.7, 0.68, 0.76), smoothstep(0.3, 0.8, h) * 0.5 * (1.0 - nearSun));
  vec3 bright = mix(vec3(1.0, 0.9, 0.76), vec3(1.0, 0.86, 0.54), nearSun);
  col = mix(col, mix(shade, bright, lit), density * 0.95);

  float disc = smoothstep(0.03, 0.022, distance(p, uSun));
  col = mix(col, vec3(1.0, 0.97, 0.86), disc);
  detail = max(density * (1.0 - density) * 3.0, disc);
  return col;
}

// Land lit from the low sun on the left: spurs run down from the ridge, the
// flanks turned to the sun glow gold, the others fall into cool green shade;
// haze thickens with distance.
vec3 landAt(vec2 p, float haze, out float detail) {
  float d = max(uHorizon - p.y, 0.0);
  vec2 r = mat2(0.9, 0.44, -0.44, 0.9) * p / (0.35 + 1.6 * d);
  float spurs = fbm3(r * vec2(9.0, 3.0) + 2.0);
  float forms = fbm3(p * vec2(3.0, 6.0) + 5.0);
  float l = smoothstep(0.3, 0.7, spurs + 0.35 * (forms - 0.5)) * (0.7 + 0.3 * fbm3(p * vec2(12.0, 22.0)));
  vec3 col = mix(vec3(0.42, 0.43, 0.3), vec3(0.74, 0.62, 0.36), smoothstep(0.05, 0.4, l));
  col = mix(col, vec3(0.98, 0.76, 0.42), smoothstep(0.4, 0.8, l));
  float scrub = smoothstep(0.58, 0.74, fbm3(p * vec2(40.0, 64.0)));
  col = mix(col, vec3(0.28, 0.3, 0.18), scrub * 0.5);
  col = mix(col, vec3(0.9, 0.75, 0.62), haze * 0.8);
  detail = 0.45;
  return col;
}

vec3 seaAt(vec2 p, out float detail) {
  float d = max(uHorizon - p.y, 1e-3);
  vec2 g = seaPlane(p);
  float toShore = max(shoreDistance(p), 0.0);
  float along = dot(g, CREST);
  float across = dot(g, SWELL);
  // Crest lines, bent along their length; they roll in towards the shore.
  float bend = fbm3(vec2(along * 1.6, across * 0.3)) - 0.5;
  float phase = across / WAVELENGTH + 0.9 * bend - uTime * 0.12;
  // Far out the swell is finer than a brush can draw: an even sheen.
  float blur = smoothstep(0.15, 0.45, fwidth(phase));
  float n = floor(phase + 0.5);
  float s = phase - n; // 0 on a crest, > 0 in front of it (towards the shore)
  float swellSize = vnoise(vec2(along * 4.0, n * 1.9));
  float height = (0.5 + 0.5 * swellSize) * (1.0 - blur);

  // Deep teal out at sea, turquoise in the shallows, hazy towards the horizon.
  vec3 col = mix(vec3(0.06, 0.37, 0.48), vec3(0.13, 0.55, 0.6), smoothstep(4.0, 0.8, toShore));
  col = mix(col, vec3(0.42, 0.56, 0.64), smoothstep(0.2, 0.02, d) * 0.7);
  col = mix(col, vec3(0.8, 0.72, 0.64), smoothstep(0.05, 0.0, d) * 0.55);
  // Chop, finer than the swell.
  vec2 chopAt = g * vec2(4.0, 12.0) + vec2(0.0, -uTime * 0.25);
  float chopFade = 1.0 - smoothstep(0.25, 0.7, length(fwidth(chopAt)));
  float chop = mix(0.5, vnoise(chopAt) * 0.65 + vnoise(chopAt * 2.3 + 5.0) * 0.35, chopFade);
  col *= 0.88 + 0.24 * chop;

  // Backs of the swell catch the sky; the faces turned to us fall into shadow.
  float back = smoothstep(-0.5, -0.05, s) * smoothstep(0.02, -0.03, s);
  float face = smoothstep(-0.01, 0.04, s) * smoothstep(0.32, 0.1, s);
  col = mix(col, vec3(0.42, 0.62, 0.66), back * 0.3 * height);
  col = mix(col, col * vec3(0.5, 0.74, 0.8), face * height * 0.85);

  // Past a line that wanders along the beach the crests curl over, breaking
  // first in stretches that peel along them, then all along.
  float breakAt = 2.8 + 1.4 * vnoise(vec2(along * 2.0, n * 1.3 + 0.5));
  float surf = smoothstep(breakAt, breakAt - 0.6, toShore) * (1.0 - blur);
  float peel = smoothstep(0.4, 0.6, vnoise(vec2(along * 6.0 + n * 3.1 + uTime * 0.3, n * 1.7)));
  float broken = surf * max(peel, smoothstep(breakAt - 1.2, breakAt - 2.4, toShore));
  // Turquoise where the sun shines through the thin wall, a dark hollow beneath the lip.
  float wall = smoothstep(0.0, 0.03, s) * smoothstep(0.18, 0.06, s) * max(surf, 0.4 * height);
  col = mix(col, vec3(0.22, 0.68, 0.65), wall * (1.0 - 0.45 * broken) * 0.9);
  float hollow = smoothstep(0.05, 0.1, s) * smoothstep(0.26, 0.12, s) * broken;
  col = mix(col, vec3(0.03, 0.28, 0.36), hollow * 0.75);
  // The lip: crisp in front, spray feathering back behind it.
  float lipBack = mix(-0.03, -0.16, broken);
  float lipFront = mix(0.015, 0.08, broken);
  float lip = smoothstep(lipBack, 0.0, s) * (1.0 - smoothstep(lipFront - 0.02, lipFront, s));
  lip *= max(broken, surf * 0.3 * swellSize) * (0.75 + 0.25 * swellSize);
  // Whitewater left behind a broken crest, churning in the inner surf and
  // washing up the beach in thin lines.
  vec2 foamAt = vec2(along * 10.0, across * 18.0);
  float lace = fbm3(foamAt + vec2(uTime * 0.03, n * 2.3));
  float trail = exp(min(s, 0.0) / 0.2) * step(s, 0.0) * smoothstep(0.4, 0.6, lace) * broken;
  float inner = smoothstep(1.7, 0.6, toShore) * (1.0 - blur);
  float churn = fbm3(vec2(along * 7.0, across * 14.0) + vec2(uTime * 0.04, -uTime * 0.1));
  float whitewater = inner * smoothstep(0.42, 0.6, churn * (0.8 + 0.4 * inner));
  float bore = inner * exp(-pow((s + 0.04) / 0.07, 2.0)) * smoothstep(0.3, 0.55, lace);
  float swashPhase = toShore / 0.26 + uTime * 0.2;
  float swash = smoothstep(0.75, 0.05, toShore) * exp(-pow((fract(swashPhase) - 0.5) / 0.14, 2.0))
    * smoothstep(0.3, 0.6, vnoise(vec2(along * 12.0, floor(swashPhase) * 1.3)));
  float edge = smoothstep(0.12, 0.0, toShore);
  float cap = (1.0 - surf) * smoothstep(0.76, 0.92, vnoise(vec2(along * 9.0, n * 2.7))) * exp(-pow(s / 0.05, 2.0)) * (1.0 - blur);
  float foam = clamp(lip + trail * 0.85 + whitewater * 0.85 + bore * 0.8 + swash * 0.8 + edge + cap * 0.85, 0.0, 1.0);
  foam *= 0.75 + 0.25 * uEnergy;
  vec3 foamCol = mix(vec3(0.66, 0.75, 0.77), vec3(0.99, 0.94, 0.84), clamp(0.3 + 0.6 * lace + 0.35 * lip - 0.3 * hollow, 0.0, 1.0));
  col = mix(col, foamCol, foam);

  // The sun's road: long glints on the wave backs and chop, widening towards us.
  float centre = uSun.x + 0.05 * d;
  float width = 0.035 + 0.5 * d;
  float road = exp(-pow((p.x - centre) / width, 2.0));
  vec2 fleckAt = vec2(g.x * 20.0 + uTime * 0.1, g.y * 60.0 - uTime * 0.8);
  float fleckFade = 1.0 - smoothstep(0.3, 0.8, length(fwidth(fleckAt)));
  float fleck = vnoise(fleckAt);
  // Out where single glints are too fine to draw, short dashes along the rows.
  float dash = vnoise(vec2(p.x * 40.0 + uTime * 0.2, p.y * 110.0 - uTime * 0.5));
  float glint = mix(smoothstep(0.3, 0.7, dash) * 0.6 + 0.35, smoothstep(0.52, 0.74, fleck * (0.7 + 0.5 * back) + 0.3 * (chop - 0.5)), fleckFade);
  float sun = road * glint * (1.0 - 0.7 * foam);
  col = mix(col, vec3(0.9, 0.7, 0.5), road * 0.3 * (1.0 - foam));
  col = mix(col, mix(vec3(0.96, 0.7, 0.38), vec3(1.0, 0.9, 0.6), glint), sun * 0.92);
  detail = clamp(max(foam * 0.9, sun), 0.0, 1.0);
  detail = max(detail, smoothstep(0.012, 0.0, d));
  return col;
}

vec3 beachAt(vec2 p, float into, out float detail) {
  float d = max(uHorizon - p.y, 1e-3);
  float n = vnoise(p * vec2(50.0, 120.0));
  vec3 col = mix(vec3(0.99, 0.84, 0.6), vec3(0.88, 0.7, 0.5), smoothstep(0.5, 1.0, into)) * (0.95 + 0.08 * n);
  float wet = smoothstep(0.35, 0.05, into);
  col = mix(col, vec3(0.78, 0.66, 0.54), wet * 0.65);
  col = mix(col, vec3(0.96, 0.82, 0.64), wet * 0.3 * smoothstep(0.4, 0.7, vnoise(vec2(p.y * 90.0, 0.0))));
  // Foam washing up the sand and sliding back.
  float surge = 0.5 + 0.5 * sin(uTime * 0.5 + p.y * 25.0);
  float froth = smoothstep(0.1 + 0.12 * surge, 0.0, into) * (0.55 + 0.45 * vnoise(vec2(p.y * 140.0, into * 5.0 + uTime * 0.2)));
  col = mix(col, vec3(0.98, 0.95, 0.88), froth);
  col = mix(col, vec3(0.88, 0.76, 0.66), smoothstep(0.1, 0.0, d) * 0.5);
  detail = max(froth, 0.3);
  return col;
}

vec3 grassAt(vec2 p, float top, out float detail) {
  float below = top - p.y;
  float depth = clamp(below / max(top, 0.05), 0.0, 1.0);
  float wind = 0.005 * sin(uTime * 1.1 + p.x * 6.0) + 0.0025 * sin(uTime * 2.3 + p.y * 9.0);
  vec2 g = vec2((p.x + wind + (p.y - top) * 0.45) * 110.0, p.y * 10.0);
  float blades = vnoise(g) * 0.6 + vnoise(g * vec2(2.3, 1.7) + 4.0) * 0.4;
  float patches = fbm3(p * vec2(5.0, 7.0) + 7.0);
  float tufts = fbm3(p * vec2(18.0, 11.0) + 2.0);
  vec3 col = mix(vec3(0.74, 0.52, 0.2), vec3(0.97, 0.74, 0.34), smoothstep(0.35, 0.8, blades) * (1.0 - 0.45 * depth));
  // Olive patches and darker roots among the gold.
  col = mix(col, vec3(0.46, 0.43, 0.2), smoothstep(0.55, 0.7, patches) * 0.7);
  col = mix(col, vec3(0.34, 0.24, 0.12), smoothstep(0.5, 0.2, blades) * smoothstep(0.62, 0.32, tufts) * (0.4 + 0.5 * depth));
  col = mix(col, vec3(1.0, 0.84, 0.5), smoothstep(0.03, 0.0, below) * 0.5);
  // Rocks where the cliff drops into the surf.
  float rock = smoothstep(0.56, 0.66, fbm3(p * vec2(14.0, 18.0) + 11.0)) * smoothstep(0.24, 0.06, p.y) * smoothstep(0.12, 0.02, below);
  vec3 rockCol = mix(vec3(0.3, 0.22, 0.18), vec3(0.66, 0.5, 0.36), smoothstep(0.4, 0.8, vnoise(p * 60.0)));
  col = mix(col, rockCol, rock);
  detail = 0.62;
  return col;
}

void main() {
  vec2 p = vec2(uCrop.x + vUv.x * uCrop.y, vUv.y);
  float detail = 0.0;
  vec3 col;
  float cliff = cliffTop(p.x);
  float nearTop = uHorizon + nearRidge(p.x);
  float farTop = uHorizon + farRidge(p.x);
  float shore = shoreX(p.y);
  float land = shore + beachWidth(p.y);
  if (cliff > 0.0 && p.y < cliff) {
    col = grassAt(p, cliff, detail);
  } else if (p.y >= uHorizon) {
    if (p.y < nearTop && nearTop > uHorizon + 0.002) {
      col = landAt(p, 0.3 + 0.15 * smoothstep(1.4, 0.9, p.x), detail);
      col = mix(col, vec3(1.0, 0.82, 0.52), smoothstep(0.012, 0.0, nearTop - p.y) * 0.35);
    } else if (p.y < farTop) {
      float t = clamp((p.y - uHorizon) / max(farTop - uHorizon, 1e-3), 0.0, 1.0);
      col = mix(vec3(0.62, 0.55, 0.6), vec3(0.8, 0.66, 0.6), t * 0.6 + 0.4 * fbm3(p * vec2(18.0, 40.0)));
      detail = 0.3;
    } else {
      col = skyAt(p, detail);
    }
  } else if (p.x < shore) {
    col = seaAt(p, detail);
  } else if (p.x < land) {
    col = beachAt(p, (p.x - shore) / (land - shore), detail);
  } else {
    col = landAt(p, 0.45 * smoothstep(0.2, 0.0, uHorizon - p.y), detail);
  }

  // The pine, over everything behind it; it sways a little in the wind.
  vec2 q = treeLocal(p);
  if (q.x > -0.62 && q.x < 0.22 && q.y > -0.14 && q.y < 0.82) {
    float sway = 0.01 * sin(uTime * 0.8) + 0.005 * sin(uTime * 1.9 + 1.0);
    float lit;
    float needles = needleDensity(q, sway, lit);
    vec2 woodDir;
    float across;
    vec2 wq = q - vec2(sway * 0.5 * max(q.y - 0.25, 0.0), 0.0);
    float wood = woodDist(wq, woodDir, across);
    if (wood < 0.0) {
      // Round limbs lit from the left, with bark furrowed along the grain.
      vec2 grain = normalize(woodDir);
      float furrows = vnoise(vec2(dot(wq, grain) * 30.0, across * 2.5 + dot(wq, vec2(-grain.y, grain.x)) * 90.0));
      float light = smoothstep(-0.4, 0.9, across) * (0.75 + 0.25 * furrows);
      vec3 bark = mix(vec3(0.16, 0.1, 0.07), vec3(0.4, 0.26, 0.16), smoothstep(0.1, 0.6, light));
      bark = mix(bark, vec3(0.72, 0.48, 0.28), smoothstep(0.62, 0.95, light));
      col = mix(col, bark, smoothstep(0.0, -0.004, wood));
      detail = 1.0;
    }
    if (needles > 0.0) {
      float tuft = vnoise(q * vec2(60.0, 150.0));
      vec3 dark = vec3(0.19, 0.19, 0.1);
      vec3 midC = vec3(0.45, 0.41, 0.19);
      vec3 sunC = vec3(0.92, 0.72, 0.34);
      vec3 needleCol = mix(dark, midC, smoothstep(0.1, 0.45, lit + 0.3 * (tuft - 0.5)));
      needleCol = mix(needleCol, sunC, smoothstep(0.55, 0.9, lit + 0.35 * (tuft - 0.5)));
      float solid = smoothstep(0.0, 0.14, needles) * (0.82 + 0.18 * smoothstep(0.3, 0.6, tuft));
      col = mix(col, needleCol, solid);
      detail = max(detail, 0.85);
    }
  }
  outColor = vec4(col, clamp(detail, 0.0, 1.0));
}
`;

/* ------------------------------------------------------------------ */
/* Flow: which way the brush moves at each place (built with strokes).  */
/* ------------------------------------------------------------------ */

export const FLOW_FRAGMENT = /* glsl */ `${HEADER}
in vec2 vUv;
out vec4 outFlow;
${NOISE}
${COMPOSITION}

void main() {
  vec2 p = vec2(uCrop.x + vUv.x * uCrop.y, vUv.y);
  float angle = 0.0;
  float lengthScale = 1.0;
  float jitter = 0.3;
  float cliff = cliffTop(p.x);
  float shore = shoreX(p.y);
  vec2 q = treeLocal(p);
  float lit;
  float needles = (q.x > -0.62 && q.x < 0.22 && q.y > -0.14 && q.y < 0.82) ? needleDensity(q, 0.0, lit) : -1.0;
  vec2 woodDir = vec2(0.0, 1.0);
  float across;
  float wood = (q.x > -0.45 && q.x < 0.1 && q.y > -0.14 && q.y < 0.7) ? woodDist(q, woodDir, across) : 1.0;
  float beachSlope = (shoreX(p.y + 0.01) - shoreX(p.y - 0.01)) / 0.02;
  float beachAngle = atan(1.0, beachSlope);
  if (beachAngle > 1.5707963) beachAngle -= 3.1415926;
  if (wood < 0.01) {
    // Along the trunk and branches.
    angle = atan(woodDir.y, woodDir.x);
    lengthScale = 0.55;
    jitter = 0.12;
  } else if (needles > -0.05) {
    // Short dabs, mostly level, combed by the wind.
    angle = 0.2 * (vnoise(p * 40.0) - 0.5);
    lengthScale = 0.5;
    jitter = 0.7;
  } else if (cliff > 0.0 && p.y < cliff) {
    // Grass leans away from the wind.
    angle = 1.95 + 0.25 * (vnoise(p * 20.0) - 0.5);
    lengthScale = 0.75;
    jitter = 0.35;
  } else if (p.y > uHorizon + max(nearRidge(p.x), farRidge(p.x))) {
    vec2 d = p - uSun;
    float r = length(d);
    float around = atan(d.y, d.x) + 1.5707963;
    around = mod(around + 1.5707963, 3.1415926) - 1.5707963;
    float drift = 0.14 * sin(p.x * 5.0 + p.y * 9.0) + 0.14 * (vnoise(p * 6.0) - 0.5);
    float nearSun = smoothstep(0.2, 0.07, r);
    angle = mix(drift, clamp(around, -0.7, 0.7), nearSun);
    lengthScale = mix(1.5, 0.7, nearSun);
    jitter = 0.35;
  } else if (p.y > uHorizon - 0.002) {
    angle = 0.12 * sin(p.x * 11.0);
    lengthScale = 0.8;
  } else if (p.x < shore) {
    // Along the crest lines; near the beach the wash runs along the sand.
    vec2 crest = crestDirection(p);
    angle = mix(atan(crest.y, crest.x), beachAngle, smoothstep(0.8, 0.2, shoreDistance(p)));
    lengthScale = mix(0.75, 1.1, smoothstep(0.0, 0.3, uHorizon - p.y));
    jitter = 0.18;
  } else if (p.x < shore + beachWidth(p.y)) {
    // Sand follows the curve of the bay.
    angle = beachAngle;
    lengthScale = 0.8;
    jitter = 0.25;
  } else {
    // Hillsides: strokes run down the spurs.
    angle = -0.35 + 0.3 * (vnoise(p * 12.0) - 0.5);
    lengthScale = 0.7;
    jitter = 0.4;
  }
  outFlow = vec4(0.5 + 0.5 * cos(angle), 0.5 + 0.5 * sin(angle), lengthScale / 2.0, jitter);
}
`;

/* ------------------------------------------------------------------ */
/* Strokes: where each brush stroke lies, built band by band.          */
/* ------------------------------------------------------------------ */

export const STROKE_FRAGMENT = /* glsl */ `${HEADER}
in vec2 vUv;
layout(location = 0) out vec4 outOffset;
layout(location = 1) out vec4 outShape;
layout(location = 2) out vec4 outOrder;
uniform sampler2D tFlow;
uniform vec2 uResolution;
uniform float uSeed;
uniform float uCell;
${NOISE}

// Offsets to the colour a stroke carries are stored in 8 bits, ±OFFSET_RANGE pixels.
const float OFFSET_RANGE = 128.0;

struct Stroke { vec2 offset; float coverage; float height; float order; float bristle; };

Stroke brushLayer(vec2 px, vec2 cell, float salt, float widthFrac) {
  Stroke best = Stroke(vec2(0.0), 0.0, 0.0, 0.0, 1.0);
  float bestZ = -1.0;
  vec2 id = floor(px / cell);
  for (int j = -2; j <= 2; j++) {
    for (int i = -2; i <= 2; i++) {
      vec2 c = id + vec2(float(i), float(j));
      vec4 r = hash42(c * vec2(1.0, 1.37) + vec2(uSeed * 13.17 + salt, uSeed * 7.31 - salt));
      vec2 center = (c + 0.1 + 0.8 * r.xy) * cell;
      vec4 flow = texture(tFlow, center / uResolution);
      vec2 base = flow.xy * 2.0 - 1.0;
      float angle = atan(base.y, base.x) + (r.z - 0.5) * flow.w * 1.2;
      vec2 dir = vec2(cos(angle), sin(angle));
      vec2 across = vec2(-dir.y, dir.x);
      float halfLen = cell.x * (0.5 + 0.45 * r.w) * flow.z * 2.0;
      float halfWid = cell.y * widthFrac * (0.75 + 0.35 * fract(r.w * 9.7 + r.z));
      vec2 d = px - center;
      float u = dot(d, dir) / halfLen;
      float v = dot(d, across) / halfWid;
      if (abs(u) > 1.05 || abs(v) > 1.05) continue;
      float streak = vnoise(vec2(v * 6.5 + r.x * 17.0, u * 1.3 + r.y * 23.0));
      // The brush lifts off towards the tail: narrower, frayed, breaking into bristle marks.
      float taper = mix(1.0, 0.45, smoothstep(-0.1, 1.0, u));
      float cov = smoothstep(1.0, 0.86 - 0.18 * streak, abs(v) / taper);
      cov *= smoothstep(-1.0, -0.86, u) * smoothstep(1.0, 0.7 + 0.25 * streak, u);
      cov *= 1.0 - smoothstep(0.35, 0.95, u) * smoothstep(0.55, 0.35, streak);
      float z = fract(r.z * 71.3 + r.w * 13.7 + salt);
      if (cov > 0.5 && z > bestZ) {
        bestZ = z;
        // Paint picked up at the start is dragged along the stroke.
        best.offset = center + dir * (u * halfLen * 0.45) - px;
        best.coverage = cov;
        float load = mix(1.0, 0.4, smoothstep(-1.0, 1.0, u));
        best.height = load * (0.6 + 0.4 * streak) * (1.0 - 0.3 * v * v);
        best.order = 0.62 * vnoise(center / cell.y * 0.05 + uSeed * 3.1) + 0.38 * r.y;
        best.bristle = 0.86 + 0.24 * streak;
      }
    }
  }
  return best;
}

void main() {
  vec2 px = gl_FragCoord.xy;
  Stroke coarse = brushLayer(px, vec2(2.0, 1.0) * uCell, 0.0, 0.62);
  Stroke fine = brushLayer(px, vec2(2.0, 1.0) * uCell * 0.45, 5.3, 0.58);
  // Where no stroke lands, the ground shows; it is repainted by region.
  float gapOrder = 0.62 * vnoise(px / uCell * 0.05 + uSeed * 3.1) + 0.38 * hash12(floor(px / uCell));
  if (coarse.coverage <= 0.0) coarse.order = gapOrder;
  if (fine.coverage <= 0.0) fine.order = coarse.order;
  outOffset = clamp(vec4(coarse.offset, fine.offset) / (2.0 * OFFSET_RANGE) + 0.5, 0.0, 1.0);
  outShape = vec4(coarse.coverage, fine.coverage, coarse.height, fine.height);
  outOrder = vec4(coarse.order, fine.order, coarse.bristle - 0.5, fine.bristle - 0.5);
}
`;

/* ------------------------------------------------------------------ */
/* Light: how the relief of the paint and the canvas catch the light.  */
/* ------------------------------------------------------------------ */

export const LIGHT_FRAGMENT = /* glsl */ `${HEADER}
in vec2 vUv;
layout(location = 0) out vec4 outLight;
layout(location = 1) out vec4 outMask;
uniform sampler2D tShape;
uniform sampler2D tOrder;
uniform vec2 uResolution;
uniform float uCell;
${NOISE}

float canvasWeave(vec2 px) {
  vec2 g = px / max(1.6, uCell * 0.2);
  float warp = 0.5 + 0.5 * sin(g.x * 3.1416) * sign(sin(g.y * 1.5708));
  float weft = 0.5 + 0.5 * sin(g.y * 3.1416) * sign(sin(g.x * 1.5708 + 1.5708));
  return 0.5 * (warp + weft) * (0.75 + 0.25 * hash12(floor(g)));
}

vec2 heights(ivec2 q) {
  q = clamp(q, ivec2(0), ivec2(uResolution) - 1);
  vec4 s = texelFetch(tShape, q, 0);
  float ground = canvasWeave(vec2(q)) * 0.18;
  float coarse = ground * (1.0 - s.x * 0.7) + s.x * (0.34 + 0.5 * s.z);
  float withFine = mix(coarse, max(coarse, 0.3 + 0.62 * s.w), step(0.5, s.y));
  return vec2(coarse, withFine);
}

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec2 hL = heights(p - ivec2(1, 0));
  vec2 hR = heights(p + ivec2(1, 0));
  vec2 hD = heights(p - ivec2(0, 1));
  vec2 hU = heights(p + ivec2(0, 1));
  vec4 order = texelFetch(tOrder, p, 0);
  vec4 shape = texelFetch(tShape, p, 0);
  vec3 L = normalize(vec3(-0.55, 0.65, 0.52));
  float relief = 1.1;
  vec3 nC = normalize(vec3((hL.x - hR.x) * relief, (hD.x - hU.x) * relief, 1.0));
  vec3 nF = normalize(vec3((hL.y - hR.y) * relief, (hD.y - hU.y) * relief, 1.0));
  float dC = 0.88 + 0.23 * dot(nC, L);
  float dF = 0.88 + 0.23 * dot(nF, L);
  float sC = pow(max(dot(reflect(-L, nC), vec3(0.0, 0.0, 1.0)), 0.0), 30.0) * 0.22;
  float sF = pow(max(dot(reflect(-L, nF), vec3(0.0, 0.0, 1.0)), 0.0), 30.0) * 0.22;
  float bristleC = order.z + 0.5;
  float bristleF = order.w + 0.5;
  outLight = vec4(dC * mix(1.0, bristleC, shape.x) * 0.5, sC * shape.x, dF * mix(1.0, bristleF, shape.y) * 0.5, sF * max(shape.x, shape.y));
  outMask = vec4(shape.x, shape.y, order.x, order.y);
}
`;

/* ------------------------------------------------------------------ */
/* Composite: every frame, colour picked up through the strokes.       */
/* ------------------------------------------------------------------ */

export const COMPOSITE_FRAGMENT = /* glsl */ `${HEADER}
in vec2 vUv;
out vec4 outColor;
uniform sampler2D tScene;
uniform sampler2D tOffsetA;
uniform sampler2D tLightA;
uniform sampler2D tMaskA;
uniform sampler2D tOffsetB;
uniform sampler2D tLightB;
uniform sampler2D tMaskB;
uniform int uPainting;
uniform float uProgress;
uniform float uSketch;
uniform float uPaintIn;
uniform vec2 uResolution;
uniform vec2 uSceneSize;
uniform float uTime;
uniform int uDebug;
uniform vec2 uCrop;
uniform vec2 uSun;
${NOISE}

const float OFFSET_RANGE = 128.0;

vec3 paint(sampler2D tOffset, sampler2D tLight, sampler2D tMask, ivec2 px, vec2 frag, vec3 ground, out float order) {
  vec4 offset = (texelFetch(tOffset, px, 0) - 0.5) * (2.0 * OFFSET_RANGE);
  vec4 light = texelFetch(tLight, px, 0);
  vec4 mask = texelFetch(tMask, px, 0);
  vec4 coarse = texture(tScene, (frag + offset.xy) / uResolution);
  vec4 fine = texture(tScene, (frag + offset.zw) / uResolution);
  float alpha = smoothstep(0.5, 0.72, mask.x);
  float fineW = smoothstep(0.5, 0.72, mask.y) * smoothstep(0.16, 0.5, max(fine.a, coarse.a));
  // Each stroke's paint is mixed a little differently.
  float jitter = fract(mask.z * 53.7) - 0.5;
  vec3 stroke = coarse.rgb * (1.0 + jitter * 0.07) + vec3(jitter, -jitter * 0.4, -jitter) * 0.018;
  vec3 col = mix(ground, stroke, alpha);
  float fineJitter = fract(mask.w * 41.3) - 0.5;
  col = mix(col, fine.rgb * (1.0 + fineJitter * 0.06), fineW);
  float shade = mix(light.x, light.z, fineW) * 2.0;
  float sheen = mix(light.y, light.w, fineW);
  order = mask.z;
  return col * shade + sheen * vec3(1.0, 0.96, 0.88) * 0.55;
}

float luma(vec3 c) { return dot(c, vec3(0.3, 0.55, 0.15)); }

// A graphite drawing of the scene on cream paper, as the painter's first pass:
// a line on the darker side of each edge, light hatching in the shadows.
vec3 sketch(vec2 frag, vec2 uv) {
  float grain = vnoise(frag * 0.7) * 0.6 + vnoise(frag * 0.23) * 0.4;
  vec3 paper = vec3(0.95, 0.93, 0.88) * (0.965 + 0.05 * grain);
  if (uSketch <= 0.0) return paper;
  vec2 t = 1.6 / uSceneSize;
  float l = luma(texture(tScene, uv).rgb);
  float around = 0.0;
  for (int i = 0; i < 8; i++) {
    float a = float(i) * 0.7853982;
    around += luma(texture(tScene, uv + vec2(cos(a), sin(a)) * t).rgb);
  }
  float line = smoothstep(0.018, 0.07, around / 8.0 - l);
  float hatch = smoothstep(0.46, 0.22, l) * smoothstep(0.55, 0.85, 0.5 + 0.5 * sin(frag.x * 0.8 + frag.y * 0.55));
  float graphite = clamp(line + hatch * 0.35, 0.0, 1.0) * (0.75 + 0.25 * grain);
  // The drawing spreads in patches.
  float field = fbm3(uv * vec2(3.0 * uResolution.x / uResolution.y, 3.0) + 1.7);
  float shown = smoothstep(field - 0.05, field + 0.02, uSketch * 1.15 - 0.1);
  return mix(paper, vec3(0.27, 0.26, 0.25), graphite * 0.8 * shown);
}

void main() {
  ivec2 px = ivec2(gl_FragCoord.xy);
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uResolution;
  if (uDebug == 1) { outColor = vec4(texture(tScene, uv).rgb, 1.0); return; }
  vec3 ground = texture(tScene, uv).rgb * 0.95 + vec3(0.02, 0.012, 0.0);
  float orderA;
  float orderB;
  vec3 col = paint(tOffsetA, tLightA, tMaskA, px, frag, ground, orderA);
  if (uPaintIn < 1.06) {
    col = mix(sketch(frag, uv), col, smoothstep(-0.025, 0.025, uPaintIn - orderA));
  } else if (uPainting == 1) {
    vec3 over = paint(tOffsetB, tLightB, tMaskB, px, frag, ground, orderB);
    col = mix(col, over, smoothstep(-0.025, 0.025, uProgress - orderB));
  }
  // Warm varnish, a soft vignette, and the sun glowing through it all.
  col *= vec3(1.02, 0.995, 0.96);
  vec2 v = uv - 0.5;
  vec2 sunUv = vec2((uSun.x - uCrop.x) / uCrop.y, uSun.y);
  float sunR = length((uv - sunUv) * vec2(uResolution.x / uResolution.y, 1.0));
  float glow = exp(-sunR * 7.0);
  col *= 1.0 - 0.22 * dot(v * vec2(1.0, 1.2), v * vec2(1.0, 1.2)) * (1.0 - glow);
  col += vec3(0.2, 0.13, 0.04) * glow * uPaintIn + vec3(0.22, 0.2, 0.14) * exp(-sunR * 45.0) * uPaintIn;
  outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;
