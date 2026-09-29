import { COMPOSITION, HEADER, NOISE } from './glsl';

/*
 * The colour the brush picks up: a smooth seascape, never shown as it is.
 * The still parts (sky, hills, beach, cliff, pine) are drawn once per canvas
 * size; the sea is drawn every frame. The guide tells the stroke planner
 * which way strokes run, how long they are, what is where and how much
 * detail it holds.
 */

const SCENE = /* glsl */ `
uniform float uTime;
uniform float uEnergy;

vec2 designPoint(vec2 uv) { return vec2(uCrop.x + uv.x * uCrop.y, uv.y); }

// Distance to the sun, stretched along the horizon the way its glow spreads.
float glowDistance(vec2 p) { return length((p - uSun) * vec2(0.75, 1.5)); }

// The evening sky without clouds: gold at the horizon, peach, then a pale,
// faintly blue height away from the sun.
vec3 skyBase(vec2 p) {
  float h = clamp((p.y - uHorizon) / (1.0 - uHorizon), 0.0, 1.0);
  float r = glowDistance(p);
  float away = smoothstep(0.2, 1.3, distance(p, uSun));
  vec3 col = mix(vec3(1.0, 0.72, 0.4), vec3(0.99, 0.79, 0.6), smoothstep(0.0, 0.4, h));
  col = mix(col, vec3(0.72, 0.78, 0.87), smoothstep(0.35, 1.0, h) * (0.3 + 0.7 * away));
  col = mix(col, vec3(0.97, 0.7, 0.62), away * (1.0 - smoothstep(0.0, 0.55, h)) * 0.4);
  col = mix(col, vec3(1.0, 0.84, 0.52), exp(-r * 3.0) * 0.8);
  col = mix(col, vec3(1.0, 0.95, 0.8), exp(-r * 9.0));
  return col;
}

// Heaped cumulus: each cloud a soft pile of rounded puffs on a flat base,
// larger towards the top of the sky. Returns cover, and the facing of the
// puffs there (for lighting them like balls of cotton).
float cumulus(vec2 p, out vec3 normal) {
  float density = 0.0;
  vec3 facing = vec3(0.0);
  float fluff = fbm3(p * 55.0) - 0.5;
  for (int row = 0; row < 4; row++) {
    float fr = float(row);
    float size = 0.028 + 0.03 * fr;
    float spacing = size * 8.0;
    float base = uHorizon + 0.035 + 0.055 * fr;
    float slot0 = floor(p.x / spacing);
    for (int j = 0; j < 2; j++) {
      float slot = slot0 + float(j) - (fract(p.x / spacing) < 0.5 ? 1.0 : 0.0);
      vec4 r = hash42(vec2(fr * 13.1 + 1.0, slot * 7.7 + 3.0));
      if (r.w < 0.35) continue;
      float cx = (slot + 0.2 + 0.6 * r.x) * spacing;
      float by = base + (r.y - 0.5) * size * 1.6;
      float width = size * (3.5 + 4.0 * r.z);
      if (abs(p.x - cx) > width * 0.8 + size * 2.5 || p.y < by - size || p.y > by + size * 4.0) continue;
      for (int k = 0; k < 9; k++) {
        vec4 h4 = hash42(vec2(fr * 5.3 + float(k) * 1.7, slot * 3.1 + 1.0));
        // Six puffs along the base, three heaped on top of them.
        float t = k < 6 ? (float(k) + 0.5) / 6.0 : 0.2 + 0.6 * h4.z;
        float rad = size * (0.45 + 0.7 * sin(3.14159 * t)) * (0.65 + 0.7 * h4.x) * (k < 6 ? 1.0 : 0.75);
        float lift = k < 6 ? rad * 0.55 : size * (1.0 + 0.9 * h4.w);
        vec2 c = vec2(cx + (t - 0.5) * width + (h4.y - 0.5) * size * 1.2, by + lift);
        vec2 e = (p - c) / rad;
        float dd = dot(e, e) + fluff * 0.9;
        float cover = smoothstep(1.0, 0.4, dd);
        if (cover <= 0.0) continue;
        density += cover * (1.0 - density);
        facing += vec3(e, sqrt(max(0.0, 1.0 - min(dd, 1.0))) + 0.25) * cover;
      }
      density *= smoothstep(by - size * 0.35, by + size * 0.45, p.y);
    }
  }
  normal = length(facing) > 1e-4 ? normalize(facing) : vec3(0.0, 0.0, 1.0);
  return density;
}

float cloudDensity(vec2 p) {
  vec3 n;
  return cumulus(p, n);
}

// Soft banks of cloud on a plane above, flattening towards the horizon.
float cloudBank(vec2 p) {
  float h = max(p.y - uHorizon, 0.0);
  vec2 c = vec2(p.x / (0.25 + h) + uTime * 0.003, 0.7 / (0.05 + h));
  vec2 w = vec2(fbm3(c * 0.5 + 2.1), fbm3(c * 0.5 + vec2(6.3, 1.7))) - 0.5;
  float shape = fbm(c * vec2(0.9, 1.3) + w * 1.6);
  float cover = 0.5 + 0.1 * smoothstep(0.2, 0.06, distance(p, uSun));
  return smoothstep(cover, cover + 0.2, shape);
}

vec3 skyAt(vec2 p, out float detail) {
  vec3 col = skyBase(p);
  float h = max(p.y - uHorizon, 0.0);
  float nearSun = exp(-distance(p, uSun) * 2.2);
  float bank = cloudBank(p);
  if (bank > 0.001) {
    vec2 toSunBank = normalize(uSun - p + vec2(1e-4, 0.0));
    float edgeLit = clamp(0.5 + (bank - cloudBank(p + toSunBank * 0.02)) * 2.5, 0.0, 1.0);
    vec3 bankShade = mix(vec3(0.78, 0.64, 0.72), vec3(0.96, 0.7, 0.58), nearSun);
    vec3 bankLit = mix(vec3(1.0, 0.9, 0.78), vec3(1.0, 0.88, 0.62), nearSun);
    vec3 bankCol = mix(bankShade, bankLit, edgeLit);
    col = mix(col, bankCol, bank * 0.85);
  }
  // Long thin bars low down, glowing where they cross the sun.
  float bars = fbm3(vec2(p.x * 3.0, h * 90.0) + vec2(9.3, 2.1));
  float bar = smoothstep(0.56, 0.68, bars) * smoothstep(0.004, 0.02, h) * smoothstep(0.08, 0.03, h);
  col = mix(col, mix(vec3(0.96, 0.68, 0.56), vec3(1.0, 0.86, 0.56), nearSun), bar * 0.75);
  vec3 normal;
  float density = cumulus(p, normal);
  if (density > 0.001) {
    vec2 toSun = normalize(uSun - p + vec2(1e-4, 0.0));
    float lit = clamp(0.2 + 0.8 * dot(normal, normalize(vec3(toSun, 0.5))), 0.0, 1.0);
    vec3 shade = mix(vec3(0.7, 0.58, 0.7), vec3(0.95, 0.64, 0.54), nearSun);
    vec3 mid = mix(vec3(0.98, 0.76, 0.68), vec3(1.0, 0.78, 0.56), nearSun);
    vec3 bright = mix(vec3(1.0, 0.93, 0.8), vec3(1.0, 0.9, 0.64), nearSun);
    vec3 cloud = mix(shade, mid, smoothstep(0.05, 0.45, lit));
    cloud = mix(cloud, bright, smoothstep(0.5, 0.95, lit));
    // Distant clouds melt into the haze.
    cloud = mix(cloud, col, smoothstep(0.08, 0.0, h) * 0.45);
    col = mix(col, cloud, smoothstep(0.0, 0.8, density));
  }
  float disc = smoothstep(0.03, 0.022, distance(p, uSun));
  col = mix(col, vec3(1.0, 0.97, 0.86), disc);
  detail = max(max(density * (1.0 - density), bank * (1.0 - bank)) * 3.0, max(bar * 0.4, disc));
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
  // Clumps of dark trees in the folds.
  float trees = smoothstep(0.64, 0.74, fbm3(p * vec2(26.0, 40.0) + 13.0)) * smoothstep(0.55, 0.25, l);
  col = mix(col, vec3(0.2, 0.26, 0.18), trees * 0.7);
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
  float phase = across / WAVELENGTH + 0.9 * bend - uTime * WAVE_RATE;
  // Far out the swell is finer than a brush can draw: an even sheen.
  float blur = smoothstep(0.15, 0.45, fwidth(phase));
  float n = floor(phase + 0.5);
  float s = phase - n; // 0 on a crest, > 0 in front of it (towards the shore)
  float cross = sin(6.2831853 * (dot(g, vec2(0.94, -0.34)) / (WAVELENGTH * 1.7) - uTime * WAVE_RATE * 0.6));
  float swellSize = clamp(vnoise(vec2(along * 4.0, n * 1.9)) * (0.75 + 0.35 * cross), 0.0, 1.0);
  float height = (0.45 + 0.55 * swellSize) * (1.0 - blur);
  // Things that drift with the water.
  float drift = across - uTime * WAVE_RATE * WAVELENGTH;

  // Deep teal out at sea, turquoise over the sand, the sky's warmth near the horizon.
  vec3 col = mix(vec3(0.05, 0.33, 0.44), vec3(0.1, 0.5, 0.56), smoothstep(4.5, 0.8, toShore));
  // Broad patches of deeper blue and greener water.
  float patchesOfWater = fbm3(g * vec2(0.9, 1.6) + 7.0);
  col = mix(col, vec3(0.04, 0.27, 0.42), smoothstep(0.5, 0.75, patchesOfWater) * 0.45);
  col = mix(col, vec3(0.12, 0.52, 0.5), smoothstep(0.45, 0.2, patchesOfWater) * 0.35 * smoothstep(5.0, 2.0, toShore));
  col = mix(col, vec3(0.2, 0.62, 0.62), smoothstep(1.4, 0.2, toShore) * 0.55);
  col = mix(col, vec3(0.42, 0.56, 0.63), smoothstep(0.22, 0.02, d) * 0.65);
  col = mix(col, vec3(0.86, 0.75, 0.62), smoothstep(0.05, 0.0, d) * 0.55);
  // Long light and dark streaks along the swell.
  vec2 streakAt = vec2(along * 4.0, drift * 26.0);
  float streak = mix(0.5, fbm3(streakAt), 1.0 - smoothstep(0.3, 0.8, length(fwidth(streakAt))));
  col *= 0.88 + 0.24 * streak;

  // Backs of the swell mirror the bright sky; faces turned to us fall into shadow.
  float back = smoothstep(-0.5, -0.05, s) * smoothstep(0.03, -0.02, s);
  float face = smoothstep(-0.01, 0.04, s) * smoothstep(0.32, 0.1, s);
  col = mix(col, vec3(0.46, 0.65, 0.68), back * 0.3 * height);
  col = mix(col, col * vec3(0.52, 0.76, 0.8), face * height * 0.85);

  // Past a line that wanders along the beach the crests curl over, breaking
  // first in stretches that peel along them, then all along.
  float breakAt = 2.8 + 1.4 * vnoise(vec2(along * 2.0, n * 1.3 + 0.5));
  float surf = smoothstep(breakAt, breakAt - 0.6, toShore) * (1.0 - blur);
  float peel = smoothstep(0.42, 0.58, vnoise(vec2(along * 5.0 + n * 3.1 + uTime * 0.3, n * 1.7)) * (0.75 + 0.5 * swellSize));
  float broken = surf * max(peel, smoothstep(breakAt - 1.2, breakAt - 2.4, toShore));
  // The wall under the lip: sunlit turquoise at the top, deep teal at its foot.
  float wall = smoothstep(-0.005, 0.01, s) * smoothstep(0.28, 0.17, s) * max(surf, 0.35 * height);
  vec3 wallCol = mix(vec3(0.38, 0.84, 0.74), vec3(0.03, 0.28, 0.37), smoothstep(0.02, 0.24, s));
  col = mix(col, wallCol, wall * 0.92);
  // The lip: a thick roll of foam, warm where the sun catches it, cool beneath,
  // with a shadow where it curls over.
  float nearShore = smoothstep(2.4, 0.9, toShore);
  float lipBack = mix(-0.03, mix(-0.16, -0.24, nearShore), broken);
  float lipFront = mix(0.015, mix(0.08, 0.11, nearShore), broken);
  float lip = smoothstep(lipBack, lipBack * 0.3, s) * (1.0 - smoothstep(lipFront - 0.012, lipFront, s));
  lip *= max(broken, surf * 0.3 * swellSize) * (0.8 + 0.2 * swellSize);
  float lipDepth = clamp((s - lipBack) / (lipFront - lipBack), 0.0, 1.0);
  float curl = smoothstep(lipFront - 0.004, lipFront + 0.008, s) * smoothstep(lipFront + 0.05, lipFront + 0.014, s) * broken;
  col = mix(col, col * vec3(0.5, 0.66, 0.72), curl * 0.7);

  // Foam lace behind broken crests and all over the inner surf, drifting in.
  vec2 laceAt = vec2(along * 7.0, drift * 22.0);
  float laceFade = 1.0 - smoothstep(0.3, 0.9, length(fwidth(laceAt)));
  vec2 laceWarp = (vec2(fbm3(laceAt * 0.35), fbm3(laceAt * 0.35 + 4.0)) - 0.5) * 1.8;
  float threads = mix(0.5, lace(laceAt + laceWarp) * 0.65 + lace(laceAt * 2.3 + laceWarp * 1.7 + 7.0) * 0.35, laceFade);
  float patches = fbm3(laceAt * 0.22 + 3.0);
  float trail = exp(min(s, 0.0) / 0.2) * step(s, 0.0) * broken;
  float inner = smoothstep(1.8, 0.6, toShore) * (1.0 - blur);
  float field = max(trail * smoothstep(0.25, 0.55, patches + 0.25), inner * smoothstep(0.3, 0.58, patches + 0.22 * inner));
  float foamLace = field * (0.3 + 0.7 * threads);
  // Swash sliding up the sand in thin lines, and the edge of the water.
  float swashPhase = toShore / 0.26 + uTime * 0.2;
  float swash = smoothstep(0.75, 0.05, toShore) * exp(-pow((fract(swashPhase) - 0.5) / 0.14, 2.0))
    * smoothstep(0.3, 0.6, vnoise(vec2(along * 12.0, floor(swashPhase) * 1.3)));
  float edge = smoothstep(0.12, 0.0, toShore);
  float cap = (1.0 - surf) * smoothstep(0.76, 0.92, vnoise(vec2(along * 9.0, n * 2.7))) * exp(-pow(s / 0.05, 2.0)) * (1.0 - blur);
  float foam = clamp(max(lip, foamLace * 0.95) + swash * 0.8 + edge + cap * 0.85, 0.0, 1.0);
  foam *= 0.75 + 0.25 * uEnergy;
  vec3 foamCol = mix(vec3(0.72, 0.79, 0.82), vec3(1.0, 0.96, 0.87), clamp(0.25 + 0.75 * threads - 0.6 * lip * smoothstep(0.4, 1.0, lipDepth) + 0.3 * lip, 0.0, 1.0));
  col = mix(col, foamCol, foam);

  // The sun's road: glints on the wave backs and chop, widening towards us.
  float centre = uSun.x + 0.05 * d;
  float width = 0.035 + 0.5 * d;
  float road = exp(-pow((p.x - centre) / width, 2.0));
  // Glints: short strokes of light lying along the waves.
  vec2 fleckAt = vec2(along * 9.0 + uTime * 0.08, drift * 70.0 + g.x * 3.0);
  float fleckFade = 1.0 - smoothstep(0.35, 0.9, length(fwidth(fleckAt)));
  float shimmer = vnoise(vec2(p.x * 18.0 + uTime * 0.15, p.y * 48.0 - uTime * 0.3));
  float glint = mix(0.45 + 0.4 * smoothstep(0.35, 0.75, shimmer), smoothstep(0.48, 0.72, vnoise(fleckAt) * (0.7 + 0.5 * back) + 0.3 * (streak - 0.5)), fleckFade);
  float sun = road * glint * (1.0 - 0.7 * foam);
  // Between the glints the water in the road looks darker by contrast.
  col = mix(col, col * vec3(0.8, 0.82, 0.86) + vec3(0.1, 0.07, 0.03), road * (1.0 - glint) * (1.0 - foam) * 0.6);
  col = mix(col, mix(vec3(1.0, 0.76, 0.42), vec3(1.0, 0.94, 0.72), glint), sun * 0.95);
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
  // Broad swathes where the slope catches the low sun, and shrubs in clusters.
  float swathe = fbm3(p * vec2(2.5, 4.0) + 1.3);
  col *= 0.82 + 0.36 * smoothstep(0.3, 0.7, swathe);
  float shrubs = smoothstep(0.62, 0.72, fbm3(p * vec2(9.0, 14.0) + 21.0));
  col = mix(col, mix(vec3(0.26, 0.31, 0.15), vec3(0.55, 0.54, 0.25), smoothstep(0.4, 0.8, blades)), shrubs * 0.75);
  // Rocks where the cliff drops into the surf.
  float rock = smoothstep(0.56, 0.66, fbm3(p * vec2(14.0, 18.0) + 11.0)) * smoothstep(0.24, 0.06, p.y) * smoothstep(0.12, 0.02, below);
  vec3 rockCol = mix(vec3(0.3, 0.22, 0.18), vec3(0.66, 0.5, 0.36), smoothstep(0.4, 0.8, vnoise(p * 60.0)));
  col = mix(col, rockCol, rock);
  detail = 0.62;
  return col;
}

vec3 farHillsAt(vec2 p, float top) {
  float t = clamp((p.y - uHorizon) / max(top - uHorizon, 1e-3), 0.0, 1.0);
  return mix(vec3(0.62, 0.55, 0.6), vec3(0.8, 0.66, 0.6), t * 0.6 + 0.4 * fbm3(p * vec2(18.0, 40.0)));
}

// Everything but the pine.
vec3 groundAt(vec2 p, int region, out float detail) {
  detail = 0.0;
  if (region == GRASS) return grassAt(p, cliffTop(p.x), detail);
  if (region == SKY) return skyAt(p, detail);
  if (region == FAR_HILLS) {
    detail = 0.3;
    return farHillsAt(p, uHorizon + farRidge(p.x));
  }
  if (region == SEA) return seaAt(p, detail);
  if (region == BEACH) {
    float shore = shoreX(p.y);
    return beachAt(p, (p.x - shore) / beachWidth(p.y), detail);
  }
  if (p.y >= uHorizon) {
    float nearTop = uHorizon + nearRidge(p.x);
    vec3 col = landAt(p, 0.3 + 0.15 * smoothstep(1.4, 0.9, p.x), detail);
    return mix(col, vec3(1.0, 0.82, 0.52), smoothstep(0.012, 0.0, nearTop - p.y) * 0.35);
  }
  return landAt(p, 0.45 * smoothstep(0.2, 0.0, uHorizon - p.y), detail);
}

// The pine over whatever is behind it.
vec3 paintTree(vec2 p, vec3 col) {
  vec2 q = treeLocal(p);
  if (!inTreeBox(q)) return col;
  float lit;
  float needles = needleDensity(q, 0.0, lit);
  vec2 woodDir;
  float across;
  float wood = woodDist(q, woodDir, across);
  if (wood < 0.0) {
    // Round limbs lit from the left, with bark furrowed along the grain.
    vec2 grain = normalize(woodDir);
    float furrows = vnoise(vec2(dot(q, grain) * 30.0, across * 2.5 + dot(q, vec2(-grain.y, grain.x)) * 90.0));
    float light = smoothstep(-0.4, 0.9, across) * (0.75 + 0.25 * furrows);
    vec3 bark = mix(vec3(0.16, 0.1, 0.07), vec3(0.4, 0.26, 0.16), smoothstep(0.1, 0.6, light));
    bark = mix(bark, vec3(0.72, 0.48, 0.28), smoothstep(0.62, 0.95, light));
    col = mix(col, bark, smoothstep(0.0, -0.004, wood));
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
  }
  return col;
}
`;

