# Source and asset provenance

All new scene geometry, shaders, texture-generation code, materials and interaction/lifecycle code in this group were independently authored for this task. Textures are deterministic procedural CanvasTextures generated in the browser. No new external images, models, recordings, fonts, paid services or subscriptions are required. Three.js and React are existing project dependencies under their existing licenses.

## Approved rural image

Inspected the actual pixels of the existing repository asset `public/images/nature/backgrounds/rural-ghibli-v9.webp` at base commit `14940149cc5c0fccb778b58d4d755a04aea55e53`. File SHA-256: `aa5bf392be8e9d7a1ae7df45aa1c157b914d2fe4ec0ce7c62d7eee136fcb2295`.

The image is used as the user's approved composition/palette reference only. Its bytes are not copied into a new asset or displayed as a background plane. The original 3D scene preserves the low rice-path view, pale curved road, warm farmhouse, right utility pole/wires, blue moonlit sky, cloud masses and layered forest. The requested animation-film countryside warmth and game-like toon shading are general art direction; no copyrighted characters, logos or game assets are used. This exception does not extend to the temple or owl porch.

## JEV references

Both actual galleries and six selected live examples were inspected. See `REFERENCE_REVIEW.md` for concrete observed techniques adopted and rejected. Neither original source repository has a verified reuse grant in the assignment (`license=null`). No source code or asset was copied from either gallery. Motion algorithms written here are independent implementations, not ports.

## Existing sound

No audio files are changed or added. Existing audio ownership and license records remain in the root `THIRD_PARTY_AUDIO.md`. Jun's rural recording stays sample-only and unchanged. Audio wiring recommendations are in `INTEGRATION.md`.

## QA images

PNG files under `qa/evidence/` are screenshots of this group's actual rendered Three.js scenes. Their source-tree and built-bundle hashes, viewport sizes, renderer and lifecycle checks are recorded in the accompanying evidence JSON. They are review artifacts, not scene textures or production posters.
