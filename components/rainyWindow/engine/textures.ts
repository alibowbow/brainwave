import * as THREE from 'three';
import { GLSL_NOISE } from './glsl';
import { createTarget, FullscreenPass, passMaterial } from './fullscreen';

/*
 * Material textures are generated on the GPU at start-up: nothing to
 * download, mip-mapped for clean grazing angles on the desk, and sized to
 * the quality tier.
 */

const HEIGHT_TO_NORMAL = /* glsl */ `
vec3 normalFromHeight(vec2 uv, vec2 texel, float strength) {
  float l = heightField(uv - vec2(texel.x, 0.0));
  float r = heightField(uv + vec2(texel.x, 0.0));
  float d = heightField(uv - vec2(0.0, texel.y));
  float u = heightField(uv + vec2(0.0, texel.y));
  return normalize(vec3((l - r) * strength, (d - u) * strength, 1.0));
}
`;

const WOOD = /* glsl */ `
${GLSL_NOISE}
uniform vec2 uSize;
uniform vec2 uTexel;
uniform int uMode;
varying vec2 vUv;

// Walnut desk glued from flat-sawn boards. Each board's growth rings circle a
// pith below the surface; the tree's taper slides them along the board, which
// draws the familiar cathedral arches. Pores and fibres run with the grain.
struct Wood { float late; float ringPos; float board; float seam; vec3 rnd; };

Wood woodAt(vec2 p) {
  Wood w;
  float boardWidth = 0.19;
  float across = p.y + gfbm(vec2(p.x * 0.4, p.y * 0.5)) * 0.004;
  float index = floor(across / boardWidth);
  float within = across - index * boardWidth;
  w.rnd = hash32(vec2(index, 3.7));
  float pith = boardWidth * (0.15 + 0.7 * w.rnd.x);
  float depth = 0.05 + 0.22 * w.rnd.y;
  float taper = (w.rnd.z - 0.5) * 0.09;
  // The trunk wanders and tapers unevenly, so arches never repeat regularly.
  float d = max(0.02, depth + (p.x - 1.3) * taper + gfbm(vec2(p.x * 0.33, index * 1.7)) * 0.05);
  float dy = within - pith + gfbm(vec2(p.x * 0.5, index * 2.3 + 4.0)) * 0.02;
  float r = sqrt(dy * dy + d * d);
  r += gfbm(vec2(p.x * 1.1, p.y * 5.0) + index * 7.0) * 0.0045;
  r += gfbm(vec2(p.x * 0.25, p.y * 1.6) + index * 3.0) * 0.009;
  // Good and lean years: uneven ring widths.
  float growth = r * 110.0 + gnoise(vec2(r * 9.0, index * 3.1)) * 3.5 + gnoise(vec2(r * 38.0, index + 9.0)) * 1.4;
  w.ringPos = growth;
  float ring = fract(growth);
  w.late = smoothstep(0.52, 0.86, ring) * (1.0 - smoothstep(0.9, 1.0, ring));
  w.board = index;
  float edge = min(within, boardWidth - within);
  w.seam = 1.0 - smoothstep(0.0, 0.0012, edge);
  return w;
}
float fibres(vec2 p) {
  float bend = gfbm(vec2(p.x * 0.8, p.y * 3.0)) * 0.01;
  // Kept below the bake's Nyquist limit (~390 cycles/m across the grain).
  return gnoise(vec2(p.x * 2.5, (p.y + bend) * 150.0)) * 0.6 + gnoise(vec2(p.x * 6.0, (p.y + bend) * 260.0)) * 0.4;
}
float pores(vec2 p) {
  float bend = gfbm(vec2(p.x * 0.8, p.y * 3.0)) * 0.01;
  return smoothstep(0.8, 0.96, vnoise(vec2(p.x * 60.0, (p.y + bend) * 300.0)));
}
float heightField(vec2 uv) {
  vec2 p = uv * uSize;
  Wood w = woodAt(p);
  return -w.late * 0.12 + fibres(p) * 0.12 - pores(p) * 0.5 - w.seam * 0.6 + gfbm(p * 2.5) * 0.1;
}
${HEIGHT_TO_NORMAL}
void main() {
  vec2 p = vUv * uSize;
  Wood w = woodAt(p);
  float fine = fibres(p);
  float pore = pores(p);
  if (uMode == 0) {
    // Board-to-board colour variation, darker latewood, soft sapwood-like streaks.
    float boardTone = mix(0.78, 1.18, w.rnd.y) * (0.92 + 0.16 * w.rnd.z);
    vec3 earlywood = vec3(0.13, 0.072, 0.037) * boardTone;
    vec3 latewood = vec3(0.052, 0.027, 0.014) * boardTone;
    float streak = gfbm(vec2(p.x * 0.12, p.y * 9.0) + w.board * 5.0) + 0.5;
    float mineral = smoothstep(0.62, 0.9, gfbm(vec2(p.x * 0.3, p.y * 16.0) + w.board * 11.0) + 0.5);
    vec3 color = mix(earlywood, latewood, w.late * 0.24);
    color *= mix(0.72, 1.24, smoothstep(0.05, 0.95, streak));
    color = mix(color, latewood * 0.75, mineral * 0.45);
    color *= 0.92 + 0.14 * (fine * 0.5 + 0.5);
    color = mix(color, latewood * 0.6, pore * 0.3);
    color *= 1.0 - w.seam * 0.5;
    gl_FragColor = vec4(color, 1.0);
  } else if (uMode == 1) {
    float wipe = gfbm(p * vec2(1.6, 5.0) + 7.0) * 0.5 + 0.5;
    float roughness = 0.34 + pore * 0.3 + w.late * 0.04 + (wipe - 0.5) * 0.16 + fine * 0.02;
    gl_FragColor = vec4(1.0, clamp(roughness, 0.05, 1.0), 0.0, 1.0);
  } else {
    vec3 n = normalFromHeight(vUv, uTexel, 1.1);
    gl_FragColor = vec4(n * 0.5 + 0.5, 1.0);
  }
}
`;

