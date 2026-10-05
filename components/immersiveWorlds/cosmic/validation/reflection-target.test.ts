import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { inspectCosmicFramebuffer, prepareCosmicReflection } from '../reflectionTarget';

const COMPLETE = 0x8cd5;
const INCOMPLETE = 0x8cdd;

type ProbeEvent = {
  kind: 'bind' | 'dispose';
  type: THREE.TextureDataType;
  format: string | null;
  width: number;
  height: number;
  face?: number;
  mip?: number;
};

function fixture({ float = false, halfFloat = false, statuses = [COMPLETE] }: {
  float?: boolean;
  halfFloat?: boolean;
  statuses?: (number | Error)[];
} = {}) {
  const target = new THREE.WebGLRenderTarget(1024, 1024, { type: THREE.HalfFloatType, samples: 4 });
  const previous = new THREE.WebGLRenderTarget(16, 16);
  let current: THREE.WebGLRenderTarget | null = previous;
  let face = 3;
  let mip = 2;
  const events: ProbeEvent[] = [];
  const pending = [...statuses];
  const snapshot = (): Omit<ProbeEvent, 'kind'> => ({
    type: target.texture.type,
    format: target.texture.internalFormat,
    width: target.width,
    height: target.height,
  });
  target.addEventListener('dispose', () => events.push({ kind: 'dispose', ...snapshot() }));
  // A renderer-local double only: no WebGL/Three prototypes or real extension
  // claims are replaced. Binding is the first possible allocation boundary.
  const gl = {
    FRAMEBUFFER: 0x8d40,
    FRAMEBUFFER_COMPLETE: COMPLETE,
    COLOR_ATTACHMENT0: 0x8ce0,
    FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: 0x8211,
    FLOAT: 0x1406,
    UNSIGNED_NORMALIZED: 0x8c17,
    getExtension: vi.fn((name: string) => {
      if (name === 'EXT_color_buffer_float') return float ? {} : null;
      if (name === 'EXT_color_buffer_half_float') return halfFloat ? {} : null;
      throw new Error(`Unexpected extension: ${name}`);
    }),
    checkFramebufferStatus: vi.fn(() => {
      expect(current).toBe(target);
      expect([face, mip]).toEqual([0, 0]);
      const status = pending.shift() ?? COMPLETE;
      if (status instanceof Error) throw status;
      return status;
    }),
    getFramebufferAttachmentParameter: vi.fn(() =>
      current!.texture.type === THREE.HalfFloatType ? 0x1406 : 0x8c17),
  };
  const renderer = {
    getRenderTarget: () => current,
    getActiveCubeFace: () => face,
    getActiveMipmapLevel: () => mip,
    getContext: () => gl,
    setRenderTarget: vi.fn((next: THREE.WebGLRenderTarget | null, nextFace = 0, nextMip = 0) => {
      current = next;
      face = nextFace;
      mip = nextMip;
      if (next === target) events.push({ kind: 'bind', ...snapshot(), face, mip });
    }),
  };
  return {
    target, previous, events, gl, mock: renderer,
    renderer: renderer as unknown as THREE.WebGLRenderer,
    assertRestored() {
      expect(current).toBe(previous);
      expect([face, mip]).toEqual([3, 2]);
      expect(renderer.setRenderTarget).toHaveBeenLastCalledWith(previous, 3, 2);
    },
    dispose() { target.dispose(); previous.dispose(); },
  };
}

