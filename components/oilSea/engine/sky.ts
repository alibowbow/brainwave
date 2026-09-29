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
  vec3 col = mix(vec3(0.84, 0.76, 0.74), vec3(0.99, 0.8, 0.61), pow(1.0 - h, 7.0));
  col = mix(col, vec3(1.0, 0.75, 0.49), pow(1.0 - h, 24.0));
  // Warmer and brighter towards the sun, rose along the horizon away from it.
  float side = pow(toSun, 3.0);
  col = mix(col, vec3(1.0, 0.72, 0.42), side * pow(1.0 - h, 6.0) * 0.7);
  col = mix(col, vec3(0.96, 0.7, 0.64), (1.0 - side) * pow(1.0 - h, 16.0) * 0.35);
  col += vec3(1.0, 0.72, 0.36) * pow(toSun, 6.0) * 0.24 * glow;
  col += vec3(1.0, 0.86, 0.56) * pow(toSun, 24.0) * 0.35 * glow;
  col += vec3(1.0, 0.92, 0.7) * pow(toSun, 120.0) * 0.5 * glow;
  return col;
}
vec3 skyBase(vec3 dir) { return skyLight(dir, 1.0); }

// The sun itself: a bright disc blooming into the glow around it.
vec3 sunDisc(vec3 dir) {
  float toSun = max(dot(dir, uSunDir), 0.0);
  return vec3(1.0, 0.93, 0.7) * (smoothstep(0.99962, 0.9998, toSun) * 1.7 + pow(toSun, 2500.0) * 0.9 + pow(toSun, 350.0) * 0.6);
}
`;

/** The cloud map spans every bearing and the lowest ELEVATION_RANGE radians of the sky. */
const ELEVATION_RANGE = 0.4;

/*
 * Heaped evening cumulus, seen from the side: each cloud a cluster of soft
 * puffs sitting on a flat base, bigger and higher overhead, smaller and
 * flatter towards the horizon, with a few long streaks low down. They are
 * drawn once into a map of the sky by bearing and elevation; the shader
 * breaks up their edges and lights them.
 */
function bakeClouds(width: number, height: number, sunAzimuth: number) {
  // Light in r (how lit the front-most puff is), coverage in a.
  const light = new Float32Array(width * height);
  const cover = new Float32Array(width * height);
  let seed = 31;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const toX = width / (Math.PI * 2);
  const toY = height / ELEVATION_RANGE;
  // A puff is a lit ball: brighter towards the light, darker towards the cloud's flat base.
  const puff = (az: number, el: number, r: number, base: number, top: number, lx: number, ly: number) => {
    const rx = r * 1.15 * toX;
    const ry = r * toY;
    const cx = (az / (Math.PI * 2) + 0.5) * width;
    const cy = (el / ELEVATION_RANGE) * height;
    const lz = Math.sqrt(Math.max(0, 1 - lx * lx - ly * ly));
    for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(height - 1, Math.ceil(cy + ry)); y++) {
      const dy = (y + 0.5 - cy) / ry;
      const pixelEl = ((y + 0.5) / height) * ELEVATION_RANGE;
      const lift = Math.min(1, Math.max(0, (pixelEl - base) / Math.max(1e-4, top - base)));
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
        const dx = (x + 0.5 - cx) / rx;
        const d2 = dx * dx + dy * dy;
        if (d2 >= 1) continue;
        const nz = Math.sqrt(1 - d2);
        const lit = (0.35 + 0.65 * Math.max(0, dx * lx + dy * ly + nz * lz)) * (0.5 + 0.5 * lift);
        const alpha = Math.min(1, (1 - Math.sqrt(d2)) * 3.5);
        const i = y * width + (((x % width) + width) % width);
        light[i] = lit * alpha + light[i] * (1 - alpha);
        cover[i] = alpha + cover[i] * (1 - alpha);
      }
    }
  };
  for (let c = 0; c < 420; c++) {
    const az = (rand() * 2 - 1) * Math.PI;
    const base = 0.012 + Math.pow(rand(), 1.3) * 0.24;
    // Height of the cloud in radians: nearer (higher) clouds look bigger.
    const size = (0.35 + 0.65 * Math.pow(rand(), 2)) * (0.026 + base * 0.4);
    const span = size * (2.5 + 4 * rand());
    const count = 10 + Math.floor(rand() * 14);
    // Lit from the side towards the sun and from above.
    let towards = sunAzimuth - az;
    towards = Math.atan2(Math.sin(towards), Math.cos(towards));
    const side = Math.max(-1, Math.min(1, towards * 2)) * Math.exp(-Math.abs(towards) * 1.2);
    const lx = 0.62 * side;
    const ly = 0.5;
    const puffs: { u: number; el: number; r: number }[] = [];
    for (let p = 0; p < count; p++) {
      const u = (rand() - 0.5) * span;
      const middle = 1 - Math.pow((2 * u) / span, 2);
      const r = size * (0.18 + 0.5 * middle) * (0.5 + 0.8 * rand());
      // Puffs sit on the flat base and heap up in the middle.
      puffs.push({ u, el: base + r * 0.75 + size * 0.45 * middle * rand(), r });
    }
    // Back to front: the lower, bigger puffs first, the small ones on top in front.
    puffs.sort((a, b) => b.r - a.r);
    for (const p of puffs) puff(az + p.u, p.el, p.r, base, base + size * 1.4, lx, ly);
  }
  // Long thin streaks low over the sea.
  for (let c = 0; c < 26; c++) {
    const az = (rand() * 2 - 1) * Math.PI;
    const el = 0.01 + rand() * 0.05;
    const length = 0.05 + 0.12 * rand();
    for (let k = 0; k < 6; k++) {
      puff(az + (k / 5 - 0.5) * length, el + (rand() - 0.5) * 0.003, 0.004 + 0.003 * rand(), el - 0.004, el + 0.006, 0, 0.6);
    }
  }
  const data = new Uint8Array(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    data[i * 4] = Math.round(Math.min(1, light[i]) * 255);
    data[i * 4 + 3] = Math.round(Math.min(1, cover[i]) * 255);
  }
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

const CLOUD_GLSL = /* glsl */ `
uniform sampler2D tClouds;
uniform float uCloudDrift;
const float ELEVATION_RANGE = ${ELEVATION_RANGE.toFixed(2)};

