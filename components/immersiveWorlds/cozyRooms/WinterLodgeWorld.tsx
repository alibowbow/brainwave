import { CozyWorld } from './CozyWorld';
import type { CozyWorldProps } from './contracts';
import { createWinterLodgeWorld } from './winterLodge';

/** A seated winter interior. The shared host owns rendering and motion policy. */
export default function WinterLodgeWorld(props: CozyWorldProps) {
  return <CozyWorld {...props} id="nature:winter_lodge" factory={createWinterLodgeWorld} />;
}
