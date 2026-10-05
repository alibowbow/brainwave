import * as THREE from 'three';

interface TargetCheck {
  label: string;
  type: 'half-float' | 'unsigned-byte';
  width: number;
  height: number;
  faces: number[];
  complete: boolean;
}
interface TargetReport {
  forcedByte: boolean;
  colorBufferFloat: boolean;
  colorBufferHalfFloat: boolean;
  checks: TargetCheck[];
  environment?: 'three-pmrem-half-float' | 'byte-ggx-cube-uv';
}
const reports = new WeakMap<THREE.WebGLRenderer, TargetReport>();
let qaForceByte = false;

/** Isolated QA harness only: call before creating a world. Does not spoof extensions. */
export function configureWaterEdgeRenderTargets(options: { forceByte: boolean }) {
  qaForceByte = options.forceByte;
}

function reportFor(renderer: THREE.WebGLRenderer) {
  let report = reports.get(renderer);
  if (!report) {
    const gl = renderer.getContext();
    report = {
      forcedByte: qaForceByte,
      // Both extensions permit RGBA16F in WebGL2. WebGL2 by itself does not.
      colorBufferFloat: !!gl.getExtension('EXT_color_buffer_float'),
      colorBufferHalfFloat: !!gl.getExtension('EXT_color_buffer_half_float'),
      checks: [],
    };
    reports.set(renderer, report);
  }
  return report;
}

function publish(renderer: THREE.WebGLRenderer) {
  renderer.domElement.dataset.waterEdgeRenderTargets = JSON.stringify(reportFor(renderer));
}

export function halfFloatColorAllowed(renderer: THREE.WebGLRenderer) {
  const report = reportFor(renderer);
  publish(renderer);
  return !report.forcedByte && (report.colorBufferFloat || report.colorBufferHalfFloat);
}

export function recordEnvironmentPath(renderer: THREE.WebGLRenderer, path: TargetReport['environment']) {
  reportFor(renderer).environment = path;
  publish(renderer);
}

/** Use public renderer state, never direct GL binding or extension monkeypatches. */
export function withRenderTargetState<T>(renderer: THREE.WebGLRenderer, operation: () => T): T {
  const target = renderer.getRenderTarget();
  const face = renderer.getActiveCubeFace();
  const mip = renderer.getActiveMipmapLevel();
  try { return operation(); }
  finally { renderer.setRenderTarget(target, face, mip); }
}

/** Binding performs Three's real GPU allocation. Check every cube face before any draw. */
export function assertFramebufferComplete(renderer: THREE.WebGLRenderer, target: THREE.WebGLRenderTarget, label: string) {
  const gl = renderer.getContext();
  const check: TargetCheck = {
    label, type: target.texture.type === THREE.HalfFloatType ? 'half-float' : 'unsigned-byte',
    width: target.width, height: target.height, faces: [], complete: false,
  };
  try {
    withRenderTargetState(renderer, () => {
      if (gl.isContextLost()) throw new Error(`${label}: WebGL context lost`);
      const faces = target instanceof THREE.WebGLCubeRenderTarget ? 6 : 1;
      for (let face = 0; face < faces; face++) {
        renderer.setRenderTarget(target, face, 0);
        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        check.faces.push(status);
        if (status !== gl.FRAMEBUFFER_COMPLETE) throw new Error(`${label}: incomplete framebuffer 0x${status.toString(16)}`);
      }
      check.complete = true;
    });
  } finally {
    const report = reportFor(renderer);
    // Resize rechecks replace their prior entry rather than growing diagnostics forever.
    const index = report.checks.findIndex(item => item.label === label && item.type === check.type);
    if (index < 0) report.checks.push(check); else report.checks[index] = check;
    publish(renderer);
  }
}

export function createCheckedCubeTarget(
  renderer: THREE.WebGLRenderer, label: string, size: number,
  options: THREE.RenderTargetOptions = {}, forceByte = false,
) {
  const half = !forceByte && halfFloatColorAllowed(renderer);
  const create = (type: THREE.TextureDataType) => new THREE.WebGLCubeRenderTarget(size, {
    ...options, type, format: THREE.RGBAFormat, colorSpace: THREE.LinearSRGBColorSpace,
  });
  let target = create(half ? THREE.HalfFloatType : THREE.UnsignedByteType);
  try { assertFramebufferComplete(renderer, target, label); }
  catch (error) {
    target.dispose();
    if (!half) throw error;
    target = create(THREE.UnsignedByteType);
    try { assertFramebufferComplete(renderer, target, label); }
    catch (fallbackError) { target.dispose(); throw fallbackError; }
  }
  return target;
}

/** r186 PMREM allocates BOTH a depth-enabled output and a depthless ping-pong
 * RGBA16F target. Test their exact 256-face atlas size/format before fromScene,
 * which starts rendering synchronously. The probes contain no scene draws. */
export function pmremHalfFloatSupported(renderer: THREE.WebGLRenderer) {
  if (!halfFloatColorAllowed(renderer)) return false;
  for (const depthBuffer of [true, false]) {
    const probe = new THREE.WebGLRenderTarget(768, 1024, {
      type: THREE.HalfFloatType, format: THREE.RGBAFormat, colorSpace: THREE.LinearSRGBColorSpace,
      depthBuffer, generateMipmaps: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
    });
    try { assertFramebufferComplete(renderer, probe, `pmrem-format-preflight-${depthBuffer ? 'depth' : 'color'}`); }
    catch { return false; }
    finally { probe.dispose(); }
  }
  return true;
}
