/*
 * The place, in metres: a grassy headland (where the viewer stands, high
 * above the water) at the south end of a long bay. From its top a steep
 * slope falls north-west to the sea, where the sun is setting, and a gentler
 * one north-east to the low ground behind the beach. The beach runs away to
 * the north-east and ends under a hilly headland. y is up, the view looks
 * north (-z), sea level is y = 0.
 *
 * The coastline is analytic so the terrain (built here, on the CPU) and the
 * water (shaded on the GPU) agree on where the shore is and how deep it gets.
 */

export const CAMERA = { x: 0, y: 61, z: 0, yaw: 0.18, pitch: -0.2 };

/** Towards the sun: low in the west-north-west, a little left of the view. */
export const SUN = (() => {
  const azimuth = -0.3; // radians, from north (-z) towards the west (-x)
  const elevation = 0.07;
  return {
    x: Math.sin(azimuth) * Math.cos(elevation),
    y: Math.sin(elevation),
    z: -Math.cos(azimuth) * Math.cos(elevation),
  };
})();

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** East–west position of the bay's shoreline at a given z (land lies east of it). */
export function shoreX(z: number) {
  const d = Math.max(0, -z - 150);
  if (d < 1700) return 180 + 0.12 * d - 0.00007 * d * d;
  return 181.7 - 0.118 * (d - 1700);
}

/** The northern end of the bay's headland. */
export const HEADLAND_TIP_Z = -4250;

/**
 * The headland the viewer stands on, in its own frame: a runs down its
 * seaward face (north-west, 0 at the edge of its top), b along that edge
 * (north-east, 0 below the viewer). Its top ends in the north-east just past
 * the pine, where a second slope falls to the low ground behind the beach.
 */
const FALL_SIN = Math.sin((-50 * Math.PI) / 180);
const FALL_COS = Math.cos((-50 * Math.PI) / 180);
const TOP_CORNER = { x: -3.06, z: -2.57 };
export const HEADLAND_TOP = 50;
/** The seaward face's run from the top's edge down to the water. */
export const SLOPE_RUN = 58;
/** Where the top ends along its edge, and the run of the slope beyond. */
export const TOP_END = 44;
export const LANDWARD_RUN = 70;

export function headlandFrame(x: number, z: number) {
  const dx = x - TOP_CORNER.x;
  const dz = z - TOP_CORNER.z;
  return { a: dx * FALL_SIN - dz * FALL_COS, b: dx * FALL_COS + dz * FALL_SIN };
}

/** The world position of a point given in the headland's frame. */
export function headlandPoint(a: number, b: number) {
  return {
    x: TOP_CORNER.x + a * FALL_SIN + b * FALL_COS,
    z: TOP_CORNER.z - a * FALL_COS + b * FALL_SIN,
  };
}

/** How far down the headland's slopes a point is: 0 on the top's edge, 1 at their foot. */
export function headlandFall(x: number, z: number) {
  const { a, b } = headlandFrame(x, z);
  return smoothMax(a / SLOPE_RUN, (b - TOP_END) / LANDWARD_RUN, 0.12);
}

/** Union of two signed distances with a rounded join (so waves bend smoothly round the headland). */
function smoothMin(a: number, b: number, k: number) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}

function smoothMax(a: number, b: number, k: number) {
  return -smoothMin(-a, -b, k);
}

/** Signed distance to the headland's seaward shore (positive at sea). */
export function headlandDistance(x: number, z: number) {
  return headlandFrame(x, z).a - SLOPE_RUN;
}

/** Signed distance to the coast in metres: positive at sea, negative ashore. */
export function coastDistance(x: number, z: number) {
  const dz = 1;
  const slope = (shoreX(z + dz) - shoreX(z - dz)) / (2 * dz);
  const main = Math.max((shoreX(z) - x) / Math.sqrt(1 + slope * slope), HEADLAND_TIP_Z - z);
  return smoothMin(main, headlandDistance(x, z), 60);
}

/** How deep the water is at a distance out from the shore, with a sandbar. */
export function seaDepth(distance: number) {
  const d = Math.max(0, distance);
  return Math.min(32, 0.35 + 0.045 * d + 0.9 * Math.sin(d * 0.07) * Math.exp(-d / 70));
}

