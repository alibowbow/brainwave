import type { BackgroundSoundType } from './types';

export const CC0_1_0_URL = 'https://creativecommons.org/publicdomain/zero/1.0/' as const;
export const AMBIE_REPOSITORY = 'https://github.com/jenius-apps/ambie' as const;
export const AMBIE_COMMIT = '30601f527e092c77c2408c0d247893b9fa30a20e' as const;
export const DYNAMIC_SURROUNDINGS_REPOSITORY = 'https://github.com/OreCruncher/DynamicSurroundingsFabric' as const;
export const DYNAMIC_SURROUNDINGS_COMMIT = '0d352c7e57bbd39786defdba355156a5bdb850f4' as const;

export interface NatureSampleSource {
  fileName: string;
  mimeType: 'audio/ogg; codecs="vorbis"' | 'audio/mpeg';
  codec: 'Vorbis' | 'MP3';
  bitrateKbps: number;
  sha256: string;
  role: 'primary' | 'fallback' | 'universal';
}

export interface NatureSampleAsset {
  playback: 'loop' | 'event';
  sourceTitle: string;
  author: string;
  freesoundId: number;
  sourceUrl: string;
  license: 'CC0-1.0';
  licenseUrl: typeof CC0_1_0_URL;
  sourceRepository: string | null;
  sourceCommit: string | null;
  distributedSourceUrl: string;
  distributedVariant: string;
  upstreamOriginalSpec: string;
  distributedSpec: string;
  retrievedAt: '2026-07-12';
  processingCommand: string;
  distributedSourceSha256: string;
  sources: readonly NatureSampleSource[];
  /** Calibrated independently from procedural NATURE_SOURCE_TRIM. */
  sampleTrim: number;
  /** Runtime tail->head equal-power seam blend. Zero for event one-shots. */
  crossfadeSeconds: number;
  durationSeconds: number;
  channels: 1 | 2;
  sampleRate: number;
  decodedBytesEstimate: number;
  integratedLufs: number;
  truePeakDbtp: number;
}

const ambieRaw = (name: string) =>
  `${AMBIE_REPOSITORY}/blob/${AMBIE_COMMIT}/src/AmbientSounds.Uwp/Assets/Sounds/${name}`;
const dsRaw = (path: string) =>
  `${DYNAMIC_SURROUNDINGS_REPOSITORY}/blob/${DYNAMIC_SURROUNDINGS_COMMIT}/common/src/main/resources/assets/dsurround/sounds/ambient/${path}`;

