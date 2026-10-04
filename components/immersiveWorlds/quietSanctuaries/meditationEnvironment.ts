import * as THREE from 'three';
import {
  captureRendererState,
  checkMeditationTarget,
  restoreRendererState,
  selectCheckedTarget,
  type TargetCapabilities,
  type TargetDiagnostics,
  type TargetMode,
  type TargetStorage,
} from './meditationTargets';

/**
 * This narrowly versioned adapter prepares r186's real PMREM output AND scratch
 * target before either gets GPU storage. It neither replaces the PMREM algorithm
 * nor asks WebGL to advertise support it does not have.
 */
interface PreparedPMREM extends THREE.PMREMGenerator {
  _setSize(size: number): void;
  _allocateTargets(): THREE.WebGLRenderTarget;
  _pingPongRenderTarget: THREE.WebGLRenderTarget | null;
  _cubeSize: number;
  _lodMax: number;
}

interface EnvironmentPair {
  storage: TargetStorage;
  generator: PreparedPMREM;
  output: THREE.WebGLRenderTarget;
  scratch: THREE.WebGLRenderTarget;
  releaseScratch(): void;
  dispose(): void;
}

const CUBE_SIZE = 64;
const TARGET_WIDTH = 336;
const TARGET_HEIGHT = 256;

function checkedPrivateSurface(generator: THREE.PMREMGenerator): PreparedPMREM {
  const candidate = generator as PreparedPMREM;
  if (
    THREE.REVISION !== '186'
    || typeof candidate._setSize !== 'function'
    || typeof candidate._allocateTargets !== 'function'
    || candidate._pingPongRenderTarget !== null
    || candidate._cubeSize !== 0
    || candidate._lodMax !== 0
  ) {
    throw new Error('Meditation PMREM requires the verified Three.js r186 private target-allocation surface.');
  }
  return candidate;
}

function checkSourceDimensions(source: THREE.CubeTexture) {
  const images = source.image as Array<{ width?: number; height?: number; image?: { width?: number; height?: number } }>;
  if (
    !Array.isArray(images)
    || images.length !== 6
    || !images.every((face) => {
      const image = face?.image ?? face;
      return image?.width === CUBE_SIZE && image?.height === CUBE_SIZE;
    })
    || (source.mapping !== THREE.CubeReflectionMapping && source.mapping !== THREE.CubeRefractionMapping)
  ) {
    throw new Error('Meditation PMREM requires six original 64×64 cubemap faces with cube reflection/refraction mapping.');
  }
}

function checkTargetShape(target: THREE.WebGLRenderTarget | null, label: string): asserts target is THREE.WebGLRenderTarget {
  if (
    !target?.isWebGLRenderTarget
    || target.width !== TARGET_WIDTH
    || target.height !== TARGET_HEIGHT
    || target.texture.mapping !== THREE.CubeUVReflectionMapping
  ) {
    throw new Error(`Meditation PMREM ${label} does not match the verified r186 336×256 CubeUV layout.`);
  }
}

/**
 * Returns the owned CubeUV render target, whose texture can be assigned directly
 * to scene.environment. The caller must dispose the returned target on teardown.
 * The source cubemap remains owned by the caller.
 */
export function createMeditationEnvironment(
  renderer: THREE.WebGLRenderer,
  source: THREE.CubeTexture,
  mode: TargetMode,
  capabilities: TargetCapabilities,
  diagnostics: TargetDiagnostics,
): THREE.WebGLRenderTarget {
  const originalState = captureRendererState(renderer);
  let selected: EnvironmentPair | undefined;
  let completed = false;

  try {
    checkSourceDimensions(source);
    selected = selectCheckedTarget(capabilities, mode, (storage: TargetStorage) => {
      const rawGenerator = new THREE.PMREMGenerator(renderer);
      let generator: PreparedPMREM | undefined;
      let output: THREE.WebGLRenderTarget | undefined;
      let scratchReleased = false;
      let outputReleased = false;
      const releaseScratch = () => {
        if (scratchReleased) return;
        scratchReleased = true;
        rawGenerator.dispose();
      };
      const dispose = () => {
        // Never delete framebuffer resources while a candidate remains bound.
        restoreRendererState(renderer, originalState);
        try {
          if (!outputReleased) { outputReleased = true; output?.dispose(); }
        } finally {
          releaseScratch();
        }
      };

      try {
        generator = checkedPrivateSurface(rawGenerator);
        generator._setSize(CUBE_SIZE);
        output = generator._allocateTargets();
        const scratch = generator._pingPongRenderTarget;
        checkTargetShape(output, 'output');
        checkTargetShape(scratch, 'scratch');
        if (output === scratch || generator._cubeSize !== CUBE_SIZE || generator._lodMax !== 6) {
          throw new Error('Meditation PMREM r186 target preparation returned an unexpected target pair.');
        }

        // _allocateTargets only creates JS objects. Both texture types are fixed
        // before checkMeditationTarget triggers the first real GPU allocation.
        const type = storage === 'half-float' ? THREE.HalfFloatType : THREE.UnsignedByteType;
        output.texture.type = type;
        scratch.texture.type = type;

        const value: EnvironmentPair = { storage, generator, output, scratch, releaseScratch, dispose };
        return {
          value,
          check() {
            // Evaluate both targets, even when the first is incomplete.
            let outputOK = false;
            let scratchOK = false;
            let firstError: unknown;
            try { outputOK = checkMeditationTarget(renderer, value.output, 'environment-output', diagnostics); }
            catch (error) { firstError = error; }
            try { scratchOK = checkMeditationTarget(renderer, value.scratch, 'environment-scratch', diagnostics); }
            catch (error) { firstError ??= error; }
            if (firstError !== undefined) throw firstError;
            return outputOK && scratchOK;
          },
          dispose,
        };
      } catch (error) {
        dispose();
        throw error;
      }
    }, (storage, ok, error) => {
      diagnostics.attempts.push({ target: 'environment', storage, ok, ...(error === undefined ? {} : { error: String(error) }) });
    });

    // Passing the verified output prevents r186 from allocating an implicit new
    // half-float output. Its prepared scratch target is already checked as well.
    try {
      const result = selected.generator.fromCubemap(source, selected.output);
      if (result !== selected.output) {
        restoreRendererState(renderer, originalState);
        result.dispose();
        throw new Error('Meditation PMREM unexpectedly replaced its checked output target.');
      }
      const gl = renderer.getContext();
      const errors: number[] = [];
      for (let i = 0; i < 32; i++) {
        const error = gl.getError();
        if (error === gl.NO_ERROR) break;
        errors.push(error);
      }
      if (errors.length) {
        throw new Error(`Meditation PMREM generation produced GL errors: ${errors.map((error) => `0x${error.toString(16)}`).join(', ')}.`);
      }
      diagnostics.attempts.push({ target: 'environment-generation', storage: selected.storage, ok: true });
    } catch (error) {
      diagnostics.attempts.push({ target: 'environment-generation', storage: selected.storage, ok: false, error: String(error) });
      throw error;
    }
    restoreRendererState(renderer, originalState);
    selected.releaseScratch();
    completed = true;
    return selected.output;
  } finally {
    // r186 normally restores bindings itself, but not every state on exception.
    // The group helper restores target, face, mip, XR, autoClear, tone mapping,
    // viewport/scissor and clear state before any failed pair is destroyed.
    restoreRendererState(renderer, originalState);
    if (!completed) selected?.dispose();
  }
}
