import { test } from 'vitest';
import assert from 'node:assert/strict';
import { installNativeTextureLedger, explainDfgResidual } from './native-texture-ledger.mjs';
import { readInstalledDfg, attestTextureUploads } from './expected-dfg.mjs';
import { assessSceneDisposal } from './scene-disposal-contract.mjs';

const expected = await readInstalledDfg();
const fixture = () => {
  const calls: Array<{ name: string; args?: unknown[]; handle?: object }> = [], nativeFailure: { method: string | null; error: Error | null } = { method: null, error: null }, gl: Record<string, any> = { TEXTURE0: 33984, TEXTURE_2D: 3553, TEXTURE_CUBE_MAP: 34067, TEXTURE_CUBE_MAP_POSITIVE_X: 34069, TEXTURE_CUBE_MAP_NEGATIVE_Z: 34074,
    TEXTURE_2D_ARRAY: 35866, TEXTURE_3D: 32879, TEXTURE_MIN_FILTER: 10241, TEXTURE_MAG_FILTER: 10240, NEAREST: 9728, RG: 33319, RG16F: 33327, RGBA: 6408, HALF_FLOAT: 5131, UNSIGNED_BYTE: 5121,
    UNPACK_ROW_LENGTH: 3314, UNPACK_SKIP_ROWS: 3315, UNPACK_SKIP_PIXELS: 3316, UNPACK_IMAGE_HEIGHT: 32878, UNPACK_SKIP_IMAGES: 32877 };
  for (const name of ['activeTexture', 'bindTexture', 'deleteTexture', 'texParameteri', 'pixelStorei', 'texStorage2D', 'texStorage3D', 'texImage2D', 'texSubImage2D', 'texImage3D', 'texSubImage3D', 'copyTexImage2D', 'copyTexSubImage2D', 'copyTexSubImage3D', 'compressedTexImage2D', 'compressedTexSubImage2D', 'compressedTexImage3D', 'compressedTexSubImage3D', 'generateMipmap', 'framebufferTexture2D', 'framebufferTextureLayer']) gl[name] = (...args) => { calls.push({ name, args }); if (nativeFailure.method === name) throw nativeFailure.error; return `${name}:native`; };
  gl.createTexture = () => { const handle = {}; calls.push({ name: 'createTexture', handle }); return handle; };
  globalThis.window = {} as Window & typeof globalThis;
  installNativeTextureLedger(expected);
  const ledger = (window as unknown as { __createNativeTextureLedger: (context: unknown) => { snapshot(): any; noteContextLost(): void } }).__createNativeTextureLedger(gl);
  const placeholders = () => [gl.TEXTURE_2D, gl.TEXTURE_CUBE_MAP, gl.TEXTURE_2D_ARRAY, gl.TEXTURE_3D].map((target, index) => {
    const handle = gl.createTexture(); gl.bindTexture(target, handle);
    gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    for (let face = 0; face < (index === 1 ? 6 : 1); face++) {
      if (index >= 2) gl.texImage3D(target, 0, gl.RGBA, 1, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
      else gl.texImage2D(index === 1 ? gl.TEXTURE_CUBE_MAP_POSITIVE_X + face : target, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
    }
    return handle;
  });
  const dfg = ({ data = new Uint16Array(expected.words), image = false } = {}) => {
    const handle = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + 3); gl.bindTexture(gl.TEXTURE_2D, handle);
    if (image) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG16F, 16, 16, 0, gl.RG, gl.HALF_FLOAT, data);
    else { gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RG16F, 16, 16); gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 16, 16, gl.RG, gl.HALF_FLOAT, data); }
    return handle;
  };
  const report = (count: number) => { const sample = attestTextureUploads({ contexts: [{ textureLedger: ledger.snapshot() }] }); const value = sample.contexts[0].textureLedger; return { value, explanation: explainDfgResidual(count, value) }; };
  return { gl, calls, ledger, placeholders, dfg, report, nativeFailure };
};

