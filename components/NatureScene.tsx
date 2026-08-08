import React, { useEffect, useRef, useState } from 'react';
import { BackgroundSoundType } from '../types';
import {
  ENVIRONMENT_ATLAS_COLUMNS,
  ENVIRONMENT_ATLAS_ROWS,
  ENVIRONMENT_OBJECTS,
  EnvironmentObjectSpec,
} from './environmentObjects';
import { SCENE_META, CHARACTER_SVG } from './sceneCharacters';
import { getSoundLabel } from '../audioOptions';
import { SPATIAL, SCENERY_HOTSPOTS } from '../sceneLayout';

export type NatureBackgroundVariant = 'campfire';

interface Props {
  types: BackgroundSoundType[];
  /** Selects a photographed plate for a known scene. Kept explicit so a
      generic fire layer (for example, the winter lodge) does not switch it. */
  backgroundVariant?: NatureBackgroundVariant;
  tall?: boolean;
  fill?: boolean;  // stretch to the parent's height (composer layout)
  /** Enables tap-to-select on fauna and scenery. */
  interactive?: boolean;
  selectedType?: BackgroundSoundType | null;
  onSelectType?: (type: BackgroundSoundType) => void;
  /** Engine hookup: fires when a sound makes a salient noise, so the matching
      object reacts in sync (frog croak → call clip, thunder → flash). */
  subscribeEvents?: (cb: (type: BackgroundSoundType) => void) => () => void;
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

const CAMPFIRE_POSTER_PATH = 'images/nature/backgrounds/campfire-loop-poster-v1.webp';
const CAMPFIRE_VIDEO_PATH = 'video/nature/campfire-loop-v1.mp4';

interface NetworkInformationLike extends EventTarget {
  saveData?: boolean;
  effectiveType?: string;
}

const CampfireBackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoAllowed, setVideoAllowed] = useState(false);
  const [videoSource, setVideoSource] = useState<string | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
    const update = () => {
      const slowConnection = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
      const appReducesMotion = document.documentElement.classList.contains('reduce-motion');
      setVideoAllowed(!motionQuery.matches && !appReducesMotion && !connection?.saveData && !slowConnection);
    };
    const classObserver = new MutationObserver(update);
    classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    motionQuery.addEventListener('change', update);
    connection?.addEventListener('change', update);
    // Let App apply its persisted reduce-motion class before deciding whether
    // the browser may request the MP4.
    const initialCheck = window.requestAnimationFrame(update);
    return () => {
      window.cancelAnimationFrame(initialCheck);
      classObserver.disconnect();
      motionQuery.removeEventListener('change', update);
      connection?.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!videoAllowed) {
      setVideoSource(null);
      return;
    }
    let cancelled = false;
    let objectUrl: string | null = null;
    const load = async () => {
      try {
        // A normal full-file request lets Workbox cache one complete response.
        // Subsequent media range requests can then be sliced from that cache.
        const response = await fetch(assetUrl(CAMPFIRE_VIDEO_PATH), { cache: 'force-cache' });
        if (!response.ok) return;
        const blob = await response.blob();
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setVideoSource(objectUrl);
      } catch {
        // The plate already displays the matching poster as a safe fallback.
      }
    };
    void load();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [videoAllowed]);

  useEffect(() => {
    if (!videoAllowed || !videoSource) return;
    const syncPlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) video.pause();
      else void video.play().catch(() => undefined);
    };
    document.addEventListener('visibilitychange', syncPlayback);
    syncPlayback();
    return () => document.removeEventListener('visibilitychange', syncPlayback);
  }, [videoAllowed, videoSource]);

  if (!videoAllowed || !videoSource) return null;

  return (
    <video
      ref={videoRef}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      src={videoSource}
      poster={assetUrl(CAMPFIRE_POSTER_PATH)}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
    />
  );
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
  'rain', 'thunder', 'dthunder', 'blizzard',
  'stream', 'waterfall', 'wave', 'pebbles',
  'fire', 'forest', 'bamboo', 'temple',
  'tent', 'window', 'eaves', 'chimes', 'bowl',
  'fan', 'drone', 'heartbeat', 'brown', 'white', 'pink',
]);

