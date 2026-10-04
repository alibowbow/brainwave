# Independent visual and source review

**PASS for the three bounded visual corrections**, reviewed at implementation commit `eff612d8ea6ba63d2cc41a11d834e5fa11518461`. This is a visual/code review of the isolated CozyRooms harness, not an integrated-app or lifecycle acceptance.

The reviewer read the original brief, capture diagnosis and provenance; inspected actual pixels in all 11 original PNGs and all 10 final PNGs; reviewed the production diff; and independently matched every final PNG's SHA-256 to `evidence/final/followup-capture.json`.

- Production source SHA-256: `673d3f3dcf1e8659a6d2784435aac6e6601a6da592cb74ca4a3a38b217954bf9`.
- Built bundle SHA-256: `293e1467d2c6c919f61a3afb8db8e5a64bbd5b710263973953afc7ef28238bd0`.
- Recorded browser: Chromium `153.0.8010.0`.
- Final coverage: all four worlds at 1280×850 and 412×915; nap additionally at 673×841; lodge additionally at 915×412. These are native viewport PNGs at DPR 1, not images pasted into the scene. Fold-like dimensions establish viewport composition only.

| Requested correction | Final pixel finding |
| --- | --- |
| Lodge portrait includes fireplace while retaining the seated window view | `nature-winter_lodge-portrait.png` shows the stone jamb and visible flame at the right edge, with the window, lamp and cup retained. The blanket still naturally hides most of the low fuel bed. Wide camera and prop framing remain fixed. |
| Relax/lodge fuel, embers, flame and local warmth | Relax desktop/portrait show subdued dark wood, irregular split contours and fine grain; varied translucent flame bodies rise behind the fuel. Orange-red fissures remain visible among dark coal/ash pieces. Lodge desktop/landscape show the same treatment at smaller scale. Logs remain seated on the fuel supports, and low-range warmth touches nearby material without a whole-room exposure change. The intermediate tan tile pattern and unlit coal bed were rejected and corrected before this pass. |
| Three to five prominent trees per scene become less repetitive | Four nap trees have unequal continuing leaders, offset limbs and clustered foliage, with clearer foreground/middle/distant separation in desktop, portrait and inner viewports. Four lodge crowns have differing gaps, reach and snow coverage while retaining the forest depth and existing window composition. |

## Preserved composition and source

Sleep source is unchanged. Both final sleep PNGs are byte-for-byte identical to the original evidence: desktop `811cbdf9de028a333cc3f1d64af90f66f624682255906d96c99af9530c65f982`; portrait `9d99b44781739d5853b658453e284c77e2e510ce9913f808d7a883f75f4334d5`.

Sampled lodge desktop lamp/table, near blanket and ceiling regions remain pixel-identical, as do landscape lamp/table and ceiling regions and the near blanket below y=345. Relax's upper room above y=300, far-left wall and near foreground samples also remain identical. The new local light intentionally changes some fireplace-adjacent masonry and a small nearby blanket area; the entire landscape PNG is not byte-identical. Tree and fire pixels are intentionally different.

The production diff from original head `7373c1eeb5372fa9bebf41889ff2960643f3990e` contains only `fireDetail.ts`, `hearth.ts`, `napTerrace.ts` and `winterLodge.ts`. Engine, chrome, CSS, shared lifecycle and sleep files are unchanged. New materials, textures and attached geometries are reachable by the existing set-based disposal traversal; temporary coal geometries are disposed after merging. Shader coordinate frames and constant loop/array bounds were reviewed. The negative-base GLSL `pow` portability issue was corrected to multiplication. No unresolved static shader/resource blocker was found.

## Limits

This review makes no physical-device FPS, thermal, audio-quality or GPU-cause claim. A successful paused capture or GPU fence observation does not prove a prior timeout's cause or certify runtime scheduling. It does not establish integrated-app chrome/input behavior, real tab hiding, or lifecycle timing.

Lifecycle/recreation evidence is tracked separately. At drafting time, the owner reported 78 checks passing across three worlds in the unchanged legacy group, then a 120-second winter recreation timeout after disposal; an isolated retry was still running. No all-world lifecycle pass is inferred here. This reviewer made no production edits and launched no browser.

Owner validation update after this review: the unchanged isolated winter retry also timed out on recreation. Separate capture-free disposal timing passed for all four worlds. The original suite remains failed with 78 completed labels, and motion-only pixel proof remains unrun. See [final handoff](HANDOFF.md); this does not alter the scoped visual review above.
