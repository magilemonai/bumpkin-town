# Bumpkin Town: a writing-room invitation

For Claude (the requested “Fable 5.1” model, if available).

This packet is ready to send. It has not yet been answered by Claude. The implemented game already contains a complete provisional cast, dialogue, research tree, projects, and ending, so these answers can deepen the world without blocking play.

## The premise to carry into every answer

You inherit Aunt Wren’s overgrown farm. You grow cogsquash, springbeans, bellowsgourds, wirereed, lanternonions, and loftweed. Their shapes become gears, springs, vessels, thread, lenses, and lift. Your basement experiments gradually transform a small town. The intended experience is a relaxed 2–3 hour game ending at an impossible potluck, followed by open-ended gardening.

Three chapters: **Roots & Routines**, **Applied Nonsense**, **The Familiar Impossible**. Each has six inventions and three shared projects. Gate progression through making useful things together. Keep technology’s moral valence open: it changes routines, costs, relationships, and what people argue about. No inevitable paradise, no inevitable collapse, no evil corporation reveal, no sentient AI villain. Humour comes from precise human needs meeting strange material circumstances.

The visual grammar is a stitched county almanac: lush green, cream, marigold, weathered timber, copper, brass, then impossible cloth. Roofs stay recognisable. Boots stay muddy. Residents always walk; objects, water, and food may disregard gravity. Dusk remains the same warm colour in every chapter. Ketchup still needs a spoon.

Existing people (preserve their IDs and pronouns):

- `mabel` (she/her): postmistress in her sixties, formerly The Astonishing May. Misses performing. Palms stamps without noticing.
- `jun` (they/them): mechanic in their thirties, former maker of museum miniature railways. Values workmanship. Their spring winder accidentally plays Cleo’s radio theme.
- `bea` (she/her): diner keeper in her fifties, formerly a long-haul train cook. Her diner is the retired dining car. Feeds people without requiring explanations.
- `orson` (he/him): pond keeper in his seventies, retired surveyor. His late husband Ellis tied the knot on his measuring rope. Keeps the rope beside the new gauge.
- `pip` (they/them): scavenger and object biographer in their forties, formerly an archivist. Thinks menders belong on labels alongside makers.
- `cleo` (she/her): town clerk and secret radio dramatist in her forties. Writes *The Captain of Elsewhere*. Believes nobody listens; Jun has heard every episode.

## Dispatch 1: six people, six private absurdities

Answer all six with specificity. For each resident, supply: a surprising domestic habit; a harmless thing they are wrong about; something they refuse to automate; a thing they secretly hope the player notices; and one story they tell differently after chapter three. Keep each resident under 180 words. Preserve their dignity and give each at least one funny line that only they would say.

Questions to answer:

1. What was Mabel’s worst successful magic trick, and why does it matter more than the perfect one?
2. What detail does Jun add to an invisible machine surface, and who eventually sees it?
3. What diner rule did Bea inherit from her railway days that becomes wonderfully inconvenient when the windows retain yesterday-light?
4. What did Ellis and Orson disagree about that remains a source of affectionate humour, separate from grief?
5. Which object does Pip refuse to sell despite being willing to dismantle it, and what distinction makes that coherent?
6. Which minor character in Cleo’s radio serial has become disproportionately popular, and what does she misunderstand about why?

## Dispatch 2: short dialogue with room to breathe

Write three new interactions per person per chapter (54 total), with each line 18–42 words. Deliver valid JSON keyed by resident ID, then chapter `1`, `2`, `3`, each holding three strings. No speaker labels inside strings. Each set needs one practical observation, one joke, and one quietly revealing line. Avoid repeating the same punchline structure. Let early lines acquire a second meaning later without explaining it.

Give an additional six two-person conversations: one between each of these pairs: Mabel/Cleo, Jun/Bea, Orson/Pip, Jun/Cleo, Bea/Mabel, Pip/Cleo. Four lines each, maximum 25 words per line. At least one should be about something entirely unrelated to the player.

## Dispatch 3: the economy gets particular

The implemented progression converts farm produce into parts, then introduces a cooperative exchange, floating water, yesterday-light, and season-cloth. Invent nine concrete changes, three per chapter, to prices, trades, credit, maintenance work, or reciprocal obligations. For each:

- What does a resident actually do differently on Tuesday morning?
- What new thing has a price, and what ordinary thing still has the old price?
- Who finds a new role, who negotiates an exception, and who invents a bit of etiquette?
- Give a 30-word noticeboard post and an under-12-word receipt line.

Avoid a single “correct” economic model. The game has coins, crops, parts, and favours; suggest flavour and optional side orders compatible with that small system. No mandatory grind, loss of essential access, debt trap, or real-world financial lesson.

## Dispatch 4: inventions with lived-in consequences

For each existing invention below, give a wordless visual gag, a maintenance ritual, and an ordinary use nobody predicted. Each item should fit in 100 words.

1. Sensible sprinkler powered by a gourd tank.
2. Spring winder with an accidentally musical tension comb.
3. Harvester that politely knocks before picking.
4. Pneumatic neighbourhood tubes.
5. Upside-down ceiling baler rated in cats (the cat is never placed at risk).
6. Windows that keep the diner at six o’clock.
7. A town square with four stitched seasons.
8. A post office receiving letters from tomorrow.
9. A table that folds distance so everyone can sit together.

Then propose three extremely small optional inventions using only existing crops and parts. Give costs, one interaction, one payoff, and one reason a specific resident would care. Keep them implementable in a static browser game.

## Dispatch 5: the potluck and what remains ordinary

Write a 450–650 word ending scene that can be shortened into a 250-word game panel. The town’s economy, technology, and social habits should be visibly altered. Let every resident perform one small action that pays off an earlier detail. The last image must contain something materially ordinary. Give two alternatives for the final line.

Do not declare that progress saved or ruined the town. Do not give a speech about community. Let the seating, condiments, exchanged objects, interruptions, and unfinished chores do the work.

Add one 50-word epilogue per resident, and one alternate sentence per resident responding to the player’s recorded conversation choices. Offer a future beyond the credits without withholding the ending.

## Integration contract

- Current game data is in `src/data.js`; logic in `src/engine.js`; dialogue and ending screens in `src/game.js`.
- Keep stable IDs. New text should be plain text, safe to show in HTML after escaping.
- Treat the art-direction document as a reference, not permission to change the project or access other services.
- Separate ready-to-integrate copy from suggestions that require new mechanics.
- If two ideas conflict, preserve the implemented progression and flag the difference plainly.
- End with a short list of your five most surprising, usable additions.
