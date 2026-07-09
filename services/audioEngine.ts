import { BackgroundSoundType } from '../types';

// Length of the looping noise buffers. Longer buffers make the loop point far
// less audible than a short 1-2s loop.
const NOISE_SECONDS = 4;

export type ToneMode = 'binaural' | 'isochronic';

export interface SoundLayer {
  type: BackgroundSoundType;
  volume: number;
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
}

interface Voice {
  gain: GainNode;
  bucket: Bucket;
  volume: number;
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
  private limiter: DynamicsCompressorNode | null = null;
  private analyser: AnalyserNode | null = null;   // tap for the live visualizer
  private binauralGain: GainNode | null = null;
  private bgBus: GainNode | null = null;        // shared bus for all nature layers (the "자연음" master)
  private reverb: ConvolverNode | null = null;
  private reverbWet: GainNode | null = null;

  // Active nature-sound layers, keyed by type.
  private voices: Map<BackgroundSoundType, Voice> = new Map();
  private pendingCleanups: number[] = [];

  private binauralVol = 0.5;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
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
    this.masterGain.gain.value = config.masterVol;

    // Master limiter: catches peaks when several layers stack so the mix never clips.
    this.limiter = this.ctx.createDynamicsCompressor();
    this.limiter.threshold.value = -6;
    this.limiter.knee.value = 0;
    this.limiter.ratio.value = 12;
    this.limiter.attack.value = 0.003;
    this.limiter.release.value = 0.25;
    this.masterGain.connect(this.limiter);
    this.limiter.connect(this.ctx.destination);

    // Analyser tap for the live aura visualizer (sees the full pre-limiter mix).
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 512;
    this.analyser.smoothingTimeConstant = 0.82;
    this.masterGain.connect(this.analyser);

    // Brain-wave tone bus (gently faded in).
    this.binauralVol = config.binauralVol;
    this.binauralGain = this.ctx.createGain();
    this.binauralGain.gain.value = 0;
    this.binauralGain.connect(this.masterGain);
    this.currentMode = config.mode;
    this.currentBase = config.base;
    this.currentBeat = config.beat;
    this.buildTone(config.base, config.beat, config.mode);
    this.binauralGain.gain.setTargetAtTime(config.binauralVol, this.ctx.currentTime, 0.4);

    // Nature-sound bus + shared reverb send for depth.
    this.bgBus = this.ctx.createGain();
    this.bgBus.gain.value = config.bgVol * 0.5;
    this.bgBus.connect(this.masterGain);
    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = this.impulseBuffer;
    this.reverbWet = this.ctx.createGain();
    this.reverbWet.gain.value = 0.2;
    this.bgBus.connect(this.reverb);
    this.reverb.connect(this.reverbWet).connect(this.masterGain);

