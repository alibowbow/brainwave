import * as THREE from 'three';
import { seeded } from '../shared/render/noise';

/*
 * One motivated key light for the morning forest: a low, warm sun ahead of the
 * seated viewer, behind the canopy. The canopy is a procedural light cookie in
 * a plane projected along the sun direction. Every lit surface, the volumetric
 * shafts and the canopy's own gaps read the same cookie, so sunflecks on the
 * ground, shafts in the mist and holes between crowns line up exactly.
 * All original code; nothing is loaded.
 */

/** Unit vector toward the sun: 20 degrees up, 15 degrees right of the view axis. */
export const SUN_DIRECTION = new THREE.Vector3(
  Math.sin(THREE.MathUtils.degToRad(15)) * Math.cos(THREE.MathUtils.degToRad(20)),
  Math.sin(THREE.MathUtils.degToRad(20)),
  -Math.cos(THREE.MathUtils.degToRad(15)) * Math.cos(THREE.MathUtils.degToRad(20)),
).normalize();
/** Low morning sun, warm but not orange. Linear. */
export const SUN_COLOR = new THREE.Color(1.0, 0.8, 0.58);
export const SUN_INTENSITY = 7.5;
export const WATER_LEVEL = 0.075;

// ---------------------------------------------------------------------------
// Fast periodic value noise for CPU-side generation (cookie, mist texture).
const PERIOD = 256;
const lattice = (() => {
  const random = seeded(91017);
  const values = new Float32Array(PERIOD * PERIOD);
  for (let i = 0; i < values.length; i++) values[i] = random() * 2 - 1;
  return values;
})();
const quintic = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/** Smooth value noise in [-1, 1], periodic in both axes over `period` cells (power of two <= 256). */
export function valueNoise2(x: number, y: number, period = PERIOD) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = quintic(x - ix), fy = quintic(y - iy);
  const mask = period - 1;
  const x0 = ix & mask, x1 = (ix + 1) & mask, y0 = (iy & mask) * PERIOD, y1 = ((iy + 1) & mask) * PERIOD;
  const a = lattice[y0 + x0], b = lattice[y0 + x1], c = lattice[y1 + x0], d = lattice[y1 + x1];
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

export function fbm2(x: number, y: number, octaves = 4) {
  let sum = 0, amplitude = 0.5;
  for (let i = 0; i < octaves; i++) {
    sum += amplitude * valueNoise2(x, y);
    const nx = (0.8 * x - 0.6 * y) * 2.03 + 17.3, ny = (0.6 * x + 0.8 * y) * 2.03 + 5.1;
    x = nx; y = ny; amplitude *= 0.5;
  }
  return sum;
}

const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// ---------------------------------------------------------------------------
// Canopy light cookie.

/** Where the light that reaches point p crosses the y = 0 plane. */
export function canopyPlane(x: number, y: number, z: number): [number, number] {
  return [x - SUN_DIRECTION.x / SUN_DIRECTION.y * y, z - SUN_DIRECTION.z / SUN_DIRECTION.y * y];
}

// Deliberate openings: the pool, the near bank and a few shafts across the view.
const GAPS: Array<[number, number, number, number]> = [
  [0.35, -1.0, 1.25, 1.0], [-1.6, 1.9, 0.6, 0.7], [1.9, 2.6, 0.45, 0.65],
  [2.4, -8.6, 0.85, 1.0], [-3.4, -12.8, 1.0, 1.0], [5.6, -16.5, 0.9, 0.9],
  [-1.0, -21.5, 1.3, 1.0], [-7.5, -7.0, 0.8, 0.8], [8.0, -4.5, 0.7, 0.75],
  [-1.9, 4.3, 0.5, 0.85], [0.4, 4.6, 0.45, 0.8], [1.0, 1.1, 0.7, 0.9],
  [-2.6, 2.9, 0.4, 0.8], [2.9, 3.9, 0.4, 0.75], [-0.7, 3.6, 0.3, 0.7], [2.0, 2.2, 0.35, 0.7],
];

