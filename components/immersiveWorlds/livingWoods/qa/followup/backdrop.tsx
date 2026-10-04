import React from 'react';
import MorningPorchWorld from '../../MorningPorchWorld';
import RainyForestWorld from '../../RainyForestWorld';
import AncientForestWorld from '../../AncientForestWorld';
import BambooWorld from '../../BambooWorld';
import { worldMetadata, type LivingWorld, type LivingWoodsInteraction } from '../../types';

export const worlds = { morning: MorningPorchWorld, rainy: RainyForestWorld, ancient: AncientForestWorld, bamboo: BambooWorld };
const requested = new URLSearchParams(location.search).get('world') as LivingWorld;
export const world: LivingWorld = requested in worlds ? requested : 'morning';
export const title = worldMetadata[world].label;
export const interactions: LivingWoodsInteraction[] = [];
export const recordInteraction = (event: LivingWoodsInteraction) => interactions.push(event);

// QA build injection only. Real Player/ImmersiveMode source and styles are used
// unchanged. The source branch's production registry does not contain these
// entries; this adapter is explicitly not evidence of integrated App routing.
export function SessionBackdrop({ active }: { active: boolean }) {
  const World = worlds[world];
  return <World active={active} onInteraction={recordInteraction} />;
}
