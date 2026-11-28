import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { buildTree, concatGeometries, loftTube } from './treeGeometry';
import { applyFoliageShading, crownCanopy, layerCanopy } from './foliageShading';
import { applyBarkSurface } from './barkSurface';

const finite = (g: THREE.BufferGeometry) => Object.values(g.attributes).every(attribute => Array.from(attribute.array as Float32Array).every(Number.isFinite));

describe('procedural trees', () => {
  const options = {
    seed: 3, base: new THREE.Vector3(1, 0, -2), height: 8, radius: 0.25, form: 'broadleaf' as const,
    displace: 0.01, flare: 0.6, buttresses: 4, leaves: { cardsPerTwig: 6, size: 0.8 },
  };

  it('is deterministic and keeps bark, wind and leaf attributes aligned', () => {
    const a = buildTree(options), b = buildTree(options);
    expect(Array.from(a.bark.attributes.position.array)).toEqual(Array.from(b.bark.attributes.position.array));
    for (const geometry of [a.bark, a.leaves!]) {
      const count = geometry.attributes.position.count;
      expect(geometry.attributes.aWind.count).toBe(count);
      expect(geometry.attributes.aWindPhase.count).toBe(count);
      expect(finite(geometry)).toBe(true);
      expect(Math.max(...Array.from(geometry.index!.array))).toBeLessThan(count);
    }
    expect(a.bark.attributes.aBark.count).toBe(a.bark.attributes.position.count);
    a.bark.computeBoundingBox();
    expect(a.bark.boundingBox!.min.y).toBeGreaterThan(-0.5);
    expect(a.bark.boundingBox!.max.y).toBeLessThan(options.height * 1.4);
    expect(a.tips.length).toBeGreaterThan(5);
    expect(a.crown.radius.x).toBeGreaterThan(0.3);
    // The root flare widens the base beyond the trunk radius.
    const position = a.bark.attributes.position;
    let baseReach = 0;
    for (let i = 0; i < position.count; i++) if (position.getY(i) < 0.05) baseReach = Math.max(baseReach, Math.hypot(position.getX(i) - 1, position.getZ(i) + 2));
    expect(baseReach).toBeGreaterThan(options.radius * 1.3);
  });

  it('keeps the trunk still and lets branch tips and leaves sway', () => {
    const tree = buildTree(options);
    const wind = tree.bark.attributes.aWind as THREE.BufferAttribute, position = tree.bark.attributes.position;
    for (let i = 0; i < position.count; i++) if (position.getY(i) < 0.1) expect(wind.getX(i) + wind.getY(i)).toBeLessThan(0.01);
    const leafWind = tree.leaves!.attributes.aWind as THREE.BufferAttribute;
    expect(Math.max(...Array.from(leafWind.array as Float32Array))).toBeGreaterThan(0.2);
  });

  it('lofts tubes with the same layout and concatenates with offset indices', () => {
    const tube = loftTube([new THREE.Vector3(0, 1, 0), new THREE.Vector3(1, 0.5, 0), new THREE.Vector3(2, 0, 0.5)], [0.3, 0.2, 0.05], { radial: 8, ringsPerMetre: 4, displace: 0.01 });
    const tree = buildTree({ ...options, leaves: null });
    expect(Object.keys(tube.attributes).sort()).toEqual(Object.keys(tree.bark.attributes).sort());
    const merged = concatGeometries([tree.bark, tube]);
    expect(merged.attributes.position.count).toBe(tree.bark.attributes.position.count + tube.attributes.position.count);
    expect(merged.index!.count).toBe(tree.bark.index!.count + tube.index!.count);
    expect(Math.max(...Array.from(merged.index!.array))).toBe(merged.attributes.position.count - 1);
    expect(finite(merged)).toBe(true);
  });
});

describe('foliage shading hooks', () => {
  const compile = (material: THREE.Material) => {
    const shader = { uniforms: {}, vertexShader: THREE.ShaderLib.physical.vertexShader, fragmentShader: THREE.ShaderLib.physical.fragmentShader } as unknown as THREE.WebGLProgramParametersWithUniforms;
    material.onBeforeCompile(shader, {} as THREE.WebGLRenderer);
    return shader;
  };

  it('injects world position, canopy sun, wind and translucency into the lit program', () => {
    const time = { value: 0 };
    const canopy = layerCanopy({ key: 'test', toSun: new THREE.Vector3(0.3, 0.8, -0.2), height: 12, scale: 0.1, cover: 0.2, time, clearings: [{ target: new THREE.Vector3(0, 1, 0), radius: 2 }] });
    const material = applyFoliageShading(applyBarkSurface(new THREE.MeshStandardMaterial(), { key: 'test', moss: { color: '#456622', amount: 0.5 } }), {
      key: 'test', canopy, wind: { time, mode: 'attribute', sway: 0.3, flutter: 0.02 }, translucency: { tint: '#ffffff', back: 0.5, forward: 1 }, sharedNormals: true, coverage: true,
    });
    const shader = compile(material);
    const main = shader.fragmentShader.search(/void\s+main/);
    expect(shader.vertexShader).toContain('bwWindOffset(');
    expect(shader.vertexShader).toContain('attribute vec3 aWind;');
    expect(shader.vertexShader).not.toContain('#include <project_vertex>');
    expect(shader.fragmentShader).toContain('directLight.color *= bwSun;');
    expect(shader.fragmentShader).toContain('bwForward');
    expect(shader.fragmentShader).toContain('barkBump(');
    expect(shader.fragmentShader.indexOf('float bwCanopy(vec3 p)')).toBeLessThan(main);
    // Noise is included once even with two hooks on one program.
    expect(shader.fragmentShader.match(/uvec3 bwPcg3/g)).toHaveLength(1);
    expect(shader.uniforms.uBwTime).toBe(time);
    expect((shader.uniforms.uBwClearing.value as THREE.Vector4[])[0].w).toBe(1);
    expect(material.customProgramCacheKey()).toContain('bw-foliage-v1');
    expect(material.customProgramCacheKey()).toContain('bw-bark-v1');
  });

  it('pads crown canopies and scales attenuation by crown size', () => {
    const canopy = crownCanopy({ key: 'garden', toSun: new THREE.Vector3(0, 1, 0), crowns: [{ centre: new THREE.Vector3(0, 5, 0), radius: new THREE.Vector3(2, 1.5, 2) }], density: 1, gaps: 0.1, time: { value: 0 } });
    expect(canopy.glsl).toContain('#define BW_CROWNS 1');
    expect((canopy.uniforms.uBwCrownRadius.value as THREE.Vector4[])[0].y).toBe(1.5);
  });
});
