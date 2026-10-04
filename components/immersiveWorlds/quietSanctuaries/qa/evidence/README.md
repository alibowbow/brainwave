# Quiet sanctuaries — verified handoff

All three independently implemented worlds passed the isolated real-WebGL visual and lifecycle checks. The root reviewer inspected every final desktop, narrow portrait and Fold-inner-like image, plus the actual interaction frames. This is a **draft integration handoff**, not a claim that the shared app catalog or audio bridge has been wired.

- Verified source commit: `b1a26133d7273f8b17ab0f5e2ee5e0c4295999f8`
- Source SHA-256: `56970583af62c56028bde9bc419b2990e9fdf210afe6d5173b89b486601266f5`
- Built harness SHA-256: `d54facd3ff6d10530b0c5849dd1181573ca7a34e132d48372f93eb4255ecb52b`
- Browser: Chromium `153.0.8010.0`, headless ANGLE SwiftShader.
- [Exact per-file hashes, runtime counters and assertions](verification.json)
- [Source-commit GitHub CI — success](https://github.com/alibowbow/brainwave/actions/runs/37228506494)

The evidence-only follow-up commit adds these files without changing the verified source or bundle.

## Actual rendered images

| World / canonical ID | Desktop 1280×800 | Portrait 390×844 | Motion / touch at 640×480 |
| --- | --- | --- | --- |
| Mindfulness / `meditation` | [Desktop](meditation-desktop.png) | [Portrait](meditation-portrait.png) | [Motion](meditation-motion.png) · [Water touch](meditation-interaction.png) |
| Warm heart / `nature:womb` | [Desktop](warm-heart-desktop.png) | [Portrait](warm-heart-portrait.png) | [Motion](warm-heart-motion.png) · [Warmth touch](warm-heart-interaction.png) |
| Snowy night / `amb:snowy_night` | [Desktop](snow-village-desktop.png) | [Portrait](snow-village-portrait.png) | [Motion](snow-village-motion.png) · [Snow sweep](snow-village-interaction.png) |

[Snow village at a Fold-inner-like 900×650 viewport](snow-village-fold-inner-viewport.png). These are native-resolution renders from the real scene modules, not posters. Still captures pause after rendering; motion checks separately advance the simulation and compare different real rendered frames.

## Passed verification

- TypeScript, all existing 147 tests, app build and bundle budgets pass. The dedicated harness builds all three new scene modules. Shared CI also passes its existing scene/link checks.
- All three scenes: active frame/time advancement and changed rendered pixels; initial inactive/static complete first frame; pause, static3D, reduced motion and synthetic hidden freeze; resume.
- All three: a genuine pointer tap reaches the intended raycast target with a bounded event; drag, out-and-back drag and cancellation do not emit taps.
- All three: the exact same DOM canvas and engine move to a second holder and back; three rapid unmount/remount cycles reuse the host; after the five-second disposal grace a new engine is created correctly.
- Thirteen final PNGs; zero browser runtime or console errors. All source, bundle and image hashes were independently checked after the run.

Recorded successful events: water strength 0.24; warmth strength 0.27; snow strength 0.28. Camera movement and event amplitude remain bounded. No separate audio context or player is created.

## Changes driven by actual pixels

The [first visual pass](before/verification.json) and its seven PNGs are retained under `before/` for comparison. It was visual-only and is not the final lifecycle report.

- Meditation: uniform yellow stone was replaced with differentiated limestone/limewash and directional shadows; trunk joints became continuous, cypress shapes gained irregular foliage, and the portrait now includes the touchable bowl.
- Warm heart: conspicuous crossed textile checks were replaced with restrained irregular fibers; ribs and layered membranes became less repetitive, with ivory light and tactile foreground preserved.
- Snow: the clipped portrait lantern moved fully into view; framing, facade texture, rounded roof snow and distant tree placement were corrected. Snow emitters recycle for long sessions.

## Scope and precise limits

The 900×650 view is a viewport check, not physical Fold hardware. Hidden state is an explicit synthetic `document.hidden`/`visibilityState` plus event test, not real browser-tab switching. Second-holder reuse uses the actual shared host inside this isolated harness; shared player/catalog integration is reserved for the integration owner. No real-device FPS or thermal claim is made.

Warm-heart translucency uses layered textiles, sheen and light cues, not physically simulated subsurface tissue. The basin combines actual planar scene reflection with an original analytic damped ripple shader. Audio quality and production sound binding remain the integration owner's work; the bounded optional event contract and recommendations are supplied.

[Integration entries and audio contract](../../INTEGRATION.md) · [Reference/source rights](../../PROVENANCE.md) · [Reproduce the QA](../README.md)

This directory is QA evidence only. Keep it outside production assets and production imports.
