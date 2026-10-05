import { describe, expect, it } from 'vitest';
import { SOUND_ORDER } from '../../audioOptions';
import { NATURE_SAMPLE_ASSETS, NATURE_SAMPLE_BINDINGS } from '../../audioSamples';
import { SPATIAL } from '../../sceneLayout';
import { AMBIENCE_PRESETS, NATURE_MIXES, PRESETS } from '../../types';
import {
  IMMERSIVE_SCENE_IDS, initialImmersivePresetMix, resolveImmersiveAudioProfile,
  type ImmersiveMixLayer,
} from './profiles';

describe('immersive profiles: explicit scene identities and existing sources', () => {
  it('covers exactly the 30 canonical unprotected catalog IDs', () => {
    const expected = [
      ...PRESETS.filter(preset => preset.id !== 'focus').map(preset => preset.id),
      ...AMBIENCE_PRESETS.filter(preset => preset.id !== 'ocean_shore').map(preset => `amb:${preset.id}`),
      ...NATURE_MIXES.map(preset => `nature:${preset.id}`),
    ].sort();
    expect(expected).toHaveLength(30);
    expect([...IMMERSIVE_SCENE_IDS].sort()).toEqual(expected);
    expect(new Set(IMMERSIVE_SCENE_IDS).size).toBe(30);
    for (const id of expected) expect(resolveImmersiveAudioProfile(id)?.id).toBe(id);
  });

  it.each([
    'focus', 'amb:ocean_shore', 'rainy-window', 'oil-sea', 'ocean_shore',
    'morning_forest', 'nature:unknown', 'unknown', '', ' relax', 'relax ',
    'RELAX', '__proto__', 'constructor', 'toString', null, undefined,
    NaN, Infinity, -1, 30, {}, [], ['relax'], new String('relax'),
  ])('fails closed for noncanonical/protected identity %p', id => {
    expect(resolveImmersiveAudioProfile(id)).toBeNull();
  });

  it('contains only supported finite conservative initial faders and distinct mixes', () => {
    const fingerprints = new Set<string>();
    for (const id of IMMERSIVE_SCENE_IDS) {
      const profile = resolveImmersiveAudioProfile(id)!;
      expect(profile.intent.length).toBeGreaterThan(15);
      expect(profile.initialLayers.length).toBeGreaterThan(0);
      expect(profile.initialLayers.length).toBeLessThanOrEqual(4);
      expect(new Set(profile.initialLayers.map(layer => layer.type)).size).toBe(profile.initialLayers.length);
      for (const layer of profile.initialLayers) {
        expect(SOUND_ORDER).toContain(layer.type);
        expect(layer.type).not.toBe('none');
        expect(Number.isFinite(layer.volume)).toBe(true);
        expect(layer.volume).toBeGreaterThan(0);
        expect(layer.volume).toBeLessThanOrEqual(0.5);
      }
      fingerprints.add(JSON.stringify(profile.initialLayers));
    }
    expect(fingerprints.size).toBe(30);
  });

  it('reports real existing source bindings and silent sample-only failure behavior', () => {
    for (const id of IMMERSIVE_SCENE_IDS) {
      const profile = resolveImmersiveAudioProfile(id)!;
      expect(profile.sources.map(source => source.type)).toEqual(profile.initialLayers.map(layer => layer.type));
      for (const source of profile.sources) {
        const binding = NATURE_SAMPLE_BINDINGS[source.type];
        expect(source.assetIds).toEqual(binding?.assetIds ?? []);
        for (const assetId of source.assetIds) {
          expect(['CC0-1.0', 'user-recorded']).toContain(NATURE_SAMPLE_ASSETS[assetId].license);
        }
        if (binding?.proceduralMix === 0) {
          expect(source.mode).toBe('sample-only');
          expect(source.proceduralFallback).toBe(false);
        } else {
          expect(source.mode).toBe(binding ? 'hybrid' : 'procedural');
          expect(source.proceduralFallback).toBe(true);
        }
      }
    }
    const rural = resolveImmersiveAudioProfile('nature:rural_summer_night')!;
    expect(rural.sources[0]).toEqual({
      type: 'ruralCrickets', mode: 'sample-only', assetIds: ['ruralCrickets'], proceduralFallback: false,
    });
  });

  it('exports normalized X and explicitly separates intended distance from fixed engine depth', () => {
    for (const id of IMMERSIVE_SCENE_IDS) {
      const profile = resolveImmersiveAudioProfile(id)!;
      expect(Object.keys(profile.positions).sort()).toEqual(profile.initialLayers.map(layer => layer.type).sort());
      for (const spatial of profile.spatialGuidance) {
        expect(Number.isFinite(spatial.x)).toBe(true);
        expect(spatial.x).toBeGreaterThanOrEqual(0);
        expect(spatial.x).toBeLessThanOrEqual(1);
        expect(profile.positions[spatial.type]).toBe(spatial.x);
        expect(spatial.engineDepth).toBe(SPATIAL[spatial.type]?.depth ?? 'mid');
        expect(spatial.engineWide).toBe(SPATIAL[spatial.type]?.wide === true);
        expect(spatial.engineLayerPan).toBeGreaterThanOrEqual(-0.6);
        expect(spatial.engineLayerPan).toBeLessThanOrEqual(0.6);
        if (spatial.engineWide) {
          expect(spatial.x).toBe(0.5);
          expect(spatial.engineLayerPan).toBe(0);
        }
      }
    }
    const fall = resolveImmersiveAudioProfile('amb:waterfall_valley')!.spatialGuidance.find(s => s.type === 'waterfall')!;
    expect(fall.intendedDepth).toBe('far');
    expect(fall.engineDepth).toBe('mid');
    expect(fall.x).toBe(0.39);
    expect(fall.engineLayerPan).toBeCloseTo(-0.143);
  });

  it('keeps unsafe existing thunder, whale and repeated-chime layers out of quiet defaults', () => {
    for (const id of IMMERSIVE_SCENE_IDS) {
      const types = resolveImmersiveAudioProfile(id)!.initialLayers.map(layer => layer.type);
      for (const excluded of ['thunder', 'dthunder', 'deepsea', 'temple', 'chimes', 'bowl']) {
        expect(types).not.toContain(excluded);
      }
    }
    expect(resolveImmersiveAudioProfile('nature:deep_sea')!.limitations.join(' ')).toContain('whale');
    expect(resolveImmersiveAudioProfile('amb:summer_storm')!.limitations.join(' ')).toContain('cracks');
    expect(resolveImmersiveAudioProfile('nature:temple_dawn')!.limitations.join(' ')).toContain('moktak');
    const womb = resolveImmersiveAudioProfile('nature:womb')!;
    expect(womb.initialLayers.find(layer => layer.type === 'heartbeat')!.volume).toBeLessThan(0.1);
    expect(womb.initialLayers.find(layer => layer.type === 'brown')!.volume)
      .toBeGreaterThan(womb.initialLayers.find(layer => layer.type === 'heartbeat')!.volume);
    expect(womb.limitations.join(' ')).toContain('transients');
  });

  it('has small bounded source-gated gesture maps and keeps sleep spaces silent', () => {
    const accents = ['water-drop', 'soft-rustle', 'ceramic-touch', 'ember-tick', 'soft-resonance'];
    for (const id of IMMERSIVE_SCENE_IDS) {
      const profile = resolveImmersiveAudioProfile(id)!;
      expect(Object.keys(profile.interactions).length).toBeLessThanOrEqual(2);
      for (const [kind, recommendation] of Object.entries(profile.interactions)) {
        expect(kind).toMatch(/^[a-z]+-touch$/);
        expect(SOUND_ORDER).toContain(recommendation.source);
        expect(recommendation.source).not.toBe('none');
        expect(accents).toContain(recommendation.accent);
        expect(Number.isFinite(recommendation.intensity)).toBe(true);
        expect(recommendation.intensity).toBeGreaterThan(0);
        expect(recommendation.intensity).toBeLessThanOrEqual(0.25);
        expect(Number.isFinite(recommendation.pan)).toBe(true);
        expect(Math.abs(recommendation.pan)).toBeLessThanOrEqual(0.6);
      }
    }
    for (const id of ['sleep_prep', 'power_nap', 'nature:womb', 'nature:deep_sea', 'amb:deep_night']) {
      expect(resolveImmersiveAudioProfile(id)!.interactions).toEqual({});
    }
    const courtyard = resolveImmersiveAudioProfile('meditation')!;
    expect(courtyard.interactions['bowl-touch'].source).toBe('bowl');
    expect(courtyard.initialLayers.some(layer => layer.type === 'bowl')).toBe(false);
  });

  it('cannot have its shared defaults or nested metadata changed by consumers', () => {
    const profile = resolveImmersiveAudioProfile('relax')!;
    expect(Object.isFrozen(IMMERSIVE_SCENE_IDS)).toBe(true);
    expect(Object.isFrozen(profile)).toBe(true);
    for (const collection of [
      profile.initialLayers, profile.positions, profile.spatialGuidance,
      profile.sources, profile.interactions, profile.limitations,
    ]) expect(Object.isFrozen(collection)).toBe(true);
    expect(Object.isFrozen(profile.initialLayers[0])).toBe(true);
    expect(Object.isFrozen(profile.spatialGuidance[0])).toBe(true);
    expect(Object.isFrozen(profile.sources[0].assetIds)).toBe(true);
    expect(Object.isFrozen(profile.interactions['ember-touch'])).toBe(true);
    expect(() => Object.assign(profile.initialLayers[0], { volume: 1 })).toThrow();
    expect(() => Object.assign(profile.positions, { fire: 4 })).toThrow();
  });
});

