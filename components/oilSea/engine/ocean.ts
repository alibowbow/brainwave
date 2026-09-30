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
 *  - colour through the water (deep blue to turquoise over sand), the
 *    sky mirrored with Fresnel, and the sun's glitter from a rough surface
 *    (when the sun is before the viewer): wide and soft far out, broken
 *    into sparks near by.
 */
export const OCEAN_GLSL = /* glsl */ `
uniform float uEnergy;
uniform float uDetail;

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

// Distance to the nearest border between cells (0 on the threads of the foam's lace).
float laceBorder(vec2 p) {
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
  return d2 - d1;
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
  float crest = clamp((longSwell(p, fade) - LONG_MEAN) / LONG_RANGE, -1.0, 1.0) * smoothstep(fade * 2.0, fade * 5.0, 110.0);

  // Light through the water: deep blue-teal, turquoise over the sand, milky in the churned surf.
  vec3 body = mix(vec3(0.02, 0.16, 0.33), vec3(0.03, 0.27, 0.43), exp(-depth / 14.0));
  body = mix(body, vec3(0.07, 0.5, 0.52), exp(-depth / 3.0));
  body = mix(body, vec3(0.46, 0.6, 0.52), exp(-depth / 0.7) * 0.5);
  body = mix(body, vec3(0.3, 0.6, 0.64), inner * 0.35);
  // Patches of rougher, darker water where gusts touch down.
  vec2 across = vec2(SWELL_DIR.y, -SWELL_DIR.x);
  float streak = fbm3(vec2(dot(p, across) * 0.006, dot(p, SWELL_DIR) * 0.012) + vec2(0.0, uTime * 0.02));
  body *= 0.86 + 0.28 * streak;
  // Crests lit through by the sun glow turquoise; troughs are deep.
  float backlit = pow(max(dot(-v, uSunDir) * 0.5 + 0.5, 0.0), 2.0);
  body += vec3(0.02, 0.26, 0.24) * smoothstep(-0.25, 0.9, crest) * (0.35 + 0.65 * backlit);
  body *= 0.8 + 0.2 * smoothstep(-0.9, 0.4, crest);
  // Each wave's face, turned to the shore: glassy, dark down in the trough,
  // turquoise and green higher up where the light shines through.
  float face = smoothstep(0.52, 0.86, cycle) * smoothstep(1.0, 0.965, cycle) * smoothstep(0.1, 0.5, waveSize) * surfZone;
  float faceTop = smoothstep(0.6, 0.9, cycle);
  vec3 faceColour = mix(vec3(0.02, 0.17, 0.3), vec3(0.08, 0.5, 0.5), faceTop);
  faceColour += vec3(0.03, 0.16, 0.1) * faceTop * faceTop * backlit;
  body = mix(body, faceColour, face * 0.85 * smoothstep(14.0, 4.0, fade));

  // The sky mirrored in the swell; the ripples no sample resolves tilt it up.
  vec3 r = reflect(-v, n);
  r.y = abs(r.y) + 0.06 + 0.06 * smoothstep(2.0, 20.0, fade);
  r = normalize(r);
  float fresnel = min(0.5, 0.02 + 0.98 * pow(1.0 - max(dot(n, v), 0.0), 5.0));
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
  float glitter = facets * glitterFresnel / (4.0 * max(dot(n, v), 0.08)) * 0.09;
  // It breaks into dabs: facets catching the sun, about as big on screen
  // near and far, shimmering as the water moves.
  vec2 rel = p - eye.xz;
  vec2 dabAt = vec2(atan(rel.x, -rel.y) * 90.0, 15000.0 / max(length(rel), 1.0) + uTime * 0.8);
  float dab = vnoise(dabAt) * 0.65 + vnoise(dabAt * 2.3 + 5.0) * 0.35;
  glitter *= smoothstep(0.3, 0.72, dab) * 1.7;
  col += vec3(1.0, 0.98, 0.9) * (1.0 - exp(-glitter * 1.3)) * 1.1 + vec3(1.0, 0.98, 0.94) * max(glitter - 2.5, 0.0) * 0.04;

  // Foam. Its lace is a net of threads between cells, stretched along the
  // crests and carried in with them: where foam is dense the threads merge
  // into solid white, where it thins only fine threads are left. A broken
  // crest has a thick ragged lip and the bore rushing behind it, trailing
  // lace; old foam lies in threads between the waves; the swash on the sand.
  float along = alongShore(p);
  vec2 laceAt = vec2(along * 0.085, (d + uTime * 1.2) * 0.2);
  vec2 warp = vec2(fbm3(laceAt * 0.35), fbm3(laceAt * 0.35 + 4.0)) - 0.5;
  float border = min(laceBorder(laceAt + warp * 2.2), laceBorder(laceAt * 2.3 + warp * 3.0 + 7.0) * 1.25);
  // Threads thicken and thin along their length, and break.
  float threadWidth = 0.25 + 1.3 * fbm3(laceAt * 2.6 + 11.0);
  float ragged = vnoise(vec2(along * 0.25, wave * 3.7)) * 0.6 + vnoise(vec2(along * 0.8, wave * 1.9)) * 0.4;
  float thick = 0.55 + 0.45 * vnoise(vec2(along * 0.05, wave * 3.1));
  float lip = smoothstep(0.86 - 0.08 * thick - 0.04 * ragged, 0.93 - 0.05 * thick, cycle) + smoothstep(0.03 + 0.04 * ragged, 0.0, cycle);
  float bore = exp(-cycle / (0.08 + 0.3 * thick * waveSize));
  float swath = smoothstep(0.22, 0.72, vnoise(vec2(along * 0.014 + wave * 4.1, wave * 0.7)) * 0.75 + vnoise(vec2(along * 0.05, wave * 2.3)) * 0.25 + 0.1 * inner);
  float patches = smoothstep(0.3, 0.7, fbm3(p * 0.02 + vec2(0.0, uTime * 0.03)));
  float density = broken * max(lip * (0.3 + 0.7 * swath), bore * (0.35 + 0.65 * swath));
  // Churned water close in, and old foam lying in threads between the waves.
  density = max(density, inner * (0.04 + 0.2 * patches) * (0.6 + 0.4 * smoothstep(0.6, 0.0, cycle)));
  density = max(density, smoothstep(280.0, 140.0, d) * (0.03 + 0.09 * patches));
  // Unbroken crests spill a little white at the very top.
  density = max(density, (1.0 - broken) * surfZone * smoothstep(0.955, 0.99, cycle) * smoothstep(0.35, 0.8, ragged) * 0.6);
  // Whitecaps on the open sea.
  float capAt = vnoise(vec2(dot(p, across) * 0.02, dot(p, SWELL_DIR) * 0.035 - uTime * 0.08));
  float caps = smoothstep(0.35, 0.7, crest) * (1.0 - surfZone) * smoothstep(0.62, 0.8, capAt) * smoothstep(12.0, 3.0, fade);
  density = max(density, caps * 0.8);
  density = clamp(density * (0.85 + 0.15 * uEnergy), 0.0, 1.0);
  // Threads widen with the density until they close up; far off, where the
  // lace is finer than a pixel, it is seen as a tint.
  float width = density * 0.62 * mix(threadWidth, 1.0, smoothstep(0.5, 0.9, density));
  float laceFoam = 1.0 - smoothstep(width, width + 0.06 + 0.1 * smoothstep(2.0, 10.0, fade), border);
  float foam = mix(laceFoam * min(1.0, density * 4.0), density, smoothstep(3.0, 14.0, fade));
  foam = max(foam, broken * smoothstep(0.3, 0.9, lip) * smoothstep(0.0, 0.4, swath));
  // The swash on the sand, and the lip of each whitecap.
  foam = max(foam, smoothstep(10.0, 1.0, d) * (0.7 + 0.3 * (1.0 - smoothstep(0.1, 0.3, border))));
  foam = max(foam, caps * smoothstep(0.35, 0.65, crest));
  float clots = fbm3(laceAt * 1.3 + 2.0);
  // Lit on top, in blue shadow on the curl's face and in the troughs.
  float curl = smoothstep(0.86, 0.94, cycle) * smoothstep(1.0, 0.96, cycle) * broken;
  float lit = clamp(0.7 + 0.35 * dot(n, uSunDir) + 0.2 * n.y - 0.45 * curl, 0.0, 1.2);
  vec3 foamColour = mix(vec3(0.6, 0.7, 0.84), vec3(1.04, 1.03, 1.0), lit) * (0.92 + 0.16 * clots);
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
        col = mix(col, mix(skyLight(vec3(dir.x, 0.02, dir.z), 0.3), vec3(0.66, 0.78, 0.9), 0.5), haze);
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
