# DeepWater bounded follow-up

Original PR56 / branch `codex/deep-water-worlds` is pinned to expected head **33aff89945cb6911279073e4156eca24ab4842b8**. The original remote head was read before work and again when the user changed the publishing instruction; both matched. This isolated branch is **codex/deep-water-followup-33aff899**. It targets the original branch through a separate draft follow-up PR, without overwriting it, force-pushing, merging, or editing main. Publication requires another exact original-head check.

Baseline main **14940149cc5c0fccb778b58d4d755a04aea55e53**, including protected seaside PR51, is an ancestor. No AGENTS.md or .agents/skills were present in this checkout or checked workspace parents. README/package validation instructions were followed.

## Corrections

1. **Reflection compatibility.** Both waterfall and cave use the single owned pool helper. Its actual RGBA16F, zero-sample target requires `EXT_color_buffer_float` or `EXT_color_buffer_half_float`. The type/internal format is selected before the first GPU allocation or reflection render. Without either extension the same reflector uses RGBA8/UnsignedByte, retaining geometry/reflection while reducing HDR range. A framebuffer completeness check preserves/restores target, active cube face and mip in `finally`. If an advertised half-float configuration is incomplete, its allocated storage is disposed before a byte retry. A byte failure is reported instead of silently hiding reflections. The upstream Reflector call also restores face/mip. There is no PMREM in these worlds and no other owned float target was found.
2. **Guarded shared-surface input.** One pointerdown listener lives on the closest scene surface (or standalone root). It accepts only its scene subtree or the exact transparent sibling drag surface. Native controls, ARIA controls, noninteractive chrome descendants and foreign nested surfaces are excluded. Only the holder containing the host's unique canvas can capture/drag/tap. Cancel, blur, lost capture and transfer cancel gestures; out-and-back canvas movement also cancels. Required props and audio callback contract are unchanged.
3. **Waterfall material.** Camera, gorge, rocks, vegetation and pool composition remain. Broad cool translucent falling flow is layered with fewer denser cords and offset front veils; the lower fall separates farther from the wall. Low asymmetric mist remains near the impact. This is curved real 3D geometry and procedural shading, without a poster plane, bloom blanket or new assets. Cave and sea scene factories are unchanged.

The documented software-GPU backlog risk is bounded by at most two in-flight full scene draws, using zero-timeout WebGL2 sync checks. Busy submissions wait without reducing geometry, antialiasing, reflection resolution or DPR. Paused resize requests retain their latest needed frame. WAIT_FAILED and unavailable fences are failures, never completion. `awaitGPUIdle` checks the actual command stream after stopping; successful compositor PNG capture is separately required. No fixed 24fps cap was added.

## Integration

| Canonical ID | Default entry |
| --- | --- |
| `amb:waterfall_valley` | `WaterfallWorld.tsx` |
| `amb:cave_meditation` | `CaveWorld.tsx` |
| `nature:deep_sea` | `DeepSeaWorld.tsx` |

Only `active: boolean` is required. `static3D` and the bounded existing-engine interaction callback remain optional. Provide a nonzero sized parent. Player/fullscreen surfaces should contain the scene slot and their direct sibling `[data-scene-drag]` layer under `[data-scene-surface]`; actual controls keep their ordinary behavior. No core, catalog, package, CI, protected rainyWindow/oilSea, or audio-engine files are changed.

The coordinator can review/merge this draft into the original DeepWater branch, then integrate PR56 through the existing coordinator workflow. This worker performs neither merge. Main app and its automatic preview remain intentionally unwired to these entries; use the isolated QA bundle for evidence.

## Evidence and limits

Final tested source/harness commit: **30e5cc5b4d563f9eed159ba191a5f68523611963**. This local tested commit is materialized remotely as **0a3c8f17e87abe4592f0148dd5c8a787d5928e15**, with the **identical full Git tree `8ea1e6c0756e093020ff22f74d9ce03af6e96ac5`**. Git CLI push authentication was unavailable, so the connected GitHub Git-data API published the same bytes with its own commit metadata. The run reports intentionally retain the actual local tested head; this mapping makes the remote source identity explicit. Evidence-only documentation/PNG changes follow it; all 28 source hashes remain exact. Existing `qa/evidence/results.json`, its two source-bound component runs, and all 12 original PNGs are retained byte-for-byte. Their 77 effective checks are historical baseline evidence, not inflated or reused as fresh follow-up results.

