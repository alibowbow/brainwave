import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { GLSL_CANOPY_LIGHT, WATER_LEVEL, type ForestLightUniforms } from './forestLight';
import { GLSL_GROUND } from './forestMath';

/*
 * The pool: a planar reflection kept crisp (tiny, analytic wavelets rather
 * than a blurring flow), Fresnel-weighted against what lies below. Depth
 * along the refracted ray decides how much of the bed shows; the bed itself
 * carries caustics and absorption in its own material. Sunlit patches of
 * water glitter where the wavelets tilt the sun toward the viewer.
 */

const WATER_FRAGMENT = /* glsl */ `
uniform sampler2D tDiffuse;
uniform float time;
uniform vec3 ripple;
uniform vec3 uSunRadiance;
varying vec4 vReflection;
varying vec3 vWorld;
${GLSL_GROUND}
${GLSL_CANOPY_LIGHT}
// Gentle wavelets: a few directional trains, each with an analytic gradient.
vec2 waveGradient(vec2 p, float t) {
  vec2 g = vec2(0.0);
  const int N = 7;
  for (int i = 0; i < N; i++) {
    float fi = float(i);
    float angle = fi * 2.39996 + 0.4;
    vec2 k = vec2(cos(angle), sin(angle)) * (7.0 + fi * 4.3);
    float amplitude = 0.0007 / (1.0 + fi * 0.45);
    float w = sqrt(9.81 * length(k)) * 0.22;
    g += k * amplitude * cos(dot(k, p) - w * t + fi * 1.7);
  }
  return g;
}
void main() {
  vec2 p = vWorld.xz;
  vec2 g = waveGradient(p, time);
  // A touch sends one slow ring across the pool.
  float age = time - ripple.z;
  vec2 rd = p - ripple.xy;
  float dist = length(rd);
  float front = dist - age * 0.42;
  float ring = cos(front * 24.0) * exp(-front * front * 7.0) * exp(-age * 0.75) * step(0.0, age);
  g += rd / max(dist, 1e-3) * ring * 0.06;
  vec3 n = normalize(vec3(-g.x, 1.0, -g.y));
  vec3 toEye = cameraPosition - vWorld;
  float eyeDistance = length(toEye);
  vec3 v = toEye / eyeDistance;
  float cosV = max(dot(n, v), 0.0);
  float fresnel = 0.02 + 0.98 * pow(1.0 - cosV, 5.0);
  // Reflection: distortion grows with the wavelet slope, shrinks with distance.
  vec2 uv = vReflection.xy / vReflection.w + g * (0.35 / (1.0 + eyeDistance * 0.3));
  vec3 reflected = texture2D(tDiffuse, uv).rgb;
  // Refracted path length through the water column decides what of the bed shows.
  float depth = max(${WATER_LEVEL.toFixed(3)} - forestGroundHeight(p), 0.0);
  float cosT = sqrt(max(1.0 - (1.0 - cosV * cosV) / 1.777, 0.04));
  float transmit = exp(-depth / cosT * 1.25);
  float lit = forestCanopyLight(vec3(p.x, ${WATER_LEVEL.toFixed(3)}, p.y));
  // Suspended tannin and silt scatter a little light back up, warmer in the sun.
  vec3 body = vec3(0.012, 0.016, 0.008) + uSunRadiance * vec3(0.016, 0.014, 0.007) * lit;
  float alpha = fresnel + (1.0 - fresnel) * (1.0 - transmit);
  vec3 color = reflected * fresnel + body * (1.0 - fresnel) * (1.0 - transmit);
  // Sun glitter on sunlit water.
  vec3 h = normalize(v + uForestSun);
  float spec = pow(max(dot(n, h), 0.0), 1400.0) * 160.0 + pow(max(dot(n, h), 0.0), 160.0) * 0.25;
  color += uSunRadiance * spec * lit * fresnel * 4.0;
  // Feather the edge against the bank so the waterline reads as wet mud.
  float edge = smoothstep(0.0, 0.03, depth);
  gl_FragColor = vec4(color * edge, alpha * edge);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export function createForestWater(uniforms: ForestLightUniforms) {
  const shape = new THREE.Shape();
  for (let i = 0; i <= 120; i++) {
    const a = i / 120 * Math.PI * 2, r = 1.04 + 0.045 * Math.sin(a * 5) + 0.025 * Math.sin(a * 9);
    const x = Math.cos(a) * 2.6 * r - 0.18, y = Math.sin(a) * 3.48 * r + 0.55;
    if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
  }
  const shader = {
    name: 'ForestWater',
    uniforms: { color: { value: new THREE.Color('#ffffff') }, tDiffuse: { value: null }, textureMatrix: { value: new THREE.Matrix4() }, time: { value: 0 }, ripple: { value: new THREE.Vector3(0, 0, -100) } },
    vertexShader: 'uniform mat4 textureMatrix; varying vec4 vReflection; varying vec3 vWorld; void main(){vReflection=textureMatrix*vec4(position,1.); vWorld=(modelMatrix*vec4(position,1.)).xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: WATER_FRAGMENT,
  };
  const reflection = new Reflector(new THREE.ShapeGeometry(shape, 64), { textureWidth: 1024, textureHeight: 1024, clipBias: 0.003, multisample: 0, shader });
  reflection.rotation.x = -Math.PI / 2; reflection.position.y = WATER_LEVEL;
  const material = reflection.material as THREE.ShaderMaterial;
  // Shared uniform objects, assigned after construction (the Reflector clones its initial uniforms).
  Object.assign(material.uniforms, {
    uForestCookie: uniforms.uForestCookie, uForestCookieRect: uniforms.uForestCookieRect,
    uForestSun: uniforms.uForestSun, uSunRadiance: uniforms.uForestSunRadiance,
  });
  material.transparent = true; material.depthWrite = false;
  material.blending = THREE.CustomBlending;
  material.blendSrc = THREE.OneFactor; material.blendDst = THREE.OneMinusSrcAlphaFactor;
  material.blendSrcAlpha = THREE.OneFactor; material.blendDstAlpha = THREE.OneMinusSrcAlphaFactor;
  reflection.renderOrder = 1;
  return reflection;
}
