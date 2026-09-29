import * as THREE from 'three';
import { GLSL_COLOR, GLSL_NOISE } from './glsl';
import { createTarget, FullscreenPass, passMaterial } from './fullscreen';

/*
 * HDR image pipeline: a physically based bloom (13-tap Karis downsample and
 * tent upsample chain, as in modern game engines), then lens effects, a
 * filmic tone curve, a restrained teal/amber split grade and fine grain.
 */

const DOWNSAMPLE = /* glsl */ `
${GLSL_COLOR}
uniform sampler2D tSource;
uniform vec2 uTexel;
uniform float uKaris;
uniform float uThreshold;
varying vec2 vUv;
vec3 tap(vec2 offset) { return texture2D(tSource, vUv + offset * uTexel).rgb; }
float karis(vec3 c) { return 1.0 / (1.0 + luma(c)); }
void main() {
  vec3 a = tap(vec2(-2.0, 2.0)); vec3 b = tap(vec2(0.0, 2.0)); vec3 c = tap(vec2(2.0, 2.0));
  vec3 d = tap(vec2(-2.0, 0.0)); vec3 e = tap(vec2(0.0, 0.0)); vec3 f = tap(vec2(2.0, 0.0));
  vec3 g = tap(vec2(-2.0, -2.0)); vec3 h = tap(vec2(0.0, -2.0)); vec3 i = tap(vec2(2.0, -2.0));
  vec3 j = tap(vec2(-1.0, 1.0)); vec3 k = tap(vec2(1.0, 1.0)); vec3 l = tap(vec2(-1.0, -1.0)); vec3 m = tap(vec2(1.0, -1.0));
  vec3 result;
  if (uKaris > 0.5) {
    vec3 g0 = (a + b + d + e) * 0.25; vec3 g1 = (b + c + e + f) * 0.25;
    vec3 g2 = (d + e + g + h) * 0.25; vec3 g3 = (e + f + h + i) * 0.25;
    vec3 g4 = (j + k + l + m) * 0.25;
    float w0 = karis(g0) * 0.125; float w1 = karis(g1) * 0.125; float w2 = karis(g2) * 0.125; float w3 = karis(g3) * 0.125; float w4 = karis(g4) * 0.5;
    result = (g0 * w0 + g1 * w1 + g2 * w2 + g3 * w3 + g4 * w4) / (w0 + w1 + w2 + w3 + w4);
    // Soft knee keeps dim surfaces from haze while bright sources bloom.
    float lum = luma(result);
    float soft = clamp(lum - uThreshold * 0.5, 0.0, uThreshold);
    soft = soft * soft / (4.0 * uThreshold + 1e-4);
    result *= max(soft, lum - uThreshold) / max(lum, 1e-4);
  } else {
    result = e * 0.125 + (a + c + g + i) * 0.03125 + (b + d + f + h) * 0.0625 + (j + k + l + m) * 0.125;
  }
  gl_FragColor = vec4(max(result, 0.0), 1.0);
}
`;

const UPSAMPLE = /* glsl */ `
uniform sampler2D tSource;
uniform vec2 uTexel;
uniform float uWeight;
varying vec2 vUv;
vec3 tap(vec2 offset) { return texture2D(tSource, vUv + offset * uTexel).rgb; }
void main() {
  vec3 sum = tap(vec2(0.0)) * 4.0;
  sum += (tap(vec2(-1.0, 0.0)) + tap(vec2(1.0, 0.0)) + tap(vec2(0.0, -1.0)) + tap(vec2(0.0, 1.0))) * 2.0;
  sum += tap(vec2(-1.0, -1.0)) + tap(vec2(1.0, -1.0)) + tap(vec2(-1.0, 1.0)) + tap(vec2(1.0, 1.0));
  gl_FragColor = vec4(sum / 16.0 * uWeight, 1.0);
}
`;

const COMPOSITE = /* glsl */ `
${GLSL_NOISE}
${GLSL_COLOR}
uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform vec2 uResolution;
uniform float uBloom;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uAberration;
uniform float uTime;
uniform float uFade;
varying vec2 vUv;

// ACES filmic curve (Stephen Hill's fit of the RRT + ODT).
vec3 acesFitted(vec3 color) {
  const mat3 inputMatrix = mat3(0.59719, 0.07600, 0.02840, 0.35458, 0.90834, 0.13383, 0.04823, 0.01566, 0.83777);
  const mat3 outputMatrix = mat3(1.60475, -0.10208, -0.00327, -0.53108, 1.10813, -0.07276, -0.07367, -0.00605, 1.07602);
  color = inputMatrix * color;
  vec3 a = color * (color + 0.0245786) - 0.000090537;
  vec3 b = color * (0.983729 * color + 0.4329510) + 0.238081;
  return clamp(outputMatrix * (a / b), 0.0, 1.0);
}

void main() {
  vec2 centered = vUv - 0.5;
  centered.x *= uResolution.x / uResolution.y;
  float r2 = dot(centered, centered);
  vec2 shift = (vUv - 0.5) * r2 * uAberration;
  vec3 color;
  color.r = texture2D(tScene, vUv - shift).r;
  color.g = texture2D(tScene, vUv).g;
  color.b = texture2D(tScene, vUv + shift).b;
  color += texture2D(tBloom, vUv).rgb * uBloom;
  color *= uExposure;
  float vignette = pow(clamp(1.0 - r2 * 0.62, 0.0, 1.0), 2.2);
  color *= mix(1.0, vignette, uVignette);

  color = acesFitted(color);
  float l = luma(color);
  // Cool the shadows toward the rainy blue night, keep warm highlights warm.
  vec3 shadows = vec3(0.82, 0.94, 1.2);
  vec3 highlights = vec3(1.06, 1.0, 0.9);
  color *= mix(shadows, highlights, smoothstep(0.06, 0.62, l));
  color = mix(vec3(l), color, 1.04);
  color = linearToSrgb(color * uFade);

  vec2 pixel = gl_FragCoord.xy;
  float seed = fract(uTime * 7.31) * 173.0;
  float noise = hash12(pixel + seed) + hash12(pixel * 1.37 + seed + 19.1) - 1.0;
  color += noise * (uGrain * (0.35 + 0.65 * (1.0 - l)) + 1.0 / 255.0);
  gl_FragColor = vec4(color, 1.0);
}
`;

