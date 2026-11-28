import * as THREE from 'three';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { seeded } from '../../shared/render/noise';

/*
 * The night pond's living surface. A light air blows from the far left bank across
 * toward the near right one. Everything that moves the water is a pure function of scene
 * time, so a paused frame, a resumed frame and a QA capture at a given time
 * agree:
 *
 * - five directional wave trains on the capillary-gravity dispersion relation,
 * - one baked, tileable pair of quadrature slope fields, read at two scales and
 *   directions and phase-rotated over time, so ripples travel instead of
 *   sliding as a fixed picture,
 * - drifting cat's-paw gusts from a baked tileable noise,
 * - a baked pond map (distance to the bank and rock waterlines, shelter from
 *   wind fetch, banks and lily colonies) for calm lees, shore lap and meniscus,
 * - rings from taps and from pond life (insects, drops, rising fish), scheduled
 *   from hashed time slots on the CPU, which also bobs the lily pads and the
 *   floating specks on the same field.
 *
 * The planar reflection is looked up along the true reflected ray (exact for a
 * reflected object at the estimated distance), so ripples waver it mostly in
 * screen-vertical as real water does, then smeared along that direction by the
 * unresolved roughness. Moonlight off unresolved facets is a statistical glint
 * lobe broken into drifting, fading sparkles.
 */

export const WIND = new THREE.Vector2(.72, .69).normalize();
const WIND_ANGLE = Math.atan2(WIND.x, WIND.y);
/** Deep-water capillary-gravity dispersion, a touch slower for a calm night. */
const dispersion = (k: number) => Math.sqrt(9.81 * k + 7.4e-5 * k * k * k) * .85;
const glsl = (v: number) => v.toFixed(6);

interface Train { dx: number; dz: number; k: number; omega: number; slope: number; phase: number }
// [wavelength m, slope amplitude, direction relative to the wind in degrees]
const TRAINS: Train[] = ([[1.6, .009, -14], [.94, .011, 23], [.58, .012, -33], [.37, .011, 41], [.24, .009, -6]] as const).map(([wavelength, slope, degrees], i) => {
  const angle = WIND_ANGLE + degrees * Math.PI / 180, k = Math.PI * 2 / wavelength;
  return { dx: Math.sin(angle), dz: Math.cos(angle), k, omega: dispersion(k), slope, phase: i * 2.399 + .7 };
});

/** CPU twin of the shader's wave trains: height and slope at a point, low-passed over `size` metres. */
export function trainField(x: number, z: number, t: number, size: number, out: { h: number; sx: number; sz: number }) {
  out.h = 0; out.sx = 0; out.sz = 0;
  for (const w of TRAINS) {
    const phase = (x * w.dx + z * w.dz) * w.k - t * w.omega + w.phase;
    const reach = Math.exp(-(w.k * size) * (w.k * size) * .25);
    out.h += w.slope / w.k * Math.sin(phase) * reach;
    const c = w.slope * Math.cos(phase) * reach;
    out.sx += w.dx * c; out.sz += w.dz * c;
  }
  return out;
}

// --- Rings: taps and pond life share one uniform array. --------------------
export const RING_SLOTS = 10;
export const TAP_SLOTS = 4;
interface RingKind { wavelength: number; phaseSpeed: number; groupSpeed: number; life: number; amplitude: number }
const TAP: RingKind = { wavelength: .24, phaseSpeed: .42, groupSpeed: .42, life: 7, amplitude: .13 };
// Wavelengths are on the long side of nature's so the rings still resolve a few metres out.
const INSECT: RingKind = { wavelength: .05, phaseSpeed: .25, groupSpeed: .22, life: 2.8, amplitude: .16 };
const DROP: RingKind = { wavelength: .08, phaseSpeed: .28, groupSpeed: .25, life: 4, amplitude: .2 };
const RISE: RingKind = { wavelength: .12, phaseSpeed: .32, groupSpeed: .28, life: 5.4, amplitude: .28 };
const shapeOf = (kind: RingKind, target: THREE.Vector4) => target.set(Math.PI * 2 / kind.wavelength, kind.phaseSpeed, kind.groupSpeed, kind.life);
// Incommensurate periods, random skips and random placement: never a beat.
const CHANNELS: Array<{ kind: RingKind; period: number; chance: number; offset: number; reach: 'near' | 'path' | 'any' }> = [
  { kind: INSECT, period: 4.1, chance: .8, offset: 1.1, reach: 'near' },
  { kind: INSECT, period: 5.3, chance: .75, offset: 3.4, reach: 'path' },
  { kind: DROP, period: 7.7, chance: .7, offset: 2.6, reach: 'path' },
  { kind: DROP, period: 9.1, chance: .7, offset: 7.9, reach: 'any' },
  { kind: RISE, period: 11.3, chance: .7, offset: 5.2, reach: 'path' },
  { kind: RISE, period: 14.9, chance: .6, offset: 11.3, reach: 'any' },
];

/** Height of one ring at distance d and age (the shader evaluates its slope). */
function ringHeight(ring: THREE.Vector4, shape: THREE.Vector4, x: number, z: number, t: number) {
  const age = t - ring.z;
  if (ring.w <= 0 || age <= 0 || age >= shape.w) return 0;
  const d = Math.hypot(x - ring.x, z - ring.y), lambda = Math.PI * 2 / shape.x;
  const front = d - shape.z * age, width = front < 0 ? lambda * (1 + 1.3 * age) : lambda * .55;
  const fade = THREE.MathUtils.smoothstep(age, 0, .18) * (1 - THREE.MathUtils.smoothstep(age, .6 * shape.w, shape.w));
  const amp = ring.w * fade * Math.sqrt(.2 / (.2 + d)) * Math.exp(-(front / width) * (front / width));
  return -amp / shape.x * Math.cos(shape.x * (d - shape.y * age));
}

