# Morning forest: source and visual reference review

Reviewed 2026-10-04. This is a record of principles inspected in actual source files and live browser renders, not a record of copied implementation. Forest geometry, textures, shaders and scene code are independently authored. No reference HTML, images, textures or audio are included in the scene.

## Provenance and usage boundary

- The Sonnet JEV curation page is <https://alibowbow.github.io/jev/sonnet-html100.html>. Its live UI credits MiaAI-Lab, links the two referenced original pages, and states that execution/performance of all 100 examples was not reproduced by the curator.
- The Opus gallery was discovered from `alibowbow/jev/opus-html100.html` and its actual `assets/opus-html-data.js`, not inferred from Sonnet file names. The data names `MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files` and records curation source commit `86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0`.
- GitHub metadata returned `license: null` for both original repositories. The inspected Sonnet root listing had 202 entries and no LICENSE, COPYING, NOTICE or README. The inspected Opus root had 203 entries, including README.md but no LICENSE, COPYING or NOTICE. Its README (blob `0aa3007c2aa5c5fd0d94d78ae6caea437f952eca`) describes the collection and author-reported checks but contains no reuse license grant.
- Public source availability is not treated as permission to reuse code/assets. We inspect technical and visual principles only. No reference source fragments were incorporated into the application. The examples' independent audio engines, controls, text, composition and artwork are not reused.
- The observations below are from live cloud-browser screenshots and GitHub source reads. They do not certify the examples' overall performance or accessibility. All inspected examples here render primarily with 2D Canvas; they are principle references, not proof of the requested first-person 3D quality.

## Actual files inspected

| Repository | Path | Observed Git blob SHA | Live example |
| --- | --- | --- | --- |
| `MiaAI-Lab/Sonnet-5.5-100-HTML-Files` | `097-l-system-seasons.html` | `1796a5299fda6105f01158c6f43414f194a5422c` | <https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/097-l-system-seasons.html> |
| `MiaAI-Lab/Sonnet-5.5-100-HTML-Files` | `042-dandelion-wish.html` | `c49b1ea9dfdaea2ca4353294ad577790ed3fc4bb` | <https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/042-dandelion-wish.html> |
| `MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files` | `078-fractal-tree-seasons.html` | `b1350b8be30d9496703f3ff24a45e621f081a05f` | <https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/078-fractal-tree-seasons.html> |
| `MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files` | `061-firefly-meadow.html` | `09356a15dcf83669a27179d2805f8047b25d8be5` | <https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/061-firefly-meadow.html> |
| `MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files` | `091-alpenglow-day-cycle.html` | `84aee6d2ba4154cba1c9ef4a8326879dfe83a7af` | <https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/091-alpenglow-day-cycle.html> |
| `MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files` | `059-zen-sand-garden.html` | `05d2a0bb1b38700114dda16f281058041af556d7` | <https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/059-zen-sand-garden.html> |

For any listed file, the source path is `https://github.com/{repository}/blob/main/{path}`. The SHA records the actual inspected blob; the mutable main path may later change.

## Observations and decisions

### Sonnet 097 — Four Seasons Tree

The live scene is explicitly a paper-cut almanac: one whole tree, simplified rolling hills, visible spring blossom and a season control. That style is not adopted. Source inspection of tree generation and updates showed irregular child branching, taper, parent-relative poses, denser terminal foliage and separate woody/leaf motion. Small limbs receive more movement than the trunk, while leaf flutter has its own phase.

**Selected principle:** irregular tapered branch topology, varied leaf placement, fine motion that does not move the whole woodland together. No growth demonstration, season switching, paper texture or falling-leaf spectacle.

### Sonnet 042 — Make a Wish

The live image separates very fine pale foreground filaments from a softly blurred green meadow, with a warm upper-left/back light, a restrained halo and defocused near blades. Source inspection showed depth/rim-dependent detail intensity, layered sharp/blurred elements, individual motion phases and damped interaction. Its low-resolution backdrop compositing is a particular 2D optimization, not a blanket resolution policy to carry into the forest.

