import type { ComponentType } from 'react';
import type { SoundLayer } from '../../services/audioEngine';
import type { BackgroundSoundType } from '../../types';

/** A pilot may accept just active. All other inputs are optional and read-only. */
export interface ImmersiveWorldProps {
  active: boolean;
  onInteraction?: (event: unknown) => void;
  layers?: readonly SoundLayer[];
  subscribeEvents?: (callback: (type: BackgroundSoundType) => void) => () => void;
  /** auto starts at high quality; lower only on measured sustained pressure.
   * Never infer low quality from a small viewport or lock the default to 24fps. */
  quality?: 'auto' | 'high' | 'balanced';
}

export type ImmersiveWorldLoader = () => Promise<{ default: ComponentType<ImmersiveWorldProps> }>;
export type WorldInteractionHandler = (worldId: string, event: unknown) => void;
