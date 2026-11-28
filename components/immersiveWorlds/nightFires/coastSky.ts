import * as THREE from 'three';

/*
 * Late-twilight sky over the sea inlet (original). Linear HDR radiance:
 *  - a three-stop violet gradient with a rose afterglow low over the sunset,
 *  - drifting stratocumulus streaks whose edges catch the afterglow in pink,
 *    read from the shared tileable noise volume (no ALU noise),
 *  - the first stars, fading with the sky's brightness and hidden by cloud.
 * `GLSL_COAST_SKY` is shared by the dome, the star field and the water's
 * reflections, so the sea always mirrors the sky that is actually drawn.
 */

export interface CoastSkyOptions {
  noise: THREE.Data3DTexture;
  /** Horizontal direction of the set sun (afterglow centre). */
  glowDirection: THREE.Vector3;
  zenith: THREE.ColorRepresentation;
  middle: THREE.ColorRepresentation;
  horizon: THREE.ColorRepresentation;
  glow: THREE.ColorRepresentation;
  cloudLit: THREE.ColorRepresentation;
  cloudShade: THREE.ColorRepresentation;
  /** Radiance scale applied to every colour above. */
  brightness: number;
  /** 0..1 amount of sky covered by cloud streaks. */
  cover?: number;
  /** `twinkle` is the scintillation strength (about 0.6–0.8 reads clearly on a phone). */
  stars?: { count: number; seed: number; intensity: number; twinkle?: number };
}

export const GLSL_COAST_SKY = /* glsl */ `
precision highp sampler3D;
uniform sampler3D uSkyNoise;
uniform float uSkyTime;
uniform vec3 uSkyZenith;
uniform vec3 uSkyMiddle;
uniform vec3 uSkyHorizon;
uniform vec3 uSkyGlow;
uniform vec3 uSkyGlowDir;
uniform vec3 uCloudLit;
uniform vec3 uCloudShade;
uniform float uCloudCover;
float coastToward(vec3 dir) { return dot(normalize(vec3(dir.x, 0.0, dir.z) + 1e-5), uSkyGlowDir); }
/** Clear-sky radiance: violet zenith, lilac band, rose afterglow over the sunset. */
vec3 coastSkyBase(vec3 dir) {
  float h = max(dir.y, 0.0);
  float toward = coastToward(dir);
  vec3 color = mix(uSkyHorizon, uSkyMiddle, smoothstep(0.0, 0.2, h));
  color = mix(color, uSkyZenith, smoothstep(0.1, 0.9, h));
  // Afterglow: broad in azimuth, hugging the horizon, warmest toward the set sun.
  float side = pow(0.5 + 0.5 * toward, 2.2);
  color += uSkyGlow * side * (exp(-h / 0.075) * 0.85 + exp(-h / 0.3) * 0.25);
  // Below the horizon (reflections only) the haze stays lilac and dims slowly.
  color *= 1.0 - 0.45 * smoothstep(0.0, -0.3, dir.y);
  return color;
}
/** Cloud density at a sky-plane coordinate (tile units of the noise volume). */
float coastCloudDensity(vec2 q) {
  float t = uSkyTime;
  vec3 p = vec3(q.x * 0.3 + t * 0.0021, q.y * 1.05, t * 0.0009);
  float broad = dot(texture(uSkyNoise, p), vec4(0.55, 0.28, 0.12, 0.05));
  float fine = dot(texture(uSkyNoise, p * vec3(3.1, 2.3, 1.0) + vec3(0.37, 0.11, t * 0.0017)), vec4(0.4, 0.35, 0.25, 0.0));
  float d = broad + (fine - 0.5) * 0.32;
  return smoothstep(0.66 - uCloudCover * 0.22, 0.86 - uCloudCover * 0.2, d);
}
/** rgb: cloud radiance, a: coverage (0 = clear). */
vec4 coastClouds(vec3 dir) {
  if (dir.y < 0.004 || uCloudCover <= 0.0) return vec4(0.0);
  float h = dir.y;
  vec2 q = dir.xz / (h + 0.09) * 0.42;
  float d = coastCloudDensity(q);
  // Cloud decks are thin near the zenith and thicken into a band in the middle sky.
  float band = smoothstep(0.02, 0.1, h) * (1.0 - smoothstep(0.42, 0.85, h));
  d *= band;
  if (d < 0.002) return vec4(0.0);
  // Two-tap self-shadowing toward the hidden sun lights the edges that face it.
  vec2 toSun = uSkyGlowDir.xz * 0.06;
  float behind = coastCloudDensity(q + toSun) * band;
  float lit = clamp(1.0 - behind * 1.25 + (1.0 - d) * 0.35, 0.0, 1.0);
  float toward = coastToward(dir);
  float rose = pow(0.5 + 0.5 * toward, 1.4) * (0.55 + 0.45 * smoothstep(0.35, 0.05, h));
  vec3 color = mix(uCloudShade, uCloudLit * (0.45 + 0.75 * rose), lit * lit);
  // Thin wisps toward the horizon melt into the haze.
  color = mix(color, coastSkyBase(dir), smoothstep(0.09, 0.02, h) * 0.6);
  return vec4(color, d);
}
vec3 coastSky(vec3 dir) {
  vec3 base = coastSkyBase(dir);
  vec4 cloud = coastClouds(dir);
  return mix(base, cloud.rgb, cloud.a);
}
`;

