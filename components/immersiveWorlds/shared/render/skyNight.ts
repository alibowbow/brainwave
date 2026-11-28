import * as THREE from 'three';
import { GLSL_HEAT_SHIMMER, type HeatShimmer } from './fireFlame';

/*
 * Code-only night sky for the immersive worlds (original implementation).
 * Everything is linear HDR radiance for the shared pipeline:
 *  - zenith/horizon gradient with an optional directional glow (twilight
 *    afterglow, a town's light dome) and a faint airglow band,
 *  - a Milky Way band with a brighter core, clumpy star clouds and dark dust
 *    lanes, sampled from the shared tileable noise volume,
 *  - a moon with maria, terminator, limb darkening and a soft aureole,
 *  - a point star field with a power-law brightness distribution, colour
 *    temperatures, crowding toward the galactic plane and gentle scintillation.
 * The dome and stars follow the camera and sit on the far plane, so screen-space
 * passes treat them as sky. `GLSL_NIGHT_SKY` lets water shaders reflect the same sky.
 */

export interface NightSkyOptions {
  noise: THREE.Data3DTexture;
  zenith: THREE.ColorRepresentation;
  horizon: THREE.ColorRepresentation;
  /** Radiance scale applied to zenith/horizon colours. */
  brightness?: number;
  glow?: { color: THREE.ColorRepresentation; direction: THREE.Vector3; intensity: number; width?: number; height?: number };
  airglow?: number;
  moon?: { direction: THREE.Vector3; color?: THREE.ColorRepresentation; intensity: number; radius?: number; halo?: number; sunDirection?: THREE.Vector3 };
  galaxy?: { pole: THREE.Vector3; centre: THREE.Vector3; intensity: number };
  /** `twinkle` adds visible scintillation (0 keeps the faint default; about 0.6 reads clearly on a phone). */
  stars?: { count: number; seed: number; intensity: number; galacticFraction?: number; twinkle?: number };
  /** Bends star positions across a fire's hot column. */
  heat?: HeatShimmer;
}

