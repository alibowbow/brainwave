import { describe, expect, it, vi } from 'vitest';
import { createSceneAccentController } from './controller';
import type { AccentPlaybackState, AccentRequest } from './types';

// This mock checks graph ownership, scheduling and lifecycle. It does not render
// audio; waveform/render measurements are kept in synthesis.test.ts and QA.
type Fault = 'listen' | 'buffer' | 'source' | 'gain' | 'pan' | 'parameter' | 'connect' | 'start' | 'stop' | 'release';
type Automation = { operation: 'set' | 'ramp' | 'cancel'; value?: number; time: number };
class ParamMock {
  events: Automation[] = [];
  constructor(private context: ContextMock) {}
  setValueAtTime(value: number, time: number) {
    this.context.reject('parameter');
    this.events.push({ operation: 'set', value, time });
    return this;
  }
  linearRampToValueAtTime(value: number, time: number) {
    this.events.push({ operation: 'ramp', value, time });
    return this;
  }
  cancelScheduledValues(time: number) {
    this.context.reject('release');
    this.events.push({ operation: 'cancel', time });
    return this;
  }
}
class NodeMock {
  connections: NodeMock[] = [];
  disconnectCount = 0;
  constructor(readonly context: ContextMock, readonly role: string) {}
  connect(destination: NodeMock) {
    this.context.reject('connect');
    this.context.connectAttempts++;
    if (this.context.connectAttempts === this.context.rejectConnectAt) throw new Error('rejected graph edge');
    if (destination.context !== this.context) throw new Error('cross-context connect');
    this.connections.push(destination);
    return destination;
  }
  disconnect() { this.connections = []; this.disconnectCount++; }
}
class BufferMock {
  readonly numberOfChannels: number;
  readonly duration: number;
  private channels: Float32Array[];
  constructor(channels: number, readonly length: number, readonly sampleRate: number) {
    this.numberOfChannels = channels;
    this.duration = length / sampleRate;
    this.channels = Array.from({ length: channels }, () => new Float32Array(length));
  }
  getChannelData(index: number) { return this.channels[index]; }
}
class SourceMock extends NodeMock {
  buffer: BufferMock | null = null;
  loop = true;
  onended: (() => void) | null = null;
  started = false;
  startTimes: number[] = [];
  stopTimes: (number | undefined)[] = [];
  start(time: number) {
    this.context.reject('start');
    if (this.started) throw new Error('source started twice');
    this.started = true;
    this.startTimes.push(time);
  }
  stop(time?: number) {
    this.context.reject('stop');
    if (!this.started) throw new Error('source not started');
    this.stopTimes.push(time);
  }
  end() { this.onended?.(); }
}
class GainMock extends NodeMock { gain = new ParamMock(this.context); }
class PanMock extends NodeMock { pan = new ParamMock(this.context); }
class ContextMock {
  state: AudioContextState = 'running';
  currentTime = 0;
  sampleRate = 48000;
  fault: Fault | undefined;
  connectAttempts = 0;
  rejectConnectAt: number | undefined;
  destination = new NodeMock(this, 'destination');
  output = new NodeMock(this, 'nature-bus');
  sources: SourceMock[] = [];
  gains: GainMock[] = [];
  pans: PanMock[] = [];
  buffers: BufferMock[] = [];
  listeners = new Set<() => void>();
  resume = vi.fn(() => Promise.resolve());
  suspend = vi.fn(() => Promise.resolve());
  close = vi.fn(() => Promise.resolve());
  removeEventListener = vi.fn((event: string, callback: () => void) => {
    expect(event).toBe('statechange');
    this.listeners.delete(callback);
  });
  reject(fault: Fault) { if (this.fault === fault) throw new Error(`rejected ${fault}`); }
  addEventListener(event: string, callback: () => void) {
    this.reject('listen');
    expect(event).toBe('statechange');
    this.listeners.add(callback);
  }
  changeState(state: AudioContextState) {
    this.state = state;
    for (const callback of this.listeners) callback();
  }
  createBuffer(channels: number, length: number, sampleRate: number) {
    this.reject('buffer');
    const buffer = new BufferMock(channels, length, sampleRate);
    this.buffers.push(buffer);
    return buffer;
  }
  createBufferSource() {
    this.reject('source');
    const source = new SourceMock(this, 'source');
    this.sources.push(source);
    return source;
  }
  createGain() {
    this.reject('gain');
    const gain = new GainMock(this, 'gain');
    this.gains.push(gain);
    return gain;
  }
  createStereoPanner() {
    this.reject('pan');
    const pan = new PanMock(this, 'pan');
    this.pans.push(pan);
    return pan;
  }
  get voiceNodes() { return [...this.sources, ...this.gains, ...this.pans]; }
}
const READY: AccentPlaybackState = { active: true, muted: false, gateOpen: true };
const request = (overrides: Partial<AccentRequest> = {}): AccentRequest => ({ kind: 'water-drop', intensity: 0.5, pan: 0, ...overrides });
function setup(ready = true, context = new ContextMock(), output = context.output) {
  const controller = createSceneAccentController({ context: context as unknown as BaseAudioContext, output: output as unknown as AudioNode });
  if (ready) controller.setState(READY);
  return { context, controller };
}
const expectDisconnected = (context: ContextMock) => {
  for (const node of context.voiceNodes) {
    expect(node.connections).toEqual([]);
    expect(node.disconnectCount).toBeGreaterThan(0);
  }
  for (const source of context.sources) expect(source.onended).toBeNull();
};

