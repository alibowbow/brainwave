export const frames = [
  { name: 'phone_1x2', aspect: .5, lens: 24, targetHeight: 1.02 },
  { name: 'tablet_3x4', aspect: .75, lens: 27, targetHeight: 1.1 },
  { name: 'fold_square', aspect: 1, lens: 30, targetHeight: 1.05 },
  { name: 'desktop_16x9', aspect: 16 / 9, lens: 38, targetHeight: .95 },
  { name: 'wide_2x1', aspect: 2, lens: 42, targetHeight: .9 },
] as const;
export function selectFrame(aspect: number) {
  const value = Number.isFinite(aspect) && aspect > 0 ? aspect : 1;
  return frames.reduce((best, row) => Math.abs(Math.log(value / row.aspect)) < Math.abs(Math.log(value / best.aspect)) ? row : best);
}
export function fittedFov(lens: number, referenceAspect: number, aspect: number) {
  // Cover the actual canvas without stretching the authored Cycles composition.
  const tangent = 18 / lens;
  return 2 * Math.atan(tangent * Math.min(1, referenceAspect / Math.max(.01, aspect))) * 180 / Math.PI;
}
