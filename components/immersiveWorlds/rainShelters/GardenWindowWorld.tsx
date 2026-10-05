import React from 'react';
import { ShelterWorld, type ShelterWorldProps } from './ShelterWorld';
import { buildWindow } from './engine/window';
export default function GardenWindowWorld(props: ShelterWorldProps) { return <ShelterWorld {...props} kind="window" builder={buildWindow} />; }
