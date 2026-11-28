import * as THREE from 'three';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { VOLUME_PRELUDE, type VolumeEffect } from '../../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';

/*
 * Rain-world atmosphere, all procedural: an HDR overcast/storm sky that is the
 * large area light of every shelter, a participating-media pass for rain mist
 * and sweeping rain curtains, and radiance probes captured from the actual
 * scene so wet surfaces reflect the real sky and shelter openings.
 */

export interface SkyOptions {
  time: { value: number };
  /** Linear HDR radiance overhead and at the horizon. */
  zenith: THREE.Color;
  horizon: THREE.Color;
  /** Cloud undersides (thick) and thin bright cloud. */
  cloudDark: THREE.Color;
  cloudLight: THREE.Color;
  /** Brighter part of the overcast, where the hidden sun is. */
  glowDirection: THREE.Vector3;
  glow: THREE.Color;
  /** Below the horizon (ground the probe sees). */
  ground: THREE.Color;
  coverage?: number;
  /** Cloud feature scale (bigger = larger clouds). */
  scale?: number;
  drift?: number;
  /** Storm sky: low scud, a bright distant horizon band and hanging rain shafts. */
  storm?: boolean;
  radius?: number;
  /** Elevation (sine) over which clouds fade into the horizon haze. */
  horizonFade?: number;
  /** Tightness of the bright region around the hidden sun (3 = broad overcast). */
  glowPower?: number;
  /** Width of the thin-to-thick cloud transition; small values give crisper cloud forms. */
  softness?: number;
}

