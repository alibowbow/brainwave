import { explainDfgResidual } from './native-texture-ledger.mjs';

// These are observable JavaScript resource contracts, never physical GPU reclamation.
const cozyIds = new Set(['relax', 'sleep_prep', 'power_nap', 'nature:winter_lodge']);
const explicitLossIds = new Set([
  'amb:morning_forest', 'amb:focus_cafe', 'amb:cosmic', 'meditation', 'nature:womb', 'amb:snowy_night',
  'amb:waterfall_valley', 'amb:cave_meditation', 'nature:deep_sea', 'amb:campfire_night', 'amb:deep_night', 'nature:campfire',
  'amb:night_pond', 'nature:summer_valley', 'nature:pebble_shore', 'nature:tent_rain', 'nature:window_rain', 'nature:monsoon_eaves', 'amb:summer_storm',
  'nature:temple_dawn', 'nature:scops_night', 'nature:rural_summer_night', 'country_morning', 'amb:rainy_forest', 'amb:deep_forest', 'nature:bamboo_grove',
]);

export function sceneDisposalContract(worldId) {
  if (!cozyIds.has(worldId) && !explicitLossIds.has(worldId)) throw new Error(`Cannot classify an unidentified renderer: ${worldId}`);
  return cozyIds.has(worldId) ? 'cozy-explicit-resource-disposal' : 'explicit-context-loss';
}

export function assessSceneDisposal(sample) {
  const contract = sceneDisposalContract(sample.worldId);
  const pending = [];
  const textureAccounting = contract === 'cozy-explicit-resource-disposal'
    ? explainDfgResidual(sample.host?.diagnostics?.memory?.textures, sample.textureLedger) : undefined;
  const exactInternalDfg = !!textureAccounting?.explainedBy;
  if (sample.connected) pending.push('canvas remains connected');
  if (contract === 'explicit-context-loss') {
    if (!sample.lost) pending.push('native context loss not observed');
  } else {
    const host = sample.host;
    if (host?.attempts !== 1 || host?.returned !== 1) pending.push('one real dispose call and return not observed');
    if (host?.error || host?.diagnosticsError) pending.push('dispose or diagnostics failed');
    const diagnostics = host?.diagnostics;
    if (diagnostics?.running !== false) pending.push('owned RAF is not reported stopped');
    const lifetime = diagnostics?.lifetime;
    if (!Number.isInteger(lifetime?.created) || !Number.isInteger(lifetime?.disposed) || !(lifetime.disposed > 0 && lifetime.disposed <= lifetime.created)) pending.push('owner disposal counters are invalid');
    if (diagnostics?.instance !== sample.instance) pending.push('disposed instance identity differs');
    if (diagnostics?.memory?.geometries !== 0) pending.push('owned geometry accounting is not empty');
    if (textureAccounting?.ownerTextureAccountingEmpty !== true) pending.push('owned texture accounting remains unexplained');
    if (!sample.listeners || sample.listeners.active !== 0) pending.push('renderer canvas listeners remain registered');
  }
  return { worldId: sample.worldId, contract, ready: pending.length === 0, pending,
    readyScope: contract === 'cozy-explicit-resource-disposal'
      ? 'Owned scene texture handles and geometry accounting, with actual lifecycle postconditions; not all GL handles or internal renderer/context release.'
      : 'Explicit native context loss and canvas detachment.',
    textureAccounting,
    rendererInternals: contract === 'cozy-explicit-resource-disposal' ? {
      retained: exactInternalDfg ? true : null,
      status: exactInternalDfg ? 'Known internal DFG and four placeholders retained; unresolved.'
        : textureAccounting?.residual === 0 ? 'Not established by a zero Three texture counter.' : 'Unclassified residual; owner gate not accepted.',
      dfgTextureId: textureAccounting?.explainedBy?.textureId ?? null,
      rawLiveTextureIds: sample.textureLedger?.liveIds ?? null,
      placeholderIds: sample.textureLedger?.placeholderIds ?? null,
      contextReferencePath: exactInternalDfg ? 'Identified in installed Three source; browser heap impact not measured.' : 'Not assessed.',
    } : undefined,
    physicalGpuReclamation: 'not measured',
    automaticContextLoss: contract === 'cozy-explicit-resource-disposal' ? (sample.lost ? 'observed' : 'not observed; not required by this renderer') : undefined };
}

// Qualification for separate diagnostics after a FAILED resource gate. This
// never changes assessSceneDisposal.ready or the recorded release deadline.
export function canContinueDfgDiagnostic(sample, prior) {
  if (!Number.isFinite(sample?.documentOrigin) || !Array.isArray(sample?.contexts) || sample.contexts.length === 0) return false;
  const ids = sample.contexts.map(context => context.id);
  if (new Set(ids).size !== ids.length) return false;
  if (prior) {
    if (sample.documentOrigin !== prior.documentOrigin || !Array.isArray(prior.contexts) || ids.length !== prior.contexts.length) return false;
    const priorIds = prior.contexts.map(context => context.id);
    if (new Set(priorIds).size !== priorIds.length || !ids.every(id => priorIds.includes(id))) return false;
  }
  let exactCozyResidual = false;
  const qualified = sample.contexts.every(context => {
    const assessment = assessSceneDisposal(context);
    if (assessment.contract === 'explicit-context-loss') return assessment.ready;
    const explained = assessment.ready && !!assessment.textureAccounting?.explainedBy;
    if (explained) exactCozyResidual = true;
    return explained;
  });
  return qualified && exactCozyResidual;
}

// Check both the sample and the acknowledgement. A blocked event loop must not
// turn an observation delivered after the fixed deadline into a pass.
export function requireReleaseDeadline(startedAt, observedAt, acknowledgedAt, timeoutMs = 20_000) {
  if (![startedAt, observedAt, acknowledgedAt, timeoutMs].every(Number.isFinite) || timeoutMs <= 0 || observedAt < startedAt || acknowledgedAt < observedAt || observedAt - startedAt > timeoutMs || acknowledgedAt - startedAt > timeoutMs) {
    throw new Error(`Actual release deadline exceeded: observed ${observedAt - startedAt}ms, acknowledged ${acknowledgedAt - startedAt}ms, limit ${timeoutMs}ms`);
  }
}

// Serialized by Playwright. Keep self-contained: no imports or closures.
export function sampleSceneDisposal() {
  return { documentOrigin: performance.timeOrigin, observedAt: Date.now(), observedAtMs: performance.now(), contexts: window.__natureVerification.contexts.map(x => {
    let host = null;
    try { host = JSON.parse(x.canvas.dataset.liveSceneDisposal || 'null'); }
    catch { host = { error: 'invalid host disposal record' }; }
    return { id: x.id, worldId: x.worldId ?? null, connected: x.canvas.isConnected,
      instance: Number(x.canvas.dataset.instance), frames: Number(x.canvas.dataset.frames),
      draws: x.draws, lost: x.gl.isContextLost(), host,
      listeners: { active: x.listeners.records.length, added: x.listeners.added, removed: x.listeners.removed },
      glDeletes: { ...x.glDeletes }, textureLedger: x.textureLedger?.snapshot() ?? null, data: { ...x.canvas.dataset }, events: x.events };
  }) };
}
