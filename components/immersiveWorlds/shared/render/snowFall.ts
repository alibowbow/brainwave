import * as THREE from 'three';
import { seeded } from './noise';

/*
 * GPU snowfall for the immersive worlds (original implementation). Each layer
 * is one THREE.Points draw whose flakes are positioned entirely in the vertex
 * shader from a per-flake seed and the clock: they fall, sway and wrap inside a
 * world-space box, so the CPU never touches a buffer after creation and time 0
 * is a complete, deterministic still frame.
 * Flakes are lit as tiny diffuse scatterers: a cool key (moon) with a forward
 * glow, an ambient sky term, and up to four warm point lights (lamps, windows)
 * that make nearby flakes sparkle. Radiance is linear HDR for the shared pipeline.
 * Sub-pixel flakes keep a 1 px footprint and fade by area, so distant snow
 * reads as fine grain without flicker; near flakes are large, soft discs.
 */

export interface SnowLayer {
  count: number;
  /** World-space box the flakes fall through. */
  min: THREE.Vector3;
  max: THREE.Vector3;
  /** Flake diameter range in metres. */
  size: [number, number];
  /** Fall speed range in metres per second. */
  speed: [number, number];
  /** Horizontal sway amplitude in metres. */
  sway?: number;
  /** 0 = crisp flake, 1 = soft out-of-focus disc. */
  softness?: number;
  /** Radiance multiplier for this layer. */
  brightness?: number;
  /** Opacity of a flake covering whole pixels. */
  opacity?: number;
  /** Distance (m) inside which flakes grow into out-of-focus discs. */
  focus?: number;
}

export interface SnowfallOptions {
  seed: number;
  layers: SnowLayer[];
  /** Constant drift in metres per second. */
  wind?: THREE.Vector3;
  keyDirection: THREE.Vector3;
  keyColor: THREE.Color;
  ambient: THREE.Color;
  /** Up to four warm point lights: position and linear radiance at 1 m. */
  lights?: Array<{ position: THREE.Vector3; color: THREE.Color }>;
}

const VERTEX = /* glsl */ `
uniform float uTime;
uniform vec3 uBoxMin;
uniform vec3 uBoxSize;
uniform vec2 uSize;
uniform vec2 uSpeed;
uniform float uSway;
uniform vec3 uWind;
uniform float uPixelScale;
uniform vec3 uKeyDir;
uniform vec3 uKeyColor;
uniform vec3 uAmbient;
uniform vec3 uLightPos[4];
uniform vec3 uLightColor[4];
uniform float uBrightness;
uniform float uOpacity;
uniform float uSoftness;
uniform float uFocus;
attribute vec4 seed;
varying vec3 vColor;
varying float vAlpha;
varying float vSoft;
void main() {
  float speed = mix(uSpeed.x, uSpeed.y, seed.w);
  vec3 start = seed.xyz * uBoxSize;
  vec3 p = start + uWind * uTime;
  p.y -= uTime * speed;
  float phase = seed.w * 37.0 + seed.x * 11.0;
  p.x += sin(uTime * (0.45 + seed.w * 0.5) + phase) * uSway;
  p.z += cos(uTime * (0.33 + seed.y * 0.4) + phase * 1.3) * uSway * 0.7;
  p = uBoxMin + mod(p, uBoxSize);
  vec4 view = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * view;
  float diameter = mix(uSize.x, uSize.y, fract(seed.w * 7.31 + seed.z * 3.7));
  float pixels = diameter * uPixelScale / max(-view.z, 0.05);
  // Out-of-focus near flakes grow into soft discs; coverage is conserved.
  float blur = uSoftness * clamp((uFocus + view.z) / uFocus, 0.0, 1.0) * 7.0;
  float sizePx = max(pixels + blur, 1.0);
  gl_PointSize = min(sizePx, 64.0);
  float coverage = (pixels * pixels) / (sizePx * sizePx);
  vAlpha = uOpacity * clamp(coverage * 1.6, 0.0, 1.0) * smoothstep(0.0, 0.6, p.y - uBoxMin.y + 0.2);
  vSoft = clamp(uSoftness + blur * 0.1, 0.0, 1.0);
  vec3 light = uAmbient + uKeyColor * (0.55 + 0.9 * pow(max(dot(normalize(cameraPosition - p), -uKeyDir), 0.0), 6.0));
  for (int i = 0; i < 4; i++) {
    vec3 d = uLightPos[i] - p;
    light += uLightColor[i] / (dot(d, d) + 0.25);
  }
  vColor = light * uBrightness;
}
`;

