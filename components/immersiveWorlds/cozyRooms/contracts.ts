import type * as THREE from 'three';
import type { PostSettings, VolumeEffect } from '../shared/render/hdrPipeline';

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
  /** Image settings for the shared HDR pipeline (used only when it runs). */
  post?: Partial<PostSettings>;
  /** Optional participating medium (dust in window light, hearth haze). Owned by the pipeline once created. */
  createVolume?(): VolumeEffect;
  /** GPU-dependent setup (radiance probes) that needs the live renderer; runs once after the world exists. */
  prepare?(renderer: THREE.WebGLRenderer): void;
  /** Told whether the HDR pipeline runs, so a world can keep simpler fallbacks for the direct path. */
  setPostActive?(active: boolean): void;
}
export type WorldFactory = () => WorldBuild;