/**
 * The still parts of the view, drawn once per canvas size: the colour the
 * brush picks up (with the pine, and the sea as it first stands), and the
 * base the still strokes are painted on: opaque everywhere but the open sea.
 */
export const STILL_FRAGMENT = /* glsl */ `${HEADER}
in vec2 vUv;
layout(location = 0) out vec4 outColor;
layout(location = 1) out vec4 outBase;
${NOISE}
${COMPOSITION}
${SCENE}

void main() {
  vec2 p = designPoint(vUv);
  float detail;
  int region = groundRegion(p);
  vec3 col = groundAt(p, region, detail);
  vec3 withTree = paintTree(p, col);
  outColor = vec4(withTree, 1.0);
  // Under the pine the base keeps its colours, so no water glints through its needles.
  bool pine = any(greaterThan(abs(withTree - col), vec3(0.002)));
  outBase = pine ? vec4(withTree, 1.0) : region == SEA ? vec4(0.0) : vec4(col, 1.0);
}
`;

/** The sea as it moves, drawn every frame, everywhere below the horizon (strokes may wander over the shore). */
export const SEA_FRAGMENT = /* glsl */ `${HEADER}
in vec2 vUv;
out vec4 outColor;
${NOISE}
${COMPOSITION}
${SCENE}

void main() {
  vec2 p = designPoint(vUv);
  float detail;
  outColor = vec4(seaAt(vec2(p.x, min(p.y, uHorizon - 0.0015)), detail), 1.0);
}
`;

