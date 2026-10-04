/** Measured frame pressure, sampled only while the scene's RAF loop is running. */
export interface CosmicQualityState {
  quality: 1 | 0.8;
  slowFor: number;
  fastFor: number;
  reflectionSize: 1024 | 768;
}

export function createCosmicQualityState(): CosmicQualityState {
  return { quality: 1, slowFor: 0, fastFor: 0, reflectionSize: 1024 };
}

/**
 * Slow pressure accumulates and fast frames gradually remove it; this is not a
 * consecutive-frame timer. Intermediate frames and long scheduling gaps leave
 * both counters unchanged. Pause/hidden/reduced-motion do not sample or reset
 * this state. A newly constructed engine starts with createCosmicQualityState.
 */
export function advanceCosmicQuality(
  state: Readonly<CosmicQualityState>,
  rawDt: number,
): CosmicQualityState {
  let { quality, slowFor, fastFor, reflectionSize } = state;
  if (rawDt > 0.034 && rawDt < 0.5) {
    slowFor += rawDt;
    fastFor = 0;
  } else if (rawDt > 0 && rawDt < 0.022) {
    fastFor += rawDt;
    slowFor = Math.max(0, slowFor - rawDt);
  }
  if (slowFor > 8 && quality > 0.8) {
    quality = 0.8;
    slowFor = 0;
    reflectionSize = 768;
  }
  if (fastFor > 24 && quality < 1) {
    quality = 1;
    fastFor = 0;
    reflectionSize = 1024;
  }
  return { quality, slowFor, fastFor, reflectionSize };
}
