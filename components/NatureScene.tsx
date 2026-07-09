import React from 'react';
import { BackgroundSoundType } from '../types';
import { SOUND_ORDER } from '../audioOptions';
import { SCENE_META, CHARACTER_SVG } from './sceneCharacters';

interface Props {
  types: BackgroundSoundType[];
}

// Vertical center per band (% of scene height) and character size (px).
const BAND_Y: Record<string, number> = { sky: 22, tree: 45, ground: 72, water: 84 };
const BAND_SIZE: Record<string, number> = { sky: 46, tree: 58, ground: 58, water: 46 };

const SCENERY = new Set<BackgroundSoundType>(['wave', 'rain', 'thunder', 'blizzard', 'waterfall', 'fire']);
const WATER_SOUNDS: BackgroundSoundType[] = ['stream', 'waterfall', 'wave'];
const WAVE_PATH = 'M0 10 Q12.5 4 25 10 T50 10 T75 10 T100 10 T125 10 T150 10 T175 10 T200 10 V24 H0 Z';

const STARS = [
  [40, 26], [78, 18], [120, 34], [165, 22], [210, 30], [255, 16],
  [300, 28], [58, 48], [150, 52], [235, 50], [330, 44], [355, 24],
];
const PARTICLES = [
  { left: '14%', top: '30%', size: 6, cls: 'sc-drift-a', delay: '0s' },
  { left: '33%', top: '56%', size: 4, cls: 'sc-drift-b', delay: '1.6s' },
  { left: '55%', top: '26%', size: 5, cls: 'sc-drift-a', delay: '3s' },
  { left: '72%', top: '48%', size: 6, cls: 'sc-drift-b', delay: '0.9s' },
  { left: '87%', top: '34%', size: 4, cls: 'sc-drift-a', delay: '2.3s' },
];

const CLOUD_SVG = (
  <svg viewBox="0 0 120 36" width="100%" height="100%">
    <ellipse cx="38" cy="24" rx="30" ry="11" fill="currentColor" />
    <ellipse cx="66" cy="18" rx="24" ry="13" fill="currentColor" />
    <ellipse cx="92" cy="25" rx="24" ry="9" fill="currentColor" />
  </svg>
);

