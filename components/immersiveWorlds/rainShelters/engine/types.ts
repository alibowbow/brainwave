import type * as THREE from 'three';
import type { PostSettings, VolumeEffect } from '../../shared/render/hdrPipeline';
export type WorldKind = 'tent' | 'window' | 'porch' | 'storm';
export interface ShelterInteraction { world: WorldKind; action: 'opening' | 'glass-trace' | 'basin-ripple' | 'awning'; value: number; }
export interface WorldContext { scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer; }
export interface WorldRecipe {
  update(time: number, dt: number): void;
  resize(aspect: number): void;
  /** Normalized device coordinates. Explicit=true is the accessible interaction button. */
  interact(x: number, y: number, explicit?: boolean, immediate?: boolean): Omit<ShelterInteraction, 'world'> | null;
  dispose?(): void;
  /** GPU setup once the world exists (radiance probes). `hdr`: float targets are renderable. */
  prepare?(renderer: THREE.WebGLRenderer, hdr: boolean): void;
  /** Image settings for the shared HDR pipeline. */
  post?: Partial<PostSettings>;
  /** Optional participating medium (rain mist); owned by the pipeline once created. */
  createVolume?(): VolumeEffect;
  /** Told whether the HDR pipeline runs, so a world can switch to simpler fallbacks. */
  setPostActive?(active: boolean): void;
  /** Drawing-buffer height in pixels, so distant rain can stay one pixel wide. */
  setViewHeight?(pixels: number): void;
}
export type WorldBuilder = (context: WorldContext) => WorldRecipe;
