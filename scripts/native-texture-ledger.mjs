// Browser init-script. CPU call observation only; no GL queries, new GL resources,
// readback, fences, context loss, shader injection or texture mutation.
export function installNativeTextureLedger(expected) {
  window.__createNativeTextureLedger = gl => {
    const records = [], byHandle = new Map(), bindings = new Map(), errors = [], calls = {};
    let unit = gl.TEXTURE0, sequence = 0, contextLost = false;
    const unpack = { rowLength: 0, skipRows: 0, skipPixels: 0, imageHeight: 0, skipImages: 0 };
    const targetOf = target => target >= gl.TEXTURE_CUBE_MAP_POSITIVE_X && target <= gl.TEXTURE_CUBE_MAP_NEGATIVE_Z ? gl.TEXTURE_CUBE_MAP : target;
    const keyOf = target => `${unit}:${targetOf(target)}`;
    const problem = message => errors.push({ sequence, message });
    const bound = target => {
      const value = bindings.get(keyOf(target));
      if (!value) { problem(`mutation without observed texture binding on ${keyOf(target)}`); return null; }
      if (value.deleted) problem(`mutation after delete for texture ${value.id}`);
      return value;
    };
    const observe = (name, callback) => {
      if (typeof gl[name] !== 'function') return;
      const original = gl[name];
      gl[name] = function (...args) {
        // Native behavior/return/exception is preserved; observation errors fail
        // the ledger without interrupting rendering or an actual dispose call.
        sequence++; calls[name] = (calls[name] || 0) + 1;
        let result;
        try { result = original.apply(this, args); }
        catch (error) { problem(`${name} native call threw: ${String(error)}`); throw error; }
        try { callback(args, result); } catch (error) { problem(`${name} observer failed: ${String(error)}`); }
        return result;
      };
    };
    const dataMeta = (data, offset = 0, bytesWanted = null) => {
      if (!ArrayBuffer.isView(data)) return { kind: data === null ? 'null' : typeof data };
      const elementBytes = data.BYTES_PER_ELEMENT ?? 1;
      const byteOffset = data.byteOffset + offset * elementBytes;
      const available = data.byteLength - offset * elementBytes;
      const result = { kind: data.constructor.name, elementLength: data.length ?? null, elementBytes, sourceElementOffset: offset, availableBytes: available };
      if (bytesWanted !== null && Number.isInteger(offset) && offset >= 0 && available >= bytesWanted) {
        result.bytes = Array.from(new Uint8Array(data.buffer, byteOffset, bytesWanted));
      }
      return result;
    };
    const upload = (method, a) => {
      const record = bound(a[0]); if (!record) return;
      let value;
      if (method === 'texStorage2D') value = { method, target: a[0], levels: a[1], internalFormat: a[2], width: a[3], height: a[4] };
      else if (method === 'texStorage3D') value = { method, target: a[0], levels: a[1], internalFormat: a[2], width: a[3], height: a[4], depth: a[5] };
      else if (method === 'texImage2D' && a.length >= 9) value = { method, target: a[0], level: a[1], internalFormat: a[2], width: a[3], height: a[4], border: a[5], format: a[6], type: a[7], source: a[8], offset: a[9] ?? 0 };
      else if (method === 'texSubImage2D' && a.length >= 9) value = { method, target: a[0], level: a[1], x: a[2], y: a[3], width: a[4], height: a[5], format: a[6], type: a[7], source: a[8], offset: a[9] ?? 0 };
      else if (method === 'texImage3D' && a.length >= 10) value = { method, target: a[0], level: a[1], internalFormat: a[2], width: a[3], height: a[4], depth: a[5], border: a[6], format: a[7], type: a[8], source: a[9], offset: a[10] ?? 0 };
      else value = { method, target: a[0], unsupportedOverload: true, argumentTypes: a.map(x => x === null ? 'null' : typeof x) };
      value.sequence = sequence; value.unit = unit; value.unpack = { ...unpack };
      if ('source' in value) {
        const candidateDfg = value.width === 16 && value.height === 16 && value.format === gl.RG && value.type === gl.HALF_FLOAT;
        const candidateEmpty = value.width === 1 && value.height === 1 && (value.depth ?? 1) === 1 && value.format === gl.RGBA && value.type === gl.UNSIGNED_BYTE;
        value.data = dataMeta(value.source, value.offset, candidateDfg ? 1024 : candidateEmpty ? 4 : null);
        delete value.source;
      }
      record.mutations.push(value);
    };
    observe('createTexture', (_a, handle) => {
      if (handle === null) { problem('createTexture returned null'); return; }
      if (byHandle.has(handle)) { problem('createTexture reused an observed handle'); return; }
      const record = { id: records.length + 1, createdSequence: sequence, deleted: false, deleteCount: 0, bindings: 0, targets: [], parameters: [], mutations: [] };
      records.push(record); byHandle.set(handle, record);
    });
    observe('activeTexture', a => { unit = a[0]; });
    observe('bindTexture', a => {
      const record = a[1] === null ? null : byHandle.get(a[1]);
      if (a[1] !== null && !record) problem('bindTexture used an unobserved handle');
      bindings.set(keyOf(a[0]), record ?? null);
      if (record) { record.bindings++; if (!record.targets.includes(a[0])) record.targets.push(a[0]); }
    });
    observe('deleteTexture', a => {
      if (a[0] === null) return;
      const record = byHandle.get(a[0]);
      if (!record) { problem('deleteTexture used an unobserved handle'); return; }
      record.deleteCount++; record.deleted = true; record.deletedSequence = sequence;
      for (const [key, value] of bindings) if (value === record) bindings.set(key, null);
    });
    observe('texParameteri', a => { const record = bound(a[0]); if (record) record.parameters.push({ sequence, target: a[0], pname: a[1], value: a[2] }); });
    observe('pixelStorei', a => {
      const names = [[gl.UNPACK_ROW_LENGTH, 'rowLength'], [gl.UNPACK_SKIP_ROWS, 'skipRows'], [gl.UNPACK_SKIP_PIXELS, 'skipPixels'], [gl.UNPACK_IMAGE_HEIGHT, 'imageHeight'], [gl.UNPACK_SKIP_IMAGES, 'skipImages']];
      const match = names.find(([key]) => key !== undefined && a[0] === key); if (match) unpack[match[1]] = a[1];
    });
    for (const method of ['texStorage2D', 'texStorage3D', 'texImage2D', 'texSubImage2D', 'texImage3D']) observe(method, a => upload(method, a));
    // Unsupported writes invalidate a possible exact-data classification. Keep
    // the raw mutation even for owner textures expected to be deleted later.
    for (const method of ['texSubImage3D', 'copyTexImage2D', 'copyTexSubImage2D', 'copyTexSubImage3D', 'compressedTexImage2D', 'compressedTexSubImage2D', 'compressedTexImage3D', 'compressedTexSubImage3D', 'generateMipmap']) {
      observe(method, a => { const record = bound(a[0]); if (record) record.mutations.push({ method, sequence, target: a[0], unsupportedWrite: true }); });
    }
    // A render attachment can subsequently change texture contents without a
    // CPU upload. Disqualify it conservatively without querying the framebuffer.
    for (const method of ['framebufferTexture2D', 'framebufferTextureLayer']) observe(method, a => {
      const handle = a[method === 'framebufferTexture2D' ? 3 : 2]; if (handle === null) return;
      const record = byHandle.get(handle);
      if (!record) { problem(`${method} used an unobserved texture`); return; }
      record.mutations.push({ method, sequence, framebufferTarget: a[0], attachment: a[1], unsupportedWrite: true });
    });
    const expectedValid = expected?.width === 16 && expected?.height === 16 && expected?.elements === 512 && expected?.bytes?.length === 1024 && typeof expected?.dataSha256 === 'string';
    if (!expectedValid) problem('invalid expected DFG descriptor');
    const zeroUnpack = x => x && Object.values(x).every(value => value === 0);
    const exactBytes = bytes => expectedValid && bytes?.length === expected.bytes.length && bytes.every((value, index) => value === expected.bytes[index]);
    const isDfg = record => {
      if (record.targets.length !== 1 || record.targets[0] !== gl.TEXTURE_2D) return false;
      const writes = record.mutations;
      const data = writes.at(-1);
      const storagePath = writes.length === 2 && writes[0].method === 'texStorage2D' && writes[0].levels === 1 && writes[0].internalFormat === gl.RG16F && writes[0].width === 16 && writes[0].height === 16 && data.method === 'texSubImage2D' && data.x === 0 && data.y === 0;
      const imagePath = writes.length === 1 && data.method === 'texImage2D' && data.internalFormat === gl.RG16F && data.border === 0;
      return (storagePath || imagePath) && data.target === gl.TEXTURE_2D && data.level === 0 && data.width === 16 && data.height === 16 && data.format === gl.RG && data.type === gl.HALF_FLOAT && zeroUnpack(data.unpack) && data.data?.kind === 'Uint16Array' && data.data.elementLength === 512 && data.data.sourceElementOffset === 0 && data.data.availableBytes === 1024 && exactBytes(data.data.bytes);
    };
    const placeholderType = (record, index) => {
      const targets = [gl.TEXTURE_2D, gl.TEXTURE_CUBE_MAP, gl.TEXTURE_2D_ARRAY, gl.TEXTURE_3D];
      const target = targets[index]; if (index > 3 || record.id !== index + 1 || record.targets.length !== 1 || record.targets[0] !== target) return null;
      if (record.parameters.length !== 2 || ![[gl.TEXTURE_MIN_FILTER, gl.NEAREST], [gl.TEXTURE_MAG_FILTER, gl.NEAREST]].every(([pname, value]) => record.parameters.some(x => x.target === target && x.pname === pname && x.value === value))) return null;
      const writes = record.mutations; if (writes.length !== (index === 1 ? 6 : 1)) return null;
      if (!writes.every((x, face) => x.method === (index >= 2 ? 'texImage3D' : 'texImage2D') && x.target === (index === 1 ? gl.TEXTURE_CUBE_MAP_POSITIVE_X + face : target) && x.level === 0 && x.width === 1 && x.height === 1 && (index < 2 || x.depth === 1) && x.border === 0 && x.internalFormat === gl.RGBA && x.format === gl.RGBA && x.type === gl.UNSIGNED_BYTE && zeroUnpack(x.unpack) && x.data?.kind === 'Uint8Array' && x.data.elementLength === 4 && x.data.sourceElementOffset === 0 && x.data.bytes?.length === 4 && x.data.bytes.every(value => value === 0))) return null;
      return ['2D', 'cube-six-faces', '2D-array', '3D'][index];
    };
    return {
      noteContextLost() { contextLost = true; },
      snapshot() {
        const placeholders = records.slice(0, 4).map(placeholderType);
        const prefixComplete = placeholders.length === 4 && placeholders.every(Boolean) && records.slice(0, 3).every((record, index) => record.mutations.at(-1)?.sequence < records[index + 1].createdSequence);
        const textures = records.map((record, index) => ({ ...record, classification: prefixComplete && index < 4 ? `three-state-placeholder:${placeholders[index]}` : isDfg(record) ? 'exact-installed-three-dfg-cpu-upload' : 'unclassified' }));
        const live = textures.filter(x => !x.deleted);
        const provenDfg = live.filter(x => x.classification === 'exact-installed-three-dfg-cpu-upload');
        const unknown = live.filter(x => x.classification === 'unclassified');
        const placeholderIds = live.filter(x => x.classification.startsWith('three-state-placeholder:')).map(x => x.id);
        const complete = expectedValid && errors.length === 0 && !contextLost && prefixComplete;
        return JSON.parse(JSON.stringify({ schema: 1, initializedBeforeFirstObservedCreate: records[0]?.createdSequence === 1,
          expected: { ...expected, bytes: undefined }, calls, errors, contextLost, complete, textures,
          liveIds: live.map(x => x.id), placeholderIds, provenDfgIds: provenDfg.map(x => x.id), unclassifiedLiveIds: unknown.map(x => x.id),
          exactDfgOnlyResidual: complete && placeholderIds.length === 4 && provenDfg.length === 1 && unknown.length === 0 && live.length === 5,
          proofScope: 'Native CPU upload arguments and live handle accounting; no GPU texture readback or physical reclamation measurement.' }));
      },
    };
  };
}

