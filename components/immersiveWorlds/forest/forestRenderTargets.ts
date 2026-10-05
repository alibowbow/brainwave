import * as THREE from 'three';

type TargetRenderer = Pick<THREE.WebGLRenderer,
  'extensions' | 'getContext' | 'getRenderTarget' | 'getActiveCubeFace' | 'getActiveMipmapLevel' | 'setRenderTarget'>;

export interface ForestFramebufferCheck {
  label: string;
  type: 'half-float' | 'unsigned-byte' | 'other';
  width: number;
  height: number;
  status: number;
  complete: boolean;
}

export interface ForestTargetPolicy {
  /** Actual extension availability is retained even in an explicitly forced byte run. */
  halfFloatSupported: boolean;
  halfFloatEnabled: boolean;
  mode: 'native-half-float' | 'native-byte' | 'forced-byte';
  reason: 'supported' | 'extension-unavailable' | 'forced-byte' | 'framebuffer-incomplete';
  checks: ForestFramebufferCheck[];
}

export function createForestTargetPolicy(
  renderer: Pick<TargetRenderer, 'extensions'>,
  options: { forceByteTargets?: boolean } = {},
): ForestTargetPolicy {
  // Both extensions make RGBA16F renderable in WebGL2 (Khronos revision 8+).
  // Query the real extensions even when exercising the owned byte path.
  const float = renderer.extensions.has('EXT_color_buffer_float');
  const halfFloat = renderer.extensions.has('EXT_color_buffer_half_float');
  const supported = float || halfFloat;
  return {
    halfFloatSupported: supported,
    halfFloatEnabled: supported && !options.forceByteTargets,
    mode: options.forceByteTargets ? 'forced-byte' : supported ? 'native-half-float' : 'native-byte',
    reason: options.forceByteTargets ? 'forced-byte' : supported ? 'supported' : 'extension-unavailable',
    checks: [],
  };
}

/** Check the renderer's actual attachment, preserving its complete target selection. */
export function checkForestFramebuffer(
  renderer: TargetRenderer,
  target: THREE.WebGLRenderTarget,
  label: string,
  checks?: ForestFramebufferCheck[],
): ForestFramebufferCheck {
  const previous = renderer.getRenderTarget();
  const face = renderer.getActiveCubeFace();
  const mip = renderer.getActiveMipmapLevel();
  try {
    renderer.setRenderTarget(target, 0, 0);
    const gl = renderer.getContext();
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    const result: ForestFramebufferCheck = {
      label,
      type: target.texture.type === THREE.HalfFloatType ? 'half-float'
        : target.texture.type === THREE.UnsignedByteType ? 'unsigned-byte' : 'other',
      width: target.width,
      height: target.height,
      status,
      complete: status === gl.FRAMEBUFFER_COMPLETE,
    };
    checks?.push(result);
    return result;
  } finally {
    renderer.setRenderTarget(previous, face, mip);
  }
}

function useByteTargets(policy: ForestTargetPolicy) {
  policy.halfFloatEnabled = false;
  if (policy.mode !== 'forced-byte') policy.mode = 'native-byte';
  policy.reason = 'framebuffer-incomplete';
}

/** Call immediately after Reflector construction, before any render or target bind. */
export function configureForestReflectionTarget(
  renderer: TargetRenderer,
  target: THREE.WebGLRenderTarget,
  policy: ForestTargetPolicy,
) {
  // Reflector r186 creates its CPU-side target as HalfFloat, without allocating GL storage.
  target.texture.type = policy.halfFloatEnabled ? THREE.HalfFloatType : THREE.UnsignedByteType;
  target.texture.internalFormat = null;
  let result = checkForestFramebuffer(renderer, target, 'reflection', policy.checks);
  if (!result.complete && target.texture.type === THREE.HalfFloatType) {
    // A real failed allocation must be disposed before allocating a different format.
    target.dispose();
    useByteTargets(policy);
    target.texture.type = THREE.UnsignedByteType;
    target.texture.internalFormat = null;
    result = checkForestFramebuffer(renderer, target, 'reflection-byte-fallback', policy.checks);
  }
  if (!result.complete) throw new Error('Forest reflection framebuffer is incomplete.');
  return result;
}

const ENVIRONMENT_FACE_SIZE = 256;
const ENVIRONMENT_WIDTH = 3 * ENVIRONMENT_FACE_SIZE;
const ENVIRONMENT_HEIGHT = 4 * ENVIRONMENT_FACE_SIZE;
const BYTE_RADIANCE_SCALE = 4;

