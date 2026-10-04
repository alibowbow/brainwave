import React from 'react';
import NightWorld from './NightWorld';
import type { NightWorldProps } from './worldTypes';
export default function DeepNightWorld(props: NightWorldProps) { return <NightWorld {...props} world="deep" />; }
