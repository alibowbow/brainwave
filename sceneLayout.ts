import type { BackgroundSoundType } from './types';

// Default stereo anchors for sounds without a visible scene point. The active
// landscape projects its image anchors through the responsive crop and sends
// the resulting positions to the engine. Enveloping sources stay centered.

export type SceneDepth = 'near' | 'mid' | 'far';

export interface SpatialSpec {
  /** Horizontal anchor across the scene, 0 (left) .. 1 (right). 0.5 = center. */
  x: number;
  /** Perceived distance — drives level trim, reverb send and air-loss lowpass. */
  depth: SceneDepth;
  /** Enveloping sources (weather, noise beds) that shouldn't be point-panned. */
  wide?: boolean;
}

export const SPATIAL: Partial<Record<BackgroundSoundType, SpatialSpec>> = {
  // 날씨 — enveloping, centered
  rain: { x: 0.5, depth: 'mid', wide: true },
  tent: { x: 0.74, depth: 'near' },
  window: { x: 0.27, depth: 'near' },
  eaves: { x: 0.32, depth: 'near' },
  thunder: { x: 0.5, depth: 'far', wide: true },
  dthunder: { x: 0.5, depth: 'far', wide: true },
  blizzard: { x: 0.5, depth: 'mid', wide: true },

  // 물
  stream: { x: 0.38, depth: 'near' },
  waterfall: { x: 0.07, depth: 'mid' },
  wave: { x: 0.5, depth: 'mid', wide: true },
  pebbles: { x: 0.5, depth: 'near', wide: true },
  deepsea: { x: 0.47, depth: 'far' },

  // 동물
  birds: { x: 0.3, depth: 'mid' },
  cuckoo: { x: 0.14, depth: 'far' },
  woodpecker: { x: 0.86, depth: 'mid' },
  seabirds: { x: 0.66, depth: 'far' },
  owl: { x: 0.78, depth: 'mid' },
  scops: { x: 0.6, depth: 'far' },
  // A cicada chorus surrounds you — point-panning it to one side reads wrong.
  cicadas: { x: 0.9, depth: 'mid', wide: true },
  ducks: { x: 0.62, depth: 'near' },

  // 환경음
  forest: { x: 0.5, depth: 'mid', wide: true },
  bamboo: { x: 0.93, depth: 'near' },
  // Night insects chirp from everywhere, not from one bush.
  night: { x: 0.84, depth: 'near', wide: true },
  ruralCrickets: { x: 0.58, depth: 'near', wide: true },
  cave: { x: 0.5, depth: 'far', wide: true },

  // 오브젝트
  fire: { x: 0.5, depth: 'near' },
  temple: { x: 0.44, depth: 'far' },
  chimes: { x: 0.12, depth: 'near' },
  bowl: { x: 0.36, depth: 'near' },
  fan: { x: 0.7, depth: 'near' },

  // 추상음 — no place in the world, no spatialisation
  drone: { x: 0.5, depth: 'mid', wide: true },
  heartbeat: { x: 0.5, depth: 'near', wide: true },
  brown: { x: 0.5, depth: 'mid', wide: true },
  white: { x: 0.5, depth: 'mid', wide: true },
  pink: { x: 0.5, depth: 'mid', wide: true },
};

// Distance treatment per depth: dry trim, reverb send, and an "air" lowpass
// for far sources. Near = present and dry, far = softer and wetter.
export const DEPTH_MIX: Record<SceneDepth, { trim: number; send: number; lowpass: number | null }> = {
  near: { trim: 1, send: 0.05, lowpass: null },
  mid: { trim: 0.9, send: 0.14, lowpass: null },
  far: { trim: 0.78, send: 0.3, lowpass: 2800 },
};

export const spatialPan = (type: BackgroundSoundType): number => {
  const s = SPATIAL[type];
  if (!s || s.wide) return 0;
  return Math.max(-0.6, Math.min(0.6, (s.x - 0.5) * 1.3));
};