describe('cosmic reflection framebuffer compatibility', () => {
  it.each([
    { label: 'float extension', float: true, halfFloat: false, type: THREE.HalfFloatType, format: 'RGBA16F' },
    { label: 'half-float extension alone', float: false, halfFloat: true, type: THREE.HalfFloatType, format: 'RGBA16F' },
    { label: 'both extensions', float: true, halfFloat: true, type: THREE.HalfFloatType, format: 'RGBA16F' },
    { label: 'neither extension', float: false, halfFloat: false, type: THREE.UnsignedByteType, format: 'RGBA8' },
  ])('chooses $format before first allocation with $label', ({ float, halfFloat, type, format }) => {
    const f = fixture({ float, halfFloat });
    try {
      const controller = prepareCosmicReflection(f.renderer, f.target);
      expect(f.events).toEqual([{ kind: 'bind', type, format, width: 1024, height: 1024, face: 0, mip: 0 }]);
      expect(f.gl.getExtension.mock.calls.map(call => call[0])).toEqual([
        'EXT_color_buffer_float', 'EXT_color_buffer_half_float',
      ]);
      expect(f.target.texture.format).toBe(THREE.RGBAFormat);
      expect(f.target.texture.colorSpace).toBe(THREE.NoColorSpace);
      expect(f.target.samples).toBe(0);
      expect(controller.getDiagnostics()).toMatchObject({
        support: { float, halfFloat }, type, format, framebufferComplete: true,
        componentType: type === THREE.HalfFloatType ? f.gl.FLOAT : f.gl.UNSIGNED_NORMALIZED,
      });
      f.assertRestored();
    } finally { f.dispose(); }
  });

  it('forces byte before allocation while reporting the real supported extensions', () => {
    const f = fixture({ float: true, halfFloat: true });
    try {
      const controller = prepareCosmicReflection(f.renderer, f.target, 'byte');
      expect(f.events[0]).toMatchObject({ kind: 'bind', type: THREE.UnsignedByteType, format: 'RGBA8' });
      expect(controller.getDiagnostics()).toMatchObject({
        mode: 'byte', support: { float: true, halfFloat: true }, reason: 'forced-byte-validation',
        type: THREE.UnsignedByteType, format: 'RGBA8', framebufferComplete: true,
      });
      expect(f.events.some(event => event.kind === 'bind' && event.type === THREE.HalfFloatType)).toBe(false);
      f.assertRestored();
    } finally { f.dispose(); }
  });

  it('disposes an incomplete half allocation before binding a byte replacement', () => {
    const f = fixture({ halfFloat: true, statuses: [INCOMPLETE, COMPLETE] });
    try {
      const controller = prepareCosmicReflection(f.renderer, f.target);
      expect(f.events.map(({ kind, type }) => ({ kind, type }))).toEqual([
        { kind: 'bind', type: THREE.HalfFloatType },
        { kind: 'dispose', type: THREE.HalfFloatType },
        { kind: 'bind', type: THREE.UnsignedByteType },
      ]);
      const result = controller.getDiagnostics();
      expect(result.reason).toBe('half-float-framebuffer-incomplete');
      expect(result.attempts).toEqual([
        { format: 'RGBA16F', status: INCOMPLETE, complete: false, componentType: null },
        { format: 'RGBA8', status: COMPLETE, complete: true, componentType: f.gl.UNSIGNED_NORMALIZED },
      ]);
      expect(f.mock.setRenderTarget.mock.calls.filter(([target]) => target === f.previous)).toEqual([
        [f.previous, 3, 2], [f.previous, 3, 2],
      ]);
      f.assertRestored();
    } finally { f.dispose(); }
  });

  it('rejects an incomplete byte framebuffer and restores the previous target state', () => {
    const f = fixture({ statuses: [INCOMPLETE] });
    try {
      expect(() => prepareCosmicReflection(f.renderer, f.target)).toThrow('Cosmic reflection framebuffer incomplete: 0x8cdd');
      expect(f.events.filter(event => event.kind === 'bind')).toHaveLength(1);
      expect(f.events[0].type).toBe(THREE.UnsignedByteType);
      expect(f.gl.getFramebufferAttachmentParameter).not.toHaveBeenCalled();
      f.assertRestored();
    } finally { f.dispose(); }
  });

  it('restores target, face and mip when the framebuffer probe throws', () => {
    const failure = new Error('Probe interrupted');
    const f = fixture({ statuses: [failure] });
    try {
      expect(() => inspectCosmicFramebuffer(f.renderer, f.target)).toThrow(failure);
      f.assertRestored();
    } finally { f.dispose(); }
  });

  it('checks a resized allocation and falls back safely if the new half allocation is incomplete', () => {
    const f = fixture({ float: true, statuses: [COMPLETE, INCOMPLETE, COMPLETE] });
    try {
      const controller = prepareCosmicReflection(f.renderer, f.target);
      controller.setSize(1024);
      expect(f.gl.checkFramebufferStatus).toHaveBeenCalledTimes(1);
      controller.setSize(768);
      expect(f.events.map(({ kind, type, width, height }) => ({ kind, type, width, height }))).toEqual([
        { kind: 'bind', type: THREE.HalfFloatType, width: 1024, height: 1024 },
        { kind: 'dispose', type: THREE.HalfFloatType, width: 768, height: 768 },
        { kind: 'bind', type: THREE.HalfFloatType, width: 768, height: 768 },
        { kind: 'dispose', type: THREE.HalfFloatType, width: 768, height: 768 },
        { kind: 'bind', type: THREE.UnsignedByteType, width: 768, height: 768 },
      ]);
      expect(controller.getDiagnostics()).toMatchObject({
        width: 768, height: 768, type: THREE.UnsignedByteType,
        format: 'RGBA8', framebufferComplete: true, reason: 'half-float-framebuffer-incomplete',
      });
      f.assertRestored();
    } finally { f.dispose(); }
  });
});
