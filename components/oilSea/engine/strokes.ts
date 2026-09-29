/*
 * The painting is made of brush strokes planned once per canvas size, the
 * way a painter works: broad strokes block in everything, then smaller and
 * smaller ones only where the picture has detail. Each stroke follows the
 * form it paints (along a wave crest, round a cloud, down a grass blade) and
 * stops at the edge of that form.
 *
 * A small guide image rendered on the GPU says, for every part of the view,
 * which way strokes run, how long they are, what is there and how much
 * detail it holds.
 */

/** What a part of the picture is; the guide stores it and strokes are grouped by it. */
export const REGION = { sky: 0, farHills: 1, land: 2, beach: 3, sea: 4, grass: 5, needles: 6, wood: 7 } as const;
export const REGION_COUNT = 8;

export interface Guide {
  width: number;
  height: number;
  /** RGBA8, bottom row first: flow angle / π, length scale / 2, (region + 0.5) / 8, importance. */
  data: Uint8Array;
}

export interface StrokeGroup {
  first: number;
  count: number;
}

export interface StrokePlan {
  /** FLOATS_PER_STROKE floats per stroke, sea strokes first, then the still ones, then the pine. */
  data: Float32Array;
  sea: StrokeGroup;
  still: StrokeGroup;
  tree: StrokeGroup;
}

/**
 * Per stroke: the curve (start, control, end in canvas pixels), half width,
 * pass, colour and bristle seeds, when it is laid down during the drawing-in
 * (0..1), and for sea strokes that ride the swell their phase (-1 when fixed).
 */
export const FLOATS_PER_STROKE = 12;

interface Pass {
  /** Length and width in view units (a hundredth of the shorter side). */
  length: number;
  width: number;
  spacing: number;
  /** Only where the guide's importance reaches this. */
  importance: number;
}

export const PASSES: readonly Pass[] = [
  { length: 8, width: 3, spacing: 4, importance: 0 },
  { length: 5, width: 1.9, spacing: 2.5, importance: 0 },
  { length: 3.2, width: 1.2, spacing: 1.6, importance: 0.35 },
  { length: 2, width: 0.75, spacing: 1, importance: 0.6 },
  { length: 1.3, width: 0.5, spacing: 0.65, importance: 0.85 },
];

/** From this pass on, sea strokes travel with the swell (the broad ones stay put). */
export const MOVING_PASS = 2;

/**
 * Strokes painted every frame (the sea's and the pine's) are capped so small
 * or slow devices keep up; the finest sea strokes are thinned first.
 */
export const FRAME_STROKE_BUDGET = 22_000;

/** How freely strokes stray from the guide's direction, per region. */
const JITTER = [0.14, 0.1, 0.22, 0.1, 0.07, 0.18, 0.45, 0.08];

