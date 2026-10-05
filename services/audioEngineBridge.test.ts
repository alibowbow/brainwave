import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BinauralEngine, type StartConfig, type ToneMode } from './audioEngine';
import type { BackgroundSoundType } from '../types';
const accentFactory = vi.hoisted(() => ({ make: vi.fn(), instances: [] as any[] }));

// --- Minimal Web Audio mock (no real audio rendering) ---
class Param {
  value: number;
  targets: number[] = [];
  constructor(v = 0) { this.value = v; }
  setValueAtTime(value: number) { this.value = value; return this; }
  linearRampToValueAtTime(value: number) { this.value = value; return this; }
  exponentialRampToValueAtTime(value: number) { this.value = value; return this; }
  setTargetAtTime(value: number) { this.value = value; this.targets.push(value); return this; }
  setValueCurveAtTime(values: Float32Array) { this.value = values[values.length - 1]; this.curves.push(values); return this; }
  curves: Float32Array[] = [];
  cancelScheduledValues() { return this; }
}
class GNode { connect(d: any) { return d; } disconnect() {} }
class GainNode extends GNode { gain = new Param(1); }
class BiquadFilterNode extends GNode { type = 'lowpass'; frequency = new Param(350); Q = new Param(1); }
const oscillatorNodes: OscillatorNode[] = [];
const compressorNodes: DynamicsCompressorNode[] = [];
const bufferSourceNodes: AudioBufferSourceNode[] = [];
class MediaElementMock {
  src = '';
  removedSource = false;
  preload = '';
  loop = false;
  crossOrigin = '';
  played = false;
  paused = true;
  canPlayType() { return 'probably'; }
  play() { this.played = true; this.paused = false; return Promise.resolve(); }
  pause() { this.paused = true; }
  removeAttribute() { this.removedSource = true; }
  load() {}
}
const mediaElements: MediaElementMock[] = [];
const timeoutCallbacks = new Map<number, () => void>();
let nextTimerId = 0;

class OscillatorNode extends GNode {
  type = 'sine'; frequency = new Param(440); detune = new Param(0); onended: any = null; stopped = false;
  start() {}
  stop() { this.stopped = true; }
}
class AudioBufferSourceNode extends GNode {
  buffer: any = null;
  loop = false;
  loopStart = 0;
  loopEnd = 0;
  playbackRate = new Param(1);
  onended: any = null;
  started = false;
  startArgs: number[] = [];
  start(...args: number[]) { this.started = true; this.startArgs = args; }
  stop() {}
}
class StereoPannerNode extends GNode { pan = new Param(0); }
class DelayNodeMock extends GNode { delayTime = new Param(0); }
class ConvolverNode extends GNode { buffer: any = null; }
class ChannelMergerNode extends GNode {}
class DynamicsCompressorNode extends GNode {
  threshold = new Param(-24); knee = new Param(30); ratio = new Param(12); attack = new Param(0.003); release = new Param(0.25);
}
class WaveShaperNode extends GNode { curve: Float32Array | null = null; oversample = 'none'; }
class AnalyserMock extends GNode {
  fftSize = 2048; smoothingTimeConstant = 0.8; frequencyBinCount = 1024;
  getByteFrequencyData() {}
  getByteTimeDomainData() {}
}
class AudioBufferMock {
  _len: number;
  duration: number;
  numberOfChannels: number;
  length: number;
  sampleRate = 48000;
  constructor(ch: number, len: number) {
    this.numberOfChannels = ch;
    this.length = len;
    this._len = len;
    this.duration = len / this.sampleRate;
  }
  getChannelData() { return new Float32Array(this._len); }
}
class AudioContextMock {
  sampleRate = 48000; currentTime = 0; state = 'running'; destination = new GNode();
  resume() {} close() {}
  createGain() { return new GainNode(); }
  createBiquadFilter() { return new BiquadFilterNode(); }
  createOscillator() { const node = new OscillatorNode(); oscillatorNodes.push(node); return node; }
  createBufferSource() { const node = new AudioBufferSourceNode(); bufferSourceNodes.push(node); return node; }
  createStereoPanner() { return new StereoPannerNode(); }
  createDelay() { return new DelayNodeMock(); }
  createConvolver() { return new ConvolverNode(); }
  createChannelMerger() { return new ChannelMergerNode(); }
  createDynamicsCompressor() { const node = new DynamicsCompressorNode(); compressorNodes.push(node); return node; }
  createWaveShaper() { return new WaveShaperNode(); }
  createAnalyser() { return new AnalyserMock(); }
  createMediaElementSource() { return new GNode(); }
  createBuffer(ch: number, len: number) { return new AudioBufferMock(ch, len); }
}

const g = globalThis as any;
g.OscillatorNode = OscillatorNode;
g.AudioBufferSourceNode = AudioBufferSourceNode;
g.window = {
  AudioContext: AudioContextMock,
  setInterval: () => 0,
  clearInterval: () => {},
  setTimeout: (callback: () => void) => {
    const id = ++nextTimerId;
    timeoutCallbacks.set(id, callback);
    return id;
  },
  clearTimeout: (id: number) => timeoutCallbacks.delete(id),
};

const cfg = (sounds: { type: BackgroundSoundType; volume: number }[], mode: ToneMode = 'binaural'): StartConfig => ({
  base: 200, beat: 10, mode, masterVol: 0.5, binauralVol: 0.4, bgVol: 0.5, sounds,
});


