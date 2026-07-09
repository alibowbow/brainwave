import { describe, it, expect, beforeEach } from 'vitest';
import { BinauralEngine, CRICKET_AM, StartConfig, ToneMode, createSoftClipCurve, finalizeNoiseChannel } from './audioEngine';
import { BackgroundSoundType } from '../types';
import { DEFAULT_MIX_VOLUMES, MAX_LAYER_VOLUME, TONE_MODE_TRIM, clampLayerVolume, countAudibleLayers, layerGain, levelToGain, natureBusGain, natureMixCompensation, normalizeMixVolumes } from '../audioLevels';

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
const oscillatorNodes: OscillatorNode[] = [];
const timeoutCallbacks = new Map<number, () => void>();
let nextTimerId = 0;

class OscillatorNode extends GNode {
  type = 'sine'; frequency = new Param(440); detune = new Param(0); onended: any = null; stopped = false;
  start() {}
  stop() { this.stopped = true; }
}
class AudioBufferSourceNode extends GNode { buffer: any = null; loop = false; playbackRate = new Param(1); onended: any = null; start() {} stop() {} }
class StereoPannerNode extends GNode { pan = new Param(0); }
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
  constructor(_ch: number, len: number) { this._len = len; this.duration = len / 48000; }
  getChannelData() { return new Float32Array(this._len); }
}
class AudioContextMock {
  sampleRate = 48000; currentTime = 0; state = 'running'; destination = new GNode();
  resume() {} close() {}
  createGain() { return new GainNode(); }
  createBiquadFilter() { return new BiquadFilterNode(); }
  createOscillator() { const node = new OscillatorNode(); oscillatorNodes.push(node); return node; }
  createBufferSource() { return new AudioBufferSourceNode(); }
  createStereoPanner() { return new StereoPannerNode(); }
  createConvolver() { return new ConvolverNode(); }
  createChannelMerger() { return new ChannelMergerNode(); }
  createDynamicsCompressor() { return new DynamicsCompressorNode(); }
  createWaveShaper() { return new WaveShaperNode(); }
  createAnalyser() { return new AnalyserMock(); }
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

describe('BinauralEngine multi-voice', () => {
  let e: BinauralEngine;
  beforeEach(() => {
    oscillatorNodes.length = 0;
    timeoutCallbacks.clear();
    e = new BinauralEngine();
  });

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

  it('waits for the tone fade before replacing mode oscillators', () => {
    e.start(cfg([]));
    const original = oscillatorNodes.slice();
    e.setMode('isochronic');
    expect(original.every((node) => !node.stopped)).toBe(true);
    expect(timeoutCallbacks.size).toBe(1);
    [...timeoutCallbacks.values()][0]();
    expect(original.every((node) => node.stopped)).toBe(true);
    expect(oscillatorNodes.length).toBeGreaterThan(original.length);
    e.stop();
  });

  it('constructs every nature-sound generator without error', () => {
    const nature: BackgroundSoundType[] = ['rain', 'thunder', 'stream', 'waterfall', 'wave', 'fire', 'forest', 'birds', 'cuckoo', 'woodpecker', 'ducks', 'cave', 'cicadas', 'frogs', 'owl', 'night', 'chimes', 'bowl', 'drone', 'blizzard', 'seabirds', 'fan', 'white', 'pink'];
    e.start(cfg([]));
    expect(() => nature.forEach((s) => e.addSound(s, 0.5))).not.toThrow();
    expect(e.activeSoundTypes().length).toBe(nature.length);
    e.dispose();
  });

  it('exposes an analyser while running and releases it on stop', () => {
    expect(e.getAnalyser()).toBeNull();
    e.start(cfg([{ type: 'rain', volume: 0.8 }]));
    expect(e.getAnalyser()).not.toBeNull();
    e.stop();
    expect(e.getAnalyser()).toBeNull();
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

describe('audio quality invariants', () => {
  it('keeps cricket amplitude modulation above zero', () => {
    expect(CRICKET_AM.bedBase - CRICKET_AM.bedDepth).toBeGreaterThan(0);
    expect(CRICKET_AM.chirpBase - CRICKET_AM.chirpDepth).toBeGreaterThan(0);
    expect(CRICKET_AM.bedBase + CRICKET_AM.bedDepth).toBeLessThanOrEqual(1);
    expect(CRICKET_AM.chirpBase + CRICKET_AM.chirpDepth).toBeLessThanOrEqual(1);
  });

  it('normalizes procedural noise, removes DC and closes the loop seam', () => {
    const data = Float32Array.from({ length: 4096 }, (_, index) => 0.25 + Math.sin(index * 0.17) * 0.7);
    finalizeNoiseChannel(data, 0.2, 48000);
    const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
    const peak = data.reduce((max, value) => Math.max(max, Math.abs(value)), 0);
    const rms = Math.sqrt(data.reduce((sum, value) => sum + value * value, 0) / data.length);
    expect(Math.abs(mean)).toBeLessThan(0.01);
    expect(peak).toBeLessThanOrEqual(0.95);
    expect(rms).toBeGreaterThan(0.18);
    expect(rms).toBeLessThan(0.22);
    expect(data[data.length - 1]).toBeCloseTo(data[0], 6);
    expect(Math.abs(data[0]) + Math.abs(data[1])).toBeGreaterThan(0.001);
  });

  it('caps the post-compressor safety curve below full scale', () => {
    const curve = createSoftClipCurve();
    const peak = curve.reduce((max, value) => Math.max(max, Math.abs(value)), 0);
    expect(curve.length).toBe(4096);
    expect(peak).toBeLessThan(0.981);
    expect(curve[0]).toBeCloseTo(-curve[curve.length - 1], 6);
    expect(curve[Math.floor(curve.length * 0.75)]).toBeCloseTo(0.5, 2);
  });

  it('uses a perceptual bus curve and compensates stacked layers', () => {
    expect(levelToGain(0)).toBe(0);
    expect(levelToGain(1)).toBe(1);
    expect(levelToGain(0.5)).toBeLessThan(0.5);
    expect(natureMixCompensation(1)).toBe(1);
    expect(countAudibleLayers([0.8, 0, 0.4, Number.NaN])).toBe(2);
    expect(natureMixCompensation(4)).toBeLessThan(natureMixCompensation(2));
    expect(natureBusGain(0.8, 4)).toBeLessThan(natureBusGain(0.8, 1));
  });

  it('clamps individual layer boost to the safe mixer range', () => {
    expect(clampLayerVolume(-1)).toBe(0);
    expect(clampLayerVolume(99)).toBe(MAX_LAYER_VOLUME);
    expect(layerGain('stream', 0.5)).toBeGreaterThan(layerGain('forest', 0.5));
    expect(layerGain('white', 99)).toBeLessThanOrEqual(2.5);
  });

  it('matches the lower-RMS isochronic mode with a larger tone trim', () => {
    expect(TONE_MODE_TRIM.isochronic).toBeGreaterThan(TONE_MODE_TRIM.binaural);
  });

  it('falls back safely when persisted mixer values are malformed', () => {
    const restored = normalizeMixVolumes({ master: 'loud' as unknown as number, bg: Number.NaN });
    expect(restored.master).toBe(DEFAULT_MIX_VOLUMES.master);
    expect(restored.bg).toBe(DEFAULT_MIX_VOLUMES.bg);
  });
});
