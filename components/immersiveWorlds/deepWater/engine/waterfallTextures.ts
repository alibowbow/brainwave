import * as THREE from 'three';

/*
 * Tileable data textures for the waterfall valley's water, generated once in
 * code when the world loads (no image assets). Every channel wraps exactly, so
 * shaders can scroll and advect them without seams, and mipmaps keep the
 * foreshortened pool stable. Values are deterministic: the same seed always
 * yields the same texels.
 *
 *  - fall   (128x256): R long flow streaks, G aerated clumps, B fine streaks, A slow warp
 *  - water  (128x128): R foam lace (equalised), G bubbles, B foam patches (equalised), A caustic web
 *  - ripple (128x128): RG surface slope of a tileable height field, B height, A churn (equalised)
 *  - bed    (256x256, sRGB): pebble and gravel albedo with crevices; A stone height
 *  - puff   (128x128): R and G two soft billowing mist puffs, B round falloff, A wisp
 */

export interface WaterfallTextures {
  fall: THREE.DataTexture;
  water: THREE.DataTexture;
  ripple: THREE.DataTexture;
  bed: THREE.DataTexture;
  puff: THREE.DataTexture;
  dispose(): void;
}

/** Gradient noise on a periodic lattice: wraps every `px` by `py` cells. */
class PeriodicNoise {
  private gx: Float32Array;
  private gy: Float32Array;
  constructor(private px: number, private py: number, seed: number) {
    this.gx = new Float32Array(px * py); this.gy = new Float32Array(px * py);
    for (let i = 0; i < px * py; i++) {
      const angle = hash(i, seed, 17) * Math.PI * 2;
      this.gx[i] = Math.cos(angle); this.gy[i] = Math.sin(angle);
    }
  }
  /** Roughly [-1, 1]; `x` in lattice cells (period px), `y` likewise (period py). */
  sample(x: number, y: number): number {
    const { px, py, gx, gy } = this;
    const xi = Math.floor(x), yi = Math.floor(y);
    const fx = x - xi, fy = y - yi;
    // Callers sample non-negative coordinates, so a plain remainder wraps.
    const x0 = xi % px, y0 = yi % py;
    const x1 = x0 + 1 === px ? 0 : x0 + 1, y1 = y0 + 1 === py ? 0 : y0 + 1;
    const a = y0 * px + x0, b = y0 * px + x1, c = y1 * px + x0, d = y1 * px + x1;
    const na = gx[a] * fx + gy[a] * fy;
    const nb = gx[b] * (fx - 1) + gy[b] * fy;
    const nc = gx[c] * fx + gy[c] * (fy - 1);
    const nd = gx[d] * (fx - 1) + gy[d] * (fy - 1);
    const u = fx * fx * fx * (fx * (fx * 6 - 15) + 10), v = fy * fy * fy * (fy * (fy * 6 - 15) + 10);
    return ((na + (nb - na) * u) + ((nc + (nd - nc) * u) - (na + (nb - na) * u)) * v) * 1.41;
  }
}

/** Fractal sum whose octaves double the lattice, so the tile still wraps. */
function periodicFbm(px: number, py: number, octaves: number, seed: number, gain = .5) {
  const layers = Array.from({ length: octaves }, (_, i) => new PeriodicNoise(px << i, py << i, seed + i * 101));
  let norm = 0, amplitude = 1;
  for (let i = 0; i < octaves; i++) { norm += amplitude; amplitude *= gain; }
  /** `x`, `y` in [0, 1) tile coordinates. */
  return (x: number, y: number) => {
    let sum = 0, amp = 1;
    for (let i = 0; i < octaves; i++) { sum += layers[i].sample(x * (px << i), y * (py << i)) * amp; amp *= gain; }
    return sum / norm;
  };
}

