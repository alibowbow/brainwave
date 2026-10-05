CI 37243249979 Forest/Cafe failure audit

Both results remain **failed**. Their immediate failed operation is the first application Pause click; neither record establishes a renderer initialization failure.

| Evidence | Forest | Cafe |
| --- | --- | --- |
| Artifact | `11318362475`, ZIP SHA-256 `64f483a7b5abd63763b3a66d96d4c2408e5c569343709718807b0dde9ca5759c` | `11318282870`, ZIP SHA-256 `0cd241d45e3e7b084e7945a6f7036fdd033243bece2d4b7e960ff0853e2b22c4` |
| Failed gate | Application pause stops the real renderer | Application pause freezes rendering |
| Actual failure | `includeHidden: true` Pause locator resolves, but button remains invisible; click times out at 120000 ms | Same hidden Pause locator timeout at 120000 ms |
| Completed scope | Nine standalone gates, then application ready/advancing frames. Standalone includes active=false, four viewport captures, holder transfer, simulated hidden, OS/app reduced motion, disposal and fresh remount. | Cold route readiness and first native Play gate pass. No screenshots or later app/standalone gates reached. |
| Failure-time scene | Ready, running, 12 frames, context not lost | Ready, running, 44 frames, one live scene context; refraction/reflection/shadow FBOs complete |
| Captured runtime/renderer errors | 0 | 0 |
| Browser cleanup | Graceful close and owned process exit confirmed | 30000 ms graceful-close failure retained; owned PID subsequently killed and exit confirmed |

Both reports record checkout `961bc6c08d12460eb789ce26f025d5fae9920b1e`, tree `9a39c0ac5ebc2c759ec432945bef6369a1354795`, identical to published `19c0561bff1b17d88c447a63fd8bb7e4315c8514`. The source and dist digests recompute correctly and remain stable. All 19 application response hashes in each report match their recorded dist entries. Independently compared the actual scene/runtime/harness and relevant shared QA sources against published Git blobs: Forest 29 files, Cafe 28 files, all matching. Standalone development-transform responses remain separately labelled; no source-transform byte equivalence is invented. CI's successful build step is the source-to-build evidence; emitted dist binaries were not re-downloaded or rebuilt in this audit.

All five actual Forest PNGs were decoded, hashed and opened: desktop, Fold cover, Fold inner, landscape and second holder. They show the expected complete forest, reflective water, rocks, vegetation and depth. These are standalone captures with the QA panel, not a completed integrated application visual gate. Cafe's new artifact contains no PNG, so no Cafe visual conclusion is drawn from this run.

Cafe's cold evidence is materially stronger than an observation-only startup claim: user activation is false, one suspended AudioContext and zero graphs/sources/oscillators are observed before the first input; the timer remains 40:00. The first recorded pointerdown/up/click sequence is trusted and lands on the visible, non-inert, hit-tested “눌러서 재생” button. Only then does the single context run and its graph start. The later pause failure must not be relabelled a cold-autoplay failure. Forest's startup gate does not establish this stricter untouched cold boundary.

The shared helper currently reveals chrome with one mouse move to the scene center, then asks Playwright to click a hidden-inclusive first match. Production auto-hide remains 3.6 seconds unless a chrome control holds focus. The logs prove an invisible target timeout; they do **not** prove whether the initial pointer reveal was absent or the chrome hid again while actionability waited. That causal distinction is not recorded.

A narrow, unexecuted QA proposal is in `pilot-control-draft/native-focus-control.patch`: post-start controls use native Tab to obtain the real production focus hold, require focused/visible/non-inert/hit-tested geometry, then perform one native mouse click and verify its trusted target event sequence. It changes only the Forest/Cafe/Cosmic press wrappers plus one shared QA helper. Cold startup, pointer reveal/hidden drag gates, pause/frozen assertions, renderer source, hide timer and existing timeouts are retained. It does not turn either historical failure into a pass.

All four draft modules pass syntax checks and the patch passes read-only `git apply --check`. No GPU/browser execution was performed. Integrated pause/controls and Cafe graceful cleanup remain unresolved until a fresh source-bound run succeeds; no renderer change is justified by these records alone.
