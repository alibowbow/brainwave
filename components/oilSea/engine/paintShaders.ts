import { COMPOSITION, HEADER, NOISE } from './glsl';

/** Segments along each stroke; a stroke is a curved strip of 2 × (SEGMENTS + 1) vertices. */
export const STROKE_SEGMENTS = 6;

/*
 * One brush stroke per instance: a curved strip laid along the stroke's
 * path. It picks up colour from the scene where the brush lands and where it
 * lifts off; strokes on the water ride the swell towards the shore, fading
 * out and in again one wave later, and the pine's strokes sway.
 */
export const STROKE_VERTEX = /* glsl */ `${HEADER}
layout(location = 0) in vec4 aCurve; // start, control point
layout(location = 1) in vec4 aEnd; // end, half width, pass
layout(location = 2) in vec4 aSeed; // colour seed, bristle seed, when it is laid down, swell phase (-1: fixed)
uniform sampler2D tColor;
uniform vec2 uResolution;
uniform float uTime;
uniform float uReveal;
uniform int uMotion; // 0 still, 1 riding the swell, 2 swaying with the pine
out vec2 vUv;
out vec3 vColor;
out float vAlpha;
out vec4 vBrush;
${NOISE}
${COMPOSITION}

const int SEGMENTS = ${STROKE_SEGMENTS};

vec2 toDesign(vec2 px) { return vec2(uCrop.x + px.x / uResolution.x * uCrop.y, px.y / uResolution.y); }
vec2 toCanvas(vec2 p) { return vec2((p.x - uCrop.x) / uCrop.y * uResolution.x, p.y * uResolution.y); }
vec2 bezier(vec2 a, vec2 b, vec2 c, float t) { return mix(mix(a, b, t), mix(b, c, t), t); }

void main() {
  float u = float(gl_VertexID / 2) / float(SEGMENTS);
  float side = gl_VertexID % 2 == 0 ? -1.0 : 1.0;
  vec2 p0 = aCurve.xy;
  vec2 p1 = aCurve.zw;
  vec2 p2 = aEnd.xy;
  vec2 anchor = bezier(p0, p1, p2, 0.5);
  float alpha = smoothstep(aSeed.z - 0.012, aSeed.z + 0.012, uReveal);
  vec2 shift = vec2(0.0);
  float grow = 1.0;
  if (uMotion == 1 && aSeed.w >= 0.0) {
    // One wave's journey towards the shore, fading in and out.
    float life = fract(uTime * WAVE_RATE + aSeed.w);
    vec2 a = toDesign(anchor);
    float d = max(uHorizon - a.y, 1e-3);
    vec2 moved = fromSeaPlane(seaPlane(a) + SWELL * WAVELENGTH * (life - 0.5));
    shift = toCanvas(moved) - anchor;
    grow = clamp((uHorizon - moved.y) / d, 0.6, 1.6);
    alpha *= smoothstep(0.0, 0.12, life) * smoothstep(1.0, 0.88, life);
  } else if (uMotion == 2) {
    vec2 q = treeLocal(toDesign(anchor));
    float sway = 0.01 * sin(uTime * 0.8) + 0.005 * sin(uTime * 1.9 + 1.0);
    shift = vec2(sway * max(q.y - 0.25, 0.0) * uTree.z / uCrop.y * uResolution.x, 0.0);
  }
  vec2 c0 = anchor + (p0 - anchor) * grow + shift;
  vec2 c1 = anchor + (p1 - anchor) * grow + shift;
  vec2 c2 = anchor + (p2 - anchor) * grow + shift;
  vec2 tangent = mix(c1 - c0, c2 - c1, u);
  tangent = dot(tangent, tangent) > 1e-6 ? normalize(tangent) : vec2(1.0, 0.0);
  float halfWidth = aEnd.z * grow;
  vec2 pos = bezier(c0, c1, c2, u) + vec2(-tangent.y, tangent.x) * side * halfWidth * 1.2;
  // Colour where the brush lands and where it lifts; the pine keeps its colours as it sways.
  vec2 pick = uMotion == 2 ? shift : vec2(0.0);
  vec3 start = texture(tColor, (bezier(c0, c1, c2, 0.25) - pick) / uResolution).rgb;
  vec3 end = texture(tColor, (bezier(c0, c1, c2, 0.75) - pick) / uResolution).rgb;
  vec3 col = mix(start, end, smoothstep(0.15, 0.85, u));
  // Each stroke's paint is mixed a little differently.
  float j = aSeed.x - 0.5;
  vColor = max(col * (1.0 + j * 0.035) + vec3(j, 0.25 * j, -j) * 0.012, 0.0);
  vUv = vec2(u, side * 1.2);
  vBrush = vec4(aSeed.y, fract(aSeed.y * 7.31 + aSeed.x * 3.7), distance(c0, c1) + distance(c1, c2), 2.0 * halfWidth);
  vAlpha = alpha;
  gl_Position = alpha <= 0.001 ? vec4(2.0, 2.0, 2.0, 1.0) : vec4(pos / uResolution * 2.0 - 1.0, 0.0, 1.0);
}
`;