const MOON_AZIMUTH = Math.atan2(.105, 1);
export class PondLife {
  private cache: Array<{ slot: number; start: number; x: number; z: number; strength: number } | null> = CHANNELS.map(() => null);
  private ndc = new THREE.Vector3();
  constructor(private rings: THREE.Vector4[], private shapes: THREE.Vector4[], private camera: THREE.Camera, private accept: (x: number, z: number) => boolean) {
    for (let i = 0; i < TAP_SLOTS; i++) { shapeOf(TAP, shapes[i]); rings[i].set(0, 0, -100, 0); }
    CHANNELS.forEach((channel, i) => { shapeOf(channel.kind, shapes[TAP_SLOTS + i]); rings[TAP_SLOTS + i].set(0, 0, -100, 0); });
  }
  tap(slot: number, x: number, z: number, t: number, strength: number) { this.rings[slot].set(x, z, t, TAP.amplitude * strength / .75); }
  update(t: number) {
    const ndc = this.ndc;
    this.camera.updateMatrixWorld();
    CHANNELS.forEach((channel, i) => {
      const slot = Math.floor((t + channel.offset) / channel.period);
      let event = this.cache[i];
      if (!event || event.slot !== slot) {
        const random = seeded(slot * 7919 + i * 104729 + 31);
        event = { slot, start: 0, x: 0, z: 0, strength: 0 };
        if (random() < channel.chance) {
          event.start = slot * channel.period - channel.offset + random() * (channel.period - channel.kind.life - .2);
          for (let attempt = 0; attempt < 40; attempt++) {
            // Rings only read where the water mirrors something bright, the open sky
            // and the moon over the far bank, and within ~8 m: farther out their crests
            // are finer than a pixel along the view. Sample that wedge by azimuth and range.
            const spread = channel.reach === 'path' ? .14 : channel.reach === 'near' ? .34 : .4;
            const azimuth = MOON_AZIMUTH + (random() * 2 - 1) * spread;
            const range = channel.reach === 'near' ? 2.2 + random() * 3.5 : 2.4 + Math.pow(random(), 1.2) * 5.5;
            const x = this.camera.position.x + Math.sin(azimuth) * range, z = this.camera.position.z - Math.cos(azimuth) * range;
            ndc.set(x, 0, z).project(this.camera);
            if (Math.abs(ndc.x) > .92 || ndc.y < -.94 || ndc.y > .9 || !this.accept(x, z)) continue;
            event.x = x; event.z = z; event.strength = channel.kind.amplitude * (.7 + .5 * random());
            break;
          }
        }
        this.cache[i] = event;
      }
      this.rings[TAP_SLOTS + i].set(event.x, event.z, event.start, event.strength);
    });
  }
  /** Summed ring height at a point, for floating things. */
  heightAt(x: number, z: number, t: number) {
    let h = 0;
    for (let i = 0; i < this.rings.length; i++) h += ringHeight(this.rings[i], this.shapes[i], x, z, t);
    return h;
  }
}

