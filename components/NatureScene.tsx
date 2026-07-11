import React, { useEffect, useState } from 'react';
import { BackgroundSoundType } from '../types';
import { SCENE_META, CHARACTER_SVG } from './sceneCharacters';

interface Props {
  types: BackgroundSoundType[];
  tall?: boolean;
}

type SceneTheme = 'valley' | 'night-pond' | 'coast' | 'deep-sea' | 'cave' | 'winter' | 'warm';

type AtlasName = 'idle' | 'action';

interface MotionAtlas {
  path: string;
  columns: number;
  rows: number;
}

interface MotionClip {
  atlas: AtlasName;
  frames: readonly number[];
  frameDurations: readonly number[];
}

interface GeneratedCharacter {
  id: string;
  atlases: Record<AtlasName, MotionAtlas>;
  microClips: readonly MotionClip[];
  actionClips: readonly MotionClip[];
  restRange: readonly [number, number];
  actionProbability: number;
  className: string;
  alt: string;
}

interface MotionPose {
  atlas: AtlasName;
  frame: number;
}

interface NpcCharacterOptions {
  id: string;
  asset: string;
  className: string;
  alt: string;
  restRange: readonly [number, number];
  actionProbability: number;
  tempo?: number;
}

const makeFiveByFiveNpc = ({
  id,
  asset,
  className,
  alt,
  restRange,
  actionProbability,
  tempo = 1,
}: NpcCharacterOptions): GeneratedCharacter => {
  const durations = (values: readonly number[]) => values.map((value) => Math.round(value * tempo));
  const clip = (atlas: AtlasName, start: number, values: readonly number[]): MotionClip => ({
    atlas,
    frames: [start, start + 1, start + 2, start + 3, start + 4, 0],
    frameDurations: durations(values),
  });

  return {
    id,
    atlases: {
      idle: { path: `images/nature/motion/${asset}-behavior-a-v4.webp`, columns: 5, rows: 5 },
      action: { path: `images/nature/motion/${asset}-behavior-b-v4.webp`, columns: 5, rows: 5 },
    },
    microClips: [
      clip('idle', 0, [230, 210, 250, 230, 260, 320]),
      clip('idle', 5, [230, 170, 220, 190, 250, 330]),
      clip('idle', 10, [250, 230, 290, 240, 270, 350]),
      clip('idle', 15, [260, 240, 310, 250, 280, 360]),
      clip('idle', 20, [250, 220, 290, 240, 270, 350]),
    ],
    actionClips: [
      clip('action', 0, [230, 210, 260, 230, 280, 360]),
      clip('action', 5, [220, 190, 280, 240, 250, 380]),
      clip('action', 10, [240, 220, 280, 230, 270, 370]),
      clip('action', 15, [250, 230, 300, 240, 280, 390]),
      clip('action', 20, [240, 220, 290, 240, 280, 380]),
    ],
    restRange,
    actionProbability,
    className,
    alt,
  };
};

const assetUrl = (path: string) => new URL(path, document.baseURI).toString();

const BACKGROUND_PATH: Partial<Record<SceneTheme, string>> = {
  valley: 'images/nature/backgrounds/summer-valley.webp',
  'night-pond': 'images/nature/backgrounds/scops-night.webp',
};

