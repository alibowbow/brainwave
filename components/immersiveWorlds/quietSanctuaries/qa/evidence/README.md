# Quiet sanctuaries — targeted correction and verified evidence

The requested warm-heart and snow-village corrections are implemented and inspected in real desktop/portrait PNGs. The final full WebGL run passes for all three worlds. This remains a draft handoff for the separate integration owner.

- Verified source: `5fcfafcbaf87cc66db825ad4d7117532c0e0a17f`
- Source SHA-256: `91d21a58fece11881cb3edcb71475f5bd72edc8a7eec188c8c1e43efa50c4a5b`
- Served/built harness SHA-256: `f3c1314a674002e727c047238be3c1de84090e2b1c3cf752e1ded855dc6eb498`
- [Full assertions, capabilities, counters and per-file hashes](verification.json)
- [Independent hash audit against committed source and every PNG](hash-audit.json)
- [Verified-source CI: success](https://github.com/alibowbow/brainwave/actions/runs/37231505554)

The following evidence-only commit changes no verified scene source or harness. Any dirty status recorded at test startup is confined to regenerated evidence files.

## Actual current-source PNGs

| World | Desktop 1280×800 | Portrait 390×844 | Motion / actual touch at 640×480 |
| --- | --- | --- | --- |
| Meditation | [Desktop](meditation-desktop.png) | [Portrait](meditation-portrait.png) | [Motion](meditation-motion.png) · [Water](meditation-interaction.png) |
| Warm heart | [Desktop](warm-heart-desktop.png) | [Portrait](warm-heart-portrait.png) | [Motion](warm-heart-motion.png) · [Warmth](warm-heart-interaction.png) |
| Snow village | [Desktop](snow-village-desktop.png) | [Portrait](snow-village-portrait.png) | [Motion](snow-village-motion.png) · [Snow sweep](snow-village-interaction.png) |

[Snow at Fold-inner-like 900×650](snow-village-fold-inner-viewport.png) · [Forced byte reflection at 1280×800](meditation-byte-fallback-desktop.png)

## Concrete pixel corrections

- Warm heart: removed repeated thick ivory arches, detached rods and alpha-cut strips. Continuous asymmetric closed membranes now wrap the viewer. Distinct fine fibers and closer woven cloth, subdued rose/amber light pools and curved overlaps separate depth. Actual pixel review also removed a sheet intersection, radial corrugation, sharp foreground corners and the rear overlap's pointed crown. The final edge curls backward into the enclosure. Gentle breathing and spatial warmth response remain.
- Snow village: pierced masonry has real recessed reveals, interior glazing/curtain folds and weathered board doors. Roof snow is thicker with rounded uneven edges; small drifts, soft contact patches and softer directional shadows ground houses and fences. Asymmetric connected snowy branch crowns replace repeated cone tiers; local warm windows/lantern separate from cool distant haze. The portrait camera and full lantern/lane framing are preserved.
- Meditation: normal desktop and portrait PNGs are byte-for-byte identical to the user-reviewed baseline. Only capability handling changes. Before the first render, available float/half-float color-buffer extensions select HalfFloat; with neither extension, Reflector selects UnsignedByte and avoids Three's unsupported half-float PMREM path.

The user-reviewed comparison baseline is [source b1a2613 / evidence 3019778](https://github.com/alibowbow/brainwave/tree/301977852d65ea5a4f2fc28d22b2b38b02eafb14/components/immersiveWorlds/quietSanctuaries/qa/evidence). The older `before/` folder preserves the original first visual pilot, not this final correction's evidence.

## Verification passed

- Typecheck, 23 test files / 147 tests, app build, bundle budgets, dedicated harness build and verified-source CI.
- Three worlds, 15 recorded check groups each: real moving pixels/time; complete inactive/static first frames; active pause, reduced motion, static3D and synthetic hidden freeze/resume.
- Genuine raycast taps (water 0.24, warmth 0.27, snow 0.28); drag, out-and-back drag and cancellation do not emit taps.
- Exact same canvas and engine transfer to the second holder and back; three quick remounts reuse the engine. After the disposal grace, the saved actual WebGL2 context reports lost, and the next mount creates a fresh engine.
- Normal half-float and pre-startup forced missing-extension byte paths render real usable basin pixels with live contexts and no GL errors. Both masked extension requests occur before the first observed scene frame.
- Fourteen fresh PNGs. Zero runtime, console or GL errors. All source bytes match the verified commit; all built files and PNGs match their recorded SHA-256 hashes.

## Scope and limits

Only the assigned quietSanctuaries roots change. Shared core, protected worlds, package files, CI and production routing/audio are untouched. The existing host and motion hooks are reused read-only.

Chromium 153.0.8010.0 uses ANGLE SwiftShader. Desktop/portrait/Fold-like sizes are viewport tests; motion/lifecycle uses a native 640×480 test window without changing production render quality. Hidden state is synthetic; holder transfer is tested in the owned harness. Missing extensions are simulated before startup, not measured on physically unsupported hardware. No physical-device FPS or thermal claim is made.

The cocoon is an original procedural textile/fantasy space with local thickness/back-light cues, not physically exact tissue scattering or a photoreal claim. Snow trees remain procedural silhouettes at distance. Byte reflection retains real geometry/direct lighting/reflections but reduces indirect metal highlights by omitting unsupported PMREM. Ripples are analytic damped waves. Production audio binding remains with the integration owner.

[Integration entries and optional audio contract](../../INTEGRATION.md) · [Original authorship and both JEV references](../../PROVENANCE.md) · [Reproduce QA](../README.md)

Keep this QA evidence outside production assets/imports. Keep PR #55 draft; do not merge from this worker.
