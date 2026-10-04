# Rain shelters — validation and handoff

Draft PR: https://github.com/alibowbow/brainwave/pull/53  
Branch: `codex/rain-shelters-four-worlds`  
Baseline main: `14940149cc5c0fccb778b58d4d755a04aea55e53`

## Exact revisions

- Renderer and guarded chrome-input source: `4c0131625bd0ef127f08a0539128abbe00d90d12`.
- Disposal-gate correction: `b0a4e5d668791a9bc826bf54a0890c4b78cc8bba`.
- Final canonical test revision: `4d3cd75d59cd4d76189290f1a912b0a9680cfb2d`. Static pixel-change checks use a fresh, untouched scene; paused screenshot captures wait for pending GPU commands. Both test-only revisions leave the rendering bundle identical.
- Served QA JavaScript: `index-D8YJ8BJE.js`, SHA-256 `6c8e2c5ffeb2848d6b5065b76392c55d9475b2793d7f5795901bcda58d2fe52f`.
- The evidence/documentation commit contains no renderer changes. `qa/evidence/report.json` records individual source hashes, emitted bundle hashes, viewport sizes, PNG hashes and per-check observations.

## Repository gates

Typecheck, all 147 tests in 23 test files, production build and bundle-budget checks passed locally. The initial production JavaScript remains 402.6 KiB against the 410 KiB budget; CSS is 99.5 KiB against 135 KiB. These new entries are deliberately not wired into shared application imports by this worker.

Final canonical test revision `4d3cd75d` passed [GitHub CI run 37230194215](https://github.com/alibowbow/brainwave/actions/runs/37230194215). Earlier test revision `b0a4e5d` passed [run 37229303702](https://github.com/alibowbow/brainwave/actions/runs/37229303702), and renderer source passed [run 37228665512](https://github.com/alibowbow/brainwave/actions/runs/37228665512). The later evidence-only commit may have its own CI run; these links identify observed successful runs rather than implying a pending run has passed.

## Chrome input fix

The scene listens at its closest `data-scene-surface`, admitting only its own scene subtree or the transparent `data-scene-drag` target. Buttons, inputs, links, editable/focusable controls, interactive roles and nested foreign surfaces are rejected. No propagation is stopped. Raycasts use the scene's own bounds.

Native mouse checks use a sibling full-cover drag layer with visible player button/range controls. They exercise a real scene-object tap, bounded look drag, no tap after drag, and separate button/input behavior. Synthetic touch-pointer tests cover cancellation; a synthetically dispatched FocusEvent exercises blur cancellation. Holder acquisition/release cancels pending gestures synchronously. Tests verify identical-canvas relocation, correct top-holder ownership and exactly one event after returning or rapidly remounting.

The local action button's separate check dispatches its semantic click handler. It does not prove physical pointer access through the sibling overlay. The integration owner should expose that action in reachable shared controls.

## Real rendering evidence

The screenshots are actual Chromium 153 WebGL2 renders through SwiftShader, not generated images or static background substitutes. Every scene has desktop 1440×960 and portrait 390×844 captures. The porch also has an 884×768 Fold-inner viewport. Additional images record scene interaction, visible chrome and a fresh static first frame. All geometry, texture maps and shaders are independently authored procedural work; provenance and reference observations are in `SOURCE_PROVENANCE.md`.

Independent visual review examined the actual pixels and led to composition, foliage, fabric, wood, basin-water and storm-field corrections. `VISUAL_REVIEW.md` records those findings. The result is stylized procedural realism; no claim of photorealism or visual parity with the protected rainy-window world is made.

## Acceptance provenance and limits

**64 unique checks passed: 16 per world. 17 real PNGs are included.**

| World | Behavioral checks | Main composition evidence | Additional evidence |
| --- | --- | --- | --- |
| Tent | 16/16 | Desktop, portrait | Interaction, visible player chrome, fresh static first frame |
| Garden window | 16/16 | Desktop, portrait | Interaction at 390×844 |
| Monsoon porch | 16/16 | Desktop, portrait, Fold-inner viewport | Interaction, fresh static before/after |
| Summer storm | 16/16 | Desktop, portrait | Interaction |

Acceptance uses explicitly recorded segments over the identical rendering bundle. Completed checks and PNGs are retained rather than rerunning them after an unrelated test-observability correction. The report and supplements distinguish original runs, targeted continuations and resolved harness interruptions.

Tent's original 14 checks are complemented by two disposal/fresh-static checks. Window's original five checks are complemented by 11 new checks at 390×844; its repeated first-frame precondition is not counted twice. Porch's original ten are complemented by six checks at 390×844; its fresh-static diagnostic is supporting evidence rather than an extra acceptance count. Storm passed all 16 in the original full run. The final window/porch continuation processes exited zero at `4d3cd75d`. This is aggregated acceptance over identical runtime code, not a claim that the interrupted original process exited zero.

The teardown gate inspects the retained native context's `isContextLost()` and verifies a detached canvas and fresh canvas on remount. A first run observed no `webglcontextlost` notification on the detached canvas even though the actual context was lost. The diagnostic is preserved; an event counter is no longer treated as resource state.

Window interaction capture encountered a software-GPU screenshot timeout after its first behavioral checks passed. Completed evidence was retained and the outstanding window checks/capture were continued separately. This is documented as a harness interruption, not erased or represented as an uninterrupted successful run.

The original porch pixel comparison repeated the same water tap at the same frozen simulation time, which legitimately reproduced the same ripple state. A fresh untouched static scene then passed the native-tap pixel-change check with exactly one frame and no clock advance. The canonical verifier now isolates this state instead of requiring identical inputs at identical time to produce different images.

- Hidden-state checks override document visibility and dispatch its event; they are not real browser-tab switching.
- Second-holder tests prove canvas reuse in the isolated harness, not completed production fullscreen wiring.
- Browser viewport sizes do not establish physical Fold performance, device FPS, thermals or native mobile scrolling behavior.
- The garden window uses full-resolution HDR refraction and two passes in one context. `renderer.info` metrics record the final pass, not a sum of both passes.
- Shared Player/ImmersiveMode touch policy must include these new IDs before physical touch acceptance, preserving Player's `detailsOpen` → `pan-y` behavior. Owned code does not alter shared scrolling policy.
- No audio engine, sound asset or second player was added or auditioned. Shared integration must connect the optional bounded events and choose distant, gradual thunder; the baseline summer-storm preset still uses its existing brighter `thunder` path.

Only `components/immersiveWorlds/rainShelters/` and `public/immersive-worlds/rainShelters/` are changed. Shared core and both protected scenes are unchanged. Integration belongs to the separate Work. This worker does not merge the PR.
