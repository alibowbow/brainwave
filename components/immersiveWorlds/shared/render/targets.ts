import * as THREE from 'three';

/** Full-screen triangle vertex shader: vUv spans the target exactly. */
export const FULLSCREEN_VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const passMaterial = (fragmentShader: string, uniforms: Record<string, THREE.IUniform>, extra: Partial<THREE.ShaderMaterialParameters> = {}) =>
  new THREE.ShaderMaterial({ vertexShader: FULLSCREEN_VERTEX, fragmentShader, uniforms, depthTest: false, depthWrite: false, toneMapped: false, ...extra });

/** One triangle covering the viewport; every image pass draws through it. */
export class FullscreenPass {
  private readonly mesh: THREE.Mesh;
  private readonly camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  constructor() {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    this.mesh = new THREE.Mesh(geometry);
    this.mesh.frustumCulled = false;
  }

  render(renderer: THREE.WebGLRenderer, material: THREE.Material, target: THREE.WebGLRenderTarget | null) {
    this.mesh.material = material;
    renderer.setRenderTarget(target);
    renderer.render(this.mesh, this.camera);
  }

  dispose() { this.mesh.geometry.dispose(); }
}

export interface TargetOptions {
  type?: THREE.TextureDataType;
  samples?: number;
  depthTexture?: boolean;
  filter?: THREE.MagnificationTextureFilter;
}

export function createTarget(width: number, height: number, options: TargetOptions = {}) {
  const w = Math.max(1, Math.round(width)), h = Math.max(1, Math.round(height));
  const filter = options.filter ?? THREE.LinearFilter;
  return new THREE.WebGLRenderTarget(w, h, {
    type: options.type ?? THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    samples: options.samples ?? 0,
    depthBuffer: !!options.depthTexture,
    stencilBuffer: false,
    generateMipmaps: false,
    minFilter: filter,
    magFilter: filter,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    colorSpace: THREE.NoColorSpace,
    depthTexture: options.depthTexture ? new THREE.DepthTexture(w, h, THREE.UnsignedIntType) : null,
  });
}

export function disposeTarget(target: THREE.WebGLRenderTarget | null | undefined) {
  if (!target) return;
  target.depthTexture?.dispose();
  target.dispose();
}

/** Bloom mip sizes: half resolution down to an 8 px floor, at most `limit` levels. */
export function bloomChain(width: number, height: number, limit = 6): Array<[number, number]> {
  const sizes: Array<[number, number]> = [];
  let w = Math.max(1, Math.floor(width / 2)), h = Math.max(1, Math.floor(height / 2));
  while (sizes.length < limit && Math.min(w, h) >= 8) {
    sizes.push([w, h]);
    w = Math.floor(w / 2); h = Math.floor(h / 2);
  }
  if (!sizes.length) sizes.push([Math.max(1, w), Math.max(1, h)]);
  return sizes;
}

/** Fewer MSAA samples on dense screens, where small pixels alias little. */
export const msaaSamples = (pixelRatio: number, maxSamples: number) => Math.max(0, Math.min(maxSamples, pixelRatio > 1.3 ? 2 : 4));
