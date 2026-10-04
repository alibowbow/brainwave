import React from 'react';
import { ShelterWorld, type ShelterWorldProps } from './ShelterWorld';
import { buildPorch } from './engine/porch';
export default function MonsoonPorchWorld(props: ShelterWorldProps) { return <ShelterWorld {...props} kind="porch" builder={buildPorch} />; }
