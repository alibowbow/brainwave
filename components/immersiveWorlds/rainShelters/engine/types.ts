import type * as THREE from 'three';
export type WorldKind = 'tent' | 'window' | 'porch' | 'storm';
export interface ShelterInteraction { world: WorldKind; action: 'opening' | 'glass-trace' | 'basin-ripple' | 'awning'; value: number; }
export interface WorldContext { scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer; }
export interface WorldRecipe {
  update(time: number, dt: number): void;
  resize(aspect: number): void;
  /** Normalized device coordinates. Explicit=true is the accessible interaction button. */
  interact(x: number, y: number, explicit?: boolean): Omit<ShelterInteraction, 'world'> | null;
  dispose?(): void;
}
export type WorldBuilder = (context: WorldContext) => WorldRecipe;
