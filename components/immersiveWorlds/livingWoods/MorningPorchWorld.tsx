import React from 'react';
import WorldSurface from './WorldSurface';
import type { LivingWoodsProps } from './types';

export default function MorningPorchWorld(props: LivingWoodsProps) {
  return <WorldSurface {...props} world="morning" />;
}
