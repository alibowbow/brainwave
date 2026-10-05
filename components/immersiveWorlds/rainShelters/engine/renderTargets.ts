import * as THREE from 'three';

export type RainTargetMode = 'auto' | 'force-byte';
type RainStorage = 'half-float' | 'unsigned-byte';
export interface RainTargetCheck {
  label: string; width: number; height: number; storage: RainStorage; type: number; format: number;
  internalFormat: string | null; depthBuffer: boolean; depthTextureType: number | null; samples: number;
  status: number | null; glErrorsBefore: number[]; glErrors: number[]; restorationErrors: number[];
  before: ReturnType<typeof stateRecord>; after: ReturnType<typeof stateRecord>;
  framebufferRestored: boolean; stateRestored: boolean; complete: boolean; error?: string;
}
export interface RainTargetDiagnostics {
  mode: RainTargetMode;
  capabilities: { colorBufferFloat: boolean; colorBufferHalfFloat: boolean };
  checks: RainTargetCheck[];
  attempts: { label: string; width: number; height: number; storage: RainStorage; ok: boolean; error?: string }[];
}

const modes = new WeakMap<THREE.WebGLRenderer, RainTargetMode>();
const reports = new WeakMap<THREE.WebGLRenderer, RainTargetDiagnostics>();

/** QA selection is explicit and precedes allocation; native extension APIs stay intact. */
export function setRainTargetMode(renderer: THREE.WebGLRenderer, mode: RainTargetMode) {
  if (reports.has(renderer)) throw new Error('Rain target mode must be selected before any target allocation.');
  modes.set(renderer, mode);
}

export function getRainTargetDiagnostics(renderer: THREE.WebGLRenderer): RainTargetDiagnostics {
  let report = reports.get(renderer);
  if (!report) {
    const gl = renderer.getContext();
    report = {
      mode: modes.get(renderer) ?? 'auto',
      capabilities: {
        colorBufferFloat: !!gl.getExtension('EXT_color_buffer_float'),
        colorBufferHalfFloat: !!gl.getExtension('EXT_color_buffer_half_float'),
      },
      checks: [], attempts: [],
    };
    reports.set(renderer, report);
  }
  return report;
}

export function captureRainTargetState(renderer: THREE.WebGLRenderer) {
  const gl = renderer.getContext();
  return {
    target: renderer.getRenderTarget(), face: renderer.getActiveCubeFace(), mip: renderer.getActiveMipmapLevel(),
    viewport: renderer.getViewport(new THREE.Vector4()), currentViewport: renderer.getCurrentViewport(new THREE.Vector4()),
    scissor: renderer.getScissor(new THREE.Vector4()), scissorTest: renderer.getScissorTest(),
    currentScissor: new THREE.Vector4().fromArray(Array.from(gl.getParameter(gl.SCISSOR_BOX) as Int32Array)),
    currentScissorTest: gl.isEnabled(gl.SCISSOR_TEST), framebuffer: gl.getParameter(gl.FRAMEBUFFER_BINDING) as WebGLFramebuffer | null,
    xr: renderer.xr.enabled, autoClear: renderer.autoClear, shadowAutoUpdate: renderer.shadowMap.autoUpdate,
    toneMapping: renderer.toneMapping, clearColor: renderer.getClearColor(new THREE.Color()), clearAlpha: renderer.getClearAlpha(),
  };
}
type RainTargetState = ReturnType<typeof captureRainTargetState>;

/** Preserve Three's state cache and public target/face/mip, including exceptional paths. */
export function restoreRainTargetState(renderer: THREE.WebGLRenderer, saved: RainTargetState) {
  renderer.xr.enabled = saved.xr; renderer.autoClear = saved.autoClear; renderer.shadowMap.autoUpdate = saved.shadowAutoUpdate;
  renderer.toneMapping = saved.toneMapping; renderer.setClearColor(saved.clearColor, saved.clearAlpha);
  renderer.setViewport(saved.viewport); renderer.setScissor(saved.scissor); renderer.setScissorTest(saved.scissorTest);
  if (saved.target) {
    const { target } = saved;
    const viewport = target.viewport.clone(), scissor = target.scissor.clone(), scissorTest = target.scissorTest;
    try {
      target.viewport.copy(saved.currentViewport); target.scissor.copy(saved.currentScissor); target.scissorTest = saved.currentScissorTest;
      renderer.setRenderTarget(target, saved.face, saved.mip);
    } finally {
      target.viewport.copy(viewport); target.scissor.copy(scissor); target.scissorTest = scissorTest;
    }
  } else renderer.setRenderTarget(null, saved.face, saved.mip);
}

