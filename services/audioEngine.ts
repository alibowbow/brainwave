import { BackgroundSoundType } from '../types';

// Length of the looping noise buffers. Longer buffers make the loop point far
// less noticeable than a short 1-2s loop.
const NOISE_SECONDS = 4;

export class BinauralEngine {
  private ctx: AudioContext | null = null;
  private leftOsc: OscillatorNode | null = null;
  private rightOsc: OscillatorNode | null = null;

  // Resource Management
  private activeNodes: AudioNode[] = [];
  private intervals: number[] = [];
  private timeouts: number[] = [];

  // Buffers (stereo, with decorrelated left/right channels for natural width)
  private pinkNoiseBuffer: AudioBuffer | null = null;
  private brownNoiseBuffer: AudioBuffer | null = null;
  private whiteNoiseBuffer: AudioBuffer | null = null;
  private impulseBuffer: AudioBuffer | null = null;

  // Mix graph
  private masterGain: GainNode | null = null;
  private binauralGain: GainNode | null = null;
  private bgGain: GainNode | null = null;       // background bus (carries the user bg volume)
  private reverb: ConvolverNode | null = null;
  private reverbWet: GainNode | null = null;

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

  start(baseFreq: number, beatFreq: number, masterVol: number, bgType: BackgroundSoundType, bgVol: number, binauralVol: number = 0.5) {
    this.init();
    if (!this.ctx) return;
    this.stop();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = masterVol;
    this.masterGain.connect(this.ctx.destination);

    this.binauralGain = this.ctx.createGain();
    this.binauralGain.gain.value = binauralVol;
    this.binauralGain.connect(this.masterGain);

    const merger = this.ctx.createChannelMerger(2);
    merger.connect(this.binauralGain);

    this.leftOsc = this.ctx.createOscillator();
    this.leftOsc.type = 'sine';
    this.leftOsc.frequency.value = baseFreq;
    this.leftOsc.connect(merger, 0, 0);

    this.rightOsc = this.ctx.createOscillator();
    this.rightOsc.type = 'sine';
    this.rightOsc.frequency.value = baseFreq + beatFreq;
    this.rightOsc.connect(merger, 0, 1);

    this.leftOsc.start();
    this.rightOsc.start();

    this.buildBackgroundBus(bgVol);
    if (bgType !== 'none') {
      this.playBackgroundSound(bgType);
    }
  }

  // Background bus = dry signal + a parallel convolution-reverb send for depth.
  private buildBackgroundBus(bgVol: number) {
    if (!this.ctx || !this.masterGain) return;

    this.bgGain = this.ctx.createGain();
    this.bgGain.gain.value = bgVol * 0.4;
    this.bgGain.connect(this.masterGain);

    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = this.impulseBuffer;
    this.reverbWet = this.ctx.createGain();
    this.reverbWet.gain.value = 0.2;
    this.bgGain.connect(this.reverb);
    this.reverb.connect(this.reverbWet).connect(this.masterGain);
  }

  updateBinauralParams(baseFreq: number, beatFreq: number) {
    if (!this.ctx || !this.leftOsc || !this.rightOsc) return;
    const t = this.ctx.currentTime;
    this.leftOsc.frequency.setTargetAtTime(baseFreq, t, 0.5);
    this.rightOsc.frequency.setTargetAtTime(baseFreq + beatFreq, t, 0.5);
  }

