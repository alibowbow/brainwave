import React from 'react';
import { SanctuaryHost } from './SanctuaryEngine';
import SanctuaryView from './SanctuaryView';
import { buildWarmHeart } from './warmHeart';
import type { SanctuaryProps } from './worldTypes';
const host = new SanctuaryHost('warm-heart', buildWarmHeart);
export default function WarmHeartWorld(props: SanctuaryProps) {
  return <SanctuaryView {...props} host={host} label="포근한 심장 — 겹겹이 접힌 반투명한 막 사이로 따스한 빛이 숨 쉬듯 번지는 고요한 쉼터. 가까운 막을 가볍게 만져 보세요." />;
}
