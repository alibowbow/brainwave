import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CC0_1_0_URL,
  NATURE_SAMPLE_ASSETS,
  NATURE_SAMPLE_BINDINGS,
  natureSampleUrls,
  normalizeBasePath,
  sampleLayerGain,
  type NatureSampleId,
} from './audioSamples';

describe('nature sample manifest', () => {
  it('has complete CC0 provenance and valid local variants', () => {
    let totalBytes = 0;
    for (const [assetId, asset] of Object.entries(NATURE_SAMPLE_ASSETS)) {
      expect(asset.sourceTitle, assetId).not.toBe('');
      expect(asset.author, assetId).not.toBe('');
      expect(asset.sourceUrl, assetId).toBe(`https://freesound.org/s/${asset.freesoundId}/`);
      expect(asset.license).toBe('CC0-1.0');
      expect(asset.licenseUrl).toBe(CC0_1_0_URL);
      expect(asset.distributedSourceUrl).toMatch(/^https:\/\//);
      expect(asset.distributedSourceSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(asset.processingCommand).not.toBe('');
      expect(asset.retrievedAt).toBe('2026-07-12');
      expect(asset.sources.length).toBeGreaterThan(0);
      for (const source of asset.sources) {
        const path = resolve('public/audio/nature', source.fileName);
        const bytes = readFileSync(path);
        totalBytes += statSync(path).size;
        expect(createHash('sha256').update(bytes).digest('hex'), source.fileName).toBe(source.sha256);
      }
      if (asset.playback === 'event') expect(asset.crossfadeSeconds).toBe(0);
      else expect(asset.crossfadeSeconds).toBeGreaterThan(0);
    }
    expect(totalBytes).toBeLessThanOrEqual(10 * 1024 * 1024);
  });

  it('maps only existing assets and applies sample calibration once', () => {
    for (const [type, binding] of Object.entries(NATURE_SAMPLE_BINDINGS)) {
      for (const assetId of binding!.assetIds) {
        expect(NATURE_SAMPLE_ASSETS[assetId]).toBeDefined();
        expect(sampleLayerGain(type as keyof typeof NATURE_SAMPLE_BINDINGS, assetId, 0.5)).toBe(
          0.5 * binding!.sampleScale * NATURE_SAMPLE_ASSETS[assetId].sampleTrim,
        );
      }
    }
  });

  it('keeps every encoded source below -3 dBTP at the maximum 1.2 layer level', () => {
    for (const [assetId, asset] of Object.entries(NATURE_SAMPLE_ASSETS)) {
      const scales = Object.values(NATURE_SAMPLE_BINDINGS)
        .filter((binding) => binding?.assetIds.includes(assetId as NatureSampleId))
        .map((binding) => binding!.sampleScale);
      const maximumScale = Math.max(...scales, 0);
      const effectivePeak = asset.truePeakDbtp + 20 * Math.log10(asset.sampleTrim * maximumScale * 1.2);
      expect(effectivePeak, `${assetId}: ${effectivePeak.toFixed(2)} dBTP`).toBeLessThanOrEqual(-3);
    }
  });

  it('keeps quiet field recordings as texture without collapsing the procedural body', () => {
    const textureFloors = {
      fire: { assetId: 'fireplaceHearth', minimumProceduralMix: 0.6, expectedLufs: -38.2 },
      forest: { assetId: 'forestField', minimumProceduralMix: 0.65, expectedLufs: -38.9 },
      bamboo: { assetId: 'mountainWind', minimumProceduralMix: 0.5, expectedLufs: -30.8 },
      birds: { assetId: 'forestBirdsAlishan', minimumProceduralMix: 0.6, expectedLufs: -30.7 },
    } as const;

    for (const [type, expectation] of Object.entries(textureFloors)) {
      const binding = NATURE_SAMPLE_BINDINGS[type as keyof typeof textureFloors]!;
      const asset = NATURE_SAMPLE_ASSETS[expectation.assetId];
      const effectiveLufs = asset.integratedLufs
        + 20 * Math.log10(asset.sampleTrim * binding.sampleScale);
      expect(binding.proceduralMix, type).toBeGreaterThanOrEqual(expectation.minimumProceduralMix);
      expect(effectiveLufs, type).toBeCloseTo(expectation.expectedLufs, 1);
    }
  });
});

describe('nature sample URLs', () => {
  it.each([
    ['/', '/'],
    ['/brainwave/', '/brainwave/'],
    ['brainwave', '/brainwave/'],
    ['//brainwave///audio//', '/brainwave/audio/'],
  ])('normalizes %s', (input, expected) => {
    expect(normalizeBasePath(input)).toBe(expected);
  });

  it('prefers Vorbis when supported and keeps MP3 as a decode fallback', () => {
    const urls = natureSampleUrls('rainRural', '/brainwave/', () => true);
    expect(urls.map((source) => source.codec)).toEqual(['Vorbis', 'MP3']);
    expect(urls[0].url).toBe('/brainwave/audio/nature/rain-rural-cc0-v1.ogg');
  });

  it('selects universal MP3 on a browser without Vorbis support', () => {
    const urls = natureSampleUrls('rainRural', '/', (mime) => mime === 'audio/mpeg');
    expect(urls.map((source) => source.codec)).toEqual(['MP3']);
    expect(urls[0].url).toBe('/audio/nature/rain-rural-cc0-v1.mp3');
  });
});
