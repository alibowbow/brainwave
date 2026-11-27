import type * as THREE from 'three';
import type { PostSettings, VolumeEffect } from '../shared/render/hdrPipeline';

export type SanctuaryKind = 'meditation' | 'warm-heart' | 'snow-village';
export interface SanctuaryInteraction {
  world: SanctuaryKind;
  kind: 'water' | 'bowl' | 'warmth' | 'snow';
  strength: number;
  x: number;
}
export interface SanctuaryProps {
  active: boolean;
  onInteraction?: (event: SanctuaryInteraction) => void;
  /** Keeps the complete spatial first frame, without motion. */
  static3D?: boolean;
}
export interface SanctuaryWorld {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** Configure an independently composed narrow/landscape camera. Called before the first render. */
  resize(aspect: number): void;
  /** dt is clamped; elapsed advances only when active. No independent timers. */
  update(elapsed: number, dt: number): void;
  /** Raycast actual objects. Return undefined if the ray missed the intended target. */
  interact(ndc: THREE.Vector2): Omit<SanctuaryInteraction, 'world'> | undefined;
  /** Any custom render target or resource outside scene traversal. */
  dispose?(): void;
  /**
   * Opt in to the shared HDR pipeline (bloom, AO, grade). Worlds without it
   * keep the direct renderer exactly as before.
   */
  post?: Partial<PostSettings>;
  /** Half-resolution participating medium (haze, halos, smoke) for the HDR pipeline. */
  createVolume?(): VolumeEffect;
  /** GPU-dependent setup (radiance probes, static shadow maps) once the renderer exists. */
  prepare?(renderer: THREE.WebGLRenderer): void;
  /** Swaps direct-path stand-ins (fog, glow sprites) when the HDR pipeline is (in)active. */
  setPostActive?(active: boolean): void;
}
export type SanctuaryBuilder = (renderer: THREE.WebGLRenderer) => SanctuaryWorld;
