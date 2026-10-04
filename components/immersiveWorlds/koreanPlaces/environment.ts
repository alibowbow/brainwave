import * as THREE from 'three';

type EnvironmentScene = 'temple' | 'scops';
export type EnvironmentType = 'half-float' | 'unsigned-byte';
export interface EnvironmentState { target: string | null; cubeFace: number; mip: number }
export interface EnvironmentTargetAudit {
  role: 'output' | 'ping-pong'; type: EnvironmentType; width: number; height: number;
  format: 'RGBA'; internalFormat: 'RGBA16F' | 'RGBA8'; status: number; statusName: string;
  errors: number[]; stateBefore: EnvironmentState; stateAfter: EnvironmentState; restored: boolean;
}
export interface EnvironmentAttempt {
  type: EnvironmentType; targets: EnvironmentTargetAudit[]; success: boolean; discarded: boolean; reason?: string;
}
export interface EnvironmentAudit {
  phase: 'generation' | 'dispose'; scene: EnvironmentScene; forceByte: boolean;
  extensions: { colorBufferFloat: boolean; colorBufferHalfFloat: boolean };
  sourceSize: { width: number; height: number }; cubeSize: number; width: number; height: number;
  attempts: EnvironmentAttempt[]; selectedType: EnvironmentType | null; environmentMapping: number | null;
  glErrorsBefore: number[]; generationErrors: number[];
  stateBefore: EnvironmentState; stateAfter: EnvironmentState; restored: boolean;
  success: boolean; disposed: boolean;
}

// Only the isolated QA entry calls this. Production never forces a capability or
// alters WebGL: byte selection is a real alternate allocation policy.
let qa: { forceByte?: boolean; onEvent?: (event: EnvironmentAudit) => void } = {};
export function configureEnvironmentQA(options: typeof qa = {}) { qa = options; }

export function environmentCandidates(extensions: EnvironmentAudit['extensions'], forceByte = false): EnvironmentType[] {
  return !forceByte && (extensions.colorBufferFloat || extensions.colorBufferHalfFloat)
    ? ['half-float', 'unsigned-byte'] : ['unsigned-byte'];
}

export function environmentSize(sourceWidth: number) {
  const cubeSize = 2 ** Math.floor(Math.log2(sourceWidth / 4));
  if (!Number.isFinite(cubeSize) || cubeSize < 16) throw new Error('Invalid Korean environment source size');
  return { cubeSize, width: 3 * Math.max(cubeSize, 16 * 7), height: 4 * cubeSize };
}

function state(renderer: THREE.WebGLRenderer): EnvironmentState {
  return { target: renderer.getRenderTarget()?.texture.uuid ?? null, cubeFace: renderer.getActiveCubeFace(), mip: renderer.getActiveMipmapLevel() };
}
function sameState(a: EnvironmentState, b: EnvironmentState) {
  return a.target === b.target && a.cubeFace === b.cubeFace && a.mip === b.mip;
}
function errors(gl: WebGLRenderingContext | WebGL2RenderingContext): number[] {
  const result: number[] = [];
  // Context loss can be sticky. Bounded observation, never fake or suppress an error.
  for (let i = 0; i < 16; i++) { const error = gl.getError(); if (error === gl.NO_ERROR) break; result.push(error); }
  return result;
}
function snapshot(renderer: THREE.WebGLRenderer) {
  return { target: renderer.getRenderTarget(), face: renderer.getActiveCubeFace(), mip: renderer.getActiveMipmapLevel(),
    xr: renderer.xr.enabled, autoClear: renderer.autoClear, toneMapping: renderer.toneMapping };
}
function restore(renderer: THREE.WebGLRenderer, saved: ReturnType<typeof snapshot>) {
  renderer.setRenderTarget(saved.target, saved.face, saved.mip);
  renderer.xr.enabled = saved.xr; renderer.autoClear = saved.autoClear; renderer.toneMapping = saved.toneMapping;
}

// These are r186's JavaScript allocation hooks, not a patched renderer/GL API.
// Native _allocateTargets creates CPU descriptors and shader/LOD objects only.
// Both target descriptors are selected and actually checked BEFORE it returns to
// _fromTexture's first conversion draw. A conformance unit pins the installed
// 0.186.1 source; dependency changes require reviewing this narrow adapter.
interface PMREMInternals {
  _allocateTargets(): THREE.WebGLRenderTarget;
  _pingPongRenderTarget: THREE.WebGLRenderTarget | null;
}
class CheckedPMREM extends THREE.PMREMGenerator {
  output: THREE.WebGLRenderTarget | null = null;
  constructor(private checkedRenderer: THREE.WebGLRenderer, private selected: EnvironmentType,
    private dimensions: ReturnType<typeof environmentSize>, private attempt: EnvironmentAttempt) { super(checkedRenderer); }

