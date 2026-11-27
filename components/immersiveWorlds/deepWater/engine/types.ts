import type * as THREE from 'three';
import type { PostSettings, VolumeEffect } from '../../shared/render/hdrPipeline';

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
  /** GPU-dependent setup (environment maps) that needs a live renderer. */
  prepare?(renderer: THREE.WebGLRenderer): void;
  /** Image settings for the shared HDR pipeline. */
  post?: Partial<PostSettings>;
  /** Optional participating medium (god rays, mist); owned by the pipeline once created. */
  createVolume?(): VolumeEffect;
  /** Told whether the HDR pipeline runs, so a world can show simpler fallbacks. */
  setPostActive?(active: boolean): void;
}