// Value noise, matching the GLSL below closely enough for colour variation.
function hash(x: number, y: number) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export function noise2(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

export function fbm2(x: number, y: number, octaves = 5) {
  let sum = 0;
  let amp = 0.5;
  let fx = x;
  let fy = y;
  for (let i = 0; i < octaves; i++) {
    sum += amp * noise2(fx, fy);
    const nx = 1.6 * fx + 1.2 * fy;
    const ny = -1.2 * fx + 1.6 * fy;
    fx = nx + 17.3;
    fy = ny - 9.1;
    amp *= 0.5;
  }
  return sum;
}

/** Sharp-crested noise for ridges and spurs. */
function ridged(x: number, y: number) {
  let sum = 0;
  let amp = 0.5;
  let fx = x;
  let fy = y;
  for (let i = 0; i < 5; i++) {
    const n = 1 - Math.abs(2 * noise2(fx, fy) - 1);
    sum += amp * n * n;
    const nx = 1.7 * fx + 1.1 * fy;
    const ny = -1.1 * fx + 1.7 * fy;
    fx = nx + 5.2;
    fy = ny + 1.3;
    amp *= 0.5;
  }
  return sum;
}

/** Height of the ground (the sea floor below water) at a point. */
export function terrainHeight(x: number, z: number) {
  const distance = coastDistance(x, z);
  // A far range of hazy hills closes the horizon on the right.
  const far = z < -5600 && x > -1400
    ? smoothstep(-5600, -7000, z) * smoothstep(-1400, 200, x) * (90 + 380 * fbm2(x * 0.0009, z * 0.0009, 4)) - 25
    : -40;
  if (distance > 0) return Math.max(-seaDepth(distance), far);

  const inland = -distance;
  // Sand at the water's edge, dunes behind it.
  let h = 0.6 + 3.2 * smoothstep(0, 45, inland) + 1.4 * (fbm2(x * 0.03, z * 0.03, 3) - 0.5) * smoothstep(10, 40, inland);
  // Rolling hills with soft spurs running down to the bay, higher on the northern headland.
  const hillRise = smoothstep(35, 480, inland);
  const lift = 1 + 0.8 * smoothstep(-1500, -3200, z);
  const rolling = fbm2(x * 0.0016 + 3.1, z * 0.0016, 5);
  // Spurs and gullies running down towards the bay: ridged noise stretched along the fall line.
  const spurs = ridged(x * 0.0042 + z * 0.0012, z * 0.0028 - x * 0.0008);
  h += hillRise * lift * (30 + 95 * rolling + 70 * spurs * smoothstep(60, 400, inland)) * (0.55 + 0.45 * smoothstep(0, 900, inland));
  // The headland: a grassy top, a steep face falling to the sea and the bay,
  // a gentler slope down to the low ground behind the beach.
  const fall = headlandFall(x, z);
  if (fall < 1.1) {
    const top = HEADLAND_TOP + 2.5 * (fbm2(x * 0.05, z * 0.05, 3) - 0.5);
    const t = Math.min(1, Math.max(0, fall));
    const standing = 1 - t * t * (3 - 2 * t);
    // Rocky ledges and hummocks, strongest where the ground falls fastest.
    const falling = Math.min(1, 4 * t * (1 - t) + 0.15);
    const ledges = falling * (4 * (fbm2(x * 0.06, z * 0.06, 4) - 0.5) + 1.8 * (noise2(x * 0.3, z * 0.3) - 0.5));
    h = Math.max(h, 0.6 + (top - 0.6) * standing + ledges * standing);
  }
  return Math.max(h, far);
}

/** The same coastline for the shaders. */
export const WORLD_GLSL = /* glsl */ `
const float HEADLAND_TIP_Z = ${HEADLAND_TIP_Z.toFixed(1)};
float shoreX(float z) {
  float d = max(0.0, -z - 150.0);
  return d < 1700.0 ? 180.0 + 0.12 * d - 0.00007 * d * d : 181.7 - 0.118 * (d - 1700.0);
}
float smoothMin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}
// Signed distance to the coast in metres: positive at sea, negative ashore.
float coastDistance(vec2 p) {
  float slope = (shoreX(p.y + 1.0) - shoreX(p.y - 1.0)) * 0.5;
  float main = max((shoreX(p.y) - p.x) / sqrt(1.0 + slope * slope), HEADLAND_TIP_Z - p.y);
  vec2 q = p - vec2(${TOP_CORNER.x.toFixed(2)}, ${TOP_CORNER.z.toFixed(2)});
  float headland = dot(q, vec2(${FALL_SIN.toFixed(5)}, ${(-FALL_COS).toFixed(5)})) - ${SLOPE_RUN.toFixed(1)};
  return smoothMin(main, headland, 60.0);
}
float seaDepth(float distance) {
  float d = max(0.0, distance);
  return min(32.0, 0.35 + 0.045 * d + 0.9 * sin(d * 0.07) * exp(-d / 70.0));
}
`;
