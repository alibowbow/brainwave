import * as THREE from 'three';

const VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/** From the rendered light to the colours of the painting: a soft shoulder for the sun and foam. */
const GRADE_FRAGMENT = /* glsl */ `
varying vec2 vUv;
uniform sampler2D tScene;
// A soft shoulder on the brightest channel, keeping the hue of sunlit colours.
vec3 knee(vec3 c) {
  float peak = max(max(c.r, c.g), c.b);
  if (peak <= 0.8) return c;
  float over = peak - 0.8;
  return c * (0.8 + over / (1.0 + over / 0.2)) / peak;
}
void main() {
  vec3 c = knee(texture2D(tScene, vUv).rgb);
  float grey = dot(c, vec3(0.3, 0.55, 0.15));
  c = mix(vec3(grey), c, 1.02);
  // A gentle S-curve: deeper darks, fuller lights.
  c = mix(c, c * c * (3.0 - 2.0 * c), 0.16);
  gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
}
`;

/*
 * How fine a brush each pixel gets, from how far off what it shows is: a
 * painter works the near grass, rocks and foam with a fine brush and the
 * far hills, sea and sky with a broad one. 1 is the full brush; near things
 * get a fraction of it. Read from the scene's depth buffer.
 */
const SCALE_FRAGMENT = /* glsl */ `
varying vec2 vUv;
uniform sampler2D tDepth;
uniform vec2 uNearFar;
uniform float uFine;
void main() {
  float z = texture2D(tDepth, vUv).r * 2.0 - 1.0;
  float n = uNearFar.x;
  float f = uNearFar.y;
  float dist = 2.0 * n * f / (f + n - z * (f - n));
  // Fine within about 30 m, the full brush beyond about 500 m, eased in between.
  float scale = mix(uFine, 1.0, smoothstep(3.4, 6.2, log(max(dist, 1.0))));
  gl_FragColor = vec4(scale, scale, scale, 1.0);
}
`;

/** Which way forms run at each pixel: the structure tensor of the image. */
const TENSOR_FRAGMENT = /* glsl */ `
varying vec2 vUv;
uniform sampler2D tColor;
uniform vec2 uTexel;
vec3 at(float x, float y) { return texture2D(tColor, vUv + vec2(x, y) * uTexel).rgb; }
void main() {
  vec3 sx = (-at(-1.0, -1.0) - 2.0 * at(-1.0, 0.0) - at(-1.0, 1.0) + at(1.0, -1.0) + 2.0 * at(1.0, 0.0) + at(1.0, 1.0)) * 0.25;
  vec3 sy = (-at(-1.0, -1.0) - 2.0 * at(0.0, -1.0) - at(1.0, -1.0) + at(-1.0, 1.0) + 2.0 * at(0.0, 1.0) + at(1.0, 1.0)) * 0.25;
  gl_FragColor = vec4(dot(sx, sx), dot(sx, sy), dot(sy, sy), 1.0);
}
`;

const BLUR_FRAGMENT = /* glsl */ `
varying vec2 vUv;
uniform sampler2D tInput;
uniform vec2 uStep;
void main() {
  vec4 sum = texture2D(tInput, vUv) * 0.2270;
  sum += (texture2D(tInput, vUv + uStep * 1.3846) + texture2D(tInput, vUv - uStep * 1.3846)) * 0.3162;
  sum += (texture2D(tInput, vUv + uStep * 3.2308) + texture2D(tInput, vUv - uStep * 3.2308)) * 0.0703;
  gl_FragColor = sum;
}
`;

/*
 * Anisotropic Kuwahara filtering (Kyprianidis et al.), with polynomial
 * sector weights: around each pixel, an ellipse stretched along the local
 * form is split into eight sectors; the result leans towards the sectors
 * whose colours agree. Flat areas become smooth dabs, edges stay crisp, and
 * everything takes on the direction of the brush.
 */
