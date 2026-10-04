import * as THREE from 'three';
import { WorldEngine } from '../WorldEngine';
import { configureEnvironmentQA, createCheckedEnvironment, type EnvironmentAudit } from '../environment';
import type { WorldId } from '../types';

type EnvironmentMode = 'normal' | 'forced-byte';
type EngineView = { renderer: THREE.WebGLRenderer; content: { scene: THREE.Scene } | null };

/** QA observations only. No GL methods, capabilities or extension results are replaced. */
export function installEnvironmentQA(scene: WorldId, mode: EnvironmentMode) {
  const audits: Array<{ scope: 'scene' | 'sentinel'; observedAtMs: number; event: EnvironmentAudit }> = [];
  const observations: Array<{ label: string; observedAtMs: number; errors: number[]; framebufferStatus: number; contextLost: boolean; sceneEnvironmentType: number | null; sceneEnvironmentMapping: number | null }> = [];
  let scope: 'scene' | 'sentinel' = 'scene';
  let engine: EngineView | null = null;
  configureEnvironmentQA({
    forceByte: mode === 'forced-byte',
    onEvent: event => audits.push({ scope, observedAtMs: performance.now(), event: JSON.parse(JSON.stringify(event)) as EnvironmentAudit }),
  });
  const originalInit = WorldEngine.prototype.init;
  WorldEngine.prototype.init = function () {
    engine = this as unknown as EngineView;
    return originalInit.call(this);
  };

  function errors(gl: WebGLRenderingContext | WebGL2RenderingContext) {
    const result: number[] = [];
    for (let count = 0; count < 32; count++) {
      const error = gl.getError();
      if (error === gl.NO_ERROR) break;
      result.push(error);
    }
    return result;
  }
  function state(renderer: THREE.WebGLRenderer) {
    return { target: renderer.getRenderTarget()?.texture.uuid ?? null, cubeFace: renderer.getActiveCubeFace(), mip: renderer.getActiveMipmapLevel(), xrEnabled: renderer.xr.enabled, autoClear: renderer.autoClear, toneMapping: renderer.toneMapping };
  }
  function inspect(label: string) {
    if (!engine) throw new Error('Environment QA requires an initialized real engine');
    const gl = engine.renderer.getContext();
    const environment = engine.content?.scene.environment;
    const observation = { label, observedAtMs: performance.now(), framebufferStatus: gl.checkFramebufferStatus(gl.FRAMEBUFFER), errors: errors(gl), contextLost: gl.isContextLost(), sceneEnvironmentType: environment?.type ?? null, sceneEnvironmentMapping: environment?.mapping ?? null };
    observations.push(observation);
    return observation;
  }
  function sentinel() {
    if (scene === 'rural') return { skipped: true, reason: 'Rural has no environment-map correction.' };
    if (!engine) throw new Error('Environment QA requires an initialized real engine');
    const renderer = engine.renderer, gl = renderer.getContext();
    const previousTarget = renderer.getRenderTarget(), previousFace = renderer.getActiveCubeFace(), previousMip = renderer.getActiveMipmapLevel();
    const previousXR = renderer.xr.enabled, previousAutoClear = renderer.autoClear, previousToneMapping = renderer.toneMapping;
    const callerState = state(renderer);
    const canvas = document.createElement('canvas');
    canvas.width = scene === 'temple' ? 512 : 256; canvas.height = canvas.width / 2;
    const context = canvas.getContext('2d')!;
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#94b3c4'); gradient.addColorStop(.5, '#d7d3b6'); gradient.addColorStop(1, '#465b4b');
    context.fillStyle = gradient; context.fillRect(0, 0, canvas.width, canvas.height);
    const source = new THREE.CanvasTexture(canvas);
    source.colorSpace = THREE.SRGBColorSpace; source.mapping = THREE.EquirectangularReflectionMapping;
    const target = new THREE.WebGLCubeRenderTarget(16, { type: THREE.UnsignedByteType, format: THREE.RGBAFormat, depthBuffer: false, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter });
    let environment: ReturnType<typeof createCheckedEnvironment> | null = null;
    let sourceDelegated = false;
    let probe: Record<string, unknown>;
    scope = 'sentinel';
    try {
      const errorsBefore = errors(gl);
      renderer.setRenderTarget(target, 2, 1);
      renderer.xr.enabled = true; renderer.autoClear = false; renderer.toneMapping = THREE.ReinhardToneMapping;
      const before = state(renderer), statusBefore = gl.checkFramebufferStatus(gl.FRAMEBUFFER), bindingErrors = errors(gl);
      if (statusBefore !== gl.FRAMEBUFFER_COMPLETE || bindingErrors.length) throw new Error(`Sentinel cube framebuffer is incomplete: ${statusBefore}; GL errors ${bindingErrors}`);
      sourceDelegated = true; environment = createCheckedEnvironment(renderer, source, scene);
      const after = state(renderer), statusAfter = gl.checkFramebufferStatus(gl.FRAMEBUFFER), errorsAfter = errors(gl);
      probe = { method: 'Real byte cube framebuffer face=2/mip=1, XR enabled, autoClear false and Reinhard tone mapping; same source dimensions as runtime; dedicated QA gradient, not a scene screenshot', sourceSize: { width: canvas.width, height: canvas.height }, callerState, before, after, statusBefore, statusAfter, errorsBefore, bindingErrors, errorsAfter, selectedTextureType: environment.texture.type, selectedMapping: environment.texture.mapping, restored: renderer.getRenderTarget() === target && JSON.stringify(after) === JSON.stringify(before) };
    } finally {
      environment?.dispose();
      renderer.setRenderTarget(previousTarget, previousFace, previousMip);
      renderer.xr.enabled = previousXR; renderer.autoClear = previousAutoClear; renderer.toneMapping = previousToneMapping;
      target.dispose(); if (!sourceDelegated) source.dispose();
      scope = 'scene';
    }
    const finalState = state(renderer), finalErrors = errors(gl);
    return { ...probe, finalState, finalErrors, callerRestored: renderer.getRenderTarget() === previousTarget && JSON.stringify(finalState) === JSON.stringify(callerState) };
  }
  return {
    mode,
    snapshot: () => ({ mode, audits: audits.map(audit => ({ ...audit })), observations: observations.map(observation => ({ ...observation, errors: [...observation.errors] })) }),
    inspect,
    sentinel,
  };
}
