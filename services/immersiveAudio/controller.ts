import { ACCENT_SPECS, isAccentKind, renderAccentPcm } from './synthesis';
import type { AccentKind, AccentPlaybackState, AccentRequest, SceneAccentController, SceneAccentDependencies } from './types';

export const ACCENT_LIMITS = Object.freeze({ maxVoices: 2, globalCooldownSeconds: 1.8, releaseSeconds: 0.06, maxPan: 0.6 });
const BLOCKED: AccentPlaybackState = Object.freeze({ active: false, muted: true, gateOpen: false });
interface Voice {
  source: AudioBufferSourceNode;
  gain: GainNode;
  pan: StereoPannerNode;
  endAt: number;
  releasing: boolean;
}

/** A finite one-shot attachment to an existing engine bus, not a second mixer. */
export function createSceneAccentController({ context, output }: SceneAccentDependencies): SceneAccentController {
  let state = BLOCKED;
  let disposed = false;
  let usable = Boolean(context && output && output.context === context && output !== context.destination);
  let lastTime = -Infinity;
  const lastKind = new Map<AccentKind, number>();
  const voices = new Set<Voice>();
  const buffers = new Map<AccentKind, AudioBuffer>();

  const destroy = (voice: Voice) => {
    voices.delete(voice);
    voice.source.onended = null;
    try { voice.source.stop(); } catch { /* already ended/closed */ }
    for (const node of [voice.source, voice.gain, voice.pan]) {
      try { node.disconnect(); } catch { /* disconnected/closed context */ }
    }
  };
  const clear = () => { for (const voice of [...voices]) destroy(voice); };
  const reap = () => {
    for (const voice of voices) if (voice.endAt <= context.currentTime) destroy(voice);
  };
  const release = () => {
    if (context?.state !== 'running') { clear(); return; }
    const now = context.currentTime;
    for (const voice of voices) {
      if (voice.releasing) continue;
      voice.releasing = true;
      voice.endAt = Math.min(voice.endAt, now + ACCENT_LIMITS.releaseSeconds);
      try {
        // This node stays at unity until release; the PCM owns the natural envelope.
        voice.gain.gain.cancelScheduledValues(now);
        voice.gain.gain.setValueAtTime(1, now);
        voice.gain.gain.linearRampToValueAtTime(0, voice.endAt);
        voice.source.stop(voice.endAt);
      } catch { destroy(voice); }
    }
  };
  const onStateChange = () => {
    if (context.state !== 'running') {
      state = BLOCKED;
      clear(); // Never queue a tail to play when an interrupted context resumes.
    }
  };
  if (usable) {
    try { context.addEventListener('statechange', onStateChange); }
    catch { usable = false; }
  }

  return {
    trigger(request: AccentRequest): boolean {
      if (disposed || !usable || state.active !== true || state.muted !== false || state.gateOpen !== true || context.state !== 'running') return false;
      if (!request || !isAccentKind(request.kind) || !Number.isFinite(request.intensity) || !Number.isFinite(request.pan)) return false;
      const intensity = Math.max(0, Math.min(1, request.intensity));
      if (intensity === 0) return false;
      const now = context.currentTime;
      if (!Number.isFinite(now) || now < 0) return false;
      reap();
      if (voices.size >= ACCENT_LIMITS.maxVoices || now - lastTime < ACCENT_LIMITS.globalCooldownSeconds || now - (lastKind.get(request.kind) ?? -Infinity) < ACCENT_SPECS[request.kind].cooldown) return false;
      let source: AudioBufferSourceNode | undefined;
      const partial: AudioNode[] = [];
      let voice: Voice | undefined;
      try {
        let buffer = buffers.get(request.kind);
        if (!buffer) {
          const pcm = renderAccentPcm(request.kind, context.sampleRate);
          buffer = context.createBuffer(1, pcm.length, context.sampleRate);
          buffer.getChannelData(0).set(pcm);
          buffers.set(request.kind, buffer);
        }
        source = context.createBufferSource(); partial.push(source);
        const gain = context.createGain(); partial.push(gain);
        const pan = context.createStereoPanner(); partial.push(pan);
        // Bake the intensity into playback gain without changing the release node's unity.
        // A bounded buffer copy avoids a fourth live gain node and external fader writes.
        if (intensity < 1) {
          const scaled = context.createBuffer(1, buffer.length, buffer.sampleRate);
          const from = buffer.getChannelData(0), to = scaled.getChannelData(0);
          for (let i = 0; i < from.length; i++) to[i] = from[i] * intensity;
          source.buffer = scaled;
        } else source.buffer = buffer;
        source.loop = false;
        gain.gain.setValueAtTime(1, now);
        pan.pan.setValueAtTime(Math.max(-ACCENT_LIMITS.maxPan, Math.min(ACCENT_LIMITS.maxPan, request.pan)), now);
        source.connect(gain); gain.connect(pan); pan.connect(output);
        voice = { source, gain, pan, endAt: now + buffer.duration, releasing: false };
        const live = voice;
        source.onended = () => destroy(live);
        voices.add(voice);
        source.start(now);
        source.stop(voice.endAt);
        lastTime = now;
        lastKind.set(request.kind, now);
        return true;
      } catch {
        if (voice) destroy(voice);
        else {
          try { source?.stop(); } catch { /* not started */ }
          for (const node of partial) { try { node.disconnect(); } catch { /* best effort */ } }
        }
        return false;
      }
    },
    setState(next: AccentPlaybackState) {
      if (disposed) return;
      state = next && typeof next.active === 'boolean' && typeof next.muted === 'boolean' && typeof next.gateOpen === 'boolean'
        ? { active: next.active, muted: next.muted, gateOpen: next.gateOpen }
        : BLOCKED;
      if (state.muted || !state.gateOpen || context?.state !== 'running') clear();
      else if (!state.active) release();
    },
    pause() { state = { ...state, active: false }; release(); },
    release,
    dispose() {
      if (disposed) return;
      disposed = true;
      state = BLOCKED;
      clear();
      buffers.clear();
      lastKind.clear();
      try { context?.removeEventListener('statechange', onStateChange); } catch { /* invalid injected context */ }
    },
    get voiceCount() { if (usable) reap(); return voices.size; },
  };
}
