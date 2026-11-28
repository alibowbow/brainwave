import * as THREE from 'three';
import { GLSL_COLOR, GLSL_DEPTH } from './glsl';
import { bloomChain, createTarget, disposeTarget, FullscreenPass, msaaSamples, passMaterial } from './targets';

/*
 * Shared HDR image pipeline for the immersive worlds. Scenes render linear
 * radiance into a half-float, multisampled target with a depth texture; then:
 *   1. screen-space ambient occlusion (half resolution, depth-aware blur),
 *   2. an optional world-supplied participating-media pass (god rays, mist),
 *   3. energy-conserving bloom (Karis-weighted 13-tap downsample, tent upsample),
 *   4. filmic tone curve, split-tone grade, vignette, grain and dithering.
 * Original implementation; the protected rainy-window pipeline is untouched.
 */

export interface PostSettings {
  /** Scene exposure; 1.12 matches the previous renderer.toneMappingExposure. */
  exposure: number;
  /** Mix toward the averaged bloom pyramid; small values read as lens veil. */
  bloomStrength: number;
  /** 0 keeps bloom physically based; above 0 only bright radiance blooms. */
  bloomThreshold: number;
  /** Strength of screen-space ambient occlusion; 0 disables the pass. */
  aoStrength: number;
  /** Occlusion search radius in world units (metres). */
  aoRadius: number;
  saturation: number;
  contrast: number;
  /** Multiplicative tint for shadows and highlights after the tone curve. */
  shadowTint: [number, number, number];
  highlightTint: [number, number, number];
  vignette: number;
  grain: number;
}

export const DEFAULT_POST: PostSettings = {
  exposure: 1.12,
  bloomStrength: 0.05,
  bloomThreshold: 0,
  aoStrength: 0.85,
  aoRadius: 0.6,
  saturation: 1,
  contrast: 1.04,
  shadowTint: [1, 1, 1],
  highlightTint: [1, 1, 1],
  vignette: 0.3,
  grain: 0.025,
};

/**
 * A world-owned participating medium rendered at half resolution. Its
 * fragment shader writes vec4(in-scattered radiance, transmittance). Include
 * VOLUME_PRELUDE for depth, camera and ray helpers. The pipeline disposes it.
 */
export interface VolumeEffect {
  material: THREE.ShaderMaterial;
  update?(time: number, camera: THREE.PerspectiveCamera): void;
}

export const VOLUME_PRELUDE = /* glsl */ `
${GLSL_COLOR}
${GLSL_DEPTH}
uniform mat4 uCameraWorld;
uniform vec2 uResolution;
uniform float uTime;
uniform float uFrame;
varying vec2 vUv;
/** World-space eye ray through this pixel and the distance to the first surface. */
void bwSceneRay(vec2 uv, out vec3 origin, out vec3 direction, out float surface) {
  vec3 view = bwViewPosition(uv);
  vec3 world = (uCameraWorld * vec4(view, 1.0)).xyz;
  origin = uCameraWorld[3].xyz;
  direction = normalize(world - origin);
  surface = bwRawDepth(uv) >= 0.99999 ? 1e4 : length(world - origin);
}
/** Henyey-Greenstein phase function. */
float bwPhase(float cosTheta, float g) {
  float g2 = g * g;
  return (1.0 - g2) / (12.5663706 * pow(max(1.0 + g2 - 2.0 * g * cosTheta, 1e-4), 1.5));
}
`;

