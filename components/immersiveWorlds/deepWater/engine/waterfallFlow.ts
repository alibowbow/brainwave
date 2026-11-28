import * as THREE from 'three';
import type { WaterfallTextures } from './waterfallTextures';

/*
 * The moving water of the waterfall valley, animated entirely on the GPU from
 * one shared clock (no per-frame CPU work beyond uniforms):
 *  - layered fall curtains: a glassy tongue at the lip that breaks into
 *    aerated white water, streaks advected at the speed of free fall, frayed
 *    translucent edges and separate side jets;
 *  - motion-blurred spray droplets thrown up at the plunge, shed from the
 *    curtain edges and splashing at the side seep;
 *  - billowing, sunlit mist puffs that rise and drift with the valley breeze;
 *  - a churning white boil where the curtain meets the pool.
 */

export interface FallShape {
  /** Centre line x and nominal lip height, metres. */
  x: number; top: number;
  /** Width at the lip; it spreads by `spread` (fraction) at the foot. */
  width: number; spread: number;
  /** z of the lip and the horizontal speed (m/s) the water leaves it with. */
  z: number; throw: number;
  /** Water surface height the curtain falls into. */
  base: number;
  seed: number; density: number;
  /** 0 back veil, 1 main curtain, 2 front strands, 3 separate jet. */
  kind: number;
  /** Sideways travel (m) of the whole sheet by the time it lands. */
  drift?: number;
  /** Optional lip height and lip z per world x, to follow a notched rim. */
  lip?: (x: number) => number;
  face?: (x: number) => number;
}

/** Shared animation state: one object, referenced by every water material. */
export interface FlowUniforms {
  time: { value: number };
  surge: { value: number };
  toSun: { value: THREE.Vector3 };
  sunColor: { value: THREE.Color };
  skyColor: { value: THREE.Color };
  fogColor: { value: THREE.Color };
  fogDensity: { value: number };
  foot: { value: THREE.Vector3 };
  sideFoot: { value: THREE.Vector3 };
  wind: { value: THREE.Vector3 };
  viewport: { value: THREE.Vector2 };
}

// Free fall used by both the curtains and the droplets shed from them. A gentler
// gravity than 9.8 keeps the motion readable at this distance.
export const FALL_GRAVITY = 7.5;
export const FALL_LIP_SPEED = 1.3;

/** Seconds since the water left the lip after dropping `s` metres. */
export function timeOfFlight(s: number) {
  const v = Math.sqrt(FALL_LIP_SPEED * FALL_LIP_SPEED + 2 * FALL_GRAVITY * Math.max(0, s));
  return (v - FALL_LIP_SPEED) / FALL_GRAVITY;
}

const GLSL_FOG = /* glsl */ `
uniform vec3 uFogColor;
uniform float uFogDensity;
vec3 applyHaze(vec3 color, vec3 world) {
  float d = length(cameraPosition - world) * uFogDensity;
  return mix(color, uFogColor, 1.0 - exp(-d * d));
}
`;

const FALL_VERTEX = /* glsl */ `
attribute vec4 aSheet;
attribute vec4 aEdge;
uniform float uTime;
varying vec2 vUv;
varying vec4 vSheet;
varying vec4 vEdge;
varying vec3 vWorld;
void main() {
  vUv = uv; vSheet = aSheet; vEdge = aEdge;
  vec3 p = position;
  // The lower curtain sways a little in the draught of its own fall.
  float sway = uv.y * uv.y;
  p.x += (sin(uTime * 0.83 + p.y * 0.31 + aSheet.x) * 0.05 + sin(uTime * 1.7 + p.y * 0.9 + aSheet.x * 2.0) * 0.015) * sway;
  p.z += sin(uTime * 1.21 + p.y * 0.47 + aEdge.x * 2.1 + aSheet.x) * 0.06 * sway;
  vec4 world = modelMatrix * vec4(p, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const FALL_FRAGMENT = /* glsl */ `