  setVolumes(master: number, binaural: number, bg: number) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    if (this.masterGain) this.masterGain.gain.setTargetAtTime(master, t, 0.1);
    if (this.binauralGain) this.binauralGain.gain.setTargetAtTime(binaural, t, 0.1);
    if (this.bgGain) this.bgGain.gain.setTargetAtTime(bg * 0.4, t, 0.1);
  }

  changeBackgroundSound(bgType: BackgroundSoundType) {
    if (!this.ctx || !this.bgGain) return;
    this.stopBackgroundSounds();
    if (bgType !== 'none') {
      this.playBackgroundSound(bgType);
    }
  }

  private stopBackgroundSounds() {
    this.activeNodes.forEach(node => {
      try {
        if (node instanceof OscillatorNode || node instanceof AudioBufferSourceNode) node.stop();
        node.disconnect();
      } catch (e) { /* ignore */ }
    });
    this.activeNodes = [];
    this.intervals.forEach(id => clearInterval(id));
    this.intervals = [];
    this.timeouts.forEach(id => clearTimeout(id));
    this.timeouts = [];
  }

  // Keep a reference so the node can be stopped later. `temporary` nodes
  // (occasional tonal one-shots) remove themselves once they finish so the
  // bookkeeping array stays small over a long session.
  private registerNode(node: AudioNode, temporary = false) {
    this.activeNodes.push(node);
    if (temporary) {
      (node as AudioScheduledSourceNode).onended = () => {
        const i = this.activeNodes.indexOf(node);
        if (i >= 0) this.activeNodes.splice(i, 1);
        try { node.disconnect(); } catch (e) { /* ignore */ }
      };
    }
  }

  // A short-lived stereo panner feeding the background bus, used to scatter
  // discrete events (drops, chirps, drips, chimes...) across the stereo field.
  private makePan(pan: number): StereoPannerNode {
    const panner = this.ctx!.createStereoPanner();
    panner.pan.value = Math.max(-1, Math.min(1, pan));
    panner.connect(this.bgGain!);
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

  private playBackgroundSound(type: BackgroundSoundType) {
    switch (type) {
      case 'rain': this.startRain(); break;
      case 'thunder': this.startThunder(); break;
      case 'stream': this.startStream(); break;
      case 'wave': this.startWave(); break;
      case 'fire': this.startFire(); break;
      case 'forest': this.startWind(); break;
      case 'birds': this.startBirds(); break;
      case 'night': this.startCrickets(); break;
      case 'chimes': this.startChimes(); break;
      case 'bowl': this.startBowl(); break;
      case 'drone': this.startDrone(); break;
      case 'fan': this.startFan(); break;
      case 'white': this.startWhiteNoise(); break;
      case 'pink': this.startPinkNoise(); break;
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
  startRain() {
    if (!this.ctx || !this.bgGain || !this.pinkNoiseBuffer || !this.brownNoiseBuffer) return;

    const heavyNode = this.noiseSource(this.brownNoiseBuffer)!;
    const heavyFilter = this.ctx.createBiquadFilter();
    heavyFilter.type = 'lowpass';
    heavyFilter.frequency.value = 250;
    const heavyGain = this.ctx.createGain();
    heavyGain.gain.value = 0.6;
    heavyNode.connect(heavyFilter).connect(heavyGain).connect(this.bgGain);
    heavyNode.start();
    this.registerNode(heavyNode);

    const hissNode = this.noiseSource(this.pinkNoiseBuffer)!;
    const hissFilter = this.ctx.createBiquadFilter();
    hissFilter.type = 'lowpass';
    hissFilter.frequency.value = 700;
    const hissGain = this.ctx.createGain();
    hissGain.gain.value = 0.4;
    hissNode.connect(hissFilter).connect(hissGain).connect(this.bgGain);
    hissNode.start();
    this.registerNode(hissNode);

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
      src.connect(filter).connect(gain).connect(this.makePan(Math.random() * 1.6 - 0.8));

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
    this.intervals.push(id);
  }

  // --- 2. THUNDERSTORM (rain bed + distant rolling thunder) ---
  startThunder() {
    if (!this.ctx || !this.bgGain || !this.brownNoiseBuffer) return;
    this.startRain();

    const boom = () => {
      if (!this.ctx || !this.bgGain || !this.brownNoiseBuffer) return;
      const t = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.brownNoiseBuffer;
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass';
      const gain = this.ctx.createGain();
      src.connect(lp).connect(gain).connect(this.makePan(Math.random() * 0.8 - 0.4));

      const dur = 2.5 + Math.random() * 2.5;
      const peak = 0.55 + Math.random() * 0.35;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(peak, t + 0.15 + Math.random() * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      lp.frequency.setValueAtTime(420, t);
      lp.frequency.exponentialRampToValueAtTime(70, t + dur);

      src.start(t); src.stop(t + dur + 0.1);
      this.registerNode(src, true);

      const id = window.setTimeout(boom, 9000 + Math.random() * 17000);
      this.timeouts.push(id);
    };

    const id = window.setTimeout(boom, 4000 + Math.random() * 6000);
    this.timeouts.push(id);
  }

  // --- 3. STREAM (flowing water bed + bubbling drips) ---
  startStream() {
    if (!this.ctx || !this.bgGain || !this.pinkNoiseBuffer) return;

    const bed = this.noiseSource(this.pinkNoiseBuffer)!;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1100;
    bp.Q.value = 0.6;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 400;
    const bedGain = this.ctx.createGain();
    bedGain.gain.value = 0.28;
    bed.connect(bp).connect(hp).connect(bedGain).connect(this.bgGain);
    bed.start();
    this.registerNode(bed);

    // Slow movement of the band so the flow shifts gently.
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.15;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 350;
    lfo.connect(lfoGain).connect(bp.frequency);
    lfo.start();
    this.registerNode(lfo);

    const bubble = () => {
      if (!this.ctx || !this.bgGain) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      const start = 700 + Math.random() * 900;
      osc.frequency.setValueAtTime(start, t);
      osc.frequency.exponentialRampToValueAtTime(start * 0.6, t + 0.08);
      const gain = this.ctx.createGain();
      const dur = 0.07 + Math.random() * 0.12;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12 + Math.random() * 0.1, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain).connect(this.makePan(Math.random() * 1.4 - 0.7));
      osc.start(t); osc.stop(t + dur + 0.02);

      const id = window.setTimeout(bubble, 90 + Math.random() * 420);
      this.timeouts.push(id);
    };
    bubble();
  }

  // --- 4. BIRDS ---
  startBirds() {
    if (!this.ctx || !this.bgGain) return;

    const playSparrowChirp = (t: number, dur: number = 0.1) => {
      if (!this.ctx || !this.bgGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain).connect(this.makePan(Math.random() * 1.6 - 0.8));
      osc.type = 'sine';

      const startFreq = 3500 + Math.random() * 1000;
      const endFreq = startFreq * 0.5;
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(endFreq, t + dur);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.01);
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

      const nextTime = 1000 + Math.random() * 4000;
      const id = window.setTimeout(playPattern, nextTime);
      this.timeouts.push(id);
    };

    playPattern();
  }

  // --- 5. CRICKETS ---
  startCrickets() {
    if (!this.ctx || !this.bgGain) return;

    const playSound = (t: number, dur: number, type: 'short' | 'long') => {
      if (!this.ctx || !this.bgGain) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = 4500;

      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = type === 'long' ? 30 : 40;
      const modGain = this.ctx.createGain();
      modGain.gain.value = 0.6;
      lfo.connect(modGain.gain);

      const env = this.ctx.createGain();
      osc.connect(modGain).connect(env).connect(this.makePan(Math.random() * 1.6 - 0.8));

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

      const nextTime = 1200 + Math.random() * 2500;
      const id = window.setTimeout(loop, nextTime);
      this.timeouts.push(id);
    };
    loop();
  }

  // --- 6. FIRE ---
  startFire() {
    if (!this.ctx || !this.bgGain || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;

    const rumble = this.noiseSource(this.brownNoiseBuffer)!;
    const rFilter = this.ctx.createBiquadFilter();
    rFilter.type = 'lowpass'; rFilter.frequency.value = 350;
    const rGain = this.ctx.createGain();
    rGain.gain.value = 0.6;
    rumble.connect(rFilter).connect(rGain).connect(this.bgGain);
    rumble.start();
    this.registerNode(rumble);

    const roar = this.noiseSource(this.pinkNoiseBuffer)!;
    const roarFilter = this.ctx.createBiquadFilter();
    roarFilter.type = 'lowpass'; roarFilter.frequency.value = 600;
    const roarGain = this.ctx.createGain();
    roarGain.gain.value = 0.3;
    roar.connect(roarFilter).connect(roarGain).connect(this.bgGain);
    roar.start();
    this.registerNode(roar);

    const makeCrackle = () => {
      if (!this.ctx || !this.pinkNoiseBuffer) return;
      const t = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.pinkNoiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass'; filter.frequency.value = 500 + Math.random() * 1500; filter.Q.value = 2;
      const gain = this.ctx.createGain();
      src.connect(filter).connect(gain).connect(this.makePan(Math.random() * 1.2 - 0.6));
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
      const nextTime = 200 + Math.random() * 1800;
      const id = window.setTimeout(loopCrackle, nextTime);
      this.timeouts.push(id);
    };
    loopCrackle();
  }

  // --- 7. WIND / FOREST ---
  startWind() {
    if (!this.ctx || !this.bgGain || !this.pinkNoiseBuffer) return;
    const node = this.noiseSource(this.pinkNoiseBuffer)!;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 300; filter.Q.value = 0;
    node.connect(filter).connect(this.bgGain);
    node.start();
    this.registerNode(node);

    const animate = () => {
      if (!this.ctx) return; const t = this.ctx.currentTime;
      filter.frequency.exponentialRampToValueAtTime(200 + Math.random() * 200, t + 4 + Math.random() * 4);
    };
    animate();
    const id = window.setInterval(animate, 5000);
    this.intervals.push(id);
  }

  // --- 8. WAVE ---
  startWave() {
    if (!this.ctx || !this.bgGain || !this.pinkNoiseBuffer) return;
    const node = this.noiseSource(this.pinkNoiseBuffer)!;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 500;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.2;
    node.connect(filter).connect(gain).connect(this.bgGain);
    node.start();
    this.registerNode(node);

    const animate = () => {
      if (!this.ctx) return; const t = this.ctx.currentTime;
      filter.frequency.exponentialRampToValueAtTime(1200, t + 4);
      gain.gain.linearRampToValueAtTime(0.8, t + 4);
      filter.frequency.exponentialRampToValueAtTime(300, t + 8);
      gain.gain.linearRampToValueAtTime(0.2, t + 8);
    };
    animate();
    const id = window.setInterval(animate, 8000);
    this.intervals.push(id);
  }

  // --- 9. WIND CHIMES (random pentatonic bell tones) ---
  startChimes() {
    if (!this.ctx || !this.bgGain) return;
    const notes = [523.25, 587.33, 659.25, 783.99, 880.0]; // C5 D5 E5 G5 A5

    const ding = (t: number) => {
      if (!this.ctx || !this.bgGain) return;
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const pan = this.makePan(Math.random() * 1.4 - 0.7);
      // Fundamental + a fast-decaying inharmonic partial give a metallic ring.
      [[1, 0.32, 2.6], [2.76, 0.12, 0.9]].forEach(([ratio, amp, dur]) => {
        const osc = this.ctx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq * ratio;
        const gain = this.ctx!.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(amp, t + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0008, t + dur);
        osc.connect(gain).connect(pan);
        osc.start(t); osc.stop(t + dur + 0.05);
        this.registerNode(osc, true);
      });
    };

    const gust = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const count = 1 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) ding(t + i * (0.08 + Math.random() * 0.22));
      const id = window.setTimeout(gust, 3000 + Math.random() * 6000);
      this.timeouts.push(id);
    };
    gust();
  }

  // --- 10. SINGING BOWL (struck inharmonic tone with long, beating decay) ---
  startBowl() {
    if (!this.ctx || !this.bgGain) return;
    const roots = [261.63, 293.66, 329.63, 392.0, 440.0];
    const partials = [1, 2.0, 2.74, 4.07, 5.43];

    const strike = () => {
      if (!this.ctx || !this.bgGain) return;
      const t = this.ctx.currentTime;
      const root = roots[Math.floor(Math.random() * roots.length)];
      const pan = this.makePan(Math.random() * 0.5 - 0.25);

      partials.forEach((ratio, i) => {
        // Two slightly detuned oscillators per partial create the shimmering beat.
        const dur = Math.max(1.6, 6 - i * 0.9);
        const amp = 0.5 / (i + 1.4);
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
          this.registerNode(osc, true);
        });
      });

      const id = window.setTimeout(strike, 7000 + Math.random() * 9000);
      this.timeouts.push(id);
    };
    strike();
  }

  // --- 11. DEEP DRONE (meditative space pad) ---
  startDrone() {
    if (!this.ctx || !this.bgGain) return;
    const base = 55; // A1
    const ratios = [1, 1.5, 2, 3];

    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 600;
    lp.Q.value = 4;
    const droneGain = this.ctx.createGain();
    droneGain.gain.value = 0.5;
    lp.connect(droneGain).connect(this.bgGain);

    ratios.forEach((ratio, i) => {
      [-1, 1].forEach((sign) => {
        const osc = this.ctx!.createOscillator();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.value = base * ratio * (1 + sign * 0.0015);
        const gain = this.ctx!.createGain();
        gain.gain.value = (0.22 / (i + 1));
        osc.connect(gain).connect(lp);
        osc.start();
        this.registerNode(osc);
      });
    });

    // Slow filter sweep + amplitude swell so the pad breathes.
    const fLfo = this.ctx.createOscillator();
    fLfo.frequency.value = 0.05;
    const fLfoGain = this.ctx.createGain();
    fLfoGain.gain.value = 250;
    fLfo.connect(fLfoGain).connect(lp.frequency);
    fLfo.start();
    this.registerNode(fLfo);

    const aLfo = this.ctx.createOscillator();
    aLfo.frequency.value = 0.08;
    const aLfoGain = this.ctx.createGain();
    aLfoGain.gain.value = 0.15;
    aLfo.connect(aLfoGain).connect(droneGain.gain);
    aLfo.start();
    this.registerNode(aLfo);
  }

  // --- 12. FAN (steady motor hum with subtle blade modulation) ---
  startFan() {
    if (!this.ctx || !this.bgGain || !this.brownNoiseBuffer) return;
    const node = this.noiseSource(this.brownNoiseBuffer)!;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 1000;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.5;
    node.connect(lp).connect(gain).connect(this.bgGain);
    node.start();
    this.registerNode(node);

    // Blade "wob": gentle amplitude modulation.
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 14;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.08;
    lfo.connect(lfoGain).connect(gain.gain);
    lfo.start();
    this.registerNode(lfo);

    // Low motor hum underneath.
    const hum = this.ctx.createOscillator();
    hum.type = 'sine';
    hum.frequency.value = 110;
    const humGain = this.ctx.createGain();
    humGain.gain.value = 0.05;
    hum.connect(humGain).connect(this.bgGain);
    hum.start();
    this.registerNode(hum);
  }

  // --- 13. WHITE NOISE ---
  startWhiteNoise() {
    if (!this.ctx || !this.bgGain || !this.whiteNoiseBuffer) return;
    const node = this.noiseSource(this.whiteNoiseBuffer)!;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 9000;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.28;
    node.connect(filter).connect(gain).connect(this.bgGain);
    node.start();
    this.registerNode(node);
  }

  // --- 14. PINK NOISE ---
  startPinkNoise() {
    if (!this.ctx || !this.bgGain || !this.pinkNoiseBuffer) return;
    const node = this.noiseSource(this.pinkNoiseBuffer)!;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.5;
    node.connect(gain).connect(this.bgGain);
    node.start();
    this.registerNode(node);
  }

  // Re-activate the context after the browser suspends it (e.g. on tab/screen lock).
  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  // Gentle ascending bell played when a session finishes, so users who aren't
  // looking at the screen still notice the session has ended.
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
    if (this.leftOsc) { try { this.leftOsc.stop(); } catch (e) {} this.leftOsc = null; }
    if (this.rightOsc) { try { this.rightOsc.stop(); } catch (e) {} this.rightOsc = null; }
    this.stopBackgroundSounds();
    // Tear down the mix graph so repeated start() calls don't accumulate nodes.
    [this.reverbWet, this.reverb, this.bgGain, this.binauralGain, this.masterGain].forEach((n) => {
      try { n?.disconnect(); } catch (e) { /* ignore */ }
    });
    this.reverbWet = null;
    this.reverb = null;
    this.bgGain = null;
    this.binauralGain = null;
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
