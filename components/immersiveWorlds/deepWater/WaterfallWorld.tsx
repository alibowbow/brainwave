import DeepWaterView, { type DeepWaterProps } from './DeepWaterView';
export default function WaterfallWorld(props: DeepWaterProps) { return <DeepWaterView {...props} kind="waterfall" />; }
export type { DeepWaterProps } from './DeepWaterView';
export type { DeepWaterInteraction } from './engine/types';
