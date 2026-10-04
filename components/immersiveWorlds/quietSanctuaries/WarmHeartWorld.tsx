import React from 'react';
import { SanctuaryHost } from './SanctuaryEngine';
import SanctuaryView from './SanctuaryView';
import { buildWarmHeart } from './warmHeart';
import type { SanctuaryProps } from './worldTypes';
const host = new SanctuaryHost('warm-heart', buildWarmHeart);
export default function WarmHeartWorld(props: SanctuaryProps) {
  return <SanctuaryView {...props} host={host} label="포근한 심장 — 따스한 빛과 반투명 섬유가 감싸는 고요한 공간. 가까운 막을 가볍게 만져 보세요." />;
}
