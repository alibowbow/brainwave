# Korean Places: independent JEV visual reference review

Reviewed 2026-10-04 in the actual cloud browser. Both gallery pages were opened, their relevant card links read from visible DOM, and every six example below was rendered and visually inspected. Browser screenshots were observed in tool output; no screenshot image or source code from these third-party examples is included in the production deliverable. The gallery/brief records no verified reuse grant (`license=null`); use only general visual techniques, independently authored code and assets.

## Galleries and exact examples

- Sonnet gallery: https://alibowbow.github.io/jev/sonnet-html100.html
- Opus gallery: https://alibowbow.github.io/jev/opus-html100.html
- S011: https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/011-papercut-dioramas.html
- S018: https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/018-firefly-sync.html
- S090: https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/090-sky-clock-day-cycle.html
- S097: https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/097-l-system-seasons.html
- O061: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/061-firefly-meadow.html
- O078: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/078-fractal-tree-seasons.html

Sonnet gallery source links were pinned to `d50dc15f93a552cd1cfef8bddb63c3f2e94b7f7d`; Opus gallery source links pointed at main. The assignment supplied Opus reference revision `86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0`. This review inspected the live linked pages, not a claimed exact pinned runtime revision.

## What was actually seen and tested

| Example | Observed pixels / interaction | Adopt for independently authored 3D | Reject |
| --- | --- | --- | --- |
| S011 Paper Hours | Actual dawn frame: cream paper-box border, pale pink angular far mountains, violet middle hills, very dark foreground pines, localized yellow cabin windows. The distant mountain silhouettes overlap with lower contrast. A NIGHT radio click was attempted, but this tab subsequently timed out, so no verified night-state claim. | Temple: separate near timber/bronze, mid courtyard and far misty ridges by real spatial depth, occlusion and decreasing contrast; modest warm focal light. | Paper cardboard surfaces, framing box, toy/miniature camera, pointed generic triangle mountains. |
| S018 Synchrony | Actual blue-hour meadow: dark tree line, near black flower/grass silhouettes, many bright yellow-green fireflies spanning small far points and very large soft foreground discs. Meadow click followed by observed changed firefly distribution and coherence gauge from 0.09 to 0.33 with `clusters forming, waves rolling`. | Scops and rural: sparse glows at different real world depths, uneven intensity and individual phase variation; foreground foliage should hide some lights naturally. | 1,000-light density, enormous bokeh discs, synchronized flashing, flash-on-tap, scientific HUD and synthetic audio engine. |
| S090 Sky Clock | Actual initial 04:01 view: layered navy ridges, dark conifer bank, lit windows reflected vertically in lake, low ripples and reeds framing corners. Dragging time arc produced pink dawn sky/ridges and corresponding pink water reflections while distant windows remained small warm accents. | Temple: warm horizon atmosphere against cool shaded wood/bronze and cooler near shadows. Stream/rice water: keep reflected sky hue linked to scene light; subtle broken horizontal reflections, not uniform bright blue. | Oversized clock/UI, flat scenic-canvas transplantation, accelerated timelapse, copied village silhouettes. |
| S097 Four Seasons Tree | Initial growth frame developed into an asymmetrically branching tree with small pink/white blossoms, varied branch lengths and clear gaps through the crown; hills were flat cut-paper layers. Actual growth was confirmed by two successive screenshots, not source inference. | Temple and rural trees: uneven branch branching/leaf density, broken crowns with negative spaces, small local leaf variation. | Flat paper landscape, single showcase tree centered as a diagram, tree regrowth, season clock/text, uniform lollipop crowns. |
| O061 Dusk Meadow | Actual rose-to-indigo sky, dark irregular wooded ridge, low near-horizontal mist across the vegetation, foreground thin grasses at several apparent depths, and sparse mid-field glows. After a foreground drag, nearest grasses had changed bending direction and fireflies had moved; cursor acted as a small lantern. | Rural: bend rooted blade meshes with a coherent low-frequency field plus small individual variation; place mist behind some rice and in front of far rows; vary glow depth. Scops: use restrained forest-edge haze behind owl branch. The brief recommends spring damping, but this review does not infer the exact solver from pixels. | Cursor attraction/scattering, mass synchronization, large near-camera blooms, meteors, separate audio. |
| O078 Fractal Tree | Actual early-October frame showed an exposed irregular branching structure and scattered orange leaves on ground. Dragging season slider to late June produced a segmented green canopy with many differently tinted small leaves, visible branch gaps and small bright ground dapples under the tree. | Temple: hierarchical branch motion and subtle dapple localized to courtyard; rural: coordinated crown sway with local leaf orientation/colour variance. Parent-child solver details are recommended by the brief, not independently verified from source. | Flat infographic look, regular background dot trees, shake-to-shed interaction, calendar UI, abrupt seasonal changes. |

## Scene-specific implementation checks

### Temple dawn

Use camera-height bronze bell/timber edge as a tactile near anchor, a distinct Korean courtyard at middle distance, and irregular mist-separated mountain ridges beyond. Reference S011/S090 depth values and dawn colour relationships; S097/O078 inform asymmetry and foliage movement only. Keep dancheong/tile/bronze distinguishable by geometry and surface response. A distant bright void or generic repeated pines is not an acceptable adaptation.

### Scops owl night

Keep owl physically small on an off-centre branch with a readable silhouette and nonemissive eyes. Place narrow stream deeper than branch and porch lantern nearer than both. Use S018/O061 interleaving and glow variation at very low density; avoid effects brighter than owl/lantern focal cues. Ambient irregular call timing belongs to the existing audio engine; only small bounded pose response should follow an explicit call/event.

### Rural summer night

The original `rural-ghibli-v9.webp` remains the composition, palette and identity authority; neither JEV meadow may replace it. Rice-field path low viewpoint, warm house, utility pole and wires, moonlit rice and quiet cloud forms must survive. S097/O078 branch and blade variation, plus O061 grass rooting/bending and shallow-depth haze, should be expressed through original 3D toon geometry. S018 only supports rare uneven fireflies, if present in the approved image identity. Restrained outlines and warm countryside character belong only to this scene.

## Limits

This is a live visual reference review, not source-copy permission or code/algorithm verification. No copied source, prompts, artwork, characters, audio or textures were used. S011 night interaction could not be verified because one browser tab timed out; another fresh tab worked for the remaining scenes. No general performance/FPS or hardware assertions are made.
