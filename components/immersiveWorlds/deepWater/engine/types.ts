import type * as THREE from 'three';

export type WorldKind = 'waterfall' | 'cave' | 'sea';
export type DeepWaterInteraction = {
  world: WorldKind;
  kind: 'pool-ripple' | 'organism-pulse' | 'spray';
  strength: number;
  pan: number;
};
export interface WorldContent {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  target: THREE.Vector3;
  update(time: number, dt: number): void;
  interact?(ray: THREE.Raycaster, time: number): DeepWaterInteraction | null;
  resize?(aspect: number): void;
  dispose?(): void;
}
