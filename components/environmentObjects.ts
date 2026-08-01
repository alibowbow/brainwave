export const ENVIRONMENT_ATLAS_COLUMNS = 5;
export const ENVIRONMENT_ATLAS_ROWS = 5;

export type EnvironmentObjectId =
  | 'cloud'
  | 'storm'
  | 'rain'
  | 'snow'
  | 'noise'
  | 'water'
  | 'wave'
  | 'stream-flow'
  | 'waterfall'
  | 'waterfall-mist'
  | 'fire'
  | 'firefly'
  | 'leaf'
  | 'bubble'
  | 'bamboo'
  | 'temple'
  | 'tent'
  | 'rain-window'
  | 'eaves'
  | 'pebbles'
  | 'chimes'
  | 'singing-bowl'
  | 'fan'
  | 'drone'
  | 'heartbeat';

export interface EnvironmentObjectSpec {
  id: EnvironmentObjectId;
  atlasPath: string;
  row: number;
  frames: readonly number[];
  frameDurations: readonly number[];
  restRange?: readonly [number, number];
}

const atlas = (
  id: EnvironmentObjectId,
  file: string,
  row: number,
  frameDurations: readonly number[],
  restRange?: readonly [number, number],
): EnvironmentObjectSpec => ({
  id,
  atlasPath: `images/nature/objects/${file}`,
  row,
  frames: [0, 1, 2, 3, 4, 0],
  frameDurations: [...frameDurations, frameDurations[0]],
  restRange,
});

export const ENVIRONMENT_OBJECTS: Record<EnvironmentObjectId, EnvironmentObjectSpec> = {
  cloud: atlas('cloud', 'weather-objects-atlas-v1.webp', 0, [1500, 1700, 1600, 1800, 1550]),
  storm: atlas('storm', 'weather-objects-atlas-v1.webp', 1, [1500, 180, 130, 260, 2100], [6500, 14000]),
  rain: atlas('rain', 'weather-objects-atlas-v1.webp', 2, [150, 130, 160, 140, 155]),
  snow: atlas('snow', 'weather-objects-atlas-v1.webp', 3, [620, 540, 680, 570, 650]),
  noise: atlas('noise', 'weather-objects-atlas-v1.webp', 4, [520, 430, 560, 470, 610]),

  water: atlas('water', 'water-objects-atlas-v1.webp', 0, [920, 780, 1040, 860, 980]),
  wave: atlas('wave', 'water-objects-atlas-v1.webp', 1, [420, 360, 430, 390, 460]),
  'stream-flow': atlas('stream-flow', 'water-objects-atlas-v1.webp', 2, [520, 430, 560, 470, 610]),
  waterfall: atlas('waterfall', 'water-objects-atlas-v1.webp', 3, [180, 150, 170, 140, 190]),
  'waterfall-mist': atlas('waterfall-mist', 'water-objects-atlas-v1.webp', 4, [820, 690, 930, 740, 860]),

  fire: atlas('fire', 'organic-objects-atlas-v1.webp', 0, [170, 140, 160, 150, 180]),
  firefly: atlas('firefly', 'organic-objects-atlas-v1.webp', 1, [760, 620, 420, 680, 900], [1200, 4200]),
  leaf: atlas('leaf', 'organic-objects-atlas-v1.webp', 2, [520, 470, 560, 490, 600]),
  bubble: atlas('bubble', 'organic-objects-atlas-v1.webp', 3, [720, 610, 560, 490, 820]),
  bamboo: atlas('bamboo', 'organic-objects-atlas-v1.webp', 4, [1500, 1700, 1450, 1850, 1600]),

  temple: atlas('temple', 'shelter-objects-atlas-v1.webp', 0, [1100, 980, 1040, 920, 1200], [4200, 9000]),
  tent: atlas('tent', 'shelter-objects-atlas-v1.webp', 1, [1600, 1800, 1550, 1900, 1700], [2800, 6800]),
  'rain-window': atlas('rain-window', 'shelter-objects-atlas-v1.webp', 2, [1300, 1100, 1450, 1180, 1550]),
  eaves: atlas('eaves', 'shelter-objects-atlas-v1.webp', 3, [760, 620, 540, 480, 860]),
  pebbles: atlas('pebbles', 'shelter-objects-atlas-v1.webp', 4, [1900, 2200, 1800, 2400, 2050]),

  chimes: atlas('chimes', 'wellness-objects-atlas-v1.webp', 0, [560, 480, 520, 460, 620], [2800, 7200]),
  'singing-bowl': atlas('singing-bowl', 'wellness-objects-atlas-v1.webp', 1, [680, 520, 260, 740, 980], [5200, 11000]),
  fan: atlas('fan', 'wellness-objects-atlas-v1.webp', 2, [110, 105, 115, 100, 120]),
  drone: atlas('drone', 'wellness-objects-atlas-v1.webp', 3, [780, 680, 860, 720, 920]),
  heartbeat: atlas('heartbeat', 'wellness-objects-atlas-v1.webp', 4, [620, 180, 160, 360, 850], [900, 1800]),
};

export const ENVIRONMENT_OBJECT_IDS = Object.keys(ENVIRONMENT_OBJECTS) as EnvironmentObjectId[];

