import { it } from 'vitest';
import { writeFileSync } from 'node:fs';
import { oliveSprayAtlas, cypressSprayAtlas, meadowAtlas } from './gardenPaint';
it('atlas', () => {
  for (const [name, make] of [['olive', () => oliveSprayAtlas(11)], ['cypress', () => cypressSprayAtlas(5)], ['meadow', () => meadowAtlas(7)]] as const) {
    const t0 = performance.now();
    const tex = make();
    const ms = performance.now() - t0;
    const img = tex.image as { data: Uint8Array; width: number; height: number };
    writeFileSync(`/tmp/claude-0/powernap-captures/atlas/${name}.raw`, img.data);
    writeFileSync(`/tmp/claude-0/powernap-captures/atlas/${name}.json`, JSON.stringify({ w: img.width, h: img.height, ms }));
    console.log(name, img.width, img.height, ms.toFixed(0), 'ms');
  }
}, 120000);
