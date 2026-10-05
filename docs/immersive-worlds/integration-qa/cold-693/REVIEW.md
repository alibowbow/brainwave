# All 30 normal portrait cold-entry review

**30/30 passed**, with 30 native PNGs and 391 checks. Run: 2026-10-04T22:07:16.692Z to 2026-10-04T22:10:44.417Z. All worlds were actually ready and paused with a rendered frame before any user activation. Browser autoplay was blocked; no play gesture was used. Every initial/after-capture activation value stayed false and scene callbacks remained zero.

Runtime HEAD: `693f49529e0d5194710dbd8df10c59058491019c`. Served app assets: `index-DE69dX8D.js` / `index-D2nj3flF.css`.

- Source digest: `f3e935fdecfd2ced1621a9f80739afb483411bb422d04d5b55aba9433229bf11`
- Dist digest: `d2eb4b588acb0c67d2eec593aa9102fd208efbc33c7e8dedef3aa83b15502d7f`
- Source and dist remained stable throughout, and all captured delivered asset bytes matched the snapshotted build.
- Ready limit 90s, capture limit 30s and worker cap150s were unchanged. No CSS, quality, engine, GL capability or clock overrides were used.
- Every browser/context and local preview closed. This is process isolation, not an app disposal-lifecycle proof.

All 30 images were visually reviewed. Twenty-seven final PNGs were opened directly; Cafe, country_morning and Meditation final bytes exactly match their directly opened smoke PNGs. No blank canvas, error fallback or duplicated placeholder was observed. The actual blocked-autoplay banner remains in each screenshot, so the scene's lower area is partly below the portrait viewport; no capture framing or app styling was altered to conceal this.

| World ID | Cold gate | Visible scene-specific evidence |
| --- | --- | --- |
| `amb:morning_forest` | Pass | Layered trees, near stones and reflective forest pool. |
| `amb:focus_cafe` | Pass | Rainy window, lamp, ceramic cup and exterior buildings. |
| `amb:cosmic` | Pass | Planet, floating planted islands, foreground foliage and basin reflection. |
| `amb:night_pond` | Pass | Moonlit pond, near lotus leaves, flower and distant tree silhouettes. |
| `nature:summer_valley` | Pass | Clear stream, submerged stones, banks and receding foliage. |
| `nature:pebble_shore` | Pass | Near rounded pebbles, shallow water, sea horizon and distant headland. |
| `amb:waterfall_valley` | Pass | Tall rock aperture, waterfall streaks, reflecting pool and foreground plants. |
| `amb:cave_meditation` | Pass | Enclosed cave, small roof opening, shafts of light and reflected stalagmites. |
| `nature:deep_sea` | Pass | Rock wall, near translucent jellyfish and smaller animals at depth. |
| `relax` | Pass | Stone hearth, timber, ember bed and actual flame forms. |
| `sleep_prep` | Pass | Bed foreground, curtains, bedside lamp and moonlit window. |
| `power_nap` | Pass | Reclined blanket foreground, terrace objects, shade and vegetation. |
| `nature:winter_lodge` | Pass | Blanket foreground, lamp/table, fireplace and snowy trees outside. |
| `nature:tent_rain` | Pass | Tent walls and seam, sleeping bag, lantern and rainy forest opening. |
| `nature:window_rain` | Pass | Garden window framing, hydrangeas, bamboo, rain and bowl. |
| `nature:monsoon_eaves` | Pass | Eaves and timber post, stone basin, bamboo spout and rainy rocks. |
| `amb:summer_storm` | Pass | Porch roof, wind-chime pull, lantern, jar and wet green field. |
| `country_morning` | Pass | Porch tea cup/book, stone wall, flowering yard and trees. |
| `amb:rainy_forest` | Pass | Near wet broad leaves, trunks, ferns and small receding channel. |
| `amb:deep_forest` | Pass | Massive near trunk, roots, forest depth and foreground fern/leaf. |
| `nature:bamboo_grove` | Pass | Near segmented bamboo, leaves, stones and reflective creek. |
| `nature:temple_dawn` | Pass | Detailed bronze bell, beam, painted temple trim, courtyard and tea set. |
| `nature:scops_night` | Pass | Owl on branch, lantern and night stream/vegetation. |
| `nature:rural_summer_night` | Pass | Field path, utility lines, lit rural home and moonlit trees. |
| `amb:campfire_night` | Pass | Close stone fire ring, glowing wood and distant mountain layers. |
| `amb:deep_night` | Pass | Stone overlook, lantern, receding mountain silhouettes and stars. |
| `nature:campfire` | Pass | Lakeside tent, fire, near table/cup/lantern and camping chair. |
| `meditation` | Pass | Stone arch, courtyard trees, reflected pool and close golden bowl. |
| `nature:womb` | Pass | Enveloping warm fabric-like room surfaces, soft light and nearby cushions. |
| `amb:snowy_night` | Pass | Near lantern/porch, snow-covered village roofs and distant snowy hill. |

This run covers **normal portrait390×844 cold paused first frames only**. Desktop, forced-byte/unsupported-device paths, active movement, interaction/control/audio gates and clean disposal/remount are not established by this gallery. Quiet/Korean compatibility followups, Water active23.8s failure and Cozy longsequence100.2s stall remain separate. This audit does not relabel coordinator pixel acceptance as personal user approval and does not grant final merge readiness.

Files: `gallery.html` (all actual images), `results.json` (complete source and served-byte evidence), `visual-review.json` (per-image hashes and observations), plus each world's `result.json` and `cold-first-frame.png`.