const AO = /* glsl */ `
${GLSL_COLOR}
${GLSL_DEPTH}
uniform vec2 uResolution;
uniform float uRadius;
uniform float uIntensity;
varying vec2 vUv;
const int SAMPLES = 14;
void main() {
  if (bwRawDepth(vUv) >= 0.99999) { gl_FragColor = vec4(1.0); return; }
  vec2 texel = 1.0 / uResolution;
  vec3 p = bwViewPosition(vUv);
  vec3 pr = bwViewPosition(vUv + vec2(texel.x, 0.0)), pl = bwViewPosition(vUv - vec2(texel.x, 0.0));
  vec3 pu = bwViewPosition(vUv + vec2(0.0, texel.y)), pd = bwViewPosition(vUv - vec2(0.0, texel.y));
  // Pick the smoother neighbour on each axis so silhouettes do not smear normals.
  vec3 dx = abs(pr.z - p.z) < abs(p.z - pl.z) ? pr - p : p - pl;
  vec3 dy = abs(pu.z - p.z) < abs(p.z - pd.z) ? pu - p : p - pd;
  vec3 n = normalize(cross(dx, dy));
  float pixels = min(uRadius * uProjection[1][1] * 0.5 * uResolution.y / -p.z, 90.0);
  if (pixels < 1.0) { gl_FragColor = vec4(1.0); return; }
  // 4x4 ordered rotations: the 4x4 blur below sees each of the 16 exactly once,
  // so the sampling pattern cancels instead of leaving row or diagonal stripes.
  vec2 cell = mod(floor(gl_FragCoord.xy), 4.0);
  vec2 fine = mod(cell, 2.0), coarse = floor(cell * 0.5);
  float bayer = 4.0 * mod(fine.x * 2.0 + fine.y * 3.0, 4.0) + mod(coarse.x * 2.0 + coarse.y * 3.0, 4.0);
  float angle = (bayer + 0.5) * (6.2831853 / 16.0);
  float r2 = uRadius * uRadius;
  float sum = 0.0;
  for (int i = 0; i < SAMPLES; i++) {
    float t = (float(i) + 0.5) / float(SAMPLES);
    float a = angle + float(i) * 2.3999632;
    vec2 uv = vUv + vec2(cos(a), sin(a)) * (t * pixels) * texel;
    vec3 v = bwViewPosition(uv) - p;
    float vv = dot(v, v);
    float f = max(r2 - vv, 0.0);
    sum += f * f * f * max((dot(v, n) + p.z * 0.002) / (vv + 0.01), 0.0);
  }
  float ao = max(0.0, 1.0 - sum * uIntensity * 5.0 / (float(SAMPLES) * r2 * r2 * r2));
  gl_FragColor = vec4(ao, ao, ao, 1.0);
}
`;

const AO_BLUR = /* glsl */ `
${GLSL_DEPTH}
uniform sampler2D tAo;
uniform vec2 uTexel;
varying vec2 vUv;
void main() {
  float zc = bwViewPosition(vUv).z;
  // Compare neighbours with the centre plane, not the centre depth: surfaces seen
  // at a grazing angle change depth quickly between rows and would otherwise keep
  // only their horizontal neighbours, leaving horizontal stripes.
  float zr = bwViewPosition(vUv + vec2(uTexel.x, 0.0)).z, zl = bwViewPosition(vUv - vec2(uTexel.x, 0.0)).z;
  float zu = bwViewPosition(vUv + vec2(0.0, uTexel.y)).z, zd = bwViewPosition(vUv - vec2(0.0, uTexel.y)).z;
  float gx = abs(zr - zc) < abs(zc - zl) ? zr - zc : zc - zl;
  float gy = abs(zu - zc) < abs(zc - zd) ? zu - zc : zc - zd;
  float tolerance = 0.03 * abs(zc) + 1e-3;
  float sum = 0.0, weight = 0.0;
  for (int x = -2; x < 2; x++) for (int y = -2; y < 2; y++) {
    vec2 offset = vec2(float(x), float(y));
    vec2 uv = vUv + offset * uTexel;
    float expected = zc + gx * offset.x + gy * offset.y;
    float w = exp(-abs(bwViewPosition(uv).z - expected) / tolerance);
    sum += texture2D(tAo, uv).r * w; weight += w;
  }
  float ao = sum / max(weight, 1e-4);
  gl_FragColor = vec4(ao, ao, ao, 1.0);
}
`;

// Separable, depth-aware Gaussian for the half-resolution volume: removes the
// per-pixel ray jitter without bleeding light across silhouettes.
const VOLUME_BLUR = /* glsl */ `
${GLSL_DEPTH}
uniform sampler2D tSource;
uniform vec2 uStep;
varying vec2 vUv;
void main() {
  float zc = bwViewPosition(vUv).z;
  vec4 sum = vec4(0.0); float weight = 0.0;
  for (int i = -3; i <= 3; i++) {
    vec2 uv = vUv + uStep * float(i);
    float w = exp(-float(i * i) / 5.12) * exp(-abs(bwViewPosition(uv).z - zc) / (0.05 * abs(zc) + 1e-3));
    sum += texture2D(tSource, uv) * w; weight += w;
  }
  gl_FragColor = sum / max(weight, 1e-4);
}
`;

