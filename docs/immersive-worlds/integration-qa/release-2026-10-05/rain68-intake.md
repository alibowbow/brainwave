# Rain PR68 final intake: ready for central owner

Finite read-only intake **passes** for public head `633c55f1e6fbacfe28ceb770ad9fecb40fefaa7c`. No repository source, branch, PR or renderer was changed, and no new GPU test was run. The user's accepted 19.536-second software-renderer limitation is preserved without adding a new gate.

| Identity / scope | Verified value |
|---|---|
| Public source commit | `ae6e9a3d3b6671306eb24e83d9707537ba9c1615` |
| Final head | `633c55f1e6fbacfe28ceb770ad9fecb40fefaa7c` |
| Full root tree | `9319db7e20a974f6c397c9a3a68171b9e719ee42` |
| Rain owner subtree | `83c47a43edef54302520edb6cf194302e720dfb2` |
| Original PR53/base | `0dc8e935fb950bf43ede4ab96b3623649d2bc37f` |
| Changed paths | 81, all inside `components/immersiveWorlds/rainShelters/**` |
| Runtime delta | 5 files: ShelterEngine, gardenFoliage, renderTargets, storm, window |
| Original evidence | All 32 files unchanged |
| Exact-head CI | Run `37247185682`, number 318: completed/success |
| Automatic Vercel | success |

All four default entries remain unchanged and require only `active:boolean`. `onInteraction` and `static3D` are optional.

| ID | Default entry under rainShelters |
|---|---|
| `nature:tent_rain` | `RainTentWorld.tsx` |
| `nature:window_rain` | `GardenWindowWorld.tsx` |
| `nature:monsoon_eaves` | `MonsoonPorchWorld.tsx` |
| `amb:summer_storm` | `SummerStormWorld.tsx` |

## Evidence intake

- Source 29/29 file hashes and aggregate match. Source-map aggregate: `b0dae68a41e2ca1c3f0d240c32f72e536106022df313455577e13cee696336bc`.
- Artifact manifest 67/67 entries match, including all 48 PNG hashes/dimensions. Five preserved gzip bundles match both compressed and decompressed hashes.
- All 48 after segments served the validated `index-DeYwlQ_G.js`, SHA-256 `5c29aea525e13347c1e96af3265aa26150b430f2ed1488da53070c345cf9d8a8`, with matching CSS. The earlier C4gzi bundle remains explicitly unserved prior-build evidence.
- 56/56 browser segments passed: 8 baseline captures, 16 after captures and 32 compatibility/input/motion/lifecycle segments. The after results contain 184 checks, with no failed segments/errors. This remains segmented isolated-scene evidence, not one continuous App run.
- All 16 lifecycle cycles passed the unchanged 20000 ms removal-to-dispose-exit bound, including 5000 ms host retention. Maximum 19536.2 ms is the accepted measured limit, not a new blocker or physical GPU reclamation claim.
- Actual full-size target checks and normal/byte evidence support the owned fallback change; half-only/incomplete-device policy cases remain labeled mocked GPU boundaries. Source selects half-float only with genuine renderability capability and full-size complete storage, disposes failed storage before byte allocation, and preserves target/face/mip on exceptional paths.

Machine audit: `rain68-hash-audit.json`.

## Actual images opened

Opened 16 native files, including final normal and byte Garden/Storm desktop and portrait, final Tent/Porch desktop and portrait, and baseline desktop comparisons.

- Garden shows the requested curved broad leaves and restrained dew, replacing the former prominent green beads. Window frame, sill, bowl, flower positions and garden layout remain.
- Storm shows darker bent wet blades with varied clumps and a deeper, varied tree line. Shelter, camera, rope, pot and portrait lantern composition remain.
- Normal/byte views retain the same visible composition/materials. Hash/pixel evidence bounds Garden's difference to 3/255; other normal/byte pairs are identical.
- Tent and Porch remain distinct complete scenes and visibly preserve their previous compositions. Desktop/portrait before, normal-after and byte-after bytes are identical.

No additional aesthetic criterion or optimization requirement was introduced. This head is ready for the central owner's authorized intake; actual App integration and final delivery remain the central owner's work.