// --- Baked textures. ---------------------------------------------------------
function dataTexture(bytes: Uint8Array, width: number, height: number, repeat: boolean, mipmaps: boolean) {
  const texture = new THREE.DataTexture(bytes, width, height, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = repeat ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = mipmaps ? THREE.LinearMipmapLinearFilter : THREE.LinearFilter;
  texture.generateMipmaps = mipmaps;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Two tileable slope fields in quadrature (RG = slope of sum a·cos, BA = slope
 * of sum a·sin) of one directional ripple spectrum on integer wave vectors.
 * slope(t) = RG·cos(wt) + BA·sin(wt) makes every component travel along its own
 * direction. Down-wind is +v. Decoded with `decode` to unit RMS per axis.
 */
const RIPPLE_SIZE = 128;
export function bakeRippleTexture(seed: number) {
  const size = RIPPLE_SIZE, random = seeded(seed), waves: Array<[number, number, number, number]> = [], seen = new Set<number>();
  for (let attempt = 0; attempt < 20000 && waves.length < 34; attempt++) {
    const m = Math.round((random() * 2 - 1) * 22), n = Math.round((random() * 2 - 1) * 22), k = Math.hypot(m, n);
    if (k < 3 || k > 22.5 || seen.has(m * 100 + n)) continue;
    // Mostly down-wind, a little energy in every direction.
    if (random() > Math.pow(Math.max(n / k, 0), 2) * .95 + .05) continue;
    seen.add(m * 100 + n);
    waves.push([m, n, (.6 + .8 * random()) * Math.pow(k, -.3), random() * Math.PI * 2]);
  }
  const field = new Float32Array(size * size * 4);
  const cu = new Float32Array(size), su = new Float32Array(size), cv = new Float32Array(size), sv = new Float32Array(size);
  for (const [m, n, a, phase] of waves) {
    const k = Math.hypot(m, n), dx = m / k * a, dy = n / k * a;
    for (let i = 0; i < size; i++) {
      const u = Math.PI * 2 * i / size;
      cu[i] = Math.cos(m * u + phase); su[i] = Math.sin(m * u + phase); cv[i] = Math.cos(n * u); sv[i] = Math.sin(n * u);
    }
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const c = cu[x] * cv[y] - su[x] * sv[y], s = su[x] * cv[y] + cu[x] * sv[y], o = (y * size + x) * 4;
      field[o] -= dx * s; field[o + 1] -= dy * s; field[o + 2] += dx * c; field[o + 3] += dy * c;
    }
  }
  let peak = 0, square = 0;
  for (let i = 0; i < field.length; i++) { peak = Math.max(peak, Math.abs(field[i])); square += field[i] * field[i]; }
  const rms = Math.sqrt(square / field.length), bytes = new Uint8Array(field.length);
  for (let i = 0; i < field.length; i++) bytes[i] = Math.round((.5 + .5 * field[i] / peak) * 255);
  return { texture: dataTexture(bytes, size, size, true, true), decode: peak / rms };
}

/** Smooth tileable noises: R and G (independent, morphed in quadrature), B finer detail, A mist patches. */
export function bakeGustTexture(seed: number) {
  const size = 64, random = seeded(seed), field = new Float32Array(size * size * 4);
  const bands: Array<[number, number, number]> = [[1, 3.3, 12], [1, 3.3, 12], [3, 7.5, 16], [2, 5, 12]];
  const cu = new Float32Array(size), su = new Float32Array(size), cv = new Float32Array(size), sv = new Float32Array(size);
  bands.forEach(([low, high, count], channel) => {
    for (let placed = 0, attempt = 0; placed < count && attempt < 4000; attempt++) {
      const m = Math.round((random() * 2 - 1) * high), n = Math.round((random() * 2 - 1) * high), k = Math.hypot(m, n);
      if (k < low || k > high) continue;
      placed++;
      const a = 1 / k, phase = random() * Math.PI * 2;
      for (let i = 0; i < size; i++) {
        const u = Math.PI * 2 * i / size;
        cu[i] = Math.cos(m * u + phase); su[i] = Math.sin(m * u + phase); cv[i] = Math.cos(n * u); sv[i] = Math.sin(n * u);
      }
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) field[(y * size + x) * 4 + channel] += a * (cu[x] * cv[y] - su[x] * sv[y]);
    }
  });
  const bytes = new Uint8Array(field.length);
  for (let channel = 0; channel < 4; channel++) {
    let peak = 1e-6;
    for (let i = channel; i < field.length; i += 4) peak = Math.max(peak, Math.abs(field[i]));
    for (let i = channel; i < field.length; i += 4) bytes[i] = Math.round((.5 + .5 * field[i] / peak) * 255);
  }
  return dataTexture(bytes, size, size, true, true);
}

// --- Pond map: a screen-friendly (x, log z) parameterisation of the water. -----
const MAP_SIZE = 160, MAP_NEAR = 6, MAP_SOFT = 1.5, MAP_RANGE = 36, MAP_LOG = Math.log(1 + MAP_RANGE / MAP_SOFT);
const SHORE_LOW = -4, SHORE_SPAN = 5.5, ROCK_SPAN = .6, OUTLINE_BINS = 96;
const mapHalfWidth = (depth: number) => Math.min(3.2 + .62 * depth, 13);
function mapUv(x: number, z: number): [number, number] {
  const depth = Math.max(MAP_NEAR - z, 0);
  return [.5 + (x - .8) / (2 * mapHalfWidth(depth)), Math.log(1 + depth / MAP_SOFT) / MAP_LOG];
}
function mapPoint(u: number, v: number): [number, number] {
  const depth = (Math.exp(v * MAP_LOG) - 1) * MAP_SOFT;
  return [.8 + (u - .5) * 2 * mapHalfWidth(depth), MAP_NEAR - depth];
}
function bilinear(values: Float32Array, u: number, v: number) {
  const fx = THREE.MathUtils.clamp(u * MAP_SIZE - .5, 0, MAP_SIZE - 1.001), fy = THREE.MathUtils.clamp(v * MAP_SIZE - .5, 0, MAP_SIZE - 1.001);
  const x = Math.floor(fx), y = Math.floor(fy), tx = fx - x, ty = fy - y, o = y * MAP_SIZE + x;
  return (values[o] * (1 - tx) + values[o + 1] * tx) * (1 - ty) + (values[o + MAP_SIZE] * (1 - tx) + values[o + MAP_SIZE + 1] * tx) * ty;
}

export interface PondMapInput {
  shoreDistance(x: number, z: number): number;
  rocks: THREE.Mesh[];
  pads: Array<{ mesh: THREE.Mesh; radius: number; offset: number }>;
}
export interface PondMap {
  texture: THREE.DataTexture;
  /** Signed distance to the bank (positive on land), metres. */
  shore(x: number, z: number): number;
  /** 0 sheltered .. 1 open water. */
  open(x: number, z: number): number;
  /** Clearance from rocks and lily pads, metres (0 inside). */
  clearance(x: number, z: number): number;
}

/** Distance from a point to a lily pad's notched, wavy rim (negative inside). */
function padDistance(pad: { entry: PondMapInput['pads'][number]; x: number; z: number; c: number; s: number }, x: number, z: number) {
  const dx = x - pad.x, dz = z - pad.z, lx = dx * pad.c - dz * pad.s, lz = dx * pad.s + dz * pad.c;
  const r = Math.hypot(lx, lz), { radius, offset } = pad.entry;
  let a = Math.atan2(lz, lx); if (a < 0) a += Math.PI * 2;
  const rim = (angle: number) => radius * (1 + Math.sin(angle * 5 + offset) * .05 + Math.sin(angle * 13 + offset) * .02);
  const start = .06, end = Math.PI * 2 - .07;
  if (a >= start && a <= end) return r - rim(a);
  // In the notch: distance to its nearer edge.
  const gap = a < start ? Math.min(start - a, a + Math.PI * 2 - end) : a - end;
  return Math.max(r * Math.sin(Math.min(gap, Math.PI / 2)), r - rim(0));
}