/** Integer hash to [0, 1). */
function hash(a: number, b: number, c: number): number {
  let h = Math.imul(a | 0, 374761393) ^ Math.imul(b | 0, 668265263) ^ Math.imul(c | 0, 2147483647);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

/** Periodic Worley distances: one jittered feature point per cell, `cells` per tile side. */
function worley(cells: number, seed: number) {
  const fx = new Float32Array(cells * cells), fy = new Float32Array(cells * cells);
  for (let j = 0; j < cells; j++) for (let i = 0; i < cells; i++) {
    fx[j * cells + i] = .1 + .8 * hash(i, j, seed);
    fy[j * cells + i] = .1 + .8 * hash(i, j, seed + 7);
  }
  const out = { f1: 0, f2: 0, id: 0 };
  /** `x`, `y` in [0, 1) tile coordinates; fills `out`. */
  return (x: number, y: number) => {
    const cx = x * cells, cy = y * cells;
    const ix = Math.floor(cx), iy = Math.floor(cy);
    let f1 = 9, f2 = 9, id = 0;
    for (let oy = -1; oy <= 1; oy++) for (let ox = -1; ox <= 1; ox++) {
      const nx = ix + ox, ny = iy + oy;
      const wx = ((nx % cells) + cells) % cells, wy = ((ny % cells) + cells) % cells;
      const k = wy * cells + wx;
      const dx = nx + fx[k] - cx, dy = ny + fy[k] - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < f1) { f2 = f1; f1 = d; id = k; } else if (d < f2) f2 = d;
    }
    out.f1 = f1; out.f2 = f2; out.id = id;
    return out;
  };
}

const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/** Remaps values to a near-uniform distribution so a shader threshold t covers exactly 1 - t of the area. */
function equalise(values: Float32Array) {
  let min = Infinity, max = -Infinity;
  for (const v of values) { if (v < min) min = v; if (v > max) max = v; }
  const bins = 1024, histogram = new Float32Array(bins);
  const scale = (bins - 1) / Math.max(1e-6, max - min);
  for (const v of values) histogram[Math.round((v - min) * scale)]++;
  let running = 0;
  for (let i = 0; i < bins; i++) { running += histogram[i]; histogram[i] = running / values.length; }
  for (let i = 0; i < values.length; i++) values[i] = histogram[Math.round((values[i] - min) * scale)];
  return values;
}

function texture(data: Uint8Array, width: number, height: number, srgb = false, anisotropy = 1, wrap: THREE.Wrapping = THREE.RepeatWrapping) {
  const map = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.UnsignedByteType);
  map.wrapS = map.wrapT = wrap;
  map.magFilter = THREE.LinearFilter;
  map.minFilter = THREE.LinearMipmapLinearFilter;
  map.generateMipmaps = true;
  map.anisotropy = anisotropy;
  map.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  map.needsUpdate = true;
  return map;
}

const byte = (x: number) => Math.round(clamp01(x) * 255);

function bakeFall(anisotropy: number) {
  const W = 128, H = 256;
  // Streak cells are long along the flow (y) and narrow across it (x).
  const streak = periodicFbm(16, 2, 3, 11, .55);
  const clumps = periodicFbm(4, 8, 2, 23, .5);
  const fine = periodicFbm(48, 3, 2, 37, .5);
  const warp = periodicFbm(3, 1, 2, 51, .5);
  const data = new Uint8Array(W * H * 4);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / H, i = (y * W + x) * 4;
    data[i] = byte(.5 + streak(u, v) * .95);
    data[i + 1] = byte(.5 + clumps(u, v) * 1.05);
    data[i + 2] = byte(.5 + fine(u, v) * 1.1);
    data[i + 3] = byte(.5 + warp(u, v) * .9);
  }
  return texture(data, W, H, false, anisotropy);
}