  _allocateTargets(): THREE.WebGLRenderTarget {
    const nativeAllocate = (THREE.PMREMGenerator.prototype as unknown as PMREMInternals)._allocateTargets;
    if (THREE.REVISION !== '186' || typeof nativeAllocate !== 'function') throw new Error('Unsupported PMREM allocation contract');
    const output = nativeAllocate.call(this);
    this.output = output;
    const pingPong = (this as unknown as PMREMInternals)._pingPongRenderTarget;
    if (!pingPong) throw new Error('PMREM ping-pong target missing');
    const targets = [['output', output], ['ping-pong', pingPong]] as const;
    // No GPU allocation has happened yet. Never change an already allocated
    // half-float target into byte; a failed attempt is disposed and rebuilt.
    for (const [, target] of targets) {
      if (target.width !== this.dimensions.width || target.height !== this.dimensions.height ||
          target.depthBuffer || target.samples !== 0 || target.texture.format !== THREE.RGBAFormat ||
          target.texture.colorSpace !== THREE.LinearSRGBColorSpace || target.texture.generateMipmaps ||
          target.texture.minFilter !== THREE.LinearFilter || target.texture.magFilter !== THREE.LinearFilter) {
        throw new Error('Unexpected PMREM target layout');
      }
      target.texture.type = this.selected === 'half-float' ? THREE.HalfFloatType : THREE.UnsignedByteType;
      target.texture.internalFormat = this.selected === 'half-float' ? 'RGBA16F' : 'RGBA8';
    }
    // Check both real full-sized stores, including the temporary convolution
    // target. No PMREM draw is submitted until every target passes.
    for (const [role, target] of targets) {
      const record = this.check(target, role);
      this.attempt.targets.push(record);
    }
    if (this.attempt.targets.some(record => record.status !== this.checkedRenderer.getContext().FRAMEBUFFER_COMPLETE ||
      record.errors.length || !record.restored)) throw new Error('PMREM target is not color-renderable');
    return output;
  }

  private check(target: THREE.WebGLRenderTarget, role: EnvironmentTargetAudit['role']): EnvironmentTargetAudit {
    const renderer = this.checkedRenderer, gl = renderer.getContext(), saved = snapshot(renderer);
    const before = state(renderer);
    let status = 0;
    const observed = errors(gl);
    try {
      renderer.setRenderTarget(target, 0, 0);
      status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      observed.push(...errors(gl));
    } finally { restore(renderer, saved); }
    observed.push(...errors(gl));
    const after = state(renderer);
    return { role, type: this.selected, width: target.width, height: target.height, format: 'RGBA',
      internalFormat: this.selected === 'half-float' ? 'RGBA16F' : 'RGBA8', status,
      statusName: status === gl.FRAMEBUFFER_COMPLETE ? 'FRAMEBUFFER_COMPLETE' : `0x${status.toString(16)}`,
      errors: observed, stateBefore: before, stateAfter: after, restored: sameState(before, after) };
  }
}

/** Prepare the original LDR gradient before compileAsync can invoke automatic PMREM. */
export function createCheckedEnvironment(renderer: THREE.WebGLRenderer, source: THREE.Texture, scene: EnvironmentScene) {
  const gl = renderer.getContext(), saved = snapshot(renderer), before = state(renderer);
  const image = source.image as { width: number; height: number };
  const dimensions = environmentSize(image.width);
  const options = { ...qa };
  const extensions = { colorBufferFloat: renderer.extensions.has('EXT_color_buffer_float'),
    colorBufferHalfFloat: renderer.extensions.has('EXT_color_buffer_half_float') };
  const audit: EnvironmentAudit = { phase: 'generation', scene, forceByte: !!options.forceByte, extensions,
    sourceSize: { width: image.width, height: image.height }, ...dimensions,
    attempts: [], selectedType: null, environmentMapping: null, glErrorsBefore: errors(gl), generationErrors: [],
    stateBefore: before, stateAfter: before, restored: true, success: false, disposed: false };
  let result: THREE.WebGLRenderTarget | null = null;
  let retainedGenerator: CheckedPMREM | null = null;
  let lastError: unknown = new Error('No color-renderable Korean environment target');
  try {
    if (audit.glErrorsBefore.length) throw new Error('WebGL already reports an error before environment preparation');
    for (const type of environmentCandidates(extensions, options.forceByte)) {
      const attempt: EnvironmentAttempt = { type, targets: [], success: false, discarded: false };
      audit.attempts.push(attempt);
      const generator = new CheckedPMREM(renderer, type, dimensions, attempt);
      try {
        const target = generator.fromEquirectangular(source);
        const generatedErrors = errors(gl);
        audit.generationErrors.push(...generatedErrors);
        if (generatedErrors.length) throw new Error('WebGL error during environment generation');
        if (target !== generator.output || target.texture.mapping !== THREE.CubeUVReflectionMapping) {
          throw new Error('Unexpected PMREM output');
        }
        result = target; retainedGenerator = generator; attempt.success = true; audit.selectedType = type;
        audit.environmentMapping = target.texture.mapping;
      } catch (error) {
        lastError = error; attempt.reason = error instanceof Error ? error.message : String(error);
        generator.output?.dispose(); attempt.discarded = true;
      } finally {
        // Failed stores are destroyed before any retry. Keep successful native
        // PMREM resources until scene disposal, matching the original lifetime.
        if (!attempt.success) generator.dispose();
        restore(renderer, saved);
      }
      if (result) break;
    }
    if (!result) throw lastError;
    audit.success = true;
  } finally {
    // Native PMREM has no exception-safe state guard; own both success/failure.
    restore(renderer, saved);
    if (!result) source.dispose();
    audit.stateAfter = state(renderer); audit.restored = sameState(before, audit.stateAfter);
    options.onEvent?.(audit);
  }
  const target = result;
  let disposed = false;
  return { texture: target.texture, dispose() {
    if (disposed) return;
    disposed = true; target.dispose(); retainedGenerator?.dispose(); source.dispose();
    options.onEvent?.({ ...audit, phase: 'dispose', disposed: true });
  } };
}
