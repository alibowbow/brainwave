import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  ENVIRONMENT_ATLAS_COLUMNS,
  ENVIRONMENT_ATLAS_ROWS,
  ENVIRONMENT_OBJECT_IDS,
  ENVIRONMENT_OBJECTS,
} from './environmentObjects';

const expectedIds = [
  'cloud', 'storm', 'rain', 'snow', 'noise',
  'water', 'wave', 'stream-flow', 'waterfall', 'waterfall-mist',
  'fire', 'firefly', 'leaf', 'bubble', 'bamboo',
  'temple', 'tent', 'rain-window', 'eaves', 'pebbles',
  'chimes', 'singing-bowl', 'fan', 'drone', 'heartbeat',
];

describe('generated environment atlas manifest', () => {
  it('covers all 25 previously procedural objects', () => {
    expect([...ENVIRONMENT_OBJECT_IDS].sort()).toEqual([...expectedIds].sort());
    expect(ENVIRONMENT_ATLAS_COLUMNS * ENVIRONMENT_ATLAS_ROWS).toBe(25);
  });

  it('packs five unique object rows into each shared atlas', () => {
    const rowsByAtlas = new Map<string, number[]>();
    Object.values(ENVIRONMENT_OBJECTS).forEach((spec) => {
      const rows = rowsByAtlas.get(spec.atlasPath) ?? [];
      rows.push(spec.row);
      rowsByAtlas.set(spec.atlasPath, rows);
      expect(spec.frames).toEqual([0, 1, 2, 3, 4, 0]);
      expect(spec.frameDurations).toHaveLength(spec.frames.length);
      expect(spec.frameDurations.every((duration) => duration >= 100)).toBe(true);
    });

    expect(rowsByAtlas.size).toBe(5);
    rowsByAtlas.forEach((rows) => expect(rows.sort()).toEqual([0, 1, 2, 3, 4]));
  });

  it('ships every atlas as a compact WebP asset', () => {
    const atlasPaths = new Set(Object.values(ENVIRONMENT_OBJECTS).map((spec) => spec.atlasPath));
    atlasPaths.forEach((atlasPath) => {
      const path = resolve('public', atlasPath);
      expect(existsSync(path), atlasPath).toBe(true);
      expect(statSync(path).size, atlasPath).toBeLessThan(300_000);
      const header = readFileSync(path).subarray(0, 12);
      expect(header.subarray(0, 4).toString()).toBe('RIFF');
      expect(header.subarray(8, 12).toString()).toBe('WEBP');
    });
  });

  it('ships the original-detail campfire loop and matching poster', () => {
    const videoPath = resolve('public/video/nature/campfire-loop-v2.mp4');
    const posterPath = resolve('public/images/nature/backgrounds/campfire-loop-poster-v2.webp');

    expect(existsSync(videoPath)).toBe(true);
    expect(statSync(videoPath).size).toBeGreaterThan(4_000_000);
    expect(statSync(videoPath).size).toBeLessThan(5_000_000);
    expect(readFileSync(videoPath).subarray(4, 8).toString()).toBe('ftyp');

    expect(existsSync(posterPath)).toBe(true);
    expect(statSync(posterPath).size).toBeLessThan(150_000);
    const posterHeader = readFileSync(posterPath).subarray(0, 12);
    expect(posterHeader.subarray(0, 4).toString()).toBe('RIFF');
    expect(posterHeader.subarray(8, 12).toString()).toBe('WEBP');
  });

  it('keeps the previous campfire URL during the PWA cache transition', () => {
    expect(existsSync(resolve('public/video/nature/campfire-loop-v1.mp4'))).toBe(true);
    expect(existsSync(resolve('public/images/nature/backgrounds/campfire-loop-poster-v1.webp'))).toBe(true);
  });
});
