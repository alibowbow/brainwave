import { describe, expect, it } from 'vitest';
import { WoodsGesture } from './gesture';

describe('living woods gestures', () => {
  it('accepts an unmoved short tap only for its pointer', () => {
    const g = new WoodsGesture();
    expect(g.begin(1, 10, 20, 0)).toBe(true);
    expect(g.begin(2, 10, 20, 0)).toBe(false);
    expect(g.end(2, 10, 20, 100)).toBe(false);
    expect(g.end(1, 14, 21, 120)).toBe(true);
  });
  it('does not mistake a returning drag, long press or cancelled pointer for a tap', () => {
    const g = new WoodsGesture();
    g.begin(1, 0, 0, 0); g.move(1, 60, 0);
    expect(g.end(1, 0, 0, 200)).toBe(false);
    g.begin(1, 0, 0, 0); expect(g.end(1, 0, 0, 900)).toBe(false);
    g.begin(1, 0, 0, 0); g.cancel(1);
    expect(g.end(1, 0, 0, 100)).toBe(false);
    expect(g.move(1, 20, 20)).toBe(null);
  });
});
