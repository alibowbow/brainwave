import { CozyWorld } from './CozyWorld';
import type { CozyWorldProps } from './contracts';
import { createHearthWorld } from './hearth';

/** Seated, first-person stone hearth; the shared host owns its canvas and motion policy. */
export default function HearthWorld(props: CozyWorldProps) {
  return <CozyWorld {...props} id="relax" factory={createHearthWorld} />;
}