New evidence lives in `qa/evidence/followup/`. Preliminary unsuccessful checks are retained separately and not counted as passes: the first fixture used only wall-clock delay despite the waterfall scene-clock cooldown; the second fixture let primary chrome escape its stacking context above the second holder. Native browser hit-testing confirmed the second issue. The fixture corrections did not change the production scene source.

Physical Fold/device performance, thermal behavior, native OS fullscreen integration, native background-tab transitions and actual audio mixing are not tested. Fold is viewport emulation, visibility is synthetic, and audio remains callbacks only. Software-GPU measurements are not claims about device FPS. The existing host has a 5-second disposal grace period, not a guaranteed completion deadline.


## Final results

- Typecheck passed; **28 files / 171 tests passed**; main build and bundle gate passed. Main initial JS402.6KiB/410KiB; CSS99.5KiB/135KiB. The isolated QA production build also passed (7 built files). Gate logs are in `qa/evidence/followup/gates.json`.
- **219 recorded browser assertions passed**, including per-attempt native tap checks; **0 JavaScript/shader errors**. These are fresh final-source results, not the old77 checks added to new checks. Source/bundle/image SHA256, per-check details and renderer diagnostics are in `qa/evidence/followup/results.json`.
- **21 actual compositor PNGs**: 12 clean normal-path views, 3 separate visible-chrome fixtures, 6 forced-byte views. All captures have native GPU fence completion before readback. Do not confuse chrome fixtures with initial production views.
- **28 source files, 7 bundle files and all21 PNG hashes verified** after the run. Original baseline evidence files/12PNGs are preserved byte-for-byte; scope and protected-tree Git object hashes are in `qa/evidence/followup/audit.json`.
- Waterfall desktop/portrait/Fold pixels satisfy the bounded material correction. All four cave and all four sea normal-path captures are pixel-identical to their original baselines. The six byte captures preserve actual reflections/geometry with minor precision/tone differences and no new blank regions.
- Real RGBA16F and forced RGBA8 targets both reported framebuffer-complete **36053** for waterfall/cave. The test GPU truthfully reports both color-buffer extensions available. Missing-extension/half-only/incomplete-FBO cases are CPU contract tests; this does not claim physical testing on an extension-less device.
- Final measured software-renderer last-release to absence: waterfall **5038.7ms**, cave **5018.2ms**, sea **5025.6ms**. The actual disposed canvas and absent engine were checked, then fresh remount succeeded. No device performance claim follows from these timings.

| Normal clean scene | Desktop | Portrait | Fold inner | Landscape |
| --- | --- | --- | --- | --- |
| Waterfall | [PNG](qa/evidence/followup/waterfall-desktop.png) | [PNG](qa/evidence/followup/waterfall-portrait.png) | [PNG](qa/evidence/followup/waterfall-fold-inner.png) | [PNG](qa/evidence/followup/waterfall-landscape.png) |
| Cave | [PNG](qa/evidence/followup/cave-desktop.png) | [PNG](qa/evidence/followup/cave-portrait.png) | [PNG](qa/evidence/followup/cave-fold-inner.png) | [PNG](qa/evidence/followup/cave-landscape.png) |
| Sea | [PNG](qa/evidence/followup/sea-desktop.png) | [PNG](qa/evidence/followup/sea-portrait.png) | [PNG](qa/evidence/followup/sea-fold-inner.png) | [PNG](qa/evidence/followup/sea-landscape.png) |

| Forced byte reflection | Desktop | Portrait | Fold inner |
| --- | --- | --- | --- |
| Waterfall | [PNG](qa/evidence/followup/waterfall-byte-desktop.png) | [PNG](qa/evidence/followup/waterfall-byte-portrait.png) | [PNG](qa/evidence/followup/waterfall-byte-fold-inner.png) |
| Cave | [PNG](qa/evidence/followup/cave-byte-desktop.png) | [PNG](qa/evidence/followup/cave-byte-portrait.png) | [PNG](qa/evidence/followup/cave-byte-fold-inner.png) |

Visible-chrome fixture evidence: [waterfall](qa/evidence/followup/waterfall-chrome-visible.png), [cave](qa/evidence/followup/cave-chrome-visible.png), [sea](qa/evidence/followup/sea-chrome-visible.png).
