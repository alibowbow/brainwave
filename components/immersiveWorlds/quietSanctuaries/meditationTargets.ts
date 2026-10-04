import * as THREE from 'three';

export type TargetStorage = 'half-float' | 'unsigned-byte';
export type TargetMode = 'auto' | 'force-byte';
export interface TargetCapabilities { floatColorBuffer: boolean; halfFloatColorBuffer: boolean }
export interface TargetAttempt { target: string; storage: TargetStorage; ok: boolean; error?: string }
export interface TargetDiagnostics { checks: TargetCheck[]; attempts: TargetAttempt[] }

/** Extension support only chooses the first candidate; a real FBO check decides. */
export function selectCheckedTarget<T>(
  capabilities: TargetCapabilities,
  mode: TargetMode,
  allocate: (storage: TargetStorage) => { value: T; check(): boolean; dispose(): void },
  onAttempt?: (storage: TargetStorage, ok: boolean, error?: unknown) => void,
): T {
  const candidates: TargetStorage[] = mode === 'auto' && (capabilities.floatColorBuffer || capabilities.halfFloatColorBuffer)
    ? ['half-float', 'unsigned-byte'] : ['unsigned-byte'];
  const failures: string[] = [];
  for (const storage of candidates) {
    let candidate: ReturnType<typeof allocate> | undefined;
    let failure: unknown;
    try {
      candidate = allocate(storage);
      if (candidate.check()) { onAttempt?.(storage, true); return candidate.value; }
      failure = new Error('Framebuffer is incomplete or produced a GL error.');
    } catch (error) { failure = error; }
    // The allocator/checker restores bindings before storage is released.
    candidate?.dispose();
    onAttempt?.(storage, false, failure);
    if (failure instanceof RendererStateError) throw failure;
    failures.push(`${storage}: ${String(failure)}`);
  }
  throw new Error(`Meditation render target unavailable; checked byte allocation also failed. ${failures.join(' | ')}`);
}

export function captureRendererState(renderer: THREE.WebGLRenderer) {
  const gl = renderer.getContext();
  return {
    target: renderer.getRenderTarget(), face: renderer.getActiveCubeFace(), mip: renderer.getActiveMipmapLevel(),
    viewport: renderer.getViewport(new THREE.Vector4()), currentViewport: renderer.getCurrentViewport(new THREE.Vector4()),
    scissor: renderer.getScissor(new THREE.Vector4()), scissorTest: renderer.getScissorTest(),
    currentScissor: new THREE.Vector4().fromArray(Array.from(gl.getParameter(gl.SCISSOR_BOX) as Int32Array)),
    currentScissorTest: gl.isEnabled(gl.SCISSOR_TEST), framebuffer: gl.getParameter(gl.FRAMEBUFFER_BINDING) as WebGLFramebuffer | null,
    xr: renderer.xr.enabled, autoClear: renderer.autoClear, toneMapping: renderer.toneMapping,
    clearColor: renderer.getClearColor(new THREE.Color()), clearAlpha: renderer.getClearAlpha(),
  };
}
type RendererState = ReturnType<typeof captureRendererState>;

/** Uses renderer APIs, preserving its cache as well as the native binding. */
export function restoreRendererState(renderer: THREE.WebGLRenderer, saved: RendererState) {
  renderer.xr.enabled = saved.xr; renderer.autoClear = saved.autoClear; renderer.toneMapping = saved.toneMapping;
  renderer.setClearColor(saved.clearColor, saved.clearAlpha);
  renderer.setViewport(saved.viewport); renderer.setScissor(saved.scissor); renderer.setScissorTest(saved.scissorTest);
  const target = saved.target;
  if (target) {
    // A caller may have overridden the viewport after binding a target. Rebind
    // that exact active viewport without changing the target's persistent layout.
    const viewport = target.viewport.clone(), scissor = target.scissor.clone(), scissorTest = target.scissorTest;
    try {
      target.viewport.copy(saved.currentViewport); target.scissor.copy(saved.currentScissor); target.scissorTest = saved.currentScissorTest;
      renderer.setRenderTarget(target, saved.face, saved.mip);
    } finally {
      target.viewport.copy(viewport); target.scissor.copy(scissor); target.scissorTest = scissorTest;
    }
  } else renderer.setRenderTarget(null, saved.face, saved.mip);
}

function snapshot(saved: RendererState) {
  return {
    target: saved.target?.texture.uuid ?? null, face: saved.face, mip: saved.mip,
    viewport: saved.viewport.toArray(), currentViewport: saved.currentViewport.toArray(),
    scissor: saved.scissor.toArray(), currentScissor: saved.currentScissor.toArray(),
    scissorTest: saved.scissorTest, currentScissorTest: saved.currentScissorTest,
    xr: saved.xr, autoClear: saved.autoClear, toneMapping: saved.toneMapping,
    clearColor: saved.clearColor.toArray(), clearAlpha: saved.clearAlpha,
  };
}

export interface TargetCheck {
  label: string; width: number; height: number; storage: TargetStorage; type: number; format: number;
  depthBuffer: boolean; samples: number; status: number | null; statusHex: string | null;
  glErrorsBefore: number[]; glErrors: number[]; restorationErrors: number[];
  before: ReturnType<typeof snapshot>; after: ReturnType<typeof snapshot>;
  framebufferRestored: boolean; stateRestored: boolean; ok: boolean; error?: string;
}
class RendererStateError extends Error {}

function takeErrors(gl: WebGLRenderingContext | WebGL2RenderingContext) {
  const errors: number[] = [];
  for (let i = 0; i < 32; i++) { const error = gl.getError(); if (error === gl.NO_ERROR) break; errors.push(error); }
  return errors;
}

/** Allocate the real target at its real dimensions, then inspect its native FBO. */
export function checkMeditationTarget(renderer: THREE.WebGLRenderer, target: THREE.WebGLRenderTarget, label: string, diagnostics: TargetDiagnostics): boolean {
  const gl = renderer.getContext(), saved = captureRendererState(renderer);
  const before = snapshot(saved), glErrorsBefore = takeErrors(gl);
  let status: number | null = null, failure: unknown;
  let glErrors: number[] = [];
  try {
    renderer.setRenderTarget(target, 0, 0);
    status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  } catch (error) { failure = error; }
  finally {
    glErrors = takeErrors(gl);
    restoreRendererState(renderer, saved);
  }
  const restorationErrors = takeErrors(gl), restored = captureRendererState(renderer), after = snapshot(restored);
  const framebufferRestored = restored.framebuffer === saved.framebuffer;
  const stateRestored = framebufferRestored && JSON.stringify(before) === JSON.stringify(after) && restorationErrors.length === 0;
  const ok = failure === undefined && status === gl.FRAMEBUFFER_COMPLETE && glErrorsBefore.length === 0 && glErrors.length === 0 && stateRestored;
  diagnostics.checks.push({
    label, width: target.width, height: target.height, storage: target.texture.type === THREE.HalfFloatType ? 'half-float' : 'unsigned-byte',
    type: target.texture.type, format: target.texture.format, depthBuffer: target.depthBuffer, samples: target.samples,
    status, statusHex: status === null ? null : `0x${status.toString(16)}`, glErrorsBefore, glErrors, restorationErrors,
    before, after, framebufferRestored, stateRestored, ok, ...(failure === undefined ? {} : { error: String(failure) }),
  });
  if (!stateRestored) throw new RendererStateError(`Meditation ${label}: renderer state could not be restored.`);
  if (failure !== undefined) throw failure;
  return ok;
}
