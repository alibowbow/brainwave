import type * as THREE from 'three';

export type WorldId = 'temple' | 'scops' | 'rural';
export interface WorldInteraction {
  scene: 'nature:temple_dawn' | 'nature:scops_night' | 'nature:rural_summer_night';
  type: 'bell' | 'lantern' | 'grass';
  strength: number;
  position: [number, number, number];
}
export interface SceneContent {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** Called on resize. Compose portrait separately; preserve a seated first-person eye. */
  resize(aspect: number): void;
  /** Absolute scene time stops when inactive, hidden or reduced-motion. */
  update(time: number, dt: number): void;
  /** Raycast tactile objects only. Return null for empty space. */
  interact(ndc: THREE.Vector2): WorldInteraction | null;
  audioEvent?(type: 'scops-call'): void;
  /** Extra textures/geometries not attached to scene, if any. Engine disposes scene tree. */
  dispose?(): void;
}