const FRAGMENT = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
varying float vSoft;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c) * 2.0;
  float crisp = 1.0 - smoothstep(0.55, 1.0, r);
  float soft = exp(-r * r * 3.2) * (1.0 - smoothstep(0.85, 1.0, r));
  float shape = mix(crisp, soft, vSoft);
  float alpha = shape * vAlpha;
  if (alpha < 0.003) discard;
  gl_FragColor = vec4(vColor, alpha);
}
`;

/** Builds the snowfall layers. Add `group` to the scene; call `update(time)`. */
export function createSnowfall(options: SnowfallOptions) {
  const group = new THREE.Group();
  group.name = 'GPU snowfall';
  const random = seeded(options.seed);
  const time = { value: 0 };
  const pixelScale = { value: 400 };
  const lightPos = Array.from({ length: 4 }, (_, i) => options.lights?.[i]?.position.clone() ?? new THREE.Vector3(0, -1e3, 0));
  const lightColor = Array.from({ length: 4 }, (_, i) => options.lights?.[i] ? new THREE.Vector3(options.lights[i].color.r, options.lights[i].color.g, options.lights[i].color.b) : new THREE.Vector3());
  const materials: THREE.ShaderMaterial[] = [];
  for (const layer of options.layers) {
    const seeds = new Float32Array(layer.count * 4);
    for (let i = 0; i < seeds.length; i++) seeds[i] = random();
    const geometry = new THREE.BufferGeometry();
    // Positions are computed on the GPU; the attribute only sizes the draw.
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(layer.count * 3), 3));
    geometry.setAttribute('seed', new THREE.BufferAttribute(seeds, 4));
    const size = layer.max.clone().sub(layer.min);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX, fragmentShader: FRAGMENT, transparent: true, depthWrite: false, toneMapped: false,
      uniforms: {
        uTime: time, uPixelScale: pixelScale,
        uBoxMin: { value: layer.min.clone() }, uBoxSize: { value: size },
        uSize: { value: new THREE.Vector2(...layer.size) }, uSpeed: { value: new THREE.Vector2(...layer.speed) },
        uSway: { value: layer.sway ?? 0.15 }, uWind: { value: options.wind?.clone() ?? new THREE.Vector3() },
        uKeyDir: { value: options.keyDirection.clone().normalize() },
        uKeyColor: { value: new THREE.Vector3(options.keyColor.r, options.keyColor.g, options.keyColor.b) },
        uAmbient: { value: new THREE.Vector3(options.ambient.r, options.ambient.g, options.ambient.b) },
        uLightPos: { value: lightPos }, uLightColor: { value: lightColor },
        uBrightness: { value: layer.brightness ?? 1 }, uOpacity: { value: layer.opacity ?? 0.9 }, uSoftness: { value: layer.softness ?? 0 }, uFocus: { value: layer.focus ?? 2 },
      },
    });
    materials.push(material);
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    points.renderOrder = 2;
    group.add(points);
  }
  // Pixel scale follows the live projection and drawing-buffer height.
  const buffer = new THREE.Vector2();
  const measure: THREE.Object3D['onBeforeRender'] = (renderer, _scene, camera) => {
    const target = renderer.getRenderTarget();
    const pixels = target ? target.height : renderer.getDrawingBufferSize(buffer).y;
    pixelScale.value = pixels * (camera as THREE.PerspectiveCamera).projectionMatrix.elements[5] * 0.5;
  };
  group.children.forEach((points) => { points.onBeforeRender = measure; });
  return {
    group,
    /** Live uniforms of the warm lights, for flicker or interaction. */
    lightColor,
    update(seconds: number) { time.value = seconds; },
  };
}
