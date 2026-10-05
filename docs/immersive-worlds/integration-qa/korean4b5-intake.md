KoreanPlaces PR66 exact-head intake audit — 2026-10-04

Published head `4b5f23ae7a1d37254da369b575837ee28462d9ab` is consistent with tested source `cb0e122e6d7a5f9b65b60f0b0237440ba0ecf935`, tested repository tree `6d1a59833493763c69c0cfb396ce2b54a5abab90`, and published KoreanPlaces subtree `1a2ef94f0fc4446d181dd5bf64e56d80b9f393de`. No new source-integrity or scene-placeholder blocker was found. This supports scoped intake; integrated application acceptance remains a separate gate.

| Check | Independent result |
| --- | --- |
| Source | 23/23 manifest files match both tested and published commits; combined SHA-256 `84843d154aa2e16001ef395ce9c3ebaff459ce0abf104350e86785dc06a2bc57`. |
| Artifacts | All 90 listed artifacts match recorded bytes and SHA-256. |
| Final screenshots | All 19 PNGs decode, match dimensions/hash/size, and were visually opened. All three scenes have distinct, complete 3D compositions. |
| Comparison images | All four composites decode; each baseline/normal/byte crop exactly preserves its input RGB pixels. |
| Accepted appearance | Temple/Scops normal desktop and portrait images are byte-identical to accepted `174aa43`; Rural desktop/portrait/Fold recaptures are also byte-identical. Compared forced-byte frames differ by at most 1/255 per RGB channel, mean absolute difference 0.0115–0.0157. |
| Scope | All 151 changes from original branch head and all 100 changes from accepted `174aa43` remain under `components/immersiveWorlds/koreanPlaces/`. All 212 existing files from main `14940149` are identical, including rainyWindow, oilSea and public assets. Source→published adds 91 documentation/evidence paths and changes no existing source bytes. |
| Dependency contract | Three `0.186.1` package, PMREM generator and WebGLEnvironments hashes match the locally installed dependency. The private PMREM allocation contract has a pinned-source conformance test. |
| CI/build evidence | Exact-head CI `37241927168` completed successfully. Retained build log records typecheck, 25 test files/171 tests, application build, bundle gate and isolated harness build. CI and build success alone do not validate integrated scene behavior. |

| Scene entry | Required / optional props | Visual and interaction identity |
| --- | --- | --- |
| `TempleWorld.tsx` | `active: boolean`; optional `onInteraction`, `static3D`, `subscribeEvents` | `nature:temple_dawn`; bell event. Aged bronze bell, pavilion woodwork, courtyard and temple depth; portrait retains the scene. |
| `ScopsNightWorld.tsx` | Same | `nature:scops_night`; lantern event; existing-engine `scops` subscription triggers call animation. Owl to the left, stream to the right, foreground lantern/porch and layered forest. |
| `RuralSummerNightWorld.tsx` | Same | `nature:rural_summer_night`; grass event. Original warm-window farmhouse, moon, rice field, winding path and utility wires retained. The accepted countryside toon treatment is confined to this scene. |

The environment change prepares explicit full-size CubeUV textures before automatic PMREM could run. It checks both actual output and ping-pong storage before convolution; failed allocations are disposed before fresh byte fallback. Success retains generator/output/source until scene disposal. Target, active cube face/mip, XR, autoClear and toneMapping are restored on success and failure. Temple/Scops receive renderer-backed factories and an owned environment disposer; Rural source, entries, input handling and callback types retain their accepted bytes. No engine/audio scheduler is introduced.

All four retained full-run JSON records use the same source, dependency and six-file bundle manifests; each reports pass with zero captured errors and unchanged manifests during its run. Actual framebuffer observations are:

| Run | Actual output + ping-pong | Format / FBO status | Synchronous cleanup / unmount→context loss |
| --- | --- | --- | --- |
| Temple normal | 384×512 each | RGBA16F / 36053 | 3614.5 / 8616.1 ms |
| Temple forced byte | 384×512 each | RGBA8 / 36053 | 3502.1 / 8505.0 ms |
| Scops normal | 336×256 each | RGBA16F / 36053 | 1807.5 / 6809.5 ms |
| Scops forced byte | 336×256 each | RGBA8 / 36053 | 1569.0 / 6571.1 ms |

Each run has zero target/generation errors, correct texture mapping, before/after target state equality, and a real cube framebuffer sentinel preserving face 2, mip 1, XR, autoClear and toneMapping; caller state is restored afterward. All recorded motion, pause, touch, holder transfer, reduced/static policy, remount and listener cleanup gates pass, and each creates zero AudioContexts. Existing 5000 ms host grace and 20000 ms disposal observation gate are retained.

Evidence limits and remaining gates:

- The six emitted `qa/dist` binaries are not included in the published tree. Their recorded bundle manifest digest is consistent across all four runs and the build log lists the same filenames, but this review did not independently rehash emitted bytes or rebuild them. Record a new integrated source/build/served binding for the final application test.
- These are Chromium/ANGLE SwiftShader runs. Lifecycle checks use a genuine native-RAF motion probe at 683×450, followed by a QA-held scene RAF and controlled real-timestamp rendering. They do not establish physical Fold performance or driver memory reclamation latency.
- The interaction fixture uses Player/Immersive-style sibling chrome rather than the integrated shared components. Native mouse/touch evidence is present; pointercancel and blur are explicitly synthetic, native releasePointerCapture is separate, and actual tab hiding was not observed. Integrated visible/hidden chrome, focus, controls, 1 tap = 1 callback and actual teardown remain application gates.
- Rural was visually recaptured, not given a new full lifecycle run at this source.
- Earlier Temple failures remain failures: source `7abe0da` exceeded the unchanged 20-second disposal gate, and `de0af8d` exceeded a 60-second composited screenshot gate. Both raw records and the prior-run report are preserved and hashed. The final four passes do not retroactively change them or prove a universal cause. The repaired comparison-artifact record is also retained; all final comparison bytes/crops now verify.
- Final application acceptance remains pending, including the separately requested Rain visual refinement and final acceptance.

Machine-readable results: `integrity-audit.json`. This was a read-only source/evidence audit with no new browser/GPU run.
