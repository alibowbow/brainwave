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

// Composes the active sounds' cute characters into one layered diorama: sky up
// top, trees mid, animals on the ground, water creatures at the waterline. As
// sounds are toggled the little friends gather and drift.
export const NatureScene: React.FC<Props> = ({ types }) => {
  const chars = SOUND_ORDER.filter((t) => types.includes(t) && SCENE_META[t] && CHARACTER_SVG[t]);
  const hasWater = chars.some((t) => SCENE_META[t]!.band === 'water');
  const n = chars.length;

  return (
    <div className="relative w-full h-[150px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-gradient-to-b from-sky-200 to-sky-50 dark:from-slate-800 dark:to-slate-900">
      {/* sun (light) / moon (dark) */}
      <div className="absolute top-3 right-5 w-8 h-8 rounded-full bg-amber-200/80 dark:bg-slate-200/25" />
      {/* rolling ground hill */}
      <div className="absolute -bottom-7 -inset-x-8 h-16 rounded-t-[100%] bg-[#9ad99a] dark:bg-[#37634a]" />
      {/* waterline, only when a water sound is present */}
      {hasWater && <div className="absolute bottom-0 inset-x-0 h-9 bg-[#8fcdf0]/90 dark:bg-[#2c5c7a]/90" />}

      {n === 0 ? (
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