function bakeWater(anisotropy: number) {
  const N = 128, count = N * N;
  const cellsA = worley(7, 61), cellsB = worley(13, 67), dots = worley(16, 71), caustic = worley(6, 73);
  const breakup = periodicFbm(4, 4, 3, 79, .55), patches = periodicFbm(2, 2, 3, 83, .55), causticWarp = periodicFbm(3, 3, 2, 89, .5);
  const lace = new Float32Array(count), patch = new Float32Array(count);
  const data = new Uint8Array(count * 4);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const u = x / N, v = y / N, k = y * N + x;
    // Foam is a network of bubble walls: bright where Voronoi cells meet.
    const a = cellsA(u, v); const webA = 1 - smooth(0, .22, a.f2 - a.f1);
    const b = cellsB(u, v); const webB = 1 - smooth(0, .18, b.f2 - b.f1);
    const n = breakup(u, v);
    lace[k] = webA * .55 + webB * .35 + n * .55;
    patch[k] = patches(u, v);
    const d = dots(u, v);
    const bubble = smooth(.17, .07, d.f1) * (hash(d.id, 5, 97) > .55 ? 1 : 0);
    // Caustic filaments: thin bright edges of a warped Voronoi web.
    const cu = u + causticWarp(u, v) * .05, cv = v + causticWarp(v, u) * .05;
    const c = caustic(((cu % 1) + 1) % 1, ((cv % 1) + 1) % 1);
    const filament = Math.pow(1 - smooth(0, .3, c.f2 - c.f1), 2.6);
    data[k * 4 + 1] = byte(bubble);
    data[k * 4 + 3] = byte(filament);
  }
  equalise(lace); equalise(patch);
  for (let k = 0; k < count; k++) { data[k * 4] = byte(lace[k]); data[k * 4 + 2] = byte(patch[k]); }
  return texture(data, N, N, false, anisotropy);
}

function bakeRipple(anisotropy: number) {
  const N = 128, count = N * N;
  const heightField = periodicFbm(5, 5, 4, 101, .52);
  const churnField = periodicFbm(3, 3, 3, 107, .6);
  const height = new Float32Array(count), churn = new Float32Array(count);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    height[y * N + x] = heightField(x / N, y / N);
    churn[y * N + x] = Math.abs(churnField(x / N, y / N));
  }
  equalise(churn);
  const data = new Uint8Array(count * 4);
  // Central differences wrap with the tile, so slopes are seamless too.
  const at = (x: number, y: number) => height[(((y % N) + N) % N) * N + (((x % N) + N) % N)];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const k = y * N + x;
    const sx = (at(x + 1, y) - at(x - 1, y)) * N / 2, sy = (at(x, y + 1) - at(x, y - 1)) * N / 2;
    data[k * 4] = byte(.5 + sx * .022);
    data[k * 4 + 1] = byte(.5 + sy * .022);
    data[k * 4 + 2] = byte(.5 + height[k] * .9);
    data[k * 4 + 3] = byte(churn[k]);
  }
  return texture(data, N, N, false, anisotropy);
}

