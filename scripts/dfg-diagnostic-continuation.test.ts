import { describe, expect, it } from 'vitest';
import { assessSceneDisposal, canContinueDfgDiagnostic } from './scene-disposal-contract.mjs';

// Policy fixtures only. Actual native upload identity has separate ledger tests
// and remains an actual-App diagnostic requirement.
const retired = () => ({ id: 7, worldId: 'nature:winter_lodge', connected: false, lost: false, instance: 7,
  listeners: { active: 0 }, host: { attempts: 1, returned: 1,
    diagnostics: { instance: 7, running: false, lifetime: { created: 1, disposed: 1 }, memory: { geometries: 0, textures: 1 } } },
  textureLedger: { complete: true, exactDfgOnlyResidual: true, nodeAttestation: { allHashesMatch: true },
    provenDfgIds: [5], unclassifiedLiveIds: [], expected: { dataSha256: 'unit-upload-hash', sourceSha256: 'unit-source-hash' } } });
const sample = () => ({ documentOrigin: 1000, contexts: [retired()] });

describe('separate diagnostics preserve any original failed release check', () => {
  it('allows exact owner retirement while retaining explicit unresolved internal state', () => {
    const before = sample(), after = structuredClone(before);
    expect(canContinueDfgDiagnostic(before)).toBe(true);
    expect(canContinueDfgDiagnostic(after, before)).toBe(true);
    expect(assessSceneDisposal(before.contexts[0]).ready).toBe(true);
    expect(assessSceneDisposal(before.contexts[0]).rendererInternals.retained).toBe(true);
    expect(assessSceneDisposal(after.contexts[0]).ready).toBe(true);
  });
  it('never explains a nonzero geometry count with a texture-only DFG proof', () => {
    const before = sample(); before.contexts[0].host.diagnostics.memory.geometries = 1;
    expect(assessSceneDisposal(before.contexts[0]).pending).toEqual(['owned geometry accounting is not empty']);
    expect(canContinueDfgDiagnostic(before)).toBe(false);
  });
  it.each(['geometry', 'texture', 'listener', 'connected', 'running', 'return'] as const)('rechecks %s retirement after the quiet interval', change => {
    const before = sample(), after = structuredClone(before), current = after.contexts[0];
    if (change === 'geometry') current.host.diagnostics.memory.geometries = 1;
    if (change === 'texture') current.textureLedger.exactDfgOnlyResidual = false;
    if (change === 'listener') current.listeners.active = 1;
    if (change === 'connected') current.connected = true;
    if (change === 'running') current.host.diagnostics.running = true;
    if (change === 'return') current.host.returned = 2;
    expect(canContinueDfgDiagnostic(before)).toBe(true);
    expect(canContinueDfgDiagnostic(after, before)).toBe(false);
  });
  it('requires the same document and exact context ID set after quiet', () => {
    const before = sample();
    const differentDocument = sample(); differentDocument.documentOrigin++;
    const replacement = sample(); replacement.contexts[0].id++;
    const additional = sample(); additional.contexts.push({ ...retired(), id: 8 });
    const missing = sample(); missing.contexts = [];
    for (const after of [differentDocument, replacement, additional, missing]) expect(canContinueDfgDiagnostic(after, before)).toBe(false);
  });
  it('still requires actual context loss and detach for every non-Cozy renderer', () => {
    const before = sample(); before.contexts.push({ ...retired(), id: 8, worldId: 'nature:rural_summer_night', lost: true });
    expect(canContinueDfgDiagnostic(before)).toBe(true);
    const after = structuredClone(before); after.contexts[1].lost = false;
    expect(canContinueDfgDiagnostic(after, before)).toBe(false);
    after.contexts[1].lost = true; after.contexts[1].connected = true;
    expect(canContinueDfgDiagnostic(after, before)).toBe(false);
  });
  it('cannot continue unrelated failures with no exact Cozy residual present', () => {
    const noCozy = sample(); noCozy.contexts[0].worldId = 'nature:rural_summer_night'; noCozy.contexts[0].lost = true;
    expect(canContinueDfgDiagnostic(noCozy)).toBe(false);
    expect(canContinueDfgDiagnostic(undefined)).toBe(false);
  });
});
