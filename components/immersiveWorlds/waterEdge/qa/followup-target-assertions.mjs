/** Validate the chosen usable path, retaining failed capability probes as evidence.
 * An advertised extension is permission to probe, not proof that allocation works.
 */
export function validateTargetAudit(audit, { world, mode }) {
  const demand = (ok, message) => { if (!ok) throw new Error(message); };
  demand(audit && audit.forcedByte === (mode === 'byte') && Array.isArray(audit.checks) && audit.checks.length, 'Missing/mismatched render-target mode audit');
  const checks = audit.checks;
  const selected = [];
  const requireTarget = (label, faces, type) => {
    // Failed half allocation followed by a checked byte allocation is legitimate.
    // The last attempt for this final target must itself be complete.
    const check = checks.filter(item => item.label === label).at(-1);
    demand(check && check.complete && check.faces.length === faces && check.faces.every(status => status === 36053), `Final selected target ${label} is missing/incomplete`);
    demand(['half-float', 'unsigned-byte'].includes(check.type), `Final selected target ${label} has an unsupported type`);
    demand(!type || check.type === type, `Final selected target ${label} has wrong type`);
    demand(mode !== 'byte' || check.type === 'unsigned-byte', `Forced-byte final target ${label} is not unsigned-byte`);
    if (check.type === 'half-float') demand(audit.colorBufferFloat || audit.colorBufferHalfFloat, 'Half-float selected without a permitting color-buffer extension');
    selected.push(check); return check;
  };
  if (world === 'summer-valley') {
    requireTarget('valley-reflection-cube', 6);
    requireTarget('valley-refraction-depth', 1, 'unsigned-byte');
  } else if (world === 'pebble-shore') {
    demand(['three-pmrem-half-float', 'byte-ggx-cube-uv'].includes(audit.environment), 'Unknown shore environment selection');
    if (audit.environment === 'three-pmrem-half-float') {
      demand(mode !== 'byte', 'Forced-byte mode selected PMREM');
      requireTarget('pmrem-format-preflight-depth', 1, 'half-float');
      requireTarget('pmrem-format-preflight-color', 1, 'half-float');
      requireTarget('pebble-pmrem-output', 1, 'half-float');
    } else {
      requireTarget('pebble-byte-sky-cube', 6, 'unsigned-byte');
      requireTarget('pebble-byte-cube-uv', 1, 'unsigned-byte');
    }
  } else throw new Error(`Unexpected audited world ${world}`);
  // Failed probes may be retained only if they explain the selected byte fallback.
  const failedProbes = checks.filter(item => !item.complete);
  for (const failed of failedProbes) {
    const replacedCube = failed.label === 'valley-reflection-cube' && failed.type === 'half-float'
      && selected.some(item => item.label === failed.label && item.type === 'unsigned-byte');
    const pmremProbe = /^pmrem-format-preflight-(depth|color)$/.test(failed.label)
      && failed.type === 'half-float' && audit.environment === 'byte-ggx-cube-uv';
    demand(replacedCube || pmremProbe, `Unresolved failed target ${failed.label}`);
  }
  if (mode === 'byte') demand(checks.every(item => item.type === 'unsigned-byte'), 'Forced-byte path attempted an unnecessary half-float allocation');
  return { status: 'passed', selectedTargets: selected, failedProbes,
    selection: audit.environment || selected[0].type,
    note: 'Final selected targets are complete; discarded failed capability probes do not invalidate a legitimate byte fallback. Actual rendered-frame/no-error checks remain separate mandatory gates.' };
}