/** Small, fast, seedable generator (mulberry32). */
export function random(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Smooth value noise over the canvas for the order strokes appear in. */
function orderNoise(seed: number) {
  const rand = random(seed ^ 0x9e3779b9);
  const size = 8;
  const grid = Array.from({ length: (size + 1) * (size + 1) }, () => rand());
  return (u: number, v: number) => {
    const x = clamp(u, 0, 0.9999) * size;
    const y = clamp(v, 0, 0.9999) * size;
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const at = (i: number, j: number) => grid[j * (size + 1) + i];
    const top = at(ix, iy) + (at(ix + 1, iy) - at(ix, iy)) * sx;
    const bottom = at(ix, iy + 1) + (at(ix + 1, iy + 1) - at(ix, iy + 1)) * sx;
    return top + (bottom - top) * sy;
  };
}

interface GuideSample {
  angle: number;
  length: number;
  region: number;
  importance: number;
}

function reader(guide: Guide, width: number, height: number) {
  const sample: GuideSample = { angle: 0, length: 1, region: 0, importance: 0 };
  return (x: number, y: number) => {
    const gx = clamp(Math.floor((x / width) * guide.width), 0, guide.width - 1);
    const gy = clamp(Math.floor((y / height) * guide.height), 0, guide.height - 1);
    const i = (gy * guide.width + gx) * 4;
    sample.angle = (guide.data[i] / 255) * Math.PI;
    sample.length = (guide.data[i + 1] / 255) * 2;
    sample.region = Math.min(REGION_COUNT - 1, Math.floor((guide.data[i + 2] / 255) * REGION_COUNT));
    sample.importance = guide.data[i + 3] / 255;
    return sample;
  };
}

export function planStrokes(guide: Guide, width: number, height: number, seed = 1, budget = FRAME_STROKE_BUDGET): StrokePlan {
  const rand = random(seed);
  const order = orderNoise(seed);
  const read = reader(guide, width, height);
  const unit = Math.max(1, Math.min(width, height) / 100);
  const groups: number[][][] = [[], [], []]; // sea, still, tree; one list per pass inside each

  PASSES.forEach((pass, layer) => {
    const lists = groups.map((group) => {
      group[layer] = [];
      return group[layer];
    });
    const step = pass.spacing * unit;
    const margin = pass.length * unit * 0.5;
    for (let y = -margin; y < height + margin; y += step) {
      for (let x = -margin; x < width + margin; x += step) {
        const ax = x + (rand() - 0.5) * step * 1.1;
        const ay = y + (rand() - 0.5) * step * 1.1;
        const at = read(clamp(ax, 0, width - 1), clamp(ay, 0, height - 1));
        if (at.importance + (rand() - 0.5) * 0.14 < pass.importance) continue;
        const region = at.region;
        const length = pass.length * unit * at.length * (0.75 + 0.5 * rand());
        const halfWidth = 0.5 * pass.width * unit * (0.8 + 0.4 * rand());
        const angle = at.angle + (rand() - 0.5) * 2 * JITTER[region];
        // Trace the stroke both ways along the flow, stopping at the edge of its form.
        const trace = (sign: number) => {
          let px = ax;
          let py = ay;
          let dx = Math.cos(angle) * sign;
          let dy = Math.sin(angle) * sign;
          const segment = length / 4;
          for (let k = 0; k < 2; k++) {
            const nx = px + dx * segment;
            const ny = py + dy * segment;
            const next = read(clamp(nx, 0, width - 1), clamp(ny, 0, height - 1));
            if (next.region !== region) break;
            px = nx;
            py = ny;
            let fx = Math.cos(next.angle);
            let fy = Math.sin(next.angle);
            if (fx * dx + fy * dy < 0) {
              fx = -fx;
              fy = -fy;
            }
            const mx = dx + fx;
            const my = dy + fy;
            const norm = Math.hypot(mx, my) || 1;
            dx = mx / norm;
            dy = my / norm;
          }
          return [px, py];
        };
        const [x0, y0] = trace(-1);
        const [x2, y2] = trace(1);
        // Too short to read as a stroke where a form is thinner than the brush.
        if (Math.hypot(x2 - x0, y2 - y0) < halfWidth * 0.8) continue;
        // Control point so the curve passes through the anchor halfway along.
        const x1 = 2 * ax - 0.5 * (x0 + x2);
        const y1 = 2 * ay - 0.5 * (y0 + y2);
        const when = clamp(0.08 + 0.58 * (layer / (PASSES.length - 1)) + 0.28 * order(ax / width, ay / height) + 0.06 * rand(), 0, 1);
        const group = region === REGION.sea ? 0 : region === REGION.needles || region === REGION.wood ? 2 : 1;
        const phase = group === 0 && layer >= MOVING_PASS ? rand() : -1;
        lists[group].push(x0, y0, x1, y1, x2, y2, halfWidth, layer, rand(), rand(), when, phase);
      }
    }
  });

  // Thin the finest sea strokes until what is painted every frame fits the budget.
  const count = (list: number[]) => list.length / FLOATS_PER_STROKE;
  let perFrame = groups[0].reduce((sum, list) => sum + count(list), 0) + groups[2].reduce((sum, list) => sum + count(list), 0);
  for (let layer = PASSES.length - 1; layer >= MOVING_PASS && perFrame > budget; layer--) {
    const list = groups[0][layer];
    const have = count(list);
    const keep = Math.max(0.3, 1 - (perFrame - budget) / Math.max(1, have));
    const kept: number[] = [];
    for (let i = 0; i < have; i++) {
      if (rand() < keep) kept.push(...list.slice(i * FLOATS_PER_STROKE, (i + 1) * FLOATS_PER_STROKE));
    }
    perFrame -= have - count(kept);
    groups[0][layer] = kept;
  }

  // Within a pass, strokes overlap in no particular order.
  const shuffled = (list: number[]) => {
    const count = list.length / FLOATS_PER_STROKE;
    for (let i = count - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      for (let k = 0; k < FLOATS_PER_STROKE; k++) {
        const a = i * FLOATS_PER_STROKE + k;
        const b = j * FLOATS_PER_STROKE + k;
        const swap = list[a];
        list[a] = list[b];
        list[b] = swap;
      }
    }
    return list;
  };
  const flat = groups.map((passes) => passes.flatMap((list) => shuffled(list)));
  const data = new Float32Array(flat[0].length + flat[1].length + flat[2].length);
  data.set(flat[0], 0);
  data.set(flat[1], flat[0].length);
  data.set(flat[2], flat[0].length + flat[1].length);
  const sea = flat[0].length / FLOATS_PER_STROKE;
  const still = flat[1].length / FLOATS_PER_STROKE;
  const tree = flat[2].length / FLOATS_PER_STROKE;
  return {
    data,
    sea: { first: 0, count: sea },
    still: { first: sea, count: still },
    tree: { first: sea + still, count: tree },
  };
}
