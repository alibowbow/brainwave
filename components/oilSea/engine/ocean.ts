import * as THREE from 'three';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { WORLD_GLSL } from './world';

/*
 * The sea, shaded per pixel on a flat plane (from the headland, the swell's
 * height hardly shows; its slopes, colour, foam and glitter do):
 *  - open-sea swell: wave trains with sharp crests rolling in from the
 *    west-north-west, now and then a whitecap on a crest;
 *  - the surf: crests that follow the coast, steepen over the shallows and
 *    break in stretches that spread along them, leaving whitewater behind;
 *  - colour through the water (deep teal to turquoise over sand), the
 *    evening sky mirrored with Fresnel, and the sun's glitter from a rough
 *    surface: wide and soft far out, broken into sparks near by.
 */
export const OCEAN_GLSL = /* glsl */ `
uniform float uEnergy;
uniform float uDetail;

const float TAU = 6.2831853;
const vec2 SWELL_DIR = vec2(0.7596, 0.6504);

// Open-sea swell: exponential-sine waves (sharp crests, flat troughs),
// steep and short-crested out where the wind is working on it. Its mean is
// about 0.35 of SWELL_SUM, its crests reach towards SWELL_SUM.
const float SWELL_SUM = 5.0;
const float SWELL_MEAN = 0.35;
float swell(vec2 p, float fade) {
  float h = 0.0;
  float angle = atan(SWELL_DIR.y, SWELL_DIR.x);
  for (int i = 0; i < 9; i++) {
    float fi = float(i);
    float wavelength = 60.0 * pow(0.72, fi);
    // Steepest around 20-30 m: the waves the wind is building.
    float amplitude = 1.1 * pow(0.72, fi) * (1.0 + 0.9 * exp(-(fi - 2.0) * (fi - 2.0) / 3.0));
    float a = angle + (mod(fi, 2.0) * 2.0 - 1.0) * (0.34 + 0.12 * fi);
    vec2 d = vec2(cos(a), sin(a));
    float k = TAU / wavelength;
    float w = sqrt(9.81 * k);
    float visible = smoothstep(fade * 0.9, fade * 2.2, wavelength);
    h += amplitude * visible * exp(1.6 * (sin(dot(d, p) * k - w * uTime + fi * 1.7) - 1.0));
  }
  return h;
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
  spacing += 0.32 * (mix(here, next, smoothstep(0.65, 1.0, fract(section))) - 0.5) * smoothstep(20.0, 120.0, d);
  return spacing + 0.5 * (vnoise(vec2(along * 0.004, 1.3)) - 0.5) + 0.55 * (fbm3(p * 0.007) - 0.5) + 0.3 * (fbm3(p * 0.02 + 3.0) - 0.5) + 0.22 * (vnoise(p * 0.045 + 9.0) - 0.5) + 0.16 * (vnoise(p * 0.11) - 0.5) + uTime / 9.0;
}

// Where along a wave its crest has broken. Stretches break first where the
// water shoals, then spread until the whole crest is white.
float brokenAt(vec2 p, float d, float wave) {
  float along = alongShore(p);
  float breakLine = 160.0 + 70.0 * vnoise(vec2(along * 0.01, 3.1));
  float progress = smoothstep(breakLine + 10.0, breakLine - 100.0, d);
  float stretch = vnoise(vec2(along * 0.032 + wave * 7.1, wave * 2.3)) * 0.7 + vnoise(vec2(along * 0.12 + wave * 3.3, wave * 5.7)) * 0.3;
  float threshold = 0.62 - 0.42 * progress - 0.2 * smoothstep(70.0, 25.0, d);
  // Smaller waves in a set only break close in.
  float small = step(hash12(vec2(wave, 11.0)), 0.3) * smoothstep(40.0, 90.0, d);
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
  float setSize = 0.35 + 0.65 * vnoise(vec2(along * 0.012, wave * 1.7));
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

// Foam lace: 1 on the threads between cells, 0 in the holes.
float lace(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float d1 = 8.0;
  float d2 = 8.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      float dist = length(g + hash22(i + g) - f);
      if (dist < d1) { d2 = d1; d1 = dist; } else if (dist < d2) { d2 = dist; }
    }
  }
  return 1.0 - smoothstep(0.03, 0.22, d2 - d1);
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
  float swellH = swell(p, fade);
  float crest = clamp((swellH - SWELL_MEAN * SWELL_SUM) / (0.4 * SWELL_SUM), -1.0, 1.0);

  // Light through the water: deep blue-teal, turquoise over the sand, milky in the churned surf.
  vec3 body = mix(vec3(0.03, 0.28, 0.38), vec3(0.05, 0.36, 0.43), exp(-depth / 14.0));
  body = mix(body, vec3(0.13, 0.43, 0.48), exp(-depth / 3.0));
  body = mix(body, vec3(0.42, 0.5, 0.44), exp(-depth / 0.7) * 0.5);
  body = mix(body, vec3(0.28, 0.5, 0.56), inner * 0.35);
  // Patches of rougher, darker water where gusts touch down.
  vec2 across = vec2(SWELL_DIR.y, -SWELL_DIR.x);
  float streak = fbm3(vec2(dot(p, across) * 0.006, dot(p, SWELL_DIR) * 0.012) + vec2(0.0, uTime * 0.02));
  body *= 0.86 + 0.28 * streak;
  // Crests lit through by the low sun behind them glow turquoise; troughs are deep.
  float backlit = pow(max(dot(-v, uSunDir) * 0.5 + 0.5, 0.0), 2.0);
  body += vec3(0.03, 0.26, 0.2) * max(crest, 0.0) * (0.3 + 0.7 * backlit);
  body *= 0.86 + 0.16 * crest;
  // Each wave's face, turned to the shore: glassy, dark down in the trough,
  // turquoise and green higher up where the low sun behind shines through.
  float face = smoothstep(0.52, 0.86, cycle) * smoothstep(1.0, 0.965, cycle) * smoothstep(0.1, 0.5, waveSize) * surfZone;
  float faceTop = smoothstep(0.6, 0.9, cycle);
  vec3 faceColour = mix(vec3(0.03, 0.2, 0.27), vec3(0.1, 0.44, 0.43), faceTop);
  faceColour += vec3(0.04, 0.14, 0.08) * faceTop * faceTop * backlit;
  body = mix(body, faceColour, face * 0.85 * smoothstep(14.0, 4.0, fade));

  // The sky mirrored in the swell; the ripples no sample resolves tilt it up.
  vec3 r = reflect(-v, n);
  r.y = abs(r.y) + 0.06 + 0.06 * smoothstep(2.0, 20.0, fade);
  r = normalize(r);
  float fresnel = min(0.55, 0.02 + 0.98 * pow(1.0 - max(dot(n, v), 0.0), 5.0));
  // The evening sky as the water gives it back: cooler and deeper than it looks overhead.
  vec3 mirrored = mix(skyLight(r, 0.1), vec3(0.44, 0.58, 0.68), 0.65);
  vec3 col = mix(body, mirrored, fresnel);

  // The sun's glitter: facets tilted to send the sun to the eye; a rough
  // surface spreads it into a broad golden path, broken by the waves.
  vec3 halfway = normalize(v + uSunDir);
  float nh = max(dot(n, halfway), 1e-3);
  float nh2 = nh * nh;
  float roughness = 0.022 + min(0.05, fade * 0.002);
  float facets = exp((nh2 - 1.0) / (nh2 * roughness)) / (3.1416 * roughness * nh2 * nh2);
  float glitterFresnel = 0.02 + 0.98 * pow(1.0 - max(dot(halfway, v), 0.0), 5.0);
  float glitter = facets * glitterFresnel / (4.0 * max(dot(n, v), 0.08)) * 0.09;
  col += vec3(1.0, 0.68, 0.3) * (1.0 - exp(-glitter * 1.6)) * 1.05 + vec3(1.0, 0.86, 0.6) * max(glitter - 2.5, 0.0) * 0.05;

  // Foam. Where it is dense it is solid white; as it thins, holes open along
  // its lace. A broken crest has a curling lip and the bore rushing behind
  // it; closer in, the surf is churned white; the swash on the sand.
  float along = alongShore(p);
  vec2 laceAt = p * vec2(0.07, 0.1) + vec2(0.0, uTime * 0.02);
  vec2 warp = vec2(fbm3(laceAt * 0.4), fbm3(laceAt * 0.4 + 4.0)) - 0.5;
  float threads = lace(laceAt + warp * 1.6) * 0.6 + lace(laceAt * 2.4 + warp * 2.5 + 7.0) * 0.4;
  // Streaked along the crests and carried in with them.
  float phase = wave + cycle - step(0.5, cycle);
  vec2 streaks = vec2(along * 0.06, phase * 36.0 * 0.14);
  float clots = fbm3(streaks + warp * 2.0) * 0.6 + fbm3(streaks * 2.3 + 5.0) * 0.4;
  float texture = clamp(0.2 * threads + 1.3 * clots - 0.28, 0.0, 1.0);
  float ragged = vnoise(vec2(along * 0.25, wave * 3.7)) * 0.6 + vnoise(vec2(along * 0.8, wave * 1.9)) * 0.4;
  float thick = 0.55 + 0.45 * vnoise(vec2(along * 0.05, wave * 3.1));
  float lip = smoothstep(0.86 - 0.08 * thick - 0.04 * ragged, 0.93 - 0.05 * thick, cycle) + smoothstep(0.03 + 0.04 * ragged, 0.0, cycle);
  float bore = exp(-cycle / (0.2 + 0.5 * thick * waveSize)) * (0.8 + 0.2 * ragged);
  float patches = smoothstep(0.3, 0.62, fbm3(p * 0.025 + vec2(0.0, uTime * 0.04)));
  float swath = smoothstep(0.22, 0.72, vnoise(vec2(along * 0.014 + wave * 4.1, wave * 0.7)) * 0.75 + vnoise(vec2(along * 0.05, wave * 2.3)) * 0.25 + 0.1 * inner);
  float density = broken * max(lip * (0.25 + 0.75 * swath), bore * swath);
  density = max(density, inner * (0.4 + 0.45 * patches) * (0.6 + 0.4 * smoothstep(0.6, 0.0, cycle)));
  // Old foam from the waves before, lying in lace across the surf.
  density = max(density, smoothstep(260.0, 130.0, d) * (0.26 + 0.34 * patches));
  density = max(density, smoothstep(12.0, 0.0, d));
  // Unbroken crests spill a little white at the very top.
  density = max(density, (1.0 - broken) * surfZone * smoothstep(0.955, 0.99, cycle) * smoothstep(0.35, 0.8, ragged) * 0.6);
  // Old foam drifting in streaks, and whitecaps on the open sea.
  float drift = smoothstep(0.6, 0.8, fbm3(p * vec2(0.05, 0.02) + vec2(0.0, uTime * 0.02))) * smoothstep(340.0, 120.0, d);
  density = max(density, drift * 0.35);
  float capAt = vnoise(vec2(dot(p, across) * 0.032, dot(p, SWELL_DIR) * 0.09 - uTime * 0.15));
  float caps = smoothstep(0.2, 0.55, crest) * (1.0 - surfZone) * smoothstep(0.55, 0.74, capAt) * smoothstep(40.0, 4.0, fade);
  density = max(density, caps);
  density = clamp(density * (0.85 + 0.15 * uEnergy), 0.0, 1.0);
  float foam = smoothstep(1.0 - density - 0.12, 1.0 - density + 0.12, texture) * min(1.0, density * 3.0);
  foam = max(foam, broken * smoothstep(0.3, 0.9, lip) * smoothstep(0.0, 0.4, swath));
  // Whitecaps: a solid roll along the top of the crest, lace spilling behind.
  foam = max(foam, caps * smoothstep(0.35, 0.65, crest));
  // Lit on top, in blue shadow on the curl's face and in the troughs.
  float curl = smoothstep(0.86, 0.94, cycle) * smoothstep(1.0, 0.96, cycle) * broken;
  float lit = clamp(0.7 + 0.35 * dot(n, uSunDir) + 0.2 * n.y - 0.45 * curl, 0.0, 1.2);
  vec3 foamColour = mix(vec3(0.58, 0.64, 0.74), vec3(1.04, 0.98, 0.9), lit) * (0.9 + 0.2 * clots);
  foamColour += vec3(0.2, 0.11, -0.02) * backlit * lit;
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
      ${OCEAN_GLSL}
      void main() {
        vec3 col = shadeSea(vWorld, cameraPosition);
        // Distance haze: the water softens into the sky towards the horizon.
        vec3 toEye = cameraPosition - vWorld;
        float dist = length(toEye);
        vec3 dir = -toEye / dist;
        float haze = 1.0 - exp(-dist / 7000.0 * uHaze);
        col = mix(col, mix(skyLight(vec3(dir.x, 0.02, dir.z), 0.3), vec3(0.62, 0.64, 0.72), 0.5), haze);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const geometry = new THREE.PlaneGeometry(60000, 60000, 1, 1);
  geometry.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  return { mesh, material };
}
