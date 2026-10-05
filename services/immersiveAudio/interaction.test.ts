import { describe, expect, it } from 'vitest';
import { IMMERSIVE_SCENE_IDS, resolveImmersiveAudioProfile } from './profiles';
import { normalizeWorldTouch } from './interaction';
import { ACCENT_KINDS } from './types';

describe('world touch boundary', () => {
  const rules = IMMERSIVE_SCENE_IDS.flatMap((id) => Object.entries(resolveImmersiveAudioProfile(id)!.interactions)
    .map(([kind, rule]) => ({ id, kind, rule })));
  it('only returns supported, quiet cues for explicitly mapped tap kinds', () => {
    expect(rules.length).toBeGreaterThan(10);
    for (const { id, kind, rule } of rules) {
      const result = normalizeWorldTouch(id, { phase: 'tap', kind, screenX: 0.3, intensity: 0.7 }, [{ type: rule.source, volume: 0.5 }]);
      expect(result, `${id}/${kind}`).not.toBeNull();
      expect(ACCENT_KINDS).toContain(result!.kind);
      expect(result!.intensity).toBeCloseTo(0.35 * rule.intensity);
      expect(Math.abs(result!.pan)).toBeLessThanOrEqual(0.6);
    }
  });
  it('respects every source slider, mute, removal and ambiguous duplicate state', () => {
    for (const { id, kind, rule } of rules) {
      const event = { phase: 'tap', kind, screenX: 0.5, intensity: 1 };
      for (const volume of [0, -1, NaN, Infinity]) expect(normalizeWorldTouch(id, event, [{ type: rule.source, volume }])).toBeNull();
      expect(normalizeWorldTouch(id, event, [{ type: rule.source, volume: 1, muted: true }])).toBeNull();
      expect(normalizeWorldTouch(id, event, [])).toBeNull();
      expect(normalizeWorldTouch(id, event, [{ type: rule.source, volume: 1 }, { type: rule.source, volume: 0, muted: true }])).toBeNull();
      const low = normalizeWorldTouch(id, event, [{ type: rule.source, volume: 0.1 }]);
      expect(low!.intensity).toBeCloseTo(rule.intensity * 0.1);
    }
  });
  it('rejects malformed/raw events and never interprets drag, cancel or movement as a tap', () => {
    const { id, kind, rule } = rules[0];
    const layers = [{ type: rule.source, volume: 0.5 }];
    for (const event of [null, undefined, kind, {}, { kind, position: [1, 2, 3], strength: 1 },
      ...['drag', 'cancel', 'pointermove', 'pointerdown', 'pointerup'].map((phase) => ({ phase, kind, screenX: 0.5, intensity: 1 })),
      ...[NaN, Infinity, -Infinity, -0.1, 1.01, '0.5', null, undefined].map((screenX) => ({ phase: 'tap', kind, screenX, intensity: 1 })),
      ...[NaN, Infinity, -1, 0, 1.01, '1', null, undefined].map((intensity) => ({ phase: 'tap', kind, screenX: 0.5, intensity })),
    ]) expect(normalizeWorldTouch(id, event, layers)).toBeNull();
  });
  it('rejects protected/unknown scenes and inherited/unknown event kinds', () => {
    const event = { phase: 'tap', kind: rules[0].kind, screenX: 0.5, intensity: 1 };
    const layers = [{ type: rules[0].rule.source, volume: 0.5 }];
    for (const id of ['focus', 'amb:ocean_shore', 'rainy-window', 'oil-sea', 'user:relax', 'RELAX', '__proto__', null, {}]) {
      expect(normalizeWorldTouch(id, event, layers)).toBeNull();
    }
    for (const kind of ['__proto__', 'constructor', 'toString', 'drag', 'unknown']) {
      expect(normalizeWorldTouch(rules[0].id, { ...event, kind }, layers)).toBeNull();
    }
    expect(normalizeWorldTouch(rules[0].id, event, null as never)).toBeNull();
  });
  it('keeps pan bounded at screen edges and preserves input state', () => {
    for (const { id, kind, rule } of rules) {
      const layers = Object.freeze([Object.freeze({ type: rule.source, volume: 1.2, muted: false })]);
      for (const screenX of [0, 0.5, 1]) {
        const event = Object.freeze({ phase: 'tap', kind, screenX, intensity: 1 });
        const result = normalizeWorldTouch(id, event, layers)!;
        expect(Math.abs(result.pan)).toBeLessThanOrEqual(0.6);
        expect(result.intensity).toBe(rule.intensity);
        if (rule.accent === 'soft-resonance') expect(result.pan).toBe(rule.pan);
      }
    }
  });
});
