CozyRooms PR65 final scoped intake — 2026-10-05

**The requested final source/evidence intake checks pass.** Published head `c8084e10fb49a8d84645d02174443e83a41e3073`, repository tree `15068998553ade3cfcbfbee923dd1e79bfb723fe`, owned CozyRooms subtree `e7c041792f3df940b78ee9f40efa4e7f2b2a6720`. Exact-head CI `37247642386` / run319 completed successfully. This is the new explicitly revised static-completion contract; earlier failed contracts remain failed.

- All 14 production file hashes and their aggregate match `e3e7a278bad36a8d12f80403b03972728c11fa07436335346ff796d8f664edfa`. All 79 new artifacts match byte lengths, hashes and aggregate `59268f2ba945c2a6b5ae27ec3047a11417d12a83ddcc8634c6b50d558bfa54d4`.
- All 82 changed paths versus `2a8f9b9` stay under `components/immersiveWorlds/cozyRooms/`; `engine.ts` is the sole production delta. The other 13 production files are unchanged. All 450 changes versus original PR59 head also stay in that folder. Shared core, protected scenes, public assets and other owners are unchanged.
- All 344 prior evidence/report files remain byte-identical, including old pause, native-image and Winter timeout failures. All 11 final normal PNG hashes/lengths/decode checks pass; the 10 fixed poses independently match approved `6ba4eee` bytes. No new aesthetic gate was introduced.

The engine fix preserves a real active-resize image when pause follows a busy fence with positive animation pending. Requested, submitted and completed image revisions are distinct; a fence acknowledges only the revision actually admitted. The final paused fence is polled to a genuine signaled result without another draw or scene-time advance, then polling stops. The revised tests require this state, rather than waiting for time alone: same healthy paused engine/canvas, fixed scene time, matching positive revisions, all submitted batches signaled, no pending size/image/fence/poll work, and then 180 ms exact frame/time/revision stability.

| Requested evidence | Verified result |
| --- | --- |
| Revised four-world suite | Four raw reports pass, 26 completed labels each, 104 total. Independently checked all 100 acknowledged-image records and all 100 stability pairs from raw progress logs: Relax23, Sleep25, Nap24, Winter28. All four active-resize sequences remain covered. |
| Original Winter fresh-ready condition | Original 120000 ms ready selector remains separate from later image acknowledgement; observed 1412.3 ms in the revised sequence. |
| Two fresh Winter cycles | Three distinct engine/canvas identities; two trusted native Enter/click sequences each produce exactly one callback and one rendered frame at fixed scene time; final disposal3/3. |
| Actual context loss | Both running and paused extension-induced losses record trusted context-loss events, failed UI and old canvas stop/detach; fresh identities and native recovery input pass, final disposal4/4. The running-loss record preserves one unconfirmed batch rather than declaring it completed. |
| Four-world motion-only pixels | Same source/bundle, 12 actual frames per scene and positive scene-time advance. Independently decoded the eight PNGs and recomputed changed pixels: Relax85072, Sleep16507, Nap67022, Winter30343; all match the published numerical evidence. |

All seven final raw suite/cycle/loss/motion reports have `passed:true`, `revisedContract:true`, `originalGateClaim:false`, no captured errors, and the same source/bundle identity. Source and shared-harness binding hashes match published Git blobs. Their preparation-time Git label `2a8f9b9` accompanies the new exact source hashes and is not evidence that old runtime passed.

| World | Default entry | Props / callback |
| --- | --- | --- |
| `relax` | `HearthWorld.tsx` | Required `active:boolean`; optional `onInteraction`, `static3D`, `className` |
| `sleep_prep` | `SleepRoomWorld.tsx` | Same |
| `power_nap` | `NapTerraceWorld.tsx` | Same |
| `nature:winter_lodge` | `WinterLodgeWorld.tsx` | Same |

Each default entry and the props contract are unchanged. Interaction callback remains `{world, type, intensity}`, with bounded intensity and no new AudioContext.

Limits retained: the 18 emitted QA bundle binaries are not published, so bundle `0b0c53ed7a574d44f301bbd6ccaf4f72b9410616eaebd46a299551b927e5e516` is verified as a consistent recorded manifest, not independently rebuilt/rehashed bytes. These are isolated Chromium/SwiftShader owner runs with diagnostic polling; native input, synthetic pointer/hidden stimuli and actual extension loss remain distinguished. Physical device/Fold performance, real tab backgrounding, GPU reclamation and latest shared-core/full-app routing/audio are not established by these artifacts. The 5000 ms host grace is distinct from disposal-body timing and GPU reclamation. No new test, render or source edit was performed by this audit; final application acceptance remains the existing integration step.

Detailed independent checks: `cozy65-integrity-audit.json`.
