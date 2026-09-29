import { describe, expect, it } from 'vitest';
import { DEFAULT_RAIN, RainSimulation } from './rainSimulation';
import { mulberry32 } from './random';

const make = (overrides = {}) => new RainSimulation(600, 400, { ...DEFAULT_RAIN, ...overrides }, mulberry32(42));

describe('rain on the glass', () => {
  it('is deterministic for a seed and never exceeds its drop budget', () => {
    const a = make({ maxDrops: 300 });
    const b = make({ maxDrops: 300 });
    for (let i = 0; i < 600; i++) { a.step(); b.step(); }
    expect(a.drops.length).toBe(b.drops.length);
    expect(a.drops.length).toBeLessThanOrEqual(300);
    expect(a.drops.map((d) => d.x.toFixed(4))).toEqual(b.drops.map((d) => d.x.toFixed(4)));
  });

  it('lets heavy drops race down, wiping a channel and leaving beads behind', () => {
    const sim = make({ spawnRate: 0 });
    const heavy = sim.createDrop({ x: 300, y: 20, r: DEFAULT_RAIN.maxR * 1.2 })!;
    heavy.isNew = false;
    sim.drops.push(heavy);
    let cleared = 0;
    for (let i = 0; i < 240; i++) {
      sim.step();
      cleared += sim.clearings.length;
    }
    expect(heavy.y > 60 || heavy.killed).toBe(true);
    expect(cleared).toBeGreaterThan(0);
    expect(sim.drops.some((drop) => drop !== heavy && drop.parent === heavy)).toBe(true);
  });

  it('merges touching drops into one larger drop', () => {
    const sim = make({ spawnRate: 0 });
    const big = sim.createDrop({ x: 100, y: 100, r: 3 })!;
    const small = sim.createDrop({ x: 102, y: 100, r: 2 })!;
    sim.drops.push(big, small);
    sim.step();
    expect(small.killed).toBe(true);
    expect(big.r).toBeCloseTo(Math.sqrt(9 + 4 * 0.8), 1);
  });

  it('stops new rain at zero intensity while the pane stays wet', () => {
    const sim = make();
    sim.seed(50);
    sim.intensity = 0;
    const original = new Set(sim.drops);
    for (let i = 0; i < 60; i++) sim.step();
    // Only beads shed by drops already on the glass may appear.
    expect(sim.drops.filter((drop) => !original.has(drop) && drop.parent === null)).toHaveLength(0);
    expect(sim.drops.length).toBeGreaterThan(0);
  });

  it('keeps drops attached to the glass when the visible area changes', () => {
    const sim = make({ spawnRate: 0 });
    const drop = sim.createDrop({ x: 50, y: 50, r: 2 })!;
    sim.drops.push(drop);
    sim.resize(400, 300, 10, -5);
    expect(drop.x).toBe(60);
    expect(drop.y).toBe(45);
    sim.resize(40, 30, -100, 0);
    expect(sim.drops).not.toContain(drop);
  });
});
