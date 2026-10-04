# Living woods: reference review and provenance

Reviewed on 2026-10-04. The assignment is `livingWoods.md` supplied by the user.
Both gallery pages and the relevant live demos listed below were opened in the
supported cloud browser. These are technique references; no demo source, image,
texture, audio, font, or other asset was copied into this implementation.

## Rights boundary

The assignment records `license=null` and no verified reuse grant for both
MiaAI-Lab repositories. GitHub metadata independently confirmed that the two
repositories are public; the metadata response did not expose a license field,
so it is not a new license verification. Public access is not a reuse grant.
All geometry, materials, shaders and scene behavior must be independently
implemented for Brainwave. Do not introduce original-demo source at integration.

The Sonnet gallery's source links point to revision
`d50dc15f93a552cd1cfef8bddb63c3f2e94b7f7d`. The assignment identifies Opus revision
`86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0`; the live Opus gallery links to `main`.
The viewed GitHub Pages demos are live pages and were not proven byte-identical
to either pinned source revision. These revisions identify reference provenance,
not the Brainwave implementation or screenshot bundle.

## Both collections inspected

- Sonnet gallery: https://alibowbow.github.io/jev/sonnet-html100.html
- Opus gallery: https://alibowbow.github.io/jev/opus-html100.html
- Sonnet source: https://github.com/MiaAI-Lab/Sonnet-5.5-100-HTML-Files
- Opus source: https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files

The gallery says it preserves original demo numbering; the numbers are **not**
shared subjects across collections. In particular, Sonnet 097 is vegetation,
while Opus 097 is a harmonograph. Sonnet 092 is a rainy window, while Opus 092 is
an audio mixer. All references below explicitly identify their collection.

## Concrete visual decisions

| Reference | Observed evidence | Adopt or reinterpret in spatial 3D | Explicitly reject |
| --- | --- | --- | --- |
| Sonnet 042, Dandelion at Golden Hour | Actual rendered close-up shows thin illuminated seed filaments, a muted green depth field and warm edge light. | Small backlit leaf edges, distinct fine near detail, sparse dew highlights and localized morning warmth. | A giant blurred bokeh field or full-frame flat image in place of geometry; its large title and release counter. |
| Sonnet 090, Sky Clock | Actual rendered 04:00 view shows separate sky, mountain, treeline and lake-reflection layers, with near reeds occluding water. | Treat sky illumination, distant air, solid vegetation and foreground occlusion separately. For the porch, use pale sky light plus a warmer low-angle accent; that dawn palette is an original design inference, not a verified dawn screenshot. | Clock UI, timelapse, flat triangular trees, poster-like distant village, accelerated lighting. |
| Sonnet 092, Nocturne Window Seat | Actual rendered droplets have varied sizes, small bright edge accents and darker bodies against blurred color layers. | Give near wet leaves sparse droplets and lower roughness with limited high-contrast highlights. Keep rain and ground moisture at different depths. | Whole-view glass/bokeh, city backdrop, a tiny cup at the bottom of an otherwise empty scene, lightning. |
| Sonnet 097, Four Seasons Tree | Actual screenshots show a growing branch hierarchy becoming an irregular canopy; the automatic season display advanced between observations. Branch widths taper; foliage is not an undifferentiated solid crown. | Irregular trunk/branch hierarchy and leaf-scale variation. Distribute original 3D foliage in coherent clumps with open gaps and restrained differential movement. | Paper-cut almanac style, single central specimen tree, huge empty sky, uniform lawn and infographic controls. |
| Sonnet 011, Paper Hours | The actual gallery card identifies layered SVG paper diorama and differential front/back parallax. The live demo was **not** opened in this review. | Only the depth-ordering idea: near roots, mid trunks, distant canopy must occlude one another and respond correctly to a bounded camera look. | Paper appearance, an isolated miniature/diorama or flat planes passing as a forest. |
| Opus 078, Fractal Tree | Actual rendered image shows uneven parent/child branching, a broad asymmetrical canopy and individually legible small leaves. | Couple branch motion to parent motion while allowing smaller leaf variation; retain substantial static structure. These are original implementation targets, not copied algorithms. | A flat specimen diagram, grass/sky color swap as a separate world, seasonal controls and tree-shake spectacle. |
| Opus 061, Firefly Meadow | Actual rendered view interleaves near grass silhouettes, a shallow mist band, small lights and distant vegetation. | Layer mist close to the ground among real vegetation; use scale and occlusion to separate depths. Any distant life must remain small and quiet. | Cursor attraction, synchronized mass flashing, meteors, starfield as forest detail or an overly dark foreground. |
| Opus 041, Midnight Window | Actual rendered city view shows sharply bounded small droplets over a softer exterior, with differing droplet sizes and directional bright/dark cues. | Translate the contrast between clear droplets and muted background to a few leaf-edge drops. Motion should release from actual leaf tips after a bounded touch. | The full glass pane, urban setting, whole-frame blur, lightning/thunder and an additional audio engine. |

## Exact demo URLs

- S011: https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/011-papercut-dioramas.html
- S042: https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/042-dandelion-wish.html
- S090: https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/090-sky-clock-day-cycle.html
- S092: https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/092-rainy-window-bokeh.html
- S097: https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/097-l-system-seasons.html
- O041: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/041-rain-on-glass.html
- O061: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/061-firefly-meadow.html
- O078: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/078-fractal-tree-seasons.html

## Scene-specific composition targets

- **Morning porch:** the near cup, its rim thickness, tea surface and timber grain
  remain legible at narrow portrait width. A low garden wall and uneven plant
  beds form the middle distance. Pale sky is bounded by the roof/foliage rather
  than consuming most of the view. One small bird belongs in the garden depth.
- **Rainy forest:** broad overlapping overhead leaves communicate shelter;
  serrated fern fronds and scattered wet stones provide a tactile foreground.
  Separate wet specular surfaces from rough bark and dark soil. Mist occupies
  ground pockets, not an opaque screen. Falling drops should not resemble snow.
- **Ancient forest:** an off-center old trunk and buttress roots establish scale
  at seated eye height. Irregular roots lead into shaded depth and little sky.
  Moss is a soft, varied surface layer rather than bright green plastic. Keep
  enough light to read bark and root form without vignette or blur concealing it.
- **Bamboo grove:** vertical culms have visible individual nodes, varied diameter,
  slight bend and irregular spacing. Long narrow leaves form branching sprays.
  A diagonally receding small stream creates depth between banks; it must belong
  to the terrain. Do not recycle the broadleaf forest silhouette or giant trunks.

## Evidence limitations

The live screenshots were visually inspected in the browser tool during review;
they are reference observations, not saved QA screenshots of our implementation.
Sonnet 097's automatic growth/seasonal visual change was observed. Opus 078's
season slider changed its accessible state to Early March, but the immediate
screenshot lagged, so this review does not claim a verified spring visual.
Sonnet 090's time control changed its accessible state, but no dawn image was
verified. Later Opus 041 UI interaction encountered browser protocol timeouts:
the forest toggle/drag-wipe is **not** newly verified here. The assignment's
earlier O041 drag observation is prior evidence only. Reference audio was left
off; no sound-quality claim is made.

Implementation QA must independently report actual PNGs, code/bundle identifiers,
motion, touch-versus-drag/cancel, pause, reduced motion, hidden state, repeated
mount/unmount and holder reuse. Reference inspection is not a substitute for it.
