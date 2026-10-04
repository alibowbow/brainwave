import * as THREE from 'three';
import { CLOUD_SHADOW_GLSL } from './clouds';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { WATERLINE_ROCKS, type WaterlineRock } from './rocks';
import { WORLD_GLSL } from './world';

/*
 * The sea, shaded per pixel on a flat plane (from the headland, the swell's
 * height hardly shows; its slopes, colour, foam and glitter do):
 *  - open-sea swell: wave trains with sharp crests rolling in from the
 *    west-north-west, now and then a whitecap on a crest;
 *  - the surf: crests that follow the coast, steepen over the shallows and
 *    break in stretches that spread along them, leaving whitewater behind;
 *  - colour through the water (deep blue to turquoise over sand), the
 *    sky mirrored with Fresnel, and the sun's glitter from a rough surface
 *    (when the sun is before the viewer): wide and soft far out, broken
 *    into sparks near by.
 */
export const OCEAN_GLSL = /* glsl */ `
uniform float uEnergy;
uniform float uDetail;
// Rocks standing in the water (x, z, radius; radius 0 for none), which the sea foams round.
uniform vec3 uRocks[${WATERLINE_ROCKS}];

const float TAU = 6.2831853;
const vec2 SWELL_DIR = vec2(0.7596, 0.6504);

// The long swell, rolling in from the open sea in rows: a few long
// exponential-sine waves (sharp crests, flat troughs), their heights
// exaggerated so that the rows still read from high on the headland.
const float LONG_MEAN = 1.34;
const float LONG_RANGE = 1.5;
float longSwell(vec2 p, float fade) {
  float h = 0.0;
  float angle = atan(SWELL_DIR.y, SWELL_DIR.x);
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float wavelength = 150.0 * pow(0.74, fi);
    float amplitude = 1.4 * pow(0.78, fi);
    float a = angle + (fi - 1.0) * 0.18;
    vec2 d = vec2(cos(a), sin(a));
    float k = TAU / wavelength;
    float w = sqrt(9.81 * k);
    float visible = smoothstep(fade * 2.0, fade * 5.0, wavelength);
    h += amplitude * mix(0.4, exp(1.3 * (sin(dot(d, p) * k - w * uTime + fi * 2.3) - 1.0)), visible);
  }
  return h;
}

// The wind's chop on top: shorter, short-crested waves from a wider spread
// of directions, dropped once they would be finer than a few pixels.
float chop(vec2 p, float fade) {
  float h = 0.0;
  float angle = atan(SWELL_DIR.y, SWELL_DIR.x);
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float wavelength = 42.0 * pow(0.7, fi);
    float amplitude = 0.55 * pow(0.66, fi);
    float a = angle + (mod(fi, 2.0) * 2.0 - 1.0) * (0.45 + 0.15 * fi);
    vec2 d = vec2(cos(a), sin(a));
    float k = TAU / wavelength;
    float w = sqrt(9.81 * k);
    float visible = smoothstep(fade * 3.0, fade * 7.0, wavelength);
    h += amplitude * visible * exp(1.6 * (sin(dot(d, p) * k - w * uTime + fi * 1.7) - 1.0));
  }
  return h;
}

float swell(vec2 p, float fade) {
  return longSwell(p, fade) + chop(p, fade);
}

// Distance along the coast, for what varies from one stretch of a crest to the next.
float alongShore(vec2 p) {
  return p.y - 0.55 * p.x;
}

// How many crests out from the shore: they close up over the shallows and roll in.
float surfPhase(vec2 p, float d) {
  float along = alongShore(p);
  float spacing = (d + 36.0 * (1.0 - exp(-d / 60.0))) / 36.0;
  // The crests come in staggered sections, each a little ahead of or behind the next.
  float section = along / 75.0 + 0.6 * vnoise(vec2(d * 0.02, 5.0));
  float here = hash12(vec2(floor(section), 3.0));
  float next = hash12(vec2(floor(section) + 1.0, 3.0));
  spacing += 0.42 * (mix(here, next, smoothstep(0.6, 1.0, fract(section))) - 0.5) * smoothstep(20.0, 120.0, d);
  return spacing + 0.5 * (vnoise(vec2(along * 0.004, 1.3)) - 0.5) + 0.7 * (fbm3(p * 0.007) - 0.5) + 0.4 * (fbm3(p * 0.02 + 3.0) - 0.5) + 0.26 * (vnoise(p * 0.045 + 9.0) - 0.5) + 0.16 * (vnoise(p * 0.11) - 0.5) + uTime / 9.0;
}

// The swell arrives in sets: a few big waves, then a lull of smaller ones.
float setStrength(float wave) {
  float group = floor(wave / 5.0);
  float offset = hash12(vec2(group, 7.0)) * 6.2831;
  return 0.5 + 0.5 * sin(wave * 1.25 + offset);
}

// Where along a wave its crest has broken. Stretches break first where the
// water shoals, then spread until the whole crest is white.
float brokenAt(vec2 p, float d, float wave) {
  float along = alongShore(p);
  float breakLine = 160.0 + 70.0 * vnoise(vec2(along * 0.01, 3.1));
  float progress = smoothstep(breakLine + 10.0, breakLine - 100.0, d);
  float stretch = vnoise(vec2(along * 0.032 + wave * 7.1, wave * 2.3)) * 0.7 + vnoise(vec2(along * 0.12 + wave * 3.3, wave * 5.7)) * 0.3;
  float threshold = 0.64 - 0.32 * progress - 0.14 * smoothstep(70.0, 25.0, d);
  // Smaller waves between the sets only break close in.
  float small = step(setStrength(wave), 0.72) * smoothstep(40.0, 90.0, d);
  return smoothstep(threshold, threshold + 0.06, stretch) * smoothstep(breakLine + 25.0, breakLine, d) * (1.0 - small);
}

// Height of the surf; cycle is where a point sits between two crests (0 just
// behind one, near 1 on the face of the next), wave which crest it belongs to.
float surf(vec2 p, float d, out float cycle, out float wave, out float size) {
  float phase = surfPhase(p, d);
  cycle = fract(phase);
  wave = floor(phase + 0.5);
  float along = alongShore(p);
  float breakLine = 160.0 + 70.0 * vnoise(vec2(along * 0.01, 3.1));
  float progress = smoothstep(breakLine + 10.0, breakLine - 100.0, d);
  float setSize = (0.35 + 0.65 * vnoise(vec2(along * 0.012, wave * 1.7))) * (0.45 + 0.7 * setStrength(wave));
  float envelope = smoothstep(320.0, breakLine, d) * (1.0 - 0.45 * progress) * smoothstep(0.0, 12.0, d);
  float back = pow(1.0 - cycle, 2.5);
  float front = pow(smoothstep(0.8, 1.0, cycle), 1.6);
  size = envelope * setSize;
  return (0.9 + 0.7 * uEnergy) * size * max(back, front);
}

float seaHeight(vec2 p, float d, float fade) {
  float cycle;
  float wave;
  float size;
  float calm = smoothstep(2.0, 60.0, d);
  return swell(p, fade) * (0.3 + 0.7 * calm) + surf(p, d, cycle, wave, size);
}

// Foam's marbling: threads along the lines where a swirled noise crosses
// its middle. Unlike the borders of cells these never close into a net:
// they wander, thicken and thin, and end. aa is the blur (in noise units)
// that keeps a thread finer than a pixel from flickering.
float threads(vec2 q, float width, float aa) {
  float f = abs(fbm3(q) - 0.44);
  return 1.0 - smoothstep(width - aa, width + aa, f);
}

vec3 shadeSea(vec3 world, vec3 eye) {
  vec2 p = world.xz;
  vec3 toEye = eye - world;
  float dist = length(toEye);
  vec3 v = toEye / dist;
  float d = coastDistance(p);
  float depth = seaDepth(d);
  // Footprint of a pixel on the water: finer waves than this blur away.
  float fade = dist * uDetail / max(v.y, 0.05);
  float e = max(0.05, fade * 0.5);
  float h = seaHeight(p, d, fade);
  float hx = seaHeight(p + vec2(e, 0.0), coastDistance(p + vec2(e, 0.0)), fade);
  float hz = seaHeight(p + vec2(0.0, e), coastDistance(p + vec2(0.0, e)), fade);
  // Ripples on top, for the sparkle.
  vec2 ripple = vec2(vnoise(p * 0.9 + uTime * vec2(0.6, 0.3)), vnoise(p * 0.9 + vec2(5.2, 1.3) - uTime * vec2(0.3, 0.5))) - 0.5;
  ripple *= 0.14 * smoothstep(30.0, 3.0, fade);
  vec3 n = normalize(vec3(-(hx - h) / e + ripple.x, 1.0, -(hz - h) / e + ripple.y));

  float cycle;
  float wave;
  float waveSize;
  float surfHeight = surf(p, d, cycle, wave, waveSize);
  float broken = brokenAt(p, d, wave);
  float surfZone = smoothstep(330.0, 170.0, d);
  float inner = smoothstep(90.0, 30.0, d);
  float crest = clamp((longSwell(p, fade) - LONG_MEAN) / LONG_RANGE, -1.0, 1.0) * smoothstep(fade * 2.0, fade * 5.0, 110.0);
  vec2 across = vec2(SWELL_DIR.y, -SWELL_DIR.x);

  // How much foam there is. A broken crest has a thick ragged lip and the
  // bore rushing behind it; foam trails off behind that and lingers between
  // the waves in scattered patches and streaks along the crests.
  float along = alongShore(p);
  float ragged = vnoise(vec2(along * 0.25, wave * 3.7)) * 0.6 + vnoise(vec2(along * 0.8, wave * 1.9)) * 0.4;
  float thick = 0.55 + 0.45 * vnoise(vec2(along * 0.05, wave * 3.1));
  float lip = smoothstep(0.86 - 0.08 * thick - 0.04 * ragged, 0.93 - 0.05 * thick, cycle) + smoothstep(0.03 + 0.04 * ragged, 0.0, cycle);
  float bore = exp(-cycle / (0.08 + 0.3 * thick * waveSize));
  float swath = smoothstep(0.22, 0.72, vnoise(vec2(along * 0.014 + wave * 4.1, wave * 0.7)) * 0.75 + vnoise(vec2(along * 0.05, wave * 2.3)) * 0.25 + 0.1 * inner);
  float patches = smoothstep(0.3, 0.7, fbm3(p * 0.02 + vec2(0.0, uTime * 0.03)));
  float density = broken * max(lip * (0.3 + 0.7 * swath), bore * (0.35 + 0.65 * swath));
  float scattered = smoothstep(0.55, 0.85, patches);
  float streaks = smoothstep(0.5, 0.8, vnoise(vec2(along * 0.025, d * 0.35 + wave * 2.7)));
  density = max(density, inner * 0.32 * scattered * (0.6 + 0.4 * smoothstep(0.6, 0.0, cycle)));
  density = max(density, smoothstep(280.0, 140.0, d) * 0.24 * scattered * streaks);
  // Unbroken crests spill a little white at the very top.
  density = max(density, (1.0 - broken) * surfZone * smoothstep(0.955, 0.99, cycle) * smoothstep(0.35, 0.8, ragged) * 0.6);
  // Whitecaps on the open sea.
  float capAt = vnoise(vec2(dot(p, across) * 0.02, dot(p, SWELL_DIR) * 0.035 - uTime * 0.08));
  float caps = smoothstep(0.35, 0.7, crest) * (1.0 - surfZone) * smoothstep(0.62, 0.8, capAt) * smoothstep(12.0, 3.0, fade);
  density = max(density, caps * 0.8);
  density = clamp(density * (0.85 + 0.15 * uEnergy), 0.0, 1.0);
  // The bubbles a breaking wave churns into the water spread wider than its
  // foam and outlast it.
  float churned = clamp(broken * exp(-cycle / (0.2 + 0.45 * waveSize)) * (0.35 + 0.65 * swath) * 0.8 + density * 0.5, 0.0, 1.0);

  // Light through the water. Clear water over sand: the bottom shows
  // through the shallows, its sand paled and greened by the water over it
  // (red light is lost first, then green; blue goes farthest), so the bay
  // runs from pale sand at the water's edge through emerald and turquoise
  // to the deep blue of open water.
  vec3 water = mix(vec3(0.015, 0.1, 0.3), vec3(0.02, 0.34, 0.42), exp(-depth / 7.0));
  vec3 body = water;
  if (depth < 14.0) {
    // The bottom, seen through the waves (bent a little by their slopes):
    // rippled sand, darker in patches where weed grows.
    vec2 floorAt = p + n.xz * depth * 0.6;
    float ripples = 0.5 + 0.5 * sin(dot(floorAt, vec2(0.52, 0.85)) * 2.4 + 2.0 * vnoise(floorAt * 0.3));
    vec3 sand = vec3(0.66, 0.64, 0.5) * (0.9 + 0.12 * ripples) * (0.9 + 0.2 * fbm3(floorAt * 0.05 + 2.0));
    float weed = smoothstep(0.62, 0.74, fbm3(floorAt * 0.03 + 11.0)) * smoothstep(1.5, 4.0, depth);
    sand = mix(sand, vec3(0.2, 0.3, 0.2), weed * 0.7);
    // Sunlight focused by the ripples plays over it, where it is shallow and near enough to see.
    float lively = exp(-depth / 2.5) * smoothstep(1.2, 0.3, fade);
    if (lively > 0.01) {
      vec2 cq = floorAt * 1.1;
      float caustic = pow(1.0 - abs(vnoise(cq + vec2(uTime * 0.4, uTime * 0.1)) - vnoise(cq * 1.37 + vec2(-uTime * 0.3, uTime * 0.25) + 7.0)), 8.0);
      sand *= 1.0 + 0.5 * caustic * lively;
    }
    body = mix(water, sand, exp(-depth * vec3(0.8, 0.22, 0.1)));
  }
  body = mix(body, vec3(0.3, 0.6, 0.64), inner * 0.15);
  // Patches of rougher, darker water where gusts touch down.
  float streak = fbm3(vec2(dot(p, across) * 0.006, dot(p, SWELL_DIR) * 0.012) + vec2(0.0, uTime * 0.02));
  body *= 0.86 + 0.28 * streak;
  // Crests lit through by the sun glow turquoise, in stretches; troughs are deep.
  float backlit = pow(max(dot(-v, uSunDir) * 0.5 + 0.5, 0.0), 2.0);
  float glow = smoothstep(-0.4, 0.9, crest) * (0.45 + 0.55 * vnoise(vec2(dot(p, across) * 0.004, dot(p, SWELL_DIR) * 0.002 + 3.0)));
  body += vec3(0.02, 0.22, 0.2) * glow * (0.35 + 0.65 * backlit);
  body *= 0.8 + 0.2 * smoothstep(-0.9, 0.4, crest);
  // Each wave's face, turned to the shore: glassy, dark down in the trough,
  // turquoise and green higher up where the light shines through.
  float face = smoothstep(0.52, 0.86, cycle) * smoothstep(1.0, 0.965, cycle) * smoothstep(0.1, 0.5, waveSize) * surfZone;
  float faceTop = smoothstep(0.6, 0.9, cycle);
  vec3 faceColour = mix(vec3(0.02, 0.17, 0.3), vec3(0.08, 0.5, 0.5), faceTop);
  faceColour += vec3(0.03, 0.16, 0.1) * faceTop * faceTop * backlit;
  body = mix(body, faceColour, face * 0.85 * smoothstep(14.0, 4.0, fade));
  // Water full of bubbles: pale milky turquoise.
  body = mix(body, vec3(0.34, 0.64, 0.67), churned * 0.6);
  // Under a cloud's shadow less light comes up out of the water, and none glitters.
  float shadow = cloudShadow(world);
  body *= 1.0 - 0.3 * shadow;
  // The waves' relief: faces turned towards the sun are lit and those turned
  // away lie in shade, so every swell and ripple has a light side and a dark
  // one (surf and foam have their own light).
  float towardSun = dot(n, uSunDir) - uSunDir.y;
  body *= 1.0 + 2.6 * clamp(towardSun, -0.25, 0.25) * (1.0 - 0.7 * churned);

  // The sky mirrored in the swell; the ripples no sample resolves tilt it up.
  // Churned water is rough and matte, and gives back less of it.
  vec3 r = reflect(-v, n);
  r.y = abs(r.y) + 0.06 + 0.06 * smoothstep(2.0, 20.0, fade);
  r = normalize(r);
  float fresnel = min(0.5, 0.02 + 0.98 * pow(1.0 - max(dot(n, v), 0.0), 5.0)) * (1.0 - 0.5 * churned);
  // The sky as the water gives it back: a little deeper than it looks overhead.
  vec3 mirrored = mix(skyLight(r, 0.2), vec3(0.5, 0.66, 0.86), 0.25);
  vec3 col = mix(body, mirrored, fresnel);

  // The sun's glitter: facets tilted to send the sun to the eye; a rough
  // surface spreads it into a broad path, broken by the waves.
  vec3 halfway = normalize(v + uSunDir);
  float nh = max(dot(n, halfway), 1e-3);
  float nh2 = nh * nh;
  // Rougher where gusts touch down: the path breaks into patches.
  float roughness = 0.026 + 0.034 * streak + min(0.03, fade * 0.0012);
  float facets = exp((nh2 - 1.0) / (nh2 * roughness)) / (3.1416 * roughness * nh2 * nh2);
  float glitterFresnel = 0.02 + 0.98 * pow(1.0 - max(dot(halfway, v), 0.0), 5.0);
  float glitter = facets * glitterFresnel / (4.0 * max(dot(n, v), 0.08)) * 0.09 * (1.0 - churned);
  // It breaks into dabs: facets catching the sun, about as big on screen
  // near and far, shimmering as the water moves.
  vec2 rel = p - eye.xz;
  vec2 dabAt = vec2(atan(rel.x, -rel.y) * 90.0, 15000.0 / max(length(rel), 1.0) + uTime * 0.8);
  float dab = vnoise(dabAt) * 0.65 + vnoise(dabAt * 2.3 + 5.0) * 0.35;
  glitter *= smoothstep(0.3, 0.72, dab) * 1.7 * (1.0 - shadow);
  col += vec3(1.0, 0.98, 0.9) * (1.0 - exp(-glitter * 1.3)) * 1.1 + vec3(1.0, 0.98, 0.94) * max(glitter - 2.5, 0.0) * 0.04;

  // Sparkle (윤슬). With the sun behind the viewer the sea gives back no mirror
  // image of it, but the little faces of the waves that lean towards it still
  // flash: dashes of light a few pixels across however far off, coming and
  // going as the water moves, strongest where the slope leans most to the sun.
  float sunSlope = dot(n.xz, normalize(uSunDir.xz));
  float catchLight = smoothstep(0.01, 0.07, sunSlope);
  if (catchLight > 0.0) {
    // Cells that stay a constant size on the screen (azimuth across, the
    // inverse of the distance down), in rows each shifted along its own way.
    vec2 sparkAt = vec2(atan(rel.x, -rel.y) * 70.0, 9500.0 / max(length(rel), 1.0));
    float row = floor(sparkAt.y);
    sparkAt.x += hash12(vec2(row, 4.0)) * 11.0 + uTime * 0.12 * (hash12(vec2(row, 9.0)) - 0.5);
    vec2 sparkCell = vec2(floor(sparkAt.x), row);
    float sparkId = hash12(sparkCell + 31.0);
    // Flashes gather in patches, and are dashes of different lengths.
    float cluster = smoothstep(0.3, 0.7, fbm3(sparkAt * vec2(0.07, 0.11) + vec2(uTime * 0.015, 3.0)));
    float reach = 0.4 + 0.6 * hash12(sparkCell + 2.3);
    float inCell = fract(sparkAt.x);
    float alongDash = smoothstep(0.0, 0.1, inCell) * smoothstep(reach, reach - 0.15, inCell);
    float thin = smoothstep(0.5, 0.18, abs(fract(sparkAt.y) - 0.5) * 1.6);
    float blink = 0.5 + 0.5 * sin(uTime * (0.5 + 1.2 * hash12(sparkCell + 5.7)) + 6.2832 * sparkId);
    float spark = step(1.0 - 0.55 * cluster, sparkId) * smoothstep(0.5, 0.85, blink) * alongDash * thin * catchLight * smoothstep(40.0, 4.0, fade);
    col += vec3(1.0, 0.97, 0.86) * spark * 1.9 * (1.0 - shadow);
  }

  // Where the foam lies. It is carried in with the waves and drifts along
  // the shore, stretched along the crests and swirled: sparse, it keeps only
  // scraps of thin threads; denser, the threads widen and close up into
  // sheets of whitewater with ragged, lumpy edges. Far off, where the
  // threads are finer than a pixel, it is seen as a tint.
  float swash = smoothstep(10.0, 1.0, d);
  if (density <= 0.0 && swash <= 0.0) return col;
  vec2 foamAt = vec2(along * 0.07, (d + uTime * 1.2) * 0.17);
  vec2 swirl = vec2(fbm3(foamAt * 0.32 + vec2(0.0, uTime * 0.01)), fbm3(foamAt * 0.32 + vec2(5.2, 1.3))) - 0.44;
  vec2 q = foamAt + swirl * 2.8;
  // How blurred a thread must be here, in noise units per unit of scale.
  float aa = 0.003 + 0.1 * fade;
  float fine = smoothstep(2.5, 1.0, fade);
  float width = 0.012 + 0.1 * density;
  float lace = max(threads(q * 0.8, width, aa * 0.8), threads(q * 2.4 + 7.0, width * 0.7, aa * 2.4) * fine);
  lace *= mix(smoothstep(0.36, 0.6, fbm3(q * 0.45 + 17.0)), 1.0, smoothstep(0.3, 0.55, density));
  float sheet = smoothstep(0.45, 0.72, density + 0.5 * (fbm3(q * 1.9 + 2.0) - 0.44));
  float foam = max(sheet, lace * smoothstep(0.04, 0.3, density));
  foam = mix(foam, density, smoothstep(3.0, 14.0, fade));
  // The lip of a breaking crest is white all along its broken stretch.
  foam = max(foam, broken * smoothstep(0.3, 0.9, lip) * smoothstep(0.0, 0.4, swath));
  // The swash on the sand, and the lip of each whitecap.
  foam = max(foam, swash * (0.55 + 0.45 * threads(q * 2.0 + 3.0, 0.07, aa * 2.0)));
  // The sea washing round the rocks at the headland's foot: a collar of
  // foam that surges and ebbs with the waves, trailing off to leeward.
  if (d < 30.0) {
    float collar = 0.0;
    for (int i = 0; i < ${WATERLINE_ROCKS}; i++) {
      vec3 rock = uRocks[i];
      if (rock.z == 0.0) continue;
      float gap = distance(p, rock.xy) - rock.z;
      float surge = 0.55 + 0.45 * sin(uTime * 1.4 + rock.x * 0.7 + rock.y * 0.3);
      collar = max(collar, smoothstep(1.6 + 1.2 * surge, 0.0, gap) * (0.5 + 0.5 * surge));
    }
    collar *= 0.5 + 0.5 * threads(q * 2.4 + 5.0, 0.09, aa * 2.4);
    foam = max(foam, collar * 0.9);
  }
  foam = max(foam, caps * smoothstep(0.35, 0.65, crest));
  // Lit on top and on the lumps that face the sun; in blue shadow in the
  // hollows, on the curl's face and in the troughs.
  vec2 sunFlat = normalize(uSunDir.xz + vec2(1e-4, 0.0));
  vec2 sunward = vec2((sunFlat.y - 0.55 * sunFlat.x) * 0.07, -sunFlat.x * 0.17) * 1.2;
  vec2 lumpAt = q * vec2(3.2, 4.4) + 1.7;
  float lump = fbm3(lumpAt);
  float relief = (lump - fbm3(lumpAt + sunward * vec2(3.2, 4.4))) * smoothstep(4.0, 1.5, fade);
  float curl = smoothstep(0.86, 0.94, cycle) * smoothstep(1.0, 0.96, cycle) * broken;
  float lit = clamp(0.74 + 0.35 * dot(n, uSunDir) + 0.2 * n.y + 2.2 * relief + 0.2 * (lump - 0.44) - 0.45 * curl, 0.35, 1.25);
  vec3 foamColour = mix(vec3(0.56, 0.68, 0.82), vec3(1.05, 1.04, 1.0), lit) * mix(vec3(1.0), vec3(0.72, 0.78, 0.9), shadow);
  // Thin foam is a film the water shows through.
  foamColour = mix(foamColour, mix(col, vec3(0.92, 0.96, 0.98), 0.55), (1.0 - sheet) * 0.3 * smoothstep(14.0, 3.0, fade));
  // Close to, the foam is froth: fine bubbles, and small holes the water
  // shows through. Its grain is kept a few pixels across, however near.
  float nearness = smoothstep(1.2, 0.3, fade);
  if (nearness > 0.0 && foam > 0.01) {
    float frothScale = min(3.0, 0.33 / max(fade, 0.05));
    vec2 drift = vec2(uTime * 0.3, uTime * 0.2);
    float froth = vnoise(p * frothScale + drift) * 0.6 + vnoise(p * frothScale * 2.1 + 9.0 - drift) * 0.4;
    float holes = smoothstep(0.75, 0.88, vnoise(p * frothScale * 1.3 + 23.0 + drift * 0.7));
    foamColour *= 1.0 + (froth - 0.45) * 0.2 * nearness;
    foam *= 1.0 - 0.55 * holes * (1.0 - sheet) * nearness;
  }
  return mix(col, foamColour, foam);
}
`;

