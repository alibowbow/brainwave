import React from 'react';
import { BackgroundSoundType } from '../types';
import { SOUND_ORDER } from '../audioOptions';
import { SCENE_META, CHARACTER_SVG } from './sceneCharacters';

interface Props {
  types: BackgroundSoundType[];
}

// Vertical center per band (% of the scene height) and character size (px).
const BAND_Y: Record<string, number> = { sky: 22, tree: 44, ground: 72, water: 84 };
const BAND_SIZE: Record<string, number> = { sky: 44, tree: 56, ground: 56, water: 44 };

// Sounds rendered as environment/scenery rather than as a placed character.
const SCENERY = new Set<BackgroundSoundType>(['wave']);
const WATER_SOUNDS: BackgroundSoundType[] = ['stream', 'waterfall', 'wave'];

// One repeating wave-crest layer for the ocean scenery (period 50 in a 200-wide
// viewBox, so a -50% drift loops seamlessly).
const WAVE_PATH = 'M0 10 Q12.5 4 25 10 T50 10 T75 10 T100 10 T125 10 T150 10 T175 10 T200 10 V24 H0 Z';

// Composes the active sounds' cute characters into one layered diorama: sky up
// top, trees mid, animals on the ground, water creatures at the waterline. As
// sounds are toggled the little friends gather and drift.
export const NatureScene: React.FC<Props> = ({ types }) => {
  const chars = SOUND_ORDER.filter((t) => types.includes(t) && SCENE_META[t] && CHARACTER_SVG[t] && !SCENERY.has(t));
  const hasWater = types.some((t) => WATER_SOUNDS.includes(t));
  const hasWave = types.includes('wave');
  const n = chars.length;

  return (
    <div className="relative w-full h-[150px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-gradient-to-b from-sky-200 to-sky-50 dark:from-slate-800 dark:to-slate-900">
      {/* sun (light) / moon (dark) */}
      <div className="absolute top-3 right-5 w-8 h-8 rounded-full bg-amber-200/80 dark:bg-slate-200/25" />
      {/* rolling ground hill */}
      <div className="absolute -bottom-7 -inset-x-8 h-16 rounded-t-[100%] bg-[#9ad99a] dark:bg-[#37634a]" />
      {/* waterline, only when a water sound is present */}
      {hasWater && <div className="absolute bottom-0 inset-x-0 h-9 bg-[#8fcdf0]/90 dark:bg-[#2c5c7a]/90" />}
      {/* ocean scenery: drifting wave crests along the waterline (파도 = 풍경) */}
      {hasWave && (
        <div className="absolute bottom-0 inset-x-0 h-9 overflow-hidden pointer-events-none">
          <svg className="scene-wave-drift-slow absolute bottom-2 left-0 h-4 w-[200%]" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true">
            <path d={WAVE_PATH} fill="#7fc4ec" opacity="0.6" />
          </svg>
          <svg className="scene-wave-drift absolute bottom-0 left-0 h-5 w-[200%]" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true">
            <path d={WAVE_PATH} fill="#bfe3f7" opacity="0.85" />
          </svg>
        </div>
      )}

      {n === 0 && !hasWave ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xs text-slate-500/80 dark:text-slate-300/70">사운드를 고르면 친구들이 모여요 🌱</p>
        </div>
      ) : (
        chars.map((t, i) => {
          const meta = SCENE_META[t]!;
          const x = ((i + 0.5) / n) * 100;
          const y = BAND_Y[meta.band];
          const size = BAND_SIZE[meta.band];
          return (
            <div
              key={t}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
            >
              <div className={`w-full h-full scene-motion-${meta.motion}`} style={{ animationDelay: `${(i % 5) * 0.35}s` }}>
                <svg
                  viewBox="0 0 100 100"
                  width="100%"
                  height="100%"
                  className="overflow-visible"
                  style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.12))' }}
                  dangerouslySetInnerHTML={{ __html: CHARACTER_SVG[t]! }}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