function bakeBed(anisotropy: number) {
  const N = 256, count = N * N;
  const stones = worley(6, 131), pebbles = worley(15, 137);
  const grain = periodicFbm(16, 16, 1, 139, .5), silt = periodicFbm(3, 3, 3, 149, .55);
  const height = new Float32Array(count);
  const albedo = new Float32Array(count * 3);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const u = x / N, v = y / N, k = y * N + x;
    // Rounded river stones: a dome from the distance ratio, packed between with pebbles.
    const s = stones(u, v);
    const stoneDome = Math.sqrt(clamp01(1 - Math.pow(s.f1 / Math.max(1e-4, .5 * (s.f1 + s.f2)), 2.2)));
    const sid = s.id;
    const p = pebbles(u, v);
    const pebbleDome = Math.sqrt(clamp01(1 - Math.pow(p.f1 / Math.max(1e-4, .5 * (p.f1 + p.f2)), 2)));
    const mud = .5 + .5 * silt(u, v);
    const fine = .5 + .5 * grain(u, v);
    const stoneH = stoneDome * (.75 + .25 * hash(sid, 4, 167)), pebbleH = pebbleDome * .45;
    const isStone = stoneH > pebbleH;
    // Silt settles in hollows and over whole patches of the bed.
    const siltCover = smooth(.55, .8, mud) * (1 - .7 * stoneH) + (1 - Math.max(stoneH, pebbleH)) * .35;
    height[k] = Math.max(stoneH, pebbleH) * (1 - .6 * siltCover) + fine * .03;
    const id = isStone ? sid : p.id + 977;
    const tone = .62 + .38 * hash(id, 1, 151), hue = hash(id, 2, 157);
    // Grey, olive and rust-brown stones.
    let r = .30 + .12 * hue, g = .31 + .06 * Math.abs(hue - .5) * 2, b = .26 - .05 * hue;
    if (hue > .78) { r *= .7; g *= .78; b *= .7; }
    r *= tone; g *= tone; b *= tone;
    const siltR = .25, siltG = .25, siltB = .16;
    const t = clamp01(siltCover);
    albedo[k * 3] = (r * (1 - t) + siltR * t) * (.85 + .3 * fine);
    albedo[k * 3 + 1] = (g * (1 - t) + siltG * t) * (.85 + .3 * fine);
    albedo[k * 3 + 2] = (b * (1 - t) + siltB * t) * (.85 + .3 * fine);
  }
  // Light the relief once from above-left so stones read as rounded.
  const data = new Uint8Array(count * 4);
  const at = (x: number, y: number) => height[(((y % N) + N) % N) * N + (((x % N) + N) % N)];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const k = y * N + x;
    const dx = (at(x + 1, y) - at(x - 1, y)) * 6, dy = (at(x, y + 1) - at(x, y - 1)) * 6;
    const shade = clamp01(.82 - dx * .5 - dy * .35) * (.7 + .3 * height[k]);
    for (let c = 0; c < 3; c++) data[k * 4 + c] = byte(Math.pow(clamp01(albedo[k * 3 + c] * shade * 1.15), 1 / 2.2));
    data[k * 4 + 3] = byte(height[k]);
  }
  return texture(data, N, N, true, anisotropy);
}

function bakePuff() {
  const N = 128;
  const billowA = periodicFbm(4, 4, 3, 173, .55), billowB = periodicFbm(4, 4, 3, 179, .55), wisp = periodicFbm(3, 3, 2, 181, .6);
  const data = new Uint8Array(N * N * 4);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const u = x / N, v = y / N, k = (y * N + x) * 4;
    const dx = u * 2 - 1 + 1 / N, dy = v * 2 - 1 + 1 / N;
    const r = Math.sqrt(dx * dx + dy * dy);
    const round = smooth(1, .15, r);
    // Billows: noise eats into the round falloff from outside, like a cumulus edge.
    const puffA = smooth(.05, .75, round + billowA(u, v) * .75 - .25) * round;
    const puffB = smooth(.05, .75, round + billowB(u, v) * .75 - .25) * round;
    data[k] = byte(puffA); data[k + 1] = byte(puffB);
    data[k + 2] = byte(round);
    data[k + 3] = byte(smooth(-.2, .6, wisp(u, v)) * round);
  }
  return texture(data, N, N, false, 1, THREE.ClampToEdgeWrapping);
}

export function bakeWaterfallTextures(renderer: THREE.WebGLRenderer): WaterfallTextures {
  // Test doubles have no capabilities; real renderers report their limit.
  const max = typeof renderer.capabilities?.getMaxAnisotropy === 'function' ? renderer.capabilities.getMaxAnisotropy() : 1;
  const anisotropy = Math.max(1, Math.min(8, max || 1));
  const maps = { fall: bakeFall(anisotropy), water: bakeWater(anisotropy), ripple: bakeRipple(anisotropy), bed: bakeBed(anisotropy), puff: bakePuff() };
  return { ...maps, dispose() { Object.values(maps).forEach(map => map.dispose()); } };
}
