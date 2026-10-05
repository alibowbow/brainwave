import * as T from 'three';
import type { Reflector } from 'three/examples/jsm/objects/Reflector.js';

export type CafeTargetPreference = 'auto' | 'byte';
export type CafeTargetType = typeof T.HalfFloatType | typeof T.UnsignedByteType;

export function cafeTargetState(renderer: T.WebGLRenderer) {
  return { target: renderer.getRenderTarget(), face: renderer.getActiveCubeFace(), mip: renderer.getActiveMipmapLevel() };
}

export function restoreCafeTargetState(renderer: T.WebGLRenderer, saved: ReturnType<typeof cafeTargetState>) {
  if (renderer.getRenderTarget() !== saved.target || renderer.getActiveCubeFace() !== saved.face || renderer.getActiveMipmapLevel() !== saved.mip) {
    renderer.setRenderTarget(saved.target, saved.face, saved.mip);
  }
}

/** Keep the public renderer target state intact, including exceptional exits. */
export function withCafeTargetState<R>(renderer: T.WebGLRenderer, work: () => R): R {
  const saved = cafeTargetState(renderer);
  try { return work(); } finally { restoreCafeTargetState(renderer, saved); }
}

export function cafeFramebuffer(renderer: T.WebGLRenderer, target: T.WebGLRenderTarget, label: string) {
  return withCafeTargetState(renderer, () => {
    renderer.setRenderTarget(target);
    const gl = renderer.getContext();
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    return { label, width: target.width, height: target.height, type: target.texture.type,
      format: target.texture.format, internalFormat: target.texture.internalFormat, samples: target.samples,
      depthTextureType: target.depthTexture?.type ?? null, status, complete: status === gl.FRAMEBUFFER_COMPLETE };
  });
}

export function requireCafeFramebuffer(renderer: T.WebGLRenderer, target: T.WebGLRenderTarget, label: string) {
  const result = cafeFramebuffer(renderer, target, label);
  if (!result.complete) throw new Error(`Cafe ${label} framebuffer incomplete: 0x${result.status.toString(16)}`);
  return result;
}

export function configureCafeTarget(target: T.WebGLRenderTarget, type: CafeTargetType) {
  // Call only before allocation, or after setSize()/dispose() invalidates storage.
  target.texture.type = type;
  target.texture.format = T.RGBAFormat;
  target.texture.internalFormat = type === T.HalfFloatType ? 'RGBA16F' : 'RGBA8';
  target.samples = 0;
  return target;
}

export function selectCafeTargetType(renderer: T.WebGLRenderer, preference: CafeTargetPreference = 'auto') {
  const gl = renderer.getContext();
  // These are genuine queries/enables. The explicit byte preference never changes
  // extension APIs or pretends a capable GPU lacks a feature.
  const extensions = { colorBufferFloat: !!gl.getExtension('EXT_color_buffer_float'), colorBufferHalfFloat: !!gl.getExtension('EXT_color_buffer_half_float') };
  const probes: ReturnType<typeof cafeFramebuffer>[] = [];
  const candidates: CafeTargetType[] = preference === 'auto' && (extensions.colorBufferFloat || extensions.colorBufferHalfFloat)
    ? [T.HalfFloatType, T.UnsignedByteType] : [T.UnsignedByteType];
  for (const type of candidates) {
    const probe = configureCafeTarget(new T.WebGLRenderTarget(4, 4, { depthBuffer: true }), type);
    try {
      const result = cafeFramebuffer(renderer, probe, 'capability-probe');
      probes.push(result);
      if (result.complete) return { type, preference, extensions, probes };
    } finally { probe.dispose(); }
  }
  throw new Error('Cafe requires a complete RGBA8 framebuffer');
}

/** r186 Reflector restores only the target pointer; preserve face/mip as well. */
export function preserveCafeReflectorState(reflector: Reflector) {
  const original = reflector.onBeforeRender;
  reflector.onBeforeRender = function (renderer, ...args) {
    const saved = cafeTargetState(renderer), xr = renderer.xr.enabled, shadowAuto = renderer.shadowMap.autoUpdate, visible = reflector.visible;
    try { return original.call(this, renderer, ...args); }
    finally {
      reflector.visible = visible;
      renderer.xr.enabled = xr;
      renderer.shadowMap.autoUpdate = shadowAuto;
      restoreCafeTargetState(renderer, saved);
    }
  };
}
