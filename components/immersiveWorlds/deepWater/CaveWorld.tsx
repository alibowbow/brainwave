import DeepWaterView, { type DeepWaterProps } from './DeepWaterView';
export default function CaveWorld(props: DeepWaterProps) { return <DeepWaterView {...props} kind="cave" />; }
export type { DeepWaterProps } from './DeepWaterView';
export type { DeepWaterInteraction } from './engine/types';