/** The mark a loaded brush leaves: bristle streaks, ragged sides, a round touch-down and a dry, frayed tail. */
export const STROKE_FRAGMENT = /* glsl */ `${HEADER}
in vec2 vUv;
in vec3 vColor;
in float vAlpha;
in vec4 vBrush;
out vec4 outColor;

float hash11(float p) { p = fract(p * 0.1031); p *= p + 33.33; p *= p + p; return fract(p); }
float noise1(float x) { float i = floor(x); float f = fract(x); return mix(hash11(i), hash11(i + 1.0), f * f * (3.0 - 2.0 * f)); }

void main() {
  float u = vUv.x;
  float v = vUv.y;
  float len = max(vBrush.z, 1.0);
  float width = max(vBrush.w, 1.0);
  float seed = vBrush.x * 173.0;
  float dry = vBrush.y;
  // Faint bristle streaks along the stroke, a few pixels apart.
  float bristles = clamp(width / 5.0, 2.0, 10.0);
  float streak = noise1((v * 0.5 + 0.5) * bristles + seed);
  float wobble = (noise1(u * len / 12.0 + seed * 3.1) - 0.5) * 0.14;
  float edge = mix(1.0, 0.72, smoothstep(0.45, 1.0, u)) + wobble;
  // Soft sides: the paint is feathered into what is already there.
  float body = 1.0 - smoothstep(edge * 0.4, edge, abs(v));
  // A little paint piles up along the bristles; it catches the light from the upper left.
  float run = smoothstep(0.55, 1.0, u) * dry;
  float h = streak * body * (1.0 - 0.6 * run);
  vec2 grad = vec2(dFdx(h), dFdy(h));
  float light = 1.0 + clamp(dot(grad, vec2(-0.55, 0.85)) * 0.6, -0.05, 0.06) + (streak - 0.5) * 0.035;

  float capU = min(0.35, 0.5 * width / len);
  float hu = clamp((capU - u) / max(capU, 1e-3), 0.0, 1.0);
  float head = 1.0 - smoothstep(0.4, 1.0, v * v + hu * hu);
  float tail = 1.0 - smoothstep(0.6 + 0.2 * streak, 1.0, u);
  float gaps = smoothstep(run - 0.15, run + 0.1, streak);
  float alpha = body * head * tail * gaps * vAlpha * 0.92;
  if (alpha < 0.004) discard;
  outColor = vec4(vColor * light * alpha, alpha);
}
`;

/** Copies a layer as it is (premultiplied where blended). */
export const LAYER_FRAGMENT = /* glsl */ `${HEADER}
in vec2 vUv;
out vec4 outColor;
uniform sampler2D tLayer;
void main() { outColor = texture(tLayer, vUv); }
`;

