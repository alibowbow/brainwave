export type Rng = () => number;

/** Small deterministic PRNG so the composition is identical on every visit. */
export function mulberry32(seed: number): Rng {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const range = (rng: Rng, min: number, max: number) => min + (max - min) * rng();

export const pick = <T,>(rng: Rng, list: readonly T[]): T => list[Math.min(list.length - 1, Math.floor(rng() * list.length))];

/** Biased sample in [min, max]; power > 1 favours the low end. */
export const skewed = (rng: Rng, min: number, max: number, power: number) => min + (max - min) * Math.pow(rng(), power);