const COMBINE = /* glsl */ `
${GLSL_COLOR}
${GLSL_DEPTH}
uniform sampler2D tScene;
uniform sampler2D tAo;
uniform sampler2D tVolume;
uniform vec2 uVolumeSize;
uniform float uAoStrength;
uniform float uUseAo;
uniform float uUseVolume;
varying vec2 vUv;
vec4 volumeTap(vec2 cell, vec2 f, vec2 o, float zc, inout float wsum) {
  vec2 uv = (cell + o + 0.5) / uVolumeSize;
  float bilinear = (o.x > 0.5 ? f.x : 1.0 - f.x) * (o.y > 0.5 ? f.y : 1.0 - f.y);
  float w = bilinear / (1e-3 + abs(bwViewPosition(uv).z - zc) / max(abs(zc), 1e-3));
  wsum += w;
  return texture2D(tVolume, uv) * w;
}
void main() {
  vec3 color = texture2D(tScene, vUv).rgb;
  if (uUseAo > 0.5) {
    float ao = texture2D(tAo, vUv).r;
    // Keep direct highlights: occlusion belongs mostly to ambient light.
    float mask = 1.0 - smoothstep(1.2, 6.0, bwLuma(color));
    color *= mix(1.0, ao, uAoStrength * mask);
  }
  if (uUseVolume > 0.5) {
    float zc = bwViewPosition(vUv).z;
    vec2 coord = vUv * uVolumeSize - 0.5;
    vec2 cell = floor(coord), f = coord - cell;
    float wsum = 0.0;
    vec4 v = volumeTap(cell, f, vec2(0, 0), zc, wsum) + volumeTap(cell, f, vec2(1, 0), zc, wsum)
           + volumeTap(cell, f, vec2(0, 1), zc, wsum) + volumeTap(cell, f, vec2(1, 1), zc, wsum);
    v /= max(wsum, 1e-5);
    color = color * clamp(v.a, 0.0, 1.0) + v.rgb;
  }
  gl_FragColor = vec4(color, 1.0);
}
`;

const DOWNSAMPLE = /* glsl */ `
${GLSL_COLOR}
uniform sampler2D tSource;
uniform vec2 uTexel;
uniform float uFirst;
uniform float uThreshold;
varying vec2 vUv;
vec3 tap(vec2 o) { return texture2D(tSource, vUv + o * uTexel).rgb; }
float karis(vec3 c) { return 1.0 / (1.0 + bwLuma(c)); }
void main() {
  vec3 a = tap(vec2(-2, 2)), b = tap(vec2(0, 2)), c = tap(vec2(2, 2));
  vec3 d = tap(vec2(-2, 0)), e = tap(vec2(0, 0)), f = tap(vec2(2, 0));
  vec3 g = tap(vec2(-2, -2)), h = tap(vec2(0, -2)), i = tap(vec2(2, -2));
  vec3 j = tap(vec2(-1, 1)), k = tap(vec2(1, 1)), l = tap(vec2(-1, -1)), m = tap(vec2(1, -1));
  vec3 result;
  if (uFirst > 0.5) {
    // Karis average on the first level removes fireflies from tiny highlights.
    vec3 g0 = (a + b + d + e) * 0.25, g1 = (b + c + e + f) * 0.25, g2 = (d + e + g + h) * 0.25, g3 = (e + f + h + i) * 0.25, g4 = (j + k + l + m) * 0.25;
    float w0 = karis(g0) * 0.125, w1 = karis(g1) * 0.125, w2 = karis(g2) * 0.125, w3 = karis(g3) * 0.125, w4 = karis(g4) * 0.5;
    result = (g0 * w0 + g1 * w1 + g2 * w2 + g3 * w3 + g4 * w4) / (w0 + w1 + w2 + w3 + w4);
    if (uThreshold > 0.0) {
      float lum = bwLuma(result);
      float soft = clamp(lum - uThreshold * 0.5, 0.0, uThreshold);
      soft = soft * soft / (2.0 * uThreshold + 1e-4);
      result *= max(soft, lum - uThreshold) / max(lum, 1e-4);
    }
  } else {
    result = e * 0.125 + (a + c + g + i) * 0.03125 + (b + d + f + h) * 0.0625 + (j + k + l + m) * 0.125;
  }
  gl_FragColor = vec4(max(result, 0.0), 1.0);
}
`;

