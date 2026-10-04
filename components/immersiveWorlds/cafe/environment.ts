import * as T from 'three';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';

/** The approved RoomEnvironment(.035) prefilter, baked once on a capable GPU.
 * This is a sample-only RGBA16F texture (WebGL2 core), never a color attachment.
 * CubeUV mapping bypasses Three's automatic cube/equirect -> PMREM conversion.
 * Neither runtime path constructs a PMREMGenerator or allocates its hidden RTs.
 */
export async function loadCafeEnvironment() {
  const texture = await new HDRLoader().setDataType(T.HalfFloatType).loadAsync('/immersive-worlds/cafe/room-environment.hdr');
  texture.mapping = T.CubeUVReflectionMapping;
  texture.internalFormat = 'RGBA16F';
  texture.colorSpace = T.LinearSRGBColorSpace;
  texture.flipY = false;
  texture.generateMipmaps = false;
  texture.minFilter = texture.magFilter = T.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
