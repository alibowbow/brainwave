import { BackgroundSoundType, NATURE_MIXES } from '../../types';
import { SOUND_GROUPS } from '../../audioOptions';
import { SoundLayer } from '../../services/audioEngine';

const DEFAULT_RECS: BackgroundSoundType[] = ['rain', 'fire', 'forest', 'wave', 'birds', 'night', 'stream', 'brown'];

// Suggest sounds that fit the current scene: layers that co-occur with the
// active ones in the curated mixes score highest, with a lighter nudge for
// same-category companions. Falls back to broad favorites on an empty scene.
export function getRecommendations(active: SoundLayer[], limit = 6): BackgroundSoundType[] {
  const activeSet = new Set(active.map((l) => l.type));
  const score = new Map<BackgroundSoundType, number>();

  for (const mix of NATURE_MIXES) {
    const overlap = mix.layers.filter((l) => activeSet.has(l.type)).length;
    if (!overlap) continue;
    for (const l of mix.layers) {
      if (activeSet.has(l.type)) continue;
      score.set(l.type, (score.get(l.type) ?? 0) + overlap);
    }
  }

  for (const group of SOUND_GROUPS) {
    const inGroup = group.sounds.filter((s) => activeSet.has(s)).length;
    if (!inGroup) continue;
    for (const s of group.sounds) {
      if (activeSet.has(s)) continue;
      score.set(s, (score.get(s) ?? 0) + inGroup * 0.5);
    }
  }

  if (score.size === 0) {
    return DEFAULT_RECS.filter((t) => !activeSet.has(t)).slice(0, limit);
  }
  return [...score.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([t]) => t);
}
