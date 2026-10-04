# Cozy Rooms — rendered evidence and handoff

Evidence date: 2026-10-04. Tested implementation: `30851e8667c822bf7f400974f469dfa454524454`.

- Production source SHA-256: `86c8383a3720ffa60cecbfd022d5234945af17bf88ad8edb14741202b3ee645c`
- Isolated QA bundle SHA-256: `503b5400075a16a2562d8177e90159980553e5113b1ca47ccec7e62901d50d90`
- Chromium `153.0.8010.0`, headless WebGL2 through SwiftShader. These are actual rendered canvas screenshots, not image-generation output or mock posters.
- See [machine-readable verification](evidence/verification.json) and [animation pixel proof](evidence/motion-proof.json). Source, bundle and individual PNG hashes are recorded for reproducibility. The evidence-only commit after this source does not change production scene code.

## Screenshots

| World | Desktop 1280×850 | Portrait 412×915 | Additional viewport |
| --- | --- | --- | --- |
| 불멍 힐링 | [PNG](evidence/relax-desktop.png) | [PNG](evidence/relax-portrait.png) | [Visible chrome, 960×700](evidence/relax-chrome-visible.png) |
| 수면 준비 | [PNG](evidence/sleep_prep-desktop.png) | [PNG](evidence/sleep_prep-portrait.png) | — |
| 파워 냅 | [PNG](evidence/power_nap-desktop.png) | [PNG](evidence/power_nap-portrait.png) | [Fold-inner viewport, 673×841](evidence/power_nap-fold-inner-viewport.png) |
| 겨울 산장 | [PNG](evidence/nature-winter_lodge-desktop.png) | [PNG](evidence/nature-winter_lodge-portrait.png) | [Landscape viewport, 915×412](evidence/nature-winter_lodge-landscape-viewport.png) |

All 11 final PNGs were visually inspected, with an independent second review. Each space has its own geometry, camera, lighting, materials and spatial composition. Corrections include nonperiodic hearth masonry and darker coal, curved sleep-room foliage and softer curtains, rooted terrace vegetation and transmitted canopy light, and continuously spiraling evergreen limbs with supported tapered snow and smooth mountain slopes in the winter view. No repeated background or placeholder image is used.

## Visible-chrome regression

The owned harness models the Player/Immersive sibling structure: a closest `data-scene-surface`, scene subtree, full-cover transparent `data-scene-drag`, and separate controls. The second surface uses the app's fullscreen stacking level. It does not modify shared components or wire production routes.

For each world, `chrome-checks.mjs` hit-tests the covered mesh point using `document.elementFromPoint`, requires the target to belong to the surface containing the visible canvas, and dispatches touch PointerEvents to that actual target. Assertions cover:

- Overlay tap emits exactly one interaction; overlay drag changes look and emits no tap.
- Buttons, range inputs, links and timer text do not steer the scene; the chrome button retains its own real browser click behavior.
- `pointercancel`, window blur and a distant pointer-up without intermediate moves do not tap.
- The obscured holder cannot react after its canvas moves to the second surface.
- Two immersive round trips, restored holder and remount retain exactly one effective handler.

The scene listener accepts its subtree or the exact transparent drag target and excludes native/ARIA controls and unrelated surfaces. Gesture tracking uses maximum excursion, so moving out and back cannot become a tap. Cleanup removes listeners and cancels an unfinished gesture. The accessible scene buttons remain available through keyboard focus.

## Repository gates

All four worlds passed all 26 browser assertions each (104 total), including visible-chrome input, actual geometry hits, keyboard events, bounded intensity, maximum-excursion drag discrimination, cancellation, stopped clocks, one-canvas holder transfer, reduced/static/hidden motion policy, rapid remount, delayed resource disposal and creation of a fresh engine after disposal. Final successful runs reported no page or console errors.

All four worlds also passed a separate actual-pixel animation check: freeze at 800×600, capture, advance at least 12 animation frames, freeze and capture again, with no camera input or UI focus changes. Both screenshot SHA-256 values differ in every world, and the recorded scene clock advances. This check uses the exact bundle above; it is an animation-existence assertion, not a frame-rate benchmark.

The first winter run reached the final recreation check but timed out after 120 seconds. Its complete isolated retry passed on the exact same source and bundle. The cause is not established; software-driver restart contention is plausible but not proven. This rerun is recorded in the JSON rather than hiding the first failure. The final results do not claim hardware performance or universal driver reliability.

| Command | Observed result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm test` | Pass: 23 files, 147 tests |
| `npm run build` | Pass |
| `npm run check:bundle` | Pass: initial JS 402.6 KiB / 410 KiB, CSS 99.5 KiB / 135 KiB |
| Ownership diff and `git diff --check` | Only the assigned `cozyRooms` directory; no whitespace errors |

The application build alone does not exercise these entries because integration is a separate Work. `verify-group.mjs` independently bundles all four entries and runs a separate real browser per world. Reproduction commands and the exact default entry paths are in [INTEGRATION.md](../INTEGRATION.md); reference observations and asset rights are in [REFERENCES.md](../REFERENCES.md).

## Scope and limits

Fold and landscape evidence is viewport emulation, not physical-device certification. Visibility tests deliberately simulate `document.hidden` and `visibilitychange`; they do not establish real tab-switch behavior. Touch events are dispatched PointerEvents with actual DOM hit-testing; keyboard and chrome-button clicks use browser input. The isolated chrome screenshot is test UI, not a screenshot of a deployed integrated app. Its mock Korean labels may use missing-glyph boxes in the software-browser font environment.

Software rendering establishes pixels, input routing and lifecycle assertions, but not device FPS, GPU memory, battery or thermals. No frame cap or poster fallback is added. GPU resources are explicitly disposed; detached contexts are left to browser reclamation because synchronous `WEBGL_lose_context` stalled this software driver. Canonical selection, audio/persistence wiring and real app fullscreen flow remain with the integration Work. No new audio engine or AudioContext is created here.

PR remains draft; no merge is performed.
