/*
 * Shared shore model for the pebble strand. One analytic description of the
 * water drives every surface, so the sea mesh, the bed, the stones and the
 * shells agree on where the water is and where it has just been:
 *  - incoming wavelets travel shoreward, steepen over the shallowing bed and
 *    spill once their height reaches about half the depth (depth-limited);
 *  - each wave arrives as a swash cycle: a fast uprush that decelerates, then
 *    a slower backwash; run-up height and along-shore lobes differ per wave;
 *  - `swDryAge` gives the seconds since the swash last covered a point, so a
 *    stone stays glossy just after the water drains and slowly turns matte.
 * Requires GLSL_NOISE. CPU mirrors (bedHeight, SHORE) live below.
 */

export const SHORE = { period: 10, uprush: .3, still: .02 };

/** Must match `bed()` in GLSL_SHORE. */
export function bedHeight(x: number, z: number) {
  return .038 * (z + 1.7) + .018 * Math.sin(x * .67) + .009 * Math.sin(z * 1.3 + x * .2) - .09 * Math.exp(-Math.pow((x + .4) * .6, 2)) * Math.exp(-Math.pow((z - .2) * .35, 2));
}

export const GLSL_SHORE = /* glsl */ `
uniform vec3 uSun;
float bed(vec2 p) {
  return .038 * (p.y + 1.7) + .018 * sin(p.x * .67) + .009 * sin(p.y * 1.3 + p.x * .2)
    - .09 * exp(-((p.x + .4) * .6) * ((p.x + .4) * .6)) * exp(-((p.y - .2) * .35) * ((p.y - .2) * .35));
}
const float SW_T = ${SHORE.period.toFixed(1)};
const float SW_UP = ${SHORE.uprush.toFixed(2)};
const float SW_SWL = ${SHORE.still.toFixed(3)};
const float SW_DRAIN = 1.45;
const float WV_C = 1.3;
const float WV_Z = -1.2;
float swHash(float k, float salt) { return bwHash1(vec3(k, salt, 11.0)); }
/** Vertical run-up of wave k above still water, with along-shore lobes (cusps). */
float swRunup(float k, float x) {
  float a = swHash(k, 1.0), b = swHash(k, 2.0), c = swHash(k, 3.0);
  float r = 0.034 + 0.05 * a * a + 0.012 * b;
  return r * (1.0 + 0.17 * sin(x * 0.85 + c * 6.2832) + 0.07 * sin(x * 2.3 + b * 6.2832));
}
float swLevel(float k, float s, float x) {
  float R = swRunup(k, x);
  if (s < SW_UP) { float u = s / SW_UP; return R * (1.0 - (1.0 - u) * (1.0 - u)); }
  return R * pow(1.0 - (s - SW_UP) / (1.0 - SW_UP), SW_DRAIN);
}
/** Swash cycles arrive slightly obliquely: the right of the strand is reached first. */
float swPhase(float x, float t) { return (t - x * 0.08) / SW_T; }
float swashLevel(float x, float t) { float ph = swPhase(x, t); return SW_SWL + swLevel(floor(ph), fract(ph), x); }
/** Seconds since the swash last covered height y at along-shore x (0 while covered). */
float swDryAge(float x, float y, float t) {
  float h = y - SW_SWL;
  if (h <= 0.0) return 0.0;
  float ph = swPhase(x, t), k = floor(ph), s = fract(ph);
  if (swLevel(k, s, x) >= h) return 0.0;
  for (int i = 0; i < 3; i++) {
    float R = swRunup(k - float(i), x);
    if (R > h && (i > 0 || s > SW_UP)) {
      float u = 1.0 - pow(h / R, 1.0 / SW_DRAIN);
      return (s + float(i) - SW_UP - u * (1.0 - SW_UP)) * SW_T;
    }
  }
  return 60.0;
}
/** Seconds a crest still needs to reach the swash line (WV_Z) from here. */
float wvTravel(vec2 p) {
  float off = max(WV_Z - p.y, 0.0);
  float bend = (0.55 * sin(p.x * 0.13 + 1.3) + 0.22 * sin(p.x * 0.41 + 0.4)) * smoothstep(0.0, 5.0, off);
  return (off + bend) / WV_C;
}
/** Wave phase: crest k reaches the swash line exactly when swash cycle k starts. */
float wvPhase(vec2 p, float t) { return (t - p.x * 0.08 + wvTravel(p)) / SW_T; }
/** Height of crest k at still-water depth D: shoaling growth, capped once it breaks. */
float wvHeight(float k, float D, out float breaking) {
  float A = 0.09 * (0.7 + 0.6 * swHash(k, 1.0)) * pow(0.6 / max(D, 0.05), 0.25);
  float cap = 0.5 * max(D, 0.0);
  breaking = smoothstep(0.8, 1.15, A / max(cap, 1e-3)) * step(0.0, D);
  return min(A, cap);
}
struct Shore { float level; float wave; float swash; float since; float brkPrev; float brkNext; float lens; float s; float white; float trail; };
/** The water surface over the strand and the surf zone (no offshore swell). */
Shore shoreAt(vec2 p, float t) {
  Shore o;
  float D = SW_SWL - bed(p);
  float travel = wvTravel(p);
  float ph = (t - p.x * 0.08 + travel) / SW_T;
  float k = floor(ph), d = fract(ph);
  float hPrev = wvHeight(k, D, o.brkPrev), hNext = wvHeight(k + 1.0, D, o.brkNext);
  // Peaked crests over flat troughs; the front steepens as the wave spills.
  float back = exp(-d / (0.1 - 0.035 * o.brkPrev)), front = exp(-(1.0 - d) / (0.035 - 0.015 * o.brkNext));
  o.wave = hPrev * (back - 0.09) + hNext * (front - 0.03);
  o.since = d;
  float face = smoothstep(0.86, 0.975, d) * (1.0 - smoothstep(0.985, 1.0, d));
  o.white = o.brkNext * face + o.brkPrev * exp(-d / 0.045);
  o.trail = o.brkPrev * exp(-d * SW_T / 2.6);
  // Wind chop riding between the main waves: small wavelets that spill in the
  // shallows and die before the strand.
  float ph2 = (t - p.x * 0.05 + travel * 0.95) / 4.3 + 0.37;
  float k2 = floor(ph2), d2 = fract(ph2);
  float A2 = 0.04 * (0.5 + swHash(k2, 5.0)) * pow(0.6 / max(D, 0.05), 0.25) * smoothstep(-0.02, 0.06, D);
  float cap2 = 0.5 * max(D, 0.0);
  float brk2 = smoothstep(0.8, 1.15, A2 / max(cap2, 1e-3)) * step(0.0, D);
  o.wave += min(A2, cap2) * (exp(-d2 / 0.12) + exp(-(1.0 - d2) / 0.04) - 0.16);
  o.white += brk2 * (exp(-d2 / 0.06) + smoothstep(0.88, 0.975, d2) * (1.0 - smoothstep(0.985, 1.0, d2))) * 0.7;
  o.trail += brk2 * exp(-d2 * 4.3 / 2.0) * 0.6;
  float sph = swPhase(p.x, t);
  o.s = fract(sph);
  o.swash = swLevel(floor(sph), o.s, p.x);
  // Seaward of the still-water line the swash lens thins into the surf.
  o.lens = max(o.swash - 0.6 * max(D, 0.0), 0.0);
  o.level = SW_SWL + max(o.wave, o.lens);
  return o;
}
float shoreLevel(vec2 p, float t) { return shoreAt(p, t).level; }
/** Web-like foam: ridges of two noise layers, broken by holes. */
float foamLace(vec2 q, float t) {
  float a = 1.0 - abs(bwNoise(vec3(q * 3.6, t * 0.12)));
  float b = 1.0 - abs(bwNoise(vec3(q * 8.5 + 3.7, t * 0.17)));
  float web = max(pow(a, 7.0), pow(b, 6.0) * 0.85);
  float holes = smoothstep(-0.3, 0.35, bwNoise(vec3(q * 1.3, t * 0.04 + 5.0)));
  return web * holes;
}
`;

