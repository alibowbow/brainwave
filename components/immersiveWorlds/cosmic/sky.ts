import * as THREE from 'three';
import { createNoiseVolume } from '../shared/render/fireFlame';
import { FullscreenPass } from '../shared/render/targets';
import { supportsHdrTargets } from '../shared/render/hdrPipeline';

/**
 * An original, entirely procedural sky in linear HDR radiance.
 *
 * - Nebula: a 40-step emission/absorption march through a domain-warped 3D
 *   noise field (teal and rose gas, star-forming knots, dark dust lanes and a
 *   warm reflection glow toward the star). It is baked once into a half-float
 *   cube map at start-up, so each frame costs one cube fetch; the same march
 *   (with fewer steps) runs live only when float targets are unavailable.
 * - Stars: a dense point field with black-body colour temperatures, a
 *   power-law brightness distribution, dust extinction from the baked nebula
 *   and a handful of bright stars that the bloom pass softens.
 * - The key star itself sits just outside the desktop frame (left); its
 *   corona and reflection glow reach into view.
 * - The gas giant: a baked, domain-warped band albedo with differential zonal
 *   drift, soft terminator, ring shadows, polar aurora and ringshine on the
 *   night side, under an analytic single-scattering atmosphere shell
 *   (Rayleigh-like limb with a forward-scattering lobe).
 * - Rings: a slab single-scattering model (reflection on the lit face,
 *   diffuse forward transmission on the unlit face), gaps and ringlets, and
 *   the planet's shadow in world coordinates.
 */

/**
 * Direction toward the key star, world space. Lighting, rings and dust share it.
 * The star stands on the left, behind the seat's shoulder: the garden is
 * lit from the left three-quarters (forms read on both sides of the frame,
 * shadows fall across the terrace toward the right), the gas giant shows
 * a gibbous day side, and the star sits on the far side of the ring plane, so
 * the ring's shadow lies across the visible globe and the globe's shadow cuts
 * across the rings beside it.
 */
export const COSMIC_SUN_DIRECTION = new THREE.Vector3(-.80, .45, .40).normalize();
/** Linear radiance scale of direct starlight (matches the key light intensity). */
export const COSMIC_SUN_IRRADIANCE = 3.4;
export const COSMIC_SUN_COLOR = new THREE.Color(1.0, .93, .84);
export const COSMIC_PLANET_CENTER = new THREE.Vector3(19, 24, -78);
export const COSMIC_PLANET_RADIUS = 16.8;
/** Soft umbra edges of the planet's cylindrical shadow on the rings (world units). */
export const COSMIC_RING_SHADOW_EDGES = [15.5, 17.3] as const;
const RING_INNER = 20.3;
const RING_OUTER = 30.6;
const RING_ROTATION = new THREE.Euler(1.46, .16, 0);

const v3 = (v: THREE.Vector3) => `vec3(${v.x.toFixed(5)}, ${v.y.toFixed(5)}, ${v.z.toFixed(5)})`;
const SUN = v3(COSMIC_SUN_DIRECTION);
const SUN_RADIANCE = v3(new THREE.Vector3(COSMIC_SUN_COLOR.r, COSMIC_SUN_COLOR.g, COSMIC_SUN_COLOR.b).multiplyScalar(COSMIC_SUN_IRRADIANCE));

const NOISE = /* glsl */ `
precision highp sampler3D;
uniform sampler3D uNoise;
// Tileable noise volume: RGBA are independent octaves (periods 4, 8, 16, 4).
float nz(vec3 p) { return dot(texture(uNoise, p), vec4(.5, .27, .15, .08)); }
float nz2(vec3 p) { return nz(p) * .62 + nz(p * 2.71 + .37) * .38; }
`;

// Ring optical depth as a function of radius; shared by the ring and the
// planet's ring shadow so the two always agree.
const RING_PROFILE = /* glsl */ `
float ringHash(float x) { return fract(sin(x * 127.1) * 43758.5453); }
float ringNoise(float x) { float i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f); return mix(ringHash(i), ringHash(i + 1.0), f); }
// A narrow empty gap centred at c, w wide (normalised radius). Gaps thinner
// than a pixel fade to a partial darkening instead of shimmering.
float ringGap(float x, float c, float w, float px) {
  float cover = 1.0 - smoothstep(w * .5, w * .5 + max(px, w * .3), abs(x - c));
  return 1.0 - cover * clamp(w / max(px, 1e-5), 0.0, 1.0) * .96;
}
float ringTau(float r, float pixel) {
  float x = (r - ${RING_INNER.toFixed(2)}) / ${(RING_OUTER - RING_INNER).toFixed(2)};
  if (x < 0.0 || x > 1.0) return 0.0;
  float px = pixel / ${(RING_OUTER - RING_INNER).toFixed(2)};
  float c = 0.07 + 0.05 * smoothstep(0.05, 0.2, x);
  float b = smoothstep(0.20, 0.25, x) * (1.0 - smoothstep(0.575, 0.592, x)) * (1.05 + 0.7 * smoothstep(0.3, 0.52, x));
  float a = smoothstep(0.655, 0.675, x) * (1.0 - smoothstep(0.955, 0.985, x)) * 0.55;
  float encke = 1.0 - 0.9 * (1.0 - smoothstep(0.003, 0.008, abs(x - 0.905))) * (1.0 - smoothstep(0.03, 0.08, pixel));
  float tau = max(max(c * (1.0 - smoothstep(0.2, 0.25, x)), b), a * encke);
  tau += 0.02 * smoothstep(0.59, 0.6, x) * (1.0 - smoothstep(0.645, 0.655, x));
  // Ringlets at three scales, faded once they become subpixel (no moire).
  float fade1 = 1.0 - smoothstep(0.08, 0.25, pixel);
  float fade2 = 1.0 - smoothstep(0.03, 0.09, pixel);
  float fade3 = 1.0 - smoothstep(0.01, 0.03, pixel);
  float detail = 1.0 + 0.55 * (ringNoise(r * 1.7) - 0.5) * 2.0
                     + 0.45 * fade1 * (ringNoise(r * 6.3 + 3.0) - 0.5) * 2.0
                     + 0.35 * fade2 * (ringNoise(r * 23.0 + 7.0) - 0.5) * 2.0
                     + 0.25 * fade3 * (ringNoise(r * 71.0 + 1.0) - 0.5) * 2.0;
  // Fine gaps cleared by embedded moonlets and resonances: Maxwell and Bond in
  // the faint inner ring, a pair of dark lanes in the bright ring, Huygens at
  // the inner edge of the wide division, Encke and Keeler in the outer ring.
  float gaps = ringGap(x, .085, .006, px) * ringGap(x, .142, .004, px)
             * ringGap(x, .318, .003, px) * ringGap(x, .447, .0025, px)
             * ringGap(x, .598, .008, px) * ringGap(x, .628, .003, px)
             * ringGap(x, .742, .002, px) * ringGap(x, .812, .0025, px) * ringGap(x, .968, .004, px);
  // Spiral density waves: tightly wound ripples in the outer ring.
  float waves = 1.0 + .22 * smoothstep(.70, .76, x) * (1.0 - smoothstep(.86, .9, x)) * sin(r * 160.0) * fade3;
  return 0.55 * tau * max(detail, 0.05) * gaps * waves * (smoothstep(0.0, 0.02, x) * (1.0 - smoothstep(0.985, 1.0, x)));
}
`;

