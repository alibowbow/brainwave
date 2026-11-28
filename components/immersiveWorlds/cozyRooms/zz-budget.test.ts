import { it } from 'vitest';
import * as THREE from 'three';
import { createNapTerraceWorld } from './napTerrace';
it('budget', () => {
  const t0 = performance.now();
  const world = createNapTerraceWorld();
  const t1 = performance.now();
  world.resize(1.6); world.update(8, 0);
  const groups = new Map<string, { tris: number; calls: number; shadow: number }>();
  let total = 0, shadow = 0, calls = 0;
  world.scene.traverse(o => {
    const m = o as THREE.Mesh; if (!m.isMesh) return;
    const g = m.geometry; const n = (g.index ? g.index.count : g.attributes.position.count) / 3;
    const inst = (m as THREE.InstancedMesh).isInstancedMesh ? (m as THREE.InstancedMesh).count : 1;
    const tri = n * inst; total += tri; calls++; if (m.castShadow) shadow += tri;
    const key = m.name || 'terrace-misc';
    const e = groups.get(key) ?? { tris: 0, calls: 0, shadow: 0 };
    e.tris += tri; e.calls++; if (m.castShadow) e.shadow += tri; groups.set(key, e);
  });
  const rows = [...groups.entries()].sort((a, b) => b[1].tris - a[1].tris);
  console.log(rows.map(([k, v]) => `${k.padEnd(24)} tris=${v.tris} calls=${v.calls} shadow=${v.shadow}`).join('\n'));
  console.log('meshes', calls, 'total', total, 'shadowCasters', shadow, 'build ms', (t1 - t0).toFixed(0));
}, 120000);
