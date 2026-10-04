# Meditation checked-target compatibility evidence

Verified source commit: `af147afa0c0565dbc0fa5afcfc98fd5c4fc4e408`. These files are an evidence-only addition on the same draft PR55 branch. Accepted visual baseline: `c5a100794084e6230e9fdc8a4c036a02a5813176`.

- Source manifest SHA-256: `8f9b63019c1195837fb848d473f166b24ae80a17793f42e7370110280f3ed298`.
- Built and actually served QA bundle SHA-256: `c8747c73ff817cb40b7609e9be539e57f0ca918623a88729f2500adefc45f447`.
- [Full source/bundle/PNG and FBO report](target-compatibility.json).
- [Independent byte/hash/scope audit](hash-audit.json).
- [Exact-source local gates](local-gates.json): typecheck, 25 unit files / 179 tests, production build, bundle budgets all pass. The 32 new compatibility units cover capability selection, incomplete-half/failed-byte policy, cleanup, state restoration and PMREM pair ordering.
- [CI status snapshot](ci-status.json). CI is separate from the owned real-render run; follow the linked run for its current result.

## Actual rendering and preservation

All 12 PNGs were freshly captured from Chromium 153 / ANGLE SwiftShader. Full desktop is 1280×800, portrait 390×844. Normal and explicit QA forced-byte meditation each retain a 1024×1024 reflection and 336×256 CubeUV environment; BOTH environment output and scratch were checked before generation. All real checked targets report `FRAMEBUFFER_COMPLETE` (`0x8cd5`), no GL errors, and restored caller state. The QA-only extra probe starts from a complete byte cube target, face 4 / mip 1, with nondefault viewport/scissor/XR/clear state, and verifies its exact framebuffer/state restoration. Native extension and GL entry points remain untouched.

The normal meditation, warm-heart and snow-village desktop/portrait PNGs are **byte-for-byte identical** to all six accepted baseline PNGs. Warm/snow source and the historical evidence/verifier are unchanged. No camera, material, lighting, resolution, DPR or frame-policy redesign was made. All 12 actual PNGs were directly inspected. The forced-byte bowl retains indirect highlights and the basin retains actual reflected geometry; the byte environment is never null.

Both meditation paths pass real motion/pixel change, bounded raycast water touch, drag/out-and-back/cancel separation, inactive and static first frame, pause, reduced motion, synthetic hidden resume, exact canvas/engine transfer between holders, three rapid remounts, actual released-context loss after the five-second grace, and fresh engine/checked targets after later remount. Lifecycle viewports are native 640×480; production quality settings are unchanged. Browser and preview server are closed at completion. No runtime/console/GL errors were observed.

## Limits and recovered failure

Forced-byte is an explicit QA builder selection, **not an unsupported physical GPU simulation or real-device certification**. No-extension, half-only, advertised-but-incomplete and final-byte-failure cases are deterministic unit tests with mocked boundaries; the actual browser run does not manufacture incomplete FBOs or mask extensions. Synthetic visibility is not an OS tab-switch test; holder transfer is the owned isolated harness, not shared production player integration. There is no physical Fold/FPS/thermal claim and no claim that a black screen was observed on a specific device.

The first full verifier attempt at 7923eb6 stopped **before screenshots** because a historical evidence read exceeded Node's default child-process output buffer (`ENOBUFS`). [That failed attempt](attempt-7923eb6-before-render.json) is retained. The QA-only correction at af147af raises the read limit to 32 MiB; the complete rerun passed. Build logs retain the existing large-chunk advisory; enforced bundle budgets pass.

## Integration handoff

Use the same PR55 source plus this evidence commit. Public entries/props are unchanged: `MeditationCourtWorld.tsx`, `WarmHeartWorld.tsx`, `SnowVillageWorld.tsx`; only `active:boolean` is required. Production meditation uses automatic checked target selection. Byte retry releases failed storage first; final byte failure propagates to the existing host failure state. Retained reflection/environment outputs and temporary PMREM resources have explicit disposal ownership.

The PMREM preparation adapter intentionally guards the installed Three r186 private allocation surface. Revisit the adapter when upgrading Three; do not remove the guard or change output texture type after generation. Shared host/registry/player/audio, other owner folders, protected rainyWindow/oilSea, packages, CI and main are unchanged. Keep PR55 draft; this Work does not merge. Shared production integration remains the separate Work's task.

## PNG hashes

| Actual PNG | SHA-256 |
| --- | --- |
| [meditation-normal-desktop.png](meditation-normal-desktop.png) | `b1e04a5aecea959d8c3d40ea380053e17e8f3769e6e8d13f03e9231c27212fb6` |
| [meditation-normal-portrait.png](meditation-normal-portrait.png) | `c2200432b93168bca6e266e8bcfe79527ebafe1bc392fea02d2bb3545ca045ed` |
| [meditation-forced-byte-desktop.png](meditation-forced-byte-desktop.png) | `96af8c81b6a6789c30b6fc18494d720114dc911cefc3a8aa957bb8ecff1946c6` |
| [meditation-forced-byte-portrait.png](meditation-forced-byte-portrait.png) | `e2f477b1ec222c07950d7854bb4f1f506f468442ccafc98d03d02d7c9ee1b066` |
| [warm-heart-desktop.png](warm-heart-desktop.png) | `a3bb87cb77e6172a7213baa71a89ebdbc329d90faf90d1f3c8f099124e66ceaf` |
| [warm-heart-portrait.png](warm-heart-portrait.png) | `ac75d8d628759a4df5dcab94623f91bf56ab1a928bcf53f9162e7739004fd473` |
| [snow-village-desktop.png](snow-village-desktop.png) | `1af71ec65656784312f7783b5dc1911631c82d2b64ac923f14c1c0d869784cc9` |
| [snow-village-portrait.png](snow-village-portrait.png) | `5b83656a10edd219e3225bfd8fc608157b506ba07dcb57c96c721111c8a7dec4` |
| [meditation-normal-motion.png](meditation-normal-motion.png) | `57184faec1b64c7ebb867e1c867d2febafbdba1d3befeef730cff1a402b6952f` |
| [meditation-normal-interaction.png](meditation-normal-interaction.png) | `d98276fc980a2b8e39cce2666f478202db899209a0f3e18f4417492f3beec566` |
| [meditation-forced-byte-motion.png](meditation-forced-byte-motion.png) | `78084020789fc53ee36045dc788df8ad846177025605d54a660cbffdfd4f85c5` |
| [meditation-forced-byte-interaction.png](meditation-forced-byte-interaction.png) | `c8365f840010b0637695d7615912d62672c6d9a82e00c561894e3873e8145668` |
