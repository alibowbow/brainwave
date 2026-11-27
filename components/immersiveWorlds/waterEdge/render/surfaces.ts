import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { createShoreEnvironment } from '../byteEnvironment';
import { assertFramebufferComplete, halfFloatColorAllowed, withRenderTargetState } from '../renderTargets';

/**
 * Radiance probe from a tiny procedural scene (sky dome, a few emitters, a
 * horizon band). Wet stone, leaves and water reflect it, so their highlights
 * agree with the world's actual key light. Uses the checked PMREM path with
 * the byte GGX fallback. The probe scene is disposed here; the caller owns
 * the returned target.
 */
export function radianceProbe(renderer: THREE.WebGLRenderer, build: (probe: THREE.Scene) => void) {
  const probe = new THREE.Scene();
  build(probe);
  try { return createShoreEnvironment(renderer, probe); }
  finally {
    probe.traverse(object => {
      const mesh = object as THREE.Mesh;
      mesh.geometry?.dispose();
      (Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : []).forEach(material => material.dispose());
    });
  }
}

export interface ReflectiveSurfaceShader {
  name?: string;
  uniforms: Record<string, THREE.IUniform>;
  vertexShader: string;
  fragmentShader: string;
}

/**
 * A planar mirror (three's Reflector) for water, rendered at a fraction of the
 * drawing buffer. The reflection target follows the HDR policy (half float
 * when colour buffers allow it), is checked for completeness before its first
 * use and preserves the caller's render-target state.
 *
 * Reflector clones its uniforms: update `mesh.material.uniforms` directly.
 */
export function reflectiveSurface(renderer: THREE.WebGLRenderer, geometry: THREE.BufferGeometry, shader: ReflectiveSurfaceShader, options: { label: string; scale: number; clipBias?: number }) {
  const mesh = new Reflector(geometry, { textureWidth: 4, textureHeight: 4, clipBias: options.clipBias ?? .003, multisample: 0, shader });
  const target = mesh.getRenderTarget();
  if (!halfFloatColorAllowed(renderer)) target.texture.type = THREE.UnsignedByteType;
  target.texture.generateMipmaps = false;
  let checked = false;
  const reflect = mesh.onBeforeRender;
  mesh.onBeforeRender = function (live, ...rest) {
    if (!checked) { assertFramebufferComplete(live, target, options.label); checked = true; }
    withRenderTargetState(live, () => reflect.call(this, live, ...rest));
  };
  let disposed = false;
  return {
    mesh,
    material: mesh.material as THREE.ShaderMaterial,
    setSize(width: number, height: number) {
      const w = Math.max(4, Math.round(width * options.scale)), h = Math.max(4, Math.round(height * options.scale));
      if (w === target.width && h === target.height) return;
      target.setSize(w, h); checked = false;
    },
    dispose() { if (disposed) return; disposed = true; target.dispose(); },
  };
}
