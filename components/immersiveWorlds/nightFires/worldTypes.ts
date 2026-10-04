import type * as THREE from 'three';

export type NightWorldId = 'mountain' | 'deep' | 'lakeside';
export type NightInteractionKind = 'log-embers' | 'lantern-brightness';
export interface NightInteraction {
  world: NightWorldId;
  kind: NightInteractionKind;
  /** Bounded normalized strength; integrator may apply a quiet gain ramp. */
  value: number;
}
export interface NightWorldProps {
  active: boolean;
  onInteraction?: (event: NightInteraction) => void;
  className?: string;
}
export interface WorldView {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}
export interface WorldRecipe {
  scene: THREE.Scene;
  /** Portrait receives an intentionally composed camera, not a blind crop. */
  view: (aspect: number) => WorldView;
  update: (elapsed: number, dt: number) => void;
  targets: Array<{ object: THREE.Object3D; kind: NightInteractionKind }>;
  interact: (kind: NightInteractionKind) => number;
  /** For owned resources not attached to the scene graph. */
  dispose?: () => void;
}
