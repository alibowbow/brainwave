# Third-party nature audio

The nature mixer combines procedural Web Audio synthesis with locally shipped field recordings. Every recording listed here is released under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Attribution is not required by CC0, but the source, author, exact imported bytes, and processing history are recorded here for auditability and reproducible builds.

The app does not contact Freesound or the source repositories at runtime. Files under `public/audio/nature/` are requested only when a matching sound is enabled. They are deliberately excluded from the PWA precache; after a successful request, the service worker may retain that versioned file in the `nature-audio-v1` runtime cache for later/offline playback. Procedural sound starts immediately and remains available if a file cannot be fetched or decoded.

## Important source distinction

- **Upstream original** means the recording described on the linked Freesound page. It establishes the author, title, license, and original recording specification.
- **Distributed source** means the exact bytes actually imported into this repository. A distributed source is not necessarily the Freesound original.
- Rain, creek, and fireplace use cropped PCM derivatives bundled by [Ambie](https://github.com/jenius-apps/ambie/tree/30601f527e092c77c2408c0d247893b9fa30a20e). They are not copies of the full-length Freesound WAV originals. Ambie's pinned `Data.json` was used to map those derivatives back to their Freesound records.
- Ocean, forest birds, and waterfall are byte-for-byte copies of Freesound's **HQ MP3 previews**. They are explicitly not the original WAV downloads.
- Forest, crickets, wind, arctic wind, and thunder use selected OGG derivatives/excerpts bundled by [DynamicSurroundingsFabric](https://github.com/OreCruncher/DynamicSurroundingsFabric/tree/0d352c7e57bbd39786defdba355156a5bdb850f4). They are not copies of the full Freesound originals. The repository's pinned `CREDITS.md` was used for the source mapping.

Retrieval date for all distributed sources: **2026-07-12**.

## Provenance and imported-source integrity

| App asset | Freesound original | Upstream original specification | Exact distributed source used | Distributed-source SHA-256 |
| --- | --- | --- | --- | --- |
| `rainRural` | [Rain heavy 1 (rural), #200270](https://freesound.org/s/200270/) by `jmbphilmes` | WAV, 48 kHz, 24-bit, mono, 400 s | [Ambie `rain.wav`](https://github.com/jenius-apps/ambie/blob/30601f527e092c77c2408c0d247893b9fa30a20e/src/AmbientSounds.Uwp/Assets/Sounds/rain.wav), cropped WAV derivative: PCM 48 kHz/16-bit mono, 60.27 s | `5a68ea94b6e1d83e77db80fbc55d7c2f7abef192879dfb6a9b859c1c3f753fa0` |
| `creekBrook` | [Burbling Brook, #324591](https://freesound.org/s/324591/) by `hargissssound` | WAV, 44.1 kHz, 16-bit, stereo, 185.21 s | [Ambie `creek.wav`](https://github.com/jenius-apps/ambie/blob/30601f527e092c77c2408c0d247893b9fa30a20e/src/AmbientSounds.Uwp/Assets/Sounds/creek.wav), cropped WAV derivative: PCM 44.1 kHz/16-bit stereo, 25.06 s | `3926d7cf09975740dc39baec395a4117ea06a8f4a322978a44798b3245863777` |
| `fireplaceHearth` | [13_Fire in fireplace.wav, #499032](https://freesound.org/s/499032/) by `16FThumaF` | WAV, 48 kHz, 24-bit, stereo, 102.79 s | [Ambie `fireplace.wav`](https://github.com/jenius-apps/ambie/blob/30601f527e092c77c2408c0d247893b9fa30a20e/src/AmbientSounds.Uwp/Assets/Sounds/fireplace.wav), cropped WAV derivative: PCM 48 kHz/16-bit stereo, 17.57 s | `e3c10a5a1c328edbf261a87f66ce150234cabfb88a169ec3f0de70fabc561b20` |
| `oceanRibeira` | [Ambiance_Ocean_Ribeira_Grande_Loop_Stereo_02, #829629](https://freesound.org/s/829629/) by `Nox_Sound` | WAV, 96 kHz, 24-bit, stereo, 60.00 s; Sony PCM-D100 field recording | [Freesound HQ MP3 preview](https://cdn.freesound.org/previews/829/829629_9250976-hq.mp3), MP3 48 kHz stereo, about 179 kbps, 60.05 s; **not the original WAV** | `53baa509447a5207ef394ee771ffd85fa383cd1f4b22ce1b2e93de5bedb1b647` |
| `forestBirdsAlishan` | [Birds in Alishan National Scenic Area, Taiwan, #860231](https://freesound.org/s/860231/) by `BayTsai` | WAV, 48 kHz, 32-bit, stereo, 40.00 s; dawn field recording at Alishan Ogasawara | [Freesound HQ MP3 preview](https://cdn.freesound.org/previews/860/860231_17078888-hq.mp3), MP3 48 kHz stereo, about 183 kbps, 40.032 s; **not the original WAV** | `c0ba967a41eab862b8fe88b316a9702f8c62d400e635545acd51de4cf6c99802` |
| `waterfallCaldeiroes` | [Ambiance_Waterfall_Ribeira_dos_Caldeirões_Loop_Stereo, #829633](https://freesound.org/s/829633/) by `Nox_Sound` | WAV, 96 kHz, 24-bit, stereo, 20.00 s; Sony PCM-D100 field recording | [Freesound HQ MP3 preview](https://cdn.freesound.org/previews/829/829633_9250976-hq.mp3), MP3 48 kHz stereo, about 188 kbps, 20.04 s; **not the original WAV** | `27214225e23c7bf2090e212ef24a37317fba7ffe56db858ff175bb4d74fdbbee` |
| `forestField` | [001_forrest.wav, #262037](https://freesound.org/s/262037/) by `joepsporck` | WAV, 44.1 kHz, 24-bit, stereo, 53 s | [DynamicSurroundings `outside/forest.ogg`](https://github.com/OreCruncher/DynamicSurroundingsFabric/blob/0d352c7e57bbd39786defdba355156a5bdb850f4/common/src/main/resources/assets/dsurround/sounds/ambient/outside/forest.ogg), selected mono OGG excerpt: Vorbis 44.1 kHz, about 90 kbps, 46.11 s | `0159139e1a6591f5d82ce36b1c6d0edbfd1b3071edf93d9627e0ad900edd0f94` |
| `nightCrickets` | [Soft, Chilled Crickets Field Recording, #202749](https://freesound.org/s/202749/) by `rayjensen` | FLAC, 44.1 kHz, 16-bit, stereo, 16.17 s | [DynamicSurroundings `outside/crickets.ogg`](https://github.com/OreCruncher/DynamicSurroundingsFabric/blob/0d352c7e57bbd39786defdba355156a5bdb850f4/common/src/main/resources/assets/dsurround/sounds/ambient/outside/crickets.ogg), mono OGG derivative: Vorbis 44.1 kHz, about 84 kbps, 16.17 s | `a87638cc0e9ce04f986e78702597b3bcf5f726ba043a88a7e90b6cc0cd95eac1` |
| `mountainWind` | [Wind blowing into some cactus spine, on the top of the mountain, in the desert of Atacama (Chile), #156414](https://freesound.org/s/156414/) by `felix.blume` | WAV, 96 kHz, 24-bit, stereo MS, 120.06 s; Schoeps CCM41+CCM8 / SD744T | [DynamicSurroundings `outside/wind.ogg`](https://github.com/OreCruncher/DynamicSurroundingsFabric/blob/0d352c7e57bbd39786defdba355156a5bdb850f4/common/src/main/resources/assets/dsurround/sounds/ambient/outside/wind.ogg), selected mono OGG excerpt: Vorbis 96 kHz, about 93 kbps, 43.65 s | `87011fbc6581571ff5e7b00e4dad6b08c2d76c8d3303a5f6e60168c1653550d9` |
| `arcticWind` | [Howling Wind Ambience, #405601](https://freesound.org/s/405601/) by `DBlover` | MP3, 48 kHz, stereo, 85.43 s | [DynamicSurroundings `outside/arctic_wind.ogg`](https://github.com/OreCruncher/DynamicSurroundingsFabric/blob/0d352c7e57bbd39786defdba355156a5bdb850f4/common/src/main/resources/assets/dsurround/sounds/ambient/outside/arctic_wind.ogg), OGG derivative: Vorbis 44.1 kHz stereo, about 141 kbps, 13.64 s | `b98a132d5d393388fee6ac4c011bb2fce47cb7425be29e5f3942d6382f04115d` |
| `thunderNear` | [Thunder 1, #253953](https://freesound.org/s/253953/) by `Yoyodaman234` | WAV, 44.1 kHz, 16-bit, stereo, 19.70 s | [DynamicSurroundings `weather/thunder1.ogg`](https://github.com/OreCruncher/DynamicSurroundingsFabric/blob/0d352c7e57bbd39786defdba355156a5bdb850f4/common/src/main/resources/assets/dsurround/sounds/ambient/weather/thunder1.ogg), mono OGG derivative: Vorbis 44.1 kHz, about 75 kbps, 15.81 s | `42178c1cfeaf26b5f8b2d41cc8601dbe11b765847d1024416a4ae3093eb418e3` |
| `thunderDistant` | [Distant Thunder.wav, #195522](https://freesound.org/s/195522/) by `sarson` | WAV, 96 kHz, 24-bit, stereo, 17.24 s | [DynamicSurroundings `weather/thunder5.ogg`](https://github.com/OreCruncher/DynamicSurroundingsFabric/blob/0d352c7e57bbd39786defdba355156a5bdb850f4/common/src/main/resources/assets/dsurround/sounds/ambient/weather/thunder5.ogg), mono OGG derivative: Vorbis 48 kHz, about 75 kbps, 12.69 s | `a133f8112737b7cbd3390b8d943795317cd9aa8cab5a90708b453d4018b4a73e` |
| `thunderStorm` | [NM-Mejor-Lado-Thunder-01.wav, #194849](https://freesound.org/s/194849/) by `aaronstar` | WAV, 48 kHz, 16-bit, stereo, 15.65 s | [DynamicSurroundings `weather/thunder6.ogg`](https://github.com/OreCruncher/DynamicSurroundingsFabric/blob/0d352c7e57bbd39786defdba355156a5bdb850f4/common/src/main/resources/assets/dsurround/sounds/ambient/weather/thunder6.ogg), mono OGG derivative: Vorbis 48 kHz, about 59 kbps, 10.36 s | `287a3cf433949354d1767070085d56146f3358b5f924e473c42500b5ab85fced` |

## App encodes and processing

The Ambie WAV derivatives were gain-adjusted and encoded for the app. The Nox_Sound and BayTsai MP3 previews were copied without modification. DynamicSurroundings OGG files were copied byte-for-byte as the preferred source and transcoded only to create an MP3 fallback. Runtime loop crossfades happen after decoding in Web Audio and do not change any file below. Thunder is played as an irregular event bank and receives no loop transform.

| Asset | Processing performed for this app | Runtime seam |
| --- | --- | --- |
| `rainRural` | `ffmpeg -i rain.wav -af volume=4dB -ar 48000 -ac 1`, then Vorbis q4 and MP3 96k | 1.25 s equal-power crossfade |
| `creekBrook` | `ffmpeg -i creek.wav -af volume=5.8dB -ar 48000 -ac 2`, then Vorbis q4 and MP3 96k | 1.10 s equal-power crossfade |
| `fireplaceHearth` | `ffmpeg -i fireplace.wav -af volume=3dB -ar 48000 -ac 2`, then Vorbis q4 and MP3 96k | 0.90 s equal-power crossfade |
| `oceanRibeira` | None; versioned byte-for-byte copy of the Freesound HQ preview | 0.30 s equal-power crossfade |
| `forestBirdsAlishan` | None; versioned byte-for-byte copy of the Freesound HQ preview | 1.20 s equal-power crossfade |
| `waterfallCaldeiroes` | None; versioned byte-for-byte copy of the Freesound HQ preview | 0.25 s equal-power crossfade |
| `forestField` | Preferred OGG copied unchanged; MP3 fallback encoded mono at 44.1 kHz/80k | 1.20 s equal-power crossfade |
| `nightCrickets` | Preferred OGG copied unchanged; MP3 fallback encoded mono at 44.1 kHz/80k | 0.80 s equal-power crossfade |
| `mountainWind` | Preferred OGG copied unchanged; MP3 fallback encoded mono at 48 kHz/80k | 1.10 s equal-power crossfade |
| `arcticWind` | Preferred OGG copied unchanged; MP3 fallback encoded stereo at 44.1 kHz/96k | 0.85 s equal-power crossfade |
| `thunderNear`, `thunderDistant`, `thunderStorm` | Preferred OGG copied unchanged; mono MP3 fallback encoded at 80k; no loop processing | None; one-shot event |

### Loudness, peak, and runtime trim

Measurements below were reproduced with FFmpeg 6.1.1 using `ebur128=peak=true` and are rounded to 0.1 dB. A range represents the OGG and MP3 encodes; the maximum true peak is the louder encoded variant. `sampleTrim` is a linear per-recording gain, separate from the procedural-source trim.

The final column is deliberately conservative for the encoded-source gain stage: `maximum encoded true peak + 20 log10(sampleTrim × 1.2)`, where 1.2 is the maximum accepted UI layer level and the binding scale is assumed to be 1.0. It is measured before the downstream mix compressor/peak guard/final output gain. Every encoded source remains at or below -3 dBTP under that worst-case assumption. Actual crickets, mountain-wind, arctic-wind, pebbles, seabirds, and distant-thunder bindings use additional scales below 1.0. A runtime equal-power loop seam can theoretically add up to 3.01 dB when head and tail are perfectly correlated; that transient is handled by the shared peak guard and the post-clip output ceiling of -3.03 dBFS. Thunder events do not receive this transform.

| Asset | Encoded integrated loudness | Maximum encoded true peak | `sampleTrim` | Post-trim loudness at level 1.0 | Conservative peak at level 1.2 |
| --- | ---: | ---: | ---: | ---: | ---: |
| `rainRural` | -29.1 LUFS | -3.1 dBTP | 0.82 | -30.8 LUFS | -3.2 dBTP |
| `creekBrook` | -25.8 to -25.7 LUFS | -3.1 dBTP | 0.82 | -27.5 to -27.4 LUFS | -3.2 dBTP |
| `fireplaceHearth` | -35.4 to -34.9 LUFS | -1.8 dBTP | 0.70 | -38.5 to -38.0 LUFS | -3.3 dBTP |
| `oceanRibeira` | -20.8 LUFS | -7.7 dBTP | 0.70 | -23.9 LUFS | -9.2 dBTP |
| `forestBirdsAlishan` | -30.7 LUFS | -6.3 dBTP | 1.00 | -30.7 LUFS | -4.7 dBTP |
| `waterfallCaldeiroes` | -13.3 LUFS | -2.8 dBTP | 0.29 | -24.1 LUFS | -12.0 dBTP |
| `forestField` | -51.2 to -50.7 LUFS | -34.0 dBTP | 4.00 | -39.2 to -38.7 LUFS | -20.4 dBTP |
| `nightCrickets` | -45.4 to -45.0 LUFS | -31.3 dBTP | 3.00 | -35.9 to -35.5 LUFS | -20.2 dBTP |
| `mountainWind` | -36.6 to -36.2 LUFS | -17.8 dBTP | 2.50 | -28.6 to -28.2 LUFS | -8.3 dBTP |
| `arcticWind` | -30.9 to -30.5 LUFS | -8.3 dBTP | 1.20 | -29.3 to -28.9 LUFS | -5.1 dBTP |
| `thunderNear` | -23.6 to -23.2 LUFS | 0.0 dBTP | 0.55 | -28.8 to -28.4 LUFS | -3.6 dBTP |
| `thunderDistant` | -20.6 to -20.2 LUFS | +0.1 dBTP | 0.45 | -27.5 to -27.1 LUFS | -5.3 dBTP |
| `thunderStorm` | -19.0 to -18.6 LUFS | -1.0 dBTP | 0.35 | -28.1 to -27.7 LUFS | -8.5 dBTP |

## Shipped-file integrity

The 23 lazy-loaded files total **8,746,684 bytes** (below the 10 MiB checked-in audio budget). Browser capability detection prefers Vorbis where provided and falls back to MP3. The two Nox_Sound assets and the BayTsai bird asset are MP3-only universal sources.

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `arctic-wind-cc0-v1.mp3` | 164,616 | `d016ee4568fa6c689b8bd07a7ab348dcfd30e23a72722bf25b89eb99aa0e7649` |
| `arctic-wind-cc0-v1.ogg` | 240,911 | `b98a132d5d393388fee6ac4c011bb2fce47cb7425be29e5f3942d6382f04115d` |
| `creek-brook-cc0-v1.mp3` | 301,581 | `79e42cae93ec5888e3b6efb46660d0b2946a6a80c92a4483b73655b03a8bdf9e` |
| `creek-brook-cc0-v1.ogg` | 397,726 | `286dfc9da22474d9058d54c576d5bd62d199067c535aa8a96dba16591548b94f` |
| `crickets-night-cc0-v1.mp3` | 162,265 | `c1f3a29036fe783d8cab5887c03dba1b9702e5672ea18ad1eefe80062210a9c6` |
| `crickets-night-cc0-v1.ogg` | 170,194 | `a87638cc0e9ce04f986e78702597b3bcf5f726ba043a88a7e90b6cc0cd95eac1` |
| `fireplace-hearth-cc0-v1.mp3` | 211,812 | `87efb2848992eb218f69fe28b96364d74a0ae826464d7e08c87c09b91a81f94a` |
| `fireplace-hearth-cc0-v1.ogg` | 305,765 | `f778e08f1bd0637ed8cfc29df926fe69fb53c275092a49889486c67617a318a2` |
| `forest-birds-alishan-cc0-v1.mp3` | 917,760 | `c0ba967a41eab862b8fe88b316a9702f8c62d400e635545acd51de4cf6c99802` |
| `forest-field-cc0-v1.mp3` | 461,890 | `392b4175887a1ffad1dc80061f69ccc399815a6b8726d7c3fb58327b862c33c9` |
| `forest-field-cc0-v1.ogg` | 520,793 | `0159139e1a6591f5d82ce36b1c6d0edbfd1b3071edf93d9627e0ad900edd0f94` |
| `mountain-wind-cc0-v1.mp3` | 437,085 | `af53c5423461bb25b40d1bc004e2d3a48aabb7f921a3989f25e0659cc5085edd` |
| `mountain-wind-cc0-v1.ogg` | 505,295 | `87011fbc6581571ff5e7b00e4dad6b08c2d76c8d3303a5f6e60168c1653550d9` |
| `ocean-ribeira-cc0-v1.mp3` | 1,342,848 | `53baa509447a5207ef394ee771ffd85fa383cd1f4b22ce1b2e93de5bedb1b647` |
| `rain-rural-cc0-v1.mp3` | 724,077 | `6e5cebe23d0c71be566dfd5e36610d0fa81491c8546baa289cf3ed71579aa0c3` |
| `rain-rural-cc0-v1.ogg` | 677,763 | `d1c9c7aa123dbc7161caa7fbb67e0ccbbe49b9bcb6fe39897a70149291eff675` |
| `thunder-distant-cc0-v1.mp3` | 127,485 | `5ec81fd64a34e8c29eac8146ea3231d77907825cc004753caa48c5e460117396` |
| `thunder-distant-cc0-v1.ogg` | 119,370 | `a133f8112737b7cbd3390b8d943795317cd9aa8cab5a90708b453d4018b4a73e` |
| `thunder-near-cc0-v1.mp3` | 158,870 | `ff0106bb7793775ab1b239dddaed9cbcbb008c5df0a1e4ee84b029dcf94e260d` |
| `thunder-near-cc0-v1.ogg` | 148,437 | `42178c1cfeaf26b5f8b2d41cc8601dbe11b765847d1024416a4ae3093eb418e3` |
| `thunder-storm-cc0-v1.mp3` | 104,205 | `52a7f9e028a293ba7fe3c84ff2fbcb9c0fd53b6469ef6fdbbf7ec629044f2da2` |
| `thunder-storm-cc0-v1.ogg` | 76,232 | `287a3cf433949354d1767070085d56146f3358b5f924e473c42500b5ab85fced` |
| `waterfall-caldeiroes-cc0-v1.mp3` | 469,704 | `27214225e23c7bf2090e212ef24a37317fba7ffe56db858ff175bb4d74fdbbee` |

## Runtime bindings

- Rain, tent rain, and window rain share `rainRural` at different binding scales.
- Thunder and distant thunder choose irregularly from the three one-shot thunder events; they do not loop a single strike.
- Stream uses `creekBrook`; waterfall uses `waterfallCaldeiroes`.
- Ocean waves use `oceanRibeira`; pebbles and seabirds reuse it only as a lower-level shore bed while their procedural detail remains prominent.
- Fire and forest use their matching recordings.
- Bamboo uses a reduced `mountainWind` bed. Night and cicadas use reduced `nightCrickets` beds. Blizzard uses a reduced `arcticWind` texture.
- Birds use `forestBirdsAlishan` at full sample scale while retaining a prominent procedural component for local call detail. Frogs, owl, chimes, singing bowl, drone, fan, and white/pink noise remain procedural. Every hybrid binding also retains a procedural component and failure fallback.

The authoritative machine-readable manifest is [`audioSamples.ts`](./audioSamples.ts). It pins source repositories and commits, processing notes, hashes, codec order, decoded-memory estimates, trims, crossfade durations, and binding scales.

## Perceptual QA gate

All 23 files decode end-to-end without an FFmpeg error, and the 40.032-second Alishan bird preview has no one-second interval below -50 dBFS. Its codec, duration, SHA-256, -30.7 LUFS integrated loudness, and -6.3 dBTP peak were independently rechecked. Automated validation cannot determine whether a distant human, vehicle, aircraft, or distracting species call is perceptually objectionable. The Alishan recording therefore requires one uninterrupted 40-second headphone listen in the deployed preview before this draft is merged.