const KUWAHARA_FRAGMENT = /* glsl */ `
varying vec2 vUv;
uniform sampler2D tColor;
uniform sampler2D tTensor;
uniform sampler2D tScale;
uniform vec2 uTexel;
uniform float uRadius;
uniform float uHardness;
uniform float uSharpness;
const int MAX_RADIUS = RADIUS_LIMIT;
// Every sample, or every other one on each axis (a quarter of the work).
const int STRIDE = KUWAHARA_STRIDE;

void main() {
  vec3 t = texture2D(tTensor, vUv).xyz;
  float trace = t.x + t.z;
  float root = sqrt(max((t.x - t.z) * (t.x - t.z) + 4.0 * t.y * t.y, 0.0));
  float l1 = 0.5 * (trace + root);
  float l2 = 0.5 * (trace - root);
  vec2 v = vec2(l1 - t.x, -t.y);
  vec2 dir = dot(v, v) > 1e-12 ? normalize(v) : vec2(0.0, 1.0);
  float phi = -atan(dir.y, dir.x);
  float anisotropy = l1 + l2 > 1e-8 ? (l1 - l2) / (l1 + l2) : 0.0;
  // A finer brush for near things; its samples close up with it, so the
  // work stays the same whatever the brush.
  float scale = texture2D(tScale, vUv).r;
  float radius = uRadius * scale;
  float spacing = max(1.0, float(STRIDE) * scale);
  float a = radius * clamp(1.0 + anisotropy, 0.1, 1.6);
  float b = radius * clamp(1.0 / (1.0 + anisotropy), 0.4, 1.6);
  float cp = cos(phi);
  float sp = sin(phi);
  mat2 SR = mat2(0.5 / a, 0.0, 0.0, 0.5 / b) * mat2(cp, -sp, sp, cp);
  int maxX = int(sqrt(a * a * cp * cp + b * b * sp * sp) / spacing);
  int maxY = int(sqrt(a * a * sp * sp + b * b * cp * cp) / spacing);
  float zeta = 1.0;
  float zeroCross = 0.58;
  float sinZero = sin(zeroCross);
  float eta = (zeta + cos(zeroCross)) / (sinZero * sinZero);

  vec4 m[8];
  vec3 s[8];
  for (int k = 0; k < 8; k++) {
    m[k] = vec4(0.0);
    s[k] = vec3(0.0);
  }
  maxX = min(maxX, MAX_RADIUS / STRIDE);
  maxY = min(maxY, MAX_RADIUS / STRIDE);
  for (int y = -maxY; y <= maxY; y++) {
    for (int x = -maxX; x <= maxX; x++) {
      vec2 offset = vec2(float(x), float(y)) * spacing;
      vec2 p = SR * offset;
      if (dot(p, p) > 0.25) continue;
      vec3 c = texture2D(tColor, vUv + offset * uTexel).rgb;
      float w[8];
      float sum = 0.0;
      float vxx = zeta - eta * p.x * p.x;
      float vyy = zeta - eta * p.y * p.y;
      float z;
      z = max(0.0, p.y + vxx); w[0] = z * z; sum += w[0];
      z = max(0.0, -p.x + vyy); w[2] = z * z; sum += w[2];
      z = max(0.0, -p.y + vxx); w[4] = z * z; sum += w[4];
      z = max(0.0, p.x + vyy); w[6] = z * z; sum += w[6];
      vec2 q = 0.70710678 * vec2(p.x - p.y, p.x + p.y);
      vxx = zeta - eta * q.x * q.x;
      vyy = zeta - eta * q.y * q.y;
      z = max(0.0, q.y + vxx); w[1] = z * z; sum += w[1];
      z = max(0.0, -q.x + vyy); w[3] = z * z; sum += w[3];
      z = max(0.0, -q.y + vxx); w[5] = z * z; sum += w[5];
      z = max(0.0, q.x + vyy); w[7] = z * z; sum += w[7];
      float g = exp(-3.125 * dot(p, p)) / max(sum, 1e-6);
      for (int k = 0; k < 8; k++) {
        float wk = w[k] * g;
        m[k] += vec4(c * wk, wk);
        s[k] += c * c * wk;
      }
    }
  }
  vec4 result = vec4(0.0);
  for (int k = 0; k < 8; k++) {
    if (m[k].w <= 0.0) continue;
    vec3 mean = m[k].rgb / m[k].w;
    vec3 variance = abs(s[k] / m[k].w - mean * mean);
    float sigma2 = variance.r + variance.g + variance.b;
    float w = 1.0 / (1.0 + pow(uHardness * 1000.0 * sigma2, 0.5 * uSharpness));
    result += vec4(mean * w, w);
  }
  gl_FragColor = vec4(result.w > 0.0 ? result.rgb / result.w : texture2D(tColor, vUv).rgb, 1.0);
}
`;

