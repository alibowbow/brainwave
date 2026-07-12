import React, { useEffect, useRef, useState } from 'react';
import { BackgroundSoundType } from '../types';
import { SCENE_META, CHARACTER_SVG } from './sceneCharacters';
import { getSoundLabel } from '../audioOptions';
import { SPATIAL, SCENERY_HOTSPOTS } from '../sceneLayout';

interface Props {
  types: BackgroundSoundType[];
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
      idle: { path: 'images/nature/motion/scops-owl-idle-atlas.webp', columns: 2, rows: 2 },
      action: { path: 'images/nature/motion/scops-owl-call-atlas.webp', columns: 4, rows: 1 },
    },
    microClips: [
      { atlas: 'idle', frames: [0, 1, 2, 1, 0], frameDurations: [260, 320, 220, 280, 220] },
      { atlas: 'idle', frames: [0, 3, 3, 0], frameDurations: [320, 620, 420, 240] },
    ],
    actionClips: [
      { atlas: 'action', frames: [0, 1, 2, 2, 1, 3, 0], frameDurations: [320, 300, 420, 320, 280, 360, 240] },
    ],
    restRange: [5200, 12000],
    actionProbability: 0.18,
    className: 'sc-v2-owl',
    alt: '나뭇가지에 앉은 부엉이',
  },
  scops: {
    id: 'scops',
    atlases: {
      idle: { path: 'images/nature/motion/scops-owl-idle-atlas.webp', columns: 2, rows: 2 },
      action: { path: 'images/nature/motion/scops-owl-call-atlas.webp', columns: 4, rows: 1 },
    },
    microClips: [
      { atlas: 'idle', frames: [0, 1, 2, 1, 0], frameDurations: [260, 320, 220, 280, 220] },
      { atlas: 'idle', frames: [0, 3, 3, 0], frameDurations: [320, 620, 420, 240] },
    ],
    actionClips: [
      { atlas: 'action', frames: [0, 1, 2, 2, 1, 3, 0], frameDurations: [320, 300, 420, 320, 280, 360, 240] },
    ],
    restRange: [5200, 12000],
    actionProbability: 0.18,
    className: 'sc-v2-scops',
    alt: '밤의 소쩍새',
  },
  frogs: {
    id: 'frog',
    atlases: {
      idle: { path: 'images/nature/motion/pond-frog-idle-atlas.webp', columns: 2, rows: 2 },
      action: { path: 'images/nature/motion/pond-frog-call-atlas.webp', columns: 4, rows: 1 },
    },
    microClips: [
      { atlas: 'idle', frames: [0, 1, 0], frameDurations: [300, 520, 260] },
      { atlas: 'idle', frames: [0, 2, 0], frameDurations: [260, 180, 260] },
      { atlas: 'idle', frames: [0, 3, 3, 0], frameDurations: [240, 500, 320, 240] },
    ],
    actionClips: [
      { atlas: 'action', frames: [0, 1, 2, 2, 1, 3, 0], frameDurations: [220, 220, 340, 280, 220, 260, 180] },
    ],
    restRange: [4200, 9500],
    actionProbability: 0.24,
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

/**
 * Layered nature diorama. Generated plates carry the expensive visual detail;
 * CSS supplies only low-cost motion (water shimmer, mist, fireflies and gentle
 * parallax), while the old SVG characters remain as a safe fallback for sounds
 * that have not received a generated cutout yet.
 */
export const NatureScene: React.FC<Props> = ({ types, tall, fill, interactive, selectedType, onSelectType, subscribeEvents }) => {
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
      className={`sc-scene-v2 relative w-full ${fill ? 'h-full rounded-2xl' : tall ? 'h-[240px] rounded-3xl' : 'h-[160px] rounded-2xl'} overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-sm`}
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

      {rainy && <div className="sc-v2-rain sc-v2-rain-near absolute inset-0" aria-hidden="true" />}
      {rainy && <div className="sc-v2-rain sc-v2-rain-far absolute inset-0" aria-hidden="true" />}
      {snowy && <div className="sc-v2-snow absolute inset-0" aria-hidden="true" />}
      {stormy && <div className="sc-v2-lightning absolute inset-0" aria-hidden="true" />}
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
