# Winter consecutive fresh-engine regression

Build the unchanged original QA entry, then run one browser with the exact source/bundle manifest:

```sh
COZY_BUNDLE=/tmp/cozy-followup-bundle node components/immersiveWorlds/cozyRooms/qa/followup/build.mjs
SCENE_BROWSER_PATH=/path/to/chromium COZY_BUNDLE=/tmp/cozy-followup-bundle COZY_OUTPUT=components/immersiveWorlds/cozyRooms/qa/recreation-cycle/evidence/final node components/immersiveWorlds/cozyRooms/qa/recreation-cycle/verify.mjs
```

The runner verifies source maps contain the original entry, shared host and exact current engine. It observes three engine/canvas identities, actual initial animation, three final-holder disposals, and two fresh native keyboard actions with one bounded callback and one zero-time static frame each. The first and second recreation waits each retain a 120-second bound; disposal retains 30 seconds and the actual 5000-ms host grace. It adds no production instrumentation, screenshot, fence, readback, reload, forced context loss or retry.

The current [report](evidence/final/recreation-cycle.json) passes, including cleanup, but is a smaller workload than the original suite. It does not clear the separately retained [winter original-sequence failure](../recreation/evidence/final-original/failure.json). GPU reclamation and physical input devices are not measured. See [the integration handoff](../recreation/HANDOFF.md).
