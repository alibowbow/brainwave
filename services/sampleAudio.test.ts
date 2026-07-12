import { describe, expect, it, vi } from 'vitest';
import {
  DecodedSampleCache,
  SampleAudioBudgetError,
  createCrossfadedLoopBuffer,
  crossfadeLoopChannel,
  equalPowerPair,
} from './sampleAudio';

class TestBuffer {
  readonly duration: number;
  private readonly data: Float32Array[];

  constructor(
    readonly numberOfChannels: number,
    readonly length: number,
    readonly sampleRate: number,
  ) {
    this.duration = length / sampleRate;
    this.data = Array.from({ length: numberOfChannels }, () => new Float32Array(length));
  }

  getChannelData(channel: number) { return this.data[channel]; }
  copyToChannel(source: Float32Array, channel: number) { this.data[channel].set(source); }
}

class TestContext {
  decodeCalls = 0;
  constructor(private readonly decoded: TestBuffer) {}
  async decodeAudioData() { this.decodeCalls += 1; return this.decoded as unknown as AudioBuffer; }
  createBuffer(channels: number, length: number, rate: number) {
    return new TestBuffer(channels, length, rate) as unknown as AudioBuffer;
  }
}

const response = () => new Response(new Uint8Array([1, 2, 3, 4]));

describe('runtime loop seam transform', () => {
  it('uses equal-power gains without a boundary level dip', () => {
    for (let index = 0; index <= 100; index++) {
      const [tail, head] = equalPowerPair(index / 100);
      expect(tail * tail + head * head).toBeCloseTo(1, 6);
    }
  });

  it('rotates the seam onto adjacent original samples', () => {
    const input = Float32Array.from({ length: 200 }, (_, index) =>
      Math.sin(index * 0.17) * 0.5 + (index < 20 ? 0.15 : -0.12),
    );
    const frames = 20;
    const output = crossfadeLoopChannel(input, frames);
    const originalBoundaryDelta = input[input.length - frames] - input[input.length - frames - 1];
    const loopBoundaryDelta = output[0] - output[output.length - 1];
    expect(loopBoundaryDelta).toBeCloseTo(originalBoundaryDelta, 6);
    expect(output.length).toBe(input.length - frames);
  });

  it('leaves event buffers unchanged', () => {
    const input = new TestBuffer(1, 128, 48_000) as unknown as AudioBuffer;
    const context = { createBuffer: vi.fn() } as unknown as BaseAudioContext;
    expect(createCrossfadedLoopBuffer(context, input, 0)).toBe(input);
    expect(context.createBuffer).not.toHaveBeenCalled();
  });

  it('leaves buffers too short for a safe seam transform unchanged', () => {
    const input = new TestBuffer(1, 7, 48_000) as unknown as AudioBuffer;
    const context = { createBuffer: vi.fn() } as unknown as BaseAudioContext;
    expect(createCrossfadedLoopBuffer(context, input, 1)).toBe(input);
    expect(context.createBuffer).not.toHaveBeenCalled();
  });
});

describe('decoded sample cache', () => {
  it('loads lazily and deduplicates concurrent fetch/decode work', async () => {
    const fetcher = vi.fn(async () => response());
    const context = new TestContext(new TestBuffer(1, 1_000, 1_000));
    const cache = new DecodedSampleCache(48 * 1024 * 1024, 4, fetcher as typeof fetch);
    expect(fetcher).not.toHaveBeenCalled();

    const [first, second] = await Promise.all([
      cache.acquire(context as unknown as AudioContext, '/rain.mp3', 0.1, 4_000),
      cache.acquire(context as unknown as AudioContext, '/rain.mp3', 0.1, 4_000),
    ]);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(context.decodeCalls).toBe(1);
    expect(first.buffer).toBe(second.buffer);
    expect(cache.stats().activeRefs).toBe(2);
    first.release();
    second.release();
    expect(cache.stats().activeRefs).toBe(0);
  });

  it('evicts only inactive entries and rejects when active buffers exhaust the budget', async () => {
    const fetcher = vi.fn(async () => response());
    const context = new TestContext(new TestBuffer(1, 100, 100)); // 400 decoded bytes
    const cache = new DecodedSampleCache(800, 2, fetcher as typeof fetch);
    const first = await cache.acquire(context as unknown as AudioContext, '/a.mp3', 0, 400);
    const second = await cache.acquire(context as unknown as AudioContext, '/b.mp3', 0, 400);
    await expect(cache.acquire(context as unknown as AudioContext, '/c.mp3', 0, 400))
      .rejects.toBeInstanceOf(SampleAudioBudgetError);

    first.release();
    const third = await cache.acquire(context as unknown as AudioContext, '/c.mp3', 0, 400);
    expect(cache.stats().entries).toBe(2);
    second.release();
    third.release();
  });

  it('rejects a decode whose actual PCM size exceeds its reservation and hard budget', async () => {
    const context = new TestContext(new TestBuffer(2, 100, 100)); // 800 decoded bytes
    const cache = new DecodedSampleCache(500, 2, vi.fn(async () => response()) as typeof fetch);
    await expect(cache.acquire(context as unknown as AudioContext, '/large.mp3', 0, 100))
      .rejects.toBeInstanceOf(SampleAudioBudgetError);
    expect(cache.stats().entries).toBe(0);
  });

  it('removes failed loads so a procedural fallback can retry later', async () => {
    const fetcher = vi.fn(async () => new Response(null, { status: 503 }));
    const context = new TestContext(new TestBuffer(1, 100, 100));
    const cache = new DecodedSampleCache(1_000, 2, fetcher as typeof fetch);
    await expect(cache.acquire(context as unknown as AudioContext, '/offline.mp3', 0, 400)).rejects.toThrow();
    expect(cache.stats()).toEqual({ entries: 0, bytes: 0, activeRefs: 0, pending: 0 });
  });
});