const UPSAMPLE = /* glsl */ `
uniform sampler2D tSource;
uniform vec2 uTexel;
varying vec2 vUv;
vec3 tap(vec2 o) { return texture2D(tSource, vUv + o * uTexel).rgb; }
void main() {
  vec3 sum = tap(vec2(0)) * 4.0;
  sum += (tap(vec2(-1, 0)) + tap(vec2(1, 0)) + tap(vec2(0, -1)) + tap(vec2(0, 1))) * 2.0;
  sum += tap(vec2(-1, -1)) + tap(vec2(1, -1)) + tap(vec2(-1, 1)) + tap(vec2(1, 1));
  gl_FragColor = vec4(sum / 16.0, 1.0);
}
`;

const COMPOSITE = /* glsl */ `
${GLSL_COLOR}
uniform sampler2D tLit;
uniform sampler2D tBloom;
uniform float uBloomStrength;
uniform float uBloomLevels;
uniform float uExposure;
uniform float uSaturation;
uniform float uContrast;
uniform vec3 uShadowTint;
uniform vec3 uHighlightTint;
uniform float uVignette;
uniform float uGrain;
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;
vec3 filmic(vec3 c) {
  // Fitted ACES RRT+ODT (sRGB primaries), as used by three.js ACESFilmicToneMapping.
  const mat3 inM = mat3(0.59719, 0.07600, 0.02840, 0.35458, 0.90834, 0.13383, 0.04823, 0.01566, 0.83777);
  const mat3 outM = mat3(1.60475, -0.10208, -0.00327, -0.53108, 1.10813, -0.07276, -0.07367, -0.00605, 1.07602);
  c = inM * c;
  vec3 a = c * (c + 0.0245786) - 0.000090537;
  vec3 b = c * (0.983729 * c + 0.4329510) + 0.238081;
  return clamp(outM * (a / b), 0.0, 1.0);
}
void main() {
  vec3 hdr = texture2D(tLit, vUv).rgb;
  vec3 bloom = texture2D(tBloom, vUv).rgb / uBloomLevels;
  hdr = mix(hdr, bloom, uBloomStrength);
  vec3 c = filmic(hdr * uExposure / 0.6);
  vec3 s = bwLinearToSrgb(c);
  float lum = bwLuma(s);
  s = mix(vec3(lum), s, uSaturation);
  s = (s - 0.5) * uContrast + 0.5;
  s *= mix(uShadowTint, uHighlightTint, smoothstep(0.05, 0.75, lum));
  vec2 centred = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
  float vignette = pow(clamp(1.0 - dot(centred, centred) * 0.55, 0.0, 1.0), 1.8);
  s *= mix(1.0, vignette, uVignette);
  // Grain weighted toward the shadows, then triangular dither against banding.
  vec2 pixel = gl_FragCoord.xy;
  float grain = fract(sin(dot(pixel + fract(uTime * 7.31) * 113.0, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  s += grain * uGrain * (1.0 - 0.6 * lum);
  s += (bwIgn(pixel + uTime * 61.0) + bwIgn(pixel.yx + 17.0) - 1.0) / 255.0;
  gl_FragColor = vec4(clamp(s, 0.0, 1.0), 1.0);
}
`;

export interface PipelineReport {
  type: 'half-float';
  msaa: number;
  ao: boolean;
  volume: boolean;
  bloomLevels: number;
}

const setUniform = (material: THREE.ShaderMaterial, name: string, value: unknown) => {
  const existing = material.uniforms[name];
  if (existing) existing.value = value; else material.uniforms[name] = { value };
};

