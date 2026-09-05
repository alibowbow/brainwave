import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { NATURE_MIXES } from './types';
import { NATURE_SCENES, inferNatureScene, isNatureSceneId, projectScenePoint } from './sceneCatalog';

describe('landscape identity and responsive anchors', () => {
  it('gives every existing mix a shipped, distinct scene preview', () => {
    const images = new Set<string>();
    for (const mix of NATURE_MIXES) {
      expect(isNatureSceneId(mix.id)).toBe(true);
      if (!isNatureSceneId(mix.id)) continue;
      const scene = NATURE_SCENES[mix.id];
      expect(existsSync(`public/${scene.image}`)).toBe(true);
      expect(images.has(scene.image)).toBe(false);
      images.add(scene.image);
    }
  });
  it('recognizes rural audio without restoring the old pond mix', () => {
    expect(inferNatureScene(['ruralCrickets'])).toBe('rural_summer_night');
    expect(isNatureSceneId('__proto__')).toBe(false);
    expect(isNatureSceneId('removed_scene')).toBe(false);
  });
  it('projects a centered source consistently through desktop and portrait crops', () => {
    expect(projectScenePoint({ x: .5, y: .5 }, 1440, 800, 1536, 1024)).toEqual({ x: 720, y: 400 });
    expect(projectScenePoint({ x: .5, y: .5 }, 368, 584, 1536, 1024)).toEqual({ x: 184, y: 292 });
  });
  it('keeps edge controls reachable on a narrow folded screen', () => {
    for (const x of [0, .16, .5, .85, 1]) {
      const point = projectScenePoint({ x, y: .7 }, 300, 580, 1536, 1024);
      expect(point.x).toBeGreaterThanOrEqual(32);
      expect(point.x).toBeLessThanOrEqual(268);
    }
  });
});
