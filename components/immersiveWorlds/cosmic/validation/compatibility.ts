import * as THREE from 'three';
import { CosmicEngine } from '../CosmicEngine';
import { inspectCosmicFramebuffer, prepareCosmicReflection, type CosmicReflectionMode } from '../reflectionTarget';

/** Isolated harness only: explicit byte selection, never fabricated GL capabilities. */
export async function mountCompatibilityHarness(root: HTMLElement, mode: CosmicReflectionMode) {
  root.innerHTML = '<main><section class="garden-stage cosmic-world" data-state="loading"><canvas class="cosmic-world-canvas"></canvas></section></main>';
  const stage = root.querySelector<HTMLElement>('section')!;
  const canvas = root.querySelector<HTMLCanvasElement>('canvas')!;
  if(new URLSearchParams(location.search).has('probe'))stage.dataset.framebufferProbe=JSON.stringify(runFramebufferStateProbe());
  const engine = new CosmicEngine({ canvas, reflectionMode: mode, onContextLost: () => { stage.dataset.state = 'failed'; } });
  const resize = () => {
    engine.setSize(stage.clientWidth, stage.clientHeight, devicePixelRatio);
    engine.renderFrame(0);
    stage.dataset.diagnostics = JSON.stringify(engine.getDiagnostics());
  };
  resize();
  try {
    await engine.init();
    stage.dataset.state = 'ready';
    resize();
  } catch (error) {
    stage.dataset.state = 'failed';
    engine.dispose();
    throw error;
  }
  window.addEventListener('resize', resize);
  window.addEventListener('pagehide', () => { window.removeEventListener('resize', resize); engine.dispose(); }, { once: true });
}

/** Actual GPU state regression, on a small validation-only renderer. Not scene content. */
export function runFramebufferStateProbe() {
  const renderer = new THREE.WebGLRenderer();
  const gl = renderer.getContext() as WebGL2RenderingContext;
  const previous = new THREE.WebGLCubeRenderTarget(16, { type: THREE.UnsignedByteType, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter, depthBuffer: false });
  const target = new THREE.WebGLRenderTarget(16, 16, { type: THREE.UnsignedByteType });
  try {
    renderer.setRenderTarget(previous, 3, 1);
    const beforeStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    const beforeBinding = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    const reflection = prepareCosmicReflection(renderer, target, 'byte');
    const inspected = inspectCosmicFramebuffer(renderer, target);
    const stateRestored = renderer.getRenderTarget() === previous && renderer.getActiveCubeFace() === 3 && renderer.getActiveMipmapLevel() === 1;
    const bindingRestored = gl.getParameter(gl.FRAMEBUFFER_BINDING) === beforeBinding;
    const afterStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    const error = gl.getError();
    return { beforeStatus, afterStatus, stateRestored, bindingRestored, inspected, reflection: reflection.getDiagnostics(), error };
  } finally {
    renderer.setRenderTarget(null);
    target.dispose(); previous.dispose(); renderer.dispose(); renderer.forceContextLoss();
  }
}
