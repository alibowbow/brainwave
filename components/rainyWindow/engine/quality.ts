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

// Pixel ratios stay below typical device ratios: the image is soft by design
// (bloom, depth of field, grain), so extra pixels cost far more than they show.
export const QUALITY: Record<QualityTier, QualityProfile> = {
  high: { maxPixelRatio: 1.5, msaa: 4, waterDensity: 1.2, cityScale: 0.6, reflection: true, reflectionScale: 0.4, shadowSize: 2048, shadowTaps: [12, 24], textureScale: 1, maxDrops: 2600, maxWaterTexels: 4_000_000, dofTaps: 32 },
  medium: { maxPixelRatio: 1.3, msaa: 2, waterDensity: 1.0, cityScale: 0.5, reflection: false, reflectionScale: 0.35, shadowSize: 1536, shadowTaps: [8, 16], textureScale: 0.75, maxDrops: 1800, maxWaterTexels: 2_000_000, dofTaps: 20 },
  low: { maxPixelRatio: 1, msaa: 0, waterDensity: 0.8, cityScale: 0.45, reflection: false, reflectionScale: 0.3, shadowSize: 1024, shadowTaps: [6, 10], textureScale: 0.5, maxDrops: 1100, maxWaterTexels: 1_200_000, dofTaps: 0 },
};

/** Small pixels alias little, so dense screens get by with fewer MSAA samples. */
export const samplesFor = (profile: QualityProfile, pixelRatio: number) => (pixelRatio > 1.2 ? Math.min(profile.msaa, 2) : profile.msaa);

/** WebGL implemented on the CPU: draw rarely and small so the device stays responsive. */
export const isSoftwareRenderer = (renderer = '') => /swiftshader|llvmpipe|software|microsoft basic/i.test(renderer);

export interface DeviceHints {
  renderer?: string;
  cores?: number;
  memory?: number;
  mobile?: boolean;
  maxTextureSize?: number;
}

/** Pick a starting tier; the frame pacer refines it at run time. */
export function detectTier(hints: DeviceHints): QualityTier {
  const renderer = (hints.renderer ?? '').toLowerCase();
  if (isSoftwareRenderer(renderer)) return 'low';
  const weakGpu = /mali-[gt]?[0-9]{2}\b|adreno \(tm\) [3-5][0-9]{2}\b|powervr|intel.*hd graphics [2-5][0-9]{2,3}\b/.test(renderer);
  if (weakGpu || (hints.memory !== undefined && hints.memory <= 3) || (hints.cores !== undefined && hints.cores <= 4 && hints.mobile)) return 'low';
  if (hints.mobile) return 'medium';
  // Integrated laptop graphics share memory bandwidth with the CPU.
  const integrated = (/intel/.test(renderer) && !/\barc\b/.test(renderer)) || /radeon\(tm\) graphics|radeon vega|vega \d+ graphics/.test(renderer);
  if (integrated) return 'medium';
  if ((hints.maxTextureSize ?? 16384) < 8192) return 'medium';
  return 'high';
}

/** Phones and tablets, including iPads that present themselves as desktop Safari. */
export function isMobileDevice(userAgent: string, touchPoints = 0, mobileHint?: boolean) {
  if (mobileHint !== undefined) return mobileHint;
  return /Android|iPhone|iPad|Mobile/i.test(userAgent) || (/Macintosh/.test(userAgent) && touchPoints > 1);
}

/**
 * Game-style frame pacing: watches the time between rendered frames and first
 * trades pixels for a steady 60 fps; if even the reduced resolution cannot
 * hold it, settles into a steady 30 fps at full resolution rather than
 * stuttering. Hysteresis keeps it from pumping.
 */
export class DynamicResolution {
  scale: number;
  /** Frames per second the loop aims for. */
  rate: 60 | 30 = 60;
  private samples: number[] = [];
  private cooldown = 0;

  constructor(readonly min = 0.55, readonly max = 1, initial = 1, readonly fastMin = 0.72) {
    this.scale = Math.min(max, Math.max(min, initial));
  }

  reset() {
    this.samples.length = 0;
    this.cooldown = 2;
  }

  /** Feed one frame interval in ms; returns true when `scale` or `rate` changed. */
  update(frameMs: number): boolean {
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
    const targetMs = 1000 / this.rate;
    // 1.4 keeps a 90 Hz display (a frame every 22 ms) from reading as late.
    if (median > targetMs * 1.4) {
      const floor = this.rate === 60 ? Math.max(this.min, this.fastMin) : this.min;
      if (this.scale > floor + 1e-6) {
        this.scale = Math.max(floor, this.scale * Math.max(0.72, Math.sqrt(targetMs / median)));
        this.cooldown = 1;
        return true;
      }
      if (this.rate === 60) {
        this.rate = 30;
        this.scale = this.max;
        this.cooldown = 2;
        return true;
      }
      return false;
    }
    if (median < targetMs * 1.06 && this.scale < this.max) {
      this.scale = Math.min(this.max, this.scale * 1.07);
      this.cooldown = 3;
      return true;
    }
    return false;
  }
}
