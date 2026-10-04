import type * as THREE from 'three';

export type LivingWorld = 'morning' | 'rainy' | 'ancient' | 'bamboo';
export interface WorldContent {
  update(time: number, dt: number): void;
  resize?(aspect: number): void;
  interactionTargets: THREE.Object3D[];
  interact?(hit: THREE.Intersection, time: number): void;
  dispose?(): void;
}
export interface LivingWoodsInteraction {
  world: LivingWorld;
  sceneId: 'country_morning' | 'amb:rainy_forest' | 'amb:deep_forest' | 'nature:bamboo_grove';
  kind: 'tea-ripple' | 'leaf-drip' | 'leaf-rustle' | 'bamboo-leaf';
  strength: number;
}
export interface LivingWoodsProps {
  active: boolean;
  static3D?: boolean;
  onInteraction?: (event: LivingWoodsInteraction) => void;
}
export const worldMetadata = {
  morning: { sceneId: 'country_morning', kind: 'tea-ripple', label: '상쾌한 아침' },
  rainy: { sceneId: 'amb:rainy_forest', kind: 'leaf-drip', label: '비 오는 숲' },
  ancient: { sceneId: 'amb:deep_forest', kind: 'leaf-rustle', label: '깊은 숲' },
  bamboo: { sceneId: 'nature:bamboo_grove', kind: 'bamboo-leaf', label: '대나무숲' },
} as const;
