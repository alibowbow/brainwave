import React from 'react';
import { ShelterWorld, type ShelterWorldProps } from './ShelterWorld';
import { buildTent } from './engine/tent';
export default function RainTentWorld(props: ShelterWorldProps) { return <ShelterWorld {...props} kind="tent" builder={buildTent} />; }
