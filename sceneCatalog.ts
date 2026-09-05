import type { BackgroundSoundType } from './types';

export interface ScenePoint { x: number; y: number }
export interface SceneSpec {
  name: string;
  image: string;
  /** Intrinsic-image coordinates; projected through the same cover crop as the image. */
  points: Partial<Record<BackgroundSoundType, ScenePoint>>;
  mood: 'day' | 'night' | 'rain' | 'water' | 'snow' | 'warm';
  positionX?: number;
  video?: string;
}
const art = (name: string) => `images/nature/backgrounds/${name}`;
export const NATURE_SCENES = {
  rural_summer_night: { name: '시골 여름밤', image: art('rural-anime-soft-v7.webp'), mood: 'night', points: { ruralCrickets: { x: .38, y: .69 } } },
  tent_rain: { name: '텐트 속 빗소리', image: art('tent-v5.webp'), mood: 'rain', points: { tent: { x: .75, y: .6 }, dthunder: { x: .48, y: .28 } } },
  window_rain: { name: '비 오는 창가', image: art('window-v5.webp'), mood: 'rain', points: { window: { x: .5, y: .53 }, eaves: { x: .33, y: .26 } } },
  monsoon_eaves: { name: '장마철 처마', image: art('eaves-v5.webp'), mood: 'rain', points: { eaves: { x: .42, y: .21 }, rain: { x: .6, y: .63 } } },
  deep_sea: { name: '깊은 바다', image: art('deepsea-v5.webp'), mood: 'water', points: { deepsea: { x: .55, y: .6 } } },
  pebble_shore: { name: '몽돌 해변', image: art('coast-v5.webp'), mood: 'water', points: { pebbles: { x: .42, y: .8 }, wave: { x: .58, y: .62 }, seabirds: { x: .24, y: .2 } } },
  bamboo_grove: { name: '대나무숲', image: art('bamboo-v5.webp'), mood: 'day', points: { bamboo: { x: .7, y: .5 }, birds: { x: .4, y: .25 }, stream: { x: .42, y: .8 } } },
  temple_dawn: { name: '산사의 아침', image: art('temple-v5.webp'), mood: 'day', points: { temple: { x: .29, y: .62 }, forest: { x: .73, y: .62 }, birds: { x: .32, y: .25 } } },
  summer_valley: { name: '여름 계곡', image: art('summer-valley.webp'), mood: 'day', points: { stream: { x: .45, y: .82 }, waterfall: { x: .57, y: .59 }, cicadas: { x: .78, y: .36 } } },
  scops_night: { name: '소쩍새 밤', image: art('scops-night.webp'), mood: 'night', points: { scops: { x: .72, y: .46 }, night: { x: .32, y: .76 }, stream: { x: .58, y: .83 } } },
  campfire: { name: '모닥불 캠핑', image: art('campfire-loop-poster-v2.webp'), video: 'video/nature/campfire-loop-v2.mp4', mood: 'warm', points: { fire: { x: .48, y: .75 }, night: { x: .32, y: .53 }, owl: { x: .75, y: .3 } } },
  womb: { name: '포근한 심장', image: 'images/presets/meditation.webp', mood: 'warm', points: { heartbeat: { x: .5, y: .58 }, brown: { x: .7, y: .75 } } },
  winter_lodge: { positionX: .12, name: '겨울 산장', image: art('winter-v5.webp'), mood: 'snow', points: { blizzard: { x: .57, y: .46 }, fire: { x: .16, y: .65 } } },
  cave: { name: '고요한 동굴', image: art('cave-v5.webp'), mood: 'water', points: { cave: { x: .5, y: .55 } } },
} satisfies Record<string, SceneSpec>;
export type NatureSceneId = keyof typeof NATURE_SCENES;
export const isNatureSceneId = (value: unknown): value is NatureSceneId => typeof value === 'string' && Object.hasOwn(NATURE_SCENES, value);
export function inferNatureScene(types: BackgroundSoundType[]): NatureSceneId {
  if (types.includes('heartbeat')) return 'womb';
  if (types.includes('deepsea')) return 'deep_sea';
  if (types.includes('cave')) return 'cave';
  if (types.includes('blizzard')) return 'winter_lodge';
  if (types.includes('tent')) return 'tent_rain';
  if (types.includes('window')) return 'window_rain';
  if (types.includes('eaves') || types.includes('rain')) return 'monsoon_eaves';
  if (types.includes('wave') || types.includes('pebbles')) return 'pebble_shore';
  if (types.includes('fire')) return 'campfire';
  if (types.includes('ruralCrickets')) return 'rural_summer_night';
  if (types.includes('night') || types.includes('owl') || types.includes('scops')) return 'scops_night';
  if (types.includes('bamboo')) return 'bamboo_grove';
  if (types.includes('temple')) return 'temple_dawn';
  return 'summer_valley';
}

/** Match object-fit:cover exactly, then keep touch controls reachable after cropping. */
export function projectScenePoint(point: ScenePoint, width: number, height: number, imageWidth: number, imageHeight: number, positionX = .5): ScenePoint {
  const scale = Math.max(width / imageWidth, height / imageHeight);
  const x = point.x * imageWidth * scale - (imageWidth * scale - width) * positionX;
  const y = point.y * imageHeight * scale - (imageHeight * scale - height) / 2;
  return { x: Math.max(32, Math.min(width - 32, x)), y: Math.max(100, Math.min(height - 70, y)) };
}
