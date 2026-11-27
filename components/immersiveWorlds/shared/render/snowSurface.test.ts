import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { applyTranslucency } from './translucentSurface';
import { applySnowCover, createSnowMaterial } from './snowSurface';
import { createSnowfall } from './snowFall';
import { createRockMaterial } from './rockSurface';

/** Runs a material's onBeforeCompile against the real three.js physical shader source. */
function compile(material: THREE.Material) {
  const shader = {
    uniforms: {} as Record<string, THREE.IUniform>,
    vertexShader: THREE.ShaderLib.physical.vertexShader,
    fragmentShader: THREE.ShaderLib.physical.fragmentShader,
  } as THREE.WebGLProgramParametersWithUniforms;
  material.onBeforeCompile(shader, {} as THREE.WebGLRenderer);
  return shader;
}
const count = (source: string, needle: string) => source.split(needle).length - 1;

describe('translucent surface', () => {
  it('wraps the physical direct-light term and declares the shared noise once', () => {
    const material = applyTranslucency(new THREE.MeshPhysicalMaterial(), { key: 'test', color: '#ff8866', thickness: 'translucentThin = .5;' });
    const shader = compile(material);
    expect(shader.fragmentShader).toContain('#define RE_Direct RE_Direct_Translucent');
    expect(shader.fragmentShader).toContain('translucentThin = .5;');
    expect(count(shader.fragmentShader, 'uvec3 bwPcg3')).toBe(1);
    expect(shader.vertexShader).toContain('vTranslucentWorld = (modelMatrix * tlLocal).xyz;');
    expect(shader.uniforms.uTlColor).toBeDefined();
    expect(material.customProgramCacheKey()).toContain('bw-translucent-v1|test');
  });
});

describe('snow surface', () => {
  it('layers glints over the translucent wrap, declared after it and before main', () => {
    const shader = compile(createSnowMaterial({ key: 'ground', trodden: 'p.x' }));
    const source = shader.fragmentShader;
    expect(source.indexOf('void RE_Direct_Translucent')).toBeLessThan(source.indexOf('void RE_Direct_Snow'));
    expect(source.indexOf('void RE_Direct_Snow')).toBeLessThan(source.indexOf('void main() {'));
    expect(source).toContain('#define RE_Direct RE_Direct_Snow');
    expect(source).toContain('snowTrodden = clamp(p.x, 0.0, 1.0);');
    expect(count(source, 'uvec3 bwPcg3')).toBe(1);
    // Every anchor the hooks rely on must still exist in this three.js version.
    for (const anchor of ['#include <color_fragment>', '#include <roughnessmap_fragment>', '#include <normal_fragment_maps>', '#include <lights_fragment_end>']) {
      expect(THREE.ShaderLib.physical.fragmentShader).toContain(anchor);
    }
  });

  it('adds normal-based cover on top of other world-space materials without redeclaring noise', () => {
    const rock = applySnowCover(createRockMaterial('#777777', { key: 'rock' }), { key: 'rock-cover', threshold: .6 });
    const shader = compile(rock);
    expect(count(shader.fragmentShader, 'uvec3 bwPcg3')).toBe(1);
    expect(shader.fragmentShader).toContain('snowCover = smoothstep(0.60000, 0.80000');
    expect(rock.customProgramCacheKey()).toContain('bw-snow-cover-v1|rock-cover');
  });
});

describe('GPU snowfall', () => {
  it('builds one Points draw per layer, deterministic and static at time zero', () => {
    const options = {
      seed: 5, keyDirection: new THREE.Vector3(0, -1, 0), keyColor: new THREE.Color(.1, .1, .1), ambient: new THREE.Color(.02, .02, .03),
      layers: [
        { count: 300, min: new THREE.Vector3(-5, 0, -10), max: new THREE.Vector3(5, 6, 0), size: [.02, .03] as [number, number], speed: [.4, .7] as [number, number] },
        { count: 40, min: new THREE.Vector3(-2, 0, -2), max: new THREE.Vector3(2, 3, 0), size: [.03, .04] as [number, number], speed: [.3, .5] as [number, number], softness: .8 },
      ],
    };
    const a = createSnowfall(options), b = createSnowfall(options);
    expect(a.group.children).toHaveLength(2);
    const seeds = (points: THREE.Object3D) => Array.from(((points as THREE.Points).geometry.getAttribute('seed').array as Float32Array).slice(0, 12));
    expect(seeds(a.group.children[0])).toEqual(seeds(b.group.children[0]));
    const material = (a.group.children[0] as THREE.Points).material as THREE.ShaderMaterial;
    expect(material.uniforms.uTime.value).toBe(0);
    a.update(3.5);
    expect(material.uniforms.uTime.value).toBe(3.5);
    // No CPU-side position updates: the position buffer only sizes the draw.
    expect(((a.group.children[0] as THREE.Points).geometry.getAttribute('position').array as Float32Array).every((v) => v === 0)).toBe(true);
  });
});
