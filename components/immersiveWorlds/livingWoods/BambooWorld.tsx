import React from 'react';
import WorldSurface from './WorldSurface';
import type { LivingWoodsProps } from './types';

export default function BambooWorld(props: LivingWoodsProps) {
  return <WorldSurface {...props} world="bamboo" />;
}
