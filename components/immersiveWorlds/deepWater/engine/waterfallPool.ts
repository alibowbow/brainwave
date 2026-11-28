import * as THREE from 'three';
import type { WaterfallTextures } from './waterfallTextures';
import type { FlowUniforms } from './waterfallFlow';

/*
 * Surface shader for the plunge pool, used through createPool's `surface`
 * option (the cave keeps its own). It never renders a frozen mirror:
 *  - dispersive ripple trains radiate from the plunge (deep-water relation
 *    w = sqrt(g k)) with irregular fronts, fading with distance;
 *  - a churn normal map and foam are advected outward along a procedural
 *    radial flowmap with two-phase blending, so nothing stretches;
 *  - the mirror is broken and smeared near the fall and calms far away;
 *  - the water is clear: a procedural stony bed is seen through refraction
 *    with depth absorption, caustics in the shallows, darker in the middle.
 */

export const WATERFALL_POOL_FRAGMENT = /* glsl */ `
uniform vec3 color;
uniform vec3 deepColor;
uniform sampler2D tDiffuse;
uniform float time;
uniform float rippleClock;
uniform vec4 rings[4];
uniform float rippleStrength;
uniform vec3 glowColor;
uniform vec3 lightDirection;
uniform float glint;
uniform sampler2D tWater;
uniform sampler2D tRipple;
uniform sampler2D tBed;
uniform vec3 uFoot;
uniform vec3 uSunColor;
uniform vec3 uSkyColor;
uniform float uSurge;
uniform vec3 uWind;
varying vec4 reflectionCoord;
varying vec3 poolWorld;

// Two-phase flowmap sample: two copies offset in time by half a cycle, each
// reset while its weight is zero. Returns the blend and its weight.
vec4 advect(sampler2D map, vec2 uv, vec2 flow, float cycle, float offset, out float w) {
  float ph0 = fract(time / cycle + offset), ph1 = fract(time / cycle + offset + 0.5);
  vec4 a = texture2D(map, uv - flow * ph0 * cycle);
  vec4 b = texture2D(map, uv - flow * ph1 * cycle + vec2(0.37, 0.61));
  w = abs(1.0 - 2.0 * ph0);
  return mix(a, b, w);
}
// Undo the contrast lost when two uniform patterns are averaged.
float restore(float v, float w) { return clamp(0.5 + (v - 0.5) / max(sqrt(w * w + (1.0 - w) * (1.0 - w)), 0.5), 0.0, 1.0); }

float bedDepth(vec2 p) {
  // Matches the bank meshes: they cross the waterline about 1.6 m beyond their toe.
  float left = 4.6 + 0.9 * sin(p.y * 0.24 - 1.0) + 1.2 * sin(p.y * 0.1);
  float right = 4.6 + 0.9 * sin(p.y * 0.24 + 1.0) + 1.2 * sin(p.y * 0.1);
  float shore = (p.x < 0.0 ? left + p.x : right - p.x) + 1.62;
  float d = shore * 0.29 + max(shore - 1.6, 0.0) * 0.3;
  // Shelving up toward the stone ledge below the viewer, deepening into the plunge pool.
  d *= mix(1.0, 0.36, smoothstep(-8.0, 5.5, p.y));
  vec2 f = p - uFoot.xz;
  d += 2.6 * exp(-dot(f, f) / 40.0);
  return clamp(d, 0.0, 4.0);
}

vec2 calmSlope(vec2 p, float t) {
  vec2 s = vec2(cos(p.x * 2.1 + p.y * 0.72 + t * 0.42) * 0.016 + cos(p.x * 5.3 - p.y * 3.1 - t * 0.3) * 0.006, sin(p.y * 2.8 + p.x * 0.56 - t * 0.27) * 0.014);
  s += vec2(cos(p.x * 11.3 + p.y * 7.1 + t * 0.9), sin(p.y * 12.7 - p.x * 5.9 - t * 0.8)) * 0.004;
  return s;
}

void main() {
  vec2 p = poolWorld.xz;
  vec2 toFoot = p - uFoot.xz;
  float d = length(toFoot);
  vec2 radial = toFoot / max(d, 0.001);
  vec2 swirl = vec2(-radial.y, radial.x);
  float agit = exp(-d * 0.17);
  float near = exp(-d * 0.5);
  // Outflow from the plunge: fast near the fall, a slow drift toward the outlet beyond.
  vec2 flow = radial * (0.12 + 1.05 * exp(-d * 0.13)) + swirl * 0.1 * exp(-d * 0.08) + vec2(uWind.x * 0.15, 0.05);

  // Wind gusts: patches of finer ripples sliding across the calm water.
  float gust = smoothstep(0.35, 0.85, texture2D(tWater, p * 0.035 + uWind.xz * time * 0.03).b);

  vec2 slope = calmSlope(p, time) * (0.6 + 0.6 * gust);
  // Ripple trains: four wavelengths, each with its own deep-water speed, so the
  // trains disperse into packets. Fronts wobble with a static irregularity.
  float dw = d + (texture2D(tRipple, p * 0.045).b - 0.5) * 1.8;
  // Longer waves carry farther and stay readable once foreshortened.
  float train = cos(dw * 3.1 - time * 5.51 + 2.1) * 3.1 * 0.9
              + cos(dw * 5.2 - time * 7.14) * 5.2 * 0.6
              + cos(dw * 8.1 - time * 8.91 + 1.3) * 8.1 * 0.22
              + cos(dw * 12.3 - time * 10.98 + 0.7) * 12.3 * 0.08;
  float amp = 0.011 * exp(-d * 0.025) / sqrt(1.0 + d * 0.2) * (0.7 + 0.5 * uSurge);
  slope += radial * train * amp;
  // Churn: a slope map carried out by the flow, violent near the plunge.
  float wn;
  vec4 churn = advect(tRipple, p * 0.42, flow * 0.42, 1.4, 0.0, wn);
  // Renormalised so the cross-fade never pulses the chop's strength.
  slope += (churn.rg - 0.5) / max(sqrt(wn * wn + (1.0 - wn) * (1.0 - wn)), 0.5) * 0.69 * (0.1 + 0.22 * gust + 1.25 * agit);

  // Touch ripples (unchanged behaviour).
  float ringLight = 0.0;
  for (int i = 0; i < 4; i++) {
    float age = rippleClock - rings[i].z;
    vec2 delta = p - rings[i].xy;
    float rd = length(delta);
    float front = rd - age * 1.3;
    float env = exp(-front * front * 2.8) * exp(-age * 0.72) * rings[i].w * step(0.0, age);
    slope += delta / max(rd, 0.01) * cos(front * 15.0) * env * 0.075;
    ringLight += sin(front * 15.0) * env * 0.02;
  }
  slope *= rippleStrength;

  // Foam: dense lace at the impact; beyond it, soft rafts with lace inside,
  // all carried outward on the flow.
  float wf, wp;
  vec4 foamTex = advect(tWater, p * 0.3, flow * 0.3, 1.7, 0.25, wf);
  float raft = restore(advect(tWater, p * 0.075, flow * 0.075, 5.0, 0.6, wp).b, wp);
  float lace = restore(foamTex.r, wf);
  float dense = clamp(near * 1.5 + agit * 0.12, 0.0, 1.0);
  float foam = smoothstep(1.0 - dense, 1.0 - dense + 0.2, lace) * smoothstep(0.0, 0.04, dense);
  // Rafts break up before they reach the near, shallow water.
  float rafts = smoothstep(0.66, 0.95, raft) * exp(-d * 0.07) * (1.0 - smoothstep(9.0, 17.0, d));
  foam = max(foam, rafts * smoothstep(0.45, 0.9, lace) * 0.6);
  foam = max(foam, smoothstep(0.55, 0.95, near));
  float bubbles = foamTex.g * smoothstep(0.08, 0.5, agit) * (1.0 - foam);
  // Foam smooths the surface it rides on.
  slope *= 1.0 - 0.6 * foam;

  vec3 N = normalize(vec3(-slope.x, 1.0, -slope.y));
  vec3 V = normalize(cameraPosition - poolWorld);
  float cosV = max(dot(N, V), 0.0);
  float fresnel = 0.02 + 0.98 * pow(1.0 - cosV, 5.0);

  // Reflection: displaced by the slope, strongly and with a vertical smear near the fall.
  vec2 ruv = reflectionCoord.xy / reflectionCoord.w;
  float disturb = 0.08 + 0.4 * agit;
  vec2 offset = slope * disturb * vec2(1.0, 1.7);
  float smear = 0.0015 + 0.012 * agit;
  vec3 reflected = texture2D(tDiffuse, clamp(ruv + offset, vec2(0.002), vec2(0.998))).rgb * 0.5
    + texture2D(tDiffuse, clamp(ruv + offset + vec2(0.0, smear), vec2(0.002), vec2(0.998))).rgb * 0.25
    + texture2D(tDiffuse, clamp(ruv + offset - vec2(0.0, smear * 1.6), vec2(0.002), vec2(0.998))).rgb * 0.25;

  // Clear water: refract to the bed, absorb along the path, add scattered light.
  vec3 T = refract(-V, N, 0.75);
  float depth = bedDepth(p);
  float down = max(-T.y, 0.18);
  float travel = depth / down;
  vec2 bedP = p + T.xz * travel;
  // Stones, with broad patches of darker and paler bed so the tile never repeats visibly.
  vec3 bed = texture2D(tBed, bedP * 0.21).rgb * (0.55 + 0.75 * texture2D(tWater, bedP * 0.023 + 0.3).b);
  float c1 = texture2D(tWater, bedP * 0.23 + vec2(time * 0.021, time * 0.013)).a;
  float c2 = texture2D(tWater, bedP * 0.31 + vec2(-time * 0.017, time * 0.019) + 0.5).a;
  float caustic = (c1 + c2) * 0.65 * exp(-depth * 0.5) * (1.0 - agit);
  float sunDown = exp(-depth * 0.32);
  vec3 bedLit = bed * (uSunColor * 0.5 * sunDown * (0.55 + caustic) * lightDirection.y + uSkyColor * 0.4);
  vec3 absorb = vec3(0.7, 0.3, 0.38);
  vec3 transmit = exp(-absorb * (travel + depth));
  vec3 under = bedLit * transmit + deepColor * 1.5 * (1.0 - exp(-0.45 * travel));
  // Air carried down by the fall makes the plunge water milky and bright.
  under = mix(under, glowColor * 0.5 * (0.85 + 0.25 * uSurge), clamp(agit * 1.25 - 0.05, 0.0, 1.0) * 0.6);

  vec3 light = mix(under, reflected, fresnel);
  vec3 foamColor = uSunColor * 0.58 * clamp(lightDirection.y + 0.15, 0.0, 1.0) + uSkyColor * 0.8;
  light = mix(light, foamColor * (0.78 + 0.25 * lace), foam * 0.94);
  light += foamColor * bubbles * 0.6;
  light += ringLight * (color + glowColor * near);
  vec3 h = normalize(lightDirection + V);
  light += uSunColor * glint * pow(max(dot(N, h), 0.0), 320.0) * (1.0 - foam);
  gl_FragColor = vec4(light, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export function waterfallPoolUniforms(textures: WaterfallTextures, flow: FlowUniforms): Record<string, THREE.IUniform> {
  return {
    tWater: { value: textures.water }, tRipple: { value: textures.ripple }, tBed: { value: textures.bed },
    uFoot: flow.foot, uSunColor: flow.sunColor, uSkyColor: flow.skyColor, uSurge: flow.surge, uWind: flow.wind,
  };
}
