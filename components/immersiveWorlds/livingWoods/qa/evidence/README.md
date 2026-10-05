# Evidence index

`report.json` is the final acceptance report. Each retained world PNG is an actual WebGL canvas readback and is bound there to its SHA-256, native viewport, source inventory and production bundle hash. These are rendered geometry, not generated concept images or fallback posters. The canvas-only capture excludes browser chrome and harness controls.

The source revision identifies the frozen scene code and QA harness. The report separately records `verificationRunnerSha256`: the successful verification removed optional extra readbacks after a reproducible software-browser stall, while reusing the byte-identical production bundle. Scene code and rendering resolution did not change. Later handoff documentation and evidence commits do not change that rendered code.

`build-results.json` records typecheck, unit tests, existing app build and initial bundle budget. That app build does not imply the entries have already been wired into the shared registry.

## Historical diagnostics — not current acceptance

- `first-pass-report.json` records the first visual pass. Its original named viewport files were superseded by the final captures. Only the useful morning comparison is retained as `before-morning.png`; see `before-morning.json` for its exact provenance. The initial bamboo shader failure was fixed before the final run.
- `failed-f74745f-post-motion.json` and `motion-diagnostic/result.json` preserve the bounded browser-compositor failure investigation. `motion-diagnostic/cold.png` belongs to that older diagnostic bundle, not the final scene bundle.
- `failed-e29-interaction-readback.json` records the optional extra-readback timeout that led to the final runner adjustment. It does not replace `report.json`.

Historical JSON records retain their original source/bundle hashes and error messages. Their generic screenshot filenames are historical references, not claims that the current files at those names came from the historical bundle.

Physical phone/Fold performance, thermals, real browser-tab switching, shared app fullscreen wiring, and audio mixing are outside this isolated evidence. Viewport dimensions, synthetic visibility testing, real pointer raycasts, and canvas ownership checks are identified explicitly in the final report.