export const NATURE_SAMPLE_ASSETS = {
  rainRural: {
    playback: 'loop',
    sourceTitle: 'Rain heavy 1 (rural)',
    author: 'jmbphilmes', freesoundId: 200270, sourceUrl: 'https://freesound.org/s/200270/',
    license: 'CC0-1.0', licenseUrl: CC0_1_0_URL,
    sourceRepository: AMBIE_REPOSITORY, sourceCommit: AMBIE_COMMIT,
    distributedSourceUrl: ambieRaw('rain.wav'),
    distributedVariant: 'Ambie bundled, cropped WAV derivative',
    upstreamOriginalSpec: 'WAV, 48 kHz, 24-bit, mono, 400 s',
    distributedSpec: 'WAV PCM, 48 kHz, 16-bit, mono, 60.27 s', retrievedAt: '2026-07-12',
    processingCommand: 'ffmpeg -i rain.wav -af volume=4dB -ar 48000 -ac 1 -> Vorbis q4 + MP3 96k',
    distributedSourceSha256: '5a68ea94b6e1d83e77db80fbc55d7c2f7abef192879dfb6a9b859c1c3f753fa0',
    sources: [
      { fileName: 'rain-rural-cc0-v1.ogg', mimeType: 'audio/ogg; codecs="vorbis"', codec: 'Vorbis', bitrateKbps: 90, sha256: 'd1c9c7aa123dbc7161caa7fbb67e0ccbbe49b9bcb6fe39897a70149291eff675', role: 'primary' },
      { fileName: 'rain-rural-cc0-v1.mp3', mimeType: 'audio/mpeg', codec: 'MP3', bitrateKbps: 96, sha256: '6e5cebe23d0c71be566dfd5e36610d0fa81491c8546baa289cf3ed71579aa0c3', role: 'fallback' },
    ],
    sampleTrim: 0.82, crossfadeSeconds: 1.25, durationSeconds: 60.27, channels: 1, sampleRate: 48_000,
    decodedBytesEstimate: 11_571_840, integratedLufs: -29.1, truePeakDbtp: -3.1,
  },
  creekBrook: {
    playback: 'loop',
    sourceTitle: 'Burbling Brook',
    author: 'hargissssound', freesoundId: 324591, sourceUrl: 'https://freesound.org/s/324591/',
    license: 'CC0-1.0', licenseUrl: CC0_1_0_URL,
    sourceRepository: AMBIE_REPOSITORY, sourceCommit: AMBIE_COMMIT,
    distributedSourceUrl: ambieRaw('creek.wav'),
    distributedVariant: 'Ambie bundled, cropped WAV derivative',
    upstreamOriginalSpec: 'WAV, 44.1 kHz, 16-bit, stereo, 185.21 s',
    distributedSpec: 'WAV PCM, 44.1 kHz, 16-bit, stereo, 25.06 s', retrievedAt: '2026-07-12',
    processingCommand: 'ffmpeg -i creek.wav -af volume=5.8dB -ar 48000 -ac 2 -> Vorbis q4 + MP3 96k',
    distributedSourceSha256: '3926d7cf09975740dc39baec395a4117ea06a8f4a322978a44798b3245863777',
    sources: [
      { fileName: 'creek-brook-cc0-v1.ogg', mimeType: 'audio/ogg; codecs="vorbis"', codec: 'Vorbis', bitrateKbps: 127, sha256: '286dfc9da22474d9058d54c576d5bd62d199067c535aa8a96dba16591548b94f', role: 'primary' },
      { fileName: 'creek-brook-cc0-v1.mp3', mimeType: 'audio/mpeg', codec: 'MP3', bitrateKbps: 96, sha256: '79e42cae93ec5888e3b6efb46660d0b2946a6a80c92a4483b73655b03a8bdf9e', role: 'fallback' },
    ],
    sampleTrim: 0.82, crossfadeSeconds: 1.1, durationSeconds: 25.06, channels: 2, sampleRate: 48_000,
    decodedBytesEstimate: 9_623_040, integratedLufs: -25.7, truePeakDbtp: -3.1,
  },
  fireplaceHearth: {
    playback: 'loop',
    sourceTitle: '13_Fire in fireplace.wav',
    author: '16FThumaF', freesoundId: 499032, sourceUrl: 'https://freesound.org/s/499032/',
    license: 'CC0-1.0', licenseUrl: CC0_1_0_URL,
    sourceRepository: AMBIE_REPOSITORY, sourceCommit: AMBIE_COMMIT,
    distributedSourceUrl: ambieRaw('fireplace.wav'),
    distributedVariant: 'Ambie bundled, cropped WAV derivative',
    upstreamOriginalSpec: 'WAV, 48 kHz, 24-bit, stereo, 102.79 s',
    distributedSpec: 'WAV PCM, 48 kHz, 16-bit, stereo, 17.57 s', retrievedAt: '2026-07-12',
    processingCommand: 'ffmpeg -i fireplace.wav -af volume=3dB -ar 48000 -ac 2 -> Vorbis q4 + MP3 96k',
    distributedSourceSha256: 'e3c10a5a1c328edbf261a87f66ce150234cabfb88a169ec3f0de70fabc561b20',
    sources: [
      { fileName: 'fireplace-hearth-cc0-v1.ogg', mimeType: 'audio/ogg; codecs="vorbis"', codec: 'Vorbis', bitrateKbps: 139, sha256: 'f778e08f1bd0637ed8cfc29df926fe69fb53c275092a49889486c67617a318a2', role: 'primary' },
      { fileName: 'fireplace-hearth-cc0-v1.mp3', mimeType: 'audio/mpeg', codec: 'MP3', bitrateKbps: 96, sha256: '87efb2848992eb218f69fe28b96364d74a0ae826464d7e08c87c09b91a81f94a', role: 'fallback' },
    ],
    sampleTrim: 0.7, crossfadeSeconds: 0.9, durationSeconds: 17.57, channels: 2, sampleRate: 48_000,
    decodedBytesEstimate: 6_746_880, integratedLufs: -35.1, truePeakDbtp: -1.8,
  },
  oceanRibeira: {
    playback: 'loop',
    sourceTitle: 'Ambiance_Ocean_Ribeira_Grande_Loop_Stereo_02',
    author: 'Nox_Sound', freesoundId: 829629, sourceUrl: 'https://freesound.org/s/829629/',
    license: 'CC0-1.0', licenseUrl: CC0_1_0_URL,
    sourceRepository: null, sourceCommit: null,
    distributedSourceUrl: 'https://cdn.freesound.org/previews/829/829629_9250976-hq.mp3',
    distributedVariant: 'Freesound HQ MP3 preview (not the original WAV)',
    upstreamOriginalSpec: 'WAV, 96 kHz, 24-bit, stereo, 60.00 s; Sony PCM-D100 field recording',
    distributedSpec: 'MP3, 48 kHz, stereo, ~179 kbps, 60.05 s', retrievedAt: '2026-07-12',
    processingCommand: 'none (versioned byte-for-byte copy of the Freesound HQ preview)',
    distributedSourceSha256: '53baa509447a5207ef394ee771ffd85fa383cd1f4b22ce1b2e93de5bedb1b647',
    sources: [
      { fileName: 'ocean-ribeira-cc0-v1.mp3', mimeType: 'audio/mpeg', codec: 'MP3', bitrateKbps: 179, sha256: '53baa509447a5207ef394ee771ffd85fa383cd1f4b22ce1b2e93de5bedb1b647', role: 'universal' },
    ],
    sampleTrim: 0.7, crossfadeSeconds: 0.3, durationSeconds: 60.05, channels: 2, sampleRate: 48_000,
    decodedBytesEstimate: 23_059_200, integratedLufs: -20.9, truePeakDbtp: -7.7,
  },
  forestBirdsAlishan: {
    playback: 'loop',
    sourceTitle: 'Birds in Alishan National Scenic Area, Taiwan',
    author: 'BayTsai', freesoundId: 860231, sourceUrl: 'https://freesound.org/s/860231/',
    license: 'CC0-1.0', licenseUrl: CC0_1_0_URL,
    sourceRepository: null, sourceCommit: null,
    distributedSourceUrl: 'https://cdn.freesound.org/previews/860/860231_17078888-hq.mp3',
    distributedVariant: 'Freesound HQ MP3 preview (not the original WAV)',
    upstreamOriginalSpec: 'WAV, 48 kHz, 32-bit, stereo, 40.00 s; dawn field recording at Alishan Ogasawara',
    distributedSpec: 'MP3, 48 kHz, stereo, ~183 kbps, 40.03 s', retrievedAt: '2026-07-12',
    processingCommand: 'none (versioned byte-for-byte copy of the Freesound HQ preview)',
    distributedSourceSha256: 'c0ba967a41eab862b8fe88b316a9702f8c62d400e635545acd51de4cf6c99802',
    sources: [
      { fileName: 'forest-birds-alishan-cc0-v1.mp3', mimeType: 'audio/mpeg', codec: 'MP3', bitrateKbps: 183, sha256: 'c0ba967a41eab862b8fe88b316a9702f8c62d400e635545acd51de4cf6c99802', role: 'universal' },
    ],
    sampleTrim: 1, crossfadeSeconds: 1.2, durationSeconds: 40.032, channels: 2, sampleRate: 48_000,
    decodedBytesEstimate: 15_372_288, integratedLufs: -30.7, truePeakDbtp: -6.3,
  },
  waterfallCaldeiroes: {
    playback: 'loop',
    sourceTitle: 'Ambiance_Waterfall_Ribeira_dos_Caldeirões_Loop_Stereo',
    author: 'Nox_Sound', freesoundId: 829633, sourceUrl: 'https://freesound.org/s/829633/',
    license: 'CC0-1.0', licenseUrl: CC0_1_0_URL,
    sourceRepository: null, sourceCommit: null,
    distributedSourceUrl: 'https://cdn.freesound.org/previews/829/829633_9250976-hq.mp3',
    distributedVariant: 'Freesound HQ MP3 preview (not the original WAV)',
    upstreamOriginalSpec: 'WAV, 96 kHz, 24-bit, stereo, 20.00 s; Sony PCM-D100 field recording',
    distributedSpec: 'MP3, 48 kHz, stereo, ~188 kbps, 20.04 s', retrievedAt: '2026-07-12',
    processingCommand: 'none (versioned byte-for-byte copy of the Freesound HQ preview)',
    distributedSourceSha256: '27214225e23c7bf2090e212ef24a37317fba7ffe56db858ff175bb4d74fdbbee',
    sources: [
      { fileName: 'waterfall-caldeiroes-cc0-v1.mp3', mimeType: 'audio/mpeg', codec: 'MP3', bitrateKbps: 188, sha256: '27214225e23c7bf2090e212ef24a37317fba7ffe56db858ff175bb4d74fdbbee', role: 'universal' },
    ],
    sampleTrim: 0.29, crossfadeSeconds: 0.25, durationSeconds: 20.04, channels: 2, sampleRate: 48_000,
    decodedBytesEstimate: 7_695_360, integratedLufs: -13.4, truePeakDbtp: -2.8,
  },
  forestField: {
    playback: 'loop', sourceTitle: '001_forrest.wav', author: 'joepsporck', freesoundId: 262037,
    sourceUrl: 'https://freesound.org/s/262037/', license: 'CC0-1.0', licenseUrl: CC0_1_0_URL,
    sourceRepository: DYNAMIC_SURROUNDINGS_REPOSITORY, sourceCommit: DYNAMIC_SURROUNDINGS_COMMIT,
    distributedSourceUrl: dsRaw('outside/forest.ogg'), distributedVariant: 'DynamicSurroundings selected mono OGG excerpt',
    upstreamOriginalSpec: 'WAV, 44.1 kHz, 24-bit, stereo, 53 s', distributedSpec: 'Vorbis, 44.1 kHz, mono, ~90 kbps, 46.11 s',
    retrievedAt: '2026-07-12', processingCommand: 'primary OGG: none; fallback: ffmpeg -i forest.ogg -ar 44100 -ac 1 -b:a 80k MP3',
    distributedSourceSha256: '0159139e1a6591f5d82ce36b1c6d0edbfd1b3071edf93d9627e0ad900edd0f94',
    sources: [
      { fileName: 'forest-field-cc0-v1.ogg', mimeType: 'audio/ogg; codecs="vorbis"', codec: 'Vorbis', bitrateKbps: 90, sha256: '0159139e1a6591f5d82ce36b1c6d0edbfd1b3071edf93d9627e0ad900edd0f94', role: 'primary' },
      { fileName: 'forest-field-cc0-v1.mp3', mimeType: 'audio/mpeg', codec: 'MP3', bitrateKbps: 80, sha256: '392b4175887a1ffad1dc80061f69ccc399815a6b8726d7c3fb58327b862c33c9', role: 'fallback' },
    ],
    sampleTrim: 4, crossfadeSeconds: 1.2, durationSeconds: 46.11, channels: 1, sampleRate: 48_000,
    decodedBytesEstimate: 8_853_939, integratedLufs: -50.9, truePeakDbtp: -34,
  },
  nightCrickets: {
    playback: 'loop', sourceTitle: 'Soft, Chilled Crickets Field Recording', author: 'rayjensen', freesoundId: 202749,
    sourceUrl: 'https://freesound.org/s/202749/', license: 'CC0-1.0', licenseUrl: CC0_1_0_URL,
    sourceRepository: DYNAMIC_SURROUNDINGS_REPOSITORY, sourceCommit: DYNAMIC_SURROUNDINGS_COMMIT,
    distributedSourceUrl: dsRaw('outside/crickets.ogg'), distributedVariant: 'DynamicSurroundings mono OGG derivative',
    upstreamOriginalSpec: 'FLAC, 44.1 kHz, 16-bit, stereo, 16.17 s', distributedSpec: 'Vorbis, 44.1 kHz, mono, ~84 kbps, 16.17 s',
    retrievedAt: '2026-07-12', processingCommand: 'primary OGG: none; fallback: ffmpeg -i crickets.ogg -ar 44100 -ac 1 -b:a 80k MP3',
    distributedSourceSha256: 'a87638cc0e9ce04f986e78702597b3bcf5f726ba043a88a7e90b6cc0cd95eac1',
    sources: [
      { fileName: 'crickets-night-cc0-v1.ogg', mimeType: 'audio/ogg; codecs="vorbis"', codec: 'Vorbis', bitrateKbps: 84, sha256: 'a87638cc0e9ce04f986e78702597b3bcf5f726ba043a88a7e90b6cc0cd95eac1', role: 'primary' },
      { fileName: 'crickets-night-cc0-v1.mp3', mimeType: 'audio/mpeg', codec: 'MP3', bitrateKbps: 80, sha256: 'c1f3a29036fe783d8cab5887c03dba1b9702e5672ea18ad1eefe80062210a9c6', role: 'fallback' },
    ],
    sampleTrim: 3, crossfadeSeconds: 0.8, durationSeconds: 16.17, channels: 1, sampleRate: 48_000,
    decodedBytesEstimate: 3_103_988, integratedLufs: -45.3, truePeakDbtp: -31.3,
  },
  mountainWind: {
    playback: 'loop', sourceTitle: 'Wind blowing into some cactus spine, on the top of the mountain, in the desert of Atacama (Chile).',
    author: 'felix.blume', freesoundId: 156414, sourceUrl: 'https://freesound.org/s/156414/',
    license: 'CC0-1.0', licenseUrl: CC0_1_0_URL, sourceRepository: DYNAMIC_SURROUNDINGS_REPOSITORY,
    sourceCommit: DYNAMIC_SURROUNDINGS_COMMIT, distributedSourceUrl: dsRaw('outside/wind.ogg'),
    distributedVariant: 'DynamicSurroundings selected mono OGG excerpt',
    upstreamOriginalSpec: 'WAV, 96 kHz, 24-bit, stereo MS, 120.06 s; Schoeps CCM41+CCM8 / SD744T',
    distributedSpec: 'Vorbis, 96 kHz, mono, ~93 kbps, 43.65 s', retrievedAt: '2026-07-12',
    processingCommand: 'primary OGG: none; fallback: ffmpeg -i wind.ogg -ar 48000 -ac 1 -b:a 80k MP3',
    distributedSourceSha256: '87011fbc6581571ff5e7b00e4dad6b08c2d76c8d3303a5f6e60168c1653550d9',
    sources: [
      { fileName: 'mountain-wind-cc0-v1.ogg', mimeType: 'audio/ogg; codecs="vorbis"', codec: 'Vorbis', bitrateKbps: 93, sha256: '87011fbc6581571ff5e7b00e4dad6b08c2d76c8d3303a5f6e60168c1653550d9', role: 'primary' },
      { fileName: 'mountain-wind-cc0-v1.mp3', mimeType: 'audio/mpeg', codec: 'MP3', bitrateKbps: 80, sha256: 'af53c5423461bb25b40d1bc004e2d3a48aabb7f921a3989f25e0659cc5085edd', role: 'fallback' },
    ],
    sampleTrim: 2.5, crossfadeSeconds: 1.1, durationSeconds: 43.65, channels: 1, sampleRate: 48_000,
    decodedBytesEstimate: 8_381_026, integratedLufs: -36.3, truePeakDbtp: -17.8,
  },
  arcticWind: {
    playback: 'loop', sourceTitle: 'Howling Wind Ambience', author: 'DBlover', freesoundId: 405601,
    sourceUrl: 'https://freesound.org/s/405601/', license: 'CC0-1.0', licenseUrl: CC0_1_0_URL,
    sourceRepository: DYNAMIC_SURROUNDINGS_REPOSITORY, sourceCommit: DYNAMIC_SURROUNDINGS_COMMIT,
    distributedSourceUrl: dsRaw('outside/arctic_wind.ogg'), distributedVariant: 'DynamicSurroundings OGG derivative',
    upstreamOriginalSpec: 'MP3, 48 kHz, stereo, 85.43 s', distributedSpec: 'Vorbis, 44.1 kHz, stereo, ~141 kbps, 13.64 s',
    retrievedAt: '2026-07-12', processingCommand: 'primary OGG: none; fallback: ffmpeg -i arctic_wind.ogg -ar 44100 -ac 2 -b:a 96k MP3',
    distributedSourceSha256: 'b98a132d5d393388fee6ac4c011bb2fce47cb7425be29e5f3942d6382f04115d',
    sources: [
      { fileName: 'arctic-wind-cc0-v1.ogg', mimeType: 'audio/ogg; codecs="vorbis"', codec: 'Vorbis', bitrateKbps: 141, sha256: 'b98a132d5d393388fee6ac4c011bb2fce47cb7425be29e5f3942d6382f04115d', role: 'primary' },
      { fileName: 'arctic-wind-cc0-v1.mp3', mimeType: 'audio/mpeg', codec: 'MP3', bitrateKbps: 96, sha256: 'd016ee4568fa6c689b8bd07a7ab348dcfd30e23a72722bf25b89eb99aa0e7649', role: 'fallback' },
    ],
    sampleTrim: 1.2, crossfadeSeconds: 0.85, durationSeconds: 13.64, channels: 2, sampleRate: 48_000,
    decodedBytesEstimate: 5_236_472, integratedLufs: -30.4, truePeakDbtp: -8.3,
  },
  thunderNear: {
    playback: 'event', sourceTitle: 'Thunder 1', author: 'Yoyodaman234', freesoundId: 253953,
    sourceUrl: 'https://freesound.org/s/253953/', license: 'CC0-1.0', licenseUrl: CC0_1_0_URL,
    sourceRepository: DYNAMIC_SURROUNDINGS_REPOSITORY, sourceCommit: DYNAMIC_SURROUNDINGS_COMMIT,
    distributedSourceUrl: dsRaw('weather/thunder1.ogg'), distributedVariant: 'DynamicSurroundings mono OGG derivative',
    upstreamOriginalSpec: 'WAV, 44.1 kHz, 16-bit, stereo, 19.70 s', distributedSpec: 'Vorbis, 44.1 kHz, mono, ~75 kbps, 15.81 s',
    retrievedAt: '2026-07-12', processingCommand: 'event primary OGG: none; fallback: ffmpeg mono MP3 80k; no loop transform',
    distributedSourceSha256: '42178c1cfeaf26b5f8b2d41cc8601dbe11b765847d1024416a4ae3093eb418e3',
    sources: [
      { fileName: 'thunder-near-cc0-v1.ogg', mimeType: 'audio/ogg; codecs="vorbis"', codec: 'Vorbis', bitrateKbps: 75, sha256: '42178c1cfeaf26b5f8b2d41cc8601dbe11b765847d1024416a4ae3093eb418e3', role: 'primary' },
      { fileName: 'thunder-near-cc0-v1.mp3', mimeType: 'audio/mpeg', codec: 'MP3', bitrateKbps: 80, sha256: 'ff0106bb7793775ab1b239dddaed9cbcbb008c5df0a1e4ee84b029dcf94e260d', role: 'fallback' },
    ],
    sampleTrim: 0.55, crossfadeSeconds: 0, durationSeconds: 15.81, channels: 1, sampleRate: 48_000,
    decodedBytesEstimate: 3_035_847, integratedLufs: -23.6, truePeakDbtp: 0,
  },
  thunderDistant: {
    playback: 'event', sourceTitle: 'Distant Thunder.wav', author: 'sarson', freesoundId: 195522,
    sourceUrl: 'https://freesound.org/s/195522/', license: 'CC0-1.0', licenseUrl: CC0_1_0_URL,
    sourceRepository: DYNAMIC_SURROUNDINGS_REPOSITORY, sourceCommit: DYNAMIC_SURROUNDINGS_COMMIT,
    distributedSourceUrl: dsRaw('weather/thunder5.ogg'), distributedVariant: 'DynamicSurroundings mono OGG derivative',
    upstreamOriginalSpec: 'WAV, 96 kHz, 24-bit, stereo, 17.24 s', distributedSpec: 'Vorbis, 48 kHz, mono, ~75 kbps, 12.69 s',
    retrievedAt: '2026-07-12', processingCommand: 'event primary OGG: none; fallback: ffmpeg mono MP3 80k; no loop transform',
    distributedSourceSha256: 'a133f8112737b7cbd3390b8d943795317cd9aa8cab5a90708b453d4018b4a73e',
    sources: [
      { fileName: 'thunder-distant-cc0-v1.ogg', mimeType: 'audio/ogg; codecs="vorbis"', codec: 'Vorbis', bitrateKbps: 75, sha256: 'a133f8112737b7cbd3390b8d943795317cd9aa8cab5a90708b453d4018b4a73e', role: 'primary' },
      { fileName: 'thunder-distant-cc0-v1.mp3', mimeType: 'audio/mpeg', codec: 'MP3', bitrateKbps: 80, sha256: '5ec81fd64a34e8c29eac8146ea3231d77907825cc004753caa48c5e460117396', role: 'fallback' },
    ],
    sampleTrim: 0.45, crossfadeSeconds: 0, durationSeconds: 12.69, channels: 1, sampleRate: 48_000,
    decodedBytesEstimate: 2_437_028, integratedLufs: -20.3, truePeakDbtp: 0.1,
  },
  thunderStorm: {
    playback: 'event', sourceTitle: 'NM-Mejor-Lado-Thunder-01.wav', author: 'aaronstar', freesoundId: 194849,
    sourceUrl: 'https://freesound.org/s/194849/', license: 'CC0-1.0', licenseUrl: CC0_1_0_URL,
    sourceRepository: DYNAMIC_SURROUNDINGS_REPOSITORY, sourceCommit: DYNAMIC_SURROUNDINGS_COMMIT,
    distributedSourceUrl: dsRaw('weather/thunder6.ogg'), distributedVariant: 'DynamicSurroundings mono OGG derivative',
    upstreamOriginalSpec: 'WAV, 48 kHz, 16-bit, stereo, 15.65 s', distributedSpec: 'Vorbis, 48 kHz, mono, ~59 kbps, 10.36 s',
    retrievedAt: '2026-07-12', processingCommand: 'event primary OGG: none; fallback: ffmpeg mono MP3 80k; no loop transform',
    distributedSourceSha256: '287a3cf433949354d1767070085d56146f3358b5f924e473c42500b5ab85fced',
    sources: [
      { fileName: 'thunder-storm-cc0-v1.ogg', mimeType: 'audio/ogg; codecs="vorbis"', codec: 'Vorbis', bitrateKbps: 59, sha256: '287a3cf433949354d1767070085d56146f3358b5f924e473c42500b5ab85fced', role: 'primary' },
      { fileName: 'thunder-storm-cc0-v1.mp3', mimeType: 'audio/mpeg', codec: 'MP3', bitrateKbps: 80, sha256: '52a7f9e028a293ba7fe3c84ff2fbcb9c0fd53b6469ef6fdbbf7ec629044f2da2', role: 'fallback' },
    ],
    sampleTrim: 0.35, crossfadeSeconds: 0, durationSeconds: 10.36, channels: 1, sampleRate: 48_000,
    decodedBytesEstimate: 1_988_252, integratedLufs: -18.9, truePeakDbtp: -1,
  },
} as const satisfies Record<string, NatureSampleAsset>;

