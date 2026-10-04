import * as THREE from 'three';

export interface CosmicColorBufferSupport {
  float: boolean;
  halfFloat: boolean;
}
export type CosmicReflectionMode = 'auto' | 'byte';

/** RGBA16F needs a color-buffer extension even in WebGL2. Never infer it from WebGL2 alone. */
export function readCosmicColorBufferSupport(gl: WebGL2RenderingContext): CosmicColorBufferSupport {
  return {
    float: gl.getExtension('EXT_color_buffer_float') !== null,
    halfFloat: gl.getExtension('EXT_color_buffer_half_float') !== null,
  };
}

export function cosmicReflectionType(support: CosmicColorBufferSupport, mode: CosmicReflectionMode = 'auto') {
  return mode !== 'byte' && (support.float || support.halfFloat) ? THREE.HalfFloatType : THREE.UnsignedByteType;
}

/** This only binds a target to allocate/check it; it never draws or changes GL extension claims. */
export function inspectCosmicFramebuffer(renderer: THREE.WebGLRenderer, target: THREE.WebGLRenderTarget) {
  const previous = renderer.getRenderTarget();
  const face = renderer.getActiveCubeFace();
  const mip = renderer.getActiveMipmapLevel();
  // Cosmic and Three r186 use WebGL2; @types/three retains the older union.
  const gl = renderer.getContext() as WebGL2RenderingContext;
  try {
    renderer.setRenderTarget(target, 0, 0);
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    const componentType = status === gl.FRAMEBUFFER_COMPLETE
      ? gl.getFramebufferAttachmentParameter(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE) as number
      : null;
    return { status, complete: status === gl.FRAMEBUFFER_COMPLETE, componentType };
  } finally {
    renderer.setRenderTarget(previous, face, mip);
  }
}

/**
 * Call immediately after constructing Reflector, before compile/render/initRenderTarget.
 * Its r186 constructor creates only a JS HalfFloat target; changing type here precedes
 * the first GPU allocation. The existing reflected scene and geometry stay intact.
 * The caller (Reflector) owns disposal of the target.
 */
export function prepareCosmicReflection(
  renderer: THREE.WebGLRenderer,
  target: THREE.WebGLRenderTarget,
  mode: CosmicReflectionMode = 'auto',
) {
  const support = readCosmicColorBufferSupport(renderer.getContext() as WebGL2RenderingContext);
  const attempts: { format: string; status: number; complete: boolean; componentType: number | null }[] = [];
  let reason = mode === 'byte' ? 'forced-byte-validation' : support.float || support.halfFloat ? 'supported-half-float' : 'no-color-buffer-extension';
  const configure = (type: typeof THREE.HalfFloatType | typeof THREE.UnsignedByteType) => {
    target.texture.type = type;
    target.texture.format = THREE.RGBAFormat;
    // Explicit sized formats also avoid Three's generic internal-format helper
    // requesting EXT_color_buffer_float on a valid half-float-only device.
    target.texture.internalFormat = type === THREE.HalfFloatType ? 'RGBA16F' : 'RGBA8';
    target.texture.colorSpace = THREE.NoColorSpace;
    target.samples = 0; // Matches this garden's original non-MSAA reflection target.
  };
  configure(cosmicReflectionType(support, mode));
  const verify = () => {
    let result = inspectCosmicFramebuffer(renderer, target);
    attempts.push({ format: target.texture.internalFormat!, ...result });
    if (!result.complete && target.texture.type === THREE.HalfFloatType) {
      // Dispose the incomplete allocation before reconfiguring, never mutate a live attachment.
      target.dispose();
      configure(THREE.UnsignedByteType);
      reason = 'half-float-framebuffer-incomplete';
      result = inspectCosmicFramebuffer(renderer, target);
      attempts.push({ format: target.texture.internalFormat!, ...result });
    }
    if (!result.complete) throw new Error(`Cosmic reflection framebuffer incomplete: 0x${result.status.toString(16)}`);
  };
  verify();
  return {
    setSize(size: number) {
      if (target.width === size && target.height === size) return;
      target.setSize(size, size);
      verify();
    },
    getDiagnostics() {
      const last = attempts[attempts.length - 1];
      return {
        mode, support: { ...support }, reason,
        format: target.texture.internalFormat, type: target.texture.type,
        width: target.width, height: target.height,
        framebufferComplete: last.complete, framebufferStatus: last.status,
        componentType: last.componentType, attempts: attempts.map(a => ({ ...a })),
      };
    },
  };
}
