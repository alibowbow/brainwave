import { describe, expect, it } from 'vitest';
// Node/browser verification helper is kept outside the production import graph.
import { assessSceneDisposal, requireReleaseDeadline, sceneDisposalContract } from '../../scripts/scene-disposal-contract.mjs';

const disposed = () => ({ worldId: 'nature:winter_lodge', connected: false, lost: false, instance: 7,
  listeners: { active: 0 }, host: { attempts: 1, returned: 1,
    diagnostics: { instance: 7, running: false, lifetime: { created: 1, disposed: 1 }, memory: { geometries: 0, textures: 0 } } } });

describe('actual renderer disposal contracts', () => {
  it('requires the real Cozy postconditions without requiring automatic context loss', () => {
    expect(assessSceneDisposal(disposed())).toMatchObject({ ready: true, physicalGpuReclamation: 'not measured', automaticContextLoss: 'not observed; not required by this renderer' });
    expect(assessSceneDisposal(disposed()).rendererInternals.retained).toBe(null);
    expect(assessSceneDisposal(disposed()).readyScope).toContain('not all GL handles');
  });
  it.each(['relax', 'sleep_prep', 'power_nap', 'nature:winter_lodge'])('classifies Cozy %s explicitly', id => {
    expect(sceneDisposalContract(id)).toBe('cozy-explicit-resource-disposal');
  });
  it('retains real context-loss requirement for other renderers', () => {
    expect(assessSceneDisposal({ ...disposed(), worldId: 'nature:rural_summer_night' }).ready).toBe(false);
    expect(assessSceneDisposal({ ...disposed(), worldId: 'nature:rural_summer_night', lost: true }).ready).toBe(true);
  });
  it('does not default an unknown identity to a passing contract', () => {
    expect(() => sceneDisposalContract(null)).toThrow();
    expect(() => sceneDisposalContract('new:unreviewed')).toThrow();
  });
  it.each(['attempt', 'returned', 'running', 'resources', 'listener', 'identity', 'connected', 'diagnostic'])('rejects missing Cozy %s evidence', failure => {
    const sample = disposed();
    if (failure === 'attempt') sample.host.attempts = 0;
    if (failure === 'returned') sample.host.returned = 0;
    if (failure === 'running') sample.host.diagnostics.running = true;
    if (failure === 'resources') sample.host.diagnostics.memory.textures = 1;
    if (failure === 'listener') sample.listeners.active = 1;
    if (failure === 'identity') sample.instance = 8;
    if (failure === 'connected') sample.connected = true;
    if (failure === 'diagnostic') Object.assign(sample.host, { diagnosticsError: 'failed' });
    expect(assessSceneDisposal(sample).ready).toBe(false);
  });
  it('includes retention within 20 seconds and rejects late delivered success', () => {
    expect(() => requireReleaseDeadline(1000, 6000, 6100)).not.toThrow();
    expect(() => requireReleaseDeadline(1000, 21001, 21001)).toThrow();
    expect(() => requireReleaseDeadline(1000, 20000, 21001)).toThrow();
    expect(() => requireReleaseDeadline(1000, NaN, 1100)).toThrow();
    expect(() => requireReleaseDeadline(1000, 1100, Infinity)).toThrow();
    expect(() => requireReleaseDeadline(1000, undefined, 1100)).toThrow();
  });
  it('keeps owner geometry zero mandatory even when texture accounting is empty', () => {
    const sample = disposed(); sample.host.diagnostics.memory.geometries = 1;
    expect(assessSceneDisposal(sample)).toMatchObject({ ready: false, pending: ['owned geometry accounting is not empty'] });
  });
  it.each([1, 2, -1])('rejects unexplained texture counter %s without an exact observed ledger', textures => {
    const sample = disposed(); sample.host.diagnostics.memory.textures = textures;
    expect(assessSceneDisposal(sample)).toMatchObject({ ready: false, pending: ['owned texture accounting remains unexplained'] });
  });
});
