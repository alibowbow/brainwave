# Nature audio provenance

The nature mixer combines procedural Web Audio synthesis with locally shipped field recordings. Third-party recordings listed here are released under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). The `ruralCrickets` asset is a user-provided field recording and is marked separately. Source, author, exact imported bytes, and processing history are recorded here for auditability and reproducible builds.

The app does not contact Freesound or the source repositories at runtime. Files under `public/audio/nature/` are requested only when a matching sound is enabled. They are deliberately excluded from the PWA precache; after a successful request, the service worker may retain that versioned file in the `nature-audio-v1` runtime cache for later/offline playback. Hybrid layers start their procedural bed immediately and remain available if a file cannot be fetched or decoded. The user-recorded `ruralCrickets` layer is intentionally sample-only and never substitutes the generic night-insect generator.

## Important source distinction

- **Upstream original** means the recording described on the linked Freesound page. It establishes the author, title, license, and original recording specification.
- **Distributed source** means the exact bytes actually imported into this repository. A distributed source is not necessarily the Freesound original.
- Rain, creek, and fireplace use cropped PCM derivatives bundled by [Ambie](https://github.com/jenius-apps/ambie/tree/30601f527e092c77c2408c0d247893b9fa30a20e). They are not copies of the full-length Freesound WAV originals. Ambie's pinned `Data.json` was used to map those derivatives back to their Freesound records.
- Ocean, forest birds, and waterfall are byte-for-byte copies of Freesound's **HQ MP3 previews**. They are explicitly not the original WAV downloads.
- Forest, crickets, wind, arctic wind, and thunder use selected OGG derivatives/excerpts bundled by [DynamicSurroundingsFabric](https://github.com/OreCruncher/DynamicSurroundingsFabric/tree/0d352c7e57bbd39786defdba355156a5bdb850f4). They are not copies of the full Freesound originals. The repository's pinned `CREDITS.md` was used for the source mapping.

Retrieval date for third-party distributed sources: **2026-07-12**. The user-provided `ruralCrickets` recording was added and processed on **2026-08-24**.

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
| `ruralCrickets` | User-provided field recording by `Jun` | M4A/AAC, 48 kHz, mono, about 128 kbps, 60.59 s | Recovered and decoded user M4A, +21 dB gain + limiter, MP3 48 kHz mono 96k, 60.62 s | `a4659b256c675494ae51090ae2c4e13dae9e8f5fab9267dba0949d4029f63f9c` |
| `mountainWind` | [Wind blowing into some cactus spine, on the top of the mountain, in the desert of Atacama (Chile), #156414](https://freesound.org/s/156414/) by `felix.blume` | WAV, 96 kHz, 24-bit, stereo MS, 120.06 s; Schoeps CCM41+CCM8 / SD744T | [DynamicSurroundings `outside/wind.ogg`](https://github.com/OreCruncher/DynamicSurroundingsFabric/blob/0d352c7e57bbd39786defdba355156a5bdb850f4/common/src/main/resources/assets/dsurround/sounds/ambient/outside/wind.ogg), selected mono OGG excerpt: Vorbis 96 kHz, about 93 kbps, 43.65 s | `87011fbc6581571ff5e7b00e4dad6b08c2d76c8d3303a5f6e60168c1653550d9` |
| `arcticWind` | [Howling Wind Ambience, #405601](https://freesound.org/s/405601/) by `DBlover` | MP3, 48 kHz, stereo, 85.43 s | [DynamicSurroundings `outside/arctic_wind.ogg`](https://github.com/OreCruncher/DynamicSurroundingsFabric/blob/0d352c7e57bbd39786defdba355156a5bdb850f4/common/src/main/resources/assets/dsurround/sounds/ambient/outside/arctic_wind.ogg), OGG derivative: Vorbis 44.1 kHz stereo, about 141 kbps, 13.64 s | `b98a132d5d393388fee6ac4c011bb2fce47cb7425be29e5f3942d6382f04115d` |
| `thunderNear` | [Thunder 1, #253953](https://freesound.org/s/253953/) by `Yoyodaman234` | WAV, 44.1 kHz, 16-bit, stereo, 19.70 s | [DynamicSurroundings `weather/thunder1.ogg`](https://github.com/OreCruncher/DynamicSurroundingsFabric/blob/0d352c7e57bbd39786defdba355156a5bdb850f4/common/src/main/resources/assets/dsurround/sounds/ambient/weather/thunder1.ogg), mono OGG derivative: Vorbis 44.1 kHz, about 75 kbps, 15.81 s | `42178c1cfeaf26b5f8b2d41cc8601dbe11b765847d1024416a4ae3093eb418e3` |
| `thunderDistant` | [Distant Thunder.wav, #195522](https://freesound.org/s/195522/) by `sarson` | WAV, 96 kHz, 24-bit, stereo, 17.24 s | [DynamicSurroundings `weather/thunder5.ogg`](https://github.com/OreCruncher/DynamicSurroundingsFabric/blob/0d352c7e57bbd39786defdba355156a5bdb850f4/common/src/main/resources/assets/dsurround/sounds/ambient/weather/thunder5.ogg), mono OGG derivative: Vorbis 48 kHz, about 75 kbps, 12.69 s | `a133f8112737b7cbd3390b8d943795317cd9aa8cab5a90708b453d4018b4a73e` |
| `thunderStorm` | [NM-Mejor-Lado-Thunder-01.wav, #194849](https://freesound.org/s/194849/) by `aaronstar` | WAV, 48 kHz, 16-bit, stereo, 15.65 s | [DynamicSurroundings `weather/thunder6.ogg`](https://github.com/OreCruncher/DynamicSurroundingsFabric/blob/0d352c7e57bbd39786defdba355156a5bdb850f4/common/src/main/resources/assets/dsurround/sounds/ambient/weather/thunder6.ogg), mono OGG derivative: Vorbis 48 kHz, about 59 kbps, 10.36 s | `287a3cf433949354d1767070085d56146f3358b5f924e473c42500b5ab85fced` |

## App encodes and processing


### v2 loudness remaster (2026-07-12)

The v1 encodes preserved each source's original loudness, which left most
recordings 10–30 dB quieter than the procedural beds they blend with — the
samples were effectively inaudible or collapsed layer loudness on arrival.
Every shipped file was re-mastered with `scripts/remaster-samples.mjs`:
Chromium `decodeAudioData` → per-file makeup gain (see each asset's
`processingCommand`) → tanh soft-knee peak limiter (knee −9 dBFS, ceiling
−5 dBFS, ≤ 0.04 % of samples touched) → lamejs MP3 (96–128 kbps). One
universal MP3 now ships per asset (`*-cc0-v2.mp3`), runtime `sampleTrim`
is 1, and the −3 dBTP @ max-fader budget holds by construction.

The Ambie WAV derivatives were gain-adjusted and encoded for the app. The Nox_Sound and BayTsai MP3 previews were copied without modification. DynamicSurroundings OGG files were copied byte-for-byte as the preferred source and transcoded only to create an MP3 fallback. Runtime loop crossfades happen after decoding in Web Audio and do not change any file below. Thunder is played as an irregular event bank and receives no loop transform.

| Asset | Processing performed for this app | Runtime seam |
| --- | --- | --- |
| `rainRural` | `ffmpeg -i rain.wav -af volume=4dB -ar 48000 -ac 1`, then Vorbis q4 and MP3 96k | 1.25 s equal-power crossfade |
| `creekBrook` | `ffmpeg -i creek.wav -af volume=5.8dB -ar 48000 -ac 2`, then Vorbis q4 and MP3 96k; v3 brook voicing: 330 Hz highpass, -3.3 dB, soft-limit, lamejs MP3 112k | 1.10 s equal-power crossfade |
| `fireplaceHearth` | `ffmpeg -i fireplace.wav -af volume=3dB -ar 48000 -ac 2`, then Vorbis q4 and MP3 96k | 0.90 s equal-power crossfade |
| `oceanRibeira` | None; versioned byte-for-byte copy of the Freesound HQ preview | 0.30 s equal-power crossfade |
| `forestBirdsAlishan` | None; versioned byte-for-byte copy of the Freesound HQ preview | 1.20 s equal-power crossfade |
| `waterfallCaldeiroes` | None; versioned byte-for-byte copy of the Freesound HQ preview | 0.25 s equal-power crossfade |
| `forestField` | Preferred OGG copied unchanged; MP3 fallback encoded mono at 44.1 kHz/80k | 1.20 s equal-power crossfade |
| `nightCrickets` | Preferred OGG copied unchanged; MP3 fallback encoded mono at 44.1 kHz/80k | 0.80 s equal-power crossfade |
| `ruralCrickets` | Recovered user M4A/AAC, decoded, +21 dB makeup gain, -5 dBFS limiter, MP3 48 kHz mono 96k | 1.25 s equal-power crossfade |
| `mountainWind` | Preferred OGG copied unchanged; MP3 fallback encoded mono at 48 kHz/80k | 1.10 s equal-power crossfade |
| `arcticWind` | Preferred OGG copied unchanged; MP3 fallback encoded stereo at 44.1 kHz/96k | 0.85 s equal-power crossfade |
| `thunderNear`, `thunderDistant`, `thunderStorm` | Preferred OGG copied unchanged; mono MP3 fallback encoded at 80k; no loop processing | None; one-shot event |

### Loudness, peak, and runtime trim

Measurements below are for the v2 remastered encodes, computed by `scripts/remaster-samples.mjs` at encode time (sample-peak dBFS as the true-peak proxy; integrated loudness approximated from full-file RMS) and rounded to 0.1 dB. `sampleTrim` is a linear per-recording gain, separate from the procedural-source trim.

The final column is deliberately conservative for the encoded-source gain stage: `maximum encoded true peak + 20 log10(sampleTrim × 1.2)`, where 1.2 is the maximum accepted UI layer level and the binding scale is assumed to be 1.0. It is measured before the downstream mix compressor/peak guard/final output gain. Every encoded source remains at or below -3 dBTP under that worst-case assumption. Actual crickets, mountain-wind, arctic-wind, pebbles, seabirds, and distant-thunder bindings use additional scales below 1.0. A runtime equal-power loop seam can theoretically add up to 3.01 dB when head and tail are perfectly correlated; that transient is handled by the shared peak guard and the post-clip output ceiling of -3.03 dBFS. Thunder events do not receive this transform.

| Asset | Encoded integrated loudness | Maximum encoded true peak | `sampleTrim` | Post-trim loudness at level 1.0 | Conservative peak at level 1.2 |
| --- | ---: | ---: | ---: | ---: | ---: |
| `rainRural` | -21.5 LUFS | -5 dBTP | 1.00 | -21.5 LUFS | -3.4 dBTP |
| `creekBrook` | -24.8 LUFS | -5.9 dBTP | 1.00 | -24.8 LUFS | -4.3 dBTP |
| `fireplaceHearth` | -32.2 LUFS | -5 dBTP | 1.00 | -32.2 LUFS | -3.4 dBTP |
| `oceanRibeira` | -20.9 LUFS | -5.7 dBTP | 1.00 | -20.9 LUFS | -4.1 dBTP |
| `forestBirdsAlishan` | -25.8 LUFS | -5 dBTP | 1.00 | -25.8 LUFS | -3.4 dBTP |
| `waterfallCaldeiroes` | -21.3 LUFS | -5.6 dBTP | 1.00 | -21.3 LUFS | -4.0 dBTP |
| `forestField` | -36.8 LUFS | -16 dBTP | 1.00 | -36.8 LUFS | -14.4 dBTP |
| `nightCrickets` | -30.9 LUFS | -13.5 dBTP | 1.00 | -30.9 LUFS | -11.9 dBTP |
| `ruralCrickets` | -25.6 LUFS | -5.1 dBTP | 1.00 | -25.6 LUFS | -4.0 dBTP |
| `mountainWind` | -24.5 LUFS | -6.9 dBTP | 1.00 | -24.5 LUFS | -5.3 dBTP |
| `arcticWind` | -21.7 LUFS | -7.4 dBTP | 1.00 | -21.7 LUFS | -5.8 dBTP |
| `thunderNear` | -29.8 LUFS | -5.6 dBTP | 1.00 | -29.8 LUFS | -4.0 dBTP |
| `thunderDistant` | -26.8 LUFS | -5.7 dBTP | 1.00 | -26.8 LUFS | -4.1 dBTP |
| `thunderStorm` | -22.5 LUFS | -5.7 dBTP | 1.00 | -22.5 LUFS | -4.1 dBTP |

## Shipped-file integrity

The 24 lazy-loaded files total **9,474,217 bytes** (below the 10 MiB checked-in audio budget). Browser capability detection prefers Vorbis where provided and falls back to MP3. The two Nox_Sound assets and the BayTsai bird asset are MP3-only universal sources.

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `arctic-wind-cc0-v2.mp3` | 191,634 | `5f44a7ea070ac301ba04bff481741fd4831cc271d1db92d9e082f5df033e82ab` |
| `creek-brook-cc0-v3.mp3` | 352,183 | `292d85cdf026ac4f02a248006facbf94a21b609f805a3ea92c9ef9309b3c0978` |
| `crickets-night-cc0-v2.mp3` | 194,400 | `1f380ddf267c76577b6bfeaccb49a52d22f74a181662ed143c847999abcaf6e7` |
| `rural-crickets-jun-v1.mp3` | 727,533 | `a4659b256c675494ae51090ae2c4e13dae9e8f5fab9267dba0949d4029f63f9c` |
| `fireplace-hearth-cc0-v2.mp3` | 246,491 | `3caeeb5bb4ef1fa317f18dbf3b77809e27b11e39c9be218ebda0ada376475086` |
| `forest-birds-alishan-cc0-v2.mp3` | 560,640 | `165fc140e0c2d636a5542ec92dc7b5552c4f1ab08964136419c36ffd48d11029` |
| `forest-field-cc0-v2.mp3` | 554,112 | `f6b4edafc65c71633168fdee202c0a764d99366e9fd1df97379f0bc310f1cfa6` |
| `mountain-wind-cc0-v2.mp3` | 524,160 | `3597008fdc94aadddc75fb4e2b8cf8dc36ff796dc3b487a65cb2ebdb14cc0505` |
| `ocean-ribeira-cc0-v2.mp3` | 960,768 | `85edc622c0758d48cc59d118dd06123a69519f6a63d2efb68945b72364745a4c` |
| `rain-rural-cc0-v2.mp3` | 723,744 | `44bf2d32f0af8d5092115b3bec21b47cc20af898b8293ec4888938f74657ae22` |
| `thunder-distant-cc0-v2.mp3` | 178,416 | `fffdab0cc338ef90dcef915871fa95a9380eeb05c953f012d999b4ebbe83e398` |
| `thunder-near-cc0-v2.mp3` | 222,096 | `aa70528270e291b89efd85d9d1102cfa91216bd14faaa7312db0e6c5aa56dafc` |
| `thunder-storm-cc0-v2.mp3` | 145,488 | `b3c802a51391affbed5e8ecdaf5ca0f382205a51919aa87879f7c559bd0bcd5e` |
| `waterfall-caldeiroes-cc0-v2.mp3` | 280,503 | `685584b0df0f59da41fec8c14b04e3c639f0bad12cdb7a1ce5d5ee922907c30c` |

## Runtime bindings

- Rain, tent rain, and window rain share `rainRural` at different binding scales.
- Thunder and distant thunder choose irregularly from the three one-shot thunder events; they do not loop a single strike.
- Stream uses `creekBrook`; waterfall uses `waterfallCaldeiroes`.
- Ocean waves use `oceanRibeira`; pebbles and seabirds reuse it only as a lower-level shore bed while their procedural detail remains prominent.
- Fire and forest use their matching recordings.
- Bamboo uses a reduced `mountainWind` bed. Night uses a reduced `nightCrickets` bed; `ruralCrickets` uses only the user-provided field recording; no generated night-insect substitute is mixed in. Cicadas are deliberately unbound (a cricket recording under the cicada buzz read as the wrong species) and stay fully procedural. Blizzard uses a reduced `arcticWind` texture.
- Birds use `forestBirdsAlishan` at full sample scale while retaining a prominent procedural component for local call detail. Frogs, owl, chimes, singing bowl, drone, fan, and white/pink noise remain procedural. Every hybrid binding retains a procedural component and failure fallback; the sample-only `ruralCrickets` layer is the deliberate exception.

The authoritative machine-readable manifest is [`audioSamples.ts`](./audioSamples.ts). It pins source repositories and commits, processing notes, hashes, codec order, decoded-memory estimates, trims, crossfade durations, and binding scales.

## Perceptual QA gate

All 24 files decode end-to-end without an FFmpeg error, and the 40.032-second Alishan bird preview has no one-second interval below -50 dBFS. Its codec, duration, SHA-256, -30.7 LUFS integrated loudness, and -6.3 dBTP peak were independently rechecked. Automated validation cannot determine whether a distant human, vehicle, aircraft, or distracting species call is perceptually objectionable. The Alishan recording therefore requires one uninterrupted 40-second headphone listen in the deployed preview before this draft is merged.
