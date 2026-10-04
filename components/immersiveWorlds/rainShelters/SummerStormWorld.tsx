import React from 'react';
import { ShelterWorld, type ShelterWorldProps } from './ShelterWorld';
import { buildStorm } from './engine/storm';
export default function SummerStormWorld(props: ShelterWorldProps) { return <ShelterWorld {...props} kind="storm" builder={buildStorm} />; }