const FIREFLIES = [
  { left: '17%', top: '49%', delay: '0s', duration: '6.2s', size: 3 },
  { left: '31%', top: '60%', delay: '-1.6s', duration: '7.4s', size: 2 },
  { left: '56%', top: '48%', delay: '-3.1s', duration: '6.8s', size: 3 },
  { left: '74%', top: '56%', delay: '-0.8s', duration: '7.8s', size: 2 },
  { left: '87%', top: '42%', delay: '-2.4s', duration: '6.5s', size: 2 },
  { left: '42%', top: '38%', delay: '-4.2s', duration: '7.1s', size: 2 },
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
  /** Increment to force an action clip right now (sound-event sync). */
  actionSignal?: number;
  interactive?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

/**
 * NPC-style fauna motion: long, irregular rests are punctuated by short blink,
 * listening, breathing or call clips. Both atlases stay mounted so switching a
 * frame is an instant cell lookup rather than a sliding image transition.
 * When the audio engine reports this creature actually calling, `actionSignal`
 * interrupts the rest and plays the call clip in sync with the sound.
 */
const NaturalFauna: React.FC<NaturalFaunaProps> = ({ character, index, actionSignal, interactive, selected, onSelect }) => {
  const [pose, setPose] = useState<MotionPose>(IDLE_POSE);
  const [reduceMotion, setReduceMotion] = useState(false);
  const playClipRef = useRef<(clip: MotionClip, step: number) => void>(() => {});
  const clearTimerRef = useRef<() => void>(() => {});

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
    clearTimerRef.current = clearTimer;

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
    playClipRef.current = playClip;

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

  // Sound-event sync: the engine says this creature is calling right now.
  useEffect(() => {
    if (!actionSignal || reduceMotion || document.hidden) return;
    clearTimerRef.current();
    const clip = character.actionClips[actionSignal % character.actionClips.length];
    playClipRef.current(clip, 0);
  }, [actionSignal, character, reduceMotion]);

  const Wrapper: 'button' | 'div' = interactive ? 'button' : 'div';
  return (
    <Wrapper
      type={interactive ? 'button' : undefined}
      onClick={interactive ? onSelect : undefined}
      className={`sc-v2-character absolute ${character.className} ${selected ? 'sc-selected' : ''} ${interactive ? 'cursor-pointer rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400' : ''}`}
      style={interactive ? { background: 'transparent', border: 'none', padding: 0 } : undefined}
      role={interactive ? undefined : 'img'}
      aria-label={interactive ? `${character.alt} — 사운드 선택` : character.alt}
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
    </Wrapper>
  );
};

interface GeneratedEnvironmentObjectProps {
  spec: EnvironmentObjectSpec;
  className: string;
  index?: number;
  style?: React.CSSProperties;
}

/**
 * One generated row per environment object, five motion cells per row.
 * Continuous phenomena use uneven frame holds; discrete objects rest for
 * several seconds between clips so the whole scene never moves in lockstep.
 */
const GeneratedEnvironmentObject: React.FC<GeneratedEnvironmentObjectProps> = ({
  spec,
  className,
  index = 0,
  style,
}) => {
  const [frame, setFrame] = useState(0);
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

    const schedule = (initial = false) => {
      if (cancelled || reduceMotion || document.hidden) return;
      setFrame(0);
      const rest = spec.restRange
        ? randomBetween(spec.restRange[0], spec.restRange[1])
        : 0;
      timer = window.setTimeout(
        () => play(0),
        rest + (initial ? index * 170 : 0),
      );
    };

    const play = (step: number) => {
      if (cancelled || reduceMotion || document.hidden) return;
      if (step >= spec.frames.length) {
        schedule();
        return;
      }
      setFrame(spec.frames[step] ?? 0);
      timer = window.setTimeout(
        () => play(step + 1),
        spec.frameDurations[step] ?? 500,
      );
    };

    const handleVisibility = () => {
      clearTimer();
      setFrame(0);
      if (!document.hidden && !reduceMotion) schedule(true);
    };

    setFrame(0);
    if (!reduceMotion && !document.hidden) schedule(true);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      cancelled = true;
      clearTimer();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [index, reduceMotion, spec]);

  const atlas: MotionAtlas = {
    path: spec.atlasPath,
    columns: ENVIRONMENT_ATLAS_COLUMNS,
    rows: ENVIRONMENT_ATLAS_ROWS,
  };
  const atlasFrame = spec.row * ENVIRONMENT_ATLAS_COLUMNS + frame;

  return (
    <div
      className={`sc-v3-object absolute ${className}`}
      style={{ ...style, ...atlasFrameStyle(atlas, atlasFrame) }}
      data-object={spec.id}
      data-object-frame={frame}
      aria-hidden="true"
    />
  );
};

/**
 * Layered nature diorama. Generated plates, fauna atlases and environment
 * atlases carry the visual detail; CSS supplies only positioning and slow
 * whole-object travel. Old SVG characters remain solely as a safe fallback for
 * sound types that do not have a generated asset.
 */