export function createOcean(sunDirection: THREE.Vector3) {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSunDir: { value: sunDirection },
      uTime: { value: 0 },
      uEnergy: { value: 1 },
      uDetail: { value: 0.002 },
      uHaze: { value: 1 },
      uRocks: { value: Array.from({ length: WATERLINE_ROCKS }, () => new THREE.Vector3()) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vWorld;
      uniform float uHaze;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${WORLD_GLSL}
      ${CLOUD_SHADOW_GLSL}
      ${OCEAN_GLSL}
      void main() {
        vec3 col = shadeSea(vWorld, cameraPosition);
        // Distance haze: the water softens into the sky towards the horizon.
        vec3 toEye = cameraPosition - vWorld;
        float dist = length(toEye);
        vec3 dir = -toEye / dist;
        float haze = 1.0 - exp(-dist / 7000.0 * uHaze);
        col = mix(col, mix(skyLight(vec3(dir.x, 0.02, dir.z), 0.3), vec3(0.66, 0.78, 0.9), 0.5), haze);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const geometry = new THREE.PlaneGeometry(60000, 60000, 1, 1);
  geometry.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  /** Tell the sea which rocks stand in it. */
  const setRocks = (rocks: WaterlineRock[]) => {
    const slots = material.uniforms.uRocks.value as THREE.Vector3[];
    slots.forEach((slot, i) => (i < rocks.length ? slot.set(rocks[i].x, rocks[i].z, rocks[i].radius) : slot.set(0, 0, 0)));
  };
  return { mesh, material, setRocks };
}