describe('injected scene accent controller', () => {
  it('starts blocked and allocates no playback nodes until all flags are explicitly open', () => {
    const { context, controller } = setup(false);
    expect(controller.trigger(request())).toBe(false);
    for (const state of [
      { active: false, muted: false, gateOpen: true },
      { active: true, muted: true, gateOpen: true },
      { active: true, muted: false, gateOpen: false },
    ]) {
      controller.setState(state);
      expect(controller.trigger(request())).toBe(false);
    }
    expect(context.voiceNodes).toHaveLength(0);
    controller.setState(READY);
    expect(controller.trigger(request())).toBe(true);
  });

  it('connects only source → private release gain → pan → supplied nature bus', () => {
    const { context, controller } = setup();
    context.currentTime = 10;
    expect(controller.trigger(request())).toBe(true);
    expect(context.sources[0].connections).toEqual([context.gains[0]]);
    expect(context.gains[0].connections).toEqual([context.pans[0]]);
    expect(context.pans[0].connections).toEqual([context.output]);
    expect(context.output.connections).toEqual([]);
    expect(context.output.disconnectCount).toBe(0);
    expect(context.destination.connections).toEqual([]);
    expect(context.sources[0].loop).toBe(false);
    expect(context.sources[0].startTimes).toEqual([10]);
    expect(context.sources[0].stopTimes).toEqual([10 + context.sources[0].buffer!.duration]);
    expect(context.gains[0].gain.events).toEqual([{ operation: 'set', value: 1, time: 10 }]);
    controller.pause();
    controller.dispose();
    expect(context.resume).not.toHaveBeenCalled();
    expect(context.suspend).not.toHaveBeenCalled();
    expect(context.close).not.toHaveBeenCalled();
    expect(context.output.disconnectCount).toBe(0);
    expect(context.destination.disconnectCount).toBe(0);
  });

  it.each(['suspended', 'closed'] as const)('ignores requests in %s contexts without attempting a lifecycle operation', state => {
    const context = new ContextMock();
    context.state = state;
    const { controller } = setup(true, context);
    expect(controller.trigger(request())).toBe(false);
    controller.release(); controller.pause(); controller.dispose();
    expect(context.voiceNodes).toHaveLength(0);
    expect(context.resume).not.toHaveBeenCalled();
    expect(context.suspend).not.toHaveBeenCalled();
    expect(context.close).not.toHaveBeenCalled();
  });

  it.each([NaN, Infinity, -Infinity, -1])('rejects invalid audio clock %s without allocating', time => {
    const { context, controller } = setup();
    context.currentTime = time;
    expect(controller.trigger(request())).toBe(false);
    expect(context.voiceNodes).toHaveLength(0);
  });

  it.each([
    null, undefined, {}, { kind: 'thunder', intensity: 1, pan: 0 },
    { kind: 'water-drop', intensity: NaN, pan: 0 },
    { kind: 'water-drop', intensity: Infinity, pan: 0 },
    { kind: 'water-drop', intensity: -Infinity, pan: 0 },
    { kind: 'water-drop', intensity: 1, pan: NaN },
    { kind: 'water-drop', intensity: 1, pan: Infinity },
    { kind: 'water-drop', intensity: 1, pan: -Infinity },
    { kind: 'water-drop', intensity: '1', pan: 0 },
    { kind: 'water-drop', intensity: 1, pan: '0' },
    { kind: 'water-drop', intensity: 0, pan: 0 },
    { kind: 'water-drop', intensity: -5, pan: 0 },
  ])('ignores malformed or silent requests: %j', invalid => {
    const { context, controller } = setup();
    expect(controller.trigger(invalid as AccentRequest)).toBe(false);
    expect(context.voiceNodes).toHaveLength(0);
    // Rejection does not reserve the global event slot.
    expect(controller.trigger(request())).toBe(true);
  });

  it.each([null, {}, { active: true }, { ...READY, active: 1 }, { ...READY, muted: 'false' }, { ...READY, gateOpen: undefined }])('fails closed on malformed state %j', invalid => {
    const { context, controller } = setup();
    controller.trigger(request());
    controller.setState(invalid as AccentPlaybackState);
    expect(controller.voiceCount).toBe(0);
    expect(controller.trigger(request())).toBe(false);
    expectDisconnected(context);
  });

  it('clamps positive intensity and pan while making quieter independent sample copies', () => {
    const full = setup();
    full.controller.trigger(request({ intensity: 99, pan: -999 }));
    const quiet = setup();
    quiet.controller.trigger(request({ intensity: 0.25, pan: 999 }));
    expect(full.context.pans[0].pan.events[0].value).toBe(-0.6);
    expect(quiet.context.pans[0].pan.events[0].value).toBe(0.6);
    const a = full.context.sources[0].buffer!.getChannelData(0);
    const b = quiet.context.sources[0].buffer!.getChannelData(0);
    for (let i = 0; i < a.length; i++) expect(b[i]).toBeCloseTo(a[i] * 0.25, 9);
    quiet.context.sources[0].end();
    quiet.context.currentTime = 5;
    quiet.controller.trigger(request({ intensity: 1 }));
    expect(quiet.context.sources[1].buffer!.getChannelData(0)).toEqual(a);
  });

  it('applies a global quiet interval across kinds and does not queue dropped events', () => {
    const { context, controller } = setup();
    expect(controller.trigger(request())).toBe(true);
    context.currentTime = 1.799;
    expect(controller.trigger(request({ kind: 'soft-rustle' }))).toBe(false);
    context.currentTime = 1.8;
    expect(context.sources).toHaveLength(1);
    expect(controller.trigger(request({ kind: 'soft-rustle' }))).toBe(true);
    context.currentTime = 100;
    expect(controller.voiceCount).toBe(0);
    expect(context.sources).toHaveLength(2);
  });

  it.each([
    ['water-drop', 4.5], ['soft-rustle', 6], ['ceramic-touch', 8], ['ember-tick', 7], ['soft-resonance', 14],
  ] as const)('retains %s cooldown through release, pause and state changes', (kind, cooldown) => {
    const { context, controller } = setup();
    expect(controller.trigger(request({ kind }))).toBe(true);
    controller.release(); controller.pause(); controller.setState(READY);
    context.currentTime = cooldown - 0.001;
    expect(controller.trigger(request({ kind }))).toBe(false);
    context.currentTime = cooldown;
    expect(controller.trigger(request({ kind }))).toBe(true);
  });

  it('bounds two overlapping voices including their release tails and reclaims after 60 ms', () => {
    const { context, controller } = setup();
    controller.trigger(request({ kind: 'soft-resonance' }));
    context.currentTime = 1.8;
    controller.trigger(request({ kind: 'soft-rustle' }));
    expect(controller.voiceCount).toBe(2);
    controller.release();
    expect(controller.voiceCount).toBe(2);
    context.currentTime = 1.859;
    for (let i = 0; i < 20; i++) expect(controller.trigger(request({ kind: 'ceramic-touch' }))).toBe(false);
    expect(context.sources).toHaveLength(2);
    expect(controller.voiceCount).toBe(2);
    context.currentTime = 1.861;
    expect(controller.voiceCount).toBe(0);
    expectDisconnected(context);
    context.currentTime = 3.6;
    expect(controller.trigger(request({ kind: 'ceramic-touch' }))).toBe(true);
  });

  it('pause schedules a short linear release once and requires an explicit active state', () => {
    const { context, controller } = setup();
    controller.trigger(request({ kind: 'soft-resonance' }));
    context.currentTime = 0.5;
    controller.pause(); controller.release(); controller.pause();
    expect(context.gains[0].gain.events).toEqual([
      { operation: 'set', value: 1, time: 0 },
      { operation: 'cancel', time: 0.5 },
      { operation: 'set', value: 1, time: 0.5 },
      { operation: 'ramp', value: 0, time: 0.56 },
    ]);
    expect(context.sources[0].stopTimes).toEqual([3.2, 0.56]);
    context.currentTime = 2;
    expect(controller.trigger(request())).toBe(false);
    controller.setState(READY);
    expect(controller.trigger(request())).toBe(true);
  });

  it('an inactive state snapshot softly releases live work and cannot be reopened by mutating the caller object', () => {
    const { context, controller } = setup();
    controller.trigger(request({ kind: 'soft-resonance' }));
    const inactive = { ...READY, active: false };
    controller.setState(inactive);
    inactive.active = true;
    expect(controller.voiceCount).toBe(1);
    expect(context.gains[0].gain.events.at(-1)).toEqual({ operation: 'ramp', value: 0, time: 0.06 });
    context.currentTime = 2;
    expect(controller.voiceCount).toBe(0);
    expect(controller.trigger(request())).toBe(false);
  });

  it('release never extends a voice beyond its natural end and keeps active state', () => {
    const { context, controller } = setup();
    controller.trigger(request({ kind: 'water-drop' }));
    context.currentTime = 0.84;
    controller.release();
    expect(context.gains[0].gain.events.at(-1)).toEqual({ operation: 'ramp', value: 0, time: 0.85 });
    expect(context.sources[0].stopTimes.at(-1)).toBe(0.85);
    context.currentTime = 2;
    expect(controller.trigger(request({ kind: 'ceramic-touch' }))).toBe(true);
  });

  it('normal end disconnects every voice node and nulls its callback', () => {
    const { context, controller } = setup();
    controller.trigger(request());
    context.sources[0].end();
    expect(controller.voiceCount).toBe(0);
    expectDisconnected(context);
    // A stale repeated browser notification has no callback to call.
    context.sources[0].end();
    expect(context.sources[0].disconnectCount).toBe(1);
  });

  it.each([{ ...READY, muted: true }, { ...READY, gateOpen: false }])('mute/gate closes live voices immediately without a deferred release: %j', blocked => {
    const { context, controller } = setup();
    controller.trigger(request({ kind: 'soft-resonance' }));
    controller.setState(blocked);
    expect(controller.voiceCount).toBe(0);
    expectDisconnected(context);
    expect(context.gains[0].gain.events.some(event => event.operation === 'ramp')).toBe(false);
    context.currentTime = 20;
    expect(controller.trigger(request())).toBe(false);
    expect(context.sources).toHaveLength(1);
  });

  it.each(['suspended', 'closed'] as const)('a %s statechange discards live work and does not replay on return to running', state => {
    const { context, controller } = setup();
    controller.trigger(request({ kind: 'soft-resonance' }));
    context.changeState(state);
    expect(controller.voiceCount).toBe(0);
    expectDisconnected(context);
    context.currentTime = 20;
    context.changeState('running');
    expect(controller.trigger(request())).toBe(false);
    expect(context.sources).toHaveLength(1);
    controller.setState(READY);
    expect(controller.trigger(request())).toBe(true);
  });

  it('disposal is final and idempotent, removes the listener and never disconnects the shared bus', () => {
    const { context, controller } = setup();
    expect(context.listeners.size).toBe(1);
    controller.trigger(request());
    controller.dispose(); controller.dispose(); controller.pause(); controller.release(); controller.setState(READY);
    expect(controller.trigger(request())).toBe(false);
    expect(controller.voiceCount).toBe(0);
    expect(context.listeners.size).toBe(0);
    expect(context.removeEventListener).toHaveBeenCalledTimes(1);
    expectDisconnected(context);
    expect(context.output.disconnectCount).toBe(0);
    expect(context.close).not.toHaveBeenCalled();
  });

  it.each(['different-context', 'destination'] as const)('rejects an unsafe %s output before allocating', variant => {
    const context = new ContextMock();
    const output = variant === 'destination' ? context.destination : new ContextMock().output;
    const { controller } = setup(true, context, output);
    expect(controller.trigger(request())).toBe(false);
    expect(context.voiceNodes).toHaveLength(0);
    expect(context.listeners.size).toBe(0);
    controller.dispose();
    expect(output.disconnectCount).toBe(0);
  });

  it('fails closed if it cannot observe context interruptions', () => {
    const context = new ContextMock(); context.fault = 'listen';
    const { controller } = setup(true, context);
    expect(controller.trigger(request())).toBe(false);
    expect(context.voiceNodes).toHaveLength(0);
    controller.dispose();
  });

  it.each(['buffer', 'source', 'gain', 'pan', 'parameter', 'connect', 'start', 'stop'] as const)('cleans partial voices after rejected %s and does not consume the event slot', fault => {
    const { context, controller } = setup();
    context.fault = fault;
    expect(() => expect(controller.trigger(request())).toBe(false)).not.toThrow();
    expect(controller.voiceCount).toBe(0);
    expectDisconnected(context);
    context.fault = undefined;
    expect(controller.trigger(request())).toBe(true);
    expect(controller.voiceCount).toBe(1);
  });

  it.each([1, 2, 3])('cleans all partial graph edges when connection %s is rejected', edge => {
    const { context, controller } = setup();
    context.rejectConnectAt = edge;
    expect(controller.trigger(request())).toBe(false);
    expect(context.connectAttempts).toBe(edge);
    expect(controller.voiceCount).toBe(0);
    expectDisconnected(context);
    expect(context.output.disconnectCount).toBe(0);
  });

  it('disconnects immediately when scheduling an active voice stop is rejected', () => {
    const { context, controller } = setup();
    controller.trigger(request());
    context.fault = 'stop';
    expect(() => controller.release()).not.toThrow();
    expect(controller.voiceCount).toBe(0);
    expectDisconnected(context);
  });

  it('falls back to immediate cleanup when a release automation operation is rejected', () => {
    const { context, controller } = setup();
    controller.trigger(request());
    context.fault = 'release';
    expect(() => controller.release()).not.toThrow();
    expect(controller.voiceCount).toBe(0);
    expectDisconnected(context);
  });
});
