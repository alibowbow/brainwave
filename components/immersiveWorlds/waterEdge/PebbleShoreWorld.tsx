import WorldView from './WorldView';
import { createPebbleShore } from './scenes/pebbleShore';
import type { WaterEdgeProps } from './contracts';
export default function PebbleShoreWorld(props: WaterEdgeProps) {
  return <WorldView {...props} kind="pebble-shore" factory={createPebbleShore} />;
}
