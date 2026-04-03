# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

One Short Life is an idle incremental RPG browser game built with Vue 3 + TypeScript + Vite. Deployed to GitHub Pages at https://yatsykve.github.io/one-short-life/.

The user does not know JS/Vue — AI writes all the code. Maintain good documentation in `docs/` so future sessions can pick up where the last left off.

## Documentation

Read these docs before making changes — they are the source of truth for design and architecture decisions.

- `docs/game-design.md` — Full game design document (character, stats, gameplay, events)
- `docs/architecture.md` — Technical architecture: state, engine, event system, project structure
- `docs/style-guide.md` — Color palette
- `docs/implementation-status.md` — What's built vs. planned
- `docs/references.md` — Inspiration games (Progress Knight is the primary reference)
- `docs/backlog.md` — Prioritized list of future work. Keep it updated and prioritized when adding ideas.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check with vue-tsc then build with Vite
- `npm run preview` — Preview production build locally

No test runner or linter is configured.

## Architecture

See `docs/architecture.md` for full details. Key concepts:

- **Everything is an event.** The game world is empty without events. Jobs, skills, income, death — all driven by events.
- **State machine + tick loop + UI projection.** Single reactive state, engine ticks at 100ms, Vue renders state.
- **Game engine** processes active events each tick. No separate system tick functions — events drive all state changes.
- **Scenario** = data-defined world. All potential events, jobs, skills defined as data, not code logic.
- **Speed control** via `gameSpeed` multiplier on delta time. Used for dev/testing, game events, and user settings.

### Project layout

- `src/game/` — Engine, state, actions, event processor
- `src/data/` — Scenario definitions (jobs, skills, events, properties)
- `src/ui/` — Vue components
- `public/` — Static assets (WebP images, avatars)
- **Base path**: `/one-short-life/` (configured in `vite.config.ts` for GitHub Pages)

## TypeScript

Strict mode enabled. The tsconfig enforces `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, and `noUncheckedSideEffectImports`. Target is ES2020 with bundler module resolution.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`. Uses Node.js 22.