export function withRainTargetState<T>(renderer: THREE.WebGLRenderer, work: () => T): T {
  const saved = captureRainTargetState(renderer);
  try { return work(); } finally { restoreRainTargetState(renderer, saved); }
}

/** Hot refraction pass: public renderer cache reads only, no synchronous GL query. */
export function withRainRenderTargetState<T>(renderer: THREE.WebGLRenderer, work: () => T): T {
  const target = renderer.getRenderTarget(), face = renderer.getActiveCubeFace(), mip = renderer.getActiveMipmapLevel();
  const xr = renderer.xr.enabled, shadowAutoUpdate = renderer.shadowMap.autoUpdate;
  try { return work(); }
  finally {
    renderer.xr.enabled = xr; renderer.shadowMap.autoUpdate = shadowAutoUpdate;
    renderer.setRenderTarget(target, face, mip);
  }
}

function stateRecord(state: RainTargetState) {
  return {
    target: state.target?.texture.uuid ?? null, face: state.face, mip: state.mip,
    viewport: state.viewport.toArray(), currentViewport: state.currentViewport.toArray(),
    scissor: state.scissor.toArray(), currentScissor: state.currentScissor.toArray(),
    scissorTest: state.scissorTest, currentScissorTest: state.currentScissorTest,
    xr: state.xr, autoClear: state.autoClear, shadowAutoUpdate: state.shadowAutoUpdate,
    toneMapping: state.toneMapping, clearColor: state.clearColor.toArray(), clearAlpha: state.clearAlpha,
  };
}

function takeErrors(gl: WebGLRenderingContext | WebGL2RenderingContext) {
  const errors: number[] = [];
  for (let i = 0; i < 32; i++) { const error = gl.getError(); if (error === gl.NO_ERROR) break; errors.push(error); }
  return errors;
}
class RainRendererStateError extends Error {}

/** Check the actual color/depth allocation at full dimensions before its first draw. */
export function checkRainFramebuffer(renderer: THREE.WebGLRenderer, target: THREE.WebGLRenderTarget, label: string): boolean {
  const report = getRainTargetDiagnostics(renderer), gl = renderer.getContext(), saved = captureRainTargetState(renderer);
  const before = stateRecord(saved), glErrorsBefore = takeErrors(gl);
  let status: number | null = null, failure: unknown;
  let glErrors: number[] = [];
  try {
    renderer.setRenderTarget(target, 0, 0);
    status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  } catch (error) { failure = error; }
  finally {
    glErrors = takeErrors(gl);
    restoreRainTargetState(renderer, saved);
  }
  const restorationErrors = takeErrors(gl), restored = captureRainTargetState(renderer), after = stateRecord(restored);
  const framebufferRestored = restored.framebuffer === saved.framebuffer;
  const stateRestored = framebufferRestored && JSON.stringify(before) === JSON.stringify(after) && restorationErrors.length === 0;
  const complete = failure === undefined && status === gl.FRAMEBUFFER_COMPLETE && glErrorsBefore.length === 0 && glErrors.length === 0 && stateRestored;
  report.checks.push({
    label, width: target.width, height: target.height, storage: target.texture.type === THREE.HalfFloatType ? 'half-float' : 'unsigned-byte',
    type: target.texture.type, format: target.texture.format, internalFormat: target.texture.internalFormat,
    depthBuffer: target.depthBuffer, depthTextureType: target.depthTexture?.type ?? null, samples: target.samples,
    status, glErrorsBefore, glErrors, restorationErrors, before, after, framebufferRestored, stateRestored, complete,
    ...(failure === undefined ? {} : { error: String(failure) }),
  });
  if (!stateRestored) throw new RainRendererStateError(`Rain ${label}: failed to restore renderer state.`);
  if (failure !== undefined) throw failure;
  return complete;
}

