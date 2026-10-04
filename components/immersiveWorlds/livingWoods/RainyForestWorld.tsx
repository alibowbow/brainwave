import React from 'react';
import WorldSurface from './WorldSurface';
import type { LivingWoodsProps } from './types';

export default function RainyForestWorld(props: LivingWoodsProps) {
  return <WorldSurface {...props} world="rainy" />;
}
