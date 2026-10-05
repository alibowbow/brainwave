import { describe, expect, it } from 'vitest';
import {
  advanceCosmicQuality,
  createCosmicQualityState,
  type CosmicQualityState,
} from '../qualityPolicy';

function frames(state: CosmicQualityState, count: number, dt: number) {
  for (let frame = 0; frame < count; frame++) state = advanceCosmicQuality(state, dt);
  return state;
}

describe('cosmic measured quality policy', () => {
  it('starts a new engine at full quality and a 1024 reflection target', () => {
    expect(createCosmicQualityState()).toEqual({
      quality: 1, slowFor: 0, fastFor: 0, reflectionSize: 1024,
    });
  });

  it('reduces only after more than eight accumulated seconds of slow pressure', () => {
    const boundary = frames(createCosmicQualityState(), 64, 0.125);
    expect(boundary).toMatchObject({ quality: 1, slowFor: 8, reflectionSize: 1024 });
    const reduced = advanceCosmicQuality(boundary, 0.125);
    expect(reduced).toEqual({ quality: 0.8, slowFor: 0, fastFor: 0, reflectionSize: 768 });
    expect(boundary.quality).toBe(1); // The policy never mutates a prior snapshot.
  });

  it('accumulates nonconsecutive slowdown across intermediate and long frames', () => {
    let state = createCosmicQualityState();
    for (let frame = 0; frame < 65; frame++) {
      state = advanceCosmicQuality(state, 0.125);
      state = advanceCosmicQuality(state, 0.03);
      state = advanceCosmicQuality(state, 0.6);
    }
    expect(state).toMatchObject({ quality: 0.8, reflectionSize: 768 });
  });

  it('decays slow pressure by fast-frame time and resets recovery on a slow frame', () => {
    let state = advanceCosmicQuality(createCosmicQualityState(), 0.125);
    state = advanceCosmicQuality(state, 0.015625);
    expect(state).toMatchObject({ slowFor: 0.109375, fastFor: 0.015625 });
    state = advanceCosmicQuality(state, 0.125);
    expect(state).toMatchObject({ slowFor: 0.234375, fastFor: 0 });
    state = frames(state, 20, 0.015625);
    expect(state.slowFor).toBe(0);
  });

  it('restores full quality only after more than 24 accumulated fast-frame seconds', () => {
    const reduced = frames(createCosmicQualityState(), 65, 0.125);
    let state = frames(reduced, 1536, 0.015625);
    expect(state).toMatchObject({ quality: 0.8, fastFor: 24, reflectionSize: 768 });
    state = advanceCosmicQuality(state, 0.03); // Intermediate frame does not erase recovery.
    state = advanceCosmicQuality(state, 0.015625);
    expect(state).toEqual({ quality: 1, slowFor: 0, fastFor: 0, reflectionSize: 1024 });
  });

  it('ignores threshold boundaries, nonpositive deltas and long scheduling gaps', () => {
    const initial: CosmicQualityState = {
      quality: 0.8, slowFor: 1, fastFor: 2, reflectionSize: 768,
    };
    for (const dt of [0, -1, 0.022, 0.034, 0.5, 10, Infinity, NaN]) {
      expect(advanceCosmicQuality(initial, dt)).toEqual(initial);
    }
  });

  it('retains the selected quality and pressure over an unsampled pause and resume', () => {
    let state = frames(createCosmicQualityState(), 65, 0.125);
    state = frames(state, 10, 0.015625);
    const paused = { ...state };
    // stop/hidden/reduced-motion cancel RAF. start resets lastFrame, so the first
    // resumed sample has dt=0 and must not masquerade as a quality restoration.
    expect(advanceCosmicQuality(state, 0)).toEqual(paused);
    expect(paused).toMatchObject({ quality: 0.8, reflectionSize: 768, fastFor: 0.15625 });
    expect(createCosmicQualityState()).toMatchObject({ quality: 1, reflectionSize: 1024 });
  });
});
