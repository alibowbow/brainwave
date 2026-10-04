# Morning Forest bounded follow-up

Captured local runtime source: `7dd22c762fc8af1477257377c349344b2dbd0c37`.
Published equivalent runtime source: [`f231cc77c24d3e20cbb534412d4eafa9c47b5553`](https://github.com/alibowbow/brainwave/commit/f231cc77c24d3e20cbb534412d4eafa9c47b5553).
Both complete Git trees are exactly `ac7baf26c1d2eaba79629bc824a6c3050fbb56fa`: every file byte is identical; only commit metadata differs.
Guarded parent: `1925398f9c1eaf2319bf624d4f17e68e17d745dd`, original draft PR #49.
Branch: `codex/morning-forest-bounded-refinement`.

This follows only the finished `amb:morning_forest`. The original desktop and
portrait pixels, source, references, integration contract and QA were inspected
before editing. No other scene, shared routing/core/audio, dependency, CI or main
file changed. No branch was merged into this continuation. Original branch/main
and PR #51 were only read. The pre-publication [remote guard](publication-guard.json) records the original branch and PR head, main and sea PR #51. Publication also enforces a fresh original-head match immediately before creating only the new branch through the existing GitHub connection; its outcome is recorded in the draft PR body.

## Changes

- Four nearest plants retain exact layout/RNG draws, transforms and group motion.
  Their leaves gain smooth camber, tip curl, restrained veins and varied wax
  roughness. Smaller dew caps follow their actual surface normals and use thin
  Fresnel alpha plus existing light/environment specular highlights. This is
  transparent surface shading, **not refracted scene sampling**. Far plants,
  moss/rocks, water geometry, forest enclosure and distant perched bird remain.
- Actual float extensions gate RGBA16F. Reflector type selection precedes first
  GPU allocation. Full-size PMREM scene/filter FBO preflights precede generation;
  actual filter/output FBOs are checked too. The byte route uses original CPU
  prefiltered CubeUV sky data, avoiding implicit GPU PMREM. It retains native
  dimensions and live planar reflection. Byte HDR range and approximate sky
  filtering differ from the supported half-float path.
- The existing zero-timeout fence policy now covers every main draw, paused
  resize, holder transfer and direct capture. Latest static size/holder requests
  coalesce, even across detach/restore; actual resize waits for a slot so a paused
  canvas is not cleared prematurely. Initialization occupies one tracked batch.
  Only signaled fences count completed; null, WAIT_FAILED and context loss fail
  closed. Abandoned work is never counted completed. Disposal is idempotent.

All framebuffer checks preserve target, active cube face and mip. The full-size
PCF shadow attachment is byte color/unsigned-int depth and is audited after its
lazy allocation. Transmission is zero and renderer output is byte, so there is
no hidden transmission/HDR-output target. No fake extensions, GL monkeypatches,
blocking finish, fixed FPS cap or resolution reduction were introduced.

Primary references: [Three r186 Reflector](https://raw.githubusercontent.com/mrdoob/three.js/r186/examples/jsm/objects/Reflector.js),
[Khronos half-float extension](https://registry.khronos.org/webgl/extensions/EXT_color_buffer_half_float/).
The raw GitHub URL was unavailable to the search tool; exact installed Three
0.186.1 sources were inspected, including PMREM, WebGLEnvironments and shadows.
The Khronos specification was retrieved directly. Existing JEV reference/license
boundaries remain in `../../references.md`; no reference code/assets were copied.

## Source and pixel identity

The public [build manifest](../../../../../public/immersive-worlds/forest/qa/build-manifest.json)
records the clean source commit and SHA-256 of each runtime/harness source.
Served bundle SHA-256:
`0354cec3f07f73eb08e84796f2fa4dabdd4c64373254af7dbb599579589c0a1c`.
Both [normal](normal-report.json) and [forced byte](byte-report.json) reports
independently hash the bytes actually served, matching that manifest.
Each image has its own hash, exact dimensions, capture method and observed state.

| View | Normal | Forced byte |
| --- | --- | --- |
| Desktop, intact harness DOM, 1280×800 | [PNG](normal-desktop-paused-first.png) | [PNG](byte-desktop-paused-first.png) |
| Portrait, intact harness DOM, 344×800 | [PNG](normal-portrait-paused.png) | [PNG](byte-portrait-paused.png) |
| Desktop scene-only native PNG | [PNG](normal-desktop-scene.png) | [PNG](byte-desktop-scene.png) |
| Portrait scene-only native PNG | [PNG](normal-portrait-scene.png) | [PNG](byte-portrait-scene.png) |

[Motion/real-pointer drag then pause](normal-motion-drag-paused.png) and
[repeated paused resize/holder restoration](normal-paused-holder-restored.png)
use the native 882×344 layout. These are browser compositor captures of real
geometry, not pasted/stitched imagery. Scene-only readback is explicitly
supplemental and does not prove DOM composition. All listed final pixels were
opened and inspected: curved leaf shading/veins and tiny clear dew read better,
with original pool/stone/forest/bird composition preserved. The byte path remains
legible and retains coherent reflected trunks. No further redesign was made.

## Timing means different things

`cpuSubmissionMs` measures JavaScript's renderer call including driver waits;
`gpuSubmitted`/`gpuSubmissionAttempts` count conservatively attempted batches.
`gpuInitializationSubmitted` separates initialization from `frames` (main renders
whose renderer call returned). `gpuCompleted` increments only on a later-task
signaled fence. A screenshot and a submitted frame are not completion counters.

At the normal portrait sample, the renderer call returned in 4.5 ms, subsequent
queue/fence waiting took 6305 ms, then compositor PNG capture took 154 ms. The
normal motion/drag sample had two pending batches at pause and drained before
capture. These observations separate submission, queued completion and capture;
they are **not GPU-per-frame timing or hardware FPS**. Concurrent software
rendering makes these wall times especially unsuitable for device comparisons.
Direct `toDataURL` time combines GPU readback wait and PNG encoding; it is never
reported as pure encoding or renderer time.

The deterministic host test proves the existing 5000 ms retention contract.
Browser lifecycle evidence separately records removal, dispose entry, dispose
exit, context-loss observation and heartbeat lag. The grace timer is not a
promise that GPU resources finish releasing in exactly five seconds. The legacy
in-page `observedFPS` field is submitted-frame sampling only, not displayed or
GPU-completed FPS; no performance conclusion is based on it.

## Verification results

| Gate | Result and evidence |
| --- | --- |
| Typecheck | PASS, [log](typecheck.log) |
| Unit suite | PASS, 198 tests / 29 files; browser test deliberately skipped in this invocation, [log](unit-tests.log) |
| Production build | PASS, exit 0, [log](production-build.log) |
| Bundle budget | PASS, initial JS 402.6/410 KiB; CSS 100.1/135 KiB, [log](bundle-check.log) |
| Separate real browser regression | PASS, 1 test, [run](browser-run.log), [complete report](regression/forest-browser-report.json) |
| Native normal and forced-byte images | PASS, 10 inspected PNGs listed above, clean source and served-bundle hashes match; 4 additional regression PNGs inspected and all 14 file hashes rechecked |
| Motion/input/lifecycle | PASS in owned harness: leaf/water taps, tap pointercancel/blur, drag without tap, gentle return, pause/resume, app class and browser-emulated OS reduced motion, one-canvas ownership/transfer, dispose/remount |
| Paused resize/holder/capture/fault policy | PASS: 26 deterministic scheduler/Engine/host tests; 15 capability tests; 2 near-leaf invariance/contact tests; real repeated paused transfer/resize evidence |
| Native hidden behavior | UNVERIFIED: second real tab and native minimization both left document.hidden=false |
| Simulated hidden hook | PASS, explicitly labeled document.hidden simulation; not native visibility evidence |
| Page/WebGL shader errors | None in final normal, byte or regression runs |
| Integrated new-source app chrome/Escape/Back/audio | UNRUN: this guarded branch and current production do not route ForestWorld; shared integration stays out of scope |

The clean no-capture browser observed disposal entry 5005.9 ms after removal was
requested, disposal exit 14911.1 ms after removal, and context loss 14911.8 ms
after removal. The disposal call occupied about 9905.2 ms; maximum heartbeat
interval was 9910.4 ms. Two pending batches were abandoned during teardown,
not reported completed. This is eventual disposal with accurately named events,
**not five-second GPU cleanup or smooth hardware performance**. The original
5.5-second test sleep was not enlarged; the main-thread stall delayed its return.

The regression separates its capture page from a fresh no-screenshot lifecycle
browser. No timed-out capture was reused as functional evidence; final captures
had no failures. The remaining input boundary is shared app/sibling chrome and
full drag-focus-loss integration; the executed blur assertion is specifically
tap cancellation, not a claim about every shared look-hook focus transition.

## Integration boundaries

The only required prop remains `active: boolean`. This scene creates no audio
context or player. The component uses the unchanged shared host and motion/input
hooks. Actual app routing, sibling chrome hit testing, immersive entry/Escape/Back
and audio integration remain the shared owner's responsibility.

The local production visit failed with `ERR_EMPTY_RESPONSE`, preserved in
[that attempt](production-baseline-report.json). A new cloud-browser tab did
reach the exact production route, with autoplay blocked and no playback gesture:
[actual baseline JPEG](production-new-tab-baseline.jpg),
[DOM/route/viewport observation](production-cloud-baseline.json).
It still shows the old NatureScene image and has **no canvas**. It cannot be
claimed as new ForestWorld integration evidence. Cloud JPEG output is not
relabeled PNG, nor bound to the unpublished source. Its observed asset URL is
recorded; its deployed source commit is not established here.

Chromium 153/SwiftShader and simulated 344×800/882×344 layouts do not establish
physical Fold performance, hardware stability/thermals or audio quality. Real
no-float-extension hardware is unrun; extension branches are deterministic tests
and the byte fallback itself has real rendered evidence with honest extension
availability. Controlled fault statuses are simulations, not fake GPU drivers.

The runtime source commit above is intentionally distinct from the later evidence-only commit. The latter adds this report, measured artifacts and the generated harness bundle without changing runtime/harness source. Korean harness UI glyphs are unavailable in the local Chromium font environment; this cosmetic harness limitation is visible in the intact compositor captures. Scene-only captures do not hide or replace that evidence.

Ordinary Git push was blocked by unavailable terminal credentials. No login, token, permissions or security bypass were introduced. Existing authorized GitHub connector blob/tree/commit operations publish the exact tested tree; every returned blob SHA and the complete runtime tree SHA were compared to local Git objects. The manifests and capture reports retain their truthful original local capture SHA. Published source identity is linked above, rather than rewriting historical evidence to imply a rerun.
