import * as THREE from 'three';
import { GLSL_NOISE } from './glsl';
import { GLASS_BOTTOM } from './layout';

/*
 * The window pane. Clear glass shows the defocused city; each bead of water
 * is a tiny ball lens that shows a sharp, inverted, minified city with dark
 * total-internal-reflection rims and warm glints from the desk lamp. The
 * inner surface faintly mirrors the lit room.
 */

const VERTEX = /* glsl */ `
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform sampler2D tWater;
uniform vec4 uWaterRect;
uniform vec2 uWaterTexel;
uniform vec2 uTexelMM;
uniform float uHasWater;
uniform sampler2D tCityBlur;
uniform sampler2D tCitySharp;
uniform mat4 uCityViewProj;
uniform float uCityAspect;
uniform vec3 uLampPos;
uniform vec3 uLampColor;
uniform sampler2D tReflection;
uniform mat4 uReflectionMatrix;
uniform float uReflectionStrength;
uniform float uRefraction;
uniform float uFlash;
uniform float uTime;
uniform float uDebug;
varying vec3 vWorld;

vec2 cityUv(vec3 dir) {
  vec4 clip = uCityViewProj * vec4(dir, 0.0);
  return clip.xy / clip.w * 0.5 + 0.5;
}

float heightAt(vec2 uv) {
  vec2 s = texture2D(tWater, uv).rg;
  return s.r + s.g;
}

void main() {
  vec3 view = normalize(vWorld - cameraPosition);
  vec2 uv = cityUv(view);
  vec2 aspectFix = vec2(1.0 / uCityAspect, 1.0);

  vec2 wuv = (vWorld.xy - uWaterRect.xy) / (uWaterRect.zw - uWaterRect.xy);
  vec2 water = texture2D(tWater, wuv).rg * uHasWater;
  float hL = heightAt(wuv - vec2(uWaterTexel.x, 0.0));
  float hR = heightAt(wuv + vec2(uWaterTexel.x, 0.0));
  float hD = heightAt(wuv - vec2(0.0, uWaterTexel.y));
  float hU = heightAt(wuv + vec2(0.0, uWaterTexel.y));
  vec2 slope = vec2(hR - hL, hU - hD) / (2.0 * uTexelMM) * uHasWater;

  // Water pools in a wavering line along the bottom of the pane.
  float sillY = vWorld.y - ${GLASS_BOTTOM.toFixed(4)};
  float pool = (1.0 - smoothstep(0.0, 0.006 + 0.004 * vnoise(vec2(vWorld.x * 40.0, uTime * 0.2)), sillY)) * uHasWater;
  slope.y += pool * 0.5 * (vnoise(vec2(vWorld.x * 90.0, 3.0)) - 0.3);

  if (uDebug > 0.5) {
    gl_FragColor = vec4(water.r * 1.5, water.g * 15.0, length(slope) * 0.25, 1.0);
    return;
  }
  float drop = smoothstep(0.012, 0.06, water.r);
  float rivulet = smoothstep(0.008, 0.05, water.g) * (1.0 - drop);
  float wet = clamp(drop + rivulet + pool * 0.6, 0.0, 1.0);
  float steep = length(slope);
  vec3 normal = normalize(vec3(-slope, 1.0));

  // Clear glass: the defocused city.
  vec3 through = texture2D(tCityBlur, uv).rgb;

  // Water is a lens: beads and rivulets show a sharp, inverted, minified city
  // (rivulets squeeze it into bright vertical threads).
  vec2 lens = -slope * uRefraction;
  vec3 focused = texture2D(tCitySharp, uv + lens * aspectFix).rgb;
  vec3 soft = texture2D(tCityBlur, uv + lens * 0.45 * aspectFix).rgb;
  vec3 inWater = mix(focused, soft, 0.3) * 1.18;
  float rim = smoothstep(1.4, 2.8, steep);
  inWater *= 1.0 - 0.62 * rim;
  vec3 color = mix(through, inWater, wet);
  color *= vec3(0.93, 0.965, 0.96);

  // Warm glints from the desk lamp, front and back surface of each bead.
  vec3 toLamp = uLampPos - vWorld;
  float lampFalloff = 1.0 / (dot(toLamp, toLamp) * 30.0 + 0.3);
  // Thin beads catch only a faint point of light; full drops flash.
  float glintBody = 0.25 + 0.75 * smoothstep(0.1, 0.9, water.r + water.g);
  vec3 halfway = normalize(normalize(toLamp) - view);
  float front = pow(max(dot(normal, halfway), 0.0), 260.0) * 3.2 + pow(max(dot(normal, halfway), 0.0), 36.0) * 0.06;
  vec3 backNormal = normalize(vec3(slope, 1.0));
  float back = pow(max(dot(backNormal, halfway), 0.0), 90.0) * 0.5;
  color += uLampColor * (front + back) * wet * glintBody * lampFalloff;

  // Dust and smudges on the pane catch the lamp.
  float grime = fbm(vWorld.xy * vec2(7.0, 10.0));
  color += uLampColor * 0.0035 * lampFalloff * smoothstep(0.35, 0.9, grime);

  // Faint reflection of the lit room in the inner surface.
  vec4 projected = uReflectionMatrix * vec4(vWorld, 1.0);
  vec3 room = texture2D(tReflection, projected.xy / projected.w).rgb;
  float cosTheta = abs(view.z);
  float fresnel = 0.04 + 0.96 * pow(1.0 - cosTheta, 5.0);
  color += room * fresnel * uReflectionStrength * (0.75 + 0.5 * grime);

  color += vec3(0.55, 0.68, 1.0) * uFlash * (0.012 + wet * 0.08);
  gl_FragColor = vec4(color, 1.0);
}
`;

export const createGlassMaterial = () => new THREE.ShaderMaterial({
  vertexShader: VERTEX,
  fragmentShader: FRAGMENT,
  uniforms: {
    tWater: { value: null },
    uWaterRect: { value: new THREE.Vector4(0, 0, 1, 1) },
    uWaterTexel: { value: new THREE.Vector2(1, 1) },
    uTexelMM: { value: new THREE.Vector2(1, 1) },
    uHasWater: { value: 0 },
    tCityBlur: { value: null },
    tCitySharp: { value: null },
    uCityViewProj: { value: new THREE.Matrix4() },
    uCityAspect: { value: 1 },
    uLampPos: { value: new THREE.Vector3() },
    uLampColor: { value: new THREE.Color(1, 0.7, 0.4) },
    tReflection: { value: null },
    uReflectionMatrix: { value: new THREE.Matrix4() },
    uReflectionStrength: { value: 0 },
    uRefraction: { value: 0.1 },
    uFlash: { value: 0 },
    uTime: { value: 0 },
    uDebug: { value: 0 },
  },
});