**Selected principle:** preserve clear foreground leaf veins/dew, coherent warm edge lighting and cooler green depth separation. Use real scene geometry, material response and air perspective. No dandelions, seed storm, floating wishes, sparkle bursts or separate AudioContext.

### Opus 078 — Four Seasons, A Fractal Tree

The live render had a broad irregular crown, visible branch hierarchy, finer tips, varied leaf color and gaps inside the crown. Source inspection of `genTree`, `layoutTree` and drawing stages confirmed parent-linked branches, varying length/thickness/flexibility, depth-dependent sway, terminal leaf attachment and shaded/dappled ground treatment. The original is a flat whole-tree presentation, not a seated woodland.

**User-confirmed selected principles:** branch hierarchy, depth-dependent elastic response, leaf variation and dappled light. These should support dense true woodland depth without repeating identical umbrella-shaped crowns. No season cycle, regrowth or tree shaking.

**Implementation honesty:** `botany.ts` builds branched geometry but merges the woody parts; it does not animate an articulated branch hierarchy. `ForestEngine.ts` applies the same slow, height-weighted woody bend to wood and canopy, then adds smaller phase-varied leaf motion. Foreground wet leaves and droplets move together at their plant group. This is an inherited-bend approximation, not a full hierarchical elastic tree simulation.

### Opus 061 — Dusk Meadow, Fireflies

The live composition gains depth from close blades that occlude the midground, several treeline/hill distances and low mist. Source inspection showed a spatial wind field feeding damped blade motion with varied flexibility, in addition to separate near/far blade groups. The organisms are attention-attracting interactions and do not fit this project.

**User-confirmed selected principles:** near-plant occlusion, restrained mist separation and spring-damped grass/leaf motion. In the forest these belong to a bright morning palette, subtle foreground plants and the existing gentle touch response. No night scene, firefly flashes, organism attraction/scattering, lantern chase or independent audio engine.

### Opus 091 — Alpenglow

The actual render has clearly separated mountain layers and trees whose contrast fades with distance. Recognizable near-shore reflected forms remain legible while horizontal distortion grows toward the viewer. Source inspection confirmed distance-based haze/color separation and a 2D strip reflection whose displacement depends on distance down the water image.

**Selected principle:** retain coherent reflected trunks/canopy near the far pool edge; use perspective-dependent, low-amplitude ripple distortion toward the near edge. Air perspective should reduce distant contrast rather than merely darkening everything. The forest keeps true 3D reflection and geometry. No mountain scene, time-of-day cycle or regenerated landscape.

### Opus 059 — Karesansui

The live garden's stones read as solid because broad mottling, finer grain, consistent one-sided highlights and contact darkness reinforce each other. Moss has an irregular fuzzy edge and small light tips, not just a green fill. Source inspection of `spriteStone`, `spriteIsland` and `relight` confirmed layered spatial variation, height-derived normals, coherent light direction and edge/contact shading. These are 2D height/sprite techniques, not reusable 3D assets.

**Selected principle:** make the forest's wet stones and moss materially distinct with varied surface scale, grounded edges and controlled highlights. Avoid uniformly green rocks or flat moss-colored surfaces. No top-down garden frame or rake interface. The resulting stone/moss changes were inspected in the final forest screenshots; see `qa/verification.md`. This reference alone does not establish the scene quality.

## Independent minimal hierarchical-motion design

The following is an original conceptual design, not a transcription of reference equations or parameter values. It is an optional implementation direction and is not claimed to be present in full.