export type NatureSampleId = keyof typeof NATURE_SAMPLE_ASSETS;

export interface NatureSampleBinding {
  assetIds: readonly NatureSampleId[];
  sampleScale: number;
  proceduralMix: number;
  eventGapMs?: readonly [number, number];
}

export const NATURE_SAMPLE_BINDINGS: Partial<Record<BackgroundSoundType, NatureSampleBinding>> = {
  rain: { assetIds: ['rainRural'], sampleScale: 1, proceduralMix: 0.22 },
  tent: { assetIds: ['rainRural'], sampleScale: 0.82, proceduralMix: 0.3 },
  window: { assetIds: ['rainRural'], sampleScale: 0.72, proceduralMix: 0.32 },
  thunder: { assetIds: ['thunderNear', 'thunderDistant', 'thunderStorm'], sampleScale: 1, proceduralMix: 0.26, eventGapMs: [20_000, 60_000] },
  dthunder: { assetIds: ['thunderDistant', 'thunderStorm'], sampleScale: 0.72, proceduralMix: 0.3, eventGapMs: [28_000, 65_000] },
  stream: { assetIds: ['creekBrook'], sampleScale: 1, proceduralMix: 0.22 },
  waterfall: { assetIds: ['waterfallCaldeiroes'], sampleScale: 1, proceduralMix: 0.2 },
  wave: { assetIds: ['oceanRibeira'], sampleScale: 1, proceduralMix: 0.2 },
  pebbles: { assetIds: ['oceanRibeira'], sampleScale: 0.48, proceduralMix: 0.38 },
  seabirds: { assetIds: ['oceanRibeira'], sampleScale: 0.22, proceduralMix: 0.58 },
  // Sparse/quiet recordings remain texture beneath the procedural body. This
  // avoids a loudness collapse when the asynchronously decoded sample arrives.
  fire: { assetIds: ['fireplaceHearth'], sampleScale: 1, proceduralMix: 0.6 },
  forest: { assetIds: ['forestField'], sampleScale: 1, proceduralMix: 0.65 },
  bamboo: { assetIds: ['mountainWind'], sampleScale: 0.75, proceduralMix: 0.5 },
  birds: { assetIds: ['forestBirdsAlishan'], sampleScale: 1, proceduralMix: 0.62 },
  night: { assetIds: ['nightCrickets'], sampleScale: 0.45, proceduralMix: 0.62 },
  cicadas: { assetIds: ['nightCrickets'], sampleScale: 0.3, proceduralMix: 0.68 },
  blizzard: { assetIds: ['arcticWind'], sampleScale: 0.4, proceduralMix: 0.65 },
};