const open = { active: true, muted: false, gateOpen: true };
const cue = { kind: 'water-drop' as const, intensity: .2, pan: 0 };

describe('engine graph lifetime with the immersive controller bridge', () => {
  let engine: BinauralEngine;
  beforeEach(() => {
    accentFactory.instances.length = 0;
    accentFactory.make.mockReset().mockImplementation((deps: any) => {
      let state = { active: false, muted: true, gateOpen: false };
      let disposed = false;
      const instance = {
        deps,
        setState: vi.fn((next: typeof state) => { state = next; }),
        trigger: vi.fn(() => !disposed && state.active && !state.muted && state.gateOpen),
        pause: vi.fn(() => { state = { ...state, active: false }; }),
        release: vi.fn(),
        dispose: vi.fn(() => { disposed = true; }),
      };
      accentFactory.instances.push(instance);
      return instance;
    });
    timeoutCallbacks.clear();
    delete g.document;
    engine = new BinauralEngine();
    engine.setImmersiveAccentFactory(accentFactory.make);
  });

  it('priming a context is not permission to construct or trigger accents', async () => {
    expect(await engine.preparePlayback(new AbortController().signal)).toBe('running');
    engine.setImmersiveAccentState(open);
    expect(engine.isPlaybackReady()).toBe(false);
    expect(accentFactory.make).not.toHaveBeenCalled();
    expect(engine.triggerImmersiveAccent(cue)).toBe(false);
    engine.dispose();
  });

  it('uses the existing background bus and cannot be recreated by a synchronous stop observer', () => {
    engine.start(cfg([]));
    const unlisten = engine.onPlaybackState(() => engine.setImmersiveAccentState(open));
    const first = accentFactory.instances[0];
    expect(first.deps.context).toBe((engine as any).ctx);
    expect(first.deps.output).toBe((engine as any).bgBus);
    expect(first.deps.output).not.toBe((engine as any).ctx.destination);
    expect(engine.triggerImmersiveAccent(cue)).toBe(true);
    engine.stop();
    expect(first.dispose).toHaveBeenCalledTimes(1);
    expect(accentFactory.make).toHaveBeenCalledTimes(1);
    expect(engine.triggerImmersiveAccent(cue)).toBe(false);
    engine.start(cfg([]));
    expect(accentFactory.make).toHaveBeenCalledTimes(2);
    unlisten(); engine.dispose();
  });

  it('keeps same-graph holder changes on one controller, preserving its rate-limit owner', () => {
    engine.start(cfg([])); engine.setImmersiveAccentState(open);
    engine.pauseImmersiveAccents();
    engine.setImmersiveAccentState(open);
    expect(accentFactory.make).toHaveBeenCalledTimes(1);
    expect(accentFactory.instances[0].dispose).not.toHaveBeenCalled();
    engine.dispose();
  });

  it.each(['master', 'nature'] as const)('closes %s silence before a subsequent touch', (which) => {
    engine.start(cfg([])); engine.setImmersiveAccentState(open);
    engine.setVolumes(which === 'master' ? 0 : .5, .4, which === 'nature' ? 0 : .5);
    expect(engine.triggerImmersiveAccent(cue)).toBe(false);
    expect(accentFactory.instances[0].setState).toHaveBeenLastCalledWith({ active: false, muted: true, gateOpen: false });
    engine.setImmersiveAccentState(open);
    expect(engine.triggerImmersiveAccent(cue)).toBe(false);
    engine.dispose();
  });

  it('suspension closes state and fade closes graph readiness immediately, before deferred cleanup', () => {
    engine.start(cfg([])); engine.setImmersiveAccentState(open);
    const ctx = (engine as any).ctx;
    ctx.state = 'suspended'; ctx.onstatechange();
    expect(engine.triggerImmersiveAccent(cue)).toBe(false);
    expect(accentFactory.instances[0].setState).toHaveBeenLastCalledWith({ active: false, muted: true, gateOpen: false });
    ctx.state = 'running'; ctx.onstatechange();
    engine.setImmersiveAccentState(open);
    engine.fadeOutStop(12);
    expect(engine.isPlaybackReady()).toBe(false);
    engine.setImmersiveAccentState(open);
    expect(engine.triggerImmersiveAccent(cue)).toBe(false);
    expect(accentFactory.instances[0].pause).toHaveBeenCalled();
    engine.dispose();
  });

  it('muted restored and replacement layers are physically zero even when the UI retains their fader value', () => {
    engine.start({ ...cfg([]), sounds: [{ type: 'brown', volume: .8, muted: true }] });
    expect((engine as any).voices.get('brown').volume).toBe(0);
    engine.setSounds([{ type: 'brown', volume: .7, muted: false }]);
    expect((engine as any).voices.get('brown').volume).toBe(.7);
    engine.setSounds([{ type: 'brown', volume: .7, muted: true }]);
    expect((engine as any).voices.get('brown').volume).toBe(0);
    engine.dispose();
  });

  it('releases an existing cue before lowering or removing its source', () => {
    engine.start(cfg([{ type: 'brown', volume: .6 }])); engine.setImmersiveAccentState(open);
    const controller = accentFactory.instances[0];
    engine.setSoundVolume('brown', .3);
    expect(controller.release).toHaveBeenCalledTimes(1);
    engine.removeSound('brown');
    expect(controller.release).toHaveBeenCalledTimes(2);
    engine.dispose();
  });
});
