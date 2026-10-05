# Shared application QA checkpoint

All renderer owner trees remain unchanged from core `19c0561`. The production host now records actual disposal calls and returns. QA separates native user input, non-gesture observation, owner cleanup and renderer-internal retention.

| Evidence | Result and scope |
|---|---|
| [Audio](audio/review-summary.md) | All seven original failure/recovery gates pass, including real first input, same-context retry, restored recording PCM and normal owned-browser termination. Runtime `index-CkDIijGa.js`. |
| [Links](links/review-summary.md) | Four original functional bundles pass. Terminal wrapper/log records normal cleanup and final provenance; preserved raw JSON lacks final terminal fields. This archival discrepancy is unresolved; raw bytes were not reconstructed. |
| [Water](water/review-summary.json) | Actual summer-valley Play/Pause/End and native context loss within fixed20s pass at prior `index-BIpQoT7O.js`. The owner11.249s synchronous disposal observation remains a separate limitation. |
| [Cozy](cozy/review-summary.md) | Overall failure preserved: old total-texture-zero assertions and15s graceful browser close. Actual disposal/native-listener removal/quiet observations, exact DFG upload identification, fresh Winter readiness1345ms/newcanvas/native callback/lifetime advance were separately observed. |
| [Earlier Cozy](cozy-first/review-summary.md) | First texture-counter failure, normal browser cleanup; fresh session not executed. |
| [Earlier binding attempt](links-binding-first/review-summary.md) | Missing CDP Page.enable prevented startup binding; failed run preserved before protocol fix. |

The later owned-resource assertion accepts geometry0 and either texture0 or the complete independently hashed DFG-only internal classification. Any unknown texture, extra live handle, failed dispose, active owned listener or unsettled draw remains a failure. Other renderers retain actual context-loss20s. Retention and browser acknowledgement time remain inside the deadline. This correction does not relabel either failed Cozy run or waive fresh readiness120s.

The DFG raw handle, four renderer placeholders and source-identified module-global listener→renderer/context reference path remain unresolved internal retention. Native texture deletion/accounting and mocked-renderer source/unit tests do not measure physical GPU reclamation. No physical-device FPS/thermal or listening claim is made.

The [artifact manifest](artifact-manifest.json) records original and stored hashes. `.json.gz` files expand to exact original report bytes; no fields are removed or rewritten. The [Cozy source diagnosis](cozy-winter-residual-texture-source-diagnosis.md) predates the direct handle-identification run and is retained with its stated scope. Review summaries preserve original local run paths as provenance identifiers.
