import { describe, it, expect, beforeEach } from 'vitest';
import { BinauralEngine, StartConfig, ToneMode } from './audioEngine';
import { BackgroundSoundType } from '../types';

// --- Minimal Web Audio mock (no real audio rendering) ---
class Param {
  value: number;
  constructor(v = 0) { this.value = v; }
  setValueAtTime() { return this; }
  linearRampToValueAtTime() { return this; }
  exponentialRampToValueAtTime() { return this; }
  setTargetAtTime() { return this; }
  cancelScheduledValues() { return this; }
}
class GNode { connect(d: any) { return d; } disconnect() {} }
class GainNode extends GNode { gain = new Param(1); }
class BiquadFilterNode extends GNode { type = 'lowpass'; frequency = new Param(350); Q = new Param(1); }
class OscillatorNode extends GNode { type = 'sine'; frequency = new Param(440); detune = new Param(0); onended: any = null; start() {} stop() {} }
class AudioBufferSourceNode extends GNode { buffer: any = null; loop = false; playbackRate = new Param(1); onended: any = null; start() {} stop() {} }
class StereoPannerNode extends GNode { pan = new Param(0); }
class ConvolverNode extends GNode { buffer: any = null; }
class ChannelMergerNode extends GNode {}
class DynamicsCompressorNode extends GNode {
  threshold = new Param(-24); knee = new Param(30); ratio = new Param(12); attack = new Param(0.003); release = new Param(0.25);
}
class AudioBufferMock {
  _len: number;
  constructor(_ch: number, len: number) { this._len = len; }
  getChannelData() { return new Float32Array(this._len); }
}
class AudioContextMock {
  sampleRate = 48000; currentTime = 0; state = 'running'; destination = new GNode();
  resume() {} close() {}
  createGain() { return new GainNode(); }
  createBiquadFilter() { return new BiquadFilterNode(); }
  createOscillator() { return new OscillatorNode(); }
  createBufferSource() { return new AudioBufferSourceNode(); }
  createStereoPanner() { return new StereoPannerNode(); }
  createConvolver() { return new ConvolverNode(); }
  createChannelMerger() { return new ChannelMergerNode(); }
  createDynamicsCompressor() { return new DynamicsCompressorNode(); }
  createBuffer(ch: number, len: number) { return new AudioBufferMock(ch, len); }
}

const g = globalThis as any;
g.OscillatorNode = OscillatorNode;
g.AudioBufferSourceNode = AudioBufferSourceNode;
g.window = { AudioContext: AudioContextMock, setInterval: () => 0, clearInterval: () => {}, setTimeout: () => 0, clearTimeout: () => {} };

const cfg = (sounds: { type: BackgroundSoundType; volume: number }[], mode: ToneMode = 'binaural'): StartConfig => ({
  base: 200, beat: 10, mode, masterVol: 0.5, binauralVol: 0.4, bgVol: 0.5, sounds,
});

describe('BinauralEngine multi-voice', () => {
  let e: BinauralEngine;
  beforeEach(() => { e = new BinauralEngine(); });

  it('starts with the configured layers and clears them on stop', () => {
    e.start(cfg([{ type: 'rain', volume: 0.8 }, { type: 'fire', volume: 0.6 }]));
    expect(e.activeSoundTypes().sort()).toEqual(['fire', 'rain']);
    e.stop();
    expect(e.activeSoundTypes()).toEqual([]);
  });

  it('layers sounds in and out independently', () => {
    e.start(cfg([{ type: 'rain', volume: 0.8 }]));
    e.addSound('fire', 0.5);
    e.addSound('bowl', 0.5);
    expect(e.activeSoundTypes().sort()).toEqual(['bowl', 'fire', 'rain']);
    e.removeSound('rain');
    expect(e.activeSoundTypes().sort()).toEqual(['bowl', 'fire']);
    e.stop();
  });

  it('does not duplicate an already-active layer', () => {
    e.start(cfg([{ type: 'rain', volume: 0.8 }]));
    e.addSound('rain', 0.3);
    expect(e.activeSoundTypes()).toEqual(['rain']);
    e.stop();
  });

  it('reconciles the active set via setSounds', () => {
    e.start(cfg([{ type: 'rain', volume: 0.8 }, { type: 'fire', volume: 0.5 }]));
    e.setSounds([{ type: 'rain', volume: 0.6 }, { type: 'drone', volume: 0.4 }]);
    expect(e.activeSoundTypes().sort()).toEqual(['drone', 'rain']);
    e.stop();
  });

  it('switches tone mode, brainwave and volumes without throwing', () => {
    e.start(cfg([], 'binaural'));
    expect(() => {
      e.setMode('isochronic');
      e.setBrainwave(220, 40);
      e.setMode('binaural');
      e.setVolumes(0.6, 0.5, 0.5);
    }).not.toThrow();
    e.stop();
  });

  it('constructs every nature-sound generator without error', () => {
    const nature: BackgroundSoundType[] = ['rain', 'thunder', 'stream', 'wave', 'fire', 'forest', 'birds', 'night', 'chimes', 'bowl', 'drone', 'fan', 'white', 'pink'];
    e.start(cfg([]));
    expect(() => nature.forEach((s) => e.addSound(s, 0.5))).not.toThrow();
    expect(e.activeSoundTypes().length).toBe(nature.length);
    e.dispose();
  });

  it('runs an isochronic (gamma) session, chime and fade-out without throwing', () => {
    expect(() => {
      e.start(cfg([{ type: 'drone', volume: 0.7 }], 'isochronic'));
      e.playCompletionChime();
      e.fadeOutStop(1);
      e.dispose();
    }).not.toThrow();
  });
});