/** True when this context can render RGBA16F targets (blending included). */
export function supportsHdrTargets(renderer: THREE.WebGLRenderer): boolean {
  const gl = renderer.getContext() as WebGL2RenderingContext;
  if (typeof gl?.getExtension !== 'function' || typeof gl.checkFramebufferStatus !== 'function') return false;
  return !!(gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float'));
}

export class HdrPipeline {
  settings: PostSettings;
  report: PipelineReport;
  private readonly pass = new FullscreenPass();
  private sceneTarget: THREE.WebGLRenderTarget | null = null;
  private litTarget: THREE.WebGLRenderTarget | null = null;
  private aoTarget: THREE.WebGLRenderTarget | null = null;
  private aoBlurTarget: THREE.WebGLRenderTarget | null = null;
  private volumeTarget: THREE.WebGLRenderTarget | null = null;
  private mips: THREE.WebGLRenderTarget[] = [];
  private width = 1;
  private height = 1;
  private frame = 0;
  private disposed = false;
  private readonly volumeSize = new THREE.Vector2(1, 1);
  private readonly cameraUniforms = {
    tDepth: { value: null as THREE.Texture | null },
    uProjection: { value: new THREE.Matrix4() },
    uInverseProjection: { value: new THREE.Matrix4() },
  };
  private readonly ao = passMaterial(AO, { ...this.cameraUniforms, uResolution: { value: new THREE.Vector2() }, uRadius: { value: 0.6 }, uIntensity: { value: 1 } });
  private readonly aoBlur = passMaterial(AO_BLUR, { ...this.cameraUniforms, tAo: { value: null }, uTexel: { value: new THREE.Vector2() } });
  private volumeBlurTarget: THREE.WebGLRenderTarget | null = null;
  private readonly volumeBlur = passMaterial(VOLUME_BLUR, { ...this.cameraUniforms, tSource: { value: null }, uStep: { value: new THREE.Vector2() } });
  private readonly combine = passMaterial(COMBINE, {
    ...this.cameraUniforms, tScene: { value: null }, tAo: { value: null }, tVolume: { value: null },
    uVolumeSize: { value: new THREE.Vector2(1, 1) }, uAoStrength: { value: 0 }, uUseAo: { value: 0 }, uUseVolume: { value: 0 },
  });
  private readonly downsample = passMaterial(DOWNSAMPLE, { tSource: { value: null }, uTexel: { value: new THREE.Vector2() }, uFirst: { value: 0 }, uThreshold: { value: 0 } });
  private readonly upsample = passMaterial(UPSAMPLE, { tSource: { value: null }, uTexel: { value: new THREE.Vector2() } }, { blending: THREE.AdditiveBlending, transparent: true });
  private readonly composite = passMaterial(COMPOSITE, {
    tLit: { value: null }, tBloom: { value: null }, uBloomStrength: { value: 0 }, uBloomLevels: { value: 1 },
    uExposure: { value: 1 }, uSaturation: { value: 1 }, uContrast: { value: 1 },
    uShadowTint: { value: new THREE.Vector3(1, 1, 1) }, uHighlightTint: { value: new THREE.Vector3(1, 1, 1) },
    uVignette: { value: 0 }, uGrain: { value: 0 }, uTime: { value: 0 }, uResolution: { value: new THREE.Vector2(1, 1) },
  });

  /** Returns null when HDR targets are unavailable; callers keep direct rendering.
   * The volume factory runs only once the pipeline is known to work. */
  static create(renderer: THREE.WebGLRenderer, options: { settings?: Partial<PostSettings>; volume?: (() => VolumeEffect) | null } = {}): HdrPipeline | null {
    if (!supportsHdrTargets(renderer)) return null;
    const pipeline = new HdrPipeline(renderer, options.settings, null);
    if (!pipeline.probe()) { pipeline.dispose(); return null; }
    if (options.volume) { pipeline.volume = options.volume(); pipeline.report.volume = true; }
    return pipeline;
  }

  private constructor(private readonly renderer: THREE.WebGLRenderer, settings: Partial<PostSettings> | undefined, private volume: VolumeEffect | null) {
    this.settings = { ...DEFAULT_POST, ...settings };
    const gl = renderer.getContext() as WebGL2RenderingContext;
    this.maxSamples = Number(gl.getParameter(gl.MAX_SAMPLES)) || 0;
    this.report = { type: 'half-float', msaa: 0, ao: this.settings.aoStrength > 0, volume: !!volume, bloomLevels: 0 };
  }

  private maxSamples: number;

  /** Allocates a tiny multisampled half-float target and checks completeness. */
  private probe(): boolean {
    const gl = this.renderer.getContext() as WebGL2RenderingContext;
    const previous = this.renderer.getRenderTarget();
    for (const samples of [msaaSamples(1, this.maxSamples), 0]) {
      const target = createTarget(4, 4, { samples, depthTexture: true });
      try {
        this.renderer.setRenderTarget(target);
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE) {
          if (!samples) this.maxSamples = 0;
          return true;
        }
      } finally {
        this.renderer.setRenderTarget(previous);
        disposeTarget(target);
      }
    }
    return false;
  }

  setSize(width: number, height: number, pixelRatio: number) {
    if (this.disposed) return;
    const w = Math.max(1, Math.round(width * pixelRatio)), h = Math.max(1, Math.round(height * pixelRatio));
    if (w === this.width && h === this.height && this.sceneTarget) return;
    this.width = w; this.height = h;
    this.releaseTargets();
    const samples = msaaSamples(pixelRatio, this.maxSamples);
    this.sceneTarget = createTarget(w, h, { samples, depthTexture: true });
    const half: [number, number] = [Math.max(1, Math.floor(w / 2)), Math.max(1, Math.floor(h / 2))];
    if (this.settings.aoStrength > 0) {
      this.aoTarget = createTarget(...half, { type: THREE.UnsignedByteType });
      this.aoBlurTarget = createTarget(...half, { type: THREE.UnsignedByteType });
    }
    if (this.volume) { this.volumeTarget = createTarget(...half); this.volumeBlurTarget = createTarget(...half); }
    if (this.aoTarget || this.volumeTarget) this.litTarget = createTarget(w, h);
    this.mips = bloomChain(w, h).map(([mw, mh]) => createTarget(mw, mh));
    this.report = { type: 'half-float', msaa: samples, ao: !!this.aoTarget, volume: !!this.volumeTarget, bloomLevels: this.mips.length };
  }

  render(scene: THREE.Scene, camera: THREE.PerspectiveCamera, time: number) {
    if (this.disposed || !this.sceneTarget) { this.renderer.render(scene, camera); return; }
    const renderer = this.renderer;
    const autoClear = renderer.autoClear;
    const autoReset = renderer.info.autoReset;
    renderer.info.reset();
    renderer.info.autoReset = false;
    try {
      renderer.autoClear = true;
      renderer.setRenderTarget(this.sceneTarget);
      renderer.render(scene, camera);
      renderer.autoClear = false;
      this.frame++;
      const s = this.settings;
      const depth = this.sceneTarget.depthTexture;
      this.cameraUniforms.tDepth.value = depth;
      this.cameraUniforms.uProjection.value.copy(camera.projectionMatrix);
      this.cameraUniforms.uInverseProjection.value.copy(camera.projectionMatrixInverse);

      if (this.aoTarget && this.aoBlurTarget) {
        this.ao.uniforms.uResolution.value.set(this.aoTarget.width, this.aoTarget.height);
        this.ao.uniforms.uRadius.value = s.aoRadius;
        // Scale by the radius so the response is independent of world units.
        this.ao.uniforms.uIntensity.value = s.aoRadius;
        this.pass.render(renderer, this.ao, this.aoTarget);
        this.aoBlur.uniforms.tAo.value = this.aoTarget.texture;
        this.aoBlur.uniforms.uTexel.value.set(1 / this.aoTarget.width, 1 / this.aoTarget.height);
        this.pass.render(renderer, this.aoBlur, this.aoBlurTarget);
      }
      if (this.volume && this.volumeTarget) {
        const material = this.volume.material;
        setUniform(material, 'tDepth', depth);
        setUniform(material, 'uProjection', this.cameraUniforms.uProjection.value);
        setUniform(material, 'uInverseProjection', this.cameraUniforms.uInverseProjection.value);
        setUniform(material, 'uCameraWorld', camera.matrixWorld);
        setUniform(material, 'uResolution', this.volumeSize.set(this.volumeTarget.width, this.volumeTarget.height));
        setUniform(material, 'uTime', time);
        setUniform(material, 'uFrame', this.frame);
        this.volume.update?.(time, camera);
        this.pass.render(renderer, material, this.volumeTarget);
        if (this.volumeBlurTarget) {
          const blur = this.volumeBlur.uniforms;
          blur.tSource.value = this.volumeTarget.texture;
          blur.uStep.value.set(1 / this.volumeTarget.width, 0);
          this.pass.render(renderer, this.volumeBlur, this.volumeBlurTarget);
          blur.tSource.value = this.volumeBlurTarget.texture;
          blur.uStep.value.set(0, 1 / this.volumeTarget.height);
          this.pass.render(renderer, this.volumeBlur, this.volumeTarget);
        }
      }
      let lit = this.sceneTarget.texture;
      if (this.litTarget) {
        const u = this.combine.uniforms;
        u.tScene.value = this.sceneTarget.texture;
        u.tAo.value = this.aoBlurTarget?.texture ?? null;
        u.uUseAo.value = this.aoBlurTarget ? 1 : 0;
        u.uAoStrength.value = s.aoStrength;
        u.tVolume.value = this.volumeTarget?.texture ?? null;
        u.uUseVolume.value = this.volumeTarget ? 1 : 0;
        if (this.volumeTarget) u.uVolumeSize.value.set(this.volumeTarget.width, this.volumeTarget.height);
        this.pass.render(renderer, this.combine, this.litTarget);
        lit = this.litTarget.texture;
      }

      // Bloom pyramid.
      let source = lit, sw = this.width, sh = this.height;
      this.mips.forEach((mip, index) => {
        const u = this.downsample.uniforms;
        u.tSource.value = source; u.uTexel.value.set(1 / sw, 1 / sh);
        u.uFirst.value = index === 0 ? 1 : 0; u.uThreshold.value = s.bloomThreshold;
        this.pass.render(renderer, this.downsample, mip);
        source = mip.texture; sw = mip.width; sh = mip.height;
      });
      for (let index = this.mips.length - 2; index >= 0; index--) {
        const lower = this.mips[index + 1];
        this.upsample.uniforms.tSource.value = lower.texture;
        this.upsample.uniforms.uTexel.value.set(1 / lower.width, 1 / lower.height);
        this.pass.render(renderer, this.upsample, this.mips[index]);
      }

      const u = this.composite.uniforms;
      u.tLit.value = lit;
      u.tBloom.value = this.mips[0].texture;
      u.uBloomLevels.value = this.mips.length;
      u.uBloomStrength.value = s.bloomStrength;
      u.uExposure.value = s.exposure;
      u.uSaturation.value = s.saturation;
      u.uContrast.value = s.contrast;
      u.uShadowTint.value.set(...s.shadowTint);
      u.uHighlightTint.value.set(...s.highlightTint);
      u.uVignette.value = s.vignette;
      u.uGrain.value = s.grain;
      u.uTime.value = time;
      u.uResolution.value.set(this.width, this.height);
      this.pass.render(renderer, this.composite, null);
    } finally {
      renderer.autoClear = autoClear;
      renderer.info.autoReset = autoReset;
      renderer.setRenderTarget(null);
    }
  }

  private releaseTargets() {
    [this.sceneTarget, this.litTarget, this.aoTarget, this.aoBlurTarget, this.volumeTarget, this.volumeBlurTarget, ...this.mips].forEach(disposeTarget);
    this.sceneTarget = this.litTarget = this.aoTarget = this.aoBlurTarget = this.volumeTarget = this.volumeBlurTarget = null;
    this.mips = [];
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.releaseTargets();
    [this.ao, this.aoBlur, this.volumeBlur, this.combine, this.downsample, this.upsample, this.composite].forEach(material => material.dispose());
    this.volume?.material.dispose();
    this.volume = null;
    this.pass.dispose();
  }
}