export interface PostSettings {
  exposure: number;
  bloom: number;
  bloomThreshold: number;
  vignette: number;
  grain: number;
  aberration: number;
}

export const DEFAULT_POST: PostSettings = {
  exposure: 1.2,
  bloom: 1.15,
  bloomThreshold: 0.45,
  vignette: 0.55,
  grain: 0.022,
  aberration: 0.0025,
};

export class PostProcessor {
  readonly settings: PostSettings = { ...DEFAULT_POST };
  fade = 1;
  private readonly pass = new FullscreenPass();
  private mips: THREE.WebGLRenderTarget[] = [];
  private width = 1;
  private height = 1;
  private readonly downsample = passMaterial(DOWNSAMPLE, { tSource: { value: null }, uTexel: { value: new THREE.Vector2() }, uKaris: { value: 0 }, uThreshold: { value: 0.6 } });
  private readonly upsample = passMaterial(UPSAMPLE, { tSource: { value: null }, uTexel: { value: new THREE.Vector2() }, uWeight: { value: 1 } }, {
    transparent: true,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneFactor,
  });
  private readonly composite = passMaterial(COMPOSITE, {
    tScene: { value: null },
    tBloom: { value: null },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uBloom: { value: 1 },
    uExposure: { value: 1 },
    uVignette: { value: 0.5 },
    uGrain: { value: 0.02 },
    uAberration: { value: 0 },
    uTime: { value: 0 },
    uFade: { value: 1 },
  });

  constructor(private readonly renderer: THREE.WebGLRenderer) {}

  setSize(width: number, height: number) {
    if (width === this.width && height === this.height && this.mips.length) return;
    this.width = width;
    this.height = height;
    for (const mip of this.mips) mip.dispose();
    this.mips = [];
    let w = Math.max(1, Math.floor(width / 2));
    let h = Math.max(1, Math.floor(height / 2));
    for (let i = 0; i < 7 && w >= 4 && h >= 4; i++) {
      this.mips.push(createTarget(w, h));
      w = Math.floor(w / 2);
      h = Math.floor(h / 2);
    }
    this.composite.uniforms.uResolution.value.set(width, height);
  }

  render(scene: THREE.Texture, time: number, target: THREE.WebGLRenderTarget | null = null) {
    const renderer = this.renderer;
    const autoClear = renderer.autoClear;
    renderer.autoClear = false;
    let source = scene;
    let sourceWidth = this.width;
    let sourceHeight = this.height;
    this.mips.forEach((mip, index) => {
      this.downsample.uniforms.tSource.value = source;
      this.downsample.uniforms.uTexel.value.set(1 / sourceWidth, 1 / sourceHeight);
      this.downsample.uniforms.uKaris.value = index === 0 ? 1 : 0;
      this.downsample.uniforms.uThreshold.value = this.settings.bloomThreshold;
      this.pass.render(renderer, this.downsample, mip);
      source = mip.texture;
      sourceWidth = mip.width;
      sourceHeight = mip.height;
    });
    for (let i = this.mips.length - 1; i > 0; i--) {
      const from = this.mips[i];
      this.upsample.uniforms.tSource.value = from.texture;
      this.upsample.uniforms.uTexel.value.set(1 / from.width, 1 / from.height);
      this.upsample.uniforms.uWeight.value = 1;
      this.pass.render(renderer, this.upsample, this.mips[i - 1]);
    }
    const uniforms = this.composite.uniforms;
    uniforms.tScene.value = scene;
    uniforms.tBloom.value = this.mips[0]?.texture ?? scene;
    uniforms.uBloom.value = this.settings.bloom / Math.max(1, this.mips.length);
    uniforms.uExposure.value = this.settings.exposure;
    uniforms.uVignette.value = this.settings.vignette;
    uniforms.uGrain.value = this.settings.grain;
    uniforms.uAberration.value = this.settings.aberration;
    uniforms.uTime.value = time;
    uniforms.uFade.value = this.fade;
    this.pass.render(renderer, this.composite, target);
    renderer.autoClear = autoClear;
  }

  dispose() {
    for (const mip of this.mips) mip.dispose();
    this.downsample.dispose();
    this.upsample.dispose();
    this.composite.dispose();
    this.pass.dispose();
  }
}
