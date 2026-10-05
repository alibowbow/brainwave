import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createCosmicSky } from '../sky';

const localCenter = new THREE.Vector3(19, 24, -78);
const sunlight = new THREE.Vector3(-.78, .40, .28).normalize();

function ringUniform(sky: ReturnType<typeof createCosmicSky>) {
  const rings = sky.group.getObjectByName('aurelia-dust-rings') as THREE.Mesh<
    THREE.RingGeometry, THREE.ShaderMaterial
  >;
  return { rings, center: rings.material.uniforms.uPlanetPosition.value as THREE.Vector3 };
}

function expectVector(actual: THREE.Vector3, expected: THREE.Vector3) {
  expect(actual.distanceTo(expected)).toBeLessThan(1e-9);
}

// Evaluate the shader's physical sphere occlusion at real ring vertices. This
// catches a center that looks correct in one orientation but shifts the shadow
// relative to its geometry after a responsive transform.
function ringShadow(worldPoint: THREE.Vector3, center: THREE.Vector3) {
  const toCenter = center.clone().sub(worldPoint);
  const projection = toCenter.dot(sunlight);
  const distance = Math.sqrt(Math.max(0, toCenter.lengthSq() - projection ** 2));
  const shadow = THREE.MathUtils.smoothstep(distance, 15.5, 17.3);
  return THREE.MathUtils.lerp(1, shadow, THREE.MathUtils.smoothstep(projection, 0, 2));
}

describe('cosmic ring shadow world coordinates', () => {
  it('preserves the desktop center and has both lit and occluded ring geometry', () => {
    const sky = createCosmicSky();
    try {
      sky.update(0);
      const { rings, center } = ringUniform(sky);
      expectVector(center, localCenter);
      rings.updateWorldMatrix(true, false);
      const vertices = rings.geometry.getAttribute('position');
      const shadows = Array.from({ length: vertices.count }, (_, index) =>
        ringShadow(new THREE.Vector3().fromBufferAttribute(vertices, index).applyMatrix4(rings.matrixWorld), center));
      expect(Math.min(...shadows)).toBe(0);
      expect(Math.max(...shadows)).toBe(1);
    } finally { sky.dispose(); }
  });

  it('keeps the shadow on the transformed planet at the actual portrait rotation', () => {
    const sky = createCosmicSky();
    try {
      sky.group.rotation.y = .18;
      // No external matrix update: this mirrors setSize followed by renderFrame.
      sky.update(0);
      const { rings, center } = ringUniform(sky);
      const expected = localCenter.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), .18);
      expectVector(center, expected);
      rings.updateWorldMatrix(true, false);
      const vertices = rings.geometry.getAttribute('position');
      let oldCoordinateError = 0;
      for (let index = 0; index < vertices.count; index++) {
        const worldPoint = new THREE.Vector3().fromBufferAttribute(vertices, index).applyMatrix4(rings.matrixWorld);
        const expectedShadow = ringShadow(worldPoint, expected);
        expect(ringShadow(worldPoint, center)).toBeCloseTo(expectedShadow, 10);
        oldCoordinateError = Math.max(oldCoordinateError, Math.abs(ringShadow(worldPoint, localCenter) - expectedShadow));
      }
      // The fixture actually exercises a visible failure of the former local center.
      expect(oldCoordinateError).toBeGreaterThan(.8);
    } finally { sky.dispose(); }
  });

  it('refreshes changed ancestor transforms without mutating local planet placement', () => {
    const sky = createCosmicSky();
    const ancestor = new THREE.Group();
    ancestor.add(sky.group);
    const planet = sky.group.getObjectByName('aurelia-gas-giant')!;
    try {
      sky.group.rotation.y = .18;
      ancestor.rotation.set(.07, -.23, .04);
      ancestor.position.set(37, -5, 11);
      sky.update(12);
      const expected = () => localCenter.clone()
        .applyQuaternion(sky.group.quaternion)
        .applyQuaternion(ancestor.quaternion)
        .add(ancestor.position);
      expectVector(ringUniform(sky).center, expected());
      ancestor.rotation.y = .31;
      ancestor.position.set(-12, 8, 19);
      // Diagnostics report a stale uniform; they must not silently repair it.
      expect(sky.getShadowState().centerError).toBeGreaterThan(1);
      sky.update(13);
      expectVector(ringUniform(sky).center, expected());
      expect(sky.getShadowState().centerError).toBe(0);
      expectVector(planet.position, localCenter);
      expectVector(ringUniform(sky).rings.position, localCenter);
    } finally { sky.dispose(); }
  });
});
