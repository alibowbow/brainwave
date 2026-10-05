/** Deterministic forest layout, in metres. No downloaded meshes or textures. */
export function forestRandom(seed = 7391) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function pondRadius(x: number, z: number) {
  return Math.hypot((x + 0.18) / 2.55, (z + 0.55) / 3.45);
}

export function groundHeight(x: number, z: number) {
  const r = pondRadius(x, z);
  const basin = 0.32 - 0.77 * Math.exp(-Math.pow(r / 0.91, 6));
  const hills = Math.max(0, -z - 5) * 0.034;
  const detail = Math.sin(x * 1.7 + z * 0.37) * 0.064 + Math.sin(z * 2.3 - x * 0.67) * 0.032;
  return basin + hills + detail * Math.min(1, r);
}

export const FOREST_LOOK = { yaw: 0.105, pitch: 0.057 };
export const FOREST_FEEL = { follow: 0.38, settle: 2.8 };

/** Preserve full native DPR on normal displays; cap only excessive pixel counts. */
export function forestPixelRatio(width: number, height: number, deviceRatio: number) {
  return Math.max(1, Math.min(2, deviceRatio || 1, Math.sqrt(4_200_000 / Math.max(1, width * height))));
}