/**
 * For the stroke planner: flow angle (mod π), stroke length, region and
 * importance (where finer strokes are needed).
 */
export const GUIDE_FRAGMENT = /* glsl */ `${HEADER}
in vec2 vUv;
out vec4 outGuide;
${NOISE}
${COMPOSITION}
${SCENE}

const float PI = 3.14159265;

void main() {
  vec2 p = designPoint(vUv);
  int region = groundRegion(p);
  vec2 q = treeLocal(p);
  float lit;
  float needles = inTreeBox(q) ? needleDensity(q, 0.0, lit) : -1.0;
  vec2 woodDir = vec2(0.0, 1.0);
  float across;
  float wood = inTreeBox(q) ? woodDist(q, woodDir, across) : 1.0;
  if (needles > 0.0) region = NEEDLES;
  else if (wood < 0.0) region = WOOD;

  float shore = shoreX(p.y);
  float beachSlope = (shoreX(p.y + 0.01) - shoreX(p.y - 0.01)) / 0.02;
  float beachAngle = atan(1.0, beachSlope);
  float horizonLine = smoothstep(0.008, 0.0, abs(p.y - uHorizon));
  float angle = 0.0;
  float lengthScale = 1.0;
  float importance = 0.3;
  if (region == WOOD) {
    // Along the trunk and branches.
    angle = atan(woodDir.y, woodDir.x);
    lengthScale = 0.8;
    importance = 0.95;
  } else if (region == NEEDLES) {
    // Short dabs, mostly level, combed by the wind; finest at the ragged edges.
    angle = 0.2 * (vnoise(p * 40.0) - 0.5);
    lengthScale = 0.6;
    importance = 0.72 + 0.28 * smoothstep(0.2, 0.02, needles);
  } else if (region == GRASS) {
    // Grass leans away from the wind; the lit edge of the cliff is drawn finely.
    float cliff = cliffTop(p.x);
    angle = 1.95 + 0.25 * (vnoise(p * 20.0) - 0.5);
    lengthScale = 1.15;
    importance = 0.5 + 0.4 * smoothstep(0.05, 0.0, cliff - p.y);
  } else if (region == SKY) {
    // Level strokes in the open sky, circling the sun; in the clouds they
    // follow the round of each puff.
    vec2 d = p - uSun;
    float r = length(d);
    float around = atan(d.y, d.x) + 1.5707963;
    float drift = 0.14 * sin(p.x * 5.0 + p.y * 9.0) + 0.14 * (vnoise(p * 6.0) - 0.5);
    float nearSun = smoothstep(0.13, 0.05, r);
    float e = 0.006;
    float cloud = max(cloudDensity(p), cloudBank(p) * 0.8);
    vec2 slope = vec2(max(cloudDensity(p + vec2(e, 0.0)), cloudBank(p + vec2(e, 0.0)) * 0.8) - cloud,
                      max(cloudDensity(p + vec2(0.0, e)), cloudBank(p + vec2(0.0, e)) * 0.8) - cloud);
    float contour = atan(slope.x, -slope.y);
    float inCloud = smoothstep(0.02, 0.2, length(slope) / e * 0.02) * smoothstep(0.02, 0.2, cloud);
    angle = mix(mix(drift, around, nearSun), contour, inCloud * (1.0 - nearSun));
    lengthScale = mix(mix(1.3, 0.7, nearSun), 0.75, inCloud);
    float detail;
    skyAt(p, detail);
    importance = max(max(0.22 + 0.5 * detail + 0.3 * smoothstep(0.05, 0.4, cloud), 0.95 * smoothstep(0.1, 0.03, r)), horizonLine * 0.8);
  } else if (region == FAR_HILLS) {
    angle = 0.12 * sin(p.x * 11.0);
    lengthScale = 1.0;
    importance = max(0.42 + 0.3 * smoothstep(0.006, 0.0, uHorizon + farRidge(p.x) - p.y), horizonLine * 0.8);
  } else if (region == LAND) {
    angle = -0.35 + 0.3 * (vnoise(p * 12.0) - 0.5);
    lengthScale = 0.85;
    importance = max(0.4 + 0.35 * smoothstep(0.008, 0.0, uHorizon + nearRidge(p.x) - p.y), horizonLine * 0.7);
  } else if (region == BEACH) {
    angle = beachAngle;
    lengthScale = 1.1;
    importance = 0.5 + 0.35 * smoothstep(0.35, 0.0, (p.x - shore) / beachWidth(p.y));
  } else {
    // The sea: along the crests; near the beach the wash runs along the sand.
    vec2 crest = crestDirection(p);
    float toShore = shoreDistance(p);
    angle = mix(atan(crest.y, crest.x), beachAngle, smoothstep(0.8, 0.2, toShore));
    lengthScale = mix(0.95, 1.25, smoothstep(0.0, 0.3, uHorizon - p.y));
    float d = uHorizon - p.y;
    float road = exp(-pow((p.x - uSun.x - 0.05 * d) / (0.035 + 0.5 * d), 2.0));
    float surf = smoothstep(4.2, 2.0, toShore);
    importance = max(max(min(0.82, 0.34 + 0.42 * surf + 0.3 * road), horizonLine * 0.8), 0.9 * smoothstep(0.4, 0.05, toShore));
  }
  outGuide = vec4(fract(angle / PI), clamp(lengthScale / 2.0, 0.0, 1.0), (float(region) + 0.5) / 8.0, clamp(importance, 0.0, 1.0));
}
`;