export function bakePondMap(input: PondMapInput): PondMap {
  const count = MAP_SIZE * MAP_SIZE;
  const shore = new Float32Array(count), rock = new Float32Array(count).fill(ROCK_SPAN), pad = new Float32Array(count).fill(2), open = new Float32Array(count);
  const xs = new Float32Array(count), zs = new Float32Array(count);
  // The bank distance is smooth at this scale: sample it on a coarser lattice of
  // the same parameterisation and interpolate.
  const coarse = MAP_SIZE / 2 + 1, lattice = new Float32Array(coarse * coarse);
  for (let j = 0; j < coarse; j++) for (let i = 0; i < coarse; i++) lattice[j * coarse + i] = input.shoreDistance(...mapPoint(i / (coarse - 1), j / (coarse - 1)));
  for (let j = 0; j < MAP_SIZE; j++) for (let i = 0; i < MAP_SIZE; i++) {
    const o = j * MAP_SIZE + i, u = (i + .5) / MAP_SIZE, v = (j + .5) / MAP_SIZE, [x, z] = mapPoint(u, v);
    const fx = u * (coarse - 1), fy = v * (coarse - 1), ci = Math.min(Math.floor(fx), coarse - 2), cj = Math.min(Math.floor(fy), coarse - 2), tx = fx - ci, ty = fy - cj, c = cj * coarse + ci;
    xs[o] = x; zs[o] = z;
    shore[o] = (lattice[c] * (1 - tx) + lattice[c + 1] * tx) * (1 - ty) + (lattice[c + coarse] * (1 - tx) + lattice[c + coarse + 1] * tx) * ty;
  }
  // Rock waterlines, where each boulder's triangles cross the water plane, kept
  // as a polar outline around the rock's centre.
  const outlines = input.rocks.map(mesh => {
    // Boulders only turn about y, so the cut is a plane of constant local y.
    const position = mesh.geometry.attributes.position as THREE.BufferAttribute, index = mesh.geometry.index;
    const cx = mesh.position.x, cz = mesh.position.z, radius = new Float32Array(OUTLINE_BINS);
    const cut = -mesh.position.y / mesh.scale.y, cos = Math.cos(mesh.rotation.y), sin = Math.sin(mesh.rotation.y);
    const edges = index ? index.count : position.count;
    for (let e = 0; e < edges; e++) {
      const first = e - e % 3, i0 = index ? index.getX(e) : e, i1 = index ? index.getX(first + (e + 1) % 3) : first + (e + 1) % 3;
      const ya = position.getY(i0) - cut, yb = position.getY(i1) - cut;
      if ((ya <= 0) === (yb <= 0)) continue;
      const f = ya / (ya - yb);
      const lx = (position.getX(i0) + (position.getX(i1) - position.getX(i0)) * f) * mesh.scale.x;
      const lz = (position.getZ(i0) + (position.getZ(i1) - position.getZ(i0)) * f) * mesh.scale.z;
      const x = lx * cos + lz * sin, z = -lx * sin + lz * cos;
      const bin = Math.floor((Math.atan2(z, x) / (Math.PI * 2) + 1) % 1 * OUTLINE_BINS) % OUTLINE_BINS;
      radius[bin] = Math.max(radius[bin], Math.hypot(x, z));
    }
    // Close gaps between sampled bins.
    for (let pass = 0; pass < 4; pass++) for (let i = 0; i < OUTLINE_BINS; i++) if (!radius[i]) radius[i] = Math.max(radius[(i + 1) % OUTLINE_BINS], radius[(i + OUTLINE_BINS - 1) % OUTLINE_BINS]);
    return { cx, cz, radius, reach: Math.max(...radius) };
  }).filter(outline => outline.reach > 0);
  const rockDistance = (outline: typeof outlines[number], x: number, z: number) => {
    const dx = x - outline.cx, dz = z - outline.cz;
    const f = (Math.atan2(dz, dx) / (Math.PI * 2) + 1) % 1 * OUTLINE_BINS, i = Math.floor(f) % OUTLINE_BINS, t = f - Math.floor(f);
    return Math.hypot(dx, dz) - (outline.radius[i] * (1 - t) + outline.radius[(i + 1) % OUTLINE_BINS] * t);
  };
  for (const outline of outlines) for (let o = 0; o < count; o++) {
    const span = outline.reach + ROCK_SPAN;
    if (Math.abs(xs[o] - outline.cx) > span || Math.abs(zs[o] - outline.cz) > span) continue;
    rock[o] = Math.min(rock[o], Math.max(rockDistance(outline, xs[o], zs[o]), 0));
  }
  // Lily pads.
  const pads = input.pads.map(entry => ({ entry, x: entry.mesh.position.x, z: entry.mesh.position.z, c: Math.cos(entry.mesh.rotation.y), s: Math.sin(entry.mesh.rotation.y) }));
  for (const p of pads) for (let o = 0; o < count; o++) {
    if (Math.abs(xs[o] - p.x) > p.entry.radius + 1 || Math.abs(zs[o] - p.z) > p.entry.radius + 1) continue;
    pad[o] = Math.min(pad[o], padDistance(p, xs[o], zs[o]));
  }
  // Fetch: open water up-wind of each texel, accumulated row by row from the far bank.
  const fetch = new Float32Array(count), ratio = WIND.x / WIND.y;
  for (let j = MAP_SIZE - 1; j >= 0; j--) for (let i = 0; i < MAP_SIZE; i++) {
    const o = j * MAP_SIZE + i;
    if (shore[o] > 0 || j === MAP_SIZE - 1) { fetch[o] = 0; continue; }
    const zPrevious = zs[(j + 1) * MAP_SIZE], step = zs[o] - zPrevious;
    const [u] = mapUv(xs[o] - ratio * step, zPrevious);
    const fi = THREE.MathUtils.clamp(u * MAP_SIZE - .5, 0, MAP_SIZE - 1.001), i0 = Math.floor(fi), t = fi - i0, row = (j + 1) * MAP_SIZE;
    fetch[o] = fetch[row + i0] * (1 - t) + fetch[row + i0 + 1] * t + step / WIND.y;
  }
  // R: bank distance, G: rock waterline distance, B: openness, A: lily pad clearance.
  const smooth = THREE.MathUtils.smoothstep;
  const bytes = new Uint8Array(count * 4);
  for (let o = 0; o < count; o++) {
    open[o] = (.25 + .75 * smooth(fetch[o], .5, 10)) * (.4 + .6 * smooth(-shore[o], .1, 2.4)) * (.3 + .7 * smooth(Math.min(pad[o], rock[o] / ROCK_SPAN * 1.2), .05, 1));
    bytes[o * 4] = Math.round(THREE.MathUtils.clamp((shore[o] - SHORE_LOW) / SHORE_SPAN, 0, 1) * 255);
    bytes[o * 4 + 1] = Math.round(THREE.MathUtils.clamp(rock[o] / ROCK_SPAN, 0, 1) * 255);
    bytes[o * 4 + 2] = Math.round(open[o] * 255);
    bytes[o * 4 + 3] = Math.round(THREE.MathUtils.clamp(pad[o], 0, 1) * 255);
  }
  return {
    texture: dataTexture(bytes, MAP_SIZE, MAP_SIZE, false, false),
    shore: (x, z) => bilinear(shore, ...mapUv(x, z)),
    open: (x, z) => bilinear(open, ...mapUv(x, z)),
    clearance(x, z) {
      let clear = Infinity;
      for (const p of pads) clear = Math.min(clear, padDistance(p, x, z));
      for (const outline of outlines) clear = Math.min(clear, rockDistance(outline, x, z));
      return Math.max(clear, 0);
    },
  };
}

