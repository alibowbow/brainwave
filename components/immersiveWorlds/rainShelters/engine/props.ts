import * as THREE from 'three';
import { limbGeometry } from './geometry';

/**
 * A small paraffin storm lantern: lathed brass fount, glass chimney, wire
 * guards, a vented cap and an HDR flame that drives bloom. The point light
 * casts a static soft shadow (re-rendered only when the lantern moves).
 */
export function createLantern(options: { intensity: number; color?: THREE.ColorRepresentation; distance?: number }) {
  const group = new THREE.Group();
  const brass = new THREE.MeshStandardMaterial({ color: '#8a6a3a', metalness: 0.9, roughness: 0.34 });
  const blackened = new THREE.MeshStandardMaterial({ color: '#1d1c1a', metalness: 0.6, roughness: 0.45 });
  const glass = new THREE.MeshPhysicalMaterial({
    color: '#fff3dc', transparent: true, opacity: 0.16, roughness: 0.04, metalness: 0, side: THREE.DoubleSide, depthWrite: false,
    emissive: new THREE.Color(0.9, 0.55, 0.25), emissiveIntensity: 0.18,
  });
  const add = (geometry: THREE.BufferGeometry, material: THREE.Material, castShadow = false) => {
    const mesh = new THREE.Mesh(geometry, material); mesh.castShadow = castShadow; group.add(mesh); return mesh;
  };
  const lathe = (profile: [number, number][]) => new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), 40);
  add(lathe([[0, 0], [0.13, 0], [0.15, 0.012], [0.155, 0.04], [0.14, 0.075], [0.1, 0.09], [0.06, 0.095], [0, 0.096]]), brass, true);
  add(lathe([[0.06, 0.095], [0.07, 0.1], [0.072, 0.115], [0.055, 0.12]]), blackened);
  add(lathe([[0.075, 0.12], [0.098, 0.16], [0.104, 0.22], [0.094, 0.29], [0.072, 0.335]]), glass);
  // The vented cap lets light through, so it casts no hard umbra.
  add(lathe([[0.0, 0.33], [0.13, 0.335], [0.135, 0.35], [0.11, 0.37], [0.06, 0.4], [0.03, 0.43], [0.0, 0.435]]), blackened);
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + 0.4;
    add(limbGeometry([new THREE.Vector3(Math.cos(a) * 0.118, 0.1, Math.sin(a) * 0.118), new THREE.Vector3(Math.cos(a) * 0.125, 0.22, Math.sin(a) * 0.125), new THREE.Vector3(Math.cos(a) * 0.112, 0.335, Math.sin(a) * 0.112)], 0.005, 0.005, 5, 10), blackened);
  }
  add(limbGeometry(Array.from({ length: 16 }, (_, i) => { const a = i / 15 * Math.PI; return new THREE.Vector3(Math.cos(a) * 0.135, 0.43 + Math.sin(a) * 0.15, 0); }), 0.0045, 0.0045, 5, 30), blackened);
  const flame = add(new THREE.SphereGeometry(0.018, 16, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.62, 0.26).multiplyScalar(22) }));
  flame.scale.set(0.8, 2.1, 0.8); flame.position.y = 0.19;
  const light = new THREE.PointLight(options.color ?? '#ffa456', options.intensity, options.distance ?? 7, 2);
  // A flame is not a point: a coarse map with wide filtering keeps every shadow soft-edged.
  light.castShadow = true; light.shadow.mapSize.set(256, 256); light.shadow.bias = -0.003; light.shadow.radius = 10; light.shadow.camera.near = 0.02;
  light.shadow.autoUpdate = false; light.shadow.needsUpdate = true;
  const base = options.intensity;
  return {
    group, light, flame,
    /** Place the lantern (its foot) and its light in world space. */
    place(x: number, y: number, z: number) {
      group.position.set(x, y, z);
      light.position.set(x, y + 0.2, z);
      light.shadow.needsUpdate = true;
    },
    /** A paraffin flame breathes slowly; it never flickers. */
    update(time: number) {
      const breathe = 1 + Math.sin(time * 0.71) * 0.02 + Math.sin(time * 1.33 + 1) * 0.012;
      light.intensity = base * breathe;
      flame.scale.set(0.8, 2.1 * breathe, 0.8);
    },
  };
}