function allocateRefraction(renderer: THREE.WebGLRenderer, width: number, height: number): THREE.WebGLRenderTarget {
  const report = getRainTargetDiagnostics(renderer), c = report.capabilities;
  const candidates: RainStorage[] = report.mode === 'auto' && (c.colorBufferFloat || c.colorBufferHalfFloat)
    ? ['half-float', 'unsigned-byte'] : ['unsigned-byte'];
  const errors: string[] = [];
  for (const storage of candidates) {
    const target = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: true,
      type: storage === 'half-float' ? THREE.HalfFloatType : THREE.UnsignedByteType,
      format: THREE.RGBAFormat, generateMipmaps: false, samples: 0,
    });
    target.texture.internalFormat = storage === 'half-float' ? 'RGBA16F' : 'RGBA8';
    target.texture.name = 'rainShelters.windowRefraction';
    let failure: unknown;
    try {
      if (checkRainFramebuffer(renderer, target, 'window-refraction')) {
        report.attempts.push({ label: 'window-refraction', width, height, storage, ok: true });
        return target;
      }
      failure = new Error('Full-size framebuffer incomplete or GL error.');
    } catch (error) { failure = error; }
    // checkRainFramebuffer restores the caller binding before failed storage is destroyed.
    target.dispose();
    report.attempts.push({ label: 'window-refraction', width, height, storage, ok: false, error: String(failure) });
    if (failure instanceof RainRendererStateError) throw failure;
    errors.push(`${storage}: ${String(failure)}`);
  }
  throw new Error(`Rain window refraction requires a complete full-size RGBA8 framebuffer. ${errors.join(' | ')}`);
}

/** A resize gets freshly allocated, checked storage; no allocated texture.type mutation. */
export function createRainRefractionTarget(renderer: THREE.WebGLRenderer) {
  let target: THREE.WebGLRenderTarget | null = null;
  let disposed = false;
  return {
    ensure(width: number, height: number) {
      if (disposed) throw new Error('Rain refraction target is disposed.');
      if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1) throw new Error('Rain target size must be finite and positive.');
      width = Math.floor(width); height = Math.floor(height);
      if (target?.width === width && target.height === height) return target;
      const next = allocateRefraction(renderer, width, height), previous = target;
      target = next;
      previous?.dispose();
      return target;
    },
    dispose() { if (disposed) return; disposed = true; target?.dispose(); target = null; },
  };
}

/**
 * Rain has no environment/PMREM or transmission targets. The only implicit
 * targets are GardenWindow/MonsoonPorch directional PCF shadows. Precreate the
 * exact r186 RGBA8 + DEPTH_COMPONENT24 target so the real 1024² FBO is checked
 * before shadow rendering. r186 normalizes PCFSoftShadowMap to PCFShadowMap.
 */
export function prepareRainShadowTargets(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
  if (THREE.REVISION !== '186') throw new Error('Rain shadow allocation must be reverified after upgrading Three r186.');
  if (!renderer.shadowMap.enabled) return;
  if (renderer.shadowMap.type !== THREE.PCFShadowMap && renderer.shadowMap.type !== THREE.PCFSoftShadowMap) {
    throw new Error('Rain shadow target audit expects the original PCF shadow algorithm.');
  }
  scene.traverse(object => {
    const light = object as THREE.DirectionalLight;
    if (!light.isDirectionalLight || !light.castShadow) return;
    const shadow = light.shadow, extents = shadow.getFrameExtents();
    const width = shadow.mapSize.x * extents.x, height = shadow.mapSize.y * extents.y;
    if (width > renderer.capabilities.maxTextureSize || height > renderer.capabilities.maxTextureSize) {
      throw new Error('Rain shadow target exceeds native capacity; original shadow resolution was preserved.');
    }
    const target = (shadow.map ?? new THREE.WebGLRenderTarget(width, height)) as THREE.WebGLRenderTarget;
    if (!target.isWebGLRenderTarget) throw new Error('Rain directional shadow requires a WebGL render target.');
    const newlyOwned = shadow.map === null;
    if (newlyOwned) {
      target.texture.name = `${light.name}.shadowMap`;
      target.texture.internalFormat = 'RGBA8';
      target.depthTexture = new THREE.DepthTexture(width, height, THREE.UnsignedIntType);
      target.depthTexture.name = `${light.name}.shadowMap`;
      target.depthTexture.format = THREE.DepthFormat;
      target.depthTexture.compareFunction = renderer.capabilities.reversedDepthBuffer ? THREE.GreaterEqualCompare : THREE.LessEqualCompare;
      target.depthTexture.minFilter = target.depthTexture.magFilter = THREE.LinearFilter;
    }
    try {
      if (!checkRainFramebuffer(renderer, target, 'directional-shadow')) throw new Error('Rain directional shadow framebuffer is incomplete.');
      shadow.map = target;
      shadow.camera.updateProjectionMatrix();
    } catch (error) {
      if (newlyOwned) { target.depthTexture?.dispose(); target.dispose(); }
      throw error;
    }
  });
}
