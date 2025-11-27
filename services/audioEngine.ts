import { BackgroundSoundType } from '../types';

export class BinauralEngine {
  private ctx: AudioContext | null = null;
  private leftOsc: OscillatorNode | null = null;
  private rightOsc: OscillatorNode | null = null;
  
  // Resource Management
  private activeNodes: AudioNode[] = [];
  private intervals: number[] = [];
  private timeouts: number[] = [];
  
  // Buffers
  private pinkNoiseBuffer: AudioBuffer | null = null;
  private brownNoiseBuffer: AudioBuffer | null = null;

  // Gains
  private masterGain: GainNode | null = null;
  private binauralGain: GainNode | null = null; 
  private bgGain: GainNode | null = null; 

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.pinkNoiseBuffer) this.pinkNoiseBuffer = this.createPinkNoiseBuffer();
    if (!this.brownNoiseBuffer) this.brownNoiseBuffer = this.createBrownNoiseBuffer();
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

    this.bgGain = this.ctx.createGain();
    this.bgGain.gain.value = bgVol * 0.4; 
    this.bgGain.connect(this.masterGain);

    if (bgType !== 'none') {
        this.playBackgroundSound(bgType);
    }
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
      if (!this.ctx || !this.masterGain) return;
      this.stopBackgroundSounds();

      if (!this.bgGain) {
          this.bgGain = this.ctx.createGain();
          this.bgGain.connect(this.masterGain);
      }
      
      if (bgType !== 'none') {
          this.playBackgroundSound(bgType);
      }
  }

  private stopBackgroundSounds() {
      this.activeNodes.forEach(node => {
          try { 
              if(node instanceof OscillatorNode || node instanceof AudioBufferSourceNode) node.stop(); 
              node.disconnect(); 
          } catch(e) { /* ignore */ }
      });
      this.activeNodes = [];
      this.intervals.forEach(id => clearInterval(id));
      this.intervals = [];
      this.timeouts.forEach(id => clearTimeout(id));
      this.timeouts = [];
  }

  private registerNode(node: AudioNode) {
      this.activeNodes.push(node);
  }

  private playBackgroundSound(type: BackgroundSoundType) {
      switch(type) {
          case 'birds': this.startBirds(); break;
          case 'night': this.startCrickets(); break;
          case 'fire': this.startFire(); break;
          case 'wave': this.startWave(); break;
          case 'forest': this.startWind(); break;
          case 'rain': this.startRain(); break;
          case 'white': this.startWhiteNoise(); break;
      }
  }

  // --- Buffer Generators ---
  createPinkNoiseBuffer() {
      if (!this.ctx) return null;
      const bufferSize = 2 * this.ctx.sampleRate;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0;
      for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.11; 
          b6 = white * 0.115926;
      }
      return buffer;
  }

  createBrownNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = 2 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; 
    }
    return buffer;
  }

  // --- 1. RAIN (Natural with Rare Metallic Hits) ---
  startRain() {
      if (!this.ctx || !this.bgGain || !this.pinkNoiseBuffer || !this.brownNoiseBuffer) return;

      const heavyNode = this.ctx.createBufferSource();
      heavyNode.buffer = this.brownNoiseBuffer;
      heavyNode.loop = true;
      const heavyFilter = this.ctx.createBiquadFilter();
      heavyFilter.type = 'lowpass';
      heavyFilter.frequency.value = 250; 
      const heavyGain = this.ctx.createGain();
      heavyGain.gain.value = 0.6;
      
      heavyNode.connect(heavyFilter).connect(heavyGain).connect(this.bgGain);
      heavyNode.start();
      this.registerNode(heavyNode);

      const hissNode = this.ctx.createBufferSource();
      hissNode.buffer = this.pinkNoiseBuffer;
      hissNode.loop = true;
      const hissFilter = this.ctx.createBiquadFilter();
      hissFilter.type = 'lowpass';
      hissFilter.frequency.value = 700; 
      hissFilter.Q.value = 0; 
      const hissGain = this.ctx.createGain();
      hissGain.gain.value = 0.4;

      hissNode.connect(hissFilter).connect(hissGain).connect(this.bgGain);
      hissNode.start();
      this.registerNode(hissNode);

      const dropGain = this.ctx.createGain();
      dropGain.gain.value = 1.2;
      dropGain.connect(this.bgGain);

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
          } 
          else if (r < 0.4) {
              filter.type = 'lowpass'; 
              filter.frequency.value = 350 + Math.random() * 200; 
              filter.Q.value = 1;
          } 
          else if (r < 0.8) {
              filter.type = 'bandpass'; 
              filter.frequency.value = 500 + Math.random() * 300; 
              filter.Q.value = 1;
          } 
          else {
              filter.type = 'highpass'; 
              filter.frequency.value = 900 + Math.random() * 400; 
              filter.Q.value = 1.5;
          }

          const gain = this.ctx.createGain();
          src.connect(filter).connect(gain).connect(dropGain);

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

  // --- 2. BIRDS ---
  startBirds() {
      if (!this.ctx || !this.bgGain) return;

      const playSparrowChirp = (t: number, dur: number = 0.1, type: 'short'|'long' = 'short') => {
          if (!this.ctx || !this.bgGain) return;
          
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          
          osc.connect(gain).connect(this.bgGain!);
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
          else if (p < 0.65) playSparrowChirp(t, 0.25, 'long');
          else if (p < 0.8) { 
              playSparrowChirp(t); 
              setTimeout(() => { if(this.ctx) playSparrowChirp(this.ctx.currentTime, 0.1); }, 300); 
          }
          else if (p < 0.9) { for(let i=0; i<5; i++) playSparrowChirp(t + i*0.08); }
          else { 
              const base = t; 
              playSparrowChirp(base, 0.15); 
              playSparrowChirp(base + 0.2, 0.1); 
              playSparrowChirp(base + 0.4, 0.2); 
          }

          const nextTime = 1000 + Math.random() * 4000;
          const id = window.setTimeout(playPattern, nextTime);
          this.timeouts.push(id);
      };

      playPattern();
  }

  // --- 3. CRICKETS ---
  startCrickets() {
    if (!this.ctx || !this.bgGain) return;

    const playSound = (t: number, dur: number, type: 'short'|'long') => {
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
        osc.connect(modGain).connect(env).connect(this.bgGain!);

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

  // --- 4. FIRE ---
  startFire() {
      if (!this.ctx || !this.bgGain || !this.brownNoiseBuffer || !this.pinkNoiseBuffer) return;
      
      const rumble = this.ctx.createBufferSource();
      rumble.buffer = this.brownNoiseBuffer;
      rumble.loop = true;
      const rFilter = this.ctx.createBiquadFilter();
      rFilter.type = 'lowpass'; rFilter.frequency.value = 350;
      const rGain = this.ctx.createGain();
      rGain.gain.value = 0.6;
      rumble.connect(rFilter).connect(rGain).connect(this.bgGain);
      rumble.start();
      this.registerNode(rumble);

      const roar = this.ctx.createBufferSource();
      roar.buffer = this.pinkNoiseBuffer;
      roar.loop = true;
      const roarFilter = this.ctx.createBiquadFilter();
      roarFilter.type = 'lowpass'; roarFilter.frequency.value = 600;
      const roarGain = this.ctx.createGain();
      roarGain.gain.value = 0.3;
      roar.connect(roarFilter).connect(roarGain).connect(this.bgGain);
      roar.start();
      this.registerNode(roar);

      const cGain = this.ctx.createGain();
      cGain.gain.value = 0.7;
      cGain.connect(this.bgGain);

      const makeCrackle = () => {
          if(!this.ctx || !this.pinkNoiseBuffer) return;
          const t = this.ctx.currentTime;
          const src = this.ctx.createBufferSource();
          src.buffer = this.pinkNoiseBuffer;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass'; filter.frequency.value = 500 + Math.random()*1500; filter.Q.value = 2;
          const gain = this.ctx.createGain();
          src.connect(filter).connect(gain).connect(cGain);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(1, t+0.002);
          gain.gain.exponentialRampToValueAtTime(0.01, t+0.08);
          src.start(t); src.stop(t+0.1);
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

  // --- Other Sounds ---
  startWhiteNoise() {
      if (!this.ctx || !this.bgGain || !this.brownNoiseBuffer) return;
      const node = this.ctx.createBufferSource();
      node.buffer = this.brownNoiseBuffer;
      node.loop = true;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass'; filter.frequency.value = 800;
      node.connect(filter).connect(this.bgGain);
      node.start();
      this.registerNode(node);
  }

  startWave() {
      if (!this.ctx || !this.bgGain || !this.pinkNoiseBuffer) return;
      const node = this.ctx.createBufferSource();
      node.buffer = this.pinkNoiseBuffer;
      node.loop = true;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass'; filter.frequency.value = 500;
      const gain = this.ctx.createGain();
      gain.gain.value = 0.2;
      node.connect(filter).connect(gain).connect(this.bgGain);
      node.start();
      this.registerNode(node);

      const animate = () => {
          if(!this.ctx) return; const t = this.ctx.currentTime;
          filter.frequency.exponentialRampToValueAtTime(1200, t+4);
          gain.gain.linearRampToValueAtTime(0.8, t+4);
          filter.frequency.exponentialRampToValueAtTime(300, t+8);
          gain.gain.linearRampToValueAtTime(0.2, t+8);
      };
      animate();
      const id = window.setInterval(animate, 8000);
      this.intervals.push(id);
  }

  startWind() {
      if (!this.ctx || !this.bgGain || !this.pinkNoiseBuffer) return;
      const node = this.ctx.createBufferSource();
      node.buffer = this.pinkNoiseBuffer;
      node.loop = true;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass'; filter.frequency.value = 300; filter.Q.value = 0;
      node.connect(filter).connect(this.bgGain);
      node.start();
      this.registerNode(node);
      
      const animate = () => {
          if(!this.ctx) return; const t = this.ctx.currentTime;
          filter.frequency.exponentialRampToValueAtTime(200 + Math.random()*200, t + 4 + Math.random()*4);
      };
      animate();
      const id = window.setInterval(animate, 5000);
      this.intervals.push(id);
  }

  stop() {
    if (this.leftOsc) { try { this.leftOsc.stop(); } catch(e){} this.leftOsc = null; }
    if (this.rightOsc) { try { this.rightOsc.stop(); } catch(e){} this.rightOsc = null; }
    this.stopBackgroundSounds();
  }
}