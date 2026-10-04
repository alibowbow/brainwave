# Café pilot verification — 2026-10-04

## Executed checks

- Remote starting main: `1bb79ac572e8568676881bbc7b4404f1bac443e8`.
- No AGENTS.md or .agents/skills found in the checkout. README verification instructions followed.
- `npm run typecheck`: pass.
- `npm test`: **23 files, 147 tests passed**.
- `npm run build`: pass. Existing large-chunk warning, no build failure.
- `npm run check:bundle`: pass; initial JS 402.6 KiB / 410 KiB, CSS 99.5 KiB / 135 KiB. Main app entry chunks remain identical because shared routing is not touched.
- `node components/immersiveWorlds/cafe/qa/build.mjs`: pass. Optional isolated renderer bundle 802,879 bytes, approximately 220 KiB gzip.
- `qa/verify.mjs` against the compiled pilot: **23 checks passed, zero page/runtime/shader errors**. Exact output: `screenshots/results.json`.

The browser verification exercises actual WebGL2, not a poster: native canvas dimensions, geometry rendering (>30,000 visible triangles), changing captured pixels while rain/steam runs, drag camera movement and gradual release, cup/lamp/window pointer callbacks, pause and ignored paused taps, system/app reduced motion, injected hidden/visible signal, same-canvas fullscreen-holder transfer, delayed dispose and fresh remount.

## Screenshots and exact code mapping

`desktop.png` 1280×850; `fold-portrait.png` 412×915; `fold-inner-portrait.png` 673×841; `fold-landscape.png` 915×412. All DPR 1, Chromium 153 + SwiftShader software WebGL2. The images are actual full-resolution framebuffer output from the compiled review page, with no generated/composited image replacement. The caption is English in the isolated harness because the bare test browser lacks Korean fonts; the component's Korean accessible name and card identity are unchanged.

Screenshots use `cafe-pilot-C5hLuGho.mjs`, SHA-256:
`7596e57bedad17f0fd5c1f9e71cfcb48fb41eb097089654a23a137d86fccbe6c`.

This bundle is based on initial remote café commit `051c5249e9531172db37124106e03c272a7864f6`, plus the final maximum-drag-distance tap guard and English QA caption. The 3D engine/world/materials are identical to that initial commit. The commit containing this report also contains those source changes, the matching compiled bundle, and these PNG files. See screenshot manifest for file hashes.

## Visual review and fixes performed

Initial real renders were overbright and the plant was simplistic; these were not accepted as final. Corrected cloned render-target texture linkage (Reflector initially nulls such uniforms), interior floor/ceiling extending outside, opaque steam shadow planes, customers facing away from their tables, overexposed fill lighting, and portrait clipping. Added custom curved/pointed plant leaves and thicker lathed pot, split exterior/café volumes, darker cool exterior against local warm pools, and smooth aspect-dependent framing. Applied the independently reviewed Opus glass principles: multiple bead scales, sparse slow tails, rim/gathered highlights, gentle edge fog and local inside-glass clearing.

Desktop and narrow actual screenshots were manually inspected after the corrections. Cup, steam, lamp, glass rain and reflections, wood, linen, depth and distant quiet guests remain readable. Fold portrait includes more floor/ceiling than desktop; it preserves the lamp and cup together.

## Disposal timeout investigation

An initial long mixed dev-harness run timed out while waiting 20 seconds for the saved canvas to report disposal. No page error accompanied it. A focused fresh test confirmed after 7 seconds: canvas lifecycle `disposed`, host holder count 0, engine absent. The final suite uses the built artifact (no source hot reload), 100 ms polling after canvas removal, and a generous software-renderer timeout. Delayed disposal and remount both pass. The earlier timeout is recorded as a test synchronization issue; no renderer leak was established.

## Boundaries, accurately stated

- These are emulated viewport sizes, **not a physical Fold**. No real phone GPU/frame-rate claim is made. Software WebGL was slow; quality was not reduced to hide that.
- The hidden check injects document.hidden/visibilitychange. Actual OS backgrounding/native tab suspension was not independently exercised.
- Fullscreen test is the application's two-holder canvas movement pattern, not an OS/browser fullscreen request.
- Routing through the integrated production card, integrated audio, and production-device performance are for the parallel integration owner. The normal app build does not itself import this unintegrated component; the separate pilot production build does.
- Initial Vercel preview for `051c5249…` was READY, but browser navigation redirected toward Vercel authentication/account origin. Automatic approval review rejected that browser navigation. No share/bypass token, login grant or protection change was made. All screenshots above were produced locally, not misrepresented as authenticated preview QA.
- Procedural human/building models and shader water are approximations; no fluid collision or ray-traced street-reflection claim.
