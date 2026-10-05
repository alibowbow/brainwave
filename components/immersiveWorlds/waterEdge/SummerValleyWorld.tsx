import WorldView from './WorldView';
import { createSummerValley } from './scenes/summerValley';
import type { WaterEdgeProps } from './contracts';
export default function SummerValleyWorld(props: WaterEdgeProps) {
  return <WorldView {...props} kind="summer-valley" factory={createSummerValley} />;
}