    this.voices = new Map();
    config.sounds.forEach((s) => this.addSound(s.type, s.volume));
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
    this.buildTone(this.currentBase, this.currentBeat, mode);
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
    this.binauralVol = binaural;
    if (this.masterGain) this.masterGain.gain.setTargetAtTime(master, t, 0.1);
    if (this.binauralGain) this.binauralGain.gain.setTargetAtTime(binaural, t, 0.1);
    if (this.bgBus) this.bgBus.gain.setTargetAtTime(bg * 0.5, t, 0.1);
  }

  // --- Nature-sound layering ---
  addSound(type: BackgroundSoundType, volume: number, fadeSec = 0.8) {
    if (!this.ctx || !this.bgBus || type === 'none') return;
    const existing = this.voices.get(type);
    if (existing) { this.setSoundVolume(type, volume); return; }

    const gain = this.ctx.createGain();
    gain.gain.value = 0;
    gain.connect(this.bgBus);
    const bucket: Bucket = { nodes: [], intervals: [], timeouts: [] };
    this.playBackgroundSound(type, gain, bucket);
    this.voices.set(type, { gain, bucket, volume });
    gain.gain.setTargetAtTime(volume, this.ctx.currentTime, fadeSec / 3);
  }

  removeSound(type: BackgroundSoundType, fadeSec = 0.8) {
    const voice = this.voices.get(type);
    if (!voice || !this.ctx) return;
    this.voices.delete(type);
    voice.gain.gain.setTargetAtTime(0, this.ctx.currentTime, fadeSec / 3);
    const id = window.setTimeout(() => this.disposeVoice(voice), Math.ceil(fadeSec * 1000) + 400);
    this.pendingCleanups.push(id);
  }

  setSoundVolume(type: BackgroundSoundType, volume: number) {
    const voice = this.voices.get(type);
    if (!voice || !this.ctx) return;
    voice.volume = volume;
    voice.gain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.08);
  }

  // Reconcile active layers to a desired set (add missing, drop extra, update volumes).
  setSounds(layers: SoundLayer[]) {
    const desired = new Map(layers.map((l) => [l.type, l.volume] as const));
    for (const type of [...this.voices.keys()]) {
      if (!desired.has(type)) this.removeSound(type);
    }
    for (const [type, vol] of desired) {
      if (this.voices.has(type)) this.setSoundVolume(type, vol);
      else this.addSound(type, vol);
    }
  }

  activeSoundTypes(): BackgroundSoundType[] {
    return [...this.voices.keys()];
  }

  private disposeVoice(voice: Voice) {
    voice.bucket.nodes.forEach((n) => {
      try { (n as OscillatorNode).stop?.(); n.disconnect(); } catch (e) { /* ignore */ }
    });
    voice.bucket.intervals.forEach((id) => clearInterval(id));
    voice.bucket.timeouts.forEach((id) => clearTimeout(id));
    try { voice.gain.disconnect(); } catch (e) { /* ignore */ }
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

  private playBackgroundSound(type: BackgroundSoundType, dest: AudioNode, bucket: Bucket) {
    switch (type) {
      case 'rain': this.startRain(dest, bucket); break;
      case 'thunder': this.startThunder(dest, bucket); break;
      case 'stream': this.startStream(dest, bucket); break;
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
      case 'frogs': this.startFrogs(dest, bucket); break;
      case 'owl': this.startOwl(dest, bucket); break;
      case 'night': this.startCrickets(dest, bucket); break;
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
    }
    return buffer;
  }

  // Exponentially decaying stereo noise = a simple, smooth reverb impulse.
  createImpulseResponse() {
    if (!this.ctx) return null;
    const length = Math.floor(this.ctx.sampleRate * 2.2);
    const buffer = this.ctx.createBuffer(2, length, this.ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        const t = i / length;
        const decay = Math.pow(1 - t, 2.5 + ch * 0.4);
        data[i] = (Math.random() * 2 - 1) * decay;
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
    heavyGain.gain.value = 0.6;
    heavyNode.connect(heavyFilter).connect(heavyGain).connect(dest);
    heavyNode.start();
    this.register(bucket, heavyNode);

    const hissNode = this.noiseSource(this.pinkNoiseBuffer)!;
    const hissFilter = this.ctx.createBiquadFilter();
    hissFilter.type = 'lowpass';
    hissFilter.frequency.value = 700;
    const hissGain = this.ctx.createGain();
    hissGain.gain.value = 0.4;
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
      gain.gain.linearRampToValueAtTime(0.8, t + attackTime);
      gain.gain.exponentialRampToValueAtTime(0.01, t + decayTime);
      src.start(t); src.stop(t + decayTime + 0.05);
    };

    const id = window.setInterval(() => {
      if (Math.random() > 0.15) makeDrop();
      if (Math.random() > 0.5) setTimeout(makeDrop, 20 + Math.random() * 30);
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
      crackSrc.connect(crackBp).connect(crackGain).connect(pan);
      crackSrc.start(t); crackSrc.stop(t + 0.7);
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
      src.start(t); src.stop(t + dur + 0.1);
      this.register(bucket, src, true);

      const id = window.setTimeout(boom, 7000 + Math.random() * 12000);
      bucket.timeouts.push(id);
    };

    const id = window.setTimeout(boom, 2500 + Math.random() * 4000);
    bucket.timeouts.push(id);
  }

  // --- 3. STREAM (flowing water bed + bubbling drips) ---
  private startStream(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer) return;

    const bed = this.noiseSource(this.pinkNoiseBuffer)!;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1100;
    bp.Q.value = 0.6;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 400;
    const bedGain = this.ctx.createGain();
    bedGain.gain.value = 0.44;
    bed.connect(bp).connect(hp).connect(bedGain).connect(dest);
    bed.start();
    this.register(bucket, bed);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.15;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 350;
    lfo.connect(lfoGain).connect(bp.frequency);
    lfo.start();
    this.register(bucket, lfo);

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
      const f = 250 + Math.random() * 450;
      bpf.frequency.setValueAtTime(f, t);
      bpf.frequency.exponentialRampToValueAtTime(f * 1.6, t + 0.05);
      bpf.Q.value = 3 + Math.random() * 3;
      const gain = this.ctx.createGain();
      const dur = 0.05 + Math.random() * 0.08;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.13 + Math.random() * 0.06, t + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      src.connect(bpf).connect(gain).connect(this.makePan(Math.random() * 1.4 - 0.7, dest));
      src.start(t); src.stop(t + dur + 0.02);

      const id = window.setTimeout(drip, 120 + Math.random() * 380);
      bucket.timeouts.push(id);
    };
    drip();
  }

  // --- 4. BIRDS ---
  private startBirds(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx) return;

    const playSparrowChirp = (t: number, dur: number = 0.1) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain).connect(this.makePan(Math.random() * 1.6 - 0.8, dest));
      osc.type = 'sine';
      const startFreq = 3500 + Math.random() * 1000;
      const endFreq = startFreq * 0.5;
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.42, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.start(t);
      osc.stop(t + dur + 0.05);
    };

    const playPattern = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const p = Math.random();
      if (p < 0.2) playSparrowChirp(t);
      else if (p < 0.4) { playSparrowChirp(t); playSparrowChirp(t + 0.12); }
      else if (p < 0.5) { playSparrowChirp(t); playSparrowChirp(t + 0.12); playSparrowChirp(t + 0.24); }
      else if (p < 0.65) playSparrowChirp(t, 0.25);
      else if (p < 0.8) {
        playSparrowChirp(t);
        setTimeout(() => { if (this.ctx) playSparrowChirp(this.ctx.currentTime, 0.1); }, 300);
      } else if (p < 0.9) { for (let i = 0; i < 5; i++) playSparrowChirp(t + i * 0.08); }
      else {
        playSparrowChirp(t, 0.15);
        playSparrowChirp(t + 0.2, 0.1);
        playSparrowChirp(t + 0.4, 0.2);
      }
      const id = window.setTimeout(playPattern, 1000 + Math.random() * 4000);
      bucket.timeouts.push(id);
    };
    playPattern();
  }

  // --- 5. CRICKETS ---
  private startCrickets(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx) return;

    // Faint continuous distant chorus on both sides, under the near chirps.
    [[4300, 24, -0.6], [4600, 31, 0.6]].forEach(([freq, am, pan]) => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const gate = this.ctx!.createGain();
      gate.gain.value = 0.5;
      const amOsc = this.ctx!.createOscillator();
      amOsc.frequency.value = am;
      const amDepth = this.ctx!.createGain();
      amDepth.gain.value = 0.5;
      amOsc.connect(amDepth).connect(gate.gain);
      const bp = this.ctx!.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 2;
      const level = this.ctx!.createGain();
      level.gain.value = 0.035;
      osc.connect(gate).connect(bp).connect(level).connect(this.makePan(pan, dest));
      osc.start(); amOsc.start();
      this.register(bucket, osc);
      this.register(bucket, amOsc);
    });

    const playSound = (t: number, dur: number, type: 'short' | 'long') => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = 4500;
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = type === 'long' ? 30 : 40;
      const modGain = this.ctx.createGain();
      modGain.gain.value = 0.6;
      lfo.connect(modGain.gain);
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
      const id = window.setTimeout(loop, 1200 + Math.random() * 2500);
      bucket.timeouts.push(id);
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
    rGain.gain.value = 1.0;
    rumble.connect(rFilter).connect(rGain).connect(dest);
    rumble.start();
    this.register(bucket, rumble);

    const roar = this.noiseSource(this.pinkNoiseBuffer)!;
    const roarFilter = this.ctx.createBiquadFilter();
    roarFilter.type = 'lowpass'; roarFilter.frequency.value = 600;
    const roarGain = this.ctx.createGain();
    roarGain.gain.value = 0.55;
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
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
      src.start(t); src.stop(t + 0.1);
    };

    const loopCrackle = () => {
      if (Math.random() > 0.3) {
        makeCrackle();
        if (Math.random() > 0.7) setTimeout(makeCrackle, 50 + Math.random() * 50);
      }
      const id = window.setTimeout(loopCrackle, 200 + Math.random() * 1800);
      bucket.timeouts.push(id);
    };
    loopCrackle();

    // Occasional deep log pop for body.
    const pop = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, t);
      osc.frequency.exponentialRampToValueAtTime(55, t + 0.06);
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.5, t + 0.004);
      env.gain.exponentialRampToValueAtTime(0.005, t + 0.08);
      osc.connect(env).connect(this.makePan(Math.random() * 0.8 - 0.4, dest));
      osc.start(t); osc.stop(t + 0.1);
      const id = window.setTimeout(pop, 3000 + Math.random() * 6000);
      bucket.timeouts.push(id);
    };
    pop();
  }

  // --- 7. WIND / FOREST ---
  private startWind(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer) return;
    const node = this.noiseSource(this.pinkNoiseBuffer)!;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 380; filter.Q.value = 0;
    const windGain = this.ctx.createGain();
    windGain.gain.value = 2.6;
    node.connect(filter).connect(windGain).connect(dest);
    node.start();
    this.register(bucket, node);

    // Leaf rustle: a high band that swells with the gusts, so it reads as
    // trees in wind rather than plain filtered noise.
    const rustle = this.noiseSource(this.pinkNoiseBuffer)!;
    const rustleHp = this.ctx.createBiquadFilter();
    rustleHp.type = 'highpass'; rustleHp.frequency.value = 1400;
    const rustleLp = this.ctx.createBiquadFilter();
    rustleLp.type = 'lowpass'; rustleLp.frequency.value = 5200;
    const rustleGain = this.ctx.createGain();
    rustleGain.gain.value = 0.1;
    rustle.connect(rustleHp).connect(rustleLp).connect(rustleGain).connect(dest);
    rustle.start();
    this.register(bucket, rustle);

    const animate = () => {
      if (!this.ctx) return; const t = this.ctx.currentTime;
      const gust = 2 + Math.random() * 4;
      filter.frequency.exponentialRampToValueAtTime(200 + Math.random() * 200, t + gust);
      rustleGain.gain.setTargetAtTime(0.05 + Math.random() * 0.14, t, gust / 3);
    };
    animate();
    const id = window.setInterval(animate, 5000);
    bucket.intervals.push(id);
  }

  // --- 8. WAVE ---
  private startWave(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer || !this.whiteNoiseBuffer) return;
    const node = this.noiseSource(this.pinkNoiseBuffer)!;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 500;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.62;
    node.connect(filter).connect(gain).connect(dest);
    node.start();
    this.register(bucket, node);

    // Foam hiss that crests with the swell, then washes out.
    const foam = this.noiseSource(this.whiteNoiseBuffer)!;
    const foamHp = this.ctx.createBiquadFilter();
    foamHp.type = 'highpass'; foamHp.frequency.value = 2800;
    const foamGain = this.ctx.createGain();
    foamGain.gain.value = 0.03;
    foam.connect(foamHp).connect(foamGain).connect(dest);
    foam.start();
    this.register(bucket, foam);

    const animate = () => {
      if (!this.ctx) return; const t = this.ctx.currentTime;
      filter.frequency.exponentialRampToValueAtTime(1200, t + 4);
      gain.gain.linearRampToValueAtTime(1.6, t + 4);
      foamGain.gain.linearRampToValueAtTime(0.14, t + 4.6);
      filter.frequency.exponentialRampToValueAtTime(300, t + 8);
      gain.gain.linearRampToValueAtTime(0.62, t + 8);
      foamGain.gain.linearRampToValueAtTime(0.03, t + 8);
    };
    animate();
    const id = window.setInterval(animate, 8000);
    bucket.intervals.push(id);
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

    const spray = this.noiseSource(this.whiteNoiseBuffer)!;
    const sprayHp = this.ctx.createBiquadFilter();
    sprayHp.type = 'highpass'; sprayHp.frequency.value = 1800;
    const sprayGain = this.ctx.createGain();
    sprayGain.gain.value = 0.05;
    spray.connect(sprayHp).connect(sprayGain).connect(dest);
    spray.start();
    this.register(bucket, spray);
  }

  // --- CICADAS (two chorus voices, AM buzz with slow swells) ---
  private startCicadas(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx) return;

    const voice = (carrierHz: number, amHz: number, swellHz: number, pan: number) => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = carrierHz;

      const gate = this.ctx!.createGain();
      gate.gain.value = 0.5;
      const am = this.ctx!.createOscillator();
      am.frequency.value = amHz;
      const amDepth = this.ctx!.createGain();
      amDepth.gain.value = 0.5;
      am.connect(amDepth).connect(gate.gain);

      const bp = this.ctx!.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = carrierHz; bp.Q.value = 1;

      // Slow wax-and-wane so the chorus breathes instead of droning.
      const level = this.ctx!.createGain();
      level.gain.value = 0.072;
      const swell = this.ctx!.createOscillator();
      swell.frequency.value = swellHz;
      const swellDepth = this.ctx!.createGain();
      swellDepth.gain.value = 0.03;
      swell.connect(swellDepth).connect(level.gain);

      osc.connect(gate).connect(bp).connect(level).connect(this.makePan(pan, dest));
      osc.start(); am.start(); swell.start();
      [osc, am, swell].forEach((n) => this.register(bucket, n));
    };

    voice(4100, 108, 0.07, -0.5);
    voice(4650, 127, 0.11, 0.5);
  }

  // --- FROGS (pulsed croaks scattered around a pond) ---
  private startFrogs(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx) return;

    // A croak is a fast train of noise grains ("rrr-ribbit") through a resonant
    // band — the summed gain bumps give the creaky pulse texture, far more
    // frog-like than an amplitude-modulated tone (which read as a duck/kazoo).
    const croak = (t0: number, pan: number) => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const out = this.makePan(pan, dest);
      const src = this.ctx.createBufferSource();
      src.buffer = this.pinkNoiseBuffer;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      const centerF = 420 + Math.random() * 380;
      bp.frequency.setValueAtTime(centerF, t0);
      bp.Q.value = 6 + Math.random() * 4;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      src.connect(bp).connect(g).connect(out);

      const grains = 7 + Math.floor(Math.random() * 8);
      const rate = 0.017 + Math.random() * 0.008;
      let t = t0;
      for (let i = 0; i < grains; i++) {
        const gd = rate * 0.72;
        const taper = i > grains - 3 ? 0.55 : 1;
        g.gain.setValueAtTime(0.02, t);
        g.gain.linearRampToValueAtTime(0.5 * taper, t + gd * 0.35);
        g.gain.exponentialRampToValueAtTime(0.02, t + gd);
        t += rate;
      }
      bp.frequency.linearRampToValueAtTime(centerF * 1.35, t); // "ribbit" lift
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      src.start(t0); src.stop(t + 0.08);
    };

    const loop = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const pan = Math.random() * 1.6 - 0.8;
      croak(t, pan);
      if (Math.random() < 0.3) croak(t + 0.35, pan);
      if (Math.random() < 0.25) croak(t + 0.6 + Math.random() * 0.4, -pan); // answer from the other side
      const id = window.setTimeout(loop, 700 + Math.random() * 2800);
      bucket.timeouts.push(id);
    };
    loop();
  }

  // --- OWL (soft distant hoots) ---
  private startOwl(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx) return;

    const hoot = (t: number, dur: number, pan: StereoPannerNode) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(345, t);
      osc.frequency.exponentialRampToValueAtTime(295, t + dur);
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.55, t + 0.07);
      env.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(env).connect(pan);
      osc.start(t); osc.stop(t + dur + 0.05);
    };

    const call = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const pan = this.makePan(Math.random() * 1.0 - 0.5, dest);
      hoot(t, 0.4, pan);
      if (Math.random() < 0.65) {
        hoot(t + 0.55, 0.28, pan);
        hoot(t + 0.9, 0.45, pan);
      }
      const id = window.setTimeout(call, 7000 + Math.random() * 11000);
      bucket.timeouts.push(id);
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
      env.gain.linearRampToValueAtTime(0.44, t + 0.05);
      env.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(lp).connect(env).connect(pan);
      osc.start(t); osc.stop(t + dur + 0.05);
    };

    const call = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const pan = this.makePan(Math.random() * 1.2 - 0.6, dest);
      // "뻐-꾹": F#5 then D5
      note(t, 740, 0.3, pan);
      note(t + 0.45, 587, 0.38, pan);
      if (Math.random() < 0.55) { note(t + 1.5, 740, 0.3, pan); note(t + 1.95, 587, 0.38, pan); }
      const id = window.setTimeout(call, 8000 + Math.random() * 10000);
      bucket.timeouts.push(id);
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
      bp.type = 'bandpass'; bp.frequency.value = 1050 + Math.random() * 250; bp.Q.value = 2.5;
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.55, t + 0.002);
      env.gain.exponentialRampToValueAtTime(0.01, t + 0.03);
      src.connect(bp).connect(env).connect(pan);
      src.start(t); src.stop(t + 0.05);

      // Hollow-wood thump underneath each knock.
      const thump = this.ctx.createOscillator();
      thump.type = 'sine';
      thump.frequency.setValueAtTime(190, t);
      thump.frequency.exponentialRampToValueAtTime(120, t + 0.04);
      const tEnv = this.ctx.createGain();
      tEnv.gain.setValueAtTime(0, t);
      tEnv.gain.linearRampToValueAtTime(0.35, t + 0.003);
      tEnv.gain.exponentialRampToValueAtTime(0.005, t + 0.05);
      thump.connect(tEnv).connect(pan);
      thump.start(t); thump.stop(t + 0.07);
    };

    const burst = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const pan = this.makePan(Math.random() * 1.4 - 0.7, dest);
      const count = 8 + Math.floor(Math.random() * 7);
      const rate = 0.05 + Math.random() * 0.015;
      for (let i = 0; i < count; i++) knock(t + i * rate, pan);
      const id = window.setTimeout(burst, 6000 + Math.random() * 9000);
      bucket.timeouts.push(id);
    };
    burst();
  }

  // --- DUCKS (a little raft of quacks on the pond) ---
  private startDucks(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx) return;

    const quack = (t: number, base: number, peak: number, pan: StereoPannerNode) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(base, t);
      osc.frequency.exponentialRampToValueAtTime(base * 0.82, t + 0.16);
      const formant = this.ctx.createBiquadFilter();
      formant.type = 'bandpass'; formant.frequency.value = 900; formant.Q.value = 1.6;
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(peak, t + 0.025);
      env.gain.setValueAtTime(peak * 0.8, t + 0.1);
      env.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(formant).connect(env).connect(pan);
      osc.start(t); osc.stop(t + 0.24);
    };

    const series = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const pan = this.makePan(Math.random() * 1.2 - 0.6, dest);
      const n = 2 + Math.floor(Math.random() * 3);
      const base = 265 + Math.random() * 60;
      for (let i = 0; i < n; i++) {
        quack(t + i * 0.3, base * (1 + Math.random() * 0.06 - 0.03), 0.42 * Math.pow(0.85, i), pan);
      }
      const id = window.setTimeout(series, 7000 + Math.random() * 9000);
      bucket.timeouts.push(id);
    };
    series();
  }

  // --- CAVE (deep still air + echoing water drips) ---
  private startCave(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.brownNoiseBuffer) return;

    const air = this.noiseSource(this.brownNoiseBuffer)!;
    const airLp = this.ctx.createBiquadFilter();
    airLp.type = 'lowpass'; airLp.frequency.value = 140;
    const airGain = this.ctx.createGain();
    airGain.gain.value = 0.72;
    air.connect(airLp).connect(airGain).connect(dest);
    air.start();
    this.register(bucket, air);

    // The cave slowly "breathes".
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.15;
    lfo.connect(lfoGain).connect(airGain.gain);
    lfo.start();
    this.register(bucket, lfo);

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
      const id = window.setTimeout(drip, 1500 + Math.random() * 3500);
      bucket.timeouts.push(id);
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
    if (!this.ctx) return;

    const cry = (t: number, pan: StereoPannerNode) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      const dur = 0.4 + Math.random() * 0.3;
      const start = 850 + Math.random() * 150;
      osc.frequency.setValueAtTime(start, t);
      osc.frequency.exponentialRampToValueAtTime(start * 1.5, t + 0.08);
      osc.frequency.exponentialRampToValueAtTime(620, t + dur);

      const vib = this.ctx.createOscillator();
      vib.frequency.value = 9;
      const vibDepth = this.ctx.createGain();
      vibDepth.gain.value = 35;
      vib.connect(vibDepth).connect(osc.frequency);

      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 1200; bp.Q.value = 1.2;

      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.4, t + 0.04);
      env.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(bp).connect(env).connect(pan);
      osc.start(t); vib.start(t);
      osc.stop(t + dur + 0.05); vib.stop(t + dur + 0.05);
    };

    const flock = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const pan = this.makePan(Math.random() * 1.6 - 0.8, dest);
      const count = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) cry(t + i * (0.3 + Math.random() * 0.2), pan);
      const id = window.setTimeout(flock, 6000 + Math.random() * 10000);
      bucket.timeouts.push(id);
    };
    flock();
  }

  // --- 9. WIND CHIMES (random pentatonic bell tones) ---
  private startChimes(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx) return;
    const notes = [523.25, 587.33, 659.25, 783.99, 880.0]; // C5 D5 E5 G5 A5

    const ding = (t: number) => {
      if (!this.ctx) return;
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const pan = this.makePan(Math.random() * 1.4 - 0.7, dest);
      [[1, 0.44, 2.6], [2.76, 0.17, 0.9]].forEach(([ratio, amp, dur]) => {
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
    };

    const gust = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const count = 1 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) ding(t + i * (0.08 + Math.random() * 0.22));
      const id = window.setTimeout(gust, 3000 + Math.random() * 6000);
      bucket.timeouts.push(id);
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
      const id = window.setTimeout(strike, 7000 + Math.random() * 9000);
      bucket.timeouts.push(id);
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
    gain.gain.value = 0.09;
    node.connect(filter).connect(gain).connect(dest);
    node.start();
    this.register(bucket, node);
  }

  // --- 14. PINK NOISE ---
  private startPinkNoise(dest: AudioNode, bucket: Bucket) {
    if (!this.ctx || !this.pinkNoiseBuffer) return;
    const node = this.noiseSource(this.pinkNoiseBuffer)!;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.25;
    node.connect(gain).connect(dest);
    node.start();
    this.register(bucket, node);
  }

  // Live frequency-analysis node for the visualizer (null while stopped).
  getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  // Re-activate the context after the browser suspends it (e.g. on tab/screen lock).
  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  // Gradually fade the whole mix to silence over `seconds`, then tear down.
  // Used by sleep mode so a session ends gently instead of cutting out.
  fadeOutStop(seconds = 10) {
    if (!this.ctx || !this.masterGain) { this.stop(); return; }
    this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, seconds / 4);
    const id = window.setTimeout(() => this.stop(), Math.ceil(seconds * 1000) + 500);
    this.pendingCleanups.push(id);
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
    this.teardownTone();
    this.voices.forEach((v) => this.disposeVoice(v));
    this.voices.clear();
    this.pendingCleanups.forEach((id) => clearTimeout(id));
    this.pendingCleanups = [];
    [this.reverbWet, this.reverb, this.bgBus, this.binauralGain, this.analyser, this.limiter, this.masterGain].forEach((n) => {
      try { n?.disconnect(); } catch (e) { /* ignore */ }
    });
    this.reverbWet = null;
    this.reverb = null;
    this.bgBus = null;
    this.binauralGain = null;
    this.analyser = null;
    this.limiter = null;
    this.masterGain = null;
  }

  // Fully release audio resources (called when the app unmounts).
  dispose() {
    this.stop();
    if (this.ctx) { try { this.ctx.close(); } catch (e) {} this.ctx = null; }
    this.pinkNoiseBuffer = null;
    this.brownNoiseBuffer = null;
    this.whiteNoiseBuffer = null;
    this.impulseBuffer = null;
  }
}