const GENERATED_CHARACTERS: Partial<Record<BackgroundSoundType, GeneratedCharacter>> = {
  birds: {
    id: 'songbird',
    atlases: {
      idle: { path: 'images/nature/motion/songbird-behavior-a-v2.webp', columns: 5, rows: 5 },
      action: { path: 'images/nature/motion/songbird-behavior-b-v2.webp', columns: 5, rows: 5 },
    },
    microClips: [
      { atlas: 'idle', frames: [0, 1, 2, 3, 4, 0], frameDurations: [140, 80, 95, 90, 140, 180] },
      { atlas: 'idle', frames: [5, 6, 7, 8, 9, 0], frameDurations: [170, 140, 230, 160, 170, 210] },
      { atlas: 'idle', frames: [10, 11, 12, 13, 14, 0], frameDurations: [170, 140, 270, 170, 180, 220] },
      { atlas: 'idle', frames: [15, 16, 17, 18, 19, 0], frameDurations: [210, 170, 250, 190, 180, 220] },
      { atlas: 'idle', frames: [20, 21, 22, 23, 24, 0], frameDurations: [160, 100, 90, 120, 170, 240] },
      { atlas: 'action', frames: [5, 6, 7, 8, 9, 0], frameDurations: [220, 190, 230, 200, 220, 260] },
      { atlas: 'action', frames: [20, 21, 22, 23, 24, 0], frameDurations: [220, 190, 220, 190, 230, 260] },
    ],
    actionClips: [
      { atlas: 'action', frames: [0, 1, 2, 1, 2, 3, 4, 5, 0], frameDurations: [170, 140, 190, 130, 180, 150, 180, 210, 240] },
      { atlas: 'action', frames: [10, 11, 12, 13, 13, 12, 11, 14, 0], frameDurations: [150, 110, 100, 170, 130, 100, 120, 160, 230] },
      { atlas: 'action', frames: [15, 16, 17, 18, 19, 18, 17, 20, 0], frameDurations: [150, 120, 110, 170, 180, 120, 130, 180, 260] },
    ],
    restRange: [3800, 9000],
    actionProbability: 0.16,
    className: 'sc-v2-bird',
    alt: '나뭇가지에 앉은 작은 새',
  },
  owl: {
    id: 'owl',
    atlases: {
      idle: { path: 'images/nature/motion/scops-owl-behavior-a-v3.webp', columns: 5, rows: 5 },
      action: { path: 'images/nature/motion/scops-owl-behavior-b-v3.webp', columns: 5, rows: 5 },
    },
    microClips: [
      { atlas: 'idle', frames: [0, 1, 2, 3, 4, 0], frameDurations: [240, 220, 260, 240, 260, 300] },
      { atlas: 'idle', frames: [5, 6, 7, 8, 9, 0], frameDurations: [230, 170, 220, 190, 250, 320] },
      { atlas: 'idle', frames: [10, 11, 12, 13, 14, 0], frameDurations: [260, 240, 310, 250, 270, 340] },
      { atlas: 'idle', frames: [15, 16, 17, 18, 19, 0], frameDurations: [280, 250, 330, 250, 280, 360] },
      { atlas: 'idle', frames: [20, 21, 22, 23, 24, 0], frameDurations: [260, 230, 300, 240, 280, 350] },
      { atlas: 'action', frames: [20, 21, 22, 23, 24, 0], frameDurations: [250, 220, 260, 240, 270, 360] },
    ],
    actionClips: [
      { atlas: 'action', frames: [0, 1, 2, 3, 4, 0], frameDurations: [260, 240, 280, 260, 300, 380] },
      { atlas: 'action', frames: [5, 6, 7, 8, 9, 0], frameDurations: [230, 200, 300, 260, 240, 400] },
      { atlas: 'action', frames: [10, 11, 12, 13, 14, 0], frameDurations: [260, 240, 290, 250, 280, 390] },
      { atlas: 'action', frames: [15, 16, 17, 18, 19, 0], frameDurations: [270, 250, 300, 260, 280, 400] },
    ],
    restRange: [5200, 12000],
    actionProbability: 0.14,
    className: 'sc-v2-owl',
    alt: '나뭇가지에 앉은 부엉이',
  },
  scops: {
    id: 'scops',
    atlases: {
      idle: { path: 'images/nature/motion/scops-owl-behavior-a-v3.webp', columns: 5, rows: 5 },
      action: { path: 'images/nature/motion/scops-owl-behavior-b-v3.webp', columns: 5, rows: 5 },
    },
    microClips: [
      { atlas: 'idle', frames: [0, 1, 2, 3, 4, 0], frameDurations: [250, 230, 270, 250, 270, 320] },
      { atlas: 'idle', frames: [5, 6, 7, 8, 9, 0], frameDurations: [240, 180, 230, 200, 260, 340] },
      { atlas: 'idle', frames: [10, 11, 12, 13, 14, 0], frameDurations: [270, 250, 320, 260, 280, 360] },
      { atlas: 'idle', frames: [15, 16, 17, 18, 19, 0], frameDurations: [290, 260, 340, 260, 290, 380] },
      { atlas: 'idle', frames: [20, 21, 22, 23, 24, 0], frameDurations: [270, 240, 310, 250, 290, 370] },
      { atlas: 'action', frames: [20, 21, 22, 23, 24, 0], frameDurations: [260, 230, 270, 250, 280, 380] },
    ],
    actionClips: [
      { atlas: 'action', frames: [0, 1, 2, 3, 4, 0], frameDurations: [270, 250, 290, 270, 310, 400] },
      { atlas: 'action', frames: [5, 6, 7, 8, 9, 0], frameDurations: [240, 210, 310, 270, 250, 420] },
      { atlas: 'action', frames: [10, 11, 12, 13, 14, 0], frameDurations: [270, 250, 300, 260, 290, 410] },
      { atlas: 'action', frames: [15, 16, 17, 18, 19, 0], frameDurations: [280, 260, 310, 270, 290, 420] },
    ],
    restRange: [5200, 12000],
    actionProbability: 0.14,
    className: 'sc-v2-scops',
    alt: '밤의 소쩍새',
  },
  frogs: {
    id: 'frog',
    atlases: {
      idle: { path: 'images/nature/motion/pond-frog-behavior-a-v3.webp', columns: 5, rows: 5 },
      action: { path: 'images/nature/motion/pond-frog-behavior-b-v3.webp', columns: 5, rows: 5 },
    },
    microClips: [
      { atlas: 'idle', frames: [0, 1, 2, 3, 4, 0], frameDurations: [260, 240, 300, 260, 280, 340] },
      { atlas: 'idle', frames: [5, 6, 7, 8, 9, 0], frameDurations: [250, 190, 230, 210, 270, 350] },
      { atlas: 'idle', frames: [10, 11, 12, 13, 14, 0], frameDurations: [270, 250, 310, 260, 280, 360] },
      { atlas: 'idle', frames: [15, 16, 17, 18, 19, 0], frameDurations: [280, 250, 320, 260, 290, 370] },
      { atlas: 'idle', frames: [20, 21, 22, 23, 24, 0], frameDurations: [270, 240, 300, 250, 280, 360] },
      { atlas: 'action', frames: [15, 16, 17, 18, 19, 0], frameDurations: [260, 230, 290, 240, 270, 370] },
    ],
    actionClips: [
      { atlas: 'action', frames: [0, 1, 2, 3, 4, 0], frameDurations: [250, 230, 280, 250, 290, 370] },
      { atlas: 'action', frames: [5, 6, 7, 8, 9, 0], frameDurations: [230, 210, 320, 280, 250, 400] },
      { atlas: 'action', frames: [10, 11, 12, 13, 14, 0], frameDurations: [260, 240, 300, 250, 280, 380] },
      { atlas: 'action', frames: [20, 21, 22, 23, 24, 0], frameDurations: [250, 230, 300, 250, 280, 390] },
    ],
    restRange: [4200, 9500],
    actionProbability: 0.17,
    className: 'sc-v2-frog',
    alt: '이끼 낀 돌 위의 개구리',
  },
  seabirds: makeFiveByFiveNpc({
    id: 'seabird', asset: 'seabird', className: 'sc-v2-seabird', alt: '해변 위를 활강하는 바닷새',
    restRange: [2600, 6800], actionProbability: 0.28, tempo: 0.82,
  }),
  cuckoo: makeFiveByFiveNpc({
    id: 'cuckoo', asset: 'cuckoo', className: 'sc-v2-cuckoo', alt: '숲의 가지에 앉은 뻐꾸기',
    restRange: [4800, 11000], actionProbability: 0.16, tempo: 1.05,
  }),
  woodpecker: makeFiveByFiveNpc({
    id: 'woodpecker', asset: 'woodpecker', className: 'sc-v2-woodpecker', alt: '나무줄기에 붙은 딱따구리',
    restRange: [4200, 9600], actionProbability: 0.2, tempo: 0.9,
  }),
  ducks: makeFiveByFiveNpc({
    id: 'duck', asset: 'duck', className: 'sc-v2-duck', alt: '물 위를 천천히 떠다니는 오리',
    restRange: [3800, 9000], actionProbability: 0.18,
  }),
  cave: makeFiveByFiveNpc({
    id: 'bat', asset: 'bat', className: 'sc-v2-bat', alt: '동굴 안을 천천히 비행하는 박쥐',
    restRange: [2800, 7200], actionProbability: 0.24, tempo: 0.8,
  }),
  cicadas: makeFiveByFiveNpc({
    id: 'cicada', asset: 'cicada', className: 'sc-v2-cicada', alt: '나뭇가지에 붙어 우는 매미',
    restRange: [3600, 8200], actionProbability: 0.22, tempo: 0.72,
  }),
  night: makeFiveByFiveNpc({
    id: 'cricket', asset: 'cricket', className: 'sc-v2-cricket', alt: '풀숲에서 우는 귀뚜라미',
    restRange: [3300, 7600], actionProbability: 0.23, tempo: 0.78,
  }),
  stream: makeFiveByFiveNpc({
    id: 'stream-fish', asset: 'stream-fish', className: 'sc-v2-stream-fish', alt: '계곡물을 유영하는 작은 물고기',
    restRange: [2600, 6600], actionProbability: 0.2, tempo: 0.82,
  }),
  deepsea: makeFiveByFiveNpc({
    id: 'deepsea-fish', asset: 'deepsea-fish', className: 'sc-v2-deepsea-fish', alt: '빛을 내며 유영하는 심해어',
    restRange: [3200, 7800], actionProbability: 0.18, tempo: 1.08,
  }),
};

