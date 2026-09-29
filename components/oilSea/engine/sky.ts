import * as THREE from 'three';

/** Sin-free hashes and value noise, stable on mobile GPUs. */
export const NOISE_GLSL = /* glsl */ `
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 hash22(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x), mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    sum += amp * vnoise(p);
    p = mat2(1.6, 1.2, -1.2, 1.6) * p + vec2(17.3, -9.1);
    amp *= 0.5;
  }
  return sum;
}
float fbm3(vec2 p) {
  float sum = 0.5 * vnoise(p);
  p = mat2(1.6, 1.2, -1.2, 1.6) * p + vec2(17.3, -9.1);
  sum += 0.25 * vnoise(p);
  p = mat2(1.6, 1.2, -1.2, 1.6) * p + vec2(17.3, -9.1);
  return sum + 0.125 * vnoise(p);
}
`;

/*
 * The evening sky as a function of direction: gold low towards the sun,
 * peach higher up, rose away from it, a pale lilac blue overhead, and the
 * sun's glow. The water mirrors this (without the clouds) and distant land
 * fades into it.
 */
export const SKY_GLSL = /* glsl */ `
uniform vec3 uSunDir;
uniform float uTime;

// glow scales the sun's halo (the water mirrors less of it than the eye sees).
vec3 skyLight(vec3 dir, float glow) {
  float h = max(dir.y, 0.0);
  float toSun = max(dot(dir, uSunDir), 0.0);
  vec3 col = mix(vec3(0.8, 0.78, 0.82), vec3(1.0, 0.83, 0.64), pow(1.0 - h, 7.0));
  col = mix(col, vec3(1.0, 0.78, 0.5), pow(1.0 - h, 24.0));
  // Warmer and brighter towards the sun, rose along the horizon away from it.
  float side = pow(toSun, 3.0);
  col = mix(col, vec3(1.0, 0.72, 0.42), side * pow(1.0 - h, 6.0) * 0.7);
  col = mix(col, vec3(0.96, 0.7, 0.64), (1.0 - side) * pow(1.0 - h, 16.0) * 0.35);
  col += vec3(1.0, 0.74, 0.36) * pow(toSun, 6.0) * 0.24 * glow;
  col += vec3(1.0, 0.86, 0.52) * pow(toSun, 30.0) * 0.36 * glow;
  col += vec3(1.0, 0.95, 0.76) * pow(toSun, 220.0) * 0.9 * glow;
  col += vec3(1.0, 0.98, 0.88) * pow(toSun, 1400.0) * 1.2 * glow;
  return col;
}
vec3 skyBase(vec3 dir) { return skyLight(dir, 1.0); }

// The sun itself: a bright disc blooming into the glow around it.
vec3 sunDisc(vec3 dir) {
  float toSun = max(dot(dir, uSunDir), 0.0);
  return vec3(1.0, 0.93, 0.7) * (smoothstep(0.99962, 0.9998, toSun) * 1.7 + pow(toSun, 2500.0) * 0.9 + pow(toSun, 350.0) * 0.6);
}
`;

export function createSky(sunDirection: THREE.Vector3) {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSunDir: { value: sunDirection },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = p.xyww;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vDir;
      ${SKY_GLSL}
      void main() {
        vec3 dir = normalize(vDir);
        dir.y = max(dir.y, 0.0);
        gl_FragColor = vec4(skyBase(dir) + sunDisc(dir), 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24), material);
  mesh.frustumCulled = false;
  mesh.renderOrder = -1;
  return { mesh, material };
}
