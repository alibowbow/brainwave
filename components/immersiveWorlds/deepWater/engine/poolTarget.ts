import * as THREE from 'three';

// The owned QA harness can choose the conservative path on a capable GPU.
// This never lies about extensions or changes any WebGL/Three method.
const bytePreference = new WeakSet<THREE.WebGLRenderer>();
export function preferBytePoolTargets(renderer: THREE.WebGLRenderer) { bytePreference.add(renderer); }

export function preparePoolTarget(renderer: THREE.WebGLRenderer, target: THREE.WebGLRenderTarget) {
  const gl = renderer.getContext();
  // RGBA16F (not RGB16F), samples=0. Both extensions permit this exact format
  // in WebGL2; WebGL2 alone does not. Enable the actual extension before use.
  const float = !!gl.getExtension('EXT_color_buffer_float');
  const halfFloat = !!gl.getExtension('EXT_color_buffer_half_float');
  const forcedByte = bytePreference.has(renderer);
  const previous = renderer.getRenderTarget();
  const face = renderer.getActiveCubeFace();
  const mip = renderer.getActiveMipmapLevel();
  let fallback = forcedByte ? 'forced-byte' : float || halfFloat ? 'none' : 'missing-color-buffer-extension';
  // Reflector constructs only CPU objects. This runs before its FIRST target
  // bind/allocation or reflection draw; changing type after render is too late.
  target.texture.type = !forcedByte && (float || halfFloat) ? THREE.HalfFloatType : THREE.UnsignedByteType;
  target.texture.format = THREE.RGBAFormat;
  target.texture.internalFormat = target.texture.type === THREE.HalfFloatType ? 'RGBA16F' : 'RGBA8';
  let status: number;
  try {
    renderer.setRenderTarget(target);
    status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE && target.texture.type === THREE.HalfFloatType) {
      // A driver may still reject the advertised configuration. Release its
      // allocated storage before retrying the exact same mirror with RGBA8.
      renderer.setRenderTarget(previous, face, mip);
      target.dispose();
      target.texture.type = THREE.UnsignedByteType;
      target.texture.internalFormat = 'RGBA8';
      fallback = 'incomplete-half-float-framebuffer';
      renderer.setRenderTarget(target);
      status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    }
    if (status !== gl.FRAMEBUFFER_COMPLETE) throw new Error(`DeepWater reflection framebuffer incomplete: ${status}`);
  } finally {
    renderer.setRenderTarget(previous, face, mip);
  }
  const report = { type: target.texture.type === THREE.HalfFloatType ? 'half-float' : 'byte', format: target.texture.internalFormat, float, halfFloat, forcedByte, fallback, status, complete: true };
  renderer.domElement.dataset.poolTarget = JSON.stringify(report);
  return report;
}
