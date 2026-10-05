import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { disposeScene } from '../runtime';

describe('water-edge resource ownership', () => {
  it('disposes shared geometry/material/textures exactly once, including custom shader uniforms', () => {
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry();
    const texture = new THREE.DataTexture(new Uint8Array([128, 128, 128, 255]), 1, 1);
    const shaderTexture = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
    const standard = new THREE.MeshStandardMaterial({ map: texture, normalMap: texture });
    const shader = new THREE.ShaderMaterial({ uniforms: { uWater: { value: shaderTexture }, uRepeated: { value: texture } } });
    scene.add(new THREE.Mesh(geometry, [standard, shader]), new THREE.Mesh(geometry, standard));
    scene.background = texture;
    scene.environment = texture;
    const spies = [geometry, standard, shader, texture, shaderTexture].map(resource => vi.spyOn(resource, 'dispose'));
    disposeScene(scene);
    spies.forEach(spy => expect(spy).toHaveBeenCalledTimes(1));
    expect(scene.children).toHaveLength(0);
  });

  it('releases allocated directional-light shadow render targets', () => {
    const scene = new THREE.Scene();
    const light = new THREE.DirectionalLight();
    light.shadow.map = new THREE.WebGLRenderTarget(4, 4);
    const dispose = vi.spyOn(light.shadow.map, 'dispose');
    scene.add(light);
    disposeScene(scene);
    expect(dispose).toHaveBeenCalledTimes(1);
    expect(scene.children).toHaveLength(0);
  });
});