// No numeric allowance: exactly one independently identified upload, the full
// four-texture constructor prefix, and no other live handles must explain info=1.
export function explainDfgResidual(textureCount, ledger) {
  if (textureCount === 0) return { ownerTextureAccountingEmpty: true, residual: 0, internalRetention: 'not assessed by a zero Three counter', explanation: 'Three texture accounting empty' };
  const explained = textureCount === 1 && ledger?.complete === true && ledger?.exactDfgOnlyResidual === true && ledger?.nodeAttestation?.allHashesMatch === true && ledger?.provenDfgIds?.length === 1 && ledger?.unclassifiedLiveIds?.length === 0;
  return { ownerTextureAccountingEmpty: explained, residual: textureCount,
    internalRetention: explained ? 'unresolved: DFG raw handle and renderer-internal placeholders remain; this does not establish renderer-internal release' : 'unresolved',
    explainedBy: explained ? { textureId: ledger.provenDfgIds[0], dataSha256: ledger.expected.dataSha256, sourceSha256: ledger.expected.sourceSha256 } : null,
    explanation: explained ? 'One retained renderer-internal DFG upload, byte-exact to installed Three; owner texture accounting remainder is zero. This establishes only owner texture accounting, not renderer-internal or physical GPU release.' : 'Unexplained texture accounting remains; no subtraction allowed.' };
}
