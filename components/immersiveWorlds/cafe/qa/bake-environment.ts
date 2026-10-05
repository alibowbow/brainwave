import * as T from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/** Offline only: create the original room PMREM on a verified HDR-capable context. */
async function bakeCafeEnvironment() {
  const renderer = new T.WebGLRenderer({ antialias: false });
  const gl = renderer.getContext();
  const extensions = {
    float: !!gl.getExtension('EXT_color_buffer_float'),
    halfFloat: !!gl.getExtension('EXT_color_buffer_half_float'),
  };
  const previous = {
    target: renderer.getRenderTarget(),
    face: renderer.getActiveCubeFace(),
    mip: renderer.getActiveMipmapLevel(),
  };
  let probe: T.WebGLRenderTarget | undefined;
  let environment: RoomEnvironment | undefined;
  let generator: T.PMREMGenerator | undefined;
  let atlas: T.WebGLRenderTarget | undefined;
  try {
    if (!extensions.float && !extensions.halfFloat) throw new Error('Baking requires a half-float color-buffer extension.');
    probe = new T.WebGLRenderTarget(1, 1, { type: T.HalfFloatType, depthBuffer: true, samples: 0 });
    renderer.setRenderTarget(probe);
    const framebufferStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (framebufferStatus !== gl.FRAMEBUFFER_COMPLETE) throw new Error(`RGBA16F framebuffer incomplete: ${framebufferStatus}`);
    renderer.setRenderTarget(previous.target, previous.face, previous.mip);
    probe.dispose();
    probe = undefined;

    environment = new RoomEnvironment();
    generator = new T.PMREMGenerator(renderer);
    atlas = generator.fromScene(environment, .035);
    renderer.setRenderTarget(atlas);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) throw new Error('PMREM output framebuffer incomplete.');
    const pixels = new Float32Array(atlas.width * atlas.height * 4);
    // FLOAT readback is valid for the verified floating-point color attachment.
    // Do not use Three's HALF_FLOAT readback type with a Float32Array.
    gl.readPixels(0, 0, atlas.width, atlas.height, gl.RGBA, gl.FLOAT, pixels);
    const readError = gl.getError();
    if (readError !== gl.NO_ERROR) throw new Error(`PMREM float readback failed: ${readError}`);
    renderer.setRenderTarget(previous.target, previous.face, previous.mip);
    const response = await fetch('/__cafe_environment_bake', { method: 'POST', body: pixels.buffer });
    if (!response.ok) throw new Error('Failed to transfer the baked atlas to the local writer.');
    return { width: atlas.width, height: atlas.height, threeRevision: T.REVISION, extensions, framebufferStatus,
      glVendor: gl.getParameter(gl.VENDOR), glRenderer: gl.getParameter(gl.RENDERER),
      rowOrder: 'WebGL readPixels bottom-row-first; preserve byte order and load flipY=false.' };
  } finally {
    renderer.setRenderTarget(previous.target, previous.face, previous.mip);
    probe?.dispose();
    atlas?.dispose();
    generator?.dispose();
    environment?.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  }
}

Object.assign(window, { bakeCafeEnvironment });
