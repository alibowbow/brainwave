# WaterEdge bounded material/compatibility follow-up

This continuation starts from original draft PR #58 at exact head `299a18911b2b7818149e4997dc2101b9c760bef5`. The original remote branch was verified before the isolated checkout. It is not written, merged or force-pushed. The follow-up branch is `codex/water-edge-material-compat`; its PR targets `codex/water-edge-three-worlds` to show only this correction.

## Result and source identity

The only production delta is four WaterEdge files: stone material and environment selection in `scenes/pebbleShore.ts`, target handling in `scenes/summerValley.ts`, and two owned compatibility helpers. Geometry, topology, instance transforms, cameras, lighting, water animation and other scene source remain unchanged. Shared runtime, wrappers, routing, audio, packages, core and protected scenes are untouched. Baseline main `14940149cc5c0fccb778b58d4d755a04aea55e53`, including the user's sea PR #51, remains in ancestry; no newer main was merged into this continuation.

- Production commit: `9420bd71def5f8ec6de13006f6132e0ee09ff621`.
- Production source SHA-256: `33f976ba9b24293c39bbefabf6cfe6c0e54253323f8dd7f25bb6a2fa3415e96a`.
- Harness source SHA-256: `9b559e99dcfe3e220b1c9e07a14ddec87a546d6502d3d4768626d9acad68b02d`.
- Built harness tree SHA-256: `ae74b16d8207d48f7f03cf61ff9295aa8e4db7578bd34a379552cb4e884a998b`.
- Capture checkout: `b01c44978684833983cf80360e4a07c6ed796b2c`; later changes are QA scripts/evidence/documentation, with identical production and harness source. Each run records its script hash separately.
- Browser: Chromium `153.0.8010.0`, ANGLE Vulkan SwiftShader, DPR 1. Desktop 1280×800 and portrait 390×844, with the same native drawing-buffer size. Main production still supports DPR up to 2 and unrestricted requestAnimationFrame; no quality/downsampling/frame-rate shortcut was added.

No AGENTS.md or `.agents/skills` exists in this pinned checkout or its applicable parents. Both uploaded briefs, original PR body, source, references/provenance, validation and all ten original PNGs were reviewed. Original evidence remains intact. No JEV source/assets or new image assets were imported; no paid service, new login/permission/token or independent audio context was used.

## Material and compatibility

Basalt is now dielectric. Repeated pale sine/quartz scratches and threshold flecks are replaced with subdued scalar mineral grain, filtered micrograin and sub-millimetre normal variation. Original mineral colours seed stable variation, including during the reachable pebble's roll. Dry crowns have varied broad roughness; the same tide/wave-height function as the water governs actual wet contact and a narrow damp fringe. Bright sheen no longer comes from a broad shore-z mask covering dry stone tops.

The valley checks actual floating-point extensions and all six actual cube framebuffer faces before rendering; unsupported/incomplete HalfFloat targets fall back to byte. Native-resolution byte refraction/depth is checked before use and after resize. Target, active cube face and mip are restored through errors as well as success.

The shore keeps normal Three PMREM after exact-format/size capability preflight. Unsupported/forced-byte execution chooses a full-size, independently filtered byte CubeUV environment before PMREM could render. It captures the same sky geometry and preserves directional roughness-dependent lighting. All allocated byte cube faces and atlas pass real framebuffer checks. See [COMPATIBILITY.md](COMPATIBILITY.md) for complete target inventory, state restoration, primary references/MIT provenance, and the honest precision/filter differences of RGBA8.

## Actual before/after images

These are lossless native full-viewport Chromium PNGs of real HTML + WebGL. A fence in the existing context observes completion before screenshot readback; there is no image substitution, canvas readback stitched into fake chrome, changed CSS, or resolution reduction. Initial images are genuinely paused frames, not claims of continuous performance. All image hashes and dimensions are in their adjacent JSON reports and the summary manifest.

