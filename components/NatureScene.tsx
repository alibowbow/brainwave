import React from 'react';
import { BackgroundSoundType } from '../types';
import { SCENE_META, CHARACTER_SVG } from './sceneCharacters';

interface Props {
  types: BackgroundSoundType[];
  tall?: boolean;
}

type SceneTheme = 'valley' | 'night-pond' | 'coast' | 'deep-sea' | 'cave' | 'winter' | 'warm';

interface GeneratedCharacter {
  path: string;
  className: string;
  alt: string;
}

const assetUrl = (path: string) => new URL(path, document.baseURI).toString();

const BACKGROUND_PATH: Partial<Record<SceneTheme, string>> = {
  valley: 'images/nature/backgrounds/summer-valley.webp',
  'night-pond': 'images/nature/backgrounds/scops-night.webp',
};

const GENERATED_CHARACTERS: Partial<Record<BackgroundSoundType, GeneratedCharacter>> = {
  birds: {
    path: 'images/nature/fauna/songbird-cutout.webp',
    className: 'sc-v2-bird',
    alt: '나뭇가지에 앉은 작은 새',
  },
  owl: {
    path: 'images/nature/fauna/scops-owl-cutout.webp',
    className: 'sc-v2-owl',
    alt: '나뭇가지에 앉은 부엉이',
  },
  scops: {
    path: 'images/nature/fauna/scops-owl-cutout.webp',
    className: 'sc-v2-scops',
    alt: '밤의 소쩍새',
  },
  frogs: {
    path: 'images/nature/fauna/pond-frog-cutout.webp',
    className: 'sc-v2-frog',
    alt: '이끼 낀 돌 위의 개구리',
  },
};

const GENERATED_TYPES = new Set<BackgroundSoundType>(Object.keys(GENERATED_CHARACTERS) as BackgroundSoundType[]);
const HIDDEN_LEGACY_TYPES = new Set<BackgroundSoundType>([
  'cicadas', 'night', 'cave', 'deepsea', 'stream', 'waterfall', 'wave', 'forest',
]);

const FIREFLIES = [
  { left: '17%', top: '49%', delay: '0s', size: 3 },
  { left: '31%', top: '60%', delay: '-1.6s', size: 2 },
  { left: '56%', top: '48%', delay: '-3.1s', size: 3 },
  { left: '74%', top: '56%', delay: '-0.8s', size: 2 },
  { left: '87%', top: '42%', delay: '-2.4s', size: 2 },
  { left: '42%', top: '38%', delay: '-4.2s', size: 2 },
];

const resolveTheme = (types: BackgroundSoundType[]): SceneTheme => {
  if (types.includes('heartbeat')) return 'warm';
  if (types.includes('deepsea')) return 'deep-sea';
  if (types.includes('cave')) return 'cave';
  if (types.includes('blizzard')) return 'winter';
  if (types.includes('wave') || types.includes('pebbles') || types.includes('seabirds')) return 'coast';
  if (types.includes('night') || types.includes('owl') || types.includes('scops')) return 'night-pond';
  return 'valley';
};

const hasAny = (types: BackgroundSoundType[], values: BackgroundSoundType[]) =>
  values.some((type) => types.includes(type));

const legacyCharacters = (types: BackgroundSoundType[]) =>
  types.filter((type) => (
    !GENERATED_TYPES.has(type) &&
    !HIDDEN_LEGACY_TYPES.has(type) &&
    SCENE_META[type] &&
    CHARACTER_SVG[type]
  ));

/**
 * Layered nature diorama. Generated plates carry the expensive visual detail;
 * CSS supplies only low-cost motion (water shimmer, mist, fireflies and gentle
 * parallax), while the old SVG characters remain as a safe fallback for sounds
 * that have not received a generated cutout yet.
 */
