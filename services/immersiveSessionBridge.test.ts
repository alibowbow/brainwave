import { describe, expect, it } from 'vitest';
import { reviewedWorldTouch, worldAccentRequest } from './immersiveSessionBridge';
import type { SoundLayer, SoundPlaybackSnapshot } from './audioEngine';

describe('scene audio conversion fails closed at the actual UI/source boundary', () => {
  const layers: SoundLayer[] = [{ type: 'stream', volume: .5 }, { type: 'forest', volume: .3 }];
  const playing: SoundPlaybackSnapshot = { stream: 'playing', forest: 'playing' };
  const water = { kind: 'water', strength: .4, position: [9000, 0, -9000] };

  it('uses center for world coordinates, and changes source fader through the same current layer array', () => {
    const request = worldAccentRequest('amb:morning_forest', water, layers, playing)!;
    expect(request.pan).toBe(0);
    const quieter = worldAccentRequest('amb:morning_forest', water, [{ type: 'stream', volume: .25 }], playing)!;
    expect(quieter.intensity).toBeCloseTo(request.intensity / 2);
  });

  it.each(['loading', 'error'] as const)('keeps a %s source silent even when another bed plays', (state) => {
    expect(worldAccentRequest('amb:morning_forest', water, layers, { stream: state, forest: 'playing' })).toBeNull();
  });

  it.each([
    [{ type: 'stream', volume: .5, muted: true }],
    [{ type: 'stream', volume: 0 }],
    [{ type: 'stream', volume: NaN }],
    [{ type: 'forest', volume: .5 }],
    [{ type: 'stream', volume: .5 }, { type: 'stream', volume: .1, muted: true }],
  ] as SoundLayer[][])('rejects muted/zero/malformed/absent/duplicate source state: %j', (...values) => {
    // Vitest spreads the array row; reconstruct the layer list.
    expect(worldAccentRequest('amb:morning_forest', water, values, playing)).toBeNull();
  });

  it.each([NaN, Infinity, -1, 0, 1.01])('rejects malformed strength %s instead of normalizing arbitrary input', (strength) => {
    expect(reviewedWorldTouch('amb:morning_forest', { ...water, strength })).toBeNull();
  });

  it('rejects non-tap phase, unrelated actions and protected worlds', () => {
    expect(reviewedWorldTouch('amb:morning_forest', { ...water, phase: 'drag' })).toBeNull();
    expect(reviewedWorldTouch('amb:focus_cafe', 'lamp')).toBeNull();
    expect(reviewedWorldTouch('amb:cosmic', { kind: 'water', strength: .3 })).toBeNull();
    expect(reviewedWorldTouch('focus', water)).toBeNull();
    expect(reviewedWorldTouch('amb:ocean_shore', water)).toBeNull();
  });

  it('does not unlock the optional meditation bowl by inventing a looping source', () => {
    const event = { world: 'meditation', kind: 'bowl', strength: .25, x: 0 };
    expect(worldAccentRequest('meditation', event, layers, playing)).toBeNull();
    expect(layers).toEqual([{ type: 'stream', volume: .5 }, { type: 'forest', volume: .3 }]);
  });

  it('requires the Korean source scene to match the selected canonical world', () => {
    expect(reviewedWorldTouch('nature:temple_dawn', { scene: 'nature:rural_summer_night', type: 'bell', strength: .3 })).toBeNull();
    expect(reviewedWorldTouch('nature:rural_summer_night', { type: 'grass', strength: .3 })).toBeNull();
    expect(reviewedWorldTouch('nature:temple_dawn', { scene: 'nature:temple_dawn', type: 'bell', strength: .3 })).not.toBeNull();
  });

  it('rejects an inconsistent living-woods world/sceneId tuple', () => {
    expect(reviewedWorldTouch('amb:rainy_forest', { world: 'ancient', sceneId: 'amb:rainy_forest', kind: 'leaf-drip', strength: .24 })).toBeNull();
    expect(reviewedWorldTouch('amb:rainy_forest', { world: 'rainy', sceneId: 'amb:rainy_forest', kind: 'leaf-drip', strength: .24 })).not.toBeNull();
  });
});
