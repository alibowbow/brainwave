import React from 'react';
import { SanctuaryHost } from './SanctuaryEngine';
import SanctuaryView from './SanctuaryView';
import { buildSnowVillage } from './snowVillage';
import type { SanctuaryProps } from './worldTypes';
const host = new SanctuaryHost('snow-village', buildSnowVillage);
export default function SnowVillageWorld(props: SanctuaryProps) {
  return <SanctuaryView {...props} host={host} label="눈 내리는 밤 — 처마 아래에서 바라보는 마을의 눈길. 난간 위 눈을 가볍게 쓸어 보세요." />;
}
