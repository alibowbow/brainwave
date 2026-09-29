/**
 * The painting is composed once on a 16:9 canvas ("design space": y from 0 at
 * the bottom to 1 at the top, x from 0 to 16/9) after a clifftop view of a
 * bay at sunset: sun low on the left, surf rolling in to a curving beach, a
 * wind-bent pine on the grassy cliff at the right. Other screens see a crop of
 * it that keeps the surf, the beach and the pine; the sun and the pine move
 * to stay inside narrow crops.
 */
export const DESIGN_WIDTH = 16 / 9;

export interface SeaLayout {
  /** Left edge and width of the view in design space (the view is always the full design height). */
  cropLeft: number;
  cropWidth: number;
  horizon: number;
  sunX: number;
  sunY: number;
  /** Where the pine's trunk meets the cliff, and its size. */
  treeX: number;
  treeY: number;
  treeScale: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Horizontal centre of interest: the surf breaking onto the beach. */
const FOCUS_X = 1.02;

export function seaLayout(aspect: number): SeaLayout {
  const width = clamp(Number.isFinite(aspect) ? aspect : 1, 0.35, 3.2);
  const cropLeft = width >= DESIGN_WIDTH
    ? (DESIGN_WIDTH - width) / 2
    : clamp(FOCUS_X - width * 0.45, 0, DESIGN_WIDTH - width);
  const wide = smoothstep(0.5, 1.5, width);
  const horizon = 0.745;
  return {
    cropLeft,
    cropWidth: width,
    horizon,
    sunX: cropLeft + Math.max(0.05, width * 0.06),
    sunY: horizon + 0.075,
    treeX: cropLeft + width * lerp(0.93, 0.9, wide),
    treeY: 0.2,
    treeScale: lerp(0.56, 0.86, wide),
  };
}

/** The largest paint surface drawn; beyond it the browser scales the canvas (the painting is soft anyway). */
export const MAX_PAINT_PIXELS = 1_700_000;

export function paintSize(cssWidth: number, cssHeight: number, devicePixelRatio: number, maxPixelRatio: number) {
  let ratio = Math.min(Math.max(1, devicePixelRatio || 1), maxPixelRatio);
  const pixels = cssWidth * cssHeight * ratio * ratio;
  if (pixels > MAX_PAINT_PIXELS) ratio *= Math.sqrt(MAX_PAINT_PIXELS / pixels);
  return {
    width: Math.max(2, Math.round(cssWidth * ratio)),
    height: Math.max(2, Math.round(cssHeight * ratio)),
  };
}
