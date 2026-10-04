import { describe, expect, it } from 'vitest';
import { initialImmersivePresetMix, resolveImmersiveAudioProfile, resolveScenePositions } from './immersiveSessionBridge';
import { IMMERSIVE_SCENE_IDS } from './immersiveAudio/profiles';

describe('reviewed renderer positions stay separate from owner mix recommendations', () => {
  it('corrects only the current scops layer sides without mutating the frozen owner profile', () => {
    const before = resolveImmersiveAudioProfile('nature:scops_night')!;
    const serialized = JSON.stringify(before);
    const input = { sceneId: 'nature:scops_night', origin: 'new-preset', dirty: false, currentLayers: [] };
    const defaults = initialImmersivePresetMix(input);
    const positions = resolveScenePositions('nature:scops_night')!;
    expect(positions).toEqual({ ...before.positions, scops: .20, stream: .75 });
    expect(positions).not.toBe(before.positions);
    expect(Object.isFrozen(positions)).toBe(true);
    expect(before.positions.scops).toBe(.68);
    expect(before.positions.stream).toBe(.25);
    expect(JSON.stringify(resolveImmersiveAudioProfile('nature:scops_night'))).toBe(serialized);
    expect(initialImmersivePresetMix(input)).toEqual(defaults);
    expect(before.interactions).toEqual({});
  });

  it('does not turn a positions lookup into defaults for edited or restored state', () => {
    const currentLayers = [{ type: 'scops' as const, volume: .12, muted: true }, { type: 'stream' as const, volume: .03 }];
    resolveScenePositions('nature:scops_night');
    for (const [origin, dirty] of [['new-preset', true], ['restore', false], ['custom', false]] as const) {
      expect(initialImmersivePresetMix({ sceneId: 'nature:scops_night', origin, dirty, currentLayers })).toBe(currentLayers);
    }
  });

  it('preserves all other admitted profile positions by identity', () => {
    for (const id of IMMERSIVE_SCENE_IDS) {
      if (id === 'nature:scops_night') continue;
      expect(resolveScenePositions(id)).toBe(resolveImmersiveAudioProfile(id)!.positions);
    }
  });

  it.each([undefined, 'focus', 'amb:ocean_shore', 'unknown-world'])('adds no override for protected/unregistered identity %s', id => {
    expect(resolveScenePositions(id)).toBeUndefined();
  });
});
