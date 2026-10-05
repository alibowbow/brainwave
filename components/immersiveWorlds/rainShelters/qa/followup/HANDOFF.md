# RainShelters follow-up handoff

Bounded visual and render-target correction is complete at validated source `1897ea5295fa1a88777e3aae8f969d888df607d4`. Local typecheck, 164 tests in 24 files (17 new compatibility-policy cases), production build and bundle gates passed. Eight fresh baseline and sixteen normal/byte after captures passed. Thirty-two separate compatibility/input/motion/lifecycle browser segments passed (168 labeled checks). These are segmented tests, not a single uninterrupted full-app run. Remote publication and exact-head CI are recorded in the PR after publication.

## Branch and scope

- Follow-up: `codex/rain-shelters-quality-followup-20261004`, based exactly on original PR53 `0dc8e935fb950bf43ede4ab96b3623649d2bc37f`.
- Target: `codex/rain-shelters-four-worlds`. Do not merge from this Work; central integration owns final intake/main.
- Original runtime/input source: `4c0131625bd0ef127f08a0539128abbe00d90d12`.
- Startup PR/branch head guard passed. No competing Rain follow-up among 20 open PRs; only this Work is authorized. Publication guard is separately recorded.
- All 212 files outside Rain ownership, main `14940149cc5c0fccb778b58d4d755a04aea55e53`, protected worlds and shared audio/player/host remain unchanged. All 32 original evidence files, 17 actual PNGs and original segmented failures are retained.

## Visible correction

GardenWindow now uses four curved leaf/sepal surfaces, varied proportions/tilt/curl, small material roughness variation and direct-light thin-surface scattering. Droplets still refract the actual garden, with smaller irregular transparent caps and restrained highlights. The green-bead cue is removed. The window seat, sash, sill, bowl, path, distant garden, rain and trace recovery remain.

SummerStorm preserves its seated shelter/camera/awning/props and calm motion. Its 4,200 tussocks have tapered bent blades, folded midribs, dark root shading and irregular clumps. The 55-tree shelterbelt keeps its extent, gains varied crowns and a 28-tree farther layer; rain curtains have broken detail and depth tones. No lightning, flashes, new audio or sudden motion was added.

[Independent source/pixel review](INDEPENDENT_REVIEW.md) accepts these bounded corrections. Distant procedural crowns and clustered hydrangea forms remain visible; no photorealism claim is made. Tent and Porch desktop/portrait before/after PNGs are **byte-identical**. Window normal/byte maximum channel delta is 3/255 (mean 0.288 desktop / 0.219 portrait); no visible clipping or material loss was found. All other normal/byte compositions are byte-identical. [Exact pixel/image hashes](pixel-comparisons.json).

| Focus | Before | After normal | After byte |
| --- | --- | --- | --- |
| Garden desktop | [PNG](evidence/before-window-normal-desktop.png) | [PNG](evidence/after-window-normal-desktop.png) | [PNG](evidence/after-window-byte-desktop.png) |
| Garden portrait | [PNG](evidence/before-window-normal-portrait.png) | [PNG](evidence/after-window-normal-portrait.png) | [PNG](evidence/after-window-byte-portrait.png) |
| Storm desktop | [PNG](evidence/before-storm-normal-desktop.png) | [PNG](evidence/after-storm-normal-desktop.png) | [PNG](evidence/after-storm-byte-desktop.png) |
| Storm portrait | [PNG](evidence/before-storm-normal-portrait.png) | [PNG](evidence/after-storm-normal-portrait.png) | [PNG](evidence/after-storm-byte-portrait.png) |

## Compatibility result

The actual owned Window effect is custom full-size same-camera refraction, **not Reflector**. No environment, PMREM/CubeUV or positive-transmission target exists in these four sources. Nothing was removed to avoid compatibility work. Existing hemisphere/directional/point illumination remains.

Real float/half-float color-renderability extensions plus full-size framebuffer completeness select RGBA16F; missing support or failed half allocation disposes that storage and allocates/checks RGBA8 before draw. Forced byte uses an explicit owned QA choice without falsifying native extensions. Resize rechecks newly allocated full-size storage. Actual native-size 1440×960 / 390×844 Window targets and Window/Porch 1024² RGBA8+unsigned-int-depth PCF shadow targets all returned FBO36053, zero GL errors and restored state. No target/DPR/resolution reduction or FPS cap.

