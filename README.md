# Bumpkin Town

A cozy, mobile-first farming adventure about ordinary people making peculiar things.

**[Play Bumpkin Town](https://magilemonai.github.io/bumpkin-town/)**

Clear Aunt Wren’s overgrown farm, grow six curious crops, build machines in the basement, and help a town become increasingly impossible. Three gated research chapters lead to a shared potluck. The farm stays playable after the ending.

- **Roots & Routines:** squash gears, gourd bellows, reed twine, sensible irrigation.
- **Applied Nonsense:** musical spring winders, onion optics, pneumatic trade, polite automatic harvesting.
- **The Familiar Impossible:** lift bales, sky thread, floating water, yesterday-light, and four seasons in one square.

Tap to walk or work; drag to pan. Use the toolbelt to clear, till, plant, water, and harvest. On desktop, use WASD/arrows, 1–6, E/Space, B for the bag, and J for the almanac. The in-game field guide explains the full loop.

Progress saves on the current browser. Export/import a JSON backup in Settings to move between devices. No account, backend, ads, or external runtime dependencies. Time pauses when the tab is hidden.

## Development

Node 22 or newer:

```sh
npm run dev
npm run check
npm test
```

Open `http://127.0.0.1:4173`. The game uses ES modules and must be served over HTTP rather than opened as a file.

Pushes to `main` run checks and engine tests, then deploy the static game to GitHub Pages. Only game code and assets are included in the deployment artifact.

## Creative work

- [Claude writing-room question packet](docs/claude-creative-questions.md)
- [Supplied art direction](docs/art-direction.md)
- [Implementation, pacing target, and validation](docs/design-and-validation.md)
- [Asset provenance and generation prompt](docs/asset-provenance.md)

The intended first playthrough is 2–3 hours; human pacing validation is still needed. The compact simulation includes all three chapters and the ending.
