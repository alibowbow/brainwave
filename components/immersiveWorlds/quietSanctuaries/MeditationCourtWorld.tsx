import React from 'react';
import { MosiHost } from '../mosi/MosiEngine';
import SanctuaryView from './SanctuaryView';
import type { SanctuaryProps } from './worldTypes';
import '../mosi/mosi.css';
const host = new MosiHost();
export default function MeditationCourtWorld(props: SanctuaryProps) {
  return <SanctuaryView {...props} host={host} label="마음챙김 — 모시 그림자 정원. Blender로 만든 모시 천이 바람에 살짝 흔들리고, 나뭇잎 그림자와 조용한 빛이 머무는 방을 바라보세요." />;
}