/*
 * Dabs of paint laid over the painting: on a jittered grid, each dab an
 * elongated stroke turned along the local form, carrying the colour found
 * at its centre, shorter where there is detail to keep, stopping at strong
 * edges, a little different in mix from its neighbours and marked by its
 * bristles. The top-most dab over a pixel shows; the painting beneath shows
 * through the gaps and soft ends.
 */
const DAB_FRAGMENT = /* glsl */ `
varying vec2 vUv;
uniform sampler2D tPaint;
uniform sampler2D tTensor;
uniform sampler2D tScale;
uniform vec2 uResolution;
uniform float uCell;
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 hash22(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
// The top-most dab over this pixel from a grid of the given cell size: its colour and cover.
vec4 dabs(vec2 px, vec3 base, float uCell) {
  vec2 cell = floor(px / uCell);
  float best = -1.0;
  vec4 top = vec4(base, 0.0);
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 c = cell + vec2(float(i), float(j)) + uCell;
      vec2 jitter = hash22(c);
      vec2 centre = (c - uCell + 0.1 + 0.8 * jitter) * uCell;
      vec2 at = centre / uResolution;
      // Along the form at the dab's centre (level where there is none).
      vec3 t = texture2D(tTensor, at).xyz;
      float root = sqrt(max((t.x - t.z) * (t.x - t.z) + 4.0 * t.y * t.y, 0.0));
      vec2 v = vec2(0.5 * (t.x + t.z + root) - t.x, -t.y);
      float strength = smoothstep(0.0003, 0.003, t.x + t.z);
      vec2 along = normalize(mix(vec2(1.0, 0.0), dot(v, v) > 1e-12 ? normalize(v) * sign(v.x + 1e-6) : vec2(1.0, 0.0), strength) + vec2(1e-4, 0.0));
      // Where there is no form to follow, the brush wanders a little.
      float wander = (jitter.y - 0.5) * 1.1 * (1.0 - strength);
      along = vec2(along.x * cos(wander) - along.y * sin(wander), along.x * sin(wander) + along.y * cos(wander));
      float detail = smoothstep(0.002, 0.02, t.x + t.z);
      float halfLength = uCell * (1.45 - 0.75 * detail) * (0.8 + 0.4 * jitter.x);
      float halfWidth = uCell * (0.6 - 0.2 * detail);
      vec2 d = px - centre;
      vec2 local = vec2(dot(d, along), dot(d, vec2(-along.y, along.x)));
      float e = length(local / vec2(halfLength, halfWidth));
      float cover = 1.0 - smoothstep(0.75, 1.0, e);
      if (cover <= 0.0) continue;
      vec3 colour = texture2D(tPaint, at).rgb;
      // Paint keeps within the forms: no dab across a strong edge.
      vec3 diff = colour - base;
      cover *= 1.0 - smoothstep(0.008, 0.03, dot(diff, diff));
      float priority = hash12(c + 17.0);
      if (cover > 0.02 && priority > best) {
        best = priority;
        // Each dab a slightly different mix, streaked by its bristles.
        float mixing = (hash12(c + 3.1) - 0.5) * (0.3 + 0.7 * strength);
        colour *= 1.0 + 0.12 * mixing;
        colour = mix(colour, colour * vec3(1.05, 1.0, 0.92), max(mixing, 0.0) * 0.8);
        float bristle = hash12(vec2(floor(local.y * 0.9 + 40.0), c.x * 7.0 + c.y * 57.0));
        colour *= 1.0 - (0.07 - 0.13 * bristle * smoothstep(1.0, 0.3, abs(local.x) / halfLength)) * (0.45 + 0.55 * strength);
        top = vec4(colour, cover);
      }
    }
  }
  return top;
}
void main() {
  vec2 px = vUv * uResolution;
  vec3 base = texture2D(tPaint, vUv).rgb;
  // Near things are worked with smaller dabs, more of them.
  float fine = smoothstep(0.8, 0.5, texture2D(tScale, vUv).r);
  vec4 top = dabs(px, base, uCell);
  vec3 col = mix(base, top.rgb, top.a);
  if (fine > 0.0) {
    vec4 small = dabs(px, base, uCell * 0.55);
    col = mix(col, mix(base, small.rgb, small.a), fine);
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

/*
 * The finished canvas. Brush marks: noise smeared along the direction the
 * forms run (line integral convolution over the structure tensor), which
 * modulates the paint a little and raises it into ridges that catch the
 * light. Then the canvas weave, a warm varnish, a soft vignette and the sun
 * glowing through.
 */
const FINISH_FRAGMENT = /* glsl */ `
varying vec2 vUv;
uniform sampler2D tPaint;
uniform sampler2D tTensor;
uniform sampler2D tScale;
uniform vec2 uResolution;
uniform vec2 uSun;
uniform float uSunVisible;
uniform float uBrush;
const int STROKE_STEPS = STROKE_STEP_COUNT;
// How much of the painting's width the view shows (the rest is painted for the view to slide over).
uniform float uView;
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x), mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x), u.y);
}
float weave(vec2 px) {
  vec2 g = px / max(1.6, min(uResolution.x, uResolution.y) / 420.0);
  float warp = 0.5 + 0.5 * sin(g.x * 3.1416) * sign(sin(g.y * 1.5708));
  float weft = 0.5 + 0.5 * sin(g.y * 3.1416) * sign(sin(g.x * 1.5708 + 1.5708));
  return 0.5 * (warp + weft) * (0.75 + 0.25 * hash12(floor(g)));
}
// Along the forms: the edge tangent of the structure tensor. Where there is
// little form to follow (open sky, calm water) the brush runs level.
vec2 flowAt(vec2 uv) {
  vec3 t = texture2D(tTensor, uv).xyz;
  float root = sqrt(max((t.x - t.z) * (t.x - t.z) + 4.0 * t.y * t.y, 0.0));
  float l1 = 0.5 * (t.x + t.z + root);
  vec2 v = vec2(l1 - t.x, -t.y);
  vec2 along = dot(v, v) > 1e-12 ? normalize(v) : vec2(1.0, 0.0);
  float strength = smoothstep(0.0004, 0.004, t.x + t.z);
  along = along.x < 0.0 ? -along : along;
  return normalize(mix(vec2(1.0, 0.0), along, strength) + vec2(1e-4, 0.0));
}
// The painter's colour. Dull colours are enriched most and strong ones hardly
// at all (so the picture is richer, never garish); light and shade take colours
// of their own, warm cream in the lights and blue-violet in the shade; the
// mid-tones are opened up for a brighter, sunnier picture.
vec3 painterColour(vec3 col) {
  float l = dot(col, vec3(0.299, 0.587, 0.114));
  float chroma = max(col.r, max(col.g, col.b)) - min(col.r, min(col.g, col.b));
  col = mix(vec3(l), col, 1.0 + 0.55 * (1.0 - smoothstep(0.05, 0.7, chroma)));
  float shade = 1.0 - smoothstep(0.06, 0.5, l);
  float light = smoothstep(0.42, 0.9, l);
  col += shade * vec3(0.012, 0.004, 0.06) + light * vec3(0.04, 0.032, -0.016);
  col = pow(max(col, 0.0), vec3(0.9));
  return col;
}
float bristles(vec2 px, float brush) {
  return vnoise(px / (brush * 1.4)) * 0.65 + vnoise(px / (brush * 0.6) + 7.0) * 0.35;
}
// brush is the width of the brush here: near things get a finer one, and shorter marks.
float strokes(vec2 uv, float brush) {
  vec2 px = uv * uResolution;
  vec2 texel = 1.0 / uResolution;
  float sum = bristles(px, brush);
  float weight = 1.0;
  vec2 forward = flowAt(uv);
  vec2 backward = -forward;
  vec2 a = uv;
  vec2 b = uv;
  for (int i = 1; i <= STROKE_STEPS; i++) {
    float w = 1.0 - float(i) / float(STROKE_STEPS + 1);
    vec2 fa = flowAt(a);
    forward = dot(fa, forward) < 0.0 ? -fa : fa;
    a += forward * texel * brush * 0.38;
    vec2 fb = flowAt(b);
    backward = dot(fb, backward) < 0.0 ? -fb : fb;
    b += backward * texel * brush * 0.38;
    sum += (bristles(a * uResolution, brush) + bristles(b * uResolution, brush)) * w;
    weight += 2.0 * w;
  }
  return sum / weight;
}
void main() {
  vec3 col = texture2D(tPaint, vUv).rgb;
  float stroke = 0.5;
  if (uBrush > 0.5 && STROKE_STEPS > 0) {
    stroke = strokes(vUv, uBrush * max(0.55, texture2D(tScale, vUv).r));
    // Ridges of paint lit from the upper left, laid on thinly where the
    // picture is smooth (open sky) and thickly where it has form.
    vec3 t = texture2D(tTensor, vUv).xyz;
    float body = 0.35 + 0.65 * smoothstep(0.0003, 0.003, t.x + t.z);
    vec2 slope = vec2(dFdx(stroke), dFdy(stroke));
    col *= 1.0 + ((stroke - 0.5) * 0.16 + dot(slope, vec2(-0.7, 0.7)) * 0.55) * body;
  }
  // Clarity: the fine structure the brush smoothed, given back a little, more where the brush is fine (near things).
  vec2 texel = 1.0 / uResolution;
  float fineness = 1.0 - clamp(texture2D(tScale, vUv).r, 0.0, 1.0) * 0.8;
  vec3 around = (texture2D(tPaint, vUv + vec2(2.0, 0.0) * texel).rgb + texture2D(tPaint, vUv - vec2(2.0, 0.0) * texel).rgb + texture2D(tPaint, vUv + vec2(0.0, 2.0) * texel).rgb + texture2D(tPaint, vUv - vec2(0.0, 2.0) * texel).rgb) * 0.25;
  col += (col - around) * (0.25 + 0.55 * fineness);
  col = painterColour(col);
  float cloth = weave(gl_FragCoord.xy);
  col *= 0.985 + 0.025 * cloth;
  col *= vec3(1.015, 1.0, 0.97);
  // The vignette frames the view.
  vec2 v = (vUv - 0.5) * vec2(1.0 / uView, 1.0);
  float r = length((vUv - uSun) * vec2(uResolution.x / uResolution.y, 1.0));
  float glow = exp(-r * 6.0) * uSunVisible;
  col *= 1.0 - 0.2 * dot(v * vec2(1.0, 1.25), v * vec2(1.0, 1.25)) * (1.0 - glow);
  col += vec3(0.24, 0.16, 0.06) * glow + vec3(0.3, 0.27, 0.18) * exp(-r * 22.0) * uSunVisible;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function pass(fragmentShader: string, uniforms: Record<string, THREE.IUniform>) {
  const material = new THREE.ShaderMaterial({ uniforms, vertexShader: VERTEX, fragmentShader, depthTest: false, depthWrite: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  mesh.frustumCulled = false;
  const scene = new THREE.Scene();
  scene.add(mesh);
  return { material, scene };
}

export interface PaintSettings {
  /** Largest Kuwahara radius, in pixels, the painting will be made with. */
  radius: number;
  /** 1 samples every pixel under the brush, 2 every other one. */
  stride: number;
  /** Samples taken along the flow, each way, for the brush marks. */
  strokeSteps: number;
  /** Lay separate dabs of paint over the painting. */
  dabs: boolean;
}

/** The brush for the nearest things, as a fraction of the full one. */
const FINE_BRUSH = 0.42;

/** Turns the rendered frame into the painting. */
export class OilPaintPost {
  private readonly camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private readonly grade = pass(GRADE_FRAGMENT, { tScene: { value: null } });
  private readonly brushScale = pass(SCALE_FRAGMENT, { tDepth: { value: null }, uNearFar: { value: new THREE.Vector2(1, 1000) }, uFine: { value: FINE_BRUSH } });
  private readonly tensor = pass(TENSOR_FRAGMENT, { tColor: { value: null }, uTexel: { value: new THREE.Vector2() } });
  private readonly blur = pass(BLUR_FRAGMENT, { tInput: { value: null }, uStep: { value: new THREE.Vector2() } });
  private readonly kuwahara: ReturnType<typeof pass>;
  private readonly dab = pass(DAB_FRAGMENT, {
    tPaint: { value: null },
    tTensor: { value: null },
    tScale: { value: null },
    uResolution: { value: new THREE.Vector2() },
    uCell: { value: 5 },
  });
  private readonly finish: ReturnType<typeof pass>;
  private readonly finishUniforms = {
    tPaint: { value: null },
    tTensor: { value: null },
    tScale: { value: null },
    uBrush: { value: 3 },
    uResolution: { value: new THREE.Vector2() },
    uSun: { value: new THREE.Vector2(0.1, 0.8) },
    uSunVisible: { value: 1 },
    uView: { value: 1 },
  };
  /** The full brush everywhere, for a frame rendered without depth. */
  private readonly fullBrush = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
  private colour: THREE.WebGLRenderTarget | null = null;
  private scale: THREE.WebGLRenderTarget | null = null;
  private tensorA: THREE.WebGLRenderTarget | null = null;
  private tensorB: THREE.WebGLRenderTarget | null = null;
  private painted: THREE.WebGLRenderTarget | null = null;
  private dabbed: THREE.WebGLRenderTarget | null = null;
  private width = 1;
  private height = 1;

  private radius: number;

  constructor(private readonly renderer: THREE.WebGLRenderer, private readonly settings: PaintSettings) {
    this.radius = settings.radius;
    this.fullBrush.needsUpdate = true;
    this.finish = pass(FINISH_FRAGMENT.replace('STROKE_STEP_COUNT', String(settings.strokeSteps)), this.finishUniforms);
    const limit = Math.ceil(settings.radius * 1.6);
    this.kuwahara = pass(KUWAHARA_FRAGMENT.replace('RADIUS_LIMIT', String(limit)).replace('KUWAHARA_STRIDE', String(settings.stride)), {
      tColor: { value: null },
      tTensor: { value: null },
      tScale: { value: null },
      uTexel: { value: new THREE.Vector2() },
      uRadius: { value: settings.radius },
      uHardness: { value: 8 },
      uSharpness: { value: 8 },
    });
  }

  /**
   * Size of the painting, the brush for it (at most the radius it was made
   * for), and how much of its width the view shows.
   */
  setSize(width: number, height: number, radius = this.settings.radius, view = 1) {
    this.finish.material.uniforms.uView.value = view;
    this.width = width;
    this.height = height;
    this.radius = Math.min(this.settings.radius, Math.max(1.5, radius));
    this.kuwahara.material.uniforms.uRadius.value = this.radius;
    for (const target of [this.colour, this.scale, this.tensorA, this.tensorB, this.painted, this.dabbed]) target?.dispose();
    const options = { depthBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter };
    this.colour = new THREE.WebGLRenderTarget(width, height, options);
    this.scale = new THREE.WebGLRenderTarget(width, height, options);
    this.tensorA = new THREE.WebGLRenderTarget(width, height, { ...options, type: THREE.HalfFloatType });
    this.tensorB = new THREE.WebGLRenderTarget(width, height, { ...options, type: THREE.HalfFloatType });
    this.painted = new THREE.WebGLRenderTarget(width, height, options);
    this.dabbed = this.settings.dabs ? new THREE.WebGLRenderTarget(width, height, options) : null;
    (this.dab.material.uniforms.uResolution.value as THREE.Vector2).set(width, height);
    // Dabs a little bigger than the brush that smoothed the paint under them.
    this.dab.material.uniforms.uCell.value = Math.max(4.0, this.radius * 2.3);
    const texel = new THREE.Vector2(1 / width, 1 / height);
    (this.tensor.material.uniforms.uTexel.value as THREE.Vector2).copy(texel);
    (this.kuwahara.material.uniforms.uTexel.value as THREE.Vector2).copy(texel);
    (this.finish.material.uniforms.uResolution.value as THREE.Vector2).set(width, height);
  }


  /** Where the sun is on screen (0..1), for its glow. */
  setSun(x: number, y: number, visible: boolean) {
    (this.finish.material.uniforms.uSun.value as THREE.Vector2).set(x, y);
    this.finish.material.uniforms.uSunVisible.value = visible ? 1 : 0;
  }

  private draw(step: { material: THREE.ShaderMaterial; scene: THREE.Scene }, target: THREE.WebGLRenderTarget | null) {
    this.renderer.setRenderTarget(target);
    this.renderer.render(step.scene, this.camera);
  }

  /**
   * Paint the rendered scene. `depth` is its depth buffer, from a camera
   * with the given near and far planes, for a finer brush on near things
   * (without it the full brush is used throughout). For development,
   * `debug` 1 shows the scene unpainted and 2 the brush each pixel gets.
   */
  render(scene: THREE.Texture, depth: THREE.Texture | null, nearFar: [number, number], debug = 0) {
    if (!this.colour || !this.scale || !this.tensorA || !this.tensorB || !this.painted) return;
    this.grade.material.uniforms.tScene.value = scene;
    this.draw(this.grade, this.colour);
    let scale: THREE.Texture = this.fullBrush;
    if (depth) {
      this.brushScale.material.uniforms.tDepth.value = depth;
      (this.brushScale.material.uniforms.uNearFar.value as THREE.Vector2).set(nearFar[0], nearFar[1]);
      this.draw(this.brushScale, this.scale);
      scale = this.scale.texture;
    }
    this.kuwahara.material.uniforms.tScale.value = scale;
    this.dab.material.uniforms.tScale.value = scale;
    this.finish.material.uniforms.tScale.value = scale;
    this.tensor.material.uniforms.tColor.value = this.colour.texture;
    this.draw(this.tensor, this.tensorA);
    this.blur.material.uniforms.tInput.value = this.tensorA.texture;
    (this.blur.material.uniforms.uStep.value as THREE.Vector2).set(1.4 / this.width, 0);
    this.draw(this.blur, this.tensorB);
    this.blur.material.uniforms.tInput.value = this.tensorB.texture;
    (this.blur.material.uniforms.uStep.value as THREE.Vector2).set(0, 1.4 / this.height);
    this.draw(this.blur, this.tensorA);
    this.finish.material.uniforms.tTensor.value = this.tensorA.texture;
    if (debug) {
      this.finish.material.uniforms.tPaint.value = debug === 2 ? scale : this.colour.texture;
      this.finish.material.uniforms.uBrush.value = 0;
      this.draw(this.finish, null);
      return;
    }
    this.finish.material.uniforms.uBrush.value = Math.max(2.2, this.radius);
    this.kuwahara.material.uniforms.tColor.value = this.colour.texture;
    this.kuwahara.material.uniforms.tTensor.value = this.tensorA.texture;
    this.draw(this.kuwahara, this.painted);
    let paint = this.painted;
    if (this.dabbed) {
      this.dab.material.uniforms.tPaint.value = this.painted.texture;
      this.dab.material.uniforms.tTensor.value = this.tensorA.texture;
      this.draw(this.dab, this.dabbed);
      paint = this.dabbed;
    }
    this.finish.material.uniforms.tPaint.value = paint.texture;
    this.draw(this.finish, null);
  }

  dispose() {
    for (const target of [this.colour, this.scale, this.tensorA, this.tensorB, this.painted, this.dabbed]) target?.dispose();
    for (const step of [this.grade, this.brushScale, this.tensor, this.blur, this.kuwahara, this.dab, this.finish]) step.material.dispose();
    this.fullBrush.dispose();
  }
}
