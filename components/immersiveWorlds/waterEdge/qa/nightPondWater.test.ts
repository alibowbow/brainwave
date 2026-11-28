import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { PondLife, RING_SLOTS, TAP_SLOTS, WATER_FRAGMENT, bakePondMap, bakeRippleTexture, trainField } from '../scenes/nightPondWater';

function camera() {
  const view = new THREE.PerspectiveCamera(51, 1.6, .08, 150);
  view.position.set(0, .97, 4.8); view.lookAt(0, -.6, -7); view.updateProjectionMatrix();
  return view;
}
function life() {
  const rings = Array.from({ length: RING_SLOTS }, () => new THREE.Vector4());
  const shapes = Array.from({ length: RING_SLOTS }, () => new THREE.Vector4());
  return { rings, shapes, life: new PondLife(rings, shapes, camera(), () => true) };
}
const snapshot = (rings: THREE.Vector4[]) => rings.map(ring => ring.toArray().map(v => +v.toFixed(5)));
const active = (rings: THREE.Vector4[], shapes: THREE.Vector4[], t: number) =>
  rings.filter((ring, i) => i >= TAP_SLOTS && ring.w > 0 && t > ring.z && t < ring.z + shapes[i].w).length;

describe('night pond water', () => {
  it('schedules pond-life rings as a pure function of scene time', () => {
    const ordered = life(), shuffled = life();
    const times = Array.from({ length: 40 }, (_, i) => i * 1.7);
    const expected = times.map(t => { ordered.life.update(t); return snapshot(ordered.rings); });
    [...times.keys()].reverse().forEach(i => { shuffled.life.update(times[i]); expect(snapshot(shuffled.rings)).toEqual(expected[i]); });
  });

  it('keeps a few unsynchronised rings alive, never on a beat', () => {
    const { rings, shapes, life: pond } = life();
    const counts: number[] = [], starts = new Set<number>();
    for (let t = 0; t < 900; t += .5) {
      pond.update(t);
      counts.push(active(rings, shapes, t));
      rings.slice(TAP_SLOTS).forEach(ring => { if (ring.w > 0) starts.add(+ring.z.toFixed(3)); });
    }
    const mean = counts.reduce((a, b) => a + b, 0) / counts.length;
    expect(mean).toBeGreaterThan(.8);
    expect(mean).toBeLessThan(3.5);
    expect(Math.max(...counts)).toBeLessThanOrEqual(RING_SLOTS - TAP_SLOTS);
    const sorted = [...starts].sort((a, b) => a - b), gaps = sorted.slice(1).map((s, i) => s - sorted[i]);
    const gapMean = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    const spread = Math.sqrt(gaps.reduce((a, b) => a + (b - gapMean) ** 2, 0) / gaps.length);
    expect(spread / gapMean).toBeGreaterThan(.4);
  });

  it('writes taps into their own slots and lets floating things feel them', () => {
    const { rings, life: pond } = life();
    pond.update(20);
    const lifeSlots = snapshot(rings.slice(TAP_SLOTS));
    pond.tap(2, .5, -1, 20, .75);
    expect(rings[2].toArray()).toEqual([.5, -1, 20, expect.any(Number)]);
    expect(rings[2].w).toBeGreaterThan(0);
    expect(snapshot(rings.slice(TAP_SLOTS))).toEqual(lifeSlots);
    expect(Math.abs(pond.heightAt(.5 + .42 * .6, -1, 20.6))).toBeGreaterThan(0);
  });

  it('bakes a deterministic, tileable ripple texture with unit-RMS decode', () => {
    const a = bakeRippleTexture(4127), b = bakeRippleTexture(4127);
    const data = a.texture.image.data as Uint8Array, size = a.texture.image.width;
    expect(Array.from(data.slice(0, 64))).toEqual(Array.from((b.texture.image.data as Uint8Array).slice(0, 64)));
    let square = 0;
    for (let i = 0; i < data.length; i++) square += ((data[i] / 255 * 2 - 1) * a.decode) ** 2;
    expect(Math.sqrt(square / data.length)).toBeCloseTo(1, 1);
    // The wrap seam is no rougher than any interior column step.
    const step = (x0: number, x1: number) => { let sum = 0; for (let y = 0; y < size; y++) sum += Math.abs(data[(y * size + x0) * 4] - data[(y * size + x1) * 4]); return sum / size; };
    expect(step(size - 1, 0)).toBeLessThan(step(10, 11) * 2 + 2);
    expect(a.texture.wrapS).toBe(THREE.RepeatWrapping);
    a.texture.dispose(); b.texture.dispose();
  });

  it('maps banks, pad rims and shelter for calm lees and clearance tests', () => {
    const pad = new THREE.Mesh(new THREE.BufferGeometry());
    pad.position.set(1, .006, -2);
    const map = bakePondMap({ shoreDistance: (x, z) => Math.hypot(x - .5, z + 6) - 8, rocks: [], pads: [{ mesh: pad, radius: .4, offset: 0 }] });
    expect(map.shore(.5, -6)).toBeCloseTo(-8, 0);
    expect(map.clearance(1, -2)).toBe(0);
    expect(map.clearance(1, -4)).toBeGreaterThan(1.4);
    expect(map.open(1.5, -2)).toBeLessThan(map.open(.5, 0));
    map.texture.dispose();
  });

  it('shares wave trains between the shader and floating things', () => {
    const field = { h: 0, sx: 0, sz: 0 };
    trainField(1, -2, 3, 0, field);
    expect(Math.abs(field.h)).toBeLessThan(.01);
    expect(Math.hypot(field.sx, field.sz)).toBeLessThan(.06);
    expect(WATER_FRAGMENT).toContain(`uniform vec4 uRings[${RING_SLOTS}]`);
  });
});
