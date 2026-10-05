import DeepWaterView, { type DeepWaterProps } from './DeepWaterView';
export default function DeepSeaWorld(props: DeepWaterProps) { return <DeepWaterView {...props} kind="sea" />; }
export type { DeepWaterProps } from './DeepWaterView';
export type { DeepWaterInteraction } from './engine/types';