const GENERATED_TYPES = new Set<BackgroundSoundType>(Object.keys(GENERATED_CHARACTERS) as BackgroundSoundType[]);
const HIDDEN_LEGACY_TYPES = new Set<BackgroundSoundType>([
  'waterfall', 'wave', 'forest',
]);

const FIREFLIES = [
  { left: '17%', top: '49%', delay: '0s', size: 3 },
  { left: '31%', top: '60%', delay: '-1.6s', size: 2 },
  { left: '56%', top: '48%', delay: '-3.1s', size: 3 },
  { left: '74%', top: '56%', delay: '-0.8s', size: 2 },
  { left: '87%', top: '42%', delay: '-2.4s', size: 2 },
  { left: '42%', top: '38%', delay: '-4.2s', size: 2 },
];

const LEAVES = [
  { left: '8%', delay: '-1.2s', duration: '8.4s' },
  { left: '27%', delay: '-5.6s', duration: '10.2s' },
  { left: '49%', delay: '-3.1s', duration: '9.1s' },
  { left: '71%', delay: '-7.4s', duration: '11.3s' },
  { left: '91%', delay: '-2.7s', duration: '8.8s' },
];

const BUBBLES = [
  { left: '16%', delay: '-1.4s', size: 4 },
  { left: '33%', delay: '-4.8s', size: 3 },
  { left: '58%', delay: '-2.6s', size: 5 },
  { left: '79%', delay: '-6.1s', size: 3 },
  { left: '91%', delay: '-3.7s', size: 4 },
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

const IDLE_POSE: MotionPose = { atlas: 'idle', frame: 0 };

const randomBetween = (min: number, max: number) =>
  Math.round(min + Math.random() * (max - min));

const atlasFrameStyle = (atlas: MotionAtlas, frame: number): React.CSSProperties => {
  const frameCount = atlas.columns * atlas.rows;
  const safeFrame = Math.max(0, Math.min(frame, frameCount - 1));
  const column = safeFrame % atlas.columns;
  const row = Math.floor(safeFrame / atlas.columns);
  const x = atlas.columns === 1 ? 0 : (column / (atlas.columns - 1)) * 100;
  const y = atlas.rows === 1 ? 0 : (row / (atlas.rows - 1)) * 100;

  return {
    backgroundImage: `url("${assetUrl(atlas.path)}")`,
    backgroundSize: `${atlas.columns * 100}% ${atlas.rows * 100}%`,
    backgroundPosition: `${x}% ${y}%`,
  };
};

interface NaturalFaunaProps {
  character: GeneratedCharacter;
  index: number;
}

/**
 * NPC-style fauna motion: long, irregular rests are punctuated by short blink,
 * listening, breathing or call clips. Both atlases stay mounted so switching a
 * frame is an instant cell lookup rather than a sliding image transition.
 */
const NaturalFauna: React.FC<NaturalFaunaProps> = ({ character, index }) => {
  const [pose, setPose] = useState<MotionPose>(IDLE_POSE);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReduceMotion(media.matches);
    syncPreference();
    media.addEventListener('change', syncPreference);
    return () => media.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const clearTimer = () => {
      if (timer !== undefined) window.clearTimeout(timer);
      timer = undefined;
    };

    const scheduleRest = (initial = false) => {
      if (cancelled) return;
      setPose(IDLE_POSE);
      const delay = randomBetween(character.restRange[0], character.restRange[1]) + (initial ? index * 650 : 0);
      timer = window.setTimeout(startAction, delay);
    };

    const playClip = (clip: MotionClip, step: number) => {
      if (cancelled || document.hidden) return;
      if (step >= clip.frames.length) {
        scheduleRest();
        return;
      }

      setPose({ atlas: clip.atlas, frame: clip.frames[step] });
      timer = window.setTimeout(
        () => playClip(clip, step + 1),
        clip.frameDurations[step] ?? 220,
      );
    };

    function startAction() {
      if (cancelled || document.hidden) return;
      const useAction = Math.random() < character.actionProbability;
      const microClip = character.microClips[Math.floor(Math.random() * character.microClips.length)];
      const actionClip = character.actionClips[Math.floor(Math.random() * character.actionClips.length)];
      playClip(useAction ? actionClip : microClip, 0);
    }

    const handleVisibility = () => {
      clearTimer();
      setPose(IDLE_POSE);
      if (!document.hidden && !reduceMotion) scheduleRest(true);
    };

    setPose(IDLE_POSE);
    if (!reduceMotion && !document.hidden) scheduleRest(true);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelled = true;
      clearTimer();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [character, index, reduceMotion]);

  return (
    <div
      className={`sc-v2-character absolute ${character.className}`}
      role="img"
      aria-label={character.alt}
      data-fauna={character.id}
      data-motion={pose.atlas}
      data-motion-frame={pose.frame}
    >
      {(['idle', 'action'] as const).map((atlasName) => {
        const atlas = character.atlases[atlasName];
        const active = pose.atlas === atlasName;
        return (
          <div
            key={atlasName}
            className="sc-v2-atlas-layer absolute inset-0"
            style={{
              ...atlasFrameStyle(atlas, active ? pose.frame : 0),
              opacity: active ? 1 : 0,
            }}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
};

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
  const hasClouds = hasAny(types, ['rain', 'thunder', 'dthunder', 'tent', 'window', 'eaves']);
  const hasLeaves = hasAny(types, ['forest', 'bamboo']);
  const hasBamboo = types.includes('bamboo');
  const hasTemple = types.includes('temple');
  const hasTent = types.includes('tent');
  const hasWindow = types.includes('window');
  const hasEaves = types.includes('eaves');
  const hasPebbles = types.includes('pebbles');
  const hasChimes = types.includes('chimes');
  const hasBowl = types.includes('bowl');
  const hasFan = types.includes('fan');
  const hasDrone = types.includes('drone');
  const hasNoise = hasAny(types, ['brown', 'white', 'pink']);
  const hasBubbles = hasAny(types, ['deepsea', 'stream']);
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

      {hasClouds && (
        <div className={`sc-v2-cloud-field absolute inset-0 ${stormy ? 'is-stormy' : ''}`} aria-hidden="true">
          <span className="sc-v2-cloud sc-v2-cloud-a" />
          <span className="sc-v2-cloud sc-v2-cloud-b" />
          <span className="sc-v2-cloud sc-v2-cloud-c" />
        </div>
      )}

      {theme === 'deep-sea' && <div className="sc-v2-caustics absolute inset-0" aria-hidden="true" />}
      {theme === 'cave' && <div className="sc-v2-cave-depth absolute inset-0" aria-hidden="true" />}
      {theme === 'warm' && <div className="sc-v2-warm-field absolute inset-0" aria-hidden="true" />}

      {hasWater && (
        <div className="sc-v2-water absolute inset-x-0 bottom-0 h-[38%]" aria-hidden="true">
          <div className="sc-v2-water-glint absolute inset-0" />
        </div>
      )}
      {types.includes('wave') && <div className="sc-v2-wave-crests absolute inset-x-0 bottom-0 h-[38%]" aria-hidden="true" />}
      {types.includes('stream') && <div className="sc-v2-stream-lines absolute inset-x-0 bottom-0 h-[34%]" aria-hidden="true" />}
      {hasWaterfall && (
        <div className="sc-v2-waterfall-column absolute left-[42%] top-[20%] h-[68%] w-[18%]" aria-hidden="true">
          <span className="sc-v2-waterfall-mist absolute -bottom-2 left-1/2 h-8 w-24 -translate-x-1/2" />
        </div>
      )}
      {hasFire && (
        <div className="sc-v2-fire absolute bottom-[3%] left-1/2 h-20 w-24 -translate-x-1/2" aria-hidden="true">
          <span className="sc-v2-fire-glow absolute inset-0" />
          <span className="sc-v2-flame sc-v2-flame-a" />
          <span className="sc-v2-flame sc-v2-flame-b" />
          <span className="sc-v2-flame sc-v2-flame-c" />
          <span className="sc-v2-log sc-v2-log-a" />
          <span className="sc-v2-log sc-v2-log-b" />
        </div>
      )}
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

      {hasLeaves && LEAVES.map((leaf, index) => (
        <span key={`leaf-${index}`} className="sc-v2-leaf absolute" style={{ left: leaf.left, animationDelay: leaf.delay, animationDuration: leaf.duration }} aria-hidden="true" />
      ))}

      {hasBubbles && BUBBLES.map((bubble, index) => (
        <span key={`bubble-${index}`} className="sc-v2-bubble absolute rounded-full" style={{ left: bubble.left, width: bubble.size, height: bubble.size, animationDelay: bubble.delay }} aria-hidden="true" />
      ))}

      {hasBamboo && <div className="sc-v2-bamboo absolute inset-y-0 left-0 w-[34%]" aria-hidden="true"><span /><span /><span /><span /></div>}
      {hasTemple && <div className="sc-v2-temple absolute bottom-[2%] left-[8%] h-[58%] w-[38%]" aria-hidden="true"><span className="sc-v2-temple-roof" /><span className="sc-v2-temple-body" /><span className="sc-v2-temple-bell" /></div>}
      {hasTent && <div className="sc-v2-tent absolute bottom-[4%] left-[8%] h-[46%] w-[36%]" aria-hidden="true"><span /></div>}
      {hasWindow && <div className="sc-v2-window absolute inset-[8%]" aria-hidden="true"><span /><span /></div>}
      {hasEaves && <div className="sc-v2-eaves absolute inset-x-0 top-0 h-[28%]" aria-hidden="true"><span /></div>}
      {hasPebbles && <div className="sc-v2-pebbles absolute inset-x-0 bottom-0 h-[28%]" aria-hidden="true" />}
      {hasChimes && <div className="sc-v2-chimes absolute right-[12%] top-[8%] h-[58%] w-16" aria-hidden="true"><i /><i /><i /><i /><span /></div>}
      {hasBowl && <div className="sc-v2-bowl absolute bottom-[7%] left-[16%] h-16 w-24" aria-hidden="true"><span /><i /><i /></div>}
      {hasFan && <div className="sc-v2-fan absolute bottom-[4%] right-[10%] h-24 w-24" aria-hidden="true"><span className="sc-v2-fan-blades"><i /><i /><i /></span><span className="sc-v2-fan-stand" /></div>}
      {hasDrone && <div className="sc-v2-drone-orb absolute left-[46%] top-[28%] h-14 w-14 rounded-full" aria-hidden="true"><span /><i /></div>}
      {hasNoise && <div className="sc-v2-noise absolute inset-0" aria-hidden="true" />}

      {generated.map((type, index) => {
        const character = GENERATED_CHARACTERS[type]!;
        return <NaturalFauna key={`${type}-${index}`} character={character} index={index} />;
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
