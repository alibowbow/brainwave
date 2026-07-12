export const DEFAULT_DECODED_AUDIO_BUDGET = 48 * 1024 * 1024;
export const DEFAULT_DECODED_AUDIO_ENTRIES = 4;

export class SampleAudioBudgetError extends Error {
  constructor() {
    super('Decoded nature-audio cache budget exhausted');
    this.name = 'SampleAudioBudgetError';
  }
}

export const equalPowerPair = (phase: number): [number, number] => {
  const safePhase = Math.max(0, Math.min(1, Number.isFinite(phase) ? phase : 0));
  const angle = safePhase * Math.PI * 0.5;
  return [Math.cos(angle), Math.sin(angle)];
};

/**
 * Rotates a loop seam into the beginning of the buffer and blends tail -> head.
 * The final sample then wraps to the first sample at two adjacent points from
 * the original recording, while the equal-power blend avoids a level notch.
 */
export const crossfadeLoopChannel = (input: Float32Array, requestedFrames: number) => {
  if (input.length < 8) return input.slice();
  const frames = Math.max(2, Math.min(Math.floor(requestedFrames), Math.floor(input.length / 4)));
  const output = new Float32Array(input.length - frames);
  const tailStart = input.length - frames;
  for (let index = 0; index < frames; index++) {
    const [tailGain, headGain] = equalPowerPair(index / (frames - 1));
    output[index] = input[tailStart + index] * tailGain + input[index] * headGain;
  }
  output.set(input.subarray(frames, tailStart), frames);
  return output;
};

export const createCrossfadedLoopBuffer = (
  context: BaseAudioContext,
  input: AudioBuffer,
  crossfadeSeconds: number,
) => {
  // Event one-shots (thunder) must remain sample-for-sample unchanged.
  if (!(crossfadeSeconds > 0) || input.length < 8) return input;
  const frames = Math.max(2, Math.min(
    Math.floor(input.sampleRate * crossfadeSeconds),
    Math.floor(input.length / 4),
  ));
  const output = context.createBuffer(input.numberOfChannels, input.length - frames, input.sampleRate);
  for (let channel = 0; channel < input.numberOfChannels; channel++) {
    output.copyToChannel(crossfadeLoopChannel(input.getChannelData(channel), frames), channel);
  }
  return output;
};

export interface SampleLease {
  buffer: AudioBuffer;
  release: () => void;
}

export interface SampleBufferCache {
  acquire(
    context: AudioContext,
    url: string,
    crossfadeSeconds: number,
    decodedBytesEstimate: number,
  ): Promise<SampleLease>;
  clear(): void;
}

interface CacheEntry {
  promise: Promise<AudioBuffer>;
  controller: AbortController;
  buffer: AudioBuffer | null;
  bytes: number;
  refs: number;
  pending: number;
  lastUsed: number;
}

const decodedBytes = (buffer: AudioBuffer) => buffer.length * buffer.numberOfChannels * 4;

export class DecodedSampleCache implements SampleBufferCache {
  private entries = new Map<string, CacheEntry>();
  private clock = 0;

  constructor(
    private readonly maxBytes = DEFAULT_DECODED_AUDIO_BUDGET,
    private readonly maxEntries = DEFAULT_DECODED_AUDIO_ENTRIES,
    private readonly fetcher: typeof fetch = fetch,
  ) {}

  private reservedBytes() {
    let total = 0;
    this.entries.forEach((entry) => { total += entry.bytes; });
    return total;
  }

  private evictOneInactive() {
    const candidate = [...this.entries.entries()]
      .filter(([, entry]) => entry.refs === 0 && entry.pending === 0)
      .sort((a, b) => a[1].lastUsed - b[1].lastUsed)[0];
    if (!candidate) return false;
    candidate[1].controller.abort();
    this.entries.delete(candidate[0]);
    return true;
  }

  private makeRoom(bytes: number) {
    while (this.entries.size >= this.maxEntries || this.reservedBytes() + bytes > this.maxBytes) {
      if (!this.evictOneInactive()) throw new SampleAudioBudgetError();
    }
  }

  private reconcileActualBytes(entry: CacheEntry, actualBytes: number) {
    entry.bytes = actualBytes;
    while (this.reservedBytes() > this.maxBytes || this.entries.size > this.maxEntries) {
      if (!this.evictOneInactive()) throw new SampleAudioBudgetError();
    }
  }

  async acquire(
    context: AudioContext,
    url: string,
    crossfadeSeconds: number,
    decodedBytesEstimate: number,
  ): Promise<SampleLease> {
    const transformKey = crossfadeSeconds > 0 ? `loop:${crossfadeSeconds}` : 'event';
    const key = `${url}#transform=${transformKey}`;
    let entry = this.entries.get(key);
    if (!entry) {
      this.makeRoom(decodedBytesEstimate);
      const controller = new AbortController();
      entry = {
        controller,
        buffer: null,
        bytes: decodedBytesEstimate,
        refs: 0,
        pending: 0,
        lastUsed: ++this.clock,
        promise: Promise.resolve(null as unknown as AudioBuffer),
      };
      entry.promise = this.fetcher(url, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error(`Nature audio request failed (${response.status})`);
          return response.arrayBuffer();
        })
        .then((encoded) => context.decodeAudioData(encoded.slice(0)))
        .then((decoded) => createCrossfadedLoopBuffer(context, decoded, crossfadeSeconds))
        .then((buffer) => {
          entry!.buffer = buffer;
          this.reconcileActualBytes(entry!, decodedBytes(buffer));
          entry!.lastUsed = ++this.clock;
          return buffer;
        })
        .catch((error) => {
          this.entries.delete(key);
          throw error;
        });
      this.entries.set(key, entry);
    }

    entry.pending += 1;
    entry.lastUsed = ++this.clock;
    try {
      const buffer = await entry.promise;
      entry.pending -= 1;
      entry.refs += 1;
      entry.lastUsed = ++this.clock;
      let released = false;
      return {
        buffer,
        release: () => {
          if (released) return;
          released = true;
          entry!.refs = Math.max(0, entry!.refs - 1);
          entry!.lastUsed = ++this.clock;
        },
      };
    } catch (error) {
      entry.pending = Math.max(0, entry.pending - 1);
      throw error;
    }
  }

  clear() {
    this.entries.forEach((entry) => entry.controller.abort());
    this.entries.clear();
  }

  /** Test/diagnostic snapshot without exposing decoded buffers. */
  stats() {
    return {
      entries: this.entries.size,
      bytes: this.reservedBytes(),
      activeRefs: [...this.entries.values()].reduce((sum, entry) => sum + entry.refs, 0),
      pending: [...this.entries.values()].reduce((sum, entry) => sum + entry.pending, 0),
    };
  }
}