const DOME_VERTEX = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 clip = projectionMatrix * viewMatrix * vec4(cameraPosition + position * 400.0, 1.0);
  // On the far plane: screen-space passes read it as sky.
  clip.z = clip.w * 0.9999995;
  gl_Position = clip;
}
`;

const DOME_FRAGMENT = /* glsl */ `
${GLSL_COAST_SKY}
varying vec3 vDir;
void main() {
  gl_FragColor = vec4(coastSky(normalize(vDir)), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const STAR_VERTEX = /* glsl */ `
${GLSL_COAST_SKY}
uniform float uStarIntensity;
uniform float uPixelRatio;
uniform float uTwinkle;
attribute vec4 star;
varying vec3 vColor;
void main() {
  vec3 dir = normalize(position);
  vec4 clip = projectionMatrix * viewMatrix * vec4(cameraPosition + dir * 400.0, 1.0);
  clip.z = clip.w * 0.999999;
  gl_Position = clip;
  // The first stars: only where the sky has already darkened, never through cloud.
  vec3 sky = coastSkyBase(dir);
  float luminance = dot(sky, vec3(0.2126, 0.7152, 0.0722));
  float dark = 1.0 - smoothstep(0.03, 0.1, luminance);
  float clear = 1.0 - smoothstep(0.03, 0.4, coastClouds(dir).a);
  float horizon = smoothstep(0.03, 0.3, dir.y);
  // Scintillation: three incommensurate rates per star, strongest for bright stars
  // and low in the sky, so no two stars and no two moments line up. Never a flash.
  float seed = star.w * 6.2831853;
  float flicker = 0.5 * sin(uSkyTime * (2.1 + star.z * 2.7) + seed * 9.0)
                + 0.3 * sin(uSkyTime * (3.9 + star.w * 3.3) + seed * 4.0)
                + 0.2 * sin(uSkyTime * (0.9 + star.y * 1.3) + seed * 13.0);
  float low = 1.0 - smoothstep(0.1, 0.5, dir.y);
  float twinkle = max(0.12, 1.0 + uTwinkle * (0.55 + 0.45 * low) * smoothstep(0.15, 1.2, star.x) * flicker);
  float brightness = star.x * uStarIntensity * dark * clear * horizon * twinkle;
  vColor = mix(vec3(0.66, 0.76, 1.0), vec3(1.0, 0.82, 0.62), star.y) * brightness;
  float size = clamp(1.3 + sqrt(star.x) * 0.8, 1.3, 3.6);
  vColor *= 2.2 / (size * size);
  // Bright stars also swell and shrink a little, which reads as sparkle at a few pixels.
  float swell = 1.0 + uTwinkle * smoothstep(0.6, 3.0, star.x) * (0.55 + 0.45 * clamp(twinkle - 1.0, -1.0, 1.0));
  gl_PointSize = size * max(swell, 0.6) * uPixelRatio;
  if (brightness <= 1e-4) gl_PointSize = 0.0;
}
`;

const STAR_FRAGMENT = /* glsl */ `
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  gl_FragColor = vec4(vColor * exp(-d * d * 4.0), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const linear = (c: THREE.ColorRepresentation, scale: number) => {
  const color = new THREE.Color(c);
  return new THREE.Vector3(color.r, color.g, color.b).multiplyScalar(scale);
};

export function coastSkyUniforms(o: CoastSkyOptions) {
  return {
    uSkyNoise: { value: o.noise },
    uSkyTime: { value: 0 },
    uSkyZenith: { value: linear(o.zenith, o.brightness) },
    uSkyMiddle: { value: linear(o.middle, o.brightness) },
    uSkyHorizon: { value: linear(o.horizon, o.brightness) },
    uSkyGlow: { value: linear(o.glow, o.brightness) },
    uSkyGlowDir: { value: o.glowDirection.clone().setY(0).normalize() },
    uCloudLit: { value: linear(o.cloudLit, o.brightness) },
    uCloudShade: { value: linear(o.cloudShade, o.brightness) },
    uCloudCover: { value: o.cover ?? 0.5 },
  };
}
export type CoastSkyUniforms = ReturnType<typeof coastSkyUniforms>;

/** Dome plus star field; add `group`, call `update(time)`. The dome can be baked into a radiance probe. */
export function createCoastSky(o: CoastSkyOptions) {
  const group = new THREE.Group();
  group.name = 'Twilight sky with drifting cloud';
  const uniforms = coastSkyUniforms(o);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 48), new THREE.ShaderMaterial({
    uniforms, vertexShader: DOME_VERTEX, fragmentShader: DOME_FRAGMENT, side: THREE.BackSide, depthWrite: false,
  }));
  dome.frustumCulled = false;
  dome.renderOrder = -10;
  dome.name = 'Sky dome';
  group.add(dome);

  const starUniforms = { ...uniforms, uStarIntensity: { value: o.stars?.intensity ?? 1 }, uPixelRatio: { value: 1 }, uTwinkle: { value: o.stars?.twinkle ?? 0 } };
  let stars: THREE.Points | null = null;
  if (o.stars && o.stars.count > 0) {
    const random = mulberry(o.stars.seed);
    const positions = new Float32Array(o.stars.count * 3), data = new Float32Array(o.stars.count * 4);
    for (let i = 0; i < o.stars.count; i++) {
      // Upper hemisphere, uniform in solid angle.
      const y = 0.02 + random() * 0.98, a = random() * Math.PI * 2, r = Math.sqrt(1 - y * y);
      positions.set([Math.cos(a) * r, y, Math.sin(a) * r], i * 3);
      const u = Math.max(1e-4, random());
      data.set([Math.min(30, 0.16 * Math.pow(u, -0.8)), Math.pow(random(), 1.6), random(), random()], i * 4);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('star', new THREE.BufferAttribute(data, 4));
    stars = new THREE.Points(geometry, new THREE.ShaderMaterial({
      uniforms: starUniforms, vertexShader: STAR_VERTEX, fragmentShader: STAR_FRAGMENT,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    stars.frustumCulled = false;
    stars.renderOrder = -9;
    stars.name = 'First stars';
    stars.onBeforeRender = (renderer) => { starUniforms.uPixelRatio.value = Math.min(2, renderer.getPixelRatio()); };
    group.add(stars);
  }
  return {
    group, dome, stars, uniforms,
    update(time: number) { uniforms.uSkyTime.value = time; },
  };
}

function mulberry(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
