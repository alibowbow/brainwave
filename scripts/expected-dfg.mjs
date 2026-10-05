import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { getDFGLUT } from 'three/src/renderers/shaders/DFGLUTData.js';
import { HalfFloatType, RGFormat } from 'three/src/constants.js';

export async function readInstalledDfg() {
  const sourcePath = createRequire(import.meta.url).resolve('three/src/renderers/shaders/DFGLUTData.js');
  const source = await readFile(sourcePath);
  const texture = getDFGLUT(), image = texture.image;
  if (!(image.data instanceof Uint16Array) || image.width !== 16 || image.height !== 16 || image.data.length !== 512 || texture.format !== RGFormat || texture.type !== HalfFloatType) throw new Error('Installed Three DFG schema changed; review before classifying any residual');
  const bytes = Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength);
  const sha256 = value => createHash('sha256').update(value).digest('hex');
  return { source: 'three/src/renderers/shaders/DFGLUTData.js', sourceSha256: sha256(source),
    dataSha256: sha256(bytes), width: image.width, height: image.height, elements: image.data.length,
    format: 'RG', type: 'HALF_FLOAT', internalFormat: 'RG16F', byteLength: bytes.length,
    bytes: Array.from(bytes), words: Array.from(image.data) };
}

// Hash the actual recorded CPU source bytes in Node, separately from the
// expected source. Preserve those bytes and all raw handles in the report.
export function attestTextureUploads(sample) {
  for (const context of sample.contexts) {
    const ledger = context.textureLedger;
    if (!ledger) continue;
    for (const texture of ledger.textures) for (const mutation of texture.mutations) {
      if (!mutation.data?.bytes) continue;
      mutation.data.actualUploadSha256 = createHash('sha256').update(Buffer.from(mutation.data.bytes)).digest('hex');
    }
    const actual = ledger.textures.filter(x => ledger.provenDfgIds.includes(x.id)).map(texture => ({
      textureId: texture.id,
      actualUploadSha256: texture.mutations.at(-1)?.data.actualUploadSha256,
      expectedDataSha256: ledger.expected.dataSha256,
      sourceSha256: ledger.expected.sourceSha256,
    }));
    ledger.nodeAttestation = { actual, allHashesMatch: actual.length === 1 && actual.every(x => x.actualUploadSha256 === x.expectedDataSha256) };
    if (!ledger.nodeAttestation.allHashesMatch) ledger.exactDfgOnlyResidual = false;
  }
  return sample;
}