| World/view | Original before | Normal after | Forced-byte after |
| --- | --- | --- | --- |
| Shore desktop | [PNG](pebble-shore-desktop.png) | [PNG](followup-evidence/pebble-shore-normal-desktop-visual-initial.png) | [PNG](followup-evidence/pebble-shore-byte-desktop-visual-initial.png) |
| Shore portrait | [PNG](pebble-shore-portrait.png) | [PNG](followup-evidence/pebble-shore-normal-portrait-visual-initial.png) | [PNG](followup-evidence/pebble-shore-byte-portrait-visual-initial.png) |
| Valley desktop | [PNG](summer-valley-desktop.png) | [PNG](followup-evidence/summer-valley-normal-desktop-visual-initial.png) | [PNG](followup-evidence/summer-valley-byte-desktop-visual-initial.png) |
| Valley portrait | [PNG](summer-valley-portrait.png) | [PNG](followup-evidence/summer-valley-normal-portrait-visual-initial.png) | [PNG](followup-evidence/summer-valley-byte-portrait-visual-initial.png) |
| Pond desktop | [PNG](night-pond-desktop.png) | [PNG](followup-evidence/night-pond-normal-desktop-visual-initial.png) | N/A: no owned float colour target |
| Pond portrait | [PNG](night-pond-portrait.png) | [PNG](followup-evidence/night-pond-normal-portrait-visual-initial.png) | N/A |

Primary and independent reviewers inspected all ten originals and all ten final still images. The finite material correction passes: repeated scratches/metallic dry crowns are gone, restrained mineral grain and contact lighting remain, and geometry/composition is preserved. Normal valley and pond desktop/portrait RGB pixels are **identical to the original committed PNGs**. Shore mean absolute 8-bit channel change is 6.34333 desktop / 4.75507 portrait; this is a comparison statistic, not a quality score. Its top 20% sky region remains pixel-identical.

## Executed checks and limits

The finite local matrix is **18 passed / 2 failed / 0 blocked**, with the remaining checks explicitly unrun. The two failures are integration blockers; this draft is **not an unconditional lifecycle/performance approval**. Raw reports are retained without retries or widened timeouts in [followup-manifest.json](followup-manifest.json) and `followup-evidence/`.

| Gate | Result |
| --- | --- |
| Typecheck | Passed |
| Unit suite | Passed: 160 tests / 26 files, including 10 new target cases and a deterministic 5000 ms shared-host retention test |
| Root production build and bundle budget | Passed: initial JS 402.6 KiB / 410; CSS 99.5 KiB / 135 |
| Isolated production-entry bundle | Passed; exact bundle hash above. Root app does not yet route these entries; root build alone is not their render evidence. |
| Native desktop/portrait still renders | Passed 10/10, all shader/page error arrays empty |
| Native-input behavior | Passed 5/5: all three normal worlds, shore and valley forced-byte |
| Clean no-capture lifecycle | Passed pond normal and shore normal/byte, two disposal/remount cycles each; **failed valley normal/byte on their first 20 s disposal gate** |

Behavior uses trusted browser mouse input and Playwright touchscreen/CDP touch cancellation, rather than synthetic DOM touch, for real scene raycasts. This is emulated touchscreen input, not physical hardware. Direct scene-root and sibling `data-scene-drag` drags engage look without emitting taps. Harness Play/Pause/overlay controls suppress scene taps; touch emits one bounded correct-world event. Genuine subsequent RAF submissions and simulation-time changes precede the post-input captures. Cancel/outside-release/out-and-back/blur edge dispatches are explicitly synthetic; reduced-motion uses browser media emulation; `document.hidden` is synthetic. No auditory or OS-background claim follows.

| Native post-input view | Normal | Forced byte |
| --- | --- | --- |
| Shore | [PNG](followup-evidence/pebble-shore-normal-desktop-behavior-post-native-input.png) | [PNG](followup-evidence/pebble-shore-byte-desktop-behavior-post-native-input.png) |
| Valley | [PNG](followup-evidence/summer-valley-normal-desktop-behavior-post-native-input.png) | [PNG](followup-evidence/summer-valley-byte-desktop-behavior-post-native-input.png) |
| Pond | [PNG](followup-evidence/night-pond-normal-desktop-behavior-post-native-input.png) | N/A |

All twenty native PNGs were directly inspected by the primary reviewer; the independent reviewer additionally checked all ten final stills against all ten original images and rehashed them. The first three normal behavior reports store pause-window before/after fields under `postInteractionRendered`; the actual burst interval is `trustedTouchTapPaused.after` to `postInteractionRendered.before`, supported by the asserted frame increment and render telemetry. The later two byte reports also record an explicit `beforeBurst`. Do not confuse pause-window equality with an absence of motion.

### GPU work and readback