export const NatureScene: React.FC<Props> = ({ types, tall }) => {
  const theme = resolveTheme(types);
  const backgroundPath = BACKGROUND_PATH[theme];
  const rainy = hasAny(types, ['rain', 'thunder', 'tent', 'window', 'eaves']);
  const stormy = hasAny(types, ['thunder', 'dthunder']);
  const snowy = types.includes('blizzard');
  const hasWater = hasAny(types, ['stream', 'waterfall', 'wave', 'pebbles', 'deepsea']);
  const hasWaterfall = types.includes('waterfall');
  const hasFire = types.includes('fire');
  const hasHeartbeat = types.includes('heartbeat');
  const generated = types.filter((type) => GENERATED_CHARACTERS[type]);
  const legacy = legacyCharacters(types);
  const empty = types.length === 0;

  return (
    <div
      className={`sc-scene-v2 relative w-full ${tall ? 'h-[240px] rounded-3xl' : 'h-[160px] rounded-2xl'} overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-sm`}
      data-theme={theme}
      data-sounds={types.join(',')}
    >
      <div
        className="sc-v2-plate absolute inset-0"
        style={backgroundPath ? { backgroundImage: `url("${assetUrl(backgroundPath)}")` } : undefined}
        aria-hidden="true"
      />
      <div className="sc-v2-plate-tint absolute inset-0" aria-hidden="true" />

      {theme === 'deep-sea' && <div className="sc-v2-caustics absolute inset-0" aria-hidden="true" />}
      {theme === 'cave' && <div className="sc-v2-cave-depth absolute inset-0" aria-hidden="true" />}
      {theme === 'warm' && <div className="sc-v2-warm-field absolute inset-0" aria-hidden="true" />}

      {hasWater && (
        <div className="sc-v2-water absolute inset-x-0 bottom-0 h-[38%]" aria-hidden="true">
          <div className="sc-v2-water-glint absolute inset-0" />
        </div>
      )}
      {hasWaterfall && <div className="sc-v2-waterfall-mist absolute left-[43%] top-[46%] h-8 w-24" aria-hidden="true" />}
      {hasFire && <div className="sc-v2-fire-glow absolute bottom-[8%] left-1/2 h-24 w-40 -translate-x-1/2" aria-hidden="true" />}
      {hasHeartbeat && (
        <div className="sc-v2-heartbeat absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
      )}

      {theme === 'night-pond' && FIREFLIES.map((firefly, index) => (
        <span
          key={index}
          className="sc-v2-firefly absolute rounded-full"
          style={{ left: firefly.left, top: firefly.top, width: firefly.size, height: firefly.size, animationDelay: firefly.delay }}
          aria-hidden="true"
        />
      ))}

      {generated.map((type, index) => {
        const character = GENERATED_CHARACTERS[type]!;
        return (
          <div key={`${type}-${index}`} className={`sc-v2-character absolute ${character.className}`}>
            <img
              src={assetUrl(character.path)}
              alt={character.alt}
              draggable="false"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        );
      })}

      {legacy.map((type, index) => {
        const meta = SCENE_META[type]!;
        const left = `${16 + ((index * 29) % 70)}%`;
        const top = meta.band === 'sky' ? '28%' : meta.band === 'tree' ? '49%' : meta.band === 'ground' ? '72%' : '82%';
        return (
          <div key={type} className={`sc-v2-legacy absolute ${meta.motion}`} style={{ left, top, animationDelay: `${index * 0.4}s` }}>
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true" dangerouslySetInnerHTML={{ __html: CHARACTER_SVG[type]! }} />
          </div>
        );
      })}

      {rainy && <div className="sc-v2-rain sc-v2-rain-near absolute inset-0" aria-hidden="true" />}
      {rainy && <div className="sc-v2-rain sc-v2-rain-far absolute inset-0" aria-hidden="true" />}
      {snowy && <div className="sc-v2-snow absolute inset-0" aria-hidden="true" />}
      {stormy && <div className="sc-v2-lightning absolute inset-0" aria-hidden="true" />}
      {theme === 'night-pond' && <div className="sc-v2-night-haze absolute inset-0" aria-hidden="true" />}

      {empty && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <p className="rounded-full bg-black/15 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">사운드를 고르면 풍경이 깨어나요</p>
        </div>
      )}

      <div className="sc-v2-vignette pointer-events-none absolute inset-0" aria-hidden="true" />
    </div>
  );
};