const GRASS_SVG = (
  <svg viewBox="0 0 20 20" width="100%" height="100%">
    <path d="M10 19 Q8 10 4 5 M10 19 Q10 8 10 3 M10 19 Q12 10 16 6" stroke="var(--sc-hf-1)" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const FLOWER_SVG = (color: string) => (
  <svg viewBox="0 0 20 24" width="100%" height="100%">
    <path d="M10 23 Q10 16 10 11" stroke="var(--sc-hf-1)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <circle cx="10" cy="8" r="2.2" fill="#ffe3a3" />
    <circle cx="6.5" cy="7" r="2.6" fill={color} />
    <circle cx="13.5" cy="7" r="2.6" fill={color} />
    <circle cx="8" cy="11.5" r="2.6" fill={color} />
    <circle cx="12" cy="11.5" r="2.6" fill={color} />
    <circle cx="10" cy="4.5" r="2.6" fill={color} />
  </svg>
);

const REED_SVG = (
  <svg viewBox="0 0 22 40" width="100%" height="100%">
    <path d="M7 40 Q6 22 6 12 M15 40 Q16 24 16 16" stroke="#5aa86a" strokeWidth="2" fill="none" strokeLinecap="round" />
    <rect x="4" y="4" width="4.6" height="11" rx="2.3" fill="#a97c4f" />
    <rect x="13.8" y="9" width="4.6" height="10" rx="2.3" fill="#7b5836" />
  </svg>
);

const BUTTERFLY_SVG = (
  <svg viewBox="0 0 20 16" width="100%" height="100%">
    <ellipse cx="6" cy="7" rx="5" ry="4.2" fill="#ff9aa2" />
    <ellipse cx="14" cy="7" rx="5" ry="4.2" fill="#ffd166" />
    <ellipse cx="10" cy="8" rx="1.4" ry="4.6" fill="#33384a" />
  </svg>
);

const FLORA = [
  { left: '6%', top: '77%', size: 15, kind: 'grass', delay: '0s' },
  { left: '19%', top: '72%', size: 13, kind: 'grass', delay: '1.2s' },
  { left: '30%', top: '75%', size: 16, kind: 'flower-pink', delay: '0.5s' },
  { left: '52%', top: '71%', size: 14, kind: 'grass', delay: '2s' },
  { left: '68%', top: '74%', size: 16, kind: 'flower-yellow', delay: '1.6s' },
  { left: '88%', top: '72%', size: 15, kind: 'grass', delay: '0.8s' },
];

// Campfire flames: three stacked teardrop tongues (outer → core) that flicker
// independently, giving the fire a live, layered glow for the "불멍" mood.
const FLAME_OUTER = (
  <svg viewBox="0 0 46 66" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <defs>
      <linearGradient id="scFireOuter" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#ffb63e" />
        <stop offset="0.5" stopColor="#ff6f22" />
        <stop offset="1" stopColor="#e5392a" />
      </linearGradient>
    </defs>
    <path d="M23 3 C 14 21 8 31 10 45 C 12 58 17 65 23 65 C 29 65 34 58 36 45 C 38 31 32 21 23 3 Z" fill="url(#scFireOuter)" />
  </svg>
);
const FLAME_MID = (
  <svg viewBox="0 0 30 48" width="100%" height="100%">
    <defs>
      <linearGradient id="scFireMid" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#ffe473" />
        <stop offset="0.55" stopColor="#ffb02e" />
        <stop offset="1" stopColor="#ff7a1e" />
      </linearGradient>
    </defs>
    <path d="M15 2 C 9 14 5 22 7 33 C 9 42 12 46 15 46 C 18 46 21 42 23 33 C 25 22 21 14 15 2 Z" fill="url(#scFireMid)" />
  </svg>
);
const FLAME_CORE = (
  <svg viewBox="0 0 16 30" width="100%" height="100%">
    <defs>
      <linearGradient id="scFireCore" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#fff7da" />
        <stop offset="1" stopColor="#ffe085" />
      </linearGradient>
    </defs>
    <path d="M8 2 C 5 9 3 14 4 19 C 5 25 6 28 8 28 C 10 28 11 25 12 19 C 13 14 11 9 8 2 Z" fill="url(#scFireCore)" />
  </svg>
);
const FIRE_EMBERS = [
  { left: '43%', size: 3, dx: '6px', delay: '0s', dur: '2.4s' },
  { left: '55%', size: 2, dx: '-5px', delay: '0.8s', dur: '2.9s' },
  { left: '49%', size: 2.5, dx: '3px', delay: '1.5s', dur: '2.2s' },
  { left: '58%', size: 2, dx: '7px', delay: '2.1s', dur: '3.1s' },
  { left: '45%', size: 3, dx: '-4px', delay: '2.7s', dur: '2.6s' },
];

// A layered, atmospheric diorama: gradient sky with sun/moon bloom and stars,
// three hazy parallax hills, optional gradient water, floating particles and a
// vignette — with the active sounds' characters and weather composited on top.
export const NatureScene: React.FC<Props> = ({ types }) => {
  const chars = SOUND_ORDER.filter((t) => types.includes(t) && SCENE_META[t] && CHARACTER_SVG[t] && !SCENERY.has(t));
  const hasWater = types.some((t) => WATER_SOUNDS.includes(t));
  const hasWave = types.includes('wave');
  const hasWaterfall = types.includes('waterfall');
  const hasFire = types.includes('fire');
  const rainy = types.includes('rain') || types.includes('thunder');
  const stormy = types.includes('thunder');
  const snowy = types.includes('blizzard');
  const hasScenery = hasWave || hasWaterfall || hasFire || rainy || snowy;
  const clearSky = !rainy && !snowy;
  const n = chars.length;

  // Sky reflects the real time of day.
  const hour = new Date().getHours();
  const phase = hour < 5 ? 'night' : hour < 8 ? 'dawn' : hour < 17 ? 'day' : hour < 20 ? 'sunset' : 'night';
  const night = phase === 'night';

  return (
    <div className="sc-scene relative w-full h-[160px] rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-sm" data-phase={phase}>
      <svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="scSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="sc-sky-0" />
            <stop offset="0.55" className="sc-sky-1" />
            <stop offset="1" className="sc-sky-2" />
          </linearGradient>
          <radialGradient id="scSun" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" className="sc-sun-0" />
            <stop offset="0.45" className="sc-sun-1" />
            <stop offset="1" className="sc-sun-2" />
          </radialGradient>
          <linearGradient id="scHaze" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="sc-haze-0" />
            <stop offset="1" className="sc-haze-1" />
          </linearGradient>
          <linearGradient id="scHillBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="sc-hillback-0" />
            <stop offset="1" className="sc-hillback-1" />
          </linearGradient>
          <linearGradient id="scHillMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="sc-hillmid-0" />
            <stop offset="1" className="sc-hillmid-1" />
          </linearGradient>
          <linearGradient id="scHillFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="sc-hillfront-0" />
            <stop offset="1" className="sc-hillfront-1" />
          </linearGradient>
          <linearGradient id="scWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="sc-water-0" />
            <stop offset="0.4" className="sc-water-1" />
            <stop offset="1" className="sc-water-2" />
          </linearGradient>
          <radialGradient id="scVign" cx="0.5" cy="0.42" r="0.75">
            <stop offset="0.55" className="sc-vign-0" />
            <stop offset="1" className="sc-vign-1" />
          </radialGradient>
          <filter id="scBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* sky */}
        <rect x="0" y="0" width="400" height="160" fill="url(#scSky)" />

        {/* stars (clear night) */}
        {night && clearSky && (
          <g>
            {STARS.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.2 : 0.8} fill="#ffffff" opacity={0.9} />
            ))}
          </g>
        )}

        {/* sun / moon with soft bloom (colour follows the phase) */}
        {clearSky && (
          <g>
            <circle cx="322" cy="40" r="64" fill="url(#scSun)" />
            <circle cx="322" cy="40" r="14" className="sc-sun-core" />
          </g>
        )}

        {/* parallax hills (far = hazier) */}
        <path d="M0 92 Q100 72 200 86 T400 82 L400 160 L0 160 Z" fill="url(#scHillBack)" filter="url(#scBlur)" opacity="0.9" />
        <path d="M0 108 Q130 86 250 104 T400 100 L400 160 L0 160 Z" fill="url(#scHillMid)" />
        {/* horizon haze */}
        <rect x="0" y="86" width="400" height="30" fill="url(#scHaze)" opacity="0.5" />
        {/* distant tree silhouettes on the mid hill */}
        <g opacity="0.5" filter="url(#scBlur)" style={{ fill: 'var(--sc-hf-1)' }}>
          <circle cx="58" cy="94" r="9" />
          <rect x="56" y="98" width="4" height="9" rx="2" />
          <circle cx="76" cy="98" r="6.5" />
          <rect x="74.5" y="101" width="3" height="7" rx="1.5" />
          <circle cx="332" cy="92" r="8" />
          <rect x="330" y="96" width="4" height="9" rx="2" />
          <circle cx="352" cy="97" r="5.5" />
          <rect x="350.6" y="100" width="2.8" height="7" rx="1.4" />
        </g>
        {/* front ground */}
        <path d="M0 126 Q110 106 230 122 T400 118 L400 160 L0 160 Z" fill="url(#scHillFront)" />

        {/* waterfall cliff — a tall earthy rock outcrop (grass cap on top) that
            rises from the terrain; the water ribbon falls down its face */}
        {hasWaterfall && (
          <>
            <path d="M0 52 C 20 46 44 54 54 76 C 60 96 56 140 54 160 L0 160 Z" fill="#8a6f52" />
            <path d="M30 68 C 44 64 52 80 54 98 C 56 122 52 150 51 160 L30 160 Z" fill="#000000" opacity="0.16" />
            <path d="M0 52 C 20 46 44 54 54 76 L54 86 C 44 66 20 62 0 66 Z" fill="url(#scHillMid)" />
          </>
        )}

        {/* water body */}
        {hasWater && (
          <g>
            <path d="M0 128 Q100 122 200 128 T400 126 L400 160 L0 160 Z" fill="url(#scWater)" />
            <ellipse cx="200" cy="130" rx="150" ry="4" className="sc-water-0" opacity="0.5" />
          </g>
        )}

        {/* storm dims the sky */}
        {stormy && <rect x="0" y="0" width="400" height="160" fill="rgba(26,34,58,0.22)" />}
        {/* vignette for focus */}
        <rect x="0" y="0" width="400" height="160" fill="url(#scVign)" />
      </svg>

      {/* waterfall scenery: a ribbon of water falling down the cliff into the pool */}
      {hasWaterfall && (
        <div className="absolute left-[4.5%] top-[30%] bottom-[15%] w-[22px] pointer-events-none opacity-95">
          <div
            className="sc-cascade absolute inset-0 rounded-b-[10px]"
            style={{
              clipPath: 'polygon(18% 0, 82% 0, 100% 100%, 0 100%)',
              WebkitMaskImage: 'linear-gradient(180deg, transparent 0, #000 16%, #000 100%)',
              maskImage: 'linear-gradient(180deg, transparent 0, #000 16%, #000 100%)',
            }}
          />
          <div className="sc-mist absolute -bottom-2 -inset-x-3 h-5 rounded-[50%] bg-white/75 blur-[3px]" />
          <div className="absolute -bottom-0.5 -inset-x-2 h-[10px] rounded-[50%] bg-[#dff1fb]/85 blur-[1px]" />
        </div>
      )}

      {/* ocean crest ripples on the waterline */}
      {hasWave && (
        <div className="absolute bottom-0 inset-x-0 h-11 overflow-hidden pointer-events-none">
          <svg className="scene-wave-drift-slow absolute bottom-3 left-0 h-4 w-[200%]" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true">
            <path d={WAVE_PATH} fill="#bfe3f7" opacity="0.5" />
          </svg>
          <svg className="scene-wave-drift absolute bottom-0 left-0 h-5 w-[200%]" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true">
            <path d={WAVE_PATH} fill="#eaf6ff" opacity="0.85" />
          </svg>
        </div>
      )}

      {/* campfire scenery: a cozy fire-gazing (불멍) fire — layered flickering
          flames over a log pile, with a warm ground glow and rising embers */}
      {hasFire && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[6%] w-[132px] h-[112px] pointer-events-none z-[6]">
          {/* warm ground glow */}
          <div className="sc-fireglow absolute left-1/2 -translate-x-1/2 bottom-[4px] h-[74px] w-[132px] rounded-[50%]" />
          {/* log pile, ember bed & hearth stones */}
          <svg viewBox="0 0 132 112" className="absolute inset-0 h-full w-full">
            <ellipse cx="66" cy="101" rx="42" ry="8" fill="#000000" opacity="0.14" />
            <ellipse cx="66" cy="97" rx="26" ry="6" fill="#7a3410" />
            <ellipse cx="66" cy="96.5" rx="19" ry="4" fill="#ff7a1c" />
            <ellipse cx="66" cy="96" rx="11" ry="2.6" fill="#ffd15a" />
            <ellipse cx="30" cy="100" rx="8" ry="5" fill="#8f8f99" />
            <ellipse cx="30" cy="98.6" rx="8" ry="3.6" fill="#b0b0ba" />
            <ellipse cx="102" cy="100" rx="8" ry="5" fill="#7e7e88" />
            <ellipse cx="102" cy="98.6" rx="8" ry="3.6" fill="#9a9aa4" />
            <ellipse cx="47" cy="104" rx="6.5" ry="4" fill="#84848d" />
            <ellipse cx="85" cy="104" rx="6.5" ry="4" fill="#97979f" />
            <g>
              <rect x="30" y="88" width="72" height="11" rx="5.5" transform="rotate(-15 66 93)" fill="#7c4e2c" />
              <rect x="30" y="88" width="72" height="11" rx="5.5" transform="rotate(15 66 93)" fill="#6b4426" />
              <rect x="30" y="88" width="72" height="4" rx="2" transform="rotate(-15 66 93)" fill="#a9764a" opacity="0.7" />
              <rect x="30" y="90" width="72" height="3.5" rx="1.8" transform="rotate(15 66 93)" fill="#89623c" opacity="0.6" />
              <ellipse cx="34" cy="98" rx="5.2" ry="5" fill="#c69c6d" />
              <ellipse cx="34" cy="98" rx="2.4" ry="2.3" fill="#a9764a" />
              <ellipse cx="99" cy="98" rx="5.2" ry="5" fill="#b98a58" />
              <ellipse cx="99" cy="98" rx="2.4" ry="2.3" fill="#9a6b3f" />
            </g>
          </svg>
          {/* layered flickering flames */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[20px] h-[62px] w-[46px]">
            <div className="sc-flame sc-flame-a absolute inset-0">{FLAME_OUTER}</div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[22px] h-[44px] w-[30px]">
            <div className="sc-flame sc-flame-b absolute inset-0">{FLAME_MID}</div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[24px] h-[26px] w-[15px]">
            <div className="sc-flame sc-flame-c absolute inset-0">{FLAME_CORE}</div>
          </div>
          {/* rising embers */}
          {FIRE_EMBERS.map((e, i) => (
            <span
              key={i}
              className="sc-ember absolute rounded-full"
              style={{ left: e.left, bottom: '46px', width: e.size, height: e.size, animationDelay: e.delay, animationDuration: e.dur, '--sc-ex': e.dx } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* drifting clouds */}
      <div className="sc-cloud sc-cloud-a" style={{ left: 0, top: '6%', width: 96, height: 30 }}>{CLOUD_SVG}</div>
      <div className="sc-cloud sc-cloud-b" style={{ left: 0, top: '20%', width: 66, height: 22, opacity: 0.75 }}>{CLOUD_SVG}</div>

      {/* grass tufts & wildflowers on the front hill */}
      {FLORA.map((f, i) => (
        <div key={i} className="sc-grass absolute pointer-events-none" style={{ left: f.left, top: f.top, width: f.size, height: f.size * 1.15, animationDelay: f.delay }}>
          {f.kind === 'grass' ? GRASS_SVG : FLOWER_SVG(f.kind === 'flower-pink' ? '#ff9aa2' : '#ffd166')}
        </div>
      ))}

      {/* reeds at the water's edge */}
      {hasWater && (
        <>
          <div className="sc-grass absolute pointer-events-none" style={{ left: '3%', bottom: '4%', width: 20, height: 36 }}>{REED_SVG}</div>
          <div className="sc-grass absolute pointer-events-none" style={{ right: '4%', bottom: '5%', width: 18, height: 32, animationDelay: '1.4s' }}>{REED_SVG}</div>
        </>
      )}

      {/* daytime butterflies (fireflies take over at night via particles) */}
      {!night && (
        <>
          <div className="sc-butterfly absolute pointer-events-none" style={{ left: '24%', top: '58%', width: 15, height: 12 }}>{BUTTERFLY_SVG}</div>
          <div className="sc-butterfly absolute pointer-events-none" style={{ left: '70%', top: '52%', width: 12, height: 10, animationDelay: '-7s' }}>{BUTTERFLY_SVG}</div>
        </>
      )}

      {/* ambient particles */}
      {PARTICLES.map((p, i) => (
        <div key={i} className={`sc-particle ${p.cls}`} style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay }} />
      ))}

      {/* characters */}
      {n === 0 && !hasScenery ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xs text-slate-500/80 dark:text-slate-300/70">사운드를 고르면 친구들이 모여요 🌱</p>
        </div>
      ) : (
        chars.map((t, i) => {
          const meta = SCENE_META[t]!;
          // Deterministic jitter so placement feels organic, not mechanical.
          const x = Math.min(93, Math.max(7, ((i + 0.5) / n) * 100 + (((i * 53) % 9) - 4)));
          const y = BAND_Y[meta.band] + (((i * 31) % 7) - 3);
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
                  style={{ filter: 'url(#scPuffy) drop-shadow(0 4px 3px rgba(15,25,45,0.25))' }}
                  dangerouslySetInnerHTML={{ __html: CHARACTER_SVG[t]! }}
                />
              </div>
            </div>
          );
        })
      )}

      {/* weather overlays (parallax back + front layers) sit in front */}
      {rainy && <div className="scene-rain-2 absolute inset-0 z-20 pointer-events-none" />}
      {rainy && <div className="scene-rain absolute inset-0 z-20 pointer-events-none" />}
      {snowy && <div className="scene-snow-2 absolute inset-0 z-20 pointer-events-none" />}
      {snowy && <div className="scene-snow absolute inset-0 z-20 pointer-events-none" />}
      {stormy && <div className="scene-lightning absolute inset-0 z-20 bg-white pointer-events-none" style={{ opacity: 0 }} />}
    </div>
  );
};