export const NatureScene: React.FC<Props> = ({ types, backgroundVariant, tall, fill, interactive, selectedType, onSelectType, subscribeEvents }) => {
  const theme = resolveTheme(types);
  const usesCampfireBackground = backgroundVariant === 'campfire' && types.includes('fire');
  const backgroundPath = usesCampfireBackground ? CAMPFIRE_POSTER_PATH : BACKGROUND_PATH[theme];
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
  // Photographic plates already contain their own fauna and props. Keeping the
  // illustrated atlas characters on top makes the scene feel composited rather
  // than immersive, so only transparent sound hotspots remain interactive.
  const generated = usesCampfireBackground ? [] : types.filter((type) => GENERATED_CHARACTERS[type]);
  const legacy = usesCampfireBackground ? [] : legacyCharacters(types);
  const empty = types.length === 0;

  // Sound-event sync: bump a per-type counter for fauna call clips / legacy
  // pulses, and flash the sky exactly when a thunder roll fires.
  const [eventTicks, setEventTicks] = useState<Partial<Record<BackgroundSoundType, number>>>({});
  const [pulses, setPulses] = useState<Partial<Record<BackgroundSoundType, number>>>({});
  const [flashTick, setFlashTick] = useState(0);
  const pulseTimers = useRef<number[]>([]);
  useEffect(() => {
    if (!subscribeEvents) return;
    const unsub = subscribeEvents((type) => {
      if (type === 'thunder' || type === 'dthunder') {
        setFlashTick((k) => k + 1);
        return;
      }
      if (GENERATED_TYPES.has(type)) {
        setEventTicks((prev) => ({ ...prev, [type]: (prev[type] ?? 0) + 1 }));
        return;
      }
      setPulses((prev) => ({ ...prev, [type]: (prev[type] ?? 0) + 1 }));
      const id = window.setTimeout(() => {
        setPulses((prev) => {
          if (!(type in prev)) return prev;
          const next = { ...prev };
          delete next[type];
          return next;
        });
      }, 850);
      pulseTimers.current.push(id);
    });
    return () => {
      unsub();
      pulseTimers.current.forEach((id) => clearTimeout(id));
      pulseTimers.current = [];
    };
  }, [subscribeEvents]);

  return (
    <div
      className={`sc-scene-v2 ${fill ? 'absolute inset-0 rounded-2xl' : `relative w-full ${tall ? 'h-[240px] rounded-3xl' : 'h-[160px] rounded-2xl'}`} overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-sm`}
      data-theme={theme}
      data-sounds={types.join(',')}
      data-background-variant={usesCampfireBackground ? 'campfire' : undefined}
    >
      <div
        className="sc-v2-plate absolute inset-0"
        style={backgroundPath ? { backgroundImage: `url("${assetUrl(backgroundPath)}")` } : undefined}
        aria-hidden="true"
      />
      {usesCampfireBackground && <CampfireBackgroundVideo />}
      <div className="sc-v2-plate-tint absolute inset-0" aria-hidden="true" />

      {hasClouds && (
        <div className="sc-v3-cloud-field absolute inset-0" aria-hidden="true">
          {stormy ? (
            <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.storm} className="sc-v3-storm-cloud" />
          ) : (
            ['a', 'b', 'c'].map((suffix, index) => (
              <GeneratedEnvironmentObject
                key={suffix}
                spec={ENVIRONMENT_OBJECTS.cloud}
                className={`sc-v3-cloud sc-v3-cloud-${suffix}`}
                index={index}
              />
            ))
          )}
        </div>
      )}

      {theme === 'deep-sea' && <div className="sc-v2-caustics absolute inset-0" aria-hidden="true" />}
      {theme === 'cave' && <div className="sc-v2-cave-depth absolute inset-0" aria-hidden="true" />}
      {theme === 'warm' && <div className="sc-v2-warm-field absolute inset-0" aria-hidden="true" />}

      {hasWater && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.water} className="sc-v3-water" />}
      {types.includes('wave') && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.wave} className="sc-v3-wave" />}
      {types.includes('stream') && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS['stream-flow']} className="sc-v3-stream" />}
      {hasWaterfall && (
        <>
          <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.waterfall} className="sc-v3-waterfall" />
          <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS['waterfall-mist']} className="sc-v3-waterfall-mist" />
        </>
      )}
      {hasFire && !usesCampfireBackground && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.fire} className="sc-v3-fire" />}
      {hasHeartbeat && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.heartbeat} className="sc-v3-heartbeat" />}

      {theme === 'night-pond' && FIREFLIES.map((firefly, index) => (
        <span
          key={`firefly-${index}`}
          className="sc-v3-firefly"
          data-firefly=""
          aria-hidden="true"
          style={{
            left: firefly.left,
            top: firefly.top,
            width: 12 + firefly.size * 2,
            height: 12 + firefly.size * 2,
            animationDelay: firefly.delay,
            animationDuration: firefly.duration,
          }}
        />
      ))}

      {hasLeaves && LEAVES.map((leaf, index) => (
        <GeneratedEnvironmentObject
          key={`leaf-${index}`}
          spec={ENVIRONMENT_OBJECTS.leaf}
          className="sc-v3-leaf"
          index={index}
          style={{ left: leaf.left, animationDelay: leaf.delay, animationDuration: leaf.duration }}
        />
      ))}

      {hasBubbles && BUBBLES.map((bubble, index) => (
        <GeneratedEnvironmentObject
          key={`bubble-${index}`}
          spec={ENVIRONMENT_OBJECTS.bubble}
          className="sc-v3-bubble"
          index={index}
          style={{ left: bubble.left, width: 22 + bubble.size * 2, height: 22 + bubble.size * 2, animationDelay: bubble.delay }}
        />
      ))}

      {hasBamboo && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.bamboo} className="sc-v3-bamboo" />}
      {hasTemple && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.temple} className="sc-v3-temple" />}
      {hasTent && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.tent} className="sc-v3-tent" />}
      {hasWindow && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS['rain-window']} className="sc-v3-window" />}
      {hasEaves && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.eaves} className="sc-v3-eaves" />}
      {hasPebbles && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.pebbles} className="sc-v3-pebbles" />}
      {hasChimes && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.chimes} className="sc-v3-chimes" />}
      {hasBowl && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS['singing-bowl']} className="sc-v3-bowl" />}
      {hasFan && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.fan} className="sc-v3-fan" />}
      {hasDrone && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.drone} className="sc-v3-drone" />}
      {hasNoise && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.noise} className="sc-v3-noise" />}

      {generated.map((type, index) => {
        const character = GENERATED_CHARACTERS[type]!;
        return (
          <NaturalFauna
            key={`${type}-${index}`}
            character={character}
            index={index}
            actionSignal={eventTicks[type]}
            interactive={interactive}
            selected={selectedType === type}
            onSelect={() => onSelectType?.(type)}
          />
        );
      })}

      {legacy.map((type, index) => {
        const meta = SCENE_META[type]!;
        // Anchored per type (shared spatial layout) so adding/removing sounds
        // never reshuffles the rest of the scene — and pan matches position.
        const left = `${Math.min(90, Math.max(8, (SPATIAL[type]?.x ?? 0.5) * 100))}%`;
        const top = meta.band === 'sky' ? '28%' : meta.band === 'tree' ? '49%' : meta.band === 'ground' ? '72%' : '82%';
        const selected = selectedType === type;
        const Wrapper: 'button' | 'div' = interactive ? 'button' : 'div';
        return (
          <Wrapper
            key={type}
            type={interactive ? 'button' : undefined}
            aria-label={interactive ? `${getSoundLabel(type)} 사운드 선택` : undefined}
            onClick={interactive ? () => onSelectType?.(type) : undefined}
            className={`sc-v2-legacy absolute ${meta.motion} ${pulses[type] ? 'sc-hit' : ''} ${selected ? 'sc-selected' : ''} ${interactive ? 'cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400' : ''}`}
            style={{ left, top, animationDelay: `${index * 0.4}s`, ...(interactive ? { background: 'transparent', border: 'none', padding: 0 } : {}) }}
          >
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true" dangerouslySetInnerHTML={{ __html: CHARACTER_SVG[type]! }} />
          </Wrapper>
        );
      })}

      {/* tappable hotspots for scenery-style sounds (fire glow, water, sky...) */}
      {interactive && types.filter((t) => SCENERY_HOTSPOTS[t] && !GENERATED_TYPES.has(t) && !legacy.includes(t)).map((t) => {
        const hot = SCENERY_HOTSPOTS[t]!;
        const selected = selectedType === t;
        return (
          <button
            key={`hot-${t}`}
            type="button"
            aria-label={`${getSoundLabel(t)} 사운드 선택`}
            onClick={() => onSelectType?.(t)}
            className={`absolute z-10 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 ${selected ? 'sc-hot-selected' : ''}`}
            style={{ left: `${hot.x}%`, top: `${hot.y}%`, width: `${hot.w}%`, height: `${hot.h}%`, background: 'transparent', border: 'none', padding: 0 }}
          />
        );
      })}

      {rainy && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.rain} className="sc-v3-rain sc-v3-rain-near" />}
      {rainy && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.rain} className="sc-v3-rain sc-v3-rain-far" index={1} />}
      {snowy && <GeneratedEnvironmentObject spec={ENVIRONMENT_OBJECTS.snow} className="sc-v3-snow" />}
      {/* event-synced lightning: flashes exactly when a thunder roll fires */}
      {flashTick > 0 && <div key={flashTick} className="sc-flash-now absolute inset-0 z-10 bg-white pointer-events-none" style={{ opacity: 0 }} aria-hidden="true" />}
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