/**
 * Fraction of direct sun passing the canopy above the ground point q (in the
 * y = 0 plane). A low sun stretches each round canopy hole along its azimuth
 * by 1 / sin(elevation), so the noise is evaluated in compressed coordinates.
 */
export function canopyOpenness(qx: number, qz: number) {
  const ax = SUN_DIRECTION.x, az = SUN_DIRECTION.z, horizontal = Math.hypot(ax, az);
  const along = (qx * ax + qz * az) / horizontal * SUN_DIRECTION.y;
  const across = (qx * -az + qz * ax) / horizontal;
  const crowns = fbm2(along * 0.12 + 3.1, across * 0.12 + 8.7, 4);
  const holes = smooth(0.2, 0.42, crowns + 0.2 * valueNoise2(along * 0.55 + 1.3, across * 0.55 + 4.4));
  const pin = smooth(0.5, 0.78, valueNoise2(along * 1.9 + 9.2, across * 1.9 + 2.6)) * smooth(-0.12, 0.22, crowns);
  let open = holes + pin * 0.8;
  for (const [gx, gz, radius, strength] of GAPS) {
    const dx = (qx - gx), dz = (qz - gz);
    const ga = (dx * ax + dz * az) / horizontal * SUN_DIRECTION.y, gc = (dx * -az + dz * ax) / horizontal;
    open = Math.max(open, strength * smooth(1, 0.35, Math.hypot(ga, gc) / radius));
  }
  // Leaves inside every opening break the light into dapples.
  const leaves = smooth(-0.32, 0.28, fbm2(along * 3.4 + 0.7, across * 3.4 + 6.1, 2));
  return Math.min(1, Math.max(0, open * (0.3 + 0.7 * leaves)));
}

const COOKIE = { x0: -48, z0: -88, width: 92, depth: 132, columns: 368, rows: 528 };

export interface CanopyCookie {
  texture: THREE.DataTexture;
  /** (x0, z0, 1 / width, 1 / depth) of the y = 0 plane the texture covers. */
  rect: THREE.Vector4;
  /** Bilinear CPU sample of the same texture, at a world point. */
  sample(x: number, y: number, z: number): number;
  dispose(): void;
}

export function createCanopyCookie(): CanopyCookie {
  const { x0, z0, width, depth, columns, rows } = COOKIE;
  const data = new Uint8Array(columns * rows);
  for (let j = 0; j < rows; j++) {
    const qz = z0 + (j + 0.5) / rows * depth;
    for (let i = 0; i < columns; i++) data[j * columns + i] = Math.round(canopyOpenness(x0 + (i + 0.5) / columns * width, qz) * 255);
  }
  const texture = new THREE.DataTexture(data, columns, rows, THREE.RedFormat, THREE.UnsignedByteType);
  texture.name = 'Forest canopy light cookie';
  texture.colorSpace = THREE.NoColorSpace;
  texture.magFilter = THREE.LinearFilter; texture.minFilter = THREE.LinearFilter;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = false; texture.unpackAlignment = 1;
  texture.needsUpdate = true;
  const fetch = (i: number, j: number) => data[Math.min(rows - 1, Math.max(0, j)) * columns + Math.min(columns - 1, Math.max(0, i))] / 255;
  return {
    texture,
    rect: new THREE.Vector4(x0, z0, 1 / width, 1 / depth),
    sample(x, y, z) {
      const [qx, qz] = canopyPlane(x, y, z);
      const u = (qx - x0) / width * columns - 0.5, v = (qz - z0) / depth * rows - 0.5;
      const i = Math.floor(u), j = Math.floor(v), fu = u - i, fv = v - j;
      const value = (fetch(i, j) * (1 - fu) + fetch(i + 1, j) * fu) * (1 - fv) + (fetch(i, j + 1) * (1 - fu) + fetch(i + 1, j + 1) * fu) * fv;
      return THREE.MathUtils.lerp(value, 1, smooth(11, 20, y));
    },
    dispose: () => texture.dispose(),
  };
}