/** Dawn sky with a structured cloud deck. Requires GLSL_NOISE and `uniform vec3 uSun`. */
export const GLSL_DAWN_SKY = /* glsl */ `
float cloudShape(vec2 q, bool detail) {
  vec2 w = vec2(bwNoise(vec3(q * 0.45, 1.7)), bwNoise(vec3(q * 0.45 + 5.2, 3.1)));
  q += w * 0.6;
  float n = detail ? bwFbm5(vec3(q, 0.37)) : bwFbm3(vec3(q, 0.37));
  float cell = 1.0 - abs(bwNoise(vec3(q * 2.4, 7.7)));
  // Large-scale coverage: banks and clear lanes rather than an even sheet.
  float cover = 0.1 * bwNoise(vec3(q * 0.16, 9.3)) + 0.01;
  return n + 0.3 * cell * cell + cover - 0.1;
}
vec3 dawnSky(vec3 d, float t, bool detail) {
  float hp = max(d.y, 0.0);
  float s = max(dot(d, uSun), 0.0);
  vec3 c = mix(vec3(0.95, 0.8, 0.64), vec3(0.15, 0.24, 0.43), pow(hp, 0.42));
  c += vec3(0.9, 0.5, 0.19) * pow(s, 8.0) * exp(-hp * 4.0);
  c += vec3(2.4, 1.5, 0.65) * pow(s, 200.0);
  float alpha = 0.0;
  if (d.y > 0.004) {
    vec2 q = d.xz / (d.y + 0.035) * 0.42 + vec2(t * 0.0025, t * 0.001);
    float shape = cloudShape(q, detail);
    float dens = smoothstep(0.0, 0.16, shape);
    if (dens > 0.0) {
      // Light reaching the deck through its own body toward the sun: edges
      // facing the sun brighten, thick cores stay grey-violet.
      vec2 toSun = normalize(uSun.xz);
      float toward = detail ? smoothstep(0.0, 0.3, cloudShape(q + toSun * 0.11, false)) : dens;
      float lit = exp(-2.2 * toward) * 0.85 + 0.15;
      float forward = pow(s, 6.0) * 2.2 + pow(s, 40.0) * 5.0;
      vec3 shade = mix(vec3(0.25, 0.26, 0.33), vec3(0.55, 0.45, 0.42), exp(-hp * 4.0));
      vec3 cloud = shade * (1.0 - 0.4 * dens) + vec3(1.6, 0.92, 0.48) * (0.45 + forward) * lit * lit * (1.0 - 0.45 * dens);
      // Silver lining: thin rims near the sun scatter it forward.
      cloud += vec3(2.6, 1.7, 0.85) * pow(s, 10.0) * dens * (1.0 - dens) * 4.0;
      alpha = dens * smoothstep(0.004, 0.06, hp) * 0.94;
      c = mix(c, cloud, alpha);
    }
    if (detail) {
      // High cirrus streaks, combed by the upper wind.
      float ci = bwFbm3(vec3(q.x * 0.3 + q.y * 0.12, q.y * 1.7 - q.x * 0.2, 4.0));
      ci = smoothstep(0.12, 0.5, ci) * (1.0 - alpha) * smoothstep(0.06, 0.25, hp) * 0.4;
      c = mix(c, vec3(1.25, 0.98, 0.76) * (0.55 + pow(s, 5.0) * 1.6), ci);
    }
  }
  c += vec3(70.0, 55.0, 36.0) * smoothstep(0.99955, 0.99978, s) * (1.0 - alpha);
  // Horizon haze band.
  c = mix(c, vec3(0.88, 0.8, 0.72) + vec3(0.9, 0.5, 0.2) * pow(s, 4.0), exp(-hp * 28.0) * 0.55);
  return c;
}
`;