export const GLSL_NIGHT_SKY = /* glsl */ `
precision highp sampler3D;
uniform sampler3D uSkyNoise;
uniform vec3 uSkyZenith;
uniform vec3 uSkyHorizon;
uniform vec3 uSkyGlowColor;
uniform vec3 uSkyGlowDir;
uniform vec2 uSkyGlowShape;
uniform float uSkyAirglow;
uniform vec3 uMoonDir;
uniform vec3 uMoonColor;
uniform vec3 uMoonSun;
uniform vec2 uMoonShape;
uniform vec3 uGalPole;
uniform vec3 uGalCentre;
uniform float uGalIntensity;
float skyNoise(vec3 p) { return dot(texture(uSkyNoise, p), vec4(0.5, 0.27, 0.15, 0.08)); }
/** Sky radiance without the moon disc (used by reflections and the dome). */
vec3 bwNightSkyBase(vec3 dir) {
  float alt = dir.y;
  vec3 color = mix(uSkyHorizon, uSkyZenith, pow(smoothstep(-0.04, 0.95, alt), 0.6));
  color *= 1.0 - 0.6 * smoothstep(0.0, -0.25, alt);
  color += uSkyAirglow * vec3(0.16, 0.34, 0.22) * exp(-pow((alt - 0.11) / 0.075, 2.0));
  vec3 level = normalize(vec3(dir.x, 0.0, dir.z) + 1e-5);
  float toward = max(dot(level, uSkyGlowDir), 0.0);
  color += uSkyGlowColor * pow(toward, uSkyGlowShape.x) * exp(-max(alt, 0.0) / uSkyGlowShape.y) * smoothstep(-0.12, 0.0, alt);
  if (uGalIntensity > 0.0) {
    float b = dot(dir, uGalPole);
    vec3 inPlane = normalize(dir - b * uGalPole + 1e-5);
    float along = dot(inPlane, uGalCentre);
    float core = pow(max(along, 0.0), 6.0);
    float width = 0.12 + 0.1 * core;
    float band = exp(-b * b / (width * width));
    float bulge = exp(-pow(acos(clamp(dot(dir, uGalCentre), -1.0, 1.0)) / 0.3, 2.0));
    vec3 q = dir * 3.2;
    float clouds = skyNoise(q + 0.3);
    float detail = skyNoise(q * 3.1 + 4.1);
    float clump = smoothstep(0.42, 0.78, clouds * 0.55 + detail * 0.6);
    // A wandering dark rift just off the plane, and patchy dust.
    float riftCentre = (skyNoise(q * 0.6 + 7.0) - 0.5) * 0.08;
    float rift = exp(-pow((b - riftCentre) / (0.014 + 0.02 * core), 2.0)) * smoothstep(0.3, 0.6, skyNoise(q * 1.4 + 2.6));
    float dust = smoothstep(0.52, 0.72, skyNoise(q * 4.2 + 9.0));
    // Unresolved stars: a fixed, sky-attached grain that gives the band its texture.
    vec3 cell = floor(dir * 1100.0);
    float grain = fract(sin(dot(cell, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
    float sparkle = pow(grain, 18.0) * 6.0 + pow(grain, 4.0) * 0.5;
    vec3 tint = mix(vec3(0.6, 0.68, 0.95), vec3(1.0, 0.85, 0.65), clamp(core + bulge, 0.0, 1.0) * 0.8);
    float glow = band * (0.15 + 0.9 * clump) * (0.45 + 1.7 * core) + bulge * 0.6 * (0.5 + clump);
    float obscured = 1.0 - 0.82 * max(rift, dust * 0.6 * band);
    color += tint * glow * obscured * (0.55 + 0.45 * sparkle) * uGalIntensity * smoothstep(-0.02, 0.2, alt);
  }
  return color;
}
/** Moon disc and aureole for direction dir. */
vec3 bwMoon(vec3 dir, float pixelAngle) {
  if (uMoonShape.x <= 0.0) return vec3(0.0);
  float c = clamp(dot(dir, uMoonDir), -1.0, 1.0);
  float angle = acos(c);
  float radius = uMoonShape.x;
  vec3 halo = uMoonColor * uMoonShape.y * (exp(-angle / 0.018) * 0.012 + exp(-angle / 0.09) * 0.0045 + exp(-angle / 0.35) * 0.0012);
  if (angle > radius * 1.6) return halo;
  vec3 right = normalize(cross(uMoonDir, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(right, uMoonDir);
  vec2 uv = vec2(dot(dir, right), dot(dir, up)) / sin(radius);
  float r2 = dot(uv, uv);
  float edge = 1.0 - smoothstep(1.0 - pixelAngle / radius, 1.0 + pixelAngle / radius, sqrt(r2));
  vec3 n = vec3(uv, sqrt(max(1.0 - r2, 0.0)));
  float maria = smoothstep(0.5, 0.66, skyNoise(n * 0.42 + 0.71)) * 0.55 + smoothstep(0.55, 0.7, skyNoise(n * 1.1 + 3.3)) * 0.25;
  float craters = smoothstep(0.62, 0.8, skyNoise(n * 2.4 + 9.1)) * 0.18;
  // The disc normal faces the viewer (-uMoonDir); a sun near the moon gives a crescent.
  vec3 sunLocal = normalize(vec3(dot(uMoonSun, right), dot(uMoonSun, up), -dot(uMoonSun, uMoonDir)));
  float lit = smoothstep(-0.04, 0.08, dot(n, sunLocal));
  float limb = 0.72 + 0.28 * n.z;
  vec3 disc = uMoonColor * (1.0 - maria + craters) * limb * lit * edge;
  return disc + halo;
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
${GLSL_NIGHT_SKY}
varying vec3 vDir;
void main() {
  vec3 dir = normalize(vDir);
  float pixelAngle = max(length(fwidth(dir)), 1e-5);
  vec3 color = bwNightSkyBase(dir) + bwMoon(dir, pixelAngle);
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const starVertex = (heat: boolean) => /* glsl */ `
uniform float uTime;
uniform float uStarIntensity;
uniform float uPixelRatio;
uniform float uTwinkle;
attribute vec4 star;
varying vec3 vColor;
${heat ? GLSL_HEAT_SHIMMER : ''}
void main() {
  vec3 dir = normalize(position);
  vec3 world = cameraPosition + dir * 400.0;
  vec4 clip = projectionMatrix * viewMatrix * vec4(world, 1.0);
  ${heat ? 'clip.xy += fireHeatOffset(world) * vec2(projectionMatrix[0][0], projectionMatrix[1][1]) * clip.w;' : ''}
  clip.z = clip.w * 0.9999990;
  gl_Position = clip;
  // Atmospheric extinction and stronger scintillation toward the horizon.
  float horizon = smoothstep(-0.01, 0.22, dir.y);
  float twinkle = 1.0 + (0.12 + 0.3 * (1.0 - horizon)) * sin(uTime * (1.1 + star.w * 2.3) + star.w * 61.0) * sin(uTime * (0.37 + star.w) + star.w * 17.0);
  // Scintillation: three incommensurate rates per star, so no two stars and no
  // two moments line up. Bright stars shimmer most; it is a soft flicker, never a flash.
  float seed = star.w * 6.2831853;
  float flicker = 0.5 * sin(uTime * (2.1 + star.z * 2.7) + seed * 9.0)
                + 0.3 * sin(uTime * (3.9 + star.w * 3.3) + seed * 4.0)
                + 0.2 * sin(uTime * (0.9 + star.y * 1.3) + seed * 13.0);
  float weight = uTwinkle * (0.55 + 0.45 * (1.0 - horizon)) * smoothstep(0.15, 1.2, star.x);
  twinkle = max(0.12, twinkle + weight * flicker);
  float brightness = star.x * uStarIntensity * horizon * twinkle;
  vColor = mix(vec3(0.62, 0.74, 1.0), vec3(1.0, 0.78, 0.55), star.y) * mix(1.0, 0.85, star.z);
  vColor *= brightness;
  float size = clamp(1.25 + sqrt(star.x) * 0.9, 1.25, 4.2);
  // Keep total flux roughly independent of the sprite size.
  vColor *= 2.2 / (size * size);
  // With scintillation on, bright stars also swell and shrink a little, which
  // the eye reads as sparkle even when the star is only a few pixels wide.
  float swell = 1.0 + uTwinkle * smoothstep(0.6, 3.0, star.x) * (0.55 + 0.45 * clamp(twinkle - 1.0, -1.0, 1.0));
  gl_PointSize = size * max(swell, 0.6) * uPixelRatio;
  if (brightness <= 0.0) gl_PointSize = 0.0;
}
`;

const STAR_FRAGMENT = /* glsl */ `
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float profile = exp(-d * d * 4.0);
  gl_FragColor = vec4(vColor * profile, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const linear = (c: THREE.ColorRepresentation, scale = 1) => {
  const color = new THREE.Color(c);
  return new THREE.Vector3(color.r, color.g, color.b).multiplyScalar(scale);
};

export function nightSkyUniforms(options: NightSkyOptions) {
  const brightness = options.brightness ?? 1;
  const moon = options.moon;
  const galaxy = options.galaxy;
  return {
    uSkyNoise: { value: options.noise },
    uSkyZenith: { value: linear(options.zenith, brightness) },
    uSkyHorizon: { value: linear(options.horizon, brightness) },
    uSkyGlowColor: { value: options.glow ? linear(options.glow.color, options.glow.intensity) : new THREE.Vector3() },
    uSkyGlowDir: { value: (options.glow?.direction.clone().setY(0).normalize()) ?? new THREE.Vector3(0, 0, -1) },
    uSkyGlowShape: { value: new THREE.Vector2(options.glow?.width ?? 3, options.glow?.height ?? 0.18) },
    uSkyAirglow: { value: options.airglow ?? 0 },
    uMoonDir: { value: moon?.direction.clone().normalize() ?? new THREE.Vector3(0, 1, 0) },
    uMoonColor: { value: linear(moon?.color ?? '#fff4e0', moon?.intensity ?? 0) },
    uMoonSun: { value: (moon?.sunDirection ?? moon?.direction ?? new THREE.Vector3(0, 1, 0)).clone().normalize() },
    uMoonShape: { value: new THREE.Vector2(moon ? moon.radius ?? 0.016 : 0, moon?.halo ?? 1) },
    uGalPole: { value: galaxy?.pole.clone().normalize() ?? new THREE.Vector3(0, 0, 1) },
    uGalCentre: { value: galaxy?.centre.clone().normalize() ?? new THREE.Vector3(1, 0, 0) },
    uGalIntensity: { value: galaxy?.intensity ?? 0 },
  };
}

/** Builds the dome and the star field. Add `group` to the scene; call `update(time)`. */
export function createNightSky(options: NightSkyOptions) {
  const group = new THREE.Group();
  group.name = 'HDR night sky';
  const uniforms = nightSkyUniforms(options);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 48), new THREE.ShaderMaterial({
    uniforms, vertexShader: DOME_VERTEX, fragmentShader: DOME_FRAGMENT, side: THREE.BackSide, depthWrite: false,
  }));
  dome.frustumCulled = false;
  dome.renderOrder = -10;
  dome.name = 'Sky dome';
  group.add(dome);

  const starUniforms = { uTime: { value: 0 }, uStarIntensity: { value: options.stars?.intensity ?? 1 }, uPixelRatio: { value: 1 }, uTwinkle: { value: options.stars?.twinkle ?? 0 }, ...(options.heat?.uniforms ?? {}) };
  let stars: THREE.Points | null = null;
  if (options.stars && options.stars.count > 0) {
    const random = mulberry(options.stars.seed);
    const count = options.stars.count;
    const positions = new Float32Array(count * 3), data = new Float32Array(count * 4);
    const pole = uniforms.uGalPole.value, centre = uniforms.uGalCentre.value;
    const side = new THREE.Vector3().crossVectors(pole, centre);
    const dir = new THREE.Vector3();
    const galactic = options.stars.galacticFraction ?? 0.35;
    for (let i = 0; i < count; i++) {
      if (random() < galactic && options.galaxy) {
        // Crowd toward the galactic plane, densest toward the core.
        const longitude = (random() - 0.5) * Math.PI * 2 * (0.4 + 0.6 * random());
        const latitude = (random() + random() + random() - 1.5) * 0.12;
        dir.copy(centre).multiplyScalar(Math.cos(longitude)).addScaledVector(side, Math.sin(longitude)).multiplyScalar(Math.cos(latitude)).addScaledVector(pole, Math.sin(latitude));
      } else {
        const z = random() * 2 - 1, a = random() * Math.PI * 2, r = Math.sqrt(1 - z * z);
        dir.set(Math.cos(a) * r, z, Math.sin(a) * r);
      }
      if (dir.y < -0.05) { dir.y = -dir.y; }
      positions.set([dir.x, dir.y, dir.z], i * 3);
      // Power-law brightness: many faint stars, a few bright ones.
      const u = Math.max(1e-4, random());
      const brightness = Math.min(40, 0.18 * Math.pow(u, -0.78));
      data.set([brightness, Math.pow(random(), 1.6), random(), random()], i * 4);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('star', new THREE.BufferAttribute(data, 4));
    stars = new THREE.Points(geometry, new THREE.ShaderMaterial({
      uniforms: starUniforms, vertexShader: starVertex(!!options.heat), fragmentShader: STAR_FRAGMENT,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    stars.frustumCulled = false;
    stars.renderOrder = -9;
    stars.name = 'Star field';
    stars.onBeforeRender = (renderer) => { starUniforms.uPixelRatio.value = Math.min(2, renderer.getPixelRatio()); };
    group.add(stars);
  }
  return {
    group, dome, stars, uniforms,
    update(time: number) { starUniforms.uTime.value = time; },
  };
}

/**
 * Radiance probe for image-based lighting: the real sky over a dark ground
 * disc, prefiltered with PMREM. Needs a live renderer; the caller disposes it.
 */
export function bakeNightEnvironment(renderer: THREE.WebGLRenderer, dome: THREE.Mesh, ground: THREE.ColorRepresentation, extras: THREE.Object3D[] = []) {
  const probe = new THREE.Scene();
  const sky = new THREE.Mesh(dome.geometry, dome.material);
  sky.frustumCulled = false;
  const floorMaterial = new THREE.MeshBasicMaterial({ color: ground, side: THREE.DoubleSide });
  const floor = new THREE.Mesh(new THREE.CircleGeometry(60, 48), floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.5;
  probe.add(sky, floor, ...extras);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(probe, 0.03, 0.1, 200);
  pmrem.dispose();
  floor.geometry.dispose(); floorMaterial.dispose();
  return target;
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
