# Asset provenance

## Supplied world artwork

`assets/world-atlas.png`: the user-supplied transparent 4×4 sheet of buildings, natural objects, and futuristic variants. Original 1254×1254 RGBA image retained without alteration. Drawn through source rectangles in the canvas renderer.

## Generated people and crops

`assets/people-crops-atlas.png`: generated in one request through Codex’s built-in image generation tool. Original 1254×1254 RGBA image retained without alteration. Custom source row boundaries are 0, 324, 634, 934, 1254; columns use quarter-width cells.

Prompt:

> Use case: illustration-story. Asset type: transparent PNG sprite atlas for the mobile cozy farming game Bumpkin Town. Create one square sprite sheet, at least 1024×1024 pixels, with exactly sixteen isolated sprites in a precise invisible four-column by four-row grid of equal square cells. Center each subject with ample transparent margins. Genuinely transparent background including empty space. No ground plane, checkerboard, borders or grid lines. Highly detailed warm hand-painted storybook almanac sprites, tactile painted textures, clear umber outlines, earthy lush greens, cream, marigold and copper. Muted teal and blue/red clothing as specified. No neon or purple. Fixed three-quarter top-down game view and soft warm light. All seven humans full body including boots, with big readable expressive faces and head/face proportions about 40% of full character height. Consistent human size.
>
> Row 1: young farmer in straw hat and green overalls; Mabel, elderly postwoman in blue cardigan and red glasses; Jun, nonbinary mechanic with short dark hair, teal coveralls and loupe; Bea, middle-aged diner owner in red striped shirt and apron.
>
> Row 2: Orson, elderly man with flat cap, corduroy and rope coil; Pip, middle-aged scavenger with many-pocket jacket, warm scarf and magnifier; Cleo, Black woman with two hair puffs, gold cardigan and headphones; curled sleeping orange cat.
>
> Row 3: ripe scalloped yellow pattypan cogsquash on leafy plant; pole springbean with coiled pods; tan bottle-shaped bellowsgourd on low vine; reeds with cattails.
>
> Row 4: amber glowing lantern onion plant; loftweed with upward floating white fluff; small brick ceramic kiln with gourd bellows; tabletop brass spring winding machine.
>
> No text, labels, lettering, numbers, logos, watermarks, ground shadows crossing cells, scenery, platforms, frames or cell lines. Exactly one complete subject per cell. Produce the sprite atlas, not a mockup.

## Programmatic graphics

Terrain patches, stitch boundaries, crop progress, water particles, fences, camera, and interface geometry are rendered directly by the game. The favicon and tool icons are simple interface vectors. No external image hosts or runtime asset services are required.