export interface ForestEnvironment {
  texture: THREE.Texture;
  /** Restores the original linear radiance when its byte storage is scaled. */
  intensityScale: number;
  kind: 'half-float-pmrem' | 'byte-cubeuv';
  dispose(): void;
}

export function createForestEnvironment(
  renderer: THREE.WebGLRenderer,
  environmentScene: THREE.Scene,
  policy: ForestTargetPolicy,
): ForestEnvironment {
  if (policy.halfFloatEnabled) {
    // fromScene() renders internally before returning. Check equivalent, full-size
    // scene and ping-pong attachments BEFORE invoking it; never retag its output.
    for (const depthBuffer of [true, false]) {
      const probe = new THREE.WebGLRenderTarget(ENVIRONMENT_WIDTH, ENVIRONMENT_HEIGHT, {
        type: THREE.HalfFloatType, format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
        colorSpace: THREE.LinearSRGBColorSpace, generateMipmaps: false, depthBuffer,
      });
      try {
        if (!checkForestFramebuffer(renderer, probe,
          depthBuffer ? 'pmrem-scene-preflight' : 'pmrem-filter-preflight', policy.checks).complete) {
          useByteTargets(policy);
          break;
        }
      } finally {
        probe.dispose();
      }
    }
  }

  if (policy.halfFloatEnabled) {
    const generator = new THREE.PMREMGenerator(renderer);
    const previous = renderer.getRenderTarget();
    const face = renderer.getActiveCubeFace();
    const mip = renderer.getActiveMipmapLevel();
    const xrEnabled = renderer.xr.enabled;
    const toneMapping = renderer.toneMapping;
    const autoClear = renderer.autoClear;
    let environment: THREE.WebGLRenderTarget;
    let filterComplete = false;
    try {
      environment = generator.fromScene(environmentScene, 0.05, 0.1, 80,
        { size: ENVIRONMENT_FACE_SIZE });
      // Read-only audit of the actual r186 filter attachment, before generator
      // disposal. Public fromScene() exposes only its final environment target.
      const filter = (generator as unknown as {
        _pingPongRenderTarget: THREE.WebGLRenderTarget | null;
      })._pingPongRenderTarget;
      if (filter) filterComplete = checkForestFramebuffer(renderer, filter,
        'pmrem-filter', policy.checks).complete;
    } finally {
      generator.dispose();
      // PMREM's normal cleanup already restores these. Its exceptional path
      // may not reach cleanup, so preserve the caller's state here as well.
      renderer.setRenderTarget(previous, face, mip);
      renderer.xr.enabled = xrEnabled;
      renderer.toneMapping = toneMapping;
      renderer.autoClear = autoClear;
    }
    const environmentComplete = checkForestFramebuffer(renderer, environment,
      'pmrem-environment', policy.checks).complete;
    if (filterComplete && environmentComplete) {
      return { texture: environment.texture, intensityScale: 1, kind: 'half-float-pmrem',
        dispose: () => environment.dispose() };
    }
    environment.dispose();
    useByteTargets(policy);
  }

  const texture = createForestByteEnvironment();
  return { texture, intensityScale: BYTE_RADIANCE_SCALE, kind: 'byte-cubeuv', dispose: () => texture.dispose() };
}

function roughnessAtMip(mip: number) {
  // Inverse of r186 cube_uv_reflection_fragment's roughnessToMip().
  if (mip >= 4) return Math.pow(2, -mip / 2) / 1.16;
  if (mip >= 3) return 0.305 - (mip - 3) * 0.095;
  if (mip >= 2) return 0.4 - (mip - 2) * 0.095;
  if (mip >= -1) return 0.8 - (mip + 1) * (0.4 / 3);
  return 1;
}

function faceDirection(face: number, u: number, v: number, out: THREE.Vector3) {
  switch (face) {
    case 0: out.set(1, v, u); break;
    case 1: out.set(-u, 1, -v); break;
    case 2: out.set(-u, v, 1); break;
    case 3: out.set(-1, v, -u); break;
    case 4: out.set(-u, -1, v); break;
    default: out.set(u, v, -1);
  }
  return out.normalize();
}

/**
 * An approximate GGX-prefiltered version of this forest's analytic sky, in the
 * exact r186 CubeUV atlas layout. No renderer, framebuffer, or GPU PMREM is used.
 * Cube/equirectangular byte textures would silently request a HalfFloat PMREM in
 * WebGLEnvironments; an already-prefiltered CubeUVReflectionMapping avoids that.
 */
