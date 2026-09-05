import { BackgroundSoundType } from '../types';
import { TONE_MODE_TRIM, clampLayerVolume, clampUnit, layerGain, levelToGain, natureBusGain, natureMixLoad } from '../audioLevels';
import {
  NATURE_SAMPLE_ASSETS,
  NATURE_SAMPLE_BINDINGS,
  natureSampleUrls,
  sampleLayerGain,
  type NatureSampleId,
} from '../audioSamples';
import { DecodedSampleCache, type SampleBufferCache, type SampleLease } from './sampleAudio';
import { DEPTH_MIX, SPATIAL, spatialPan } from '../sceneLayout';

// Length of the looping noise buffers. Longer buffers make the loop point far
// less audible than a short 1-2s loop.
const NOISE_SECONDS = 8;
const MODE_SWITCH_MS = 70;
export const SOFT_CLIP_CEILING = 0.98;
export const FINAL_OUTPUT_GAIN = 0.72;

export const CRICKET_AM = {
  chirpBase: 0.55,
  chirpDepth: 0.35,
} as const;

export const createSoftClipCurve = (samples = 4096, ceiling = SOFT_CLIP_CEILING) => {
  const length = Math.max(32, Math.floor(samples));
  const safeCeiling = Math.max(0.85, Math.min(0.99, ceiling));
  const knee = 0.8;
  const curve = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    const x = (i / (length - 1)) * 2 - 1;
    const magnitude = Math.abs(x);
    const phase = Math.max(0, (magnitude - knee) / (1 - knee));
    const shaped = magnitude <= knee ? magnitude : magnitude - (1 - safeCeiling) * phase * phase;
    curve[i] = Math.sign(x) * shaped;
  }
  return curve;
};

export const finalizeNoiseChannel = (data: Float32Array, targetRms: number, sampleRate: number) => {
  if (!data.length) return data;
  let mean = 0;
  for (let i = 0; i < data.length; i++) mean += data[i];
  mean /= data.length;

  let sumSquares = 0;
  let peak = 0;
  for (let i = 0; i < data.length; i++) {
    const centered = data[i] - mean;
    data[i] = centered;
    sumSquares += centered * centered;
    peak = Math.max(peak, Math.abs(centered));
  }
  const rms = Math.sqrt(sumSquares / data.length);
  const desiredScale = rms > 0 ? targetRms / rms : 1;
  const peakSafeScale = peak > 0 ? 0.95 / peak : 1;
  const scale = Math.min(desiredScale, peakSafeScale);
  for (let i = 0; i < data.length; i++) data[i] *= scale;

  // Bend only the final 8ms toward the first sample so colored noise loops
  // without either a hard step or the periodic volume notch caused by fading
  // both ends to silence.
  const edge = Math.min(Math.floor(sampleRate * 0.008), Math.floor(data.length / 2));
  const seamDelta = data[data.length - 1] - data[0];
  for (let i = 0; i < edge; i++) {
    const phase = (i + 1) / edge;
    const smooth = phase * phase * (3 - 2 * phase);
    data[data.length - edge + i] -= seamDelta * smooth;
  }

  // The seam correction is tiny, but re-center and re-normalize so every
  // generated channel still meets the requested RMS and peak constraints.
  mean = 0;
  for (let i = 0; i < data.length; i++) mean += data[i];
  mean /= data.length;
  sumSquares = 0;
  peak = 0;
  for (let i = 0; i < data.length; i++) {
    data[i] -= mean;
    sumSquares += data[i] * data[i];
    peak = Math.max(peak, Math.abs(data[i]));
  }
  const correctedRms = Math.sqrt(sumSquares / data.length);
  const correctedScale = Math.min(
    correctedRms > 0 ? targetRms / correctedRms : 1,
    peak > 0 ? 0.95 / peak : 1,
  );
  for (let i = 0; i < data.length; i++) data[i] *= correctedScale;

  // Floating-point accumulation can leave the final sample a few ulps away.
  if (data.length > 1) {
    data[data.length - 1] = data[0];
  }
  return data;
};

export type ToneMode = 'binaural' | 'isochronic';

export interface SoundLayer {
  type: BackgroundSoundType;
  volume: number;
  /** UI-level mute state. The engine receives a zero gain while muted. */
  muted?: boolean;
}

export interface StartConfig {
  base: number;
  beat: number;
  mode: ToneMode;
  masterVol: number;
  binauralVol: number;
  bgVol: number;
  sounds: SoundLayer[];
}

// Per-sound resource bucket so each layer can be torn down independently.
interface Bucket {
  nodes: AudioNode[];
  intervals: number[];
  timeouts: number[];
  cleanups: (() => void)[];
  disposed: boolean;
}

export type SoundPlaybackState = 'loading' | 'playing' | 'error';
export type SoundPlaybackSnapshot = Partial<Record<BackgroundSoundType, SoundPlaybackState>>;

interface Voice {
  playbackState: SoundPlaybackState;
  gain: GainNode;
  sampleGain: GainNode;
  bucket: Bucket;
  volume: number;
  proceduralMix: number;
  /** True only while a decoded sample is actively contributing to this voice. */
  sampleActive: boolean;
  sampleEventPlaying: boolean;
  activeSampleId: NatureSampleId | null;
  /** Shared spatial tail (pan/distance) fed by both procedural and sample paths. */
  spatialNodes: AudioNode[];
  panner: StereoPannerNode;
}

export class BinauralEngine {
  private ctx: AudioContext | null = null;

  // Tone (brain-wave) path
  private leftOsc: OscillatorNode | null = null;
  private rightOsc: OscillatorNode | null = null;
  private toneNodes: AudioNode[] = [];
  private currentMode: ToneMode = 'binaural';
  private currentBase = 200;
  private currentBeat = 10;

  // Buffers (stereo, with decorrelated left/right channels for natural width)
  private pinkNoiseBuffer: AudioBuffer | null = null;
  private brownNoiseBuffer: AudioBuffer | null = null;
  private whiteNoiseBuffer: AudioBuffer | null = null;
  private impulseBuffer: AudioBuffer | null = null;

  // Mix graph
  private masterGain: GainNode | null = null;
  private dcBlocker: BiquadFilterNode | null = null;
  private mixCompressor: DynamicsCompressorNode | null = null;
  private limiter: DynamicsCompressorNode | null = null;
  private safetyClipper: WaveShaperNode | null = null;
  private outputGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;   // tap for the live visualizer
  private binauralGain: GainNode | null = null;
  private bgBus: GainNode | null = null;        // shared bus for all nature layers (the "자연음" master)
  private reverb: ConvolverNode | null = null;
  private reverbSend: GainNode | null = null;   // per-voice distance sends sum here
  private reverbFilter: BiquadFilterNode | null = null;
  private reverbLp: BiquadFilterNode | null = null;
  private reverbWet: GainNode | null = null;

  // Scene-sync events: generators announce salient moments (a chirp, a bell
  // strike, a thunder roll) so the diorama can animate the matching object.
  private playbackListeners = new Set<(states: SoundPlaybackSnapshot) => void>();

  onPlaybackState(callback: (states: SoundPlaybackSnapshot) => void): () => void {
    this.playbackListeners.add(callback);
    callback(this.getPlaybackStates());
    return () => { this.playbackListeners.delete(callback); };
  }

  getPlaybackStates(): SoundPlaybackSnapshot {
    return Object.fromEntries([...this.voices].map(([type, voice]) => [type,
      this.ctx?.state === 'suspended' && voice.playbackState === 'playing' ? 'loading' : voice.playbackState]));
  }

  private notifyPlayback() {
    const states = this.getPlaybackStates();
    this.playbackListeners.forEach((listener) => listener(states));
  }

  private setPlaybackState(type: BackgroundSoundType, voice: Voice, state: SoundPlaybackState) {
    if (!this.isCurrentVoice(type, voice)) return;
    voice.playbackState = state;
    this.notifyPlayback();
  }

  retrySound(type: BackgroundSoundType) {
    const voice = this.voices.get(type);
    if (!voice || voice.playbackState !== 'error') return;
    const volume = voice.volume;
    this.voices.delete(type);
    this.disposeVoice(voice);
    this.resume();
    this.addSound(type, volume);
  }

  private eventListeners = new Set<(type: BackgroundSoundType) => void>();

  onSoundEvent(cb: (type: BackgroundSoundType) => void): () => void {
    this.eventListeners.add(cb);
    return () => this.eventListeners.delete(cb);
  }

  private emitEvent(type: BackgroundSoundType) {
    this.eventListeners.forEach((cb) => { try { cb(type); } catch { /* listener error is not our problem */ } });
  }

  // Active nature-sound layers, keyed by type.
  private voices: Map<BackgroundSoundType, Voice> = new Map();
  private retiringVoices: Set<Voice> = new Set();
  private pendingCleanups: number[] = [];
  private modeSwitchGeneration = 0;
  private readonly sampleCache: SampleBufferCache;

  private binauralVol = 0.5;
  private natureVol = 0.5;

