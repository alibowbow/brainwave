import * as THREE from 'three';

const plane = new THREE.Plane();
const cameraWorld = new THREE.Vector3();
const rotation = new THREE.Matrix4();
const lookAt = new THREE.Vector3();
const view = new THREE.Vector3();
const target = new THREE.Vector3();
const clipPlane = new THREE.Vector4();
const q = new THREE.Vector4();

/**
 * Mirrors `camera` across a plane (Lengyel oblique clipping, as three's
 * Reflector does) and writes the world → projective-texture matrix.
 */
export function updateMirrorCamera(
  camera: THREE.PerspectiveCamera,
  planePoint: THREE.Vector3,
  planeNormal: THREE.Vector3,
  mirror: THREE.PerspectiveCamera,
  textureMatrix: THREE.Matrix4,
  oblique = true,
) {
  camera.updateMatrixWorld();
  cameraWorld.setFromMatrixPosition(camera.matrixWorld);

  view.subVectors(planePoint, cameraWorld).reflect(planeNormal).negate().add(planePoint);
  rotation.extractRotation(camera.matrixWorld);
  lookAt.set(0, 0, -1).applyMatrix4(rotation).add(cameraWorld);
  target.subVectors(planePoint, lookAt).reflect(planeNormal).negate().add(planePoint);

  mirror.position.copy(view);
  mirror.up.set(0, 1, 0).applyMatrix4(rotation).reflect(planeNormal);
  mirror.lookAt(target);
  mirror.near = camera.near;
  mirror.far = camera.far;
  mirror.aspect = camera.aspect;
  mirror.fov = camera.fov;
  mirror.updateMatrixWorld();
  mirror.projectionMatrix.copy(camera.projectionMatrix);
  mirror.projectionMatrixInverse.copy(camera.projectionMatrixInverse);

  textureMatrix.set(
    0.5, 0.0, 0.0, 0.5,
    0.0, 0.5, 0.0, 0.5,
    0.0, 0.0, 0.5, 0.5,
    0.0, 0.0, 0.0, 1.0,
  );
  textureMatrix.multiply(mirror.projectionMatrix);
  textureMatrix.multiply(mirror.matrixWorldInverse);

  if (!oblique) return;
  plane.setFromNormalAndCoplanarPoint(planeNormal, planePoint);
  plane.applyMatrix4(mirror.matrixWorldInverse);
  clipPlane.set(plane.normal.x, plane.normal.y, plane.normal.z, plane.constant);
  const projection = mirror.projectionMatrix;
  q.x = (Math.sign(clipPlane.x) + projection.elements[8]) / projection.elements[0];
  q.y = (Math.sign(clipPlane.y) + projection.elements[9]) / projection.elements[5];
  q.z = -1.0;
  q.w = (1.0 + projection.elements[10]) / projection.elements[14];
  clipPlane.multiplyScalar(2.0 / clipPlane.dot(q));
  projection.elements[2] = clipPlane.x;
  projection.elements[6] = clipPlane.y;
  projection.elements[10] = clipPlane.z + 1.0;
  projection.elements[14] = clipPlane.w;
  mirror.projectionMatrixInverse.copy(projection).invert();
}