/** Cream paper and the painter's pencil drawing spreading over it, before any paint. */
export const PAPER_FRAGMENT = /* glsl */ `${HEADER}
in vec2 vUv;
out vec4 outColor;
uniform sampler2D tScene;
uniform vec2 uResolution;
uniform vec2 uSceneSize;
uniform float uSketch;
${NOISE}

float luma(vec3 c) { return dot(c, vec3(0.3, 0.55, 0.15)); }

void main() {
  vec2 frag = gl_FragCoord.xy;
  float grain = vnoise(frag * 0.7) * 0.6 + vnoise(frag * 0.23) * 0.4;
  vec3 paper = vec3(0.95, 0.93, 0.88) * (0.965 + 0.05 * grain);
  if (uSketch <= 0.0) {
    outColor = vec4(paper, 1.0);
    return;
  }
  // A line on the darker side of each edge, light hatching in the shadows.
  vec2 t = 1.6 / uSceneSize;
  float l = luma(texture(tScene, vUv).rgb);
  float around = 0.0;
  for (int i = 0; i < 8; i++) {
    float a = float(i) * 0.7853982;
    around += luma(texture(tScene, vUv + vec2(cos(a), sin(a)) * t).rgb);
  }
  float line = smoothstep(0.018, 0.07, around / 8.0 - l);
  float hatch = smoothstep(0.46, 0.22, l) * smoothstep(0.55, 0.85, 0.5 + 0.5 * sin(frag.x * 0.8 + frag.y * 0.55));
  float graphite = clamp(line + hatch * 0.35, 0.0, 1.0) * (0.75 + 0.25 * grain);
  // The drawing spreads in patches.
  float field = fbm3(vUv * vec2(3.0 * uResolution.x / uResolution.y, 3.0) + 1.7);
  float shown = smoothstep(field - 0.05, field + 0.02, uSketch * 1.15 - 0.1);
  outColor = vec4(mix(paper, vec3(0.27, 0.26, 0.25), graphite * 0.8 * shown), 1.0);
}
`;

/** The finished canvas: its weave under the paint, warm varnish, a soft vignette and the sun glowing through. */
export const FINAL_FRAGMENT = /* glsl */ `${HEADER}
in vec2 vUv;
out vec4 outColor;
uniform sampler2D tPaint;
uniform vec2 uResolution;
uniform vec2 uCrop;
uniform vec2 uSun;
uniform float uGlow;
uniform float uUnit;
${NOISE}

float canvasWeave(vec2 px) {
  vec2 g = px / max(1.6, uUnit * 0.22);
  float warp = 0.5 + 0.5 * sin(g.x * 3.1416) * sign(sin(g.y * 1.5708));
  float weft = 0.5 + 0.5 * sin(g.y * 3.1416) * sign(sin(g.x * 1.5708 + 1.5708));
  return 0.5 * (warp + weft) * (0.75 + 0.25 * hash12(floor(g)));
}

void main() {
  vec3 col = texture(tPaint, vUv).rgb;
  // A touch more body in the colour, as oil and varnish give it.
  float grey = dot(col, vec3(0.3, 0.55, 0.15));
  col = mix(vec3(grey), col, 1.1);
  col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
  col *= 0.988 + 0.02 * canvasWeave(gl_FragCoord.xy);
  col *= vec3(1.02, 0.995, 0.96);
  vec2 v = vUv - 0.5;
  vec2 sunUv = vec2((uSun.x - uCrop.x) / uCrop.y, uSun.y);
  float sunR = length((vUv - sunUv) * vec2(uResolution.x / uResolution.y, 1.0));
  float glow = exp(-sunR * 7.0);
  col *= 1.0 - 0.22 * dot(v * vec2(1.0, 1.2), v * vec2(1.0, 1.2)) * (1.0 - glow);
  col += (vec3(0.2, 0.13, 0.04) * glow + vec3(0.22, 0.2, 0.14) * exp(-sunR * 45.0)) * uGlow;
  outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;
