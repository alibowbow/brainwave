import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createRainLayer, createRainSplashes, createRunoff } from './rainStreaks';
import { applyWetSurface } from './wetSurface';
import { createRockMaterial } from './rockSurface';

const fakeShader = () => ({
  uniforms: {} as Record<string, THREE.IUniform>,
  vertexShader: '#include <common>\nvoid main() {\n#include <beginnormal_vertex>\n#include <worldpos_vertex>\n}',
  fragmentShader: 'uniform vec3 diffuse;\nvarying vec3 vViewPosition;\n#include <common>\nvoid main() {\n#include <color_fragment>\n#include <roughnessmap_fragment>\n#include <metalnessmap_fragment>\n#include <normal_fragment_maps>\n#include <emissivemap_fragment>\n}',
});

describe('GPU rain', () => {
  it('draws a whole layer as one instanced quad set animated from a shared clock', () => {
    const time = { value: 0 };
    const layer = createRainLayer({ count: 500, min: new THREE.Vector3(-1, 0, -5), max: new THREE.Vector3(1, 4, -2), time, radiance: new THREE.Color(1, 1, 1), boost: 2 });
    const geometry = layer.mesh.geometry as THREE.InstancedBufferGeometry;
    expect(geometry.instanceCount).toBe(500);
    expect(geometry.attributes.aSeed.count).toBe(500);
    expect(layer.material.uniforms.uTime).toBe(time);
    expect(layer.material.uniforms.uRadiance.value.r).toBeCloseTo(2);
    layer.setBoost(1);
    expect(layer.material.uniforms.uRadiance.value.r).toBeCloseTo(1);
    layer.setViewHeight(0);
    expect(layer.material.uniforms.uViewHeight.value).toBe(1);
    layer.dispose();
  });

  it('uses gravity drips only when asked and keeps splashes and runoff transparent', () => {
    const time = { value: 0 };
    const drips = createRainLayer({ count: 4, gravity: true, min: new THREE.Vector3(), max: new THREE.Vector3(1, 2, 0.1), time });
    expect(drips.material.defines).toHaveProperty('RAIN_GRAVITY');
    const splashes = createRainSplashes({ points: [0, 0, 0, 1, 0, 1], time });
    expect((splashes.mesh.geometry as THREE.InstancedBufferGeometry).instanceCount).toBe(2);
    const runoff = createRunoff([{ top: new THREE.Vector3(0, 2, 0), bottom: new THREE.Vector3(0, 0, 0), width: 0.02 }], { time });
    expect(runoff.mesh.geometry.index!.count).toBe(6);
    for (const mesh of [splashes.mesh, runoff.mesh, drips.mesh]) {
      expect((mesh.material as THREE.ShaderMaterial).transparent).toBe(true);
      expect((mesh.material as THREE.ShaderMaterial).depthWrite).toBe(false);
    }
    [drips, splashes, runoff].forEach(item => item.dispose());
  });
});

describe('wet surfaces', () => {
  it('declares its noise once, after an earlier patch, and keys the program', () => {
    const time = { value: 0 };
    const material = applyWetSurface(createRockMaterial('#777777', { key: 'test-rock' }), { key: 'test-wet', time, puddles: 0.5 });
    const shader = fakeShader();
    material.onBeforeCompile(shader as unknown as THREE.WebGLProgramParametersWithUniforms, {} as THREE.WebGLRenderer);
    expect(shader.uniforms.uWetTime).toBe(time);
    expect(shader.fragmentShader.match(/uvec3 bwPcg3/g)).toHaveLength(1);
    expect(shader.fragmentShader.indexOf('wetRippleGradient(vec2')).toBeGreaterThan(shader.fragmentShader.indexOf('uvec3 bwPcg3'));
    expect(shader.fragmentShader).toContain('wetPuddle');
    expect(material.customProgramCacheKey()).toContain('test-wet');
    expect(material.customProgramCacheKey()).toContain('test-rock');
  });
});
