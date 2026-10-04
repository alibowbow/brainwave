import WorldView from './WorldView';
import { createNightPond } from './scenes/nightPond';
import type { WaterEdgeProps } from './contracts';
export default function NightPondWorld(props: WaterEdgeProps) {
  return <WorldView {...props} kind="night-pond" factory={createNightPond} />;
}
