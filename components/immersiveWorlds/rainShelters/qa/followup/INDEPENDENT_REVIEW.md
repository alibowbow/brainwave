# Independent bounded review

Reviewed source: `1897ea5295fa1a88777e3aae8f969d888df607d4`. Review date: 2026-10-05 UTC. The reviewer did not implement the scene changes or run the browser captures.

## Evidence inspected

Actual PNG pixels were inspected, including the original `qa/evidence/window-{desktop,portrait}.png` and `storm-{desktop,portrait}.png`, followed by these matched-time files under `qa/followup/evidence/`:

- `before-window-normal-desktop.png`, `before-window-normal-portrait.png`, `before-storm-normal-desktop.png`, `before-storm-normal-portrait.png`.
- `after-window-normal-desktop.png`, `after-window-normal-portrait.png`, `after-window-byte-desktop.png`, `after-window-byte-portrait.png`.
- `after-storm-normal-desktop.png`, `after-storm-normal-portrait.png`, `after-storm-byte-desktop.png`, `after-storm-byte-portrait.png`.

All 29 source-file hashes recorded in `evidence/after-capture-window-storm-tent-porch-normal-byte.json` were independently recomputed: no mismatch. The eight reviewed after-image SHA-256 values and dimensions matched that report. Desktop PNGs are 1440×960; portrait PNGs are 390×844. Image hashes and numeric comparisons are also recorded in `pixel-comparisons.json`.

## Bounded visual verdict: accept

GardenWindow's opaque green-bead cue is gone. Nearby leaves read as curved surfaces with differentiated lighting; petals vary in tilt and edge shape. Droplets preserve the actual garden image with restrained highlights. The window framing, sill, bowl, camera composition and physical depth remain intact.

SummerStorm's conspicuous pale planar bundles are replaced by darker tapered, bent grass in irregular clumps. Crown silhouettes vary and distant trees separate into layers. The seated shelter, awning, pot, lantern and camera composition remain intact. Residual procedural flower clustering and distant crowns are visible, but do not warrant a broader redesign within this bounded task.

Normal/byte image comparisons were independently recomputed. Window's maximum RGB channel difference is 3/255 in both views; mean absolute difference is 0.2880/255 desktop and 0.2190/255 portrait. No visible clipping or material loss was found. Storm's normal/byte PNGs are byte-identical in both views.

The four matched-time Tent and Porch before/after normal PNG pairs were independently compared: desktop and portrait are all SHA-256/byte-identical, with zero pixel difference. Their byte-mode after images also match the normal images in the capture report. This directly supports preserving the accepted compositions while adding Porch's checked shadow allocation.

## Correctness review

No concrete source blocker was found. Native input/guarded chrome handling and the `active:boolean` contract are unchanged. Storm's retained RNG budget matches the original downstream sequence. The actual owned targets are GardenWindow refraction and directional shadows; no Reflector, PMREM, environment map or transmission target exists in this group.

The shadow preallocation matches installed Three r186: `_previousType` begins as PCF, and PCFSoft normalizes to PCF before comparison, so the first shadow draw retains the prechecked target. The refraction helper allocates full-size storage before use, disposes failed half storage before checked byte fallback, and restores target/face/mip on success and exception paths. The final 17-test source explicitly distinguishes mocked GPU-policy coverage, including advertised-but-incomplete/throw/GL-error fallback, final byte failure, resize/disposal order, state restoration and shadow storage. The reviewer inspected these tests; execution results belong to the recorded gate reports.

## Limits

This accepts the requested visual corrections, not the full application. The captures use an isolated harness and SwiftShader; portrait viewport emulation is not physical-device validation. Still images do not prove motion quality, listening quality, hardware FPS, full-app integration, disposal timing or an uninterrupted behavioral pass. Runtime lifecycle and native-input acceptance must use the separate segmented QA reports, preserving failures and blocked/unrun stages. Renderer-state runtime probes and full-size FBO results are reported by that QA, separately from this static review.
