import React from 'react';
import { MosiHost } from '../mosi/MosiEngine';
import SanctuaryView from './SanctuaryView';
import type { SanctuaryProps } from './worldTypes';
import '../mosi/mosi.css';
const host = new MosiHost();
export default function MeditationCourtWorld(props: SanctuaryProps) {
  return <SanctuaryView {...props} host={host} label="마음챙김 — 모시 그림자 정원. Blender로 만든 천과 나뭇잎 그림자, 조용한 빛을 바라보세요." />;
}
