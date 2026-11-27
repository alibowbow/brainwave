/*
 * CPU twin of GLSL_NOISE (same PCG hash and quintic gradient noise), used to
 * displace procedural geometry deterministically at load time. Pure JS, no
 * allocation per sample, safe in Node tests.
 */

const INV = 1 / 4294967295;
let hx = 0, hy = 0, hz = 0;

function pcg3(x: number, y: number, z: number) {
  x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
  y = (Math.imul(y, 1664525) + 1013904223) >>> 0;
  z = (Math.imul(z, 1664525) + 1013904223) >>> 0;
  x = (x + Math.imul(y, z)) >>> 0; y = (y + Math.imul(z, x)) >>> 0; z = (z + Math.imul(x, y)) >>> 0;
  x = (x ^ (x >>> 16)) >>> 0; y = (y ^ (y >>> 16)) >>> 0; z = (z ^ (z >>> 16)) >>> 0;
  x = (x + Math.imul(y, z)) >>> 0; y = (y + Math.imul(z, x)) >>> 0; z = (z + Math.imul(x, y)) >>> 0;
  hx = x * INV; hy = y * INV; hz = z * INV;
}

function corner(ix: number, iy: number, iz: number, fx: number, fy: number, fz: number) {
  pcg3((ix + 4096) | 0, (iy + 4096) | 0, (iz + 4096) | 0);
  return (hx * 2 - 1) * fx + (hy * 2 - 1) * fy + (hz * 2 - 1) * fz;
}

const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Gradient noise in roughly [-1, 1]. */
export function noise3(x: number, y: number, z: number): number {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  const fx = x - ix, fy = y - iy, fz = z - iz;
  const u = fade(fx), v = fade(fy), w = fade(fz);
  const a = corner(ix, iy, iz, fx, fy, fz), b = corner(ix + 1, iy, iz, fx - 1, fy, fz);
  const c = corner(ix, iy + 1, iz, fx, fy - 1, fz), d = corner(ix + 1, iy + 1, iz, fx - 1, fy - 1, fz);
  const e = corner(ix, iy, iz + 1, fx, fy, fz - 1), f = corner(ix + 1, iy, iz + 1, fx - 1, fy, fz - 1);
  const g = corner(ix, iy + 1, iz + 1, fx, fy - 1, fz - 1), h = corner(ix + 1, iy + 1, iz + 1, fx - 1, fy - 1, fz - 1);
  return lerp(lerp(lerp(a, b, u), lerp(c, d, u), v), lerp(lerp(e, f, u), lerp(g, h, u), v), w) * 1.6;
}

/** Fractal sum of `octaves` gradient-noise layers, roughly [-1, 1]. */
export function fbm3(x: number, y: number, z: number, octaves = 4): number {
  let sum = 0, amp = 0.5;
  for (let i = 0; i < octaves; i++) {
    sum += amp * noise3(x, y, z);
    // Same rotation as BW_ROT (column-major in GLSL) to decorrelate octaves.
    const nx = (0.00 * x - 0.80 * y - 0.60 * z) * 2.03;
    const ny = (0.80 * x + 0.36 * y - 0.48 * z) * 2.03;
    const nz = (0.60 * x - 0.48 * y + 0.64 * z) * 2.03;
    x = nx; y = ny; z = nz; amp *= 0.5;
  }
  return sum;
}

/** Sharp-crested ridges in [0, ~1]. */
export function ridged3(x: number, y: number, z: number, octaves = 4): number {
  let sum = 0, amp = 0.5;
  for (let i = 0; i < octaves; i++) {
    const n = 1 - Math.abs(noise3(x, y, z));
    sum += amp * n * n;
    const nx = (0.00 * x - 0.80 * y - 0.60 * z) * 2.07;
    const ny = (0.80 * x + 0.36 * y - 0.48 * z) * 2.07;
    const nz = (0.60 * x - 0.48 * y + 0.64 * z) * 2.07;
    x = nx; y = ny; z = nz; amp *= 0.5;
  }
  return sum;
}

/** Small deterministic PRNG for placement (mulberry32). */
export function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
