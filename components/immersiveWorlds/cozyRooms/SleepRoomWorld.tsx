import { CozyWorld } from './CozyWorld';
import type { CozyWorldProps } from './contracts';
import { createSleepRoomWorld } from './sleepRoom';

/** A reclined bedroom, composed separately for wide and narrow displays. */
export default function SleepRoomWorld(props: CozyWorldProps) {
  return <CozyWorld {...props} id="sleep_prep" factory={createSleepRoomWorld} />;
}
