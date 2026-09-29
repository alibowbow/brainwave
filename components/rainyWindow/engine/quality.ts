export type QualityTier = 'high' | 'medium' | 'low';

export interface QualityProfile {
  /** Upper bound for the device pixel ratio used for rendering. */
  maxPixelRatio: number;
  /** MSAA samples for the HDR scene target. */
  msaa: number;
  /** Water-map texels per rendered pixel on the glass. */
  waterDensity: number;
  /** City backdrop resolution relative to the render resolution. */
  cityScale: number;
  /** Mirror the lit room in the window pane. */
  reflection: boolean;
  reflectionScale: number;
  shadowSize: number;
  /** Blocker-search and filter taps for the lamp's soft shadows. */
  shadowTaps: [number, number];
  textureScale: number;
  maxDrops: number;
  /** Upper bound for the water map, in texels. */
  maxWaterTexels: number;
  /** Depth-of-field gather taps; 0 disables it. */
  dofTaps: number;
}

export const QUALITY: Record<QualityTier, QualityProfile> = {
  high: { maxPixelRatio: 2, msaa: 4, waterDensity: 1.3, cityScale: 0.62, reflection: true, reflectionScale: 0.5, shadowSize: 2048, shadowTaps: [16, 32], textureScale: 1, maxDrops: 2600, maxWaterTexels: 5_000_000, dofTaps: 40 },
  medium: { maxPixelRatio: 1.6, msaa: 2, waterDensity: 1.0, cityScale: 0.52, reflection: false, reflectionScale: 0.4, shadowSize: 1536, shadowTaps: [10, 20], textureScale: 0.75, maxDrops: 1800, maxWaterTexels: 2_600_000, dofTaps: 24 },
  low: { maxPixelRatio: 1.25, msaa: 0, waterDensity: 0.8, cityScale: 0.45, reflection: false, reflectionScale: 0.35, shadowSize: 1024, shadowTaps: [8, 12], textureScale: 0.5, maxDrops: 1100, maxWaterTexels: 1_400_000, dofTaps: 0 },
};

/** WebGL implemented on the CPU: draw rarely and small so the device stays responsive. */
export const isSoftwareRenderer = (renderer = '') => /swiftshader|llvmpipe|software|microsoft basic/i.test(renderer);

export interface DeviceHints {
  renderer?: string;
  cores?: number;
  memory?: number;
  mobile?: boolean;
  maxTextureSize?: number;
}

/** Pick a starting tier; the dynamic resolution controller refines it at run time. */
export function detectTier(hints: DeviceHints): QualityTier {
  const renderer = (hints.renderer ?? '').toLowerCase();
  if (isSoftwareRenderer(renderer)) return 'low';
  const weakGpu = /mali-[gt]?[0-9]{2}\b|adreno \(tm\) [3-5][0-9]{2}\b|powervr|intel.*hd graphics [2-5][0-9]{2,3}\b/.test(renderer);
  if (weakGpu || (hints.memory !== undefined && hints.memory <= 3) || (hints.cores !== undefined && hints.cores <= 4 && hints.mobile)) return 'low';
  if (hints.mobile) return 'medium';
  if ((hints.maxTextureSize ?? 16384) < 8192) return 'medium';
  return 'high';
}

/**
 * Game-style dynamic resolution: watches the time between rendered frames and
 * trades pixels for a steady frame rate, with hysteresis so it never pumps.
 */
export class DynamicResolution {
  scale: number;
  private samples: number[] = [];
  private cooldown = 0;

  constructor(readonly min = 0.55, readonly max = 1, initial = 1) {
    this.scale = Math.min(max, Math.max(min, initial));
  }

  reset() {
    this.samples.length = 0;
    this.cooldown = 2;
  }

  /** Feed one frame interval in ms; returns true when `scale` changed. */
  update(frameMs: number, targetMs = 1000 / 60): boolean {
    if (!Number.isFinite(frameMs) || frameMs <= 0 || frameMs > 250) return false;
    this.samples.push(frameMs);
    if (this.samples.length < 40) return false;
    const sorted = [...this.samples].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    this.samples.length = 0;
    if (this.cooldown > 0) {
      this.cooldown--;
      return false;
    }
    if (median > targetMs * 1.3 && this.scale > this.min) {
      this.scale = Math.max(this.min, this.scale * Math.max(0.72, Math.sqrt(targetMs / median)));
      this.cooldown = 1;
      return true;
    }
    if (median < targetMs * 1.06 && this.scale < this.max) {
      this.scale = Math.min(this.max, this.scale * 1.07);
      this.cooldown = 3;
      return true;
    }
    return false;
  }
}
