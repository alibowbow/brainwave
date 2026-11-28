import * as THREE from 'three';
import { VOLUME_PRELUDE, type VolumeEffect } from '../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../shared/render/targets';

/*
 * Drifting space dust around the floating garden for the shared HDR
 * pipeline's half-resolution volume pass (original implementation).
 *  - A thin dust layer at garden height, lit by the key star with a two-lobe
 *    Henyey-Greenstein phase, so it glows toward the star side.
 *  - Real light shafts: every step tests analytic ellipsoid occluders (the
 *    floating islands) along the ray to the star, so their shadows streak
 *    through the dust.
 *  - Mist where the small waterfalls dissolve off the island edges.
 *  - A dim nebula-coloured ambient term so shadowed dust is never black.
 * At most 32 steps (fewer on the reduced quality tier), exponentially spaced.
 */

export const MAX_DUST_STEPS = 32;
export const MAX_OCCLUDERS = 8;
export const MAX_MIST = 4;

const FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
precision highp sampler3D;
uniform sampler3D uNoise;
uniform vec3 uSun;
uniform vec3 uSunColor;
uniform vec3 uAmbient;
uniform vec4 uOccluders[${MAX_OCCLUDERS}];
uniform vec4 uMist[${MAX_MIST}];
uniform float uDensity;
uniform float uSteps;
uniform float uMaxDistance;
float dustNoise(vec3 p) { return dot(texture(uNoise, p), vec4(.5, .27, .15, .08)); }
float sunVisibility(vec3 p) {
  float visible = 1.0;
  for (int i = 0; i < ${MAX_OCCLUDERS}; i++) {
    vec4 o = uOccluders[i];
    if (o.w <= 0.0) continue;
    // Ellipsoids squashed vertically: scale space, then a ray-sphere closest approach.
    vec3 scale = vec3(1.0, 1.55, 1.0);
    vec3 q = (p - o.xyz) * scale;
    vec3 d = normalize(uSun * scale);
    float along = -dot(q, d);
    if (along < 0.0) continue;
    float miss = sqrt(max(dot(q, q) - along * along, 0.0));
    visible *= smoothstep(o.w * .62, o.w * 1.08, miss);
  }
  return visible;
}
// Share of the current sample's density that is waterfall mist (set by density()).
float gMistShare = 0.0;
float density(vec3 p, float t) {
  // Dust gathers around the garden; open space beyond stays clear.
  float layer = exp(-max(p.y - 2.5, 0.0) / 2.6 - max(-5.0 - p.y, 0.0) / 5.0) * exp(-max(length(p.xz - vec2(0.0, -18.0)) - 22.0, 0.0) / 14.0);
  vec3 drift = vec3(uTime * .0028, uTime * .0007, uTime * .0016);
  float broad = dustNoise(p * .021 + drift);
  float detail = dustNoise(p * .085 + drift * 3.0 + 4.7);
  // Patchy drifting veils with clear gaps, so lit dust and shadow shafts read as structure.
  float d = uDensity * layer * (.12 + 2.4 * pow(smoothstep(.42, .72, broad * .6 + detail * .4), 1.5));
  // Clear air around the seat: only long paths between islands gather haze,
  // so the sky overhead stays crisp.
  d *= smoothstep(5.0, 24.0, t);
  float mist = 0.0;
  for (int i = 0; i < ${MAX_MIST}; i++) {
    vec4 m = uMist[i];
    if (m.w <= 0.0) continue;
    // A tall plume: spray hangs under the fall and billows as it drifts down.
    vec3 o = (p - m.xyz) / vec3(m.w, m.w * 1.8, m.w);
    float puff = exp(-dot(o, o) * 1.6);
    mist += puff * .42 * (.45 + detail);
  }
  gMistShare = mist / max(d + mist, 1e-5);
  return d + mist;
}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, uMaxDistance);
  float cosTheta = dot(rd, uSun);
  float phase = (bwPhase(cosTheta, .62) * .7 + bwPhase(cosTheta, .05) * .3) * 12.5663706;
  // Static per-pixel jitter: there is no temporal accumulation, so a moving
  // pattern would shimmer; the depth-aware blur hides the fixed one.
  float jitter = bwIgn(gl_FragCoord.xy);
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  float previous = 0.0;
  for (int i = 0; i < ${MAX_DUST_STEPS}; i++) {
    if (float(i) >= uSteps) break;
    float s = (float(i) + jitter) / uSteps;
    float t = maxT * s * s;
    float dt = max(t - previous, 1e-3);
    previous = t;
    vec3 p = ro + rd * t;
    float sigma = density(p, t);
    if (sigma < 1e-5) continue;
    // Dense spray scatters many times: it glows white from every side, not
    // only toward the star.
    vec3 radiance = uSunColor * (phase + gMistShare * 1.5) * sunVisibility(p) + uAmbient * (1.0 + gMistShare * 2.5);
    float stepT = exp(-sigma * dt);
    scatter += transmittance * radiance * (1.0 - stepT);
    transmittance *= stepT;
  }
  gl_FragColor = vec4(scatter, transmittance);
}
`;

export interface DustOptions {
  noise: THREE.Data3DTexture;
  sun: THREE.Vector3;
  sunColor: THREE.Color;
  ambient: THREE.Color;
  density: number;
  maxDistance: number;
}

export interface DustVolume extends VolumeEffect {
  /** Island occluders (xyz centre, w radius) and mist puffs, updated per frame. */
  occluders: THREE.Vector4[];
  mist: THREE.Vector4[];
  setSteps(steps: number): void;
}

export function createDustVolume(options: DustOptions): DustVolume {
  const occluders = Array.from({ length: MAX_OCCLUDERS }, () => new THREE.Vector4(0, 0, 0, 0));
  const mist = Array.from({ length: MAX_MIST }, () => new THREE.Vector4(0, 0, 0, 0));
  const material = new THREE.ShaderMaterial({
    vertexShader: FULLSCREEN_VERTEX,
    fragmentShader: FRAGMENT,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    uniforms: {
      uNoise: { value: options.noise },
      uSun: { value: options.sun.clone().normalize() },
      uSunColor: { value: new THREE.Vector3(options.sunColor.r, options.sunColor.g, options.sunColor.b) },
      uAmbient: { value: new THREE.Vector3(options.ambient.r, options.ambient.g, options.ambient.b) },
      uOccluders: { value: occluders },
      uMist: { value: mist },
      uDensity: { value: options.density },
      uSteps: { value: MAX_DUST_STEPS },
      uMaxDistance: { value: options.maxDistance },
    },
  });
  return {
    material,
    occluders,
    mist,
    setSteps(steps: number) {
      material.uniforms.uSteps.value = THREE.MathUtils.clamp(Math.round(steps), 4, MAX_DUST_STEPS);
    },
  };
}
