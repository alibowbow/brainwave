import * as THREE from 'three';

/*
 * Thin twilight cloud streaks for a night sky (original). One camera-centred
 * dome drawn just in front of the stars and behind all geometry, blended over
 * the sky: stratus streaks projected on a cloud plane (so they stretch and
 * crowd toward the horizon), read from the shared tileable noise volume, lit
 * rose on the side of the afterglow and shaded violet away from it, with a
 * silver edge where they pass near the moon. They drift very slowly.
 * Cost: two noise-volume fetches per sky pixel; no extra pass.
 */

export interface NightCloudOptions {
  noise: THREE.Data3DTexture;
  /** Horizontal direction of the afterglow (the set sun). */
  glowDirection: THREE.Vector3;
  moonDirection: THREE.Vector3;
  /** Linear radiance of cloud lit by the afterglow, in shade, and near the moon. */
  lit: THREE.Color;
  shade: THREE.Color;
  moon: THREE.Color;
  /** 0..1 of the band covered by cloud. */
  cover: number;
}

const VERTEX = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 clip = projectionMatrix * viewMatrix * vec4(cameraPosition + position * 380.0, 1.0);
  // In front of the star field, behind every piece of geometry.
  clip.z = clip.w * 0.999998;
  gl_Position = clip;
}
`;

const FRAGMENT = /* glsl */ `
precision highp sampler3D;
uniform sampler3D uNoise;
uniform float uTime;
uniform vec3 uGlowDir;
uniform vec3 uMoonDir;
uniform vec3 uLit;
uniform vec3 uShade;
uniform vec3 uMoonLight;
uniform float uCover;
varying vec3 vDir;
void main() {
  vec3 dir = normalize(vDir);
  float h = dir.y;
  if (h <= 0.0) discard;
  // A cloud plane: streaks foreshorten and crowd toward the horizon.
  vec2 q = dir.xz / (h + 0.08) * 0.22;
  float t = uTime;
  float broad = texture(uNoise, vec3(q.x * 0.45 + t * 0.0016, q.y * 1.7, 0.21 + t * 0.0006)).r;
  float fine = texture(uNoise, vec3(q.x * 1.4 - t * 0.0011, q.y * 4.3 + 0.4, 0.63)).g;
  float n = broad * 0.68 + fine * 0.42;
  float density = smoothstep(1.02 - uCover, 1.25 - uCover, n);
  // Lost in the horizon haze below, thinning out toward the zenith.
  density *= smoothstep(0.015, 0.09, h) * (1.0 - smoothstep(0.32, 0.75, h));
  if (density < 0.003) discard;
  float toward = dot(normalize(vec3(dir.x, 0.0, dir.z) + 1e-5), uGlowDir) * 0.5 + 0.5;
  vec3 color = mix(uShade, uLit, pow(toward, 2.4) * (1.0 - 0.55 * smoothstep(0.04, 0.35, h)));
  // Thin edges let more light through: brighter rims around each streak.
  color *= 0.75 + 0.6 * (1.0 - smoothstep(0.0, 0.6, density));
  float m = max(dot(dir, uMoonDir), 0.0);
  color += uMoonLight * (pow(m, 80.0) * 1.2 + pow(m, 10.0) * 0.08) * (1.2 - density);
  gl_FragColor = vec4(color, clamp(density, 0.0, 0.9));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const vec = (c: THREE.Color) => new THREE.Vector3(c.r, c.g, c.b);

export function createNightClouds(o: NightCloudOptions) {
  const uniforms = {
    uNoise: { value: o.noise },
    uTime: { value: 0 },
    uGlowDir: { value: new THREE.Vector3(o.glowDirection.x, 0, o.glowDirection.z).normalize() },
    uMoonDir: { value: o.moonDirection.clone().normalize() },
    uLit: { value: vec(o.lit) },
    uShade: { value: vec(o.shade) },
    uMoonLight: { value: vec(o.moon) },
    uCover: { value: o.cover },
  };
  const material = new THREE.ShaderMaterial({
    uniforms, vertexShader: VERTEX, fragmentShader: FRAGMENT, transparent: true, depthWrite: false, side: THREE.BackSide,
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 20, 0, Math.PI * 2, 0, Math.PI * 0.5), material);
  dome.name = 'Twilight cloud streaks';
  dome.frustumCulled = false;
  dome.renderOrder = -1;
  return { mesh: dome, uniforms };
}
