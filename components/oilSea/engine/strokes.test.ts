import { describe, expect, it } from 'vitest';
import { FLOATS_PER_STROKE, FRAME_STROKE_BUDGET, MOVING_PASS, PASSES, REGION, REGION_COUNT, planStrokes, random, type Guide } from './strokes';

/**
 * A guide like the real one: sky above, sea below on the left, grass below on
 * the right, a patch of pine needles; strokes level everywhere; detail rising
 * towards the shore.
 */
function makeGuide(width = 96, height = 54): Guide {
  const data = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const v = y / height;
      let region: number = v > 0.7 ? REGION.sky : u < 0.6 ? REGION.sea : REGION.grass;
      if (u > 0.75 && u < 0.9 && v > 0.4 && v < 0.6) region = REGION.needles;
      const importance = region === REGION.sea ? 0.3 + 0.6 * u / 0.6 : region === REGION.needles ? 0.9 : 0.4;
      const i = (y * width + x) * 4;
      data[i] = region === REGION.grass ? 128 : 0; // level, or upright in the grass
      data[i + 1] = 128; // length scale 1
      data[i + 2] = Math.round(((region + 0.5) / REGION_COUNT) * 255);
      data[i + 3] = Math.round(importance * 255);
    }
  }
  return { width, height, data };
}

const strokes = (data: Float32Array, first: number, count: number) =>
  Array.from({ length: count }, (_, k) => data.subarray((first + k) * FLOATS_PER_STROKE, (first + k + 1) * FLOATS_PER_STROKE));

describe('stroke plan', () => {
  const width = 960;
  const height = 540;
  const guide = makeGuide();
  const plan = planStrokes(guide, width, height, 7);
  // What the guide says lies under a canvas point.
  const regionAt = (x: number, y: number) => {
    const gx = Math.min(guide.width - 1, Math.max(0, Math.floor((x / width) * guide.width)));
    const gy = Math.min(guide.height - 1, Math.max(0, Math.floor((y / height) * guide.height)));
    return Math.floor((guide.data[(gy * guide.width + gx) * 4 + 2] / 255) * REGION_COUNT);
  };

  it('groups strokes by what they paint and lays them out back to back', () => {
    expect(plan.sea.first).toBe(0);
    expect(plan.still.first).toBe(plan.sea.count);
    expect(plan.tree.first).toBe(plan.sea.count + plan.still.count);
    expect(plan.data.length).toBe((plan.sea.count + plan.still.count + plan.tree.count) * FLOATS_PER_STROKE);
    for (const group of [plan.sea, plan.still, plan.tree]) expect(group.count).toBeGreaterThan(50);
  });

  it('paints broad strokes first and fine ones later, within each group', () => {
    for (const group of [plan.sea, plan.still, plan.tree]) {
      const passes = strokes(plan.data, group.first, group.count).map((stroke) => stroke[7]);
      for (let i = 1; i < passes.length; i++) expect(passes[i]).toBeGreaterThanOrEqual(passes[i - 1]);
    }
  });

  it('keeps each stroke on its own form: it starts, passes and ends there', () => {
    const groups: [typeof plan.sea, number[]][] = [[plan.sea, [REGION.sea]], [plan.still, [REGION.sky, REGION.grass]], [plan.tree, [REGION.needles]]];
    for (const [group, regions] of groups) {
      for (const stroke of strokes(plan.data, group.first, group.count)) {
        // The curve passes through its anchor halfway along.
        const midX = 0.25 * stroke[0] + 0.5 * stroke[2] + 0.25 * stroke[4];
        const midY = 0.25 * stroke[1] + 0.5 * stroke[3] + 0.25 * stroke[5];
        const region = regionAt(midX, midY);
        expect(regions).toContain(region);
        expect(regionAt(stroke[0], stroke[1])).toBe(region);
        expect(regionAt(stroke[4], stroke[5])).toBe(region);
        expect(stroke[6]).toBeGreaterThan(0);
        expect(stroke[10]).toBeGreaterThanOrEqual(0);
        expect(stroke[10]).toBeLessThanOrEqual(1);
      }
    }
  });

  it('lets only the sea detail strokes ride the swell', () => {
    for (const stroke of strokes(plan.data, plan.sea.first, plan.sea.count)) {
      if (stroke[7] >= MOVING_PASS) {
        expect(stroke[11]).toBeGreaterThanOrEqual(0);
        expect(stroke[11]).toBeLessThan(1);
      } else {
        expect(stroke[11]).toBe(-1);
      }
    }
    for (const stroke of strokes(plan.data, plan.still.first, plan.still.count + plan.tree.count)) expect(stroke[11]).toBe(-1);
  });

  it('adds fine strokes only where the picture has detail', () => {
    const finest = PASSES.length - 1;
    const fine = strokes(plan.data, plan.sea.first, plan.sea.count).filter((stroke) => stroke[7] === finest);
    for (const stroke of fine) expect(stroke[2] / width).toBeGreaterThan(0.25);
  });

  it('keeps what is painted every frame within budget, thinning only the fine sea strokes', () => {
    expect(plan.sea.count + plan.tree.count).toBeLessThanOrEqual(FRAME_STROKE_BUDGET);
    const tight = planStrokes(makeGuide(), width, height, 7, 2000);
    const broad = (group: typeof plan) => strokes(group.data, group.sea.first, group.sea.count).filter((stroke) => stroke[7] < MOVING_PASS).length;
    const fine = plan.sea.count - broad(plan);
    expect(broad(tight)).toBe(broad(plan));
    expect(tight.sea.count - broad(tight)).toBeLessThan(fine * 0.45);
    expect(tight.sea.count - broad(tight)).toBeGreaterThan(0);
    expect(tight.still.count).toBe(plan.still.count);
    expect(tight.tree.count).toBe(plan.tree.count);
  });

  it('is the same painting for the same seed and a different one otherwise', () => {
    expect(planStrokes(makeGuide(), width, height, 7).data).toEqual(plan.data);
    expect(planStrokes(makeGuide(), width, height, 8).data).not.toEqual(plan.data);
    const rand = random(3);
    const values = Array.from({ length: 1000 }, rand);
    expect(Math.min(...values)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...values)).toBeLessThan(1);
  });
});