/** Tileable 128 px value-noise texture (two octaves in R and G) for drifting mist. */
export function createMistNoise() {
  const size = 128, data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const a = valueNoise2(x / 16, y / 16, 8) * 0.65 + valueNoise2(x / 8, y / 8, 16) * 0.35;
    const b = valueNoise2(x / 32 + 3, y / 32 + 7, 4) * 0.6 + valueNoise2(x / 4 + 1, y / 4 + 2, 32) * 0.4;
    const o = (y * size + x) * 4;
    data[o] = Math.round((a * 0.5 + 0.5) * 255); data[o + 1] = Math.round((b * 0.5 + 0.5) * 255); data[o + 2] = 0; data[o + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.UnsignedByteType);
  texture.name = 'Forest mist noise';
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter; texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

// ---------------------------------------------------------------------------
// Shader patches shared by every lit forest material.

export interface ForestLightUniforms {
  uForestCookie: THREE.IUniform<THREE.Texture | null>;
  uForestCookieRect: THREE.IUniform<THREE.Vector4>;
  uForestSun: THREE.IUniform<THREE.Vector3>;
  uForestSunRadiance: THREE.IUniform<THREE.Vector3>;
  uForestTime: THREE.IUniform<number>;
}

export function createForestLightUniforms(cookie: CanopyCookie | null, time: { value: number }): ForestLightUniforms {
  const radiance = new THREE.Vector3(SUN_COLOR.r, SUN_COLOR.g, SUN_COLOR.b).multiplyScalar(SUN_INTENSITY / Math.PI);
  return {
    uForestCookie: { value: cookie?.texture ?? null },
    uForestCookieRect: { value: cookie?.rect ?? new THREE.Vector4(0, 0, 1, 1) },
    uForestSun: { value: SUN_DIRECTION.clone() },
    uForestSunRadiance: { value: radiance },
    uForestTime: time,
  };
}

export const GLSL_CANOPY_LIGHT = /* glsl */ `
uniform sampler2D uForestCookie;
uniform vec4 uForestCookieRect;
uniform vec3 uForestSun;
/** Openness of the canopy along the sun ray through p. */
float forestCanopyCookie(vec3 p) {
  vec2 q = p.xz - uForestSun.xz * (p.y / uForestSun.y);
  return texture2D(uForestCookie, (q - uForestCookieRect.xy) * uForestCookieRect.zw).r;
}
/** Direct sun reaching a surface at p (crown tops are lit regardless of the gaps below them). */
float forestCanopyLight(vec3 p) {
  return mix(forestCanopyCookie(p), 1.0, smoothstep(11.0, 20.0, p.y));
}
`;

/** Sunlight refracted by the moving pool surface onto whatever lies below it. Needs bwNoise. */
const GLSL_CAUSTICS = /* glsl */ `
float forestCaustic(vec2 p, float t) {
  float a = pow(max(1.0 - abs(bwNoise(vec3(p * 2.9, t * 0.21))), 0.0), 7.0);
  float b = pow(max(1.0 - abs(bwNoise(vec3(p * 4.1 + 3.7, t * 0.17 + 5.0))), 0.0), 7.0);
  return a * 0.75 + b * 0.55 + a * b * 2.4;
}
`;

export interface ForestSurfaceOptions {
  key: string;
  /** Caustics, absorption and damped specular below the pool surface. The material must already define bwNoise. */
  underwater?: boolean;
  /** Thin-tissue transmission of sunlight (leaves, fronds, grass blades). */
  translucency?: number;
  /** Slow trunk bend shared with the tree it belongs to (needs an aTree attribute: base xyz, height). */
  treeWind?: boolean;
  /** Branch-level sway of each instance about its anchor, metres at the top of a tree / tip of a plant. */
  sway?: number;
  /** Small per-vertex leaf flutter, weighted by uv.y (card tip), metres. */
  flutter?: number;
  /** Plant sway weighted by uv.y squared (rooted fronds and blades) instead of tree height. */
  rooted?: boolean;
  /** Blend card normals toward an instanced crown normal (aLeaf.xyz) and darken by aLeaf.w. */
  crown?: boolean;
  /** Keep coverage of alpha-cut cards at a distance, where mip filtering thins them. */
  alphaMipBoost?: number;
  /** Extra GLSL run after the forest varyings are set (world position in vForestWorld). */
  fragmentColor?: string;
}

const lightsChunk = () => {
  const chunk = THREE.ShaderChunk.lights_fragment_begin;
  const anchor = 'getDirectionalLightInfo( directionalLight, directLight );';
  if (!chunk.includes(anchor)) throw new Error('Forest canopy light: unexpected three.js lights chunk.');
  // Only the sun is a directional light in this scene.
  return chunk.replace(anchor, `${anchor}\n\t\tdirectLight.color *= forestSunVisibility;`);
};

/** Adds the canopy cookie to the sun, plus optional wind, translucency and underwater light. */
export function applyForestSurface<T extends THREE.MeshStandardMaterial>(material: T, uniforms: ForestLightUniforms, options: ForestSurfaceOptions): T {
  const previous = material.onBeforeCompile;
  const o = { translucency: 0, sway: 0, flutter: 0, ...options };
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    Object.assign(shader.uniforms, uniforms);
    const windNeeded = o.treeWind || o.sway > 0 || o.flutter > 0;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
uniform float uForestTime;
varying vec3 vForestWorld;
${o.crown ? 'attribute vec4 aLeaf;\nvarying float vForestOcclusion;' : ''}
${o.treeWind ? 'attribute vec4 aTree;' : ''}`)
      .replace('#include <project_vertex>', `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
mvPosition = instanceMatrix * mvPosition;
#endif
${windNeeded ? `{
  // Wind meshes sit at the origin, so instance space is world space here.
  float forestT = uForestTime;
  #ifdef USE_INSTANCING
  vec3 forestAnchor = instanceMatrix[3].xyz;
  #else
  vec3 forestAnchor = mvPosition.xyz;
  #endif
  float forestPhase = dot(forestAnchor, vec3(0.41, 0.17, 0.29));
  float forestWeight = 1.0;
  ${o.treeWind ? `
  float forestH = clamp((mvPosition.y - aTree.y) / max(aTree.w, 1.0), 0.0, 1.3);
  float forestTreePhase = aTree.x * 0.37 + aTree.z * 0.23;
  vec2 forestBend = vec2(sin(forestT * 0.29 + forestTreePhase) + 0.35 * sin(forestT * 0.71 + forestTreePhase * 1.7), cos(forestT * 0.23 + forestTreePhase * 1.3) * 0.7);
  mvPosition.xz += forestBend * (aTree.w * 0.0062) * forestH * forestH;
  forestWeight = forestH;` : ''}
  ${o.rooted ? 'forestWeight = uv.y * uv.y;' : ''}
  ${o.sway > 0 ? `mvPosition.xyz += vec3(sin(forestT * 0.53 + forestPhase), sin(forestT * 0.41 + forestPhase * 1.9) * 0.35, cos(forestT * 0.47 + forestPhase * 1.3)) * ${o.sway.toFixed(4)} * forestWeight;` : ''}
  ${o.flutter > 0 ? `mvPosition.xyz += vec3(sin(forestT * 1.31 + forestPhase * 3.1 + position.x * 5.0), cos(forestT * 1.07 + forestPhase * 2.3 + position.z * 5.0) * 0.6, sin(forestT * 1.63 + forestPhase * 1.3 + position.y * 4.0)) * ${o.flutter.toFixed(4)} * uv.y;` : ''}
}` : ''}
vForestWorld = (modelMatrix * mvPosition).xyz;
${o.crown ? 'vForestOcclusion = aLeaf.w;' : ''}
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`);
    if (o.crown) {
      shader.vertexShader = shader.vertexShader.replace('#include <defaultnormal_vertex>', `#include <defaultnormal_vertex>
// Crown-scale shading: each card leans toward its crown's outward normal.
transformedNormal = normalize(mix(normalize(transformedNormal), normalize(mat3(viewMatrix) * aLeaf.xyz), 0.62));`);
    }
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float uForestTime;
uniform vec3 uForestSunRadiance;
varying vec3 vForestWorld;
${o.crown ? 'varying float vForestOcclusion;' : ''}`)
      .replace('void main() {', `${GLSL_CANOPY_LIGHT}
${o.underwater ? GLSL_CAUSTICS : ''}
void main() {`)
      .replace('#include <lights_fragment_begin>', `float forestSunVisibility = forestCanopyLight(vForestWorld);
${lightsChunk()}`);
    if (o.alphaMipBoost) {
      shader.fragmentShader = shader.fragmentShader.replace('#include <alphatest_fragment>', `
#ifdef USE_MAP
{
  vec2 forestTexel = vMapUv * vec2(textureSize(map, 0));
  float forestMip = 0.5 * log2(max(max(dot(dFdx(forestTexel), dFdx(forestTexel)), dot(dFdy(forestTexel), dFdy(forestTexel))), 1.0));
  diffuseColor.a *= 1.0 + forestMip * ${o.alphaMipBoost.toFixed(3)};
}
#endif
#include <alphatest_fragment>`);
    }
    if (o.crown || o.fragmentColor) {
      shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
${o.crown ? 'diffuseColor.rgb *= vForestOcclusion;' : ''}
${o.fragmentColor ?? ''}`);
    }
    if (o.crown) {
      // Card faces keep the crown normal on both sides: a crown shades as one volume.
      shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_begin>', `#include <normal_fragment_begin>
normal = normalize(vNormal);
nonPerturbedNormal = normal;`);
    }
    if (o.translucency > 0) {
      shader.fragmentShader = shader.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  // Thin leaf tissue carries sunlight through, strongest looking into the sun.
  vec3 forestView = normalize(vForestWorld - cameraPosition);
  float forestForward = pow(max(dot(forestView, uForestSun), 0.0), 4.0);
  vec3 forestTissue = diffuseColor.rgb * (diffuseColor.rgb * 2.3 + 0.05);
  float forestFacing = abs(dot(normalize((vec4(normal, 0.0) * viewMatrix).xyz), uForestSun));
  totalEmissiveRadiance += uForestSunRadiance * forestTissue * (forestForward * 1.5 + 0.12 * forestFacing + 0.06)
    * forestCanopyLight(vForestWorld) * ${o.translucency.toFixed(3)}${o.crown ? ' * vForestOcclusion' : ''};
}`);
    }
    if (o.underwater) {
      shader.fragmentShader = shader.fragmentShader.replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
{
  float forestBelow = ${WATER_LEVEL.toFixed(3)} - vForestWorld.y;
  if (forestBelow > 0.0) {
    // Refracted sun: the pattern is projected down the refracted ray.
    vec2 forestCp = vForestWorld.xz + uForestSun.xz / max(uForestSun.y, 0.2) * forestBelow * 0.55;
    float forestC = forestCaustic(forestCp, uForestTime);
    float forestW = smoothstep(0.0, 0.035, forestBelow);
    reflectedLight.directDiffuse *= mix(1.0, 0.3 + 2.6 * forestC, forestW);
    // Tannin-tinted forest water absorbs blue and some red with depth.
    vec3 forestAbsorb = exp(-vec3(1.0, 0.62, 1.45) * forestBelow * 2.2);
    reflectedLight.directDiffuse *= mix(vec3(1.0), forestAbsorb, forestW);
    reflectedLight.indirectDiffuse *= mix(vec3(1.0), forestAbsorb * vec3(0.8, 0.95, 0.85), forestW);
    reflectedLight.directSpecular *= mix(1.0, 0.08, forestW);
    reflectedLight.indirectSpecular *= mix(1.0, 0.08, forestW);
  }
}`);
    }
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|forest-light-v1|${options.key}`;
  return material;
}