describe('new-preset initialization preserves existing user state', () => {
  const savedLayers: readonly ImmersiveMixLayer[] = Object.freeze([
    Object.freeze({ type: 'fire', volume: 0.17, muted: true }),
    Object.freeze({ type: 'rain', volume: 1.1, muted: false }),
  ]);

  it.each(['custom', 'restored', 'edited', 'preset', '', undefined, null, true, 1, {}, ['new-preset']])(
    'preserves exact layers and mute flags for origin %p', origin => {
      const result = initialImmersivePresetMix({ sceneId: 'relax', origin, dirty: false, currentLayers: savedLayers });
      expect(result).toBe(savedLayers);
      expect(result[0].muted).toBe(true);
      expect(result[1].volume).toBe(1.1);
    },
  );

  it.each([true, undefined, null, 0, 1, '', 'false', NaN, Infinity, {}, []])(
    'requires literal false dirty flag, rejecting %p', dirty => {
      expect(initialImmersivePresetMix({
        sceneId: 'relax', origin: 'new-preset', dirty, currentLayers: savedLayers,
      })).toBe(savedLayers);
    },
  );

  it.each(['focus', 'amb:ocean_shore', '__proto__', 'country_morning ', undefined, NaN])(
    'never replaces state for protected or unknown identity %p', sceneId => {
      expect(initialImmersivePresetMix({
        sceneId, origin: 'new-preset', dirty: false, currentLayers: savedLayers,
      })).toBe(savedLayers);
    },
  );

  it('returns fresh defaults only for an explicit new pristine preset action', () => {
    for (const sceneId of IMMERSIVE_SCENE_IDS) {
      const input = { sceneId, origin: 'new-preset', dirty: false, currentLayers: savedLayers };
      const first = initialImmersivePresetMix(input);
      const second = initialImmersivePresetMix(input);
      const profile = resolveImmersiveAudioProfile(sceneId)!;
      expect(first).toEqual(profile.initialLayers);
      expect(first).not.toBe(profile.initialLayers);
      expect(first).not.toBe(second);
      expect(first[0]).not.toBe(profile.initialLayers[0]);
      expect(savedLayers[0]).toEqual({ type: 'fire', volume: 0.17, muted: true });
    }
  });

  it('permits independent UI slider state without contaminating future sessions', () => {
    const result = initialImmersivePresetMix({
      sceneId: 'relax', origin: 'new-preset', dirty: false, currentLayers: savedLayers,
    });
    Object.assign(result[0], { volume: 0.9, muted: true });
    expect(resolveImmersiveAudioProfile('relax')!.initialLayers[0]).toEqual({ type: 'fire', volume: 0.38 });
    expect(savedLayers[0]).toEqual({ type: 'fire', volume: 0.17, muted: true });
  });

  it('does not touch non-layer controls or normalize a custom mix behind its UI', () => {
    const state = Object.freeze({
      master: 0.19, binaural: 0.31, bg: 0, muted: true, transport: 'paused', fadeOut: true,
      sceneId: 'relax', origin: 'custom', dirty: false,
      currentLayers: Object.freeze([{ type: 'fire' as const, volume: NaN, muted: true }]),
    });
    expect(initialImmersivePresetMix(state)).toBe(state.currentLayers);
    expect(Number.isNaN(state.currentLayers[0].volume)).toBe(true);
    expect(state).toMatchObject({ master: 0.19, binaural: 0.31, bg: 0, muted: true, transport: 'paused', fadeOut: true });
  });
});
