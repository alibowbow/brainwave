/** Minimal WebGL 2 helpers: full-screen passes into textures, nothing more. */

export const FULLSCREEN_VERTEX = /* glsl */ `#version 300 es
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;

export interface Pass {
  program: WebGLProgram;
  uniforms: Map<string, WebGLUniformLocation>;
  /** Kept until the program is checked, for their compile logs. */
  shaders: WebGLShader[];
}

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Could not create shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
};

/** Compile a pass (full screen unless given a vertex shader); errors surface when the program is first checked. */
export function createPass(gl: WebGL2RenderingContext, fragment: string, vertexSource = FULLSCREEN_VERTEX): Pass {
  const program = gl.createProgram();
  if (!program) throw new Error('Could not create program');
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const shader = compile(gl, gl.FRAGMENT_SHADER, fragment);
  gl.attachShader(program, vertex);
  gl.attachShader(program, shader);
  gl.linkProgram(program);
  return { program, uniforms: new Map(), shaders: [vertex, shader] };
}

/** Finish linking (after any parallel compilation) and read uniform locations. */
export function finishPass(gl: WebGL2RenderingContext, pass: Pass) {
  const linked = gl.getProgramParameter(pass.program, gl.LINK_STATUS);
  const logs = linked ? [] : pass.shaders.map((shader) => gl.getShaderInfoLog(shader) ?? '').filter(Boolean);
  for (const shader of pass.shaders) gl.deleteShader(shader);
  pass.shaders = [];
  if (!linked) {
    const log = gl.getProgramInfoLog(pass.program) ?? '';
    throw new Error(`Shader program failed to link: ${[log, ...logs].join('\n')}`);
  }
  const count = gl.getProgramParameter(pass.program, gl.ACTIVE_UNIFORMS) as number;
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(pass.program, i);
    if (!info) continue;
    const location = gl.getUniformLocation(pass.program, info.name);
    if (location) pass.uniforms.set(info.name.replace(/\[0\]$/, ''), location);
  }
}

export interface TextureFormat {
  internalFormat: number;
  format: number;
  type: number;
  filter: number;
}

export interface Texture {
  texture: WebGLTexture;
  width: number;
  height: number;
}

export function createTexture(gl: WebGL2RenderingContext, width: number, height: number, spec: TextureFormat): Texture {
  const texture = gl.createTexture();
  if (!texture) throw new Error('Could not create texture');
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, spec.internalFormat, width, height, 0, spec.format, spec.type, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, spec.filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, spec.filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return { texture, width, height };
}

/** A framebuffer drawing into the given textures (multiple render targets in order). */
export interface Target {
  framebuffer: WebGLFramebuffer;
  width: number;
  height: number;
}

export function createTarget(gl: WebGL2RenderingContext, textures: Texture[]): Target {
  const framebuffer = gl.createFramebuffer();
  if (!framebuffer) throw new Error('Could not create framebuffer');
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  textures.forEach((item, index) => {
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + index, gl.TEXTURE_2D, item.texture, 0);
  });
  gl.drawBuffers(textures.map((_, index) => gl.COLOR_ATTACHMENT0 + index));
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  if (status !== gl.FRAMEBUFFER_COMPLETE) throw new Error(`Framebuffer incomplete (${status})`);
  return { framebuffer, width: textures[0].width, height: textures[0].height };
}

export const formats = (gl: WebGL2RenderingContext) => ({
  linear: { internalFormat: gl.RGBA8, format: gl.RGBA, type: gl.UNSIGNED_BYTE, filter: gl.LINEAR },
  nearest: { internalFormat: gl.RGBA8, format: gl.RGBA, type: gl.UNSIGNED_BYTE, filter: gl.NEAREST },
});