const PAPER = /* glsl */ `
${GLSL_NOISE}
uniform vec2 uSize;
varying vec2 vUv;

// Distance to a hand-written stroke along one ruled line.
float handwriting(vec2 p, float lineY, float seed, float xStart, float xEnd) {
  float x = p.x;
  if (x < xStart || x > xEnd) return 0.0;
  float word = floor((x - xStart) / 0.0135 + hash11(seed) * 3.0);
  float wordRnd = hash12(vec2(word, seed));
  float inWord = step(0.18, fract((x - xStart) / 0.0135 + hash11(seed) * 3.0)) * step(0.12, wordRnd);
  float stroke = lineY + 0.0012 + sin(x * 2400.0 + seed * 7.0 + sin(x * 900.0 + word) * 2.0) * 0.0011 * (0.6 + 0.8 * wordRnd)
    + sin(x * 610.0 + seed) * 0.0004;
  float d = abs(p.y - stroke);
  float ink = 1.0 - smoothstep(0.00018, 0.0004, d);
  float ascender = step(0.8, hash12(vec2(floor(x / 0.0021), seed))) * (1.0 - smoothstep(0.0, 0.0003, abs(fract(x / 0.0021) * 0.0021 - 0.001))) * step(lineY, p.y) * step(p.y, lineY + 0.0038);
  return max(ink, ascender * 0.8) * inWord;
}

void main() {
  vec2 p = vUv * uSize;
  float fibres = fbm(p * vec2(900.0, 700.0)) * 0.5 + fbm(p * 180.0) * 0.5;
  vec3 paper = vec3(0.6, 0.575, 0.52) * (0.965 + 0.05 * fibres);
  float page = step(uSize.x * 0.5, p.x);
  float localX = p.x - page * uSize.x * 0.5;
  float spacing = 0.0072;
  float lineIndex = floor((p.y - 0.018) / spacing);
  float lineY = 0.018 + lineIndex * spacing;
  float ruled = (1.0 - smoothstep(0.00008, 0.00022, abs(p.y - lineY))) * step(0.018, p.y) * step(p.y, uSize.y - 0.012);
  paper = mix(paper, vec3(0.3, 0.38, 0.52), ruled * 0.45);
  float margin = 1.0 - smoothstep(0.0001, 0.00028, abs(localX - 0.022));
  paper = mix(paper, vec3(0.7, 0.32, 0.3), margin * 0.22 * step(0.012, p.y));
  float written = 0.0;
  float lineSeed = lineIndex + page * 91.0;
  bool writes = page < 0.5 ? (lineIndex > 1.0 && lineIndex < 24.0 && hash11(lineSeed * 1.7) > 0.12) : (lineIndex > 1.0 && lineIndex < 9.0 && hash11(lineSeed * 2.3) > 0.35);
  if (writes) {
    float xEnd = 0.026 + (uSize.x * 0.5 - 0.036) * mix(0.55, 1.0, hash11(lineSeed * 3.1));
    written = handwriting(vec2(localX, p.y), lineY, lineSeed, 0.026, xEnd);
  }
  paper = mix(paper, vec3(0.07, 0.085, 0.16), written * 0.78);
  gl_FragColor = vec4(paper, 1.0);
}
`;