Every capture records JavaScript/driver render-return timing separately from an asynchronous zero-timeout WebGL fence and the native surface PNG call. The fence never draws, changes GL capabilities, calls `finish`, or reads pixels. Null/failed/lost-context/non-signaling fences fail or block capture; no dependent screenshot is queued on such a page. No capture failed here. Native PNG calls took 79–633 ms after recorded completion observations; the longest behavioral fence wait was **51.281 s**. Initialization fences include environment/scene/shadow setup and queued submissions. These observations support separating queue retirement from surface readback in this environment; they are not per-frame GPU timers, pure JavaScript CPU timings, sustained throughput, or proof of a general compositor diagnosis.

### Clean lifecycle failures: retain as failures

Fresh lifecycle browsers performed actual holder transfer and two intended teardown/remount cycles with **no screenshots, readPixels, toDataURL or diagnostic fences**. One canvas/context was retained through holder roundtrips. The fixed 20 s polling gate was not expanded. Three modes passed both cycles and reached zero live engines/canvases at each disposal, followed by exactly one new engine on remount.

| Valley mode | Removal → dispose entry | Time inside dispose | Removal → observed context loss | Gate |
| --- | ---: | ---: | ---: | --- |
| Normal | 5.0005 s | 31.8066 s | 36.8076 s | **Failed 20 s**, second cycle/remount unrun |
| Forced byte | 5.0005 s | 40.4880 s | 45.4897 s | **Failed 20 s**, second cycle/remount unrun |

Both failed pages eventually reported created=disposed=1 and live=0, with a trusted context-loss event. That eventual observation is supplementary and **does not convert either failure to a pass**. Timings use the detachment immediately after `unmount-request`, excluding prior holder-transfer detachments. Main-thread heartbeat lag reached approximately 31.77 s normal and 40.49 s byte, so the original test deadline can be exceeded while disposal blocks the event loop. Even shore's passing first normal cycle had dispose entry near 5.0004 s but context loss near 12.7800 s. The 5000 ms configured retention contract is therefore distinct from returning from dispose, context-loss observation, and physical VRAM reclamation (unmeasured).

The production scheduler and disposal implementation are unchanged by this narrowly scoped material/target correction. No forest scheduler was copied, no queue-bound or continuous-performance claim is made, and no failed check is weakened. The integrator must resolve/explicitly disposition these current-source clean valley lifecycle failures before general lifecycle approval. Broader scheduling changes require a separately bounded follow-up rather than silently expanding this correction.

Unrun: physical mobile/Fold and absent-extension hardware; actual OS background/foreground; sustained throughput/thermals/long-session memory/production queue bounds; physical VRAM release timing; auditory quality; full integrated Player/ImmersiveMode chrome, native Fullscreen/Escape, and exact-final-integration CI. Harness HTML controls are real captured DOM, but are **not the full app chrome**. Original Fold viewport evidence remains attached to its original source, not relabeled as a new final-source run.

## Reproduce

```bash
npm run typecheck
npm test
npm run build
npm run check:bundle
npx vite build --config components/immersiveWorlds/waterEdge/dev/vite.config.ts
node components/immersiveWorlds/waterEdge/qa/followup-verify.mjs --serve --stage=visual --world=pebble-shore --mode=byte --viewport=desktop
node components/immersiveWorlds/waterEdge/qa/followup-verify.mjs --serve --stage=behavior --world=summer-valley --mode=normal --viewport=desktop
node components/immersiveWorlds/waterEdge/qa/followup-verify.mjs --serve --stage=lifecycle --world=summer-valley --mode=normal --viewport=desktop
```

Set `CHROMIUM_PATH` if the installed executable is not `/tmp/cosmic-browser-bin/chromium`. Modes are normal/byte; visual viewports are desktop/portrait. Each run starts a fresh browser, saves a separate report, and does not overwrite PR58 evidence. Preserve failed reports before rerunning. A failed fence prevents a screenshot; timed-out/tainted pages are not used for subsequent lifecycle conclusions. The lifecycle stage never calls screenshot/readPixels/toDataURL or adds diagnostic fences.

## Integration handoff

All three default entry paths and the active-only required prop contract remain unchanged; see [INTEGRATION.md](../INTEGRATION.md). No extra audio/player/global-setting contract is introduced. The integrator should first include original PR58 exact head `299a18911b2b7818149e4997dc2101b9c760bef5`, then this follow-up's bounded delta. Production change is isolated in commit `9420bd71def5f8ec6de13006f6132e0ee09ff621`; subsequent commits contain QA/handoff. Preserve all current main and user sea changes, route/catalog/PWA/audio work through the sole core owner, and rerun final integrated CI plus actual Player/ImmersiveMode chrome/native fullscreen checks on the exact integrated head. This worker does not merge or deploy.
