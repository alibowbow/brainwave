import * as THREE from 'three';
import { VOLUME_PRELUDE, type PostSettings, type VolumeEffect } from '../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../shared/render/targets';
import { GLSL_CANOPY_LIGHT, SUN_COLOR, SUN_DIRECTION, SUN_INTENSITY, type ForestLightUniforms } from './forestLight';

/*
 * Sky, ambient radiance and air for the morning forest. The sky is HDR (the
 * sun disc is ~60x the sky), so bloom and the tone curve have real range. The
 * ambient probe is what a point under the canopy sees: dark green leaves with
 * bright gaps toward the sun and a dark floor, not the open sky. The volume
 * pass integrates sun shafts through the same canopy cookie as the surfaces,
 * plus low mist and warm aerial perspective that layers the far trunks.
 */

export const SKY_FRAGMENT = /* glsl */ `
uniform vec3 uSun;
varying vec3 vSkyDirection;
void main() {
  vec3 d = normalize(vSkyDirection);
  float h = max(d.y, 0.0);
  float s = max(dot(d, uSun), 0.0);
  // Morning: warm, hazy low sky; clear blue overhead.
  vec3 c = mix(vec3(1.55, 1.42, 1.12), vec3(0.42, 0.66, 1.18), pow(h, 0.55));
  c += vec3(2.4, 1.75, 0.9) * pow(s, 48.0) + vec3(0.6, 0.43, 0.22) * pow(s, 6.0);
  c += vec3(62.0, 52.0, 38.0) * smoothstep(0.99935, 0.99975, s);
  if (d.y < 0.0) c = mix(c, vec3(0.16, 0.15, 0.11), smoothstep(0.0, 0.12, -d.y));
  gl_FragColor = vec4(c, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/** The forest's ambient: what the canopy, its gaps and the floor send toward a point under the trees. */
const PROBE_FRAGMENT = /* glsl */ `
uniform vec3 uSun;
varying vec3 vSkyDirection;
float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float vnoise(vec3 x) {
  vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
void main() {
  vec3 d = normalize(vSkyDirection);
  float h = d.y;
  float s = max(dot(d, uSun), 0.0);
  vec3 sky = mix(vec3(1.4, 1.3, 1.05), vec3(0.45, 0.68, 1.15), pow(max(h, 0.0), 0.55)) + vec3(4.0, 2.9, 1.6) * pow(s, 12.0);
  sky += vec3(40.0, 33.0, 24.0) * smoothstep(0.9985, 0.9995, s);
  // Canopy: leaves lit from behind glow yellow-green toward the sun.
  float leaf = smoothstep(0.38, 0.62, vnoise(d * 6.0) * 0.65 + vnoise(d * 17.0) * 0.35);
  vec3 canopy = mix(vec3(0.035, 0.06, 0.018), vec3(0.13, 0.2, 0.045), smoothstep(0.1, 0.8, h)) + vec3(0.5, 0.62, 0.12) * pow(s, 3.0) * 0.55;
  vec3 c = mix(sky, canopy, mix(0.55, 0.95, leaf) * smoothstep(0.02, 0.3, h));
  // Trunks and undergrowth around the horizon, the leaf-littered floor below.
  vec3 trunks = vec3(0.1, 0.095, 0.065) + vec3(0.3, 0.24, 0.12) * pow(s, 4.0);
  c = mix(c, trunks, 1.0 - smoothstep(0.0, 0.3, h));
  if (h < 0.0) c = mix(vec3(0.035, 0.032, 0.022), vec3(0.075, 0.07, 0.045), smoothstep(-0.6, 0.0, h));
  gl_FragColor = vec4(c, 1.0);
}
`;

const SKY_VERTEX = 'varying vec3 vSkyDirection;void main(){vSkyDirection=position;vec4 p=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position=p.xyww;}';

export function createSky() {
  const material = new THREE.ShaderMaterial({
    name: 'forest-sky', side: THREE.BackSide, depthWrite: false,
    uniforms: { uSun: { value: SUN_DIRECTION.clone() } },
    vertexShader: SKY_VERTEX, fragmentShader: SKY_FRAGMENT,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(90, 48, 24), material);
  sky.name = 'forest-sky'; sky.renderOrder = -10; sky.frustumCulled = false;
  return sky;
}

/** Scene for PMREM: forest ambient radiance. The byte path keeps its own prefiltered sky. */
export function createProbeScene() {
  const scene = new THREE.Scene();
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(30, 48, 24), new THREE.ShaderMaterial({
    side: THREE.BackSide, uniforms: { uSun: { value: SUN_DIRECTION.clone() } },
    vertexShader: 'varying vec3 vSkyDirection;void main(){vSkyDirection=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: PROBE_FRAGMENT,
  })));
  return scene;
}

export function disposeProbeScene(scene: THREE.Scene) {
  scene.traverse(object => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.geometry.dispose();
    (mesh.material as THREE.Material).dispose();
  });
}

export const FOREST_POST: Partial<PostSettings> = {
  exposure: 1.04,
  bloomStrength: 0.06,
  bloomThreshold: 0.9,
  aoStrength: 0.85,
  aoRadius: 0.5,
  saturation: 1.04,
  contrast: 1.12,
  shadowTint: [0.86, 0.95, 1.05],
  highlightTint: [1.07, 1.0, 0.9],
  vignette: 0.34,
  grain: 0.018,
};

/** Fog for each path. Pipeline values are linear HDR; direct-path values are display-referred (fog mixes after tone mapping). */
export const forestFog = (pipeline: boolean) => pipeline
  ? new THREE.FogExp2(new THREE.Color().setRGB(0.62, 0.6, 0.46, THREE.LinearSRGBColorSpace), 0.0085)
  : new THREE.FogExp2(new THREE.Color().setRGB(0.6, 0.62, 0.5, THREE.LinearSRGBColorSpace), 0.02);

const VOLUME_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
${GLSL_CANOPY_LIGHT}
uniform sampler2D tMist;
uniform vec3 uSunRadiance;
uniform vec3 uAmbient;
uniform vec3 uHaze;
uniform float uDensity;
uniform float uMist;
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, 85.0);
  float jitter = bwIgn(gl_FragCoord.xy);
  float mu = dot(rd, uForestSun);
  // Forward-peaked aerosol phase plus an isotropic part for the haze.
  float phase = (bwPhase(mu, 0.68) * 0.7 + bwPhase(mu, 0.15) * 0.3) * 12.5663706;
  const int STEPS = 32;
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  float previous = 0.0;
  vec2 drift = vec2(uTime * 0.018, uTime * 0.007);
  for (int i = 0; i < STEPS; i++) {
    float t = maxT * pow((float(i) + jitter) / float(STEPS), 1.7);
    float dt = t - previous; previous = t;
    vec3 p = ro + rd * t;
    // Mist hugs the ground and the pool; aerosol thins with height.
    vec2 m = texture2D(tMist, p.xz * 0.045 + drift + vec2(p.y * 0.02, 0.0)).rg;
    float ground = exp(-max(p.y, 0.0) * 0.55);
    float density = uDensity * (0.45 + 0.8 * exp(-max(p.y, 0.0) * 0.15)) + uMist * ground * smoothstep(0.3, 0.8, m.r * 0.7 + m.g * 0.5);
    // The air inside and below the crowns is lit only along the gaps.
    float sun = forestCanopyCookie(p);
    vec3 radiance = uSunRadiance * phase * sun + uAmbient + uHaze * smoothstep(10.0, 70.0, t);
    float stepT = exp(-density * dt);
    scatter += transmittance * radiance * (1.0 - stepT);
    transmittance *= stepT;
  }
  gl_FragColor = vec4(scatter, transmittance);
}
`;

export function createForestVolume(light: ForestLightUniforms, mist: THREE.Texture): VolumeEffect {
  const sun = new THREE.Vector3(SUN_COLOR.r, SUN_COLOR.g, SUN_COLOR.b).multiplyScalar(SUN_INTENSITY * 0.16);
  const material = new THREE.ShaderMaterial({
    name: 'forest-volume', vertexShader: FULLSCREEN_VERTEX, fragmentShader: VOLUME_FRAGMENT,
    depthTest: false, depthWrite: false, toneMapped: false,
    uniforms: {
      uForestCookie: light.uForestCookie, uForestCookieRect: light.uForestCookieRect, uForestSun: light.uForestSun,
      tMist: { value: mist }, uSunRadiance: { value: sun },
      uAmbient: { value: new THREE.Vector3(0.05, 0.055, 0.04) },
      uHaze: { value: new THREE.Vector3(0.24, 0.215, 0.145) },
      uDensity: { value: 0.0075 }, uMist: { value: 0.035 },
    },
  });
  return { material };
}
