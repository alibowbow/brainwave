import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createWaterfall, fallSurge } from './waterfall';
import type { WorldContent } from './types';

describe('waterfall spatial contract', () => {
  let world: WorldContent;
  beforeAll(() => {
    // The scene factory creates CPU geometry/render targets; no WebGL context or real renderer is used here.
    const renderer = { domElement: { height: 800 } } as unknown as THREE.WebGLRenderer;
    world = createWaterfall(renderer);
    world.scene.updateMatrixWorld(true);
  });
  afterAll(() => {
    world.dispose?.();
    const geometry = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    world.scene.traverse(object => {
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) geometry.add(mesh.geometry);
      if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(m => materials.add(m));
    });
    geometry.forEach(item => item.dispose());
    materials.forEach(item => item.dispose());
  });

  it('has finite spatial geometry and finite portrait/landscape projections', () => {
    let inspected = 0;
    world.scene.traverse(object => {
      const geometry = (object as THREE.Mesh).geometry;
      if (!geometry) return;
      for (const attribute of Object.values(geometry.attributes)) {
        const values = attribute.array;
        let finite = true;
        for (let i = 0; i < values.length; i++) if (!Number.isFinite(values[i])) { finite = false; break; }
        expect(finite).toBe(true);
      }
      inspected++;
    });
    expect(inspected).toBeGreaterThan(0);
    for (const aspect of [390 / 844, 1280 / 800, 883 / 712]) {
      world.resize?.(aspect);
      expect(world.camera.projectionMatrix.elements.every(Number.isFinite)).toBe(true);
      expect(world.camera.position.y).toBeGreaterThan(0);
    }
    world.resize?.(1280 / 800);
    world.scene.updateMatrixWorld(true);
  });

  it('animates its water from the clock alone, within a phone-sized particle budget', () => {
    let instances = 0;
    const versions = new Map<THREE.BufferAttribute | THREE.InterleavedBufferAttribute, number>();
    world.scene.traverse(object => {
      const geometry = (object as THREE.Mesh).geometry;
      if (!geometry) return;
      if (geometry instanceof THREE.InstancedBufferGeometry) instances += geometry.instanceCount;
      Object.values(geometry.attributes).forEach(attribute => versions.set(attribute, (attribute as THREE.BufferAttribute).version));
    });
    // Spray streaks and mist billows: hundreds to low thousands, never more.
    expect(instances).toBeGreaterThan(500);
    expect(instances).toBeLessThanOrEqual(3000);
    world.update(1.5, 1 / 60);
    world.update(7.25, 1 / 60);
    // Frames change uniforms only; no buffer is rewritten on the CPU.
    versions.forEach((version, attribute) => expect((attribute as THREE.BufferAttribute).version).toBe(version));
    for (let t = 0; t < 600; t += .37) {
      const surge = fallSurge(t);
      expect(surge).toBeGreaterThanOrEqual(0);
      expect(surge).toBeLessThanOrEqual(1);
    }
  });

  it('keeps the falling water in front of the cliff it pours from', () => {
    const curtains = world.scene.getObjectByName('waterfall-curtains') as THREE.Mesh;
    const cliff = world.scene.children.find(object => (object as THREE.Mesh).isMesh && ((object as THREE.Mesh).geometry.attributes.position?.count ?? 0) > 30000)!;
    expect(curtains).toBeTruthy();
    expect(cliff).toBeTruthy();
    const position = curtains.geometry.attributes.position, edge = curtains.geometry.attributes.aEdge;
    const ray = new THREE.Raycaster();
    const point = new THREE.Vector3(), toCamera = new THREE.Vector3();
    let checked = 0, buried = 0;
    // A prime stride samples every sheet, row and column without bias.
    for (let i = 0; i < position.count; i += 61) {
      // Skip the first half metre below each lip, where water leaves the rock.
      if (edge.getZ(i) < .5) continue;
      point.fromBufferAttribute(position, i);
      toCamera.subVectors(world.camera.position, point);
      const distance = toCamera.length();
      ray.set(point, toCamera.normalize());
      ray.far = distance;
      if (ray.intersectObject(cliff, false).length) buried++;
      checked++;
    }
    expect(checked).toBeGreaterThan(100);
    expect(buried / checked).toBeLessThan(.03);
  }, 60_000);

  it('shades the pool with the animated waterfall surface on shared uniforms', () => {
    const pool = world.scene.getObjectByName('deepwater-reflective-pool') as THREE.Mesh;
    const material = pool.material as THREE.ShaderMaterial;
    expect(material.fragmentShader).toContain('bedDepth');
    expect(material.uniforms.tWater.value).toBeInstanceOf(THREE.DataTexture);
    const before = material.uniforms.uSurge.value;
    world.update(3.3, 1 / 60);
    expect(material.uniforms.uSurge.value).toBe(fallSurge(3.3));
    expect(material.uniforms.time.value).toBe(3.3);
    world.update(before, 1 / 60);
  });

  it('accepts a visible pool ray but rejects water behind the near stone shelf', () => {
    function rayTo(x: number, z: number) {
      const origin = world.camera.position.clone();
      return new THREE.Raycaster(origin, new THREE.Vector3(x, .025, z).sub(origin).normalize());
    }
    const event = world.interact?.(rayTo(0, -3), 1);
    expect(event).toMatchObject({ world: 'waterfall', kind: 'pool-ripple' });
    expect(event?.strength).toBeLessThanOrEqual(.3);
    expect(world.interact?.(rayTo(-2.8, 4.5), 2)).toBeNull();
    // The factory itself rejects repeated impulses even if a caller omits the host's rate limiter.
    expect(world.interact?.(rayTo(0, -3), 1.1)).toBeNull();
  });
});