export type MimeSupport = (mimeType: NatureSampleSource['mimeType']) => boolean;

export const browserSupportsMime: MimeSupport = (mimeType) => {
  if (typeof document === 'undefined') return mimeType === 'audio/mpeg';
  const audio = document.createElement('audio');
  return audio.canPlayType(mimeType) !== '';
};

export const normalizeBasePath = (base: string) => {
  let value = (base.trim() || '/').replace(/\/{2,}/g, '/');
  if (!value.startsWith('/')) value = `/${value}`;
  if (!value.endsWith('/')) value += '/';
  return value;
};

export const natureSampleUrls = (
  assetId: NatureSampleId,
  base = (import.meta as ImportMeta & { readonly env: { readonly BASE_URL: string } }).env.BASE_URL,
  supportsMime: MimeSupport = browserSupportsMime,
) => {
  const root = `${normalizeBasePath(base)}audio/nature/`;
  const sources = NATURE_SAMPLE_ASSETS[assetId].sources;
  const supported = sources.filter((source) => supportsMime(source.mimeType));
  const ordered = supported.length ? supported : sources.filter((source) => source.mimeType === 'audio/mpeg');
  return ordered.map((source) => ({ ...source, url: `${root}${source.fileName}` }));
};

export const sampleLayerGain = (type: BackgroundSoundType, assetId: NatureSampleId, level: number) => {
  const binding = NATURE_SAMPLE_BINDINGS[type];
  if (!binding || !binding.assetIds.includes(assetId)) return 0;
  const safeLevel = Math.max(0, Math.min(1.2, Number.isFinite(level) ? level : 0));
  return safeLevel * binding.sampleScale * NATURE_SAMPLE_ASSETS[assetId].sampleTrim;
};
