# COSMIC-CORRECTION-20261004

Bounded follow-up on draft PR52 / `codex/cosmic-floating-garden`, starting from verified remote `a0178faaf919a07cd04bdf53a5efa476b58b8e5e`. The initial local working tree was clean. Remote main was verified as `14940149cc5c0fccb778b58d4d755a04aea55e53`; no shared/core/protected file was edited, rebased, reset or force-pushed. Existing scene geometry, composition, material identity, original evidence and previous hashed build assets are preserved.

## Corrections

- Ring shadow: the separate uniform is refreshed using `planet.getWorldPosition()` after parent matrix updates. Desktop world center `[19,24,-78]`; portrait center `[4.728723435760022,24,-80.14136993256413]`. Actual capture diagnostics show zero center error. Three regression tests cover desktop lit/occluded geometry, the real 0.18-radian portrait transform and changed ancestor transforms.
- Reflection: checks both real float/half-float color-buffer extensions before any target bind/render. Explicit RGBA16F for supported devices; RGBA8/UnsignedByte otherwise. Non-MSAA framebuffer completeness is checked at initial allocation and resize. An incomplete half allocation is disposed before byte retry. A failed byte allocation raises an explicit failure. The check restores target, cube face and mip in finally. No geometry/reflection was removed and no extension was spoofed.
- Actual GPU state probe restores a cube target at face3/mip1, restores GL framebuffer binding, retains complete status36053 and has GL error0. Nine unit tests cover extension combinations including half-only/neither, first allocation, forced byte, incomplete fallback, exception restoration and resize.
- Quality: extracted the existing accumulating/decaying policy without changing its behavior. Pause/hidden/reduced-motion retain selected quality and counters. Only a newly created engine starts again at quality1/reflection1024. Seven policy tests cover boundaries, nonconsecutive pressure, decay and recovery. Default RAF/high-quality behavior is preserved.
- Opus082 Perfume Rosée: actual source was inspected; the SVG liquid/facet approach is explicitly deferred in REFERENCES.md. No scene redesign or copied asset/code.

## Source-bound executed results

| Gate | Result |
| --- | --- |
| typecheck | Pass |
| tests | 170 / 27 files pass; 19 correction regressions added |
| standalone build | Pass; final built harness used for both browser suites |
| app build / PWA | Pass, 44 precache entries / 845.21 KiB |
| bundle | Pass: initial JS402.6 /410 KiB; CSS99.5 /135 KiB |
| lifecycle | 20 checks pass: active/pause, real animation, drag/out-and-back/cancel, keyboard tap callback, one-canvas holder, reduced-motion, offscreen/synthetic hidden, resizing, 3 disposal/remount cycles, DPR2 |
| compatibility/capture | 7 assertions pass; 5 native PNG captures, normal RGBA16F and forced RGBA8; no browser/shader errors |

All three reports carry the same SHA-256 source/bundle digest and checked it again after execution:

`b6b3db3fee32256fc72344f146b705fa14fb23ba42e79f1f10af360d30909b17`

`checkoutHead` in raw reports records the pre-publication base (`a0178fa`), not a claim that the base already contained this patch. The exact tested working-tree source and built bundle are bound by the full per-file SHA-256 map; the submitted correction commit contains those exact files. Markdown/evidence additions do not alter executable source.

Active entry: `cosmic-harness-DUe0OSBb.mjs` SHA-256 `ac6c4c31ed46a45d2b7c4bbe2d56ddd670f7e49f87fa5657ced7b6eee68d6fbb`.
Compatibility chunk: `cosmic-compatibility-Cohr30Z8.mjs` SHA-256 `81a94e7ca8610cffbf112e57c69b58995e8fcd80871ffe8e70a0b98037327bf5`.

## Native captures and visual review

All five PNGs were opened and inspected. The accepted vegetation, basin reflection, planet identity and desktop/Fold composition remain intact. The supported and byte paths both show actual reflected garden/planet detail, not a fallback poster. Byte is a real RGBA8 render on the same capable driver; it can clamp reflection HDR values and is not claimed to be identical to half-float.

| Capture | Size | SHA-256 |
| --- | --- | --- |
| [cosmic-auto-desktop.png](cosmic-auto-desktop.png) | 1280×800 | `af8a0449c206495d548cd4cba64ed10bf5101571331154683bbb824657529c32` |
| [cosmic-auto-portrait.png](cosmic-auto-portrait.png) | 344×882 | `b26c29c7fa81396f6b8d7bdf6ebe141eeefd99929e0d09022966ae016efae927` |
| [cosmic-auto-landscape.png](cosmic-auto-landscape.png) | 882×344 | `72dea2648545d026cd0bc65056f18f184bc55968a2c9af41657522fc5298ca55` |
| [cosmic-byte-desktop.png](cosmic-byte-desktop.png) | 1280×800 | `7fa19f50a2d0445d0feb3ae536a17c7335a2bb3d44489745bea67c2c121cf4f0` |
| [cosmic-byte-portrait.png](cosmic-byte-portrait.png) | 344×882 | `da155a1b08edf9d2255715ee1ed08fcd324189d220b867081a311e29be1d72c6` |

## Reproduce and inspect

Built harness: `/immersive-worlds/cosmic/preview/index.html`. Standard React/lifecycle controls use no query; `?clean&still` opens a clean component still. `?compatibility=auto&probe` and `?compatibility=byte&probe` run the exact scene engine with explicit target selection and a disposed validation-only GPU probe. Production CosmicWorld props remain minimal `{active:boolean}`; the host always auto-selects the real capability.

```bash
node components/immersiveWorlds/cosmic/validation/build-harness.mjs
SCENE_BROWSER_PATH=/path/to/chromium node components/immersiveWorlds/cosmic/validation/verify-correction.mjs
SCENE_BROWSER_PATH=/path/to/chromium SCENE_HARNESS_PATH=/immersive-worlds/cosmic/preview/index.html SCENE_SCREENSHOT_DIR=components/immersiveWorlds/cosmic/validation/correction-20261004/lifecycle node components/immersiveWorlds/cosmic/validation/run-local.mjs
```

[Exact source/bundle/image/check hashes](HASHES.sha256) · [Build command output](build-report.json) · [Compatibility capture evidence](compatibility-report.json) · [Lifecycle result](lifecycle/cosmic-validation.json)

## Limits and attempt history

- Actual browser: Chromium153 / ANGLE Vulkan SwiftShader WebGL2. Native mobile performance, thermal/battery behavior, and actual half-only/unsupported devices were not measured. Extension combinations and incomplete-half cases are unit-tested with local renderer doubles; no WebGL API/prototype monkeypatch is used in actual rendering.
- Hidden behavior uses synthetic visibilitychange, not an OS-level background-tab switch. No production routing/audio/core integration was performed. Nebula remains layered analytic shading; existing initialized/resize shadow policy remains.
- The first compatibility capture completed all render checks but correctly failed its final fingerprint assertion when an old published bundle appeared in the file set. The failed report is preserved as `attempt-source-set-changed.json`. Build now preserves prior hashed assets; the final complete rerun, lifecycle suite and build gates all share the stable digest above. No earlier evidence was silently relabeled as a final pass.
- Existing Vercel preview protection is unchanged. Hosted deployment SHA/status must be checked separately; a login wall is not remote visual verification. Local built-harness verification above is complete.
