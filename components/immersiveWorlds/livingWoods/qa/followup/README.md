# Bounded LivingWoods continuation QA

This owned harness imports the existing production `Player` and `ImmersiveMode`
unchanged. A QA-only Vite resolver replaces their `SessionBackdrop` dependency
with the selected LivingWoods entry. It uses the existing live-scene wrapper
styling via the existing `rainy-window` variant; it never mounts or modifies the
protected rainyWindow scene. This is real production-wrapper browser/input
coverage, **not** proof of integrated App, catalog, routing, audio or autoplay.

Run from the repository root:

```sh
SCENE_SCREENSHOT_DIR=components/immersiveWorlds/livingWoods/qa/followup/new-review-evidence node components/immersiveWorlds/livingWoods/qa/followup/run.mjs
```

`LIVING_WOODS_WORLDS` selects comma-separated scenes. `LIVING_WOODS_PHASE` can be
`capture`, `functional` (no screenshots), `interaction` (includes the required
post-native-input PNG), or `lifecycle` (clean no-capture browser). Default `all`
runs every phase. `SCENE_SCREENSHOT_DIR`, `SCENE_SOURCE_REVISION` and
`SCENE_BROWSER_PATH` have their usual meaning. No browser downloads are made.
`LIVING_WOODS_FOLLOWUP_REUSE_BUILD=1` accepts a frozen build only after checking
runtime-source, harness-build-input and bundle SHA-256 identities.
Use a new empty output directory for each run; existing reports/PNGs are rejected
before building or starting a browser so stale images cannot masquerade as a new run.

Each job uses a fresh browser. Native browser PNGs include actual HTML chrome,
CSS clipping/blur and scene pixels. Desktop, portrait and Fold-like viewports
retain their full buffers at DPR 1; these are viewport tests, not physical-device
measurements. The forced-byte bamboo job sets the owned QA flag before scene
initialization and records the engine's framebuffer/target evidence. No GL
extension or capability API is patched.

Before capture, static frame/time and final pending submission state must settle.
A fence in the existing WebGL2 context uses later-task zero-timeout polling; the
fence and native PNG share one 60-second budget. An outer timer also bounds the
evaluation in case flush itself stalls. WAIT_FAILED, null sync, context loss,
canvas replacement or changing frame/time fails the drain. No screenshot is
queued following failure, and that page is never reused for lifecycle verdicts.

Native input uses Playwright's trusted mouse/keyboard dispatch and records
`isTrusted`, real hit-test targets, visible/hidden overlay drags/taps, production
Pause, immersive entry and Escape. Cancellation/blur and fallback hidden-state
events are explicitly synthetic. A real second-page foreground attempt is
reported separately and marked unrun if headless visibility remains visible.
The bamboo portrait fixture projects actual leaf triangle interiors and checks
their scene-target raycast before selecting a native mouse location. It changes
neither input handling nor geometry; a thin leaf's box center may be empty air.

Clean disposal measures removal, engine dispose entry, dispose exit, actual
context-loss event and heartbeat lag separately. The configured host retention
is 5000 ms; actual synchronous cleanup is required below 3000 ms in the clean
browser. It is never described as GPU cleanup completing in five seconds.
The runner does not change the shared host, inflate the original timeout, use
`gl.finish()`, lower quality or replace scene pixels with a poster.

The original `qa/evidence` remains untouched. New reports link its exact PNG
hashes and original branch/head as before evidence, along with final owned
source, imported shared wrapper, bundle, runner and new PNG hashes. A report
must still receive actual pixel review; byte size and passing interactions do
not establish visual quality.
