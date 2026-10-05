# Quiet PR55 final compatibility intake — read-only audit

Audited 2026-10-04 UTC. **The narrow checked-target compatibility hold is resolved; no concrete intake blocker remains in this scope.** This supersedes the missing-final-evidence hold in `quiet-af147af-intake.md`. No repository source, branch, PR or GPU execution was changed by this audit.

| Identity | Exact value |
| --- | --- |
| Final evidence head | `215f9c849c96f54421495d55d346e90975fb6402` |
| Verified source | `af147afa0c0565dbc0fa5afcfc98fd5c4fc4e408` |
| Accepted visual baseline | `c5a100794084e6230e9fdc8a4c036a02a5813176` |
| Final owned tree | `b1ed9bacfbd19c68f81bd3eef87b5ebbaf21999c` |
| Source manifest, 23 files | `8f9b63019c1195837fb848d473f166b24ae80a17793f42e7370110280f3ed298` |
| Served bundle manifest | `c8747c73ff817cb40b7609e9be539e57f0ca918623a88729f2500adefc45f447` |
| Final-head CI | `37240253507`, independently queried completed/success |

The evidence head adds exactly 22 files beneath `components/immersiveWorlds/quietSanctuaries/qa/compat-evidence/`. Its production and harness source is unchanged from af147af. Recomputed all 23 source hashes against both Git commits, source/bundle manifest digests, all 12 PNG hashes/byte sizes/decoded dimensions, six c5 baseline image byte and RGBA identities, and all 25 historical evidence files. Warm/snow source and the historical verifier also remain exact. Entry points and required `active:boolean` contract remain unchanged. The archived generated bundle bytes are not committed: the source-bound served-bundle report and its manifest were audited, without independently re-serving or rehashing the original bundle bytes.

All 12 actual PNGs were opened: normal/forced-byte meditation desktop and portrait, both motion/interaction pairs, and warm/snow desktop and portrait. The byte path retains reflected arch/trees, water surface geometry and lit metallic bowl; the interaction still contains the water ripple. The six normal preservation stills are exactly the already accepted pictures. This compatibility update does not reopen accepted visual design.

| Evidence | Verified report contents |
| --- | --- |
| Real full-size target checks | Normal and forced-byte, desktop and portrait: environment output + scratch each336×256; reflection1024×1024. All12 records report FBO36053, no prior/current/restoration GL errors, exact caller state and framebuffer restoration. |
| Nondefault allocation probe | Forced-byte cube face4/mip1, attachment32×32, nondefault viewport/scissor/XR/clear state restored and complete. This tests the allocation helper, **not** stock Reflector callback exception restoration. |
| Lifecycle | Normal and byte each15 checks: inactive/static first frame, active pixel change, pause, reduced motion, drag/cancel separation, synthetic visibility, exact holder canvas reuse, three quick remounts, actual GPU context loss after release/grace and fresh later engine. Native lifecycle viewport640×480. |
| Source gates | Published af147af local logs: typecheck,179 tests in25 files (32 new compatibility tests), build and bundle budget exit0. Final evidence-head CI independently passes. |

Retain these limits: isolated owner harness is not shared App integration; explicit QA forced-byte is not unsupported physical GPU certification; synthetic visibility is not OS tab switching; no FPS/thermal/Fold or responsiveness acceptance follows. Mocked unit cases cover missing extensions, incomplete half targets, final byte failure and cleanup policy separately from the real SwiftShader run. The Three r186 private PMREM preparation adapter must be revisited and retested on upgrades. Stock Reflector callback cube-face/mip and nested-render throw restoration remains **nonblocking inventory**, with no observed default-target failure; allocation/probe restoration does not close that distinct item.

Evidence details: `quiet-215f9c8-integrity.json`. Preserved original failure: `attempt-7923eb6-before-render.json` (historical read ENOBUFS before screenshots, corrected by af147af's larger read buffer). No work-session termination is inferred from a published evidence head.
