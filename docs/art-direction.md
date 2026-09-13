# Bumpkin Town Creative Bible
## Installment 1: Art Direction & Image Assets (sections 1–8)

Stable IDs used here: landmarks `LM_*`, crops `CROP_*`, machines `M_*`, characters `CH_*`. Later installments reuse them.

---

## 1. The visual idea: Stitched Almanac

**In one sentence:** Bumpkin Town looks like a county almanac's illustrations sewn into a quilt. Every tile is a fabric patch, every boundary is a seam, and every impossible thing in phase 3 is hemmed on with the same thread as the barn.

**Why it passes the screenshot test:** no other farming game draws its ground as patchwork with a visible running stitch. And the seams do a story job: when a strip of night sky appears in the middle of a lawn, the stitching tells the player how to read it. Someone sewed that on. The technology feels domestic because it is fabricated the way a quilt is: by hand, from what was around.

Analogy: a quilt is a record of what a household had lying around. The game's look says the same thing about the town.

### Drawing rules

- **Line.** Umber (#3B2A1E), never black. 2px at 1x for silhouettes, 1px for interior detail. Lines thicken to 3px where an object meets the ground (a "hem"), so everything sits.
- **Shapes.** Rounded rectangles and beans. No acute angles unless it is a tool blade or a roof peak, and roof peaks are 90° or wider. Buildings are two-value silhouettes: roof shape plus wall shape, readable as a pair.
- **Seams.** Land-type boundaries are a running stitch (3px dash, 2px gap) in a lighter thread color than the patch. Seams appear only where land types change, never inside a field. Impossible patches (phase 3) always use cream thread so the eye finds them.
- **Textures.** Three tones per material: base, shade, one accent. A 6% paper-grain overlay on everything. No gradients except water and sky patches. Fabric weave is a 2px diagonal hatch in the shade tone only.
- **Materials tell time.** Phase 1: timber, tin, burlap, jute, marigold. Phase 2 adds copper, verdigris, glazed ceramic, brass. Phase 3 adds impossible cloths (sky-cloth, still-water glass, yesterday-light), drawn with identical seams and outlines.
- **Camera.** Fixed three-quarter top-down. Roofs show at roughly 2:1 to front walls. No perspective drift toward screen edges; the map never shows a horizon. Sun is top-left; every object casts one flat umber shadow at 40% opacity to the bottom-right.
- **Scale.** 32px tile. Characters are 2.5 tiles tall with heads at 40% of body height so faces read under a thumb.
- **Motion.** Idle animations are 2 or 3 frames on a 12fps "stitch tick." Nothing eases; machines hold on frames like a flip book. Impossible things move smoothly at 24fps. That is the only smooth motion in the game, so the eye finds the impossible without a highlight.

---

## 2. Landmark phase table

Each building keeps one identifier across all three phases. The joke column is readable without text.

### LM_FARMHOUSE
**Identifier (never changes):** chimney capped with a tin pie plate; porch swing.

| | Phase 1: Roots & Routines | Phase 2: Applied Nonsense | Phase 3: The Familiar Impossible |
|---|---|---|---|
| Silhouette | Low L-shape, sagging porch roof, one shutter missing | Chimney grows a copper ear trumpet; ceramic weathervane arm on the peak; basement hatch becomes a glazed dome with vents | Same L-shape; porch is dry-under-rain or rainy-under-sun depending on yesterday; one sky-cloth patch stitched into the roof where a hole was |
| Materials | Grey-weathered clapboard, tin roof patched with a different tin, burlap curtain | Fresh clapboard (your own ceramic paint), copper gutters feeding a pipe to the basement | Same clapboard, plus one impossible patch |
| Moving parts | Porch swing (3 frames), loose shutter tapping, chimney smoke | Weathervane tracks the nearest approaching character; hatch puffs; gutter pipe glugs | Rain under the porch roof only; swing swings by itself at the hour you sat in it yesterday |
| Wordless joke | The missing shutter leans against the porch under a clean, unweathered rectangle of wall | The weathervane points at the mail carrier from across the map; the carrier keeps looking behind them | Clothesline is drying tomorrow's laundry: empty pegs casting shirt-shaped shadows. The shutter is finally back on, and now there is a clean rectangle where it used to lean |

### LM_STORE (general store)
**Identifier:** brass hanging scale on the porch; striped awning with one wrong-colored stripe.

| | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|
| Silhouette | False-front timber, red-and-cream awning (one blue stripe, a replacement), barrels, chalkboard | Awning replaced by a folding brass pergola (the blue stripe is now one blue slat); ceramic pneumatic tube runs along the eaves to the post office | Storefront unchanged; interior shelves visible through the window are arranged by when you will need the item, nearest shelf holds tomorrow's |
| Materials | Timber, canvas, iron hoops | Brass, verdigris, glazed ceramic | Unchanged, plus window glass that shows the interior at dusk light regardless of hour |
| Moving parts | Awning flaps, scale swings, a cat on a barrel switches sides | Pergola unfolds as you approach; capsule pulses through the tube | Cardboard "back in 5 minutes" clock (a drawing of a clock, no text) whose hands move on their own, always five minutes ahead of the game clock |
| Wordless joke | A barrel with a single sprout so tall it touches the awning | The scale is weighing a capsule stuck in the tube above it; the needle reads almost nothing | The scale is weighing a bale of Loftweed: the pan is up, the counterweight is down, the needle is pinned to zero |

### LM_DINER (Bea)
**Identifier:** round porthole door; chrome pie case in the window.

| | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|
| Silhouette | Converted railway car on blocks, tarnished chrome trim, red stools visible, one window tube that half works | Copper pie conveyor arrives from the farm side through a brass flap; split-flap menu board on the roof; steam whistle | Same railcar; the windows are stitched impossible patches through which it is always six o'clock golden hour |
| Materials | Chrome, enamel, cracked vinyl | Copper, brass, ceramic insulators | Same, plus yesterday-light glass |
| Moving parts | Pie case rotates; urn steams; the OPEN sign flips every time Bea walks past it | Split-flap letters clack; conveyor moves; whistle steams | Inside, the pie case rotates at a fraction of speed; whistle steam freezes at the window line and continues outside |
| Wordless joke | Three cats queued at the back door in a perfect line, one holding a place with a paw | The split-flap board is caught mid-flip so every word is half of two words | A cat asleep on the sidewalk in a sunbeam the window is casting at midnight |

### LM_POST (Mabel)
**Identifier:** barber-striped flagpole; mail slot with a brass lip.

| | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|
| Silhouette | Small brick box with a porch; wall of PO boxes visible through the door | Three ceramic tubes converge on the roof into a verdigris sorting drum; brass semaphore arm on the flagpole | Slot gains a second, lower OUT lip beneath the IN lip; letters emerge on their own |
| Materials | Brick, brass, canvas mailbag | Glazed ceramic, brass, verdigris | Unchanged |
| Moving parts | Flag, a swallow on the pole, the slot lip clacks | Drum spins, semaphore signals, capsules arrive | Flag blows in tomorrow's wind (opposite to every other flag in town); paper doves flutter out of the slot hourly and refold into envelopes |
| Wordless joke | A queue of pigeons at the mail slot, one holding an envelope | An envelope stuck halfway up a transparent tube, the stamp's portrait facing the player | The pigeons are now queued at the OUT slot, collecting |

### LM_SQUARE (town square)
**Identifier:** an empty plinth with an unreadable plaque; the notice board.

| | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|
| Silhouette | Cobble-and-dirt oval, plinth, hand pump, paper notice board, pond edge with Orson's measuring stake | Pump replaced by a ceramic fountain fed by the farm pipe; notice board becomes a split-flap; benches get brass feet | Cobbles stitched from patches of four seasons (a snow patch that never melts beside fallen leaves); fountain water rises in floating beads, so the hand pump is reinstated beside it; the notice board is paper again because the split-flap kept showing next week |
| Materials | Cobble, cast iron, paper, jute rope | Ceramic, brass | Same, plus season-cloth and still-water glass |
| Moving parts | Pump handle, notices flutter, pond ripples | Fountain, split-flap | Floating beads, drifting snow patch, pond ripples that run backward near the stake |
| Wordless joke | A pigeon on the empty plinth in a heroic pose | The plinth holds the town's first cooperative invention, spinning, and the pigeon stands on top of that | The plinth is empty again, but its shadow is the statue everyone assumed was supposed to be there. The pigeon stands in the shadow's shadow |

---

## 3. What stays stubbornly ordinary

1. **The red mailbox flag.** The farm mailbox now receives letters from tomorrow, and the carrier still will not stop unless you raise the chipped wooden flag. Raising it is the interaction; the impossible part is what is inside.
2. **The glass ketchup bottle on diner table four.** In slow time, condiments will not pour, so Bea keeps a spoon in it. It sits beside a slice of pie hovering a finger's width above its plate. The bottle is the anchor that tells you the table is still a table.
3. **The porch broom.** Loftweed floss drifts up and collects on the porch ceiling. You sweep the ceiling with the same broom, bristles up.
4. **Wooden clothes pegs.** They hold tomorrow's laundry (see LM_FARMHOUSE). The pegs are plain, split, sun-bleached. Only the laundry is wrong.
5. **Orson's pond stake and knotted jute rope.** The pond now reflects the sky from the day it was last measured. The rope, with its knot at last spring's mark, is the only measurement in town that has not changed, and it is the one that matters.

Bonus constant: **mud**, and boots by every door. Every phase has mud.

**What still says Bumpkin Town after everything changes:** the seams and the umber line; the pie-plate chimney; marigold and creek-blue at the same saturation from start to finish; the sun still top-left; short people with big heads; handwritten notices; and a hard rule worth keeping: **gravity misbehaves for objects, water, and food, never for residents.** People always walk. That keeps the town feeling walked-in rather than floated-through.

---

## 4. Six crop families (botanical shape as machine input)

All stages are drawn for a 32px tile; the processed item is a 24px inventory icon.

### CROP_COGSQUASH (patty-pan squash → gears)
The scalloped disc is a gear before you do anything to it.
- Seedling: two round leaves, no fruit. A green pea shape.
- Growing: one flat scalloped disc, pale green, eight scallops, half hidden under leaves.
- Ready: cream-yellow disc filling half the tile, scallops crisp, a dark center dot that reads as an axle.
- Processed (M_MILL): dried into a tan gear with the center punched out, shown stacked in threes.
- Feeds: gear trains in phases 1 and 2; the store pergola; the sorting drum.

### CROP_SPRINGBEAN (pole bean → springs)
The tendrils grow as helices.
- Seedling: a single green hook.
- Growing: a pole with a tight green helix around it.
- Ready: three darker coil-shaped pods hanging from the pole.
- Processed (M_WINDER): tightened into a copper-brown spring with two end hooks.
- Feeds: clockwork, latches, the split-flap boards, the weathervane.

### CROP_BELLOWSGOURD (bottle gourd → vessels and bellows)
Hollow, with a waist.
- Seedling: two rounded leaves with a tiny bulb.
- Growing: sprawling vine with a pale green bottle shape.
- Ready: tan bottle-gourd with a darker band at the waist.
- Processed: dried and corked; drawn as a pale tan bottle with a cork and one iron hoop. The bellows variant has an accordion middle (three dark lines).
- Feeds: M_KILN bellows, pressure tanks, the fountain, the pneumatic tubes.

### CROP_WIREREED (creek reed, wet tiles only → cordage, wire, thread)
Straight hollow stalks. This crop is literally the thread of the art style.
- Seedling: three vertical dashes in water.
- Growing: stalks with brown cattail heads.
- Ready: stalks bend under the heads, heads split into fluff.
- Processed: stripped stalks on a wooden spool. Phase 1 spool is green-brown twine; phase 2 gets a copper wrap (insulated wire); phase 3 gets a sky-blue wrap (the thread that stitches impossible patches).
- Feeds: belts, wiring, hemming.

### CROP_LANTERNONION (layered bulb → lens rings)
Concentric layers are optics waiting to be peeled.
- Seedling: a green spike.
- Growing: bulb above soil showing two layers.
- Ready: papery amber bulb that glows faintly at dusk (a real light sprite; it is the only crop that is a light source).
- Processed (Onion Lathe, a phase-2 upgrade to M_MILL): nested transparent amber rings drawn as concentric circles; a stack reads as a lens.
- Feeds: lanterns, the diner's slow-time windows, the store's dusk glass, Mabel's show.

### CROP_LOFTWEED (milkweed → lift)
Pods split into floss that falls up.
- Seedling: a two-leaf sprig.
- Growing: tall stalk with green bean-shaped pods, each with a seam.
- Ready: pods split, white floss visibly tugging upward, the stalk bending up instead of down. The one crop that leans against gravity, readable at 32px from the bend alone.
- Processed (M_BALER): a white cube tied with Wireweed twine that hovers one pixel above its own shadow and bobs.
- Feeds: all phase-3 gravity work and the potluck.

---

## 5. Four basement machines

### M_KILN: Gourd Bellows Kiln (phase 1, the one a relative repaired)
- Ingredient: creek clay + Bellowsgourd bellows + Wireweed twine.
- Mechanism: a bricked barrel kiln with a foot-pumped gourd bellows.
- Output: ceramic parts (insulators, tube segments, the weathervane, glaze for paint).
- Animation: three-frame stomp on the bellows, glow flares, one loose brick rattles.
- Look: one leg is a table leg, twine holds the flue on, the lid is a frying pan, and a chalk word on the side has been smudged out except for the first letter.

### M_MILL: Squash Mill (phase 1)
- Ingredient: Cogsquash.
- Mechanism: a screw press over a drying rack.
- Output: gears.
- Animation: press descends, a squash flattens, the rack turns one notch.
- Look: solid and boring on purpose. It is the only machine in the game that never breaks, which becomes a character note for Jun later.

### M_WINDER: Springbean Winder (phase 2, accidentally elegant)
- Ingredient: Springbean pods.
- Mechanism: a single treadle, a spool, and a brass guide made from a curtain rod. A ceramic comb keeps the tension even, and every turn clicks a note on it.
- Output: springs.
- Animation: treadle, spool turn, one note-flash per coil.
- Why it is elegant: nobody designed the music. The comb was for tension. It plays a nine-note phrase that Cleo will recognize in phase 3 as her own serial's theme, because Jun heard it through her window while building it.

### M_BALER: Loft Baler (phase 3)
- Ingredient: Loftweed floss + Wireweed twine.
- Mechanism: an ordinary hay baler bolted upside down to the basement ceiling, because floss falls up. Output bales are caught in a net above it.
- Output: lift bales, rated in cats (one bale lifts one cat; the unit is a cat icon, and the reference cat is a specific cat from behind the diner).
- Animation: the only upside-down object in the basement; bales pop out and drift up to the net; the whole machine tugs at its bolts; dust drifts upward.

---

## 6. Color script

Constants across all phases: OUTLINE #3B2A1E · PAPER (thread, UI) #F3E8CF · MARIGOLD #E8A33D · CREEK #4C8FB0 · GRASS #7DA95C · GRASS SHADE #567B3F · TIMBER #8C5A3C · TIMBER SHADE #5E3A26 · MUD #6E5238 · SHADOW (flat, 40%) #3B2A1E

### Phase 1: Roots & Routines
- Daylight: sky/water highlight #CFE3E0; tin roof #A9B0B4; burlap #C9B58E; enamel red accent #B8433A.
- Dusk: sky #E9A57A; shadows shift to plum-umber #4A2F3E (never blue); lit windows #F5C48E.
- Interiors: lamp #F0C070; wall #D9C6A6; floor TIMBER; one red enamel accent per room.

### Phase 2: Applied Nonsense
- Daylight adds: COPPER #B5652E; VERDIGRIS #5F9B8C; BRASS #D9A441; CERAMIC #EAE1D2; glaze accent #2F6B6F (green-teal, not blue). Sky and greenery unchanged.
- Dusk: brass picks up the sky with a #F2B77A highlight; everything else as phase 1.
- Interiors: kiln glow #F08A3C on the basement only; all other rooms unchanged.

### Phase 3: The Familiar Impossible
- Daylight adds impossible cloths only: SKYCLOTH #23304F with stitched stars in PAPER; YESTERDAY-LIGHT #F5C48E wherever time is off; STILLWATER #2E6F73 for floating water. Seams around impossible patches are always PAPER thread.
- Dusk: identical to phase 1, deliberately. The town's evening never changes color; that is the tenderness.
- Interiors: the diner floods with slow-time gold #EDB463; every other interior unchanged.

Forbidden anywhere: violet neon (#8A2BE2 and relatives), cyan (#00FFFF), white-blue glow, black outlines, sterile grey-blue holograms.

---

## 7. Prioritized asset list

### Essentials
1. **Terrain atlas.** 12 patch types (grass, mowed grass, tilled, wet tilled, path, cobble, creek, pond, mud, marigold border, planted bed, season-cloth). Build seams as a separate 4-direction stitch overlay rather than a 47-tile blob set: 5 variant tiles per type plus 4 seam overlays, and any two patches meet correctly.
2. **Building atlas.** 5 landmarks × 3 phases = 15 sprites in 128×128 cells (3×3 tile footprint plus roof overhang), each with one moving part as a separate 2 or 3 frame overlay. Farm: basement hatch ×3, fence set, mailbox.
3. **Characters.** Player (two body options), six residents. Four directions, 4-frame walk, 2-frame idle, 1 carry pose, in 32×80 cells. Dialogue portraits at 128×128, two expressions each (neutral, "hm").
4. **Crops.** 6 families × 4 stages at 32×32; 6 processed icons at 24×24.
5. **Machines.** 4 basement + 9 town inventions (installment 3), 64×64 to 96×96, 3-frame loops.
6. **Props (about 30).** Barrels, crates, three cat poses, pegs, broom, boots, plinth, pigeon, benches, ketchup bottle, hovering pie, spool, stake and rope, notice papers, pie-plate chimney cap as a separate tile.
7. **Interface motifs.** Selection ring as a running stitch; buttons as cream fabric patches with umber stitch; inventory as a pegboard; the phase meter as a quilt filling in patch by patch.
8. **Short animations.** Porch swing, weathervane track, pie case rotate, flag, split-flap, bale bob, water beads, pigeon queue shuffle.

### Optional polish
Dusk sprite variants, cat behaviors, porch rain, drifting snow patch, extra resident idles, weather, the shadow-statue.

### Readability under phone controls
Reserve the bottom 22% of the screen. The camera keeps the player in the upper 60% and world layout never places a landmark entrance facing downward. The thumb zone only ever contains low-contrast path and grass. UI patches are PAPER with an umber line so they read on any terrain, and the seam motif means UI and world share one language without competing.

---

## 8. Production-ready image-generation prompts

### Prompt A: terrain and landmark concept
> Concept painting, fixed three-quarter top-down view, no horizon visible, of a small overgrown farm beside a two-street town. The ground is a quilt: fields, paths, creek and cobbles are fabric patches with visible running-stitch seams in lighter thread at every boundary. Storybook almanac illustration, umber ink outlines (not black) with slightly heavier line where objects meet the ground, flat spot colors with three tones per material, subtle paper grain. Palette: marigold #E8A33D crops, creek blue #4C8FB0 water, grass #7DA95C, timber #8C5A3C, cream #F3E8CF thread. Landmarks: a sagging clapboard farmhouse with a tin pie plate on the chimney and a porch swing; a converted railway-car diner with a round porthole door and a chrome pie case in the window; a small brick post office with a barber-striped flagpole; a false-front general store with a brass hanging scale and a striped awning with one blue stripe; a town square with an empty stone plinth and a paper notice board. A basement hatch beside the farmhouse. Sun top-left, single flat shadows. Cozy, funny, materially specific.
> Exclude: text, letters, signage words, UI, HUD, buttons, photorealism, 3D render look, neon, purple, cyan glow, isometric grid lines, perspective horizon, people.

### Prompt B: transparent building atlas
> Sprite atlas on a fully transparent background, exactly 3 rows by 5 columns of equal square cells with generous empty margin inside each cell, one building per cell, all at identical scale and identical fixed three-quarter top-down camera, sun top-left, one flat umber shadow each. Storybook almanac style: umber ink outline, flat spot colors, three tones per material, faint paper grain, quilt-stitch detail on roof seams. Columns are the same five buildings; rows are three eras. Column 1 farmhouse (clapboard, pie-plate chimney cap, porch swing): row 1 weathered with one missing shutter, row 2 fresh paint with copper gutters and a ceramic weathervane, row 3 same house with one patch of dark star-cloth stitched into the roof. Column 2 general store (brass hanging scale, striped awning with one blue stripe): row 1 timber and canvas, row 2 folding brass pergola instead of awning with a ceramic pipe along the eaves, row 3 same storefront with dusk-lit window. Column 3 railway-car diner (round porthole door, chrome pie case): row 1 tarnished chrome, row 2 copper conveyor entering the wall and a rooftop split-flap board, row 3 same car with golden-lit windows. Column 4 brick post office (barber-striped flagpole, brass mail slot): row 1 plain, row 2 three ceramic tubes into a verdigris rooftop drum, row 3 same with a second lower slot. Column 5 town square set piece (empty stone plinth, notice board, hand pump): row 1 cobble, row 2 ceramic fountain replacing the pump, row 3 cobbles patched with a square of snow and a square of autumn leaves.
> Exclude: text, labels, watermarks, backgrounds, ground tiles outside the building footprint, people, varying scale between cells, perspective, photorealism, neon, purple.

### Prompt C: six-character portrait sheet
> Character portrait sheet on a fully transparent background, exactly 2 rows by 3 columns of equal cells, bust framing from mid-chest up, every figure facing three-quarter left with a neutral-to-amused expression, identical head size across all six. Storybook almanac style: umber ink outlines with slightly variable weight, flat spot colors, three tones per material, faint paper grain, visible stitch detail on clothing seams, heads about 40% of visible height, warm and particular faces. Row 1: (CH_MABEL) a woman in her sixties, silver hair in a tight roll, postal-blue cardigan over a waistcoat with a single sequin visible at the collar, red-framed glasses on a chain, holding an envelope like a playing card. (CH_JUN) a mechanic in their thirties, close-cropped hair, coveralls with a small embroidered locomotive patch, jeweler's loupe pushed up on a headband, a smudge of oil on one cheek, holding a coffee mug printed with a scale ruler. (CH_BEA) a woman in her fifties, apron over a striped shirt, sleeves rolled, pencil behind one ear, reading glasses pushed up into grey-streaked hair, one hand holding a folded dish cloth. Row 2: (CH_ORSON) a tall man in his seventies, wide flat cap, corduroy jacket with leather elbow patches, a coil of knotted jute rope over one shoulder, kind tired eyes. (CH_PIP) a scavenger in their forties, many-pocketed canvas jacket, tiny brushes in a chest pocket, a magnifier hanging from a cord, mismatched earrings that have clearly been repaired, a bright scarf, a blank label pinned to the collar. (CH_CLEO) a woman in her forties, cardigan with a rubber stamp on a lanyard, headphones resting around her neck, hair in two puffs, a small star-shaped pin, mouth slightly open as if mid-sentence.
> Exclude: text, name labels, backgrounds, drop shadows, photorealism, anime style, extreme chibi proportions, purple or cyan lighting, uniform expressions, varying head sizes.

---

## Decisions the developer can act on now

1. Ground is patchwork with a seam overlay, not blob-autotiled. Budget 5 tiles per type plus 4 seam directions.
2. One moving part per landmark per phase, as a separate overlay layer.
3. Residents never float. Objects, water, and food do.
4. Only impossible things animate smoothly; everything else ticks at 12fps.
5. Dusk palette is frozen from phase 1 onward. Do not "upgrade" the evening.
6. Bottom 22% of the screen is thumb territory: grass and path only.

**Next:** Installment 2 covers People & Character Arcs (sections 9–13). Installment 3 covers Inventions, Economy, Social Life, Finale, Tropes, and the integration list (14–20).