const CERAMIC = /* glsl */ `
${GLSL_NOISE}
uniform int uMode;
varying vec2 vUv;
void main() {
  vec2 p = vec2(vUv.x * 6.0, vUv.y * 3.0);
  float speck = smoothstep(0.83, 0.93, vnoise(p * 55.0)) * 0.7 + smoothstep(0.88, 0.97, vnoise(p * 140.0 + 4.0)) * 0.5;
  float cloud = fbm(p * 3.0) - 0.5;
  if (uMode == 0) {
    float tone = 1.0 + cloud * 0.16 - speck * 0.35;
    gl_FragColor = vec4(vec3(tone), 1.0);
  } else {
    float roughness = 0.5 + cloud * 0.35 + speck * 0.2;
    gl_FragColor = vec4(1.0, clamp(roughness, 0.0, 1.0), 0.0, 1.0);
  }
}
`;

const CLOTH = /* glsl */ `
${GLSL_NOISE}
uniform vec2 uTexel;
varying vec2 vUv;
float heightField(vec2 uv) {
  vec2 p = uv * 220.0;
  float warp = sin(p.x * 3.14159) * 0.5 + 0.5;
  float weft = sin(p.y * 3.14159) * 0.5 + 0.5;
  float over = step(0.5, fract((floor(p.x) + floor(p.y)) * 0.5));
  return mix(warp, weft, over) * 0.7 + vnoise(uv * 900.0) * 0.3;
}
${HEIGHT_TO_NORMAL}
void main() {
  vec3 n = normalFromHeight(vUv, uTexel, 0.9);
  gl_FragColor = vec4(n * 0.5 + 0.5, 1.0);
}
`;

export interface BakedTextures {
  deskAlbedo: THREE.Texture;
  deskSurface: THREE.Texture;
  deskNormal: THREE.Texture;
  paper: THREE.Texture;
  ceramicTone: THREE.Texture;
  ceramicSurface: THREE.Texture;
  cloth: THREE.Texture;
  dispose(): void;
}

export function bakeTextures(renderer: THREE.WebGLRenderer, scale: number, anisotropy: number): BakedTextures {
  const pass = new FullscreenPass();
  const targets: THREE.WebGLRenderTarget[] = [];
  const materials: THREE.ShaderMaterial[] = [];
  const bake = (fragment: string, width: number, height: number, uniforms: Record<string, THREE.IUniform>, srgb = false, wrap: THREE.Wrapping = THREE.ClampToEdgeWrapping) => {
    const target = createTarget(width, height, {
      type: THREE.UnsignedByteType,
      mipmaps: true,
      wrap,
      colorSpace: srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace,
    });
    target.texture.anisotropy = anisotropy;
    const material = passMaterial(fragment, uniforms);
    pass.render(renderer, material, target);
    targets.push(target);
    materials.push(material);
    return target.texture;
  };
  const deskW = Math.round(2048 * scale);
  const deskH = Math.round(1024 * scale);
  const deskUniforms = (mode: number) => ({ uSize: { value: new THREE.Vector2(2.6, 1.3) }, uTexel: { value: new THREE.Vector2(1 / deskW, 1 / deskH) }, uMode: { value: mode } });
  const paperSize = Math.round(1024 * scale);
  const result: BakedTextures = {
    deskAlbedo: bake(WOOD, deskW, deskH, deskUniforms(0), true),
    deskSurface: bake(WOOD, deskW, deskH, deskUniforms(1)),
    deskNormal: bake(WOOD, deskW, deskH, deskUniforms(2)),
    paper: bake(PAPER, paperSize * 1.4, paperSize, { uSize: { value: new THREE.Vector2(0.3, 0.212) } }, true),
    ceramicTone: bake(CERAMIC, 512, 256, { uMode: { value: 0 } }, false, THREE.RepeatWrapping),
    ceramicSurface: bake(CERAMIC, 512, 256, { uMode: { value: 1 } }, false, THREE.RepeatWrapping),
    cloth: bake(CLOTH, 256, 256, { uTexel: { value: new THREE.Vector2(1 / 256, 1 / 256) } }, false, THREE.RepeatWrapping),
    dispose() {
      for (const target of targets) target.dispose();
    },
  };
  for (const material of materials) material.dispose();
  pass.dispose();
  return result;
}
