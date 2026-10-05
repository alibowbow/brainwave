import React from 'react';
import { SanctuaryHost } from './SanctuaryEngine';
import SanctuaryView from './SanctuaryView';
import { buildMeditationCourt } from './meditation';
import type { SanctuaryProps } from './worldTypes';
const host = new SanctuaryHost('meditation', buildMeditationCourt);
export default function MeditationCourtWorld(props: SanctuaryProps) {
  return <SanctuaryView {...props} host={host} label="마음 챙김 — 돌과 나무로 둘러싸인 열린 정원. 물이나 작은 그릇을 가볍게 만져 보세요." />;
}
