import type * as THREE from 'three';

export type CozyWorldId = 'relax' | 'sleep_prep' | 'power_nap' | 'nature:winter_lodge';
export interface CozyInteraction {
  world: CozyWorldId;
  type: string;
  intensity: number;
}
export interface CozyWorldProps {
  active: boolean;
  onInteraction?: (event: CozyInteraction) => void;
  /** Freeze the real 3D scene at a fully rendered frame. */
  static3D?: boolean;
  className?: string;
}
export interface WorldBuild {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** Absolute scene time only advances while active, visible and motion is allowed. */
  update(time: number, dt: number): void;
  /** Set the original camera composition for this aspect ratio. */
  resize(aspect: number): void;
  /** Raycast targets use userData.cozyAction. Return the bounded event kind. */
  interact(action: string): { type: string; intensity: number } | null;
  /** Optional cleanup for resources not reachable by traversing scene. */
  dispose?(): void;
}
export type WorldFactory = () => WorldBuild;
