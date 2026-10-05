Audio failure/recovery actual-App run — strict PASS

All seven original gates completed in 40.579 s on frozen HEAD `19c0561bff1b17d88c447a63fd8bb7e4315c8514` plus recorded changes, build `index-CkDIijGa.js` / `index-BXP0utCv.css`. No additional runs or repository writes occurred.

- Both hybrid and recording-only sessions began with one suspended AudioContext, no audio graph/source start, no prior input and no user activation; one trusted, visible, hit-tested playback click started each.
- Injected failures for wind/birds/creek recordings preserved hybrid procedural PCM output: peak0.0340058, RMS0.0185429 over12samples at100ms intervals.
- The real picker isolated the approved rain recording. Its failure produced the actionable Player notice; measured master PCM peak/RMS were0. Internal muted generators are not claimed absent.
- Immersive retry kept one AudioContext and one analyser graph; the persistent injected failure remained silent with one actionable notice.
- Removing the injected failure and using one trusted retry recovered the same rain recording: successful decode1, native media playing event1, PCM peak0.00908557/RMS0.00267318. The context/graph remained1/1.
- No uncaught runtime errors beyond expected injected HTTP failures. No gate remained unrun.

All four actual PNGs were opened. Player failure has one readable header-adjacent notice and retry action; its cropped lower scene does not independently prove bottom-control visibility. Immersive failure shows the single notice plus clear mode/exit/transport controls without overlap. Recovery shows the notice gone, visible transport/settings and keyboard focus on fullscreen. Hybrid capture shows its distinct bamboo/stream scene; no visual redesign judgment is made.

| PNG | Dimensions | SHA256 |
|---|---|---|
| hybrid-fallback.png | 1280×900 | `e0427d1acc9133633c7fe14cd6058051ffcd56ae4188579bdb95874ceef9f2bf` |
| rain-player-failure.png | 1280×900 | `57a5ee0bb8fa272ee368660380aa3e987d8aea201fc3e9d85c99586ba3e28cca` |
| rain-immersive-failure.png | 1280×900 | `58b87aecb5960ad3e2306f5ea00282678a6ac7a9820c515b0afc538cc601a32f` |
| rain-recovered-player.png | 1280×900 | `b46cb6128dca2fc8e78fb5f0f9472f87eb4240140494d6fc33fb41cbb4e1d37b` |

SourceStable, distStable, applicationBound and final provenance.valid are all true. Owned Chromium PID53 exited normally (code0), close ACK53ms, no forced kill/errors; own preview/verifier handles ended. GPU is released.

Exact `completed-report.json`: **753529 bytes**, SHA256 `848b903f652a7617e1e813b6b8a69af484f4810a8f1e4d71312f39a01642458e`. The archive was copied once after verifier exit, fsynced and checked byte-for-byte. A separate post-run read revalidated its hash and terminal provenance/cleanup; original raw report also matches. This resolves preservation for this new run only; earlier LINKS evidence remains untouched.

PCM was measured at the existing pre-limiter master analyser. This is technical playback/recovery evidence, not a human listening, speaker/headphone, perceptual-quality or loudness assessment.