// --- Shaders. ------------------------------------------------------------------
export const WATER_VERTEX = /* glsl */ `
uniform mat4 textureMatrix;
varying vec4 vReflect;
varying vec3 vWaterWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWaterWorld = world.xyz;
  vReflect = textureMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const across = (angle: number) => `vec2(${glsl(Math.cos(angle))}, ${glsl(-Math.sin(angle))})`;
const along = (angle: number) => `vec2(${glsl(Math.sin(angle))}, ${glsl(Math.cos(angle))})`;
const TRAIN_GLSL = TRAINS.map(w => `  ph = dot(p, vec2(${glsl(w.dx)}, ${glsl(w.dz)})) * ${glsl(w.k)} - t * ${glsl(w.omega)} + ${glsl(w.phase)};
  fade = 1.0 - smoothstep(0.2, 0.45, dot(foot, vec2(${glsl(Math.abs(w.dx))}, ${glsl(Math.abs(w.dz))})) * ${glsl(w.k / (Math.PI * 2))});
  trains += vec2(${glsl(w.dx)}, ${glsl(w.dz)}) * (${glsl(w.slope)} * fade * cos(ph));
  lost += ${glsl(w.slope * w.slope * .5)} * (1.0 - fade);`).join('\n');

export const WATER_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform vec3 color;
uniform sampler2D tDiffuse;
uniform mat4 textureMatrix;
uniform float uTime;
uniform vec4 uRings[${RING_SLOTS}];
uniform vec4 uRingShape[${RING_SLOTS}];
uniform vec3 uMoon;
uniform vec3 uMoonRadiance;
uniform vec3 uDeep;
uniform sampler2D uRipple;
uniform sampler2D uGust;
uniform sampler2D uPondMap;
uniform float uRippleDecode;
uniform vec3 uMistMoon;
uniform vec3 uMistAmbient;
uniform float uMist;
varying vec4 vReflect;
varying vec3 vWaterWorld;
const vec2 WIND = ${along(WIND_ANGLE)};
const vec2 ACROSS = ${across(WIND_ANGLE)};
const vec2 ALONG_2 = ${along(WIND_ANGLE + .42)};
const vec2 ACROSS_2 = ${across(WIND_ANGLE + .42)};

vec2 pondMapUv(vec2 p) {
  float depth = max(${glsl(MAP_NEAR)} - p.y, 0.0);
  return vec2(0.5 + (p.x - 0.8) / (2.0 * min(3.2 + 0.62 * depth, 13.0)), log(1.0 + depth / ${glsl(MAP_SOFT)}) * ${glsl(1 / MAP_LOG)});
}
/** World-space (xz) direction of steepest increase of a screen-smooth field. */
vec2 worldGradient(float f, vec2 p) {
  vec2 df = vec2(dFdx(f), dFdy(f));
  vec2 px = dFdx(p), py = dFdy(p);
  float det = px.x * py.y - px.y * py.x;
  vec2 g = vec2(py.y * df.x - px.y * df.y, px.x * df.y - py.x * df.x) / (abs(det) > 1e-12 ? det : 1e-12);
  return g / max(length(g), 1e-6);
}
/** One read of the ripple texture: slope in world xz, unit RMS per axis; lost = unresolved share. */
vec2 rippleLayer(vec2 p, float t, vec2 along, vec2 across, float mirror, float tile, float drift, float omega, out float lost) {
  vec2 q = vec2(dot(p, across) * mirror, dot(p, along) - drift * t) / tile;
  vec4 s = texture2D(uRipple, q) * 2.0 - 1.0;
  vec2 st = (s.rg * cos(omega * t) + s.ba * sin(omega * t)) * uRippleDecode;
  vec2 dx = dFdx(q) * ${glsl(RIPPLE_SIZE)}, dy = dFdy(q) * ${glsl(RIPPLE_SIZE)};
  float a = length(dx), b = length(dy);
  float lod = log2(max(max(max(a, b) * 0.25, min(a, b)), 1.0));
  // Components span 6..43 texels; a mip of 2^lod texels averages the shorter ones away.
  lost = smoothstep(0.6, 4.4, lod);
  return st.x * mirror * across + st.y * along;
}
vec2 reflectionUv(vec3 dir, float reach) {
  vec4 c = vReflect + reach * (textureMatrix * vec4(dir.x, -dir.z, dir.y, 0.0));
  return c.xy / max(c.w, 1e-4);
}
vec3 reflection(vec2 uv) { return texture2D(tDiffuse, clamp(uv, vec2(0.002), vec2(0.998))).rgb; }

void main() {
  vec2 p = vWaterWorld.xz;
  float t = uTime;
  vec2 foot = fwidth(p);
  float footLength = length(foot);

  vec4 pond = texture2D(uPondMap, pondMapUv(p));
  float shore = pond.r * ${glsl(SHORE_SPAN)} + ${glsl(SHORE_LOW)};
  float rock = pond.g * ${glsl(ROCK_SPAN)};
  float open = pond.b;

  // Cat's-paws: gust patches drift down-wind and slowly change shape.
  vec4 g = texture2D(uGust, (p - WIND * (0.55 * t)) / 15.0);
  float gm = (g.r - 0.5) * cos(t * 0.13) + (g.g - 0.5) * sin(t * 0.13) + (g.b - 0.5) * 0.4;
  float gust = smoothstep(0.02, 0.2, gm) * open;

  // Directional wave trains, faded where a pixel spans half a wavelength.
  vec2 trains = vec2(0.0);
  float lost = 0.0, ph, fade;
${TRAIN_GLSL}
  float swell = open * (0.75 + 0.5 * gust);
  vec2 slope = trains * swell;
  float sig2 = lost * swell * swell;

  // Baked ripple field at two scales and directions.
  float lost1, lost2;
  vec2 s1 = rippleLayer(p, t, WIND, ACROSS, 1.0, 3.7, 0.24, 2.7, lost1);
  vec2 s2 = rippleLayer(p, t, ALONG_2, ACROSS_2, -1.0, 1.13, 0.16, 5.9, lost2);
  float e1 = open * (0.7 + 0.8 * gust) * 0.011;
  float e2 = open * (0.2 + 2.0 * gust) * 0.009;
  slope += s1 * e1 * (1.0 - lost1) + s2 * e2 * (1.0 - lost2);
  sig2 += lost1 * e1 * e1 + lost2 * e2 * e2;
  // Sub-texel capillaries: a calm floor, roughened by the gusts. They soften the
  // reflection a little and widen the moon's glitter a lot.
  float capillary = 0.0002 + open * (0.0016 + 0.005 * gust);

  // Rings: taps and pond life.
  for (int i = 0; i < ${RING_SLOTS}; i++) {
    vec4 ring = uRings[i];
    vec4 shape = uRingShape[i];
    float age = t - ring.z;
    if (ring.w <= 0.0 || age <= 0.0 || age >= shape.w) continue;
    vec2 delta = p - ring.xy;
    float d = length(delta);
    float lambda = 6.2831853 / shape.x;
    float front = d - shape.z * age;
    if (front > lambda * 2.5) continue;
    float width = front < 0.0 ? lambda * (1.0 + 1.3 * age) : lambda * 0.55;
    vec2 dir = delta / max(d, 1e-4);
    // Seen edge-on, the near and far arcs blur first; the side arcs stay resolved.
    float resolve = 1.0 - smoothstep(0.2, 0.45, dot(abs(dir), foot) / lambda);
    float life = smoothstep(0.0, 0.18, age) * (1.0 - smoothstep(0.6 * shape.w, shape.w, age));
    float amp = ring.w * life * sqrt(0.2 / (0.2 + d)) * exp(-front * front / (width * width));
    float wave = amp * sin(shape.x * (d - shape.y * age));
    // The first moment of a drop or a rise: a dome that settles back.
    float s = lambda * 1.2;
    float dome = ring.w * 0.8 * exp(-age * 2.5) * smoothstep(0.0, 0.12, age) * exp(-d * d / (s * s)) * 2.0 * d / s;
    slope += dir * (wave - dome) * resolve;
    sig2 += amp * amp * 0.5 * (1.0 - resolve);
  }

  // Bank and rock edges: lap running in toward them, a thin meniscus at contact.
  vec2 toBank = worldGradient(shore, p);
  vec2 fromRock = worldGradient(rock, p);
  float waterline = shore - 0.04;
  float lapFade = 1.0 - smoothstep(0.03, 0.07, footLength);
  float lap = smoothstep(-0.9, -0.08, waterline) * (1.0 - smoothstep(-0.03, 0.0, waterline)) * (0.4 + 0.6 * open);
  slope += toBank * cos(waterline * 52.0 - t * 13.0 + g.b * 9.0) * 0.03 * lap * lapFade;
  slope -= fromRock * cos(rock * 60.0 - t * 14.0 + g.a * 7.0) * 0.022 * exp(-rock / 0.22) * lapFade * open;
  float menFade = 1.0 - smoothstep(0.012, 0.04, footLength);
  slope += toBank * 0.5 * exp(-abs(waterline) / 0.014) * menFade;
  slope -= fromRock * 0.5 * exp(-max(rock - 0.004, 0.0) / 0.014) * menFade;

  // --- Optics. ------------------------------------------------------------------
  vec3 toEye = cameraPosition - vWaterWorld;
  float dist = length(toEye);
  vec3 v = toEye / dist;
  vec3 n = normalize(vec3(-slope.x, 1.0, -slope.y));
  float cosV = max(dot(n, v), 0.02);
  float fresnel = 0.02 + 0.98 * pow(1.0 - cosV, 5.0);

  // Reflected ray, and how far it travels before meeting the bank's trees or open sky.
  vec3 r = reflect(-v, n);
  r = normalize(vec3(r.x, max(r.y, 0.004), r.z));
  float hr = max(length(r.xz), 1e-3);
  vec2 rh = r.xz / hr;
  float run = (p.y + 23.5 + cos(p.x * 0.18) * 3.8) / max(-rh.y, 0.06);
  float right = 7.1 + max(0.0, -p.y) * 0.1 + sin(p.y * 0.23 + 1.5) * 1.35 - p.x;
  float left = p.x + 5.4 + max(0.0, -p.y) * 0.16 + sin(p.y * 0.29) * 1.05;
  run = max(min(run, (rh.x > 0.0 ? right : left) / max(abs(rh.x), 0.06)), 0.3);
  float reach = mix(run / hr, 400.0, smoothstep(3.5, 9.0, run * r.y / hr));
  vec2 uv = reflectionUv(r, reach);
  // Unresolved roughness smears the image along the reflected ray's elevation: screen-vertical.
  vec2 smear = (reflectionUv(normalize(r + vec3(0.0, 0.02, 0.0)), reach) - uv) * (min(sqrt(sig2 + 0.3 * capillary), 0.06) * 1.6 / 0.02);
  vec3 reflected = reflection(uv) * 0.3
    + (reflection(uv + smear * 0.55) + reflection(uv - smear * 0.55)) * 0.22
    + (reflection(uv + smear * 1.2) + reflection(uv - smear * 1.2)) * 0.13;
  // Roughened patches mirror less of the bright horizon: cat's-paws read darker.
  reflected *= 1.0 - 0.38 * gust;

  // The moonlit mist over the pond also lies along the reflected path.
  float overWater = smoothstep(8.5, 4.5, abs(p.x - 0.8 + 0.04 * p.y)) * smoothstep(-31.0, -22.0, p.y);
  float tau = uMist * 0.17 * (0.35 + 0.65 * smoothstep(-2.0, -16.0, p.y)) * overWater * (0.6 + 0.8 * g.a) / max(r.y, 0.05);
  float mistPhase = 0.3371 / pow(max(1.5184 - 1.44 * dot(r, uMoon), 1e-4), 1.5) + 0.3;
  float keep = exp(-tau);
  reflected = reflected * keep + (uMistMoon * mistPhase + uMistAmbient) * (1.0 - keep);

  // Moon glints from unresolved facets: a slope-distribution lobe (the glitter
  // path), spent as sparse drifting sparkles where it is thin and as a solid
  // broken band where it is dense.
  vec3 hv = normalize(v + uMoon);
  vec2 need = -hv.xz / hv.y;
  vec2 miss = need - slope;
  float gsig2 = sig2 + capillary + 0.00004;
  float lobe = exp(-dot(miss, miss) / (2.0 * gsig2)) / (6.2831853 * gsig2);
  float vh = max(dot(v, hv), 0.0);
  float glintF = 0.02 + 0.98 * pow(1.0 - vh, 5.0);
  float hv2 = hv.y * hv.y;
  float coverage = min(4.9e-4 * lobe / (4.0 * max(v.y, 0.03) * hv2 * hv2), 1.0);
  vec3 glint = vec3(0.0);
  if (coverage > 1e-4) {
    vec2 cell = exp2(ceil(log2(max(foot * 1.4, vec2(0.008)))));
    vec2 q = (p - WIND * (0.3 * t)) / cell;
    vec3 hs = bwHash3(vec3(floor(q), dot(log2(cell), vec2(17.0, 5.0))));
    vec2 off = fract(q) - (0.25 + 0.5 * hs.xy);
    float spot = exp(-dot(off, off) * 14.0);
    float twinkle = 0.5 + 0.5 * sin(6.2831853 * (t * (0.45 + 0.9 * hs.z) + hs.y * 5.0));
    const float SPOT = 0.112; // spot area (pi / 14) times mean twinkle (0.5)
    float density = coverage / SPOT;
    float pick = fract(hs.x * 31.7 + hs.z * 7.3);
    float sparse = smoothstep(pick - 0.06, pick + 0.06, density) * spot * twinkle;
    float solid = max(coverage - SPOT, 0.0) / (1.0 - SPOT);
    glint = uMoonRadiance * glintF * (solid + (1.0 - solid) * sparse);
  }

  // Body: depth from the bank distance, absorbed along the refracted path.
  float depth = max(0.1 - 0.16 * smoothstep(-0.5, 0.5, shore) + min(-0.1 * shore, 0.85), 0.0);
  float cosT = sqrt(max(1.0 - (1.0 - v.y * v.y) / 1.77, 0.05));
  float transmit = exp(-depth / cosT * 3.0);
  vec3 col = reflected * fresnel + uDeep * (1.0 - fresnel) * (1.0 - transmit) + glint;
  float alpha = clamp(1.0 - (1.0 - fresnel) * transmit, 0.02, 1.0);
  gl_FragColor = vec4(col / alpha, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

// --- Floating specks: pollen, a few petals and leaves drifting on the current. --
export function createDrift(map: PondMap, life: PondLife, camera: THREE.Camera, seed: number) {
  const random = seeded(seed);
  const shape = new THREE.Shape();
  shape.moveTo(0, -.5); shape.quadraticCurveTo(.42, -.12, 0, .5); shape.quadraticCurveTo(-.42, -.12, 0, -.5);
  const geometry = new THREE.ShapeGeometry(shape, 4); geometry.rotateX(-Math.PI / 2);
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .45, metalness: 0, side: THREE.DoubleSide });
  // Pollen clumps and seed fluff, fallen lily petals, and a few leaves near the bank.
  const kinds = [
    { count: 26, size: [.03, .05], width: .85, near: -7, color: [[.62, .58, .42], [.68, .66, .58]] },
    { count: 8, size: [.05, .075], width: .5, near: -5, color: [[.74, .72, .72], [.78, .72, .74]] },
    { count: 6, size: [.09, .13], width: .55, near: -2, color: [[.2, .17, .07], [.24, .15, .06], [.07, .1, .035]] },
  ] as const;
  const total = kinds.reduce((sum, kind) => sum + kind.count, 0);
  const mesh = new THREE.InstancedMesh(geometry, material, total);
  mesh.name = 'night-pond-floating-specks'; mesh.frustumCulled = false; mesh.receiveShadow = true;
  const ndc = new THREE.Vector3(), tint = new THREE.Color();
  camera.updateMatrixWorld();
  const specks: Array<{ x: number; z: number; vx: number; vz: number; cycle: number; offset: number; size: number; width: number; yaw: number; spin: number; wobble: number }> = [];
  for (const kind of kinds) for (let k = 0; k < kind.count; k++) {
    const cycle = 70 + random() * 40, speed = .02 + random() * .016, veer = (random() - .5) * .6;
    const vx = (WIND.x + veer * WIND.y) * speed, vz = (WIND.y - veer * WIND.x) * speed;
    let x = .105 * (4.8 + 2), z = -2;
    for (let attempt = 0; attempt < 80; attempt++) {
      // Half of them drift through the moon's path, where they read as silhouettes.
      const cz = kind.near + random() * (3.2 - kind.near), cx = random() < .5 ? .105 * (4.8 - cz) + (random() - .5) * 1.4 : (random() * 2 - 1) * .4 * (4.8 - cz);
      ndc.set(cx, 0, cz).project(camera);
      if (Math.abs(ndc.x) > .9 || ndc.y < -.95) continue;
      // The drift path stays on open water.
      if ([-.5, 0, .5].some(f => map.shore(cx + vx * cycle * f, cz + vz * cycle * f) > -.25)) continue;
      x = cx; z = cz;
      break;
    }
    const color = kind.color[Math.floor(random() * kind.color.length)];
    mesh.setColorAt(specks.length, tint.setRGB(color[0], color[1], color[2]));
    specks.push({ x, z, vx, vz, cycle, offset: random() * cycle, size: kind.size[0] + random() * (kind.size[1] - kind.size[0]), width: kind.width, yaw: random() * Math.PI * 2, spin: (random() - .5) * .06, wobble: random() * 6.3 });
  }
  mesh.count = specks.length;
  const field = { h: 0, sx: 0, sz: 0 }, dummy = new THREE.Object3D();
  dummy.rotation.order = 'XZY';
  return {
    mesh,
    update(t: number) {
      specks.forEach((s, i) => {
        const age = (t + s.offset) % s.cycle, u = age / s.cycle, travel = age - s.cycle * .5;
        const x = s.x + s.vx * travel + Math.sin(t * .05 + s.wobble) * .035, z = s.z + s.vz * travel + Math.cos(t * .043 + s.wobble) * .03;
        trainField(x, z, t, s.size, field);
        const calm = Math.sqrt(map.open(x, z));
        const scale = s.size * THREE.MathUtils.smoothstep(u, 0, .08) * (1 - THREE.MathUtils.smoothstep(u, .92, 1));
        dummy.position.set(x, Math.max(.0016, .003 + (field.h * calm + life.heightAt(x, z, t)) * .5), z);
        dummy.rotation.set(-field.sz * calm, s.yaw + s.spin * t, field.sx * calm);
        dummy.scale.set(scale * s.width, scale, scale);
        dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    },
  };
}