const SKY_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform float uTime;
uniform vec3 uZenith, uHorizon, uCloudDark, uCloudLight, uGlowDir, uGlow, uGround;
uniform float uCoverage, uScale, uDrift, uHorizonFade, uGlowPower, uSoftness;
varying vec3 vDir;
float layer(vec2 p, float t) {
  vec3 q = vec3(p, t);
  vec3 warp = vec3(bwFbm3(q * 0.7 + 3.1), bwFbm3(q * 0.7 + 9.7), 0.0);
  return bwFbm5(q + warp * 0.9) * 0.5 + 0.5;
}
void main() {
  vec3 d = normalize(vDir);
  float up = d.y;
  float h = max(up, 0.0);
  // CIE-overcast-like gradient: the zenith is about three times the horizon.
  vec3 sky = mix(uHorizon, uZenith, pow(h, 0.6));
  float glow = pow(max(dot(d, uGlowDir), 0.0), uGlowPower);
  vec2 p = d.xz / (h + 0.13) * uScale;
  float t = uTime * uDrift;
  float body = layer(p * 0.45 + vec2(t, t * 0.3), t * 0.1);
  float detail = bwFbm3(vec3(p * 2.1 + vec2(t * 1.6, 0.0), 7.0 + t * 0.2)) * 0.5 + 0.5;
  float thickness = smoothstep(1.0 - uCoverage, 1.0 - uCoverage + uSoftness, body * 0.82 + detail * 0.25);
  // Self-shadowing: cloud that is thinner toward the hidden sun is lit on that side.
  vec2 towardSun = normalize(uGlowDir.xz + 1e-4) * 0.09;
  float sunSide = layer(p * 0.45 + vec2(t, t * 0.3) + towardSun, t * 0.1);
  float rim = clamp((body - sunSide) * 5.0, 0.0, 1.0);
  // Thick cloud is dark underneath; thin edges glow, most strongly toward the hidden sun.
  vec3 cloud = mix(uCloudLight * (1.0 + glow * 1.4), uCloudDark, thickness);
  float edges = smoothstep(0.15, 0.5, thickness) * (1.0 - smoothstep(0.5, 0.95, thickness));
  cloud += uGlow * edges * glow * 0.6 + uGlow * rim * (0.12 + 0.5 * glow) * (1.0 - thickness * 0.5);
  float horizonFade = smoothstep(-0.02, uHorizonFade, up);
  sky = mix(sky, cloud, horizonFade * 0.92) + uGlow * glow * (0.4 + 0.6 * (1.0 - thickness));
#ifdef SKY_STORM
  // Low scud racing under the main deck.
  float scud = smoothstep(0.55, 0.85, bwFbm3(vec3(p * 1.3 + vec2(t * 3.5, t), 3.0 + t * 0.4)) * 0.5 + 0.5);
  sky = mix(sky, uCloudDark * 0.75, scud * horizonFade * 0.55);
  // Far away the storm ends: a bright band of clearing sky low on the horizon.
  float azimuth = atan(d.x, -d.z);
  float band = (1.0 - smoothstep(0.06, 0.2, up)) * smoothstep(0.02, 0.07, up);
  float gap = smoothstep(0.35, 0.75, bwFbm3(vec3(azimuth * 2.3, 1.0, 4.0)) * 0.5 + 0.5) * (0.4 + 0.6 * pow(max(dot(normalize(vec3(d.x, 0.0, d.z)), normalize(vec3(uGlowDir.x, 0.0, uGlowDir.z))), 0.0), 4.0));
  sky = mix(sky, uGlow * 1.3 * (0.7 + 0.3 * detail), band * gap);
  // Rain shafts hang from distant cloud bases.
  float shafts = smoothstep(0.3, 0.75, bwNoise(vec3(azimuth * 7.0 + up * 5.0, 2.0, t * 0.5)) * 0.5 + 0.5)
    * (0.6 + 0.4 * (bwNoise(vec3(azimuth * 40.0 + up * 3.0, 5.0, t)) * 0.5 + 0.5));
  float shaftZone = smoothstep(0.02, 0.07, up) * (1.0 - smoothstep(0.16, 0.3, up));
  sky = mix(sky, mix(uHorizon, uCloudDark, 0.6), shafts * shaftZone * (1.0 - band * gap) * 0.6);
  // A lower layer of heaped storm cloud with volume. Its thickness is read as a height
  // field and lit from the hidden sun: flanks facing it catch silver light, thick cores
  // stay dark, and wherever the cloud thickens upward the eye meets a shadowed belly.
  // The heaps pile up toward the horizon, in front of the far clearing and its rain shafts.
  {
    vec2 sunDir = normalize(uGlowDir.xz + 1e-4);
    vec2 upSky = -normalize(d.xz + 1e-4);
    vec2 pl = d.xz / (h + 0.1) * uScale * 0.95 + vec2(t * 1.7, t * 0.5) + 31.0;
    float tl = t * 0.12;
    float pile = 0.12 * (1.0 - smoothstep(0.05, 0.3, up)) - 0.06;
    float heap = bwFbm5(vec3(pl, tl)) * 0.5 + 0.5 + pile;
    float heapSun = bwFbm5(vec3(pl + sunDir * 0.06, tl)) * 0.5 + 0.5 + pile;
    float heapUp = bwFbm5(vec3(pl + upSky * 0.08, tl)) * 0.5 + 0.5 + pile;
    // Their flat bases float a few degrees up, above the bright clearing.
    float heapBody = smoothstep(0.47, 0.55, heap) * smoothstep(0.035, 0.085, up) * (1.0 - smoothstep(0.22, 0.45, up));
    float lit = clamp((heap - heapSun) * 7.0 + 0.5, 0.0, 1.0);
    float belly = clamp((heapUp - heap) * 7.0, 0.0, 1.0);
    float core = smoothstep(0.55, 0.78, heap);
    // Heavy rain cloud: slate cores and bellies, silver only where a flank faces the sun.
    vec3 litSide = mix(uCloudLight, uHorizon, 0.35) * 0.62 + uGlow * glow * 0.5;
    float light = clamp(lit * (1.0 - 0.85 * belly) * (1.0 - 0.6 * core) + 0.06, 0.0, 1.0);
    vec3 heapColor = mix(uCloudDark * 1.1, litSide, light * light);
    // Thin, sun-facing rims glow.
    heapColor += uGlow * glow * (1.0 - smoothstep(0.47, 0.53, heap)) * lit * 0.45;
    sky = mix(sky, heapColor, heapBody * 0.92);
  }
#endif
  sky = mix(uGround, sky, smoothstep(-0.04, 0.0, up));
  gl_FragColor = vec4(sky, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export function createSky(options: SkyOptions) {
  const material = new THREE.ShaderMaterial({
    defines: options.storm ? { SKY_STORM: '' } : {},
    uniforms: {
      uTime: options.time, uZenith: { value: options.zenith }, uHorizon: { value: options.horizon },
      uCloudDark: { value: options.cloudDark }, uCloudLight: { value: options.cloudLight },
      uGlowDir: { value: options.glowDirection.clone().normalize() }, uGlow: { value: options.glow }, uGround: { value: options.ground },
      uCoverage: { value: options.coverage ?? 0.75 }, uScale: { value: options.scale ?? 1 }, uDrift: { value: options.drift ?? 0.01 },
      uHorizonFade: { value: options.horizonFade ?? 0.22 }, uGlowPower: { value: options.glowPower ?? 3 }, uSoftness: { value: options.softness ?? 0.45 },
    },
    vertexShader: 'varying vec3 vDir;void main(){vDir=(modelMatrix*vec4(position,0.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position.z=gl_Position.w*.99999;}',
    fragmentShader: SKY_FRAGMENT,
    side: THREE.BackSide, depthWrite: false,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(options.radius ?? 200, 48, 24), material);
  mesh.name = 'rain-sky-dome';
  mesh.renderOrder = -10;
  mesh.frustumCulled = false;
  // The dome follows the eye, so it reads as infinitely far away.
  mesh.onBeforeRender = (_renderer, _scene, camera) => { mesh.position.copy(camera.position); mesh.updateMatrixWorld(); };
  return { mesh, material };
}

export interface MistOptions {
  /** Isotropic in-scattered radiance (sky average × albedo). */
  skyLight: THREE.Color;
  /** Forward-scattered light toward the bright part of the sky. */
  glowLight: THREE.Color;
  glowDirection: THREE.Vector3;
  /** Extinction per metre at ground level. */
  density: number;
  /** Exponential height falloff per metre. */
  heightFalloff: number;
  groundY: number;
  /** Mist exists on the positive side of this plane only (outside the shelter). */
  shelter: { normal: THREE.Vector3; offset: number; softness: number };
  maxDistance: number;
  /** Sweeping rain-curtain modulation (0..2) and their size in metres. */
  curtains: number;
  curtainScale: number;
  /** Horizontal drift of mist and curtains, m/s. */
  wind: THREE.Vector2;
}

const MIST_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
${GLSL_NOISE}
uniform vec3 uSkyLight, uGlowLight, uGlowDir;
uniform float uDensity, uHeightFalloff, uGroundY, uShelterSoft, uMaxDistance, uCurtains, uCurtainScale;
uniform vec4 uShelter;
uniform vec2 uWind;
float mist(vec3 p, out float height) {
  height = max(p.y - uGroundY, 0.0);
  float exposed = smoothstep(0.0, uShelterSoft, dot(p, uShelter.xyz) - uShelter.w);
  if (exposed <= 0.0) return 0.0;
  vec3 drift = vec3(uWind.x, 0.0, uWind.y) * uTime;
  vec3 q = (p - drift) * 0.09;
  float wisps = 0.55 + 0.38 * bwNoise(q + vec3(0.0, uTime * 0.01, 0.0)) + 0.22 * bwNoise(q * 3.1 + 5.0);
  // Rain curtains: tall sheets that sweep with the wind and pulse as they fall.
  vec3 c = (p - drift * 1.6) / uCurtainScale;
  float curtain = bwNoise(vec3(c.x, p.y * 0.02 + uTime * 0.05, c.z)) * 0.6 + bwNoise(vec3(c.x * 3.0, p.y * 0.04 + uTime * 0.12, c.z * 3.0)) * 0.4;
  float sheets = 1.0 + uCurtains * (smoothstep(-0.15, 0.55, curtain) - 0.35);
  return uDensity * exp(-height * uHeightFalloff) * max(wisps, 0.05) * max(sheets, 0.05) * exposed;
}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, uMaxDistance);
  float phase = bwPhase(dot(rd, uGlowDir), 0.55) * 12.5663706;
  float jitter = bwIgn(gl_FragCoord.xy + uFrame * 7.0);
  const int STEPS = 30;
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  float previous = 0.0;
  for (int i = 0; i < STEPS; i++) {
    // Quadratic spacing: dense near the eye, long strides into the distance.
    float s = (float(i) + jitter) / float(STEPS);
    float t = maxT * s * s;
    float dt = t - previous; previous = t;
    vec3 p = ro + rd * t;
    float height;
    float sigma = mist(p, height);
    if (sigma <= 0.0) continue;
    // Mist near the ground sees less of the sky.
    vec3 radiance = (uSkyLight * (0.72 + 0.28 * smoothstep(0.0, 6.0, height)) + uGlowLight * phase);
    float stepT = exp(-sigma * dt);
    scatter += transmittance * radiance * (1.0 - stepT);
    transmittance *= stepT;
  }
  gl_FragColor = vec4(scatter, transmittance);
}`;

export function createMist(options: MistOptions): VolumeEffect {
  const material = new THREE.ShaderMaterial({
    vertexShader: FULLSCREEN_VERTEX, fragmentShader: MIST_FRAGMENT, depthTest: false, depthWrite: false, toneMapped: false,
    uniforms: {
      uSkyLight: { value: new THREE.Vector3(options.skyLight.r, options.skyLight.g, options.skyLight.b) },
      uGlowLight: { value: new THREE.Vector3(options.glowLight.r, options.glowLight.g, options.glowLight.b) },
      uGlowDir: { value: options.glowDirection.clone().normalize() },
      uDensity: { value: options.density }, uHeightFalloff: { value: options.heightFalloff }, uGroundY: { value: options.groundY },
      uShelter: { value: new THREE.Vector4(options.shelter.normal.x, options.shelter.normal.y, options.shelter.normal.z, options.shelter.offset) },
      uShelterSoft: { value: options.shelter.softness }, uMaxDistance: { value: options.maxDistance },
      uCurtains: { value: options.curtains }, uCurtainScale: { value: options.curtainScale }, uWind: { value: options.wind.clone() },
    },
  });
  return { material };
}

/**
 * Prefiltered radiance probe of the actual scene from one point. Lights,
 * shadows and the sky all contribute, so the probe carries the first bounce:
 * a probe inside a shelter sees its dark roof and the bright opening.
 * Transparent rain is hidden while capturing.
 */
export function captureProbe(renderer: THREE.WebGLRenderer, scene: THREE.Scene, position: THREE.Vector3, hide: THREE.Object3D[] = [], size = 128, far = 400) {
  const visible = hide.map(object => object.visible);
  hide.forEach(object => { object.visible = false; });
  const pmrem = new THREE.PMREMGenerator(renderer);
  try {
    return pmrem.fromScene(scene, 0, 0.05, far, { size, position });
  } finally {
    pmrem.dispose();
    hide.forEach((object, i) => { object.visible = visible[i]; });
  }
}

/** Sky-only probe: the dome over a ground of the given radiance, for open-air surfaces. */
export function captureSkyProbe(renderer: THREE.WebGLRenderer, skyMaterial: THREE.ShaderMaterial, size = 64) {
  const probe = new THREE.Scene();
  const dome = new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), skyMaterial);
  probe.add(dome);
  const pmrem = new THREE.PMREMGenerator(renderer);
  try {
    return pmrem.fromScene(probe, 0, 0.1, 100, { size });
  } finally {
    pmrem.dispose();
    dome.geometry.dispose();
  }
}

/** Assigns a probe to every standard material under `root` that has no probe yet. */
export function assignProbe(root: THREE.Object3D, texture: THREE.Texture, intensity = 1, filter: (material: THREE.MeshStandardMaterial) => boolean = () => true) {
  root.traverse(object => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;
    for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
      const standard = material as THREE.MeshStandardMaterial;
      if (!standard.isMeshStandardMaterial || standard.envMap || !filter(standard)) continue;
      standard.envMap = texture;
      standard.envMapIntensity = intensity;
      standard.needsUpdate = true;
    }
  });
}
