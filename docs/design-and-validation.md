# Bumpkin Town implementation notes

## Shipped loop

Three playable locations; a farmer with obstacle-aware click-to-walk movement; six tools; clearing, tilling, planting, watering, harvesting; six crop species with habitat and chapter requirements; persistent device saves with validated JSON import/export; optional synthesized sound effects; day/rest/meal energy recovery; six residents with phase-dependent dialogue, gifts, recorded conversation choices, backstories, and friendship; daily orders; renewable scavenging; seven processing recipes with concurrent machine queues; eighteen research nodes; nine shared projects; two chapter transitions; one potluck ending and continuing farm play.

The world changes by chapter and by research: copper building variants, irrigation pipes, a mechanical harvester, a greenhouse, star-cloth roof patch, floating water, and the four-season square. Farming automation returns seeds and replants so the late game can support more workshop and town activity.

## Duration and economy

The intended play duration is 2–3 hours. This is a design target, not a measured human completion time. Crop growth spans 100–260 active seconds, processing runs take 10–24 seconds per batch, and each chapter asks for six inventions plus three projects. Compost, mechanisation, cooperation, and yesterday-light improve throughput. A day lasts eight active minutes; resting advances the calendar and restores energy without advancing crop or workshop progress. Browser-hidden time is paused; there is no offline accumulation or expiration.

Every required material has a renewable route. Clay, wood, stone, copper and glass can be scavenged free. Seeds can be bought with sold produce or daily-order rewards. Pip offers spare squash seeds when coins and squash seeds are depleted. Meals and rest provide recovery without a financial soft lock. Essential inventory is never lost on a timer.

## Verification

Run `npm test` for engine tests and `npm run check` for source syntax. Tests cover farming, habitats and spending, research prerequisites and duplicate prevention, every phase gate and the finale, processing duration, automated replanting, scavenging cooldowns, trade constraints, orders and meals, pathfinding, and save validation. Reachability testing supplies each required resource to verify gates; it does not stand in for a human pacing playtest.

The browser smoke script exercises actual controls, all almanac pages, trading, dialogue, research, processing, chapter transitions, mobile overflow, and resource loading. Screenshots are written under ignored `test-results/`. It uses Playwright if installed, or `PLAYWRIGHT_MODULE` pointing to an available package; `BROWSER_EXECUTABLE` optionally selects a local Chrome binary.

## Art

`assets/world-atlas.png` is the supplied building/scenery sheet, used with its original transparency. `assets/people-crops-atlas.png` was generated once with the built-in image tool, including seven people, a cat, six plants and two machines. Runtime source rectangles account for uneven row padding; source images remain unmodified. See `art-direction.md` for the supplied reference and `asset-provenance.md` for the generated prompt.

## Scope limits worth knowing

This is a complete compact browser game, with a deliberately modest simulation: residents stand at authored locations rather than following hourly schedules; friendship affects remembered conversations rather than branching entire plotlines; machine processing is abstracted into queues; final economy changes use crop/part exchange and flavour text rather than simulating a town-wide market. Human testing is still needed to tune the 2–3 hour pacing target.
