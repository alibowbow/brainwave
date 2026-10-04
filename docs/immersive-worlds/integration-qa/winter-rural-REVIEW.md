# Actual-app Winter → Rural → guide: failed20s context-loss gate

Run 2026-10-04T22:26:27.675Z–2026-10-04T22:26:56.065Z; both cold scenes passed with blocked autoplay, paused real frames and userActivation=false. No user gesture, screenshot, GL fence/readback, engine call or quality override was introduced. The same-document observer token was retained through both route changes.

| Context | Actual world | Final observed state | Native loss event |
|---|---|---|---|
|1 `cozy-world-canvas`|`nature:winter_lodge`|Detached; `lost=false`21,323.3ms after its detach; frame3|None observed|
|2 `korean-world-canvas`|`nature:rural_summer_night`|Detached; `lost=true`; paused frame1/time0|Trusted event5,009.4ms after detach|

The unchanged20,000ms predicate failed. Final observation was20,003.1ms after final canvas detachment; wall elapsed from guide navigation20,020ms. The Cozy context was still not lost, so this is not merely a boundary-rounding failure. Browser and preview closed without errors; the run ended with exit1 and released its GPU use.

Actual checkout HEAD `693f49529e0d5194710dbd8df10c59058491019c` with the current frozen dirty source, including the parent's Water d5/Cozy f154 intake. Source digest `1eb71d8301fc1c57ab8269b40c6572a42a27c5eea3aff1e9ad93f6cb3b7218fa`; dist digest `1a145dd9340bb4554a8a02980ff6bf5c4f9ec1293208d38159aaee8f3452ce64`. Source and dist remained stable; application response hashes matched the production build (`index-Bh0VMtiw.js`, CSS `index-Dxjefzym.css`). Complete hashes, dirty-file list, observed datasets, lifecycle identity events and release samples are in `results.json`.

This identifies the surviving context in this narrow shared-player-host sequence. It does not retroactively invent missing context identities for the original Nature-studio CI run. Cozy's source intentionally disposes renderer/resources without `forceContextLoss`; this observer retains references to every context/canvas, so eventual browser garbage collection is not a valid pass condition under this instrumentation. The run did not observe an exposed Cozy dispose entry/return signal; it establishes the native-context-loss mismatch, not a proven GPU resource leak or a clean disposal/remount pass. Any contract adjustment remains a separate reviewed decision; this failed raw result is preserved.