1. Generate a branch attachment graph. Each branch stores a parent index, parent attachment distance, rest orientation, length, radius, depth, local pivot and stiffness. Leaves belong to terminal branches rather than arbitrary global coordinates.
2. Evaluate one low-frequency spatial wind field `W(x,t)`. Let a branch's target bending be `thetaTarget = compliance(depth, radius) * W(restPosition,t)`. Compliance grows gently toward the finer outer branches and is capped; the trunk remains nearly still. Give neighboring branches related, not identical, phase values.
3. Evolve bending with a damped spring: `theta'' + 2*zeta*omega*theta' + omega^2*theta = omega^2*thetaTarget`, with `zeta >= 1` for a calm, non-bouncy response. Clamp frame delta and angular bounds. This generic mechanics equation is independently selected for meditation-friendly motion.
4. Compose `worldBranch = worldParent * restAttachment * localBend`. Transform attached leaf positions through that branch pose, then add much smaller local flutter. A droplet attached to a leaf must share its transform/deformation; otherwise it visibly separates from the leaf.
5. For an economical partial implementation, group upper foliage into a few independently damped clusters, keep lower woody geometry static and state that limitation. Do not imply that cluster motion animates the actual branch graph. Preserve material quality and resolution before adding more motion complexity.
6. Inactive/hidden/reduced-motion handling belongs to the existing host. Freeze the composed resting frame when motion is disabled; do not let a separate shader or spring clock continue in the background.

## First-preview risks identified from the forest code

Implemented for this pilot after comparison: wood and canopy share a low-frequency,
height-weighted bend and per-tree phase; small leaf flutter is superimposed. This is
an economical inherited-bend approximation, **not an articulated parent-child joint
simulation**. Foreground wet leaves and their dew move together as a group, with a
damped touch response. Thin-leaf backlighting supplements the physical material.
Near plants were added inside the portrait frustum and ground color multiplication
was brightened. Pool distortion is weaker at the far bank, and solid foreground
surfaces block touch picking. Seasons, night lighting, attracted organisms, seed
storms, growth demonstrations and independently scheduled audio were rejected.

These observations guided the implementation iterations. The resulting forest captures and their verification limits are recorded in `qa/verification.md`.

After reviewing the first actual 3D desktop and narrow captures, side gaps were
filled with differently aged trees, middle-distance saplings and rooted ground
blades. Far trees and ferns were batched without flattening their geometry.
Grass uses low-frequency spatially varied sinusoidal bending with fixed roots;
it is not a spring solver. The damped touch response belongs to nearby leaf
groups, and the camera return uses the existing shared spring. Batched distant
wood shares a coarser phase than separate near trees. These deliberate limits
keep the movement restrained without claiming a full Opus-style elastic system.
Large stone normals are continuous across triangle corners, wet grey stone and
upper moss are distinct, and small three-dimensional moss tufts break the edge.
The forest remains an independent bright morning 3D scene throughout.

- Very narrow portrait framing can crop out all near macro leaves, losing the requested veins/dew even if the pool remains visible. Check actual narrow portrait and landscape, not only desktop.
- Dark albedo multiplied by dark ground vertex colors can suppress foreground material readability; inspect actual exposure and contact contrast.
- Large canopy leaf dimensions can read as sparse giant foliage rather than fine woodland canopy. Check scale at the nearest tree and distant silhouettes.
- Vertex wind on foliage must not move leaves away from separately rendered dew.
- Touch picking needs the nearest visible occluder, so a foreground stone/log cannot trigger the pool behind it.

## Review evidence outside the repository

The following temporary screenshots were captured from the live reference pages and checked to exist. They are inspection evidence only, not application assets and not bundled with this PR:

```text
/workspace/scratch/22e2684b0b5b/reference-temp/ref-097-tree.jpg
/workspace/scratch/22e2684b0b5b/reference-temp/ref-042-wish.jpg
/workspace/scratch/22e2684b0b5b/reference-temp/opus-078-tree.jpg
/workspace/scratch/22e2684b0b5b/reference-temp/opus-061-meadow.jpg
/workspace/scratch/22e2684b0b5b/reference-temp/opus-091-lake.jpg
/workspace/scratch/22e2684b0b5b/reference-temp/opus-059-stone.jpg
```

The final quality gate must use screenshots and interaction checks of the independently implemented forest itself. Reference quality, successful source retrieval, or a fallback image is not evidence that the high-quality 3D forest passed.