vec4 cloudMap(float az, float el) {
  return texture2D(tClouds, vec2((az - uCloudDrift) / 6.2831853 + 0.5, el / ELEVATION_RANGE));
}

vec3 skyColour(vec3 dir) {
  vec3 col = skyBase(dir);
  float el = asin(clamp(dir.y, 0.0, 1.0));
  if (el > 0.002 && el < ELEVATION_RANGE) {
    float az = atan(dir.x, -dir.z);
    vec4 cloud = cloudMap(az, el);
    // Billowing, softened edges.
    vec2 q = vec2((az - uCloudDrift) * 70.0, el * 110.0);
    float billows = fbm3(q) * 0.7 + vnoise(q * 3.1) * 0.3 - 0.45;
    float cover = smoothstep(0.25, 0.8, cloud.a + billows * 0.5);
    if (cover > 0.0) {
      float nearSun = pow(max(dot(dir, uSunDir), 0.0), 8.0);
      float light = clamp(cloud.r + billows * 0.3, 0.0, 1.0);
      vec3 shadow = mix(vec3(0.8, 0.6, 0.62), vec3(0.92, 0.6, 0.46), nearSun);
      vec3 middle = mix(vec3(0.97, 0.76, 0.6), vec3(1.04, 0.78, 0.5), nearSun);
      vec3 lit = mix(vec3(1.05, 0.93, 0.74), vec3(1.14, 0.96, 0.64), nearSun);
      vec3 shade = light < 0.5 ? mix(shadow, middle, light * 2.0) : mix(middle, lit, light * 2.0 - 1.0);
      // Thin edges near the sun glow gold.
      shade += vec3(0.5, 0.3, 0.08) * nearSun * (1.0 - cloud.a);
      // Low down the clouds sink into the haze.
      float haze = smoothstep(0.002, 0.04, el);
      col = mix(col, mix(col, shade, 0.5 + 0.5 * haze), cover * 0.95);
    }
  }
  return col + sunDisc(dir);
}
`;

export function createSky(sunDirection: THREE.Vector3, detail = 1) {
  const clouds = bakeClouds(detail >= 1 ? 2048 : 1024, detail >= 1 ? 256 : 128, Math.atan2(sunDirection.x, -sunDirection.z));
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSunDir: { value: sunDirection },
      uTime: { value: 0 },
      tClouds: { value: clouds },
      uCloudDrift: { value: 0 },
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
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${CLOUD_GLSL}
      void main() {
        vec3 dir = normalize(vDir);
        gl_FragColor = vec4(skyColour(vec3(dir.x, max(dir.y, 0.0), dir.z)), 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24), material);
  mesh.frustumCulled = false;
  mesh.renderOrder = -1;
  return { mesh, material, texture: clouds };
}
