import type * as THREE from 'three';
import type { PostSettings, VolumeEffect } from '../shared/render/hdrPipeline';

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
  /** Keep the real first frame, even while the session itself is active. */
  static3D?: boolean;
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
  /** GPU-dependent setup (radiance probes) that needs the live renderer. */
  prepare?: (renderer: THREE.WebGLRenderer) => void;
  /** Image settings for the shared HDR pipeline. */
  post?: Partial<PostSettings>;
  /** Participating media (haze, mist, smoke); owned by the pipeline once created. */
  createVolume?: () => VolumeEffect;
  /** Told whether the HDR pipeline runs, so a world can adjust its fallbacks. */
  setPostActive?: (active: boolean) => void;
}
