import type * as THREE from 'three';

export type WaterEdgeKind = 'night-pond' | 'summer-valley' | 'pebble-shore';
export interface WaterEdgeInteraction {
  world: WaterEdgeKind;
  kind: 'ripple' | 'pebble-roll';
  strength: number;
  position: { x: number; z: number };
}
export interface WaterEdgeProps {
  active: boolean;
  onInteraction?: (event: WaterEdgeInteraction) => void;
  static3D?: boolean;
}
export interface WorldScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** Sets aspect and independent portrait composition. */
  resize(width: number, height: number): void;
  /** Time is seconds and freezes with inactive/hidden/reduced motion. */
  update(time: number, dt: number): void;
  /** normalized device coordinates, returns event only when geometry is hit */
  interact(x: number, y: number, time: number): WaterEdgeInteraction | null;
  /** Dispose extra resources; engine handles scene geometry/materials/textures. */
  dispose?(): void;
}
export type WorldFactory = (renderer: THREE.WebGLRenderer) => WorldScene;
