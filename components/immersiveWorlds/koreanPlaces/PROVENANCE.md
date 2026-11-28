# Source and asset provenance

All new scene geometry, shaders, texture-generation code, materials and interaction/lifecycle code in this group were independently authored for this task. Textures are deterministic procedural CanvasTextures generated in the browser. No new external images, models, recordings, fonts, paid services or subscriptions are required. Three.js and React are existing project dependencies under their existing licenses.

## HDR upgrade (shared render pipeline)

The upgraded worlds add only code: the shared HDR pipeline, rock surface and noise modules in `components/immersiveWorlds/shared/render/`, plus this group's own procedural kit (`scenes/kit.ts`), dancheong painter (`scenes/dancheong.ts`), hip-and-gable roof builder (`scenes/koreanRoof.ts`), temple and owl/forest parts, and the rural night parts (`scenes/ruralParts.ts`: cloud deck, paddy water, concrete road, earth, plaster, cement tile, timber, rice, ridge weeds and wildflowers, leaf-card crowns, ground mist). Dancheong-style motifs, bracket profiles, roof forms, plumage, bark, wood grain, tiles, skies and clouds are original procedural interpretations of general Korean architectural and natural vocabulary; no pattern sheet, photograph, model or texture file was copied or loaded. The before/after JPGs in `qa/evidence/hdr-upgrade/` are screenshots of the rendered scenes (and, for rural, the existing approved reference image placed beside the render for comparison only).

## Approved rural image

Inspected the actual pixels of the existing repository asset `public/images/nature/backgrounds/rural-ghibli-v9.webp` at base commit `14940149cc5c0fccb778b58d4d755a04aea55e53`. File SHA-256: `aa5bf392be8e9d7a1ae7df45aa1c157b914d2fe4ec0ce7c62d7eee136fcb2295`.

The image is used as the user's approved composition/palette reference only. Its bytes are not copied into a new asset or displayed as a background plane. The 3D scene keeps the low rice-path view, curved farm road, warm farmhouse, right utility pole/wires, moon at upper left, clouds and layered forest. It was later rebuilt with physically based materials (no toon shading) toward a believable Korean summer night; no copyrighted characters, logos or game assets are used. This exception does not extend to the temple or owl porch.

## JEV references

Both actual galleries and six selected live examples were inspected. See `REFERENCE_REVIEW.md` for concrete observed techniques adopted and rejected. Neither original source repository has a verified reuse grant in the assignment (`license=null`). No source code or asset was copied from either gallery. Motion algorithms written here are independent implementations, not ports.

## Existing sound

No audio files are changed or added. Existing audio ownership and license records remain in the root `THIRD_PARTY_AUDIO.md`. Jun's rural recording stays sample-only and unchanged. Audio wiring recommendations are in `INTEGRATION.md`.

## QA images

PNG files under `qa/evidence/` are screenshots of this group's actual rendered Three.js scenes. Their source-tree and built-bundle hashes, viewport sizes, renderer and lifecycle checks are recorded in the accompanying evidence JSON. They are review artifacts, not scene textures or production posters.
