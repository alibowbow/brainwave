import { CozyWorld } from './CozyWorld';
import type { CozyWorldProps } from './contracts';
import { createNapTerraceWorld } from './napTerrace';

/** Reclined daylight garden; the shared host owns the single rendering context. */
export default function NapTerraceWorld(props: CozyWorldProps) {
  return <CozyWorld {...props} id="power_nap" factory={createNapTerraceWorld} />;
}
