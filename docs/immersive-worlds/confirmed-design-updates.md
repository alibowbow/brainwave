# Confirmed design updates — 2026-10-04

These design requirements supersede the initial brief where they differ. Scene implementation remains isolated by the documented ownership boundaries.

## Rural summer night: one explicit style exception

Canonical ID: **`nature:rural_summer_night` only**.

Preserve the original rural-summer-night image's composition, palette and place identity, then combine a warm Ghibli-inspired countryside atmosphere with original, actual 3D Zelda-inspired toon shading. This is a reference to broad atmosphere/rendering techniques, not permission to reproduce characters or game assets. Avoid heavy outlines.

Keep the recognizable moonlit rice field, warm house, field path and gently wind-driven rice. Retain the familiar low seated viewpoint, depth layers, utility pole/wires and calm night sky where they contribute to the original composition. Life remains distant and quiet. The actual rural-insect recording retains its identity and existing recording-only policy.

This style exception applies only to `nature:rural_summer_night`; the other29 upgrades and two protected renderers retain their existing directions. It remains an immersive3D space, not a flat full-scene image.

Assignment: **not implemented by this coordinator**. Distribute to a separate owner after the pilot quality gate.

QA additions for this ID:

- Compare the original `images/nature/backgrounds/rural-ghibli-v9.webp` side by side with the actual 3D render at matching viewpoint/crop; record preserved composition, palette and place cues.
- Verify moonlit field, warm home and rice motion; inspect actual spatial depth under restrained look interaction, lighting on geometry and toon shading rather than a flat poster effect.
- Inspect edges at desktop, Fold-like cover/inner viewports and resize; reject heavy outlines, flickering toon bands or distracting exaggerated contrast.
- Verify independently authored characters/assets if any, and source/provenance for supplemental images. Do not reproduce Ghibli characters or Zelda assets.
- Verify all other worlds still follow their own approved material/style directions. This exception changes no other canonical ID.

## Broader updates retained in the integration contract

- Supplemental generated imagery must improve quality and include provenance, local-file and build checks.
- Both Sonnet 5.5 HTML 100 and Opus 5.5 HTML 100 inform the final source/render comparison and apply/defer reasoning; the supplied balanced evidence below is now part of the design record, and license limits remain.

## Balanced Opus/Sonnet reference addendum accepted

The [benchmark addendum](./opus-balanced-benchmark-addendum.md) maps all30 upgrade IDs exactly once, with a unit check against the catalog. It supplements the scene designs and ownership. Use the strongest particular effect from either collection; preserve working art and independent implementations.

Provenance is explicit: the **planner** inventoried all 100 Opus entries, inspected actual rendered pixels for eight originals and audited source for nine. This integration Work is recording those supplied findings, not claiming to have rendered the original demos. The eight rendered references are Opus 041, 066 (Earthlike/Gas Giant), 078 (autumn/summer), 061, 051 (lamp/window interaction), 035, 082 and 100 (default field/isolated touch ripple). The additional source-only item is Opus 092; its sound was not auditioned. Catalog descriptions do not substitute for actual rendered observations, and 100 inventoried entries do not mean 100 visual inspections.

Use the JEV catalog at `3a9da2170a2adc41a39ae86c5221cfd7338b8429` and original Opus source at `86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0` as recorded in the addendum. Planet ring-shadow fidelity is source-confirmed, not separately established in screenshots.

| Scope | Locked reference interpretation |
| --- | --- |
| Café | O041 condensation/wiping/refraction, O035 ceramic/glaze/steam, O051 interior/exterior state relationships and S036 room composition. Keep the approved rainy evening seat and distant quiet patrons |
| Morning forest | O078 correlated trunk/branch/leaf wind and canopy mass, O061 depth occlusion/living grass, S042 light/dew. Actual 3D bark, foliage, contact shadows and depth remain the target; no flat tree or paper-cut replacement |
| Cosmic garden | O066 planetary surface/light, O082 translucent material cues, O100 water response, S024 slow orbital composition. Keep the planted floating garden; no spaceship/cockpit or planet-editor UI |
| Other 27 upgrades | Follow each exact ID row in the balanced addendum while retaining its independently approved first-person space. Shared effect studies do not authorize shared recolored layouts |
| Rural-only exception | Only `nature:rural_summer_night` preserves the original composition/palette with the approved warm countryside/3D toon treatment. O061/O078/S018 inform movement and depth only, not replacement art direction |

Opus 100's Ripple Tank uses **damped finite-difference water simulation** and a localized touch ripple. Sonnet 100 uses **path morphing**; the similar titles do not describe the same mechanism. A water reference must be chosen for its actual behavior.

Do not enlarge native low-resolution reference canvases into a scene: Opus 066 uses a 512×256 source map and a capped 205px planet radius; Opus 100 uses roughly 62k simulation cells and an upscaled top-down display. Independently implement the relevant material/lighting principles, or feed simulation data into appropriately detailed spatial water shading. A composited SVG material study is not physical 3D transmission, and no reference automatically qualifies as a ready immersive environment.

The supplied Opus rights audit found `license: null`, no LICENSE/COPYING/NOTICE in the complete tree, and no reuse grant in README or nine inspected HTML files. Public code is not copying permission. No code/assets may be directly copied or ported without verified rights. Source-only audio architecture observations do not demonstrate convincing ambience: retain Brainwave's single engine/gate, use licensed recordings or original synthesis and audition the resulting output.

No automatic lightning/thunder, abrupt fire/crockery transients, mass synchronized flashing, fast camera movement or approaching/attention-grabbing life is admitted. Pilot owners should document the specific material/behavior improvement and visually verify their actual Brainwave output. Forest PR #49 (`531ecb2`) is admitted for draft integration testing only; its quality gate remains pending. This design update implements none of the remaining 27 worlds.
