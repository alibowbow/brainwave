import { HalfFloatType, RGBAFormat, UnsignedByteType } from 'three';
import type { WebGLRenderer } from 'three';
import type { Reflector } from 'three/examples/jsm/objects/Reflector.js';

export interface ReflectorTargetEvidence {
  textureType: 'HalfFloatType' | 'UnsignedByteType';
  internalFormat: 'RGBA16F' | 'RGBA8';
  forcedByte: boolean;
  extensions: { colorBufferFloat: boolean; colorBufferHalfFloat: boolean };
  framebufferComplete: true;
  framebufferStatus: number;
  width: number;
  height: number;
  samples: number;
  attempts: { textureType: 'HalfFloatType' | 'UnsignedByteType'; framebufferStatus: number }[];
}

/**
 * Configure the owned single-sample RGBA bamboo reflector immediately after
 * construction, before it or its texture has been handed to the renderer.
 *
 * Three r186 Reflector constructs a HalfFloat target but does not allocate its
 * storage until setRenderTarget. WebGL2 alone does not make RGBA16F renderable.
 * Both genuine EXT_color_buffer_float and EXT_color_buffer_half_float permit
 * RGBA16F in WebGL2; enable the actual extension before the first allocation.
 * https://registry.khronos.org/webgl/extensions/EXT_color_buffer_half_float/
 *
 * forceByte is an explicit QA option; it never falsifies extension support.
 * Target size, geometry, shader, filtering and reflection rendering are kept.
 */
export function configureReflectorTarget(
  reflector: Pick<Reflector, 'getRenderTarget'>,
  renderer: WebGLRenderer,
  options: { forceByte?: boolean } = {},
): ReflectorTargetEvidence {
  const target = reflector.getRenderTarget();
  if (target.texture.format !== RGBAFormat || target.samples !== 0) {
    throw new Error('LivingWoods reflector compatibility expects its single-sample RGBA target.');
  }
  // has() does not create properties or allocate GL objects. Refuse a late
  // mutation instead of claiming that an already-used target was safe all along.
  if (renderer.properties.has(target) || renderer.properties.has(target.texture)) {
    throw new Error('LivingWoods reflector compatibility must run before target or texture initialization.');
  }
  const gl = renderer.getContext();
  if (gl.isContextLost()) throw new Error('LivingWoods reflector context is lost before initialization.');
  const extensions = {
    colorBufferFloat: gl.getExtension('EXT_color_buffer_float') !== null,
    colorBufferHalfFloat: gl.getExtension('EXT_color_buffer_half_float') !== null,
  };
  const forcedByte = options.forceByte === true;
  const halfFloatSupported = extensions.colorBufferFloat || extensions.colorBufferHalfFloat;
  const choices = !forcedByte && halfFloatSupported ? [HalfFloatType, UnsignedByteType] : [UnsignedByteType];
  const attempts: ReflectorTargetEvidence['attempts'] = [];
  const previousTarget = renderer.getRenderTarget();
  const previousCubeFace = renderer.getActiveCubeFace();
  const previousMipmapLevel = renderer.getActiveMipmapLevel();

  try {
    for (const type of choices) {
      const textureType = type === HalfFloatType ? 'HalfFloatType' : 'UnsignedByteType';
      const internalFormat = type === HalfFloatType ? 'RGBA16F' : 'RGBA8';
      target.texture.type = type;
      // Exact formats avoid r186's automatic half-float format selection asking
      // only for EXT_color_buffer_float on a valid half-float-only implementation.
      target.texture.internalFormat = internalFormat;
      let framebufferStatus: number;
      try {
        // This is the first allocation, using the selected supported type.
        renderer.setRenderTarget(target, 0, 0);
        framebufferStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      } finally {
        // Also restore cube face and mip: restoring just the target resets both.
        renderer.setRenderTarget(previousTarget, previousCubeFace, previousMipmapLevel);
      }
      attempts.push({ textureType, framebufferStatus });
      if (gl.isContextLost()) throw new Error('LivingWoods reflector context was lost during initialization.');
      if (framebufferStatus === gl.FRAMEBUFFER_COMPLETE) {
        return {
          textureType, internalFormat, forcedByte, extensions,
          framebufferComplete: true, framebufferStatus,
          width: target.width, height: target.height, samples: target.samples, attempts,
        };
      }
      if (type === HalfFloatType) {
        // Release the failed allocation before changing its storage type. The
        // same texture object stays bound to the reflection shader's tDiffuse.
        target.dispose();
      }
    }
    const statuses = attempts.map(attempt => `${attempt.textureType}:0x${attempt.framebufferStatus.toString(16)}`).join(', ');
    throw new Error(`LivingWoods reflector framebuffer is incomplete (${statuses}).`);
  } catch (error) {
    // Never retain an incomplete/partially allocated target after a failed init.
    // The prior render target has already been restored by the inner finally.
    target.dispose();
    throw error;
  }
}