A real cube sentinel at face2/mip1 verifies success and exception restoration, including the actual Window refraction pass and its JavaScript render-boundary exception. Glass visibility also restores in `finally`. Half-only/no-extension/advertised-incomplete/failed-final-byte policies are explicitly **mocked-GPU unit cases**, not fake hardware evidence. The shadow preallocation follows installed Three0.186.1 semantics and must be reverified on upgrade.

[Three r186 Reflector reference](https://raw.githubusercontent.com/mrdoob/three.js/r186/examples/jsm/objects/Reflector.js) and [Khronos half-float specification](https://registry.khronos.org/webgl/extensions/EXT_color_buffer_half_float/) informed the audit. No JEV code/assets were copied; both original collection observations remain in the original SOURCE_PROVENANCE.md.

## Measured lifecycle limit

All sixteen cold/remount cleanup cycles passed the fixed **20-second removal-to-dispose-exit gate**, including the configured 5000ms host grace. The second cycle includes short actual motion and holder transfer with no screenshot or pre-disposal fence drain. Actual context loss and fresh canvas remount are checked. JS submission return, later GPU-fence completion, screenshot overhead and cleanup timings are separate.

| Scene / mode | Cold removal → exit | Motion/holder removal → exit | Second dispose body | Maximum heartbeat gap |
| --- | --- | --- | --- | --- |
| window / normal | 5.917s | 19.536s | 14.535s | 14.543s |
| window / byte | 5.694s | 18.590s | 13.589s | 13.597s |
| storm / normal | 5.024s | 9.893s | 4.892s | 4.940s |
| storm / byte | 5.019s | 6.824s | 1.824s | 1.862s |
| tent / normal | 5.026s | 7.872s | 2.871s | 2.913s |
| tent / byte | 5.024s | 6.946s | 1.938s | 1.952s |
| porch / normal | 5.027s | 10.197s | 5.197s | 5.204s |
| porch / byte | 5.031s | 12.340s | 7.338s | 7.382s |

**Window responsiveness remains a material integration limitation:** its motion/holder cleanup takes 18.590–19.536s total, only 0.464s below the gate in the slower normal case, and a 14.5s event-loop gap was measured. A pass is not five-second release, responsive transition acceptance, physical GPU memory reclamation or sustained-play performance proof. The diagnosis's scheduling proposal was not copied blindly, and no production scheduler or quality reduction was introduced. Central integration must still assess real App transition responsiveness.

Native mouse tap/drag and visible button/range-control exclusion, static single-image change without simulation advance, pointercancel/blur, holder identity and one-event ownership, pause/reduced-motion/static/synthetic hidden behavior, disposal and fresh remount passed. Synthetic stimuli are identified. Actual post-input chrome PNGs are included; these show this isolated fixture, not completed shared App wiring.

## Reproduction and evidence

[QA methodology/commands](README.md) · [Derived summary](evidence/summary.json) · [All artifact SHA-256](evidence/artifact-manifest.json) · [Local gates](local-gates.json) · [Scope preservation](scope-preservation.json) · [Dependencies/shared-source hashes](runtime-dependencies.json).

Validated QA JavaScript: `assets/index-DeYwlQ_G.js`  
Uncompressed SHA-256: `5c29aea525e13347c1e96af3265aa26150b430f2ed1488da53070c345cf9d8a8`. Gzip copies of before/after emitted JS/CSS are retained in [bundle evidence](evidence/bundles/manifest.json) and can be independently decompressed/rehashed. Every PNG is an unaltered native screenshot bound to source and independently hashed served JS/CSS.

Physical-device/Fold/FPS/thermal behavior, real native tab switching, prolonged play, listening quality and central shared App routing/audio/touch-policy acceptance remain unverified. `active:boolean` is still the only required prop. No independent AudioContext/player, new permissions/tokens, paid service, billing/security/deployment settings change, force push, original-branch write or main merge was performed.

The build directory also retained earlier unserved `index-C4gziLaJ.js`; it is explicitly labeled prior-build evidence, not the tested entry. All 48 after segments independently served `index-DeYwlQ_G.js`, as recorded in their response hashes.