test('installed expected data are 512 half-float words; source and actual bytes have separate SHA256', () => {
  assert.equal(expected.elements, 512); assert.equal(expected.byteLength, 1024);
  assert.equal(expected.dataSha256, 'b41ba8e2bd29fa007dfbf034d4d58b853f378062183847846b1f6d228f2c7e79');
  assert.match(expected.sourceSha256, /^[0-9a-f]{64}$/);
});
test('exact constructor placeholders + one actual upload explains only owner accounting, never overall internal release', () => {
  const f = fixture(); f.placeholders(); f.dfg();
  const { value, explanation } = f.report(1);
  assert.equal(value.textures.length, 5); assert.deepEqual(value.placeholderIds, [1, 2, 3, 4]); assert.deepEqual(value.provenDfgIds, [5]);
  assert.equal(value.textures[1].mutations.length, 6);
  assert.equal(value.textures[4].mutations[1].data.actualUploadSha256, expected.dataSha256);
  assert.equal(explanation.ownerTextureAccountingEmpty, true); assert.match(explanation.internalRetention, /unresolved/);
});
test('direct texImage2D CPU upload path also requires exact data and internal format', () => {
  const f = fixture(); f.placeholders(); f.dfg({ image: true }); assert.equal(f.report(1).explanation.ownerTextureAccountingEmpty, true);
});
test('one-word mismatch cannot use residual=1 as an allowance', () => {
  const f = fixture(); f.placeholders(); const data = new Uint16Array(expected.words); data[301] ^= 1; f.dfg({ data });
  assert.equal(f.report(1).explanation.ownerTextureAccountingEmpty, false); assert.deepEqual(f.report(1).value.unclassifiedLiveIds, [5]);
});
test('extra live owner handle fails even with a byte-exact DFG; its actual deletion clears only that ambiguity', () => {
  const f = fixture(); f.placeholders(); f.dfg(); const owner = f.gl.createTexture();
  assert.equal(f.report(1).explanation.ownerTextureAccountingEmpty, false);
  f.gl.deleteTexture(owner); assert.equal(f.report(1).explanation.ownerTextureAccountingEmpty, true);
  assert.equal(f.report(2).explanation.ownerTextureAccountingEmpty, false);
  assert.equal(f.report(1).value.textures.length, 6); // Keep deleted records too.
});
test('two matching DFGs, deleted DFG, missing Node attestation and context loss cannot explain one residual', () => {
  const f = fixture(); f.placeholders(); const first = f.dfg(); const second = f.dfg();
  assert.equal(f.report(1).explanation.ownerTextureAccountingEmpty, false);
  f.gl.deleteTexture(second); assert.equal(explainDfgResidual(1, f.ledger.snapshot()).ownerTextureAccountingEmpty, false);
  f.gl.deleteTexture(first); assert.equal(f.report(1).explanation.ownerTextureAccountingEmpty, false);
  const g = fixture(); g.placeholders(); g.dfg(); g.ledger.noteContextLost(); assert.equal(g.report(1).explanation.ownerTextureAccountingEmpty, false);
});
test('a later overwrite or unsupported write invalidates a prior exact upload', () => {
  for (const overwrite of [gl => gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 16, 16, gl.RG, gl.HALF_FLOAT, new Uint16Array(512)), gl => gl.copyTexSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 0, 0, 1, 1)]) {
    const f = fixture(); f.placeholders(); f.dfg(); overwrite(f.gl); assert.equal(f.report(1).explanation.ownerTextureAccountingEmpty, false);
  }
});
test('unknown handle binding is ledger failure rather than a skipped record', () => {
  const f = fixture(); f.placeholders(); f.dfg(); f.gl.bindTexture(f.gl.TEXTURE_2D, {});
  assert.equal(f.report(1).value.complete, false); assert.equal(f.report(1).explanation.ownerTextureAccountingEmpty, false);
});
test('placeholder signature requires all four ordered initial allocations and six cube faces, not arbitrary 1x1 texture', () => {
  const f = fixture(); const extra = f.gl.createTexture(); f.gl.deleteTexture(extra); f.placeholders(); f.dfg();
  assert.equal(f.report(1).value.complete, false); assert.equal(f.report(1).explanation.ownerTextureAccountingEmpty, false);
  const g = fixture(); const p = g.placeholders(); g.dfg(); g.gl.bindTexture(g.gl.TEXTURE_CUBE_MAP, p[1]); g.gl.texImage2D(g.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.gl.RGBA, 1, 1, 0, g.gl.RGBA, g.gl.UNSIGNED_BYTE, new Uint8Array(4));
  assert.equal(g.report(1).explanation.ownerTextureAccountingEmpty, false);
});
test('per-unit binding attributes upload to correct handle and snapshots do not alias future data', () => {
  const f = fixture(); f.placeholders(); const handle = f.dfg(); const initial = f.report(1).value;
  f.gl.activeTexture(f.gl.TEXTURE0); const owner = f.gl.createTexture(); f.gl.bindTexture(f.gl.TEXTURE_2D, owner);
  f.gl.activeTexture(f.gl.TEXTURE0 + 3); f.gl.texSubImage2D(f.gl.TEXTURE_2D, 0, 0, 0, 16, 16, f.gl.RG, f.gl.HALF_FLOAT, new Uint16Array(512));
  assert.equal(initial.textures[4].mutations.length, 2); assert.equal(f.ledger.snapshot().textures[4].mutations.length, 3);
  f.gl.deleteTexture(handle); assert.equal(f.ledger.snapshot().textures[4].deleted, true);
});
test('observer forwards native return values and does not mutate submitted CPU arrays', () => {
  const f = fixture(); f.placeholders(); const data = new Uint16Array(expected.words), before = Array.from(data); f.dfg({ data });
  assert.deepEqual(Array.from(data), before); assert.equal(f.gl.activeTexture(f.gl.TEXTURE0), 'activeTexture:native');
  assert.equal(f.calls.filter(x => x.name === 'createTexture').length, 5);
});
test('byte-exact native DFG evidence satisfies only the owned-resource gate with internal retention explicit', () => {
  const f = fixture(); f.placeholders(); f.dfg(); const { value } = f.report(1);
  const result = assessSceneDisposal({ worldId: 'nature:winter_lodge', connected: false, lost: false, instance: 1,
    listeners: { active: 0 }, textureLedger: value, host: { attempts: 1, returned: 1,
      diagnostics: { running: false, instance: 1, lifetime: { created: 1, disposed: 1 }, memory: { geometries: 0, textures: 1 } } } });
  assert.equal(result.textureAccounting.ownerTextureAccountingEmpty, true); assert.equal(result.ready, true);
  assert.equal(result.rendererInternals.retained, true); assert.deepEqual(result.rendererInternals.rawLiveTextureIds, [1, 2, 3, 4, 5]);
  assert.equal(result.physicalGpuReclamation, 'not measured');
  assert.deepEqual(result.pending, []);
});
test('the actual owner assessment rejects any extra live handle even beside a proven DFG', () => {
  const f = fixture(); f.placeholders(); f.dfg(); const owner = f.gl.createTexture();
  const assess = () => assessSceneDisposal({ worldId: 'nature:winter_lodge', connected: false, lost: false, instance: 1,
    listeners: { active: 0 }, textureLedger: f.report(1).value, host: { attempts: 1, returned: 1,
      diagnostics: { running: false, instance: 1, lifetime: { created: 1, disposed: 1 }, memory: { geometries: 0, textures: 1 } } } });
  assert.equal(assess().ready, false);
  f.gl.deleteTexture(owner); assert.equal(assess().ready, true);
});
test('exact DFG cannot excuse nonzero geometry or an incomplete real dispose return', () => {
  const f = fixture(); f.placeholders(); f.dfg();
  const sample = { worldId: 'nature:winter_lodge', connected: false, lost: false, instance: 1,
    listeners: { active: 0 }, textureLedger: f.report(1).value, host: { attempts: 1, returned: 1,
      diagnostics: { running: false, instance: 1, lifetime: { created: 1, disposed: 1 }, memory: { geometries: 1, textures: 1 } } } };
  assert.equal(assessSceneDisposal(sample).ready, false);
  sample.host.diagnostics.memory.geometries = 0; sample.host.returned = 0;
  assert.equal(assessSceneDisposal(sample).ready, false);
});
test('native throws retain exact exception identity, count the attempt and invalidate ledger completeness', () => {
  const f = fixture(); f.placeholders(); f.dfg(); const error = new Error('native failure');
  f.nativeFailure.method = 'texSubImage2D'; f.nativeFailure.error = error;
  assert.throws(() => f.gl.texSubImage2D(f.gl.TEXTURE_2D, 0, 0, 0, 16, 16, f.gl.RG, f.gl.HALF_FLOAT, new Uint16Array(expected.words)), value => value === error);
  assert.equal(f.report(1).value.calls.texSubImage2D, 2); assert.equal(f.report(1).value.complete, false);
  assert.equal(f.report(1).explanation.ownerTextureAccountingEmpty, false);
});
test('framebuffer attachment disqualifies historical CPU-upload identity without GPU reads', () => {
  for (const attach of [(gl, texture) => gl.framebufferTexture2D(36160, 36064, gl.TEXTURE_2D, texture, 0), (gl, texture) => gl.framebufferTextureLayer(36160, 36064, texture, 0, 0)]) {
    const f = fixture(); f.placeholders(); const handle = f.dfg(); attach(f.gl, handle);
    assert.equal(f.report(1).explanation.ownerTextureAccountingEmpty, false);
  }
});
