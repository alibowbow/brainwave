import { describe, expect, it } from 'vitest';
import { DEFAULT_VISUAL_MODE, type VisualMode } from './types';

describe('session visual mode', () => {
  it('starts every session in nature view', () => {
    const mode: VisualMode = DEFAULT_VISUAL_MODE;
    expect(mode).toBe('nature');
  });
});