  constructor(sampleCache: SampleBufferCache = new DecodedSampleCache()) {
    this.sampleCache = sampleCache;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.ctx.onstatechange = () => this.notifyPlayback();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.pinkNoiseBuffer) this.pinkNoiseBuffer = this.createPinkNoiseBuffer();
    if (!this.brownNoiseBuffer) this.brownNoiseBuffer = this.createBrownNoiseBuffer();
    if (!this.whiteNoiseBuffer) this.whiteNoiseBuffer = this.createWhiteNoiseBuffer();
    if (!this.impulseBuffer) this.impulseBuffer = this.createImpulseResponse();
  }

  start(config: StartConfig) {
    this.init();
    if (!this.ctx) return;
    this.stop();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = levelToGain(config.masterVol);

    // Remove sub-audible/DC energy from procedural noise before dynamics. This
    // preserves headroom on phone speakers and keeps the limiter from pumping.
    this.dcBlocker = this.ctx.createBiquadFilter();
    this.dcBlocker.type = 'highpass';
    this.dcBlocker.frequency.value = 24;
    this.dcBlocker.Q.value = 0.7;

    // A slow, low-ratio glue stage brings quiet texture forward without the
    // audible pumping caused by asking the safety limiter to do the mixing.
    this.mixCompressor = this.ctx.createDynamicsCompressor();
    this.mixCompressor.threshold.value = -17;
    this.mixCompressor.knee.value = 12;
    this.mixCompressor.ratio.value = 2;
    this.mixCompressor.attack.value = 0.028;
    this.mixCompressor.release.value = 0.26;

    // Fast peak guard for stacked creature calls and close raindrops.
    this.limiter = this.ctx.createDynamicsCompressor();
    this.limiter.threshold.value = -2;
    this.limiter.knee.value = 1;
    this.limiter.ratio.value = 20;
    this.limiter.attack.value = 0.002;
    this.limiter.release.value = 0.12;
    this.safetyClipper = this.ctx.createWaveShaper();
    this.safetyClipper.curve = createSoftClipCurve();
    this.safetyClipper.oversample = '4x';
    this.outputGain = this.ctx.createGain();
    // Keep the post-clip output at or below -3 dBFS. The compressor above is
    // a musical peak guard, not a true-peak brick-wall limiter.
    this.outputGain.gain.value = FINAL_OUTPUT_GAIN;
    this.masterGain.connect(this.dcBlocker);
    this.dcBlocker.connect(this.mixCompressor);
    this.mixCompressor.connect(this.limiter);
    this.limiter.connect(this.safetyClipper);
    this.safetyClipper.connect(this.outputGain);
    this.outputGain.connect(this.ctx.destination);

    // Analyser tap for the live aura visualizer (sees the full pre-limiter mix).
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 512;
    this.analyser.smoothingTimeConstant = 0.82;
    this.masterGain.connect(this.analyser);

    // Brain-wave tone bus (gently faded in).
    this.binauralVol = clampUnit(config.binauralVol);
    this.binauralGain = this.ctx.createGain();
    this.binauralGain.gain.value = 0;
    this.binauralGain.connect(this.masterGain);
    this.currentMode = config.mode;
    this.currentBase = config.base;
    this.currentBeat = config.beat;
    this.buildTone(config.base, config.beat, config.mode);
    this.binauralGain.gain.setTargetAtTime(
      levelToGain(this.binauralVol) * TONE_MODE_TRIM[this.currentMode],
      this.ctx.currentTime,
      0.4,
    );

    // Nature-sound bus + shared reverb send for depth.
    this.natureVol = clampUnit(config.bgVol);
    this.bgBus = this.ctx.createGain();
    const initialMixLoad = natureMixLoad(config.sounds.filter((sound) => sound.type !== 'none'));
    this.bgBus.gain.value = natureBusGain(this.natureVol, initialMixLoad);
    this.bgBus.connect(this.masterGain);
    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = this.impulseBuffer;
    this.reverbFilter = this.ctx.createBiquadFilter();
    this.reverbFilter.type = 'highpass';
    this.reverbFilter.frequency.value = 150;
    this.reverbFilter.Q.value = 0.7;
    // Band-limit the wet tail on both ends: bright discrete events (cricket
    // chirps, drips, taps) ringing through the convolver read as an "echo",
    // so anything above ~2.2 kHz stays dry.
    this.reverbLp = this.ctx.createBiquadFilter();
    this.reverbLp.type = 'lowpass';
    this.reverbLp.frequency.value = 2600;
    this.reverbLp.Q.value = 0.7;
    this.reverbWet = this.ctx.createGain();
    this.reverbWet.gain.value = 0.5;
    // Distance-based sends: each voice feeds the room according to its scene
    // depth (a far temple bell is much wetter than the campfire at your feet),
    // scaled by the same nature-bus gain so the wet field tracks the mix.
    this.reverbSend = this.ctx.createGain();
    this.reverbSend.gain.value = this.bgBus.gain.value;
    this.reverbSend.connect(this.reverb);
    this.reverb.connect(this.reverbFilter).connect(this.reverbLp).connect(this.reverbWet).connect(this.masterGain);

    this.voices = new Map();
    config.sounds.forEach((s) => this.addSound(s.type, s.volume, 0.8, false));
  }

  // --- Brain-wave tone path ---
  private buildTone(base: number, beat: number, mode: ToneMode) {
    if (!this.ctx || !this.binauralGain) return;
    this.teardownTone();

    if (mode === 'isochronic') {
      // Single carrier, amplitude-gated at the beat frequency. Works on speakers
      // (no left/right separation required).
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = base;
      const gate = this.ctx.createGain();
      gate.gain.value = 0.5;
      osc.connect(gate).connect(this.binauralGain);

      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = beat;
      const depth = this.ctx.createGain();
      depth.gain.value = 0.5;
      lfo.connect(depth).connect(gate.gain);

      osc.start();
      lfo.start();
      this.toneNodes = [osc, lfo];
    } else {
      const merger = this.ctx.createChannelMerger(2);
      merger.connect(this.binauralGain);

      this.leftOsc = this.ctx.createOscillator();
      this.leftOsc.type = 'sine';
      this.leftOsc.frequency.value = base;
      this.leftOsc.connect(merger, 0, 0);

      this.rightOsc = this.ctx.createOscillator();
      this.rightOsc.type = 'sine';
      this.rightOsc.frequency.value = base + beat;
      this.rightOsc.connect(merger, 0, 1);

      this.leftOsc.start();
      this.rightOsc.start();
      this.toneNodes = [this.leftOsc, this.rightOsc];
    }
  }

  private teardownTone() {
    this.toneNodes.forEach((n) => {
      try { (n as OscillatorNode).stop?.(); n.disconnect(); } catch (e) { /* ignore */ }
    });
    this.toneNodes = [];
    this.leftOsc = null;
    this.rightOsc = null;
  }

  setMode(mode: ToneMode) {
    if (mode === this.currentMode || !this.ctx) return;
    this.currentMode = mode;
    const generation = ++this.modeSwitchGeneration;
    const now = this.ctx.currentTime;
    this.binauralGain?.gain.setTargetAtTime(0, now, 0.012);
    this.schedulePendingCleanup(() => {
      if (!this.ctx || generation !== this.modeSwitchGeneration || mode !== this.currentMode) return;
      this.buildTone(this.currentBase, this.currentBeat, mode);
      this.updateToneGain(0.06);
    }, MODE_SWITCH_MS);
  }

  setBrainwave(base: number, beat: number) {
    this.currentBase = base;
    this.currentBeat = beat;
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    if (this.currentMode === 'isochronic') {
      const osc = this.toneNodes[0] as OscillatorNode | undefined;
      const lfo = this.toneNodes[1] as OscillatorNode | undefined;
      osc?.frequency.setTargetAtTime(base, t, 0.3);
      lfo?.frequency.setTargetAtTime(beat, t, 0.3);
    } else {
      this.leftOsc?.frequency.setTargetAtTime(base, t, 0.5);
      this.rightOsc?.frequency.setTargetAtTime(base + beat, t, 0.5);
    }
  }

  setVolumes(master: number, binaural: number, bg: number) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.binauralVol = clampUnit(binaural);
    this.natureVol = clampUnit(bg);
    if (this.masterGain) this.masterGain.gain.setTargetAtTime(levelToGain(master), t, 0.12);
    this.updateToneGain();
    this.updateNatureBusGain(0.16);
  }

  private updateToneGain(timeConstant = 0.12) {
    if (!this.ctx || !this.binauralGain) return;
    const trim = TONE_MODE_TRIM[this.currentMode];
    this.binauralGain.gain.setTargetAtTime(levelToGain(this.binauralVol) * trim, this.ctx.currentTime, timeConstant);
  }

  private updateNatureBusGain(timeConstant = 0.2) {
    if (!this.ctx || !this.bgBus) return;
    const mixLoad = natureMixLoad(
      [...this.voices.entries()].map(([type, voice]) => ({ type, volume: voice.volume })),
    );
    const bus = natureBusGain(this.natureVol, mixLoad);
    this.bgBus.gain.setTargetAtTime(bus, this.ctx.currentTime, timeConstant);
    // The wet field scales with the dry bus so distance stays proportional.
    this.reverbSend?.gain.setTargetAtTime(bus, this.ctx.currentTime, timeConstant);
  }

  // --- Nature-sound layering ---
  addSound(type: BackgroundSoundType, volume: number, fadeSec = 0.8, updateBus = true) {
    if (!this.ctx || !this.bgBus || type === 'none') return;
    const existing = this.voices.get(type);
    if (existing) { this.setSoundVolume(type, volume); return; }

    const safeVolume = clampLayerVolume(volume);
    const binding = NATURE_SAMPLE_BINDINGS[type];
    const sampleOnly = Boolean(binding?.assetIds.length && binding.proceduralMix === 0);
    const gain = this.ctx.createGain();
    gain.gain.value = 0;
    const sampleGain = this.ctx.createGain();
    sampleGain.gain.value = 0;

    // Spatial tail matching the diorama: the object's on-screen x becomes the
    // stereo position, and its depth sets dry level, reverb send and (for far
    // sources) an air-loss lowpass — near is present and dry, far is soft and
    // roomy. Both the procedural and sample paths share the same tail.
    const spec = SPATIAL[type];
    const mix = DEPTH_MIX[spec?.depth ?? 'mid'];
    const spatialNodes: AudioNode[] = [];
    const spatialIn = this.ctx.createGain();
    spatialIn.gain.value = 1;
    spatialNodes.push(spatialIn);
    let head: AudioNode = spatialIn;
    if (mix.lowpass != null) {
      const air = this.ctx.createBiquadFilter();
      air.type = 'lowpass';
      air.frequency.value = mix.lowpass;
      air.Q.value = 0.5;
      head.connect(air);
      head = air;
      spatialNodes.push(air);
    }
    const panner = this.ctx.createStereoPanner();
    panner.pan.value = spatialPan(type);
    head.connect(panner);
    spatialNodes.push(panner);
    const dry = this.ctx.createGain();
    dry.gain.value = mix.trim;
    panner.connect(dry);
    dry.connect(this.bgBus);
    spatialNodes.push(dry);
    if (this.reverbSend) {
      const send = this.ctx.createGain();
      send.gain.value = mix.send;
      panner.connect(send);
      send.connect(this.reverbSend);
      spatialNodes.push(send);
    }
    gain.connect(spatialIn);
    sampleGain.connect(spatialIn);

    const bucket: Bucket = { nodes: [], intervals: [], timeouts: [], cleanups: [], disposed: false };
    this.playBackgroundSound(type, gain, bucket);
    const voice: Voice = {
      playbackState: sampleOnly ? 'loading' : 'playing',
      gain,
      sampleGain,
      bucket,
      volume: safeVolume,
      proceduralMix: sampleOnly ? 0 : 1,
      sampleActive: false,
      sampleEventPlaying: false,
      activeSampleId: null,
      spatialNodes,
      panner,
    };
    this.voices.set(type, voice);
    gain.gain.setTargetAtTime(
      layerGain(type, safeVolume) * (sampleOnly ? 0 : 1),
      this.ctx.currentTime,
      fadeSec / 3,
    );
    this.notifyPlayback();
    this.startHybridSample(type, voice);
    if (updateBus) this.updateNatureBusGain(fadeSec / 3);
  }

  removeSound(type: BackgroundSoundType, fadeSec = 0.8) {
    const voice = this.voices.get(type);
    if (!voice || !this.ctx) return;
    this.voices.delete(type);
    this.notifyPlayback();
    this.retiringVoices.add(voice);
    voice.gain.gain.setTargetAtTime(0, this.ctx.currentTime, fadeSec / 3);
    voice.sampleGain.gain.setTargetAtTime(0, this.ctx.currentTime, fadeSec / 3);
    this.updateNatureBusGain(fadeSec / 3);
    this.schedulePendingCleanup(() => {
      this.retiringVoices.delete(voice);
      this.disposeVoice(voice);
    }, Math.ceil(fadeSec * 1000) + 400);
  }

  setScenePositions(positions: Partial<Record<BackgroundSoundType, number>>) {
    if (!this.ctx) return;
    this.voices.forEach((voice, type) => {
      const x = positions[type];
      const pan = SPATIAL[type]?.wide ? 0 : x == null ? spatialPan(type) : Math.max(-0.6, Math.min(0.6, (x - 0.5) * 1.3));
      voice.panner.pan.setTargetAtTime(pan, this.ctx!.currentTime, 0.15);
    });
  }

  setSoundVolume(type: BackgroundSoundType, volume: number, fadeSec = 0.24) {
    const voice = this.voices.get(type);
    if (!voice || !this.ctx) return;
    const safeVolume = clampLayerVolume(volume);
    const wasAudible = voice.volume > 0.001;
    voice.volume = safeVolume;
    voice.gain.gain.setTargetAtTime(
      layerGain(type, safeVolume) * voice.proceduralMix,
      this.ctx.currentTime,
      Math.max(0.005, fadeSec / 3),
    );
    if (voice.activeSampleId) {
      voice.sampleGain.gain.setTargetAtTime(
        sampleLayerGain(type, voice.activeSampleId, safeVolume),
        this.ctx.currentTime,
        Math.max(0.005, fadeSec / 3),
      );
    }
    if (wasAudible !== (safeVolume > 0.001)) this.updateNatureBusGain(0.08);
  }

  // Reconcile active layers to a desired set (add missing, drop extra, update volumes).
  setSounds(layers: SoundLayer[], fadeSec = 0.8) {
    const desired = new Map(layers.map((l) => [l.type, l.volume] as const));
    for (const type of [...this.voices.keys()]) {
      if (!desired.has(type)) this.removeSound(type, fadeSec);
    }
    for (const [type, vol] of desired) {
      if (this.voices.has(type)) this.setSoundVolume(type, vol, fadeSec);
      else this.addSound(type, vol, fadeSec);
    }
  }

  activeSoundTypes(): BackgroundSoundType[] {
    return [...this.voices.keys()];
  }

  activeSampleTypes(): BackgroundSoundType[] {
    return [...this.voices.entries()].filter(([, voice]) => voice.sampleActive).map(([type]) => type);
  }

  private isCurrentVoice(type: BackgroundSoundType, voice: Voice) {
    return !voice.bucket.disposed && this.voices.get(type) === voice;
  }

  private async acquireNatureSample(assetId: NatureSampleId): Promise<SampleLease> {
    if (!this.ctx) throw new Error('AudioContext is not available');
    const asset = NATURE_SAMPLE_ASSETS[assetId];
    const candidates = natureSampleUrls(assetId);
    let lastError: unknown = new Error(`No supported source for ${assetId}`);
    for (const candidate of candidates) {
      try {
        return await this.sampleCache.acquire(
          this.ctx,
          candidate.url,
          asset.playback === 'loop' ? asset.crossfadeSeconds : 0,
          asset.decodedBytesEstimate,
        );
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError;
  }

  private holdLease(bucket: Bucket, lease: SampleLease) {
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      lease.release();
    };
    bucket.cleanups.push(release);
    return () => {
      release();
      const index = bucket.cleanups.indexOf(release);
      if (index >= 0) bucket.cleanups.splice(index, 1);
    };
  }

  private startHybridSample(type: BackgroundSoundType, voice: Voice) {
    const binding = NATURE_SAMPLE_BINDINGS[type];
    if (!binding?.assetIds.length) return;
    const firstAsset = NATURE_SAMPLE_ASSETS[binding.assetIds[0]];
    if (firstAsset.playback === 'event') {
      this.schedule(voice.bucket, () => this.playSampleEvent(type, voice), 1800 + Math.random() * 2200);
      return;
    }

    const assetId = binding.assetIds[0];
    // Start sample-only recordings synchronously from the user action. This
    // keeps mobile autoplay permission intact and avoids waiting for a binary
    // Web Audio decode before the user's recording can be heard.
    if (binding.proceduralMix === 0 && this.startMediaLoopSample(type, voice, assetId)) {
      return;
    }
    void this.startLoopSample(type, voice, assetId);
  }

  private async startLoopSample(type: BackgroundSoundType, voice: Voice, assetId: NatureSampleId) {
    try {
      const lease = await this.acquireNatureSample(assetId);
      if (!this.ctx || !this.isCurrentVoice(type, voice)) {
        lease.release();
        return;
      }
      this.holdLease(voice.bucket, lease);
      const source = this.ctx.createBufferSource();
      source.buffer = lease.buffer;
      source.loop = true;
      source.loopStart = 0;
      source.loopEnd = lease.buffer.duration;
      source.connect(voice.sampleGain);
      source.start(0, Math.random() * Math.max(0.001, lease.buffer.duration));
      this.register(voice.bucket, source);

      const binding = NATURE_SAMPLE_BINDINGS[type]!;
      voice.sampleActive = true;
      this.setPlaybackState(type, voice, 'playing');
      voice.activeSampleId = assetId;
      voice.proceduralMix = binding.proceduralMix;
      const now = this.ctx.currentTime;
      voice.sampleGain.gain.setTargetAtTime(sampleLayerGain(type, assetId, voice.volume), now, 0.7);
      voice.gain.gain.setTargetAtTime(layerGain(type, voice.volume) * voice.proceduralMix, now, 0.7);
    } catch (error) {
      // Hybrid layers already have their procedural bed. The user recording is
      // sample-only, so retry that same file through an HTML media element if
      // Web Audio's binary decoder rejects it (some mobile/browser builds do).
      if (NATURE_SAMPLE_BINDINGS[type]?.proceduralMix === 0) {
        if (this.isCurrentVoice(type, voice) && !this.startMediaLoopSample(type, voice, assetId)) {
          this.setPlaybackState(type, voice, 'error');
        }
      }
    }
  }

  /**
   * Keep the exact user recording audible when decodeAudioData rejects it.
   * MediaElementAudioSourceNode still travels through the same sample gain,
   * spatial pan, reverb send, and master bus as decoded AudioBuffers.
   */
  private startMediaLoopSample(type: BackgroundSoundType, voice: Voice, assetId: NatureSampleId) {
    if (!this.ctx || typeof document === 'undefined') return false;
    const candidate = natureSampleUrls(assetId)[0];
    if (!candidate) return false;

    try {
      const media = document.createElement('audio');
      media.preload = 'auto';
      media.loop = true;
      media.crossOrigin = 'anonymous';
      media.src = candidate.url;
      if (typeof media.play !== 'function') return false;

      const source = this.ctx.createMediaElementSource(media);
      source.connect(voice.sampleGain);
      this.register(voice.bucket, source);
      voice.bucket.cleanups.push(() => {
        media.pause();
        media.removeAttribute('src');
        media.load();
      });

      const binding = NATURE_SAMPLE_BINDINGS[type]!;
      voice.activeSampleId = assetId;
      voice.proceduralMix = binding.proceduralMix;
      this.setPlaybackState(type, voice, 'loading');
      const now = this.ctx.currentTime;
      voice.sampleGain.gain.setTargetAtTime(sampleLayerGain(type, assetId, voice.volume), now, 0.7);
      voice.gain.gain.setTargetAtTime(layerGain(type, voice.volume) * voice.proceduralMix, now, 0.7);
      const failed = () => {
        if (!this.isCurrentVoice(type, voice)) return;
        voice.sampleActive = false;
        this.setPlaybackState(type, voice, 'error');
      };
      const playing = () => {
        if (!this.isCurrentVoice(type, voice)) return;
        voice.sampleActive = true;
        this.setPlaybackState(type, voice, 'playing');
      };
      const waiting = () => this.setPlaybackState(type, voice, 'loading');
      media.addEventListener?.('error', failed);
      media.addEventListener?.('playing', playing);
      media.addEventListener?.('waiting', waiting);
      media.addEventListener?.('stalled', waiting);
      voice.bucket.cleanups.push(() => {
        media.removeEventListener?.('error', failed);
        media.removeEventListener?.('playing', playing);
        media.removeEventListener?.('waiting', waiting);
        media.removeEventListener?.('stalled', waiting);
      });
      // play() resolving (or the playing event) is the success signal, never
      // the mere creation of a media element. Keep failure visible and retryable.
      void media.play().then(playing).catch(failed);
      return true;
    } catch {
      return false;
    }
  }

  private scheduleNextSampleEvent(type: BackgroundSoundType, voice: Voice) {
    const gap = NATURE_SAMPLE_BINDINGS[type]?.eventGapMs;
    if (!gap || !this.isCurrentVoice(type, voice)) return;
    this.schedule(voice.bucket, () => this.playSampleEvent(type, voice), gap[0] + Math.random() * (gap[1] - gap[0]));
  }

  private async playSampleEvent(type: BackgroundSoundType, voice: Voice) {
    const binding = NATURE_SAMPLE_BINDINGS[type];
    if (!binding || voice.sampleEventPlaying || !this.isCurrentVoice(type, voice)) return;
    voice.sampleEventPlaying = true;
    const assetId = binding.assetIds[Math.floor(Math.random() * binding.assetIds.length)];
    try {
      const lease = await this.acquireNatureSample(assetId);
      if (!this.ctx || !this.isCurrentVoice(type, voice)) {
        lease.release();
        voice.sampleEventPlaying = false;
        return;
      }
      const release = this.holdLease(voice.bucket, lease);
      const source = this.ctx.createBufferSource();
      const envelope = this.ctx.createGain();
      source.buffer = lease.buffer;
      source.loop = false;
      source.connect(envelope).connect(voice.sampleGain);
      voice.bucket.nodes.push(source, envelope);

      const now = this.ctx.currentTime;
      const duration = Math.max(0.5, lease.buffer.duration);
      envelope.gain.setValueAtTime(0, now);
      envelope.gain.linearRampToValueAtTime(1, now + Math.min(0.28, duration * 0.08));
      envelope.gain.setValueAtTime(1, now + Math.max(0.3, duration - 1));
      envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      voice.sampleActive = true;
      voice.activeSampleId = assetId;
      voice.proceduralMix = binding.proceduralMix;
      voice.sampleGain.gain.setTargetAtTime(sampleLayerGain(type, assetId, voice.volume), now, 0.18);
      voice.gain.gain.setTargetAtTime(layerGain(type, voice.volume) * voice.proceduralMix, now, 0.55);

      source.onended = () => {
        release();
        [source, envelope].forEach((node) => {
          const index = voice.bucket.nodes.indexOf(node);
          if (index >= 0) voice.bucket.nodes.splice(index, 1);
          try { node.disconnect(); } catch (e) { /* ignore */ }
        });
        voice.sampleEventPlaying = false;
        voice.sampleActive = false;
        voice.activeSampleId = null;
        voice.proceduralMix = 1;
        if (this.ctx && this.isCurrentVoice(type, voice)) {
          voice.sampleGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.35);
          voice.gain.gain.setTargetAtTime(layerGain(type, voice.volume), this.ctx.currentTime, 0.65);
          this.scheduleNextSampleEvent(type, voice);
        }
      };
      source.start();
    } catch (error) {
      voice.sampleEventPlaying = false;
      voice.sampleActive = false;
      this.scheduleNextSampleEvent(type, voice);
    }
  }

  private disposeVoice(voice: Voice) {
    if (voice.bucket.disposed) return;
    voice.bucket.disposed = true;
    voice.sampleActive = false;
    voice.bucket.nodes.forEach((n) => {
      try { (n as OscillatorNode).stop?.(); n.disconnect(); } catch (e) { /* ignore */ }
    });
    voice.bucket.intervals.forEach((id) => clearInterval(id));
    voice.bucket.timeouts.forEach((id) => clearTimeout(id));
    voice.bucket.cleanups.splice(0).forEach((cleanup) => {
      try { cleanup(); } catch (e) { /* ignore */ }
    });
    try { voice.gain.disconnect(); } catch (e) { /* ignore */ }
    try { voice.sampleGain.disconnect(); } catch (e) { /* ignore */ }
    voice.spatialNodes.forEach((n) => {
      try { n.disconnect(); } catch (e) { /* ignore */ }
    });
  }

  // Keep a reference so the node can be stopped later. `temporary` nodes
  // (occasional tonal one-shots) remove themselves once they finish.
  private register(bucket: Bucket, node: AudioNode, temporary = false) {
    bucket.nodes.push(node);
    if (temporary) {
      (node as AudioScheduledSourceNode).onended = () => {
        const i = bucket.nodes.indexOf(node);
        if (i >= 0) bucket.nodes.splice(i, 1);
        try { node.disconnect(); } catch (e) { /* ignore */ }
      };
    }
  }

  // A short-lived stereo panner feeding a layer's bus, used to scatter discrete
  // events (drops, chirps, drips, chimes...) across the stereo field.
  private makePan(pan: number, dest: AudioNode): StereoPannerNode {
    const panner = this.ctx!.createStereoPanner();
    panner.pan.value = Math.max(-1, Math.min(1, pan));
    panner.connect(dest);
    return panner;
  }

  // A looping stereo noise source, slightly detuned so layered copies beat
  // against each other instead of phasing in lockstep.
  private noiseSource(buffer: AudioBuffer | null, detune = true): AudioBufferSourceNode | null {
    if (!this.ctx || !buffer) return null;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    if (detune) src.playbackRate.value = 0.96 + Math.random() * 0.08;
    return src;
  }

  // Start short noise events from a random point in the buffer. Reusing offset
  // zero made every raindrop, crackle and knock share the same transient, which
  // quickly sounded synthetic. The longer 8s buffers also let thunder tails
  // finish naturally instead of running out of source material.
  private startNoiseBurst(src: AudioBufferSourceNode, when: number, duration: number) {
    const bufferDuration = src.buffer?.duration ?? 0;
    const maxOffset = Math.max(0, bufferDuration - duration - 0.01);
    const offset = maxOffset > 0 ? Math.random() * maxOffset : 0;
    src.start(when, offset);
    src.stop(when + duration);
  }

  private schedule(bucket: Bucket, callback: () => void, delayMs: number) {
    let id = 0;
    id = window.setTimeout(() => {
      const index = bucket.timeouts.indexOf(id);
      if (index >= 0) bucket.timeouts.splice(index, 1);
      callback();
    }, delayMs);
    bucket.timeouts.push(id);
  }

  private schedulePendingCleanup(callback: () => void, delayMs: number) {
    let id = 0;
    id = window.setTimeout(() => {
      const index = this.pendingCleanups.indexOf(id);
      if (index >= 0) this.pendingCleanups.splice(index, 1);
      callback();
    }, delayMs);
    this.pendingCleanups.push(id);
  }

  private playBackgroundSound(type: BackgroundSoundType, dest: AudioNode, bucket: Bucket) {
    switch (type) {
      case 'rain': this.startRain(dest, bucket); break;
      case 'tent': this.startTentRain(dest, bucket); break;
      case 'window': this.startWindowRain(dest, bucket); break;
      case 'eaves': this.startEavesDrips(dest, bucket); break;
      case 'thunder': this.startThunder(dest, bucket); break;
      case 'dthunder': this.startDistantThunder(dest, bucket); break;
      case 'stream': this.startStream(dest, bucket); break;
      case 'pebbles': this.startPebbleBeach(dest, bucket); break;
      case 'deepsea': this.startDeepSea(dest, bucket); break;
      case 'bamboo': this.startBamboo(dest, bucket); break;
      case 'temple': this.startTempleBell(dest, bucket); break;
      case 'scops': this.startScopsOwl(dest, bucket); break;
      case 'heartbeat': this.startHeartbeat(dest, bucket); break;
      case 'brown': this.startBrownNoise(dest, bucket); break;
      case 'waterfall': this.startWaterfall(dest, bucket); break;
      case 'wave': this.startWave(dest, bucket); break;
      case 'fire': this.startFire(dest, bucket); break;
      case 'forest': this.startWind(dest, bucket); break;
      case 'birds': this.startBirds(dest, bucket); break;
      case 'cuckoo': this.startCuckoo(dest, bucket); break;
      case 'woodpecker': this.startWoodpecker(dest, bucket); break;
      case 'ducks': this.startDucks(dest, bucket); break;
      case 'cave': this.startCave(dest, bucket); break;
      case 'cicadas': this.startCicadas(dest, bucket); break;
      case 'owl': this.startOwl(dest, bucket); break;
      case 'night': this.startCrickets(dest, bucket); break;
      // The user's rural field recording is sample-only. Do not substitute the generic night-insect generator.
      case 'ruralCrickets': break;
      case 'chimes': this.startChimes(dest, bucket); break;
      case 'bowl': this.startBowl(dest, bucket); break;
      case 'drone': this.startDrone(dest, bucket); break;
      case 'blizzard': this.startBlizzard(dest, bucket); break;
      case 'seabirds': this.startSeabirds(dest, bucket); break;
      case 'fan': this.startFan(dest, bucket); break;
      case 'white': this.startWhiteNoise(dest, bucket); break;
      case 'pink': this.startPinkNoise(dest, bucket); break;
    }
  }

  // --- Buffer Generators (stereo) ---
  createPinkNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = NOISE_SECONDS * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const output = buffer.getChannelData(ch);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
      finalizeNoiseChannel(output, 0.2, this.ctx.sampleRate);
    }
    return buffer;
  }

  createBrownNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = NOISE_SECONDS * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const output = buffer.getChannelData(ch);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
      finalizeNoiseChannel(output, 0.2, this.ctx.sampleRate);
    }
    return buffer;
  }

  createWhiteNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = NOISE_SECONDS * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const output = buffer.getChannelData(ch);
      for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
      finalizeNoiseChannel(output, 0.5, this.ctx.sampleRate);
    }
    return buffer;
  }

  // Short predelay, scattered early reflections and a decorrelated diffuse
  // tail. A raw full-level noise impulse starts with a click-like wall and can
  // make drips or bird calls sound metallic; this envelope leaves the direct
  // sound intact and opens into a softer outdoor/room halo.
  createImpulseResponse() {
    if (!this.ctx) return null;
    const length = Math.floor(this.ctx.sampleRate * 2.05);
    const buffer = this.ctx.createBuffer(2, length, this.ctx.sampleRate);
    const preDelay = Math.floor(this.ctx.sampleRate * 0.012);
    const attack = Math.floor(this.ctx.sampleRate * 0.018);
    const earlyTimes = [0.024, 0.041, 0.067, 0.096];
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      let diffuse = 0;
      for (let i = preDelay; i < length; i++) {
        const phase = (i - preDelay) / (length - preDelay);
        const fadeIn = Math.min(1, (i - preDelay) / attack);
        const decay = Math.pow(1 - phase, 3.5 + ch * 0.25);
        const white = Math.random() * 2 - 1;
        diffuse = diffuse * 0.32 + white * 0.68;
        data[i] = diffuse * decay * fadeIn * 0.72;
      }
      earlyTimes.forEach((seconds, index) => {
        const sample = Math.min(length - 1, Math.floor(seconds * this.ctx!.sampleRate) + ch * (index % 2 ? 13 : -7));
        data[sample] += (index % 2 ? -1 : 1) * (0.44 / (index + 1));
      });
      // A tiny channel-specific tilt keeps the wet field from collapsing to
      // mono while avoiding exaggerated ping-pong reflections.
      if (ch === 1) {
        for (let i = preDelay + 1; i < length; i++) data[i] = data[i] * 0.94 + data[i - 1] * 0.06;
      }
    }
    return buffer;
  }

  // --- 1. RAIN ---
  private startRain(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer || !this.brownNoiseBuffer) return;

    const heavyNode = this.noiseSource(this.brownNoiseBuffer)!;
    const heavyFilter = this.ctx.createBiquadFilter();
    heavyFilter.type = 'lowpass';
    heavyFilter.frequency.value = 250;
    const heavyGain = this.ctx.createGain();
    heavyGain.gain.value = 0.85;
    heavyNode.connect(heavyFilter).connect(heavyGain).connect(dest);
    heavyNode.start();
    this.register(bucket, heavyNode);

    const hissNode = this.noiseSource(this.pinkNoiseBuffer)!;
    const hissFilter = this.ctx.createBiquadFilter();
    hissFilter.type = 'lowpass';
    hissFilter.frequency.value = 700;
    const hissGain = this.ctx.createGain();
    hissGain.gain.value = 0.58;
    hissNode.connect(hissFilter).connect(hissGain).connect(dest);
    hissNode.start();
    this.register(bucket, hissNode);

    const makeDrop = () => {
      if (!this.ctx || !this.brownNoiseBuffer) return;
      const t = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.brownNoiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      const r = Math.random();
      if (r < 0.005) {
        filter.type = 'bandpass';
        filter.frequency.value = 1500 + Math.random() * 1000;
        filter.Q.value = 8 + Math.random() * 4;
      } else if (r < 0.4) {
        filter.type = 'lowpass';
        filter.frequency.value = 350 + Math.random() * 200;
        filter.Q.value = 1;
      } else if (r < 0.8) {
        filter.type = 'bandpass';
        filter.frequency.value = 500 + Math.random() * 300;
        filter.Q.value = 1;
      } else {
        filter.type = 'highpass';
        filter.frequency.value = 900 + Math.random() * 400;
        filter.Q.value = 1.5;
      }

      const gain = this.ctx.createGain();
      src.connect(filter).connect(gain).connect(this.makePan(Math.random() * 1.6 - 0.8, dest));
      gain.gain.setValueAtTime(0, t);
      const attackTime = r < 0.005 ? 0.001 : 0.005;
      const decayTime = r < 0.005 ? 0.15 : 0.12;
      gain.gain.linearRampToValueAtTime(0.95, t + attackTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + decayTime);
      this.startNoiseBurst(src, t, decayTime + 0.05);
    };

    const id = window.setInterval(() => {
      if (Math.random() > 0.15) makeDrop();
      if (Math.random() > 0.5) {
        this.schedule(bucket, makeDrop, 20 + Math.random() * 30);
      }
    }, 70);
    bucket.intervals.push(id);
  }

  // --- 2. THUNDERSTORM (rain bed + distant rolling thunder) ---
  private startThunder(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer) return;
    this.startRain(dest, bucket);

    const boom = () => {
      if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;
      const t = this.ctx.currentTime;
      this.emitEvent('thunder');
      const pan = this.makePan(Math.random() * 0.8 - 0.4, dest);

      // Bright initial crack (the lightning) so the storm reads as more than rain.
      const crackSrc = this.ctx.createBufferSource();
      crackSrc.buffer = this.pinkNoiseBuffer;
      const crackBp = this.ctx.createBiquadFilter();
      crackBp.type = 'bandpass';
      crackBp.frequency.value = 1800 + Math.random() * 1200;
      crackBp.Q.value = 0.7;
      const crackGain = this.ctx.createGain();
      crackGain.gain.setValueAtTime(0, t);
      crackGain.gain.linearRampToValueAtTime(0.9, t + 0.01);
      crackGain.gain.exponentialRampToValueAtTime(0.02, t + 0.25 + Math.random() * 0.2);
      crackGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.66);
      crackSrc.connect(crackBp).connect(crackGain).connect(pan);
      this.startNoiseBurst(crackSrc, t, 0.7);
      this.register(bucket, crackSrc, true);

      // Rolling rumble with mid presence, sweeping down to a deep tail.
      const src = this.ctx.createBufferSource();
      src.buffer = this.brownNoiseBuffer;
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass';
      const gain = this.ctx.createGain();
      src.connect(lp).connect(gain).connect(pan);
      const dur = 3 + Math.random() * 3;
      const peak = 1.1 + Math.random() * 0.5;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(peak, t + 0.08 + Math.random() * 0.25);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      lp.frequency.setValueAtTime(900, t);
      lp.frequency.exponentialRampToValueAtTime(110, t + dur);
      this.startNoiseBurst(src, t, dur + 0.1);
      this.register(bucket, src, true);

      this.schedule(bucket, boom, 7000 + Math.random() * 12000);
    };

    this.schedule(bucket, boom, 2500 + Math.random() * 4000);
  }

  // --- 3. STREAM (flowing water bed + bubbling drips) ---
  private startStream(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer || !this.brownNoiseBuffer) return;

    // A brook, not a waterfall: barely any dark channel mass, a light and
    // slightly higher tumbling body, and the surface fizz — the "졸졸"
    // character comes from the drips below, not from broadband roar.
    const channel = this.noiseSource(this.brownNoiseBuffer)!;
    const channelLp = this.ctx.createBiquadFilter();
    channelLp.type = 'lowpass'; channelLp.frequency.value = 300;
    const channelGain = this.ctx.createGain();
    channelGain.gain.value = 0.16;
    channel.connect(channelLp).connect(channelGain).connect(dest);
    channel.start();
    this.register(bucket, channel);

    const bed = this.noiseSource(this.pinkNoiseBuffer)!;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = 1150; bp.Q.value = 0.5;
    const bedGain = this.ctx.createGain();
    bedGain.gain.value = 0.6;
    bed.connect(bp).connect(bedGain).connect(dest);
    bed.start();
    this.register(bucket, bed);

    const sparkle = this.noiseSource(this.pinkNoiseBuffer)!;
    const sparkleHp = this.ctx.createBiquadFilter();
    sparkleHp.type = 'highpass'; sparkleHp.frequency.value = 1700;
    const sparkleLp = this.ctx.createBiquadFilter();
    sparkleLp.type = 'lowpass'; sparkleLp.frequency.value = 6200;
    const sparkleGain = this.ctx.createGain();
    sparkleGain.gain.value = 0.15;
    sparkle.connect(sparkleHp).connect(sparkleLp).connect(sparkleGain).connect(dest);
    sparkle.start();
    this.register(bucket, sparkle);

    // Different, incommensurate drifts prevent the broadband bed from feeling
    // like one filter being swept back and forth.
    const colorLfo = this.ctx.createOscillator();
    colorLfo.frequency.value = 0.11 + Math.random() * 0.04;
    const colorDepth = this.ctx.createGain();
    colorDepth.gain.value = 250;
    colorLfo.connect(colorDepth).connect(bp.frequency);
    colorLfo.start();
    this.register(bucket, colorLfo);

    const flowLfo = this.ctx.createOscillator();
    flowLfo.frequency.value = 0.07 + Math.random() * 0.03;
    const flowDepth = this.ctx.createGain();
    flowDepth.gain.value = 0.12;
    flowLfo.connect(flowDepth).connect(bedGain.gain);
    flowLfo.start();
    this.register(bucket, flowLfo);

    // Water drips are short resonant noise bursts with a slight upward pitch
    // bend ("plip"), deliberately noise-based and low/mid-pitched so they read
    // as water rather than the pure-tone downward sweep that sounded bird-like.
    const drip = () => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const t = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.pinkNoiseBuffer;
      const bpf = this.ctx.createBiquadFilter();
      bpf.type = 'bandpass';
      const f = 280 + Math.random() * 620;
      bpf.frequency.setValueAtTime(f, t);
      bpf.frequency.exponentialRampToValueAtTime(f * 1.6, t + 0.05);
      bpf.Q.value = 3 + Math.random() * 3;
      const gain = this.ctx.createGain();
      const dur = 0.055 + Math.random() * 0.09;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.34 + Math.random() * 0.16, t + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(bpf).connect(gain).connect(this.makePan(Math.random() * 1.4 - 0.7, dest));
      this.startNoiseBurst(src, t, dur + 0.02);

      // Denser plip pattern — this is where the "졸졸" lives.
      this.schedule(bucket, drip, 70 + Math.random() * 240);
    };
    drip();
  }

  // --- 4. BIRDS ---
  private startBirds(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer) return;

    const playSparrowChirp = (t: number, dur: number = 0.1) => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const pan = this.makePan(Math.random() * 1.6 - 0.8, dest);
      const osc = this.ctx.createOscillator();
      const harmonic = this.ctx.createOscillator();
      const harmonicGain = this.ctx.createGain();
      harmonicGain.gain.value = 0.16 + Math.random() * 0.08;
      const voiceFilter = this.ctx.createBiquadFilter();
      voiceFilter.type = 'lowpass'; voiceFilter.frequency.value = 4800;
      const pulse = this.ctx.createGain();
      pulse.gain.value = 0.72;
      const flutter = this.ctx.createOscillator();
      flutter.frequency.value = 23 + Math.random() * 17;
      const flutterDepth = this.ctx.createGain();
      flutterDepth.gain.value = 0.2;
      flutter.connect(flutterDepth).connect(pulse.gain);
      const gain = this.ctx.createGain();
      osc.connect(pulse).connect(voiceFilter).connect(gain).connect(pan);
      harmonic.connect(harmonicGain).connect(pulse);
      osc.type = 'sine';
      harmonic.type = 'triangle';
      const startFreq = 1250 + Math.random() * 950;
      const crestFreq = startFreq * (1.25 + Math.random() * 0.35);
      const endFreq = startFreq * (0.82 + Math.random() * 0.28);
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(crestFreq, t + dur * 0.35);
      osc.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
      harmonic.frequency.setValueAtTime(startFreq * 2.01, t);
      harmonic.frequency.exponentialRampToValueAtTime(crestFreq * 2.01, t + dur * 0.35);
      harmonic.frequency.exponentialRampToValueAtTime(endFreq * 2.01, t + dur);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(1.1, t + Math.min(0.018, dur * 0.18));
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.start(t); harmonic.start(t); flutter.start(t);
      osc.stop(t + dur + 0.05);
      harmonic.stop(t + dur + 0.05);
      flutter.stop(t + dur + 0.05);
      this.register(bucket, osc, true);
      this.register(bucket, harmonic, true);
      this.register(bucket, flutter, true);

      // A very short filtered breath softens the pure oscillator edge and
      // makes each syllable feel physically voiced.
      const air = this.ctx.createBufferSource();
      air.buffer = this.pinkNoiseBuffer;
      const airBp = this.ctx.createBiquadFilter();
      airBp.type = 'bandpass'; airBp.frequency.value = 1750 + Math.random() * 1050; airBp.Q.value = 1.1;
      const airEnv = this.ctx.createGain();
      airEnv.gain.setValueAtTime(0, t);
      airEnv.gain.linearRampToValueAtTime(0.18, t + 0.006);
      airEnv.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.75);
      air.connect(airBp).connect(airEnv).connect(pan);
      this.startNoiseBurst(air, t, dur + 0.02);
      this.register(bucket, air, true);
    };

    const playPattern = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      this.emitEvent('birds');
      const p = Math.random();
      if (p < 0.2) playSparrowChirp(t);
      else if (p < 0.4) { playSparrowChirp(t); playSparrowChirp(t + 0.12); }
      else if (p < 0.5) { playSparrowChirp(t); playSparrowChirp(t + 0.12); playSparrowChirp(t + 0.24); }
      else if (p < 0.65) playSparrowChirp(t, 0.25);
      else if (p < 0.8) {
        playSparrowChirp(t);
        this.schedule(bucket, () => { if (this.ctx) playSparrowChirp(this.ctx.currentTime, 0.1); }, 300);
      } else if (p < 0.9) { for (let i = 0; i < 5; i++) playSparrowChirp(t + i * 0.08); }
      else {
        playSparrowChirp(t, 0.15);
        playSparrowChirp(t + 0.2, 0.1);
        playSparrowChirp(t + 0.4, 0.2);
      }
      this.schedule(bucket, playPattern, 800 + Math.random() * 2600);
    };
    playPattern();
  }

  // --- 5. CRICKETS ---
  private startCrickets(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer) return;

    // Just a whisper of dark night air under the chirps. The old continuous
    // 4.3/4.6 kHz AM "chorus" drone read as electrical noise — removed.
    const air = this.noiseSource(this.brownNoiseBuffer)!;
    const airLp = this.ctx.createBiquadFilter();
    airLp.type = 'lowpass'; airLp.frequency.value = 180;
    const airGain = this.ctx.createGain();
    airGain.gain.value = 0.12;
    air.connect(airLp).connect(airGain).connect(dest);
    air.start();
    this.register(bucket, air);

    const playSound = (t: number, dur: number, type: 'short' | 'long') => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = 4500;
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = type === 'long' ? 30 : 40;
      const modGain = this.ctx.createGain();
      modGain.gain.value = CRICKET_AM.chirpBase;
      // Keep the modulation gain positive. Direct ±1 modulation crossed zero
      // and phase-inverted each chirp, creating the 30/40Hz electrical buzz.
      const lfoDepth = this.ctx.createGain();
      lfoDepth.gain.value = CRICKET_AM.chirpDepth;
      lfo.connect(lfoDepth).connect(modGain.gain);
      const env = this.ctx.createGain();
      osc.connect(modGain).connect(env).connect(this.makePan(Math.random() * 1.6 - 0.8, dest));
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.4, t + 0.03);
      env.gain.linearRampToValueAtTime(0.4, t + dur - 0.03);
      env.gain.linearRampToValueAtTime(0, t + dur);
      osc.start(t); lfo.start(t);
      osc.stop(t + dur + 0.1); lfo.stop(t + dur + 0.1);
    };

    const loop = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const r = Math.random();
      if (r < 0.4) playSound(t, 0.15, 'short');
      else if (r < 0.7) playSound(t, 0.4, 'long');
      else if (r < 0.85) { playSound(t, 0.15, 'short'); playSound(t + 0.25, 0.15, 'short'); }
      else { playSound(t, 0.4, 'long'); playSound(t + 0.5, 0.4, 'long'); }
      this.schedule(bucket, loop, 1200 + Math.random() * 2500);
    };
    loop();
  }

  // --- 6. FIRE ---
  private startFire(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;

    const rumble = this.noiseSource(this.brownNoiseBuffer)!;
    const rFilter = this.ctx.createBiquadFilter();
    rFilter.type = 'lowpass'; rFilter.frequency.value = 400;
    const rGain = this.ctx.createGain();
    rGain.gain.value = 1.35;
    rumble.connect(rFilter).connect(rGain).connect(dest);
    rumble.start();
    this.register(bucket, rumble);

    const roar = this.noiseSource(this.pinkNoiseBuffer)!;
    const roarFilter = this.ctx.createBiquadFilter();
    roarFilter.type = 'lowpass'; roarFilter.frequency.value = 600;
    const roarGain = this.ctx.createGain();
    roarGain.gain.value = 0.85;
    roar.connect(roarFilter).connect(roarGain).connect(dest);
    roar.start();
    this.register(bucket, roar);

    const makeCrackle = () => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const t = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.pinkNoiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass'; filter.frequency.value = 500 + Math.random() * 1500; filter.Q.value = 2;
      const gain = this.ctx.createGain();
      src.connect(filter).connect(gain).connect(this.makePan(Math.random() * 1.2 - 0.6, dest));
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(1, t + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
      this.startNoiseBurst(src, t, 0.1);
    };

    const loopCrackle = () => {
      if (Math.random() > 0.3) {
        makeCrackle();
        if (Math.random() > 0.7) {
          this.schedule(bucket, makeCrackle, 50 + Math.random() * 50);
        }
      }
      this.schedule(bucket, loopCrackle, 200 + Math.random() * 1800);
    };
    loopCrackle();

    // Occasional deep log pop for body.
    const pop = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      this.emitEvent('fire');
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, t);
      osc.frequency.exponentialRampToValueAtTime(55, t + 0.06);
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.62, t + 0.004);
      env.gain.exponentialRampToValueAtTime(0.005, t + 0.08);
      osc.connect(env).connect(this.makePan(Math.random() * 0.8 - 0.4, dest));
      osc.start(t); osc.stop(t + 0.1);
      this.schedule(bucket, pop, 3000 + Math.random() * 6000);
    };
    pop();
  }

  // --- 7. WIND / FOREST ---
  private startWind(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer || !this.whiteNoiseBuffer) return;
    const node = this.noiseSource(this.pinkNoiseBuffer)!;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 420; filter.Q.value = 0;
    const windGain = this.ctx.createGain();
    windGain.gain.value = 2.2;
    node.connect(filter).connect(windGain).connect(dest);
    node.start();
    this.register(bucket, node);

    // Leaf rustle: a high band that swells with the gusts, so it reads as
    // trees in wind rather than plain filtered noise.
    const rustle = this.noiseSource(this.whiteNoiseBuffer)!;
    const rustleHp = this.ctx.createBiquadFilter();
    rustleHp.type = 'highpass'; rustleHp.frequency.value = 950;
    const rustleLp = this.ctx.createBiquadFilter();
    rustleLp.type = 'lowpass'; rustleLp.frequency.value = 5200;
    const rustleGain = this.ctx.createGain();
    rustleGain.gain.value = 0.18;
    rustle.connect(rustleHp).connect(rustleLp).connect(rustleGain).connect(dest);
    rustle.start();
    this.register(bucket, rustle);

    const animate = () => {
      if (!this.ctx) return; const t = this.ctx.currentTime;
      const gust = 2 + Math.random() * 4;
      filter.frequency.exponentialRampToValueAtTime(200 + Math.random() * 200, t + gust);
      rustleGain.gain.setTargetAtTime(0.13 + Math.random() * 0.13, t, gust / 3);
    };
    animate();
    const id = window.setInterval(animate, 5000);
    bucket.intervals.push(id);
  }

  // --- 8. WAVE ---
  private startWave(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer || !this.whiteNoiseBuffer) return;

    // Low undertow stays present between crests, avoiding the conspicuous
    // volume hole of a single oscillator-like eight-second swell.
    const undertow = this.noiseSource(this.brownNoiseBuffer)!;
    const undertowLp = this.ctx.createBiquadFilter();
    undertowLp.type = 'lowpass'; undertowLp.frequency.value = 280;
    const undertowGain = this.ctx.createGain();
    undertowGain.gain.value = 0.38;
    undertow.connect(undertowLp).connect(undertowGain).connect(dest);
    undertow.start();
    this.register(bucket, undertow);

    const node = this.noiseSource(this.pinkNoiseBuffer)!;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 430;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.48;
    node.connect(filter).connect(gain).connect(dest);
    node.start();
    this.register(bucket, node);

    // Foam hiss that crests with the swell, then washes out.
    const foam = this.noiseSource(this.whiteNoiseBuffer)!;
    const foamHp = this.ctx.createBiquadFilter();
    foamHp.type = 'highpass'; foamHp.frequency.value = 1800;
    const foamLp = this.ctx.createBiquadFilter();
    foamLp.type = 'lowpass'; foamLp.frequency.value = 8500;
    const foamGain = this.ctx.createGain();
    foamGain.gain.value = 0.022;
    foam.connect(foamHp).connect(foamLp).connect(foamGain).connect(dest);
    foam.start();
    this.register(bucket, foam);

    const animate = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const duration = 7.2 + Math.random() * 4.2;
      const crest = duration * (0.48 + Math.random() * 0.12);
      const power = 1.25 + Math.random() * 0.35;
      const rest = 0.4 + Math.random() * 0.2;
      gain.gain.setValueAtTime(rest, t);
      filter.frequency.setValueAtTime(380 + Math.random() * 100, t);
      foamGain.gain.setValueAtTime(0.018 + Math.random() * 0.012, t);
      undertowGain.gain.setValueAtTime(0.38, t);
      gain.gain.linearRampToValueAtTime(power, t + crest);
      filter.frequency.exponentialRampToValueAtTime(900 + Math.random() * 380, t + crest);
      undertowGain.gain.linearRampToValueAtTime(0.58, t + crest * 0.82);
      foamGain.gain.linearRampToValueAtTime(0.1 + Math.random() * 0.045, t + crest + 0.28);
      gain.gain.exponentialRampToValueAtTime(rest, t + duration);
      filter.frequency.exponentialRampToValueAtTime(330 + Math.random() * 90, t + duration);
      undertowGain.gain.linearRampToValueAtTime(0.34, t + duration);
      foamGain.gain.exponentialRampToValueAtTime(0.02, t + duration);
      this.schedule(bucket, animate, duration * 1000);
    };
    animate();
  }

  // --- WATERFALL (constant broadband roar: mass + body + spray) ---
  private startWaterfall(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer || !this.whiteNoiseBuffer) return;

    const mass = this.noiseSource(this.brownNoiseBuffer)!;
    const massLp = this.ctx.createBiquadFilter();
    massLp.type = 'lowpass'; massLp.frequency.value = 220;
    const massGain = this.ctx.createGain();
    massGain.gain.value = 1.0;
    mass.connect(massLp).connect(massGain).connect(dest);
    mass.start();
    this.register(bucket, mass);

    const body = this.noiseSource(this.pinkNoiseBuffer)!;
    const bodyBp = this.ctx.createBiquadFilter();
    bodyBp.type = 'bandpass'; bodyBp.frequency.value = 750; bodyBp.Q.value = 0.5;
    const bodyGain = this.ctx.createGain();
    bodyGain.gain.value = 0.5;
    body.connect(bodyBp).connect(bodyGain).connect(dest);
    body.start();
    this.register(bucket, body);

    // Slow movement of the body band so the roar doesn't sound frozen.
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.09;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 140;
    lfo.connect(lfoGain).connect(bodyBp.frequency);
    lfo.start();
    this.register(bucket, lfo);

    const massLfo = this.ctx.createOscillator();
    massLfo.frequency.value = 0.047;
    const massDepth = this.ctx.createGain();
    massDepth.gain.value = 0.12;
    massLfo.connect(massDepth).connect(massGain.gain);
    massLfo.start();
    this.register(bucket, massLfo);

    const bodyLfo = this.ctx.createOscillator();
    bodyLfo.frequency.value = 0.073;
    const bodyDepth = this.ctx.createGain();
    bodyDepth.gain.value = 0.075;
    bodyLfo.connect(bodyDepth).connect(bodyGain.gain);
    bodyLfo.start();
    this.register(bucket, bodyLfo);

    const spray = this.noiseSource(this.whiteNoiseBuffer)!;
    const sprayHp = this.ctx.createBiquadFilter();
    sprayHp.type = 'highpass'; sprayHp.frequency.value = 1800;
    const sprayGain = this.ctx.createGain();
    sprayGain.gain.value = 0.05;
    spray.connect(sprayHp).connect(sprayGain).connect(dest);
    spray.start();
    this.register(bucket, spray);

    const sprayLfo = this.ctx.createOscillator();
    sprayLfo.frequency.value = 0.121;
    const sprayDepth = this.ctx.createGain();
    sprayDepth.gain.value = 0.012;
    sprayLfo.connect(sprayDepth).connect(sprayGain.gain);
    sprayLfo.start();
    this.register(bucket, sprayLfo);
  }

  // --- CICADAS (broad, breathing chorus rather than electronic carriers) ---
  private startCicadas(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer) return;

    const voice = (centerHz: number, amHz: number, swellHz: number, pan: number, amount = 1) => {
      const noise = this.noiseSource(this.pinkNoiseBuffer)!;
      const bp = this.ctx!.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = centerHz; bp.Q.value = 1.15;

      const gate = this.ctx!.createGain();
      gate.gain.value = 0.66;
      const am = this.ctx!.createOscillator();
      am.frequency.value = amHz + Math.random() * 7;
      const amDepth = this.ctx!.createGain();
      // Always positive (0.42..0.90): the old zero-crossing gate produced an
      // electrical phase-flip buzz instead of a cloud of insects.
      amDepth.gain.value = 0.24;
      am.connect(amDepth).connect(gate.gain);

      const level = this.ctx!.createGain();
      level.gain.value = 1.65 * amount;
      const swell = this.ctx!.createOscillator();
      swell.frequency.value = swellHz;
      const swellDepth = this.ctx!.createGain();
      swellDepth.gain.value = 0.2 * amount;
      swell.connect(swellDepth).connect(level.gain);

      const color = this.ctx!.createOscillator();
      color.frequency.value = 0.04 + Math.random() * 0.04;
      const colorDepth = this.ctx!.createGain();
      colorDepth.gain.value = 150 + Math.random() * 90;
      color.connect(colorDepth).connect(bp.frequency);

      // A trace of pitched wing resonance supplies definition, while the
      // filtered-noise body carries most of the energy.
      const resonance = this.ctx!.createOscillator();
      resonance.type = 'triangle'; resonance.frequency.value = centerHz * (0.92 + Math.random() * 0.1);
      const resonanceGain = this.ctx!.createGain();
      resonanceGain.gain.value = 0.035 * amount;

      const out = this.makePan(pan, dest);
      noise.connect(bp).connect(gate).connect(level).connect(out);
      resonance.connect(resonanceGain).connect(gate);
      noise.start(); am.start(); swell.start(); color.start(); resonance.start();
      [noise, am, swell, color, resonance].forEach((n) => this.register(bucket, n));
    };

    voice(3150, 92, 0.053, -0.62, 0.9);
    voice(3920, 117, 0.071, 0.1, 1);
    voice(4780, 139, 0.043, 0.68, 0.72);
  }

  // --- OWL (soft distant hoots) ---
  private startOwl(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer) return;

    const hoot = (t: number, dur: number, pan: StereoPannerNode) => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      const start = 315 + Math.random() * 45;
      osc.frequency.setValueAtTime(start, t);
      osc.frequency.exponentialRampToValueAtTime(start * 1.06, t + dur * 0.28);
      osc.frequency.exponentialRampToValueAtTime(start * 0.84, t + dur);
      // A quieter octave partial gives the low hoot enough presence to carry
      // over the bed — a bare ~300 Hz sine reads as too soft on its own.
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(start * 2, t);
      osc2.frequency.exponentialRampToValueAtTime(start * 2.12, t + dur * 0.28);
      osc2.frequency.exponentialRampToValueAtTime(start * 1.68, t + dur);
      const h2 = this.ctx.createGain();
      h2.gain.value = 0.28;
      const vibrato = this.ctx.createOscillator();
      vibrato.frequency.value = 4.2 + Math.random() * 1.3;
      const vibratoDepth = this.ctx.createGain();
      vibratoDepth.gain.value = 3.5;
      vibrato.connect(vibratoDepth);
      vibratoDepth.connect(osc.frequency);
      vibratoDepth.connect(osc2.frequency);
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(1.55, t + Math.min(0.085, dur * 0.22));
      env.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(env).connect(pan);
      osc2.connect(h2).connect(env);
      osc.start(t); vibrato.start(t); osc.stop(t + dur + 0.05);
      osc2.start(t); osc2.stop(t + dur + 0.05);
      vibrato.stop(t + dur + 0.05);
      this.register(bucket, osc, true);
      this.register(bucket, osc2, true);
      this.register(bucket, vibrato, true);

      // Breath/formant noise supplies the soft consonant at the front of a
      // real hoot, so the call is not perceived as two clean sine waves.
      const breath = this.ctx.createBufferSource();
      breath.buffer = this.pinkNoiseBuffer;
      const formant = this.ctx.createBiquadFilter();
      formant.type = 'bandpass'; formant.frequency.value = 620 + Math.random() * 240; formant.Q.value = 1.15;
      const breathEnv = this.ctx.createGain();
      breathEnv.gain.setValueAtTime(0, t);
      breathEnv.gain.linearRampToValueAtTime(0.52, t + 0.035);
      breathEnv.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.82);
      breath.connect(formant).connect(breathEnv).connect(pan);
      this.startNoiseBurst(breath, t, dur + 0.02);
      this.register(bucket, breath, true);
    };

    const call = () => {
      if (!this.ctx) return;
      // Schedule just ahead of currentTime so graph construction never masks
      // the attack, and always answer once for immediate audible feedback.
      const t = this.ctx.currentTime + 0.06;
      this.emitEvent('owl');
      const pan = this.makePan(Math.random() * 1.0 - 0.5, dest);
      hoot(t, 0.46, pan);
      hoot(t + 0.58, 0.3, pan);
      if (Math.random() < 0.65) hoot(t + 0.96, 0.44, pan);
      this.schedule(bucket, call, 4000 + Math.random() * 7000);
    };
    call();
  }

  // --- CUCKOO (iconic soft two-note call, sparse and distant) ---
  private startCuckoo(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx) return;

    const note = (t: number, freq: number, dur: number, pan: StereoPannerNode) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.96, t + dur);
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 1600;
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.92, t + 0.05);
      env.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(lp).connect(env).connect(pan);
      osc.start(t); osc.stop(t + dur + 0.05);
    };

    const call = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      this.emitEvent('cuckoo');
      const pan = this.makePan(Math.random() * 1.2 - 0.6, dest);
      // "뻐-꾹": F#5 then D5
      note(t, 740, 0.3, pan);
      note(t + 0.45, 587, 0.38, pan);
      if (Math.random() < 0.55) { note(t + 1.5, 740, 0.3, pan); note(t + 1.95, 587, 0.38, pan); }
      this.schedule(bucket, call, 8000 + Math.random() * 10000);
    };
    call();
  }

  // --- WOODPECKER (rapid knocking bursts on a hollow trunk) ---
  private startWoodpecker(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx) return;

    const knock = (t: number, pan: StereoPannerNode) => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const src = this.ctx.createBufferSource();
      src.buffer = this.pinkNoiseBuffer;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 1050 + Math.random() * 250; bp.Q.value = 1.7;
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(1.3, t + 0.002);
      env.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);
      src.connect(bp).connect(env).connect(pan);
      this.startNoiseBurst(src, t, 0.065);

      // Hollow-wood thump underneath each knock.
      const thump = this.ctx.createOscillator();
      thump.type = 'sine';
      thump.frequency.setValueAtTime(190, t);
      thump.frequency.exponentialRampToValueAtTime(120, t + 0.04);
      const tEnv = this.ctx.createGain();
      tEnv.gain.setValueAtTime(0, t);
      tEnv.gain.linearRampToValueAtTime(0.95, t + 0.003);
      tEnv.gain.exponentialRampToValueAtTime(0.005, t + 0.07);
      thump.connect(tEnv).connect(pan);
      thump.start(t); thump.stop(t + 0.1);
    };

    const burst = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      this.emitEvent('woodpecker');
      const pan = this.makePan(Math.random() * 1.4 - 0.7, dest);
      const count = 11 + Math.floor(Math.random() * 8);
      const rate = 0.05 + Math.random() * 0.015;
      for (let i = 0; i < count; i++) knock(t + i * rate, pan);
      this.schedule(bucket, burst, 1800 + Math.random() * 3200);
    };
    burst();
  }

  // --- DUCKS (a little raft of quacks on the pond) ---
  private startDucks(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer) return;

    const quack = (t: number, base: number, peak: number, pan: StereoPannerNode) => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(base, t);
      osc.frequency.exponentialRampToValueAtTime(base * 1.08, t + 0.045);
      osc.frequency.exponentialRampToValueAtTime(base * 0.76, t + 0.2);
      const formant = this.ctx.createBiquadFilter();
      formant.type = 'bandpass'; formant.frequency.value = 720 + Math.random() * 100; formant.Q.value = 1.15;
      const upperFormant = this.ctx.createBiquadFilter();
      upperFormant.type = 'bandpass'; upperFormant.frequency.value = 1280 + Math.random() * 180; upperFormant.Q.value = 1.25;
      const upperGain = this.ctx.createGain();
      upperGain.gain.value = 0.34;
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(peak, t + 0.02);
      env.gain.setValueAtTime(peak * 0.8, t + 0.1);
      env.gain.exponentialRampToValueAtTime(0.001, t + 0.23);
      osc.connect(formant).connect(env).connect(pan);
      osc.connect(upperFormant).connect(upperGain).connect(env);
      osc.start(t); osc.stop(t + 0.24);
      this.register(bucket, osc, true);

      const rasp = this.ctx.createBufferSource();
      rasp.buffer = this.pinkNoiseBuffer;
      const raspBp = this.ctx.createBiquadFilter();
      raspBp.type = 'bandpass'; raspBp.frequency.value = 1050; raspBp.Q.value = 0.8;
      const raspEnv = this.ctx.createGain();
      raspEnv.gain.setValueAtTime(0, t);
      raspEnv.gain.linearRampToValueAtTime(0.65 * peak, t + 0.012);
      raspEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      rasp.connect(raspBp).connect(raspEnv).connect(pan);
      this.startNoiseBurst(rasp, t, 0.18);
      this.register(bucket, rasp, true);
    };

    const series = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      this.emitEvent('ducks');
      const pan = this.makePan(Math.random() * 1.2 - 0.6, dest);
      const n = 3 + Math.floor(Math.random() * 3);
      const base = 265 + Math.random() * 60;
      for (let i = 0; i < n; i++) {
        quack(t + i * 0.3, base * (1 + Math.random() * 0.06 - 0.03), 1.5 * Math.pow(0.85, i), pan);
      }
      this.schedule(bucket, series, 3500 + Math.random() * 5000);
    };
    series();
  }

  // --- CAVE (deep still air + echoing water drips) ---
  private startCave(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;

    const air = this.noiseSource(this.brownNoiseBuffer)!;
    const airLp = this.ctx.createBiquadFilter();
    airLp.type = 'lowpass'; airLp.frequency.value = 140;
    const airGain = this.ctx.createGain();
    airGain.gain.value = 0.62;
    air.connect(airLp).connect(airGain).connect(dest);
    air.start();
    this.register(bucket, air);

    // Broad low-mid room tone makes the cavern translate on phone speakers;
    // the sub bed alone spent almost all of its energy below 180 Hz.
    const room = this.noiseSource(this.pinkNoiseBuffer)!;
    const roomBp = this.ctx.createBiquadFilter();
    roomBp.type = 'bandpass'; roomBp.frequency.value = 390; roomBp.Q.value = 0.55;
    const roomGain = this.ctx.createGain();
    roomGain.gain.value = 0.55;
    room.connect(roomBp).connect(roomGain).connect(dest);
    room.start();
    this.register(bucket, room);

    // The cave slowly "breathes".
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.15;
    lfo.connect(lfoGain).connect(airGain.gain);
    lfo.start();
    this.register(bucket, lfo);

    const roomLfo = this.ctx.createOscillator();
    roomLfo.frequency.value = 0.037;
    const roomDepth = this.ctx.createGain();
    roomDepth.gain.value = 0.07;
    roomLfo.connect(roomDepth).connect(roomGain.gain);
    roomLfo.start();
    this.register(bucket, roomLfo);

    // Each drip rings once, then repeats quieter as manual echoes.
    const ping = (t: number, freq: number, peak: number, pan: StereoPannerNode) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.92, t + 0.2);
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(peak, t + 0.004);
      env.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.connect(env).connect(pan);
      osc.start(t); osc.stop(t + 0.34);
    };

    const drip = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const p = Math.random() * 1.2 - 0.6;
      const f = 900 + Math.random() * 700;
      ping(t, f, 0.4, this.makePan(p, dest));
      ping(t + 0.22, f, 0.16, this.makePan(-p * 0.7, dest));
      ping(t + 0.46, f, 0.06, this.makePan(p * 0.4, dest));
      this.schedule(bucket, drip, 1500 + Math.random() * 3500);
    };
    drip();
  }

  // --- WINTER WIND (harsh bed + resonant howl sweeps) ---
  private startBlizzard(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer) return;

    const bed = this.noiseSource(this.pinkNoiseBuffer)!;
    const bedLp = this.ctx.createBiquadFilter();
    bedLp.type = 'lowpass'; bedLp.frequency.value = 350;
    const bedGain = this.ctx.createGain();
    bedGain.gain.value = 2.2;
    bed.connect(bedLp).connect(bedGain).connect(dest);
    bed.start();
    this.register(bucket, bed);

    // The howl: a high-Q band whose center wanders, like wind through a gap.
    const howlSrc = this.noiseSource(this.pinkNoiseBuffer)!;
    const howlBp = this.ctx.createBiquadFilter();
    howlBp.type = 'bandpass'; howlBp.frequency.value = 500; howlBp.Q.value = 9;
    const howlGain = this.ctx.createGain();
    howlGain.gain.value = 0.45;
    howlSrc.connect(howlBp).connect(howlGain).connect(dest);
    howlSrc.start();
    this.register(bucket, howlSrc);

    const sweep = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      howlBp.frequency.exponentialRampToValueAtTime(300 + Math.random() * 550, t + 2.5 + Math.random() * 3);
      howlGain.gain.linearRampToValueAtTime(0.25 + Math.random() * 0.4, t + 2 + Math.random() * 2);
    };
    sweep();
    const id = window.setInterval(sweep, 4200);
    bucket.intervals.push(id);
  }

  // --- SEABIRDS (sparse gull cries; layer with waves for a shoreline) ---
  private startSeabirds(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer) return;

    const cry = (t: number, pan: StereoPannerNode) => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const osc = this.ctx.createOscillator();
      const harmonic = this.ctx.createOscillator();
      osc.type = 'triangle';
      harmonic.type = 'sine';
      const dur = 0.4 + Math.random() * 0.3;
      const start = 720 + Math.random() * 220;
      osc.frequency.setValueAtTime(start, t);
      osc.frequency.exponentialRampToValueAtTime(start * 1.55, t + dur * 0.24);
      osc.frequency.exponentialRampToValueAtTime(start * 0.72, t + dur);
      harmonic.frequency.setValueAtTime(start * 2.02, t);
      harmonic.frequency.exponentialRampToValueAtTime(start * 3.13, t + dur * 0.24);
      harmonic.frequency.exponentialRampToValueAtTime(start * 1.45, t + dur);

      const vib = this.ctx.createOscillator();
      vib.frequency.value = 8 + Math.random() * 2;
      const vibDepth = this.ctx.createGain();
      vibDepth.gain.value = 24;
      vib.connect(vibDepth);
      vibDepth.connect(osc.frequency);
      vibDepth.connect(harmonic.frequency);

      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 3800;
      const harmonicGain = this.ctx.createGain();
      harmonicGain.gain.value = 0.22;

      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(1.1, t + 0.045);
      env.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(lp).connect(env).connect(pan);
      harmonic.connect(harmonicGain).connect(lp);
      osc.start(t); harmonic.start(t); vib.start(t);
      osc.stop(t + dur + 0.05); harmonic.stop(t + dur + 0.05); vib.stop(t + dur + 0.05);
      this.register(bucket, osc, true);
      this.register(bucket, harmonic, true);
      this.register(bucket, vib, true);

      // A nasal, breathy rasp makes the glide read as a gull rather than a
      // generic synthesizer sweep.
      const rasp = this.ctx.createBufferSource();
      rasp.buffer = this.pinkNoiseBuffer;
      const raspBp = this.ctx.createBiquadFilter();
      raspBp.type = 'bandpass'; raspBp.frequency.value = 1350 + Math.random() * 450; raspBp.Q.value = 0.8;
      const raspEnv = this.ctx.createGain();
      raspEnv.gain.setValueAtTime(0, t);
      raspEnv.gain.linearRampToValueAtTime(0.58, t + 0.025);
      raspEnv.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.85);
      rasp.connect(raspBp).connect(raspEnv).connect(pan);
      this.startNoiseBurst(rasp, t, dur + 0.02);
      this.register(bucket, rasp, true);
    };

    const flock = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      this.emitEvent('seabirds');
      const pan = this.makePan(Math.random() * 1.6 - 0.8, dest);
      const count = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) cry(t + i * (0.3 + Math.random() * 0.2), pan);
      this.schedule(bucket, flock, 4500 + Math.random() * 7500);
    };
    flock();
  }

  // --- 9. WIND CHIMES (random pentatonic bell tones) ---
  private startChimes(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer) return;
    const notes = [523.25, 587.33, 659.25, 783.99, 880.0]; // C5 D5 E5 G5 A5

    const ding = (t: number) => {
      if (!this.ctx) return;
      this.emitEvent('chimes');
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const pan = this.makePan(Math.random() * 1.4 - 0.7, dest);
      [[1, 0.46, 3.1], [2.01, 0.07, 1.7], [2.76, 0.18, 1.05], [5.4, 0.04, 0.42]].forEach(([ratio, amp, dur]) => {
        const osc = this.ctx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq * ratio;
        const gain = this.ctx!.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(amp, t + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0008, t + dur);
        osc.connect(gain).connect(pan);
        osc.start(t); osc.stop(t + dur + 0.05);
        this.register(bucket, osc, true);
      });

      // Tiny broadband impact gives the resonant partials a physical strike.
      const strike = this.ctx.createBufferSource();
      strike.buffer = this.pinkNoiseBuffer;
      const strikeHp = this.ctx.createBiquadFilter();
      strikeHp.type = 'highpass'; strikeHp.frequency.value = 2200;
      const strikeEnv = this.ctx.createGain();
      strikeEnv.gain.setValueAtTime(0, t);
      strikeEnv.gain.linearRampToValueAtTime(0.22, t + 0.002);
      strikeEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
      strike.connect(strikeHp).connect(strikeEnv).connect(pan);
      this.startNoiseBurst(strike, t, 0.055);
      this.register(bucket, strike, true);
    };

    const gust = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const count = 1 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) ding(t + i * (0.08 + Math.random() * 0.22));
      this.schedule(bucket, gust, 3000 + Math.random() * 6000);
    };
    gust();
  }

  // --- 10. SINGING BOWL (struck inharmonic tone with long, beating decay) ---
  private startBowl(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx) return;
    const roots = [261.63, 293.66, 329.63, 392.0, 440.0];
    const partials = [1, 2.0, 2.74, 4.07, 5.43];

    const strike = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      this.emitEvent('bowl');
      const root = roots[Math.floor(Math.random() * roots.length)];
      const pan = this.makePan(Math.random() * 0.5 - 0.25, dest);
      partials.forEach((ratio, i) => {
        const dur = Math.max(1.6, 6 - i * 0.9);
        const amp = 0.62 / (i + 1.4);
        [-1, 1].forEach((sign) => {
          const osc = this.ctx!.createOscillator();
          osc.type = 'sine';
          osc.frequency.value = root * ratio * (1 + sign * 0.0025);
          const gain = this.ctx!.createGain();
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(amp / 2, t + 0.02 + i * 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0006, t + dur);
          osc.connect(gain).connect(pan);
          osc.start(t); osc.stop(t + dur + 0.1);
          this.register(bucket, osc, true);
        });
      });
      this.schedule(bucket, strike, 7000 + Math.random() * 9000);
    };
    strike();
  }

  // --- 11. DEEP DRONE (meditative space pad) ---
  private startDrone(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx) return;
    const base = 110; // A2 — an octave up so the pad carries on small speakers
    const ratios = [1, 1.5, 2, 3, 4];

    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1200;
    lp.Q.value = 1;
    const droneGain = this.ctx.createGain();
    droneGain.gain.value = 0.9;
    lp.connect(droneGain).connect(dest);

    ratios.forEach((ratio, i) => {
      [-1, 1].forEach((sign) => {
        const osc = this.ctx!.createOscillator();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.value = base * ratio * (1 + sign * 0.0015);
        const gain = this.ctx!.createGain();
        gain.gain.value = (0.34 / (i + 1));
        osc.connect(gain).connect(lp);
        osc.start();
        this.register(bucket, osc);
      });
    });

    const fLfo = this.ctx.createOscillator();
    fLfo.frequency.value = 0.05;
    const fLfoGain = this.ctx.createGain();
    fLfoGain.gain.value = 250;
    fLfo.connect(fLfoGain).connect(lp.frequency);
    fLfo.start();
    this.register(bucket, fLfo);

    const aLfo = this.ctx.createOscillator();
    aLfo.frequency.value = 0.08;
    const aLfoGain = this.ctx.createGain();
    aLfoGain.gain.value = 0.18;
    aLfo.connect(aLfoGain).connect(droneGain.gain);
    aLfo.start();
    this.register(bucket, aLfo);
  }

  // --- 12. FAN (steady motor hum with subtle blade modulation) ---
  private startFan(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer) return;
    const node = this.noiseSource(this.brownNoiseBuffer)!;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 1000;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.68;
    node.connect(lp).connect(gain).connect(dest);
    node.start();
    this.register(bucket, node);

    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 14;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.08;
    lfo.connect(lfoGain).connect(gain.gain);
    lfo.start();
    this.register(bucket, lfo);

    const hum = this.ctx.createOscillator();
    hum.type = 'sine';
    hum.frequency.value = 110;
    const humGain = this.ctx.createGain();
    humGain.gain.value = 0.07;
    hum.connect(humGain).connect(dest);
    hum.start();
    this.register(bucket, hum);
  }

  // --- 13. WHITE NOISE ---
  private startWhiteNoise(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.whiteNoiseBuffer) return;
    const node = this.noiseSource(this.whiteNoiseBuffer)!;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 9000;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.18;
    node.connect(filter).connect(gain).connect(dest);
    node.start();
    this.register(bucket, node);
  }

  // --- 14. PINK NOISE ---
  private startPinkNoise(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer) return;
    const node = this.noiseSource(this.pinkNoiseBuffer)!;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.32;
    node.connect(gain).connect(dest);
    node.start();
    this.register(bucket, node);
  }

  // Live frequency-analysis node for the visualizer (null while stopped).
  getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  // Re-activate the context after the browser suspends it (e.g. on tab/screen lock).
  // --- TENT RAIN (텐트 빗소리: muffled canvas bed + fabric membrane drops) ---
  private startTentRain(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;

    // Muffled exterior rain: the canvas eats the highs, leaving a dark low
    // rumble. Nearly all of this sound lives below 400 Hz, which phone
    // speakers barely reproduce — so it runs hotter than the open-air rain
    // beds and gets a soft canvas-surface patter for audible mids.
    const bed = this.noiseSource(this.brownNoiseBuffer)!;
    const bedLp = this.ctx.createBiquadFilter();
    bedLp.type = 'lowpass'; bedLp.frequency.value = 300;
    const bedGain = this.ctx.createGain();
    bedGain.gain.value = 1.15;
    bed.connect(bedLp).connect(bedGain).connect(dest);
    bed.start();
    this.register(bucket, bed);

    // Soft surface patter: still clearly duller than startRain's 700 Hz hiss,
    // but gives small speakers something to reproduce.
    const patter = this.noiseSource(this.pinkNoiseBuffer)!;
    const patterLp = this.ctx.createBiquadFilter();
    patterLp.type = 'lowpass'; patterLp.frequency.value = 1100;
    const patterGain = this.ctx.createGain();
    patterGain.gain.value = 0.26;
    patter.connect(patterLp).connect(patterGain).connect(dest);
    patter.start();
    this.register(bucket, patter);

    // A drop on stretched fabric: resonant low-mid noise burst (the membrane
    // ring) doubled by a round sine thump (drum-skin "보돋돋" body).
    const makeDrop = () => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const t = this.ctx.currentTime;
      const pan = this.makePan(Math.random() * 1.6 - 0.8, dest);

      const src = this.ctx.createBufferSource();
      src.buffer = this.pinkNoiseBuffer;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 160 + Math.random() * 160;
      bp.Q.value = 5 + Math.random() * 3;
      const gain = this.ctx.createGain();
      const big = Math.random() < 0.06; // occasional fat drop off a fold or branch
      const peak = (1.0 + Math.random() * 0.6) * (big ? 2 + Math.random() : 1);
      const decay = 0.05 + Math.random() * 0.04;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(peak, t + 0.001 + Math.random() * 0.001);
      gain.gain.exponentialRampToValueAtTime(0.01, t + decay);
      src.connect(bp).connect(gain).connect(pan);
      src.start(t); src.stop(t + decay + 0.03);

      const thump = this.ctx.createOscillator();
      thump.type = 'sine';
      thump.frequency.setValueAtTime(140, t);
      thump.frequency.exponentialRampToValueAtTime(90, t + 0.05);
      const tEnv = this.ctx.createGain();
      tEnv.gain.setValueAtTime(0, t);
      tEnv.gain.linearRampToValueAtTime(big ? 1.15 : 0.75, t + 0.002);
      tEnv.gain.exponentialRampToValueAtTime(0.005, t + 0.06);
      thump.connect(tEnv).connect(pan);
      thump.start(t); thump.stop(t + 0.09);
    };

    // ~8-15 drops/sec: 80 ms ticks with probability gates, plus a chance of a
    // near-simultaneous second hit so the patter clusters instead of clicking
    // like a metronome.
    const id = window.setInterval(() => {
      if (Math.random() > 0.25) makeDrop();
      if (Math.random() > 0.65) setTimeout(makeDrop, 15 + Math.random() * 40);
    }, 80);
    bucket.intervals.push(id);

    // Every 20-50 s a gust flutters the fly sheet and briefly lets a little
    // more of the outside rain spectrum through the canvas.
    const gust = () => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const t = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.pinkNoiseBuffer;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 500 + Math.random() * 400;
      bp.Q.value = 1;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.35, t + 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
      src.connect(bp).connect(g).connect(this.makePan(Math.random() * 0.8 - 0.4, dest));
      src.start(t); src.stop(t + 0.85);

      bedLp.frequency.setTargetAtTime(400, t, 0.15);
      bedLp.frequency.setTargetAtTime(300, t + 0.6, 0.5);

      const gid = window.setTimeout(gust, 20000 + Math.random() * 30000);
      bucket.timeouts.push(gid);
    };
    const gid = window.setTimeout(gust, 8000 + Math.random() * 15000);
    bucket.timeouts.push(gid);
  }

  // --- WINDOW RAIN (창가 빗소리: rain on the glass, cozy indoor) ---
  private startWindowRain(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;

    // Muffled indoor bed: the storm heard through walls and glass.
    const mass = this.noiseSource(this.brownNoiseBuffer)!;
    const massLp = this.ctx.createBiquadFilter();
    massLp.type = 'lowpass'; massLp.frequency.value = 400;
    const massGain = this.ctx.createGain();
    massGain.gain.value = 0.9;
    mass.connect(massLp).connect(massGain).connect(dest);
    mass.start();
    this.register(bucket, mass);

    const wash = this.noiseSource(this.pinkNoiseBuffer)!;
    const washLp = this.ctx.createBiquadFilter();
    washLp.type = 'lowpass'; washLp.frequency.value = 900;
    const washGain = this.ctx.createGain();
    washGain.gain.value = 0.35;
    wash.connect(washLp).connect(washGain).connect(dest);
    wash.start();
    this.register(bucket, wash);

    // Slow gust surges: the muffled bed brightens and dims as rain sheets hit.
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.07;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 80;
    lfo.connect(lfoGain).connect(massLp.frequency);
    lfo.start();
    this.register(bucket, lfo);

    // A drop hitting the pane: a soft, low-resonance noise "tp". No tonal
    // ring and no high Q — resonant pings read as a synthesizer, not rain.
    // Most taps are quiet; the occasional fat drop lands harder.
    const tap = () => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const t = this.ctx.currentTime;
      // The window is one localized object — keep the taps panned narrow.
      const pan = this.makePan(Math.random() * 0.8 - 0.4, dest);
      const f = 1200 + Math.random() * 1400;

      const src = this.ctx.createBufferSource();
      src.buffer = this.pinkNoiseBuffer;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = f;
      bp.Q.value = 1.2 + Math.random();
      const env = this.ctx.createGain();
      const soft = Math.pow(Math.random(), 2); // mostly-soft distribution
      const peak = 0.25 + soft * 0.65;
      const decay = 0.02 + Math.random() * 0.025;
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(peak, t + 0.0015);
      env.gain.exponentialRampToValueAtTime(0.01, t + decay);
      src.connect(bp).connect(env).connect(pan);
      // Random buffer offset so each tap has a fresh transient.
      src.start(t, Math.random() * 3); src.stop(t + decay + 0.02);
    };

    // Run-off trickle: water streaking down the glass — a quiet, unpitched
    // wash that fades in and out, no resonant "zip".
    const drip = () => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const t = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.pinkNoiseBuffer;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(1100 + Math.random() * 500, t);
      bp.frequency.exponentialRampToValueAtTime(700, t + 0.22);
      bp.Q.value = 2;
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.4, t + 0.04);
      env.gain.exponentialRampToValueAtTime(0.005, t + 0.25);
      src.connect(bp).connect(env).connect(this.makePan(Math.random() * 0.8 - 0.4, dest));
      src.start(t, Math.random() * 3); src.stop(t + 0.3);
    };

    const loop = () => {
      if (!this.ctx) return;
      if (Math.random() < 0.45) tap();
      if (Math.random() < 0.04) drip();
      const id = window.setTimeout(loop, 75 + Math.random() * 45);
      bucket.timeouts.push(id);
    };
    loop();
  }

  // --- EAVES DRIPS (장마철 처마 낙숫물: roof-rain bed + rhythmic drips off the eaves) ---
  private startEavesDrips(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;

    // Rain-on-the-roof bed: dull low mass + a nearer, soft hiss.
    const roof = this.noiseSource(this.brownNoiseBuffer)!;
    const roofLp = this.ctx.createBiquadFilter();
    roofLp.type = 'lowpass'; roofLp.frequency.value = 300;
    const roofGain = this.ctx.createGain();
    roofGain.gain.value = 0.68;
    roof.connect(roofLp).connect(roofGain).connect(dest);
    roof.start();
    this.register(bucket, roof);

    const hiss = this.noiseSource(this.pinkNoiseBuffer)!;
    const hissLp = this.ctx.createBiquadFilter();
    hissLp.type = 'lowpass'; hissLp.frequency.value = 1200;
    const hissGain = this.ctx.createGain();
    hissGain.gain.value = 0.38;
    hiss.connect(hissLp).connect(hissGain).connect(dest);
    hiss.start();
    this.register(bucket, hiss);

    // One falling drop, all noise-based — a tonal sine sweep here read as a
    // cartoon "삐욱". (a) a very short bright splash transient (the surface
    // break) into (b) a soft round low body (the water swallowing the drop).
    const drop = (line: StereoPannerNode) => {
      if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;
      const t = this.ctx.currentTime;
      const size = 0.7 + Math.random() * 0.5; // per-drop weight

      // (a) Splash transient: 10-20 ms of mid-bright noise, gentle Q.
      const tick = this.ctx.createBufferSource();
      tick.buffer = this.pinkNoiseBuffer;
      const tickBp = this.ctx.createBiquadFilter();
      tickBp.type = 'bandpass';
      tickBp.frequency.value = 1600 + Math.random() * 900;
      tickBp.Q.value = 1.5;
      const tickEnv = this.ctx.createGain();
      tickEnv.gain.setValueAtTime(0, t);
      tickEnv.gain.linearRampToValueAtTime(0.5 * size, t + 0.002);
      tickEnv.gain.exponentialRampToValueAtTime(0.005, t + 0.012 + Math.random() * 0.01);
      tick.connect(tickBp).connect(tickEnv).connect(line);
      tick.start(t, Math.random() * 3); tick.stop(t + 0.05);

      // (b) The round body right behind it: the "동" of water into water.
      const plop = this.ctx.createBufferSource();
      plop.buffer = this.brownNoiseBuffer;
      const plopBp = this.ctx.createBiquadFilter();
      plopBp.type = 'bandpass';
      plopBp.frequency.setValueAtTime(520 + Math.random() * 220, t);
      plopBp.frequency.exponentialRampToValueAtTime(300, t + 0.07);
      plopBp.Q.value = 2.5;
      const plopEnv = this.ctx.createGain();
      plopEnv.gain.setValueAtTime(0, t + 0.006);
      plopEnv.gain.linearRampToValueAtTime(0.9 * size, t + 0.014);
      plopEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      plop.connect(plopBp).connect(plopEnv).connect(line);
      plop.start(t, Math.random() * 3); plop.stop(t + 0.14);

      // 10% of drops splatter a little wider in the puddle.
      if (Math.random() < 0.1) {
        const spl = this.ctx.createBufferSource();
        spl.buffer = this.pinkNoiseBuffer;
        const splBp = this.ctx.createBiquadFilter();
        splBp.type = 'bandpass'; splBp.frequency.value = 900; splBp.Q.value = 1.2;
        const splEnv = this.ctx.createGain();
        splEnv.gain.setValueAtTime(0, t + 0.01);
        splEnv.gain.linearRampToValueAtTime(0.35, t + 0.03);
        splEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
        spl.connect(splBp).connect(splEnv).connect(line);
        spl.start(t, Math.random() * 3); spl.stop(t + 0.2);
      }
    };

    // Four fixed drip lines along the eave. Each keeps its own near-steady
    // pulse: the base interval is drawn once per line, then only ±15% jitter
    // per drop — that rhythmic regularity is what sells "낙숫물".
    [-0.7, -0.3, 0.2, 0.6].forEach((pan) => {
      const line = this.makePan(pan, dest);
      this.register(bucket, line);
      const baseMs = 350 + Math.random() * 550;
      const pulse = () => {
        drop(line);
        const id = window.setTimeout(pulse, baseMs * (0.85 + Math.random() * 0.3));
        bucket.timeouts.push(id);
      };
      // Stagger each line's first drop so the four rhythms interleave.
      const startId = window.setTimeout(pulse, Math.random() * baseMs);
      bucket.timeouts.push(startId);
    });
  }

  // --- DISTANT THUNDER (dry far-off rolls, no rain — layer your own storm) ---
  private startDistantThunder(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;

    // Faint pre-storm air bed so the space never goes fully silent between rolls.
    const air = this.noiseSource(this.brownNoiseBuffer)!;
    const airLp = this.ctx.createBiquadFilter();
    airLp.type = 'lowpass'; airLp.frequency.value = 100;
    const airGain = this.ctx.createGain();
    airGain.gain.value = 0.35;
    air.connect(airLp).connect(airGain).connect(dest);
    air.start();
    this.register(bucket, air);

    // One roll: a long brown one-shot swept down through a lowpass, shaped by
    // several decaying gain crests so it ROLLS across the sky instead of
    // whooshing once. `amp` scales the whole envelope (0.5 for the far echo).
    const rumble = (t0: number, amp: number, panVal: number) => {
      if (!this.ctx || !this.brownNoiseBuffer) return;
      const src = this.ctx.createBufferSource();
      src.buffer = this.brownNoiseBuffer;
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass';
      const g = this.ctx.createGain();
      src.connect(lp).connect(g).connect(this.makePan(panVal, dest));

      const dur = 5 + Math.random() * 4;
      lp.frequency.setValueAtTime(500, t0);
      lp.frequency.exponentialRampToValueAtTime(70, t0 + dur);

      g.gain.setValueAtTime(0.0001, t0);
      const crests = 4 + Math.floor(Math.random() * 3);
      let tc = t0 + 0.3;
      for (let k = 0; k < crests && tc < t0 + dur - 0.6; k++) {
        const peak = Math.max(0.02, 3.0 * Math.pow(0.75, k) * (0.7 + Math.random() * 0.6) * amp);
        g.gain.exponentialRampToValueAtTime(peak, tc);
        const step = 0.8 + Math.random() * 0.7;
        // Sink back between crests (never to zero — the roll keeps breathing).
        g.gain.exponentialRampToValueAtTime(0.35 * amp, Math.min(tc + step * 0.6, t0 + dur - 0.3));
        tc += step;
      }
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      src.start(t0); src.stop(t0 + dur + 0.1);
      this.register(bucket, src, true);
    };

    const strike = () => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const t = this.ctx.currentTime;
      this.emitEvent('dthunder');
      const side = Math.random() < 0.5 ? -1 : 1;
      const panVal = side * (0.35 + Math.random() * 0.25);
      rumble(t, 1, panVal);

      // ~30%: a muffled near-crack right at the front of the roll.
      if (Math.random() < 0.3) {
        const crack = this.ctx.createBufferSource();
        crack.buffer = this.pinkNoiseBuffer;
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 900 + Math.random() * 500;
        bp.Q.value = 0.7;
        const cg = this.ctx.createGain();
        cg.gain.setValueAtTime(0, t);
        cg.gain.linearRampToValueAtTime(0.5, t + 0.012);
        cg.gain.exponentialRampToValueAtTime(0.005, t + 0.3);
        crack.connect(bp).connect(cg).connect(this.makePan(panVal, dest));
        crack.start(t); crack.stop(t + 0.4);
        this.register(bucket, crack, true);
      }

      // ~50%: the roll answers from the opposite side, quieter and later.
      if (Math.random() < 0.5) {
        rumble(t + 1.2 + Math.random() * 0.8, 0.5, -panVal);
      }

      const id = window.setTimeout(strike, 9000 + Math.random() * 11000);
      bucket.timeouts.push(id);
    };
    // First roll right away, so toggling the layer answers immediately.
    strike();
  }

  // --- HEARTBEAT (calm resting heartbeat, womb-comfort) ---
  private startHeartbeat(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;

    // Everything runs through one warm lowpass so the beat sits "inside the
    // chest" rather than in the room. Deliberately centered — no pan scatter.
    const layerGain = this.ctx.createGain();
    layerGain.gain.value = 1;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 360;
    layerGain.connect(lp).connect(dest);

    // Slow breathing swell around the pulse. Depth 0.12 on a base of 1 keeps
    // the gain strictly positive (0.88..1.12) — never let it cross 0.
    const breath = this.ctx.createOscillator();
    breath.type = 'sine';
    breath.frequency.value = 0.2;
    const breathDepth = this.ctx.createGain();
    breathDepth.gain.value = 0.12;
    breath.connect(breathDepth).connect(layerGain.gain);
    breath.start();
    this.register(bucket, breath);

    // One thump = a descending sine "knock" plus a soft brown-noise body thud
    // (lowpassed to 150 Hz) so the beat has flesh, not just tone.
    const thump = (t: number, startHz: number, endHz: number, peak: number, decay: number) => {
      if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(startHz, t);
      osc.frequency.exponentialRampToValueAtTime(endHz, t + 0.12);
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(peak, t + 0.008);
      env.gain.exponentialRampToValueAtTime(0.001, t + decay);
      osc.connect(env).connect(layerGain);
      osc.start(t); osc.stop(t + decay + 0.05);

      const thud = this.ctx.createBufferSource();
      thud.buffer = this.brownNoiseBuffer;
      const thudLp = this.ctx.createBiquadFilter();
      thudLp.type = 'lowpass';
      thudLp.frequency.value = 150;
      const thudEnv = this.ctx.createGain();
      thudEnv.gain.setValueAtTime(0, t);
      thudEnv.gain.linearRampToValueAtTime(0.5, t + 0.006);
      thudEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      thud.connect(thudLp).connect(thudEnv).connect(layerGain);
      thud.start(t); thud.stop(t + 0.1);

      // A restrained low-mid chest contact keeps the pulse audible on phone
      // speakers without increasing the already-strong sub peak.
      const contact = this.ctx.createBufferSource();
      contact.buffer = this.pinkNoiseBuffer;
      const contactBp = this.ctx.createBiquadFilter();
      contactBp.type = 'bandpass'; contactBp.frequency.value = 245; contactBp.Q.value = 0.8;
      const contactEnv = this.ctx.createGain();
      contactEnv.gain.setValueAtTime(0, t);
      contactEnv.gain.linearRampToValueAtTime(0.95, t + 0.004);
      contactEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.065);
      contact.connect(contactBp).connect(contactEnv).connect(layerGain);
      this.startNoiseBurst(contact, t, 0.075);
      this.register(bucket, contact, true);

      const presence = this.ctx.createOscillator();
      presence.type = 'triangle';
      const presenceHz = startHz * 3.8;
      presence.frequency.setValueAtTime(presenceHz, t);
      presence.frequency.exponentialRampToValueAtTime(presenceHz * 0.72, t + 0.11);
      const presenceEnv = this.ctx.createGain();
      presenceEnv.gain.setValueAtTime(0, t);
      presenceEnv.gain.linearRampToValueAtTime(0.42, t + 0.006);
      presenceEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
      presence.connect(presenceEnv).connect(layerGain);
      presence.start(t); presence.stop(t + 0.15);
      this.register(bucket, presence, true);
    };

    // Resting pace: the base period random-walks within 950–1050 ms
    // (57–63 BPM), a self-rescheduling setTimeout chain — never setInterval,
    // whose rigidity would kill the organic feel.
    let period = 990 + Math.random() * 20;
    const beat = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      thump(t, 60, 38, 1.02, 0.22);         // LUB
      thump(t + 0.28, 52, 33, 0.74, 0.18);  // dub
      period = Math.min(1050, Math.max(950, period + (Math.random() * 2 - 1) * period * 0.012));
      const id = window.setTimeout(beat, period);
      bucket.timeouts.push(id);
    };
    beat();
  }

  // --- 15. BROWN NOISE ---
  private startBrownNoise(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer) return;
    const node = this.noiseSource(this.brownNoiseBuffer)!;
    // Gentle lowpass rounds off what little top end the brown spectrum keeps,
    // so it masks smoothly with zero hiss (good for ADHD focus / sleep).
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 800;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.48;
    node.connect(filter).connect(gain).connect(dest);
    node.start();
    this.register(bucket, node);
  }

  // --- BAMBOO (대나무숲: grove wind + papery leaf shimmer + hollow culm knocks) ---
  private startBamboo(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer || !this.whiteNoiseBuffer) return;

    // Wind bed pushing through the grove, gusting like startWind but a touch darker.
    const bed = this.noiseSource(this.pinkNoiseBuffer)!;
    const bedLp = this.ctx.createBiquadFilter();
    bedLp.type = 'lowpass'; bedLp.frequency.value = 360; bedLp.Q.value = 0;
    const bedGain = this.ctx.createGain();
    bedGain.gain.value = 1.35;
    bed.connect(bedLp).connect(bedGain).connect(dest);
    bed.start();
    this.register(bucket, bed);

    // Papery leaf band — brighter than broadleaf rustle, so it reads as dry
    // bamboo leaves hissing against each other. Swells with the gusts.
    const leaves = this.noiseSource(this.whiteNoiseBuffer)!;
    const leafHp = this.ctx.createBiquadFilter();
    leafHp.type = 'highpass'; leafHp.frequency.value = 1250;
    const leafLp = this.ctx.createBiquadFilter();
    leafLp.type = 'lowpass'; leafLp.frequency.value = 6500;
    const leafGain = this.ctx.createGain();
    leafGain.gain.value = 0.14;
    leaves.connect(leafHp).connect(leafLp).connect(leafGain).connect(dest);
    leaves.start();
    this.register(bucket, leaves);

    const animate = () => {
      if (!this.ctx) return; const t = this.ctx.currentTime;
      const gust = 2 + Math.random() * 4;
      bedLp.frequency.exponentialRampToValueAtTime(200 + Math.random() * 250, t + gust);
      leafGain.gain.setTargetAtTime(0.1 + Math.random() * 0.11, t, gust / 3);
    };
    animate();
    const id = window.setInterval(animate, 5000);
    bucket.intervals.push(id);

    // One culm knock: a bright resonant "tok" (high-Q noise burst) plus a
    // hollow-tube sine drop underneath so it sounds like thick hollow wood.
    const knock = (t: number, amp: number, freq: number, pan: StereoPannerNode) => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const src = this.ctx.createBufferSource();
      src.buffer = this.pinkNoiseBuffer;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 8 + Math.random() * 2;
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(1.2 * amp, t + 0.0015);
      env.gain.exponentialRampToValueAtTime(0.01, t + 0.03);
      src.connect(bp).connect(env).connect(pan);
      src.start(t); src.stop(t + 0.05);

      const tube = this.ctx.createOscillator();
      tube.type = 'sine';
      tube.frequency.setValueAtTime(320, t);
      tube.frequency.exponentialRampToValueAtTime(180, t + 0.05);
      const tEnv = this.ctx.createGain();
      tEnv.gain.setValueAtTime(0, t);
      tEnv.gain.linearRampToValueAtTime(0.7 * amp, t + 0.003);
      tEnv.gain.exponentialRampToValueAtTime(0.005, t + 0.09);
      tube.connect(tEnv).connect(pan);
      tube.start(t); tube.stop(t + 0.12);
    };

    // Culms clack in little clusters as a gust knocks them together; most hits
    // get a quieter rebound as the stalk swings back.
    const cluster = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const count = 1 + Math.floor(Math.random() * 4);
      let at = t;
      for (let i = 0; i < count; i++) {
        const pan = this.makePan(Math.random() * 1.4 - 0.7, dest);
        const freq = 1900 + Math.random() * 600;
        knock(at, 1, freq, pan);
        if (Math.random() < 0.7) knock(at + 0.06 + Math.random() * 0.06, 0.5, freq, pan);
        at += 0.16 + Math.random() * 0.34;
      }
      const id = window.setTimeout(cluster, 2500 + Math.random() * 4500);
      bucket.timeouts.push(id);
    };
    cluster();
  }

  // --- TEMPLE BELL (산사의 종: deep beomjong strikes + moktak taps + mountain breeze) ---
  private startTempleBell(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer) return;

    // Mountain breeze bed: soft filtered pink noise whose color drifts slowly.
    const breeze = this.noiseSource(this.pinkNoiseBuffer)!;
    const breezeLp = this.ctx.createBiquadFilter();
    breezeLp.type = 'lowpass'; breezeLp.frequency.value = 500;
    const breezeGain = this.ctx.createGain();
    breezeGain.gain.value = 0.45;
    breeze.connect(breezeLp).connect(breezeGain).connect(dest);
    breeze.start();
    this.register(bucket, breeze);

    const breezeLfo = this.ctx.createOscillator();
    breezeLfo.frequency.value = 0.06;
    const breezeLfoGain = this.ctx.createGain();
    breezeLfoGain.gain.value = 150; // 500 ± 150 Hz — cutoff stays strictly positive
    breezeLfo.connect(breezeLfoGain).connect(breezeLp.frequency);
    breezeLfo.start();
    this.register(bucket, breezeLfo);

    // The beomjong (범종): inharmonic partials, each a slightly detuned sine
    // pair so the long tail beats slowly (맥놀이), under a noise strike transient.
    const roots = [82.4, 98, 110];
    const partials = [1, 2.0, 2.67, 3.01, 4.72, 5.43];

    const strike = () => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const t = this.ctx.currentTime;
      this.emitEvent('temple');
      const root = roots[Math.floor(Math.random() * roots.length)];
      const pan = this.makePan(Math.random() * 0.5 - 0.25, dest);

      // Bonsho warble on the fundamental: slow AM around unity gain
      // (0.75–1.25 — multiplicative, so it can never cross zero).
      const warble = this.ctx.createGain();
      warble.gain.value = 1;
      warble.connect(pan);
      const warbleLfo = this.ctx.createOscillator();
      warbleLfo.frequency.value = 0.8 + Math.random() * 0.4;
      const warbleDepth = this.ctx.createGain();
      warbleDepth.gain.value = 0.25;
      warbleLfo.connect(warbleDepth).connect(warble.gain);

      let maxDur = 0;
      partials.forEach((ratio, i) => {
        const dur = Math.max(4, 14 - i * 2);
        maxDur = Math.max(maxDur, dur);
        const amp = 1 / (i + 1.2);
        [-1, 1].forEach((sign) => {
          const osc = this.ctx!.createOscillator();
          osc.type = 'sine';
          osc.frequency.value = root * ratio * (1 + sign * 0.002);
          const gain = this.ctx!.createGain();
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(amp * 0.5, t + 0.015 + i * 0.008);
          gain.gain.exponentialRampToValueAtTime(0.0005, t + dur);
          osc.connect(gain).connect(i === 0 ? warble : pan);
          osc.start(t); osc.stop(t + dur + 0.1);
          this.register(bucket, osc, true);
        });
      });
      warbleLfo.start(t); warbleLfo.stop(t + maxDur + 0.1);
      this.register(bucket, warbleLfo, true);

      // Strike transient: the wooden beam hitting the bronze.
      const burst = this.ctx.createBufferSource();
      burst.buffer = this.pinkNoiseBuffer;
      const burstBp = this.ctx.createBiquadFilter();
      burstBp.type = 'bandpass'; burstBp.frequency.value = 700; burstBp.Q.value = 1;
      const burstGain = this.ctx.createGain();
      burstGain.gain.setValueAtTime(0, t);
      burstGain.gain.linearRampToValueAtTime(0.7, t + 0.005);
      burstGain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
      burst.connect(burstBp).connect(burstGain).connect(pan);
      burst.start(t); burst.stop(t + 0.15);

      const id = window.setTimeout(strike, 20000 + Math.random() * 20000);
      bucket.timeouts.push(id);
    };
    strike();

    // Moktak (목탁): distant, quiet wooden taps between the bell strikes —
    // a woody sine thunk plus a tight resonant click for the "tok" attack.
    const tap = (t: number, pan: StereoPannerNode) => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, t);
      osc.frequency.exponentialRampToValueAtTime(540, t + 0.02);
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.55, t + 0.003);
      env.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(env).connect(pan);
      osc.start(t); osc.stop(t + 0.07);

      const click = this.ctx.createBufferSource();
      click.buffer = this.pinkNoiseBuffer;
      const clickBp = this.ctx.createBiquadFilter();
      clickBp.type = 'bandpass'; clickBp.frequency.value = 1800; clickBp.Q.value = 5;
      const clickGain = this.ctx.createGain();
      clickGain.gain.setValueAtTime(0, t);
      clickGain.gain.linearRampToValueAtTime(0.5, t + 0.002);
      clickGain.gain.exponentialRampToValueAtTime(0.01, t + 0.03);
      click.connect(clickBp).connect(clickGain).connect(pan);
      click.start(t); click.stop(t + 0.05);
    };

    const moktak = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const pan = this.makePan(0.3, dest);
      const count = 3 + Math.floor(Math.random() * 4);
      const spacing = 0.26 + Math.random() * 0.04;
      for (let i = 0; i < count; i++) tap(t + i * spacing, pan);
      const id = window.setTimeout(moktak, 8000 + Math.random() * 7000);
      bucket.timeouts.push(id);
    };
    const moktakId = window.setTimeout(moktak, 5000 + Math.random() * 5000);
    bucket.timeouts.push(moktakId);
  }

  // --- PEBBLE BEACH (몽돌해변: surf swells + '차르르르' pebble roll on the retreat) ---
  private startPebbleBeach(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;

    // Continuous surf bed: brown (mass) + pink (wash) summed into one lowpass
    // whose cutoff and level breathe with each wave cycle. Rests at a quiet lull.
    const surfLp = this.ctx.createBiquadFilter();
    surfLp.type = 'lowpass'; surfLp.frequency.value = 200;
    const surfGain = this.ctx.createGain();
    surfGain.gain.value = 0.25;
    surfLp.connect(surfGain).connect(dest);

    const mass = this.noiseSource(this.brownNoiseBuffer)!;
    const massMix = this.ctx.createGain();
    massMix.gain.value = 1.1;
    mass.connect(massMix).connect(surfLp);
    mass.start();
    this.register(bucket, mass);

    const washBed = this.noiseSource(this.pinkNoiseBuffer)!;
    const washMix = this.ctx.createGain();
    washMix.gain.value = 0.55;
    washBed.connect(washMix).connect(surfLp);
    washBed.start();
    this.register(bucket, washBed);

    // Undertow hiss: a thin high band that only appears while the water drains.
    const undertow = this.noiseSource(this.pinkNoiseBuffer)!;
    const undertowHp = this.ctx.createBiquadFilter();
    undertowHp.type = 'highpass'; undertowHp.frequency.value = 4000;
    const undertowGain = this.ctx.createGain();
    undertowGain.gain.value = 0.0001;
    undertow.connect(undertowHp).connect(undertowGain).connect(dest);
    undertow.start();
    this.register(bucket, undertow);

    // Makeup bus for the pebble ticks: 4–8 ms bursts through Q 5–9 bandpass
    // filters lose most of their energy, so the modest per-tick peaks below
    // are lifted here to sit right against the receding surf.
    const tickBus = this.ctx.createGain();
    tickBus.gain.value = 3.2;
    tickBus.connect(dest);

    // One pebble micro-tick: a few ms of pink noise through a resonant band.
    const tick = (peak: number) => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const t = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.pinkNoiseBuffer;
      src.playbackRate.value = 0.85 + Math.random() * 0.3;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 900 + Math.random() * 1900;
      bp.Q.value = 5 + Math.random() * 4;
      const g = this.ctx.createGain();
      const dur = 0.004 + Math.random() * 0.004;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(peak, t + dur * 0.3);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      src.connect(bp).connect(g).connect(this.makePan(Math.random() * 1.8 - 0.9, tickBus));
      // Random buffer offset so the ~4 ms slices never repeat the same transient.
      src.start(t, Math.random() * 3);
      src.stop(t + dur + 0.02);
    };

    // '차르르르': a dense micro-loop of ticks while the wave pulls back. The
    // population envelope rises fast then dies with the recede, and the gaps
    // widen toward the end — the pebbles settling as the water lets go.
    const pebbleWash = () => {
      if (!this.ctx) return;
      const washDur = 2.5 + Math.random() * 1.5;
      const t0 = this.ctx.currentTime;
      const microLoop = () => {
        if (!this.ctx) return;
        const phase = (this.ctx.currentTime - t0) / washDur;
        if (phase >= 1) return;
        const env = Math.min(1, phase / 0.15) * Math.pow(1 - phase, 1.4);
        tick((0.15 + Math.random() * 0.35) * Math.max(0.06, env));
        if (env > 0.45 && Math.random() < 0.6) tick((0.15 + Math.random() * 0.35) * env);
        const id = window.setTimeout(microLoop, (12 + Math.random() * 18) * (1 + phase * 2.2));
        bucket.timeouts.push(id);
      };
      microLoop();
    };

    // A bigger stone knocking over: short sine body + noise crack on top.
    const clack = (t: number) => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const pan = this.makePan(Math.random() * 1.8 - 0.9, dest);
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      const f = 600 + Math.random() * 500;
      osc.frequency.setValueAtTime(f, t);
      osc.frequency.exponentialRampToValueAtTime(f * 0.72, t + 0.03);
      const body = this.ctx.createGain();
      body.gain.setValueAtTime(0, t);
      body.gain.linearRampToValueAtTime(0.6, t + 0.002);
      body.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      osc.connect(body).connect(pan);
      osc.start(t); osc.stop(t + 0.06);

      const knock = this.ctx.createBufferSource();
      knock.buffer = this.pinkNoiseBuffer;
      const kBp = this.ctx.createBiquadFilter();
      kBp.type = 'bandpass'; kBp.frequency.value = f * 2.1; kBp.Q.value = 3;
      const kEnv = this.ctx.createGain();
      kEnv.gain.setValueAtTime(0, t);
      kEnv.gain.linearRampToValueAtTime(0.9, t + 0.002);
      kEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      knock.connect(kBp).connect(kEnv).connect(pan);
      knock.start(t, Math.random() * 3); knock.stop(t + 0.06);
    };

    // Wave cycle: swell in (~2.5 s), crest, recede (~3.5 s) with the pebble
    // wash + undertow hiss riding the retreat. Period 8–14 s, irregular, and
    // always longer than swell+recede so every cycle starts from the lull.
    const cycle = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const swellSec = 2.2 + Math.random() * 0.7;
      const recedeSec = 3.1 + Math.random() * 0.8;
      const crest = 0.68 + Math.random() * 0.14;

      surfLp.frequency.setValueAtTime(200, t);
      surfLp.frequency.exponentialRampToValueAtTime(900, t + swellSec);
      surfLp.frequency.exponentialRampToValueAtTime(200, t + swellSec + recedeSec);
      surfGain.gain.setValueAtTime(0.25, t);
      surfGain.gain.linearRampToValueAtTime(crest, t + swellSec);
      surfGain.gain.linearRampToValueAtTime(0.25, t + swellSec + recedeSec);

      undertowGain.gain.setValueAtTime(0.0001, t + swellSec);
      undertowGain.gain.linearRampToValueAtTime(0.11 + Math.random() * 0.04, t + swellSec + 0.5);
      undertowGain.gain.exponentialRampToValueAtTime(0.0001, t + swellSec + recedeSec);

      const washId = window.setTimeout(pebbleWash, Math.round(swellSec * 1000));
      bucket.timeouts.push(washId);

      const clacks = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < clacks; i++) {
        clack(t + swellSec + 0.15 + Math.random() * (recedeSec - 0.7));
      }

      const id = window.setTimeout(cycle, 8000 + Math.random() * 6000);
      bucket.timeouts.push(id);
    };
    cycle();
  }

  private startDeepSea(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;

    // Abyssal water mass: a dark brown-noise bed whose color and level drift
    // very slowly, like currents shifting in the deep.
    const bed = this.noiseSource(this.brownNoiseBuffer)!;
    const bedLp = this.ctx.createBiquadFilter();
    bedLp.type = 'lowpass'; bedLp.frequency.value = 180;
    const bedGain = this.ctx.createGain();
    bedGain.gain.value = 0.92;
    bed.connect(bedLp).connect(bedGain).connect(dest);
    bed.start();
    this.register(bucket, bed);

    // A low-mid current preserves the abyssal color while giving compact
    // speakers an audible sense of water pressure and movement.
    const current = this.noiseSource(this.pinkNoiseBuffer)!;
    const currentBp = this.ctx.createBiquadFilter();
    currentBp.type = 'bandpass'; currentBp.frequency.value = 410; currentBp.Q.value = 0.58;
    const currentGain = this.ctx.createGain();
    currentGain.gain.value = 0.24;
    current.connect(currentBp).connect(currentGain).connect(dest);
    current.start();
    this.register(bucket, current);

    const fLfo = this.ctx.createOscillator();
    fLfo.frequency.value = 0.05;
    const fDepth = this.ctx.createGain();
    fDepth.gain.value = 40;
    fLfo.connect(fDepth).connect(bedLp.frequency);
    fLfo.start();
    this.register(bucket, fLfo);

    const aLfo = this.ctx.createOscillator();
    aLfo.frequency.value = 0.03;
    const aDepth = this.ctx.createGain();
    aDepth.gain.value = 0.2; // 1.0 ± 0.2 — stays strictly positive
    aLfo.connect(aDepth).connect(bedGain.gain);
    aLfo.start();
    this.register(bucket, aLfo);

    const currentLfo = this.ctx.createOscillator();
    currentLfo.frequency.value = 0.041;
    const currentDepth = this.ctx.createGain();
    currentDepth.gain.value = 0.055;
    currentLfo.connect(currentDepth).connect(currentGain.gain);
    currentLfo.start();
    this.register(bucket, currentLfo);

    // Faint pressure hum with a slow amplitude wobble.
    const hum = this.ctx.createOscillator();
    hum.type = 'sine';
    hum.frequency.value = 55;
    const humGain = this.ctx.createGain();
    humGain.gain.value = 0.04;
    hum.connect(humGain).connect(dest);
    hum.start();
    this.register(bucket, hum);

    const humLfo = this.ctx.createOscillator();
    humLfo.frequency.value = 0.06;
    const humDepth = this.ctx.createGain();
    humDepth.gain.value = 0.015; // 0.04 ± 0.015 — stays strictly positive
    humLfo.connect(humDepth).connect(humGain.gain);
    humLfo.start();
    this.register(bucket, humLfo);

    // One whale call: a slow rise-and-fall moan with vibrato and a quiet
    // octave partial, trailing its own decaying echo into the dark.
    const sing = (f: number, panPos: number, amp: number) => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const dur = 1.5 + Math.random() * 1.5;
      const pan = this.makePan(panPos, dest);

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      osc.frequency.exponentialRampToValueAtTime(f * 1.8, t + dur * 0.6);
      osc.frequency.exponentialRampToValueAtTime(f * 0.9, t + dur);

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(f * 2, t);
      osc2.frequency.exponentialRampToValueAtTime(f * 2 * 1.8, t + dur * 0.6);
      osc2.frequency.exponentialRampToValueAtTime(f * 2 * 0.9, t + dur);
      const partial = this.ctx.createGain();
      partial.gain.value = 0.3;

      const vib = this.ctx.createOscillator();
      vib.frequency.value = 4 + Math.random() * 2;
      const vibDepth = this.ctx.createGain();
      vibDepth.gain.value = 6 + Math.random() * 6;
      vib.connect(vibDepth);
      vibDepth.connect(osc.frequency);
      vibDepth.connect(osc2.frequency);

      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(amp, t + 0.3);
      env.gain.exponentialRampToValueAtTime(0.001, t + dur);

      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 800;

      osc.connect(env);
      osc2.connect(partial).connect(env);
      env.connect(lp).connect(pan);

      // Per-call echo: the feedback gain repeats the call every 0.45 s at
      // 35%, decaying to silence once the envelope closes. The nodes are
      // created per call and get GC'd after the oscillators stop — the
      // +1.5 s stop slack leaves room for the echo tail to ring out.
      const delay = this.ctx.createDelay(1);
      delay.delayTime.value = 0.45;
      const fb = this.ctx.createGain();
      fb.gain.value = 0.35;
      lp.connect(delay);
      delay.connect(fb);
      fb.connect(delay);
      fb.connect(pan);

      const stopAt = t + dur + 1.5;
      osc.start(t); osc2.start(t); vib.start(t);
      osc.stop(stopAt); osc2.stop(stopAt); vib.stop(stopAt);
      this.register(bucket, osc, true);
      this.register(bucket, osc2, true);
      this.register(bucket, vib, true);
    };

    const call = () => {
      if (!this.ctx) return;
      this.emitEvent('deepsea');
      const f = 180 + Math.random() * 120;
      const panPos = (Math.random() < 0.5 ? -1 : 1) * (0.2 + Math.random() * 0.3);
      sing(f, panPos, 0.9);
      // Sometimes another whale answers from the other side, softer, pitched ±20%.
      if (Math.random() < 0.6) {
        const answerId = window.setTimeout(() => {
          sing(f * (0.8 + Math.random() * 0.4), -panPos, 0.45);
        }, 4000 + Math.random() * 2000);
        bucket.timeouts.push(answerId);
      }
      const id = window.setTimeout(call, 12000 + Math.random() * 13000);
      bucket.timeouts.push(id);
    };
    // A whale greets right away — instant feedback that the layer is on.
    call();
  }

  // --- SCOPS OWL (소쩍새: sharp '소-쩍' whistled call over a faint night bed;
  // nothing like the low mellow hoots of startOwl) ---
  private startScopsOwl(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer) return;

    // Minimal night-air bed so the bird sits in a space instead of dry silence.
    const bed = this.noiseSource(this.brownNoiseBuffer)!;
    const bedLp = this.ctx.createBiquadFilter();
    bedLp.type = 'lowpass'; bedLp.frequency.value = 200;
    const bedGain = this.ctx.createGain();
    bedGain.gain.value = 0.25;
    bed.connect(bedLp).connect(bedGain).connect(dest);
    bed.start();
    this.register(bucket, bed);

    // Each bird calls from a fixed perch: shared "distance" lowpass -> panner.
    const mainOut = this.ctx.createBiquadFilter();
    mainOut.type = 'lowpass'; mainOut.frequency.value = 2000;
    mainOut.connect(this.makePan(0.5, dest));
    const answerOut = this.ctx.createBiquadFilter();
    answerOut.type = 'lowpass'; answerOut.frequency.value = 2000;
    answerOut.connect(this.makePan(-0.7, dest));

    // One whistled syllable: vibrato'd sine through a resonant band, with a
    // touch of 30 Hz tremolo for organic roughness (1 ± 0.2, never crosses 0).
    const note = (t: number, freq: number, dur: number, peak: number, out: AudioNode) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const vib = this.ctx.createOscillator();
      vib.frequency.value = 5;
      const vibDepth = this.ctx.createGain();
      vibDepth.gain.value = 15;
      vib.connect(vibDepth).connect(osc.frequency);

      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 3;

      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(peak, t + 0.015);
      env.gain.setValueAtTime(peak, t + dur - 0.06);
      env.gain.exponentialRampToValueAtTime(0.001, t + dur);

      const trem = this.ctx.createGain();
      trem.gain.value = 1;
      const am = this.ctx.createOscillator();
      am.frequency.value = 30;
      const amDepth = this.ctx.createGain();
      amDepth.gain.value = 0.2;
      am.connect(amDepth).connect(trem.gain);

      osc.connect(bp).connect(env).connect(trem).connect(out);
      osc.start(t); vib.start(t); am.start(t);
      osc.stop(t + dur + 0.05); vib.stop(t + dur + 0.05); am.stop(t + dur + 0.05);
    };

    // "소-쩍(-다)": 780 Hz then 700 Hz after a 140 ms gap, sometimes a third
    // falling 660 Hz syllable. `pitch`/`gainMul` let the answering bird reuse it.
    const call = (t: number, pitch: number, gainMul: number, out: AudioNode, third: boolean) => {
      note(t, 780 * pitch, 0.12, 1.1 * gainMul, out);
      note(t + 0.26, 700 * pitch, 0.1, 1.0 * gainMul, out);
      if (third) note(t + 0.5, 660 * pitch, 0.1, 0.9 * gainMul, out);
    };

    // Calling bouts of 15–30 s (a call every 2.5–4 s), then 20–60 s of night.
    const startBout = () => {
      const boutMs = 15000 + Math.random() * 15000;
      const answering = Math.random() < 0.3; // a rival answers from the far side
      let elapsed = 0;
      const callLoop = () => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
      this.emitEvent('scops');
        const third = Math.random() < 0.4;
        call(t, 1, 1, mainOut, third);
        if (answering) call(t + 0.8, 0.92, 0.5, answerOut, third);
        const next = 2500 + Math.random() * 1500;
        elapsed += next;
        const id = elapsed < boutMs
          ? window.setTimeout(callLoop, next)
          : window.setTimeout(startBout, 20000 + Math.random() * 40000);
        bucket.timeouts.push(id);
      };
      callLoop();
    };
    startBout();
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  // Gradually fade the whole mix to silence over `seconds`, then tear down.
  // Used by sleep mode so a session ends gently instead of cutting out.
  fadeOutStop(seconds = 10) {
    if (!this.ctx || !this.masterGain) { this.stop(); return; }
    this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, Math.max(0.005, seconds / 6));
    this.schedulePendingCleanup(() => this.stop(), Math.ceil(seconds * 1000) + 120);
  }

  // Gentle ascending bell played when a session finishes.
  playCompletionChime() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const out = this.ctx.createGain();
    out.gain.value = 0.6;
    out.connect(this.ctx.destination);
    const notes = [523.25, 659.25, 783.99]; // C5 - E5 - G5
    notes.forEach((freq, i) => {
      const t = now + i * 0.18;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.connect(gain).connect(out);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.5, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
      osc.start(t);
      osc.stop(t + 1.3);
    });
  }

  stop() {
    this.modeSwitchGeneration += 1;
    this.teardownTone();
    this.voices.forEach((v) => this.disposeVoice(v));
    this.voices.clear();
    this.notifyPlayback();
    this.retiringVoices.forEach((v) => this.disposeVoice(v));
    this.retiringVoices.clear();
    this.pendingCleanups.forEach((id) => clearTimeout(id));
    this.pendingCleanups = [];
    [
      this.reverbWet,
      this.reverbLp,
      this.reverbFilter,
      this.reverb,
      this.reverbSend,
      this.bgBus,
      this.binauralGain,
      this.analyser,
      this.outputGain,
      this.safetyClipper,
      this.limiter,
      this.mixCompressor,
      this.dcBlocker,
      this.masterGain,
    ].forEach((n) => {
      try { n?.disconnect(); } catch (e) { /* ignore */ }
    });
    this.reverbWet = null;
    this.reverbLp = null;
    this.reverbFilter = null;
    this.reverb = null;
    this.reverbSend = null;
    this.bgBus = null;
    this.binauralGain = null;
    this.analyser = null;
    this.outputGain = null;
    this.safetyClipper = null;
    this.limiter = null;
    this.mixCompressor = null;
    this.dcBlocker = null;
    this.masterGain = null;
  }

  // Fully release audio resources (called when the app unmounts).
  dispose() {
    this.stop();
    this.sampleCache.clear();
    if (this.ctx) { try { this.ctx.close(); } catch (e) {} this.ctx = null; }
    this.pinkNoiseBuffer = null;
    this.brownNoiseBuffer = null;
    this.whiteNoiseBuffer = null;
    this.impulseBuffer = null;
  }
}

