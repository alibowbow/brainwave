import { describe, expect, it } from 'vitest';
import { getSoundOrigin } from './audioOptions';

describe('sound origin labels', () => {
  it('marks the two user recordings as real and all other sound layers as AI', () => {
    expect(getSoundOrigin('rain')).toBe('REAL');
    expect(getSoundOrigin('ruralCrickets')).toBe('REAL');
    expect(getSoundOrigin('stream')).toBe('AI');
    expect(getSoundOrigin('none')).toBeNull();
  });
});
