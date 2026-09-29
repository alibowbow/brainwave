import * as THREE from 'three';

/** Vertex shader for passes drawn with the shared full-screen triangle. */
export const FULLSCREEN_VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const triangle = () => {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
  return geometry;
};

/** Draws one material over the whole target; used by every image pass. */
export class FullscreenPass {
  readonly mesh: THREE.Mesh;
  private readonly camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  constructor() {
    this.mesh = new THREE.Mesh(triangle(), undefined);
    this.mesh.frustumCulled = false;
  }

  render(renderer: THREE.WebGLRenderer, material: THREE.Material, target: THREE.WebGLRenderTarget | null) {
    this.mesh.material = material;
    renderer.setRenderTarget(target);
    renderer.render(this.mesh, this.camera);
  }

  dispose() {
    this.mesh.geometry.dispose();
  }
}

export const createFullscreenMesh = (material: THREE.Material) => {
  const mesh = new THREE.Mesh(triangle(), material);
  mesh.frustumCulled = false;
  return mesh;
};

export const passMaterial = (fragmentShader: string, uniforms: Record<string, THREE.IUniform>, extra: Partial<THREE.ShaderMaterialParameters> = {}) =>
  new THREE.ShaderMaterial({
    vertexShader: FULLSCREEN_VERTEX,
    fragmentShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
    ...extra,
  });

export const createCopyMaterial = () => passMaterial(/* glsl */ `
uniform sampler2D tSource;
uniform float uScale;
varying vec2 vUv;
void main() {
  gl_FragColor = texture2D(tSource, vUv) * uScale;
}
`, { tSource: { value: null }, uScale: { value: 1 } });

export interface TargetOptions {
  type?: THREE.TextureDataType;
  format?: THREE.PixelFormat;
  samples?: number;
  depth?: boolean;
  mipmaps?: boolean;
  filter?: THREE.MagnificationTextureFilter;
  wrap?: THREE.Wrapping;
  colorSpace?: THREE.ColorSpace;
  /** Attach a sampleable depth texture (resolved from MSAA). */
  depthTexture?: boolean;
}

export const createTarget = (width: number, height: number, options: TargetOptions = {}) => {
  const target = new THREE.WebGLRenderTarget(Math.max(1, Math.round(width)), Math.max(1, Math.round(height)), {
    type: options.type ?? THREE.HalfFloatType,
    format: options.format ?? THREE.RGBAFormat,
    samples: options.samples ?? 0,
    depthBuffer: options.depth ?? false,
    stencilBuffer: false,
    generateMipmaps: options.mipmaps ?? false,
    minFilter: options.mipmaps ? THREE.LinearMipmapLinearFilter : options.filter ?? THREE.LinearFilter,
    magFilter: options.filter ?? THREE.LinearFilter,
    wrapS: options.wrap ?? THREE.ClampToEdgeWrapping,
    wrapT: options.wrap ?? THREE.ClampToEdgeWrapping,
    colorSpace: options.colorSpace ?? THREE.NoColorSpace,
    depthTexture: options.depthTexture ? new THREE.DepthTexture(Math.max(1, Math.round(width)), Math.max(1, Math.round(height)), THREE.UnsignedIntType) : null,
  });
  return target;
};