uniform float uTime;
uniform float uSurge;
uniform sampler2D tFall;
uniform vec3 uToSun;
uniform vec3 uSunColor;
uniform vec3 uSkyColor;
${GLSL_FOG}
varying vec2 vUv;
varying vec4 vSheet;
varying vec4 vEdge;     // across (m), half width (m), drop below the lip (m), column height (m)
varying vec3 vWorld;
const float G = ${FALL_GRAVITY.toFixed(2)};
const float V0 = ${FALL_LIP_SPEED.toFixed(2)};
void main() {
  float seed = vSheet.x, kind = vSheet.z;
  float s = vEdge.z, H = vEdge.w;
  float sFrac = clamp(s / H, 0.0, 1.0);
  // Texture time follows each parcel of water: features accelerate and stretch
  // downward exactly as free fall does, and never pump or stretch over time.
  float vel = sqrt(V0 * V0 + 2.0 * G * s);
  float tof = (vel - V0) / G;
  float rate = 0.9 + fract(seed * 7.31) * 0.22 + step(1.5, kind) * step(kind, 2.5) * 0.14;
  float flowT = tof / rate - uTime;
  float across = vEdge.x;
  vec4 slow = texture2D(tFall, vec2(across * 0.16 + seed * 0.13, flowT * 0.2 + seed));
  float warp = slow.a - 0.5;
  // Broad cords (~0.7 m), fine streaks, and fast aerated clumps riding on them.
  float cords = texture2D(tFall, vec2(across * 0.46 + warp * 0.25 + seed * 0.31, flowT * 0.1 + seed * 0.7)).a;
  float streak = texture2D(tFall, vec2(across * 0.42 + warp * 0.35 + seed * 0.29, flowT * 0.55)).r;
  float clump = texture2D(tFall, vec2(across * 0.55 + warp * 0.2 + seed * 0.71, flowT * 2.4 + seed * 0.37)).g;
  float grain = texture2D(tFall, vec2(across * 0.9 + warp * 0.5 + seed * 0.53, flowT * 1.3)).b;
  // Thickness opens into long vertical slits (cords, streaks); clumps mostly
  // brighten the water rather than punching round holes in it.
  float thick = clamp(0.5 + (cords - 0.5) * 1.6 + (streak - 0.5) * 0.9 + (clump - 0.5) * 0.35 * smoothstep(1.0, 4.0, s), 0.0, 1.0);

  // The smooth tongue breaks into white water a metre or two below the lip,
  // earlier where a clump or a strong cord disturbs it.
  float aer = smoothstep(0.0, 1.3, s - 0.6 - (clump - 0.5) * 1.8 - (streak - 0.5) * 1.4);
  float foot = smoothstep(H - 3.5, H, s);

  // Edges meander and fray into strands as the curtain falls and spreads.
  float halfW = vEdge.y * (1.0 + warp * 0.35 * sFrac);
  float edgeDist = halfW - abs(across);
  float fray = (0.05 + 1.1 * smoothstep(0.0, 0.7, sFrac) + 0.6 * foot) * (kind > 2.5 ? 0.45 : 1.0) * clamp(vEdge.y, 0.2, 1.0);
  float edge = smoothstep(0.0, fray, edgeDist - (grain - 0.5) * fray * 1.2 - (1.0 - streak) * fray * 0.6 - (1.0 - clump) * fray * 0.6 * sFrac);

  // Water spreads and thins as it falls; thin areas open into gaps.
  float thin = sFrac * 0.3 * (1.0 - foot);
  float body;
  if (kind < 0.5) body = smoothstep(0.1 + thin, 0.6 + thin, thick) * smoothstep(0.6, 3.0, s);
  else if (kind < 1.5) body = smoothstep(0.08 + thin, 0.55 + thin, thick) + 0.3 * foot;
  else if (kind < 2.5) body = smoothstep(0.55, 0.85, thick + (clump - 0.5) * 0.4) * smoothstep(1.5, 4.5, s);
  else body = smoothstep(0.35, 0.7, streak) * mix(1.0, smoothstep(0.4, 0.65, clump), smoothstep(0.3, 0.8, sFrac));
  body = clamp(body, 0.0, 1.0);

  // Curtain normal: rounded across its width, tipped up where the tongue bends
  // over the lip, with relief from the cords themselves.
  float bend = clamp(across / max(halfW, 0.05), -1.0, 1.0) * 0.9;
  float relief = clamp(dFdx(cords * 1.4 + streak) * 3.0, -0.7, 0.7);
  vec3 n = normalize(vec3(sin(bend) + relief, 0.8 * exp(-s * 1.2), cos(bend)));
  float ndl = dot(n, uToSun);
  float wrap = clamp((ndl + 0.3) / 1.3, 0.0, 1.0);
  vec3 white = uSunColor * wrap * (0.6 + 0.6 * clump * aer + 0.25 * cords) + uSkyColor * (0.42 + 0.3 * n.y);
  // Thin water scatters less: gaps between cords and frayed edges read greyer.
  white *= 0.35 + 0.65 * body;
  if (kind < 0.5) white *= 0.6;
  white *= 0.9 + 0.15 * uSurge;

  // Glassy tongue: dark transmitted water with the sky mirrored in its curve.
  vec3 V = normalize(cameraPosition - vWorld);
  float fres = 0.02 + 0.98 * pow(1.0 - abs(dot(n, V)), 5.0);
  vec3 R = reflect(-V, n);
  vec3 sky = mix(vec3(1.15, 1.25, 1.25), vec3(0.45, 0.7, 1.0), clamp(R.y, 0.0, 1.0)) * 1.2;
  vec3 glass = vec3(0.045, 0.07, 0.05) * (0.5 + streak) + sky * (fres * 0.8 + 0.06 * streak * streak);
  glass += uSunColor * pow(max(dot(R, uToSun), 0.0), 40.0) * 0.8 * streak;
  // The rounded rim of the lip catches the sky.
  glass += sky * 0.4 * exp(-s * 8.0);
  // Only the main curtain and the jets pour over the rim as a glassy tongue;
  // the veil and strands form below it.
  float glassAlpha = (kind > 0.5 && kind < 1.5) || kind > 2.5 ? 0.45 + 0.35 * streak : 0.0;

  vec3 color = mix(glass, white, aer);
  float alpha = mix(glassAlpha, body, aer) * edge * vSheet.y;
  // Feather the lip line and the landing so neither ends in a hard edge.
  alpha *= smoothstep(0.0, 0.1, s) * (1.0 - smoothstep(H - 0.5, H, s));
  color = applyHaze(color, vWorld);
  gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/** One merged mesh for every curtain, ordered back to front. Each column
 * starts at the lip above it and follows its own free-fall trajectory. */
export function createFalls(sheets: FallShape[], textures: WaterfallTextures, uniforms: FlowUniforms) {
  const positions: number[] = [], uvs: number[] = [], sheetData: number[] = [], edges: number[] = [], indices: number[] = [];
  for (const sheet of sheets) {
    const nominal = sheet.top - sheet.base;
    const rows = Math.max(24, Math.min(120, Math.round(nominal * 5)));
    const columns = sheet.kind === 3 ? 6 : sheet.kind === 0 ? 18 : 26;
    const start = positions.length / 3;
    for (let r = 0; r <= rows; r++) {
      const v = r / rows;
      for (let c = 0; c <= columns; c++) {
        const u = c / columns;
        // Columns are laid out by their lip position, then spread as they fall.
        const lipHalf = sheet.width * .5;
        const lipX = sheet.x + (u - .5) * 2 * lipHalf;
        const top = sheet.lip ? Math.min(sheet.top, sheet.lip(lipX)) : sheet.top;
        const height = top - sheet.base;
        const s = v * height;
        const halfWidth = lipHalf * (1 + sheet.spread * v + .035 * Math.sin(v * 8.4 + sheet.seed));
        const centre = sheet.x + Math.sin(v * 3.1 + sheet.seed) * .12 * v + (sheet.drift ?? 0) * Math.pow(v, 1.5);
        const across = (u - .5) * 2 * halfWidth;
        const lipZ = sheet.face ? sheet.face(lipX) : sheet.z;
        // Parabolic throw off the lip, a rounded bulge across, slight ripples.
        const bulge = Math.sin(Math.PI * u) * (.06 + .16 * v) * Math.min(1, sheet.width / 1.5);
        positions.push(
          centre + across + Math.sin(v * 43 + u * 19 + sheet.seed) * .02,
          top - s,
          lipZ + sheet.throw * timeOfFlight(s) + bulge + Math.sin(u * 11 + v * 3.5 + sheet.seed) * .07 * Math.sin(v * Math.PI),
        );
        uvs.push(u, v);
        sheetData.push(sheet.seed, sheet.density, sheet.kind, nominal);
        edges.push(across, halfWidth, s, height);
        if (r < rows && c < columns) {
          const a = start + r * (columns + 1) + c, b = a + columns + 1;
          indices.push(a, a + 1, b, a + 1, b + 1, b);
        }
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('aSheet', new THREE.Float32BufferAttribute(sheetData, 4));
  geometry.setAttribute('aEdge', new THREE.Float32BufferAttribute(edges, 4));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  const material = new THREE.ShaderMaterial({
    name: 'WaterfallCurtain',
    uniforms: {
      uTime: uniforms.time, uSurge: uniforms.surge, tFall: { value: textures.fall },
      uToSun: uniforms.toSun, uSunColor: uniforms.sunColor, uSkyColor: uniforms.skyColor,
      uFogColor: uniforms.fogColor, uFogDensity: uniforms.fogDensity,
    },
    vertexShader: FALL_VERTEX, fragmentShader: FALL_FRAGMENT,
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'waterfall-curtains';
  mesh.renderOrder = 2;
  mesh.frustumCulled = false;
  return mesh;
}

const SPRAY_VERTEX = /* glsl */ `
attribute vec2 corner;
attribute vec4 aSeed;
attribute float aKind;
uniform float uTime;
uniform float uSurge;
uniform vec2 uViewport;
uniform float uPixelScale;
uniform vec3 uFoot;
uniform vec3 uSideFoot;
uniform vec3 uWind;
uniform vec4 uFall;      // centre x, lip y, half width at the lip, drop height
uniform vec2 uFallZ;     // z at the lip, horizontal speed off the lip
uniform vec3 uSunColor;
uniform vec3 uSkyColor;
varying float vAcross;
varying float vAlpha;
varying vec3 vColor;
float rnd(float n) { return fract(sin(n) * 43758.5453123); }
vec3 ballistic(vec3 p0, vec3 v0, float drag, float g, float t) {
  float e = exp(-drag * t);
  float k = (1.0 - e) / drag;
  vec3 p = p0 + v0 * k;
  p.y -= g / drag * (t - k);
  return p;
}
void main() {
  float life, size, bright, drag, g;
  float blur = 0.035;
  vec3 p0, v0;
  float cyc, k, a;
  if (aKind < 0.5) {
    // Plunge spray: thrown up and out where the curtain hits the pool.
    life = 0.85 + aSeed.x * 0.95;
    cyc = uTime / life + aSeed.y; k = floor(cyc); a = fract(cyc);
    float r1 = rnd(aSeed.z * 91.7 + k * 1.37), r2 = rnd(aSeed.w * 47.3 + k * 2.11);
    float r3 = rnd(aSeed.z * 13.1 + aSeed.w * 71.9 + k * 0.73), r4 = rnd(aSeed.x * 29.3 + k * 3.07), r5 = rnd(r1 * 7.7 + k * 0.31);
    p0 = uFoot + vec3((r1 - 0.5) * 3.2, -0.2, (r2 - 0.5) * 0.7 + 0.15);
    float az = (r3 - 0.5) * 3.4;
    float speed = (1.0 + r4 * r4 * 5.0) * (0.8 + 0.35 * uSurge);
    float up = (2.5 + r5 * 7.0) * (0.78 + 0.4 * uSurge);
    v0 = vec3(sin(az) * speed, up, cos(az) * speed * 0.7 + 0.3);
    drag = 1.1; g = 9.8; size = 1.5 + aSeed.w * 2.2; bright = 1.5;
  } else if (aKind < 1.5) {
    // Drops shed along the curtain edges, falling just outside and ahead of it.
    life = 0.55 + aSeed.x * 0.7;
    cyc = uTime / life + aSeed.y; k = floor(cyc); a = fract(cyc);
    float r1 = rnd(aSeed.z * 61.3 + k * 1.91), r2 = rnd(aSeed.w * 37.9 + k * 0.57), r3 = rnd(aSeed.x * 83.1 + k * 2.71), r4 = rnd(r1 * 19.3 + k * 1.13);
    float s0 = 1.2 + r1 * (uFall.w - 5.0);
    float frac = s0 / uFall.w;
    float side = r2 < 0.5 ? -1.0 : 1.0;
    float halfW = uFall.z * (1.0 + 0.3 * frac) + 0.05 + r3 * 0.35;
    float tof0 = (sqrt(${(FALL_LIP_SPEED * FALL_LIP_SPEED).toFixed(3)} + ${(2 * FALL_GRAVITY).toFixed(2)} * s0) - ${FALL_LIP_SPEED.toFixed(2)}) / ${FALL_GRAVITY.toFixed(2)};
    p0 = vec3(uFall.x + side * halfW, uFall.y - s0, uFallZ.x + uFallZ.y * tof0 + 0.15 + r4 * 0.4);
    v0 = vec3(side * (0.1 + rnd(r3 + k) * 0.5), -sqrt(${(FALL_LIP_SPEED * FALL_LIP_SPEED).toFixed(3)} + ${(2 * FALL_GRAVITY).toFixed(2)} * s0), 0.15 + rnd(r4 + k * 0.3) * 0.45);
    drag = 0.25; g = ${FALL_GRAVITY.toFixed(2)}; size = 0.8 + aSeed.w * 0.9; bright = 0.45; blur = 0.06;
  } else if (aKind < 2.5) {
    // The side seep splashing on its ledge.
    life = 0.5 + aSeed.x * 0.5;
    cyc = uTime / life + aSeed.y; k = floor(cyc); a = fract(cyc);
    float r1 = rnd(aSeed.z * 17.9 + k * 1.3), r2 = rnd(aSeed.w * 23.3 + k * 0.9), r3 = rnd(aSeed.x * 11.1 + k * 2.2);
    p0 = uSideFoot + vec3((r1 - 0.5) * 0.4, 0.0, (r2 - 0.5) * 0.3);
    float az = (r3 - 0.5) * 3.6;
    float speed = 0.4 + r2 * 1.3;
    v0 = vec3(sin(az) * speed, 1.0 + r1 * 1.8, cos(az) * speed * 0.6 + 0.2);
    drag = 1.6; g = 9.8; size = 0.9 + aSeed.w * 0.9; bright = 0.7;
  } else {
    // Fine droplets floating in the rising mist, catching the sun.
    life = 4.5 + aSeed.x * 3.5;
    cyc = uTime / life + aSeed.y; k = floor(cyc); a = fract(cyc);
    float r1 = rnd(aSeed.z * 41.7 + k * 1.7), r2 = rnd(aSeed.w * 29.1 + k * 0.41), r3 = rnd(aSeed.x * 7.3 + k * 1.9);
    p0 = uFoot + vec3((r1 - 0.5) * 5.0, 0.3 + r2 * 1.5, (r3 - 0.5) * 2.4 + 0.8);
    v0 = vec3(uWind.x + (r2 - 0.5) * 0.5, 0.55 + r1 * 0.6, uWind.z + 0.2);
    drag = 0.35; g = -0.15; size = 0.9 + aSeed.w * 0.7; bright = 0.55;
  }
  float t = a * life;
  vec3 head = ballistic(p0, v0, drag, g, t);
  vec3 tail = ballistic(p0, v0, drag, g, max(t - blur, 0.0));
  if (aKind > 2.5) {
    // Lazy wobble instead of a ballistic arc.
    vec3 w = vec3(sin(t * 1.3 + aSeed.z * 6.3), 0.0, cos(t * 1.1 + aSeed.w * 6.3)) * 0.25;
    head += w; tail = head - vec3(0.0, 0.02, 0.0);
  }
  vAlpha = smoothstep(0.0, 0.08, a) * (1.0 - smoothstep(0.7, 1.0, a));
  // Drops vanish once they fall back into the pool.
  vAlpha *= smoothstep(0.0, 0.1, head.y - 0.04);
  vec4 ch = projectionMatrix * modelViewMatrix * vec4(head, 1.0);
  vec4 ct = projectionMatrix * modelViewMatrix * vec4(tail, 1.0);
  if (ch.w < 0.05 || ct.w < 0.05 || vAlpha <= 0.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); vAlpha = 0.0; vAcross = 0.0; vColor = vec3(0.0); return; }
  vec2 halfView = uViewport * 0.5;
  vec2 sh = ch.xy / ch.w * halfView, st = ct.xy / ct.w * halfView;
  vec2 d = sh - st;
  float len = length(d);
  vec2 dir = len > 1e-3 ? d / len : vec2(0.0, 1.0);
  vec2 perp = vec2(-dir.y, dir.x);
  float width = size * uPixelScale;
  // Motion blur spreads a drop's light along its streak.
  vAlpha *= clamp((width * 2.0) / (len + width * 2.0), 0.35, 1.0);
  vec4 c = corner.y > 0.5 ? ch : ct;
  vec2 pixel = c.xy / c.w * halfView + perp * corner.x * width * 0.5 + dir * (corner.y * 2.0 - 1.0) * width * 0.5;
  gl_Position = vec4(pixel / halfView * c.w, c.z, c.w);
  vAcross = corner.x;
  vColor = (uSunColor * 0.9 + uSkyColor * 0.8) * bright * (0.85 + 0.25 * uSurge);
}
`;

const SPRAY_FRAGMENT = /* glsl */ `
varying float vAcross;
varying float vAlpha;
varying vec3 vColor;
void main() {
  float a = (1.0 - vAcross * vAcross) * vAlpha;
  if (a <= 0.002) discard;
  gl_FragColor = vec4(vColor * a, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export interface SprayCounts { plunge: number; edge: number; side: number; floating: number }

/** Instanced, velocity-aligned droplet streaks; every position comes from the clock. */
export function createSpray(counts: SprayCounts, fall: FallShape, uniforms: FlowUniforms, random: () => number) {
  const total = counts.plunge + counts.edge + counts.side + counts.floating;
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 3));
  geometry.setAttribute('corner', new THREE.Float32BufferAttribute([-1, 0, 1, 0, -1, 1, 1, 1], 2));
  geometry.setIndex([0, 1, 2, 1, 3, 2]);
  const seeds = new Float32Array(total * 4), kinds = new Float32Array(total);
  let index = 0;
  ([['plunge', 0], ['edge', 1], ['side', 2], ['floating', 3]] as const).forEach(([name, kind]) => {
    for (let i = 0; i < counts[name]; i++, index++) {
      for (let j = 0; j < 4; j++) seeds[index * 4 + j] = random();
      kinds[index] = kind;
    }
  });
  geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 4));
  geometry.setAttribute('aKind', new THREE.InstancedBufferAttribute(kinds, 1));
  geometry.instanceCount = total;
  const material = new THREE.ShaderMaterial({
    name: 'WaterfallSpray',
    uniforms: {
      uTime: uniforms.time, uSurge: uniforms.surge, uViewport: uniforms.viewport, uPixelScale: { value: 1 },
      uFoot: uniforms.foot, uSideFoot: uniforms.sideFoot, uWind: uniforms.wind,
      uFall: { value: new THREE.Vector4(fall.x, fall.top, fall.width / 2, fall.top - fall.base) },
      uFallZ: { value: new THREE.Vector2(fall.z, fall.throw) },
      uSunColor: uniforms.sunColor, uSkyColor: uniforms.skyColor,
    },
    vertexShader: SPRAY_VERTEX, fragmentShader: SPRAY_FRAGMENT,
    transparent: true, depthWrite: false,
    blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor, blendEquation: THREE.AddEquation,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'waterfall-spray';
  mesh.frustumCulled = false;
  mesh.renderOrder = 5;
  return { mesh, setPixelScale(scale: number) { material.uniforms.uPixelScale.value = scale; } };
}

const MIST_VERTEX = /* glsl */ `
attribute vec2 corner;
attribute vec4 aSeed;
attribute float aKind;
uniform float uTime;
uniform float uSurge;
uniform vec3 uFoot;
uniform vec3 uSideFoot;
uniform vec3 uWind;
varying vec2 vQuad;
varying vec2 vRot;
varying float vAlpha;
varying float vAge;
varying vec3 vWorld;
float rnd(float n) { return fract(sin(n) * 43758.5453123); }
void main() {
  float side = step(0.5, aKind);
  float scale = mix(1.0, 0.32, side);
  float life = mix(5.0 + aSeed.x * 4.0, 3.5 + aSeed.x * 2.0, side);
  float cyc = uTime / life + aSeed.y;
  float k = floor(cyc), a = fract(cyc);
  float r1 = rnd(aSeed.z * 31.1 + k * 1.9), r2 = rnd(aSeed.w * 17.3 + k * 0.7), r3 = rnd(aSeed.x * 53.7 + k * 2.3);
  float t = a * life;
  vec3 foot = mix(uFoot, uSideFoot, side);
  vec3 c = foot + vec3((r1 - 0.5) * 5.6, 0.1 + r2 * 0.8, r3 * 2.2 + 0.2) * vec3(scale, 1.0, scale);
  // Buoyant billows: a quick rise that slows, spreading and leaning downwind.
  c.y += (1.2 + r3 * 1.3) * (1.0 - exp(-t * 0.45)) / 0.45 * mix(1.0, 0.5, side);
  c += uWind * t * mix(1.0, 0.6, side);
  c.x += ((r1 - 0.5) * 0.45 * t + sin(t * 0.9 + r2 * 6.28) * 0.3) * scale;
  c.z += 0.22 * t * scale;
  float radius = mix(1.1, 3.4 + r2 * 2.0, sqrt(a)) * scale;
  vAlpha = smoothstep(0.0, 0.14, a) * (1.0 - smoothstep(0.38, 1.0, a)) * (0.7 + 0.45 * uSurge) * mix(1.0, 0.5, side);
  vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  float angle = r1 * 6.2831853 + t * (r3 - 0.5) * 0.35;
  vRot = vec2(cos(angle), sin(angle));
  vec3 world = c + (right * corner.x + up * corner.y) * radius;
  vQuad = corner; vAge = a; vWorld = world;
  gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
}
`;

const MIST_FRAGMENT = /* glsl */ `
uniform sampler2D tPuff;
uniform vec3 uToSun;
uniform vec3 uSunColor;
uniform vec3 uSkyColor;
uniform float uWaterY;
uniform float uOpacity;
${GLSL_FOG}
varying vec2 vQuad;
varying vec2 vRot;
varying float vAlpha;
varying float vAge;
varying vec3 vWorld;
void main() {
  vec2 q = vQuad;
  vec2 r = vec2(q.x * vRot.x - q.y * vRot.y, q.x * vRot.y + q.y * vRot.x);
  // Two puff shapes cross-fade as the billow ages, so its outline evolves.
  float a = texture2D(tPuff, r * 0.5 + 0.5).r;
  float b = texture2D(tPuff, vec2(-r.y, r.x) * 0.5 + 0.5).g;
  vec4 shape = texture2D(tPuff, q * 0.5 + 0.5);
  float density = mix(a, b, smoothstep(0.15, 0.85, vAge)) * 0.7 + shape.b * shape.b * 0.3;
  // A rounded body for lighting: sunward flanks bright, the rest lit by the sky.
  vec3 nView = normalize(vec3(q, sqrt(max(1.0 - dot(q, q), 0.0)) + 0.35));
  vec3 sunView = normalize((viewMatrix * vec4(uToSun, 0.0)).xyz);
  float lit = clamp(0.5 + 0.5 * dot(nView, sunView), 0.0, 1.0);
  vec3 color = uSunColor * (0.15 + 0.85 * lit) * 0.75 + uSkyColor * 0.7;
  // Analytic soft contact with the pool: no hard line where the card meets water.
  float contact = smoothstep(0.0, 0.9, vWorld.y - uWaterY);
  float alpha = density * vAlpha * contact * uOpacity;
  if (alpha <= 0.002) discard;
  gl_FragColor = vec4(applyHaze(color, vWorld), alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/** Camera-facing billows rising from the plunge (and a few from the side seep). */
export function createMist(counts: { plunge: number; side: number }, textures: WaterfallTextures, uniforms: FlowUniforms, random: () => number, waterY: number) {
  const total = counts.plunge + counts.side;
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 3));
  geometry.setAttribute('corner', new THREE.Float32BufferAttribute([-1, -1, 1, -1, -1, 1, 1, 1], 2));
  geometry.setIndex([0, 1, 2, 1, 3, 2]);
  const seeds = new Float32Array(total * 4), kinds = new Float32Array(total);
  for (let i = 0; i < total; i++) {
    for (let j = 0; j < 4; j++) seeds[i * 4 + j] = random();
    kinds[i] = i < counts.plunge ? 0 : 1;
  }
  geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 4));
  geometry.setAttribute('aKind', new THREE.InstancedBufferAttribute(kinds, 1));
  geometry.instanceCount = total;
  const material = new THREE.ShaderMaterial({
    name: 'WaterfallMist',
    uniforms: {
      uTime: uniforms.time, uSurge: uniforms.surge, uFoot: uniforms.foot, uSideFoot: uniforms.sideFoot, uWind: uniforms.wind,
      tPuff: { value: textures.puff }, uToSun: uniforms.toSun, uSunColor: uniforms.sunColor, uSkyColor: uniforms.skyColor,
      uWaterY: { value: waterY }, uOpacity: { value: .085 }, uFogColor: uniforms.fogColor, uFogDensity: uniforms.fogDensity,
    },
    vertexShader: MIST_VERTEX, fragmentShader: MIST_FRAGMENT,
    transparent: true, depthWrite: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'waterfall-mist';
  mesh.frustumCulled = false;
  mesh.renderOrder = 4;
  return { mesh, material };
}

const BOIL_VERTEX = /* glsl */ `
uniform sampler2D tRipple;
uniform float uTime;
uniform float uSurge;
uniform vec3 uFoot;
uniform vec2 uRadius;
varying vec3 vWorld;
varying float vRim;
varying vec2 vFlowUv;
varying vec2 vFlow;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vec2 rel = (world.xz - uFoot.xz) / uRadius;
  float r = length(rel);
  vRim = 1.0 - smoothstep(0.35, 1.0, r);
  vec2 dir = (world.xz - uFoot.xz) / max(length(world.xz - uFoot.xz), 0.05);
  vec2 flow = dir * 0.55;
  float ph0 = fract(uTime * 0.5), ph1 = fract(uTime * 0.5 + 0.5);
  float h0 = textureLod(tRipple, world.xz * 0.42 - flow * ph0, 0.0).a;
  float h1 = textureLod(tRipple, world.xz * 0.42 - flow * ph1 + vec2(0.37, 0.61), 0.0).a;
  float h = mix(h0, h1, abs(1.0 - 2.0 * ph0));
  // The water heaves highest where the curtain lands and settles toward the rim.
  world.y += (0.06 + 0.42 * h * h) * vRim * (1.15 - 0.5 * r) * (0.8 + 0.35 * uSurge);
  vWorld = world.xyz;
  vFlowUv = world.xz;
  vFlow = flow;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const BOIL_FRAGMENT = /* glsl */ `
uniform sampler2D tWater;
uniform float uTime;
uniform vec3 uToSun;
uniform vec3 uSunColor;
uniform vec3 uSkyColor;
${GLSL_FOG}
varying vec3 vWorld;
varying float vRim;
varying vec2 vFlowUv;
varying vec2 vFlow;
void main() {
  vec3 n = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
  if (n.y < 0.0) n = -n;
  float ph0 = fract(uTime * 0.5), ph1 = fract(uTime * 0.5 + 0.5);
  float l0 = texture2D(tWater, vFlowUv * 0.55 - vFlow * ph0 * 1.3).r;
  float l1 = texture2D(tWater, vFlowUv * 0.55 - vFlow * ph1 * 1.3 + vec2(0.29, 0.53)).r;
  float w = abs(1.0 - 2.0 * ph0);
  float lace = 0.5 + (mix(l0, l1, w) - 0.5) / max(sqrt(w * w + (1.0 - w) * (1.0 - w)), 0.5);
  float wrap = clamp((dot(n, uToSun) + 0.4) / 1.4, 0.0, 1.0);
  vec3 color = (uSunColor * wrap * 0.85 + uSkyColor * 0.9) * (0.72 + 0.3 * lace);
  float alpha = vRim * (0.6 + 0.4 * smoothstep(0.25, 0.7, lace));
  gl_FragColor = vec4(applyHaze(color, vWorld), clamp(alpha, 0.0, 1.0));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/** Churning white water heaped up where the curtain lands. */
export function createBoil(textures: WaterfallTextures, uniforms: FlowUniforms, radius: THREE.Vector2, y: number) {
  const geometry = new THREE.PlaneGeometry(radius.x * 2, radius.y * 2, 56, 28);
  geometry.rotateX(-Math.PI / 2);
  const material = new THREE.ShaderMaterial({
    name: 'WaterfallBoil',
    uniforms: {
      tRipple: { value: textures.ripple }, tWater: { value: textures.water }, uTime: uniforms.time, uSurge: uniforms.surge,
      uFoot: uniforms.foot, uRadius: { value: radius.clone() }, uToSun: uniforms.toSun, uSunColor: uniforms.sunColor, uSkyColor: uniforms.skyColor,
      uFogColor: uniforms.fogColor, uFogDensity: uniforms.fogDensity,
    },
    vertexShader: BOIL_VERTEX, fragmentShader: BOIL_FRAGMENT,
    transparent: true, depthWrite: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'waterfall-boil';
  mesh.position.set(uniforms.foot.value.x, y, uniforms.foot.value.z + .25);
  mesh.renderOrder = 3;
  mesh.frustumCulled = false;
  return mesh;
}