const DIRECTION_VERTEX = /* glsl */ `
varying vec3 vDirection;
void main() {
  vDirection = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// The march itself. Direction d is in sky-local space; star is uStar.
const NEBULA_MARCH = /* glsl */ `
uniform vec3 uStar;
vec4 nebulaMarch(vec3 d) {
  // A broad, warped river of gas tilted across the forward sky.
  vec3 band = normalize(vec3(.431, -.843, -.323));
  vec3 radiance = vec3(0.0);
  float transmittance = 1.0;
  float starAngle = acos(clamp(dot(d, uStar), -1.0, 1.0));
  float starGlow = exp(-starAngle * starAngle / .16) + .12 * exp(-starAngle * starAngle / 1.0);
  const vec3 knotA = vec3(-.489, .208, -.847);
  const vec3 knotB = vec3(-.123, .470, -.874);
  const vec3 knotC = vec3(.437, .070, -.897);
  float kA = exp(-pow(acos(clamp(dot(d, knotA), -1.0, 1.0)) / .07, 2.0));
  float kB = exp(-pow(acos(clamp(dot(d, knotB), -1.0, 1.0)) / .06, 2.0));
  float kC = exp(-pow(acos(clamp(dot(d, knotC), -1.0, 1.0)) / .08, 2.0));
  float knots = kA * .3 + kB * .8 + kC * .7;
  float dt = .72 / float(NEB_STEPS);
  float ridge = 0.0;
  for (int i = 0; i < NEB_STEPS; i++) {
    float t = .30 + (float(i) + .5) * dt;
    vec3 p = d * t;
    vec3 q = p * 1.45 + vec3(.21, .53, .77);
    vec4 warpTap = texture(uNoise, q * .55 + vec3(.13, .41, .07));
    vec3 w = warpTap.rag - .5;
    vec3 r = q + w * 1.25;
    float h = dot(p, band) + w.y * .34 + (warpTap.b - .5) * .25;
    float sheet = exp(-h * h / .030) + .30 * exp(-h * h / .16);
    float cloud = nz2(r * 1.3);
    vec4 fine = texture(uNoise, r * 2.6 + vec3(.71, .19, .52));
    float gas = sheet * smoothstep(.44, .64, cloud + (fine.g - .5) * .26);
    // Ridged filaments carve dust lanes and their bright rims.
    ridge = 1.0 - abs(fine.r - .5) * 2.0;
    float lane = sheet * smoothstep(.66, .92, ridge) * smoothstep(.42, .58, cloud);
    float globule = sheet * smoothstep(.60, .70, nz(r * .9 + 5.3)) * .8;
    float dust = lane * 1.6 + globule;
    // A nearer, separate layer of cold dark cloud drifts in front of the glowing
    // sheet: sharp-edged, starless, with only a warm silver lining toward the
    // star. It gives the nebula depth instead of one painted layer.
    float nearLayer = 1.0 - smoothstep(.44, .56, t);
    float fh = dot(p, band) + .05 + w.x * .30;
    float fgSheet = exp(-fh * fh / .018);
    float fgCloud = smoothstep(.54, .66, nz2(r * 1.7 + 7.7) + (fine.r - .5) * .30);
    float fgDust = nearLayer * fgSheet * fgCloud * 2.2;
    dust += fgDust;
    float hue = smoothstep(.36, .66, nz(r * .62 + 11.0));
    vec3 teal = vec3(.050, .245, .300);
    vec3 rose = vec3(.380, .085, .135);
    vec3 violet = vec3(.120, .085, .260);
    vec3 gasColor = mix(mix(teal, violet, smoothstep(.2, .55, hue)), rose, smoothstep(.55, .9, hue));
    float depthBand = exp(-pow((t - .68) / .12, 2.0));
    vec3 emission = gasColor * gas * 2.4;
    // Star-forming regions: hot gas brightens where the cloud is densest,
    // following its filaments rather than forming a smooth blob.
    float clump = smoothstep(.52, .78, cloud + (fine.b - .5) * .3);
    // Ionisation structure around the young clusters: hot teal-white oxygen
    // glow at the heart, a ring of rose hydrogen around it.
    float core = smoothstep(.55, .95, knots);
    emission += mix(vec3(1.0, .42, .52), vec3(.62, .92, .95), core) * knots * depthBand * clump * gas * 24.0;
    emission += vec3(.55, .85, .90) * knots * depthBand * clump * smoothstep(.3, .7, fine.a) * 5.0;
    // Bright ionisation fronts where dust lanes meet glowing gas.
    emission += vec3(1.0, .62, .55) * gas * smoothstep(.45, .7, ridge) * (1.0 - smoothstep(.8, .95, ridge)) * (.1 + 2.5 * knots) * .5;
    // Dust near the star reflects warm starlight; distant dust only blocks.
    emission += vec3(.95, .64, .36) * (dust * .9 + gas * .45 + .008) * starGlow * .55;
    emission += vec3(1.0, .72, .45) * fgDust * smoothstep(.6, .75, fgCloud + fine.g * .2) * starGlow * .25;
    // A faint unresolved stellar glow along the band.
    emission += vec3(.020, .018, .026) * sheet;
    float extinction = dust * 10.0 + gas * .35;
    float stepT = exp(-extinction * dt);
    radiance += transmittance * emission * dt;
    transmittance *= stepT;
  }
  // Deep space floor, slightly bluer overhead.
  radiance += vec3(.0012, .0016, .0032) * (1.0 + .6 * max(d.y, 0.0));
  return vec4(radiance, transmittance);
}
`;

const NEBULA_BAKE_FRAGMENT = /* glsl */ `
#define NEB_STEPS 48
${NOISE}
${NEBULA_MARCH}
varying vec3 vDirection;
void main() {
  gl_FragColor = nebulaMarch(normalize(vDirection));
}
`;

const DOME_FRAGMENT = /* glsl */ `
${NOISE}
#ifdef NEBULA_BAKED
uniform samplerCube uNebula;
#else
#define NEB_STEPS 10
${NEBULA_MARCH}
#endif
uniform vec3 uStarLocal;
uniform float uNebulaGain;
varying vec3 vDirection;
void main() {
  vec3 d = normalize(vDirection);
#ifdef NEBULA_BAKED
  vec4 nebula = texture(uNebula, d);
#else
  vec4 nebula = nebulaMarch(d);
#endif
  // Fine structure layered live over the baked gas, at a scale the cube cannot
  // hold: ridged dust filaments carve dark lanes with bright ionised rims, and
  // thin wisps streak the glow. It only modulates existing gas, so empty
  // space stays empty and the stars between the clouds stay clean.
  // The next two octaves of the gas field, which the cube cannot hold, are
  // added live as gentle clumping. Noise is stretched a little across the band
  // normal, so structure streams with the flow. It only modulates existing
  // gas: empty space stays empty and the stars between clouds stay clean.
  vec3 neb = nebula.rgb;
  vec3 bandN = vec3(.431, -.843, -.323);
  vec3 q = d + bandN * dot(d, bandN) * 1.2;
  float n1 = texture(uNoise, q * 5.2 + .13).r;
  float n2 = texture(uNoise, q * 10.4 + vec3(n1 * .2) + .51).g;
  vec3 color = neb * (.80 + .30 * n1 + .14 * n2) * uNebulaGain;
  // The star: tiny bright disc with limb darkening and a soft corona.
  float c = clamp(dot(d, uStarLocal), -1.0, 1.0);
  float angle = acos(c);
  float pixel = max(length(fwidth(d)), 1e-5);
  float radius = .0105;
  float disc = 1.0 - smoothstep(radius - pixel, radius + pixel, angle);
  float mu = sqrt(max(0.0, 1.0 - pow(angle / radius, 2.0)));
  color += vec3(1.0, .93, .84) * disc * (.45 + .55 * mu) * 90.0;
  color += vec3(1.0, .86, .70) * (exp(-angle / .012) * 3.5 + exp(-angle / .06) * .55 + exp(-angle / .30) * .06);
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const STAR_VERTEX = /* glsl */ `
attribute vec4 aStar;   // brightness, temperature (0 cool .. 1 hot), phase, size
uniform float uTime;
uniform float uPixelRatio;
uniform float uTwinkle;
#ifdef NEBULA_BAKED
uniform samplerCube uNebula;
#endif
varying vec3 vColor;
vec3 blackbody(float t) {
  // 0 ~ 3000 K, .5 ~ 6000 K, 1 ~ 20000 K (normalised luminance).
  vec3 cool = vec3(1.0, .56, .30), sun = vec3(1.0, .92, .82), hot = vec3(.66, .78, 1.0);
  return t < .5 ? mix(cool, sun, t * 2.0) : mix(sun, hot, (t - .5) * 2.0);
}
void main() {
  vec3 dir = normalize(position);
  float extinction = 1.0;
#ifdef NEBULA_BAKED
  extinction = pow(texture(uNebula, dir).a, .8);
#endif
  // Scintillation as in the shared night sky: three incommensurate rates per
  // star, so no two stars and no two moments line up. Brighter stars shimmer
  // most; it is a soft flicker, never a flash.
  float seed = aStar.z * 6.2831853;
  float flicker = .5 * sin(uTime * (1.6 + aStar.z * 2.1) + seed * 9.0)
                + .3 * sin(uTime * (2.9 + aStar.y * 2.3) + seed * 4.0)
                + .2 * sin(uTime * (.7 + aStar.z * 1.1) + seed * 13.0);
  float weight = uTwinkle * smoothstep(.15, 1.6, aStar.x);
  float twinkle = max(.2, 1.0 + weight * flicker);
  vColor = blackbody(aStar.y) * aStar.x * extinction * twinkle;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float swell = 1.0 + uTwinkle * .5 * smoothstep(1.0, 4.0, aStar.x) * clamp(twinkle - 1.0, -1.0, 1.0);
  float size = aStar.w * uPixelRatio * swell;
  gl_PointSize = size;
  // Keep total flux independent of the sprite size.
  vColor *= 2.4 / max(aStar.w * aStar.w, 1.0);
}
`;

const STAR_FRAGMENT = /* glsl */ `
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - .5) * 2.0;
  float profile = exp(-d * d * 4.5) + .06 * exp(-d * d * .9);
  gl_FragColor = vec4(vColor * profile * (1.0 - smoothstep(.85, 1.0, d)), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

// The brightest stars get a soft four-point diffraction cross that breathes
// with their scintillation (an optics cue the eye reads as sparkle).
const SPIKE_VERTEX = /* glsl */ `
attribute vec4 aStar;
uniform float uTime;
uniform float uPixelRatio;
#ifdef NEBULA_BAKED
uniform samplerCube uNebula;
#endif
varying vec3 vColor;
varying float vRotation;
void main() {
  vec3 dir = normalize(position);
  float extinction = 1.0;
#ifdef NEBULA_BAKED
  extinction = pow(texture(uNebula, dir).a, .8);
#endif
  float seed = aStar.z * 6.2831853;
  float flicker = .5 * sin(uTime * (1.6 + aStar.z * 2.1) + seed * 9.0) + .3 * sin(uTime * (2.9 + aStar.y * 2.3) + seed * 4.0);
  vColor = mix(vec3(1.0, .80, .62), vec3(.72, .84, 1.0), aStar.y) * aStar.x * extinction * (.75 + .25 * flicker) * .016;
  vRotation = .26 + aStar.z * .08;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (20.0 + aStar.x * 2.2) * uPixelRatio * (.92 + .08 * flicker);
}
`;

const SPIKE_FRAGMENT = /* glsl */ `
varying vec3 vColor;
varying float vRotation;
void main() {
  vec2 p = (gl_PointCoord - .5) * 2.0;
  float c = cos(vRotation), s = sin(vRotation);
  p = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  float r = length(p);
  float spikes = exp(-abs(p.y) * 70.0) * exp(-abs(p.x) * 3.2) + exp(-abs(p.x) * 70.0) * exp(-abs(p.y) * 3.2);
  float halo = exp(-r * r * 9.0) * .35;
  gl_FragColor = vec4(vColor * (spikes + halo) * (1.0 - smoothstep(.8, 1.0, r)), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const PLANET_VERTEX = /* glsl */ `
varying vec3 vLocal;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;
void main() {
  vLocal = normalize(position);
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorldPosition = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

// Equirectangular band albedo for the gas giant, baked once at start-up.
const ALBEDO_BAKE_FRAGMENT = /* glsl */ `
${NOISE}
varying vec2 vUv;
vec3 palette(float x) {
  vec3 cream = vec3(.62, .52, .36), ochre = vec3(.46, .30, .16), rust = vec3(.30, .15, .085);
  vec3 sage = vec3(.30, .34, .29), pale = vec3(.70, .64, .52);
  x = fract(x);
  if (x < .2) return mix(cream, ochre, x / .2);
  if (x < .4) return mix(ochre, pale, (x - .2) / .2);
  if (x < .6) return mix(pale, sage, (x - .4) / .2);
  if (x < .8) return mix(sage, rust, (x - .6) / .2);
  return mix(rust, cream, (x - .8) / .2);
}
void main() {
  float lon = (vUv.x - .5) * 6.2831853;
  float lat = (vUv.y - .5) * 3.1415927;
  vec3 p = vec3(cos(lat) * cos(lon), sin(lat), cos(lat) * sin(lon));
  // Turbulence stretched along the zonal flow, then domain warped twice.
  vec3 q = vec3(p.x * 1.1, p.y * 4.2, p.z * 1.1);
  float w1 = nz(q * .55 + 1.7);
  float w2 = nz(q * 1.3 + vec3(w1 * 2.2, 0.0, w1 * 1.7) + 4.1);
  float eddy = nz(vec3(p.x * 3.0, p.y * 9.0, p.z * 3.0) + vec3(w2 * 3.0, 0.0, w2 * 2.0));
  float y = p.y + (w1 - .5) * .11 + (w2 - .5) * .055 + (eddy - .5) * .02;
  float bands = y * 3.4 + .18 * sin(y * 11.0) + .06 * sin(y * 29.0 + w1 * 4.0);
  vec3 color = palette(bands * .5 + .25);
  // Bright zones and dark belts at several widths, with fine shear streaks.
  float belt = .5 + .5 * sin(y * 23.0 + .5 * sin(y * 7.0));
  color *= .78 + .38 * smoothstep(.25, .85, belt);
  float thin = .5 + .5 * sin(y * 71.0 + w2 * 3.0 + eddy * 2.0);
  color *= .92 + .14 * smoothstep(.3, .9, thin);
  float streak = nz(vec3(p.x * 14.0, p.y * 90.0, p.z * 14.0) + w2 * 2.5 + eddy);
  color *= .86 + .30 * (streak - .5) * 2.0;
  // Kelvin-Helmholtz curls along the belt edges.
  float edge = abs(cos(y * 23.0 + .5 * sin(y * 7.0)));
  float curl = nz(vec3(p.x * 22.0, p.y * 40.0, p.z * 22.0) + vec3(w1, eddy, w2) * 3.0);
  color = mix(color, color * vec3(1.18, 1.10, .98), smoothstep(.55, .75, curl) * (1.0 - edge) * .6);
  // Long-lived oval storms in two belts.
  vec2 s1 = vec2(lon - .9, (lat + .38) * 2.4);
  float storm1 = exp(-dot(s1, s1) / .010);
  vec2 s2 = vec2(lon + 1.7, (lat - .26) * 2.6);
  float storm2 = exp(-dot(s2, s2) / .004);
  color = mix(color, vec3(.70, .42, .26) * (.85 + .3 * eddy), storm1 * .85);
  color = mix(color, vec3(.80, .76, .68), storm2 * .8);
  // Muted, cooler polar caps.
  color = mix(color, vec3(.24, .29, .30) * (.8 + .4 * w1), smoothstep(.55, .85, abs(p.y)));
  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
`;

const PLANET_FRAGMENT = /* glsl */ `
${NOISE}
${RING_PROFILE}
uniform sampler2D uAlbedo;
uniform float uTime;
uniform float uCompanion;
uniform vec3 uRingCenter;
uniform vec3 uRingNormal;
uniform vec3 uPlanetCenter;
varying vec3 vLocal;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;
void main() {
  vec3 n = normalize(vLocal);
  vec3 albedo;
  if (uCompanion > .5) {
    float maria = smoothstep(.50, .60, nz(n * .55 + 3.1));
    float rough = nz(n * 2.2 + 1.3);
    float craters = smoothstep(.62, .72, nz(n * 5.1 + 7.0));
    albedo = mix(vec3(.30, .28, .26), vec3(.12, .12, .13), maria) * (.8 + .4 * rough) + craters * .10;
  } else {
    float lat = asin(clamp(n.y, -1.0, 1.0));
    // Very slow differential zonal flow.
    float lon = atan(n.z, n.x) + uTime * (.0006 + .0004 * sin(lat * 9.0));
    albedo = texture(uAlbedo, vec2(lon / 6.2831853 + .5, lat / 3.1415927 + .5)).rgb;
    // Live turbulence: eddies churn slowly inside each band while neighbouring
    // bands slide past each other (differential rotation, jets alternate).
    float jet = uTime * (.0016 * sin(lat * 11.0) + .0007 * sin(lat * 27.0));
    float c0 = cos(lat);
    vec3 q = vec3(cos(lon + jet) * c0 * 2.4, lat * 7.5, sin(lon + jet) * c0 * 2.4);
    float e1 = nz(q * .45 + vec3(0.0, uTime * .0011, 0.0));
    float e2 = nz(q * 1.25 + vec3(e1 * 1.9, 0.0, e1 * 1.4) + vec3(.3, .1, uTime * .0017));
    float e3 = nz(q * 3.1 + vec3(e2 * 2.4, 0.0, e2 * 1.8) + 2.7);
    float eddy = (e2 - .5) * .7 + (e3 - .5) * .45;
    // Bright convective plumes and dark barges ride the belts.
    albedo *= .92 + .34 * eddy;
    albedo = mix(albedo, albedo * vec3(1.12, 1.06, .96), smoothstep(.62, .78, e3) * .5);
  }
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(cameraPosition - vWorldPosition);
  vec3 S = ${SUN};
  float mu = dot(N, S);
  float muV = max(dot(N, V), 0.0);
  float atmosphere = 1.0 - uCompanion;
  // Gas giant: soft, reddened terminator; moon: crisp.
  float wrap = mix(.0, .10, atmosphere);
  float lit = max(mu + wrap, 0.0) / (1.0 + wrap);
  lit = pow(lit, mix(1.0, 1.25, atmosphere));
  vec3 sun = ${SUN_RADIANCE} * (1.0 / 3.1415927);
  vec3 twilight = vec3(1.0, .42, .20) * smoothstep(-.14, .02, mu) * (1.0 - smoothstep(.02, .22, mu)) * .18 * atmosphere;
  // Ring shadow: follow the ray toward the star to the ring plane.
  float ringShadow = 1.0;
  if (atmosphere > .5) {
    float denom = dot(S, uRingNormal);
    float tPlane = dot(uRingCenter - vWorldPosition, uRingNormal) / (abs(denom) > 1e-4 ? denom : 1e-4);
    if (tPlane > 0.0) {
      float rr = length(vWorldPosition + S * tPlane - uRingCenter);
      ringShadow = exp(-ringTau(rr, .05) / max(abs(denom), .05));
    }
  }
  // Limb darkening from the haze column above the cloud deck.
  float haze = exp(-mix(.0, .085, atmosphere) / max(muV, .04));
  vec3 color = albedo * sun * lit * ringShadow * haze + albedo * twilight * sun;
  float night = 1.0 - smoothstep(-.18, .06, mu);
  if (atmosphere > .5) {
    // Ringshine: the sunlit face of the rings lights the night side faintly.
    vec3 litFace = uRingNormal * sign(dot(S, uRingNormal));
    color += albedo * vec3(.55, .52, .48) * .018 * max(dot(N, litFace), 0.0) * night;
    // Polar aurora on the night side: slow curtains along the auroral oval.
    float colat = acos(clamp(abs(n.y), 0.0, 1.0));
    float lon = atan(n.z, n.x);
    vec3 curtainP = vec3(cos(lon) * 1.6, sin(lon) * 1.6, uTime * .004 + step(0.0, n.y) * 3.0);
    float curtain = smoothstep(.46, .68, nz(curtainP));
    float oval = exp(-pow((colat - .36 - (nz(curtainP * 2.0) - .5) * .2) / .045, 2.0));
    float rays = .5 + .5 * sin(lon * 38.0 + nz(curtainP * 3.0) * 9.0);
    float glow = oval * (.12 + .88 * curtain) * (.55 + .45 * rays) * night * (.55 + .45 * muV);
    color += (vec3(.10, .80, .52) * .035 + vec3(.40, .20, .80) * .012 * smoothstep(.3, .42, colat)) * glow;
    // Faint high-altitude airglow keeps the night disc from reading as a hole.
    color += vec3(.010, .016, .026) * (.4 + .6 * pow(1.0 - muV, 2.0)) * night;
    // The bright nebula lights the night side very faintly; belts stay legible.
    color += albedo * vec3(.040, .036, .055) * night * (.5 + .5 * muV);
  } else {
    // Planetshine from the gas giant on the moon's night side.
    vec3 toPlanet = normalize(uPlanetCenter - vWorldPosition);
    color += albedo * vec3(.020, .024, .022) * max(dot(N, toPlanet), 0.0);
  }
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

// Analytic single scattering through a thin shell around the gas giant.
const ATMOSPHERE_FRAGMENT = /* glsl */ `
uniform vec3 uCenter;
uniform float uPlanetRadius;
uniform float uShellRadius;
varying vec3 vWorldPosition;
float hg(float c, float g) { float g2 = g * g; return (1.0 - g2) / (12.566 * pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5)); }
void main() {
  vec3 S = ${SUN};
  vec3 ro = cameraPosition - uCenter;
  vec3 rd = normalize(vWorldPosition - cameraPosition);
  float b = dot(ro, rd);
  float h = b * b - (dot(ro, ro) - uShellRadius * uShellRadius);
  if (h <= 0.0) discard;
  h = sqrt(h);
  float t0 = max(-b - h, 0.0), t1 = -b + h;
  float hp = b * b - (dot(ro, ro) - uPlanetRadius * uPlanetRadius);
  if (hp > 0.0) t1 = min(t1, -b - sqrt(hp));
  float segment = max(t1 - t0, 0.0);
  float thickness = uShellRadius - uPlanetRadius;
  float ds = segment / 8.0;
  float scatter = 0.0, depth = 0.0;
  for (int i = 0; i < 8; i++) {
    vec3 x = ro + rd * (t0 + (float(i) + .5) * ds);
    float r = length(x);
    float height = clamp((r - uPlanetRadius) / thickness, 0.0, 1.0);
    float density = exp(-height * 5.0);
    float mu = dot(x / r, S);
    // Light reaches past the terminator through the upper layers.
    float sunlit = smoothstep(-.30 + height * .18, .25, mu);
    float sunPath = exp(-1.2 / max(mu + .32, .06) * (1.0 - height));
    scatter += density * sunlit * sunPath * ds;
    depth += density * ds;
  }
  float c = dot(rd, S);
  vec3 rayleigh = vec3(.16, .40, .95) * (.75 + .6 * c * c) * .10;
  vec3 mie = vec3(1.0, .86, .68) * hg(c, .72) * .22;
  vec3 color = (rayleigh + mie) * scatter / thickness * ${COSMIC_SUN_IRRADIANCE.toFixed(2)};
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const RING_VERTEX = /* glsl */ `
varying vec3 vPosition;
varying vec3 vWorldPosition;
void main() {
  vPosition = position;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorldPosition = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const RING_FRAGMENT = /* glsl */ `
${RING_PROFILE}
uniform vec3 uPlanetPosition;
uniform vec3 uRingNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
float hg(float c, float g) { float g2 = g * g; return (1.0 - g2) / (12.566 * pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5)); }
void main() {
  float r = length(vPosition.xy);
  float tau = ringTau(r, max(fwidth(r), 1e-4));
  if (tau <= 1e-4) discard;
  vec3 S = ${SUN};
  vec3 n = uRingNormal;
  vec3 V = normalize(cameraPosition - vWorldPosition);
  float muV = max(abs(dot(V, n)), .02);
  float muS = max(abs(dot(S, n)), .02);
  bool sameSide = dot(V, n) * dot(S, n) > 0.0;
  float scatterCos = dot(-S, V);
  float phase = (hg(scatterCos, .55) * .55 + hg(scatterCos, -.30) * .45) * 12.566;
  float slab;
  if (sameSide) {
    slab = muS / (muS + muV) * (1.0 - exp(-tau * (1.0 / muS + 1.0 / muV)));
  } else {
    float k = muS - muV;
    slab = abs(k) < 1e-3 ? tau / muV * exp(-tau / muV) : muS / k * (exp(-tau / muS) - exp(-tau / muV));
  }
  // Planet umbra on the rings, in world coordinates.
  vec3 toCenter = uPlanetPosition - vWorldPosition;
  float projection = dot(toCenter, S);
  float distanceFromRay = sqrt(max(0.0, dot(toCenter, toCenter) - projection * projection));
  float shadow = smoothstep(${COSMIC_RING_SHADOW_EDGES[0].toFixed(2)}, ${COSMIC_RING_SHADOW_EDGES[1].toFixed(2)}, distanceFromRay);
  shadow = mix(1.0, shadow, smoothstep(0.0, 2.0, projection));
  float x = (r - ${RING_INNER.toFixed(2)}) / ${(RING_OUTER - RING_INNER).toFixed(2)};
  // Dusty blue-grey inner ring, peach-tan bright ring, neutral grey outer ring,
  // with fine radial colour banding (composition changes ringlet to ringlet).
  vec3 albedo = mix(vec3(.26, .27, .29), vec3(.64, .52, .38), smoothstep(.18, .42, x));
  albedo = mix(albedo, vec3(.52, .49, .45), smoothstep(.6, .7, x));
  albedo *= .72 + .42 * ringNoise(r * 3.1 + 5.0) + .16 * (ringNoise(r * 13.0 + 2.0) - .5) * (1.0 - smoothstep(.04, .12, max(fwidth(r), 1e-4)));
  vec3 color = albedo * ${SUN_RADIANCE} * phase * slab * shadow * .20;
  float alpha = 1.0 - exp(-tau / muV);
  // A faint glow from planetshine keeps shadowed ring texture readable.
  color += albedo * vec3(.010, .011, .013) * alpha;
  gl_FragColor = vec4(color, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export interface CosmicSky {
  group: THREE.Group;
  /** Shared tileable noise volume (also used by the volume pass). */
  noise: THREE.Data3DTexture;
  /** Bakes the nebula cube and planet albedo; returns a PMREM radiance probe or null. */
  prepare(renderer: THREE.WebGLRenderer): THREE.Texture | null;
  update(time: number): void;
  getShadowState(): { planetWorldCenter: number[]; uniformWorldCenter: number[]; centerError: number };
  dispose(): void;
}

export function createCosmicSky(): CosmicSky {
  const group = new THREE.Group();
  group.name = 'cosmic-sky';
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const timeUniform = { value: 0 };
  const noise = createNoiseVolume(64, 23);
  const noiseUniform = { value: noise };
  const nebulaUniform = { value: null as THREE.Texture | null };
  const albedoUniform = { value: null as THREE.Texture | null };
  const starLocal = COSMIC_SUN_DIRECTION.clone();
  let nebulaTarget: THREE.WebGLCubeRenderTarget | null = null;
  let albedoTarget: THREE.WebGLRenderTarget | null = null;
  let environment: THREE.WebGLRenderTarget | null = null;

  function ownGeometry<T extends THREE.BufferGeometry>(geometry: T): T {
    geometries.push(geometry);
    return geometry;
  }
  function ownMaterial<T extends THREE.Material>(material: T): T {
    materials.push(material);
    return material;
  }

  const domeMaterial = ownMaterial(new THREE.ShaderMaterial({
    uniforms: { uNoise: noiseUniform, uNebula: nebulaUniform, uStar: { value: starLocal }, uStarLocal: { value: starLocal }, uNebulaGain: { value: 1 } },
    vertexShader: DIRECTION_VERTEX,
    fragmentShader: DOME_FRAGMENT,
    side: THREE.BackSide,
    depthWrite: false,
  }));
  const dome = new THREE.Mesh(ownGeometry(new THREE.SphereGeometry(230, 64, 32)), domeMaterial);
  dome.name = 'distant-nebula-shell';
  dome.renderOrder = -100;
  dome.frustumCulled = false;
  group.add(dome);

  // Star field: power-law brightness, crowded toward the nebula band.
  const random = seededRandom(482092);
  const starCount = 22000;
  const positions = new Float32Array(starCount * 3);
  const data = new Float32Array(starCount * 4);
  const heroPositions: number[] = [];
  const heroData: number[] = [];
  const bandNormal = new THREE.Vector3(.431, -.843, -.323).normalize();
  const direction = new THREE.Vector3();
  for (let i = 0; i < starCount; i += 1) {
    const y = random() * 2 - 1;
    const angle = random() * Math.PI * 2;
    const r = Math.sqrt(1 - y * y);
    direction.set(r * Math.cos(angle), y, r * Math.sin(angle));
    if (random() < .4) {
      // Pull toward the band plane.
      const offset = direction.dot(bandNormal);
      direction.addScaledVector(bandNormal, -offset * (.75 + random() * .2)).normalize();
    }
    const distance = 175 + random() * 20;
    positions.set([direction.x * distance, direction.y * distance, direction.z * distance], i * 3);
    const u = Math.max(1e-4, random());
    const brightness = Math.min(14, .11 * Math.pow(u, -.76));
    const hero = brightness > 5;
    const temperature = Math.pow(random(), hero ? .6 : 1.3);
    const size = hero ? 2.4 + random() * .9 : 1.1 + Math.min(1.3, Math.sqrt(brightness) * .5);
    data.set([brightness, temperature, random(), size], i * 4);
    if (brightness > 7.5) { heroPositions.push(direction.x * distance, direction.y * distance, direction.z * distance); heroData.push(brightness, temperature, data[i * 4 + 2], size); }
  }
  const starGeometry = ownGeometry(new THREE.BufferGeometry());
  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starGeometry.setAttribute('aStar', new THREE.BufferAttribute(data, 4));
  const starUniforms = { uTime: timeUniform, uPixelRatio: { value: 1 }, uNebula: nebulaUniform, uTwinkle: { value: .55 } };
  const starMaterial = ownMaterial(new THREE.ShaderMaterial({
    uniforms: starUniforms,
    vertexShader: STAR_VERTEX,
    fragmentShader: STAR_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }));
  const stars = new THREE.Points(starGeometry, starMaterial);
  stars.name = 'fine-distant-stars';
  stars.renderOrder = -70;
  stars.frustumCulled = false;
  stars.onBeforeRender = (renderer) => { starUniforms.uPixelRatio.value = Math.min(2, renderer.getPixelRatio()); };
  group.add(stars);
  const spikeGeometry = ownGeometry(new THREE.BufferGeometry());
  spikeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(heroPositions, 3));
  spikeGeometry.setAttribute('aStar', new THREE.Float32BufferAttribute(heroData, 4));
  const spikeMaterial = ownMaterial(new THREE.ShaderMaterial({
    uniforms: starUniforms, vertexShader: SPIKE_VERTEX, fragmentShader: SPIKE_FRAGMENT,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  const spikes = new THREE.Points(spikeGeometry, spikeMaterial);
  spikes.name = 'bright-star-diffraction';
  spikes.renderOrder = -69;
  spikes.frustumCulled = false;
  group.add(spikes);

  const ringQuaternion = new THREE.Quaternion().setFromEuler(RING_ROTATION);
  const ringNormalLocal = new THREE.Vector3(0, 0, 1).applyQuaternion(ringQuaternion);
  const ringNormalWorld = ringNormalLocal.clone();
  // The planet spins about the ring normal, so the rings stay equatorial.
  const planetTilt = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), ringNormalLocal.clone().negate());
  const spin = new THREE.Quaternion();
  const yAxis = new THREE.Vector3(0, 1, 0);
  const planetWorldPosition = COSMIC_PLANET_CENTER.clone();
  const planetGeometry = ownGeometry(new THREE.SphereGeometry(COSMIC_PLANET_RADIUS, 128, 80));
  const planetMaterial = ownMaterial(new THREE.ShaderMaterial({
    uniforms: {
      uNoise: noiseUniform, uAlbedo: albedoUniform, uTime: timeUniform, uCompanion: { value: 0 },
      uRingCenter: { value: planetWorldPosition }, uRingNormal: { value: ringNormalWorld }, uPlanetCenter: { value: planetWorldPosition },
    },
    vertexShader: PLANET_VERTEX,
    fragmentShader: PLANET_FRAGMENT,
  }));
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  planet.name = 'aurelia-gas-giant';
  planet.position.copy(COSMIC_PLANET_CENTER);
  planet.quaternion.copy(planetTilt);
  group.add(planet);

  const shellRadius = COSMIC_PLANET_RADIUS * 1.075;
  const atmosphere = new THREE.Mesh(ownGeometry(new THREE.SphereGeometry(shellRadius, 96, 64)), ownMaterial(new THREE.ShaderMaterial({
    uniforms: { uCenter: { value: planetWorldPosition }, uPlanetRadius: { value: COSMIC_PLANET_RADIUS }, uShellRadius: { value: shellRadius } },
    vertexShader: PLANET_VERTEX,
    fragmentShader: ATMOSPHERE_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })));
  atmosphere.name = 'aurelia-scattering-atmosphere';
  atmosphere.position.copy(COSMIC_PLANET_CENTER);
  atmosphere.renderOrder = -40;
  group.add(atmosphere);

  // The ring fragment and sun direction use world coordinates. Keep this
  // separate from the placement vector: portrait rotates the whole sky.
  const rings = new THREE.Mesh(
    ownGeometry(new THREE.RingGeometry(RING_INNER, RING_OUTER, 256, 1)),
    ownMaterial(new THREE.ShaderMaterial({
      uniforms: { uPlanetPosition: { value: planetWorldPosition }, uRingNormal: { value: ringNormalWorld } },
      vertexShader: RING_VERTEX,
      fragmentShader: RING_FRAGMENT,
      transparent: true,
      premultipliedAlpha: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })),
  );
  rings.name = 'aurelia-dust-rings';
  rings.position.copy(COSMIC_PLANET_CENTER);
  rings.quaternion.copy(ringQuaternion);
  rings.renderOrder = -35;
  group.add(rings);

  const moon = new THREE.Mesh(
    ownGeometry(new THREE.SphereGeometry(4.6, 64, 40)),
    ownMaterial(new THREE.ShaderMaterial({
      uniforms: {
        uNoise: noiseUniform, uAlbedo: albedoUniform, uTime: timeUniform, uCompanion: { value: 1 },
        uRingCenter: { value: planetWorldPosition }, uRingNormal: { value: ringNormalWorld }, uPlanetCenter: { value: planetWorldPosition },
      },
      vertexShader: PLANET_VERTEX,
      fragmentShader: PLANET_FRAGMENT,
    })),
  );
  moon.name = 'distant-companion-moon';
  // Placed about 85 degrees from the star, so its terminator reads clearly.
  moon.position.set(64.5, 31.2, -88.5);
  moon.rotation.set(.4, .3, .1);
  group.add(moon);

  const groupQuaternion = new THREE.Quaternion();
  let disposed = false;
  return {
    group,
    noise,
    prepare(renderer) {
      if (disposed) return null;
      const previous = renderer.getRenderTarget();
      const pass = new FullscreenPass();
      try {
        // Planet bands: a one-off equirectangular bake (8-bit sRGB albedo).
        albedoTarget = new THREE.WebGLRenderTarget(1024, 512, {
          type: THREE.UnsignedByteType, depthBuffer: false, generateMipmaps: false,
          minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, wrapS: THREE.RepeatWrapping, wrapT: THREE.ClampToEdgeWrapping,
          colorSpace: THREE.SRGBColorSpace,
        });
        const albedoMaterial = new THREE.ShaderMaterial({
          uniforms: { uNoise: noiseUniform },
          vertexShader: 'varying vec2 vUv; void main(){ vUv = position.xy * .5 + .5; gl_Position = vec4(position.xy, 0.0, 1.0); }',
          fragmentShader: ALBEDO_BAKE_FRAGMENT, depthTest: false, depthWrite: false,
        });
        pass.render(renderer, albedoMaterial, albedoTarget);
        albedoMaterial.dispose();
        albedoUniform.value = albedoTarget.texture;
        if (!supportsHdrTargets(renderer)) return null;
        // Nebula: a 40-step march per texel, baked once into a half-float cube.
        nebulaTarget = new THREE.WebGLCubeRenderTarget(512, {
          type: THREE.HalfFloatType, generateMipmaps: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
          depthBuffer: false, colorSpace: THREE.NoColorSpace,
        });
        const bakeScene = new THREE.Scene();
        const bakeMaterial = new THREE.ShaderMaterial({
          uniforms: { uNoise: noiseUniform, uStar: { value: starLocal } },
          vertexShader: DIRECTION_VERTEX, fragmentShader: NEBULA_BAKE_FRAGMENT, side: THREE.BackSide, depthTest: false, depthWrite: false,
        });
        const bakeGeometry = new THREE.SphereGeometry(10, 32, 16);
        bakeScene.add(new THREE.Mesh(bakeGeometry, bakeMaterial));
        const cubeCamera = new THREE.CubeCamera(.1, 50, nebulaTarget);
        cubeCamera.update(renderer, bakeScene);
        bakeGeometry.dispose(); bakeMaterial.dispose();
        nebulaUniform.value = nebulaTarget.texture;
        domeMaterial.defines = { ...domeMaterial.defines, NEBULA_BAKED: '' };
        starMaterial.defines = { ...starMaterial.defines, NEBULA_BAKED: '' };
        spikeMaterial.defines = { ...spikeMaterial.defines, NEBULA_BAKED: '' };
        domeMaterial.needsUpdate = true; starMaterial.needsUpdate = true; spikeMaterial.needsUpdate = true;
        // Image-based ambient light from the real nebula (no star disc in it).
        const pmrem = new THREE.PMREMGenerator(renderer);
        environment = pmrem.fromCubemap(nebulaTarget.texture);
        pmrem.dispose();
        return environment.texture;
      } finally {
        pass.dispose();
        renderer.setRenderTarget(previous);
      }
    },
    update(time: number) {
      if (disposed) return;
      timeUniform.value = time;
      spin.setFromAxisAngle(yAxis, -.4 + time * .00045);
      planet.quaternion.copy(planetTilt).multiply(spin);
      // getWorldPosition refreshes ancestor matrices before reading the center,
      // including a just-resized portrait sky and any containing scene group.
      planet.getWorldPosition(planetWorldPosition);
      group.getWorldQuaternion(groupQuaternion);
      ringNormalWorld.copy(ringNormalLocal).applyQuaternion(groupQuaternion);
    },
    getShadowState() {
      const actualCenter = planet.getWorldPosition(new THREE.Vector3());
      return {
        planetWorldCenter: actualCenter.toArray(),
        uniformWorldCenter: planetWorldPosition.toArray(),
        centerError: actualCenter.distanceTo(planetWorldPosition),
      };
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
      noise.dispose();
      nebulaTarget?.dispose(); albedoTarget?.dispose(); environment?.dispose();
      nebulaTarget = null; albedoTarget = null; environment = null;
      group.clear();
    },
  };
}