export function createForestByteEnvironment(): THREE.DataTexture {
  const pixels = new Uint8Array(ENVIRONMENT_WIDTH * ENVIRONMENT_HEIGHT * 4);
  const normal = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const bitangent = new THREE.Vector3();
  const sun = new THREE.Vector3(8, 13, -18).normalize();
  const color = new THREE.Vector3();
  // Deterministic Hammersley samples. Precompute GGX directions once per mip.
  const radicalInverse = (value: number) => {
    let result = 0, weight = 0.5;
    while (value > 0) { result += (value & 1) * weight; value >>>= 1; weight *= 0.5; }
    return result;
  };
  const sky = (x: number, y: number, z: number, weight: number) => {
    const height = Math.pow(Math.max(0, y), 0.7);
    const alignment = Math.max(0, x * sun.x + y * sun.y + z * sun.z);
    // Approximate the normal path's initial sigma=.05 spherical blur while
    // preserving each sun lobe's energy. All linear channels remain below four.
    const glowPower = 32 / (1 + 32 * 0.05 ** 2);
    const discPower = 700 / (1 + 700 * 0.05 ** 2);
    const glow = Math.pow(alignment, glowPower) * 0.65 * (glowPower + 1) / 33;
    const disc = Math.pow(alignment, discPower) * 2 * (discPower + 1) / 701;
    color.x += (0.72 - 0.33 * height + glow + disc) * weight;
    color.y += (0.77 - 0.13 * height + 0.82 * glow + 0.94 * disc) * weight;
    color.z += (0.59 + 0.11 * height + 0.46 * glow + 0.72 * disc) * weight;
  };

  for (let mip = 8; mip >= -2; mip--) {
    const size = 2 ** Math.max(mip, 4);
    const originX = Math.max(4 - mip, 0) * 3 * 16;
    const originY = 4 * (ENVIRONMENT_FACE_SIZE - size);
    const samples: [number, number, number, number][] = [];
    let totalWeight = 0;
    const alpha = roughnessAtMip(mip) ** 2;
    for (let i = 0; i < (mip === 8 ? 1 : 64); i++) {
      const phi = 2 * Math.PI * i / 64;
      const xi = radicalInverse(i);
      const hz = mip === 8 ? 1 : Math.sqrt((1 - xi) / (1 + (alpha * alpha - 1) * xi));
      const radial = Math.sqrt(Math.max(0, 1 - hz * hz));
      const lx = 2 * hz * radial * Math.cos(phi);
      const ly = 2 * hz * radial * Math.sin(phi);
      const lz = 2 * hz * hz - 1;
      if (lz > 0) { samples.push([lx, ly, lz, lz]); totalWeight += lz; }
    }
    for (const sample of samples) sample[3] /= totalWeight;

    for (let face = 0; face < 6; face++) {
      const tileX = originX + (face % 3) * size;
      const tileY = originY + (face > 2 ? size : 0);
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
        // Includes the one-texel seam border expected by bilinearCubeUV().
        faceDirection(face, 2 * (x - 0.5) / (size - 2) - 1,
          2 * (y - 0.5) / (size - 2) - 1, normal);
        tangent.set(0, Math.abs(normal.y) < 0.999 ? 1 : 0, Math.abs(normal.y) < 0.999 ? 0 : 1)
          .cross(normal).normalize();
        bitangent.crossVectors(normal, tangent);
        color.set(0, 0, 0);
        for (const [sx, sy, sz, weight] of samples) {
          sky(tangent.x * sx + bitangent.x * sy + normal.x * sz,
            tangent.y * sx + bitangent.y * sy + normal.y * sz,
            tangent.z * sx + bitangent.z * sy + normal.z * sz, weight);
        }
        const offset = ((tileY + y) * ENVIRONMENT_WIDTH + tileX + x) * 4;
        pixels[offset] = Math.round(255 * color.x / BYTE_RADIANCE_SCALE);
        pixels[offset + 1] = Math.round(255 * color.y / BYTE_RADIANCE_SCALE);
        pixels[offset + 2] = Math.round(255 * color.z / BYTE_RADIANCE_SCALE);
        pixels[offset + 3] = 255;
      }
    }
  }
  const texture = new THREE.DataTexture(pixels, ENVIRONMENT_WIDTH, ENVIRONMENT_HEIGHT,
    THREE.RGBAFormat, THREE.UnsignedByteType);
  texture.name = 'Forest prefiltered byte sky';
  texture.mapping = THREE.CubeUVReflectionMapping;
  texture.colorSpace = THREE.LinearSRGBColorSpace;
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}
