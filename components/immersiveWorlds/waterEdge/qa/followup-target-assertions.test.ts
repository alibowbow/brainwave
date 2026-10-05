import { describe, expect, it } from 'vitest';
import { validateTargetAudit } from './followup-target-assertions.mjs';

const check = (label: string, type: string, count = 1, complete = true) => ({ label, type, complete, faces: Array(count).fill(complete ? 36053 : 36061) });
const audit = (checks: ReturnType<typeof check>[], extra = {}) => ({ forcedByte: false, colorBufferFloat: true, colorBufferHalfFloat: false, checks, ...extra });
describe('browser audit distinguishes failed probes from invalid selected targets', () => {
  it('accepts advertised-half cube allocation failure followed by a complete six-face byte cube', () => {
    const result = validateTargetAudit(audit([check('valley-reflection-cube', 'half-float', 1, false), check('valley-reflection-cube', 'unsigned-byte', 6), check('valley-refraction-depth', 'unsigned-byte')]), { world: 'summer-valley', mode: 'normal' });
    expect(result.failedProbes).toHaveLength(1);
    expect(result.selectedTargets[0].type).toBe('unsigned-byte');
  });
  it('accepts exact PMREM-format failure before the byte GGX path is rendered', () => {
    const result = validateTargetAudit(audit([check('pmrem-format-preflight-depth', 'half-float', 1, false), check('pebble-byte-sky-cube', 'unsigned-byte', 6), check('pebble-byte-cube-uv', 'unsigned-byte')], { environment: 'byte-ggx-cube-uv' }), { world: 'pebble-shore', mode: 'normal' });
    expect(result.selection).toBe('byte-ggx-cube-uv');
  });
  it('rejects an incomplete byte fallback instead of accepting an earlier advertised capability', () => {
    expect(() => validateTargetAudit(audit([check('valley-reflection-cube', 'half-float', 1, false), check('valley-reflection-cube', 'unsigned-byte', 3, false), check('valley-refraction-depth', 'unsigned-byte')]), { world: 'summer-valley', mode: 'normal' })).toThrow('Final selected target');
  });
  it('rejects a selected cube validated on only one face', () => {
    expect(() => validateTargetAudit(audit([check('valley-reflection-cube', 'unsigned-byte'), check('valley-refraction-depth', 'unsigned-byte')]), { world: 'summer-valley', mode: 'normal' })).toThrow('Final selected target');
  });
  it('rejects an unknown final target type even when a framebuffer was complete', () => {
    expect(() => validateTargetAudit(audit([check('valley-reflection-cube', 'unknown-type', 6), check('valley-refraction-depth', 'unsigned-byte')]), { world: 'summer-valley', mode: 'normal' })).toThrow('unsupported type');
  });
  it('requires output completion even when both PMREM preflights succeeded', () => {
    expect(() => validateTargetAudit(audit([check('pmrem-format-preflight-depth', 'half-float'), check('pmrem-format-preflight-color', 'half-float'), check('pebble-pmrem-output', 'half-float', 1, false)], { environment: 'three-pmrem-half-float' }), { world: 'pebble-shore', mode: 'normal' })).toThrow('Final selected target');
  });
  it('rejects HalfFloat selection without either actual extension', () => {
    expect(() => validateTargetAudit(audit([check('valley-reflection-cube', 'half-float', 6), check('valley-refraction-depth', 'unsigned-byte')], { colorBufferFloat: false }), { world: 'summer-valley', mode: 'normal' })).toThrow('without a permitting');
  });
  it('accepts forced-byte final targets while retaining real supported-extension flags', () => {
    const result = validateTargetAudit(audit([check('valley-reflection-cube', 'unsigned-byte', 6), check('valley-refraction-depth', 'unsigned-byte')], { forcedByte: true }), { world: 'summer-valley', mode: 'byte' });
    expect(result.selectedTargets.every(item => item.type === 'unsigned-byte')).toBe(true);
  });
});
